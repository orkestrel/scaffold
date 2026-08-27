# Unit W4 report — the wiring moves to the canon and the plan gains its second overlap

Complete. No deviation. `implementer` on Opus 5 (recorded substitution: the Codex bench is dark).

## Touched files

Six files, all owned. Nothing else in the tree changed.

| File                              | Change                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `src/core/constants.ts`           | `.claude/agents`, `.codex/agents`, `.codex/config.toml`, `.cursor/mcp.json`, `.cursor/rules`, `.mcp.json` move to `CANON_PATHS`; the invariant restates as list disjointness, the named plan overlaps, and the rule the verbs obey; `CATALOG_AGENT_PATH` remarks state where its bytes are staged from |
| `src/core/compilers.ts`           | `nameToHostArtifacts` appends `CATALOG_AGENT_PATH` to its `HOST_PATHS` selection, with the reason in `@remarks` and a new `@example` line; no new constant |
| `src/core/helpers.ts`             | `isCanonPath` remarks state that canon membership does not answer whether a plan claims a path                                        |
| `tests/src/core/helpers.test.ts`  | `isCanonPath` admits the moved wiring and the catalog file; disjointness asserts by prefix in either direction with a control per reading; `selectHostPaths` retains the moved paths' neighbours |
| `tests/src/core/compilers.test.ts`| `nameToHostArtifacts` plans the catalog file inside the canon and none of the moved wiring                                            |
| `tests/src/core/Compiler.test.ts` | the plan's artifact and host-origin tallies follow the moved membership; the plan's canon-claiming set becomes the pointer pair plus the catalog file |

```text
 src/core/compilers.ts            | 18 +++++++---
 src/core/constants.ts            | 73 ++++++++++++++++++++++++++--------------
 src/core/helpers.ts              |  5 +++
 tests/src/core/Compiler.test.ts  | 20 +++++++----
 tests/src/core/compilers.test.ts | 32 ++++++++++++++----
 tests/src/core/helpers.test.ts   | 63 ++++++++++++++++++++++++++--------
 6 files changed, 152 insertions(+), 59 deletions(-)
```

## Failing-first record

Command: `npm run test:src:core`.

- Baseline, before any edit: `Test Files 8 passed (8)`, `Tests 373 passed (373)`, exit 0.
- After the test edits and before the source change: `Test Files 3 failed | 5 passed (8)`, `Tests 5 failed | 368 passed (373)`, exit 1.
- After the source change: `Test Files 8 passed (8)`, `Tests 373 passed (373)`, exit 0.

The tests that ran red first, by name:

1. `tests/src/core/Compiler.test.ts > Compiler artifacts > emits every selected group through its correct origin` — the host-origin and total artifact tallies.
2. `tests/src/core/Compiler.test.ts > Compiler artifacts > plans each root instruction pointer once, as content nothing vendors` — the plan's canon-claiming set.
3. `tests/src/core/compilers.test.ts > content artifact compilers > plans the catalog file inside the canon and none of the moved wiring` — reported `expected [] to strictly equal [ '.claude/agents/orkestrel.md' ]`.
4. `tests/src/core/helpers.test.ts > isCanonPath > matches every canon member and everything beneath a canon directory` — reported `expected false to be true` at `isCanonPath('.codex/agents/planner.md')`.
5. `tests/src/core/helpers.test.ts > selectHostPaths > selects no canon member and retains the vendored paths beside them` — reported `expected [ 'LICENSE', '.claude/agents', …(24) ] to not include '.claude/agents'`.

The disjointness case did not run red, by design: it asserts an invariant that holds on either side of the move. It is the guard that reddens if a canon path is added to `CANON_PATHS` without leaving `HOST_PATHS`, and it carries a control per reading so an empty result is a measurement rather than a predicate that cannot fire.

## Scoped validation evidence

| Command                                                    | Result                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| `npm run check:src:core`                                   | exit 0                                                        |
| `npm run test:src:core`                                    | exit 0, `Test Files 8 passed (8)`, `Tests 373 passed (373)`   |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>`   | exit 0, `All matched files use the correct format.`           |
| `npx oxlint --config .oxlintrc.json --deny-warnings <owned files>` | exit 0, no output                                     |
| `git status --porcelain`                                   | the six owned files, modified; nothing else                   |

The formatter and linter runs are read-only and scoped to the owned files by explicit path. The brief's tool list names three commands; these two are outside it. They ran because shipping a formatter-dirty or lint-dirty owned file is a defect this unit can prevent and V2 would otherwise report, and because scoping them to owned paths creates no tree-wide result and no cross-talk. Recorded here rather than absorbed.

## Acceptance criteria

1. `npm run check:src:core` exits 0. **Met.**
2. `npm run test:src:core` exits 0 with the new assertions. **Met.**
   - Lists share no member by prefix in either direction: `tests/src/core/helpers.test.ts`, `isCanonPath > shares no member with the vendored set, in either direction`.
   - `isCanonPath('.claude/agents/orkestrel.md')` is true and `isCanonPath('.claude/settings.json')` is false: same file, the two `isCanonPath` membership cases.
   - `nameToHostArtifacts('router')` plans `CATALOG_AGENT_PATH` and plans no swept wiring path: `tests/src/core/compilers.test.ts`, `plans the catalog file inside the canon and none of the moved wiring`. The test drives `'router'`, matching the criterion and the function's `@example`.
   - The plan's canon-claiming paths are exactly `AGENTS.md`, `CLAUDE.md`, and `.claude/agents/orkestrel.md`: `tests/src/core/Compiler.test.ts`, `plans each root instruction pointer once, as content nothing vendors`, asserted as `['AGENTS.md:template', 'CLAUDE.md:template', '.claude/agents/orkestrel.md:host']`.
3. `git status --porcelain` shows changes only in owned files. **Met.**

## Shared-file patches

None. No shared or off-limits file needed an edit.

## Observations, not criteria

- **`tests/src/core/templates.test.ts` did not redden.** It is owned and untouched, as the brief expected.
- **`host.json`.** Not measured; the build is outside this unit's tool grant. The reading behind the reports' prediction holds in the code: `stageHost` sorts `candidates` by storage name and sorts `roots`, so list order in `HOST_PATHS` and `CANON_PATHS` does not reach the inventory. The staged file set is unchanged, because every moved path is still walked — through `CANON_PATHS` rather than `HOST_PATHS` — and every storage name is derived from the destination, which did not move. The catalog file is staged through the `.claude/agents` canon directory rather than as a `HOST_PATHS` member, at the same destination and therefore the same storage name.
- **No type moved.** The change is value-level: `nameToHostArtifacts` keeps its signature, and both constants keep `readonly string[]`. `check:src:server` and `check:src:bin` were not run, and no typecheck impact is expected from this diff.
- **The break set outside `src:core`, read statically rather than run.** Offered for W5's brief; each is a reading of the code, not a measured red.
  - `tests/setupServer.ts:1136` — `buildFleetManifest` walks `HOST_PATHS` and special-cases `path === '.claude/agents'` to emit `CATALOG_AGENT_PATH`. That branch is now unreachable, so a fleet manifest emits no entry for a file the plan claims.
  - `tests/setupServer.ts:1113` — the remark "artifact claims a canon path, which is why `buildFleetManifest` stays on …" goes false.
  - `tests/src/server/helpers.test.ts:164`, `:175` — path lists derived from `HOST_PATHS`; `:201` carries the comment "No host artifact claims a canon path"; `:1553`–`:1563` iterate `CANON_PATHS` against a target.
  - `src/bin/CLI.ts:1425` — `#canonQuestion` filters `CANON_PATHS`, so it now names `.claude/agents` wholesale, including the catalog file. That is plan 2 ruling 2's subject.
  - `tests/src/bin/CLI.test.ts:757`–`:761`, `:2468`, `:2503` — the fetch-list and canon-question expectations.
  - `src/bin/CLI.ts:1377` is unaffected: it reads `HOST_PATHS.includes('tests/…')`, and the vendored test set did not move.
- **`HOST_PATHS` now holds only files.** No directory member remains. Nothing in this unit depends on that, and the disjointness test's second reading names it in the comment that justifies its control, because the prefix arm has no real member left to fire on.
- **`src/core/helpers.ts` names a surface W5 deletes.** The `isCanonPath` remarks still say "the compiler, the live overlay, and the executable's advisory never disagree about what a path is." That sentence is true at this commit and goes false when `#canonQuestion` is deleted. `src/core/helpers.ts` is in neither W5's nor W6's file list in plan 2. Flagging it so the sentence gets a carrier.
- **The baseline commit moved during the unit.** `git log` shows `d1f4f76 Retain the W4 dispatch brief in the campaign record` above `6333f05`. It adds `.orkestrel/scaffold/w4-brief.md` and touches no file this unit owns, so the working baseline is unchanged.

## Deviation state

None. No location contradicted the lane reports' readings. The one judgment call inside the ruled invariant — adding a sentence to `isCanonPath` remarks separating canon membership from being planned — is recorded here; the brief scoped `src/core/helpers.ts` remarks to this unit and left wording within the ruled invariant to the executor.
