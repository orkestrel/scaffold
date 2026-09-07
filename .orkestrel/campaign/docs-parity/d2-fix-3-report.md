# Report — D2-fix-3

## Edits

- J1 `src/core/helpers.ts:2837-2839` — the `locateComment` doc block's sentence replaced: "Every block `{@link collectSummaries}` reports a summary for is reachable by its key, and a block carrying only block tags is reachable too although it carries no summary." The miss enumeration that follows is unchanged.
- J2 `tests/src/core/helpers.test.ts:4150-4155` — the comment above `it('locates the block behind every documented member this package ships', ...)` (line 4157) replaced with: "This control proves the located region for a real member: a locator that returns the wrong region reddens it. A drift in the member grammar or the owner-close rule moves both sides of this control together, because both read `collectKeys`; that drift is caught by `Guide`'s bijection matrix and by the `extractBodyLines` case that closes an owner at its brace."
- J3 `src/core/helpers.ts:2001` — `collectKeys` doc block: "A column-zero declaration carrying any other keyword closes the owner it follows" is now "A column-zero `export` declaration carrying any other keyword closes the owner it follows".
- J4 `guides/guide.md:104` — the `collectKeys` row now names both closes: "the owner closes at the first column-zero `}` or at a column-zero `export` declaration carrying another keyword." `guides/guide.md:435` — the reader prose gains the sentence "A column-zero `export` declaration carrying another keyword closes the owner it follows, the same way a column-zero `}` does."
- J5 `tests/src/core/helpers.test.ts:3939-3954` — the `extractBodyLines` case that closes an owner at its brace gains `expect(extractExampleMethods(['\t/** @example */', '\twalk(): void', '}', '\t/** @example */', '\tghost(): void']).map((example) => example.name)).toEqual(['walk'])`; `extractExampleMethods` was already imported at `tests/src/core/helpers.test.ts:20`.
- J6 `tests/src/core/helpers.test.ts:4092-4105` — `describe('locateComment')` gains the case `locates the last block of a contiguous run, which is the one the reader attaches`: a fixture of two doc blocks with no code line between them above one exported declaration, asserting `text.slice(span?.start, span?.end)` equals the second block alone.
- J7 — this report cites `.claude/rules/architecture.md:298` for "Centralize any pattern repeated twice" and `src/core/helpers.ts:1093-1107` for the keyword and name split, correcting the D2-fix-2 report's two citations.

## Acceptance criteria

1. `grep -n "reachable too although it carries no summary" src/core/helpers.ts` → one line: `2838: * a summary for is reachable by its key, and a block carrying only block tags is reachable too although it carries no summary.`
   `grep -n "column-zero \`export\` declaration carrying any other keyword" src/core/helpers.ts` → one line: `2001: * first column-zero \`}\`, so a member declared past that brace keys nothing. A column-zero \`export\` declaration carrying any other keyword closes the owner it follows,`
   `grep -n "locates the last block of a contiguous run" tests/src/core/helpers.test.ts` → one line: `4092:	it('locates the last block of a contiguous run, which is the one the reader attaches', () => {`
2. `npm run format:check` — exit 0. Last lines: "All matched files use the correct format." / "Finished in 2623ms on 80 files using 4 threads."
   `npm run lint:check` — exit 0, no output beyond the command echo.
   `npm run check` — exit 0. Runs `tsc --noEmit --project tsconfig.json` then `check:src` then `check:src:core`, each with no diagnostics.
3. `npm run test:src:core` — exit 0. Last lines: "Test Files  8 passed (8)" / "Tests  588 passed (588)".
4. `npm run test:guides` — exit 0. Last lines: "Test Files  1 passed (1)" / "Tests  51 passed (51)".

## Git status

```
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

```
 guides/guide.md                |  233 +++++--
 src/core/constants.ts          |   16 +
 src/core/helpers.ts            | 1085 +++++++++++++++++++++++++++---
 src/core/types.ts              |    4 +-
 tests/guides.test.ts           |   60 ++
 tests/src/core/helpers.test.ts | 1425 ++++++++++++++++++++++++++++++++++++++--
 6 files changed, 2622 insertions(+), 201 deletions(-)
```

`src/core/constants.ts`, `src/core/types.ts`, and `tests/guides.test.ts` carry no edits from this unit; their diffs are D2, D2-fix, and D2-fix-2's uncommitted state, per the standing conditions.

## Flagged claims

None. Every J1-J7 target was confirmed against its quoted text at or near the brief's cited line before editing, and no criterion needed an off-limits file.
