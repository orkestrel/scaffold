<!-- U16-scaffold — builder (Sonnet, native), the capture* helper family in one verb (AD4 reviewer 6). Retained from the completion notification, 2026-09-15 (223 s, 19 tool uses). -->

## Changes

- `tests/setupServer.ts:1101` — renamed `readErrorMessage` → `captureScaffoldMessage`; retitled its TSDoc summary from "Reads the message from…" to "Runs a synchronous call and reports the message it refused with." (`read*` is reserved for a live host object, stream position, or byte layout, none of which apply here).
- `tests/setupServer.ts:2732` — renamed `readRejectionCode` → `captureScaffoldRejection`; its TSDoc `{@link captureScaffoldCode}` reference is unaffected (that name did not change).
- `tests/setupServer.test.ts`, `tests/src/server/Materializer.test.ts`, `tests/src/server/Upstream.test.ts` — every caller updated to the new names; `oxfmt` reflowed six call sites whose line length grew from the longer identifiers.

## Scoped validation

- Fleet-collision check (before editing): `grep -rln "captureScaffoldMessage\|captureScaffoldRejection" dist/host/guides/ node_modules/@orkestrel/*/dist/src/*/index.d.ts` — empty (no collision).
- `grep -rn "readErrorMessage\|readRejectionCode" tests/ src/ guides/ --include=*.ts --include=*.md` — empty (no remaining references).
- `npm run check` — exit 0.
- `npm run test:setup` — 96 passed, 2 skipped (98).
- `npm run test:src:server` — 462 passed, 6 skipped (468).
- `npm run test:src:bin` — 257 passed (257) — no callers here; run per brief anyway.
- `npm run test:src:core` — 1 file failed (3 snapshot failures in `tests/src/core/compilers.test.ts`, `blueprintToManifest` fixture mismatch), unrelated to this rename: those files carry pre-existing uncommitted changes from the D4 chain and contain no reference to the renamed helpers.
- `npx oxlint --config .oxlintrc.json --deny-warnings <owned files>` — no output, clean.
- `npx oxfmt --config .oxfmtrc.json --check <owned files>` — initially flagged `setupServer.test.ts` and `Upstream.test.ts` for line-length wraps caused by the longer name; ran `oxfmt` without `--check` to apply, then re-ran `--check` — "All matched files use the correct format."
- Caller occurrence counts (`grep -c`): `tests/setupServer.test.ts` 8, `tests/src/server/Materializer.test.ts` 5, `tests/src/server/Upstream.test.ts` 16.
- `git diff --stat` for changed files: `tests/setupServer.ts` 166 lines changed, `tests/setupServer.test.ts` 101, `tests/src/server/Materializer.test.ts` 233, `tests/src/server/Upstream.test.ts` 71 (these totals include preexisting uncommitted D4-chain edits already in the tree, not only this rename).

## Deviation state

None for the assigned rename. The `test:src:core` snapshot failure is out of scope: pre-existing dirty-tree state in files that are not callers of `readErrorMessage`/`readRejectionCode`.

<!-- Orchestrator note: the core snapshot failure was the Orchestrator's `@orkestrel/guide` re-pin (^0.0.18 → ^0.0.19) reaching the three core fixtures that carry the generated manifest's range; the fixtures were moved (ledger row K-fixtures) and `test:src:core` reads 411 passed again. -->
