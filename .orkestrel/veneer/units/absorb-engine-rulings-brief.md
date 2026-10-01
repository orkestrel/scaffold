# Unit absorb-engine-rulings — the old engine campaign's rulings, classified

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that lists every ruling the old Veneer engine campaign made, one row per ruling, and classifies each ruling as a fact that constrains any engine written for Bootstrap 5.3.8 contracts on Chromium, or as a design choice specific to the old engine that a rewrite may drop.

## Context

- **Evidence.** The two files are the design verdict of the old engine (`.orkestrel/veneer/engine/j-engine-design-verdict.md`, 37 KB, rulings R1 to R18 and an Amendments section) and the engine session's decision log (`.orkestrel/veneer/engine/decisions.md`, 105 KB, decisions E1 to E35). Each decision or ruling cites a probe, a Bootstrap source line, or a user ruling. `node .agents/skills/orkestrel-scout/scripts/map.ts --headings` over both files printed the heading list the Orchestrator used to size this lane; the decision headings run from line 5 to line 440 of `decisions.md`.
- **Background.** The old campaign built `@orkestrel/veneer` as a TypeScript replacement of Bootstrap 5.3.8's JavaScript on native browser systems (popover attribute, anchor positioning, `inert`, `getAnimations`, `Element.setHTML`). The successor campaign keeps the Bootstrap contracts and the tenets (an owned engine, no Bootstrap JavaScript at runtime, `@orkestrel/*` as the only runtime dependencies, native browser APIs first, CSS variables as the customization contract) and will redesign the engine from scratch. What the successor needs from these files is the set of facts it cannot design around and the set of choices it is free to revisit.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not summarize the whole file; extract.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a ruling's evidence is a probe log that is not in the two files, say `evidence not in scope` and cite the ruling's own line.

## Scope

- **Read.** `.orkestrel/veneer/engine/j-engine-design-verdict.md` and `.orkestrel/veneer/engine/decisions.md`, whole.
- **Off-limits.** Every other file. Write nothing.

## Execution

Read both files completely. For every ruling (R1 to R18, every amendment in § Amendments, every decision E1 to E35), write one row. Then write the two lists the Output section names.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Engine rulings distillate

## Rulings

| Id | Ruling (one sentence) | Evidence cited | Class | Why that class (one sentence) |
| --- | --- | --- | --- | --- |
```

`Class` is one of:

- `platform` — a measured browser behaviour (name the Chromium build when the row names one) that any engine on Chromium meets.
- `bootstrap` — a fact about Bootstrap 5.3.8's markup, class, attribute, event, option, or method contract, read from Bootstrap's own source, that any drop-in engine must honour.
- `design` — a choice the old engine made among alternatives (a file layout, a class shape, a vocabulary, a mechanism selected over another) that a rewrite may revisit.
- `process` — a ruling about sessions, branches, landings, audits, or records, with no bearing on the code.

After the table:

```markdown
## Platform facts

One bullet per distinct measured browser behaviour, with the Chromium build and the citation. Merge rows that measure the same behaviour.

## Bootstrap contract facts

One bullet per distinct Bootstrap contract fact, with the citation.

## Open or contradicted

One bullet per ruling that a later ruling amended, refused, or contradicted, naming both ids.

## Unknowns

What the two files assert without evidence in scope.
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error. Settle every classification yourself and state the reason in the last column.

## Acceptance criteria

1. Every ruling id in both files appears exactly once in the table (R1 to R18, each amendment, E1 to E35).
2. Every row cites a `file:line` in one of the two files.
3. The Platform facts list names a Chromium build wherever the source does.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
