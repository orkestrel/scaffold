Guide is frozen. No post-implementation validation ran.

My current Guide edits are:

- `src/server/types.ts`
- `src/server/index.ts`
- `src/server/helpers.ts`
- `src/server/parsers.ts`
- `src/server/GuideCommand.ts`
- `tests/setupServer.ts`
- `tests/src/server/GuideCommand.test.ts`

Partial state:

- The server contracts, barrel rows, helper/parser drafts, and `GuideCommand` implementation draft exist.
- The command implementation has not received a typecheck, lint, formatter, or test run.
- The red proof has no green rerun.
- Focused helper/parser tests, worker-inventory coverage, package exports/scripts, and guide parity updates remain uncompleted.
- No patch operation was interrupted mid-write. The latest source patch returned successfully.
- Root-generated `tsconfig.json`, `vite.config.ts`, and server config files remain separate from my product edits.
- Existing core, guide, and core-test changes predate this resumed unit and remain untouched by me.

Existing receipts:

- Root configuration apply: receipt `51144d`, exit `0`.
- Root server-project typecheck before implementation: receipt `38cad8`, exit `0`, no diagnostics.
- Registered Probe refused with `Legacy protocol 2025-11-25 cannot represent a stream result`; no receipt.
- Root direct-port TypeScript check: receipt `caf831`, exit `0`, no diagnostics.
- Red command: `node_modules/.bin/vitest.cmd run --config vite.config.ts --no-cache --reporter=dot --project src:server`, exit `1`; raw result reported `1 failed | 1 passed`.
- The earlier formatter attempt was interrupted and exited `1`; it established no formatter result.

This hold is not source acceptance.
