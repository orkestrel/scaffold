# Brief — `d7-guide-links-fix` (U4's audit findings: a bare owner before `#` is a member reference)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/guide` from its branch tip after U5 lands (the Orchestrator dispatches this unit only then; confirm `git status --short` is clean and `git log -1` names U5's commit before editing). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-links-audit-verdict.md`, `d7-guide-links-audit-{subjective,objective}.md` (their findings), and `/home/user/scaffold/AGENTS.md` § Design laws (one concept, one term) first.

## What is fixed

- **The `#` rule (objective F1).** In `normalizeSummary` (`src/core/helpers.ts`), the module part before `#` is a package or path token: one that carries `/`, `@`, or `.` (`@scope/pkg#Name`, `my-package#Name`? — no: `my-package` carries none of those, so read the fleet's forms and decide the rule on evidence). The fleet writes `{@link TemplateInterface#fill}` and `{@link #nextId}` as member references (JSDoc's instance-member form), and template's guide cells carry `` `Template#fill` ``; those must render as written (`` `TemplateInterface#fill` ``, `` `#nextId` ``). TSDoc's package-qualified form (`@scope/pkg#Name`, `pkg#Name`) drops the package. Measure first: `grep -rhoE '\{@link [^}]*#[^}]*\}' /home/user/fleet/*/src --include=*.ts | sort | uniq -c` (read-only), and choose the narrowest rule that renders every fleet form as its guide cell writes it — a package token carrying `@` or `/`, or the bare hyphenated form only where a documented package name has it; state the rule in the doc block and the guide bullet. Red-first cases for `{@link Owner#member}` → `` `Owner#member` ``, `{@link #member}` → `` `#member` ``, `{@link @scope/pkg#Name}` → `` `Name` ``, and the inline import form unchanged.
- **The term (objective F2).** Name the `#` form "TSDoc's package-qualified form" in the doc block, the guide bullet, and the test names; cite `https://tsdoc.org/pages/tags/link/` in the report only. Rename the test `drops the package part of a declaration reference target` to speak of the module part, one term throughout (subjective F1).
- **The guide bullet (subjective F2, F3).** `guides/guide.md` compared-form list: the new bullet ends ", outside a located span." as its neighbours do, states one clause in one short line with at most one example, and the worked cases move to the `normalizeSummary` `@example` where they already sit.
- **The description sentence (subjective F4).** `normalizeSummary`'s description: split the trailing modifier so a reader cannot attach it to the label — for example "become the code token of the target text, or of the label where one is written; a target's module part … is dropped first" — and converge the cell through `npm run build` then `npm run docs -- --to guide` and `npx oxfmt --write guides/guide.md`.
- The version stays `0.0.18`; `package.json` and the lockfile untouched.

## Scope

Owned: `src/core/helpers.ts` (`normalizeSummary` and its doc block), `tests/src/core/helpers.test.ts`, `guides/guide.md`. Off-limits: everything else.

## Acceptance criteria, cheapest first

1. The new cases red before the change (the command and failing lines), then green; the existing cases unchanged.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
3. `npm run build` then `npm run docs` exit 0 at a non-zero `rows read` and `disagreements found: 0`.
4. `npm run test:src:core`, `npm run test:guides`, `npm run test:policy` exit 0 (record the summaries).
5. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7-guide-links-fix-report.md`: the measurement, the rule chosen and why, the hunks, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if a fleet form cannot be rendered as its guide cell writes it under any rule that keeps the package-qualified drop, or if a gate outside the owned files goes red.
