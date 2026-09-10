# Retired worktree archive source review

The independent reviewer returned HOLD on the retained archive carrier. No archive or removal mode ran.

The source review found these concrete failures:

- Windows-native paths cannot match Git's slash-separated registration without common normalization.
- Empty detached-branch output does not provide reliable nullable metadata.
- The removal loop requires a snapshot for the tracked deleted file, although archival creates none.
- Committed-file checks omit recovery metadata and patches.
- FileInfo ancestry needs Directory, and archive/validation ancestry must be checked before reads or creation.
- Verification accepts manifest states outside the declared values.

The reviewer marked the scoped Windows archival, edit recovery, pushed-archive requirement, and repeatable verification claims BROKEN. This is source evidence, not a runtime result. The corrected carrier must receive root Archive/Verify evidence and the wrong-hash refusal before removal.

The effective correction carrier is owned by d7n-retired-worktrees-final-carrier-brief.md. The predecessor remains retained and unexecuted. No package API, release pin, or product gate is reopened.

VERDICT: HOLD
