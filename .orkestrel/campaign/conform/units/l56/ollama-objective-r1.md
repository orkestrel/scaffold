## Per-claim verdicts

**1. Every row is `applied`, `stopped`, or `noop` with evidence; no row silently skipped — CONFIRMED**

The report's disposition table at `/home/user/scaffold/tmp/units/conform/conform-ollama-report.md:17-39` carries one entry for every id the brief enumerates under § Rows (`/home/user/scaffold/tmp/units/conform/conform-ollama-brief.md:45-177`: `ollama-subj-1`, `-2`, `-3`, `-4`, `-5`, `-6`, `-8`, `-9`, `-10`, `-12`, `-13`, `-14`, `ollama-obj-1`, `-2`, `-3`, `-4`, `-6`, `-7`, `-8`) and under § Fleet rows (`:183-184`: `fleet-F1`, `fleet-F2`). No id is absent and none is `stopped`. `fleet-F1`'s `noop` is verifiable independently: my sweep for `isBrowserVuePath` (case-insensitive, over `/home/user/fleet/ollama`, `node_modules` excluded) returned no match, and `/home/user/work/evidence/conform-ollama.status` shows no `src/browser`, `app/`, or `tests/setupBrowser.ts`.

**2. Each `applied` row implements the refuter's operative repair — CONFIRMED**

I checked each row's operative text against the `+` lines of `/home/user/work/evidence/conform-ollama.diff`. The amended rows are the discriminating ones, and each follows the refuter rather than the finder:

- `ollama-subj-6`'s struck `vs.` replacement: `vs.` survives at `/home/user/fleet/ollama/guides/ollama.md:106`, `src/server/types.ts:137`, `src/server/factories.ts:26`, and no `+` line replaces it (diff `:515` keeps "XML group wrappers vs. Markdown headers" while changing only `e.g.`).
- `ollama-subj-9`'s struck `:115` rewrite: Contract entry `**Event-free.**` at `guides/ollama.md:115` appears only as diff context (`/home/user/work/evidence/conform-ollama.diff:151`), never as a `+` line.
- `ollama-subj-12`'s note not to rename `joinThinking`: `joinThinking` survives at `src/server/helpers.ts:135` and as a Surface row at `guides/ollama.md:76`.
- `ollama-obj-3`'s `readonly code = 'HTTP' as const` as the class's first member, at `src/server/errors.ts:35`, with the doc line at `:31-34`. The `as const` form is the one `.claude/rules/typescript.md:32-33` names verbatim (`readonly code = 'ABORT' as const`), so the assertion ban does not reach it.
- `ollama-obj-1`'s composed cell: `guides/ollama.md:73` carries `ollama-subj-4`'s noun phrase and `ollama-obj-1`'s `undefined` clause together, as the two rows' sequencing note required.
- `ollama-subj-14`'s README bullet at `README.md:17-20` matches the refuter's text, including "passes with the daemon down" rather than the finder's "needs no daemon".

The one departure is `interface Attempt` in `tests/service/scopes.test.ts`. The refuter offered a move to `tests/setupService.ts` or a fold into the inlined arrow's return annotation; the writer dropped the annotation and let inference produce the type. The declaration is gone (my sweep for `\bAttempt\b` over `src`, `tests`, `guides` returns only ordinary English and vendored guide prose), the orphan import was removed (`RecordedRequest` has no occurrence left in `tests/service/scopes.test.ts`), and the writer recorded the choice at `conform-ollama-report.md:140`. That satisfies the rule the row cites and falls inside the brief's ancillary-decision clause.

**3. No old name survives — CONFIRMED**

My own sweeps, run over `/home/user/fleet/ollama` with `node_modules` excluded:

- `assembleResult|assembleresult`, case-insensitive, whole checkout: no match. That covers the word-boundary form and the `-s`/`-ed`/`-ing` inflections in one pass.
- `§` over `src`: no match. Over `tests`: `tests/guides.test.ts:180`, `:189`, `tests/service/factories.test.ts:25` — each a `§ <heading name>` reference to a real `guides/ollama.md` heading, which is the repository's own citation form, not a numbered `AGENTS §N`. Over `guides/ollama.md`, `guides/README.md`, `README.md`: no match.
- `\bH[0-9]\b|\bS[0-9]\b|clause [0-9]` over `src`, `tests`, `guides/ollama.md`: no match.
- `Date\.now\(\)` over `{src,tests}/**/*.ts`: no match.
- `isBrowserVuePath`, case-insensitive: no match.

The writer's recorded sweep at `conform-ollama-report.md:94` names `src tests guides README.md`, which covers `guides/ollama.md` and `guides/README.md` as a superset, and carries the inflection alternation the claim requires.

**4. Every behavioural row carries a failing-first proof; every placement, naming, or documentation row carries the sweep proving the old form gone — REFUTED**

Failing inputs:

- **`ollama-obj-7` carries neither count.** `/home/user/work/evidence/ollama-proofs/` holds no `obj-7-*` file (Glob over that directory), and the report's § Failing-first proofs table (`conform-ollama-report.md:72-80`) has no `ollama-obj-7` row. The report substitutes `npm run check` and `npm run lint:check` at `:88`. Those measure compilation and lint; the row's subject is a runtime measurement swap (`Date.now()` → `performance.now()` at `tests/service/OllamaProvider.test.ts:356`, `:364`, `:367`, `:368`, `:373`) feeding a boundary assertion at `:379` and a `timeout` option at `:385`. The brief's Method step at `conform-ollama-brief.md:189` puts this row in the behavioural bucket: it is neither placement, naming, nor documentation.
- **`ollama-obj-2`'s `tests/service/**` half is unrun in either state.** The inlined arrows in `tests/service/{budget,compaction,conversation,lifecycle,schema,scopes}.test.ts` execute in no recorded run; the same substitute is offered at `conform-ollama-report.md:88`.
- **`ollama-obj-4`'s equivalence reading carries no negative control.** `obj-4-before-helpers.txt` and `obj-4-after-helpers.txt` both read `32 passed (32)`; `obj-4-before-setupserver.txt` and `obj-4-after-setupserver.txt` both read `10 passed (10)`. `.claude/rules/quality.md:61` fixes the standard: "An identity check whose control reports 'same' has measured nothing." The reading is not vacuous — I read `tests/src/server/helpers.test.ts:198-218` and the replaced branches are each covered (record pass-through, JSON string to record, malformed string, non-object JSON, neither) — but no planted mutation was recorded, so the instrument itself was never made to fail.
- **The documentation rows carry no recorded old-form sweep.** § Sweeps (`conform-ollama-report.md:94-101`) records the old symbol name, numbered citations, control identifiers, substitutions, nested functions, deferrals, counts, and the old `parseBody` prose contract. `ollama-subj-4`, `-5`, `-8`, `-9`, `-10`, `-13`, and `-14` are documentation rows whose deleted forms (the imperative Summary openers, the short `WireChatRequest` shape, the "the app enables" clause, "observability is a later pass", the old `options` one-liner, "the internal wire-shape `OllamaProvider.#fetch`", "live-only `src:server` test suite") appear under no recorded sweep, which `conform-ollama-brief.md:189` required for exactly this row class.

Smallest correct fixes, in order of weight:

1. Run `npm run test:service` against a real Ollama daemon and record the reading, closing `ollama-obj-7`, `ollama-obj-2`'s service half, and `ollama-obj-6`'s live half. That is a host run, not a rewrite; `package.json` invokes `test:service` from `prepublishOnly`, so today it first executes at publish.
2. For `ollama-obj-4`, plant one mutation (`parseJSONAs(value, isString)` in `src/server/helpers.ts:220`), record `tests/src/server/helpers.test.ts` red, restore, and record it green.
3. For each documentation row, record the word-boundary sweep over the deleted phrase plus its case-insensitive inflections over `src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md`.

The tree state behind item 3 is clean — I ran the deleted-form checks myself and they read empty — so item 3 closes a missing record rather than a missing repair.

**5. Guide parity holds; no `AGENTS §` citation survives in the touched files — CONFIRMED**

- Surface bijection: the export set I read from `src/**` (`createOllama`, `parseBody`, `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaResponse`, `WireChatRequest`, `OllamaOptions`, `OllamaHTTPErrorOptions`, `mapMessages`, `buildResult`, `extractContent`, `extractThinking`, `joinThinking`, `extractUsage`, `extractTools`, `extractArguments`, `DEFAULT_OLLAMA_URL`, `DEFAULT_KEEP_ALIVE`, `DEFAULT_PROVIDER_TIMEOUT`, `MAX_ERROR_BODY_LENGTH`, `OllamaProvider`) matches the `## Surface` rows at `guides/ollama.md:59-79` exactly, with `buildResult` at `:72` replacing the renamed row.
- Methods table: `guides/ollama.md:93-96` lists `generate` and `stream`. I verified the exclusion of the new `id` getter against the installed extractor rather than its prose: `node_modules/@orkestrel/guide/dist/src/core/index.js:1175` matches `/^\t(?:async )?\*?(\w+)\??(<.*>)?\(/`, which cannot match `	get id(): string {` because a space follows `get`. So the `fleet-F2` conversion at `src/server/OllamaProvider.ts:133` does not enter the method bijection, and `format` at `:154` was already in that shape.
- Readonly data: `OllamaResponse`, `WireChatRequest`, `OllamaOptions`, and `OllamaHTTPError.code` all keep Surface rows (`guides/ollama.md:61`, `:66`, `:62`, `:67`), with `format?` added to `:66` and `code` to `:67`.
- Fence transcription: `tests/guides.test.ts:179-202` transcribes the § Surface and § Context framing fences and executes them against `@src/server`; the Context-framing case at `:199` asserts the same `ContextFormat` object the fence at `guides/ollama.md:189-199` builds.
- No `AGENTS §` survives in any touched file, per the `§` sweeps recorded under claim 3.

**6. Every breaking change is named under § Breaking with its consumers and the exact consumer edit — CONFIRMED**

`conform-ollama-report.md:119-128` names `assembleResult` → `buildResult` and the `parseBody` return-type widening, each with its publication path (`src/server/index.ts:4` and `:5`), its importers, and the exact edit. I verified the consumer claim rather than accepting it: a `@orkestrel/ollama` search across `/home/user/fleet/*/package.json` returns only `/home/user/fleet/ollama/package.json:2`, its own name, so no fleet consumer is owed an edit. No other published symbol is renamed or removed by the diff: `ollama-obj-3` adds a member and `fleet-F2` converts a field to a getter over the same `readonly id: string` contract, and the report states the getter's runtime consequence at `:126`. I confirmed that consequence is unreachable in owned code — no `JSON.stringify`, `Object.keys(provider`, spread, or `structuredClone` of a provider instance exists under `src`, `tests`, `guides`, or `README.md`.

**7. The diff touches only Owned files; no shim added — CONFIRMED**

`/home/user/work/evidence/conform-ollama.status` lists 31 modified paths and no untracked entry. Every path falls under `src/**`, `tests/**` outside the vendored set, `guides/ollama.md`, `guides/README.md`, or `README.md`. `package.json`, `package-lock.json`, `node_modules`, `configs/**`, `scripts/**`, `.claude/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, and every `guides/<dependency>.md` mirror are absent from the status. No compatibility alias or re-export for `assembleResult` appears anywhere in the diff, and my case-insensitive sweep for that name returns nothing.

**8. No `.skip`, `.only`, `.todo`, retry, or inflated timeout added — CONFIRMED; the gate reading — NOT-EVIDENCED**

First conjunct: a sweep of `TODO|FIXME|\.skip\(|\.only\(|\.todo\(|@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable|debugger|console\.` over `src` returns nothing and over `tests` excluding the vendored set returns only `tests/src/server/integration.test.ts:154`, a comment naming `console.info` as a thing that does not remain. A sweep of the diff for `^[+-].*(retryUntil\(|attempts:|timeout: [0-9]|TIMEOUT = |retry\b)` returns only `timeout: 1` relocated identically at diff `:1522`/`:1537` and `:1561`/`:1576`; every `retryUntil` call and `{ attempts: 3, budget: RETRY_BUDGET }` bound stays a context line, so no retry was added and no timeout inflated.

Gate reading: NOT-EVIDENCED. The report's § Gates table names `format:check`, `lint:check`, `check`, `build`, and `test`, each with exit 0 and a capture file, and the files `gate-1-format-check.txt` through `gate-5-test.txt` exist under `/home/user/work/evidence/ollama-proofs/`. Those are the unit's own exec. A read-only lane cannot take the deciding run; it settles on the Orchestrator's run at landing.

**9. Nothing hidden; the disposition table matches the diff — CONFIRMED**

No TODO, deferred row, commented-out code, or debug residue entered the owned tree, per the sweep under claim 8. I walked every row's disposition against the diff hunks and each `applied` claim has its hunk; `fleet-F1`'s `noop` has no hunk and no surviving symbol. The consumer edit the addendum required (`symbol.kind` → `symbol.keyword`) is present at `tests/guides.test.ts:123` and recorded at `conform-ollama-report.md:9-13`. The report's Observations section discloses what was left rather than concealing it, including the leftover in-body assignments my own sweep independently found.

## Findings outside the claims

**O1. `/home/user/fleet/ollama/tests/guides.test.ts:2` — the unit authored a banned pointer.** The rewritten header reads "The constants below and the flagship-fence transcription at the end are this package's own". `.claude/rules/writing.md` § Code tokens, references, and links: "Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`." The unit replaced this sentence in this change, so the word is newly authored rather than inherited. It matters because the file is the parity drop-in a sibling package copies, so the defect propagates on the next copy. Right form: "The constants following and the flagship-fence transcription at the end are this package's own".

**O2. `/home/user/fleet/ollama/tests/guides.test.ts:176` — the same defect in the new block's header.** The comment reads "Name resolution is what the loop above proves; this block proves the values the fence comments claim." Same rule sentence. The whole comment block is new in this diff (`/home/user/work/evidence/conform-ollama.diff:748-751`). Right form: "Name resolution is what the preceding loop proves".

**O3. `/home/user/fleet/ollama/tests/service/OllamaProvider.test.ts:484` and `:509` — in-body function assignments survive the unit.** Both read `const transport: typeof globalThis.fetch = (input, init) => { … }`, neither passed directly as an argument nor returned directly as a result. `.claude/rules/architecture.md` § Functions and orchestration bans the form in `tests/**/*.ts`. I reproduced them with the report's own pattern (`^[[:space:]]+(const|let|var) [A-Za-z_$][A-Za-z0-9_$]* *(: *[^=]+)? *= *(async )?(\(|function|<)|^[[:space:]]+(async )?function[* ]` over `/home/user/fleet/ollama/tests` excluding the vendored set), which returns those lines and nothing else. This matters beyond the sites: `ollama-obj-2`'s refuter reported that its own re-run over the same directory returned only the enumerated sites plus two vendored non-function hits (`conform-ollama-brief.md:142`), so the row's population came from an instrument that could not see these lines, and any later row derived the same way inherits the blind spot. Right form: extract one exported `createRecordingTransport(recorder)` into `tests/setupServer.ts` beside `createRefusingTransport` and `createStreamingTransport`, assert it in `tests/setupServer.test.ts`, and use it at both sites — and re-derive the population with the corrected pattern before scoping the unit that does it.

**O4. `/home/user/fleet/ollama/tests/guides.test.ts:194` — a newly authored parameter named for nothing.** The transcription writes `render: (one) => \`<instruction>${one.content}</instruction>\``. The parameter carries an instruction, and `one` names a quantity instead. The fence it transcribes writes `(i)` at `/home/user/fleet/ollama/guides/ollama.md:194`, which is no better. It matters because the transcription exists to keep the fence honest, and a reader comparing them meets two different placeholder names for the same value. Right form: `render: (instruction) => \`<instruction>${instruction.content}</instruction>\`` in the test, and the identical parameter name in the guide fence.

**O5. Prose defects in files this unit owns and touched, filed by the report but assigned to no unit.** Each sits outside every row's declared population, so leaving them was correct under the fixed-scope law — but `.agents/orchestration.md` § Carry every finding requires each to name a carrier, and none does:

- `/home/user/fleet/ollama/guides/README.md:36` reads "the toolchain above". Right form: "the toolchain earlier".
- `/home/user/fleet/ollama/guides/ollama.md:116` reads "Assertions are structural (robust to a small model's nondeterminism)". `.claude/rules/writing.md` § Substitutions replaces `robust` with the measured property. Right form: "Assertions are structural — they hold whatever wording a small model produces."
- `/home/user/fleet/ollama/guides/ollama.md:105` reads "the SPLITTER is the guarantee". `.claude/rules/writing.md` § Claims and time refuses `guarantee` as a claim about behavior. Right form: name what the splitter does — "the splitter is what keeps the assembled content clean".
- `/home/user/fleet/ollama/README.md:34` still reads `result.content // 'ok'`, the exact fence claim `ollama-obj-6` corrected at `guides/ollama.md:22`. Right form: the same rewording, "the assistant's answer text".

## Referrals to the Orchestrator

**R1. Where do the `tests/service/**` rows close?** `ollama-obj-7`, `ollama-obj-2`'s service half, `ollama-obj-6`'s live half, and the test-comment sites of `ollama-subj-1` and `-2` have executed in no run. `package.json` invokes `test:service` from `prepublishOnly`, so today they first execute at publish, against a daemon. Whether this tip lands now and proves at publish, or waits for a daemon-backed reading, is yours. This is the substantive half of my claim 4 refutation, and no re-dispatch of the writer can close it inside this container.

**R2. `OllamaHTTPError.status` carries `0` as a "no HTTP response was received" sentinel.** `src/server/OllamaProvider.ts` throws it on the null-body branch, and `src/server/errors.ts:31-34` and `guides/ollama.md:100` both document it. `AGENTS.md` § Design laws reaches it: "Absence is `undefined`. Never invent sentinels." The refuter filed this under `ollama-obj-3` and left it to you, and adding `code` does not close it. I record no verdict because it is a ruling on a published error contract the rows did not open.

**R3. `OllamaProvider` still declares `readonly name = 'ollama'` ahead of its `#` fields** (`src/server/OllamaProvider.ts:82`). `fleet-F2` named `id` only, so one class now presents `id` and `format` as getters and `name` as an own field. The fleet ruling's own pre-check applies unchanged here — no owned code serializes or key-enumerates a provider. Whether `fleet-F2` extends to `name` across the fleet, or the fleet accepts the mixed shape, is your ruling rather than a defect in this unit.

## Claims attacked and held

Claims 1, 2, 3, 5, 6, 7, 9 and claim 8's first conjunct were attacked with re-run sweeps, the installed `@orkestrel/contract` and `@orkestrel/guide` declarations, the export set read from source, and the captured proof files, and each held. Claim 4 broke on evidence I could take read-only. Claim 8's gate reading was not attackable from this lane.

VERDICT: FAIL 4; outside the claims: O1, O2, O3, O4, O5
