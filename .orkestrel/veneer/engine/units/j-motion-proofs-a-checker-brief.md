# J-MOTION-PROOFS-A audit — the checker job

## Role and engine

`grok` on Cursor Grok holds the `checker` job: read-only and in ask mode. Perform the assignment directly and spawn nothing. You read files and run no command. Paths are relative to `C:/Users/mikes/WebstormProjects/`.

## Read first

- `scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-a-audit-claims.md`, the claims.
- `scaffold/.orkestrel/veneer/engine/decisions.md` § E32 with its amendment.

## The subject

- `scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-a.diff` and `j-motion-proofs-a-status.txt` in the same directory.
- The worktree copies under `veneer/tmp/worktrees/motion-proofs-a/`, committed as `beb7cd8` with a clean status: `tests/src/browser/Modal.test.ts`, `Offcanvas.test.ts`, `Backdrop.test.ts`, `Alert.test.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`.

## Your claims

Rule claims 1, 6, and 7 only.
- **Claim 1:** list every line in the four owned test files that compares a duration, an easing, or a transition property name against a literal: a `'…s'` or `'…ms'` string, an easing keyword, or a property name compared to `transitionProperty` or `transitionDuration`. Name each line that pins a value the cascade owns. Name each line that sets up a condition with a comment saying so.
- **Claim 6:** search `veneer/tests/`, `veneer/src/`, and `veneer/app/` for `transitionDuration` and for a `parseFloat` of a time. List each hit outside `readDuration`. Confirm `readDuration` is in the export list in `tests/setupBrowser.test.ts`.
- **Claim 7:** list the changed paths in the status file. For `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, confirm that the diff's hunks touch `readDuration` alone.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
