# Unit conform-workflow fix round 2b — the successor to fix round 2: two more abbreviation sites, then everything fix round 2 named

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## What changed and why

Fix round 2 (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/conform-workflow-fix2-brief.md`) stopped, correctly, before editing: its abbreviation sweep found `tests/src/browser/IdleScheduler.test.ts:10` and `tests/src/core/Runner.test.ts:527` outside its Owned scope. The Orchestrator rules both banned (`e.g.` and `i.e.` in test comments) and widens Owned to them. Every other item of fix round 2 stands as written there: read that brief in full and perform its Sites and edits, its Output, and its Acceptance criteria with the two added sites folded into the claim-4 item. Nothing was edited by fix round 2.

## Scope

Owned: everything fix round 2's Scope names, plus `tests/src/browser/IdleScheduler.test.ts:10` and `tests/src/core/Runner.test.ts:527`. Off-limits: every other line, every other edit the unit made, and the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror). Where the abbreviation sweep finds a further site outside this Owned set, record it in the report under a `Sites outside Owned` line with `file:line` and carry on; do not stop and do not edit it.

## Execution, output, deviation contract, acceptance

As fix round 2's, with this successor's Scope in place of its Scope; the report section is `## Fix round 2` and names this successor beside the stopped brief.
