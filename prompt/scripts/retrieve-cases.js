#!/usr/bin/env node
// Retrieve analogous session cases for the prompt skill.
// Semantic (ollama embeddings) when reachable; automatic BM25 lexical fallback
// otherwise — so it still runs anywhere on plain Node with no server.
//   node scripts/retrieve-cases.js "query" [--top 3] [--semantic|--bm25]
// Env: OLLAMA_HOST (default http://127.0.0.1:11434), OLLAMA_EMBED_MODEL (default nomic-embed-text).
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  const header = rows.shift() || [];
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(header.map((h, i) => [h, r[i] || ""])));
}

function terms(s) {
  return (s.toLowerCase().match(/[a-z0-9][a-z0-9_./:-]*/g) || [])
    .filter(t => t.length > 1 && !STOP.has(t));
}
const STOP = new Set("a an and are as at be by for from has have in into is it of on or that this to use when with".split(" "));

const FIELDS = ["category","surface","anonymized_task_paraphrase","expected_skill_behavior","critical_failure","gold_context_source","gold_harness_control"];
const docText = d => FIELDS.map(f => d[f] || "").join(" ");

// ---- BM25 (fallback) ----
function bm25(docs, query, top) {
  const tokenized = docs.map(d => terms(docText(d)));
  const N = docs.length;
  const avgdl = tokenized.reduce((n, d) => n + d.length, 0) / Math.max(1, N);
  const df = new Map();
  for (const d of tokenized) for (const t of new Set(d)) df.set(t, (df.get(t) || 0) + 1);
  const q = [...new Set(terms(query))];
  const k1 = 1.2, b = 0.75;
  return docs.map((d, i) => {
    const toks = tokenized[i], tf = new Map();
    for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
    let score = 0;
    for (const t of q) {
      const f = tf.get(t) || 0;
      if (!f) continue;
      const n = df.get(t) || 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * toks.length / Math.max(1, avgdl)));
    }
    return { d, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, top);
}

// ---- Semantic (ollama embeddings) ----
const OLLAMA_HOST = (process.env.OLLAMA_HOST || "http://127.0.0.1:11434").replace(/\/$/, "");
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";
const SCHEMA = "v1-nomic-prefix"; // bump to invalidate the cache if prefixing/model text changes

async function embed(inputs, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/embed`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`ollama HTTP ${res.status}`);
    const j = await res.json();
    if (!Array.isArray(j.embeddings) || j.embeddings.length !== inputs.length) throw new Error("bad embeddings response");
    return j.embeddings;
  } finally { clearTimeout(timer); }
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

const cachePath = () => path.resolve(__dirname, ".cache", "embeddings.json");

// nomic-embed-text wants task prefixes on documents and queries.
async function corpusVectors(docs, csvKey) {
  const cp = cachePath();
  try {
    const c = JSON.parse(fs.readFileSync(cp, "utf8"));
    if (c.key === csvKey && c.model === EMBED_MODEL && Array.isArray(c.vectors) && c.vectors.length === docs.length) return c.vectors;
  } catch {}
  const vectors = await embed(docs.map(d => "search_document: " + docText(d)), 120000);
  try {
    fs.mkdirSync(path.dirname(cp), { recursive: true });
    fs.writeFileSync(cp, JSON.stringify({ key: csvKey, model: EMBED_MODEL, dim: vectors[0] ? vectors[0].length : 0, vectors }));
  } catch {}
  return vectors;
}

async function semantic(docs, query, top, csvKey) {
  const corpus = await corpusVectors(docs, csvKey);
  const [qv] = await embed(["search_query: " + query], 15000);
  return docs.map((d, i) => ({ d, score: cosine(qv, corpus[i]) }))
    .sort((a, b) => b.score - a.score).slice(0, top);
}

function render(scored) {
  console.log(JSON.stringify(scored.map(({ d, score }) => ({
    id: d.eval_id, date: d.date, category: d.category, surface: d.surface,
    task: d.anonymized_task_paraphrase, expected_behavior: d.expected_skill_behavior,
    critical_failure: d.critical_failure, context_source: d.gold_context_source,
    harness_control: d.gold_harness_control, evidence_locator: d.evidence_locator,
    score: Number(score.toFixed(4)),
  })), null, 2));
}

(async () => {
  const argv = process.argv.slice(2);
  let top = 3, force = "auto";
  const ti = argv.indexOf("--top");
  if (ti >= 0) { top = Math.max(1, Math.min(10, Number(argv[ti + 1]) || 3)); argv.splice(ti, 2); }
  for (const f of ["--semantic", "--bm25", "--lexical"]) {
    const i = argv.indexOf(f);
    if (i >= 0) { force = f === "--semantic" ? "semantic" : "bm25"; argv.splice(i, 1); }
  }
  const query = argv.join(" ").trim();
  if (!query) { console.error('Usage: node scripts/retrieve-cases.js "query" [--top 3] [--semantic|--bm25]'); process.exit(2); }

  const csv = fs.readFileSync(path.resolve(__dirname, "../references/session-cases.csv"), "utf8");
  const docs = parseCsv(csv);
  const csvKey = crypto.createHash("sha1").update(SCHEMA + "\0" + EMBED_MODEL + "\0" + csv).digest("hex");

  if (force !== "bm25") {
    try {
      const scored = await semantic(docs, query, top, csvKey);
      console.error(`method: semantic (${EMBED_MODEL})`);
      return render(scored);
    } catch (e) {
      if (force === "semantic") { console.error(`semantic retrieval failed: ${e.message}`); process.exit(1); }
      console.error(`method: bm25 (semantic unavailable: ${e.message})`);
    }
  } else {
    console.error("method: bm25 (forced)");
  }
  render(bm25(docs, query, top));
})();
