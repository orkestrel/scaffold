# Unit toolbox-prose — report

Role and engine: `builder` on Claude Sonnet, sole writer in `/home/user/fleet/toolbox`, dispatched from landed tip `5c4228c` (tree was clean).

## Changes

- `/home/user/fleet/toolbox/src/core/types.ts` — 10 banned-sense hits rewritten (`via`→`through`, `and/or`→`and`, `e.g.`→`for example`, `currently` deleted).
- `/home/user/fleet/toolbox/src/core/constants.ts` — 8 hits rewritten across the repeated `TOOL_DESCRIPTION` sentences and the pending-forms strings.
- `/home/user/fleet/toolbox/src/core/factories.ts` — 19 hits rewritten (`via`→`through`, `i.e.`→`that is`, `guarantee`/`ensure` reworded off the behaviour-claim sense).
- `/home/user/fleet/toolbox/src/core/shapers.ts` — 5 hits rewritten.
- `/home/user/fleet/toolbox/tests/setupServer.ts` — 2 `currently` hits deleted.
- `/home/user/fleet/toolbox/tests/src/core/factories.test.ts` — 12 hits rewritten; 3 `via`-carrying identifier literals (`'via-mgr'`, `'via-manager'`) left as permitted data.
- `/home/user/fleet/toolbox/tests/src/server/terminals/TerminalBridge.test.ts` — 1 hit rewritten.
- `/home/user/scaffold/tmp/units/followon/toolbox-prose-report.md` — the required output file, with every rewrite's `file:line` before/after, map-adoption notes, the re-run sweep, `git status --short`, and gate exit codes.

`tests/src/core/stores/DatabaseDefinitionStore.test.ts` was inspected and left unchanged: its one `just` hit is a fixture string literal (`'just a string'`), permitted per the map and re-ruled.

## Scoped validation

| Gate | Command | Result |
| --- | --- | --- |
| Format | `npm run format:check` | exit 0 |
| Lint | `npm run lint:check` | exit 0 |
| Typecheck | `npm run check` | exit 0 |
| Guide parity | `npm run test:guides` | 28 tests passed, exit 0 |
| `src:core` scoped | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts` | 201 tests passed, exit 0 |
| `src:server` scoped | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/terminals/TerminalBridge.test.ts` | 33 tests passed, exit 0 |

`npx oxfmt --config .oxfmtrc.json guides/toolbox.md` was run after the guide rewrites; its diff realigned trailing table-column padding on three lines only, no content change, read before acceptance.

Re-running every substitution pattern (`\bvia\b`, `e\.g\.`, `i\.e\.`, `\bcurrently\b`, `\bsimply\b`, `\bjust\b`, `\band/or\b`, `\bensure`, `\bguarantee`) over `src`, `tests` minus the vendored set, `guides/toolbox.md`, `guides/README.md`, and `README.md` after the rewrites returns only permitted hits: 3 identifier literals in `tests/src/core/factories.test.ts` and 1 fixture string literal in `DatabaseDefinitionStore.test.ts`.

`git status --short` lists only the eight owned files above.

No deviation occurred — no gate reddened, no hit sat in a code identifier requiring a rename, and no guide-cell rewrite changed the parity suite's reading in a way an edit couldn't restore.
