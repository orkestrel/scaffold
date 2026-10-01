# Unit absorb-engine-contract — the old engine's public contract and Bootstrap wire data

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that maps the old engine's public TypeScript contract (every interface, its members, its option paths, its event map) and every Bootstrap wire table its constants file carries (event names, selectors, data attributes, defaults, the sanitizer allowlist, the templates), so the successor can reuse the Bootstrap data verbatim and decide each contract shape anew.

## Context

- **Evidence.** `tmp/mikesaintsg-veneer/src/browser/types.ts` (136 KB, every engine contract with TSDoc) and `tmp/mikesaintsg-veneer/src/browser/constants.ts` (28 KB, the wire tables), from a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`.
- **Background.** The successor redesigns the engine from scratch but keeps Bootstrap 5.3.8's markup, class, `data-bs-*`, event, option, and method contracts. The constants are Bootstrap data and carry over; the interfaces are the old design and are input to a fresh design round, not a template.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste interface bodies.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a TSDoc remark cites a Bootstrap source line, record it as the file's claim.

## Scope

- **Read, whole.**
  - `tmp/mikesaintsg-veneer/src/browser/constants.ts`
  - `tmp/mikesaintsg-veneer/src/browser/types.ts`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read both files completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old engine contract distillate

## Wire tables

| Constant | Component | What it holds (one sentence) | Bootstrap source it mirrors (as the file claims) | Citation |
| --- | --- | --- | --- | --- |
```

One row per exported constant in `constants.ts`.

```markdown
## Contracts

| Interface | Members (names only, comma-separated) | Events (map keys) | Option paths (top-level keys and their grouped leaves) | Citation |
| --- | --- | --- | --- | --- |
```

One row per exported interface or type alias in `types.ts` that names an engine, a mechanism, an options object, an event map, or a detail.

```markdown
## Shared shapes

One bullet per shape every engine repeats (the `on` hooks, the `signal` option, the `find` static, `destroy`, the `Promise<boolean>` change methods, the `shown` getter), naming the interfaces that carry it, with citation.

## Departures the TSDoc records

One bullet per TSDoc sentence that records a departure from Bootstrap (an accepted wire key that is ignored, a member renamed, a behaviour not mirrored), with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every exported constant in `constants.ts` has one row.
2. Every exported interface in `types.ts` whose name ends in `Interface`, `Options`, `EventMap`, or `Detail` has one row.
3. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
