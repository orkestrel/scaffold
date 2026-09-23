# Unit B-FORMS-SELECT, round 3 — the two prose fixes the fix-round audit named

Successor to `tmp/units/b-forms-select-brief-2.md`. What changed and why: the fix-round audit
(`/home/user/scaffold/.orkestrel/veneer/units/bfs-fix-audit-verdict.md`) confirmed every claim but
two: the guide's density sentence overstates the validated exception (a validated list form follows
density), and the token-noun carrier row scopes its sweep by a condition that drops the landed Range
and Validation sections; the Orchestrator ruled D37 (the forced-colours focus indicator is a family
ruling carried by B-FORMS-CLOSE). This round closes exactly those, with the wording fixed here. The
earlier briefs stay in place unedited and bind where this one is silent.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfs` (detached at
`2c10329`, the round-1 and round-2 writes uncommitted in the tree). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-bfs` for every command and file, and
run every npm and npx command from `/home/user/veneer-bfs`. Do not commit, push, install, or run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The sentences under § Obligations read as written there, the report carries the restated ROADMAP
patch, nothing else changes, and `npx oxfmt --check` over the owned files, `npm run check`, and
`npm run test:guides` exit 0.

## Context

**Evidence.** Read by both lanes on 2026-09-23 (line numbers approximate): `guides/veneer.md:749-752`
("A select with no validation state rescales with the `--vn-factor-density` token …; … so a validated
select keeps the release's end padding and caret inset at any density"); the partial's comment at
`src/styles/components/_form-select.scss:24-27` (true as written; extend it by the same bound); the
literal validation geometry at `_validation.scss:69-81` applies only to `:not([multiple]):not([size])`
and `:not([multiple])[size='1']`, so `<select class="form-select is-valid" multiple>` at factor 2
takes `.form-select[multiple]`'s `padding-right: var(--vn-space-6)` (24px against the release's
12px). The report `tmp/units/b-forms-select-report-2.md` § ROADMAP patch: the token-noun row (around
line 144) whose finding cell reads "code tokens without a following noun beyond the sections the
forms units own" and whose action cell reads "sweeps the guide once … giving every code token its
noun"; the B-FORMS row (around line 124) records "its fix round … awaits its fix audit" and names the
worktree.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,styles}.md`;
D37 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

**Installed primitives.** none touched; this unit adds no code.

**Host.** bash; `/home/user/veneer-bfs`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
`prettier` must never run, `oxfmt` is the formatter.

**Measurements.** The round-2 gates exited 0 per `tmp/units/b-forms-select-report-2.md` (the Set
literal and the sibling-absent presence reds stand).

**Control identifiers.** none.

**Standing conditions.** The round-1 and round-2 writes are present and uncommitted; touch nothing
outside the named sentences and the report. Rewrap only a paragraph a changed line lengthens past
100 columns.

## Unknowns

none.

## Obligations

1. `guides/veneer.md` around 749 to 752: bound the consequence to the closed control: "…so a
   validated single-row select keeps the release's end padding and caret inset at any density; a
   validated list form (`[multiple]`, or `[size]` above one row) carries no caret and keeps the list
   padding, which follows density."
2. `src/styles/components/_form-select.scss` around 24 to 27: extend the comment by the same bound
   (the validation state's literal geometry reaches a single-row select alone; the list forms keep
   their token-bound end padding).
3. `tmp/units/b-forms-select-report-3.md`: restate the ROADMAP patch with (a) the token-noun row's
   finding cell reading "code tokens and link text in `guides/veneer.md` that stand without a
   following noun or without `see`" and its action cell naming B-PASSIVE-CLOSE sweeping the whole
   guide once, leaving alone the sections of the units still unlanded at its dispatch (named at
   that dispatch); (b) a new row: "The forms controls' focus indicator under forced colours
   (`.form-select:focus` and `.form-range` write `outline: 0` with a `box-shadow` ring, which forced
   colours do not paint, while `.btn` takes the `focus-ring` mixin's system-colour outline)" carried
   by B-FORMS-CLOSE (D37); (c) the B-FORMS row's audit clause removed (the Orchestrator writes that
   row at the landing).

## Scope

**Owned.** `guides/veneer.md` (the one sentence), `src/styles/components/_form-select.scss` (the one
comment), `tmp/units/b-forms-select-report-3.md`.

**Shared (report-only).** `ROADMAP.md` (the patch restated per obligation 3).

**Off-limits.** every other file and every other passage of the owned files.

**What asserts the state this change ends.** `npm run test:guides` reads the guide; nothing asserts
the comment text.

**Tools and limits.** Read, Grep, Edit, Bash; scoped `npx oxfmt --check` only; no `npm install`; no
git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-select-report-3.md`: the exact diff (this round's hunks), the restated
ROADMAP patch, and the gate exits. Return as your final message the report path, the `git status
--short` output, and the gate exits. No process diary.

## Deviation contract

Stop and report on a source sentence not found once. Decide, record, and carry on from the rewrap.

## Acceptance criteria

1. `grep -n 'at any density' guides/veneer.md` returns the rewritten sentence's line and `grep -c
   'list form' guides/veneer.md` returns at least 1 (paste the results).
2. `npx oxfmt --check guides/veneer.md src/styles/components/_form-select.scss` exits 0.
3. `npm run check` exits 0.
4. `npm run test:guides` exits 0.

**Observations, not criteria.** none.

## Review evidence

A code change: the actual diff and the actual `git status --short`.
