# Unit E-ID-PROSE — two verbatim prose fixes from the fix-round audits

## Role and engine

`builder` on Sonnet, a native Claude subagent. You write in two worktrees, one after the other, and you are the sole
writer in each: `/home/user/veneer-flow` and `/home/user/veneer-eic`. Read `/home/user/scaffold/AGENTS.md` § Writing and
`/home/user/scaffold/.claude/rules/writing.md` first. No skill applies.

## Objective

Apply two prose fixes the audits prescribed verbatim (`flow-audit-2-verdict.md` F4 and `eic-audit-4-verdict.md` C6,
under `/home/user/scaffold/.orkestrel/veneer/units/`), and nothing else.

## Scope and changes

- **`/home/user/veneer-flow/guides/veneer.md`.** In the § Deferred selectors table, the Reason cell of each of the
  `ol ol`, `ul ul`, `ol ul`, and `ul ol` Excluded rows contains "keeps the list's `1rem` bottom margin". Replace that
  phrase with "keeps the list's `--vn-space-8` bottom margin" in all four cells, and change nothing else in them. Then
  run `./node_modules/.bin/oxfmt --config .oxfmtrc.json guides/veneer.md`.
- **`/home/user/veneer-eic/tests/src/styles/elements/samp.test.ts`.** The comment sentence "The samp element wears the
  chip the code, kbd, and var elements wear." becomes "The `samp` element wears the chip the `code`, `kbd`, and `var`
  elements wear." Keep its comment markers and line wrapping within the formatter's width.
- **`/home/user/veneer-eic/tests/src/styles/elements/var.test.ts`.** The comment sentence "The var element wears the
  chip the code, kbd, and samp elements wear." becomes "The `var` element wears the chip the `code`, `kbd`, and `samp`
  elements wear."
- Off-limits: every other file. No git command that writes, no install, no build, no `npm run format`.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.

1. Apply the three edits.
2. In `/home/user/veneer-flow`: run `npm run format:check` and `npm run test:guides`, each logged to
   `tmp/units/prose-<gate>.log.txt` with `echo "exit=$?"` appended.
3. In `/home/user/veneer-eic`: run `npm run format:check` and `npm run lint:check`, each logged the same way under
   `tmp/units/`.
4. Write `git diff` of each edited file to `tmp/units/prose.diff` in its worktree.

## Output

Return: each edit as its before and after line; the gate table with exit codes and log paths; and the two
`tmp/units/prose.diff` paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if a phrase is not found exactly
as quoted.

## Acceptance criteria

The four cells and the two comments read the prescribed text; every gate exits 0; `git diff` shows no other change.
