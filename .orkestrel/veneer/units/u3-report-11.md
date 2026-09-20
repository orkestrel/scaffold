# Unit U3 — report 11 (brief 13: six readings become cases)

## Six added assertions, final line numbers

1. `tests/setupStyles.test.ts:568` — `expect(matchesLooseTagPair('h1\\2b  p')).toBe(true)` (line 567 holds the corrected `.toBe(false)` for `'h1\\2b p'`)
2. `tests/setupStyles.test.ts:612` — `expect(() => matchesLooseTagPair(':is(.title > h1)+p')).toThrow(/functional list/u)`
3. `tests/setupStyles.test.ts:613` — `expect(() => matchesLooseTagPair(':is(h1:has(p)) + p')).toThrow(/functional list/u)`
4. `tests/setupStyles.test.ts:615` — `expect(matchesLooseTagPair(':not(h1) + p + span')).toBe(true)`
5. `tests/setupStyles.test.ts:477` — `expect(matchesLooseTagPair('details summary\\\f')).toBe(true)`
6. (correction accompanying case 1) `tests/setupStyles.test.ts:567` — `expect(matchesLooseTagPair('h1\\2b p')).toBe(false)`

## Red proof

Planted (deliberately wrong) at line 566: `expect(matchesLooseTagPair('h1\\2b p')).toBe(true)`.

Command: `npm run test:setup`

Result: 1 failed, 82 passed.

Assertion message:

```
FAIL  |setup| tests/setupStyles.test.ts > styles setup > reads a quoted parenthesis and an escaped combinator as the text they are rather than as grammar
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/setupStyles.test.ts:566:43
```

Test Files 1 failed | 2 passed (3); Tests 1 failed | 82 passed (83).

## Green run after correction

Corrected line 567 to `.toBe(false)` and added line 568
`expect(matchesLooseTagPair('h1\\2b  p')).toBe(true)` (two spaces: the escape owns the first, the
second is the descendant combinator).

Command: `npm run test:setup`

```
 Test Files  3 passed (3)
      Tests  83 passed (83)
```

## Gate final lines

`npm run test:setup`:

```
 Test Files  3 passed (3)
      Tests  83 passed (83)
   Start at  14:30:13
   Duration  828ms (transform 175ms, setup 88ms, import 838ms, tests 298ms, environment 0ms)
```

`npm run format:check`:

```
Checking formatting...

All matched files use the correct format.
Finished in 785ms on 83 files using 16 threads.
```

`npm run lint:check`: exited with no output (0 warnings, 0 errors); exit code 0.

## `git diff --stat`

```
 README.md                         |    4 +-
 configs/src/vite.styles.config.ts |    3 +-
 guides/README.md                  |    8 +
 guides/veneer.md                  |  347 ++++++++++-
 src/core/index.ts                 |    2 +
 src/styles/_mixins.scss           |  124 ++++
 src/styles/_theme.scss            |   28 +-
 src/styles/_tokens.scss           |  355 ++++++++++-
 src/styles/index.scss             |    2 +
 tests/distribution.test.ts        |    9 +-
 tests/setup.ts                    |   48 ++
 tests/setupBrowser.test.ts        |  212 ++++++-
 tests/setupBrowser.ts             |  293 ++++++++-
 tests/setupConformance.test.ts    |    8 +
 tests/setupConformance.ts         |   21 +-
 tests/setupStyles.test.ts         |  617 ++++++++++++++++++-
 tests/setupStyles.ts              | 1228 ++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |   53 +-
 tests/src/styles/index.test.ts    |   41 +-
 19 files changed, 3347 insertions(+), 56 deletions(-)
```

## `git status --porcelain` (tracked rows only)

```
 M README.md
 M configs/src/vite.styles.config.ts
 M guides/README.md
 M guides/veneer.md
 M src/core/index.ts
 M src/styles/_mixins.scss
 M src/styles/_theme.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/distribution.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/core/index.test.ts
 M tests/src/styles/index.test.ts
```

These match report 10's tracked rows exactly; this unit added no new tracked file and modified
only `tests/setupStyles.test.ts` among the owned scope. `tests/setupStyles.ts` carries the same
modified state it held before this brief (untouched by this unit).

## Deviations

None. All six readings behaved as this brief states: the planted wrong assertion failed as
predicted, the corrected pair passed, both `:is(...)` and `:where(...)`-equivalent functional-list
forms threw `/functional list/u`, the `:not(h1) + p + span` compound-selector case returned `true`,
and the form-feed case (`details summary\\\f`) returned `true`. No off-limits file needed editing.
Done.
