All rows closed, all gates green, and the audit prints its single zero-drift line. Returning the appended section.

## Fix round 1

Closes the round-1 objective lane's findings F1 through F6 and referral R1 (`units/l2a/pool-objective-r1.md`).

- **F1.** `guides/pool.md:73` now reads "The public call-signature members of `PoolInterface` and `PoolToken`; `Pool` implements the `PoolInterface` list exactly." One sentence — "The lease returned by `acquire`, with the one operation that returns its record." — sits between `#### \`PoolToken\`` and its table. `Grep` over `tests/guides.test.ts` for the old sentence found no presence guard quoting it.
- **F6.** The `Pool.test.ts` bullet at `guides/pool.md:241-247` is rewrapped to the file's existing width; no word changed.
- **R1.** `guides/README.md` § Dependency reference gained one paragraph naming `probe.md` and `test.md` as byte-identical mirrors of the guides for `@orkestrel/probe` and `@orkestrel/test`, in the form of the two existing paragraphs, which stayed byte-unchanged.
- **F3.** Planted a second control in `src/core/Pool.ts`: deleted `this.#detach(waiter)` from `destroy()`'s waiter loop, leaving the commit-path call untouched. The run reddened the same `getEventListeners` case's destroy-path assertion at `tests/src/core/Pool.test.ts:395` (`expected [ [Function] ] to have a length of +0 but got 1`; 1 failed, 40 passed (41)), captured to `pool-obj-3-control-detach-destroy-red.txt`. Restored the line byte-for-byte; `git -C /home/user/fleet/pool diff -- src/core/Pool.ts` again carries only the three `@throws` hunks, with `#detach` unchanged. The re-run captured to `pool-obj-3-control-detach-destroy-green.txt` read 41 passed (41).
- **F2, F4, F5, and the pool-obj-3 sentence.** The revert-proof sentence now states the true reading: `git status --short` lists no `src/core/validators.ts` entry, and `git -C /home/user/fleet/pool diff -- src/core/Pool.ts` carries only the three `@throws` hunks, with `#detach` unchanged. The sweep table gained four rows — `without leaking the listener`, the two renamed case titles, `` growing up to `max`, or parking on ``, and the `tests/guides.test.ts` header clause `The four constants below are this package's own` — each swept over `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md` and read empty. Line 38 now names the classes `Pool` and `PoolError` instead of counting them. The citation at line 206 now reads `Pool.test.ts:105-106`. The pool-obj-3 row and its controls table carry the second control's transcript and its red count.

## Sweeps (fix round 1)

Every sweep ran through `Grep` over `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`, and each read empty.

| Pattern | Result |
| --- | --- |
| `without leaking the listener` | No hit. |
| `accepts only positive safe integer maxima and omission remains unbounded`\|`recognizes only native signals and synchronously throws for an invalid acquire signal` | No hit. |
| `` growing up to `max`, or parking on `` | No hit. |
| `The four constants below are this package's own` | No hit. |

## Gates (fix round 1)

| Gate | Exit code | Note |
| --- | --- | --- |
| `npm run format:check` | 0 | `oxfmt --check`, 38 files, no reformat needed. |
| `npm run lint:check` | 0 | `oxlint --deny-warnings`, no output. |
| `npm run check` | 0 | `tsc --noEmit` across the project and `src:core`. |
| `npm run build` | 0 | `dist/src/core` rebuilt cleanly. |
| `npm test` | 0 | `src:core` 47 passed, `policy` 111 passed, `config` 46 passed, `setup` 3 passed, `guides` 25 passed. |

## Audit (fix round 1)

`npx scaffold audit --offline` printed: "0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."

`git -C /home/user/fleet/pool status --short` lists exactly the unit's ten paths: `README.md`, `guides/README.md`, `guides/pool.md`, `src/core/Pool.ts`, `src/core/factories.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/src/core/Pool.test.ts` (modified), and `tests/src/core/validators.test.ts` (added).

Relevant paths: `/home/user/fleet/pool/guides/pool.md`, `/home/user/fleet/pool/guides/README.md`, `/home/user/fleet/pool/src/core/Pool.ts`, `/home/user/scaffold/tmp/units/conform/conform-pool-report.md`, `/home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-destroy-red.txt`, `/home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-destroy-green.txt`.
