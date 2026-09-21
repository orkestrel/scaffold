1. **REFUTED — forces another round.** The property matcher at [setupConformance.ts:314](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:314) ends an interpolation at the first `}`, ignoring the quoted-token boundary the reader already recognizes. This valid Sass block still disappears:

   ```scss
   $role: primary;
   .sample {
     --#{"role-#{$role}"}-text: inherit;
     --#{"role-#{$role}"}-border: currentColor;
   }
   ```

   In a read-only execution of the source-derived reading loop, this input returned `[]`; the plain-interpolation control returned its declarations. Installed Sass compiled the input successfully. Repeating this block across partials therefore escapes detection. The case at [setupConformance.test.ts:167](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.test.ts:167) covers flat interpolation only. Make property recognition respect the interpolation boundaries already recognized by tokenization.

2. **UNDECIDABLE — report-only historical execution.** [cl5b-report-2.md:33](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-report-2.md:33) reports the planted failure, restored passing run, diagnostics, and byte restoration. I independently confirmed that the supplied diff excludes the planted partials and that searching `src` and `tests` for `cl5b-plant|cl5b-interpolation-plant|--cl5b-` returns no matches. That establishes no remaining marker, but cannot establish the historical runs or byte restoration. Their execution records would settle that portion.

3. **CONFIRMED.** [setupConformance.ts:285](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:285) keeps quoted strings as complete tokens; line 301 folds whitespace through one branch inside and outside interpolation. The in-memory reading reproduced equal width and height declarations while retaining distinct `"a  b"` and `"a b"` content values. The exact expected intersection at [setupConformance.test.ts:199](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.test.ts:199) makes that distinction visible.

4. **CONFIRMED.** [setupConformance.ts:306](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:306) clamps the decrement with `Math.max(0, parentheses - 1)`. The reading loop retained the declarations following an unmatched `)`. The diff adds no malformed-source case, and [cl5b-report-2.md:11](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-report-2.md:11) records the permitted observation.

5. **CONFIRMED.** [setupConformance.ts:274](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:274) normalizes paths before file discovery results and block records consume them. The discovery assertions at [setupConformance.test.ts:61](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.test.ts:61) pin literal slash-separated paths in the file list and intersections. The live Windows sweep returned no backslashes.

6. **UNDECIDABLE — report-only historical execution.** [cl5b-report-2.md:16](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-report-2.md:16) names the same focused command and reports the expected failing cases followed by a passing run. The diff supports the intended regression coverage; it cannot establish execution order. The named red and green logs would settle this claim.

7. **CONFIRMED, carrying the accepted round-1 rulings.** The live source-derived sweep returned `files=48; pairs=1128; shared=[]`. Comparing the supplied patches found the extraction, fixture, and consumer-test changes identical between rounds. The threshold and cross-file comparison remain unchanged at [setupConformance.ts:334](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:334). The existing built stylesheet’s SHA-256 matches the retained round-1 digest. I did not rebuild or rerun the accepted stylesheet proofs.

8. **UNDECIDABLE as a complete gate claim.** The supplied status files are identical, and patch comparison isolates round-2 changes to the conformance helper and its proof. Those changes satisfy the listed implementation restrictions and introduce no dependency. Gate execution remains report-only in [cl5b-report-2.md:48](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-report-2.md:48); the independent verifier’s execution evidence is needed to establish that portion. This uncertainty adds no implementation finding.

Verdict: fix round with claim 1.