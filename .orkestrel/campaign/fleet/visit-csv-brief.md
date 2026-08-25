# Unit VISIT-csv — setup proofs and the 0.0.52 visit

## Role and engine

`implementer` on Claude Opus 5, native subagent.

## Objective

Land the setup proofs the audit reports for `/home/user/orkestrel/csv`, adopt the planned
`test:guides` value where missing, run `scaffold repair`, and bring the target's full gates
green. Do not commit.

## Context

**Evidence.** Run `npx --no-install scaffold audit` FIRST and read its `setup:` advisory — that
is your proof work list, one proof file per reported module, named `tests/<module>.test.ts`. The
target was re-pinned to scaffold ^0.0.52 and installed before this dispatch; `package.json` and
`package-lock.json` are dirty with that re-pin (yours to keep, not to revert).

**Law.** `AGENTS.md`; the vendored `.claude/rules/tests.md` §§ Cross-cutting proofs and Shared
test infrastructure, `workspace.md` § Test project matrix, `writing.md`.

**The proof shape (fixed).**

- A setup proof asserts the exported behavior the workspace's suites rely on — one case per
  behavioral contract, never one case per export, never a census of names, never production
  behavior re-proven. Derive expected values by a second route the module cannot share.
- For a path helper such as `isBrowserVuePath`: one accepting case on a real browser path with
  each separator family, one refusing case on a sibling and a prefix lookalike.
- For a data table: structural invariants and the membership a consumer relies on.
- The `setup` project runs in Node with the browser disabled. For a `setupBrowser` module, prove
  the host-independent contracts and state IN THE PROOF, as a comment, that the DOM-driving half
  is proven by the consuming browser suites. For a `setupServer` module, real Node resources
  (real files, real sockets on `127.0.0.1` ephemeral ports) are yours to use. For a
  `setupService` module, prove the hermetic contracts and name the live half as proven by the
  service project.
- `describe`, `it`, and `expect` never enter a `setup*.ts` module; the proof file imports the
  module and asserts.

**The visit order (fixed).** Proofs written → `test:guides` adopted (set the script to the exact
planned value carrying `--no-cache` when the declared value lacks it, through `npm pkg set`) →
`npx --no-install scaffold repair` (this bakes the `setup` project, the `test:setup` script, and
the `test` chain from your proof files' presence) → `npm run format` → the gates.

**Host.** POSIX bash at `/home/user/orkestrel/csv`; loopback listeners and spawns work.

**Measurements.** The audit's advisory, taken by you at the start; quote it in your report.

**Control identifiers.** Per proof file, one mutation control: break one asserted contract in a
COPY of the assertion's input or expectation, watch the case fail, restore. Report one failing
line per proof file.

**Standing conditions.** The manifest and lockfile arrive dirty (the re-pin). `repair` may name
retained differing script values — record them, adopt none beyond `test:guides`.

## Unknowns

The advisory's exact module list — you take it; everything else follows from it.

## Scope

**Owned.** `tests/<module>.test.ts` for every reported module, `package.json` (the `test:guides`
value and what `repair` regenerates), `vite.config.ts` and any other file `repair` regenerates,
`package-lock.json` (already dirty).

**Off-limits.** `src/**`, `guides/**`, `tests/setup*.ts` modules themselves, every other test
file.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Gates you run: `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build`, `npm test`. No git state changes, no
commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing beyond what the tests
themselves spawn.

## Output

Write `/home/user/orkestrel/csv/tmp/units/visit-report.md`: the advisory as taken, the
proof files with what each asserts, one mutation-control failing line per proof file, the
retained differing values repair named, and each gate's closing line. Return the same content as
your final message.

## Deviation contract

Stop and report — expected, found, exact evidence — when a reported module's exports cannot be
proven under the fixed shape (an export-free module, a contract the Node environment cannot
reach beyond the stated browser/service split), or when a gate fails for a cause outside your
owned files. Case naming and file-internal structure are yours.

## Acceptance criteria

1. `npx --no-install scaffold audit` reports no `setup:` advisory at your exit.
2. Every gate in the list closes green, each read bare.
3. One mutation-control failing line reported per proof file, all restored.

**Observations, not criteria.** none.

## Review evidence

The Orchestrator captures the diff and status after your exit; your report plus that diff is the
audit's subject.
