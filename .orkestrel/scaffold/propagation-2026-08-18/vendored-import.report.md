- Vendored-import scan: checked all 32 `HOST_PATHS` entries:
  `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `.agents/orchestration.md`, `.agents/skills`, `.claude/agents`, `.claude/rules`, `.claude/skills`, `.claude/settings.json`, `.codex/agents`, `.codex/config.toml`, `.cursor/mcp.json`, `.cursor/rules`, `.mcp.json`, `scripts/deps.sh`, `scripts/cursor.sh`, `scripts/codex.sh`, `scripts/ollama.sh`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.editorconfig`, `.gitattributes`, `.gitignore`, `.oxfmtrc.json`, `.oxlintrc.json`, `.oxlintignore`, `.prettierignore`, `guides/guide.md`, and `guides/scaffold.md`.
  The 10 eligible `.ts`, `.js`, or `.json` files initially contained one import: `tests/config.test.ts:18` imported `@orkestrel/test/server`. The final scan found zero imports.

- Scratch factory signature:

```ts
export interface ScratchInterface {
	readonly path: string
	write(target: string, text: string): void
	destroy(): void
}

export function createScratch(options: { readonly prefix: string }): ScratchInterface
```

- `.claude/rules/workspace.md`:

```md
- When a file is vendored byte-identical, import nothing that fails to resolve in any target. Import
  no `@orkestrel/*` package from it: every such package is itself a target and cannot depend on
  itself.
```

- `.claude/rules/tests.md`:

```md
- For the vendored test set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, and
  `tests/config.test.ts`), keep shared helpers within that set instead of importing them from
  `@orkestrel/test`; follow the vendored-file import law in `.claude/rules/workspace.md`.
```

- Guard proof command:

```sh
npx vitest run --project src:server tests/src/server/helpers.test.ts -t "keeps every vendored code file independent of Orkestrel packages"
```

  - Red: exit 1; 1 failed, 155 skipped. The sole offending path was `tests/config.test.ts`.
  - Green: exit 0; 1 passed, 155 skipped.

- Acceptance commands:

  1. `grep -rn "@orkestrel/" tests/config.test.ts tests/setupPolicy.ts`: exit 1 as expected; 0 matches.
  2. Guard command above: exit 0; 1 passed, 155 skipped.
  3. `npx vitest run --project config`: exit 1; 27 passed, 1 failed. Failure: sandbox denied nested Oxlint execution with `spawnSync …/node_modules/.bin/oxlint EPERM`.
  4. `npx vitest run --project src:server`: exit 1; 326 passed, 31 failed. Failures reported sandbox-denied loopback `listen EPERM` and `spawnSync git EPERM`.
  5. `npm run check`: exit 0; 4 TypeScript checks completed with 0 errors.
  6. `npx oxlint --config .oxlintrc.json --deny-warnings tests/ .claude/`: exit 0; 0 errors and 0 warnings.
  7. `npx prettier --check --no-semi --single-quote --trailing-comma all --print-width 100 --use-tabs --tab-width 2 tests/setupPolicy.ts tests/config.test.ts .claude/rules/workspace.md .claude/rules/tests.md tests/src/server/helpers.test.ts`: exit 0; all 5 files matched.