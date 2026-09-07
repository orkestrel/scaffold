# Unit D6b-fix — report

Every item is applied. The gates run green, and the observations read as the brief predicted.

## Items

- **O1** — `Entry.bundled` and `Entry.declaration.bundled` renamed `browsable`: declaration
  (`src/core/templates.ts:1182`, `:1184`), the `buildStage` local and its reads
  (`:1674`, `:1676`, `:1687`, `:1689`), the pushed record (`:1685`), the unreachable filter
  (`:1841`), the browser drive's gate and demand (`:2042`, `:2046`), the guard fragment's filter
  (`:2089`), and the pinned occurrences in `tests/src/core/templates.test.ts:1563-1653`. Every
  Vite-bundle sense (`:1984`, `:2005`, `:2034`) and every Playwright bundled-browsers sense
  (`:688-960`) is unchanged.
- **O2** — `Entry`'s member order now reads `subpath`, `specifier`, `mapping`,
  `declaration` (`importable`, `requirable`, `browsable`), then `browsable`, `importable`,
  `requirable`, `loadable` (`src/core/templates.ts:1177-1190`). The pushed record in `buildStage`
  (`:1679-1691`) and every pinned expectation in `tests/src/core/templates.test.ts:1554-1655`
  follow the same order.
- **O3** — the `Entry` leading comment (`src/core/templates.ts:1172-1176`) reads verbatim: "One
  published subpath, resolved to what this proof can drive: the specifier a consumer writes,
  whether the declarations its consumer formats resolve at all, whether the exports map answers
  the browser condition with a target of its own, whether it answers \`import\` and \`require\` at
  all, and whether the target that \`require\` answers with is one that a CommonJS consumer loads."
- **O4** — `selectUntypable`'s comment (`src/core/templates.ts:1475-1477`) reads: "Requirable
  entries that declare CommonJS support but a typed CommonJS consumer cannot compile against. A
  default branch resolving under the require condition set makes no CommonJS claim."
- **O5** — every gate and observation ran; results below.

## Deviation carried through cleanly

Renaming the local `bundled` to `browsable` widened `const requirable = requireTarget !==
undefined && !(bundled && requireTarget === browserTarget)` from 99 to 101 columns, which broke
`tests/src/core/templates.test.ts`'s emitted print-width and oxfmt-fixed-point assertions
(`test:src:core` first ran red on those two cases). This is a mechanical consequence of O1's
required rename, not a new decision: the fix splits the boolean into an intermediate local,
`const overrides = browsable && requireTarget === browserTarget` followed by `const requirable =
requireTarget !== undefined && !overrides` (`src/core/templates.ts:1674-1676`), both under the
100-column print width. `test:src:core` reran green after the split (below). No pinned
expectation, member name, or member order changed from this.

## Criteria

1. `grep -n "bundled" src/core/templates.ts` — only the Vite-bundle sense (`:1984`, `:2005`,
   `:2034`) and the Playwright bundled-browsers sense (`:688-960`, including the `resolveBundledBrowser`
   local at `:959-960`). None under `Entry`, `buildStage`, the drives, or the guard.
   `grep -c "browsable" src/core/templates.ts` — 11.
   `grep -n "Requirable entries" src/core/templates.ts` — prints line 1475, the comment text in O4.
2. `npm run format:check` — exit 0. Last line: `All matched files use the correct format.`
   `npm run lint:check` — exit 0, no diagnostics.
   `npm run check` — exit 0, no diagnostics from `tsc --noEmit --project tsconfig.json`,
   `check:src:core`, `check:src:server`, `check:src:bin`.
3. `npm run test:src:core` — exit 0. Last lines: `Test Files  9 passed (9)` /
   `Tests  402 passed (402)`.
4. `npm run build` — exit 0. `host.json` digest identical across two `npm run build:inventory`
   runs: `d05eed514c5b9e95870ae4a3954fb66cfa51d1ab47f9b23de050eb2eb3461228` both times, staging 122
   files each time.
5. Observations, run once under the session scratchpad
   (`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/d6b-fix-emit`),
   nothing written into the repository:
   - Emitted the core/server proof (`createBlueprint('sample', { src: ['core', 'server'] })`) and
     the core/browser proof (`createBlueprint('sample', { src: ['core', 'browser'] })`) through
     `blueprintToTestArtifacts` from the built `dist/src/core/index.js` entry, plus the browser
     variant's `configs/browsers.ts` sibling through `blueprintToConfigArtifacts`.
   - Both variants typecheck at exit 0 under `module: NodeNext`, `strict`,
     `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `types: ["node", "vite/client"]`,
     against the repository's installed `typescript`, each in its own scratch workspace with a
     symlinked `node_modules` back to `/home/user/scaffold/node_modules`.
   - Neither emitted proof carries a line over 100 columns with tabs expanded to 2 columns each
     (926 lines in the server variant, 1040 in the browser variant checked; both `over-width
     lines: []`).
   - `PATH=/opt/npm11/bin:$PATH npm run test:distribution`, run once with npm 11.19.1 first on the
     path — exit 1. `Test Files  1 failed (1)` / `Tests  1 failed | 4 passed (5)`. The one red case
     is `installed package consumer > installs the packed scaffold and passes one generated
     core/server workspace through prepublish [requires a reachable npm registry]`, failing at
     `tests/distribution.test.ts:938` with `expected 2 to be +0`. Every other case passed. This is
     the packed-install case the standing condition names as red by dependency order, not a
     regression from this unit's edits.

## Tree

`git status --short`:

```text
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M README.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/templates.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/helpers.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/templates.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

`git diff --stat` over the owned files:

```text
 src/core/templates.ts            |  70 +++++++++++++------------
 tests/src/core/templates.test.ts | 108 +++++++++++++++++++--------------------
 2 files changed, 90 insertions(+), 88 deletions(-)
```

Everything outside the owned files is the pre-existing D4 through D6b baseline this unit was
dispatched over.

## Flagged claims

- **The `overrides` local is new, not named by the brief.** The brief's O1 names the local rename
  sites exactly (`:1674`, `:1675`, `:1686`, `:1687` in the original line numbering); it does not
  anticipate that the two-character-longer `browsable` spelling would push the `requirable`
  assignment over the print width the `d6b-template-rename-report.md` ancillary decision already
  measured at 99 columns for `bundled`. The split keeps every named member and local at its
  required name and adds one intermediate local the brief's file:line list does not mention. It is
  reported here rather than silently folded into O1's edit list.
