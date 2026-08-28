# Fix report: guide

## Dispositions

- **s15-11** applied (src/core/helpers.ts, src/core/parsers.ts, src/core/Guide.ts): Re-verified: each file still placed a value import before an `import type`. Moved the type blocks above the value imports in all three; external-then-local ordering kept inside each block. `factories.ts`, `sources/Source.ts`, and `sources/SourceManager.ts` already conform and were left alone.
- **s15-12** applied (src/core/types.ts, guides/guide.md): Rename deferred as breaking (`ExportKind` and `SurfaceSymbol.kind` are published), so the shared lane fallback was applied instead: an `@remarks` on `SurfaceSymbol` recording that `kind` mirrors the guide Surface table's `Kind` column header located by exact text through `kindIndex`, plus the same note on the `SurfaceSymbol` row in the guide's Types table. The lanes conflict on whether to rename at all; both name this fallback when the fleet-wide rename is refused. The axis rename (`ExportForm`/`form`) belongs in the work order as a fleet unit covering every package's `tests/guides.test.ts`.
- **s15-14** applied (src/core/constants.ts, src/core/types.ts, src/core/validators.ts, src/core/shapers.ts, tests/src/core/shapers.test.ts, guides/guide.md): Applied what both lanes share: `EXPORT_KINDS` declared once in `constants.ts` as `Object.freeze([...] as const)` (probe's `PROBE_STAGES` precedent), `ExportKind` derived as `(typeof EXPORT_KINDS)[number]`, and both `literalOf(EXPORT_KINDS)` and `literalShape(EXPORT_KINDS)` fed from it. `validators.ts` still does not import `shapers.ts`; guard and shape stay separate compiled paths. Added lane 2's test update (`shapers.test.ts` asserts the schema enum against `EXPORT_KINDS`) and lane 1's parity test (the compiled `surfaceSymbolShape` guard and `isExportKind` agree on every member and on `'enum'`). Guide gains an `EXPORT_KINDS` Constants row and an amended section intro. `EXPORT_KINDS` is an additive export; the `ExportKind` union members are unchanged.
- **s15-15** applied (src/core/types.ts, src/core/helpers.ts, guides/guide.md): Declared `export interface FenceImport { readonly specifier: string; readonly names: readonly string[] }` in `types.ts`, changed `fenceImports` to `readonly FenceImport[]`, and typed the local accumulator `FenceImport[]`. Additive export plus readonly tightening. Added the `FenceImport` row to the guide's Types table and updated the `fenceImports` signature cell in the Helpers table.
- **s15-16** deferred_breaking: Every one of the fifteen helpers is exported from `helpers.ts` and star-exported by `src/core/index.ts`, so each is a published symbol of `@orkestrel/guide`. Renaming them is a non-additive change to the published surface, and both lanes scope the repair to every fleet package's `tests/guides.test.ts` — files outside this repository. Nothing applied; carried to the work order with the lanes' agreed substitution `extractFenceImports` (not `parseFenceImports`, which `names.md` reserves for coercion to `T | undefined`).
- **s15-17** deferred_breaking: Same published-symbol bar as s15-16: `identifierOf` is barrel-reachable, so the rename is breaking. Deferred whole. The work order carries the judge's reading that `normalizeIdentifier` (the guide's own wording at guides/guide.md and the sibling `normalizeDirectories`) settles the replacement name, and that it lands as one entry in s15-16's single rename pass rather than twice.
- **s15-19** deferred_wave: Every named site's repair is first-sentence voice alone (bare imperative or bare noun phrase to the third-person `-s` form), which the fleet ruling defers to the dedicated TSDoc wave. Nothing applied. The TSDoc sentences written here for other findings use the third-person form and the `True if …; false otherwise` boolean `@returns` form.
- **s15-20** applied (src/core/types.ts): Applied what both lanes share and nothing they dispute. Added `@returns` to `GuideInterface.sections`, `.surface`, `.methods` and `SourceInterface.exports`, `.methods(name)`, `.exists`, and the missing `@param name` / `@param relative`. Left `SourceManagerInterface.source` untouched: it already carries both tags. Added no `@example` — the lanes genuinely conflict on it, and adding one to a `GuideInterface` member would also falsify the documented `source.examples('GuideInterface') // ['fences', 'links', 'tests']` result in `types.ts`. `exists` uses the ruled boolean form; `methods(name)` records the class `constructor` exclusion that `Source.methods` applies.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1910ms on 82 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no output, exit 0)
- npm run build: pass — dist/src/core/index.js 64.36 kB | gzip: 16.27 kB; dist/src/core/index.cjs 67.10 kB; built in 2.98s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 8 files / 338 tests passed; distribution 1 file / 111 passed; config 1 file / 46 passed; setup 2 files / 12 passed; guides 1 file / 27 passed

## Diffstat

```text
 guides/guide.md                | 52 ++++++++++++++++++-----------------
 src/core/Guide.ts              |  2 +-
 src/core/constants.ts          | 19 +++++++++++++
 src/core/helpers.ts            | 23 ++++++++--------
 src/core/parsers.ts            |  2 +-
 src/core/shapers.ts            |  3 +-
 src/core/types.ts              | 62 ++++++++++++++++++++++++++++++++++++------
 src/core/validators.ts         |  9 ++----
 tests/src/core/shapers.test.ts | 25 +++++++++++------
 9 files changed, 133 insertions(+), 64 deletions(-)
```

- dist moves: true

## Deviations

No blocking deviation. Two recorded judgment calls, both resolved inside the brief's rules rather than escalated. (1) s15-12's lanes genuinely conflict on whether to rename the axis; the rename is breaking under the brief's test, so it is deferred and the fallback both lanes name when the rename is refused was applied. (2) s15-20's lanes genuinely conflict on `@example`; per "apply what they share", no `@example` was added, and the package's own documented `source.examples('GuideInterface')` result independently rules against adding one to a `GuideInterface` member. Ancillary choices taken: `EXPORT_KINDS` sits first in `constants.ts` because `types.ts` derives from it, and the guide's Constants section intro was widened to name the declaration-kind population it now lists. `npm run lint` then `npm run format` were run once to converge `guides/guide.md` table alignment after the row edits, then the non-mutating chain was re-run green; the formatter touched only the two tables this unit edited. The tree is uncommitted and `git status` lists only owned files.
