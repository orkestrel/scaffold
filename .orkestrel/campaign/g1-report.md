# Unit G1 report

## Touched files

`git diff --stat`:

```
src/core/helpers.ts            | 5 +++--
tests/src/core/helpers.test.ts | 7 +++++++
2 files changed, 10 insertions(+), 2 deletions(-)
```

## Red then green

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core -t "keys an abstract class head"`

- Before the grammar change: 1 failed, 0 passed (`AssertionError: expected [] to deeply equal [ 'class Widget', 'Widget.walk' ]`).
- After the grammar change: 10 passed, 0 failed (full `collectKeys` describe block, run with `-t "collectKeys"`).

The added case lives in `tests/src/core/helpers.test.ts`, named `'keys an abstract class head and its member the same as a plain class head'`, beside the existing `'keys a class and its member the way its own documented example states'` case. It drives `collectKeys(extractSourceLines(['export abstract class Widget<T> {', '\twalk(): void', '}'].join('\n')))` and asserts `['class Widget', 'Widget.walk']`.

## Grammar

`src/core/helpers.ts:2096` (unchanged line count, in place): pattern changed from
`/^export (?:async )?(function\*?|class|const|interface|type) (\w+)/` to
`/^export (?:async )?(?:abstract )?(function\*?|class|const|interface|type) (\w+)/`.

TSDoc sentence at `:2076` now reads "An owner opens at a column-zero `export class`, `export abstract class`, or `export interface` head and closes at the first column-zero `}`, ...".

## Guide

None enumerates the forms. `guides/guide.md:65`, `:133-134`, and `:572` mention `export class` / `export interface` only in the context of `Declaration`, `DeclarationKeyword`, and `collectDeclarations`/`extractDeclaration` — a separate reflection grammar over class/interface bodies, not `collectKeys`'s head forms (`function`/`class`/`const`/`interface`/`type`). No guide.md sentence enumerates the `collectKeys` head-form set, so none needed the `abstract class` addition. `npm run test:guides` stayed green throughout (37 passed, both before and after the source edit).

## Scoped validation

- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core -t "keys an abstract class head"` — red then green, shown above. Exit 0 once green.
- `npm run test:src:core` — 9 test files passed, 648 tests passed. Exit 0.
- `npm run lint:check` — no output, exit 0.
- `npm run check` — `tsc --noEmit` over `tsconfig.json`, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json`, no output, exit 0.
- `npm run test:guides` — 1 test file passed, 37 tests passed. Exit 0.
- `grep -n "abstract" src/core/helpers.ts` — shows the pattern line (`:2097`, shifted by one from the added TSDoc line) and the TSDoc sentence (`:2076`).

## Deviation

The first edit to the TSDoc sentence dropped the leading `` * `` continuation marker on the wrapped
line, which broke `tests/src/core/helpers.test.ts`'s `'unwrapComment and buildComment > rebuilds
every doc block this package writes across several lines, byte for byte'` case (a whole-file
round-trip check, 1 failed). This was caught by the item 4 gate run, not a case the brief's
deviation contract names, so it was corrected in place (restored the `` * `` marker) and the same
gate re-run to green rather than reported as a stop. No pattern change broke an existing
`collectKeys` case, no guide sentence needed a Summary-cell change, and no file outside Owned
required a change.

## Status

`git status --porcelain`:

```
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```
