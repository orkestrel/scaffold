# Reason native guides entry report

## Outcome

Adopted `GuideCommand` in `C:/Users/mikes/WebstormProjects/reason/tests/guides.test.ts`. Static runtime imports are limited to `GuideCommand`, `readInventory`, and `createVitest`; source, setup, Guide helpers, test, and contract imports occur inside the async command callback.

The command uses the accepted inventory patterns, existing module and language policies, fresh callback files and rows, and the generic report. The inventory-backed package manifest asserts `manifest.name === PACKAGE_NAME` before the pitch report is accepted. Reason's executable fence transcriptions remain in place.

The root-owned `package.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts` edits remain untouched. `scripts/docs.ts` was not touched.

## Obligation map

| Predecessor obligation | Owner after adoption |
| --- | --- |
| Inventory and manifest inputs | `GuideCommand`, `readInventory`, callback `files`, callback `rows`, and `report.input` |
| Published and alias module environments | Existing `MODULES` passed to the command |
| Guide-title and source-example population | `report.examples.titles` |
| README pitch and package identity | `report.pitch` plus inventory-backed `manifest.name` assertion |
| Fence languages | `report.fences` |
| Non-empty documented surface | Retained direct guide assertion |
| Direct declaration, barrel, guide surface, `INTERNAL`, and anti-staleness policy | Retained `findMissingSymbols` assertions |
| Hidden declarations | Retained source assertion |
| Method population and class/interface parity | `report.sections` and `report.methods` |
| Summary and titled-example equality | `report.drift` |
| Function and method example evidence | `report.examples.functions` and `report.examples.methods` |
| Fence imports, links, and test links | `report.imports`, `report.links`, and `report.tests` |
| Reason guide behavior | Retained executable flagship cases with real implementations |

`report.declarations` was not adopted because it would add obligations absent from the predecessor.

## Historical material

The retained Reason campaign includes its audit verdict, closing briefs and reports, checker and verifier records, verify brief and report, and closure verdict. The repair receipts under `tmp/pass/d7n-reason-following-repair/` supplied the root-owned repair state.

## Exact evidence

Red baseline:

```text
node --experimental-strip-types tests/guides.test.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\reason\tests\guides.test.ts
exit 1
```

Same command after adoption:

```text
Test Files  1 passed (1)
Tests       30 passed (30)
Duration    1.17s
exit 0
```

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
All matched files use the correct format.
exit 0
```

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

```text
git -C C:\Users\mikes\WebstormProjects\reason diff --check -- tests/guides.test.ts
exit 0
```

No package-wide or fleet-wide gate ran.

## Owned diff and status

```text
tests/guides.test.ts | 965 +++++++++++++++++++++++----------------------------
1 file changed, 428 insertions(+), 537 deletions(-)
```

```text
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/setupPolicy.ts
```

Only `tests/guides.test.ts` belongs to this unit. The other status entries are root-owned.

## Shared-file patches

None.
