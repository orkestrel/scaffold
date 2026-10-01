# Unit absorb-styles-reports — measured facts from the styles session's landed unit reports

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts every measured fact and every lesson the old styles session's token, ledger, state, and retirement unit reports record, so the successor's token contract and its cascade proofs can start from those measurements.

## Context

- **Evidence.** Unit reports under `.orkestrel/veneer/units/`: the token-proof rounds, the token retirement, the state proofs, and the ledger additions and retune rounds. Each report states what the unit changed, what it measured (a resolved style, a plant that reddened a gate, a Chromium serialization), and what it left open.
- **Background.** The successor keeps `--vn-*` tokens as Veneer's customization contract on its own `styles` face, with a `theme` layer and mode packs, and proves tokens by reading resolved styles in the browser. It needs the measured facts (which token override moves which resolved property, what a mode scope must re-declare, what a serialization drift looks like, how a ledger gate was planted red) rather than the old cascade's values.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a report cites a log not in scope, say `log not in scope` and cite the report's line.

## Scope

- **Read, whole.**
  - `.orkestrel/veneer/units/token-proofs-report.md`
  - `.orkestrel/veneer/units/token-proofs-report-2.md`
  - `.orkestrel/veneer/units/token-proofs-report-5.md`
  - `.orkestrel/veneer/units/token-proofs-report-6.md`
  - `.orkestrel/veneer/units/token-retire-report.md`
  - `.orkestrel/veneer/units/states-report.md`
  - `.orkestrel/veneer/units/ledger-additions-report.md`
  - `.orkestrel/veneer/units/ledger-retune-report.md`
  - `.orkestrel/veneer/units/ledger-retune-report-3.md`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Styles reports distillate

## Measured facts

| Id | Fact (one sentence) | Unit | Class | Citation |
| --- | --- | --- | --- | --- |
```

`Class` is one of `token` (what a token override moves, what a mode scope re-declares, an alias rule), `cascade` (a resolution or serialization fact in Chromium, with the build where named), `proof` (a gate design, a plant, a reader, a control), `ledger` (how additions, departures, values, and priorities were recorded and compared), `identity` (an Elements value the successor drops).

After the table:

```markdown
## Token proof mechanism

How a token override was proved to move a resolved consumer property: the reader, the override site, the control, the plant, each with citation.

## Retired and retuned tokens

One bullet per token retired or retuned, with the reason and citation.

## State proofs

What the states unit proved about state classes rendered statically (hover, focus, active, disabled, checked, show), with citation.

## Ledger mechanism

How the additions and retune ledgers were derived and gated, including the resolver model and the priority comparison, with citation.

## Open items the reports left

One bullet each, with citation.

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
