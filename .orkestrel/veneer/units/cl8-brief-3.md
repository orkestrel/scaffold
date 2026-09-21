# Unit CL8 brief 3 — the second scope correction, and the gate chain green

## What changed and why

Briefs 1 and 2 stand in full. This brief adds one grant, answers the precision reading you flagged,
and requires the gate chain you could not finish. Read both earlier briefs first.

**You stopped correctly again, and again the defect was the Orchestrator's.** Brief 1 made
`tests/setupConformance.ts` **and its proof** off-limits. That proof carries an assertion
enumerating every component with guide rows as a literal set, so adding the grid keys' rows makes it
false, and no unit can ship a key without updating it. CL7 had that grant and brief 1 dropped it:
CL7's entire change to that file was adding its own key to the same set. Nothing you authored is in
question because of it.

## The grant

Added to the owned set, for one assertion and nothing else:

- **`tests/setupConformance.test.ts`** — to add `col`, `offset`, and `row` to the component set in
  the case named for skipping obligations whose proof cell is a dash, in sorted position beside the
  members already there. Change no other line and no other case in that file.
- `tests/setupConformance.ts` itself stays off-limits. The machinery does not move; only the proof's
  enumeration of which components have rows.

## Your precision reading is resolved: it is not a defect

You flagged that a raw-width probe wanting exact equality read `199.984px` for a fourth-step column
on a 600px row, that the built percentage is `33.3333%` while the inventory records `33.33333333%`,
and that an exact comparison against unminified Bootstrap failed too. **The Orchestrator measured
it. Your partial is correct and there is nothing to change.**

Compiling `src/styles/index.scss` unminified and reading the same rules the built cascade carries:

```text
.col-4   recorded 33.33333333%   source 33.33333333%   built 33.3333%
.col-7   recorded 58.33333333%   source 58.33333333%   built 58.3333%
```

The source emits exactly the recorded value. The shorter value appears only in
`dist/src/styles/index.css`, so the CSS minifier in the build rounds it, and it would round
Bootstrap's own distribution the same way. Your comparison against unminified Bootstrap is the
comparison that matches, and there the values agree.

**The ruling this settles, which you implement rather than reconsider:** the emitted-selector
instrument compares selectors and media conditions rather than declaration values, because the
artifact it reads is minified and value equality there would assert the minifier's rounding instead
of the code's correctness. Declaration values are asserted where the browser resolves them, at the
tolerance your shipped proof already uses. Do not add a value-equality gate over the built cascade,
do not tighten a shipped tolerance to chase subpixel equality, and do not change the partial's
arithmetic. Report the reading as resolved and move on.

## Obligation — finish the chain

Everything else in briefs 1 and 2 is implemented and proved; your report establishes the extraction,
the container's unchanged cascade with its negative controls, the clean sweep, the red-then-green
control with its digest, the resolved Unknowns, and the conformance run. What remains is the gate
chain reaching green.

- Make the granted one-line change.
- Run `npm run test:setup` and confirm it passes whole.
- Run `npm test` and confirm the whole chain exits 0, including `test:setup:browser` and
  `test:guides`, which the stop never reached.
- Run `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`, `PLAYWRIGHT_CHANNEL=msedge npm run
  test:setup:browser`, and `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`.
- Report each command's exit code and final result lines.

If any gate fails for a reason inside your owned scope, fix it and say what you fixed. If one fails
for a reason outside it, stop and report rather than widening the scope yourself.

## Two of your own findings, already closed, to restate in the report

Your brief-2 report recorded both; keep them visible because they are what a reader of the record
needs. A blank line between the grid deferrals and their table made `readDeferrals` return no grid
deferrals, and the conformance run caught it with a missing-selector diagnostic. And the layout
specimens used the unshipped `border` and `p-2` classes, which the journey census rejected. You
closed each inside your own scope. State both in the report with the command that caught them.

## Unknowns

None. The grant closes the only blocker your report named.

## Scope

Briefs 1 and 2's scope, plus `tests/setupConformance.test.ts` for the one assertion named under
§ The grant. No other change.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing. The working tree carries your own authored CL8 work from both earlier runs; it is your
output, not drift, and you continue from it. HEAD is the CL7 landing `a9172df`. The host facts in
brief 1 § Execution still hold, including that the PowerShell wrapper your report found refused is
blocked on this host — use Git Bash and `npm.cmd`, as you did.

## Output

1. The granted change, quoted.
2. Each gate command with its exit code and final result lines, on both engines.
3. The two findings named earlier, each with the command that caught it.
4. The precision reading recorded as resolved, with no change made.
5. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
6. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: where the granted
members sit in the set. Stop and report if a gate fails for a reason outside your owned files, or if
the granted change does not make `test:setup` pass whole.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0.
4. `npm run test:setup` exits 0 whole.
5. `npm run test:conformance` exits 0, with the grid keys listed and every withheld name deferred.
6. `npm test` exits 0 whole, `test:setup:browser` and `test:guides` included.
7. The styles, browser-setup, and app-browser projects exit 0 on Edge.
8. The status lists only files the three briefs own.
