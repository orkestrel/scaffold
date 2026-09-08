1. `CONFIRMED` — `tmp/pass/bootstrap-scaffold-path.sh:46-57` validates the resolved `SCR/scaffold-path` target and rejects existing paths and dangling links before worktree creation or `npm`.

2. `CONFIRMED` — `tmp/pass/bootstrap-scaffold-path.sh:62-85` records and checks the exact baseline and campaign branch, creates the detached worktree at the validated target, and runs installation only there.

3. `CONFIRMED` — `tmp/pass/bootstrap-scaffold-path.sh:9-43,62-63,102` records root hashes and state before and after, compares them, and preserves the preceding command exit while failing on preservation errors.

4. `CONFIRMED` — `tmp/pass/bootstrap-scaffold-path.sh:2,75-102` uses fail-closed shell settings, preserves raw stage logs and gate exits, and contains no target deletion, discard-class Git command, secret read, or root installation.

Findings: D1 — The dispatch does not supply the actual diff and repository status required for a code-change audit by the falsification evidence contract. The author report is not a substitute.

Attacked and held: The target-path, occupancy, baseline, branch, isolation, exit-preservation, and forbidden-operation attacks do not break the supplied source.

VERDICT: FAIL none; outside the claims: D1
