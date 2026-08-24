# Unit PD4-FIX — the identical-control refusal compares bytes, not digests

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. Fix round adopting the analyst's prescription; keep it minimal. The working tree
carries PD4 uncommitted — you continue on the same files.

## The findings (analyst audit of PD4)

1. `#admit` (`src/server/Probe.ts` ~616) compares through `computeDigest`, which NORMALIZES
   every absolute-looking string before hashing (`src/server/helpers.ts` ~620-655). Proven
   collision: candidate texts `//WORKSPACE/x` and `///WORKSPACE/x` differ by one byte yet
   digest identically, so a non-identical control is refused. Replace digest equality with
   direct byte comparison of the projection (each draft's `path` and `text`, plus the test's
   `path` and `text`).
2. The TSDoc/comment claim "before any stage runs" is false — construction starts arming and
   boot inspections before `prove` can be called. The true property: NO STAGE INSPECTS THIS
   CLAIM. Reword.
3. The near-miss negative controls must include the normalization-collision vector (the
   `//…/x` vs `///…/x` pair) proven ADMITTED after the fix.

## One verification before you write

Read how the stages materialize drafts when two drafts share a `path` (does a later draft
overwrite an earlier one, or is that refused upstream?). Pick the comparison form that matches
what the stages actually read: if a reordered draft list materializes the same workspace bytes,
a reordered-identical control is still byte-identical in effect and must still refuse; if order
changes the materialization, ordered comparison is correct. State which rule the code has and
which form you chose, with the evidence.

## Red-first

The collision vector red first: assert the `//…/x` vs `///…/x` control is ADMITTED (reaches
the arming failure), watch it fail on the current digest equality, then green after the byte
comparison. Record commands and counts. Keep every PD4 pin green.

## Scope

- Owned: `src/server/Probe.ts`, `src/core/types.ts` (the reworded remark/`@throws`),
  `tests/src/server/Probe.test.ts`.
- Off-limits: everything else (`src/server/helpers.ts` especially — `computeDigest` keeps its
  normalizing semantics for receipts; the refusal simply stops using it). No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean; `npm run check:src:server` green.
2. The collision pin recorded red then green; the byte-identical refusal, the
   reason-and-stage-only refusal, and both original near-miss admissions all green.
3. The reworded TSDoc states the true property.

## Output

Final message = report: the comparison form chosen with the materialization evidence, red/green
records, gate tails, `git diff --stat`, `git status --porcelain`, deviations or none.
