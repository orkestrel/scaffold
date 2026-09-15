# Unit A2 (third brief) — the relay: `RelayProvider`, `RelayStream`, `createRelay` in `@orkestrel/agent` core

This brief supersedes `tmp/units/a2-brief-2.md`, which superseded `tmp/units/a2-brief.md`. Read the
first brief, its report `tmp/units/a2-report.md`, the second brief, its report
`tmp/units/a2-report-2.md`, and this one, in that order. Apply every section of the earlier briefs
as written except where this file replaces them.

## What changed and why

The second run stopped correctly and proved the gap with a probe and a negative control:
`readText(body, limit, signal)` returns only decoded text, so a relay handler cannot tell a body
that ended within the limit from one the read truncated at the limit — two inputs with different
limit outcomes decode to identical valid text. The Orchestrator rules a contract widening on the
A1 helper rather than a second reader:

**F9 — `readText` reports completion.** Declare in `src/core/types.ts`:

```ts
export interface TextRead {
	readonly text: string
	readonly complete: boolean
}
```

and change `readText(body, limit?, signal?)` to return `Promise<TextRead>`. `text` is the decoded
prefix exactly as today. `complete` is `true` when the stream ended within the limit (or when no
limit was given and the stream ended), and `false` when the read stopped at the limit with the
stream still open: after the budget is spent, perform one more `reader.read()` — `done` means
`complete: true`; a further chunk means `complete: false`, that chunk is discarded undecoded and
the remainder cancelled (the documented one-chunk overshoot already covers it). A signal abort
during the read leaves `complete: false`. Update the helper's TSDoc, `AgentProvider.#request`'s
non-OK path to read `.text`, and every existing `readText` assertion in
`tests/src/core/helpers.test.ts` and `tests/src/core/AgentProvider.test.ts` to the record shape,
adding cases for: a body exactly `limit` bytes long that then ends (`complete: true`); a body of
`limit + 1` bytes (`complete: false`, one overshoot chunk); a BOM-prefixed body (the decoder drops
the BOM from `text`; `complete` still reads the stream, not the text). Red-then-green for the new
cases.

**The relay's limit step (replaces the sentence in the first brief's `createRelay` flow).**
`const read = await readText(request.body, limit ?? DEFAULT_RELAY_LIMIT, request.signal)`; when
`read.complete` is `false` → `413`; otherwise `parseJSONAs(read.text, providerRequestContract.is)`.
Test, failing first: a body of exactly `DEFAULT_RELAY_LIMIT + 1` bytes → `413` and the scripted
provider records no call; a body of exactly `DEFAULT_RELAY_LIMIT` bytes that is valid JSON → the
call proceeds.

**Ownership (adds to the first brief's Owned list).** `src/core/helpers.ts` (the `readText` change
only), `src/core/types.ts` (`TextRead` only — no other member change), `src/core/AgentProvider.ts`
(the `.text` read only), `tests/src/core/helpers.test.ts`, `tests/src/core/AgentProvider.test.ts`
(the `readText` assertions only). Everything else stays as the first brief lists.

**Scope of the deviation contract, restated.** Stop only when a fix would change a behaviour the
ruled contract fixes, when a file outside Owned must change, or when a rule forbids an
instruction. A shape you must widen inside Owned is not a stop. Complete the whole unit.

## Output (replaces the earlier path)

Write the report to `tmp/units/a2-report-3.md` and return the same text as your final message;
leave the two earlier reports untouched. `Red then green` includes F9's cases and the relay's
`413` case beside the first brief's list.

## Acceptance criteria (added to the first brief's list)

11. F9: `readText` returns `TextRead`; the exactly-`limit` and `limit + 1` cases exist and were
    red before; `grep -n "readText(" src/core/AgentProvider.ts` shows the `.text` read; every
    earlier `readText` assertion still passes on the record shape.
12. The relay answers `413` on `complete: false` before any provider call, proven as above.
