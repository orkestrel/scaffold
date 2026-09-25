# ER-MECH fix-round audit 2 — verdict (2026-09-25)

The Orchestrator's reconciliation of the fix-round audit on `erm-audit-2-claims.md`. Three lanes ran blind to each
other: the objective lane, `analyst` on GPT-6 Astra (`erm-audit-2-objective-verdict.md`; journal
`tmp/codex/erm-audit-2-analyst.jsonl`, thread `01a0d69a-0f46-7290-a547-729de9693e5a`); the subjective lane, `reviewer`
on Opus 5.5 (`erm-audit-2-subjective-verdict.md`); and `checker` on Sonnet on claims 5, 6, and 8
(`erm-audit-2-checker-verdict.md`). Round 2 was written by `opus` on Opus 5.5; the objective lane ran on another engine.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Readers refuse malformed cells | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 Floors | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 Live runtime | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Release-host case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 Titles | CONFIRMED | BROKEN | CONFIRMED | BROKEN: the case `lists the platform this process runs on among the platforms Node reports` (`tests/setupServer.test.ts`, the case after the supported-hosts case) also asserts `new Set(NODE_PLATFORMS).size === NODE_PLATFORMS.length`, which its title omits. The Orchestrator read the case: its second line is that assertion, so the objective lane's "no remaining title mismatch" and the checker's reading do not hold at that site. |
| 6 The guide | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED on the claim's list; see F1 |
| 7 The packed link case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

## Findings outside the claims

- **F1 (subjective), accepted.** `guides/veneer.md` § Hosts says "The readers of both tables refuse a malformed cell
  and name its row, including a Platform cell that is neither `—` nor a value Node reports as its platform". The
  Orchestrator read `readReceipts` in `tests/setupServer.ts`: it checks the Receipts Platform cell for presence alone.
  A Receipts row with Platform `Linux` passes the reader, and the guides gate then reports an unsupported host, the
  wrong-cause diagnosis round 1 ruled against for the Supported hosts table. The design verdict requires both readers
  to throw on a malformed cell. The code is short of the verdict, so the fix is in the reader, not the sentence.
- **R1 (subjective referral), dropped on the record.** `readRuntime({ version: () => build }, …)` passes an inert data
  stub directly as the argument, which `.claude/rules/tests.md` permits, and an inline `Pick<…>` in an exported
  test-infrastructure signature has precedent in the same file (`renderRuleKey` and its neighbour) and in
  `tests/setup.ts`. Lint and the typecheck pass on it.
- **R2 (subjective referral), dropped on the record.** An exhaustiveness pin on `NODE_PLATFORMS` is a suggestion; both
  the objective lane and the checker read the constant equal to the `@types/node` union, and no lane substantiated a
  defect.
- **R3 (subjective referral), carried as a measurement.** The `engines.node` reading ran under npm's default
  `engine-strict=false`; round 3 measures `engine-strict=true` and words the sentence to both readings.
- **R4 (subjective referral), closed.** The objective lane executed the readers read-only and read the doubled-comma
  and trailing-comma rows each refused.

## Carrier

ER-MECH round 3 (`er-mech-brief-3.md`, `builder` on Sonnet): claim 5's title, F1's reader check, and R3's measurement.
Its audit runs both lanes (`analyst` on Astra and `reviewer` on Opus 5.5), neither of which wrote round 3.

## Ruling

FAIL. The receipts machinery stands; round 3 carries one title, one reader check, and one measurement.
