# Campaign: fix round after the 0.0.57 propagation

Date: 2026-08-27. Operator: the Orchestrator, session `claude/scaffold-proposal-impl-nabmm9`.
Subject: the issue inventory the propagation campaign recorded in
`propagation-0.0.57.md`, fixed on the user's instruction with `supervisor` excluded, and the
republish order re-derived from what the fixes moved.

## What the round fixed

**`brief`** — the provenance test draws its corpus from the installed canon `AGENTS.md` under
`node_modules/@orkestrel/scaffold/dist/host/` instead of the repository's own pointer copy, so the
corpus-size guard holds without weakening. Gates green; the held-back adoption commit and the fix
are on `main` at `6793174`. The rebuilt dist is CLEAN against published 0.0.6, so the fix obliges
no release.

**`scaffold`** — the catalog table regenerated from the registry: the scaffold row moves to
0.0.57 with the `console` pin that release declares, and the staged host inventory follows. On
`main` and the session branch at `612e610`. The catalog agent ships in `dist/host`, so the rebuilt
dist is MOVED against published 0.0.57 and scaffold joins the republish set as a seed.

**The fleet's lockfiles** — the propagation visit ran its install before `scaffold overwrite`
re-pinned `@types/node` to `^26.4.0`, so every committed lock still carried the `^26.3.0`
snapshot and `npm ci` would refuse the tree. Every visited repository took a fresh install and a
lock-sync commit, except `contract`, `lsp`, `terminal`, and `probe`, whose locks already agreed
with their manifests. Each push was gated on `format:check`, `lint:check`, `check`, `build`, and
`test` all exiting 0. Every checkout matches `origin/main` by a `git ls-remote` sweep taken after
the pass; `supervisor` stays untouched on the user's instruction.

## The typescript finding is a migration, not a re-pin

The fleet declares `typescript` `^6.0.3` as a development dependency; the registry serves 7.0.2.
A pilot re-pin on `msg` failed on every gate past lint, and the failure is structural: the
typescript 7 package does not ship the JavaScript compiler API.

- `tests/setupPolicy.ts` — vendored from scaffold's `dist/host` into every target — drives
  `ts.createSourceFile`, `ts.isCallExpression`, and the rest of that API. Under typescript 7 the
  `check` gate reports the members missing and the policy suite fails at runtime.
- The build gate fails in every repository: `unplugin-dts` refuses with an instruction to install
  `@typescript/typescript6` alongside typescript 7 to keep the JS API available for tooling.
- `probe` publishes `typescript` `^6.0.0` as a peer dependency, and its product is the compiler
  API.

Closing the finding therefore requires a designed migration: the `@typescript/typescript6`
fallback added as a development dependency across the fleet, the vendored policy suite in scaffold
taught to load the JS API from the fallback, a scaffold release to propagate that change, and a
ruling on `probe`'s peer range. Adding a package needs the user's explicit request, so the pilot
was reverted — `msg` proved `check` green again on `^6.0.3` — and the decision sits with the user.

## Finding: published probe 0.0.9 reports itself as 0.0.8

The dist comparison found `probe`'s rebuilt server entries differing from the published 0.0.9
tarball in exactly one material line: the published artifact embeds `version = "0.0.8"`. The
0.0.9 release shipped a dist built before its version bump — the case `wave.md` § Rule on the
bump names for a package that imports its own manifest version into published code. The rebuild
embeds 0.0.9. `probe` is a seed in the republish order for this reason, and its release must
rebuild after the bump rather than shipping a pre-bump dist again.

## The republish order

Every package's rebuilt `dist/` was compared against its published tarball for material content —
sourcemaps excluded, whitespace-only differences ignored. `scaffold` and `probe` moved; every
other compared dist is CLEAN, so the debt is manifest drift plus those two artifacts. Seeds and
followers, in layer order, where `*` marks a package whose own manifest or dist moved:

```text
L2  middleware *, pool *, process *, router *
L3  guide *, lsp, mcp *, qualifier *, queue *, scaffold *, sea, server
L4  probe *, program *, worker *, workflow
L5  agent *, supervisor *
L6  ollama, toolbox *
```

- The pins the seeds carry name versions the registry already serves, so no earlier layer blocks
  L2; the wave starts there.
- `scaffold` publishes on its own account and propagates as files rather than as a cascade;
  nothing runtime-depends on it. Its row sits at L3 only because its own runtime pins place it
  there, and its release can run independently.
- The `supervisor` row reads the re-pin still uncommitted in its working tree. Its visit stays
  blocked until `mcp` republishes with the peer `server` `^0.0.15` its checkout declares, and its
  manifest `version` field reads 0.0.2 while the registry serves 0.0.1 — resolve that against
  `wave.md` § Prepare a layer, which bumps from what the registry serves.
- Publishing reaches no consumer on its own: under `0.0.x` a caret pins one exact release, so each
  dependent re-pins and republishes in its layer.

## Instruments

`visit2.sh` runs one repository's lock-sync visit — install, the gate chain with `build`, a
commit and push only on green — then fetches the published tarball and rules the dist.
`material.mjs` compares the locally packed `dist/` file set against the tarball's: sourcemaps and
`sourceMappingURL` comment lines excluded, each line stripped of whitespace before comparison.
Its controls ran both ways in this round — MOVED on scaffold's regenerated catalog and CLEAN on
brief's test-only change — so it discriminates. Its blind spot: a whitespace-only change inside a
string literal whose meaning depends on that whitespace is invisible to it. `assemble.mjs` folds
manifest-vs-packument drift and the dist verdicts into seeds, closes the cascade over runtime
edges only, and layers by runtime depth.

One reading in this round was self-inflicted: `probe`'s first solo test run went red on a single
timing-sensitive gate test while the registry packument refresh ran beside it. The file passed
alone in 16.7s and the full suite passed alone — src 218, policy 111, config 46, setup 3, guides
13 — so the red was contention, and the deciding re-run was taken with nothing else running, per
the concurrency rules in `.agents/orchestration.md`.
