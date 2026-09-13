# Claims brief — scaffold 0.0.65 fix, pre-publication audit

## Subject

`@orkestrel/scaffold` on branch `claude/compassionate-knuth-5e0gyu` at tip `23eca02`, local
version `0.0.65`, registry serving `0.0.64`. The chain of rounds:

- `linux-gate` audit (`linux-gate-audit-verdict.md`) held `0.0.65` out of the window on two red
  gates and two substantiated findings about its published surface.
- `scaffold-fix-design` (`scaffold-fix-design-verdict.md`) ruled the fix on measured evidence
  against both design lanes: Node floor `22.18.0`, `devEngines.packageManager >=11.6.0` with
  `onFail` error, no shape change, Node 22 and 24 supported.
- U-floor landed at `a371cea`; the Orchestrator's emit-order integration is recorded in
  `u-floor-report.md`.
- U-dist, U-probe, U-record landed at `23eca02`.

This subject is a code change: the review evidence is the actual diff `git diff 2b3abca..23eca02` and
the actual `git status --porcelain`, both supplied by path below.

## What the round decides

Whether `@orkestrel/scaffold@0.0.65` uploads to the public npm registry, where the version is spent.
It is the tooling package every fleet package consumes as a development dependency, and it vendors
files into every target, so a defect here propagates on the next `repair`.

## Already established — verified by the Orchestrator directly on this host

Each item the Orchestrator ran on this host and read, or read from a unit's structured return and
then re-ran. None is taken on a writer's word alone; the host re-run in the final verification is
what accepts each.

**U-floor** (`a371cea`, host-verified, `u-floor-report.md`): build, format:check, lint:check, check,
test:src:core, test:src:bin, test:policy, test:config, test:setup, test:guides all exit 0; the
emitted manifest reads `devEngines` then `engines` and is an oxfmt fixed point after the Orchestrator's
emit-order integration.

**U-dist** (unit's structured return; the final verification re-runs every row):
- `npm run test:distribution -- --mode release`: red before, `Tests 1 failed | 4 passed (5)`,
  `expected 1 to be +0` at `tests/distribution.test.ts:912`; green after, `Tests 5 passed (5)`,
  75.37s. Same case, no rename.
- `npm run test:setup` exit 0, `Tests 84 passed (84)`, the six new `admitted npm` cases passing.
- Helpers `readNpmFloor`, `readNpmVersion`, `resolveNpm` and declarations `TestNpmOptions`,
  `TestNpmInterface` in `tests/setupServer.ts`; the proof reads the floor from the generated manifest's
  `devEngines.packageManager.version`, provisions with `npm install --prefix ... npm@<floor>`,
  prepends `<prefix>/node_modules/.bin` to `PATH`, and re-reads `npm --version` under it, throwing if
  still beneath the floor. The rejected `npx npm@X` form is absent.
- Reuse: `compareVersions` and `FLOOR_RANGE_PATTERN` from `@src/core`; `executeSync`,
  `mergeEnvironment`, `readVariable` from `@orkestrel/process/server`.
- Scope: only the guarded workspace's install and `prepublishOnly` take the admitted environment; the
  pack, the bare-consumer install, and the refused-peer fixtures keep the ambient one.
- Diff: `tests/distribution.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`;
  278 insertions, 8 deletions, nothing else in `git status --porcelain`.

**U-probe** (unit's structured return; the final verification re-runs every row):
- `supportsMappedLoopback` exported from `tests/setupServer.ts`, async, opening a real listener
  through `@orkestrel/test/server`'s `createLoopback` and attempting a `net.connect` to
  `::ffff:127.0.0.1`; a listener refusal propagates rather than returning `false`, so a sandbox
  `EPERM` cannot read as "no IPv6 stack". `@orkestrel/test/server` exports no such predicate
  (`supportsBytes`, `supportsCase`, `supportsDirectoryLinks`, `supportsFileLinks`, `supportsMode`
  checked), so this adds a capability rather than renaming one.
- `tests/src/server/helpers.test.ts` evaluates it once at module scope into `MAPPED_LOOPBACK` by
  top-level `await` and gates the case with `it.skipIf(!MAPPED_LOOPBACK)`; the comment beside the
  guard cites the `AF_INET6` connect refusing with `EAFNOSUPPORT`. The case's address rewrite
  `server.url.replace('127.0.0.1', '[::ffff:127.0.0.1]')` is byte-unchanged.
- `tests/setupServer.test.ts` adds `the mapped loopback reading`: an HTTP client driving the same
  `::ffff:` rewrite with a plain-`127.0.0.1` control that must return 200, and the kernel's
  `/proc/net/if_inet6` table read from the filesystem, guarded on `/proc/net` existing rather than a
  platform name.
- `npm run test:src:server` exit 0, `Tests 444 passed | 1 skipped (445)`, the skip being the gated
  case. `npm run test:setup` exit 0, `Tests 86 passed (86)`. `test:policy` exit 0 as a reading.
- Host reading taken before writing: `/proc/net/if_inet6` absent; `net.connect` rejects
  `EAFNOSUPPORT`; `fetch` to `http://[::ffff:127.0.0.1]:PORT/` rejects with
  `cause.code === 'EAFNOSUPPORT'` while the same listener answers 200 on `127.0.0.1`.

**U-record** (unit's structured return, `u-record-report.md`): `ROADMAP.md` scoped diff 23
insertions and 6 deletions; the phrase "the field names npm 11" no longer appears (grep count `0`);
rows present for the `11.6.0` boundary and the devEngines ruling, the `&&` gate composition, and the
emitted `@types/node` range; `format:check` and `test:policy` exit 0. The unit returned `done=false`
over a full-tree diff criterion the brief mis-scoped for a serial multi-writer run; the Orchestrator
re-scoped it to `git diff --stat -- ROADMAP.md` and accepted. That mis-scoping is recorded against
the brief, and claim 15 below puts the resulting ROADMAP prose itself on trial.

**Target pre-flight** (`target-preflight-report.md`): toolbox and ollama staged with the local
`0.0.65` tarball, `repair --offline` exit 0, `audit --offline` exit 0 with nothing drifted, every gate
exit 0 including release-mode distribution. A false red on `test:policy` was the instrument's own
colon-named logs written into the measured tree; removed and re-proven `90 passed | 1 skipped` on both.
The mirrored `guides/scaffold.md` refreshes through `catalog` at the online visit, per the CLI's help.

**Host**: Linux `6.18.44-fc-v24`, `node v22.22.2`, ambient npm `10.9.7`, no IPv6 stack, four CPUs,
`ollama` on `PATH` with a daemon at `127.0.0.1:11434`.

## Numbered falsifiable claims

1. Every manifest `blueprintToManifest` emits carries `devEngines.packageManager` exactly
   `{ name: 'npm', version: '>=11.6.0', onFail: 'error' }` and `engines.node` exactly `>=22.18.0`,
   with `devEngines` emitted before `engines`, and the emitted text is an oxfmt fixed point.
2. `Blueprint.engines` remains `readonly engines: string` and no declaration in `src/core/types.ts`
   moved; `matchesEngines('>=22.12.0')` is `false` and `matchesEngines('>=22.18.0')` is `true`.
3. `npm run test:distribution -- --mode release` exits `0` on this host under ambient npm `10.9.7`,
   because the proof provisions the npm the generated manifest's `devEngines` field names, and it
   does so without the `npx npm@X` launch form.
4. Inside that proof, the generated workspace's `prepublishOnly` runs under the provisioned npm at
   every nesting level — no nested `npm run` inside it resolves the ambient npm.
5. The npm-provisioning helper is exported from a setup module and tested against a second
   mechanism; its test would fail if the helper returned the ambient npm on a host below the floor.
6. `npm run test:src:server` exits `0` on this host with the redirected-version case reported
   skipped, the skip citing `EAFNOSUPPORT` from an `AF_INET6` connect, and the case's target address
   still `[::ffff:127.0.0.1]` — not plain `127.0.0.1`.
7. No test in the tree can start a real Ollama daemon: no case drives `scripts/ollama.sh` at a
   loopback address that `normalize_host` classifies as loopback while `ollama` is on `PATH`.
8. The mapped-loopback capability predicate is tested against a second independent reading of the
   host fact and would fail if it lied.
9. `ROADMAP.md` no longer contains the phrase "the field names npm 11"; its scaffold row states the
   `11.6.0` boundary and the devEngines ruling; rows for the `&&` gate composition and the emitted
   `@types/node` range exist; `npm run test:policy` exits `0`.
10. The literal `npm run prepublishOnly` exits `0` on this host.
11. `host.json` is byte-identical to what `npm run build:inventory` regenerates from the tip, so
    every vendored byte the fix moved is inventoried.
12. Node 22 and Node 24 hosts remain admitted: nothing in the tree rejects a Node `24.x` host, and a
    generated workspace installed under an admitted npm on this Node 22 host exits `0`.
13. A target that stages `0.0.65` and runs `repair --offline` then `audit --offline` reaches exit
    `0` on the audit and stays green on its own gates. Evidence: the pre-flight readings above.
14. The `admitted npm` provisioning case in `tests/setupServer.test.ts` is correctly placed and
    correctly gated: it reaches the registry only on a host whose npm is beneath
    `MINIMUM_NPM_VERSION`, it is skipped with the mechanism in its title elsewhere, and its placement in
    the `setup` project rather than the `distribution` project does not violate
    `.claude/rules/tests.md` § Expensive proofs or the rule that default suites make no network
    calls. **This placement was the Orchestrator's brief, not the unit's choice; the unit reported the
    tension. Rule on it.**

## Unknowns

- **U1.** Whether any test passes on this host for a reason other than the behaviour it names, now
  that two cases are host-gated. Name any with `file:line`.
- **U2.** Whether the provisioned npm's own `.bin` shim behaves identically when the ambient npm is
  *above* the floor — the helper's "use ambient" branch is untested on this host, which sits below.
- **U3.** Whether the Windows path holds: the helpers add no `win32` branch and rely on
  `@orkestrel/process`'s executable resolution and case-folding environment merge, and on npm writing
  `npm.cmd` into a `--prefix` target's `node_modules/.bin`. Unverifiable on this host; name what would
  settle it.

## The threshold

A finding is worth more than a clean pass. `0.0.65` is the tooling package; a defect in it lands in
every target on its next `repair`.

## Output

The `orkestrel-falsify` verdict shape: numbered verdicts 1–15, findings outside the claims,
attacked-and-held, the three unknown observations, one terminal line.
