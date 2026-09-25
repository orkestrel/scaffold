# J-CONCERNS-B round 2 — close verdict (2026-09-25)

**Subject.** Veneer `26ee551` on `unit/concerns-b` over `7ab04db`. The brief is `units/j-concerns-b-brief-2.md`, the report is `units/j-concerns-b-report-2.md`, and the diff is `units/j-concerns-b-2.diff`.

**How it closes.** Round 2 adopts round 1's objective-lane prescription (`units/j-concerns-b-audit-verdict.md`, claim 2): each P-CANCEL case records the mutation history during the prevented call. Under `.claude/rules/quality.md` § Rounds and verdicts, a fix that adopts the auditor's prescription verbatim closes with a mutation probe in place of a fresh audit round. Lanes not run, for that reason.

**The probe.** The Orchestrator's replay (`units/j-concerns-b-replay-2.log.txt`, instrument `../tools/replay-concerns-b-2.sh`) applies the unit's two mutation diffs, `units/j-concerns-b-2-show-mutation.diff` and `-2-hide-mutation.diff`:
- **Unmutated:** `Popover.test.ts` passes 20 of 20.
- **The show mutation**, a prevented show that writes `aria-describedby` and then writes it back, fails only the prevented-show case, by an `AssertionError`.
- **The hide mutation**, a prevented hide that removes and re-adds the tip's shown token, fails only the prevented-hide case, by an `AssertionError`.
- `Tooltip.ts` is unchanged at `HEAD` after both reverses.

**The unit closes.** It closes both of the exit ledger's last five-concern cells (Design 4 and kickoff 3):
- **D-MOTION:** Dropdown completes synchronously while a menu motion runs.
- **P-CANCEL:** a prevented popover show writes nothing, and a prevented hide keeps the tip, both proved as a mutation history.

J-CONCERNS-B lands next.

VERDICT: PASS
