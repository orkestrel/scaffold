# Review of P1 (pool `3ff0c63`, shared leases), Opus 5.5 reviewer, 2026-10-05

Objective lane on the contract and accounting. Terminal: **FAIL**.

- Claim 1 (no change without `capacity`): REFUTED. Idle reuse moved from release order (`#available.shift()`) to creation order (`#select`, `Pool.ts:412-430`): with `max: 2`, release r2 then r1, and the next acquire returns r1 where it returned r2; unruled and untested. Fix: ties at zero leases go to the record earliest in `#available` (release order), creation order only among leased records; a test with `capacity` omitted. The idle-validation strike for a previously used record is a ruled change (the synthesis's R row); the claim's wording overstated it.
- Claim 2 (bound, selection, FIFO, cancellation): CONFIRMED.
- Claim 3 (one disposal, co-holder invalidation, one credit, inert later calls): CONFIRMED.
- Claim 4 (skipping validation on shared hand-outs): REFUTED as unstated. Above capacity 1 an occupied record is never revalidated; without `watch` a dead record keeps being handed to co-holders until it goes idle; with `watch` the exposure is the gap until it settles. Fix: state it in `guides/pool.md` and the `PoolOptions` remark.
- Claim 5 (idle-loss repair, epoch rule, no holderless reopening): CONFIRMED.
- Claim 6 (documentation): partly REFUTED. "Unique ownership" and "validated reuse" in the tagline (`guides/pool.md:3-4`), the README pitch, and the `createPool` summary and TSDoc are false above capacity 1. Fix: "exclusive by default", "validated idle reuse", source and guide matched.
- Claim 7 (tests): one REFUTED. "retains failed shared cleanup once without a refill credit" (`Pool.test.ts:249`) cannot fail on the credit half at `min: 1`; pin it at `min: 2, restarts: 0` or rename it.
- Claim 8 (ROADMAP item 1): facts CONFIRMED; the rewrite dropped the trigger "build it with the first consumer that releases at a size above 1", and the browse contexts consumer at `BROWSE_POOL` above 1 is that consumer (referred).
- Outside: `#select` scans every record per assignment (unmeasured, unlikely to matter at browse sizes); `isPoolMax` also validates `capacity` (name referred); the guide's "idle never-leased record" sentence is narrower than the truth after the repair.
