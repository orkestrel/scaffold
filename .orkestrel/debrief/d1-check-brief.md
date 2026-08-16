# Unit D1c — mechanical conformance check of the landed canon refinements

Role: `checker`. Engine: native cheap tier, read-only. Perform the assignment directly
and spawn nothing. You have no Bash: the Orchestrator supplies the diff.

## Subject

The landed canon delta of debrief units D1 and D1b, as 30 numbered mechanical claims.

## Evidence supplied

- The full diff: `.orkestrel/debrief/d1-diff.patch` (range f0a8678..HEAD over `.agents`,
  `.claude`, `.codex`, `CLAUDE.md`).
- The prescriptions: `.orkestrel/debrief/d1-canon-brief.md` (edits 1-28) and
  `.orkestrel/debrief/d1b-harmonize-brief.md` (edits 1-3, four sentence replacements).
- The current files themselves, readable directly.

## Claims — attempt to refute each

1-28. Each of `d1-canon-brief.md`'s numbered edits is present in the landed files with
its prescribed substance (writer-recorded placement variance is allowed; substance
variance is not). One claim per edit number.

29. Every one of `d1b-harmonize-brief.md`'s four sentence replacements is present, and
    the two stale codex.md clauses, the reviewer.md every-build cadence clause, and step 5's
    "their evidence"/"the dispatch-named skill fixes" phrasings no longer exist anywhere in
    the landed files.

30. The diff touches only the 19 owned files of D1 plus the three of D1b (16 overlap),
    and no landed sentence contradicts another landed edit (check specifically: retention now
    has exactly one owner; the falsify default appears consistently in analyst.md,
    reviewer.md, codex.md, analyst.toml, reviewer.toml; the audit-lane trigger reads the same
    in step 5 and the adversarial-pass section).

## Scope

Read-only. Off-limits: `.orkestrel/debrief/ledger.md`, `tmp/**`, `record/**`,
credentials.

## Output

The `orkestrel-falsify` verdict shape: numbered verdicts 1-30, each CONFIRMED or BROKEN
with file evidence (quote the landed line for anything you judge BROKEN or borderline),
findings outside the claims if any, and its single terminal line
(`VERDICT: PASS — …` / `VERDICT: FAIL — …`).
