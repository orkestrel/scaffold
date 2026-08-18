# ROADMAP

The plan of record after the current-pins release wave (closed 43/43, 2026-08-18: every fleet
package published at latest `@orkestrel` pins, proven by gates and the material-dist rule).
Campaign detail lives in `.orkestrel/fleet/`; this file owns everything still open.

## 1. Git reconciliation after the proxy outage

The session's git proxy lost its write lease mid-campaign; releases published from proven local
trees and source was preserved as verified patches on `rescue/proxy-outage-2026-08-17` plus
API-pushed main commits. Because file bytes travel inline through tool calls, lockfiles
(~100KB dense JSON), the 479KB vendored `guides/contract.md` mirror, and any file past ~105KB
could not transit — those are deferred, and each regenerates mechanically.

Runbook, from any checkout with working credentials:

1. Per repo, compare main against the wave state: lockfiles regenerate with `npm install`;
   vendored mirrors (`guides/contract.md` and any other deferred mirror) regenerate with
   `npx scaffold overwrite` (or `repair`); nothing else should differ.
2. If the outage session's clones still exist, prefer their originals: force-with-lease each
   working branch, then fast-forward or force main to the original commits — they supersede
   every API commit as content supersets with pristine history.
3. Delete `rescue/proxy-outage-2026-08-17` only after every repo's main verifies against the
   wave state.

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
- **scaffold rules**: rule on the interned-class canon — `agent`'s barrelled `Channel` vs
  `middleware`'s interned `MultipartParser` are the same species with opposite rulings; land the
  rule in `architecture.md` and correct the losing package. (was B2)
- **toolbox**: add proofs for `promptToolShape`/`answerToolShape` in
  `tests/src/core/shapers.test.ts`, or correct the guide sentence claiming every advertised
  shape is covered. (was B23)
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

## 5. supervisor — user-owned, untouched by this plan

The supervisor repo, its 2,342-line in-repo roadmap (promote-the-mechanism campaign: extractions
into contract/terminal/sse/middleware/sea, new packages `human` and `live`), its
`rescue/pre-revert-app-server-work` branch, and its divergent mirrors await the user's own
triage before any overwrite touches it. (was B6/B7)
