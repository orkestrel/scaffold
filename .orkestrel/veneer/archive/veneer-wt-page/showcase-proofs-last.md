Stopped under the brief’s deviation contract before implementation. Report written to [showcase-proofs-report.md](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/showcase-proofs-report.md).

- **Expected:** Scaffold’s `tests.md` § Browser tests contains the cited rule requiring CDP pointer cleanup to `(-1, -1)` in each case’s `finally`.
- **Found:** That section contains no pointer-cleanup rule at scaffold HEAD `99ed0deb9b2035ea85927aabed96abb90cbc2c0f`.
- **Evidence:** `rg -n -- '(-1|CDP|finally|park|pointer)' ../scaffold/.claude/rules/tests.md` finds only the browser-API replacement prohibition and an unrelated test-discovery sentence.
- **Done:** Read the brief, contracts, verdicts, page report, and relevant source; verified the required branch and base commit; wrote the report.
- **Not done:** All carried proof repairs, mutations, acceptance gates, captures, and the requested commit. Claim 13’s mutation survivors remain unknown; journey duration is unmeasured.
- **Hypothesis:** The brief and ruling reference a scaffold rule change absent from the sibling checkout.

Commit: none. HEAD remains `7593cfe02fd1bcafe2352fade5546f9812b4b3b2`. `git status --porcelain` is empty. No subagents, push, publication, or installation occurred.