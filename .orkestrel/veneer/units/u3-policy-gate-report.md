# U3-policy gate report (verifier, native Sonnet, through the `veneer-final-rounds-native-lanes` workflow `wf_f0069556-a45`, 2026-09-20)

Scaffold checkout, working tree dirty on purpose (`.claude/rules/styles.md`, `guides/scaffold.md`,
`host.json`, `tests/policy.test.ts`, `tests/setupPolicy.ts`), over the round-8 tree.

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^??'` | 0 | the five files |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 4932ms on 228 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | no findings |
| 4 | `npm run check` | 0 | root and every `check:src:*` scope clean |
| 5 | `npm run build` | 0 | `build-inventory: staged 175 file(s) into host.json` |
| 6 | `npm test` (whole chain) | 0 | last project `Tests 23 passed (23)` |
| 7 | status again and `git diff --stat -- host.json` | 0 | identical status; `host.json | 10 +++++-----` before and after, so the inventory is stable |
| 8 | `node -e` version and engines | 0 | `0.0.75 {"node":">=22.18.0"}` |

No non-zero exit. The round-9 tree needs the same reading again before the release commit.
