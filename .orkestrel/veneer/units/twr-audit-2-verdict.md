# TAILWIND-RECIPE audit round 2 — verdict

The Orchestrator's reconciliation of the audit round over TAILWIND-RECIPE round 2, on one claims file
(`twr-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`twr-audit-2-objective-verdict.md`, thread
`01a0d733-fe0e-74b0-bd53-83347034b309`), and the subjective lane, `reviewer` on Opus 5.5
(`twr-audit-2-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work. No checker ran: no claim is a count or a path the lanes did not read.

**Verdict: FAIL 2, 6; outside the claims: F1, F2, F3, R1.** The source isolation, the fixture keys, the helper, the
floors, R2 to R5, the compiler type, and the gates hold. Every plant kills with an assertion. Round 3 fixes the
consumer-facing prose and closes the findings. This is the unit's third round, so the Orchestrator rules the fix
(`tailwind-recipe-brief-3.md`).

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 Source isolation | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The markup line is load-bearing | BROKEN | BROKEN | BROKEN |
| 3 Fixture paths | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The comparison helper | CONFIRMED | CONFIRMED | CONFIRMED, with R1 |
| 5 The floors | CONFIRMED | CONFIRMED | CONFIRMED, with F2 |
| 6 Titles and prose | CONFIRMED | BROKEN | BROKEN |
| 7 R2 to R5 | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 The compiler type | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 Test-file data outside this round | CONFIRMED | CONFIRMED | CONFIRMED; round 3 moves it |

- **Claim 2, both lanes.** The plants hold. The prose does not: § Tailwind says the composable imports generate
  utilities only from the markup the `@source` rule names, and that the `@source './src'` line names "what Tailwind
  scans". Each recipe's import leaves Tailwind's automatic source detection on, so a consumer's build also scans the
  project it runs from; the isolation probe compiles the unchanged recipe with the default base and reads `.sepia-390`
  and `.ring`, which the markup does not contain. The empty-directory root is the workspace's, not the consumer's.
- **The recipe, ruled (subjective R3).** Two fixes close claim 2: state automatic detection in the prose, or write
  `source(none)` on each recipe's import. The Orchestrator rules the prose fix. The recipe keeps the Tailwind import a
  consumer expects, whose automatic detection finds the consumer's own files; `source(none)` would make every consumer
  list each directory and would change the shipped recipe, both fixtures, and both pairings for a documentation defect.
  The guide then says plainly which scan the consumer's build runs and which the workspace runs.
- **Claim 6 (subjective).** "the markup's `px-8` utility is generated, a reading a recipe without its markup line
  fails" drops its helper words and cannot be read once; `.claude/rules/writing.md` keeps them.
- **Claim 10.** Both lanes confirm that `ORDER` and `CONTROL_VARIABLES` in `profiles.test.ts` and `EXECUTED_SOURCE` and
  `SHIPPED_SOURCE` in `consumer.test.ts` are reusable data and constants that `.claude/rules/tests.md` and `AGENTS.md`
  Centralize by kind place in a setup module. They belong to this unit's capability, so round 3 moves them.

## Findings outside the claims

- **F1 (subjective), accepted.** `preflightSource` and `preflightProfile` in `consumer.test.ts` hold the consumer's
  `preflight` recipe, while the same names in `profiles.test.ts` and `preflight.test.ts` hold the `preflight` profile.
- **F2 (subjective), accepted.** The `COMPONENT_FLOOR` summary says the floor bounds a reading "over the rest of the
  component rules"; the case reads every component rule, and the floor's role is that each class is reached on a
  longhand Tailwind's reset also writes.
- **F3 (subjective), accepted.** The § Files row for `tests/fixtures/tailwind/` says "the markup those profiles scan",
  which can attach to the `preflight` profile, and calls the recipe copies "consumer profile".
- **R1 (subjective referral), accepted.** No case gives `collectMovedLonghands` two moved longhands in one reading, so a
  helper that reports only the first survives its proof.
- **R2 (subjective referral), settled.** The `COMPONENT_TIMEOUT` TSDoc says "4 CPUs"; `nproc` on this host reads `4`
  (the Orchestrator's reading, 2026-09-25 06:27 UTC). No change.

## Carrier

TAILWIND-RECIPE round 3 (`tailwind-recipe-brief-3.md`, `builder` on Sonnet), then `analyst` on GPT-6 Astra checks the
Orchestrator-ruled prose and `checker` on Sonnet reads the moves and renames.
