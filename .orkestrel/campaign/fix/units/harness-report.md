# Unit harness — report (2026-09-01)

Instruments (retained in `.orkestrel/campaign/instruments/`): `pack-dep.sh` (reuses a tarball for
the same commit unless `FORCE=1`), `stage-deps.sh` (one `npm install --no-save` for every tarball,
one register row each), `verify-stage.mjs` (file-by-file comparison of each staged tarball against
the installed copy), `restore-dep.sh` (lockfile reinstall, restore stamp copied to
`tarballs-history.json`), `stage-set.mjs` (a consumer's @orkestrel closure from committed
manifests, runtime and development, transitive over runtime, excluding scaffold and probe),
`stage-closure.sh` (pack the closure and stage it in one command, then verify), and `devsweep.sh`.
The measurement chain is `harness-measure.sh`; its log is `/home/user/work/logs/harness-measure.log`.
Two Opus writer units were live in other checkouts during the run, so every timing is a loaded
reading.

## Measurements

| Reading | Command | Result |
| --- | --- | --- |
| Build plus pack, contract | `pack-dep.sh contract` | exit 0, 11 s, `contract-20e3efd.tgz` |
| Build plus pack, database | `pack-dep.sh database` | exit 0, 24 s |
| Build plus pack, a narrow package (queue, pool, sqlite, abort, timeout, indexeddb) | `pack-dep.sh <package>` | exit 0, 6 s to 7 s each |
| One-tarball install into budget | `stage-deps.sh budget contract-20e3efd.tgz` | exit 0, 1 s; `package.json` and `package-lock.json` clean |
| Verify after staging | `verify-stage.mjs budget` | exit 0, `OK — contract-20e3efd.tgz is the installed copy` |
| Negative control | plain `npm install` in budget, then `verify-stage.mjs budget` | exit 1, `RED — dist/src/core/index.cjs (differs)` |
| Re-stage after the control | `stage-deps.sh budget …` then verify | exit 0, `OK` |
| Second `--no-save` install preserves the first? | database: stage contract, then stage emitter in a second command, verify | exit 1: `contract RED — dist/src/core/index.cjs (differs)`, `emitter OK`. A later install reverts an earlier staged tarball. |
| Typecheck against a staged tree | `npm run check` in database | exit 0, 9 s |
| Worker, contract tarball alone | `stage-deps.sh worker contract…`, `npm ls`, `npm run check` | one top copy `0.0.15` (`invalid: "^0.0.13"`), nested `0.0.13` under database, emitter, queue; `check` exit 1 with `TS2322` and `TS2589` at `src/server/factories.ts(43,2)` (the `Infer` identity split) |
| Worker, changed closure in one install | `stage-deps.sh worker` with contract, database, queue, emitter, pool, indexeddb, sqlite, abort, timeout; verify; `npm ls`; `npm run check` | install 1 s; every tarball `OK`; every runtime copy of contract deduped to the top `0.0.15`; nested `0.0.13` only under the development dependencies guide and probe; `check` exit 0, 4 s, no `error TS` line |
| Restore | `restore-dep.sh budget`, `database`, `worker` | exit 0, 2 s to 4 s each; register empty; every history row carries a restore stamp |

## Rulings the readings force

- **Every staging is one command carrying the consumer's whole closure.** A second `--no-save`
  install reverts the first, so a consumer is never staged incrementally; `stage-closure.sh` packs
  the closure from committed tips (reusing tarballs by commit) and installs it in one command. The
  cost is one pack per package per tip plus about one second per consumer install.
- **The closure collapses the nested copies.** Staging the runtime closure from branch tips, which
  all pin `^0.0.15`, leaves one contract copy across the runtime graph; the `Infer` split
  disappears and `worker` typechecks green. `worker` joins L4 as an adopt unit when its typecheck
  reddens against the staged closure; it is not carried.
- **`verifyStage` is a real gate.** The negative control reddens on the first differing file and
  re-staging greens it; the same check catches the revert an incidental install causes.
- **Development dependencies in the closure.** `stage-set.mjs` includes `test` and `guide` (and
  their runtime closure) so a consumer's tests compile against the W-DEV tips; scaffold and probe
  stay at their registry copies.

Acceptance: criteria 1 to 5 met with the commands and readings above.
