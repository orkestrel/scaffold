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

No literal match in `src/core/compilers.ts` for the string, because the emission there routes
through the `DOCS_SEED_PATH` constant (confirmed separately: `src/core/compilers.ts:39` imports it,
`:352` emits `scripts.docs = \`node --experimental-strip-types ${DOCS_SEED_PATH}\``). The `HOST_PATHS`
row, the emission, the manifest script, and the staged entry are all present.

## 2. `grep -n "^import" scripts/docs.ts`

Exit 0. Specifiers are `@orkestrel/guide` and `node:` only:

```
19:import type {
26:import {
44:import { existsSync, globSync, readFileSync, writeFileSync } from 'node:fs'
45:import { resolve } from 'node:path'
46:import process from 'node:process'
```

## 3. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5`

Exit 0, non-empty. The head start is present.

```
154: * and {@link locateComment} matches a caller's key against the whole map. A change to the head
826: * so {@link findDrift} reports the absence.
915: * table without it leaves every row's summary absent, which {@link findDrift} reports.
928: * Extracts the guide's tagline — the text of the blockquote following the document's H1,
930: * blockquote ends the window, so a blockquote elsewhere in the document is not the tagline.
```

## 4. `npm run format:check`

Exit 0. `All matched files use the correct format.` (223 files, 4 threads).

## 5. `npm run lint:check`

Exit 0. No output (no warnings, no errors).

## 6. `npm run check`

Exit 0. `tsc --noEmit --project tsconfig.json` and `check:src:core`, `check:src:server`,
`check:src:bin` all completed with no diagnostics.

## 7. `npm run test:src:core`

Exit 0. `Test Files 9 passed (9)`, `Tests 400 passed (400)`.

## 7a. `npm run test:src:server`

Exit 0. `Test Files 5 passed (5)`, `Tests 432 passed (432)`. Vendored-imports allowlist green with
the seed present.

## 7b. `npm run test:config`

Exit 0. `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`.

## 8. `npm run test:src:core -- --reporter=verbose 2>&1 | grep -c "the documentation seed"`

Run exit 0 (same suite as step 7, `400 passed`). Count of matching lines: `12`.

## 9. `npm run test:policy`

Exit 0. `Test Files 1 passed (1)`, `Tests 91 passed (91)`.

## 10. `npm run build`

Exit 0. Built `dist/src/core`, `dist/src/server`, `dist/bin/main.js`; `build:host` staged 122
files into `dist/host`; `build:inventory` staged 122 files into `host.json`.

## 11. `sha256sum host.json && npm run build:inventory && sha256sum host.json`

Exit 0. Same digest before and after:

```
d938a3e53705f148fb504f02638acf7dee265219e95ece4d37b97105a6ed839a  host.json
build-inventory: staged 122 file(s) into host.json
d938a3e53705f148fb504f02638acf7dee265219e95ece4d37b97105a6ed839a  host.json
```

## 11a. `node dist/bin/main.js audit --groups configs --offline; echo EXIT $?`

Exit 0. `0 of 17 planned paths drifted from the plan. Audit compared bytes at 16, existence at 1,
and nothing at 0.` `tsconfig.json` is aligned.

## 11b. Combined grep set

Exit codes read individually, output:

- `grep -n "cannot depend on itself" .claude/rules/workspace.md` — no output (nothing found, as expected).
- `grep -c "@orkestrel/scaffold" tsconfig.json` — `2`.
- `grep -n "DOCS_SEED_PATH" src/core/constants.ts src/core/compilers.ts` — declaration at
  `constants.ts:112`, re-export at `:143`, both reads in `compilers.ts` (`:39` import, `:352`
  emission, `:1591`/`:1595`/`:1601` doc-comment example).
- `grep -n "'scripts/docs.ts'" src/core/compilers.ts tests/distribution.test.ts` — only the
  `tests/distribution.test.ts:282` row; no literal match in `compilers.ts` (it references the
  constant, not the string).

All four readings match the brief's expectation.

## 12. `npm run test:guides`

Exit 1, as the brief reads GREEN for this purpose. `Test Files 1 failed (1)`, `Tests 2 failed | 17
passed (19)`. The two failing cases are exactly the two named in the brief:

- `guides > keeps every compared summary and example equal to its source`
  (`AssertionError: expected [ ... ] to deeply equal []` — 316 `findDrift` disagreements reported,
  ending `rows read: 1, disagreements found: 316`).
- `guides > opens the README with the guide tagline`
  (`AssertionError: expected undefined not to be undefined` at `tests/guides.test.ts:187:21`).

No other case failed.

## 13. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (with npm 11 first on PATH)

`PATH=/opt/npm11/bin:$PATH npm --version` reported `11.19.1`.

`npm run test:distribution` under that `PATH`: exit 0. `Test Files 1 passed (1)`, `Tests 5 passed
(5)`, duration 73.80s.

## 14. `node --experimental-strip-types scripts/docs.ts > tmp/units/docs-d5-verify-seed-run.txt 2>&1; echo EXIT $?`

Exit 1 (observation; GREEN at exit 1 per the brief). File written to
`/home/user/scaffold/tmp/units/docs-d5-verify-seed-run.txt`.

First 5 lines:

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

Exit 2, with exactly one usage line:

```
usage: npm run docs [-- --to guide|--to source]
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

None. `npm run test:src:core` (steps 7 and 8) logs harmless `MIXED_EXPORTS` warnings and a
"failed to load config" stderr line from an intentional negative-path test
(`refuses a non-object peer dependency declaration at config load`); those are expected fixture
noise, not failures.

## Overall verdict

Every gate read the state the brief expects: step 12's two named cases are the only guide failures,
step 14 exits 1 as an observation, and step 15 exits 2 with one usage line. All other steps
(1-11b, 13, 16) read exit 0 with no unexpected divergence.

GATES: GREEN
