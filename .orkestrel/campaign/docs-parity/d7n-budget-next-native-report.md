# Budget native GuideCommand adoption report

## Outcome

Budget's package-owned `tests/guides.test.ts` registers its retained parity and executable-guide obligations through the installed `GuideCommand` class. The native entry imports only `GuideCommand`, `readInventory`, and `createVitest` before command execution. Package aliases, setup runtime values, Guide helpers, Test helpers, and Vitest registration load inside the command's anonymous worker callback.

## Owned paths

- `C:/Users/mikes/WebstormProjects/budget/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-budget-next-native-report.md`

No shared-file patch is required. Budget's `tests/setup.ts` file remains unchanged.

## Obligation mapping

| Prior package calculation | Adopted registration |
| --- | --- |
| Direct inventory reads and manifest parsing | `GuideCommand` supplies fresh `files`, `rows`, and `report`; `report.input` and the `GUIDE_SPEC` row assertion preserve input and package-row policy. |
| Fence-language calculation | `report.fences`, filtered by the row spec. |
| Example-title intersection | `report.examples.titles`, filtered by `GUIDE_SPEC`. |
| README pitch and guide tagline comparison | `report.pitch`. |
| Behavioral-interface and implementing-class method calculation | `report.methods`, filtered by the row spec. |
| Summary and titled-example drift formatting | `report.drift`, filtered by the row spec. |
| Surface-function example calculation | `report.examples.functions`, filtered by the row spec. |
| Method example calculation | `report.examples.methods`, filtered by the row spec. |
| Mapped self-import resolution | `report.imports`, filtered by the row spec. |
| Relative-link and documented-test resolution | `report.links` and `report.tests`, filtered by the row spec. |
| Documented-surface population | The package assertion continues to read `row.guide.surface()`. |
| `INTERNAL` policy, anti-staleness, direct/barrel membership, and hidden declarations | The package assertions continue to use public `row.source` and `row.guide` projections because the generic surface report has no internal-declaration exception. |
| Budget fence behavior and transcription guards | The retained cases execute unchanged inside the worker callback with dynamic Budget and setup imports. |
| Module and language policy | `MODULES`, `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, and `GUIDE_SPEC` remain package-owned inputs to `GuideCommand`. |

## Defect proof

The same native command produced the red and green readings.

| State | Command | Exit | Failing or passing tally | Evidence |
| --- | --- | ---: | --- | --- |
| Before | `node --experimental-strip-types tests/guides.test.ts` | 1 | 1 native-entry failure | `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from .../tests/guides.test.ts`; Node `v24.20.0`. |
| After | `node --experimental-strip-types tests/guides.test.ts` | 0 | 26 passed | `Test Files 1 passed (1)`; `Tests 26 passed (26)`; duration `581ms`. |

## Scoped validation

| Command | Exit | Reading |
| --- | ---: | --- |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | 0 | `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | 0 | No diagnostics. |
| `git -C C:\Users\mikes\WebstormProjects\budget diff --check -- tests/guides.test.ts` | 0 | No whitespace errors. |
| `git -C C:\Users\mikes\WebstormProjects\budget status --short` | 0 | ` M tests/guides.test.ts` |

Diffstat: `tests/guides.test.ts | 569 ++++++++++++++++++++-------------------------------`; `222 insertions(+)`, `347 deletions(-)`.

## Authority and limits

The requested historical evidence resolved to `d7n-slice2-audit-verdict.md`, `d7n-budget-close-brief.md`, `d7n-budget-converge-fix-brief.md`, `d7n-budget-close-check-brief.md`, `d7n-budget-verify-brief.md`, `d7n-budget-closure-checker-budget.md`, and `d7n-budget-closure-verifier-budget.md`. Budget has no `ROADMAP.md` file.

No source, guide, README, manifest, lockfile, configuration, vendored file, or script changed. The native reading covers Windows with Node `v24.20.0`. Root owns package-wide integration, release gates, dependency pins, script retirement, independent review, and acceptance.
