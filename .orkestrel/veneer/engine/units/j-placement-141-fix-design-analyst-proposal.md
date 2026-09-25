# J-PLACEMENT-141-FIX-DESIGN — the objective lane's proposal (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d7a9-8792-7d80-a9e4-de7fe55dc37e`, journal `tmp/codex/j-placement-141-fix-design-analyst.jsonl` (swept at acceptance). The brief is `units/j-placement-141-fix-design-brief.md`. The lane's final message follows verbatim.

## 1. The ruling

**Choose a third: an explicit, synchronous form of B, enabled by Dropdown.**

Add `PlacementOptions.deferred?: boolean`, defaulting to `false`. With it enabled, Placement promotes the element as today, but retains its positioning work while the element has no rendered box. The first eligible `update()` installs the anchor declarations synchronously. Dropdown enables this option and uses its existing final `placement.update()`.

This is a proposal requiring the Chromium 141 proof, not an established fix.

The evidence at Veneer `d33b27c` is:

- [Dropdown.ts:273](C:/Users/mikes/WebstormProjects/veneer/src/browser/Dropdown.ts:273) constructs Placement before the menu token write at line 291. Its existing update at line 299 runs after the menu and toggle tokens.
- [Placement.ts:130](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:130) promotes the element, then installs positioning declarations at line 166 regardless of whether it renders.
- [Placement.ts:196](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:196) checks visibility only when measuring the side. Its current `update()` writes the side and arrow; it cannot initialize deferred anchoring.
- [Placement.test.ts:426](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Placement.test.ts:426) expects ordinary Placement construction to have established anchoring before a hidden element renders and before `update()`. Preserve that contract through the default behavior.

**Reject A under the brief’s full parity requirement.** Bootstrap focuses the toggle and writes `aria-expanded` before adding the menu token. Moving that token before placement also moves it before focus and ARIA, changing what synchronous listeners observe. This follows directly from the installed [Bootstrap dropdown.js:151](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/dropdown.js:151). An unchanged lifecycle-event recording would not establish parity at those intermediate boundaries.

The proposed option has a concrete consumer and preserves existing Placement callers. It introduces no timer, frame wait, rendering observer, browser-version branch, or forced `display` value.

## 2. The exact order of writes and takes

Keep Dropdown’s current observable order. The following names refer to its mechanisms at `d33b27c`; the implementation must use the E35 equivalents after their adoption.

| Operation | Door and record |
|---|---|
| Refuse an unavailable show. Dispatch cancelable `show`. | Keep `#refused(true, true)`, the captured `prior` identity, prevention handling, then `#halted(prior, true)`. |
| Establish the change. | Set `#changing`, create and retain `change`, and read the initial expectation: `true` if the host already supplied the menu token, otherwise `undefined`. |
| Release a replaced Placement. | Keep the replacement holding until its release returns under E35. Follow release with `#holds(change, expected)`. |
| Construct Placement with deferred anchoring enabled. | Enroll the child before construction can run consumer code. Preserve promotion refusal, destruction, and the post-construction ownership door. |
| Focus the toggle. | Keep `#apply(change, expected, () => host.focus())`. A failed door enters the existing returning step. Focus receives no invented write-back record. |
| Write `aria-expanded="true"`. | Retain its call-local `HostWrite`, recorded before the first changing write, and its lifetime snapshot record. Follow with `#holds(change, expected)`. |
| Add the menu’s resolved `shown` token, unless already present. | Keep the token step’s `#apply(change, true, …)`. From this step onward, the expectation is `true`. Its lifetime record precedes the changing write; the takeover return must not re-add a token the host removed. |
| Add the toggle’s `shown` token. | Retain its call-local `HostWrite` and lifetime record. Follow with `#holds(change, true)`. |
| Call `placement.update()` synchronously. | Keep `#apply(change, true, …)`. When positioning remains pending, read rendering and force layout before installing anchor declarations. Follow consumer-running positioning writes with the applicable lifetime and owner door. |
| Complete. | Clear `#changing`, dispatch noncancelable `shown`, and return the existing lifetime result. Keep the identity-guarded `finally`. |

Placement must resolve and copy its positioning inputs before its first write, as its constructor currently requires. A retained positioning plan must not retain deferred reads of consumer getters.

Promotion and cascade compensation remain at construction. If the element already renders—including the probe’s `display` variant—position it immediately. Otherwise retain the positioning work beginning at [Placement.ts:166](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:166): fixed positioning, automatic insets, offset margins, anchor binding, area, fallbacks, ordering, and the reference’s anchor-name contribution.

Each actual deferred write takes its snapshot record immediately before changing its target. The final update then measures the side and positions any arrow as today.

Thread the call’s ownership predicate into Placement. Its deferred activation must use the expectation the show has reached, rather than a construction-time copy that remains `undefined`. Document this extension to `owned`; preserve the existing callback behavior for ordinary construction.

The returning step retains:

- `rewindHostWrites(written, () => #owns(change))`;
- reverse return of the changed toggle targets;
- release of the held Placement;
- identity checks that protect a nested replacement show.

Do not replay call-local `HostWrite` records during destruction. The existing separation is visible in [Dropdown.ts:395](C:/Users/mikes/WebstormProjects/veneer/src/browser/Dropdown.ts:395) and [helpers.ts:950](C:/Users/mikes/WebstormProjects/veneer/src/browser/helpers.ts:950).

## 3. What it keeps and what it risks

**Bootstrap parity.** Preserve focus → ARIA → menu token → toggle token → `shown`, prevention, event details, dismissal, and synchronous completion. Promotion refusal still happens before focus or host-state writes. Preserve the corresponding [refusal proof](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Dropdown.test.ts:1859).

Run `recordPluginOracle` against Bootstrap and Veneer. Add observations made *inside* focus and ARIA reactions: the recorder currently collects settled states after actions, so its existing comparisons do not independently prove those intermediate states. See [setupServer.ts:5697](C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.ts:5697).

**E24.** The menu token step stays where it is, preserving the existing agreement and takeover boundaries. The new risk is deferred positioning continuing after a reaction removes that token. Its owner door and red-first reaction proofs must close that interval. Keep prior-value records, no-op exclusions, reverse returns, and nested-call identity protection.

**E35.** Land after the applicable release work. Placement must join the owner’s lifetime before consumer code, and its promotion holding must exist before `showPopover()`. Registering the returned instance afterward is insufficient. Pending positioning is unapplied work, not a resource to release. Destruction cancels it and drains only recorded acquisitions and writes. Preserve the OPEN-ABORT and nested-release requirements in [decisions.md:429](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:429), including the [amendment](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:494).

**E32.** `update()` completes in the show’s current stack. `shown` waits for no motion, frame, observer, or promise continuation.

**Chromium 153.** Preserve the recorded geometry, movement, hit testing, lifecycle, and controls. The [153 summary](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-placement-141-probe-153-orchestrator.log.txt:646) excludes `missingAnchor` from successful anchoring; that negative control must continue to fail anchoring.

**Principal risk:** the existing evidence does not separate hidden promotion from hidden anchor installation. Deferring anchor writes may be insufficient on 141. The first probe must decide that before implementation proceeds.

## 4. The unit

Propose **J-PLACEMENT-141-FIX**, serialized after J-RELEASE-RECORD and J-RELEASE-POPUPS. J-RELEASE-CORE can finish independently. Reconcile the implementation against their landed contracts rather than transplanting the old `#save` and release machinery.

Owned files:

- `src/browser/Dropdown.ts`
- `src/browser/Placement.ts`
- `src/browser/types.ts`
- `src/browser/constants.ts`
- `tests/src/browser/Dropdown.test.ts`
- `tests/src/browser/Placement.test.ts`
- `tests/conformance.test.ts`
- `guides/veneer.md`
- A separately retained fix probe and receipts under the engine’s `units/` directory.

Define the option, pending-positioning data, update semantics, and ownership-callback semantics in `types.ts` first.

**Run first:** a probe preserving `baseline` preparation exactly, with only anchor installation deferred until the menu renders. Promotion remains before the token. Run it on Chromium 153 and have the styles session run the same instrument on Chromium 141. Reject this design if 141 still loses anchoring.

The binding proofs are:

- A `Dropdown.test.ts` case under the shipped cascade, with the menu inside a scroller and a trusted pre-show click. Read the actual menu-to-reference gap, alignment, movement after scrolling, and restoration. Use the probe’s `2px` gap and `0.5px` tolerance.
- In that case, record that the menu has a rendered box before the first anchor-binding write. This ordering assertion can run red on Chromium 153; the gap assertion alone should already pass there. Do not claim a 153 geometry failure that the evidence does not show.
- The styles session’s Chromium 141 `baseline`: red before the change, green afterward, under `candidate` and `always`, with full clipping, partial clipping, and restoration.
- Destruction and reversal inside promotion, deferred positioning, side-attribute writes, and returning steps; promotion prevention; same-direction agreement; nested replacement; static/navbar placement; and restoration of authored values and priorities.
- Oracle comparisons and synchronous-listener observations, plus the existing ordinary-Placement hidden-element proof.

**Correct the fix instrument’s assertions.** Preserve the historical diagnosis probe. Its `ROUND3['141']` expects `[2, 2, 2]`, and variant failures are printed rather than asserted. A successful repair would fail that historical reproduction control. The fix instrument must assert successful `baseline` geometry while retaining the hit-test and `missingAnchor` controls. See [probe:670](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-placement-141-probe.test.ts:670) and [probe:715](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-placement-141-probe.test.ts:715).

**Keep J-ORACLE-FIX-PLACEMENT separate and adjacent.** Full placement serialization is an independent contract change: the current attribute and public `side` getter deliberately carry `PlacementSide`. Correcting `bottom` to `bottom-start` also requires alignment and fallback proofs. It is not necessary to test initialization timing. Preserve that known census difference explicitly until its unit closes; do not weaken the Bootstrap fixture. The finding remains governed by [the census ruling](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-census-0925.md:13).

## 5. What I could not settle

- **Whether deferred anchoring alone repairs 141.** The successful `display` variant sets `display: block` **and reads `offsetWidth` before promotion**. It does not prove that an early token alone works, or that rendering only before anchor installation works. The first probe above settles the proposed mechanism.
- **Why the trusted press matters.** A plausible hypothesis is that pointer-induced focus or scrolling state interacts with hidden-element anchor initialization. `entryFocus` does not isolate that: it focuses an entry after showing. A follow-up probe should independently vary programmatic focus before show, cancellation of pointer-down’s default focus, keyboard focus, and trusted activation away from the toggle, recording focus, scroll offsets, and geometry. The design does not depend on this hypothesis.
- **The brief’s evidence paths need qualification.** The retained 141 log resolves under `scaffold/.orkestrel/veneer/units/native141/`, outside `engine/units/`. The applicable guide resolves in the Veneer checkout.
- **“Every variant anchors on 153” excludes the negative control.** `missingAnchor` intentionally does not anchor.
- **No proposed behavior was measured in this round.** I read the source at `d33b27c` and the supplied receipts, changed no files, and ran no new measurements. The proposed unit’s native proofs determine acceptance.