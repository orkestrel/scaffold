# J-SAMEWAY-ENGINES-A round 4 audit — the checker job

## Role and engine

`grok` on Cursor Grok holds the `checker` job: read-only and in ask mode. Perform the assignment directly and spawn nothing. You read files and run no command. Paths are relative to `C:/Users/mikes/WebstormProjects/`.

## Read first

- `scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-claims-4.md`, the claims.
- `scaffold/AGENTS.md`, and `scaffold/.claude/rules/documentation.md` § Parity.

## The subject

- `scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-4.diff` and `j-sameway-engines-a-4-status.txt` in the same directory: the round's change over `dc2a1a7`.
- The files at the tip, which are the worktree copies under `veneer/tmp/worktrees/engines-a/`, committed as `3f62d64` with a clean status: `src/browser/helpers.ts`, `src/browser/types.ts`, `src/browser/HostSnapshot.ts`, `src/browser/Collapse.ts`, `tests/src/browser/index.test.ts`, and `guides/veneer.md`.
- The report `scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-report-4.md`.

## Your claims

Rule claims 4 and 7 only.
- **Claim 4:** for each of `HostChange`, `readHostPriority`, `writeHostValue`, `recordHostChange`, and `rewindHostChanges`, quote the TSDoc description paragraph and the § Surface `Summary` cell, and say whether they are equal. Check that `readHostPriority` appears in the `tests/src/browser/index.test.ts` export list in sorted position.
- **Claim 7:** list the changed paths from the status file against the report's list, and name every path that differs. Search `src/browser/` for any second read of an inline priority (`getPropertyPriority`) outside `readHostPriority`, and for any alias or callback path left in `HostSnapshot`'s write-back.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
