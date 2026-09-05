# Long-horizon autonomy

Load when an emitted orchestration prompt must run unattended across long horizons (hours to weeks) — long enough that the context window will be summarized, cleared, or restarted at least once. This is harness-neutral decision guidance; the per-harness bindings live in `harness-orchestration.md` (Claude Code) and `codex-adapter.md` (Codex/GPT).

Premise: a long run's context is neither durable nor uniformly reliable. Every frontier model degrades as the window fills — accuracy drops even when the needed fact is still present, and worst when it sits mid-context ("lost in the middle") [context-rot; LOCA-bench]. So the emitted prompt must make the run survive its own context loss, prove its own work, and recover from its own failures. State each of these as explicit instructions in the prompt; do not assume the model does them unprompted.

## 1. Durable external state

In-context history is a narrative about state, not state — compaction rewrites it. Instruct the run to keep one external progress file as source of truth: append-only decisions, remaining work, and the last-good checkpoint. Rewrite the live plan each cycle so it sits at the end of context where attention is strongest, and keep the file recoverable rather than complete (store a path / URL / id, not the raw blob) [Anthropic; Manus].

## 2. Compaction & context-loss survival

Assume the window will be compacted or the session restarted mid-run. Compaction summarizes and reinitializes — it should keep architectural decisions, open bugs, and implementation details and drop redundant tool outputs [Anthropic]. The prompt must tell the agent to **re-ground after any compaction or restart before acting**: re-read the goal, the progress file, and current repo/live state; never continue from a summary alone. Restate the goal and hard invariants where compaction cannot strip them — the standing completion condition, repository guidance, and the progress-file header [Slipstream].

## 3. Self-verification

Each phase ends by proving itself against an objective check — tests, schema, build, or a fresh critic with a clean context reviewing the diff — never self-assertion. "Done" requires evidence the run visibly produced. Isolate verification in a sub-agent or clean window so a polluted context cannot rubber-stamp its own work [Anthropic (sub-agents); CORAL].

## 4. Self-healing

On a failed check or error, run monitor → detect → diagnose → bounded retry/backoff → escalate, and log each failure and its cause to the progress file so a retry does not repeat it. A detect-diagnose-recover-verify loop beats retry-only and blind replanning on reliability [Self-Healing Orchestrators]. Never weaken or delete a check to make it pass — a standing completion gate invites exactly that shortcut, so forbid it in the prompt.

## 5. Resumability & one-shot design

Design steps to be idempotent and checkpointed so an interrupted run resumes without redo or double-write; record aligned checkpoints (agent state + environment) so the run can return to a known-good point after a bad branch [AgentRewind]. Prefer resumable iteration over a fragile single pass — a one-shot that dies at 90% loses everything, a checkpointed run loses one step.

## 6. Pacing & termination

Checkpoint on a fixed cadence (per phase, or per N actions), continue across context and budget boundaries ("save progress and continue; do not stop on token budget"), and bound the mission with a completion condition the run visibly demonstrates plus a hard stop — without the bound it never returns. Treat externalizing working memory / checkpoints as an explicit agent step, not an afterthought [CORAL; Externalization review].

Tactical companion: `context-graph-loop.md` supplies the per-task execution loop and concrete loop breakers (action budget, repetition limit, context-percentage and compaction-count escalation) that make sections 3–6 operational inside a single task.

## Emitting the "long-run survival" block

When SKILL.md step 10 flags a long-horizon or unattended run, the emitted prompt must carry a compact block instructing: (a) write and maintain a durable progress file; (b) re-ground from goal + progress + state after any compaction; (c) self-verify each phase against an objective check; (d) self-heal with bounded retry, then escalate; (e) idempotent, resumable checkpoints; (f) a bounded completion condition. Bind these to the harness via the two references above. On a harness without a goal-gate or sub-agents, state the degradation — do not assume the primitive exists.

## Sources

- Anthropic, *Effective context engineering for AI agents* — compaction, structured note-taking, sub-agents. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- *Context rot* (Chroma, 2025) and *LOCA-bench* (arXiv 2602.07962) — degradation as context grows; lost-in-the-middle.
- Manus, *context-engineering lessons* (2025) — file system as durable state; recoverable-not-complete; plan kept at end of context.
- *Slipstream: Trajectory-Grounded Compaction Validation for Long-Horizon Agents* — arXiv 2605.08580.
- *Self-Healing Agentic Orchestrators for Reliable Tool-Augmented LLM Systems* — arXiv 2606.01416.
- *AgentRewind: Recoverable Execution for Long-Horizon LLM Agents* — arXiv 2608.14380.
- *CORAL: Cognitive Resource Self-Allocation* ("Don't Lose the Thread") — OpenReview NBGlItueYE.
- *Externalization in LLM Agents: A Unified Review* — arXiv 2604.08224.
