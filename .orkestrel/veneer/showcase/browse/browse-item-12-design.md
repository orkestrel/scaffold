## Verdict: item 12 design (`wait` with `absent`), objective lane

Lane: objective. That covers correctness under adverse orderings, what the contracts permit, the letter of the rules, and whether each proof can fail. I checked every citation against `C:\Users\mikes\WebstormProjects\browser-wt-browse` at `655906b`. Shape questions go to the subjective lane or the Orchestrator, and I do not rule on them.

### Numbered verdicts

1. **Ruling 1 (argument): HOLDS.** `#dialog` refuses a non-boolean `accept` with `{ key }` at `src/core/BrowserToolset.ts:1121-1129`. `wait` is admitted as an observation at `:644`. The boundary refuses only keys that are not advertised (`src/core/helpers.ts:543-557`), so the type refusal in `#wait` is required.

2. **Ruling 2 ("gone" means missing from `innerText`): HOLDS in part.** Removal, `display: none`, and `visibility` are settled by T270–T275 (`ROADMAP.md:7`). Ruling 2 says nothing about a closed `<details>` or `hidden="until-found"` (`content-visibility: hidden`), and the records hold no reading for either. That part is NOT-EVIDENCED. The design names `b2-disclosures` as a consumer, so it needs probe P5.

3. **Ruling 3 (text already absent settles `done` at once): HOLDS.**
   - CDP: the check runs before the wait parks (`src/core/compilers.ts:55`).
   - DOM: the first check runs before the timer is armed (`src/browser/BrowserDOMWait.ts:65-68`).
   - The vacuous-pass risk this creates is correctly declared.

4. **Ruling 4 (receipts and outcome): HOLDS. Its proof is missing.**
   - A miss sets `timeout` at `BrowserToolset.ts:1107-1111`, the recorder drops it at `BrowserRecorder.ts:122-127`, and `follow` throws `BrowserStepError` at `BrowserToolset.ts:480-485`. Replay and the compiled module both stop at the miss.
   - Nothing tests the changed `#race` label (`:1097`). Reverting it to `Waited for "TEXT"` would pass every listed test.
   - The existing dialog test (`tests/src/core/BrowserToolset.test.ts:1056-1088`) is the pattern to copy.

5. **Ruling 5 (wake on `transitionend`/`animationend`): UNRESOLVED.** It depends on P1, which has not run. Beyond that, five parts are wrong as written:
   - **(a) The remark misattributes a finding.** The proposed `BROWSER_WAIT_EVENTS` remark credits both events to P1. P1 exercises only a `visibility` transition (`transitionend`); `animationend` belongs to P3.
   - **(b) The remark breaks the comment rule.** `(probe P1)` narrates a probe's result, which `writing.md` § Code comments forbids. Name the Chromium version only, as the item 9–10 design does.
   - **(c) Ruling 5 makes text at the tip false.** It extends the wake to element waits, but the design keeps these summaries unchanged:
     - `src/core/types.ts:2589-2592` and `guides/browser.md:1743` ("after a mutation produces a match");
     - `src/browser/types.ts:113-114` and `:140` ("parked on DOM mutations"), mirrored at `guides/browser.md:1528-1529`;
     - `guides/browser.md:2836` ("re-checks after each mutation batch and each `load`");
     - `guides/browser.md:3621`.
   - **(d) The CDP placement listens on `document` only.** If Chromium does not compose transition events, an event inside a shadow root never reaches that listener. No probe settles this (P4 is missing).
   - **(e) It breaks a shared test helper.** `readBrowserCompiledTimers` (`tests/setup.ts:95-113`) fakes `document` as `{ body: { innerText: '' } }` with no `addEventListener`, and the design edits only `:117-165`.
     - Once the expression calls `document.addEventListener`, the executor throws. The timer list goes empty or the rejection goes unhandled.
     - That reddens `tests/src/core/compilers.test.ts:49`, `tests/src/core/BrowserToolset.test.ts:5429`, and the instrument proofs at `tests/setup.test.ts:162-171`.

6. **Ruling 6 (rename to `BrowserWaitOptions`): HOLDS for every in-repository consumer**: `types.ts:2374,2595`, `BrowserElementManager.ts:7,216`, and `BrowserDOMElementManager.ts:6,123`. Two parts are wrong:
   - "`veneer-wt-boot`" is false. The guide mirrors outside this tree are in `scaffold`, `scaffold-wt-defects`, `veneer`, and the primary `browser` clone, which is the same repository.
   - `src/browser/BrowserDOMView.ts:2` is the `BrowserCallOptions` import, which `title` and `read` still need. Add the new type beside it; do not replace it.
   - Referred to the subjective lane: whether the rename sits under the law "Remove a symbol only when the capability itself must not exist" (`AGENTS.md` § Design laws).

7. **Ruling 7 (CDP navigation): HOLDS.** A destroyed context re-arms on the next document (`src/core/BrowserPage.ts:464-477`). Negating `(document.body?.innerText ?? '').includes(...)` with a leading `!` binds to the call result.

8. **Ruling 8 (DOM `pagehide` gives `GONE`): HOLDS** (`BrowserDOMWait.ts:143-145`). The design calls this "declared" but adds no guide edit that declares it. When a navigation takes the text away, CDP settles `done` and DOM refuses; the guide has to say so.

9. **Ruling 9 (journeys): HOLDS.**
   - `BrowserRecorder.ts:140` copies the arguments.
   - Validation derives from the copy (`helpers.ts:3027-3051`).
   - Replay passes the arguments (`BrowserReplay.ts:258-289`), and so does the compiled module (`compilers.ts:580-589`).
   - Proof gap: the home of the refusal is `validateBrowserJourneyStep`. `tests/src/core/validators.test.ts:168` already runs the template cases, but no `absent: 'yes'` refusal case sits there.

10. **Ruling 10 (tool copy): HOLDS.** The description is 19 words, under the 25-word limit (`BrowserToolset.test.ts:842-843`). The parameter description is 50 characters, under 100 (`:829`).

11. **Ruling 11 (vocabulary bound): REFERRED to the Orchestrator.** Raising a test bound by the writer's own decision is a policy choice outside this lane, and item 9's raise was logged as a deviation (`browse.md:37`). The guide drift the design cites is real: `guides/browser.md:2969` says 5 900, while the test bound is 6050 (`tests/src/core/BrowserToolset.test.ts:793`).

12. **Probes P1–P3 committed "as the item's own test": FALSE against the rules.** `tests.md` § Probes says:
    - a runtime probe lives in `tmp/probes/` and runs through the `probe` project (`vite.config.ts:430-445`);
    - a probe that settles a claim is promoted to the mirrored test, and every other probe is deleted.

    The P2 and P3 readings that only declare a limit cannot ship as tests.

13. **Tests that can pass vacuously or contradict the existing ones:**
    - **`compilers.test.ts:56-66`.** Adding the absent form to that loop contradicts the loop's own assertions, `result` `false` and `disconnects` `1`. The absent form resolves `true`, and with the inert `clearTimeout` it runs `finish` twice, so it disconnects twice. It needs its own case.
    - **"registers `BROWSER_WAIT_EVENTS.length` listeners".** This passes if the constant is emptied. Assert the literal names `['transitionend', 'animationend']` with `capture: true`.
    - **`BrowserDOMView` "resolves after `remove()`".** This passes through the first check if the removal comes first. Start the wait, assert it is still pending, then remove.
    - **`journey.test.ts` replay "complete".** This passes vacuously if the fresh page's setup never shows the toast. Record an appearance `wait` before the dismissal.
    - **`BrowserDOMWait` tests.** Nothing proves the per-root registration: an event that is not composed inside an open shadow root, and a departed root's listener released.
    - **P1 Reading B.** An assertion of "between 200 ms and 200 ms plus 2 frames" breaks `tests.md:39`. Assert the property instead: it resolves, the elapsed time is at least the delay, and it settles well before the deadline.

### Findings outside the claims

- **`tests/setup.ts:95-113` and `tests/setup.test.ts` are missing from U1**, and so is `npm run test:setup`. A changed setup export needs its proof (`tests.md:21-25`).
- **`tests/src/core/recorders/*` is a glob.** The file is `tests/src/core/recorders/BrowserRecorder.test.ts`.
- **The prose breaks the writing rules.** "Should ruling 5 extend…" uses a banned term, and "today" is a temporal word; give the commit instead.
- **The lane line says shape rulings are "listed under Tensions"**, but rulings 1, 4, 6, 9, and 10 already decide them. Mark them as proposals.
- **The design defers its probes**, while the design of record ran its probes before ruling. Ruling 5 therefore stays conditional.
- **`browse.md:39` names items 11 and 12 only.** Item 10 is at `:38`.
- **The design reasons from Bootstrap's exits but never checks them.** If they swap classes from script on `transitionend`, they produce mutations, and ruling 5 serves only exits made purely in CSS. The records contain no such swap, so I cannot confirm this. It bears on the scope question in Tensions.

### Attacked and held

- **Negation.** `!(…).includes(x)` parses as the negation of the call.
- **Placement divergence on navigation.** Ruling 7 matches the CDP engine and ruling 8 matches the DOM engine.
- **Toolset-double tests.** The double records `wait Saved absent` against the plain `wait Saved`, so dropping `absent` in `#wait` is caught.
- **The `:5410` fixture test.** It catches `BrowserPage` dropping `absent`, because `runBrowserCompiledTimers` resolves `false` without the negation.
- **The `factories.test.ts` receipt.** An ignored `absent` would end in `did not appear`, so the test can fail.
- **Guide drift at `:303`.** `look` throws `BROWSER_TOOLSET_LIMIT` through `#pageSlice` (`BrowserToolset.ts:731,796-801`).
- **Listing.** `, absent` follows `, submit` (`helpers.ts:2786`).
- **Remaining roadmap items.** Item 8 (`BrowserPageElement.ts:361-381`) and item 7 (`BrowserReplay.ts:343-345`) are untouched.

---

## Corrected design

Lane: objective (correctness, constraints, and what the contracts permit). Rulings marked **(proposal)** are shape decisions for the subjective lane; Tensions restates each with the recommendation.

Tree: browser `655906b` in `C:\Users\mikes\WebstormProjects\browser-wt-browse`. Every path:line below is that tree's. `browse.md:38-39` orders items 10 and 11 before item 12, so the writer re-reads every citation after those two land.

### Item 12: let `wait` assert that its text left the page

#### What the records settle and what they leave open
- **Settled.** Chromium's `innerText` drops a removed node, a `display: none` subtree, and `visibility: hidden` text. Veneer's run on 2026-10-02 saw `wait` report four things absent: a dismissed toast, an inactive tab pane, a closed offcanvas, and an inactive slide (`ROADMAP.md:7`, calls T272 to T275).
- **Open.**
  - A text wait wakes only on a `MutationObserver` batch (`src/core/compilers.ts:50-53`, `src/browser/BrowserDOMWait.ts:112-120`). A transition or an animation that ends can hide text with no DOM mutation, and the records hold no reading on that.
  - The records hold no reading on `content-visibility: hidden` (a closed `<details>`, `hidden="until-found"`).
  - The probes settle both questions before any code is written.

#### Probes the writer runs first
Write each probe under `tmp/probes/` and run it through `npm run test:probe`. That project runs in Node (`vite.config.ts:430-445`), so each probe launches Chromium and evaluates in an isolated world over CDP, the way `tests/service/browser.test.ts` does. Record the Chromium version and each probe's command and output. A probe never ships. A settled reading is promoted into the mirrored tests listed later, and every other probe is deleted.

- **P1: delayed `visibility`.**
  - Setup: `<p id="toast" class="shown">Saved to drafts</p>` with `#toast{visibility:hidden;transition:visibility 0s linear 200ms} #toast.shown{visibility:visible;transition:none}`. Remove `shown`.
  - Record:
    - whether `transitionend` fires (a main-world listener writes `document.body.dataset`);
    - whether a capture listener registered in an isolated world fires for it;
    - `innerText` at 100 ms (text present) and at 300 ms (text gone).
  - Control: the same element with no transition loses its text in the next frame.
- **P2: discrete `display`.**
  - Setup: `#toast{display:none;opacity:0;transition:opacity 150ms,display 150ms allow-discrete} #toast.shown{display:block;opacity:1}`.
  - Record each `transitionend` `propertyName`, and whether `innerText` read in the animation frame after the last event lacks the text.
  - Control: the variant that changes only opacity, whose text stays at opacity 0.
- **P3: animation.**
  - Setup: `@keyframes leave{to{visibility:hidden}}` with `animation:leave 150ms forwards`.
  - Record whether `animationend` fires and whether the text leaves `innerText` after it.
  - Control: keyframes that change only opacity, whose text stays.
- **P4: shadow boundary.**
  - Setup: run P1's markup inside an open shadow root.
  - Record whether a capture listener on `document` sees that root's `transitionend`, and read `event.composed`.
- **P5: `content-visibility`.**
  - Setup: a closed `<details><summary>More</summary><p>Hidden detail</p></details>` and a `<div hidden="until-found">Found text</div>`.
  - Record whether `document.body.innerText` contains either text, then whether it does after opening the `<details>`.

What each outcome decides:
- **P1:**
  - The event fires in both worlds: ruling 5 lands, and the item's tests record P1 Reading A red against the engine as it stands before the code changes (`tests.md:42`).
  - The event does not fire in the isolated world: ruling 5 cannot land for CDP; report it to the Orchestrator.
  - The text never leaves `innerText`: drop ruling 5 and report it.
- **P2 or P3 without its event, or with the text present in the next frame:** that case becomes a declared limit in the `BROWSER_WAIT_EVENTS` remarks and in `BrowserDOMWait`'s TSDoc. Add no poll.
- **P4 not composed:** the CDP placement's shadow-root case becomes a declared limit in `compileQueryWaitExpression`'s remarks, beside the existing mutation limit.
- **P5:** ruling 2 states the reading for each case, and the guide's `wait` row carries it.

#### Rulings
1. **Argument.**
   - `wait` gains `absent` (boolean). With `true` the wait settles `done` when the text is not on the page. With `false` or omitted, it waits for the text to appear.
   - A value that is not a boolean is refused before any page call with `BROWSER_TOOLSET_ARGUMENT`, `{ key: 'absent' }`, and the message `The absent parameter must be a boolean.`, mirroring `accept` (`src/core/BrowserToolset.ts:1121-1129`).
   - The tool stays `pure` and stays an observation under a hold (`src/core/BrowserToolset.ts:644`).
2. **What "gone" means.**
   - The text is absent from the main document body's `innerText`, the reading the appearance wait uses (`src/core/compilers.ts:70`, `src/browser/BrowserDOMView.ts:157`).
   - Removal, `display: none`, and `visibility` other than `visible` count as gone. Opacity 0, a position off screen, and `aria-hidden` do not. `content-visibility: hidden` is as P5 reads it.
   - Child frames' text never counts.
3. **Text already absent at the first check settles `done` at once.** The dismissing action's receipt can land after the exit has finished. One receipt serves both cases.
4. **Receipts and outcome (proposal).**
   - Done: `"TEXT" is not on the page.`
   - Miss: `"TEXT" is still on the page after N s.`, with outcome `timeout`. The recorder drops it (`src/core/recorders/BrowserRecorder.ts:122-127`), and a replay or a compiled module stops at it (`src/core/BrowserToolset.ts:480-485`, `guides/browser.md:2091`).
   - The `#race` label (`src/core/BrowserToolset.ts:1097`) becomes `Waited for "TEXT" to leave`.
5. **Wake on a finished transition or animation (gated by P1).**
   - Both engines re-check after `transitionend` and `animationend`: CDP through the requestAnimationFrame guard, DOM through `#recheck` as a mutation batch does.
   - CDP: a capture listener on `document` inside the compiled expression, released by an `AbortController` in `finish`.
   - DOM: capture listeners on every observed root beside `load` (`src/browser/BrowserDOMWait.ts:120`), released with that root's `release`.
   - This applies to every wait through either engine, element waits included. Every summary that names the triggers changes with it (public surface).
   - Cancel events are not listened to: a cancel comes from a style change that a mutation already wakes.
6. **View contract (proposal).**
   - Rename `BrowserElementWaitOptions` to `BrowserWaitOptions` with no shim, and update every consumer in the same commit.
   - `BrowserViewInterface.wait` and `BrowserPageInterface.wait` take `BrowserWaitOptions`.
   - Outside this repository the type appears in guide mirrors under `scaffold`, `scaffold-wt-defects`, and `veneer`, which refresh at re-pin.
7. **CDP placement.**
   - `compileTextWaitExpression` gains `absent = false`, which negates the predicate. `BrowserPage.wait` passes `options?.absent === true`.
   - The navigation loop is unchanged (`src/core/BrowserPage.ts:451-478`), so a navigation that leaves the text behind settles `done` within the deadline.
8. **DOM placement.**
   - `BrowserDOMView.wait` binds `absent` into its check.
   - A `pagehide` still fails the wait with `GONE` (`src/browser/BrowserDOMWait.ts:143-145`), which gives `refused`. The guide declares the difference: when a navigation takes the text away, the CDP placement settles `done` and the DOM placement refuses.
9. **Journeys.**
   - The recorder keeps `absent` with no code change (`src/core/recorders/BrowserRecorder.ts:140`).
   - Validation derives from `BROWSER_TOOL_COPY` (`src/core/helpers.ts:3027-3051`). Replay passes `absent` through `follow` (`src/core/BrowserReplay.ts:258-289`), and so does the compiled module (`src/core/compilers.ts:580-589`).
   - The trigger stays the text (`src/core/helpers.ts:2823-2824`).
   - Listing (proposal): `sN wait "TEXT"[ as NAME], absent`, mirroring `, submit` (`src/core/helpers.ts:2786`).
10. **Tool copy (proposal).**
    - Description: `Waits for that text to appear on the page; set absent to true to wait for it to leave.` (19 words).
    - `absent`: `{ type: 'boolean', description: 'True to wait until the text is gone from the page.' }` (50 characters).
11. **Vocabulary bound.**
    - Measure `JSON.stringify(definitions).length` before and after the change; about 140 characters are added. The bound is 6050 (`tests/src/core/BrowserToolset.test.ts:793`).
    - If the bound breaks, first shorten the copy. If it still breaks, stop and report the measured length to the Orchestrator; do not raise the bound unilaterally.
    - Set the guide's figure (`guides/browser.md:2969`, which reads 5 900 at `655906b`) to the bound the test holds.

#### Public surface
- **`src/core/types.ts:2373-2376`:** the renamed type:
  ```ts
  /**
   * Configures a text or element wait, including whether absence satisfies it.
   *
   * @remarks
   * - `absent` — if `true`, the wait resolves when the text is not visible or no element matches;
   *   if `false` or omitted, when the text is visible or an element matches. The wait checks before
   *   it parks, so a condition that already holds resolves at once
   */
  export interface BrowserWaitOptions extends BrowserCallOptions {
  	readonly absent?: boolean
  }
  ```
- **`src/core/types.ts:2589-2596`:**
  - `wait(query, options?: BrowserWaitOptions)`.
  - Summary: `Resolves with the elements matching \`query\` after a mutation or a finished transition or animation produces a match, or after none matches when \`absent\` is set; rejects at the deadline or on abort.`
- **`src/core/types.ts:2636-2640`:**
  - `wait(text: string, options?: BrowserWaitOptions): Promise<void>`.
  - Summary: `Resolves when \`text\` is visible in the document, or when it is not with \`absent\` set; rejects with a \`BrowserError\` coded \`BROWSER_WAIT_TIMEOUT\` at the deadline, and with \`signal.reason\` on abort.`
- **`src/core/types.ts:3305-3306`:**
  - `wait(text: string, options?: BrowserWaitOptions): Promise<void>`.
  - Summary: `Waits for visible text in the main document, or for its absence with \`absent\` set, rejecting at the deadline or on abort.`
- **`src/core/constants.ts`, after line 153:**
  ```ts
  /**
   * Names the events after which a text or element wait checks its condition again, beside a
   * mutation: `transitionend` and `animationend`.
   *
   * @remarks
   * A transition or an animation that ends can hide or show text through `display` or
   * `visibility` with no DOM mutation; Chromium VERSION fires `transitionend` at a transition's
   * end, in every world that listens, and `animationend` at an animation's end.
   * LIMITS_FROM_P2_TO_P4
   */
  export const BROWSER_WAIT_EVENTS: readonly string[] = Object.freeze(['transitionend', 'animationend'])
  ```
  - `VERSION` is the recorded Chromium version.
  - `LIMITS_FROM_P2_TO_P4` holds each limit the probes found, or is deleted when none.
  - Drop the `animationend` clause if P3 shows no event.
- **`src/core/compilers.ts:22-28`:** the summary becomes `Compiles a wait woken by mutations and finished transitions and animations, with one deadline and explicit disconnect ownership.`. Add the P4 limit as a remark if one is found.
- **`src/core/compilers.ts:59-72`:**
  - Summary: `Compiles a wait for the presence or absence of visible text, coalesced by animation frames.`
  - Add `@param absent - If \`true\`, the wait resolves when the body's \`innerText\` lacks \`text\`; if \`false\`, when it contains it. Default: \`false\``.
- **`src/browser/BrowserDOMWait.ts:6-29`:**
  - Summary: `Parks one condition on DOM mutations and finished transitions and animations until it holds, with one deadline and no other timer.`
  - Remarks: the wait re-reads after every mutation batch, every `load`, and every `BROWSER_WAIT_EVENTS` event in an observed root, and a departed root's listeners are removed with its `load` listener.
- **`src/browser/types.ts:113-120` and `:140`:**
  - `BrowserMutationWait` summary: `Describes one wait parked on DOM mutations and finished transitions and animations.`
  - `BrowserDOMWaitInterface` summary: `Settles one wait parked on DOM mutations and finished transitions and animations.`
  - The `roots` remark names the same three triggers.
- **`src/core/constants.ts:622-637`:** the copy from ruling 10.
- **`src/core/constants.ts:521`:** append `` `wait` takes `absent` beside `text` and `timeout`. ``
- **`src/core/BrowserToolset.ts:119`:** append to the class TSDoc: `` `wait` with `absent` set to `true` settles when the text is not on the page, and a miss returns the `timeout` outcome as an appearance miss does. ``

#### File edits (path:line)
- **`src/core/compilers.ts:34-56`:**
  - Declare `const events = new AbortController()` before `finish`.
  - Add a `schedule` arrow holding the existing requestAnimationFrame guard, and call `new MutationObserver(schedule)`.
  - Before `timer`, add `for (const name of ${JSON.stringify(BROWSER_WAIT_EVENTS)}) document.addEventListener(name, schedule, { capture: true, signal: events.signal })`.
  - `finish` calls `events.abort()`.
  - Import `BROWSER_WAIT_EVENTS` at lines 12-18.
- **`src/core/compilers.ts:66-72`:** take `absent = false`, with the predicate `${absent ? '!' : ''}(document.body?.innerText ?? '').includes(...)`.
- **`src/core/BrowserPage.ts:423`:** use `BrowserWaitOptions`. At `:438`, call `compileTextWaitExpression(text, remaining, key, options?.absent === true)`.
- **`src/browser/BrowserDOMView.ts:1-5`, `:108`, `:116`, `:156-158`:**
  - Add `BrowserWaitOptions` to the import and keep `BrowserCallOptions`, which `title` and `read` use.
  - Bind the check as `this.#contains.bind(this, document, text, options?.absent === true)`.
  - `#contains(document, text, absent)` returns `true` when `includes(text) !== absent`, and `undefined` otherwise.
- **`src/browser/BrowserDOMWait.ts:120`:** add `for (const name of BROWSER_WAIT_EVENTS) root.addEventListener(name, this.#recheckHandler, { capture: true, signal: release.signal })`. Import the constant from `@src/core` at `:3`.
- **Rename:** `src/core/elements/BrowserElementManager.ts:7`, `:216`, and `src/browser/elements/BrowserDOMElementManager.ts:6`, `:123`.
- **`src/core/BrowserToolset.ts:1076-1115` (`#wait`):**
  - Read `absent` after `timeout` and refuse a non-boolean per ruling 1.
  - Pass `absent: absent === true` to `this.#cursor.wait`.
  - Choose the label and both receipts per ruling 4.
- **`src/core/helpers.ts:2790-2791`:** `` return `${step.id} wait ${JSON.stringify(text)}${suffix}${step.arguments['absent'] === true ? ', absent' : ''}` ``.
- **`tests/setup.ts:95-113` and `:117-165`:**
  - Both evaluators' `document` gains an `addEventListener` that records each listener's name, `capture`, and `signal`.
  - `readBrowserCompiledTimers` keeps its return shape.
  - `BrowserCompiledRun` gains `listeners: readonly { name: string; capture: boolean }[]` and `released: number`, counted after the deadline callback.
- **`tests/setup.test.ts`:** prove the new fields against a hand-written expression that registers one listener and aborts it, plus a control that never aborts.
- **`tests/setup.ts:2768-2773`:** `BrowserViewDouble.wait(text, options?: BrowserWaitOptions)` records `` `wait ${text}${options?.absent === true ? ' absent' : ''}` ``.
- **`tests/setup.ts:3334-3338`:** add the template case `{ step: { id: 's1', action: 'wait', arguments: { text: 'Saving', absent: true } }, line: 's1 wait "Saving", absent', trigger: 'Saving' }`. `tests/src/core/validators.test.ts:168` and `tests/src/core/helpers.test.ts:1293` both run it.

#### Tests that fail if the feature is removed
- **`tests/src/core/compilers.test.ts`:**
  - The existing loops at 42-66 gain the listener assertions only. Every expression registers exactly `[{ name: 'transitionend', capture: true }, { name: 'animationend', capture: true }]`, written as literals, not derived from the constant, and `released` equals 2 after the deadline.
  - A separate case: `compileTextWaitExpression('ready', 73, 'text', true)` resolves `true` against the empty `innerText` with both listeners released. Control: the same call without `absent` resolves `false`.
- **`tests/src/core/BrowserToolset.test.ts`:**
  - Pattern of 550-570 over `createBrowserViewDouble({ waited: false })`: an absent wait gives `"Added to cart" is still on the page after 0.01 s.` with outcome `timeout`.
  - Over the default double: `"Saved" is not on the page.` with outcome `done`, and `view.calls` holds `wait Saved absent`. Control: the plain wait records `wait Saved`.
  - `absent: 'yes'` refuses `BROWSER_TOOLSET_ARGUMENT` `{ key: 'absent' }`, and `view.calls` holds no wait.
  - Pattern of 1056-1088: an absent wait interrupted by a dialog returns `Waited for "Order placed" to leave. A confirm dialog is open: "Leave?"; call dialog.`
  - Line 855: the description. Assert the `absent` property `toEqual` beside `submit` at 860-865.
  - Line 793: the bound per ruling 11.
  - Fixture of 5410-5438: an absent wait sends an expression that `runBrowserCompiledTimers` resolves `true` on an empty body.
- **`tests/src/core/helpers.test.ts:1293`:** the template case renders `, absent`.
- **`tests/src/core/validators.test.ts`:** `{ action: 'wait', arguments: { text: 'Saved', absent: 'yes' } }` throws `Invariant 7 (actions): has malformed native arguments`. Control: `absent: true` passes.
- **`tests/src/core/recorders/BrowserRecorder.test.ts`:**
  - A recorded `done` absent wait keeps `{ text, absent: true }`.
  - Control: a `timeout` absent wait records no step.
- **`tests/src/core/BrowserJourneyToolset.test.ts`:**
  - An `edit` `add` of `{ action: 'wait', arguments: { text: 'Saved', absent: true } }` lists `, absent`.
  - `absent: 'yes'` is refused through the edit refusal.
- **`tests/src/browser/BrowserDOMWait.test.ts`:**
  - A check that becomes true only after a `transitionend` dispatched on the document, with no mutation, settles before the deadline.
  - The same holds for a `transitionend` that is not composed, dispatched inside an open shadow root that `roots` returns.
  - After settlement, and on a departed root (pattern of line 90), a further `transitionend` runs no check.
- **`tests/src/browser/BrowserDOMView.test.ts` (real Chromium):**
  - Start `wait(text, { absent: true })`, assert it is pending after a frame, then `remove()`: it resolves. Repeat with `hidden = true`.
  - It resolves at once for text never present.
  - It rejects `BROWSER_WAIT_TIMEOUT` when the text stays.
  - The promoted P1 case asserts three things: it resolves, the elapsed time from the class change is at least 150 ms, and it settles before half the deadline. Its control, with no transition, resolves too.
- **`tests/service/browser.test.ts`, beside line 932 (real CDP):** the same cases through `page.wait`.
- **`tests/src/browser/factories.test.ts:196` (DOM toolset):** an absent wait after a removal returns `"Late arrival" is not on the page.`
- **`tests/service/journey.test.ts`, a sibling of claim 7 at 641-683:**
  - The page gets a toast and a `Dismiss` button through `page.evaluate`.
  - Record `wait "Saved to drafts"`, `click Dismiss`, and `wait "Saved to drafts"` with `absent: true` and `timeout: 1`, then save.
  - The listing shows `s3 wait "Saved to drafts", absent`. A replay on a fresh page with the same setup is `complete`, and step `s1` proves the toast was there.
  - Control: on a page where `Dismiss` leaves the toast, the run stops at `['s3', 'timeout']` with `"Saved to drafts" is still on the page after 1 s.`

#### Guide edits (`guides/browser.md`)
- **Line 195:** add a `BROWSER_WAIT_EVENTS` row after it, whose summary equals the constant's description paragraph.
- **Line 288:** `The text or the element does not arrive, or with \`absent\` does not leave, or the readiness does not arrive before the deadline.`
- **Line 364:** the `compileQueryWaitExpression` summary.
- **Line 365:** the `compileTextWaitExpression` summary.
- **Line 1094:** the row becomes `BrowserWaitOptions` with its summary.
- **Line 1417:** the `BrowserDOMWait` summary.
- **Lines 1528 and 1529:** the `BrowserMutationWait` and `BrowserDOMWaitInterface` summaries.
- **Lines 1674, 1694, and 2822:** the `wait` summaries.
- **Line 1743:** the element `wait` summary.
- **Line 1757:** unchanged.
- **Line 2836:**
  - Change the triggers to `after each mutation batch, each \`load\`, and each \`BROWSER_WAIT_EVENTS\` event in an observed root`.
  - Add the placement difference from ruling 8: `A text wait with \`absent\` that a navigation ends settles \`done\` in the CDP placement and fails with \`GONE\` in this one.`
- **Line 2871:**
  - Parameters: add `` , `absent` (boolean, true to wait until the text is gone) ``.
  - Description: the copy from ruling 10.
  - Add the P5 reading where it bears.
- **Line 2907:**
  - Situation: `Text \`wait\` found, and text it did not find within its timeout; with \`absent\`, text that is gone, and text that stayed`.
  - Text: add `` `"TEXT" is not on the page.` `` and `` `"Saved to drafts" is still on the page after 5 s.` ``.
- **Line 2967:** add `When a step dismisses a message or closes a panel, follow it with a \`wait\` with \`absent\` set to \`true\` for its text, so the journey keeps the exit check.`
- **Line 2969:** set the full-list figure to the bound the test holds.
- **Line 2999:** add `` , and a `wait` with `absent` as `, absent` after its text ``.
- **Line 3621:** `the wait parked on mutations and finished transitions and animations across frames and shadow roots, its deadline, abort, and \`pagehide\``.

#### ROADMAP.md (same commit)
- Delete item 12 (`ROADMAP.md:8`).
- Re-verify each citation the edit shifts. If items 10 and 11 landed first, as `browse.md:38-39` orders, only items 6 to 8 remain, and this edit touches none of their citations. If either has not landed, re-verify:
  - item 11's `src/core/compilers.ts:66-71` and `src/browser/BrowserDOMView.ts:157`;
  - item 11's `guides/browser.md:1674`;
  - item 10's `guides/browser.md:2895`.

#### Interactions with items 10 and 11
- **Item 10, code:** no shared code path. Item 10 edits `renderBrowserOutlineRow` (`src/core/helpers.ts`, near 185) and `BrowserDOMElementManager.ts:404-411`. Item 12 edits `helpers.ts:2790` and only the type import in `BrowserDOMElementManager.ts:6` and `:123`.
- **Item 10, documents:** both items edit `guides/browser.md` and `ROADMAP.md`, so the later commit re-reads those citations.
- **Item 10, meaning:** `expanded=false` and `selected=false` are outline text, not page text. A `wait { text: 'expanded=true', absent: true }` passes vacuously (ruling 3).
- **Item 11:** it aligns `read` with `innerText`. Until it lands, `read` can show a hidden toast that the absent wait reports gone (T270 against T272). Item 12 does not depend on item 11's order.

#### Consequences to carry
- Veneer's saved `b2-feedback` (it ends on `s15 press Enter`) and `b2-disclosures` (`s3`, `s4`) can gain exit checks through `edit` `add` after the 0.0.22 re-pin. If P5 shows that closed `<details>` text stays in `innerText`, the `b2-disclosures` exit check cannot use `absent`.
- The ollama store proof's tool-copy token reading moves. The guide sentence at 2967 keeps its date and tree; re-measure at the next re-pin.
- Appearance waits and element waits also wake on a finished transition or animation in both placements. In the CDP placement each such wake costs an element wait one more `find` iteration (`src/core/elements/BrowserElementManager.ts:225-256`).

## Alternatives
- **A separate tool, such as `gone`:** rejected. It breaks the boolean-switch law (`AGENTS.md` § Design laws), grows the advertised list that `tests/src/core/BrowserToolset.test.ts:802-803` holds at seven, and costs more copy against the 6050 bound.
- **An absence check on elements that reuses `elements.wait({ absent })`:** rejected. A `wait` step carries no target (`src/core/helpers.ts:3000-3008`), and the exits the runs saw (T176, T62, T68, T85, T184, T220) are named by text.

## Constraints
- `src/core/helpers.ts:3027-3051`: native step arguments are validated from `BROWSER_TOOL_COPY`.
- `src/core/recorders/BrowserRecorder.ts:122-127`: a `timeout` outcome is never recorded.
- `src/core/BrowserReplay.ts:224-231`: `wait` is supported in both placements.
- `tests/src/core/BrowserToolset.test.ts:829`, `:842-843`, and `:793`: each parameter description is at most 100 characters, each tool description at most 25 words, and the copy at most 6050 characters.
- `src/core/compilers.ts:55` and `src/browser/BrowserDOMWait.ts:65-68`: the predicate is checked before parking.
- `src/browser/BrowserDOMWait.ts:25-28`: a shadow root attached after the wait began is a declared limit, and ruling 5 keeps it.
- `src/core/BrowserPage.ts:464-477`: a destroyed context re-arms on the next document.
- `tests.md` § Probes: probes live in `tmp/probes/`; promote or delete.
- `tests.md:21-25`: a changed setup export keeps its proof in `tests/setup.test.ts`.

## Refusals
- **A poll that re-reads `innerText` on a timer:** refused by "**No polling architecture.**" (`AGENTS.md` § Design laws).
- **Keeping `BrowserElementWaitOptions` beside a second type of the same shape:** refused by "**One concept, one term.**" and "**No compatibility shims.**" (`AGENTS.md` § Design laws).
- **Committing P2 to P5 as tests:** refused by `tests.md` § Probes.

## Measurements
Supplied:
- Item 12's evidence from veneer's run on 2026-10-02 (`ROADMAP.md:8`).
- The `innerText` agreement in T270 to T275 (`ROADMAP.md:7`).
- The item 9 bound of 6050 characters (`browse.md:37`).

Missing:
- P1 to P5 readings and the Chromium version.
- The serialized tool-copy length before and after the change.
- The store proof's tokens after the copy change.

## Units
1. **U1, engines and contract.**
   - Role and engine: writer, `opus`, high.
   - Owns:
     - `src/core/types.ts`;
     - `src/core/constants.ts` (the `BROWSER_WAIT_EVENTS` part);
     - `src/core/compilers.ts` and `src/core/BrowserPage.ts`;
     - `src/browser/BrowserDOMView.ts`, `src/browser/BrowserDOMWait.ts`, and `src/browser/types.ts`;
     - both element managers;
     - `tests/setup.ts:95-165` and `:2768-2773`, and `tests/setup.test.ts`;
     - `tests/src/core/compilers.test.ts`;
     - `tests/src/browser/BrowserDOMWait.test.ts` and `tests/src/browser/BrowserDOMView.test.ts`;
     - `tests/service/browser.test.ts`.
   - Order:
     1. Run P1 to P5 in `tmp/probes/`.
     2. Write the promoted P1 tests and record them red with their command and count.
     3. Write the types, then the implementation.
     4. Delete the probes.
   - Accepts when these exit 0, read bare: `npm run check`, `npm run test:setup`, `npm run test:src:core`, `npm run test:src:browser`, and `npm run build` then `npm run test:service`. The P1 red and green counts are recorded.
2. **U2, toolset and journeys.**
   - Role and engine: writer, `opus`, high. Depends on U1.
   - Owns:
     - `src/core/constants.ts:509-637`, `src/core/BrowserToolset.ts`, and `src/core/helpers.ts:2790-2791`;
     - `tests/setup.ts:3334-3338`;
     - `tests/src/core/BrowserToolset.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, and `tests/src/core/BrowserJourneyToolset.test.ts`;
     - `tests/src/core/recorders/BrowserRecorder.test.ts` and `tests/src/browser/factories.test.ts`;
     - `tests/service/journey.test.ts`.
   - Accepts when the measured copy length is reported against the bound, and `test:src:core`, `test:src:browser`, and `test:service` exit 0.
3. **U3, guide and roadmap.**
   - Role and engine: writer, `opus`. Depends on U2.
   - Owns `guides/browser.md` and `ROADMAP.md`.
   - Accepts when `npm run test:guides` and `npm run test:policy` exit 0 and every remaining roadmap citation is re-read.
4. **U4, review.** One reviewer who wrote none of U1 to U3 checks the contract, the listener release in both engines, the summaries ruling 5 changes, and the vacuous-pass wording.
5. **U5, gates.** The verifier runs the tree-wide gates, then the commit is made.

## Tensions
Each tension goes to the subjective lane, with this design's recommendation:
- **Scope of ruling 5 (recommend: all waits).** Extending it to appearance and element waits keeps one engine per placement but changes behavior outside item 12. The narrower option adds a second wake path for the text predicate alone.
- **Rename `BrowserWaitOptions` against a parallel `BrowserTextWaitOptions` (recommend: rename).** The rename is breaking in a 0.0.x package. It is also to be weighed against "Remove a symbol only when the capability itself must not exist."
- **One receipt for "never there" and "left" (recommend: one receipt).** A separate `"TEXT" left the page.` would expose a vacuous check at record time, but `view.wait` would have to report which case held.
- **The listing word (recommend: `, absent`).** Alternatives: `, gone` or `until gone`.
- **The miss receipt (recommend: `is still on the page after N s.`).** Alternative: `did not leave within N s.`
- **Vocabulary bound (Orchestrator):** whether to raise 6050 if trimmed copy still exceeds it.

## Risks
- **Vacuous pass:** a misspelled `absent` text always passes in a replay (ruling 3), and so does an absent wait on outline tokens.
- **Transient absence:** text removed and re-added in a later frame can settle `done` early. No stability frame is added.
- **External implementers:** a `BrowserViewInterface` implementer that ignores `absent` inverts the wait with no type error. None was found in `C:\Users\mikes\WebstormProjects` outside `node_modules`.
- **Wake rate:** a page with a steady stream of transitions wakes waits more often. Element waits in the CDP placement pay a `find` per wake.
- **Already in the tree, outside this item:**
  - `guides/browser.md:2969` says 5 900 while the bound is 6050 (item 9 drift; U3 corrects it).
  - `guides/browser.md:303` omits `look` from `BROWSER_TOOLSET_LIMIT`, though `look` throws it through `#pageSlice` (`src/core/BrowserToolset.ts:731`, `:796-801`). This is item 9 drift for the item 9 review.
  - The `wait` schema declares `timeout` an integer (`src/core/constants.ts:629-632`), while `#wait` accepts fractions (`src/core/BrowserToolset.ts:1082-1091`). A recorded `timeout: 0.5` might fail `isInteger` at `save` (`src/core/helpers.ts:3044-3045`). This is unverified; one test settles it.

### What changed and why
- **Ruling 5:** gated on P1 with explicit outcomes. The misattributed and probe-narrating TSDoc is fixed, and every summary it makes false is now listed: `types.ts:2589-2592`, `browser/types.ts:113-114` and `:140`, `compilers.ts:22-23`, and guide lines 364, 1528, 1529, 1743, 2836, and 3621.
- **Probes:** moved to `tmp/probes/` per `tests.md` § Probes. P4 (shadow boundary) and P5 (`content-visibility`) are added. P1 now records that the event fired.
- **Test helpers:** `tests/setup.ts:95-113` and `tests/setup.test.ts` are added, plus `npm run test:setup` and `npm run check` in U1. Without them the change breaks `compilers.test.ts:49` and `BrowserToolset.test.ts:5429`.
- **Tests:** the absent case moves out of the loop whose assertions contradict it. The listener assertion now uses literal names. The DOM view test starts pending first, and the journey test records the appearance first. Shadow-root and departed-root coverage is added to `BrowserDOMWait`, the timing assertion is now a property, and the dialog-label and validator refusal tests are added.
- **Rulings 8 and 11:** ruling 8 gets the guide edit that declares it. Ruling 11 no longer lets the writer raise the bound alone.
- **Smaller fixes:** the mirror list (`veneer-wt-boot` is gone), the `BrowserDOMView` import, the `browse.md:38-39` citation, the recorder test path, and the shape rulings marked as proposals. The banned `should` and the word "today" are removed.

Terminal: CHANGES REQUIRED. Ruling 5 is UNRESOLVED until P1 runs; ruling 11 is referred to the Orchestrator; the rename's fit with the symbol-removal law is referred to the subjective lane.