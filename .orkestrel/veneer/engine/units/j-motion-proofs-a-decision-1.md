# J-MOTION-PROOFS-A — decision sent in flight (2026-09-25)

The styles session ruled D50 after this unit was dispatched (scaffold `35ed572a`; `.orkestrel/veneer/units/decisions-round-2.md` § D50). Its E-ID-MOTION-FADE round 2 adds `sampleTransition` to `tests/setupBrowser.ts`: one export, which reads one element's running transition for a property. D50 also records that no transition starts at `--vn-factor-motion: 0`.

This file records the decision sent to the unit by message. The brief `units/j-motion-proofs-a-brief.md` stays unedited.
- A reusable helper the unit returns as a report-only patch for `tests/setupBrowser.ts` must not duplicate `sampleTransition`'s job.
- Where a proof needs that reading, the unit keeps a local reading in the owned test file. Its report names each site that switches to `sampleTransition` after the styles unit lands.
- A helper with a different job, such as waiting until every moved element has settled, stays the unit's to return.
- The rest of the brief stands.
