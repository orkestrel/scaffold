# Audit verdict — unit voice-budget

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `aa92b5f`
(`units/voice-budget.diff`, `units/voice-budget.status`, `units/voice-budget-report.md`).
Rewritten per the writer: imperative 8, verbless 19, name 0, returns 4. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Opus 5, the writer's engine, told so because the Sol bench is dark. Ruled on the diff and the tree, not on the writer's report. Every hunk in the diff was read; nothing was sampled.

## 1. Meaning kept in every rewritten first sentence — CONFIRMED

Every rewritten first sentence keeps the same action, subject, and qualifiers. Each hunk, old to new:

- `/home/user/fleet/budget/src/core/Budget.ts:7` — "A cumulative cost handle whose native `AbortSignal` aborts at its ceiling." to "Represents a cumulative cost handle …". Verb prefixed, remainder byte-identical.
- `/home/user/fleet/budget/src/core/helpers.ts:103` — "Validate and normalize token-budget construction options." to "Validates and normalizes token-budget construction options." Inflection only.
- `/home/user/fleet/budget/src/core/types.ts:2` and `:83` — "Options for constructing a …" to "Represents the options for constructing a …". Adds the verb and the article `the`; the article is required by the verb and carries no new claim.
- `types.ts:16`, `:18`, `:22`, `:39`, `:41`, `:43`, `:45`, `:47`, `:95`, `:97`, `:101` — each gains `Holds the` (or `Holds`) before an unchanged noun phrase. The possessive at `:22` and `:101` stays on the noun it modified ("the budget's owned exhaustion signal"); the derivation qualifier at `:47` stays ("derived from `max` and `consumed`"); the semicolon clause at `:16` and `:95` is untouched. No quantifier was added anywhere.
- `types.ts:49` — "Whether the cumulative tally has reached or exceeded `max`." to "Indicates whether the cumulative tally has reached or exceeded `max`." Condition unchanged, including "reached or exceeded".
- `types.ts:52`, `:58`, `:65` — "Re-arm"/"Validate and atomically add"/"Reset … and re-arm" to "Re-arms"/"Validates and atomically adds"/"Resets … and re-arms". Inflection only; "atomically" and "without resetting the cumulative tally" survive.
- `types.ts:73`, `:99` — noun phrase gains `Names`; "selected as the charge for a token budget" and "charged per provider response" unchanged.
- `types.ts:106` — gains `Represents the`; "canonical finite nonnegative token counts reported for one provider call" unchanged.
- `/home/user/fleet/budget/src/core/validators.ts:5`, `:21`, `:43`, `:59` — "Determine whether" to "Determines whether"; the rest of each sentence, including the backticked `AbortSignal` token at `:21`, is byte-identical.

No hunk changes meaning. No referent was orphaned: no rewritten sentence drops a noun a later clause depends on.

## 2. Third-person `-s` verb that fits the symbol, no symbol-name repetition — CONFIRMED

Verb fit, by symbol kind:

- Class and record types take `Represents`: `Budget.ts:7`, `types.ts:2`, `:27`, `:83`, `:106`.
- Data properties take `Holds`: `types.ts:16`, `:18`, `:22`, `:39`, `:41`, `:43`, `:45`, `:47`, `:95`, `:97`, `:101`.
- The boolean property takes `Indicates whether`: `types.ts:49`. `Holds whether` would not read, and `Indicates whether` describes a read-only derived flag correctly.
- A literal-union type and a member whose value selects a field take `Names`: `types.ts:73`, `:99`.
- Methods and functions take the action verb: `types.ts:52`, `:58`, `:65`, `helpers.ts:103`, `validators.ts:5`, `:21`, `:43`, `:59`.

No sentence's verb misdescribes its symbol. Two borderline cases I tested rather than waved through:

- `types.ts:83` "Represents the options for constructing a token budget." and `types.ts:2` for `BudgetOptions`. The prose reassembles the identifier's words. It does not repeat the symbol's name: the identifier never appears, and "options" and "budget" are the package's ruled domain terms, so replacing either would force a synonym the one-concept-one-term law forbids. The added information is "for constructing", which separates construction input from runtime state. Ruled acceptable.
- `types.ts:47` "Holds the nonnegative headroom derived from `max` and `consumed`." for `remaining`, which `Budget.ts:61` computes rather than stores. `Holds` and "derived from" sit in mild tension, but the qualifier is the original sentence's and had to survive claim 1, and `Holds` keeps the data-member block uniform. Ruled acceptable; see finding F1 for the fleet-level question.

## 3. Boolean `@returns` in the ruled form with the condition kept — CONFIRMED

All four boolean returns take `True if …; false otherwise` exactly, semicolon and lowercase `false` included, and each keeps its original condition:

- `validators.ts:8` — "`true` only for a finite nonnegative number" to "True if the value is a finite nonnegative number; false otherwise".
- `validators.ts:24` — "`true` only when the intrinsic signal getter accepts the value" to "True if the intrinsic signal getter accepts the value; false otherwise".
- `validators.ts:46` — "`true` for `completion`, `total`, or `prompt`" to "True if the value is `completion`, `total`, or `prompt`; false otherwise", backticked values intact.
- `validators.ts:65` — "`true` only when all three token counts are finite and nonnegative" to "True if all three token counts are finite and nonnegative; false otherwise", the "all three" quantifier carried over rather than invented.

The dropped `only` is not a meaning loss: the ruled form is itself biconditional, and `Budget.ts`/`validators.ts` implement each guard as one. The dropped backticked `true`/`false` tokens are the wave brief's stated design. No non-boolean `@returns` was touched: `@returns Nothing` at `types.ts:54`, `:61`, `:67` and the object returns at `helpers.ts:13`, `:110` appear in the diff as context only.

## 4. No already-satisfying sentence rewritten; no other tag or later sentence touched — CONFIRMED

Every rewritten sentence needed the rewrite: eight opened imperative (`Validate`, `Re-arm`, `Validate and atomically add`, `Reset`, `Determine` x4) and the rest opened with a bare noun phrase or a verbless `Whether …`.

Every sentence that already satisfied the rule is byte-identical to the launch tree and absent from the diff: `types.ts:20` ("Extracts the finite nonnegative charge …"), `helpers.ts:6` ("Validates and normalizes budget construction options."), and `factories.ts:14`, `:34`, `:99` (all "Creates …"). `/home/user/fleet/budget/src/core/index.ts` carries no doc block. A glob over `src/**/*.ts` returns those six files and `app/**` returns none, so the swept population is the whole population.

The diff contains no `@example`, `@param`, `@remarks`, `@throws`, or later-sentence line as an added or removed line; every such line in the hunks is context. `git status --short` lists only the four `src/core` files. No test pins a TSDoc sentence: a search of `/home/user/fleet/budget/tests/guides.test.ts` for `Represents`, `Determines`, `Holds `, and `toContain(` returns nothing, so the off-limits guide-parity risk the wave brief named did not materialise here.

Findings outside the claims:

## F1. `Holds` on a derived member is a fleet-level choice this unit cannot settle alone — observation, no change required here

`/home/user/fleet/budget/src/core/types.ts:47` reads "Holds the nonnegative headroom derived from `max` and `consumed`.", while `/home/user/fleet/budget/src/core/Budget.ts:61` computes `remaining` in a getter. Why it matters: the wave prescribes one verb per member kind across every package, and a derived read-only member is a kind the prescription does not name, so each package will resolve it differently and the fleet ends with `Holds`, `Reports`, and `Returns` on the same shape. What right looks like: leave this package as it stands, and rule the derived-member verb once for the wave. Changing it here alone would break the uniform `Holds` run across `id`, `signal`, `max`, `consumed`, and `remaining` and buy nothing.

## F2. The guide's summary tables still read imperative, so the package now ships two voices — needs a named carrier

`/home/user/fleet/budget/guides/budget.md` keeps imperative summaries after the TSDoc moved to third person: `:31`-`:33` ("Create a …"), `:39`-`:42` ("Guard a …"), `:48`-`:49` ("Validate once-read …"), `:55` (a bare noun phrase, "A cumulative consumption tally whose `signal` fires …"), and `:79`-`:81` ("Re-arm …", "Run the extractor first …", "Reset the tally …"). Why it matters: a developer reads the guide table and the editor hover for the same symbol side by side, and they now describe it in different grammatical persons; the guide is the package's self-contained human guide, so the drift lands on the reader, not on the writer. The wave brief puts `guides/**` off-limits (`/home/user/scaffold/tmp/units/voice/voice-budget-brief.md:65`), so this is not a defect of this unit. What right looks like: the Orchestrator either names a carrier unit that migrates the guide summary tables to the same third-person voice, or records an explicit ruling that guide tables keep the imperative because they are instructions to the reader rather than descriptions of the symbol. Either closes it; leaving it unnamed drops it.

## F3. Pre-existing writing-rule hits in the guide, outside this unit's scope — needs a carrier or an explicit exclusion

`/home/user/fleet/budget/guides/budget.md` carries substitution-table hits from `.claude/rules/writing.md`: `simply` at `:23`, `via` at `:25`, `:92`, `:93`, `:94`, `:176`, `above` at `:67`, and `e.g.` at `:90` and `:159`. Why it matters: these are banned forms in developer-facing prose, and a voice campaign that ends without recording them leaves the package looking swept. What right looks like: delete `simply`, write `through` or `by using` for `via`, write `earlier` for `above`, and write `for example` for `e.g.` — in a guide-scoped unit, not in this one, whose owned scope is `src/**` TSDoc text.

## Referrals to the Orchestrator (I hold one lane; the Sol bench is dark)

- Mechanical conformance of the diff to comment-only text, and the gate chain the writer reports green at `/home/user/scaffold/tmp/units/voice/voice-budget-report.md:45`-`:51`, are objective-lane facts I did not adjudicate. The diff hunks I read contain no non-comment token, which corroborates but does not establish it; the authoritative run is the Orchestrator's landing chain, and the writer's own `npm test` timing is its own reading by the brief's terms.
- The acceptance instrument `voice-scan.mjs` re-run named at `/home/user/scaffold/tmp/units/voice/voice-budget-brief.md:99` is the Orchestrator's, not mine. My reading of the tree finds no remaining imperative or verbless opener under `src/`, but that is a read, not the instrument.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-budget.diff lies within a `/** … */` block (src/core/Budget.ts:9-10, src/core/helpers.ts:22-23, src/core/types.ts multiple, src/core/validators.ts multiple). No `-`/`+` pair touches a code token outside a comment.

Claim 2 — CONFIRMED. Every backtick token and identifier in the rewritten blocks is byte-identical to the removed line. The only token-level changes are the four boolean `@returns` rewrites (voice-budget.diff:158-159, 171-172, 184-185, 200-201), each moving from a backticked `true`/short form to `True if …; false otherwise`, matching the permitted exception. No name-repeating code token was dropped (report's own count of that category is 0, and the diff confirms no such hunk).

Claim 3 — CONFIRMED. voice-budget.status:1-4 lists only `src/core/Budget.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts`. Nothing under tests/, guides/, README.md, package.json, package-lock.json, .claude/, or configs/ appears.

Claim 4 — CONFIRMED. A case-insensitive grep for the listed imperative openers followed by a space or backtick across /home/user/fleet/budget/src returned no hits, and for `@returns` followed by `Whether`, `` `true` ``, or `true ` also returned no hits. /home/user/fleet/budget/app does not exist (confirmed by Glob), matching the report's claim that the package has no app/ directory.

Claim 5 — CONFIRMED. The report (voice-budget-report.md:41-55) quotes the exact command and exit code 0 for `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`, each with an excerpt. Per the claim's own rule this is CONFIRMED on the quoted evidence; the Orchestrator's landing chain remains the authoritative run.

Findings outside the claims:

No findings outside the five claims. The diff is comment-only, scope-honest, and the sweep for residual imperative openers or unrewritten boolean `@returns` phrasing is clean across the only environment the package has (src/, no app/).

## Orchestrator

Both lanes PASS. The lane's observation that `Holds` on a derived getter (`remaining`) sits in mild tension with `derived from` is recorded for the debrief, not a change. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
