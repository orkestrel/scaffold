# Audit verdict — unit voice-process

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `d272bbe`
(`units/voice-process.diff`, `units/voice-process.status`, `units/voice-process-report.md`).
Rewritten per the writer: imperative 48, verbless 140, name 0, returns 21. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 2)

## 1. Meaning kept in every rewritten first sentence — CONFIRMED

I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-process.diff`, not a sample. No rewrite changes the action, the subject, or a qualifier a reader depends on. The deltas I found and ruled harmless:

- `src/core/types.ts:293`, `:509`, `src/server/Process.ts:189`, `src/server/Supervisor.ts:233` — the parenthetical adds the noun "the write" ("or the write remained unconfirmed through `delivery`"). The original read "or remained unconfirmed", whose grammatical subject was "the channel", which never was the thing left unconfirmed. The addition restores the sentence's intended referent rather than changing meaning, and it obeys the brief's binding lesson about keeping referents resolvable.
- `src/core/types.ts:126`, `:365`, `:730`, `:817` — "Construction options for X" became "Configures X", dropping "Construction". At `ProcessOptions` and `SessionOptions` the `@remarks` still fix the timing ("validated at construction", `src/core/types.ts:144`; "read once, before the child is spawned", `:375`). At `ProcessManagerOptions` and `ProcessErrorOptions` nothing restores it. This is the closest call in the diff; I rule it not a meaning change because the type is reachable only as a constructor parameter. See the observation on `ProcessErrorOptions` under findings.
- `src/core/types.ts:169`, `:657` — "Aborting this signal terminates the child…" became "Terminates the child … when this signal aborts." The trigger and the effect both survive; only the fronting moved.
- `src/server/helpers.ts:601` — `hasExited` lost "false while it is live" for "false otherwise". Equivalent, and the rule's boolean form requires it.
- `src/core/errors.ts:56` — "True only for a `ProcessError` instance" became "True if the value is a `ProcessError` instance; false otherwise". "; false otherwise" carries the exclusivity "only" carried.

## 2. Every rewritten first sentence opens with a fitting third-person `-s` verb and never repeats the symbol's name — BROKEN

Two rewritten first sentences open with no verb at all:

- `src/core/types.ts:659` — `ExecuteOptions.strict`: "If `true`, reject on failure; if `false`, resolve with the result instead. Default: `true`."
- `src/core/types.ts:685` — `ExecuteSyncOptions.strict`: "If `true`, throw on failure; if `false`, return the result instead. Default: `true`."

Both open with a condition and then a bare imperative (`reject`, `throw`, `resolve`, `return`), which also leaves the actor unnamed — `.claude/rules/writing.md` § Voice and actor requires the component that acts to be the subject. The writer disclosed the choice in its report and it matches the rule's other clause ("Describe a boolean parameter as 'If `true`, …; if `false`, …'") and the untouched siblings `ProcessCommand.isolated` (`src/core/types.ts:46`), `SpawnInput.verbatim` (`:84`), and `ProcessOptions.writable` (`:167`). So the exception is defensible against the rule while falsifying the claim as written.

What right looks like — one sentence satisfying both clauses and naming the actor, for example at `:659`: "Selects how a failure is delivered: if `true`, `execute` rejects with a {@link ProcessError}; if `false`, it resolves with the result. Default: `true`." The wording is the writer's; the opener must be the `-s` verb. The alternative is an Orchestrator ruling that the boolean-parameter form governs a boolean field, recorded once — because the same question governs `writable`, `isolated`, `verbatim`, and `ExecuteInput.expired`/`aborted`/`truncated` (`:619`-`:624`).

Bounding this: every other rewritten opener carries a verb that fits its symbol, including the imputed-actor forms `Names`, `Sets`, `Holds`, `Carries`, `Configures`, `Settles with`, `Yields`, which are uniform across the package.

I also attacked the "never repeats the symbol's name" half and it held. `SessionInterface.ending` ("Settles at the child's own ending", `src/core/types.ts:470`, `src/server/Session.ts:133`, `src/server/Supervisor.ts:204`), `lines` (`:217`), `code`, `signal`, and `settled` all carry the identifier's word in their rewritten sentence, but each is the value's own domain name, which the wave brief's binding pilot lesson expressly permits. Not a break.

## 3. Every rewritten boolean `@returns` reads `True if …; false otherwise` with the condition kept — CONFIRMED

Every rewritten `@returns` in the diff takes the mandated spine and keeps its condition: `src/core/errors.ts:56`; `src/core/types.ts:293`, `:310`, `:509`, `:545`, `:787`, `:788`; `src/server/types.ts:53`; `src/server/Process.ts:189`, `:204`; `src/server/Session.ts:153`, `:179`; `src/server/Supervisor.ts:233`, `:288`; `src/server/ProcessManager.ts:139`, `:149`; `src/server/helpers.ts:283`, `:601`, `:663`, `:714`, `:753`. The trailing parenthetical on the `send`/`write`/`stop`/`stop(id)`/`killTree`/`stopChild` lines keeps the enumerated causes the bare form would have discarded, after the mandated spine, and the report discloses it. Non-boolean `@returns` lines were correctly left alone (`src/core/types.ts:692`, `:700`, `:734`; `src/server/helpers.ts:688`).

## 4. No already-satisfying first sentence rewritten, and no other tag or later sentence touched — CONFIRMED

Every removed opener in the diff is an imperative (`Create`, `Write`, `Terminate`, `Stop`, `Spawn`, `Close`, `Deliver`, `Register`, `Release`, `Construct`), a bare noun phrase (`The …`, `A …`, `One …`, `Options for …`, `Construction options for …`, `Lookup inputs …`, `Milliseconds …`, `Maximum …`, `Soft …`, `Cooperative …`, `Environment …`, `Standard-input …`), a gerund phrase (`Aborting this signal …`), or a bare predicate (`True when …`, `If `false`, …`). None opened with a third-person `-s` verb, so none that already satisfied the rule was rewritten.

Every `+`/`-` pair in the diff is a block's first line or a boolean `@returns` line. No `@example`, `@param`, `@remarks`, or `@throws` line appears on either side. Second sentences riding on a rewritten line survive byte-for-byte: `src/core/types.ts:62` ("A spawn fault reports the host's negative errno…"), `:96` ("Default: the current working directory."), `:653` ("`0` or omitted disables the timeout."), `src/server/Session.ts:1040` ("`end` never turns it true."). `src/server/helpers.ts:1034` shows the discipline held where it was easiest to slip: a bare noun phrase sitting under `@remarks` was correctly left alone.

Findings outside the claims:

## Findings outside the claims

### A. The new event-map sentences drop the conjunction `that`, against the rule and against the package's own neighbouring form

Sites, all introduced by this unit:

- `src/core/types.ts:117` and `:356` — "Reports a decoded standard-error chunk arrived."
- `src/core/types.ts:121` and `:360` — "Reports the child settled — its terminal state, delivered once."
- `src/core/types.ts:354` — "Reports a standard-output chunk arrived, as an owned `Uint8Array` the consumer may keep and mutate."
- `src/core/types.ts:713` — "Reports a child settled and left the registry — its id and terminal state."

Why it matters. `.claude/rules/writing.md` § Sentence and paragraph order states: "Keep the helper words `that`, `then`, `of`, `a`, and `the`. Do not drop one for brevity." `AGENTS.md` § Writing binds that rule to TSDoc. Each of these garden-paths on first read: "Reports the child settled" parses as `Reports` taking `the child` as its object before the reader has to back up, and "Reports a child settled and left the registry" is worse for having two verbs to strand. The package already spells this construction correctly in prose the unit did not touch — `src/server/types.ts:82` "Reports that a pending standard-input write can proceed", `src/server/types.ts:84` "Reports that the child's read channels closed", and `src/core/types.ts:57` "{@link ProcessInterface.truncated} reports that the `lines` stream omitted stdout lines" — so the new lines are drift inside one file's own voice, not a debatable style call.

What right looks like. Restore the conjunction in each: "Reports that a decoded standard-error chunk arrived.", "Reports that the child settled — its terminal state, delivered once.", "Reports that a standard-output chunk arrived, as an owned `Uint8Array` the consumer may keep and mutate.", "Reports that a child settled and left the registry — its id and terminal state." `src/core/types.ts:711` ("Reports a child launched under its id.") reads as a noun phrase and is grammatical either way, but take it with the set so the event map is uniform.

Bounding it. `src/core/types.ts:119` and `:358` ("Reports a fault from the child or its open standard-input channel, …") take a noun object rather than a clause and are correct as they stand. No other `Reports` opener in the diff elides anything — `Reports whether …` is used correctly throughout.

### B. Rewritten first sentences overflow the wrap the surrounding block prose keeps, without being reflowed

Sites, all introduced by this unit, all in `src/core/types.ts`:

- `:28` `ProcessCommand`, `:51` `ProcessExit`, `:71` `SpawnInput`, `:331` `SessionEventMap`, `:400` `SessionInterface`, `:704` `ProcessManagerEventMap`.

Why it matters. Each of these blocks wraps its `@remarks` prose at or below about 102 columns, and the unit added a verb to line one without reflowing the sentence, so line one now runs past that and the sentence's second line sits short. `src/core/types.ts` is the file a developer reads to learn this package, and the raggedness lands on the opening line of the most-read blocks in it. The wave's mandate covers the first sentence, so reflowing that sentence's own lines was available at no cost and touches nothing the brief protects. `:103` `ProcessEventMap` and `:173` `ProcessInterface` sit right at the boundary and are worth taking in the same pass.

What right looks like. Reflow each overlong first sentence across its own lines to the block's existing width, changing no word. For example at `:28`, break after "argument vector," rather than after "environment overrides".

Bounding it. `src/core/types.ts:178` and `:187` also exceed that width and are pre-existing `@remarks` prose this unit did not touch; they are not its to fix. The long single-line property docs throughout the file (for example `:62`, `:119`, `:158`) are the file's established form for one-line docs and are not affected.

## Observations — attacked and held, recorded so the next round does not re-attack them

- `ProcessErrorOptions` at `src/core/types.ts:817` reads "Configures a {@link ProcessError}." Nothing configures an error; the type carries its construction inputs, and unlike `ProcessOptions` and `SessionOptions` it has no `@remarks` to restore that fact. "Carries the construction inputs for a {@link ProcessError}." would be truer and would keep the dropped qualifier. I rule this wording quality rather than a defect, because the type is reachable only as the constructor's `options` parameter.
- `ExecutableOptions` at `:89` opens "Supplies the lookup inputs …" where every other options type opens "Configures …". The split is defensible — this one is an argument bag for a lookup function rather than construction options — and it reads deliberately.
- `ProcessManagerInterface.count` at `:747` reads "Counts the live children." for a number property, where the writer's own stated vocabulary gives data properties "Holds". "Counts" reports the derived value and is defensible; flagging only so the choice is on the record.
- `ExecuteResult`'s booleans now read "Reports whether …" (`:590`-`:597`) while `ExecuteInput`'s twins keep "If `true`, …; if `false`, …" (`:619`-`:624`), for the same facts on two types the reader meets side by side. The split pre-dates this unit and the brief forbade touching blocks that already satisfy the rule, so leaving it was correct. It is the same question claim 2's break raises, and one ruling closes both.
- The guide is unaffected and correctly so. `guides/process.md:179`, `:181` describe symbols as noun phrases in a Surface table, which is table data rather than TSDoc voice, and no guide line quotes a rewritten sentence, so `tests/guides.test.ts` has nothing pinned to this diff.

## Referral

None outside my lane. Gate results in the writer's report are its own self-assessment; the authoritative run belongs to an independent `verifier`, and I ruled on none of them.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-process.diff changes only `/** ... */` or ` * ...` comment lines (lines 6-1281 throughout); no `-`/`+` pair touches a code token, an identifier, or a symbol declaration.

Claim 2 — CONFIRMED. Spot-checked backtick tokens, `{@link …}` targets, and the two allowed exceptions across all nine files: every `{@link ProcessInterface}`, `{@link PROCESS_GRACE}`, `{@link buildSpawn}`, and similar link target is byte-identical before and after (for example diff.ts:24-25, diff.ts:191-192). Boolean `@returns` lines rewritten to `True if …; false otherwise` (with an optional trailing parenthetical, for example diff.ts:80-81, diff.ts:1192-1193) carry no backtick tokens to preserve or drop them correctly where present (diff.ts:717-718 `false otherwise`). The `strict` option docs (diff.ts:594-596, diff.ts:624-626) preserve both backticked `true` and `false` tokens while reordering the clauses into the mandated boolean-parameter form. No unaccounted backtick/@link/URL change found.

Claim 3 — CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-process.status lists exactly nine files, all under `src/core/` or `src/server/`; none under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`.

Claim 4 — CONFIRMED. A literal `^/\*\*` + first-line grep and a multiline `/\*\*\n\s*\*?\s*(verb)` grep, run against `/home/user/fleet/process/src` for the full imperative-verb list and for `@returns` followed by `Whether`, `` `true` ``, or `true `, return no hits. A naive line-start grep against `*`-prefixed continuation lines returns five hits (types.ts:138, Supervisor.ts:42, helpers.ts:75, helpers.ts:374, types.ts:222), but each is confirmed by direct read to be a mid-`@remarks` paragraph continuation from line-wrapping, not a doc block's first line (for example types.ts:130-139 shows the "close for that descendant's…" hit is the continuation of a sentence beginning "The bound exists because…" on the preceding line). `Glob` confirms `/home/user/fleet/process/app` does not exist, matching the report's "no `app/` directory" statement.

Claim 5 — CONFIRMED per the claim's own rule: the report (/home/user/scaffold/tmp/units/voice/voice-process-report.md:63-72) quotes the exact command and exit code for every gate — `npm run format:check` exit 0, `npm run lint:check` exit 0, `npm run check` exit 0, `npm run build` exit 0, `npm test` exit 0 with per-project pass counts — so this is CONFIRMED on the quoted evidence, with the Orchestrator's landing chain as the authoritative run per the claim's text.

Findings outside the claims:

No findings outside the numbered claims. Scope, token fidelity, and gate evidence all check out against the diff, status, and tree. The report's own "Observations" section discloses a launch-scan discrepancy (verbless=137 in the brief vs. 131 measured from a clean checkout at the commit) but states it did not affect the sweep because every block was read individually; this is a disclosed, non-blocking discrepancy rather than a defect in the delivered change.

## Orchestrator

Subjective claim 2 broke on the two `strict` fields opening with the rule's boolean-parameter form (`If \`true\`, …; if \`false\`, …`). Ruled: that form governs a boolean field's first sentence (the rule prescribes it, the untouched siblings use it, and probe's `sensitive` landed the same way), so no change; recorded once for the fleet. Checker PASS. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
