# Unit U6 — successor brief 9: the bullet's wrap and three sentences

## What changed and why

This brief supersedes `u6-brief-8.md` for the remainder of the unit; every section of
`u6-brief.md` stands except where this brief says otherwise. Round 6's objective lane
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-audit-6-reviewer-report.md`)
confirmed the `@throws`, the rejected-press case, `holdAccessible`'s failure shape, and that
nothing else moved; the verifier ran the chain green on managed Chromium and `test:src:browser`
green on Edge twice (`units/u6-gate-report-6.md`). It refuted the wrap claim: the re-wrap moved the
ragged break down one line instead of re-flowing the bullet, and recorded three bounds this
brief closes as sentences. The subjective lane (`units/u6-audit-6-analyst-report.md`) confirmed
every other claim, refuted the same wrap, and added nothing.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. You are the sole
writer in the Test checkout (`C:/Users/mikes/WebstormProjects/test`); commit nothing; run no
`git` command that writes or discards anything. Run every command from that checkout in Git Bash.

## Scope

**Owned.** `guides/test.md`, `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`.
**Off-limits.** Everything else.

## Execution

1. **Re-flow the bullet (objective claim 4).** In `guides/test.md` § Bounds, re-flow the whole
   `stageMedia`/`releaseMedia` bullet (the paragraph from "**`stageMedia` overrides the provider
   page" through "The browser project runs files serially.") as one paragraph at the file's wrap
   (read the neighbouring bullets to take the column they use), so every line but the last fills
   the column and no line ends a short fragment. Change no words in it except as item 2 says.
2. **Name the undrivable path (finding 7).** After the sentence in the `holdAccessible` bullet
   that says a release rejection rides the missed-press refusal as its cause, add that the path
   cannot be driven from inert input against a conforming engine (the marker is built from the
   coordinates the press used), so it is covered by review, the way the `stageMedia` bullet
   states its own limit.
3. **One home for the aggregate sentence (finding 8).** In `src/browser/helpers.ts`, keep the
   aggregate's shape in `releasePointer`'s `@throws` and make the `@remarks` refer to it in
   different words ("the aggregate described under `@throws`") rather than repeating the clause.
4. **Name the control (finding 9).** In the case `records the marker only after the press send
   resolves`, add one comment above the opening `sendProtocol` rejection saying it is the control
   that keeps the recorder at one entry so the `[[false]]` reading is unambiguous.
5. `npx oxfmt --config .oxfmtrc.json --write` on the owned files; then `npm run format:check`,
   `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:guides`,
   `npm run test:src:browser -- tests/src/browser/helpers.test.ts -t holdAccessible`; record each
   command's final lines. Then print the line lengths of the re-flowed bullet
   (`awk '{ print length($0) }'` over its line range) and include them in the report.

## Output

Write `u6-report-9.md` and return its content: the diff; the bullet's line lengths; each
gate's exit code and final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file.

## Acceptance criteria

1. Every line of the re-flowed bullet but the last is within a few columns of the file's wrap, and
   none ends a short fragment.
2. The gates named exit 0.
3. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
