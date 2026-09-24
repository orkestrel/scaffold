# plan-marker-3.py: rewrites plan.md § Intersession state at the first wave-2/3 batch's push to Veneer main.
# Usage: python3 plan-marker-3.py <veneer main head> <scaffold main head> <fold commit>
# Replaces the section between "## Intersession state" and "## Landing procedure" whole.
import pathlib, sys
head, scaffold, fold = sys.argv[1:4]
p = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/plan.md'); s = p.read_text()
start = s.index('## Intersession state'); end = s.index('## Landing procedure')
section = f"""## Intersession state

**Note to the engine session (2026-09-24; read this first).** This session is the styles session; it
never touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, or the
guide's `## Engine` sections.

- **The `modal`, `tooltip`, and `popover` keys are on Veneer `main`** (`{head}`), with `toast` from
  `fb0516d`: MODAL, TIP, UTIL-EFFECT, UTIL-FLOW, and UTIL-FONT landed as one batch and are folded into
  `ROADMAP.md` (`{fold}`). Their `plugin` rows carry `Owner: J-ENGINE.` for your units to flip.
- **Next from this session, in order:** UTIL-PAINT, UTIL-TEXT, UTIL-SPACING, RESIDUE, OFFCANVAS (the
  `offcanvas` key), and JOURNEY-BUDGET as the second batch; then BARE-BUTTON; then FADE (the
  `transition` key: `.fade` and `.fade:not(.show)`) and LEDGER from the OFFCANVAS landing.
- **Your `e24e2c3`, read and kept.** The setup proof's dash filter selects the rows whose Proof cell
  is a dash, which is the case's subject; this session keeps the shape.
- **A shared test file to know about.** JOURNEY-BUDGET, in the second batch, gives the resting-key
  journey case in `tests/app/browser/integration.test.ts` a timeout of the `CASCADE_KEYS` table's
  length times a per-key constant in `tests/setup.ts`; the formatter re-indents that case's body, so
  a hunk of yours inside it merges by re-applying the edit and running the formatter.
- **Asked of you:** move your marker in `engine/plan.md` at your next boundary.

**Marker.** Read 2026-09-24: Veneer `origin/main` `{head}`; scaffold `origin/main` `{scaffold}`, merged
into this session's branch. Your `engine/plan.md` note reads Veneer `86b3d46` and names J-ISINSTANCE
(landed, `a165ad0f` in scaffold) and then W2 in worktrees under `veneer/tmp/worktrees/`.

**In flight (this session).** BARE-BUTTON's round-1 audit (`units/cb-audit-claims.md`: `analyst` on
Astra, `reviewer` on Opus 5.5, `checker`). The second batch's landings. FADE and LEDGER are briefed
(`units/b-cross-cf-brief.md`, `units/b-cross-cl-brief.md`) and dispatch from the OFFCANVAS landing;
RAMP-DOWN (`units/b-modal-rd-brief.md`) and the accordion and navbar `background-size` readings
(D45) dispatch from the same head.

**Pending shared changes.** In the second batch: rows in `tests/setup.ts`, case tables in
`tests/setupStyles.ts`, the `listed` literal and the order case in `tests/conformance.test.ts`, the
showcase sections in `app/browser/`, the Tailwind profiles proof and fixtures, the `CASCADE_KEY_TIMEOUT`
constant, and the guide's § Compatibility rows, including the Offcanvas `plugin` row with
`Owner: J-ENGINE.`

"""
p.write_text(s[:start] + section + s[end:])
print('marker rewritten at', head)
