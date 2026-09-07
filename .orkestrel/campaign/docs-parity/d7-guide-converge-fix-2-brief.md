# Brief — U2-fix-2 `d7-guide-converge-fix-2` (the closure round's findings on the refusal set)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/guide` from the committed baseline `f7be620` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`replaceExample`'s contract names every refusal it makes, the guard reads the fence line as well as the code, and the guide's refusal sentence punctuates its apposition as one; the seed carries the changed description into its cell and reads zero after.

## Standing conditions

- `npm run build` before every `npm run docs`; `npm run format` after every edit and every seed write. The vendored voice rule reads every doc block; the prose sweep reads `guides/guide.md`.
- A doc block cannot spell `*/`; inside a doc block write "the doc-comment terminator". Markdown can spell it.
- Line numbers are from `f7be620`; re-read before editing.

## Items, each an exact edit

1. **The description paragraph and the `@remarks` of `replaceExample`** (`src/core/helpers.ts:2768-2785`). In the description, replace `A text that is no doc block, a title no tag carries, and code\n * the emitted three-backtick fence cannot enclose each return \`undefined\`.` with `A text that is no doc block, a title no tag carries, and a\n * language or code the emitted three-backtick fence cannot enclose or the doc block cannot hold\n * each return \`undefined\`.` — re-wrapped by hand under 100 columns. In the `@remarks`, after the sentence ending `turn a following\n * \`@\`-line into a tag.` insert `A language or code carrying the doc-comment terminator is a body the\n * block itself cannot hold: the terminator closes the block where it lands and the file stops\n * parsing there.` before `Refusing keeps the rewrite total over the bodies it can spell.` — re-wrapped by hand. In the `@returns` (`:2796-2798`), replace `and for code the emitted fence cannot\n * enclose or the doc block cannot hold — a body carrying the doc-comment terminator` with `and for a language or code the emitted\n * fence cannot enclose or the doc block cannot hold — a body carrying the doc-comment terminator`, re-wrapped.
2. **The guard reads the fence line too** (`src/core/helpers.ts:2801-2802`). Replace the two lines
   ```ts
   	if (example.code.includes('\`\`\`')) return undefined
   	if (example.code.includes('*/')) return undefined
   ```
   with
   ```ts
   	const spelled = [example.language ?? '', ...example.code.split('\n')]
   	if (spelled.some((line) => line.includes('\`\`\`') || line.includes('*/'))) return undefined
   ```
   and keep the comment above them true (rewrite it to name the fence line and the body together). In `tests/src/core/helpers.test.ts`, beside `returns undefined for code carrying the comment terminator the block cannot hold`, add `it('returns undefined for a language the fence line cannot carry', ...)` in the same shape asserting `undefined` for `language: 'ts */'` and for `language: 'ts \`\`\`'` with a plain `code: 'walk()'`; record the case red before the guard change, then green.
3. **The guide's refusal sentence** (`guides/guide.md:632-633`). Replace `and code the emitted three-backtick fence cannot\nenclose or the doc block cannot hold, a body carrying \`*/\`.` with `and a language or code the emitted three-backtick fence\ncannot enclose or the doc block cannot hold — a body carrying \`*/\`.`, re-wrapped by hand under 100 columns.
4. **The cell.** `npm run build && npm run docs -- --to guide && npm run format`; the seed rewrites the `replaceExample` cell (`guides/guide.md:144`) and nothing else (`written: 1`); then `npm run build && npm run docs` exits 0.

## Scope

Owned: `src/core/helpers.ts` (the block and the guard lines), `tests/src/core/helpers.test.ts` (the one case), `guides/guide.md` (the sentence and the cell the seed writes). Off-limits: everything else.

## Acceptance criteria, cheapest first

1. The new case is recorded red then green.
2. `git diff --stat` lists the three owned files and no other.
3. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
4. `npm run test:src:core` (600 passed expected), `npm run test:guides`, `npm run test:policy` exit 0.
5. `npm run build && npm run docs` exits 0; `npm run docs -- --to guide` and `-- --to source` each report `written: 0`.

## Output

`/home/user/scaffold/tmp/units/d7-guide-converge-fix-2-report.md`: per item the hunk, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop and report if a before-text is not found verbatim, if the seed rewrites a cell other than `replaceExample`'s, or if a gate reads red.
