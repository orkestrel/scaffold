# Unit absorb-styles-baseline — the Bootstrap baseline families' verdicts

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts, from the old styles session's baseline family verdicts, every fact about recreating Bootstrap 5.3.8's components, forms, utilities, collapse, modal, and cross-cutting rules in Sass, and every fact about proving them in the browser.

## Context

- **Evidence.** The design and verify verdicts of the `B` families under `.orkestrel/veneer/` (`b-*.md`) and the family records under `.orkestrel/veneer/units/` (`b-passive-family.md`, `b-passive-baseline.md`, `b-collapse-family.md`, `b-utilities-family.md`). Each verdict reconciles a planner lane and an analyst lane and cites the compiled Bootstrap CSS, its Sass source, or a rendered reading.
- **Background.** The successor's `bootstrap` face recreates Bootstrap 5.3.8 in authored source order with the same output, under one `bootstrap` cascade layer, with kind files `_tokens.scss`, `_mixins.scss`, `_reset.scss`, and the folders named elements, components, and utilities. What it needs from these verdicts is every recreation fact and every proof fact, separated from the identity departures.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a verdict cites a pruned record, say `pruned record` and cite the verdict's line.

## Scope

- **Read, whole.**
  - `.orkestrel/veneer/b-passive-design-verdict.md`
  - `.orkestrel/veneer/b-passive-close-design-verdict.md`
  - `.orkestrel/veneer/b-sweep-design-verdict.md`
  - `.orkestrel/veneer/b-forms-design-verdict.md`
  - `.orkestrel/veneer/b-forms-close-design-verdict.md`
  - `.orkestrel/veneer/b-forms-label-design-verdict.md`
  - `.orkestrel/veneer/b-collapse-design-verdict.md`
  - `.orkestrel/veneer/b-collapse-verify-verdict.md`
  - `.orkestrel/veneer/b-modal-design-verdict.md`
  - `.orkestrel/veneer/b-utilities-design-verdict.md`
  - `.orkestrel/veneer/b-cross-design-verdict.md`
  - `.orkestrel/veneer/b-cross-cb-design-verdict.md`
  - `.orkestrel/veneer/b-portfolio-verify-verdict.md`
  - `.orkestrel/veneer/units/b-passive-family.md`
  - `.orkestrel/veneer/units/b-passive-baseline.md`
  - `.orkestrel/veneer/units/b-collapse-family.md`
  - `.orkestrel/veneer/units/b-utilities-family.md`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Styles baseline distillate

## Recreation facts

| Id | Bootstrap area | Fact (one sentence) | Class | Citation |
| --- | --- | --- | --- | --- |
```

`Class` is one of `output` (a fact about Bootstrap's compiled CSS bytes, order, selectors, or values), `sass` (a fact about how to author it in Sass modules and mixins), `cascade` (a fact about layers, specificity, `!important`, or resolution in the browser), `proof` (how the family was proved: the oracle, the resolved-style reading, the mutation plant, the serialization drift), `identity` (an Elements departure the successor drops).

After the table:

```markdown
## Per family

One `###` heading per family (passive, sweep, forms, collapse, modal, utilities, cross, portfolio) with the family's exit state and the open items it left, each cited.

## Proof mechanisms

One bullet per proof mechanism (oracle recording, value accounting, `!important` census, physical-property reversion, mutation instrument, capture portfolio), with what it proves and its citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error. Settle every classification yourself and state the reason in the row.

## Acceptance criteria

1. Every file in scope contributes at least one row or bullet.
2. Every row and bullet cites a `file:line` in a file in scope.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
