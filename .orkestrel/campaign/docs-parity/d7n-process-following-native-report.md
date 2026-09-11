# Process GuideCommand adoption report

## Outcome

The Process guide-parity entry now runs through `GuideCommand` with the existing core and server module policies. The package-owned face isolation, per-face barrel controls, export-map identity, public-specifier rule, test inventory, executable fence transcriptions, unfenced TSDoc examples, and README assertions remain active.

The owned file is frozen. The required native entry, scoped format check, scoped lint check, and diff hygiene pass.

## Scope and state

Owned path:

- `C:/Users/mikes/WebstormProjects/process/tests/guides.test.ts`

Root-owned paths preserved without edits from this unit:

- `C:/Users/mikes/WebstormProjects/process/package.json`
- `C:/Users/mikes/WebstormProjects/process/tests/config.test.ts`
- `C:/Users/mikes/WebstormProjects/process/tests/setupPolicy.ts`

Shared-file patches: none.

Owned diffstat:

```text
tests/guides.test.ts | 2548 ++++++++++++++++++++++++--------------------------
1 file changed, 1222 insertions(+), 1326 deletions(-)
```

The callback now owns the prior package suites, so formatting records their indentation as part of the owned diff.

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
| Read source, test, guide, root Markdown, and manifest inventory | `GuideCommand` receives the required patterns and `readInventory`; its callback receives fresh `files`, `rows`, `report`, and `root`. |
| Parse and require the Process manifest row | `report.input` must have no finding; `rows` must contain `GUIDE_SPEC`; `own.entry.source` remains `src/core` plus `src/server`. |
| Bind the package manifest to Process identity | Declared Contract primitives parse and narrow the `package.json` inventory; `manifest.name` must equal `PACKAGE_NAME`. |
| Preserve the published module map | `MODULES` still maps `@orkestrel/process` to `src/core` and `@orkestrel/process/server` to `src/server`; the core key derives from `PACKAGE_NAME`. |
| Reject unlisted fence languages | `report.fences` must have no finding for the Process row. |
| Require a documented surface and populated summaries | The guide surface remains non-empty; guide and public source symbols must carry summaries. |
| Keep direct declarations, the combined barrel, and the guide surface aligned | The predecessor's `source.exports()`, `source.surface()`, `guide.surface()`, `findMissingSymbols`, `INTERNALS`, and flattened `INTERNAL` anti-staleness assertions remain. |
| Preserve separate core and server faces | `FACES`, `SOURCES`, `REFUSALS`, and the neighbouring-face checks remain. Each face receives its own public `Source` over fresh command inventory. |
| Prove per-face barrel reflection does not hide stranded declarations | `POPULATIONS` retains the live face rows, stranded-server fixture, combined-scope control, non-empty populations, expected stranded declarations, and expected phantom symbols. |
| Bind package exports to the face map | The package export-key assertion reads the narrowed command inventory manifest and derives keys from `FACES` and `PACKAGE_NAME`. |
| Reject hidden declarations | The predecessor's `source.hidden().map(computeSymbolKey)` assertion remains. |
| Require documented method groups and class/interface parity | `report.sections` and `report.methods` must have no finding. `report.declarations` is intentionally absent because it would add predecessor-absent obligations. |
| Match summaries and titled examples to source | `report.drift` and `report.examples.titles` must have no finding. |
| Require function and method examples | `report.examples.fences`, `report.examples.functions`, and `report.examples.methods` must have no finding. The Process-specific non-empty Surface-function population assertion remains. |
| Validate mapped self imports, relative links, and test links | `report.imports`, `report.links`, and `report.tests` must have no finding. |
| Reject repository aliases and unmapped Process subpaths | The predecessor's comment-aware import projection and `SOURCES` membership rule remain. |
| Require the guide to list the package's test files apart from declared workspace proofs | The predecessor's `UNLISTED_TESTS` membership and anti-staleness assertions remain. |
| Match the README pitch to the Process guide tagline | `report.pitch` must have no finding, alongside the explicit package-name assertion. |
| Execute Process guide claims | The existing flagship fence transcriptions and unfenced TSDoc example suites remain inside the command callback. |
| Validate README tokens and links | The existing published-name, documented-name, and foreign-token assertions remain. README relative links still use native filesystem existence under fresh `root`, preserving files such as `LICENSE` that the command inventory patterns do not include. |

The historical audit verdict, fix and closing briefs, checker and verifier briefs, reports, and closure verdict are present. The closure records Process as closed at `6a7f96f`; the checker issue concerns counts in the historical fix report's prose, while its implementation claims passed. The current owner direction supersedes the historical exact drop-in placement.

## Validation

Retained native baseline from `tmp/pass/d7n-process-following-native-before`:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 1
test files collected: 0
tests collected: 0
error: ERR_MODULE_NOT_FOUND for @src/core before Vitest loaded
```

The first native run after command adoption exposed the README inventory distinction:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 1
test files: 1 failed (1)
tests: 1 failed | 95 passed | 2 skipped (98)
failure: README > resolves every relative link
received missing path: LICENSE
```

The README check now resolves each relative target from fresh command `root` and tests native filesystem existence. The same command passes:

```text
node --experimental-strip-types tests/guides.test.ts
exit code: 0
test files: 1 passed (1)
tests: 96 passed | 2 skipped (98)
duration: 3.64s
```

Scoped checks after the edit:

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
exit code: 0
result: All matched files use the correct format.

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit code: 0
```

Static-import inspection found the required runtime imports from `@orkestrel/guide/server`, `@orkestrel/test/server`, and `vitest/node`. Node host primitives, Contract primitives, Guide helpers, test helpers, Process aliases, and Vitest assertions load dynamically inside the callback.

`git diff --check` exits `0` with no output.

## Deviation record

Expected: the native command reaches Vitest through `GuideCommand` and passes while the predecessor's generic and package-specific obligations remain.

Found: the first adopted run showed that command inventory does not include the README-linked `LICENSE`; restoring the predecessor's native filesystem check closed that gap, and the rerun passes.

Done: the bounded native adoption, preservation repair, scoped validation, status audit, and evidence report.

Not done: root-owned repairs, full-tree gates, formatting outside the owned test, dependency changes, release metadata, and `scripts/docs.ts` handling.

Hypothesis: none; scoped reality matches the brief after preserving the README inventory distinction.
