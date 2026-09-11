# Scaffold git-record repair report

## Outcome

Done within the bounded unit. This report supplies implementation and scoped evidence only. It does
not accept the release.

The git reader now streams raw NUL-delimited bytes through the installed
`@orkestrel/process@0.0.11` `createSession` boundary. It retains complete records instead of a
manifest-sized capture, preserves git order, applies the worktree record and unfinished-path bounds,
and refuses every unsuccessful terminal state under `TARGET`. The overwrite path awaits the reader,
normalizes porcelain prefixes, and then keeps `isWorktree` as the authoritative completed-path
validator.

## Baseline and scope

Expected HEAD: `502428f11b792feab233120d1de395b197117610`.

Found HEAD: `502428f11b792feab233120d1de395b197117610`.

The owned paths had no diff from HEAD before this unit. The existing dirty state was confined to the
root-disclosed agent, guide, manifest, lockfile, package metadata, CLI fixture, and generated fixture
work. This unit preserved that state.

Touched paths:

- `src/bin/helpers.ts`
- `src/bin/CLI.ts`
- `tests/src/bin/helpers.test.ts`
- `guides/scaffold.md`

`tests/setupServer.ts` did not need a seam and was not changed. No dependency, config, generated
output, manifest, fixture, ref, install, build, full suite, commit, push, or publication action ran.

Owned diffstat:

```text
guides/scaffold.md            |   7 ++
src/bin/CLI.ts                |  15 ++---
src/bin/helpers.ts            | 146 ++++++++++++++++++++++++++++++++++++------
tests/src/bin/helpers.test.ts |  87 +++++++++++++++++++++++--
4 files changed, 222 insertions(+), 33 deletions(-)
```

`git diff --check -- src/bin/helpers.ts src/bin/CLI.ts tests/src/bin/helpers.test.ts guides/scaffold.md`
passed with no output.

## Defect proof

The regression uses a real scratch git repository. It writes one real blob, populates the real index
with git plumbing, and asks git for tracked and porcelain-status NUL streams that exceed
`MAX_MANIFEST_BYTES` while staying within the inventory and path bounds. It asserts exact tracked
and dirty membership and order, including records after the old byte boundary. It also drives a real
non-repository refusal and a real failed git subcommand.

Exact red command before production:

```text
npm run test:src:bin -- tests/src/bin/helpers.test.ts
```

Red result:

```text
exit: 1
Test Files  1 failed (1)
Tests  4 failed | 105 passed (109)
```

The large real-index case failed through the old `MAX_MANIFEST_BYTES` capture. The awaited helper
contract and accurate query diagnosis cases also failed against the old synchronous implementation.

The same command after the repair and final assertion edit:

```text
exit: 0
Test Files  1 passed (1)
Tests  109 passed (109)
```

This behavior needs a real process tree and raw child stream, which the `prove` stages do not model.
The fallback instrument was promoted directly into `tests/src/bin/helpers.test.ts`; the pre-fix run
was its negative control. No Probe call or receipt applies to this claim.

## Scoped validation

```text
npm run check:src:bin
exit: 0
```

```text
node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check src/bin/helpers.ts src/bin/CLI.ts tests/src/bin/helpers.test.ts guides/scaffold.md
exit: 0
All matched files use the correct format.
```

```text
node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings src/bin/helpers.ts src/bin/CLI.ts tests/src/bin/helpers.test.ts
exit: 0
```

The focused overwrite refusal integration passed:

```text
node_modules/.bin/vitest.cmd run --config vite.config.ts --no-cache --reporter=dot --project src:bin tests/src/bin/CLI.test.ts -t "refuses a target git cannot recover"
exit: 0
Tests  1 passed | 134 skipped (135)
```

An earlier whole `CLI.test.ts` run exposed the expected guide-digest drift after this unit changed
`guides/scaffold.md`, plus the relevant lowercase `git` diagnostic expectation. The diagnostic was
fixed and its focused integration is green. The remaining host-floor failures belong to the root's
already-owned generated manifest convergence; this unit did not edit or regenerate those shared
artifacts.

## Shared-file handoff

No shared-file patch was made. Root should include the changed scaffold-guide digest when it
converges its already-owned generated manifests and fixtures before acceptance.
