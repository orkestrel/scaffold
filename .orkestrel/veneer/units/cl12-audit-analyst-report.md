<!-- analyst on Astra (gpt-6-astra), bench lane, read-only, clean context. Held the OBJECTIVE
lane of CL12 audit round 1. Journal tmp/codex/cl12-audit-analyst.jsonl, exit=0. Terminal line: Verdict: fix round with claims 4, 10, 13, 19, and 23.
RETAINED LATE, at the campaign's own review, after the Orchestrator found it had not retained
every lane of every audit round as .agents/orchestration.md requires. The report text is the
lane's own, unedited. -->

1. **CONFIRMED.** The built stylesheet’s `:root` declarations give `--vn-container-sm:540px`, `--vn-container-md:720px`, `--vn-container-lg:960px`, `--vn-container-xl:1140px`, `--vn-container-xxl:1320px`, `--vn-gutter-x:1.5rem`, `--vn-gutter-y:0`, `--vn-text-mark:marktext`, and `--vn-surface-mark:mark`. Each has a literal row under **Text and surface** or **Space, border, radius, and elevation** in `guides/veneer.md`. Values were read through PostCSS from `dist/src/styles/index.css`, not from the guide.

2. **UNPROVEN for Elements provenance; the remaining facts hold.** The pinned inventory’s `container` and `row` declarations establish the Bootstrap widths and gutters. The built container and `.row` rules declare the gutter aliases; no `--bs-*` declaration reads the container or mark tokens. `_tokens.scss` declares the mark pair and attributes it to Elements, currently around 205, but that comment cannot independently establish the external calibration. This is the disclosed evidence limit in claim 15, not evidence of an incorrect value.

3. **CONFIRMED.** `TOKEN_NAMES.text.mark` and `TOKEN_NAMES.surface.mark` register the additional names, and `_tokens.scss` declares them. The baseline guide lacks their rows. Adding them satisfies the brief’s **Objective**, “Every shipped token has its row”; stopping at the terrain’s narrower list would leave that obligation incomplete.

4. **REFUTED in its impossibility claim.** Literal rows are a valid choice, but range rows can be checked. An executed reading expanded the guide’s gray endpoints through `TOKEN_NAMES.gray` and obtained the intervening names. The report’s **The rows added**, currently around 62, also contradicts its own proposed range-expansion alternative. Correct the record; the added literal rows need no redesign.

5. **CONFIRMED.** The built `.mark` rule reads `--vn-text-mark` and `--vn-surface-mark`. Parsing the baseline and changed **Compatibility** tables showed that only this row’s Obligation text changed; Component, Kind, Proof, Status, and row structure remained equal. The conformance mutation is removal of `.mark`: executing `scanCompatibilityPresence` against that in-memory CSS returned `Shipped component mark is missing selector .mark`. The corrected obligation preserves that coverage.

6. **CONFIRMED.** The executed `tmp/cl12/mirror.mjs` comparison found a matching proof for every stylesheet partial, with `integration` as the additional proof. That supports the replacement’s mirrored-path claim in **Styles**, currently around 201. The former statement that **Tests** names every proof exceeded that section’s links. Removing a mirrored proof is the concrete mutation that would invalidate the replacement.

7. **CONFIRMED.** The added **Files** rows match their partials: `_container.scss` declares container caps and navbar combinators; `_grid.scss` declares row, column, offset, and gutter behavior; `_link.scss` declares color, opacity, offset, and underline classes; `_html.scss` and `_body.scss` declare their document baselines. Each uses the stated layer.

8. **CONFIRMED.** **Tests**, currently around 1084, contains the added reset, button, link, container, grid, table, and gutter links. Their targets exist and occupy the categories named by the replacement sentence. Renaming a linked target would break `tests/guides.test.ts`’s **links only to test files that exist** assertion.

9. **CONFIRMED.** A source search found no raised-surface read in components, utilities, reset, or theme. Walking the built declarations found reads only in `pre`, `samp`, and `var`. The replacement in **Text and surface**, currently around 567, states that observable bound. It usefully answers which shipped rules consume the token.

10. **REFUTED.** The argument toward the read shape conflates changing columns with relocating rows.

    An in-memory conversion of **Tokens → Deferred names** to `Name | Owner | Reason` left the actual `selectSectionBlocks(document, 'Styles')` projection identical. `readDeferrals`, currently around 643, consumes only that projection. Therefore, changing the unread table’s shape need not affect conformance.

    Relocation does fail: passing `scroll-padding` as an actual deferral to `scanCompatibilityPresence` returned “outside the official inventory”; the pinned inventory contains no such name. That proves the relocation restriction, not shape-unification impossibility.

    The reverse restriction holds with the reader fixed: changing the Styles header to `Name | Waiting on` removes the required Owner column. The `Excluded` distinction also matters: an executed scanner control accepted an inventory name without a component obligation under `Excluded` and rejected it under an ordinary owner. Correct **The deferral grammar** in the report, currently around 150. Keeping distinct tables remains a valid choice.

11. **CONFIRMED.** `readDeferrals` selects **Styles → Deferred selectors**, and the searched application, source, configuration, and test consumers contain no parser for **Tokens → Deferred names** or its Waiting on column. The carry file’s “tokens reader from U3” claim is false. The guide subsections explain their differing purposes; they need not claim that a common column shape is impossible.

12. **CONFIRMED.** The supplied diff changes only `guides/veneer.md`. No reader implementation changed.

13. **REFUTED as a claim of fully derived populations.** The named scripts exist and run. The path, file, and mirror populations come from guide text or filesystem enumeration. However, `tmp/cl12/claims.mjs` uses a hand-selected `probes` array; it does not enumerate behavioral claims from the guide. Its “declared and unread” probe checks only declaration presence. Also, running the ledger-selection pattern against the baseline excludes the false `.mark` sentence because that sentence contains no token literal. The instruments support narrower results than a comprehensive instrument-derived truth sweep. Correct that coverage claim in **The truth sweep**.

14. **CONFIRMED.** `package.json`’s `exports['./styles']` is a string pointing to the CSS, whereas the failed pattern expects an object. PostCSS independently returned the layer sequence `theme, reset, base, elements, components, utilities`; the failed pattern requires a combined ordering statement. The proof **orders every layer before the rules that fill them** compares that sequence explicitly. Swapping `elements` and `components` would fail its equality assertion.

15. **CONFIRMED as a disclosed bound.** The report’s **The sweep’s bound — what I could not reach**, currently around 218, explicitly excludes independent Elements provenance, a complete Bootstrap source-cell comparison, and individual verification of obligation prose beyond its stated subset. The checkout supplies local calibration declarations, not the original Elements artifact. This disclosure is visible where the report presents its coverage; it does not independently prove the excluded provenance.

16. **CONFIRMED.** The terrain omits the mark pair from its missing-row list; the registry, declarations, and baseline guide establish the same gap for those names. Recording that correction in **What I could not close, and two record corrections** preserves the disagreement instead of silently treating the terrain as complete. Completing the broader Objective stayed within ownership.

17. **CONFIRMED for the wider affected population.** `tests/conformance.test.ts`, `tests/setupStyles.test.ts`, and `tests/setupConformance.test.ts` call default-path readers. They belong beside `tests/setupConformance.ts`, `tests/guides.test.ts`, and the path-bearing `tests/setupStyles.ts` when assessing a guide change. The brief’s **Scope** excludes every such test file. The correction required no scope expansion.

18. **CONFIRMED.** The **token cascade** assertions in `tests/src/styles/tokens.test.ts` compare root declarations with `collectTokenNames(TOKEN_NAMES)` in the shipped cascades. They do not compare guide rows. An executed root-set comparison passed; deleting `--vn-text-mark` from that in-memory set failed equality. `tests/guides.test.ts` supplies API, example, link, and summary checks, but no token-table completeness assertion. The absence of a central red-then-green is not a CL12 defect.

19. **REFUTED on sufficiency; successor ownership is correct.** The recommended assertion in **The rows added**, currently around 109, checks backticked names anywhere inside Tokens. Deleting the `--vn-text-mark` table row in memory left the entire set of backticked spans unchanged because prose still names it. The proposed gate therefore misses the obligation it claims to guard. Recommend checking token-table name cells and their required value/source/alias cells. Implementing that gate remains outside CL12.

20. **CONFIRMED for the recorded runs.** The retained `tmp/cl12` logs support the reported successful formatting, lint, check, build, guide, conformance, policy, and complete test runs. I did not rerun commands that write. Relevant failure mutations are a changed API Summary for parity, removal of `.mark` for conformance, and an unconditional banned term in authored guide prose for policy. Running the existing policy gate was appropriate verification and did not require a discretionary style pass.

21. **CONFIRMED.** The supplied status names only `guides/veneer.md`; `guides/README.md` is unchanged. Its **By concept** promise belongs to the token reference. Adding the missing rows repairs that coverage without changing the index. This confirms coverage, subject to the provenance limit in claim 2.

22. **CONFIRMED.** The parsed baseline/current **Compatibility** comparison preserves row order and every field other than the `.mark` Obligation text. No family was split, merged, added, or removed.

23. **REFUTED.** The report accurately describes the changed file, token values, `.mark` correction, and disclosed external limits. Its account nevertheless overstates range unreadability, grammar impossibility, instrument-derived coverage, and the proposed gate’s sufficiency. The deciding evidence is in claims 4, 10, 13, and 19. Correct the report and successor recommendation; these findings do not justify editing conformance machinery or reopening prose style.

Verdict: fix round with claims 4, 10, 13, 19, and 23.