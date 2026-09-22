<!-- analyst on Astra (gpt-6-astra), bench lane, read-only, clean context. Held the SUBJECTIVE
lane of CL10 round 2: the lanes swap back from round 1 because Astra wrote the fix round.
Journal tmp/codex/cl10-audit-2-analyst.jsonl, thread 01a0c779-4bf3-7bf0-b26f-15f12c42f305,
exit=0. Its brief is cl10-audit-2-analyst.sh; the claims it ruled on are ../cl10-audit-2-claims.md.
Terminal line: Verdict: accept. -->

1. **CONFIRMED.** [`collectGridVocabulary`](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts), currently around 655, rejects ASCII continuations, non-ASCII characters through U+10FFFF, and backslashes. Source-loaded checks retain punctuation, selector endings, and family separators. The expression states a shared continuation rule; it does not bolt separate Unicode checks onto individual prefixes.

2. **CONFIRMED.** In `collectGridVocabulary`, the continuation boundary follows the shared prefix alternation. Executed checks reject Unicode and escaped extensions after every named prefix, including the earlier grid, gutter, and table families.

3. **CONFIRMED.** The `caption-top(?!-)` branch preserves exact-name admission. `.caption-top`, `.caption-top:hover`, and `.caption-top[hidden]` pass; `.caption-top-extra` fails. Removing the lookahead admits the latter. Keeping this exception beside its name is clearer than duplicating the continuation boundary in a separate branch.

4. Mutation: adding `.ratioé {}` to the comparison population makes the old and fixed expressions disagree. The instrument distinguishes that control. **CONFIRMED.** The `before` and `after` expressions in [`cl10-cascade-boundary-2.mjs`](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-cascade-boundary-2.mjs) compare admission for every PostCSS selector. My source-loaded execution reproduced `{"admitted":421,"differences":[]}`. This measures admission, without claiming declaration equivalence.

5. Mutation: restore the ASCII-only boundary. The existing assertions fail on false vocabulary members. **CONFIRMED.** I executed “collects the helper prefixes and their preference condition without admitting longer names” in [`setupStyles.test.ts`](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts), currently around 457, against the live implementation and the memory-only mutation. The case distinguishes Unicode, escaped, ASCII, and admitted punctuation forms.

6. **CONFIRMED.** [`readParentOffset`](C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.ts), currently around 641, is exported with its contract block. “shifts the icon on hover and on keyboard focus only while the hover class is present” in [`icon-link.test.ts`](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/icon-link.test.ts) calls it. AST inspection found no remaining function assignment in that file.

7. **CONFIRMED.** The browser setup diff adds only `readParentOffset`. Its sibling proof adds the import, geometry and parentless cases, and export-list entry. No unrelated browser setup implementation changed.

8. Mutation: replace parent subtraction with addition. The SVG assertion distinguishes `263` from the expected `23`. **CONFIRMED.** “reads signed painted offsets from the parent independently of its viewport position” in [`setupBrowser.test.ts`](C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.test.ts), currently around 103, mounts an SVG child. The writer’s execution journal records the targeted assertion failing with exit `1`, then passing with exit `0` after restoration. Its subsequent assertions cover child translation, parent movement, zero, and negative offsets.

9. **CONFIRMED.** `readParentOffset(element: Element): number` belongs with the DOM readers. It composes child and parent geometry rather than renaming an installed primitive. The installed [`readPixels` declaration](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts) reads computed CSS values; no installed export supplies parent-relative painted displacement. A physical horizontal reader fits the accepted physical icon transform. Generalizing it into logical-axis infrastructure would add an unrequested contract.

10. Mutation: reverse the aspect division. The emitted-output comparison distinguishes it. **CONFIRMED.** The `.ratio-#{$width}x#{$height}` loop in [`_ratio.scss`](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_ratio.scss) destructures its pair and has no `sass:list` dependency. Compiling the retained and live partials in memory produced identical CSS. The live cascade, RTL twin, and retained pristine cascade share SHA-256 `0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2`; recorded build readings agree.

11. Mutations: add `.ratio > .bi`, or remove the hover selector. The equality assertion rejects each. **CONFIRMED.** “carries the official icon-link classes and the undefined icon class in the mounted markup” sorts actual and expected lists. Executing its assertions with reordered hover selectors passes; the membership mutations fail.

12. **CONFIRMED.** Comparing round-1 and round-2 guide changes isolates the descriptive cell of the `icon-link` selector row. Its substitutions are factual: `.icon-link` reads `--vn-link-rgb`, and `.icon-link > .bi` reads the motion tokens. Compatibility-row granularity, variable rows, deferrals, and departure records remain unchanged.

13. Mutation: replace `.ratio-16x9`’s percentage with a different aspect. The block-size relationship would fail while its inline-size assertion could still pass. **CONFIRMED.** “keeps the aspect through every inline size the box is given” in [`ratio.test.ts`](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/ratio.test.ts) differs only by removing `async` and the resolved-promise await. Its measurements and assertions are unchanged.

14. Mutation: remove `ICON_LINK_MARKUP` from the exported population. The export equality rejects it. **CONFIRMED.** “exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer” passes against the live exports and fails under that memory-only control. Moving the literal entry before `IMAGE_PAINT_CASES` changes no sorted comparison.

15. Mutations: unfreeze a named container, an object entry, or a nested `readings`, `cell`, or `row` array. The retained assertions reject each. **CONFIRMED.** “binds table case families and maximum widths to the inventory and ramp,” currently around 139, retains container checks for every named table and entry checks for `TABLE_ROLE_CASES`, `TABLE_RESPONSIVE_CASES`, and `TABLE_GEOMETRY_CASES`. Executed controls distinguish every listed mutation. This remains a deliberate immutability contract; only vacuous primitive-entry checks disappeared.

16. Mutation: change a `TABLE_GEOMETRY_CASES` padding value without changing the cascade. “resolves padding and borders on $name” would reject the measured padding. **CONFIRMED.** The consumer search finds the setup proof and [`table.test.ts`](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/table.test.ts). The table declarations, their values, and the sibling proof are unchanged.

17. Mutation: disable the even-to-`2n` normalization. The positive scanner assertion fails. **CONFIRMED.** “matches even-child selectors after an escaped colon through the shared presence scanner” supplies its own `CompatibilityRow`. I executed the case through the real `scanCompatibilityPresence` implementation: the live case passes, the normalization mutation fails, and the odd-child negative control remains discriminating.

18. **CONFIRMED.** `normalizeComplexSelector`, currently around 2284, is unchanged. Its exact-text, depth-zero even-child rule remains intact. This round changes the regression case’s inputs, not the accepted equivalence.

19. **CONFIRMED.** The `$cl10Exit` handling in [`cl10-gates-2.ps1`](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-gates-2.ps1) captures `$LASTEXITCODE` immediately and returns a failing native exit. The writer’s journal records exit `0` for the final managed-Chromium chain and required Edge projects; the saved project logs corroborate completion. These are trustworthy writer-run observations. The independent verifier still owns the authoritative run.

20. **CONFIRMED.** Live read-only status matches [`cl10-status-2.txt`](C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status-2.txt). Every listed path belongs to an effective brief. The diff names no off-limits path, including `tests/setupConformance.ts`, fixtures, configuration, tokens, or scaffold-restored files.

21. **CONFIRMED.** `.icon-link` and `.vr` source partials match round 1. The ratio refactor emits identical CSS, and the shipped cascade matches the accepted digest. No key, family, deferral, or departure was added by this fix round.

22. **CONFIRMED.** The writer’s `prove` journal entry records a failed call with `MCP tool call requires approval, but approval policy is never` and no result. The report explicitly states that no receipt was issued and identifies Vitest readings separately. It does not claim receipt-backed verification.

23. **CONFIRMED.** The report’s implementation, scope, mutation, digest, and gate accounts match the diff, live tree, and recorded executions. My additional executions were memory-only controls; I ran no writing command. No additional implementation finding forces or warrants another round.

Verdict: accept