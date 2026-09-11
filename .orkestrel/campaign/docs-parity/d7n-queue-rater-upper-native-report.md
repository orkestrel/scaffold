# Report — Queue and Rater native guide entries

The native Guide entry now owns fresh inventory and test registration in Queue and Rater. The
change keeps the predecessor policy and flagship behavior. It does not change source, guides,
manifests, locks, vendored files, or refs.

## Baselines and tooling

Queue stayed at `1ae3fa1aeb69801db52d6132441354b199142714`. Rater stayed at
`76fab91d0ba9e42781e125f43f78afa522e815e0`. Their worktrees were clean before the edit.

The installed tooling is Guide `0.0.18` and Scaffold `0.0.64`. The current manifest hashes equal
the published-tooling receipts:

```text
queue/package.json       f3479d112dbce3051563ea94add3fc699ec0fe41d93977e4b8927f473f929e13
queue/package-lock.json  90f2db0298f9fa6297461795a1aa808f4fec73bcc51dfb9bea4ea08b4eda1d3e
rater/package.json       208d4ef8b3ad6b431506131d2f58da67ee46dc8ccbd017d258ccf71974e42f30
rater/package-lock.json  a50a31c459a51bb2be5b7fe5322a2c1a4659ac6186d0af63ed731db843763d0f
```

## Changed paths

- `C:/Users/mikes/WebstormProjects/queue/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/rater/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-queue-rater-upper-native-report.md`

Scoped diffstats:

```text
queue/tests/guides.test.ts | 477 +++++++++++++++++++++++----------------------------
1 file changed, 214 insertions(+), 263 deletions(-)

rater/tests/guides.test.ts | 632 ++++++++++++++++++++++++---------------------------
1 file changed, 292 insertions(+), 340 deletions(-)
```

## Assertion mapping

| Predecessor policy | Native form |
| --- | --- |
| Manifest input and own row | `report.input`, non-empty `rows`, and the `GUIDE_SPEC` row |
| Titled example intersection | `report.examples.titles` scoped to `GUIDE_SPEC` |
| README pitch and guide tagline | parsed `package.json` name bound to `PACKAGE_NAME`, then `report.pitch` |
| Fence languages | `report.fences` scoped to the row spec |
| Surface population | `guide.surface()` remains non-empty |
| Direct declarations, barrel exports, internal names, hidden declarations | original `Source` and comparison leaves |
| Method-group population and interface/class parity | original `guide.methods()`, `source.methods()`, and `findMissing()` traversal |
| Summary and titled-example equality | `report.drift` scoped to the row spec |
| Surface function examples | `report.examples.functions` scoped to the row spec |
| Method examples | original per-group `findUnexampled()` traversal |
| Fence imports | original `extractFenceImports()` and mapped `Source` traversal |
| Relative links and test links | original `guide.links()`, `guide.tests()`, `resolveLink()`, and `source.exists()` traversals |
| Queue flagship behavior | original option guards, helper calls, and real memory store block |
| Rater flagship behavior | original rating, error, validator, definition, evidence, worksheet, total, and overload block |

The tests do not assert `report.sections`, `report.imports`, `report.links`, `report.tests`, or
`report.declarations`. This avoids the newer population and declaration policy while preserving
the predecessor checks through public leaves.

## Defect receipts

The recorded Queue command before the fix was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 1
ERR_MODULE_NOT_FOUND: Cannot find package '@src/core'
collection did not start; no failing-test measurement was produced
```

The same Queue command after the fix was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 0
Test Files  1 passed (1)
Tests       29 passed (29)
Duration    680ms
```

The recorded Rater command before the fix was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 1
ERR_MODULE_NOT_FOUND: Cannot find package '@src/core'
collection did not start; no failing-test measurement was produced
```

The same Rater command after the fix was:

```text
node --experimental-strip-types tests/guides.test.ts
exit 0
Test Files  1 passed (1)
Tests       29 passed (29)
Duration    705ms
```

## Scoped validation

Queue:

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
exit 0
All matched files use the correct format.

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
no diagnostics

git -C C:/Users/mikes/WebstormProjects/queue diff --check -- tests/guides.test.ts
exit 0
no output

rg -n "report\.(sections|imports|links|tests|declarations)" tests/guides.test.ts
exit 1
no matches
```

Rater:

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
exit 0
All matched files use the correct format.

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
no diagnostics

git -C C:/Users/mikes/WebstormProjects/rater diff --check -- tests/guides.test.ts
exit 0
no output

rg -n "report\.(sections|imports|links|tests|declarations)" tests/guides.test.ts
exit 1
no matches
```

Final package status:

```text
git -C C:/Users/mikes/WebstormProjects/queue status --short
 M tests/guides.test.ts

git -C C:/Users/mikes/WebstormProjects/rater status --short
 M tests/guides.test.ts
```

## Deviation state

No deviation occurred. No shared-file patch is owed. Root retains source/release acceptance and
the full gates.
