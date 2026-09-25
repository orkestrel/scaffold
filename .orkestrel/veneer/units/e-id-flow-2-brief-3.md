# Unit E-ID-FLOW-2 round 2 — retire the box-reset mixin (relaunch)

Successor to `e-id-flow-2-brief-2.md`, which did not run: its executor stopped because the harness named another
worktree as its primary working directory. This relaunch adds that host fact under Execution and changes nothing else.
`e-id-flow-2-brief-2.md` succeeded `e-id-flow-2-brief.md`. What changed: round 1 moved `hr` off the `box-reset` mixin, which leaves
`_fieldset.scss` its only caller, and `AGENTS.md` folds trivial one-use logic into its caller. The unit returned the
patch; this round grants its files and applies it verbatim.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-flow2`, which holds round 1.

## Change

- `src/styles/_mixins.scss`: delete the `box-reset` mixin (its block and the blank line after it) and nothing else.
- `src/styles/elements/_fieldset.scss`: replace `@include box-reset;` with the two lines `margin: 0;` and `border: 0;`,
  in that order, at the same indentation. If `_fieldset.scss` then uses no mixin, remove its `@use '../mixins'` line.
- Change nothing else. Format both files with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`.

## Execution

Perform the assignment directly and spawn nothing. The harness environment block names a primary working directory
that is not this unit's worktree; that is a harness default, not a routing error. Write only in
`/home/user/veneer-flow2`: start every shell command with `cd /home/user/veneer-flow2 &&` and give every file tool an
absolute path under it. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. No git command that writes, no install, no `npm run format`.

1. Save a copy of `dist/src/styles/index.css`, apply the change, and run `npm run build:src:styles`; then compare the
   compiled `fieldset` rule before and after (`grep -o 'fieldset{[^}]*}'` on both) and record both in
   `tmp/units/flow2-2-fieldset.log.txt`. The declarations must match.
2. Run `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/fieldset.test.ts`,
   then `npm run test:conformance`, `npm run format:check`, `npm run lint:check`, and `npm run test:src:styles`, each
   logged to `tmp/units/flow2-2-<gate>.log.txt` with `echo "exit=$?"` appended.
3. Write `git diff e07b3a6` to `tmp/units/flow2-2.diff` and `git status --short` to `tmp/units/flow2-2-status.txt`.

## Output

Return the before and after `fieldset` rules, the gate table with exit codes, test counts, and log paths, and the diff
and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if the compiled `fieldset` rule
changes or a gate reads red.
