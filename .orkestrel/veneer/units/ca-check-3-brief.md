# CAROUSEL (`ca`) round 3 — verification check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether round 3 closes `ca-audit-2-verdict.md` § Rulings (claim 5 with R-A, FADE-IN-CONTRAST, FADE-COMMENT, claim 8 with R-B and REPORT-COUNTS) and nothing else.

## Context

**Evidence, under `/home/user/scaffold/.orkestrel/veneer/units/`.** `ca-3.diff` and `ca-3-status.txt` (the worktree `/home/user/veneer-ca` over `c3ac297`; the diff covers the two owned test files), the report `b-modal-ca-report-3.md`, the brief `ca-brief-3.md`, the reconciliation `ca-audit-2-verdict.md`, and the instruments `ca-instruments-2/` (`tools/cascade-check.mjs`, `tools/cascade-runs.sh`, `logs/cascade/`, `logs/section-mutations/`, `logs/round3-gates/`). Round 2's retained diff `ca-2.diff` is the base for the round delta. The worktree files are read-only for you.

**Law.** `AGENTS.md` § Writing; `.claude/rules/{tests,writing}.md`. Skill: none. A test is named for what it proves.

**Standing condition.** The unit reports that it ran `git stash` and `git checkout` inside its disposable validation copy under `tmp/probe/base` (not the worktree), discarded that copy, and rebuilt it before the final runs; rule on the final logs and on whether the worktree's tracked files are untouched (`ca-3-status.txt` lists the four owned files untracked and nothing modified).

## Unknowns

None.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** `ca-3-status.txt` lists the four owned files untracked and no tracked file modified; `ca-3.diff` against `ca-2.diff` changes only `tests/src/styles/components/carousel.test.ts` (the fade case's comment and the controls comment) and `tests/app/browser/sections/CarouselSection.test.ts` (the case split), with no assertion in `carousel.test.ts` changed and no rule in `_carousel.scss` changed.
2. **The comparator.** `cascade-check.mjs`'s expanded-mode declaration-order comparison includes every shared property, those with a recorded value departure included, and excludes only a property absent from one side; `logs/cascade/` holds green clean expanded and built runs, green restored runs, and red runs for `color-before-position` (`RED DECLARATION-ORDER`), `missing-selector` (`RED MISSING`), `swapped-keys` (`RED ORDER`), `moved-layer` (`RED LAYER`), and `stale-departure` (`RED STALE-DEPARTURE`), each with the mutation surface restored by digest; the round-2 controls (`planted-rule`, `swapped-uri`) still read red.
3. **The case split.** `CarouselSection.test.ts` carries the case `paints the fading carousel's resting slide at full opacity` holding the fading assertion, the contrast case no longer reads the fading specimen, `logs/section-mutations/` shows `fade-class-dropped` reddening the new case alone, the unmutated control green, and every other section mutation reddening only its matrix-named case.
4. **The comments.** The fade case's comment names a fade rule that stops hiding the other slides, a stacking rule that drops the resting slide or either incoming slide, and the outgoing slide's delay dropped; the controls comment names the light, dark, and consumer readings with no "all three".
5. **The gates and the record.** `logs/round3-gates/` holds the scoped `oxfmt --check` and `oxlint --deny-warnings` runs over the two owned test files (exit 0) and the worktree `git apply --check` of `ca-shared-2.patch` (exit 0); the report records the scoped styles and section runs green after `npm run build:src` in the validation copy, states no count of a growable set, names no list item by its position, writes "a regular expression" where round 2 wrote a count, and uses no banned term; the report's matrix row for `.carousel-fade .carousel-item.active` names the new case for `fade-class-dropped`.

## Output

One verdict per claim with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Rule every population whole; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol; rule a claim whose evidence is missing `NOT-EVIDENCED` rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

`ca-3.diff`, `ca-3-status.txt`, the report, and the instrument directory.
