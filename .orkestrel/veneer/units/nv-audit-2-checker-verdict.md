# Audit round 2 — NAV (`nv`), checker verdict (`checker` on Sonnet; claims 1, 3, 7, 8, 9)

**Claim 1: CONFIRMED.** `nv-2-status.txt:1-5` lists exactly the modified `CardSection.test.ts` and the four untracked owned files; `nv-2.diff` changes exactly those; `nv-shared-2.patch`'s `git apply --stat` (`apply-check.log.txt:11-23`) names exactly the thirteen Shared files; the `.navbar-nav` rows in its guide hunk (`nv-shared-2.patch:222-233`) are the base guide's context, not rows the patch carries. "`NavSection.ts` and `CardSection.test.ts` unchanged from round 1" rests on the report (`b-collapse-nv-report-2.md:17-21`) because round 1's `nv.diff` was outside this lane's slice: UNRESOLVED on that point alone.

**Claim 3: CONFIRMED.** `withheld` reads `readDeferrals().filter((row) => row.owner === 'Navbar' && row.name.includes('.nav-link'))` (`nv-shared-2.patch:618-636`); `partition-red.log.txt:33,76,80` shows the round-1 predicate red (`expected Set{...(46)} to deeply equal Set{...(39)}`, `1 failed | 250 passed (251)`, exit 1) and `partition-green.log.txt:31-36` the changed predicate green (`251 passed (251)`, exit 0); the red and green pair distinguishes the mutation.

**Claim 7: CONFIRMED.** Every command and result line is corroborated by its own log under `nv-instruments-2/`: `gate-format.log.txt:8-10`, `gate-lint.log.txt:6`, `gate-check.log.txt:30`, `gate-build.log.txt:57-58`, `gate-setup.log.txt:32-37` (`251 passed`), `gate-styles.log.txt:76-81` (`35 passed`), `gate-sections.log.txt:7-12` (`4 passed`), `gate-conformance.log.txt:11-16` (`22 passed`), `gate-guides.log.txt:11-16` (`19 passed`), `gate-policy.log.txt:11-16` (`109 passed | 1 skipped`), `apply-check.log.txt:1-24` (the copy returned to `c3ac297`, then `apply --check` exit 0).

**Claim 8: CONFIRMED.** The four journey logs each show `1 failed | 38 passed (39)` with the sole failure `matrix > reads the mounted class and style populations with their published controls`, `expected [ 'dropdown', 'dropdown-item' ] to deeply equal []`; no other case fails; the nav journey case passed at every variant.

**Claim 9: CONFIRMED**, with a coverage note. No `any`, `as` beyond frozen literal arrays, `!`, suppression, or nested function beyond callbacks passed directly in `nv-2.diff` and the read hunks; the SCSS reads compatibility variables, tokens, and mixins (the `0.125rem` underline stroke a documented literal); the report states no bare count; a manual banned-term scan over the read material found no hit (not an exhaustive machine sweep). Counts the report states: the quoted result lines, `2.58s`, `10100ms`, `1 failed | 1 passed (2)`, `1 failed | 250 passed (251)`.

Findings outside the claims: none.

VERDICT: PASS
