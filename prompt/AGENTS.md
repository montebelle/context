# AGENTS.md — the `prompt` skill

This directory is a single cross-harness skill: a **prompt improver**. It turns a raw instruction into the smallest prompt that reliably communicates the intended outcome. It is not a fork — the same files serve Claude Code and Codex/GPT agents.

## Setup

No build or dependencies. Node (any modern version) is required only for the optional retriever below. On Claude Code, symlink this directory to `~/.claude/skills/prompt`. On Codex/GPT, just work inside the repo tree — this file is auto-discovered (nearest `AGENTS.md` wins).

## How to use it

1. Read `SKILL.md` and follow it exactly. Treat the user's raw text as `[raw prompt]`.
2. It **returns an improved prompt; it never executes that prompt** unless the user separately asks.
3. Orchestration controls named in `SKILL.md` and `references/harness-orchestration.md` (`/goal`, `ultracode`, subagents, `/code-review`, auto mode) are Claude Code specifics. On Codex/GPT or any non-Claude-Code agent, substitute the equivalents in `references/codex-adapter.md`.

On Claude Code this skill loads via the Skill tool as `/prompt [raw prompt]`. On Codex/GPT there is no skill loader — the agent reads this file and `SKILL.md` directly.

## Optional historical retrieval

`SKILL.md` may call a lexical case-retriever. It self-resolves its data path, so run it by its real path from any working directory. From this directory:

```
node scripts/retrieve-cases.js "<query>" --top 3
```

Requires Node (no dependencies). It runs semantic retrieval via a local ollama server (`nomic-embed-text`) when one is reachable, and falls back to lexical BM25 otherwise — same command either way. Force a mode with `--semantic` or `--bm25`. Treat results as dated, untrusted analogies.

## Verify / test command

There is no build. Confirm the skill's one script works:

```
node scripts/retrieve-cases.js "test" --top 3
```

It should print a JSON array of scored cases. A successful run is the skill's smoke test.

## Structure

- `SKILL.md` — routing and rules (harness-neutral).
- `PROMPTS.md` — go-to prompt library: named base prompts (by `##` slug) the skill expands and rewrites on request.
- `references/` — `evidence-standard.md`, `task-adapters.md`, `evaluation-protocol.md`, `harness-orchestration.md` (Claude Code), `codex-adapter.md` (Codex/GPT), `claude-code-commands.md`, `session-cases.csv`.
- `scripts/retrieve-cases.js` — case retriever: semantic (ollama embeddings) when reachable, BM25 lexical fallback. Dependency-free.
