# Acceptance — the execution consolidation

## Gates

Run by an independent `verifier` on the accepted tree, each bare, each its own command.

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | pass |
| `npm run lint:check` | 0 | pass |
| `npm run check` | 0 | pass |
| `npm run build` | 0 | pass |
| `npm test` | 0 | pass |
| `npm run test:distribution` | 0 | pass, 11 assertions, registry reached |

Per project: `test:src` 5 files, 184 passed, 8 skipped; `test:policy` 111 passed; `test:config` 46
passed; `test:setup` 2 files, 10 passed; `test:guides` 102 passed, 1 skipped.

Against the recorded pre-change baseline of `test:src` 9 files, 172 passed, 8 skipped: the file
count falls because four files folded into one, the passing count rises by the rows the fold and
the fix round added, and the skipped count is unchanged — the same Windows-only `skipIf` rows.

## The exit criterion, and how each capability closed

- Move the three functions into `helpers.ts` — **closed.** `src/server/execution/` does not exist.
- Confirm they are properly named — **closed.** Two blind lanes ruled independently that all three
  names stand, and `guides/process.md` § Vocabulary now records the `detach` ruling durably.
- Move their tests into `tests/src/server/helpers.test.ts` — **closed.** The mirror rule in
  `tests/setupPolicy.ts` made this mandatory rather than tidy, and `npm run test:policy` proves it.
- Report whether the distributable changed — **closed.** Measured against the published tarball;
  the reading is in `distributable-instrument.md`.
- Remove `Retention`, on the owner's ruling — **closed**, with its hardening landed on
  `captureChunk` and `execute`.
- Repair the UTF-8 defect the fold exposed, and the retreat defect that repair exposed —
  **closed**, each with a failing-first proof and a committed regression guard.

## Instruments retained

`retention-equivalence.mjs` — proved the folded accounting equals the class, 33600 comparisons,
three injected-defect controls.
`fix-sim.mjs` — proved the `limit + 1` bound closes the split-sequence defect across 90
limit-and-chunking combinations, with the pre-fix form detected as the control.
`counterexample.mjs` — ran the audit's counterexample against the published artifact and the build.
`sync-probe.mjs` — mapped `executeSync` across every limit from 1 to 11 and refuted the audit's
`executeSync` finding.
`final-probe.mjs` — the acceptance comparison against published 0.0.8 across six vectors.

## Release consequence

A version bump and a publish are owed, and they are owed entirely to the owner's ruling to remove
`Retention`, not to the move. `distributable-instrument.md` separates the two causes with the
measurement behind each.

Not done here: the version in `package.json` is untouched at 0.0.8. Publishing is the owner's
decision and the owner's credential.

## Carried forward, not closed here

- `tests/setupPolicy.ts:191-194` registers `src/server/execution` in `FUNCTION_DOMAIN_FOLDERS`, a
  folder this change deletes. The file is scaffold-vendored, `scaffold repair` restores any edit,
  and the architecture rule states there is no workspace-local registration path. It needs a
  fleet-canon change in `@orkestrel/scaffold`.
- `tests/src/server/helpers.test.ts` carries a pre-existing row reading "signals nothing once the
  host has recorded the native exit", where `once` carries the temporal sense
  `.claude/rules/writing.md` substitutes. Present at `HEAD` before this change.
- A brief-writing defect to carry into the next campaign: unit U1's acceptance criterion named
  `npm run check`, which typechecks `tests/` and so could not pass from inside that unit's owned
  files. `.agents/orchestration.md` § Check the brief before you send it requires reading each
  criterion against the off-limits list; that check was not run. The correct criterion was
  `npm run check:src`.
