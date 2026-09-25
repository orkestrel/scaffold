# Records J-SAMEWAY-ENGINES-A's landing (Veneer 3058570) and the follow-on dispatches in plan.md (2026-09-25): the marker,
# the Landed entry, In flight (ENGINES-B round 3, J-MOTION-PROOFS-A round 3), and the carriers the round-5 and
# J-MOTION-PROOFS-A verdicts named. Each anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:70], t.count(old))
    t = t.replace(old, new, 1)


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


swap(
    "Veneer `origin/main` `d3ad3ab` (this session's J-CONCERNS-A landing, over the styles session's `21c821a`)",
    "Veneer `origin/main` `3058570` (this session's J-SAMEWAY-ENGINES-A landing)",
)
swap(
    "- 2026-09-25: J-CONCERNS-A as `d3ad3ab`, pushed.",
    "- 2026-09-25: J-SAMEWAY-ENGINES-A as `3058570`, pushed. Its rounds are:\n"
    "  - `9019d81` and `7511b82`, merged as `2760f7e`;\n"
    "  - `5805a28`;\n"
    "  - `61640e0`, with the integrations `5e3ae52` and `dc2a1a7`;\n"
    "  - `bdecfa1` and `3f62d64`;\n"
    "  - `fb179a9` and `63a153b`.\n\n"
    "  Its verdicts are `units/j-sameway-engines-a-audit-verdict.md`, `-audit-3-verdict.md`, `-audit-4-verdict.md`, and "
    "`-audit-5-verdict.md`. The landing chain (`tools/w2-land-2d-engines-a.log.txt`, `tools/w2-land-rest-engines-a.log.txt`) "
    "read every gate green except the third standing row. Git unregistered the worktree, but Windows refused to delete "
    "its directory. The directory stays under `tmp/worktrees/engines-a` until the prune.\n"
    "- 2026-09-25: J-CONCERNS-A as `d3ad3ab`, pushed.",
)
swap_line(
    '- J-SAMEWAY-ENGINES-A round 5 is committed',
    "- J-SAMEWAY-ENGINES-B round 3 (`units/j-sameway-engines-b-brief-3.md`, `opus` on Opus 5.5) is writing in "
    "`tmp/worktrees/engines-b`, on the merge `45aebaa` of `main` `3058570`. It carries three things: prior-value "
    "returns through `HostWrite`, a refused reopening that completes the hide, and the B4 table.",
)
swap_line(
    '- J-SAMEWAY-ENGINES-B round 3 (`units/j-sameway-engines-b-brief-3.md`) is drafted.',
    "- J-MOTION-PROOFS-A round 3 (`units/j-motion-proofs-a-brief-3.md`) is writing. The audit of rounds 1 and 2 ruled "
    "FAIL 2, 3 (`units/j-motion-proofs-a-audit-verdict.md`). Round 3 carries four things: Modal settles its live "
    "dialog; the hide proofs read the backdrop's motion; Alert reads its animations at `closed`; and the Backdrop "
    "replacement-token case keeps a transition.",
)
swap(
    "- J-MOTION-PROOFS-C (E32), after J-SAMEWAY-ENGINES-B lands: `Tooltip.test.ts` and `Popover.test.ts`.",
    "- J-MOTION-PROOFS-C (E32), after J-SAMEWAY-ENGINES-B lands: `Tooltip.test.ts`, `Popover.test.ts`, and "
    "`Dropdown.test.ts`, each reading a declared duration through `readDuration` "
    "(`units/j-motion-proofs-a-audit-verdict.md`, claim 6).",
)
swap(
    "- J-MOTION-PROOFS-B (E32), after J-SAMEWAY-ENGINES-A lands:",
    "- J-MOTION-PROOFS-B (E32; `units/j-motion-proofs-b-brief.md` is drafted), after J-SAMEWAY-ENGINES-A and "
    "J-MOTION-PROOFS-A land:",
)
t = t.replace(
    "| J-OVERLAYS, after J-SAMEWAY-ENGINES-B lands,",
    "| J-OVERLAYS, after J-SAMEWAY-ENGINES-B lands (with the E24 witness of `units/j-motion-proofs-a-audit-verdict.md`: "
    "a stopped Offcanvas or Modal show removes a prior `role` instead of writing it back),",
    1,
)
marker = "| Finding | Source | Carrier | Closes with |\n| --- | --- | --- | --- |\n"
i = t.index(marker, t.index("## Carried findings")) + len(marker)
t = (
    t[:i]
    + "| Three prose lines J-SAMEWAY-ENGINES-A round 5 rewrapped run past the 100-column measure: `src/browser/Toast.ts`'s "
    "class remarks around line 59, the guide's § Carousel return paragraph around line 2003, and § Tab's around line "
    "1407 (`units/j-sameway-engines-a-audit-5-verdict.md`) | J-SAMEWAY-ENGINES-A round 5 audit, reviewer Defect D | "
    "J-TOAST-SWIPE for `Toast.ts` and § Carousel; J-ROWS for § Tab | each paragraph wraps at 100 columns |\n"
    + t[i:]
)
p.write_bytes(t.encode('utf-8'))
print('ok')
