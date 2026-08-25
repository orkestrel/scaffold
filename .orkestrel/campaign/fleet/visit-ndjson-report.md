# Unit VISIT-ndjson — report

`implementer` on Claude Opus 5. Target `/home/user/orkestrel/ndjson`. Nothing committed.

## The advisory as taken

`npx --no-install scaffold audit`, run first, exit 1:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The `setup:` advisory names one module, `tests/setup.ts`, so the work list is one proof file:
`tests/setup.test.ts`.

## Touched files

- `/home/user/orkestrel/ndjson/tests/setup.test.ts` — new, the proof for `tests/setup.ts`.
- `/home/user/orkestrel/ndjson/package.json` — `test:guides` set to the planned value carrying
  `--no-cache`; `test:setup` declared at the exact planned line and placed after `test:config`; the
  `test` chain baked to invoke it.
- `/home/user/orkestrel/ndjson/vite.config.ts` — `repair` wrote the `setup` project and registered
  it in `projects`.
- `/home/user/orkestrel/ndjson/package-lock.json` — arrived dirty from the `^0.0.52` re-pin, kept.
- The `orchestration` and `docs` vendored groups — rewritten by `repair`.

Diffstat, `git diff --stat` tail plus the untracked proof:

```text
 CLAUDE.md                                          |   4 +-
 package-lock.json                                  | 423 +++++++++------------
 package.json                                       |   7 +-
 vite.config.ts                                     |  13 +-
 37 files changed, 574 insertions(+), 672 deletions(-)
?? tests/setup.test.ts   (171 lines)
```

## What the proof asserts

`tests/setup.test.ts` covers every export of `tests/setup.ts`, one case per behavioral contract.
Every expectation arrives by a route the module cannot share.

**Wire constants (`LF`, `CR`, `TAB`, `FF`, `VT`, `BACKSLASH`) — the data table.**

- Each constant is the single character its name denotes. Second route: the compiler's escape table
  (`'\n'`, `'\r'`, `'\t'`, `'\f'`, `'\v'`, `'\\'`), not `String.fromCharCode`.
- Every constant is distinct and one character wide, so a corpus can mix them: set cardinality
  against list length, and a filter for any width other than one.
- `BACKSLASH` plus a letter composes the JSON escape a consuming line embeds. Second route: the
  platform's JSON grammar decodes `{"content":"a\nb\tc"}` back to `LF` and `TAB`.

**`feedAll`.**

- Threads every chunk through one parser, so a record split across a chunk boundary survives.
- Flattens the records of every chunk into one array in feed order.
- Returns what a manual feed loop over the same chunks collects. Second route: the loop written in
  the proof, which disagrees the moment `feedAll` reorders chunks, drops one, or feeds a fresh
  parser per chunk.
- Returns no records when no chunk completes a line, for an empty chunk list and for empty chunks.

**`chunkings`.**

- Enumerates one family per default size, then every two-way cut. The expectation is a hand-written
  enumeration of the whole output for the stream `'ab'`, so a lost family or a missing cut fails.
- Cuts a caller-supplied size list at exactly that width, against hand-written families for sizes 2
  and 3.
- Rejoins every chunking of a real NDJSON corpus to the original stream, in order.
- Yields one empty chunk per family for an empty stream, so a consumer always feeds at least once —
  again a hand-written enumeration of the whole output.

**`partition`.**

- Splits a corpus into non-empty chunks that rejoin to it, on every draw of a real
  `seededRandom(0xc0ffee)` source across 25 trials.
- Advances one character per draw at the bottom of the range, so it terminates: a source returning
  `0` yields the byte-at-a-time split.
- Takes the whole remainder in one chunk at the top of the range.
- Repeats a partition exactly for a repeated seed, so a fuzz failure replays.
- Returns no chunks for an empty stream.

**`isBrowserVuePath`.**

- Accepts a browser SFC path under either separator family: `app/browser/views/Home.vue`, and the
  same path built with `BACKSLASH`.
- Refuses a sibling directory (`app/core/...`, `src/browser/...`) and a prefix lookalike
  (`app/browserish/...`, `tests/app/browser/...`).

Host note: this package is core-only, `tests/setup.ts` is host-independent, and the whole module is
reachable from the Node `setup` project, so no browser or service half is deferred.

## Mutation control

One control for the one proof file. The input of the `feedAll` threading case was reversed in place
(`['{"a":', '1}' + LF]` became `['1}' + LF, '{"a":']`), `npm run test:setup` was run, and the input
was restored.

Failing line:

```text
FAIL  |setup| tests/setup.test.ts > feedAll > threads every chunk through one parser, so a record split across chunks survives
AssertionError: expected [] to deeply equal [ { a: 1 } ]
 ❯ tests/setup.test.ts:71:61
```

Counts: `Tests  1 failed | 17 passed (18)` under the mutation, `Tests  18 passed (18)` after the
restore.

## Retained differing values `repair` named

`repair` named no retained differing script value. Its first run refused the `configs` group
outright:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

`repair` writes planned paths and leaves the manifest to the operator, so `test:setup` and the
`test` chain were declared by `npm pkg set` at the exact planned values scaffold's compiler emits
(`vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`, and `test:setup`
between `test:config` and `test:guides`). The second `repair` run then wrote `vite.config.ts` and
the vendored groups: `49 written, 78 unchanged, 0 removed in .`. Nothing beyond `test:guides`,
`test:setup`, and the `test` chain was adopted.

## Gates

Each run bare at `/home/user/orkestrel/ndjson`, in order, after `npm run format`.

| Gate                   | Closing line                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 2668ms on 133 files` (0)  |
| `npm run lint:check`   | no diagnostics, exit 0                                                                |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json`, exit 0                              |
| `npm run build`        | `✓ built in 1.65s` / `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` (0) |
| `npm test`             | exit 0; per project: `src` 70 passed, `policy` 93 passed, `config` 46 passed, `setup` 18 passed, `guides` 18 passed |

Exit audit, `npx --no-install scaffold audit`:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

No `setup:` advisory, no `scripts:` advisory, and no `projects:` advisory remain. Two advisories
sit outside this unit's scope and are unchanged from the opening reading: the `typescript` major
range, and the foreign `orkestrel-human-journey`, `.claude/agents/codex.md`, and
`.codex/agents/claude.toml` paths that `repair` does not remove.

## Acceptance criteria

1. Met — the exit audit reports no `setup:` advisory.
2. Met — every gate closes green, each read bare, in the preceding table.
3. Met — one mutation-control failing line for the one proof file, restored and re-run green.

## Deviation state

None. No stop condition fired: every export of `tests/setup.ts` is provable under the fixed shape
in the Node `setup` project, and no gate failed.
