# Unit AP-COLOR round 3 — one title, two proofs, three sentences

Successor to `ap-color-brief-2.md`, which stays in force for every section this brief does not restate. What changed:
the round-2 audit (`apc-audit-2-verdict.md`) held the implementation and every mutation, and carries H1 to H6. No source
rule changes.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-2 context in `/home/user/veneer-apc`.

## Objective

Each test is titled for every property it proves, the two unproven clauses have executed proofs with retained reds, and
the guide and the report say no more than the code and logs.

## Context

**Evidence.** Read `/home/user/scaffold/.orkestrel/veneer/units/apc-audit-2-verdict.md` and the three lane verdicts
beside it. Law, host, and standing conditions as round 2.

## Unknowns

None.

## Scope

As round 2.

## Execution

Perform the assignment directly and spawn nothing.

1. **H1.** Split the retune `it.each` into focused cases, each titled for the path it proves: the fill and the body text
   at the theme scope move the role color; the emphasis token at the theme scope and the alias on the element move it;
   the emphasis token below the theme scope leaves the role color and moves the colored link; the role channels and the
   density factor leave it. Keep every assertion.
2. **H6.** Add a proof, in each mode on the painted canvas, that `.text-<role>-emphasis` with `.text-opacity-50` paints
   an opaque color for every tier role, and that `.text-<role>` with `.text-opacity-50` does not.
3. **H5 and H6, reds.** With `apc-mutate-2.py`, run the `.text-danger` channel mutation against the release-record case,
   and a mutation giving the emphasis class the opacity variable against the H6 proof; retain both logs.
4. **H3.** In the guide's anchor proof sentence, write: "…against the recorded readings of `--vn-link-base` and
   `--vn-link-hover-base`, and its resting color against the `.text-primary` class in each mode."
5. **H4.** Split the retune proof sentence in § Color utilities so each sentence carries one idea, as the round-2
   subjective verdict's G2 proposes, and rewrap the paragraphs it names to the guide's width.
6. **H2.** The round-3 report states that the theme-dependent color overrides sit on the theme scope, the density control
   keeps its root override with its `finally` cleanup, and the F7 overrides sit on descendants by design.

## Output

Write `tmp/units/apc-report-3.md` and return the same text: each change by site, the two new mutation logs, the gate table
with log paths, and `tmp/units/apc-3.diff` (`git diff 712ae72` over owned files), `tmp/units/apc-shared.patch`, and
`tmp/units/apc-3-status.txt`.

## Deviation contract

As round 2.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides` exit 0, each
   logged.
3. The two mutations in Execution step 3 each redden their named proof, each logged with the restore byte-identical.
4. `git diff 712ae72 -- src` still equals the `src/` hunks of the round-1 `apc.diff`.

**Observations, not criteria.** The journey and `npm test`: run neither.

## Review evidence

The Orchestrator supplies `apc-3.diff`, `apc-shared.patch`, `apc-3-status.txt`, the report, and the logs to the round-3
lanes.
