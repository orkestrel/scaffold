# Brief — P.1 `d7n-ollama-prep` (ollama's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/ollama` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e42feea`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

ollama's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== ollama 2026-09-07T16:43:54Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
85:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 927ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### ollama (e42feea, version 0.0.14, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 29 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupServer.ts(30)
   tests/setupService.ts(15)
   tests/setup.ts(4)
   tests/src/server/integration.test.ts(3)
   tests/conformance.test.ts(3)
   tests/src/server/OllamaProvider.test.ts(1)
   tests/service/tools.test.ts(1)
   tests/service/factories.test.ts(1)
   tests/service/compaction.test.ts(1)
   tests/service/budget.test.ts(1)
   tests/service/OllamaProvider.test.ts(1)
-- docs
   guides/ollama.md function createOllama: guide "A `ProviderInterface` over a local Ollama daemon — non-streaming `generate` plus streaming `stream`." source "Creates a local Ollama inference provider — a `ProviderInterface` over the daemon's `POST /api/chat`, supporting non-streaming `generate` and streaming `stream`."
   guides/ollama.md class OllamaProvider: guide "The local Ollama `ProviderInterface` over `POST /api/chat` — non-stream body + NDJSON stream, guard-narrowed." source "Implements the local Ollama inference boundary — a `ProviderInterface` over Ollama's `POST /api/chat`, both non-streaming (`generate`) and streaming NDJSON (`stream`)."
   guides/ollama.md interface OllamaResponse: guide "The `/api/chat` response shape the provider hands to a consuming call: `{ response: Response; timeout: TimeoutInterface; combined: AbortSignal }` — the open response plus the armed deadline and the `AbortSignal.any` it was issued under." source "Represents an open `POST /api/chat` response together with the deadline and the combined signal that bound the request."
   guides/ollama.md interface OllamaOptions: guide "`{ model; url?; keepAlive?: string | number; timeout?: number; options?: Readonly<Record<string, unknown>>; think?: boolean; fetch?: typeof fetch; headers?: () => Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>; format?: ContextFormat }` — `createOllama` configuration (incl. the wire `think` flag, the transport seam + the context-framing default)." source "Represents the configuration `createOllama` accepts for the local Ollama backend."
   guides/ollama.md const DEFAULT_OLLAMA_URL: guide "The local daemon base URL assumed when `OllamaOptions.url` is omitted (`'http://localhost:11434'`)." source "Names the local Ollama daemon base URL assumed when `OllamaOptions.url` is omitted."
   guides/ollama.md const DEFAULT_KEEP_ALIVE: guide "How long the model stays resident after a call by default (`'5m'`) — named for the Ollama `keep_alive` wire field it is sent as." source "Names how long the model stays resident after a call when `OllamaOptions.keepAlive` is omitted — Ollama's own `keep_alive` default, expressed as a duration string."
   guides/ollama.md const DEFAULT_PROVIDER_TIMEOUT: guide "The per-call deadline in milliseconds when `OllamaOptions.timeout` is omitted (`120_000`)." source "Names the per-call deadline in milliseconds when `OllamaOptions.timeout` is omitted — generous enough that a cold model load does not trip it."
   guides/ollama.md interface WireChatRequest: guide "The typed `/api/chat` request body the provider sends (`{ model; messages; stream; keep_alive; think; options?; tools?; format? }`) — asserted against the official Ollama client's `ChatRequest` by the compile-time parity test. `format` is the `/api/chat` structured-output constraint, forwarded verbatim from the per-call `ProviderStreamOptions.schema` and absent when no schema is supplied." source "Represents the exact `POST /api/chat` request body `OllamaProvider` sends — the internal typed wire contract."
   guides/ollama.md class OllamaHTTPError: guide "The error thrown at the `/api/chat` HTTP boundary — a non-OK status or a `null` response body — carrying the machine-readable `code` `'HTTP'`, the response `status` (`0` for the null-body case), and a message bounded to a 2048-character body excerpt. Narrow a caught value with `isOllamaHTTPError`." source "Represents an error thrown when the Ollama `/api/chat` HTTP transport fails."
   guides/ollama.md function isOllamaHTTPError: guide "Type guard narrowing an `unknown` caught value to `OllamaHTTPError` (an `instanceof` check)." source "Checks whether a value is an `OllamaHTTPError`."
   guides/ollama.md interface OllamaHTTPErrorOptions: guide "`{ cause?: unknown }` — the options a thrown `OllamaHTTPError` accepts beside its message and status, carrying the underlying transport or body-read rejection." source "Represents the options a thrown `OllamaHTTPError` accepts beside its message and status — the standard error `cause` link, named so a consumer can reference the shape."
   guides/ollama.md const MAX_ERROR_BODY_LENGTH: guide "The cap, in characters, on how much of a non-OK response body is incorporated into a thrown `OllamaHTTPError`'s message (`2048`)." source "Names the cap, in characters, on how much of a non-OK response body is incorporated into a thrown `OllamaHTTPError`'s message."
   guides/ollama.md function mapMessages: guide "The projection of conversation turns onto the wire's minimal `{ role, content }` message shape — `tool_calls` only on a turn that replays them, `images` only on a multimodal turn." source "Maps conversation turns onto the `/api/chat` wire's minimal message shape."
   guides/ollama.md function buildResult: guide "The assembly of a `ProviderResult` from a turn's content, reasoning, tool calls, and usage, setting only the populated optionals." source "Builds a provider result from a turn's content, reasoning, tool calls, and usage."
   guides/ollama.md function parseBody: guide "The coercion of a non-stream `/api/chat` response body into a wire record — an empty or malformed body yields `undefined` rather than throwing." source "Parses a non-stream `/api/chat` response body into a wire record."
   guides/ollama.md function extractContent: guide "One wire record's `message.content` when it is a string, else `''`." source "Extracts the assistant text of one wire record."
   guides/ollama.md function extractThinking: guide "One wire record's daemon-side `message.thinking` when it is a string, else `''`." source "Extracts the daemon-side reasoning of one wire record."
   guides/ollama.md function joinThinking: guide "The join of a call's two reasoning carriers — the splitter's separated in-content spans and the accumulated wire-side `message.thinking` — blank-line separated when both exist." source "Joins a call's two reasoning carriers into the result's `thinking`."
   guides/ollama.md function extractUsage: guide "One wire record's `TokenUsage`, present only when both `prompt_eval_count` and `eval_count` are numbers." source "Extracts the token usage of one wire record."
   guides/ollama.md function extractTools: guide "One wire record's `message.tool_calls` as `ToolCall` values, dropping a malformed entry and minting an id when the wire omits one." source "Extracts the tool calls of one wire record's `message.tool_calls`."
   guides/ollama.md function extractArguments: guide "A wire `function.arguments` value as a record — an object as-is, a JSON string parsed, otherwise `{}`." source "Extracts a wire `arguments` value as a record."
   guides/ollama.md OllamaProvider.generate: guide absent source absent
   guides/ollama.md OllamaProvider.stream: guide absent source absent
   guides/ollama.md pitch: readme absent tagline "The concrete local-LLM backend. `OllamaProvider` implements the abstract `ProviderInterface` over a local Ollama daemon's `POST /api/chat`, in both shapes: non-streaming `generate` (one JSON body in, one assembled `ProviderResult` out) and streaming `stream` (NDJSON in — one JSON object per `\\n`-terminated line — channel-tagged `ProviderDelta`s out). It exists so an Agent can run against a real model on `localhost` with zero cloud dependency, one tiny model, and no API key. The design is deliberately spare. It is one external boundary, kept honest: every `unknown` wire value is narrowed through the `@orkestrel/contract` guards (`isRecord` / `isString` / `isNumber`) — never `as` — and a missing or malformed field degrades to a sensible default (empty content, no usage, `{}` arguments), never a throw. Every call is bounded by the caller's `AbortSignal` (cancel / deadline / budget, folded through `AbortSignal.any`) AND the provider's own armed `Timeout`; a `stream` cancelled mid-flight throws a `ProviderAbortError` (from @orkestrel/agent) carrying the partial. It publishes no events: each call is a pure function of its arguments. The wire `think` flag is configurable through `OllamaOptions.think` (default `false`) and overrideable per call through `ProviderStreamOptions.think`, then backstopped with a per-call `ThinkSplitter` (the daemon may ignore the flag for a thinking model): with `think: true` the daemon returns reasoning on the separate `message.thinking` channel, streamed live as `thinking` deltas, and either way every content delta is split, only CLEAN content is yielded / assembled, and the separated reasoning — plus any daemon-side `message.thinking` deltas — surfaces as `ProviderResult.thinking`, never in the conversation. A per-call `ProviderStreamOptions.schema` (a JSON schema object, from `@orkestrel/agent`) forwards verbatim as the wire's structured-output `format` field, omitted from the request entirely when `schema` is undefined. Token usage reuses the `TokenUsage` shape rather than minting its own. The dependency is strictly one-way: this surface imports the abstract provider contract and its error from `@orkestrel/agent`, tool-call shapes from `@orkestrel/tool`, the `NDJSONParser`, the `Timeout`, and guards from `@orkestrel/contract` — those packages never import from here. It is tested LIVE against `qwen3.5:2b-q4_K_M` in a dedicated `service` test project that REQUIRES the daemon and WARMS the model first (no `skipIf`), while the `src:server` project stays hermetic — recording-proxy wire-shape assertions that pass with the daemon down. Source: `src/server`. Surfaced through the `@orkestrel/ollama` barrel (aliased `@src/server` inside this repo)."
   rows read: 1, disagreements found: 24
   exit 1
-- check
   tests/guides.test.ts(103,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(106,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(110,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(125,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(140,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  4 failed | 16 passed (20)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 61 | summary 49 | banned 12 | tests/setupServer.ts(30) tests/setupService.ts(15) tests/setup.ts(4) tests/src/server/integration.test.ts(3) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for ollama (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/ollama`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e42feea`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 61 | summary 49 | banned 12 | tests/setupServer.ts(30) tests/setupService.ts(15) tests/setup.ts(4) tests/src/server/integration.test.ts(3) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec                     | Source                        | Tests                                                                                                  |
    9:| ------- | ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------ |
    10:| Ollama  | [`ollama.md`](ollama.md) | [`src/server`](../src/server) | Hermetic: [`tests/src/server`](../tests/src/server); live service: [`tests/service`](../tests/service) |
    14:| Directory    | Guide                    |
    15:| ------------ | ------------------------ |
    16:| `src/server` | [`ollama.md`](ollama.md) |
- Guide `guides/ollama.md`: 261 lines. Headings:
    1:# Ollama
    9:## Surface
    55:### Surface
    85:## Methods
    89:#### `OllamaProvider`
    98:## Contract
    119:## Patterns
    121:### `createOllama` + `generate`
    140:### Bounding a call with a budget + timeout
    162:### Routing through your own server (obfuscated tokens)
    182:### Context framing
    204:### Narrowing HTTP errors with `isOllamaHTTPError`
    229:### Practices
    241:## Tests
    256:## See also
- Table headers in `guides/ollama.md` (a header row is the row before a `| ---` row):
    57: | API                        | Kind      | Summary                                                                                                                                                                                                                                                                                                                                                                                                 |
    93: | Method     | Returns                                         | Behavior                                                                                                                                                  |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/ollama.md`):
    3: > The concrete local-LLM backend. `OllamaProvider` implements the abstract `ProviderInterface` over a local Ollama daemon's `POST /api/chat`, in both shapes: non-streaming `generate` (one JSON body in, one assembled `ProviderResult` out) and streaming `stream` (NDJSON in — one JSON object per `\n`-terminated line — channel-tagged `ProviderDelta`s out). It exists so an Agent can run against a real model on `localhost` with zero cloud dependency, one tiny model, and no API key.
    4: >
    5: > The design is deliberately spare. It is **one external boundary, kept honest**: every `unknown` wire value is narrowed through the `@orkestrel/contract` guards (`isRecord` / `isString` / `isNumber`) — never `as` — and a missing or malformed field degrades to a sensible default (empty content, no usage, `{}` arguments), never a throw. Every call is bounded by the caller's `AbortSignal` (cancel / deadline / budget, folded through `AbortSignal.any`) AND the provider's own armed `Timeout`; a `stream` cancelled mid-flight throws a `ProviderAbortError` (from @orkestrel/agent) carrying the partial. It publishes no events: each call is a pure function of its arguments. The wire `think` flag is configurable through `OllamaOptions.think` (default `false`) and overrideable per call through `ProviderStreamOptions.think`, then backstopped with a per-call `ThinkSplitter` (the daemon may ignore the flag for a thinking model): with `think: true` the daemon returns reasoning on the separate `message.thinking` channel, streamed live as `thinking` deltas, and either way every content delta is split, only CLEAN content is yielded / assembled, and the separated reasoning — plus any daemon-side `message.thinking` deltas — surfaces as `ProviderResult.thinking`, never in the conversation. A per-call `ProviderStreamOptions.schema` (a JSON schema object, from `@orkestrel/agent`) forwards verbatim as the wire's structured-output `format` field, omitted from the request entirely when `schema` is undefined. Token usage reuses the `TokenUsage` shape rather than minting its own.
    6: >
    7: > The dependency is strictly one-way: this surface imports the abstract provider contract and its error from `@orkestrel/agent`, tool-call shapes from `@orkestrel/tool`, the `NDJSONParser`, the `Timeout`, and guards from `@orkestrel/contract` — those packages never import from here. It is tested LIVE against `qwen3.5:2b-q4_K_M` in a dedicated `service` test project that REQUIRES the daemon and WARMS the model first (no `skipIf`), while the `src:server` project stays hermetic — recording-proxy wire-shape assertions that pass with the daemon down. Source: [`src/server`](../src/server). Surfaced through the `@orkestrel/ollama` barrel (aliased `@src/server` inside this repo).
- Opening prose after the blockquote (first two lines):
    9: ## Surface
    11: The 80% case: create a provider once, then `generate` a turn against a conversation, bounding the call with an `AbortSignal` (from `@orkestrel/abort`). Messages are the abstract `Message` shape from `@orkestrel/agent` (`{ id, role, content }`), so the same conversation drives any provider.
- README (`README.md`) first lines:
    # @orkestrel/ollama
    
    A typed local-LLM provider for the `@orkestrel` line — a `ProviderInterface`
    implementation over a local Ollama daemon's `POST /api/chat`, with NDJSON
    streaming, tool calls, thinking, and usage accounting, built on pure
    web-standard `fetch` / `ReadableStream` (no Ollama SDK dependency).
    
    ## Install
    
    ```sh
    npm install @orkestrel/ollama
    ```
- `## Patterns` fences, each with its nearest preceding heading:
    13: fence under "## Surface"
    28: fence under "## Surface"
    125: fence under "### `createOllama` + `generate`"
    144: fence under "### Bounding a call with a budget + timeout"
    166: fence under "### Routing through your own server (obfuscated tokens)"
    186: fence under "### Context framing"
    208: fence under "### Narrowing HTTP errors with `isOllamaHTTPError`"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:72:export function createOllama(options: OllamaOptions): ProviderInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/OllamaProvider.ts:81:export class OllamaProvider implements ProviderInterface {
    src/server/errors.ts:30:export class OllamaHTTPError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/factories.ts:3
    src/server/helpers.ts:8
    src/server/OllamaProvider.ts:1
    src/server/parsers.ts:1
    src/server/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    22:} from '@orkestrel/guide'
    44:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    50:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    95:		for (const group of guide.methods()) {
    96:			const members = source.methods(group.interface)
    103:					expect(findMissing(members, group.methods)).toEqual([])
    106:					expect(findMissing(group.methods, members)).toEqual([])
    110:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    125:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    128:		for (const group of guide.methods()) {
    138:							? source.examples(group.interface)
    139:							: source.examples(group.interface).concat(source.examples(entity))
    140:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    152:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 241:## Tests — 1 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.14"` → `"version": "0.0.15"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-ollama-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
