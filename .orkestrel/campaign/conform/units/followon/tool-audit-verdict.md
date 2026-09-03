# Audit verdict — unit followon-tool (2026-09-03)

Lane: `checker` on Claude Sonnet, one lane, clean context, read-only, against `briefs/followon/tool-audit-brief.md`. The objective and subjective lanes did not run: the unit is seven fully specified replacements the brief quotes verbatim (old text and new text), so the round's judgment is mechanical — presence, scope, the qualification present at every home, the writing sweep, the mirror list against the manifest, and line length — and the checker is the lane that rules those. Writer: `builder` on Claude Sonnet, every row applied with the Edit tool and the gates green on its own run.

Claims 1 to 6: every one ruled met with `file:line` evidence (the checker wrote `met` where the value set names `CONFIRMED`; read as `CONFIRMED`). Sweeps recorded: `never a throw|never fails as a whole|never voids the batch|Every call resolves` over `src` and `guides/tool.md` returns only qualified sentences; `below|above|currently|should` over the diff hits removed lines only. No findings outside the claims.

Terminal line returned: `VERDICT: PASS`

Orchestrator's ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`, format:check, lint:check, check, build, test), recorded in the landing commit.

Terminal: `VERDICT: PASS`
