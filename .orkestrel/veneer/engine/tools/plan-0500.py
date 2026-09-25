# Updates plan.md at 05:00 (2026-09-25). It rewrites the In flight lines for ENGINES-B (accepted, landing over the styles
# session's TOKEN-PROOFS and TAILWIND-RECIPE), J-RELEASE-CORE (round 2 writing), J-MOTION-PROOFS-B (accepted), and
# J-ORACLE-FIX-OFFCANVAS (round 3 writing), and marks J-TAILWIND-PROBE unblocked.
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
    "- J-SAMEWAY-ENGINES-B round 5 is committed as `4c9a7dd`.",
    "- J-SAMEWAY-ENGINES-B is accepted: round 5 (`4c9a7dd`), then round 6 (`13d4aae`) closing round 5's FAIL 3 "
    "(`units/j-sameway-engines-b-audit-5-verdict.md`, `-audit-6-verdict.md`). The frame waits drain Chromium's own "
    "`ResizeObserver` report. Its landing merged `0a0a252` (`6f5051b`) and read every gate green except the styles "
    "session's four button-reboot rows, which read red on `main` alone on this host (`units/host-chromium-153-reading.md`, "
    "fourth reading). The push met the styles session's TOKEN-PROOFS and TAILWIND-RECIPE landing (`2f7b4a7`), so the "
    "landing merges that and runs again (`tools/w2-land-diverged.sh engines-b-merge`).",
)
swap_line(
    "- J-RELEASE-CORE round 1 is committed as `d702bb8`",
    "- J-RELEASE-CORE round 1 (`d702bb8`) ruled FAIL 1, 3, 4, 8 (`units/j-release-core-audit-verdict.md`). E35 is "
    "amended: a no-change write joins a record a restoration still owes, a hold after destruction began returns "
    "`false`, a joined child leaves its owner's ledger when its own lifetime ends, and a class joins before any "
    "consumer code. Round 2 (`units/j-release-core-brief-2.md`) is writing.",
)
swap_line(
    "- J-MOTION-PROOFS-B rounds 1 and 2 (`0de17f1`",
    "- J-MOTION-PROOFS-B is accepted (`units/j-motion-proofs-b-audit-3-verdict.md`, PASS on round 3, `dfd9204`). It "
    "lands after J-SAMEWAY-ENGINES-B, with `npm run test:app` in its chain. E32 is amended so that the completion bullet "
    "binds only the elements an engine moves.",
)
swap_line(
    "- J-ORACLE-FIX-OFFCANVAS round 2 is committed as `dcff520`",
    "- J-ORACLE-FIX-OFFCANVAS round 2 (`dcff520`) ruled FAIL 4,7 (`units/j-oracle-fix-offcanvas-audit-2-verdict.md`): "
    "a panel's own shadow root hides a focus move from the root reading. That is the seam's second round, so round 3 "
    "(`units/j-oracle-fix-offcanvas-brief-3.md`) compares the deepest focused element, through a reader exported from "
    "`helpers.ts`, and is writing.",
)
swap_line(
    "- J-TAILWIND-PROBE, after the styles session's TAILWIND-RECIPE lands.",
    "- J-TAILWIND-PROBE: unblocked, because TAILWIND-RECIPE landed as `23b2d0f`. It reuses that unit's compiled "
    "preflight fixture, `tests/fixtures/tailwind/preflight.css`, and the recipe's readers in `tests/setupService.ts`.",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
