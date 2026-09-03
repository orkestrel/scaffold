# Unit FX2d — overshoot the pane so a converging document settles in few restagings

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\test`. Perform the assignment
directly and spawn nothing.

## Objective

Make `captureFrame` settle on a document whose height converges geometrically under a
viewport-bound rule, without loosening the refusal for a document that never settles.

## Context

Law: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`. TTTDD with the failing proof first. Host: Windows 11, Git Bash;
Playwright Chromium installed; browser tests through
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser <file>`.
Baseline `e13f5d5`, tree clean.

**Finding, measured in terrain on the build from `e13f5d5`** at `390x844`, on the populated
schedule:

```text
Capture frame at ../../../tmp/capture/states/schedule-populated--light-390.png never settled after 3 restagings: 1716 over a 1712 pane
```

The sequence of covered heights ran 1675, 1694, 1712, 1716: a viewport-bound rule adds a
shrinking increment at each restaging, so the document converges but not within the bound. The
empty schedule (1191 to 1192) and every 1280 frame settle at once. The refusal itself is right;
the bound and the step are what fail a real page.

**The mechanism to use.** The provider clips the shot to the body's box, and the pane's only
job is to paint that box, so a pane taller than the body adds no rows to the frame
(`fix-terrain-report.md` § F2 measured the frame height following the body box, not the pane).
Restaging can therefore overshoot: stage at the covered height plus the growth the last
restaging produced (`covered + (covered - pane)`, never less than `covered`), so a converging
document is inside the pane after one or two restagings while a runaway document still
outgrows every pane and reaches the refusal. Keep `CAPTURE_STAGINGS` as the bound; raise it
only if a converging fixture with a ratio near one half still needs it, and record the reading
that decided the value.

## The change

1. In `captureFrame`'s loop, compute the next pane as the overshoot described, and keep the
   measurement at one site.
2. Proofs, red before and green after, in the browser suite:
   - a fixture converging geometrically with a ratio near one half (a rule adding about half of
     each pane growth back as height, capped by a media query so it settles in principle) that
     needs more than three plain restagings: green with the overshoot, red without it (record
     the refusal message it produced before the change);
   - the existing reflow case (ratio well under one half) and the fractional case stay green;
   - the runaway refusal stays: the uncapped fixture still reaches
     `Capture frame at <path> never settled after <n> restagings: <h> over a <h> pane`;
   - the frame of the overshoot case reads back at the body's height, not the pane's, proving
     the overshoot adds no rows.
3. TSDoc and guide: the coverage paragraph states the overshoot and why it adds no rows, and
   the bound's reading.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/constants.ts` (the bound's value and doc),
`tests/src/browser/helpers.test.ts`, `guides/test.md`, `tests/guides.test.ts` where a fence is
transcribed. **Off-limits.** Every other file; `package.json`; commits; no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/fix-capture-overshoot-report.md` and return it: the converging fixture's
sequence with and without the overshoot, the change, the red-then-green commands and counts,
`git diff --stat`, `git status --porcelain`, scoped gates (`format:check`, `lint:check`, `check`,
`test:src:browser`, `test:guides`, `test:policy`), claims not closed.

## Deviation contract

Stop and report when the overshoot adds rows to a frame (the frame height exceeds the body's
box), or when a proof cannot be made to fail before the change.

## Acceptance criteria

1. The near-half converging case is red before and green after; the runaway refusal still fires.
2. The overshoot case's frame height equals the body's box, proved.
3. Scoped gates green; every existing capture case still passes.
