# Unit vocabulary-3 — report (2026-09-01)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Fix round for round-2
claim 2 of `vocabulary-audit-verdict.md`. Changed lines in `.claude/rules/names.md`:

- `:96` — `build*` is the assembly step inside the package's own computation that composes parts
  the package computed, sits in `helpers.ts`, and reads no host; a factory a consumer calls is
  `create*` and a combinator named for its constituents is `*Of`, both in § Fixed
  derivation/construction forms.
- `:171` — `create*`: factory in `factories.ts` that a consumer calls to obtain an entity or a
  value it then holds; a package-internal assembly step is `build*` in § Standalone helpers.
- `:172` — `*Of`: combinator named for its constituents, combining them into a
  container/guard/value, with the existing examples.

Deciding lines: `buildWorksheet` and `buildProgramDefinition` → `:96`; `createFactor` → `:171`.
Ancillary decisions recorded by the writer: the shape examples on line 96 were dropped because
the axis moved from result shape to caller; `helpers.ts` named on line 96 creates no second home
(`architecture.md` gates `factories.ts` to `create*` and states placement follows form).
Gates: `format:check` 0, `lint:check` 0, `test:policy` 0 (111 passed). Tree: the one owned file.

Orchestrator: accepted for the round-3 objective lane on the diff.
