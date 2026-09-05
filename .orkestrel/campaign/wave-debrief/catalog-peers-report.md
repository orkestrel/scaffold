# Unit catalog-peers — report

## Files changed

`git status --short` at completion:

```
 M .claude/agents/orkestrel.md
 M guides/scaffold.md
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M tests/setup.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
```

- `src/core/types.ts` — `CatalogEntry`'s found branch gained `readonly peers: readonly Dependency[]`,
  the missing branch gained `readonly peers?: never`, and the `@remarks` gained the peer-ordering
  sentence.
- `src/core/validators.ts` — `isCatalogEntry`'s found branch gained
  `peers: andOf(isCollection, arrayOf(isDependency))`.
- `src/core/helpers.ts` — `catalogToLayers` now reads `[...entry.dependencies, ...entry.peers]` for
  its edge names; its TSDoc gained the one-sentence peer-counts-like-runtime explanation.
- `src/server/Upstream.ts` — `#edges` takes a third `section: 'dependencies' | 'peerDependencies'`
  parameter and reads `manifest[section]`; `#entry` builds `peers` from
  `this.#edges(outcome.content, version, 'peerDependencies')` beside `dependencies`; the comment above
  `#edges` now states runtime and peer edges are read and development edges are not.
- `src/server/Materializer.ts` — `#recatalog` emits a fifth `Peer dependencies` column, rendering
  `entry.peers` for a found row and an empty cell for a not-found row.
- `tests/setupServer.ts` — `TestPackumentEdges` gained `readonly peer?: Readonly<Record<string,
  string>>`; `buildPackument` writes it as `peerDependencies`; its doc comment names the third edge
  kind. Also touched the `isCatalogEntries` guard-totality fixture (`accepted` array) beyond the two
  named exports, to add `peers: []` to its `CatalogEntry`-shaped literals — see Deviation below.
- `tests/setup.ts` — not in the brief's explicit `Owned` list, but reddened by `npm run check` on the
  new `peers` field: the typed `foundEntry: CatalogEntry` fixture (line 529) gained `peers: []`, and
  the `Record<string, unknown>` `foundEntry` used by `buildUnionCases` (line 691, feeding the
  `isCatalogEntry` guard-totality case) gained `peers: []` so the guard-acceptance case stays true at
  runtime.
- `guides/scaffold.md` § Fleet catalog — column table gained the `Peer dependencies` row; "Only
  `dependencies` is read." became "`dependencies` and `peerDependencies` are read."; the paragraph
  ending "reading it would place packages in rounds that do not exist." gained the peer-ordering
  sentence.
- `.claude/agents/orkestrel.md:123-124` — "derived from the runtime edges in the same row" became
  "derived from the runtime and peer edges in the same row". No other line in that file touched.
- Test files: added `peers: []` (or a declared peer list) to every existing found-row `CatalogEntry`
  fixture in `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`,
  `tests/src/server/Upstream.test.ts`, `tests/src/server/Materializer.test.ts`,
  `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`; added the new cases the brief names
  (peer-only-edge layering, guard refuse/admit on `peers`, `Upstream` peer-edge read, and the
  `Materializer` peer column render).

## Fixture files `npm run check` reddened on the new field

- `tests/setup.ts` (line 529, `foundEntry: CatalogEntry`)
- `tests/src/bin/helpers.test.ts` (lines 583, 627)
- `tests/src/core/helpers.test.ts` (lines 495, 501, 507, 508, 522, 528, 534, 543)
- `tests/src/server/Materializer.test.ts` (lines 1158, 1164, 1212)

All four are outside the brief's narrowly-scoped `tests/setupServer.ts` parenthetical but are
ordinary test files, so they fall under the `Owned` bullet "any further test file `npm run check`
reddens on the new field."

## Acceptance criteria

1. `npm run format:check` — exit 0. `npm run lint:check` — exit 0.
2. `npm run check` — exit 0.
3. `npm run test:src:core` — exit 0 (390 passed).
   `npm run test:src:server` — **1 failure**, exit code 1. `npm run test:src:bin` — **5 failures**,
   exit code 1. See Deviation.
4. `npm run test:guides` — exit 0 (17 passed).
5. Mutation control — see below.

## Mutation control (brief § 7, `catalogToLayers` peer-only-edge case)

Control: temporarily changed `catalogToLayers`'s edge line from
`[...entry.dependencies, ...entry.peers]` to `[...entry.dependencies]` (the `...entry.peers` spread
removed), then restored it.

**Red reading** (spread removed), `npx vitest run --config vite.config.ts --no-cache
--reporter=dot --project src:core -t "peer-only edge"`:

```
FAIL  |src:core| tests/src/core/helpers.test.ts > catalogToLayers > places a dependent one layer after a peer-only edge, and needs the peer spread to do it
AssertionError: expected [ [ '@orkestrel/middleware', …(1) ] ] to strictly equal [ [ '@orkestrel/server' ], …(1) ]
  [
    [
+     "@orkestrel/middleware",
      "@orkestrel/server",
-   ],
-   [
-     "@orkestrel/middleware",
    ],
  ]
```

**Green reading** (spread restored), same command: `Test Files 1 passed | 8 skipped (9)`,
`Tests 1 passed | 389 skipped (390)`.

## Deviation

**Expected:** every acceptance criterion (`npm run test:src:server` exit 0, `npm run test:src:bin`
exit 0) green after the change.

**Found:** 1 failure in `test:src:server` (exit code 1) and 5 in `test:src:bin` (exit code 1), all in the same describe families
(`readHostFloor`, `CLI upstream baselines`) and all throwing the identical shape of error:

```
ScaffoldError: The vendored host cannot read the declared file at .claude/agents/orkestrel.md
 ❯ readHostFloor src/server/helpers.ts:1230:10
```

**Evidence:** I isolated the cause by temporarily reverting only the `.claude/agents/orkestrel.md`
prose edit and re-running the single `readHostFloor` test: it then failed on
`guides/scaffold.md` instead (`The vendored host cannot read the declared file at
guides/scaffold.md`) — confirming both are digest mismatches, not a third cause. `readHostFloor()`,
when the module runs from TypeScript source (`extname(location) === '.ts'`), reads
`HOST_INVENTORY_PATH` (`host.json`, a tracked build product per the brief's Standing conditions) and
verifies each declared file's live bytes against the digest `host.json` records. `host.json` is
off-limits to me and the brief says "do not run `npm run build`... the Orchestrator builds after
integration." Editing `.claude/agents/orkestrel.md` line 123 and `guides/scaffold.md` § Fleet catalog
— both explicitly required by brief items 8 and 9 — changes bytes `host.json` has already digested,
so every test that hydrates the default floor (`readHostFloor()` with no argument, and the CLI
baseline tests that build their fixtures from it) now fails until `host.json` is regenerated.

I restored `.claude/agents/orkestrel.md` to its edited (post-change) state after the isolation check;
`git status --short` above reflects the final state with both prose edits present.

**Done / not done:** the `CatalogEntry.peers` capability itself — types, validator, helper, edge
read, table render, guide, and every test the brief names — is done and green. The 6 test failures
are not a defect in this unit's code; they are the anticipated consequence of editing two
`host.json`-tracked files that the brief also requires, and they resolve once the Orchestrator
rebuilds `dist/`/`host.json` after integration, per the brief's own Standing conditions.

**Hypothesis:** `host.json` needs regenerating (`npm run build`) after this change lands, before
`test:src:server` and `test:src:bin` are re-run as gates.
