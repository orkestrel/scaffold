# ROADMAP

The plan of record after the current-pins release wave (closed 43/43, 2026-08-18: every fleet
package published at latest `@orkestrel` pins, proven by gates and the material-dist rule).
This file owns everything still open. Campaign detail is recoverable from git history by hash;
no campaign folder is the plan of record.

## 1. User decisions, open

- **Prepack** (was D6/B3): no fleet package declares `prepack`, so `npm pack` from a stale tree
  ships stale `dist`. Decide once, fleet-wide: add `prepack` or accept the risk.

## 2. Package work, scheduled by each package's next natural release

- **scaffold**: prove the anchor-swap interleaving on a Windows host.
  `tests/src/server/WriteTransaction.test.ts` skips its
  `discards a created segment whose anchor read refuses it` proof on win32 because `renameSync` is
  `MoveFileExW` with `MOVEFILE_REPLACE_EXISTING`, which rejects an existing directory destination
  and so kills the attacker's retry loop rather than the interleaving itself. The claim is
  unverified there, not inapplicable. Closing it needs a Windows host and an attacker that clears
  `holding` between attempts.
- **scaffold policy**: move the nested-function body law into `configs/policy.ts` as another
  plugin rule. The rule set carries the rules that shipped; this one stayed a candidate.
- **fleet**: sweep every target for skill and bridge members outside the vendored set; that
  population is unmeasured, and `repair` does not remove what the plan never owned.
- **scaffold rules**: rule on the interned-class canon — `agent`'s barrelled `Channel` vs
  `middleware`'s interned `MultipartParser` are the same species with opposite rulings; land the
  rule in `architecture.md` and correct the losing package. (was B2)
- **scaffold guide**: trim the passages that re-argue settled decisions on a documentation pass —
  the rationale essays beside the `Finding`-shape note ("The shape a `Finding` admits is wider…")
  and the creating-verb policy note ("The library does not enforce the creating verb's policy.").
  Recorded discretionary at the 0.0.45 readiness round (was SR12).
- **scaffold**: record in the vendored `.claude/agents/codex.md` that `codex exec resume` takes no
  `-C`; the file states only the flags a resume rejects. (from supervisor's 0.0.46 adoption)
- **scaffold guide**: add the blueprint `file:`-range note to `guides/scaffold.md`. (from
  supervisor's 0.0.46 adoption)
- **toolbox**: add proofs for `promptToolShape`/`answerToolShape` in
  `tests/src/core/shapers.test.ts`, or correct the guide sentence claiming every advertised
  shape is covered. (was B23)
- **test**: publish `waitForCondition` — poll a named condition inside a budget measured with
  `performance.now()`, accepting a synchronous or asynchronous condition, rejecting after the budget
  elapses. `@orkestrel/process` carries a proven local copy at `tests/setup.ts` and `probe` needs the
  same. Deferred deliberately: the user ruled it in for a later pass, and the local copy serves both
  packages meanwhile. A `test` bump is development-only and cascades to nobody.
- **test**: correct the guide's population prose to the figures a fresh count produces for
  `createRecorder`, `createScratch`, `waitForDelay`, and fences. (was B4/B21a)
- **mcp**: delete the local generic `createTeardown<T>` at `tests/setupServer.ts:459` in favor
  of the `@orkestrel/test` import. (was B21b)
- **middleware, browser, workflow, queue, router, agent**: replace every inline `setTimeout` wait
  with `waitForDelay`; middleware carries the most sites and does not import it yet.
  (was B21c)
- **middleware**: move `MultipartParser.ts` from the environment root into a domain folder.
  (was B5)
- **program, brief**: read-once ownership at guarded doors — clone → guard → seal → refuse, so
  a per-read getter cannot defeat containment. (was B18)
- **program**: route the raw `validate`-path dereferences in `helpers.ts` through the
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
  fallback. Deferred test-helper debt: `resolveRoot` through `tests/setup.ts`, and `createTeardown`
  across the `finally` blocks that duplicate it. Routed to a successor and never scheduled: the
  generated specification's `import.meta.url` carrying the revision suffix, and bounding
  `destroy()` against a language server that accepts stdin and never answers `initialize`.
- **probe**: land the `stop()` regression pin. The stdin detach shipped:
  `src/server/transports/StdioServerTransport.ts:130-132` in mcp 0.0.20 removes the `data`,
  `close`, and `error` listeners (verified 2026-08-21). The pin the finding prescribed never
  landed: a probe test asserting `stop()` returns and leaves
  `process.stdin.listenerCount('data')` at zero.
- **sea**: `SEAOptions` exposes no `timeout`, so `runShell` cannot bound a signing tool whose
  descendants inherit stdio. Recorded as a successor unit during process's 0.0.3 adoption.
- **contract**: `isContractError` fails across an ESM and CJS copy boundary the same way
  `isProcessError` did. `@orkestrel/process` 0.0.4 fixes its own with a `Symbol.for` brand read
  through `getOwnPropertyDescriptor`; `contract` owns the general mechanism and has not taken it.
- **process**: rulings recorded and never scheduled — the `bytes` and `write` surface synthesis
  ruled for `ProcessInterface`, and bare-`\r` handling in `lines`.
- **process**: surface stdin-delivery failure. A stdin error is swallowed and `error` is emitted
  for the child alone, so a child that closes stdin and stays alive (an `EPIPE` on the prompt
  write) fails through the consumer's own timeout instead of a fast `PROTOCOL`. Found through
  supervisor's `CLIProvider` inference path, which keeps the timeout as its backstop until this
  lands.
- **qualifier**: design round on `Premise` — every member is optional so `isPremise` accepts
  `{}`; decide whether `met`/`field` become required. (was B20)

## 3. Design and research records

- **A mirrored guide tracks a branch, not a release.** `Upstream` fetches guides from
  `raw.githubusercontent.com` and versions from `registry.npmjs.org`, so `scaffold catalog` mirrors
  each dependency's default branch while the catalog table names its published version. A mirror can
  therefore document a surface no consumer can install: refreshing after `@orkestrel/process` merged
  its 0.0.4 work brought `snapshotCommand`, `PROCESS_ERROR_CODES`, and `ProcessChild.off` into this
  repository's copy while the registry still served 0.0.3 (that instance closed when 0.0.4
  published, read 2026-08-21; the mechanism is unchanged). Decide whether a mirror must track the
  published release. Until it does, publish a dependency before publishing the package that mirrors
  it, so the mirror is true when it ships.

- **settings vendoring**: decide whether `.claude/settings.json` vendors for existence rather
  than bytes; `repair` restores vendored bytes and operator grants live in
  `settings.local.json`. (was B12)
- **Order gating**: the ungated-orders survey recorded at brief's acceptance reopens
  when hardening scaffold's order gating. (was B13)
- **`agents/openai.yaml`**: research the full external schema when a consumer needs more than
  the `display_name`, `short_description`, and `default_prompt` mapping. (was B14)
- **w3 acceptance**: re-prove or strike what w3 shipped; the real-tree red proof was blocked by
  a read-only `.agents` policy in that harness. (was B15)
- **Banning the `object` type**: state the invariant in the canon first, or drop the candidate.
  Banning it imports a policy the canon does not carry.
- **Sweeps with no honest mechanical form**: the template-TODO sweep, the model-routing and
  version-catalog sweep, and the strict skill-directory inventory each red healthy references in
  every mechanical form tried. They stay review-owned until one exists that does not.
