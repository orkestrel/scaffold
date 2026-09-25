# Unit E-ID-BUTTON-CASCADE round 5 — two titles, one comment, and instrument coverage

Successor to `ebc-brief-4.md`. What changed: the fix-round audit (`ebc-audit-2-verdict.md`) confirmed the code and
carried claim 2 (the revert probe reads a sample of the reverted longhands, from the objective lane), claim 7's title
clause and F1 (from the subjective lane, whose wording is taken verbatim here), and the subjective lane's referrals R1
and R2 (mutation logs read on the round-2 `.btn` case, and a kill-only log in round 4).

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-ebc`, which holds rounds 1 to 4
uncommitted over `e07b3a6`. The harness environment block may name another worktree as the primary working directory;
start every shell command with `cd /home/user/veneer-ebc &&` and give every file tool an absolute path under it.

## Changes

1. `tests/src/styles/components/accordion.test.ts`: the case titled `writes the recorded accordion selectors and the
   dark icon rule, and no other rule on the accordion classes` is retitled, verbatim:
   `writes the recorded accordion selectors, the dark icon rule, and the button reboot on the header's button form, and no other rule on the accordion classes`.
2. `tests/src/styles/components/carousel.test.ts`: the case titled `writes the recorded carousel selectors and no other
   rule on their classes` is retitled, verbatim:
   `writes the recorded carousel selectors and the button reboot on the controls' and the indicators' button forms, and no other rule on their classes`.
3. `tests/src/styles/elements/button.test.ts`: in the tag proof, the two-line comment beginning `The holder retunes the
   weight and the shadow the surface reads` becomes, verbatim and wrapped by the formatter: `The holder retunes the
   weight and the shadow the surface reads, so a button the surface misses reads the release's reboot and the browser's
   own values instead, which differ from the surface in the weight and the shadow.`
4. Copy `tmp/units/ebc-probe/revert-3.mjs` to `tmp/units/ebc-probe/revert-5.mjs` and widen its `properties` list to
   every longhand the `button-reboot` mixin's properties cover: `padding-top`, `padding-right`, `padding-bottom`,
   `padding-left`; `font-family`, `font-size`, `font-weight`, `line-height`; `color`, `background-color`;
   `border-top-width`, `border-right-width`, `border-bottom-width`, `border-left-width`, `border-top-style`,
   `border-right-style`, `border-bottom-style`, `border-left-style`, `border-top-color`, `border-right-color`,
   `border-bottom-color`, `border-left-color`; the four `border-*-radius` corners; `outline-width`, `outline-style`,
   `outline-color`, `outline-offset`; `box-shadow`; `opacity`; `pointer-events`; `transition-property`,
   `transition-duration`, `transition-timing-function`, `transition-delay`. Keep everything else, reduced motion before
   the first reading included. Run it and log to `tmp/units/logs/ebc-5-probe-revert.log.txt`.
5. The control for item 4: copy `src/styles/_mixins.scss` aside, add `border-right-width: 5px;` after `border: revert;`
   inside the `button-reboot` mixin, run `npm run build:src:styles`, run `revert-5.mjs` to
   `tmp/units/logs/ebc-5-probe-revert-control.log.txt`, restore the file from the copy, confirm its SHA-256 equals the
   value before the plant (record both), and run `npm run build:src:styles` again. The control log must report a
   `border-right-width` difference the item-4 log does not.
6. Run `bash tmp/units/ebc-probe/mutations-3.sh final5 class target important spacing nav state-spacing no-surface`,
   which writes a whole log per mutation, and then `node tmp/units/ebc-probe/kills-3.mjs` over those logs as round 3
   did; retain its output as `tmp/units/logs/ebc-5-mutations.log.txt`. Every mutation must kill at least one case with an
   `AssertionError`, and `important` and `spacing` must kill the `.btn` case under its shipped title.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. No git command that writes, no install, no `npm run format`. Do the items
in order, format the three test files with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`, then run
`npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:src:styles`, each logged to
`tmp/units/ebc-5-<gate>.log.txt` with `echo "exit=$?"` appended. Write `git diff e07b3a6` to `tmp/units/ebc-5.diff`
and `git status --short` to `tmp/units/ebc-5-status.txt`.

## Output

Write `tmp/units/ebc-report-5.md` and return the same text: each item's result; the widened probe's differences, if
any, and the control's `border-right-width` reading with the restore digests; the mutation table (mutation, cases
killed with the message quoted, log path, restore line); the gate table; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if the widened probe reads a
difference the class does not write, if the control does not surface `border-right-width`, if a mutation kills
nothing with an assertion failure, or if a gate reads red. `mutate-3.sh`'s own mutation list decides how each
mutation is planted; if it lacks one this brief names, report that rather than writing a new plant.
