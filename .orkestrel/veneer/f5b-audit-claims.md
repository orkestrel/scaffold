# Audit claims — F5b ACCOUNTING-LEDGER in `@orkestrel/veneer` (worktree `/home/user/veneer-f5b` over `07fc3c3`, 2026-09-22)

## Subject

The F5b unit, written by `opus` on Opus 5.5 from `/home/user/veneer-f5b/tmp/units/f5b-brief.md` in its own
worktree from `07fc3c3`: the guide gains a `### Departures` and a `### Additions` ledger keyed like the oracle inventory, `tests/setupServer.ts` gains the readers (`readDepartures`, `readAdditions`), the comparison `collectDepartures` over the unminified compile, and the elements-layer tag reader, `tests/conformance.test.ts` gains the gates that redden on an unrecorded difference, an unrecorded extra name, a stale departure row, a stale addition row, a stale deferral row, and a tag population that departs from `ELEMENT_TAGS`, each proved by a plant; `BOOTSTRAP_RTL_CSS_DIGEST` and the inventory's `rtl` fields are gone (D5); the `_body.scss` `text-align` fallback is gone with its departure row (D2, D6). The unit's report is
`/home/user/scaffold/tmp/audit/f5b-report.md`.

## What this round decides

Whether F5b lands as one commit. A BROKEN claim in code sends the unit to a fix round; a BROKEN claim in prose
alone is corrected by the Orchestrator at landing. The worktree integrates into the main checkout
after this round, so a finding about integration order is outside the claims.

## Already established — do not re-run

- The accounting terrain: `/home/user/scaffold/tmp/audit/f5b-terrain.md` (§ B the guide tables and readers, § D the value-gap instruments, § E the unrecorded sites, § F the inventory shape) and the retained probe `/home/user/scaffold/tmp/audit/value-gap-probe.mjs`.
- The user's rulings D2, D4, D5, D6, D7 (`ROADMAP.md` § Rulings) and the F5d report's finding 2 (the `_body.scss` fallback), carried by this unit with a file grant.

## Review evidence

`/home/user/scaffold/tmp/audit/f5b-audit-evidence.md`: the status output `f5b-status.txt`, the diff
`/home/user/scaffold/tmp/audit/f5b.diff` (against `07fc3c3`), the unit's report, the brief at
`/home/user/veneer-f5b/tmp/units/f5b-brief.md`, the terrain, and the Orchestrator's gate log
`/home/user/scaffold/tmp/audit/f5b-gates.log.txt` when present.

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **The ledger types are exact.** `DepartureRow` (`component`, `selector`, `property`, `condition`, `recorded`, `emitted`, `departure`) and `AdditionRow` (`component`, `name`, `category`, `reason`) are readonly interfaces in `tests/setupServer.ts`; `departure` is exactly `'tokenized' | 'aliased' | 'declared' | 'fallback' | 'dropped'` and `category` exactly `'selector' | 'declaration' | 'property' | 'keyframes'`; no other member was added, or the report names the measured row that needed it.
2. **The readers parse the tables the way `readDeferrals` does.** `readDepartures` and `readAdditions` locate each table by its heading text, reuse the table-reading pattern `readDeferrals` fixes rather than a second parser, and refuse a malformed row; each has an inventory row in `tests/setupServer.test.ts` and a case over a scratch guide string that binds (name the mutation: a swapped column or a dropped cell that the case would catch).
3. **The comparison walks the inventory over the physical compile.** `collectDepartures` compiles `src/styles/index.scss` through `sass` with `style: 'expanded'` (through `compileExpandedCascade` or the existing export the report names), parses with `postcss`, walks every inventory selector of every shipped component, compares each recorded property directly with no logical map, reads the enclosing at-rule as `condition`, returns every value difference and every emitted selector, custom property, and keyframe name the inventory lacks, and reads no `rtl` field.
4. **The gates redden on every drift they name, and each plant binds.** Under one describe in `tests/conformance.test.ts` the cases for an unrecorded difference, a stale departure row, an unrecorded addition, a stale addition row, and a deferral row naming a shipped selector each name the site in their failure message; `tests/setupServer.test.ts` proves each gate with a plant over a scratch guide string and a scratch cascade string. For each, name the mutation (remove the guard, or plant nothing) and say whether the plant case distinguishes it.
5. **The ledger rows are the measured population.** `### Departures` carries one row per difference the comparison reports with the `departure` member that names why; `### Additions` carries every measured extra including the terrain § E sites; `--bs-btn-close-filter` and `--bs-carousel-control-icon-filter` are `fallback` rows with measured values and their sentences left § Bootstrap variables Veneer retains for a pointer at the ledger; every retired token row and every retired or moved deferral is named in the report; § Deferred names is read through a reader with a gate or retired with its two facts carried, and the report says which.
6. **No right-to-left support remains in the conformance proof (D5).** `BOOTSTRAP_RTL_CSS_DIGEST` and every read of it are gone from `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/conformance.test.ts` while the CSS and bundle pins stay; `tests/fixtures/oracle/inventory.json` lost exactly the `rtl` field of every component and nothing else (compare `git show 07fc3c3:tests/fixtures/oracle/inventory.json` against the tree: every removed line is an `rtl` field, no other line changed beyond the formatter's rewrite); the report gives the digest before and after; no script remains under `tmp/probe/`.
7. **The elements layer's tag population binds `ELEMENT_TAGS`.** A reader in `tests/setupServer.ts` returns, for the `elements` layer of the unminified compile, the set of leading type tokens of each compound in each rule's `selector` string and reports a compound it cannot read rather than skipping it; `tests/conformance.test.ts` requires that set to equal the distinct tag column of `ELEMENT_TAGS`; a plant in `tests/setupServer.test.ts` proves the reader binds; the table's doc in `tests/setupStyles.ts` names the binding.
8. **The `_body.scss` fallback is gone with its row.** `src/styles/elements/_body.scss` writes `text-align: var(--bs-body-text-align)` with no fallback, the departure row that recorded the fallback is gone, no other line under `src/styles/**` changed, and the comparison reports no difference for that declaration.
9. **The prose names the readers and gates, and the guide is in parity.** Each sentence introducing a replaced section names the reader that parses it and the gate that reddens on drift; `grep -n 'No reader parses' guides/veneer.md` prints nothing; every existing deferral row is kept unless the gate named it shipped and the report says it moved; `npm run test:guides` passes.
10. **The gate chain is green.** Every `=== <gate> exit=` line in the Orchestrator's gate log reads `exit=0` (UNRESOLVED if the log is absent or lacks `=== gates done` when you read it).
11. **Scope is honest.** `git status --porcelain` lists only `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, `tests/fixtures/oracle/inventory.json`, `src/styles/elements/_body.scss`, and `guides/veneer.md`; the `tests/setupStyles.ts` change is the `ELEMENT_TAGS` doc only; nothing under `app/**`, `configs/**`, `tests/src/**`, or any other fixture changed; no probe remains under `tmp/probe/`; a `ROADMAP.md` change, if any, is a returned patch and not an edit.
12. **Prose holds.** No changed prose line contains a banned term in a banned sense (pattern `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`, case-insensitive), and no count of a growable set is stated as a number.
13. **The unit is coherent.** The readers and the comparison each have one job and reuse `readDeferrals`' parsing rather than a second table parser; no helper duplicates an installed `@orkestrel/test`, `@orkestrel/contract`, `postcss`, or `sass` export; the ledger reads as one accounting a developer can extend by adding a row; the `departure` union's members are irreducible modes rather than labels for facts the row already states.

## Unknowns

- What the unit reported as a deviation or an unverified claim of its own; the report says, and a
  lane rules on each.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose and the Orchestrator corrects
it at landing. A BROKEN claim in code (1 to 9) opens a fix round. A lane that returns no verdicts
is a lane that did not run.
