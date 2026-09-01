# Unit harness — the staging instruments and their measurements

## Role and engine

Orchestrator-owned instrument unit (the Orchestrator writes the scripts and takes the
measurements as tracked commands; no role is dispatched). Audited by `checker` on Sonnet against
`.agents/orchestration.md` § Fixing a dependency before it publishes, and by the objective
`reviewer` lane on Opus 5 on the digest control.

## Objective

Instruments under `/home/user/work/` (retained in `.orkestrel/campaign/instruments/`) that build,
pack, stage, verify, and restore fleet dependencies from committed tips, plus the measurements the
plan's staging rulings rest on.

## Scope

Owned: `/home/user/work/pack-dep.sh`, `/home/user/work/stage-deps.sh`,
`/home/user/work/verify-stage.mjs`, `/home/user/work/restore-dep.sh`, the register
`.orkestrel/campaign/fix/tarballs.json`, and `node_modules/` of the checkouts the measurements
stage into (`budget`, `database`, `worker`), each restored from its lockfile afterwards.
Off-limits: every source, test, guide, manifest, and lockfile in every checkout.

## Acceptance criteria

1. `pack-dep.sh <package>` refuses a dirty tree, builds, packs to `tmp/tarballs/<package>-<sha>.tgz`,
   and reuses an existing tarball for the same commit.
2. `stage-deps.sh <consumer> <tarball>...` installs every tarball in one `npm install --no-save`
   command, refuses when the manifest or lockfile moved, and writes one register row per tarball
   with consumer, dependency, declared range, tarball, version, digest, commit, and staged time.
3. `verify-stage.mjs <consumer>` compares every file of each staged tarball against the installed
   copy and exits non-zero on any difference; its negative control is recorded: a plain
   `npm install` makes it report red, and re-staging makes it green.
4. `restore-dep.sh <consumer>` reinstalls from the lockfile and stamps the restore time on the
   consumer's register rows before clearing them.
5. Measurements, each with its command and its run: build-plus-pack wall time for `contract`;
   one-tarball install wall time into `budget`; whether a second `--no-save` install preserves the
   first tarball; `npm ls @orkestrel/contract` copy count in `worker` after staging the contract
   tarball alone and after staging the changed closure in one install, with `npm run check` in
   each state; `npm run check` wall time in `database` against a staged tree.
