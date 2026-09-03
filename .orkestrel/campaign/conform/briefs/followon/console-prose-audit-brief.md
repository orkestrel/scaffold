# Checker lane — unit console-prose (a follow-on in /home/user/fleet/console)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `console-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/console-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/console-prose-report.md`, evidence `/home/user/work/evidence/conform-console.diff` and `conform-console.status`), on the tip `d9262d0` (the landed conformance unit plus the removal of the moved classes' old paths), uncommitted.

## Claims

1. Every row of the brief is applied in the tree: `README.md:4` and `:83` name their members and `:67` carries no `just`; the `e.g.` titles in `tests/src/browser/helpers.test.ts` read `for example`; no `@src/` specifier survives in any `@example` fence under `src/**` (sweep `@src/` over `src/**` and rule each hit a real import or an example); `src/core/errors.ts`'s `ConsoleError` remark carries no count and no `today`; the two nested functions the report names are extracted to `tests/setupServer.ts` (`createOverloadProbe`) and `tests/setup.ts` (`createStubWriter`), exported and tested in `tests/setupServer.test.ts` and `tests/setup.test.ts`; the two `normalizeVisible` sites import it from `tests/setup.ts`.
3. The substitution sweep `\b(should|simply|easy|just|currently|now|new|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy)\b` (case-insensitive) over `README.md`, `src/**`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) returns no hit in a banned sense; re-run it and rule every hit by sense (`new` as a constructor keyword, `now` as a clock reading, and literal test data are permitted).
5. `tests/guides.test.ts` and `guides/console.md` carry no stale twin of a changed TSDoc sentence, and the guide's method tables and Surface rows are untouched by the diff.
7. `/home/user/work/evidence/conform-console.status` lists only files under `README.md`, `src/**`, the non-vendored `tests/**`, and `guides/console.md`, and the diff carries no hunk outside them; no published symbol is renamed or removed (`src/core/index.ts`, `src/browser/index.ts`, `src/server/index.ts` carry no hunk).
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; each extracted helper keeps the captured state the report describes (read `createOverloadProbe` against its former nested form in the diff); the report's rows match the diff hunk for hunk.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
