# Propagation wave — ledger

Opened 2026-08-21, after scaffold 0.0.47 published (registry confirmed).

## Published this wave

contract 0.0.13, test 0.0.8, probe 0.0.2, scaffold 0.0.47.

## Pilot visit: process (2026-08-21)

Run before any fan-out, because scaffold 0.0.47's `overwrite` had never met a foreign
target. Procedure executed:

1. Re-pin `@orkestrel/scaffold` to `^0.0.47`, install (so overwrite runs the current
   vendored host). Committed as the checkpoint — `overwrite` refuses a dirty tree, which
   is the guard working.
2. `scaffold overwrite` — 20 written, 111 unchanged, 0 removed; 48 published, 6 guides
   fetched; exit 0.
3. Install, mutating `format` to converge.
4. Independent verifier over the gate chain.

**The version machinery validated end to end.** Every stale range raised in one pass:

| Row | Before | After | Rule exercised |
| --- | --- | --- | --- |
| `@orkestrel/contract` | `^0.0.12` | `^0.0.13` | fleet exact |
| `@orkestrel/probe` | `^0.0.1` | `^0.0.2` | fleet exact |
| `@orkestrel/test` | `^0.0.7` | `^0.0.8` | fleet exact |
| `@microsoft/api-extractor` | `^7.58.12` | `^7.59.0` | foreign floor raised in major 7 |
| `oxfmt` | `^0.62.0` | `^0.64.0` | **foreign floor raised in major 0** |
| `oxlint` | `^1.77.0` | `^1.79.0` | foreign floor raised in major 1 |
| `vite` | `~8.2.0` | `^8.2.2` | tilde retired and raised |
| `vitest` | `^4.1.10` | `^4.1.11` | foreign floor raised in major 4 |
| `@orkestrel/emitter`, `@orkestrel/guide` | unchanged | unchanged | already newest |

The `oxfmt` row is the case the V1-V2 audit found inert and unit VF repaired: a major-zero
caret locks the minor, so the raise was unreachable through every verb until the lookup was
bounded by the declared major instead of the declared range. It works on a real target.

**Not a defect, recorded so the next reader does not re-raise it.** The visit rewrites
`.claude/settings.json` with ~780 lines (250 allow entries, `defaultMode: bypassPermissions`).
That is the canonical vendored policy the repository owner set deliberately in scaffold
commit `91632b3` (2026-08-14, "Make the comprehensive local settings the canonical vendored
ones"). A target that had not synced since is simply catching up. The orchestration rule
keeping a target's OWN grants in `.claude/settings.local.json` is unaffected: it exists so
`repair` does not revert grants the operator set, not to keep the vendored file thin.

**Transient duplicate contract copies.** process installs `contract 0.0.13` at the root with
`0.0.12` nested under `emitter`, `guide`, and `markdown` — every non-local package still
serves a `^0.0.12` build. This resolves only in phase 2, when those republish. It typechecks
today (process's full chain was green under exactly this shape at 0.0.5), and contract
0.0.13's registry-global identity brand was built for cross-copy recognition.

## Layer-1 fan-out set, measured 2026-08-21

Every target clean and committed. All jump further than process did.

| Target | Head | scaffold pin | Fleet pins needing a raise |
| --- | --- | --- | --- |
| qualifier | `919b743` | `^0.0.42` | contract, test |
| queue | `2bd18b0` | `^0.0.42` | contract, test |
| router | `a8f372a` | `^0.0.41` | contract, test `^0.0.6` |
| middleware | `1a79ebc` | `^0.0.42` | contract, test |
| browser | `c1d1f18` | `^0.0.41` | contract, test `^0.0.6` |
| brief | `eab309b` | `^0.0.42` | contract, test |

Standing risk for every visit: the strengthened `no-nested-functions` plugin rule and the
hardened policy instruments arrive vendored, so a target's own sweep may red where
scaffold's did not. Budget a fix round per target; the pilot's result sizes it.

## Layer order after layer 1

mcp and sea (need process), program (needs qualifier), workflow and worker (need queue) →
agent (needs workflow) → toolbox (needs agent). supervisor is the owner's, slotted at its
own timing.

## What the pilot found, beyond the version raise

Gates 1-5 passed with the newly vendored instruments in place, including the strengthened
`no-nested-functions` plugin rule. **The standing fan-out risk did not materialize on this
target**, which sizes the remaining visits as low-risk rather than fix-round-heavy.

Gate 6 exposed three real defects in `tests/distribution.test.ts`, found only because the
release-mode distribution proof runs npm for real. Each was repaired and each red was
observed before its green:

1. `spawnSync('npm', …)` returns `ENOENT` on Windows — the launcher resolves only as
   `npm.cmd`, and `spawnSync` without a shell applies no `PATHEXT` resolution.
2. Naming `npm.cmd` alone then returns `EINVAL` with a null status — Node refuses to launch
   a `.cmd` directly since the batch-argument hardening, so the call needs `shell`.
3. `npm pack --json` is parsed as an array; the installed npm returns a record keyed by the
   package name, so the parse failed on shape rather than on Windows. Replaced with the
   directory glob scaffold already uses, which no npm version change can move.

Defects 1 and 2 are Windows-only; defect 3 would fail on any host. `tests/distribution.test.ts`
is target-owned rather than vendored, so each target carries its own vintage.

## Distribution-proof idioms across the fleet, swept 2026-08-21

Only five local repos carry `tests/distribution.test.ts`: brief, mcp, probe, process,
scaffold. The layer-1 fan-out targets (qualifier, queue, router, middleware, browser) have
none, so this defect class does not reach them.

| Repo | How it launches npm | State |
| --- | --- | --- |
| probe | `process.execPath` with `process.env.npm_execpath` | green, most portable |
| brief | `npm()` helper over `execFileSync(process.execPath, …)` | green, same idiom |
| scaffold | `npm.cmd` + `shell`, documented | green |
| process | `npm.cmd` + `shell`, plus the glob | green after this visit |
| **mcp** | bare `npm`, no shell, `Array.isArray` on the JSON | **carries all three defects** |

mcp is layer 2 and will fail exactly as process did; its visit takes the same repair. The
fleet holds two working idioms — executing npm's JS entry through `process.execPath`, and
naming `npm.cmd` with a shell. Both are sound; the split is a canon question for a later
pass, not churn for this wave.

## Layer-1 first pass: a universal guard, correctly refused

All six visits stopped at the same point with the same message, none having written
anything past its checkpoint:

```
TARGET: The manifest at . does not declare a planned dependency: @orkestrel/probe.
To continue, add this exact dependency line to dependencies or devDependencies in
package.json: "@orkestrel/probe": "^0.0.2",
```

Scaffold's plan requires every workspace to declare `@orkestrel/probe`: the probe MCP
server is part of the vendored orchestration setup and its Vitest project arms through
that dependency. `overwrite` refuses to invent the declaration — a dependency is the
target's own statement, so the verb names the exact line and stops. That is the guard
working, and the units were right to stop rather than add it unbidden.

**Ruling:** the line is legitimate and belongs in `devDependencies` — probe is a
development tool, and that is where `process` and `scaffold` already carry it. The visit
procedure now declares it when neither section has it, then proceeds.

**This recurs on every target not visited since probe entered the plan.** process and
scaffold already declare it. Expect the same stop, and the same one-line answer, on mcp,
sea, program, workflow, worker, agent, toolbox, and supervisor.

## Layer-1 second pass: the vitest lockstep defect

With the probe declaration authorized, `overwrite` succeeded everywhere. Two targets then
went green outright (middleware 0.0.17, brief 0.0.4) and four stopped on an npm `ERESOLVE`
during the post-overwrite install. The correlation is exact and it names the cause:

| Target | `@vitest/browser-playwright` | `vitest` | Install |
| --- | --- | --- | --- |
| middleware | `^4.1.11` | `^4.1.11` | clean |
| brief | not declared | `^4.1.11` | clean |
| qualifier | `^4.1.10` | `^4.1.11` | ERESOLVE |
| queue | `^4.1.10` | `^4.1.11` | ERESOLVE |
| browser | `^4.1.10` | `^4.1.11` | ERESOLVE |
| router | `^4.1.11` (manifest) | `^4.1.11` | ERESOLVE — its LOCKFILE still pinned `4.1.10` |

**The defect.** `vitest` and its browser providers ship as one release train and the
provider declares a strict peer on the exact `vitest` version. `vitest` is derived from
scaffold's own manifest and was raised to `^4.1.11`; `@vitest/browser-playwright` is a
SEED — scaffold declares no browser environment, so it never installs that package and the
derivation cannot reach it. Raising one without the other breaks the peer and npm refuses
the tree. The `@vitest/browser-webdriverio` line in the error is resolver noise from
vitest's peerOptional provider list, not a real dependency.

**Repair applied.** The provider range is set equal to the declared `vitest` range in
qualifier, queue, and browser; every one of the four had its lockfile regenerated, because
a wholesale range change leaves the old lock unable to reconcile in place. All four then
installed clean, took the patch bump their moved runtime set owes, and went to
verification.

**Carried to scaffold's next change.** A seed that versions in lockstep with a derived row
must move with it rather than sit at whatever literal was last typed. Either derive
`@vitest/browser-playwright` from the `vitest` row directly, or make the range instrument
prove the two agree. This is the same class as the bin fixture seeds already carried: a
literal that no mechanism keeps true.

## Layer 2

Green on the first pass: program 0.0.10, workflow 0.0.14, worker 0.0.9. Each hit the
`ERESOLVE` the layer-1 wave taught and regenerated its own lockfile without intervention.

**sea — an Orchestrator misroute, recorded.** Its visit went to a Sol bench exec and stopped
when `npm install` failed on the sandbox's npm cache directory. The bench laws already say
this: network-dependent work — lockfile generation, real installs, live fetches — belongs to
the Orchestrator's own tracked commands or to a native writing unit, never to a sandboxed
bench exec. The brief named a migration whose first step was an install, so the route was
wrong before the unit started. The visit was re-run on the host.

sea also carried the one real code migration of the wave. `@orkestrel/process` 0.0.5 removed
`runSync`; the synchronous runner is `executeSync`. Every member the call site passes and
reads was checked against the INSTALLED declarations rather than assumed — `file`,
`arguments`, `environment`; `workspace`, `timeout`, `strict`; `expired`, `failed`, `stdout`,
`stderr` — all present and identically named, so the migration is a pure rename. The comment
above the call was rewritten to state only what `executeSync`'s own contract states: it
spawns through the package's resolver, never through a shell, and refuses a batch-bound
argument as `invalid`. The old `cmd.exe /d /s /c` claim was dropped because the published
contract no longer makes it. Typecheck green at 0.0.10.

**mcp — held on two guide controls, not on its visit.** The visit succeeded: all three
distribution repairs landed and it bumped to 0.0.21. Two CONTROL cases in
`tests/guides.test.ts` fail, and probes taken outside any runner separate them:

- `a raw spawn whose env REPLACES the parent hands the child no PATH at all` is FALSE on
  Windows and always was. A replacing `env` still yields 12 variables including a populated
  `PATH`, plus HOMEDRIVE, HOMEPATH, LOGONSERVER, SYSTEMDRIVE, SYSTEMROOT, TEMP, USERDOMAIN,
  USERNAME. A POSIX assumption, pre-existing, surfaced only because this repo's `guides`
  project had never run on this host.
- `a raw spawn with stdio 'inherit' hands the child this process's own stderr` is NOT
  inherent Windows behaviour: outside the runner, identity is preserved exactly
  (`782266666:99642141755670300` on both sides). Runner-specific, and the runner version
  moved in this visit. Both observed ids carry device `0`, consistent with pipes.

Ruled to an Opus unit: characterize the second, make each control assert what is true here
without weakening its contrast, and correct any prose in `guides/mcp.md` § stdio transport
making the same false claim.

## mcp's guide controls — my probe was right about the answer and wrong about the reason

I reported case 2 as runner-specific because a probe outside the runner showed `inherit`
preserving stderr identity exactly. That probe ran from a parent whose fd 2 was a TERMINAL.
The repairing unit measured the case that matters and found the real fact:

**`fstat` reports no file identity for a Windows anonymous pipe.** It substitutes a
per-process handle value in `ino` and `0` in `dev`, so `dev:ino` is not an identity for that
descriptor at all. Three children handed the SAME inherited pipe read `0:696`, `0:676`, and
`0:788`. Vitest's default `forks` pool gives each worker piped stdio, so the `guides`
worker's fd 2 is a pipe and the assertion could never pass under it.

The sharper consequence: the neighbouring `PIPES the child stderr…` assertion, which reads
`expect(report['stderr']).not.toBe(readOwnStderr())`, was passing VACUOUSLY — two unequal
handle numbers, never evidence. A green assertion that could not have failed.

Case 1 is also deeper than I found. The `PATH` a replacing spawn injects is not a system
path: it is the parent's own `PATH` byte for byte (length 1056 on both sides). `PATH`
therefore cannot separate a merge from a replacement on Windows at all, only on POSIX.

**The repairs.** The environment discriminator is now a self-named parent-only key the test
sets and never supplies. The stderr control hands a scratch FILE to a relay which spawns the
report child with the literal `stdio: ['pipe','pipe','inherit']`, so the grandchild reports a
real file id — making `'inherit'` measurable on any host. A pipe-kind reading (`mode & S_IFMT`,
because `Stats.isFIFO()` answers false for a Windows pipe whose mode is 4096) gives the
transport side its own positive fact. Every repaired assertion was shown failing against a
wrong expectation and passing as written; the strongest control flips the relay's stdio
rather than a literal, so it reddens by changing the mechanism the control demonstrates.

`guides/mcp.md` needed no correction — the false sentences lived only in the test's comments
and case names. Two findings recorded against the capability that owns them rather than acted
on: the guide's "scrub the parent environment before spawning" advice is unusable on Windows,
because deleting `SYSTEMROOT` aborts a spawned Node child at startup
(`Assertion failed: ncrypto::CSPRNG(nullptr, 0)`, measured); and its claim that the child's
stderr is "retained as a bounded tail on the supervisor" cannot be tried through the public
API, since `StdioClientTransport` holds its `Process` in a `#process` field and exposes no
stderr reader.
