# Task adapters

Select one primary adapter after routing. Add one secondary adapter only when the task genuinely spans surfaces.

## Coding and debugging

Include target, observable failure, failing stage, negative evidence or what already passed, authorized mutation, deliverable, and task-specific tests. Retrieve current files, logs, and runtime/dependency versions. Harness: sandbox, diff, tests, read-back, rollback.

## Infrastructure and fleet

Include target hosts, source of truth, mutation scope, freshness requirement, stop condition, restart lifecycle, and rollback expectations. Retrieve live configs, versions, service/job state, and auth availability. Harness: credentials, remote permissions, backups, probes, staged restart.

## Repository audit

Include verified root, scope, exclusions, evidence standard, completeness counters, and report schema. Retrieve inventory and git state/history. Harness: filesystem-authority check and unreadable/generated-item accounting.

## Research

Include precise questions, scope/date, source hierarchy, extraction fields, synthesis, uncertainty, citations, and adversarial review proportional to cost. Distinguish peer-reviewed evidence, preprints, provider guidance, convention, and inference. Harness: query/source log, citation checks, numeric validation.

## Scheduled intelligence and content

Include audience, freshness, source diversity, content contract, output destination, and stale/duplicate exclusions. Split the workflow into collect, deterministic transform, synthesize, validate, publish, read back, and report. Harness: scheduler, dedupe, stale-template gate, semantic checks, publication read-back.

## UI and dashboard

Include routes/tabs, users and journeys, data rules, visual assets, states, viewports, and a rendered acceptance matrix. Retrieve APIs, mappings, logs, CSS/assets, and screenshots. Harness: browser traversal, visible-state assertions, asset/status checks, visual evidence.

## Creative and media

Include format, dimensions, template, visual contract, source assets, and publication authority. Retrieve approved assets and renderer/platform state. Harness: image/video inspection, preview, read-back, duplicate-post prevention.

## Client and persona

Include the client-native objective, allowed sources, schema, approved identity, and prohibited cross-client framing. Retrieve only verified client bootstrap and approved identity sources. Harness: ACLs, client isolation, schema validation.

## Model and runtime

Include intended primary/fallback policy, affected scope, compatibility constraints, and freshness requirement. Retrieve installed versions, model availability, auth state, current config, and job pins. Harness: smoke calls, config validation, health checks, staged restart.

## Skill, system, tool, and repository guidance

Include target surface and authority layer; remove rules already enforced above it. For tools, state selection conditions, parameters, returns, errors, side effects, and permission class. For skills, keep core routing compact and put detail in conditional references. Harness: schema validation and version-pinned evaluation.

## Memory and context architecture

Include purpose, authority, provenance/freshness, update/deletion rules, and poisoning boundaries. Prefer deterministic current-source loading. Retrieve compact analogous cases only when useful. Harness: ACLs, stale-record handling, index/version controls.

## Agentic workflow

Include observable goal state, explicit current state, authorized actions, approval gates, tools, recovery, stopping, and proof. Break giant turns into staged transitions with deterministic collection/transform where possible. Harness: permissions, retries, checkpoints, idempotency, observability. For Claude Code autonomous-run orchestration (loop/goal/workflow/subagents/modes), see `references/harness-orchestration.md`.

## External or destructive action

Include exact target, side effect, approval requirement, and stop-before-action boundary. Harness: least privilege, confirmation gate, secret isolation, recoverable operation, audit log.

## Evaluation and review

Include target, priorities, observable rubric, evidence requirement, critical failures, abstention, and return schema. Name the validation layer: file, test, API, rendered, semantic, publish, or end-to-end. Harness: deterministic validators, blinded grading, repeated model-pinned trials.
