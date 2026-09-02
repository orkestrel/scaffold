# Audit verdict — unit voice-ndjson

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `293ed4a`
(`units/voice-ndjson.diff`, `units/voice-ndjson.status`, `units/voice-ndjson-report.md`).
Rewritten per the writer: imperative 2, verbless 2, name 0, returns 0. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice). Writer engine and this lane are both Claude Opus 5; the Sol bench is dark and the brief records the substitution.

Every hunk in /home/user/scaffold/tmp/units/voice/voice-ndjson.diff was sampled, and every doc block under /home/user/fleet/ndjson/src was read in the tree. There is no app/ directory (Glob over /home/user/fleet/ndjson/app/** returns nothing) and src/core/index.ts carries no doc block, so the population is the interface block, the `parse` member, the `clear` member, the class block, and the factory block.

1. BROKEN. Three of the sampled hunks keep their meaning exactly; one does not.

   - /home/user/fleet/ndjson/src/core/factories.ts:5 — `Create an NDJSON …` to `Creates an NDJSON …`. Conjugation only; same action, subject, qualifiers. Meaning kept.
   - /home/user/fleet/ndjson/src/core/types.ts:8 — `Append \`chunk\`, then return every COMPLETE …` to `Appends \`chunk\`, then returns every COMPLETE …`. Conjugation only; the parenthetical and the trailing-partial clause are byte-identical. Meaning kept.
   - /home/user/fleet/ndjson/src/core/types.ts:2 — `A stateful NDJSON (newline-delimited JSON) stream parser: feed it …` to `Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it …`. A prefix only; the noun `parser` stays, so `it` in `feed it string chunks` still resolves. Meaning kept.
   - /home/user/fleet/ndjson/src/core/NDJSONParser.ts:5-6 — MEANING CHANGED. The line reads `Decodes an NDJSON (newline-delimited JSON) stream statefully — feed it string chunks, get back the complete JSON objects decoded so far.` The replaced sentence opened with the noun phrase `A stateful NDJSON (newline-delimited JSON) stream parser`, which was the antecedent of `it` in the clause after the em dash. The rewrite dropped that noun and kept the clause unchanged, so `it` now has only `stream` available as a referent and the sentence reads as feeding the stream, which inverts the direction of the data: the stream is the source, and its chunks are fed to the parser. A referent the retained clause depends on was dropped, so the claim's `nothing dropped` test fails on this hunk. The sibling rewrite at types.ts:2 kept the noun and is the proof that the loss was avoidable.

2. CONFIRMED. Each rewritten opener is a third-person `-s` verb that fits its symbol, and none restates its symbol's identifier.

   - types.ts:2 `Represents` for the `NDJSONParserInterface` interface — the form the wave brief names for an interface.
   - types.ts:8 `Appends` for `parse` — accurate; the method does append the chunk before splitting (NDJSONParser.ts:32).
   - NDJSONParser.ts:5 `Decodes` for the `NDJSONParser` class — accurate against the implementation, which parses each complete line to a record (NDJSONParser.ts:31-44).
   - factories.ts:5 `Creates` for the `createNDJSONParser` factory — the form the rule names for a factory.

   On name repetition I rule the interface sentence acceptable rather than broken: `Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it string chunks, get back the complete JSON objects decoded so far` reconstructs the words of `NDJSONParserInterface`, but it carries statefulness, the feed-and-get-back contract, and the trailing-partial behaviour that the identifier does not. The rule bans a sentence that adds nothing over the name, and this one adds those facts. The strict reading is also what produced the defect ruled in claim 1: avoiding the noun `parser` in the class block is exactly what removed the pronoun's antecedent.

3. CONFIRMED, over an empty population. No boolean `@returns` exists in the package. A grep of `^\s*\*\s*@returns` across /home/user/fleet/ndjson/src returns types.ts:13 (`Every complete line parsed to a record, in arrival order`), types.ts:20 (`Nothing`), and factories.ts:8 (`A working {@link NDJSONParserInterface}`). None returns a boolean, so the `True if …; false otherwise` form has nothing to govern here and the diff rewrites no `@returns` line.

4. CONFIRMED. The diff changes one line per hunk, and each changed line carries a first sentence.

   - The `clear` block was already third person and stands untouched at types.ts:17 (`Drops any buffered partial line, leaving the handle ready for a fresh stream.`); it appears in no hunk.
   - The `@remarks` block at NDJSONParser.ts:8-16 and the `@example` fence at NDJSONParser.ts:18-26 sit in diff context lines only.
   - The `@param` at types.ts:12, the `@returns` at types.ts:13 and types.ts:20, the `@returns` at factories.ts:8, and the `@example` fence at factories.ts:10-18 are untouched.
   - Within each rewritten line, the text after the first sentence's opening words is carried over unchanged, so no later sentence moved.
   - git status --short lists only src/core/NDJSONParser.ts, src/core/factories.ts, and src/core/types.ts.

Findings outside the claims:

REQUIRED CHANGE (this is the substance of claim 1)

/home/user/fleet/ndjson/src/core/NDJSONParser.ts:5-6. The class summary reads `Decodes an NDJSON (newline-delimited JSON) stream statefully — feed it string chunks, get back the complete JSON objects decoded so far.` What is wrong: the rewrite deleted the noun `parser` that `it` referred to, and left the clause that depends on it. Why it matters: this sentence is the first thing a consumer reads on hover over the package's only class, and as written it instructs the reader to feed the stream, which is the opposite of how the class works — chunks of the stream are fed to the handle. It is also the one place where the package's house construction, a noun followed by `— feed it string chunks` (README.md:3, guides/ndjson.md:3, src/core/types.ts:2), lost its noun. What right looks like: name the referent inside the first sentence and change nothing else, for example `Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete JSON objects decoded so far.` The word `handle` is already the package's own term for the object (factories.ts:6 `a stateful handle`; types.ts:18 `leaving the handle ready`; guides/ndjson.md:15), so it restores the antecedent without reintroducing the symbol's name and without touching a code token, a link, or a later sentence.

OBSERVATIONS — not required changes to this diff

- Second term for one act. /home/user/fleet/ndjson/src/core/NDJSONParser.ts:5 now leads with `Decodes`, while the package names the act `parse` everywhere else: the `parse` method, `NDJSONParser`, `createNDJSONParser`, README.md:3 (`A minimal streaming NDJSON parser`), and guides/ndjson.md:72 (`The stateful NDJSON stream parser`). AGENTS.md § Design laws requires one term per concept. I do not rule this a required change: the wave forces an `-s` verb on this block, `Parses` would echo the symbol's identifier, and the block's own following clause already read `decoded so far` before the change, so the word is resident in the paragraph. Record the choice as deliberate or route the vocabulary question to a successor pass; do not leave it undecided.
- Ragged wrap. /home/user/fleet/ndjson/src/core/types.ts:2 now runs to 86 columns while the following lines of the same block wrap near 76, because `Represents ` was prefixed without rewrapping. The formatter does not rewrap comments, so no gate catches it; a human reading the file sees one long line over a short paragraph. What right looks like: rewrap the block's lines to the width the block already used.
- Opener foregrounds the side effect. /home/user/fleet/ndjson/src/core/types.ts:8 opens `Appends \`chunk\`, then returns every COMPLETE …`, so the summary of `parse` leads with buffering rather than with what the caller gets back. The wave's minimal conjugation is correct and meaning-preserving, and rewording the lead would exceed this unit's mandate, so this closes nothing here. Carry it as a candidate for whichever pass owns first-sentence emphasis.
- Report ambiguity. /home/user/scaffold/tmp/units/voice/voice-ndjson-report.md:34-37 reads `The container restart left three files rewritten. Three of those four rewrites stand as written.` The tally in the first sentence counts files and the tally in the second counts rewrites, so the sentence reads as an arithmetic error, and the passage never names which blocks the interrupted run produced against the block this run corrected. An auditor whose subject is the report cannot separate the two runs from it. What right looks like: name the blocks the interrupted run left and the block this run changed, without counting them.

REFERRALS — outside the subjective lane, no verdict from me

- To the Orchestrator (the objective lane is dark): guides/ndjson.md:83 carries the `parse` behaviour text `Append \`chunk\`, then return every COMPLETE \`\n\`-terminated line parsed to a record …`, which is the pre-rewrite TSDoc sentence in the imperative, and guides/ndjson.md:84 carries `Drop any buffered partial line …` against the source's `Drops …`. Guides are off-limits to this unit and the wave brief forbids editing them, so nothing here is this diff's defect. The question is whether the wave leaves the guide's method-table register deliberately imperative or owes a successor unit; the writer's report at lines 84-87 states no parity test reads doc-block prose, and I did not verify that test claim because it is a correctness question.
- To the Orchestrator: the report at lines 78-82 states the repository has no `.claude/rules/` directory and that the rule text read was the vendored copy at node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md. I compared the rewrites against /home/user/scaffold/.claude/rules/typescript.md:75-78, which states the same requirement. Confirming that the vendored copy in the target matches is a mechanical check outside this lane.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in voice-ndjson.diff:1-44 changes only comment lines beginning ` * `; no code token appears in any `-`/`+` pair (NDJSONParser.ts:9-10, factories.ts:22-23, types.ts:33-34,40-41).

Claim 2 — CONFIRMED. The only backtick token in a changed line is `` `chunk` `` (types.ts hunk line 40→41), byte-identical across old and new. No `{@link …}` or URL appears in any changed line.

Claim 3 — CONFIRMED. voice-ndjson.status:1-3 lists exactly `src/core/NDJSONParser.ts`, `src/core/factories.ts`, `src/core/types.ts`; nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/`.

Claim 4 — CONFIRMED. Grep of `/home/user/fleet/ndjson/src` for the imperative-verb-opener pattern and for the boolean `@returns` pattern (`Whether`, `` `true` ``, `true `) returns no hit. `/home/user/fleet/ndjson/app` does not exist, so the `app/` half of the sweep is vacuously satisfied.

Claim 5 — CONFIRMED on quoted evidence, per the brief's own rule. voice-ndjson-report.md:43-49 quotes each gate command with its exit code: `npm run format:check` 0, `npm run lint:check` 0, `npm run check` 0, `npm run build` 0, `npm test` 0. The Orchestrator's landing chain remains the authoritative run, as the report itself notes (voice-ndjson-report.md:52-53).

Findings outside the claims:

No findings outside the numbered claims. The diff is a pure four-line comment rewording across three files, status is scope-clean, no forbidden imperative/verbless/boolean opener pattern remains in src/, and app/ is absent so it imposes no obligation. The report's own note that no guide parity test pins TSDoc prose (report:84-87) is accurate per this checker's independent read of the claims list, which contains no guide-parity claim, so it required no separate verdict here.

## Orchestrator

Subjective claim 1 broke on one sentence: the `NDJSONParser` class summary dropped the noun its `feed it` clause referred to, so the stream read as the thing fed. Ruled with the lane: `feed the handle` restores the referent without the symbol's name (fix-up brief `voice-ndjson-fixup-brief.md`, builder on Sonnet). The interface sentence's use of `parser` stands as the lane ruled (it carries facts the identifier does not). The unit ran from the successor brief after the container restart, over the partial sweep the killed run left. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
