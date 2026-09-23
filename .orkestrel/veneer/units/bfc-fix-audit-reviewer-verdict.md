# B-FORMS-CHECK, round 2 (the fix round) — `reviewer` on Opus 5.5, subjective lane

Claims: `bfc-fix-audit-claims.md`. Evidence: `bfc-3.diff`, `bfc-3-status.txt`, `bfc-1.diff`, `bfc-3-report.md`, the worktree `/home/user/veneer-bfc`. Read-only; nothing ran; blind to the analyst lane.

1. **CONFIRMED.** The marked host (a `span` carrying `disabled`, mounted around line 346, its shape asserted around 358 to 359, its label read for `opacity` and `cursor` around 368 to 370) matches only the attribute rule, so under the split-rule plant its label resolves to `1` and `expect(readStyle(note, 'opacity')).toBe('0.5')` fails; the round-1 hosts both match `:disabled` and stayed green. Other attacks that failed: deleting the `[disabled]` half (the note reads `1`); deleting the `:disabled` half (the fieldset label reads `1`); reversing the plant's order (`#check-disabled` reddens); retargeting the half to `[aria-disabled]`. Unknown 2: a `span` with `disabled` is non-conforming HTML, but a custom element or a framework-rendered non-control carrying the class and `disabled` meets that shape, the only one the `[disabled]` half adds over `:disabled`. The red and green readings rest on the writer's report.
2. **UNRESOLVED** (a compile fact this lane cannot run): by reading, `$glyphs` (around lines 7 to 10) and the `@each` (89 to 93) emit the round-1 text (checkbox then radio; `[type='#{$control}']` resolves to the literal selectors; the same `map.get` keys; the loop between `:checked` and the indeterminate rule); `$engines` and `$states` are the precedent for a top-level map. Settled by the objective lane's compile.
3. **CONFIRMED.** The focus bullet (759 to 764) is true against the focus rule (`_form-check.scss` 76 to 80); the retune sentence holds (`--vn-focus-color` mixes `--vn-color-primary-base` at `_mixins.scss:265`); "the light and dark modes" (778); the print sentence (786 to 787) parses on first read; a case-insensitive sweep of 723 to 787 for the substitution terms found no banned sense.
4. **CONFIRMED, with a correction.** The rename is complete (the rows and remarks around `tests/setupStyles.ts:3781`, the destructure at `form-check.test.ts:218-219`, both reads in `setupStyles.test.ts` around 2219); a word-boundary `theme` grep also finds `key: 'theme'` (`setupStyles.ts:3861`), `@use 'theme'` strings (`setupStyles.test.ts:508`, `510`), and the earlier `BUTTON_FILLED_CASES` destructure (`setupStyles.ts:1944-1946`, R3).
5. **CONFIRMED.** `guides/veneer.md:3034`: "The input carries … properties" is the table's own verb (`ratio` at 3021, `was-validated` at 3045); only this row changed between the two diffs.
6. **CONFIRMED.** 743 to 744 against the dark rule (`_form-check.scss` around 155) and `bootstrap.css:2501`; no light-island rule outranks the dark rule on the element ((0,2,0) against (0,5,0)); the report records the mount, the command, and the matched URI.
7. **CONFIRMED.** Each replacement string matches once in `ROADMAP.md` (278, 375, 379); F3 is in; the carrier row matches D26 (dropping `theme.test.ts` is correct: no test names `switch-knob` or `select-indicator` there). The B-FORMS row part of the patch is F4.
8. **CONFIRMED.** The exchange reddens the `checked checkbox` row (`m6 10 3 3 6-6`), the `indeterminate checkbox` row (`M6 10h8`), and `shows the mixed glyph over the checked one…`; nothing else in the scoped proof reads those glyphs; the journey case `marks a copy of the resting checkbox mixed…` would also redden.
9. **CONFIRMED.** No `function`, no `as <Type>` beyond `as const`, no non-null `!`, no suppression; tables frozen; no new helper; no colour literal in the partial; the status is the round-1 set; `tmp/probe/**` empty.
10. **UNRESOLVED** (the writer's counts); the Orchestrator's chain settles it.

## Findings outside the claims

- **F4: the report's ROADMAP patch for the B-FORMS row** records a pre-landing state ("CHECK's fix round returned from `/home/user/veneer-bfc`"), names a detached worktree, and cites a relative `units/…` path that resolves nowhere. Right: record CHECK as the row records VALIDATION and RANGE (landed, with its commit and its audit lanes), citing the report by its absolute retained path.

## Referrals

- **R1 (Orchestrator):** `guides/veneer.md:1511-1512` (§ Tokens) says a nested light island "inherits the dark asset, and the component unit that owns each one closes that", while 743 to 744 says the component rule reaches that island and adds no reset; for `--bs-form-switch-bg` the § Tokens sentence is false twice. D26 and D28 give the rewrite to B-FORMS-ASSETS.
- **R2 (objective lane):** the claim 2 compile with its control; the claim 10 gates.
- **R3 (Orchestrator):** `BUTTON_OUTLINE_CASES` (`tests/setupStyles.ts:1944-1946`) binds `theme` for the axis its TSDoc calls "mode"; needs a carrier.

## Attacked and held

The `note` local is function-local, not a synonym defect; the case title fits; `guides/veneer.md:778` and the `FORM_CHECK_SELECTORS` remark run past 100 columns, which `oxfmt --check` accepts; the two recorded writer choices stand.

VERDICT: FAIL 2, 10; outside the claims: F4
