PD5 complete. Report follows.

## Flip site

`/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:454` — inside `TypeStage.#issue`, the `diagnostic.file === undefined` branch. Re-derived by tracing every `#issue` path: `LintStage.#issues` publishes only diagnostics carrying a URI, `RuntimeStage.#issue` classifies stack frames, and `Probe.ts` has no file-less door. Baseline line was `TypeStage.ts:449 return { origin: 'instrument', path: project, message }`.

```ts
return { origin: 'workspace', path: project, message }
```

The caller-selected door above it is unchanged (`claimant`/`refused`, thrown).

## Helper

`/home/user/orkestrel/probe/src/server/helpers.ts:226`

```ts
export function relativeWorkspaceMessage(workspace: string, message: string): string
```

It removes each spelling of the workspace root — the `file:` URL, the forward-slash path, the native path — and then removes the `createRevisionFile` revision marker, so a generated specification is named by the test it was minted from. Call sites: `TypeStage.#translate` (`TypeStage.ts:377`, which now serves both the config-parse failures and every diagnostic `#issue` renders) and `RuntimeStage.#issue` (`RuntimeStage.ts:888`).

**Design correction inside the unit (ancillary, decided and recorded):** the first draft normalized the whole message, which is what `TypeStage.#translate` did at baseline. A probe (`tmp/probe/message-escapes.test.ts`, deleted) showed Vitest 4.1.11 renders `expect('line1\nline2').toBe('other')` as `expected 'line1\nline2' to be 'other'` with a literal backslash, so whole-message normalization rewrites `line1\nline2` to `line1/nline2` and corrupts claimant evidence. The shipped helper rewrites root spellings only. On Windows the surviving path keeps the tool's separator; that limit is stated in the helper's remarks.

## Red then green

| Pin | Command | Red | Green |
| --- | --- | --- | --- |
| Party flip | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/TypeStage.test.ts -t 'splits a fileless project diagnostic by who selected the project'` | 1 failed \| 21 skipped (`+ "origin": "instrument"` against expected `workspace`) | 1 passed \| 21 skipped |
| Runtime message | `npx vitest run … --project src:server tests/src/server/stages/RuntimeStage.test.ts -t 'names the declared test in a reported message'` | 1 failed \| 38 skipped, received `ran file:///home/user/orkestrel/probe/tmp/probe/runtime-message-ffba0d78-….test.probe-20491-56438d0f-….ts` | 1 passed \| 38 skipped |
| Helper unit tests | `npx vitest run … --project src:server tests/src/server/helpers.test.ts` | 4 failed \| 33 passed (`relativeWorkspaceMessage is not a function`) | 38 passed |
| Escaped-text boundary | `npx vitest run … tests/src/server/helpers.test.ts -t 'leaves the text around a path exactly as the tool wrote it'` | 1 failed \| 37 skipped, received `expected 'line1/nline2' to be 'other'` | 1 passed |

Each red was taken against the baseline source (`git show a281141:… > scratchpad`, copied in, run, copied back); the escaped-text red was taken against the discarded whole-message variant. `git diff --stat` after every restore showed only the unit's own insertions.

## Flipped existing pins

- `tests/src/server/stages/TypeStage.test.ts:199-207` — `splits a fileless project diagnostic by who selected the project`: `origin: 'instrument'` → `origin: 'workspace'` for the inferred-project half. Reason: ruling 6; the inferred project is the workspace's own declaration, so the target tree holds the only file that closes the diagnostic. The caller-named half of the same test (`claimant`/`refused`) is untouched.

No other existing pin changed. `RuntimeStage.test.ts:1263` still pins the cleanup issue's `path` to the generated `.probe-` name, which is correct and outside `#issue`: that issue names the file that could not be deleted.

## Gate tails

- `npx oxlint --config .oxlintrc.json --deny-warnings <6 owned files>` → exit 0.
- `npx oxfmt --config .oxfmtrc.json --check <6 owned files>` → `All matched files use the correct format.` (`oxfmt --write` was run on `tests/src/server/stages/RuntimeStage.test.ts` alone.)
- `npm run check:src:server` → `tsc --noEmit -p configs/src/tsconfig.server.json`, exit 0. Script name verified in `package.json`.
- `npx tsc --noEmit -p tsconfig.json` (covers the tests) → exit 0.
- `npm run test:src:server` → `Test Files 7 passed (7) | Tests 160 passed (160)`, 122.57 s.
- `npm run test:src:core` → 30 passed. `npm run test:src:bin` → 11 passed. `npm run test:policy` → 93 passed.

## Observations for the Orchestrator

1. **`npm run test:guides` is red by design of this unit: 1 failed | 12 passed.** `guides parity › documents every public export` reports `relativeWorkspaceMessage` missing from the guide's `## Surface`. PD6 carries it, plus `guides/probe.md:218`, whose `TypeStageInterface.inspect` row still says a file-less diagnostic "reports an `instrument` issue for an inferred one" — now false. The `workspace`-issue prose at `guides/probe.md:287-291` can gain the same case. The failure table at `guides/probe.md:331` stays true: it rules on thrown `ProbeError` pairs, and the caller-named door is unchanged.
2. **One timing failure under load, not reproducible alone.** The first full `npm run test:src:server` after the redesign reported `1 failed | 159 passed` at `RuntimeStage.test.ts:1090` (`raises progress for the caller's run and lowers it before the stage's cleanup`, a FIFO-rendezvous proof). Re-run alone: 2 passed | 37 skipped. Re-run whole project: 160 passed. Both readings given; the authoritative run is yours after this unit exits.
3. `src/server/types.ts` and `src/server/Probe.ts` were in scope and needed no edit — no public shape moved, and `Issue.origin` already admits `workspace`.
4. `TypeStage.#translate` lost its `path` parameter; general root removal makes it redundant, and both throwing call sites were updated in the same change.

## Tree

```
 src/server/helpers.ts                        | 53 +++++++++++++++++++
 src/server/stages/RuntimeStage.ts            |  7 ++-
 src/server/stages/TypeStage.ts               | 29 ++++++-----
 tests/src/server/helpers.test.ts             | 77 +++++++++++++++++++++++++++-
 tests/src/server/stages/RuntimeStage.test.ts | 28 +++++++++-
 tests/src/server/stages/TypeStage.test.ts    |  5 +-
 6 files changed, 182 insertions(+), 17 deletions(-)
```

`git status --porcelain`:

```
 M src/server/helpers.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

No commits, no guide edits, no off-limits file touched, `tmp/probe` left empty.

**Deviations: none.** The whole-message-normalization decision was ancillary wording and mechanism inside the owned files, decided and recorded here.