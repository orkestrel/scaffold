# U6 audit — subjective lane (analyst on Astra, codex exec read-only, thread 01a0be47-daaa-75f0-bea6-1a0fe956df14, journal units/u6-audit-analyst.sh, 2026-09-20)

This is a source-and-retained-evidence audit. HEAD is `f49bc7f`; the saved audit patch matches the working diff. I ran no command that writes and did not reproduce browser or build gates.

1. **CONFIRMED — Types and constant.** [types.ts:193](C:/Users/mikes/WebstormProjects/test/src/browser/types.ts:193) declares only the readonly optional booleans `print` and `motion`, with the prescribed descriptions. [constants.ts:204](C:/Users/mikes/WebstormProjects/test/src/browser/constants.ts:204) places `POINTER_HOLD` after `IMPLICIT_ROLES`. The existing barrel exports types, constants, and helpers.

2. **CONFIRMED — One CDP door.** [helpers.ts:497](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:497) contains the sole `cdp()` invocation. It reads `send` through `readProperty`, checks callability, invokes through `invokeUnchecked`, discards the response, and declares `Promise<void>`. The refusal text matches.

3. **CONFIRMED — Hover.** [helpers.ts:527](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:527) supplies the prescribed overloads. Its implementation is exactly `await userEvent.hover(resolveRendered(first, second))`, matching the click resolver without adding another action. Existing resolver implementations and voices are unchanged.

4. **CONFIRMED — Hold.** [helpers.ts:580](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:580) implements the specified order, scale calculation, protocol payloads, marker, frame wait, and release-before-refusal. The retained hold reading reports focus on the button and the scaled iframe geometry; the covered-target and double-hold cases are present.

5. **CONFIRMED — Release.** [helpers.ts:620](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:620) removes the marker, conditionally sends button-up, unconditionally moves to `(0, 0)`, and waits a frame. Idle and repeated release are covered. This safety assumes the documented working DevTools provider; provider failures can still reject.

6. **CONFIRMED — Pseudo read.** [helpers.ts:2322](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:2322) checks `::` before selector support and uses the exact refusals. `readPixels` forwards `pseudo` through that reader. Omitting it retains the former CSSOM reading, trimming, and numeric fallback.

7. **CONFIRMED — Media stage.** [helpers.ts:2597](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:2597) implements the stated boolean mappings, effective-value preservation, empty-options refusal, frame wait, and verification exception for `print: false`. Failed verification resets before refusing. `releaseMedia` sends the prescribed unconditional reset.

8. **REFUTED — Proof coverage is incomplete.** The named cases exist, but the motion teardown proof never changes motion away from its initial value. At [helpers.test.ts:3394](C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts:3394), and again at line 3405, `motion: !reduced` stages the existing preference:
   - Host `reduced = false` → `motion = true` → `no-preference`.
   - Host `reduced = true` → `motion = false` → `reduce`.

   A read-only truth-table evaluation confirmed this for either input. The later motion assertion therefore cannot distinguish restoration from preservation. Stage `motion: reduced`, establish the changed preference, and prove restoration after the hook. Print teardown is exercised. Also, “no second release” applies to pointer button-up; media deliberately sends another reset.

9. **CONFIRMED — Controls and post-removal run.** The retained logs contain the exact failures: [scale:19](C:/Users/mikes/WebstormProjects/test/tmp/codex/u6-plant-scale-red.log:19), `expected 16 to be 32`; [pseudo:19](C:/Users/mikes/WebstormProjects/test/tmp/codex/u6-plant-pseudo-red.log:19), `expected '0px' to be '7px'`; [release:21](C:/Users/mikes/WebstormProjects/test/tmp/codex/u6-plant-release-red.log:21), `expected 32 to be 16`. The working diff restores the intended operations and removes control tags. The subsequent [source log:53](C:/Users/mikes/WebstormProjects/test/tmp/codex/u6-2-test-src.log:53) records a passing source-suite result. The second report separately resolves the redirected-exit ambiguity.

10. **UNDECIDABLE — Guide parity structure holds; gate success lacks independent evidence.** The Surface summaries match the canonical TSDoc descriptions; signatures, Voices, Limits, Bounds, Patterns, and transcriptions are present. [setup.ts:75](C:/Users/mikes/WebstormProjects/test/tests/setup.ts:75) routes the added fences. The successful `test:guides` result is recorded in [report-2.md:47](C:/Users/mikes/WebstormProjects/test/tmp/codex/u6-report-2.md:47), but the supplied evidence contains no corresponding independent successful run. That remains a verification requirement.

11. **CONFIRMED — Names.** Searching the specified hosted `guides/*.md` population for the proposed identifiers returned no occurrence. The directory exists and contains hosted guides. [report.md:14](C:/Users/mikes/WebstormProjects/test/tmp/codex/u6-report.md:14) records the same check. The names also fit the established helper and lifecycle vocabulary.

12. **CONFIRMED — Scope and law, for the U6 additions.** The working diff changes only the owned paths listed in the claim; `tests/setup.ts` adds only the fence routes. The excluded paths are unchanged. The added declarations contain no prohibited assertions, suppressions, hidden helpers, or nested function declarations. Tests use real browser behavior and recorders. Boolean negation such as `!reduced` is not a prohibited non-null assertion.

13. **UNDECIDABLE — Reproduced gates and Edge.** The second report records managed-Chromium successes but explicitly says, “Edge remains the Orchestrator's observation.” No U6 Edge result is supplied. Read-only review cannot establish that every gate reproduces on this tree. This is missing evidence, not evidence of failure.

14. **Additional finding — Media documentation overstates verification.** [helpers.ts:2583](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:2583) promises resolution after staged queries reach the tester, and [guides/test.md:1579](C:/Users/mikes/WebstormProjects/test/guides/test.md:1579) says the helper “verifies delivery.” Yet `{ print: false }` creates no verification query at [helpers.ts:2602](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:2602). Document that screen staging is sent and followed by a frame wait without a delivery read-back. This preserves the approved implementation while making its public promise accurate.

Verdict: fix round — claims 8, 10, 13, and finding 14.