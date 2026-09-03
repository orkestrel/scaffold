## Fix round 1

**`vite.config.ts` — the repair's diff against the unit's own file.** `npx scaffold repair --groups configs`, run over a copy of `package.json` restored after the repair, rewrote `vite.config.ts` alone in this row and reported `vite.config.ts replaced (4 lines removed)`. The generated `integration` project factory sits after `distribution` in the file, and the `integration` name sits after `distribution` in the `projects` array, matching where this unit had placed it. The repair removed the unit's three-line comment above the factory — the one explaining why the proof stays in `npm test` — and removed `browser: { enabled: false }` from the `integration` test block, the two members the plan does not generate for that project. `npm run test:integration` ran against the repaired file: 1 file, 1 test, both passed.

**Manifest restore.** `package.json` was copied to `package.json.orig` before the repair and copied back after it, then the copy was removed. `git -C /home/user/fleet/lsp diff -- package.json` shows only the unit's own hunks — `description`, `keywords`, the `test` chain, and `test:integration` — and no `@types/node`, `oxfmt`, `oxlint`, or `vite-plugin-dts` floor change.

**The new proof, `tests/setup.test.ts`.** It imports `* as setup from './setup.js'`, and asserts `Object.keys(setup)` equals `['WORKSPACE_ROOT']` and that reading the `name` field of the `package.json` reachable from `setup.WORKSPACE_ROOT` returns `@orkestrel/lsp`. `resolveRoot` returns a `URL`, so the reader resolves `package.json` against it with `new URL('package.json', root)` rather than a string join, narrowing the parsed manifest with a guard before reading `name`.

- Green reading, `npm run test:setup`: 3 files, 15 tests, all passed.
- Planted red: the checkout-name assertion was changed to expect `@orkestrel/wrong-name-plant`. `npm run test:setup` then reported 1 failed, 14 passed, with `AssertionError: expected '@orkestrel/lsp' to be '@orkestrel/wrong-name-plant'` at the planted line. The assertion was restored to `@orkestrel/lsp` immediately after the reading.

**Gates**, each run from `/home/user/fleet/lsp`:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | Root, `check:src:core`, `check:src:server` all clean |
| `npm run build` | 0 | Core and server faces built, declarations copied |
| `npm test` | 0 | src, policy, setup, config, guides, conformance, and integration projects all passed |
| `npx scaffold audit --offline` | 0 | `0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 0.` — no advisory |

`node /home/user/scaffold/tmp/work/evidence.mjs lsp` wrote `/home/user/work/evidence/conform-lsp.diff` (866 lines) and `/home/user/work/evidence/conform-lsp.status` (17 entries), and reported `git add -N: tests/setup.test.ts` for the new proof.

`git -C /home/user/fleet/lsp status --short` lists the unit's own paths plus `A tests/setup.test.ts`. No other path changed.
