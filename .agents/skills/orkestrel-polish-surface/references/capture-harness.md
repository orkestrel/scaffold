# The capture harness

Take the portfolio from the journey suite's capture family wherever a Vitest browser project can
mount and drive the surface. Build the spawned script this file describes only for a surface no such
project can host — a served page, a foreign client, a process the runner cannot start inside a test.
Choose one source per surface, and never judge a round against a portfolio that is part
journey-generated and part spawned.

- Read the `orkestrel-prove-journey` skill for how the journey run generates a portfolio. This file
  adds only what the review requires of a portfolio and how a spawned harness produces one.
- Own the spawned harness as the campaign owner. Never let a verdict lane write or edit it.
- Treat the spawned harness as a throwaway instrument: written for this surface, rebuilt or deleted
  when the surface changes.

## One call, one lifecycle

Apply this section to a spawned harness only.

- Write the harness as one self-contained script that spawns its own children, waits for readiness,
  does the capture, and kills them before returning.
- Never leave a child running across calls or expect one to survive its parent. A process started
  inside one tool call dies with that call's process group.
- Give every child a pinned working directory. A process that resolves assets, configuration, or
  fixtures relative to the current directory dies silently when launched from elsewhere.
- Pipe child standard error somewhere readable and print it on failure. A discarded stream turns a
  one-line configuration refusal into a debugging round.
- Wait on an observable readiness signal — a served response, a printed line, a health probe — never
  on a fixed sleep.
- Tear down on every exit path, including assertion and setup failure, so a failed capture leaves no
  orphaned server, browser, or port.

## Validate the seed before capturing

Apply this section to a spawned harness only. In the journey run the acceptance journey is the seed,
and `orkestrel-prove-journey` fixes how it enters and what it may reach past.

- Build seed payloads from the surface's own published contract, never from memory of it. A
  near-miss field name produces an empty screen that looks exactly like a product defect.
- Assert the seeded state is present before shooting: the row exists, the prompt is parked, the list
  is non-empty.
- Drive the surface through its real entry path, so the captured state is one a person can reach.
- Reset to a known state between scenarios. A capture that inherits the previous scenario's
  selection, focus, or scroll proves nothing about either.

## Capture the full portfolio

Produce every artifact in the following table each round, for every scenario in scope. The Source
column names what produces the artifact in the journey run; a spawned harness produces each one
itself.

| Artifact               | Source in the journey run            | What the artifact must show                                                           |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| Viewport captures      | `place` across the declared variants | Every breakpoint the surface declares, never one convenient size                      |
| Theme captures         | `place` across the declared variants | Every theme the surface ships, at every declared viewport                             |
| Accessibility snapshot | `describeTree` and `describeFocus`   | The rendered roles, names, and states, and the focus order the walk took              |
| Interaction log        | The journal's `steps`                | Each interaction, its trigger, and the result observed after it                       |
| Console and error log  | The journal's `output`               | Everything the page emitted, including an uncaught error                              |
| Statechart outcome     | The harness after a play-all run     | The terminal status, the passed, failed, and total tallies, and each row's own result |

- Require the statechart outcome of every surface that declares the statechart family, and omit the
  row only where the surface declares none.
- Read the journey run's per-variant written artifact for the accessibility snapshot and the logs,
  and cite the statechart harness by its deep link where a lane must watch the widget move rather
  than read a still of it. `orkestrel-prove-journey` fixes what each holds and what each is named
  for.
- Shoot the whole surface before selecting or focusing anything inside it. A capture taken after a
  selection reports a duplicate or highlighted artifact that does not exist.
- Start a keyboard walk from a neutral state, never from an already-focused control, or the log will
  report a broken order no person meets.
- Name a spawned harness's artifacts so a verdict cites one exactly: scenario, viewport, theme,
  step. The journey run's filename law already does this.
- Keep the artifacts of each round beside its verdicts. A round judged against the previous round's
  captures is not a round.

## Preflight before spending a round

Open every artifact yourself before dispatching a verdict lane, whichever source produced it.
Confirm each of the following:

- each capture shows the scenario it claims, in the theme and viewport it claims;
- the seeded state is visible;
- the accessibility snapshot is non-empty and matches the captured screen;
- the interaction log records the interactions the brief asked for;
- the statechart outcome reads a terminal status, with a zero failed tally and a passed tally equal
  to the total;
- nothing in the console log indicates the harness, rather than the surface, failed.

Repair a portfolio that fails preflight before dispatching it. Never spend a verdict round
discovering a harness defect.

## Triage missing evidence to the harness first

Treat a not-evidenced verdict item as a harness fault before treating it as a product finding. Work
these in order:

1. Confirm the artifact that decides the item exists and is named as the brief said.
2. Confirm the scenario reached the state the item is about.
3. Confirm the seed and the entry path match the surface's real contract.
4. Only then record it as a product finding.

- Repair every harness gap a round exposes before the recapture, and record the repair with the
  round.
- Route a journey-run gap to the journey suite that owns it, and recapture from the repaired
  journeys.
