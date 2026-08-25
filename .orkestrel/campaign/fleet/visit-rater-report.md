# Unit VISIT-rater — report

Done. The advisory's single module is proven, `test:guides` and the forced `test` chain are
adopted, `repair` runs clean, and every gate closes green. Nothing is committed.

## The advisory as taken

`npx --no-install scaffold audit` at `/home/user/orkestrel/rater`, before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The `setup:` advisory names one module, `tests/setup.ts`, so the proof work list is one file:
`tests/setup.test.ts`. The `dependencies:` advisory is the fleet-wide one the brief excludes.

## Touched files

| File                                 | Change                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| `tests/setup.test.ts`                | New. The proof of `tests/setup.ts`, in the `setup` project.                         |
| `package.json`                       | `test:guides` adopted, `test:setup` written by `repair`, `test` chain adopted.      |
| `vite.config.ts`                     | `repair` added the `setup` project and registered it between `config` and `guides`. |
| Orchestration and agent files, `CLAUDE.md`, `.claude/rules/documentation.md`, `.agents/**` | `repair` regenerated the vendored `orchestration` group. |
| `package-lock.json`                  | Arrived dirty from the 0.0.52 re-pin; untouched by this unit beyond that.           |

Diffstat over tracked files, plus the untracked additions:

```text
 CLAUDE.md                                          |   4 +-
 package-lock.json                                  | 423 +++++++++------------
 package.json                                       |   9 +-
 vite.config.ts                                     |  13 +-
 37 files changed, 575 insertions(+), 673 deletions(-)

?? .agents/skills/orkestrel-debrief/references/retention.md
?? .agents/skills/orkestrel-prove-journey/
?? .agents/skills/orkestrel-publish/
?? .agents/templates/
?? .agents/transports/
?? .claude/skills/orkestrel-prove-journey/
?? .claude/skills/orkestrel-publish/
?? tests/setup.test.ts
```

The foreign paths the brief names — the retired `orkestrel-human-journey` family,
`.claude/agents/codex.md`, `.codex/agents/claude.toml` — are untouched.

## The proof and what each case asserts

`tests/setup.test.ts` covers `tests/setup.ts`. `tests/setup.ts` is host-independent, so no
browser or service split applies and the whole module is reachable from Node. Every rating
expectation runs through `@orkestrel/reason`'s real engine and is compared against a value
computed from the builder's own arguments, which is a route the module's builders do not share:
the builder states a claim, the engine answers it, and the arithmetic in the test decides.
`describe`, `it`, and `expect` stay out of `tests/setup.ts`; the proof imports the module and
asserts.

Cases, by the contract each pins:

- **Recorder bookkeeping.** `createTotalRecorder` answers every call with the sentinel, keeps the
  exact argument arrays in call order, and reports `count` as `calls.length`.
- **Freeze reach.** `deepFreeze` returns the same reference, freezes the root, a nested record, a
  nested array, and that array's own member, and a nested write throws `TypeError`. The second
  route is `Object.isFrozen` plus the strict-mode write, neither of which the module performs.
- **Leaf pass-through.** `deepFreeze` returns a number and `undefined` unchanged.
- **Overflow table.** `EXTREME_NUMBERS` is frozen, every member is finite by `Number.isFinite`,
  and a left-to-right `reduce` accumulates to `Number.POSITIVE_INFINITY` — the structural
  invariant and the membership the consuming edge-case suites rely on.
- **Subject builder.** `createSubject` defaults to `id` and `seats`, lets overrides replace and
  extend, and returns a fresh object per call.
- **Subject independence of a static rate.** `createStaticRate('flat', 7)` rates to 7 across the
  default subject, a subject carrying unrelated fields, and a bare `{ id }`.
- **Line identity.** `createLine` names the line and its rate for the id, and the rate resolves to
  the line value.
- **Quote rate.** `createQuoteRate` rates the documented base alone when `seats` fails its check,
  and base plus the seat count when it clears — asserted as `100 + seats` against the seat count
  the test supplied. Neither case fails the rate.
- **Lookup failure line.** Fails with an error naming `region` for a subject off the table, and
  succeeds at the table's value for `west`, which is the membership the fixture claims.
- **Check failure line.** Fails with an error naming `flag` at the threshold, and succeeds one
  above it. This pins the boundary the `above` comparison sets.
- **Engine composition.** `createEngine` registers the quantitative reasoner alone and refuses
  `supports('logical')`; `createEngine({ logical: true })` registers both and supports it. Read
  through `reasoners()` and `supports()`.
- **Stub engine.** `createStubEngine` answers a single-subject call with the supplied result by
  identity and a multi-subject call with a one-element array of it, whatever definition is passed,
  and its remaining members stay inert: empty `reasoners()`, `undefined` `reasoner()`, `false`
  `supports()`, and a valid empty `validate()`.
- **Worksheet stub.** `createWorksheet` builds a successful zero-valued worksheet and overrides
  replace only the named fields.
- **Line result stub.** `createLineResult` omits `amount` entirely and reports `success: false`
  when none is supplied, and carries it with `success: true` when one is.

Production behavior stays in `tests/src/core/**` and is not re-proven here. No case is a census of
exported names.

## Mutation control

One control for the one proof file. `expect(chargedValue).toBe(100 + seats)` was copied to
`toBe(100 - seats)` in the quote case, the project was run, and the file was restored from a
scratch copy.

Failing line, from `npm run test:setup` with the mutation in place:

```text
 FAIL  |setup| tests/setup.test.ts > setup — subjects and rates > adds the checked seat count to the quote base and drops it when the check fails
AssertionError: expected 104 to be 96 // Object.is equality
 ❯ tests/setup.test.ts:112:24
```

`Tests  1 failed | 13 passed (14)` with the mutation; `Tests  14 passed (14)` after the restore.
The restored line reads `expect(chargedValue).toBe(100 + seats)` and no `100 - seats` remains.

## The visit

Order run: proof written → `test:guides` adopted through `npm pkg set` → `npx --no-install
scaffold repair` blocked its `configs` group → `npx --no-install scaffold repair --groups
manifest` wrote `test:setup` → `test` chain adopted through `npm pkg set` → full `repair` clean →
`npm run format` → gates.

The blocked first `repair` reported:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

The planned `test` order was read from the installed compiler at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290-4299`, which places
`npm run test:setup` after `npm run test:config` and before `npm run test:guides`. The adopted
chain matches:

```text
npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides
```

**Retained differing values `repair` named.** None. The `scripts:` advisory covered `test:guides`
alone, it was adopted before the first `repair`, and no later `repair` or `audit` run named a
retained differing value. Re-running `repair` after the visit reports
`0 written, 127 unchanged, 0 removed in ..`.

**Audit at exit.** The `setup:` and `scripts:` advisories are gone. What remains is the
fleet-wide `dependencies: typescript declares major 6, while the registry serves major 7.` and
the seven foreign paths the plan does not own.

## Gates

Each run bare at `/home/user/orkestrel/rater`, in order.

| Gate                   | Closing line                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 3231ms on 141 files using 4 threads.`    |
| `npm run lint:check`   | No diagnostics; exit 0.                                                                             |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics; exit 0.                            |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`; exit 0.                             |
| `npm test`             | `src:core` 131 passed, `policy` 93 passed, `config` 46 passed, `setup` 14 passed, `guides` 18 passed; exit 0. |

## Acceptance criteria

1. **Met.** `npx --no-install scaffold audit` reports no `setup:` advisory at exit.
2. **Met.** Every gate closes green, each read bare.
3. **Met.** One mutation-control failing line reported for the one proof file, restored.

## Observations

- The first full `repair` reported `test:setup is already declared, so the gate is missing rather
  than the script` at a moment when `test:setup` was not declared. `npm pkg get scripts` run
  immediately after that message listed no `test:setup`, and the subsequent
  `repair --groups manifest` wrote it as a new entry. The blocked-group behavior and the recovery
  path are correct; the sentence naming the script as already declared is not. This is
  `@orkestrel/scaffold`'s message, outside this unit's owned files, and is reported rather than
  changed.
- A throwaway probe under `tmp/probe/` settled the engine's result shapes and the fixtures'
  success and failure boundaries before the proof was written. It was removed; `tmp/probe/` is
  empty and ignored.

## Deviation state

None. No stop condition fired. No git state was changed and nothing was committed.
