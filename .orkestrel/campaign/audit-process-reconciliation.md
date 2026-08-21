# Process audit round — reconciliation, 2026-08-21

Lanes: analyst (Sol, executed probes; `tmp/codex/audit-process-analyst-last.md`), reviewer
(Opus, read-only, ruling from source plus the established runs; verdict in the session task
record). Both returned FAIL. Blind reports are immutable; this file is the ruling.

## Per-claim ruling

1. **CONFIRMED** (reviewer's structural evidence adopted): both fault doors funnel into one
   synchronous `#failInput` with an idempotence guard that runs before assignment; reentrancy
   and late-callback vectors held. The analyst's BROKEN answered a different question — whether
   a probe can force both orderings through the public API — and a claim is not broken by the
   difficulty of instrumenting it when the structure decides it.
2. **BROKEN**, convergent and executed: a large constructor `input` to a non-reading child that
   later exits emits a `protocol` error from the package's OWN write — the `input` write is
   unregistered, faults through the stream door while `#terminating` is false. Quiet closure is
   broken on the `end`-after-`input` path. Fix: an input-phase state — faults arising from the
   constructor-supplied `input`/`end` sequence are package-initiated and stay quiet (settle
   `send` semantics untouched); the executed vector becomes the pin.
3. **CONFIRMED**, with two proof additions carried: the delivery proof asserts
   `errors.count === 0`, and a companion case with `delivery` set and a READING child asserts
   the confirmed write's `true`.
4. **SPLIT**: 4a (unset `delivery` leaves `send` byte-identical) CONFIRMED (reviewer). 4b (a
   send issued after `stop` began resolves `false` where 0.0.4 resolved `true`) BROKEN as an
   undocumented divergence — RULED a deliberate narrowing, kept: a write accepted mid-teardown
   rides a pipe the package is about to destroy, so `true` would claim a delivery the teardown
   then discards; the honest answer is `false`. The fix documents it (TSDoc + guide) and pins
   it with a proof naming 0.0.4's prior behaviour as the divergence.
5. **BROKEN**, convergent: the flood adaptation's control comparison reads `signal` alone;
   `{ code: 143, signal: null }` vs `{ code: 1, signal: null }` passes wrongly. Fix: the
   reviewer's exact pair comparison.
6. **UNRESOLVED → carried as work**: the `execute` stdin-fault path has no executed proof
   (fourteen cases, none drives `inputFailure`). Fix: an executed case on this host driving a
   pending `input` write faulted by child exit, asserting `failed`, the `strict` rejection, and
   its `cause`; the POSIX fd-0 door stays recorded residue.
7. **CONFIRMED** (both).
8. **BROKEN**, convergent prose: the full-pipe appositive is false for writes smaller than the
   pipe buffer (state the size condition); the guide's fd-0 sentence is a universal where the
   TSDoc hedges (match the modality to the measurement). Fix: both sentences.
9. **CONFIRMED** (reviewer, against the published 0.0.4 declarations).
10. **BROKEN** (reviewer's half adopted): the input-fault door is a third way the run ends the
    child, unrepresented in prose — `types.ts:241-244` is byte-identical to 0.0.4 while
    `helpers.ts:733` and the guide moved to "ended on a host fault". RULED: no new
    `ExecuteResult` member without a consumer; the three homes state one rule naming the
    host-fault door, and the `failed`-with-no-flags residual is documented as that door's
    signature so a `strict: false` caller can interpret it.

Finding F1 (reviewer): the distribution proofs' `--ignore-scripts` suppresses the very
`prepack` the sweep added, so a STANDALONE distribution run still reads disk `dist`. Bounded
correctly: the gate chain's `prepublishOnly` builds first, so the chain is sound. RULED: the
flag stays (no double build in gates; scaffold's own proof set the precedent); each flagged
distribution proof gains a header sentence stating the tarball's provenance (the gate chain
builds before packing; a standalone run reads the artifact on disk). Carried to the release
integration sweep for brief, process, mcp, probe.

## Fix round

One unit (P4-fix, Sol implementer — the fix spans engine and proofs; audited after by Opus,
the engine that did not write the engine half), carrying items 2, 3-additions, 4b-document,
5, 6, 8, and 10. Constraints bounding over-correction: the input-phase quiet must not
suppress a HOST fault on a `writable: true` channel after the input phase ends; the pair
comparison must keep the POSIX escalation expectation intact; the enumeration fix adds no
result member.
