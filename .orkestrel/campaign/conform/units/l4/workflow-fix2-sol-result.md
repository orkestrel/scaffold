## Deviation

**Expected:** The abbreviation sweep would find only owned sites.

**Found:** It also found off-limits sites:
- `tests/src/browser/IdleScheduler.test.ts:10`
- `tests/src/core/Runner.test.ts:527`

**Exact evidence:** `grep -rnE "\be\.g\.|\bi\.e\." src tests guides/workflow.md guides/README.md README.md` exited `0` and reported those lines.

**Done:** No files edited. Report and gates not run.

**Hypothesis:** The objective lane omitted these test-comment matches from its site list.