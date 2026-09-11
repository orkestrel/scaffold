# Pool GuideCommand adoption report

## Outcome

The Pool guide-parity entry now uses `GuideCommand` with the package's existing module and language policies. The predecessor's package-owned surface, barrel, method, inventory, pitch, example, and executable-fence obligations remain active.

The owned file is frozen. The required native entry, scoped format check, scoped lint check, and diff hygiene pass.

## Scope and state

Owned path:

- `C:/Users/mikes/WebstormProjects/pool/tests/guides.test.ts`

Root-owned paths preserved without edits from this unit:

- `C:/Users/mikes/WebstormProjects/pool/package.json`
- `C:/Users/mikes/WebstormProjects/pool/tests/config.test.ts`
- `C:/Users/mikes/WebstormProjects/pool/tests/setupPolicy.ts`

Shared-file patches: none.

Owned diffstat:

```text
tests/guides.test.ts | 379 ++++++++++++++++++---------------------------------
1 file changed, 135 insertions(+), 244 deletions(-)
```

Final repository status:

```text
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/setupPolicy.ts
```

## Obligation map

| Predecessor obligation | Native GuideCommand adoption |
| --- | --- |
| Read source, test, guide, root Markdown, and manifest inventory | `GuideCommand` receives the required patterns and `readInventory`; its callback receives fresh `files`, `rows`, and `report`. |
| Parse and require the Pool manifest row | `report.input` must have no finding; `rows` must contain `GUIDE_SPEC`; `own.entry.source` remains `src/core`. |
| Bind the manifest to Pool's package identity | Native `JSON.parse` assigns to `unknown`; inline object, array, null, and `name` narrowing precedes the assertion that `manifest.name` equals `PACKAGE_NAME`. No Contract import or dependency was added. |
| Preserve the exact self-import mapping | `MODULES` still maps `@orkestrel/pool` and `@src/core` to `src/core`; the package key derives from `PACKAGE_NAME`. |
| Reject unlisted fence languages | `report.fences` must have no finding for the Pool row. |
| Require a documented surface and populated summaries | The guide surface remains non-empty; guide and public source symbols must carry summaries. |
| Keep direct declarations, the barrel, and the guide surface aligned | The predecessor's `source.exports()`, `source.surface()`, `guide.surface()`, `findMissingSymbols`, and `INTERNAL` anti-staleness assertions remain. |
| Reject hidden declarations | The predecessor's `source.hidden().map(computeSymbolKey)` assertion remains. |
| Require documented method groups and class/interface parity | `report.sections` and `report.methods` must have no finding. `report.declarations` is intentionally absent because it would add predecessor-absent obligations. |
| Match summaries and titled examples to source | `report.drift` and `report.examples.titles` must have no finding. |
| Require function and method examples | `report.examples.fences`, `report.examples.functions`, and `report.examples.methods` must have no finding. |
| Validate self imports, relative links, and test links | `report.imports`, `report.links`, and `report.tests` must have no finding. |
| Match the README pitch to the Pool guide tagline | `report.pitch` must have no finding, alongside the explicit package-name assertion. |
| Execute the Pool boundary fence | The `PoolError`, `isPoolError`, `isPoolMax`, and `isPoolSignal` assertions and their guide-text presence guards remain inside the command callback. |

The historical closing brief, checker brief, verifier brief, reports, and closure verdict are present. The historical closure records Pool as closed at `3c9e926`. The current owner direction supersedes its old exact drop-in placement while preserving the accepted package assertions.

## Validation

Retained native baseline from `tmp/pass/d7n-pool-following-native-before`:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 1
test files collected: 0
tests collected: 0
error: ERR_MODULE_NOT_FOUND for @src/core before Vitest loaded
```

Scoped checks after the edit:

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
exit code: 0
result: All matched files use the correct format.

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit code: 0
```

Required native entry after the edit:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 0
test files: 1 passed (1)
tests: 22 passed (22)
duration: 626ms
```

Static-import inspection found the required runtime imports from `@orkestrel/guide/server`, `@orkestrel/test/server`, and `vitest/node`. Guide helpers, test helpers, the Pool alias, and Vitest assertions load dynamically inside the callback.

`git diff --check` exits `0` with no output.

## Deviation record

Expected: the native command reaches Vitest through `GuideCommand` and passes while Pool's predecessor obligations remain.

Found: the native command passes with the expected package-owned assertions registered from fresh command context.

Done: the bounded native adoption, scoped validation, status audit, and evidence report.

Not done: root-owned repairs, full-tree gates, formatting outside the owned test, dependency changes, release metadata, and `scripts/docs.ts` handling.

Hypothesis: none; scoped reality matches the brief.
