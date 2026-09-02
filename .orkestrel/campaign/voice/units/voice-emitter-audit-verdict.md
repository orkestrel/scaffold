# Audit verdict — unit voice-emitter

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `fdb2e36`
(`units/voice-emitter.diff`, `units/voice-emitter.status`, `units/voice-emitter-report.md`).
Rewritten per the writer: imperative 1, verbless 9, name 0, returns 0. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Opus 5, the writer's engine, because the Sol bench is dark. Evidence read: the diff at /home/user/scaffold/tmp/units/voice/voice-emitter.diff, the status at /home/user/scaffold/tmp/units/voice/voice-emitter.status, the post-state tree files /home/user/fleet/emitter/src/core/types.ts, /home/user/fleet/emitter/src/core/Emitter.ts, /home/user/fleet/emitter/src/core/helpers.ts, /home/user/fleet/emitter/src/core/factories.ts, the rule at /home/user/fleet/emitter/node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md lines 71-85 (the package carries no local .claude/rules copy; the vendored text is byte-identical to the scaffold checkout's), and /home/user/fleet/emitter/guides/emitter.md plus /home/user/fleet/emitter/tests/guides.test.ts for parity exposure. I ruled on the diff and the tree, not on the writer's report.

Claim 1 — meaning kept in every rewritten first sentence: BROKEN.

I sampled every hunk. Nine of the ten preserve the action, the subject, and the qualifiers:
- /home/user/fleet/emitter/src/core/helpers.ts:2 "Extract" to "Extracts" — pure voice change.
- /home/user/fleet/emitter/src/core/Emitter.ts:13 "A typed synchronous event emitter" to "Implements a typed synchronous event emitter" — verb added, rest intact.
- /home/user/fleet/emitter/src/core/types.ts:1 "An event map — each event name maps to the argument tuple its listeners receive." to "Maps each event name to the argument tuple its listeners receive." — the dropped phrase is the self-label the name-repetition clause targets; the substance survives whole.
- types.ts:4, types.ts:21, types.ts:28, types.ts:32, types.ts:40, types.ts:45 — verb added or self-label folded into the verb; action, subject, and qualifiers unchanged. types.ts:45 adds the noun "the teardown state", which names a fact the block already carried and matches the vocabulary of `destroy()` at types.ts:95 ("Tears down the emitter").

One hunk moves meaning. /home/user/fleet/emitter/src/core/types.ts:8:

  before: "The emitter's OWN listener-error handler — invoked when a listener throws during `emit`, ..."
  after:  "Receives the emitter's OWN listener errors — invoked when a listener throws during `emit`, ..."

The possessive and the emphatic `OWN` were reattached from "handler" to "errors". The emitter does not own the errors — a user listener throws them, as this same block's own `@remarks` states at types.ts:12-13 ("a throwing listener is isolated by the emitter and its error routed here"). What the emitter owns is the handler, which is the point `OWN` was carrying. The rewrite also duplicates itself: "Receives ... errors" followed by "with the caught error".

Claim 2 — third-person `-s` verb that fits the symbol, symbol name not repeated: CONFIRMED.

Every rewritten sentence opens with a third-person `-s` verb: Maps (types.ts:1), Represents (types.ts:4), Receives (types.ts:8), Declares (types.ts:21), Configures (types.ts:28), Holds (types.ts:32), Represents (types.ts:40), Reports (types.ts:45), Implements (Emitter.ts:13), Extracts (helpers.ts:2). Each verb describes the role its symbol plays: `Holds` for the readonly property `error`, `Reports` for the readonly boolean `destroyed`, `Implements` for the class against `Represents` for the interface it satisfies, `Configures` for the options bag. None misdescribes.

Reading recorded for the name clause: I read "repeats the symbol's name" as naming the symbol instead of describing it, not as banning the common noun inside a description. A literal reading admits nothing — the fixed `EventMap` sentence still contains "event" and opens with "Maps" — so the literal reading cannot be the rule's sense. Under the working reading no rewritten sentence names its symbol as an identifier, so the clause holds. Two sentences keep the descriptive phrase "a typed synchronous event emitter" (Emitter.ts:13, types.ts:40) while `EventMap` lost "An event map"; that asymmetry is treatment of a self-label folded into a verb, not a name repetition, and I do not break the claim on it.

Claim 3 — boolean `@returns` reads "True if ...; false otherwise": CONFIRMED, vacuous.

The population is empty. `src/` holds three `@returns` tags and none is boolean: types.ts:86 returns a number, helpers.ts:12 returns a readonly array, factories.ts:15 returns `EmitterInterface`. The diff rewrote no `@returns` line. The claim holds over an empty set; it is evidenced, not merely unfalsified. `EmitterInterface.destroyed` (types.ts:45) is a readonly property, not a return, so its rewording sits outside this claim — see finding F2.

Claim 4 — no already-satisfying sentence rewritten, and no `@example`, `@param`, `@remarks`, `@throws`, or later sentence touched: CONFIRMED.

Each rewritten original lacked a leading third-person `-s` verb: helpers.ts was imperative ("Extract"), and the other nine opened with a bare noun or adjective phrase ("A typed synchronous event emitter", "An event map", "A listener for", "The emitter's OWN listener-error handler", "Initial event listeners", "Options for", "The emitter's listener-error handler", "True after `destroy()`"). None satisfied the first-sentence rule before the change. Sentences that already satisfied it are untouched: factories.ts:5 "Creates a typed event emitter", and every `EmitterInterface` method block at types.ts:48, 55, 63, 70, 83, 90, 95 ("Registers", "Registers", "Removes", "Invokes", "Returns", "Drops", "Tears down").

Every hunk in the diff changes exactly one line, and that line is the first sentence's opening line. No `@remarks`, `@param`, `@typeParam`, `@returns`, `@example`, or later sentence appears as a changed line — they appear only as context. No non-comment token changed. The status lists src/core/Emitter.ts, src/core/helpers.ts, src/core/types.ts and nothing else, and the tree matches the diff's post-state. No guide or test pins a rewritten sentence: tests/guides.test.ts asserts export bijection, method bijection, example presence, fence imports, and link resolution (lines 54-162), never sentence text.

Findings outside the claims:

REQUIRED CHANGE

R1. /home/user/fleet/emitter/src/core/types.ts:8 — the `EmitterErrorHandler` first sentence.
Wrong: "Receives the emitter's OWN listener errors" attributes the errors to the emitter. The errors are thrown by user listeners; the emitter owns the handler that receives them. The block's own `@remarks` at types.ts:12-13 says so, and the package says it in three other places with the same phrase: types.ts:32 "Holds the emitter's listener-error handler", Emitter.ts:55-56 "The emitter's own listener-error handler — a listener throw is routed here", guides/emitter.md:60 "the emitter's OWN listener-error handler (the `error` option)".
Why it matters: this wave is a voice migration whose whole contract is that meaning does not move. Here it moved possession onto a different noun, so the package's most-repeated shared phrase now has one dissenting copy, and a reader of `EmitterErrorHandler` learns the emitter produces the errors while the next paragraph says a listener throws them. The rewrite also states the same fact twice, "receives ... errors" and then "with the caught error", where the original's head noun made the dash clause additive.
What right looks like: keep the noun and its possessive intact and add the verb the wave prescribes for a type — "Represents the emitter's OWN listener-error handler — invoked when a listener throws during `emit`, with the caught error and the (stringified) event name." If the name-repetition clause is read to forbid "handler" in `EmitterErrorHandler`'s own block, use instead "Routes a listener's throw to the emitter's OWN error channel — invoked with the caught error and the (stringified) event name." Either keeps `OWN` on the emitter's machinery, which is what it was there to mark.

FINDINGS OUTSIDE THE CLAIMS

F2. Two forms now state a boolean fact. /home/user/fleet/emitter/src/core/types.ts:45 turned "True after `destroy()`; false otherwise." into "Reports the teardown state: true after `destroy()`; false otherwise." The rule fixes "True if ...; false otherwise" for a boolean return, and `destroyed` is a readonly property, so this is inside the rule as written and I do not require a change. It matters because the wave's own signature shape is now downcased and subordinated in the one place the package used it, and the next package's unit has no ruling to follow. Right: the Orchestrator rules once for the fleet whether a boolean property keeps the capitalized shape, and records it in the wave brief. The minimal form that satisfies both halves is "Reports true after `destroy()`; false otherwise."

F3. Verb stance splits across sibling callback types. /home/user/fleet/emitter/src/core/types.ts:4 reads "Represents a listener for one event's argument tuple", and types.ts:8 reads "Receives ...". Both symbols are function-type aliases of the same kind, one paragraph apart, and they take opposite rhetorical stances — one describes the type, the other describes what a value of the type does. `Configures` (types.ts:28) and `Holds` (types.ts:32) are correct for an options bag and a property, so the finding is not a demand for one uniform verb; it is that the two callback types must agree. Right: give both `Represents`, which R1's first form already does, or state the callback-type stance in the wave brief and apply it to both.

F4. The guide's voice now trails the source it documents. /home/user/fleet/emitter/guides/emitter.md summarizes the same API in the imperative and in bare noun phrases: line 40 "Create an `EmitterInterface<TMap>`", line 46 "Extract an object's own enumerable keys", line 52 "The typed synchronous emitter", lines 58-63 the Types rows, lines 77-83 "Register a listener", "Remove a listener", "Invoke an event's listeners", "Tear down". helpers.ts:2 now reads "Extracts ..." against the guide's "Extract ...", and types.ts:48 "Registers ..." against the guide's "Register ...". The unit was correctly forbidden to touch guides, so this is not a defect of the work under audit. It matters because the wave leaves each package half-migrated in the surface a human reads first, and nothing gates it: tests/guides.test.ts checks names, exports, examples, and links only. Referral to the Orchestrator: name the carrier for the guide half of this wave, or record on /home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md that guide table summaries are intentionally outside it, so the next package does not re-open the question.

F5. The report's tally does not match the diff it describes (no change required; recorded because the next unit reads it). /home/user/scaffold/tmp/units/voice/voice-emitter-report.md:13 records "First sentence reworded to drop the symbol name | 0", but types.ts:1 dropped "An event map" and types.ts:28 dropped "Options for", both self-labels removed in the rewrite. The rewrites are right; the classification is not. It matters because the campaign is using these per-kind counts as the population shape for the remaining packages, and a bucket recorded empty here reads as a transform that never fires.

NOT-EVIDENCED

Nothing in this subject is rendered or externally driven, so no capture portfolio applies. I did not run gates and take no position on the report's gate table or on its acceptance-instrument re-run; that is the verifier's and the checker's evidence, not mine.

## Checker lane (PASS)

1. CONFIRMED — every `-`/`+` pair in `voice-emitter.diff` sits inside a `/** … */` block (Emitter.ts:10, helpers.ts:1, types.ts:1,4,7,10,19,21,39,48,56,61,69,76). No hunk touches a code token, only prose text within existing comment lines.
2. CONFIRMED — every backtick token, none of which include `{@link}` or a URL in this diff, is byte-identical between removed and added lines: `emit` (types.ts:40/62), `` `on` `` (types.ts:49), `` `createEmitter` ``/`` `Emitter` `` (types.ts:56-57), `` `#emitter` ``/`` `readonly emitter` `` (types.ts:71), `` `destroy()` `` (types.ts:77). Only surrounding prose (verb, connector "/" to "and") changed, never a token.
3. CONFIRMED — `voice-emitter.status` (3 lines) lists only `src/core/Emitter.ts`, `src/core/helpers.ts`, `src/core/types.ts`; nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`.
4. CONFIRMED — grepping `/home/user/fleet/emitter/src` for the imperative-verb pattern and for `@returns Whether|` `true`` |true ` returned no matches; `/home/user/fleet/emitter/app` does not exist (Glob found no files), matching the report's claim of no `app/` directory.
5. CONFIRMED (on quoted evidence, per the brief's own rule) — `voice-emitter-report.md:44-53` quotes exact commands and exit codes for `npm run format:check` (0), `npm run lint:check` (0), `npm run check` (0), `npm run build` (0), and `npm test` (0). This is not independent verification; the Orchestrator's landing chain remains the authoritative run, as the report itself states.

Findings outside the claims:

No findings outside the claims. The diff is a pure TSDoc-voice rewrite confined to three `src/core/*.ts` files, scope matches the status output exactly, and the sweep for residual imperative/verbless openings and boolean `@returns` phrasing across `src/` (and the absent `app/`) returns clean.

## Orchestrator

Subjective claim 1 broke on the `EmitterErrorHandler` sentence: the rewrite moved the possessive and `OWN` from the handler onto the errors, which user listeners throw. Ruled with the lane: `Represents the emitter's OWN listener-error handler — …` (fix-up brief `voice-emitter-fixup-brief.md`, builder on Sonnet). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
