# TAILWIND-RECIPE audit — verdict

The Orchestrator's reconciliation of the audit round over TAILWIND-RECIPE, on one claims file (`twr-audit-claims.md`):
the objective lane, `analyst` on GPT-6 Astra (`twr-audit-objective-verdict.md`, journal
`tmp/codex/twr-audit-analyst.jsonl`), and the subjective lane, `reviewer` on Opus 5.5
(`twr-audit-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran on
an engine that did not write the work. No checker ran: no claim is a mechanical count or path.

**Verdict: FAIL 6, 7, 9; outside the claims: F1, F2, F3, R1, R2, R3, R4, R5.** The recipe cases are real: every guide
plant and paired plant fails with an assertion, and the recipe page is the recipe alone.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The fence is held line for line | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The compiled order | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 No component class loses a longhand | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 Shared names resolve | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 The recipe page is real | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 The prose is true | BROKEN | CONFIRMED | BROKEN |
| 7 Fixture paths and repeated code | BROKEN | BROKEN | BROKEN |
| 8 Gates | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Scope and law | BROKEN | BROKEN | BROKEN |

- **Claim 6 (objective).** The guide says the cases prove the recipe's markup `@source` line reaches the scanner.
  The objective lane removed that line from each recipe in memory and `.px-8` was still generated, because the bare
  `@import 'tailwindcss'` also scans the working directory; only with automatic detection off did `.px-8` go. So the
  assertions around `consumer.test.ts` lines 152 and 431 do not tell a missing markup line apart. The reviewer's R1
  names the same cause as a determinism risk: repository text can generate a utility that flips a reading.
- **Claim 7, both lanes.** The new fixtures resolve inside `consumer.test.ts` beside `TAILWIND_PATHS`, whose TSDoc,
  case title, and guide row say it locates every fixture; and the moved-longhand comparison repeats inline, the unit's
  copy byte-identical to an older one. `.claude/rules/tests.md` § Shared test infrastructure makes both defects. The
  lanes differ on the helper's home; the Orchestrator rules for `tests/setupServer.ts`, beside `collectSharedNames` and
  `collectImportantNames`, which the same cases already read.
- **Claim 9, both lanes.** `COMPONENT_FLOOR` is a data table in a test file, which `.claude/rules/tests.md` places in a
  setup module (its sibling `CANDIDATE_FLOOR` is exported from `tests/setupService.ts`); and the order case's title
  omits the import and scanner assertions it makes, while the component case's title says "moves one" where it asserts
  each floor class moves.
- **Claim 3, the reviewer's note.** The case asserts more than the claim said: every floor class moves on the control.
  The title follows the assertion under claim 9.

## Findings outside the claims

- **F1 (subjective), accepted.** The profiles case that holds "every written copy of the exclusion line" does not read
  `consumer-preflight.css`, and the guide repeats the list.
- **F2 (subjective), accepted.** "compiles both recipes" counts a growable set; "the branch" and "what the rule claims"
  name nouns fifty lines away beside a second sense of "rule"; and "the fixture mounts" makes a data file the actor.
- **F3 (subjective), accepted.** `recipe` names a fence string and a stage manager in one file.
- **R1 (subjective referral), accepted with claim 6.** One fix closes both: compile each recipe so its automatic source
  detection sees only the fixture markup.
- **R2 (subjective referral), accepted.** The plants ran before a final comment edit. One paired plant re-runs on the
  final file.
- **R3 (subjective referral), accepted.** The component case launches a third Chromium; its budget is sized from a
  contended run and the reading recorded.
- **R4 (subjective referral), accepted.** The base-layer assertion passes on an empty block; it requires rules.
- **R5 (subjective referral), accepted.** The gate driver records each command it runs.
- **The brief's scope (subjective referral), accepted.** Round 1's brief granted `tests/setupService.ts` without the
  case that pins its export list, and kept `tests/setupServer.ts` off-limits. Round 2's brief grants every file its fixes
  make false.

## Carrier

TAILWIND-RECIPE round 2 (`tailwind-recipe-brief-2.md`, `opus` on Opus 5.5).
