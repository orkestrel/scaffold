# E-IDENTITY design round — the element departures and the table stripe

## Role and engine

One brief, two blind lanes. The subjective lane is `planner` on Opus 5.5; the objective lane is `analyst` on GPT-6
Astra, read-only. Each lane performs the design itself and spawns nothing.

## Objective

A ruling per site on whether Veneer keeps its departure from Bootstrap 5.3.8, reverts to Bootstrap, or scopes the
departure so every Bootstrap-documented pattern still lays out as Bootstrap lays it out; and a design for each change.

## Context

**The campaign.** Veneer is a Bootstrap 5.3.8 baseline. The roadmap's exit criterion 8 reads "Elements identity: the
appearance and motion rulings land as recorded departures". Veneer's `ROADMAP.md` § Carriers rows "Audit claim 11" (the
stripe) and "Audit claim 13" (the `dl`, `blockquote`, `code`, `pre`, `kbd`, `hr`, and `.btn-check` departures) name
E-IDENTITY as the unit that rules them.

**Evidence.** Read these first; they win over any summary here:
- `/home/user/scaffold/.orkestrel/veneer/units/e-identity-terrain-report.md`: per site, Bootstrap's value, Veneer's,
  Elements', the guide rows that record the departure, and the tests that pin Veneer's value.
- `/home/user/scaffold/.orkestrel/veneer/units/e-identity-instruments/dl-row-probe.log.txt` and the probe beside it:
  Bootstrap's horizontal description list (`<dl class="row">` with `.col-sm-3` and `.col-sm-9` children) at 1280px.
  In Bootstrap each `dd` sits beside its `dt` (`dd x=355 y=0`); in Veneer each `dd` wraps under its `dt`
  (`dd x=70 y=29`), because the `dl` element rule's `gap: 8px 16px` applies to the `.row` flex container.
- The Veneer checkout `/home/user/veneer-read` (Veneer `main` `b1d314d`): `src/styles/elements/`,
  `src/styles/components/_table.scss`, `src/styles/components/_quote.scss`, `src/styles/components/_button.scss`,
  `guides/veneer.md` (the departure and addition tables), `tests/src/styles/`. Bootstrap 5.3.8 at
  `/home/user/veneer-read/node_modules/bootstrap/` (`scss/` and `dist/css/bootstrap.css`). Elements at
  `/home/user/elements/src/styles/`.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/styles.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, and `/home/user/scaffold/.claude/rules/quality.md`.

## Unknowns

Which other Bootstrap-documented patterns an element departure breaks. Name each one you suspect with the markup and
the reading that would settle it; the Orchestrator runs the probes in a real browser.

## Scope

Read-only. Write nothing.

## Execution

Perform the design directly and spawn nothing.

1. For each site (the table stripe; `dl`, `dt`, `dd`; `blockquote` and `.blockquote`; `code`, `pre`, `kbd`, `samp`;
   `hr`; `.btn-check`), rule keep, revert, or scope, with the evidence and the Bootstrap pattern each ruling protects.
2. For the horizontal description list, design the change that restores Bootstrap's layout and name its proof: the
   reading, the width, and the mutation the proof must distinguish.
3. List every other Bootstrap-documented pattern you suspect breaks, as probes.
4. Name the implementation units, their owned files, and their acceptance criteria.

## Output

Per site: the ruling, the evidence with `file:line`, and the pattern it protects. Then the horizontal description list
design and its proof, the suspected-breakage probes, and the units. State no count. Under 1500 words.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.

## Acceptance criteria

Every site carries a ruling with evidence; the description list design names its proof and mutation; every suspected
breakage is a runnable probe.
