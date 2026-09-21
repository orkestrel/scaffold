<!-- CL3 audit round 2, subjective lane on Astra (gpt-6-astra, read-only, codex exec -C scaffold), journal tmp/codex/cl3-audit-2-analyst.jsonl (swept at acceptance), thread 01a0c3cf-a250-7f60-99f0-8d71be7dc3e3, exit 0, retained 2026-09-21. -->

This is a source and design-fit review with read-only Sass checks. Browser runs and red/green history remain report-only.

1. **CONFIRMED.** [Showcase.ts:31](C:/Users/mikes/WebstormProjects/veneer/app/browser/Showcase.ts:31) assigns `main`; the unchanged specimen targets `#main`. [Showcase.test.ts:81](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/Showcase.test.ts:81) checks the mounted region, and line 101 checks its absence after destruction. The red/green run is report-only.

2. **CONFIRMED.** [The mixin:3](C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:3) owns the shared code-family text declarations. Its callers preserve their distinct surfaces and treatments. Read-only Sass compilation showed unchanged declaration values against the round-1 partials; `pre` changes declaration order only. A changed font-size control produced a difference. Compiling `_mixins.scss` alone emitted no CSS. Browser readings remain report-only.

3. **CONFIRMED.** [setupStyles.ts:6](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:6) owns the frozen mode and text-case tables; `BUTTON_BARE_VALUES` appears at line 349. The element proofs import these tables, and [the inventory:63](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:63) includes their exports. No inline mode matrix or expected-value table remains in the named element-proof scope. Inventory red/green runs are report-only.

4. **CONFIRMED.** The scoped search found no `console.` or named instrumentation residue in the element proofs or token proof. [tokens.test.ts:446](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:446) retains the text and surface assertions.

5. **CONFIRMED.** [reset.test.ts:25](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/reset.test.ts:25) plants the unlayered important competitor. Its assertions require hidden suppression and restoration of each competitor’s display. Cleanup calls `specimens.clear()` at line 7; the manager removes recorded nodes. No corresponding plant exists under `src/` or `app/`. The built CSS retains the important reset declaration; browser execution is report-only.

6. **UNDECIDABLE as a complete claim.** The supplied patches’ delta stays within brief 4’s ownership, and the live files match the round-2 patch’s target hashes. `git diff --check` exited 0. The token and registry edits belong to the inherited, authorized brief-3 change. Independent gate results, `npm test`, and the stated `scaffold audit` result were not established in this lane; those require the verifier’s evidence.

7. **Additional implementation finding — forces another round: duplicated script-text treatment.** [_sub.scss:3](C:/Users/mikes/WebstormProjects/veneer/src/styles/elements/_sub.scss:3) and [_sup.scss:3](C:/Users/mikes/WebstormProjects/veneer/src/styles/elements/_sup.scss:3) repeat `position`, `font-size`, `line-height`, and `vertical-align`. [styles.md:45](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md:45) requires a pattern shared across partials to move into `_mixins.scss`. Extract that block while retaining each tag’s partial and distinct offset. **Failure scenario:** changing the common script typography requires parallel edits because the shared treatment has separate owners. This is a rule-compliance defect, not an observed rendering regression.

The remaining design fit holds: reset placement, heading-family ownership, token bindings within the recorded exceptions, anchor reset, body fallbacks, `ContentSection` lifecycle, readonly specimen shape, exports, and guide-row coverage match the governing decisions. The calibration work already assigned to CL3b and CL6 is not reopened.

Verdict: fix round with finding 7.