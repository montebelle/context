# Claude Code command & control catalog

A lookup so the skill names commands, flags, and settings accurately and places each on the correct side of the prompt boundary (see `references/harness-orchestration.md` for that boundary and for when to weave orchestration in). This is steering surface, not a security boundary. The v2.1.x line renames things often — treat syntax as needing verification against the user's `claude --version`; removals and version notes are inline.

Category tags: **B** built-in · **S** bundled skill (the model can invoke) · **W** bundled workflow. Most-relevant-to-prompt-design commands are covered in depth in the orchestration reference; this is the complete index.

## Slash commands by category

**Orchestration & parallelism**
- `/agents` (B) — manage subagents; v2.1.198+ points you to edit `.claude/agents/` or ask Claude (no longer a wizard).
- `/subtask <task>` (B, v2.1.212+) — fork a subagent that inherits full conversation history.
- `/background [prompt]` (B, `/bg`) · `/fork [prompt]` (B, v2.1.212+) · `/tasks` (B, `/bashes`) · `/stop` (B) — detach / copy / view / stop background sessions.
- `/batch <instruction>` (S) — decompose a large change into 5–30 worktree-isolated subagents, each opening a PR.
- `/workflows` (B) — open the dynamic-workflow progress view.
- `/deep-research <question>` (W) — fan-out web research → cited report.
- `/list-agents` (B, `/peers`, v2.1.224+) — list subagents/sessions Claude can message.
- `/schedule [desc]` (B, `/routines`) — create/list/run cloud routines.
- `/loop [interval] [prompt]` (S, `/proactive`) — repeat a prompt on an interval or self-paced.

**Iterate / persist**
- `/goal [condition|clear]` (B) — keep working across turns until a transcript-verifiable condition is met (`clear`/`stop`/`off`/`reset`/`none`/`cancel` to remove).
- `/effort [low|medium|high|xhigh|max|ultracode|auto]` (B) — reasoning effort; `ultracode` = xhigh + auto-workflow per task.

**Planning & review**
- `/plan [description]` (B) — enter plan mode from the prompt.
- `/code-review [low|medium|high|xhigh|max|ultra] [--fix] [--comment] [--post] [pr#|branch|path]` (S, `/review`) — diff/PR review; `ultra` = cloud multi-agent (formerly `/ultrareview`).
- `/security-review` (B) — scan the branch diff for vulnerabilities.
- `/simplify [target]` (S, v2.1.154+) — cleanup review (4 parallel agents) + apply; no bug-hunting.
- `/verify` · `/run` · `/run-skill-generator` (S, v2.1.145+) — build/run/observe the app to confirm a change works.
- `/diff` (B) — interactive diff viewer.
- `/ultraplan` — **removed**, use plan mode. `/pr-comments` — **removed** in v2.1.91.

**Context & session**
- `/clear [name]` (B, `/reset`,`/new`) · `/compact [instructions]` (B) · `/context [all]` (B) · `/rewind` (B, `/checkpoint`,`/undo`) · `/autocompact [auto|<tokens>]` (B, v2.1.221+).
- `/btw [question]` (B) — side question, not added to history.
- `/resume [session]` (B, `/continue`) · `/rename [name]` (B) · `/branch [name]` (B) · `/export [filename]` (B) · `/recap` (B) · `/focus` (B) · `/insights` (B).
- `/cd <path>` (B, v2.1.169+) · `/add-dir <path>` (B) · `/teleport` (B, `/tp`) · `/desktop` (B, `/app`) · `/remote-control` (B, `/rc`).

**Config & setup**
- `/config [key=value]` (B, `/settings`) · `/permissions` (B, `/allowed-tools`) · `/hooks` (B) · `/model [model]` (B) · `/sandbox` (B) · `/mcp […]` (B) · `/plugin [sub]` (B) · `/skills` (B) · `/memory` (B) · `/init` (B) · `/statusline` (B) · `/theme` · `/vim` **removed** v2.1.92 (use `/config`→Editor mode) · `/output-style` **removed** v2.1.91.
- `/doctor` (S, `/checkup`) · `/fewer-permission-prompts` (S) · `/import [codex|gemini]` (B, v2.1.213+) · `/reload-skills` (B) · `/reload-plugins` (B) · `/keybindings` · `/terminal-setup` · `/ide` · `/advisor` · `/fast [on|off]` · `/voice`.

**Info & account**
- `/help` · `/status` · `/usage` (`/cost`,`/stats`) · `/usage-credits` · `/release-notes` · `/bug` (`/share`) · `/feedback` · `/copy [N]` · `/debug` · `/powerup` · `/login` · `/logout` · `/upgrade` · `/privacy-settings`.
- Cosmetic/misc: `/color`, `/theme`, `/tui`, `/scroll-speed`, `/radio`, `/mobile`, `/stickers`, `/passes`, `/heapdump`, `/exit` (`/quit`).

**Also:** MCP prompts are `/mcp__<server>__<prompt>`. Custom commands are authored as skills in `.claude/skills/`. Skill-chaining: `/skill-a /skill-b <text>` loads up to 6 skills and passes trailing text to each (v2.1.199+). Availability varies by plan/platform.

## Interactive prefixes & mode shortcuts (framing-relevant)

- `/` command/skill · `!` shell mode (runs the command, adds output to context) · `@` file-path or cross-session mention · `:` emoji · `?` (empty input) shortcut help.
- `Shift+Tab` cycles permission modes (default/acceptEdits/plan, plus auto/bypass) — **the only way to change mode; the model cannot.**
- `Esc` interrupt · `Esc Esc` rewind menu / clear draft · `Ctrl+X Ctrl+K` stop all background subagents · `Ctrl+O` transcript viewer.
- Multiline: `\`+Enter (any terminal), `Option+Enter` (macOS), `Shift+Enter` (native in iTerm2/WezTerm/Ghostty/Kitty/Warp/Apple Terminal/Windows Terminal), `Ctrl+J` (any).

## CLI & headless (`-p`) essentials

For prompts that will run non-interactively or in scripts:

- Invoke: `claude` · `claude "q"` · `claude -p "q"` (print then exit) · `cat f | claude -p "q"` · `claude -c` (continue) · `claude -r "<session>" "q"` (resume).
- Scope tools/permissions: `--allowedTools "Edit,Bash(git commit *)"`, `--disallowedTools`, `--permission-mode <plan|auto|acceptEdits|…>`, `--dangerously-skip-permissions` (unattended only, understood risk).
- Output: `--output-format text|json|stream-json` (+`--verbose` for streamed tokens), `--json-schema '<schema>'` → `structured_output`.
- Model/effort: `--model`, `--fallback-model sonnet,haiku`, `--effort <level>`, `--max-turns N`, `--max-budget-usd`.
- Prompt/agents: `--append-system-prompt[-file]`, `--system-prompt[-file]` (replace), `--agents '<json>'`, `--agent <name>`.
- Session: `--continue/-c`, `--resume/-r`, `--fork-session`, `--from-pr`, `--no-session-persistence`, `--session-id <uuid>`.
- Context: `--add-dir`, `--settings <file|json>`, `--setting-sources user,project`, `--bare` (skip auto-discovery; recommended for CI/SDK).
- `ultracode` keyword does **not** fire under `-p` (non-human origin); schedule plain `/code-review`, not `ultra`.

## Behavior-steering settings & env vars (subset a prompt may rely on)

Settings (`.claude/settings.json`): `permissions` (allow/ask/deny, e.g. `Bash(git diff *)` — space before `*`), `permissionMode`, `autoMode`, `disableAutoMode`; `model`/`effort`/`fallbackModel`/`outputStyle`/`verbosity`; `hooks`, `disableAllHooks`, `allowedHttpHookUrls`; `disableWorkflows`, `skillOverrides` (e.g. force a bundled skill to user-only), `disableBundledSkills`; `autoCompactEnabled`, `autoCompactWindow`, `autoMemoryEnabled`; `includeCoAuthoredBy`, `attribution`, `gitAuthor`.

Env vars: `CLAUDE_CODE_DISABLE_WORKFLOWS`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, `CLAUDE_CODE_DISABLE_CRON`, `CLAUDE_CODE_DISABLE_AUTO_COMPACT`, `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`, `CLAUDE_CODE_SUBAGENT_MODEL`, `MAX_THINKING_TOKENS`, `CLAUDE_CODE_USE_BEDROCK`/`CLAUDE_CODE_USE_VERTEX`.

These are the mechanisms a prompt-writer names under `Harness controls` — they are configured by the user, never executed from the prompt body.
