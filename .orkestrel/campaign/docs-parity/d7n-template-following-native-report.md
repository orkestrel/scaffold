# Template GuideCommand adoption report

## Outcome

The package-owned guide entry now runs through `GuideCommand`. Static runtime imports are limited to the command, inventory reader, and Vitest runner. Alias, contract, Guide core, test helper, and Vitest runtime imports occur inside the command callback.

The package-specific direct-declaration, internal-declaration, barrel, hidden-declaration, surface-population, summary-population, and executable-fence assertions remain active. `report.declarations` is not asserted because the predecessor did not own that policy.

The owned file is frozen. Root-owned repairs in `package.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts` remain untouched. No shared-file patch is required.

## Owned change

- `C:/Users/mikes/WebstormProjects/template/tests/guides.test.ts`

Diffstat:

```text
tests/guides.test.ts | 563 +++++++++++++++++++++------------------------------
1 file changed, 227 insertions(+), 336 deletions(-)
```

Dispatch artifact:

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-template-following-native-report.md`

## Obligation map

| Predecessor obligation | GuideCommand successor |
| --- | --- |
| Read source, guide, test, README, and manifest inventory | `GuideCommand` receives the package root, exact inventory patterns, `readInventory`, module map, and language policy. |
| Require a usable manifest and the Template row | `report.input` must be empty; `rows` must be populated and contain `guides/template.md`. |
| Bind the package manifest to the documented package | Parsed `package.json` must be a record and its `name` must equal `PACKAGE_NAME`; the core module map uses the same constant. |
| Require a matching guide/source example title | `report.examples.titles` must have no Template finding. |
| Match the README pitch to the Template tagline | `report.pitch` must be empty after the manifest identity assertion. |
| Admit only the package's fence language | `report.fences` must have no finding for the row. |
| Require a documented and summarized public surface | The direct `guide.surface()` population assertion remains; guide and source surface symbols still require summaries. |
| Keep direct exports, barrel reachability, documentation, and `INTERNAL` in parity | The original `findMissingSymbols` assertions remain against each fresh row source. |
| Reject hidden module-scope declarations | The original `source.hidden().map(computeSymbolKey)` assertion remains. |
| Require populated method groups and exact interface/class method parity | `report.sections` and `report.methods` must have no row finding. |
| Keep summary cells and the titled example equal to source | `report.drift` must have no row finding. |
| Require executable evidence for Surface functions and methods | `report.examples.fences`, `report.examples.functions`, and `report.examples.methods` must have no row finding. |
| Validate mapped self imports | `report.imports` must have no row finding. |
| Resolve guide links and documented test links | `report.links` and `report.tests` must have no row finding. |
| Execute the Template surface, constants, errors, helpers, shaper, factories, and behavioral contracts | Every existing flagship case and assertion remains inside the callback against the real `@src/core` barrel. |

The successor does not assert `report.declarations` and does not add a package-level parser, wrapper, or setup module.

## Defect proof

The accepted pre-edit native receipt recorded the static alias import failing before Vitest loaded:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 1
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\template\tests\guides.test.ts
Test Files: not collected
```

The same native command passes after moving alias imports into the GuideCommand worker callback:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 0
Test Files  1 passed (1)
Tests  28 passed (28)
Duration  799ms
```

The package script also passes:

```text
npm run test:guides
exit code: 0
Test Files  1 passed (1)
Tests  28 passed (28)
Duration  696ms
```

Scoped checks:

```text
.\\node_modules\\.bin\\oxfmt.cmd --config .oxfmtrc.json --check tests/guides.test.ts
exit code: 0
All matched files use the correct format.

.\\node_modules\\.bin\\oxlint.cmd --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit code: 0

git diff --check -- tests/guides.test.ts
exit code: 0
```

## Historical evidence

The retained Template audit verdict, convergence fix brief, closing brief, closing checker brief, verification brief, closure verdict, checker result, and verifier result were present and read. The historical closure accepted the predecessor's parity and executable obligations. Current owner direction supersedes its exact entry placement.

## Status

Done: adopted the native command, preserved the predecessor obligations, added manifest identity, and passed the scoped validation.

Not done: full gates, generated-file cleanup, release metadata, and independent acceptance remain root-owned by dispatch.
