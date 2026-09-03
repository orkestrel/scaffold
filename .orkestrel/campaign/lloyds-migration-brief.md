# Unit M-lloyds — bring lloyds' code to the floor's TypeScript flags, the database 0.0.12 surface, and the placement policy

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment
directly and spawn nothing.

## Objective

Close the two reds the fleet visit reported as lloyds' own: `npm run check` (396 errors under
the floor `tsconfig.json`'s flags plus the `@orkestrel/database` 0.0.12 surface) and the
vendored `policy` sweep (14 placement violations older than the visit), without changing product
behaviour.

## Context

Read first: lloyds' `AGENTS.md` and the rules it names after the visit; the visit report
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\visit-lloyds-report.md` (§ Gates
RED 1 and RED 2 with the excerpts and the per-file list); `.claude/rules/typescript.md` in
scaffold (the flags' intent: `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`,
`verbatimModuleSyntax`, `noUncheckedSideEffectImports`, `noUnusedLocals`, `noUnusedParameters`);
the installed `node_modules/@orkestrel/database/dist/src/core/index.d.ts` for the 0.0.12 surface
(`AggregateFunction` is gone; `RecordingDriverInterface` requires `insert`). The visit is
committed; `git status --porcelain` shows the user's lockfile pair; never stage, restore, or
rewrite it. `tsconfig.json`, `.oxlintrc.json`, `configs/**`, and the vendored tests are
content-owned by scaffold and off-limits. Commit nothing; no `npm install`.

## Work

1. **The flags.** Take the errors by code, largest first (`TS2375` 283, `TS2379` 103 are the
   `exactOptionalPropertyTypes` shape: an optional property assigned `undefined` explicitly).
   Repair at the type: where a property is optional and a caller passes `undefined`, either
   omit the property at the call or widen the declaration to `| undefined` in the type file that
   owns it (`app/core/**/types.ts`), per `AGENTS.md`'s "absence is `undefined`" law; where the
   value is a rated carrier's data, reshape the data, not the reader. `TS2532` (possibly
   undefined under `noUncheckedIndexedAccess`) takes a guard, never an assertion. Record the
   count by code before and after.
2. **The database surface.** Replace `AggregateFunction` with what 0.0.12 exports for the same
   need, and give the recording driver its `insert`; read the installed declaration, never the
   guide alone.
3. **The placement policy.** Move each of the 14 violations to the file the policy names (`data`
   in `app/browser/main.ts`; `constant` in the five carriers' `constants.ts`; `type` and `export`
   in `app/core/raters/compilers.ts` and `helpers.ts`; the five carrier test files' `mirror`
   rows), reading `tests/policy.test.ts`'s rule text for each; update every importer.
4. Run, each read bare: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm test`; every gate green.

## Scope

**Owned.** `app/**`, `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`. **Off-limits.** `package.json`, the lockfile pair, `tsconfig.json`,
`.oxlintrc.json`, `configs/**`, product chrome and behaviour (a type widening is not a behaviour
change; a changed rating result is).

## Output

Write `tmp/units/lloyds-migration-report.md` and return it: the error counts by code before and
after; each database replacement; each placement move with its importers; the gate readings;
`git diff --stat`; `git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when a repair would change a rating result or any rendered behaviour, when a
database replacement has no equivalent in 0.0.12, or when a red sits inside a vendored file.

## Acceptance criteria

1. `npm run check` exits 0; `npm test` exits 0 with the policy sweep green.
2. Every gate green, read bare; no assertion added to silence a type.
