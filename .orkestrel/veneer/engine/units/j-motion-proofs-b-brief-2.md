# Unit J-MOTION-PROOFS-B, round 2 — Carousel dispatches `slid` after both items' motion settles

**What changed from `j-motion-proofs-b-brief.md`, and why.** Round 1 stopped correctly on `Carousel.ts`, which that brief did not grant. When the outgoing item's motion outlasts the incoming item's, `slid` fires with the outgoing motion unfinished (`units/j-motion-proofs-b-report.md` § Deviation state). E32 requires the engine to settle on every element it moves. This round grants `Carousel.ts` for that fix, with its proof and its prose. Round 1 is committed as `0de17f1`, and its report-only patches as `f03690f`.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium, which the Astra bench sandbox cannot start.

## Objective

`Carousel` dispatches `slid` only after every motion the slide starts on the outgoing and the incoming items has finished, whichever lasts longer, in both the slide and the fade variants.

## Context

**Evidence.**
- Round 1's probe `units/j-motion-proofs-b-carousel-order-probe.test.ts.txt` sets the outgoing item's inline duration to twice `readDuration` of the incoming item. At `slid` it reads `[ 'outgoing', 'slid.vn.carousel', 1 ]`: one motion is still unfinished, where 0 is expected.
- `src/browser/Carousel.ts`, in the slide's completion path around line 528: `await settleAnimations(incoming, this.#controller.signal)`. It settles on the incoming item only.
- The pattern to follow is `Modal`'s `#settle` in `src/browser/Modal.ts`, around line 556. It awaits `settleAnimations` on each element it moves, together, under the engine's signal. `settleAnimations` is exported from `src/browser/helpers.ts`.
- Round 1 already owns the order case where the incoming motion lasts longer ("dispatches slid after the incoming item motion when it outlasts the outgoing item motion"). The opposite order is this round's red-first case.
- Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `names.md`, and `browser.md`.
- `engine/decisions.md` § E18, § E24 with every amendment, § E25, § E32 with its amendment, and § E34.
- Skill: none. Guide: `guides/veneer.md` § Carousel.

**Installed primitives.** `@orkestrel/test` for every wait and recorder. Read its declaration under `node_modules/@orkestrel/test` before you write one. A helper whose job an installed export or `settleAnimations` does is a defect.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b`, on `unit/motion-proofs-b` at `f03690f`. Round 1's instruments are still under its `tmp/j-motion-proofs-b/`: `plant.sh`, `plant.py`, `mutate.py`, `mutations.json`, and `probe.sh`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-motion-proofs-b/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any edit, add the outgoing-longer order case to `Carousel.test.ts`, run the file, and record the red reading. It must fail by an assertion.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- `tests/src/styles/elements/button.test.ts` reads red on `main` on this host, as a standing row. It is not this unit's.
- Other units own other files in their own worktrees, and this unit touches none of them:
  - J-SAMEWAY-ENGINES-B owns `Dropdown`, `Tooltip`, `Popover`, and `Placement`.
  - J-ORACLE-FIX-OFFCANVAS owns `Offcanvas.ts` and `Offcanvas.test.ts`.

## Unknowns

- Whether the fade variant's outgoing item, whose opacity drop is delayed, needs its own settle, or is covered by the same two-item settle. Read it, prove it, and report.

## Scope

**Owned.**
- `src/browser/Carousel.ts`: the slide's settle and the comments beside it.
- `tests/src/browser/Carousel.test.ts`.
- `guides/veneer.md` § Carousel: the sentences that say when `slid` fires.
- `src/browser/types.ts`: only the `CarouselInterface` remarks that say when `slid` fires.
- `tmp/j-motion-proofs-b/`.

**Shared (report-only).** `tests/app/browser/sections/EngineSection.test.ts`, if its carousel case reads state right after awaiting animations rather than after `slid`. Return a patch.

**Off-limits.**
- Every other file.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- Any case in `Carousel.test.ts` that expects `slid` before the outgoing motion ends.
- Any sentence in § Carousel or `CarouselInterface` that says `slid` follows the incoming item alone.

Find the rest by running `Carousel.test.ts` and `npm run test:app` after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the measurement's red reading, and the answer to the unknown;
- the files touched;
- the fix, in two sentences;
- the red-first proof: the case title, its red reading at `f03690f` with the assertion that failed, and its green reading;
- the plant run: `Carousel.test.ts` against `plant.sh`'s planted cascade, and the plant's removal;
- a mutation table: settle on the incoming item only, settle on the outgoing item only, and replace the settle with `await Promise.resolve()`, each with its red reading naming an assertion;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the fix needs an off-limits file, or changes when `slide` dispatches or which item takes the `active` token. You decide and record:
- the case title and where it sits;
- whether the fade variant needs its own case.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `slid` follows every motion the slide starts on both items, in the order where the outgoing motion lasts longer and in the order where the incoming motion lasts longer, in both variants. The outgoing-longer case reads red at `f03690f` by an assertion.
3. Under `stageMedia({ motion: false })`, a slide creates no animation, as before.
4. `Carousel.test.ts` passes in a scoped run, unplanted and against the plant. So does `npm run test:app`, because the showcase drives the carousel.
5. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays round 1's and this round's mutations and the plant, and gives the audit lanes both rounds' diffs, the status, both reports, and its replay.
