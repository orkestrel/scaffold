I'll read the checker brief in full first, then follow it exactly in read-only mode.The checker brief points at the audit brief for claims and output shape. I'll read that next, then hold only the mechanical claims it assigns.I'll load the checker role, the named law slices, and the subject files next so the mechanical sweeps have a fixed baseline.I’ll derive the export list from the setup files, then match it against the proofs, the report table, and the landing evidence.Export lists are in. Next I’ll read the proof cases, wiring, landing diff, and control captures against those lines.## Per-claim verdicts

**1. Coverage — `REFUTED`**

`grep -nE '^export'` on `tests/setup.ts` and `tests/setupServer.ts` yields every export named in the report table. No export is omitted.

The matching proof files do open cases that read those runtime exports (and `writeUpstreamReply` only through `createUpstreamServer` at `tests/setupServer.test.ts:575`). The report table’s `file:line` citations do not.

Rows whose cited line does not open on the case they name:

- `buildCLIOptions` → `tests/setupServer.test.ts:715` opens `await server.arrival('/held')` inside the destroy case at `:701`. The `buildCLIOptions` case is `:726`.
- `buildOptionArgv` → `:726` opens the `buildCLIOptions` case. The `buildOptionArgv` case is `:737`.
- `FILESYSTEM_PATH_CASES` → `:745` is a comment inside `buildOptionArgv`; `:762` is `PROTECTED_PATH_CASES.length,` inside the unique-label case at `:756`. The path-table cases are `:756` and `:773`.
- `GIT_PATH_CASES`, `PROTECTED_PATH_CASES`, `SENSITIVE_PATH_CASES`, `STORAGE_PATH_CASES` → same `:745`, `:762`.
- `DIGEST_CASES` → `:777` is `expect(PROTECTED_PATH_CASES.some((row) => !row.matched)).toBe(true)` inside `:773`. The digest case is `:788`. The `:131` digest-anchor cite does open the `buildManifestEntry` case.
- `COMMAND_CASES`, `USAGE_CASES`, `AUDIT_EXIT_CASES` → `:762`, `:783`. `:783` is `expect(UPSTREAM_ENDPOINT_CASES.some((row) => row.accepted)).toBe(true)` inside `:773`. The command-line case is `:794`.
- `UPSTREAM_ENDPOINT_CASES` → `:762` (inside `:756`). The verdicts case that reads it is `:773`.
- `UPSTREAM_PATHS`, `FLEET_UPSTREAM_PATHS` → `:791` is `for (const row of DIGEST_CASES)` inside `:788`. The frozen-path case is `:802`.
- `HOSTILE_ARGUMENT`, `HOSTILE_BYTES` → `:808` is `for (const path of Object.values(UPSTREAM_PATHS.vendored))` inside `:802`. The hostile-byte case is `:819`.
- `buildFleetManifest` totals → `:814` is the closing `}` of that `UPSTREAM_PATHS.vendored` loop. The fleet-total case is `:825`. (`:177` does open the fleet-manifest case.)
- `CORE_GENERATED`, `CORE_GENERATED_COUNT`, `FLEET_ARTIFACT_COUNT`, `FLEET_BIRTH_PATHS`, `FLEET_BIRTH_COUNT` → `:814`, same miss; case is `:825`.
- `buildCompiledPlan`, `buildVendoredPlan` → `:830` is `expect(new Set(FLEET_BIRTH_PATHS).size)` inside `:825`. The compiled-plan case is `:841`.

`VENDORED_FILES` is `Object.freeze` at `tests/setupServer.ts:1693`. The table names it with `buildInventory` at `tests/setupServer.test.ts:526` and does not name the consuming suite `tests/src/server/Upstream.test.ts`.

**2. Contract, not production — `not held`**

**3. Wiring — `CONFIRMED`**

`vite.config.ts:159-167` declares `setup` with `include: ['tests/setup*.test.ts']`, `setupFiles: ['./tests/setup.ts']`, `environment: 'node'`. `vite.config.ts:217` puts `setup` in `test.projects`. `package.json:84` is the last `test:` key (`test:setup`). `package.json:74` invokes it after `test:config` and before `test:guides`. The landing diff’s only `tests/src/core/compilers.test.ts` hunk is `+			setup: true,` on the fixed-blueprint parity case (`tests/src/core/compilers.test.ts:1171`).

**4. Controls — `CONFIRMED`**

`.orkestrel/campaign/conform/units/followon/scaffold-setup-proof/setup-red-control.txt:12-34` and `:53` read `npm run test:setup` with `Tests 2 failed | 67 passed (69)`, failing `tests/setup.test.ts > the inert value builders > replaces only the named fields on the dependency, override, and question builders` (`blocking` default) and `tests/setupServer.test.ts > the manifest builders > digests the destination text every host root writes for an entry` (default digest). `setup-green.txt:11` reads `Tests 69 passed (69)`. `/home/user/work/evidence/followon-scaffold-setup-proof.status` and the diff’s `diff --git` paths list `package.json`, `tests/setup.test.ts`, `tests/setupServer.test.ts`, `tests/src/core/compilers.test.ts`, `vite.config.ts` — not `tests/setup.ts` or `tests/setupServer.ts`.

**5. Resource hygiene — `not held`**

**6. Placement — `CONFIRMED`**

`tests/setup.test.ts:1-33` imports `vitest` and `./setup.js` only; no `node:*`. `tests/setupServer.test.ts:1-77` imports `./setupServer.js` and `./setup.js`, and owns `node:child_process`, `node:fs`, `node:path`. `describe(`, `it(`, `expect(` are absent from `tests/setup.ts` and `tests/setupServer.ts`. Neither proof file declares a helper function; the only `function` hits are `typeof` checks (`tests/setup.test.ts:138`, `tests/setupServer.test.ts:336`, `:345`).

**7. Scope — `CONFIRMED`**

Status lists `package.json` (modified), `tests/setup.test.ts` (added), `tests/setupServer.test.ts` (added), `vite.config.ts` (modified), `tests/src/core/compilers.test.ts` (modified). Diff hunks are those five paths: the `setup` factory and `projects` row, the `test` / `test:setup` scripts, the two proof files, and the one `setup: true` line. No vendored path, no `src/**`, no `guides/**`.

**8. Gates — `not held`**

**9. Residue and record — `REFUTED`**

Added lines carry no `.skip(`, `.only(`, `.todo(`, `TODO`, `any`, type assertion, non-null assertion, `console.`, or `debugger`. Every `it(` title names the behaviour it reads.

The report names list items by position and counts a growable set: `tmp/units/followon/scaffold-setup-proof-report.md:108` “the last declared `test:` key was `test:bench`”; `:160` “the `test` chain stops at the first failure”; `:243` “The two setup modules”; `:254` “the two links to `tests/guides.test.ts`”.

## Findings outside the claims

none

## Referrals

- Claims 2, 5, and 8, to the lanes that hold them.
- Whether `writeUpstreamReply` (`tests/setupServer.ts:1781`), never imported in `tests/setupServer.test.ts`, is read by the `createUpstreamServer` cases at `:575` onward.

## Claims attacked and held

- **3:** Read `vite.config.ts:159-167,:217`, `package.json:74,:84`, and the compilers hunk. Adjacent: other `setup: true` sites in `tests/src/core/compilers.test.ts` (`:352`, `:497`, `:892`) are outside the landing hunk.
- **4:** Read the campaign red/green captures and the supplied status/diff path lists. Adjacent: `setup.test.ts:1` also imports `vitest`; that is the runner, not a setup or `node:*` module.
- **6:** Grep of imports, `describe`/`it`/`expect` in the setup modules, and helper declarations in the proofs. Adjacent: `tests/setupServer.test.ts:7` imports `ScaffoldError` from `@src/core`; claim 2 owns whether that re-proves production.
- **7:** Read the status names and every `diff --git` path. Adjacent: `tests/src/core/compilers.test.ts` is the allowed parity line, not `src/**`.

VERDICT: FAIL 1, 9; outside the claims: none

## Journal

## Deviation

none