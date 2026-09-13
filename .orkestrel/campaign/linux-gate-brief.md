# Claims brief — Linux gate readiness of three unpublished Orkestrel tips

## Subject

Three side-by-side checkouts, each on branch `claude/compassionate-knuth-5e0gyu`, each with a clean
working tree, each carrying an unpublished version bump:

| package              | tip commit | local version | registry serves |
| -------------------- | ---------- | ------------- | --------------- |
| `@orkestrel/scaffold`| `c439685`  | `0.0.65`      | `0.0.64`        |
| `@orkestrel/toolbox` | `21068c3`  | `0.0.13`      | `0.0.12`        |
| `@orkestrel/ollama`  | `d6e868d`  | `0.0.15`      | `0.0.14`        |

Checkout paths: `/home/user/scaffold`, `/home/user/toolbox`, `/home/user/ollama`.

The chain of rounds that produced this state, one line each:

- A prior campaign ruled all three tips bump-owed and ran each package's `prepublishOnly` to exit
  `0` on a **Windows** host, including the real Ollama service suite.
- That campaign recorded one standing red Linux reading: on Ubuntu with Node `22.12.0`,
  `@orkestrel/ollama`'s `npm run lint:check` failed loading `./configs/policy.ts` with
  `ERR_UNKNOWN_FILE_EXTENSION`, exit `1`.
- That campaign recorded **no Linux gate log at all** for `@orkestrel/scaffold` or
  `@orkestrel/toolbox`.
- The owner authorised upload of all three tips without claiming the Linux gaps repaired. No upload
  ran; the registry still serves the older versions.
- This round is the first Linux gate run for scaffold and toolbox, and a second, different-Node
  Linux run for ollama.

This subject occupies the "policy, design, or process proposal" row and the "code change" row of the
skill's evidence table: no source was edited this round, so the code evidence is the committed tip
plus the actual gate output, both supplied below.

## What the round decides

This decides whether `@orkestrel/scaffold@0.0.65`, `@orkestrel/toolbox@0.0.13`, and
`@orkestrel/ollama@0.0.15` are uploaded to the public npm registry, where the version is spent and
cannot be withdrawn. It decides specifically whether the two red gates in scaffold are host artifacts
that may be recorded and passed, or defects that must block scaffold's upload. A wrong `CONFIRMED`
here publishes a broken tooling package that every other package in the fleet consumes.

## Host and toolchain facts

- Kernel `Linux 6.18.44-fc-v24`. Shell `bash`. Container is an ephemeral microVM.
- `node v22.22.2`, `npm 10.9.7` at `/opt/node22`.
- **This container has no IPv6 stack.** `/proc/net/if_inet6` does not exist, and a Node
  `net.connect` to `::ffff:127.0.0.1` fails `EAFNOSUPPORT`. Verified by the orchestrator directly.
- `http_proxy` and `HTTP_PROXY` are unset. `https_proxy` is `http://127.0.0.1:42095`. `no_proxy`
  contains `127.0.0.1`, `127.0.0.0/8`, and `registry.npmjs.org`.
- `npm ping` reaches `https://registry.npmjs.org/` (PONG 148ms), and a fresh-cache install of
  `@orkestrel/contract` and `@orkestrel/console` succeeds, exit `0`.
- An Ollama daemon version `0.34.0` is running on `http://127.0.0.1:11434` serving model
  `qwen3.5:2b-q4_K_M`, started by `/home/user/ollama/scripts/ollama.sh`, which exited `0` with
  `ollama.sh: Ollama is ready`.

## Review evidence, by path

All paths are relative to `/home/user/scaffold` unless absolute.

- `tmp/evidence/gates.sh` — the exact chain that was run, per package, in order.
- `tmp/evidence/scaffold.status.txt`, `tmp/evidence/toolbox.status.txt`,
  `tmp/evidence/ollama.status.txt` — per-gate exit codes and elapsed seconds.
- `tmp/evidence/scaffold-gates.log.txt`, `tmp/evidence/toolbox-gates.log.txt`,
  `tmp/evidence/ollama-gates.log.txt` — the complete gate output.
- `tmp/evidence/npm-arborist-crash.txt` — the npm `10.9.7` crash stack, and the npm `12.0.2` rerun.
- `tmp/evidence/dist-repro.sh` — the script that reproduced the distribution failure outside vitest.
- `tmp/evidence/ollama-service.log.txt` — the live-service suite run against the real daemon.
- `/home/user/ollama/scripts/ollama.sh` — the script that installed and started that daemon.
- Git status for all three checkouts is empty. Run `git status --porcelain` in each to confirm; do
  not take it from this brief.

## Already established — do not re-run

Each of these the orchestrator verified by running the command itself on this host and reading the
output. None is taken from another agent's report.

1. Per-gate exit codes, from the status files above:
   - toolbox: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0, release-mode
     `test:distribution` 0.
   - ollama: the same six gates, all 0.
   - scaffold: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` **1**,
     release-mode `test:distribution` **1**.
2. scaffold's `test` failure is exactly one test:
   `tests/src/server/helpers.test.ts:223` > `Ollama setup` >
   `refuses redirected version readiness without starting a local daemon`.
   `AssertionError: expected [] to strictly equal [ '/api/version' ]`. The suite otherwise reports
   `1 failed | 444 passed (445)`, and the four other scaffold test projects pass whole.
3. scaffold's `test:distribution` failure is exactly one test:
   `tests/distribution.test.ts:912` >
   `installs the packed scaffold and passes one generated core/server workspace through prepublish`.
   `expected 1 to be +0`, where `1` is the exit status of
   `npm install --ignore-scripts --no-audit --no-fund` in the generated workspace.
4. The orchestrator reproduced finding 3 outside vitest with `tmp/evidence/dist-repro.sh` and read
   npm's own error: `Cannot read properties of null (reading 'edgesOut')`, stack
   `#loadPeerSet (@npmcli/arborist/lib/arborist/build-ideal-tree.js:1289:38)`.
5. Re-running that identical generated manifest, npm cache, and packed tarball under npm `12.0.2`
   succeeded: `added 120 packages in 9s`, exit `0`.
6. The `policy` oxlint plugin declared at `.oxlintrc.json:5` as `./configs/policy.ts` genuinely
   loads and reports on this host. Control: the orchestrator planted a temporary file containing the
   banned term `simply` in a comment and a `public` class member; `oxlint` reported
   `policy(no-banned-term)` and `typescript(explicit-member-accessibility)` and exited `1`. The
   planted file was then deleted and `git status --porcelain` returned empty.
7. `npm run test:service` in `/home/user/ollama` reported `Test Files 11 passed (11)`,
   `Tests 58 passed (58)`, exit `0`, against the running daemon described under host facts.
8. Exactly two tests skip in toolbox and in ollama, and neither skip is OS-conditioned:
   `tests/policy.test.ts > denylist currency > registers every substitution-table term as either
   matched or judged`, and
   `tests/config.test.ts > configuration helpers > rejects resolving the unavailable extractor`.

## Numbered falsifiable claims

1. `@orkestrel/toolbox` at `21068c3` passes the complete non-mutating acceptance chain on this Linux
   host — `format:check`, `lint:check`, `check`, `build`, `test`, and `test:distribution --mode
   release` — with every gate exit `0`, and no gate in that chain was skipped, weakened, reordered,
   or substituted for a narrower command.
2. `@orkestrel/ollama` at `d6e868d` passes that same complete chain on this host with every gate
   exit `0`, under the same no-substitution condition.
3. `@orkestrel/ollama`'s `lint:check` exit `0` on this host is a true green rather than a silent
   plugin load failure: the `policy` plugin at `./configs/policy.ts` loads under Node `22.22.2` and
   is capable of emitting a failing verdict. Therefore the campaign's recorded Ubuntu Node `22.12.0`
   `ERR_UNKNOWN_FILE_EXTENSION` failure does not reproduce at Node `22.22.2`.
4. The scaffold `test` failure at `tests/src/server/helpers.test.ts:223` is caused by this
   container providing no `AF_INET6` socket family, and not by a defect in
   `scripts/ollama.sh` or in any published scaffold source: the script still refuses the redirected
   non-loopback endpoint with the exact message the test asserts, and only the
   recorded-request-path assertion fails, because `curl` cannot open a connection to
   `[::ffff:127.0.0.1]` at all on this host.
5. The scaffold `test:distribution` failure at `tests/distribution.test.ts:912` is caused by a
   defect in npm `10.9.7`'s arborist peer-set resolution, and not by any artifact scaffold produced
   — not the packed tarball, not the generated `package.json`, not the materialized workspace: the
   identical inputs install cleanly under npm `12.0.2`.
6. Neither scaffold failure indicates a defect in the surface `@orkestrel/scaffold@0.0.65`
   publishes — `dist/src`, `dist/bin`, `dist/host` — so neither is a publish blocker for that
   version on the merits of the code.
7. The Linux run exercised a strict superset of the host-conditioned tests that a Windows run
   executes in these three packages: every test guarded by `skipIf(process.platform === 'win32')`
   ran here, and no test that a Windows host executes was skipped here. The only two skips in
   toolbox and ollama are gated on repository layout and authorship, not on the operating system.
8. The three packages' recorded bump rulings still hold at these tips, so each local version is the
   correct next version: each local version is exactly one patch ahead of what the registry serves,
   and no package needs a further bump on account of anything this round changed — because this
   round changed no tracked file in any of the three checkouts.
9. `@orkestrel/ollama`'s live-service suite — `npm run test:service`, the gate its `prepublishOnly`
   adds and neither other package has — passes on this Linux host against a real Ollama daemon the
   repository's own `scripts/ollama.sh` installed and started: `11 passed (11)` test files,
   `58 passed (58)` tests, exit `0`, duration `192.88s`. Therefore `@orkestrel/ollama@0.0.15` has its
   complete `prepublishOnly` chain proven on Linux, including the automatic-installation path that
   cannot execute on a Windows host at all.

## Unknowns, named as unknowns

The orchestrator does not know these, and the round needs them. Report each as a numbered
observation separate from the verdicts; do not fold a guess into a verdict.

- **U1.** Whether any test in the three packages passes on this host *for the wrong reason* — a
  test whose assertion is satisfied by the absent IPv6 stack, the proxy configuration, or the
  container's single-CPU timing rather than by the behaviour it names. Name any you find with
  `file:line`.
- **U2.** Whether `@orkestrel/scaffold`'s own `test:service`-equivalent or daemon-lifecycle coverage
  exists at all, given the campaign recorded "Linux owned-daemon failure and cleanup never
  executed". If scaffold has no such coverage, say so; that is an answer.
- **U3.** Whether the npm `10.9.7` arborist crash could also fire during a real consumer's install
  of published `@orkestrel/scaffold@0.0.65` — that is, whether claim 5's scope is genuinely limited
  to the test's generated workspace, or whether a consumer on npm `10.9.7` would hit it too. This is
  the unknown most likely to overturn claim 6.

## The threshold

A finding is worth more to this round than a clean pass. The alternative to finding a defect now is
a consumer of the fleet's tooling package finding it after publication, when `0.0.65` is spent and
the only remedy is another version. Attack claim 6 hardest: it is the judgment the orchestrator
made, on the orchestrator's own engine, and it is the one that authorises the upload.

## Output

Return exactly the verdict shape `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape fixes:
numbered verdicts in this brief's order with one of `CONFIRMED`, `BROKEN`, `UNRESOLVED`,
`NOT-EVIDENCED`; findings fitting no claim; attacked-and-held with the attacks that failed; then
exactly one terminal line. No process diary.
