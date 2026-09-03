# Unit setup-axis — report

## Rows

1. **abort-setup-1.** applied. `/home/user/fleet/abort/tests/setup.ts` deletes `isBrowserVuePath` and its doc comment; the two-line header comment is the file's whole content.
2. **abort-setup-2.** applied. `/home/user/fleet/abort/tests/setup.test.ts` rewritten to the exemplar, byte for byte.
3. **emitter-setup-1.** applied. `/home/user/fleet/emitter/tests/setup.test.ts` created as the exemplar, byte for byte.
4. **emitter-setup-2.** applied. `/home/user/fleet/emitter/package.json` regains the `test:setup` script row (last row of `scripts`, after `prepack`) and the `&& npm run test:setup` step in the `test` chain between `test:config` and `test:guides`.
5. **emitter-setup-3.** applied. `/home/user/fleet/emitter/vite.config.ts` regains the `setup` project export (placed between `config` and `guides`) and `setup` in the default export's `projects` array (between `config` and `guides`).

## abort — gates

- `npm run test:setup` — exit 0 (1 file, 1 test passed)
- `npm run format:check` — exit 0
- `npm run lint:check` — exit 0
- `npm run check` — exit 0
- `npm run build` — exit 0
- `npm test` — exit 0 (`test:src` 51 passed, `test:policy` 111 passed, `test:config` 46 passed, `test:setup` 1 passed, `test:guides` 22 passed)
- `npx scaffold audit --offline` — `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

## emitter — gates

- `npm run test:setup` — exit 0 (1 file, 1 test passed)
- `npm run format:check` — exit 0
- `npm run lint:check` — exit 0
- `npm run check` — exit 0
- `npm run build` — exit 0
- `npm test` — exit 0 (`test:src` 43 passed, `test:policy` 111 passed, `test:config` 46 passed, `test:setup` 1 passed, `test:guides` 20 passed)
- `npx scaffold audit --offline` — `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

## Paths touched

- `/home/user/fleet/abort/tests/setup.ts`
- `/home/user/fleet/abort/tests/setup.test.ts`
- `/home/user/fleet/emitter/tests/setup.test.ts` (created)
- `/home/user/fleet/emitter/package.json` (`scripts` field only)
- `/home/user/fleet/emitter/vite.config.ts`

## Evidence

`node /home/user/scaffold/tmp/work/evidence.mjs abort` wrote `/home/user/work/evidence/conform-abort.diff` (41 lines) and `conform-abort.status` (2 entries).
`node /home/user/scaffold/tmp/work/evidence.mjs emitter` wrote `/home/user/work/evidence/conform-emitter.diff` (73 lines) and `conform-emitter.status` (3 entries), and reported `git add -N: tests/setup.test.ts` for the new untracked file.

No deviation occurred.
