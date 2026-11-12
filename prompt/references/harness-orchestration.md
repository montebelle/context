# Harness orchestration (Claude Code)

Read when orchestration resolves Focused or Broad on Claude Code (tiers and budget rules: `SKILL.md`, Orchestration sizing), or when the request names a Claude Code control (`/loop`, `/goal`, `ultracode`, workflow, subagents, plan or auto mode). Read `references/claude-code-commands.md` only when a command, flag, or setting not named here must be named exactly. Syntax moves fast across the v2.1.x line; the version notes are at the end.

## Launch (human sent)

`/goal`, the permission mode, and the `ultracode` keyword are human only switches: `/goal` is a built in the model cannot run, the mode changes only with Shift+Tab or a launch flag, and `ultracode` fires only from human typed input. The skill runs inside a live session (desktop app or running CLI) where auto mode is already on, so the default Launch is in session:

- **Broad**: ONE message, the mission pasted once, beginning with the word `ultracode`, with its `Done =` completion condition written inside it. The keyword launches a dynamic workflow that runs the mission to completion in the background and returns only the final answer; the workflow is the loop, so nothing is sent separately.
- **Focused**, and the Broad fallback when workflows are unavailable (disabled in settings, a plan without the opt in, or the keyword did not launch one): `/goal <condition>` as its own message, then the mission. A `/goal` cannot share a message with the mission.
- Optional one time hardening: `/permissions` deny `Bash(git push *)` (prose is intent; the deny rule is enforcement). Send `/effort <level>` only when the user wants a non default level.
- **New shell session, headless, or CI only**: `claude --permission-mode auto --effort high --fallback-model sonnet,haiku --max-budget-usd <n> --allowedTools "<tools this mission needs, e.g. Edit,Write,Bash(git *),Bash(make *)>" --disallowedTools "<the irreversible edge, e.g. Bash(git push *),Bash(gh pr *)>" "/goal <whole mission condition; save progress to <file>; don't delete or weaken tests; stop after N rounds>"`, then the mission paste. Use `--effort max` only when the user asks. `ultracode` is inert under `-p` (non human origin) and the mode is not set from chat, so state the headless switch under `Harness controls`.
- Never emit `--max-turns` or `--effort ultracode`: neither is a CLI flag (the effort flag takes low, medium, high, xhigh, max). Bound with `--max-budget-usd` plus the goal condition's round cap.
- Put the irreversible edge in `--disallowedTools` (or `permissions.deny`) as well: a `Bash(git *)` allow rule otherwise permits the push the prose forbids.
- A `/goal` buried mid prompt is inert text (slash commands fire only at the start of a message), and a run with no real goal gate stops at its first turn boundary and asks "keep going?".
- Crash recovery is one command, `claude -c` (or `/resume`); the standing `/goal` and hooks persist with the session, and the prompt already says to reread the progress file and continue from the first unchecked item. After resuming, `/recap`, then reground.
- Zero ritual option: write `.claude/settings.json` in the target repo once (`permissionMode`, `effort`, `fallbackModel`, `permissions.allow`, plus a `Stop` hook that exits 2 until the progress file carries the completion marker); then the mission paste alone is the launch. Verify the hook and settings keys on the user's build; a script Stop hook is overridden after 8 blocks, so keep the `/goal` form for multi day runs.

## Inside the mission (model invocable)

Match the command to the job: `/goal`, not `/loop`, for "until it passes" (`/loop` is interval polling); `ultracode` or a workflow for fan out; in conversation subagents for parallel reads. Weave these inline; the assistant runs them itself:

- `/code-review [level] --fix` on the diff, once at the end of a Focused or Broad run.
- `/verify` or `/run` to build, run, and observe the change working whenever the deliverable is runnable (the rendered or end to end evidence layer).
- `/security-review` only when the change is security relevant (auth, secrets, input handling, external calls, permissions).
- `/simplify` (four parallel agents) only as a final cleanup when the diff is large.
- A fresh critic subagent per phase only for large or risky Broad phases; otherwise one critic or `/code-review` at the end. Do not stack every gate on a small change.
- `/code-review ultra` is cloud, billed, and user invoked; leave it out of an autonomous prompt.
- Harsh critic loop, when the user asks for one (there is no built in self looping critic): build, then a fresh critic subagent reviews only the diff or render and tries to refute it, feed back, repeat until the critic raises no blocking issue. The goal condition ("critic reports zero blocking gaps") makes it terminate. Give the critic an objective bar and concrete evidence (blind side by side, an empty gap list), not the word "perfect". Agent teams `TaskCompleted` and `TeammateIdle` exit 2 hooks are the enforced variant.

## Workflow shape (Broad)

The run authors its own workflow script; the mission tells it how to keep that cheap:

- One fresh agent per phase or independent slice; each reads the progress file plus a short handoff and returns a summary of 1k to 2k tokens, with bulky output written to files and passed by path. Prefer a pipeline over barriers unless a stage needs all prior results (dedupe, early exit on zero).
- Every agent prompt is the shared static prefix first and that agent's item last.
- `agent()` takes per call `model` and `effort`; omitted, both inherit the session. Emit: lead and implementers inherit; mechanical stages `effort: 'low'`; a higher effort only for the hardest verify or judge stage; a smaller model (for example `model: 'sonnet'`) for search or read only review only when confident it fits.
- Dedupe, filtering, counting, and other mechanical steps run in plain script code, not agents. `isolation: 'worktree'` only when parallel agents mutate the same files.
- If the user gave a turn token budget (a "+500k" style directive), the script's `budget` is a hard ceiling; size the fleet to it.

## Long horizon binding

The neutral model is `references/long-horizon-autonomy.md`. On Claude Code: one standing completion condition spans the whole mission (the workflow's `Done =`, or `/goal`) so the run survives compaction and returns only when everything holds; a progress file (for example `progress.md`) is rewritten each cycle and reread after any `/compact` or auto compact; reground (goal, progress, repo state) before acting, never from the summary alone; each verification runs in a fresh subagent so a polluted window cannot approve itself; checkpoint per phase; in a single agent run, `/clear` or `/compact` with a focus between phases. Auto compact is on by default, so assume it fires mid run (`/autocompact` tunes the threshold). Add "do not delete tests or weaken checks to satisfy the goal".

## Harness controls to name (out of prompt)

- Permissions: pass the mission allowlist on the launch line (`--allowedTools "Edit,Write,Bash(git *),Bash(make *)"`, space before `*`); `/fewer-permission-prompts` can build it from past transcripts and `/permissions` persists it.
- Outage self heal: `--fallback-model sonnet,haiku`.
- Isolation: `claude --worktree`, or subagent `isolation: worktree`, when parallel agents mutate files.
- Detached running: `/background [prompt]` (`/bg`); `/tasks` to watch, `/stop` to kill.
- Recovery: `/rewind` (`/checkpoint`, `/undo`) is the operator's return to a known good point; the run's own recovery is bounded retry plus git.
- Durable memory: `/memory` and auto memory (`autoMemoryEnabled`) hold facts that outlive the mission; volatile run state stays in the progress file.
- Hooks enabled: `/goal` requires them; `/hooks` or `.claude/settings.json` `hooks` also installs the deterministic Stop hook gate.

## Primitive catalog

- **`/goal <condition>`**: installs a session Stop hook; after every turn a small fast model (Haiku) judges the condition from the transcript only, with no commands or file reads, so the condition must be something the run visibly demonstrates (`make test` matches baseline, files moved, `git status` clean). Fold in the whole mission's acceptance and bound it (`or stop after N turns`) or it never returns. One goal per session; at most 4,000 characters; needs hooks; pairs with auto mode. Add "do not delete tests" or the agent may delete failing tests to satisfy it.
- **Stop hook (script)**: a `Stop` hook that exits 2 blocks the turn from ending until a script passes (Claude overrides after 8 blocks).
- **`/loop [interval] [prompt]`**: interval repetition while the session is open (poll a deploy, babysit a PR); not a completion gate.
- **Cloud routines (`/schedule`)**: durable unattended scheduling beyond a session (at least hourly, API fire, GitHub PR or Release); the outer trigger, with a workflow, team, or subagents as the inner engine.
- **Fan out**, by who holds the plan: in conversation subagents (the Agent tool; the default meaning of "fan out"; parallel, isolated, return summaries; custom roles in `.claude/agents/<name>.md`, invoked by name or `@agent-<name>`), then agent view (`claude agents`), then agent teams (experimental, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; lead plus peers on a shared task list; only when parallel workers must challenge each other), then dynamic workflows (a script spawns agents through `agent()`, `pipeline()`, `parallel()`; runs in the background and returns only the final answer; about 16 concurrent and 1,000 per run; trigger with `ultracode` or "use a workflow" from human typed input; resume reruns every agent started after the first unfinished one).
- **ultracode, two forms**: the keyword in the prompt starts one workflow for that task; `/effort ultracode` is a standing session mode (xhigh plus a workflow per task, only on xhigh capable models). Both cost more tokens; use them for Broad runs only.
- **Auto mode** (`--permission-mode auto`): a classifier blocks escalations while routine work proceeds unprompted; this is what lets a run go unattended.
- **Composition**: `/goal` plus auto mode is the canonical unattended single agent run; a workflow plus a fresh critic subagent fans out and self verifies; one `.claude/agents/<role>.md` reused as subagent, workflow stage, and teammate defines a role once.

## Worked example (Broad)

Raw: "build a AAA game, fan out subagents on each system, /loop until each is perfect, a harsh critic compares blind side-by-side vs the real game and keeps going, ultracode." Becomes one self driving mission with no plan mode, approval pause, or operator note:

- Launch: the mission pasted once, beginning with `ultracode`; auto mode is already on.
- Static block first: local branch only, nothing published; survival block; loop breakers; each subsystem built by a fresh worktree isolated agent at default effort, the critic stage at higher effort.
- Engine: a builder agent per subsystem; a fresh critic compares each render blind against reference frames and names every gap; the builder fixes and resubmits until the critic list is empty; `/code-review` the final diff.
- Last: `Done =` every subsystem passes its blind side by side critic with zero AAA blocking gaps, progress saved to `progress.md`, or stop after N rounds per subsystem. The raw `/loop` becomes this condition, since `/loop` only polls.

## Version and recency notes (verify against `claude --version`)

- Renames: `Task` tool became `Agent`; workflow keyword `workflow` became `ultracode` (v2.1.160); `/ultrareview` became `/code-review ultra`, `/review` became `/code-review`; `/ultraplan` removed; `TeamCreate` and `TeamDelete` removed (teammates spawn through the Agent tool).
- Version gated: workflows from 2.1.154 (Pro needs the `/config` opt in), `/effort ultracode` from 2.1.203, cross session messaging from 2.1.224 (macOS and Linux only), `/subtask` fork from 2.1.212. No `--max-turns` as of 2.1.221.
- Platform gated: auto mode is the Pro, Max, and Team default since 2026-08-14, but not on Bedrock, Vertex, or Foundry; `/code-review ultra` needs claude.ai auth.
- Experimental or preview: agent teams, cloud routines, `/loop`.
