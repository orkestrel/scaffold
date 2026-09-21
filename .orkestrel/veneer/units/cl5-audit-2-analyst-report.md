Source review only; I ran no writing command and repeated no browser or gate run.

1. **CONFIRMED — repaired colour mechanism.** [type.test.ts:43](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/type.test.ts:43) gives the parent a body colour while setting `--bs-heading-color` to `rgb(20, 80, 140)`. The class is on a `div`, beside the heading tag, so neither tag styling nor inheritance supplies the expected colour. The built cascade retains the class’s declaration. The reported deletion-and-restoration run remains **report-only**.

2. **CONFIRMED.** The tables at [setupStyles.ts:757](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:757) and [setupStyles.ts:772](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:772) match the actual token names in [_type.scss:13](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_type.scss:13) and its built output. Each case overrides only its named token and expects a value outside the default scales. A literal default or a sibling-token substitution cannot satisfy that assertion. The default-value cases remain.

3. **UNDECIDABLE — report-only execution history.** [cl5-report-2.md:38](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-report-2.md:38) reports the `.h4` literal plant failing its retune case and restoration returning green. The supplied evidence contains the writer’s account, not independently verifiable execution evidence. Plant removal is confirmed: the live partial’s hash is `3b44070875617d424c3e36605330a48457f5fc50`, matching its unchanged entry in the round diffs.

4. **CONFIRMED.** Comparing the supplied patches shows changes only in `tests/src/styles/components/type.test.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`. The source partials, section implementations, showcase wiring, and barrel retain their round-1 patch content. No carried ruling is reopened.

5. **CONFIRMED.** [setupStyles.test.ts:114](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:114) pins the exports; [line 198](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:198) independently pins level-to-token membership; [line 222](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:222) checks frozen tables and rows. Removing a row or changing its level/token cannot silently shrink or redirect the matrix.

6. **UNDECIDABLE — gate evidence only.** Scope and implementation-law checks hold on the supplied changes. The status files have identical SHA-256 hashes, and the diff-to-diff comparison matches the claimed test-only scope. [cl5-report-2.md:60](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-report-2.md:60) supplies the writer’s gate results. The supplied independent verifier record belongs to round 1; it does not establish the claimed round-2 chain or its before/after status.

No additional implementation defect is established. Claims 3 and 6 require execution evidence to close; they do not justify further implementation changes.

Verdict: fix round with claims 3 and 6