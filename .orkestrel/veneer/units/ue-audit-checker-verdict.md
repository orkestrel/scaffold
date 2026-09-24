# Verdict — UTIL-EFFECT (`ue`) round 1, checker (claims 1, 6, 8)

## Numbered verdicts

**Claim 1 (Scope and delta) — UNRESOLVED**

- `ue-status.txt` lists exactly the twelve Owned paths named in `b-utilities-ue-brief.md` § Scope: `app/browser/sections/{FocusRingSection,OpacitySection,ShadowSection}.ts`, `src/styles/{components/_focus-ring.scss,utilities/_opacity.scss,utilities/_shadow.scss}`, and their six mirrored proofs under `tests/app/browser/sections/` and `tests/src/styles/{utilities,components}/` (`/home/user/scaffold/.orkestrel/veneer/units/ue-status.txt:1-12` against brief lines 98-100). CONFIRMED on this sub-clause.
- `ue.diff` carries exactly those twelve files as new-file diffs and no other (`ue.diff:1-989`, every `diff --git` header matches `ue-status.txt`). CONFIRMED on this sub-clause.
- `ue-shared.patch` touches seventeen files (`src/styles/index.scss`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/{Showcase,index,integration}.test.ts`, `tests/setup.css`, `tests/fixtures/tailwind/{consumer,preflight}.css`, `tests/fixtures/tailwind/markup.html`, `guides/veneer.md`), all on the brief's Shared list (brief lines 102-116); none touches `_mixins.scss`, `package.json`, `README.md`, `src/browser/**`, `src/core/**`, or a vendored file. CONFIRMED on this sub-clause.
- The sub-clause "applies with `git apply --check` to a fresh extract of `2a3f223`" needs a command this lane cannot run: `git apply --check ue-shared.patch` against a `git archive 2a3f223` extract. **UNRESOLVED** — the Orchestrator takes this reading.

Because one sub-clause of claim 1 is UNRESOLVED, the claim as a whole is UNRESOLVED per the verdict shape (one value per claim; a mixed clause cannot round up to CONFIRMED).

**Claim 6 (Sections, specimens, and registries) — CONFIRMED**

- Barrel order: `Showcase.ts` constructs `ShadowSection`, `OpacitySection`, `FocusRingSection` in that order, after `VisibilitySection` and before `NavbarSection` (`ue-shared.patch:447-453`); `index.ts` exports them in the same order (`ue-shared.patch:463-466`). Matches brief order (brief lines 98-99).
- No specimen writes an inline style or an unshipped class: `SHADOW_SPECIMENS`, `OPACITY_SPECIMENS`, `FOCUS_RING_SPECIMENS` markup uses only `row`/`col`/`card`/`placeholder`/shipped `shadow*`/`opacity-*`/`focus-ring*` classes (`ue-shared.patch:337-417`); each section test asserts `region.querySelector('[style]')` is `null` (`ue.diff:237,353,426`).
- Populations derive from specimens/`DRIVEN_KEYS`/setup table, per note 1 item 2 (`w2-w3-note-1.md:11-12`): the new journey case filters `DRIVEN_KEYS` by `FOCUS_RING_SPECIMENS` names (`ue-shared.patch:590-591`); style proofs iterate the frozen `SHADOW_CASES`/`OPACITY_STEPS`/`FOCUS_RING_ROLES` tables (`ue-shared.patch:91-135`, `ue.diff:475,706,809`).
- `CASCADE_KEYS`/`DRIVEN_KEYS` focus rows read a property a rule sets on a box a computed style can read: `shadows`→`.shadow` `box-shadow`, `opacity-steps`→`.opacity-50` `opacity`, `default-focus-ring`→`.focus-ring` `box-shadow`, `focus-ring-roles`→`.focus-ring-danger` `--bs-focus-ring-color` (`ue-shared.patch:40-63`), each a declaration a partial writes (`ue.diff:97-112`).
- `listed` literal, `index.ts`, `Showcase.test.ts`, `index.test.ts`, and the dash-proof component set (`setupServer.test.ts`) insert `focus-ring`/`opacity`/`shadow` at the correct alphabetical slots and agree with the barrel additions (`ue-shared.patch:251-314,517-556`).
- `SHADOW_CASES`, `OPACITY_STEPS`, `FOCUS_RING_ROLES` sit in `tests/setupStyles.ts`, are `Object.freeze`d and exported (`ue-shared.patch:91-135`), and are bound to the inventory and `_tokens.scss` by derivation rather than a restated literal, per note 1 item 5 (`ue-shared.patch:196-244`).

Attacked and held: checked whether any specimen's markup carries an inline `style=` attribute or a class not shipped by the unit's own partials — none found across all three constant blocks and all three section test files.

**Claim 8 (Law and report) — CONFIRMED**

- Swept the full `ue.diff` and `ue-shared.patch` for `any`, a type assertion `as X` beyond `as const`, non-null `!`, `@ts-*`, `eslint-disable`, `vi.mock`/`vi.fn`/`spyOn`/`jest.fn`: no hit beyond the permitted `as const` (`ue.diff:939`), `@use … as` module aliasing (an SCSS import keyword, not a JS assertion), and CSS `!important` string literals inside `scene.load(...)` fixtures. No suppression, mock, spy, or fake found.
- No nested function declaration beyond a callback passed directly: scanned every added `.ts`/`.scss` block; every function form is either a class method, a top-level arrow assignment, or a callback argument to `map`/`filter`/`forEach`/`each`.
- No new helper duplicating an installed `@orkestrel/test`/`@orkestrel/contract` export: the only new exported symbols are the three `*Section` classes and the copy/specimen/case constant tables, none of which shadow an installed helper name.
- Added comments, TSDoc, and guide text follow the code-token-then-noun rule on every site read (for example "the `none` value", "the `--bs-focus-ring-x` … property", `ue-shared.patch:822-824`); no banned-term hit (`should`, `simply`, `easy`, `currently`, `leverage`, `utilize`, `e.g.`, `i.e.`, `etc.`) in either diff. The report (`b-utilities-ue-report.md`) uses "new" twice (lines 26, 246, 264) in a structural sense — describing files created by this diff and frames not yet captured — not a temporal-currency claim; ruled permitted per `.claude/rules/writing.md` § Substitutions note that `new`/`now`/`latest` carry a permitted sense the sweep leaves for manual ruling.
- "The report records each gate's command with its result line": confirmed directly from the report's own content — the Scoped gate evidence table lists a command, exit code, and reading for every criterion 1-7 plus the guides/policy/journey/setup observations (`b-utilities-ue-report.md:78-94`). This is a claim about the report's structure, checkable by reading the report itself, not a claim about whether the gates actually passed (which remains the writer's own report and is not re-confirmed here).

## Findings fitting no claim

None substantiated outside claims 1, 6, and 8.

## Counts the report states (listed, per Output contract)

`b-utilities-ue-report.md`: file line counts 21, 20, 26, 97, 185, 235, 21×3, 67, 80, 122; patch size 909 lines; `git apply --stat` totals 17 files changed, 467 insertions, 15 deletions, with per-file deltas 3, 30, 55, 55, 6, 3, 97, 6, 3, 9, 9, 60, 2, 2, 2, 9, 131; baseline 22 passed and 18 passed; criterion 3 reading of 18 selectors under the keys (cascade emits the same 18, one conditioned rule); criterion 4 = 29 passed; criterion 5 = 12 passed; criterion 6 = 22 passed; criterion 7 = 18 passed; `test:guides` = 19 passed; `test:policy` = 109 passed, 1 skipped; journey `light-1280` = 45 passed; journey `dark-390` = 45 passed; `test:setup` final run = 267 passed; load-average ranges 15-33 and 28-33 cited for timeouts; unmutated proof run = 29 of 29; per-mutation red counts 8, 7, 6, 7, 5, 8, 2, 5, 1, 1, 2, 1, 1, 1; negative controls = 2 failed (×2 controls), green control = 18 of 18.

## Attacked and held (beyond what each CONFIRMED line already carries)

- Claim 6: attacked for stray inline styles/unshipped classes in the three new specimen tables — none found.
- Claim 8: attacked for a temporal-sense violation on every `new`/`now`/`latest`/`currently` occurrence — the three `new` hits read as structural, not temporal, and are ruled permitted rather than dropped.

## Terminal line

VERDICT: FAIL 1; outside the claims: none
