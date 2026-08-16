# Evaluation protocol

Use for reusable, production, high-cost, or variant-comparison prompts.

## Controlled comparison

1. Freeze exact model/version, inference settings, system/developer context, tools, evidence-standard version, retrieval corpus, output budget, and harness.
2. Predeclare success metrics, acceptable cost/latency, and hard safety failures.
3. Use representative normal, edge, adversarial, long-context, permission, exact-output, and missing-information cases.
4. Change one prompt or context component at a time.
5. Run repeated trials where nondeterminism matters.
6. Preserve complete inputs, context manifests, outputs, traces, tokens, latency, cost, and downstream result.
7. Run deterministic validators first: exact strings, schemas, paths, required fields, forbidden authority expansion, and approval boundaries.
8. Blind human or calibrated model graders to variant identity for intent preservation, completeness, usefulness, concision, and evidence-layer correctness.
9. Score prompt quality separately from downstream task and harness quality.
10. Confirm the selected variant on a fresh holdout.

## Metrics

- Intent, scope, voice, and authority preservation
- Unsupported additions or assumptions
- Critical-context omissions
- Exact-output and grounded-follow-up non-expansion
- Correct task adapter and evidence layer
- Prompt-versus-harness diagnosis
- Downstream task success and critical failure rate
- Clarification and correction turns
- Input/output tokens, latency, and cost
- For retrieval: recall@k, precision@k, provenance completeness, staleness, and unsafe retrieval rate

## Adoption gates

Adopt a change only if it reduces critical omissions without increasing authority expansion, exact-output failures, or materially unnecessary tokens. Adopt lexical retrieval only if it improves historical-context cases over static context and direct lookup while meeting privacy, provenance, latency, and staleness thresholds. A single small-test win is insufficient.
