# Unit B-SWEEP-3 — the sweep's prose

Successor of `tmp/units/b-sweep-brief-2.md` (ran; report `tmp/units/b-sweep-report-2.md`). What
changed and why: the audit round returned the reviewer verdict
(`tmp/units/bsw-audit-reviewer-verdict.md`, `FAIL 6; outside the claims: F1 to F4`) and the analyst
verdict (`tmp/units/bsw-audit-analyst-verdict.md`, `FAIL 3, 6`, both UNRESOLVED on execution the
sandbox could not run). The code holds; four prose findings remain, and this round carries them.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bsw`, a git worktree
detached at `aca0423` carrying the unit's uncommitted writes. Perform the assignment directly and
spawn nothing. Use absolute paths under `/home/user/veneer-bsw` for every command and file, and run
every npm and npx command from `/home/user/veneer-bsw`; your shell may start elsewhere. Do not
commit, push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`,
or `git checkout-index`.

## Objective

The leaf's doc block, the gate's title, and two case titles say what the predicate does and nothing
it does not.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,typescript,writing}.md`.
Design: `tmp/units/b-sweep-design-verdict.md` (D15 ruling 1 states the term: a pattern is one
decision several callers share, so divergence is a defect; a coincidence is two decisions that
agree, so both copies stay inline). Skill: none. Guide: none.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`node_modules` installed, `dist/` present. Sibling units share the container; a timeout is a timing
reading you report. `prettier` must never run; `oxfmt` is the formatter.

## Unknowns

none.

## Obligations

1. **Reviewer F1.** In `tests/setupServer.ts`, the leaf's `@example` comment reads
   `// [] when every intersection the sweep reported is a coincidence, and after a repeated block moves into _mixins.scss`
   (one line; wrap only if the formatter requires it). In `scanStyleBlocks`'s `@example`, call
   `scanStyleBlocks()` on its default rather than with a free `styles` identifier, keeping the
   reading the comment states.
2. **Reviewer F3.** Add one clause to the leaf's `@remarks`, in the block's own voice, naming the
   term and the action: two partials that each record the same external value agree by coincidence
   rather than sharing one decision, so both copies stay inline; a reported intersection is a
   repeated block, and the repair moves it into `_mixins.scss`.
3. **Reviewer F2.** In `tests/setupStyles.test.ts`, the gate case is titled
   `repeats no partial's written declaration block in another partial beyond the coincidence floor`.
4. **Reviewer F4.** In `tests/setupServer.test.ts`, the two case titles carrying the temporal
   `once` read `after a fourth is shared` and `after that block narrows to seven`.
5. Sweep the three owned files for `\b(once|above|below|should|simply|just|easy|easier)\b`,
   case-insensitive, and rule each hit; report the pattern and the hits.

## Scope

- Owned: `tests/setupServer.ts` (the two doc blocks only), `tests/setupServer.test.ts` (the two
  titles only), `tests/setupStyles.test.ts` (the gate title only).
- Off-limits: every other file.
- Tools and limits: Read, Grep, Glob, Edit, Bash. No tree-wide `format`, `lint --fix`, or `build`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, and `npm run test:policy`, all from
`/home/user/veneer-bsw`.

## Output

Write `/home/user/veneer-bsw/tmp/units/b-sweep-report-3.md` and return the same text: the exact
lines changed (before and after), the sweep result, the gate exits with counts,
`git status --porcelain`, and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names. Settle yourself: the clause's exact
wording within the sense stated.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup` and `npm run test:policy` exit 0.
3. `git status --porcelain` lists only the three files.

## Review evidence

The report and the diff.
