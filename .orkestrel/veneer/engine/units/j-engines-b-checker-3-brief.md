# J-SAMEWAY-ENGINES-B round 3 audit — the checker job

## Role and engine

`grok` on Cursor Grok holds the `checker` job: read-only and in ask mode. Perform the assignment directly and spawn nothing. You read files and run no command. Paths are relative to `C:/Users/mikes/WebstormProjects/`.

## Read first

- `scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-audit-claims-3.md`, the claims.
- `scaffold/AGENTS.md` and `scaffold/.claude/rules/tests.md`.

## The subject

- `scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-3.diff` and `j-sameway-engines-b-3-status.txt` in the same directory.
- The worktree copies under `veneer/tmp/worktrees/engines-b/`, committed as `87dc147` with a clean status: `src/browser/Dropdown.ts`, `src/browser/Tooltip.ts`, `src/browser/Popover.ts`, `src/browser/Placement.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`.
- The report `scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-report-3.md`.

## Your claims

Rule claims 6 and 8 only.
- **Claim 6:** find the declarations of `DROPDOWN_WRITE_BACKS` and `TOOLTIP_DESCRIPTIONS` in `tests/setupBrowser.ts`. Say whether each is frozen, and whether each is in the export list in `tests/setupBrowser.test.ts`. Name any case matrix the diff declares inline in `tests/src/browser/Dropdown.test.ts`, `Tooltip.test.ts`, or `Popover.test.ts`.
- **Claim 8:** list the changed paths in the status file against the report's list, and name each that differs. Confirm that `Popover.ts` and `Placement.ts` are absent from the diff. Search the diff for `#revert`, for a fixed `'false'` or `'true'` write in a returning step, and for any alias of a removed name.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
