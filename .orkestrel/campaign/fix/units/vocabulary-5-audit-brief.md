# Audit vocabulary-5 — falsify the round-5 text of the build*/create*/*Of lines

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane in a clean context (Sol dark; the text was
ruled by the Orchestrator and transcribed by a Sonnet builder; attack the ruling). Read-only.

## Subject

- Diff: `/home/user/scaffold/tmp/units/breaking/vocabulary-5.diff`.
- File after the change: `/home/user/scaffold/.claude/rules/names.md` `:91-104` and § Fixed
  derivation/construction forms.
- Placement law: `/home/user/scaffold/.claude/rules/architecture.md` § Kind purity (`:55-95`).
- Prior rounds and the Orchestrator's rulings: `/home/user/scaffold/.orkestrel/campaign/fix/units/vocabulary-audit-verdict.md`
  § Round 4. That ruling closes the "`entity` is defined nowhere" objection as a finding for the
  next change against `architecture.md`; a verdict that turns only on that objection is
  NOT-EVIDENCED for this round, not BROKEN.
- Exemplars with their § Kind purity placement, pinned in `/home/user/scaffold/.orkestrel/campaign/fix/rulings.json`:
  factories in `factories.ts` — `createCaptureResult` (key `console`), `createRestoredSession`
  (key `middleware`), reason's `create{Entity}` constructors (key `reason`); helpers in
  `helpers.ts` — `buildWorksheet`, `buildLineResult` (key `rater`), `buildProgramDefinition`
  (key `program`), `buildELFNoteHeader` (key `sea`); combinators — `arrayOf`, `boundsOf`
  (line 173's own examples).

## Claims

1. `build*` and `*Of` are disjoint in the text: line 96 negates "named for its constituents" and
   line 173 requires it, so `buildWorksheet` matches only line 96 and `arrayOf` only line 173.
2. Line 172 (`create*`) carries no discriminator of its own and points to § Kind purity for what
   a factory is and where it lives; line 96 excludes a factory by pointer, not by gloss; no line
   in `names.md` states where a `create*` or `build*` function lives.
3. The new first bullet of § Fixed derivation/construction forms (line 169) states that a form's
   contract binds a new name and that § Kind purity names the retained exceptions, naming
   `createWriteDirectory` and `isVacant`; it contradicts nothing in `architecture.md:65-70`, and it
   resolves the tension between line 170 (`is*`) and the retained `isVacant`.
4. Given § Kind purity's placement, each pinned factory takes `create*`, each pinned helper
   assembler takes `build*`, and each combinator takes `*Of`, with no exemplar matching two lines.
5. The changed and added lines are directives; none states a count, persuades, uses `should`, or
   carries a pronoun that can attach to two referents.
6. The diff touches only line 96, the inserted bullet, and the `create*` and `*Of` lines of the
   one file.

## Output

Per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, NOT-EVIDENCED) with evidence, then one
terminal line `PASS` or `FAIL <claims>`. No process diary.
