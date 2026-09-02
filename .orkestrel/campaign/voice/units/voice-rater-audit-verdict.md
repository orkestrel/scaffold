# Audit verdict — unit voice-rater

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `1ccb968`
(`units/voice-rater.diff`, `units/voice-rater.status`, `units/voice-rater-report.md`).
Rewritten per the writer: imperative 11, verbless 19, name 0, returns 11. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice). Sol bench dark; this lane ran on the writer's engine, told so.

## 1. Meaning preserved in every rewritten first sentence — BROKEN

I sampled every hunk in `/home/user/scaffold/tmp/units/voice/voice-rater.diff`, not a subset. Thirty first-sentence rewrites and eleven `@returns` rewrites. Twenty-nine of the thirty first sentences add only a verb (or convert the imperative to the third person) and change nothing else; I confirmed each against its block in the tree.

One hunk changes meaning. `/home/user/scaffold/tmp/units/voice/voice-rater.diff:18-24`, landed at `/home/user/fleet/rater/src/core/constants.ts:2`:

- was: `Rating-domain constants.`
- is: `Holds the rating-domain constants.`

The original is a label naming what the module is for. The rewrite asserts that the module holds a set of constants, and `/home/user/fleet/rater/src/core/constants.ts:5` — inside the same block, three lines later — says `Empty — the current quantitative-only contract needs no shared constant.` The file is comment-only; it declares nothing. The added verb plus the definite article assert contents that do not exist, and the reader meets the contradiction on the same screen. That is an addition, not a voice migration.

Every other hunk: `Rater.ts:26` (`Orchestrates rating —` for `The rating orchestrator —`, same substance, the dash clause now reads as a verb series and loses nothing), `errors.ts:4` and `errors.ts:31`, `factories.ts:5`, `helpers.ts:210`, and the sixteen `types.ts` blocks are pure prefix additions or imperative-to-third-person conversions with the qualifiers, referents, and code tokens intact. `types.ts:141` (`A subject was rated —` to `Fires when a subject is rated —`) keeps the referent of `carries` on the event and shifts past to present, which the rule wants. `types.ts:146` turns `/` into `and`; accurate, because the same options configure both entry points.

## 2. Verb fits the symbol, name not repeated — BROKEN

The misdescribing verb, quoted as the claim asks:

`/home/user/fleet/rater/src/core/constants.ts:2` — `Holds the rating-domain constants.` The module holds none, by its own `@remarks` at line 5. `Holds` is the wave's mapping for a property that carries a value; this module carries nothing.

Every other verb fits: `Orchestrates` for the `Rater` class (`Rater.ts:26`), `Represents` for the error class and the types and interfaces (`errors.ts:4`, `types.ts:17,21,36,51,61,71,81,90,105,121,135,164`), `Names` for the two literal unions (`types.ts:11,14`), `Fires when` for the event member (`types.ts:141`), `Configures` for the options interface (`types.ts:146`), `Creates` for the factory (`factories.ts:5`), `Builds` for the helper (`helpers.ts:210`), `Narrows` for the error guard (`errors.ts:31`), `Determines whether` for the eight guards (`validators.ts:32,79,109,140,171,202,232,298`). No rewritten sentence restates its symbol's name as the sentence's subject.

## 3. Boolean `@returns` form — CONFIRMED

All eleven read `True if …; false otherwise` with the original condition carried over word for word: `errors.ts:34`, and `validators.ts:35,55,86,118,147,178,209,239,276,307`. Example: `` `true` when every checked `Evidence` member conforms `` becomes `True if every checked `Evidence` member conforms; false otherwise` (`validators.ts:118`). The backticked `true`/`false` tokens are dropped, which the launch brief authorises by design. No condition was narrowed, widened, or reworded.

## 4. Nothing already compliant rewritten; no other tag or sentence touched — CONFIRMED

Every `-` side in the diff is either an imperative opener (`Narrow`, `Create`, `Build`, eight `Determine whether`) or a bare noun phrase; none satisfied the rule beforehand. Two guards that already read `Determines whether` were correctly left alone at the first sentence and touched only at `@returns`: `validators.ts:48` (`isLineDefinition`) and `validators.ts:267` (`isLineResult`) appear in the diff only through their `@returns` hunks.

No `@example`, `@param`, `@remarks`, `@throws`, or later sentence appears on either side of any hunk. The two-line first sentence at `Rater.ts:26-27` changed only its first line; the continuation is a context line. No non-comment token appears on either side.

Findings outside the claims:

## A. The constants block sits outside the wave's stated population, which is how the false sentence entered

`/home/user/fleet/rater/src/core/constants.ts` is comment-only; the block attaches to no declaration. The shared wave brief `/home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md:31-34` sets the population as blocks attached to an exported declaration and to class members. A floating file header is in neither set, so this block was not the wave's to rewrite.

Why it matters: the rest of the fleet has not run the wave yet, and other packages carry the same shape — `/home/user/fleet/reason/src/core/constants.ts:3` writes its module header as a `//` comment rather than TSDoc. Whichever way the wave rules, the remaining packages need the same ruling, or each writer decides it again.

What right looks like: `/home/user/fleet/rater/src/core/constants.ts:2` reads `Reserves this module for rating-domain constants.` That keeps a third-person `-s` verb (so the acceptance scan still reads `verbless=0`), keeps the original label's meaning, and stops asserting contents the next line denies. Restoring the original `Rating-domain constants.` also removes the false claim, but the acceptance classifier misfiles that sentence under `imperative`, per the writer's report, so the rewrite is the path I recommend. Then add one line to the shared wave brief's population saying whether a file-header block with no declaration is in scope, before the next package runs.

## B. The guide now carries a sentence the source no longer contains, and no gate can see it

`/home/user/fleet/rater/guides/rater.md:250` reads `The rating orchestrator — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary.` — the verbatim pre-wave first sentence of the `Rater` class. `/home/user/fleet/rater/src/core/Rater.ts:26` now reads `Orchestrates rating — …`. The row's claim is still true about the class, so this is divergence rather than falsehood, but the guide and the source now speak in two voices about the same symbol.

Nothing catches it. `/home/user/fleet/rater/tests/guides.test.ts:5-19` runs `@orkestrel/guide` over symbols, fences, imports, and links; it pins no sentence. This is the case `.claude/rules/documentation.md` names — parity proves a name exists, never that a sentence still matches what shipped.

This unit was right not to touch it: guides are off-limits in both briefs. It needs a carrier. What right looks like: the Orchestrator either dispatches a successor unit that brings `guides/rater.md` surface rows into the shipped TSDoc voice for the rows that quote a first sentence, or records in the wave brief that a guide surface table keeps its noun-phrase voice deliberately and the verbatim overlap is coincidental. Same question lands on every remaining package in the wave, so rule it once. Related rows carrying pre-wave phrasing: `guides/rater.md:66`, `:68`, `:80`, `:234`.

## C. Domain nouns retained in a symbol's own sentence — ruled permitted, recorded so the reading is on file

`/home/user/fleet/rater/src/core/types.ts:11` (`Names a worksheet derivation step stage.` for `Stage`) and `:81` (`Represents a display-neutral worksheet derivation step.` for `Step`) contain the symbol's own word. I read the rule's "never repeats the symbol's name" as barring the name as the sentence's subject, not as barring the domain noun: dropping it would change the meaning and break one-concept-one-term. No change required. Recorded because a later auditor reading the rule literally will re-raise it.

## D. Referral to the Orchestrator (objective lane not running)

I ran no gate and verified no count. The gate table in `/home/user/scaffold/tmp/units/voice/voice-rater-report.md:40-46` and the post-landing scan reading `imperative=0 verbless=0 returnsBad=0` are the writer's self-report and carry no weight with me. Two specifics for whoever holds the objective lane: `format:check` over the lengthened `types.ts:21` (88 columns), and re-running `voice-scan.mjs` after any fix to finding A, because restoring or rewording that sentence moves a bucket the acceptance criterion reads.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-rater.diff changes only text inside `/** … */` comment blocks. No hunk touches a code token, import, signature, or non-comment line (verified across Rater.ts:9-11, constants.ts:20-21, errors.ts:33-34/42-47, factories.ts:59-60, helpers.ts:72-73, types.ts (16 hunks), validators.ts (8 doc-block hunks + 10 @returns hunks)).

Claim 2 — CONFIRMED. Every backtick token, `{@link …}`, and URL in a rewritten block is byte-identical to the removed line. Checked instances: `{@link RaterError}` preserved errors.ts:34/43; `{@link Step}` preserved helpers.ts:73; `{@link RaterInterface}` preserved types.ts (push-observation block); backtick `` `rate` `` preserved types.ts (RatingResult block); backtick `` `createRater` ``/`` `Rater` `` preserved types.ts:193; `{@link Stage}`, `{@link LineDefinition}`, `{@link RatingDefinition}`, `{@link Evidence}`, `{@link WorksheetFactor}`, `{@link WorksheetGroup}`, `{@link Step}`, `{@link Worksheet}`, `{@link LineResult}`, `{@link RatingResult}` all preserved across validators.ts hunks. Every boolean `@returns` line converts backtick `` `true` `` → `True if …; false otherwise` per the mandated exception (errors.ts:47, validators.ts x10), with the tested value's own backtick token (`` `value` ``, `` `LineDefinition` ``, etc.) carried through unchanged. No instance of a dropped self-referencing identifier under a name clause was found (the report's own count of 0 for that bucket matches the diff).

Claim 3 — CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-rater.status lists exactly 7 modified files, all under `src/core/`: Rater.ts, constants.ts, errors.ts, factories.ts, helpers.ts, types.ts, validators.ts. None under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/`.

Claim 4 — CONFIRMED. A multiline grep for `/**\n * ` across `/home/user/fleet/rater/src` (single-line `/** … */` blocks checked directly) shows every doc block's opening line is third-person `-s` form: Represents, Configures, Orchestrates, Holds, Builds, Joins, Sums, Creates, Determines, Narrows, Names, Fires when. A plain grep for the imperative-verb list returned one hit, `src/core/validators.ts:114`, but that line is a mid-paragraph continuation inside `@remarks` ("... does not read or / check them; either member may also be absent ...") rather than a doc block's first line, so it is not a violation. No `app/` directory exists in this package (glob returned no files), so the `app/` half of the sweep is vacuous. A grep for `@returns` followed by `Whether`, `` `true` ``, or `true ` returned no matches.

Claim 5 — CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-rater-report.md quotes the exact command and exit code for every gate: `npm run format:check` exit 0, `npm run lint:check` exit 0, `npm run check` exit 0, `npm run build` exit 0, `npm test` exit 0 (report.md:40-46). Per the claim's own rule this is CONFIRMED on the quoted evidence; the Orchestrator's own landing chain remains the authoritative run.

Findings outside the claims:

No findings outside the numbered claims. The diff is comment-only, scope is confined to `src/core/`, no `app/` directory exists, and the report's gate table is complete and consistent with the diff and status evidence.

## Orchestrator

Subjective claims 1 and 2 broke on one sentence: `Holds the rating-domain constants.` over a module that declares none. Ruled: `Reserves the module for rating-domain constants.` (fix-up brief `voice-rater-fixup-brief.md`, builder on Sonnet). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
