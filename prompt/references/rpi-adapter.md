# RPI delivery adapter

Use this adapter to shape prompts for non-trivial software delivery that must move through proven current state before it writes code. It encodes the RPI (Requirements → Planning → Implementation) discipline as a prompt pattern, not as a skill install. Adapted from the RPI skill family (github.com/alanw707/rpi-skills, MIT © axwang); distilled here as prompt-writing rules only.

Select this as the primary adapter when the request is a multi-file feature, bug, or refactor where acting on an unproven premise is the main failure risk. For lightweight edits with an obvious file set, prefer the Coding adapter. This is a specialization of the Agentic workflow adapter, so pair it with `references/harness-orchestration.md` (or `codex-adapter.md`) when the run also needs fan-out or unattended execution, and with `references/long-horizon-autonomy.md` when it spans compaction — do not restate their durable-progress and resumable-checkpoint rules here.

## Phase contract to encode

Have the prompt drive the executor through gated phases, each with an explicit entry condition and exit proof. Skip any phase the request has already satisfied; never skip its exit proof.

- **Spec** — normalize the ask into one implementation-neutral change contract: goals, non-empty non-goals, observable acceptance criteria. Forbid inventing files, symbols, or a solution shape here.
- **Research** — prove current state before planning. Classify each requirement/acceptance criterion as `already true`, `not true`, or `unknown`, each backed by `file:line` evidence. Keep verified facts separate from open unknowns. Exit only when the change is plan-ready.
- **Plan** — sequence tasks against verified facts, resolve material design questions, state exact build/test commands. No unproven seam becomes a task.
- **Implement** — execute planned tasks in small validated batches; run the build after each batch and the full test command at the final gate. Make the smallest cohesive edit inside the planned file set.
- **Review** — check that the chain is coherent (spec → research → plan → implementation traceable) and the touched code meets standards.

## Rules that change correctness

- **Current-state proof gates action.** The prompt must require cited evidence that a premise holds before the executor acts on it. This is preflight proof, distinct from the completion evidence named via `references/evidence-standard.md`; a strong delivery prompt names both.
- **Replan on broken premise.** State an explicit stop-and-replan trigger: if evidence contradicts the researched seam, scope widens beyond the plan, a required build/test command cannot be stated exactly, or a resolved design question reopens, the executor stops and returns to the earlier phase instead of pushing through. This bounds autonomy at the premise edge, not with a human confirmation pause.
- **Route findings back to their phase.** For the review step, require every finding to carry a route label naming the phase that must fix it (spec, research, plan, or implement), so the fix lands where the defect originated rather than being patched blind.

## Optional: iterative grilling

When the user explicitly wants the design pressure-tested before any code, the prompt may instruct one-question-at-a-time interrogation — ask the single highest-leverage unresolved question, wait, turn each answer into an explicit invariant or constraint, repeat until no material ambiguity remains. Do not add this by default: it conflicts with the skill's route-2 rule against withholding a useful draft. Use it only on request or when a wrong assumption would be expensive and no safe draft exists.

## Harness

Deterministic build/test validators per batch; branch or worktree isolation; artifact writes to an authorized path when the run must survive restart (bind to `long-horizon-autonomy.md`, do not reinvent). Completion evidence: the full planned test command passing plus chain traceability, not a generic "verify your work."
