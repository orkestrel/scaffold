# Unit O2-fix report

## Touched files

```
 tests/setup.test.ts                   | 16 +++++-------
 tests/setupServer.ts                  |  4 +--
 tests/src/core/OllamaProvider.test.ts | 47 +++++++++++------------------------
 3 files changed, 23 insertions(+), 44 deletions(-)
```

## Item 1 — F3

Folded `tests/src/core/OllamaProvider.test.ts:627-649` (headers hook, pre-aborted then live
call, `transport (seam)` block) and `:737-760` (`deadline cleanup` block, no headers hook) into
one case in the `transport seam` block: `a pre-aborted call reaches neither the headers hook nor
the transport, and clears the deadline of a refused one`. The kept case adds a
`createRecorder<readonly [AbortSignal]>()` on the headers hook and asserts `signals.count === 0`
after the pre-aborted call rejects, before the live call and the existing
`transport.signals.length === 1` / `signals[0].aborted === false` assertions. The duplicate case
in `deadline cleanup` is deleted; its sibling control comment's "two guards below" was corrected
to "the guard below" since only one guard remains there.

Proof: `npm run test:src:core` — 4 files, 99 tests passing (was 100 before the fold).

## Item 2 — F4

Added to the deadline control's comment (`tests/src/core/OllamaProvider.test.ts`, `aborts the
request the deadline was armed around when that deadline expires`): "The base passes one
combined signal to the header hook and to the transport, which is why the hook's signal stands
in for the transport's in this control."

Proof: `npm run test:src:core` — same run as item 1, control case unchanged in behavior, still
passing.

## Item 3 — F5

`tests/setupServer.ts:185-192`: `RecordedRequest.text` changed from `readonly text?: string` to
`readonly text: string`, doc comment reworded from "Holds the original JSON text when captured
from a request" to "Holds the original JSON text captured from the request" (no producer omits
it).

`tests/setup.test.ts`: added `import type { RecordedRequest } from './setupServer.js'`; the
`requestWithBody` helper's return type is now `RecordedRequest` (was an inline structural
literal missing `text`), and its body now returns `text: JSON.stringify(body)` alongside
`method`, `path`, `headers`, `body`.

Proof: `grep -n "text?: string" tests/setupServer.ts` returns nothing; `npm run test:setup` — 3
files, 96 tests passing; `npm run check` (`tsc --noEmit` over `tsconfig.json` then
`check:src:core`) exits 0, confirming the now-required `text` member is satisfied everywhere in
the checked projects.

## Deviation

None. Every cited line matched the finding's description; all three items stayed inside Owned.

## Status

```
 M tests/setup.test.ts
 M tests/setupServer.ts
 M tests/src/core/OllamaProvider.test.ts
```

## Gate evidence

- `npm run lint:check` — exit 0 (`oxlint --config .oxlintrc.json --deny-warnings .`, no output).
- `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then
  `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`).
- `npm run test:src:core` — 4 test files, 99 tests passing (dropped by one from the pre-fix 100).
- `npm run test:setup` — 3 test files, 96 tests passing.
- `git diff` over the three owned files, greped for `\bany\b`, ` as [A-Za-z]`, `!\.`, `@ts-`,
  `eslint-disable`, `\bprivate\b`, `\bpublic\b`, `\bprotected\b` — no matches.
