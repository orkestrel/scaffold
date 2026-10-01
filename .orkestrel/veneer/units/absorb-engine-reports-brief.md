# Unit absorb-engine-reports — measured facts from the engine session's landed unit reports

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts every measured fact about Bootstrap 5.3.8's own JavaScript behaviour (the oracle recordings), every re-entry and ownership hazard the engine units measured, and every proof lesson, from the old engine session's landed unit reports, and separates the facts any engine on these contracts meets from the hazards of the old engine's own mechanisms.

## Context

- **Evidence.** Unit reports under `.orkestrel/veneer/engine/units/`: the oracle recording of Bootstrap's bundle, the release-core and holders ownership work, the sameway and re-entry sweeps, the snapshot sharing, the integration proof, the cascade proof, the motion proofs, the native probe, and the toast-swipe terrain.
- **Background.** The successor redesigns the engine from scratch on native browser APIs while keeping Bootstrap 5.3.8's contracts. An oracle fact about what Bootstrap's bundle does on a given markup is a contract fact any engine must match or record as a departure; a hazard that follows from the old engine's snapshot, lifetime, or door mechanisms is a design fact the rewrite may avoid by design.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a report cites a log not in scope, say `log not in scope` and cite the report's line.

## Scope

- **Read, whole.**
  - `.orkestrel/veneer/engine/units/j-oracle-record-report.md`
  - `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md`
  - `.orkestrel/veneer/engine/units/j-oracle-census-0925.md`
  - `.orkestrel/veneer/engine/units/j-release-core-report.md`
  - `.orkestrel/veneer/engine/units/j-holders-report.md`
  - `.orkestrel/veneer/engine/units/j-sameway-report.md`
  - `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md`
  - `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md`
  - `.orkestrel/veneer/engine/units/j-integration-report.md`
  - `.orkestrel/veneer/engine/units/j-cascade-report.md`
  - `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md`
  - `.orkestrel/veneer/engine/units/j-native-probe-report-2.md`
  - `.orkestrel/veneer/engine/units/j-toast-swipe-terrain.md`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Engine reports distillate

## Oracle facts

| Plugin | What Bootstrap's bundle did (one sentence) | Departure the old engine recorded | Citation |
| --- | --- | --- | --- |
```

One row per recorded end state, event order, or attribute write the oracle reports name.

```markdown
## Hazards

| Id | Hazard (one sentence) | Class | Citation |
| --- | --- | --- | --- |
```

`Class` is one of `contract` (follows from Bootstrap's contract), `platform` (follows from a browser behaviour, with the Chromium build where named), `design` (follows from the old engine's mechanism).

```markdown
## Proof lessons

One bullet per lesson about proving an engine in the browser (what a mutation instrument counts, how a re-entry sweep is built, how the oracle compiles Veneer at run time, how motion is read from the rendered transition, what a showcase read races), with citation.

## Native probe readings

One bullet per platform reading in the native probe report, with the Chromium build, with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every file in scope contributes at least one row or bullet.
2. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
