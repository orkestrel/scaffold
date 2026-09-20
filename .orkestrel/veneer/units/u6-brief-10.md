# Unit U6 — successor brief 10: one paragraph

## What changed and why

This brief supersedes `u6-brief-9.md` for the remainder of the unit; every section of
`u6-brief.md` stands except where this brief says otherwise. The closing objective read
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-audit-7-reviewer-report.md`)
confirmed every claim and the verifier ran the chain green on managed Chromium and Edge twice
(`units/u6-gate-report-7.md`). One finding: the `holdAccessible` bullet in `guides/test.md`
§ Bounds, which round 9's sentence entered, was not re-flowed, so lines 1609 to 1615 break
non-greedily and one ends mid-sentence at 75 columns.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. You are the sole
writer in the Test checkout (`C:/Users/mikes/WebstormProjects/test`); commit nothing; run no
`git` command that writes or discards anything. Run every command from that checkout in Git Bash.

## Scope

**Owned.** `guides/test.md`, the `holdAccessible` bullet in § Bounds alone. **Off-limits.**
Everything else, including every other line of that file.

## Execution

1. Re-flow the `holdAccessible` bullet (the paragraph opening `- **\`holdAccessible\` maps through
   the tester iframe's painted scale and reads \`:active\` back.**`) as one greedy fill at the
   100-column width the `stageMedia` bullet below it uses, changing no word. Every line but the
   last must fill the column (the first word of the next line would overflow it) and none may
   end a short fragment.
2. `npx oxfmt --config .oxfmtrc.json --write guides/test.md`; then `npm run format:check` and
   `npm run test:guides`; record each command's final lines. Print the bullet's line lengths
   (`awk '{ print length($0) }'` over its range) for the report.

## Output

Write `u6-report-10.md` and return its content: the diff; the line lengths; each gate's
exit code and final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red; a need to touch any other line.

## Acceptance criteria

1. The bullet is one greedy fill at the file's width, words unchanged.
2. `format:check` and `test:guides` exit 0.
3. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
