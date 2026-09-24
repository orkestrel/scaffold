# Unit J-SLIDE audit — the checker lane over the carousel slide fix

## Role and engine

`checker` on Sonnet, a native Claude subagent (Read, Grep, Glob), read-only; the fix was written by the Orchestrator (Opus 5.5), so this lane is the engine the Orchestrator does not share. Perform the assignment directly and spawn nothing.

## Subject

The diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-slide.diff` (the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/slide`, branch `unit/slide` from Veneer `main` `e42b5fa`), with the red reading `j-slide-red.log.txt` (the edited test against the markup without `slide`) and the green reading `j-slide-green.log.txt`. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `writing.md`.

## Claims

1. `app/browser/constants.ts`: the Live carousel specimen's host reads `class="carousel slide"`, and the `ENGINE_SPECIMENS` TSDoc departure bullet no longer says the carousel carries no `slide` class; nothing else in the file changed.
2. `tests/app/browser/sections/EngineSection.test.ts`: `CAROUSEL_CLASSES` is imported from `@src/browser`; the census case admits exactly the cascade-declared tokens plus `CAROUSEL_CLASSES.slide` (a one-member set, not a broader exemption) and asserts the region carries `slide`; its title and comment say so.
3. The carousel case asserts, right after the first click on the next control and before the settle wait, that the second item carries `carousel-item-start` and not `active`; its title names the motion; no mock, spy, or fake timer is added.
4. The red log shows both the census case and the carousel case failing without `slide` (the carousel case on `expected false to be true`), and the green log shows 15 passed.
5. The added lines carry no `any`, `as` assertion, non-null `!` (optional chaining `?.` is permitted), `@ts-` directive, or `eslint-disable`, and no substitution-table term in the added comments.

## Output

A per-claim table (claim, CONFIRMED or FAIL, evidence with file and approximate line) and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
