# Unit S4-2 — successor to `.orkestrel/campaign/s4-brief.md`

Read `.orkestrel/campaign/s4-brief.md` first and in full; it stays unedited and every section of it binds
here except where this file changes it. **What changed and why:** round 1 stopped under the
Deviation protocol (`.orkestrel/campaign/s4-report.md`) because ruling 2 extends the invocation reader
`scriptToInvocations` (`src/bin/helpers.ts:774`) and its contract `ScriptInvocations`
(`src/bin/types.ts:234`), and neither file was owned. This successor owns them and their mirrored
proof, and fixes the contract change types-first.

## Scope, as changed

**Owned, in addition to round 1's list.** `src/bin/types.ts`, `src/bin/helpers.ts`,
`tests/src/bin/helpers.test.ts`, and the `guides/scaffold.md` rows that document
`ScriptInvocations` and `scriptToInvocations` (their Summary cells equal their doc blocks).

Everything else in round 1's Off-limits list stays off-limits.

## Ruling 2, as changed

Types first. Widen `ScriptInvocations` in `src/bin/types.ts` with a readonly `configs` field: the
literal `--config <path>` and `--config=<path>` values one shell command names, in the order they
appear, empty when none. Keep the literal-only remark: an unresolved token still makes the whole
reading `undefined`. Make `scriptToInvocations` read it, pin it in `tests/src/bin/helpers.test.ts`
beside the existing `--project` and `--project=` cases (both spellings, and the unresolved case),
and update the guide rows.

Then the question arms as round 1 rules them, reading `configs` from the invocation: a `test:*`
script naming a `--config` path the plan does not emit and the target does not hold reports in the
existing non-blocking `configs`-group question, worded for a configuration; the reverse arm
reports the `test` chain that does not invoke `npm run test:journey` while the plan emits it, unless
the existing script comparison already names that fact — in which case answer the unknown by
quoting what fires, and extend that message rather than adding a second question.

## Everything else

Rulings 1, 3, 4, 5, 6; the controls `S4-C1` through `S4-C6`; the Output, the Deviation contract,
and the Review evidence sections stand as round 1 states them. The baseline is unchanged
(`0d03ec79`, clean). Write the report as your final message; the Orchestrator takes it from
`--output-last-message`.
