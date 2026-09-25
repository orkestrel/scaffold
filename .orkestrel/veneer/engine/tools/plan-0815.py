# Updates plan.md at 06:05 EDT (10:05 UTC) (2026-09-25). It records J-ORACLE-FIX-OFFCANVAS's landing (92ca407), rules
# J-RELEASE-RECORD round 1 FAIL 5 and sends round 2, adds J-RELEASE-PRIMITIVES in flight, re-baselines J-MOTION-RECORDER
# and J-ANCHOR-VISIBLE behind the units that own their files, strikes the closed third standing row, and carries the
# Toast nested-destroy witness to J-RELEASE-SIGNALS.
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
    "- **J-RELEASE-RECORD** (`units/j-release-record-brief.md`",
    "- **J-RELEASE-RECORD round 2** (`units/j-release-record-brief-2.md`, `opus` on Opus 5.5) is writing in "
    "`tmp/worktrees/release-record` from `a1041bd`. Round 1 (`fdb19cb`, with the integration `a1041bd`) failed claim 5 "
    "on both lanes (`units/j-release-record-audit-verdict.md`): Tab's take-time selection read is a Bootstrap departure "
    "with no defect behind it, now that the snapshot records at each write. Round 2 restores Bootstrap's read order, "
    "proves the priority half of `recordHostWrite`, and binds each door after a split write.\n"
    "- **J-RELEASE-PRIMITIVES** (`units/j-release-primitives-brief.md`, `opus` on Opus 5.5) is writing in "
    "`tmp/worktrees/release-primitives` from `92ca407`: `Isolation`, `ScrollLock`, `Backdrop`, and `Swipe` hold "
    "through a `Lifetime`, and a nested `destroy` completes every pending release (E35 unit 3; S3 I3s, I4s, and the "
    "ScrollLock group row).",
)
swap_line("- **J-ORACLE-FIX-OFFCANVAS is landing**", None)
insert_before(
    "- 2026-09-25: J-CONCERNS-B as `a65d308`, pushed:",
    "- 2026-09-25: J-ORACLE-FIX-OFFCANVAS as `92ca407`, pushed: a dismissing backdrop press keeps focus on the "
    "trigger the hide returned it to, read from the trigger's own root (`holdsFocus`, `IsolationInterface.trigger`). "
    "Its rounds are `43fa73d` and `88d06f4` over the audited `dcff520` "
    "(`units/j-oracle-fix-offcanvas-audit-5-verdict.md`, PASS). The first push met E-ID-ANCHOR, so the landing merged "
    "`1deced0` cleanly (`tools/w2-land-diverged.sh oracle-fix-offcanvas-merge`) and read every gate green.\n",
)
swap_line(
    "- J-MOTION-RECORDER, after J-ORACLE-FIX-OFFCANVAS lands and before J-MOTION-PROOFS-C",
    "- J-MOTION-RECORDER, after J-RELEASE-RECORD and J-RELEASE-PRIMITIVES land, because it converts motion cases in "
    "their test files, and before J-MOTION-PROOFS-C (`units/j-motion-proofs-b-audit-verdict.md`). It puts one motion "
    "recorder and an end-time leaf in `tests/setupBrowser.ts`, proved in `tests/setupBrowser.test.ts`, and converts "
    "every motion test file that copies the watcher, the completion tuple, or the `playState` filter. It also rules "
    "whether a motion that starts and is cancelled inside one synchronous batch goes unrecorded. It merges with the "
    "styles session's `setupBrowser.ts` hunks under D50.",
)
swap_line(
    "- J-ANCHOR-VISIBLE, after the styles session's E-ID-ANCHOR lands:",
    "- J-ANCHOR-VISIBLE, after J-RELEASE-RECORD lands, because it proves the menu in `Dropdown.test.ts`. E-ID-ANCHOR "
    "landed (`c9a8d91`). Chromium 141's initial `position-visibility` reads `always` (`V.support`), so E29's amendment "
    "applies it.",
)
swap_line("| `tests/src/styles/elements/button.test.ts:198` reads `outline-width`", None)
rows = [
    "| A nested `Toast.destroy()` inside a restoration reaction returns before the pending `show` restoration (S5's "
    "whole-method latch; input: a custom-element toast observing `class`, `{ autohide: false }`, a reaction to the "
    "restoration's `fade` removal that calls `destroy()` again and reads `show`) | J-RELEASE-RECORD audit round 1, "
    "objective lane (from source) | J-RELEASE-SIGNALS | the witness red at its base and green after, under E35's drain |",
]
insert_before("\n\n## Routing ledger", "\n" + "\n".join(rows))
p.write_bytes(t.encode('utf-8'))
print('ok')
