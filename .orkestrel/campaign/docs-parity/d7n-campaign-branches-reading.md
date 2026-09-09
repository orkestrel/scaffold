# Working checkout branches

The read-only canonical-checkout audit on 2026-09-09 found scaffold and every pass
package on claude/orkestrel-npm-audit-deps-14ibta. No checked-out branch differed from
the expected campaign branch. The audit made no branch or working-tree change.

Scaffold's checked-out tip was 0e697e1727faeda5b4a1e02807b190cb066bc40c. Root had
pushed that campaign record to the working branch, remote main, and
claude/docs-parity-windows-01a0810d. Product changes remain local and uncommitted.
Remote-tracking main values in the TSV are cached readings, not a fresh fleet fetch.

Root subsequently fetched Guide and scaffold. Each fetch exited 0, and each
merge-base --is-ancestor origin/main HEAD check exited 0. Their active campaign
branches contain the fetched main history; no merge or branch switch was needed.

The owner prefers main for release work. Ruling 36 keeps active units on their
current branch and moves each settled checkout to main before publication. Pushing
remote main alone does not change the branch shown by WebStorm.
