# Unit E-ID-BUTTON-CASCADE round 4 — apply the verified `.btn` state patch

Successor to `ebc-brief-3.md`. What changed: round 3 stopped on item 3 under its deviation contract, because `.btn`
under keyboard focus reads `outline-offset: 0px` on a button and `1px` on the anchor. The Orchestrator re-ran the
unit's probe (`tmp/units/ebc-probe/btn-focus-3.mjs`): the same split reads under the built cascade, the pre-change
cascade, Bootstrap 5.3.8's stylesheet, and no stylesheet, and the outline style reads `none` on both `.btn` forms, so
the offset is Chromium's user-agent default for a focused link and paints nothing. Ruling: apply the unit's patch,
which records that offset as an expected difference under focus with the browser named as its cause.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-ebc`, which holds rounds 1 to 3
uncommitted over `e07b3a6`. The harness environment block may name another worktree as the primary working directory;
start every shell command with `cd /home/user/veneer-ebc &&` and give every file tool an absolute path under it.

## Change

Apply `tmp/units/ebc-3-btn-states.patch` with `git apply` and change nothing else. It edits `tests/setupStyles.ts`
(`BUTTON_FORM_CASES` gains `name` and `disabled`; `BUTTON_FORM_DIFFERENCES` becomes a record keyed by state) and
`tests/src/styles/elements/button.test.ts` (the `.btn` forms case reads each enabled form hovered, pressed, and
keyboard-focused, and is retitled).

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. No git command that writes, no install, no `npm run format`.

1. `git apply --check tmp/units/ebc-3-btn-states.patch`, then `git apply tmp/units/ebc-3-btn-states.patch`, then
   `./node_modules/.bin/oxfmt --config .oxfmtrc.json tests/setupStyles.ts tests/src/styles/elements/button.test.ts`.
2. Run `bash tmp/units/ebc-probe/mutate-3.sh state-spacing` and copy its log to
   `tmp/units/logs/ebc-4-mutation-state-spacing.log.txt`; confirm the restore line reads byte-identical and the `.btn`
   forms case fails with an `AssertionError`.
3. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles`, `npm run test:setup`,
   and `npm run test:guides`, each logged to `tmp/units/ebc-4-<gate>.log.txt` with `echo "exit=$?"` appended.
4. Write `git diff e07b3a6` to `tmp/units/ebc-4.diff` and `git status --short` to `tmp/units/ebc-4-status.txt`.

## Output

The `.btn` case's new title, the `state-spacing` kill with its message quoted and the restore line, the gate table with
exit codes and log paths, and the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if the patch does not apply,
if `state-spacing` does not kill the `.btn` case with an assertion failure, or if a gate reads red.
