# Updates plan.md at 07:00 EDT (2026-09-25). It records J-CONCERNS-B's landing (argument 1: the Veneer main tip) and
# the close of the four standing reboot rows, rules J-ORACLE-FIX-OFFCANVAS PASS and sends it to landing, and adds the
# Offcanvas round's bounds to § Carried findings with one carrier each.
# Usage: python plan-0700.py <main tip>
import sys
from pathlib import Path

tip = sys.argv[1]
p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


def insert_before(anchor, text):
    global t
    assert t.count(anchor) == 1, (anchor, t.count(anchor))
    t = t.replace(anchor, text + anchor, 1)


lines = t.split('\n')
hits = [i for i, line in enumerate(lines) if line.startswith("- **J-CONCERNS-B is landing.**")]
assert len(hits) == 1, len(hits)
del lines[hits[0]]
t = '\n'.join(lines)
swap_line(
    "- **J-ORACLE-FIX-OFFCANVAS round 5 is under audit**",
    "- **J-ORACLE-FIX-OFFCANVAS is landing** (`88d06f4`). Both lanes confirmed every code and proof claim, and each "
    "failed only claim 6, a prose claim the claims file should not have carried "
    "(`units/j-oracle-fix-offcanvas-audit-5-verdict.md`, PASS). The prose findings are bounds in § Carried findings. "
    "The Orchestrator's probe shows `holdsFocus` differs from `:focus` on a page without system focus "
    "(`units/j-oracle-fix-offcanvas-audit-5-focus-probe.log.txt`), so the helper stays.",
)
swap_line(
    "- **The styles session's four button-reboot cases** read red on `main` on this host.",
    "- **The four standing reboot rows are closed.** REBOOT-153 (`6586b11`) reads a width that paints no line at "
    "`0px`, and the J-CONCERNS-B landing over it read all 115 styles files green on this host "
    "(`tools/w2-land-2d-concerns-b-merge.log.txt`; the five-file reading is `units/main-reboot-153-reading.log.txt`). "
    "E5 excludes no row.",
)
insert_before(
    "- 2026-09-25: J-RELEASE-CORE as `b8c6a08`, pushed:",
    f"- 2026-09-25: J-CONCERNS-B as `{tip}`, pushed: Dropdown completes synchronously under a running menu motion "
    "(D-MOTION), and a prevented popover show or hide takes no mutation (P-CANCEL), which closes the exit ledger's "
    "five-concern cells. Its rounds are `7ab04db` and `26ee551` (`units/j-concerns-b-audit-verdict.md`, "
    "`-audit-2-verdict.md`, PASS on a mutation probe). The first push met REBOOT-153, so the landing merged "
    "`6586b11` cleanly (`tools/w2-land-diverged.sh concerns-b-merge`) and read every gate green, the styles files "
    "included.\n",
)
rows = [
    "| The Offcanvas press prose: \"moves focus off the trigger\" is false for the guard rows (P1); the hide-listener "
    "example does not occur on its own, because the isolation's return runs after the `hide` event (P2); \"two "
    "limits\" and \"both limits\" are counts (P3); the fallback-host outcome needs the host's shadow tree to hold the "
    "panel, at the class TSDoc, § Offcanvas, the Bootstrap-difference bullet, and the fallback case's title (P4) | "
    "J-ORACLE-FIX-OFFCANVAS audit round 5, subjective lane | J-OVERLAYS | each sentence rewritten as "
    "`units/j-oracle-fix-offcanvas-audit-5-subjective-verdict.md` prescribes |",
    "| A fallback host that takes focus itself (`tabindex=\"-1\"`, no `delegatesFocus`) keeps focus after the panel "
    "hides, so the prose's \"then on the body\" is unproved for it | J-ORACLE-FIX-OFFCANVAS audit round 5, objective "
    "lane, claim 6 | J-OVERLAYS | the row added to the fallback case and the prose worded to its measured outcome |",
    "| A connected trigger whose own `focus` listener redirects the restoration is unmeasured, and `Delegate`'s return "
    "at `hidden` makes direct and delegated operation differ | J-ORACLE-FIX-OFFCANVAS audit round 5, objective lane "
    "residual | J-OVERLAYS | both operations measured and ruled against Bootstrap |",
    "| The `#### IsolationInterface` section carries a prose paragraph beside its methods table, and § Modal's "
    "`Isolation` bullet says the fallback records \"the element that held focus at construction\", where it records "
    "the shadow host when focus sat inside a shadow root (P5) | J-ORACLE-FIX-OFFCANVAS audit round 5, subjective lane "
    "| J-ISOLATION-SHADOW | the paragraph deleted, and the bullet corrected, naming `trigger` and pointing to "
    "§ Offcanvas |",
    "| `holdsFocus`'s `root === scope` conjunct cannot change the result (D1) | J-ORACLE-FIX-OFFCANVAS audit round 5, "
    "subjective lane | J-ISOLATION-SHADOW | `return scope.activeElement === element` |",
    "| `holdsFocus`'s remarks do not say that it reads focus within the root whatever the window's system focus is, "
    "where `:focus` stops matching (measured: `units/j-oracle-fix-offcanvas-audit-5-focus-probe.log.txt`) | "
    "J-ORACLE-FIX-OFFCANVAS audit round 5, both lanes | J-ISOLATION-SHADOW | one remarks sentence citing the probe |",
]
insert_before("\n\n## Routing ledger", "\n" + "\n".join(rows))
p.write_bytes(t.encode('utf-8'))
print('ok')
