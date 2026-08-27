# Unit F2-verify — cross-engine verification of the fix round

You hold the objective verification lane for fix round F2, as the engine that wrote none of it
(Opus 5 wrote every commit under review; you are Cursor Grok, the recorded substitution for
GPT-5.6 Sol). You are read-only: edit nothing, spawn nothing.

Read first: `.orkestrel/scaffold/a2-audit-verdict.md` (the round this fixes),
`.orkestrel/scaffold/f2-brief.md` (what was ordered), `.orkestrel/scaffold/f2-report.md` (what
the writer claims), and the actual fix diff at `tmp/units/f2.diff` (F2, the Orchestrator's
serial residue patch in `tests/src/core/helpers.test.ts`, and the regenerated inventory). The
migration probe addendum sits at the end of `.orkestrel/scaffold/probe-sweep.md`.

Verify, attacking rather than confirming — CONFIRMED requires naming the attack you tried:

1. Each A2 finding named in the verdict has its fix in the diff at the location the verdict
   names, and no fixed location still carries the false sentence, the count, the residue line,
   the old catalog-agent opening, or the swept comment words.
2. The extraction is behavior-identical: `listCanonPaths` in `src/server/helpers.ts` carries the
   removed method's exact logic, `#derive` consumes it, the leaf pair stays class-free, and the
   new tests' group-filter control is real.
3. No rewritten sentence introduces a new falsehood: check the canon-destination rule against
   the fetch filter and `filesToHost`, the roles-law scope against what a target actually holds,
   the Limits entry against the shipped verbs, and the wave's migration and dirty-waiver steps
   against `repair`/`overwrite`/the policy inspector.
4. The regenerated `host.json` moved exactly the digests of the staged files the diff edits plus
   the membership digest — nothing else.
5. The exit-code assertions in the new CLI cases bind real values (the pinned offline-catalog
   refusal), not vacuous reads.

Return the `orkestrel-falsify` verdict shape: one numbered verdict per item with evidence,
substantiated findings outside them, and the single terminal line.
