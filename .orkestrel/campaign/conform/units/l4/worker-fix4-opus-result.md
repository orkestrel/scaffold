## Edits

**O1 — `/home/user/fleet/worker/src/server/types.ts:76`**

- Before: `` * - `on` — the reserved {@link EmitterHooks} key (§8): initial listeners for the worker's ``
- After: `` * - `on` — the reserved {@link EmitterHooks} key: initial listeners for the worker's ``

**O2 — `/home/user/fleet/worker/src/server/handlers.ts:85`**

- Before: `// stable Queue entry id handed to the handler. A legacy or malformed envelope`
- After: `// stable Queue entry id handed to the handler. A malformed envelope`

Lines `:84` and `:86` are off-limits, so the comment block was not rewrapped; `:85` is now short.

**O4 — `/home/user/fleet/worker/guides/worker.md:560-562` → `:560-563`**

- Before:

```
  real `.ts` worker scripts loaded by Node's type-stripping. Raw TypeScript is unflagged on
  Node 22.18+ and Node 23.6+; on Node 22.12–22.17 and Node 23.0–23.5 the `src:server` Vitest
  project supplies `--experimental-strip-types`. Ordinary fixtures import `serveWorker` by
```

- After:

```
  real `.ts` worker scripts. The Vitest projects supply no type-stripping flag, so the
  `src:server` and `guides` suites load the fixtures through Node's unflagged type stripping
  and run on Node 22.18+ and Node 23.6+ — a narrower floor than the `>=22.12.0` engine range
  in `package.json`. Ordinary fixtures import `serveWorker` by
```

The rewrite adds one line, so every `guides/worker.md` pointer past `:562` moves by one. `guides/worker.md:246-247` and `src/server/types.ts:58-60` are unchanged.

**Report — `/home/user/scaffold/tmp/units/conform/conform-worker-report.md`**: pointer re-derivation at `:12`, `:160`, `:183-185`, `:198`, `:204`, `:214-216`, `:219`, `:223`, `:343`, `:345`; the false sentence at `:473` replaced; `## Fix round 4` appended (`:513-649`).

Diffstat, owned tree files: `guides/worker.md | 198 +-`, `src/server/handlers.ts | 11 +-`, `src/server/types.ts | 50 +-` (3 files, 156 insertions, 103 deletions — whole-unit cumulative, not this round alone).

## Report pointers re-derived (old → new)

Two sweeps ran: `grep -nE 'guides/worker\.md:[0-9]|guides/README\.md:[0-9]'` over the report, plus a read of every report line naming `guides/` without an attached number. The second sweep is what reached the pointer list at report `:12` and the bare pointers at report `:215-216`; the brief's named pattern does not match either.

| Report line | Old | New |
| --- | --- | --- |
| `:12` | `guides/worker.md` `:155`, `:158`, `:204`, `:205`, `:210`, `:286`, `:439` | `:159`, `:162`, `:208`, `:209`, `:215`, `:291`, `:453` |
| `:160` | `guides/worker.md:322-324` | `:326-328` |
| `:183` | `guides/worker.md:235`, `:442` | `:239`, `:457` |
| `:184` | `guides/worker.md:250`, `:434` | `:254`, `:454` |
| `:185` | `guides/worker.md:346`, `:442` | `:356`, `:456` |
| `:198` | `guides/worker.md:441`, `:548`; `guides/README.md:13` | `:451`, `:572`; `guides/README.md:15` |
| `:204` | `guides/worker.md:114`, `:200` | `:115`, `:204` |
| `:214` | `guides/worker.md:283-286` | `:294` |
| `:215` | `:285` | `:293-294` |
| `:216` | `:306` | `:310` |
| `:219` | `guides/worker.md:242` | `:246-247` |
| `:223` | `guides/worker.md:319-321` | `:322-324` |
| `:343` | `guides/worker.md:570-581` | `:570-582` |
| `:345` | `guides/README.md:60-66` | no line — the section was deleted; the pointer now names the file and its end at `:65` |

Re-derived and already correct: report `:12` (`:19`, `:108`, `:113`); `:88` and `:461` (`:213`); `:160` (`:112`); `:198` (`:37`, `:53`, `:86`, `:95`, `:104`, `:373`, `:474`, `guides/README.md:7`); `:210` (`:69-84`); `:219` (`:12`); `:342` (`:20`, `:127`, `:155`, `:178`, `:190`, `:249-251`, `:355`); `:344` (`guides/README.md:3`); `:350` (`:225`, `:320`); `:482` (`:384-386`); `:483`, `:485`, `:489` (`:351`).

Report `:473` now reads: "Fix round 4 re-derived every `guides/worker.md` and `guides/README.md` pointer in this report from the working tree at `/home/user/fleet/worker`, reading each cited line after that round's own edit to `guides/worker.md`. § Fix round 4 lists each pointer it moved."

## O4 sentence as written

"real `.ts` worker scripts. The Vitest projects supply no type-stripping flag, so the `src:server` and `guides` suites load the fixtures through Node's unflagged type stripping and run on Node 22.18+ and Node 23.6+ — a narrower floor than the `>=22.12.0` engine range in `package.json`."

## `git status --short`

The same 28 paths as the baseline, nothing new:

```
 M README.md
 M guides/README.md
 M guides/worker.md
 M src/core/Worker.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/Dispatch.ts
 M src/server/NodeWorker.ts
 M src/server/factories.ts
 M src/server/handlers.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/Worker.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/fixtures/abortable.ts
 M tests/src/server/fixtures/crash.ts
 M tests/src/server/fixtures/identify.ts
 M tests/src/server/fixtures/load-throw.ts
 M tests/src/server/fixtures/slow.ts
 M tests/src/server/fixtures/throw-async.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/helpers.test.ts
```

## Exit codes

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` (72 files) |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root + `check:src:core` + `check:src:server` |
| `npm run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/handlers.test.ts` | 0 | `Test Files 1 passed (1)` / `Tests 17 passed (17)` |

Every reading was taken inside this unit's own exec with its harness resident. The Orchestrator's deciding run belongs after this unit exits.

## Acceptance criteria

1. Met. `grep -n '§' src/server/types.ts` returns no hit at all; `grep -n 'legacy' src/server/handlers.ts` returns nothing.
2. Met. Every `guides/worker.md:N` and `guides/README.md:N` pointer in the report was opened against the tree after the O4 edit.
3. Met in substance, with a line-number correction. `grep -n 'experimental-strip-types' guides/worker.md` returns one hit, the consumer-script statement — at `:246`, not `:247`. The statement wraps across `:246-247` (`` 23.0–23.5 require `--experimental-strip-types`. A built `.js` / `.mjs` script is an `` / `alternative across supported Node versions.`), and the token sits on the first of those lines. No edit in this round precedes `:246`, so that line cannot move to `:247`; the criterion's expected number is off by one against the file the brief also tells me to leave unchanged. The fixtures paragraph names the `src:server` and `guides` suites and the Node 22.18+ / 23.6+ floor.
4. Met. All five commands exit 0; `git status --short` lists the same 28 paths and nothing new.

## Deviation state

No deviation. All three named tree sites read exactly as the brief quotes them. Two items are recorded in the report rather than acted on:

- The criterion-3 off-by-one, recorded as observation 1 in § Fix round 4.
- A third `via` → `through` rewrite in `guides/worker.md:228` (`` A death mid-flight still rejects through the dispatch's own ``) that the row at report `:185` does not name. The two pointers that row carries were re-derived and are correct. Naming the third would change what the row claims its sweep found, so it is recorded as observation 2 for a successor rather than added to the row.