# Unit B-FORMS-CLOSE-TABLES (`bft`) — the rounding fixture's retirement, the range table's per-property map, the shared extraction, and the literal-declaration reading

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bft` (a worktree
detached at `d02bd46`, Veneer `main`, with `node_modules` installed by the Orchestrator). Perform
the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bft` for
every command and file, and run every npm and npx command from `/home/user/veneer-bft`. Do not
commit, push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`,
or `git checkout-index`. Routing note for the record: this unit is objective by work class and runs
on the native lane because `input-group.test.ts` drives Chromium, which the Codex sandbox denies.

## Objective

`INPUT_GROUP_ROUNDING` and every dependency on it are retired and the corner proofs read the
shipped radius; `FORM_RANGE_CASES` carries a property-keyed `reads` map under a `FormRangeCase`
interface and its Node case compares per property through one exported `collectDeclarationReads`
helper that the text-control and input-group Node cases also use; the literal-declaration reading is
taken by a retained probe and pinned by an in-memory conformance case; and the gates in
§ Acceptance criteria are green.

## Context

**Evidence.** The obligations are the `ROADMAP.md` § Carriers rows whose carrier cell names
`B-FORMS-CLOSE` (grep `B-FORMS-CLOSE` in `/home/user/veneer-bft/ROADMAP.md`): the
`INPUT_GROUP_ROUNDING` row (D31), the `FORM_RANGE_CASES` row, the literal-declaration row, and the
fixture doc-block and corner-comment clauses of the round-6 row. The tooltip, cascade-key,
colour-width, and forced-colours rows belong to sibling units and are off-limits here.

The design ruling is `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md`
(R4, R7, R9, R11, R12; read it first). The terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-terrain-report.md` (pointers taken at
`53628aa`; locate each site by symbol). Decisions D31, D39a, D40, and D40a are in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

Sites, from grep at `d02bd46` (locate by symbol; lines are approximate):

```text
tests/setupStyles.ts:4390-4398   INPUT_GROUP_ROUNDING doc block ("The text control and select classes carry no radius of their own in this cascade ...") and the export
tests/setupStyles.ts:3591-3610   FORM_RANGE_CASES remark and rows: `reads: Object.freeze(['--vn-space-12'])` (a string list per selector); no interface
tests/setupStyles.ts:4188        export interface InputGroupCase { selector; reads: Readonly<Record<string, readonly string[]>> }
tests/setupStyles.ts:4810        export interface FormControlCase { selector; condition; evidence; subject; pseudo; state; values; reads }
tests/setupStyles.ts:4855        FORM_CONTROL_CASES remark (the settled voice for a `reads` map keyed by property)
tests/setupStyles.test.ts:83,254 INPUT_GROUP_ROUNDING import and the exports-case entry
tests/setupStyles.test.ts:2587   the freeze case: expect(INPUT_GROUP_ROUNDING.startsWith('@layer elements {'))
tests/setupStyles.test.ts:1796-1850  the range Node case: `written` keyed by selector and condition, joined declarations, `declarations.includes(`var(${name})`)`, the empty-list branch
tests/setupStyles.test.ts:1872-1935  the text-control Node case: the inline per-property `var()` extraction (`properties.set(property, [...value.matchAll(/var\((--[\w-]+)/gu)]...)`) and `Object.fromEntries([...properties].filter(...))`
tests/setupStyles.test.ts:1928,2558  the two inline `reads: Object.fromEntries(...)` sites (text control and input group)
tests/src/styles/components/input-group.test.ts:20,171,204,246  the import and the three scene.load(INPUT_GROUP_ROUNDING) calls
tests/src/styles/components/input-group.test.ts:249  "while the control reads the fixture's until the control family lands."
tests/src/styles/components/form-range.test.ts:116   expect([...entry.reads].filter((name) => !declared.includes(`var(${name})`))).toEqual([]) (consumes the list shape)
tests/setupServer.ts:1242 compileExpandedCascade; :1340 readCascadeBlocks; :2240 describeAddition; :2256 scanLedgerDrift; :2308 collectLedger(cascade, inventory, shipped)
tests/setupServer.test.ts:1898   the `.caption-top { color }` plant case on a fixture cascade (the additions reader's existing negative control)
tests/conformance.test.ts:199    it('records every emitted name the official inventory lacks', () => { expect(additions.unrecorded).toEqual([]) })
src/styles/_mixins.scss:49,59    @mixin input-text and @mixin input-border (`input-border` writes border-radius from --bs-border-radius)
```

The form-control Node case compares its rows against the inventory's keyed rules
(`readOracleInventory().components['form-control'].rules` with `condition`) and looks compiled
blocks up by row, so a compiled block under a condition the inventory never records needs no row
there. The range Node case instead asserts `[...written.keys()].sort()` equal to the inventory's
keyed rules, over every compiled block whose selector starts with `.form-range`; R9 fixes what that
equality must do with a block under a condition the inventory records for no rule of the key.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,writing,architecture,styles}.md`.
Skill: none. Guide: `guides/veneer.md` is shared (see § Scope).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/`, browser and
server entries) and `@orkestrel/contract` (`requireValue`, guards). A helper, guard, wait, recorder,
or deferred whose job an installed export does is a defect; the audit's checker probes the diff for
export names.

**Host.** Linux, bash, `/home/user/veneer-bft`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
as the first command of every shell (the manifest's `devEngines` pin refuses npm 10 with
`EBADDEVENGINES`). Never run `corepack use`. Chromium is installed; `npm run test:src:styles`
drives it. `npm run build:src` compiles the cascade to `dist/`.

**Measurements.** Take the probe in criterion 1 before any edit; its readings are the facts the
remark sentence in criterion 7 states. Read the shipped corner radius from the compiled cascade
(`input-border` writes `border-radius: var(--bs-border-radius)`) before rewriting the corner
expectations.

**Control identifiers.** R4, R7, R9, R11, R12, D31 are this brief's labels. Name a test for what
it proves, never for the label that specified it.

**Standing conditions.** The tree is clean at `d02bd46`. `tests/src/styles/components/form-range.test.ts`
is owned here only for the `reads` consumer at its Node-shape site (around line 116) and the case
that reads it; leave its other cases as they are (the sibling `bff` unit edits that file after this
unit lands).

## Unknowns

- Whether the shipped radius makes every existing corner expectation in `input-group.test.ts` hold
  once the fixture is gone (a corner the group leaves must read the shipped radius, not `7px`).
  Run the proof before and after and report each changed expectation.

## Scope

**Owned.** `tests/setupStyles.ts` (R11 lifts the append-only rule for the `INPUT_GROUP_ROUNDING`
deletion, the `FORM_RANGE_CASES` reshape, its remark, the `FormRangeCase` interface, and one
sentence in the `FORM_CONTROL_CASES` remark), `tests/setupStyles.test.ts`, `tests/setupServer.ts`,
`tests/setupServer.test.ts`, `tests/conformance.test.ts`,
`tests/src/styles/components/input-group.test.ts`,
`tests/src/styles/components/form-range.test.ts` (bounded as above),
`tmp/units/bft-literal-probe.sh`, `tmp/units/bft-literal-probe.log.txt`, `tmp/units/bft-report.md`.

**Shared (report-only).** `guides/veneer.md` (return the rewritten closing paragraph of § Input
group classes, from "The text control and select classes carry no radius…" through the
floating-wrapper sentence, as exact text in the report; the Orchestrator lands it), `ROADMAP.md`,
`src/styles/components/_form-control.scss` (the probe plants one line there and removes it; the
committed file is unchanged), every other `src/**` file, `tests/setup.ts`, `app/**`.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`configs/**`, `package*.json`, `vite.config.ts`, `tsconfig.json` (the paths `scaffold repair`
restores); `src/**` beyond the probe's transient plant; `tests/setup.ts`, `tests/setup.test.ts`,
`tests/app/**` (the sibling `bfs` unit owns them); `tests/src/styles/components/form-control.test.ts`,
`form-select.test.ts`, `form-check.test.ts`, `validation.test.ts`, `tests/src/styles/mixins.test.ts`
(the `bff` unit owns them); `tests/fixtures/**`; every file not named in Owned.

**What asserts the state this change ends.** `tests/setupStyles.ts` (the export and doc block; the
string-list `reads`; Owned); `tests/setupStyles.test.ts` (the exports entry, the freeze case's
`@layer elements` expectations and title, the joined-string range comparison; Owned);
`input-group.test.ts` (the import, the loads, the "until the control family lands" comment;
Owned); `form-range.test.ts` (the list-shaped `reads` consumer; Owned); `guides/veneer.md` (the
"carry no radius of their own" and "plain box" sentences; Shared, carried by the Orchestrator's
integration edit); `FORM_FLOATING_CASES` keeps the joined-string shape (carried by B-FORMS-LABEL;
do not touch it). Search bounds: `grep -rn "INPUT_GROUP_ROUNDING" tests guides app src` and
`grep -rn "reads" tests/src/styles/components/form-range.test.ts tests/setupStyles.test.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive
git. Runtime probes go under `tmp/probe/`; the retained probe script and its log go under
`tmp/units/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bft-report.md` in the worktree: the probe's readings (each command, exit code,
and the result line), the diff summary (`git status --porcelain` and `git diff --stat`), each
acceptance criterion with the exact command and its result line, the exact guide paragraph for the
Orchestrator to land, the unknown's answer, and the claims you flag as weakest. Return the same
content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — where the probe's conformance reading differs from R4's expected line, where a corner
expectation cannot be met from the shipped radius, or where a criterion needs a file outside Owned.
Decide, record, and carry on for the helper's parameter shape, the interface's TSDoc wording, the
case titles, and where the new conformance case sits.

## Acceptance criteria

1. The probe, written to `tmp/units/bft-literal-probe.sh` and run once with its output in
   `tmp/units/bft-literal-probe.log.txt`, before any other edit: record the SHA-256 of
   `src/styles/components/_form-control.scss`; append `letter-spacing: 0.01em;` to the `.form-control`
   rule (a property no `FORM_CONTROL_CASES` row values or reads and no guide Additions row names —
   check both first and choose another property if either names it); `npm run build:src` exits 0;
   `npm run test:setup` exits 0 (the text-control binding case is green with the plant);
   `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-control.test.ts`
   (the scoped form of `npm run test:src:styles`) exits 0; `npm run test:conformance` exits 1
   with `records every emitted name the official inventory lacks` red and the line
   `form-control | .form-control { letter-spacing } | — | declaration` in its output; remove the
   plant; the SHA-256 equals the recorded one; `git status --porcelain src` is empty. The script
   removes the plant on every exit path.
2. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
3. `tests/setupServer.ts` exports `collectDeclarationReads(cascade: string)` (or the narrower
   signature you settle) returning, keyed by selector and condition the way the Node cases key
   (`selector` or `selector condition`), the map of each property to the custom properties its
   declaration reads in written order; `tests/setupServer.test.ts` tests it (a property reading two
   names in order, a property reading none, a reduced-motion twin keyed apart from its resting
   rule). The text-control, input-group, and range Node cases in `tests/setupStyles.test.ts` route
   through it and no inline `matchAll(/var\(` extraction remains there.
4. `INPUT_GROUP_ROUNDING`, its doc block, its import, its `scene.load` calls, its exports-case
   entry, and its freeze expectations are gone; `grep -rn INPUT_GROUP_ROUNDING tests guides app src`
   finds nothing. The freeze case's title drops "and the rounding rule". Each corner case in
   `input-group.test.ts` reads a kept corner as the radius the same element carries outside a group
   (the shipped `--bs-border-radius`, positive) and a squared corner as `0`, and its comments say so;
   the "until the control family lands" sentence is gone.
5. `tests/setupStyles.ts` declares `FormRangeCase` (`selector`, `engine: 'gecko' | 'webkit' |
   undefined`, `condition: string | undefined`, `reads: Readonly<Record<string, readonly string[]>>`)
   with TSDoc in the `FormControlCase` voice; `FORM_RANGE_CASES` is `readonly FormRangeCase[]`,
   frozen, with each row's `reads` keyed by property and the reduced-motion twins as their own rows
   under their condition; its remark states the property-keyed claim in the `FORM_CONTROL_CASES`
   remark's words. The range Node case compares per property (`toEqual` on the map, not
   `includes`), keeps the exact equality of written keys against the inventory's keyed rules, and
   per R9 excludes from that equality a block under a condition the inventory records for no rule of
   the key, with a comment saying the additions ledger holds such a block. `form-range.test.ts`
   reads the map shape.
6. `tests/conformance.test.ts` gains a case that appends one unrecorded literal declaration on
   `.form-control` inside the components layer to an in-memory copy of the real expanded cascade,
   runs `collectLedger` and `scanLedgerDrift` with the real inventory, shipped keys, and guide
   additions, and asserts `unrecorded` equals exactly
   `['form-control | .form-control { <property> } | — | declaration']` while the unmodified cascade
   reports `[]`. The reader is unchanged.
7. The `FORM_CONTROL_CASES` remark gains one sentence: a declaration the row neither values nor
   reads falls outside both maps, and the conformance case
   `records every emitted name the official inventory lacks` reports it as a declaration addition.
8. `npm run test:setup`, `npm run test:conformance`, and
   `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/input-group.test.ts tests/src/styles/components/form-range.test.ts`
   exit 0.

**Observations, not criteria.** The whole `npm run test:src:styles`; `npm test`.

## Review evidence

The actual diff (`git diff`) and `git status --porcelain` from the worktree, the report, the probe
script and its log.
