# Verdict — subjective lane (Opus 5), `reviewer`

Round `linux-gate`. Native subagent, clean context, blind to the objective lane.
Transcribed verbatim from the lane's return; HTML entities from the transport normalized to
their characters. Blind reports are immutable and this one is unedited.

## Numbered verdicts

**1. `@orkestrel/toolbox` passes the complete chain — CONFIRMED.**
`tmp/evidence/gates.sh:25-30` runs the six gates in `AGENTS.md` order with no substitution and no
early exit (`set -u`, no `set -e`, each gate's true code recorded). `toolbox.status.txt` records all
six exit `0`. The chain is not weakened by an aborted sub-chain: `toolbox-gates.log.txt:108` echoes
`npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run
test:guides`, matching `/home/user/toolbox/package.json:67`, and the log carries a summary block for
every one of those projects (`:119`, `:133`, `:155`, `:169`, `:183`). Attack that failed: I looked for
a project declared in the manifest with no summary block in the log, and for a `--project` narrowing
inside a script; neither exists.

**2. `@orkestrel/ollama` passes that same chain — CONFIRMED.**
`ollama.status.txt` records all six exit `0`. `/home/user/ollama/package.json:56` names six chained
projects and `ollama-gates.log.txt` carries six summary blocks (`:89`, `:103`, `:117`, `:139`, `:153`,
`:167`), so nothing was masked by an `&&` abort. `test:guides` running through
`node --experimental-strip-types` rather than vitest is the declared script, not a substitution.

**3. ollama's `lint:check` green is a true green — UNRESOLVED.**
I read one variable myself: both `/home/user/ollama/node_modules/oxlint/package.json:3` and
`/home/user/scaffold/node_modules/oxlint/package.json:3` report `1.82.0`, so the linter binary is not
a difference between the checkouts on this host. What the evidence cannot settle is which checkout the
plant control ran in. Established item 6 names `.oxlintrc.json:5`, a line that reads identically in
both trees, and claim 3 is a claim about ollama. That matters because
`/home/user/ollama/package.json:88` pins `@orkestrel/scaffold: ^0.0.64` while scaffold's tree is at
`0.0.65`, so ollama's vendored `configs/policy.ts` is the `0.0.64` copy and need not be byte-identical
to the one the control exercised. The round also moved two variables at once — Node `22.12.0` →
`22.22.2` and the whole host — and attributes the change to Node alone.
What would settle it: in `/home/user/ollama`, plant a comment containing a banned term in a file the
round did not touch, run `npm run lint:check`, read for `policy(no-banned-term)` and exit `1`, and
remove the plant; then `node -e "process.stdout.write(process.version)"` beside it.

**4. The `helpers.test.ts:223` failure is the absent `AF_INET6`, not a defect — BROKEN.**
The claim's own mechanism sentence is false in the state that produced the failure. It says "the script
still refuses the redirected non-loopback endpoint with the exact message the test asserts". No
redirect was served. `scaffold-gates.log.txt:169` records `expected [] to strictly equal [
'/api/version' ]` — the fixture received nothing, so the `302` branch at
`tests/setupServer.ts:2226-2232` never executed and nothing redirected was refused.
`scripts/ollama.sh:187` is what produced the asserted message, and it fires on `loopback != true`
alone: `normalize_host` (`:78-81`) classifies `::ffff:127.0.0.1` as non-loopback because it matches
neither `localhost`, nor `family === 4`, nor `::1`. So the refusal the message proves is the
non-loopback refusal, which is already proven host-independently at `helpers.test.ts:205-212`. The
property the test is *named* for — a `3xx` on `/api/version` is not readiness
(`scripts/ollama.sh:138`) — is unexercised on this host, and the claim reads the surviving assertion as
if it stood in for it.

The claim's dichotomy also excludes the cause I can substantiate: a defect in the test.
`.claude/rules/tests.md` requires "Probe a host-varying property at runtime, on the host the test is
running on, and assert against what the probe returned", and requires a conditional skip to cite "the
mechanism that makes it inapplicable". `tests/src/server/helpers.test.ts:217` hard-codes reachability
of `[::ffff:127.0.0.1]` with no probe and no guard, and the same file at `:96` already imports
`supportsFileLinks` and `supportsMode` from `@orkestrel/test/server` and gates tests on them at
`:1142` and `:1811`. The correct pattern is present in the file and was not applied to this vector.

What right looks like: add a capability probe beside the existing pair — one that opens a real socket
to the mapped-loopback form and reports what the host returned — and gate `:214` on it, so the skip
cites the mechanism. Do **not** "fix" this by moving the vector to a plain `127.0.0.1` fixture: that
makes `loopback=true`, and on any host with `ollama` on `PATH` — this container included —
`scripts/ollama.sh:252` would then spawn a real `setsid ollama serve` daemon from inside `npm test`.
Splitting the test into a loopback-`302` case and the existing non-loopback case is only safe if the
loopback case never reaches the start branch.

Bounded: `scripts/ollama.sh` behaves correctly in both readings, and the refusal is fail-closed. The
defect is in `tests/src/server/helpers.test.ts`, which is not vendored (`src/core/constants.ts:133-151`
vendors `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` only), so it does
not propagate to a target.

Referral to the Orchestrator, objective half: whether `curl` specifically fails to open the
connection, and by which mechanism. The supplied measurement is a Node `net.connect`, not `curl`, and
`.claude/rules/quality.md` § Instruments requires matching the instrument to the question. `all_proxy`
and `ALL_PROXY` are unnamed in the host facts, and `no_proxy` carries `127.0.0.1` and `127.0.0.0/8` —
neither of which is the literal `[::ffff:127.0.0.1]`. Settle with `env | grep -i proxy` and
`curl -v --max-time 2 "http://[::ffff:127.0.0.1]:<port>/api/version"` against a live fixture.

**5. The distribution failure is npm `10.9.7`'s defect and no scaffold artifact — BROKEN.**
The exculpation is falsified by the same test run that produced the failure.
`tests/distribution.test.ts:806-811` installs the packed tarball into a bare consumer with the
identical npm, cache, and peer settings, and it passed — the reported failure is at `:912`, and `:834`,
`:853`, and `:895` passed after it. So npm `10.9.7` is not uniformly broken on these inputs: it
installs one graph and crashes on the other, and the difference between them is the generated
workspace's manifest. The A/B the round ran varied only the npm version
(`tmp/evidence/dist-repro.sh:47`, `tmp/evidence/npm-arborist-crash.txt:1`), so it can establish that
npm `12.0.2` fixed the crash and cannot establish that the input is innocent of triggering it.
`.claude/rules/quality.md` § Instruments: "Name the rival reading the instrument must exclude, and show
it reports differently under that reading." The rival reading — npm `10.9.7`'s peer-set defect fires on
the dependency graph `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:489-500`) emits — is neither named
nor excluded.

Smallest correct restatement: the crash is npm `10.9.7`'s arborist defect **triggered by the generated
workspace's dependency graph**, with scaffold's emitted manifest a necessary part of the trigger. That
restatement is what makes U3 a required probe rather than a curiosity.

Bounded: this establishes no error in scaffold's compilation logic, and `:811` establishes that the
packed tarball itself installs cleanly on this npm.

**6. Neither failure indicates a defect in the published surface — UNRESOLVED.**
Two independent grounds, and the first is the one the round did not see.

Scaffold's `npm test` is an `&&` chain (`/home/user/scaffold/package.json:74`, echoed at
`scaffold-gates.log.txt:134`). It aborted when `test:src:server` failed. The log carries exactly two
vitest summary blocks under `GATE test` — `:152` (`src:core`) and `:190` (`src:server`) — and then
`:195` records `GATE test exit=1`. So `test:src:bin`, `test:policy`, `test:config`, `test:setup`, and
`test:guides` **never executed on this host**. `test:src:bin` is the proof over `dist/bin`, one of the
three paths claim 6 itself names as published, and `test:guides` is the only proof that the published
`README.md` pitch matches the guide tagline. A ruling that the published surface is sound cannot rest
on a run that never exercised the bin entry or the parity proof.

Claim 6's enumeration is also incomplete against the manifest: `package.json:22-27` ships `dist/src`,
`dist/bin`, `dist/host`, **and `README.md`**.

Second ground: U3 is unsettled, and claim 5's corrected scope makes it decisive. See the U3
observation.

What would settle the first ground: in `/home/user/scaffold`, run each suppressed project directly —
`npm run test:src:bin`, `npm run test:policy`, `npm run test:config`, `npm run test:setup`,
`npm run test:guides` — and read each result.

**7. The Linux run exercised a strict superset of Windows-executed host-conditioned tests — BROKEN.**
Falsified by the same chain abort. Five of scaffold's seven test projects did not run here, so the
Linux run is not a superset of anything a Windows run executes in scaffold: the two
`skipIf(extractorPath …)` complements at `tests/config.test.ts:2275` and `:2288`, the
`tests/policy.test.ts:430` layout gate, and every `setup`, `guides`, and `src:bin` case have no Linux
reading at all.

The established item the claim rests on is also a misreading of the artifact. Established item 2 says
"the four other scaffold test projects pass whole". `scaffold-gates.log.txt:190` reads
`Test Files 1 failed | 4 passed (5)` — that is four other test *files inside the `src:server`
project*, not four other projects. A file count was read as a project count, and that is what made the
suppressed projects invisible.

Partial hold, worth recording for the successor: within `src:server` the claim's substance is sound.
`:191` reads `1 failed | 444 passed (445)` with no `skipped` term, so `supportsFileLinks()` (`:1142`)
and `supportsMode()` (`:1811`, `WriteTransaction.test.ts:206`, `:227`) all returned true here and their
tests ran, while Windows skips the `supportsMode` pair; and `helpers.test.ts:825` and
`WriteTransaction.test.ts:281`, both `skipIf(process.platform === 'win32')`, ran. The brief's suggested
capability-probe attack does not land inside that project.

One label correction: `tests/config.test.ts:2280` is gated on whether `@microsoft/api-extractor`
resolves on disk — tool availability, not "repository layout and authorship".

**8. The bump rulings still hold and no further bump is owed — UNRESOLVED.**
I read the local versions directly: `/home/user/scaffold/package.json:3` `0.0.65`,
`/home/user/toolbox/package.json:3` `0.0.13`, `/home/user/ollama/package.json:3` `0.0.15`. I cannot
read what the registry serves and I cannot run `git`, and the brief itself forbids taking the
clean-tree fact from the brief.

The generated-but-tracked artifact the claim's premise needs to survive exists and the gate run rewrote
it. `npm run build` includes `build:inventory` (`package.json:85`, `:91`), which writes `host.json` at
the repository root; `scaffold-gates.log.txt:128` records `build-inventory: staged 123 file(s) into
host.json`. `/home/user/scaffold/.gitignore:11-13` ignores `tmp`, `dist`, and `dist-ssr` — not
`host.json`. So `npm run build` mutated a tracked file in this checkout after `format:check` ran. The
design intends that stage to be host-independent (`src/core/constants.ts:216-233` declares the
executable set rather than reading it, precisely so one checkout stages one manifest on every host), so
an identical rewrite is the expected outcome — but "expected" is not "read".
What would settle it: `git status --porcelain` in each of the three checkouts, and
`npm view @orkestrel/scaffold version`, `npm view @orkestrel/toolbox version`,
`npm view @orkestrel/ollama version`.

**9. ollama's live-service suite proves its complete `prepublishOnly` chain including automatic
installation — BROKEN.**
The suite half holds and is load-bearing. `tmp/evidence/ollama-service.log.txt:10-13` matches the
claimed `11 passed (11)`, `58 passed (58)`, `192.88s`, with no skip term.
`tests/setupService.ts:187-192` hard-requires readiness at module scope and throws, so the suite cannot
pass against a dead daemon, and the assertions are not degradation-tolerant:
`tests/service/OllamaProvider.test.ts:221` pins `result.content` to `deltas.join('')`, `:225` pins
`usage.total` to `prompt + completion`, `:202` pins seeded determinism, and `:272` asserts
`tools.length > 0` before the `every` predicate at `:273`, so the vacuous-`every` reading is closed.

The automatic-installation clause is false. `/home/user/ollama/package.json:68` composes
`prepublishOnly` from `format:check`, `lint:check`, `check`, `build`, `test`,
`test:distribution --mode release`, and `test:service`. None of those invokes `scripts/ollama.sh`, so
no part of that chain reaches the installer branch at `scripts/ollama.sh:191-240`. The script ran as an
operator step to prepare the daemon, outside the chain. Whether its installer branch ran at all is
unevidenced — the branch requires `command -v ollama` to be absent plus `CLAUDE_CODE_REMOTE=true` or
`CI=true`, and no log of that run appears anywhere in `tmp/evidence/`; only the brief's paraphrase of
its final line. And the script belongs to scaffold's vendored surface
(`src/core/constants.ts:136` vendors `scripts`, `:232` marks it executable), not to
`@orkestrel/ollama`, whose `files` ships `dist/src` and `README.md` — so even a proven installer run
would be evidence about scaffold, attached here to the wrong package.

Smallest correct restatement: every member of ollama's `prepublishOnly` chain has a green Linux reading
on this host, taken as separate invocations rather than as one `prepublishOnly` run; the
automatic-installation path is outside that chain and its Linux proof, if wanted, belongs to scaffold
with the script's own captured log.

## Findings fitting no claim

**F1. The `test` gate's `&&` composition makes every run report at most its first failing project, and
all three packages share it.**
`/home/user/scaffold/package.json:74`, `/home/user/toolbox/package.json:67`,
`/home/user/ollama/package.json:56`. The scaffold run is the demonstration: one failing case in
`src:server` suppressed five projects, and the round's status file recorded a single `test exit=1` that
reads identically to "one test failed" and to "five projects never ran".
`.claude/rules/quality.md` § Falsification requires reading a gate bare, and
`.claude/rules/tests.md` § Discovery and adequacy audit requires proving every declared project is
reachable from a gate; a chain that stops cannot answer either question on the run that matters most.
What right looks like: keep the chain, and record per-project exit codes the way
`tmp/evidence/gates.sh:13-23` already does for the outer gates, so a red project never hides a sibling.
This is a durable finding about the gate, not about this round's evidence.

**F2. The vendored lint plugin's runtime floor and the declared `engines` floor disagree, and scaffold
writes the declared floor into every workspace it generates.**
`src/core/constants.ts:480` declares `MINIMUM_NODE_VERSION = '22.12.0'` as "the oldest Node version the
generated toolchain supports"; `:486` derives `DEFAULT_ENGINES`; `src/core/compilers.ts:579` writes it
into each generated manifest; `package.json:118-120` declares the same floor for scaffold itself. The
toolchain that floor promises includes a vendored pair — `.oxlintrc.json` and `configs/policy.ts`, both
in `HOST_PATHS` (`src/core/constants.ts:141`, `:146`) — whose `jsPlugins` entry loads a `.ts`
specifier (`/home/user/ollama/.oxlintrc.json:5`). The brief's own subject section records the
consequence: on Ubuntu with Node `22.12.0`, `lint:check` failed loading `./configs/policy.ts` with
`ERR_UNKNOWN_FILE_EXTENSION`, exit `1`. So `scaffold new` at the floor scaffold declares produces a
workspace whose lint gate cannot run, and claim 3 retires that reading by answering a narrower
question — does it reproduce at `22.22.2` — instead of the one the recorded red poses.
What right looks like: raise `MINIMUM_NODE_VERSION` to the first Node that strips types unflagged and
let `DEFAULT_ENGINES`, the generated manifests, and this package's own `engines` follow it; or vendor a
plugin specifier every Node in the declared range can load. Referral to the Orchestrator for the
objective half: confirm the exact Node boundary by running `npm run lint:check` in one target under a
Node inside `>=22.12.0 <22.18.0` and reading the error.

**F3. `tmp/evidence/npm-arborist-crash.txt` does not contain what the brief says it contains.**
The brief at line 65 names that path as "the npm `10.9.7` crash stack, and the npm `12.0.2` rerun". The
file holds five lines, all of them the npm `12.0.2` success.
`Cannot read properties of null (reading 'edgesOut')` and the `build-ideal-tree.js:1289:38` frame appear
nowhere under `tmp/evidence/`; the only copies in the tree are the brief itself and
`tmp/codex/linux-gate.jsonl`. The failing half of the A/B that claims 5 and 6 rest on is therefore
absent from the retained evidence, and `tmp/evidence/dist-repro.sh:47-50` writes that output to a
scratch path outside the pack. `.agents/orchestration.md` § Dispatch anatomy requires the acceptance
evidence retained under `.orkestrel/<package>/`; a successor round cannot re-read a diagnosis that was
never captured.

## Attacked and held

- **Claim 1 and claim 2, against gate substitution.** I compared each manifest's `test` and
  `prepublishOnly` composition against the projects that actually printed a summary block in each log,
  looking for a declared project with no block, a `--project` narrowing, or a reordering. Toolbox and
  ollama are complete. The adjacent behaviour that looks like the defect and is correct:
  `tmp/evidence/gates.sh:7` deliberately omits `set -e` so a failing gate does not stop the chain —
  that is what makes the scaffold status file report all six gates, and it is the opposite of hiding a
  failure.
- **Claim 7, against capability-probe skips inside `src:server`.** The attack was that
  `supportsFileLinks()` or `supportsMode()` could return false on a container filesystem and silently
  skip on Linux what Windows runs. It failed: `scaffold-gates.log.txt:191` carries no `skipped` term,
  so every guarded case in that project ran. The adjacent behaviour that looks like the defect and is
  correct: `helpers.test.ts:101` branches on `process.platform` inside an assertion rather than
  skipping — that is the portability rule's prescribed form for a platform-defined value, not a
  host-conditioned skip.
- **Claim 9, against degraded-response tolerance.** The attack was that the service suite might pass
  whether or not the model answers. It failed on the assertions cited in verdict 9 and on
  `tests/setupService.ts:187`, which throws rather than skips. The adjacent behaviour that looks like
  the defect and is correct: `isOllamaReady` returns `false` inside a `catch` (`:115-117`) — a
  swallowed error that looks like tolerance, but its only consumer is the throw at `:188`.
- **The suggestion that the packed tarball's installability is unproven.** Attacked and refuted:
  `tests/distribution.test.ts:806-811` installs the packed artifact into a bare consumer and passed,
  and `:834` then reads the built pin out of the installed copy against the installed manifest with a
  real negative control at `:840-854`. That property is green on this host.

## Unknown observations

**U1. Two tests pass here for a reason other than the behaviour they name, and one of them is outside
the failing case.**
The first is inside the failing test: `tests/src/server/helpers.test.ts:219-222`. Its `failed === true`
and its stderr assertion are both satisfied without the fixture being contacted, because
`scripts/ollama.sh:187` produces that message from the non-loopback classification alone. Only the
request-path assertion at `:223` detects that the vector never arrived — the test is strong, and its
red is the test doing its job.
The second is `tests/src/server/helpers.test.ts:229` and `:244`, the sibling redirect cases. Those use
a plain `127.0.0.1` fixture and are unaffected. I found no third case whose assertion the absent IPv6
stack, the proxy configuration, or single-CPU timing satisfies — but that answer covers only
`src:core`, `src:server`, and `distribution` in scaffold and all projects in toolbox and ollama,
because scaffold's `src:bin`, `policy`, `config`, `setup`, and `guides` projects produced no reading
here at all. Their U1 answer is unknown for the same reason claim 7 broke.

**U2. Scaffold has no live-service or daemon-lifecycle project, and that is the answer.**
`/home/user/scaffold/package.json` declares no `test:service` script and no `service` project; its
cross-cutting projects are `policy`, `config`, `setup`, `guides`, and `distribution`. Its entire
coverage of daemon behaviour is the `Ollama setup` block in `tests/src/server/helpers.test.ts`, which
drives `scripts/ollama.sh` against a protocol-faithful loopback fixture through `executeOllamaSetup`
(`tests/setupServer.ts:2192-2206`) with a 10 s bound. That block never reaches the branches from
`scripts/ollama.sh:191` onward: `executeOllamaSetup` clears `CI` and `CLAUDE_CODE_REMOTE`, so the
installer branch is closed by construction, and no test drives `setsid ollama serve`, the startup poll
at `:255-269`, or `terminate_group` at `:28-40`. So the campaign's recorded "Linux owned-daemon failure
and cleanup never executed" is not a gap in this round's run — it is a gap in the suite, and it is the
correct place to record it, per `.claude/rules/tests.md` § Untestable usually means missing seam: what
is unproven is process-group ownership and failure cleanup of a daemon scaffold's own vendored script
launches.

**U3. The round never ran the control that decides it, and the exposure is the product's primary path.**
Both the test and the repro install the generated workspace only after rewriting scaffold's specifier
to `file:<tarball>` (`tests/distribution.test.ts:896-906`, `tmp/evidence/dist-repro.sh:40-47`), and the
npm `12.0.2` rerun used that same rewritten manifest. No run exists with the registry specifier the
generated manifest actually emits (`^${version}`, asserted at `:895`). So whether the crash needs the
`file:` specifier or only the devDependency graph is untested.

What makes this decisive rather than academic: the crashing npm is the npm that ships across the whole
Node 22 line, which is the line scaffold's own `engines` floor names (`package.json:118-120`,
`src/core/constants.ts:480`) and writes into every generated workspace
(`src/core/compilers.ts:579`) — this host is the demonstration, `node v22.22.2` with `npm 10.9.7`. And
the crashing operation is what a consumer does immediately after `scaffold new`: install the generated
workspace. If the graph alone triggers it, scaffold `0.0.65` ships a generator whose output cannot be
installed on the Node line it declares support for, which is a defect in the published surface and a
publish blocker on the merits. If the `file:` specifier is required, claim 5's scope holds as corrected
and the exposure is confined to the test.

The command that settles it, on this host under `npm 10.9.7`: generate the same workspace, leave the
emitted `^0.0.64` registry specifier in place, and run
`npm install --ignore-scripts --no-audit --no-fund` in it with a fresh `npm_config_cache`. Read the exit
code and the arborist frame. Run it before any upload; it costs one install and it is the only thing
standing between claim 6 and a spent version number.

VERDICT: FAIL 3, 4, 5, 6, 7, 8, 9; outside the claims: F1, F2, F3
