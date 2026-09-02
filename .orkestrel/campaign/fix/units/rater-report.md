# Unit breaking-rater — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s17-05** — applied: Renamed the four worksheet builders in src/core/helpers.ts to the ruling's names, with every in-package consumer, TSDoc @example, guide Helpers row, and guide fence moved atomically and no alias left behind. Consumers updated: buildWorksheetGroup calls buildWorksheetFactor; buildWorksheet calls buildWorksheetGroup; Rater.#rateLine calls buildLineResult; worksheetSteps and sumAmounts @example blocks. Word-boundary grep for each old name over src, tests, guides/rater.md, guides/README.md, and README.md returns nothing; the case-insensitive inflected re-run leaves only the retained type names WorksheetFactor and WorksheetGroup and their guards isWorksheetFactor and isWorksheetGroup, which no row moves.
- **s17-06** — applied: Renamed evidenceCheck to buildEvidence and checkEvidence to buildEvidenceRows, so the singular/plural axis carries the difference under the one build* term. buildEvidenceRows calls buildEvidence; buildWorksheetFactor calls buildEvidenceRows. The guide Helpers rows and the evidence-construction fence moved with them, and the helpers.test.ts describe block is renamed for the new pair. Word-boundary and inflected sweeps return nothing for either old name.
- **s17-08** — applied: Removed LineResult.success from src/core/types.ts. Every read now derives it from the worksheet: Rater.rate computes the aggregate as results.every((entry) => entry.worksheet.success), buildLineResult no longer writes the member, and isLineResult drops its success: isBoolean row. RatingResult.success stands as the aggregate, unchanged. The tests that asserted the member were updated or deleted: the LineResult key-shape expectation, every line.success and lineResult.success read, the isLineResult wrong-typed-member case for success, and the success accessor on both the LineResult-shaped class candidate and the nested LineResult inside the isRatingResult candidate. tests/setup.ts createLineResult now derives its stub worksheet's success from amount presence so the stub still mirrors the real rating path. Guide LineResult row, RatingResult row, isLineResult validator row, and the Surface failure prose all read through worksheet.success.

## Symbols moved

- worksheetFactor → buildWorksheetFactor (src/core/helpers.ts)
- worksheetGroup → buildWorksheetGroup (src/core/helpers.ts)
- resultsWorksheet → buildWorksheet (src/core/helpers.ts)
- ratedLine → buildLineResult (src/core/helpers.ts)
- evidenceCheck → buildEvidence (src/core/helpers.ts)
- checkEvidence → buildEvidenceRows (src/core/helpers.ts)
- LineResult.success → removed (src/core/types.ts); readers derive it from LineResult.worksheet.success
- isLineResult member success: isBoolean → removed (src/core/validators.ts)
- upstream adoption: @orkestrel/reason isSubject → @orkestrel/contract isRecord (src/core/Rater.ts)
- upstream adoption: reason check → createCheck
- upstream adoption: reason factorGroup → createFactorGroup
- upstream adoption: reason fieldFactor → createFieldFactor
- upstream adoption: reason lookupFactor → createLookupFactor
- upstream adoption: reason staticFactor → createStaticFactor
- upstream adoption: reason quantitativeDefinition → createQuantitativeDefinition
- upstream adoption: reason logicalDefinition → createLogicalDefinition

## Files touched

- /home/user/fleet/rater/src/core/types.ts
- /home/user/fleet/rater/src/core/helpers.ts
- /home/user/fleet/rater/src/core/validators.ts
- /home/user/fleet/rater/src/core/Rater.ts
- /home/user/fleet/rater/tests/setup.ts
- /home/user/fleet/rater/tests/setup.test.ts
- /home/user/fleet/rater/tests/src/core/helpers.test.ts
- /home/user/fleet/rater/tests/src/core/Rater.test.ts
- /home/user/fleet/rater/tests/src/core/validators.test.ts
- /home/user/fleet/rater/guides/rater.md
- /home/user/fleet/rater/README.md

## Tests changed

- /home/user/fleet/rater/tests/src/core/helpers.test.ts — describe blocks renamed to the new helper names; every call site moved; the buildLineResult amount assertion drops the removed success member and its failure case reads rated.worksheet.success; reason constructors adopted
- /home/user/fleet/rater/tests/src/core/Rater.test.ts — LineResult key-shape expectation now ['id','name','amount','worksheet'] and ['id','name','worksheet']; its title and the aggregation-edge title renamed for what they prove; every line.success and lineResult.success read moved to worksheet.success; reason constructors adopted
- /home/user/fleet/rater/tests/src/core/validators.test.ts — isLineResult fixture drops success; the success accessor removed from the LineResult class candidate and from the nested LineResult in the isRatingResult candidate; the isLineResult wrong-typed success case deleted with the member; createLogicalDefinition adopted
- /home/user/fleet/rater/tests/setup.ts — createLineResult drops the success member and derives its stub worksheet's success from amount presence; reason constructors adopted
- /home/user/fleet/rater/tests/setup.test.ts — the stub proof reads worksheet.success and its title names what it proves

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 2224ms on 43 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostic emitted
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostic emitted
- `npm run build` → exit 0 — [unplugin:dts] Declaration files built in 1860ms. ✓ built in 2.04s. Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — src:core Tests 131 passed (131); policy Tests 111 passed (111); config Tests 46 passed (46); setup Tests 14 passed (14); guides Tests 18 passed (18)

## Diff stat

```text
README.md                         |  10 +++-
 guides/rater.md                   | 116 +++++++++++++++++++------------------
 src/core/Rater.ts                 |  17 ++----
 src/core/helpers.ts               | 117 +++++++++++++++++++-------------------
 src/core/types.ts                 |   6 +-
 src/core/validators.ts            |  14 ++---
 tests/setup.test.ts               |   6 +-
 tests/setup.ts                    |  51 ++++++++++-------
 tests/src/core/Rater.test.ts      |  92 +++++++++++++++++-------------
 tests/src/core/helpers.test.ts    |  86 +++++++++++++++-------------
 tests/src/core/validators.test.ts |  15 +----
 11 files changed, 275 insertions(+), 255 deletions(-)
```

Status at return (writer's reading): `Every assigned row applied; no row refused and no row stopped. The gate chain runs green in order: format:check, lint:check, check, build, test all exit 0. The tree is modified and uncommitted, with package.json, package-lock.json, and every off-limits path untouched.`
Built `dist/` moves: true

## Observations

- The built dist/ moved. dist/src/core/index.d.ts now declares buildEvidence, buildEvidenceRows, buildLineResult, buildWorksheet, buildWorksheetFactor, and buildWorksheetGroup, carries no old helper name, and declares LineResult as { id, name, amount?, worksheet } with no success member.
- Instrument and its control. A throwaway probe at /tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/verify-doc-imports.mjs resolves every named import written in a TSDoc @example, a guide fence, or the README fence against the real exports of @orkestrel/rater (built dist), reason, contract, and emitter. Subject: checked=116 missing=0. Negative control, a copy of helpers.ts outside the checkout carrying one planted import of evidenceCheck from @orkestrel/reason: checked=42 missing=1, reported as MISSING CONTROL. Coverage: named `import { … } from '<pkg>'` forms only, for those four specifiers; it does not reach default or namespace imports, `import type`, bare call sites, or other specifiers. This matters because tsc never reads a TSDoc example, so the compiler could not have caught a stale upstream name there.
- isRecord narrows more tightly than a structural Subject. Its installed TSDoc states it refuses arrays, Date, Map, and class instances, and a run confirms: null, undefined, 42, 's', [], and `new (class{})()` return false while an object literal and Object.create(null) return true. Subject is Readonly<Record<string, unknown>>, which a class instance structurally satisfies, so a consumer passing a class-instance subject now meets RaterError 'MISMATCH'. The guide already states the subject must be a plain record, so the prose matches; the ruling named isRecord and I applied it as named.
- Mixed TSDoc voice remains where no row reached. The brief scopes the third-person rewrite to blocks I touch, so worksheetStep in src/core/helpers.ts, every guard in src/core/validators.ts except isLineDefinition and isLineResult, and the blocks in src/core/errors.ts and src/core/factories.ts keep their imperative first sentence. Record against a documentation row for the next change rather than reopening this one.
- README.md links the guide as `guides/src/rater.md`, which resolves to nothing — the file is `guides/rater.md`. Pre-existing, outside every row, and invisible to tests/guides.test.ts, whose inventory walks src, guides, and tests plus AGENTS.md and never reads README.md.
- The 'removed program-era symbols' list in tests/src/core/Rater.test.ts was left as it stands. It names a prior migration, and adding this change's rename targets would conflate the two. The rename's regression guard is tests/guides.test.ts, which fails if a renamed helper reappears on the barrel undocumented.
- Whole-suite timing on this host was unremarkable and no failure was timing-suspect: src:core 894ms, policy 1.39s, config 2.11s, setup 314ms, guides 455ms. test:distribution is outside npm test and was not run, per the brief.
- The centralization sweep over the touched files found nothing to repair: every declaration in src/core/helpers.ts is an exported function in a helpers-kind file and reaches the barrel through `export * from './helpers.js'`; no nested function declaration or assignment was introduced; no alias, re-export, or rename-only wrapper was left behind. Changed files are valid UTF-8 with no replacement character, no unintended control character, and no trailing whitespace.

## Deviations

- A first attempt at the documented-import probe ran `npx vite-node`, which fetched vite-node@6.0.0 into the npx cache. The checkout was not touched: package.json and package-lock.json show no diff, node_modules carries no vite-node, and node_modules/.bin has no vite-node entry — verified before continuing. I replaced that probe with a plain `node` script that resolves each dependency surface by absolute path from the checkout's node_modules, and both the script and its planted control live under the scratchpad, never under the checkout.
- The brief's Execution step directs a TSDoc first-sentence rewrite 'where you touch a block'. Adopting the renamed reason constructors touched every TSDoc block in src/core/helpers.ts except worksheetStep, and two in src/core/validators.ts, so those blocks were rewritten to the third person while their untouched neighbours were left alone. Decided and recorded under the deviation contract's clause for the wording of a rewritten TSDoc sentence; the residue is listed in the observations.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/rater.diff`,
`tmp/units/breaking/rater.status`.
