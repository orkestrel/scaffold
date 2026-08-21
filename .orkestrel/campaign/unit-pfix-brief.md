# Unit P-fix: the probe audit round's survivors

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/probe`. This is a fix round; the ruling record is
`scaffold/.orkestrel/campaign/audit-probe-reconciliation.md` — read it. Your work is audited
afterwards by Sol. You perform the assignment directly and spawn nothing.

## The findings, each with its bounding constraint

1. **`isRefusedName` totality and breadth** (`src/server/helpers.ts`, the predicate): guard
   every property access so a hostile `has` trap or throwing `code` getter returns `false`
   instead of escaping (the TSDoc's totality sentence becomes true); the
   `ERR_INVALID_ARG_VALUE` branch additionally requires `file` to CONTAIN a NUL, so an
   unrelated invalid-argument error no longer classifies. CONSTRAINT: every real-fault
   classification from the audit's attack table stays byte-identical — `ENAMETOOLONG`; NUL;
   `ENOENT` with a directory parent (including `dirname === '.'`); `false` for a missing or
   file parent, an unstattable parent, a codeless error, a non-object. Unit proofs for the
   hostile values and the non-NUL invalid-arg case, beside the existing family.
2. **The capability gate reads the fault's code** (`tests/setupServer.ts`,
   `REFUSED_RUNTIME_TARGETS`): adopt the audit's shape — the write failed AND its code is
   `ENAMETOOLONG`, `ERR_INVALID_ARG_VALUE`, or `ENOENT` with the scratch still a directory.
   CONSTRAINT: keep the gate independent of `isRefusedName` (a broken classifier must not
   silence its own proof), and keep the accepts-the-name direction (gate false → skip).
3. **The progress proof splits** (`tests/src/server/stages/RuntimeStage.test.ts`, the FIFO
   case near `:944` and the comment near `:31-35`): the claimant-side sample (`progress`
   elevated while a caller's run is in flight) runs UNGATED, parked on the marker-file
   rendezvous the file already uses at `:1211-1227`; the cleanup-side sample stays gated on
   `readFIFOGate`; the comment stating no other rendezvous exists is corrected. CONSTRAINT:
   the cleanup-side assertions stay exactly as strong where the FIFO gate is true.
4. **The TTY skip citation** (`tests/src/bin/main.test.ts`, the `/usr/bin/script` gate): the
   citation names what is absent (the `script` binary the fixture drives) and claims nothing
   about the host lacking terminals generally. Text only; the gate mechanism stays.
5. **Drop the duplicate pin** (`tests/src/server/ProbeServer.test.ts:257-268`): the case
   re-pins a subset of `:74-112`'s existing public-door pin. Remove it (or fold any uniquely
   named intent into the existing case's title); the file keeps exactly one authoritative pin
   of that property.
6. **The guide's helper row** (`guides/probe.md`, the `resolveWorkspaceFile` row near `:175`):
   state the refusal codes the helper acts on, and that a host reporting an absent-file code
   for an overlong name is classified at the create by `isRefusedName` instead. The
   `isRefusedName` row's "Never throws" becomes true through fix 1 and stays.

## Scope

- Owned: `src/server/helpers.ts` (the predicate only), `tests/setupServer.ts`,
  `tests/src/server/stages/RuntimeStage.test.ts`, `tests/src/bin/main.test.ts` (the citation
  text only), `tests/src/server/ProbeServer.test.ts` (the duplicate case only),
  `tests/src/server/helpers.test.ts` (the new predicate proofs), `guides/probe.md` (the two
  rows named).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first for fixes 1 (the hostile-value proof red against the current predicate) and
   2 (an expression showing the old gate's rule admitting a non-classifying code — a control
   in the new probe's own shape is acceptable; record what you used).
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server`
   exits 0; report totals and the skip inventory (the claimant-side progress sample now RUNS
   here).
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin`
   exits 0; totals reported.
7. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion including the failing-first pairs; any
deviation. No process diary.

## Deviation contract

Stop on: fix 3's ungated sample failing on this host for a cause the marker rendezvous cannot
explain (that is a product finding about `progress`); a criterion unreachable. Wording within
the fixed content is yours: decide, record, carry on.
