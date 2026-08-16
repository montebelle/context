# Evidence standard

Derived from the primary-source review saved on 2026-08-07 at:
`research/prompt-context-engineering-2026-08-07/final-report.md`

Use this reference as decision guidance, not as a fixed prompt template.

## Strongest durable findings

- No universal optimal prompt length or structure is established.
- Design the complete model-visible invocation: privileged instructions, task text, history, retrieved material, examples, tools, schemas, memory and state.
- Separate input-context capacity from reliable task-specific utilization and from output or reasoning budgets.
- Raw token count is an inadequate optimization target. Relevance, conflicts, position, document integration, retrieval quality and task demands all matter.
- More context helps when it supplies necessary evidence or constraints; it can hurt through distraction, conflict, retrieval noise, compression errors or position sensitivity.
- State stable rules once at the highest appropriate authority. Resolve conflicts instead of repeating instructions.
- Formatting is functional when it separates semantic roles or enables machine validation. XML, Markdown, headings and tables are not universal performance rituals.
- Examples are conditional interventions. Test zero-shot, representative few-shot, diverse examples and ordering where examples matter.
- Acceptance artifacts often outperform extra prose: executable tests, schemas, source code, rubrics, mockups and authoritative references.
- Reasoning-capable models should use supported reasoning controls. Prefer observable verification artifacts over demands for visible chain-of-thought.
- Agent performance depends on tools, interface design, state, permissions, recovery and evaluation, not prompt text alone.
- Progressive disclosure is useful when routing is reliable and a miss is affordable. Always load high-authority, high-frequency and high-cost-to-miss information.
- Prompt wording cannot create a security boundary. Use least privilege, approval gates, sandboxing, secret isolation, provenance, validation and monitoring outside the model.
- Choose prompt variants through held-out, model-pinned, repeated ablation.

## Placement

- System/developer: stable role, authority, global boundaries, uncertainty policy, universal response contract.
- User/task: current outcome, inputs, relevant context, constraints, deliverable and success criteria.
- Repository guidance: durable project conventions, architecture invariants and build/test commands.
- Skill: reusable workflow, routing, specialized references, scripts and templates.
- Tool description: capability, selection conditions, parameter semantics, returns, errors, side effects and permission class.
- Retrieval: current task-relevant evidence with provenance, version and trust metadata.
- Memory/state: verified durable facts and compact task state; avoid secrets, unsupported inference and needless transcripts.
- Evaluation: observable criteria, severity/weights, evidence requirements and abstention rules.

## Context triage

Keep a context item when at least one is true:

- It changes the correct answer or authorized action.
- It defines a hard constraint or acceptance check.
- It supplies authoritative evidence the model otherwise lacks.
- It disambiguates routing, tools, recovery or stopping.
- Omitting it has a high expected failure cost.

Load progressively when the item is bulky, specialized, volatile or rarely needed and retrieval recall is adequate. Remove stale, superseded, redundant, conflicting or merely decorative material.

## Model portability

Create a portable core containing outcome, authoritative context, hard constraints, success criteria and output contract. Add thin adapters only for an exact model/version and supported behavior such as reasoning controls, tool calling, structured output or long-context placement. Re-evaluate after model or harness changes.

## Evaluation

For important reusable prompts:

1. Freeze exact model/version, settings, system context, tools, retrieval corpus, output budget and harness.
2. Predeclare success metrics and hard safety gates.
3. Use representative normal, edge, adversarial, long-session and missing-information cases.
4. Change one prompt/context component at a time.
5. Run repeated trials where nondeterminism matters.
6. Preserve complete inputs, context manifests, outputs, traces, tokens, latency and cost.
7. Use deterministic validators first; blind human or calibrated model graders to variant identity.
8. Report distributions and failure modes, not only averages.
9. Test exact models separately.
10. Select the smallest, cheapest variant that clears all quality and safety thresholds, then confirm on held-out cases.

## Evidence limits

Provider documentation is authoritative guidance for the named provider/model, not independent causal proof. Older-model findings may not transfer. Broad claims that examples necessarily narrow exploration, that one delimiter is best, or that a fixed context percentage is optimal remain unresolved.
