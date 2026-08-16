# Harness orchestration (Claude Code)

Load when the request involves running autonomously, iterate-until-done, fan-out or parallelism, scale beyond one context window, verification or quality gates, or names a Claude Code control (`/loop`, `/goal`, `ultracode`, workflow, subagents, auto mode). For exact syntax and the full command list, see `references/claude-code-commands.md`.

Caveat: syntax changes fast across the v2.1.x line (keyword, tool, and command names have all been renamed) — use the current names but expect the user to verify against their build (`claude --version`); caveats are at the end. Real security (least privilege, sandboxing, secret isolation) lives in the harness, not in prompt words.

## Write it to run autonomously, end to end

The default for an orchestration prompt is a self-driving mission: it runs start to finish without stopping to ask, and the **completion condition — not a human checkpoint — is what ends it**. The commands go inline as the engine, not as steps a human executes:

- **`ultracode`** (or "use a workflow") up front to fan the work out and run at full effort.
- **One standing `/goal`** whose condition is the *entire* mission's done-state (every phase, plus the final acceptance check), so the run persists across turns and context windows and only returns control when everything holds. Make the condition transcript-verifiable (tests pass, files exist, `git status` clean), and add long-horizon autonomy to it: keep working across context windows, save progress to a file, never stop early on token budget.
- **Auto mode** so it never pauses for permission inside its scope.

Do **not** insert plan mode, "PAUSE for approval," "your call," billing asides, or an operator note explaining who-types-what — those break the autonomous run. Write every command inline as part of the mission. The prompt *is* the launch: the user pastes it once and it drives itself.

This assumes an interactive, human-typed session, where the inline `ultracode` keyword and a pasted `/goal` take effect. If the prompt will run headless (`claude -p` / CI / a routine), the `ultracode` keyword is inert (non-human origin) and mode isn't set from chat — pass the equivalents as launch flags instead: `--effort ultracode`, `--permission-mode auto`, and `claude -p "/goal …"`. State that switch under `Harness controls` when the run is headless.

**Bound autonomy with hard boundaries, not confirmation prompts.** State the irreversible/external edge as a stop line in the prompt — branch only; no push, tag, PR, deploy; no live external calls. Autonomy runs free inside reversible/local scope (a branch, a sandbox) and hard-stops at that edge; the human reviews the finished branch, not mid-run. Only a genuinely destructive, unavoidable external action gets gated individually — everything else runs. (A human checkpoint goes in only when the user asks for one.)

Match the command to the section's job:

- **Persist until the whole mission is done** → one standing `/goal <condition covering every phase>`.
- **Fan out / parallelize / max effort** → `ultracode` or "use a workflow"; in-conversation subagents for parallel reads.
- **Never pause on permissions** → auto mode.
- **Review / verify inside the run** → `/code-review`, `/security-review`, a fresh critic subagent (the assistant runs these itself).
- **Keep context clean across phases** → `/clear` / `/compact`, plus a progress file for cross-window continuity.

Keep it accurate while embedding: `/goal`, not `/loop`, for "until it passes" (`/loop` is interval polling); `ultracode`/workflow for fan-out; subagents by default for parallel work. The `/goal` evaluator judges the transcript only — no commands, no file reads — so the condition must be something the run visibly demonstrates, and it needs a bound (`or stop after N turns`) or it never returns.

## When to orchestrate at all

Even an autonomous prompt should be as simple as the task allows — add orchestration where it earns its place, not everywhere. Multi-agent runs cost many times the tokens of one thread (~15× for Anthropic's research system; each subagent carries fixed startup overhead), and over-spawning is the named failure. So size the engine to the work: a single agent with a `/goal` loop for a focused task; subagent fan-out for genuinely independent subtasks or noisy investigation; a workflow only when the job exceeds one context window or findings must be cross-verified; agent teams (experimental) only when parallel workers must challenge each other.

## Primitive catalog

**`/goal <condition>`** — the autonomous engine's stop signal. Installs a session Stop hook; after every turn a small fast model (Haiku) judges the condition from the transcript only. Write a condition the run visibly demonstrates (`make test` matches baseline, files moved, `git status` clean), fold in the whole mission's acceptance, and bound it. One goal/session; ≤4,000 chars; needs hooks enabled; pairs with auto mode for unattended running. Add "do not delete tests" or the agent may delete failing tests to satisfy it.

**Stop hook (script)** — deterministic version: a `Stop` hook that exits code 2 blocks the turn from ending until a script passes (Claude overrides after 8 blocks).

**`/loop [interval] [prompt]`** — interval repetition while the session is open (poll a deploy, babysit a PR). Not a completion gate — for "until done" use `/goal`.

**Cloud routines (`/schedule`)** — durable unattended scheduling (≥1h, API fire, GitHub PR/Release) beyond a session; outer trigger, inner engine still a workflow/team/subagents.

**Fan-out — the axis is who holds the plan:** in-conversation **subagents** (the Agent tool; default meaning of "fan out"; parallel, isolated, return summaries; custom roles in `.claude/agents/<name>.md`, invoke by name or `@agent-<name>`) → **agent view** (`claude agents`) → **agent teams** (experimental, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; lead + peers, shared task list) → **dynamic workflows** (a script spawns many agents via `agent()`/`pipeline()`/`parallel()`, background, returns only the final answer; ~16 concurrent / 1,000 per run; trigger with `ultracode` or "use a workflow" from human-typed input; resume re-runs every agent started after the first unfinished one). **Worktree isolation** (`claude --worktree`, or subagent `isolation: worktree`) when parallel agents mutate files and would collide.

**Harsh-critic loop (no built-in self-looping critic exists).** Express as an orchestrated loop the run drives itself: build → a fresh critic subagent reviews only the diff/render and tries to refute it → feed back → re-run until the critic raises no blocking issue. The `/goal` condition ("critic reports zero blocking gaps") is what makes it terminate. Give the critic an objective bar and concrete evidence (blind side-by-side, an empty gap list), not the word "perfect." (Agent-teams `TaskCompleted`/`TeammateIdle` exit-2 hooks are the enforced-gate variant.)

**ultracode — two forms:** the `ultracode` keyword in the prompt = one workflow for that task; `/effort ultracode` = standing session mode (xhigh + a workflow per task; model-gated to xhigh-capable models). Both cost more tokens; both are what to lead an autonomous fan-out with.

**Review:** `/code-review [level] [--fix] [target]` — local; the assistant runs it inside the run. `/code-review ultra` — cloud, billed, user-invoked only; leave it out of a fully autonomous prompt.

**Auto mode** (`--permission-mode auto`) — the classifier blocks escalations while routine work proceeds unprompted; the Pro/Max/Team default since 2026-08-14. This is what lets a `/goal` run go unattended.

## Composition patterns

`/goal` + auto mode = the canonical unattended end-to-end run. `ultracode`/workflow + a fresh critic subagent = fan out and self-verify before finishing. A standing `/goal` whose condition spans every phase = the run won't return until fixes + docs + reorg + test-parity all hold. One `.claude/agents/<role>.md` reused as subagent, workflow stage, and teammate = define a role once.

## Version & recency caveats (verify against the installed build)

- Renames: `Task` tool → **`Agent`**; workflow keyword `workflow` → **`ultracode`** (v2.1.160); `/ultrareview` → **`/code-review ultra`**, `/review` → **`/code-review`**; `/ultraplan` removed; `TeamCreate`/`TeamDelete` removed (teammates spawn via the Agent tool).
- Version-gated: workflows ≥2.1.154 (Pro needs `/config` opt-in), `/effort ultracode` ≥2.1.203, cross-session messaging ≥2.1.224 (macOS/Linux only), `/subtask` fork ≥2.1.212.
- Platform-gated: no auto-mode-default on Bedrock/Vertex/Foundry; `/code-review ultra` needs claude.ai auth.
- Experimental/preview: agent teams (env flag), cloud routines, `/loop`.

## Worked example — an autonomous run

Raw: "build a AAA game, fan out subagents on each system, /loop until each is perfect, a harsh critic compares blind side-by-side vs the real game and keeps going, ultracode." Becomes one self-driving mission — no plan mode, no approval pause, no operator note:

- Open with `ultracode` to fan each subsystem out to its own workflow agent at full effort; run in auto mode so it never pauses.
- One standing goal ends the run: `/goal every subsystem passes its blind side-by-side critic with zero AAA-blocking gaps; keep working across context windows, save progress to progress.md, never stop on token budget — or stop after N rounds per subsystem`.
- Engine the prompt describes: a subagent builds each subsystem (worktree-isolated); a fresh critic subagent compares each render blind against reference frames and names every gap; the builder fixes and resubmits until the critic is empty; `/code-review` the diff before finishing. The goal condition, not a human, decides done.
- Hard boundary: local/branch only, nothing published.
