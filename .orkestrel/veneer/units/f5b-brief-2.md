# Unit F5b ACCOUNTING-LEDGER — successor brief 2 (the fix round)

Supersedes the F5b run from `f5b-brief.md`. What changed and why: the F5b audit round (analyst on
Astra, thread `01a0ca74-89ab-7212-8aa8-dd7179017e04`; checker on Sonnet; reviewer on Opus) found the
comparison blind to emitted sites the inventory does not record, the conformance gates' predicates
unbound by the plants, an empty custom-property value classified as `dropped`, and the tag reader's
pair expansion concealing a lost tag; the Orchestrator's gate chain over the worktree is green on
every gate (`f5b-gates.log.txt`, `=== gates done (18:57:29)`), so claims 9 and 10 are settled and
this round is code and prose only. Everything else the first run landed stays.

## Role and engine

`opus` on Opus (the `opus` alias; served `claude-opus-5`), the sole writer in the F5b worktree
`/home/user/veneer-f5b` (detached at `07fc3c3` plus the F5b unit's writes and the two granted
`_button.scss` edits, uncommitted), reached as a native subagent. Perform the assignment directly
and spawn nothing. Do not commit, push, install, or run `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.

## Objective

Make the ledger's comparison and gates fail on what they exist to catch: an emitted site the
inventory lacks (a condition, a selector, a declaration, a custom property), a gate predicate that
stopped scanning, an empty declaration read as an absence, and a lost elements-layer tag.

## Context

**Evidence.** `/home/user/scaffold/tmp/audit/f5b-audit-analyst-verdict.md`: claim 3 (an emitted
`@media print { .btn { color: blue } }` beside a recorded `.btn { color: red }` reports nothing; an
unassigned `.audit` selector, an added `color` on the existing `.caption-top`, and custom properties
on added selectors are dropped silently; `tests/setupServer.ts` around `collectDepartures`,
`collectCascadeAdditions`, and `attributeSelector`); claim 4 (replacing the deferral gate's predicate
with `() => false` keeps every plant green because the gates filter separately from the scanners
the plants exercise; `tests/conformance.test.ts` the `cascade ledger` describe; `tests/setupServer.test.ts`
the plants); claim 5 (`--bs-btn-close-filter: ;` in the light scopes is recorded `dropped`, defined as
an omitted declaration, and an empty value is indistinguishable from absence in a scratch comparison;
the `:root` addition's reason says Bootstrap leaves smooth scrolling to consumers while
`node_modules/bootstrap/dist/css/bootstrap.css` around line 190 declares the same value under the
same condition); claim 7 (`collectElementTags('@layer elements { summary { color: red } }')` returns
`details` too, and removing every `dt` selector leaves the set unchanged because the pair expansion
restores it); claim 12 (counts "three classes of difference", "Two Elements behaviors" in
`guides/veneer.md`, "seven cells" in `tests/setupServer.ts`); finding F1 (`LEDGER_GUIDE`,
`LEDGER_CASCADE`, `LEDGER_INVENTORY`, `LEDGER_SHIPPED` declared in `tests/setupServer.test.ts` rather
than the setup module). `/home/user/scaffold/tmp/audit/f5b-audit-checker-verdict.md` and
`f5b-audit-reviewer-verdict.md` (copies beside this brief) for the remaining findings. The first
run's report `/home/user/scaffold/tmp/audit/f5b-report.md` for the readers' shape and the refresh
loop.

**Law.** `/home/user/scaffold/AGENTS.md`; `.claude/rules/tests.md` (§ Shared test infrastructure:
reusable fixtures and case data live in setup modules), `typescript.md`, `names.md`,
`architecture.md`, `documentation.md`, `writing.md`. Skill: none. Guide:
`/home/user/veneer-f5b/guides/veneer.md` § Departures, § Additions, § Outside the ledger, § Deferred
selectors, § Compatibility.

**Installed primitives.** As the first brief: `@orkestrel/test`, `@orkestrel/contract`, `postcss`,
`sass`. A helper whose job an installed export does is a defect.

**Host.** Linux, bash, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`; `node_modules` installed; a foreground command is capped at
10 minutes; the comparison takes about 1.6 s and the refresh loop is
`npm run build:src && npm run test:conformance`.

**Measurements.** Take before editing and record: the comparison's reading over the untouched
worktree (green) and the ledger's row counts by member and category; the emitted rules the
comparison cannot attribute (the unattributed set), listed by selector.

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** The tree is dirty with the first run's writes; keep every one of them.
Changing the comparison changes the measured population, so the ledger tables are refreshed through
the loop after every comparison change; the report gives the population before and after, by member
and category, and names every row the refresh added or struck.

## Unknowns

How many rows the site-wise comparison adds; the unit measures and reports. Whether every
unattributed rule can take an owner from inventory membership (a selector the inventory records
under a key that is not shipped stays outside the ledger and is reported as such, never dropped
silently).

## Obligations

### Obligation 1 — the comparison visits emitted sites (analyst 3)

`collectDepartures` and `collectCascadeAdditions` compare emitted selector, property, and condition
sites alongside the recorded ones: an emitted rule under a condition the inventory does not record
for that selector is a departure or an addition, never silence; an added declaration on a recorded
selector is a `declaration` addition; a custom property declared on an added selector is inspected
after the selector is recorded; a rule the comparison cannot attribute is resolved from inventory
membership first (the selector recorded under any key), then class prefix, and an attribution failure
for a rule the inventory records under a shipped key is refused with the selector named. Plants in
`tests/setupServer.test.ts` prove each: the print-condition override, the unassigned selector, the
added declaration on an existing selector, the custom property on an added selector, each red first
against the current comparison (record the command and count).

### Obligation 2 — the gates run the scanners the plants exercise (analyst 4)

Centralize the drift scanners (unrecorded difference, stale departure, unrecorded addition, stale
addition, shipped deferral) as exported functions in `tests/setupServer.ts`; the `cascade ledger`
gates in `tests/conformance.test.ts` call those functions and assert their results empty; the plants
exercise the same functions, so a gate whose predicate stops scanning has a plant that reddens.
Prove it: replace one scanner's body with an empty result in a scratch copy and show the plant red.

### Obligation 3 — an empty value is a value (analyst 5)

Preserve an empty declaration value (`--bs-btn-close-filter: ;`) as the empty string, distinct from
absence (`undefined`), through the comparison and the row serialization (a cell for the empty string
is written unambiguously, in the form the readers already refuse for a blank cell if needed — choose a
form the reader round-trips and state it in the guide's § Departures introduction); classify an
emitted empty value against a recorded non-empty one as `declared`. Refresh the two
`--bs-btn-close-filter` rows. Correct the `:root` addition's reason: Bootstrap declares the same
smooth-scrolling value under the same condition, and the row exists because the comparison attributes
the `reset`-layer rule to `reboot` and the inventory records it under `theme` (say what is true after
obligation 1's attribution change; if the row disappears, strike it).

### Obligation 4 — the tag reader reports selected tags (analyst 7)

`collectElementTags` returns the selected tags without pair expansion; the conformance case
distinguishes the selected set from the fixture relatives `ELEMENT_TAGS` carries for rendering
(`details`, `li`, `option`, and any other relative the table's doc names), asserting equality between
the selected set and the table's column less the declared relatives, and asserting the relatives are
exactly the ones `MANDATED_TAG_PAIRS` requires. Plant: remove every `dt` rule from a scratch cascade
and show the gate red.

### Obligation 5 — fixtures in the setup module (analyst F1)

Move `LEDGER_GUIDE`, `LEDGER_CASCADE`, `LEDGER_INVENTORY`, and `LEDGER_SHIPPED` into
`tests/setupServer.ts` as exported, frozen fixtures with inventory rows, and import them in the
proofs.

### Obligation 6 — the counts (analyst 12)

Remove "three classes of difference" and "Two Elements behaviors" from the guide and "seven cells"
from `tests/setupServer.ts`, naming the members where a sentence needs them.

### Obligation 7 — the reviewer's findings

Read `f5b-audit-reviewer-verdict.md` beside this brief and close every finding it marks BROKEN or
names as a finding that falls inside the owned files; report each by its label with what changed, and
report any it names outside the owned files as a patch.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
`tests/setupStyles.ts` (the `ELEMENT_TAGS` doc and the relatives it names), `guides/veneer.md`
§ Departures, § Additions, § Outside the ledger, § Deferred selectors, and § Compatibility. The
first run's granted files stay as they are.

**Shared (report-only).** `ROADMAP.md`. **Off-limits.** everything else, `src/**` and
`tests/fixtures/**` included.

**What asserts the state this change ends.** `tests/setupServer.test.ts` (the plants and the
inventory case); `tests/conformance.test.ts` (the ledger, deferral, and tag gates); `tests/guides.test.ts`
over the ledger sections.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands and
`node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>`; a probe under `tmp/probe/`,
deleted before you return; no install, no commit, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `./tmp/units/f5b-report-2.md` and return its full content as your final message, nothing else:
the pre-edit measurements; per obligation what changed with the files touched and the red-then-green
readings; the population before and after by member and category with every row added or struck;
the reviewer findings by label; the commands you ran with exit codes, the gate chain run after your
final edit and said to be so; `git status --porcelain` and `git diff --stat`; every deviation and
every claim of your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: an
attribution the inventory cannot resolve for a rule a shipped key needs; a row form the readers
cannot round-trip for the empty value; a gate that cannot reach green inside your owned files.
Decide, record, and carry on from: the scanners' names within `{verb}{Noun}`; case titles; the
introduction sentences' wording within the rulings.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the new plants, the moved fixtures' inventory rows, and the
   scanners' inventory rows present.
3. `npm run build:src && npm run test:conformance` exits 0 over the refreshed ledger.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `grep -n 'three classes of difference\|Two Elements behaviors' guides/veneer.md; grep -n 'seven cells' tests/setupServer.ts` prints nothing.
6. `git status --porcelain` lists the first run's files and nothing outside the owned set.

**Observations, not criteria.** The whole-chain `npm test` reading; the comparison's wall clock.

## Review evidence

The Orchestrator takes the actual diff and status after you return; `analyst` on Astra audits the
fix round.
