# Unit O7 report

## Item 1 — the undeclared `charge` (claim 8)

In `guides/ollama.md`, the titled `createOllama` + `generate` fence (§ Patterns) now imports
`type { TokenUsage } from '@orkestrel/budget'` and declares
`declare function charge(usage: TokenUsage): void // your billing integration` before the
provider construction, ahead of `if (result.usage) charge(result.usage)`.

Mirrored identically in `src/core/factories.ts`'s `createOllama + generate` `@example` doc-block
fence on `createOllama` (the `import type { TokenUsage } from '@orkestrel/budget'` line and the
same `declare function charge` line, both prefixed `*` as TSDoc).

No other fence in either file calls `charge`, so no further mirror was needed.

## Item 2 — the origin arrangement (claim 10)

In § Relaying through your own server, appended one sentence directly after "A refusal never
becomes a frame … the rest of the refusal statuses.": "A page calling the relay from another
origin needs CORS permission headers the relay route does not send, so serve the page from the
relay server's own origin (as the recorded Chrome 148 run did) or put an origin-checking,
CORS-answering middleware in front of the route (see the server guide), naming the `OPTIONS`
preflight the browser sends with `authorization` and `content-type` as the requested headers."

## Item 3 — the cancel recovery (F1)

In the driven-stream fence (§ Surface), the `catch` arm no longer appends
`error.partial.content` to `answer`. It now reads:

```ts
} catch (error) {
	if (isProviderAbortError(error)) {
		const recovered = error.partial.content // everything that streamed before the cancel
		answer.push(recovered)
	} else throw error
}
```

No twin of the fence exists in `README.md` or elsewhere (`grep -rn "error.partial.content"`
outside `guides/ollama.md` returned no matches before this edit), so no second site needed the
change.

Added the cancellation case to `tests/guides.test.ts`, in `describe('flagship fences', …)`
directly after `'carries the stream fence lines the transcription copies'` and before the seam
fence test: `it('recovers the partial the catch arm reads, undoubled, when the stream is
cancelled', …)`. It drives `provider.stream` over `createOpenTransport('{"message":{"content":
"Hel"}}\n')` (the existing single-use, stays-open daemon fixture from `tests/setupServer.ts`),
aborts the caller's `AbortController` immediately after the one content delta arrives, and
catches the rejection:

```ts
expect(answer).toEqual(['Hel'])
expect(recovered).toBe('Hel')
expect(reasoning).toEqual([])
```

`answer` holds only the one delta the stream actually yielded (never the catch-arm append), and
`recovered` — read from `error.partial.content` in the `catch` arm exactly as the guide fence now
reads it — equals that same one delta, proving the partial is not duplicated onto the accumulated
deltas.

Imports added to `tests/guides.test.ts`: `isProviderAbortError` from the existing
`@orkestrel/agent` dynamic import, and `createOpenTransport` from the existing
`./setupServer.js` dynamic import.

`README.md`'s streaming sample carries no `catch`/cancel arm at all (`grep -n
"error.partial.content|isProviderAbortError|catch (error)" README.md` returned no matches), so it
needed no change and Item 3's scope allowance for it was not triggered. `tests/setup.ts` and
`tests/setupServer.ts` already carry `createOpenTransport`, so no fixture addition was needed
there either.

## Item 4 — the introduction (F2)

In the introduction paragraph (`guides/ollama.md` line 12), changed "this surface imports the
base, the contract types, and the error from `@orkestrel/agent`" to "this surface imports the
base and the contract types from `@orkestrel/agent` and reaches errors through that base",
matching clause 2's wording that the provider errors reach a caller through the base.

## Gate commands and counts

- `npm run format:check` — exit 0, "All matched files use the correct format." (65 files).
- `npm run lint:check` — exit 0, no output (clean).
- `npm run check` — exit 0 (`tsc --noEmit` for the root project and `check:src:core`).
- `npm run test:guides` — exit 0, 1 test file, 34 tests passed (33 prior + the new cancel case).
- `npm run test:src:core` — exit 0, 4 files, 99 tests passed (unchanged from the prior 4/99).
- `npm run test:setup` — exit 0, 3 files, 96 tests passed (unchanged from the prior 3/96).

Not run (off-limits per scope): `build`, `test`, `test:service`, `lint`, `format`.

## Deviation

None. The cancel transcription observed the partial cleanly with the existing
`createOpenTransport` fixture; no Summary cell was touched; no file outside Owned needed a
change.

## Status

```
 M guides/ollama.md
 M src/core/factories.ts
 M tests/guides.test.ts
```
