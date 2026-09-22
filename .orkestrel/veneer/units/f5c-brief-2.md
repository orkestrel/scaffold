# Unit F5c TOKENS-TRUTH — successor brief 2 (the fix round)

Supersedes the F5c run from `f5c-brief.md`. What changed and why: the F5c audit round (analyst on
Astra, thread `01a0ca6a-bf79-79f2-b094-290e1965c884`; checker on Sonnet; reviewer on Opus) found
the reference-map reader and its value gate able to pass while a cell is wrong, at three seams the
original brief did not name. The obligations below close those seams; everything else the first run
landed stays as it is.

## Role and engine

`opus` on Opus (the `opus` alias; served `claude-opus-5`), the sole writer in the F5c worktree
`/home/user/veneer-f5c` (detached at `07fc3c3` plus the F5c unit's writes and the Orchestrator's
integration of the obligation-4 patch set, all uncommitted), reached as a native subagent. Perform
the assignment directly and spawn nothing. Do not commit, push, install, or run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Objective

Make the § Reference map value gate fail on any wrong cell: a range with an undeclared endpoint is
refused rather than dropped, every cell that states a value is compared (no row reads `undefined`
for a mode that has a value), percentages compare at six significant digits as the guide states, and
the cells the first run reclassified as descriptions either become machine-readable values or are
compared as the text they are.

## Context

**Evidence.** `/home/user/scaffold/tmp/audit/f5c-audit-analyst-verdict.md`: claim 1 (changing the
size range's endpoint from `--vn-size-8` to the undeclared `--vn-size-9` made `collectRowTokens`
drop the whole range with no failure; `tests/setupStyles.ts:652`, `tests/setupStyles.test.ts:1207`,
`guides/veneer.md:650`); claim 2 (changing the dark subtle-tier cell from `15%` to `16%` left the
reader's output identical because its dark values read `undefined` and the browser case skips them;
`guides/veneer.md:563`, `tests/setupStyles.ts:692`, `:807`, `tests/src/styles/tokens.test.ts:93`;
and `normalizeDeclaration` leaves `12.3456789%` distinct from `12.3457%`); claim 10 (the guide
reclassifies unsupported cell forms as descriptions, so replacing `Menlo` with `Arial` in the short
font-stack cell changed nothing; `guides/veneer.md:495`, `:649`, `tests/setupStyles.ts:834`). The
first run's report `/home/user/scaffold/tmp/audit/f5c-report.md` (§ Obligation 1 and 2 for the
reader's shape and the comparison tiers; § Observations for the rows the reader leaves without a
stated value: the space scale's law rows, the radius and shadow rows, `--vn-border-translucent` in
dark, the `--vn-form-valid` and `--vn-form-invalid` pair, the `--vn-font-sans`, `--vn-font-mono-base`,
and `--vn-font-mono-short` rows).

**Law.** `/home/user/scaffold/AGENTS.md`; `.claude/rules/tests.md`, `typescript.md`, `names.md`,
`documentation.md`, `writing.md`. Skill: none. Guide: `/home/user/veneer-f5c/guides/veneer.md`
§ Tokens and § Reference map.

**Installed primitives.** As the first brief: `@orkestrel/test` (`readRootToken`, `readToken`,
`readValue`, `readRules`, `matchesColor`, `parseCSSColor`), `@orkestrel/contract`. A helper whose job
an installed export does is a defect.

**Host.** Linux, bash, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`; `node_modules` installed. A foreground command is capped at
10 minutes.

**Measurements.** Take before editing, and record in the report: the reader's output over the
current guide (every row with `undefined` in either mode, listed by token), which is the population
obligation 2 closes.

**Control identifiers.** none; name each test for what it proves.

**Standing conditions.** The tree is dirty with the first run's writes; keep every one of them.

## Unknowns

Which descriptive rows can be stated as a value the reader compares (a font stack compares as text;
a scale law such as "each step is the previous times the ratio" is a law rather than a value). Rule
each row: value it, or state its law in a form the reader recognises as a law and the gate asserts
by computing it (for example, read every step of the scale and assert the ratio). Report the ruling
per row.

## Obligations

### Obligation 1 — refuse an undeclared range endpoint

`collectRowTokens` (or the leaf that expands a `through` range) refuses a range whose endpoint is not
in the registry order, with an error naming the endpoint, rather than returning nothing; the scratch
case in `tests/setupStyles.test.ts` asserts the refusal on a scratch map carrying an undeclared
endpoint. Run the case red against the current reader first and record the command and count.

### Obligation 2 — every stated cell compares

For every row the reader returns, both modes carry a value the gate compares; a cell form the reader
cannot read is a refusal (the reader throws naming the token and the cell), never `undefined`. Rewrite
the guide cells the first run left as descriptions so each states its value in a form the reader
parses (the dark subtle-tier cells included), or carries a law the gate computes (see Unknowns). Add
the one-unit mutation control to `tests/setupStyles.test.ts`: a scratch map whose dark cell differs
from the token's declared value by one unit must produce a row the gate would fail; prove it through
the reader's output, and name the case for what it proves.

### Obligation 3 — the stated normalization

The guide's § Reference map comparison paragraph and `normalizeDeclaration` say the same thing:
numbers written in full and millisecond durations in seconds; a percentage compares as its number
written in full. The original brief's "six significant digits" clause is withdrawn; add the case
that pins a percentage comparison (`15%` against `15.0%` equal; `15%` against `16%` not).

### Obligation 5 — the guide's sentences (reviewer F1 to F4)

`/home/user/scaffold/tmp/audit/f5c-audit-reviewer-verdict.md`: the `--vn-link-base` departure
sentence under the Links table points at "§ Departures from Bootstrap records the row", and no such
row exists or will: F5b (landing before you integrate) replaces that section with `### Departures`,
`### Additions`, and `### Outside the ledger` under `## Tokens`, and its comparison reaches no
theme-scope variable, so the canonical link tokens sit outside the measurement. Point the sentence at
`§ Outside the ledger` (F5b's heading, which states that canonical token values sit outside the
measurement and that § Reference map records each one) and at the § Reference map Links row (F1).
Drop the clause claiming the mix reproduces the colour Elements renders; say what
`tests/src/styles/elements/a.test.ts` proves — the `a` tag resolves to the link token in each mode
(F2). State the retained-highlight rule without the `D7` identifier (F3), and give the paragraph its
true reason: a consumer's own Bootstrap markup reads `--bs-highlight-color` and `--bs-highlight-bg`,
which is why the compatibility contract retains them, while no Veneer rule reads them, which is why no
canonical token stands in front of them (F4).

### Obligation 6 — placement and naming (reviewer F5)

Move `PROBE_REFERENCE` under the `tests/setupStyles.ts` section comment that scopes the frozen tables
and markup strings, beside `TABLE_MARKUP`, and rename it for what it holds in the file's own form
(`REFERENCE_MARKUP` or the name the siblings' convention gives a written Markdown source); extend the
readers section's opening comment to name the guide readers as a kind the file carries.

### Obligation 7 — refuse a malformed table and floor the coverage (reviewer R1)

`collectReferenceRows` refuses a table whose keyed or valued column it cannot resolve, the way
`readDeferrals` throws in the same position, rather than `continue`; and the value gate carries a
coverage floor that binds: assert that every § Reference map table under the heading contributed at
least one row (or assert the row count against the table count the reader reports), so renaming a
`Value` column or a subsection heading reddens rather than drops.

### Obligation 8 — the third tier reads the mode's own scope (reviewer R2)

The value gate's declaration-map fallback reads the mode's own scope (`[data-bs-theme='dark']` for
a dark row) rather than `:root` alone.

### Obligation 4 — the value gate reads every row

`tests/src/styles/tokens.test.ts`'s value gate iterates every row with no skip for an `undefined`
mode (after obligation 2 none exists) and fails on a row whose stated value the reader could not
compare. Run it against the corrected guide and report the reading.

## Scope

**Owned.** `tests/setupStyles.ts` (the reader and its leaves), `tests/setupStyles.test.ts`,
`tests/src/styles/tokens.test.ts`, `guides/veneer.md` § Tokens and § Reference map (cells and the
two comparison paragraphs).

**Shared (report-only).** `ROADMAP.md`. **Off-limits.** everything else, `src/**` included.

**What asserts the state this change ends.** The `tests/setupStyles.test.ts` scratch-map cases and
the inventory case; `tests/src/styles/tokens.test.ts` value gate; `tests/guides.test.ts` parity over
§ Tokens.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands and
`node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>`; a probe under `tmp/probe/`,
deleted before you return; no install, no commit, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `./tmp/units/f5c-report-2.md` and return its full content as your final message, nothing else:
the pre-edit `undefined` population; per obligation what changed with the files touched and the
red-then-green readings; the per-row ruling for the descriptive cells; the commands you ran with
exit codes, the gate chain run after your final edit and said to be so; `git status --porcelain`
and `git diff --stat`; every deviation and every claim of your own you flag as unverified. No
process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a row
whose value the guide cannot express in a form the reader parses and whose law the gate cannot
compute; a gate that cannot reach green inside your owned files. Decide, record, and carry on from:
the refusal's exact wording; case titles; the comparison paragraph's wording within the rulings.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the range-refusal case, the malformed-table refusal case, the
   mutation control, and the percentage case present.
3. `npm run test:src:styles` exits 0 with the value gate reading every row.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `grep -n 'Departures from Bootstrap records\|D7 keeps\|reproduces the color Elements' guides/veneer.md` prints nothing.
6. `git status --porcelain` lists the first run's files plus nothing outside the owned set.

**Observations, not criteria.** The whole-chain `npm test` reading.

## Review evidence

The Orchestrator takes the actual diff and status after you return; `analyst` on Astra audits the
fix round.
