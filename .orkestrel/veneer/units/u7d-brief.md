# Unit U7d — the conformance contract for a shipped component

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`.

## Objective

Make the conformance proof able to hold a component that ships part of its official CSS: the
presence check keys off two rows per component (`selector` and `variable`) rather than off every
row of the component being `shipped`; the cross-cutting engine rows move to their own component
key; a deferral table under § Styles names each official selector or custom property a component
does not ship with its owning unit, and a reader asserts the deferral set is a subset of the
official set, the shipped set less the deferral set is present in the built cascade, and no
deferred name is present. Four planted controls prove the mechanism red before U7a writes any
CSS, because the shipped path of the presence check has never fired.

## Law

Read from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/tests.md`,
`architecture.md`, `names.md`, `typescript.md`, `documentation.md`. The design that fixes this
unit is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7-design-verdict.md`
(questions 5 and 8) with the planner's report beside it (`units/u7-design-planner-report.md`
§ 5).

## Context

**The tree.** `HEAD` is the U4b landing commit (named in the dispatch message); the working tree
is clean except `tmp/`. `node_modules` carries `@orkestrel/scaffold` 0.0.76, `@orkestrel/markdown`
0.0.15 (declared), and the `@orkestrel/test` 0.0.18 tarball installed `--no-save`.

**Measured facts (read the live files; U4b's briefs 2 and 3 changed them last).**

- `tests/setupConformance.ts` exports `CompatibilityRow` (component, category, obligation, proof,
  status), `readCompatibility` (the guide's `## Compatibility` rows through `@orkestrel/markdown`
  and `@orkestrel/guide`), `readBuiltCascade`, `readOracleInventory` (the pinned copy at
  `tests/fixtures/oracle/inventory.json`: `components.<key>.selectors[].selector` and
  `components.<key>.properties` keys), `ORACLE_BINDINGS` and `scanOracleObligation` (the row
  binding table), `scanOracleFixture`, `recordButtonOracle`, `ORACLE_TIMEOUT`.
- `tests/conformance.test.ts` derives `shipped` as the component keys whose every row is
  `shipped`, fixes `listed` as an explicit list, asserts the two sets equal both ways, and asserts
  every official selector and property of a shipped key present in the built cascade; today both
  sets are empty.
- `guides/veneer.md` § Compatibility carries the table `Component | Kind | Obligation | Proof |
  Status`; Button's rows and the cross-cutting engine rows all carry component `btn` and status
  `accepted`; the reader refuses a table under that heading with a different column set.
  `## Styles` carries `### Files`, `### Scripts`, `### Departures from the workspace rows`.
- The official `btn` inventory spans selectors of other components (the close button, button
  groups, input groups, badges, placeholders, overlay headers); the ledger
  (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/ledger.md`) assigns
  `btn-close`, `btn-group`, and `btn-toolbar` elsewhere.

**Host.** Windows. Your exec shell is PowerShell with script execution disabled: run scripts as
`npm.cmd run <name>`; a `.ps1` file is refused. The `prove` tool is blocked. Write instruments
under `tmp/u7d/`. `git status` warns about a missing global ignore file; the exit code is 0.

**Controls.** `PLANT-SHIPPED`: flip Button's `selector` row to `shipped` with an empty deferral
table; `test:conformance` must red naming a missing selector; restore. `PLANT-DEFERRED-UNKNOWN`:
add a deferral row naming a selector outside the official `btn` set; the reader must red naming
it; restore. `PLANT-DEFERRED-PRESENT`: add a deferral row naming a selector the built cascade
carries (`body` is not in the `btn` set; plant one the inventory carries and the cascade will
carry once U7a lands — with no button CSS shipped today, prove this control against a written
cascade fixture the reader is handed, not against the built file); restore. `PLANT-LISTED`: add a
key to `listed` the guide does not ship; the equality must red; restore. Name no test for a
control.

## Unknowns

- Whether the `selector` and `variable` kinds need a `Proof` other than `—` (they name no oracle
  step). Rule that they carry `—`, and that `scanOracleObligation` skips them as it skips every
  `—` row.

## Scope

**Owned.** `tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/conformance.test.ts`, `tests/setupStyles.ts` (the `BOOTSTRAP_CASCADE_PATH` read alone,
item 7), `guides/veneer.md` (§ Compatibility rows and one new `### Deferred selectors`
subsection under `## Styles`, empty today), the report. **Off-limits.** Everything else,
including `tests/fixtures/oracle/**`, `src/**`, `package.json`.

## Execution

Perform the assignment directly and spawn nothing. Types first, then the readers, then the
proofs, then the guide; run `npm.cmd run test:setup` and `npm.cmd run test:conformance` after
each item.

1. **Two rows per component.** In § Compatibility, Button gains a `selector` row ("Every official
   `.btn` selector the ledger assigns to Button is present in the built cascade; the deferred
   selectors are listed under § Styles") and a `variable` row ("Every official `--bs-btn-*` custom
   property less the deferred ones is declared"), each with `Proof` `—` and `Status` `accepted`.
   The cross-cutting engine rows change their `Component` cell from `btn` to `engine`; the
   section's sentence on the component column states that `engine` names the shared official
   engine and is never shipped as CSS. `readCompatibility` keeps its shape; `CompatibilityRow`'s
   category union gains `selector` and `variable` if it is a union.
2. **The presence check keys off the two rows.** `tests/conformance.test.ts` derives `shipped` as
   the keys whose `selector` row and `variable` row are both `shipped`, keeps `listed` explicit,
   and asserts equality both ways; for each shipped key it asserts every official selector not in
   the deferral set is present in the built cascade (through `normalizeComplexSelector` where the
   cascade reader normalizes), every official property not deferred is declared, and no deferred
   name is present.
3. **The deferral reader.** `readDeferrals` reads `### Deferred selectors` under `## Styles` (a
   table `Name | Owner | Reason`, empty today) through the same parser and section helpers, and
   returns the rows; the presence check asserts every deferred name is a member of the official
   set for its component (refusing an unknown name by name). Add the empty subsection to the
   guide with one sentence stating what a row means and which unit deletes it.
4. **Cases.** In `tests/setupConformance.test.ts`: `readDeferrals` over a written document with
   rows and over the empty subsection; the presence readings over a written cascade fixture with
   a shipped key, a missing selector, a deferred-and-present name, and an unknown deferred name;
   the `engine` rows skipped by the obligation scan; the `selector` and `variable` rows skipped
   as `—` rows. Keep every existing case.
5. **Controls.** Run the four controls red and restore each with a byte comparison for the guide.
6. **The binding table's bounds (the U4b round-2 objective lane,
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u4b-audit-verdict-2.md`
   § Findings carried).** In `tests/setupConformance.ts`: selection reads an exact-obligation
   entry before an entry whose `obligation` is `undefined`, and the table's doc block states
   that order; `OracleBinding` gains an explicit member naming the events an `event` row requires,
   read from the table rather than from the obligation sentence, with the event predicate reading
   that member; `scanOracleFixture` returns its documented `Invalid Button oracle fixture` finding
   for a fixture `JSON.stringify` cannot serialize instead of throwing. Each with a case.
7. **The cascade path.** `readBootstrapCascade` in `tests/setupStyles.ts` resolves the installed
   stylesheet from the same manifest-rooted path the recorder and the digest proof use
   (`resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/css/bootstrap.css')`, or the constant that
   derives it), so a hoisted install cannot split the two readings; `BOOTSTRAP_CASCADE_PATH`
   keeps its browser-visible form if the browser project reads it.
8. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:setup`, `npm.cmd run test:conformance`, `npm.cmd run test:guides`,
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance`; record each command's final lines.

## Output

Write `u7d-report.md` and return its content: the diff per file; the row grammar as
landed; each control's red reading and restore proof; each gate's final lines; `git status
--porcelain`; deviations in the usual shape.

## Deviation contract

Stop and report on: a `## Compatibility` row the scanner refuses after the component change; a
gate red after your own fix inside owned files; a need to edit an off-limits file. Decide,
record, and carry on from: reader names within the prefix table, the deferral table's column
names, case order, wording within the meaning fixed here.

## Acceptance criteria

1. The `selector` and `variable` rows exist `accepted`, the engine rows carry `engine`, and the
   scanner passes every row on the ordinary run.
2. `readDeferrals` and the row-keyed presence check are exported, typed, and cased; the four
   controls reddened and are removed.
3. Every gate in item 6 exits 0.
4. `git status --porcelain` shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
