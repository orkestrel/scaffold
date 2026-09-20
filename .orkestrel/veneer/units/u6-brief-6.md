# Unit U6 — successor brief 6: the hygiene round

## What changed and why

This brief supersedes `u6-brief-5.md` for the remainder of the unit; every section of
`u6-brief.md` stands except where this brief says otherwise. Round 4 (objective lane on
Opus, subjective lane on Astra, verifier with Edge run twice) accepted the design and the
mechanism and recorded five small findings the Orchestrator rules must close rather than stand
as bounds (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-4.md`).
Each item below names its finding.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. You are the sole
writer in the Test checkout (`C:/Users/mikes/WebstormProjects/test`); commit nothing. Run every
command from that checkout in Git Bash (`npm run <name>`).

## Context

`HEAD` is `f49bc7f`; the working tree carries the U6 edits over `guides/test.md`,
`src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/setup.ts`,
`tests/src/browser/helpers.test.ts`. Build on it; change nothing outside the five items. Law:
`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/typescript.md`
(§ TSDoc, the `@throws` form), `tests.md`, `writing.md`.

## Scope

**Owned.** `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`.
**Off-limits.** Everything else.

## Execution

1. **Missed-press release (finding 11).** In `holdAccessible`, where the `:active` read-back fails
   and the helper releases before refusing, put the `await releasePointer()` inside its own
   `try`/`catch` so the refusal `Interactive target "<name>" did not enter the pressed state`
   always reaches the caller, with a release failure attached as `cause`. Match the shape the
   round used for `stageMedia`'s restoration.
2. **Exhausted release keeps the marker (finding 12).** Add one sentence to `guides/test.md`
   § Bounds, beside the pointer retry sentence: a release whose wait exhausts keeps `MEDIA_STAGE`
   on the tester root, so the next `releaseMedia` retries from the same recorded readings.
3. **`@throws` on `releasePointer` (finding 13).** Add the `@throws` tag in the file's form
   ("Thrown when …"), naming the release rejection and the park failure that carries it.
4. **The rejected-press case (finding 14).** In the case named for leaving a rejected protocol
   press unmarked, remove the assertion that runs before any hold and cannot fail, and rename the
   case for what it drives: a direct protocol rejection leaves no marker, and a completed hold
   records the marker after the press. Keep the `pointerdown` recorder and the marker reading
   that discriminate.
5. **Sentinel strings (finding 15).** Remove the unit identifier `U6` from every sentinel string
   and comment in `tests/src/browser/helpers.test.ts` (search the file for `U6`); name each
   sentinel for what it is (for example `hold sentinel`, `media sentinel`).
6. **Gates.** `npx oxfmt --config .oxfmtrc.json --write` on the three owned files; then
   `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`,
   `npm run test:src`, `npm run test:policy`, `npm run test:config`, `npm run test:setup`,
   `npm run test:guides`; record each command's final lines.

## Output

Write `u6-report-6.md` and return its content: the diff per owned file; each gate's exit
code and final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file. Decide and
carry on from: wording within the meaning fixed here.

## Acceptance criteria

1. Every gate exits 0.
2. `grep -n "U6" tests/src/browser/helpers.test.ts` returns nothing.
3. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
