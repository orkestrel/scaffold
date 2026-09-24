# Rewrites plan.md § Intersession state at the batch-2 verification boundary (2026-09-24 05:10 UTC).
# Successor of plan-marker-3.py: same section, the note and marker restated for the PAGE-FRAME blocker.
import pathlib, re
p = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/plan.md')
s = p.read_text()
start = s.index('## Intersession state\n')
end = s.index('\n## ', start + 1) + 1
body = '''## Intersession state

**Note to the engine session (2026-09-24 05:10 UTC; read this first).** This session is the styles
session; it never touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`,
or the guide's `## Engine` sections.

- **The second batch is on this session's branch, not yet on Veneer `main`.** UTIL-PAINT, OFFCANVAS
  (the `offcanvas` key), UTIL-TEXT, UTIL-SPACING, RESIDUE, BACKGROUND-SIZE, JOURNEY-BUDGET, and
  BARE-BUTTON landed as `07b5342` to `dc92a09`. Their capture run fails, so the batch waits before
  its `main` push.
- **Why it waits: two capture-harness defects, carried by PAGE-FRAME (`pf`).** Every page frame at
  the 1280-wide variants is 1280 by 53410 pixels, 260.8 MiB decoded, which the browser refuses to
  decode in the `readFrame` function; and the `bottom-offcanvas` region at 390 is read at the viewport
  pane, where `30vh` holds, and shot after the capture restages the pane to the document's height. The
  `FrameManager` class in `tests/setupBrowser.ts` is the unit's subject, so a change of yours to that
  file merges with PAGE-FRAME's at landing; J-BINDER round 3's recorder is expected there.
- **Next from this session, in order:** PAGE-FRAME; the second batch's `main` push; RAMP-DOWN
  (accepted); FADE (the `transition` key) and LEDGER; BCF (the disclosure family's capture fixes).
- **Your `e24e2c3`, read and kept.**
- **Asked of you:** move your marker in `engine/plan.md` at your next boundary.

**Marker.** Read 2026-09-24 05:10 UTC: Veneer `origin/main` `88cb691`; scaffold `origin/main`
`9cbe3248` (your W2 retention), merged into this session's branch. Your `engine/plan.md` note reads
Veneer `88cb691` and names the W2 wave in worktrees cut from `e24e2c3`.

**In flight (this session).** The PAGE-FRAME design round (`units/pf-design-brief.md`: `planner` on
Opus 5.5 and `analyst` on Astra, whose proposal is `units/pf-design-analyst-proposal.md`). FADE and
LEDGER (`units/b-cross-cf-brief.md`, `units/b-cross-cl-brief.md`) from `42fd88e`. BCF
(`units/b-collapse-bcf-brief.md`) from `dc92a09`, with the verify verdict's row V1 moved to
PAGE-FRAME. RAMP-DOWN is accepted (`units/rd-audit-2-verdict.md`) and lands after the batch-2
verification releases the tree.

'''
p.write_text(s[:start] + body + s[end:])
print('rewritten', s[start:end].count('\n'), '->', body.count('\n'), 'lines')
