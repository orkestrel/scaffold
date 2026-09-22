# Unit F5c TOKENS-TRUTH — the § Tokens value gate

## Role and engine

`opus` on native Opus 5.5, the sole writer in the Veneer checkout at `/home/user/veneer`, from the
F5b landing commit on a clean tracked tree (the launch prompt names the commit). Perform the
assignment directly and spawn nothing. Do not commit, push, install a dependency, or run a
destructive command. Do not run `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean`. The Orchestrator lands the work.

## Objective

Make every value the guide's § Tokens reference map states a value the built cascade declares, read
by a gate that reddens on drift, so a token row is a measurement rather than a description; correct
the rows that are stale today; and retire the highlight token pair no consumer reads (D7).

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** The measurements live in
`./tmp/units/f5-terrain-report.md` (§ B the reference-map tables, their columns, and their
disposition cells; § E the `--vn-link-base` site and its stale guide row) and in the verdict
`./tmp/units/veneer-audit-verdict.md` (claims 9, 11, and 21: the stale link rows, the factor
overrides, the filters). Read both first. Where this brief and those records disagree, the records
and the tree win, and you stop and report the disagreement rather than resolving it. The distillate
predates F4, F5a, and F5b: guide line numbers have moved, `CALIBRATED_TIERS` and the oracle value
lists live in `tests/setupStyles.ts`, and `collectTokenNames` and `collectTripletGroups` live
in `tests/setupStyles.ts`. Locate every site by symbol or heading, never by line.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`,
`/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/names.md`,
`/home/user/scaffold/.claude/rules/architecture.md`, `/home/user/scaffold/.claude/rules/styles.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, `/home/user/scaffold/.claude/rules/writing.md`.
Skill: none. Guide: `/home/user/veneer/guides/veneer.md` § Tokens and § Reference map, and
`/home/user/veneer/ROADMAP.md` § Rulings (read, never edit): D7 (no aliasing; the `--bs-*`
variables are the Bootstrap contract and stay; the older highlight token pair goes), D11 is open
(logical properties) and touches nothing here.

**Installed primitives.** `@orkestrel/test` (`/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts`
and `.../browser/index.d.ts`; `readRules`, `findRule`, `readCascade`, `readCensus` are the installed
cascade readers, and the guide `## Surface` in `/home/user/scaffold/guides/test.md` states each),
`@orkestrel/contract`, `postcss` and `sass` under `node_modules`. A helper whose job an installed
export does is a defect. `collectTokenNames` and `collectTripletGroups` in `tests/setupStyles.ts`
read the token registry; `readDeferrals` in `tests/setupServer.ts` is the table-reading
pattern; `compileExpandedCascade` (F5b) is the unminified compile.

**Host.** Linux, bash, Node 22; run every `npm` command with npm 11 on `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(confirm `npm --version` prints `11.19.1`). Chromium 141.0.7390.37 at `/opt/pw-browsers`.
Foreground commands are capped at 10 minutes; `npm run test:src:styles` takes about one minute.

**Measurements.** In the terrain and the verdict. Take none into this brief. The one you take
yourself, first: for every reference-map row, read the declared value of its token from the
unminified compile on `:root` and on `[data-bs-theme='dark']`, and diff it against the row's cell;
record the diff in your report before you change a row.

**Control identifiers.** none. Name every test for what it proves.

**Standing conditions.** The tracked tree is clean at the launch commit; `tmp/` is untracked and
ignored. `tests/setupPolicy.ts` and `tests/policy.test.ts` are restored by `scaffold repair` and
off-limits. `tests/guides.test.ts` reads the guide's table shapes; keep every table's heading order
and column form. The `tokens` proof in `tests/src/styles/tokens.test.ts` already asserts the
`--vn-` scope in both directions and the stripe in the light scope (F4); extend, do not duplicate.

## Unknowns

- Which reference-map rows are stale after F5b's ledger landed. You measure that first.
- Whether the highlight token pair has a consumer outside `src/styles` (search bound: `grep -rn`
  over `src`, `app`, `tests`, `guides` for each token name). Report the search and its result
  before deleting.

## Scope

**Owned.** `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, and `src/styles/_theme.scss`
only for the highlight pair's removal and the link value's declaration if the measured value must
change (record the choice as a departure row, never as an undocumented edit); `tests/setupStyles.ts`
and `tests/setupStyles.test.ts` (the value reader and its inventory row); `tests/src/styles/tokens.test.ts`
(the value gate over the guide tables and the factor-override cases); `guides/veneer.md` § Tokens
and § Reference map (rows corrected, the link rows, the `--vn-link-base` departure sentence, the
highlight pair's rows deleted).

**Shared (report-only).** `ROADMAP.md`; `guides/veneer.md` § Departures (F5b's ledger) — a new
departure returns as an exact patch in the report.

**Off-limits.** every other `src/**` file, `app/**`, `configs/**`, `vite.config.ts`,
`tsconfig.json`, `package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/setup.ts`, `tests/setup.test.ts`,
`tests/setupBrowser.ts`, `tests/setupServer.ts`, `tests/conformance.test.ts`, every other
`tests/src/**` file, `tests/app/**`, `tests/fixtures/**`, `README.md`, `ROADMAP.md`, and every
guide section this brief does not name.

**What asserts the state this change ends.** The `tests/setupStyles.test.ts` inventory case (the
reader joins it); every `tests/src/styles/tokens.test.ts` case that names a highlight token
(search bound: `grep -n 'highlight' tests/src/styles tests/setup*.ts guides/veneer.md src/styles`);
`tests/guides.test.ts` over § Tokens.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands, `grep`, `git
status`, `git diff`, `node` for a probe under `tmp/probe/` (delete every probe before you return),
and `node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>` scoped to files you own.
No install, no commit, no push, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing. The reader first, then the
gate red against the stale rows, then the rows corrected until green, then the highlight removal,
then the gates.

## Obligations

### Obligation 1 — the reference-map reader

Add to `tests/setupStyles.ts` an exported reader, `{verb}{Noun}` form beside `collectTokenNames`,
that parses every § Reference map table whose first column is a token (`Token`, `Role`, `Tier`)
into rows of `token`, `light`, `dark` (a single-value table fills both with its `Value` cell), and
`source`, reusing the table-reading pattern `readDeferrals` fixes (locate each table by its
heading text). Give it an inventory row and a case that reads a scratch table string.

### Obligation 2 — the value gate

In `tests/src/styles/tokens.test.ts`, add the case that, for every row the reader returns, resolves
the token on a mounted root in light and in a nested `[data-bs-theme='dark']` island through the
installed cascade readers, and asserts the resolved value equals the cell's value after the same
normalization the guide states (percentages to six significant digits; `color-mix` text compared
as written where the browser returns the authored expression, else resolved to the computed
colour — state which in the case's doc). Run it red first and record every failing row in the
report; then correct the rows (Obligation 3) until it is green. A `Source` cell of `derived` or a
`Alias` cell of `none` changes nothing about the comparison.

### Obligation 3 — the rows

Correct every stale row to the measured value. Rewrite the Links rows for `--vn-link-base` to the
`color-mix` the cascade declares in each mode, and add the sentence under the Links table that
names it as a departure from Bootstrap's link colour with a pointer to the F5b ledger row (return
the ledger row as a `ROADMAP.md`-style patch for § Departures in the report if the ledger lacks
it). The radius, elevation, and motion override cases the verdict's claim 9 asked for exist in
`tests/src/styles/tokens.test.ts` (the terrain's § B names each by title); confirm each still runs
green after the rows change and report the titles. Add a case only for a factor that lacks one.

### Obligation 4 — the highlight pair

Search for every consumer of the older highlight token pair (bound in **Unknowns**). With no
consumer outside their own declaration, delete the pair from `src/styles/_tokens.scss` and every
mixin, theme, guide row, and proof that names it, and report the deleted set by symbol. With a
consumer, stop and report it.

## Output

Write `./tmp/units/f5c-report.md` and return its full content as your final message, nothing else:
the measured row diff before correction; per obligation what changed with the files touched; the
highlight search and the deleted set; the commands you ran with exit codes, the gate chain run after
your final edit and said to be so; `git status --porcelain` and `git diff --stat`; the `ROADMAP.md`
and ledger patches if any; every deviation and every claim of your own you flag as unverified. No
process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a row
whose measured value the guide cannot express in its column form; a highlight consumer; a table
the reader cannot parse without changing its shape; a gate that cannot reach green inside your
owned files; a required file this brief names that does not resolve. Decide, record, and carry on
from: the reader's exact signature within the rulings, the normalization's placement, case titles,
doc wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the reader in the inventory and its scratch-table case present.
3. `npm run test:src:styles` exits 0 with the value gate and the factor-override cases present.
4. `npm run build:src && npm run test:conformance` exit 0 (the ledger gates still hold after any
   departure row you add).
5. `npm run test:guides` and `npm run test:policy` exit 0.
6. `grep -rn '<HIGHLIGHT_TOKEN>' src app tests guides` prints nothing for each deleted token,
   where `<HIGHLIGHT_TOKEN>` is each name the search in Obligation 4 found.
7. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The whole-chain `npm test` reading; the value gate's wall clock.

## Review evidence

The Orchestrator takes the actual diff and the actual status output after you return.
