# Unit absorb-tailwind — the Tailwind compatibility facts and proofs

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts every fact the old Veneer campaign established about combining a Bootstrap-shaped cascade with Tailwind CSS 4 (layer order, shared class names, `!important` importance, the `@source not inline` exclusion line, the preflight recipe, the `source(none)` candidate scan, the PostCSS compile), and every proof mechanism it used, so the successor's `tailwindcss` compatibility face and its proofs can start from them.

## Context

- **Evidence.** The old campaign's Tailwind proofs and fixtures under `tmp/mikesaintsg-veneer/tests/` (a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`), the guide's Tailwind section, and the recipe unit reports under `.orkestrel/veneer/units/`.
- **Background.** The successor's `tailwindcss` face maps Tailwind for compatibility without recreating it, declares the layer order `theme, reset, base, elements, components, utilities`, keeps a reset partial for compatibility participation without Bootstrap reset rules, and is tested against the real `tailwindcss` package imported only from tests and setup. Bootstrap wins on a shared class. The successor's `bootstrap` face declares a single `bootstrap` layer.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command. Read the guide only in the line range named.

## Unknowns

Where a proof reads a fixture the successor will not carry, say so.

## Scope

- **Read, whole.**
  - `tmp/mikesaintsg-veneer/tests/service/tailwind/consumer.test.ts`
  - `tmp/mikesaintsg-veneer/tests/service/tailwind/preflight.test.ts`
  - `tmp/mikesaintsg-veneer/tests/service/tailwind/profiles.test.ts`
  - `tmp/mikesaintsg-veneer/tests/setupService.ts`
  - `tmp/mikesaintsg-veneer/tests/fixtures/tailwind/consumer.css`
  - `tmp/mikesaintsg-veneer/tests/fixtures/tailwind/consumer-preflight.css`
  - `tmp/mikesaintsg-veneer/tests/fixtures/tailwind/preflight.css`
  - `tmp/mikesaintsg-veneer/tests/fixtures/tailwind/unexcluded.css`
  - `tmp/mikesaintsg-veneer/tests/fixtures/tailwind/markup.html`
  - `tmp/mikesaintsg-veneer/tests/fixtures/tailwind/components.html`
  - `.orkestrel/veneer/units/tailwind-recipe-report-3.md`
  - `.orkestrel/veneer/units/tailwind-recipe-report-2.md`
- **Read, range.** `tmp/mikesaintsg-veneer/guides/veneer.md` lines 3618 to 4082 (§ Tailwind).
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file and range in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Tailwind compatibility distillate

## Facts

| Id | Fact (one sentence) | Class | Citation |
| --- | --- | --- | --- |
```

`Class` is one of `tailwind` (a fact about Tailwind CSS 4's compiler, its `@import` forms, `@source`, `@layer`, `properties`, preflight, or generated names), `cascade` (a fact about how two sheets resolve together in Chromium: layer merge order, importance, longhand expansion), `shared` (a fact about the class names both libraries declare and which side wins), `recipe` (a fact about the consumer recipes the guide shipped), `proof` (how the combination was proved: the stage, the readings, the instrument profile, the derived exclusion line).

After the table:

```markdown
## Shared names

The full exclusion list the recipes carry, verbatim, with its citation, and the rule that derives it.

## Recipes

Each recipe the guide ships, its lines described (not pasted), what a consumer changes, and its citation.

## Proof stage

How the service proofs compile a profile, mount markup, read computed styles, and compare standalone against paired readings; the timeouts and floors they declare; each with citation.

## Departures and limits

Every limit the guide or the reports state about the combination, with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every file and range in scope contributes at least one row or bullet.
2. The exclusion list is quoted verbatim once.
3. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
