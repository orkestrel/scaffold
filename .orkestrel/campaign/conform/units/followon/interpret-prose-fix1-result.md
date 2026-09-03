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
