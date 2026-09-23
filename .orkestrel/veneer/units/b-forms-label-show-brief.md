# Unit B-FORMS-LABEL-SHOW (`bfw`) — the Form label section, its specimens, registration, capture rows, and section proof

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfw` (a worktree
detached at `dd855e9`, the session branch tip after B-FORMS-CLOSE-SPECIMENS landed (B-FORMS-CLOSE-FORCED lands beside this unit and touches no file it owns), with
`node_modules` installed by the Orchestrator). Perform the assignment directly and spawn nothing.
Use absolute paths under `/home/user/veneer-bfw` for every command and file, and run every npm and
npx command from `/home/user/veneer-bfw`. Do not commit, push, install, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`. The sibling unit
B-FORMS-LABEL-CASCADE (`bfl`) writes the partial, the tables, and the guide in its own worktree at
the same time; this worktree carries no `_form-label.scss`, so the label classes render unstyled
here and the journey's declared-property comparison for the label keys is settled by the
Orchestrator's integrated run.

## Objective

The showcase renders a `Form label` region with the stacked, horizontal, horizontal large,
horizontal small, and legend specimens, registered in `Showcase.ts`, `index.ts`, the showcase and
index proofs, `CaptureSubject`, and `CASCADE_KEYS` as resting frames, with `FormControlSection`
constructed ahead of `FormFloatingSection` (D35), and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The design ruling is `/home/user/scaffold/.orkestrel/veneer/b-forms-label-design-verdict.md`
(rulings E and G; read it first). The terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-label-terrain-report.md` (pointers taken at
`e0c901a`; locate each site by symbol). The family records are
`/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md` (ruling 3 naming
`FormLabelSection`), `units/b-passive-family.md`, and `units/b-passive-baseline.md`; decisions D20
and D35 are in `units/decisions-round-2.md`.

The sibling pattern to copy is the floating key's: `app/browser/sections/FormFloatingSection.ts`
(`extends SpecimenSection`, fed by `FORM_FLOATING_COPY` and `FORM_FLOATING_SPECIMENS`), its
registration in `app/browser/Showcase.ts` (the `new FormFloatingSection(this.#main)` line in the
constructor's section list) and `app/browser/index.ts` (`export * from './sections/FormFloatingSection.js'`),
its rows in `tests/app/browser/index.test.ts` (the export literal) and
`tests/app/browser/Showcase.test.ts` (the regions literal and the specimen concatenation), its
`CaptureSubject` members and `CASCADE_KEYS` rows in `tests/setup.ts`, its copy and specimens in
`app/browser/constants.ts` (`FORM_FLOATING_COPY`, `FORM_FLOATING_SPECIMENS`), and its section
proof `tests/app/browser/sections/FormFloatingSection.test.ts`. `INPUT_GROUP_SPECIMENS` derives
its sizes from one list with `.map`; copy that for the two horizontal sizes.
`tests/app/browser/integration.test.ts` lists the declared specimen tables (grep
`FORM_FLOATING_SPECIMENS` there). The journey reads every `CASCADE_KEYS` row on the showcase and
on a lifted copy and compares the declared property; the installed `driveTraversal` walk stops at
the first element it reaches twice.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{browser,tests,names,writing,documentation}.md`. Skill: none.
Guide: shared (see § Scope; `bfl` owns it).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`:
`readName`, `readStates`, `readSpecimen`, `isRendered`, `driveTraversal`) and `@orkestrel/contract`.
A helper whose job an installed export does is a defect; the audit's checker probes the diff.

**Host.** Linux, bash, `/home/user/veneer-bfw`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Never run `corepack use`. Chromium is installed; the journey drives it; a
`CAPTURE=1` run of one variant takes about two minutes and writes frames under `tmp/capture/`.

**Measurements.** Read the label specimens' rendered geometry at the 390-wide variant before
fixing the column split, so each label reads on one line there; report the reading.

**Control identifiers.** Rulings E and G, D20, D35 are this brief's labels. Name a test for what
it proves.

**Standing conditions.** The tree is clean at `dd855e9`. Without the partial, the label
classes carry no rule of their own, so the journey's declared-property comparison for the label
keys reads the same unstyled value on the showcase and the copy and passes vacuously here; the
Orchestrator's integrated run is the one that counts. `tests/setup.test.ts` is shared; stop if it
reddens.

## Unknowns

- Which column split keeps each horizontal label on one line at 390 wide with a control beside it:
  the unit settles it from its measurement and reports it.

## Scope

**Owned.** `app/browser/sections/FormLabelSection.ts` (new), `app/browser/constants.ts` (the new
`FORM_LABEL_COPY` and `FORM_LABEL_SPECIMENS` with their doc blocks), `app/browser/Showcase.ts`,
`app/browser/index.ts`, `tests/app/browser/sections/FormLabelSection.test.ts` (new),
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/setup.ts` (the `CaptureSubject` union and the
`CASCADE_KEYS` rows), `tmp/units/bfw-report.md`.

**Shared (report-only).** `tests/setup.test.ts`, `guides/veneer.md` (`bfl` owns it; return the
§ Showcase sentence naming the forms regions — Validation, Form check, Form floating, Form control,
Form label, Form range, Form select, and Input group — and the § Tests stem rows as exact text for
`bfl`'s integration), `ROADMAP.md`.

**Off-limits.** Every file `bfl` owns (`src/**`, `tests/setupStyles.ts` and its proof,
`tests/setupServer.ts` and its proof, `tests/conformance.test.ts`, `tests/src/**`,
`guides/veneer.md`); `tests/fixtures/**`; the paths `scaffold repair` restores; every file not
named in Owned.

**What asserts the state this change ends.** `tests/app/browser/Showcase.test.ts` (the regions
literal and the specimen concatenation; Owned); `tests/app/browser/index.test.ts` (the export
literal; Owned); `tests/app/browser/integration.test.ts` (the declared-specimen list; Owned);
`tests/setup.ts` (the union and the rows; Owned); `tests/setup.test.ts` (the registry law over the
new scenarios; Shared, must stay green); `guides/veneer.md` § Showcase and § Tests (Shared,
`bfl`). Search bound: `grep -rn "FormFloatingSection\|FORM_FLOATING_SPECIMENS\|form-floating-empty" app tests guides`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or
destructive git. Runtime probes go under `tmp/probe/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bfw-report.md`: the diff summary, each criterion with its command and result
line, the column-split reading, the exact guide sentence and stem rows for `bfl`, and the claims
you flag as weakest. Return the same content as your final message.

## Deviation contract

Stop and report on a redden in `tests/setup.test.ts` or a criterion needing a file outside Owned.
Decide, record, and carry on for the column split, the label and help text wording, the ids, and
the specimen doc block's wording.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
2. `FormLabelSection extends SpecimenSection`, fed by `FORM_LABEL_COPY` (region `Form label`;
   paragraph "Compare a label and its help text around a control, and a horizontal label level with
   the control beside it at each size and over a group.") and `FORM_LABEL_SPECIMENS`, in this
   order: `Form label stacked` (a `.form-label` for an email control, the control, and a
   `.form-text` the control names through `aria-describedby`; label "Dispatch email"; help
   "Northworks sends every shipping notice to this address."), `Form label horizontal` (a `.row`
   with a `col-* col-form-label` label and a `.col-*` control), `Form label horizontal large` and
   `Form label horizontal small` (derived from one size list with `.map`, the label carrying the
   size class and the control `.form-control-lg` or `.form-control-sm`), `Form label legend` (a
   `fieldset.row` whose `legend.col-* col-form-label` labels a date control that carries its own
   `aria-label`); breakpoint-free columns; ids prefixed `form-label-`; every control named
   uniquely; no inline style; the specimen doc block in the sibling sections' voice.
3. `Showcase.ts` constructs `FormLabelSection` after `FormControlSection` and before
   `FormRangeSection`, and `FormControlSection` ahead of `FormFloatingSection` (D35); `index.ts`
   re-exports the module; `Showcase.test.ts`, `index.test.ts`, and `integration.test.ts` carry the
   region, the export, and the specimen table.
4. `tests/setup.ts`: `CaptureSubject` gains the five names in alphabetical order; `CASCADE_KEYS`
   gains, at the registry's end, `form-label-stacked` (`.form-label`, `margin-bottom`),
   `form-label-horizontal` (`.col-form-label`, `padding-top`), `form-label-horizontal-large`
   (`.col-form-label-lg`, `font-size`), `form-label-horizontal-small` (`.col-form-label-sm`,
   `font-size`), and `form-label-legend` (`legend.col-form-label`, `margin-bottom`); no driven
   scenario.
5. `FormLabelSection.test.ts`: a case named for what it proves reads the region name, the
   paragraph against the constant, the specimen order and markup, each control's `readName`
   against its label text, the legend-labelled control's own name, `readStates` including
   `described` on the stacked control with its `aria-describedby` resolving to the `.form-text`
   element, and the frozen constants; a teardown case copies the siblings'. Mutations: a dropped
   `for` or a mismatched id (an empty name), an `aria-describedby` naming a missing id, a reordered
   specimen list.
6. `npm run test:app` and `npm run test:setup` exit 0.
7. `npm run test:journey` exits 0.

**Observations, not criteria.** One `CAPTURE=1` run for one variant listing the
`form-label-*--<variant>.png` frames written (the partial is absent here; the Orchestrator's
integrated run is authoritative).

## Review evidence

The actual diff and status from the worktree, the report, and the one-variant capture reading.
