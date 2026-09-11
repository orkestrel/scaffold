# Abort native guide adoption report

## Outcome

The Abort guide test now executes through the published `GuideCommand` API. Static imports are runtime-safe. Repository-local source and test imports occur inside the command callback. The package-specific policy and executable Abort cases remain in the owned test.

## Owned paths

- `C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts` — replaced the local guide orchestration with direct `GuideCommand` composition.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-abort-next-native-report.md` — records this unit.

`C:/Users/mikes/WebstormProjects/abort/tests/setup.ts` was not changed. No shared-file patch is required.

## Obligation mapping

| Previous obligation | Adopted source |
| --- | --- |
| Manifest loading and validation | `GuideCommand` callback `rows` and `report.input` |
| Fence-language validation | `report.fences` |
| Section and populated-method validation | `report.sections` |
| Interface and implementation method parity | `report.methods` and `report.declarations` |
| Summary and example drift | `report.drift` |
| Function, method, and title example coverage | `report.examples` |
| Import, link, and test-target validation | `report.imports`, `report.links`, and `report.tests` |
| README pitch validation | `report.pitch` |
| Abort-specific internal allowlist and anti-staleness | Package assertions over `row.source` |
| Abort barrel, class, and prototype membership | Package assertions over `row.source`, `row.guide`, the core barrel, and `Abort.prototype` |
| Abort executable behavior | Preserved flagship fence cases using the real `createAbort` implementation |

The hardening and alignment workflows kept generic guide checks in the published Guide engine while retaining package policy in the consumer test. The Guide contract remained fixed. No source API changed.

## Defect evidence

The accepted red baseline used this exact command:

```text
node --experimental-strip-types tests/guides.test.ts
```

It ended with exit code `1` before Vitest collection. Node reported `ERR_MODULE_NOT_FOUND` for `@src/core` imported from `tests/guides.test.ts`. Native process failures: `1`.

The same command after the edit ended with exit code `0`:

```text
Test Files  1 passed (1)
Tests  27 passed (27)
Duration  614ms
```

## Scoped validation

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
exit 0
All matched files use the correct format.
```

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

```text
git diff --check -- tests/guides.test.ts
exit 0
```

The owned source diffstat was:

```text
tests/guides.test.ts | 459 ++++++++++++++++++++-------------------------------
1 file changed, 183 insertions(+), 276 deletions(-)
```

## Scope limits

No install, build chain, commit, push, publication, deletion, authentication, manifest edit, lockfile edit, script edit, guide edit, or source edit ran. Root retains the package manifest, lockfile, script cleanup, full gates, package inspection, and release decision.
