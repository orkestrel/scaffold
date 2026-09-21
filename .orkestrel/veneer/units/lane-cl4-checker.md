<!-- workflow wf_8a769c99-934, agent a5717e00cdecd5620, checker on sonnet, retained 2026-09-21 -->

## Claim table

**Claim 9 [mechanical] — Scope, law, and gates**

Scope sub-claim: CONFIRMED. `tmp/audit/cl4-status.txt` lists exactly the ten modified and twenty-six new paths the six briefs own (`app/browser/constants.ts`, `guides/veneer.md`, `src/styles/elements/_button.scss`, `src/styles/index.scss`, `tests/app/browser/sections/ContentSection.test.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/elements/button.test.ts`, plus the new `src/styles/elements/_*.scss` and `tests/src/styles/elements/*.test.ts` pairs). `tests/setupConformance.ts`, `src/styles/_reset.scss`, `src/styles/_tokens.scss`, `_mixins.scss`, `tests/fixtures/**`, `package.json`, `configs/**`, and vendored files are absent from `cl4-diff.patch` (confirmed by full read).

Granted-purpose sub-claim: CONFIRMED. `tests/setupStyles.ts` changes only `normalizeComplexSelector` (diff lines 543–596). `tests/setupStyles.test.ts` adds only cases for that function (diff lines 491–539). `tests/setupConformance.test.ts` changes only the four ledger-derived cases' `.filter((row) => row.component === 'btn')` scoping and the dash-proof set (diff lines 445–490). `tests/conformance.test.ts` changes only `listed` (diff line 441).

Law-sweep sub-claim: CONFIRMED. `Grep` over `cl4-diff.patch` for `as any|as unknown|@ts-ignore|@ts-expect-error|eslint-disable|public |private |protected |: any\b` returns only a false-positive prose match ("The private application…", diff line 293, unrelated to a class member). `Grep` for `it.skip|describe.skip|.todo(|xit(|xdescribe(` returns no matches. `Grep` for physical-axis longhands (`margin-left|margin-right|padding-left|padding-right|left:|right:|float: left|float: right|text-align: left|text-align: right`) returns no matches; the only float/text-align in the diff use logical values (`float: inline-start` in `src/styles/elements/_fieldset.scss:9`, `text-align: start` in `_table.scss:11`).

Gate/verifier sub-clause: **UNRESOLVED, not CONFIRMED.** Its only evidence is `.orkestrel/veneer/units/cl4-report-5.md:113-130`, the writer's own quoted commands and exit codes. No independent `verifier` report exists for this unit — `Glob` over `.orkestrel/veneer/units/*verifier*` returns entries through `lane-cl3b-2-verifier.md` and no `cl4` entry. A quoted command and exit code inside the unit's own report evidences nothing until a lane that ran the command supplies the reading.

## Probe readings

- **Scope**: confirmed above.
- **The key**: `guides/veneer.md:758` carries `reboot | selector | ... | — | shipped`; `tests/conformance.test.ts:441` reads `listed` as `['btn', 'reboot']`. Confirmed by direct read.
- **The exclusion set**: `guides/veneer.md:213` opens the ten-row `### Deferred selectors` `Excluded` block (diff lines 185-196); each of the ten names (`ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd`, `legend + *`, `::-moz-focus-inner`, `::-webkit-file-upload-button`) matches exactly one whole selector in `tests/fixtures/oracle/inventory.json` (10 occurrences confirmed by grep) and none appears in `dist/src/styles/index.css` (0 matches confirmed by grep).
- **The partials**: each new `src/styles/elements/_*.scss` file selects its bare tag plus pseudo-class/attribute/mandated-pair selectors that belong to its own family (checked `_input.scss`, `_table.scss`, `_tr.scss`, `_fieldset.scss`, `_select.scss`/`_optgroup.scss` against `MANDATED_TAG_PAIRS` at `veneer/tests/setupStyles.ts:780-799` and against the pinned inventory's reboot selector list; no standalone `option` or `colgroup` selector is an inventory obligation, so their absence from `_select.scss`/`_optgroup.scss`/`_table.scss` is correct). Every new partial's `@use` appears in `src/styles/index.scss` (diff lines 344-359). The `_tokens.scss` layer order line is untouched (absent from diff). `tests/src/styles/index.test.ts` is absent from the diff. No physical-axis longhand found in the diff (confirmed above).
- **The canonicalization**: `normalizeComplexSelector` in `tests/setupStyles.ts:1762-1801` folds only `:before`, `:after`, `:first-line`, `:first-letter` (line 572) and drops a leading universal only immediately before a matched pseudo-element (lines 575-584); `tests/setupStyles.test.ts:499-539` carries cases for the four legacy names, unrelated pseudo-classes, literal text, the universal-drop rule, and a genuinely absent selector (`legend + *`, `::-webkit-file-upload-button`) staying absent after normalization.
- **The conformance cases**: each changed case in `tests/setupConformance.test.ts` (diff lines 449-490) filters to `btn` before its loop, or (for the dash-proof case) keeps its unchanged full-population loop with the component set widened to `{btn, reboot, engine}`; no assertion body was deleted, only the row population was scoped.
- **The section**: `CONTENT_SPECIMENS` grows by one frozen, `ContentSpecimen`-typed entry per new family (diff lines 22-89 of `app/browser/constants.ts`, `Object.freeze` on every entry); `ContentSpecimen` is declared at `app/browser/types.ts:18`. `tests/app/browser/sections/ContentSection.test.ts` grows its tag-sequence array to match (diff lines 379-429). `app/browser/index.ts` is absent from the diff.
- **Law sweep**: confirmed above.

## Extra findings

None. No implementation defect was found in the diff, the live tree, or the guide.

## Reconciliation note

The completion report's gate-chain and independent-verifier claims (`.orkestrel/veneer/units/cl4-report-5.md:113-130`) rest solely on the writer's own quoted output and stay UNRESOLVED until a `verifier` lane reproduces them. This is a missing verification step, not a defect found in the code, and does not by itself indicate the implementation is wrong.

Verdict: accept
