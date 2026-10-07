# The judge and the selection seam: two refinements inside the agent

Recommendation record for `@orkestrel/agent`, written 2026-10-07 after the user accepted [the context ruling](context.md) and asked for a refined recommendation that works two refinements into the agent and its related packages: the living context, as a feature of the agent's own context rather than a package or a consumer of the agent, and the System One decision model the desk experiments with. The user's constraint on the first: neither a toggle nor machinery the default path never reaches. The record is written against the agent checkout at commit `65c706a`, the desk checkout at its default branch head, and the scaffold checkout on the recommendation branch, and it was amended on 2026-10-07 by the falsification round under § Falsification.

Two kinds of sentence appear, as in the other records in this folder: a measured fact names the file, line, command, or run it came from; a design conclusion is a ruling for this codebase. Paths under `src/`, `tests/`, and `guides/` of the agent resolve against the agent checkout; paths under `app/` and `tests/app/` resolve against the desk checkout; every other path resolves against the scaffold checkout. Line numbers are those of the checkouts named in the first paragraph; the `carve` unit of the context ruling moves the agent files, so a later reader resolves a symbol by name.

## Ruling

Add one decision contract to the agent, called the judge, and one selection seam to the agent's context, and build both with the consumers that exist on 2026-10-07: the desk for the judge, the agent loop and the desk for the seam. Nothing becomes a package in this round. Nothing is a boolean on `AgentOptions`.

- **The judge.** `JudgeInterface.ask(request, signal)` answers typed questions about one state with probabilities over the caller's candidates, or refuses a question whose label the model could not read. The value types and the interface live at the agent root, beside `Message`; the HTTP engine `AgentJudge`, the `Reading` type, and `computeReading` live in the providers module as the siblings of `AgentProvider`; the first wire, `OllamaJudge`, lives in `@orkestrel/ollama` and reads the daemon's first-token logprobs the way the desk does on 2026-10-07. The published measures are derived from the probabilities by one helper, never stored. A System One HTTP wire is a later vendor package built with its first consumer.
- **Judgments on the record.** A `Conversation` records each outcome as a `Judgment` with its provenance (the question, the outcome, the judge identity, the source message ids, the state the model read, the time, the usage) under its `judgments` manager, keyed by the caller's question id, persisted in the snapshot. A later turn reuses a judgment whose question, sources, state, and judge identity match, and asks the model only for the rest, through one manager method both the loop and the desk call.
- **The selection seam.** `AgentContextInterface.select(request, signal)` asks an application-supplied `SelectionHandler` which conversation messages the next prompt folds for the request the loop is serving, and `build(selection?)` stays synchronous and folds that selection where it folds `active.view()` on 2026-10-07. The loop awaits `select` at run entry and after a compaction only when a handler is configured. With no handler the loop never calls it and `build()` is the assembly the loop runs on 2026-10-07, with no added `await` before the first provider request.
- **The stock selection.** `createSelection(options)` is the handler the framework ships: it asks the judge one binary question per screened message, whether that message is needed for the request, records each outcome once, derives applicability with the application's criteria text and threshold, and includes a message unless that question answered no. The question sentence is the framework's; the criteria text, the threshold, the screen, and the work limit are the application's, and the framework exports the criteria wording it measured as a constant an application can pass. Two further relation questions, whether a later message withdraws an earlier one and whether a later message accepts an earlier proposal, were measured and read well; they are the next unit, built when an application that revises decisions mid-conversation consumes them.

What the desk does afterward: it deletes its readout math, its judge `fetch`, and its decision types; it keeps each ticket as a conversation in a memory store; it reuses recorded judgments on a repeated turn and asks Mica only for the questions whose sources changed; its reply agent runs over the ticket conversation with the stock selection, so a follow-up message on the same ticket folds only the earlier messages the `needed` question kept, and the page shows that receipt; it keeps every fixture, threshold, policy phase, and task sentence. The desk is therefore the first consumer of the judge, the judgments, the seam, and the stock selection, and the loop reaches the seam on this host without a test.

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

The contract, in `types.ts` form. Probabilities are the only stored number; every measure derives from them.

```ts
// @orkestrel/agent, src/core/types.ts (root)
import type { TokenUsage } from '@orkestrel/budget'

/** Carries one choice option or one score level, keyed by a caller id; a choice renders the id in brackets after the label, a score renders only the text. */
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

/** Carries the distribution over a question's candidates. */
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

/** Names what one question came back as: an answer or a refusal. */
export type JudgeOutcome = Answer | Refusal

export interface JudgeResult {
	readonly model: string
	readonly outcomes: readonly JudgeOutcome[]
	readonly usage?: TokenUsage
}

/** Answers typed questions about one state with probabilities; the sibling of `ProviderInterface`, never a provider. */
export interface JudgeInterface {
	readonly id: string
	readonly name: string
	/** Holds the identity every result reports; the wire composes it from everything that changes an answer under one state, and a judgment is reused only against the same value. */
	readonly model: string
	ask(request: JudgeRequest, signal: AbortSignal): Promise<JudgeResult>
}

// src/core/validators.ts  isJudgeQuestion, isJudgeOutcome (a refusal carrying probabilities is rejected)
```

The engine, in the providers module, mirrors `AgentProvider` member for member: its input extends `ProviderOptions` with `url` and an optional `path`, as `AgentProviderInput` does (`src/core/types.ts:2206-2211`); the signal is positional and folded with the deadline; a non-OK status or an unreadable body throws `JudgeError` with code `HTTP` or `PROTOCOL`; a request that cannot be answered on this wire (a duplicate question id, a duplicate candidate id, a choice with more candidates than the wire's top list can carry) throws `JudgeError` with code `QUESTION` before any inference; a missing label is a `Refusal` value, never a throw. The subclass projects a request onto one or more wire calls and reads each call back, so a wire that answers one question per call (Ollama) and a wire that answers every question in one call (a System One server) both fit the seam.

```ts
// @orkestrel/agent, src/core/providers/types.ts
export interface AgentJudgeInput extends ProviderOptions {
	readonly url: string
	readonly path?: string
}
/** Carries one wire call: the body and the ids of the questions it answers. */
export interface JudgeCall {
	readonly questions: readonly string[]
	readonly body: Readonly<Record<string, unknown>>
}
export interface AgentJudgeInterface extends JudgeInterface {
	project(request: JudgeRequest): readonly JudgeCall[]
	read(value: unknown, call: JudgeCall, request: JudgeRequest): readonly JudgeOutcome[]
}
export interface JudgeError extends Error { readonly code: 'HTTP' | 'PROTOCOL' | 'QUESTION'; readonly status?: number }
/** Carries the measures `computeReading` derives from an answer; nothing stores them. */
export interface Reading {
	readonly winner: string
	readonly probability: number
	readonly confidence: number
	readonly expectation?: number
}
// src/core/providers/helpers.ts  computeReading(question: JudgeQuestion, answer: Answer): Reading

// @orkestrel/ollama, src/core/types.ts
export interface OllamaJudgeOptions extends ProviderOptions {
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
	/** Holds the token the daemon generated, which the page compares with the winning label. */
	readonly generated: string
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

- **Placement by the carve graph.** The providers module and the conversations module import only the root; the contexts module imports only the root and the conversations module (`context.md` § The plan, the layout table). The judge values and `JudgeInterface` are used by the conversations module (the record), the contexts module (the selection), and the providers module (the engine), which is the root's admission rule (`.claude/rules/architecture.md:222`). `Reading` and `computeReading` have one internal home, the providers module beside the engine, because no other module reads a measure: the stock selection thresholds the `yes` weight directly, and the desk imports both through the barrel. The engine imports only the root and `@orkestrel/timeout`, as the providers module already does. The contexts module gains no dependency on the providers module. The root, the conversations module, and the contexts module each gain a type import of `TokenUsage` from `@orkestrel/budget`, a package the agent already declares (`package.json:74`); the layout table in `context.md` lists that edge only for the agents module, and this record adds it to the three rows.
- **Several questions over one state.** On Ollama, `project` yields one `/api/chat` call per question in question order and the engine awaits each one; the daemon has no shared prefill (`.orkestrel/agent/mica.md:90`), and the desk measured that starting the calls together did not shorten the wait (`app/server/Desk.ts:118-119`). On a System One server `project` yields one call carrying every question and the server prefills the state once (`.orkestrel/agent/mica.md:20`, `.orkestrel/agent/system-one.md:33`). One face serves both because the result is per request: `usage` belongs to the HTTP calls the request made and is never copied onto the outcomes of a batch. A caller that needs each outcome as it lands issues one request per question, which costs the same on Ollama; no streaming face and no polling loop is built.
- **Readout fixed by the wire, calibration supplied by the application.** `OllamaJudge` fixes `num_predict: 1`, `temperature: 1`, and `top_logprobs: 20` (the list the desk recovers labels from, `.orkestrel/agent/mica.md:88`), sends `system` as the model's trained prompt, divides the candidate logprobs by the calibration `temperature`, runs the softmax over the candidates alone, refuses when a label is outside the top list, and reads usage through the package's own `extractUsage`, which reports usage only on a record whose `done` is true (`guides/ollama.md:118`); the non-streaming body's `done` field is an assumption to settle with one recorded body before the unit is accepted. The user-turn shape (`.orkestrel/agent/mica.md:36`) and the label codebook (`No`/`Yes`, `A` through `Z`, then `a` through `z`, then `AA` onward, `.orkestrel/agent/mica.md:26`) are Mica's, and a choice candidate's id renders in brackets after its label as the desk renders a name (`app/core/helpers.ts:189`); a render seam waits for a second model.
- **Identity is what changes an answer.** `OllamaJudge` composes `model` from the Ollama model tag, the `system` prompt, the calibration `temperature`, and the package's render revision, so a changed calibration, a changed prompt, or a release that changes the user-turn render or the codebook changes the identity and ends reuse of every judgment recorded under the old one. The string is opaque to the agent; the guide states what it is composed from.
- **Measures derived, one scale.** `computeReading` gives the first strictly greatest candidate as `winner`, its `probability`, the published choice confidence `(p_max - 1/n) / (1 - 1/n)` (`.orkestrel/agent/system-one.md:46`), the published score confidence `max(0, 1 - spread / MAD_uniform)` with `expectation = sum(i * p_i)` (`.orkestrel/agent/system-one.md:54`), and for a noul `|2p_yes - 1|`, the number the Confidence page gives on the same scale (`.orkestrel/agent/system-one.md:61`). One term, `confidence`, for every form; the desk's `certainty` goes.
- **The System One wire is deferred.** No consumer on this host runs against Jev or Mica's server (`.orkestrel/agent/mica.md:57`). When one does, the wire is a vendor package shaped like `@orkestrel/ollama`, subclassing `AgentJudge` with `project` and `read`, built with that consumer. Its decoder returns probabilities only and ignores the server's `confidence` and integer `score`, as `.orkestrel/agent/mica.md:55` requires. `JudgeRequest.state` is a string on both wires; System One also accepts an object or an array (`.orkestrel/agent/system-one.md:11`), and a caller that holds a structured state renders it before the call.

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
| A separate vendor package per wire | Adopt per vendor, refuse per capability | A System One server is another vendor's protocol and gets its own package with its first consumer. The logprob readout is the same daemon, the same `/api/chat` path, and the same `url` and `keepAlive` vocabulary as `OllamaOptions` (`guides/ollama.md:75`); a package for it would split the Ollama wire in two. |
| An HTTP engine with an `encode`/`decode` transport object instead of a subclass | Refuse the object, adopt the batch-capable seam | The providers module already shapes a wire as a subclass over `AgentProvider` (`guides/ollama.md:104`); a second shape for the sibling engine would be two patterns for one thing. The seam projects a request onto one or more calls so a batch wire fits. |
| An `AsyncIterable` of calls instead of a promise | Refuse | On Ollama a caller that needs progressive arrival issues one request per question at the same cost; on a System One server the batch arrives at once. The iterator adds early-close and cleanup rules and buys no arrival either wire does not already give. |
| A context-level `decide` and a context emitter | Refuse | The context is event-free by design (`src/core/AgentContext.ts:87-88`); the agent emits `select`. The reuse-or-ask-and-record step is one manager method, `judgments.resolve`, the stock selection and the desk both call. |
| A uniformly asynchronous `build` | Refuse | It puts an `await` on the default path and changes the abort and eager-pump timing the loop pins (`src/core/Agent.ts:384-390`). |
| Selection as a `Conversation` method | Refuse | The selection needs the request, the screen, and the judge at assembly time, where `build()` already meets the system block and the workspace (`src/core/AgentContext.ts:173-249`); a conversation owns its messages and their judgments and stays the pure synchronous read the context folds (`src/core/conversations/Conversation.ts:176`). |
| Judgments as a workspace document | Refuse | `build()` renders workspace text into the system prompt (`src/core/AgentContext.ts:220-229`), so judgments would reach the model as text; a document has no typed lookup by key and persists per workspace, not per conversation. |
| Relevance by substring search alone | Refuse as the selector; keep as a screen | `search` matches substrings (`src/core/conversations/Conversation.ts:258-267`) and cannot tell a withdrawn rule from one in force; it is the cheap pass a `ScreenHandler` can use, and the `recall` tool keeps it. |
| Validation of a handler's `Selection` by the context (unknown ids, duplicates, a recap beside its originals) | Refuse | A handler is application code the application supplied, as a summarizer is; the context folds what it returns. The stock selection returns a subset of `view()` by construction, and its tests pin that. |
| A structured `JudgeRequest.state` | Refuse in this round | Both wires take text on 2026-10-07; a caller renders a structured state before the call. A System One wire can widen the type with its consumer (`.orkestrel/agent/system-one.md:11`). |
| A graded relevance `score` for selection | Refuse | The graded form leaned to the middle level on 3 of 4 rows (§ Measurements); the binary question is the selection form. |
| Span-addressed judgments and typed revision records | Defer | Real for a consumer that selects rules rather than messages; this round's consumer selects messages, and the staged inclusion rule keeps a mixed message. |
| The relation questions in this round | Defer | Measured and recorded; built with the first application that revises decisions mid-conversation (`AGENTS.md:65`). |
| The proposal's message-agnostic assertion layer | Refuse | No consumer imports it; judgments keyed to source ids are the assertions with provenance, built where the record lives (`.orkestrel/agent/context.md:139`). |
| A `Decision*` name family in the agent | Refuse | `@orkestrel/program` owns `Decision` for an authority outcome (`guides/program.md:130`); a second family on the same word would be two concepts on one term. `Judge` and `Judgment` are free fleet-wide and are the desk's own words. |

## Vocabulary

Every proposed public name was checked against the collision record (`host.json` `surface`, 128 rows) and the `## Surface` rows under `guides/`, by exact name and by stem. `free` means no package exports the name; `qualified` means the bare word is owned elsewhere and the name carries a domain word. The subjective audit lane repeated the sweep and found the same three owned stems: `Decision` (`guides/program.md:130`), `Condition` (`guides/database.md:262`), and `SelectionManagerInterface` (`guides/table.md:122`).

| Name | Kind | Home | Mark |
| --- | --- | --- | --- |
| `JudgeInterface`, `JudgeQuestion`, `JudgeRequest`, `JudgeResult`, `JudgeOutcome`, `ChoiceQuestion`, `ScoreQuestion`, `NoulQuestion` | types | agent root | free |
| `Candidate`, `Weight`, `Answer`, `Refusal` | interfaces | agent root | free; `AnswerError` (terminal), `AnswerHandler` (router), and `AnswerToolOptions` (toolbox) are nearby and distinct; `answer` names the distribution arm only, and `outcome` names an answer or a refusal |
| `isJudgeQuestion`, `isJudgeOutcome` | functions | agent root | free |
| `AgentJudge`, `AgentJudgeInterface`, `AgentJudgeInput`, `JudgeCall`, `JudgeError`, `isJudgeError`, `Reading`, `computeReading` | class, types, functions | agent providers module | free |
| `Judgment`, `JudgmentInput`, `JudgmentManagerInterface`, `JudgmentManager`, `buildJudgments`, `matchesJudgment`, `isJudgment` | types, class, functions | agent conversations module | free |
| `Selection`, `SelectionHandler`, `SelectionOptions`, `createSelection`, `Criterion`, `ScreenHandler`, `Applicability`, `inferApplicability`, `buildConditionKey`, `NEEDED_QUESTION`, `NEEDED_CRITERION` | types, functions, constants | agent contexts module | free; `table` owns `SelectionManagerInterface`, a different name |
| `SelectionCondition` | type | agent contexts module | qualified; `database` owns `Condition` |
| `select`, `judgments`, `resolve`, `project` | members | agent | members, not bare names; none is a fixed lifecycle verb |
| `OllamaJudge`, `OllamaJudgeInterface`, `OllamaJudgeOptions`, `OllamaJudgeResult`, `createOllamaJudge`, `Readout`, `Logprob`, `WireJudgeRequest`, `renderJudgePrompt`, `extractTop`, `computeAnswer`, `TOP_LOGPROBS`, `JUDGE_LABELS` | class, types, functions, constants | ollama | free; the wire body keeps the external `top_logprobs` and `keep_alive` names, as `.claude/rules/names.md:122` requires |

`execute` is not used: the fixed lifecycle vocabulary gives it the meaning "run primary work to completion" (`.claude/rules/names.md:232`); the judge's verb is `ask`.

## The plan

These units follow the context ruling's units and the agent 0.0.27 release. Each checkout has one writer at a time; a file passes from one unit to the next in sequence, so two units in one checkout can touch one file (`contexts/types.ts` in units 3 and 4; `guides/agent.md` in units 1 and 5) without a concurrent write. Checkouts run in parallel. The Codex bench was live on 2026-10-07, so constraint-heavy mechanics route to `astra` and shape-sensitive units to `opus`, each reviewed by an engine that did not write it. The desk integration runs against packed local builds before any release, so each capability has its consumer before it is published.

| Order | Unit | Package | Role, engine, review | Owns | Accepts when |
| --- | --- | --- | --- | --- | --- |
| 1 | `judge` | agent | `opus`; `analyst` (Astra) | the judge block in the root `types.ts`, the guards, `AgentJudge`, `JudgeError`, `Reading`, and `computeReading` in the providers module, tests, Surface rows in `guides/agent.md` | the block typechecks; `computeReading` reproduces the desk's pinned choice and score cases (`tests/app/core/helpers.test.ts:41-55`) plus the noul scale and a first-wins tie; a guard round trip rejects a refusal with probabilities; `AgentJudge` is proven on a judge built over a fixture `fetch` returning recorded bodies for the HTTP, PROTOCOL, and QUESTION failures, the deadline fold, and a two-call projection; `test:guides` passes |
| 2 | `judgments` | agent | `astra`; `reviewer` (Opus) | the conversations module's types, `JudgmentManager.ts`, `Conversation.ts`, helpers, validators, both stores, tests | last write wins per key; `matchesJudgment` is false on a changed source, text, criterion, state, or identity; `resolve` asks only for the unmatched questions and records them; `buildJudgments` attaches usage only to a one-question request; a snapshot with judgments round-trips through both stores and one without still validates |
| 3 | `seam` | agent | `opus`; `analyst` (Astra) | `Selection`, `SelectionHandler`, `AgentContext.ts`, the agents module's types, `Agent.ts`, the `strict` doc, tests | every existing `Agent.test.ts` case passes unchanged with no `select`, the synchronous-abort timing cases included; with a handler the provider receives `build(selection)` and the handler receives the run's request; `select` fires at entry and after a compaction; a handler throw emits `fault` and falls back, and with `strict` settles `error`; a returned `fault` charges its usage before `fault` fires; an abort during `select` commits a partial with no provider call; a tail changed under the handler is a `fault`; selection usage reaches the budget and the result |
| 4 | `selection` | agent | `astra`; `reviewer` (Opus) | `createSelection`, `inferApplicability`, `buildConditionKey`, the contexts module's templates and constants, tests over a judge built on `AgentJudge` with a fixture `fetch` of recorded bodies and the probe transcript | no default threshold exists in the types; a second call asks nothing; a compaction re-asks only the subjects whose state changed; a removed source re-asks its dependents; the limit leaves the unasked kept; the request message and a tool group are never dropped; an earlier request's `needed` judgments are removed; the probe's expected applicability holds under a threshold the test supplies |
| 5 | `guide` | agent | `opus`; `checker` | the `guides/agent.md` sections for the judge, the judgments, the seam, and the stock selection, with executed fences | `test:guides` passes and every behavior sentence has an executed assertion |
| 6 | `ollama-judge` | ollama | `astra`; `reviewer` (Opus) | the `OllamaJudge` surface, hermetic tests on a fixture `fetch` of recorded bodies, one `service` case, `guides/ollama.md`; built against a packed local agent | the recorded body equals the desk's judge body field for field; a top list lacking a label yields a `Refusal` naming the candidate; the candidate-only softmax reproduces `tests/app/core/helpers.test.ts:28-38` and `:64-80`; usage reads through `extractUsage` against one recorded non-streaming body; `model` changes when `system` or `temperature` changes; the live delete-database calibration matches the desk's pinned reference within a tolerance the unit states from its own run |
| 7 | `recall` | toolbox | `builder` (Sol); `reviewer` (Opus) | the toolbox `recall` tool, tests, `guides/toolbox.md`; built against a packed local agent | the tool drives the real conversation manager through a real tool manager; a ticket outside the manager is unreachable |
| 8 | `desk-judge` | desk | `astra`; `reviewer` (Opus) | the deletions and rewrites under § The desk after the change, the per-ticket managers, the ticket agent with `select` and `instructions`, the recall tool install, tests; built against packed local agent, ollama, and toolbox | the desk tests pass with the bench references unchanged; a repeated `POST /turn` with the same fixture and text issues no judge call on a recording daemon origin; an edited text asks only the changed sources' questions; a follow-up on the same ticket sends the provider a request that folds only the messages the selection kept, and the page shows the receipt; two tickets in flight never share a message; `tests/app/vue/integration.test.ts` passes unchanged |
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
| System One wire | a later package | inside the agent | Opus: a vendor wire is a vendor package, built with its consumer |
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

## Risks

| Risk | Cheapest probe |
| --- | --- |
| A `needed` judgment's view-shaped state re-asks after every append that changes the view, so a long run with many compactions pays `limit` questions per compaction | time `createSelection` over the probe transcript across three compactions with a stated `limit` |
| The whole-view state for `needed` reads worse than the pair on another transcript | the pair harness over a second transcript with a clarifying message appended after a `needed` outcome |
| The templates read differently on a model other than Mica v0.1 4B | the pair harness against that model's Ollama tag, before its `OllamaJudgeOptions` are pinned |
| An adversarial note in a message flips a `needed` answer and drops a rule | the desk's injection fixture placed as a screened message |
| A pair longer than Mica's 8,192-token contract | one over-length state; the Ollama daemon's own behavior at the limit is measured, not inferred from the official server's HTTP 400 (`.orkestrel/agent/mica.md:22`) |
| An `await` slips into the default path | the existing timing cases in `tests/src/core/Agent.test.ts` |
| The non-streaming `/api/chat` body lacks `done`, so `extractUsage` drops usage | one recorded `stream: false` body from the daemon |
| Reuse crosses a changed question, source, state, or identity | change each identity field alone and assert reuse only on full equality |
| Restart loses the judgments | restart the desk after a saved memory-store turn and keep the expected absence explicit |

## Files to read with this record

- `tmp/units/refine-evidence.md`, the evidence the lanes read, kept until the campaign sweep; its content is summarized under § Measurements.
- `tmp/probes/mica.ts`, `tmp/probes/pairs.ts`, and `tmp/probes/pairs2.ts`, the probes, with their journals and result files, deleted at the sweep; the readings survive in § Measurements.
- `tmp/units/refine-subjective.md` and `tmp/codex/refine-answer.md`, the design lane answers, and `tmp/units/refine-claims.md` with `tmp/codex/refine-audit-answer.md` and `tmp/units/refine-audit-subjective.md`, the claims and the two audit verdicts, deleted at the sweep; the reconciliation and the rulings survive in § Where the lanes disagreed and § Falsification.
- [The context ruling](context.md), whose units precede this plan, and the 2026-10-05 records this plan keeps to: [provider.md](provider.md), [agent.md](agent.md), [system-one.md](system-one.md), [mica.md](mica.md), [desk.md](desk.md), and [packages.md](packages.md).
