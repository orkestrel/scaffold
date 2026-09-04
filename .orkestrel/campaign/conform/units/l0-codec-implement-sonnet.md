# Report: conform-codec

Files touched (owned scope, all in `/home/user/fleet/codec`):
- `tests/src/core/validators.test.ts` (created) — the four moved guard-family blocks under the refuter's amended import list.
- `tests/src/core/helpers.test.ts` — removed the moved blocks and their now-unused imports.
- `guides/codec.md` — added the `validators.test.ts` Tests row; recast thirteen Behavior cells as noun phrases; changed `decodeBase64('AQ ID')` to `'AQ D'`.
- `README.md` — recast the same thirteen cells in its own wording; same vector change.
- `tests/guides.test.ts` — updated the transcribed assertion to `'AQ D'`.
- `tests/setup.ts` — updated the `MEMBERSHIP` whitespace row, reworded the `'AAAA\n'` reason, renamed `kind` to `mutation`.

Row dispositions: codec-obj-1 `applied`, codec-subj-2 `applied`, codec-subj-3 `applied` (with one ancillary decision — README `:37`'s `decodeWindows1252` cell already reads as a noun phrase, left unchanged), codec-subj-4 `applied`. fleet-F1 `noop` (helper absent), fleet-F2 `noop` (no class in the shape; the sole `readonly id: string` hit is a string literal in the off-limits `tests/setupPolicy.ts:2882`).

Failing-first proof for codec-obj-1: planted a deliberately failing control in the new file, ran `npm run test:src`, captured `1 failed | 157 passed (158)` at `/home/user/work/evidence/codec-proofs/codec-obj-1-red.txt`; replaced it with the real moved content, reran, captured `2 passed (2)` files / `157 passed (157)` tests (matches the pre-move baseline) at `codec-obj-1-green.txt`.

Sweeps (all empty/clean): `kind` in `tests/setup.ts`, `AQ ID` repo-wide, the four old verb-led cell patterns in both guide files, the deleted-import names in `helpers.test.ts`, and `isBrowserVuePath` / `readonly id: string` for the fleet rows.

Gates, all run inside this unit's own exec:
1. `npm run format:check` — exit 0 (converged by formatting only the five touched files with a scoped `oxfmt --write`, never tree-wide).
2. `npm run lint:check` — exit 0.
3. `npm run check` — exit 0.
4. `npm run build` — exit 0.
5. `npm test` — exit 0 (`test:src` 157/157, `test:policy` 111/111, `test:config` 46/46, `test:guides` 25/25). This reading is an observation per § Standing conditions; the Orchestrator's own run after this unit exits is authoritative.

`git status --short` lists only Owned files: `README.md`, `guides/codec.md`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`.

No breaking rows, no shared-file patches, no stopping deviations. Evidence files produced by `node /home/user/scaffold/tmp/work/evidence.mjs codec`: `/home/user/work/evidence/conform-codec.diff` (521 lines) and `/home/user/work/evidence/conform-codec.status` (6 entries).

Full report: `/home/user/scaffold/tmp/units/conform/conform-codec-report.md`.
