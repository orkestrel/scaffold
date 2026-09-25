# Unit LEDGER-ADDITIONS round 4 — report

## Item 1 — rename `collectMatchingClasses` to `collectAttributionClasses`

Sites, before and after:

- `tests/setupServer.ts:1812` (`matchSelectorKey`'s `@param`)
  - Before: `` * @param classes - The selector's classes, as the {@link collectMatchingClasses} helper reads them.``
  - After: `` * @param classes - The selector's classes, as the {@link collectAttributionClasses} helper reads them.``
- `tests/setupServer.ts:1876` (`@example` call)
  - Before: `` * collectMatchingClasses(':where(button.nav-link):not(.disabled)') // ['nav-link']``
  - After: `` * collectAttributionClasses(':where(button.nav-link):not(.disabled)') // ['nav-link']``
- `tests/setupServer.ts:1879` (declaration)
  - Before: `export function collectMatchingClasses(selector: string): readonly string[] {`
  - After: `export function collectAttributionClasses(selector: string): readonly string[] {`
- `tests/setupServer.ts:2452` (`attributeSelector`'s TSDoc `@link`)
  - Before: `` * ones the {@link collectMatchingClasses} helper reads, so a class a `:where()` or an `:is()` ``
  - After: `` * ones the {@link collectAttributionClasses} helper reads, so a class a `:where()` or an `:is()` ``
- `tests/setupServer.ts:2472` (`attributeSelector`'s call)
  - Before: `	const classes = collectMatchingClasses(selector)`
  - After: `	const classes = collectAttributionClasses(selector)`
- `tests/setupServer.test.ts` import list (renamed in place, position unchanged)
  - Before: `	collectMatchingClasses,`
  - After: `	collectAttributionClasses,`
- `tests/setupServer.test.ts` export-list case (renamed and moved to sorted position, between `collectAdditions` and `collectBreakpoints`)
  - Before: `'collectAdditions', 'collectBreakpoints', ...,  'collectMandatedRelatives', 'collectMatchingClasses', 'collectMediaFeatures'`
  - After: `'collectAdditions', 'collectAttributionClasses', 'collectBreakpoints', ..., 'collectMandatedRelatives', 'collectMediaFeatures'`
- `tests/setupServer.test.ts` reading case's calls (every `collectMatchingClasses(...)` call in the `it("reads the classes an :is() or a :where() argument writes...")` case)
  - Before: `expect(collectMatchingClasses(...))...` (every occurrence in that case)
  - After: `expect(collectAttributionClasses(...))...` (every occurrence in that case)

`grep -rn collectMatchingClasses tests guides src` returns nothing after the rename.

## Item 2 — replace the reader's summary sentence

- `tests/setupServer.ts:1854`
  - Before: `` * Collects every class a selector writes, reading through `:is()` and `:where()` arguments.``
  - After: `` * Collects every class a selector writes at its own level or inside an `:is()` or a `:where()``
    `` * argument.``

## Gate table

| Gate | Log | Result |
| --- | --- | --- |
| `./node_modules/.bin/oxfmt --config .oxfmtrc.json` (owned files) | `tmp/units/lad-4-oxfmt.log.txt` | exit=0 |
| `npm run check` | `tmp/units/lad-4-check.log.txt` | exit=0 |
| `npm run lint:check` | `tmp/units/lad-4-lint.log.txt` | exit=0 |
| `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check` (owned files) | `tmp/units/lad-4-oxfmt-check.log.txt` | exit=0, unchanged |
| `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts` | `tmp/units/lad-4-vitest.log.txt` | exit=0, 118 passed |
| `npm run test:conformance` | `tmp/units/lad-4-conformance.log.txt` | first run timed out on one test at 10100ms under load; re-run alone exit=0, 29 passed |
| `npm run test:policy` | `tmp/units/lad-4-policy.log.txt` | exit=0, 109 passed, 1 skipped |

The `test:conformance` gate's first run failed one test on a 10100ms timeout while other gates ran
concurrently in the same container; a re-run alone, with no other gate running, passed every test.
This is a timeout under load, which the brief's deviation contract excludes from a stop.

## Artifacts

- Diff: `tmp/units/lad-4.diff` (`git diff 2376710`)
- Status: `tmp/units/lad-4-status.txt`
