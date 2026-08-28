# Fix report: markdown

## Dispositions

- **s10-01** applied (src/core/helpers.ts, src/core/factories.ts, guides/markdown.md, tests/src/core/helpers.test.ts, tests/src/core/factories.test.ts): Applied the branch both lane corrections share: moved createProjection out of factories.ts into core/helpers.ts as the pure leaf it is (createWriteDirectory precedent), keeping the exported name. Rejected the shapers.ts and cloners.ts destinations per the high lane. helpers.ts now imports EMPTY_PROJECTION from constants.js and no longer imports factories.js, so the class-importing edge into the leaf is gone. Moved the guide row from the Factories table to the Helpers table and the test block from factories.test.ts to helpers.test.ts. Published surface unchanged: the barrel star-exports both files.
- **s10-02** applied (src/core/compilers.ts, src/core/helpers.ts, src/core/index.ts, src/core/constants.ts, guides/markdown.md, tests/src/core/compilers.test.ts, tests/src/core/helpers.test.ts): DRIFT repair stands as written, with the DRIFT/medium barrel amendment. Created src/core/compilers.ts holding renderHTML, added `export * from './compilers.js'` to core/index.ts. helpers.ts no longer imports HTML, SAFE_ATTRIBUTES, or html's renderHTML - those three were used only by the moved function - so the leaf file constructs no class. The DRIFT-RESHAPE lane's alternatives both require an off-limits file (a new function in @orkestrel/html, or a scaffold rule edit), so neither was reachable from this unit. Guide gains a Compilers section carrying the renderHTML row; the five renderHTML describes moved to tests/src/core/compilers.test.ts.
- **s10-03** applied (src/core/helpers.ts, src/core/validators.ts, src/core/parsers.ts, guides/markdown.md, tests/src/core/helpers.test.ts, tests/src/core/validators.test.ts): Moved isWhitespace, isEscapable, isBlankLine, isQuote, isFenceClose, isFenceWhitespace, isThematicBreak, and isTableStart from validators.ts to helpers.ts under a new 'Line + character structural predicates' section. validators.ts no longer imports splitTableRow from helpers.ts, so the leaf cycle is gone; parsers.ts now imports the five it uses from helpers.js. Node guards stayed. Guide rows moved from the Validators table to the Helpers table with full signatures, and both section intros were rewritten. The 'line predicates' describe moved to helpers.test.ts.
- **s10-05** applied (src/core/helpers.ts, guides/markdown.md): Took the DRIFT-RESHAPE/high correction. Rewrote scanInline's @param depth to name scanInlineSource's recursion into itself for a link's text, an image's alternative content, and an emphasis run's children; clarified scanInlineSource's own tag the same way; corrected the guide's 'Inline recursion' depth bullet. Did not route scanLink/scanEmphasis through the engine - instead recorded in the 'Scan one inline construct' section that they skip the coalesceText step the engine applies, so their node.children carries no coalescing guarantee. Probed the built barrel for a divergent value and found none in the cases tried, so the note claims only which step is skipped, not an observable difference.
- **s10-06** applied (src/core/types.ts, src/core/helpers.ts, guides/markdown.md): Declared HeadingMatch, FenceMatch, CodeSpanMatch, LinkBounds, EmphasisBounds, TableCollection, and ListCollection in core/types.ts beside ListItemMatch, all members readonly, and annotated extractHeading, extractFence, scanCode, locateLink, locateEmphasis, collectTable, and collectList with them. The shapes are structurally identical to the anonymous types they replace, so the change is additive. Added the seven rows to the guide's Types table.
- **s10-08** deferred_breaking: The corrected repair renames the exported isWhitespace to isFlankingWhitespace. Renaming an exported symbol is on the brief's defer list, so nothing was applied. The predicate did move file under s10-03, keeping its published name. Carry the rename to the work order.
- **s10-09** applied (src/core/factories.ts, src/core/helpers.ts, src/core/types.ts, src/core/validators.ts, src/core/shapers.ts, guides/markdown.md, tests/src/core/factories.test.ts, tests/src/core/parsers.test.ts, tests/src/core/shapers.test.ts): Deleted every AGENTS section citation and kept the claim each decorated. Covered the four factories.ts sites and helpers.ts:1596 the finding names, the header comments at types.ts, helpers.ts, validators.ts, and shapers.ts, and - beyond the named list, same defect class and also shipped in index.d.ts - the four AGENTS 14 citations in validators.ts's from-unknown guard @remarks. Also cleared the six citations in guides/markdown.md and three in test-file comments, which are the same dead pointers. Where the rationale mattered I named the property instead: renderMarkdown's TSDoc now says parsing the rendered source returns the document it was rendered from.
- **s10-10** applied (src/core/types.ts, src/core/parsers.ts, src/core/helpers.ts, src/core/Markdown.ts, src/core/shapers.ts, guides/markdown.md): via to through at the four named src sites, plus two the finding's sweep missed - Markdown.ts:39 and shapers.ts:18 - so src is now clean of the row. Markdown.ts:178 became 'other environments use the reader loop shown earlier'. Extended the sweep to guides/markdown.md, which carried nine via hits and one behavioral should; all rewritten. Test-file titles still carry six via hits; the finding bound its sweep to src/**/*.ts, so those are left for the work order.
- **s10-11** applied (src/core/validators.ts, src/core/parsers.ts): Gave all thirteen node guards @param node - The AST node to test and @returns in the fleet boolean form 'True if the node is a {@link X}; false otherwise', and added the three missing @example blocks (isHeadingNode, isTableNode, isLinkNode) so the file is internally uniform. Added @example to parseDocument, parseProvenance, and parseInline; each example's asserted value was checked against the code (parseProvenance's span is {start: 0, end: 4} for '# Hi').
- **s10-13** deferred_wave: The only repair is first-sentence voice, which the fleet migrates in its own later wave. Applied nothing. Every TSDoc sentence written fresh in this unit does use the third-person -s form (createProjection 'Builds', compilers.ts renderHTML 'Renders') and the boolean @returns form.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1965ms on 47 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no output, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no diagnostics)
- npm run build: pass — dist/src/core/index.js 133.99 kB; dist/src/core/index.cjs 139.56 kB; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 7 files / 602 tests passed; policy 111 passed; config 46 passed; setup 24 passed; guides 18 passed. Baseline before the unit was 6 files / 602 tests, so no test was lost and one file was added.

## Diffstat

```text
 guides/markdown.md                | 136 +++++++------
 src/core/Markdown.ts              |   4 +-
 src/core/constants.ts             |   6 +-
 src/core/factories.ts             |  41 +---
 src/core/helpers.ts               | 332 ++++++++++++++++++++++---------
 src/core/index.ts                 |   1 +
 src/core/parsers.ts               |  24 ++-
 src/core/shapers.ts               |   4 +-
 src/core/types.ts                 |  87 ++++++++-
 src/core/validators.ts            | 236 +++++++---------------
 tests/src/core/factories.test.ts  |  32 +--
 tests/src/core/helpers.test.ts    | 397 ++++++++++++++------------------------
 tests/src/core/parsers.test.ts    |   2 +-
 tests/src/core/shapers.test.ts    |   2 +-
 tests/src/core/validators.test.ts | 116 +----------
 15 files changed, 662 insertions(+), 758 deletions(-)

Untracked (not counted by git diff --stat): src/core/compilers.ts (33 lines), tests/src/core/compilers.test.ts (256 lines).
```

- dist moves: true

## Deviations

No blocking deviation; the unit ran to completion. Four decisions worth recording.

1. s10-02 lane conflict, resolved by the DRIFT label rather than left open. The finding is labelled DRIFT, so its repair line stands as written, and the DRIFT/medium lane only added the barrel row. The DRIFT-RESHAPE/medium lane's two alternatives are both unreachable from this unit: adding a function-form whole-document sanitizer to @orkestrel/html is another repository, and rescoping the rule sentence is a scaffold rule file. Both are off-limits. I applied the written repair.

2. Scope extended beyond the named sites in three places, each the same defect class as the finding that names it, each non-breaking prose: s10-09 also cleared the four AGENTS 14 citations in validators.ts's from-unknown guard @remarks (these ship in index.d.ts, exactly the finding's stated harm), the six in guides/markdown.md, and three in test-file comments; s10-10 also cleared two src via hits its own sweep missed (Markdown.ts:39, shapers.ts:18) and ten hits in guides/markdown.md.

3. Prose the moves invalidated was updated with them: constants.ts's MAX_DEPTH TSDoc and the guide's MAX_DEPTH row both listed renderHTML among the helpers.ts functions, and the guide's Helpers and Validators section intros described populations that changed. Tests were moved to keep the mirror rule honest: the five renderHTML describes to a new tests/src/core/compilers.test.ts, the line-predicate describe to helpers.test.ts, the createProjection describe to helpers.test.ts.

4. Left for the work order, named against the capability that owns it: the s10-08 isWhitespace rename (breaking); six via hits in test titles, outside the finding's src/**/*.ts sweep bound; and two AGENTS section 22 citations in guides/README.md prose, which the brief scopes to rows for this package rather than the whole file.

format:check failed twice on files this unit wrote and was converged with npm run lint then npm run format, then the non-mutating chain was re-run clean end to end. No off-limits file appears in git status. The tree is uncommitted.
