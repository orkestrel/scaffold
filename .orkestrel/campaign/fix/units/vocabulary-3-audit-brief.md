# Audit vocabulary-3 — falsify the build*/create* boundary fix

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane in a clean context. The writer was Opus 5;
the Sol bench is dark; attack the half your engine wrote hardest. Read-only.

## Subject

- Diff: `/home/user/scaffold/tmp/units/breaking/vocabulary-3.diff`.
- Report: `/home/user/scaffold/tmp/units/breaking/vocabulary-3-report.md`.
- Brief: `/home/user/scaffold/tmp/units/breaking/vocabulary-3-brief.md` (its Ruling paragraph is
  the axis).
- File after the change: `/home/user/scaffold/.claude/rules/names.md` § Standalone helpers
  (`:91-104`) and § Fixed derivation/construction forms (`:167-175`); also
  `/home/user/scaffold/.claude/rules/architecture.md` § Kind purity for the `factories.ts` gate.
- Exemplars, pinned: `buildWorksheet`, `buildLineResult` (rater; `/home/user/scaffold/.orkestrel/campaign/fix/rulings.json` key `rater`), `createFactor` (reason; key `reason`, "every bare-noun value constructor becomes `create{Entity}` in `factories.ts`"), `buildProgramDefinition` (program; key `program`), `buildELFNoteHeader` (sea; key `sea`), `createCaptureResult` (console; key `console`), `createRestoredSession` (middleware; key `middleware`).

## Claims

1. From lines 96, 171, and 172 alone, each pinned exemplar lands on exactly one prefix: the
   `build*` ones on line 96, the `create*` ones on line 171, and none on `*Of`. Name any exemplar
   the text leaves matching two lines or none.
2. Lines 96 and 171 each state their own contract once and refer to the other by section name
   without restating it; line 172 no longer uses the word `builder`.
3. Naming `helpers.ts` on line 96 and `factories.ts` on line 171 creates no second home for a
   placement rule that `architecture.md` already states, and contradicts nothing there.
4. The three changed lines are directives; no changed line states a count, persuades, or uses
   `should`.
5. The diff touches only lines 96, 171, and 172 of the one file.

## Output

Per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, NOT-EVIDENCED) with evidence, then one
terminal line `PASS` or `FAIL <claims>`. No process diary.
