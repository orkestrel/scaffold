# ROADMAP

The plan of record after the scaffold 0.0.50 adoption (2026-08-24: the fleet re-pinned to the
published scaffold with the generated distribution proof landed everywhere, following the
current-pins release wave of 2026-08-18). This file owns everything still open. Campaign detail
is recoverable from git history by hash; no campaign folder is the plan of record.

## 1. Package work, scheduled by each package's next natural release

- **fleet**: the vendored `tests/config.test.ts` assertion that reddens a publishing target
  lacking `"prepack": "npm run build"` still has not landed. Verified 2026-08-22: the line is
  declared in every publishing manifest and `blueprintToScripts` emits it at birth, but the
  vendored suite asserts `test`, `test:config`, and `prepublishOnly` only, so a publishing target
  that omits `prepack` stays green. An earlier revision of this row claimed the assertion landed
  on 2026-08-21; it did not.
- **test**: transcribe the guide fences a Node `guides` project cannot run — the `contrast`,
  `readRing`, and journal fences need a browser-capable guides project, and the wait fence's
  child-exit half belongs with the expensive proofs; the pre-existing fences remain
  untranscribed standing debt. The transcription idiom exists in `tests/guides.test.ts`.
- **probe**: convert the attempt-counted poll loops to `waitForCondition`, which
  `@orkestrel/test` publishes. A settling wait before a negative assertion stays a fixed
  `waitForDelay`, because a poll cannot prove absence. The conversion map, measured 2026-08-24:
  poll loops at `tests/src/bin/main.test.ts` (the arming waits), `tests/src/server/stages/LintStage.test.ts:152-158,368-371`,
  `tests/src/server/stages/RuntimeStage.test.ts:971-972,1274-1280`, and
  `tests/src/server/Probe.test.ts:826-833`; the settling waits at
  `LintStage.test.ts:344,828,939` stay. Middleware, router, and process converted in their
  repositories on the same date, and browser earlier. (was B21c)
- **middleware**: move `MultipartParser.ts` from the environment root into a domain folder.
  (was B5)
- **brief**: read-once ownership at guarded doors — clone → guard → seal → refuse, so a
  per-read getter cannot defeat containment. The program half landed with the definition
  snapshot-guard-seal and the coded clone-fault refusal. (was B18)
- **supervisor**: adopt `ProcessOptions.delivery` where each consumer meets stdin-delivery
  failure, and close the `CLIProvider` race between `ProcessOptions.on` registration and early
  child output; the timeout backstop retires only after that adoption. The mcp half closed
  2026-08-24: the stdio client transport carries a defaulted `delivery` bound with the
  send-failure voice split and executed pins.
- **mcp**: `StdioServerTransport.send` discards its write's outcome — `#output.write` with no
  return check, no callback, and no `error` subscription on the output stream. Rule on
  backpressure and error surfacing for caller-owned output streams, and pin the ruling. Both
  design lanes ruled it outside the delivery row's scope on 2026-08-24.
- **supervisor**: rule on the first-unparseable-line policy — whether a stream's first
  non-JSON line fails fast or accumulates — and pin the ruling.
- **probe**: the rows its 0.0.1 campaign recorded and deliberately left outside its exit criterion.
  Graded MEDIUM and excluded from campaign close: the coordinator deadline does not bound synchronous
  stage work, measured at a 1783 ms stall on a caller-named tree-wide project; a missing test
  directory or a write failure rejects `prove` as a bare `Error` rather than an `origin: 'instrument'`
  finding. Needing a design round: an unrelated `Control`, carrying independent `files` and `test`,
  still earns a receipt. Unproven, each needing a probe nobody ran: whether a failed re-warm past the
  64-specification bound leaves the runtime stage permanently rejected; whether a candidate shadowing
  an on-disk file makes the type and runtime stages disagree about the text; whether
  `experimental.fsModuleCache` can serve a disk-derived transform for a covered path.
  Deferred test-helper debt: `resolveRoot` through `tests/setup.ts`, `createTeardown`
  across the `finally` blocks that duplicate it, and the generic process-ending helper that
  `tests/src/server/stages/LintStage.test.ts` declares locally — moving it to
  `tests/setupServer.ts` obliges the `setup` project, its script, and a `tests/setup*.test.ts`
  proof, so the family moves together or not at all. Routed to a successor and never scheduled: the
  generated specification's `import.meta.url` carrying the revision suffix, and bounding
  `destroy()` against a language server that accepts stdin and never answers `initialize`.
  Carried into the same wave from the 2026-08-21 Windows campaign: translate the `#issue`
  prose door the way the refusal doors were translated; rule on the `realpathSync` race a
  scratch rename can win; a mintty-backed TTY fixture where `/usr/bin/script` is absent.

- **scaffold**: the emitted distribution proof detects a browser face by output-path prefix
  (`module.startsWith(BROWSER_OUTPUT)`) rather than by resolving the `browser` condition. A package
  publishing a browser face under a condition instead of a path convention is classified as a Node
  entry. Surfaced 2026-08-23 while repairing the condition model; the repair established that a
  single shared module field cannot carry `node` without breaking browser resolution, which is the
  same seam.
- **scaffold**: a generated `vite.config.ts` declares every project factory as
  `(options?: UserConfig)` and `src/core/compilers.ts` pushes each as a bare reference into
  `test.projects`, where Vitest calls it with a `ConfigEnv`. Measured 2026-08-23:
  `{"command":"serve","mode":"test","isPreview":false,"isSsrBuild":false}` is merged into the config.
  `mode` is a real `UserConfig` field already equal to the run's mode and the rest are inert, so
  nothing observable changes and every target's gates are green — but the declared type is false
  about the only call that happens, in a file every fleet maintainer reads. Two audit lanes ruled it
  a latent hazard rather than a defect. The fix is to emit the entry invoked, which moves every
  factory reference in every target's config, so it wants one deliberate pass.
- **scaffold**: `tests/setup*.ts` is birth-owned, so a target keeps the seed of whichever release
  materialized it and `repair` reports it aligned forever. A release whose planned seed differs then
  raises the uncovered-setup question against a module scaffold itself wrote. Reproduced 2026-08-23
  with the built CLI. No seed moved in 0.0.50, so nothing fires on it. Closing it means treating a
  module matching any seed the blueprint has ever planned at that path as unfilled, which means
  shipping that history; the guide states the limit meanwhile.
- **scaffold**: `above` and `below` as directional references violate `.claude/rules/writing.md`
  § Code tokens, references, and links. The instances inside the emitted distribution template were
  repaired 2026-08-23 because they ship into every target; several remain elsewhere in
  `src/core/templates.ts`. Sweep the repository once rather than fixing them where they are noticed.

- **scaffold**: the emitted proof's `commonjs` selector reads which condition names the resolution
  walked through rather than what a typed CommonJS consumer can take, so it excludes subpaths that
  consumer accepts. Two vectors are measured, 2026-08-23, and no single condition-set change covers
  both: `{"module-sync": "./x.js", "require": "./x.cjs", "import": "./x.js"}`, where the walk returns
  at `module-sync` before reaching `require`; and
  `{"node": {"types": "./index.d.cts", "default": "./index.cjs"}, "default": {…}}`, where the walk
  never meets a `require` key at all although Node's `require` returns the CommonJS module. Closing it
  means deciding CommonJS support from the resolved target's module format — its extension, and the
  package's `type` for a `.js` target — rather than from a traversed condition name.

- **supervisor**: `tests/app/server/fixtures/claude.mjs` orphans itself on every run and never exits.
  It blocks on `for await (const chunk of process.stdin)`, so a spawn whose stdin is never closed
  parks it forever. Measured 2026-08-23: one instance had survived 7h46m holding 57MB, and a fresh
  run leaked another within seconds — its parent is already PID 1 at 17 seconds old. Each leak costs
  about 50MB and they accumulate across runs until the container is reclaimed. The fixture needs its
  stdin closed by whatever spawns it, or a guard that exits when stdin is not a pipe.

- **scaffold**: vendored instruction files carry pre-existing directional references (`above`,
  `below`) that `.claude/rules/writing.md` refuses. Measured 2026-08-23 over the vendored inventory:
  hits sit in `.claude/agents/*`, `.claude/rules/*`, `.codex/config.toml`, and `guides/scaffold.md`.
  Several are permitted by sense — the rule stating the ban must quote the words, and a version floor
  described as "at or above" a minimum is numeric comparison. The emitted distribution proof, which
  ships under presence ownership, is clean. Rule each remaining hit by sense and repair the banned
  senses in a pass that owns those files.

- **html**: the `subquadratic` and `linear` tests in `tests/src/core/helpers.test.ts` and
  `tests/src/core/parsers.test.ts` assert measured wall-clock milliseconds against a computed budget,
  so they fail on a loaded machine and pass on an idle one. Measured 2026-08-24: red under three
  concurrent sweep slices, green alone. A timing budget is not a property a shared runner can hold.

## 2. Design and research records

- **Guide mirrors track upstream `main`, not the catalog release.** `Upstream` fetches guides
  from `raw.githubusercontent.com` on `main` and versions from `registry.npmjs.org`, so the
  two are independent by construction: between publishes a mirror is the branch's content and
  nothing more, and mirror bytes are never evidence for the version the catalog names.
  Publish a dependency before publishing any package that refreshes and ships its guide.
  Revisit a release-pinned mirror only when the fleet publishes a stable per-release ref.
- **Sweeps with no honest mechanical form**: the model-routing and version-catalog sweep stays
  review-owned, because the version-catalog half has no membership rule separating a catalog table
  from a permitted version value and every mechanical form tried reds a healthy reference. The
  landed template-TODO instrument scans literal `TODO` occurrences outside inline backtick spans
  and fences indented no more than three spaces in canonical `SKILL.md` files, the
  `references/*.md` files they name, and matching provider-bridge `SKILL.md` files. The landed
  strict skill-directory inventory admits `SKILL.md`, `agents/openai.yaml`, the direct
  `references/*.md` files named by `SKILL.md`, and only the `agents/` and `references/`
  directories.
