# Report — `d7n-test-examples`

Done. Every Surface function the examples case named now carries an untitled `@example` block on its
own declaration, and `EventSourceInterface`'s `Shape` cell carries Ruling 27's device. No fence was
added to `guides/test.md`; the doc-block form the brief prefers reached every declaration.

## The red reading, taken first

Command: `PATH=/opt/npm11/bin:$PATH npm run test:guides`, from `/home/user/fleet/test` at `997499c`.

```text
 ❯ tests/guides.test.ts:253:6
 Test Files  1 failed (1)
      Tests  1 failed | 94 passed (95)
```

The failing case is `documents an example for every Surface function`, and its received array named
`isRecorderMapComplete`, `checkBounds`, `buildRetryExhausted`, `dropRegistration`, `decodeJSONLines`,
`requireContained`, `isExcluded`, `readIdentity`, `matchesIdentity`, `readErrorCode`, `createLink`,
`removeTree`, `isRunning`, `waitForSocketClose`, `supportsDirectoryLinks`, `supportsMode`,
`supportsCase`, and `supportsBytes`.

## Per declaration, the block added

Each is an untitled `@example` in the declaration's own doc comment, placed last in the block, after
a blank comment line — the form the package's other example blocks carry.

`src/core/validators.ts`

- `isRecorderMapComplete` — builds a `ReadyEvents` map from `createRecorder`, narrows it, and refuses
  `{ ready: 1 }`.

`src/core/helpers.ts`

- `checkBounds` — an accepted pair answering `undefined`, then the refusal message a negative budget
  raises.
- `buildRetryExhausted` — the built error's `message`, quoted whole, with the last value appended.
- `dropRegistration` — the dropped registration names the installed listener, its cleanup controller
  is aborted, and a second call answers `undefined`.
- `decodeJSONLines` — a decode of a record and a bare number, then the message a malformed
  physical line raises.

`src/server/helpers.ts`

- `requireContained` — the contained absolute answer, then the refusal message naming the escape.
- `readIdentity` — the triple read off a `node:fs` `Stats`, named by that status's own fields.
- `readErrorCode` — `ENOENT` off a real missing-file refusal captured through `captureError`, and
  `undefined` for an error carrying no code.
- `matchesIdentity` — a re-read of one allocation matching, and a differing index node refused.
- `isExcluded` — an ancestor exclusion matching, and a sibling whose name starts the same way
  refused.
- `createLink` — a directory link created, then the destination's file read through it.
- `removeTree` — the tree removed, then `existsSync` reading false.
- `isRunning` — the calling process reading true, and a pid outside the range Node accepts reading
  false.
- `waitForSocketClose` — a loopback server that ends the connection, the wait resolving `undefined`,
  and the client reading destroyed.
- `supportsDirectoryLinks`, `supportsMode`, `supportsCase`, `supportsBytes` — the call with the
  answer each host gives named in the trailing comment, because a fixed literal would be false on the
  other host.

## Readings settled by probe

Every claim in every added block ran under the `probe` Vitest project before the blocks were
accepted, against the real implementations through `@src/core` and `@src/server`. The probe covered
each of the preceding claims, including each exact refusal message, the exhaustion message, the
`ENOENT` read, the link read-through, the socket wait, and this host's answer for each capability
probe. Command and result:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:probe
 Test Files  1 passed (1)
      Tests  14 passed (14)
```

The probe was deleted afterwards (`rm -rf tmp/probe`), as the brief directs.

## Guide change

`guides/test.md:119` — the `EventSourceInterface` row's `Shape` cell reads `` `{} plus on` ``,
replacing `` `on` alone ``. The whole device sits inside one backtick pair, which is the form
`browser/guides/browser.md:235` carries for `BrowserWriterInterface` and the form the brief's
criterion reads. The cell's padding was reduced by one space so the column width is unchanged.

## Per criterion, the command and its last lines

1. `git status --short`

```text
 M guides/test.md
 M src/core/helpers.ts
 M src/core/validators.ts
 M src/server/helpers.ts
```

`git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'`
printed nothing (exit 1 from the final `grep`, which is the empty-match exit).

2. Guide device and untitled blocks

```text
$ grep -c "{} plus on" guides/test.md
1
$ grep -c '`on` alone' guides/test.md
0
$ grep -c '@example [A-Za-z]' src/core/helpers.ts src/core/validators.ts src/server/helpers.ts
src/core/helpers.ts:0
src/core/validators.ts:0
src/server/helpers.ts:0
```

3. Format, lint, typecheck

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/test.md src
All matched files use the correct format.
Finished in 1073ms on 17 files using 4 threads.
oxfmt exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src
oxlint exit=0

$ PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
check exit=0
```

`npx oxfmt --config .oxfmtrc.json --write` ran over the touched paths before these checks and
changed nothing further.

4. Docs parity, at zero in both write directions

```text
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`git status --short` after those runs listed the same files, so neither direction wrote.

5. Suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  95 passed (95)
guides exit=0
```

The named case, run alone under the verbose reporter:

```text
 ✓ |guides| tests/guides.test.ts > Test > documents an example for every Surface function 28ms
```

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
policy exit=0
```

## Decisions taken inside the unit

- Every declaration took the doc-block form; no guide fence was added. The capability probes were
  the candidates for the fence route, because
  `guides/test.md` § Probe what the host supports already narrates them, but that section's fence
  demonstrates the gating idiom once for the family, and a second fence there would restate it per
  probe.
- New blocks sit after a blank comment line, which is the package's dominant form. The existing block
  in `src/server/helpers.ts`, on `requestUpgrade`, has no blank line before its tag and was left as
  it stands, because moving it is outside the unit.
- Paths in the server examples are spelled POSIX-style under a `/scratch` root, matching the guide's
  own scratch prose.

## Deviation state

None. No declaration resisted a truthful short demonstration, and no gate outside the owned files
went red.

## Files touched

- `/home/user/fleet/test/src/core/validators.ts` — an untitled `@example` on `isRecorderMapComplete`.
- `/home/user/fleet/test/src/core/helpers.ts` — untitled `@example` blocks on `checkBounds`,
  `buildRetryExhausted`, `dropRegistration`, and `decodeJSONLines`.
- `/home/user/fleet/test/src/server/helpers.ts` — untitled `@example` blocks on `requireContained`,
  `readIdentity`, `readErrorCode`, `matchesIdentity`, `isExcluded`, `createLink`, `removeTree`,
  `isRunning`, `waitForSocketClose`, `supportsDirectoryLinks`, `supportsMode`, `supportsCase`, and
  `supportsBytes`.
- `/home/user/fleet/test/guides/test.md` — the `EventSourceInterface` `Shape` cell.

Diffstat:

```text
 guides/test.md         |   2 +-
 src/core/helpers.ts    |  45 +++++++++++++++++++
 src/core/validators.ts |  12 +++++
 src/server/helpers.ts  | 120 +++++++++++++++++++++++++++++++++++++++++++++++++
 4 files changed, 178 insertions(+), 1 deletion(-)
```

The unit's instrument is retained at
`/home/user/fleet/test/tmp/d7n-test-examples/insert.py`.
