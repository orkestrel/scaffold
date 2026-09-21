<!-- Retained from u7f-fix-audit-analyst-last.md. Bench lane: analyst on Astra (objective lane, Opus wrote the fix), codex exec read-only -C C:/Users/mikes/WebstormProjects/scaffold, journal u7f-fix-audit-analyst.jsonl, thread 01a0c2d5-5fd2-7b30-8d4b-f471a91db34f, exit 0, 2026-09-21. Fix round with claims 2 and 3 and finding 6 (test sufficiency); the frames decode to the settled fills. -->

Read-only source and artifact audit. No browser suite or mutation run was executed.

1. **UNDECIDABLE — execution history remains unverified.** The implementation matches the claim: [_shell.scss:24](C:/Users/mikes/WebstormProjects/veneer/app/browser/styles/_shell.scss:24) uses the shipped border tokens; [Showcase.ts:70](C:/Users/mikes/WebstormProjects/veneer/app/browser/Showcase.ts:70) mounts specimens under `main`; [Showcase.test.ts:96](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/Showcase.test.ts:96) drives the control by keyboard and compares the named properties. The retained home captures show the border in each mode. The red-before/green-after evidence is only the writer’s [report:46](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7f-fix-report.md:46). This needs execution evidence, not an identified implementation change.

2. **REFUTED — the hover assertion does not prove the captured paint. Forces a fix round.** After placement, [integration.test.ts:441](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/integration.test.ts:441) re-hovers the host **before** reading its restored color and `:hover` state. The equality at line 471 therefore checks the state re-established after capture. The `frame paint` record copies the pre-capture reading. A capture that loses hover can escape these assertions. The installed [captureFrame implementation:2763](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.js:2763) stages and releases the pane internally.

   The retained PNGs themselves are correct: read-only decoding found dominant fills matching `(7,58,208)`, `(7,52,187)`, `(6,182,238)`, and `(35,190,240)` across the registered variants. The defect is the regression proof. Add a check that fails when the shot loses hover, without repairing hover before taking its deciding reading.

3. **REFUTED — the arrival-record assertion accepts a missing arrival tree. Forces a fix round.** The pressed trees are correctly appended at [integration.test.ts:511](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/integration.test.ts:511), and the retained artifacts contain them. However, the predicate at [line 634](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/integration.test.ts:634) also matches the focus inventory added at line 177. Its exact text includes `25. button "Toggle"`.

   Read-only replay of the predicates over retained entries returned:
   - Arrival tree removed: **PASS**
   - Arrival tree replaced by pressed tree: **PASS**
   - Pressed records removed, negative control: **FAIL**

   Identify the arrival tree explicitly instead of accepting any non-pressed entry containing the button name.

4. **CONFIRMED — the enumerated implementation-scope checks hold.** Live status and the supplied diff name only `_shell.scss`, `Showcase.test.ts`, and `integration.test.ts`. The state registries, export assertions, published source, guides, manifest, configs, and vendored files remain untouched. The additions contain none of the prohibited implementation constructs listed in this claim. No prose finding is reported.

5. **UNDECIDABLE — independent gate evidence was not supplied.** The [report:135](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7f-fix-report.md:135) records the requested successful runs. The claim expressly assigns the deciding reading to the verifier. This lane cannot substitute the writer’s report for that result. This is an evidence requirement, not an identified code defect.

6. **Additional implementation defect — staged-pane cleanup is missing on failure. Forces a fix round.** Site: [integration.test.ts:426](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/integration.test.ts:426), with teardown at [line 111](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/integration.test.ts:111). Failure scenario: after pane staging, a hover, animation wait, or assertion fails before placement; teardown releases pointer and media but leaves the pane staged for subsequent cases. The installed helper explicitly requires paired release. Add `releasePane` to the independently attempted teardown releases. Successful captures already release their own staging.

Verdict: fix round — claims 2 and 3, and additional finding 6.