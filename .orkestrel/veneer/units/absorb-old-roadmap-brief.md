# Unit absorb-old-roadmap — the old Veneer roadmap's tenets, rulings, conditions, and carrier register

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts, from the old Veneer roadmap, every tenet, standing ruling, design ruling, standing host condition, exit criterion, protocol rule, and carrier-register fact, and marks each as kept by the successor tenets, changed by them, or dropped.

## Context

- **Evidence.** The old roadmap is `tmp/mikesaintsg-veneer/ROADMAP.md` (a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`). Its sections by line: § Tenets from line 10, § Rulings from 70, § Routing from 189, § Standing conditions from 223, § Exit criterion from 238, § Phases and units from 266 (a 150 KB unit queue you do not read), § Protocol from 339, § Carriers from 425 (an 85 KB register of every Bootstrap key with its status), § Decisions from 559, § Records from 569 to the end.
- **The successor tenets**, verbatim from the new roadmap, which you compare against:
  - The browser face owns the interaction engine. Do not implement that engine with Bootstrap JavaScript at runtime.
  - The consumer supplies Vue. Bootstrap, Tailwind, and Vue are not runtime dependencies and not peer dependencies. Runtime dependencies are `@orkestrel/*` only.
  - No right-to-left sheet.
  - The Bootstrap surface recreates Bootstrap 5.3.8 in authored source order with the same output. The pin is the map. Pin `bootstrap` at `5.3.8` as a `devDependency`. Import official `bootstrap` only from tests and setup; those proofs compare against the exported CSS.
  - The Tailwind surface maps Tailwind. Do not recreate Tailwind. The map feeds a compatibility layer tested the same way against the real Tailwind package, imported only from tests and setup. Bootstrap wins on a shared class.
  - The styles surface is Veneer's own layer. It records additions against the Bootstrap pin. It does not copy the Bootstrap cascade or the Tailwind map.
  - Semantic tags get useful defaults. Do not infer a component from tag position. Classes stay the explicit control.
  - CSS variables are the customization contract. The rendered browser result decides UI correctness.
  - Prefer native browser APIs.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command. Read the file in line ranges with your tool's offset and limit; the § Phases and units range (lines 266 to 338) is out of scope and is long enough to crowd your context, so skip it.

## Unknowns

Where a ruling cites a `git show` path, say `pruned record` and cite the ruling's line.

## Scope

- **Read.** `tmp/mikesaintsg-veneer/ROADMAP.md` lines 1 to 265, 339 to 558, and 559 to the end. Do not read lines 266 to 338.
- **Off-limits.** Every other file. Write nothing.

## Execution

Read the ranges in scope, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old roadmap distillate

## Tenets

| Old tenet (one sentence) | Successor disposition | Why (one sentence) | Citation |
| --- | --- | --- | --- |
```

`Successor disposition` is `kept`, `changed`, or `dropped`, judged against the successor tenets quoted in this brief.

```markdown
## Rulings

| Id | Ruling (one sentence) | Disposition | Why | Citation |
| --- | --- | --- | --- | --- |
```

Give an unnumbered standing ruling a sequential `SR` id and a design ruling a `DR` id; keep a `D<n>` id where the text carries one.

```markdown
## Standing conditions

One bullet per row of the § Standing conditions table: the condition, its consequence, and whether it is a host fact (npm version, Playwright revision, Chromium build, sandbox), a scaffold fact (repair, vendored files, policy sweep), or a campaign fact, with citation.

## Exit criterion

One bullet per numbered item, with the disposition under the successor tenets and citation.

## Protocol

One bullet per protocol rule (session ownership, landing discipline, records), with citation; mark each `process`.

## Carrier register

The columns the register carries, the status vocabulary it uses, the count of rows per status if the section states one, and one bullet per row whose status is not `shipped` (deferred, excluded, departure), each with its reason and citation. Where the rows are too many to list, list the statuses and the components each covers, and say so.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If the file cannot be read, stop and report the path and the error. Settle every disposition yourself and state the reason.

## Acceptance criteria

1. Every product tenet and execution constraint under § Tenets appears once.
2. Every standing ruling and design ruling under § Rulings appears once.
3. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
