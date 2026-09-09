# Test native guides entry adoption

## Outcome

The authored Test guide suite now uses the accepted `GuideCommand` entry. Native loading reaches
the real guides runner through the installed `readInventory` and `createVitest` ports. Worker
registration loads Test source, Test setup, and Vitest at the worker boundary.

## Obligation mapping

| Obligation | Implemented reading |
| --- | --- |
| Native-safe entry | Static runtime imports name `GuideCommand`, the package self-reference `readInventory`, Node primitives, and `createVitest`. The static `@src/core` import is type-only and erases before Node resolves the module. |
| Fresh command context | The callback reads `files`, `rows`, and `report` supplied by `GuideCommand` from the configured `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, and `*.md` inventory. |
| Generic parity | `report.input`, `report.fences`, `report.methods`, `report.drift`, `report.examples`, `report.imports`, `report.links`, `report.tests`, and `report.pitch` replace matching local recomputation. Direct, barrel, hidden, and `INTERNAL` assertions remain explicit because that policy is package-owned. |
| Package policy | The source mapping retains `src/core`, `src/browser`, and `src/server`. The guide row, documented surface, titled-example population, method groups, and README pitch remain guarded. The shared command does not add the broader section policy this package did not own. |
| Test-specific behavior | Fence routing, `ROUTED_FENCES`, runtime transcriptions, real loopback and scratch resources, capability-gated link cases, cleanup, and README inventory assertions remain registered inside the worker callback. |
| Fixture placement | `ScriptedLoader` receives the real recorder created inside the worker. `parseSchema` receives the real setup guard. The disclosure assertion raises the same mismatch text without importing Vitest outside the worker. The fixture declarations remain at module scope. |

## Native defect proof

The retained baseline used this command:

```text
node --experimental-strip-types tests/guides.test.ts
```

It exited `1` before collection with this diagnostic:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\test\tests\guides.test.ts
```

The runner produced no test tally because module resolution failed before collection. Root retained
the complete stdout, stderr, exit, status, manifest, index, and diff readings under
`tmp/pass/d7n-test-native-baseline`.

The same command against the adopted file exited `0`:

```text
Test Files  1 passed (1)
Tests  47 passed | 1 skipped (48)
```

The conditional skip is the retained directory-link capability case.

## Scoped validation

The scoped formatter write exited `0`:

```text
npx --no-install oxfmt --config .oxfmtrc.json --write tests/guides.test.ts
```

The scoped formatter check exited `0`:

```text
npx --no-install oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
```

The scoped linter exited `0` with no diagnostics:

```text
npx --no-install oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
```

`git diff --check` exited `0`. The Test status names only the owned product path:

```text
 M tests/guides.test.ts
```

The product diffstat is:

```text
tests/guides.test.ts | 1781 ++++++++++++++++++++++++--------------------------
1 file changed, 840 insertions(+), 941 deletions(-)
```

## Touched paths

- `C:/Users/mikes/WebstormProjects/test/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-test-native-adopt-report.md`

## Limits and root work

The explicit rewrite directions did not run because they can edit guide or source paths outside
this unit's writable scope. The accepted Guide controls already bind nonempty rewrites; root owns
the final artifact replacement and consumer acceptance.

The brief limited this unit to the native command and scoped format and lint checks. Root owns the
package gate chain, artifact comparison, review, commit, and publication. This unit did not install,
build, commit, push, publish, or edit metadata, source, guides, configuration, generated files, or
Contract.
