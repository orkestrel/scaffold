# J-ENGINE-ORKESTREL-2 — map (returned 2026-09-23 by `orkestrel` on Sonnet, native, read-only; retained verbatim from the agent's final message, HTML entities decoded)

`@orkestrel/contract` publishes no DOM guard (no `isElement` found); DOM-value guards are not present in this package's declarations, only structural/JavaScript guards (`isString`, `isRecord`, `isFunction`, `isNonEmptyString`, `Guard<T>`, `ContractError`). This closes my reading. Final map follows.

# Map

## `contract` (`@orkestrel/contract` `0.0.17`, L0)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (not fully readable in one pass — 279.6 KB, exceeds the 256 KB read cap; read through targeted `Grep`). **`exports` map** (from `package.json:30-42`): `"."` → `dist/src/core/index.d.ts` / `.js` (import) and `dist/src/core/index.d.cts` / `.cjs` (require); `"./package.json"`. **Runtime dependencies**: none (`package.json` carries no `dependencies` key) — L0 in the catalog.

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| Guards over DOM values | `isString(value: unknown): value is string` | `dist/src/core/index.d.ts:3353` | A total string guard | Not a DOM guard; no `Element`/`Node` narrowing declared anywhere I found |
| Guards over DOM values | `isRecord(value: unknown): value is Record<string, unknown>` | `dist/src/core/index.d.ts:3291` | A total plain-record guard | Not DOM-specific |
| Guards over DOM values | `isFunction(value: unknown): value is AnyFunction` | `dist/src/core/index.d.ts:2834` | A total function guard | Not DOM-specific |
| Guards over DOM values | `isNonEmptyString(value: unknown): value is string` | `dist/src/core/index.d.ts:3097` | Narrows a non-empty string | Not DOM-specific |
| Error/result surface used by candidates | `class ContractError extends Error` | `dist/src/core/index.d.ts:1297` | The typed error class `abort`, `timeout`, `template` throw through | Not itself a DOM/tooltip/event mechanism |

*Fact*: no `Element`, `Node`, `HTMLElement`, or similarly named DOM guard export appears in the grepped `^export declare` listing (22.2 KB, persisted separately) I read for this file. *Inference*: `@orkestrel/contract` therefore serves the guards-over-DOM-values mechanism only as a base (`isRecord`/`isString`/`isFunction`), never as a DOM-typed guard itself — inferred from the absence, not from a declaration stating it excludes DOM.

## `emitter` (`@orkestrel/emitter` `0.0.10`, L1)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/emitter/dist/src/core/index.d.ts`. **`exports` map** (`package.json:29-41`): `"."` import/require pair, `"./package.json"`. **Runtime dependencies**: `@orkestrel/contract` `^0.0.17` (L0).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| Typed event surface | `class Emitter<TMap extends EventMap> implements EmitterInterface<TMap>` | `dist/src/core/index.d.ts:67-78` | Typed `on`/`once`/`off`/`emit`/`count`/`clear`/`destroy` over a caller-declared `EventMap` | — |
| Cancelable pre-change event | `emit<K extends keyof TMap>(event: K, ...args: TMap[K]): void` | `dist/src/core/index.d.ts:74,147` | Synchronous, in-order listener invocation | *Fact from the declaration*: `emit` returns `void` and the interface doc states "Every listener runs, and an isolated throw routes to `error`... never rethrown" (`index.d.ts:135-147`). No return value or mutable event object a listener can use to stop the emitting entity's change — `emit` cannot be canceled by a listener |
| Entity lifecycle with `destroy` | `destroy(): void` / `get destroyed(): boolean` | `dist/src/core/index.d.ts:70,77,111,163` | Idempotent teardown, `on`/`once`/`emit` become no-ops after `destroy()` | Emitter-scoped only; not an entity lifecycle abstraction beyond the listener set itself |

**Unknown 1 answered**: the declaration states `emit` returns `void` (`index.d.ts:74` and interface at `:147`) and its doc block (`:41-51`, `:139-147`) describes isolated, unstoppable listener invocation with no cancellation channel. `Emitter` carries isolated notification only, never a cancelable pre-change event.

## `abort` (`@orkestrel/abort` `0.0.11`, L1)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/abort/dist/src/core/index.d.ts`. **`exports` map** (`package.json:29-41`): same shape as `emitter`. **Runtime dependencies**: `@orkestrel/contract` `^0.0.17` (L0).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| Abort-linked cleanup | `class Abort implements AbortInterface` — `readonly id: string; readonly signal: AbortSignal; get aborted(): boolean; abort(reason?: unknown): void` | `dist/src/core/index.d.ts:28-43` | Traceable id, idempotent abort, native `AbortSignal` exposure | No `addEventListener`/cleanup registration of its own beyond the native `signal` |
| Abort-linked cleanup (composition) | `linkSignal(own: AbortSignal, parent: AbortSignal | undefined): AbortSignal` | `dist/src/core/index.d.ts:169` | Combines an own signal with a parent via `AbortSignal.any`, "born aborted" if parent already aborted | Returns a signal only; no listener/teardown registry |
| Guards over DOM values (near neighbor) | `isAbortSignal(value: unknown): value is AbortSignal` | `dist/src/core/index.d.ts:142` | Total, spoof-resistant `AbortSignal` guard | Not an HTML/DOM-element guard |

**Unknown 2 (abort half) answered**: no `node:` import appears anywhere in the read declaration file; the class and functions operate purely on the native `AbortController`/`AbortSignal` platform globals (`index.d.ts:1-193`). *Inference from absence*: host-independent as declared, pending a check of the built `dist/src/core/index.js` entry, which this unit did not read (see unread list).

## `timeout` (`@orkestrel/timeout` `0.0.11`, L1)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/timeout/dist/src/core/index.d.ts`. **`exports` map**: same shape. **Runtime dependencies**: `@orkestrel/contract` `^0.0.17` (L0).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| A timer with an abort deadline | `class Timeout implements TimeoutInterface` — `get id(): string; get ms(): number; get signal(): AbortSignal; get expired(): boolean; start(): void; clear(): void` | `dist/src/core/index.d.ts:108-117` | A controllable `setTimeout` wrapper exposing an `AbortSignal` that aborts on expiry, with `start`/`clear` re-arm semantics documented at `:88-96` | `ms` is validated `0`–`2_147_483_647` inclusive (`:5-6,170-173`) — no support for a duration outside that 32-bit range |
| A timer with an abort deadline | `createTimeout(options: TimeoutOptions): TimeoutInterface` | `dist/src/core/index.d.ts:36` | Factory returning the published interface rather than the class | Same `ms` bound as `Timeout` |
| Guards over DOM values (near neighbor) | `isTimeoutSignal(value: unknown): value is AbortSignal` | `dist/src/core/index.d.ts:70` | Total native `AbortSignal` guard | Not an HTML/DOM-element guard |

**Unknown 2 (timeout half) answered**: no `node:` import appears in the read declaration file; `Timeout` wraps the platform `setTimeout`/`AbortController` only (`index.d.ts:82-117`). *Inference from absence, same caveat as `abort`*: host-independent as declared; the built entry (`dist/src/core/index.js`) was not read to confirm at the JavaScript level.

## `queue` (`@orkestrel/queue` `0.0.14`, L3)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/queue/dist/src/core/index.d.ts` (grepped for `^export declare`, not read in full). **`exports` map**: not read directly this pass; `package.json` declares `main`/`module`/`types` at `dist/src/core/index.*` per the fleet convention shared with its siblings (inferred from the shared script/file conventions in `package.json:1-96`, not confirmed by reading its `exports` block itself — **unread**). **Runtime dependencies** (`package.json:73-79`): `@orkestrel/abort` `^0.0.11` (L1), `@orkestrel/contract` `^0.0.17` (L0), `@orkestrel/database` `^0.0.15` (L2), `@orkestrel/emitter` `^0.0.10` (L1), `@orkestrel/timeout` `^0.0.11` (L1).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| None of the brief's named mechanisms | `createQueue(options: QueueOptions<TInput, TResult>): QueueInterface<TInput, TResult>`; `class Queue<TInput, TResult>` | `dist/src/core/index.d.ts:115,310` | A FIFO job queue with concurrency, retries, per-attempt timeout/abort | Not a typed event surface, not entity lifecycle with `destroy` alone, not a timer, not a sanitizer, not a template filler, not a DOM guard, not a browser wait/recorder |

*Inference*: `queue`'s runtime dependency tree pulls in `@orkestrel/database` (L2), which the browser bundle would ship as an external import per the standing condition (`vite.config.ts` `srcBrowser` leaves every `@orkestrel/*` import external) — a materially heavier dependency edge than `abort`/`timeout`/`emitter` alone for a package that answers none of the eight named mechanisms.

## `html` (`@orkestrel/html` `0.0.10`, L1)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/html/dist/src/core/index.d.ts` (partial read, lines 1–1248 of 1543; the tail 1249–1543 is **unread**). **`exports` map** (`package.json:32-44`): same import/require pair as `contract`. **Runtime dependencies**: `@orkestrel/contract` `^0.0.17` (L0).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| Sanitizer for tooltip and popover content | `class HTML implements HTMLInterface` — `sanitize(options?: HTMLSanitizeOptions): HTML` | `dist/src/core/index.d.ts:446,680` | Removes every unsafe element/attribute/URL against a fixed floor documented at `:759-796`; fixpoint under reparse | Operates on the package's own parsed `HTMLDocument` AST, not directly on a live `Element`/`innerHTML` string without a `createHTML`/render round trip |
| Sanitizer for tooltip and popover content | `createHTML(input: string | HTMLDocument): HTMLInterface` | `dist/src/core/index.d.ts:161` | Entry point parsing a string or adopting a document | Parsing is total/lenient (never throws), so malformed markup recovers rather than being refused outright |
| Sanitizer for tooltip and popover content | `HTMLSanitizeOptions` — `elements?`, `attributes?`, `schemes?`, `comments?` | `dist/src/core/index.d.ts:787-796` | Configurable allowlists layered on a floor that "cannot be lowered": `on*` handlers, `style`, `srcdoc`, namespaced attributes always stripped; unsafe URL schemes always refused | Each allowlist key *replaces* its default rather than extending it (`:764-767`) — a caller adding one tag must restate the whole set |
| Sanitizer for tooltip and popover content | `renderHTML` (referenced at `:339,473` but its own declaration sits past line 1248 — **unread**) | unread (past the 1248-line cap) | Serializes back to a string for insertion | Not confirmed from this pass; named only in examples and other functions' doc blocks |

## `template` (`@orkestrel/template` `0.0.8`, L2)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/template/dist/src/core/index.d.ts` (read in full, 842 lines). **`exports` map**: not read directly this pass — **unread** (the file opens with type-only imports from `@orkestrel/contract` and `@orkestrel/emitter`, `:1-5`, but the `package.json` `exports` block itself was not opened for `template`). **Runtime dependencies** (`package.json:68-71`): `@orkestrel/contract` `^0.0.17` (L0), `@orkestrel/emitter` `^0.0.10` (L1).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| A template filler | `fillTemplate(content: string, values?: TemplateFillValues, options?: TemplateFillContext): string` | `dist/src/core/index.d.ts:134` | Single-pass `{{name}}` substitution with a documented prototype-pollution guard (`UNSAFE_FIELD_SEGMENTS`, `:834-839`) and a `MissingPolicy` (`'error' | 'empty' | 'literal'`, `:191`) | Token grammar excludes `{` inside a token (`FILL_PATTERN`, `:74-93`) — a token containing `{` never matches |
| A template filler | `class Template implements TemplateInterface` — `fill(values?, options?): string`, `validate(values?): TemplateValidationResult` | `dist/src/core/index.d.ts:292-329,361` | A named, versionable template object wrapping `fillTemplate` with its own declared `placeholders` | Instance-scoped; no live-binding to a DOM node |
| A template filler | `class TemplateManager implements TemplateManagerInterface` | `dist/src/core/index.d.ts:533-619` | An id-keyed registry with `register`/`find`/`fill`/`validate`/`destroy` and an owned `emitter: EmitterInterface<TemplateManagerEventMap>` (`register`/`remove`/`clear` events, `:654-661`) | Registry-level; still string-in/string-out, not DOM-producing |

## `test` (`@orkestrel/test` `0.0.20`, L1 core / browser and server secondary entries)

**Declaration**: `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts` (read in full, 867 lines) and `.../dist/src/browser/index.d.ts` (partial read, lines 1–1254 of 3078; the tail 1255–3078 is **unread**). **`exports` map** (`package.json:21-49`): `"."` → `dist/src/core/index.*`; `"./browser"` → `dist/src/browser/index.d.ts`/`.js` (import only — no `require` condition); `"./server"` → `dist/src/server/index.*` (import + require); `"./package.json"`. **Runtime dependencies**: `@orkestrel/contract` `^0.0.17` (L0). **Peer dependency**: `vitest` `^4.1.11` (`package.json:103-105`).

| Mechanism | Export and signature | Pointer | Gain | Lacks |
|---|---|---|---|---|
| Waits the browser proofs use | `waitForAnimations(element: Element, options?: WaitOptions): Promise<void>` | `dist/src/browser/index.d.ts:2992` | Waits over CSS animations/transitions on a real `Element`, per the brief's Unknown 3 | Signature and doc body past this grep hit were not opened in full — the surrounding `@remarks` are **unread** |
| Waits the browser proofs use | `waitForCondition(description: string, condition: () => boolean | Promise<boolean>, options?: WaitOptions): Promise<void>` | `dist/src/core/index.d.ts:781` | General polling wait with budget/interval/abort bounds (`WaitOptions`, `:857-864`) | Host-independent core entry; no DOM read baked in |
| Waits the browser proofs use | `waitForEvent<TArgs extends readonly unknown[]>(subscribe: EventSubscriber<TArgs>, description: string, options?: WaitOptions): Promise<TArgs>` | `dist/src/core/index.d.ts:804` | Waits for one event delivery through a caller-supplied subscribe function | Generic over `EventSubscriber`, not itself bound to DOM `addEventListener` |
| Waits the browser proofs use | `waitForText(description: string, read: () => string, text: string, options?: TextWaitOptions): Promise<string>` | `dist/src/core/index.d.ts:847` | Bounded wait for a text reading to carry an expected sentence, with an `absent` departure guard (`TextWaitOptions`, `:743-757`) | Reader-supplied; caller must wire the DOM read itself |
| Waits the browser proofs use | `waitForAbort(signal: AbortSignal): Promise<void>` | `dist/src/core/index.d.ts:767` | Parks on a one-shot abort listener with no timer/polling | Not a general condition wait |
| A recorder the engine proofs can use | `createRecorder<TArgs extends readonly unknown[]>(): RecorderInterface<TArgs>` — `readonly calls`, `readonly count`, `readonly handler`, `clear(): void` | `dist/src/core/index.d.ts:149,453-466` | A call recorder for callback arguments | Records raw call args only, no event-name correlation |
| A recorder the engine proofs can use | `createRecorders<TMap, TName>(source: EventSourceInterface<TMap>, events: readonly TName[]): RecorderMap<TMap, TName>` | `dist/src/core/index.d.ts:167,474-476` | Subscribes and records per-event recorders keyed by event name against any `EventSourceInterface` (structurally satisfied by `EmitterInterface`'s `on`) | Requires `source.on<K>(event, handler)` shape; a duplicate name in `events` installs a fresh recorder each occurrence and the map keeps only the last (`:161-166`) |
| A recorder the engine proofs can use | `createJournal(): JournalInterface` | `dist/src/browser/index.d.ts:827` (declaration body of `JournalInterface` past line 1248, **unread**) | Records console output and uncaught errors during a scenario | Full member list unread |

**Unknown 3 answered**: `waitForAnimations(element: Element, options?: WaitOptions): Promise<void>` exists at `dist/src/browser/index.d.ts:2992` (matched by `Grep`; full doc block not opened, so its exact settle-condition prose is unread). `waitForEvent` (core, `:804`) is the wait over an event. `createRecorder`/`createRecorders` (core, `:149,167`) are the recorders.

## Every other installed package

- `codec`, `console`, `database`, `indexeddb`, `lsp`, `mcp`, `process`, `router`, `server`, `sqlite`, `sse`, `tool`, `websocket` — not declared in `veneer/package.json` (neither `dependencies` nor `devDependencies`); present only as transitive `node_modules` installs of other packages' runtime edges, so none is a direct candidate for this engine.
- `probe` — declared as a `devDependency` (`^0.0.16`) but is the `prove` MCP instrument package, not a runtime mechanism candidate.
- `scaffold` — declared as a `devDependency` (`^0.0.77`); tooling only, no runtime mechanism.
- `guide` — declared as a `devDependency` (`^0.0.20`); documentation-parity tooling, no runtime mechanism.

## Mechanisms no installed package serves

- A cancelable pre-change event: `@orkestrel/emitter`'s `emit` is declared `void`-returning with unstoppable, isolated listener invocation (see the `emitter` row above); no other installed package's read declarations expose a cancelable-event primitive.
- A DOM-typed guard (an `Element`/`Node`/`HTMLElement` narrowing function): `@orkestrel/contract`'s guard exports found in this pass (`isString`, `isRecord`, `isFunction`, `isNonEmptyString`) are all structural/JavaScript-value guards; no DOM-element guard was found in the portion read.

## Declarations the bound stopped this unit from reading

- `@orkestrel/contract/dist/src/core/index.d.ts` in full — the file is 279.6 KB, over the 256 KB single-read cap; only a `Grep` listing of `^export declare` lines and targeted line ranges were read.
- `@orkestrel/html/dist/src/core/index.d.ts` lines 1249–1543 (of 1543) — the file exceeded the per-call token cap; `renderHTML`'s own declaration and doc block sit past the read boundary.
- `@orkestrel/test/dist/src/browser/index.d.ts` lines 1255–3078 (of 3078) — exceeded the per-call token cap; `JournalInterface`'s full member list, `waitForAnimations`'s complete `@remarks`, and every browser export past `HarnessInterface`'s opening doc comment are unread.
- `@orkestrel/queue`'s `package.json` `exports` map — grepped only for `^export declare` in its declaration file; the `exports` block itself was not opened.
- `@orkestrel/template`'s `package.json` `exports` map — not opened; inferred by convention from sibling packages, not confirmed.
- `@orkestrel/abort` and `@orkestrel/timeout`'s built `dist/src/core/index.js` entries — the standing condition asks whether the *built entry* carries a host import; only the `.d.ts` declarations were read, so the host-independence finding for both is inferred from the declaration's absence of a `node:` import, not confirmed against the emitted JavaScript.
