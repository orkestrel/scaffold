# Unit absorb-engine-findings — what the old engine left open, defective, or unproven

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that lists every finding, defect, limit, and unproven seam the old Veneer engine campaign carried at its end, and classifies each as a problem any engine on these contracts will meet or as a problem of the old engine's own design.

## Context

- **Evidence.** The engine session's plan (`.orkestrel/veneer/engine/plan.md`, whose § Carried findings table and § Exit criterion ledger name every open row), the re-baseline records of 2026-09-25 under `.orkestrel/veneer/engine/units/rebaseline-0925*.md`, and the six tenet-audit lens reports `.orkestrel/veneer/engine/units/j-tenets-*-report.md`.
- **Background.** The successor campaign redesigns the engine from scratch on native browser APIs while keeping Bootstrap 5.3.8's contracts. A defect that follows from the contracts or the platform recurs in any design; a defect that follows from the old engine's mechanisms (its snapshot, its delegate, its door tables, its sameway rule) does not.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a row names a record not in scope, say `record not in scope` and cite the row.

## Scope

- **Read, whole.**
  - `.orkestrel/veneer/engine/plan.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925-exit.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925-src.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925-tests.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925-styles.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925-rulings.md`
  - `.orkestrel/veneer/engine/units/rebaseline-0925-struck-rows.md`
  - `.orkestrel/veneer/engine/units/j-tenets-compat-report.md`
  - `.orkestrel/veneer/engine/units/j-tenets-identity-report.md`
  - `.orkestrel/veneer/engine/units/j-tenets-native-report.md`
  - `.orkestrel/veneer/engine/units/j-tenets-objective-report.md`
  - `.orkestrel/veneer/engine/units/j-tenets-package-report.md`
  - `.orkestrel/veneer/engine/units/j-tenets-rendered-report.md`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Engine findings distillate

## Findings

| Id | Finding (one sentence) | Source record | Class | Why that class (one sentence) |
| --- | --- | --- | --- | --- |
```

Number the ids `F1`, `F2`, and so on. `Class` is one of `contract` (follows from Bootstrap's contract and recurs in any engine), `platform` (follows from a browser behaviour and recurs in any engine on Chromium), `design` (follows from the old engine's own mechanism), `test` (a defect of the old proofs or test infrastructure), `prose` (a guide or documentation defect), `process`.

After the table:

```markdown
## Recurring classes

One bullet per defect class that appeared in more than one record, naming the ids.

## Unproven seams

One bullet per behaviour the records name as never driven (focus traversal in a shown modal, nested overlays, Tailwind preflight under the engine, and the rest), with citation.

## Test infrastructure lessons

One bullet per rule about proofs the records state (what a mutation instrument counts, why a fixed delay is a race, what a Chromium build changes), with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error. Settle every classification yourself and state the reason in the row.

## Acceptance criteria

1. Every row of `.orkestrel/veneer/engine/plan.md` § Carried findings appears once in the Findings table.
2. Every row cites a `file:line` in a file in scope.
3. Every lens report contributes at least one row.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
