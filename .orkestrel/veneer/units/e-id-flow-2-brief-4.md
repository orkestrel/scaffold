# Unit E-ID-FLOW-2 round 3 — the FLOW_MARGIN doc sentence

Successor to `e-id-flow-2-brief-3.md`. What changed: the audit (`flow2-audit-verdict.md`) accepted the code and carried
F1, the `FLOW_MARGIN` doc block's head sentence, to this round, verbatim from the subjective lane.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-flow2`, which holds rounds 1 and 2
uncommitted. The harness environment block may name another worktree as the primary working directory; start every
shell command with `cd /home/user/veneer-flow2 &&` and give every file tool an absolute path under it.

## Change

In `tests/setupStyles.ts`, the doc block above `export const FLOW_MARGIN = '1rem'`: replace the head sentence (the four
lines that begin `Holds the block-end margin Bootstrap 5.3.8's reboot writes` and end `description list, code block,
and figure rules write.`) with this sentence, wrapped at the file's width by the formatter:

> Holds the block margin Bootstrap 5.3.8's reboot writes at the block end of the `p`, `address`, `ol`, `ul`, `dl`,
> `pre`, and `figure` tags and on both block edges of `hr`: the release's `$paragraph-margin-bottom` value, its
> `$hr-margin-y` value, and the literal its address, list, code block, and figure rules write.

Keep the `@remarks` paragraph and the constant unchanged. Change nothing else.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`. No
git command that writes, no install, no `npm run format`.

1. Apply the change, then run `./node_modules/.bin/oxfmt --config .oxfmtrc.json tests/setupStyles.ts`.
2. Run `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/setupStyles.ts` and
   `./node_modules/.bin/oxlint --deny-warnings tests/setupStyles.ts`, each logged to
   `tmp/units/flow2-3-<gate>.log.txt` with `echo "exit=$?"` appended.
3. Write `git diff e07b3a6` to `tmp/units/flow2-3.diff` and `git status --short` to `tmp/units/flow2-3-status.txt`.

## Output

The doc block as it reads after the change, the gate table with exit codes and log paths, and the diff and status
paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if the head sentence is not the
four lines this brief quotes.
