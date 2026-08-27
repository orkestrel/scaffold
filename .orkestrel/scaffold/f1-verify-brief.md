# Unit F1-verify — cross-engine verification of the fix round

You hold the objective verification lane for fix round F1, as the engine that wrote none of it
(Opus 5 wrote every commit under review; you are Cursor Grok, the recorded substitution for
GPT-5.6 Sol). You are read-only: edit nothing, spawn nothing.

Read first: `.orkestrel/scaffold/a1-audit-verdict.md` (the round this fixes),
`.orkestrel/scaffold/f1-brief.md` (what was ordered), `.orkestrel/scaffold/f1-report.md` (what
the writer claims), and the actual fix diff at `tmp/units/f1.diff` (F1 plus the regenerated
inventory). The campaign plan is `.orkestrel/scaffold/plan.md`.

Verify, attacking rather than confirming — CONFIRMED requires naming the attack you tried:

1. Each A1 finding named in the verdict has its fix in the diff, at the location the verdict
   names, and no fixed location still carries the false universal, the count, the `now`, the
   coinage, or the inverted rationale.
2. No rewritten sentence introduces a new falsehood: check each against the code it describes —
   the advisory's subtraction (`src/bin/CLI.ts`), the overlay pair (`src/server/helpers.ts`,
   `filesToHost` and the fetch filter), the compiler's pointer emission
   (`src/core/compilers.ts`), and the rule-map inspector (`tests/setupPolicy.ts`) behind the
   wave's new red-gate sentence.
3. The instrument fix is real: the skill-family case's own read now takes the literal canonical
   root, `SKILL_FAMILY_ROOT` still feeds `readSkillFamily`, and the writer's mutation table in
   the F1 report is consistent with the code as shipped.
4. The pointer body's added resolutions spell exactly what `pathToStorage` yields for
   `.agents/skills`, and every `@` in both bodies still sits inside a code span.
5. The regenerated `host.json` moved exactly the digests of the files the diff edits among staged
   paths, plus the membership digest — nothing else.

Return the `orkestrel-falsify` verdict shape: one numbered verdict per item with evidence,
substantiated findings outside them, and the single terminal line.
