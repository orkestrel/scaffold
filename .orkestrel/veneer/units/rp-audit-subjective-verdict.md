**Lane held: subjective (Opus 5.5).** The audit ran read-only. It edited nothing and ran nothing.

## Numbered verdicts

**1. Scope and gates: UNRESOLVED**
- **Holds:** `rp-status.txt:1-4` lists exactly the four files.
- **Holds:** `tests/setup.ts` is the census file. `DRIVEN_KEYS` carries `list-group-actions-focus` at `/home/user/veneer-rp/tests/setup.ts:2802`.
- **Writer's report is the only evidence for the gates.** `rp-report.md:65-71` shows format, lint, and typecheck exits marked "inline, not separately logged".
- **Commands differ from the brief.** The brief asks for `npm run lint:check` and `npm run check` (`rp-repin-brief.md:98`). The report ran a subset of direct binaries instead.
- **Registry proof not reported run.** The `parked` member and the `primary-parked` row are read by `/home/user/veneer-rp/tests/setup.test.ts:130-168`. The report does not say that proof ran.
- **What settles it:** a `verifier` run of `format:check`, `lint:check`, `check`, and the project holding `tests/setup.test.ts`.

**2. The prose: BROKEN**
- **The three named sites are fixed.** Each now says the pointer parks outside the page:
  - `/home/user/veneer-rp/tests/setupBrowser.ts:992`
  - `/home/user/veneer-rp/tests/app/browser/integration.test.ts:721`
  - `/home/user/veneer-rp/guides/veneer.md:10590`
- **The comment's reason for the padding is false.** `integration.test.ts:721-724` says the padding means "no row starts above the document and the parked pointer, outside the page, rests over none of them". That makes the padding a cause of the pointer resting off the copies.
  - The installed contract says no staging, scroll, offset, or layout change puts content under the parked pointer (`/home/user/veneer-rp/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2746-2749`).
  - The unit's own case lifts with `padded: false` with the copy at (0, 0), and it passes green (`integration.test.ts:899-900, 911`; `rp-green-*.log.txt`).
  - So the padding plays no pointer role.
- **Two more sites keep the same stale link.** They tie the padded top to the pointer resting off the copies, which places the pointer on the padding:
  - `/home/user/veneer-rp/tests/setup.ts:633-634`: "lifts each copy below a padded top, so the pointer rests off every copy"
  - `/home/user/veneer-rp/guides/veneer.md:10557-10559`: "below a padded top, after releasing the pointer, so the released pointer rests off every copy"
- **Why the unit missed them:** the brief's search pattern `park|page's origin` (`rp-repin-brief.md:19`) does not match either sentence.
- **What right looks like:**
  - Give the pointer park its own reason: `releasePointer` parks outside the page.
  - State the padding's remaining role on its own, without a pointer consequence: it keeps a first row's negative gutter inside the document and the frame.
  - Rewrite `setup.ts:633-634` and `veneer.md:10556-10559` the same way. Both files are outside the unit's owned set, so they need a successor grant.

**3. The kept proofs: CONFIRMED**
- The diff changes only comment text around `integration.test.ts:725`. The `releasePointer` call and the `entered` recorder (`:798-805`, `:824`) are unchanged.
- `setupBrowser.ts:1025-1040` (the `releasePointer` call and the recorder in the `focus` method) is untouched. Only the remarks at `:992-995` changed.

**4. The new case proves P1 for the consumer: CONFIRMED**
- **Structure matches the claim:**
  - The recorder is armed at `integration.test.ts:888-896`, before `releasePointer` at `:897`.
  - The origin is asserted at `:899-900`.
  - The case asserts no entry (`:905`) and no hover (`:906-909`).
- **Green on round 5:** 1 passed in both projects (`rp-green-light390.log.txt:76`, `rp-green-dark1280.log.txt:78`).
- **Red on the older park:** the control fails at `:905` with `[ 'primary-parked' ]` in both projects (`rp-control.log.txt:2-9`).
- **Mutation named:** park at (0, 0) instead of (-1, -1). The `entered` assertion tells the two apart.
  - The control's own stamp does not prove which build it ran. It logs `test=0.0.23 offsetParent=0`, and the round-5 build in `veneer-rp` also reports version 0.0.23 (`/home/user/veneer-rp/node_modules/@orkestrel/test/package.json:3`).
  - The builds are told apart by their source. `/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.js:730-733` moves to `x: 0, y: 0`; the `veneer-rp` copy at `:735-738` moves to `x: -1, y: -1`.
- **Hover assertions:** in the red runs the `:hover` assertions never executed, because the failure at `:905` stops the case first. Whether they tell the parks apart is not evidenced. The descendant assertion cannot fail at all (see F2).
- **Shape against sibling cases:** the title names what the case proves. The case departs from its siblings on the theme (see F1).

**5. The census entry: BROKEN**
- **Holds:** given that the case calls `place`, the entries are the minimal registration. The portfolio refuses an unregistered scenario (`setupBrowser.ts:877`).
- **Fails:** `parked` is not a real capture state. It is a second label for what `rest` already names.
  - **It names the pointer, not the subject.** `CaptureState` "names one state a journey drives its subject to, or reads that subject in" (`tests/setup.ts:446`). The frame shows the Primary button at rest.
  - **It works around the ban on `rest`.** A `DRIVEN_KEYS` row may read a resting state for a subject with no resting frame (`setup.ts:2758-2761`). The honest state for this row is `rest`. The registry proof bans `rest` in `DRIVEN_KEYS` (`setup.test.ts:140`), and `parked` gets past that ban.
  - **It invalidates an exemption, and no proof catches it.** `EXEMPT_SUBJECTS` justifies `Primary` as "the Button family registers only the states it drives" (`setup.ts:2937-2938`). `primary-parked` is not driven. The proof at `setup.test.ts:153-157` checks only structure, so it cannot see this.
  - **It adds an unmatched portfolio row.** The row `primary-parked` has no counterpart for sorting against the counterpart portfolio (`guides/veneer.md:10534-10538`).
  - **The remarks describe a test proof, not a state.** `setup.ts:457-460` defines the member as "the proof that a pointer parked off the page enters no element".
- **What right looks like:** this is a design fork created by the brief, so it is a referral to the Orchestrator. Options:
  - **(a)** Register the frame as what it shows, a Primary resting reading. Cost: a types-first ruling on the `rest` ban and on the Button exemption's reason.
  - **(b)** Drop the written frame, the `parked` member, and the `primary-parked` row, and keep the recorder and hover proof. Cost: the case loses the capture's own offset as its adverse condition.
  - **Recommendation:** rule the fork with `planner` and `analyst`. Do not keep `parked`.

**6. Prose law: BROKEN**
- **A code token lacks its noun.** `tests/setup.ts:457` opens "`parked` is a reading as well". The rule requires a noun after the token, as the sibling sentence at `:454` does: "The `grown` state is a drive as well".
- **Synonyms alternate for one concept:**
  - `setup.ts:457-459` writes "parked outside the page" and then "parked off the page".
  - The same point is "the page's origin" at `integration.test.ts:872, 875` and "the document's origin" at `setup.ts:458`.
- **"Page" names two surfaces.** In "outside the page" it means the runner page (`index.d.ts:2746`). In "the page's origin" it means the tester document.
- **One sentence cannot be understood on first read.** `integration.test.ts:875-876` ends "touches the page's origin, the point the release parks the pointer outside of".
- **One clause is false.** `setup.ts:460` says "where the pointer would otherwise land". Without the park, the pointer stays wherever the last pointer action left it, not at the origin.
- **What right looks like:** write "The `parked` state …", use "outside the page" throughout, and name the tester document's origin with one term. Rewrite `:875-876` as, for example, "…touches the document's origin, and the release parks the pointer one pixel above and to the left of the runner page".
- **No violation found for counts or banned terms** in the added lines of `rp.diff`.

## Findings outside the claims

**F1. The new case never applies the run's theme, so the dark run's frame shows light paint**
- **Where:** `/home/user/veneer-rp/tests/app/browser/integration.test.ts:872-913`.
- **What is wrong:** the case places a frame without calling `applyTheme(VARIANT)`. Every other case that places frames in one variant calls it first, for example `:482` and `:916`.
- **Evidence:**
  - The `afterEach` hook removes `data-bs-theme` (`:245`).
  - `mountShowcase` sets no theme (`setupBrowser.ts:392-417`).
  - `applyTheme` is the only path into dark (`setupBrowser.ts:1620-1630`).
- **Consequence:** under `journey:dark-1280` with `CAPTURE=1`, the file `primary-parked--dark-1280.png` is shot in light mode. That breaks the portfolio law "the theme a filename claims and the theme its frame shows are one reading" (`guides/veneer.md:10510-10512`).
- **Fix:** open the case with `await applyTheme(VARIANT)` before the lift. The recorder is armed before `releasePointer`, so the pointer the mode click leaves behind is still covered.
- **Referral to the objective lane:** confirm on the written frame's pixels.

**F2. The descendant hover assertion cannot fail**
- **Where:** `integration.test.ts:907-909`.
- **What is wrong:** the Primary specimen is a bare `<button>` with `nested: false` (`/home/user/veneer-rp/app/browser/constants.ts:227-233`). `clone.querySelectorAll('*')` is always empty, and no mutation can make this assertion fail.
- **Fix:** delete the assertion, or copy a specimen whose top-left element is a descendant.

## Attacked and held

- **Park placement in the kept `focus` method:** `setupBrowser.ts:1025-1040` releases and then records. The mode-switch rationale at `:992-995` is still true under the park outside the page.
- **Origin geometry:** an unpadded lift of a single button at the body's start gives (0, 0), and the case asserts it (`:899-900`). Using a detached clone is permitted: `lift` removes the copy with the wrapper (`setupBrowser.ts:920-921, 967`).

VERDICT: FAIL 1, 2, 5, 6; outside the claims: F1, F2
