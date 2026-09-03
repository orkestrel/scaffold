# Unit interpret-prose — report

## Row 1 — `via` and `e.g.`

Sites changed, with the sense fixed and the line now:

- `tests/setup.ts:323` — "through the class's own public API".
- `tests/src/core/stages/Clarifier.test.ts:13` — "(through `seedInterpretContext`)".
- `tests/src/core/stages/Clarifier.test.ts:111` (title) — "resolves a computed field through resolveExpression against resolved bindings".
- `tests/src/core/stages/Normalizer.test.ts:24` — "expands to \"cannot\" through the built-in contraction FIRST".
- `tests/src/core/Narrator.test.ts:25` — "supplied through the lexicon/formatters seam".
- `tests/src/core/Narrator.test.ts:455` — "input elsewhere (for example tests/src/core/raters/validators.test.ts)".
- `tests/src/core/factories.test.ts:91` (title) — "honors construction hooks through emitter events".
- `tests/src/core/factories.test.ts:183,198,217` (titles) — "honors a custom id through add options" (all three, `replace_all`).

Sweep in row 5 found one more site not in the Evidence list, fixed the same way:

- `tests/src/core/stages/Clarifier.test.ts:13` (see above — the Evidence line 13 citation and the `via` site are the same line).

## Row 2 — citations

Every `design §N` / `ledger N` parenthetical resolves to no document in this repository. Following the router precedent, each parenthetical is deleted rather than restated, because the underlying fact behind an unresolvable citation cannot be stated inline without inventing it (Deviation contract: "A citation whose fact cannot be stated inline is deleted, not escalated").

Sites changed:

- `tests/src/core/integration.test.ts:19` — "...and determinism + digest-replay."
- `tests/src/core/helpers.test.ts:288` (title) — "never auto-classifies from a domain name absent from the caller vocabulary".
- `tests/src/core/managers/SubjectManager.test.ts:8` — "...remove, DESTROYED after teardown."
- `tests/src/core/managers/DefinitionManager.test.ts:9` — "...DESTROYED after teardown."
- `tests/src/core/managers/TemplateManager.test.ts:9` — "...remove, and DESTROYED after teardown."
- `tests/src/core/Interpret.test.ts:30` — "...reverse passthroughs, emitter, and DESTROYED teardown."
- `tests/src/core/stages/Extractor.test.ts:5` — "...number mining only, never entity assignment."
- `tests/src/core/stages/Clarifier.test.ts:12` — "...floor-gated ambiguities. Drives a REAL".
- `tests/setup.ts:127` — "The redesign has no built-in worldview — every domain/action word...".
- `tests/setup.ts:139` — "A template's own `domain` no longer auto-classifies — a caller MUST list...".

Sweep in row 5 found one more site not in the Evidence list: `tests/src/core/helpers.test.ts:288` (listed above; carried by the Evidence's "sites the sweep in row 5 finds" clause).

## Row 3 — `as const`

`guides/interpret.md`'s `scoreTemplate` fence (line 411 originally, reflowed by `oxfmt` afterward) declared `template` untyped and asserted `reasoning: 'symbolic' as const`. `src/core/types.ts:129` names the published `Template` interface as the shape `scoreTemplate`'s second parameter takes. The fence now imports `type { Template }` from `@orkestrel/interpret` and annotates `const template: Template = { ... }`, so `reasoning: 'symbolic'` (no assertion) narrows through the annotation, the same way `tests/guides.test.ts`'s inline transcription (an argument passed directly to `scoreTemplate`, so it needs no restatement) already narrowed without `as const`.

`npm --prefix /home/user/fleet/interpret run test:guides` before the edit was not run separately (the row-3 reading is folded into the full `test` gate below); after the edit `test:guides` reports:

```
Test Files  1 passed (1)
     Tests  95 passed (95)
```

## Row 4 — the tally

Sites changed:

- `src/core/types.ts:35` — "Names the fixed pipeline phases..." (drops the numeral; the type union on the following line already lists the members).
- `src/core/types.ts:279` — "`stages` always holds one record per phase, `[normalize, extract, clarify, format, generate]`, in order." (drops the numeral; the bracketed list already names the members).
- `guides/interpret.md` line at the tagline — "`stage` splits the `[normalize, extract, clarify, format, generate]` pipeline phases,...".
- `guides/interpret.md` line at the Surface intro — "interpret text through the normalize/extract/clarify/format/generate pipeline,...".
- `guides/interpret.md` line after the fence — "runs the fixed pipeline `[normalize, extract, clarify, format, generate]`;...".
- `guides/interpret.md`'s `InterpretStage` type row — "...the fixed pipeline phases, in order." (drops the numeral; the row's own union literal lists the members).
- `guides/interpret.md`'s `Interpret` entity row — "...runs the `[normalize, extract, clarify, format, generate]` pipeline,...".
- `guides/interpret.md`'s `interpret` method row — "Run the `[normalize, extract, clarify, format, generate]` pipeline over raw text,...".

The sweep in row 5 found two more "five" sites inside the owned `tests/**`, not in the Evidence list, fixed the same way:

- `tests/src/core/Interpret.test.ts:28` — "registry, synchronous `[normalize, extract, clarify, format, generate]` pipeline,...".
- `tests/src/core/Interpret.test.ts:69` (title) — "runs the normalize/extract/clarify/format/generate stages in order and produces a complete result".

## Row 5 — sweep

Sweeps `\bvia\b`, `e\.g\.`, `design §|ledger [0-9]|§[0-9]`, `as const`, and `\b(five|5)[- ](stage|fixed|record|phase|pipeline)|\bfive\b` (case-insensitive), run over the Owned files (`tests/**` except the vendored exclusions, `guides/interpret.md`) after every row's edits, read empty.

Rulings on remaining hits found by the same sweeps in files outside this brief's Owned scope (not edited; Owned is `src/core/types.ts`'s two doc sentences, `guides/interpret.md`, and `tests/**`):

- `src/core/Interpret.ts:49,454`, `src/core/helpers.ts:17`, `src/core/factories.ts:40` — "five-stage" / "exactly five" — off-limits `src` files outside the two owned `types.ts` doc sentences; not touched.
- `README.md:66,73` — "fixed five-stage" / "five pipeline" — off-limits file (not in Owned); not touched.

`guides/README.md` carries no hit for any of the sweep patterns.

## Gates

Run in the Method's order, each one plain command, each exit code read from the command's own output:

| Gate | Command | Exit |
| --- | --- | --- |
| Guide fence proof | `npm --prefix /home/user/fleet/interpret run test:guides` | 0 (95 passed) |
| `format:check` (first pass) | `npm --prefix /home/user/fleet/interpret run format:check` | non-zero — `guides/interpret.md` reformatted by an earlier `Edit` (the row-4 line wraps); converged with `npx oxfmt --config .oxfmtrc.json guides/interpret.md` on the owned file only |
| `format:check` (converged) | `npm --prefix /home/user/fleet/interpret run format:check` | 0 |
| `lint:check` | `npm --prefix /home/user/fleet/interpret run lint:check` | 0 |
| `check` | `npm --prefix /home/user/fleet/interpret run check` | 0 |
| `build` | `npm --prefix /home/user/fleet/interpret run build` | 0 |
| `test` | `npm --prefix /home/user/fleet/interpret test` | 0 (`test:src` 285 passed, `test:policy` 111 passed, `test:config` 46 passed, `test:setup` 31 passed, `test:guides` 95 passed) |

## Audit

`cd /home/user/fleet/interpret && npx scaffold audit --offline`:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs interpret`:

```
/home/user/work/evidence/conform-interpret.diff 390 lines
/home/user/work/evidence/conform-interpret.status 14 entries
```

`git -C /home/user/fleet/interpret status --short` lists 14 modified paths, all inside the Owned scope: `guides/interpret.md`, `src/core/types.ts`, `tests/setup.ts`, `tests/src/core/Interpret.test.ts`, `tests/src/core/Narrator.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/integration.test.ts`, `tests/src/core/managers/DefinitionManager.test.ts`, `tests/src/core/managers/SubjectManager.test.ts`, `tests/src/core/managers/TemplateManager.test.ts`, `tests/src/core/stages/Clarifier.test.ts`, `tests/src/core/stages/Extractor.test.ts`, `tests/src/core/stages/Normalizer.test.ts`.

## Fix round 1

Sites rewritten, with the line now:

- `src/core/Interpret.ts:47-50` (TSDoc `@remarks`) — "`interpret()` is genuinely SYNCHRONOUS — it returns its {@link Interpretation} directly, never a `Promise` — and runs the fixed pipeline `[normalize, extract, clarify, format, generate]` — each producing one {@link StageRecord}." (drops "five-stage"; the bracketed list already names the members).
- `src/core/Interpret.ts:453-454` (comment above `#assemble`) — "pad the un-run stages with skipped records so `stages` always holds one record per phase, digest over the known pre-image,..." (drops "exactly five").
- `src/core/helpers.ts:17` (module header comment) — "Stateful orchestration (the fixed pipeline, entity assignment sequencing, template registration) lives on the `Interpret` orchestrator..." (drops "five-stage").
- `src/core/factories.ts:40` (TSDoc `@remarks`) — "`interpret()` is genuinely synchronous and runs the fixed pipeline `[normalize, extract, clarify, format, generate]`." (drops "five-stage"; the bracketed list already names the members).
- `README.md:66` — "`interpret()` is genuinely synchronous and runs the fixed pipeline `[normalize, extract, clarify, format, generate]`." (drops "five-stage").
- `README.md:73` — "For the full surface — the `Interpret` orchestrator, the pipeline stages, the template/subject/definition managers,..." (drops "five").

### Sweep

`grep -rniE '\bfive\b|\b5[- ](stage|phase|record)'` over `src`, `README.md`, `guides/interpret.md`, and `guides/README.md`, run after the six edits, reads empty.

### Gates

Run in the Method's order, each one plain command, each exit code read from the command's own output:

| Gate | Command | Exit |
| --- | --- | --- |
| `format:check` | `npm --prefix /home/user/fleet/interpret run format:check` | 0 (69 files) |
| `lint:check` | `npm --prefix /home/user/fleet/interpret run lint:check` | 0 |
| `check` | `npm --prefix /home/user/fleet/interpret run check` | 0 |
| `build` | `npm --prefix /home/user/fleet/interpret run build` | 0 |
| `test` | `npm --prefix /home/user/fleet/interpret test` | 0 (`test:src` 285 passed, `test:policy` 111 passed, `test:config` 46 passed, `test:setup` 31 passed, `test:guides` 95 passed) |

### Audit

`cd /home/user/fleet/interpret && npx scaffold audit --offline`:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

### Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs interpret`:

```
/home/user/work/evidence/conform-interpret.diff 461 lines
/home/user/work/evidence/conform-interpret.status 18 entries
```

`git -C /home/user/fleet/interpret status --short` lists 18 modified paths: the first round's 14 (`guides/interpret.md`, `src/core/types.ts`, `tests/setup.ts`, `tests/src/core/Interpret.test.ts`, `tests/src/core/Narrator.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/integration.test.ts`, `tests/src/core/managers/DefinitionManager.test.ts`, `tests/src/core/managers/SubjectManager.test.ts`, `tests/src/core/managers/TemplateManager.test.ts`, `tests/src/core/stages/Clarifier.test.ts`, `tests/src/core/stages/Extractor.test.ts`, `tests/src/core/stages/Normalizer.test.ts`) plus this round's `README.md`, `src/core/Interpret.ts`, `src/core/factories.ts`, `src/core/helpers.ts`.
