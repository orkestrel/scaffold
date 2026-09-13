# Implementation brief — U-dist

## Role and engine

Opus `implementer`, native Claude subagent, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`.

**Routing note.** This unit's subject is a proof that spawns npm children and reads their pipes and
exit codes. A bench sandbox denies a grandchild process and has unreliable child stdio, so the subject
is unmeasurable there; `.agents/orchestration.md` § Bench laws routes such a subject to the native
implementer. Recorded.

## Objective

Make the release-mode distribution proof launch the npm the generated manifest names, so
`npm run test:distribution -- --mode release` exits `0` on a host whose ambient npm the generated
workspace refuses. This is the last red gate in scaffold's `prepublishOnly`.

## Why — read `.orkestrel/campaign/scaffold-fix-design-verdict.md` first

Commit `a371cea` made every generated manifest carry
`devEngines.packageManager: { name: 'npm', version: '>=11.6.0', onFail: 'error' }`, because npm
through `11.5.0` crashes resolving the generated peer graph and `11.6.0` is the first that does not.
This host runs ambient npm `10.9.7`. `tests/distribution.test.ts:907` installs the generated workspace
with that ambient npm, so the guard now refuses it with `EBADDEVENGINES` and the assertion at `:912`
fails. `:932` then runs the generated workspace's whole `prepublishOnly` under the same npm, and every
nested `npm run` inside that chain is checked against the guard too.

`ROADMAP.md:370-375` holds the open ruling: "rule whether the proof launches the npm the `engines`
field names or the field names npm 11." The design round ruled: **the proof launches the npm the
manifest names.**

## Mechanism — measured by the Orchestrator, instrument `evidence/linux-gate/path-prepend.sh`

The `npx npm@X` launch form is **rejected**: it runs X's CLI but leaves the ambient npm version where
`devEngines` reads it, so every row self-reports `10.9.7` and the guard refuses. Do not use it.

The working form: `npm install --prefix <scratch>/npm npm@<version>` with the ambient npm, then
prepend `<scratch>/npm/node_modules/.bin` to `PATH` in the environment passed to every spawn that
operates on the generated workspace. Measured on this host:

```text
ambient npm, nested `npm run` in a guarded workspace   -> EBADDEVENGINES, exit 1
PATH-prepended provisioned npm, the same nested run    -> reports 11.6.0 two levels deep, exit 0
`command -v npm` under that PATH                        -> <scratch>/npm/node_modules/.bin/npm, self-reports 11.6.0
```

## What to build

1. **Read the floor from the generated manifest**, not from a constant. After the test parses
   `generated/package.json` (it already does, around `:879` for `devDependencies`), read
   `devEngines.packageManager.version`. It is a `>=X.Y.Z` range; the version to provision is `X.Y.Z`.
   Treat a missing or malformed field as a test failure with a message naming the field, never as
   "use ambient".
2. **Resolve an admitted npm.** If the ambient `npm --version` satisfies the floor, use it. Otherwise
   provision the floor's minimum into the test's scratch and build an environment whose `PATH` starts
   with that prefix's `.bin`. Make this an exported, tested helper — `AGENTS.md` bars a hidden module
   helper — in `tests/setupServer.ts`, with its declarations placed per `.claude/rules/architecture.md`
   and its test in `tests/setupServer.test.ts`. Module-scope helpers use `{verb}{Noun}`. Compare
   versions with a mechanism that already exists in the tree if one fits (`@src/core` exports a
   version comparator — check before writing one).
3. **Use it for every generated-workspace spawn**: the install at `:907` and the `prepublishOnly` at
   `:932`, passing the resolved environment so nested `npm run` calls resolve the same npm. The
   `pack` at `:795`, the `ping`, and the bare-consumer install at `:806` keep the ambient npm — nothing
   there is guarded.
4. **Keep the Windows path honest.** The file already branches on `win32` for `npm.cmd` and `shell`.
   A provisioned `.bin` on Windows carries `npm.cmd`; keep the existing branch consistent rather than
   adding a second one. You cannot run Windows here; state that in your report as an observation.
5. **Test the helper against a second mechanism**, per `.claude/rules/tests.md`: assert that the
   resolved npm's own `--version` satisfies the floor, and that an ambient npm below the floor is
   *not* what it returns. Do not assert the helper against itself.

## Owned files

`tests/distribution.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, and any test-side
types file `.claude/rules/architecture.md` prescribes for a new reusable declaration.

## Off-limits

`src/**` (this is a proof change, not a product change), `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, everything under `configs/`, the root dotfiles,
`package.json`, `package-lock.json`, `host.json`, `guides/**`, `ROADMAP.md`, `.orkestrel/**`,
`tmp/**`, and every file under `/home/user/toolbox` and `/home/user/ollama`. A serial writer follows
you in this checkout and owns `tests/src/server/helpers.test.ts`; do not touch it.

## Host conditions

Linux, `node v22.22.2`, ambient `npm 10.9.7`, four CPUs, no IPv6 stack, registry reachable
(`npm ping` answers). Provisioning `npm@11.6.0` takes roughly 10–15 seconds and needs the network;
the proof is already gated on `registry`, so that is consistent. `node_modules` is installed and
current; do not reinstall. `dist/` is built from the current tree.

## Execution

Perform this assignment directly and spawn no agent. Write only the owned files.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — if the
generated workspace's `prepublishOnly` fails for a reason other than npm selection, if a file outside
the owned list must change, or if criterion 3 cannot be reached. Where the helper lives inside
`setupServer.ts` and what its parameter is named are yours to decide and record.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits `0`.
2. `npm run lint:check` exits `0`.
3. `npm run check` exits `0`.
4. `npm run test:setup` exits `0` — the helper's own proof lives in the `setup` project.
5. **`npm run test:distribution -- --mode release` exits `0` on this host**, under ambient npm
   `10.9.7`. Record the full run's duration.
6. `git diff --stat` names only owned files.

## Output

Return, as structured data: the touched files with a one-line reason each; each criterion with its
exact exit code; the distribution run's duration; the Windows observation; the deviation state.
No process diary.
