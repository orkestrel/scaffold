# T5 TEST-FRAME audit, round 6 — claims

Subject: the round-6 change in `/home/user/test-tf` (uncommitted over `80c419e`), briefed by `t5-test-frame-brief-6.md`
and reported in `t5-test-frame-report-6.md`, carrying the round-5 findings `t5-audit-5-verdict.md` names (C5, F1, F2,
R3). The diff is `t5-6.diff`, the status `t5-6-status.txt`, and the logs, instruments, and retained mutation files
`t5-instruments-6/`, all beside this file. The Orchestrator's consumer probe is `t5-instruments-6/t5-veneer-probe-6.log.txt`
with the build, guide, and journey logs beside it; the withdrawn park-2 readings are `t5-instruments-park2/park2-readings.md`.
Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists exactly `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`,
   and `tests/src/browser/helpers.test.ts`; `src/browser/types.ts` carries only its round-5 change; each gate log under
   `t5-instruments-6/` that a unit gate wrote ends with the exit status its run wrote, each 0.
2. **The bound (C5).** `computeOffset` returns 0 on an axis whose far edge already lies inside the window, and on an
   overflowing axis returns `Math.max(extent - Math.ceil(edge), -start)`, so a fitting box never ends past the window's
   start edge; it stays pure and returns zero or negative on each axis. The three new cases hold their stated results
   and final edges, the fractional-bottom case keeps -332, and no input with a fitting box, whole or fractional, leaves
   the box outside the window.
3. **The proofs bind.** The `unbounded` mutation (the round-5 arithmetic) reddens each new case; `noceil` reddens the
   fractional-bottom and both-edges cases; `nudge` reddens the resting-pointer hover proof; every round-5 mutation still
   reddens its named proof; the digest log shows the final test file unchanged across the final series.
4. **The park's mechanism (F1).** The `releasePointer` remarks and the guide's `releasePointer` bullet state that the
   park point lies outside the runner page's viewport, where the browser hit-tests nothing, so no element takes a
   `mouseover` event or hover paint from the parked pointer until the next pointer verb, even where a staging, scroll,
   or offset lays content over that point; and that statement is true of the evidence (the round-5 lifecycle
   exercises, the consumer probe, and the park-2 readings as corrected).
5. **The rename (F2).** The hover proof is named for a resting pointer and holds no button; the `Held` identifiers of
   the real hold cases are unchanged; the guide's coverage entries name every new and renamed proof.
6. **The consumer.** The packed round-6 build passes the Test guide gate, and Veneer at `3203369` with that tarball
   installed and its Vite dependency cache rebuilt from it passes `journey:light-390` and `journey:dark-1280`.
7. **Round-5 behavior holds.** Outside `computeOffset`, the F1 sentences, and the F2 rename, the round-6 tree equals the
   round-5 tree that `t5-audit-5-verdict.md` held.
