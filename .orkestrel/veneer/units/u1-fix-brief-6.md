# Unit U1-fix — successor brief 6

## What this supersedes

This brief supersedes `u1-fix-brief-5.md` for one item; successors 1 to 5 stand as
landed. Same role and engine: `builder` on native Sonnet, sole writer in
`C:/Users/mikes/WebstormProjects/veneer` (clean at the successor-5 commit), performing the
assignment directly and spawning nothing. No `git` command that writes.

## Why a successor

Successor 5 reported a contradiction in brief 5's amended ruling and resolved it by comparing the
first and third tokens of a three-token `border-radius`. The ruling's formula was right and its
fixture was wrong: a three-token radius `a b c` sets top-left `a`, top-right and bottom-left `b`,
bottom-right `c`; a right-to-left flip swaps top-left with top-right and bottom-right with
bottom-left, so the side is direction-sensitive when `a` differs from `b` or `c` differs from
`b`. The first and third corners never swap with each other. The fixture
`border-radius:1px 2px 1px / 3px 3px 3px` is therefore flagged (its first side has `a` `1px`
against `b` `2px`), not permitted.

## Fix

1. In `tests/setupStyles.ts`, `matchesRadiusShorthand`'s three-token case returns true when the
   first token differs from the second or the third differs from the second; its TSDoc states
   that rule with the corner mapping.
2. In `tests/setupStyles.test.ts`, move `border-radius:1px 2px 1px / 3px 3px 3px` to the flagged
   fixtures with its returned string; keep `border-radius:1px 1px 3px` flagged and
   `border-radius:1px 1px 1px` permitted; add `border-radius:1px 1px 1px / 2px 1px 2px` as
   flagged (second side `c` `2px` against `b` `1px`) and `border-radius:2px 2px 2px / 1px 1px 1px`
   as permitted.
3. Gates: `npm run format:check`, `lint:check`, `check`, `test:setup`, `test:src:styles`.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `u1-fix-report.md`
(append `## Successor 6`). **Off-limits.** Everything else.

## Output

Append `## Successor 6` to `u1-fix-report.md`: the radius readings and the gate
readings and `git status --porcelain`; return that section.

## Acceptance criteria

1. The gates in step 3 exit 0.
2. `git status --porcelain` lists only the two owned test files.
