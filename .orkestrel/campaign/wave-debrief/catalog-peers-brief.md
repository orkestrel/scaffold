# Unit catalog-peers — a peer edge orders the fleet catalog's layers

## Role and engine

`builder` on Claude Sonnet, a native subagent reading this brief: perform the assignment directly and spawn nothing. You are the only writer in `/home/user/scaffold` while this unit is live.

## Objective

`catalogToLayers` places a package after every fleet package its published version names under `peerDependencies`, the catalog reads those peer edges from the same abbreviated packument as the runtime edges, and the catalog table shows them in their own column.

## Context

**Evidence.** The wave of 2026-09-04 had to publish `@orkestrel/middleware` and `@orkestrel/mcp` after `@orkestrel/server` by hand while the catalog placed middleware at `L2` and server at `L3` (`.claude/agents/orkestrel.md:67,83`). The registry, read 2026-09-05 01:05 UTC with `npm view @orkestrel/middleware peerDependencies --json`, answers `{"@orkestrel/database":"^0.0.13","@orkestrel/server":"^0.0.18"}`, and `@orkestrel/mcp` answers `{"@orkestrel/router":"^0.0.13","@orkestrel/server":"^0.0.18"}`. Every fleet package is `0.0.x`, where a caret pins one exact release, so a peer range names a version that must exist on the registry before the dependent publishes; a dependent published first ships pinned to the older release and its consumers install a conflicting copy.

The code today: `src/core/helpers.ts:719-741` derives layers from `entry.dependencies` alone; `src/server/Upstream.ts:585-626` builds a found row with `dependencies: this.#edges(outcome.content, version)` and `#edges` reads `manifest.dependencies` only ("Development edges are deliberately not read"); `src/core/types.ts:247-261` is the `CatalogEntry` union; `src/core/validators.ts:507-519` is `isCatalogEntry`; `src/server/Materializer.ts:1113-1160` renders the table with headers `['Package', 'Version', 'Layer', 'Runtime dependencies']`; `tests/setupServer.ts:190-193` is `TestPackumentEdges` (`dependencies`, `development`) and `:1660-1673` is `buildPackument`, which writes `dependencies` and `devDependencies` into the version record. The vocabulary for a declared peer in this package is `peers` (`blueprint.peers`, `src/core/compilers.ts:227`) and `peer` for the manifest section list (`ManifestDependencySet.peer`, `src/core/types.ts:127`).

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`; skill: none; guide: `guides/scaffold.md` § Fleet catalog.

**Host.** Linux, bash, working path `/home/user/scaffold`, network available through the proxy (`npm view` works). Foreground commands are capped at 10 minutes; `npm test` is longer than that, so run only the scoped projects named under § Acceptance criteria.

**Measurements.** `git status --short` is clean at dispatch (`tmp/` is ignored). `npm run check` exit 0 and `npm run test:src:core`, `test:src:server`, `test:src:bin` green at the baseline `387087ca`.

**Standing conditions.** None known to fail. `host.json` is a tracked build product; do not run `npm run build` (it rewrites `host.json` and `dist/`; the Orchestrator builds after integration).

## Unknowns

Which test fixtures beyond the files named in § Owned carry a `lookup: 'found'` catalog row: derive the set by running `npm run check` after the type change and add `peers: []` (or the peers the case needs) to every site it reddens; name each file you touched in the report.

## Scope

**Owned.** `src/core/types.ts` (the `CatalogEntry` found branch and its TSDoc only), `src/core/helpers.ts` (`catalogToLayers` and its TSDoc only), `src/core/validators.ts` (`isCatalogEntry` only), `src/server/Upstream.ts` (`#entry` and `#edges` only), `src/server/Materializer.ts` (`#recatalog` only), `tests/setupServer.ts` (`TestPackumentEdges` and `buildPackument` only), `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/server/validators.test.ts`, `tests/src/server/Upstream.test.ts`, `tests/src/server/Materializer.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, any further test file `npm run check` reddens on the new field, `guides/scaffold.md` § Fleet catalog, `.claude/agents/orkestrel.md` lines 123-124 (the prose sentence only; never the marker-bounded table).

**Shared (report-only).** `.agents/orchestration.md` (the Orchestrator lands its § Publishing the fleet sentence), `ROADMAP.md`.

**Off-limits.** Everything else: `README.md`, `.agents/**`, `.claude/rules/**`, `.claude/skills/**`, `src/bin/**`, `host.json`, `dist/**`, `package.json`, `package-lock.json`. `tmp/probe/` is your probe home and is never off-limits.

**What asserts the state this change ends.** The fixtures under every `lookup: 'found'` row in the owned tests (they gain `peers`); `tests/src/server/Materializer.test.ts:1175-1190` (the rendered table gains a column); `tests/src/server/Upstream.test.ts:1128-1160` (the dev-edge case's expectation gains `peers: []`); `guides/scaffold.md:1078-1090` (the column table and the sentence "Only `dependencies` is read"); `.claude/agents/orkestrel.md:123` ("derived from the runtime edges").

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`; no commit, push, install, or build. Undo your own edit by editing.

## The change, exactly

1. `src/core/types.ts`: the found branch of `CatalogEntry` gains `readonly peers: readonly Dependency[]` after `dependencies`; the missing branch gains `readonly peers?: never`. In the TSDoc `@remarks`, after the sentence about `dependencies`, add: "`peers` are the edges the published version declares under `peerDependencies`. A peer edge orders a dependent the same way a runtime edge does: at `0.0.x` a caret peer range pins one exact release, so the peer must be on the registry before the dependent publishes."
2. `src/core/validators.ts`: the found branch of `isCatalogEntry` gains `peers: andOf(isCollection, arrayOf(isDependency))`.
3. `src/core/helpers.ts` `catalogToLayers`: the edge names are `[...entry.dependencies, ...entry.peers].map((dependency) => dependency.name)`. In the TSDoc, where the remarks explain which edges count, add one sentence: "A peer edge counts like a runtime edge, because a caret peer range at `0.0.x` names one exact release the dependent cannot publish ahead of."
4. `src/server/Upstream.ts`: `#edges(content, version, section)` takes the manifest section name as a third parameter typed `'dependencies' | 'peerDependencies'` and reads `manifest[section]`; `#entry` builds the found row with `dependencies: this.#edges(outcome.content, version, 'dependencies'), peers: this.#edges(outcome.content, version, 'peerDependencies')`. Rewrite the comment above `#edges` so it states that runtime and peer edges are read and development edges are not, keeping its reason.
5. `src/server/Materializer.ts` `#recatalog`: headers become `['Package', 'Version', 'Layer', 'Runtime dependencies', 'Peer dependencies']`; a found row's fifth cell renders `entry.peers` the way the fourth renders `entry.dependencies`; a not-found row gets a fifth empty cell.
6. `tests/setupServer.ts`: `TestPackumentEdges` gains `readonly peer?: Readonly<Record<string, string>>`, and `buildPackument` writes it as `peerDependencies` beside the other two sections; extend the doc comment's list of what the abbreviated form carries.
7. Tests. Every existing found-row fixture gains `peers: []`. Add these cases, each named for what it proves:
   - `tests/src/core/helpers.test.ts` under `describe('catalogToLayers')`: a dependent whose only edge is a peer edge lands one layer after the peer (fixture: `@orkestrel/middleware` with `dependencies: []`, `peers: [{ name: '@orkestrel/server', range: '^0.0.18' }]`; `@orkestrel/server` with no edges; expect `[['@orkestrel/server'], ['@orkestrel/middleware']]`). The negative control is a mutation you run and record: with the `...entry.peers` spread removed the case must fail; restore it. Quote both readings in the report.
   - `tests/src/core/validators.test.ts`: a found row without `peers` is refused by `isCatalogEntry`, and one with `peers: []` is accepted.
   - `tests/src/server/Upstream.test.ts`: beside the dev-edge case, a packument built with `peer: { '@orkestrel/server': '^0.0.18' }` and `development: { vitest: '^4.1.10' }` answers `peers: [{ name: '@orkestrel/server', range: '^0.0.18' }]` and reads no development edge.
   - `tests/src/server/Materializer.test.ts`: the rendered table case gains the `Peer dependencies` column; give one row a peer and assert the padded row text as the existing case does.
8. `guides/scaffold.md` § Fleet catalog: the column table gains the row `| \`Peer dependencies\` | Each declared peer edge, as name and range |`; replace "Only `dependencies` is read." with "`dependencies` and `peerDependencies` are read."; after the paragraph ending "reading it would place packages in rounds that do not exist.", add one sentence stating that a peer edge orders a dependent the same way a runtime edge does because a caret peer range at `0.0.x` pins one exact release.
9. `.claude/agents/orkestrel.md:123-124`: "derived from the runtime edges in the same row" becomes "derived from the runtime and peer edges in the same row". Touch nothing else in that file.

Follow the repository's gate order to converge: `npm run lint` then `npm run format`, then prove with `npm run format:check`, `npm run lint:check`, `npm run check`.

## Output

Write `tmp/units/catalog-peers-report.md`: the files changed (from `git status --short`), each acceptance criterion with the exact command and its exit code, the mutation control's two readings quoted, the list of fixture files the type change reddened, and any deviation. Return that report's path and its text as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a named line is not where this brief says, when a gate reddens on something outside the owned files, or when the change needs a file outside § Owned. Decide, record, and carry on from ancillary choices: the exact wording of a test title, where in a doc block a sentence sits.

## Acceptance criteria

1. `npm run format:check` exit 0 and `npm run lint:check` exit 0.
2. `npm run check` exit 0.
3. `npm run test:src:core` exit 0; `npm run test:src:server` exit 0; `npm run test:src:bin` exit 0.
4. `npm run test:guides` exit 0 (guide parity over the changed guide section).
5. The mutation control reads red without the peer spread and green with it.

**Observations, not criteria.** `npm run test:policy`, `test:config`, `test:setup`, and `npm run build`: the Orchestrator runs them after integration.

## Review evidence

The auditor receives `git diff` and `git status --short` rendered by the Orchestrator, plus your report.
