# Markdown native guides entry report

## Outcome

Adopted the accepted `GuideCommand` entry in `C:/Users/mikes/WebstormProjects/markdown/tests/guides.test.ts`.

The entry now uses only `GuideCommand`, `readInventory`, and `createVitest` as static runtime imports. Alias, Vitest, package dependency, and setup runtime imports occur inside the async `execute` callback. The command receives the accepted root, patterns, module map, language policy, inventory reader, and Vitest runner.

The Markdown-specific helper declarations moved to `tests/setupGuides.ts`. This keeps them at module scope while the guide entry imports the setup module dynamically. Their behavior and the executable fence assertions remain unchanged.

The package identity check reads `package.json` from command inventory and asserts `manifest.name` against `PACKAGE_NAME` before accepting the native pitch report.

## Scope

Writable package paths:

- `C:/Users/mikes/WebstormProjects/markdown/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/markdown/tests/setupGuides.ts`

The root-owned changes to `package.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts` remain present and untouched. No manifest, lockfile, source, guide, generated config, script, or release metadata changed in this unit.

## Historical record availability

The retained campaign supplied the close brief, close check brief, close report, closure checker reports, closure verifier reports, closure verdict, verify brief, verify report, artifact-stage briefs, artifact-stage reports, and artifact-stage verdict under `.orkestrel/campaign/docs-parity/`.

A retained file named `d7n-markdown-audit-verdict.md` was not present in the bounded `d7n-markdown` artifact search. I used the retained closure checker and closure verdict files without inventing a replacement.

The repair receipts under `tmp/pass/d7n-markdown-following-repair/` record the root-owned command change and policy-test repairs. They also identify `scripts/docs.ts` as foreign. This unit did not touch that script.

## Obligation map

| Predecessor obligation | Native or retained owner |
| --- | --- |
| Read guide, source, test, root Markdown, and package inventory | `GuideCommand` `patterns`, `readInventory`, callback `files`, and callback `rows` |
| Resolve published and source-alias Markdown guide imports | Existing `MODULES` map passed directly to `GuideCommand` |
| Reject invalid command input and an empty manifest | `report.input`, callback `rows`, and the retained `GUIDE_SPEC` row assertion |
| Pair guide fence titles with source example titles | `report.examples.titles` |
| Keep the README pitch equal to the guide tagline | `report.pitch`, guarded by the inventory-backed `manifest.name === PACKAGE_NAME` assertion |
| Restrict fence languages | `report.fences` |
| Require a documented surface | Retained direct `guide.surface()` population assertion |
| Keep direct declarations, barrels, and guide surfaces in parity | Retained `findMissingSymbols` assertions because the `INTERNAL` exception and its anti-staleness rule are package policy |
| Reject hidden module declarations | Retained direct `source.hidden()` assertion |
| Require populated method sections | `report.sections` |
| Keep documented methods, behavioral interfaces, and implementing classes in parity | `report.methods` |
| Keep summaries and titled examples equal to source documentation | `report.drift` |
| Require function and method examples | `report.examples.functions` and `report.examples.methods` |
| Validate fenced imports across the existing module environments | `report.imports` |
| Resolve relative links and linked tests | `report.links` and `report.tests` |
| Execute Markdown guide claims against real implementations | Retained flagship fence cases inside the command callback |
| Keep named fence helpers out of nested scope | `tests/setupGuides.ts`, dynamically imported by the callback |

`report.declarations` was not adopted because it is broader than the predecessor contract. The accepted `report.methods` collection preserves the method/class/interface obligation without adding declaration-driven method-table policy.

## Baseline and validation

The retained red baseline ran:

```text
node --experimental-strip-types tests/guides.test.ts
```

It exited `1` before test collection with:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\markdown\tests\guides.test.ts
```

The same command after the change exited `0`:

```text
Test Files  1 passed (1)
Tests       61 passed (61)
Duration    893ms
```

Scoped format check:

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts tests/setupGuides.ts
All matched files use the correct format.
exit 0
```

Scoped lint check:

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts tests/setupGuides.ts
exit 0
```

Owned diff check:

```text
git -C C:\Users\mikes\WebstormProjects\markdown diff --check -- tests/guides.test.ts tests/setupGuides.ts
exit 0
```

No package-wide or fleet-wide gate ran. The root owner retains those gates.

## Owned diff and status

Tracked path:

```text
tests/guides.test.ts | 1221 ++++++++++++++++++++++----------------------------
1 file changed, 532 insertions(+), 689 deletions(-)
```

New setup path:

```text
NUL => tests/setupGuides.ts | 41 +++++++++++++++++++++++++++++++++++++++++
1 file changed, 41 insertions(+)
```

```text
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/setupPolicy.ts
?? tests/setupGuides.ts
```

The package status includes the named root-owned repair paths. This unit owns only `tests/guides.test.ts` and `tests/setupGuides.ts`.

## Shared-file patches

None.
