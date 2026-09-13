# u-dist — unit report

Engine: Opus 5 `implementer`, native subagent, workflow `wf_532659d1-39d`.
Structured return, transcribed verbatim from the workflow journal.

## done

true

## touched

- `tests/setupServer.ts` — Adds the exported TestNpmOptions and TestNpmInterface declarations and the readNpmFloor, readNpmVersion, and resolveNpm helpers that read a manifest's devEngines floor and resolve an admitted npm with its environment.
- `tests/setupServer.test.ts` — Adds the 'the admitted npm' proof in the setup project covering the floor reading, its refusals, the host-npm reading, the admit branch, and the provisioning branch.
- `tests/distribution.test.ts` — Reads the floor from the generated manifest and passes the resolved environment to the guarded workspace's install and prepublishOnly spawns, and carries npm's output in each assertion message.

## criteria

- npm run format:check — exit `0` — oxfmt over 225 files, 'All matched files use the correct format'. Log: /tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/logs/c1-format.log.txt
- npm run lint:check — exit `0` — oxlint --deny-warnings, no output. Log: .../logs/c2-lint.log.txt
- npm run check — exit `0` — tsc root project plus check:src:core, check:src:server, check:src:bin. Log: .../logs/c3-check.log.txt
- npm run test:setup — exit `0` — Test Files 3 passed (3), Tests 84 passed (84), 6.07s. A verbose run of -t 'admitted npm' names all six new cases passing, the provisioning case at 3200ms. Log: .../logs/c4-setup.log.txt
- npm run test:distribution -- --mode release — exit `0` — Tests 5 passed (5). Duration 75.37s reported by vitest; wall clock 2026-09-13T04:59:21Z to 05:00:37Z. Log: .../logs/c5-distribution-final.log.txt
- git diff --stat names only owned files — exit `0` — tests/distribution.test.ts, tests/setupServer.test.ts, tests/setupServer.ts. 278 insertions, 8 deletions. git status --porcelain lists the same three and nothing else.

## observations

- Failing-first proof. Before the change, `npm run test:distribution -- --mode release` exited 1 with `Tests 1 failed | 4 passed (5)`, AssertionError `expected 1 to be +0` at tests/distribution.test.ts:912, duration 9.20s, run 2026-09-13T04:48:32Z. After the change the same command exits 0 with `Tests 5 passed (5)`, duration 75.37s. Red log: /tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/logs/red-distribution.log.txt
- Named failing test: 'installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]'. It is the same case that passes after the change; no test was renamed.
- Windows observation, unverified on that platform because this host is Linux. The new helpers add no win32 branch: readNpmVersion and resolveNpm launch npm through `executeSync` from @orkestrel/process/server, which resolves the executable through its own `buildSpawn`/`resolveExecutable` path (an absolute path on Windows, the bare name on POSIX) and never uses a shell. The existing branch at tests/distribution.test.ts:13-21 (`npm.cmd` plus `shell`) is untouched and still carries both guarded spawns; cmd.exe resolves `npm.cmd` from the PATH in the environment passed to it. `mergeEnvironment` documents that win32 keys fold case-insensitively with the last writer winning, so the prepended PATH does not become a second variable beside an existing `Path`, and `node:path` `delimiter` is `;` there. What I cannot check here is that npm writes `npm.cmd` into a `--prefix` target's `node_modules/.bin` on Windows.
- Recorded decision the brief left to me: the helpers live in tests/setupServer.ts beside the other host readings, after CASE_FOLDING. `resolveNpm` takes one options object with `floor` (the exact major.minor.patch the declared range floors at), `prefix` (a caller-owned directory a provisioned copy lands in), and optional `environment` (the record the provisioned PATH is prepended to, defaulting to process.env).
- Reuse rather than new mechanism, per AGENTS.md on declared @orkestrel/* capabilities: `compareVersions` and `FLOOR_RANGE_PATTERN` from @src/core do the version comparison and the `>=X.Y.Z` syntax check; `executeSync`, `mergeEnvironment`, and `readVariable` from @orkestrel/process/server do the spawn, the case-correct environment merge, and the PATH read. I wrote no version parser, no PATH case folding, and no platform branch.
- The `npx npm@X` form the brief rejects is not used. The provisioning form is `npm install --prefix <prefix> --ignore-scripts --no-audit --no-fund npm@<floor>` followed by a PATH prepend of `<prefix>/node_modules/.bin`, and the helper then re-reads `npm --version` under that environment and throws if the reading is still beneath the floor.
- Scope check on the unguarded spawns: `pack` (line 796), the bare-consumer install (line 810), and the three refused-peer fixtures (lines 681, 723, 750) still take the ambient `environment`. Only the guarded workspace's install (line 926) and prepublishOnly (line 954) take `admitted.environment`.
- Network cost in the setup project, which the Orchestrator can rule on. The provisioning case is the only branch that reaches the registry, and it runs only where the host npm is beneath MINIMUM_NPM_VERSION — which is this host (10.9.7), where it costs 3200ms against a warm cache. The case is gated by `it.skipIf(compareVersions(host, MINIMUM_NPM_VERSION) >= 0)` with the mechanism in its title, so a host at or above the floor has nothing to provision and `npm test` stays offline there. .claude/rules/tests.md asks default suites to make no network calls and .claude/rules/tests.md § Expensive proofs puts installing proofs in the distribution or service project, while § Shared test infrastructure keeps setup-helper assertions in tests/setup*.test.ts; the brief fixed the placement at tests/setupServer.test.ts and made test:setup a criterion, so I implemented it there and report the tension rather than moving the assertions.
- Second-mechanism proof, per .claude/rules/tests.md. The provisioning case compares the helper's reported version against the version declared in `<prefix>/node_modules/npm/package.json`, read from the filesystem rather than from a run, asserts the reported version is not the host's, and asserts the first PATH entry is the prefix's `.bin` path the test computed itself. The floor-reading case compares against the manifest a real compiler emitted through `buildCompiledPlan`, checked against MINIMUM_NPM_VERSION. The admit case asserts nothing was written into the prefix.
- Sibling gates I ran as observations, not criteria: `npm run test:policy` exit 0 (91 passed) and `npm run test:guides` exit 0 (22 passed). I did not run the whole suite or the build; timing-sensitive whole-suite gates belong to the Orchestrator's own run.
- Self-inflicted detour worth knowing about: I formatted with `npx prettier` before reading package.json, which rewrote unrelated wrapping across the three files and oxfmt did not normalize it back. I restored each file from `git show HEAD:<path>` into the file (no git checkout, restore, stash, reset, or clean was run) and re-applied my patches, then formatted with `npx oxfmt --config .oxfmtrc.json` scoped to the three owned files. The final diff is 278 insertions and 8 deletions with no unrelated reformatting.

## deviation

(none)
