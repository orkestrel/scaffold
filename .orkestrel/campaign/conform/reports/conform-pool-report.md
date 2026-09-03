# Unit conform-pool — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in order, and
`git status --short` lists only files under Owned.

## Rows

| Row          | Disposition | What landed                                                                                              |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------- |
| pool-obj-1   | applied     | `describe('flagship fences')` in `tests/guides.test.ts`: the executed boundary fence plus its presence guard. |
| pool-obj-2   | applied     | New `tests/src/core/validators.test.ts`; the pure guard assertions moved out of `Pool.test.ts`.           |
| pool-obj-3   | applied     | Line 373 deleted, case renamed, and a `getEventListeners` case pinning `#detach`'s two reachable paths: the commit path and the destroy path, each proven red by its own control.   |
| pool-obj-4   | applied     | `tests/setup.ts` header rewritten in the present tense over what the tree holds.                          |
| pool-subj-1  | applied     | `#### \`PoolInterface\`` inserted before the method table in `guides/pool.md`.                            |
| pool-subj-2  | applied     | `#### \`PoolToken\`` and its `release` table added; the Surface row at line 61 left as it is.             |
| pool-subj-3  | applied     | `guides/README.md` lines 3 and 35 rewritten without the `§22` citations.                                 |
| pool-subj-4  | applied     | `tests/setup.ts:3` banner stripped of ` (AGENTS §16.1)`, padded back to its original width.              |
| pool-subj-5  | applied     | `README.md` opening rewritten to the optional-bounded-capacity claim `package.json` and the guide make.  |
| pool-subj-6  | applied     | `clear` `@throws` for `destroyed` and `cleanup`, byte-identical in `types.ts` and `Pool.ts`.             |
| pool-subj-7  | applied     | `destroy` `@throws` for `cleanup`, byte-identical in `types.ts` and `Pool.ts`.                           |
| pool-subj-8  | applied     | `acquire` `@throws` for `destroyed`, `create`, `cleanup`, and the abort reason, in both files.           |
| pool-subj-9  | applied     | `createPool` `@throws` for `code: 'invalid'`, placed before `@example`.                                  |
| fleet-F1     | noop        | `tests/setup.ts` declares no `isBrowserVuePath`; the workspace has no browser environment.               |
| fleet-F2     | noop        | Neither implementation class declares a public `readonly id: string` data field.                         |

### fleet-F1 evidence

Read `/home/user/fleet/pool/tests/setup.ts` end to end: its declarations are `PoolEvent` and
`POOL_EVENTS`, and no `isBrowserVuePath` appears. Read
`/home/user/fleet/pool/tests/setup.test.ts` end to end: its only `describe` is `POOL_EVENTS`.
The workspace has no browser environment — `Glob` over `/home/user/fleet/pool` returns no
`src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`, and `vite.config.ts` declares the
projects `src:core`, `policy`, `config`, `setup`, `guides`, `distribution`, and `probe`, every one
of them `environment: 'node'` with `browser: { enabled: false }`. No edit made.

### fleet-F2 evidence

The package declares `Pool` and `PoolError` as classes. `Pool` (`src/core/Pool.ts:28`) declares `#` fields first and
exposes `emitter`, `size`, `idle`, and `active` as getters; it has no `id` field of any
accessibility. `PoolError` (`src/core/errors.ts:18`) declares `readonly code` and `readonly
context` and no `id`. `PoolInterface` (`src/core/types.ts:63`) declares no `id` member either, so
there is no interface field a getter would have to satisfy. No edit made, and no
`JSON.stringify` read was needed.

## Files touched

| File                               | Summary                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `README.md`                        | Opening sentence and the paragraph's capacity clause now state the optional bound and the unbounded form. |
| `guides/README.md`                 | The `§22` citations removed from the index tagline and the `AGENTS.md` link description.                  |
| `guides/pool.md`                   | `PoolInterface` and `PoolToken` method tables keyed by H4; validators test listed; detach coverage named. |
| `src/core/Pool.ts`                 | `acquire`, `clear`, and `destroy` doc blocks state their rejection failure modes.                         |
| `src/core/factories.ts`            | `createPool` doc block states the synchronous `code: 'invalid'` construction throw.                      |
| `src/core/types.ts`                | The same three `@throws` additions, byte-identical to their `Pool.ts` twins.                             |
| `tests/guides.test.ts`             | Header amended; `@src/core` guards imported; `flagship fences` executes and pins the boundary fence.     |
| `tests/setup.ts`                   | Banner citation removed at the original width; the helper sentence restated over the present tree.        |
| `tests/src/core/Pool.test.ts`      | Guard-only assertions removed, two cases renamed, dead line deleted, listener-detach case added.         |
| `tests/src/core/validators.test.ts`| New mirrored proof for `isPoolMax` and `isPoolSignal`.                                                    |

Diffstat (`git -C /home/user/fleet/pool diff --stat`, with the new file `git add -N`'d):

```text
 README.md                         |  7 +++---
 guides/README.md                  |  4 ++--
 guides/pool.md                    | 13 ++++++++++-
 src/core/Pool.ts                  | 11 +++++++++
 src/core/factories.ts             |  2 ++
 src/core/types.ts                 | 11 +++++++++
 tests/guides.test.ts              | 37 +++++++++++++++++++++++++++--
 tests/setup.ts                    |  9 ++++---
 tests/src/core/Pool.test.ts       | 49 ++++++++++++++++++++++++++++-----------
 tests/src/core/validators.test.ts | 37 +++++++++++++++++++++++++++++
 10 files changed, 154 insertions(+), 26 deletions(-)
```

## Failing-first proofs

Every capture is a full runner transcript under `/home/user/work/evidence/pool-proofs/`, indexed
by `README.txt` in that directory. Each plant was reverted by the inverse edit immediately after
its capture; `git status --short` lists no `src/core/validators.ts` entry, and
`git -C /home/user/fleet/pool diff -- src/core/Pool.ts` carries only the three `@throws` hunks,
with `#detach` unchanged, which is the revert's proof.

### pool-obj-1

Command: `npm --prefix /home/user/fleet/pool run test:guides`.

| Control                                                     | Reading                  | File                                          |
| ----------------------------------------------------------- | ------------------------ | ----------------------------------------------- |
| `isPoolMax` body planted `typeof value === 'number' && value > 0` | 1 failed, 24 passed (25) | `pool-obj-1-control-planted-guard-red.txt`    |
| Fence comment cut to `isPoolMax(Infinity) // false`          | 1 failed, 24 passed (25) | `pool-obj-1-control-edited-fence-red.txt`     |
| Both reverted                                                | 25 passed (25)           | `pool-obj-1-subj-1-subj-2-green.txt`          |

The planted guard reddens the executed case and leaves the presence guard green; the edited fence
reddens the presence guard and leaves the executed case green. The pair is what makes each half
independently load-bearing.

### pool-obj-2

Command: `npm --prefix /home/user/fleet/pool run test:src`.

| Control                                                       | Reading                  | File                                        |
| ------------------------------------------------------------- | ------------------------ | --------------------------------------------- |
| Baseline before the row                                        | 41 passed (41), 2 files  | `pool-obj-2-obj-3-baseline.txt`             |
| `isPoolSignal` planted as an `'aborted' in value` shape check | 1 failed, 46 passed (47) | `pool-obj-2-control-planted-guard-red.txt`  |
| `isPoolMax` planted `typeof value === 'number' && value > 0`  | 2 failed, 45 passed (47) | `pool-obj-2-control-planted-max-red.txt`    |
| Both reverted                                                  | 47 passed (47), 3 files  | `pool-obj-2-obj-3-green.txt`                |

The `isPoolSignal` plant reddens only `tests/src/core/validators.test.ts`. `Pool.test.ts` stays
green under it, because `acquire` still throws through `#state`, which is the measurement that the
guard's own proof had no home before this row.

### pool-obj-3

Command: `npm --prefix /home/user/fleet/pool run test:src`.

| Control                                                            | Reading                 | File                                                     |
| ------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------- |
| `removeEventListener` line deleted from `Pool.#detach`              | 1 failed, 46 passed (47) | `pool-obj-3-control-detach-removed-red.txt`               |
| Reverted                                                             | 47 passed (47)           | `pool-obj-2-obj-3-green.txt`                               |
| `this.#detach(waiter)` deleted from `destroy()`'s waiter loop        | 1 failed, 40 passed (41) | `pool-obj-3-control-detach-destroy-red.txt`               |
| Reverted                                                             | 41 passed (41)           | `pool-obj-3-control-detach-destroy-green.txt`              |

The commit-path failure is the new case at `tests/src/core/Pool.test.ts:386`, and it is the only
failure — a direct measurement of the refuter's claim that no other case in the suite reads
listener state. The destroy-path deletion fails the same case's destroy-path assertion at
`tests/src/core/Pool.test.ts:395` instead, `expected [ [Function] ] to have a length of +0 but got
1`, which is the second reachable `#detach` site measured red.

### pool-subj-1 and pool-subj-2

Command: `npm --prefix /home/user/fleet/pool run test:guides`.

| Control                                                  | Reading                  | File                                           |
| -------------------------------------------------------- | ------------------------ | ------------------------------------------------ |
| Both `####` keys removed, tables left bare (pre-row shape) | 15 passed (15), green    | `pool-subj-1-subj-2-control-no-h4.txt`         |
| `flush` phantom row added to the `PoolInterface` table    | 2 failed, 23 passed (25) | `pool-subj-1-control-phantom-red.txt`          |
| `PoolToken` row renamed `release` to `dispose`            | 3 failed, 22 passed (25) | `pool-subj-2-control-renamed-red.txt`          |
| All reverted                                              | 25 passed (25)           | `pool-obj-1-subj-1-subj-2-green.txt`           |

The no-H4 control is the row's own defect measured: the run is green and reports 10 fewer
assertions, because the method-parity loops iterate over nothing. The phantom and rename controls
prove each loop now binds its table to the source.

`pool-obj-4`, `pool-subj-3`, `pool-subj-4`, `pool-subj-5`, and `pool-subj-6` through `pool-subj-9`
change comments and prose only, so they carry sweeps rather than controls.

## Sweeps

Every sweep ran through `Grep` over `/home/user/fleet/pool` with `node_modules` excluded.

| Pattern                                        | Population                                                      | Result                                                                                                      |
| ---------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `§`                                            | whole package outside `node_modules`                             | Hits only in `guides/probe.md`, `guides/guide.md`, `guides/emitter.md` — the vendored dependency mirrors.    |
| `AGENTS §` (case-insensitive)                  | whole package outside `node_modules`                             | `guides/emitter.md` and `guides/guide.md` only; none in `guides/README.md`, `tests/setup.ts`, `guides/pool.md`. |
| `createResourceFactor(y\|ies\|ied\|ing)` (case-insensitive) | whole package outside `node_modules`                | `guides/test.md` only, the vendored `@orkestrel/test` mirror. No hit in `src/` or `tests/`.                  |
| `bounded, typed` (case-insensitive)            | whole package outside `node_modules`                             | No hit.                                                                                                      |
| `\b(one\|two\|…\|ten)\b` (case-insensitive)     | `src/**`, `tests/guides.test.ts`, `tests/setup*.ts`, `tests/src/**`, `guides/pool.md`, `guides/README.md`, `README.md` | Every hit is a singular determiner or pronoun, except one I wrote and then fixed — see the ruling that follows. |
| `\b\d+ (elements\|members\|…\|categories)\b`    | the same population                                              | No hit.                                                                                                      |
| `\b(should\|simply\|easy\|easier\|just\|currently\|via\|in order to\|e.g.\|i.e.\|etc.\|performant\|robust\|allows you to\|and/or\|please\|sanity check\|dummy\|ensure\|guarantee\|leverage\|utilize\|both)\b` (case-insensitive) | the same population | Two `both` hits, each pre-existing and each naming its members in the sentence (`guides/pool.md:157`, `tests/src/core/Pool.test.ts:978`). |
| `without leaking the listener`                 | `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md` | No hit. |
| `accepts only positive safe integer maxima and omission remains unbounded\|recognizes only native signals and synchronously throws for an invalid acquire signal` | `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md` | No hit. |
| `` growing up to `max`, or parking on `` | `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md` | No hit. |
| `The four constants below are this package's own` | `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md` | No hit. |

The number-word sweep caught a count in a comment I had just written: `tests/src/core/Pool.test.ts`
read "The two detach sites a leak can reach". `#detach` has three call sites, and the set can grow,
so the number was a count. It now names its members instead: "The detach sites a leak can reach: a
signal-bearing acquire that commits, and a parked waiter that `destroy()` rejects."

I also removed a count the rows did not name. `tests/guides.test.ts:2` read "The four constants
below are this package's own". Row pool-obj-1 adds a package-specific block below those constants,
which made the sentence's "the only part a sibling package changes" false, so the header had to
move; the fleet's own form at `/home/user/fleet/contract/tests/guides.test.ts:2` already drops the
number. The header now reads "The constants below and the executed `flagship fences` block are this
package's own, and are the only parts a sibling package changes."

## Gates

Run in order, each as `npm --prefix /home/user/fleet/pool …`, each transcript under
`/home/user/work/evidence/pool-proofs/`.

| Gate                  | Exit code | Transcript               |
| --------------------- | --------- | -------------------------- |
| `npm run format:check` | 0        | `gate-format-check.txt`  |
| `npm run lint:check`   | 0        | `gate-lint-check.txt`    |
| `npm run check`        | 0        | `gate-check.txt`         |
| `npm run build`        | 0        | `gate-build.txt`         |
| `npm test`             | 0        | `gate-test.txt`          |

`npm test` reports `src:core` 47 passed, `policy` 111 passed, `config` 46 passed, `setup` 3
passed, `guides` 25 passed.

One convergence step ran before the final chain. The first `format:check` after the guide edits
exited 1 with `Format issues found in above 1 files` naming `guides/pool.md`: oxfmt formats
Markdown, and it widened the new `PoolToken` table's header and separator by one column. I ran the
granted `cd /home/user/fleet/pool && npx oxfmt --config .oxfmtrc.json guides/pool.md`, which
touched that table alone, and `format:check` has exited 0 on every run since.

## Breaking

None. No row renames or removes a published symbol. The barrel `src/core/index.ts` is unchanged,
and `guide.surface()` parity over it is green.

## Shared-file patches

None. No consumer edit is obliged: nothing left this package's public surface, and no file outside
Owned needed a change to keep these gates green.

## Deviations

None. Three ancillary questions were decided and carried, as the deviation contract allows.

1. **`isPoolSignal` stays imported in `Pool.test.ts`.** Row pool-obj-2 names
   `Pool.test.ts:81-83` as the assertions to move and says to drop an import only if nothing uses
   it. The case at `Pool.test.ts:105-106`, `expect(isPoolSignal(controller.signal)).toBe(true)`, is a
   different input — a native signal carrying hostile own accessors — and it establishes that the
   rejection asserted on the next line comes from the prototype read rather than a guard refusal.
   It stayed, so `isPoolSignal` stayed in the import list and `isPoolMax` left it.

2. **The throwing-`Proxy` input is built inline in both test files, not extracted.** Moving the
   guard assertions leaves a near-duplicate five-line `new Proxy(signal, { get() { throw } })` in
   `validators.test.ts` and `Pool.test.ts`. The consolidating home would be `tests/setup.ts`, and
   row pool-obj-4 fixes that file's content to "this package's own event vocabulary", so adding a
   signal fixture there would falsify the sentence the row prescribes. I left both inline. It is an
   inert input stub rather than a fixture factory, so no rule is broken; I record it as an
   observation for a successor unit that owns `tests/setup.ts` and `tests/setup.test.ts` together.

3. **`guides/pool.md` § Tests gained the new file and the new coverage.** Row pool-obj-2 creates a
   test file the guide's Tests list did not name, and row pool-obj-3 adds coverage the
   `Pool.test.ts` summary did not name. Method step 3 obliges the in-package consumer update, so
   the list now carries `tests/src/core/validators.test.ts` and the `Pool.test.ts` summary now
   names abort-listener detachment. The guides link-parity case is green over both.

## Observations, not criteria

- `npm test` ran on an otherwise idle checkout and reported no timing failure. The deciding
  whole-suite run belongs to the Orchestrator after this unit exits.
- `guides/probe.md` sits in `guides/` but `guides/README.md` names only `emitter.md` and
  `guide.md` under `## Dependency reference`. That predates this unit, no row names it, and the
  manifest parity case is green because the parser reads listed guides only. Reported, not touched.

## Fix round 1

Closes the round-1 objective lane's findings F1 through F6 and referral R1
(`units/l2a/pool-objective-r1.md`).

- **F1.** `guides/pool.md:73` now reads "The public call-signature members of `PoolInterface` and
  `PoolToken`; `Pool` implements the `PoolInterface` list exactly." One sentence — "The lease
  returned by `acquire`, with the one operation that returns its record." — sits between
  `#### \`PoolToken\`` and its table. `Grep` over `tests/guides.test.ts` for the old sentence found
  no presence guard quoting it.
- **F6.** The `Pool.test.ts` bullet at `guides/pool.md:241-247` is rewrapped to the file's existing
  width; no word changed.
- **R1.** `guides/README.md` § Dependency reference gained one paragraph naming `probe.md` and
  `test.md` as byte-identical mirrors of the guides for `@orkestrel/probe` and `@orkestrel/test`,
  in the form of the two existing paragraphs, which stayed byte-unchanged.
- **F3.** Planted a second control in `src/core/Pool.ts`: deleted `this.#detach(waiter)` from
  `destroy()`'s waiter loop, leaving the commit-path call untouched. The run reddened the same
  `getEventListeners` case's destroy-path assertion at `tests/src/core/Pool.test.ts:395`
  (`expected [ [Function] ] to have a length of +0 but got 1`; 1 failed, 40 passed (41)),
  captured to `pool-obj-3-control-detach-destroy-red.txt`. Restored the line byte-for-byte;
  `git -C /home/user/fleet/pool diff -- src/core/Pool.ts` again carries only the three `@throws`
  hunks, with `#detach` unchanged. The re-run captured to
  `pool-obj-3-control-detach-destroy-green.txt` read 41 passed (41).
- **F2, F4, F5, and the pool-obj-3 sentence.** The revert-proof sentence now states the true
  reading: `git status --short` lists no `src/core/validators.ts` entry, and
  `git -C /home/user/fleet/pool diff -- src/core/Pool.ts` carries only the three `@throws` hunks,
  with `#detach` unchanged. The sweep table gained four rows — `without leaking the listener`, the
  two renamed case titles, `` growing up to `max`, or parking on ``, and the `tests/guides.test.ts`
  header clause `The four constants below are this package's own` — each swept over `src/**`,
  `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md` and read empty. Line 38 now names
  the classes `Pool` and `PoolError` instead of counting them. The citation at line 206 now reads
  `Pool.test.ts:105-106`. The pool-obj-3 row and its controls table carry the second control's
  transcript and its red count.

## Sweeps (fix round 1)

Every sweep ran through `Grep` over `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`,
`README.md`, and each read empty.

| Pattern                                                                                                            | Result  |
| ------------------------------------------------------------------------------------------------------------------- | ------- |
| `without leaking the listener`                                                                                      | No hit. |
| `accepts only positive safe integer maxima and omission remains unbounded`\|`recognizes only native signals and synchronously throws for an invalid acquire signal` | No hit. |
| `` growing up to `max`, or parking on ``                                                                            | No hit. |
| `The four constants below are this package's own`                                                                   | No hit. |

## Gates (fix round 1)

| Gate                   | Exit code | Note                                            |
| ----------------------- | --------- | ------------------------------------------------ |
| `npm run format:check`  | 0         | `oxfmt --check`, 38 files, no reformat needed.  |
| `npm run lint:check`    | 0         | `oxlint --deny-warnings`, no output.            |
| `npm run check`         | 0         | `tsc --noEmit` across the project and `src:core`. |
| `npm run build`         | 0         | `dist/src/core` rebuilt cleanly.                |
| `npm test`              | 0         | `src:core` 47 passed, `policy` 111 passed, `config` 46 passed, `setup` 3 passed, `guides` 25 passed. |

## Audit (fix round 1)

`npx scaffold audit --offline` printed: "0 of 34 planned paths drifted from the plan. Audit
compared bytes at 23, existence at 5, and nothing at 6."

`git -C /home/user/fleet/pool status --short` lists exactly the unit's ten paths: `README.md`,
`guides/README.md`, `guides/pool.md`, `src/core/Pool.ts`, `src/core/factories.ts`,
`src/core/types.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/src/core/Pool.test.ts`
(modified), and `tests/src/core/validators.test.ts` (added).
