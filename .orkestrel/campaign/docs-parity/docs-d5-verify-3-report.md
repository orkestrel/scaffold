Lane held: verifier

# Gate report — D5 scaffold-seed with D5-fix and D5-fix-2 (scaffold)

## 1. `grep -n "scripts/docs.ts" src/core/constants.ts src/core/compilers.ts package.json host.json`

Exit 0.

```
src/core/constants.ts:112:export const DOCS_SEED_PATH = 'scripts/docs.ts'
package.json:81:		"docs": "node --experimental-strip-types scripts/docs.ts",
host.json:706:			"storage": "scripts/docs.ts",
host.json:707:			"destination": "scripts/docs.ts",
```

`src/core/compilers.ts` shows no literal `scripts/docs.ts` match — it reads the `DOCS_SEED_PATH` constant instead (confirmed in step 11b). `HOST_PATHS`/emission/manifest/staged-entry facts are present across `constants.ts`, `package.json`, and `host.json`.

## 2. `grep -n "^import" scripts/docs.ts`

Exit 0. Only `@orkestrel/guide` (type and value imports) and `node:fs`, `node:path`, `node:process` specifiers.

## 3. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5`

Exit 0, non-empty (head start present):

```
154: * and {@link locateComment} matches a caller's key against the whole map. A change to the head
826: * so {@link findDrift} reports the absence.
915: * table without it leaves every row's summary absent, which {@link findDrift} reports.
928: * Extracts the guide's tagline — the text of the blockquote following the document's H1,
930: * blockquote ends the window, so a blockquote elsewhere in the document is not the tagline.
```

## 4. `npm run format:check`

Exit 0.

## 5. `npm run lint:check`

Exit 0.

```
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 6. `npm run check`

Exit 0. `tsc --noEmit --project tsconfig.json` and `check:src:core`/`check:src:server`/`check:src:bin` all completed with no diagnostics printed.

## 7. `npm run test:src:core`

Exit 0.

```
 Test Files  9 passed (9)
      Tests  402 passed (402)
```

## 7a. `npm run test:src:server`

Exit 0.

```
 Test Files  5 passed (5)
      Tests  432 passed (432)
```

## 7b. `npm run test:config`

Exit 0.

```
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```

## 8. `npm run test:src:core -- --reporter=verbose 2>&1 | grep -c "the documentation seed"`

Count: 14. Step 7 carries the run's exit code (0); this run reproduced the same 402-passed result.

## 9. `npm run test:policy`

Exit 0.

```
 Test Files  1 passed (1)
      Tests  91 passed (91)
```

## 10. `npm run build`

Exit 0.

```
dist/bin/main.js  82.83 kB │ gzip: 21.39 kB │ map: 151.05 kB
✓ built in 52ms
build-host: staged 122 file(s) into dist/host
build-inventory: staged 122 file(s) into host.json
```

## 11. `sha256sum host.json && npm run build:inventory && sha256sum host.json`

Exit 0. Same digest before and after:

```
8209ce012ea1d775d8137915988455afb4991f34a43f7405e16060e5358de96d  host.json
build-inventory: staged 122 file(s) into host.json
8209ce012ea1d775d8137915988455afb4991f34a43f7405e16060e5358de96d  host.json
```

## 11a. `node dist/bin/main.js audit --groups configs --offline; echo EXIT $?`

Exit 0.

```
0 of 17 planned paths drifted from the plan. Audit compared bytes at 16, existence at 1, and nothing at 0.
EXIT 0
```

`tsconfig.json` aligned; no drift.

## 11b. Combined grep checks

- `grep -n "cannot depend on itself" .claude/rules/workspace.md`: no output (nothing, as expected).
- `grep -c "@orkestrel/scaffold" tsconfig.json`: `2`.
- `grep -n "DOCS_SEED_PATH" src/core/constants.ts src/core/compilers.ts`: declaration at `src/core/constants.ts:112` and `:143`, reads at `src/core/compilers.ts:39,352,1591,1595,1601`.
- `grep -n "'scripts/docs.ts'" src/core/compilers.ts tests/distribution.test.ts`: only the `tests/distribution.test.ts:282` row; no match in `src/core/compilers.ts`.

All four match the expected shape.

## 12. `npm run test:guides`

Exit 1 — reading is GREEN per brief. Exactly the two expected cases failed and no other case failed:

```
FAIL  |guides| tests/guides.test.ts > guides > keeps every compared summary and example equal to its source
FAIL  |guides| tests/guides.test.ts > guides > opens the README with the guide tagline

 Test Files  1 failed (1)
      Tests  2 failed | 17 passed (19)
```

Last lines of the failure detail:

```
 ❯ tests/guides.test.ts:175:23
    173|    .map(({ entry, guide, source }) => ({ spec: entry.spec, drift: find…
    174|    .filter((record) => record.drift.length > 0)
    175|   expect(disagreeing).toEqual([])
       |                       ^
    176|  })

 FAIL  |guides| tests/guides.test.ts > guides > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:187:21
    185|   )
    186|   const tagline = documented.guide.tagline()
    187|   expect(pitch).not.toBeUndefined()
       |                     ^
    188|   expect(tagline).not.toBeUndefined()
    189|   expect(pitch).toBe(tagline)
```

## 13. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (npm 11 first on PATH)

`PATH=/opt/npm11/bin:$PATH npm --version` → `11.19.1`.

Exit 0.

```
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  77.36s
```

## 14. `node --experimental-strip-types scripts/docs.ts > tmp/units/docs-d5-verify-seed-run.txt 2>&1; echo EXIT $?`

Exit 1 — observation, GREEN at exit 1. First 5 lines of the output file:

```
guides/scaffold.md type Artifact: guide "One file in a plan, discriminated by how its content is produced and what scaffold claims of it." source "Represents one file in a plan, discriminated by how its content is produced and what scaffold claims of it."
guides/scaffold.md type BuildFormat: guide "One module format a published library environment builds." source "Names one module format a published library environment builds."
guides/scaffold.md type CatalogEntry: guide "One package row of the fleet catalog." source "Represents one package row of the fleet catalog."
guides/scaffold.md type CompileStage: guide "The compile phases, in the order they run." source "Names the compile phases, in the order they run."
guides/scaffold.md type CompilerEventMap: guide "The compiler's observation channel." source "Represents the compiler's observation channel."
```

Last 5 lines:

```
guides/scaffold.md WriteTransaction.remove: guide "Mark one file for deletion at commit." source "Marks one file for deletion at commit."
guides/scaffold.md WriteTransaction.commit: guide "Promote every staged file and take every marked file, or roll the whole call back." source "Promotes every staged file and takes every marked file, or rolls the whole call back."
guides/scaffold.md WriteTransaction.discard: guide "Abandon the transaction and remove everything it created." source "Abandons the transaction and removes everything it created."
guides/scaffold.md pitch: readme absent tagline "Scaffold compiles a workspace specification into an ordered list of files, compares that list to a real directory, and writes the difference. It ships one executable, `scaffold`, and library entry points: `@orkestrel/scaffold` is the pure compiler and its data contracts, and `@orkestrel/scaffold/server` is the filesystem writer and the network reader. Source: `src/core/index.ts` and `src/server/index.ts`."
rows read: 1, disagreements found: 316
```

## 15. `node --experimental-strip-types scripts/docs.ts --to nowhere; echo EXIT $?`

Exit 2, one usage line:

```
usage: npm run docs [-- --to guide|--to source]
EXIT 2
```

## 16. `git status --short`

```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

## Anomalies

None observed on this run. Step 12's two failures and step 14's exit 1 are the brief's stated expected observations, not anomalies.

GATES: GREEN
