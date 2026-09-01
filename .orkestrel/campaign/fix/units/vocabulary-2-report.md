# Unit vocabulary-2 — report (2026-09-01)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Fix round for the
findings in `vocabulary-audit-verdict.md` round 1. Returned report, in substance:

- Owned lines changed (4 insertions, 4 deletions in `.claude/rules/names.md`): `build*` names
  the `create*` and `*Of` exclusions and points to their home section; `read*` keeps "never
  coerces" and refers a coercing helper to `parse*` in § Fixed derivation/construction forms
  without restating `T | undefined`; `describe*` is keyed to a finding as input; `render*`
  excludes a finding as input. The writer records that finding 1 could not close on the
  `describe*` line alone (a finding is still a value), so the `render*` line carries the
  exclusion — inside the owned range, the ruling's own change.
- Line 98 (`resolve*`) and lines 171-172 unchanged, per the brief.
- Gates: `format:check` 0, `lint:check` 0, `test:policy` 0 (111 passed).
- Tree: ` M .claude/rules/names.md` only. Nothing committed, installed, or discarded.

Orchestrator: accepted for the round-2 objective lane on the diff (`vocabulary-2.diff`); the
quoted text in `fix/vocabulary.md` regenerated from the file.
