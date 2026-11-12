# Context and graph loop

Read when an orchestrated mission (Focused or Broad) is code work: implementation, debugging, or review. The emitted prompt carries a bounded per task execution loop and concrete loop breakers; this makes self verification, self healing, and pacing from `long-horizon-autonomy.md` operational inside a single task. Harness neutral; the search and graph steps map to whatever code search and call graph tools the executor has.

## Emit this

Name the loop once and fold it into each phase; do not restate it per phase. Place it in the prompt's static block, next to the survival block. In a read only mission (review, audit, verify), execute means record the finding and its proposed fix, not patch.

**Loop:** scope (one objective, success criteria, owned files, constraints) → retrieve (semantic search only when the identifier is unknown, otherwise exact search) → impact (inspect callers, callees, and affected flows before editing a symbol) → execute (the smallest coherent patch; do not graph wrap mechanical actions) → verify (focused tests and static checks with real output) → detect (audit affected symbols and flows once the patch is stable) → checkpoint (decisions, owned files, verification, risks, and the exact next action).

**Loop breakers**, stated as explicit rules; they stop a run from thrashing:

- After 15 tool actions without measurable progress, stop and replan.
- After two failed repetitions of the same approach, choose a different approach.
- At about 150k tokens or 70% of the window, whichever comes first, stop broad exploration: in a fan out run, checkpoint and hand off to a fresh agent; in a single agent run, compact with a precise focus.
- After the second compaction, prepare a checkpoint (the durable progress file).
- After the third compaction, end the session and resume from the checkpoint.

Never treat a high cache ratio as sufficient optimization. Optimize for verified outcomes per uncached input token, and remember that cached rereads of a large window still cost on every request.
