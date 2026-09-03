# Audit verdict — unit followon-budget (2026-09-03)

Lane: `checker` on Claude Sonnet, one lane, clean context, read-only, against `briefs/followon/budget-audit-brief.md`. The objective and subjective lanes did not run: the unit is six fully specified prose replacements the brief quotes verbatim (old text and new text), so the round's whole judgment is mechanical — presence, scope, the writing sweep, parity of the mirror list, the single home of the `id` default, and line length — and the checker is the lane that rules those. Writer: `builder` on Claude Sonnet, stopped after its edits and gate runs (see the session ledger); the Orchestrator wrote the evidence files and the report from the tree it left.

Claims 1 to 6: every one ruled met with `file:line` evidence (the checker wrote `MET` where the value set names `CONFIRMED`; read as `CONFIRMED`). Sweeps recorded: `below|above|currently|should` and `first|second|third|fourth|fifth` at word boundary over the four owned files, no hit. The mirror list in `guides/README.md` § Dependency reference names `contract.md`, `guide.md`, `test.md`, `scaffold.md`, and `probe.md`, which is every mirror the folder carries beside `budget.md` and `README.md`. No findings outside the claims.

Terminal line returned: `VERDICT: PASS`

Orchestrator's ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`, format:check, lint:check, check, build, test), recorded in the landing commit.

Terminal: `VERDICT: PASS`
