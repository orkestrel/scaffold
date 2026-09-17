# Unit S2 — successor brief

Supersedes `tmp/units/s2-brief.md` in the clauses named here, and **only** those clauses. Every
other section of that brief stands: read it first, in full, then read this.

## What changed and why

The first attempt stopped on a conflict it was right to report. The brief's item 3 said the template
relocation must be byte-neutral and told the unit to stop if an expectation must change, and
acceptance criterion 7 generalised that to "no emitted-text expectation changed". But items 1, 5,
and 8 change the emitted text on purpose, and `tests/src/core/compilers.test.ts` pins the complete
emitted `mergeOverride` body and the complete emitted showcase body with exact `toContain` spans. No
implementation could satisfy both. The Orchestrator wrote a criterion that contradicted the work.

## The corrected rule on expectations

Emitted text changes in this unit. Its expectations change with it.

- **Items 1, 5, and 8 change emitted bytes.** Update every expectation that pins the spans they
  change — the emitted `mergeOverride` body, the emitted showcase body — to the new emitted text.
  That is required work, not a weakening.
- **This repository's own adoption moves with them.** `vite.config.ts` and any emitted wrapper whose
  bytes change are regenerated from the generator so the byte-identity proof stays green. That proof
  must pass with no expectation of its own edited.
- **Item 3, the template relocation, stays byte-neutral.** Moving the showcase literal from
  `src/core/compilers.ts` into `CONFIG_TEMPLATES.factories.app` must change no emitted byte, so it
  edits no expectation of its own.

**Order the work so that rule is measurable.** Land items 1, 5, and 8 first, with their expectation
updates. Then capture the generator's emitted output, perform the relocation, capture it again, and
diff the two captures. A clean diff is the evidence item 3 owes. If that diff is not clean, stop and
report — that is still the real stop condition, and it is now separable from the rest of the unit.

## Acceptance criterion 7, restated

The showcase template lives in `CONFIG_TEMPLATES.factories.app`, and the generator's emitted output
is identical before and after the relocation. Report the capture commands and the diff result.

## Acceptance criteria 3, 4, 5, 6, 8, and 9 — unchanged, with one addition

Each still owes its red. Where an instrument's red requires the pre-change source, capture it before
you edit, or restore your own edit afterwards — you may undo exactly your own edit, and no other.
Run no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Everything else

Unchanged. The findings, the properties to change, the scope, the off-limits list, the host facts,
the deviation contract, and the output shape are all as `tmp/units/s2-brief.md` states them. Nothing
under § What is settled and must not be reopened is reopened by this successor.
