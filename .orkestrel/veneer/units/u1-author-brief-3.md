# Unit U1-author — successor brief 3

## What this supersedes

This brief supersedes `u1-author-brief-2.md`, which in turn amends
`u1-author-brief.md`; both stay in place unedited. Read the first brief, then brief 2,
then this one. Every section of those briefs stands except where this file amends them.

## Why a successor

Run 2 (journal `../scaffold/units/u1-author-2.jsonl`, thread
`01a0bd9a-fafb-7030-813c-299678dd895e`) stopped before editing because brief 2 named
`src/browser/guards.ts` for the `isThemeMode` guard, while
`../scaffold/.claude/rules/architecture.md` § Centralized-file pattern places guards in
`*/validators.ts` and `configs/policy.ts` lists `validators.ts` among the function files. The
Orchestrator wrote the wrong file name; the rule stands. Nothing in the checkout changed; it is
clean at `a5de4c4`, and run 2's baseline measurements match brief 2's amended evidence.

## Amendments

1. Everywhere brief 2 names `src/browser/guards.ts`, read `src/browser/validators.ts`. The guard
   `isThemeMode(value: unknown): value is ThemeMode` lives there, its mirror is
   `tests/src/browser/validators.test.ts`, and the owned list in brief 2 § Amended scope carries
   `src/browser/validators.ts` in place of `src/browser/guards.ts`.
2. Place every other declaration by the same table: types in `types.ts`, constants in
   `constants.ts`, factories in `factories.ts`, the class in `src/browser/theme/Theme.ts`, and the
   shell class in `app/browser/showcases/Showcase.ts`. Where a brief names a file the table forbids,
   that is the Orchestrator's error: place the declaration where the table says and record the
   correction in the report instead of stopping. The stop condition in the first brief's deviation
   contract now reads: stop on a rule that forbids the declaration itself, not its file name.
3. The `## Tests` section of `guides/veneer.md` links `../tests/src/browser/theme/Theme.test.ts`,
   `../tests/src/browser/factories.test.ts`, and `../tests/src/browser/validators.test.ts`.

## Output

As brief 2 states: overwrite `u1-author-report.md` with the full report, adding one row
for each placement correction you made under amendment 2.
