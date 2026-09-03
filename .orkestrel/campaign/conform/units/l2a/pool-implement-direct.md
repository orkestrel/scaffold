# Unit conform-pool — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in order, and `git status --short` lists only files under Owned.

Report: `/home/user/scaffold/tmp/units/conform/conform-pool-report.md`
Evidence: `/home/user/work/evidence/conform-pool.diff`, `/home/user/work/evidence/conform-pool.status`, transcripts under `/home/user/work/evidence/pool-proofs/` indexed by its `README.txt`.

## Rows

| Row | Disposition | What landed |
| --- | --- | --- |
| pool-obj-1 | applied | `describe('flagship fences')` in `tests/guides.test.ts`: the executed boundary fence plus its presence guard. |
| pool-obj-2 | applied | New `tests/src/core/validators.test.ts`; the pure guard assertions moved out of `Pool.test.ts`. |
| pool-obj-3 | applied | Line 373 deleted, case renamed, and a `getEventListeners` case pinning both reachable `#detach` sites. |
| pool-obj-4 | applied | `tests/setup.ts` header rewritten in the present tense over what the tree holds. |
| pool-subj-1 | applied | `#### \`PoolInterface\`` inserted before the method table in `guides/pool.md`. |
| pool-subj-2 | applied | `#### \`PoolToken\`` and its `release` table added; the Surface row at line 61 left as it is. |
| pool-subj-3 | applied | `guides/README.md` lines 3 and 35 rewritten without the `§22` citations. |
| pool-subj-4 | applied | `tests/setup.ts:3` banner stripped of ` (AGENTS §16.1)`, padded back to its original width (28 → 43 rule characters, the 15 removed characters restored). |
| pool-subj-5 | applied | `README.md` opening rewritten to the optional-bounded-capacity claim `package.json` and the guide make. |
| pool-subj-6 | applied | `clear` `@throws` for `destroyed` and `cleanup`, byte-identical in `types.ts` and `Pool.ts`. |
| pool-subj-7 | applied | `destroy` `@throws` for `cleanup`, byte-identical in `types.ts` and `Pool.ts`. |
| pool-subj-8 | applied | `acquire` `@throws` for `destroyed`, `create`, `cleanup`, and the abort reason, in both files. |
| pool-subj-9 | applied | `createPool` `@throws` for `code: 'invalid'`, placed before `@example`. |
| fleet-F1 | noop | `/home/user/fleet/pool/tests/setup.ts` declares only `PoolEvent` and `POOL_EVENTS`; no `isBrowserVuePath`. `tests/setup.test.ts`'s only `describe` is `POOL_EVENTS`. No browser environment exists: no `src/browser`, no `app/browser`, no `tests/setupBrowser.ts`, and every project in `vite.config.ts` is `environment: 'node'` with `browser: { enabled: false }`. |
| fleet-F2 | noop | Classes read: `Pool` (`src/core/Pool.ts:28`, `#` fields first, public surface as getters, no `id`) and `PoolError` (`src/core/errors.ts:18`, `readonly code` and `readonly context`, no `id`). `PoolInterface` declares no `id` member. |

## Files touched

| File | Summary |
| --- | --- |
| `/home/user/fleet/pool/README.md` | Opening sentence and the capacity clause now state the optional bound and the unbounded form. |
| `/home/user/fleet/pool/guides/README.md` | The `§22` citations removed from the tagline and the `AGENTS.md` link description. |
| `/home/user/fleet/pool/guides/pool.md` | `PoolInterface` and `PoolToken` method tables keyed by H4; validators test listed; detach coverage named. |
| `/home/user/fleet/pool/src/core/Pool.ts` | `acquire`, `clear`, and `destroy` doc blocks state their rejection failure modes. |
| `/home/user/fleet/pool/src/core/factories.ts` | `createPool` doc block states the synchronous `code: 'invalid'` construction throw. |
| `/home/user/fleet/pool/src/core/types.ts` | The same three `@throws` additions, byte-identical to their `Pool.ts` twins. |
| `/home/user/fleet/pool/tests/guides.test.ts` | Header amended; `@src/core` guards imported; `flagship fences` executes and pins the boundary fence. |
| `/home/user/fleet/pool/tests/setup.ts` | Banner citation removed at the original width; helper sentence restated over the present tree. |
| `/home/user/fleet/pool/tests/src/core/Pool.test.ts` | Guard-only assertions removed, two cases renamed, dead line deleted, listener-detach case added. |
| `/home/user/fleet/pool/tests/src/core/validators.test.ts` | New mirrored proof for `isPoolMax` and `isPoolSignal`. |

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

Each plant was reverted by the inverse edit immediately after its capture. `git status --short` lists neither `src/core/validators.ts` nor `src/core/Pool.ts` as modified, which is the revert's proof.

### pool-obj-1 — `npm --prefix /home/user/fleet/pool run test:guides`

| Control | Reading | File |
| --- | --- | --- |
| `isPoolMax` planted `typeof value === 'number' && value > 0` | 1 failed, 24 passed (25) | `pool-obj-1-control-planted-guard-red.txt` |
| Fence comment cut to `isPoolMax(Infinity) // false` | 1 failed, 24 passed (25) | `pool-obj-1-control-edited-fence-red.txt` |
| Both reverted | 25 passed (25) | `pool-obj-1-subj-1-subj-2-green.txt` |

The planted guard reddens the executed case and leaves the presence guard green; the edited fence does the reverse. Each half is independently load-bearing.

### pool-obj-2 — `npm --prefix /home/user/fleet/pool run test:src`

| Control | Reading | File |
| --- | --- | --- |
| Baseline before the row | 41 passed (41), 2 files | `pool-obj-2-obj-3-baseline.txt` |
| `isPoolSignal` planted as an `'aborted' in value` shape check | 1 failed, 46 passed (47) | `pool-obj-2-control-planted-guard-red.txt` |
| `isPoolMax` planted `typeof value === 'number' && value > 0` | 2 failed, 45 passed (47) | `pool-obj-2-control-planted-max-red.txt` |
| Both reverted | 47 passed (47), 3 files | `pool-obj-2-obj-3-green.txt` |

The `isPoolSignal` plant reddens only the new mirrored file. `Pool.test.ts` stays green under it, because `acquire` still throws through `#state` — the measurement that the guard had no binding proof before this row.

### pool-obj-3 — `npm --prefix /home/user/fleet/pool run test:src`

| Control | Reading | File |
| --- | --- | --- |
| `removeEventListener` deleted from `Pool.#detach` | 1 failed, 46 passed (47) | `pool-obj-3-control-detach-removed-red.txt` |
| Reverted | 47 passed (47) | `pool-obj-2-obj-3-green.txt` |

The single failure is the new case at `tests/src/core/Pool.test.ts:386`, confirming no other case in the suite reads listener state.

### pool-subj-1 and pool-subj-2 — `npm --prefix /home/user/fleet/pool run test:guides`

| Control | Reading | File |
| --- | --- | --- |
| Both `####` keys removed, tables bare (pre-row shape) | 15 passed (15), green | `pool-subj-1-subj-2-control-no-h4.txt` |
| `flush` phantom row in the `PoolInterface` table | 2 failed, 23 passed (25) | `pool-subj-1-control-phantom-red.txt` |
| `PoolToken` row renamed `release` to `dispose` | 3 failed, 22 passed (25) | `pool-subj-2-control-renamed-red.txt` |
| All reverted | 25 passed (25) | `pool-obj-1-subj-1-subj-2-green.txt` |

The no-H4 control is the defect measured directly: the run is green while reporting 10 fewer assertions, because the method-parity loops iterate over nothing.

The comment/prose rows carry sweeps rather than controls.

## Sweeps

Each ran through `Grep` over `/home/user/fleet/pool` with `node_modules` excluded.

| Pattern | Population | Result |
| --- | --- | --- |
| `§` | package outside `node_modules` | Hits only in `guides/probe.md`, `guides/guide.md`, `guides/emitter.md` — vendored mirrors. |
| `AGENTS §` (case-insensitive) | same | `guides/emitter.md`, `guides/guide.md` only. None in `guides/README.md`, `tests/setup.ts`, `guides/pool.md`. |
| `createResourceFactor(y\|ies\|ied\|ing)` (case-insensitive) | same | `guides/test.md` only, the vendored `@orkestrel/test` mirror. No hit in `src/` or `tests/`. |
| `bounded, typed` (case-insensitive) | same | No hit. |
| `\b(one\|two\|…\|ten)\b` (case-insensitive) | `src/**`, `tests/guides.test.ts`, `tests/setup*.ts`, `tests/src/**`, `guides/pool.md`, `guides/README.md`, `README.md` | Every hit a singular determiner or pronoun, after the one fix noted next. |
| `\b\d+ (elements\|members\|…\|categories)\b` | same | No hit. |
| `should\|simply\|easy\|easier\|just\|currently\|via\|in order to\|e.g.\|i.e.\|etc.\|performant\|robust\|allows you to\|and/or\|please\|sanity check\|dummy\|ensure\|guarantee\|leverage\|utilize\|both` (case-insensitive) | same | Two pre-existing `both` hits, each naming its members in the sentence (`guides/pool.md:157`, `tests/src/core/Pool.test.ts:978`). |

The number-word sweep caught a count in a comment I had just written — "The two detach sites a leak can reach" — over a set with three `#detach` call sites. It now names its members instead. I also removed the count at `tests/guides.test.ts:2` ("The four constants below"), because row pool-obj-1 adds a package-specific block that falsified the same sentence's "the only part a sibling package changes"; `/home/user/fleet/contract/tests/guides.test.ts:2` already carries the number-free form.

## Gates

| Gate | Exit code | Transcript |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-format-check.txt` |
| `npm run lint:check` | 0 | `gate-lint-check.txt` |
| `npm run check` | 0 | `gate-check.txt` |
| `npm run build` | 0 | `gate-build.txt` |
| `npm test` | 0 | `gate-test.txt` |

`npm test`: `src:core` 47 passed, `policy` 111 passed, `config` 46 passed, `setup` 3 passed, `guides` 25 passed.

One convergence step ran before the final chain. The first `format:check` after the guide edits exited 1 with `Format issues found in above 1 files` naming `guides/pool.md` — oxfmt formats Markdown and widened the new `PoolToken` table's header and separator by one column. The granted `cd /home/user/fleet/pool && npx oxfmt --config .oxfmtrc.json guides/pool.md` touched that table alone, and `format:check` has exited 0 on every run since.

## Breaking

None. No row renames or removes a published symbol; `src/core/index.ts` is unchanged.

## Shared-file patches

None. No file outside Owned needed a change to keep this package's gates green.

## Deviations

None. Three ancillary questions were decided and carried.

1. **`isPoolSignal` stays imported in `Pool.test.ts`.** `Pool.test.ts:107`'s `expect(isPoolSignal(controller.signal)).toBe(true)` covers a different input — a native signal carrying hostile own accessors — and establishes that the rejection asserted next comes from the prototype read rather than a guard refusal. Row pool-obj-2 named only `:81-83`. `isPoolMax` left the import list; `isPoolSignal` stayed.
2. **The throwing-`Proxy` input is built inline in both test files.** Its consolidating home would be `tests/setup.ts`, and row pool-obj-4 fixes that file's content to "this package's own event vocabulary", so a fixture there would falsify the sentence the row prescribes. It is an inert input stub rather than a fixture factory, so no rule breaks. Flagged for a successor unit that owns `tests/setup.ts` and `tests/setup.test.ts` together.
3. **`guides/pool.md` § Tests gained the new file and the new coverage.** Method step 3's in-package consumer update: the list now carries `tests/src/core/validators.test.ts`, and the `Pool.test.ts` summary names abort-listener detachment. Link parity is green over both.

## Observations, not criteria

- `npm test` ran on an otherwise idle checkout with no timing failure. The deciding whole-suite run belongs to the Orchestrator after this unit exits.
- `guides/probe.md` sits in `guides/` but `guides/README.md` names only `emitter.md` and `guide.md` under `## Dependency reference`. It predates this unit, no row names it, and manifest parity is green because the parser reads listed guides only. Reported, not touched.
