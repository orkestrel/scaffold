# Unit absorb-engine-mechanisms — the old engine's shared mechanisms and the platform facts they encode

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that describes each shared mechanism of the old engine (transition completion, reflow, placement through the popover attribute and anchor positioning, host snapshot and restore, focus isolation through `inert`, scroll lock, backdrop, lifetime and abort, registry, swipe, the sanitizer adapter) and separates the platform facts each one encodes from the design choices it made, so a new engine can keep the facts and choose its own mechanisms.

## Context

- **Evidence.** The old engine's helper and mechanism files under `tmp/mikesaintsg-veneer/src/browser/` (a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`).
- **Background.** The successor redesigns the engine from scratch on native browser APIs while keeping Bootstrap 5.3.8's contracts. Every platform fact (what `getAnimations` returns, what the popover attribute's UA stylesheet sets, what `inert` does to focus, what the scrollbar width measure needs, what `setHTML` drops) recurs in any engine; every mechanism shape (a class, a door table, a snapshot record) is a choice.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste function bodies.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a comment cites a probe or a Bootstrap source line, record it as the file's claim.

## Scope

- **Read, whole.**
  - `tmp/mikesaintsg-veneer/src/browser/helpers.ts`
  - `tmp/mikesaintsg-veneer/src/browser/Placement.ts`
  - `tmp/mikesaintsg-veneer/src/browser/HostSnapshot.ts`
  - `tmp/mikesaintsg-veneer/src/browser/Isolation.ts`
  - `tmp/mikesaintsg-veneer/src/browser/ScrollLock.ts`
  - `tmp/mikesaintsg-veneer/src/browser/Backdrop.ts`
  - `tmp/mikesaintsg-veneer/src/browser/Lifetime.ts`
  - `tmp/mikesaintsg-veneer/src/browser/Registry.ts`
  - `tmp/mikesaintsg-veneer/src/browser/Swipe.ts`
  - `tmp/mikesaintsg-veneer/src/browser/sanitizers/ConfigSanitizer.ts`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old engine mechanisms distillate

## Mechanisms

| Id | Mechanism | File | What it does (two sentences at most) | Platform facts it encodes | Design choices it made | Citation |
| --- | --- | --- | --- | --- | --- | --- |
```

```markdown
## Helper catalogue

One bullet per exported function in `helpers.ts`: name, one-sentence job, the platform API it reads, with citation.

## Platform facts

One bullet per distinct platform fact the files encode (in code or comment), with citation; merge duplicates.

## Failure modes handled

One bullet per adverse condition the code handles (a rejected `finished` promise, a removed host mid-flight, an aborted signal, a nested restoration, an overlapping snapshot target, a detached host, a missing scrollbar), naming the file, with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every file in scope has one row in Mechanisms or contributes to the Helper catalogue.
2. Every exported function in `helpers.ts` has one bullet.
3. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
