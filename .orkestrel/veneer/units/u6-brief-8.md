# Unit U6 — successor brief 8: the rejected-press case

## What changed and why

This brief supersedes `u6-brief-7.md` for the remainder of the unit; every section of
`u6-brief.md` stands except where this brief says otherwise. Brief 7 closed the
`releasePointer` and `holdAccessible` prose and the wrap, but its scope granted only
`src/browser/helpers.ts` and `guides/test.md`, so the item on the rejected-press case in
`tests/src/browser/helpers.test.ts` could not be done. That is the Orchestrator's brief defect,
not the builder's. This brief carries that one item.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. You are the sole
writer in the Test checkout (`C:/Users/mikes/WebstormProjects/test`); commit nothing; run no
`git` command that writes or discards anything. Run every command from that checkout in Git Bash.

## Scope

**Owned.** `tests/src/browser/helpers.test.ts`. **Off-limits.** Everything else.

## Execution

1. In the `holdAccessible` case that opens with a direct protocol rejection (its name today begins
   `leaves no marker for a direct protocol rejection`), delete the assertion
   `expect(document.documentElement.hasAttribute(POINTER_HOLD)).toBe(false)` that runs before any
   hold (it cannot fail: only `holdAccessible` writes the marker and every earlier case releases).
   Rename the case to what it drives: the marker is recorded only after the press send resolves.
   Keep the direct protocol rejection as the case's first act, the `pointerdown` recorder, and
   `expect(markers.calls).toEqual([[false]])` as the discriminating reading, and the assertions
   after the completed hold.
2. `npx oxfmt --config .oxfmtrc.json --write tests/src/browser/helpers.test.ts`; then
   `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run test:src:browser -- tests/src/browser/helpers.test.ts -t holdAccessible`; record each
   command's final lines.

## Output

Write `u6-report-8.md` and return its content: the diff; each gate's exit code and final
lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file.

## Acceptance criteria

1. The case reads `POINTER_HOLD` only after a hold, and its name says what it drives.
2. The gates named exit 0.
3. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
