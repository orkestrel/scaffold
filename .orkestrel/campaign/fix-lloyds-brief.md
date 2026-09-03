# Unit F-lloyds — close the audit round's findings on lloyds

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment directly and spawn nothing.

## Objective

Close every reconciled finding from lloyds' audit round, in the surface where each lives, so the
suite proves what the skills require and the audit's claims hold as written.

## Context

Verdicts: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\audit-lloyds-objective-verdict.md`
and `audit-lloyds-subjective-verdict.md` (the reviewer's, transcribed by the Orchestrator).
Skills: `orkestrel-prove-journey/SKILL.md` § Declare the transport family and
`references/styles.md` (the escape reading on the undriven tree); `enterprise-bootstrap/SKILL.md`
(the accessible-name and one-glyph rules). Terrain's `App.vue` boot-failure alert with
`Retry loading` and its transport family are the shape to instantiate. Standing conditions: the
user's lockfile pair; commit nothing; no `npm install`.

## Findings carried

- **Objective 8 — the escape reading is driven.** `mountSurface` dismisses the first-run dialog
  before `extractStyles(host)` runs. Take the reading on the undriven tree: mount without
  dismissing, read, then dismiss; the exemption for the closed modal's `display: none` then
  reads against a tree the journey has not touched, and the reading's coverage statement says so.
- **Objective 9 — no storage-failure sentence with a retry.** The shell swallows a boot read
  failure (`App.vue` calls `void app.start()`) and shows nothing a person can retry; the skill
  requires the visible sentence and the retry control that clears it. Give `App.vue` the
  boot-failure `role="alert"` region with a sentence a person reads and a `Retry loading`
  command that calls `start()` again, the way terrain does; then have the transport family open
  over a driver that refuses its first read, read the sentence, press `Retry loading`, and read
  the workspace. Keep the import-failure toast as it is (a write failure with its own sentence).
- **Objective 13 — the remaining selector sites.** They are the three harness-attribute reads
  the statechart reference prescribes, `requireElement` in the setup, and the two setup proofs'
  own module reads. Record that count and placement in the suite's declaration comment; the
  audit claim's wording was the Orchestrator's, and the report states the sites.
- **Objective finding — duplicate `Close` names.** Every modal and panel that pairs an icon
  control `aria-label="Close"` with a footer or visible `Close` exposes two reachable `Close`
  names: `TipsTricks.vue`, `components/guides/CarrierGuidesModal.vue`, `AuditPanel.vue`,
  `SchedulePanel.vue`, `WorksheetPanel.vue`, `ToastHost.vue`. Name each icon control for its own
  dialog or panel (`Close tips`, `Close carrier guidelines`, and so on) as the Quick Reference
  already does, so `Close` resolves the visible button alone; prove one of them in the suite.
- The reviewer's findings, appended below when its verdict lands.

## Scope

**Owned.** `app/browser/App.vue`, the named components' icon-control labels only, `tests/**`
except the vendored three, `guides/README.md`. **Off-limits.** Everything else; the lockfile
pair; `package.json`; `configs/**`; `vite.config.ts`.

## Output

Write `tmp/units/fix-lloyds-report.md` and return it: each finding's change with its red-then-
green, the run summaries at every variant and under the capture flag, the scoped gates
(`format:check`, `lint:check`, `check`, `build`), `git diff --stat`, `git status --porcelain`,
claims not closed.

## Deviation contract

Stop and report when a finding needs a change beyond `App.vue` and the icon labels in
`app/**`, or when a run is red outside the findings.

## Acceptance criteria

1. The escape reading runs on the undriven tree; the transport family reads the boot-failure
   sentence and clears it through `Retry loading`; `Close` resolves alone in every dialog the
   journeys open.
2. Every run and scoped gate green.

## The reviewer's findings, reconciled and carried

- **Subjective 4 — the table's completeness.** Add `armed × select → armed, through the row
  checkbox` (a second row selected while one is armed). Give the header checkbox
  `Select/deselect all buildings` its own rows — `idle × select-all → armed` and
  `armed × deselect-all → idle`, named for that door — or state in the guide why the door is
  outside the table; prefer the rows. Put one journey on a two-row selection so the dialog's
  plural copy (`Delete these 2 buildings?`) is read, and register that state for capture.
- **Subjective 8 — same as objective 8.** The escape reading runs on the undriven tree.
- **Subjective 9 — same as objective 9, plus the sentence.** A refused storage write raises the
  import-failure sentence (`Error importing CSV file. Please check the file format.`), which
  misattributes the cause. Give the storage-write path its own sentence naming what refused,
  with the retry or dismissal the surface offers; the transport family asserts that sentence,
  and the boot-failure alert with `Retry loading` from objective 9 covers the read path.
- **Subjective 11 — artifacts overwritten.** The retained artifact for three variants came from
  later non-capture runs, so their capture-frame sections are empty. Write the artifact so a
  non-capture run keeps the capture names the last capture run wrote (read the existing file's
  section and carry it forward), or write the artifact only under the capture flag and say so
  in the guide; prove that every artifact lists its four frames after the full run sequence.
- **Subjective 13 — unconsumed helpers.** Delete `modalRoot` and `filePicker` from
  `tests/app/browser/setup.ts`; restate the remaining-sites clause in the suite's declaration
  comment as what they are.
- **Subjective 14 — the guide's rail row.** `guides/README.md`'s concept row for the rail's
  chrome names the matrix family as its proof; the family measures the two commands, not the
  rail's scope, surface, or tiers. Name what the proof covers and carry the rail's surface as an
  open limit, or extend the matrix family to read the rail's own contrast (text on
  `bg-body-tertiary` under the scoped theme, both page themes) — prefer the extension, since
  the instrument exists.
- **F1 — the drop zone's dark panel.** `CSVDropZone.vue` paints `text-bg-dark` with no theme
  scope and now holds a `btn-secondary` that resolves page-theme tokens, so it renders brighter
  than the light button above it under the light theme and recedes under the dark. Scope the
  panel with `data-bs-theme="dark"` (as the rail is) so its tiers resolve dark tokens under
  either page theme; measure its button and its text in the matrix family.
- **F2 — one vocabulary per dialog, and the edit gets its brief.** The Orchestrator's rename
  of the Quick Reference icon to `Close quick reference` split one action into two names. Rule:
  every dialog's close controls carry the one name `Close`; revert the icon's label to `Close`;
  journeys dismiss a dialog through `pressKeys('Escape')` or a press scoped to the dialog's
  region where the region holds one `Close`, never by resolving a bare `Close` on a screen with
  two. This supersedes the `Close`-uniqueness item under the objective finding: do not rename
  the other icons; keep them `Close` and drive by Escape or scope.
- **F3 — outline footer buttons on tinted surfaces.** `QuickReference.vue`, `TipsTricks.vue`,
  and `components/guides/CarrierGuidesModal.vue` render `btn-outline-secondary` on a
  `modal-footer bg-body-tertiary`, which the tiers rule names as a surface where outline fails.
  Retier the three to `btn-secondary`; register the first-run dialog as a capture state
  (`quick-reference`) so the portfolio shows the screen every wide journey opens on; scope the
  guide's tier sentence to what the surface obeys.
- **F4 — the harness mounts the parts without the shell.** `StatechartHarness.vue` wraps
  `Toolbar` and `BuildingTable` in a bare `div`, so at `lg` and up the rail takes the full
  width as a viewport-tall slab. Give the widget the same row and column structure `App.vue`
  uses, so the demo step shows the composition the product ships; re-take
  `tmp/chrome/harness-light.png` and `harness-dark.png` as the proof.
- **Referrals, settle each by a probe and record.** `DeleteDialog.vue` sets `role="alertdialog"`
  on a native `dialog` opened with `showModal()`: read the computed role and `aria-modal` in
  Chromium and keep or drop the override on the reading. `Toolbar.vue` renders
  `id="delete-reason"` unconditionally: prove no route mounts two toolbars at once, or key the
  id. The boot-refusal assertion uses `toThrow(string)`, a substring: pin the sentence by
  equality. `App.vue`'s `void app.start()` is closed by objective 9's alert.

## Scope, widened for these findings

**Owned.** `app/browser/App.vue`, `CSVDropZone.vue`, `QuickReference.vue`, `TipsTricks.vue`,
`components/guides/CarrierGuidesModal.vue`, `StatechartHarness.vue`, `DeleteDialog.vue`,
`Toolbar.vue`, `BuildingTable.vue` (the select-all door only), `constants.ts`, `helpers.ts`,
`types.ts`, `controllers/ApplicationController.ts` (the storage-write sentence only),
`tests/**` except the vendored three, `guides/README.md`. **Off-limits.** Everything else; the
lockfile pair; `package.json`; `configs/**`; `vite.config.ts`.

## Acceptance criteria, widened

3. The table carries every event each state accepts including the select-all door; a two-row
   journey reads the plural copy; every dialog's close controls share one name and every
   journey dismisses by Escape or a scoped press.
4. The drop zone's panel and the three footer buttons resolve their tiers correctly in both page
   themes and are measured; the harness renders the shipped composition.
5. Every artifact lists its frames after the full run sequence; the guide's rows name proofs
   that cover them.
