# Fix report: rater

## Dispositions

- **s17-01** applied (src/core/types.ts, src/core/validators.ts, src/core/constants.ts, src/core/Rater.ts, guides/rater.md): Re-verified: every named site still carried a dangling AGENTS section number. Removed all of them — types.ts (RaterEventMap description, RaterInterface remarks), validators.ts (both `Total guard (AGENTS §14)` remarks), constants.ts (`structural module (AGENTS §21)`), Rater.ts (class remarks and the `// Array overload first` line comment), and guides/rater.md at the header quote, the `rate` dispatch paragraph, the RaterEventMap table row, the Validators lead, the Helpers lead, the Methods lead, and the RaterInterface note. Where the citation carried real content the behavior is now stated directly: `(AGENTS §9.2)` became `declared FIRST so a plain line list resolves to that form` in Rater.ts, types.ts, and both guide sites; the remaining sites carried only the citation, so the parenthetical was deleted and the surrounding sentence left intact. Reflowed the touched prose paragraphs and JSDoc blocks to the file's existing wrap width — an ancillary formatting choice, not a content change. `grep -rn '§' src/ guides/rater.md` returns nothing. rater carries no `RFC ... §N` citations, so the lane's preservation clause was inert here. All changes are TSDoc and guide content, so the published surface is unmoved.
- **s17-03** deferred_wave: Re-verified as still present: the first TSDoc sentence of the named exports is imperative or a bare fragment (`Build a {@link LineDefinition}`, `Determine whether a value is…`, `Narrow a caught value…`, `Create a rating orchestrator`, `Sum defined line amounts`). The repair is first-sentence voice and nothing else, which the fleet ruling assigns to the later dedicated wave. Applied nothing. The TSDoc I did rewrite under s17-01 changed only remarks and line comments, never a first sentence, so no voice was mixed in.
- **s17-05** deferred_breaking: Re-verified as still present: `worksheetFactor`, `worksheetGroup`, `resultsWorksheet`, and `ratedLine` remain module helpers in src/core/helpers.ts, all reachable through the `src/core/index.ts` star-export of `./helpers.js`. Every proposed repair renames an exported symbol, which the breaking test defers whole; no part of it stands on its own as non-breaking. Applied nothing. The two lane corrections also conflict outright on the target names — one renames all four onto `join*`/`build*` (`joinWorksheetFactor`, `joinWorksheetGroup`, `joinWorksheet`, `buildLineResult`), the other keeps `worksheetFactor` and `worksheetGroup` as the convention and renames only the two strays to `worksheet` and `lineResult` — so they share no name and there is nothing common to apply. The work order needs to rule on that conflict before this can be written.
- **s17-06** deferred_breaking: Re-verified as still present: `evidenceCheck` (helpers.ts:95) and `checkEvidence` (helpers.ts:130) are still adjacent word-order reversals, both star-exported through src/core/index.ts. Every proposed repair renames an exported symbol, so the finding defers whole under the breaking test. Applied nothing. The lane corrections also differ on the target names (`buildEvidence`/`buildEvidenceRows` against `evidence`/`collectEvidence`), sharing only the direction that the singular/plural axis must carry the difference under one term.
- **s17-08** deferred_breaking: Re-verified as still present: `LineResult.success` (types.ts:117) duplicates `LineResult.worksheet.success`, and `ratedLine` writes `result.success` into both (helpers.ts:365 and, through `resultsWorksheet`, helpers.ts:334). Dropping `success` removes a published interface member, which the breaking test defers whole. The competing lane repair — keep the member and set it from the worksheet, documenting the equality in the remarks — is a documented-behavior change on a published member, not a repair the finding's direction authorizes, and the lanes disagree on which to take. Applied nothing; the work order owns the ruling. Note for that ruling: `RatingResult.success` is an aggregate over lines and both lanes agree it stays.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1989ms on 43 files using 4 threads. (First run reported guides/rater.md as an issue after my table-row edit; converged with `npm run lint` then `npm run format`, then re-ran the non-mutating chain clean.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0.
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics.
- npm run build: pass — 9 modules transformed; dist/src/core/index.js 23.63 kB, dist/src/core/index.cjs 25.52 kB; built in 2.74s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 4 files passed; policy 1 passed; config 1 file / 46 tests passed; setup 1 file / 14 tests passed; guides 1 file / 18 tests passed. No failing file in any project.

## Diffstat

```text
 guides/rater.md        | 47 +++++++++++++++++++++++------------------------
 src/core/Rater.ts      | 10 +++++-----
 src/core/constants.ts  |  4 ++--
 src/core/types.ts      |  7 ++++---
 src/core/validators.ts |  8 ++++----
 5 files changed, 38 insertions(+), 38 deletions(-)
```

- dist moves: true

## Deviations

Two items for the work order, neither of which blocked this unit.

1. Lane conflict on s17-05 and s17-06, reported rather than resolved. On s17-05 one lane renames all four helpers onto `join*`/`build*` while the other keeps `worksheetFactor` and `worksheetGroup` as the package convention and renames only `resultsWorksheet` and `ratedLine`; the two share no target name. On s17-06 one lane proposes `buildEvidence`/`buildEvidenceRows` and the other `evidence`/`collectEvidence`. Both findings defer under the breaking test regardless, so the conflict does not need settling to close this unit, but it must be settled before the rename is written.

2. Site outside the finding's scope, left in place. `guides/README.md` carries the same dangling AGENTS section numbers at line 3 (`a dual-axis index ... (AGENTS §22)`) and line 45 (`§22 documentation-as-contracts`). The s17-01 lane enumerated `guides/rater.md` only, and my owned scope for `guides/README.md` is limited to the rows for this package, which these lines are not. Not applied. It belongs to whichever unit owns the fleet-wide sweep the s17-01 DRIFT lane flagged — the same dangling reference ships from every sibling package.

Ancillary choices recorded, not escalated: exact replacement wording where a citation carried content (`declared FIRST so a plain line list resolves to that form`, taken from the package's own existing line comment at Rater.ts:80), and reflowing the touched guide paragraphs and JSDoc blocks to the file's existing wrap width after the deletions left ragged lines.
