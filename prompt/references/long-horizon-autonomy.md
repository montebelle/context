# Long horizon autonomy

Rationale and sources for the survival block, which lives in `SKILL.md` (Orchestrated prompts) and is emitted for every Focused or Broad mission; it is not needed to emit the block. Read it when a run must last hours to weeks or the target harness has no binding. Harness neutral; the bindings live in `harness-orchestration.md` (Claude Code), `codex-adapter.md` (Codex/GPT), and `openclaw-adapter.md` (OpenClaw). Bind each item to the harness; on a harness without a goal gate or subagents, state the degradation.

## Why each item is there

Premise: a long run's context is neither durable nor uniformly reliable. Every frontier model degrades as the window fills, even when the needed fact is still present, and worst when it sits mid context ("lost in the middle") [context rot; LOCA-bench]. Cost grows the same way: each request rereads the whole window. So the prompt must make the run survive its own context loss, prove its own work, and recover from its own failures, stated explicitly; do not assume the model does them unprompted.

1. **Durable external state.** In context history is a narrative about state, not state; compaction rewrites it. The progress file holds append only decisions, remaining work, and the last good checkpoint. Rewrite the live plan each cycle so it sits at the end of context where attention is strongest, and keep the file recoverable rather than complete (store a path, URL, or id, not the raw blob) [Anthropic; Manus].
2. **Compaction survival.** Compaction should keep architectural decisions, open bugs, and implementation details and drop redundant tool output [Anthropic]. Never continue from a summary alone. Restate the goal and hard invariants where compaction cannot strip them: the standing completion condition, repository guidance, and the progress file header [Slipstream].
3. **Self verification.** Tests, schema, build, or a fresh critic with a clean context reviewing the diff; never self assertion. Isolate verification so a polluted context cannot rubber stamp its own work [Anthropic (subagents); CORAL]. Scale the number of critics to the size and risk of the phase.
4. **Self healing.** Monitor, detect, diagnose, bounded retry or backoff, escalate; a detect, diagnose, recover, verify loop beats retry only and blind replanning [Self Healing Orchestrators]. A standing completion gate invites weakening checks, so forbid it.
5. **Resumability.** Idempotent, checkpointed steps resume without redo or double write; aligned checkpoints (agent state plus environment) let the run return to a known good point after a bad branch [AgentRewind]. A one shot that dies at 90% loses everything; a checkpointed run loses one step.
6. **Pacing and termination.** Checkpoint on a fixed cadence (per phase or per N actions); "save progress and continue in a fresh context" crosses context boundaries; the completion condition plus a hard stop bounds the run, or it never returns. Treat externalizing working memory as an explicit step [CORAL; Externalization review]. Make the run auditable: an inspectable per phase trace (what ran, the evidence, the checkpoint); where the harness supports OpenTelemetry GenAI spans, instrument tool and model calls, otherwise the progress file is the trace [OTel GenAI conventions].
7. **Fresh context over long lived agents.** Subagents that return 1k to 2k token summaries and write bulky output to files keep each window small [Anthropic context engineering; multi agent research system]. A fresh agent per phase pays one new prefix instead of rereading an ever growing window on every request.

`context-graph-loop.md` makes items 3 to 6 operational inside a single code task (execution loop and loop breakers).

## Sources

- Anthropic, *Effective context engineering for AI agents*: compaction, structured note taking, subagents. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic, *How we built our multi-agent research system*: token multiples, subagent output to files. https://www.anthropic.com/engineering/multi-agent-research-system
- *Context rot* (Chroma, 2025) and *LOCA-bench* (arXiv 2602.07962): degradation as context grows; lost in the middle.
- Manus, *context engineering lessons* (2025): file system as durable state; recoverable, not complete; plan kept at end of context.
- *Slipstream: Trajectory-Grounded Compaction Validation for Long-Horizon Agents*, arXiv 2605.08580.
- *Self-Healing Agentic Orchestrators for Reliable Tool-Augmented LLM Systems*, arXiv 2606.01416.
- *AgentRewind: Recoverable Execution for Long-Horizon LLM Agents*, arXiv 2608.14380.
- *CORAL: Cognitive Resource Self-Allocation* ("Don't Lose the Thread"), OpenReview NBGlItueYE.
- *Externalization in LLM Agents: A Unified Review*, arXiv 2604.08224.
- OpenTelemetry GenAI semantic conventions. https://opentelemetry.io/docs/specs/semconv/gen-ai/
