# Unit U3 — successor brief 13: six readings become cases

## What changed and why

This brief supersedes `u3-brief-12.md` for the remainder of the unit; briefs 4 to 12
stand except where this brief says otherwise, and `u3-report-10.md` is the baseline. The
ninth audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-9.md`)
confirmed the guard's behaviour on every input either lane tried and refuted one clause: six
readings report 10 records as verified have no assertion in `tests/setupStyles.test.ts`, against
brief 12 acceptance criterion 2. This brief adds those assertions and changes no behaviour.

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. Sole writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing;
no `scaffold repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git add`. Law from
`C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md` and `.claude/rules/tests.md`. The host is
Windows with Git Bash; run every command from the Veneer checkout with `npm run <name>`.

## Context

The working tree is dirty on purpose (the U3 files from the earlier briefs) and stays that way.
`tests/setupStyles.ts` exports `matchesLooseTagPair`, which reads a selector list and returns
whether any complex selector joins two bare tags outside the HTML-mandated pairs, and throws
naming an unread form (`functional list` for `:is(` or `:where(`). Every reading this brief names
already returns the value stated; the analyst executed each against the live file. In the source,
a CSS backslash is written `\\`, a tab `\t`, and a form feed `\f`.

## Scope

**Owned.** `tests/setupStyles.test.ts` and the report. **Off-limits.** Everything else, including
`tests/setupStyles.ts`. The test file's `it` titles and the export inventory list stay as they are.

## Execution

Perform the assignment directly and spawn nothing.

1. **Red proof first.** In the `it` titled `keeps the whitespace an escape owns, and trims only the
   whitespace the walk reads as syntax` (around line 565), directly after the line
   `expect(matchesLooseTagPair('h1\\+p')).toBe(false)`, add
   `expect(matchesLooseTagPair('h1\\2b p')).toBe(true)` — deliberately wrong — and run
   `npm run test:setup`. Record the failing count and the assertion's message. Then correct the
   line to `.toBe(false)`, add `expect(matchesLooseTagPair('h1\\2b  p')).toBe(true)` (two spaces:
   the escape owns the first, the second is the descendant combinator) after it, and run
   `npm run test:setup` again. Record the green count.
2. **The functional-list vectors.** In the `it` titled `refuses a functional list wherever it is
   written, however it is spelled, and reads the same text quoted` (around line 600), after the
   line asserting `:is(h1 .x) p`, add
   `expect(() => matchesLooseTagPair(':is(.title > h1)+p')).toThrow(/functional list/u)` and
   `expect(() => matchesLooseTagPair(':is(h1:has(p)) + p')).toThrow(/functional list/u)`. After
   the line asserting `:not(h1)+p` is false in the same `it`, add
   `expect(matchesLooseTagPair(':not(h1) + p + span')).toBe(true)`.
3. **The form feed.** Find the existing case asserting `matchesLooseTagPair('details summary\\\t')`
   is true (grep the file for `summary\\\\\\t`). Directly after it add
   `expect(matchesLooseTagPair('details summary\\\f')).toBe(true)`.
4. **Gates.** `npm run test:setup`, then `npm run format:check` and `npm run lint:check` (read-only,
   tree-wide, permitted because you are the sole writer). Record each command's final lines.

## Output

Write `u3-report-11.md` and return its content: the six added lines with their final
line numbers; the red proof (command, failing count, the assertion message) and the green run
after it; each gate's final lines; `git diff --stat` and `git status --porcelain` (tracked rows
only); deviations in the usual shape (expected, found, evidence, done or not done, one hypothesis
at most).

## Deviation contract

Stop and report on: a reading that returns a value other than the one this brief states; a gate
red after your own fix inside the owned file; a need to edit an off-limits file. Decide, record,
and carry on from: exact placement inside the named `it` blocks.

## Acceptance criteria

1. The six assertions exist in `tests/setupStyles.test.ts` at the sites named, and
   `tests/setupStyles.ts` is byte-identical to its state before this brief.
2. The red proof ran red on the planted `toBe(true)` and green after the correction, both recorded.
3. `test:setup`, `format:check`, and `lint:check` exit 0.
4. `git status --porcelain` lists report 10's tracked rows exactly, with nothing added.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
