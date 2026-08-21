# Unit P5 — Amendment 1, 2026-08-21

Supersedes the Scope section of `unit-p5-brief.md`. Everything else stands.

What changed and why: the unit stopped correctly — F7's new error code lives in the
centralized `PROCESS_ERROR_CODES` tuple in `src/core/constants.ts`, from which
`ProcessErrorCode` (`types.ts:485`) and the guard's admitted set (`errors.ts:64`) derive,
and the original scope granted the derivations without the constant. The brief-check law
this violated: grant a constant and every derivation together.

## Scope (amended)

- Owned, added: `src/core/constants.ts` (the `PROCESS_ERROR_CODES` tuple and its TSDoc),
  and wherever `guides/process.md` enumerates the admitted error codes (that enumeration
  moves with the tuple).
- Owned, unchanged from the original brief: `src/server/Process.ts`,
  `src/server/execution/execute.ts`, `src/core/types.ts`, `src/core/errors.ts`,
  `guides/process.md` (the originally named passages), `tests/src/server/execution/execute.test.ts`,
  `tests/src/server/Process.test.ts` (only if a rename requires it), plus any test that
  pins the tuple's membership — a membership pin that reds under the added code is yours
  to update, because the added member is the change's intent.
- Everything else in the original Scope section stands: standing entries, no commits or
  installs, no `git checkout`/`restore`/`stash`/`reset`/`clean`, `npx.cmd`, sandbox
  limits, observation rule for whole-suite readings.

The acceptance criteria, output shape, and deviation contract of the original brief stand
unchanged.
