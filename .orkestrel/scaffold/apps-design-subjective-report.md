# Design — subjective lane (`planner`, Opus 5, 2026-09-02)

Transcribed from the lane's returned message; the full text sits in the session transcript.

## Decision

One lane per repository, serial inside itself: baseline → precondition commit → visit → chrome →
journey → conditional repair → gates. Taverna and lloyds in parallel; supervisor inserts its bump
and publish after its visit. Terrain is the reference implementation to instantiate, with an
explicit split between what transfers (viewport through `page.viewport`, close every dialog a
journey opens, `extractStyles` before any drive, negative controls through the read root with an
SVG census control, one variant axis, placement proof last, `transport` wherever the surface
persists) and what each surface re-derives (variants and heights, class floor, transition table,
intents, refusal voices, budgets, capture registry).

## Order and why

Chrome before journey, repair after: rule-driven chrome first stabilises the names the journeys
resolve; the measured bars come from the matrix family, so a conditional repair unit follows the
journey readings and is struck where every bar clears. Journey units serialize across the fleet
(three concurrent browser suites on one host produce timing reds nobody can attribute). No
`--dirty`: a precondition commit removes the need. Every visit waits for the release round.

## Rulings

- The transition table is application data in the app's own constants module, typed on the
  entity's unions; scenarios stay in the test setup; the harness page and the setup import it.
  Carrier: a successor edit to `statechart.md` (landed at scaffold `0d1258c`).
- The harness page belongs to the chrome unit; its gate to the journey unit.
- Supervisor's Playwright `integration.test.ts` moves under `tests/app/browser/integration/`.
- Each repository declares its own variants and copy (supervisor keeps 1440×900; lloyds keeps
  `Add building`). Supervisor keeps `halfmoon.min.css`.

## Units

`probe-drift` (checker, read-only: what each overwrite drops — projects, scripts, hooks, and
whether `.claude/launch.json` and `settings.local.json` are foreign); `base-<repo>` (verifier,
serial: porcelain and default `npm test` colour); `probe-capture` (struck: settled by terrain's
re-film); `pre-<repo>` (Orchestrator-owned precondition commit); `visit-<repo>` (Sol → Opus);
`publish-supervisor`; `chrome-<repo>` (Opus: the user's list plus the harness page and the table
module); `journey-<repo>` (serial across the fleet; families, gate, artifact, setup proofs,
duplicate-verb re-pointing with a count of the rest); `repair-<repo>` (conditional);
`gates-<repo>` (verifier).

## Exit criterion

Pins, canon structure, vendored-rule repair, gate chain, destructive chrome, dark-surface chrome,
style escapes, accessible naming, journey and refusal, matrix, statechart, transport, capture,
per-variant artifact, setup proofs, layer consolidation, guide parity, supervisor's release;
excluded on evidence: TypeScript 7, supervisor's modern core, data states beyond the user's list,
layer defects the suites expose (carried to `@orkestrel/test`).

## Risks named

The overwrite deleting custom Vitest projects and scripts (settle with `probe-drift`); the
narrow-frame clip (settled); hooks moved to a path the sweep also removes (settle from the
foreign set); nested-function volume and supervisor's `src/**` moving `dist/src` (bump trigger);
duplicate contract blast radius (catalog scan for dependents of supervisor); duplicate-verb
call-site counts; the harness pulling `@orkestrel/test` into the app bundle (report the delta);
a suite already red (base); taverna's empty `guides` include; lloyds' `publishConfig` on 0.0.0.
