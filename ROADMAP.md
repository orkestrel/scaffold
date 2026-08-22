# ROADMAP

The plan of record after the current-pins release wave (closed 43/43, 2026-08-18: every fleet
package published at latest `@orkestrel` pins, proven by gates and the material-dist rule).
This file owns everything still open. Campaign detail is recoverable from git history by hash;
no campaign folder is the plan of record.

## 1. Package work, scheduled by each package's next natural release

- **scaffold**: carry the online-first fetch release note into the next publish. The `new`, `audit`,
  `repair`, and `overwrite` verbs read live version and vendored-host surfaces before using the
  distributed floors; a transport-forced floor makes `audit`, `repair`, and `overwrite` exit `1`,
  while a successful `new` run exits `0`. Authoritative version absence and unavailable registry
  organization membership still refuse with `FETCH` and exit `1`; a failed guide row keeps the
  target's mirror and makes `catalog` or `overwrite` exit `1`. The `--offline` option selects the
  version and host floors for `new`, `audit`, `repair`, and `overwrite`; `catalog --offline` is a
  usage error with exit `2`, and `overwrite --offline` completes its repair and deletion work before
  recording the skipped catalog step. Every machine-readable verb result carries `provenance`; the
  `UpstreamOptions.guides` field becomes the `repository` field, and
  `ORKESTREL_SCAFFOLD_REPOSITORY` configures its base. Adding `ManifestEntry.digest` invalidates a
  host root staged by an earlier release, so rebuild that root. At their defaults, online runs
  contact `registry.npmjs.org` for scoped packuments and the `/-/org/orkestrel/package` membership
  path, and
  `raw.githubusercontent.com` for guides, `host.json`, and changed vendored paths.
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
- **fleet**: the vendored `tests/config.test.ts` assertion that reddens a publishing target
  lacking `"prepack": "npm run build"` lands in the release wave's first round. The line itself
  is declared in every publishing manifest, `blueprintToScripts` emits it at birth, and the
  scaffold guide states the publish-time-only intent with the `--ignore-scripts` interplay
  (all landed 2026-08-21).
- **test**: transcribe the guide fences a Node `guides` project cannot run — the `contrast`,
  `readRing`, and journal fences need a browser-capable guides project, and the wait fence's
  child-exit half belongs with the expensive proofs; the pre-existing fences remain
  untranscribed standing debt. The transcription idiom exists in `tests/guides.test.ts`.
- **test**: delete the counts remaining in guide sections the 0.0.8 narrative unit did not own —
  the Threat model's refusal tally, the contract rules' limit tallies, the Voices trailer, and
  the server-factories parallel-instance figure — per the no-count law, keeping fence-derived
  values and stated limits.
- **middleware, browser, router, process, probe**, after `@orkestrel/test` 0.0.8 publishes:
  convert the attempt-counted poll loops in middleware and browser and the outlast-then-assert
  waits to `waitForCondition`; take router's sequencing site as a judgment conversion that
  preserves the write-before-destroy ordering; replace the proven local copies in process
  `tests/setup.ts` and probe with the published helper. A settling wait before a negative
  assertion stays a fixed `waitForDelay`, because a poll cannot prove absence. (was B21c)
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
