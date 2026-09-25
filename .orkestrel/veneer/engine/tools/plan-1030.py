# Updates plan.md at 06:30 EDT (10:30 UTC, 2026-09-25). It records J-RELEASE-RECORD's landing (86491c2), adds
# J-RELEASE-POPUPS and J-COLLAPSE-SIZE in flight with J-COLLAPSE-SIZE-PROBE's ruling, and rewrites the queue lines
# those dispatches change.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    if new is None:
        del lines[hits[0]]
    else:
        lines[hits[0]] = new
    t = '\n'.join(lines)


def insert_before(anchor, text):
    global t
    assert t.count(anchor) == 1, (anchor, t.count(anchor))
    t = t.replace(anchor, text + anchor, 1)


swap_line(
    "- **J-RELEASE-RECORD round 2** (`units/j-release-record-brief-2.md`",
    "- **J-RELEASE-POPUPS** (`units/j-release-popups-brief.md`, `opus` on Opus 5.5) is writing in "
    "`tmp/worktrees/release-popups` from `86491c2`: `Dropdown`, `Tooltip`, `Popover`, and `Placement` hold through a "
    "`Lifetime` (E35 unit 4; S1 REPLACE, D-SAVE, P-SAVE, PROMOTION, CLOSE-REENTRY, and OPEN-ABORT; S2 rows 2 and 4 to "
    "10).\n"
    "- **J-COLLAPSE-SIZE** (`units/j-collapse-size-brief.md`, `opus` on Opus 5.5) is writing in "
    "`tmp/worktrees/collapse-size` from `86491c2`. J-COLLAPSE-SIZE-PROBE's two rounds ruled the bases (E27's amendment): "
    "`calc-size(min-content, size)` for a horizontal show, and `calc-size(auto, size)` for a vertical show and every "
    "hide. The accepted differences are growth followed, a bordered show reaching its border-box size, and text's "
    "fractional min-content. Acceptance waits on the styles session's Chromium 141 run of "
    "`units/j-collapse-size-probe-2.test.ts`.",
)
insert_before(
    "- 2026-09-25: J-ORACLE-FIX-OFFCANVAS as `92ca407`, pushed:",
    "- 2026-09-25: J-RELEASE-RECORD as `86491c2`, pushed: `recordHostWrite` writes through `HostSnapshot.write`, and "
    "`Carousel`, `Collapse`, `Tab`, `Toast`, and `Dropdown` save no target a call never changes (E35 unit 2a). Tab "
    "reads its selection after the blur, as Bootstrap does. Its rounds are `fdb19cb` with the integration `a1041bd`, "
    "then `d3a3969` (`units/j-release-record-audit-verdict.md` FAIL 5, `-audit-2-verdict.md` PASS). The landing merged "
    "`main` cleanly and read every gate green.\n",
)
swap_line(
    "- J-COLLAPSE-SIZE, after J-MOTION-PROOFS-B lands",
    "- J-COLLAPSE-SIZE: dispatched (see In flight).",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
