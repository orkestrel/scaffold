<!-- workflow wf_56b192d6-7c3, agent a0338146c41a57dce, verifier on Sonnet, captured from journal.jsonl -->

Gate Report

1. `node node_modules/typescript/bin/tsc --version` — PASS (exit 0)
```
Version 6.0.3
```

2. `npm run format:check` — PASS (exit 0)
```
Checking formatting...
All matched files use the correct format.
Finished in 4135ms on 68 files using 4 threads.
```

3. `npm run lint:check` — PASS (exit 0)
```
> @orkestrel/probe@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

4. `npm run check` — PASS (exit 0)
```
> @orkestrel/probe@0.0.12 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

5. `npm run build` — PASS (exit 0)
```
vite v8.2.2 building client environment for production...
dist/bin/main.js  0.41 kB │ gzip: 0.28 kB │ map: 0.63 kB
✓ built in 23ms
```

6. `npm test` — FAIL (exit 1)
```
 FAIL  |src:bin| tests/src/bin/main.test.ts > bin entry > answers both protocol eras without exposing worker output on stdout
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues
 FAIL  |src:server| tests/src/server/stages/RuntimeStage.test.ts > runtime stage > raises progress for the caller's run and lowers it before the stage's cleanup
 Test Files  3 failed | 8 passed (11)
      Tests  3 failed | 226 passed (229)
```
Failure excerpts:
- `tests/src/bin/main.test.ts:972` — `AssertionError: expected [ …(6) ] to deeply equal ArrayContaining{…}` (protocol-shape mismatch in `answers both protocol eras…`; on this run the server never emitted the second protocol-era response before the collector timed out). Owning file: `/home/user/fleet/probe/tests/src/bin/main.test.ts` (and `/home/user/fleet/probe/src/bin/main.ts` behind it).
- `tests/src/server/Probe.test.ts` — `ProbeError: The probe could not arm: The Oxlint language server exited with code 0` caused by `LSPError: The LSP request 'initialize' exceeded its deadline`. Owning file: `/home/user/fleet/probe/src/server/stages/LintStage.ts:255` (via `node_modules/@orkestrel/lsp`).
- `tests/src/server/stages/RuntimeStage.test.ts:1197` — `Error: Test timed out in 60000ms.` in `raises progress for the caller's run and lowers it before the stage's cleanup`. Owning file: `/home/user/fleet/probe/tests/src/server/stages/RuntimeStage.test.ts` (and `/home/user/fleet/probe/src/server/stages/RuntimeStage.ts`).

A prior run of the same tree-wide `npm test` (immediately before this recorded one) produced a different failure set — 9 failed / 220 passed, with the same `Probe.test.ts` and additional `main.test.ts` Oxlint/`initialize`-deadline failures — confirming these are timing flakes rather than stable regressions.

Solo re-run of the one row naming the Oxlint language server and an `initialize` deadline (`tests/src/server/Probe.test.ts`):
```
npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts
Test Files  1 passed (1)
      Tests  26 passed (26)
```
PASS (exit 0) on solo re-run.

`main.test.ts` and `RuntimeStage.test.ts` failures do not name the Oxlint language server or an `initialize` deadline (they are a protocol-shape assertion and a plain 60-second test timeout), so the dispatch's solo-re-run criterion does not cover them, and they stand as recorded red rows.

7. `git status --short` — PASS (exit 0), no output; tree clean.

Overall verdict: GATES: RED npm test

Anomalies:
- `npm test` produced two different failure sets across two consecutive tree-wide runs (9 failed/220 passed, then 3 failed/226 passed) with no source change between them, consistent with timing sensitivity under load (§ Long-running commands / Writing concurrency rule 10 governs re-reading such results).
- The `Probe.test.ts` row's stated cause (`Oxlint language server exited with code 0` / `initialize` deadline exceeded) resolved on a solo re-run per the dispatch's specified procedure.
- `main.test.ts` and `RuntimeStage.test.ts` remain red and were not solo-re-run because their failure text does not match the dispatch's named re-run trigger; both read as timing-related (a 60-second test timeout and a protocol-response race) rather than a stable logic defect, but this reading is unverified against the dispatch's fixed criterion.
