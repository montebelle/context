# Harness adapter — OpenClaw

Sibling to `harness-orchestration.md` (Claude Code) and `codex-adapter.md` (Codex/GPT). Load when the executing or target harness is OpenClaw — the open-source autonomous-agent framework (docs.openclaw.ai; formerly Clawdbot → Moltbot → OpenClaw). It maps the skill's harness-neutral orchestration concepts to OpenClaw's control surface and notes where a capability degrades.

OpenClaw is closer to Claude Code than Codex is: it loads `SKILL.md` files natively, has real in-session sub-agents, a Docker/Podman sandbox, and native compaction with an automatic save-to-memory reminder. The prompt-improving logic in `SKILL.md` needs no adapter; only the orchestration controls below do.

Caveat: OpenClaw moves fast (three renames in ~3 months) — verify flags and config keys against the installed build (`openclaw --version`) and docs.openclaw.ai. Real security (sandbox, approvals, network controls) lives in the framework, not in prompt words.

## Concept → binding

| Neutral concept | Claude Code | OpenClaw |
|---|---|---|
| Load the skill | Skill tool, `/prompt [raw prompt]` | Native — the Plug-ins & Skills System loads `SKILL.md` into context at session start, from the clawhub.ai registry or a local plugin directory. No re-hosting needed. |
| Never pause / run unattended | auto mode (`--permission-mode auto`) | Exec-policy: `openclaw exec-policy preset yolo` (security `full`, ask `off`, askFallback `full`), or `openclaw config set tools.exec.mode full` + `tools.exec.ask off`. Prompting modes are `off` / `on-miss` / `always`; security modes `deny` / `allowlist` / `full`. Keep `full`/`yolo` only inside a disposable sandbox. |
| Persist until a completion condition | one standing `/goal <condition>` (Stop-hook, model-judged) | The Agent Runtime runs a recursive ReAct loop that schedules and completes the task (tracked on a task/Kanban board). There is no external transcript-judged goal-gate — express the completion condition in the prompt and bound it; the loop, not a Stop-hook, decides done. |
| Fan-out / parallelism | subagents (Agent tool), workflows, `ultracode` | Native sub-agents: `sessions_spawn` (non-blocking, returns a run id; params `task`, `agentId`, `model`, `context`). Isolated child transcript by default, or `context: "fork"` to branch the parent's. Parent waits with `sessions_yield`; children announce results back. Limits: `maxConcurrent` (8), `maxChildrenPerAgent` (5), `maxSpawnDepth`. |
| Review / verify gate | `/code-review`, `/security-review`, a critic subagent | No built-in review command. Spawn an isolated critic via `sessions_spawn` (clean context) on the diff, and/or run tests/linters via exec inside the sandbox. |
| Repository guidance / durable memory | `CLAUDE.md` | Loaded `SKILL.md` files plus the Memory & Knowledge System — memory files, RAG via the memorySearch provider (LM Studio native), and a "Shared Knowledge" skill for cross-agent memory. No single repo-root guidance file is documented. |
| Add tools | `/mcp`, settings | Plug-ins & Skills System — install skills/plugins from clawhub.ai or a local plugin directory. |
| Hard boundary at the irreversible edge | stated in prompt + auto-mode classifier | stated in prompt + sandbox (`agents.defaults.sandbox`: Docker/Podman container, SSH target, or OpenShell cloud backend; network controls + env sanitization) + exec-policy (`deny`/`allowlist`/`full`). Config in `~/.openclaw/openclaw.json`; state in `$OPENCLAW_STATE_DIR/state/openclaw.sqlite`. |

## Long-horizon runs (OpenClaw binding)

Neutral model in `long-horizon-autonomy.md`. OpenClaw supplies more of it natively than most harnesses:

- **Compaction is built in and cooperative** — the transcript is an append-only tree; older turns are summarized when the window fills, and **before compacting OpenClaw automatically reminds the agent to save important notes to memory files**. The emitted prompt should lean on that: write durable progress to a memory file so it survives compaction, and re-ground from memory + the task board after any compaction.
- **Durable state** — the Memory & Knowledge System (memory files + RAG) is the source of truth, not the transcript.
- **Verification isolation** — use isolated `sessions_spawn` children as critics, which OpenClaw supports directly.
- **Degradation vs Claude Code** — no transcript-judged goal-gate to enforce "don't stop early / don't delete tests"; state those as prompt rules and bound the ReAct loop with an explicit completion condition plus the task board.

## Degradations to state, not paper over

- **No goal-gate:** completion is the ReAct loop's own judgment plus the prompt's condition, not a harness-enforced Stop hook. Bound it.
- **No built-in review command:** substitute an isolated critic sub-agent plus shell-run tests/linters.
- **Model provider:** LM Studio is the native provider (chat + embeddings); pin the model in config and keep the prompt portable unless a specific local model is named.

## Sources

- OpenClaw docs — exec approvals & unattended (`exec-policy preset yolo`, `tools.exec.*`): https://docs.openclaw.ai/cli/approvals
- Sub-agents (`sessions_spawn`, `sessions_yield`, isolation, limits): https://docs.openclaw.ai/tools/subagents
- Session management & compaction (append-only tree, save-to-memory before compaction): https://docs.openclaw.ai/concepts/compaction and https://docs.openclaw.ai/reference/session-management-compaction
- Agent loop (recursive ReAct): https://docs.openclaw.ai/concepts/agent-loop
- Source & registry: https://github.com/openclaw/openclaw , https://clawhub.ai
