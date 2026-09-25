# Unit LEDGER-ADDITIONS round 2 — attribution reads the subject inside `:where()` and `:is()`, and the owner rows shrink to what measurement cannot place

Successor to `ledger-additions-brief.md`. What changed: the audit (`lad-audit-verdict.md`) confirmed Rulings 4 to 6 and
the plants. It carries claim 4 (the probe's unwrapped-selector equivalence is false for `button.page-link`), claim 6
(hand-seeded owner cells, and no retained table run), F1, F2, R2, and R3. This round also owns § Outside the ledger's
reset paragraph, which round 1 returned as a report-only patch.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-lad`, which holds round 1
uncommitted over Veneer `2376710`. Start every shell command with `cd /home/user/veneer-lad &&` and give every file tool
an absolute path under it. Read `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`; the design
verdict `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md`; and the audit verdict and both lane
verdicts under `/home/user/scaffold/.orkestrel/veneer/units/`. No skill applies.

## Objective

Every emitted rule the class tier can place is attributed by measurement. A recorded row owns only a rule measurement
still leaves unattributed. The § Additions table's generation is retained as an executed record.

## Context

**Evidence.** Measured by the audit lanes:
- `attributeSelector('button.page-link', 'components', recording, shipped)` answers `undefined`, while `.page-link`
  answers `pagination`.
- `collectSelectorClasses` reads no class above depth 0, so the classes inside `:where(button.nav-link)` never reach
  attribution.
- `lad-rows-probe.ts.txt` seeds the owner rows' components by hand.

**Law.**
- `AGENTS.md` "Derive state": never store a fact the code can compute.
- Ruling 5 of the design verdict: row ownership is for a rule with no inventory or prefix owner.
- `.claude/rules/quality.md` § Instruments.

**Installed primitives.** `@orkestrel/test`.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Write every log, backup, probe, and script under your worktree's
`tmp/units/`, and never into the scratchpad.

**Measurements.** Take every reading in this worktree.

**Control identifiers.** F1, F2, R2, and R3 are the audit's labels. Name each test for what it proves.

**Standing conditions.** Round 1's changes stay, apart from the edits below.

## Unknowns

- Which emitted rules the `:where()` and `:is()` reading attributes, and which stay unattributed after it. Measure the
  set and report it.

## Scope

**Owned.** Round 1's files (`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, and
`guides/veneer.md` § Additions, § Table classes, and § Tests), plus `guides/veneer.md` § Outside the ledger (the reset
paragraph and its list item), and `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** `src/**` except during a plant, which is restored byte-identically. `tests/setupStyles.ts` and
`tests/setupStyles.test.ts`, and every other path.

**What asserts the state this change ends.**
- The § Additions owner rows that measurement now attributes.
- The preamble sentences F1 and F2 name.
- The § Outside the ledger paragraph.
- Every `setupServer.test.ts` case that expects `:where()` rules unattributed.

Re-derive the set by running the setup file and `npm run test:conformance` after the change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Execution

Perform the assignment directly and spawn nothing.

1. **R3 sweep first.** List every emitted selector containing `:is(` or `:where(`. For each one, record its
   attribution and departure readings before the change, and log them to `tmp/units/lad-2-sweep-before.log.txt`.
2. **F1.**
   - Attribution reads the classes inside a `:where()` or `:is()` argument as the subject's own. It never reads classes
     inside `:not()` or `:has()`.
   - Keep `collectSelectorClasses`' contract for its other callers: add the reading where attribution collects classes,
     or add a sibling export with its own proof.
   - Re-run the sweep, log it to `tmp/units/lad-2-sweep-after.log.txt`, and report every selector whose attribution or
     departure moved other than the reset rules. Stop and report if one moved unexpectedly.
3. **Owner rows.** Delete each owner row that measurement now attributes. Keep a row only for a rule that stays
   unattributed, such as `.caption-bottom` and any reset rule the class tier cannot place. Report each kept row and why
   the class tier cannot place it.
4. **The table as an executed record.** Regenerate § Additions through the gate's own functions with no hand-seeded
   owner. Keep the writer, its input, its output, and its run log under `tmp/units/`, and diff the output against the
   guide table.
5. **Prose.**
   - Correct the § Additions preamble: an owning row's `Component` cell and the `Reason` cell are the cells no
     measurement fixes.
   - Fix F2's clause so it reads one way: "a `declaration` the release omits at a site it writes, or any declaration
     under an added selector".
   - Correct the paragraph that names the `:where()` rules.
   - In § Outside the ledger, remove the reset paragraph and its list item, which the change makes false.
6. **R2.** Add a case that kills a dropped layer clause in `attributeBlock`. Add a case with one custom property
   declared at two selectors, which kills de-duplicating by name.
7. **Plants.** Plant each new behaviour and log each run to `tmp/units/lad-2-plant-<name>.log.txt`:
   - drop the `:where()` reading;
   - read `:not()` classes as the subject's;
   - relabel a kept owner row's component.

   Each must fail with an assertion. Restore byte-identically.
8. **Gates.** Run each gate in Acceptance, logged to `tmp/units/lad-2-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/lad-report-2.md` and return the same text. It holds:
- the sweep before and after;
- the kept owner rows, each with its reason;
- the table regeneration record;
- the plant table and the gate table;
- `tmp/units/lad-2.diff` (`git diff 2376710`) and `tmp/units/lad-2-status.txt`.

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when the sweep shows an unexpected attribution or departure moving, or when a gate reads red outside
  a timeout under load.
- Settle yourself the helper's name and placement under `.claude/rules/names.md`, the case titles, and the prose
  wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts` passes.
3. `npm run test:conformance` passes, and the retained table output equals the guide table.
4. Each plant in Execution step 7 fails with an assertion, per its log.
5. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** The sweep's before and after readings.

## Review evidence

The diff and status, the sweep logs, the table record, the plant logs, and the gate logs. The audit runs `analyst` on
GPT-6 Astra and `reviewer` on Opus 5.5.
