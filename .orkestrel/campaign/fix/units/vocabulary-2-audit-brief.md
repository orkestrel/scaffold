# Audit vocabulary-2 — falsify the fix round on names.md

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane in a clean context. The writer was Opus 5;
the Sol bench is dark, so this lane runs on the writer's engine; attack the half it wrote hardest.
Read-only.

## Subject

- Diff: `/home/user/scaffold/tmp/units/breaking/vocabulary-2.diff`.
- Report: `/home/user/scaffold/tmp/units/breaking/vocabulary-2-report.md`.
- Brief: `/home/user/scaffold/tmp/units/breaking/vocabulary-2-brief.md` (its Findings section is
  the ruling for each line).
- The file after the change: `/home/user/scaffold/.claude/rules/names.md` § Standalone helpers
  (lines 91-104) and § Fixed derivation/construction forms (lines 167-175).
- Law: `/home/user/scaffold/AGENTS.md` § Writing and § Instruction files.

## Claims

1. A message producer whose input is a finding matches only `describe*`, and a text or markup
   producer whose input is not a finding matches only `render*`; no helper in the plan's rulings
   (`qualifier s16-30` `describe*`; `agent s08-28` `renderFencedFile`; `server` and `terminal`
   `render*`/`serialize*` names) matches both.
2. The `build*` line excludes `create*` and `*Of` by naming them, and a reader holding
   `buildWorksheet`, `buildLineResult` (rater), `buildELFNoteHeader` (sea), or `buildNotice`
   (program) lands on `build*` and not on `create*` from the text alone.
3. The `read*` line no longer restates the `parse*` contract; the coercion rule has one home at
   line 170.
4. The four changed lines are directives; no changed line states a count, persuades, or uses
   `should`; the parenthetical examples on the `build*` line disambiguate rather than illustrate.
5. The diff touches only lines 91-104 of the one file (no other hunk, no other file).

## Output

Per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, NOT-EVIDENCED) with evidence, then one
terminal line `PASS` or `FAIL <claims>`. No process diary.
