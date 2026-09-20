# Higgsfield MCP: websites and apps

Domain reference for the Cinema skill. Sources: full MCP tool schemas fetched 2026-09-20 (canonical, quoted verbatim where load bearing), two live read only enumeration calls permitted by the assignment, the production references higgsfield-ops.md and failure-catalog.md, and the vendor changelog. Tool names carry the prefix mcp__8d6083eb-41bb-4bd3-bba6-8ccc56929062__ on this surface; short names are used below.

DOMAIN STATUS: UNTESTED BY THE FILM PRODUCTION. The From Desert to OASYS production never created, deployed, published, or renamed a website, never touched website_db, website_repo_access, website_secrets, or website_status, and never invoked a Marketplace app. list_websites confirms the account owns zero websites as of 2026-09-20. The single exception is sandbox_exec, which the production used heavily for media work (never for website checkouts); its entry below carries real production evidence. Everything else in this file is schema truth plus vendor claims, not observed behavior.

Safety classes used below: safe read (no state change, no spend), mutating (changes platform state), spending (can consume credits). No tool in this domain is classed widget display.

## The website stack in one paragraph

create_website scaffolds "a React 19 + TanStack Start app, server-rendered, in ONE Cloudflare Worker, with D1 / R2 / KV / Durable Objects / Containers available (all DISABLED by default)". The mandated loop is: (0) get_workflow_instructions with { workflow: "website-builder-flow" } FIRST, (1) create_website, (2) website_repo_access checkout, edit and commit via sandbox_exec, website_repo_access push, (3) deploy_website, again after every change. publish_website is a feed listing, not a deploy. Vendor context: the changelog (https://higgsfield.ai/changelog, retrieved 2026-09-20, vendor) dates the App Builder to June 26, 2026 ("turns a prompt into a deployed website"), Higgsfield Apps plus a My Apps section and a $100,000 App Contest to July 7, 2026, and browser games publishable to a games marketplace to June 10, 2026. help.higgsfield.ai did not resolve (DNS ENOTFOUND) on 2026-09-20; no community sources were consulted for this domain.

## create_website

Purpose: start a new full stack website plus its git repo; returns a website_id that every later website tool requires. Safety class: mutating. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| type | string | yes | none | website, app, game |
| category | string | yes | none | slug from list_website_categories |
| subdomain | string | no | random subdomain | DNS safe: lowercase letters, digits, single hyphens |
| template | string | app: yes; website: optional; game: none | none | app-detail, preset, studio, custom, scroll-scrub |

Gotchas encoded in the description, quoted:

* Type is a user decision: "The 'type' param is REQUIRED and is the USER'S choice, not yours: unless the user has already made it unambiguous, ASK the user whether they want a plain website (no Higgsfield integration) or a Higgsfield-integrated app (Sign in with Higgsfield + AI image/video generation via the Higgsfield SDK) BEFORE calling this tool."
* Workflow instructions are a hard prerequisite: "call get_workflow_instructions with { workflow: \"website-builder-flow\" } FIRST to load the stack, design contract, and hard rules (REQUIRED before building or editing)".
* Templates ship as live code: "The chosen layout ships as real code already wired as the home page; you ADAPT IT IN PLACE, never rebuild it."
* Template kinds do not cross: "App and website templates are not interchangeable — a cross-kind name is rejected." App templates are studio (full creative workspace), preset (pick a style then generate), app-detail (single tool landing page); any other requested shape "still maps to the closest of these three". The website template scroll-scrub is for "an animated website (the visitor's scroll plays a generated film); its scrub engine ships pre-built"; omit template for a non animated site.
* "'custom' (bare shell, no shipped layout) is ONLY for when the user explicitly says \"use custom template\" — never pick it yourself."
* type game: "a browser game with realtime multiplayer rooms — requires a game genre as category and takes NO template."
* category: "The server rejects an unknown slug." Call list_website_categories first, pass 'other' when nothing fits.
* subdomain becomes the slug in the live URL <subdomain>.<host>; "A few reserved labels (e.g. 'api', 'www') and already-taken subdomains are rejected; if that happens, try a close variant."
* For apps, "read app/src/layouts/AGENTS.md + app/src/components/AGENTS.md right after cloning".

Media roles: none directly; a scroll-scrub website consumes a generated film produced by the generation tools, which cost credits under the normal spend discipline.

## deploy_website

Purpose: build and deploy via CI, returning the live URL. The only tool that ships changes. Safety class: mutating. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |

Quoted gotchas: "Every deploy ships the live site at the website's public URL (there is no separate preview stage)." "commit and git push ALL your changes BEFORE calling this — the build runs from the pushed repo." "publish_website does NOT deploy (it only lists the already-live build on the community feed), so this tool is the only way changes ship." "A failed build returns the log; a still-running build returns status 'pending' — call website_status to check."

## publish_website

Purpose: list the current live production deploy on the Higgsfield community feed. Safety class: mutating (public visibility change); the optional cover video it tells you to offer is spending if generated. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |

Quoted gotchas:

* "This does NOT deploy — deploy_website (which every build flow already runs) must have shipped the latest changes first; publishing with undeployed changes lists the OLD live build, and re-publishing does not re-deploy."
* Metadata is load bearing: app/src/app-meta.json "MUST be filled with real values — og_title, og_description, favicon_url, og_image_url — the feed card renders from them (read fresh from the pushed repo at publish time) and a website with an empty og_title is INVISIBLE on the feed; the live page's own head tags are baked at build time, so deploy AFTER changing them."
* Cover video consent: "Also OFFER the user a cover video for the card (og_video_url) — ask their permission first (video generation costs credits), never generate it unprompted." This matches the production's standing spend loop (higgsfield-ops.md: explicit yes before any spend).
* Auto publish is opt in at build start: publish "when they opted in to publishing at the start of the build — in that case publish automatically once the site is deployed with its metadata filled, without waiting to be asked again."
* "EXCEPTION: a website whose production was never deployed (or was taken down by unpublish) falls back to deploying first — that returns status 'pending' while CI runs and the website is listed automatically once the deploy succeeds (check with website_status)."

Media roles: og_image_url, favicon_url, og_video_url in app-meta.json feed the card render; they are repo file references, not MCP media ids.

## rename_website

Purpose: change the subdomain (the slug in the public URL) and redeploy under it. Safety class: mutating, and it breaks existing URLs. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |
| new_slug | string | yes | none | 1 to 64 chars, lowercase letters, digits, hyphens, globally unique, not reserved |

Quoted gotchas: "The site is re-deployed under the new subdomain and the OLD subdomain STOPS WORKING — anyone holding the old URL must be given the new one. Storage (database, files, config) and the code repo are KEPT; only the public address changes." "Runs a full re-deploy and can take a couple of minutes; returns once the site is live at the new URL. Fails if the new subdomain is already taken or reserved, or if a deploy is already in flight — pick another subdomain and retry."

## list_websites (CALLED, read only)

Purpose: list owned websites with id, name, slug, and live URL; the way to recover a website_id from an earlier session. No parameters. Safety class: safe read.

Live result 2026-09-20: {"websites":[]}. The account owns zero websites, which is the concrete proof this whole domain is untested by the production.

## list_website_categories (CALLED, read only)

Purpose: enumerate the marketplace taxonomy that create_website's required category must come from. No parameters. Safety class: safe read.

Live result 2026-09-20, eight categories in display order: viral-trends (Viral Trends), ads-marketing (Ads & Marketing), ugc-social (UGC & Social), cinematic (Cinematic, described as "Cinema Studio, Originals, storyboard."), characters-avatars (Characters & Avatars), product-ecommerce (Product & E-commerce), portrait-lifestyle (Portrait & Lifestyle), other (Other, "Everything that doesn't fit the curated tabs."). For Cinema skill sites the natural slug is cinematic.

## website_db

Purpose: inspect the website's D1 / SQLite database, read only; "The website has ONE database — the live site's real data." Safety class: safe read ("Writes and DDL are rejected."). Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |
| operation | string | yes | none | tables, schema, rows, query |
| table | string | for schema and rows | none | table name |
| sql | string | for query | none | "A single read-only SELECT/WITH statement" |
| filters | array of string | no | none | each "'col:op[:value]' (eq ne gt gte lt lte like is_null)" |
| order_by | string | no | none | column |
| order_dir | string | no | none | asc, desc |
| limit | integer | no | 50 | min 1 |
| offset | integer | no | none | min 0 |

## website_repo_access

Purpose: bridge between the website's git repo and the sandbox. Two operations: checkout prepares "a credential-free checkout in sandbox_exec", push ships committed changes back before deploy_website. Safety class: checkout is effectively a safe read of the repo into the sandbox (plus a lease); push is mutating. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |
| operation | string | no | checkout | checkout, push |

Quoted gotchas: "Each call reserves the user's sandbox for 15 minutes." "Checkout reuses existing files; it never resets work." "Push rejects uncommitted files and non-fast-forward updates." "No Git credentials are returned or installed in the editing sandbox." Use the returned checkout_path for edits and commits via sandbox_exec. The 15 minute lease matches the sandbox lease the production observed on background jobs (higgsfield-ops.md).

## website_secrets

Purpose: list configured secret names for a website. Safety class: safe read. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |

Quoted, all three sentences load bearing: "List configured secret names only. Values are never returned. Configure or remove secret values through Higgsfield's website settings; do not ask the user to paste credentials into chat. Secret changes take effect on the next deploy_website." So a secret change needs a redeploy to land.

## website_status

Purpose: "Get the website's deploy status — the live URL and the status of the last deploy. Use to check a deploy that returned 'pending', or to fetch the live URL." Safety class: safe read. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id from create_website |

This is the polling half of deploy_website and of publish_website's never deployed fallback.

## sandbox_exec

Purpose: run a shell command in "a remote Higgsfield cloud Linux sandbox — NOT your local machine or the client's own shell", for media workflows and website_repo_access checkouts needing the hosted toolchain. Safety class: mutating (arbitrary code execution in the vendor sandbox with internet access); zero credits by itself. THE ONE PRODUCTION TESTED TOOL IN THIS FILE, used for media assembly only, never for website work.

| name | type | required | default | options |
|---|---|---|---|---|
| command | string | yes | none | bash, 1 to 16000 chars |
| timeout_seconds | integer | no | 60 | 1 to 120; "Ignored with background:true" |
| background | boolean | no | false | detached run returning pid, log_path, status_path |
| restart | boolean | no | false | "Discard the current sandbox (all files and processes) and start a fresh one" |

Schema encoded gotchas, quoted:

* Ephemerality: "The sandbox is isolated per user and is discarded ~10 seconds after a call finishes, so files in /home/user only survive between back-to-back calls — chain multi-step work into a single command (&&) and export results before finishing, or expect to re-download inputs."
* Upload ordering: "For an output created here, call media_upload BEFORE starting the producing command, then append `curl -f -X PUT --upload-file <file> '<upload_url>'` to that SAME command so the ephemeral file is uploaded before it exits; call media_confirm only after HTTP 200. Never pass a sandbox path to media_upload_and_confirm: that tool accepts only client attachments." Note the production found the presigned PUT needs the exact signed Content Type header with binary data (failure catalog 45; higgsfield-ops.md media upload section), so prefer the ops file's curl form with the Content-Type header.
* Long work: "for longer work (large renders, installs) set background:true and poll the returned log/status files with later sandbox_exec calls. Background work receives a 15-minute sandbox lease, and shorter poll calls never reduce its remaining lifetime."
* Workflow scripts preinstalled: "Workflow bundle scripts are already installed in every sandbox under $HF_WORKFLOWS (/home/user/.higgsfield/workflows), laid out as $HF_WORKFLOWS/<workflow>/scripts/..." (the loaded description truncated at this point).
* Preinstalled toolchain: ffmpeg/ffprobe, ImageMagick, sox, python3 with Pillow and faster-whisper, node/npm/npx, sharp-cli, Playwright with headless Chromium, caption fonts (Metropolis, Montserrat), zip/unzip, git, curl, jq. Commands run in /home/user.

Production evidence (observed live, higgsfield-ops.md and failure-catalog.md):

* The 16000 character command cap is real and bit: "sandbox_exec rejects commands over 16000 characters (connector schema limit); split long pipelines under the cap."
* Background jobs write "a .bg log and an exit file; poll with tail plus the exit file check; the sandbox lease is about 15 minutes."
* higgsedit, the sandbox editor, "resolves importMedia paths against the project directory, not the cwd, so use absolute paths"; media layers in a layout free frame need explicit x and y; one clip per instant per track; a still PNG cannot sit on a video track (extend with ffmpeg tpad stop_mode=clone); text y positions the TOP edge (failure catalog 44).
* Standing directive: pixel level post in the sandbox or locally does not substitute for the approved generation surface without approval (failure catalog 38, 67).

## apps_search (CALLED, read only)

Purpose: "Search Higgsfield Marketplace apps callable through MCP. Returns each app's id, name, and the actions it exposes." Quoted flow: "apps_search to find an app → apps_describe(app_id, action) to get an action's argument schema + manifest_revision → apps_invoke to run it. Read-only; does not call any app." Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| query | string | no | list all | "Case-insensitive substring over app name/description" |
| limit | integer | no | 20 | 1 to 100 |
| cursor | string | no | none | "Opaque pagination cursor from a previous next_cursor" |

Live results 2026-09-20: query "video" returned exactly one app, Match Cut + Tracelab (app_id 3a69aa1d-8456-4705-92b5-b0616b03e642, manifest_revision v3, 27 actions: one list_render_modes, one get_render poll action, and 25 create_* actions such as create_render, create_tracelab, create_facecut, create_vhs, create_thermal). Query "image" returned zero items. The MCP visible marketplace is thin as of this date; the vendor changelog's July 7, 2026 Higgsfield Apps launch describes a larger web side surface than MCP currently exposes.

## apps_describe (CALLED, read only)

Purpose: "Get an app's action contract: with `action`, the full input/output schema + execution mode for that one action; without it, a summary of every action. Also returns `manifest_revision`, which apps_invoke requires. Read-only." Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| app_id | string | yes | none | "App UUID from apps_search" |
| action | string | no | summary of all actions | action name |

Live result 2026-09-20, apps_describe(3a69aa1d-8456-4705-92b5-b0616b03e642, "create_render"): a three second animated word reel action, output video/mp4, execution_mode "async", input requires tool (enum locked to "word-reel") and text (1 to 24 chars), optional settings.paper (White, Sunlight, Newspaper, Craft, Black, Dark Book, Magazine; default White) and settings.aspect_ratio (9:16 default, 16:9, 4:5, 1:1). Annotations carry the polling contract: {"poll_arg":"render_id","poll_action":"get_render"}. Expect other apps' actions to follow this pattern: a create action returning an id plus a paired get status action named in annotations.

## apps_invoke (SCHEMA ONLY, never called)

Purpose: "Run one described action on a Marketplace app AS the current user." Safety class: mutating and potentially spending; app actions run under the user's account and credits. UNTESTED: neither the production nor this documentation pass ever invoked an app.

| name | type | required | default | options |
|---|---|---|---|---|
| app_id | string | yes | none | UUID from apps_search |
| action | string | yes | none | "Action name from apps_describe" |
| manifest_revision | string | yes | none | "From apps_describe. If it changed since, the call is rejected with manifest_changed — re-describe." |
| arguments | object | no | none | "Action arguments matching its input_schema. Do not put binary/media bytes here — pass a media_id." |

Quoted gotchas: "First call apps_describe(app_id, action) to get the exact `arguments` schema and the `manifest_revision`, then pass them here." "Long-running actions return { id, status: \"queued\" }. If a widget is visible, it polls the status action automatically — do not re-invoke get_* as a follow-up poll. In text-only clients, poll by invoking the app's status action (e.g. get_render) until status is completed/failed." "The action's own annotations (from apps_describe) indicate cost/side-effects; confirm with the user before an expensive or destructive action." That last sentence puts app invocations inside the same explicit approval spend loop the production enforced for generate_* calls (higgsfield-ops.md payload and approval discipline). Media roles: media inputs travel as media_id values from the shared media id namespace, never as inline bytes.

## get_workflow_instructions (SCHEMA ONLY here; the website flow requires it)

Purpose: discover and load a bundled workflow, "each a SKILL.md that orchestrates the generate_*" tools. Safety class: safe read. Untested by the production (the film predates or bypassed the workflow bundles; nothing in the ops or failure records references one).

| name | type | required | default | options |
|---|---|---|---|---|
| workflow | string | no | list all | folder name, e.g. website-builder-flow; "Omit to list all available workflows." |

The description is a long routing table (truncated at load) mapping request shapes to workflow names: 'ad-multiplier', 'brand-asset-creation', 'website-builder-flow', plus faceless video, UGC, product photography, and character sheet families. Load bearing for this domain, quoted: "building / editing a website, web app, landing page, or browser game with the website tools ('website-builder-flow'): before building ANY of these, use this tool to discover and load the bundled workflow". create_website's own description makes the same call step 0 and marks it REQUIRED, so treat website work without loading website-builder-flow as out of contract. Note the routing also captures work with no generation at all: brand asset tasks "including recoloring or exporting an existing official SVG/PNG logo even when no new design or image generation is requested" must load 'brand-asset-creation' before sandbox_exec.

## get_workflow_bundle_file (SCHEMA ONLY, never called)

Purpose: "Read a safe text file or directory from a workflow's resource folder. Use this after get_workflow_instructions when the SKILL.md requires a template, reference, or script file." Safety class: safe read. Untested by the production.

| name | type | required | default | options |
|---|---|---|---|---|
| workflow | string | yes | none | workflow folder name |
| path | string | yes | none | "Whitelisted path INSIDE that workflow folder, e.g. 'references/app-flow.md' for website-builder-flow. Use paths listed by get_workflow_instructions." |
| include_contents | boolean | no | false | for directories, include content of every allowed file |

Cross reference: the same bundles' scripts are preinstalled in every sandbox under $HF_WORKFLOWS, so scripts run in sandbox_exec directly while this tool serves the text side (templates and references) into the conversation.

## What Cinema should take from this domain

The scroll-scrub website template is the one direct bridge to the film work: a site where "the visitor's scroll plays a generated film", which could carry a From Desert to OASYS scroll experience. Everything needed is scaffolded, but the whole path (create, checkout, edit, push, deploy, publish) is unexercised on this account, so budget a shakedown pass before promising it. Publishing to the community feed conflicts with the standing privacy ruling that "masters stay local in the repo unless explicitly approved" (failure catalog 25); any feed listing of production footage needs John's explicit approval first. App invocations spend as the user; the estimate first, approve, submit once discipline from higgsfield-ops.md applies unchanged.
