# Audit vocabulary-4 — falsify the exact-text fix of the build*/create*/*Of lines

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane in a clean context (Sol dark; the text was
ruled by the Orchestrator and transcribed by a Sonnet builder; attack the ruling). Read-only.

## Subject

- Diff: `/home/user/scaffold/tmp/units/breaking/vocabulary-4.diff`.
- File after the change: `/home/user/scaffold/.claude/rules/names.md` `:91-104` and `:167-175`.
- Placement law: `/home/user/scaffold/.claude/rules/architecture.md` § Kind purity (`:55-95`),
  which states that placement follows what a function is and the name form follows placement,
  that every export of `factories.ts` is `create*`, and that `createWriteDirectory` stays in
  `helpers.ts`.
- The round-3 verdict and its ruling: `/home/user/scaffold/.orkestrel/campaign/fix/units/vocabulary-audit-verdict.md` § Round 3.
- Exemplars with their § Kind purity placement, pinned in `/home/user/scaffold/.orkestrel/campaign/fix/rulings.json`: factories in `factories.ts` — `createCaptureResult` (key `console`), `createRestoredSession` (key `middleware`), reason's `create{Entity}` constructors (key `reason`); helpers in `helpers.ts` — `buildWorksheet`, `buildLineResult` (key `rater`), `buildProgramDefinition` (key `program`), `buildELFNoteHeader` (key `sea`).

## Claims

1. Each of the three lines states its own form once, and no cross-reference on any of them
   restates another line's discriminator: line 96 names `create*` and `*Of` only as pointers,
   line 171 points to § Kind purity, and line 172 carries no reference.
2. No line in `names.md` states where a `create*` or a `build*` function lives; the only placement
   statement is the pointer to `architecture.md` § Kind purity, and nothing on the three lines
   contradicts that section (including its `createWriteDirectory` example).
3. Given § Kind purity's placement of each pinned exemplar (factory or helper), the three lines
   yield exactly one name form for it: `create*` for the factories, `build*` for the assemblers;
   and a helper that is a combinator over constituents lands on `*Of` and not on `build*`.
4. The three changed lines are directives; none states a count, persuades, uses `should`, or
   carries a pronoun that can attach to two referents.
5. The diff touches only lines 96, 171, and 172 of the one file.

## Output

Per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, NOT-EVIDENCED) with evidence, then one
terminal line `PASS` or `FAIL <claims>`. No process diary.
