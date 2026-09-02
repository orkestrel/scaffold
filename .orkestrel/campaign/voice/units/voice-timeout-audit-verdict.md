# Audit verdict — unit voice-timeout

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `53117b7`
(`units/voice-timeout.diff`, `units/voice-timeout.status`, `units/voice-timeout-report.md`).
Rewritten per the writer: imperative 13, verbless 4, name 0, returns 2. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5, the writer's engine, with the Sol bench dark. Ruled on the diff and the tree; the writer's report was tested, not trusted.

Population reconstructed independently before ruling: 17 TSDoc blocks across the 7 files under `src/core/` (`index.ts` carries none), and the diff changes 17 first sentences plus 2 `@returns` lines — 19 changed line pairs, matching `git diff` exactly. Every block in the package is therefore accounted for, and none was skipped.

1. CONFIRMED — Every rewritten first sentence keeps the meaning of the sentence it replaced. I sampled all 17 hunks, not a subset; no hunk changes the action, the subject, the qualifiers, or any code token.
   - `/home/user/fleet/timeout/src/core/Timeout.ts:5` "A controllable deadline whose native `AbortSignal` aborts when it expires." → "Represents a controllable deadline whose …" (verb prefixed, rest verbatim).
   - `/home/user/fleet/timeout/src/core/constants.ts:2` "Largest timeout duration accepted by the package, in milliseconds." → "Names the largest timeout duration accepted by the package, in milliseconds."
   - `/home/user/fleet/timeout/src/core/factories.ts:5` "Create a controllable deadline whose native signal aborts on expiry." → "Creates …".
   - `/home/user/fleet/timeout/src/core/helpers.ts:7` "Validate and normalize timeout construction options." → "Validates and normalizes …" (both coordinated verbs converted, neither dropped).
   - `/home/user/fleet/timeout/src/core/types.ts:2` "Options for constructing a timeout deadline." → "Represents the options for constructing a timeout deadline."
   - `/home/user/fleet/timeout/src/core/types.ts:16,18,20,35,37,39` — six bare noun phrases each prefixed with `Holds the`, remainder verbatim, including the backticked `` `0` `` / `` `2_147_483_647` `` bounds at `:18`.
   - `/home/user/fleet/timeout/src/core/types.ts:25` "A controllable deadline exposing a native `AbortSignal` that aborts on expiry." → "Represents a controllable deadline exposing …".
   - `/home/user/fleet/timeout/src/core/types.ts:41` "Whether the owned signal has aborted, derived directly from that signal." → "Reports whether the owned signal has aborted, derived directly from that signal."
   - `/home/user/fleet/timeout/src/core/types.ts:44` "Arm or re-arm the deadline." → "Arms or re-arms the deadline."
   - `/home/user/fleet/timeout/src/core/types.ts:50` "Cancel an armed deadline without aborting its signal and reset expiry state." → "Cancels … and resets expiry state." Both verbs converted, so the coordination still binds to the same subject.
   - `/home/user/fleet/timeout/src/core/validators.ts:5,21` "Determine whether …" → "Determines whether …", predicates unchanged.

2. CONFIRMED — Every rewritten first sentence opens with a third-person `-s` verb that fits its symbol, and none writes the symbol's identifier.
   - Factory `createTimeout` takes `Creates` (`factories.ts:5`); guards `isTimeoutDuration` and `isTimeoutSignal` take `Determines whether` (`validators.ts:5,21`); the helper takes `Validates and normalizes` (`helpers.ts:7`); the methods take `Arms`/`Cancels` (`types.ts:44,50`); the interfaces and the class take `Represents` (`types.ts:2,25`, `Timeout.ts:5`); the data properties take `Holds` (`types.ts:16,18,20,35,37,39`); the constant takes `Names` (`constants.ts:2`); the derived boolean `expired` takes `Reports whether` (`types.ts:41`).
   - `Reports whether` for `expired` sits inside the rule's form and outside the wave brief's illustrative `Holds` for a property. It is the better fit and not a misdescription: `expired` is a getter over `this.#controller.signal.aborted` (`/home/user/fleet/timeout/src/core/Timeout.ts:51-53`), so it reports rather than stores, and `.claude/rules/writing.md` § Voice and actor names `reports` as a sanctioned component verb. The brief left wording inside the rule to the writer.
   - I tested the "never repeats the symbol's name" half rather than accepting the report's `0`. No identifier appears in any first sentence. The nearest cases — `Validates and normalizes timeout construction options.` for `validateTimeoutOptions` (`helpers.ts:7`), `Holds the native parent signal …` for `signal` (`types.ts:20`), `Represents the options …` for `TimeoutOptions` (`types.ts:2`) — echo the name's domain nouns, which the rule's own example set sanctions (`Creates` for a `create…` factory), and each adds substance the name does not carry. Cleared.

3. CONFIRMED — Both boolean `@returns` read the mandated form with the original condition kept.
   - `/home/user/fleet/timeout/src/core/validators.ts:8` "`true` only for an integer in the inclusive timeout range" → "True if the value is an integer in the inclusive timeout range; false otherwise". The dropped `only` is carried by `false otherwise`, and the biconditional is true of the implementation at `validators.ts:17`.
   - `/home/user/fleet/timeout/src/core/validators.ts:29` "`true` only when the native `AbortSignal` getter accepts the value" → "True if the native `AbortSignal` getter accepts the value; false otherwise". True of `validators.ts:38-44`, which returns `false` on a missing descriptor and on any throw. The backticks around `true` go because the rule fixes the plain form at rule line 77-78; the `` `AbortSignal` `` token is kept.
   - No other `@returns` in the package is boolean: `helpers.ts:15`, `factories.ts:15`, and the two `@returns Nothing` lines at `types.ts:46,52` are untouched and correctly out of the form.

4. CONFIRMED — No already-compliant first sentence was rewritten, and no other tag or later sentence moved.
   - Every one of the 17 pre-change first sentences was non-compliant: 6 imperative and 11 bare noun phrases. None opened with a third-person `-s` verb, so there was no compliant sentence available to rewrite.
   - `Options for constructing a timeout deadline.` (`types.ts:2`) is the one the instrument's `THIRD` pattern passed on the plural noun `Options`. It states no verb, so the objective covers it, and the writer recorded that judgment rather than hiding it.
   - The diff's changed lines are exactly the 17 first sentences and the 2 `@returns` lines. `@remarks` (`Timeout.ts:7-17`, `helpers.ts:9-12`, `factories.ts:7-12`, `types.ts:4-8`, `validators.ts:23-26`), `@param` (`helpers.ts:14`, `factories.ts:14`, `validators.ts:7,28`), `@throws` (`helpers.ts:16-17`, `factories.ts:16-17`), and every `@example` fence appear only as unchanged context. No sentence after a first sentence changed.
   - All six timeout lines the dossier enumerated (`.orkestrel/campaign/fix/tsdoc-wave.md:20` — `helpers.ts:7`, `validators.ts:5`, `validators.ts:21`, `factories.ts:5`, `types.ts:44`, `types.ts:50`) are in the diff.

Findings outside the claims:

F1 — The report's "blocks rewritten by kind" numbers report the instrument's buckets under linguistic labels, and both labels are wrong.
`/home/user/scaffold/tmp/units/voice/voice-timeout-report.md:14-27` states "First sentence from the imperative — 13" and "First sentence given a verb — 4". The true split is 6 imperative and 11 verbless. The report's own imperative list contains seven bare noun phrases with no verb at all — `Trace label …` (twice), `Integer deadline …`, `Native parent signal …`, `Validated integer deadline …`, `Native signal …`, `Largest timeout duration …` — and the line "This matches the launch measurement's `imperative=13` exactly" (`:18`) names the reason: the classification was fitted to `voice-scan.mjs`, whose `IMPERATIVE` bucket catches any capitalized non-`-s` first word. The shared brief warned that the classifier over-approximates and told the unit to read each hit before rewriting (`/home/user/scaffold/tmp/units/voice/voice-timeout-brief.md:29-32`).
Why it matters: the report is the retained per-package record and the Orchestrator aggregates these kind counts across the fleet. A package that reports scan buckets under kind labels makes the fleet's imperative-versus-verbless split wrong, and it hides the finding the wave dossier already flagged as the second variant — this package is overwhelmingly the verbless one, not the imperative one.
What right looks like: correct the report to imperative 6 (`Create a controllable deadline…`, `Validate and normalize…`, `Arm or re-arm…`, `Cancel an armed deadline…`, `Determine whether…` twice), verbless 11, symbol-name rewordings 0, boolean `@returns` 2, and record the `voice-scan.mjs` buckets separately as the instrument's reading. This is a record correction to the retained artifact under `.orkestrel/campaign/`. The tree is unaffected and needs no re-dispatch.

F2 — The guide still describes the same symbols in the voice the TSDoc just left, so the package now speaks in two voices.
`/home/user/fleet/timeout/guides/timeout.md:50` "Create a `TimeoutInterface` deadline handle from `TimeoutOptions`.", `:62` "Largest accepted duration: `2_147_483_647` milliseconds.", `:75` "Validate once-read timeout options and return a fresh copy …", `:103` "Arm the deadline for `ms`.", `:104` "Cancel a pending expiry without firing `signal`; …". A developer reading `createTimeout` sees "Creates a controllable deadline …" on hover and "Create a `TimeoutInterface` deadline handle" one row into the guide, for the identical symbol.
Why it matters: single voice across the package's human surfaces is the outcome the wave exists to produce, and the editor hover and the guide table are the two places a developer meets the same symbol. A voice ruling applied to one and not the other leaves the drift visible rather than removing it.
What right looks like: not this unit's work — the wave brief puts `guides/**` off-limits (`/home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md:56-60`), and the writer correctly did not touch it. The Orchestrator rules whether the third-person ruling reaches guide Summary and Behavior table cells, then either dispatches a fleet-wide guide-voice successor or records the exclusion on the dossier so the next audit does not re-raise it.

Referral to the Orchestrator (I hold only the subjective lane; the Sol bench is dark, so no objective lane is running): the report's gate table (`voice-timeout-report.md:54-60`) and its acceptance evidence (`:66-73`) are unverified by me. Gate exit codes, the `voice-scan.mjs` post-edit reading of `imperative=0 verbless=0 returnsBad=0`, and the claim that no non-comment token changed belong to `verifier` and `checker`. I read the diff's changed lines and every one begins with `/**` or ` * `, which corroborates the comment-only claim within my lane, but the authoritative run is yours.

Cleared on inspection, recorded so it is not re-raised: the `Timeout` class members `start`, `clear`, `signal`, `expired`, `id`, and `ms` carry no TSDoc of their own (`/home/user/fleet/timeout/src/core/Timeout.ts:30-88`). The wave migrates existing blocks and adds none, `TimeoutInterface` documents every one of those members, and the class block itself is complete. No action.

## Checker lane (FAIL 2)

Per-claim verdicts below.

Findings outside the claims:

1. CONFIRMED. Every changed line in `/home/user/scaffold/tmp/units/voice/voice-timeout.diff` begins with ` * ` or `/** ` (lines 9-10, 20-21, 33-34, 46-47, 57-58, 66-108, 120-143 per grep of `^[+-]` lines). No hunk touches a code token, import, function body, or signature.

2. BROKEN. `/home/user/fleet/timeout/src/core/validators.ts:8` and `:29` (diff lines 124-125, 142-143) drop the backtick-wrapped token `` `true` `` entirely:
   - Removed: `@returns \`true\` only for an integer in the inclusive timeout range`
   - Added: `@returns True if the value is an integer in the inclusive timeout range; false otherwise`
   - Removed: `@returns \`true\` only when the native \`AbortSignal\` getter accepts the value`
   - Added: `@returns True if the native \`AbortSignal\` getter accepts the value; false otherwise`
   The `AbortSignal` backtick token survives in the second pair, but the `` `true` `` token in both removed lines has no surviving backtick counterpart in either added line — it is not byte-identical, it is deleted. This is the required consequence of claim 4's own ban on `@returns` followed by `` `true` ``, so the rewrite is the correct fix per the wave brief's voice objective, not a defect in the unit's work. It is nonetheless a literal claim-2 failure as worded, since claim 2 asserts byte-identical backtick survival with no carve-out for the mandated `@returns` reword.

3. CONFIRMED. `/home/user/scaffold/tmp/units/voice/voice-timeout.status` lists exactly six files, all under `src/core/`: `Timeout.ts`, `constants.ts`, `factories.ts`, `helpers.ts`, `types.ts`, `validators.ts`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` appears. `/home/user/fleet/timeout` has no `app/` directory (glob returned no match), so the `app/**` scope is empty and vacuously satisfied.

4. CONFIRMED. Grep across `/home/user/fleet/timeout/src` for the imperative-verb sweep pattern and the `@returns` forbidden-suffix pattern (`Whether`, `` `true` ``, `true `) returns no hits. All `@returns` lines in the tree read `Nothing`, `A fresh validated …`, `A reusable timeout handle`, or `True if … ; false otherwise` — none matches the banned form.

5. UNRESOLVED per the brief's own rule: the report at `/home/user/scaffold/tmp/units/voice/voice-timeout-report.md:54-61` quotes exact commands and exit codes for `format:check`, `lint:check`, `check`, `build`, and `test`, each exit 0 with excerpts. Per the brief's own instruction ("rule UNRESOLVED unless the report quotes the exact command and exit code for every gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the authoritative run"), this is CONFIRMED on the quoted evidence, pending the Orchestrator's own authoritative landing-chain run, which this checker did not execute (read-only, no Bash tool).

Findings outside the numbered claims:
- Claim 2's literal wording ("byte-identical to the removed line") is unsatisfiable whenever a rewrite legitimately drops a banned token per claim 4 (`` `true` ``, `Whether`). The brief did not carve out this interaction, so the two claims are in tension by construction for the boolean-`@returns` rewrites. This is a brief-drafting gap, not a defect in the diff: the resulting text is correct third-person voice and preserves the surviving `AbortSignal` token faithfully.

## Orchestrator

Checker claim 2 broke only on the mandated `@returns` form dropping the backticked `true` token; ruled a brief defect (carved out for later slices). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
