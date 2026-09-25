# J-PLACEMENT-141-FIX — the Orchestrator's ruling on the probe (2026-09-25)

**Subject.** J-PLACEMENT-141-PROBE-2 (`units/j-placement-141-probe-2.test.ts`, SHA-256 `2f07fa2765295955a17cf91e2d85577e14a0503417c20f1f77b3edd0b207b163`) read on both hosts, against the rule in `units/j-placement-141-fix-design-verdict.md`.

**The readings.**
- **Chromium 153** (`units/j-placement-141-probe-2-153-run-{1,2,3}.log.txt`): every variant anchors. The four failing verdicts in each run are the `missingAnchor` negative control, which is expected to fail.
- **Chromium 141.0.7390.37** (the styles session's `../units/native141/j-placement-141-probe-2-141-run-1.log.txt`, same SHA-256, `877e7c6` holding `d33b27c`'s engine):

  | Variant            | `candidate` rule                   | `always` rule                          |
  | ------------------ | ---------------------------------- | -------------------------------------- |
  | `baseline`         | not anchored, all four readings    | not anchored, all four readings        |
  | `tokenFirst`       | anchored, all four readings        | anchored, all four readings            |
  | `tokenFirstLayout` | anchored, all four readings        | anchored, all four readings            |
  | `deferAnchor`      | anchored, all four readings        | first show anchored by its rows; no verdict |

  The log ends inside `deferAnchor.always.full`, so it holds neither the last `deferAnchor.always` verdicts nor the `missingAnchor` control.

**The ruling: the deferred shape.** `deferAnchor` anchors on 141 under the `candidate` rule, which is the rule `position-visibility` ships. So under the design verdict's rule the deferred shape wins, because it keeps Bootstrap's order:
- A `Placement` option promotes the element at construction and installs anchoring at the first `update()` after the element renders.
- `Dropdown`'s order stays as it is.

Candidate A (`tokenFirst`) also anchors, but it reorders the show, which is a Bootstrap departure the deferred shape does not need.

**One condition before the fix unit's acceptance.** The styles session re-runs the same probe on 141 to completion. The run must hold:
- the four `deferAnchor.always` verdicts anchored;
- the four `missingAnchor` control verdicts failing.

If either reading differs, the seam returns to this ruling.

**Sequencing.** J-PLACEMENT-141-FIX writes the deferred shape after J-RELEASE-POPUPS lands, so it builds on E35's holdings in `Placement`. It is serialized with J-ORACLE-FIX-PLACEMENT, which shares `Placement.ts` and `Dropdown.ts`. Its brief carries the probe's `deferAnchor` preparation as the pattern. It also owns the Chromium 141 limit sentences that the E-ID-ANCHOR fix round writes on the styles side, because the fix makes them false.

**The condition is met (2026-09-25).** The styles session re-ran the same probe on Chromium 141.0.7390.37 twice (`../units/native141/j-placement-141-probe-2-141-run-2.log.txt` and `-run-3.log.txt`, SHA-256 `2f07fa27…`, 8 of 8 tests passed in each). In both runs:
- `deferAnchor` reads anchored on all four readings under each rule;
- `missingAnchor` reads failing on all four readings under each rule;
- `baseline` reads not anchored, and `tokenFirst`, `tokenFirstLayout`, and `display` read anchored.

VERDICT: PASS (the deferred shape, confirmed by two complete Chromium 141 runs)
