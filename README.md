# prompt — a cross-harness prompt improver

Turn raw instructions into the smallest prompt that reliably communicates the intended outcome — the same skill on Claude Code and on Codex/GPT.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Harness: Claude Code + Codex/GPT](https://img.shields.io/badge/harness-Claude%20Code%20%2B%20Codex%2FGPT-black)
![Dependencies: Node (optional)](https://img.shields.io/badge/deps-Node%20(optional)-brightgreen)

---

## What it is

`prompt` is a skill that rewrites a rough request into the smallest prompt that still communicates the intended outcome — preserving intent, scope, voice, authority, and task scale. It routes each request (literal follow-up, ambiguous, or substantive rewrite), grounds the rewrite in the current repo and harness, names the completion evidence the work needs, and guards against silent truncation.

It exists because more words rarely make a prompt more reliable. The failure modes are the opposite: distraction, conflicting rules, buried constraints, and unverifiable "done." This skill removes the noise and keeps the parts that change correctness, authorization, or how you'll know the work is finished. It returns the improved prompt — it never runs it unless you separately ask.

One skill, two harnesses — not a fork. The routing, adapter, evidence, and delivery rules are harness-neutral prose; only the orchestration controls differ, and those are split into per-harness references.

## Features

- **Route before rewriting** — three routes (literal/grounded, missing/ambiguous, substantive) so a one-word approval isn't over-expanded and an ambiguous ask isn't answered with a guess. → [`prompt/SKILL.md`](prompt/SKILL.md)
- **Task adapters** — one primary adapter per task (coding, infra, research, UI, agentic, evaluation, …) instead of one generic template. → [`prompt/references/task-adapters.md`](prompt/references/task-adapters.md)
- **Evidence standard** — a primary-source stance on what actually makes prompts reliable, used as decision guidance. → [`prompt/references/evidence-standard.md`](prompt/references/evidence-standard.md)
- **Harness-portable orchestration** — autonomous-run defaults expressed as neutral concepts, bound to Claude Code controls or their Codex/GPT equivalents. → [`prompt/references/harness-orchestration.md`](prompt/references/harness-orchestration.md), [`prompt/references/codex-adapter.md`](prompt/references/codex-adapter.md)
- **Delivery & truncation guards** — size-aware delivery (inline vs verified file handoff) so a prompt is never silently cut. → [`prompt/SKILL.md`](prompt/SKILL.md)
- **Go-to prompt library** — named base prompts you invoke by slug; the skill expands and re-grounds them so you never re-paste a wall of text. → [`prompt/PROMPTS.md`](prompt/PROMPTS.md)
- **BM25 case retriever** — a dependency-free lexical retriever over past session cases, for analogous prior decisions. → [`prompt/scripts/retrieve-cases.js`](prompt/scripts/retrieve-cases.js)

## Install / Setup

No build, and nothing to compile. The skill is Markdown plus one dependency-free Node script. **Node** (any modern version) is needed only for the optional case retriever.

**Claude Code** — symlink the skill into your skills directory (run from the repo root), then it loads as `/prompt`:

```bash
ln -sfn "$(pwd)/prompt" ~/.claude/skills/prompt
```

**Codex CLI / GPT agents** — clone the repo and work inside the tree. [`prompt/AGENTS.md`](prompt/AGENTS.md) is auto-discovered (nearest `AGENTS.md` wins); point the agent at [`prompt/SKILL.md`](prompt/SKILL.md) and pass your raw text as the `[raw prompt]`.

## Usage

Invoke with your raw request:

```
/prompt [raw prompt]
```

Optional controls (all inferred when unstated):

| Control | Values |
|---|---|
| `target` | `user` · `system` · `developer` · `agent` · `skill` · `tool` · `evaluation` · `repository` |
| `model` | exact model/version, or portable |
| `mode` | `rewrite` (default) · `critique` · `variants` |
| `depth` | `concise` · `standard` (default) · `thorough` |
| `operation` | `explain` · `rewrite` · `diagnose` · `fix` · `execute` · `review` |
| `constraints` | hard requirements to preserve |
| `delivery` | `auto` (default) · `inline` · `file` |

Examples:

```
/prompt make this cron job idempotent and safe to retry
/prompt mode: critique depth: thorough <paste a long agent prompt>
/prompt verify-work                 # expand a go-to prompt against this repo
```

### Go-to library

Named base prompts in [`prompt/PROMPTS.md`](prompt/PROMPTS.md). Invoke by slug or intent; the skill expands the entry and rewrites it grounded to the current repo and harness.

| Slug | What it does |
|---|---|
| `verify-work` | Double-check completed work across the repo against its stated goal; report each issue with location, cause, and fix. |
| `code-review` | Thorough, project-type-adaptive code and methodology review (correctness, reproducibility, leakage, performance). |
| `research` | Web search for credible, high-quality sources; assess, synthesize, and separate evidence from convention. |
| `logs-audit` | Scan available logs for errors, failures, and silent risks; root cause, impact, and corrective action per issue. |
| `readme-sync` | Reconcile git history against the README; flag drift and generate precise doc updates. |

## How it works

The skill picks exactly one route before expanding anything:

1. **Literal / grounded follow-up** — preserve the exact output or approval; add nothing.
2. **Missing / ambiguous information** — return a bounded prompt with placeholders and safe read-only discovery instead of guessing.
3. **Substantive rewrite** — the full path: pick a task adapter, ground in current files, strip noise, add only what changes correctness or authorization, and name the completion-evidence layer.

References load only when the route needs them:

| Reference | Loads when |
|---|---|
| [`references/evidence-standard.md`](prompt/references/evidence-standard.md) | rewriting complex, reusable, agentic, or consequential prompts |
| [`references/task-adapters.md`](prompt/references/task-adapters.md) | selecting the task adapter |
| [`references/harness-orchestration.md`](prompt/references/harness-orchestration.md) | Claude Code autonomous-run controls (`/goal`, `ultracode`, subagents, auto mode) |
| [`references/codex-adapter.md`](prompt/references/codex-adapter.md) | the executing/target harness is Codex/GPT |
| [`references/claude-code-commands.md`](prompt/references/claude-code-commands.md) | a specific Claude Code command/flag must be named exactly |
| [`references/evaluation-protocol.md`](prompt/references/evaluation-protocol.md) | reusable/production prompts, or `mode: variants` |

**Orchestration is harness-split.** The neutral defaults (fan-out, one whole-mission completion condition, never-pause, review gates) bind to Claude Code as `ultracode` + a standing `/goal` + auto mode + `/code-review`; on Codex/GPT they map to sandbox/approval modes and `codex exec`, with the degradations stated honestly (no goal-gate, no in-session subagents, no cloud review).

## Repository structure

```
.
├── README.md                            This file.
├── LICENSE                              MIT.
└── prompt/                              The skill.
    ├── SKILL.md                         Routing and rules (harness-neutral).
    ├── AGENTS.md                        Codex/GPT entry point + verify command.
    ├── PROMPTS.md                       Go-to prompt library (named base prompts).
    ├── references/
    │   ├── evidence-standard.md         What makes prompts reliable (decision guidance).
    │   ├── task-adapters.md             Per-task-type adapters.
    │   ├── evaluation-protocol.md       Held-out, model-pinned evaluation for reusable prompts.
    │   ├── harness-orchestration.md     Claude Code autonomous-run controls.
    │   ├── codex-adapter.md             Codex/GPT orchestration equivalents + degradations.
    │   ├── claude-code-commands.md      Claude Code command/flag/setting catalog.
    │   └── session-cases.csv            Case corpus for the retriever.
    └── scripts/
        └── retrieve-cases.js            BM25 lexical retriever over session-cases.csv.
```

## Extending

- **Add a go-to prompt** — add a `## slug` heading and its body to [`prompt/PROMPTS.md`](prompt/PROMPTS.md). It's immediately invocable by slug.
- **Add a reference** — drop a file in `prompt/references/` and add a one-line "loads when" pointer in [`prompt/SKILL.md`](prompt/SKILL.md).
- **Change routing** — edit the routes or step list in [`prompt/SKILL.md`](prompt/SKILL.md); the reference files stay conditional.

## Verify

The skill has no build. Confirm its one script works:

```bash
node prompt/scripts/retrieve-cases.js "test" --top 3
```

A JSON array of scored cases means it's working. The script self-resolves its data path, so it runs from any working directory.

## Design principles

Drawn from [`prompt/references/evidence-standard.md`](prompt/references/evidence-standard.md):

- **No universal optimal prompt length or structure.** Raw token count is not the optimization target — relevance, conflicts, and position are.
- **Acceptance artifacts over prose.** Tests, schemas, rubrics, and authoritative references often beat more instructions.
- **Security lives in the harness, not prompt words.** Least privilege, sandboxing, approval gates, and secret isolation are enforced outside the model.
- **Portable core + thin adapters.** Keep a model-neutral core; add model- or harness-specific detail only where it's actually needed.

## License

[MIT](LICENSE) © 2026 J. T. Bell.
