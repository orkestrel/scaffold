# Updates plan.md at 06:15 EDT (2026-09-25). It rewrites the In flight lines for J-CONCERNS-B (landing),
# J-ORACLE-FIX-OFFCANVAS (round 5 committed and under audit), and J-PLACEMENT-141 (ruled: the deferred shape), and the
# queue line for J-PLACEMENT-141.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


swap_line(
    "- **J-CONCERNS-B round 2** (`units/j-concerns-b-brief-2.md`) is writing.",
    "- **J-CONCERNS-B is landing.** Round 2 (`26ee551`) closed on a mutation probe "
    "(`units/j-concerns-b-audit-2-verdict.md`, PASS). The landing's gates read green except the four standing reboot "
    "rows (`tools/w2-land-2d-concerns-b.log.txt`), so `tools/w2-land-rest.sh concerns-b` runs the rest and pushes.",
)
swap_line(
    "- **J-ORACLE-FIX-OFFCANVAS round 5** (`units/j-oracle-fix-offcanvas-brief-5.md`) is writing.",
    "- **J-ORACLE-FIX-OFFCANVAS round 5 is under audit** at `88d06f4`. It implements the design verdict's press rule "
    "(`units/j-oracle-fix-offcanvas-design-verdict.md`): cancel when the hide released the isolation and the "
    "isolation's return target holds focus, read from the target's own root. It adds `IsolationInterface.trigger` and "
    "`holdsFocus`, and removes `readFocusedElement`. The Orchestrator's replay (`units/j-oracle-fix-offcanvas-replay-5.log.txt`) "
    "read the six named cases red at `43fa73d` and green at `88d06f4`, and every mutation killed by an assertion except "
    "the `:focus` swap, which the report names. Both lanes run on `units/j-oracle-fix-offcanvas-audit-claims-5.md`.",
)
swap_line(
    "- **J-PLACEMENT-141** is at probe-first",
    "- **J-PLACEMENT-141 is ruled: the deferred shape** (`units/j-placement-141-fix-ruling.md`). On Chromium 141 the "
    "`baseline` order never anchors, and `deferAnchor` anchors on all four readings of the shipped rule "
    "(`../units/native141/j-placement-141-probe-2-141-run-1.log.txt`). That log stops inside `deferAnchor.always`, so "
    "the styles session is asked for a complete re-run. It must read the `always` verdicts anchored and the "
    "`missingAnchor` control failing before the fix unit is accepted.",
)
swap_line(
    "- J-PLACEMENT-141: on Chromium 141, a dropdown menu inside a scroller resolves no anchor at all",
    "- J-PLACEMENT-141-FIX, after J-RELEASE-POPUPS: the deferred shape (`units/j-placement-141-fix-ruling.md`). A "
    "`Placement` option promotes the element at construction and installs anchoring at the first `update()` after the "
    "element renders, and `Dropdown` keeps Bootstrap's order. It is serialized with J-ORACLE-FIX-PLACEMENT.",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
