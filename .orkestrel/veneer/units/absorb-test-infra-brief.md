# Unit absorb-test-infra — the old test infrastructure's lessons

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that catalogues the helpers the old Veneer test infrastructure exported and states, for each family, what platform or cascade lesson it encodes, so the successor can decide which lessons its own setup modules (built on `@orkestrel/test`) must keep.

## Context

- **Evidence.** The export map `tmp/units/old-setup-exports.txt` (every `export` line of the old setup modules `setup`, `setupBrowser`, `setupStyles`, `setupServer`, and `setupService` under `tmp/mikesaintsg-veneer/tests/`, with line numbers; a mechanical map the Orchestrator wrote) and the old browser setup module `tmp/mikesaintsg-veneer/tests/setupBrowser.ts` (147 KB), from a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`.
- **Background.** The successor's proofs run on `@orkestrel/test` (recorders, waits, scratch, journey, statechart) and its own setup modules per surface. `.claude/rules/tests.md` in the scaffold checkout forbids a setup helper whose job an installed export already does. What the successor needs is the list of lessons (what to read, how to wait, what a Chromium build changes, how to read a transition, how to read a resolved style) rather than the helpers' code.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste function bodies.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command. The export map is large; read it whole, then read `setupBrowser.ts` whole.

## Unknowns

Where an export's job is not readable from its name and line, say `job unclear` and cite it.

## Scope

- **Read, whole.**
  - `tmp/units/old-setup-exports.txt`
  - `tmp/mikesaintsg-veneer/tests/setupBrowser.ts`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read both files completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old test infrastructure distillate

## Helper families

| Family | Module | Exports (names) | Lesson it encodes (one sentence) | Keep, replace with `@orkestrel/test`, or drop | Citation |
| --- | --- | --- | --- | --- | --- |
```

Group the exports into families (event recording, motion sampling, resolved-style reading, colour parsing, oracle recording, fixture builders, stage and mount, media emulation, journey variants, Tailwind compilation, the sheet reader, the proof resolver, and any other you find).

```markdown
## Browser setup lessons

One bullet per lesson `setupBrowser.ts` encodes in code or comment (what `getAnimations` returns mid-transition, how a transition is sampled at its midpoint, how `event.target` is read on a detached host, how reduced motion and forced colours are emulated, how a pseudo-element is read, how focus is read under a shadow root), with citation.

## Chromium build notes

One bullet per remark naming a Chromium build (141, 153, or another) and what differed, with citation.

## Duplicates of `@orkestrel/test`

One bullet per export whose job the names `createRecorder`, `waitForDelay`, `waitForCondition`, `waitForEvent`, `waitForAbort`, `retryUntil`, `createScratch`, `mount`, `render`, `build`, `readStyle`, `readToken`, `readRootToken`, `readPixels`, `parseCSSColor`, `matchesColor`, or `findRule` already name, with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every export in the map is assigned to a family.
2. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
