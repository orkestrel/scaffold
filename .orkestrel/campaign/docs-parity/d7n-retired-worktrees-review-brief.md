# Unit d7n-retired-worktrees-review — Review removal safety

## Role and lane

The launch names the lane: reuse the owner's separate reviewer on Astra for independent safety review, or reuse analyst on Sol for objective correctness. Perform the assignment directly and spawn nothing. Read AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, .claude/rules/quality.md, and .claude/rules/writing.md. No dispatch skill applies. The governing specification is d7n-retired-worktrees-archive-brief.md with its correction brief, under tmp/units.

## Subject and decision

Decide whether root can run the archive carrier and remove the expressly authorized retired Scaffold worktrees after the archive is committed and pushed. This is not a product review or a release gate. Do not inspect secrets or run archive/removal yourself.

Read the exact source at C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/foundation-native/d7n-retired-worktrees-archive.ps1. The actual added-file diff is tmp/pass/d7n-retired-worktrees-carrier.diff. Root's git status --short reports only this added campaign instrument. The predecessor was not executed; its correction report sits at tmp/units/d7n-retired-worktrees-archive-correction-report.md. Canonical HEAD is 9eca9cbaa3821017efb7ef8aa9519150bc135fe3 on main. The Windows host runs PowerShell 5.1; Git prints slash-separated worktree paths.

## Already established

Root read each retired worktree's status directly. The path population and HEADs in the authoring brief match that reading. Each base HEAD is an ancestor of canonical main. The initial-layer canonical package checkouts are clean on main and their dist trees remain byte-equal to accepted release extractions. Do not rerun product gates or inspect unrelated fleet packages. No archive or deletion mode has run.

## Claims

1. The carrier can archive the measured Windows worktrees, including the detached worktree and the tracked deleted file, without reading unscoped paths or secrets.
2. The archive preserves raw tracked/untracked edits, the deleted path, base commits, and staged distinction; verification catches source drift and archive-byte corruption.
3. Removal requires the actual archive content in a commit reachable from origin/main, checks exact target containment and worktree identity, and removes no canonical checkout, release artifact, or recovery branch.
4. Repeated verification and removal can finish on the measured host without false refusals caused by path separators, empty detached-branch output, or validation-directory reuse.

Attempt to refute each claim. Report CONFIRMED with the source evidence, BROKEN with the exact state and smallest correction, or UNRESOLVED with the required root-run observation. Label this a source review, not executed proof. Root will run the live checks, including a wrong-hash control, after correction. A substantive finding prevents loss of user edits; do not manufacture findings outside the named claims.

## Unknowns and output

Runtime behavior is unmeasured. Return the bounded source verdict and exact corrections, if needed, as your final response. Do not write files, install, build, commit, push, authenticate, or delete. End with VERDICT: PASS or VERDICT: HOLD.
