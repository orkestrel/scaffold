# Unit conform-ollama — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in this unit's own exec.

## Consumer edits taken

Applied first, before any numbered row.

1. **guide's `symbol.kind` → `symbol.keyword`** — `tests/guides.test.ts` now reads
   `.filter((symbol) => symbol.keyword === 'function')`.
   Baseline was red on this exact line: `npm run check` at `941c15e` reported
   `tests/guides.test.ts(120,32): error TS2339: Property 'kind' does not exist on type 'SurfaceSymbol'.`
   `npm run check` exits 0 immediately after the edit.

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| ollama-subj-1 | applied | Every `AGENTS §N` citation deleted at the re-derived population. Sweep `grep -rn "§" src tests guides/ollama.md guides/README.md README.md --include=*.ts --include=*.md` (vendored set excluded) now returns only the three `§ <heading name>` references I authored in `tests/guides.test.ts:180`, `:189` and `tests/service/factories.test.ts:25`, each naming a real guide heading. |
| ollama-subj-2 | applied | Every bare `§N`, `H4`, and scenario `S2` token deleted, including `src/server/factories.ts`'s published `@example` caption and `tests/service/transport.test.ts`'s describe title. Sweep `grep -rnE "\bH[0-9]\b\|\bS[0-9]\b\|clause [0-9]" src tests guides/ollama.md guides/README.md README.md` exits 1 (no match). |
| ollama-subj-3 | applied | `guides/ollama.md` Surface prose now reads "the boundary narrowing of every wire `unknown` through the `@orkestrel/contract` guards"; Contract entry 6 now reads "(the implicit-open case: …)". Same `clause [0-9]` sweep exits 1. |
| ollama-subj-4 | applied | Every function row's Summary cell in `### Surface` rewritten as a noun phrase, including `:67`'s participle row. |
| ollama-subj-5 | applied | The `WireChatRequest` row now states `{ model; messages; stream; keep_alive; think; options?; tools?; format? }` and appends the `format` sentence. |
| ollama-subj-6 | applied | `via` → `through`, `e.g.` → `for example`, trailing `…` bounded, `above` → `preceding`, `below` → `following`, `we`/`our` named. `vs.` left in place per the refuter's amendment. Sweep result under § Sweeps. |
| ollama-subj-8 | applied | The downstream-app clause deleted from Contract entry 4; replaced with "Set `think: true` when the caller displays reasoning separately from the answer." |
| ollama-subj-9 | applied | `guides/ollama.md:5` now reads "It publishes no events: each call is a pure function of its arguments."; the practice bullet now reads "**Observe at the call site** — …". Contract entry 14 left unchanged per the refuter's amendment. |
| ollama-subj-10 | applied | `src/server/types.ts` `OllamaOptions.options` carries a block naming the mirrored `/api/chat` `options` field and its verbatim carry onto `{@link WireChatRequest.options}`. |
| ollama-subj-12 | applied (BREAKING) | `assembleResult` → `buildResult`. Failing-first below. Old-name sweep `grep -rni "assembleresult\|assembleresults\|assembleresulted\|assembleresulting" src tests guides README.md` exits 1. |
| ollama-subj-13 | applied | `OllamaResponse` TSDoc opens "Represents an open `POST /api/chat` response together with the deadline and the combined signal that bound the request."; the `#fetch` clause and the `@remarks` `#fetch` reference are gone; `guides/ollama.md:61` rewritten. |
| ollama-subj-14 | applied | `README.md` requirements bullet names the `service` project and states `src:server` is hermetic; `guides/ollama.md` "The client itself never handles the real API key" capitalised. |
| ollama-obj-1 | applied (BREAKING) | `parseBody` returns `Promise<Readonly<Record<string, unknown>> \| undefined>` through `parseJSONAs(await response.text(), isRecord)`; call site reads `(await parseBody(response)) ?? {}`. Failing-first below. Guide Surface row `:73` and Contract entry 5 updated. |
| ollama-obj-2 | applied | Every named in-body function assignment and the one in-body `function` declaration removed. `tests/setup.ts` gains `createRecordingSummarizer` and `RECORDING_SUMMARIZER_DIGEST`; `tests/setupService.ts` gains `seedConversation`; `tests/setup.test.ts`'s `paths` inlined. `interface Attempt` in `tests/service/scopes.test.ts` folded away entirely by inference on the inlined arrow's return, so no orphan declaration and no new shared type. Sweep under § Sweeps. |
| ollama-obj-3 | applied | `OllamaHTTPError` declares `readonly code = 'HTTP' as const` as its first member. Failing-first below. Guide Surface row `:67` and Contract entry 3 name it. |
| ollama-obj-4 | applied | `extractArguments` reads `if (isString(value)) return parseJSONAs(value, isRecord) ?? {}`; `parseRequestBody` reads `return parseJSONAs(text, isRecord)`. Both contracts unchanged; equivalence evidence below. |
| ollama-obj-6 | applied | `tests/guides.test.ts` gains `describe('flagship fences', …)` transcribing the § Surface and § Context framing fences against real `@src/server` exports; the live value claims moved to `tests/service/factories.test.ts` and the two fence comments reworded to name the shape. Control run below. |
| ollama-obj-7 | applied | Every `Date.now()` reading in the self-calibrating deadline test replaced with `performance.now()`; `Math.round` at the `timeout` option left in place. `grep -rn "Date.now()" tests/service/OllamaProvider.test.ts` exits 1. |
| ollama-obj-8 | applied | `FILLER_SENTENCE` exported with the TSDoc line; one case in the existing `fillWorkspace` describe asserts a written document starts with it. Failing-first below. |
| fleet-F1 | noop | `grep -rn "isBrowserVuePath" tests src` exits 1 — the helper is absent from `/home/user/fleet/ollama/tests/setup.ts` (read in full) and from every other file under `tests/` and `src/`. This workspace also has no browser environment: no `src/browser`, no `app/`, no `tests/setupBrowser.ts`. Nothing deleted, nothing rewritten. |
| fleet-F2 | applied | `OllamaProvider` declared `readonly id = crypto.randomUUID()` ahead of its `#` fields. Now `readonly #id: string` is the first `#` field, assigned in the constructor, and `get id(): string` is the first getter of the public interface. `ProviderInterface.id` in `node_modules/@orkestrel/agent/dist/src/core/index.d.ts:3464` is unchanged and unedited. Pre-check for the serialization hazard: `grep -rn "JSON.stringify" tests guides/ollama.md README.md` returns only `tests/setupServer.test.ts:100`, `:123`, `tests/setupService.ts:109`, and four vendored `tests/distribution.test.ts` sites — none serializes a provider instance, so the getter loses nothing. Parity is safe: the installed `@orkestrel/guide`'s `extractMemberMethods` documents that "getters, setters, `static` members, and `#` privates never" count as methods, so `id` does not enter the Methods bijection. |

## Files touched

`src/server/OllamaProvider.ts` — `buildResult` call sites, `parseBody` default at the call site, `#id` field + `id` getter, and the `§`/`H4`/`via`/`above`/`below`/`we` prose.
`src/server/errors.ts` — `readonly code = 'HTTP' as const`, rewritten class TSDoc, header citation removed, `e.g.` replaced.
`src/server/parsers.ts` — `parseBody` returns `undefined` through `parseJSONAs`; `@returns`/`@remarks` restated; header citation removed.
`src/server/helpers.ts` — `assembleResult` → `buildResult` with its doc block; `extractArguments` routed through `parseJSONAs`; header citation removed.
`src/server/types.ts` — `OllamaResponse` doc rewritten, `OllamaOptions.options` doc names its wire source, `e.g.`/`…` cleared.
`src/server/constants.ts` — header and `MAX_ERROR_BODY_LENGTH` citations removed.
`src/server/factories.ts` — `@example` caption, `e.g.`, and the trailing `…` list.
`guides/ollama.md` — Surface table rewritten, Contract entries 3/4/5/6/8/9/12/15/16 corrected, fence comments and practice bullets updated, `## See also` bullet replaced.
`guides/README.md` — citation removed from the intro; the `## See also` section removed with its only bullet.
`README.md` — the daemon requirement bullet corrected.
`tests/guides.test.ts` — `symbol.keyword`, the flagship-fence describe, and the header sentence that the block falsified.
`tests/setup.ts` — `FILLER_SENTENCE` exported, `createRecordingSummarizer` + `RECORDING_SUMMARIZER_DIGEST` added, `AGENTS §16.1` citations removed.
`tests/setup.test.ts` — `paths` inlined, `FILLER_SENTENCE` case, `createRecordingSummarizer` cases.
`tests/setupServer.ts` — `parseRequestBody` routed through `parseJSONAs`.
`tests/setupService.ts` — `seedConversation` added with its TSDoc.
`tests/setupService.test.ts` — `seedConversation` proof.
`tests/src/server/parsers.test.ts` — three cases assert `toBeUndefined()` and are renamed off the old contract.
`tests/src/server/errors.test.ts` — `error.code` assertions.
`tests/src/server/helpers.test.ts` — `buildResult`.
`tests/src/server/integration.test.ts` — the local summarizer replaced by `createRecordingSummarizer`; the `AGENTS §16.1` comment.
`tests/service/{scopes,schema,lifecycle,budget,conversation,compaction}.test.ts` — in-body arrows inlined at their `retryUntil` argument positions; unused type imports dropped.
`tests/service/{OllamaProvider,transport,factories,authority,tools}.test.ts` — `performance.now()`, the control-identifier and citation deletions, and the live half of the fence claim.

Diffstat: `31 files changed, 665 insertions(+), 578 deletions(-)`.

## Failing-first proofs

Every command ran from `/home/user/fleet/ollama`. Runner output is captured per row.

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| ollama-obj-1 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/parsers.test.ts` | exit 1, `3 failed \| 1 passed (4)` — `/home/user/work/evidence/ollama-proofs/obj-1-red.txt` | exit 0, `4 passed (4)` — `obj-1-green.txt` |
| ollama-obj-3 | `npx vitest run … --project src:server tests/src/server/errors.test.ts` | exit 1, `2 failed (2)` — `obj-3-red.txt` | exit 0, `2 passed (2)` — `obj-3-green.txt` |
| ollama-subj-12 | `npx vitest run … --project src:server tests/src/server/helpers.test.ts` | exit 1, `3 failed \| 29 passed (32)` — `subj-12-red.txt` | exit 0, `32 passed (32)` — `subj-12-green.txt` |
| ollama-obj-8 | `npx vitest run … --project setup tests/setup.test.ts` | exit 1, `1 failed \| 60 passed (61)` — `obj-8-red.txt` | exit 0, `61 passed (61)` — `obj-8-green.txt` |
| ollama-obj-2 (`createRecordingSummarizer`) | `npx vitest run … --project setup tests/setup.test.ts` | exit 1, `2 failed \| 61 passed (63)` — `obj-2-summarizer-red.txt` | exit 0, `63 passed (63)` — `obj-2-summarizer-green.txt` |
| ollama-obj-2 (`seedConversation`) | `npx vitest run … --project setup tests/setupService.test.ts` | exit 1, `1 failed \| 16 passed (17)` — `obj-2-seed-red.txt` | exit 0, `17 passed (17)` — `obj-2-seed-green.txt` |
| ollama-obj-6 | `npx vitest run … --project guides` | exit 1 with the expectation planted inside the new block: `expected 'ollama' to be 'CONTROL-not-ollama'`, `1 failed \| 19 passed (20)` — `obj-6-guides-control.txt` | exit 0, `20 passed (20)` — `obj-6-guides-after.txt`; the same project read `18 passed (18)` before the block — `guides-after-prose.txt` |

The `ollama-obj-6` control was planted in the test's own expectation, not in source, and reverted in the same pass: it proves the transcription reads the real `createOllama` return rather than a constant. No file outside this unit's owned set was touched to produce it.

`ollama-obj-4` is an equivalence refactor with an unchanged public contract, so it has no red state. Its invariant is the two suites that own the replaced bodies, read before and after:
`tests/src/server/helpers.test.ts` `32 passed (32)` before (`obj-4-before-helpers.txt`) and after (`obj-4-after-helpers.txt`);
`tests/setupServer.test.ts` `10 passed (10)` before (`obj-4-before-setupserver.txt`) and after (`obj-4-after-setupserver.txt`).

`ollama-obj-7` and the `tests/service/**` half of `ollama-obj-2` cannot be run here: the `service` project requires an Ollama daemon this container does not run, and it sits outside `npm test`. Their proof in this unit is `npm run check` exit 0 (the root project compiles `tests/service/**`) plus `npm run lint:check` exit 0.

## Sweeps

Every sweep ran from `/home/user/fleet/ollama` and excluded the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`).

- **Old symbol name.** `grep -rni "assembleresult\|assembleresults\|assembleresulted\|assembleresulting" src tests guides README.md` → no match (exit 1). A wider `grep -rniE "\bassembl(e|es|ed|ing)\b"` over the same paths returns only ordinary English describing a `ProviderResult` ("the assembled `ProviderResult`"), which is the vocabulary `@orkestrel/agent` itself uses for that contract, so those are ruled permitted rather than a surviving synonym for the helper. I did rewrite the one such hit inside `buildResult`'s own doc block (`@returns The result carrying only its populated fields`).
- **Numbered citations.** `grep -rn "§" src tests guides/ollama.md guides/README.md README.md --include=*.ts --include=*.md` → three hits, all `§ <heading name>` references I authored (`tests/guides.test.ts:180`, `:189`; `tests/service/factories.test.ts:25`). Each names a real `guides/ollama.md` heading a reader can find, which is the repository's own citation form, so each is ruled permitted. No numbered citation survives.
- **Control identifiers.** `grep -rnE "\bH[0-9]\b|\bS[0-9]\b|clause [0-9]" src tests guides/ollama.md guides/README.md README.md --include=*.ts --include=*.md` → no match (exit 1).
- **Substitutions.** `grep -rniE "\bvia\b|\babove\b|\bbelow\b|\bour\b|\bwe\b|e\.g\.|i\.e\.|etc\.|…" src guides/ollama.md guides/README.md README.md` → three hits, ruled by sense: `src/server/helpers.ts:178` (`'…'` elides a minted UUID inside an `@example` return value, not a list); `guides/ollama.md:105` (`<think>…</think>` is the literal wire tag pair with elided content, not a list); `guides/README.md:36` ("the toolchain above" — a real hit in the banned sense, outside this row's declared population, filed under § Observations). A separate `grep -rniE "\bsimply\b|\bjust\b|\beas(y|ier|ily)\b|\bcurrently\b|\bshould\b|\bleverage\b|\butilize\b|\bin order to\b|allows you to|and/or|\bplease\b|\brobust\b|\bperformant\b"` over the same paths returns one hit, `guides/ollama.md:116` ("robust to a small model's nondeterminism"), outside `ollama-subj-6`'s declared population and filed under § Observations.
- **Nested functions.** `grep -rnE "^[[:space:]]+(const|let|var) [A-Za-z_$][A-Za-z0-9_$]* *(: *[^=]+)? *= *(async )?(\(|function|<)|^[[:space:]]+(async )?function[* ]" tests --include=*.ts` → two hits, both at `tests/service/OllamaProvider.test.ts:484` and `:509`, neither in any row's site list; filed under § Observations. The same pattern over `src --include=*.ts` returns one line, `src/server/OllamaProvider.ts:166` (`const record = (await parseBody(response)) ?? {}`), a false positive from the leading parenthesis.
- **Deferrals and suppressions.** `grep -rnE "TODO|FIXME|\.skip\(|\.todo\(|@ts-(ignore|expect-error|nocheck)|eslint-disable" src tests guides README.md --include=*.ts --include=*.md` → no match (exit 1).
- **Counts in authored prose.** `git diff -U0 -- src tests guides README.md | grep "^+"` filtered on `\b(one|two|…|ten)\b` and the numeral-plus-noun pattern. Every surviving hit is ruled permitted: a pronoun (`without one`, `the seeded one`), a parameter name (`render: (one) =>`), a unit description (`ONE JSON body`, `a one-sentence digest`, `one bound`), or the refuter's own ruled cell text (`a call's two reasoning carriers`, whose members the same sentence names). Two counts I had introduced were deleted before the final gates: `Two providers built from identical options…` → `A second provider built from identical options…` in the `id` getter's TSDoc, and `at its two HTTP failure sites` → `at its HTTP failure sites` in `OllamaHTTPError`'s block.
- **Old `parseBody` contract in prose.** `grep -rn "degrades to \`{}\`" guides src` → no match; the guide's Surface row and Contract entry 5 both state `undefined`.

## Gates

Run from `/home/user/fleet/ollama` after the last edit, in order. Every reading is from this unit's own exec with its harness resident; the Orchestrator takes the deciding run after the unit exits.

| Gate | Exit | Output |
| --- | --- | --- |
| `npm run format:check` | 0 | "All matched files use the correct format." over 68 files — `/home/user/work/evidence/ollama-proofs/gate-1-format-check.txt` |
| `npm run lint:check` | 0 | no diagnostics — `gate-2-lint-check.txt` |
| `npm run check` | 0 | root project plus `configs/src/tsconfig.server.json`, both clean — `gate-3-check.txt` |
| `npm run build` | 0 | ESM + CJS emitted, `index.d.cts` copied — `gate-4-build.txt` |
| `npm test` | 0 | `src:server` 98, `setup` 90, `policy` 111, `config` 46, `guides` 20, `conformance` 17 — no failures — `gate-5-test.txt` |

`git status --short` lists 31 modified files, all inside Owned (`/home/user/work/evidence/conform-ollama.status`). No vendored, off-limits, or untracked file appears.

To converge before the acceptance gates I ran the mutating `npm run lint` and `npm run format` (I am the sole writer in this checkout). `lint --fix` reported two `no-shadow` warnings introduced by inlining an arrow into `retryUntil` at `tests/service/lifecycle.test.ts`; I renamed the callback's inner `thoughts`/`result` bindings to `attemptThoughts`/`attemptResult` and re-ran it clean. `oxfmt` formats Markdown as well as TypeScript, so it re-padded the `guides/ollama.md` Surface table I had rewritten with single-space cells.

## Breaking

Two rows move the published surface. No consumer edit is required anywhere in the fleet.

- **`assembleResult` → `buildResult`** (`ollama-subj-12`). The symbol is published through `src/server/index.ts:4`'s star-export of `./helpers.js`. Its only importers are `src/server/OllamaProvider.ts` and `tests/src/server/helpers.test.ts`, both inside this package and both updated. No package under `/home/user/fleet/` declares `@orkestrel/ollama`, so no fleet consumer is affected. External consumers are unknown and ride this package's own version bump, which `.claude/rules/architecture.md` § Kind purity requires for a rename.
- **`parseBody` return type** (`ollama-obj-1`). `Promise<Readonly<Record<string, unknown>>>` becomes `Promise<Readonly<Record<string, unknown>> | undefined>`. Published through `src/server/index.ts:5`. Its only importer is `src/server/OllamaProvider.ts:166`, updated to `(await parseBody(response)) ?? {}`. An external consumer reading the result without a `??` default now gets a type error rather than an empty record; the same version bump carries it.

`ollama-obj-3` adds a member and `fleet-F2` converts a data field to a getter over the same `readonly id: string` contract; neither removes or renames anything, so neither is breaking. The getter conversion does change one runtime fact worth stating: `id` now lives on the prototype, so `JSON.stringify(provider)` no longer emits it. Nothing in this package serialized a provider instance (sweep under fleet-F2), and no fleet consumer exists to.

The `package.json` `version` field is off-limits to this unit and was not touched.

## Shared-file patches

None. No row obliged an edit to another fleet checkout or to a vendored dependency guide mirror. The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is untouched — confirmed by the status listing.

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a file outside Owned, or required a consumer edit to keep this package's gates green.

Ancillary decisions I took and carried on from, per the deviation contract:

- **`interface Attempt` in `tests/service/scopes.test.ts`.** The refuter offered two closures: move it to `tests/setupService.ts` as an exported type, or fold it into the inlined arrow's return annotation. I took a third form of the second: I dropped the annotation entirely and let inference produce the identical type from the returned object literal (`noUncheckedIndexedAccess` is on, so `proxy.requests[…]` still yields `RecordedRequest | undefined`). That removes the declaration without inventing a shared type no second file consumes. The now-unused `import type { RecordedRequest }` was removed with it.
- **`guides/README.md` `## See also`.** Deleting its only bullet would have left an empty heading, so I deleted the heading with it. `guides/ollama.md`'s own `## See also` still links `../AGENTS.md`, and `tests/guides.test.ts` keeps `ROOT_FILES = ['AGENTS.md']`, so link parity is unaffected — the `guides` project reads 20 passed.
- **`tests/guides.test.ts` header sentence.** Appending the flagship-fence block falsified "The five constants below are this package's own, and are the only part a sibling package changes." I rewrote the sentence to name the constants and the fence block as this package's own and the parity loop between them as the shared drop-in. It also carried a count, which the rewrite drops.
- **`buildResult`'s `@returns` line.** It read "The assembled result…" inside the renamed symbol's own doc block, which alternates the term the rename fixes. Changed to "The result carrying only its populated fields."
- **`tests/service/factories.test.ts` case placement.** The live half of the § Surface fence claim went beside the existing `createOllama (live)` cases rather than into a new file, so `guides/ollama.md`'s Tests list still resolves.

## Observations, not criteria

Each is a real finding outside this brief's enumerated rows. None was edited.

1. **`tests/service/OllamaProvider.test.ts:484` and `:509`** carry a duplicate pair of in-body function assignments — `const transport: typeof globalThis.fetch = (input, init) => { calls.handler(String(input)); return globalThis.fetch(input, init) }` — that `ollama-obj-2`'s site list does not name and the refuter's own re-run did not report. `.claude/rules/architecture.md` § Functions and orchestration reaches them, and `.claude/rules/tests.md` § Shared test infrastructure calls the duplication a defect. The repair is one exported `createRecordingTransport(recorder)` in `tests/setupServer.ts` beside `createRefusingTransport` and `createStreamingTransport`, asserted in `tests/setupServer.test.ts`.
2. **`guides/README.md:36`** reads "the toolchain above". `.claude/rules/writing.md` § Code tokens, references, and links bans `above`; `ollama-subj-6` bounds its population to `guides/ollama.md` and `src/`, so this site sits outside the row. The repair is `above` → `earlier`.
3. **`OllamaProvider` still declares `readonly name = 'ollama'` ahead of its `#` fields.** `fleet-F2` names only `id`, so `name` keeps the exact shape the row exists to correct, and `.claude/rules/architecture.md` § Class order still reads against the class. The repair is the same one: `readonly #name = 'ollama'` plus `get name(): string`, with the same `JSON.stringify` pre-check (which this package passes).
4. **`OllamaHTTPError.status` carries `0` as a sentinel** for "no HTTP response was received" (`src/server/OllamaProvider.ts` null-body branch, documented at `errors.ts` and in Contract entry 3). `AGENTS.md` § Design laws "Absence is `undefined`" reaches it. The refuter filed this observation under `ollama-obj-3` and left it to the Orchestrator; adding `code` does not close it.
5. **`directive #N` control identifiers survive in `tests/service/{compaction,lifecycle,OllamaProvider}.test.ts` and `tests/src/server/integration.test.ts`** (`directive #5`, `directive #7`). They are the same class `ollama-subj-2` names, but neither lane confirmed them and they sit in unpublished test comments, so I left them. The repair is to delete each token and let the surrounding sentence carry the reason.
6. **`README.md:33`-`:34` repeats the fence claim `result.content // 'ok'`** that `ollama-obj-6` corrected in `guides/ollama.md`. `ollama-subj-14` scopes `README.md` to `:17`-`:19` only, so the README fence was left. The repair is the same rewording, or a transcription of the README fence beside the guide's.
7. **`guides/ollama.md:116` reads "Assertions are structural (robust to a small model's nondeterminism)".** `.claude/rules/writing.md` § Substitutions replaces `robust` with the measured property. `ollama-subj-6`'s sweep instrument enumerates `via`, `above`, `below`, `our`, `we`, `e.g.`, `vs.`, and `…` only, so this word sits outside the row. The repair is to name the property: "Assertions are structural — they hold whatever wording a small model produces."
8. **`tests/setup.ts`'s existing helper TSDoc opens in the imperative** ("Build one user-turn Message", "Populate a WorkspaceInterface"), which `.claude/rules/typescript.md` § Comments and API documentation fixes as third-person `-s`. No row names it; I matched the file's existing voice for `createRecordingSummarizer` rather than introducing a second voice mid-file, and flag the whole file for one pass.
9. **The whole-suite `npm test` reading is this unit's own**, taken inside its exec with the harness resident. It exited 0 with no failure and no timing-sensitive case in the collected projects, but the deciding run belongs to the Orchestrator after this unit exits.
10. **`tests/service/**` never executed in this unit.** The `service` project needs a daemon this container does not run and sits outside `npm test`, so the rows touching it (`ollama-obj-2`'s service half, `ollama-obj-7`, `ollama-subj-1`/`-2`'s test-comment sites, and the live half of `ollama-obj-6`) are proved here only by `npm run check` and `npm run lint:check`. They need a run against a real daemon before the package publishes; `prepublishOnly` already invokes `npm run test:service`.

## Fix round 1

Closed the objective lane's refutation of claim 4 (`.orkestrel/campaign/conform/units/l56/ollama-objective-r1.md`, findings O1-O5) and the Grok checker's referrals (`.orkestrel/campaign/conform/units/l56/ollama-r1-checker-grok.result.md`), per the Orchestrator's rulings R1-R3.

### Edits

- **O1** `tests/guides.test.ts:2` "The constants below and the flagship-fence" → "The constants following and the flagship-fence".
- **O2** `tests/guides.test.ts:176` "what the loop above proves" → "what the preceding loop proves".
- **O4** `tests/guides.test.ts:194` `render: (one) => ...one.content...` → `render: (instruction) => ...instruction.content...`; `guides/ollama.md:194` `render: (i) => ...i.content...` → the identical `(instruction)` form.
- **O5a** `guides/README.md:36` "the toolchain above" → "the toolchain earlier".
- **O5b** `guides/ollama.md:116` "Assertions are structural (robust to a small model's nondeterminism), never brittle exact output." → "Assertions are structural — they hold whatever wording a small model produces — and never pin exact output."
- **O5c** `guides/ollama.md:105` bold opener "the SPLITTER is the guarantee." → "the splitter keeps the assembled content clean."
- **O5d** `README.md:34` `result.content // 'ok'` → `result.content // the assistant's answer text`.
- **O3** Extracted `createRecordingTransport(calls)` into `tests/setupServer.ts` (beside `createRefusingTransport`/`createStreamingTransport`), typed with `RecorderInterface<readonly [string]>` from `@orkestrel/test`, with TSDoc. Added `describe('createRecordingTransport')` in `tests/setupServer.test.ts` (one case, following the `createRecordingProxy` describe's proxy-plus-recorder pattern). Replaced the two in-body `const transport` arrows at `tests/service/OllamaProvider.test.ts:484-487` and `:509-512` with `fetch: createRecordingTransport(calls)`, updating the `../setupServer.js` import.
- **Checker referral, `directive #N` tokens** — deleted every token and its attaching words at `tests/service/compaction.test.ts:83,96,135,149,222,235`; `tests/service/lifecycle.test.ts:23-24,94`; `tests/service/OllamaProvider.test.ts:82-83,242-243,408-409`; `tests/src/server/integration.test.ts:60,102,205,273`, rewrapping each shortened comment.
- **Checker referral, TSDoc openers** — `tests/setup.ts:13` "Build one user-turn" → "Builds one user-turn"; `:31,67,86` same `Build` → `Builds`; `:128` "Populate a" → "Populates a"; `tests/setupServer.ts:123` "Build a transport" → "Builds a transport"; `:146` same → `Builds`; `:186` "Start a pass-through" → "Starts a pass-through". Swept both files for the full verb list; no remaining imperative openers.
- **Ancillary (not in Sites, required by acceptance criterion 1)** — `tests/guides.test.ts:38` "the second assertion below fails" → "the second assertion following fails", to close the `grep -n 'below\|above'` criterion the Sites list left uncovered.

### Claim 4, obj-4 control

Planted `src/server/helpers.ts:220` `parseJSONAs(value, isRecord)` → `parseJSONAs(value, isString)`. Ran `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`:

- Mutant red (`/home/user/work/evidence/ollama-proofs/obj-4-mutant-red.txt`): 1 failed, 31 passed (32 total) — `extractArguments > parses a JSON string that yields a record` failed.
- Restored green (`/home/user/work/evidence/ollama-proofs/obj-4-restored-green.txt`): 32 passed (32 total).
- `git diff -- src/server/helpers.ts` after restore is byte-identical to the pre-round diff captured in `/home/user/work/evidence/conform-ollama.diff` (only the diff file's own missing-trailing-newline marker differs).

### Claim 4, documentation sweeps

For ollama-subj-4, -5, -8, -9, -10, -13, and -14 (rows at `conform-ollama-brief.md:66,73,87,94,101,115,122`), swept each row's deleted "Wrong"/"Before" phrase case-insensitively over `src`, `tests` (minus the vendored set), `guides/ollama.md`, `guides/README.md`, and `README.md`. Every sweep returned empty — each row's repair had already landed in the tree:

- subj-4 (`create(s|d)? a`, imperative Surface-row openers): the `## Surface` table at `guides/ollama.md:57-79` is already noun phrases throughout (`A ProviderInterface over...`, `The projection of conversation turns...`, `The assembly of a ProviderResult...`, and so on).
- subj-5 (`{ model; messages; stream; keep_alive; think; options?; tools? }`, missing `format?`): empty — `guides/ollama.md:66` already carries `...tools?; format? }` plus the `format` sentence.
- subj-8 (`the app enables think: true...`/`chat's thinking collapsible`): empty — `guides/ollama.md:105` already ends at "overrideable per call through `ProviderStreamOptions.think`."
- subj-9 (`observability is a (later|separate) pass`, `no events yet`): empty — `guides/ollama.md:5` reads "It publishes no events" and `:237`'s bullet reads "Observe at the call site".
- subj-10 (`carries passthrough sampling options`): empty — `src/server/types.ts:98` already names the `/api/chat` `options` field it mirrors.
- subj-13 (`internal wire-shape ...#fetch`, `internal .../api/chat... response shape #fetch`): empty — `src/server/types.ts` and `guides/ollama.md:61` already describe `OllamaResponse` by its members.
- subj-14 (`live-only src:server test suite`; lowercase sentence start): empty — `README.md:17-19` already names the `service` project and `src:server` as hermetic; `guides/ollama.md:164` already reads "The client itself never handles..." capitalized.

### Rulings recorded (no edit)

- **R1** — `tests/service/**` needs a live daemon this container does not have (`ollama.sh: loopback capability unreachable`). `ollama-obj-7`, `ollama-obj-2`'s service half, and `ollama-obj-6`'s live half carry `npm run check` and `npm run lint:check` here and execute at the wave's pre-publish step (`prepublishOnly` runs `test:service`).
- **R2** — `OllamaHTTPError.status` reading `0` for "no response" is a published error contract the rows did not open. Recorded as a next-matrix row; no edit.
- **R3** — `readonly name = 'ollama'` ahead of the `#` fields joins the fleet's public-data-field question in the next matrix; no edit.

### Gates

- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` — exit 0, 11 passed.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts` — exit 0, 32 passed.
- `git status --short` — 32 modified paths: the unit's prior set plus `tests/setupServer.test.ts` (newly modified by the added describe block); nothing else new.
