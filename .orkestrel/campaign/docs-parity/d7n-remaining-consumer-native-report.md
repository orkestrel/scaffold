# Report — remaining consumer native guide entries

## Outcome

Relation, SEA, Server, and Workspace now invoke `GuideCommand` directly with `readInventory` and
`createVitest`. Runtime source, Vitest, and support imports occur inside the anonymous `execute`
callback. Workspace keeps its `WorkspaceEventMap` import as a type-only static import.

Each checkout was released after its owned test passed native execution, scoped formatting, and
scoped lint. No checkout will be revisited without a successor dispatch.

No source, guide, manifest, lock, vendored path, or ref changed. No dependency was installed. No
build, full suite, Git mutation, or publication ran. No shared-file patch is required.

## Predecessor assertion mapping

| Predecessor assertion | Native path |
| --- | --- |
| Manifest parses and carries an own guide | `report.input`, non-vacant `rows`, and the selected own row |
| Guide and source share a titled example | `report.examples.titles`, filtered to `GUIDE_SPEC` |
| README pitch equals the own guide tagline | parsed `package.json` identity plus `report.pitch` |
| Fence languages follow package policy | `report.fences`, filtered to the current row |
| Documented surface is populated | `guide.surface()` |
| Barrel, direct declaration, internal, and hidden relationships | `source.exports()`, `source.surface()`, `source.hidden()`, `findMissingSymbols`, and `INTERNAL` |
| Method-group population and interface/class membership | `guide.methods()`, `source.methods()`, and `findMissing` |
| Compared summaries and titled examples agree | `report.drift`, filtered to the current row |
| Surface functions carry examples | `report.examples.functions`, filtered to the current row |
| Documented methods carry examples | `guide.fences()`, `source.examples()`, and `findUnexampled` |
| Fence self imports name real exports | `extractFenceImports`, `sources.source()`, and public source surfaces |
| Relative links and test links resolve | `guide.links()`, `guide.tests()`, `resolveLink`, and `source.exists()` |
| Package-specific documented values are true | Existing executed flagship suites, unchanged apart from callback nesting and runtime import placement |

No assertion reads `report.declarations` or the aggregate `report.sections`, `report.imports`,
`report.links`, or `report.tests` channels. No finding is filtered by message text.

## Relation

Baseline: `d6945c924b7f56df5c8e44e0937ca03fe736d272`.

Changed path:

```text
tests/guides.test.ts
```

Recorded diffstat at ownership release:

```text
tests/guides.test.ts | 519 +++++++++++++++++++++++----------------------------
1 file changed, 236 insertions(+), 283 deletions(-)
```

The retained red receipt ran:

```text
node --experimental-strip-types tests/guides.test.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\relation\tests\guides.test.ts
exit 1
Tests: not reported; module resolution stopped before collection.
```

The migrated command ran:

```text
node --experimental-strip-types tests/guides.test.ts
Test Files  1 passed (1)
Tests  32 passed (32)
Duration  682ms
exit 0
```

Scoped checks:

```text
npx oxfmt --check tests/guides.test.ts
All matched files use the correct format.
exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

The existing descriptor, relation-map, through-arm, coded-error, and real database-manager cases
remain registered through the native callback.

Deviation: none.

## SEA

Baseline: `76cfbe2ce6a212cd5c5afc1831c196a75576c3eb`.

Changed path:

```text
tests/guides.test.ts
```

Recorded diffstat at ownership release:

```text
tests/guides.test.ts | 508 +++++++++++++++++++++++----------------------------
1 file changed, 231 insertions(+), 277 deletions(-)
```

The retained red receipt ran:

```text
node --experimental-strip-types tests/guides.test.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/server' imported from C:\Users\mikes\WebstormProjects\sea\tests\guides.test.ts
exit 1
Tests: not reported; module resolution stopped before collection.
```

The migrated command ran:

```text
node --experimental-strip-types tests/guides.test.ts
Test Files  1 passed (1)
Tests  37 passed (37)
Duration  904ms
exit 0
```

Scoped checks:

```text
npx oxfmt --check tests/guides.test.ts
All matched files use the correct format.
exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

The existing compression, alignment, executable-format, signing, asset, and platform cases remain
registered through the native callback.

Deviation: none.

## Server

Baseline: `9d35664f09521a754bfa39094fee017aa5125070`.

Changed path:

```text
tests/guides.test.ts
```

Recorded diffstat at ownership release:

```text
tests/guides.test.ts | 591 ++++++++++++++++++++++++---------------------------
1 file changed, 274 insertions(+), 317 deletions(-)
```

The retained red receipt ran:

```text
node --experimental-strip-types tests/guides.test.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/server' imported from C:\Users\mikes\WebstormProjects\server\tests\guides.test.ts
exit 1
Tests: not reported; module resolution stopped before collection.
```

The migrated command ran:

```text
node --experimental-strip-types tests/guides.test.ts
Test Files  1 passed (1)
Tests  37 passed (37)
Duration  859ms
exit 0
```

Scoped checks:

```text
npx oxfmt --check tests/guides.test.ts
All matched files use the correct format.
exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

The existing negotiation, format dispatch, token, decompression, listening lifecycle, cleanup, and
fence-presence cases remain registered through the native callback. `buildContext` is loaded inside
that callback.

Deviation: none.

## Workspace

Baseline: `eb02ec035b7989d7b0b0ec9f38549561bd6edf70`.

Changed path:

```text
tests/guides.test.ts
```

Recorded diffstat at ownership release:

```text
tests/guides.test.ts | 752 ++++++++++++++++++++++++---------------------------
1 file changed, 353 insertions(+), 399 deletions(-)
```

The retained red receipt ran:

```text
node --experimental-strip-types tests/guides.test.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\workspace\tests\guides.test.ts
exit 1
Tests: not reported; module resolution stopped before collection.
```

The migrated command ran:

```text
node --experimental-strip-types tests/guides.test.ts
Test Files  1 passed (1)
Tests  40 passed (40)
Duration  769ms
exit 0
```

Scoped checks:

```text
npx oxfmt --check tests/guides.test.ts
All matched files use the correct format.
exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

The existing file/content, editing, search, move/remove, lifecycle, registry, memory-store,
database-store, coded-failure, and README cases remain registered through the native callback.
Real resources and cleanup behavior are unchanged.

Deviation: none.

## Formatting note

The scoped formatter normalized the complete owned test files, so the recorded diffstats include
line-ending churn. The semantic diffs contain the native command wrapper, import relocation,
package identity binding, and matching report-channel substitutions described above.
