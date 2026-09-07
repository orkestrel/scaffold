# Brief — U2-fix `d7-guide-converge-fix` (R2's findings on the converge unit, and the `*/` guard)

## Role and engine

`implementer` on Claude Opus 5 — items 4 to 7 carry judgment about which sentences a description keeps, so this is not a builder unit. Sole writer in `/home/user/fleet/guide` from the committed baseline `1a32bb4` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

R2's findings (`d7-guide-converge-audit-verdict.md`) land, Ruling 7 (`rulings.md`) is applied to the widest cells, and `replaceExample` refuses a body no doc block can hold; `npm run build && npm run docs` exits 0 after every write and the gates are green.

## Read first

`/home/user/scaffold/AGENTS.md` § Non-negotiable rules and § Writing; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity; `rulings.md` § Ruling 7; `d7-guide-converge-audit-verdict.md`; the subjective lane's F1, F4, F5, F6 in `d7-guide-converge-audit-subjective.md` for the reasoning behind items 4 to 7.

## Standing conditions

- The seed reads `dist/`: `npm run build` before every `npm run docs`; `npm run docs -- --to guide` writes the cells from the blocks and prints `next: npm run format`; run `npm run format` after every write.
- The vendored voice rule reads every doc block (third-person verb opener); the prose sweep reads `guides/guide.md` and `README.md`.
- Line numbers are from `1a32bb4`; re-read before editing.

## Items

1. **The `*/` guard.** `src/core/helpers.ts:2801`: after `if (example.code.includes('```')) return undefined` add `if (example.code.includes('*/')) return undefined`. The `replaceExample` doc block's `@returns` (`:2797-2798`): replace `and for code the emitted fence cannot enclose` with `and for code the emitted fence cannot enclose or the doc block cannot hold — a body carrying \`*/\``, re-wrapped by hand under 100 columns. `tests/src/core/helpers.test.ts`, beside `returns undefined for code the emitted fence cannot enclose` (`:4000`): add `it('returns undefined for code carrying the comment terminator the block cannot hold', ...)` in the same shape, with `code: '/**\n * Walks.\n */'` and `language: 'ts'`, asserting `undefined`; record the case red before the guard lands (`npm run test:src:core`, the failing count), then green. `guides/guide.md:632-634`: replace `and code the emitted three-backtick fence\ncannot enclose.` with `and code the emitted three-backtick fence\ncannot enclose or the doc block cannot hold, a body carrying \`*/\`.`, re-wrapped by hand. The `replaceExample` cell (`:144`) moves only if its description paragraph moves; it does not here.
2. **§ Tests names the exclusion.** `guides/guide.md:814-817`: replace `a fence whose body a\nthree-backtick doc-block fence cannot enclose, and a class's constructor-door block` with `a fence whose body a\nthree-backtick doc-block fence cannot enclose, a fence whose body carries the doc-comment\nterminator \`*/\`, and a class's constructor-door block`, re-wrapped by hand.
3. **`EXPORT_KEYWORDS`'s remark.** `src/core/constants.ts:7`: replace `One frozen list feeds all three, so` with `One frozen list feeds the type, the guard, and the shape, so`, re-wrapped by hand.
4. **Ruling 7 over the widest cells.** For `extractExports` (`src/core/helpers.ts:1090`, its block above), `extractHidden` (`:1138`), `extractSourceComments` (`:1846`), and `SourceInterface.exports` (`src/core/types.ts:278`, its block above): keep in the description paragraph the sentences that state what the declaration does and returns — the sentences a table scanner needs — and move the rest, verbatim and in order, into an `@remarks` section placed after the description and before `@param` (the shape `src/core/sources/Source.ts:34-53` set in U2). Delete no sentence. Then `npm run build && npm run docs -- --to guide && npm run format`, and read each rewritten cell. Report each block's split point (the last sentence kept) and each cell's width before and after.
5. **`exists`'s orientation.** `src/core/types.ts:344-350`: add, after the description paragraph and before `@param`, `@remarks\nA directory counts so a guide's link to a directory resolves.` (the fact the old cell carried), outside the compared paragraph so the cell does not move.
6. **The opening paragraph.** `guides/guide.md:6-7`: move the sentence `This package is published through \`@orkestrel/guide\` and its source is [\`src/core\`](../src/core).` to the end of the same paragraph, after the `parseManifest` sentence, and re-wrap the whole paragraph by hand to the width its neighbours fill (about 95 columns).
7. **`Shape` notations.** `guides/guide.md:28` (the Types intro) gains a sentence stating that `Shape` lists a type's property names; `guides/guide.md:158-160` (the Shapers intro) gains a sentence stating that `Shape` lists the shaped object's properties with their types. One sentence each, in the intro's voice.

## Scope

Owned: `src/core/helpers.ts`, `src/core/types.ts`, `src/core/constants.ts` (doc blocks and the one guard line), `tests/src/core/helpers.test.ts` (the one case), `guides/guide.md`. Off-limits: everything else, including `README.md`, `tests/guides.test.ts`, vendored files, and every code line other than the guard.

## Acceptance criteria, cheapest first

1. The guard case is recorded red then green.
2. `git diff --stat` lists the five owned files and no other.
3. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
4. `npm run test:src:core` (599 passed expected), `npm run test:guides`, `npm run test:policy` exit 0.
5. `npm run build && npm run docs` exits 0 with no line printed; `npm run docs -- --to guide` and `-- --to source` each report `written: 0`.
6. The report names each item's hunk, the split points and widths of item 4, and states no count in prose.

## Output

`/home/user/scaffold/tmp/units/d7-guide-converge-fix-report.md`: per item the hunk or the split point, per criterion the command and its last lines. No process diary.

## Deviation contract

Stop and report if a before-text is not found verbatim, if a cell the seed writes reads wrong after item 4, or if a gate reads red. Item 4's split points are yours to decide and record.
