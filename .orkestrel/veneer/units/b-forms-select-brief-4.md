# Unit B-FORMS-SELECT, round 4 — the density sentence split into one idea per sentence

Successor to `tmp/units/b-forms-select-brief-3.md`. What changed and why: the round-3 checker
(`/home/user/scaffold/.orkestrel/veneer/units/bfs-3-checker-verdict.md`) found the density sentence
round 3 prescribed packing three ideas into one semicolon-joined sentence; this round splits it as
written here. Nothing else changes.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfs`. Perform the
assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfs`, run every
npm and npx command from there. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The paragraph in `### Form select classes` that opens "A select with no validation state rescales"
reads exactly as § Obligations writes it, and `npx oxfmt --check guides/veneer.md`, `npm run check`,
and `npm run test:guides` exit 0.

## Context

**Evidence.** `guides/veneer.md:749-752` currently reads one sentence: "A select with no validation
state rescales with the `--vn-factor-density` token as the shipped partials do; a validation state
keeps the release's literal icon geometry, as § Validation classes states, so a validated single-row
select keeps the release's end padding and caret inset at any density; a validated list form
(`[multiple]`, or `[size]` above one row) carries no caret and keeps the list padding, which follows
density. The caret's own `16px 12px` size stays literal."

**Law.** `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/AGENTS.md` § Writing.
**Installed primitives.** none. **Host.** bash; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
**Measurements.** The round-3 gates exited 0. **Control identifiers.** none. **Standing
conditions.** Touch nothing outside the one paragraph; rewrap it at 100 columns.

## Unknowns

none.

## Obligations

1. Replace the paragraph with: "A select with no validation state rescales with the
   `--vn-factor-density` token as the shipped partials do. A validation state keeps the release's
   literal icon geometry, as § Validation classes states, so a validated single-row select keeps the
   release's end padding and caret inset at any density. A validated list form (`[multiple]`, or
   `[size]` above one row) carries no caret and keeps the list padding, which follows density. The
   caret's own `16px 12px` size stays literal."

## Scope

**Owned.** `guides/veneer.md` (the one paragraph), `tmp/units/b-forms-select-report-4.md`.
**Shared (report-only).** none. **Off-limits.** every other file and passage.
**What asserts the state this change ends.** `npm run test:guides` reads the guide.
**Tools and limits.** Read, Grep, Edit, Bash; scoped `npx oxfmt --check`; no `npm install`.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-select-report-4.md` with the exact diff and the gate exits; return the
report path, the `git status --short` output, and the gate exits.

## Deviation contract

Stop and report if the paragraph is not found once. Decide and carry on from the line wrap.

## Acceptance criteria

1. `grep -c 'shipped partials do; a validation' guides/veneer.md` returns 0 and `grep -c 'shipped
   partials do\. A validation' guides/veneer.md` returns 1 (allow the wrap: grep a fragment on one
   line if the sentence boundary wraps).
2. `npx oxfmt --check guides/veneer.md` exits 0. 3. `npm run check` exits 0. 4. `npm run test:guides`
   exits 0.

**Observations, not criteria.** none.

## Review evidence

The actual diff and the actual `git status --short`.
