# Unit AP-COLOR round 2 — the stale journey table, the missing reds, both modes, and the guide's scope

Successor to `ap-color-brief.md`, which stays in force for every section this brief does not restate. What changed: the
round-1 audit (`apc-audit-verdict.md`) held the implementation and carries F1 to F7. No source rule changes.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-1 context in `/home/user/veneer-apc` (uncommitted
over `712ae72`).

## Objective

Every proof the unit added reads red under a named mutation in a retained log, every proof runs in both modes on a
painted canvas, the journey's under-bar table matches the change, and the guide states each tier sentence at its true
scope.

## Context

**Evidence.** Read `/home/user/scaffold/.orkestrel/veneer/units/apc-audit-verdict.md` first, then the three lane verdicts
beside it (`apc-audit-objective-verdict.md`, `apc-audit-subjective-verdict.md`, `apc-audit-checker-verdict.md`). The
journey failure is in `apc-instruments/apc-capture.log.txt`: in each variant, `integration.test.ts` "measures the
composed contrast of every variant and state against its control" reads only `dark|Outline dark|rest` and
`light|Outline light|rest` under the bar, where `UNDER_BAR` (`tests/setup.ts`, around line 3023) lists eight.

**Law.** As round 1. Host as round 1; npm 11 through your `tmp/units/apc-run.sh`.

**Standing conditions.** AP-TYPE's worktree is off-limits as before. The journey project's first run in this worktree
builds its pre-bundle; `tmp/capture/` holds the Orchestrator's capture frames, and a journey run with `CAPTURE` unset
reads them, so run the scoped journey cases below with `CAPTURE` unset and leave `tmp/capture/` in place.

## Unknowns

Whether `matchesColor` separates an oklab hover mix from the sRGB one (F3). Run the mutation and report what it reads.

## Scope

**Owned.** As round 1, plus `tests/setup.ts` (the `UNDER_BAR` table and its remarks only).

**Shared (report-only).** As round 1; rewrite `tmp/units/apc-shared.patch` from the final tree.

**Off-limits.** As round 1, with `tests/setup.ts` narrowed to the table and remarks named above.

## Execution

Perform the assignment directly and spawn nothing.

1. **F1.** `UNDER_BAR` becomes `['dark|Outline dark|rest', 'light|Outline light|rest']`. Its remarks state that each
   outline rest outside the neutral roles paints its on-canvas tier, so only the neutral outlines stay under the bar,
   each on the canvas of its own tone.
2. **F4.** Run the retune proof in each mode, with each override at the scope that declares that mode's theme. Paint the
   body background under the identity, opacity, validation, and anchor fixtures, as the contrast proofs do.
3. **F7.** Add retune assertions for the two remaining paths the departure sentence names: `--vn-color-primary-emphasis`
   retuned at the theme-declaring scope moves `.text-primary`, and `--bs-primary-text-emphasis` retuned on an element
   moves that element's `.text-primary`. Assert too that `--vn-color-primary-emphasis` retuned on an element below the
   theme scope leaves that element's `.text-primary` unchanged while its `.link-primary` moves.
4. **F5.** Replace each tautological assertion with an independent property or delete it: `TEXT_TIER_CASES` against the
   template that built it, `TEXT_TIER_SHARE` against its own literal, `tertiary` pinned to an index, and the
   release-record case comparing each tier key with an inline copy of its own source expression.
5. **F6.** In the guide: delete the count in "the two neutral links"; scope the contrast sentence to the colored links
   outside the neutral roles; scope the identity sentence to "a role class outside the neutral roles and its emphasis
   class"; and state the departure sentence as "retune the `--vn-color-primary-base` fill or the
   `--vn-color-primary-emphasis` token at the scope that declares the theme, or the `--bs-primary-text-emphasis` alias,
   to move the text".
6. **F2 and F3.** Extend `apc-mutate.py` and run each mutation against the named proof, retaining one log each. Each must
   read red, and the report states the reading:
   - the tier at 80 percent in dark: the link rest, link hover, outline rest, and feedback and label contrast proofs;
   - `.text-danger` back on the channel: the identity proof;
   - `.text-primary` back on the channel: the retune proof, in each mode;
   - the dark `'link'` back on the 80 percent mix: the anchor identity proof;
   - the tier-link hover mixed in oklab: the hover proof (report it green if `matchesColor` cannot see it, and then
     tighten the hover assertion until it reads red);
   - each new F7 assertion against the mutation that removes its path.
7. **Report correction.** The round-2 report states which proofs each mutation reddened, with no claim wider than the
   logs.

## Output

Write `tmp/units/apc-report-2.md` and return the same text: each change by file, the mutation table (mutation, proof,
reading, log), the gate table with log paths, and `tmp/units/apc-2.diff` (`git diff 712ae72` over owned files),
`tmp/units/apc-shared.patch`, and `tmp/units/apc-2-status.txt`.

## Deviation contract

As round 1. Stop and report if a named mutation cannot redden its proof without changing the proof's subject.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides` exit 0, each
   logged.
3. `npm run test:journey -- -t "measures the composed contrast"` with `CAPTURE` unset exits 0 in all four variants,
   logged.
4. Every mutation in Execution step 6 reddened its named proof, each logged with the restore byte-identical.
5. `git diff 712ae72 --stat` names only owned and shared files.

**Observations, not criteria.** The whole journey and `npm test`: run neither.

## Review evidence

The Orchestrator supplies `apc-2.diff`, `apc-shared.patch`, `apc-2-status.txt`, the report, and the logs to the round-2
lanes.
