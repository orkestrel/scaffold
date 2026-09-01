# Referral dossier (consolidated referral pass)

Every objective question the audit lanes recorded as a referral rather than a verdict, gathered from the slice reports. The pass runs each question with a real probe in a quiet repository and returns a ruling with run evidence, or a work-order row where the answer moves a published surface.


## s02 — inline referrals
- - **Referral to the objective lane (or to the Orchestrator if it holds both).** Finding 14 rests on my reading that `VersionResolution.complete` is derivable at all seven construction sites in `src/bin/CLI.ts`. I enumerated the sites and the derivation but ran nothing — I am read-only and this audit executed no code. Have the objective lane or a probe confirm the derivation before the field is deleted. Finding 12 carries a smaller version of the same caveat: I did not execute `#reportReplacements` against content holding a lone `\r`.


## s03 — inline referrals
- repair: Export `CONTRACT_CODES` as a frozen array in `constants.ts` beside `JSON_SCHEMA_TYPES`, and have `readValue` and `isContractError` both ask it through `collectMembers` / `matchesMember`. **Referral to the objective lane:** whether the omission changes the `code` a published refusal carries (`readValue(cb, r, { code: 'expansion' })` resolving to `'structure'`) is a behaviour question I did not run.
- repair: Assign `[]` and `new ContractCompiler.#weakMap()` directly in `#release` and delete the `#empty*` family, or state in the `#release` comment what an array literal reaches that a preconstructed peer does not. **Referral to the objective lane:** whether an array literal is caller-redirectable at all is the premise this design rests on, and I did not run it.


## s04 — `## Referrals` block
These are outside the subjective lane. Each names the evidence; none carries a verdict from me. Addressed to the Orchestrator, since I hold no objective lane in this dispatch.

- `src/core/helpers.ts:706-713` — `matchesBrowserURL` builds a `RegExp` from a caller-supplied route pattern with no bound, and uses a literal `[[DOUBLE_STAR]]` placeholder a pattern can contain itself. Both a catastrophic-backtracking question and an injection question for `page.network.route()`.
- `src/core/helpers.ts:2719-2803` — `compileVisibleWaitExpression` and `compileHiddenWaitExpression` wait on `MutationObserver` alone. A visibility change driven by a CSS animation, a transition, or a late stylesheet fires no mutation record, so the wait may report `false` while the element is visible.
- `src/core/helpers.ts:459-472` — `browserHARHeadersToRecord` calls `Object.defineProperty` with an attacker-controlled `header.name` on a plain object. The choice looks deliberate against prototype pollution; whether it holds for `__proto__` and `constructor` under `JSON.stringify` needs an executed check.
- `src/core/helpers.ts:2467-2475` — the actionability stability loop sets `index = 0` inside a `for` whose update runs after the body, so the retry count may be off by one relative to `BROWSER_STABLE_FRAME_COUNT`.


## s04b — `## Referrals` block
Outside my lane. Each is specifically evidenced and carries no verdict from me; route to the objective lane, or to the Orchestrator if no objective lane runs this round.

- `src/core/CDPClient.ts:282-294` — `#onError` clears `#connected` but leaves `#active` true and never closes the transport, unlike `#onClose` (lines 270-280) which clears both. Ask whether a later `connect()` then calls `transport.start()` on a transport that was never closed, and whether `close()` after a transport error takes the `#active` branch at line 247 correctly.
- `src/core/BrowserCoverage.ts:75` — `stop()` sets `#active = false` before issuing any teardown command, so a throwing `#stopJavaScript`/`#stopCSS` leaves Chromium with `Profiler`/`CSS` tracking enabled while `active` reports false and a second `stop()` throws "not active". Ask whether the flag must clear only after teardown settles.
- `src/core/BrowserCookieManager.ts:43-78` — `clear(filter)` reads every cookie, clears all of them, then restores the non-matching ones, and the restored input drops each cookie's originating `url`. Ask whether a cookie set between the read and the clear is lost, and whether domain and path survive the round trip for host-only cookies.


### s04b — inline referrals outside the block
- One ancillary addition, settled under the brief's deviation contract rather than stopping the unit: I added a **Referrals** block after Findings. My role contract requires an out-of-lane observation to leave as a specifically evidenced referral with no verdict attached, and the brief's output shape has no row for one. Nothing was moved out of Findings to make room — each referral is a correctness question, not a rule violation, so none of them would have been a numbered finding.


## s05 — `## Referrals` block
Two specifically evidenced questions outside my subjective lane. I return no verdict on either; both are correctness questions for the objective lane, or for the Orchestrator if that lane is dark.

- `src/core/Database.ts:200-208`. `#attach` builds a `Database` whose constructor has already called `this.#context.register(this.#schema())` on a freshly created `DatabaseContext`, then replaces `#context` and registers the same schema again on the shared one. Whether the discarded context's `register` has an observable effect — and whether the second `register` can now throw `CONFLICT` on a shared context that has begun opening, where the first could not — is a correctness question I did not settle. Finding 13 asks for the same repair on design grounds.
- `src/core/drivers/MemoryDriver.ts:55-65`. `open` computes `deployed` as `normalizeDriverSchema(this.#metadata?.schema ?? owned)` and assigns `this.#schema = deployed`, so a driver that has been `stamp`ed appears to ignore the `schema` argument that `open` was just handed and keep the stamped schema instead. Whether that is the intended versioned-open ordering with `DatabaseContext.#reconcile` (`DatabaseContext.ts:298-337`) or a defect, I did not settle.


## s08 — `## Referrals` block
Addressed to the Orchestrator (no objective lane named in my dispatch, and each sits outside the subjective lane). I hold no verdict on any of them.

- **R1 — `Agent.#status` under concurrent runs.** `Agent.ts:109` holds `#runs` as a `Set` of concurrent abort handles, and `stream()` at `:161`–`:169` permits a concurrent run whenever there is no `#window` and the caller supplied a per-run `budget`. But `#status` (`:102`) is one field: `:189` sets `'running'` and `#pump`'s `finally` (`:277`, `:293`) sets `'done'` / `'error'` per settling run. With two runs in flight, the first to settle reports the agent `'done'` while the second is still streaming. `AgentStatus` and `AgentInterface.status` are documented as the turn's lifecycle state (`types.ts:744`). Whether this is a defect or an accepted single-status contract needs the objective lane.
- **R2 — `Conversation.compact` cap validation is duplicated.** The `sections >= 1` check appears at `conversations/Conversation.ts:99`–`:101` (constructor) and again at `:192`–`:194` (`compact`), each throwing `ConversationError('SECTIONS', 'a sections cap must be >= 1')` with the same message. `AGENTS.md` § System constraints says centralize any pattern repeated twice. Whether the two guards can diverge in reachable ways — and therefore whether one is dead — is a correctness question I did not run.
- **R3 — `ConversationManagerInterface.remove` overload order.** `types.ts:1972`–`:1973` declares the array overload first while `MessageManagerInterface` (`:256`), `InstructionManagerInterface` (`:384`), and `ScopeManagerInterface` (`:560`) declare the single-id overload first. `.claude/rules/patterns.md` § Batch operations requires array-first only "When a single item type can itself be a list/open record", which a `string` id is not. The comment at `ConversationManager.ts:147`–`:149` calls it a project convention. Whether resolution order differs observably at any call site is a typecheck question, not a taste question.


## s11 — `## Referrals` block
- **To the objective lane** — `src/server/errors.ts:31` and `src/core/middlewares.ts:132`, middleware. `MultipartError extends Error` and brands itself with `Symbol.for('@orkestrel/middleware.MultipartError')`; `isHTTPError` accepts only an `instanceof HTTPError` or a value carrying the server package's own interned brand (`node_modules/@orkestrel/server/dist/src/server/index.d.ts:701-708`). `createBoundary` narrows with `isHTTPError` before rendering. On that reading a thrown `MultipartError` falls to the `500 internal server error` arm, and the 413/400/415 statuses `MULTIPART_REASON_STATUS` exists to produce never reach the client — while `errors.ts:20-21` documents the opposite ("Rendered by `createBoundary` like any other `HTTPError`-shaped throw"). I did not run it; the correctness ruling and the test that would pin it are yours. The documentation half is finding 5 in my lane.
- **To the objective lane** — `src/core/types.ts:358-362`, middleware. `SessionStoreInterface.set(id, session, now)` passes a separate id alongside the stored value, which `.claude/rules/architecture.md` § Stores forbids ("The stored value carries its own id; do not pass a separate id to `set`/`save`"). The payload type `S` is the consumer's and cannot be required to carry an id without constraining it, so whether the rule can be satisfied here without breaking the seam is a constraint question rather than a taste one. Flagged, not adjudicated.


## s11b — `## Referrals` block
Specifically evidenced questions outside the subjective lane, addressed to the Orchestrator. No verdict from me.

- `src/server/middlewares.ts:92-94, 141-146` — `createAssets` caches identity bytes, Brotli bytes, and ETag promises per key with no capacity bound and no eviction, and a rejected `computeBodyETag` promise stored at line 144 is retained and re-awaited on every later request for that key. Whether either is reachable enough to matter is a correctness and resource-exhaustion question.
- `src/server/MultipartParser.ts:151, 168` — whether `this.#staged.indexOf(path)` can return `-1` on any reachable path. If it can, `splice(-1, 1)` removes a different staged entry and leaks the intended temp file. Finding 13 repairs the shape regardless; the reachability is objective.
- `src/server/middlewares.ts:320-329` — the SPA fallback response carries no `ETag`, no `Content-Length`, and no `Cache-Control`, and reaches `open()` without the `dotfiles` screen the primary path applies at lines 225-228. Whether that asymmetry is intended is a correctness question the guide (`guides/middleware.md:427-428`) does not settle.


## s12 — `## Referrals` block
These are specifically evidenced questions outside the design-fit lane, addressed to the Orchestrator:

- `terminal/src/core/TerminalManager.ts:214-218` — `save(name)` reads `this.#config.get(name)?.timeout`, which holds only the per-call options. An endpoint added with no options under a manager-level `timeout` (constructor option, applied at line 113) persists a snapshot with no `timeout`, so `open` restores a broker with the default rather than the configured value. Whether that is intended is a correctness question.
- `terminal/src/core/Prompt.ts:103-111` — `answer` wraps `#answer` in a second `attempt`, though `#answer` already wraps every call that can throw. A fault in the broker itself therefore returns `{ reason: 'rejected', errors: [{ field: 'form', message: 'The form rejected the answer' }] }`, attributing a broker defect to the caller's form.
- `interpret/src/core/Interpret.ts:356` — see finding 35; whether any consumer currently shares one context across orchestrators decides how the ownership fix must land.


### s12 — inline referrals outside the block
- repair: Record whether the context was constructed here (`#ownsContext`), and destroy it in `destroy()` only when it was. Referral: whether any current consumer relies on the present behaviour is an objective-lane question.


## s17 — `## Referrals` block
- **To the Orchestrator — a rule-versus-guide conflict, not a verdict of mine.** `AGENTS.md` § Authority and loading requires that a conflict between a rule and a guide be surfaced rather than settled by an executor. Finding 37 is that conflict: `.claude/rules/patterns.md` § Batch operations fixes all-succeed semantics for a list overload, and `guides/workspace.md` deliberately specifies any-succeeded across four sites. `template` implements the rule and `workspace` implements its guide, so the fleet currently publishes both meanings under one signature shape. Someone must rule which wins before either package is edited.
- **To the objective lane — a fleet vocabulary question I decline to adjudicate.** `websocket/src/server/helpers.ts:225` names a `Buffer → string | undefined` coercion `parseUTF8` and files it in `helpers.ts`; `codec/src/core/helpers.ts:430` names the identical operation `decodeUTF8` and files it in `helpers.ts` too. `.claude/rules/architecture.md` § Centralized-file pattern sends a coercer to `parsers.ts`, and neither package has one. I did not raise this as a finding against either package, because the correct repair depends on whether `decode*` and `parse*` are one concept fleet-wide — a question above this slice. Deciding it against `codec` would rename its entire published surface and break the encode/decode symmetry its guide is built on.
- **To the objective lane — a possible defect I evidenced but did not adjudicate.** Finding 10's `?? ''` sentinels are reachable only if a `ResolvedRelation` can arrive at `Model.ts:169-171` with an absent `source` / `target` / `through`. `helpers.ts:115-132` validates all three for the `through` arm, so the path may be unreachable today; whether it is, and whether an injected or hand-built `ResolvedRelation` can bypass that validation, is a correctness reading rather than a design one. The design finding stands on the sentinel itself regardless of reachability.


## s18 — inline referrals
- - **Referral, outside this slice.** `ollama/src/server/OllamaProvider.ts:276` and `:283` construct `{ type: 'content', … }` and `{ type: 'thinking', … }`. `type` as a discriminant is banned by `AGENTS.md` § Design laws ("Named discriminants … never `kind` or `type`"), but `ProviderDelta` is declared in `@orkestrel/agent`, which is not in my slice. `ollama` cannot repair it; the axis name is `channel`, and the fix belongs to whichever slice audits `@orkestrel/agent`. Recorded here so it is not lost.


## h12 — questions verification left open
- Asset-cache growth in middleware static serving.
- `#staged` reachability in the multipart consumer.
- SPA fallback header asymmetry.
(Source: `h12-audit-verdict.md`, closing paragraph.)
