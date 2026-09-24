# Rewrites the plan's in-flight paragraph for the state after the offcanvas and snapshot round-1
# returns and the J-TOOLTIP-DOORS ruling, and appends the carried-findings rows those rounds raised.
# Usage: python patch-plan-inflight-2.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md')
text = path.read_text(encoding='utf-8')

old_start = '**In flight (this session).** J-TOOLTIP in `tmp/worktrees/tooltip`'
start = text.index(old_start)
end = text.index('\n', start)
new_paragraph = (
    "**In flight (this session).** J-TOOLTIP in `tmp/worktrees/tooltip` (`unit/tooltip` from `e8251cf`; briefs "
    "`units/j-tooltip-brief.md` to `-4.md`; rounds 1 to 3 retained as `units/j-tooltip-report*.md`): round 3 failed "
    "claims 1, 6, 7, 8 and carried O1 (`units/j-tooltip-audit-3-verdict.md`), the door class had recurred three "
    "rounds, so the design round J-TOOLTIP-DOORS ruled on the mechanism (`units/j-tooltip-doors-brief.md`, the two "
    "lane rulings, and `units/j-tooltip-doors-verdict.md`, recorded as E18); round 4 implements it under "
    "`units/j-tooltip-brief-4.md` (writing). Its landing merges `afae42c` and routes its own `closest` reads through "
    "the landed helpers. J-OFFCANVAS in `tmp/worktrees/offcanvas` (`unit/offcanvas` from `afae42c`; brief "
    "`units/j-offcanvas-brief.md`): round 1 returned green (`units/j-offcanvas-report.md`, "
    "`units/j-offcanvas-gates.log.txt`), under audit on `units/j-offcanvas-audit-claims.md` (the checker passed; the "
    "reviewer and the Astra lane running). J-SNAPSHOT in `tmp/worktrees/snapshot` (`unit/snapshot` from `afae42c`; "
    "brief `units/j-snapshot-brief.md`): round 1 returned and closes E13's presence bound and write-back re-entry "
    "(`units/j-snapshot-report.md`; its `Modal.test.ts` patch applied by the Orchestrator; "
    "`units/j-snapshot-gates.log.txt` green), under audit on `units/j-snapshot-audit-claims.md` (the checker passed "
    "with the prose finding F1; the reviewer and the Astra lane running). `@orkestrel/test` 0.0.23 (`driveHold` "
    "releases on any failure after the marker; the user's ruling) is committed and pushed as `80c419e` in the test "
    "checkout and waits for the user's publish; a Veneer unit then re-pins and routes `holdOraclePointer` through "
    "`driveHold`. J-POPOVER's brief is staged (`units/j-popover-brief.md`) for the tooltip landing. Every round runs "
    "the scoped chain (`scoped-tests-first`). Landed and pruned: W0 to W2 and J-HELPERS (`fd96a0b1`, `dc681254`). "
    "Landing order from here: offcanvas, snapshot, tooltip (each merging `origin/main` first), then J-POPOVER (W4), "
    "J-INTEGRATION and J-ROWS (W5), then J-SHOWCASE and E-VUE after the baseline closes."
)
text = text[:start] + new_paragraph + text[end:]

rows = (
    "| `isOffcanvasEvent` repeats `isModalEvent`'s body (the J-OFFCANVAS report's observation; claim 9 asks the reviewer to rule) | J-OFFCANVAS round 1 | J-OFFCANVAS landing round | one shared guard under one name, or the ruling that two stay, in the landing diff |\n"
    "| The `parseBackdrop` remarks name only the modal | J-OFFCANVAS round 1 | J-OFFCANVAS landing round | the remarks name the offcanvas panel too |\n"
    "| The sibling idiom exempts writes by classification (Offcanvas's backdrop writes carry no door) where E18 forbids the same reasoning in Tooltip (`units/j-tooltip-doors-subjective-verdict.md` part 8) | J-TOOLTIP-DOORS | J-INTEGRATION | a ruling on whether every engine's change runs every write as an `#apply` step, taken with a design round's pass |\n"
    "| A temporal `once` in the § Ownership and restoration paragraph and the `HostSnapshotInterface.restore` remarks (`units/j-snapshot-audit-checker-verdict.md` F1) | J-SNAPSHOT round 1 checker | J-SNAPSHOT landing round | both sentences read `after` |\n"
    "| The `#### Tab` and `#### Carousel` sentences name J-SNAPSHOT-SHARED for the shared per-target record across engines, a bound J-SNAPSHOT does not close | J-SNAPSHOT round 1 | J-SNAPSHOT-SHARED (W5, with J-INTEGRATION) | one record per saved target across engines, or the sentences restate the bound without a closer |\n"
    "| Veneer pins `@orkestrel/test` `^0.0.22` and `tests/setupBrowser.ts` carries `holdOraclePointer`, a copy of `driveHold`'s sequence | the user's ruling on `holdOraclePointer` | J-TESTPIN (after the 0.0.23 publish; coordinated with the styles session on `tests/setupBrowser.ts`) | the pin reads `^0.0.23`, the marker digest is written, and `holdOraclePointer` calls `driveHold(() => readOracleButton(root, name), name)` |\n"
)
anchor = '| Finding | Source | Carrier | Closes with |\n| --- | --- | --- | --- |\n'
idx = text.index(anchor) + len(anchor)
# Append after the table's last row: find the blank line that ends the table.
table_end = text.index('\n\n', idx)
text = text[:table_end] + '\n' + rows.rstrip('\n') + text[table_end:]
path.write_text(text, encoding='utf-8', newline='\n')
print('plan patched')
