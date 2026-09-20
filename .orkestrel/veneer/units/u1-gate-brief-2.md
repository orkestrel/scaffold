# Unit U1-gate — successor brief 2

This brief supersedes `u1-gate-brief.md` for the fix-round commit; every section of
that brief stands except these amendments. Same role and engine: `verifier` on native Sonnet,
running commands and reporting exit codes, editing nothing.

## Amendments

1. The checkout is at the commit the dispatch message names (the U1 fix-round landing), clean.
2. Insert after step 5 (`npm test`): `npm run test:distribution` on managed Chromium, and record
   its final lines; the registry-gated cases pass or skip as the registry allows, and the two
   cases named `loads standalone styles with the declared cascade order` and `publishes what it
   declares to a real browser, and no more` must pass.
3. Everything else, the Edge steps, the `audit`, the status, and the listing, as before.
