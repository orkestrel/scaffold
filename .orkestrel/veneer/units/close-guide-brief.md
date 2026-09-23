# Unit CLOSE-GUIDE (`cg`) — the guide's rules for the showcase order, the customization bound, the barrel, and the stem table, and the whole-guide sweep

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-cg` (a worktree
detached at `BFL_LANDED_SHA`, the session branch tip after B-FORMS-LABEL-CASCADE landed and
folded, with `node_modules` installed and `dist/` built by the Orchestrator). Perform the
assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-cg` for every
command and file, and run every npm and npx command from `/home/user/veneer-cg`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`. You are the sole
guide writer; CLOSE-REGISTRY and CLOSE-MOTION write test files in their own worktrees at the same
time and never the guide.

## Objective

The guide states the showcase order, the customization bound, the forms barrel order, and the
capture stem as rules with one home each, every barrel-neighbour sentence is gone, the stem table
is a gated example table with a registry link, the whole guide passes the token-noun and link
sweep with every hit ruled, the § Styles fragment is repaired, and the gates in § Acceptance
criteria are green.

## Context

**Evidence.** The design verdict `/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`
(rulings R1, R4, R5, R6, R7, and R10 govern this unit; read it first and follow it as written) and
the terrain `/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-terrain-report.md` §§ 1,
2, 3, 5, and 7 (the terrain's forms-section lines predate B-FORMS-LABEL-CASCADE, which moved the
forms sections into the release's order and split the pooled forms table; locate every site by
heading or quoted text). The decisions D17 (the grow-spinner reason stays in § Showcase) and D35
in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the family records
`units/b-passive-family.md` and `units/b-passive-baseline.md`. Measure before editing:

```text
grep -n "region" guides/veneer.md | awk -F: '$1>3860 && $1<3960'      the three § Showcase stretches enumerating regions (terrain § 1)
grep -n "loads after\|loads before\|partial loads\|after the forms partials\|at the barrel's Bootstrap order\|each after the" guides/veneer.md   the barrel-neighbour sentences (terrain § 3's table)
grep -n "every derived tier" guides/veneer.md                            the § Customization claim (terrain § 2)
grep -n "^| Veneer stem" guides/veneer.md                                the § Tests stem table (terrain § 5)
sed -n '150,165p' guides/veneer.md                                       the § Styles fragment: a paragraph on the `!important` utilities is followed by a repeated fragment that starts mid-sentence ("layer, the calendar-picker indicator rule in the `elements` layer, and the color swatch rules…"); the earlier full paragraph is the one to keep, amended with the color swatch rules where the fragment names them
grep -n "it('" tests/src/styles/integration.test.ts                     the recipe proof ("rescales spacing and retunes the primary role family from one unlayered rule" and its siblings)
grep -n "execute\|it('" tests/guides.test.ts                             the package-owned parity file: assertions register inside the anonymous callback passed to the GuideCommand's execute method; `files['guides/veneer.md']` holds the guide's text
grep -n "export function read.*Table\|Table(" tests/setupServer.ts | head   the existing guide-table readers the ledger cases use (reuse one; write no parser)
grep -rn "CAPTURE_SCENARIOS\|CAPTURE_KEYS" tests/setup.ts | head           the registry the stem examples are checked against
```

The showcase's constructor order at `app/browser/Showcase.ts` (the `#sections` list, pinned by
`tests/app/browser/Showcase.test.ts`); the palette reads terrain § 2 tabulates (pagination,
list group, range thumb, check focus and checked, select focus, control focus, progress, and
`.btn-close:focus`'s literal shadow); `src/styles/index.scss` for the barrel (the forms partials in
the release's `_forms.scss` order with validation last, pinned by the `Bootstrap source order`
describe in `tests/conformance.test.ts`).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{documentation,writing,tests,typescript,names}.md`. Skill:
none. Guide: `guides/veneer.md` (owned).

**Installed primitives.** `@orkestrel/guide` (the parity command `tests/guides.test.ts` runs),
`@orkestrel/test`, `@orkestrel/contract`. A helper whose job an installed export does is a defect.

**Host.** Linux, bash, `/home/user/veneer-cg`. Chromium is installed; `npm run test:guides` runs
the parity; `npm run test:conformance` reads the built `dist/`; the scoped styles run is
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/integration.test.ts`.

**Measurements.** The greps above, before any edit, in the report.

**Control identifiers.** R1, R4, R5, R6, R7, R10, D17, D35 are this brief's labels; name a test for
what it proves.

**Standing conditions.** The tree is clean at `BFL_LANDED_SHA`. The `#### <key>` ledger tables and
the § Departures and § Additions rows are machine-read by the conformance equalities: change no
cell of them (the sweep rules a cell as data). The executable fences and the `Summary` cells are
read by the parity proof: change no fence and no summary paragraph's meaning.

## Unknowns

none beyond the sweep's population, which the unit measures and rules.

## Scope

**Owned.** `guides/veneer.md`, `tests/guides.test.ts` (one added case inside the `execute`
callback), `tests/src/styles/integration.test.ts` (one added case), `tmp/units/cg-report.md`,
`tmp/units/cg-sweep.md` (the ruled ledger).

**Shared (report-only).** `ROADMAP.md`, `app/browser/Showcase.ts`, `tests/setup.ts`,
`tests/setupServer.ts`, `src/styles/index.scss`, `tests/conformance.test.ts`.

**Off-limits.** Every other file: `src/**`, `app/**`, every other `tests/**` file (CLOSE-REGISTRY
owns `tests/setup.ts`, `tests/setup.test.ts`, and `tests/app/browser/integration.test.ts`;
CLOSE-MOTION owns `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and the component proofs),
`tests/setupPolicy.ts` and `tests/policy.test.ts` (the paths the `scaffold repair` command
restores), `.claude/rules/writing.md`.

**What asserts the state this change ends.** The parity proof (Owned: its new case), the recipe
proof (Owned: its new case), the conformance equalities (off-limits; they must stay green).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash under the host limits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/cg-report.md`: `git diff --stat` and `git status --short`, each criterion with
its command and result line, the failing-then-green run of each new case, and the exact text
landed for the rule sentences; write `tmp/units/cg-sweep.md`: the sweep ledger, one row per hit
keyed by the quoted text, with its section and its ruling (fixed; permitted as a CSS property,
value, function, or `!important` token; permitted as a noun following a token list; permitted as
a table cell or heading). Return the report's content as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Stop and report on a
quoted site not found, on a rule sentence that would contradict the tree, or on a criterion
needing a file outside Owned. Decide, record, and carry on for the exact wording of each rule
sentence within the meaning the criteria fix, for which facts of the old § Showcase paragraphs
stay, for the example stems chosen, and for the rewrap.

## Acceptance criteria

1. **§ Showcase (R5, D17).** No sentence enumerates the regions or characterizes their order: one
   sentence states that after the Showcase region the regions render in the order the `Showcase`
   class constructs them, one per section, pinned by [the showcase proof](../tests/app/browser/Showcase.test.ts);
   the facts the order does not give stay (what the Content region holds, that a helper key sits
   in its subject's region, the showcase button and the `Delegate` class, the `control` class,
   `main` with no id, the Vue sentence, the grow-spinner paragraph); the "cascade carries …"
   enumeration becomes a pointer to § Compatibility for each shipped key's classes; the
   B-FORMS-LABEL-SHOW paragraph's "follow the Table region" clauses are gone with the rest of the
   enumeration, its second sentence (the Form label region's specimens) staying; a fact dropped
   here that no section states moves into its key's section.
2. **§ Customization (R4).** The universal claim is bounded to every tier and every `--bs-*` alias
   derived from the token you changed; one added sentence states that a component rule painting
   the release's fixed blue reads `--vn-palette-blue`, so a brand retune leaves it, and that the
   component's own section names the rule and the published property that moves it; each
   section terrain § 2 names gains that sentence where it lacks one (the select focus border, the
   control focus border, the close focus shadow); `tests/src/styles/integration.test.ts` gains one
   case that, under the recipe's retune, reads each named paint (the pagination active fill, the
   list-group active fill, the range thumb, the check focus border and checked fill, the select
   and control focus borders, the progress bar) and asserts it keeps its unretuned value; the case
   is red with a named paint pointed at `--vn-color-primary-base` in a scratch copy of the
   partial's compiled output or by an equivalent in-memory mutation you record, and green on the
   tree.
3. **The barrel (R6).** Every "partial loads after/before X", "each after the", "after the forms
   partials", and "at the barrel's Bootstrap order" sentence is gone from the component sections
   (the utility-escape line in § Styles around line 179 stays); § Styles carries one home: the
   forms partials load in the release's `_forms.scss` order with validation last, pinned by the
   `Bootstrap source order` case in [the conformance proof](../tests/conformance.test.ts); a forms
   section that stated a consequence of the order (a validation rule winning a tie) keeps the
   consequence and points at § Styles; the `### Form select classes` sentence "loads after the
   validation partial" is gone with the rest; the grep in § Context returns the § Styles home and
   the utility-escape line alone.
4. **§ Tests stem table (R1).** The stem rule paragraph stays; the table becomes a short example
   table introduced by a sentence naming it as examples, with one resting element frame, one
   driven state, and the page frame; a sentence points at the capture registry
   ([the capture registry](../tests/setup.ts)) as the home of every stem; `tests/guides.test.ts`
   gains one case inside the `execute` callback that reads the table from
   `files['guides/veneer.md']` through an existing table reader, asserts each example stem is one
   of `CAPTURE_SCENARIOS`, and asserts each subject cell names that key's `subject` in
   `CAPTURE_KEYS`; the case is red with an unregistered stem or a wrong subject in a scratch copy
   of the guide (record the run) and green on the tree.
5. **§ Styles fragment (R10).** The repeated mid-sentence fragment is gone and the full paragraph
   it duplicated carries the color swatch rules' `!important` beside the `[hidden]` rule and the
   calendar-picker indicator rule.
6. **The sweep (R7).** Over the whole guide, every code token followed by a comma or a space and a
   lowercase verb (the terrain's pattern) and every prose link not introduced by `see` is a row in
   `tmp/units/cg-sweep.md` with its ruling; every row ruled "fixed" is fixed in the guide; no
   machine-read cell, fence, or summary paragraph changes; the pattern rerun after the edits
   returns only rows ruled permitted.
7. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
8. `npm run test:guides`, `npm run test:conformance`, and the scoped styles run over
   `tests/src/styles/integration.test.ts` exit 0.

**Observations, not criteria.** `npm run test:app` (the Showcase proof) and the journey; the
Orchestrator takes them in the landing chain.

## Review evidence

The diff against `BFL_LANDED_SHA` and the status, this report, the sweep ledger, and the
failing-then-green runs of the two new cases.
