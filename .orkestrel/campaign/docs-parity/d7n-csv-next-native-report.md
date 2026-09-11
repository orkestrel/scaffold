# Report — `d7n-csv-next-native`

## Outcome

`tests/guides.test.ts` uses the accepted `GuideCommand` native entry. Native-safe host ports stay
static. The package barrel, Vitest registration, and test-only helpers load inside the command's
anonymous registration callback. The accepted Guide API and CSV public API did not change.

## Owned paths

- `C:/Users/mikes/WebstormProjects/csv/tests/guides.test.ts`

`tests/setup.ts` did not need a change. Shared-file patches: none.

The scoped diff measurement from
`git -C C:\Users\mikes\WebstormProjects\csv diff --numstat -- tests/guides.test.ts` was:

```text
123	230	tests/guides.test.ts
```

## Obligation mapping

| Prior obligation | Native registration |
| --- | --- |
| Inventory and concept manifest | Reads `files`, `rows`, and `report.input` from the fresh command context; pins `GUIDE_SPEC` in the joined rows. |
| Fence language | Reads `report.fences` for each joined guide. |
| Documented surface population | Retains the direct `row.guide.surface()` population assertion. |
| Direct declarations, barrel reachability, documentation membership, hidden declarations, and `INTERNAL` anti-staleness | Retains the package policy through `row.source`, `row.guide`, `findMissingSymbols`, and `computeSymbolKey`; the generic report cannot admit the package's `INTERNAL` exception. |
| Required sections and method population | Reads `report.sections`. |
| Interface, implementing-class, and declared-member parity | Reads `report.methods` and `report.declarations`. |
| Compared summaries and titled examples | Reads `report.drift`. |
| Executable example population, function examples, method examples, and title intersection | Reads `report.examples.fences`, `report.examples.functions`, `report.examples.methods`, and `report.examples.titles`. |
| Self imports | Reads `report.imports` under the existing `MODULES` policy. |
| Relative links and test links | Reads `report.links` and `report.tests`. |
| README pitch | Reads `report.pitch`. |
| Executable CSV and README cases | Preserves each original case and assertion; the cases use the dynamically imported `@src/core` barrel and fresh command inventory. |

## Defect proof

The exact command was `node --experimental-strip-types tests/guides.test.ts`.

| Reading | Exit | Measured result |
| --- | --- | --- |
| Before, from `tmp/pass/d7n-csv-next-native-before` | 1 | `ERR_MODULE_NOT_FOUND`: Node could not resolve `@src/core` before Vitest collection. The runner emitted no test total. |
| After | 0 | `Test Files  1 passed (1)` and `Tests  34 passed (34)`; duration `711ms`. |

## Scoped validation

| Command | Exit | Result |
| --- | --- | --- |
| `node --experimental-strip-types tests/guides.test.ts` | 0 | Native command ran the guides project; `34 passed (34)`. |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | 0 | No diagnostics. |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | 1 | Formatting differs where the existing flagship block moved under the command callback. Root directed this unit to report formatting-only differences and freeze for the scoped root formatter pass. |
| `git -C C:\Users\mikes\WebstormProjects\csv diff --check -- tests/guides.test.ts` | 0 | No whitespace-error diagnostics. |
| `git -C C:\Users\mikes\WebstormProjects\csv status --short` | 0 | ` M tests/guides.test.ts` |

## Historical evidence

The retained `d7n-csv-closure-verdict.md`, `d7n-csv-close-brief.md`,
`d7n-csv-converge-fix-brief.md`, `d7n-csv-close-check-brief.md`, `d7n-csv-verify-brief.md`,
`d7n-csv-closure-checker-csv.md`, and `d7n-csv-closure-verifier-csv.md` files were present and
read. The expected `d7n-csv-audit-verdict.md` filename was absent and was not guessed.

## Limits

The root session owns scoped formatting, full integration gates, manifest and lock changes, script
retirement, review, and acceptance. This unit ran no install, build, tree-wide gate, or Git mutation.
