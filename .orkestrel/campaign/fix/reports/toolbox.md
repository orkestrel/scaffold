# Fix report: toolbox

## Dispositions

- **s10-14** applied (src/core/validators.ts, src/core/helpers.ts, src/core/index.ts, src/core/factories.ts, src/core/stores/DatabaseDefinitionStore.ts, guides/toolbox.md): Created src/core/validators.ts holding isWorkflowLineage, isAgentFunction, isColumnSpec, isColumnKind, and isDatabaseDefinition verbatim; added `export * from './validators.js'` to the core barrel between errors.js and shapers.js; repointed helpers.ts, factories.ts, and DatabaseDefinitionStore.ts at the new module, plus the `{@link import('./helpers.js').isDatabaseDefinition}` TSDoc links in types.ts and DatabaseDefinitionStore.ts. Non-breaking: the barrel keeps every name reachable. Ancillary: moved the five guide rows out of `### Helpers` into a new `### Validators` section so the guide's kind grouping matches the source; guides parity stays green. Tests were left in tests/src/core/helpers.test.ts (they import through the @src/core barrel) because the repair named no test move and the brief bars renaming tests otherwise.
- **s10-15** deferred_breaking: Deferred whole. Both lanes' corrected repair renames the barrelled exports `columnShape` -> `compileColumn` and `kindShape` -> `compileColumnKind` and relocates them (with `expandTables`) into a new src/core/compilers.ts. Renaming an exported symbol is a published-surface break. The relocation half does not stand on its own: a compilers.ts still holding `columnShape`/`kindShape` leaves the `*Shape`-suffix collision with the shapers.ts values intact, which is the whole defect.
- **s10-16** applied (src/core/helpers.ts): Applied the non-breaking half both lanes agree on: the `expandTables` loop variable bound to a `ColumnSpec` no longer reads `kind`. Named it `columnSpec` rather than `spec` because `spec` is the enclosing parameter and oxlint's no-shadow rejected the shadow (verified: lint:check warned, rename cleared it). Deferred the `ColumnKind` -> `ColumnFormat` and field `type` -> `format` rename as breaking (exported type, exported union member, and a field name published into the model-facing JSON Schema). The `kindShape(kind: ColumnKind)` parameter already matches what it receives, so nothing was changed there.
- **s10-17** applied (src/core/helpers.ts, src/core/types.ts): Present tense throughout the named sites: `databaseToolCode` and `relationToolCode` first sentences no longer say "the upcoming database/relation tool should throw with" and now link `createDatabaseTool` / `createRelationTool` directly (rewritten jointly with s10-18 and s10-34); deleted "the tool factories land in a later unit" from the helpers.ts section header, which orphaned its `(SRC-1 — ...;` parenthetical, so that fragment went with it; deleted "for the upcoming database / relation tools" from the types.ts database-definition header. Adjacent same-class drift at locations the dossier does not name was left in place and is reported under deviations.
- **s10-18** applied (src/core/helpers.ts): Applied the non-breaking half: both first sentences now name the type actually returned — "Maps a caught error to the granular {@link DatabaseErrorCode} (`@orkestrel/database`) the code createDatabaseTool throws with" and the RelationErrorCode counterpart — so each function's description and its `@returns` agree. Deferred the rename to `inferDatabaseCode` / `inferRelationCode` (both lanes' agreed form) as breaking: both are barrelled exports. The guide rows already named the granular upstream codes and needed no change.
- **s10-19** applied (src/core/types.ts): Deleted both campaign-identifier clauses from published TSDoc. `DatabaseToolOptions` now opens "Options for createDatabaseTool — the live handles, definition store, driver registry, key generator, row cap, timeout, and readonly gate the tool composes."; `RelationToolOptions` opens "Options for createRelationTool." The "3-unit" count went with them.
- **s10-20** applied (src/core/types.ts, src/server/types.ts, src/core/shapers.ts, guides/toolbox.md): Deleted each count rather than correcting it: "the 13 workspace edit / read / navigation actions" -> "the workspace edit, read, and navigation actions" (types.ts); "The seven-value machine-readable code" -> "The machine-readable code" (types.ts); "the exact 7-literal union" -> "the same union" (server/types.ts). Also removed the identical "13" from the `workspaceToolShape` TSDoc sentence I was already rewriting for s10-33, and corrected the guide's `Method` row, which mirrors the server/types.ts sentence verbatim. Other counts elsewhere in the guide sit at locations no finding names and were left.
- **s10-21** deferred_breaking: Deferred whole. `workflowTag`, `agentTag`, `workflowToolSummary`, and `terminalToolCode` are all barrelled public exports, so renaming them to `tagWorkflow`, `tagAgent`, `summarizeWorkflow`, and `inferTerminalCode` breaks the published surface. Nothing in the repair stands on its own without the renames.
- **s10-22** deferred_breaking: Deferred whole. `lineageOf`, `relationManagerOf`, `relationModelOf`, and (per the corrected repair) `queryOf` are barrelled public exports; renaming them to `normalizeLineage`, `resolveRelationManager`, `resolveRelationModel`, and `normalizeQuery` breaks the published surface.
- **s10-23** applied (src/core/types.ts, src/core/helpers.ts, guides/toolbox.md): Declared `DatabaseQueryInput` (the serialized wire query) and `ClampedQuery` in src/core/types.ts and annotated `queryOf` and `clampQuery` with them; both are structurally identical to the inline types they replace, so the change is additive. Added the two rows to the guide's type table. Verified with `npm run check` and the guides project.
- **s10-24** applied (src/server/terminals/TerminalRoutes.ts, src/server/terminals/TerminalConnection.ts, src/server/index.ts, src/server/factories.ts, tests/src/server/terminals/TerminalConnection.test.ts, guides/toolbox.md): Renamed src/server/routes/ to src/server/terminals/ (plain `mv`, no git staging) and mirrored the move in tests/src/server/. Updated server/index.ts, server/factories.ts, the test's relative import, and the guide's `## Tests` source link. `TerminalRoutes` stays reachable under its existing name through the server barrel, so nothing published moved. `npm run check` and the src:server suite pass.
- **s10-25** deferred_breaking: Deferred. Every candidate rename (`TerminalBridge` with `TerminalBridgeOptions`, or `TerminalRouteBuilder` with `TerminalRouteOptions`) renames the exported class `TerminalRoutes` and the exported interface `TerminalRoutesOptions`, both published from @orkestrel/toolbox/server. The lanes also disagree on which name replaces it, which the work order needs to settle.
- **s10-26** deferred_breaking: Deferred. `Method` is a published type export of @orkestrel/toolbox/server; renaming it to `TerminalRouteMethod` breaks any consumer importing it. Only the count in its description was fixed, under s10-20.
- **s10-28** applied (src/server/terminals/TerminalConnection.ts, tests/src/server/terminals/TerminalConnection.test.ts): Replaced the false reason with the true one: the class TSDoc now reads "Not exported from the `@orkestrel/toolbox/server` barrel — reach this behaviour through `createTerminalRoutes`." Also corrected the same false reason where the test file's header comment repeated it (that file was already being edited for the s10-24 path move).
- **s10-29** applied (src/core/stores/MemoryDefinitionStore.ts, guides/toolbox.md): Replaced "The EXACT twin of DatabaseDefinitionStore" with the shared contract plus the two measurable differences (this store copies on write and on read; the table-backed store narrows an untrusted stored blob and reports `undefined` for a malformed one). Corrected the guide's Stores paragraph as the repair names, and also the Patterns row that restated the identical "exact twins" claim, since half-fixing would have left the corrected falsehood standing verbatim in the same guide.
- **s10-31** applied (src/core/stores/MemoryDefinitionStore.ts, src/core/stores/DatabaseDefinitionStore.ts): Applied the class half both lane corrections share: `get`, `set`, and `delete` on both stores now carry matching TSDoc with a description, `@param`, and `@returns`, including the no-op `delete` of an absent id. Dropped the interface-signature and guide items per the corrected repair, and re-verified the guide claim: guides/toolbox.md already carries the `## Methods` table for `DefinitionStoreInterface`, so that item was already closed. Removed the two body comments in MemoryDefinitionStore that the new `@param` text now states.
- **s10-32** deferred_breaking: Deferred. `MAX_WORKFLOW_DEPTH` is a barrelled public const; renaming it to `WORKFLOW_CHAIN_DEPTH` (the corrected form) breaks the published surface. The lanes agree the current name is wrong but the rename is not separable from it.
- **s10-33** applied (src/core/types.ts, src/core/constants.ts, src/core/helpers.ts, src/core/factories.ts, src/core/shapers.ts, src/core/stores/DatabaseDefinitionStore.ts, src/core/stores/MemoryDefinitionStore.ts, src/server/types.ts, src/server/constants.ts): Deleted every `AGENTS §N` / `§N` citation from src/ (verified: `grep -rn '§' src/` now returns nothing) and kept the claim beside each. Where the rule carried the sentence, it was restated in one clause: the batch-overload pointers became "the array form ... resolves FIRST, so an array argument is read as many keys/rows rather than one"; "(AGENTS §5: types are the SOURCE OF TRUTH...)" became a plain clause; the §22 bijection references became "the method bijection". The `§` citations in tests/ sit outside the finding's stated file set and were left.
- **s10-34** applied (src/core/types.ts, src/core/constants.ts, src/core/helpers.ts, src/core/shapers.ts, src/core/factories.ts): types.ts: "a caller-constructed database it manages alongside store-backed ones". constants.ts and shapers.ts: "the instructions the sub-agent carries out" in both the AGENT_TOOL_DESCRIPTION line and the `agentToolShape` field description, so the model-facing text agrees. helpers.ts:291/409/421: rewritten with s10-17 and s10-18 so no `should` survives. factories.ts: "so the model can start writing". The description constants are asserted against themselves in tests/src/core/factories.test.ts (not against literals), so no test needed updating; the full suite is green.
- **s10-38** deferred_wave: Deferred to the fleet TSDoc-voice wave per the dispatch. Not applied here. Per the brief's second consequence, every first sentence I did rewrite for another finding was written in the third-person `-s` form: `terminalToolCode`, `databaseToolCode`, `relationToolCode`, `workflowToolSummary`, and the six new store method descriptions.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 3021ms on 68 files using 4 threads. (First run flagged guides/toolbox.md and src/core/validators.ts; converged with `npm run lint` then `npm run format`, then re-ran the non-mutating chain.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0. (An earlier run reported `src/core/helpers.ts:283:23: warning eslint(no-shadow): 'spec' is already declared in the upper scope`, caused by my s10-16 rename; fixed by naming the loop variable `columnSpec`.)
- npm run check: pass — tsc --noEmit --project tsconfig.json && check:src:core && check:src:server — no diagnostics, exit 0.
- npm run build: pass — build:src:core and build:src:server both `✓ built`; declaration files built in 2486ms / 1806ms; dist/src/server/index.js 8.47 kB. The API Extractor line `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine` is pre-existing toolchain noise, not an error.
- npm test: pass — test:src 9 files / 445 tests passed; test:policy 1 / 111 passed; test:config 1 / 46 passed; test:setup 2 / 17 passed; test:guides 1 / 28 passed. Whole chain run in order as one command, EXIT=0.

## Diffstat

```text
Tracked working-tree diff (`git diff --stat`, real index untouched, nothing staged):

 guides/toolbox.md                                  |  73 +++++----
 src/core/constants.ts                              |   4 +-
 src/core/factories.ts                              |  33 ++--
 src/core/helpers.ts                                | 166 +++------------------
 src/core/index.ts                                  |   1 +
 src/core/shapers.ts                                |  16 +-
 src/core/stores/DatabaseDefinitionStore.ts         |  35 +++--
 src/core/stores/MemoryDefinitionStore.ts           |  31 +++-
 src/core/types.ts                                  |  73 ++++++---
 src/server/constants.ts                            |   2 +-
 src/server/factories.ts                            |   2 +-
 src/server/index.ts                                |   2 +-
 src/server/types.ts                                |   4 +-
 src/server/routes/TerminalConnection.ts            | 140 -----------------
 src/server/routes/TerminalRoutes.ts                | 138 -----------------
 tests/src/server/routes/TerminalConnection.test.ts |  96 ------------
 16 files changed, 205 insertions(+), 611 deletions(-)

That view omits the new/moved paths, which are untracked. The same diff computed with rename detection against a throwaway index (GIT_INDEX_FILE copy; the repository index was not modified):

 guides/toolbox.md                                  |  73 +++++----
 src/core/constants.ts                              |   4 +-
 src/core/factories.ts                              |  33 ++--
 src/core/helpers.ts                                | 166 +++------------------
 src/core/index.ts                                  |   1 +
 src/core/shapers.ts                                |  16 +-
 src/core/stores/DatabaseDefinitionStore.ts         |  35 +++--
 src/core/stores/MemoryDefinitionStore.ts           |  31 +++-
 src/core/types.ts                                  |  73 ++++++---
 src/core/validators.ts                             | 110 ++++++++++++++
 src/server/constants.ts                            |   2 +-
 src/server/factories.ts                            |   2 +-
 src/server/index.ts                                |   2 +-
 .../{routes => terminals}/TerminalConnection.ts    |   3 +-
 src/server/{routes => terminals}/TerminalRoutes.ts |   0
 src/server/types.ts                                |   4 +-
 .../TerminalConnection.test.ts                     |   6 +-
 17 files changed, 319 insertions(+), 242 deletions(-)

Untracked additions: src/core/validators.ts, src/server/terminals/TerminalConnection.ts, src/server/terminals/TerminalRoutes.ts, tests/src/server/terminals/TerminalConnection.test.ts.
No off-limits path appears in `git status`: package.json, package-lock.json, AGENTS.md, .claude/**, .agents/**, .codex/**, .cursor/**, tests/setupPolicy.ts, tests/policy.test.ts, configs/**, vendored guides/<other>.md, and .orkestrel/** are all unmodified. The tree is uncommitted and unstaged.
```

- dist moves: true

## Deviations

Three items for the work order; none stopped the unit.

1. s10-16 — genuine lane conflict, not resolved here. One lane corrects the finding to reject the `ColumnKind` -> `ColumnFormat` and field `type` -> `format` rename, because shapers.ts publishes `type` into the model-facing JSON Schema where it is the standard keyword and `format` already means something else there. The other lane says the rename stands and extends it into the published schema `description` strings and the model-facing guide rows. Per the brief I applied only what they share (the helpers.ts local-variable fix) and resolved nothing. The rename is breaking regardless, so it reaches the work order either way — but the work order still has to settle which lane is right before that rename can be written.

2. Adjacent same-class drift at locations no dossier finding names, left in place. It is the same defect as s10-17 (stale "upcoming") and s10-19/s10-20 (campaign identifiers and counts in published TSDoc), and some of it ships in dist/src/core/index.d.ts: `src/core/constants.ts:317,328,335,387` and `src/core/factories.ts:998` still say "the upcoming database / relation tool(s)" while `createDatabaseTool` and `createRelationTool` both exist; `src/core/constants.ts:321` still reads "SRC-1 of a 3-unit spine" — a campaign identifier and a count in a published TSDoc block; `SRC-N` markers also remain in `//` section headers at `src/core/shapers.ts:383,590`, `src/core/factories.ts:994,1040,1290`, and `src/core/helpers.ts:456` (those do not ship). I stayed inside the dossier's named repair sites rather than widening scope. This is the carrier for the next change.

3. Ancillary choices recorded rather than reported as conflicts: the s10-16 loop variable is `columnSpec`, not `spec`, because `spec` is the enclosing `expandTables` parameter and oxlint no-shadow rejected it; the s10-14 guide rows moved into a new `### Validators` section (guides parity re-verified green); and `guides/toolbox.md` reflowed its Markdown tables under `npm run format` because the added rows changed column widths, which accounts for most of that file's diff.
