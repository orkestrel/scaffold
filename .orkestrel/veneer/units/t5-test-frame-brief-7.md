# Unit T5 round 7 — TEST-FRAME: split the park sentences

Successor to `t5-test-frame-brief-6.md`, which stays in force for every section this brief does not restate. What
changed: the round-6 audit (`t5-audit-6-verdict.md`) held the code and carries G1 alone.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-6 context. Perform the assignment directly in
`/home/user/test-tf` and spawn nothing.

## Objective

The park's sentences in the `releasePointer` remarks and the guide's `releasePointer` bullet each carry one idea.

## Context

Read `/home/user/scaffold/.orkestrel/veneer/units/t5-audit-6-verdict.md` and the G1 finding in
`t5-audit-6-subjective-verdict.md`. Host and law as in round 6.

## Unknowns

None.

## Scope

Owned: `src/browser/helpers.ts` (the `releasePointer` remarks only) and `guides/test.md` (the `releasePointer` bullet
only). Everything else is off-limits, `tests/**` included.

## Execution

Perform the assignment directly and spawn nothing. Write these sentences as given; re-wrap only for the formatter.

1. In the `releasePointer` remarks, replace the paragraph that begins "The park point is (-1, -1)" with: "The park point
   is (-1, -1) in the runner page's coordinates, one pixel above and to the left of that page's viewport. The browser
   hit-tests nothing outside the viewport, so no element takes a `mouseover` event or hover paint from the parked
   pointer until the next pointer verb. This holds even where a staging, scroll, or offset lays content over the park
   point."
2. In the guide's `releasePointer` bullet, replace the text from "It releases at the recorded point first" through
   "lays content over that point." with: "It releases at the recorded point first, which can produce a click. It then
   clears hover by moving to (-1, -1) in the runner page's coordinates, one pixel above and to the left of that page's
   viewport. The browser hit-tests nothing outside the viewport, so no element takes a `mouseover` event or hover paint
   from the parked pointer until the next pointer verb. This holds even where a staging, scroll, or offset lays content
   over the park point."

## Output

Write `tmp/units/t5-report-7.md` and return the same text: each change by site, the gate table with log paths, and
`tmp/units/t5-7.diff` (the whole change over `80c419e`) and `tmp/units/t5-7-status.txt`.

## Deviation contract

As in round 1. Stop and report if a given sentence does not fit its site.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0, logged.
3. `git diff` against the round-6 tree changes only those two passages (compare with `tmp/units/t5-6.diff`).

## Review evidence

The Orchestrator supplies `t5-7.diff`, `t5-7-status.txt`, the report, and the logs to the checker.
