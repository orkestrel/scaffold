# Unit d7n-retired-worktrees-archive-correction — Complete archive checks

Use builder on Terra. Read d7n-retired-worktrees-archive-brief.md and its rules; its objective, ownership, execution limits, and output shape remain binding. Perform the assignment directly and spawn nothing. No dispatch skill applies. Do not execute archive or removal modes.

Correct the carrier returned under the predecessor brief. Root read the actual script and found required checks absent. These are omissions against the predecessor brief, not scope additions.

- Make Mode mandatory. Remove unused WriteLog.
- Validate canonical branch main and exact worktree registration before reading a target. Validate the registration's HEAD/branch or detached marker. Resolve git-common-dir correctly whether absolute or relative.
- Check path ancestors through the filesystem root for reparse points, including source-file ancestors and archive destinations before reading or writing. Keep exact, ordinal containment and fixed target names. A file or parent pointing elsewhere must stop the carrier.
- Use --full-index as well as --binary for every patch.
- Verify the manifest population exactly equals Target.Paths, with no duplicate or omitted path. Restrict state to present/deleted, pin the deleted path to scripts/docs.ts in the guides-entry target, and validate saved HEAD/branch/status/index metadata against the source.
- Hash the snapshot file itself AND the source file against the manifest hash. The predecessor only hashed source, so snapshot corruption could survive.
- Re-capture each live source patch to a dedicated validation directory outside the archive and compare its bytes/hash with the archived patch. The predecessor only compared the archive's patch to its own stored hash. Root-owned runs may create tmp/pass/d7n-retired-worktrees-validation for this narrow purpose; refuse existing conflicting content and never delete unrelated paths.
- Before Remove, require the specified commit to contain all archived files, compare each archived working file with its Git blob at that commit, and require the commit to be an ancestor of origin/main. A reachable old commit without the archive must fail. Do not mutate archive logs during verification; put run logs outside the immutable archive.
- Run VerifyTarget immediately before each actual removal, not merely AssertTarget. After removal require path absence and registration absence; after the loop require canonical main still checked out. Stop on failure, with no broad deletion fallback.
- Record per-target success on stdout so root can capture a durable run log; remove verification writes inside the immutable archive. Retain archive logs only if they are immutable metadata captured at creation.

Write tmp/units/d7n-retired-worktrees-archive-correction-report.md and update the owned carrier. Retain the predecessor report. Return parser evidence and explicitly map the repaired checks to the predecessor omissions. Root supplies the exact carrier to the independent reviewer before live execution.
