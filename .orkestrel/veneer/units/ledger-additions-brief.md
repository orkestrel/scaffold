# Unit LEDGER-ADDITIONS — Additions rows carry values, unattributed rules report, and the shipped keys derive from the inventory

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, reached through the harness's Agent tool. It is the sole writer in
`/home/user/veneer-lad` (branch `unit/lad`, cut from the Veneer session branch at `LANDING_HEAD`, `node_modules`
hardlinked from `/home/user/veneer`). The conformance project launches Chromium from a vitest worker, which a bench
sandbox denies (`.agents/orchestration.md` § Bench laws, rule 5), so the unit runs on the native writing lane. The
harness may name another directory as the primary working directory; start every shell command with
`cd /home/user/veneer-lad &&` and give every file tool an absolute path under it.

## Objective

The cascade ledger records each added declaration's value, reports every emitted rule that no shipped key claims, and
derives the shipped component list from the pinned inventory rather than from a hand-written list. The design verdict's
Rulings 4, 5, and 6 bind.

## Context

**Evidence.** Measured at the landing tree (`/home/user/veneer`, `a29fef7` over `13853b1` over `0865c67`):

- `tests/setupServer.ts` declares `export interface Addition { component; name; condition; category }` and
  `AdditionRow extends Addition { reason }`, with no value member. The `collectAdditions` function begins
  `const component = attributeSelector(...)` then `if (component === undefined) continue` and
  `if (vocabulary === undefined) continue`. For a selector the vocabulary lacks, it pushes one `selector` row and a
  `property` row per custom property the vocabulary lacks. It pushes no row for the other declarations under that
  selector. It skips every name in the canonical `registry`. The `describeAddition` function joins component, name,
  condition, and category.
- `tests/conformance.test.ts`, in the case `carries every shipped component selector, custom property, and recorded
  animation in the built cascade`, holds a hand-written `listed` array and asserts
  `expect(shipped, ...).toEqual(listed)`, where `shipped` is `collectShippedComponents(readCompatibility())`.
- `describe('cascade ledger')` in the same file computes `additions = scanLedgerDrift(measured.additions, recorded,
  describeAddition)` and asserts empty `unrecorded` and `stale` lists.
- `guides/veneer.md` § Tokens › § Additions has the header `| Component | Name | Condition | Category | Reason |`.
- `src/styles/components/_table.scss` writes `.caption-bottom` (search `caption-bottom`).
- The objective design lane executed three collector sweeps at `0865c67` (retained in
  `/home/user/scaffold/.orkestrel/veneer/units/ledger-values-design-analyst-proposal.md`). The unattributed set is
  `.caption-bottom` alone. The inventory keys and the guide's shipped components agree. Planting
  `97px solid currentColor` on the `blockquote` rule's border leaves the addition drift empty.

Re-take each of these readings in the worktree before editing, and report any that differ.

**Law.** `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`; the design
verdict `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md` (Rulings 4, 5, and 6; Rulings 1, 2, 3,
and 7 belong to LEDGER-RETUNE and are out of scope); Veneer's `ROADMAP.md` § Tenets and its exit criterion; the guide
`guides/veneer.md`. No skill applies.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract`. Read their guides' `## Surface` sections in
`/home/user/scaffold/guides/` or their declarations under `node_modules/@orkestrel/`. A helper, guard, or parser whose
job an installed export does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Other worktrees run suites at the same time.

**Measurements.** The unit takes every measurement it relies on in its own worktree.

**Control identifiers.** The plant names in Acceptance are this brief's labels. Name each test for what it proves, not
for the plant that specified it.

**Standing conditions.** `node_modules` is hardlinked. Never run `npm install` or `npm ci`. `npm run format:check`
reads the whole tree, so a red outside the owned files is a standing condition to report, not to fix.

## Unknowns

- How many § Additions rows the value column adds, and which ones. Take the rows from the drift the gate prints after
  the collector change. Never write them by hand from a reading of the partials.
- Whether any shipped rule other than `.caption-bottom` is unattributed at `LANDING_HEAD`. Report the list.

## Scope

**Owned.** `tests/setupServer.ts` (the `Addition` and `AdditionRow` types, `readAdditions`, `collectAdditions`,
`describeAddition`, and a declaration for the unattributed list); `tests/setupServer.test.ts` (the addition cases and
their fixture markup); `tests/conformance.test.ts` (the shipped-components case and `describe('cascade ledger')`);
`guides/veneer.md` (§ Additions: its preamble, header, and rows; the `.caption-bottom` sentence in § Table classes if
it names the record; § Tests entries for the changed cases).

**Shared (report-only).** None.

**Off-limits.** `src/**`, `tests/src/**`, `tests/setupStyles.ts`, `tests/setupBrowser.ts`, `tests/setup.ts`,
`tests/app/**`, `app/**`, `tests/fixtures/oracle/**`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`), `vite.config.ts`, `package.json`, and `ROADMAP.md`. The `Departure` type, `classifyDeparture`,
and `collectValueGaps` belong to LEDGER-RETUNE.

**What asserts the state this change ends.** Every § Additions row (the header gains a column). Every
`setupServer.test.ts` case that builds an `Addition` or asserts a `describeAddition` line (search `category:` and
`describeAddition`). The conformance case asserting `planted.unrecorded` equals
`'form-control | .form-control { letter-spacing } | — | declaration'`. Re-derive the set by running
`npm run test:conformance` and `npx vitest run --project setup tests/setupServer.test.ts` after the type change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src` is
allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Write the failing proofs first. Record each command and its failing count:
   - an `Addition` case whose value differs reports drift;
   - the unattributed list names a planted rule;
   - a planted inventory key is reported unrecorded.
3. Implement Ruling 4.
   - Add a value member to `Addition`, using the name `emitted` that `DepartureRow` uses. Absence is `undefined`, and
     `(empty)` stays distinct from absence through `describeValueCell` and `readValueCell`.
   - Every declaration under an added selector gets its own `declaration` row with its value. The selector row keeps
     name membership with an absent value.
   - A custom property is attributed by selector and condition, not de-duplicated by name across sites.
   - The value joins `describeAddition`.
   - § Additions gains a `Veneer` column, and `readAdditions` reads it.
4. Implement Ruling 5.
   - `collectAdditions`, or a sibling export it composes, returns the rules that no shipped key claims:
     `attributeSelector` answers `undefined`, or the key has no vocabulary.
   - A ledger case expects that list empty.
   - Record `.caption-bottom` as an Additions selector row owned by `table` in the `components` layer, with its
     `caption-side: bottom` declaration row. Record any further unattributed rule the same way, or stop and report it
     if no owner is evident from its partial.
   - The keyframes refusal stays a throw.
5. Implement Ruling 6.
   - Delete the `listed` array.
   - Compare the sorted `Object.keys(readOracleInventory().components)` with the shipped components through
     `scanLedgerDrift`, expecting empty `unrecorded` and `stale` lists.
6. Regenerate the § Additions rows from the drift lines the gate prints, and run the proofs green.
7. Run the plants in Acceptance and log each to `tmp/units/lad-plant-<name>.log.txt`. Restore each byte-identically,
   and record the restoring `git diff --stat` reading.
8. Run each gate named in Acceptance and log it to `tmp/units/lad-<gate>.log.txt`, with `echo "exit=$?"` appended.

## Output

Write `tmp/units/lad-report.md` and return the same text. It holds:

- the Evidence re-readings;
- the Unknowns' answers;
- the changes, by symbol;
- the failing-first and green readings, with commands and counts;
- the plant table (plant, command, failing assertion, restored);
- the gate table;
- `tmp/units/lad.diff` (`git diff LANDING_HEAD`) and `tmp/units/lad-status.txt` (`git status --short`).

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.

- **Stop and report** when:
  - a change needs a file outside Owned;
  - an unattributed rule has no evident owner;
  - the inventory comparison is not empty at the base;
  - a gate reads red outside the change's reach.
- **Settle yourself:** member and helper names under `.claude/rules/names.md`, case titles, the column's position
  beside `Condition`, and the preamble wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. `npx vitest run --project setup tests/setupServer.test.ts` passes with the new addition cases.
3. The blockquote border plant (`border-left: 97px solid currentColor` in place of
   `var(--vn-space-2) solid currentColor` in `src/styles/elements/_blockquote.scss`) makes `npm run test:conformance` fail with an assertion naming the `blockquote` row, both
   unrecorded and stale.
4. A planted `@layer components { .audit-unrecorded { color: red } }` rule in a partial makes the unattributed case fail
   with an assertion naming `.audit-unrecorded`. The unplanted cascade lists nothing.
5. A planted inventory key (an in-memory copy with an extra `audit-key` component, driven through the same scan in
   `setupServer.test.ts`) is reported as `['audit-key']` unrecorded, and the real inventory reports empty lists.
6. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run format:check` over the whole tree. The Orchestrator runs the authoritative
chain at landing.

## Review evidence

The unit's diff (`tmp/units/lad.diff`), its status output, the plant logs, and the gate logs. The audit runs `analyst`
on GPT-6 Astra (objective lane) and `reviewer` on Opus 5.5 (subjective lane), with `checker` on Sonnet for guide-row
parity.
