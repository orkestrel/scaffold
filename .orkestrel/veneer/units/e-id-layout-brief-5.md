# Unit E-ID-LAYOUT round 5 — a title, a holder, and a citation, verbatim

Successor to `e-id-layout-brief-4.md`; the earlier briefs stay in force for every section this one does not restate.
What changed: the round-4 audit (`/home/user/scaffold/.orkestrel/veneer/units/eil-audit-4-verdict.md`), whose three
findings the lanes prescribed as text.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-eil`, which holds rounds 1 to 4.
Read `/home/user/scaffold/AGENTS.md` § Writing and `/home/user/scaffold/.claude/rules/{tests,writing}.md` first.

## Changes

- **L8.** In `tests/src/styles/elements/figure.test.ts`, the case titled
  `ends the figure at the footer edge and starts the next block 16px later inside $holder` is retitled
  `ends $holder at the footer edge and starts the next block 16px after it`. Its assertions stay unchanged.
- **L9.** In `tests/setupStyles.ts`, `FIGURE_IMAGE_CASES`'s second row becomes
  `Object.freeze({ holder: 'a figure the flex utilities turn to a column', attribute: ' class="d-flex flex-column"' })`,
  and its `@remarks` paragraph becomes: "The flex utilities choose a column flow the tag does not write, so the caption
  keeps its 8px space whether block flow or a class-chosen flex column lays the figure out."
- **L10.** In `tests/src/styles/elements/figure.test.ts`, the comment "The figure and figcaption readings come from
  calibration-content.md." becomes "The readings pin the figure's flow and margin and the caption's spacing, size, line
  height, and muted color."
- Off-limits: every other file and line. No git command that writes, no install, no `npm run format`;
  `npm run build:src:styles` is allowed.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Format the three edited files with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`.

1. Apply the three changes.
2. Run `npm run build:src:styles`, then
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/figure.test.ts`, logged
   to `tmp/units/eil-5-owned.log.txt`; the flex-column holder must read the 8px caption space.
3. Mutation: remove `figcaption { margin-top }` from `src/styles/elements/_figure.scss`, rebuild, run the same command
   to `tmp/units/eil-5-mutation-no-caption-margin.log.txt`, then restore the file. Record in that log the file's SHA-256
   digest before the mutation and after the restore, and rebuild. The flex-column holder's case must read red.
4. Run `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:setup`, each logged to
   `tmp/units/eil-5-<gate>.log.txt` with `echo "exit=$?"` appended.
5. Write `git diff ca83afb` to `tmp/units/eil-5.diff` and `git status --short` to `tmp/units/eil-5-status.txt`.

## Output

Return: each change as its before and after text; the owned run and mutation readings with log paths; the gate table
with exit codes and log paths; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if a quoted text is not found
exactly, or if the flex-column holder does not read 8px.

## Acceptance criteria

The three texts read as prescribed; the flex-column holder reads 8px and reads red under the mutation, with matching
digests; every gate exits 0.
