# Verdict — UTIL-TEXT (`ut`) audit round 1, checker (claims 1, 7, 9)

## Numbered verdicts

**Claim 1 (Scope and delta): CONFIRMED**
- `ut-status.txt:1-14` lists exactly the brief's Owned paths (`b-utilities-ut-brief.md:99-101`): the moved pair as ` D src/styles/components/_link.scss`, ` D tests/src/styles/components/link.test.ts`, and ten `??` entries matching every other Owned file, no extras.
- `ut.diff` carries exactly those twelve files (deletion of `_link.scss` and `components/link.test.ts` at lines 1-230; new `ColorSection.ts`, `TextSection.ts`, `_text-truncation.scss`, `_color.scss`, `_link.scss` (utilities), `_text.scss`, `ColorSection.test.ts`, `TextSection.test.ts`, `text-truncation.test.ts`, `color.test.ts`, `link.test.ts` (utilities), `text.test.ts` at lines 231-1548) and no other file.
- `ut-shared.patch` touches only files the brief lists as Shared (`b-utilities-ut-brief.md:103-118`): `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setup.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/{Showcase,index,integration}.test.ts`, `tests/setup.css`, `tests/fixtures/tailwind/{consumer,preflight}.css`, `tests/fixtures/tailwind/markup.html`, `guides/veneer.md` — none of `_mixins.scss`, `_tokens.scss`, `_button.scss`, `tests/fixtures/oracle/**`, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, or a sibling unit's file appears anywhere in the patch (full file-header scan, `ut-shared.patch:1-1260`).
- The `BADGE_COPY` sentence (`ut-shared.patch:483-488`) and the guide's Badge paragraph (`ut-shared.patch:1036-1042`) are exactly the edits this landing would otherwise make false, as claimed.
- The `git apply --check` sub-clause is an Orchestrator ruling taken as given (`ut-audit-claims.md:23`), not re-run here.

**Claim 7 (Sections, specimens, and registries): CONFIRMED**
- `TextSection.ts` and `ColorSection.ts` (`ut.diff:250-286`) both extend `SpecimenSection`, each `super(host, <KEY>_COPY, <KEY>_SPECIMENS)`.
- No specimen markup in `TEXT_SPECIMENS`/`COLOR_SPECIMENS` (`ut-shared.patch:513-610`) carries a `style=` attribute or a class outside the shipped/Bootstrap vocabulary.
- Construction and barrel order match: `Showcase.ts` inserts `TextSection`/`ColorSection` after `VisibilitySection` and before `NavbarSection` (`ut-shared.patch:635-642`); `index.ts` exports the same two files between the `VisibilitySection` and `NavbarSection` exports (`ut-shared.patch:648-654`); `Showcase.test.ts` region-name and specimen-population arrays carry `'Text','Color'` in that slot (`ut-shared.patch:669-684`); `index.test.ts` lists the matching export names in the same relative position (`ut-shared.patch:694-716`).
- `CASCADE_KEYS` rows (`ut-shared.patch:396-474`) each read an existing, computed-style-readable property (`text-align`, `white-space`, `word-break`, `text-transform`, `text-decoration-line`, `text-overflow`, `color`, `--bs-text-opacity`, `background-color`).
- The `listed` literal (`ut-shared.patch:34-40`), the order case's `entryPaths` (`ut-shared.patch:55-84`), and the compatibility component set in `tests/setupServer.test.ts` (`ut-shared.patch:90-96`, which is the population carrying the dashed `text-truncate` name) agree with the barrel edits in `src/styles/index.scss` (`ut-shared.patch:1-29`).
- `TEXT_*` tables sit in `tests/setupStyles.ts` (`ut-shared.patch:107-228`), are `Object.freeze`d, exported, and bound to the inventory's `text` key by a derivation test rather than a restated literal (`ut-shared.patch:277-365`, `'binds the text alignment, entry, color, emphasis, opacity, and pair tables to the inventory'`).

**Claim 9 (Law and report): CONFIRMED**
- No `any`, `as` (beyond none present), `!` non-null assertion, `@ts-*`, or `eslint-disable` in `ut.diff` (targeted greps, both pages, no matches) or `ut-shared.patch`.
- No `vi.mock`, `vi.fn`, `vi.spyOn`, fake timer, or `jest.mock` anywhere in `ut.diff` (no matches).
- Every function literal in the added tests is an `it`/`it.each`/`describe`/`describe.each`/`beforeAll`/`afterEach` callback passed directly as an argument, satisfying the sole nested-function exception (sampled at `ut.diff:558-834`, `ut.diff:1161-1352`, `ut.diff:1380-1547`).
- No new helper duplicates an installed `@orkestrel/test`/`@orkestrel/contract` export: the only new module-scope exports are `TextSection`, `ColorSection`, and the `TEXT_*`/`COLOR_*` constant tables, none of which shadow a test-library primitive.
- Substitution-table sweep of `ut.diff` and `ut-shared.patch` for banned terms (`should`, `simply`, `easy`, `currently`, `utilize`, `leverage`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `once`, `above`, `below`, `please`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`) returns no hit in `ut.diff` and two hits in `ut-shared.patch:1061,1084` — both read: "walks the breakpoints once" (a count of iterations, not the banned temporal sense) and "one pixel below it" (a numeric offset, not a cross-reference) — both permitted senses per `.claude/rules/writing.md` § Substitutions.
- The report records each gate's command with its result line (`b-utilities-ut-report.md:95-132`).

## Findings fitting no claim

None substantiated.

## Attacked and held

- Claim 1: attacked by checking every Shared-patch file header against the off-limits list; held — no off-limits file appears.
- Claim 9: attacked by a full-diff sweep for every banned-syntax pattern and every substitution-table term; held on both sweeps, with the two "once"/"below" hits ruled permitted rather than dropped.

## Counts the report states

- `TEXT_BG_CASES`/inventory count: "130 distinct sites" (`b-utilities-ut-report.md:108-110`).
- Style proofs: "94 passed" (`b-utilities-ut-report.md:114`).
- Section proofs: "12 passed" (`b-utilities-ut-report.md:116`).
- Conformance: "22 passed" (`b-utilities-ut-report.md:117`).
- `test:setup`: "267 passed" (`b-utilities-ut-report.md:118`).
- `test:policy`: "109 passed, 1 skipped" (`b-utilities-ut-report.md:119`).
- `test:guides`: "19 passed" (`b-utilities-ut-report.md:120`).
- `test:src:styles`: "95 files, 1091 passed" (`b-utilities-ut-report.md:121`).
- `test:app`: "42 files, 119 passed" (`b-utilities-ut-report.md:122`).
- `test:service` (base profiles): "17 passed, 1 failed" (`b-utilities-ut-report.md:124-126`).
- `test:service` (UP round-1 patch): "17 passed, 1 failed" (`b-utilities-ut-report.md:127-129`).
- `test:service` (widened reading): "18 passed" (`b-utilities-ut-report.md:131`).

VERDICT: PASS
