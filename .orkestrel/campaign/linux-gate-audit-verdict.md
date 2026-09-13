# Audit verdict — linux-gate

Round: `linux-gate`. Subject: the Linux gate readiness of `@orkestrel/scaffold@0.0.65`,
`@orkestrel/toolbox@0.0.13`, and `@orkestrel/ollama@0.0.15`. Brief:
`linux-gate-brief.md`, nine claims and three unknowns.

## Lanes that ran

| lane       | role       | engine      | provenance |
| ---------- | ---------- | ----------- | ---------- |
| subjective | `reviewer` | Opus 5      | native subagent, clean context |
| objective  | `analyst`  | GPT-5.6 Sol | `tmp/codex/linux-gate.jsonl`, thread `01a0985d-8977-7dd0-9171-a7aa7a7215d7` |

Both lanes ran on one identical brief, in parallel, blind to each other. No lane was collapsed and no
checker was dispatched: the acceptance criteria were gate exit codes the Orchestrator ran itself, and
both lanes read those codes from the retained logs. Bench liveness was recorded from round-tripped
model calls: Cursor Grok session `0aad7d3f-864e-4048-ada9-ecca81550fb6`, Sol thread
`01a09857-251a-7171-a0eb-39f9333d96a1`.

The Orchestrator runs on Opus 5 and authored claims 4, 5, and 6, so the subjective lane audited its
own engine's judgment and was told to attack that half harder. The objective lane is the round's
independent check on those three claims.

## Reconciled rulings

| claim | subjective | objective | reconciled |
| ----- | ---------- | --------- | ---------- |
| 1 toolbox chain green | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 2 ollama chain green | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 3 ollama lint green is true | UNRESOLVED | CONFIRMED | **CONFIRMED** |
| 4 helpers failure is absent IPv6, no defect | BROKEN | CONFIRMED | **BROKEN** |
| 5 distribution failure is npm's, no scaffold artifact | BROKEN | UNRESOLVED | **BROKEN** |
| 6 neither failure blocks scaffold's publish | UNRESOLVED | BROKEN | **BROKEN** |
| 7 Linux run is a superset of Windows | BROKEN | BROKEN | **BROKEN** |
| 8 bump rulings still hold | UNRESOLVED | UNRESOLVED | **CONFIRMED** on Orchestrator evidence |
| 9 ollama service suite proves the chain | BROKEN | CONFIRMED | **BROKEN as worded** |

### Claim 3 — the lane's doubt is answered

The subjective lane could not tell which checkout the plant control ran in, and noted that ollama's
vendored `configs/policy.ts` comes from `@orkestrel/scaffold@0.0.64` rather than from scaffold's tree.
The control ran in `/home/user/ollama`, against that checkout's own vendored copy: the planted file
was `/home/user/ollama/policy-probe-temp.ts`, the command was
`npx oxlint --config .oxlintrc.json --deny-warnings policy-probe-temp.ts` with that checkout as the
working directory, and it reported `policy(no-banned-term)` and
`typescript(explicit-member-accessibility)` and exited `1`. The plant was deleted and
`git status --porcelain` returned empty. The lane's stated settling procedure is the procedure that was
run. CONFIRMED.

### Claim 4 — two lanes answered different questions, and both answers stand

The objective lane confirmed that `scripts/ollama.sh` is not defective, and added that the checkout
copy and the published `dist/host/scripts/ollama.sh` are byte-identical at SHA-256
`be5cb42991792190d7f61c7b8eef568eaf207db67cce5d2ccc223af814f2d6fa`. The subjective lane confirmed that
separately and broke the claim on a different axis: the test is *named* for refusing a redirected
readiness response, no redirect was served on this host, and the assertions that still pass are
satisfied by the non-loopback refusal alone — which `helpers.test.ts:205-212` already proves
host-independently. The property the test exists for is unexercised here.

Both are correct. The claim is BROKEN because it asserted "not a defect" without qualification.

Correct restatement: `scripts/ollama.sh` behaves correctly and is not defective. The defect is in
`tests/src/server/helpers.test.ts:214-224`, which hard-codes reachability of `[::ffff:127.0.0.1]` with
no runtime capability probe and no guard citing the mechanism, contrary to `.claude/rules/tests.md`.
The same file already imports `supportsFileLinks` and `supportsMode` and gates tests on them at
`:1142` and `:1811`, so the prescribed pattern is present in the file and was not applied to this
vector. `tests/src/server/helpers.test.ts` is not vendored — `src/core/constants.ts:133-151` vendors
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` only — so the defect does
not propagate to a target.

The subjective lane's warning bounds the fix: moving the vector to a plain `127.0.0.1` fixture makes
`loopback=true`, and on any host carrying `ollama` on `PATH` — this container included —
`scripts/ollama.sh:252` would then spawn a real `setsid ollama serve` daemon from inside `npm test`.

The lane referred the mechanism back to the Orchestrator, because the supplied measurement was a Node
`net.connect` rather than `curl`, and `all_proxy` was unnamed. Settled with the matched instrument, one
fixture, one curl, one proxy environment:

```text
mapped ::ffff:127.0.0.1 -> http_code="000"  curl: (7) Failed to connect ... Couldn't connect to server
plain  127.0.0.1        -> http_code="302"  (no error)
fixture received: ["/api/version"]
```

`all_proxy` and `ALL_PROXY` are unset; `http_proxy` and `HTTP_PROXY` are unset. The rival proxy reading
is excluded, because the plain IPv4 request traverses the identical environment and arrives. The
mechanism is the absent address family: `/proc/net/if_inet6` does not exist and a Node `net.connect` to
the mapped address returns `EAFNOSUPPORT`.

### Claim 5 — the Orchestrator's own scope was too wide

The subjective lane broke the claim on scope: the same test run installs the packed tarball into a bare
consumer at `tests/distribution.test.ts:806-811` and passes under the identical npm, so npm `10.9.7`
is not uniformly broken on these inputs, and an A/B that varies only the npm version cannot establish
that the input is innocent. The objective lane could not settle the claim at all, because the retained
evidence held only the passing half and its sandbox denies the network.

Both readings are answered by probes the Orchestrator ran after dispatch, retained as
`evidence/linux-gate/u3-probe.sh`, `bisect.sh`, `lockfile-probe.sh`, and `fresh-pair.sh`:

- The `file:` specifier is not required. The same generated workspace carrying the emitted registry
  range `^0.0.64` crashes identically.
- Scaffold's emitted manifest is not required either. Leave-one-out across every declared
  devDependency crashes in every row, `@orkestrel/scaffold` removed included, and
  `vite@^8.2.2` with `vitest@^4.1.11` alone reproduces the crash on a pristine cache with no Orkestrel
  package present.
- A committed lockfile avoids it. All three release packages resolve `npm install --dry-run` at exit
  `0`.

Correct restatement: the crash is npm `10.9.7`'s arborist defect in `#loadPeerSet`, triggered by the
`vite` 8 and `vitest` 4 peer graph that scaffold's generated manifest includes, and reachable by any
lockfile-free install of that graph. Scaffold's compilation logic is not in error, and the packed
tarball installs cleanly on this npm.

### Claim 6 — BROKEN, and it is the ruling that was being asked for

The objective lane broke it on the contract: `references/wave.md:104` requires each package's own
`prepublishOnly` to finish green, scaffold's `test` and release-mode `test:distribution` exit `1`, and
`ROADMAP.md:370-375` already carries this npm-major behaviour as an unruled open question — "rule
whether the proof launches the npm the `engines` field names or the field names npm 11". The subjective
lane withheld a ruling and named two grounds, the first of which no one had seen: scaffold's `test` is
an `&&` chain that aborted, so five projects never ran, including `test:src:bin`, the proof over
`dist/bin`, a path claim 6 itself names as published. It also noted claim 6's enumeration omits
`README.md`, which `package.json:22-27` ships.

Claim 6 is BROKEN. The published surface is `dist/src`, `dist/bin`, `dist/host`, and `README.md`.

### Claim 7 — BROKEN, and the gap is now closed by real runs

Both lanes broke it on the same mechanism. Established item 2 of the brief read
`Test Files 1 failed | 4 passed (5)` as four other test *projects* passing; those are four other test
*files inside* the `src:server` project. The Orchestrator made that misreading and it is what hid the
suppressed projects.

Remediated after the round, each project invoked on its own so no failure can mask a sibling
(`evidence/linux-gate/scaffold-rest.status.txt`):

```text
test:src:core   exit=0   409 passed
test:src:bin    exit=0   253 passed
test:policy     exit=0    91 passed
test:config     exit=0   172 passed | 1 skipped
test:setup      exit=0    78 passed
test:guides     exit=0    22 passed
```

Scaffold's only Linux failures are the two the round examined. Within `src:server` the claim's
substance held: `445` cases with no `skipped` term, so `supportsFileLinks` and `supportsMode` both
returned true and their guarded cases ran, where Windows skips the `supportsMode` pair.

One label correction the subjective lane made: `tests/config.test.ts:2280` is gated on whether
`@microsoft/api-extractor` resolves on disk — tool availability, not repository layout and authorship.

### Claim 8 — CONFIRMED on evidence neither lane could reach

Both lanes returned UNRESOLVED for the same reason: the registry is unreachable from a read-only
sandbox, and the read-only lane holds no shell. The Orchestrator supplies it.

Registry reading taken this session: `@orkestrel/scaffold` `0.0.64`, `@orkestrel/toolbox` `0.0.12`,
`@orkestrel/ollama` `0.0.14`. Each local version is exactly one patch ahead. The bump rulings are
confirmed independently of the prior campaign by `evidence/linux-gate/host-diff.sh`; the readings and
the downstream `repair` obligation are recorded in `linux-gate-npm-probe-report.md`.

The subjective lane found the generated-but-tracked artifact the claim's premise needed:
`npm run build` runs `build:inventory`, which writes `host.json` at the repository root, and
`.gitignore` does not ignore it. The gate log records `build-inventory: staged 123 file(s) into
host.json`. `git status --porcelain` is empty for tracked paths in all three checkouts after the build,
so the Linux rebuild reproduced the committed Windows-generated inventory byte for byte. That is a
positive host-independence result for that stage, and it is read rather than assumed.

### Claim 9 — BROKEN as worded, and the suite half is load-bearing

The objective lane confirmed the whole claim. The subjective lane confirmed the suite half with
stronger evidence — `tests/setupService.ts:187-192` hard-requires readiness at module scope and throws,
so the suite cannot pass against a dead daemon, and the assertions are not degradation-tolerant — and
broke the automatic-installation clause: `prepublishOnly` composes seven scripts and none invokes
`scripts/ollama.sh`, so no part of the chain reaches the installer branch. The script ran as an
operator step outside the chain, and it belongs to scaffold's vendored surface, not to
`@orkestrel/ollama`.

Correct restatement: every member of ollama's `prepublishOnly` chain has a green Linux reading on this
host, taken as separate invocations rather than as one `prepublishOnly` run. The automatic-installation
path is scaffold's and sits outside that chain.

## Findings outside the claims

- **F1 — the `test` script's `&&` composition lets one failing project hide every project after it.**
  `scaffold/package.json:74`, `toolbox/package.json:67`, `ollama/package.json:56`. The scaffold run is
  the demonstration: one failing case suppressed five projects and recorded a single `test exit=1` that
  reads identically to "one test failed" and to "five projects never ran". Substantiated by both lanes
  and by the remediation run. Carrier: a successor unit that records per-project exit codes the way
  `evidence/linux-gate/gates.sh` already does for the outer gates.

- **F2 — the declared `engines` floor promises a toolchain the vendored lint plugin cannot run.**
  `src/core/constants.ts:480` declares `MINIMUM_NODE_VERSION = '22.12.0'` and documents it as "the
  oldest Node version the generated toolchain supports"; `:486` derives `DEFAULT_ENGINES`; every
  generated manifest carries `{"node":">=22.12.0"}`, verified on the workspace this round generated.
  That toolchain includes the vendored pair `.oxlintrc.json` and `configs/policy.ts`
  (`src/core/constants.ts:141`, `:146`), whose `jsPlugins` entry loads a `.ts` specifier. The campaign
  record carries the consequence: on Ubuntu with Node `22.12.0`, `lint:check` failed loading
  `./configs/policy.ts` with `ERR_UNKNOWN_FILE_EXTENSION`, exit `1`. Claim 3 retired that reading by
  answering a narrower question — does it reproduce at `22.22.2` — rather than the one the recorded red
  poses. Substantiated. Carrier: a successor unit that raises `MINIMUM_NODE_VERSION` to the first Node
  that strips types unflagged and lets `DEFAULT_ENGINES`, the generated manifests, and this package's
  own `engines` follow, or vendors a plugin specifier every Node in the declared range can load.

- **F3 — the retained evidence did not contain the failing half of the A/B claims 5 and 6 rest on.**
  `tmp/evidence/npm-arborist-crash.txt` held only the npm `12.0.2` success, and
  `evidence/linux-gate/dist-repro.sh` wrote the crash to a scratch path outside the pack. Repaired: the
  file now carries the verbose arborist stack from the pristine-cache minimal-pair run, both pristine
  runs, and the three dry-run readings. The objective lane returned claim 5 UNRESOLVED specifically
  because of this gap, so the defect cost the round a verdict.

- **F4 — the scaffold checkout carried untracked campaign records during the round.** Both lanes
  reported it. They are this round's own retention artifacts, committed with this verdict. Toolbox and
  ollama were clean throughout.

## Ruling

`@orkestrel/toolbox@0.0.13` and `@orkestrel/ollama@0.0.15` have a complete green Linux reading of every
gate their own `prepublishOnly` names, ollama's live-service suite against a real daemon included. No
finding in this round bears against either package's published surface. Both are ready to upload.

`@orkestrel/scaffold@0.0.65` is held. Its `prepublishOnly` is red on this host, `references/wave.md:104`
requires it green, and two substantiated findings bear on what it publishes: the workspace it generates
cannot be installed by the npm that ships with every Node 22 (F2's sibling, settled under claim 5), and
the `engines` floor it writes into that workspace names a Node on which the workspace's own lint gate
cannot load its vendored plugin (F2). `ROADMAP.md:370-375` already carries the npm half as an unruled
question, so this round did not discover it — it measured it.

Neither held finding blocks toolbox or ollama: both pin the published `@orkestrel/scaffold@^0.0.64`, so
neither needs `0.0.65` to exist, and holding scaffold raises no re-pin or `repair` obligation in either.

VERDICT: FAIL 4, 5, 6, 7, 9; outside the claims: F1, F2, F3, F4
