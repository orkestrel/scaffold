1. **CONFIRMED** — `toolbox.status.txt` records exit `0` for `format:check`, `lint:check`, `check`, `build`, `test`, and release-mode `test:distribution`. The gate log shows the same commands in the required order without substitution.

2. **CONFIRMED** — `ollama.status.txt` and `ollama-gates.log.txt` record the same ordered acceptance chain at `21068c3`, with every gate exiting `0`.

3. **CONFIRMED** — `.oxlintrc.json:5` loads `./configs/policy.ts`. The recorded control emitted `policy(no-banned-term)` and `typescript(explicit-member-accessibility)`. The real `lint:check` then exited `0` under Node `22.22.2`. The Node `22.12.0` load failure did not reproduce.

4. **CONFIRMED** — `/proc/net/if_inet6` is absent. `tests/src/server/helpers.test.ts:217` changes a working IPv4 fixture address into an IPv4-mapped IPv6 address. The logged failure records no request, while the other assertions pass. Direct execution of `scripts/ollama.sh` against that address exited `1` with the asserted refusal message. The script classifies the mapped address as non-loopback at `scripts/ollama.sh:73-81` and follows no redirect in its readiness probe at `scripts/ollama.sh:131-138`.

5. **UNRESOLVED** — `tmp/evidence/npm-arborist-crash.txt` contains the npm `12.0.2` success but not the promised npm `10.9.7` stack. The supplied gate log hides the child’s output behind `expected 1 to be +0`. Registry access is denied, so the comparison was not attempted. The settling commands are `npm run test:distribution -- --mode release` under npm `10.9.7` and `npx --yes npm@12.0.2 run test:distribution -- --mode release`, each with identical fresh generated inputs.

6. **BROKEN** — the no-blocker ruling contradicts the release contract. `references/wave.md:104` requires each package’s own `prepublishOnly` script to finish green. Scaffold’s `test` and release-mode `test:distribution` gates exit `1`. `ROADMAP.md:370-375` still carries the npm-major behavior as an open ruling. The packed artifact was inspected in memory and has SHA-256 `22df11f9626ac36d5a310c36de1750b17538c0d2bd6a5745037b2f5df1b68c61`; artifact validity under npm `12.0.2` does not authorize publishing while the required gate remains red and npm `10.9.7` consumer behavior remains unresolved.

7. **BROKEN** — scaffold’s Linux `npm test` did not exercise a superset of its Windows run. Its `&&` chain stopped after `test:src:server` failed. The log contains no Linux execution of `test:src:bin`, `test:policy`, `test:config`, `test:setup`, or `test:guides`. The reported “four other scaffold test projects” are the passing files inside the server project, not the later projects.

8. **UNRESOLVED** — local manifests and commits match `0.0.65`/`c439685`, `0.0.13`/`21068c3`, and `0.0.15`/`d6e868d`; tracked worktree and index diffs are empty. Registry versions and published-tarball bump rulings require registry evidence. The unattempted settling commands are `npm view @orkestrel/scaffold version`, `npm view @orkestrel/toolbox version`, and `npm view @orkestrel/ollama version`, followed by the required published-tarball comparisons.

9. **CONFIRMED** — `ollama-service.log.txt` records `npm run test:service`, `11 passed (11)` files, `58 passed (58)` tests, exit `0`, and duration `192.88s`. `package.json:68` places that service gate after release-mode distribution, and `vite.config.ts:131-142` selects the real, serial service project without a conditional skip.

Findings fitting no claim

- **F1** — the scaffold checkout is not clean. `git status --porcelain` reports `.orkestrel/campaign/evidence/`, `linux-gate-absorb-brief.md`, `linux-gate-absorb-report.md`, `linux-gate-brief.md`, and `linux-gate-npm-probe-report.md` as untracked. Toolbox and Ollama are clean. Scaffold’s tracked worktree and index remain unchanged.

Attacked and held

- **Claim 1** — the substitution and reordering attack failed: the toolbox log names every exact script and preserves the acceptance order. Its repository-layout and extractor skips do not skip a gate.
- **Claim 2** — the same attack failed for Ollama. The service test is separate because claim 2 covers the shared acceptance chain.
- **Claim 3** — the silent-plugin attack failed because the planted violations caused the plugin and TypeScript policy rules to emit errors.
- **Claim 4** — the script-defect attack failed. `scripts/ollama.sh` and the published `dist/host/scripts/ollama.sh` are byte-identical with SHA-256 `be5cb42991792190d7f61c7b8eef568eaf207db67cce5d2ccc223af814f2d6fa`. Refusing an unreachable non-loopback address is correct; expecting an IPv6 request on a host without IPv6 is the defective adjacent assertion.
- **Claim 9** — the fixture-only attack failed. The dedicated service project uses `tests/service/**/*.test.ts`, and the supplied service log records the real-daemon run.

Unknown observations

1. **U1** — no passing test was found whose assertion depends on absent IPv6 or proxy routing. The mapped-IPv6 case at `tests/src/server/helpers.test.ts:214` fails rather than passing. Proxy bypass configuration includes loopback and the npm registry. The single-CPU premise does not reproduce: `nproc` and `os.availableParallelism()` each report `4`.
2. **U2** — scaffold has no `test:service` script or service project. Its `Ollama setup` tests use a loopback HTTP fixture and do not execute automatic installation, owned-daemon startup, failure termination, or cleanup. Scaffold therefore lacks owned-daemon lifecycle coverage.
3. **U3** — **UNRESOLVED**. Registry access is denied, and `0.0.65` is unpublished. The unattempted settling command is `npm install --ignore-scripts --no-audit --no-fund` under npm `10.9.7` in a freshly generated core/server/bin/integration workspace retaining the registry dependency `"@orkestrel/scaffold": "^0.0.65"` after publication.

VERDICT: FAIL 5, 6, 7, 8; outside the claims: F1