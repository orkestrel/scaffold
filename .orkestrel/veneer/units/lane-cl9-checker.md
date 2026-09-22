<!-- workflow wf_676eee5e-743, agent a42e66b883b3a8139, checker on sonnet, retained 2026-09-22 -->

## Checker verdict — CL9 mechanical lane

### Claim 12 `[mechanical]` — Scope, law, and gates

**Scope/status honesty — CONFIRMED.**
`tmp/audit/cl9-status.txt:1-15` lists exactly: `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, and new files `app/browser/sections/TableSection.ts`, `src/styles/components/_table.scss`, `tests/app/browser/sections/TableSection.test.ts`, `tests/src/styles/components/table.test.ts`. None of `tests/setupConformance.ts`, `src/styles/_tokens.scss`, `src/core/constants.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, any other partial/proof, or vendored files appears.

- `src/core/constants.ts:250` already declares `stripe: '--vn-state-stripe'`, and `src/styles/_tokens.scss:23,67` already declares `'state-stripe': 5%`, confirming these files needed no edit (matches claim 10's "existing state token already carried the recorded stripe factor").

**New partial + proof, new section + proof, registrations — CONFIRMED.**
- New partial `src/styles/components/_table.scss` (diff hunk, "new file"), imported at `src/styles/index.scss:51` (`@use 'components/table' as table-component;`). Its proof: new `tests/src/styles/components/table.test.ts`.
- New section `app/browser/sections/TableSection.ts` (diff, "new file", 20 lines). Its proof: new `tests/app/browser/sections/TableSection.test.ts`.
- Showcase registration: `app/browser/Showcase.ts` imports and instantiates `TableSection` (diff lines 9, 17); proof in `tests/app/browser/Showcase.test.ts` (diff lines 316-333, asserting the `'Table'` region and `TABLE_SPECIMENS`).
- Application barrel registration: `app/browser/index.ts` adds `export * from './sections/TableSection.js'` (diff line 79); proof in `tests/app/browser/index.test.ts` (diff lines 344-348, asserting `TABLE_COPY`, `TABLE_SPECIMENS`, `TableSection` in the export list).

**Law sweep over added lines — CONFIRMED, no violation found.**
Grepped `app/browser/sections/TableSection.ts`, `tests/src/styles/components/table.test.ts`, `tests/app/browser/sections/TableSection.test.ts` for `any`, `@ts-`, `eslint-disable`, `public`/`private`/`protected`, `.skip(`, and non-`as const` type assertions — no matches. Grepped `tests/setupStyles.ts` — every `as` hit is `as const` (allowed), none is a type assertion. The new `TableSection` constructor (`constructor(host: HTMLElement)`) takes no access modifier, so it is not a parameter property. All new exports (`TABLE_COPY`, `TABLE_SPECIMENS`, `TableSection`, `TABLE_ROLES`, `TABLE_ROLE_CASES`, `TABLE_SELECTORS`, `TABLE_RESPONSIVE_CASES`, `TABLE_GEOMETRY_CASES`, `TABLE_MARKUP`) are named exports; no default export added.

**Gate half — UNDECIDABLE (not in my slice).**
The brief directs: "Rule the gate half on the evidence you have and say plainly that the independent run is not in your slice; do not call a fix round for its absence." I hold no execution evidence for the managed-Chromium/Edge gate runs or the independent verifier's chain. This is the verifier lane's finding, not mine.

### Probe readings (context, non-claim)

- **Normalizer's importer.** `tests/setupConformance.ts:27` imports `normalizeComplexSelector` from `./setupStyles.js`; `tests/setupStyles.ts:2249` is the sole declaration. No second selector-normalizing function found in either file.
- **`:nth-child(even)` equivalence guard.** `tests/setupStyles.ts:2288-2297` matches only at `step.depth === 0 && !step.literal` (top-level, non-literal), which is why quoted (`[title=":nth-child(even)"]`) and escaped (`.escaped\:nth-child(even)`) forms pass through unchanged per the paired test at `tests/setupStyles.test.ts:401-406`.

### Extra findings

None within scope. No implementation defect found that forces a fix round from this lane's evidence.

Verdict: accept
