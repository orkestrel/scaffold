<!-- workflow wf_dde38933-d50, agent a051fce4a232525fd, checker on sonnet, retained 2026-09-21 -->

## CL6 audit — checker verdict (mechanical lane)

### Claim table

**Claim 10 `[mechanical]`** — Scope, law, and gates.

- **Status list membership** — CONFIRMED. `tmp/audit/cl6-status.txt` lists exactly: `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/_tokens.scss`, `src/styles/elements/_a.scss`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/components/button.test.ts`, plus new files `app/browser/sections/LinkSection.ts`, `src/styles/components/_link.scss`, `tests/app/browser/sections/LinkSection.test.ts`, `tests/src/styles/components/link.test.ts`. `src/styles/components/_button.scss`, `src/styles/_mixins.scss`, `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, and every vendored file are absent — confirmed by direct read of `cl6-status.txt` (19 lines).
- **`tests/setupConformance.test.ts` grant** — CONFIRMED as within grant, and the scope read (brief-2 correction 3) is REFUTED on its narrower claim. Brief 1's `Scope` clause (`cl6-brief.md:124-125`) grants `tests/setupConformance.test.ts` "where the key's rows move a population." The edited case, `'skips engine and CSS obligations whose Proof cell is a dash'` (`tests/setupConformance.test.ts:927-973`), calls `readCompatibility()` (the real guide table, not a synthetic fixture) and filters it in JavaScript to `component === 'engine' || category === 'selector' || category === 'variable'`; the resulting `component` set is a real, guide-derived population that now includes `link` because the unit added `link` rows with `status: 'shipped'` to the guide. Brief 2's correction 3 (`cl6-brief-2.md:48-53`) asserted "the cases in `tests/setupConformance.test.ts` test the deciding function against synthetic rows for other components and do not move" — that statement is false for this specific case, which reads the real table. Brief 1's broader grant still covers the edit; the scope read's blanket claim about that file was wrong for this one case.
- **Button-test grant** — CONFIRMED. `cl6-brief-2.md:29-30` grants `tests/src/styles/components/button.test.ts` "for those two assertions alone." The diff at `cl6-diff.patch.txt:373-388` changes exactly two literal color expectations (rest and hover) and nothing else in that file; `src/styles/components/_button.scss` is untouched and absent from both diff and status.
- **Law sweep** — CONFIRMED clean. A regex sweep of the diff for `any`, non-`as const` assertions, non-null assertions, `@ts-ignore`/`@ts-expect-error`/`eslint-disable`, `public`/`private`/`protected`, `.skip(`/`.only(`, and `export default` returns no hits (one incidental match on the literal word `data` inside a test title, no actual violation).
- **Gates** — UNDECIDABLE for this lane. The brief states a verifier lane runs the gate chain in this round, blind to this lane; that run is not in this lane's evidence slice, so this lane does not rule on exit codes.

### Probe readings (non-mechanical claims, report-only)

- **Completeness (claim 1/2)**: extracted all 64 `.link-*` selectors recorded under the inventory's `link` key (`tests/fixtures/oracle/inventory.json:78544-79733`, `"selectors": 64` at `:114659`) and compared against `dist/src/styles/index.css`. Every selector is present in the cascade; no `.link-*` selector in the cascade is missing from the inventory. The permanent presence-scan test added at `tests/conformance.test.ts:52-64` asserts the omitted-selector accounting directly.
- **Listed set / guide rows (claim 6)**: `tests/conformance.test.ts:73` lists `link` alphabetically between `lead` and `list-inline`; `guides/veneer.md` diff adds one `selector` row and two `variable` rows for `link` (one per inventory property, `--bs-link-opacity` and `--bs-link-underline-opacity`), matching `collectShippedComponents`'s requirement (`tests/setupConformance.ts:713-734`) that a non-empty properties list needs at least one shipped variable row, and `scanCompatibilityPresence`'s requirement (per brief-2 correction 2) that both properties be covered.
- **Role tokens (claim 7)**: `src/styles/components/_link.scss` iterates `$aliased` (`src/styles/_tokens.scss:10`), the same role list `LINK_ROLES` pins in `tests/setupStyles.ts`. Role classes read `var(--vn-color-#{$role}-rgb)` rather than literal channel triplets.
- **Scope/guide/partial (claims 4, 5, 9, and the general scope probe)**: `src/styles/_tokens.scss` diff touches only the four `link`/`link-hover` token pairs in both the `$light` and `$dark` maps; `guides/veneer.md` diff touches only the three new `link` rows; `src/styles/index.scss` adds `@use 'components/link';` once, beside the other component partials, inside `@layer components`.

### Extra findings

None beyond the ruling recorded under claim 10. No plant residue, no off-limits file touched, no forbidden syntax.

### Verdict: accept

The gate half is out of this lane's evidence slice per the brief and is not counted against acceptance here.
