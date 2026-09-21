<!-- workflow wf_7897df4d-942, agent a7edb474eb073ed2b, label checker:mechanical (checker on sonnet), retained 2026-09-21 -->

## Claim table

**Claim 5** `[mechanical]` Scope, law, and gates — CONFIRMED.

Evidence:
- `tmp/audit/cl2-status-2.txt:1-11` lists exactly the eleven files named in the claim, nothing else.
- Diff-to-diff comparison of `cl2-diff.patch.txt` and `cl2-diff-2.patch.txt`: `guides/veneer.md`, `src/core/constants.ts`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `tests/setupBrowser.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/fixtures/mixins.scss`, `tests/src/styles/mixins.test.ts` carry byte-identical hunks and identical pre/post blob hashes in both patches. `tests/setupStyles.ts` (`6ea51c5`→`f231a2a`), `tests/setupBrowser.test.ts` (`b4cd9b1`→`7311aed`), and `tests/src/styles/tokens.test.ts` (`9761f57`→`c718838`) differ between rounds — matching brief 3's owned files exactly.
- `tests/setupBrowser.ts`'s hunk in both diffs contains only `+` lines against context (`cl2-diff-2.patch:355-397`), confirming insertions-only.
- Gate-reported report-only claims (1–4 in `../cl2-audit-claims-2.md`) are not `[mechanical]` and are out of this lane's ruling scope per the brief; their code-level assertions are corroborated below under probes.

## Probe readings

- **Scope**: matches claim 5 exactly (evidence above).
- **Hidden declarations**: `grep '^const |^let |^function |^type |^interface '` over `C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts` and `tests/setupBrowser.ts` returns no matches — no unexported module-scope declaration in either file. `parseMediaWidth` at `tests/setupStyles.ts:1059` reads the regex inline in its body (no `MEDIA_WIDTH_CONDITION` module constant), covering the range spellings (`width >=`/`width <`) and legacy `min-width`/`max-width` pair per `tests/setupStyles.test.ts:112-118`. Both export inventories (`tests/setupStyles.test.ts:57-108`, `tests/setupBrowser.test.ts:104-129`) equal the live `export` sets read from the source files.
- **Reader case**: `tests/setupBrowser.test.ts` (round-2 diff lines 324-350) asserts `[576, 768]` for the two differently-gated fixtures, and `collectMediaConditions(rules, '.vn-probe-open')` returns `[]`. No `.not.toEqual([])` assertion over `readRules()` remains in the file.
- **Stripe case**: `tests/src/styles/tokens.test.ts` (round-2 diff lines 717-724) asserts `collectScopeProperties(...).toContain(TOKEN_NAMES.state.stripe)` on the `"[data-bs-theme='dark']"` scope, and the value assertions (`stripe`/`hover`/`active` in both light and dark) remain (lines 725-735).
- **Plants**: `--vn-state-stripe` is declared once in `C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:136`, inside the `theme-tokens` mixin, and a repo-wide grep of `src/styles` finds no other occurrence (confirms nothing in `_tokens.scss`). `collectMediaConditions` in the live `setupBrowser.ts` (diff lines 383-397) returns one condition per matched gate, no first-match-twice defect.
- **Law sweep**: grep over the full round-2 diff for `any`, non-`as const` type assertions, non-null assertions, suppression comments, `public`/`private`/`protected`, parameter properties, and `.skip` finds only permitted `as const` occurrences (`cl2-diff-2.patch:117,123,131,140,470`) — no violation.

## Extra findings

None. No implementation defect found within the mechanical scope.

## Verdict: accept
