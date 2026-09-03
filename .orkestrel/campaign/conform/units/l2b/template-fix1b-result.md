The report is complete and consistent. No deviation occurred: the plant read red as expected, every quoted line was found as quoted, and no gate reddened.

## Changes

- `/home/user/scaffold/tmp/units/conform/conform-template-report.md` — closed rows 1 through 8 of the superseded brief: struck the stale `stopped` opening sentence and the stale paragraph at lines 10-13; retitled the § Deviation heading to "closed under § Ruling"; rewrote the Exact-evidence block for the landed state; fixed the stale `isBrowserVuePath` sweep row to `empty`; added the `template-obj-5` row to § Failing-first proofs from the existing capture files; re-ran and rewrote § Gates against the re-staged fleet closure with capture file names, overwriting the stale pre-restage `check` failure; rewrote § Files touched to name `template-setup` as the writer of the setup pair and add the missing `tests/setup.test.ts` line; dropped the `isBrowserVuePath` exception from acceptance criterion 6 and corrected criterion 7's file list and rename count; rewrote § Ruling with the `setupFiles[0]`/structural-file rationale; added the R2 supersession sentence naming `template-setup-brief.md` and `template-setup-report.md`; added the `## Fix round 1` section; corrected the diff/status line counts in § Review evidence.
- No file in `/home/user/fleet/template` changed. `tests/setup.ts` carries only the landed diff (header comment plus `isBrowserVuePath` removal), confirmed with `git -C /home/user/fleet/template diff -- tests/setup.ts`.

## Scoped validation

- `npm --prefix /home/user/fleet/template run format:check` — exit 0, `All matched files use the correct format.` over 44 files. Captured to `gate-format-check-landed.txt`.
- `npm --prefix /home/user/fleet/template run lint:check` — exit 0, no output. Captured to `gate-lint-check-landed.txt`.
- `npm --prefix /home/user/fleet/template run check` — exit 0, root `tsc` then `check:src:core` both clean. Captured to `gate-check-landed.txt` (overwrites the stale pre-restage TS2305/TS2724 failures).
- `npm --prefix /home/user/fleet/template run build` — exit 0, `dist/src/core/index.js`/`index.cjs` emitted, `index.d.cts` copied. Captured to `gate-build-landed.txt`.
- `npm --prefix /home/user/fleet/template test` — exit 0, `src:core` 128 passed, `policy` 111 passed, `config` 46 passed, `setup` 1 passed, `guides` 31 passed. Captured to `gate-test-landed.txt`.
- `npx scaffold audit --offline` (from `/home/user/fleet/template`) — exit 0, `0 of 34 planned paths drifted from the plan.` Captured to `audit-landed.txt`.
- `node /home/user/scaffold/tmp/work/evidence.mjs template` — regenerated `conform-template.diff` (933 lines) and `conform-template.status` (17 entries).
- `git -C /home/user/fleet/template diff -- tests/setup.ts` — shows only the landed header-comment/helper-removal hunk, confirming the plant is gone.

## Report

The full content of `/home/user/scaffold/tmp/units/conform/conform-template-report.md` is returned above (the last `Read` tool output), unchanged from what is now committed to disk.
