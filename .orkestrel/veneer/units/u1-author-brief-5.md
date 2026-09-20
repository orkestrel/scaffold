# Unit U1-author — successor brief 5

## What this supersedes

This brief supersedes `u1-author-brief-4.md`; briefs 1 to 4 stay in place unedited and
stand except where this file amends them. Read them in order, then this one.

## Why a successor

Run 4 (journal `../scaffold/units/u1-author-4.jsonl`, thread
`01a0bdaf-45c6-7613-bde7-1a39ceeb248c`) implemented the ColorMode engine, the shell, the browser
setup module, the journeys with captures, the entry proofs, and the conformance controls, ran four
of the five planted controls red and green, and stopped when the sandbox refused to write
`package.json` for `PLANT-PEER`. That stop was correct under the bench law. The Orchestrator
took that control on the host and committed run 4's work as `9d64c66` ("Checkpoint the
ColorMode engine, shell, journeys, and boundary controls") after formatting the tree; the
checkout is clean at that commit.

## Amended evidence

**`PLANT-PEER`, taken by the Orchestrator on 2026-09-20 (`../scaffold/units/u1-plant-peer.log.txt`).**
With `peerDependencies: { vue: '^3.5.43' }` planted in `package.json`, `npm run test:conformance`
exited 1: `runtime boundaries > declares no forbidden runtime dependency or peer` failed with
`expected 'vue' to be undefined`. With the manifest restored byte for byte (sha256 `b0589825…`),
it exited 0 with `7 passed (7)`. Record that reading in the control table as the Orchestrator's,
and plant nothing in `package.json` yourself.

**Gates at `9d64c66` (Orchestrator, outside the sandbox).** `format:check` 0 (after
`npm run format` over the tree), `lint:check` 0, `check` 0, `test:src` 0 (`12 passed`),
`test:app` 0 (`3 passed`), `test:journey` 0 (`32 passed | 4 skipped`), `test:policy` 0,
`test:config` 0, `test:setup` 0 (`12 passed`), `test:setup:browser` 0 (`3 passed`),
`test:conformance` 0 (`7 passed`), `test:src:styles` 0 (`1 passed`; one earlier run in the same
tree failed to import `tests/src/styles/index.test.ts` with
`TypeError: Cannot read properties of undefined (reading 'config')`, then passed twice, so treat a
repeat as a reading to record with its full stack rather than a fault to chase). `test:guides` 1
with `5 failed | 12 passed`: the guide is still the seed.

## Amended execution

Steps 1 through 6 are done; keep them green and refine only what the remaining steps need. Continue
with:

- **Step 7, distribution.** As brief 1 states.
- **Step 8, guides and README.** As briefs 1, 2, and 4 state, with the `ColorMode*` names and the
  `## Tests` links brief 3 names. Close every `test:guides` finding.
- **Step 9, gates.** As brief 4 states. Run `npm.cmd run format` only on the files you touch, by
  path, then `format:check` over the tree.

## Amended output

Overwrite `u1-author-report.md` with the complete report for the whole unit: carry
forward run 4's measurements, control readings, journey mutations, and file lists (they are the
unit's own), add the Orchestrator's `PLANT-PEER` row, and add this run's distribution, guides,
README, and final gate readings. Name the alias the app used to reach the engine, the placement
corrections, the public names with the hosted guide each was checked against, and the RTL
mechanism, as the earlier briefs require.
