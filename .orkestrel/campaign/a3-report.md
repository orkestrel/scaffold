# Unit A3 report — `@orkestrel/agent` guide, README, and parity for the provider base and the relay

**Status: stopped on a deviation.** Every step of the transformation landed and every acceptance
criterion is met except criterion 2: `npm run test:guides` still reports one failure, and that
failure is not resolvable from an owned file. `@orkestrel/guide@0.0.18`'s reflection grammar cannot
see an `export abstract class`, so `AgentProvider` is invisible to the gate — it can be neither
documented as a Surface row nor imported in a guide fence. Details under § Deviation.

## Touched files

| File                        | Change                                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `guides/agent.md`           | Tagline, intro, new Surface subsections, every new export's row, new Methods tables, rewritten and added Contract clauses, new Patterns, new Tests rows, new See also rows |
| `README.md`                 | Pitch equalled to the new tagline; the usage paragraph and the Guide section name the engine and the relay |
| `guides/README.md`          | Concept index names the new classes beside `Agent`; directory index adds `src/core/providers`               |
| `tests/guides.test.ts`      | Transcribes and executes the two new flagship fences and the wire-contract fence; keeps every prior assertion |
| `src/core/AgentProvider.ts` | `@example` titled `Writing a provider for a new wire`, so parity compares it with the guide fence           |
| `src/core/factories.ts`     | `createRelay`'s `@example` titled `Relaying a browser provider through your own server`, same reason        |

The `git diff --stat` command reports:

```text
 README.md                 |  29 ++---
 guides/README.md          |  18 ++-
 guides/agent.md           | 285 +++++++++++++++++++++++++++++++++++++++++++---
 src/core/AgentProvider.ts |   2 +-
 src/core/factories.ts     |   2 +-
 tests/guides.test.ts      | 197 ++++++++++++++++++++++++++++++++
 6 files changed, 497 insertions(+), 36 deletions(-)
```

No other file was written. `tests/setup.ts` needed no addition: it already exports `createParser`,
the newline-delimited JSON parser stand-in the relay transcription substitutes for
`@orkestrel/ndjson`.

## Parity

Before, at `5d288d7` (`npm run test:guides`): **1 file failed, 3 tests failed, 27 passed**. The
failing names and what each reported:

- `documents every barrel export` — the undocumented exports the log at `tmp/units/a3-guides-before.log.txt` enumerates.
- `keeps behavioral interfaces and implementing classes in parity` — `AgentProviderInterface`,
  `ProviderParserInterface`, and `RelayProvider` declared members with no method table.
- `keeps every compared summary and example equal to its source` — the `isMessage` summary drift.

After (`npm run test:guides`): **1 file failed, 1 test failed, 38 passed**. Every failing name
listed earlier is green. The single remaining failure is
`imports only real exports in every ```ts fence`, reporting
`guides/agent.md imports missing AgentProvider from @orkestrel/agent.`

Scoped validation, each run on this host on 2026-09-14:

| Command                  | Result                                                     |
| ------------------------ | ---------------------------------------------------------- |
| `npm run format:check`   | Exit 0                                                     |
| `npm run lint:check`     | Exit 0                                                     |
| `npm run check`          | Exit 0 (`tsconfig.json` plus `configs/src/tsconfig.core.json`) |
| `npm run test:guides`    | Exit 1 — 1 failed, 38 passed (39)                          |
| `npm run test:src:core`  | Exit 0 — 23 files, 751 tests passed, unchanged from baseline |
| `git diff --check`       | Exit 0                                                     |

## Clauses

Rewritten:

- **1** — records that an `abstract class` sits outside the reflection grammar the parity gate reads, so `AgentProvider` carries no Surface row and its contract does.
- **2** — retitled `` `ProviderInterface` is the inference boundary; `AgentProvider` is the engine behind it``; the false sentence "This module defines only the contract" is replaced by what the module now defines: the contract plus the host-independent HTTP engine, with one vendor's wire left to the concrete provider.
- **3** — separates raw-wire splitting from already-separated relay deltas: a raw wire runs a `ThinkSplitter` armed by `split`, and a relay constructs with `split: false` because the upstream already ruled on that text.
- **5** — retitled `The caller's signal and the engine's own deadline both bound the call`; replaces the parenthetical deferral with the base's own `Timeout`, the `AbortSignal.any` fold, and the `finally` clear on every exit.
- **6** — retitled `A local cancel and a remotely reported one are different failures`; distinguishes a locally assembled partial (with a raced throw riding as `cause`) from a relay `abort` frame that propagates unchanged while the local signal stays unaborted, and states that a local cancel outranks the wire.

Added:

- **34** — the provider engine and its seams: what the base owns per call, what a subclass fills, `split` and `strict`, the authoritative `result` record, the bounded error read with its documented one-source-chunk overshoot, reader-owned cancellation in `readText` and `readChunks`, and the nested cleanup `finally` blocks.
- **35** — the wire shapes and the compiled contracts: projections strictly narrower than the domain, `caller` never crossing a wire, the closed round trip, and the owned JSON snapshot `body` validates and sends.
- **36** — the relay protocol: the request body, the frame vocabulary with the error frame as `{ channel: 'error', message }`, `RelayProvider`'s `split: false` / `strict: true`, `authorize` and its body-consumption and origin/CSRF obligations, `413` at the limit rather than above it, `401`, `400`, `502`, the fixed error message, cancellation in both directions, what a disconnected client cannot recover, how a refusal reaches the browser as a `ProviderError` with code `HTTP`, and the honest browser limit (the core scope's typecheck, the bound `fetch` receiver, and the Chromium receipt — not a browser test project).
- **37** — `ProviderError` and its codes: the `provider error: <status>` message form, the ` - <excerpt>` suffix only when the body carried text, the `(error body unavailable)` form with its `cause`, and each code's producers.

## Fences

New guide fences and the assertion each now carries in `tests/guides.test.ts`:

| Fence                                                            | Executed assertion                                                                                     |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Patterns → `Writing a provider for a new wire` (equal to `AgentProvider`'s `@example`) | `streams and settles a turn through the provider-subclass fence` — builds `TextFrame` / `TextProvider` exactly as the fence declares them, drives a real `Response` fixture, and asserts the yielded deltas, the settled `{ content: 'one two' }`, the posted body, and `name` |
| Same fence, its `super({ ...options, path: '/generate' })` line   | `posts the subclass fence's path onto its url` — asserts the request URL is `https://text.test/generate` |
| Same fence                                                        | `carries the provider-subclass fence lines the transcription copies` — presence guards on the class head, `name`, the `super` call, and `read` |
| Patterns → `Relaying a browser provider through your own server` (equal to `createRelay`'s `@example`) | `round trips the relay fence's composition in process` — `createRelay` driven through a `fetch` that calls the handler; asserts `{ content: 'relayed answer' }` and `browser.name === 'relay'` |
| Same fence                                                        | `refuses the relay fence's hop when the bearer does not match` — asserts `ProviderError`, code `HTTP`, status `401`, message `provider error: 401`, and that the upstream provider was never entered |
| Surface → `The relay` fence, its `limit: 65_536` comment          | `refuses a relay body at its byte limit and admits one below it` — measures the projected body's byte length, asserts `413` at exactly that limit with the upstream never entered, and a normal result one byte above it |
| Same fence                                                        | `carries the relay fence lines the transcription copies` — presence guards on the limit comment, both factory calls, the `authorize` line, and the parser argument |
| Surface → `Shapes and contracts` fence                            | `answers the wire-contract fence's guard readings` — asserts `relayFrameContract.is` returns `true` for `{ channel: 'error', message }` and `false` for the same frame carrying a decorative `code` |
| Same fence                                                        | `carries the wire-contract fence lines the transcription copies` — presence guards on both commented lines |

Each test is named for what it proves. Every prior assertion in the file is unchanged, and no gate
was weakened.

## Observations

- **Source `@example` tags were titled**, which the brief's Scope permits and step 4 directs. `AgentProvider`'s became `Writing a provider for a new wire` and `createRelay`'s became `Relaying a browser provider through your own server`, so `findDrift` compares each with the guide heading of that title and the fences stay equal. `createRelayProvider`'s and `RelayProvider`'s examples were left untitled deliberately: `RelayProvider`'s differs (`new RelayProvider` rather than `createRelayProvider`), and titling identical text on several declarations would make which one is compared depend on file order. No TSDoc description paragraph was edited.
- **The `isMessage` drift was fixed toward the source**, as the brief directs. The guide row now reads `Checks whether a value satisfies the domain conversation-message contract.` The `joinThinking` row needed no change; the gate reported no drift on it.
- **`AgentProviderInterface`'s Methods table lists `generate`, `stream`, `frame`, `body`, `read`, and `finish`**, which is what the brief predicted. The gate resolves the inherited members through `extends ProviderInterface` and reports `does not document AgentProviderInterface.generate` when they are omitted. Their `Summary` cells therefore repeat `ProviderInterface`'s doc-block paragraphs verbatim, which is what `findDrift` compares them against — `AgentProvider`'s own wording for those members drifts.
- **The unknown in the brief is answered.** The `Shape` question never arises for an abstract class row, because no such row can exist (see § Deviation). The gate reads only the `Kind` and `Summary` columns of a Surface table; `Shape` is a house convention `@orkestrel/guide` does not inspect. A new `### Shapes and contracts` subsection carries the wire shapes and the compiled contracts, with its own `Shape`-cell rule stated in its preamble, because the Constants subsection's rule ("the constant's declared type") does not describe them usefully.
- **`RelayStream` takes a Surface row and no Methods table**, as the brief predicted; the gate did not ask for one.
- **`guides/README.md`'s concept index stays one manifest row.** Splitting it into per-class rows would point the parity gate at a narrower source scope per row and fail every bijection check, so the row's `Concept` cell names the classes and a sentence beneath the table explains why one guide covers them.
- **Markdown table padding** in `guides/agent.md`, `README.md`, and `guides/README.md` was normalized with a scratchpad script that reproduces the committed file byte-for-byte when run against `HEAD`, so the only table-width changes in the diff are in tables this unit touched.
- **`oxfmt` formats Markdown.** `npm run format:check` caught a stray blank line in `guides/agent.md` and a wrap in `tests/guides.test.ts`. Each was fixed by hand after diffing a scratchpad copy that `oxfmt --write` had rewritten; no mutating command ran in the checkout.
- `tmp/probe/` holds only the files that predate this unit; every instrument this unit created lives in the session scratchpad.
- `npm run build` and the whole `test` chain were not run, as the brief directs.

## Deviation

**Deviation, unresolved, blocking acceptance criterion 2.**

**Expected.** `npm run test:guides` exits 0 with `AgentProvider` documented as a Surface row and
imported by the flagship subclass fence through the published specifier.

**Found.** Both are impossible. `@orkestrel/guide@0.0.18` reflects a module's exports with this
grammar, at `node_modules/@orkestrel/guide/dist/src/core/index.js:2070`:

```js
/^export (?:async )?(function\*?|class|const|interface|type) (\w+)/.exec(line.code)
```

`src/core/AgentProvider.ts:73` declares `export abstract class AgentProvider<`, which the pattern
does not match, so `AgentProvider` appears in neither `source.exports()` nor `source.surface()`.
Executed reading:

```text
"export abstract class AgentProvider<"            -> NO MATCH
"export class RelayProvider extends AgentProvider {" -> [ 'class', 'RelayProvider' ]
"export interface AgentProviderInterface<"        -> [ 'interface', 'AgentProviderInterface' ]
```

Each consequence was measured by running the gate:

- With an `AgentProvider` row of kind `class` in the Classes table, `documents only barrel exports` fails with `[ 'class AgentProvider' ]`. The row was removed.
- The import check reads `source.surface()`, not the documented surface, so adding the row does not satisfy it: with the row present, both `documents only barrel exports` and `imports only real exports` fail together.
- With the row absent, `imports only real exports in every ```ts fence` fails on the fence's `import { AgentProvider } from '@orkestrel/agent'` — a false positive, because `dist/src/core/index.d.ts` and `tmp/units/a3-exports.txt` both list `AgentProvider` as a real export.

**Done.** Everything else in the transformation: every other export documented, every Methods table,
every clause, the patterns with their executed transcriptions, the README and index, and the writing
sweep. `format:check`, `lint:check`, `check`, and `test:src:core` all exit 0. The gate is at 38
passed, 1 failed.

**Not done.** Acceptance criterion 2. The gate does not exit 0.

**A verified workaround, not applied.** Rewriting the fence's import as
`import * as agent from '@orkestrel/agent'` removes this finding — measured mid-unit: the run reported
29 passed with the import finding gone, its only failure being the method-table gap that later work
closed. It is not applied because the fence is `AgentProvider`'s own `@example`,
which unit A1-fix wrote to close the subjective lane's finding F4, and the titled pair must stay
equal, so the change would also degrade the source TSDoc that `@orkestrel/ollama`'s O2 unit reads
when it rebuilds `OllamaProvider extends AgentProvider`. Rewriting correct documentation to satisfy
a tool's false positive is suppressing a parity failure rather than correcting drift, and the drift
is in the tool.

**Hypothesis.** `@orkestrel/guide`'s export grammar needs `(?:abstract )?` before `class` — the same
gap will hide every abstract class any fleet package exports.

**The Orchestrator's decision.** Fix and republish `@orkestrel/guide`, then re-pin here and re-run;
or accept the namespace-import workaround in both the guide and the source TSDoc; or accept this
one failing assertion until the dependency moves.

## Status

The `git status --porcelain` command reports:

```text
 M README.md
 M guides/README.md
 M guides/agent.md
 M src/core/AgentProvider.ts
 M src/core/factories.ts
 M tests/guides.test.ts
```
