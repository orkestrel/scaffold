# H3 fix round — the honest watermark law and the shared catalog engine

Successor to `h3-brief.md` + `-2` + `-3`. Carries both audit lanes' retained findings
(`h3-analyst-verdict.md` = tmp/codex/h3-audit-last.md, reviewer report in the campaign record)
and one Orchestrator design ruling. Claims 2 and 5 are CONFIRMED by both lanes and closed.

## The design ruling (binding; overrules the reconciled design's no-skip wording)

Sol reproduced the violation: release of an unseen run mid-traversal moves its `updated` above
the watermark and the continuation skips it. A single mutable catalog row cannot satisfy the
ruled no-skip. RULED: the catalog stays a mutable operational index (no versioning); the
invariant is restated honestly — an UNCHANGED traversal never duplicates or skips; a record
mutated above the watermark leaves that traversal and reappears atop a fresh first page;
membership follows the mutation. Scope the promise to one store instance's serialized reads
(instances can share a database — leases exist for that — and a sibling instance's writes may
surface mid-traversal; state it). Catalog order rides the instants the supervisor stamps; a
skewed instant skews order (state it; do not clamp).

## Role and engine

`implementer` route, engine **GPT-5.6 Sol** (the store engine's arithmetic and contract prose),
resumed on the H3 thread. Sole serial writer from clean committed baseline **c0ab2fe**. Perform
directly, spawn nothing, no commits/pushes/installs. The closing auditor will be the Opus
reviewer (the engine that did not write).

## Fix items

1. **The honest law lands everywhere it speaks** (the ruling above): `RunCursor`/`RunPage`
   TSDoc in `src/core/types.ts`, the `list` member's remarks, and the traversal proofs — the
   mutation test now asserts the honest behavior both ways (the released-mid-traversal record
   is absent from the continuation AND present atop a fresh first page; same for
   reacquired-mid-traversal leaving a `released: true` traversal). Add the instance-scope and
   instant-provenance sentences where the contract speaks.
2. **`released: false` becomes the complementary filter** (reviewer R1): `true` selects records
   with `released`, `false` selects records without it, absence selects both — one sentence
   stating all three; validators/parsers/helpers/proofs follow.
3. **Shared non-empty-id validation** (Sol claim 3): both stores refuse an empty run id with the
   SAME `STORE` failure before any mutation; proved on both backends.
4. **One catalog engine** (reviewer R2): the ordering-instant ratchet and the watermark/`until`
   derivation become pure exported tested leaves in `src/core/helpers.ts` (deterministic
   `compute*` naming), called by both stores; the duplicated cursor-absent branch folds; the
   double default-limit application settles in the same rework (one home for the policy).
5. **Catalog error factories** (reviewer R3): the invalid-options condition and the
   missing/invalid-catalog-record condition move to `src/core/errors.ts` as `create*Error`
   factories used by both stores — one message per fault regardless of backend.
6. **The page projection renamed** (Sol claim 4): `createRunPage` leaves the `create*` factory
   form; name it as the projection it is (Sol's shape: `recordsToRunPage`; pick within
   `names.md` and record) and update consumers.
7. **The decorative recovery step dies** (reviewer F1): `RecordingSupervisorStore.list`
   delegates plainly like its siblings; `RecoveryStep` returns to its four proved boundaries.
   H4 adds a `list` boundary with the proof that observes it.
8. **Small truths**: `MemorySupervisorStore.list` documents its `@throws` like its sibling; the
   `runs`-filter naming stays as ruled (recorded for H4's review, not churned here).

## Scope

**Owned:** everything H3 owned (`src/core/**` per the original brief, the two granted fixture
files, the mirrored tests). **Off-limits:** unchanged from the original — `app/**` beyond the
granted fixtures, `guides/**` (report the parity delta change if the export set moves),
vendored files, `configs/**`, `package.json`. Forbidden: the standing list.

## Acceptance criteria

1. The reproduced skip interleaving now passes as the HONEST assertion on both stores (the
   record leaves the traversal, reappears atop a fresh page); no unchanged-traversal
   duplicate/skip is possible — the matrix extends to cover the reacquire-leaves-history case.
2. `released: false` filters to held records only, proved with the other filters composing.
3. Empty-id acquire fails identically (`STORE`) on both backends before mutation.
4. One ratchet/watermark implementation, exported and leaf-tested; one error text per fault;
   the projection renamed; the recovery union restored to four.
5. `npm run test:src:core` and the catalog integration file green in your sandbox; static gates
   green; report the guides-parity delta exactly. (The Orchestrator re-runs the full native
   chain as acceptance.)

## Deviation contract

Stop and report if the honest law surfaces a case the design ruling above does not decide, or
if the engine extraction cannot keep both stores byte-identical in behavior over the matrix.
Ancillary naming within the rules is yours, recorded.

## Output

Touched files + diffstat; the full `types.ts` prose diff; per-criterion proofs with commands
and tails; the exact parity delta; `git status --porcelain`; deviations or none.
