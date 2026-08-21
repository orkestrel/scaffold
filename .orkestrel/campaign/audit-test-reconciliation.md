# Test-chain audit round — reconciliation, 2026-08-21

Lanes: analyst (Sol, executed; `audit-test-analyst-report.md`) FAIL — claims 1, 5, 11, 14
broken. Reviewer (Opus, read-only, diff supplied; report captured in the session task
record) FAIL — claims 5, 11 broken, findings F1-F5, one referral.

## Per-claim ruling

- 2, 3, 4, 6, 7, 8, 9, 10, 12, 13: CONFIRMED (both lanes, independent evidence). The
  reviewer's bounds are recorded with the round: no host pins every `createLink` branch (the
  split the guide declares), the wait-family default numbers are correct in source and
  unguarded, and claim 5's sea-style enumeration bounds carry no fix.
- 1: **CONFIRMED with a convergent instrument gap.** The structure is exact (reviewer,
  member for member); the original-`EPERM`-identity property is unpinned — the file-source
  proof asserts `toThrow(Error)` only (both lanes). Fix: assert the identity. → TA-fix.
- 5: **BROKEN — the reviewer's ruling adopted.** `destroyScratch` names no codes and retries
  every fault to budget exhaustion; the analyst prescribed classifying, but the package's own
  suite (`helpers.test.ts:810-845`) deliberately holds an allocation with a permission
  refusal that later lifts, so narrowing would break the case the helper exists for. The
  incoherence is that `removeTree` classifies and `destroyScratch` does not, and neither
  TSDoc names the other's policy. Fix: state the deliberate wider policy and the residual
  (a non-transient fault costs the budget, then wraps with the refusal as cause). The
  brief's claim overstated the TSDoc; recorded as a brief defect. → TA-fix.
- 11: **BROKEN, both halves.** (a) The guide's `destroy()` paragraph sends the reader to
  `destroyScratch` for the one case `destroy()` already covers through `removeTree`'s
  bounded retry, and never names the case `destroyScratch` exists for — a hold that
  outlasts that second. (b) The strictness sentence claims a translucent stack is refused
  with `floor` omitted; it is not — that gap is reviewer F2's code fix, which makes the
  sentence true. The analyst's population half (`performance.now()` is backticked and not a
  package export) is a brief defect: the parity suite's population is package-API
  references, per `.claude/rules/documentation.md`; no product change. → TA-fix for the
  two sentences.
- 14: **CONFIRMED — the analyst's two hits ruled non-breaking.** `guides/test.md:910` and
  `:913` cite the supervisor package as survey evidence in the Limits table, the idiom every
  other Limits row uses for its demanding packages; nothing importable carries the name and
  `files` does not ship `guides/`. The brief's claim was over-broad; recorded.

## Findings ruled

- Reviewer F1 (`readName` returns an image's empty `alt` unconditionally, against its own
  documented chain and HTML-AAM; `<img title>` yields `''`): fix as prescribed — fall
  through on empty `alt`, add the `<img title>` case. → TA-fix.
- Reviewer F2 (floor-omitted `contrast` measures a translucent-only stack onto the assumed
  canvas; the guide's rationale argues the opposite boundary): fix as prescribed — the
  backdrop walk reports opaque termination; `floor` omitted refuses when the walk never
  terminated on an opaque layer. Bounds: a translucent stack reaching an opaque ancestor
  keeps measuring; a supplied floor keeps compositing in both cases. → TA-fix.
- Reviewer F3 (`FOCUSABLE_SELECTOR` published while `traverseAccessible` keeps a divergent
  inline literal missing `area[href]` and `summary`): route the traversal through the
  constant; the cap arithmetic stays. → TA-fix.
- Reviewer F4 (`WaitOptions` property TSDoc ships `1000`/`10` defaults that `destroyScratch`
  does not honour): the default numbers move off the shared type onto each consuming
  function's `@remarks`; member meanings stay on the type. → TA-fix.
- Reviewer F5 (server-entry signatures name `WaitOptions`, which that entry does not
  export): one Server-section sentence naming the core import; no server re-export. → TA-fix.
- Reviewer referral (recreated lockfile): settled by the Orchestrator —
  `package-lock.json` resolves `@orkestrel/scaffold` 0.0.46, `@microsoft/api-extractor`
  7.58.13, `vite` 8.2.2 against manifest ranges `^0.0.46`, `^7.58.13`, `~8.2.2`
  (2026-08-21).

## Fix round

One unit, **TA-fix**, Opus `implementer` (native, sole writer in the test checkout; the
browser fixes are design-bearing shape work). Audited afterwards by Sol. Failing-first
required for the two behaviour changes (the `<img title>` case and the floor-omitted
translucent refusal) and the `EPERM`-identity pin.
