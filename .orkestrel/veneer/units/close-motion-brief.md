# Unit CLOSE-MOTION (`cm`) — one reduced-motion constant and one selector-list split

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-cm` (a worktree
detached at `88684bc`, the session branch tip after B-FORMS-LABEL-CASCADE landed and
folded, with `node_modules` installed and `dist/` built by the Orchestrator). Perform the
assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-cm` for every
command and file, and run every npm and npx command from `/home/user/veneer-cm`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every behavioural proof reads the reduced-motion query through one exported constant, every
selector-list split in the floating and pagination proofs goes through the shared helper, and the
gates in § Acceptance criteria are green.

## Context

**Evidence.** The design verdict `/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`
(rulings R3 and R9 govern this unit) and the terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-terrain-report.md` § 6 (locate every
site by symbol; the terrain's lines predate B-FORMS-LABEL-CASCADE, which rewrote parts of
`tests/setupStyles.ts`). Measure the sites first:

```text
grep -rn "prefers-reduced-motion" tests/ --include=*.ts      every occurrence; classify each as behavioural (a proof's comparison, a matchMedia call, an expected @media condition) or fixture (a parser or reader input in tests/setupServer.ts, tests/setupServer.test.ts, tests/setupStyles.test.ts)
grep -rn "const MOTION" tests/src                             the five module constants (form-range, form-floating, form-select, form-control, form-check proofs) at the terrain's reading
grep -rn "selectorText" tests/src | grep "split("             the split idiom: form-floating.test.ts at four sites and pagination.test.ts at one, at the terrain's reading
grep -n "splitTopLevelList" tests/setupStyles.ts tests/src/styles/components/form-check.test.ts tests/src/styles/components/form-label.test.ts    the shared helper and its precedent call sites
```

`tests/setupStyles.ts` exports no reduced-motion constant today (the terrain), stores the string
`@media (prefers-reduced-motion: reduce)` as expected conditions in its case tables, and mentions
the query in a comment near its head. The oracle inventory `tests/fixtures/oracle/inventory.json`
records the query as data and stays untouched.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,writing}.md`. Skill: none.
Guide: `guides/veneer.md` (report-only; CLOSE-GUIDE owns it).

**Installed primitives.** `@orkestrel/test`; `@orkestrel/contract`. A helper whose job an
installed export does is a defect.

**Host.** Linux, bash, `/home/user/veneer-cm`. Chromium is installed; the scoped styles run is
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`;
`npm run test:setup` runs the setup proofs.

**Measurements.** The greps above, before any edit, recorded in the report.

**Control identifiers.** R3 and R9 are this brief's labels; name a test for what it proves.

**Standing conditions.** The tree is clean at `88684bc`. `tmp/` is gitignored.

## Unknowns

Whether a proof beyond the nine the terrain names holds the literal or the idiom (the greps decide;
own it if it does and say so in the report).

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts` (the sorted export list and one
value pin only), `tests/src/styles/components/{form-range,form-floating,form-select,form-control,form-check,pagination,progress,spinner,icon-link}.test.ts`,
and any further proof the greps name; `tmp/units/cm-report.md`.

**Shared (report-only).** `ROADMAP.md`, `guides/veneer.md`.

**Off-limits.** `tests/setupServer.ts`, `tests/setupServer.test.ts` (their fixtures keep the
literal), `tests/fixtures/**`, `src/**`, `app/**`, `tests/setup.ts`, `tests/setup.test.ts`,
`tests/app/**`, `tests/setupPolicy.ts` and `tests/policy.test.ts` (the paths the `scaffold repair`
command restores), and every other file.

**What asserts the state this change ends.** The setup export case and the value pin (Owned); the
nine proofs (Owned).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash under the host limits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/cm-report.md`: `git diff --stat` and `git status --short`, the before-and-after
greps with each retained occurrence classified, each criterion with its command and result line,
and the mutation run. Return the same content as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Stop and report on a site
that will not route through the constant without changing what a proof asserts, or on a criterion
needing a file outside Owned. Decide, record, and carry on for the constant's doc block wording
and the import order.

## Acceptance criteria

1. `tests/setupStyles.ts` exports `REDUCED_MOTION = '(prefers-reduced-motion: reduce)'` (a
   `const` with a doc block naming the `reduced-motion` mixin it mirrors), and its expected
   `@media` conditions derive from it as `` `@media ${REDUCED_MOTION}` ``; the head comment names
   the constant.
2. No proof under `tests/src` declares a `MOTION` constant or writes the literal: every
   comparison, `collectMediaConditions` expectation, and `matchMedia` call reads `REDUCED_MOTION`;
   `grep -rn "prefers-reduced-motion: reduce" tests/src tests/setupStyles.ts` returns the
   declaration alone, and `grep -rn "const MOTION" tests/src` returns nothing.
3. No `selectorText.split(` remains under `tests/src`: every site in the floating and pagination
   proofs calls `splitTopLevelList` imported from `../../../setupStyles.js` as the check and label
   proofs do.
4. `tests/setupStyles.test.ts`: the sorted export list carries `REDUCED_MOTION`, and one case pins
   its value to `(prefers-reduced-motion: reduce)`.
5. Mutation, recorded with its command and failing count, then the same command green: setting
   the constant to `(prefers-reduced-motion: no-preference)` reddens the value pin and the routed
   condition equalities in the scoped styles run.
6. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
7. `npm run test:setup` and the scoped styles run over every owned proof exit 0.

**Observations, not criteria.** The whole `npm run test:src:styles` run.

## Review evidence

The diff against `88684bc` and the status, this report, the greps, and the mutation run.
