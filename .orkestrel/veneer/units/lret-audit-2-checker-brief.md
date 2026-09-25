# LEDGER-RETUNE audit round 2 — checker

## Role and engine

`checker` on Sonnet, read-only, in a clean context. Perform the assignment directly and spawn nothing; edit nothing.

## Objective

Rule claims 4, 5, and 9 of `/home/user/scaffold/.orkestrel/veneer/units/lret-audit-2-claims.md` mechanically, over the
worktree `/home/user/veneer-lret` at `23b659b`.

## Context

- The gate's drift output after the ruling: `/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/r2/lret-conformance-drift3.log.txt`.
- The final gate run: `lret-instruments/r2/lret-conformance.log.txt`; every other gate log beside it.
- The diffs: `lret-instruments/r2/lret-2.diff` (round 2 alone) and `lret-instruments/r2/lret-2-full.diff` (the unit);
  the status `lret-instruments/r2/lret-2-status.txt`; the report `ledger-retune-report-3.md`; the briefs
  `ledger-retune-brief-2.md` (§ Scope) and `ledger-retune-brief-3.md` (§ Scope, added to round 2's).
- Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity;
  `/home/user/scaffold/.claude/rules/writing.md` § Substitutions.

## Output

Per-check verdicts (CONFIRMED or BROKEN) with `file:line` evidence:
1. Each row the drift3 log prints with a changed member appears in `guides/veneer.md` § Departures with the member the
   final gate reads, and the three verdict rows (`.btn` `--bs-btn-font-size`, `.accordion`
   `--bs-accordion-btn-padding-y`, `theme` `--bs-primary`) read `retuned`, `tokenized`, and `retuned`.
2. No `normalizeDeclaration` (as distinct from `normalizeDeclarationValue`), no `matchesDarkScope`, and no
   `ContextElement` `sibling` field remains in `tests/`, `guides/veneer.md`, or `src/`; search each and name every hit.
3. The export-list cases in `tests/setupServer.test.ts` and `tests/setupStyles.test.ts` name `PARENT_VALUES`,
   `RESOLVER_SETTINGS`, `UNVARIED_FUNCTIONS`, `extractMatchedCompound`, and `inferScopeMode`, and none of the retired
   names; `ResolverSetting` is declared in the file the repository keeps its setup types in (name the file).
4. The `--vn-shadow-inset` declaration in `src/styles/_tokens.scss` equals its § Reference map cell in
   `guides/veneer.md` character for character, and `--vn-shadow-1`, `-2`, and `-3` are written in rem.
5. The status names only files the two briefs' Scope sections own, and the only `src/**` hunk in the full diff is the
   `--vn-shadow-inset` declaration.
6. Each gate log the report's gate table names ends with `exit=0`.
7. The guide hunks in `lret-2.diff` contain no term the substitution table in `writing.md` bans unconditionally; name
   the pattern and the hunks the sweep covered, and rule each hit in a row with a permitted sense.

End with one line: `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
