I'll read the brief in full first, then follow its instructions exactly while staying read-only.The brief is a read-only evidence map. I'll load the unit rows, audit claims, report, and diffs next.I'll map each row's current sites, then sweep the diff, proofs, and old-form names. The output will stay to the brief's sections.I'll pin each row's current lines and run the old-form and residue sweeps next.I'll sweep remaining old forms, residue, writing hits, and the fleet rename, then read the last named sites.# Question

For every row of unit conform-ollama, what does the tree at `/home/user/fleet/ollama` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

# Evidence

Law quotes (the sentence each row cites): `writing.md:38` “Claim only what the reader can check.” `documentation.md:23` “`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.” `writing.md:53` “Write link text as the destination's title or a descriptive phrase, introduced by `see`.” `AGENTS.md` Writing: “**NEVER name a list item by its position.** Write the item's name, never its ordinal or its number.” `documentation.md:35` “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.” `AGENTS.md` Documentation contract: “Keep public exports and behavioral methods in guide parity.” `documentation.md:34` “A parity failure identifies drift; never suppress or weaken the test.” `writing.md:95` `via` → “`through`, `by using`”; `writing.md:51` “Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`.” `writing.md:15` “Never write `we`, `our`, or `let's` about agent work.” `AGENTS.md` Design laws: “**Mechanism, not product policy.**” `typescript.md:87` “Do not document speculative future product behavior unless requested.” `writing.md:41` “Do not write `currently`, `now`, `new`, `latest`, or `soon`.” `AGENTS.md` Non-negotiable: “**ALWAYS** finish the requested implementation: no empty stubs, deferred logic, or concealed follow-up work.” `names.md:120` transliterated option keys must have TSDoc that names the source. `names.md:96` “`build*` assembles a composite value from parts…” `documentation.md:32` “Every public export is documented.” `documentation.md:39` “Re-read the prose last, against what actually shipped.” `names.md:224` “`@internal` methods; use `#` privacy.” `patterns.md:118` “`parsers.ts` | Flat coercers returning `T | undefined`.” `names.md:173` “`parse*`: coercion producing `T | undefined`.” `AGENTS.md` “Absence is `undefined`.” `architecture.md:161-163` nested-function ban and the two permitted in-body forms. `typescript.md:71-72` error `code` and a public guard. `patterns.md:20` “Never reimplement or rename-wrap a declared package primitive.” `tests.md:70-72` flagship-fence transcription. `tests.md:38` `performance.now()`, never `Date.now()`. `tests.md:182` “Export every reusable helper… from setup files.” `architecture.md:49` “Extract local declarations by kind.”

## ollama-subj-1

1. **Site now.** `guides/ollama.md` brief `:87` → now `:91` (`generate` produces…; no `AGENTS §`). Brief `:102` → now `:102` (“DOC ↔ SOURCE bijection”; no `AGENTS §`). Brief `:116` → now `:116` (“Tested LIVE… NO `skipIf`”; no `AGENTS §16`). Brief `:117` → now `:117` (“DOC ↔ SOURCE method bijection”; no `AGENTS §22`). Brief `:258` → now `:260` ``- [`AGENTS.md`](../AGENTS.md) — the coding rules this package is written to.`` Context `:259` contract guide, `:261` README index. `guides/README.md:4` now `:3-4` “directory.” Brief `:41` (`## See also` bullet) **deleted**; file ends `:37` “published rather than from a copy that drifts.” `src/server/errors.ts:4` now `:3-4` “so a `catch` can branch on `error.status` / rather than parsing a message.” `src/server/constants.ts:1` now `:1-2` “// Ollama constants — the provider's defaults.” `tests/setup.ts` brief `:6` → `:6` factory header (no `AGENTS §`); `:23` → `:21` `export function createUserMessage`; `:32` → `:31` `Build \`count\` alternating`; `:55` → `:58` throwing-summarizer header; `:67` → `:70` `@param message`; `:81` → `:95` `export function createRecordingSummarizer` (inserted block shifted later sites); `:107` → `:128` `Populate a {@link WorkspaceInterface}`. `tests/service/OllamaProvider.test.ts:478` → `:476` `describe('OllamaProvider (recording proxy — transport seam custom fetch)'`. `tests/service/authority.test.ts:10` → `:10` “mocks for the inference boundary.” `tests/service/schema.test.ts:9` → `:9` same phrase. `tests/service/budget.test.ts:12` → `:10` same phrase. `tests/service/tools.test.ts:24` → `:24` same phrase. `tests/service/lifecycle.test.ts:11` → `:11` same phrase. `tests/service/compaction.test.ts:85` → `:84` “no mocks for the inference boundary”; `:152` → `:134` “no skipIf, no mocks.” `tests/src/server/integration.test.ts:44` → `:44-45` “hardcoded binary fixture: a small / deterministic binary payload…” (no `AGENTS §16.1`).

2. **Diff at the site.** `guides/ollama.md` `@@ -99,22 +99,22 @@`, `@@ -254,6 +256,6 @@`; `guides/README.md` `@@ -1,7 +1,7 @@`, `@@ -35,7 +35,3 @@`; `src/server/errors.ts` `@@ -1,7 +1,7 @@`; `src/server/constants.ts` `@@ -1,4 +1,4 @@`; `tests/setup.ts` `@@ -1,12 +1,13 @@` and later comment hunks; `tests/src/server/integration.test.ts` `@@ -41,8 +42,8 @@`; service-test comment hunks as listed in the diff index. Operative repair text **present** in `+` lines: `+// Ollama constants — the provider's defaults.` (`constants.ts`); errors header ends at “rather than parsing a message.”; `+directory.` (`guides/README.md`); `+` See-also bullet deleted (`- ## See also` / `- [\`AGENTS.md\`]…§5…`); `+ - [\`AGENTS.md\`](../AGENTS.md) — the coding rules this package is written to.`

3. **Old form sweep.** Patterns `AGENTS §`, `§5`, `§12`, `§16`, `§16.1`, `§22` over `src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md` (no `node_modules`). `AGENTS §` **no hit** in those paths. Bare `§` hits: `tests/guides.test.ts:180` “`guides/ollama.md` § Surface”; `:189` “§ Context framing”; `tests/service/factories.test.ts:25` “guide's § Surface fence”. Inflections of the citation token: **no hit** for `AGENTS §§` / `agents §`.

4. **Report reading.** Disposition `applied`. Sentence: “Every `AGENTS §N` citation deleted at the re-derived population. Sweep `grep -rn "§" src tests guides/ollama.md guides/README.md README.md --include=*.ts --include=*.md` (vendored set excluded) now returns only the three `§ <heading name>` references I authored in `tests/guides.test.ts:180`, `:189` and `tests/service/factories.test.ts:25`…” Those three lines **now carry** heading-name `§` refs, not numbered `AGENTS §N`.

5. **Proof reading.** Documentation row. Report sweep: `grep -rn "§" …` → three heading refs. Field-3 sweep **agrees** on those three hits in the named paths; `AGENTS §` empty.

## ollama-subj-2

1. **Site now.** `guides/ollama.md:5` now `:5` “never `as` —” (no `§14`). `:105` now `:105` “the SPLITTER is the guarantee.” (no `H4`). `:106` “Non-stream vs. NDJSON stream.” (no bare `§`). `:109` tool-call entry (no `H4`). `:110` “Boundary narrowing — all wire `unknown`”. `:113` transport-seam entry. `:244` now `:246` “the browser to own-server to LLM deployment, end-to-end”. `:257` now `:258-260` See also without campaign numbers. `src/server/OllamaProvider.ts` brief `:44` → `:44` `**Think separation.**`; `:53` → `:53` `**Boundary narrowing.**`; `:107` → `:108` `// The transport seam: a custom fetch`; `:191` → `:203` `// The per-call think separator:`; `:209` → `:221` “the parser handles partial LINES.”; brief `:351` (`§14: the hook's result`) **moved** — now `:364` “merged through `Object.entries`, no `as`.” Current `:351` is the `#fetch` catch comment (“clear the deadline…”). `src/server/parsers.ts:2` now `:2` “never a raw `SyntaxError`.” `src/server/helpers.ts:4` now `:4` “no value is reached through `as`.” `src/server/constants.ts:29` now `:29` “without limit.” `src/server/factories.ts:46` now `:46` “Route through your own server with an obfuscated token:”. `tests/service/transport.test.ts:7` still scenario header; `:22` now `:22` `describe('browser → own server (obfuscated token) → live LLM, end-to-end'`; `:51` still proxy assertion comment. `tests/service/factories.test.ts:42` now live-fence case body. `tests/service/authority.test.ts:10` as above.

2. **Diff.** `OllamaProvider.ts` `@@ -38,19 +38,19 @@` `+ * - **Think separation.**` `+ * - **Boundary narrowing.**`; `@@ -104,7 +105,7 @@` `+		// The transport seam: a custom fetch`; parsers `@@ -1,18 +1,19 @@` `+// coerced to a record inside a total guard, never a raw \`SyntaxError\`.` helpers `@@ -1,13 +1,13 @@` factories `@@ -43,7 +43,7 @@` `+ * Route through your own server with an obfuscated token:`; transport `@@ -19,7 +19,7 @@` `+describe('browser → own server (obfuscated token) → live LLM, end-to-end', () => {`. Repair strings **verbatim** on those `+` lines. `H4` / `S2` / `§14` / `§21` **absent** from `+` lines.

3. **Old form sweep.** `\bH4\b`, `\bS2\b`, `clause [0-9]`, `§14`, `§21`, `§5`, `§22` over the five paths: **no hit** in `src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md`. Remaining `S2` only in vendored `guides/*.md` mirrors (outside the named paths). Inflections `H4s` **no hit**.

4. **Report.** `applied`. “Every bare `§N`, `H4`, and scenario `S2` token deleted… Sweep `grep -rnE "\bH[0-9]\b|\bS[0-9]\b|clause [0-9]" …` exits 1 (no match).” Tree matches that sweep on the named paths.

5. **Proof.** Documentation/naming. Report control-id sweep empty; field 3 **agrees**.

## ollama-subj-3

1. **Site now.** Brief `:81` → now `:81` “the boundary narrowing of every wire `unknown` through the `@orkestrel/contract` guards”. Brief `:107` → now `:107` “(the implicit-open case: the reasoning prefix had already streamed before the bare `</think>` revealed it, so the result drops it and the yields cannot be recalled)”.

2. **Diff.** `guides/ollama.md` `@@ -54,37 +54,37 @@` and `@@ -99,22 +99,22 @@`. `+` cells carry those two replacement strings **verbatim**.

3. **Old form.** `clause 9`, `clause 4`, `clause [0-9]` over the five paths: **no hit**. Inflections `clauses` not required; `clause` + digit **no hit**.

4. **Report.** `applied`. Surface prose and “Contract entry 6” implicit-open wording **match** `:81` and `:107`.

5. **Proof.** Report `clause [0-9]` sweep empty; field 3 **agrees**.

## ollama-subj-4

1. **Site now.** Surface table `guides/ollama.md:59-79` (brief `:59,:67,:71-79`): `:59` “A `ProviderInterface` over a local Ollama daemon…”; `:67` “The error thrown at the `/api/chat` HTTP boundary…”; `:71` “The projection of conversation turns…”; `:72` “The assembly of a `ProviderResult`…”; `:73` “The coercion of a non-stream…”; `:74-79` noun phrases as filed (`One wire record's…`, `The join of a call's two reasoning carriers…`, `A wire \`function.arguments\`…`).

2. **Diff.** `@@ -54,37 +54,37 @@`. Finder noun-phrase cells **present** on `+` lines (plus `:67` `code` / `'HTTP'` from obj-3 and `:72` `buildResult` from subj-12).

3. **Old form.** Exact openers `Create a \`ProviderInterface\``, `Map conversation turns`, `Assemble a \`ProviderResult\``, `Parse a non-stream`, `Thrown at the` over the five paths: **no hit**. Inflections `Created`/`Mapping` not swept as symbols; those exact phrases **no hit**.

4. **Report.** `applied`. “Every function row's Summary cell in `### Surface` rewritten as a noun phrase, including `:67`'s participle row.” Tree `:59-:79` are noun phrases.

5. **Proof.** Placement/docs. Sweep of old imperatives empty; **agrees**.

## ollama-subj-5

1. **Site now.** Brief `guides/ollama.md:66` against `src/server/types.ts:35-67`. Guide `:66` shape `{ model; messages; stream; keep_alive; think; options?; tools?; format? }` plus “`format` is the `/api/chat` structured-output constraint, forwarded verbatim from the per-call `ProviderStreamOptions.schema` and absent when no schema is supplied.” `types.ts:60-66` still `readonly format?: Readonly<Record<string, unknown>>`. `OllamaProvider.ts:392` `...(options?.schema !== undefined ? { format: options.schema } : {})`.

2. **Diff.** Same Surface hunk. `+` line for `WireChatRequest` includes `format?` and the `format` sentence **verbatim**.

3. **Old form.** Shape without `format?`: **no hit** in `guides/ollama.md`.

4. **Report.** `applied`. Cited shape and sentence **match** `:66`.

5. **Proof.** Docs. Report does not record a separate old-shape grep; field 3 empty **agrees** with absence of the short shape.

## ollama-subj-6

1. **Site now.** Guide `:5` `through` (not `via`); `:62` full `Promise<Readonly<Record<string, string>>>`; `:105` `for example \`qwen3\``; `:106` still `vs.`; `:110,:113` no `via`; `:131` real prompt “Summarize the release notes…”; `:140` `through \`AbortSignal.any\``; `:162` capitalised client sentence; `:182` still `vs.`; `:197` now `:199` “the ContextFormat preceding”; `:220` `for example an empty model string`; `:233` now `:235` “`404` for an unpulled model”; `:236` now `:238` “(`temperature`, `seed`, and `num_predict`)”; `:249` now `:251` “asserting the wire request and response shapes stay compatible”. `OllamaProvider.ts:41` `through {@link OllamaOptions.think}`; `:47` `through \`extractThinking\``; `:117` → `:118` `through \`build(this.#provider.format)\``; `:200` → `:212` “tail flush following”; `:236` → `:248` “assembly preceding”; `:339` → `:351` “once `#fetch` returns a response”; `:352` → `:364` `merged through \`Object.entries\``. `types.ts:76` bounded list; `:81` `for example`; `:98` → `:99-101` sampling block; `:102` `for example \`qwen3\``; `:113` → `:117` “an instrumented wrapper)”; `:120` `for example`; `:133` → `:137` still `vs.` `factories.ts:13` bounded list; `:26` still `vs.` `errors.ts:13` → `:12-13` `for example a \`null\` body`.

2. **Diff.** Multiple `@@` on those files. `+ CONFIGURABLE through`, `+ through \`extractThinking\``, `+ through \`build(…)\``, `+ preceding` / `+ following`, `+ for example`, bounded `temperature`, `seed`, and `num_predict`. Refuter **strike** of `vs.` replacement: `vs.` **remains** at `guides/ollama.md:106,:182`, `types.ts:137`, `factories.ts:26`. `+` lines do **not** replace `vs.` with `rather than`.

3. **Old form sweep** (`\bvia\b`, `\babove\b`, `\bbelow\b`, `\bour\b`, `\bwe\b`, `e\.g\.`, `i\.e\.`, `etc\.`, `…`) over `src`, `tests`, `guides/ollama.md`, `guides/README.md`, `README.md`:
   - `src`: **no hit** for `via`/`above`/`below`/`we`/`our`/`e.g.`; `…` at `src/server/helpers.ts:178` ``// [{ id: '…', name: 'weather', arguments: {} }]``.
   - `guides/ollama.md`: `…` inside `<think>…</think>` at `:105`; **no** `via`/`above`/`below`/`we`/`our`/`e.g.`
   - `guides/README.md:36` “the toolchain above”
   - `README.md`: **no hit**
   - `tests` (non-vendored): `via` `tests/service/compaction.test.ts:80`, `tests/service/tools.test.ts:439`, `tests/src/server/integration.test.ts:209,:272,:706`, `tests/setup.test.ts:442,:467,:492`; `above`/`below` `tests/setupService.test.ts:195`, `tests/service/lifecycle.test.ts:180`, `tests/guides.test.ts:2,:38,:176`, `tests/service/OllamaProvider.test.ts:150`, `tests/service/tools.test.ts:284,:356`, `tests/setup.test.ts:55,:140`, `tests/src/server/OllamaProvider.test.ts:647`, `tests/service/compaction.test.ts:226`; `we` `tests/service/budget.test.ts:64`, `tests/service/compaction.test.ts:290`, `tests/src/server/integration.test.ts:57,:151,:202,:220,:237,:253,:289`, plus `tests/conformance.test.ts` titles/comments `:17-:144` (“we send” / “we read”); `our` `tests/conformance.test.ts:17,:26,:67,:83,:102,:106,…` and `tests/service/lifecycle.test.ts:14` “OUR plumbing” (case-insensitive `\bour\b` **no hit** on `OUR` unless `-i`; case-insensitive sweep **hits** `:14`).

4. **Report.** `applied`. “`via` → `through`, `e.g.` → `for example`, trailing `…` bounded, `above` → `preceding`, `below` → `following`, `we`/`our` named. `vs.` left in place…” Cited sweep paths `src guides/ollama.md guides/README.md README.md` → three hits `helpers.ts:178`, `guides/ollama.md:105`, `guides/README.md:36`. Those three **now carry** what the report says. Report did **not** claim a `tests/**` clean sweep.

5. **Proof.** Report substitutions sweep vs field 3: **agrees** on `src` + `guides/ollama.md` + `README.md`; field 3 **adds** `guides/README.md:36` (report already names it) and **many** `tests/**` hits the report's instrument excluded.

## ollama-subj-8

1. **Site now.** `guides/ollama.md:105` ends the think sentence at “overrideable per call through `ProviderStreamOptions.think`. Set `think: true` when the caller displays reasoning separately from the answer.” No “the app enables”.

2. **Diff.** Contract hunk `@@ -99,22 +99,22 @@`. `+` line contains both repair clauses **verbatim**. Deleted clause absent from `+`.

3. **Old form.** `the app enables`, `thinking collapsible`, `DISPLAYS reasoning`: **no hit** in the five paths.

4. **Report.** `applied`. Quoted replacement **matches** `:105`.

5. **Proof.** Sweep empty; **agrees**.

## ollama-subj-9

1. **Site now.** `:5` “It publishes no events: each call is a pure function of its arguments.” Brief `:115` → now `:115` “**Event-free.** A pure functional boundary — no Emitter, no events.” (unchanged, per refuter strike). `:237` → now `:239` “- **Observe at the call site** — the provider publishes no events; read `stream`'s deltas and its returned result for everything a turn produced.”

2. **Diff.** `@@ -2,7 +2,7 @@` `+It publishes no events: each call is a pure function of its arguments.`; practices hunk `+ - **Observe at the call site** — …`. `:115` **not** rewritten in the diff (context only).

3. **Old form.** `later pass`, `No events yet`, `observability is a`, `separate pass`: **no hit** in the five paths (`observability` only in vendored `guides/server.md`).

4. **Report.** `applied`. `:5` and practice bullet **match**; “Contract entry 14 left unchanged” **matches** `:115`.

5. **Proof.** Sweep empty; **agrees**.

## ollama-subj-10

1. **Site now.** Brief `src/server/types.ts:98` → now `:98-103`:
```
	/**
	 * Carries passthrough sampling parameters (`temperature`, `seed`, and `num_predict`).
	 * Mirrors the Ollama `/api/chat` `options` field, whose value this key carries verbatim
	 * onto {@link WireChatRequest.options}.
	 */
	readonly options?: Readonly<Record<string, unknown>>
```

2. **Diff.** `types.ts` `@@ -95,11 +95,15 @@`. `+` block matches the finder TSDoc **verbatim**.

3. **Old form.** `passthrough sampling options` (old one-liner) **no hit**. `num_predict` / …` old ellipsis list **no hit** on this member.

4. **Report.** `applied`. Cited block **matches** `:98-102`.

5. **Proof.** Docs. Old one-liner gone; **agrees**.

## ollama-subj-12

1. **Site now.** Brief `src/server/helpers.ts:65` → now `:65` `export function buildResult(`; doc `:48` “Builds a provider result from a turn's content, reasoning, tool calls, and usage.” Call sites `OllamaProvider.ts:176,:252,:269`. Guide `:72` `` `buildResult` ``; `:81` names `buildResult`. Tests `tests/src/server/helpers.test.ts:4,:66,:68,:75,:84`. Barrel `src/server/index.ts:4` `export * from './helpers.js'` (unchanged).

2. **Diff.** `helpers.ts` `@@ -45,7 +45,7 @@`, `@@ -55,14 +55,14 @@` `+export function buildResult(`; `OllamaProvider.ts` `@@ -21,7 +21,7 @@` `+	buildResult,`; call-site hunks replace `assembleResult(`; `helpers.test.ts` `@@ -1,7 +1,7 @@` `+	buildResult,` `@@ -63,16 +63,16 @@` `+describe('buildResult', () => {`. Repair name **verbatim** on `+` lines. `assembleResult` only on `-` lines.

3. **Old form.** Word-boundary `assembleResult` and case-insensitive `assembleresult(s|ed|ing)` over the five paths: **no hit**. Wider `\bassembl(e|es|ed|ing)\b`: `src/server/OllamaProvider.ts:50,:62,:168,:204`; `guides/ollama.md:3,:5,:26,:45,:91,:95,:96,:107,:112,:114,:123,:184`; `README.md:38,:41,:50`; `tests/service/lifecycle.test.ts:21,:24,:56,:86,:117`; `tests/service/OllamaProvider.test.ts:24,:204,:241,:246,:407`; `tests/src/server/integration.test.ts:353`.

4. **Report.** `applied (BREAKING)`. Old-name grep exit 1 **matches** empty `assembleResult`. Wider `assembl*` English **present** as report also records.

5. **Proof.** Behavioural. Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`. Report red `3 failed | 29 passed (32)`; green `32 passed (32)`. Control files exist: `/home/user/work/evidence/ollama-proofs/subj-12-red.txt` `Tests  3 failed | 29 passed (32)`; `subj-12-green.txt` `Tests  32 passed (32)`. **Match.**

## ollama-subj-13

1. **Site now.** `src/server/types.ts:7-22`: `:8-9` “Represents an open `POST /api/chat` response together with the deadline and the combined signal that bound the request.” `:14` “(or that the provider clears on a failed or aborted request)”. No `OllamaProvider.#fetch`. Guide `:61` “The `/api/chat` response shape the provider hands to a consuming call: `{ response: Response; timeout: TimeoutInterface; combined: AbortSignal }` — the open response plus the armed deadline and the `AbortSignal.any` it was issued under.” `#fetch` still named at guide `:81` as class work, not as the type's definition.

2. **Diff.** `types.ts` `@@ -5,13 +5,13 @@`. `+ * Represents an open \`POST /api/chat\` response…`; `+` remarks “the provider clears…”. Guide Surface `+` `OllamaResponse` cell matches finder text.

3. **Old form.** `internal wire-shape`, `OllamaProvider.#fetch`, `internal \`/api/chat\` response shape`: **no hit** in `src` / `guides/ollama.md`. `#fetch` remains as implementation name `OllamaProvider.ts:60,:72,:114,:164,:188,:310,:351,:362` and guide `:81`.

4. **Report.** `applied`. Opening TSDoc and guide `:61` **match**. Report does not claim `#fetch` vanished from the class.

5. **Proof.** Docs. Old “internal…#fetch” type gloss gone; **agrees**. Residual `#fetch` is the private method, not the removed gloss.

## ollama-subj-14

1. **Site now.** `README.md:17-20` “required at runtime by any consumer, and by this repository's live / `service` test project; the `src:server` project is hermetic and passes with / the daemon down”. `guides/ollama.md:164` “The client itself never handles the real API key”. Brief `:162` → now `:164` (two lines inserted above in Patterns).

2. **Diff.** `README.md` `@@ -15,8 +15,9 @@` `+  model — required at runtime by any consumer, and by this repository's live` `+  \`service\` test project; the \`src:server\` project is hermetic and passes with` `+  the daemon down`. Guide `@@ -159,7 +161,7 @@` capitalised client sentence. Repair text **present** (report/refuter “passes with the daemon down”, not finder's “needs no daemon”).

3. **Old form.** `live-only`, `src:server` test suite (as the live-only claim): **no hit**. `the client itself never` (lowercase t): **no hit**.

4. **Report.** `applied`. README bullet and capitalisation **match** (`:17-20`, `:164`).

5. **Proof.** Docs. Sweep empty; **agrees**.

## ollama-obj-1

1. **Site now.** Brief `src/server/parsers.ts:23` → now `:24-28` `export async function parseBody(…): Promise<Readonly<Record<string, unknown>> | undefined> { return parseJSONAs(await response.text(), isRecord) }`. `@returns` `:16` “or `undefined` when the body is empty or malformed”. Call site `OllamaProvider.ts:166` `(await parseBody(response)) ?? {}`. Tests `tests/src/server/parsers.test.ts:11-22` `toBeUndefined()`; titles “yields undefined…”. Guide `:73` “an empty or malformed body yields `undefined` rather than throwing”; `:106` “yields `undefined`, which the call site reads as `{}`”.

2. **Diff.** `parsers.ts` `@@ -20,13 +21,8 @@` `+): Promise<Readonly<Record<string, unknown>> | undefined> {` `+	return parseJSONAs(await response.text(), isRecord)`; `OllamaProvider.ts` `@@ -151,7 +163,7 @@` `+			const record = (await parseBody(response)) ?? {}`; `parsers.test.ts` `@@ -8,17 +8,17 @@` `+		expect(await parseBody(new Response(''))).toBeUndefined()`. Repair **verbatim**.

3. **Old form.** `degrades to \`{}\``, `degrades an empty body to an empty record`, `toEqual({})` on `parseBody`: **no hit** in `guides`/`src`. `tests/src/server/helpers.test.ts:208,:212,:216` still `extractArguments(…).toEqual({})` (different symbol).

4. **Report.** `applied (BREAKING)`. Return type, `parseJSONAs`, call-site `?? {}`, guide `:73` and Contract entry 5 **match**.

5. **Proof.** Command as report. Files `obj-1-red.txt` `Tests  3 failed | 1 passed (4)`; `obj-1-green.txt` `Tests  4 passed (4)`. **Match.**

## ollama-obj-2

1. **Site now.** Brief `tests/src/server/integration.test.ts:804` → now `:803-807` `summarize: createRecordingSummarizer(invocations)` (local `const summarize = async` **gone**). `tests/setup.ts:95-102` `export function createRecordingSummarizer`. `tests/setupService.ts:81` `export function seedConversation`. `tests/setup.test.ts` `function paths` **gone**; `:409` `workspace.files().map((file) => file.path)`. `tests/service/scopes.test.ts` `interface Attempt` **gone**. Remaining in-body function assignments **not** on the brief's site list: `tests/service/OllamaProvider.test.ts:484-487` and `:509-512` `const transport: typeof globalThis.fetch = (input, init) => {`.

2. **Diff.** `integration.test.ts` `@@ -800,12 +801,10 @@` `+			summarize: createRecordingSummarizer(invocations),`; `setup.ts` `@@ -78,7 +79,30 @@` adds `createRecordingSummarizer`; `setupService.ts` `@@ -70,6 +70,29 @@` `+export function seedConversation`; service test hunks inline `retryUntil` arrows; `setup.test.ts` `@@ -368,16 +370,33 @@` deletes `function paths`. Repair **present**. Extra sites `:484,:509` **untouched** by the diff (no hunk there).

3. **Old form.** Named in-body `const attempt… = async () =>` / `function paths(`: **no hit**. `const summarize = async (` at integration `:804`: **no hit**. Hits still: `const transport = (input, init) =>` `tests/service/OllamaProvider.test.ts:484,:509`. Factory-returned arrows `tests/setup.ts:99` `return async (messages) => {` (permitted form). `const summarize = createLiveSummarizer` / `createRecordingSummarizer` / `createThrowingSummarizer` are call results, not in-body function expressions.

4. **Report.** `applied`. “Every named in-body function assignment and the one in-body `function` declaration removed.” Named listed sites **match**. Report § Observations item 1 **names** `:484` and `:509` as outside the row.

5. **Proof.** Behavioural for extracted helpers. `createRecordingSummarizer`: `obj-2-summarizer-red.txt` `Tests  2 failed | 61 passed (63)`; `obj-2-summarizer-green.txt` `Tests  63 passed (63)`. `seedConversation`: `obj-2-seed-red.txt` `Tests  1 failed | 16 passed (17)`; `obj-2-seed-green.txt` `Tests  17 passed (17)`. Extra file `obj-2-integration.txt` `Tests  20 passed (20)` (not in the report table). Service-half inlines: report says unrun here. Field 3 vs report nested-function sweep: report names `:484,:509` as leftover; **agrees**.

## ollama-obj-3

1. **Site now.** Brief `src/server/errors.ts:29` → class starts `:30`; first member `:35` `readonly code = 'HTTP' as const` with doc `:31-34`. Guard `:51-53` unchanged. Tests `:21,:31` `expect(error.code).toBe('HTTP')`. Guide `:67` names `code` `'HTTP'` beside `status`; `:104` “Every throw carries `code: 'HTTP'`”.

2. **Diff.** `errors.ts` `@@ -27,6 +28,11 @@` `+	readonly code = 'HTTP' as const`; `errors.test.ts` `@@ -18,6 +18,7 @@` / `@@ -27,6 +28,7 @@` `+		expect(error.code).toBe('HTTP')`. Repair **verbatim**.

3. **Old form.** Absence of `code` cannot grep; `readonly status: number` still `:36` after `code`. No `as const` on a different code.

4. **Report.** `applied`. Member, tests, guide `:67` and Contract entry 3 **match**.

5. **Proof.** `obj-3-red.txt` `Tests  2 failed (2)`; `obj-3-green.txt` `Tests  2 passed (2)`. **Match.**

## ollama-obj-4

1. **Site now.** Brief `src/server/helpers.ts:221` → now `:218-221` `if (isRecord(value)) return value` / `if (isString(value)) return parseJSONAs(value, isRecord) ?? {}` / `return {}`. Import `:10` includes `parseJSONAs`. `tests/setupServer.ts:44-45` `return parseJSONAs(text, isRecord)` import `:12`.

2. **Diff.** `helpers.ts` `@@ -217,13 +217,6 @@` `+	if (isString(value)) return parseJSONAs(value, isRecord) ?? {}`; `setupServer.ts` `@@ -9,7 +9,7 @@` `+import { arrayOf, isRecord, isString, parseJSONAs }`; `@@ -42,12 +42,7 @@` `+	return parseJSONAs(text, isRecord)`. Repair **verbatim**.

3. **Old form.** `JSON.parse` in `src`: **no hit**. `parseRequestBody` try/catch: **no hit**. Remaining `JSON.parse` in non-vendored tests: `tests/setupService.test.ts:108`, `tests/service/OllamaProvider.test.ts:437,:454`, `tests/service/schema.test.ts:40,:49` (content parsing, not the replaced helpers).

4. **Report.** `applied`. Both bodies **match**.

5. **Proof.** Equivalence, not red/green. `obj-4-before-helpers.txt` / `obj-4-after-helpers.txt` both `Tests  32 passed (32)`; `obj-4-before-setupserver.txt` / `obj-4-after-setupserver.txt` both `Tests  10 passed (10)`. **Match.** Field 3: hand-rolled blocks gone from the two sites; **agrees**.

## ollama-obj-6

1. **Site now.** Brief `tests/guides.test.ts:1` → now `:1-4` header names “flagship-fence transcription”; `:179-201` `describe('flagship fences'` with `:180` Surface and `:189` Context framing. Guide fence comments `:22-23` “the assistant's answer text” / “when the wire reported counts”. `tests/service/factories.test.ts:25-29` live-half case.

2. **Diff.** `guides.test.ts` `@@ -1,7 +1,10 @@`, `@@ -168,3 +171,32 @@` `+describe('flagship fences', () => {`; `guides/ollama.md` `@@ -19,8 +19,8 @@` comment reword; `factories.test.ts` `@@ -22,6 +22,31 @@`. Repair **present**.

3. **Old form.** Untranscribed-fence is an absence; `result.content // 'ok'` still at `README.md:34` (report observation 6). Guide `:22` no longer `'ok'`.

4. **Report.** `applied`. `describe('flagship fences'` **matches** `:179`. Report cites `:180,:189` — those lines **now carry** the heading comments.

5. **Proof.** `obj-6-guides-control.txt` `Tests  1 failed | 19 passed (20)`; `obj-6-guides-after.txt` `Tests  20 passed (20)`; `guides-after-prose.txt` `Tests  18 passed (18)`. **Match** report counts. Live factories half: no daemon-proof file.

## ollama-obj-7

1. **Site now.** Brief `tests/service/OllamaProvider.test.ts:356` and `:364,:367,:368,:373` all `performance.now()`. `:380` `Math.round` still present (read at `:376-385` region).

2. **Diff.** `@@ -353,7 +353,7 @@`, `@@ -361,16 +361,16 @@` five `+ performance.now()` lines. Repair **verbatim**. `Date.now` only on `-`.

3. **Old form.** `Date.now()` in `tests/service/OllamaProvider.test.ts`: **no hit**. Whole `tests/`: **no hit**.

4. **Report.** `applied`. “`grep -rn "Date.now()" tests/service/OllamaProvider.test.ts` exits 1” **matches**.

5. **Proof.** Report: unrun (`service` needs daemon); proof is `check`/`lint`. No `obj-7-*.txt` in `/home/user/work/evidence/ollama-proofs/`. Field 3 empty **agrees**.

## ollama-obj-8

1. **Site now.** Brief `tests/setup.ts:100` → now `:123-125` `/** The fixed sentence {@link fillWorkspace} repeats… */` / `export const FILLER_SENTENCE =`. Proof `tests/setup.test.ts:416-422` `it('fills each document with the exported filler sentence'`.

2. **Diff.** `setup.ts` `@@ -96,15 +120,15 @@` `+export const FILLER_SENTENCE =`; `setup.test.ts` `@@ -387,18 +406,27 @@` adds the case. Repair **verbatim**.

3. **Old form.** Unexported `const FILLER_SENTENCE` **no hit**; only `export const FILLER_SENTENCE` `:124` and uses `:143-144`, import `:27`, assert `:422`.

4. **Report.** `applied`. Export, TSDoc, and fillWorkspace case **match**.

5. **Proof.** `obj-8-red.txt` `Tests  1 failed | 60 passed (61)`; `obj-8-green.txt` `Tests  61 passed (61)`. **Match.**

## fleet-F1

1. **Site now.** `tests/setup.ts` has **no** `isBrowserVuePath`. No `src/browser`, no `app/`, no `tests/setupBrowser.ts`. Helper **absent** (noop path).

2. **Diff.** No hunk adds/deletes `isBrowserVuePath`.

3. **Old form.** `isBrowserVuePath` over `src`/`tests`: **no hit**. Inflections **no hit**.

4. **Report.** `noop`. “`grep -rn "isBrowserVuePath" tests src` exits 1” **matches**.

5. **Proof.** Report sweep empty; field 3 **agrees**.

## fleet-F2

1. **Site now.** `OllamaProvider.ts:82` still `readonly name = 'ollama'` ahead of `#` fields. `:83` `readonly #id: string` first `#` field. `:97` `this.#id = crypto.randomUUID()`. `:133-135` `get id(): string { return this.#id }`. No `readonly id = crypto.randomUUID()`.

2. **Diff.** `@@ -79,8 +79,8 @@` `+#id`; `@@ -94,6 +94,7 @@` `+		this.#id = crypto.randomUUID()`; `@@ -122,6 +123,17 @@` `+	get id(): string {`. Repair **present**. `readonly name = 'ollama'` **unchanged** (report observation 3).

3. **Old form.** `readonly id = crypto.randomUUID()`: **no hit**. JSON.stringify of a provider instance: `JSON.stringify` at `OllamaProvider.ts:324` (request body), `tests/setupService.ts:132`, `tests/setupServer.test.ts:100,:123`, vendored `tests/distribution.test.ts` — **none** stringify a provider.

4. **Report.** `applied`. `#id` / getter **match**. Serialization pre-check sites **match** the files named.

5. **Proof.** Placement. Sweep of old public field empty; **agrees**.

---

## Across the unit

**Scope.** Status paths (`/home/user/work/evidence/conform-ollama.status`), tagged against brief § Scope:

| Path | Tag |
| --- | --- |
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/ollama.md` | owned |
| `src/server/OllamaProvider.ts` | owned |
| `src/server/constants.ts` | owned |
| `src/server/errors.ts` | owned |
| `src/server/factories.ts` | owned |
| `src/server/helpers.ts` | owned |
| `src/server/parsers.ts` | owned |
| `src/server/types.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/service/OllamaProvider.test.ts` | owned |
| `tests/service/authority.test.ts` | owned |
| `tests/service/budget.test.ts` | owned |
| `tests/service/compaction.test.ts` | owned |
| `tests/service/conversation.test.ts` | owned |
| `tests/service/factories.test.ts` | owned |
| `tests/service/lifecycle.test.ts` | owned |
| `tests/service/schema.test.ts` | owned |
| `tests/service/scopes.test.ts` | owned |
| `tests/service/tools.test.ts` | owned |
| `tests/service/transport.test.ts` | owned |
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/setupServer.ts` | owned |
| `tests/setupService.test.ts` | owned |
| `tests/setupService.ts` | owned |
| `tests/src/server/errors.test.ts` | owned |
| `tests/src/server/helpers.test.ts` | owned |
| `tests/src/server/integration.test.ts` | owned |
| `tests/src/server/parsers.test.ts` | owned |

No status path is shared or off-limits. No `package.json` / lockfile / `node_modules` / `.claude/**`.

Hunks whose **file** no row **Where** names (Where is the `file:line` field, not Repair):

- `tests/service/conversation.test.ts @@ -14,33 +14,28 @@` first `+` is inside the inlined `retryUntil` argument (hunk opens on `- const attempt = async (): Promise<{`)
- `tests/service/conversation.test.ts @@ -56,39 +51,34 @@`
- `tests/service/scopes.test.ts @@ -1,4 +1,3 @@` first `+` none in that 1-line hunk (deletion-only); next `@@ -28,55 +27,53 @@` first `+` is the inlined `retryUntil` callback body
- `tests/setup.test.ts @@ -14,16 +14,18 @@` `+import type { AgentResult, Message } from '@orkestrel/agent'`
- `tests/setup.test.ts @@ -368,16 +370,33 @@` `+describe('createRecordingSummarizer', () => {`
- `tests/setup.test.ts @@ -387,18 +406,27 @@` `+	it('fills each document with the exported filler sentence', () => {`
- `tests/setupServer.ts @@ -9,7 +9,7 @@` `+import { arrayOf, isRecord, isString, parseJSONAs } from '@orkestrel/contract'`
- `tests/setupServer.ts @@ -42,12 +42,7 @@` `+	return parseJSONAs(text, isRecord)`
- `tests/setupService.test.ts @@ -17,6 +17,7 @@` `+import { createConversation } from '@orkestrel/agent'`
- `tests/setupService.test.ts @@ -163,6 +164,7 @@` `+	seedConversation,`
- `tests/setupService.test.ts @@ -340,6 +342,19 @@` `+describe('seedConversation', () => {`
- `tests/setupService.ts @@ -1,4 +1,4 @@` `+import type { ContextFormat, ConversationInterface, Message } from '@orkestrel/agent'`
- `tests/setupService.ts @@ -70,6 +70,29 @@` `+/**` (seedConversation TSDoc)
- `tests/src/server/errors.test.ts @@ -18,6 +18,7 @@` `+		expect(error.code).toBe('HTTP')`
- `tests/src/server/errors.test.ts @@ -27,6 +28,7 @@` `+		expect(error.code).toBe('HTTP')`
- `tests/src/server/helpers.test.ts @@ -1,7 +1,7 @@` `+	buildResult,`
- `tests/src/server/helpers.test.ts @@ -63,16 +63,16 @@` `+describe('buildResult', () => {`
- `tests/src/server/helpers.test.ts @@ -81,7 +81,7 @@` `+		expect(Object.keys(buildResult('', '', [], undefined))).toEqual(['content'])`
- `tests/src/server/parsers.test.ts @@ -8,17 +8,17 @@` `+	it('yields undefined for an empty body', async () => {`

**Residue.** Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:
- `timeout` (prose/API, not inflated test timeout): diff `+` `guides/ollama.md` Surface `OllamaResponse` / `OllamaOptions` / `DEFAULT_PROVIDER_TIMEOUT` cells; Contract 15 “120s test/hook timeout”; Patterns “fold an abort, a timeout”; service tests `timeout: TIMEOUT` / `timeout: 1` at diff lines `:895,:937,:985,:1136,:1242,:1337,:1400,:1500,:1537,:1576,:1617,:1674,:1771`
- `skipIf` as **text** in Contract 15 `+` “no `describe.skipIf`” (not `.skip(`)
- `retry` in inlined service comments (`Bounded retry`) on `+` context of obj-2 hunks
- **no hit** for `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, `debugger` on `+` lines

Tree `src` + `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:
- `.skip(` / `.only(` / `.todo(` / `TODO` / `FIXME` / `debugger`: **no hit** in `src`; in remaining `tests` **no** `.skip(` / `.only(` / `.todo(` / `TODO` / `FIXME` / `debugger` call
- `console.`: `tests/src/server/integration.test.ts:154` comment “No passRate / honored / console.info”
- `retry`: `tests/setupService.ts:175,:178,:179`; `tests/service/compaction.test.ts:96,:135,:149,:222,:235`; `tests/setupService.test.ts:7,:378`; `tests/service/lifecycle.test.ts:94,:182`; `tests/service/OllamaProvider.test.ts:82,:144,:242,:408`; `tests/service/tools.test.ts:142`; `tests/service/conversation.test.ts:86`; `tests/service/budget.test.ts:61,:64,:147`
- `timeout`: `src/server/OllamaProvider.ts:15,:57-59,:87,:101,:164,:178,:188,:197,:267,:317-319,:347,:352`; `src/server/factories.ts:12,:31`; `src/server/types.ts:2,:5,:12,:15,:20,:74,:97`; `src/server/constants.ts:17`; plus live-test `TIMEOUT` / `{ timeout:` across `tests/service/**` and `tests/setupService.ts`

**Parity.** Entities the diff touches in `src/**/types.ts` or a class file:

| Entity | Call-signature / methods (`file:line`) | Guide `## Methods` (`file:line`) |
| --- | --- | --- |
| `OllamaResponse` | none (data only `types.ts:19-21`) | no Methods rows |
| `WireChatRequest` | none (`types.ts:36-66`) | no Methods rows |
| `OllamaOptions` | `headers?: () => …` property `types.ts:130-132` (not a class method) | no Methods rows |
| `OllamaHTTPErrorOptions` | none (`types.ts:157`) | no Methods rows |
| `OllamaProvider` | `generate` `OllamaProvider.ts:158-163`; `stream` `OllamaProvider.ts:182-187`; getters `get id` `:133`; `get format` `:154` | `guides/ollama.md:95` `generate`; `:96` `stream` |
| `OllamaHTTPError` | constructor `:38`; no interface call signatures | no Methods rows; Surface `:67` |

Readonly data vs Surface:

| Entity | Interface/class readonly data | Guide Surface / Entities |
| --- | --- | --- |
| `OllamaResponse` | `response` `:19`, `timeout` `:20`, `combined` `:21` | `:61` `{ response; timeout; combined }` |
| `WireChatRequest` | `model` `:36` … `format?` `:66` | `:66` including `format?` |
| `OllamaOptions` | `model` `:87` … `format?` `:144` | `:62` shape including `format?` |
| `OllamaHTTPError` | `code` `errors.ts:35`, `status` `:36` | `:67` `code` `'HTTP'` and `status` |
| `OllamaProvider` | `name` `:82`; `id` via getter `:133`; `format` getter `:154` | `:82` “`id` / `name` are `readonly` data members”; `format` named there |

Barrel `src/server/index.ts:1-7` star-exports `types`, `constants`, `errors`, `helpers`, `parsers`, `factories`, `OllamaProvider`.

Backticked identifiers in guide sentences the diff **added** (representative of repair `+` sentences) and barrel export:

| Identifier | Barrel `src/server/index.ts` |
| --- | --- |
| `buildResult` | yes, via `:4` `helpers.js` |
| `parseBody` | yes, via `:5` |
| `OllamaResponse` | yes, via `:1` |
| `OllamaHTTPError` / `isOllamaHTTPError` | yes, via `:3` |
| `createOllama` | yes, via `:6` |
| `OllamaProvider` | yes, via `:7` |
| `WireChatRequest` / `OllamaOptions` / `ProviderStreamOptions.schema` / `TimeoutInterface` / `AbortSignal.any` / `AGENTS.md` / `service` / `src:server` / `@orkestrel/contract` / `isRecord` | `TimeoutInterface`, `ProviderStreamOptions`, `AbortSignal.any`, `AGENTS.md`, `service`, `src:server`, `@orkestrel/contract` **not** this barrel; `isRecord` not this barrel; `WireChatRequest`/`OllamaOptions` **yes** via `:1` |

**Gates.** Report § Gates, quoted:

> `| \`npm run format:check\` | 0 | "All matched files use the correct format." over 68 files — \`/home/user/work/evidence/ollama-proofs/gate-1-format-check.txt\` |`  
> `| \`npm run lint:check\` | 0 | no diagnostics — \`gate-2-lint-check.txt\` |`  
> `| \`npm run check\` | 0 | root project plus \`configs/src/tsconfig.server.json\`, both clean — \`gate-3-check.txt\` |`  
> `| \`npm run build\` | 0 | ESM + CJS emitted, \`index.d.cts\` copied — \`gate-4-build.txt\` |`  
> `| \`npm test\` | 0 | \`src:server\` 98, \`setup\` 90, \`policy\` 111, \`config\` 46, \`guides\` 20, \`conformance\` 17 — no failures — \`gate-5-test.txt\` |`

Control files exist. `gate-1-format-check.txt` “All matched files use the correct format.” / “68 files”. `gate-2-lint-check.txt` oxlint, no diagnostics body. `gate-3-check.txt` `tsc --noEmit` both projects. `gate-4-build.txt` vite build + `index.d.cts`. `gate-5-test.txt` `Tests  98 passed (98)` / `90` / `111` / `46` / `20` / `17`. This lane did **not** re-run the commands.

**Breaking.** Report names (1) `assembleResult` → `buildResult`; (2) `parseBody` return type `… | undefined`. `ollama-obj-3` add member and fleet-F2 getter: report says not breaking.

Word-boundary `assembleResult` across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/ollama`, vendored `guides/ollama.md` mirrors:

- `/home/user/fleet/agent/src/core/helpers.ts:419` `export function assembleResult`
- `/home/user/fleet/agent/src/core/helpers.ts:415` example
- `/home/user/fleet/agent/src/core/Agent.ts:33` import; `:300` `assembleResult(outcome)`
- `/home/user/fleet/agent/tests/src/core/helpers.test.ts:4,:588,:590,:603,:619`
- `/home/user/fleet/agent/guides/agent.md:445` Surface row `assembleResult`; `:1120` tests list

`/home/user/scaffold/src`: **no hit**. No other `/home/user/fleet/*/src` hit. `parseBody` was not renamed (no old-name sweep).

**Writing sweep** on diff `+` lines in `guides/**`, `README.md`, `src/**` doc comments, `tests/**` titles/comments. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`:

- `guides/ollama.md:105` (diff `+` Contract 4) “the SPLITTER is the **guarantee**.”
- `src/server/OllamaProvider.ts:168` “the splitter is the **guarantee**” — this comment is **context** in the parseBody hunk, not a `+` line
- Test `+` **code** (outside the prose subset if titles/comments only): `performance.now()` (`\bnow\b`) `tests/service/OllamaProvider.test.ts:356,:364,:367,:368,:373`; `new Error` / `new Set` / `new Response` (`\bnew\b`) `tests/service/factories.test.ts` usage throw, `tests/setupService.test.ts:2107` region, `tests/src/server/parsers.test.ts:2276+`; `content: 'Call the lookup tool with query "datum" right **now**.'` in a `+` string `tests/service/lifecycle.test.ts` diff `:1622`

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: **no hit**.

# Distillate

- ollama-subj-1: site now citations gone (`errors.ts:4`, `constants.ts:1`, `guides/README.md:4`, `guides/ollama.md:260`; `:41` deleted) | diff present yes | old form hits 3 (`§` heading refs `tests/guides.test.ts:180,:189`, `tests/service/factories.test.ts:25`; `AGENTS §` 0) | report matches yes
- ollama-subj-2: site now `Think separation.` `:44`, describe `:22` | diff present yes | old form hits 0 (`H4`/`S2`/`§N`) | report matches yes
- ollama-subj-3: site now `:81`, `:107` | diff present yes | old form hits 0 | report matches yes
- ollama-subj-4: site now Surface `:59-:79` noun phrases | diff present yes | old form hits 0 | report matches yes
- ollama-subj-5: site now `:66` has `format?` | diff present yes | old form hits 0 | report matches yes
- ollama-subj-6: site now `through`/`for example`/`preceding`/`following` in `src`+`guides/ollama.md`; `vs.` kept | diff present yes (vs. not replaced) | old form hits: `src` 1 (`helpers.ts:178` `…`); `guides/ollama.md` 1 (`:105` `…`); `guides/README.md:36` `above`; `tests/**` many `via`/`above`/`below`/`we` (list in Evidence) | report matches yes on its cited paths; tests path not in report sweep
- ollama-subj-8: site now `:105` | diff present yes | old form hits 0 | report matches yes
- ollama-subj-9: site now `:5`, `:239`; `:115` unchanged | diff present yes (`:115` not in diff) | old form hits 0 | report matches yes
- ollama-subj-10: site now `types.ts:98-102` | diff present yes | old form hits 0 | report matches yes
- ollama-subj-12: site now `buildResult` `helpers.ts:65` | diff present yes | old form hits 0 (`assembleResult`); `assembl*` English >0 | report matches yes
- ollama-subj-13: site now `types.ts:8-9`, guide `:61` | diff present yes | old form hits 0 (gloss); `#fetch` remains as method | report matches yes
- ollama-subj-14: site now `README.md:17-20`, guide `:164` | diff present yes | old form hits 0 | report matches yes
- ollama-obj-1: site now `parsers.ts:24-27`, call site `:166` | diff present yes | old form hits 0 | report matches yes
- ollama-obj-2: site now integration `:806` factory; leftovers `OllamaProvider.test.ts:484,:509` | diff present yes at named site | old form hits 2 (unnamed transport arrows) | report matches yes (leftovers in Observations)
- ollama-obj-3: site now `errors.ts:35` | diff present yes | old form hits 0 | report matches yes
- ollama-obj-4: site now `helpers.ts:220`, `setupServer.ts:45` | diff present yes | old form hits 0 at those two sites | report matches yes
- ollama-obj-6: site now `tests/guides.test.ts:179` | diff present yes | old form `'ok'` remains `README.md:34` | report matches yes on guide/tests it named
- ollama-obj-7: site now `performance.now()` `:356+:373` | diff present yes | old form hits 0 | report matches yes; no proof file
- ollama-obj-8: site now `export const FILLER_SENTENCE` `setup.ts:124` | diff present yes | old form hits 0 | report matches yes
- fleet-F1: site now helper absent | diff present no (noop) | old form hits 0 | report matches yes
- fleet-F2: site now `#id` `:83` + `get id` `:133`; `name` still public field `:82` | diff present yes | old form hits 0 (`readonly id =`) | report matches yes

Scope tags: all 31 status paths **owned**; 0 shared; 0 off-limits.

Residue: diff `+` — `timeout`/`retry`/`skipIf`-as-prose as listed; no `.skip(` `.only(` `.todo(` `TODO` `FIXME` `console.` `debugger` on `+`. Tree — `retry`/`timeout` in service tests and provider; `console.info` as comment `integration.test.ts:154`; no skip/only/todo/TODO/FIXME/debugger in non-vendored `src`/`tests`.

Writing hits: `guarantee` `guides/ollama.md:105`; `\bnow\b`/`\bnew\b` on test `+` code/`right now` string as listed; count-over-growable-set on `+` prose: **no hit**.

Parity table: `OllamaProvider.generate` `:158` ↔ guide `:95`; `stream` `:182` ↔ `:96`; getters `id` `:133` / `format` `:154` not in Methods (Surface `:82`). `OllamaResponse` / `WireChatRequest` / `OllamaOptions` data members ↔ Surface `:61,:66,:62`. `OllamaHTTPError.code` `:35` ↔ Surface `:67`. `buildResult` exported via `src/server/index.ts:4`.

# Unknowns

- Gate commands and `npm test` not re-executed in this lane; readings are the captured proof files plus the report's quoted table.
- `service` project cases (`ollama-obj-7`, obj-2 service inlines, live half of obj-6) have no daemon run here; no `obj-7-*.txt`.
- `tests/service/conversation.test.ts` first hunk is deletion-heavy; first `+` line is mid-hunk after the removed `const attempt` binding.
- Inflection sweep of every English verb in subj-4 openers (`Create`/`Map`/`Extract` as ordinary words) was not expanded beyond the exact old Summary openers.
- Vendored guide mirrors (`guides/agent.md`, `guides/server.md`, …) still contain `AGENTS §` / `via` / `clause N`; they are outside the five-path field-3 set.
- Whether `tests/conformance.test.ts` “we send/read” titles count against subj-6 is a classification the report did not make; they are listed as field-3 hits.

# Journal

# Deviation

No tree change from this lane (read-only Grep/Read/Glob only). Every named input file was readable (`conform-ollama-brief.md`, `conform-ollama-audit-brief.md`, `conform-ollama-report.md`, `conform-ollama.diff`, `conform-ollama.status`, proof files under `/home/user/work/evidence/ollama-proofs/`, tree paths under `/home/user/fleet/ollama` excluding `node_modules` as specified). Sweeps ran. `obj-7` red/green capture files are absent from the proofs directory.