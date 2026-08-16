# Harness adapter — Codex CLI & GPT-based agents

Sibling to `references/harness-orchestration.md` (Claude Code). Load this when the executing or target harness is OpenAI Codex CLI, a GPT-based coding agent, or any agent without Claude Code's slash-command and subagent machinery. It maps the skill's harness-neutral orchestration concepts to their Codex/GPT bindings and states honestly where a capability degrades.

The prompt-improving logic in `SKILL.md` (routing, task adapters, evidence, delivery guards) is already harness-neutral prose and needs no adapter. Only the orchestration controls named for Claude Code (`/goal`, `ultracode`, subagents, `/code-review`, auto mode) are Claude-specific; substitute the rows below.

Caveat: Codex CLI syntax moves fast — verify against the installed build (`codex --version`) and current docs before pasting exact flags. Real security (sandboxing, least privilege, secret isolation) lives in the harness, not in prompt words.

## Concept → binding

| Neutral concept | Claude Code | Codex CLI / GPT agent |
|---|---|---|
| Load the skill | Skill tool, `/prompt [raw prompt]` | No skill loader. Read `SKILL.md` as a plain instruction file (pointed to by `AGENTS.md`) and treat the user's raw text as `[raw prompt]`. |
| Never pause / run unattended | auto mode (`--permission-mode auto`) | Approval + sandbox: interactive `--ask-for-approval on-request --sandbox workspace-write`; headless `codex exec --sandbox workspace-write`. Add `--ask-for-approval never` for fully unattended. `--dangerously-bypass-approvals-and-sandbox` (some builds also accept the `--yolo` alias — verify with `codex --help`) only inside a disposable sandbox. `codex exec --full-auto` is a deprecated compatibility path (prints a warning) — prefer the explicit `--sandbox` form. |
| Persist until a completion condition | one standing `/goal <condition>` (Stop-hook, model-judged, cross-window) | No native goal-gate. Express the completion condition in the prompt body as a loop-until instruction the model self-checks each turn; bound it with an explicit attempt/turn cap. No built-in cross-session persistence — save progress to a file and continue with `codex resume` or a re-run. |
| Fan-out / parallelism | subagents (Agent tool), workflows, `ultracode` | No in-conversation subagents. Degrade to sequential passes in one session, or the operator runs several `codex exec` processes. MCP servers add tools, not sub-agents. |
| Review / verify gate | `/code-review`, `/security-review`, a critic subagent | No built-in review command. Express review as an explicit self-review pass in the prompt (re-read the diff and try to refute it), and/or run a linter/test/reviewer via shell inside the sandbox. |
| Repository guidance file | `CLAUDE.md` | `AGENTS.md` — nearest file in the tree wins, merges up to the repo root and global `~/.codex/AGENTS.md`; an explicit chat prompt overrides it. |
| Add tools | `/mcp`, settings | `~/.codex/config.toml` `[mcp_servers]`. |
| Hard boundary at the irreversible edge | stated in prompt + auto-mode classifier | stated in prompt + sandbox mode: `read-only` / `workspace-write` / `danger-full-access`. `workspace-write` blocks writes outside the workspace and network egress by default; keep `danger-full-access` off unless the task needs it. |

## Degradations to state, not paper over

A Codex/GPT run cannot silently inherit Claude Code assumptions. When rewriting an orchestration prompt for this harness, name these explicitly:

- **No goal-gate:** the "keep working until the condition holds" loop is prompt-expressed and operator-bounded (attempt cap), not enforced by the harness. It can stop early; the completion check is the model's own.
- **No subagents:** independent subtasks run sequentially or as separate operator-launched processes; there is no in-session fan-out or cross-agent verification.
- **No billed cloud review:** `/code-review ultra` has no equivalent; substitute self-review plus shell-run tests/linters.

## Sources

- Codex CLI approval & sandbox modes, `codex exec`: OpenAI Codex docs — https://developers.openai.com/codex/agent-approvals-security (redirects to https://learn.chatgpt.com/docs/agent-approvals-security).
- AGENTS.md open format (nearest-wins merge; chat prompt overrides; cross-vendor, donated to the Linux Foundation Agentic AI Foundation, Dec 2025): https://agents.md/ and https://github.com/openai/codex/blob/main/docs/agents_md.md.
