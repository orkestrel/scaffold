# Unit absorb-generator-core — how the scaffold generator carries an environment from type to emitted file

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that traces, through the four core files of `@orkestrel/scaffold`, how an environment (`core`, `browser`, `server` on the `src` and `app` axes) and each structural fact (`bin`, `setup`, `guides`, `integration`, `conformance`, `service`, `vendors`, `global`, `showcase`, `journey`, `skills`) becomes emitted files, scripts, exports, dependencies, tsconfigs, Vite factories, and test projects, and states for each of thirteen target behaviours (listed under Context) the exact compiler function, template, constant, and ownership it would attach to, so a design round can add a styles surface, a journey surface, a showcase surface, and a named extension mechanism without guessing.

## Context

- **Evidence.** `src/core/types.ts` (594 lines), `src/core/constants.ts` (557), `src/core/compilers.ts` (2615), `src/core/templates.ts` (2339) of `C:\Users\mikes\WebstormProjects\scaffold`. The map `tmp/units/propagation-map.txt` lists their exports and a census of `showcase`, `journey`, `styles`, `vue`, `surface`, `environment`, and `extension`.
- **Background.** A target package (`@orkestrel/veneer`) hand-edited eight vendored files to carry behaviours the generator does not emit. The thirteen behaviours a design round must place are: (1) a CSS face `src/<name>` with the style kind files (`index.scss`, `index.ts` or `sheet.ts`, `_tokens.scss`, `_mixins.scss`, `_reset.scss`, folder barrels), a Vite wrapper with `cssMinify: false`, an `outputBoundary`, CSS and `/scss` `exports`, `files` and `sideEffects` entries, and an empty `index.js` stub excluded from `files`; (2) a Chromium test project per CSS face composed through one `sheetProject` factory with `setup.ts`, `setupBrowser.ts`, `setupStyles.ts`, `isolate: false`, and `optimizeDeps.include` of the shared test packages; (3) a `conformance` project row and `test:conformance` script when `tests/conformance.test.ts` exists; (4) a `setup:browser` project row when `tests/setupBrowser.test.ts` exists; (5) an `integration` project row in Chromium; (6) `src/vue` and `app/vue` environments: `@app/vue` alias, `vue-tsc` on the root check when the root includes `.vue` files, lint import-restriction blocks, browser-side classification in the boundary helpers, `isVueBuildExternal`-style refusal of `vue` and `@vue/*` until an optional peer is declared, a `journey:vue` mode collecting `tests/app/vue/integration.test.ts`, and a `showcase/vue.html` mode; (7) showcase pages at root `showcase/<mode>.html` with no copy step, a `build-id` stamp equal to the SHA-256 of the final inlined page without its stamp line, `prepublishOnly` rebuilding both modes, and `.prettierignore` listing `showcase/`; (8) journey variant projects through `appJourney` with `provide` of `variant`, `variants`, and `capture`; (9) `isCoreBuildExternal` (externalize `node:` and `@orkestrel/*` and the peers) in the core wrapper; (10) `rewriteBrowserSpecifier` in the declaration rollup of a face that imports `@src/browser`; (11) `computeStamp` and `stampPage` helpers; (12) `showcaseBuildOutput`, `showcaseHtmlEntry`, `showcaseHtmlPresent`, and `journeyTestInclude` mode helpers; (13) the vendored `tests/config.test.ts` cases for all of the preceding.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste function bodies.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where a template string embeds a placeholder such as `{{journey}}`, record what fills it and where.

## Scope

- **Read, whole.**
  - `src/core/types.ts`
  - `src/core/constants.ts`
  - `src/core/compilers.ts`
  - `src/core/templates.ts`
- **Read for orientation.** `tmp/units/propagation-map.txt`.
- **Off-limits.** Every other file. Write nothing.

## Execution

Read the four files completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Generator core distillate

## Environment flow

| Environment and axis | Types and constants (rows) | Scripts emitted | Exports and files | Dependencies | tsconfig wrappers | Vite wrappers and root factories | Test project (label, runtime, setup files) | Citation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
```

One row per environment per axis (`src/core`, `src/browser`, `src/server`, `app/core`, `app/browser`, `app/server`) and one row for `src/bin`.

```markdown
## Structural facts

| Fact | What sets it | What it adds (scripts, projects, wrappers, artifacts, dependencies, questions) | Ownership of each added artifact | Citation |
| --- | --- | --- | --- | --- |
```

One row per fact.

```markdown
## Templates

| Template (path in `CONFIG_TEMPLATES` or `ARTIFACT_TEMPLATES`) | Emits | Placeholders and what fills them | Ownership | Citation |
| --- | --- | --- | --- | --- |
```

One row per template.

```markdown
## Ownership model

One bullet per ownership value (`content`, `presence`, `birth`) and per origin (`host`, `template`, `computed`): what it means, which artifacts carry it, and what `repair` does with it as the core files state (cite the type's TSDoc and the compiler that assigns it).

## Where each target behaviour attaches

| Behaviour (1 to 13) | Compiler function | Template | Constant or type | Ownership it would carry | What exists today that is closest | Citation |
| --- | --- | --- | --- | --- | --- | --- |
```

One row per behaviour in the Context list.

```markdown
## Vue today

One bullet per place the four files mention `vue` and what each does (the `ViteMachinery.vue` flag, the plugin, the types, the dependencies, the `vue-tsc` script).

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every environment-axis pair and every structural fact has one row.
2. Every template has one row.
3. Every one of the thirteen behaviours has one row.
4. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
