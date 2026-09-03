# Unit FX2e — measure the content edge, converge on it, and shoot at its exact height

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\test`. Perform the assignment
directly and spawn nothing.

## Objective

Make `captureFrame` settle on a document whose height converges under a viewport-bound rule, in
few restagings, without adding canvas rows to a frame, and keep the refusal for a document that
never settles.

## Context

Law: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/architecture.md` (an exported measurement helper
lives in `src/browser/helpers.ts` and is tested). TTTDD with the failing proof first. Host:
Windows 11, Git Bash; Playwright Chromium installed. Baseline `e13f5d5`, tree clean.

**What FX2d measured** (`tmp/units/fix-capture-overshoot-report.md`, read it in full):

- The body's box is `max(content, pane)`: a static 1600-row document under a 2356 pane reads a
  2356 box and shoots a 2356-row frame. Every box and scroll reading clamps up to the pane; the
  last content element's bottom edge stays at 1600. So an overshoot on the box reading adds
  canvas rows, and a descent on it never comes back down.
- A rule bound to half the viewport plus 900 fixed rows converges on 1800 with ratio one half;
  plain restaging reads 1322, 1561, 1681, 1741, 1771, 1786, 1793, 1797 and the shipped bound
  refuses at `1741 over a 1681 pane`. Terrain's populated schedule refused at
  `1716 over a 1712 pane` after 1675, 1694, 1712.

## The mechanism

1. **Measure the content edge, not the box.** Export `measureContent(): number` (name it for
   what it returns; `names.md` governs) that reads, in document coordinates, the ceiling of the
   largest bottom edge over every element in `document.body` (`querySelectorAll('*')`, each
   `getBoundingClientRect().bottom + window.scrollY`), plus the body's and the root's own
   bottom padding and margin from computed style, and never less than the variant's declared
   height. Prove with the static fixture that it reads 1600 under an 844 pane and under a 2356
   pane alike, and with a fixture whose last element carries a bottom margin and the body a
   bottom padding.
2. **Converge with an overshoot on that reading.** Loop: `covered = measureContent()`; where
   `covered <= pane` and `pane === covered`, stop; otherwise stage the next pane at
   `covered + max(0, covered - pane)` (the last growth as the overshoot), re-measure, and continue
   while `covered` still moves, bounded by `CAPTURE_STAGINGS` (raise it to the value the
   near-half fixture needs and record the reading).
3. **Shoot at the exact height.** Before the shot, stage the pane at `covered` exactly and
   re-measure once; where the reading still exceeds the pane by more than the bound's last step
   allows, refuse with the existing never-settled voice. The frame then reads back at the
   content's height for a static document, and at the fixed point for a converging one, with no
   canvas rows.

## Proofs, red before and green after

- The near-half converging fixture from FX2d settles and its frame reads back at 1800 with the
  fixture's floor: red today with the refusal message quoted above.
- The static 1600-row fixture's frame reads back at exactly 1600 rows under the new loop: a
  control that the overshoot adds no rows (assert equality, not `>=`).
- The fractional and reflow cases and every existing capture case stay green.
- The runaway fixture (uncapped `100vh` plus a trailing block) still reaches the refusal.
- `measureContent` cases: static under two panes; trailing margin and body padding counted.

## Documentation

TSDoc for `captureFrame`, `measureContent`, and `CAPTURE_STAGINGS`; `guides/test.md`: the
`measureContent` surface row, the coverage paragraph rewritten to the content edge, the
overshoot, the exact final staging, the bound's reading, and a transcribed fence where a value is
printed; `tests/guides.test.ts` for that fence.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/constants.ts`, `src/browser/types.ts` if a type
is needed, `tests/src/browser/helpers.test.ts`, `guides/test.md`, `tests/guides.test.ts`,
`tests/setup.ts` for `ROUTED_FENCES`. **Off-limits.** Every other file; `package.json`; commits;
no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/fix-capture-edge-report.md` and return it: the content-edge readings, the
convergence sequences with the overshoot, the change, the red-then-green commands and counts,
`git diff --stat`, `git status --porcelain`, scoped gates (`format:check`, `lint:check`, `check`,
`test:src:browser`, `test:guides`, `test:policy`), claims not closed.

## Deviation contract

Stop and report when the content edge cannot be read stably (a fixture where it moves with the
pane on a static document), or when a proof cannot be made to fail before the change. Decide
and record fixture shapes, the bound's value, and names.

## Acceptance criteria

1. The near-half fixture settles with a 1800-row frame; the static fixture's frame is exactly
   1600 rows; the runaway refusal still fires.
2. `measureContent` is exported, documented, and tested.
3. Scoped gates green; every existing capture case still passes.
