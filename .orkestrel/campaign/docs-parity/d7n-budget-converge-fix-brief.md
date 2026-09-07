# Brief — `d7n-budget-converge-fix` (slice 2's audit findings on budget)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/budget` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice2-audit-verdict.md`, `rulings.md` § Ruling 12, and the subjective lane's F1, F2, F3, F10 in `d7n-slice2-audit-subjective.md`.

## Items

1. **The opening paragraph (F1).** `guides/budget.md:6` region re-teaches the `consume` mechanism § Surface's "What happens" teaches at `:24`. Rewrite the opening prose to say what a budget handle is and what the package is for, in the pilot's register (`/home/user/fleet/abort/guides/abort.md:7-16`), leaving the mechanism to § Surface; the tagline's clauses are not restated.
2. **`GUIDE_SPEC` (F2).** `tests/guides.test.ts:267` region reads the guide through a repeated string literal; use `GUIDE_SPEC` there, as the pilot does at `/home/user/fleet/abort/tests/guides.test.ts:266`.
3. **The `Shape` idiom (Ruling 12).** The convention sentence above each table carrying `Shape` states the fleet's idiom (bare member names in braces, `?` for optional, call-signature members after `plus`, an alias's own literal with `\|` arms, no member types); rewrite every row that departs from it (`:64` against `:66` per the finding), splitting rows on a pipe not preceded by a backslash and comparing every other cell against the baseline afterwards with `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/budget HEAD guides/budget.md` (paste its output).
4. **See also (F10).** `guides/budget.md:194` region: the link text `../README.md` becomes `README.md`, matching the href.
5. `npm run docs` at zero and `npm run test:guides` green after the items; `npm run test:policy` green (the prose sweep reads the guide).

## Scope

Owned: `guides/budget.md`, `tests/guides.test.ts` (the `GUIDE_SPEC` site). Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check guides/budget.md tests/guides.test.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings guides/budget.md tests/guides.test.ts`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `npm run test:guides`, `npm run test:policy` exit 0.
3. The comparator's output shows no row missing or added and every changed cell in `Shape`.
4. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-budget-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose; cite the tree you leave. No process diary.

## Deviation contract

Stop if a correction needs a file outside the owned pair or if `docs` leaves zero.
