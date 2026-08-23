# Successor round 3 — attack the second fix round's rulings

This amends `.orkestrel/campaign/audit-v50-final-brief.md` and its two successors. All three stand;
read them, then read this. Both lanes receive this identical text.

## The chain, with this round added

- Design rounds, reconciled; implementation W1 through W7; propagation against eleven real packages.
- **Round 1** (three lanes, all FAIL): broke the untyped-subpath drop, the core-only proof blind to a
  later browser face, the setup question firing on a seeded workspace, the over-stated assertion
  comment, and the guide's false sentences. Two findings outside the claims: the `appBrowser()` row
  reddening every `app/browser` workspace, and an empty `scripts` region refused against its own
  contract.
- **Fix round 1** (FIX-A through FIX-E) closed every one. `prepublishOnly` green at `07f9a96`.
- **Round 2** (`.orkestrel/campaign/audit-v50-successor2.md`, two lanes, both FAIL again): broke the
  export fallback-list hole, the two false reds beside it, the peer fixture's inherited resolver
  policy, and the guide's remaining classifier claims.
- **Fix round 2** (FIX-G, FIX-H, FIX-I) closed those. `c390956..8422c2f` is the diff under audit.
- **Re-propagation** ran the fixed candidate across the eleven targets with `--offline` and the
  release-mode proof. Green so far on every target that has finished.

## What this round decides

**Whether 0.0.50 publishes.** Nothing else stands between this round and the registry. A defect that
survives here is found by a consumer after the version is spent.

Two of you are the engines that wrote the half you are auditing. FIX-G and FIX-H came from Sol;
FIX-I and the `CLI.ts` remedy rewording came from Opus. Attack your own engine's half harder — a
clean pass on your own work is the least valuable result you can return.

## Already established — do not re-run

The Orchestrator verified each directly, by running it:

- Every gate green at `07f9a96` under an independent verifier, `prepublishOnly` included.
- Everything the round-1 and round-2 "already established" sections list. Read those files.
- The packed 0.0.50 candidate carries the fixed classifier and the tip vendored bytes:
  `dist/host/guides/scaffold.md`, `dist/host/agents/orchestration.md`,
  `dist/host/tests/config.test.ts` and `dist/host/tests/policy.test.ts` each match the repository tip
  byte for byte (`sha256sum`, both sides).
- `guides/scaffold.md` in a target is a **deferred path** (`isDeferredPath`, `src/core/helpers.ts`):
  the registry mirror owns its bytes, so `overwrite --offline` leaves it untouched by design. Do not
  report that as drift.
- `overwrite --offline` exits 1 on its catalog step even when the write succeeds. Pre-existing;
  reproduces under the published 0.0.49. Not this round's subject.
- The re-propagation results in `revisit-A.log` / `revisit-B.log`, quoted in the round's report.
- **`supervisor`'s `overwrite` refusal is pre-existing.** Its manifest names Vitest projects the
  planned `vite.config.ts` does not register, so the configs group blocks and the invocation stops.
  It reproduces identically under the published 0.0.49 and is recorded in
  `audit-v50-final-brief.md` and `propagation-evidence.md`. Out of scope. Do not re-report it.
- **`@orkestrel/process` `test` went red once** on
  `tests/src/server/execution/executeSync.test.ts`: a 6000ms grandchild-readiness deadline missed by
  5.7ms, under two concurrent slices on a 4-CPU container. That file is the target's own, not a
  scaffold-generated proof. The Orchestrator re-runs it alone after the slices exit; the reading is
  reported in the round's record. Do not diagnose it from the log.

## Review evidence

The subject is a code change **and** a set of rulings, so both rows of the evidence table are supplied.

- The actual diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/r3/diff.txt`
  (`git diff c390956..HEAD`, 1556 lines), with `diffstat.txt` beside it.
- The actual status output: `.../audit/r3/status.txt` — **empty**; the tree is clean at `8422c2f`.
- The rulings themselves: `.orkestrel/campaign/fix-g-report.md`, `fix-h-report.md`, `fix-i-report.md`,
  and the round-2 reconciliation `audit-successor2-reconciliation.md`.
- The repository at `/home/user/scaffold`, HEAD `8422c2f` on `claude/new-session-hxonen`.
- Eleven propagated target checkouts under `/home/user/orkestrel/` and `/home/user/supervisor`.

## Claims

Each claim is the fix round's own ruling, stated as a property. Break it or confirm it.

**C1 — `isModule` classifies by extension, and the rule is right.**
`src/core/templates.ts`: a target whose file name carries no extension is a module; a target whose
extension is not `.js`, `.mjs`, or `.cjs` is an asset. The ruling's stated reason is that `require`
reads an extensionless file through its JavaScript handler. Attack the rule, not the output: name a
published target this misclassifies. Consider at least `.json`, `.node`, `.wasm`, and an
extensionless `LICENSE`, and consider whether the ESM loader agrees with the CJS reason the comment
gives.

**C2 — `readDeclaration`'s condition order loses no declaration and hides no broken one.**
It tries `['types','import']`, then `['types','require']`, taking the first that resolves something
`isDeclaration` accepts. Attack: construct an exports entry where this returns the wrong declaration,
or where a dual subpath's `require` types branch is broken and the `import` branch masks it.

**C3 — The `unreachable` assertion can fire.**
`expect(unreachable.map(...)).toStrictEqual([])` over `!entry.module && !entry.commonjs`. Show an
exports shape that lands an entry in `stage.entries` with neither, or show that no shape can — in
which case the assertion is vacuous and say so.

**C4 — The per-format controls are not vacuous.**
The `FORMATS` loop does `if (written.length === 0) continue`, which skips that format's probe **and**
its firing control. Attack: is there a state where `reported` and `silent` are both empty because the
partition produced nothing, so the test passes having measured nothing? If so, that is a vacuous
instrument in the exact place round 1 already repaired one.

**C5 — The seed-relative setup predicate does not fire on a workspace scaffold itself produced.**
`src/bin/CLI.ts` `#setupQuestion` compares a setup module's trimmed bytes against its seed. The
`tests.global` seed is `export function setup(): void {}\n`. Attack: run `npm run format` over a
freshly materialized `global: true` workspace and check whether the formatter rewrites that seed. If
it does, every such workspace fires the question after its first format — which is the round-1 defect
returning through a different door.

**C6 — The reworded remedy is true and the message around it is consistent.**
The remedy now says "to cover it" / "each covering the module of the same name", while the sentence
after it still says "The proof's subject is behavior only this workspace can assert." Attack: do
those two sentences agree? Does the message now ask for something the maintainer can actually close?

**C7 — FIX-H's environment pinning is the right pin, and both spawn sites carry it.**
`tests/distribution.test.ts` pins `npm_config_legacy_peer_deps: 'false'` and
`npm_config_strict_peer_deps: 'false'` in both spawn environments. Attack: is
`strict_peer_deps: 'false'` load-bearing, neutral, or actively weakening a proof whose subject is
that a conflicting peer install is **refused**? Does an env pin actually beat a project `.npmrc` for
a spawned `npm`? Verify npm's config precedence rather than assuming it.

**C8 — `appBrowser(options?: UserConfig)` is safe as a bare `projects` entry.**
`CONFIG_TEMPLATES` generates `appBrowser` into a target's `vite.config.ts`, and
`src/core/compilers.ts:821` pushes the bare reference. The round-1 fix made the entry callable to
satisfy the config gate. Attack: what does Vitest pass to a function in `projects`? If it passes a
`ConfigEnv`, `mergeConfig(applicationBrowser(false), options ?? {})` merges `{command, mode, ...}`
into the config. `/home/user/supervisor` is the one target that generates this — check it there.

**C9 — The guide is true, not merely plausible.**
FIX-I rewrote `guides/scaffold.md`'s classifier prose. Attack specifically whether a false universal
was replaced by an **unfalsifiable** one, which is worse because it reads as rigour. Check parity
against the source it describes, and check that the vendored `host.json` digest matches the rewritten
file.

**C10 — The package is coherent as a whole. Would you ship this?**
Read the diff as one change rather than as ten fixes. Name anything that reads as a repair layered on
a repair, any vocabulary that drifted across the rounds, and any place where the fixes have left two
mechanisms doing one job.

## Two of this brief's unknowns are now settled — probed by the Orchestrator

Both were named as unknowns when this brief was drafted. The Orchestrator ran them rather than
reasoning about them, and the readings are supplied here so neither lane spends a probe re-deriving
them. Rule on what they mean, not on whether they happened.

**C5's formatter vector does not fire.** `oxfmt --config .oxfmtrc.json --write` over a file holding
exactly `export function setup(): void {}\n`, using the repository's own `.oxfmtrc.json`, left the
bytes identical:

```text
before: 5d67600819a1a318
Finished in 1ms on 1 files using 4 threads.
after:  5d67600819a1a318
```

So the seed survives a format and the round-1 defect does not return through the formatter. C5 still
stands as a claim: find another door, or confirm.

**C8's argument is real.** A `projects` function entry receives a `ConfigEnv`. Probe: a
`vite.config.ts` whose only `projects` row is a function that prints its arguments, run under
`vitest run`:

```text
PROJECTS_FN_ARGS [{"command":"serve","mode":"test","isPreview":false,"isSsrBuild":false}]
 Test Files  1 passed (1)
```

So `appBrowser(options?: UserConfig)` is called with `{command, mode, isPreview, isSsrBuild}` and
merges it: `mode` is a real `UserConfig` field, the other three are not. Two further facts the
Orchestrator established, which change what C8 is asking:

- **Every** generated factory has this shape — `srcBrowser`, `policy`, `config`, `guides`,
  `distribution`, `probe`, `appServer`, `appBrowser` — and `src/core/compilers.ts` pushes every one as
  a bare reference. So this is the fleet's uniform, pre-existing shape, not a 0.0.50 regression, and
  every target's gates are green with it.
- `supervisor` is the only checkout that generates `appBrowser`, and `overwrite` refuses it for the
  unrelated reason recorded earlier — so the fix has never reached it through the real path.

C8 is therefore no longer "does this break". It is: **is a parameter typed `UserConfig` that in
practice receives a `ConfigEnv` a defect, a latent hazard, or acceptable?** Rule on it. If it is a
defect, say what a caller would have to write to observe it. If it is acceptable, say why the typing
lie is not one.

## Remaining unknown

- Whether any target in the fleet publishes a `.json`, `.wasm`, `.node`, or extensionless subpath.
  Not swept. If your attack on C1 depends on it, sweep and say exactly what scope you swept.

## Where a probe may live

**`analyst` (Sol, inside `codex exec`): you may write and run probes.** Put them only under
`tmp/probe-r3-analyst/`, never inside `tests/`, which the runner discovers. Delete them before you
return. Do not run a tree-wide gate: another lane and a live re-propagation are both in flight, and a
tree-wide result would report a failure nobody caused. Scope every run to a named project or an
explicit path. Your sandbox denies a grandchild process, a nested install, and a loopback listener —
if an attack needs one, report it as an observation naming the exact command and the Orchestrator
takes that reading on the host.

**`reviewer` (Opus): you have Read, Grep, and Glob only — no Bash, no Write.** Do not plan a probe, a
command, or a `git` read; naming one would stop you on arrival. Your evidence is the diff file, the
status file, the campaign records, and the probe readings supplied earlier. Where a claim can only be
settled by running something, return `UNRESOLVED` and name the command that would settle it — the
Orchestrator runs it and rules. Your lane is shape, taste, naming, ergonomics, design fit, and
whether the package reads as one coherent change; C6, C9, and C10 are yours first.

## The threshold

A finding is worth more than a clean pass. This is the last round before the registry. If you return
"no findings", you are saying a consumer will not hit anything here — say that only if you attacked
and failed to break, and show what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
