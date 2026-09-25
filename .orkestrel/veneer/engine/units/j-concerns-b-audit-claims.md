# J-CONCERNS-B — audit claims (2026-09-25)

**Subject.** Veneer `7ab04db` on `unit/concerns-b` over `b867c96`. Read the files at `7ab04db` with `git -C C:/Users/mikes/WebstormProjects/veneer show 7ab04db:<path>`.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-concerns-b-brief.md` and the report `j-concerns-b-report.md`.
- `j-concerns-b.diff` and `j-concerns-b-status.txt`.
- The unit's mutation logs `j-concerns-b-*-mutation*.log.txt` and `-tooltip-under-both-mutations.log.txt`.
- The Orchestrator's replay `j-concerns-b-replay.log.txt`. Its instrument is `../tools/replay-concerns-b.py`, which scripts the four mutations as exact replacements.

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md`.
- `../decisions.md` § E9, § E11, and § E32 with all three amendments.
- J-CONCERNS-A's rule for each cell: `j-concerns-a-brief.md` § The rule for each cell.

## Claims

1. **D-MOTION is closed by a ruling and a case that pins it.**
   - Bootstrap 5.3.8's dropdown dispatches `shown` and `hidden` without waiting on a transition (`dropdown.js`), and E32's third amendment rules the same for `Dropdown`.
   - The case "dispatches shown and hidden inside the call while a transition the cascade gives the menu still runs" pins that. Each event is dispatched before its call yields, while the menu runs an animation with a positive duration.
   - Its show and hide mutations each redden it by an assertion. The case reads no value the cascade owns, beyond the planted rule it adds.
2. **P-CANCEL is closed by two cases.** Under the popover profile:
   - a prevented `show.vn.popover` writes nothing and dispatches no `inserted` or `shown`, and a later show works;
   - a prevented `hide.vn.popover` started by `hide()` keeps the tip shown and dispatches no `hidden`.

   Each case is reddened by a profile-conditional mutation of `Tooltip.ts`'s prevention reading, by an assertion.
3. **The tooltip cases do not reach the popover profile.** With both profile-conditional mutations applied, `Tooltip.test.ts` passes 74 of 74. So the popover cases add proof the tooltip cases cannot give.
4. **For each proof you confirm,** name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
5. **Scope.** Only `tests/src/browser/Dropdown.test.ts` and `tests/src/browser/Popover.test.ts` changed, and no engine source changed.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `7ab04db`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
