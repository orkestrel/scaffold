# Unit VISIT-markdown — report

`implementer` on Claude Opus 5. Complete. No commit, no git state change.

## The advisory as taken

`npx --no-install scaffold audit` at unit start, run before any edit, in
`/home/user/orkestrel/markdown`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The proof work list is therefore one module: `tests/setup.ts`, proved by `tests/setup.test.ts`.
The trailing `dependencies` line is the fleet-wide advisory the brief places out of scope.

## Touched files

| File                   | Change                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `tests/setup.test.ts`  | New. The setup proof for `tests/setup.ts` — 26 cases across 11 `describe` groups (442 lines) |
| `package.json`         | `test:guides` adopted to the planned value; `test:setup` written by `repair`; `test` chain adopted |
| `vite.config.ts`       | `repair` registered the `setup` project and added it to the root `projects` list             |
| `package-lock.json`    | Arrived dirty from the pre-dispatch `^0.0.52` re-pin; unchanged by this unit beyond that     |

Diffstat over owned files, plus the untracked proof:

```text
 package-lock.json | 405 ++++++++++++++++++++++++------------------------------
 package.json      |   9 +-
 vite.config.ts    |  13 +-
 3 files changed, 196 insertions(+), 231 deletions(-)
 tests/setup.test.ts | 442 (new, untracked)
```

`repair` also rewrote 46 vendored `orchestration` and `docs` files (`.agents/**`, `.claude/**`,
`.codex/**`, `CLAUDE.md`). Those are `repair` output, not edits of mine.

## What the proof asserts

The proof's subject is the behavior `tests/setup.ts` exports, and nothing else. Production
behavior reached through those helpers — the parser, the `is*` guards, `flattenText`,
`htmlToMarkdown`, `createProjection` — stays proved by the `src:core` suites; the file's header
comment records that boundary. Each expectation is derived by a route the module cannot share:
string scanning over a builder's output, tag scanning over a corpus entry, parity arithmetic over
a requested depth, or the production call a wrapper is claimed to compose. The case matrices sit
at module scope in the proof rather than in a setup module, because the setup module is the
subject.

`tests/setup.ts` is host-independent and carries no DOM, service, or `node:*` half, so the
browser/service split the brief describes does not apply and the proof states no such carve-out.

| Group                                | Contract asserted                                                                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `assert{Element}Node` family         | Hands back the identical node (`toBe`) on a match; refuses another element with a message naming the element found; refuses `undefined` on the four optional-arity members instead of reading through it |
| `firstBlock`                         | Returns the leading block rather than a later one (proved by two sources with the order swapped); refuses a source that yields no block |
| `assertInlineNode`                   | Unwraps the paragraph and returns its **leading** inline node; refuses a snippet that parses to no block                              |
| `inlineText`                         | Joins in order with nothing between (equals `parts.join('')`, and the reversed array yields `' cba '`); empty array yields `''`        |
| `projectHTML`                        | Applies the HTML parse and the markdown projection in that order — deep-equals `htmlToMarkdown(parseHTML(html))` over every corpus entry |
| `buildProjection`                    | Carries the given parts through and defaults the rest — deep-equals `createProjection` for a partial and for `{}`, same key set        |
| `MARKDOWN_FIXPOINT_CORPUS`           | Non-empty; names and sources unique and non-empty; every `source` and every `rendered` carries both emphasis marker families, which is the parity law each entry anchors |
| `PROJECTION_CORPUS`                  | Non-empty; names and fragments unique; covers every construct the projection emits (18 tags scanned from the entries); every entry closes what it opens, so the whole-corpus concatenation case cannot let one entry absorb its neighbour |
| Adversarial node builders            | `buildCyclicNode` children hold the node itself; `buildHostileNode` throws from each inspected property; `buildDeepInlineNode` / `buildDeepBlockNode` nest exactly the requested levels (0, 1, 7) and bottom out at `text` / `paragraph` |
| Deep markdown source builders        | `buildDeepQuoteInput` repeats `> ` once per level and ends with the text (0, 1, 5); `buildDeepListInput` emits one line per level indenting two spaces further each time, text on the last, empty string at 0; `buildDeepEmphasisInput` alternates emphasis and link outward from the text (0, 1, 2, 7); all three default the text to `leaf` |
| `isBrowserVuePath`                   | Accepts a browser SFC path in each separator family (`/` and `\`, at the root and nested); refuses a sibling environment (`app/core`, `app/server`), a prefix lookalike (`app/browserish`), the other axis (`src/browser`), and an embedded occurrence (`vendor/app/browser`) |
| `TEST_SEED`                          | Reproduces one stream across calls and diverges from `TEST_SEED + 1` — the property `tests/src/core/shapers.test.ts` relies on |

`isBrowserVuePath` has no consumer in this repository (there is no `app/` axis here). The brief
fixes its proof shape, so it is proved as prescribed; recording the absent consumer as an
observation.

## Mutation control

One control for the one proof file. Applied to the assertion's expectation copy inside
`tests/setup.test.ts` — the refusal-message template — never to `tests/setup.ts`, and restored by
the exact inverse edit.

Mutation: `` `expected ${testCase.element}, got ${wrong.element}` `` → `` `expected ${testCase.element}, saw ${wrong.element}` ``

`npm run test:setup` under the mutation, failing line:

```text
AssertionError: expected [Function] to throw error including 'expected heading, saw paragraph' but got 'expected heading, got paragraph'
```

Counts: `Tests  1 failed | 25 passed (26)` mutated, `Tests  26 passed (26)` restored. The
expectation is restored; `format:check` and the full `npm test` afterwards read against the
restored file.

## Visit order executed

1. Proof written: `tests/setup.test.ts`.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. First full `npx --no-install scaffold repair` blocked, as the brief predicted:
   `TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.`
   The advisory's `test:setup is already declared` clause reads against the planned manifest, not
   the declared one — the declared manifest carried no `test:setup` at that point. Recording it as
   an observation; it changed nothing about the recovery the brief names.
4. `npx --no-install scaffold repair --groups manifest` → `1 written, 1 unchanged, 0 removed in ..`, writing
   `"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"`.
5. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'` —
   the planned order read from the installed scaffold's compiler
   (`node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290-4299`), which places
   `test:setup` between `test:config` and `test:guides`.
6. `npx --no-install scaffold repair` clean → `49 written, 78 unchanged, 0 removed in ..`.
7. `npm run format` → `Finished in 2789ms on 143 files using 4 threads.`
8. Gates.

## Retained differing values repair named

None. The one `scripts:` advisory at unit start was `test:guides`, which I adopted; the `test`
chain was forced by the blocked `configs` group and adopted through `npm pkg set`. The closing
`repair` and `audit` name no retained differing script value.

## Gate evidence

Each read bare, in the prescribed order, in `/home/user/orkestrel/markdown`.

| Gate                   | Closing line                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 2813ms on 143 files using 4 threads.` |
| `npm run lint:check`   | no diagnostics; `EXIT=0`                                                            |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json` with no diagnostics; `EXIT=0`      |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`; `EXIT=0`           |
| `npm test`             | `EXIT=0` — `test:src` 542 passed, `test:policy` 93 passed, `test:config` 46 passed, `test:setup` 26 passed, `test:guides` 18 passed |

`npm test` timings are this unit's own reading taken inside its exec; the authoritative run is the
Orchestrator's.

## Acceptance criteria

1. **`scaffold audit` reports no `setup:` advisory at exit.** Met. Closing audit prints one
   advisory line only: `dependencies: typescript declares major 6, while the registry serves major 7.`
   — the fleet-wide line the brief scopes out. `0 of 126 planned paths drifted from the plan.`
2. **Every gate closes green, each read bare.** Met; the preceding table.
3. **One mutation-control failing line per proof file, all restored.** Met; one proof file, one
   control, restored.

## Standing conditions honoured

- `package.json` and `package-lock.json` arrived dirty from the `^0.0.52` re-pin. Kept, not
  reverted; the manifest diff shows `@orkestrel/scaffold ^0.0.51 → ^0.0.52` preserved.
- The foreign paths under `orkestrel-human-journey`, `.claude/agents/codex.md`, and
  `.codex/agents/claude.toml` remain untouched; the closing audit still lists all seven as
  `foreign`, for the Orchestrator to remove at commit.
- `src/**`, `guides/**`, `tests/setup*.ts`, and every other test file are unmodified.
- `tmp/probe/` held a throwaway fact-finding instrument during drafting and is removed; `tmp/`
  now contains `units/` only.

## Deviation state

No deviation. Two observations recorded earlier, neither blocking: the blocked-`configs` advisory
names `test:setup` as declared when it is not, and `isBrowserVuePath` has no consumer in this
repository.
