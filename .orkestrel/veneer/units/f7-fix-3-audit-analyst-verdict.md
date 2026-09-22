# F7 CAPTURE brief 3 — `analyst` verdict (GPT-6 Astra, objective lane)

Journal `tmp/codex/f7-fix-3-audit-analyst.jsonl` (swept at acceptance), thread `01a0cab0-5298-7950-8143-b0357197eda9`, exit 0. Brief: `.orkestrel/veneer/units/f7-fix-3-audit-analyst-brief.md`.

1. **CONFIRMED.** [Journey assertions](/home/user/veneer-f7/tests/app/browser/integration.test.ts:834) and [setup assertions](/home/user/veneer-f7/tests/setupBrowser.test.ts:302) independently read the tree and focus sections for their named control. Executed assertion-predicate checks against retained Primary and Toggle artifacts accepted the originals, rejected a tree fallback only through the tree assertion, and rejected a focus fallback only through the focus assertion. The former whole-body assertion accepted the tree-fallback control. These were in-memory artifact checks; the browser mutation evidence comes from the supplied host log.

2. **CONFIRMED.** Comparing the retained [fix-round diff](/home/user/scaffold/tmp/audit/f7-fix.diff:1) with the live diff established that only the assertions at `tests/app/browser/integration.test.ts:834` and `tests/setupBrowser.test.ts:303` changed, apart from diff index hashes. An added-line negative control failed that comparison. The diff against `07fc3c3` names only `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupBrowser.test.ts`, and `tests/setupBrowser.ts`. The brief’s evidence-state description is stale: the checkout is clean at `57cd0e1`, and `f7-fix-3.diff` contains the complete baseline-relative test diff.

3. **CONFIRMED.** The [host control log](/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f7-claim4-control.log.txt:185) records the setup failure at `tests/setupBrowser.test.ts:303`; the journey failures occur at `tests/app/browser/integration.test.ts:834` for every registered variant. No other tests failed. Baseline and restored runs exited 0. The before/after digest matches the independently computed digest of `tests/setupBrowser.ts`. The control script replaces only the tree expression with its fallback.

Findings outside the claims: none.

Attacked and held: fallback text remains correct for a subject without roles or reachable controls, as covered at [tests/setupBrowser.test.ts:308](/home/user/veneer-f7/tests/setupBrowser.test.ts:308). The tightened assertions require control names only for the control-bearing subjects.

VERDICT: PASS