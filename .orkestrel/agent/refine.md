# The judge and the selection seam: two refinements inside the agent

Recommendation record for `@orkestrel/agent`, written 2026-10-07 after the user accepted [the context ruling](context.md) and asked for a refined recommendation that works two refinements into the agent and its related packages: the living context, as a feature of the agent's own context rather than a package or a consumer of the agent, and the System One decision model the desk experiments with. The user's constraint on the first: neither a toggle nor machinery the default path never reaches. The record is written against the agent checkout at commit `65c706a`, the desk checkout at its default branch head, and the scaffold checkout on the recommendation branch, and it was amended on 2026-10-07 by the falsification round under § Falsification.

Two kinds of sentence appear, as in the other records in this folder: a measured fact names the file, line, command, or run it came from; a design conclusion is a ruling for this codebase. Paths under `src/`, `tests/`, and `guides/` of the agent resolve against the agent checkout; paths under `app/` and `tests/app/` resolve against the desk checkout; every other path resolves against the scaffold checkout. Line numbers are those of the checkouts named in the first paragraph; the `carve` unit of the context ruling moves the agent files, so a later reader resolves a symbol by name.

## Ruling

Add one decision contract to the agent, called the judge, and one selection seam to the agent's context, and build both with the consumers that exist on 2026-10-07: the desk for the judge, the agent loop and the desk for the seam. Nothing becomes a package in this round. Nothing is a boolean on `AgentOptions`.

- **The judge.** `JudgeInterface.ask(request, signal)` answers the TypeSafe System One questions (choice, score, noul) about one state, keyed by the caller's ids, with a probability distribution per answer, and lists the questions a logprob readout could not read a label for. The value types, the engine `AgentJudge`, and the primary wire `SystemOneJudge` (one class for Jev, Ollama's decision models, llama.cpp's decision models, Mica's server, Kev, Von, Laya, and Ollaya, all of which serve `POST /v1/systemone`) live in the agent beside `AgentProvider` and `RelayProvider`. `OllamaJudge` lives in `@orkestrel/ollama` and renders Mica's prompt byte for byte over a raw generate call for a fine-tune no server exposes as a decision model. The published measures are derived from the distributions by one helper, never stored, so every server reads on one scale.
- **Judgments on the record.** A `Conversation` records each outcome as a `Judgment` with its provenance (the question, the outcome, the judge identity, the source message ids, the state the model read, the time, the usage) under its `judgments` manager, keyed by the caller's question id, persisted in the snapshot. A later turn reuses a judgment whose question, sources, state, and judge identity match, and asks the model only for the rest, through one manager method both the loop and the desk call.
- **The selection seam.** `AgentContextInterface.select(request, signal)` asks an application-supplied `SelectionHandler` which conversation messages the next prompt folds for the request the loop is serving, and `build(selection?)` stays synchronous and folds that selection where it folds `active.view()` on 2026-10-07. The loop awaits `select` at run entry and after a compaction only when a handler is configured. With no handler the loop never calls it and `build()` is the assembly the loop runs on 2026-10-07, with no added `await` before the first provider request.
- **The stock selection.** `createSelection(options)` is the handler the framework ships: it asks the judge one binary question per screened message, whether that message is needed for the request, records each outcome once, derives applicability with the application's criteria text and threshold, and includes a message unless that question answered no. The question sentence is the framework's; the criteria text, the threshold, the screen, and the work limit are the application's, and the framework exports the criteria wording it measured as a constant an application can pass. Two further relation questions, whether a later message withdraws an earlier one and whether a later message accepts an earlier proposal, were measured and read well; they are the next unit, built when an application that revises decisions mid-conversation consumes them.

What the desk does afterward: it deletes its readout math, its judge `fetch`, and its decision types; it keeps each ticket as a conversation in a memory store; it reuses recorded judgments on a repeated turn and asks Mica only for the questions whose sources changed; its reply agent runs over the ticket conversation with the stock selection, so a follow-up message on the same ticket folds only the earlier messages the `needed` question kept, and the page shows that receipt; it keeps every fixture, threshold, policy phase, and task sentence. The desk is therefore the first consumer of the judge in the System One round (its bare judge `fetch` and readout math become `createOllamaJudge` and `computeReading`, and Ollama's decision models reach it through `createSystemOneJudge`), and of the judgments, the seam, and the stock selection in the later rounds.

## How the question was worked

The desk was read first-hand (`app/core/types.ts`, `constants.ts`, `helpers.ts`, `policies.ts`, `templates.ts`, `app/server/Desk.ts`, `parsers.ts`, `handlers.ts`) and mapped by one Grok 4.7 lane on the Cursor bench (journal `tmp/cursor/desk.jsonl`, 162 tool calls, 13.5 min; 448 citations, every one resolving against the desk or the scaffold checkout). Mica v0.1 4B was probed through Ollama on this host with the desk's judge body and readout (`tmp/probes/mica.ts`, 15 questions; `tmp/probes/pairs.ts`, 24 questions; `tmp/probes/pairs2.ts`, 20 questions). Two blind design lanes ran on one brief (`tmp/units/refine-brief.md`): the subjective lane on Opus 5.5 (`planner`, 51 tool calls, 14.7 min) and the objective lane on GPT-6 Astra through `codex exec` (`analyst`, 60 commands, 15.2 min). Their citations were checked with `cite.ts` under the three checkout roots: 79 and 99 citations, none unresolved. The reconciliation under § Where the lanes disagreed names which lane was right on what. One falsification round then ran over 13 numbered claims (`tmp/units/refine-claims.md`), with the objective lane on GPT-6 Astra (`analyst`, 10.2 min, 91 citations, none unresolved) and the subjective lane on Opus 5.5 (`reviewer`, 13.2 min, told that its engine wrote the subjective half); § Falsification records every ruling, and this text is the amended record.

## Measurements

The Mica probe (`tmp/probes/mica.jsonl`, run 2026-10-07 on a CPU-only host, 4 threads, the model loaded in 106 s) asked, over a 10-message fictional transcript, the questions a selection step would ask. Every candidate label was in the top 20 on every question.

| Question class | Form | Rows | As expected | Confidence range | Reading |
| --- | --- | --- | --- | --- | --- |
| needed, superseded, accepted, in force, source of a constraint, format in force | `noul`, `choice` | 10 | 10 | 0.606 to 0.996 | the binary and choice forms carry the selection questions |
| how much a message matters, three levels | `score` | 4 | 2 | 0.318 to 0.943 | the graded form leans to the middle level and is not the selection form |
| delete-database calibration | `noul` | 1 | 1 | 0.971 | No 0.986 against the desk's pinned 0.9884 |

Two readings follow from the rows. The withdrawn header-row rule was graded as background when asked how much it matters, and was called superseded at 0.992 when asked directly whether the later message withdraws it: the model answers the question asked and applies no relation it was not asked about, so applicability must come from explicit per-relation questions, recorded once. Each question cost about 4 s and 360 to 387 prompt tokens over the 10 messages after the first question shared the state prefix, so a step that asks one question per message per turn is linear in messages per turn and must be bounded by when it asks, which messages it asks about, and reuse of recorded answers.

The pair probes (`tmp/probes/pairs.jsonl`, 24 rows; `tmp/probes/pairs2.jsonl`, 20 rows; both 2026-10-07, same host and readout) asked the framework's own templates, worded without reference to the content, over two state shapes: W, the whole transcript with each message indexed, and P, the two messages of the pair alone, rendered as `[1]` and `[2]`. The counts in the table count every row with a stated expectation, including the pair of message [3] (the SQLite acceptance beside the header-row rule) against the request in message [10], which the probe expected as needed and which is arguable; message [8] (the format change) against [10] carried no expectation.

| Template | State | Rows | As expected | Reading |
| --- | --- | --- | --- | --- |
| superseded, "withdraws or replaces something that [A] states" | W | 4 | 3 | the true case at 0.994; the miss is the [2]/[8] pair, which is arguable, at 0.528 |
| superseded, same | P | 4 | 3 | the true case at 0.987; the same arguable pair at 0.677 |
| accepted, "accepts the proposal in [A]" | W | 3 | 2 | the true case at 0.889; [2]/[5] misread at 0.705; [4]/[5] at chance |
| accepted, same | P | 3 | 3 | the true case at 0.855; the false cases at 0.668 and 0.874 |
| needed, "cannot be carried out correctly without" | W | 4 | 2 | the standing no-internet rule read as not needed at 0.896: the necessity criterion is read literally |
| needed, same | P | 4 | 2 | the same two misses, the rule at 0.915 |
| needed, "states something the work in [B] must respect" | W | 4 | 3 | the no-internet rule at 0.803, the printer at 0.984, the archived-accounts rule at 0.854; [3] read as not needed at 0.961 |
| needed, same | P | 4 | 3 | the no-internet rule at 0.965; [3] as needed at 0.725; the archived-accounts rule misread as a rule for the search box at 0.804, because the pair hides what the rule answered |
| needed, "states a rule, a decision, or a fact that [B] must respect" | W | 4 | 3 | as the preceding W row, with the true case at probability 0.650 (confidence 0.301) |
| needed, same | P | 4 | 2 | the no-internet rule at 0.973; [3] and [5] misread |

Four readings decide the stock selection's shape:

- The `needed` criteria the framework exports are the "must respect" wordings. The necessity wording fails on a standing constraint, which is the message a selection must keep.
- A relation question (`superseded`, `accepted`) renders the pair alone. It read the same or better than the whole transcript, at about half the prompt tokens (166 to 212 against 358 to 380) and about 2.3 s against 4 s per question on this host.
- A `needed` question renders the conversation view with the subject and the request marked. On this transcript the whole view and the pair alone tie at 3 of 4 under the shipped wording, and the two misses differ in kind: the view's miss is the arguable [3], the pair's miss is a standing rule misattributed to the request because the pair hid the question it answered. The ruling takes the view on that ground, and names the probe that would overturn it: the same harness over a second transcript, with a clarifying message appended after a `needed` outcome.
- A low-confidence outcome is left to the application's threshold, which leaves the condition absent and the message kept: the arguable [2]/[8] pair sat at 0.528 and 0.677.

These are the thinnest readings in the record, 44 rows over one fictional transcript.

The desk's state across turns, read from the source and the Grok map: the server holds the daemon origin only (`app/server/Desk.ts:47`); a second `POST /turn` recomputes every decision, the policy, the brief, and the reply; the page keeps the board and the calibration in refs (`app/vue/App.vue:78-84`); the judge path is a bare `fetch` (`app/server/Desk.ts:322`) because the ollama wire contract has no logprob field and every provider call streams (`guides/ollama.md:76`, `guides/ollama.md:114`). 40 desk declarations are the decision client in all but name (`tmp/units/refine-evidence.md` § Grok desk distillate, from `tmp/cursor/desk-answer.md` § Ownership).

## The judge

Revised on 2026-10-07 by the protocol-conformance round under § Protocol conformance round. The contract takes the TypeSafe System One request and response shapes and changes them only where a fleet law requires it: questions are keyed by the caller's id, `form` stands in for the protocol's `type`, and an answer stores only its distribution. Every implementation of the protocol found on 2026-10-07 (TypeSafe's Jev, Ollama 0.35 and later for its decision models, llama.cpp's server, Mica's own server, Kev, Von, Laya, Ollaya) shares the request and `probabilities`; they differ in how they compute `confidence` and `score` and in whether a score's `legend` and `probabilities` are maps or arrays (`tmp/units/judge-protocol.md`, the divergence table). A client that reads the distribution and derives the measures itself gets one scale from every server.

```ts
// @orkestrel/agent, src/core/types.ts (root before carve, the providers module after it)
import type { TokenUsage } from '@orkestrel/budget'
import type { JSONRecord, JSONValue } from '@orkestrel/contract'

/** Carries text or structured JSON the model reads; mirrors the TypeSafe EntryType without its null arm. */
export type JudgeEntry = string | JSONRecord | readonly JSONValue[]

/** Maps each option name the model sees to its description; null keeps an undescribed option in the map. */
export type ChoiceCriteria = Readonly<Record<string, JudgeEntry | null>>

/** Lists at least two score levels from level 0 upward; null leaves a level undescribed. */
export type ScoreCriteria = readonly [JudgeEntry | null, JudgeEntry | null, ...(JudgeEntry | null)[]]

/** Carries what makes a noul answer true and what makes it false; an omitted side is undescribed. */
export interface NoulCriteria {
	readonly true?: JudgeEntry
	readonly false?: JudgeEntry
}

export interface ChoiceQuestion {
	readonly form: 'choice'
	readonly instructions?: JudgeEntry
	readonly criteria: ChoiceCriteria
}

export interface ScoreQuestion {
	readonly form: 'score'
	readonly instructions?: JudgeEntry
	readonly criteria: ScoreCriteria
}

export interface NoulQuestion {
	readonly form: 'noul'
	readonly instructions?: JudgeEntry
	readonly criteria?: NoulCriteria
}

/** Names one question by its form, the protocol's type field under the fleet's named discriminant. */
export type JudgeQuestion = ChoiceQuestion | ScoreQuestion | NoulQuestion

/** Carries one state and the questions asked about it, keyed by caller ids the model never sees; each question is evaluated on its own. */
export interface JudgeRequest {
	readonly state: JudgeEntry
	readonly questions: Readonly<Record<string, JudgeQuestion>>
}

/** Carries a choice distribution keyed by option name, in criteria order. */
export interface ChoiceAnswer {
	readonly form: 'choice'
	readonly probabilities: Readonly<Record<string, number>>
}

/** Carries a score distribution indexed by level. */
export interface ScoreAnswer {
	readonly form: 'score'
	readonly probabilities: readonly number[]
}

/** Carries the probability that the answer is yes; the protocol's noul field. */
export interface NoulAnswer {
	readonly form: 'noul'
	readonly noul: number
}

export type JudgeAnswer = ChoiceAnswer | ScoreAnswer | NoulAnswer

/** Reports a question a wire could not read a candidate for; it lists the caller's keys and invents no probability. */
export interface Refusal {
	readonly missing: readonly string[]
}

/** Carries the answering model, the answers keyed by question id, the refusals, and the usage the request's calls spent. */
export interface JudgeResult {
	readonly model: string
	readonly answers: Readonly<Record<string, JudgeAnswer>>
	/** Holds each refused question by id; absent when none was refused. An id appears in answers or refusals, never both. */
	readonly refusals?: Readonly<Record<string, Refusal>>
	readonly usage?: TokenUsage
}

/** Answers typed questions about one state with probabilities; the sibling of ProviderInterface, never a provider. */
export interface JudgeInterface {
	readonly id: string
	readonly name: string
	/** Holds the configured model identity; the wire composes it from everything that changes an answer under one state. */
	readonly model: string
	ask(request: JudgeRequest, signal: AbortSignal): Promise<JudgeResult>
}

/** Carries the measures computeReading derives from an answer; nothing stores them. */
export interface Reading {
	/** Holds the first strictly greatest candidate in enumeration order: an option name, a level index, or true or false. */
	readonly winner: string
	readonly probability: number
	readonly confidence: number
	/** Holds the expected level of a score answer; the protocol's score field. */
	readonly score?: number
}

/** Configures the judge engine's destination, identity, and call split. */
export interface AgentJudgeInput extends Pick<ProviderOptions, 'timeout' | 'fetch' | 'headers'> {
	readonly url: string
	readonly path?: string
	readonly model: string
	/** If true, one call carries every question; if false, the engine issues one call per question. Default true. */
	readonly batch?: boolean
}

/** Defines the wire seams of the shared judge engine. */
export interface AgentJudgeInterface extends JudgeInterface {
	body(request: JudgeRequest): object
	read(value: unknown, request: JudgeRequest): JudgeResult
}

export type JudgeErrorCode = 'HTTP' | 'PROTOCOL' | 'QUESTION'

export interface SystemOneJudgeOptions extends Pick<ProviderOptions, 'timeout' | 'fetch' | 'headers'> {
	/** Holds the server origin without a path, such as https://api.typesafe.ai or http://localhost:11434. */
	readonly url: string
	readonly model: string
}

// Wire types, each transliterating https://docs.typesafe.ai/api.md field for field; they keep type, input_tokens, output_tokens, and legend.
export type SystemOneEntry = JudgeEntry | null
export interface SystemOneQuestion { readonly type: 'choice' | 'score' | 'noul'; readonly instructions?: SystemOneEntry; readonly criteria?: ChoiceCriteria | ScoreCriteria | NoulCriteria | null }
export interface SystemOneRequest { readonly state: SystemOneEntry; readonly model: string; readonly questions: Readonly<Record<string, SystemOneQuestion>> }
export interface SystemOneUsage { readonly input_tokens?: number | null; readonly output_tokens?: number | null }
export interface SystemOneChoiceAnswer { readonly type: 'choice'; readonly probabilities: Readonly<Record<string, number>>; readonly choice?: string; readonly confidence?: number }
/** Accepts probabilities and legend as maps keyed by level (Jev, Ollama, Mica) or as arrays (llama.cpp). */
export interface SystemOneScoreAnswer { readonly type: 'score'; readonly probabilities: Readonly<Record<string, number>> | readonly number[]; readonly score?: number; readonly legend?: Readonly<Record<string, SystemOneEntry>> | readonly SystemOneEntry[]; readonly confidence?: number }
export interface SystemOneNoulAnswer { readonly type: 'noul'; readonly noul: number; readonly confidence?: number }
export type SystemOneAnswer = SystemOneChoiceAnswer | SystemOneScoreAnswer | SystemOneNoulAnswer
export interface SystemOneResponse { readonly model?: string; readonly answers: Readonly<Record<string, unknown>>; readonly usage?: SystemOneUsage }

// errors.ts      JudgeError (code: JudgeErrorCode, status?), isJudgeError, JudgeAbortError (partial: JudgeResult), isJudgeAbortError
// validators.ts  isJudgeEntry, isJudgeQuestion, isSystemOneResponse, isSystemOneAnswer
// helpers.ts     computeReading(answer: JudgeAnswer): Reading; buildJudgeResult(model: string, results: readonly JudgeResult[]): JudgeResult
//                readHeaders(hook: ProviderOptions['headers'], signal: AbortSignal): Promise<Headers>
//                questionToSystemOne(question: JudgeQuestion): SystemOneQuestion
//                extractSystemOneAnswer(answer: SystemOneAnswer, question: JudgeQuestion): JudgeAnswer | undefined
//                extractSystemOneUsage(usage: SystemOneUsage | undefined): TokenUsage | undefined
// constants.ts   SYSTEM_ONE_PATH = '/v1/systemone'
// factories.ts   createSystemOneJudge(options: SystemOneJudgeOptions): JudgeInterface
```

```ts
// @orkestrel/ollama, src/core/types.ts
export interface OllamaJudgeOptions extends Pick<ProviderOptions, 'timeout' | 'fetch' | 'headers'> {
	/** Holds the Ollama tag of a fine-tune no server exposes as a decision model. */
	readonly model: string
	/** Holds the system prompt the model was trained with. */
	readonly system: string
	/** Mirrors the model's calibration file; the temperature divides each candidate logprob. Default temperature 1. */
	readonly calibration?: { readonly temperature: number }
	readonly url?: string
	readonly keepAlive?: string
	readonly options?: Readonly<Record<string, unknown>>
}
export interface Logprob { readonly token: string; readonly logprob: number }
/** Transliterates the raw, non-streaming generate body; a second request shape on the same daemon. */
export interface WireGenerateRequest {
	readonly model: string
	readonly prompt: string
	readonly raw: true
	readonly stream: false
	readonly logprobs: true
	readonly top_logprobs: number
	readonly keep_alive: string
	readonly options: Readonly<Record<string, unknown>>
}
// constants.ts  OLLAMA_GENERATE_PATH, TOP_LOGPROBS (20), OPTION_LABELS (A to Z, then a to z), NOUL_LABELS (No, Yes), SPECIAL_TOKENS, RENDER_REVISION, MAX_SCORE_LEVELS (10)
// helpers.ts    escapeSpecial, renderJudgePrompt, renderJudgeIdentity, buildJudgeLabels, extractTop, computeAnswer
// factories.ts  createOllamaJudge(options: OllamaJudgeOptions): JudgeInterface
```

Rulings on the contract:

- **What is stored and what is derived.** An answer stores only its distribution: `probabilities` for a choice or a score, `noul` for a yes/no question. `computeReading(answer)` derives the winner (the first strictly greatest candidate in enumeration order; a noul is read over false then true, so a 0.5 noul names false), its probability, the published choice confidence `(max(p) - 1/n) / (1 - 1/n)`, the published score confidence `max(0, 1 - spread / even_spread)` with `m` the most likely level, the noul confidence `|2p - 1|` (the choice formula at n = 2), and the expected level `sum(i * p_i)` as `score` (https://docs.typesafe.ai/confidence.md). A server's `confidence` is ignored because servers define it four ways (Jev the published formulas, Mica's server `max(p)`, Ollama entropy, llama.cpp unread); a server's `score` is ignored because Mica's returns an integer argmax; `choice` repeats the most likely option; `legend` repeats the question's criteria; `answer` and `latency_ms` are extra fields the foreign-contract rule accepts and drops.
- **How the protocol's null maps onto the absence law.** An undescribed choice option stays `null`, because `{"bug": null}` and `{}` are different questions and JSON cannot carry an `undefined` member. An undescribed score level stays `null`, because a level is positional. Null noul criteria, a null side of them, and null instructions are omitted in the domain; omission and null mean the same on the wire. `state` is required and never null: TypeSafe lists it as required and Ollama rejects an empty state. A missing or null usage count leaves `usage` absent. A response without `model` reports the judge's configured `model`.
- **One judge, one model.** `model` is configured on the judge, as on a provider; the System One wire fills the protocol's request `model` from it. `JudgeResult.model` reports what the server named, so a judge configured with the alias `jev-latest` reports `jev-1.13.0`, and LLM Gateway's provider prefix reaches the caller as sent. On the logprob wire `model` is the identity the wire composes from the tag, the calibration temperature, the system prompt, and the render revision; changing any of the four changes it.
- **A refusal sits beside the answers.** `answers` keeps the protocol's shape and the word answer keeps one meaning; `refusals` lists, by id, the questions a logprob readout could not read a label for. A System One server never refuses: its answers are constrained to the supplied options, so a missing label there is a `PROTOCOL` failure.
- **The universal shape is validated before inference; every other limit is the server's.** A non-empty question map; at least 2 choice options and 2 score levels (the confidence denominator); every entry a `JudgeEntry` or a permitted null. Jev's 255 options and 10 levels, Ollama's 64 questions, 26 levels, and 64 KiB body, and Mica's 8,192 tokens are refused by the server with the status the wire reports.

Rulings on the engine and the wires:

- **The engine, `AgentJudge`.** It sits beside `AgentProvider` and keeps its `name`, `body`, and `read` seams; it drops `frame` and `finish`, because a one-shot JSON response has no framing state and no buffered tail (`src/core/AgentProvider.ts:112-118`), and it takes one `batch` switch in place of `split` and `strict`, because whether one call carries every question is the one binary behavior a judge wire varies on. `ask` throws `JudgeAbortError` with an empty partial when the signal is already aborted, validates the universal shape (`JudgeError` with code `QUESTION`, naming the id), splits the request into calls (`batch` true: one; false: one per question in key order), builds every body before the first `fetch` so a wire limit lands before any inference, runs the calls one after another, each under its own `Timeout` folded with the caller's signal (`src/core/AgentProvider.ts:158-161`), awaits `readHeaders` and POSTs JSON to `url + path`, maps a non-OK status to `HTTP` with the status and a bounded excerpt (`MAX_ERROR_BODY_LENGTH`), a null or unparsable body to `PROTOCOL`, hands the parsed value to `read`, merges with `buildJudgeResult` (answers and refusals joined, usage summed with `sumUsage`, `model` from the first call), and on a cancel throws `JudgeAbortError` whose `partial` is the merge of the completed calls, so spent usage is never lost. `readHeaders` is `AgentProvider.#requestHeaders` (`src/core/AgentProvider.ts:295-316`) taken out as a helper both engines call, so the race between the header hook and the abort has one home. A transport error is rethrown unchanged, as the provider rethrows it.
- **The System One wire, `SystemOneJudge`.** It passes `{ url, path: SYSTEM_ONE_PATH, model, batch: true }` to the engine and lives in the agent's providers folder beside `RelayProvider`, because the wire is a protocol many servers share and the session cannot create a package (the `SystemOne` prefix makes a later extraction a move). `body` sends the TypeSafe body unchanged apart from `form` becoming `type` and omitted members staying omitted. `read` checks the envelope, then for each requested id accepts a map or an array for score probabilities and a map or an array for legend, ignores unknown members, and refuses with `PROTOCOL` naming the id when the answer is missing, its type differs from the question's form, a criteria label has no finite probability in [0, 1], or `noul` is not a finite number in [0, 1]. Authentication goes through the `headers` hook (`headers: () => ({ authorization: 'Bearer ' + key })`); `url` has no default, so no state leaves the host unless the caller names a server. The statuses it reports as `HTTP`: TypeSafe 401, 422, 429, 529; Ollama 400, 404, 413, 500; Mica's server 400. Retrying is the caller's.
- **The Ollama logprob wire, `OllamaJudge`.** It is for a fine-tune no server exposes as a decision model: on 2026-10-07 Ollama 0.40.0 refused Mica on the systemone path with HTTP 400 "does not support decision", while `tev1:0.8b` answered there (`tmp/units/judge-protocol.md` § Probes on this host). It passes `{ url, path: OLLAMA_GENERATE_PATH, model: renderJudgeIdentity(options), batch: false }` and sends `raw: true`, `stream: false`, `logprobs: true`, `top_logprobs: 20`, `keep_alive`, and `options` with `num_predict: 1` and `temperature: 1`. The prompt is Mica's render byte for byte: `<|im_start|>system\n{system}<|im_end|>\n<|im_start|>user\n<state>\n{state}\n</state>\nQuestion: {instructions}\n{ending}<|im_end|>\n<|im_start|>assistant\n<think>\n\n</think>\n\n`, with the noul ending `Criteria:\nfalse: {text}\ntrue: {text}\nAnswer Yes if true, or No if false.` (an absent side renders its key word), the choice ending one `{label}) [{name}] {text}` line per option (the bracketed name left out when it is empty, equals the label, or matches `^[cs]?\d+$`; a null description renders `None` as the server's `str(None)` does) and `Answer with the label of the best candidate.`, the score ending one `{label}) {text}` line per level and `best level`, and `escapeSpecial` inserting U+200B after the `<` of each chat sentinel, vision pad, and thinking or tool tag (`tmp/probes/mica-src/native.py`). A structured state renders as the server renders it, `JSON.stringify(state, null, 1)`; structured instructions or criteria are refused with `QUESTION` before inference, because the server flattens them with Python `str()`, which no render reproduces. The raw path was proven on 2026-10-07: the hand-rendered prompt returned the same prompt token count and the same top logprobs to four decimals as the templated chat path (`tmp/units/judge-protocol.md` § Raw generate against the templated chat path). The readout reads `logprobs[0].top_logprobs`, pairs each wire label (`No`/`Yes`, or `A` to `Z` then `a` to `z`, of which the cap of 20 makes `A` to `T` reachable) with the caller's key, refuses the question when a label is absent, divides each candidate's logprob by the calibration temperature, runs a softmax over the candidates alone (the full-vocabulary normalizer cancels), and reads usage through the package's `extractUsage` on the `done: true` record. It refuses before inference a choice with more than 20 options and a score with more than 10 levels (Mica's own limit). A decision model Ollama serves natively uses `createSystemOneJudge({ url: 'http://localhost:11434', model: 'tev1:0.8b' })` with no ollama code; choosing the wire is the application's decision and the package makes no capability check.
- **Placement.** Before `carve`: the judge block in the root `src/core/types.ts` after the provider block; the errors, guards, helpers, constant, and factory in their root kind files; `src/core/AgentJudge.ts` flat beside `AgentProvider.ts`; `src/core/providers/SystemOneJudge.ts` beside `RelayProvider.ts`; the ollama declarations in that package's root kind files and `src/core/OllamaJudge.ts`. After `carve`: every judge declaration moves into the providers module, the only module that uses them in this round; the value types and `JudgeInterface` move up to the root when the judgments unit makes the conversations module a second user (`.claude/rules/architecture.md:222`). The providers row of the carve layout table gains the engine, the wire, the errors, and a `budget` type edge.
- **No raw exchange on the result.** A `JudgeResult` carries values, not wire evidence, as a `ProviderResult` does; the desk's top-list and generated-token panel is a diagnostic the probe harness keeps, and a wire-level trace seam waits for a consumer that must show one.

## The judgments

The conversations module records outcomes beside the messages. Measures are not stored.

```ts
// @orkestrel/agent, src/core/conversations/types.ts
export interface Judgment {
	readonly question: JudgeQuestion
	readonly outcome: JudgeOutcome
	/** Holds the judge identity that answered, as the result reported it. */
	readonly model: string
	/** Lists the ids of the messages the question is about, in order. */
	readonly sources: readonly string[]
	/** Holds the state text the model read, so a changed view re-asks. */
	readonly state: string
	/** Holds the epoch milliseconds the manager stamped on `add`. */
	readonly time: number
	/** Holds the request's usage when the request carried this question alone. */
	readonly usage?: TokenUsage
}
export interface JudgmentInput {
	readonly question: JudgeQuestion
	readonly outcome: JudgeOutcome
	readonly model: string
	readonly sources: readonly string[]
	readonly state: string
	readonly usage?: TokenUsage
}
/** Stores judgments keyed by `question.id`; adding an existing key replaces it. */
export interface JudgmentManagerInterface {
	readonly count: number
	add(input: JudgmentInput): Judgment
	add(inputs: readonly JudgmentInput[]): readonly Judgment[]
	judgment(id: string): Judgment | undefined
	judgments(): readonly Judgment[]
	remove(id: string): boolean
	remove(ids: readonly string[]): boolean
	clear(): void
	/** Reuses every recorded judgment that matches the request, asks the judge for the rest, records the fresh outcomes, and returns them all. */
	resolve(judge: JudgeInterface, request: JudgeRequest, sources: readonly string[], signal: AbortSignal): Promise<readonly Judgment[]>
}
// ConversationInterface gains   readonly judgments: JudgmentManagerInterface
// ConversationSnapshot gains    readonly judgments?: readonly Judgment[]   (absent in an older snapshot)
// helpers.ts   buildJudgments(request: JudgeRequest, result: JudgeResult, sources: readonly string[]): readonly JudgmentInput[]
//              matchesJudgment(judgment: Judgment, question: JudgeQuestion, sources: readonly string[], state: string, model: string): boolean
// validators.ts  isJudgment; isConversationSnapshot accepts an absent `judgments`
```

Rulings on the judgments:

- **Keyed by the caller's id, last write wins**, as `ConversationManagerInterface.add` already overwrites (`src/core/types.ts:2103-2106`); a question id is a caller key on System One too (`.orkestrel/agent/system-one.md:31`).
- **Reuse is an identity match**, not a timestamp: the same form, text, criteria or candidates, the same source ids in the same order, the same rendered state, and the same judge identity. A changed threshold re-evaluates a recorded distribution with no model call; a changed criterion text, a removed or compacted-away source, a changed state, or a changed identity re-asks. A relation question renders its pair alone, so its judgment survives every later append; a `needed` question renders the view, so a changed view re-asks it, and its request changes on every user turn in any case.
- **The effectful step is a manager method.** `judgments.resolve(judge, request, sources, signal)` looks up, asks, and records; `matchesJudgment` and `buildJudgments` stay pure helpers (`.claude/rules/architecture.md:181-183`). The stock selection and the desk call the same method.
- **Usage sits on the judgment only when its request carried that question alone.** A batch request's usage stays on the `JudgeResult` the caller charged.
- **The snapshot carries the judgments**; both stores round-trip them; an older snapshot without the field still validates. Message-level records over `@orkestrel/database` stay gated on a consumer that queries across conversations, as the context ruling stages them (`.orkestrel/agent/context.md:135`).
- **No revision record in this round.** An application that holds a replacement for a message removes the old message and adds the replacement; the removed source fails the identity match and its dependents are re-asked. A typed revision record waits for a consumer that must keep the replaced text.

## The selection seam

```ts
// @orkestrel/agent, src/core/contexts/types.ts
/** Carries the conversation part of the next prompt and the receipt for it. */
export interface Selection {
	/** Lists the messages `build` folds in place of `view()`, in prompt order. */
	readonly messages: readonly Message[]
	/** Lists the keys of the judgments the selection rests on, reused or recorded. */
	readonly judgments: readonly string[]
	/** Holds the judge usage this selection spent, on success and on failure alike. */
	readonly usage?: TokenUsage
	/** Holds the error a handler gave up on; `messages` is then `view()`. */
	readonly fault?: Error
}
export type SelectionHandler = (conversation: ConversationInterface, request: Message, signal: AbortSignal) => Promise<Selection>

// AgentContextOptions gains    readonly select?: SelectionHandler
// AgentContextInterface gains  select(request: Message, signal: AbortSignal): Promise<Selection>
//                              build(selection?: Selection): readonly Message[]
// AgentOptions gains           readonly select?: SelectionHandler   (forwarded to the context as `conversations` is)
// AgentEventMap gains          readonly select: readonly [selection: Selection]
```

The loop's two call sites after the change, against the lines of commit `65c706a`:

```ts
// run entry, replacing `this.#context.build(this.#provider.format)` at src/core/Agent.ts:362
const selection = this.#selecting ? await this.#select(request, abort, budget) : undefined
const messages: Message[] = [...this.#context.build(selection)]

// after a compaction folds a section, replacing the rebuild at src/core/Agent.ts:665
const reselection = this.#selecting ? await this.#select(request, abort, budget) : undefined
messages.splice(0, messages.length, ...this.#context.build(reselection))
```

Rulings on the seam:

- **The default path is the loop of commit `65c706a`.** With no handler, `#selecting` is false, no `await` precedes the first provider request, and `build()` folds `active.view()` at the one read it folds on 2026-10-07 (`src/core/AgentContext.ts:237`). The loop's existing comment pins that property for the compaction gate (`src/core/Agent.ts:384-390`); the same tests are the control. `select` called with no handler resolves `{ messages: active.view(), judgments: [] }`; the loop never calls it on that path.
- **`build` stays synchronous; `select` awaits.** The asynchronous step is the handler's, and only its result enters the synchronous assembly. An asynchronous `build` would put an `await` on the default path and change the eager-pump and abort timing the loop pins.
- **The request travels with the call.** The loop passes the user message it is serving, the one it appended at run entry, to both `select` calls. A compaction can fold that message into a section summary (`Conversation.compact` folds the oldest `count - keep` live messages, every one of them when `keep` is 0, `src/core/conversations/Conversation.ts:200-214`), so the handler never searches `view()` for it. A `select` with no user request, as on a conversation whose last message is an assistant turn, returns `view()` unchanged.
- **Failure mirrors compaction, and spent usage is never lost.** A handler throw emits `fault` and the loop builds from `view()`; with `strict` set, the run settles `error`, and the `strict` doc (`src/core/types.ts:1137-1143`, summarizer failure only on 2026-10-07) gains the second source. A handler that spent judge calls before giving up, on an error or on the signal, returns a `Selection` with `fault` set, `messages` as `view()`, the judgments recorded so far, and the usage spent, which the loop charges before it emits `fault`, as the provider path charges an abort's partial usage (`src/core/Agent.ts:483-500`). An abort during `select` settles the partial path with no provider call, inside the run's cancellation boundary, so a cancel during selection and a cancel during generation share one outcome; the stock selection checks the signal before each judge call.
- **The conversation is checked, not assumed.** Overlapping runs on one agent are permitted when no construction-level accounting is shared (`src/core/Agent.ts:173-176`), so another run can append while a handler reads. `select` records the live tail's message ids before the handler runs and compares them after; a changed tail is a `fault` with a `view()` fallback and no retry, under the same `strict` rule.
- **The receipt is the `Selection`.** It records what entered, the judgment keys that justify it, and the cost. The agent emits it on `select`; the context stays event-free (`src/core/AgentContext.ts:87-88`). What was omitted derives from `view()` minus `messages`; no second list is stored. `build(selection)` folds `selection.messages` as the handler returned them, as it folds a summarizer's text: a handler is application code the application trusts, and the stock selection only ever returns a subset of `view()`.
- **Bounds after the change.** The run's cost budget charges the judge usage of every selection plus the provider usage; `AgentResult.usage` folds both; no `usage` chunk is emitted for a selection, so that chunk keeps its one-provider-call meaning. The `window` budget measures the selected message array; tool definitions and the schema stay unmeasured, the clause 24 gap the context ruling records (`.orkestrel/agent/context.md:144`).

## The stock selection

```ts
// @orkestrel/agent, src/core/contexts/types.ts
/** Returns the ids of the messages the selection may ask about: the application's cheap pass. */
export type ScreenHandler = (conversation: ConversationInterface, request: Message) => readonly string[]
/** Carries the application's criteria text and cutoff for one question; no default exists. */
export interface Criterion {
	readonly yes: string
	readonly no: string
	/** Compared with the `yes` weight's probability: at or over it the condition is true, at or under its complement the condition is false, between them the condition is absent. */
	readonly threshold: number
}
/** Carries the condition derived for one message; an absent condition was not asked or not answered. */
export interface Applicability {
	readonly id: string
	readonly needed?: boolean
}
export interface SelectionOptions {
	readonly judge: JudgeInterface
	readonly screen: ScreenHandler
	readonly needed: Criterion
	/** Caps the fresh questions one selection asks; the rest are left unasked and their messages kept. */
	readonly limit: number
}
// factories.ts   createSelection(options: SelectionOptions): SelectionHandler
// helpers.ts     inferApplicability(conversation, request, options): readonly Applicability[]
//                buildConditionKey(condition, subject, object): string
// templates.ts   NEEDED_QUESTION   (the question sentence over the markers [A] and [B])
// constants.ts   NEEDED_CRITERION   (the measured `yes` and `no` wordings, without a threshold)
```

What `createSelection` does on each call:

1. Takes the request the loop passed and calls `screen` for the subjects.
2. Builds one `noul` per subject, `needed(subject, request)`, with `sources` holding the pair's ids and the key built from the condition and the pair. The state is the conversation view with the subject marked `[A]` and the request marked `[B]` and the question sentence names those markers, so the question text does not change when a compaction shifts positions; the state text does change, and re-asks.
3. Enumerates the subjects in order, reuses every recorded judgment that matches, asks the judge for the rest through `judgments.resolve`, the same method the desk calls, and stops when `limit` fresh questions have been asked, so the preparation is bounded with the inference.
4. Derives applicability with the application's threshold and includes a subject unless `needed` is false. A subject nothing was asked about, or whose question was refused or left unasked by the limit, is kept: absence of evidence is not irrelevance.
5. Never drops the request message, and never splits an assistant-call and tool-result group, which the `correlate` unit's call id makes recognizable.
6. Removes the `needed` judgments keyed to an earlier request before it records the current ones, so the record holds one `needed` set per conversation and does not grow with turns times screen size.

When questions are asked follows from the keys, with no timer: an appended request re-keys `needed`; a removed or compacted-away source re-asks its dependents; the loop's two `select` calls, at run entry and after a compaction, are the only triggers. A rehydration reads retained originals and emits an event (`src/core/conversations/Conversation.ts:250`); the `recall` tool's content enters the conversation as the tool's result message, like any tool. The question is binary because the graded form was the weak one in the probe. The question sentence is the framework's: `NEEDED_QUESTION` asks whether message [A] is needed to carry out the request in message [B] correctly. The criteria text is the application's and required; the measured wording, "A can be left out and the request in B is still done correctly" and "A states something the work in B must respect", is exported as `NEEDED_CRITERION` without a threshold, and an application passes it or its own text with its own threshold.

The two relation questions are the next unit, not this one. `superseded(earlier, later)` and `accepted(earlier, later)` over ordered subject pairs, rendered as the pair alone, read well in the probe (§ Measurements) and their templates are recorded there; an inclusion rule that keeps a needed message and adds its superseder beside it dissolves the mixed-message hazard the objective lane raised (the probe's message [3] accepts SQLite and states the header-row rule, and message [8] withdraws the header-row rule; a whole-message supersession answered yes at 0.992, so a rule that drops a superseded message would drop the SQLite acceptance with it). They are built when an application that revises decisions mid-conversation consumes them, with `SelectionCondition` widening to name them, because the minimal public API law creates a capability with its first real consumer (`AGENTS.md:65`) and the desk configures `needed` alone. Span-addressed judgments wait for a consumer that must select rules rather than messages.

## The desk after the change

What the desk deletes, because the judge, `OllamaJudge`, and `computeReading` own it: in `app/core/helpers.ts`, `computeProbabilities` (`:45-68`), `computeConfidence` (`:77-81`), `computeScore` (`:93-125`), `weighLabels` (`:137-157`), `renderState`, `renderNoul`, `renderChoice`, and `renderScore` (`:166-208`), `pairLines` (`:407-423`), and `selectWinner` (`:431-439`), plus the pre-rendered question renderers (`renderQuestion` and the form renderers, `:254-320`); in `app/core/types.ts`, `DecisionForm`, `Relationship`, `LabelWeight`, the `Weigh*` types, `ScoreReading`, the prompt types, and `JudgeQuestion`; in `app/server/parsers.ts`, `parseWireUsage`, `parseTop`, and `parseChat`; in `app/server/types.ts`, `ChatReading` (`:66-70`), which carries a `LabelWeight` list; in `app/server/Desk.ts`, `#judge` (`:233-292`), `#judgeCall` (`:299-308`), `#readJudge` (`:317-367`), and `#restore` (`:145-153`), because model residency is the `keepAlive` option on the judge and the daemon's; in `app/server/constants.ts`, `TOP_LOGPROBS`, `JUDGE_SAMPLING`, and `PREDICT_JUDGE`, which the readout fixes.

What the desk rewrites: the question builders `buildQuestions`, `requireQuestion`, `buildChoice`, `buildRefund`, `buildFrustration`, and `buildCalibration` (`app/core/helpers.ts:240-245`, `:346-397`) build `JudgeQuestion` values from the fixtures instead of rendered prompts, and `buildCalibration` keeps feeding `Desk.calibration` (`app/server/Desk.ts:161-163`); `findLabel`, `findName`, and `findDecision` (`:535-571`) and the bench readers built on them (`:696-761`) read the slimmed `Decision`; `#speak` (`:381-427`) becomes the per-ticket reply agent described in the following paragraphs, with the policy summary `renderAgent` builds (`:466-472`) entering the run as an instruction through the agent's instruction manager, not as a ticket message.

What the desk keeps: `MICA_TEMPERATURE`, `JUDGE_PROMPT`, and `DECISION_MODEL` (`app/core/constants.ts:4-15`), which become the `temperature`, `system`, and `model` options; `NUM_CTX` and `KEEP_ALIVE`; the `EXAMPLES` fixtures reshaped to `JudgeQuestion` with `Candidate` ids where they carry labels and names on 2026-10-07, and with each noul's display names (`negative` and `positive`, `app/core/types.ts:131-132`) kept beside the fixture because the policy readers compare them (`app/core/policies.ts:213`, `:234`) and `buildSummary` prints them (`app/core/helpers.ts:452`); `renderCustomer`; the thresholds and policy (`app/core/policies.ts:587-607`, `:630-644`), whose readers consume a `Judgment` and its `Reading`; `taskFor`, `renderAgent`, and `buildSummary`; the page; `ModelCall`, which `Speech` also carries (`app/core/types.ts:168`, `:231`); the desk's `Decision`, slimmed to a display projection of a `Judgment`, its `Reading`, and an optional `Readout`, which `parseDecision` guards, with `AnswerLine` kept as the projection's per-candidate line (built from a `Weight` and its `Candidate`) because `findLabel`, `findName`, and the page's meters read it (`app/core/helpers.ts:552-570`). The page's comparison of the generated token with the winning label (`app/vue/App.vue:730`) reads `Readout.generated`; a reused judgment has no readout, so its card shows the recorded time and no token.

How a second turn on the same ticket reuses judgments: the `Desk` holds one `ConversationManager` per ticket over one shared `createMemoryConversationStore`, because `open` activates a conversation on its manager (`src/core/types.ts:2114`) and the context reads `active` on every access (`src/core/AgentContext.ts:236`), so one manager shared across tickets would let a reply for one ticket land in another; the desk also serializes turns per ticket. The ticket id is the application's (the fixture id suffices for the demo). `publish` opens the ticket or adds it, appends the posted text as a user message only when it differs from the last user message, calls `conversation.judgments.resolve` with the fixture questions over the state rendered from the ticket's customer messages, awaits `save`, then runs the policy from the judgments. The reply agent is created once per ticket with `conversations` set to the ticket's manager, `instructions` carrying the turn's policy summary, and `select` set to `createSelection({ judge, screen, needed, limit })`, where the screen names the earlier customer messages and replies; on a follow-up the selection asks `needed(earlier, request)` for each and the provider request folds the kept ones; the `select` event's receipt renders on the page beside the fixture decisions. A repeat run with the same text issues no judge call; an edited text asks only the questions whose sources changed; a reused judgment arrives without a `Readout`. Process-lifetime reuse is the claim; restart durability is not, until a durable store is chosen through the existing store seam.

The `recall` tool the context ruling stages in toolbox (`.orkestrel/agent/context.md:133`) installs on the desk's reply agent in the same unit as the desk change, over the ticket's conversation only.

## Alternatives ruled on

| Alternative | Ruling | Reason |
| --- | --- | --- |
| The judge inside `@orkestrel/ollama` alone | Refuse | The context and the record consume the contract, and the agent cannot import ollama; the dependency runs one way (`guides/ollama.md:12`). |
| A separate package per wire | Refuse in this round | System One is a protocol many servers share, not one vendor's, so it lives in the agent's providers folder beside the relay, prefixed `SystemOne` so a later extraction is a move; no repository for a package is reachable from the 2026-10-07 checkouts. The logprob readout is the same daemon and the same `url` and `keepAlive` vocabulary as `OllamaOptions` (`guides/ollama.md:75`) and stays in `@orkestrel/ollama`. |
| An HTTP engine with an `encode`/`decode` transport object instead of a subclass | Refuse | The providers module already shapes a wire as a subclass over `AgentProvider` (`guides/ollama.md:104`); a second shape for the sibling engine would be two patterns for one thing. One `batch` switch covers the one way the wires differ, as `split` and `strict` cover the provider's. |
| Keep the protocol's `type` discriminant in fleet code | Refuse | Fleet code names the axis and never uses `type` (`AGENTS.md:59`); only the `SystemOne*` wire types keep it (`.claude/rules/names.md:121-122`). |
| Trust a server's `confidence`, `score`, or `choice` | Refuse | Servers define confidence four ways and Mica's server returns an integer score (`tmp/units/judge-protocol.md`, the divergence table); every server returns probabilities, so `computeReading` derives one scale (`AGENTS.md:58`). |
| One OpenAI-compatible logprob wire in place of the Ollama-native one | Refuse in this round | Ollama's documentation and code disagree on logprobs at its OpenAI path, that path applies Ollama's template so no byte-exact render is possible, and llama.cpp serves the System One path natively for decision models; no host consumer reads logprobs from llama.cpp or vLLM. |
| `model` per request, the SDK's override | Refuse | One judge has one model, as one provider does (`/home/user/ollama/src/core/types.ts:67-68`); on the logprob wire the model is bound to its calibration and identity. |
| The SDK's generic `ResultFor<Q>` typing | Refuse in this round | A refusal can leave any key without an answer, so every mapped key stays optional; a caller narrows on `answer.form`, and no consumer asked for the mapping. |
| A raw exchange or `Readout` on the result | Refuse in this round | A `ProviderResult` carries no wire evidence either; the desk's top-list panel is a diagnostic the probe harness keeps, and a trace seam waits for a consumer. |
| An `AsyncIterable` of calls instead of a promise | Refuse | On Ollama a caller that needs progressive arrival issues one request per question at the same cost; on a System One server the batch arrives at once. The iterator adds early-close and cleanup rules and buys no arrival either wire does not already give. |
| A context-level `decide` and a context emitter | Refuse | The context is event-free by design (`src/core/AgentContext.ts:87-88`); the agent emits `select`. The reuse-or-ask-and-record step is one manager method, `judgments.resolve`, the stock selection and the desk both call. |
| A uniformly asynchronous `build` | Refuse | It puts an `await` on the default path and changes the abort and eager-pump timing the loop pins (`src/core/Agent.ts:384-390`). |
| Selection as a `Conversation` method | Refuse | The selection needs the request, the screen, and the judge at assembly time, where `build()` already meets the system block and the workspace (`src/core/AgentContext.ts:173-249`); a conversation owns its messages and their judgments and stays the pure synchronous read the context folds (`src/core/conversations/Conversation.ts:176`). |
| Judgments as a workspace document | Refuse | `build()` renders workspace text into the system prompt (`src/core/AgentContext.ts:220-229`), so judgments would reach the model as text; a document has no typed lookup by key and persists per workspace, not per conversation. |
| Relevance by substring search alone | Refuse as the selector; keep as a screen | `search` matches substrings (`src/core/conversations/Conversation.ts:258-267`) and cannot tell a withdrawn rule from one in force; it is the cheap pass a `ScreenHandler` can use, and the `recall` tool keeps it. |
| Validation of a handler's `Selection` by the context (unknown ids, duplicates, a recap beside its originals) | Refuse | A handler is application code the application supplied, as a summarizer is; the context folds what it returns. The stock selection returns a subset of `view()` by construction, and its tests pin that. |
| A structured `JudgeRequest.state` | Adopt | The protocol admits text, an object, or an array, and Ollama accepted an object state and object instructions on 2026-10-07 (`tmp/probes/systemone-tev1-object.json`); the logprob wire renders a structured state as Mica's server does and refuses structured instructions or criteria before inference. |
| A graded relevance `score` for selection | Refuse | The graded form leaned to the middle level on 3 of 4 rows (§ Measurements); the binary question is the selection form. |
| Span-addressed judgments and typed revision records | Defer | Real for a consumer that selects rules rather than messages; this round's consumer selects messages, and the staged inclusion rule keeps a mixed message. |
| The relation questions in this round | Defer | Measured and recorded; built with the first application that revises decisions mid-conversation (`AGENTS.md:65`). |
| The proposal's message-agnostic assertion layer | Refuse | No consumer imports it; judgments keyed to source ids are the assertions with provenance, built where the record lives (`.orkestrel/agent/context.md:139`). |
| A `Decision*` name family in the agent | Refuse | `@orkestrel/program` owns `Decision` for an authority outcome (`guides/program.md:130`); a second family on the same word would be two concepts on one term. `Judge` and `Judgment` are free fleet-wide and are the desk's own words. |

## Vocabulary

Every proposed public name was checked against the collision record (`host.json` `surface`, 128 rows) and the `## Surface` rows under `guides/`, by exact name and by stem. `free` means no package exports the name; `qualified` means the bare word is owned elsewhere and the name carries a domain word. The subjective audit lane repeated the sweep and found the same three owned stems: `Decision` (`guides/program.md:130`), `Condition` (`guides/database.md:262`), and `SelectionManagerInterface` (`guides/table.md:122`).

| Name | Kind | Home | Mark |
| --- | --- | --- | --- |
| `JudgeInterface`, `JudgeRequest`, `JudgeResult`, `JudgeQuestion`, `JudgeAnswer`, `JudgeEntry` | types | agent | free |
| `ChoiceQuestion`, `ScoreQuestion`, `NoulQuestion` | interfaces | agent | qualified; bare `Question` is owned by scaffold (`guides/scaffold.md:108`) |
| `ChoiceCriteria`, `ScoreCriteria`, `NoulCriteria` | types | agent | free; the protocol's names |
| `ChoiceAnswer`, `ScoreAnswer`, `NoulAnswer`, `Refusal`, `Reading` | interfaces | agent | free; `PromptAnswer` (supervisor), `AnswerError` (terminal), `AnswerHandler` (router), and `AnswerToolOptions` (toolbox) are distinct |
| `AgentJudge`, `AgentJudgeInterface`, `AgentJudgeInput`, `JudgeError`, `JudgeErrorCode`, `isJudgeError`, `JudgeAbortError`, `isJudgeAbortError`, `isJudgeEntry`, `isJudgeQuestion`, `computeReading`, `buildJudgeResult`, `readHeaders` | class, types, functions | agent | free |
| `SystemOneJudge`, `SystemOneJudgeOptions`, `createSystemOneJudge`, `SystemOneEntry`, `SystemOneQuestion`, `SystemOneRequest`, `SystemOneResponse`, `SystemOneAnswer`, `SystemOneChoiceAnswer`, `SystemOneScoreAnswer`, `SystemOneNoulAnswer`, `SystemOneUsage`, `isSystemOneResponse`, `isSystemOneAnswer`, `questionToSystemOne`, `extractSystemOneAnswer`, `extractSystemOneUsage`, `SYSTEM_ONE_PATH` | class, types, functions, constant | agent | free; the wire types keep `type`, `input_tokens`, `output_tokens`, and `legend` (`.claude/rules/names.md:122`) |
| `Judgment`, `JudgmentInput`, `JudgmentManagerInterface`, `JudgmentManager`, `buildJudgments`, `matchesJudgment`, `isJudgment` | types, class, functions | agent conversations module | free |
| `Selection`, `SelectionHandler`, `SelectionOptions`, `createSelection`, `Criterion`, `ScreenHandler`, `Applicability`, `inferApplicability`, `buildConditionKey`, `NEEDED_QUESTION`, `NEEDED_CRITERION` | types, functions, constants | agent contexts module | free; `table` owns `SelectionManagerInterface`, a different name |
| `SelectionCondition` | type | agent contexts module | qualified; `database` owns `Condition` |
| `select`, `judgments`, `resolve`, `batch`, `calibration`, `form`, `instructions`, `criteria`, `answers`, `refusals`, `probabilities`, `noul`, `winner`, `score` | members | agent, ollama | members, not bare names; none is a fixed lifecycle verb |
| `OllamaJudge`, `OllamaJudgeOptions`, `createOllamaJudge`, `WireGenerateRequest`, `Logprob`, `escapeSpecial`, `renderJudgePrompt`, `renderJudgeIdentity`, `buildJudgeLabels`, `extractTop`, `computeAnswer`, `OLLAMA_GENERATE_PATH`, `TOP_LOGPROBS`, `OPTION_LABELS`, `NOUL_LABELS`, `SPECIAL_TOKENS`, `RENDER_REVISION`, `MAX_SCORE_LEVELS` | class, types, functions, constants | ollama | free; the wire body keeps the external `top_logprobs` and `keep_alive` names, as `.claude/rules/names.md:122` requires; `escapeSpecial`, `OPTION_LABELS`, and `NOUL_LABELS` mirror Mica's `native.py` |

`execute` is not used: the fixed lifecycle vocabulary gives it the meaning "run primary work to completion" (`.claude/rules/names.md:232`); the judge's verb is `ask`.

## The plan

The System One round (units 1, 2, 6, and the judge half of 8, with the agent guide and one falsification round between them) runs first, against the pre-carve layout, because the user ruled on 2026-10-07 that the System One work comes first; the context ruling's units and the later rounds follow, and `carve` moves the judge declarations with the provider concern when it lands. Each checkout has one writer at a time; a file passes from one unit to the next in sequence, so two units in one checkout can touch one file (`contexts/types.ts` in units 3 and 4; `guides/agent.md` in units 1 and 5) without a concurrent write. Checkouts run in parallel. The Codex bench was live on 2026-10-07, so constraint-heavy mechanics route to `astra` and shape-sensitive units to `opus`, each reviewed by an engine that did not write it. The desk integration runs against packed local builds before any release, so each capability has its consumer before it is published.

| Order | Unit | Package | Role, engine, review | Owns | Accepts when |
| --- | --- | --- | --- | --- | --- |
| 1 | `engine` | agent | `opus`; `analyst` (Astra) | the judge block in the root `types.ts`, `JudgeError` and `JudgeAbortError` with their guards, `isJudgeEntry` and `isJudgeQuestion`, `computeReading`, `buildJudgeResult`, `readHeaders` (which `AgentProvider` then calls), `AgentJudge.ts`, the barrel row, a `ScriptedJudge` test wire over a fixture fetch, tests | the block typechecks; `computeReading` reproduces the recorded `tev1` readings (choice winner `bug` at confidence 0.9536, score 0.99192), TypeSafe's documented confidences within their rounding, the 0.355 score example, `|2p - 1|` for a noul, and a first-wins tie; `QUESTION` is thrown with zero transport calls for an empty map, a malformed question, and a `body` throw on the second question; `HTTP` carries the status and a bounded excerpt; `PROTOCOL` for a null body or invalid JSON; `batch` false makes one call per question in key order and sums usage; an abort after the first of two calls throws `JudgeAbortError` carrying the first answer and its usage; every `AgentProvider` test passes unchanged |
| 2 | `systemone` | agent | `astra`; `reviewer` (Opus) | the `SystemOne*` types and `SystemOneJudgeOptions`, `SYSTEM_ONE_PATH`, the two guards, `questionToSystemOne` and the two `extractSystemOne*` helpers, `providers/SystemOneJudge.ts`, `createSystemOneJudge`, the barrel row, tests with the recorded bodies as fixtures | the quickstart body equals the documented JSON; the `tev1` request body equals the recorded request; decoding the recorded `tev1` response gives its probabilities, `noul` 0.9978973674111222, usage `{ prompt: 975, completion: 4, total: 979 }`, and model `tev1:0.8b`; llama.cpp arrays decode equal to maps; Mica's extras and integer score are ignored; a missing label, a mismatched type, and a missing id each throw `PROTOCOL` naming the question; an Ollama 400 body throws `HTTP` 400; the hook's authorization header reaches the request at `url` plus the path |
| 2 | `judgments` | agent | `astra`; `reviewer` (Opus) | the conversations module's types, `JudgmentManager.ts`, `Conversation.ts`, helpers, validators, both stores, tests | last write wins per key; `matchesJudgment` is false on a changed source, text, criterion, state, or identity; `resolve` asks only for the unmatched questions and records them; `buildJudgments` attaches usage only to a one-question request; a snapshot with judgments round-trips through both stores and one without still validates |
| 3 | `seam` | agent | `opus`; `analyst` (Astra) | `Selection`, `SelectionHandler`, `AgentContext.ts`, the agents module's types, `Agent.ts`, the `strict` doc, tests | every existing `Agent.test.ts` case passes unchanged with no `select`, the synchronous-abort timing cases included; with a handler the provider receives `build(selection)` and the handler receives the run's request; `select` fires at entry and after a compaction; a handler throw emits `fault` and falls back, and with `strict` settles `error`; a returned `fault` charges its usage before `fault` fires; an abort during `select` commits a partial with no provider call; a tail changed under the handler is a `fault`; selection usage reaches the budget and the result |
| 4 | `selection` | agent | `astra`; `reviewer` (Opus) | `createSelection`, `inferApplicability`, `buildConditionKey`, the contexts module's templates and constants, tests over a judge built on `AgentJudge` with a fixture `fetch` of recorded bodies and the probe transcript | no default threshold exists in the types; a second call asks nothing; a compaction re-asks only the subjects whose state changed; a removed source re-asks its dependents; the limit leaves the unasked kept; the request message and a tool group are never dropped; an earlier request's `needed` judgments are removed; the probe's expected applicability holds under a threshold the test supplies |
| 5 | `guide` | agent | `opus`; `checker` | the `guides/agent.md` sections for the judge, the judgments, the seam, and the stock selection, with executed fences | `test:guides` passes and every behavior sentence has an executed assertion |
| 6 | `ollama-judge` | ollama | `astra`; `reviewer` (Opus) | `OllamaJudge.ts`, the ollama types, constants, and helpers, `createOllamaJudge`, the barrel, hermetic tests with the recorded raw bodies, a `service` case, judge settings beside `OLLAMA_CONFIG`, `guides/ollama.md`; built against a packed local agent | `renderJudgePrompt` equals the recorded raw prompt byte for byte; `escapeSpecial` inserts U+200B after the `<` of each special token and changes nothing else; `QUESTION` for a choice with 21 options, a score with 11 levels, and structured instructions; a top list without a label gives a `Refusal` naming the option; the candidate-only softmax reproduces `tests/app/core/helpers.test.ts:28-38` and `:64-80`; usage reads from the recorded body; the identity changes when the system prompt, the calibration, the tag, or the render revision changes; live: Mica's delete-database noul within a tolerance the unit states, `createSystemOneJudge` against `tev1:0.8b` answers 3 questions, and Mica on the systemone path raises `HTTP` 400 |
| 7 | `recall` | toolbox | `builder` (Sol); `reviewer` (Opus) | the toolbox `recall` tool, tests, `guides/toolbox.md`; built against a packed local agent | the tool drives the real conversation manager through a real tool manager; a ticket outside the manager is unreachable |
| 8 | `desk-judge` | desk | `astra`; `reviewer` (Opus) | in the System One round: the desk's judge path only, its bare `fetch` and readout math becoming `createOllamaJudge` and `computeReading`, questions built as `JudgeQuestion` values with criteria maps, tests, built against packed local agent and ollama; in the later rounds: the deletions and rewrites under § The desk after the change, the per-ticket managers, the ticket agent with `select` and `instructions`, the recall tool install | System One round: the desk tests pass with the bench references unchanged except the documented confidence term, no judge body remains on the chat path, and `tests/app/vue/integration.test.ts` passes; later rounds: a repeated `POST /turn` with the same fixture and text issues no judge call on a recording daemon origin; an edited text asks only the changed sources' questions; a follow-up on the same ticket sends the provider a request that folds only the messages the selection kept, and the page shows the receipt; two tickets in flight never share a message |
| 9 | falsification round | agent, ollama, toolbox, desk | `analyst` (Astra) and `reviewer` (Opus) | report only | one round on the integrated result, per `.agents/orchestration.md:57` and `:72` |
| 10 | release 0.0.28 | agent | `verifier`, then the Orchestrator | the manifest version | tree-wide gates green; `test:distribution -- --mode release` passes |
| 11 | releases | ollama, toolbox | `verifier`, then the Orchestrator | the manifests and the agent pins | gates green against agent 0.0.28 |
| 12 | re-pin, and `mirrors` | desk, scaffold | `builder` (Sol) | the desk pins; `guides/agent.md`, `guides/ollama.md`, `guides/toolbox.md` | the desk tests pass against the published packages; the mirrors are byte-identical to the published guides |

## Where the lanes disagreed

| Question | Subjective lane (Opus) | Objective lane (Astra) | Ruling, and who was right |
| --- | --- | --- | --- |
| Where the contract lives | agent root | values at the root, the client in the providers module, the contexts module importing it | Both halves: values and the interface at the root by the two-module rule; the engine, `Reading`, and `computeReading` in the providers module beside `AgentProvider`; the carve graph unchanged but for the `budget` type edge |
| Call shape | `ask(): Promise<JudgeResult>` | `execute(): AsyncIterable<DecisionCall>` | Opus: the iterator buys no arrival either wire lacks, and `execute` is fixed vocabulary |
| Wire seam | a subclass per wire with `body` and `read` | an `encode`/`decode` transport object | Opus on the subclass; Astra on the shape: the seam projects a request onto calls, so a batch wire fits |
| Measures | derived by `computeReading` | stored on each result | Opus, by the derive-state law; Astra right that a refusal with probabilities must be rejected by the guard |
| `build` | synchronous, `select` awaited | uniformly asynchronous with a receipt | Opus on the default path; Astra right that the entry `await` must sit inside the run's cancellation boundary |
| Observation | the agent emits `select` | the context gains an emitter with `decision` and `select` | Opus: the context stays event-free |
| Provenance | message ids | message ids plus spans, plus typed revisions | Astra right on the mixed-message hazard; dissolved by the staged inclusion rule, spans and revisions deferred to a consumer |
| Reuse identity | question, sources, model | question, criteria, candidates, exact state, sources, profile | Astra: the state and the full judge identity are in the match |
| Uncertainty | exclude unless accepted | retain what was not resolved | Astra: an unasked, refused, or limit-cut question keeps its message |
| Work bound | none | `limit` and `timeout` | Astra: `limit` as an application figure; the run deadline already bounds time |
| Correlation and the request | not stated | keep tool groups whole, never drop the request | Astra |
| Budget | the caller charges `usage` | the client charges a borrowed budget | Opus: mirrors how the loop charges a provider |
| System One wire | a later package | inside the agent | Superseded on 2026-10-07 by the protocol-conformance round: the wire is a protocol many servers share and lives in the agent's providers folder beside the relay; a package stays the extraction path |
| Names | `Judge`, `Judgment` | `Decision*` qualified family | Opus: `program` owns `Decision`; both lanes found the collision |
| Concurrent mutation during `select` | not stated | reject a changed snapshot | Astra: the tail is compared before and after the handler |

## Falsification

One round ran on 2026-10-07 over 13 claims (`tmp/units/refine-claims.md`): the objective lane on GPT-6 Astra (`analyst`, journal `tmp/codex/refine-audit.jsonl`, verdict `tmp/codex/refine-audit-answer.md`, 91 citations resolving) and the subjective lane on Opus 5.5 (`reviewer`, verdict `tmp/units/refine-audit-subjective.md`, every sampled citation resolving). Astra returned `FAIL 2, 3, 5, 6, 7, 8, 9, 11, 12, 13` with four outside findings; Opus returned `FAIL 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13` with four outside findings and one advisory. Every finding was reproduced against the record, the source, or the journals before it was accepted; the rulings follow, and this text carries every amendment.

| Claim | Lanes | Ruling |
| --- | --- | --- |
| 1 default path unchanged | both `CONFIRMED` | holds; both lanes named the conditional-await attack |
| 2 placement | both `BROKEN` | accepted: `Reading` and `computeReading` moved to the providers module; `JudgeForm` dropped as a type with no importer; the `budget` type edge recorded |
| 3 mechanism not policy | both `BROKEN` | accepted: the framework owns the question sentence and exports the measured criteria as a constant; `Criterion` stays the application's and required; the request is the message the loop passes, not a rule over `view()` |
| 4 no stored derivable | Astra `CONFIRMED`, Opus `BROKEN` on the claim's citation | the record held; the claims file misattributed the softmax tests (`tests/app/core/helpers.test.ts:28-38`, `:64-80`) to `computeReading`, which the record itself assigns to `OllamaJudge`; the claims file is the defect |
| 5 reuse identity | both `BROKEN` | accepted: the rendered state is in the match and on the record; the judge identity is composed from the model tag, the system prompt, the calibration, and the render revision; the inverted calibration sentence corrected |
| 6 bounded selection | both `BROKEN` | accepted: the request travels with the call so a compaction cannot hide it; the subject and the request are marked `[A]` and `[B]` so the question text survives a compaction; the relation questions and the `include` override are cut to the next unit for want of a consumer; the lazily bounded enumeration stated |
| 7 failure semantics | both `BROKEN` | accepted: spent usage returns on `Selection.fault`; the no-handler `select` result stated; the `strict` doc gains the second source; the tail check replaces the one-writer deferral |
| 8 probe reading | both `BROKEN` | accepted: pair [3]/[10] counted consistently; the state choice restated as a tie ruled on the kind of miss, with its probe; probability and confidence told apart |
| 9 desk mapping | both `BROKEN` | accepted: `Readout.generated`; `ChatReading` deleted; the question builders, bench readers, `#speak`, and the noul display names ruled; the repeat test compares with the last user message |
| 10 vocabulary | both `CONFIRMED` | holds; Opus repeated the Surface sweep by stem |
| 11 alternatives ruled | both `BROKEN` | accepted: the false `view()` dependency reason replaced; four alternatives ruled (selection validation, structured state, `strict`, `#restore`) |
| 12 plan order | both `BROKEN` | accepted: toolbox release and reviewers added; file hand-off between serial units stated; the desk integration against packed local builds precedes every release; one falsification round |
| 13 writing | both `BROKEN` | accepted: line citations added; the undated session reference dated; mental verbs on components removed; numerals |

Outside findings: Astra's F-A (effectful orchestration in a helper) is accepted as `judgments.resolve`; F-B (rehydration as a trigger) is accepted; F-C (candidate ids hidden from the model) is accepted; F-D (a scripted judge stub as a behavioral fake, `AGENTS.md:42`) is accepted for units 1 and 4; Astra's advisory A-A (quadratic pair preparation) is accepted as the bounded enumeration. Opus's F1 (the per-question seam cannot host a batch wire; the engine input lacked `url` and `path`) is accepted as `project` and `AgentJudgeInput`; F2 (one manager shared across ticket agents) is accepted as one manager per ticket; F3 (`answer` naming two concepts) is accepted as `JudgeOutcome` and `outcomes`; F4 (the threshold's scale) is accepted in the `Criterion` doc; Opus's advisory A1 (judgments accumulate) is accepted as step 6 of the stock selection. No finding was dropped.

Where the lanes answered different questions: on claim 4 Astra audited the record and Opus audited the claims file's citation; both were right about their object. On claim 6 Astra attacked the request's survival through compaction and Opus attacked the question text's survival; both constraints hold in the ruling. On claim 7 Astra named the lost usage and the overlapping runs, Opus named the no-handler result and the `strict` doc; all four are ruled.

## Protocol conformance round

On 2026-10-07 the user ruled that the System One work comes first, conformant to TypeSafe's protocol and usable with every similar model, and asked for the scope question to be ruled with the code. Two researcher lanes read the primary sources (`tmp/units/judge-systemone-research.md`, `tmp/units/judge-ollama-research.md`), a scout mapped the provider engine's seams (`tmp/units/judge-scout.md`), and the Orchestrator fetched the TypeSafe API reference and the JavaScript SDK interfaces, Ollama's systemone and llama.cpp's server documentation, and ran the probes recorded under `tmp/units/judge-protocol.md`: Ollama 0.40.0 refuses Mica on the systemone path with HTTP 400 and answers `tev1:0.8b` conformantly; a raw generate call with a hand-rendered Mica prompt returns the same prompt token count and the same top logprobs as the templated chat path. Two blind design lanes ran on `tmp/units/judge-brief.md`: the subjective lane on Opus 5.5 (`planner`, 64 tool calls, 16.3 min, 87 citations resolving) and the objective lane on GPT-6 Astra (`analyst`, 44 commands, 12.8 min, 93 citations resolving). The research report's claim that TypeSafe's worked score example contradicts its formula was an arithmetic error the objective lane caught; the example matches.

The lanes agreed on the protocol-shaped contract, `form` for the protocol's `type`, questions keyed by caller id, distributions stored and measures derived, the lenient map-or-array decoder, `SystemOneJudge` as the primary wire in the agent's providers folder, `OllamaJudge` in ollama over a raw generate call, an engine with `name`, `body`, and `read` and no streaming parser, validation before inference, and the desk as the consumer in this round. Where they disagreed:

| Question | Subjective lane (Opus) | Objective lane (Astra) | Ruling |
| --- | --- | --- | --- |
| The protocol's null | `JudgeEntry` without null; null kept only for an undescribed option or level; state and noul sides omitted | `JudgeEntry` with null throughout | Opus: null only where the external format distinguishes it from omission; `state` required and never null, because Ollama rejects an empty state |
| The model | one judge, one model, as a provider | `model` per request plus an `identity(model)` method | Opus: the provider's shape; the result reports the server's model |
| A refusal | a `refusals` map beside `answers` | a `Refusal` arm inside `answers` | Opus: `answers` keeps the protocol's shape and the word answer one meaning |
| The call split | a `batch` boolean | `project(request)` returning partitions | Opus: one binary behavior, one boolean, as `split` and `strict` |
| Wire evidence on the result | drop `Readout` and the top-list display | keep immutable `exchanges` for a lossless round trip | Opus: a `ProviderResult` carries no wire evidence; a trace seam waits for a consumer; the round trip is lossless at the value level |
| Errors | `JudgeError` plus `JudgeAbortError` with a partial, as the provider | one error with `TRANSPORT` and `ABORT` codes | Opus: mirror the provider; a transport error is rethrown unchanged |
| Raw generate | adopt, contingent on a probe | adopt, contingent on a probe | both; the probe proved byte parity |
| Score levels on the logprob wire | 10, Mica's limit | 10 | both |
| Structured entries on the logprob wire | render state as the server does; refuse structured instructions and criteria | refuse every structured entry until a golden render exists | Opus for state, both for instructions and criteria |
| Scope | fold the entity into plain filter data | keep `Scope` and `ScopeManager` | the user: the registry's consumer is pre-made modes an application switches among, so both stay; see § Scope and selection |
| Units | engine on `opus`, wires on `astra`, guide on `opus` | every unit on `astra` | Opus: shape to Opus, constraints to Astra, each reviewed by the other |

### Scope and selection

The user's intent for scope, stated on 2026-10-07: pre-made, switchable constrained contexts an application changes between cheaply, the way a Claude Code agent file defines a role, for the fleet's own handling of subagents. That is a consumer for the named `Scope` and the `ScopeManager` registry, which the code otherwise reaches only from the agent's tests and guide (`guides/agent.md:320-341`, `tests/src/core/scopes/ScopeManager.test.ts`). The ruling: scope is the static mode and selection is the dynamic inclusion, and they compose. A scope filters instructions, tools, and active workspace files synchronously with no model call and no evidence (`src/core/AgentContext.ts:189-213`, `src/core/Agent.ts:435`); a selection chooses the conversation messages a request needs, asynchronously and with judgments. Neither replaces the other. In the selection round, a scope gains an optional `select` handler so switching the mode switches the inclusion policy with one `apply`, and a `description` so a mode is discoverable as an agent file's is. A role for a subagent is a scope plus agent options (provider, budget, authority); the registry that creates an agent from a named role belongs to the layer that spawns subagents and is built with that layer as its consumer. The framework ships no file-format loader; a guide pattern shows a set of modes loaded from plain data and switched with `apply`.

## Risks

| Risk | Cheapest probe |
| --- | --- |
| A `needed` judgment's view-shaped state re-asks after every append that changes the view, so a long run with many compactions pays `limit` questions per compaction | time `createSelection` over the probe transcript across three compactions with a stated `limit` |
| The whole-view state for `needed` reads worse than the pair on another transcript | the pair harness over a second transcript with a clarifying message appended after a `needed` outcome |
| The templates read differently on a model other than Mica v0.1 4B | the pair harness against that model's Ollama tag, before its `OllamaJudgeOptions` are pinned |
| An adversarial note in a message flips a `needed` answer and drops a rule | the desk's injection fixture placed as a screened message |
| A pair longer than Mica's 8,192-token contract | one over-length state; the Ollama daemon's own behavior at the limit is measured, not inferred from the official server's HTTP 400 (`.orkestrel/agent/mica.md:22`) |
| An `await` slips into the default path | the existing timing cases in `tests/src/core/Agent.test.ts` |
| Ollama reports logprobs after a sampling filter, so a candidate drops out of the top list under a caller's `top_k` or `top_p` | the recorded raw noul re-run with `top_k: 0` and `top_p: 1`, compared with the defaults |
| A re-pulled Ollama tag keeps its name and changes its weights, so the identity goes stale | compare the digest from the show endpoint before and after a pull |
| llama.cpp's live body differs from the shape its pull request describes | one recorded body from a llama.cpp server; none runs on this host |
| Reuse crosses a changed question, source, state, or identity | change each identity field alone and assert reuse only on full equality |
| Restart loses the judgments | restart the desk after a saved memory-store turn and keep the expected absence explicit |

## Files to read with this record

- `tmp/units/refine-evidence.md`, the evidence the lanes read, kept until the campaign sweep; its content is summarized under § Measurements.
- `tmp/probes/mica.ts`, `tmp/probes/pairs.ts`, and `tmp/probes/pairs2.ts`, the probes, with their journals and result files, deleted at the sweep; the readings survive in § Measurements.
- `tmp/units/refine-subjective.md` and `tmp/codex/refine-answer.md`, the design lane answers, and `tmp/units/refine-claims.md` with `tmp/codex/refine-audit-answer.md` and `tmp/units/refine-audit-subjective.md`, the claims and the two audit verdicts, deleted at the sweep; the reconciliation and the rulings survive in § Where the lanes disagreed and § Falsification.
- [The context ruling](context.md), whose units precede this plan, and the 2026-10-05 records this plan keeps to: [provider.md](provider.md), [agent.md](agent.md), [system-one.md](system-one.md), [mica.md](mica.md), [desk.md](desk.md), and [packages.md](packages.md).
