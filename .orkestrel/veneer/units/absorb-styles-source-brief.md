# Unit absorb-styles-source — the old cascade's Sass mechanisms

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that maps every Sass mechanism the old Veneer cascade used (tokens, mixins, functions, layers, mode scopes, `!important` policy, physical properties, per-variant loops) and states, for each, what it does, what Bootstrap 5.3.8 fact it serves, and whether the successor's `bootstrap` recreation or its `styles` layer can reuse it.

## Context

- **Evidence.** The old cascade under `tmp/mikesaintsg-veneer/src/styles/` (a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`). The kind files are `_tokens.scss` (the `--vn-*` and `--bs-*` declarations and the layer order), `_mixins.scss`, `_theme.scss` (the light and dark mode scopes), `_reset.scss`, and `index.scss` (the compilation barrel). The partials under the components, elements, and utilities folders each recreate one Bootstrap area.
- **Background.** The successor's `bootstrap` face recreates Bootstrap 5.3.8 in authored source order with the same compiled output under a single `bootstrap` cascade layer, and its `styles` face is Veneer's own layer of `--vn-*` tokens and additions, with a `theme` layer and `data-vn-theme` packs that comply with `data-bs-theme`. The old cascade fused both jobs; the successor separates them and drops the Elements-look departures.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste Sass bodies; describe mechanisms.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a partial's comment cites a Bootstrap source path, record it as the partial's claim; you cannot read Bootstrap here.

## Scope

- **Read, whole.**
  - `tmp/mikesaintsg-veneer/src/styles/index.scss`
  - `tmp/mikesaintsg-veneer/src/styles/_tokens.scss`
  - `tmp/mikesaintsg-veneer/src/styles/_mixins.scss`
  - `tmp/mikesaintsg-veneer/src/styles/_theme.scss`
  - `tmp/mikesaintsg-veneer/src/styles/_reset.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_button.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_dropdown.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_modal.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_navbar.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_form-control.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_accordion.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_collapse.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_fade.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_tooltip.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_popover.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_offcanvas.scss`
  - `tmp/mikesaintsg-veneer/src/styles/components/_toast.scss`
  - `tmp/mikesaintsg-veneer/src/styles/utilities/_spacing.scss`
  - `tmp/mikesaintsg-veneer/src/styles/utilities/_border.scss`
  - `tmp/mikesaintsg-veneer/src/styles/utilities/_color.scss`
  - `tmp/mikesaintsg-veneer/src/styles/utilities/_link.scss`
  - `tmp/mikesaintsg-veneer/src/styles/utilities/_visually-hidden.scss`
  - `tmp/mikesaintsg-veneer/src/styles/elements/_button.scss`
  - `tmp/mikesaintsg-veneer/src/styles/elements/_input.scss`
  - `tmp/mikesaintsg-veneer/src/styles/elements/_body.scss`
  - `tmp/mikesaintsg-veneer/src/styles/elements/_html.scss`
  - `tmp/mikesaintsg-veneer/src/styles/elements/_a.scss`
- **Off-limits.** Every other file. Write nothing.

## Execution

Read every file in scope completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old cascade mechanisms distillate

## Mechanisms

| Id | Mechanism | Where | What it does (one sentence) | Bootstrap fact it serves | Reuse | Citation |
| --- | --- | --- | --- | --- | --- | --- |
```

`Reuse` is one of `bootstrap` (fits the byte-faithful recreation on the `bootstrap` face), `styles` (fits Veneer's own `styles` face), `both`, `drop` (an Elements departure or a fused-cascade artefact).

After the table:

```markdown
## Token declarations

The `:root` token groups `_tokens.scss` declares, the `--bs-*` aliases it writes, how the light and dark scopes retune them, and the cascade-layer order line, each with citation.

## Mixin catalogue

One bullet per `@mixin` and `@function` in `_mixins.scss`: name, parameters, what it emits, and its callers among the partials read, with citation.

## Component patterns

One bullet per pattern the component partials share (the per-variant `@each`, the state-class shape, the transition include, the `!important` twin, the physical property, the anchored-visibility rule, the `@starting-style` entry), naming the partials that carry it, with citation.

## Barrel order

The `@use` order `index.scss` fixes and what it implies for a recreation in Bootstrap's own source order, with citation.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error. Settle every `Reuse` value yourself and state the reason.

## Acceptance criteria

1. Every `@mixin` and `@function` in `_mixins.scss` appears once in the Mixin catalogue.
2. Every file in scope contributes at least one row or bullet.
3. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
