# Unit A2-fix-r3 report

## Touched files

`git diff --stat` (checkout `C:\Users\mikes\WebstormProjects\agent`, base `057871c`):

```
 guides/agent.md                                 | 6 +++---
 src/core/providers/RelayProvider.ts              | 8 +++++---
 tests/setup.ts                                   | 3 +++
 tests/src/core/providers/RelayProvider.test.ts   | 4 +---
 4 files changed, 12 insertions(+), 9 deletions(-)
```

## Per item

**P1 — the serializer sentence, precise.** Rewrote the imprecise "ignored"/"refuses no
serializer" wording at three sites to the precise rule the brief gives: the wire body is an
owned snapshot read through property descriptors, so a serializer reachable only through a `get`
trap or a prototype is never consulted; an own function-valued property such as a `toJSON`
method is a value outside JSON and is refused before fetching, with the clone's failure as the
refusal's `cause`.
- `src/core/providers/RelayProvider.ts` `@remarks` (class doc block).
- `guides/agent.md` line 443, the relay paragraph in § Surface → The relay.
- `guides/agent.md` claim 35, the wire-shapes clause (`The wire body is an owned snapshot`
  sentence), keeping the surrounding "snapshot is the sole mechanism … hostile read … snapshot
  the contract rejects" clause by folding it onto the end of the corrected sentence.
The `Summary` cell at `guides/agent.md:473` ("Carries provider calls over an authenticated
NDJSON relay endpoint.") equals the class doc block's first description paragraph, which this
edit did not touch, so parity holds.

**P2 — the shared fixture in the setup module.** Moved `RELAY_RESULT_FRAME` from
`tests/src/core/providers/RelayProvider.test.ts` into `tests/setup.ts`, beside
`RELAY_WIRE_FRAMES`, as an exported constant with a one-sentence doc block ("Supplies one settled
NDJSON turn, enough for a call that must reach the transport and return."), and imported it in
the test file in place of the local declaration.

**P3 — the type import first.** `createRelay`'s `@example` fence
(`src/core/factories.ts:80`), `createRelayProvider`'s fence (`src/core/factories.ts:143`), and
their guide mirrors under "Mounting the relay on your server" and "Reaching the relay from the
browser" (`guides/agent.md:1098`, `guides/agent.md:1123`) already place `import type` before
value imports; no change needed there. Found and fixed one further relay fence A2-fix-r2 left
disordered: the combined `createRelay`/`createRelayProvider` demonstration in § Surface → The
relay (`guides/agent.md:418`) had the value import before `import type { ProviderInterface }`;
reordered so the type import comes first. This fence has no byte-equal source counterpart (it
composes both factories), so no source fence needed a matching edit.

**P4 — no count phrase.** Verified only; changed nothing. `grep -n "composes the two" src/core -r`
returns no matches (exit 1).

## Gate commands and counts

- `npm run format:check` — exit 0, "All matched files use the correct format." (87 files).
- `npm run lint:check` — exit 0 (no output after the one `policy(no-malformed-summary)` finding
  on the newly added `RELAY_RESULT_FRAME` doc block was fixed by rewording it to start with
  "Supplies").
- `npm run check` — exit 0 (`tsc --noEmit` for the root project and `check:src:core`).
- `npm run test:src:core` — 23 files / 753 tests passed, matching the prior count.
- `npm run test:guides` — 1 file / 43 tests passed, matching the prior count.
- `grep -n "RELAY_RESULT_FRAME" tests/src/core/providers/RelayProvider.test.ts` — shows only the
  import (line 21) and the three usage sites (lines 26, 47, 73); no local declaration remains.
- `grep -n "composes the two" src/core -r` — no matches.

## Deviation

None. Every item closed inside the owned files: `src/core/providers/RelayProvider.ts` (doc
block), `guides/agent.md` (the P1 sentences and the P3 fences), `tests/setup.ts` (the moved
fixture), and `tests/src/core/providers/RelayProvider.test.ts` (the import).

## Status

`git status --porcelain` (checkout `C:\Users\mikes\WebstormProjects\agent`):

```
 M guides/agent.md
 M src/core/providers/RelayProvider.ts
 M tests/setup.ts
 M tests/src/core/providers/RelayProvider.test.ts
```
