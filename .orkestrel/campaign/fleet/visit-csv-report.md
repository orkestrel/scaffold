# Unit VISIT-csv — report

`implementer` on Claude Opus 5. Target `/home/user/orkestrel/csv`. Not committed.

## The advisory as taken

`npx --no-install scaffold audit`, run first, at `/home/user/orkestrel/csv`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The `setup:` advisory names one module, so the proof work list is one file: `tests/setup.test.ts`.

## Touched files

- `/home/user/orkestrel/csv/tests/setup.test.ts` — new. The proof of `tests/setup.ts`, in the `setup` project.
- `/home/user/orkestrel/csv/package.json` — `test:guides` adopted, `test:setup` written by `repair`, `test:setup` added to the `test` chain.
- `/home/user/orkestrel/csv/vite.config.ts` — the `setup` project, written by `repair`.
- `/home/user/orkestrel/csv/package-lock.json` — arrived dirty from the ^0.0.52 re-pin, untouched by this unit beyond that.
- The orchestration and docs vendored set — rewritten by `repair` (`49 written, 78 unchanged, 0 removed in .`).

Diffstat, tracked files: `37 files changed, 575 insertions(+), 673 deletions(-)`. Owned subset:
`package.json | 9 +-`, `vite.config.ts | 13 +-`, `package-lock.json | 423 +-`, plus 171 new lines
in `tests/setup.test.ts`.

## What the proof asserts

`tests/setup.ts` is host-independent by construction — no `node:*`, no DOM, no production import — so
every contract is reachable in the Node `setup` project and no half is deferred. The file states that
in its header. It drives no parser and no renderer: expectations are hand-written literals or runtime
predicates, so a drifted fixture cannot agree with itself.

| Export                 | Case                                                                       | Contract asserted                                                                          |
| ---------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `TEST_SEED`            | is a non-negative safe integer, so every suite seeds a generator from the same value | `Number.isSafeInteger` accepts it and it is not negative                          |
| `assertAndNarrow`      | returns the accepted value itself, narrowed to the guard type               | reference identity with the input, and the narrowed `name` reads without a cast            |
| `assertAndNarrow`      | defers to the guard rather than to a check of its own                      | one value, two guards: the accepting guard returns it, the refusing guard throws           |
| `assertAndNarrow`      | throws naming the refused value, so a failure reads without a debugger     | the message carries `expected value to satisfy guard, got {"id":7}`                        |
| `assertAndNarrow`      | reports a refused value that JSON renders as nothing                       | `undefined` reaches the message as `undefined` rather than crashing the render             |
| `buildQuotedField`     | wraps a body carrying a delimiter, a record separator, and an escaped quote | quoted at each end; the body carries `,`, `\r\n`, and `""`                                 |
| `buildQuotedField`     | escapes every quote in the body, so the fixture stays one field            | removing the escaped pairs leaves no bare quote                                            |
| `buildQuotedField`     | unescapes to the text the quoting exists to carry                         | the unescaped body equals the hand-written `a,b\r\nc"d`                                    |
| `buildRaggedCSV`       | follows its header with a row short of it and a row past it               | header width 3; the next row is narrower and the one after is wider                        |
| `buildRaggedCSV`       | quotes nothing, so a field count reads off a plain split                  | the document carries no quote character                                                    |
| `buildMixedNewlineCSV` | separates records with a CRLF, a bare LF, and a bare CR                   | `\r\n` present, an LF with no CR before it, a CR with no LF after it                       |
| `buildMixedNewlineCSV` | carries the same records whichever separator delimits them                | splitting on every convention yields the hand-written `['a,b', '1,2', '3,4', '5,6']`       |
| `buildInferenceTraps`  | heads a single column named for the trapped value                          | the first line is `value`                                                                  |
| `buildInferenceTraps`  | lists only values a naive numeric read gets wrong                         | no row survives `Number.isFinite(Number(row)) && String(Number(row)) === row`               |
| `buildInferenceTraps`  | carries the traps a consumer names, one per row and none blank            | membership of `007`, `1e5`, `0x1F`, `NaN`; no blank row                                    |

`describe`, `it`, and `expect` stay out of `tests/setup.ts`; the proof imports the module and asserts.

## Mutation control

One control for the one proof file. `tests/setup.test.ts`, case `lists only values a naive numeric
read gets wrong` — the case most exposed to passing vacuously, because a predicate that never fires
satisfies it. A copy of the input row list took an extra member, `'42'`, which a naive numeric read
does survive:

```text
FAIL  |setup| tests/setup.test.ts > buildInferenceTraps > lists only values a naive numeric read gets wrong
AssertionError: expected [ '42' ] to deeply equal []
 ❯ tests/setup.test.ts:159:44
```

`Tests  1 failed | 14 passed (15)` under the control. Restored, then `Tests  15 passed (15)`.

## What `repair` retained, and one blocked pass

The first `npx --no-install scaffold repair` wrote nothing and blocked:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

`repair` retains a differing `test` chain rather than rewriting it, so the chain never acquired
`test:setup` and the `configs` group stayed blocked behind it. The block cleared in three steps, all
inside owned files:

1. `scaffold repair --groups manifest` wrote `test:setup` as
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`, and left the `test`
   chain differing.
2. `npm pkg set` put `npm run test:setup` into the `test` chain at the planned position — after
   `test:config`, before `test:guides`, matching the order scaffold composes at
   `node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290-4299`.
3. The full `scaffold repair` then ran clean: `49 written, 78 unchanged, 0 removed in .`, and a
   confirming re-run reports `0 written, 127 unchanged, 0 removed in .`.

Adopted beyond the proofs: `test:guides` (the planned `--no-cache` value, as briefed) and the `test`
chain's `test:setup` link. Nothing else was adopted.

Advisory at exit — the `setup:` advisory is gone; one unrelated advisory remains, untouched:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

## Gates

Each run bare at `/home/user/orkestrel/csv`, after `npm run format` (`Finished in 2656ms on 143 files
using 4 threads.`).

| Gate                   | Closing line                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 3058ms on 143 files using 4 threads.` |
| `npm run lint:check`   | no diagnostic; `exit=0`                                                                        |
| `npm run check`        | no diagnostic; `exit=0`                                                                        |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`; `exit=0`                       |
| `npm test`             | `exit=0` — `src:core` 229 passed, `policy` 93 passed, `config` 46 passed, `setup` 15 passed, `guides` 18 passed |

## Deviation state

None. No deviation was hit: the blocked `repair` was resolvable inside the owned manifest, which the
brief scopes to this unit.

## Observations, for the Orchestrator

- The plan does not own 7 paths beneath its groups, reported `foreign` and not removed by `repair`:
  `.agents/skills/orkestrel-human-journey/**` (SKILL, `agents/openai.yaml`, `references/captures.md`,
  `references/layer.md`), `.claude/skills/orkestrel-human-journey/SKILL.md`,
  `.claude/agents/codex.md`, and `.codex/agents/claude.toml`. `repair` wrote their successors —
  `orkestrel-prove-journey` and `.agents/transports/` — and left the predecessors in place, so the
  target now carries both. Pruning them is outside this unit's owned files.
- `git status` at exit shows `src/**`, `guides/**`, `tests/setup*.ts`, and every other test file
  unmodified.
