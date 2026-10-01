# Unit absorb-showcase — the old showcase application and its journey

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that describes how the old Veneer showcase application was shaped (its sections, specimen registry, shell styles, engine wiring, and theme switching), how its journey proof drove it, and what the capture portfolio recorded, so the successor's browser and Vue showcases can start from the shape and the lessons.

## Context

- **Evidence.** The old application under `tmp/mikesaintsg-veneer/app/browser/` and its proofs under `tmp/mikesaintsg-veneer/tests/app/browser/`, from a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`. The old root `vite.config.ts` there registered journey variants `light-1280`, `dark-1280`, `light-390`, and `dark-390`.
- **Background.** The successor ships two showcases, a browser one and a Vue one, built to two single-file HTML pages under a `showcase` directory by one wrapper, and drives each through a journey project per viewport variant using `@orkestrel/test`'s journey layer. What it needs is the old showcase's structure and the lessons its proofs recorded, not its markup.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste markup or function bodies.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command. `tmp/mikesaintsg-veneer/app/browser/constants.ts` is 226 KB of specimen markup: read only its first 120 lines and its export lines, and say so. `tmp/mikesaintsg-veneer/tests/app/browser/integration.test.ts` is 3465 lines: read lines 1 to 400 and then search it for `describe(` and `it(` titles.

## Unknowns

Where a proof's title names a behaviour you cannot see driven in the lines you read, say `not read`.

## Scope

- **Read, whole.**
  - `tmp/mikesaintsg-veneer/app/browser/Showcase.ts`
  - `tmp/mikesaintsg-veneer/app/browser/index.ts`
  - `tmp/mikesaintsg-veneer/app/browser/types.ts`
  - `tmp/mikesaintsg-veneer/app/browser/helpers.ts`
  - `tmp/mikesaintsg-veneer/app/browser/main.ts`
  - `tmp/mikesaintsg-veneer/app/browser/index.html`
  - `tmp/mikesaintsg-veneer/app/browser/styles/index.scss`
  - `tmp/mikesaintsg-veneer/app/browser/styles/_shell.scss`
  - `tmp/mikesaintsg-veneer/app/browser/sections/ButtonSection.ts`
  - `tmp/mikesaintsg-veneer/app/browser/sections/EngineSection.ts`
  - `tmp/mikesaintsg-veneer/app/browser/sections/SpecimenSection.ts`
  - `tmp/mikesaintsg-veneer/app/browser/sections/ColorModeSection.ts`
  - `tmp/mikesaintsg-veneer/tests/app/browser/Showcase.test.ts`
  - `tmp/mikesaintsg-veneer/tests/app/browser/index.test.ts`
  - `tmp/mikesaintsg-veneer/tests/app/browser/sections/EngineSection.test.ts`
  - `tmp/mikesaintsg-veneer/configs/app/vite.journey.config.ts`
- **Read, range.** `tmp/mikesaintsg-veneer/app/browser/constants.ts` lines 1 to 120 plus its `export` lines; `tmp/mikesaintsg-veneer/tests/app/browser/integration.test.ts` lines 1 to 400 plus every `describe(` and `it(` title.
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file and range in scope, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old showcase distillate

## Structure

One bullet per structural element (the shell, the section registry, the specimen shape, the theme switch, the engine wiring, the navigation), naming its file and what it does, with citation.

## Section contract

The interface a section implements and how the showcase composes sections, with citation.

## Journey

The variants, what the journey proof drives (each `describe` and `it` title grouped by section), the capture and statechart mechanisms it uses, and its setup, with citations.

## Lessons

One bullet per lesson the proofs or comments record (a race between a showcase read and an engine settle, a capture that needed a specific state, a theme island reading), with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every file in scope contributes at least one bullet.
2. Every bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
