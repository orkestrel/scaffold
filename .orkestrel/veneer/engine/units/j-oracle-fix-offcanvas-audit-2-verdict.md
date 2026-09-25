# J-ORACLE-FIX-OFFCANVAS round 2 — audit verdict (2026-09-25)

**Subject.** Veneer `dcff520` on `unit/oracle-fix-offcanvas` over `eaf3908`. The claims are `units/j-oracle-fix-offcanvas-audit-claims-2.md`, and the replay is `units/j-oracle-fix-offcanvas-replay-2.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-oracle-fix-offcanvas-audit-2-objective-verdict.md`): `VERDICT: FAIL 4,7`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor.
- **Subjective:** not run. The round adopted the subjective lane's round-1 wording, and the objective lane read each sentence against the code.
- **Checker:** not run.

**Rulings.**
- **Claims 1, 2, 3, 5, and 6: CONFIRMED.**
  - The panel's root detects the focus return in all four placements of round 1's table.
  - The shadow case binds by assertion, and round 1's mutations still bind.
  - The census recordings are byte-identical to round 1's.
- **Claims 4 and 7: FAIL.** A panel that carries its own shadow root, with a return target and another button inside it, defeats the comparison. Suppose focus moves from one button to the other inside that nested root. Then the panel's root reads the panel as its active element before and after, so the press keeps its default action. The shipped prose promises cancellation whenever the hide moves focus. The input reaches the documented surface.

**This is the second round at this seam.** The seam is detecting a focus move across a shadow boundary. Each round fixed the scope it was shown, and the next boundary down still retargets. Round 3 removes the scope instead of deepening it: the press compares the deepest focused element, following each focused element's `shadowRoot.activeElement` down from the panel's root. No nesting then hides a move. The reader is exported and proved in `helpers.ts`, because J-ISOLATION-SHADOW needs the same read for `Isolation`'s trigger fallback.

**Outside the claims.** The objective lane restates both `Isolation` findings: the walk stops at a shadow boundary, and an omitted trigger records the retargeted shadow host. J-ISOLATION-SHADOW carries both already.

**Successor.** Round 3, `units/j-oracle-fix-offcanvas-brief-3.md`.

VERDICT: FAIL 4,7
