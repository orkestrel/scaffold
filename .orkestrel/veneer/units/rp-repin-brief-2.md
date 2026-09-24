# Unit RP round 2 — stage the pane instead of placing a frame, and finish the padding prose

Successor to `rp-repin-brief.md`, which stays in force for every section this brief does not restate. What changed: the
RP audit (`rp-audit-verdict.md`) broke claims 2, 5, and 6 and left claim 1 unresolved.

## Role and engine

`builder` on Sonnet, a native Claude subagent, resumed with its round-1 context. Perform the assignment directly in
`/home/user/veneer-rp` and spawn nothing.

## Objective

The origin-touching case proves the park through the installed staging functions with no new capture state, and no
sentence gives the lift's padding a pointer role.

## Context

Read `/home/user/scaffold/.orkestrel/veneer/units/rp-audit-verdict.md` and the three lane verdicts beside it, and
`t5-instruments-park2/park2-readings.md` (probe D is the case this round writes: `releasePointer`, then
`stagePane(window.innerWidth, window.innerHeight)`, then `releasePane`, with the recorder armed first). Host and standing
conditions are as in round 1. `npx` fails `EBADDEVENGINES` under npm 10.9.7, so run the package scripts with npm 11
first on the path: `export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH`.
Keep every log under `tmp/units/`.

## Unknowns

None.

## Scope

Owned: `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, and `guides/veneer.md`.
Off-limits as in round 1.

## Execution

Perform the assignment directly and spawn nothing.

1. **The case.** Keep the unpadded lift, the origin assertions, the recorder armed before `releasePointer`, and the
   entry and `:hover` assertions on the copy. Replace the `FRAMES.place` call with `stagePane(window.innerWidth,
   window.innerHeight)` followed by `releasePane` in a `finally`, both imported from `@orkestrel/test/browser`. Delete
   the descendant `:hover` assertion. Rewrite the case comment so it names one origin (the document's) and states that
   the release parks the pointer outside the page.
2. **The census.** Revert every `tests/setup.ts` change round 1 made: the `parked` member, its remarks sentence, and the
   `primary-parked` row.
3. **The padding.** In the cascade-key comment, in the `CASCADE_KEYS` remarks of `tests/setup.ts` (around line 633),
   and in the guide paragraph around line 10557, state the padding's role on its own (it is deeper than the widest
   negative gutter a specimen's first row pulls up by, so no row starts above the document) and the release's role on
   its own (it parks the pointer outside the page). No sentence may link the two.
4. **The proof can fail.** Swap `releasePointer` for `page.elementLocator(document.body).hover({ position: { x: 1, y:
   1 } })` with the recorder armed, run the case red, restore, and run it green. Log both.

## Output

Write `tmp/units/rp-report-2.md` and return the same text: each change by site, the red and green runs, the gate table
with log paths, and `tmp/units/rp-2.diff` (the whole change over `1ee0faf`) and `tmp/units/rp-2-status.txt`.

## Deviation contract

As in round 1. You settle the case's sentence wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each run logged to its own file under
   `tmp/units/` with its exit status appended.
2. The case passes under `journey:light-390` and `journey:dark-1280`, each scoped with `-t` to its title and with
   `CAPTURE` unset, each logged.
3. The red run is logged.
4. `git diff 1ee0faf -- tests/setup.ts` shows only the padding sentence change.
5. `grep -n -E "parked|primary-parked" tests/setup.ts` returns no line added by this unit, and
   `grep -rn -i -E "pointer (rests|resting) off|rests over none" tests/ guides/veneer.md` returns nothing.

## Review evidence

The Orchestrator supplies `rp-2.diff`, `rp-2-status.txt`, the report, and the logs to the round-2 lanes.
