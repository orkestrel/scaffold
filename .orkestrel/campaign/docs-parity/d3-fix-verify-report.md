# Gate report — D3 scaffold-policy verify (after D3-fix)

All commands run from `/home/user/scaffold`, in order.

1. `grep -n "no-malformed-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts` — exit 0. Two wiring lines, two register rows, two wiring-rule entries, matching expected.
2. `grep -rn "no-imperative-summary" ... | grep -v "node_modules\|^./tmp\|^./dist\|^./.orkestrel"` — exit 1, no output. GREEN as expected.
3. `grep -rn "in every sense\|POLICY_PROSE_ROOTS\|stop list\|stop-set\|the voice rules" ...` — exit 1, no output. GREEN. `grep -n "vendored mirror" configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts` — exit 1, no output. GREEN.
4. `grep -n "readPolicyGuide" tests/setupPolicy.ts tests/policy.test.ts` — exit 0. Declaration at `tests/setupPolicy.ts:1430`, two predicate bodies (`tests/setupPolicy.ts:1451`, `:1464`), the import at `tests/policy.test.ts:33`, and the case block at `tests/policy.test.ts:401-405`.
5. `npm run format:check` — exit 0. "All matched files use the correct format." on 222 files.
6. `npm run lint:check` — exit 0. No warnings/errors.
7. `npm run check` — exit 0. `tsc --noEmit` (root, core, server, bin) clean.
8. `npm run test:config` — exit 0. `172 passed | 1 skipped (173)`.
9. `npm run test:policy` — exit 0. `91 passed (91)`.
10. `npm run build` — exit 0. `build-inventory: staged 121 file(s) into host.json`.
11. `sha256sum host.json && npm run build:inventory && sha256sum host.json` — exit 0. Digest before and after: `05d8277e94d4ac2cbefaf0adfddfac64a91770c61fc1070c0b4f9abff4cca264`. Same digest. GREEN.
12. `npm test` — exit 0. Project results: policy `91 passed`, config `172 passed | 1 skipped`, setup `74 passed`, guides `17 passed (17)` (final).
13. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `5 passed (5)`, duration 72.57s.
14. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2` — exit 0. `FILES 58 BLOCKS 709 FLAGGED 0 NODOC 35`. `FLAGGED 0` as expected.
15. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -1` — exit 0. `FILES 80 HITS 0`. `HITS 0` as expected.
16. `git status --short` — exit 0:
```
 M .claude/rules/typescript.md
 M .claude/rules/writing.md
 M .orkestrel/campaign/docs-parity/d3-fix.diff.txt
 M .oxlintrc.json
 M PROPOSAL.md
 M configs/policy.ts
 M guides/scaffold.md
 M host.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```

No red row occurred, so no re-run was needed.

Report written to `/home/user/scaffold/tmp/units/docs-d3-verify-2-report.md`.

Anomalies: none.

GATES: GREEN
