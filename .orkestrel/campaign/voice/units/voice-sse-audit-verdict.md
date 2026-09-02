# Audit verdict — unit voice-sse

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `b639721`
(`units/voice-sse.diff`, `units/voice-sse.status`, `units/voice-sse-report.md`).
Rewritten per the writer: imperative 2, verbless 14, name 1, returns 1. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), Claude Opus 5, Sol bench dark.

1. Meaning kept in every rewritten first sentence — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-sse.diff is a verb inserted or an imperative inflected, action/subject/qualifiers unchanged: /home/user/fleet/sse/src/core/SSEParser.ts:6, /home/user/fleet/sse/src/core/errors.ts:10, /home/user/fleet/sse/src/core/types.ts:2,18,20,22,24,29,55,61,70,80,84, /home/user/fleet/sse/src/core/constants.ts:2,9. The one content edit is constants.ts:10 ("a leading BOM" -> "a leading mark"); the referent is fixed by "Names the byte-order mark (`U+FEFF`)" opening the same sentence, so meaning survives, and the wording cost is charged under claim 2. types.ts:38 "Options for {@link createSSEParser} / the {@link SSEParser} constructor." -> "Configures {@link createSSEParser} / the {@link SSEParser} constructor." keeps both targets and the relation.

2. Third-person -s verb that fits the symbol, and no repeat of the symbol's name — BROKEN. Verbs fit everywhere (Creates/Narrows left untouched at factories.ts:5 and errors.ts:56; Appends/Returns at types.ts:61; Treats/dispatches at types.ts:70; Holds on the data properties; Names on the constants and the literal union; Represents on the event type, interface, and class). The name clause breaks at /home/user/fleet/sse/src/core/constants.ts:2 — "Names the NUL byte (`U+0000`)." restates the symbol `NUL` as the code token, while the same unit removed exactly that construction from the constant beneath it at constants.ts:9-10.

3. Boolean @returns reads "True if …; false otherwise" with the condition kept — CONFIRMED. /home/user/fleet/sse/src/core/errors.ts:59 against the pre-image "`true` when `value` is an {@link SSEError}"; condition and link intact. It is the only boolean return under src/ (types.ts:76 and factories.ts:23 are non-boolean and untouched).

4. No already-conforming sentence rewritten, no tag block or later sentence touched — CONFIRMED. Every replaced pre-image was imperative or a bare noun phrase; conforming blocks untouched at factories.ts:5, errors.ts:41, errors.ts:56, types.ts:87; the hunks sharing a line with following prose change only the verb (types.ts:61, types.ts:71).

Findings outside the claims:

REQUIRED (tied to claim 2) — /home/user/fleet/sse/src/core/constants.ts:2. What is wrong: the rewritten first sentence "Names the NUL byte (`U+0000`)." repeats the symbol's name, which the first-sentence rule forbids, and the same unit stripped that construction from `BOM` at constants.ts:9-10. Why it matters: one file now teaches two conflicting readings of the rule in adjacent blocks, and `BOM` paid a precision cost (standard token replaced by the bare noun "mark") for a rule `NUL` was exempted from. What right looks like: "Names the null byte (`U+0000`)." with the block's later sentence left byte-identical; or, if the Orchestrator rules that a wire term coinciding with the symbol name is not a repeat, restore constants.ts:10 to "a leading BOM on later chunks is ordinary content" and record that reading. One reading must govern both constants.

RETAINED, no change — /home/user/fleet/sse/src/core/types.ts:18,20,22,24. The SSEEvent member docs carry their own identifiers as SSE wire terms rather than as restatements of symbol identity; all retained. `data` is the weakest (head noun equals the symbol name), and the alternative trades the specification's own word for a vaguer one. Named so the required change's ruling covers them and no successor pass re-opens them block by block.

RETAINED, no change — /home/user/fleet/sse/src/core/types.ts:38. "Configures" is outside the wave brief's prescribed verb for an interface, and it is the better choice: "Represents the options for …" would reintroduce "Options", part of the symbol's own name. Deviation accepted on the record.

OBSERVATION — comment wrap. Rewritten multi-line blocks overhang their own hand wrap by the inserted verb (SSEParser.ts:6, types.ts:2, types.ts:55 by about eleven characters; constants.ts:2, constants.ts:9, types.ts:80, types.ts:84 by about six). The `data` and `retry` member docs at types.ts:18 and types.ts:24 cross the printWidth of 100 set in /home/user/fleet/sse/.oxfmtrc.json. oxfmt does not reflow comments, so no gate reports it, and longer comment lines predate the unit (errors.ts:45). Do not re-wrap inside this unit: the wave freezes later sentences and types.ts:71 shares its line with the sentence after it.

OBSERVATION — guide coherence, out of the unit's scope by its brief. /home/user/fleet/sse/guides/sse.md:3 still opens with the interface's pre-unit wording, and guides/sse.md:56-57 keeps "The NUL byte (`U+0000`)" and "The byte-order mark (`U+FEFF`)". Nothing there went false; a guide summary and a surface table are a different genre from a TSDoc first sentence. No change required; recorded for a later guide-voice pass.

OBSERVATION — class summary. SSEParser.ts:6 hangs a second-person clause off a third-person "Represents". The construction predates the unit and the diff touched only its opening; rewriting it exceeds the wave's scope.

COVERAGE — every TSDoc block under /home/user/fleet/sse/src/ now opens with a third-person -s verb, and the SSEParser class privates use `//` comments the wave does not govern. The report's coverage claim holds against the tree.

No referrals: nothing in this audit required a correctness, dependency, or gate ruling outside the subjective lane.

## Checker lane (FAIL 2)

Claim 1 — CONFIRMED. Every diff hunk in /home/user/scaffold/tmp/units/voice/voice-sse.diff changes only text inside a `/** … */` comment. Verified line by line: SSEParser.ts:9-10 (doc first line), constants.ts:20-21 and 28-31 (doc first lines), errors.ts:43-44 and 52-53 (doc first line and @returns), types.ts:63-64, 72-83, 87-88, 96-97, 105-106, 112-113, 121-124, 132-133, 137-138 — every `-`/`+` pair sits between `/**` and `*/` markers or on a single-line `/** … */` field comment. No code token (identifier, keyword, punctuation outside comments) changed.

Claim 2 — BROKEN. errors.ts diff hunk (voice-sse.diff:52-53):
`- * @returns \`true\` when \`value\` is an {@link SSEError}`
`+ * @returns True if \`value\` is an {@link SSEError}; false otherwise`
The backtick-wrapped token `` `true` `` in the removed line has no byte-identical counterpart in the added line — the word `True` reappears unwrapped by backticks, and the token is dropped rather than preserved. Every other backtick token and every `{@link …}` across the diff (SSEError, SSEParserInterface, value, parse(chunk), createSSEParser, factories.js, errors.js, SSEParser.js, #buffer references etc.) is byte-identical between removed and added lines. This is the sole exception.

Claim 3 — CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-sse.status lists exactly ` M src/core/SSEParser.ts`, ` M src/core/constants.ts`, ` M src/core/errors.ts`, ` M src/core/types.ts` (status:1-4) — all under src/, nothing under tests/, guides/, README.md, package.json, package-lock.json, .claude/, configs/, tests/setupPolicy.ts, or tests/policy.test.ts.

Claim 4 — CONFIRMED for its literal subject (TSDoc `/**…*/` doc blocks). A multiline grep for a `/**` block whose first content line opens with any listed imperative verb, and a grep for `@returns` followed by `Whether`, `` `true` ``, or `true `, both returned no hit across /home/user/fleet/sse/src (the tree has no app/ directory — confirmed by Glob returning no files for /home/user/fleet/sse/app/**). 

Finding outside the claim: a plain `//` line-comment sweep (not TSDoc `/**` blocks) turns up two pre-existing hits: /home/user/fleet/sse/src/core/SSEParser.ts:67 (`// Read cursor into ...`) and SSEParser.ts:212 (`// Apply one parsed field to ...`). Both are private-field/private-method implementation comments, untouched by this diff (not present in voice-sse.diff), and not `/** */` TSDoc blocks — the claim's own wording targets "a doc block", so these do not fall under it as written. Whether an internal `//` explanatory comment should be swept for TSDoc voice is a scope judgment the writer's brief did not clearly cover; flag as a referral rather than a claim-4 failure, since claim 4's literal text (doc block) is satisfied.

Claim 5 — CONFIRMED. voice-sse-report.md:56-62 quotes each gate with its exact command and exit code: `npm run format:check` exit 0, `npm run lint:check` exit 0, `npm run check` exit 0, `npm run build` exit 0, `npm test` exit 0, with a one-line reading for each. Per the claim's own rule, this evidence makes the gates claim CONFIRMED on the quoted evidence; the Orchestrator's own landing-chain run remains the authoritative run per report.md:66.

Findings outside the claims:

Referral (not a claim failure): two pre-existing private `//` implementation comments at /home/user/fleet/sse/src/core/SSEParser.ts:67 and :212 open with imperative verbs ("Read cursor into...", "Apply one parsed field..."). They are untouched by this diff and are not TSDoc `/** */` doc blocks, so claim 4 as literally written (doc blocks) is unaffected. Whether the voice-rewrite policy is meant to reach internal `//` explanatory comments on private members, and if so whether this unit's scope included them, is a design-fit judgment for the subjective lane or the Orchestrator, not a mechanical determination.

## Orchestrator

Subjective claim 2 broke on the `NUL` constant's sentence restating the symbol as a code token while the unit dropped the same construction from `BOM`; ruled with the lane: `Names the null byte (\`U+0000\`).` (fix-up brief `voice-sse-fixup-brief.md`, builder on Sonnet). The writer's retention of `data`, `event`, `id`, and `retry` as the SSE wire field names stands (a domain term that is the value's own name). Checker claim 2 broke only on the mandated `@returns` form (carved out for later slices). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
