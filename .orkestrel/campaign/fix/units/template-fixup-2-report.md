# Report — unit template-fixup-2 (builder, Sonnet)

Finding closed: `src/core/TemplateManager.ts:185-193` removes each present id, emits `remove`
per removed instance, and returns `true` only when every listed id was present; the pre-check
loop is gone. TSDoc restated at `TemplateManager.ts:35-36`, `:161-164`, and
`src/core/types.ts:225-227`; guide sentences at `guides/template.md:197-199` and `:239`; tests at
`tests/src/core/TemplateManager.test.ts:194-202` and `:250-259`. The `remove` Methods row states
no batch meaning and is unchanged.

Red-then-green (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/TemplateManager.test.ts`):
2 failed, 38 passed before the branch changed (expected `false` got `true`; expected 1 `remove`
event got 0); 40 passed after.

Sweep `all-or-nothing` case-insensitive over `src`, `tests`, `guides/template.md`, `README.md`:
one hit at `TemplateManager.ts:35` fixed; re-run clean. Gates: format:check 0, lint:check 0,
check 0, build 0, test 0 (src 125, policy 111, config 46, setup 2, guides 23).
`git status --short`: `guides/template.md`, `src/core/TemplateManager.ts`, `src/core/types.ts`,
`tests/src/core/TemplateManager.test.ts`.
