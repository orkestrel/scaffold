# Planner rulings: journey start, oracle strictness, and the opening-turn budget

Returned 2026-10-07 by the Opus planner lane (objective) on the journey baseline evidence (`matrix.md` row T0) and filed by the orchestrator.

## 1. S3, a journey's start: adopt it

- **Ruling.** `record` stores the URL of the view the first recorded step acts in, as an optional `start` field on `BrowserJourney` (`browser/src/core/types.ts:1775`). `replay` navigates the current tab to `start` before step s1, then resolves steps by role and name as it does today (`types.ts:3009-3013`).
- **Why the first step's page, not the URL at `record`.** It is the page whose elements s1 was resolved against. Between `record` and s1 only calls that record no step run, so the two URLs differ only when the page moved by itself.
- **Edits** leave `start` alone. Removing s1, as the harness's edit does, keeps the start page, so s2 `click link "Checkout"` still resolves from it.
- **Listing.** The header line gains `starts at URL`, shortened the way the `read` header shortens a URL (`helpers.ts:774`): `1: place-order "…" starts at http://127.0.0.1:60325/ (parameters: buyer)`.
- **Refusal.** If the start page does not settle `done` (`types.ts:3016-3018`), or its scheme is outside the toolset's `schemes` option, the run stops before s1: `Replay of place-order stopped before s1 of 3: its start page http://… did not load: REASON.`, in the wording of the existing stop message at `helpers.ts:3466`.
- **Absent start.** A journey recorded with no navigable page (`about:blank`) gets no `start`, and replay keeps today's behavior.
- **Cost.** One page load per replay, one string per journey, one listing fragment, one validator branch.
- **Secrets.** A query token in the URL is persisted to disk unless it is a registered secret; run `start` through `#toolset.redact` before storing it.
- **Alternatives ruled out.** A `navigate` first step the model records (the 2B never calls `navigate` in any recorded attempt); leaving it to the caller (the caller is the model, and port 49173 replayed from wherever the previous turn left the tab); role-and-name resolution only (works only when s1's target exists on every page, which is why the 4B passed and 49173 failed); the recorder inserting a real `navigate` step as s1 (the strongest runner-up, but a step is a call the model made, `types.ts:1735`; an inserted s1 shifts the step ids the edit turn and `matchesRemovedCart` refer to, and a 2B told "remove s1" would delete the start page).
- **Format.** Keep `format: 1` and make `start` optional; absence is today's behavior. `validateBrowserJourney` (`helpers.ts:3585-3664`) refuses an unknown format but not an unknown top-level key, so older package versions read new files and replay as they do today. A `format: 2` would make older MCP servers refuse every new file with `STORE_FORMAT` (`helpers.ts:3588`), force the new server to keep reading format 1 or turn every earlier journey into a fault line in the listing (`BrowserJourneyToolset.ts:355-358`), and leave read-only roots (`journeys.readonly`) unmigratable.
- **Check before adopting.** The pure editor and the run writer must carry `start` through; a rebuild from known fields alone drops it silently.

## 2. O1, oracle strictness: relax it as the analyst proposes, and report the count beside the pass rate

- **What the check protects.** Acting on an element the model never saw since the page last changed. A refused call cannot break that: `#element` refuses any reference missing from the live view (`BrowserToolset.ts:1324-1337`), and references are never reused across documents, so a stale reference from an earlier page always refuses and acts on nothing.
- **What the refusal path does not guarantee.** The toolset accepts any reference live in the current view's registry, including one the model never saw in a result: an invented `e20` that happens to exist, or an element beyond the read window. A successful unlisted action stays fatal. Under V2 a carried link reference is listed in the new result, so the rule still holds.
- **What is lost.** A pass means "never acted on an unseen reference", no longer "never named one"; the pass rate alone stops showing the 4B's `e3` stumble, so the refused-unlisted count is reported for each variant beside the pass rate; the stale calls still spend the per-turn budget, so a loop like the 17 refused `type(e4)` calls on port 49171 still fails the attempt as `partial`.

## 3. The opening-turn budget: a per-turn budget is allowed, and the oracle cap is derived from it

- **The JL arm raises every journey turn,** not only the opening one: the working-tree option sets the agent's limit once (`setupStore.ts:930`). The installed agent takes a limit for each run (`AgentRunOptions.limit`, `@orkestrel/agent` `index.d.ts:1130-1133`); pass it to `agent.stream` for each user turn.
- **Units.** That limit counts tool-iteration turns, while `StoreTask.limit` and the oracle count calls; parallel calls make these differ. Make them one unit.
- **The property the figure serves.** Each turn's budget equals that turn's shortest correct call sequence plus one correction for each call in it, so every turn ends inside its budget and a looping model stops. Opening turn: record, click Cart, click Checkout, type with submit, with one correction each, gives 8, today's figure. Each follow-up turn needs one call.
- **Why not 12.** It absorbs the 2B's `type!` detours, the defect the thesis assigns to the tool surface and V1 targets. A JL pass is evidence about the budget, never a fix.
- **Writing rule.** A rule or brief states the property; the figure lives in the task definition, with a comment stating the property.
- **The oracle cap** follows, computed as the sum of the per-turn budgets from the same source (AGENTS.md "Derive state"). `!transcript.partial` already fails any turn that exhausts its budget, so the derived cap only guards parallel calls.
- **Report follow-up turns separately.** `partial ||= result.partial` means a failed opening turn fails the attempt, but the follow-up turns' save loops and journey refusals are still worth counting.
- **V1 refusal wording.** The `type` refusal must not send the model to the element it misjudged: `Element link "Birch Cutting Board" [ref=e6] takes no text; type into a textbox or searchbox from the latest result.`
