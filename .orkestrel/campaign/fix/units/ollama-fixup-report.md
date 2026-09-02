# Report — unit ollama-fixup

Executor: `builder` on Claude Sonnet, native subagent. Brief:
`tmp/units/breaking/ollama-fixup-brief.md`.

## Finding closed

Renamed `OllamaErrorOptions` → `OllamaHTTPErrorOptions` at every named site:

- `src/server/types.ts:152` — interface declaration (the TSDoc at lines 143-151 names
  `OllamaHTTPError` through `{@link}` and needed no change).
- `src/server/errors.ts:6` — type import; `src/server/errors.ts:32` — constructor parameter type.
- `guides/ollama.md:69` — Surface table row.
- `tests/src/server/errors.test.ts:1` — type import; `:6` — comment prose; `:10` — test title;
  `:12` — local declaration.

No collision with an existing export. Imports stayed single-specifier per file; no reordering.

## Sweep

`rg -n 'OllamaErrorOptions' -i src tests guides/ollama.md README.md` → exit 1, no matches.
`README.md` never referenced the old name.

## Gates

- `npm run format:check` — exit 0 (after one `oxfmt` pass to converge a `guides/ollama.md`
  table-width reflow caused by the longer name, per the brief's allowance).
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run build` — exit 0.
- `npm test` — exit 0 (`src:server` 98 passed, `setup` 86 passed, `policy` 111 passed,
  `config` 46 passed, `guides` 18 passed, `conformance` 17 passed).

## `git diff --stat`

```text
 guides/ollama.md                | 2 +-
 src/server/errors.ts            | 4 ++--
 src/server/types.ts             | 2 +-
 tests/src/server/errors.test.ts | 8 ++++----
 4 files changed, 8 insertions(+), 8 deletions(-)
```

## `git status --short`

```text
 M guides/ollama.md
 M src/server/errors.ts
 M src/server/types.ts
 M tests/src/server/errors.test.ts
```

## Deviations

none.
