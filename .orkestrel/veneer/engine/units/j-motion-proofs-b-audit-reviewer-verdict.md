# J-MOTION-PROOFS-B rounds 1 and 2 — the subjective lane's verdict (reviewer on Opus 5.5, 2026-09-25; brief units/j-motion-proofs-b-audit-reviewer-brief.md)

**Lane held: subjective (design fit).** I ran as `reviewer` on Opus 5.5 and read the diffs, the patches, the worktree at `fd82ae9`, and the replay log.

The work mostly fits the design. It fails on two narrow points: one pin E32 forbids, and one guide row that is false for `animated: false`. There is also one duplication defect outside the claims. It needs a carrier unit, but it does not fail a claim.

## Per-claim verdicts

| Claim | Verdict | Evidence at `fd82ae9` |
|---|---|---|
| **1. No owned proof pins a motion value** | **FAIL** | No case asserts a duration, an easing, or a property list. Every declared duration a case reads comes through `readDuration`. The Tab link pin is gone (`Tab.test.ts:47-70`). **But** `Toast.test.ts:277` asserts `expect(animation).toBeInstanceOf(CSSTransition)` on every recorded motion. That pins the kind of motion the cascade ships. E32 says a proof works "against whatever motion that cascade ships". A keyframe entry from the styles session would redden this line with no engine defect. The line adds nothing to the proof, because line 275 already reads the out and in phases and the settled counts. |
| **2. Each completion proof reads the rendered motion** | CONFIRMED | Each case reads the three things the claim names: motion was read, nothing is unfinished, nothing is running. Sites: Toast (`Toast.test.ts:86-145`, `244-281`), Collapse (`Collapse.test.ts:400`), Tab (`Tab.test.ts:402-470`), Carousel (`Carousel.test.ts:341`, `382`, `431`, `480`, `524`, `573`). **Qualification:** the claim's sentence about a `MutationObserver` covers Toast, Collapse, and Tab only. Carousel reads the animations when the call returns (comment at `Carousel.test.ts:337-340`). That shape is correct: every write that starts motion in `Carousel.ts:482-526` runs synchronously before its only await (`Carousel.ts:531`). Any motion the completion writes start is caught by the running count. **Mutations that kill each proof:** (1) Removing the fade-in settle (`Toast.ts:225-228`, rows `toast-fadein-yield` and `-skip`) turns Toast's `shown` reading into `[false, 1]`. The assertion tells this apart from the pass (replay:110-115). (2) `toast-hide-yield` counts the cancelled fade out as unfinished (replay:122-128). (3) `toast-show-yield` kills the show-of-shown proof by assertion (replay:116-121). (4) `collapse-show-yield` and `-hide-yield` both change the tuple (replay:129-139). (5) `tab-yield` does the same for Tab (replay:140-145). (6) `r2-carousel-incoming` gives `[1, 0]`, `-outgoing` gives `[1, 1]`, and `-yield` gives `[2, 1]` (replay:153-180). Every row fails by `AssertionError`. |
| **7. The unit's rulings hold under E32** | CONFIRMED | **Feedback ruling:** ruling that the Tab control and carousel indicator transitions are feedback fits the design. Bootstrap waits only on the pane and the item, and E32's amendment gives the same reason for Button. The amendment's text names only Button and ScrollSpy, so the Orchestrator needs to record this extension (see referrals). **Kept control readings:** a toast without `fade` (`Toast.test.ts:67`, `73`) and a plain pane (`Tab.test.ts:69`) read `readDuration` of 0. These are the right shape. The engine only waits when a token is present (`Toast.ts:216`, `225`, `259`; `Tab.ts:279-287`), so these readings check the engine–cascade contract the guide states (`guides/veneer.md:2423`). They are not styles-session values. They are also the controls that prove the positive readings can fail, as `tests.md` § Probes requires. **Collapse:** `cascade` at `Collapse.test.ts:25` is two shipped partial imports, not a copy. |
| **9. The prose is true** | **FAIL** | The § Toast `shown` row at `guides/veneer.md:2485` reads "After the fade in the `transition` token's removal starts". That is false for `animated: false`: no settle runs (`Toast.ts:225`), and the event follows the token's removal directly. The row it replaced, "After the `transition` token leaves", was true in both modes. The other prose holds: `guides/veneer.md:2411-2429`, `2489-2503`, `2551-2558`, `1858-1863`, and `2090`; the `@returns` remarks at `types.ts:2249` and `2259`; the `slid` summary at `types.ts:2293`; the class remarks at `Toast.ts:34-51` and `Carousel.ts:58-62`; and both showcase changes to `EngineSection.test.ts`. |
| **10. Scope** | CONFIRMED | Round 1 status lists `Toast.ts` and the four tests. Round 2 status lists the guide, `Carousel.ts`, and `Carousel.test.ts`. The integration logs show the patches brought in `types.ts`, `guides/veneer.md`, and `EngineSection.test.ts` (`-integration-1.log.txt:3-5`, `-integration-2.log.txt:5-6`). Each old pin was deleted outright, with no alias or fallback. |

## Required changes

1. **`tests/src/browser/Toast.test.ts:277`** (claim 1)
   - **Wrong:** the case asserts `toBeInstanceOf(CSSTransition)`, which pins the kind of motion the cascade ships.
   - **Why it matters:** it breaks E32's rule that a proof works against whatever motion the cascade ships.
   - **Right:** delete the line. Line 278 already reads a positive duration on every recorded motion.

2. **`guides/veneer.md:2485`** (claim 9)
   - **Wrong:** the row is false for `animated: false`. It also drops the helper word "that" (`writing.md` § Sentence and paragraph order), so "the fade in the `transition` token's removal" misreads on first pass.
   - **Right:** "After the `transition` token leaves; when `animated` is `true`, after the fade in that its removal starts finishes".

## Design-fit defects outside the claims

1. **The watcher and its reading are copied inline where `tests/setupBrowser.ts` should own them** (`tests.md` § Shared test infrastructure).
   - **What repeats:** the observer–`getAnimations`–recorder watcher is at `Toast.test.ts:96-100` and `251-256`, `Collapse.test.ts:407`, `Tab.test.ts:424-430`, and J-MOTION-PROOFS-A's `Modal.test.ts:~285`.
   - The completion tuple (read, unfinished, running) is written once per event handler: `Toast.test.ts:104-117`, `Tab.test.ts:434-454`, six identical copies in `Carousel.test.ts`, and the factor cases at `Toast.test.ts:175/187` and `Tab.test.ts:511/522`.
   - The `playState !== 'finished'` filter appears 29 times across 8 files.
   - The end-time comparison block is copied four times in `Carousel.test.ts` (in the cases at `382`, `431`, `524`, and `573`).
   - **Where it belongs:** one motion recorder in `tests/setupBrowser.ts`, beside `readDuration`, proved in `tests/setupBrowser.test.ts`. It needs:
     - construction over the elements and the attribute filter;
     - a direct add, for Carousel's read at call return;
     - a read that returns the three facts;
     - a clear.

     A pure end-time leaf goes beside it.
   - **Carrier:** the unit must own `setupBrowser.ts`, its test, and all eight motion test files. Run it before J-MOTION-PROOFS-C adds Tooltip and Popover copies, serialized with the J-RELEASE units that own these files.

2. **The same reading has two names** (`AGENTS.md`: one concept, one term).
   - `Toast.test.ts:157-159` and `Tab.test.ts:493-495` call the duration read under the shipped cascade `released` and "the release's factor".
   - `Carousel.test.ts:393` calls the same reading `shipped`.
   - "Release" also names E35's `Lifetime.release`.
   - **Fix:** rename to `shipped` and "the shipped factor".
   - The comment "the ratio of the two readings is the factor" holds only because the shipped `--vn-factor-motion` is 1. Load `:root { --vn-factor-motion: 1 }` before the first read, so the case sets both factors itself.

3. **Dropped helper word "that", which causes a first-read failure** (`writing.md` § Sentence and paragraph order):
   - `Toast.ts:37` and `guides/veneer.md:2413`: "the fade in that removal starts" → "the fade in that the removal starts".
   - `Toast.test.ts:243`: "the fade in its removal starts" → "the fade in that its removal starts".
   - `Toast.test.ts:285`, test title: "a show whose fade in a hide takes over" → "a show that a hide takes over during its fade in".
   - `Carousel.ts:59-60`: "…to both items, when the host carries the `slide` token waits…" → "…to both items, then, when the host carries the `slide` token, waits…".
   - Following the campaign's implementation-over-prose practice, fold these into the next unit that owns these files.

## Referrals (to the objective lane)

1. **`animated: false` with markup `fade`:** when the toast's markup already carries `fade` and `animated` is `false`, removing `showing` starts a fade in the engine does not wait for (`Toast.ts:225`). Does `shown` fire while it runs, and does E32's completion bullet bind that path?
2. **Missed motions within one synchronous batch:** the observer callback runs after each batch of writes, not after each write. Can a motion that starts at a forced layout read mid-sequence and is cancelled later in the same stretch go unrecorded? The candidates are the reads at `Carousel.ts:482` and in `Collapse` and `Toast`.
3. **Feedback ruling (to the Orchestrator):** record the Tab control and carousel indicator feedback ruling as an E32 amendment. The amendment's text names only Button and ScrollSpy, while Tab and Carousel are on its binding list.

VERDICT: FAIL 1 9
