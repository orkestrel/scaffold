# J-TOAST audit round 1 — the subjective lane's verdict (`reviewer` on Opus 5.5, native subagent, read-only; 45 tool uses, 369 s; retained verbatim from the subagent's return)

**Lane:** subjective, held by the `reviewer` alias on Opus 5.5. That engine also wrote this unit.

**Dispatch note:** the brief routes `reviewer` only "where the API shape departs from the landed pattern". The shape departs in one place, the selector vocabulary (F1), so this lane ran in full.

## Numbered verdicts

**1. UNRESOLVED.** Only the clause "each with its instrument rows" is open. It waits on the Orchestrator's replay (`j-toast-mutations-orchestrator.log.txt` is absent). The rest of the claim held.
- **What held:**
  - `Toast.ts` is one class plus imports.
  - The constructor follows the `Collapse` order: host guard with `readTag`, then the three groups through `resolveVocabulary`, then `resolveOptions` over `TOAST_DEFAULTS`, then the claim, the hooks, the four listeners, and the `signal`.
  - The toast validates the `selectors` group and discards it with the same comment as `Button.ts`.
  - Naming the local `lifetime` avoids a clash with the controller's `signal`, which is a deliberate improvement on the `Collapse` form.
  - `destroy` aborts, clears, releases, and then restores.
- **Attack that failed:** moving `Toast.#registry.claim` above `resolveOptions`. The case "refuses a group value … before claiming the host" asserts `Toast.find(host)` is `undefined` after the `data-bs-delay` refusal, then constructs again, so the move reddens it. That is the log's `the host is not claimed` row.
- The release-before-restore order has no distinguishing case. See referral R1.

**2. UNRESOLVED.** Only the rows clause is open. The source matches the claim.
- The fade door is `#apply(change, [], [transition], …)` and runs only when `animated` is true, so it matches.
- The transition door requires `[shown, transition]` and the completion door requires `[shown]`/`[transition]`, and both match.
- `hide` calls `reflow` first and removes `transition` and `shown` together; it writes no `hide` token.
- The order matches `toast.js:75-120` apart from the listed departures.
- **Ruling held for Unknown 1** (`show` on a shown toast runs the sequence again). `ToastInterface.show @returns` lists no "was shown" refusal, while `hide` lists "was hidden", so the typed contract carries the asymmetry. Bootstrap re-runs the sequence, and restarting the delay has product value.
- Non-application of E15 held: the toast has two directions, and it keeps the newest-call-wins takeover of Collapse and Tab.
- **Mutation named:** "hide reads no layout" (EXACT) reddens "stops a hide when the shown token leaves during its transition".

**3. UNRESOLVED.** Only the rows clause is open.
- `#schedule`, `#clear`, and `#leave` behave as the claim states. The accepted-hide clear is a stated departure; the accepted-show clear matches `toast.js:82`.
- **The MISSED row's equivalence holds from the source.** A timer that survives destruction runs `this.#timer = undefined; void this.hide()`, and `hide` returns at `#refused()` (the signal is aborted) before any dispatch or write. The difference is not observable. The guide's "and so does destruction" therefore has no proof that can fail, which is acceptable under R6's amendment.
- **Mutation named:** "hide leaves the delay running" (EXACT) reddens "clears the pending delay when a hide is accepted…", which asserts `toast.shown` is still `true` after the control toast's cycle.
- F2 records the naming problem.

**4. UNRESOLVED.** Only the rows clause is open. The route's shape held against `enableDismissTrigger` in `component-functions.js:16-30`.
- It prevents the default action for `A` or `AREA` before the disabled check.
- It resolves the toast by the target, else by the closest `host` token.
- It uses find-or-acquire and then calls `hide`.
- `#contests` follows the letter of E12, per delegate, and skips a disabled trigger.
- **Mutation named:** "a disabled trigger still contests" (EXACT) reddens "drives the button route alone when the dismiss trigger … is disabled".
- These items were known and carried, so they are not re-ruled: the inline `#toast` type, the duplication of `#dismiss`/`#dismissed`/`#disabled`, `#contests` sitting beside `#conflicts`, and the unapplied patch.
- F3 is a distinct defect in the same method.

**5. UNRESOLVED.** Only the rows clause is open.
- `isToastEvent` has the same form as `isCollapseEvent`.
- The five tables are frozen, and each value equals Bootstrap's (`toast.js:41-45`, `:216`).
- `TOAST_ATTRIBUTES.target` reuses `TARGET_ATTRIBUTE`.
- `TOAST_DEFAULTS` is typed `Required<Pick<ToastOptions, …>>`, the same form as `CAROUSEL_DEFAULTS` and `SWIPE_DEFAULTS` in the sibling worktrees.
- The barrel and export list hold.
- **Mutation named:** "the toast event guard reads detail uncontained" (EXACT).

**6. BROKEN.** The guide contradicts itself about which code reads the toast's vocabulary, and the returned patch set is incomplete. Details are in F1.
- **What held:**
  - The seven § Surface rows equal their TSDoc summaries.
  - The fence imports `@orkestrel/veneer/browser`.
  - `#### Toast` covers every part the claim lists, and its sequence, door, delay, and route sentences match the source.
  - The `plugin` row reads `shipped`, its Proof is `tests/src/browser/Toast.test.ts`, and its Obligation text is unchanged.
  - The returned `@returns` patch copies the landed Collapse wording ("the panel's tokens read the change as taken over"), so vocabulary stays consistent.
- The clause "no remaining `ToastInterface` sentence is false" holds on its letter.
- The clause "runs as written" is not executed. See referral R3.

**7. UNRESOLVED.** The replay clause is open. The rest held.
- The status lists the ten files and no off-limits file.
- `j-toast-gates.log.txt` shows exit 0 for every gate the claim lists, with 247 browser tests passing.
- The unit's log shows every row `EXACT` or `JOINED` except the labelled equivalent row, the four `GREEN?` rows at 0 failed, and the receipt `restored byte for byte`.
- My read of the added lines found:
  - no `any`, `as`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or default export;
  - `isInstance` at every new invoked guard.
- The added guide lines contain `.bs.` only in prose naming Bootstrap's events: the namespace departure, the `shown.bs.toast` sentence, and the plugin row. No code dispatches or listens for one, so E11 holds.
- The report records that the unit made no `prove` call.

## Findings outside the claims

**F1. The vocabulary summaries say the toast reads or matches names that only the delegate reads.**
- **Sites:**
  - In `src/browser/types.ts` (around lines 1844–1889), the summaries of `ToastSelectorMap` ("Names the selector a toast matches with"), `ToastOptions.selectors` ("Replaces the selector the toast matches with"), `ToastAttributeMap` ("Names the attributes a toast reads"), `ToastOptions.attributes`, and `ToastClassMap` ("Names the class tokens a toast writes and tests").
  - The matching § Surface rows in `guides/veneer.md` (around lines 171–173).
  - The lead sentence of the class-token table in `#### Toast` (around line 824): "The toast writes and tests the following class tokens, and the delegate's dismiss route tests the `disabled` token".
- **What is wrong:**
  - `Toast.ts` keeps no `selectors` group.
  - It never reads the `target` attribute.
  - It never reads or writes the `host` or `disabled` token. Only `Delegate.#dismiss`, `#dismissed`, and `#disabled` use them.
  - The guide's own § Surface row says the toast matches with the selector, while `#### Toast` says "a toast you construct directly matches with none".
- **Why it matters:**
  - A consumer reading the contract expects `new Toast(host, { selectors })` to have an effect, and it has none.
  - The brief's Shared row required a patch for every summary the implementation makes false.
  - This is the defect the J-ALERT subjective audit ruled BROKEN in its claim 6. `Button` set the fix pattern in J-BINDER round 3 (C5).
- **Right looks like:** return a `types.ts` patch in the `Button` form, with matching § Surface rows so `findDrift` parity holds:
  - `ToastSelectorMap`: "Names the selector the delegate routes toast dismiss clicks by; a toast constructed directly matches with none, and the default is Bootstrap's selector." `ToastOptions.selectors` takes the same sentence.
  - `ToastAttributeMap` and `ToastOptions.attributes`: name the toast and the delegate's dismiss route as the readers.
  - `ToastClassMap`: say the toast writes and tests `shown`, `transition`, and `fade`, and the dismiss route tests `host` and `disabled`.
  - `#### Toast` table lead: "The toast writes and tests the `shown`, `transition`, and `fade` tokens, and the delegate's dismiss route tests the `host` and `disabled` tokens, under the names the `classes` group resolves…".

**F2. `#schedule` uses a second word for starting the delay.**
- **Site:** `src/browser/Toast.ts`, the `#schedule` method (around line 267).
- **What is wrong:**
  - The method's own comment says "Starts the delay in full". The guide says "started again in full", the `show` summary says "starts the delay", and the test titles say "starts it".
  - `names.md` § Fixed lifecycle vocabulary fixes `start` as "Begin or restart" and forbids synonyms.
  - The sibling Carousel unit names the same act, arming a native timer, `#arm`.
- **Why it matters:** one concept, one term. Three names now exist for one act across the timer-owning engines: `schedule`, `arm`, and the prose's `start`.
- **Right looks like:** rename `#schedule` to the campaign's single term for starting an engine's timer (`#start` under the fixed vocabulary), and keep the `#clear` pair. The carrier is this unit's round 2. If the Orchestrator reconciles the term with Carousel's `#arm`, the carrier is the landing.

**F3. The comment on `Delegate.#activate` is false after this change.**
- **Site:** `src/browser/Delegate.ts`, the comment on `#activate` (around lines 169–171).
- **What is wrong:** it says the method "refuses a click that would have the button route and the collapse route each construct an engine on one element, and otherwise routes it through both". The body now runs two refusals (`#conflicts` and `#contests`) and three routes.
- **Why it matters:** the comment is the method's only statement of intent, and every W2 route landing will extend this method.
- **Right looks like:** "Drops every engine destroyed directly, refuses a click that would have two routes each construct an engine on one element, and otherwise routes it through every route, each of which drives its engines only when its selector matches." The fix can ride the landing's fold of `#contests` into the single refusal the Alert unit landed.

## Attacked and held

- **The toast validates a `selectors` group it discards.** This looks like dead work. It is the landed `Button` contract and comment, verbatim, so one group spread into both `Toast` and `Delegate` refuses a bad value at both doors.
- **The `animated: true` default writes a `fade` token no shipped rule reads, and `show` never waits under the shipped cascade.** The guide states this plainly, and the departure explains why Bootstrap's `shown` arrives late. The cascade belongs to the styles session.
- **`show` on a shown toast replays the fade under a `.fade` sheet.** The test comment records the fade-out from full opacity. This is the price of the Bootstrap-matching restart, and the guide's "runs the sequence again" covers it.
- **`#refused()` takes no parameter, where Collapse's `#refused(shown)` does.** This is correct, because `show` admits a shown host. `hide` adds `!this.shown` at both of its reads.
- **The toast stays in flow and uses no popover promotion.** This honours `types.ts` ("in its container's flow"), R8, and terrain § C.
- **Surface row order and export-list order** match the Collapse block and the ASCII sort.

## Referrals

- **R1 (objective lane).** No case distinguishes `destroy`'s release-before-restore order.
  - **Mutation:** swap `Toast.#registry.release(this.#host, this)` and `this.#snapshot.restore()`.
  - None of the 33 `Toast.test.ts` cases constructs a `Toast` from a reaction during restoration, and the log has no row for the swap.
  - The objective lane rules whether claim 1's "releases the claim before restoring" is pinned.
- **R2 (Orchestrator).** The guide's § Delegation still names only the `button` and `collapse` routes and the single button-and-collapse refusal. The toast route and the toast refusal appear only under `#### Toast`, and § Delegation was not in this unit's scope. Carry it with the Alert unit's § Delegation update at the landing or W5.
- **R3 (Orchestrator).** "Runs as written" for the Toast fence is not executed. `tests/guides.test.ts` executes only the color-mode guard example, while `documentation.md` says flagship fences are executed. This gap is not specific to Toast; the Collapse fence has it too.
- **R4 (objective lane).** Run the MISSED row's equivalence. I hold it from the source only.

## Bounds

- **B1. Guide fence text** (`guides/veneer.md`, around lines 454–467). The lead says the toast "hides itself after the delay ends", but the fence destroys it right after `show`, so it never shows the delay working. Await `hidden.vn.toast` before `destroy`, or reword the lead.
- **B2. In-flight departure** (around line 906). "Bootstrap's `show` method has no such guard" understates the difference: Bootstrap's `hide` (`toast.js:102-120`) checks only `isShown`, so it has no in-flight guard either. Write "Bootstrap's `show` and `hide` methods have no such guard."
- **B3. Temporal `once` in `Toast.test.ts`** (`writing.md` § Substitutions says `once` → `after`). The sites are:
  - the comment "which runs once the showing token has left";
  - the title "…starts it in full once both have left";
  - the label 'the toast hides once both have left'.
- **B4. `#dismiss(target)` reads as an action but only finds the trigger.** When the landing folds it into the Alert unit's resolver, keep the Alert unit's names.
- **B5. Parameter name in `#leave(related, other)`.** `other` carries a pseudo-class selector. A name that says so would read better.
- **B6. "Validates and copies the … `selectors` groups" sits beside "keeps none of it"** in both the TSDoc and `#### Toast`. This follows the `Button` precedent, but the two phrases pull against each other.
- **B7. The refusal sentence in the `Delegate` class remark** omits "inside the root" and the disabled-trigger exemption that `#contests` applies.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7; outside the claims: F1, F2, F3
