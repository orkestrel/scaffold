# Database compiler-consumer preservation report

## Outcome

The package-owned internal-surface case again measures the real TypeScript entry surfaces. It derives each manifest environment inside the owning case and fails when any requested compiler surface is absent. The Guide method checks and the existing compiler and fence controls remain unchanged.

The owned file is frozen. No shared-file patch is required. The independent `tests/setupServer.test.ts` path correction remains untouched.

## Owned change

- `C:/Users/mikes/WebstormProjects/database/tests/guides.test.ts`

Current owned diffstat, including the preceding native adoption already present in the worktree:

```text
tests/guides.test.ts | 1330 +++++++++++++++++++++++---------------------------
1 file changed, 604 insertions(+), 726 deletions(-)
```

Dispatch artifact:

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-database-compiler-preservation-report.md`

## Exact mapping

Predecessor:

```text
manifest[].source
  -> normalizeDirectories(...)
  -> `${directory}/index.ts`
  -> deriveEntrySurfaces(join(ROOT, 'tsconfig.json'), entryPaths)
  -> requireDirectorySurface(directory)
  -> surface.map((symbol) => symbol.name)
  -> internal and public membership assertions
```

Native adoption before this correction:

```text
row.source.surface()
  -> map((symbol) => symbol.name)
  -> internal and public membership assertions
```

Corrected native consumer:

```text
entry.source
  -> normalizeDirectories(...)
  -> posix.join(directory, 'index.ts')
  -> deriveEntrySurfaces(join(root, 'tsconfig.json'), identifiers)
  -> requireValue(surfaces.get(identifier), ...)
  -> flatMap((symbol) => symbol.name)
  -> internal and public membership assertions
```

The successor derives only inside `keeps table, query, and transaction implementations internal`. It does not sort or deduplicate the names. It still checks `TableInterface.count` and `QueryInterface.count` through `source.methods(...)`.

## Validation

The accepted pre-correction receipt recorded the native entry as green under the installed Probe overlay:

```text
npm run test:guides
exit code: 0
Test Files  1 passed (1)
Tests  52 passed (52)
```

The same native entry passes after restoring the compiler-backed consumer:

```text
npm run test:guides
exit code: 0
Test Files  1 passed (1)
Tests  52 passed (52)
Duration  24.34s
```

The current package surface makes the Guide report and compiler result agree, so the preservation defect does not produce a native red without changing the package under test. The predecessor comparison identifies the lost measurement route; the existing compiler fixtures already prove that route differs for re-export and diagnostic cases.

The scoped formatter initially found the newly edited file unformatted:

```text
.\\node_modules\\.bin\\oxfmt.cmd --config .oxfmtrc.json --check tests/guides.test.ts
exit code: 1
Format issues found in above 1 files.
```

After formatting the owned file, the same check passes:

```text
.\\node_modules\\.bin\\oxfmt.cmd --config .oxfmtrc.json --check tests/guides.test.ts
exit code: 0
All matched files use the correct format.
```

Scoped lint passes:

```text
.\\node_modules\\.bin\\oxlint.cmd --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit code: 0
```

`git diff --check -- tests/guides.test.ts` also passes.

## Status

Done: restored the compiler-backed package consumer within the owned case, kept the interface-method assertions, and preserved the existing controls.

Not done: full gates and dependency alignment remain root-owned by dispatch.
