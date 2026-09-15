# O4 report — `@orkestrel/ollama` guide, README, and parity after the rebuild

Executed 2026-09-14 in `C:\Users\mikes\WebstormProjects\ollama` at baseline `dcb64fe`, sole writer,
no subagents.

## Touched files

- `guides/ollama.md` — rewritten against the rebuilt package: tagline, intro, Surface prose and
  table, Methods, clauses 1–15, the Patterns set, Tests, and See also.
- `README.md` — pitch equal to the tagline, the streaming sample off `process.stdout`, the
  requirements, guide pointer, and package paragraph updated to the core face.
- `guides/README.md` — the toolchain section replaced by a mirrored-dependency section naming the
  runtime and development dependencies as they stand.
- `tests/guides.test.ts` — five executed transcriptions added beside the existing cases, with the
  fence-line presence guards.
- `src/core/helpers.ts` — the five stale TSDoc lines audit O2-R1 F1 names.

```text
 README.md            |  37 ++++----
 guides/README.md     |  50 ++++++-----
 guides/ollama.md     | 250 ++++++++++++++++++++++++++++++++++-----------------
 src/core/helpers.ts  |  12 +--
 tests/guides.test.ts | 213 ++++++++++++++++++++++++++++++++++++++++++-
 5 files changed, 437 insertions(+), 125 deletions(-)
```

`git status --porcelain` lists those five files as modified and nothing else. `git diff --check`
exits 0.

## Parity

`npm run test:guides` before the change: exit 1, 8 failed, 14 passed (22). The failing names, from
the re-run this unit took first:

```text
tests/guides.test.ts > Ollama > documents every barrel export
tests/guides.test.ts > Ollama > documents only barrel exports
tests/guides.test.ts > Ollama > keeps behavioral interfaces and implementing classes in parity
tests/guides.test.ts > Ollama > keeps every compared summary and example equal to its source
tests/guides.test.ts > Ollama > documents an example for every Surface function
tests/guides.test.ts > Ollama > imports only real exports in every ```ts fence
tests/guides.test.ts > Ollama > resolves every relative link
tests/guides.test.ts > Ollama > links only to test files that exist
```

`npm run test:guides` after the change: exit 0, 32 passed (32) — the 22 parity cases plus the 10
executed and presence cases this unit added.

The other acceptance commands, each read-only, exit 0 on the final tree:

| Command                  | Result                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| `npm run format:check`   | exit 0                                                            |
| `npm run lint:check`     | exit 0                                                            |
| `npm run test:guides`    | exit 0; 1 file, 32 tests passed                                   |
| `npm run test:src:core`  | exit 0; 4 files, 99 tests passed — the baseline's own count       |
| `npm run check`          | exit 0 (observation; the brief does not require it)               |
| `npm run test:policy`    | exit 0; 90 passed, 1 skipped (observation; the prose sweep)       |
| `git diff --check`       | exit 0                                                            |

The removed-export grep the brief names returns nothing over `guides/ollama.md` and `README.md`
(exit 1), and so does a grep for `process.stdout` and `process.stderr` over those files and
`guides/README.md`.

The new executed cases were proved able to fail before they were trusted. Mutating four expected
values — `keep_alive` `'9m'` → `'8m'`, the delta list, the relay refusal status `401` → `403`, the
daemon status `404` → `410` — reddened exactly the four cases that own them:

```text
Tests  4 failed | 28 passed (32)
 FAIL  flagship fences > joins the streamed content deltas to the settled result the stream fence reads
 FAIL  flagship fences > answers the seam fence with the projected body, the framed record, and the read increment
 FAIL  flagship fences > refuses the relay hop with an HTTP 401 when the credential does not match
 FAIL  flagship fences > narrows a non-OK daemon status to a ProviderError carrying the HTTP code and status
```

The mutations were reverted from a copy taken before them, and the suite returned to 32 passed.

## Clauses

The Surface table drops `OllamaResponse`, `OllamaHTTPError`, `isOllamaHTTPError`,
`OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`, `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`,
`joinThinking`, and `parseBody`; adds `OLLAMA_CHAT_PATH`; gives `OllamaProvider` the
`AgentProviderInterface` shape cell and its class doc-block paragraph; and renders `OllamaOptions`
as `ProviderOptions plus { model, url?, keepAlive?, options?, think? }`, matching how `agent.md`
renders `RelayProviderOptions`. The Shape legend gained that guide's inheritance sentence.

The contract was rewritten clause by clause. The numbering changed where clauses merged, which the
deviation contract leaves to the executor:

| Now | Was | What changed                                                                                                                                     |
| --- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 1   | Unchanged.                                                                                                                                       |
| 2   | 2   | Imports restated: the base, the contract types, and the errors from `@orkestrel/agent`; `createNDJSONParser` from `@orkestrel/ndjson`; the guards from `@orkestrel/contract`. Names that `src/` no longer imports `@orkestrel/timeout` while the manifest still declares it. |
| 3   | 3   | The body: `stream: true` always, `think`, `keep_alive`, `options`, `format` from a per-call `schema`, function tools. A non-OK status is the base's `ProviderError` with code `HTTP` and the status. |
| 4   | 4   | `think` kept; the splitter named as the base's `split` default, which this class does not override.                                               |
| 5   | 5   | One NDJSON path; `finish` recovers the unterminated final line; `strict` left at its default.                                                     |
| 6   | 6   | Trimmed to what the engine yields and returns.                                                                                                   |
| 7   | 7   | Usage from the `done` line alone, as `read` now gates it.                                                                                         |
| 8   | 8   | Unchanged.                                                                                                                                       |
| 9   | 9   | The parsed-body clause dropped from the narrowing list.                                                                                          |
| 10  | 10–12 | Merged: the deadline, the cancellation rule, the transport seam, and the bounded error read are the base's, and `agent.md` states each once.    |
| 11  | 13  | `format` kept; the exposure now goes through `super`.                                                                                            |
| 12  | 14  | Unchanged.                                                                                                                                       |
| 13  | —   | New: the core face, the scoped core typecheck's libraries, the bound `fetch` receiver, and the Chromium receipt of 2026-09-14 in Chrome 148.      |
| 14  | 15  | Live tests; names the moved hermetic paths and the relay suites.                                                                                  |
| 15  | 16  | Method bijection over `frame`, `body`, `read`, and `finish`, with `generate` and `stream` declared in `AgentProvider`.                            |

## Fences

Every fence imports through published specifiers, and no fence writes to `process.stdout` or
`process.stderr`.

| Fence                                             | State                                                                                 |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| § Surface, `createOllama` + `generate`            | Unchanged.                                                                            |
| § Surface, the driven stream                      | Rewritten onto collected arrays; claims the content deltas concatenate to the result. |
| `createOllama` + `generate` (titled pattern)      | Unchanged, so the titled pair against the source `@example` still compares.            |
| Bounding a call with a budget + timeout           | Kept; the deadline now attributed to the base.                                        |
| Projecting the wire without a daemon              | New; drives `body`, `frame`, `read`, and `finish` directly.                           |
| Running in the browser                            | New; the same `createOllama` call with a remote `url`.                                |
| Relaying through your own server                  | New; the server route over `createRelay`, and the browser `createRelayProvider`.      |
| Routing through your own server (obfuscated tokens) | Kept as the transparent wire proxy; states that it cannot hide the vendor.           |
| Context framing                                   | Kept.                                                                                 |
| Narrowing a failed call with `isProviderError`    | Replaces the `isOllamaHTTPError` pattern.                                             |

The executed transcriptions in `tests/guides.test.ts`, each hermetic over the canned NDJSON
transport `tests/setupServer.ts` already exports:

- `joins the streamed content deltas to the settled result the stream fence reads` — the content
  and thinking channels, and `answer.join('')` equal to the settled `content`.
- `answers the seam fence with the projected body, the framed record, and the read increment` —
  `stream: true`, the `think` override, `keep_alive: '9m'`, the mapped messages, the parsed record,
  the read increment with its usage, and the empty `finish`.
- `names the provider the browser fence builds against a remote url`.
- `round trips the relay fences through a dispatcher in front of the provider` — a real
  `createRelay` handler on a real `@orkestrel/router` dispatcher in front of a real
  `OllamaProvider`, driven by a real `createRelayProvider`, settling with the thinking and the
  usage carried across the hop.
- `refuses the relay hop with an HTTP 401 when the credential does not match` — the `ProviderError`
  shape, and the daemon transport never entered.
- `narrows a non-OK daemon status to a ProviderError carrying the HTTP code and status`.

Each is paired with a presence guard asserting the guide still carries the line the transcription
copies. No existing assertion was removed or weakened.

## Observations

- **The manifest still declares `@orkestrel/timeout` as a runtime dependency** and no module under
  `src/` imports it. `package.json` is off-limits to this unit, so clause 2 and `guides/README.md`
  state the fact rather than hiding it. A successor unit owns the manifest edit.
- **The brief's prior `test:src:core` count of 100 does not match the baseline.** `dcb64fe` itself
  reports 4 files, 99 tests; measured by restoring `src/core/helpers.ts` from `HEAD` and re-running,
  then restoring this unit's copy. The count after the change is the same 99, so criterion 5 holds
  against the measured baseline rather than against the O3 report's figure.
- **`tests/conformance.test.ts` still says the hermetic provider proofs live in
  `tests/src/server/`** (file header). O1 moved them to `tests/src/core/`. The file is off-limits
  here; the guide's Tests section states the real location.
- **The `format` script is banned for this unit,** so the formatter was run over copies outside the
  checkout with the repository's own `oxfmt` binary and configuration, and the formatted copies were
  written back. The differences were table padding, one `if` body wrap, and quote style on two
  strings. `npm run format:check` exits 0 on the tree, and the scratch copies were deleted.
- **`npm run check` exits 0** after the `src/core/helpers.ts` doc edit, and no Summary cell quotes
  any of the five changed lines, so parity is unaffected by them.
- `build`, the whole `test` chain, and `test:service` were not run, as the brief directs.
- Git prints `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied` on
  every invocation; the commands still exit 0.

## Deviation

**Acceptance criterion 4 cannot hold with criterion 2, and the gate decided it.**

- **Expected.** The Methods table names `generate`, `stream`, `frame`, `body`, `read`, and
  `finish` (brief § Transformation step 2, criterion 4), and `npm run test:guides` exits 0
  (criterion 2).
- **Found.** The parity engine compares a method group against the members the *source* declares
  for the group's name. `@orkestrel/guide`'s `#inspectMethods`
  (`node_modules/@orkestrel/guide/dist/src/core/index.js:3652-3670`) reads
  `row.source.methods('OllamaProvider')`, which resolves this package's own declarations —
  `frame`, `body`, `read`, `finish` — because `generate` and `stream` are declared in
  `AgentProvider`, in another package, and `AgentProviderInterface` is declared there too.
- **Evidence.** With the two rows added to the table and nothing else changed:

  ```text
  FAIL  guides  tests/guides.test.ts > Ollama > keeps behavioral interfaces and implementing classes in parity
    "text": "guides/ollama.md documents no source OllamaProvider.generate.",
    "text": "guides/ollama.md documents no source OllamaProvider.stream.",
  Tests  1 failed | 21 passed (22)
  ```

  Removing the rows returns the suite to 32 passed. The probe's guide copy was restored from a
  backup taken before it.
- **Done or not done.** Done, on the gate's terms: the table names `frame`, `body`, `read`, and
  `finish`; the Methods lead paragraph, Surface prose, and clause 15 each state that `generate` and
  `stream` reach a caller through this class and are declared and documented in `@orkestrel/agent`,
  with a link to `agent.md`. Criterion 4 as written is not met and cannot be met while the parity
  gate stands.
- **Hypothesis.** The six-member list was read off `AgentProviderInterface` in `agent.md`, where the
  interface is declared locally and the group therefore resolves; `ollama` declares only the
  subclass, so the same table shape inverts into drift.

No other deviation. Clause numbering, heading names, and row order were decided and recorded in
§ Clauses, as the deviation contract allows.

## Status

O4 is implemented. `format:check`, `lint:check`, `test:guides`, `test:src:core`, and `check` exit 0
on the final tree, the guide's flagship fences are executed rather than asserted by substring, and
the removed exports appear nowhere in the guide or the README. The Methods-table deviation is the
Orchestrator's to rule on. Independent audit, the authoritative gate sweep, and `test:service`
remain with the Orchestrator.
