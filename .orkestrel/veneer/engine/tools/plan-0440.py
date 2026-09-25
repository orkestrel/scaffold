# Rewrites plan.md's In flight section whole and adds the two landings (2026-09-25, 04:40 EDT). J-SAMEWAY-ENGINES-B
# landed as d33b27c and J-MOTION-PROOFS-B as b867c96. It also strikes J-DROPDOWN-SETTLE (E32's third amendment), marks
# J-TAILWIND-PROBE dispatched, and restates J-PLACEMENT-141 as the probe-first ruling.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def block(first, last, new):
    global t
    lines = t.split('\n')
    starts = [i for i, line in enumerate(lines) if line.startswith(first)]
    ends = [i for i, line in enumerate(lines) if line.startswith(last)]
    assert len(starts) == 1 and len(ends) == 1 and starts[0] < ends[0], (first, last, starts, ends)
    lines[starts[0] + 1 : ends[0]] = new.split('\n')
    t = '\n'.join(lines)


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


block(
    "**In flight (this session).**",
    "**Landed.**",
    "- **J-RELEASE-CORE round 3** (`units/j-release-core-brief-3.md`) is writing. It closes the `join` seam by ending a "
    "joined child's membership through the child's own drain, with no event listener. Round 2 (`03526bc`) ruled FAIL 5 "
    "(`units/j-release-core-audit-2-verdict.md`): an error thrown in a joined child's release was lost inside an "
    "`abort` listener. Round 1's verdict and the E35 amendment stand.\n"
    "- **J-ORACLE-FIX-OFFCANVAS** is at a design round (`units/j-oracle-fix-offcanvas-design-brief.md`, `planner` on "
    "Opus 5.5 and `analyst` on Astra). Four rounds tried to detect the hide's focus move: rounds 1 to 3 compared state "
    "at deeper and deeper scopes, and round 4's composed `focusin` never reaches the document from inside one shadow "
    "root (`units/j-oracle-fix-offcanvas-report-4.md`). By the seam budget, the rule is now a design question. The "
    "candidates are a state read plus an event, the trigger's own `:focus`, and always cancelling. Round 3 is "
    "committed as `43fa73d` (`units/j-oracle-fix-offcanvas-round-3-ruling.md`).\n"
    "- **J-PLACEMENT-141** is at probe-first (`units/j-placement-141-fix-design-verdict.md`). The design lanes split: "
    "the planner chose to write the menu token before the placement, and the analyst chose a deferred-anchoring option "
    "that keeps Bootstrap's order. No proposal is measured on Chromium 141. J-PLACEMENT-141-PROBE-2 "
    "(`units/j-placement-141-probe-2-brief.md`) writes the successor probe in `tmp/worktrees/probe-141b`, with the "
    "variants `tokenFirst`, `tokenFirstLayout`, and `deferAnchor`. The styles session runs it on 141, and the readings "
    "choose the design.\n"
    "- **J-TAILWIND-PROBE** (`units/j-tailwind-probe-brief.md`) is writing in `tmp/worktrees/tailwind-probe` from "
    "`b867c96`. It records every J-ORACLE scenario under the compiled consumer preflight profile and compares it with "
    "Veneer alone.\n"
    "- **The styles session's four button-reboot cases** read red on `main` on this host. They are recorded as standing "
    "rows (`units/host-chromium-153-reading.md`, fourth reading), and the styles session is told.\n",
)
old = "- 2026-09-25: J-ORACLE-RECORD as `63eabbd`, pushed."
assert t.count(old) == 1, t.count(old)
t = t.replace(
    old,
    "- 2026-09-25: J-MOTION-PROOFS-B as `b867c96`, pushed. Its rounds are `0de17f1` with `f03690f`, `6c98bf4` with "
    "`fd82ae9`, and `dfd9204` (`units/j-motion-proofs-b-audit-verdict.md`, `-audit-3-verdict.md`, PASS). The landing's "
    "chain read every gate green, `test:app` included, except the four standing reboot rows.\n"
    "- 2026-09-25: J-SAMEWAY-ENGINES-B as `d33b27c`, pushed. It closed on round 6 (`13d4aae`; "
    "`units/j-sameway-engines-b-audit-6-verdict.md`). Its landing merged `0a0a252` as `6f5051b`, resolving the sorted "
    "`setupBrowser.test.ts` export list by hunk (`tools/resolve-engines-b-merge.py`). It then re-merged over "
    "TOKEN-PROOFS and TAILWIND-RECIPE `2f7b4a7` (`tools/w2-land-diverged.sh engines-b-merge`). Every gate read green "
    "except the four standing reboot rows.\n" + old,
    1,
)
swap_line(
    "- J-CONCERNS-B, after J-SAMEWAY-ENGINES-B lands",
    "- J-CONCERNS-B, now unblocked (J-SAMEWAY-ENGINES-B landed): Dropdown's motion and Popover's cancellation, under "
    "J-CONCERNS-A's rule for each cell. E32's third amendment settles Dropdown's motion cell: it completes "
    "synchronously. It is serialized with the other units on those files.",
)
swap_line(
    "- J-DROPDOWN-SETTLE, a design round",
    "- ~~J-DROPDOWN-SETTLE~~: struck as satisfied by E32's third amendment. `Dropdown` completes synchronously, as "
    "Bootstrap's does, and a menu entry animation is cascade feedback.",
)
swap_line(
    "- J-TAILWIND-PROBE: unblocked",
    "- J-TAILWIND-PROBE: dispatched (see In flight).",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
