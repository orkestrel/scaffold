# Report — `d7n-lsp-upper-native`

## Scope

The package change touches `tests/guides.test.ts` only. The checkout remained at
`c4842c8d1473cc73a0b1e5c6c5fd64e405ad2792`; no commit or ref moved.

```text
$ git status --short
 M tests/guides.test.ts

$ git diff --stat -- tests/guides.test.ts
 tests/guides.test.ts | 416 +++++++++++++++++++--------------------------------
 1 file changed, 154 insertions(+), 262 deletions(-)

$ git diff --check -- tests/guides.test.ts
(no output)
exit 0
```

## Change

- `GuideCommand`, `readInventory`, and `createVitest` are the native-safe static imports.
- The command inventories `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, root Markdown, and
  `package.json`.
- Runtime Vitest, source-alias, contract, Guide-core, and test-helper imports run inside the
  anonymous asynchronous `execute` callback.
- The parsed real `package.json` value must be a record, and its `name` member must equal
  `@orkestrel/lsp` before the native pitch result can pass.
- The stale `npm run docs` references were replaced with the native-entry wording.
- No local command, path, inventory, parser, or Vitest wrapper remains.

## Preserved assertion mapping

| Existing policy | Native form |
| --- | --- |
| Manifest input and non-vacuity | `report.input`, `rows.length`, and the joined LSP row |
| Title intersection | `report.examples.titles` filtered to `guides/lsp.md` |
| README pitch | parsed manifest identity and `report.pitch` |
| Fence-language policy | `report.fences` per joined row |
| Nonempty documented surface | direct `guide.surface()` reading |
| Direct declarations, barrels, and `INTERNAL` | `findMissingSymbols` on the joined row's public `Source` |
| Hidden declarations | `source.hidden().map(computeSymbolKey)` |
| Documented method-group population | `report.sections` per joined row |
| Interface bijection and class extras | `report.methods` per joined row |
| Summary and titled-example equality | `report.drift` per joined row |
| Function examples | `report.examples.functions` per joined row |
| Method examples | `report.examples.methods` per joined row |
| Fence imports | `report.imports` per joined row |
| Relative links | `report.links` per joined row |
| Test links | `report.tests` per joined row |

The test does not read `report.declarations`; its method population remains driven by the groups
the guide documents. The direct public Guide leaves remain for the package-specific export and
internal policy.

The executed LSP cases remain unchanged in substance. The callback imports the real core source,
asserts `LSP_CAPABILITIES.general.positionEncodings` equals `['utf-16']`, slices the encoded frame
at `boundary` and `boundary + 4`, asserts the body length is `40`, and asserts the decoded method is
`initialized`. The guide sentence guards remain beside those executions.

## Feature red and green

The exact command ran before the edit and failed before Vitest collection, so the process emitted
no failing-test total:

```text
$ node --experimental-strip-types tests/guides.test.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from
C:\Users\mikes\WebstormProjects\lsp\tests\guides.test.ts
Node.js v24.20.0
exit 1
```

The same command after the edit and after formatting ran the guides worker:

```text
$ node --experimental-strip-types tests/guides.test.ts
Test Files  1 passed (1)
Tests  23 passed (23)
Duration  684ms (transform 91ms, setup 24ms, import 500ms, tests 7ms, environment 0ms)
exit 0
```

## Scoped validation

```text
$ npx oxfmt --config .oxfmtrc.json --write tests/guides.test.ts
Finished in 14ms on 1 files using 16 threads.
exit 0

$ npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
All matched files use the correct format.
Finished in 2ms on 1 files using 16 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
(no diagnostics)
exit 0
```

The manifest exposes workspace-wide TypeScript checks only. This unit did not run them because the
dispatch permits validation of the owned path only. The direct native command loaded and ran the
owned test through the real guides project.

No deviation occurred. This report supplies writer evidence only; it does not accept the change.
