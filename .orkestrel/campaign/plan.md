# Campaign — close the ROADMAP package rows

Started 2026-08-24. User instruction: address every orkestrel package issue in `ROADMAP.md`;
supervisor rows are excluded (application, not a package). The mcp half of the shared
mcp/supervisor row stays in scope.

## Exit criterion

Every non-supervisor row in `ROADMAP.md` § 1 ends implemented, repaired, retained with a recorded
ruling, or excluded on evidence. Scaffold-surface changes that oblige a publish are landed on
`main` with the obligation recorded; publishing stays with the user.

## Bench liveness (recorded at session start, 2026-08-24)

- Cursor Grok: LIVE — `agent` 2026.08.11-e8db854 round-tripped "live" (journal
  `tmp/cursor/probe.log`).
- Codex Sol: LIVE — MCP round trip returned "live" (thread
  `01a0339b-ffcf-7e42-ba2e-6909d9a47db1`).

## Routing ledger

| Unit | Subject | Role | Engine |
| --- | --- | --- | --- |
| M-fleet-sweep | fleet skill/bridge membership vs vendored manifest | orchestrator script | deterministic |
| M-sites | conversion/timing/guide/directional sites | orchestrator lookups | — |
| G-scaffold-seams | distribution proof, config template, factory emission, seeds | grok | Cursor Grok |
| G-probe-flow | prove flow: deadline, refusals, control, destroy, #issue | grok | Cursor Grok |
| G-probe-stages | re-warm bound, shadowing, fsModuleCache, realpathSync, revision | grok | Cursor Grok |
| G-probe-tests | createTeardown/resolveRoot/LintStage helper, wait-loop map | grok | Cursor Grok |
| G-mcp-delivery | ProcessOptions.delivery semantics + mcp stdin sites | grok | Cursor Grok |
| G-brief-doors | brief read-once remaining doors | grok | Cursor Grok |
| G-test-fences | untranscribed guide fences + counts | grok | Cursor Grok |
| D1-subjective | small-unit rulings (Channel, html timing, router, process, middleware) | planner | Opus 5 |
| D1-objective | same brief, objective lane | analyst | GPT-5.6 Sol (journaled exec) |
| D2 | scaffold seams + probe design items (after G lanes) | planner + analyst | Opus 5 + Sol |
| I-* | implementation units, serial per repo | sol / implementer / builder | per unit at briefing |
| A-* | audit rounds | analyst / reviewer / checker | non-writing engine per unit |
| V-* | authoritative gates per repo | verifier | native |

## Measurements already closed

- Fleet sweep: zero members outside the vendored manifest across every target under
  `/home/user/orkestrel` (script `fleetsweep2.sh`, plant-checked). The fleet row's population is
  measured and empty.
- middleware `tests/src/server/helpers.test.ts`: attempt loops at 1057, 1105, 1129.
- process `tests/src/server/ProcessManager.test.ts`: win32 poll ~182; marker outlast window ~232
  before a negative assertion.
- router `tests/src/server/helpers.test.ts`: settling waits at 366, 433, 442 ahead of
  destroy-ordered reads.
- scaffold `src/core/templates.ts`: banned-sense directional comments at 654 and 678 inside
  emitted config templates; 836 is a permitted comparative.
- html `tests/src/core/helpers.test.ts` 122+ and `tests/src/core/parsers.test.ts`: wall-clock
  budget assertions.

## Deviations

- 2026-08-24: seven concurrent grok lanes starved the Cursor bench — one lane (g-mcp-delivery)
  answered, the rest closed their bounded windows with empty journals while the bench itself
  answered a liveness probe. Not a dark bench. Relaunched the six unanswered lanes as two serial
  harness-tracked chains (chain-a.sh, chain-b.sh), 600 s cap per lane, using the inline-brief
  invocation form the succeeding lane used. Lesson: bound grok concurrency at about two.

## Unit status

- U1 (agent Channel): implemented by Sol; red proof recorded (the two new tests failed before the
  fix; the suite passes complete after it); check and suite green; audit dispatched.
- U3 (router waits): implemented by Sol; the exec sandbox denied loopback listeners so the writer
  could not run the suite — deviation reported correctly, and the brief's failure to name that
  documented bench limit is the Orchestrator's recorded miss; host run green (27 passed); audit
  dispatched.
- U2a (html bench script): builder deviation — `scaffold overwrite` does not refresh a target's
  script set, and `scaffold audit` does not report script drift (verified 2026-08-24 in html:
  audit reports only an uncovered `tests/setup.ts` and a typescript major note). html's script set
  is birth-cohort stale (`test:probe` and `test:bench` absent). The systemic gap routes to the D2
  scaffold family beside the prepack-assertion row; html's materialization mechanism is decided
  there. The overwrite side effects (guide ^0.0.13 re-pin, two mirror refreshes) stand in html's
  tree pending integration; the lock still needs syncing for the re-pin.
- New finding (html, carried): `tests/setup.ts` exists with no `tests/setup.test.ts` proof —
  `scaffold audit` reports it; belongs to html's next release alongside U2b or as its own unit.
- U4 (process): landed 3c4ec64 after a PASS audit; host run authoritative (bench denies child
  spawning).
- U5 (middleware): landed 6996b31; Sol audit's letter finding adopted verbatim.
- U7 (test guide counts): landed c6865c9; the Sol audit's findings were reconciled — the
  uniqueness-claim finding dropped on the record, the rest applied verbatim with members verified
  against the pinning test.
- Carried finding (test): `guides/test.md` carries a directional `below` near the Threat model
  cross-reference — the writing rule replaces it with `later`; belongs to a test-package sweep at
  its next release, not to the counts unit.
- MCP chain (mcp): landed 417e3a5, b2fd6c4, e174fde — delivery option, `DEFAULT_MCP_DELIVERY`
  10000 ms, voice split, omitted-default pin, guide rows. Audit findings adopted verbatim with an
  executed omitted-default pin upgrade; pushed.
- T chain (test): landed 6f34f44, fe3fa7b, 2c3da13 — contrast/readRing/journal carriers with
  guide markers, `wait` cleanup-on-delivery arm, placement-rule comment, presence guard. Audit
  overclaim fixed; pushed.
- B chain (brief): landed 2fdfea4, a073157, fbe3bf6 — `captureValue` cloner, clone-else-capture
  `#own`, seal-live removed, `deriveTask` one-descriptor capture, prose carriers. B3 audit's two
  prose findings fixed; getter literal annotations repaired directly (compiler-prescribed);
  pushed.
- SD0 (scaffold commonjs probe): the ROADMAP row's two vectors already pass on head; the silent
  drop vector is real — re-baselined SD1's brief from the probe.
- SD1 (scaffold classifiers): landed f9deb6e after a deviation stop granted
  `templates.test.ts` (the file pinned the reversed behavior); audit PASS; flip ledger recorded;
  pushed.
- SD2 (scaffold script region + emitted prepack): landed 1b39fa0; audit PASS; host.json
  regenerated after the guide edit (stale digests briefly broke the CLI suite — brief omission
  recorded).
- PD1 (probe coordinator): landed 12809a9 after a cap-kill recovery
  (`codex exec resume 01a033f0-…`); audit ruled the expire-claim wording defective, code stands;
  host run 25/25.
- TH1 (html integration): PARKED on a critical deviation — the real
  `npx scaffold repair` (packed from 1b39fa0) BLOCKS the manifest group on absent planned scripts
  instead of appending, falsifying SD2's fixture pin; adoption commit f489720 landed; tarball
  installed with `package.json`/lock uncommitted; SD2-FIX brief staged
  (`tmp/units/sd2-fix-brief.md`) and queued behind SD4.
- G-SD7 (directional sense table): first launch starved its bounded window; relaunched as an
  Orchestrator-tracked command and returned complete — retained as
  `.orkestrel/campaign/g-sd7-directional.md`. OTHER-classed rank senses ruled permitted; the
  DIRECTIONAL set feeds SD7's brief.
- Staged briefs (2026-08-24): sd2-fix, sd3-prepack-assertion, sd5-seed-pin, sd7-directional,
  pd3-overlay-serve, pd4-identical-control, pd5-issue-party, w1-workspace-root, w2-setup-family,
  w3-teardown, pd6-guide, u2b-html-split — all under `tmp/units/`.

## Returned evidence

- g-probe-tests (complete): `createTeardown` has zero adoption in probe — every `finally` is a
  hand-rolled destroy/rm/kill sequence across the bin, config, stage, server, core, policy, and
  guides suites. `tests/setup.ts` is an empty file wired into every Vitest project
  (`vite.config.ts` 46, 97, 134, 153, 168, 187, 202, 224); `tests/setupServer.ts` exists with no
  process-ending helper, imported once (`RuntimeStage.test.ts:27`); no `setup` project, script, or
  `tests/setup*.test.ts` proof exists. No `resolveRoot`: `main.test.ts:14`,
  `ProbeServer.test.ts:10`, `Probe.test.ts:14`, `helpers.test.ts:34`, `errors.test.ts:16`,
  `RuntimeStage.test.ts:29`, `TypeStage.test.ts:11`, `LintStage.test.ts:10`, `guides.test.ts:11`
  hand-compute the root and `config.test.ts:27`, `distribution.test.ts:26` compute it differently.
  Wait loops: poll loops that convert — `main.test.ts:63-70,76-83`,
  `LintStage.test.ts:152-158,368-371`, `RuntimeStage.test.ts:971-972,1274-1280`,
  `Probe.test.ts:826-833`; settling waits that stay — `LintStage.test.ts:344,828,939`; the rest are
  single-use yields that are neither. Local process helpers: `LintStage.test.ts:144-236`
  (`readFixtureServer`, `killFixtureServer`, `waitForFixtureServer`, `readHostEnding`,
  `readInputRefusal`, `isProcessLive`), `main.test.ts:91-102` (`readSignalEnding`).
- g-mcp-delivery (complete): mcp has one spawn/stdin-write site,
  `src/server/transports/StdioClientTransport.ts` — constructs `Process` at 137-146 with no
  `delivery`, so an unread full pipe leaves `send` pending forever; `send` failure collapses to one
  thrown `Error('stdio transport is not connected')` at 153-163. `ProcessOptions.delivery`
  (`process/src/core/types.ts:160-161`, `Process.ts:256-260`) bounds an unconfirmed write and
  settles it `false`. `StdioClientTransportOptions` (`mcp/src/server/transports/types.ts:371-375`)
  carries no `delivery` field today.

## SD6 census (2026-08-24, by script over 46 manifests)

The publishing targets missing `prepack` entirely: abort, budget, console, csv, database,
emitter, form, guide, html, indexeddb, interpret, markdown, msg, ndjson, ollama, pool, rater,
reason, relation, server, sqlite, sse, table, template, terminal, timeout, tool, websocket,
workspace. Every other swept manifest conforms (`npm run build`, or private without the script).
This falsifies the ROADMAP row's recorded 2026-08-22 verification that the line is declared in
every publishing manifest; the run is authoritative. Consequence: SD2's writable-set repair and
SD3's vendored assertion ship in one release, and each target's visit (re-pin, install, repair,
gates) lands the remedy before the gate reads it — the per-target order makes the fleet-wide red
switch safe within a single release.
