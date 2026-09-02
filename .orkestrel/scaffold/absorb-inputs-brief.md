# Unit absorb-inputs — input affordances and their Bootstrap recipes across the fleet

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the versioned Cursor CLI entry in
`-p --trust --mode=ask`. You are the bench engine reading this brief inside your own CLI: perform
the reading yourself and spawn nothing.

## Objective

Return one distilled inventory of every input affordance the listed applications and libraries
actually render, keyed by the form control it stands for, with the exact Bootstrap markup and
class recipe each uses, the states it handles, and every place it reaches past Bootstrap
(a `style` attribute, a `<style>` block, a custom class, a utility combination used as a hack).

## Context

**Evidence.** These repositories sit as siblings under `C:\Users\mikes\WebstormProjects\`. The
working directory of this run is that parent directory. Paths are relative to it.

- `form/src/core/types.ts` — the host-independent form document. `FieldControl` is the union
  `text | editor | password | number | date | time | datetime | color | confirm | select | checkbox | file`;
  `SelectField.open` admits a value the list does not offer; `FieldBase` carries `label`, `help`,
  `group`, `hidden`, `locked`, `disabled`, `rule`, `meta`; `FieldRule` carries `required`,
  `minimum`, `maximum`, `step`, `pattern`, `email`, `url`, `integer`, `alphanumeric`, `custom`.
  `form/guides/form.md` § Controls (lines 200–428) and § The three visibility switches (904–946)
  state what a renderer owes each control and switch. Read those sections.
- `taverna/app/browser/components/` — a Vue 3 application on the Halfmoon Bootstrap skin.
  `EntityField.vue` maps a `control` axis onto `form-control`, `form-select`, `textarea`,
  `form-check form-switch`, a segmented `btn-check` radiogroup, and a date input, and defines a
  read-mode chrome string `bg-transparent border-secondary border-opacity-10 shadow-none`.
  `EntityPicker.vue` is an APG combobox over `dropdown-menu show`. `EntityForm.vue`,
  `MemberPicker.vue`, `CommandBar.vue`, `CreateDialog.vue`, `ConfirmDialog.vue`,
  `InviteDialog.vue`, `AuthView.vue`, `LifecycleStrip.vue`, `ContentStatus.vue`, `EmptyState.vue`,
  and `content/entity/EntityContentEdit.vue` also render inputs or input-adjacent chrome.
  `taverna/app/browser/types.ts` declares `FieldView` with its own `FieldControl`.
- `terrain/app/browser/components/` — a Vue 3 application on Halfmoon with a `data-bs-core="modern"`
  token layer (`terrain/app/browser/styles/_tokens.scss`, `_theme.scss`, `index.scss`).
  `Toolbar.vue`, `BuildingTable.vue`, `WorksheetPanel.vue`, `SchedulePanel.vue`,
  `CSVDropZone.vue`, `AuditPanel.vue`, `CarrierResults.vue`, `ToastHost.vue`, and the
  `guides/*.vue` set render inputs, tables, toasts, and modals.
- `lloyds/app/browser/components/` — the earlier attempt at the same application;
  `lloyds/app/browser/styles/main.scss` adds a custom `.form-check-input-danger` class.
- `mailbox/app/browser/pages/` — a Bootstrap-5 class contract on a Tailwind foundation. The
  input-shaped pages are `FormPage.vue`, `DatePickerPage.vue`, `TimePickerPage.vue`,
  `RangeSliderPage.vue`, `RatingPage.vue`, `UploadPage.vue`, `TagPage.vue`, `StepperPage.vue`,
  and `UseDialogPage.vue`.

**Law.** Read-only. No `AGENTS.md` coding law applies to a reading lane. The vocabulary to report
in is the one `.agents/skills/enterprise-bootstrap/SKILL.md` (under `scaffold/`) uses: the styling
ladder — component classes, then utilities, then `--bs-*` extension points, then custom CSS.

**Host.** Windows 11, Git Bash launcher, no network needed. Skip every `node_modules/` and
`dist/` directory.

**Measurements.** `grep -rn "style=\"" taverna/app/browser terrain/app/browser lloyds/app/browser`
and `grep -rn "<style" ...` are the two sweeps that find rung-four styling. Run them and cite the
hits; name the scope each sweep covered.

**Control identifiers.** none.

**Standing conditions.** `form/` ships no browser environment; its guide says rendering is a
future `src/browser`. Report that as a fact, not as a gap you diagnose.

## Unknowns

- Whether any application renders `color`, `time`, `datetime`, or `password` controls at all.
  Report each control with no rendering site as `unrendered` and name the search that found
  nothing.

## Scope

**Owned.** Nothing. This lane writes no file.

**Shared (report-only).** Every file named under Evidence.

**Off-limits.** Every other path. Never open a `.env*`, `auth.json`, `.npmrc`, or key file.

**What asserts the state this change ends.** Not applicable to a reading lane.

**Tools and limits.** Read, search, and list. No edits, no commands that change the tree, no
`--force`.

## Execution

You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing.

## Output

Return, as your final message and nothing else, Markdown with these sections:

- `Question`: one line.
- `Evidence`: one table, one row per (form control × affordance) pair you found rendered:
  columns `Control` (from `form`'s `FieldControl`, or `beyond-form` for an affordance no control
  covers), `Affordance` (switch, radio, segmented, range, datalist, combobox, picker, dropzone,
  stepper, rating, tag, and so on), `Site` (`path:line`), `Recipe` (the element and class list
  verbatim), `States handled` (readonly, locked, disabled, invalid, pending, required, help,
  placeholder, empty), `Rung` (1 component, 2 utility, 3 `--bs-*`, 4 custom), `Notes` (the hack
  or the deviation, in one clause).
- `Distillate`: at most twelve bullets naming the recurring recipes, the recurring hacks, and
  the controls nobody renders.
- `Unknowns`: unresolved facts, not recommendations.
- `Deviation`: an unreadable path, a sweep that could not run, or a dirty tree; otherwise `none`.

No raw file dumps. No design proposals. No verdicts on quality.

## Deviation contract

Stop and report when a listed directory does not exist or cannot be read. Decide, record, and
carry on when a file listed under Evidence renders no input at all.

## Acceptance criteria

1. Every row cites a `path:line` that exists.
2. Every `FieldControl` member appears in the table at least once, as a rendered row or as an
   `unrendered` row naming the search.
3. Both rung-four sweeps are reported with their pattern, their scope, and their hits.

## Review evidence

The Orchestrator reads the distillate against the cited lines before using any row.
