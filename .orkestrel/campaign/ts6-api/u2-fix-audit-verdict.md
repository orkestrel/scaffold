# Audit verdict — U2 policy-plugin, round 2 over the builder fix (2026-09-06)

Lanes run: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet), `verifier` (Sonnet). Every lane ran; none returned empty. Verifier: `GATES: GREEN` (`u2-fix-verify-report.md`).

## Per claim

Claims 1 to 12: PASS on the subjective lane and on the objective lane. The checker fails claim 10 alone: the builder spelled `ReadonlyArray<readonly string[]>` where the brief prescribed `readonly (readonly string[])[]`. Ruled: the brief's spelling was the defect. `.oxlintrc.json` sets `typescript/array-type` to `array-simple`, which refuses the bracket form for a non-simple element type, and the repository already spells that shape the builder's way (`src/core/helpers.ts:723`). The types are identical; the checker's letter-of-the-brief reading is recorded and the edit stands.

## Findings outside the claims, each with its ruling and carrier

- Subjective A and the objective lane: `.claude/rules/tests.md:108` still sends a leaked type probe to the placement sweep. Carried: round 3.
- Subjective B and the objective referral: the `Proves` cells open with "The sweep proves" inside a column headed `Proves`. Carried: round 3, the bare clause.
- Subjective C: `inspectPolicyPopulations` reports rules as well as populations under a name for half its subject; the repository's term is wiring. Carried: round 3, `inspectPolicyWiring`.
- Objective: the `policy` row under-describes the file because the wiring block proves the real configuration, a proof `tests/config.test.ts` already owns. Ruled: the real-configuration control leaves `tests/policy.test.ts`; the reader's own controls (a missing rule, a missing population, a non-record) stay there as the reader's controls, and the row stays the bare law list. Carried: round 3.
- Objective: the non-record branch of the reader has no control. Carried: round 3.
- Objective and subjective R1: the unanchored fallback of `pathToPolicyRelative` degrades silently, and a `cwd` with a trailing separator is not stripped. Ruled: strip a trailing separator, and state the precondition in the TSDoc (the CLI scripts run from the workspace root, `RuleTester` supplies its own base); a drive-letter case difference is not handled and is named as such. Carried: round 3.
- Subjective D, E, F, G: the fixture comment names the arrival control; the new invalid case takes the membership suffix; the helper's TSDoc wraps; one exported `isPolicyRecord` guard serves both readers. Carried: round 3.
- Objective vocabulary referral: "the cleanup sweep" beside "the sweep". Ruled: the manual pass is "the cleanup pass" at both lines of `.claude/rules/architecture.md`. Carried: round 3.
- Subjective R2 (`eslint(no-debugger)` fires from an unnamed default): refuted by `.oxlintrc.json:53`, which sets `no-debugger` to `error` at the top level. Dropped on the record.
- Objective, recorded and benign: the reader skips a malformed override where the deleted inline walk threw; skipping can only shrink the enabled set, so no false green. No carrier.

VERDICT: PASS on the claims; round 3 dispatched for the carried findings
