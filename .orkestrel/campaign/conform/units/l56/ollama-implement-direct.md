Unit complete. Report at `/home/user/scaffold/tmp/units/conform/conform-ollama-report.md`; evidence at `/home/user/work/evidence/conform-ollama.diff`, `/home/user/work/evidence/conform-ollama.status`, and `/home/user/work/evidence/ollama-proofs/`.

# Unit conform-ollama — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in this unit's own exec.

## Consumer edits taken

Applied first, before any numbered row.

1. **guide's `symbol.kind` → `symbol.keyword`** — `/home/user/fleet/ollama/tests/guides.test.ts` now reads `.filter((symbol) => symbol.keyword === 'function')`. Baseline was red on this exact line: `npm run check` at `941c15e` reported `tests/guides.test.ts(120,32): error TS2339: Property 'kind' does not exist on type 'SurfaceSymbol'.` `npm run check` exits 0 immediately after the edit.

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| ollama-subj-1 | applied | Every `AGENTS §N` citation deleted at the re-derived population. The `§` sweep now returns only three `§ <heading name>` references I authored, each naming a real guide heading. |
| ollama-subj-2 | applied | Every bare `§N`, `H4`, and scenario `S2` token deleted, including `src/server/factories.ts`'s published `@example` caption and `tests/service/transport.test.ts`'s describe title. Control-identifier sweep exits 1. |
| ollama-subj-3 | applied | Surface prose reads "the boundary narrowing of every wire `unknown` through the `@orkestrel/contract` guards"; Contract entry 6 reads "(the implicit-open case: …)". |
| ollama-subj-4 | applied | Every function row's Summary cell in `### Surface` rewritten as a noun phrase, including the participle row. |
| ollama-subj-5 | applied | `WireChatRequest` row states `{ …; tools?; format? }` and appends the `format` sentence. |
| ollama-subj-6 | applied | `via` → `through`, `e.g.` → `for example`, trailing `…` bounded, `above` → `preceding`, `below` → `following`, `we`/`our` named. `vs.` left per the refuter's amendment. |
| ollama-subj-8 | applied | Downstream-app clause deleted from Contract entry 4; replaced with the mechanism's condition. |
| ollama-subj-9 | applied | `:5` and the practice bullet rewritten. Contract entry 14 untouched per the amendment. |
| ollama-subj-10 | applied | `OllamaOptions.options` names the mirrored `/api/chat` `options` field and its carry onto `WireChatRequest.options`. |
| ollama-subj-12 | applied (BREAKING) | `assembleResult` → `buildResult`, failing-first proved; old-name sweep exits 1. |
| ollama-subj-13 | applied | `OllamaResponse` TSDoc and Surface row describe what ships; every `#fetch` reference gone. |
| ollama-subj-14 | applied | `README.md` bullet corrected; guide sentence capitalised. |
| ollama-obj-1 | applied (BREAKING) | `parseBody` returns `… \| undefined` through `parseJSONAs`; call site takes `?? {}`; failing-first proved. |
| ollama-obj-2 | applied | Every named in-body function removed; `createRecordingSummarizer` and `seedConversation` added and proved; `interface Attempt` folded away by inference. |
| ollama-obj-3 | applied | `readonly code = 'HTTP' as const` first member; failing-first proved; guide updated. |
| ollama-obj-4 | applied | `extractArguments` and `parseRequestBody` route through `parseJSONAs`; contracts unchanged, suites equal before and after. |
| ollama-obj-6 | applied | `describe('flagship fences', …)` transcribes the § Surface and § Context framing fences against real `@src/server` exports; live value claims moved to `tests/service/factories.test.ts`; control run captured. |
| ollama-obj-7 | applied | Every `Date.now()` in the deadline test replaced with `performance.now()`; `Math.round` kept. |
| ollama-obj-8 | applied | `FILLER_SENTENCE` exported with TSDoc plus one asserting case; failing-first proved. |
| fleet-F1 | noop | `grep -rn "isBrowserVuePath" tests src` exits 1. The helper is absent from `tests/setup.ts` (read in full) and everywhere else; the workspace also has no browser environment (no `src/browser`, no `app/`, no `tests/setupBrowser.ts`). |
| fleet-F2 | applied | `readonly #id: string` is now the first `#` field, assigned in the constructor, with `get id(): string` first in the public interface. Pre-check clean: no test or fence serializes a provider instance. Parity safe: the installed `@orkestrel/guide` documents that getters never count as methods. |

## Failing-first proofs

| Row | Command (from `/home/user/fleet/ollama`) | Red | Green |
| --- | --- | --- | --- |
| obj-1 | `npx vitest run … --project src:server tests/src/server/parsers.test.ts` | exit 1, `3 failed \| 1 passed (4)` | exit 0, `4 passed (4)` |
| obj-3 | `… tests/src/server/errors.test.ts` | exit 1, `2 failed (2)` | exit 0, `2 passed (2)` |
| subj-12 | `… tests/src/server/helpers.test.ts` | exit 1, `3 failed \| 29 passed (32)` | exit 0, `32 passed (32)` |
| obj-8 | `… --project setup tests/setup.test.ts` | exit 1, `1 failed \| 60 passed (61)` | exit 0, `61 passed (61)` |
| obj-2 summarizer | `… --project setup tests/setup.test.ts` | exit 1, `2 failed \| 61 passed (63)` | exit 0, `63 passed (63)` |
| obj-2 seed | `… --project setup tests/setupService.test.ts` | exit 1, `1 failed \| 16 passed (17)` | exit 0, `17 passed (17)` |
| obj-6 | `… --project guides` | exit 1 with the expectation planted inside the new block (`expected 'ollama' to be 'CONTROL-not-ollama'`), `1 failed \| 19 passed (20)` | exit 0, `20 passed (20)`; same project read `18 passed (18)` before the block |

Each run is captured under `/home/user/work/evidence/ollama-proofs/`. The obj-6 control was planted in the test's own expectation and reverted in the same pass; no file outside this unit's owned set was touched for it.

`ollama-obj-4` is an equivalence refactor with no red state: `tests/src/server/helpers.test.ts` reads `32 passed` before and after; `tests/setupServer.test.ts` reads `10 passed` before and after.

`ollama-obj-7` and the `tests/service/**` half of `ollama-obj-2` cannot run here (no daemon; the project sits outside `npm test`); their proof in this unit is `npm run check` and `npm run lint:check`, both exit 0.

## Gates

| Gate | Exit |
| --- | --- |
| `npm run format:check` | 0 — "All matched files use the correct format." over 68 files |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `src:server` 98, `setup` 90, `policy` 111, `config` 46, `guides` 20, `conformance` 17, no failures |

`git status --short` lists 31 modified files, all inside Owned. Diffstat: `31 files changed, 665 insertions(+), 578 deletions(-)`.

To converge before the acceptance gates I ran the mutating `npm run lint` and `npm run format` as sole writer. `lint --fix` reported two `no-shadow` warnings from inlining an arrow into `retryUntil` in `tests/service/lifecycle.test.ts`; I renamed the callback's inner bindings and re-ran clean. `oxfmt` formats Markdown too, so it re-padded the guide's Surface table.

## Breaking

No consumer edit is required anywhere in the fleet.

- **`assembleResult` → `buildResult`.** Published through `src/server/index.ts:4`. Only importers are `src/server/OllamaProvider.ts` and `tests/src/server/helpers.test.ts`, both updated. No fleet package declares `@orkestrel/ollama`. External consumers ride the package's own version bump.
- **`parseBody` return type** now `Promise<Readonly<Record<string, unknown>> | undefined>`. Only importer is `src/server/OllamaProvider.ts:166`, updated to `(await parseBody(response)) ?? {}`. Same version bump.

`ollama-obj-3` adds a member and `fleet-F2` converts a data field to a getter over the same contract; neither is breaking. One runtime fact worth stating: `id` now lives on the prototype, so `JSON.stringify(provider)` no longer emits it — nothing in this package or the fleet serializes a provider instance. `package.json` `version` is off-limits and untouched.

## Shared-file patches

None. The vendored set is untouched.

## Deviations

None. Ancillary decisions I took and carried on from: folding `interface Attempt` away by inference rather than exporting an unused shared type; deleting the now-empty `## See also` heading in `guides/README.md` with its only bullet; rewriting the `tests/guides.test.ts` header sentence that the new block falsified; changing `buildResult`'s `@returns` off the old term; placing the live fence assertion beside the existing `createOllama (live)` cases.

## Observations, not criteria

Real findings outside this brief's rows; none edited.

1. `tests/service/OllamaProvider.test.ts:484` and `:509` carry a duplicate pair of in-body function assignments (`const transport: typeof globalThis.fetch = …`) that `ollama-obj-2`'s site list does not name and the refuter's own re-run did not report. Repair: one exported `createRecordingTransport(recorder)` in `tests/setupServer.ts`, asserted in `tests/setupServer.test.ts`.
2. `guides/README.md:36` reads "the toolchain above" — outside `ollama-subj-6`'s declared population. Repair: `earlier`.
3. `OllamaProvider` still declares `readonly name = 'ollama'` ahead of its `#` fields; `fleet-F2` names only `id`, so `name` keeps the exact shape the row exists to correct.
4. `OllamaHTTPError.status` carries `0` as a sentinel for "no HTTP response received", which `AGENTS.md` § Design laws "Absence is `undefined`" reaches. Adding `code` does not close it.
5. `directive #N` control identifiers survive in four test files — the same class `ollama-subj-2` names, but unconfirmed by either lane and in unpublished test comments.
6. `README.md:33`-`:34` repeats the fence claim `result.content // 'ok'` that `ollama-obj-6` corrected in the guide; `ollama-subj-14` scopes `README.md` to `:17`-`:19` only.
7. `guides/ollama.md:116` reads "robust to a small model's nondeterminism"; `robust` is a substitution-table row but sits outside `ollama-subj-6`'s enumerated sweep instrument.
8. `tests/setup.ts`'s existing helper TSDoc opens in the imperative, against `.claude/rules/typescript.md` § Comments and API documentation. I matched the file's voice rather than introducing a second one mid-file.
9. The whole-suite `npm test` reading is this unit's own, taken with its harness resident; the deciding run belongs to the Orchestrator after this unit exits.
10. `tests/service/**` never executed here. The rows touching it are proved only by `check` and `lint:check`; they need a real-daemon run before publish, which `prepublishOnly` already invokes.
