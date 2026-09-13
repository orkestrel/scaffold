# Implementation brief — U-fix-6b (successor of U-fix-6, same unit, same writer)

## What changed and why

U-fix-6's item 3 named two spans in the `@types/node` row and left a third, which the unit
reported correctly: "declares a `22.18.0` floor" carries a backticked version in running prose.
This successor names it. The U-fix-6 brief and every other item stand; the working tree already
carries U-fix-6's edits and this unit keeps them.

## Item

In `ROADMAP.md`, in the `@types/node` row: "declares a `22.18.0` floor" → "declares a 22.18.0
floor". Change nothing else.

## Owned files

`ROADMAP.md`.

## Execution and deviation contract

As `u-fix-6-brief.md`. Stop and report if the target is not found verbatim.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run test:policy` exits 0.
3. `grep -c 'declares a 22.18.0 floor' ROADMAP.md` reads 1.
4. `grep -n '`[0-9][0-9.x]*`' ROADMAP.md` prints no line between the line of the row beginning
   "npm 10.9.7 and every npm" and the line of the row beginning "**abort**".

## Output

Each criterion with its exact reading; the edited clause verbatim; the deviation state.
