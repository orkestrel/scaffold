<!-- Retained from u7a-audit-2-analyst-last.md. Round 2, subjective lane: analyst on Astra, codex exec read-only -C scaffold, journal u7a-audit-2-analyst.jsonl, thread 01a0c1a0-97db-7531-bd00-d1f87cd38761, exit 0, 2026-09-20. -->

This is the subjective lane’s ruling. I checked the live files against the supplied diff, ran in-memory Sass and registry checks, and read the retained browser execution logs. No command wrote files.

1. **CONFIRMED.** State declarations live in [`theme-tokens`](/C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:83), reading the mode maps. No hand declarations remain elsewhere. Compilation confirms the root, light, and dark closures; registry parity passes.

2. **CONFIRMED.** [`focus-ring`](/C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:22) has neutral `$highlight` and `$reset` defaults. Button callers pass their own tokens. In-memory compilation confirmed the default and overridden contracts without a button-token dependency in the mixin.

3. **CONFIRMED.** The [light map](/C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:19) retains `color(srgb 0.00742457 0.0232852 0.0925134)`. The retuning case is absent. `tmp/u7a/step-9-after-7.log:710` records the calibration failures; `step-9-green-8.log:642` records the restored green run. The final Chromium and Edge logs remain green.

4. **CONFIRMED.** The [disabled rule](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_button.scss:117) reads `var(--bs-btn-box-shadow)`. The [override case](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/button.test.ts:331) sets the shadow before disabling and asserts `[0, 0, 0, 5]`. The retained `step-6-red-8.log` and `step-6-green-8.log` establish the regression pair.

5. **CONFIRMED.** The [active selector group](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_button.scss:82) contains no bare `.btn:active`. The [unchecked-label case](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/button.test.ts:246) checks actual `:active`, resting fill, and absent shadow. `plant-check-9.log:645` records the rejected `rgb(102, 51, 153) 0px 0px 0px 5px`; line 667 records restoration. The live partial matches that restored digest.

6. **CONFIRMED.** The [role loop](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_button.scss:132) applies black to the specified light-role foregrounds. The binding rows name the override. The [floor and ratio registrations](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/button.test.ts:33) use separate frozen tables and unconditional assertions. `plant-light-9.log:665` records `1.0541115652738484` against `4.5`; line 831 records restoration. The other roles retain their measured ratios under the narrowed ruling.

7. **CONFIRMED.** The [component](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/button.test.ts:1) and [element](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/elements/button.test.ts:1) proofs use the installed interaction helpers. Neither contains `userEvent` or a `vitest/browser` import. The final browser logs record passing suites.

8. **CONFIRMED.** The [mixin proof](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/mixins.test.ts:33) establishes pointer history, blurs, focuses, sends the guarded keystroke, and then asserts `:focus-visible`. `step-8-red-9.log:643` identifies this case’s failure without the keystroke; `step-8-green-9.log:642` records green.

9. **CONFIRMED.** The [outline cases](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/button.test.ts:163) read held-active fill, border, and text, then focus-visible ring color, spread, and suppressed outline. Expectations come from `BUTTON_OUTLINE_CASES`. The retained active-fill and focus-shadow mutation logs record failures; `step-1-green-9.log:1` records restoration and its subsequent green run.

10. **CONFIRMED.** The supplied status stays within the inherited owned set. The partials retain their folder layers and shared role loop. Frozen setup tables and exported helper proofs remain centralized. The in-memory partition check confirmed every official selector/property as shipped or deferred against the consumed guide rows. Compiled selectors contain neither `:is()` nor `:where()`.

11. **UNDECIDABLE — verification bound.** `tmp/u7a/gates-10.status` records exit `0` throughout the writer’s chain. This claim explicitly assigns the deciding host rerun to the verifier lane; that independent result is not supplied here.

No additional implementation finding forces another round. Claim 11 remains an acceptance dependency for the Orchestrator.

Verdict: accept