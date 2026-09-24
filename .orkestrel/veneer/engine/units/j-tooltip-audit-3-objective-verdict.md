# J-TOOLTIP audit round 3 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d3b5-7b0b-7d00-88e7-8ea9cb4d5ed3`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tooltip-audit-3.jsonl` (launch copy under `tmp/codex/`); 61 commands; 554 s; usage {"input_tokens":2835864,"cached_input_tokens":2629248,"cache_write_input_tokens":0,"output_tokens":15845,"reasoning_output_tokens":7901}. Retained verbatim from the exec's last message.

---

Objective lane. This is a source review against the supplied execution records; the new interleavings below were derived, not executed.

1. **BROKEN — The build’s final return and hide’s teardown still admit unchecked writes.**

   **Build counterexample:** Show custom-element content A through `title: () => current`. After showing, change `current` to B and arm A’s `connectedCallback` to destroy the tooltip when A returns home. Call `show()` again. The rebuilt tip receives B, then `#build`’s final `#release` returns A and runs its destruction reaction. Nevertheless, `#build` returns the new tip. `show` publishes it and writes its id into `aria-describedby` before discovering the destroyed lifetime. The result is `false`, but the restored trigger now references a detached tip ([Tooltip.ts:447](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:447), `:451`, `:320`, `:322`, `:323`). The reaction runs before `insertBefore` returns under the platform’s [custom-element reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions).

   **Hide neighbour:** After showing, attach a closing `beforetoggle` listener that moves the tip into another connected container. Call `hide()`. Its container checks pass before teardown. `#discard` then calls `Placement.destroy()`, whose `hidePopover()` dispatches that listener, and subsequently removes the relocated tip without another container read (`Tooltip.ts:624`, `:544`, `:551`, `:552`; `Placement.ts:224`). The [popover hide algorithm](https://html.spec.whatwg.org/multipage/popover.html#hide-popover-algorithm) supplies this synchronous dispatch.

   Smallest correction: check the build’s identity and lifetime after its final release and before publishing/linking the tip; retain the expected container through teardown and check it after placement destruction, before removal. Preserve required content restoration.

   The original attacks now hold: second-call destruction prevents the move, and relocation during the hide wait prevents removal. Their assertions distinguish the retained mutations (`Tooltip.test.ts:1258`, `:1287`; `j-tooltip-mutations-3.log.txt:5`, `:6`). The observer assertion genuinely strengthens the build proof: the earlier version missed that mutation (`j-tooltip-mutations-3-first.log.txt:5`).

2. **CONFIRMED — Origin publication and overlapping-slot restoration close the original failures.**

   Attacked destruction inside the content’s disconnection reaction, overlapping selectors, destruction while returning the displaced occupant, and an element subsequently moved externally. The record exists before `replaceChildren`; destruction therefore finds the inserted element. Displacing an occupant releases it before recording or moving its replacement, and the intervening lifetime check prevents the replacement move after destruction. An externally relocated element fails the recorded-slot comparison and stays untouched ([Tooltip.ts:465](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:465), `:469`, `:477`, `:502`).

   The red-first cases distinguish omitted recording and omitted occupant release (`Tooltip.test.ts:1310`, `:1342`; `j-tooltip-round3-red.log.txt:133`, `:161`; mutation log `:7`, `:8`). The `JOINED` recording row binds **record omission**: its mutation deletes recording altogether (`j-tooltip-mutations-3.py:71`). It does not independently isolate publication timing. A timing-specific control would capture the origin before moving, publish it afterward, and assert restoration immediately after the nested `destroy()` returns. The current final-state assertions alone can be satisfied by the stopped-build cleanup.

3. **CONFIRMED — Destroyed `fill` refuses, and re-promotion is bounded.**

   Repeated the returned-element destruction attack at `fill`: the new lifetime read precedes the hidden-tip `true` result ([Tooltip.ts:374](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:374)). Removing that read makes the named assertion fail (`Tooltip.test.ts:1400`; mutation log `:9`).

   Attacked mutually preventing tooltip listeners and another platform close of the same re-promoted tip. `#promoted` selects forced concealment on that subsequent close; the hide event still dispatches, but its prevention no longer stops concealment (`Tooltip.ts:590`, `:596`, `:611`). The settling assertion distinguishes disabling that branch (`Tooltip.test.ts:1431`; mutation log `:42`). The original red readings are retained at `j-tooltip-round3-red.log.txt:182` and `:201`.

   The hint paragraph and departure state the bound (`guides/veneer.md:2375`, `:2518`). An ordinary explicit `hide()` remains vetoable because it calls `#conceal(false)`; that adjacent behaviour is correct.

4. **CONFIRMED — Descendant refusal and ownership are contained.**

   Attacked repeated interactions with an invalid descendant, a consumer-owned descendant with different triggers, nested Tooltip containers, and destruction during descendant construction. The failed-descendant set suppresses subsequent construction attempts; the owned set prevents the outer container from driving an existing tooltip it did not construct. A descendant constructed during parent destruction receives the already-aborted lifetime and destroys itself ([Tooltip.ts:658](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:658), `:660`, `:666`, `:673`, `:265`).

   Rethrowing the construction error and returning every existing owner distinguish the named red-first proofs (`Tooltip.test.ts:1438`, `:1464`; mutation log `:53`, `:54`; red log `:214`, `:267`). The repeated-invalid-input case does not independently prove memoization: omitting `#failed.add` would still contain each attempt.

   There is no Tooltip route in `Delegate.#activate`, its conflict population, or its route-mark union (`Delegate.ts:467`, `:504`, `:913`). Nested or destroyed Delegates therefore neither construct nor mark Tooltip. E12’s same-host refusal remains scoped to the routes present inside each Delegate; it supplies no Tooltip interaction mark. Nested Tooltip containers instead resolve ownership through `#owned`.

5. **CONFIRMED — The arrow uses the reference centre.**

   Attacked start/end alignment, the horizontal-side analogue, displacement beyond either end of the edge, and an arrow larger than the available edge. The calculation subtracts the tip’s padding-edge origin and half the arrow size from the reference centre, then clamps against a nonnegative limit. The side write precedes measurement, the cross-axis declaration is cleared, and subsequent style writes refuse an aborted placement ([Placement.ts:192](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Placement.ts:192), `:200`, `:206`, `:213`, `:260`).

   Replacing reference-centre positioning with tip-centre positioning distinguishes the start/end proof (`Tooltip.test.ts:1486`; red log `:286`; mutation log `:45`). Static-position and wrong-axis mutations remain distinguished by the cardinal-side assertions (mutation log `:43`, `:44`). Invalid-arrow refusal has its own assertion and retained mutation (`Placement.test.ts:348`; mutation log `:36`).

   The contract and Surface descriptions agree. Dropdown supplies no arrow and its suite is unchanged. Clamping can intentionally prevent exact centre alignment when the reference centre lies outside the available edge.

6. **BROKEN — The global-`href` mutation does not bind the claimed permission broadening.**

   The mutation adds global `href` while retaining `href` in the `a` element’s local attributes (`j-tooltip-mutations-3.py:97`; `constants.ts:540`). Its retained failure is **`TypeError: Invalid Sanitizer configuration.`**, before the per-element output assertion executes (`j-tooltip-mutations-3.log.txt:17`; [NativeSanitizer.test.ts:161](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/tests/src/browser/sanitizers/NativeSanitizer.test.ts:161)). That row measures configuration rejection; it does not demonstrate an admitted `href` leaking onto `span`.

   Smallest correction: move `href` from the local allowance into the global allowance, producing a valid broadened configuration, and retain the failure at the output assertion.

   The original missing sanitizer assertions are now present: omitted versus empty configuration, independent WAI-ARIA membership, forbidden element/attribute pairings, supplied configuration, URL handling, and unsupported-target refusal (`NativeSanitizer.test.ts:111`, `:131`, `:140`, `:149`, `:159`, `:170`). The `{}`, ARIA-deletion, data-attribute, and unsupported-refusal mutations distinguish their respective assertions (mutation log `:16`, `:18`–`:20`). This finding does not identify a defect in the passing sanitizer implementation.

   The hostile fallback iterator is now contained. Throwing index or iterator accessors also remain inside the same `try` (`parsers.ts:335`). Rethrowing the caught error distinguishes the original hostile-array proof; skipping an invalid member, refusing placements, filling only one delay, and changing trigger-word mapping distinguish the neighbouring parser assertions (`parsers.test.ts:229`, `:255`, `:274`, `:308`; mutation log `:69`, `:71`–`:74`). Those parser repairs hold.

7. **BROKEN — The vocabulary case cannot distinguish the modal replacement.**

   Its modal ancestor carries **both** `x-modal` and `modal` (`Tooltip.test.ts:1514`). Changing the constructor lookup from `this.#classes.modal` to `TOOLTIP_CLASSES.modal` therefore selects the same ancestor and preserves the case’s hide assertion ([Tooltip.ts:261](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:261); `Tooltip.test.ts:1578`). The retained class mutation changes only build-time tokens, so it does not close this gap (`j-tooltip-mutations-3.py:185`).

   The claim that every default attribute receives an invalid value is also contradicted by the fixture: `data-bs-title="Wrong"`, the alternate template, and `data-bs-custom-class="wrong"` are valid strings; the descendant group’s default selector `.tip` is valid (`Tooltip.test.ts:1522`, `:1523`, `:1527`). Reading those names need not throw.

   Smallest correction: give the effective modal ancestor only `x-modal`, place a distinct default-modal decoy where appropriate, and distinguish their hide events. Describe the string values as conflicting values, rather than invalid coercions.

   The existing mutations genuinely distinguish build-token replacement and arrow-selector replacement (mutation log `:55`, `:56`). The boolean, readonly origin fields, renames, position-key derivation, requested return wording, descendant-title default, and Bootstrap toggle departure match the source (`Tooltip.ts:133`, `:138`; `types.ts:1591`, `:1640`, `:1693`; `guides/veneer.md:2520`; Bootstrap `tooltip.js:158`).

8. **BROKEN — The guide still promises door checks the sequence does not perform.**

   The “after each” guarantee and the container check “from the insertion on” remain false (`guides/veneer.md:2479`, `:2483`). Claim 1 supplies destructive counterexamples. The remaining door trace is:

   | Door | Source result |
   |---|---|
   | Content-presence callbacks | `#filled` checks the overall result, not lifetime after each callback. A callback that destroys and returns empty allows the next callback to run (`Tooltip.ts:410`). |
   | Pre-show dispatch and old-tip discard | Identity/lifetime checks follow the dispatch and completed discard; discard’s internal writes remain unchecked (`:311`, `:315`, `:544`). |
   | Template, tokens, id | A check follows `buildTip`; token/id writes share one later check (`:431`, `:434`, `:438`). |
   | Build callbacks and slot moves | Checks now surround occupancy and follow the move; final release has no subsequent check (`:440`, `:465`, `:478`, `:447`). |
   | ARIA link, append, inserted dispatch | Identity/lifetime checks follow each; append and inserted also check the container (`:322`, `:324`, `:326`). |
   | Promotion | Only identity/lifetime are checked before adding `shown`. An opening `beforetoggle` listener can relocate the connected tip, after which the call still adds `shown` before detecting the container mismatch (`:328`, `:334`, `:336`). |
   | Shown-token write and show wait | Identity, lifetime, token and container are checked through `shown` (`:337`, `:340`). |
   | Hide dispatch, token removal and wait | The repaired checks hold; placement teardown and subsequent removal remain the unchecked interval (`:613`, `:619`, `:622`, `:624`). |
   | Completed events | Identity is deliberately released before dispatch, admitting completed-event re-entry (`:342`, `:626`). |

   Smallest correction: close the identified intervals and make the guide describe the actual checks. The E13 nested-snapshot bound is now stated correctly (`guides/veneer.md:2493`; `decisions.md:79`), and `HostSnapshot.ts` is unchanged. That bound does not excuse publishing a new tip after destruction or removing a relocated tip.

   The previously unbound proof populations now have relevant controls:

   | Population | Distinguishing control and evidence |
   |---|---|
   | Options and construction | Omit constructor placement; accept invalid descendants (`Tooltip.test.ts:367`, `:990`; mutation log `:27`, `:28`). |
   | UA parity and placement | Omit compensation, offset, or update forwarding (`Tooltip.test.ts:243`, `:689`, `:697`; log `:29`–`:31`). |
   | Hide and promotion refusals | Proceed after prevention, dispatch on hidden state, omit refused-promotion cleanup, or propagate its rejection (`Tooltip.test.ts:594`, `:602`, `:983`; log `:32`–`:35`). |
   | Timing | Remove show or hide waiting; the transition-presence and completion-order assertions distinguish them (`Tooltip.test.ts:275`, `:281`, `:286`; log `:50`, `:51`). |
   | Helpers | Omit detachment/refusal/removal/function invocation, copy instead of move, or invert writer selection (`helpers.test.ts:735`, `:753`, `:777`, `:816`; log `:58`–`:63`). |
   | Guards and parsers | Remove containment or shape checks; change admitted values and coercions (`validators.test.ts:535`, `:548`, `:572`, `:584`; parser cases identified above; log `:64`–`:74`). |
   | Exports | Omit the Tooltip barrel export (`index.test.ts`; log `:75`). |

   These whole-file rows bind the assertions identified above, not every assertion in every joined case. Runtime rejection is meaningful for an exception-containment or resolve-false contract; the invalid sanitizer configuration in claim 6 fails before exercising its intended boundary. The recording-order limitation in claim 2 also remains.

   The retained green rows, digest equality, and `receipt: restored byte for byte` are present (`j-tooltip-mutations-3.log.txt:76`–`:84`). The supplied Orchestrator log records the established gate exits (`j-tooltip-gates-3.log.txt:22`, `:37`, `:40`, `:47`, `:92`, `:105`, `:118`). The status and source diff remain within the listed files. **The independent Orchestrator mutation replay clause is UNRESOLVED**, as the brief requires; its later execution record settles that clause.

**Findings fitting no claim**

- **O1 — The hide-event contract contradicts forced platform concealment.** `TooltipEventMap.hide` states that prevention refuses the hide, and the guide’s event table repeats that guarantee (`types.ts:1510`; `guides/veneer.md:2474`). The second platform-close case explicitly prevents every hide yet reaches `hidden`, as E17 now requires (`Tooltip.ts:591`, `:611`; `Tooltip.test.ts:1416`, `:1435`). Amend the event declaration and table with the same-tip re-promotion exception. Keep the ordinary public `hide()` veto guarantee.

**Attacked and held**

Disabled hiding still agrees with Bootstrap `tooltip.js:242`. Removing `shown` during a show wait, or restoring it during a hide wait, stops that pending sequence. A settled show rebuilding without `hidden` and completed-event re-entry remain intentional. External content moves remain untouched. None of those behaviours closes the unchecked build-finalization, promotion, or teardown doors.

**Referrals**

The Orchestrator should reproduce the final-release destruction, teardown relocation, and promotion relocation controls; run a valid global-`href` broadening control; and separate the modal vocabularies in the fixture. Carry O1 into the contract correction. The recurring door defect has reached round 3: apply the falsification law’s strategy switch across build, occupancy, release, discard, and placement before another local repair, while retaining E13’s separate snapshot scope.

**Bounds**

No files were written, agents spawned, browser tests run, builds run, or mutations executed. Established gates were not rerun. No `prove` call was made; there is no refused-call receipt. The named `j-w2-terrain-record.md` is absent; the sanitizer wildcard record is at `j-engine-terrain-record.md:145`. New behavioural findings require Orchestrator reproduction.

VERDICT: FAIL 1, 6, 7, 8; outside the claims: O1
