<!-- Objective lane: analyst on GPT-6 Astra, journal tmp/codex/fu-audit-2-analyst.jsonl (swept at acceptance), thread 01a0d3ce-908f-7c40-a99f-4e38732060b4, brief fu-audit-2-analyst-brief.md. -->

1. **CONFIRMED — Scope.** The attack compared the live status and diff with the retained artifacts, then compared the protected files with `cf5e447`. The SHA-256 digests match. [fu-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fu-2-status.txt:1) lists only authorized paths. The `_color-bg.scss` and `_link.scss` partials and their corresponding style proofs are byte-identical to the base. [fu-shared-2.patch:1](/home/user/scaffold/.orkestrel/veneer/units/fu-shared-2.patch:1) changes only the guide’s Showcase prose and Tests links; no ledger row changes. The temporary `_link.scss` mutation writes are recorded, and [fu-mutations-2.log.txt:41](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutations-2.log.txt:41) records restoration. The Orchestrator’s scope ruling holds.

2. **BROKEN — The role assertion covers Primary alone.** The emphasis repair and the named mutations hold, but “no role link” overstates the case’s coverage.

   [The target table:2548](/home/user/veneer-fu/tests/setup.ts:2548) selects `.link-primary` for hover and focus. [The case:2356](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2356) reads only that selected anchor. Consequently, [the role assertion:2503](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2503) never checks the Secondary, Success, Info, Warning, Danger, Light, or Dark anchors present in [the specimen:516](/home/user/veneer-fu/app/browser/constants.ts:516).

   The counterexample is a Secondary-only hover-color departure. I evaluated the exact source predicate against [the retained readings:2](/home/user/veneer-fu/tmp/capture/light-1280.txt:2), using the source target table. Secondary is outside the measured population and produces no rejection; changing the measured Primary hover color produces `role-links-hover`. This is an executed assertion-coverage check, not a browser execution of a stylesheet mutation.

   The retained browser mutations establish their narrower claims:

   - `emphasis-state-rule-deleted` leaves hover and focus color equal to rest. The emphasis assertion distinguishes this mutation at [integration.test.ts:2501](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2501). I read [its failure log:151](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-2-emphasis-state-rule-deleted-e149d9.log.txt:151).
   - `role-link-hover-color` changes every role, including Primary. The role assertion distinguishes that mutation. I read [its failure log:119](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-2-role-link-hover-color-e149d9.log.txt:119). This control does not establish coverage of roles the case never drives.

   The smallest implementation fix is to drive and compare each role anchor’s paint, preserving the existing Primary frame placements. Add a Secondary-only mutation. This finding concerns the journey’s asserted coverage; [the separate style proof:19](/home/user/veneer-fu/tests/src/styles/utilities/link.test.ts:19) already iterates the role population.

3. **CONFIRMED — Tab drive and visible frames.** The attack checked whether the traversal helper secretly scripts target focus and whether the captures still lack outlines.

   [The link case:2381](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2381) releases the pointer, focuses the padded wrapper, and calls traversal. [The installed traversal implementation:876](/home/user/veneer-fu/node_modules/@orkestrel/test/dist/src/browser/index.js:876) uses `userEvent.tab()` and returns only when the target holds focus. [The held assertion:2407](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2407) requires the link to equal `document.activeElement`. [The container case:2554](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2554) follows the same drive and checks target identity.

   The inspected [dark role frame](/home/user/veneer-fu/tmp/capture/states/role-links-focus--dark-390.png) and [dark container frame](/home/user/veneer-fu/tmp/capture/states/focusable-container-focus--dark-390.png) visibly contain the outlines. Their light counterparts also show outlines. The emphasis and icon focus captures agree.

   [The offset target:2553](/home/user/veneer-fu/tests/setup.ts:2553) selects `.link-offset-3-hover`. The supplied light and dark offset captures show its lowered underline; the retained readings record `auto` changing to `5.25px`. I read `fu2-capture-light-1280.log.txt` and `fu2-capture-dark-390.log.txt`; each records the selected cases passing at line 79.

   Replacing Tab with scripted focus is **not reliably distinguished by the held-state assertions alone**: [FOCUS-FRAME’s P2 reading:112](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report.md:112) records matching focus state without painted pixels. The inspected captures establish the visible-outline part of this claim.

4. **CONFIRMED — Setup tables.** The attack checked actual declarations, consumers, runtime freezing, missing targets, and deletion failures. [setup.ts:2534](/home/user/veneer-fu/tests/setup.ts:2534) exports and documents the named tables. Read-only evaluation of their source declarations confirms that each is frozen. [The journey:2330](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2330) rejects a driven link row without a target and reads the exported property lists.

   [The export case:53](/home/user/veneer-fu/tests/setup.test.ts:53) names each export. [The table case:153](/home/user/veneer-fu/tests/setup.test.ts:153) checks membership, selector form, nonempty lists, uniqueness, separation, and freezing.

   `link-tables-absent` is distinguished by the export-list assertion. The table case also fails, specifically at `Object.entries(undefined)` before its assertions. I read [the mutation log:32](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-2-link-tables-absent-2075ad.log.txt:32) and its table failure at line 43. This proves deletion detection, not every possible malformed-table mutation. `fu2-gate-setup-scoped.log.txt:8` records the passing control.

5. **BROKEN — Report wording.** F1, F2, and F3 are repaired: [setup.ts:602](/home/user/veneer-fu/tests/setup.ts:602), [the patch:69](/home/user/scaffold/.orkestrel/veneer/units/fu-shared-2.patch:69), and [constants.ts:2839](/home/user/veneer-fu/app/browser/constants.ts:2839) carry the prescribed wording; [the viewport clause:47](/home/user/scaffold/.orkestrel/veneer/units/fu-shared-2.patch:47) names Overflow; [VISIBILITY_COPY:2825](/home/user/veneer-fu/app/browser/constants.ts:2825) names the container.

   The report still states the growable-set tally `7 files changed, 683 insertions(+), 84 deletions(-)` at [report:203](/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-report-2.md:203). It also contains temporal wording: “while” at line 109, “red-first” at line 142, and “pre-run” at line 196. Delete the diffstat tally and recast the temporal wording. No positional naming of a list item was found.

   The gate result quotations agree with the inspected `fu2-gate-*` and `fu2-capture-*` logs. [fu2-gate-setup.log.txt:33](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu2-gate-setup.log.txt:33) records the reported timeout failures in the untouched server setup proof; the evidence does not contradict the Orchestrator’s given ruling.

   The report states these counts:

   - Line 52: diagnostic `…(2)` entries; line 55: diagnostic `…(4)`; line 97: diagnostic `…(17)` and `…(21)`.
   - Lines 157 and 178: `2 failed | 286 passed | 12 skipped (300)`.
   - Line 179: `21 passed (21)`; line 180: `14 passed (14)`.
   - Lines 181–182: `2 passed | 46 skipped (48)`.
   - Line 183: `20 passed (20)`; line 187: `48 passed (48)`.
   - Line 203: `7 files changed, 683 insertions(+), 84 deletions(-)`.

   The test totals and diagnostic counts are quoted execution evidence. The diffstat remains the prohibited tally. “Both” at lines 24, 67, and 103 names its members; “three-way” at line 25 identifies the merge operation.

Findings outside the claims: none.

Attacked and held: unchanged role-link paint is the documented behavior. The emphasis change is independently asserted. An outline’s computed focus state does not establish painted pixels; the supplied captures establish those pixels. The table deletion reaches the named cases rather than failing test discovery.

VERDICT: FAIL 2, 5; outside the claims: none
