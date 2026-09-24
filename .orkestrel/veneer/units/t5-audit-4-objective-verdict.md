1. **CONFIRMED — Scope and gates.** The omitted-change attack failed: the live diff and status exactly match the retained artifacts. The modified paths are `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and `tests/src/browser/helpers.test.ts`.

   Under `/home/user/scaffold/.orkestrel/veneer/units/t5-instruments-4/`, I read the gate logs. Their terminal lines are `exit 0`: `t5-4-gate-format.log.txt:5`, `t5-4-gate-lint.log.txt:5`, `t5-4-gate-check.log.txt:21`, `t5-4-gate-file.log.txt:12`, and `t5-4-gate-browser.log.txt:50`. The `t5-4-gates.sh` script records each command’s status immediately afterward. This confirms the stated gates, not the deferred build, guide gate, or round-4 consumer runs.

2. **CONFIRMED — The leaf and its distinguishing cases hold.** The arithmetic at [helpers.ts:3259](/home/user/test-tf/src/browser/helpers.ts:3259) reads only its arguments and returns the declared offset. The caller at [helpers.ts:3593](/home/user/test-tf/src/browser/helpers.ts:3593) retains no duplicate arithmetic.

   Read-only Node execution of the source’s function body reproduced every reported input/result pair. A bounded sweep attacked negative positions, horizontal and vertical offsets, oversized boxes, fractional window sizes, and fractional clearance, including `1/64` pixel. It found no covered-origin result when a fitting box had spare width or height. The exact-window-sized residual remains legitimate: moving its top or left strictly beyond the origin would exceed the opposite window edge.

   The assertions distinguish the mutations. I read `t5-4-mut-noright.log.txt:10`, where the right offset becomes zero, and `t5-4-mut-wholenudge.log.txt:10`, where the fractional vertical offset becomes zero. Their expected values are independently written at [helpers.test.ts:3645](/home/user/test-tf/tests/src/browser/helpers.test.ts:3645) and [helpers.test.ts:3652](/home/user/test-tf/tests/src/browser/helpers.test.ts:3652). Deleting the right branch in the read-only arithmetic probe also broke its control. The `t5-4-green.log.txt:7` record supplies the passing browser evidence.

3. **BROKEN — The transformed-ancestor assumption is not the only uncovered case.** The ancestor walk at [helpers.ts:3567](/home/user/test-tf/src/browser/helpers.ts:3567) crosses only `parentElement` links. It stops at a shadow root without examining its host.

   A concrete source-derived counterexample is a viewport-fixed HTML host at `top:800px`, containing an open shadow root whose direct child is a static SVG root sized `100×100`. Put that host over a scrollable document and capture the SVG in an `844`-pixel pane. The SVG has no parent element; the walk assigns `null`, and [helpers.ts:3580](/home/user/test-tf/src/browser/helpers.ts:3580) consequently sets `scrolls` to true. Its bottom is `900`, so the code requests a document scroll of `56` pixels although that scroll cannot move the fixed host. No transformed ancestor is involved. The public element option admits this input.

   The ordinary SVG fixtures do distinguish their mutations. I read `t5-4-mut-htmlonly.log.txt:10` and `t5-4-mut-nofixedroot.log.txt:10`; each records scroll events where [helpers.test.ts:3530](/home/user/test-tf/tests/src/browser/helpers.test.ts:3530) requires none. The `htmlonly` mutation reproduces the round-3 decision for these fixtures.

   Cross the shadow boundary through its host when the ancestry decision requires it, and add the fixed-host SVG case. This counterexample is a source trace, not a fresh browser measurement.

4. **BROKEN — Calling the scroll restoration first does not guarantee that it succeeds before the offset disappears.** The synchronous order at [helpers.ts:3612](/home/user/test-tf/src/browser/helpers.ts:3612) is as claimed. The universal consequence is false when the staged viewport clamps the saved scroll.

   A concrete state is a margin-free document of height `1400`, with a `100`-pixel target at its beginning, an initial tester height of `844`, and saved scroll `100`. Capture the target with declared height `1400`. Staging clamps the scroll to zero. The nudge moves the target off the origin for the screenshot. Afterward, restoring scroll `100` still clamps to zero because the tester remains `1400` pixels tall. Removing the offset therefore returns the target to the origin. The awaited file read at [helpers.ts:3628](/home/user/test-tf/src/browser/helpers.ts:3628) leaves an asynchronous interval before pane release.

   The existing proof uses a document that leaves sufficient scroll range after staging. Its assertions distinguish the intended ordering mutation: I read `t5-4-mut-latescroll.log.txt:10` and `t5-4-red-return.log.txt:9`, which record `[true]` instead of an empty covered-origin list. The green and repeat logs establish success for that fixture.

   Coordinate pane release and offset removal when the saved scroll remains clamped; retain the attribute cleanup on every exit. Add the clamped-scroll state to the observer proof. The counterexample is source-derived; the retained logs do not exercise it.

5. **BROKEN — Width derivation holds, but the claimed width assertions are absent from some fixtures.** The named fixtures derive their declared width from the runner window. The fixed-panel and below-pane proofs explicitly compare the captured width with that value at [helpers.test.ts:3196](/home/user/test-tf/tests/src/browser/helpers.test.ts:3196) and [helpers.test.ts:3226](/home/user/test-tf/tests/src/browser/helpers.test.ts:3226).

   The scope proof at [helpers.test.ts:3328](/home/user/test-tf/tests/src/browser/helpers.test.ts:3328) asserts frame movement and attribute restoration. The no-attribute proof at [helpers.test.ts:3370](/home/user/test-tf/tests/src/browser/helpers.test.ts:3370) asserts attribute absence. Neither reads or asserts the captured width.

   Narrow the report’s assertion to the fixtures that actually check width, or add the missing width assertions. This is a proof-description defect; the width derivation itself repairs the earlier narrow-window counterexample. The retained offset and scope mutations distinguish their respective movement properties, not an unasserted image width.

6. **CONFIRMED — The retained mutations apply and distinguish the reported cases.** The stale-source and stale-test attacks failed. Every replacement applies uniquely in memory to the live helper source, which equals the retained final copy. The live test digest is:

   `13d1db06d41a8c4fd7fcff5f128fc9757ddfb4b2c13bbdccab031100d8494118`

   It matches `t5-4-digest.log.txt:2`; that log records the post-run check as `OK` and `check exit 0`. The runner at `t5-4-run.sh:21` uses the final test path, restores the helper source, and checks restoration.

   I read each following log under the instrument directory named in claim 1. Each corresponding mutation file resides in its `t5-4-mutations/` directory.

   | Mutation | Log evidence | Do the assertions distinguish it? |
   |---|---|---|
   | `noright` | `t5-4-mut-noright.log.txt:10` | Yes: right offset zero instead of one. |
   | `wholenudge` | `t5-4-mut-wholenudge.log.txt:10` | Yes: vertical offset zero instead of `0.5`. |
   | `nonudge` | `t5-4-mut-nonudge.log.txt:10` | Yes: pointer entries and incorrect leaf results. The ordering proof fails its observation-count control at line 29. |
   | `htmlonly` | `t5-4-mut-htmlonly.log.txt:10` | Yes: unexpected SVG scroll events. |
   | `nofixedroot` | `t5-4-mut-nofixedroot.log.txt:10` | Yes: unexpected SVG scroll events. |
   | `latescroll` | `t5-4-mut-latescroll.log.txt:10` | Yes: a covered-origin reading. |
   | `noscrollback` | `t5-4-mut-noscrollback.log.txt:10` | Yes: refusal-path scroll zero instead of `100`. |
   | `nooffset` | `t5-4-mut-nooffset.log.txt:10` | Yes: wrong floor colors, missing frame movement, and pointer entries. The ordering proof fails its observation-count control at line 89. |
   | `nocomposite` | `t5-4-mut-nocomposite.log.txt:10` | Yes: green document floor instead of blue panel floor. |
   | `widened` | `t5-4-mut-widened.log.txt:10` | Yes: the other frame acquires a negative top. |

   The observation-count failures are valid discrimination, but they are not covered-origin readings. The mutation evidence does not establish the broader guarantees broken under claims 3 and 4.

7. **CONFIRMED — The specified round-3 behavior is preserved outside the named changes.** Comparison with `t5-4-helpers-r3.ts.txt` found no additional implementation change. Read-only comparisons confirmed identical height-loop code at [helpers.ts:3536](/home/user/test-tf/src/browser/helpers.ts:3536), post-release restoration at [helpers.ts:3632](/home/user/test-tf/src/browser/helpers.ts:3632), and the complete reading function at [helpers.ts:3668](/home/user/test-tf/src/browser/helpers.ts:3668). Altering the compared text made the comparison unequal.

   Offset writes still address only the calling frame at [helpers.ts:3601](/home/user/test-tf/src/browser/helpers.ts:3601). The `widened` and `noscrollback` mutations distinguish scope and post-release restoration, as detailed under claim 6. The final green log retains the geometry and frame-reading cases.

   I also read `t5-instruments-3/t5-veneer-probe-3.log.txt`: it records successful round-3 build, guide, and consumer runs. Those results establish round-3 consumer behavior; they do not establish round-4 consumer success.

8. **BROKEN — Parity holds, but the changed prose does not satisfy the complete claim.** At [types.ts:48](/home/user/test-tf/src/browser/types.ts:48), the sentence “A negative `top` moves … a negative `left` moves …” omits the required nouns after those code tokens. Add “value” after each token.

   The guarantees at [helpers.ts:3523](/home/user/test-tf/src/browser/helpers.ts:3523) and [test.md:686](/home/user/test-tf/guides/test.md:686) also overstate the restoration behavior for claim 4’s clamped-scroll state. The categorical fixed-descendant statement at [test.md:667](/home/user/test-tf/guides/test.md:667) exceeds the ancestry coverage demonstrated under claim 3.

   The parity attack failed: normalized comparison found the `FrameOffset` and `computeOffset` Surface summaries equal to their TSDoc description paragraphs. The changed prose contains no additional growing-set count requiring correction.

   The report states the following counts and results:

   | Reported item | Count or result |
   |---|---|
   | Earlier lane verdicts | 3 |
   | Scoped final green | 38 passed, 334 skipped |
   | Repeated scoped runs | 3 runs, each 38 passed |
   | `noright`, `wholenudge`, `htmlonly`, `nofixedroot`, `latescroll`, `noscrollback`, `nocomposite`, `widened` mutations | Each 1 failed, 37 passed |
   | `nonudge` mutation | 10 failed, 28 passed |
   | `nooffset` mutation | 7 failed, 31 passed |
   | Helpers gate | 370 passed, 2 expected fail, 372 total |
   | Browser gate | 424 passed, 2 expected fail, 426 total |
   | Diff | 4 files changed, 790 insertions, 34 deletions |
   | SVG scroll and oversized-element pointer expectations | 0 events |
   | Historical stray failure | 1 reported occurrence; the report says its logs were overwritten |

   The retained logs and live diff support the listed run results and diff counts. The overwritten historical occurrence remains report-only evidence.

Findings outside the claims: none.

Attacked and held: the staging stylesheet intentionally reaches matching tester frames at [helpers.ts:3173](/home/user/test-tf/src/browser/helpers.ts:3173), while the added offset remains local to the calling frame. That shared staging behavior does not falsify the offset-scope guarantee.

VERDICT: FAIL 3, 4, 5, 8; outside the claims: none