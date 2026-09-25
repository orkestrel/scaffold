# Records E35 and the J-RELEASE units in plan.md (2026-09-25): In flight (ENGINES-B round 5, J-RELEASE-CORE,
# J-MOTION-PROOFS-B round 2, J-ORACLE-FIX-OFFCANVAS in replay) and the queue lines E35 replaces. Each anchor must occur
# once, or the script stops with nothing written.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def block(first, last, new):
    global t
    lines = t.split('\n')
    starts = [i for i, line in enumerate(lines) if line.startswith(first)]
    ends = [i for i, line in enumerate(lines) if line.startswith(last)]
    assert len(starts) == 1 and len(ends) == 1 and starts[0] <= ends[0], (first, last, starts, ends)
    lines[starts[0] : ends[0] + 1] = new.split('\n')
    t = '\n'.join(lines)


block(
    "- J-SAMEWAY-ENGINES-B round 4 (`040f4f3`",
    "- J-ORACLE-FIX-OFFCANVAS (`units/j-oracle-fix-offcanvas-brief.md`",
    "- **E35 rules the release mechanism.** J-SAMEWAY-ENGINES-B's round 4 ruled FAIL 4 "
    "(`units/j-sameway-engines-b-audit-4-verdict.md`), and it was the seam's fourth round. J-RELEASE-SWEEP mapped every "
    "release station on six blind lenses (`units/j-release-sweep-<slice>-map.md`). J-RELEASE-DESIGN round 3 "
    "(`units/j-release-design-brief-3.md`) returned both lanes, and each chose a shared ledger "
    "(`units/j-release-design-3-planner-proposal.md`, `units/j-release-design-3-analyst-proposal.md`). Its rounds 1 and "
    "2 stopped on the brief itself. The ruling is E35: one `Lifetime` per class, a change-aware `HostSnapshot.write`, "
    "the E25 narrowing, and the units that adopt them.\n"
    "- J-SAMEWAY-ENGINES-B round 5 (`units/j-sameway-engines-b-brief-5.md`, `opus` on Opus 5.5) writes in "
    "`tmp/worktrees/engines-b`. It takes claim 4 only: an executed reading of what reports the `ResizeObserver` loop "
    "that the four frame waits drain. REPLACE and the discard's `tip.id` read go to J-RELEASE-POPUPS (E35). The unit "
    "then lands.\n"
    "- J-RELEASE-CORE (`units/j-release-core-brief.md`, `opus` on Opus 5.5) writes in `tmp/worktrees/release-core` from "
    "`63eabbd`: `Lifetime`, `HostSnapshot.write`, and `Button` as the first consumer.\n"
    "- J-MOTION-PROOFS-B round 2 (`units/j-motion-proofs-b-brief-2.md`, `opus` on Opus 5.5) writes the Carousel "
    "two-item settle in `tmp/worktrees/motion-proofs-b`. Round 1 is committed as `0de17f1`, with its report-only "
    "patches as `f03690f` (`units/j-motion-proofs-b-report.md`). Round 1 stopped correctly on `Carousel.ts`, and it "
    "fixed Toast's `shown`, which fired during the fade in.\n"
    "- J-ORACLE-FIX-OFFCANVAS round 1 is committed as `eaf3908` (`units/j-oracle-fix-offcanvas-report.md`). A "
    "dismissing backdrop press cancels its default action when its hide moved focus, and the census loses its one focus "
    "departure. The Orchestrator's replay runs (`tools/replay-oracle-fix-offcanvas-1.sh`), and then the audit.",
)
block(
    "- J-SAMEWAY-ENGINES-B round 5, after J-RELEASE-DESIGN rules",
    "- The J-RELEASE adoption units the ruling plans",
    "- The J-RELEASE units, in E35's order, after J-RELEASE-CORE:\n"
    "  - J-RELEASE-RECORD, after J-SAMEWAY-ENGINES-B and J-MOTION-PROOFS-B land;\n"
    "  - J-RELEASE-PRIMITIVES, before J-TOAST-SWIPE;\n"
    "  - J-RELEASE-POPUPS;\n"
    "  - J-RELEASE-SWITCHES and J-RELEASE-SIGNALS, after J-TOAST-SWIPE;\n"
    "  - J-OVERLAYS, widened;\n"
    "  - J-RELEASE-DELEGATE.\n"
    "  Each is serialized against the units on its files.",
)
old = "- J-OVERLAYS, after J-SAMEWAY-ENGINES-B lands:"
assert t.count(old) == 1, t.count(old)
t = t.replace(
    old,
    "- J-OVERLAYS, widened by E35 to `Modal` and `Offcanvas`'s drain, F1, M5, and the claim order, after "
    "J-RELEASE-PRIMITIVES and J-ORACLE-FIX-OFFCANVAS land. It also carries:",
    1,
)
p.write_bytes(t.encode('utf-8'))
print('ok')
