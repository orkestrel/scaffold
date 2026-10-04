# Unit flip-integration-2 — finish U4 flip-integration after the pseudo-element ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files. The `flip-probe-3` lane may still write `/home/user/veneer/tmp/probes/flip4/**`; list its entries as not yours and change none.

## Objective

Complete unit U4 exactly as `/home/user/scaffold/tmp/codex/flip-integration-brief.md` specifies (read it first, including its appended § Rulings), starting from the partial tree the first run left uncommitted, under the ruling in § The pseudo-element ruling. The first run's report is `/home/user/scaffold/tmp/codex/flip-integration-last.md`: read it for what is done, what is pending, and the measured values. Every section of the original brief binds here except where this brief says otherwise.

## State at launch

`git status --porcelain` reads four modified tracked files, all U4's: `tests/setupStyles.ts` and `.test.ts` (`readChromiumMajor`, `partitionPreflightRows`, `collectDeclaredLonghands`, `flattenDeclarations`, `removeLayerBlocks`, each with a case; the scoped browser suite passed 33), `tests/setup.ts` and `.test.ts` (the `PreflightRecord` guard requires `chromium`; the fixture lacks it, so the record-binding suite fails until the record regenerates). Writers and scratch files sit under `/home/user/veneer/tmp/units/flip-integration/` (`preflight-record.test.ts`, `incompatible-record.test.ts` prepared and not run, `vite.writers.config.ts`, `partial.patch`). Read `tests/fixtures/tailwindcss/preflight.json` and `incompatible.json` through the project-relative path (the sandbox refused the root-anchored path). No integration describe is edited yet; the baseline `npm run test:integration` read 9 failed and 45 passed, the three host-bound titles among the failures. Live major 141; the baseline derives 2595 preflight rows.

## The pseudo-element ruling

The first run stopped because the live reading under Chromium 141 carries five unrecorded movers on `img::backdrop` (`overflow-block`, `overflow-clip-margin`, `overflow-inline`, `overflow-x`, `overflow-y`, `visible` alone against `clip` under preflight), outside the permitted population `html`, `table`, `button`, `input`, `select`, `textarea`. Pseudo-element enumeration differs across Chromium majors, so a pseudo-element row is version-bound.

Rulings:

1. **The writer applies no portable-subset check.** It reads the live movers on this host, writes the record with `chromium` set to the live major (141), and nothing else gates the write. Idempotence is proved by two runs (digests and `git status --porcelain` equal after both).
2. **The record case applies the version gate.** When the host major equals the record's `chromium`, the live moved rows equal the record in both directions, pseudo-element rows included. When the majors differ, the portable subset of verdict § 6 applies with one addition: a row whose element carries a pseudo-element (`::backdrop`, `::before`, `::after`, `::marker`, `::placeholder`, `::file-selector-button`, or any `::` suffix) is skipped on both sides, beside the existing skips (an unenumerated longhand; `button`, `input`, `select`, `textarea`), and every unrecorded element mover sits on `html`, `table`, or those four. The `img::backdrop` rows are then recorded on this host and skipped on another. Controls: a planted `div` row (refused under both branches) and a deleted `base` block (the live reading loses its movers).
3. **The 2595 against the predicted 2594** is reported with the row that accounts for the difference; no row is dropped to match a prediction.

## Scope deltas against the original brief

None beyond § The pseudo-element ruling. Owned files, prohibitions, the `[built, unexcluded]` order with the reverse-order measurement, the witness case, the misuse case, the disjoint-layers amendments, the Chromium statement-sequence pin (the recipe differs from the tuned sheet in CSSOM by the one absent `display: inline-block` row of the merged `.dropstart .dropdown-toggle::after` rule; empty blocks carry no row; any further difference is a stop), the three host-bound titles reported as kept, renamed, or deleted with the successor's exit, and the incompatible re-read under `[built, unexcluded]` all stand as written.

## Acceptance criteria

The original brief's criteria, bare, in order, each with its exit in the report: the writers twice (idempotent); `npm run test:setup`; `npm run test:setup:browser`; each Tailwind describe of `tests/integration.test.ts` by `-t`; `npm run test:integration` with every failing title listed and ruled host-bound or not (none in a Tailwind describe); `npm run check`; `npm run lint:check`; `npm run format:check`; `git diff --check`; `sha256sum dist/src/bootstrap/index.css` at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` and `dist/src/tailwindcss/index.css` at `f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40`.

## Return shape

Final message through the last-message file, no process diary: finding first (the record row counts before and after with the `chromium` field; the incompatible re-read result and whether the record changed; the reverse-order measurement; the heading-color reading; the case list per describe, each kept, amended (how), deleted (why), or added; the host-bound title mapping; each gate's exit); edited files; the writers' paths; anything not run with the exact error or skip line; final `git status --porcelain` with `flip-probe-3`'s entries listed as not yours. Nothing committed.

## Deviation contract

As the original brief, with ruling 2 replacing the first run's stop. Settle ancillary choices yourself and record them.
