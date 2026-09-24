# Rewrites the plan's in-flight paragraph after the J-SNAPSHOT landing (Veneer main c21fd17), the
# offcanvas round-2 return, and the tooltip round-4 resume; appends the carried-findings rows the
# snapshot rounds left. Usage: python patch-plan-inflight-4.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md')
text = path.read_text(encoding='utf-8')

start = text.index('**In flight (this session).**')
end = text.index('\n', start)
new_paragraph = (
    "**In flight (this session).** Landed 2026-09-24 after J-HELPERS: J-TESTPIN (`f22f02c`) and J-SNAPSHOT "
    "(`df258a1`, merge `c21fd17`, pushed): one shared presence record per attribute read at the first save and forgotten "
    "after the last holder restores, every restoration removing the attribute its writes left empty (a taken-back record "
    "included), the write-back re-entry hand-off, E13 closed (`units/j-snapshot-brief.md` to `-3.md`, the reports, the "
    "three audit verdicts, `units/j-snapshot-audit-3-verdict.md` for the prescription-adopted closure and the replay, "
    "`units/j-snapshot-landing.log.txt`). J-TOOLTIP in `tmp/worktrees/tooltip` (`unit/tooltip` from `e8251cf`): round 4 "
    "implements E18 (`units/j-tooltip-brief-4.md`); the writer was stopped by the user mid-round and a fresh writer "
    "resumed from `units/j-tooltip-brief-4-resume.md` (writing). Its landing merges `main` and routes its own `closest` "
    "reads through the landed helpers. J-OFFCANVAS in `tmp/worktrees/offcanvas` (`unit/offcanvas` from `afae42c`): round 2 "
    "returned green under E19 (`units/j-offcanvas-report-2.md`: `Backdrop.hide` fades without removing, "
    "`IsolationOptions.spare`, the press on the backdrop element, the contract sentences), under audit on "
    "`units/j-offcanvas-audit-claims-2.md` (the objective lane on Astra and the checker; the reviewer at the landing round, "
    "which merges `c21fd17` and will meet the snapshot's guide and `types.ts` edits). Round-2 audits run the objective lane "
    "and the checker; the reviewer returns at each landing round; prose bounds ride into the landing round; a fix that "
    "adopts the auditor's prescription closes on the instrument probe. J-POPOVER's brief is staged "
    "(`units/j-popover-brief.md`) for the tooltip landing. Landed and pruned: W0 to W2 and J-HELPERS (`fd96a0b1`, "
    "`dc681254`). Landing order from here: offcanvas, tooltip, then J-POPOVER (W4), J-INTEGRATION and J-ROWS (W5), then "
    "J-SHOWCASE and E-VUE after the baseline closes. Nothing on screen reacts yet: no page constructs a `Delegate`; a unit "
    "mounting one over the showcase markup is the shortest path and waits on the user's word."
)
text = text[:start] + new_paragraph + text[end:]

rows = (
    "| The snapshot reviewer's wording bounds not touched by a round-3 sentence edit: the Carousel restatement, the Modal paragraph's uninitroduced \"presence record\" term, the `written` name against its comment, `readonly HostSnapshotTarget[]` beside `ReadonlyArray<…>`, the `#### Dropdown` antecedent (`units/j-snapshot-audit-2-subjective-verdict.md` Bounds) | J-SNAPSHOT round 2 | J-INTEGRATION (the prose pass) | each sentence reads as the bound names |\n"
    "| The private presence and pending shapes are written inline more than once in `HostSnapshot.ts` (the reviewer's R1); ruled a bound with no `types.ts` home because they are not public | J-SNAPSHOT round 2 | J-INTEGRATION | one inline declaration per shape, or a ruling that the repetition stays |\n"
    "| A Modal whose hide a reaction stops now keeps its faded backdrop connected until a later show or destruction, where the round-1 `Backdrop.hide` removed it (`units/j-offcanvas-report-2.md`, the closing observation); no Modal source changed and its suite is green | J-OFFCANVAS round 2 | J-OFFCANVAS landing round | the `#### Modal` Backdrop bullet states the held backdrop, and a Modal case pins it or the round-2 objective lane rules none is needed |\n"
)
anchor = '| Finding | Source | Carrier | Closes with |\n| --- | --- | --- | --- |\n'
idx = text.index(anchor) + len(anchor)
table_end = text.index('\n\n', idx)
text = text[:table_end] + '\n' + rows.rstrip('\n') + text[table_end:]

# The J-SNAPSHOT-SHARED row: E13's successor is landed; the row now names the remaining bound only.
old = "| J-SNAPSHOT-SHARED (E13's successor, after W2) |"
if old in text:
    text = text.replace(old, "| J-SNAPSHOT (landed `c21fd17`, 2026-09-24) — **satisfied**; the shared per-target record across engines (Tab, Carousel) stays with J-SNAPSHOT-SHARED (W5) |")
path.write_text(text, encoding='utf-8', newline='\n')
print('plan patched')
