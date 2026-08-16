# context

Home of the **`prompt`** skill — a cross-harness prompt improver that turns raw instructions into the smallest prompt that reliably communicates the intended outcome. It returns the improved prompt; it never executes it unless you separately ask.

One skill, two harnesses (not a fork):

- **Claude Code** — loads via the Skill tool as `/prompt [raw prompt]`.
- **Codex CLI / GPT agents** — no skill loader; the agent reads [`prompt/SKILL.md`](prompt/SKILL.md) as an instruction file, pointed to by [`prompt/AGENTS.md`](prompt/AGENTS.md). Orchestration controls map to Codex equivalents in [`prompt/references/codex-adapter.md`](prompt/references/codex-adapter.md).

See [`prompt/AGENTS.md`](prompt/AGENTS.md) for invocation and the verify command.
