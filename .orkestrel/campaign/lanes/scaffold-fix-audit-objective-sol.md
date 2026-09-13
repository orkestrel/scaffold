The brief requests verdicts 1–15, but defines only claims 1–14. The addendum corrects the range to 1–14. No claim 15 verdict is invented.

## Numbered verdicts

1. **BROKEN.** `blueprintToManifest(createBlueprint('raised', { src: ['core'], engines: '>=24.0.0' }))` emits `engines.node: ">=24.0.0"`, not exactly `">=22.18.0"`. The npm block, key order, and `package.json` oxfmt fixed point held, including an unformatted negative control. Narrow the claim to default blueprints or state that the emitted Node range equals `blueprint.engines`.

2. **CONFIRMED.** [src/core/types.ts](/home/user/scaffold/src/core/types.ts:207) is unchanged from `2b3abca`; `Blueprint.engines` remains `readonly engines: string` at line 217. Built calls returned `false` for `>=22.12.0` and `true` for `>=22.18.0`.

3. **CONFIRMED.** The retained release-mode log records exit `0` under ambient npm `10.9.7`. [tests/distribution.test.ts](/home/user/scaffold/tests/distribution.test.ts:905) reads the emitted floor and calls `resolveNpm`. [tests/setupServer.ts](/home/user/scaffold/tests/setupServer.ts:524) provisions with `npm install --prefix … npm@11.6.0`; no `npx npm@X` form exists. The failing-first log records the same case red before this change.

4. **CONFIRMED.** The guarded install and `prepublishOnly` spawn receive `admitted.environment`. Its first `PATH` entry is the provisioned `.bin` directory, and nested `npm run` calls inherit it. The literal retained `prepublishOnly` run exited `0`.

5. **CONFIRMED.** `readNpmFloor`, `readNpmVersion`, and `resolveNpm` are exported from [tests/setupServer.ts](/home/user/scaffold/tests/setupServer.ts:455). The provisioning proof reads the installed npm manifest independently, compares its version with the helper result, requires it to differ from the ambient npm, and checks the `.bin` path precedence.

6. **CONFIRMED.** The retained host run reports the server suite green with the redirected-version case skipped. [tests/src/server/helpers.test.ts](/home/user/scaffold/tests/src/server/helpers.test.ts:220) cites the `AF_INET6`/`EAFNOSUPPORT` mechanism, and line 230 preserves `[::ffff:127.0.0.1]`.

7. **BROKEN.** Plain-loopback cases call `scripts/ollama.sh` while inheriting this host’s `PATH`, which resolves `/usr/local/bin/ollama`; examples include [tests/src/server/helpers.test.ts](/home/user/scaffold/tests/src/server/helpers.test.ts:157) and line 184. If the fixture’s version response misses the script’s 2-second probe window, [scripts/ollama.sh](/home/user/scaffold/scripts/ollama.sh:186) follows the loopback startup branch and launches the real executable at line 252. Make `executeOllamaSetup` supply a controlled test environment in which a real `ollama` cannot resolve, and pin the unreachable-loopback path.

8. **CONFIRMED.** [tests/setupServer.test.ts](/home/user/scaffold/tests/setupServer.test.ts:1105) compares the raw-socket predicate with a real HTTP request to the mapped address. Plain IPv4 returning `200` is its control. The filesystem reading at line 1133 provides another host fact where `/proc/net` supplies one.

9. **CONFIRMED.** The removed phrase is absent. [ROADMAP.md](/home/user/scaffold/ROADMAP.md:370) records the `11.6.0` boundary; line 376 records `devEngines.packageManager`; line 382 records the `&&` chain; line 389 records the emitted `@types/node` question. The retained policy run exited `0`.

10. **CONFIRMED.** The retained literal `npm run prepublishOnly` invocation exited `0` after running its complete command chain.

11. **CONFIRMED.** An in-memory reconstruction expanded `HOST_PATHS` and `CANON_PATHS`, read every source digest, sorted the entries and roots, recomputed the membership digest, and matched `host.json` byte-for-byte. Replacing one entry digest was the negative control and differed as required.

12. **BROKEN.** The generated manifest includes `@orkestrel/probe@^0.0.13`. Its installed dependency chain reaches `@orkestrel/sqlite@0.0.11`, whose [package-lock.json](/home/user/scaffold/package-lock.json:398) engine range is `^22.18.0 || >=24.4.0`. An executed semver reading returned `false` for Node `24.0.0` and `true` for `24.4.0`. The Node 22 generated-workspace run held. Preserving the stated Node 24 line requires a dependency chain that admits `24.0.0`; otherwise the support claim must begin at `24.4.0`. A Node `24.0.0` and `24.4.0` gate run with `npm ci --engine-strict` would settle runtime admission.

13. **CONFIRMED.** The retained target pre-flight records `repair --offline` and `audit --offline` at exit `0` for toolbox and ollama after staging `0.0.65`. Their format, lint, check, build, test, and release-distribution status records also report exit `0`.

14. **BROKEN.** [tests/setupServer.test.ts](/home/user/scaffold/tests/setupServer.test.ts:1076) performs a registry-backed `npm install` inside the default `setup` project on hosts below the floor. This violates `.claude/rules/tests.md` requirements that default suites make no network calls and that process-spawning or installing proofs use the isolated `distribution` or `service` project. Reuse the provisioning already performed by `tests/distribution.test.ts` for the independent installed-manifest assertion, and remove the network case from `setup`.

## Findings outside the claims

- **F1 — Published README states the wrong Node floor.** [README.md](/home/user/scaffold/README.md:12) promises Node 22.12 or later, while [package.json](/home/user/scaffold/package.json:118) requires `>=22.18.0`. The README ships in the npm tarball. Change it to 22.18.0 and pin the published statement against the manifest floor.

- **F2 — Root lock metadata retains the old Node floor.** [package-lock.json](/home/user/scaffold/package-lock.json:37) records `>=22.12.0` for the root package while `package.json` records `>=22.18.0`. Regenerate the lock metadata and verify the root package entry matches the manifest.

## Attacked and held

- **Claims 2 and 11:** Attempts to find a moved contract declaration, a stale vendored digest, missing membership, or an ineffective identity comparison failed. The mutated inventory control differed.
- **Claims 3–5:** Attempts to find ambient npm leakage found the provisioned `.bin` first in `PATH`, the guarded install and gate using that environment, and an independent installed-manifest check.
- **Claims 6 and 8:** Listener setup failures propagate, the mapped address remains unchanged, and the HTTP comparison carries a reachable IPv4 control.
- **Claims 9 and 10:** Exact text searches and retained bare gate output support the claims; no wrapper exit status substitutes for either result.
- **Claim 13:** The instrument-created colon filenames caused the earlier false policy result. After those files left the measured trees, the same repaired targets passed, so that adjacent failure was correctly attributed to the instrument.

## Unknown observations

- **U1:** No passing case was found that succeeds for a reason other than its named behavior. The admitted-npm case runs on this host and checks the installed npm independently. The mapped redirected-version case is skipped rather than passed.
- **U2:** The premise that the ambient branch is untested is false. [tests/setupServer.test.ts](/home/user/scaffold/tests/setupServer.test.ts:1059) reaches it at the equality boundary and verifies unchanged `PATH` and no installation. An ambient npm strictly above `11.6.0` remains unmeasured; run `npm run test:setup -- -t 'launches the host npm unchanged'` on such a host. No provisioned `.bin` shim participates in that branch.
- **U3:** The code delegates Windows executable discovery and case-insensitive environment merging to `@orkestrel/process`, but this host cannot show that npm creates and resolves `<prefix>\node_modules\.bin\npm.cmd`. On Windows with ambient npm below `11.6.0`, run `npm run test:setup`, `npm run test:distribution -- --mode release`, and the literal `npm run prepublishOnly`.

VERDICT: FAIL 1, 7, 12, 14; outside the claims: F1, F2