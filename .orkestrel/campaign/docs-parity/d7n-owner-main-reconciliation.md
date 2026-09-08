# Owner-main reconciliation

The refreshed campaign branches contain the owner-main commits. No incoming main
commit remains to merge. The Orchestrator fetched origin for each named checkout
on 2026-09-08 and read these refs before the probe test landing.

| Package | Campaign HEAD | origin/main | Reading |
| --- | --- | --- | --- |
| contract | fd3fce2 | fd3fce2 | identical; clean |
| mcp | a01d5e8 | 292c966 | main is an ancestor; clean |
| probe | 135aab7 | b816749 | main is an ancestor; resumed test diff remains uncommitted at this reading |
| database | cdbf66a | 57eb898 | main is an ancestor; clean |

For each checkout, git -C with its explicit path ran fetch origin, rev-parse HEAD
origin/main, merge-base --is-ancestor origin/main HEAD, log --oneline HEAD..origin/main,
log --oneline origin/main..HEAD, and status --short. Fetch and ancestry exited 0.
The incoming log was empty for each checkout.

Contract already has the same source tip on the campaign branch and main. The mcp
owner merge landed in this continuation as a01d5e8 and passed its scoped checks.
Probe's retained 135aab7 and database's retained cdbf66a already merge their owner main.
The content comparison is complete. The evidence scout's returned map is retained in
d7n-owner-main-reconciliation-scout-result.txt, session b55e6a24-c10e-4d03-bf44-521a5c1a3b1c.

The mcp owner-fixed MCPLegacy implementation and its test file are byte-identical to
origin/main. Its legacy progress-stream guide wording remains present. Probe's owner-fixed
TypeStage and bin handshake tests are byte-identical to origin/main, and the corresponding
guide explanations remain. Database retains the owner's iterative aggregate-extrema body,
pressure and signed-zero tests, guide paragraph, and updated toolchain ranges. Its remaining
source differences at the owner-fixed helper are documentation only.

The scout found the remaining src differences in mcp, probe, and database confined to
doc blocks and comments. Campaign guide, parity-test, manifest, and version changes remain
intentional branch differences. No corrective merge or runtime edit is required by this
comparison. Probe's resumed test-draft diff was inspected separately and later landed as
93fc01d; it does not modify the owner-fixed test paths.

This report establishes source-branch state, not registry publication. No package was
published or re-pinned as part of this check.
