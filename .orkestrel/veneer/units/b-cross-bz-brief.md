# Unit BACKGROUND-SIZE (`bz`) — the accordion and navbar `background-size` readings (D45)

## Role and engine

`builder` on Sonnet, a native subagent in the worktree `/home/user/veneer-bz` (branch `unit/bz` from the
session head `BASE`). The executor that opens this brief is that subagent.

## Objective

The two style proofs that compare a one-value `background-size` by string read it the way D45 rules and
the `tests/src/styles/components/close.test.ts` proof already reads it: the leading term compared to the
expected length, and the second term, where a build writes one, asserted to be `auto`.

## Context

**The ruling.** D45 (`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`) rules that a
style proof accepts every serialization of the same computed value. Chromium 141 serializes a one-value
`background-size` as that one value and Chromium 153 as `<length> auto`. The engine session recorded
both sites as standing rows in `/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` and asked this session to apply
D45's reading to them.

**The sites, at `a9dff19` (re-read at `BASE`).**

- `tests/src/styles/components/accordion.test.ts`: the button's `::after` chevron case asserts
  `readStyle(button, 'background-size', '::after')` equals `'20px'`.
- `tests/src/styles/components/navbar.test.ts`: the toggler icon case asserts
  `readStyle(icon, 'background-size')` equals `'100%'`.
- The pattern to copy is the close control's geometry case in `close.test.ts`: it splits the reading on
  a space, compares the leading term, and asserts the second term is `undefined` or `'auto'`, with a
  comment naming D45.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,writing,typescript}.md`;
skill: none.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build
the styles with `npm run build:src` before running the style proofs. Write every log under the
worktree's `tmp/units/` with the `bz` prefix, and nothing into the session scratchpad or the system
temporary directory.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/components/accordion.test.ts` and `tests/src/styles/components/navbar.test.ts`
(the one assertion in each, and a comment naming D45 beside it).

**Off-limits.** Every other file, including `close.test.ts`, the style partials, the setup files, and
the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-bz/tmp/units/bz-report.md` and the same text as the final message: the
diff; the red run of each changed assertion with its expected length changed to a wrong value; each
gate's command exactly as it ran, its exit, and its result line; `bz.diff` and `bz-status.txt` under
`tmp/units/`. The report states no tally of a growable set and no temporal word, and follows every code
token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when the change needs a file outside
the owned set. Decide, record, and carry on for the comment's wording.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npm run lint:check` exit 0; `npm run check` exits 0.
2. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/accordion.test.ts tests/src/styles/components/navbar.test.ts` exits 0, and
   each changed assertion reddens with its expected length written wrong, retained in
   `tmp/units/bz-red.log.txt`.

## Review evidence

`bz.diff`, `bz-status.txt`, `bz-report.md`, and `bz-red.log.txt`.
