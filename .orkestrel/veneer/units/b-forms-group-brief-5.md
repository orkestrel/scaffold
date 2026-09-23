# Unit B-FORMS-GROUP, round 4 — the journey comment the round-3 checker found spliced

Successor to `tmp/units/b-forms-group-brief-4.md`. What changed and why: the round-3 checker
(`/home/user/scaffold/.orkestrel/veneer/units/bfg-3-checker-verdict.md`) confirmed every replacement
but found the journey comment in `tests/app/browser/integration.test.ts` (around lines 1165 to 1169)
spliced into a run-on by round 3's clause-level replacement, which the brief specified. This round
rewrites that one comment as the sentences fixed here. Nothing else changes.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfg`. Perform the
assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfg`, run every
npm and npx command from there. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The comment block above the input group focus journey's overlap reading reads exactly as § Obligations
writes it, and `npx oxfmt --check tests/app/browser/integration.test.ts`, `npm run check`, and
`npm run test:app` exit 0.

## Context

**Evidence.** `tests/app/browser/integration.test.ts` around 1165 to 1169 currently reads one run-on
sentence that repeats "over the control's trailing border" and joins "so the button and it pulls
back". The geometry: at rest the button sits one step above the control on the group's stacking
levels; the button pulls its leading border back by one border width (`margin-left:
calc(var(--bs-border-width) * -1)`) over the control's trailing border; the control's border is the
browser's own (two columns wide) until the `form-control` key ships, so the button's leading border
paints over the outer column of that border; the focus lift raises the control above the button.

**Law.** `/home/user/scaffold/.claude/rules/writing.md`.

**Installed primitives.** none. **Host.** bash; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
**Measurements.** The round-3 gates exited 0. **Control identifiers.** none. **Standing
conditions.** Touch nothing outside the one comment block.

## Unknowns

none.

## Obligations

1. Replace the whole comment block (every `//` line directly above the overlap reading, from "At
   rest the button sits" through "lifted past it.") with these lines, wrapped at 100 columns with the
   same indentation:
   "// At rest the button sits one step above the control on the group's stacking levels. It pulls
   its leading border back by one border width over the control's trailing border, so the button's
   leading border paints over the outer column of that border until the control is lifted past it.
   The reading below uses the button's own border width, because the control's border is the
   browser's own until the `form-control` key ships its border."

## Scope

**Owned.** `tests/app/browser/integration.test.ts` (the one comment block), `tmp/units/b-forms-group-report-5.md`.
**Shared (report-only).** none. **Off-limits.** every other file and passage.
**What asserts the state this change ends.** nothing asserts comment text; `npm run test:app` runs
the file. **Tools and limits.** Read, Grep, Edit, Bash; scoped `npx oxfmt --check`; no `npm install`.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-group-report-5.md` with the exact diff and the gate exits; return the report
path, the `git status --short` output, and the gate exits.

## Deviation contract

Stop and report if the comment block is not found once. Decide and carry on from the line wrap.

## Acceptance criteria

1. `grep -c "so the button and it pulls" tests/app/browser/integration.test.ts` returns 0 and
   `grep -c "browser's own until the" tests/app/browser/integration.test.ts` returns 1.
2. `npx oxfmt --check tests/app/browser/integration.test.ts` exits 0.
3. `npm run check` exits 0.
4. `npm run test:app` exits 0.

**Observations, not criteria.** none.

## Review evidence

The actual diff and the actual `git status --short`.
