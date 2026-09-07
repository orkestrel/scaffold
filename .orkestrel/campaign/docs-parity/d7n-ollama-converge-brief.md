# Brief — P.2 `d7n-ollama-converge` (ollama under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/ollama` from the committed baseline `e6deef9` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.15`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/ollama.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/ollama/guides/ollama.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-ollama-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/ollama.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/ollama.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/ollama.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
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
```

## Facts for ollama (taken 2026-09-07T20:58Z by facts.sh)

- Checkout `/home/user/fleet/ollama`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e6deef9`, status: clean
- `package.json`: version `0.0.15`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    96:			const members = source.methods(group.interface).map((method) => method.name)
    104:					expect(findMissing(members, documented)).toEqual([])
    107:					expect(findMissing(documented, members)).toEqual([])
    113:							: findMissing(
    114:									source.methods(entity).map((method) => method.name),
    132:				findUnexampled(
    135:					source.examples().map((example) => example.name),
    140:		for (const group of guide.methods()) {
    145:					? source.examples(group.interface).map((example) => example.name)
    149:							.concat(source.examples(entity).map((example) => example.name))
    156:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    168:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 241:## Tests — 1 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-ollama-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/ollama.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/ollama.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-ollama-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
