# Unit D5-fix — report

D5's landing stands. The rule states the invariant it protects, its gate reads that invariant as an
allowlist, the generated root `tsconfig.json` maps each workspace's own published specifiers to its
source, the seed is planned with guides, and every project the landing reddened is green.

One criterion is not literally met and one shape decision departs from the brief's suggestion. Both
are recorded under § Flagged claims, and neither blocks the objective.

## K1. The rule

`.claude/rules/workspace.md:77-83`. The bullet is the brief's text verbatim, wrapped at the file's
width. No other line moved; D4's table edit, now at `:131-140`, is untouched.

## K2. The gate

`tests/src/server/helpers.test.ts:175-244`, the case at `:182`,
`imports only Orkestrel packages every workspace declares from each vendored module`.

- Population unchanged: every `HOST_PATHS` member matching `/\.[cm]?[jt]s$/u`, directories walked.
  `:207-209` states it before drawing from it and now names `scripts/docs.ts` as well as
  `tests/config.test.ts`.
- Extractor: `/\b(?:from|import|require)\s*\(?\s*(['"`])(@orkestrel\/[^'"`]+)\1/gu`, which reads an
  `import`, an `export … from`, an `import()`, and a `require()` position.
- Ruling: the scope plus the first path segment, so `@orkestrel/test/server` is declared when
  `@orkestrel/test` is; `Object.hasOwn(BASE_DEV_DEPENDENCIES, …)` at `:227-230` is the allowlist.
- Inline controls at `:201-206`, asserted as one list at `:236-241`. They carry the two existing
  sample strings (`import { value } from '@orkestrel/test/server'` and
  `` await import(`@orkestrel/test/server`) ``), the flagship declared package
  (`@orkestrel/guide`), and one package no workspace declares (`@orkestrel/console`). Each control
  reports its extraction and its ruling on one line, so a reader that extracts nothing and an
  allowlist that admits everything are both visible.
- The gate is `expect(imported).toEqual([])` at `:242`, and each entry it would carry reads
  `<path>: <specifier>`.
- `BASE_DEV_DEPENDENCIES` imported at `:19`.

Failing-first, this checkout, before the rewrite:

```text
$ npm run test:src:server        EXIT=1
 FAIL  tests/src/server/helpers.test.ts:200  expect(imported).toEqual([])  — received ["scripts/docs.ts"]
 Test Files  1 failed | 4 passed (5)   Tests  1 failed | 431 passed (432)
```

After, with the seed present and asserted present in the population:

```text
$ npm run test:src:server        EXIT=0
 Test Files  5 passed (5)   Tests  432 passed (432)
```

## K3. The seed selects with guides

**Shape.** `nameToHostArtifacts(name)` is renamed `blueprintToHostArtifacts(blueprint)`
(`src/core/compilers.ts:1598`), matching every sibling `#draft` spreads;
`src/core/Compiler.ts:297` is the caller. `selectHostPaths(paths, name)` keeps its signature —
see § Flagged claims. The guides filter sits in the artifact compiler:

```ts
const selected = selectHostPaths(HOST_PATHS, blueprint.name).filter(
	(path) => blueprint.guides || path !== 'scripts/docs.ts',
)
```

No new type was needed, so `src/core/types.ts` is unchanged. The doc block carries the new
`@param`, the new `@returns`, a `@remarks` paragraph naming the shared `guides` fact, and an
`@example` rewritten to the new signature.

**Coverage.**

- `tests/src/core/compilers.test.ts:1787`,
  `plans the documentation seed and its script together with guides`: with guides, the seed is
  planned and `blueprintToScripts(indexed).docs` is the strip-types command; without, neither. The
  control asserts the guides-less selection equals the guides selection minus that one path, so a
  filter that took a neighbour reports here rather than in a length.
- `tests/src/core/helpers.test.ts:312`,
  `keeps the documentation seed a candidate whatever else selects it`: the helper's answer is
  name-driven, which is the boundary the shape decision rests on.

A guides-less generated workspace therefore carries no seed, and `repair` there restores nothing at
`scripts/docs.ts`.

## K4. The own specifiers in the root tsconfig

`src/core/compilers.ts:643-693`. `blueprintToRootTsconfig` appends, after the `@src` and `@app`
aliases:

| Condition                            | Entry                                                              |
| ------------------------------------ | ------------------------------------------------------------------ |
| `srcToRoot` finds no single root     | `"@orkestrel/<name>/<environment>": ["./src/<environment>/index.ts"]` per non-core declared environment, in `ENVIRONMENTS` order |
| `blueprint.src` declares anything    | `"@orkestrel/<name>": ["./src/<srcToRoot ?? core>/index.ts"]`      |

The set mirrors `srcToExports`, read through the same `srcToRoot` branch, so a single-environment
selection maps its own bare name to that environment and no subpath — exactly what the `exports`
map publishes. The `app` axis maps nothing.

Two facts the emission had to respect, each measured rather than assumed:

- **Subpaths precede the bare specifier.** Vite's alias record is matched with
  `entries.find(...)` over `matches$1`, which returns true for `importee === pattern` or
  `importee.startsWith(pattern + '/')` (`node_modules/vite/dist/node/chunks/node.js:5313-5318`,
  `:27910-27915`). A bare `@orkestrel/<name>` written first would answer
  `@orkestrel/<name>/server` and replace it with the core entry. `tsc` is unaffected — a
  wildcard-free `paths` key matches exactly — but the emitted order has to satisfy the stricter
  reader.
- **A long entry is emitted wrapped.** npm accepts a package name long enough to push the flat
  entry past the formatter width, and oxfmt breaks such an entry over its own lines, so the flat
  form left the emitted file outside the fixed point `tests/src/core/templates.test.ts:749` holds
  it to. `matchesPrintWidth` now decides the form. That case was red once and is green.

**Repository tsconfig.** `tsconfig.json:26-27` carries
`"@orkestrel/scaffold/server": ["./src/server/index.ts"]` and
`"@orkestrel/scaffold": ["./src/core/index.ts"]`. The byte-identical comparison at
`tests/src/core/compilers.test.ts:1187` proves the hand edit equals the regenerated form, and the
built CLI agrees:

```text
$ node dist/bin/main.js audit --groups configs --offline        EXIT=0
0 of 17 planned paths drifted from the plan. Audit compared bytes at 16, existence at 1, and nothing at 0.
```

**Coverage.** `tests/src/core/compilers.test.ts:2018`, `blueprintToRootTsconfig own specifiers`:

- `maps every published subpath before the bare specifier and maps no app entry` asserts the whole
  `paths` block as one text, so membership, order, and the trailing-comma layout are read together,
  and asserts the mirrored subpath set against `srcToExports` rather than against a second copy of
  the rule.
- `maps a single published environment at the bare specifier alone`.
- `maps no own specifier for a workspace that publishes nothing`.

## K5. The guide

`guides/scaffold.md`:

- `:1035-1041` — the seed is planned with `guides`, and in the package publishing the readers
  `npm run build` precedes `npm run docs`, because the package's own name resolves through its
  `exports` map to `dist/`; `npm run check` there stays independent of the build.
- `:1371-1380` — the generated root `tsconfig.json` carries the own published specifiers, why
  (`npm run check` would otherwise wait on `npm run build`), why every subpath precedes the bare
  specifier, and that an `app` environment maps nothing.
- `:254` — the `## Surface` row renamed to `blueprintToHostArtifacts`, moved to its alphabetical
  position, `Summary` rewritten from the new description paragraph. `:1265` — the prose reference
  renamed. No `## Methods` row names either symbol.
- `:17` and `:1239` — the vendored-set enumeration in § Vendored data root now names the
  documentation-parity seed, matching the opening paragraph D5 edited, and states that the `guides`
  fact rather than the name selects it.
- The guide documents no vendored-set import limit, so K1 has no counterpart there to align.
  `guides/README.md` unchanged.

## K6. The tallies

`tests/src/core/Compiler.test.ts` is unchanged, and its tallies now read their measured values
without an edit. The fixture is `createBlueprint('widget', { src: ['core', 'server'] })`, whose
`guides` defaults to `false`, so K3 withholds the seed and the plan returns to its pre-D5 size.

| Reading                    | Line | Committed | Before K3 | After K3 |
| -------------------------- | ---- | --------- | --------- | -------- |
| `plan.artifacts`           | `:71` | 39       | 40 (red)  | 39       |
| `origin === 'computed'`    | `:72` | 1        | 1         | 1        |
| `origin === 'template'`    | `:73` | 17       | 17        | 17       |
| `origin === 'host'`        | `:74` | 21       | 22 (red)  | 21       |

P1's proposed patch is therefore withdrawn rather than applied.

## K7. The inventory

`npm run build` regenerated `dist/host` and `host.json` twice (once after K1, once after the guide
edits). The `.claude/rules/workspace.md` and `guides/scaffold.md` digests moved; the
`scripts/docs.ts` entry stayed. The staged file total is unchanged at 122.

## The Unknowns, answered

**Does any test pin the exact `paths` key set of a generated root tsconfig?** No test did before
this unit. `tests/config.test.ts:82-105` builds a `required` map from present `src`/`app` entry
files, demands each is declared and resolves, and never asserts the declared set has no further
member — so the two own specifiers pass it untouched, and it is green. Across `tests/`, the only
other `paths` readings are `tests/config.test.ts:2289` (a fixture literal inside a config case)
and prose. `tests/src/core/compilers.test.ts:1187` compared the generated `tsconfig.json` against
this repository's own bytes, which is why the hand edit was required, not optional. The block is
now pinned by the case this unit added at `:2018`.

**Does the Vite alias for `@orkestrel/scaffold` change how `tests/guides.test.ts` executes the
guide fences?** No. That file never imports the workspace's published specifier: it reads source
through `@src/core` and `../src/bin/...` (`tests/guides.test.ts:1-36`), the fence cases at
`:222-236` compare `statement.specifier` as text against the extracted surface, and the executable
fences at `:240` onward are transcribed by hand as ordinary `it` cases importing `@src/core`. The
observation confirms it: `npm run test:guides` fails on exactly the same two cases with exactly the
same totals as before this unit. `tests/config.test.ts`'s alias case is green (§ Criteria, 5).

## Criteria, in the brief's order

| # | Command | Exit | Last lines |
| - | ------- | ---- | ---------- |
| 1 | `grep -n "cannot depend on itself" .claude/rules/workspace.md` | 1 | no output |
| 1 | `grep -n "BASE_DEV_DEPENDENCIES" tests/src/server/helpers.test.ts` | 0 | `19:`, `178:` (comment), `226:` |
| 1 | `grep -n "@orkestrel/scaffold" tsconfig.json` | 0 | `26:"@orkestrel/scaffold/server": ["./src/server/index.ts"],` `27:"@orkestrel/scaffold": ["./src/core/index.ts"]` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 9239ms on 223 files using 4 threads.` |
| 2 | `npm run lint:check` | 0 | `oxlint --config .oxlintrc.json --deny-warnings .` (no diagnostic) |
| 2 | `npm run check` | 0 | `tsc --noEmit -p configs/src/tsconfig.bin.json` |
| 3 | `npm run test:src:server` | 0 | `Test Files  5 passed (5)` / `Tests  432 passed (432)` |
| 4 | `npm run test:src:core` | 0 | `Test Files  9 passed (9)` / `Tests  397 passed (397)` |
| 5 | `npm run test:config` | 0 | `Test Files  1 passed (1)` / `Tests  172 passed \| 1 skipped (173)` |
| 5 | `npm run test:policy` | 0 | `Test Files  1 passed (1)` / `Tests  91 passed (91)` |
| 6 | `npm run build` | 0 | `build-inventory: staged 122 file(s) into host.json` |
| 6 | `sha256sum host.json`, `npm run build:inventory`, `sha256sum host.json` | 0 | `8f4e1b6214c701cd23c3d1fd0607f4fed0a7cc06de434bf767d8b446a3d8c1e9` both times |
| 6 | `node dist/bin/main.js audit --groups configs` | 1 | see § Flagged claims |
| 6 | `node dist/bin/main.js audit --groups configs --offline` | 0 | `0 of 17 planned paths drifted from the plan. Audit compared bytes at 16, existence at 1, and nothing at 0.` |

The new cases, run by name:

```text
✓ tests/src/server/helpers.test.ts > vendored imports > imports only Orkestrel packages every workspace declares from each vendored module
✓ tests/src/core/compilers.test.ts > content artifact compilers > plans the documentation seed and its script together with guides
✓ tests/src/core/compilers.test.ts > blueprintToRootTsconfig own specifiers > maps every published subpath before the bare specifier and maps no app entry
✓ tests/src/core/compilers.test.ts > blueprintToRootTsconfig own specifiers > maps a single published environment at the bare specifier alone
✓ tests/src/core/compilers.test.ts > blueprintToRootTsconfig own specifiers > maps no own specifier for a workspace that publishes nothing
✓ tests/src/core/helpers.test.ts > selectHostPaths > keeps the documentation seed a candidate whatever else selects it
```

## Observations

**`npm run test:guides`** is red on exactly the two D4 cases, unchanged from the baseline this unit
took at dispatch:

```text
EXIT=1
 FAIL  tests/guides.test.ts > guides > keeps every compared summary and example equal to its source
 FAIL  tests/guides.test.ts > guides > opens the README with the guide tagline
 Test Files  1 failed (1)   Tests  2 failed | 17 passed (19)
```

Before and after are the same case names and the same totals. The surface-parity, fence-import, and
link cases stayed green across the rename.

**`npm run docs`** exits `1` with the key set D5 recorded, one substitution apart:

```text
rows read: 1, disagreements found: 316
EXIT=1
```

316 keys, matching D5's record. `function nameToHostArtifacts` is gone and
`function blueprintToHostArtifacts` is in its place; no other key moved.

**`npm run test:src:server` needs a current `dist/host`.** Both `.claude/rules/workspace.md` and
`guides/scaffold.md` are staged paths, so `readHostFloor` reported
`The vendored host cannot read the declared file at …` until `npm run build` ran. The build was run
after the last edit to any staged path, and every reading in this report is post-build.

## Shared-file patches, report-only

The rename leaves stale prose references in files this brief puts off-limits. None breaks a
gate — each is a plain code span in a doc block, not a `{@link}` — so each is drift a reader meets
rather than a diagnostic.

**`src/core/constants.ts:130`**

```diff
- * `nameToHostArtifacts` appends {@link CATALOG_AGENT_PATH} to what this list
+ * `blueprintToHostArtifacts` appends {@link CATALOG_AGENT_PATH} to what this list
```

**`src/core/constants.ts:180`**

```diff
- * package's own template pointers. `nameToHostArtifacts` claims
+ * package's own template pointers. `blueprintToHostArtifacts` claims
```

**`src/core/constants.ts:272`**

```diff
- * that lacks the file. `nameToHostArtifacts` appends it to the vendored
+ * that lacks the file. `blueprintToHostArtifacts` appends it to the vendored
```

**`tests/setupServer.ts:1285`**

```diff
- * `nameToHostArtifacts` appends {@link CATALOG_AGENT_PATH} to that selection, so
+ * `blueprintToHostArtifacts` appends {@link CATALOG_AGENT_PATH} to that selection, so
```

A fifth patch is a recommendation rather than a consequence. `src/core/constants.ts` is where the
seed path belongs, and without it `'scripts/docs.ts'` is written as a literal in
`blueprintToHostArtifacts` while the same path sits inside the `docs` command string
`blueprintToScripts` emits:

```diff
+/** Names the vendored module `npm run docs` runs. */
+export const DOCS_SEED_PATH = 'scripts/docs.ts'
```

Both call sites would read it. This is one fact written twice in one file today.

## Flagged claims

**1. `node dist/bin/main.js audit --groups configs` exits 1, and closing that needs an off-limits
file.** The configs group itself is clean — `0 of 17 planned paths drifted` — so K4's own wording
("reports `tsconfig.json` aligned") is met, and the same command with `--offline` exits 0. The
non-zero status comes from five dependency-floor findings the online run adds:

```text
dependencies: @types/node declares the floor ^26.4.0, while the registry serves 26.4.1 within major 26.
dependencies: oxfmt declares the floor ^0.65.0, while the registry serves 0.66.0 within major 0.
dependencies: oxlint declares the floor ^1.80.0, while the registry serves 1.81.0 within major 1.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
```

Every line names a registry version against a `package.json` floor, and no line names a configs
path. `git diff package.json` shows one added line, D5's `docs` script, and no range change, so
these findings predate this unit and are unreachable from anything it owns. Closing them means
raising floors in `package.json`, which the brief puts off-limits. I recorded it and carried on
rather than stopping, because it is ancillary: it neither depends on nor affects the objective.

**2. `selectHostPaths` keeps its `(paths, name)` signature, departing from the brief's suggestion
that it too take from the blueprint.** `tests/setup.ts:819` calls
`selectHostPaths(paths, 'scaffold')` inside `buildPurityCases`, and `tests/setup*.ts` is
off-limits. Widening the parameter to a `Blueprint` makes that call a type error, which reddens
`npm run check` in a file I may not repair — criterion 2 against an off-limits file. The brief
states the shape is mine, so I put the guides filter in `blueprintToHostArtifacts` instead, which
is where the blueprint already is. The cost is the `'scripts/docs.ts'` literal named in the
preceding patch; the case at `tests/src/core/helpers.test.ts:312` pins the boundary so a later
change does not quietly move the gate down into the helper.

**3. `blueprintToHostArtifacts` is a published-surface rename.** It moves the package's public API
and earns the version bump that goes with it. The alternative — `nameToHostArtifacts(blueprint)` —
breaks the `{noun}To{Noun}` projection form `.claude/rules/names.md` fixes, so the name was the
thing that was wrong rather than the file.

**4. The subpath-before-bare emission order rests on a read of Vite's bundled alias plugin, not on
an executed resolution.** `matches$1` and `entries.find` are quoted from
`node_modules/vite/dist/node/chunks/node.js` at the lines named under K4. Nothing in this checkout
imports `@orkestrel/scaffold/server` at runtime, so no suite in this repository would have caught
the reverse order; the emitted order is pinned by the block assertion at
`tests/src/core/compilers.test.ts:2018` instead. A generated workspace that does import its own
subpath under Vitest is where the executed proof lives, and this unit did not create one.

**5. `tests/src/core/templates.test.ts` was neither owned nor off-limits, and it needed no edit.**
Its emit-corpus fixed-point case went red on the long-name entry and was repaired in
`src/core/compilers.ts`, the file that emits the text. The test file is unmodified.

## Tree state

```text
$ git status --short
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M tests/guides.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

`.claude/rules/documentation.md`, `.claude/rules/tests.md`, `package.json`, `src/core/constants.ts`,
`tests/guides.test.ts`, and `scripts/docs.ts` are D4's and D5's uncommitted landings, untouched by
this unit. `.claude/rules/workspace.md` carries D4's table edit and this unit's K1 bullet.

```text
$ git diff --stat        (this unit's files)
 .claude/rules/workspace.md       |  30 +--
 guides/scaffold.md               |  67 +++++--
 host.json                        |  16 +-
 src/core/Compiler.ts             |   4 +-
 src/core/compilers.ts            |  89 +++++++--
 tests/src/core/compilers.test.ts | 416 ++++++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts   |  24 +++
 tests/src/server/helpers.test.ts |  60 +++++-
 tsconfig.json                    |   4 +-
 9 files changed, 642 insertions(+), 68 deletions(-)

$ git diff --stat        (whole tree)
 14 files changed, 715 insertions(+), 88 deletions(-)
```

`tests/src/core/Compiler.test.ts` is absent from that list: K6 closed without an edit.

## Deviation state

No deviation stopped the unit. Every K is done. The two departures — the audit's exit status and
the `selectHostPaths` signature — are recorded under § Flagged claims with the off-limits file each
would need, and each was carried rather than stopped on because neither touches the objective.

## Citations this round renumbered (added by the Orchestrator after the audit round)

The fix round moved lines under D5's citations and none of the D5 report's `file:line` values were re-based in it. At the tree's state after D5-fix:

| D5 citation | Site | Now |
| --- | --- | --- |
| `tests/src/core/compilers.test.ts:611-631` | `emits the documentation seed beside the guides proof` | `:619` opens the case |
| `tests/src/core/compilers.test.ts:1806-2114` | the fixture constants, `buildSeedWorkspace`, `runSeed`, `describe('the documentation seed')` | the `describe` opens at `:2071` and the file ends at `:2188` |
| `guides/scaffold.md:1025-1044` | the equality-gate paragraphs | `:1025-1051`, with this round's paragraph at `:1035-1041` |
| this report's K5 `:1371-1380` | the root tsconfig paragraph | `:1371-1378` after D5-fix; `:1375-1384` after D5-fix-2 |
| this report's K5 `guides/scaffold.md:254` | the `blueprintToHostArtifacts` Surface row | `:255` after D5-fix-2 |
| this report's K5 `guides/scaffold.md:1265` | the renamed prose reference | `:1271` after D5-fix-2 |
| this report's K5 `guides/scaffold.md:1239` | the vendored-set enumeration in § Vendored data root | `:1245` after D5-fix-2 (`:1239` is the section heading) |
