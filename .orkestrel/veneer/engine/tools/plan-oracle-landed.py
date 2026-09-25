# Records J-ORACLE-RECORD's landing and the J-RELEASE work in plan.md (2026-09-25). It sets the marker, adds the Landed
# entry, rewrites In flight (ENGINES-B round 4's FAIL, the sweep, the design round, J-MOTION-PROOFS-B, and
# J-ORACLE-FIX-OFFCANVAS), strikes the stale In flight lines, and updates the queue. Usage: python plan-oracle-landed.py
# <landed-hash>. Each anchor must occur once, or the script stops with nothing written.
import sys
from pathlib import Path

HASH = sys.argv[1]
p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:70], t.count(old))
    t = t.replace(old, new, 1)


def block(first, last, new):
    """Replaces the lines from the one starting with `first` through the one starting with `last`."""
    global t
    lines = t.split('\n')
    starts = [i for i, line in enumerate(lines) if line.startswith(first)]
    ends = [i for i, line in enumerate(lines) if line.startswith(last)]
    assert len(starts) == 1 and len(ends) == 1 and starts[0] <= ends[0], (first, last, starts, ends)
    lines[starts[0] : ends[0] + 1] = new.split('\n')
    t = '\n'.join(lines)


def swap_line(prefix, new):
    block(prefix, prefix, new)


def delete_line(prefix):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    del lines[hits[0]]
    t = '\n'.join(lines)


swap(
    "Veneer `origin/main` `1290162` (this session's J-MOTION-PROOFS-A landing, over the styles session's E-ID-MOTION-FADE)",
    f"Veneer `origin/main` `{HASH}` (this session's J-ORACLE-RECORD landing, over the styles session's LEDGER-ADDITIONS "
    "`73326c7`)",
)
block(
    "- J-SAMEWAY-ENGINES-B round 4 is committed",
    "- J-TOAST-SWIPE's design round",
    "- J-SAMEWAY-ENGINES-B round 4 (`040f4f3`, integration `3bb9afb`) ruled FAIL 4 "
    "(`units/j-sameway-engines-b-audit-4-verdict.md`). Claim 4, the frame wait, has no executed reading. The lane found "
    "two more defects of the same class, and this is the seam's fourth round, so the search switched to breadth "
    "(`.claude/rules/quality.md` § Rounds and verdicts).\n"
    "  - J-RELEASE-SWEEP mapped every release station in every engine against I1, the record, and I2, reach until "
    "released (`units/j-release-sweep-brief.md`). It ran on six blind lenses, S1 on Astra and S2 to S6 on Opus 5.5, and "
    "retained each map as `units/j-release-sweep-<slice>-map.md`. Each lens found the same source on its own: every "
    "`destroy()` except `Dropdown`'s latches the whole method on `aborted`; each owner clears a holding's field before "
    "its release runs; and only snapshot records sit in a drainable ledger. The S2 lens found both of round 4's Tooltip "
    "defects blind. S1's HIDE row is not a defect: Bootstrap writes `aria-expanded=\"false\"` on hide.\n"
    "  - J-RELEASE-DESIGN runs on `units/j-release-design-brief-3.md`, with `planner` on Opus 5.5 and `analyst` on Astra, "
    "blind. The objective lane stopped rounds 1 and 2, correctly, on the brief itself. Round 1 stopped on a latch premise "
    "the code contradicted, and round 2 on a stop rule that made any map disagreement a stop "
    "(`units/j-release-design-analyst-proposal.md`, `-2-analyst-proposal.md`). The planner lanes of both rounds were "
    "stopped before they returned. "
    "It rules on the mechanism (the `Dropdown` destroy pattern, or a shared ledger), the save moment against E25, the "
    "primitives, `Delegate`, and the fresh reads, and it plans the units. Round 5 of J-SAMEWAY-ENGINES-B adopts the "
    "ruling in its four files.\n"
    "- J-MOTION-PROOFS-B (`units/j-motion-proofs-b-brief.md`, `opus` on Opus 5.5) writes in `tmp/worktrees/motion-proofs-b` "
    "from `1290162`: the Collapse, Toast, Tab, and Carousel proofs under E32, and the Toast `shown` finding. The styles "
    "session's note of 06:40 UTC names one more Tab pin, the nav link's `transitionDuration` in the case \"reads the "
    "shipped nav and fade declarations the pane proofs run under\"; the replay checks that it is converted.\n"
    "- J-ORACLE-FIX-OFFCANVAS (`units/j-oracle-fix-offcanvas-brief.md`, `opus` on Opus 5.5) is dispatched from "
    f"`{HASH}`: a dismissing backdrop press leaves focus on the trigger, as Bootstrap's does. It runs the census "
    "instrument `units/j-oracle-record-census-3.test.ts`, which J-ORACLE-RECORD's round 3 used.",
)
swap(
    "- 2026-09-25: J-MOTION-PROOFS-A as `1290162`, pushed.",
    f"- 2026-09-25: J-ORACLE-RECORD as `{HASH}`, pushed. Its rounds are `9ea360d`, `c66e317`, and `6880e63` "
    "(`units/j-oracle-record-audit-verdict.md`, `-audit-2-verdict.md`, and `-audit-3-verdict.md`). The first merge of "
    "`main` kept E-RECEIPTS' hunks beside its own under D49 (`tools/resolve-oracle-record-merge.py`, `c33ec19`). Its "
    "chain read one new red: `no-shadow` on E-RECEIPTS locals named `build` beside the oracle's `vite` import. The "
    "Orchestrator renamed those locals `version` (`tools/resolve-oracle-record-shadow.py`, `0325b56`). The push then "
    "met the styles session's LEDGER-ADDITIONS landing, so the landing merged `73326c7` cleanly "
    "(`tools/w2-land-diverged.sh`) and read every gate green except the third standing row.\n"
    "- 2026-09-25: J-MOTION-PROOFS-A as `1290162`, pushed.",
)
delete_line("- J-SAMEWAY-ENGINES-B round 3, after J-SAMEWAY-ENGINES-A lands.")
swap_line(
    "- J-CONCERNS-B, after J-SAMEWAY-ENGINES-B lands",
    "- J-SAMEWAY-ENGINES-B round 5, after J-RELEASE-DESIGN rules: the S1 and S2 rows the ruling assigns to it, the two "
    "round-4 findings, and claim 4's executed reading of the frame wait.\n"
    "- The J-RELEASE adoption units the ruling plans, for the engines J-SAMEWAY-ENGINES-A landed, the primitives, and "
    "`Delegate`. Each is serialized against the unit that owns its files in flight.\n"
    "- J-CONCERNS-B, after J-SAMEWAY-ENGINES-B lands, because that unit owns both files: Dropdown's motion and Popover's "
    "cancellation, under J-CONCERNS-A's rule for each cell.",
)
swap_line(
    "  - J-ORACLE-FIX-OFFCANVAS, after J-MOTION-PROOFS-A lands",
    "  - J-ORACLE-FIX-OFFCANVAS: dispatched (see In flight).",
)
swap_line(
    "- J-TAILWIND-PROBE, at any time, in the probe worktree.",
    "- J-TAILWIND-PROBE, after the styles session's TAILWIND-RECIPE lands. It reuses that unit's compiled preflight "
    "fixture, `tests/fixtures/tailwind/preflight.css`, rather than building a second one.",
)
swap_line(
    "- J-COLLAPSE-SIZE, after J-SAMEWAY-ENGINES-A lands.",
    "- J-COLLAPSE-SIZE, after J-MOTION-PROOFS-B lands, because both own `Collapse.test.ts`. The Chromium 141 size rows "
    "read green, as on Chromium 153 (the styles session's 141 run). It rules on the horizontal extent E27's amendment "
    "names before it adopts.",
)
swap(
    "- J-ORACLE: RECORD landed in audit (see In flight).",
    f"- J-ORACLE: RECORD landed as `{HASH}`.",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
