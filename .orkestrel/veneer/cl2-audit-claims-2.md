# CL2 audit — claims (round 2, the fix round under brief 3)

Subject: the whole CL2 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `00a5bdc`, after the fix round `opus` on native Opus 5 ran under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-brief-3.md` (succeeding
`units/cl2-brief-2.md`, still in force for what brief 3 does not name). Round 1's verdict is
`.orkestrel/veneer/cl2-audit-verdict.md`; the fix report is `units/cl2-report-2.md`. Evidence: the
rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-diff-2.patch.txt` and status
`tmp/audit/cl2-status-2.txt`, round 1's `units/cl2-diff.patch.txt` for comparison, and the live
tree. Audits cover implementation only: correctness, rule compliance, test sufficiency, scope
honesty. Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence;
a report-only claim (a red-then-green run) is recorded as report-only; add an
implementation-defect finding only after the last claim, with a site and a one-line failure
scenario, saying whether it forces another round.

1. Finding 1 closed (analyst 8, reviewer 8). `tests/setupStyles.ts` has no unexported
   module-scope declaration: `MEDIA_WIDTH_CONDITION` and its doc block are gone, the regex
   literal sits inside `parseMediaWidth`'s body at its one use, and the function still returns
   the width for the range spellings (`(width >= 576px)`, `(width < 0px)`) and the legacy pair
   (`(min-width: 576px)`, `(max-width: 575.98px)`) and `undefined` for a condition with no pixel
   width. `tests/setupStyles.test.ts` is unchanged between rounds because its inventory never
   named the constant.

2. Finding 2 closed (reviewer 9). The `collectMediaConditions` case in
   `tests/setupBrowser.test.ts` gives its two fixture gates different widths, `(width >= 576px)`
   and `(width < 768px)`, and asserts the gated selector's conditions map through
   `parseMediaWidth` to `[576, 768]`, so a reader that returns its first match twice or reverses
   the order fails it (report-only: the reader plant returned `[576, 576]` and the case failed
   `1 failed | 32 skipped`, then passed with the plant reverted).

3. Finding 3 closed (reviewer 10). The same case no longer asserts `readRules()` over media rules
   `.not.toEqual([])`; it asserts the flat walk's parsed widths contain `576` and `768` (membership,
   because the loaded cascade adds width-free conditions) and that `collectMediaConditions` returns
   an empty array for `.vn-probe-open`, a fixture rule declared in the same sheet under no gate,
   while the undeclared `.vn-probe-absent` reading stays empty too (report-only: a reader plant
   that reports a gate for any declared selector failed the ungated assertion alone).

4. Finding 4 closed (reviewer 11). The stripe case in `tests/src/styles/tokens.test.ts` reads
   the shipped cascade through `readCascadeSheet` and `collectNestedRules` and asserts
   `collectScopeProperties(rules, "[data-bs-theme='dark']")` contains `TOKEN_NAMES.state.stripe`,
   keeping the value assertions; the placement plant (the declaration moved from `theme-tokens`
   to a `:root` block, cascade rebuilt) reddened it while the value assertions alone stayed green,
   and the plant is reverted: `--vn-state-stripe` is declared at `src/styles/_mixins.scss:136`
   inside `theme-tokens` and nowhere under `src/styles` besides (report-only for the runs; the
   placement is live).

5. `[mechanical]` Scope, law, and gates. `tmp/audit/cl2-status-2.txt` lists exactly the eleven
   CL2 files and nothing new; the round-2 diff differs from round 1's only in
   `tests/setupStyles.ts`, `tests/setupBrowser.test.ts`, and `tests/src/styles/tokens.test.ts`,
   and the other eight files carry byte-identical hunks in both diffs (so the reader plant in
   `tests/setupBrowser.ts` and the placement plant in `src/styles/_mixins.scss` and
   `_tokens.scss` left no residue; `tests/setupBrowser.ts` is insertions-only against the base in
   both rounds). The added lines carry no `any`, no type assertion outside `as const`, no
   non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter
   property, no skipped case, and no case named for a control; both setup export inventories
   equal their live export sets. Every gate exits 0 on managed Chromium and on Edge, and
   `scaffold audit` reports only the pre-existing `setupListeners` note and the three registry
   majors (verifier).
