# J-TYPES audit round 10 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0cfdd-e859-7242-bde1-bf6760275fc8`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-10.jsonl` (launch copy under `tmp/codex/`); 20 commands; 265 s; usage {"input_tokens":1030800,"cached_input_tokens":928640,"cache_write_input_tokens":0,"output_tokens":7012,"reasoning_output_tokens":1207}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — objective lane.** Attacked E47 for a conflict between deferred resize handling, transition refusal, and destruction. The attack failed: `shown` occurs after settlement, so the engine can apply the pending resize then without calling `hide` during a transition. Destruction ends the listener’s lifetime and abandons pending transition work (`src/browser/types.ts:1199`, `:1274`, `:1297`, `:1316`). The remark is absent from `show`; the description and guide cells agree (`guides/veneer.md:123`, `:323`, `:326`).

2. **BROKEN.** The departure paragraph misstates Bootstrap’s selection boundary (`j-types-report-10.md:20`, `:25`).

   Counterexample: show an attached `<div class="offcanvas offcanvas-start" style="position: static">`, let showing settle, then resize without preventing `hide`. This non-responsive panel carries `aria-modal` and `show`; its `offcanvas-start` class satisfies `[class*=offcanvas-]`. Bootstrap calls `hide()` (`offcanvas.js:104`, `:111`, `:120`, `:267`). Placement classes are not responsive breakpoint classes (`bootstrap/scss/_offcanvas.scss:49`). Therefore “responsive panels only” is false, and Bootstrap does not ignore every non-responsive panel a consumer un-fixes. The executed substring comparison admitted this counterexample and excluded the earlier bare `offcanvas show` case.

   “Hides every” also overstates the result: a listener preventing `hide.bs.offcanvas` leaves a matching, Bootstrap-shown panel open (`offcanvas.js:133`). The engine likewise permits prevention (`src/browser/types.ts:1201`, `:1297`).

   The remaining source statements hold: construction initializes `_isShown` false; instance lookup can construct; `hide` refuses an unshown instance; `showing` satisfies the query after `_isShown` becomes true; load adoption calls `show()` (`offcanvas.js:69`, `:104`, `:113`, `:129`, `:260`; `base-component.js:65`). The engine’s deferred slide-in handling matches its contract (`src/browser/types.ts:1274`).

   The paragraph also omits Bootstrap’s document-query and literal-markup restrictions: it searches under `document.documentElement` and requires `aria-modal` and the class substrings. The engine’s lifetime rule states no corresponding query prerequisite (`dom/selector-engine.js:36`; `offcanvas.js:267`; `src/browser/types.ts:1274`). Immediate Bootstrap hide invocation versus engine invocation after settlement is described, but omitted from the enumerated Compatibility departures.

   Smallest fix: describe Bootstrap as **requesting** a hide for matching document descendants, subject to its shown-state and cancellation guards. Replace the responsive/non-responsive distinction with the actual selector boundary, and include the timing difference in Compatibility accounting.

3. **CONFIRMED.** Attacked E49/E50 for narrowing “control” to the `trigger` population and for guide drift. The attack failed: `entry` participates in the named outer and inner compositions; the independent `trigger` alternative remains intact (`src/browser/types.ts:875`, `:879`, `:881`, `:883`; `tab.js:46`, `:49`, `:259`, `:264`). The listed population sentences use “control,” and the Summary, `show`, and `destroy` comparisons agree (`guides/veneer.md:98`, `:299`, `:300`). The supplied listing establishes the remaining trigger references and correct `[role="tab"]` default (`j-types-gates-10.log.txt:69`).

4. **CONFIRMED.** Attacked scope, unrelated guide changes, forbidden syntax, and surviving replacement members. The diff’s added content matches the worktree files. Normalizing table padding leaves the intended contract changes and deleted `ScrollLockClassMap` row. Syntax inspection found no forbidden constructs or writable interface properties; its negative control detected `any` and a writable property. Replaced members and the deleted export are absent.

   The supplied status and independent gate record support the remaining assertions, including the refusal probe and the Offcanvas-only grep hit (`j-types-10-status.txt:1`; `j-types-gates-10.log.txt:16`, `:19`, `:22`, `:29`, `:42`, `:55`, `:57`, `:63`, `:89`).

**Findings fitting no claim:** none.

**Attacked and held:** A bare `.offcanvas.show` without an `offcanvas-` substring remains excluded by Bootstrap’s query. That earlier counterexample holds; generalizing it to every non-responsive panel fails. An unshown Bootstrap instance still refuses hiding.

**Referrals:** Carry claim 2’s corrected selector boundary, cancellation qualification, and timing departure to E48 and J-OFFCANVAS’s Compatibility accounting.

**Bounds:** This is a source and contract audit with executed static comparisons, supported by the supplied gate evidence. No build, browser test, or refusal probe was rerun; no file was written. Claim 2 breaks the comparison paragraph, not the lifetime-listener contract.

VERDICT: FAIL 2; outside the claims: none
