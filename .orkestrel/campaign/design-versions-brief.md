# Design brief: version authority in scaffold

## The user's policy, binding

1. Scaffold's emitted self-pin always equals its own `package.json` version — derived, never
   hand-updated.
2. Every `@orkestrel/*` range — dependencies, devDependencies, peerDependencies — pushes to
   the latest the registry serves, in every verb: audit, repair, catalog, overwrite,
   everywhere.
3. Foreign dependencies (typescript, vite, oxlint, and the rest) are pinned at MAJOR only:
   latest minor, then latest patch, always float; checks care only about the major.

## Terrain, measured 2026-08-21

- `src/core/constants.ts:372-409` — frozen literal tables: `BASE_DEV_DEPENDENCIES`
  (self-pin `^0.0.46`, guide/probe/test pins, foreign pins incl. `vite: ~8.2.1`),
  `DECLARATION_DEV_DEPENDENCIES`, `SOURCE_BROWSER_DEV_DEPENDENCIES`,
  `APP_DEV_DEPENDENCIES`, `APP_BROWSER_DEV_DEPENDENCIES`, plus app-server/showcase tables.
- `src/core/compilers.ts:230-244` — `blueprintToDevDependencies` merges the tables into
  every generated manifest; `:1841` refuses an extra that collides with the shared toolchain.
- `tests/src/core/constants.test.ts:49-95` — the failing mirror instruments: `:49` self-pin
  equals manifest version; `:66` every table member equals scaffold's own installed devDep
  (comment: "a package listed at one version here and another there ships a toolchain
  scaffold does not itself run"; the vue family, app runtime packages, and the self-pin are
  outside the comparison); `:90` TypeScript range must refuse `7.0.2` — a compatibility
  BOUND, not a pin. Failing today: self-pin `^0.0.46` vs manifest `0.0.47`, and probe/test/
  vite/api-extractor rows drifted.
- `src/server/Upstream.ts` — existing registry reader (abbreviated packument, latest
  version). `src/bin/CLI.ts:422` measures declared ranges against the registry's latest;
  `:1000-1010` pins named packages to `^latest`. The push-to-latest mechanism exists in the
  server layer.
- The vendored `tests/config.test.ts` asserts NO dependency versions — target-side version
  enforcement flows through the verbs, so the vendored host surface is not itself a version
  mirror.
- `src/core` is host-independent: no `node:fs`, no network. `tests/src/core/compilers.test.ts`
  pins the emitted manifest against a fixture and digest — any emission change regenerates
  both.

## Questions the lanes rule on

1. **Derivation mechanism** for the tables in host-independent core. Candidates: (a)
   `constants.ts` imports the package's own `package.json` (ESM JSON import attribute; Vite
   inlines it at build; no host API); (b) the compiler functions take a versions/manifest
   input and the bin/server layer supplies it; (c) build-time define replacement. Argue
   cost, purity, testability, and what each does to the compilers' pure-function signatures
   and to consumers of the published `blueprintToDevDependencies`.
2. **Instrument disposition.** Which of the three `constants.test.ts` cases survive
   derivation (a derived mirror is a tautology and proves nothing), what replaces them, and
   what negative control makes the new instruments falsifiable. The TypeScript-below-7 bound
   must survive somewhere.
3. **Foreign-range form.** The manifest is the single source; emitted ranges derive from it.
   Rule on: tilde retirement (`vite ~8.2.1` → caret per the policy), whether emission copies
   the manifest's range verbatim or normalizes to caret-major, and what "checks care only
   about the major" means concretely for any instrument or verb that compares foreign
   ranges.
4. **@orkestrel latest in the verbs.** `verify`/pin already measure against the registry.
   Name any verb — audit, repair, overwrite, catalog — that still compares against the
   frozen tables or a stale source, and the smallest change routing each through the
   registry read, with the offline behavior defined (no network → what does the verb say?).
5. **The non-installed literals** (vue, vue-tsc, @vitejs/plugin-vue, vite-plugin-singlefile,
   app-side `@orkestrel/contract`, `@orkestrel/html`): scaffold does not install these
   itself, so no manifest row exists to derive from. Rule on their authority under the
   major-only policy.
6. **Blast radius**: the compilers fixture/digest regeneration, the published
   `blueprintToDevDependencies` signature if it changes, and anything in the vendored host
   set that must move with this.

## Output

A ruled design: one recommendation per question with the losing options named and the
reason, the resulting file-level change list, and the test list with each instrument's
negative control. No process diary.
