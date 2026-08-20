# The four-package publish wave

The campaign state, for a session that picks this up cold. Each package's own briefs, verdicts, and
unit reports live in that package's `.orkestrel/<name>/`. This file records only what spans them.

## The goal and its exit criterion

Bring `@orkestrel/process`, `@orkestrel/mcp`, `@orkestrel/probe`, and `@orkestrel/scaffold` to
production readiness and publish them. The criterion: every audit finding is implemented, repaired,
retained, or intentionally excluded on evidence; the gates are green in each repository; and the four
are on the registry in layer order.

## Layer order, and what moves

Derived from runtime `dependencies` alone, and re-derived rather than remembered:

```text
process 0.0.4  →  { mcp 0.0.20, scaffold 0.0.45 }  →  probe 0.0.1
```

Registry state read 2026-08-20: process 0.0.3, mcp 0.0.19, scaffold 0.0.44, probe absent.

Every third-party `@orkestrel` pin across the four is already at registry latest — contract 0.0.12,
emitter 0.0.7, sse 0.0.5, tool 0.0.11, websocket 0.0.9, router 0.0.10, server 0.0.14, queue 0.0.9,
timeout 0.0.7, console 0.0.9, markdown 0.0.9, template 0.0.4. Zero drift.

Only these pins move in the wave, and none forces a source change:

| Consumer | Pin | To |
| -------- | --- | -- |
| `mcp` | `@orkestrel/process` | `^0.0.4` |
| `scaffold` | `@orkestrel/process` | `^0.0.4` |
| `probe` | `@orkestrel/mcp` | `^0.0.20` |

`mcp` imports only `Process` and `PROCESS_GRACE`, neither renamed by process 0.0.4's `run` to
`execute` change. `scaffold` already followed that rename.

All four manifests carry `publishConfig.access: public` and a `prepublishOnly` chain. `probe` is a
first publish, so its packument serves 404 for minutes after a successful upload — treat that as
pending rather than failed.

`script` is present on this host (`util-linux 2.39.3`), so the TTY the npm approval flow needs is
satisfiable here. `npm whoami` returns 401: the credential is the owner's and the login needs them at
the keyboard.

`AGENTS.md` § Publishing owns the window procedure — the fifo stdin, `--browser=false`, the
one-attempt rule for a layer's first package, reading the result from the registry rather than an
exit code, and the rest. Do not restate it anywhere; read it there.

## Scaffold cannot build from a clean install until process publishes

`src/bin/CLI.ts` imports `executeSync` from `@orkestrel/process/server`. That subpath does not exist
in `@orkestrel/process` 0.0.3, which is what the lockfile resolves, so a clean `npm ci` in this
repository produces:

```text
src/bin/CLI.ts(36,29): error TS2307: Cannot find module '@orkestrel/process/server' or its
corresponding type declarations.
```

This is not a pin problem and re-pinning does not fix it. The layer order is enforced by **source**
here, not only by manifest ranges: scaffold's gates cannot go green from the registry until
`@orkestrel/process` 0.0.4 is published.

The pre-publish workaround, taken 2026-08-20 and still in force in this container:

```text
cd /workspace/process && npm run build && npm pack --pack-destination /home/user/scaffold/tmp/tarballs
npm install --no-save tmp/tarballs/orkestrel-process-0.0.4.tgz
```

`--no-save` is deliberate. It installs the packed artifact — never a link, which would skip the
packing, the `files` list, and the exports map — and it leaves `package.json` and `package-lock.json
`untouched, so there is no replaced range to restore. Run `npm ci` to return to the registry copy
before any gate that must prove the published artifact, and before publishing.

Repack whenever process's source moves. A stale tarball is a stale `dist/` wearing a disguise: the
consumer's gates go green against a fix that no longer exists upstream.

## TypeScript stays below 7, and a "latest" sweep must not touch it

The owner's ruling: TypeScript cannot move past `6.0.3`, because version 7 breaks what this fleet is
built on. TypeScript `7.0.2` is on the registry as of 2026-08-20, so this is live rather than
hypothetical.

Every package in the wave declares `typescript` at `^6.0.3` and has `6.0.3` installed. That range
already excludes 7, verified rather than assumed:

```text
7.0.0 satisfies ^6.0.3: false
6.9.0 satisfies ^6.0.3: true
```

So no edit is needed, and none was made. The instruction to bring dependencies to latest is scoped to
`@orkestrel/*` packages alone. A sweep that reads "latest" as "every dependency" moves TypeScript to
7 and breaks every package at once — check this line before running one.

`^6.0.3` blocks 7 and admits a later `6.x`. If the intent is to freeze at exactly `6.0.3`, the range
has to become `6.0.3`; the reason the owner gave is satisfied by the caret as it stands.

## What the audits found

Every package was audited by GPT-5.6 Sol, an engine that wrote none of the fixes. All four returned
FAIL. Each verdict is in that package's `.orkestrel/<name>/`.

- **process** — a count in a test comment; a positional tally in a public helper's contract; a guide
  claim that flagship fences are transcribed when several are not. The packed-artifact claim came
  back UNRESOLVED because the read-only sandbox denied npm its cache; that reading is the
  Orchestrator's to take with `npm run build && npm pack --dry-run`.
- **mcp** — two transport release defects, both now fixed and pushed; a guide that asserts checks the
  parity gate and the policy suite never execute; a distribution gate that never inspects the packed
  file inventory; counts surviving in test comments.
- **probe** — containment is lexical, so a symlink lets it write and delete outside the workspace;
  the sweep deletes a caller's own unmarked file; a receipt is minted over an instrument failure;
  the public surface carries pass-through factories and a rename-only getter; the error axis
  overlaps so a caller cannot tell their fault from the tool's.
- **scaffold** — the count ban quotes positional references in the line that bans them; it does not
  decide `both`; positional references survive across the canon; campaign-added instructions carry
  clauses that argue rather than direct.

## Rulings taken from the chair

- **Module resolution is left exactly as declared.** Every package in the wave sets
  `module: ESNext`, `moduleResolution: bundler`, `target: ESNext`, and `lib: ESNext, DOM,
  DOM.Iterable`, with an `engines` floor of Node 22.12 or later. Two audit lanes tested resolution
  under a `node10`/`node16`/`bundler`/`nodenext` matrix on their own initiative and reported `node10`
  failures — mcp has no `typesVersions`, and probe resolves its root but not its `./server` subpath.
  Neither is a defect: `node10` appears in no configuration this fleet owns. Add no `typesVersions`,
  and add no declaration of non-support either. The owner's ruling: do not constrain beyond what is
  declared, in either direction.

  The stale `sideEffects` row probe carries for an unshipped `src/bin/main.ts` is unrelated to
  resolution, and it is scaffold-generated — `compilers.ts` emits the source entry for any blueprint
  with a bin. It is a successor scaffold finding, not a probe fix and not a wave fix: changing it
  re-plans the manifest of every target for dead weight that breaks nothing.

- **mcp's stdio release finding is a bound or a documented limit, not a re-pin.** The audit proposed
  re-pinning to a `@orkestrel/process` release that closes inherited-pipe iteration. No such release
  exists: 0.0.4 documents the opposite as intended, and its own remedy is a `timeout`.
- **probe's `createProbe` and `createProbeServer` are deleted.** `.claude/rules/architecture.md`
  names a pass-through factory for deletion, and a first publish is the only free moment.
- **probe's `Inspection` stays exported.** The design lane refuted the audit here with a rule
  citation: an implementation file may not hold a module-scope interface, so `types.ts` is its only
  home and a type there is barrelled by construction. "Intern it" means "delete it", and the guide
  publishes the coordinator seam that uses it on purpose.
- **No count detector ships in this wave.** The objective lane measured a bounded cardinal-list
  detector clean with working controls, and measured an ordinal detector at a false-positive rate
  high enough that an unconditional gate would be suppressed rather than obeyed. The cardinal design
  is recorded for a successor campaign; adding it mid-wave would redden targets the wave does not
  touch.

## A bench fact this campaign measured

A bench sandbox denies a **loopback listener**, alongside the grandchild process and the nested
install already recorded in § Bench laws. Measured in `@orkestrel/mcp`: `listen EPERM` on
`0.0.0.0:24678` and on `127.0.0.1`, with neither the browser nor the server project able to collect,
while the same suites exited 0 on the host. A subject needing a real local server is unmeasurable
inside a bench.

## Where each package stands

Read this section first; it is the one that changes.

| Package | Version | State |
| ------- | ------- | ----- |
| `@orkestrel/process` | 0.0.4 | **closed** — audit, lens, and cross-engine audit all resolved, gates green |
| `@orkestrel/mcp` | 0.0.20 | **closed** — audit, cross-engine audit, and its fix round all resolved, gates green |
| `@orkestrel/scaffold` | 0.0.45 | **closed** — audit, lens, and cross-engine audit all resolved, gates green |
| `@orkestrel/probe` | 0.0.1 | **NOT READY** — its cross-engine audit returned nearly every claim broken |

## Probe is not ready, and two of its defects are this campaign's own

A cross-engine audit before the first publish found these. Each was verified against source by the
Orchestrator rather than accepted on report.

**Three names collide with `@orkestrel/scaffold`, which probe installs.** Scaffold publishes `Origin`
as `'host' | 'template' | 'computed'`, and publishes `Finding` and `isFinding`. Probe publishes all
three for different concepts. The `Origin` collision was **created** by this campaign: the name it
replaced, `FindingOrigin`, appears nowhere in scaffold. A first publish cements all three.

**The receipt mints over a phase in which no test ran.** `computeReceipt` reads the case as clean when
no finding carries `origin: 'claimant'`, and the only `workspace` finding the package emits means the
runtime stage installed no overlay and executed nothing. Before this campaign the condition was
`findings.length === 0` and refused it. The migration widened it and a test was added asserting the
widening.

**The deadline attribution inverts.** The runtime stage increments its progress counter after the run
resolves, so a deadline firing during the run always reports `instrument`. The package's own test
asserts that a claim whose body is `while (true) {}` reports `instrument` — telling a caller to file a
probe defect for their own infinite loop.

Also open: a generated specification carrying two revision markers can never be swept, so a host killed
mid-boot leaves it in the target tree forever; a symlink in the target tree is refused as the
claimant's fault where the tree owns it, and raised where no claim is in flight; and a native error
escapes a published helper unclassified, through a gate this campaign narrowed.

## Start here next session

**Repository tips, all pushed to `main`:**

| Repository | Tip | State |
| ---------- | --- | ----- |
| `@orkestrel/scaffold` | see `git log -1` on `main` | closed, gates green |
| `@orkestrel/process` | `8a4cc94` | closed, gates green |
| `@orkestrel/mcp` | `b06cd26` | closed, gates green |
| `@orkestrel/probe` | `38cb0c0` | one test red, deliberately committed |

Scaffold's working branch `claude/oxlint-conventions-audit-m66uiq` and `main` point at the same
commit. Push to both.

**Probe's one red test.** `attributes a deadline in runtime cleanup to the instrument` in
`tests/src/server/Probe.test.ts` times out at 60000 ms on the host — alone on an idle container as
well as inside the suite — while the unit that wrote it reported green from its bench sandbox. Its
mechanism is a `mkfifo` at the Vitest results-cache path plus a spawned reader, meant to stall the
eviction write so a deadline fires during cleanup; on this host it hangs instead of stalling.

Everything else in probe is green: `format:check`, `lint:check`, `check`, `build`,
`test:distribution`, and 170 of 171 tests.

Rule between three, and say which you took: repair the stall deterministically; drive the stage's
progress boundary directly, which reaches the same assertion without a FIFO; or remove the coverage
and state plainly that instrument-side deadline attribution ships unproven, naming what would prove
it. **Do not lengthen the timeout** — a test needing longer than its siblings to prove the same class
of rule is the wrong test. Its sibling, a caller's non-terminating test attributing `claimant`,
passes on the host and stays; that is the half this campaign fixed from inverted.

A unit named `PBFIX9` was dispatched against exactly this, with its brief at
`.orkestrel/probe/pbfix9-brief.md`. If probe's tree is dirty, that unit's work is in it.

**Then: the rename.** `Origin` collides with `@orkestrel/scaffold`, which probe installs, and the
campaign created that collision. The ruling and its brief are at `.orkestrel/probe/pbfix8-brief.md`:
rename to `Party`, keep `Finding` and `isFinding`, and state the remaining collision in the guide
where a consumer reads it before importing.

Two candidates were rejected on evidence. `Fault` is published by `@orkestrel/contract`, a runtime
dependency — a worse collision than the one being fixed. `Owner` is free across the fleet but
collides inside probe, where `RuntimeStage.#owned` already answers whether this package generated a
file. **Run that check twice for any new name: outward against every `@orkestrel` package the target
declares, and inward against the package's own vocabulary.**

**Then:** a cross-engine audit of probe's fix rounds on an engine that did not write them, an
independent `verifier` per repository, and the publish window.

**Publishing needs the owner.** `npm whoami` returns 401 here. `AGENTS.md` § Publishing owns the
window procedure — the fifo stdin, `--browser=false`, one attempt for a layer's first package, and
reading the result from the registry rather than an exit code. Do not restate it; read it there.
Layer order is `process` → `{mcp, scaffold}` → `probe`.

**Before scaffold publishes**, run `npm ci` in its checkout. It holds an unsaved
`@orkestrel/process` 0.0.4 tarball install, without which `src/bin/CLI.ts` cannot resolve
`@orkestrel/process/server` and the tree cannot typecheck. That install is what lets scaffold's gates
run ahead of the registry; it is not what should prove the published artifact.

**Two constraints that outlive this campaign:**

- TypeScript stays below 7. `7.0.2` is on the registry, every package declares `^6.0.3`, and a
  scaffold test now refuses a range admitting `7.0.2`. A sweep reading "latest" as "every dependency"
  breaks the fleet; the instruction covers `@orkestrel/*` alone.
- A bench sandbox is not the host. This campaign measured a bench denying a loopback listener, a
  nested install, an `rm -rf`, a process one level below a spawned child, and a write to `.agents/` —
  and probe's red test is a case where a bench reported green and the host disagreed. Take every
  release-gating reading on the host.

## The rule these keep proving

Route a fix round to an engine that did not write the code, and give the auditor the claims that
sibling rounds turned into blockers. This campaign's audits found, in order: a `prepublishOnly` step
that could not run on a clean checkout, a fix that made two faces of one API settle oppositely, a
repair applied at one door while a sibling door stayed open, a rule the dispatcher overrode, and a
class name a sibling package already publishes.

A name collision is the one no compiler catches. `@orkestrel/console` publishes `Capture`;
`@orkestrel/scaffold` publishes `Origin`, `Finding`, and `isFinding`. Nothing fails to build. Check
every new public name against the guides of every `@orkestrel` package the target declares, before
the name ships.

## What that audit found, because the class recurs

`tests/distribution.test.ts` minted a directory inside gitignored `tmp/`. On a fresh clone `tmp/`
does not exist, so `mkdtemp` threw `ENOENT` before packing anything — and that test is the last step
of `prepublishOnly`. The gate had only ever passed because campaign work happened to have created the
directory.

**A green gate reading taken on a tree that campaign work has touched is not a green gate reading.**
Prove a release-gating test by removing the incidental state and running it again. The proof that
closed this one:

```text
mv tmp /tmp/hold && npm run test:distribution   # exit 0, Tests 1 passed
mv /tmp/hold tmp                                 # restored
```

The same audit found that a fix had introduced a defect: one transport face rejected where its
sibling resolved, in a pair the guide sells as swappable with no call-site change. An engine cannot
find that in its own work.

## Remaining work

- **probe** — the guide unit closes its documentation of the ownership axis, the categorization gate
  that inspects text instead of running anything, the count sweep, and a stale distribution consumer
  naming a removed union member. Its `guides` and `distribution` projects are red until it lands, and
  closing them is that unit's objective.
- **the cross-engine audits** of process and scaffold return, and whatever they find gets a fix round
  on an engine that did not write the fix under audit.
- **an independent `verifier`** runs the authoritative gates in each repository once its findings are
  closed.
- **the publish window**, which is the owner's and needs them at the keyboard.


## The readiness round, its goals, and its metrics

The owner's instruction, 2026-08-20: after probe's fix pipeline closes, audit every package in the
wave on strict adherence to `AGENTS.md`, the harness bridges, the rule files, and the skills, and
on whether each works as its guide claims at production grade — then address every finding. The
exit criterion is fixed here before the round runs, so acceptance is a check rather than a
judgement made while tired.

### The goal

The wave's packages — `process`, `mcp`, `scaffold`, and `probe` — end the round proven
publish-ready: canon-conformant, working as documented, and with every finding of the round
implemented, repaired, retained on evidence, or excluded on evidence. Nothing ends "hardened
further"; every row ends with its concrete closing condition met.

### The metrics that close the round

1. **Canon conformance.** A named-sweep set per package returns zero unruled hits: the
   non-negotiables (`any`, assertions, suppression comments, default exports, class member
   visibility keywords), the writing canon (counts of growable sets, positional references, the
   substitution table swept case-insensitively across inflections), naming law (single-word
   entity members, named discriminants), and centralization (declarations in their prescribed
   files). Every hit is ruled by the sense its rule bans, and each surviving hit is a finding.
2. **The gates, bare.** In each repository, `format:check`, `lint:check`, `check`, `build`,
   `npm test`, and the distribution project exit 0 by direct exit code on an idle host, run by an
   executor independent of every writer, with counts recorded and no skipped or todo test.
3. **The artifact.** For each package: `npm pack`, then a real install of the tarball in a scratch
   directory, exit 0; each published entry loads under `import` and under `require`; one real call
   returns a documented value. A proof run against a link instead of an install does not count.
4. **The audit's terminal lines.** Each package's round returns per-claim verdicts in the
   `orkestrel-falsify` shape, and the round ends with every claim `CONFIRMED` on evidence and no
   substantiated finding beside them — after the fix units, not before.
5. **Cross-engine discipline.** Every fix unit's auditor is an engine that did not write it, and
   verbatim-adopted prescriptions close with a recorded mutation probe instead.
6. **The record.** Each package's matrix, verdicts, and fix reports live in its campaign folder
   until acceptance, the prune commit is the promotion record, and every landing is pushed to the
   working branch and to `main`.

### What bounds the round against the rabbit hole

- The claim set is fixed at each round's brief and held closed; an attack invented mid-round
  against something no claim names becomes a successor claim only when substantiated to the
  `BROKEN` standard.
- A defect owned by a package outside the wave — `sea`, `supervisor`, `contract`, `test`,
  `console`, and the rest of the fleet — is recorded in `ROADMAP.md` against its owner and is not
  chased in this round.
- A seam that has already consumed its round budget gets a design ruling, not another repair.
- Reopening a criterion this round accepts needs the owner, not an auditor's remaining appetite.

### The order

Probe's pipeline first: the PBFIX10 and PBFIX11 units, their cross-engine audit, and the
verifier's gates. Then the readiness round over the packages in parallel read-only lanes, the
reconciled matrix, the fix units in serialized writers per repository, the re-audit, the verifier
per repository, the record, and the owner's publish window.
