# J-MOTION-PROOFS-A round 4 — verdict (2026-09-25)

**Subject.** Round 4 changed only the plant instrument (`units/j-motion-proofs-a-brief-4.md`, `units/j-motion-proofs-a-report-4.md` as retained below). No source or test file changed, and the tree is clean at `180d513`.

**Lanes.** Not run. Round 3's claim 5 was about evidence: whether the plant exercises the whole ruling. The Orchestrator's own run of the plant closes that claim, and a lane over an unchanged tree has no code subject to audit. The writer's own reading is not taken as the evidence.

**The Orchestrator's run** (`units/j-motion-proofs-a-plant-4.log.txt`, `tools/replay-motion-proofs-a-4.sh`):
- **Round 4's planter:** the value probe and all four owned files pass under it (61, 62, 13, and 24 tests).
- **Control, round 3's planter:** the probe fails with an `AssertionError` on the responsive panel alone, while the four files still pass. The probe therefore tells a complete plant from the gap the audit found.
- The scratch copy is removed, and `src/styles` is unchanged.

The retained instruments are `units/j-motion-proofs-a-plant-4.py`, `-plant-4.sh`, and `-plant-probe-4.test.ts.txt`.

**Rulings.** Claim 5 is CONFIRMED. With round 3's claims 1 to 4, 6, and 7 confirmed, the unit closes:
- the Modal, Offcanvas, Backdrop, and Alert proofs pin no motion value and read the settled motion at each completion;
- `Modal` settles its live dialog and its host together;
- `readDuration` is the one duration reader.

It lands through `tools/w2-land-run.sh motion-proofs-a`. E5 excludes the third standing row.

VERDICT: PASS
