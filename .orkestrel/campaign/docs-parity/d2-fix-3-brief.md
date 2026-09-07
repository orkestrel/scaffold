# Unit brief — D2-fix-3: the third round's comment, prose, case, and citation corrections

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/fleet/guide`. Every edit is exact; perform the assignment directly and spawn nothing.

## Objective

Every finding `d2-audit-verdict.md` round 3 carries closes as written here, J1 to J7, and nothing else moves.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-2-audit-objective.md` (claims 1, 2, 6 and findings 1 to 5); the files you own at their uncommitted state.

## Standing conditions

The tree carries D2, D2-fix, and D2-fix-2 uncommitted across `guides/guide.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/src/core/helpers.test.ts`. Never a discard-class git command, never a commit, never `npm install`, never `npm run build`. Line numbers here are the objective lane's readings at the current state; confirm each by its quoted text before editing.

## Edits, exact

**J1.** `src/core/helpers.ts:2838-2839` (the `locateComment` doc block): replace the sentence "So a block this function reaches is exactly a block whose summary `{@link collectSummaries}` reports" with: "Every block `{@link collectSummaries}` reports a summary for is reachable by its key, and a block carrying only block tags is reachable too although it carries no summary." Keep the miss enumeration that follows it unchanged.

**J2.** `tests/src/core/helpers.test.ts:4126-4130` (the comment above `locates the block behind every documented member this package ships`): replace the sentence claiming the control meets the member grammar and the owner-close rule with: "This control proves the located region for a real member: a locator that returns the wrong region reddens it. A drift in the member grammar or the owner-close rule moves both sides of this control together, because both read `collectKeys`; that drift is caught by `Guide`'s bijection matrix and by the `extractBodyLines` case that closes an owner at its brace."

**J3.** `src/core/helpers.ts:2002-2003` (the `collectKeys` doc block): "A column-zero declaration carrying any other keyword closes the owner it follows" becomes "A column-zero `export` declaration carrying any other keyword closes the owner it follows".

**J4.** `guides/guide.md:104` (the `collectKeys` row): the description names both closes — the owner closes at the first column-zero `}` or at a column-zero `export` declaration carrying another keyword. The reader prose at `guides/guide.md:429-435` gains one sentence stating the other-keyword close beside the grammar it belongs to.

**J5.** `tests/src/core/helpers.test.ts:3939` (the `extractBodyLines` case that closes an owner at its brace): add the expectation `expect(extractExampleMethods(['\t/** @example */', '\twalk(): void', '}', '\t/** @example */', '\tghost(): void']).map((example) => example.name)).toEqual(['walk'])`, importing `extractExampleMethods` if the file does not already.

**J6.** In `describe('locateComment')` (`tests/src/core/helpers.test.ts:3878` region), add the case `locates the last block of a contiguous run, which is the one the reader attaches`: a fixture of two doc blocks with no code line between them above one exported declaration; assert `text.slice(span.start, span.end)` equals the second block alone.

**J7.** Your report cites `.claude/rules/architecture.md:298` for "Centralize any pattern repeated twice" and `src/core/helpers.ts:1093-1107` for the keyword and name split, correcting the D2-fix-2 report's two citations.

## Scope

- Owned: `src/core/helpers.ts`, `guides/guide.md`, `tests/src/core/helpers.test.ts`.
- Off-limits: everything else.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:guides`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "reachable too although it carries no summary" src/core/helpers.ts` prints one line; `grep -n "column-zero \`export\` declaration carrying any other keyword" src/core/helpers.ts` prints one line; `grep -n "locates the last block of a contiguous run" tests/src/core/helpers.test.ts` prints one line.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with the J5 expectation and the J6 case present.
4. `npm run test:guides` exits 0.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d2-fix-3-report.md`: one line per edit J1 to J7 with `file:line` at the final tree, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims; no count in prose. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a quoted sentence is not at the named line or nearby, when a criterion needs an off-limits file, or when a gate fails outside the owned files. Nothing else is yours to decide.
