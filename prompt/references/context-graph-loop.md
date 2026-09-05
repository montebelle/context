# Context and graph loop

Load when the mission is code work — implementation, debugging, or review — so the emitted prompt carries a bounded per-task execution loop and concrete loop breakers. This is the tactical companion to `long-horizon-autonomy.md` (which handles surviving compaction across a whole mission); this file makes self-verification, self-healing, and pacing operational inside a single task. Harness-neutral; the search/graph steps map to whatever code-search and call-graph tools the executing agent has.

## The loop

Use this loop for implementation, debugging, and review:

1. **Scope:** state one objective, success criteria, owned files, and constraints.
2. **Retrieve:** use semantic search only when the identifier is unknown; otherwise use exact search.
3. **Impact:** inspect callers/callees and affected flows before editing a symbol.
4. **Execute:** make the smallest coherent patch; do not graph-wrap mechanical actions.
5. **Verify:** run focused tests and static checks with real output.
6. **Detect:** audit affected symbols/flows once the patch is stable.
7. **Checkpoint:** record decisions, owned files, verification, risks, and the exact next action.

## Loop breakers

State these as explicit rules in the emitted prompt — they are what stop a run from thrashing:

- After **15 tool actions without measurable progress**, stop and re-plan.
- After **two failed repetitions of the same approach**, choose a different approach.
- At **70% context**, stop broad exploration and compact with a precise focus.
- After the **second compaction**, prepare a checkpoint (the durable progress file from `long-horizon-autonomy.md` §1).
- After the **third compaction**, end the session and resume from the checkpoint.

Never treat a high cache ratio as sufficient optimization. Optimize for verified outcomes per uncached input token.

## Emitting it

For a coding mission, fold the loop into each phase (scope → retrieve → impact → patch → verify → detect → checkpoint) and place the loop breakers next to the long-run survival block. Keep it compact: name the steps and the five thresholds; do not restate them per phase.
