# Rewrites the plan's in-flight paragraph and the note to the styles session after the J-TESTPIN landing
# (Veneer main f22f02c) and the round-2 dispatches; strikes the J-TESTPIN carried-findings row as
# satisfied. Usage: python patch-plan-inflight-3.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md')
text = path.read_text(encoding='utf-8')

# The in-flight paragraph.
start = text.index('**In flight (this session).**')
end = text.index('\n', start)
new_paragraph = (
    "**In flight (this session).** Landed 2026-09-24 after J-HELPERS: J-TESTPIN (`f22f02c`, pushed): the pin moves "
    "to `@orkestrel/test` `^0.0.23` and the `pointer.hold` oracle row drives `driveHold`, the copied sequence deleted "
    "(`units/j-testpin-brief.md`, `-report.md`, `-verdict.md`, `-landing.log.txt`). J-TOOLTIP in `tmp/worktrees/tooltip` "
    "(`unit/tooltip` from `e8251cf`; briefs `units/j-tooltip-brief.md` to `-4.md`): round 3 failed claims 1, 6, 7, 8 and "
    "carried O1 (`units/j-tooltip-audit-3-verdict.md`); the door class had recurred three rounds, so J-TOOLTIP-DOORS "
    "ruled on the mechanism (`units/j-tooltip-doors-verdict.md`, E18); round 4 implements it (writing). Its landing "
    "merges `main` and routes its own `closest` reads through the landed helpers. J-OFFCANVAS in "
    "`tmp/worktrees/offcanvas` (`unit/offcanvas` from `afae42c`): round 1 audited (`units/j-offcanvas-audit-verdict.md`: "
    "the hide's backdrop write after a stopped change, the press heuristic, three policy clauses, two contract findings); "
    "round 2 under `units/j-offcanvas-brief-2.md` (writing; E19 rules the interactive backdrop and the backdrop's removal "
    "as a step). J-SNAPSHOT in `tmp/worktrees/snapshot` (`unit/snapshot` from `afae42c`): round 1 audited "
    "(`units/j-snapshot-audit-verdict.md`: the mechanism confirmed; the judging rule, a proof hole, the fold, the "
    "wording); round 2 under `units/j-snapshot-brief-2.md` (writing). Round-2 audits run the objective lane and the "
    "checker; the reviewer returns at each landing round, and prose bounds ride into the landing round. J-POPOVER's "
    "brief is staged (`units/j-popover-brief.md`) for the tooltip landing. Every round runs the scoped chain "
    "(`scoped-tests-first`). Landed and pruned: W0 to W2 and J-HELPERS (`fd96a0b1`, `dc681254`). Landing order from "
    "here: snapshot, offcanvas, tooltip (each merging `origin/main` first), then J-POPOVER (W4), J-INTEGRATION and "
    "J-ROWS (W5), then J-SHOWCASE and E-VUE after the baseline closes. Nothing on screen reacts yet: no page constructs "
    "a `Delegate`; a unit mounting one over the showcase markup is the shortest path and waits on the user's word."
)
text = text[:start] + new_paragraph + text[end:]

# The note to the styles session.
start = text.index('**Note to the styles session (')
end = text.index('\n', start)
note = (
    "**Note to the styles session (2026-09-24, 18:10 UTC; rewritten at each boundary).** Read at scaffold `9caba88e` "
    "(your FORMS-FRAMES round-2 verdicts) and Veneer `origin/main` `f22f02c`. Landed by this session since your batch 2: "
    "J-HELPERS (`afae42c`) and J-TESTPIN (`f22f02c`). J-TESTPIN moves `package.json` and `package-lock.json` "
    "(`@orkestrel/test` `^0.0.23`) and edits `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`: `holdOraclePointer` "
    "is gone and the `pointer.hold` oracle row calls `driveHold(() => readOracleButton(root, 'Toggle'), 'Toggle')`. When "
    "your branch next merges `main`, run `npm install --ignore-scripts` after the merge, and expect the lockfile to move. "
    "In flight here: J-TOOLTIP round 4, J-OFFCANVAS round 2 (over your offcanvas key; it changes `Backdrop.ts` and "
    "`Isolation.ts`, engine files you do not own), and J-SNAPSHOT round 2 (`HostSnapshot.ts`), each in its own "
    "`tmp/worktrees/<unit>`; none touches a file you own. The request stands: when THEME, BCF, or CLOSE-OUT lands on "
    "`main`, name the Veneer commit here, because each landing here merges `origin/main` first."
)
text = text[:start] + note + text[end:]

# The J-TESTPIN carried row: satisfied.
old_row_start = text.index('| Veneer pins `@orkestrel/test` `^0.0.22`')
old_row_end = text.index('\n', old_row_start)
text = (
    text[:old_row_start]
    + "| Veneer pinned `@orkestrel/test` `^0.0.22` and `tests/setupBrowser.ts` carried `holdOraclePointer`, a copy of `driveHold`'s sequence | the user's ruling on `holdOraclePointer` | J-TESTPIN — **satisfied** (`f22f02c`, 2026-09-24) | the pin reads `^0.0.23` and the `pointer.hold` row drives `driveHold` |"
    + text[old_row_end:]
)
path.write_text(text, encoding='utf-8', newline='\n')
print('plan patched')
