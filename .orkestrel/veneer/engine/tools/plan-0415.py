# Updates plan.md at 04:15 (2026-09-25). It rewrites the In flight lines for ENGINES-B round 5, J-RELEASE-CORE,
# J-MOTION-PROOFS-B round 3, and J-ORACLE-FIX-OFFCANVAS round 2. It adds J-MOTION-RECORDER to the queue, and gives
# J-ISOLATION-SHADOW the two observations the Offcanvas round 2 made.
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
    "- J-SAMEWAY-ENGINES-B round 5 (`units/j-sameway-engines-b-brief-5.md`",
    "- J-SAMEWAY-ENGINES-B round 5 is committed as `4c9a7dd`. The `ResizeObserver` loop the four frame waits drain is "
    "Chromium's own report, and a native-only reproduction reports it with no Veneer code. The waits stay, and each "
    "comment names the cause. The replay confirms the readings (`units/j-sameway-engines-b-replay-5.log.txt`), and "
    "`analyst` on Astra audits it (`units/j-sameway-engines-b-audit-claims-5.md`). REPLACE and the discard's `tip.id` "
    "read go to J-RELEASE-POPUPS (E35). The unit lands after this audit.",
)
swap_line(
    "- J-RELEASE-CORE (`units/j-release-core-brief.md`",
    "- J-RELEASE-CORE round 1 is committed as `d702bb8` (`units/j-release-core-report.md`): `Lifetime`, "
    "`HostSnapshot.write`, `matchesHostValue`, and `Button` as the first consumer. The replay reads every file and gate "
    "green, all 16 mutation rows killed by assertion, and B1 and the nested drain red at `63eabbd` "
    "(`units/j-release-core-replay-1.log.txt`). The audit runs `reviewer` on Opus 5.5, and then `analyst` on Astra "
    "(`units/j-release-core-audit-claims.md`).",
)
swap_line(
    "- J-MOTION-PROOFS-B rounds 1 and 2 are in audit",
    "- J-MOTION-PROOFS-B rounds 1 and 2 (`0de17f1`, `f03690f`, `6c98bf4`, and `fd82ae9`) ruled FAIL 1, 8, 9 "
    "(`units/j-motion-proofs-b-audit-verdict.md`): a `CSSTransition` type pin, no Tab reduced-motion case, and the "
    "Toast prose. Round 3 (`units/j-motion-proofs-b-brief-3.md`) is writing. E32 is amended so that the completion "
    "bullet binds only the elements an engine moves.",
)
swap_line(
    "- J-ORACLE-FIX-OFFCANVAS round 1 (`eaf3908`) ruled FAIL 7,9",
    "- J-ORACLE-FIX-OFFCANVAS round 2 is committed as `dcff520` (`units/j-oracle-fix-offcanvas-report-2.md`). The press "
    "reads the focus move from the panel's root, and the prose is corrected. The census matches round 1. The replay "
    "runs, and then `analyst` on Astra audits it.",
)
old = "- J-ISOLATION-SHADOW, after J-RELEASE-PRIMITIVES,"
assert t.count(old) == 1, t.count(old)
t = t.replace(
    old,
    "- J-MOTION-RECORDER, after J-ORACLE-FIX-OFFCANVAS lands and before J-MOTION-PROOFS-C "
    "(`units/j-motion-proofs-b-audit-verdict.md`). It puts one motion recorder and an end-time leaf in "
    "`tests/setupBrowser.ts`, proved in `tests/setupBrowser.test.ts`, and converts every motion test file that copies "
    "the watcher, the completion tuple, or the `playState` filter. It also rules whether a motion that starts and is "
    "cancelled inside one synchronous batch goes unrecorded. It merges with the styles session's `setupBrowser.ts` "
    "hunks under D50.\n" + old,
    1,
)
old2 = "Then it repairs the walk, or states the limit."
assert t.count(old2) == 1, t.count(old2)
t = t.replace(
    old2,
    old2 + " It also carries J-ORACLE-FIX-OFFCANVAS round 2's two observations, both from source:\n"
    "  - `Isolation`'s trigger fallback reads `ownerDocument.activeElement`, which records a shadow host rather than "
    "the element focused inside it;\n"
    "  - a panel's root misses a focus move between two elements of a shadow tree nested below it.",
    1,
)
p.write_bytes(t.encode('utf-8'))
print('ok')
