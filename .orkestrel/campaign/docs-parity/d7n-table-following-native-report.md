# Table native guides entry report

## Outcome

Adopted `GuideCommand` in `C:/Users/mikes/WebstormProjects/table/tests/guides.test.ts`. Static runtime imports are limited to the command, inventory reader, and Vitest runner. Alias, setup, test, contract, and Guide helper imports occur in the async callback.

The command uses the accepted inventory patterns and Table's existing module and language policies. Fresh files, rows, and the generic report replace shared inventory and parity work. The package manifest comes from inventory and asserts `manifest.name === PACKAGE_NAME` before pitch acceptance.

Table-specific README fence import checks, manifest-path distinctions, `INTERNAL` policy, and executable Table and README transcriptions remain.

## Obligation map

| Prior obligation | Owner |
| --- | --- |
| Inputs and manifest | command inventory, rows, and `report.input` |
| Titles and pitch | `report.examples.titles`, `report.pitch`, and package identity assertion |
| Languages and methods | `report.fences`, `report.sections`, and `report.methods` |
| Surface and internal policy | retained direct source/guide assertions |
| README imports and manifest paths | retained Table-specific assertions |
| Drift and function examples | `report.drift` and `report.examples.functions` |
| Remaining predecessor examples, imports, and links | retained public primitive assertions |
| Runtime guide claims | retained Table and README executable cases |

`report.declarations` was not adopted.

## Evidence

```text
node --experimental-strip-types tests/guides.test.ts
baseline: ERR_MODULE_NOT_FOUND @src/core, exit 1
after: Test Files 1 passed (1); Tests 60 passed (60); exit 0
```

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
All matched files use the correct format. exit 0
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
git -C C:\Users\mikes\WebstormProjects\table diff --check -- tests/guides.test.ts
exit 0
```

The root-owned package and policy repair edits remain untouched. No full gates ran.

## Diff and status

```text
tests/guides.test.ts | 1476 ++++++++++++++++++++++++--------------------------
1 file changed, 715 insertions(+), 761 deletions(-)
```

Status also retains root-owned `package.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts` edits.

## Shared-file patches

None.
