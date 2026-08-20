# scaffold fix unit 3 — the remove contract prose

## Role and engine

`builder`, native cheap tier. Fully specified; no design decision remains.

## Objective

Make the `remove` TSDoc state the landed contract in both declaration sites, per the fix unit 1
audit (`tmp/fix1-audit-verdict.md`).

## Context

- The tree at dispatch carries fix unit 2's landed changes; your edits touch only the lines named
  here. Read `.claude/rules/typescript.md` § Comments and API documentation and
  `.claude/rules/writing.md` before editing.
- In `src/server/types.ts` and `src/server/Materializer.ts`, the `remove` TSDoc block:
  - Replace the `@param plan` line with:
    `@param plan - The compiled plan that decides which paths are foreign.`
  - Replace the `@param audit` line with:
    `@param audit - The preview returned by this materializer's \`audit\` method; it must agree with the candidate set this call re-derives.`
  - Open the summary line with the re-derivation, aligned with the guide's sentence: change
    "Delete the files the plan does not own." to
    "Re-derive and delete the tracked files the plan does not own."
  - Add one sentence to the `@remarks` block stating the ruled widening: the whole call refuses
    when the preview disagrees with the re-derivation on any foreign finding, including one the
    deletion itself would skip, because a preview stale anywhere is stale evidence.
- Keep every other sentence in both blocks as it stands.

## Scope

- Owned: the `remove` TSDoc blocks in `src/server/types.ts` and `src/server/Materializer.ts`.
- Off-limits: everything else.
- No commit, no push, no install, no git state-mutating command.

## Execution

You perform this assignment directly and spawn nothing.

## Output

Write the exact before and after of each changed line to the `tmp/fix3-report.md` file, with
`git diff --stat` output. No process diary.

## Deviation contract

Any mismatch between these instructions and the file state you find — a line already changed, a
sentence absent — stops the unit with the standard report.

## Acceptance criteria (in order)

1. `npm run format:check` exits 0 (run `npm run format` first if needed).
2. `npm run lint:check` exits 0.
3. `rg -n "its foreign findings are the candidate set|plan whose foreign paths" src/` returns no
   hit.
4. `npm run check` exits 0.
