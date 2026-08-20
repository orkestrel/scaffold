# ROADMAP

The plan of record after the current-pins release wave (closed 43/43, 2026-08-18: every fleet
package published at latest `@orkestrel` pins, proven by gates and the material-dist rule).
This file owns everything still open. Campaign detail is recoverable from git history by hash;
no campaign folder is the plan of record.

## 1. Git reconciliation — CLOSED 2026-08-18

The session's git proxy lost its write lease mid-campaign; releases published from proven local
trees while source queued locally, preserved meanwhile as verified patches on
`rescue/proxy-outage-2026-08-17` and as partial API commits. The lease returned and every repo
was reconciled: `main` and `claude/orkestrel-fleet-orchestration-b0t5cy` in all eight affected
repos (scaffold, worker, workflow, brief, program, agent, ollama, toolbox) were force-updated to
the pristine local commits, which superseded every partial API replica. Verified: remote `main`
sha equals local HEAD sha in each, with zero file differences and clean trees. The remaining
43 fleet repos were already current.

Nothing is outstanding. `rescue/proxy-outage-2026-08-17` on scaffold is now redundant — its
patches all landed in the reconciled history. Deleting it needs operator credentials: the proxy
serves writes to existing refs but still refuses ref deletion, so it joins the branch cleanup in
section 2.

## 2. User decisions, open

- **Prepack** (was D6/B3): no fleet package declares `prepack`, so `npm pack` from a stale tree
  ships stale `dist`. Decide once, fleet-wide: add `prepack` or accept the risk.
- **Branch cleanup** (was D8): run `.orkestrel/fleet/branch-cleanup.sh` with operator
  credentials (the proxy refuses ref deletions). Include relation's ported
  `claude/database-package-audit-6r4hsd` branch, whose hardening shipped in relation 0.0.9.

## 3. Package work, scheduled by each package's next natural release

- **scaffold**: add `form` to the vendored mirror inventory so `overwrite` vendors
  `guides/form.md` into consumers that declare it (toolbox first); re-run overwrite there after.
  (was B22)
- **scaffold**: regenerate the package table with `scaffold catalog` so the `form` and `table`
  rows land in it. (was B8)
- **scaffold policy**: move the nested-function body law into `configs/policy.ts` as a third
  plugin rule. The rule set carries the two that shipped; this one stayed a candidate.
- **scaffold rules**: rule on the interned-class canon — `agent`'s barrelled `Channel` vs
  `middleware`'s interned `MultipartParser` are the same species with opposite rulings; land the
  rule in `architecture.md` and correct the losing package. (was B2)
- **toolbox**: add proofs for `promptToolShape`/`answerToolShape` in
  `tests/src/core/shapers.test.ts`, or correct the guide sentence claiming every advertised
  shape is covered. (was B23)
- **test**: publish `waitForCondition` — poll a named condition inside a budget measured with
  `performance.now()`, accepting a synchronous or asynchronous condition, rejecting once the budget
  elapses. `@orkestrel/process` carries a proven local copy at `tests/setup.ts` and `probe` needs the
  same. Deferred deliberately: the user ruled it in for a later pass, and the local copy serves both
  packages meanwhile. A `test` bump is development-only and cascades to nobody.
- **test**: correct the guide's population prose to the counted figures — `createRecorder`
  32/43 packages, `createScratch` 40/43, `waitForDelay` 16/43, fences 44/44. (was B4/B21a)
- **mcp**: delete the local generic `createTeardown<T>` at `tests/setupServer.ts:459` in favor
  of the `@orkestrel/test` import. (was B21b)
- **middleware, browser, workflow, queue, router, agent**: replace inline `setTimeout` waits
  with `waitForDelay` — middleware ×10 sites (does not import it), browser ×4, the rest ×1
  each. (was B21c)
- **middleware**: move `MultipartParser.ts` from the environment root into a domain folder.
  (was B5)
- **program, brief**: read-once ownership at guarded doors — clone → guard → seal → refuse, so
  a per-read getter cannot defeat containment. (was B18)
- **program**: route the three raw `validate`-path dereferences in `helpers.ts` through the
  published `isQualificationValidationResult`/`isReasonValidationResult` guards. (was B19)
- **probe**: the rows its 0.0.1 campaign recorded and deliberately left outside its exit criterion.
  Graded MEDIUM and excluded from campaign close: the coordinator deadline does not bound synchronous
  stage work, measured at a 1783 ms stall on a caller-named tree-wide project; a missing test
  directory or a write failure rejects `prove` as a bare `Error` rather than an `origin: 'instrument'`
  finding. Needing a design round: an unrelated `Control`, carrying independent `files` and `test`,
  still earns a receipt. Unproven, each needing a probe nobody ran: whether a failed re-warm past the
  64-specification bound leaves the runtime stage permanently rejected; whether a candidate shadowing
  an on-disk file makes the type and runtime stages disagree about the text; whether
  `experimental.fsModuleCache` can serve a disk-derived transform for a covered path. Unmeasured on
  Windows: the signal-kill orphan sweep, the orphaned lint child, `ENAMETOOLONG`, and the `SIGKILL`
  fallback. Deferred test-helper debt: `resolveRoot` through `tests/setup.ts`, and `createTeardown` at
  29 `finally` blocks. Routed to a successor and never scheduled: the generated specification's
  `import.meta.url` carrying the revision suffix, and bounding `destroy()` against a language server
  that accepts stdin and never answers `initialize`.
- **mcp**: `createProbeServer(probe).stop()` never returns, because the stdin `data` listener stays
  attached. The fix site is `@orkestrel/mcp`, not `probe`, and `probe` grades it a release blocker.
  Closing it means an `mcp` bump plus a `probe` test asserting `stop()` leaves
  `process.stdin.listenerCount('data')` at zero.
- **mcp**: `guides/mcp.md` near line 4187 still describes the pre-0.0.2 `node:child_process`
  transport. Refresh it on mcp's next documentation pass.
- **sea**: `SEAOptions` exposes no `timeout`, so `runShell` cannot bound a signing tool whose
  descendants inherit stdio. Recorded as a successor unit during process's 0.0.3 adoption.
- **contract**: `isContractError` fails across an ESM and CJS copy boundary the same way
  `isProcessError` did. `@orkestrel/process` 0.0.4 fixes its own with a `Symbol.for` brand read
  through `getOwnPropertyDescriptor`; `contract` owns the general mechanism and has not taken it.
- **supervisor**: re-pin mcp to `^0.0.19` and sea to `^0.0.9` on its next dependency pass. Section 6
  covers why nothing else touches that repository.
- **process**: two rulings recorded and never scheduled — the `bytes` and `write` surface synthesis
  ruled for `ProcessInterface`, and bare-`\r` handling in `lines`.
- **qualifier**: design round on `Premise` — every member is optional so `isPremise` accepts
  `{}`; decide whether `met`/`field` become required. (was B20)

## 4. Design and research records

- **settings vendoring**: decide whether `.claude/settings.json` vendors for existence rather
  than bytes; today `repair` restores vendored bytes and operator grants live in
  `settings.local.json`. (was B12)
- **Order gating**: the 11-row ungated-orders survey recorded at brief's acceptance reopens
  when hardening scaffold's order gating. (was B13)
- **`agents/openai.yaml`**: research the full external schema when a consumer needs more than
  the three-key mapping. (was B14)
- **w3 acceptance**: re-prove or strike what w3 shipped; the real-tree red proof was blocked by
  a read-only `.agents` policy in that harness. (was B15)
- **Banning the `object` type**: state the invariant in the canon first, or drop the candidate.
  Banning it today imports a policy the canon does not carry.
- **Sweeps with no honest mechanical form**: the template-TODO sweep, the model-routing and
  version-catalog sweep, and the strict skill-directory inventory each red healthy references in
  every mechanical form tried. They stay review-owned until one exists that does not.
- **The in-memory probe mechanism** — typecheck, lint, and execution in one call with no
  `tmp/probe/` opt-out — shipped as `@orkestrel/probe`. Closed by the package, not by a scaffold
  change.

## 5. What the next host release owes each target

The anti-slop, style, and skills audits landed in this repository's rules, policy plugin, and
vendored host. None of it has reached a target: no target's violation counts were taken, and the
bump, publish, re-pin, `repair`, and gate wave has not run.

- Take each target's violation counts **before** the wave, so the wave has a baseline to move.
- Sweep every target for skill and bridge members outside the vendored set; that population is
  unmeasured, and `repair` does not remove what the plan never owned.
- `.agents/orchestration.md` § The release wave owns the procedure. Read the publish order from
  the catalog table, regenerated, rather than from any written copy.

## 6. supervisor — user-owned, untouched by this plan

The supervisor repo, its 2,342-line in-repo roadmap (promote-the-mechanism campaign: extractions
into contract/terminal/sse/middleware/sea, new packages `human` and `live`), its
`rescue/pre-revert-app-server-work` branch, and its divergent mirrors await the user's own
triage before any overwrite touches it. (was B6/B7)
