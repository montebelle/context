# context

Home of the **`prompt`** skill — a cross-harness prompt improver that turns raw instructions into the smallest prompt that reliably communicates the intended outcome. It returns the improved prompt; it never executes it unless you separately ask.

One skill, two harnesses (not a fork):

- **Claude Code** — loads via the Skill tool as `/prompt [raw prompt]`.
- **Codex CLI / GPT agents** — no skill loader; the agent reads [`prompt/SKILL.md`](prompt/SKILL.md) as an instruction file, pointed to by [`prompt/AGENTS.md`](prompt/AGENTS.md). Orchestration controls map to Codex equivalents in [`prompt/references/codex-adapter.md`](prompt/references/codex-adapter.md).

## Setup

No build and nothing to install — the skill is Markdown plus one dependency-free Node script. Node (any modern version) is needed only for the optional case retriever.

**Claude Code** — symlink the skill into your skills directory (run from the repo root), then it loads as `/prompt`:

```
ln -sfn "$(pwd)/prompt" ~/.claude/skills/prompt
```

**Codex CLI / GPT agents** — clone the repo and work inside the tree; [`prompt/AGENTS.md`](prompt/AGENTS.md) is auto-discovered (nearest `AGENTS.md` wins). Point the agent at [`prompt/SKILL.md`](prompt/SKILL.md) and pass your raw text as the `[raw prompt]`.

Verify either install:

```
node prompt/scripts/retrieve-cases.js "test" --top 3
```

A JSON array of scored cases means it works.

## Go-to prompts

[`prompt/PROMPTS.md`](prompt/PROMPTS.md) is a library of named base prompts (`verify-work`, `code-review`, `research`, `logs-audit`, `readme-sync`). Invoke one by slug or intent and the skill expands it and rewrites it grounded to the current repo and harness — no re-pasting. Add or edit entries by editing that file.

See [`prompt/AGENTS.md`](prompt/AGENTS.md) for invocation detail.
