# Unit absorb-generator-host — the scaffold CLI, the repair model, the vendored config proof, and the guide's claims

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that states how the scaffold CLI derives a target's blueprint, how `repair`, `overwrite`, and `audit` treat each ownership, how `host.json` records vendored files, which cases the vendored `tests/config.test.ts` generates per environment and structural fact, and every sentence of `guides/scaffold.md` that fixes what the generator emits for environments, the showcase, the journey, Vue, styles, and the limits, so a design round can change the generator with its own proof and guide in step.

## Context

- **Evidence.** `src/bin/CLI.ts` (1495 lines), `src/bin/helpers.ts` (1257), `src/server/Materializer.ts` (1277), `tests/config.test.ts` (2510, the proof scaffold vendors to every target), and `guides/scaffold.md` (1948) of `C:\Users\mikes\WebstormProjects\scaffold`. The map `tmp/units/propagation-map.txt` lists exports and headings.
- **Background.** A companion distillate covers the four core files. A target package hand-edited eight vendored files (`tsconfig.json`, `vite.config.ts`, `configs/src/vite.core.config.ts`, `configs/app/vite.showcase.config.ts`, `configs/helpers.ts`, `.oxlintrc.json`, `.prettierignore`, `tests/config.test.ts`); a design round must decide how the generator carries those behaviours and how `repair` restores them.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste function bodies.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command.

## Unknowns

Where the guide and the code disagree, record both citations under Unknowns.

## Scope

- **Read, whole.**
  - `src/bin/CLI.ts`
  - `src/bin/helpers.ts`
  - `src/server/Materializer.ts`
  - `tests/config.test.ts`
  - `guides/scaffold.md`
- **Read for orientation.** `tmp/units/propagation-map.txt`.
- **Off-limits.** Every other file. Write nothing.

## Execution

Read the five files completely, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Generator host distillate

## Verbs and options

| Verb | Options | What it reads | What it writes | Citation |
| --- | --- | --- | --- | --- |
```

One row per verb.

```markdown
## Derivation

One bullet per input `#derive` (or its helpers) reads to build the blueprint: the axis directories, each structural fact's file, the journey rule, the Vue rule, with citation.

## Repair, overwrite, and audit by ownership

| Ownership and origin | `audit` reports | `repair` writes | `overwrite` writes | `host.json` records | Citation |
| --- | --- | --- | --- | --- | --- |
```

One row per ownership-origin pair the code distinguishes.

```markdown
## The vendored config proof

| Case (describe and it titles) | Environment or fact it covers | What it asserts (one sentence) | Citation |
| --- | --- | --- | --- |
```

One row per `it` in `tests/config.test.ts`.

```markdown
## The guide's claims

| Section | Claim (one sentence) | Subject (environment, showcase, journey, Vue, styles, limit, repair) | Citation |
| --- | --- | --- | --- |
```

One row per sentence of `guides/scaffold.md` that fixes what the generator emits or refuses for those subjects, including every sentence that names `styles`, `showcase`, `journey`, `vue`, or `repair`.

```markdown
## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If a file cannot be read, stop and report the path and the error.

## Acceptance criteria

1. Every verb has one row; every ownership-origin pair has one row.
2. Every `it` in `tests/config.test.ts` has one row.
3. Every guide sentence naming `styles`, `showcase`, `journey`, `vue`, or `repair` has one row.
4. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
