# Updates plan.md at 05:15 EDT (2026-09-25). It rewrites the In flight lines for J-RELEASE-CORE (round 3 in audit),
# J-ORACLE-FIX-OFFCANVAS (round 5 writing), J-PLACEMENT-141 (probe 2 sent to the styles session), and J-TAILWIND-PROBE
# (closed), and marks the Tailwind carried finding closed.
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
    "- **J-RELEASE-CORE round 3**",
    "- **J-RELEASE-CORE round 3** is committed as `8b4e9d6` (`units/j-release-core-report-3.md`). `join` ends a joined "
    "class's membership through the class's own drain, so a release error propagates and an ended lifetime is not "
    "enrolled. The replay reads all 26 mutation rows killed and a clean tree (`units/j-release-core-replay-3.log.txt`), "
    "and `analyst` on Astra audits it (`units/j-release-core-audit-claims-3.md`).",
)
swap_line(
    "- **J-ORACLE-FIX-OFFCANVAS** is at a design round",
    "- **J-ORACLE-FIX-OFFCANVAS round 5** (`units/j-oracle-fix-offcanvas-brief-5.md`) is writing. The design round ruled "
    "the press rule (`units/j-oracle-fix-offcanvas-design-verdict.md`): cancel when the hide released the isolation and "
    "the isolation's return target holds focus, read from the target's own root. It adds `IsolationInterface.trigger` "
    "and `holdsFocus`, and removes `readFocusedElement`. The probe runs first.",
)
swap_line(
    "- **J-PLACEMENT-141** is at probe-first",
    "- **J-PLACEMENT-141** is at probe-first (`units/j-placement-141-fix-design-verdict.md`). J-PLACEMENT-141-PROBE-2 "
    "wrote `units/j-placement-141-probe-2.test.ts` (SHA-256 `2f07fa27…`), with its config "
    "`units/j-placement-141-probe-2-vite.config.ts` and run script. Every variant anchors on Chromium 153 in three runs "
    "(`units/j-placement-141-probe-2-153-run-{1,2,3}.log.txt`). The styles session is asked for the Chromium 141 run "
    "at a checkout that holds `d33b27c`.",
)
swap_line(
    "- **J-TAILWIND-PROBE** (`units/j-tailwind-probe-brief.md`)",
    "- **J-TAILWIND-PROBE is closed** (`units/j-tailwind-probe-verdict.md`, PASS). Every scenario reads zero departures "
    "under the consumer preflight profile, with a control, a null control, and a planted control. No engine unit "
    "follows, and the Tailwind carried finding closes.",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
