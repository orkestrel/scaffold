# cr audit, objective lane (`analyst` on GPT-6 Astra) — verdict

Journal: `tmp/codex/cr-audit-analyst.jsonl` (swept at acceptance); session id `01a0ce10-95d1-7582-97a3-1eb88197e3e5`; exit 0 under the 1500 s cap; the journal names `gpt-6-astra`. Launcher: `units/cr-audit-analyst.sh`. Brief: `units/cr-audit-analyst-brief.md`. Claims: `units/cr-audit-claims.md`.

1. **CONFIRMED.** The attack for off-scope edits failed. The live diff against `7398772` matches the supplied diff byte for byte. Live status matches [cr-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/cr-status.txt:1): only the authorized setup and integration files changed.

2. **CONFIRMED.** In-memory evaluation verified that [DRIVEN_KEYS:1087](/home/user/veneer-cr/tests/setup.ts:1087) contains the retired tables’ rows in landing order, with the array and every row frozen. The showcase and cascade tables retain their values. The fixed spread appears at [setup.ts:1123](/home/user/veneer-cr/tests/setup.ts:1123). A reversed-order control failed the comparison. The population comment names no member, and the placement explanations survive in the shooting cases, including [integration.test.ts:378](/home/user/veneer-cr/tests/app/browser/integration.test.ts:378), [integration.test.ts:761](/home/user/veneer-cr/tests/app/browser/integration.test.ts:761), and [integration.test.ts:1531](/home/user/veneer-cr/tests/app/browser/integration.test.ts:1531).

3. **CONFIRMED.** I evaluated the tables in memory from the `git show 7398772:tests/setup.ts` output and the worktree. Sorted scenarios and scenario–subject pairs match exactly, including the hashes recorded at [close-registry-report.md:64](/home/user/scaffold/.orkestrel/veneer/units/close-registry-report.md:64). Removing a scenario made the comparison fail. Searching the retired names across the tests and app directories returned no matches. The declaration search returned only the showcase, driven, and capture tables at [setup.ts:318](/home/user/veneer-cr/tests/setup.ts:318), [setup.ts:1087](/home/user/veneer-cr/tests/setup.ts:1087), and [setup.ts:1123](/home/user/veneer-cr/tests/setup.ts:1123).

4. **CONFIRMED.** The export assertion includes the driven table and excludes retired names at [setup.test.ts:48](/home/user/veneer-cr/tests/setup.test.ts:48). The proof assertions distinguish the recorded mutations:
   - Removing the driven spread fails the equality at [setup.test.ts:71](/home/user/veneer-cr/tests/setup.test.ts:71).
   - Appending the resting page-strip row fails the stem/state assertion at [setup.test.ts:104](/home/user/veneer-cr/tests/setup.test.ts:104).
   - Assigning the range-focus scenario to the Page strip subject fails that same assertion.
   - Adding the grow-spinner drive passes the stem check but fails resting-subject membership at [setup.test.ts:125](/home/user/veneer-cr/tests/setup.test.ts:125).

   The exemption reasons and explicit checkbox scenarios remain at [setup.test.ts:114](/home/user/veneer-cr/tests/setup.test.ts:114). The mutation log records the named failures at [cr-mutate.log.txt:1](/home/user/veneer-cr/tmp/units/cr-mutate.log.txt:1). The report records the restored setup run as green at [close-registry-report.md:55](/home/user/scaffold/.orkestrel/veneer/units/close-registry-report.md:55); this lane ran no Vitest project.

5. **CONFIRMED.** The validation and floating selections use specimen-name sets at [integration.test.ts:745](/home/user/veneer-cr/tests/app/browser/integration.test.ts:745) and [integration.test.ts:1048](/home/user/veneer-cr/tests/app/browser/integration.test.ts:1048). By assertion inspection, replacing either selection with an empty result fails its nonempty assertion; omitting a selected validation ring fails the key comparison at [integration.test.ts:767](/home/user/veneer-cr/tests/app/browser/integration.test.ts:767). Filtering out a registered frame also fails the portfolio membership assertion at [integration.test.ts:1670](/home/user/veneer-cr/tests/app/browser/integration.test.ts:1670).

   The reader search found no dependency on the relocated button rows’ positions. The indexed frame read at [integration.test.ts:1840](/home/user/veneer-cr/tests/app/browser/integration.test.ts:1840) still selects the showcase frame. The app run is green in [cr-app.log.txt:10](/home/user/veneer-cr/tmp/units/cr-app.log.txt:10). That run excludes the journey file, as [vite.config.ts:187](/home/user/veneer-cr/vite.config.ts:187) specifies; it does not execute these assertions. The independently executed typecheck exited 0.

6. **BROKEN.** The added comment at [setup.test.ts:101](/home/user/veneer-cr/tests/setup.test.ts:101) places “is” immediately after the `rest` token. This violates the required noun rule at [writing.md:48](/home/user/scaffold/.claude/rules/writing.md:48). Change the phrase to “the `rest` state is”. The added table references at [setup.ts:329](/home/user/veneer-cr/tests/setup.ts:329) and [setup.ts:1080](/home/user/veneer-cr/tests/setup.ts:1080) also need the noun “table” after their links.

   The report additionally miscopies the grow-spinner run: [close-registry-report.md:93](/home/user/scaffold/.orkestrel/veneer/units/close-registry-report.md:93) reports 244 passed, while [cr-mutate.log.txt:21](/home/user/veneer-cr/tmp/units/cr-mutate.log.txt:21) records 245 passed. Correct the report to the recorded result. These findings concern prose and evidence transcription; the mutation still fails the intended assertion.

Findings outside the claims: none.

VERDICT: FAIL 6; outside the claims: none