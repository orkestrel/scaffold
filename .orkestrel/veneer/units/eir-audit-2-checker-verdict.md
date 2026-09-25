LANE: eir-audit-2-checker

**Numbered verdicts**

1. **CONFIRMED — Button group.** The added comment in `/home/user/scaffold/.orkestrel/veneer/units/eir-2.diff:147-149` reads "The children carry the Button family's own radius, so the retune leaves each child's corners where Button put them; their border width reads the retuned `--bs-border-width`, as the overlap does, so the pulled-back child still paints one shared line." This is character-for-character the text `e-id-record-brief-2.md:21-23` prescribes. The retuned reading it describes is the same hunk's `expect(readPixels(second, 'border-left-width')).toBe(3)` (`eir-2.diff:154`), matching the retained `test:src:styles` gate log's all-passed result (`eir-instruments/r2/eir-2-test-src-styles.log.txt:8197-8199`, 115 files, 1435 tests passed).

4. **CONFIRMED — Guide.** `eir-2.diff:43` shows the Button binding table's `--bs-btn-border-width` row now reading `var(--bs-border-width)` (was `var(--vn-border-width)`). `eir-2.diff:27` shows the `--vn-state-stripe` Source cell reading "`bootstrap` — retained `$table-striped-bg-factor`, kept below the table's 7.5% hover and 10% active overlays" — character-for-character the text `e-id-record-brief-2.md:30-32` prescribes.

5. **BROKEN — Scope and gates.** The gate half holds: `test:src:styles` (`eir-instruments/r2/eir-2-test-src-styles.log.txt:8197-8199`, 115/115 files, 1435/1435 tests), `test:conformance` (`eir-instruments/r2/eir-2-test-conformance.log.txt:10-11`, 26/26), and `test:guides` (`eir-instruments/r2/eir-2-test-guides.log.txt:10-11`, 20/20) all report a clean pass with no failed line. But the scope half is false: `eir-2-status.txt:1-6` lists exactly six files (`guides/veneer.md`, `_button.scss`, `_hr.scss`, `_tr.scss`, `button.test.ts`, `hr.test.ts`) — the round-1 file set — while `eir-2.diff` itself contains full hunks for two files the status omits: `tests/src/styles/components/button-group.test.ts` (diff lines 136-155) and `tests/src/styles/elements/tr.test.ts` (diff lines 223-239), both named in the round-2 brief's own scope (`e-id-record-brief-2.md:13-14`). The two evidence artifacts the claim asks to be read against each other disagree about which files changed, so "the status lists only the round-1 files" is false of a status that should, by the diff, list eight files, and the claim as stated cannot be confirmed.

**Round-1 findings closure** (not separately numbered; ruled against the diff)

- Round-1 subjective claim 5 (button-group comment/patch) — CLOSED. Same evidence as claim 1 above.
- Round-1 subjective claim 6 (toggle title/pre-Space assertions) — CLOSED. `eir-2.diff:190-196` adds `input.matches(':focus-visible')` and the `[[0, 0, 0, 3]]` ring assertion after Tab and before Space, and keeps the post-Space reads (`:197-202`), so the title "…keeps the label focus paint" now covers both readings. The mutation log confirms the added pre-Space assertion reddens when `.btn-check:focus-visible + .btn` is removed: `eir-instruments/r2/eir-2-mutation-toggle.log.txt:78-92` shows the assertion at `button.test.ts:395` failing (`expected [ [] ] to deeply equal [ [ +0, +0, +0, 3 ] ]`) under that mutation.
- Objective round-1 finding `button-alias-table` — CLOSED. Same evidence as claim 4 above (`eir-2.diff:43`).
- Subjective F1 (stale guide binding, same defect as `button-alias-table`) — CLOSED, same evidence.
- Subjective F2 (stripe row form/vocabulary) — CLOSED. `eir-2.diff:27` replaces the campaign-vocabulary text with the sibling-row form (backticked origin, em dash, reason), matching the reviewer's suggested fix verbatim.

**Findings fitting no claim**

- None substantiated beyond claim 5's own evidence. The `eir-2-mutation-tr.log.txt` mutation log (`eir-instruments/r2/eir-2-mutation-tr.log.txt:77-90`) correctly reddens the added `tr.test.ts` case, corroborating claim 3 of the round-2 claims file, which this brief does not assign to the checker; no separate outside-claims finding is raised from it.

**Attacked and held**

- Claim 1's comment text and claim 4's two guide cells were checked character-for-character against the brief's quoted text and hold exactly.
- The gate exit lines for `test:src:styles`, `test:conformance`, and `test:guides` were read at their tail (not merely their invocation header) and each shows a clean pass with no `FAIL` line, which is the part of claim 5 that survives.

VERDICT: FAIL 5; outside the claims: none
