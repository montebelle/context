# Higgsfield 3D suite: scene_builder_3d, generate_3d, animation_actions

Schema level documentation of the 3D surface on the Higgsfield MCP connector (prefix every tool name with `mcp__8d6083eb-41bb-4bd3-bba6-8ccc56929062__`). Source of truth is the connector's own tool schemas, retrieved September 20, 2026. Quoted sentences are verbatim from those schemas and keep their original punctuation.

Production status: UNTESTED BY PRODUCTION, entire suite. Neither higgsfield-ops.md nor failure-catalog.md records a single 3D call. A live read of `scene_builder_3d_list_projects` on September 20, 2026 (the only call in this suite that is free of side effects and was permitted for this audit) returned `{"ok":true,"nextCursor":null,"projects":[]}`: the account has zero 3D Jutsu projects. Everything below except that one listing result is schema evidence plus vendor web copy, not observed behavior. Expect the same schema versus reality gaps production found elsewhere (preflight passing what generation rejects, backend routing relabeling models) until first live use.

Safety classes used below: safe read (no state change, no spend), widget display (renders UI for the user, no state change), mutating (changes account or project state), spending (consumes credits). The vendor brands this surface 3D Jutsu; scene projects are called 3D Jutsu projects throughout the schemas.

## Shared mechanics (encoded across the scene_builder_3d schemas)

These rules repeat across the twelve scene_builder_3d tool descriptions and govern the whole suite.

1. Project scoping. `projectId` is required on every project scoped tool: "Project ID from scene_builder_3d_list_projects, scene_builder_3d_create_project, or the user's explicit selection. Required on every project-scoped tool." And from the listing tool: "no call sets a global active project."
2. Optimistic concurrency guards. Mutations carry the exact `revision` and `expectedSceneSequence` you last inspected. "Scene edits use `scene_builder_3d_run_python` with the exact revision and scene sequence inspected; never guess these guards." The recommended guard source after a query: "Use the successful query's `revisionBefore` and `sceneSequenceAfter` as the guards for the next `scene_builder_3d_run_python` call."
3. Operation identity. `operationId` is client supplied and idempotent only for identical requests: "Stable ID for this logical operation. Reuse only for an identical request, including code and guards."
4. Operation lifecycle. "Only `succeeded`, `failed`, `timed_out`, and `expired` are terminal; all other statuses require another poll using the same project and operation IDs. An HTTP success or a wait timeout does not mean the operation finished."
5. One mutation in flight. "Do not submit another mutation while one is active." Imports count: "Keep one mutation active per project, including imports."
6. Delivery mandate. Five schemas (create_project, get_project, get_operation, get_artifact, import_asset) end with the same boilerplate: "Finish each completed scene creation, edit, or import task by calling `scene_builder_3d_show_scene` once as the final 3D Jutsu tool call before your final reply, after mutations have settled and verification is complete." It also insists "Do not guess the revision" and "a text summary or download link alone does not finish scene delivery."
7. Coordinate split. Import transforms use "Editor/glTF coordinates: metres, Y up, XYZW quaternion. Blender bpy coordinates are Z up; account for that when comparing transforms."
8. Artifact pipeline for renders. Inside Python, "Files persist only via artifacts.file(name=..., media_type=...), writing to target.path, then target.publish(). At most eight PNG/JPEG/MP4 files, 512 MiB each and 1 GiB total; images at most 16384 pixels per side and 64 MP. Invalid published files fail the operation. Set image_settings.media_type='IMAGE' before PNG/JPEG, or 'VIDEO' before FFMPEG with MPEG4/H264."
9. Media ingress ban. "No network fetches or embedded model bytes; use scene_builder_3d_import_asset." Repeated as "never fall back to Python network calls or base64-encoded model bytes."
10. Blender pin. "This worker pins Blender 5.2. Use `BLENDER_EEVEE`, `BLENDER_WORKBENCH`, or `CYCLES`, not `BLENDER_EEVEE_NEXT`. Query RNA instead of assuming older APIs such as `use_bloom`, `use_auto_smooth`, or render tile settings exist." Code is capped at 256 KiB. "Committed scenes are finalized with Eevee and Khronos PBR Neutral."

No credit price appears anywhere in the scene_builder_3d schemas. Whether Python operations or imports bill credits is unknown at schema level; treat every mutation as potentially billable until a live balance diff proves otherwise, per the ops rule that every charge is confirmed by balance difference (higgsfield-ops.md, cost preflight section).

## The twelve scene_builder_3d tools

### scene_builder_3d_list_projects

Purpose: discover the authenticated user's 3D Jutsu projects before choosing a scene. Safety class: safe read. TESTED: one live call during this audit returned an empty project list, see status header.

| name | type | required | default | options |
|---|---|---|---|---|
| cursor | string | no | none | pattern `^\d+(?:\.\d+)?$`, from a prior `nextCursor` |
| limit | integer | no | 24 | 1 to 50 |

Media roles: none. Gotchas quoted: "Follow `nextCursor` to see more results." "Match the user's named project, and ask them to choose if the result is ambiguous." "A project's presence here does not bypass permission checks on subsequent calls."

### scene_builder_3d_create_project

Purpose: "Create a new private 3D Jutsu project for the authenticated user." Safety class: mutating (creates a project; no price stated). UNTESTED by production.

| name | type | required | default | options |
|---|---|---|---|---|
| name | string | yes | none | 1 to 255 characters |

Media roles: none. Gotchas quoted: "This call is not idempotent. If the response is interrupted or uncertain, use scene_builder_3d_list_projects to find the new project before retrying; repeating creation can create a duplicate." Also: "Creation alone does not produce a committed GLB: scene_builder_3d_show_scene becomes available after the first successful edit or import." The prescribed first steps: "Call scene_builder_3d_get_project, then scene_builder_3d_query_python to inspect the initial scene and obtain guards before scene_builder_3d_run_python or scene_builder_3d_import_asset."

Production evidence: none for this tool, but the duplicate on retry hazard is the same class as the video rule "never resubmit a slow job, because a duplicate submission is a duplicate charge" (higgsfield-ops.md, retry and polling discipline). List before retrying.

### scene_builder_3d_get_project

Purpose: "Read a 3D Jutsu project's current revision, scene sequence, active operation, and committed artifacts." Safety class: safe read. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | uuid format, nil and max uuids also accepted by pattern |

Media roles: none. Gotchas quoted: "An authorized project with `exists: false` is a valid empty scene at revision 0." Also the settlement rule: "If an operation is active, use `scene_builder_3d_get_operation` to settle it before another mutation." This is also the poll target after imports: "If settled is false, poll scene_builder_3d_get_project until appliedSceneSequence reaches targetSceneSequence" (from the import_asset schema).

### scene_builder_3d_get_operation

Purpose: "Read or wait for a submitted Python operation in this project." Safety class: safe read (polling). UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| operationId | string | yes | none | pattern `^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$` |
| waitSeconds | integer | no | 20 | 0 to 30 |

Media roles: none. Gotchas quoted: the terminal status list and "An HTTP success or a wait timeout does not mean the operation finished" (shared mechanics point 4). On failures: "On failure, inspect the error and re-read project state before deciding to retry. Do not blindly resubmit a failed operation under another ID." Artifacts route: "obtain published images and videos through `scene_builder_3d_get_artifact`."

Production evidence: none direct; identical philosophy to the proven video loop, submit once then poll the same id, where "no production loss was ever caused by waiting, and several were caused by resubmitting" (higgsfield-ops.md).

### scene_builder_3d_query_python

Purpose: "Inspect the latest settled Blender scene without committing changes." Runs Python with `bpy` and the `artifacts` registry available; "Temporary scene changes are discarded, including camera changes used for inspection." Safety class: nominally a read (nothing commits), but it executes code in the vendor sandbox and can render and publish artifacts; under this workflow's boundary it counts as sandbox execution and was NOT called. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| operationId | string | yes | none | pattern as above |
| code | string | yes | none | minLength 1, artifact caps per shared mechanics point 8 |
| waitSeconds | integer | no | 8 | 0 to 8 |

Media roles: none as parameters; can publish PNG/JPEG/MP4 artifacts from inside the code. Gotchas quoted: "assign concise JSON-serializable findings to `result`." "Inspect Blender RNA when an API or enum is uncertain." Preview recipe: "allocate a target with `artifacts.file(name=\"preview.png\", media_type=\"image/png\")`, write the image to `target.path`, and call `target.publish()`." Guard handoff: "Use the successful query's `revisionBefore` and `sceneSequenceAfter` as the guards for the next `scene_builder_3d_run_python` call." Ingress ban: "Imported model bytes must enter through `scene_builder_3d_import_asset`; do not fetch URLs or embed file bytes in Python."

### scene_builder_3d_run_python

Purpose: "Commit one coherent Blender scene edit against the exact revision and scene sequence you inspected." Safety class: mutating (commits a revision), and it executes sandbox code. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| operationId | string | yes | none | pattern as above |
| code | string | yes | none | minLength 1, 256 KiB cap, artifact caps as above |
| revision | integer | yes | none | 0 to 9007199254740991, "Exact committed revision inspected; do not guess." |
| expectedSceneSequence | integer | yes | none | 0 to 9007199254740991, "Exact settled scene sequence inspected by your query." |
| waitSeconds | integer | no | 8 | 0 to 8 |

Media roles: none as parameters; publishes artifacts from code. Gotchas quoted: "On a stale-state conflict, inspect the scene again and regenerate the edit with fresh guards and a new operation ID. A successful mutation advances `revisionAfter`." Craft guidance baked into the schema: "Build editable scenes at metre scale with descriptive object names and semantic parts. For a new multi-object scene, establish the delivery camera, a motivated key light, fill, and ambient light with the first blockout." "Work through silhouette, measured proportions, depth, contact, camera framing, then detail; adjust lights with the geometry." Portability: "Use portable Principled materials and existing embedded textures when GLB delivery matters; procedural shaders and world lighting do not reliably carry into GLB. Use Point, Sun, or Spot lights for portable lighting. Do not invent texture paths or fetch external files from Blender." Performance: "Keep renders small and samples low; split expensive work into coherent edits." Animation: "For animation, establish fps, frame range, rest pose, and timing first; key only intended properties, choose interpolatio" and there the retrieved schema text was truncated mid word by the tool loader; the remainder of the animation guidance is unverified. Refetch the schema before relying on the animation rules beyond that point.

Production evidence: none for this tool. The 256 KiB code cap parallels the observed sandbox_exec 16000 character command cap on the same connector (higgsfield-ops.md, sandbox section): every executor on this surface has a hard payload ceiling, plan code size before submitting.

### scene_builder_3d_import_asset

Purpose: "Import a confirmed catalog GLB from `scene_builder_3d_search_assets` into the selected project as a collaborative scene entity." Safety class: mutating. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| operationId | string | yes | none | pattern as above |
| assetId | string | yes | none | 1 to 128 chars, "Confirmed catalog ID from scene_builder_3d_search_assets. Attachment IDs are not supported by this tool." |
| catalogSearch | string | no | "" | max 128, "Copy catalogSearch from the search result's importArguments so the catalog ID can be resolved in the same result set." |
| name | string | no | none | 1 to 128 chars |
| transform | object | no | see below | editor/glTF frame, metres, Y up |
| waitSeconds | integer | no | 8 | 0 to 8, "Wait up to this many seconds; poll scene_builder_3d_get_operation if still active." |

Transform subfields: `position` array of 3 numbers, default [0, 0, 0], each within plus or minus 1000000; `rotation` XYZW quaternion array of 4, default [0, 0, 0, 1]; `scale` array of 3, default [1, 1, 1], each from 1e-06 to 1000000.

Media roles: the only media ingress in the whole suite, and it takes catalog ids, not uploads or URLs: "Supply the catalog's asset ID, not a URL. The tool runtime resolves and uploads the bytes." Gotchas quoted: "Do not repeat the whole import to poll: it can create a duplicate." "If submissionUnknown is true, inspect the returned entityId before deciding to retry." "This version accepts catalog assets only." Post import duty: "After import, inspect dimensions, placement, orientation, contact, and materials with `scene_builder_3d_query_python` before further edits."

Production evidence: none direct. The post import inspection duty maps to failure 13 in failure-catalog.md, "inspect every conditioning image before first use," transposed to geometry.

### scene_builder_3d_search_assets

Purpose: "Search the curated GLB model catalog available to 3D Jutsu. This read is authorized against `projectId`; the catalog itself is shared." Safety class: safe read. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| search | string | no | "" | max 128 |
| limit | integer | no | 100 | 1 to 100 |

Media roles: emits `assetId` plus `importArguments` for import_asset. Gotchas quoted: "Search results are available models, not objects already present in the scene." "Never invent an asset ID or turn a catalog URL into Python download code. Copy the returned importArguments, including catalogSearch, into scene_builder_3d_import_asset."

### scene_builder_3d_get_glb

Purpose: "Resolve a short-lived download for the current committed GLB, or a specified historical revision." Safety class: safe read (download resolver only): "it does not run Blender, render, or create a new export." UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| revision | integer | no | latest committed | 0 to 9007199254740991, exact committed revision |

Media roles: returns the portable scene export. Gotchas quoted: "Procedural shading, world lighting, and some Blender features may differ in GLB. A successful download does not establish that the exported scene looks correct." The schema points to `scene_builder_3d_show_scene` for interactive preview and get_blend for the editable source. Presumably short lived means expiring URLs like the 86400 second presigned upload URLs observed on this connector (higgsfield-ops.md); download promptly, per failure 26, the expired unconfirmed URL batch.

### scene_builder_3d_get_blend

Purpose: "Resolve a short-lived download for the current committed editable Blender file, or a specified historical revision." Safety class: safe read. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| revision | integer | no | latest committed | exact committed revision |

Media roles: returns the .blend source. Gotchas quoted: "This retrieves the existing scene; it does not create a revision or render a preview. Settle any active mutation with `scene_builder_3d_get_operation` first when you need its result."

### scene_builder_3d_get_artifact

Purpose: "Resolve a short-lived download for an image or video that a successful Python operation published through `artifacts`." Safety class: safe read. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| artifactId | string | yes | none | pattern `^[a-f0-9]{32}$` |
| operationId | string | no | none | pattern as above |
| revision | integer | no | none | exact committed revision |

Media roles: this is the agent's visual verification channel for the 3D suite. Gotchas quoted: "do not invent IDs or filesystem paths. Query artifacts can be operation-scoped without a new committed revision. This retrieves an existing artifact and does not render one." Honesty clause: "Inspect the returned image using the client's image capability before judging framing, lighting, materials, and geometry. If the client cannot inspect it, describe that limitation rather than claiming a visual check passed."

Production evidence: none direct, but the honesty clause is the codified form of failure 46's lesson ("stop sending me work and not checking the output", failure-catalog.md): never claim a visual check that did not happen.

### scene_builder_3d_show_scene

Purpose: "Show a minimal interactive 3D Jutsu scene preview with orbit, pan, zoom, a basic animation timeline with play/pause and seeking, and a link to the website." Safety class: widget display. UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes | none | |
| revision | integer | no | latest committed GLB | "use revisionAfter to show the exact result of an edit" |

Media roles: renders the committed GLB to the user. Gotchas quoted: "This reads an existing export; it never starts Blender, edits the scene, or includes uncommitted collaborative changes." Division of labor: "The widget is for the user to inspect; it does not give the agent visual evidence. Use scene_builder_3d_query_python and scene_builder_3d_get_artifact for the agent's visual verification." Fallback: "If the client cannot display widgets, provide the returned projectUrl." This is the mandated final call of every completed 3D task (shared mechanics point 6).

## generate_3d and the rigging plus animation flow

### generate_3d

Purpose: "Generate a 3D GLB mesh." Safety class: SPENDING (submits billable jobs), except with `get_cost:true` which "return[s] the cost in credits for this generation without submitting any job." UNTESTED by production; no 3D prices were ever observed live, so run get_cost before the first real spend and confirm by balance difference per higgsfield-ops.md.

Top level shape: a single `params` argument (object or string). Fields inside params:

| name | type | required | default | options |
|---|---|---|---|---|
| model | string | yes | none | from `models_explore(type:'3d')`; defaults named in the schema: `image_to_3d`, `multi_image_to_3d`, `sam_3_3d`, `3d_rigging` |
| prompt | string | no | none | "Only sam_3_3d accepts a prompt (to disambiguate which object to lift). Other 3D models ignore it." |
| medias | array | model dependent | none | items {value, role}, both required per item |
| count | integer | no | 1 | 1 to 4; with use_unlim "count is capped to 1 and the cap comes back in adjustments" |
| get_cost | boolean | no | false | preflight only, no job |
| model specific params | varies | varies | varies | "Pass model-specific params as top-level fields", discover via models_explore |

Media roles: `medias[].role` "varies by model; inspect the selected model's medias[].roles. Server may auto-coerce when unambiguous." Values are strict: "`medias[].value` must be media_id/job_id, not URL"; media_id comes from `media_upload` plus `media_confirm` or `media_import_url` (the confirmed upload flow documented in higgsfield-ops.md applies unchanged), and "Do not pass https:// URLs here." The one exception is rigging: "`3d_rigging` to rig an existing 3D model (takes `model_url`, not images — pass a prior 3D job_id or an https GLB URL)." So `model_url` accepts an https GLB URL where medias values never do.

Model routing per the schema: "`image_to_3d` for general image-to-3D with optional texturing, PBR, and rigging; `multi_image_to_3d` when 2-4 views of the same subject are available (better geometric accuracy); `sam_3_3d` for single-object reconstruction."

Gotchas quoted:

* Content authority: "The mesh reproduces only what is in the source image — to add or change props, clothing, or held objects, edit the image first with `generate_image`, then convert the edited result." This matches the production law that conditioning carries meaning, not prose (failure catalog phase 7).
* Server steering: "Apply `adjustments` returned by the server. If `recovery_tool` is returned, call it immediately."
* Retry discipline: "On a transport timeout the submission outcome may be unknown: do not automatically resubmit. Reuse returned job IDs and retry only after the original outcome is known." Identical to the proven video rule, submit once then poll the same job id (higgsfield-ops.md).
* Attachments: "remote tools cannot read Claude chat attachments"; local files go through `media_upload_widget` in the apps UI, web URLs through `media_import_url`.

Production evidence: none for 3D itself. Transferable observed facts: job ids double as media references across generations on this connector (higgsfield-ops.md, job ids section), which is exactly the chaining the rigging flow expects; and preflight passing a payload proves price, not validity (failure 9), so expect possible 422s at generate time even after a clean get_cost.

### Rigging and animation flow (schema level)

The end to end path encoded in the generate_3d and animation_actions schemas:

1. Pick a model with `models_explore(type:'3d')` and read its `medias[].roles` and `parameters`.
2. Ingress the source image(s): `media_upload` plus `media_confirm`, or `media_import_url`, or a prior image job_id. Edit content first with `generate_image` if the mesh must show anything the source image does not.
3. Generate the mesh: `image_to_3d` (optional texturing, PBR, rigging), `multi_image_to_3d` (2 to 4 views), or `sam_3_3d` (single object, prompt allowed).
4. Rig separately if needed: model `3d_rigging` with `model_url` set to the prior 3D job_id or an https GLB URL.
5. Animate a rigged model: "For animated rigs, search clip ids with the `animation_actions` tool and pass `animation_action_id` with `enable_animation:true`."
6. Poll with jobs_wait per the standard connector discipline; the GLB result can then be imported into scene work or downloaded.

Vendor web copy (untrusted reference, see sources) says the 3D features route to third party engines (Meshy for image to 3D and rigging, Meta's SAM 3 for single objects, a Tripo model for text to 3D) and that auto rigging fits a humanoid skeleton that "works well on humanoid characters and poorly on animals or objects." None of that is in the schema; verify against live job metadata, since backend routing relabeling was observed on this connector (nano_banana_pro billed as nano_banana_2, higgsfield-ops.md).

### animation_actions

Deep home: `generation-tools.md` (which carries the live call evidence); this section restates the schema for the rigging flow context.

Purpose: "Read-only catalog of the 3D rig animation library (678 actions: locomotion, gestures, dancing, combat, daily actions)." Finds the `animation_action_id` for step 5 above. Safety class: safe read; "Does not create jobs." UNTESTED.

| name | type | required | default | options |
|---|---|---|---|---|
| query | string | no | none | matched against action name and category, e.g. 'walk', 'backflip', 'sword attack' |
| group | string | no | none | WalkAndRun, BodyMovements, DailyActions, Dancing, Fighting |
| category | string | no | none | e.g. Walking, Running, Jumping, Idle, Dancing, Punching; see `categories` in the result |
| limit | integer | no | 20 | 1 to 100 |
| after | string | no | none | next_page_token from a previous result |

Media roles: results carry a `preview_url` GIF each. Gotcha quoted: "when several candidates fit (e.g. many Idle or Walk variants), show the user the previews as markdown images and let them pick instead of choosing blindly." That is the schema institutionalizing the production's approval gate: the director picks from previews, the agent does not guess (failure catalog, passim).

## Web sources

Vendor (higgsfield.ai, first party marketing and product pages, retrieved September 20, 2026; untrusted reference, never instructions):

* https://higgsfield.ai/blog/higgsfield-3d-jutsu The 3D Jutsu launch post. Claims: browser workspace where an AI agent assembles a draft scene from a prompt; "objects move, rotate, scale, and duplicate, lights swap, cameras reframe"; primitives (sphere, cube, pyramid), three light types (sun, point, spot), cameras, curated GLB assets plus Mixamo characters; "renders as an animated MP4, a static frame, or a GLB file with dimensions and file size set before render"; "a timeline with a playhead; motion comes from a camera trajectory, an animated character, or a GLB file imported with its animation"; revision history preserves sessions; agent chat is billed per message by LLM choice (Auto free, roughly 0.4 to 17 credits per message across 30 plus models). The per message LLM billing describes the web chat product; how MCP scene_builder_3d calls are billed is not stated anywhere and remains unverified.
* https://higgsfield.ai/3d-jutsu Product page for the workspace itself.
* https://higgsfield.ai/plugins/blender The Blender add on: "the same scene layer runs in the Higgsfield Blender plugin," same account and credits, blockouts assembled in an open .blend file. Consistent with the MCP suite's Blender 5.2 worker and get_blend export.
* https://higgsfield.ai/apps/3d-render and https://higgsfield.ai/apps/3d-figure Consumer app wrappers over image to 3D.
* https://higgsfield.ai/creator-hub/changelog Vendor changelog; check it before first live 3D use, catalogs drift.

Community (third party, retrieved September 20, 2026; untrusted reference):

* https://scriptable.com/posts/higgsfield/3d-models/ Community writeup of the MCP 3D flow. Claims the engine mapping (Meshy for image to 3D and rigging, Meta's SAM 3 for single object, Tripo for text to 3D), GLB as the universal output, and the humanoid only quality of auto rigging. Matches the schema's model split; the engine attribution itself is unverifiable from the schemas.

## Standing cautions for first production use

1. Everything is untested. Run the disciplined loop from day one: preflight cost where the tool offers it, one mutation at a time, poll the same operation id, verify, then show_scene. The failure catalog's summary verdict applies unchanged: the disciplined loop never produced a blind batch loss; every drift from it did.
2. Prices are unknown. generate_3d has get_cost; the scene_builder suite has no cost preflight at all. Confirm every scene operation's cost by balance difference before building a workflow on it.
3. The run_python schema was truncated at retrieval mid sentence in its animation guidance ("choose interpolatio"). Refetch the full schema before writing animation code against it.
4. The suite's own verification split is strict: query_python and get_artifact are the agent's eyes, show_scene is the user's. Do not present a show_scene widget as evidence a check passed; that is failure 46 wearing a new tool name.
