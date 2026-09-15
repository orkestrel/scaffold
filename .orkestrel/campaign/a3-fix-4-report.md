# Unit A3-fix-4 report

## Item 1 — the excerpt bound (claim 1)

`guides/agent.md`, the bounded-error-read sentence in clause 34 (`AgentProvider`). Replaced:

> "…so the decoded excerpt never exceeds `MAX_ERROR_BODY_LENGTH` bytes while the read may have
> pulled one whole source chunk from the network."

with:

> "…so the excerpt is decoded from at most `MAX_ERROR_BODY_LENGTH` source bytes and the read may
> have pulled one whole source chunk from the network. A multibyte character cut at that bound
> decodes to a replacement character, so the excerpt's own encoded length can exceed the bound by
> that character."

Checked `src/core/helpers.ts`'s `readText` TSDoc and `src/core/AgentProvider.ts` for the same
promise: neither makes it. `readText`'s doc block already states "The `limit` parameter bounds
bytes passed to the decoder" (bytes-in, not bytes-out), so no edit was owed there under the
brief's conditional.

## Item 2 — the bounding fence's input (claim 7)

`guides/agent.md`, the "Bounding any provider call" fence: added
`const messages = [{ id: '1', role: 'user', content: 'Say hello.' }] as const` before
`const abort = createAbort()`, matching the declaration style used in the guide's other fences
(lines 29, 390, 1140). This fence mirrors no titled source `@example` (the nearest source
`@example` at `src/core/factories.ts:517` uses a different `AbortSignal.any` composition), so no
source file needed the same change.

## Item 3 — two callback tokens (claim 8)

- `src/core/constants.ts`: `UNAUTHORIZED_RELAY_STATUS`'s doc block — "when `authorize` returns"
  → "when the `authorize` callback returns". The block is a single first-sentence paragraph, so
  its Summary cell and description paragraph stayed equal automatically.
- `guides/agent.md`: updated the constants table's `UNAUTHORIZED_RELAY_STATUS` Summary cell to
  the same wording, and updated the prose sentence after the "Mounting the relay on your server"
  fence — "`serve` is the entry" → "The `serve` function is the entry".

## Item 4 — the server hookup (claim 9)

Read `node_modules/@orkestrel/server/dist/src/server/index.d.ts` before writing: `createServer`'s
own quickstart `@example` (lines 361–389) shows `createServer<State>({ dispatcher, state })`,
`await server.start()`, `await server.stop()`. `createDispatcher<TState = undefined>` (from
`@orkestrel/router`) defaults `TState` to `undefined`, so the fence's untyped
`createDispatcher({ routes })` call is `DispatcherInterface<undefined>` and `state: () =>
undefined` satisfies `ConnectionStateFunction<undefined>`.

Added, identically, to `src/core/factories.ts`'s `createRelay` titled `@example` ("Mounting the
relay on your server") and to `guides/agent.md`'s copy of that fence, after the exported `serve`
function:

```ts
import { createServer } from '@orkestrel/server'
…
const server = createServer({ dispatcher, state: () => undefined })
await server.start()
process.on('SIGTERM', () => server.stop()) // stop draining new requests on shutdown
```

`stop()` is placed as the shutdown-signal handler a consumer would register, rather than called
inline, since the fence never tears the server back down.

`tests/guides.test.ts` keeps driving the handler directly (never the dispatcher, never
`createServer`). Extended:

- The substitution comment at the "round trips both relay fence halves" test: now states neither
  the dispatcher nor the `createServer` start-up that follows it is executed there.
- The guide's substitution sentence (clause before "Mounting the relay on your server"): added
  "It never executes the `createServer` start-up that follows the dispatcher, so that half is
  proven by the installed `@orkestrel/server` declaration the fence matches rather than by an
  executed run here."

The presence guard at `tests/guides.test.ts`'s "carries the relay fence lines the transcription
copies" test quotes only lines that stayed unchanged (`const handler = createRelay({`, the
`authorize` line, the route array literal, `return dispatcher.handle(request, undefined)`, the
`createRelayProvider` lines) — none needed updating.

## Gate commands and counts

- `npm run format:check` — 87 files, all correctly formatted (0 issues). One markdown-table
  trailing-padding mismatch surfaced after the item 3 edit (table column width shifted by the
  shorter replacement Summary text); corrected the row's padding to match `oxfmt`'s own output,
  computed by formatting a scratch copy of the file outside the checkout and diffing it, never by
  running a mutating `format` inside the checkout.
- `npm run lint:check` — exit 0, no findings.
- `npm run check` — exit 0 (`tsc --noEmit` root project + `check:src:core`).
- `npm run test:guides` — 1 file, 43 tests passed (unchanged from the prior count).
- `npm run test:src:core` — 23 files, 753 tests passed.

## Deviation

The acceptance criterion's `grep -n "never exceeds" guides/agent.md src/core` still returns one
line: `guides/agent.md:1008`, the unrelated "Bounded `sections`" clause ("…so `sections.length`
never exceeds the cap afterward…"), which predates this unit and is outside every owned item.
`src/core` alone has no remaining `never exceeds` occurrence. Carried on rather than stopping,
because none of the three stop conditions (an unsatisfiable `createServer` fence, a Summary/
paragraph mismatch, or an off-limits file needing a change) applied — this is an overly broad
acceptance pattern reading a sentence outside claim 1's subject, not a defect in the fix.

## Status

```
 M guides/agent.md
 M src/core/constants.ts
 M src/core/factories.ts
 M tests/guides.test.ts
```
