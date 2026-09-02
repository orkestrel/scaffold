# The statechart family

Declare one transition table, and give it to the automated run that asserts it and to the
harness a person watches. Never write a second table for the harness.

## Declare the table

- Declare each transition as a `StateTransition` carrying its `name`, its `from` state, the `event`,
  and its `to` state. Type it on the entity's own state and event unions, so a row naming a state the
  entity does not have fails to typecheck.
- Write one `StateScenario` per transition, carrying that `transition` plus `arrange`, `act`, and
  `assert`. Each phase receives the context and the part of the transition it owns.
- Put the table and the scenarios in the workspace's browser test setup module. A table is data, and
  `.claude/rules/tests.md` places data there.
- Declare a transition for every event the surface accepts in every state it accepts it, including
  the event that leaves the state unchanged. A table that lists only the moves the happy path takes
  proves the happy path.

## Run the table

- Run the table with `executeScenarios(scenarios, build)` from `@orkestrel/test`. It drives the rows
  in the order they are written, builds a context per row, and stops at the first row that throws.
- Run one row with `executeScenario(scenario, context)` where a single transition is the subject.
- Build the context in `build`, which receives the row it is building for. That is what lets one
  table mix fixtures.
- Let the runner name the failure. It prepends the transition's `name` to whatever the row threw and
  carries the original as the `cause`, so a bare assertion message still says which row failed.
- Never assert the entity's internal state in `assert` where the transition is one a person drives.
  Assert what the interface renders, through `readPerception`, `readValue`, or `readStates`.

## Drive the act the way the transition happens

- Drive `act` through the journey verbs — `clickAccessible`, `clickDisclosure`, `typeAccessible`,
  `pressKeys`, `traverseAccessible` — for every transition a person can cause.
- Drive `act` through the entity's own API only where the transition is the entity's rather than the
  person's: a lifecycle event, a transport reply, a timer the surface owns.
- Say which door each row used, in the row's `name`. A table that mixes the doors silently reads as
  a set of user transitions and proves something else.

## Build the harness a person watches

Mount the harness on the same table. It stays in the repository that owns the surface: only
`StateTransition`, `StateScenario`, `executeScenario`, `executeScenarios`, `STATECHART_ATTRIBUTES`,
and `STATECHART_STATUSES` are published, and a workspace that spells a `data-statechart-*` string of
its own has left the contract.

- Render one play control per transition and one play-all control, each disabled while a run is in
  flight.
- Render a state badge carrying the entity's current state, an event log of what the entity emitted,
  and a `role="status"` announcer that narrates each step in a sentence, so a screen reader and a
  vision model both read the run without visual chrome.
- Publish `STATECHART_ATTRIBUTES.status` on the harness root, and cycle its value through
  `STATECHART_STATUSES`: `pending` before a run has a result for every row, `idle` standing ready,
  `running` in flight, and `passed` or `failed` as the terminal reading. Publish
  `STATECHART_ATTRIBUTES.passed`, `.failed`, and `.total` on the same element, so a gate finds the
  harness and reads the tally from one node.
- Publish `STATECHART_ATTRIBUTES.scenario` and `STATECHART_ATTRIBUTES.result` on each row, and
  `STATECHART_ATTRIBUTES.state` on the element rendering the entity's current state.
- Write every attribute from the map rather than from a literal. A harness that sets an attribute
  the gate does not read fails silently as a run that never completes.
- Deep-link one transition and the play-all run from the route, so a decision round names the exact
  link it wants looked at ([decide.md](decide.md) → The rendered artifact).
- Give the harness a demo step that leaves the widget in its most legible state after the run, for a
  person or a vision model deciding on a look.
- Pace the harness for a person to watch. The gate inherits that wall time, so budget the gate from
  the row count and the pause rather than from a fixed timeout.

## Gate the harness

Prove the harness from the browser project, through the interface:

- Mount the harness page and clear the route's query first, so a leftover deep link cannot start the
  walk before the gate does.
- Press the play-all control through `clickAccessible`, never through a constructed event and never
  by setting the deep link.
- Poll `STATECHART_ATTRIBUTES.status` until it reads `passed` or `failed`. Never assert it from one
  read after the click.
- Assert the status reads `passed`, the failed tally reads zero, and the passed tally equals the
  total. Name the failing rows from `STATECHART_ATTRIBUTES.scenario` in the failure message, so a red
  gate says which transition broke.
- Assert the harness inventory before the rows: a page that mounted no transition passes every tally
  assertion.
