I'll read the brief and the repository's agent contracts first, then follow the brief exactly in read-only mode.I'll load the audit brief, unit brief, report, and evidence next, then check the tree against the claims.I'll load the falsify skill, checker contract, evidence files, and documentation rules, then sweep the tree against the claims.I'll sweep the tree for old names, citations, shims, and hidden residue, then read the changed files against each row.I'll restrict sweeps to the owned paths and read the key changed files against each row.I'll read the guide, types, parsers, errors, and tests next to confirm each row's repair against the tree.**1. CONFIRMED.** Every § Rows and § Fleet row is in the tree as `applied` or `noop`. `buildResult` at `src/server/helpers.ts:65` (brief `:65`); `parseBody` `Promise<… | undefined>` at `src/server/parsers.ts:24–27` (brief `:23`); `readonly code = 'HTTP' as const` at `src/server/errors.ts:35` (brief `:29`); `#id` + `get id` at `src/server/OllamaProvider.ts:83,133`; `FILLER_SENTENCE` export at `tests/setup.ts:124` (brief `:100`); `createRecordingSummarizer` at `tests/setup.ts:95`; `seedConversation` at `tests/setupService.ts:81`; Surface `buildResult` / `format?` / `undefined` at `guides/ollama.md:67,72,73`; `AGENTS §` empty on `src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md`. `isBrowserVuePath` empty; no `src/browser`, `app/`, or `tests/setupBrowser.ts` (fleet-F1 `noop`). No row stopped.

**2. not held**

**3. CONFIRMED.** Renamed export `assembleResult`. Word-boundary `assembleResult` over `src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md`: no match. Case-insensitive `assembleresult|assembleresults|assembleresulted|assembleresulting` over those paths: no match. `assembleResult as` / `as assembleResult`: no match. Current name `buildResult` at `src/server/helpers.ts:65` and `tests/src/server/helpers.test.ts:4,66`. Writer’s recorded sweep (`conform-ollama-report.md:28`) names `src tests guides README.md`. (`\bassembl(e|es|ed|ing)\b` hits English “assembled `ProviderResult`” at `guides/ollama.md:3`, not the symbol.)

**4. not held**

**5. CONFIRMED.** `buildResult` Surface row at `guides/ollama.md:72`; Methods `generate` / `stream` at `:95–96` match `src/server/OllamaProvider.ts:158,182`; `id` / `name` called readonly data at `:83`. Fences import `@orkestrel/ollama` at `guides/ollama.md:15,31,127,148,168,187,210`. Flagship transcriptions at `tests/guides.test.ts:179–201`. `parseBody` yields `undefined` at `guides/ollama.md:73`; `code` `'HTTP'` at `:67`. `AGENTS §` sweep empty on every status path (`src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md`). See-also AGENTS bullet now at `guides/ollama.md:260` (brief `:258`).

**6. not held**

**7. CONFIRMED.** `/home/user/work/evidence/conform-ollama.status` lists only Owned paths: `src/server/**`, `tests/**` except the vendored `setupPolicy` / `policy.test` / `config.test` trio, `guides/ollama.md`, `guides/README.md`, `README.md`. Diff `--git` headers name that same set. No `package-lock.json`, `node_modules`, `package.json`, `.claude/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, or `tests/config.test.ts`. `export { … as` over `src`: no match.

**8. not held**

**9. CONFIRMED.** `TODO|FIXME` empty on `src`, `guides/ollama.md`, `guides/README.md`, `README.md`, and `tests` aside from vendored `tests/setupPolicy.ts`. `console.log|debugger` empty on `src`. Commented-out `import|export|expect|return` empty on `src` and `guides`. Report table: numbered rows `applied`, fleet-F1 `noop` (matches empty `isBrowserVuePath`), fleet-F2 `applied` (`src/server/OllamaProvider.ts:83,133`). Those files are the status listing.

## Findings outside the claims

none

## Referrals

To the Orchestrator — the report’s observations outside its rows, each still in the tree:

- `tests/service/OllamaProvider.test.ts:484` and `:509` still assign in-body `transport` arrows. Open a successor that extracts `createRecordingTransport` beside `createRefusingTransport` in `tests/setupServer.ts`?
- `guides/README.md:36` still reads “the toolchain above”. Replace `above` with `earlier`?
- `src/server/OllamaProvider.ts:82` still declares `readonly name = 'ollama'` ahead of the `#` fields. Apply fleet-F2’s `#name` + `get name()` form (with the same `JSON.stringify` pre-check)?
- `OllamaHTTPError.status` still uses `0` as a sentinel (`src/server/errors.ts:12`; null-body throw at `src/server/OllamaProvider.ts:198`). Open an Absence-is-`undefined` row?
- `directive #5` / `directive #7` remain in `tests/service/compaction.test.ts:83`, `lifecycle.test.ts:24`, `OllamaProvider.test.ts:83`, and `tests/src/server/integration.test.ts:60`. Delete each token?
- `README.md:34` still has `result.content // 'ok'` after the guide fence was reworded. Apply the same shape wording?
- `guides/ollama.md:116` still reads “robust to a small model's nondeterminism”. Name the measured property instead?
- `tests/setup.ts` helper TSDoc still opens in the imperative (`:13`, `:128`). One pass to third-person `-s`?
- The unit’s own `npm test` reading is not the landing run. Take the deciding gate chain after this unit exits?
- `tests/service/**` was not executed here (no daemon; outside `npm test`). Run `npm run test:service` against a live daemon before publish?

VERDICT: PASS

## Journal

(leave for the driver)

## Deviation

none