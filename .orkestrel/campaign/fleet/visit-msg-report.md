# Unit VISIT-msg — report

Done. The advisory's one proof landed, `test:guides` was adopted, `repair` ran clean, and every
gate closes green. Nothing committed. One finding sits outside my owned files and is recorded at
the end.

## The advisory as taken

`npx --no-install scaffold audit` at `/home/user/orkestrel/msg`, before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The `setup:` advisory names one module, so the work list is one proof file: `tests/setup.test.ts`.

## Touched files

- `/home/user/orkestrel/msg/tests/setup.test.ts` — new. The setup proof, covering every export of
  `tests/setup.ts`.
- `/home/user/orkestrel/msg/package.json` — `test:guides` adopted at the planned value, `test`
  chain adopted at the planned value so it invokes `test:setup`, and `test:setup` written by
  `repair`. The `@orkestrel/scaffold` re-pin to `^0.0.52` arrived dirty and was kept.
- `/home/user/orkestrel/msg/vite.config.ts` — `repair` added the `setup` project and registered it
  in `projects`.
- The `orchestration` and `docs` groups — 49 vendored files `repair` wrote or replaced. Not
  authored here.
- `/home/user/orkestrel/msg/package-lock.json` — arrived dirty from the re-pin, untouched by me.

Diffstat of the tracked changes:

```text
 37 files changed, 605 insertions(+), 643 deletions(-)
```

with `tests/setup.test.ts` untracked, plus the untracked vendored additions `repair` wrote
(`.agents/skills/orkestrel-debrief/references/retention.md`, `.agents/skills/orkestrel-prove-journey/`,
`.agents/skills/orkestrel-publish/`, `.agents/templates/`, `.agents/transports/`,
`.claude/skills/orkestrel-prove-journey/`, `.claude/skills/orkestrel-publish/`).

## The proof file and what each case asserts

`tests/setup.test.ts`, 12 cases in the `setup` project. `tests/setup.ts` is host-independent, so
no half of its contract sits out of reach of the Node environment this project runs in. Each case
derives its expectation by a route the module does not share: `TextEncoder` and `TextDecoder`
against the hand-rolled byte loop, a `DataView` read against the byte-wise edits, and a delimiter
scan of the decoded text against the multipart builder.

`asciiBytes`

- Encodes ASCII text to the same bytes the platform encoder produces. Derived by
  `new TextEncoder().encode` over the same string.
- Spends one byte on a latin1 character where UTF-8 would spend two, which is what keeps a
  wire-format fixture byte-exact. Derived by a `TextDecoder('latin1')` round trip and by the
  UTF-8 length being strictly greater. The sample characters sit outside `0x80`–`0x9F`, where
  the `latin1` label's windows-1252 mapping differs from ISO-8859-1.

`patchBytes`

- Lands each edit at its own offset and leaves every other byte alone. Derived by reading the four
  patched bytes back as one little-endian `getUint32` and the untouched window as another — the
  same multi-byte field shape `tests/src/core/MSG.test.ts` writes.
- Returns a copy, so a fixture stays readable at its original bytes after a case patches it.
- Anchors the copy at `byteOffset` 0 over a buffer of exactly its own length, so a reader handed
  that buffer sees the patched window rather than a larger backing region. The input is a
  `subarray` view into a longer array.

`buildEml`

- Writes CRLF header lines, one blank line, then the body verbatim. Derived by splitting the
  decoded text at the first CRLF pair and reconstructing the header pairs, and by comparing the
  returned bytes against `TextEncoder` over the reconstructed message.
- Inserts a header value verbatim, so a `Content-Type` carrying a colon, a semicolon, and quotes
  survives — the property `buildNestedMultipart` builds on.

`buildNestedMultipart`

- Yields a plain `text/plain` message at depth 0, declaring no boundary.
- Nests one multipart level per index, `level0` outermost, closing every boundary it declares.
  Derived by a delimiter scan: each level's opener and closer appear exactly once, the innermost
  part is `text/plain` with the leaf body, and no boundary past the requested depth appears.
- Derives every boundary from its level index, so one depth always yields one message. This is the
  reproducibility `tests/src/core/helpers.test.ts` relies on when it drives a depth-limit refusal
  at depth 60.

`isBrowserVuePath`

- Accepts a browser SFC path in either separator family, `/` and `\`.
- Refuses a sibling environment, a prefix lookalike (`app/browserless/`), and an occurrence below
  the repository root (`packages/app/browser/`).

## Mutation control

One control for the one proof file. The expectation in `patchBytes` › "lands each edit at its own
offset and leaves every other byte alone" was inverted to the big-endian reading of the same
patched field (`0x12345678` → `0x78563412`), `npm run test:setup` was run, then the expectation was
restored.

Failing line:

```text
FAIL  |setup| tests/setup.test.ts > patchBytes > lands each edit at its own offset and leaves every other byte alone
AssertionError: expected 305419896 to be 2018915346 // Object.is equality
      Tests  1 failed | 11 passed (12)
```

Restored, and the project reads `Tests  12 passed (12)` again.

## The visit order as run

Proof written → `test:guides` adopted through `npm pkg set` → `repair` → `npm run format` → gates.

`repair` did not complete in one call. The first full `repair` refused:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

`npx --no-install scaffold repair --groups manifest` wrote `test:setup`, but `repair` retains a
differing declared `test` value, so the block stood. The planned chain order was read from the
installed `@orkestrel/scaffold` at `dist/src/core/index.js:4290-4300`, which places `test:setup`
between `test:config` and `test:guides`. Adopting that value through `npm pkg set` unblocked the
full `repair` (`49 written, 78 unchanged, 0 removed`). The fleet is not consistent here —
`@orkestrel/probe` carries the planned order, `@orkestrel/process` puts `test:setup` last, and
`@orkestrel/ollama` puts it second — so the planned value was taken from the tool rather than from
a sibling.

## Retained differing values repair named

- `test:guides` — named in the opening advisory, adopted at the planned value, per the brief.
- `test` — named through the `projects:` advisory rather than the `scripts:` one. Adopted at the
  planned value, because `repair` cannot write the `configs` group until the chain reaches the
  `setup` project. This is the one adoption beyond `test:guides`, and it was forced by the fixed
  visit order rather than chosen.
- `dependencies: typescript declares major 6, while the registry serves major 7.` — retained, not
  adopted. Outside this unit.
- Seven `foreign` orchestration paths remain, all under the retired `orkestrel-human-journey` name
  plus `.claude/agents/codex.md` and `.codex/agents/claude.toml`. `repair` does not remove what the
  plan does not own; `overwrite` would. Left alone.

## Gates

Each read bare, in order.

```text
npm run format:check   All matched files use the correct format.
                       Finished in 3659ms on 142 files using 4 threads.

npm run lint:check     exit=0   (oxlint --deny-warnings, no diagnostics)

npm run check          exit=0   (tsc --noEmit --project tsconfig.json; tsc --noEmit -p configs/src/tsconfig.core.json)

npm run build          Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
                       exit=0

npm test               exit=0
  test:src      Test Files  6 passed (6)    Tests  178 passed (178)
  test:policy   Test Files  1 passed (1)    Tests   93 passed (93)
  test:config   Test Files  1 passed (1)    Tests   46 passed (46)
  test:setup    Test Files  1 passed (1)    Tests   12 passed (12)
  test:guides   Test Files  1 passed (1)    Tests   18 passed (18)
```

## Acceptance criteria

1. **Met.** `npx --no-install scaffold audit` at exit reports no `setup:` advisory and no
   `scripts:` advisory. Its remaining lines are `dependencies: typescript declares major 6, while
   the registry serves major 7.` and `0 of 126 planned paths drifted from the plan. Audit compared
   bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath
   its groups.`
2. **Met.** Every gate closes green, quoted in the preceding section.
3. **Met.** One mutation-control failing line for the one proof file, restored.

## Deviation state

No deviation. The one reported module's exports are all provable under the fixed shape, and no gate
failed.

## Finding outside this unit's owned files

`patchBytes` does not copy a `Buffer` source, so its documented "returns a COPY, `source` itself is
never mutated" contract does not hold for the input its own consumer passes. `tests/setup.ts` is
off-limits to this unit, so this is recorded rather than fixed.

`patchBytes` copies through `source.slice()`. `Buffer` overrides `Uint8Array.prototype.slice` to
return a view sharing the source's memory, so the writes land in the source. Measured on the host,
Node v22.22.2, against the real fixture:

```text
source is a Buffer: true
source byte 0 before: 208 after patchBytes: 0
source mutated by patchBytes: true
patched shares source memory: true
```

`tests/src/core/MSG.test.ts:33-35` declares `readFixture` as returning `Uint8Array` while
`readFileSync` hands back a `Buffer`, and its three `patchBytes` call sites (lines 118, 155, 189)
therefore mutate the fixture bytes they were handed. No current verdict changes: each case re-reads
the fixture, and each reads the header values it needs before patching, so nothing observes the
mutation. It is latent — a case that read a header value after patching would read the patched
byte and report a product defect.

The proof file records the boundary in a comment above the `patchBytes` block and asserts the copy
contract over the `Uint8Array` the signature declares. The fix belongs to whoever owns
`tests/setup.ts`: change `source.slice()` to `Uint8Array.prototype.slice.call(source)`, or
construct the copy with `new Uint8Array(source)`, then widen the proof's copy case to a `Buffer`
input.
