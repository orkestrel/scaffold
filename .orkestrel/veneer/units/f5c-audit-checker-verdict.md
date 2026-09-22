# F5c TOKENS-TRUTH — checker lane verdict (`checker` on Sonnet, 2026-09-22)

Lane: mechanical. Worktree `/home/user/veneer-f5c` at `07fc3c3` plus the unit's writes plus the obligation-4 integration.

- Claim 5 BROKEN as written: `tmp/audit/f5c.diff` has no `src/styles/_tokens.scss` or `_theme.scss` hunk (`grep '^diff --git'` lists `guides/veneer.md`, `src/core/constants.ts`, `src/styles/_mixins.scss`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/tokens.test.ts`); `_tokens.scss:42` and `:89` still declare the `'highlight'` map entry, which `_mixins.scss` reads for `--bs-highlight-bg` (`f5c.diff:157-164`). The `--vn-text-highlight` and `--vn-surface-highlight` custom properties are absent tree-wide (`grep -rn` over the worktree: no matches). Mutation: reverting the `_mixins.scss` rebind would resolve identically because the map entry is unchanged.
- Claim 6 CONFIRMED: `f5c.diff:141-166` is the only `src/styles/**` hunk and carries exactly the highlight-property removals and the `--bs-highlight-*` rebind.
- Claim 8 CONFIRMED: `f5c-status.txt` lists exactly the six files inside the claim's set (extended by the standing conditions' `src/core/constants.ts`); no `tmp/probe/` file.
- Claim 9 CONFIRMED: the banned-term pattern over the diff returns nothing; no growable-set count in the changed prose.
- Claim 7 UNRESOLVED at read time: every located `exit=` line reads `0` (`format:check` to `test:config`) but no `=== gates done` line yet.
- Claims 1, 2, 3, 4, 10 referred to the subjective and objective lanes.

VERDICT: FAIL 5; outside the claims: none
