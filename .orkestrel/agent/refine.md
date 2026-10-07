# The judge and the selection seam: two refinements inside the agent

Recommendation record for `@orkestrel/agent`, written 2026-10-07 after the user accepted [the context ruling](context.md) and asked for a refined recommendation that works two refinements into the agent and its related packages: the living context, as a feature of the agent's own context rather than a package or a consumer of the agent, and the System One decision model the desk experiments with. The user's constraint on the first: neither a toggle nor machinery the default path never reaches. The record is written against the agent checkout at commit `65c706a`, the desk checkout at its default branch head, and the scaffold checkout on the recommendation branch.

Two kinds of sentence appear, as in the other records in this folder: a measured fact names the file, line, command, or run it came from; a design conclusion is a ruling for this codebase. Paths under `src/`, `tests/`, and `guides/` of the agent resolve against the agent checkout; paths under `app/` and `tests/app/` resolve against the desk checkout; every other path resolves against the scaffold checkout. Line numbers are those of the checkouts named in the first paragraph; the `carve` unit of the context ruling moves the agent files, so a later reader resolves a symbol by name.

## Ruling

Add one decision contract to the agent, called the judge, and one selection seam to the agent's context, and build both with the consumers that exist today: the desk for the judge, the agent loop and the desk for the seam. Nothing becomes a package in this round. Nothing is a boolean on `AgentOptions`.

- **The judge.** `JudgeInterface.ask(request, signal)` answers typed questions about one state with probabilities over the caller's candidates, or refuses a question whose label the model could not read. The value types and the interface live at the agent root, beside `Message`; the HTTP engine `AgentJudge` lives in the providers module as the sibling of `AgentProvider`; the first wire, `OllamaJudge`, lives in `@orkestrel/ollama` and reads the daemon's first-token logprobs the way the desk does today. The published measures are derived from the probabilities by one helper, never stored. A System One HTTP wire is a later vendor package built with its first consumer.
- **Judgments on the record.** A `Conversation` records each answer as a `Judgment` with its provenance (the question, the answer, the model, the source message ids, the time, the usage) under its `judgments` manager, keyed by the caller's question id, persisted in the snapshot. A later turn reuses a judgment whose question, sources, and model match, and asks the model only for the rest.
- **The selection seam.** `AgentContextInterface.select(signal)` asks an application-supplied `SelectionHandler` which conversation messages the next prompt folds, and `build(selection?)` stays synchronous and folds that selection where it folds `active.view()` today. The loop awaits `select` at run entry and after a compaction only when a handler is configured. With no handler the loop never calls it and `build()` is byte-for-byte today's assembly, with no added `await` before the first provider request.
- **The stock selection.** `createSelection(options)` is the handler the framework ships: it asks the judge binary questions over the messages the application's screen names (`needed`, and when configured `superseded` and `accepted`), records each answer once, derives per-message applicability with the application's criteria text and thresholds, and includes a message unless the application's `needed` question answered no. The questions' wording is the framework's; the criteria, the thresholds, the screen, the work limit, and any inclusion override are the application's.

What the desk does afterward: it deletes its readout math, its judge `fetch`, and its decision types; it keeps each ticket as a conversation in a memory store; it reuses recorded judgments on a repeated turn and asks Mica only for the questions whose sources changed; its reply agent runs over the ticket conversation with the stock selection, so a follow-up message on the same ticket folds only the earlier messages the `needed` question kept, and the page shows that receipt; it keeps every fixture, threshold, policy phase, and task sentence. The desk is therefore the first consumer of the judge, the judgments, the seam, and the stock selection, and the loop reaches the seam on this host without a test.

## How the question was worked

The desk was read first-hand (`app/core/types.ts`, `constants.ts`, `helpers.ts`, `policies.ts`, `templates.ts`, `app/server/Desk.ts`, `parsers.ts`, `handlers.ts`) and mapped by one Grok 4.7 lane on the Cursor bench (journal `tmp/cursor/desk.jsonl`, 162 tool calls, 13.5 min; 448 citations, every one resolving against the desk or the scaffold checkout). Mica v0.1 4B was probed through Ollama on this host with the desk's judge body and readout (`tmp/probes/mica.ts`, 15 questions; `tmp/probes/pairs.ts`, 24 questions). Two blind design lanes ran on one brief (`tmp/units/refine-brief.md`): the subjective lane on Opus 5.5 (`planner`, 51 tool calls, 14.7 min) and the objective lane on GPT-6 Astra through `codex exec` (`analyst`, 60 commands, 15.2 min). Their citations were checked with `cite.ts` under the three checkout roots: 79 and 99 citations, none unresolved. The reconciliation under § Where the lanes disagreed names which lane was right on what. A falsification round over the numbered claims follows this record and is recorded under § Falsification.

## Measurements

The Mica probe (`tmp/probes/mica.jsonl`, run 2026-10-07 on a CPU-only host, 4 threads, the model loaded in 106 s) asked, over a ten-message fictional transcript, the questions a selection step would ask. Every candidate label was in the top 20 on every question.

| Question class | Form | Rows | As expected | Confidence range | Reading |
| --- | --- | --- | --- | --- | --- |
| needed, superseded, accepted, in force, source of a constraint, format in force | `noul`, `choice` | 10 | 10 | 0.606 to 0.996 | the binary and choice forms carry the selection questions |
| how much a message matters, three levels | `score` | 4 | 2 | 0.318 to 0.943 | the graded form leans to the middle level and is not the selection form |
| delete-database calibration | `noul` | 1 | 1 | 0.971 | No 0.986 against the desk's pinned 0.9884 |

Two readings follow from the rows. The withdrawn header-row rule was graded as background when asked how much it matters, and was called superseded at 0.992 when asked directly whether the later message withdraws it: the model answers the question asked and applies no relation it was not asked about, so applicability must come from explicit per-relation questions, recorded once. Each question cost about 4 s and 360 to 387 prompt tokens over the ten messages after the first question shared the state prefix, so a step that asks one question per message per turn is linear in messages per turn and must be bounded by when it asks, which messages it asks about, and reuse of recorded answers.

The pair probes (`tmp/probes/pairs.jsonl`, 24 rows; `tmp/probes/pairs2.jsonl`, 20 rows; both 2026-10-07, same host and readout) asked the framework's own templates, worded without reference to the content, over two state shapes: W, the whole transcript with each message indexed, and P, the two messages of the pair alone, rendered as `[1]` and `[2]`.

| Template | State | Rows with an expected answer | As expected | Reading |
| --- | --- | --- | --- | --- |
| superseded, "withdraws or replaces something that [A] states" | W | 4 | 3 | the true case at 0.994; the miss is the [2]/[8] pair, which is arguable, at 0.528 |
| superseded, same | P | 4 | 3 | the true case at 0.987; the same arguable pair at 0.677 |
| accepted, "accepts the proposal in [A]" | W | 3 | 2 | the true case at 0.889; [2]/[5] misread at 0.705; [4]/[5] at chance |
| accepted, same | P | 3 | 3 | the true case at 0.855; the false cases at 0.668 and 0.874 |
| needed, "cannot be carried out correctly without" | W and P | 4 each | 2 each | the standing no-internet rule read as not needed at 0.896 and 0.915: the necessity criterion is read literally |
| needed, "states something the work in [B] must respect" | W | 3 | 3 | the no-internet rule at 0.803, the printer at 0.984, the archived-accounts rule at 0.854 |
| needed, same | P | 3 | 2 | the no-internet rule at 0.965; the archived-accounts rule misread as a rule for the search box at 0.804, because the pair hides what the rule answered |
| needed, "states a rule, a decision, or a fact that [B] must respect" | W, P | 3 each | 3, 2 | as the preceding row, with lower confidence on the true case in W (0.650) |

Rows whose expected answer is arguable (whether the SQLite acceptance or the format change is needed for a search box) are left out of the counts; every one of them read as not needed. Four readings decide the stock selection's shape:

- The `needed` template ships with the "must respect" criteria. The necessity wording fails on a standing constraint, which is the message a selection must keep.
- A relation question (`superseded`, `accepted`) renders the pair alone. It read the same or better than the whole transcript, at about half the prompt tokens (166 to 212 against 358 to 380) and about 2.3 s against 4 s per question on this host.
- A `needed` question renders the conversation view with every message indexed, naming the subject and the request by index. The pair alone hides what an earlier rule answered, and the whole view read 3 of 3 against 2 of 3. The view is one shared prefix across every `needed` question of a selection, which the daemon caches after the first question.
- A low-confidence answer is left to the application's threshold, which leaves the condition absent and the message kept: the arguable [2]/[8] pair sat at 0.528 and 0.677.

These are the thinnest readings in the record, 44 rows over one fictional transcript. The probe that widens them is the same harness over a second transcript with a clarifying message appended after a `needed` answer, to show whether a judgment recorded against an earlier view still reads true.

The desk's state across turns, read from the source and the Grok map: the server holds the daemon origin only (`app/server/Desk.ts:47`); a second `POST /turn` recomputes every decision, the policy, the brief, and the reply; the page keeps the board and the calibration in refs (`app/vue/App.vue:78-84`); the judge path is a bare `fetch` (`app/server/Desk.ts:322`) because the ollama wire contract has no logprob field and every provider call streams (`guides/ollama.md:76`, `guides/ollama.md:114`). Forty desk declarations are the decision client in all but name (`tmp/units/refine-evidence.md` § Grok desk distillate, from `tmp/cursor/desk-answer.md` § Ownership).

## The judge

The contract, in `types.ts` form. Probabilities are the only stored number; every measure derives from them.

```ts
// @orkestrel/agent, src/core/types.ts (root)
import type { TokenUsage } from '@orkestrel/budget'

export type JudgeForm = 'choice' | 'score' | 'noul'

/** Carries one choice option or one score level, keyed by a caller id the model never reads. */
export interface Candidate {
	readonly id: string
	readonly text: string
	readonly description?: string
}

export interface ChoiceQuestion {
	readonly form: 'choice'
	readonly id: string
	readonly text: string
	readonly candidates: readonly Candidate[]
}

/** Carries ordered levels; the expectation indexes them from 0. */
export interface ScoreQuestion {
	readonly form: 'score'
	readonly id: string
	readonly text: string
	readonly levels: readonly Candidate[]
}

/** Carries the criterion that makes the answer yes and the criterion that makes it no. */
export interface NoulQuestion {
	readonly form: 'noul'
	readonly id: string
	readonly text: string
	readonly yes: string
	readonly no: string
}

export type JudgeQuestion = ChoiceQuestion | ScoreQuestion | NoulQuestion

/** Carries one state and the questions asked about it; each question is evaluated on its own. */
export interface JudgeRequest {
	readonly state: string
	readonly questions: readonly JudgeQuestion[]
}

/** Carries one candidate's probability; a noul answer carries the ids `no` and `yes`. */
export interface Weight {
	readonly id: string
	readonly probability: number
}

export interface Answer {
	readonly outcome: 'answer'
	readonly id: string
	readonly probabilities: readonly Weight[]
}

/** Reports a question the wire could not read a candidate label for; it invents no probability. */
export interface Refusal {
	readonly outcome: 'refusal'
	readonly id: string
	readonly missing: readonly string[]
}

export type JudgeAnswer = Answer | Refusal

export interface JudgeResult {
	readonly model: string
	readonly answers: readonly JudgeAnswer[]
	readonly usage?: TokenUsage
}

/** Carries the measures `computeReading` derives from an answer. */
export interface Reading {
	readonly winner: string
	readonly probability: number
	readonly confidence: number
	readonly expectation?: number
}

/** Answers typed questions about one state with probabilities; the sibling of `ProviderInterface`, never a provider. */
export interface JudgeInterface {
	readonly id: string
	readonly name: string
	/** Holds the model identity every result reports; a judgment is reused only against the same value. */
	readonly model: string
	ask(request: JudgeRequest, signal: AbortSignal): Promise<JudgeResult>
}

// src/core/helpers.ts     computeReading(question: JudgeQuestion, answer: Answer): Reading
// src/core/validators.ts  isJudgeQuestion, isJudgeAnswer (a refusal carrying probabilities is rejected)
```

The engine, in the providers module, mirrors `AgentProvider` member for member: the options carry `timeout`, `fetch`, and `headers`; the signal is positional and folded with the deadline; a non-OK status or an unreadable body throws `JudgeError` with code `HTTP` or `PROTOCOL`; a request that cannot be answered on this wire (a duplicate question id, a duplicate candidate id, a choice with more candidates than the wire's top list can carry) throws `JudgeError` with code `QUESTION` before any inference; a missing label is a `Refusal` value, never a throw. The subclass supplies `body(request, question)` and `read(value)`, as `OllamaProvider` supplies `body` and `read` today (`guides/ollama.md:104`).

```ts
// @orkestrel/agent, src/core/providers/types.ts
export interface AgentJudgeOptions extends ProviderOptions {}
export interface AgentJudgeInterface extends JudgeInterface {
	body(request: JudgeRequest, question: JudgeQuestion): Readonly<Record<string, unknown>>
	read(value: unknown, question: JudgeQuestion): JudgeAnswer
}
export interface JudgeError extends Error { readonly code: 'HTTP' | 'PROTOCOL' | 'QUESTION'; readonly status?: number }

// @orkestrel/ollama, src/core/types.ts
export interface OllamaJudgeOptions extends AgentJudgeOptions {
	readonly model: string
	/** Holds the system prompt the model was trained with. */
	readonly system: string
	/** Mirrors the model's calibration temperature; divides each candidate logprob before the softmax. */
	readonly temperature: number
	readonly url?: string
	readonly keepAlive?: string
	readonly options?: Readonly<Record<string, unknown>>
}
export interface Logprob { readonly token: string; readonly logprob: number }
/** Carries what one readout sent and read back, for a page that shows the top list. */
export interface Readout {
	readonly id: string
	readonly prompt: string
	readonly labels: readonly string[]
	readonly top: readonly Logprob[]
	readonly elapsed: number
	readonly usage?: TokenUsage
}
export interface OllamaJudgeResult extends JudgeResult { readonly readouts: readonly Readout[] }
/** Transliterates the non-streaming `POST /api/chat` logprob body; a second request shape on the same daemon. */
export interface WireJudgeRequest {
	readonly model: string
	readonly messages: readonly { readonly role: 'system' | 'user'; readonly content: string }[]
	readonly stream: false
	readonly think: false
	readonly logprobs: true
	readonly top_logprobs: number
	readonly keep_alive: string
	readonly options: Readonly<Record<string, unknown>>
}
// createOllamaJudge(options: OllamaJudgeOptions): OllamaJudgeInterface
```

Rulings on the judge:

- **Placement by the carve graph.** The providers module and the conversations module import only the root; the contexts module imports only the root and the conversations module (`context.md` § The plan, the layout table). The judge values are used by the conversations module (the record), the contexts module (the selection), and the providers module (the engine), which is the root's admission rule (`.claude/rules/architecture.md:222`). The engine imports only the root and `@orkestrel/timeout`, as the providers module already does. The contexts module gains no dependency on the providers module.
- **Several questions over one state.** On Ollama, `ask` issues one `/api/chat` call per question in question order and awaits each one; the daemon has no shared prefill (`mica.md`, the Ollama section), and the desk measured that starting the calls together did not shorten the wait (`app/server/Desk.ts:118-119`). On a System One server one POST carries every question and the server prefills the state once. One face serves both because the result is per call: `usage` belongs to the HTTP call and is never copied onto the answers of a batch. A caller that wants each answer as it lands issues one request per question, which costs the same on Ollama; no streaming face and no polling loop is built.
- **Readout fixed by the wire, calibration supplied by the application.** `OllamaJudge` fixes `num_predict: 1`, `temperature: 1`, and `top_logprobs: 20` (the API maximum, `mica.md`), sends `system` as the model's trained prompt, divides the candidate logprobs by the calibration `temperature`, runs the softmax over the candidates alone, refuses when a label is outside the top list, and reads usage through the package's own `extractUsage`, which reports usage only on a record whose `done` is true (`guides/ollama.md:118`); the non-streaming body's `done` field is an assumption to settle with one recorded body before the unit is accepted. The user-turn shape and the label codebook (`No`/`Yes`, `A` through `Z`, then `a` through `z`, then `AA` onward) are Mica's (`mica.md`); a render seam waits for a second model.
- **Measures derived, one scale.** `computeReading` gives the first strictly greatest candidate as `winner`, its `probability`, the published choice confidence `(p_max - 1/n) / (1 - 1/n)`, the published score confidence `max(0, 1 - spread / MAD_uniform)` with `expectation = sum(i * p_i)`, and for a noul `|2p_yes - 1|`, the number the Confidence page gives on the same scale (`system-one.md`). One term, `confidence`, for every form; the desk's `certainty` goes.
- **Identity is the model id.** `OllamaJudge` reports `model` as the Ollama model id, and that string is what reuse matches. The `system` prompt and the calibration `temperature` are the model's published calibration (the Mica card ships both with the weights, `mica.md`), so a changed calibration is a changed model id, not a changed option; an application that varies them under one id defeats its own reuse, and the guide says so.
- **The System One wire is deferred.** No consumer on this host runs against Jev or Mica's server (`mica.md`, the runtime section). When one does, the wire is a vendor package shaped like `@orkestrel/ollama`, subclassing `AgentJudge` with `body` and `read`, built with that consumer. Its decoder returns probabilities only and ignores the server's `confidence` and integer `score`, as `mica.md` requires.

## The judgments

The conversations module records answers beside the messages. Measures are not stored.

```ts
// @orkestrel/agent, src/core/conversations/types.ts
export interface Judgment {
	readonly question: JudgeQuestion
	readonly answer: JudgeAnswer
	/** Holds the model id that answered, as the judge reported it. */
	readonly model: string
	/** Lists the ids of the messages the state was rendered from, in order. */
	readonly sources: readonly string[]
	/** Holds the epoch milliseconds the manager stamped on `add`. */
	readonly time: number
	/** Holds the call's usage when the call carried this question alone. */
	readonly usage?: TokenUsage
}
export interface JudgmentInput {
	readonly question: JudgeQuestion
	readonly answer: JudgeAnswer
	readonly model: string
	readonly sources: readonly string[]
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
}
// ConversationInterface gains   readonly judgments: JudgmentManagerInterface
// ConversationSnapshot gains    readonly judgments?: readonly Judgment[]   (absent in an older snapshot)
// helpers.ts   buildJudgments(request: JudgeRequest, result: JudgeResult, sources: readonly string[]): readonly JudgmentInput[]
//              matchesJudgment(judgment: Judgment, question: JudgeQuestion, sources: readonly string[], model: string): boolean
// validators.ts  isJudgment; isConversationSnapshot accepts an absent `judgments`
```

Rulings on the judgments:

- **Keyed by the caller's id, last write wins**, as `ConversationManagerInterface.add` already overwrites (`src/core/types.ts:2103-2106`); a question id is a caller key on System One too (`system-one.md`).
- **Reuse is an identity match**, not a timestamp: the same form, text, criteria or candidates, the same source ids in the same order, and the same model. A changed threshold re-evaluates a recorded distribution with no model call; a changed criterion text, a removed or compacted-away source, or a different model re-asks.
- **Usage sits on the judgment only when its call carried that question alone.** A batch call's usage stays on the `JudgeResult` the caller charged.
- **The snapshot carries the judgments**; both stores round-trip them; an older snapshot without the field still validates. Message-level records over `@orkestrel/database` stay gated on a consumer that queries across conversations, as the context ruling stages them.
- **No revision record in this round.** An application that knows a message replaced another removes the old message and adds the replacement; the removed source fails the identity match and its dependents are re-asked. A typed revision record waits for a consumer that must keep the replaced text.

## The selection seam

```ts
// @orkestrel/agent, src/core/contexts/types.ts
/** Carries the conversation part of the next prompt and the receipt for it. */
export interface Selection {
	/** Lists the messages `build` folds in place of `view()`, in prompt order. */
	readonly messages: readonly Message[]
	/** Lists the keys of the judgments the selection rests on, reused or recorded. */
	readonly judgments: readonly string[]
	/** Holds the judge usage this selection spent. */
	readonly usage?: TokenUsage
}
export type SelectionHandler = (conversation: ConversationInterface, signal: AbortSignal) => Promise<Selection>

// AgentContextOptions gains    readonly select?: SelectionHandler
// AgentContextInterface gains  select(signal: AbortSignal): Promise<Selection>
//                              build(selection?: Selection): readonly Message[]
// AgentOptions gains           readonly select?: SelectionHandler   (forwarded to the context as `conversations` is)
// AgentEventMap gains          readonly select: readonly [selection: Selection]
```

The loop's two call sites after the change, against today's lines:

```ts
// run entry, replacing `this.#context.build(this.#provider.format)` at src/core/Agent.ts:362
const selection = this.#selecting ? await this.#select(abort, budget) : undefined
const messages: Message[] = [...this.#context.build(selection)]

// after a compaction folds a section, replacing the rebuild at src/core/Agent.ts:665
const reselection = this.#selecting ? await this.#select(abort, budget) : undefined
messages.splice(0, messages.length, ...this.#context.build(reselection))
```

Rulings on the seam:

- **The default path is today's loop.** With no handler, `#selecting` is false, no `await` precedes the first provider request, and `build()` folds `active.view()` at the one read it folds today (`src/core/AgentContext.ts:237`). The loop's existing comment pins that property for the compaction gate (`src/core/Agent.ts:384-390`); the same tests are the control.
- **`build` stays synchronous; `select` awaits.** The asynchronous step is the handler's, and only its result enters the synchronous assembly. An asynchronous `build` would put an `await` on the default path and change the eager-pump and abort timing the loop pins.
- **Failure mirrors compaction.** A handler throw emits `fault` and the loop builds from `view()`; with `strict` set, the run settles `error`. An abort during `select` settles the partial path with no provider call, inside the run's cancellation boundary, so a cancel during selection and a cancel during generation share one outcome.
- **The receipt is the `Selection`.** It records what entered, the judgment keys that justify it, and the cost. The agent emits it on `select`; the context stays event-free (`src/core/AgentContext.ts:87-88`). What was omitted derives from `view()` minus `messages`; no second list is stored.
- **Bounds after the change.** The run's cost budget charges the judge usage of every selection plus the provider usage; `AgentResult.usage` folds both; no `usage` chunk is emitted for a selection, so that chunk keeps its one-provider-call meaning. The `window` budget measures the selected message array; tool definitions and the schema stay unmeasured, the clause 24 gap the context ruling records.

## The stock selection

```ts
// @orkestrel/agent, src/core/contexts/types.ts
/** Returns the ids of the messages the selection may ask about: the application's cheap pass. */
export type ScreenHandler = (conversation: ConversationInterface, request: Message) => readonly string[]
export type SelectionCondition = 'needed' | 'superseded' | 'accepted'
/** Carries the application's criteria text and cutoff for one condition; no default exists. */
export interface Criterion {
	readonly yes: string
	readonly no: string
	readonly threshold: number
}
/** Carries the conditions derived for one message; an absent condition was not asked or not answered. */
export interface Applicability {
	readonly id: string
	readonly needed?: boolean
	readonly superseded?: boolean
	readonly accepted?: boolean
}
export interface SelectionOptions {
	readonly judge: JudgeInterface
	readonly screen: ScreenHandler
	readonly needed: Criterion
	readonly superseded?: Criterion
	readonly accepted?: Criterion
	/** Caps the fresh questions one selection asks; the rest are left unasked and their messages kept. */
	readonly limit: number
	/** Overrides the inclusion rule `needed !== false`. */
	readonly include?: (applicability: Applicability) => boolean
}
// factories.ts   createSelection(options: SelectionOptions): SelectionHandler
// helpers.ts     resolveJudgments(conversation, judge, request, sources, signal): Promise<readonly Judgment[]>
//                inferApplicability(conversation, request, options): readonly Applicability[]
//                buildConditionKey(condition, subject, object): string
// templates.ts   NEEDED_QUESTION, SUPERSEDED_QUESTION, ACCEPTED_QUESTION
```

What `createSelection` does on each call:

1. Takes the request, the last `user` message in `view()`, and calls `screen` for the subjects.
2. Builds one `noul` per configured condition over a pair, `needed(subject, request)`, `superseded(earlier, later)` over ordered subject pairs, and `accepted(earlier, later)` over ordered subject pairs, with `sources` holding the pair's ids and the key built from the condition and the pair. A relation question renders the pair alone as `[1]` and `[2]`; a `needed` question renders the conversation view with every message indexed and names the subject and the request by index (§ Measurements). A judgment is a fact about its pair: the surrounding view helps the model read the pair and is not part of the judgment's identity, so an appended message changes applicability through the pairs it joins, not by re-asking old ones.
3. Reuses every recorded judgment that matches, asks the judge for the rest up to `limit`, and records the fresh answers through `resolveJudgments`, the same helper the desk calls.
4. Derives applicability with the application's thresholds and includes a subject unless `needed` is false, or unless the application's `include` says otherwise. A subject that is included and superseded brings the superseding message with it. A subject nothing was asked about, or whose question was refused or left unasked by the limit, is kept: absence of evidence is not irrelevance.
5. Never drops the request message, and never splits an assistant-call and tool-result group, which the `correlate` unit's call id makes recognizable.

When questions are asked follows from the keys, with no timer: an appended request re-keys `needed`; an appended message adds only the pairs it joins; a removed or compacted-away source re-asks its dependents; a compaction or a rehydration triggers the loop's post-compaction `select`. Every condition is a binary question because the graded form was the weak one in the probe. The three templates are the measured wordings: `NEEDED_QUESTION` asks whether message A is needed to carry out the request in message B correctly, with the criteria "A can be left out and the request in B is still done correctly" and "A states something the work in B must respect"; `SUPERSEDED_QUESTION` asks whether B withdraws or replaces something that A states; `ACCEPTED_QUESTION` asks whether B accepts the proposal in A.

The mixed-message case the objective lane raised: the probe's message [3] accepts SQLite and states the header-row rule, and message [8] withdraws the header-row rule. A whole-message supersession answered yes at 0.992, so an inclusion rule that drops a superseded message would drop the SQLite acceptance with it. The ruling dissolves the hazard without span-level provenance: `needed` decides inclusion, `superseded` adds the superseder beside a kept message, and the model reads both. Span-addressed judgments wait for a consumer that must select rules rather than messages; the probe that would show the need is the same transcript with a selection that must drop the header-row rule while keeping the SQLite acceptance.

## The desk after the change

What the desk deletes, because the judge, `OllamaJudge`, and `computeReading` own it: in `app/core/helpers.ts`, `computeProbabilities` (`:45-68`), `computeConfidence` (`:77-81`), `computeScore` (`:93-125`), `weighLabels` (`:137-157`), `renderState`, `renderNoul`, `renderChoice`, and `renderScore` (`:166-208`), `pairLines` (`:407-423`), and `selectWinner` (`:431-439`), plus the pre-rendered question builders (`:254-320`); in `app/core/types.ts`, `DecisionForm`, `Relationship`, `LabelWeight`, the `Weigh*` types, `ScoreReading`, the prompt types, `JudgeQuestion`, and `AnswerLine`; in `app/server/parsers.ts`, `parseWireUsage`, `parseTop`, and `parseChat`; in `app/server/Desk.ts`, `#judge` (`:233-292`), `#judgeCall` (`:299-308`), and `#readJudge` (`:317-367`); in `app/server/constants.ts`, `TOP_LOGPROBS`, `JUDGE_SAMPLING`, and `PREDICT_JUDGE`, which the readout fixes.

What the desk keeps: `MICA_TEMPERATURE`, `JUDGE_PROMPT`, and `DECISION_MODEL` (`app/core/constants.ts:4-15`), which become the `temperature`, `system`, and `model` options; `NUM_CTX` and `KEEP_ALIVE`; the `EXAMPLES` fixtures reshaped to `JudgeQuestion` with `Candidate` ids where they carry labels and names today; `renderCustomer`; the thresholds and policy (`app/core/policies.ts:587-607`, `:630-644`), whose readers consume a `Judgment` and its `Reading`; `taskFor`, `renderAgent`, and `buildSummary`; `#speak` and the page; the desk's `Decision`, slimmed to a display projection of a `Judgment`, its `Reading`, and an optional `Readout`, which `parseDecision` guards. `#restore` either goes or becomes a `generate` with `num_predict` 1 through `createOllama`; whether the desk warms the model is its own deployment choice.

How a second turn on the same ticket reuses judgments: the `Desk` holds a `ConversationManager` over `createMemoryConversationStore`; the ticket id is the application's (the fixture id suffices for the demo); `publish` opens the ticket or adds it, appends the posted text as a user message only when it differs from the last, calls `resolveJudgments` with the fixture questions over the state rendered from the ticket's customer messages, awaits `save`, then runs the policy from the judgments. The reply agent is created once per ticket with `conversations` set to the ticket manager and `select` set to `createSelection({ judge, screen, needed, limit })`, where the screen names the earlier customer messages and replies; on a follow-up the selection asks `needed(earlier, request)` for each and the provider request folds the kept ones; the `select` event's receipt renders on the page beside the fixture decisions. A repeat run with the same text issues no judge call; an edited text asks only the questions whose sources changed; a reused judgment arrives without a `Readout`, so its card shows the recorded time instead of a top list. Process-lifetime reuse is the claim; restart durability is not, until a durable store is chosen through the existing store seam.

The `recall` tool the context ruling stages in toolbox installs on the desk's guided agent in the same unit as the desk change, over the ticket's conversation only.

## Alternatives ruled on

| Alternative | Ruling | Reason |
| --- | --- | --- |
| The judge inside `@orkestrel/ollama` alone | Refuse | The context and the record consume the contract, and the agent cannot import ollama; the dependency runs one way (`guides/ollama.md:12`). |
| A separate vendor package per wire | Adopt per vendor, refuse per capability | A System One server is another vendor's protocol and gets its own package with its first consumer. The logprob readout is the same daemon, the same `/api/chat` path, and the same `url` and `keepAlive` vocabulary as `OllamaOptions`; a package for it would split the Ollama wire in two. |
| An HTTP engine with an `encode`/`decode` transport object instead of a subclass | Refuse | The providers module already shapes a wire as a subclass supplying `body` and `read` over `AgentProvider`; a second shape for the sibling engine would be two patterns for one thing. |
| An `AsyncIterable` of calls instead of a promise | Refuse | On Ollama a caller that wants progressive arrival issues one request per question at the same cost; on a System One server the batch arrives at once. The iterator adds early-close and cleanup rules and buys no arrival either wire does not already give. |
| A context-level `decide` and a context emitter | Refuse | The context is event-free by design (`src/core/AgentContext.ts:87-88`); the agent emits `select`. The reuse-or-ask-and-record step is one helper, `resolveJudgments`, the stock selection and the desk both call. |
| A uniformly asynchronous `build` | Refuse | It puts an `await` on the default path and changes the abort and eager-pump timing the loop pins (`src/core/Agent.ts:384-390`). |
| Selection as a `Conversation` method | Refuse | `view()` is the synchronous read compaction, `reference`, and `search` rely on; the selection needs the request, the screen, and the judge at assembly time, where `build()` already meets the system block and the workspace. |
| Judgments as a workspace document | Refuse | `build()` renders workspace text into the system prompt, so judgments would reach the model as text; a document has no typed lookup by key and persists per workspace, not per conversation. |
| Relevance by substring search alone | Refuse as the selector; keep as a screen | `search` matches substrings (`src/core/conversations/Conversation.ts:258-267`) and cannot tell a withdrawn rule from one in force; it is the cheap pass a `ScreenHandler` can use, and the `recall` tool keeps it. |
| Span-addressed judgments and typed revision records | Defer | Real for a consumer that selects rules rather than messages; this round's consumers select messages, and the preceding inclusion rule keeps a mixed message. |
| The proposal's message-agnostic assertion layer | Refuse | No consumer imports it; judgments keyed to source ids are the assertions with provenance, built where the record lives (`context.md` § The living context, staged by consumer). |
| A `Decision*` name family in the agent | Refuse | `@orkestrel/program` owns `Decision` for an authority outcome (`guides/program.md:130`); a second family on the same word would be two concepts on one term. `Judge` and `Judgment` are free fleet-wide and are the desk's own words. |

## Vocabulary

Every proposed public name was checked against the collision record (`host.json` `surface`, 128 rows) and the `## Surface` rows under `guides/`, by exact name. `free` means no package exports the name; `qualified` means the bare word is owned elsewhere and the name carries a domain word.

| Name | Kind | Home | Mark |
| --- | --- | --- | --- |
| `JudgeInterface`, `JudgeForm`, `JudgeQuestion`, `JudgeRequest`, `JudgeResult`, `JudgeAnswer`, `ChoiceQuestion`, `ScoreQuestion`, `NoulQuestion` | types | agent root | free |
| `Candidate`, `Weight`, `Answer`, `Refusal`, `Reading` | interfaces | agent root | free; `AnswerError` (terminal), `AnswerHandler` (router), and `AnswerToolOptions` (toolbox) are nearby and distinct |
| `computeReading`, `isJudgeQuestion`, `isJudgeAnswer` | functions | agent root | free |
| `AgentJudge`, `AgentJudgeInterface`, `AgentJudgeOptions`, `JudgeError`, `isJudgeError` | class, types, functions | agent providers module | free |
| `Judgment`, `JudgmentInput`, `JudgmentManagerInterface`, `JudgmentManager`, `buildJudgments`, `matchesJudgment`, `isJudgment` | types, class, functions | agent conversations module | free |
| `Selection`, `SelectionHandler`, `SelectionOptions`, `createSelection`, `Criterion`, `ScreenHandler`, `Applicability`, `resolveJudgments`, `inferApplicability`, `buildConditionKey`, `NEEDED_QUESTION`, `SUPERSEDED_QUESTION`, `ACCEPTED_QUESTION` | types, functions, constants | agent contexts module | free; `table` owns `SelectionManagerInterface`, a different name |
| `SelectionCondition` | type | agent contexts module | qualified; `database` owns `Condition` |
| `select`, `judgments` | members | agent | members, not bare names |
| `OllamaJudge`, `OllamaJudgeInterface`, `OllamaJudgeOptions`, `OllamaJudgeResult`, `createOllamaJudge`, `Readout`, `Logprob`, `WireJudgeRequest`, `renderJudgePrompt`, `extractTop`, `computeAnswer`, `TOP_LOGPROBS`, `JUDGE_LABELS` | class, types, functions, constants | ollama | free; the wire body keeps the external `top_logprobs` and `keep_alive` names, as `.claude/rules/names.md` requires |

`execute` is not used: the fixed lifecycle vocabulary gives it the meaning "run primary work to completion" (`.claude/rules/names.md:232`); the judge's verb is `ask`.

## The plan

These units follow the context ruling's units and the agent 0.0.27 release. Each checkout has one writer at a time; checkouts run in parallel. The Codex bench is live this session, so constraint-heavy mechanics route to `astra` and shape-sensitive units to `opus`, each reviewed by an engine that did not write it.

| Order | Unit | Package | Role, engine, review | Owns | Accepts when |
| --- | --- | --- | --- | --- | --- |
| 1 | `judge` | agent | `opus`; `analyst` (Astra) | the judge block in the root `types.ts`, `computeReading`, the guards, `AgentJudge` and `JudgeError` in the providers module, tests, Surface rows | the block typechecks; `computeReading` reproduces the desk's pinned cases (`tests/app/core/helpers.test.ts:41-55`) plus the noul scale and a first-wins tie; a guard round trip rejects a refusal with probabilities; `AgentJudge` is proven on a recording transport for the HTTP, PROTOCOL, and QUESTION failures and the deadline fold; `test:guides` passes |
| 2 | `judgments` | agent | `astra`; `reviewer` (Opus) | the conversations module's types, `JudgmentManager.ts`, `Conversation.ts`, helpers, validators, both stores, tests | last write wins per key; `matchesJudgment` is false on a changed source, text, criterion, or model; `buildJudgments` attaches usage only to a one-question request; a snapshot with judgments round-trips through both stores and one without still validates |
| 3 | `seam` | agent | `opus`; `analyst` (Astra) | `Selection`, `SelectionHandler`, `AgentContext.ts`, the agents module's types, `Agent.ts`, tests | every existing `Agent.test.ts` case passes unchanged with no `select`, the synchronous-abort timing cases included; with a handler the provider receives `build(selection)`; `select` fires at entry and after a compaction; a handler throw emits `fault` and falls back, and with `strict` settles `error`; an abort during `select` commits a partial with no provider call; selection usage reaches the budget and the result |
| 4 | `selection` | agent | `astra`; `reviewer` (Opus) | `createSelection`, `resolveJudgments`, `inferApplicability`, `buildConditionKey`, `contexts/templates.ts`, tests over a scripted judge stub and the probe transcript | no default threshold exists in the types; a second call asks nothing; an appended message asks only the pairs it joins; a removed source re-asks its dependents; the limit leaves the unasked kept; the request message and a tool group are never dropped; the probe's expected applicability holds under thresholds the test supplies |
| 5 | `guide` | agent | `opus` | the `guides/agent.md` sections for the judge, the judgments, the seam, and the stock selection, with executed fences | `test:guides` passes and every behavior sentence has an executed assertion |
| 6 | release 0.0.28 | agent | `verifier`, then the Orchestrator | the manifest version | tree-wide gates green; `test:distribution -- --mode release` passes |
| 7 | `ollama-judge` | ollama | `astra`; `reviewer` (Opus) | the `OllamaJudge` surface, hermetic tests on a recording transport, one `service` case, `guides/ollama.md` | the recorded body equals the desk's judge body field for field; a top list lacking a label yields a `Refusal` naming the candidate; the candidate-only softmax reproduces `tests/app/core/helpers.test.ts:28-38` and `:64-80`; usage reads through `extractUsage` against one recorded non-streaming body; the live delete-database calibration matches the desk's pinned reference within a tolerance the unit states from its own run |
| 8 | release, and `recall` | ollama, toolbox | `verifier`; `builder` (Sol) | the ollama manifest; the toolbox `recall` tool and the agent pin | gates green; the tool drives the real conversation manager through a real tool manager |
| 9 | `desk-judge` | desk | `astra`; `reviewer` (Opus) | the deletions and rewrites under § The desk after the change, the memory store, the ticket agent with `select`, the recall tool install, tests | the desk tests pass with the bench references unchanged; a repeated `POST /turn` with the same fixture and text issues no judge call on a recording daemon origin; an edited text asks only the changed sources' questions; a follow-up on the same ticket sends the provider a request that folds only the messages the selection kept, and the page shows the receipt; `tests/app/vue/integration.test.ts` passes unchanged |
| 10 | `mirrors` | scaffold | `builder` (Sol) | `guides/agent.md`, `guides/ollama.md`, `guides/toolbox.md` | byte-identical to the published guides |

One falsification round runs on the integrated agent result after unit 4 and one before each release, per `.agents/orchestration.md` § Size gate.

## Where the lanes disagreed

| Question | Subjective lane (Opus) | Objective lane (Astra) | Ruling, and who was right |
| --- | --- | --- | --- |
| Where the contract lives | agent root | values at the root, the client in the providers module, the contexts module importing it | Both halves: values and the interface at the root by the two-module rule; the engine in the providers module beside `AgentProvider`; the carve graph unchanged |
| Call shape | `ask(): Promise<JudgeResult>` | `execute(): AsyncIterable<DecisionCall>` | Opus: the iterator buys no arrival either wire lacks, and `execute` is fixed vocabulary |
| Wire seam | a subclass per wire | an `encode`/`decode` transport object | Opus: the providers module already shapes a wire as a subclass |
| Measures | derived by `computeReading` | stored on each result | Opus, by the derive-state law; Astra right that a refusal with probabilities must be rejected by the guard |
| `build` | synchronous, `select` awaited | uniformly asynchronous with a receipt | Opus on the default path; Astra right that the entry `await` must sit inside the run's cancellation boundary |
| Observation | the agent emits `select` | the context gains an emitter with `decision` and `select` | Opus: the context stays event-free |
| Provenance | message ids | message ids plus spans, plus typed revisions | Astra right on the mixed-message hazard; dissolved by the inclusion rule, spans and revisions deferred to a consumer |
| Uncertainty | exclude unless accepted | retain what was not resolved | Astra: an unasked, refused, or limit-cut question keeps its message |
| Work bound | none | `limit` and `timeout` | Astra: `limit` as an application figure; the run deadline already bounds time |
| Correlation and the request | not stated | keep tool groups whole, never drop the request | Astra |
| Budget | the caller charges `usage` | the client charges a borrowed budget | Opus: mirrors how the loop charges a provider |
| System One wire | a later package | inside the agent | Opus: a vendor wire is a vendor package, built with its consumer |
| Names | `Judge`, `Judgment` | `Decision*` qualified family | Opus: `program` owns `Decision`; both lanes found the collision |
| Concurrent mutation during `select` | not stated | reject a changed snapshot | Deferred: the loop is the conversation's one writer during a run; recorded as a risk with its probe |

## Falsification

The falsification round over the numbered claims in `tmp/units/refine-claims.md` runs after this draft; its rulings are folded into this section when it closes.

## Risks

| Risk | Cheapest probe |
| --- | --- |
| A `needed` judgment recorded against an earlier view reads differently after a clarifying message | the pair harness over a second transcript with a clarifying message appended after a `needed` answer |
| The templates read differently on a model other than Mica v0.1 4B | the pair harness against that model's Ollama tag, before its `OllamaJudgeOptions` are pinned |
| An adversarial note in a message flips a supersession and drops a rule | the desk's injection fixture placed as one message of a pair |
| A screen of k messages asks a quadratic number of pair questions at about 4 s each | time `createSelection` over the probe transcript with a full screen and a `limit` |
| A pair longer than Mica's 8,192-token contract | one over-length pair; the Ollama daemon's own behavior at the limit is measured, not inferred from the official server's HTTP 400 |
| An `await` slips into the default path | the existing timing cases in `tests/src/core/Agent.test.ts` |
| The non-streaming `/api/chat` body lacks `done`, so `extractUsage` drops usage | one recorded `stream: false` body from the daemon |
| Reuse crosses a changed question, source, or model | change each identity field alone and assert reuse only on full equality |
| A selection runs while another writer appends to the conversation | hold a scripted judge response, append, release, and assert what reached the provider |
| Restart loses the judgments | restart the desk after a saved memory-store turn and keep the expected absence explicit |

## Files to read with this record

- `tmp/units/refine-evidence.md`, the evidence the lanes read, kept until the campaign sweep; its content is summarized under § Measurements.
- `tmp/probes/mica.ts` and `tmp/probes/pairs.ts`, the probes, with their journals and result files, deleted at the sweep; the readings survive in § Measurements.
- `tmp/units/refine-subjective.md` and `tmp/codex/refine-answer.md`, the lane answers, deleted at the sweep; the reconciliation survives in § Where the lanes disagreed.
- [The context ruling](context.md), whose units precede this plan, and the 2026-10-05 records this plan keeps to: [provider.md](provider.md), [agent.md](agent.md), [system-one.md](system-one.md), [mica.md](mica.md), [desk.md](desk.md), and [packages.md](packages.md).
