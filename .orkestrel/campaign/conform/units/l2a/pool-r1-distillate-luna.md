I’ll verify the brief’s named rows and evidence against the current tree, diff, status, and proof artifacts, then return only the requested sections.## Question
For every row of unit conform-pool, what does the tree carry now, what did its diff change, and do the report readings match?

## Evidence

### Per-row evidence

#### pool-obj-1
- **Rule:** “Transcribe each flagship fence and assert the values its comments claim.”
- **Site now:** The test block is at `tests/guides.test.ts:179-201`; the fence is at `guides/pool.md:209-219`. Context includes `describe('flagship fences')` at `tests/guides.test.ts:179` and `### Validate public boundaries` at `guides/pool.md:209`.
- **Diff:** Test hunks `@@ -1,6 +1,7 @@` and `@@ -168,3 +170,34 @@`. The repair is present: `+describe('flagship fences', () => {`, `+expect(isPoolMax(4)).toBe(true)`, and the presence guards at `tests/guides.test.ts:197-201`. No diff hunk touches the guide fence; its current lines remain at `guides/pool.md:214-219`.
- **Old-form sweep:** Pattern `\b(without leaking the listener)\b`; paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “`describe('flagship fences')` in `tests/guides.test.ts`: the executed boundary fence plus its presence guard.” (`conform-pool-report.md:8`). The cited test and guide lines carry that repair.
- **Proof:** Command `npm --prefix /home/user/fleet/pool run test:guides`. Controls `pool-obj-1-control-planted-guard-red.txt` and `pool-obj-1-control-edited-fence-red.txt` exist and report `Tests 1 failed | 24 passed (25)`. Green control `pool-obj-1-subj-1-subj-2-green.txt` exists and reports `Tests 25 passed (25)`.

#### pool-obj-2
- **Rule:** “Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.”
- **Site now:** Guards remain at `src/core/validators.ts:13` and `:29`; the mirror now exists at `tests/src/core/validators.test.ts:1-36`. The source context includes `export function isPoolMax` at `:13` and `export function isPoolSignal` at `:29`.
- **Diff:** `Pool.test.ts` hunks `@@ -1,16 +1,18 @@` and `@@ -70,17 +72,13 @@`; new-file hunk `@@ -0,0 +1,37 @@`. The repair is present in `+import { isPoolMax, isPoolSignal } from '@src/core'` and the new guard assertions.
- **Old-form sweep:** No symbol was renamed or removed. Placement sweep over `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no stale removed assertion name exists.
- **Report:** `applied` — “New `tests/src/core/validators.test.ts`; the pure guard assertions moved out of `Pool.test.ts`.” (`conform-pool-report.md:9`). The source and mirror paths match.
- **Proof:** Command `npm --prefix /home/user/fleet/pool run test:src`. Baseline `pool-obj-2-obj-3-baseline.txt` exists and reports `Test Files 2 passed (2)` and `Tests 41 passed (41)`. Negative controls exist: `pool-obj-2-control-planted-guard-red.txt` reports `Tests 1 failed | 46 passed (47)`; `pool-obj-2-control-planted-max-red.txt` reports `Tests 2 failed | 45 passed (47)`. Green control `pool-obj-2-obj-3-green.txt` reports `Test Files 3 passed (3)` and `Tests 47 passed (47)`.

#### pool-obj-3
- **Rule:** “Confirm each assertion would fail for the defect it claims to catch.”
- **Site now:** The renamed case is at `tests/src/core/Pool.test.ts:358-371`. The listener case is at `:374-396`, with its assertions at `:378-386` and `:390-393`. The implementation remains at `src/core/Pool.ts:246-251`, including `removeEventListener`.
- **Diff:** Hunk `@@ -357,7 +355,7 @@` removes “without leaking the listener” from the case name. Hunk `@@ -370,10 +368,35 @@` adds the `getEventListeners` proof. The operative lines are present: `+expect(getEventListeners(committing.signal, 'abort')).toHaveLength(1)` and `+expect(...).toHaveLength(0)`.
- **Old-form sweep:** Pattern `without leaking the listener`; paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “Line 373 deleted, case renamed, and a `getEventListeners` case pinning both reachable `#detach` sites.” (`conform-pool-report.md:10`). The current test contains that case and both detach paths.
- **Proof:** Command `npm --prefix /home/user/fleet/pool run test:src`. Negative control `pool-obj-3-control-detach-removed-red.txt` exists and reports `Tests 1 failed | 46 passed (47)`. Green control `pool-obj-2-obj-3-green.txt` reports `Tests 47 passed (47)`.

#### pool-obj-4
- **Rule:** “Claim only what the reader can check.” The comment rule also says, “Comments explain why, never restate what self-explanatory code does.”
- **Site now:** `tests/setup.ts:8-10` says `@orkestrel/test` supplies shared recorder helpers and that the remaining declarations are this package’s event vocabulary.
- **Diff:** Hunk `@@ -1,14 +1,13 @@`. The operative replacement is present in `+// \`@orkestrel/test\` supplies this package's shared recorder helpers.` The `createResourceFactory` and replacement wording are absent from the owned sweep.
- **Old-form sweep:** Pattern `createResourceFactor(y|ies|ied|ing)` case-insensitive over `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit. The broader package sweep has pre-existing hits only in vendored `guides/test.md`.
- **Report:** `applied` — “`tests/setup.ts` header rewritten in the present tense over what the tree holds.” (`conform-pool-report.md:11`). Lines `8-10` carry the stated text.
- **Proof reading:** The report records the whole-package sweep as finding `guides/test.md` only, with no hit in `src` or `tests`; the bounded sweep above agrees.

#### pool-subj-1
- **Rule:** “Use one method table per interface, keyed by its backticked name.”
- **Site now:** `guides/pool.md:75` contains `#### \`PoolInterface\`` immediately before the table at `:77-81`; the preceding sentence remains at `:73`.
- **Diff:** Hunk `@@ -72,12 +72,20 @@`. The exact repair is present: `+#### \`PoolInterface\``.
- **Old-form sweep:** Pattern for the prior bare-table form, `^The public methods of.*\n\n\| Method`; paths `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “`\#### \`PoolInterface\`` inserted before the method table in `guides/pool.md`.” (`conform-pool-report.md:12`). The current guide has the keyed table.
- **Proof reading:** `pool-subj-1-subj-2-control-no-h4.txt` exists and reports `Tests 15 passed (25)`, demonstrating the unkeyed population was silently skipped. `pool-subj-1-control-phantom-red.txt` reports `Tests 2 failed | 23 passed (25)`. Green `pool-obj-1-subj-1-subj-2-green.txt` reports `Tests 25 passed (25)`. The report and tree agree.

#### pool-subj-2
- **Rule:** “The table's methods exactly match the interface's call-signature members. Readonly data properties remain in the interface's `## Surface` row.”
- **Site now:** `PoolToken.release()` remains in the Surface row at `guides/pool.md:61`, and its keyed method table is at `:83-87`. The source call signature is `src/core/types.ts:41`.
- **Diff:** The same guide hunk `@@ -72,12 +72,20 @@` adds `+#### \`PoolToken\`` and the `+| \`release\` | \`void\` | ... |` row. The Surface row was not trimmed.
- **Old-form sweep:** No old form was removed; the amended repair intentionally retains the `release()` Surface summary. Paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no stale renamed method hit.
- **Report:** `applied` — “`\#### \`PoolToken\`` and its `release` table added; the Surface row at line 61 left as it is.” (`conform-pool-report.md:13`). The current guide matches that statement.
- **Proof reading:** `pool-subj-2-control-renamed-red.txt` exists and reports `Tests 3 failed | 22 passed (25)`. Green `pool-obj-1-subj-1-subj-2-green.txt` reports `Tests 25 passed (25)`. The report and tree agree.

#### pool-subj-3
- **Rule:** “`AGENTS.md` and its linked rules are the sole convention source.”
- **Site now:** `guides/README.md:3` is the unnumbered tagline; `:35` says “the repository's coding and documentation rules.”
- **Diff:** Hunks `@@ -1,6 +1,6 @@` and `@@ -32,4 +32,4 @@`. The exact replacements are present at `guides/README.md:3` and `:35`.
- **Old-form sweep:** Pattern `AGENTS\s*§\s*(22|16\.1)|§22`; paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “`guides/README.md` lines 3 and 35 rewritten without the `§22` citations.” (`conform-pool-report.md:14`). Both current lines carry the replacement.
- **Proof reading:** The report’s `AGENTS §` sweep found only vendored `guides/emitter.md` and `guides/guide.md`; the owned-path sweep agrees.

#### pool-subj-4
- **Rule:** “`AGENTS.md` and its linked rules are the sole convention source.”
- **Site now:** `tests/setup.ts:3` is `// ── Environment-agnostic base setup ───────────────────────────────────────────`.
- **Diff:** Shared setup hunk `@@ -1,14 +1,13 @@`. The exact replacement is present at `tests/setup.ts:3`.
- **Old-form sweep:** Pattern `AGENTS\s*§\s*16\.1`; paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “`tests/setup.ts:3` banner stripped of ` (AGENTS §16.1)`, padded back to its original width.” (`conform-pool-report.md:15`). The current banner matches.
- **Proof reading:** The report records the `AGENTS §` sweep as empty in this file; the owned-path sweep agrees.

#### pool-subj-5
- **Rule:** “TypeScript, SCSS, Markdown, tests, and showcase remain aligned.” Also, “Claim only what the reader can check.”
- **Site now:** `README.md:3-6` says “optional bounded capacity,” “growing up to `max` when one is set,” and “growing without bound when it is not.”
- **Diff:** Hunk `@@ -1,8 +1,9 @@`. The exact capacity wording is present at `README.md:3-6`.
- **Old-form sweep:** Patterns `\bbounded,\s*typed\b` and `growing up to \`max\`, or parking on`; paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “`README.md` opening rewritten to the optional-bounded-capacity claim `package.json` and the guide make.” (`conform-pool-report.md:16`). The current README carries that claim.
- **Proof reading:** The report records no `bounded, typed` hit; the owned-path sweep agrees.

#### pool-subj-6
- **Rule:** “State a prerequisite and the failure behavior wherever the symbol has either.” Also, “Write a thrown error as ‘Thrown when …’.”
- **Site now:** The `clear` documentation is at `src/core/types.ts:89-94` and `src/core/Pool.ts:141-146`; both contain `destroyed` and `cleanup` `@throws` entries.
- **Diff:** Type hunk `@@ -77,18 +77,29 @@`; implementation hunk `@@ -135,6 +135,10 @@`. The exact added lines are present in both files, including `code: 'destroyed'`, `code: 'cleanup'`, and `context.failures`.
- **Old-form sweep:** No old name or removed phrase; paths `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`; no hit.
- **Report:** `applied` — “`clear` `@throws` for `destroyed` and `cleanup`, byte-identical in `types.ts` and `Pool.ts`.” (`conform-pool-report.md:17`). The two current blocks match.
- **Proof reading:** Documentation row; the report records prose sweeps and green gates. The owned-path sweeps agree.

#### pool-subj-7
- **Rule:** “State a prerequisite and the failure behavior wherever the symbol has either.”
- **Site now:** The `destroy` documentation is at `src/core/types.ts:99-103` and `src/core/Pool.ts:165-169`; both document the rejected cleanup barrier.
- **Diff:** The same type and implementation hunks as pool-subj-6. The exact added text includes `code: 'cleanup'`, `context.failures`, and “The barrier rejects.”
- **Old-form sweep:** No old name or removed phrase across the required owned paths; no hit.
- **Report:** `applied` — “`destroy` `@throws` for `cleanup`, byte-identical in `types.ts` and `Pool.ts`.” (`conform-pool-report.md:18`). The current blocks match.
- **Proof reading:** Documentation row; the report’s recorded sweeps and gates agree with the current text.

#### pool-subj-8
- **Rule:** “State a prerequisite and the failure behavior wherever the symbol has either.”
- **Site now:** The `acquire` documentation is at `src/core/types.ts:73-85` and `src/core/Pool.ts:103-115`; both include `destroyed`, `create`, `cleanup`, and exact abort-reason behavior.
- **Diff:** Type hunk `@@ -77,18 +77,29 @@`; implementation hunk `@@ -107,6 +107,10 @@`. The exact added rejection paragraph is present in both files.
- **Old-form sweep:** No old name or removed phrase across the required owned paths; no hit.
- **Report:** `applied` — “`acquire` `@throws` for `destroyed`, `create`, `cleanup`, and the abort reason, in both files.” (`conform-pool-report.md:19`). The current blocks carry all four cases.
- **Proof reading:** Documentation row; the report’s sweeps and gates agree with the current blocks.

#### pool-subj-9
- **Rule:** “State a prerequisite and the failure behavior wherever the symbol has either.”
- **Site now:** `src/core/factories.ts:15-18` places the `@throws` tag after `@returns` and before `@example`.
- **Diff:** Hunk `@@ -13,6 +13,8 @@`. The exact added lines are present at `src/core/factories.ts:16-17`.
- **Old-form sweep:** No removed or renamed form across the required owned paths; no hit.
- **Report:** `applied` — “`createPool` doc block states the synchronous `code: 'invalid'` construction throw, placed before `@example`.” (`conform-pool-report.md:20`). The current block has that order and text.
- **Proof reading:** Documentation row; the report’s recorded sweeps and gates agree.

#### fleet-F1
- **Rule:** The fleet ruling requires a `noop` when `isBrowserVuePath` is absent or no browser environment exists.
- **Site now:** `tests/setup.ts:1-20` declares only `PoolEvent` and `POOL_EVENTS`; `isBrowserVuePath` is absent. `vite.config.ts:42-48`, `:52-59`, `:76-84`, `:88-95`, and `:99-108` show node projects with browser disabled.
- **Diff:** No hunk applies. The helper, its test, and its setup axis were not changed.
- **Old-form sweep:** Pattern `isBrowserVuePath`, case-insensitive; required owned paths; no hit.
- **Report:** `noop` — “`tests/setup.ts` declares no `isBrowserVuePath`; the workspace has no browser environment.” (`conform-pool-report.md:21`). The current tree supports that reading.
- **Proof reading:** Placement/naming row; the report’s path reading and the current tree agree.

#### fleet-F2
- **Rule:** Apply only when a class has a public `readonly id: string` field ahead of private fields.
- **Site now:** `Pool` starts with private fields at `src/core/Pool.ts:29-53` and exposes getters at `:83-98`; it has no `id`. `PoolError` at `src/core/errors.ts:18-22` has `code` and `context`, not `id`. `PoolInterface` at `src/core/types.ts:65-71` declares no `id`.
- **Diff:** No hunk applies.
- **Old-form sweep:** No renamed or removed published symbol; no old-form hit.
- **Report:** `noop` — “Neither implementation class declares a public `readonly id: string` data field.” (`conform-pool-report.md:22`). The current classes match that evidence.
- **Proof reading:** No `JSON.stringify` check was needed because the triggering shape is absent. The current tree has no matching class.

### Across the unit

#### Scope and containment

The status artifact lists only owned paths:

| Path | Tag |
|---|---|
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/pool.md` | owned |
| `src/core/Pool.ts` | owned |
| `src/core/factories.ts` | owned |
| `src/core/types.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/src/core/Pool.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |

No shared or off-limits path appears. Every diff hunk belongs to a file named by at least one row’s `Where`; there are no uncovered diff hunks.

#### Residue

- Diff `+`-line sweep pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over `/home/user/work/evidence/conform-pool.diff`: one hit, `tests/guides.test.ts:201` — `expect(guideText).toContain('if (isPoolError(failure)) console.error(failure.code)')`.
- Tree sweep with the same pattern over `src/**` and `tests/**`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: `src/core/errors.ts:14` and `tests/guides.test.ts:201`.
- The source hit is pre-existing documentation example text. The test hit is the required presence guard. No `.skip`, `.only`, `.todo`, retry, timeout, `TODO`, `FIXME`, or `debugger` hit occurs in the included population.

#### Parity

| Entity | Type call-signature members | Guide method rows | Readonly data properties and guide surface |
|---|---|---|---|
| `PoolInterface` | `acquire` `src/core/types.ts:85`; `clear` `:95`; `destroy` `:104` | `guides/pool.md:79-81` | `emitter`, `size`, `idle`, `active` at `src/core/types.ts:65-71`; named by the `PoolInterface` Surface row at `guides/pool.md:63` and the data-property prose at `:65-69` |
| `PoolToken` | `release` `src/core/types.ts:41` | `guides/pool.md:87` | `value` at `src/core/types.ts:39`; named by the Surface row at `guides/pool.md:61` |
| `Pool` | Public getters `emitter`, `size`, `idle`, `active` at `src/core/Pool.ts:83-98`; methods `acquire`, `clear`, `destroy` at `:116`, `:146`, `:170` | `guides/pool.md:79-81`; class parity uses the same keyed interface table | The class implements the `PoolInterface` surface; the guide names `Pool` in `guides/pool.md:10`, `:42`, and `:73` |

Backticked identifiers added in guide prose/table lines are `PoolInterface`, `acquire`, `Promise<PoolToken<T>>`, `clear`, `destroy`, `PoolToken`, `release`, `void`, `tests/src/core/Pool.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/factories.test.ts`, and `tests/guides.test.ts`. `PoolInterface`, `PoolToken`, and their owning declarations are reachable through the barrel’s star exports at `src/core/index.ts:1-5`; method names are members of those exported contracts, and test paths are links rather than barrel exports.

#### Gates

The report records these lines in order (`conform-pool-report.md:170-179`):

| Command | Exit |
|---|---:|
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |

The proof files exist. `gate-test.txt` reports `src:core` 47 passed, `policy` 111 passed, `config` 46 passed, `setup` 3 passed, and `guides` 25 passed.

#### Breaking

None. No published symbol was renamed or removed, so the required fleet-wide old-name sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src` has no applicable symbol. The report says: “None. No row renames or removes a published symbol.” (`conform-pool-report.md:191-193`).

#### Writing sweep

Diff `+` lines in prose files, including `guides/**`, `README.md`, source doc comments, and test titles/comments:

- Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`, case-insensitive: no hits.
- Pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`, case-insensitive: no hits.

## Distillate

- `pool-obj-1`: tests/guides fence proof at `tests/guides.test.ts:179-201` | diff present yes | old form hits 0 | report matches yes
- `pool-obj-2`: validator mirror at `tests/src/core/validators.test.ts:1-36` | diff present yes | old form hits 0 | report matches yes
- `pool-obj-3`: listener proof at `tests/src/core/Pool.test.ts:374-396` | diff present yes | old form hits 0 | report matches yes
- `pool-obj-4`: present-tense setup comment at `tests/setup.ts:8-10` | diff present yes | old form hits 0 in owned sweep | report matches yes
- `pool-subj-1`: keyed `PoolInterface` table at `guides/pool.md:75-81` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-2`: keyed `PoolToken` table at `guides/pool.md:83-87` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-3`: unnumbered guide index references at `guides/README.md:3,35` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-4`: unnumbered setup banner at `tests/setup.ts:3` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-5`: optional-capacity README at `README.md:3-6` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-6`: `clear` rejection TSDoc at `src/core/types.ts:89-94` and `src/core/Pool.ts:141-146` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-7`: `destroy` rejection TSDoc at `src/core/types.ts:99-103` and `src/core/Pool.ts:165-169` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-8`: `acquire` rejection TSDoc at `src/core/types.ts:73-85` and `src/core/Pool.ts:103-115` | diff present yes | old form hits 0 | report matches yes
- `pool-subj-9`: `createPool` rejection TSDoc at `src/core/factories.ts:15-18` | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: helper absent; node-only projects remain configured | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: no matching public `id` field exists | diff present no | old form hits 0 | report matches yes

Scope tags: every status path is `owned`; no `shared` or `off-limits` path appears.

Residue hits: diff `tests/guides.test.ts:201`; tree `src/core/errors.ts:14` and `tests/guides.test.ts:201`.

Writing hits: none under either required pattern.

Parity: `PoolInterface.acquire/clear/destroy` ↔ guide rows `79-81`; `PoolToken.release` ↔ guide row `87`; readonly data properties ↔ Surface rows `61` and `63-69`; all intentional names are reachable through `src/core/index.ts:1-5`.

## Unknowns

- A fresh live `git status --short` reading was not obtained after the read-only audit command was rejected. The supplied status artifact was readable and lists only owned paths.

## Journal

Driver-owned.

## Deviation

No tree change was made by this read-only pass. All requested file reads, proof reads, diff sweeps, residue sweeps, writing sweeps, and parity checks completed. The only unavailable check was a fresh live `git status --short`; the supplied `/home/user/work/evidence/conform-pool.status` was used instead.