# Unit absorb-styles-plan — the styles session's plan, decisions, and foundation verdicts

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that lists every decision and ruling the old Veneer styles session made about the CSS cascade, the token system, the test infrastructure, and the package foundation, and classifies each as a fact any Bootstrap 5.3.8 recreation must honour, a fact about Sass or CSS the new surfaces must honour, or a design choice of the old cascade that the successor may drop.

## Context

- **Evidence.** The styles session's plan (`.orkestrel/veneer/plan.md`), the decision log D2 to D52 (`.orkestrel/veneer/units/decisions-round-2.md`), the foundation design verdicts (`.orkestrel/veneer/f8-design-verdict.md`, amended by `.orkestrel/veneer/f8c-design-verdict.md`), the portfolio design verdict (`.orkestrel/veneer/units/pf-design-verdict.md`), and the retention carry distillate (`.orkestrel/veneer/units/x-retention-carry-2-distillate.md`).
- **Background.** The old cascade was one `styles` surface that recreated Bootstrap with Elements' identity as departures, recorded in a guide ledger. The successor splits three surfaces: a `bootstrap` face recreates Bootstrap 5.3.8 in authored source order with the same output, a `tailwindcss` face maps Tailwind for compatibility without recreating it, and a `styles` face holds only Veneer's own tokens and additions. What the successor needs is the set of Sass, CSS, cascade-layer, token, and proof facts the old session established, separated from the identity departures it no longer ships.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a ruling cites a pruned record by a `git show` path, say `pruned record` and cite the ruling's line.

## Scope

- **Read, whole.**
  - `.orkestrel/veneer/plan.md`
  - `.orkestrel/veneer/units/decisions-round-2.md`
  - `.orkestrel/veneer/f8-design-verdict.md`
  - `.orkestrel/veneer/f8c-design-verdict.md`
  - `.orkestrel/veneer/units/pf-design-verdict.md`
  - `.orkestrel/veneer/units/x-retention-carry-2-distillate.md`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Styles plan distillate

## Rulings

| Id | Ruling (one sentence) | Evidence cited | Class | Why that class (one sentence) |
| --- | --- | --- | --- | --- |
```

`Id` is the decision's own id (`D2`, `F8-R3`, and so on; give an unnumbered ruling a sequential `S` id). `Class` is one of `bootstrap` (a fact about Bootstrap 5.3.8's compiled output, source order, tokens, `!important` use, physical properties, or breakpoints), `sass` (a fact about Sass modules, `@use`, mixins, placeholders, or the compiler), `cascade` (a fact about CSS layers, specificity, `color-scheme`, `light-dark()`, `color-mix()`, custom properties, or the browser's resolution), `proof` (a fact about how a cascade is proved: resolved styles, oracle recordings, serialization drift across Chromium builds, mutation instruments), `identity` (an Elements-look departure the successor no longer ships), `design` (a choice about file layout, ledger shape, or process the successor may revisit), `process`.

After the table:

```markdown
## Bootstrap recreation facts

One bullet per fact a byte-faithful recreation of Bootstrap 5.3.8's CSS must honour, with citation.

## Token system facts

One bullet per fact about the `--vn-*` and `--bs-*` token trees, aliasing, mode scopes, and factors, with citation.

## Proof facts

One bullet per fact about proving a cascade in the browser, with citation.

## Identity departures the successor drops

One bullet per departure, with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error. Settle every classification yourself and state the reason in the row.

## Acceptance criteria

1. Every decision id in `decisions-round-2.md` appears once in the table.
2. Every ruling in the two F8 verdicts appears once.
3. Every row cites a `file:line` in a file in scope.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
