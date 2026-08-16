#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

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
const STOP = new Set("a an and are as at be by for from has have in into is it of on or that the this to use when with".split(" "));

const argv = process.argv.slice(2);
let top = 3;
const ti = argv.indexOf("--top");
if (ti >= 0) { top = Math.max(1, Math.min(10, Number(argv[ti + 1]) || 3)); argv.splice(ti, 2); }
const query = argv.join(" ").trim();
if (!query) {
  console.error('Usage: node scripts/retrieve-cases.js "query" [--top 3]');
  process.exit(2);
}

const file = path.resolve(__dirname, "../references/session-cases.csv");
const docs = parseCsv(fs.readFileSync(file, "utf8"));
const fields = ["category","surface","anonymized_task_paraphrase","expected_skill_behavior","critical_failure","gold_context_source","gold_harness_control"];
const tokenized = docs.map(d => terms(fields.map(f => d[f] || "").join(" ")));
const N = docs.length;
const avgdl = tokenized.reduce((n, d) => n + d.length, 0) / Math.max(1, N);
const df = new Map();
for (const d of tokenized) for (const t of new Set(d)) df.set(t, (df.get(t) || 0) + 1);
const q = [...new Set(terms(query))];
const k1 = 1.2, b = 0.75;
const scored = docs.map((d, i) => {
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
  return {d, score};
}).filter(x => x.score > 0).sort((a,b) => b.score - a.score).slice(0, top);

console.log(JSON.stringify(scored.map(({d,score}) => ({
  id: d.eval_id,
  date: d.date,
  category: d.category,
  surface: d.surface,
  task: d.anonymized_task_paraphrase,
  expected_behavior: d.expected_skill_behavior,
  critical_failure: d.critical_failure,
  context_source: d.gold_context_source,
  harness_control: d.gold_harness_control,
  evidence_locator: d.evidence_locator,
  score: Number(score.toFixed(4))
})), null, 2));
