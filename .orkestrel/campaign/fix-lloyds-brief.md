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
