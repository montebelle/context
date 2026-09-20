# Higgsfield platform: accounts, plans, credits, workspaces

Platform level surface of the Higgsfield MCP connector: account and workspace model, plan tiers and their gates, credits and observed costs, unlim allowances, and the billing adjacent tools. Every tool name below carries the prefix `mcp__8d6083eb-41bb-4bd3-bba6-8ccc56929062__`. Schemas were fetched from the live connector on September 20, 2026 and are canonical; load bearing sentences are quoted verbatim. Production evidence comes from `../higgsfield-ops.md` and `../failure-catalog.md`. Read only calls were made to `list_workspaces`, `balance`, and `transactions` on September 20, 2026 to capture live response shapes. Nothing here was generated, published, selected, or purchased.

## Live account state (observed September 20, 2026)

One private workspace, owner role, plan `plus`, 255.4 credits. Credits are fractional: the balance carries one decimal because still jobs bill in halves (Seedream 5 Pro 1k is 1.5 credits per the ops record).

## Plans and gates

Plan tiers seen on the platform, vendor and community sources combined (web citations at the bottom):

* Free: the production started here. Observed gates: one concurrent job ("max 1 concurrent job(s)" refusal on parallel submission, failure catalog item 5) and model family gating below.
* Starter: community sources list $19 per month for 270 credits (an earlier vendor blog framing said $9 for 120 credits, so treat Starter numbers as drifting).
* Plus: $47 per month annual, $59 month to month, 1,200 credits (community table). The live account is on `plus`.
* Ultra: $99 per month annual, $129 month to month, 3,000 credits, "parallel generation of up to 8 videos and 8 images simultaneously" (vendor blog), with expanded 6,000 and 9,000 credit variants per community sources.
* Team and Enterprise exist per community sources; no production contact with either.

The production observed Seedance plan gate: a four clip batch was refused with "Requires basic plan or higher" despite sufficient credits (failure catalog item 4). The standing lesson from the ops record: "the Seedance family is subscription gated (basic or higher) regardless of credit balance; the free plan allows one concurrent job; after upgrade the mode list can collapse to what the account supports." Plan gating beats credits, and the typed refusal costs nothing. Note the gate names a "basic" tier that no current pricing page lists by that name; treat the gate string as the backend's tier vocabulary, not the marketing tier names.

Two more plan facts from schemas: `show_plans_and_credits` sells only "Plus + Ultra, monthly + annual subscription cards", so the MCP upgrade path skips Starter entirely, and a "3-day $0 Plus trial with MCP-only credits" exists for eligible accounts (see `cancel_trial_auto_renewal` below).

## Credits and observed costs

Exact prices observed live during production (credits), consolidated from the ops record and confirmed against the live transaction ledger:

* seedance_2_5 omni_reference 480p silent: 3 per second. 4s = 12, 5s = 15, 6s = 18, 10s = 30, 24s = 72. The live ledger shows a long run of `Seedance 2.5` spends at exactly 15, matching the 5 second 480p cadence of the fragmentation rebuild.
* seedance_2_5 omni_reference 720p: 6s = 42, 5s = 35. Published 10s tiers 30/65/90 at 480/720/1080.
* seedance_2_5 video_edit: billed by the SOURCE video duration, ignoring duration and aspect parameters. 6.04s source = 18.12, 10.5s = 31.5; one 6s source later priced 22 at 480p and 46 at 720p on a shifted catalog.
* Stills: Seedream 5 Pro 1k = 1.5 (generation or inpaint edit), Seedream 4.5 basic = 1, GPT Image 2k high = 3, 2k medium = 1.5, 1k medium = 1, nano banana 2k edit = 2. The live ledger confirms `Nano Banana Pro` spends at exactly 2.
* Cost is independent of reference count.
* Catalogs drift: the video_edit reprice above is proof. From the ops record: "Live costs are read fresh each time; historical estimates are never reused. Confirm every charge afterward by balance difference." Estimates are free and exact ("No job submitted"), but "a passed estimate is a price, not an approval of the payload."
* Failed submissions and typed refusals are never silently billed (observed across the entire failure catalog: every 0 credit refusal entry).

Community credit policy claims (unverified in production): "Monthly subscription credits reset at renewal and do not roll over," top up packs expire within 90 days, refunds "within 7 days of the initial purchase, provided no credits have been used."

## Unlim allowances

The connector has a free generation and unlimited generation layer distinct from credits. Canonical sentences from the `models_explore` schema: "Items carry supports_unlim when the model accepts free-trial unlimited generations; the top-level unlim block says whether the caller can spend them right now, and the trailing 'Unlim configs' text lists the configurations their allowance actually covers." Its `unlim` parameter: "When true, return only models that accept free-trial unlimited generations (supports_unlim). Use it to answer \"which models can I use my unlimited generations on\" in one call — each returned item still carries its aspect_ratios, parameters, and durations."

So the authoritative live answer to which models carry supports_unlim is one free read: `models_explore` with `action: "list"` and `unlim: true`. UNTESTED: that enumeration was not run for this document (calling it was outside this assignment's named read only calls), and production never spent an unlim generation, so no model list is asserted here. The related production observed mechanics from the ops record: "Free generations: counters are shared per job set line, use_free_gens must be passed explicitly, and out of scope or unavailable requests return a typed refusal, never a silent charge."

Marketing side, the `show_plans_and_credits` schema says plan cards include "feature lists, 7-Day Unlimited highlights, and 365-Day Unlimited blocks pulled from the live pricing config." Community sources describe the 7 day window as covering Kling 3.0 and the Nano Banana family on Plus and Ultra, and the "365-Day Unlimited" headline as mostly an image perk; treat those specifics as community claims, not verified.

## Workspaces

### list_workspaces (safe read, CALLED live)

Purpose: enumerate every workspace the account can target. Schema description: "List every workspace the user can access (their private workspace plus any shared/team workspaces). The `is_selected` field marks which workspace MCP operations currently target."

Parameters: none.

Live response shape (September 20, 2026):

```json
{"workspaces":[{"id":"62e896f8-d4f2-48fc-991b-fb42b09dd62e","name":null,"type":"private","user_role":"owner","is_selected":false,"plan_type":"plus","credits":255.4}]}
```

Fields per workspace: `id` (UUID), `name` (null for the private one), `type`, `user_role`, `is_selected`, `plan_type`, `credits`. Gotcha: with a single private workspace and no explicit selection, `is_selected` is false; operations still bill against the private default, so false here means no explicit selection, not no target. Safety class: safe read.

### select_workspace (mutating, schema only, NEVER called)

Purpose: switch the billing and read target for the whole connector. Schema description, load bearing: "Set or clear the active workspace — the one all subsequent MCP operations bill against and read from (generations, balance, transactions, uploads, custom references)." And: "The selection persists across sessions and clients until changed or cleared, so it stays in effect for later turns without re-selecting."

| name | type | required | default | options |
|---|---|---|---|---|
| workspace_id | string | unless clear is true | none | workspace UUID from list_workspaces |
| clear | boolean | no | false | true returns to the default private workspace |

Safety class: mutating (rebinds all future spend). UNTESTED: production ran entirely in the private workspace and never called this. Because the selection persists across sessions, a stray call would silently redirect every later charge; the Cinema skill must never call it without an explicit directive naming the workspace.

## Balance and transactions

### balance (safe read, CALLED live)

Purpose: "Get the user's available credits and current subscription plan. For transaction history, call `transactions` instead." Parameters: none.

Live response shape (September 20, 2026):

```json
{"credits":255.4,"subscription_plan_type":"plus"}
```

Two fields, nothing else. Production evidence: this is the anchor of the spend loop ("report exact credits plus current and projected balance ... confirm the charge by balance difference," ops record). It matches `list_workspaces` credits exactly, so either works for a preflight balance. Safety class: safe read, free, call as often as needed.

### transactions (safe read, CALLED live)

Purpose: "List the user's credit transactions (spend/refund/grant/deduct), newest first. Paginated: if next_cursor is not null, pass it as cursor to get the next page."

| name | type | required | default | options |
|---|---|---|---|---|
| cursor | integer | no | none | next_cursor from the previous response, 0 to 9007199254740991 |
| size | integer | no | 10 | 1 to 100 |

Live response shape (September 20, 2026, size 20, first page, abridged):

```json
{"items":[
  {"display_name":"Seedance 2.5","credits":-15,"action":"spend","created_at":"2026-09-20T08:49:49.661727Z"},
  {"display_name":"Nano Banana Pro","credits":-2,"action":"spend","created_at":"2026-09-20T06:29:43.476926Z"}
],"next_cursor":20}
```

Fields per item: `display_name`, `credits` (negative for spend), `action`, `created_at` (UTC microsecond timestamp). The cursor is a plain integer offset (20 after a 20 item page). Gotchas from the live read: `display_name` is the brochure model family ("Seedance 2.5", "Nano Banana Pro"), not the job model id, and the item carries no job id at all, so the ledger cannot be joined to jobs by id; correlate by timestamp and amount. That makes `transactions` an audit trail, not a provenance record; provenance stays with `show_generation_by_ids` and saved payloads per the ops record. The first live page is uniform Seedance 15s and Nano Banana 2s, directly confirming the observed price table above. Safety class: safe read.

### show_plans_and_credits (widget display, DO NOT CALL)

Purpose: sales surface. "Open the single combined pricing widget for everything billing-related. The widget has two tabs the user can switch between: **Upgrade Plan** (Plus + Ultra, monthly + annual subscription cards) and **Top-up Credits** (one-time credit packs of 500 / 1,000 / 2,000 / 4,000 credits)."

| name | type | required | default | options |
|---|---|---|---|---|
| intent | string | no | general | upgrade, topup, auto_refill, trial, general |

Why the Cinema skill never calls it: the description is an instruction package aimed at making the assistant sell. "Each plan card and credit pack has a CTA that links directly to the relevant Stripe or Higgsfield checkout/setup URL — no separate tool is needed to mint checkouts." It demands verbatim relay of "short, user-facing sales copy with checkout URLs" and, when a trial is offered, leads with it. Calling it opens a purchase widget in the user's client mid production. It spends nothing by itself, but it is the connector's route to spending real money, so the skill treats it as off limits: plan and credit state comes from `balance` and `list_workspaces` instead, and a plan gate refusal is reported to John as text, never answered by opening this widget. Safety class: widget display with purchase CTAs. UNTESTED: never called in production (the production upgrade that cleared the basic plan gate happened outside the MCP surface).

Useful facts the schema leaks even uncalled: top up packs come in 500 / 1,000 / 2,000 / 4,000 credit sizes; auto refill exists ("first push auto-refill when `auto_refill_purchase_link` is present"); and the free trial block, when present, means "the user is eligible for a 3-day $0 Plus trial with MCP-only credits" with a card required and an automatic charge after the trial unless cancelled.

## Trial and contest tools

### cancel_trial_auto_renewal (mutating, schema only, NEVER called)

Purpose: stop the automatic charge at the end of the MCP free trial. Load bearing semantics, verbatim: "cancelling stops the automatic charge at the end of the trial ONLY — the user KEEPS trial access and remaining trial credits until the trial ends; nothing is charged." Two step protocol, verbatim: "First call WITHOUT `confirm` (or confirm=false): in UI clients this opens a confirmation card ... in text-only clients relay `assistant_response` verbatim and wait for the user's explicit confirmation. Only call again with `confirm=true` after the user explicitly confirmed the cancellation in chat. Never pass confirm=true on the first call."

| name | type | required | default | options |
|---|---|---|---|---|
| confirm | boolean | no | false | false shows the confirmation, true actually cancels |

Safety class: mutating (billing state). The first call with confirm false is itself a widget display. UNTESTED: the production account is a paid plus subscription, not a trial; this tool has never been touched. Only relevant if John ever runs a trial account, and then only on his explicit request, with the two step confirm honored exactly.

### participate_in_contest (mutating and publishing, schema only, NEVER called)

Purpose: enter a website built with the connector's website tools into the current Higgsfield app contest. Load bearing gotchas, verbatim: "A website not yet PUBLISHED to the community feed is published automatically by the entry — no need to call publish_website first." So this tool PUBLISHES as a side effect. Also: "The website DOES need a live production deploy (deploy_website), else the entry is rejected." And the metadata trap: "the auto-publish lists the website on the feed and an empty og_title makes it INVISIBLE there." Idempotency: "Calling again for the same website OVERWRITES its urls (use it to fix or add links), it does not create a second entry." There is a single active contest, so no contest id parameter exists.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes | none | id returned by create_website |
| urls | array of string | yes | none | 1 to 10 social media links; only YouTube, X/Twitter, Instagram, or TikTok hosts accepted, "any other host is rejected" |

Safety class: mutating and publishing (puts content on a public community feed). UNTESTED and out of scope: the Cinema production never used the website tools, and the standing privacy ruling (failure catalog item 25: corporate masters stay local unless explicitly approved) makes any auto publishing tool a hard no without John's explicit instruction.

## Web sources (retrieved September 20, 2026)

Vendor:

* https://higgsfield.ai/pricing returned only SPA metadata to a plain fetch, no plan data; the pricing page is not scrapable server side. Vendor plan facts here come from the blog and from tool schemas instead.
* https://higgsfield.ai/blog/best-all-in-one-subscription-ai-images-video (vendor blog): Starter $9 per month with 120 credits, Ultra $129 per month with 3,000 credits, Ultra "parallel generation of up to 8 videos and 8 images simultaneously," and "Seedance Unlimited is available as a separate 30-day paid add-on that gives unlimited generations on Enhanced Seedance 2.0 Fast with no credits deducted per generation." Vendor marketing; numbers disagree with newer community tables, which is itself evidence that pricing drifts.
* The `show_plans_and_credits` and `models_explore` schema texts quoted above are vendor canonical and fresher than any page.

Community (unverified, marked as claims throughout):

* https://techsifted.com/roundups/higgsfield-ai-pricing-2026/ : the plan table used above (Starter $19/270, Plus $47 annual $59 monthly/1,200, Ultra $99 annual $129 monthly/3,000, Ultra 6,000 and 9,000 credit variants, Team $65 per seat annual, credit reset and 90 day top up expiry and 7 day refund claims).
* https://www.krea.ai/blog/higgsfield-pricing-explained-2026-unlimited-credits-and-real-monthly-costs (via search snippet): Plus 1,200 credits framed as about 600 Nano Banana Pro images or 50 to 55 Seedance clips; 7 day unlimited window claims for Kling 3.0 and Nano Banana family; "365-Day Unlimited" described as mostly an image perk.

Where community numbers and live observations conflict, live observations win, and the live reads in this file win over both.
