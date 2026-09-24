# J-TOOLTIP audit round 4 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d423-3601-7b10-929b-c1a3a20708bb`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tooltip-audit-4.jsonl` (launch copy under `tmp/codex/`); 55 commands; 528 s; usage {"input_tokens":2504546,"cached_input_tokens":2295424,"cache_write_input_tokens":0,"output_tokens":13788,"reasoning_output_tokens":4963}. Retained verbatim from the exec's last message.

---

OBJECTIVE lane — source-derived audit, with retained browser observations identified separately.

1. **BROKEN — The predicate is implemented as specified, but an existing tip escapes its checks during a rebuild.**

   `#apply` and `#holds` have the claimed implementation ([Tooltip.ts:447](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:447)). The semantic counterexample is a settled, shown tooltip followed by another `show()`: install a one-shot `show.vn.tooltip` listener that moves the existing tip into another connected container.

   **Source-derived result:** the dispatch uses `#apply(change, undefined, …)`, so the parent mismatch passes. The following discard leaves the relocated node, ignores its false removal report, and the call builds, links, promotes, and announces a replacement tip. With `animated: false` and no further intervention, it returns true. A listener moved the published tip during this call, yet the call continued writing and dispatching (`Tooltip.ts:329`, `:338`, `:344`, `:364`, `:624`).

   The token variant also escapes: remove the existing tip’s `shown` token during that dispatch; the undefined predicate permits removal and replacement.

   **Smallest correction:** preserve and check the existing tip’s expected state across the rebuild’s pre-show dispatch, and stop the rebuild when its old-tip discard reports takeover. This requires correcting the ruling’s treatment of that interval: an existing published tip is present there.

2. **CONFIRMED — The build and origin-record sequence withstand the specified attacks.**

   I tried sharing one element across slot values, returning an element already held by another slot, omitting matching slots from the sanitized template, and rebuilding while earlier content remained in a detached tip. The origin record preserves the original parent and sibling; occupancy updates its slot; the final release returns records the candidate no longer holds. Reentrant `show()` and `fill()` during the build refuse before replacing its content (`Tooltip.ts:390`, `:423`, `:470`, `:529`, `:576`; [helpers.ts:457](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/helpers.ts:457)).

   The proof bindings are:

   | Proof | Distinguishing mutation and assertion |
   |---|---|
   | P1 final-release destruction | Bypass the final-release **and listener-binding** doors. The candidate is appended after destruction; `Tooltip.test.ts:1660` detects it. `j-tooltip-mutations-4.log.txt:10` records `EXACT`. This binds the combined mutation, not omission of the release door alone. |
   | P6 content before movement | Resolve each function beside its move. The first element’s observer records transient movement; `Tooltip.test.ts:1849` distinguishes it. Log `:16`, `EXACT`. |
   | Destruction during content resolution | Remove the read after the function. The later function runs; `Tooltip.test.ts:1292` distinguishes it. Log `:7`, `EXACT`. |
   | Throwing function and sanitizer | Delete catch cleanup. The sanitizer branch strands `other`; `Tooltip.test.ts:1930` distinguishes it. Log `:19`, `EXACT`. The throwing-function branch’s final-parent assertion alone does not distinguish “never moved” from “moved and returned”; content-first ordering is additionally established by source and P6. |
   | Custom-tip token writes | Bypass normalization, token-add, or fade-add doors. The late-write recorder at `Tooltip.test.ts:2005` distinguishes each; log `:21`, `:22`, `:23`, `EXACT`. |
   | Custom-tip id write | Bypass only the id door. The supplied destruction case reaches occupancy’s release door with no remaining origins, which stops before content is written. Log `:24`, `MISSED`, is correctly reported as indistinguishable for this case. It is not evidence that the id write is unreachable. |

   These assertions are present in [Tooltip.test.ts:1625](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/tests/src/browser/Tooltip.test.ts:1625). An unmatched selector legitimately produces no content write. Cleanup legitimately continues returning still-owned content after destruction.

3. **BROKEN — Promotion still positions a tip after its relocation.**

   **Retained browser observation:** the opening `beforetoggle` listener moves the tip into `elsewhere`; `show()` resolves false, but the tip remains `:popover-open`, with `position: fixed`, `position-anchor`, `position-area`, margins, and `data-popper-placement`. The trigger retains its generated anchor and ARIA link until destruction ([j-tooltip-probe-promotion.log.txt:22](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-probe-promotion.log.txt:22)).

   The source explains this result: after `showPopover()`, Placement reads destruction, not Tooltip ownership, then writes compensation, positioning, the reference anchor, side, and arrow. Tooltip reads the parent mismatch only after construction returns ([Placement.ts:114](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Placement.ts:114), `:121`, `:133`, `:154`, `:161`; `Tooltip.ts:351`).

   This contradicts E18’s prohibition on repositioning a tip other code moved. Eventual restoration does not make those forward positioning writes compliant. E18 explicitly reserved this observed case for a Placement successor (`j-tooltip-doors-verdict.md:21`, `:30`).

   **Smallest correction:** give Placement construction an ownership check after reaction-capable effects, stop subsequent positioning when it fails, and restore acquired placement resources without reparenting or removing the relocated tip. Preserve standalone Placement and Dropdown behavior.

   The existing proof bindings remain useful but narrower:

   - P3’s omitted post-construction door causes the forbidden `shown` token; `Tooltip.test.ts:1727` distinguishes it. Log `:13` records `EXACT`. P3 does **not** assert absence of positioning writes.
   - P4’s bare ARIA link permits `inserted` after destruction; the independent listener at `Tooltip.test.ts:1766` distinguishes it. Log `:14`, `EXACT`.
   - P5’s undefined inserted predicate permits promotion after relocation; `Tooltip.test.ts:1795` distinguishes it. Log `:15`, `JOINED`, names this failing case and therefore binds it.
   - Removing the token predicate permits promotion after an inserted listener adds `shown`; `Tooltip.test.ts:1821` distinguishes it. Log `:3`, `EXACT`.
   - Removing the show-completion door lets the interrupted show return true; `Tooltip.test.ts:658` distinguishes it. Log `:9`, `EXACT`.
   - Releasing after `hidden` refuses the listener’s new show; `Tooltip.test.ts:1948` distinguishes it. Log `:20`, `EXACT`. That row proves hidden-event reentry, not independently the shown-event path.

4. **BROKEN — Teardown checks relocation but does not check token takeover before removal.**

   **Source-derived counterexample:** show a tooltip with `animated: false`; attach a closing `beforetoggle` listener that adds its `shown` token without moving it; call `hide()`.

   The hide removes the token and passes its false-token door. `#discard` then clears the fields and invokes Placement teardown. The closing listener restores the token. After teardown, discard checks only the parent, removes the tip, reports true, and the undefined completion predicate permits `hidden` (`Tooltip.ts:711`, `:717`, `:628`, `:632`, `:634`, `:721`). The platform dispatches closing `beforetoggle` within the hide algorithm, before that algorithm returns. [HTML popover algorithm](https://html.spec.whatwg.org/multipage/popover.html#hide-popover-algorithm).

   The call therefore removes a tip whose token contradicts the state E18 requires until removal.

   **Smallest correction:** retain the captured tip through teardown’s ownership read, check its expected token as well as its parent before ordinary concealment removes it, and report false on takeover. Destruction must retain its separate cleanup behavior.

   The relocation and fill repairs themselves hold:

   - Unconditional discard removal reddens P2’s return assertion (`Tooltip.test.ts:1694`) and P7’s parent assertion (`:1866`); log `:11` and `:17`, `JOINED`.
   - Unconditional success from discard reddens P2 (`:1694`); log `:12`, `EXACT`.
   - Allowing in-flight fill reddens the nested-fill result (`:1889`); log `:18`, `EXACT`.
   - Removing fill’s post-release lifetime check reddens destruction during return (`:1416`); log `:28`, `EXACT`.
   - The wait-relocation row deletes the post-wait door **and** conditional removal; log `:8` binds that combined mutation.
   - “The token removal step reads no door” mutates build normalization at `Tooltip.ts:486`; it does **not** prove concealment’s token-removal boundary.

   I could not reach a connected `#tip` with an undefined `#container` through the ordinary publication sequence: the fields are assigned without an intervening callback. After a relocated discard, the old Placement has been restored; remaining content origins survive for later release. Leaving that consumer-owned node while a later request builds another tip is not itself a lost-resource defect.

5. **BROKEN — The prescribed wording is present, but its behavioral guarantees exceed the implementation.**

   The show/hide remarks, inserted and completed-event sentences, in-flight fill refusal, O1 exception, and guide paragraph are present ([types.ts:1508](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/types.ts:1508), `:1646`, `:1660`, `:1701`; [veneer.md:2475](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/guides/veneer.md:2475), `:2478`).

   The attacks in claims 1, 3, and 4 contradict the promised stopping behavior and the parent/token checks “from the tip’s insertion until its removal.” The class repeats those guarantees at `Tooltip.ts:80`. Copying E18 verbatim establishes textual compliance, not their truth.

   **Correction:** close the named mechanism gaps and align the declarations with the resulting boundaries. Preserve the completed-event release semantics and ordinary public-hide veto. O1 now correctly describes forced concealment after the consumed re-promotion allowance; its earlier contradiction is repaired.

6. **CONFIRMED — The round-3 proof repairs distinguish their intended rivals.**

   I attempted the rival readings that defeated the earlier evidence:

   - **Late origin publication:** capture the original location before movement but publish afterward. `restored.calls` reads immediately after nested destruction, before later cleanup can mask the defect (`Tooltip.test.ts:1345`, `:1352`; instrument `:154`; log `:26`, `EXACT`).
   - **Repeated failed construction:** delete `#failed.add`. The later interaction reads the failed descendant’s attributes, violating the receiver-filtered empty record (`Tooltip.test.ts:1479`, `:1483`; log `:74`, `EXACT`).
   - **Global `href`:** move it out of the local `a` allowance before adding it globally. The named sanitizer case now fails on `<span href="h">`, at the output assertion, rather than on invalid configuration ([NativeSanitizer.test.ts:159](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/tests/src/browser/sanitizers/NativeSanitizer.test.ts:159); instrument `:179`; log `:36`, `JOINED`).
   - **Default modal token:** select the default-token decoy instead of the `x-modal` ancestor. Non-bubbling hide events distinguish them (`Tooltip.test.ts:1539`, `:1602`, `:1609`; instrument `:238`; log `:59`, `EXACT`).

   The whole-file rows bind these proofs because the instrument records failure of the named case, not merely a nonzero process exit (`j-tooltip-mutations-4.py:383`).

7. **UNRESOLVED — The required Orchestrator mutation replay remains outstanding.**

   The supplied final instrument log records the named failures, the id `MISSED`, clean baseline rows, and the closing line:

   `receipt: restored byte for byte`

   Its classification reads the named failed assertions from Vitest’s report (`j-tooltip-mutations-4.py:338`, `:383`; `j-tooltip-mutations-4.log.txt:97`, `:105`). That receipt concerns byte restoration; it is not a `prove` receipt.

   My read-only comparison found round-4 changes relative to round 3 in `Tooltip.ts`, `types.ts`, `Tooltip.test.ts`, and the guide. After excluding diff index metadata, the other retained file patches match round 3, including Placement and helpers. Their current source hashes also match the final instrument’s recorded hashes. The collided stdout is therefore not evidence of mutations still present in this tree.

   The established gate results are recorded at `j-tooltip-gates-4.log.txt:22`, `:37`, `:40`, `:47`, `:91`, `:104`, `:117`; I did not rerun them. Source inspection found no additional scope or prohibited-syntax defect in the reviewed changes.

   **To settle:** the Orchestrator must supply its serialized replay of the final instrument against this tree, including named assertion failures, clean baselines, and restoration verification.

**Findings fitting no claim:** none.

**Attacked and held**

The remaining door trace is source-derived. Custom-element reactions associated with annotated DOM operations run before those operations return, which makes the subsequent reads meaningful; queued popover `toggle` delivery is a later interval. [HTML custom-element reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions), [popover algorithms](https://html.spec.whatwg.org/multipage/popover.html).

| Interval | Attack and boundary that held |
|---|---|
| Presence evaluation | A function destroys the tooltip or leaves a change in flight; `#filled` refuses before another function or show dispatch (`Tooltip.ts:434`). |
| Build functions, sanitizer, token and id writes | Destruction stops the next step; origins are published before moves, and slot failures release candidate content (`:470`, `:529`). |
| Append | Connection reaction destroys, relocates, or marks the candidate shown; the false-token/container read stops before linking (`:344`). |
| ARIA link | Trigger reaction destroys or takes over; the false-token/container read stops before `inserted` (`:345`). |
| Inserted event | Relocation or token addition stops before Placement (`:347`). This differs from relocation **inside** Placement. |
| Shown-token write and show wait | Token removal, relocation, destruction, or hide takeover fails the true-token door before completion (`:359`, `:362`). |
| Hide dispatch and token removal | Listener/reaction relocation, identity takeover, or token restoration fails the respective true/false door (`:698`, `:711`). The later teardown gap is claim 4. |
| Hide wait | Destruction or persistent parent/token mismatch stops before discard (`:713`). |
| Completed dispatch | Release precedes dispatch, so an accepted successor survives the old call’s `finally` (`:363`, `:367`, `:720`, `:726`). |
| Undo | Externally moved content fails the recorded-slot comparison and stays put (`:580`). Restoration and still-owned content return remain permitted cleanup. |

Timing attacks also held: native timer replacement, independent active triggers, and re-entry during fade-out are distinguished by the retained mutations (`Tooltip.ts:812`, `:824`, `:834`; log `:29`, `:30`, `:31`). These correspond to Bootstrap’s `_enter`, `_leave`, and `_setTimeout` (`node_modules/bootstrap/js/src/tooltip.js:501`, `:516`, `:530`).

The delegation trace has an important scope boundary: **Tooltip has no `Delegate` route or E12 event mark** (`Delegate.ts:467`, `:913`). Its opt-in descendant route uses registry ownership. Under nested tooltip roots, the outer root declines an inner-owned child; destruction aborts child lifetimes and listeners; construction finishing after parent destruction observes the aborted signal (`Tooltip.ts:742`, `:750`, `:280`, `:412`). E12’s same-host refusal remains within each Delegate’s actual route set (`Delegate.ts:504`); extending it to explicit Tooltip delegation would add behavior this unit does not promise.

Hostile detail accessors, sanitizer-target traps, invalid trigger words, negative/nonfinite delays, invalid fallback members, and throwing array iteration remain contained by the guards/parsers and their named mutation failures (`validators.ts:376`, `:399`; `parsers.ts:244`, `:282`, `:333`; log `:85` through `:95`).

**Referrals**

- Reproduce claim 1’s rebuild takeover and claim 4’s closing-token takeover in the real browser before issuing their fix briefs.
- Route claim 3’s recorded positioning defect to the Placement successor reserved by E18.
- Carry the resulting contract corrections under claim 5 and the independent replay under claim 7.

**Bounds**

This lane ran no browser test, build, mutation, or gate, wrote no file, and spawned no agent. New interleavings are source-derived; the promotion observation and mutation results are retained execution evidence. No `prove` call was made, so there is no refused-call output or receipt to report. E13 restoration reentry remains outside this ruling. No current round-4 counterpart verdict was read.

VERDICT: FAIL 1, 3, 4, 5, 7; outside the claims: none
