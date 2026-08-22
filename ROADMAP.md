# ROADMAP

The plan of record after the current-pins release wave (closed 43/43, 2026-08-18: every fleet
package published at latest `@orkestrel` pins, proven by gates and the material-dist rule).
This file owns everything still open. Campaign detail is recoverable from git history by hash;
no campaign folder is the plan of record.

## 1. Package work, scheduled by each package's next natural release

- **scaffold**: a writing verb refuses a workspace that declares Vitest projects the planned
  configuration does not register, and it refuses before it selects a group, so `--groups`
  cannot reach the groups the conflict does not touch. Measured 2026-08-22 against
  supervisor, which declares `app:browser:integration`, `guides`, and eight `service:*`
  projects: `repair` and `repair --groups orchestration,docs` both refuse identically, and
  that target took the release's `orchestration` and `docs` bytes by hand instead. Rule on
  whether the precondition belongs after group selection, or whether a target's own Vitest
  projects belong in the plan; until then no such target can take a vendored change through
  the tool.
- **fleet**: sweep every target for skill and bridge members outside the vendored set; that
  population is unmeasured, and `repair` does not remove what the plan never owned.
- **scaffold**: a writing verb raises a target's `peerDependencies` to the current floors, and a
  peer range states the breadth a consumer may satisfy rather than the newest version the floor
  knows. Measured 2026-08-22: `repair` moved probe's `vitest` peer from `^4.1.0` to `^4.1.11`,
  which no consumer holding `@vitest/browser-playwright` can satisfy because that adapter pins
  `4.1.10` exactly, and probe's distribution gate caught the packed artifact refusing to install.
  The same shape shipped undetected in `@orkestrel/test` 0.0.9 and 0.0.10, whose published
  artifacts fail `ERESOLVE` beside that adapter. Rule on which declaration classes a floor may
  raise; a runtime range and a peer range are not the same question.
- **test**: pack a distribution gate that installs this package's own artifact into a consumer
  and drives it. Its absence is why the unsatisfiable `vitest` peer reached the registry twice:
  every other gate passed on a workspace that already had a resolved tree. The idiom exists in
  scaffold's and probe's `tests/distribution.test.ts`.
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
- **test**: delete the counts remaining in guide sections the 0.0.8 narrative unit did not own —
  the Threat model's refusal tally, the contract rules' limit tallies, the Voices trailer, and
  the server-factories parallel-instance figure — per the no-count law, keeping fence-derived
  values and stated limits.
- **middleware, router, process, probe**: convert the attempt-counted poll loops and the
  outlast-then-assert waits to `waitForCondition`, which `@orkestrel/test` publishes; take
  router's sequencing site as a judgment conversion that preserves the write-before-destroy
  ordering; replace the proven local copies in process `tests/setup.ts` and probe with the
  published helper. A settling wait before a negative assertion stays a fixed `waitForDelay`,
  because a poll cannot prove absence. Verified 2026-08-22: browser is converted and drops off
  this row; middleware still counts attempts in `tests/src/server/helpers.test.ts`, router's
  sequencing site is unpinned, process's `detach` and `ProcessManager` suites are unconverted,
  and probe imports `waitForCondition` nowhere. (was B21c)
- **middleware**: move `MultipartParser.ts` from the environment root into a domain folder.
  (was B5)
- **brief**: read-once ownership at guarded doors — clone → guard → seal → refuse, so a
  per-read getter cannot defeat containment. The program half landed with the definition
  snapshot-guard-seal and the coded clone-fault refusal. (was B18)
- **agent**: `Channel` silently drops a pushed `undefined` for `Channel<T | undefined>` — the
  buffer guard cannot tell absence from a pushed `undefined`. Either narrow the published type
  parameter or hold `{ value: T }` cells. Found by the 2026-08-21 batch audit, outside that
  wave's changes.
- **mcp, supervisor**: adopt `ProcessOptions.delivery` where each consumer meets stdin-delivery
  failure, and close supervisor's `CLIProvider` race between `ProcessOptions.on` registration
  and early child output; supervisor's timeout backstop retires only after that adoption.
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
