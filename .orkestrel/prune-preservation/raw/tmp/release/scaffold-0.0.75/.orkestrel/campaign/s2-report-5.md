# Unit S2-5 report — the vendored-import proof reads imports with the parser

The vendored-import proof reads specifiers from the parsed module. The failure the brief names is
closed, every acceptance gate exits 0, and the two controls that certify the reading run red before
the fix and green after.

## Touched files

- `tests/setupServer.ts` — adds the exported `readSpecifiers` function: it parses the module with
  `parseSync` and reports one entry per import, in source order, `undefined` where the argument
  resolves to no literal string.
- `tests/setupServer.test.ts` — adds the `the parsed specifier reader` sibling proof: every import
  form in source order, the quoted-and-commented specifier the reading refuses beside the text
  pattern that reports it, the unresolvable arguments, and the parser refusal.
- `tests/src/server/helpers.test.ts` — the `vendored imports` proof now reads through
  `readSpecifiers`, keeps the four pre-existing controls, and adds `control/quoted.ts` and
  `control/expression.ts`.

```text
 tests/setupServer.test.ts        | 74 +++++++++++++++++++++++++++++++++++++
 tests/setupServer.ts             | 79 ++++++++++++++++++++++++++++++++++++++++
 tests/src/server/helpers.test.ts | 35 ++++++++++++++----
 3 files changed, 180 insertions(+), 8 deletions(-)
```

## Forms found in the vendored modules

`HOST_PATHS` contributes five JavaScript or TypeScript modules — `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/helpers.ts`, `configs/policy.ts`. The
`scripts` directory contributes nothing, because it holds `.sh` files alone and the proof's glob
takes `ts,mts,cts,js,mjs,cjs`.

- **Static `import` and `import type` declarations only.** No vendored module carries a `require`
  call, and none carries a dynamic `import()`. `configs/policy.ts` imports nothing at all.
- The specifiers the reading returns, per module, in source order:
  - `tests/setupPolicy.ts`: `@orkestrel/guide`, `@orkestrel/scaffold`, `node:fs`, `node:os`,
    `node:path`, `node:url`, `vite`, `../configs/policy.js`
  - `tests/policy.test.ts`: `node:fs`, `node:path`, `vitest`, `../configs/policy.js`,
    `./setupPolicy.js`
  - `tests/config.test.ts`: `node:child_process`, `node:fs`, `node:module`, `node:os`, `node:path`,
    `node:url`, `vite`, `oxlint/plugins-dev`, `../configs/helpers.js`, `../configs/policy.js`,
    `../vite.config.js`, `../tsconfig.json`, `./setupPolicy.js`, `vitest`
  - `configs/helpers.ts`: `vite`, `vite`, `node:url`, `node:child_process`, `node:module`,
    `node:os`, `node:fs`, `node:path`
  - `configs/policy.ts`: none
- **Coverage of the search that answers this.** The reading itself ran over exactly those five
  files (instrument: `tmp/probe/shapes.mjs` for the node shapes, then `readSpecifiers` over each
  file). A `grep -n "require(\|import("` over the same five files matched two lines, and neither is
  an import: `tests/config.test.ts:2086` carries `import('./module.js')` inside a string literal,
  and `configs/helpers.ts:690` names `import()` inside a comment. So the unknown the brief raised
  resolves to "no unreadable form exists in the vendored set today", and no deviation was needed.

## Controls

Every count comes from the command quoted with it. The scoped command is
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts -t "imports only Orkestrel packages"`,
written as `<scoped>` in the following rows.

### The defect the unit closes

- **Before**, at baseline `28d2cf3f`: `<scoped>` → `1 failed | 221 skipped (222)`.
  `AssertionError: expected [ Array(1) ] to deeply equal []`, received
  `["tests/setupPolicy.ts: @orkestrel/contract"]`.
- **After**: `<scoped>` → `1 passed | 221 skipped (222)`.

### `S2-5-C1` — the quoted specifier is no longer an import

The control is `control/quoted.ts`: a module whose only `@orkestrel/console` text sits inside a
string literal and inside a comment. It is drawn from outside the population of imports, which is
what the reading rules on.

- **Red against the text-pattern reader.** With the new controls in place and the loop reading
  `module.content.matchAll(/\b(?:from|import|require)\s*\(?\s*(['"`])(@orkestrel\/[^'"`]+)\1/gu)`:
  `<scoped>` → `1 failed | 221 skipped (222)`. The received list carried
  `control/quoted.ts: @orkestrel/console undeclared` twice — once for the string literal, once for
  the comment — plus `control/expression.ts: @orkestrel/${part} undeclared`.
- **Green with the parser reading**: `<scoped>` → `1 passed | 221 skipped (222)`.

### `S2-5-C2` — the four pre-existing controls still discriminate

Mechanism red by disabling the parser read once: `readSpecifiers` seeded its walk with
`const pending: unknown[] = []` instead of `[parsed.program]`.

- **Red**: `<scoped>` → `1 failed | 221 skipped (222)`, `expected [] to strictly equal [ …(5) ]` —
  every one of `control/from.ts`, `control/dynamic.ts`, `control/guide.ts`, `control/console.ts`,
  and `control/expression.ts` stopped reporting.
- **Green after restoring the seed**: `<scoped>` → `1 passed | 221 skipped (222)`, and the whole
  project `npm run test:src:server` → `466 passed | 7 skipped (473)`.
- **What this control does not establish.** `control/quoted.ts` stays green under the disabled
  read, because a reader that extracts nothing also reports no false positive. That control rules on
  the reading's precision alone, and the four import-carrying controls are what rule on its recall.

### `S2-5-C3` — the extractor's sibling proof

`readSpecifiers` is exported from `tests/setupServer.ts`, so its proof is
`tests/setupServer.test.ts > the parsed specifier reader`, collected by the `setup` project.

- **Red under the same disabled read**: `npm run test:setup` → `3 failed | 158 passed | 3 skipped
  (164)` — the source-order case, the unresolvable-argument case, and the parser-refusal case.
- **Green**: `npm run test:setup` → `161 passed | 3 skipped (164)`, exit 0.

## Gates

| Command                  | Exit | Totals                                                              |
| ------------------------ | ---- | ------------------------------------------------------------------- |
| `npm run format:check`   | 0    | All matched files use the correct format (227 files)                |
| `npm run lint:check`     | 0    | No diagnostic printed                                               |
| `npm run check`          | 0    | Root project plus `check:src:core`, `check:src:server`, `check:src:bin` |
| `npm run test:src:server`| 0    | `Test Files 5 passed (5)`, `Tests 466 passed \| 7 skipped (473)`      |
| `npm run test:setup`     | 0    | `Test Files 3 passed (3)`, `Tests 161 passed \| 3 skipped (164)`      |
| `npm run test:policy`    | 0    | `Test Files 1 passed (1)`, `Tests 110 passed (110)`                  |

`npm run lint` and `npm run format` were run once each to converge before the checks; each exited
0, and `format` reported 227 files.

**Observation, not a criterion.** `npm test` → exit 0: `src:core` 421 passed (421), `src:server`
466 passed | 7 skipped (473), `src:bin` 257 passed (257), `policy` 110 passed (110), `config` 173
passed | 1 skipped (174), `setup` 161 passed | 3 skipped (164), `guides` 23 passed (23).

## Decisions recorded under the deviation contract

- **The reading covers a `require` call, which the brief's form list did not name.** The replaced
  text pattern matched `require`, and the proof's glob admits `.cjs` and `.cts` modules, so reading
  only the forms the brief listed would have narrowed the proof's coverage while replacing its
  instrument. The `require` reading is proved in the sibling proof, both for a string argument and
  for an argument it cannot resolve. No vendored module uses the form today.
- **`control/expression.ts` was added beside `S2-5-C1`.** The brief requires an unresolvable
  dynamic import to report as unreadable rather than be skipped; this control is what exercises
  that branch in the file that carries it, and it appears in the `controlled` list as
  `control/expression.ts: unreadable import`.
- **Name and placement**: `readSpecifiers` in `tests/setupServer.ts`, beside the existing
  `readStatements` function and with the same `(source, name)` parameter order. `readStatements`
  reports a statement projection for a module lift and reads no nested expression, so it cannot
  report a dynamic import; the fleet surface rule is satisfied because no installed `@orkestrel/*`
  package exports the bare name `readSpecifiers`.

## Claims I flag as least certain

1. **The unreadable branch on the vendored side is unexercised.** `imported.push('… unreadable
   import')` has no input today, because no vendored module carries an unresolvable import. Only the
   control side of that branch runs, so what is proven is the reading's `undefined` report and the
   control's phrasing, not the vendored phrasing.
2. **`readSpecifiers` walks parser nodes structurally**, matching a node by its `type` member rather
   than through a typed ESTree visitor, and it skips a node whose `start` is not a number. Every
   oxc ESTree node carries a numeric `start` in the readings taken here, and the source-order case
   in the sibling proof fails if one stops doing so, but that guard would drop an import rather than
   report it if a future parser version changed the field.
3. **Two forms are outside the reading, by declaration**: an `import()` in type position, which
   parses as `TSImportType`, and a load through a binding another name holds, such as a
   `createRequire` result. Neither appears in the vendored set. Both are named in the function's
   `@remarks`.
4. **The `@orkestrel/` filter is unchanged**, so the proof still rules on Orkestrel specifiers
   alone. The parser now reports every specifier, including `vitest`, `oxlint/plugins-dev`, and
   relative paths, and nothing rules on those. Widening the ruling is outside this unit.

## Instruments left on disk

`tmp/probe/shapes.mjs` is the throwaway probe that read the parser's node shapes — that
`ImportExpression` names its argument `source`, that a template literal exposes
`quasis[0].value.cooked` with an empty `expressions` list, that a `require` call is a
`CallExpression` with an `Identifier` callee, and that each node is a plain object whose
`Object.values` walk reaches its children. Its findings are pinned by the sibling proof. Retain or
sweep it with the unit's other launch copies.
