# Retired worktrees archive correction report

The predecessor is retained unchanged as [d7n-retired-worktrees-archive-predecessor.ps1](../pass/d7n-retired-worktrees-archive-predecessor.ps1).

The corrected carrier makes mode mandatory; validates canonical main, registration, common Git storage, reparse paths, metadata, manifest membership, raw snapshots, and live patches. It writes full-index patches, isolates validation outside the immutable archive, and requires archived Git blobs in the specified pushed commit before each removal.

It emits per-target verification and removal success to stdout. No archive mode or removal mode ran.
