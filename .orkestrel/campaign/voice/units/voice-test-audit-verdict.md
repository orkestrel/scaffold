# Audit verdict — unit voice-test

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `5aff09d`
(`units/voice-test.diff`, `units/voice-test.status`, `units/voice-test-report.md`).
Rewritten per the writer: imperative 0, verbless 94, name 0, returns 7. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice). Sol bench dark, so this lane ran on the writer's engine, told so.

## 1. Meaning kept in every rewritten first sentence — CONFIRMED

I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-test.diff`, not a sample. No hunk changes the action, the subject, or a qualifier, and none drops a referent a later clause needs.

The four hunks that carried real risk all hold:

- `src/browser/helpers.ts:75`. `@returns` flipped from "`false` when the element is hidden from assistive technology, from sight, or from both; `true` otherwise" to "True if the element is presented to assistive technology and to sight; false otherwise." That is the exact negation, and it matches `isRendered` at `src/browser/helpers.ts:96-100`, which returns false on an `aria-hidden` ancestor, the `hidden` attribute, a hidden input, `checkVisibility()`, and `visibility: hidden`. Nothing added, nothing dropped.
- `src/core/types.ts:409` (`RetryOptions.attempts`). "The maximum number of producer calls" to "Caps the number of producer calls." "Caps" carries the dropped "maximum"; the second sentence is untouched.
- `src/server/constants.ts:449` (`REMOVE_TREE_MAX_ATTEMPTS`). "The attempts" to "Caps the attempts." The constant is `10`, the cap, so the verb states a fact the value already carries.
- `src/browser/types.ts:110` (`JournalInterface`). "The record of one scenario: every step it took…" to "Records one scenario: every step it took…". The dropped noun phrase leaves `it` still resolving to "one scenario".

Where a rewrite lengthened a first sentence inside a shared paragraph, the later sentence was rewrapped but every word is identical: `src/browser/types.ts:59-60`, `50-51`; `src/server/types.ts:108-111`, `115-116`, `170-172`, `124-125`, `187-188`.

## 2. Verb fits the symbol, and never repeats the symbol's name — BROKEN

The claim's second conjunct fails outright, and the first fails on a set of members whose verb states something the value does not do.

**Repeats the symbol's name.** The clearest is `src/core/types.ts:82`: the member is `signal` and the rewritten sentence is "Holds the instrumented signal." After the rewrite it teaches only "instrumented", which `src/core/types.ts:78` already states for the whole interface. The same repetition stands at `src/server/types.ts:128` (`port` — "Names the ephemeral port the host assigned"), `src/server/types.ts:92` (`device` — "Names the identifier of the device holding the directory"), `src/server/types.ts:184` (`path` — "Names the request path"), `src/browser/types.ts:31` (`path` — "Holds the frame's path"), and `src/browser/types.ts:43` (`name` — "Holds the variant's name"). Each of these sentences was rewritten by this unit, so each was in hand when the name stayed.

**Verb misdescribes the symbol.**

- `src/browser/types.ts:84`. "Expands the registry across every variant: the filenames a complete portfolio holds." `files` is a plain precomputed array — `src/browser/factories.ts:112` computes it once and `:118` assigns it — so reading the member expands nothing. Its two neighbours at `src/browser/types.ts:80` and `:82` are the real getters (`src/browser/factories.ts:119-123`) and they read "Lists …", so the one static value took the action verb and the two computed ones took the state verb.
- `src/server/types.ts:115`. "Lists the files to write on allocation, keyed by path below the scratch directory." `files` is `Readonly<Record<string, string>>` (`:118`), so "Lists" contradicts "keyed by" inside one sentence. The identical shape in `src/browser/types.ts:25-26` took "Holds every attribute to set, keyed by attribute name."
- `src/server/types.ts:194`. "Reports what one server did with a client upgrade request." `UpgradeResult` is a data union (`:201-203`); it performs no reporting. The parallel outcome type at `src/core/types.ts:68` took "Represents the outcome of one operation."
- `src/core/types.ts:105` and `:107`. "Lists the ids returned by `create`, in order." The member is a `RecorderInterface<readonly [id: number]>`, not an enumeration; "Lists" asserts an array shape the type does not have. `src/core/types.ts:2` already supplies the right word for it: "Records every call made to its handler."
- `src/server/types.ts:92` and `:128`. "Names" is applied to two numbers while the numbers beside them take "Holds" (`src/server/types.ts:94`, `:96`; `src/browser/types.ts:33-36`). A number identifies; it does not name.
- `src/browser/constants.ts:31`. "Names the page a browser paints an unstyled document onto." `CANVAS_COLOR` is a `Color`, `[255, 255, 255, 1]` (`:38`). The bare noun phrase it replaced let a reader supply "the color of"; the explicit verb now asserts the constant names a page.

## 3. Boolean `@returns` reads `True if …; false otherwise` with the condition kept — CONFIRMED

Every rewritten boolean return carries the required form and the original condition: `src/browser/helpers.ts:18`, `:38-40`, `:75`, `:1107-1108`; `src/server/helpers.ts:106`, `:124`; `src/server/types.ts:32-33`. Two were missing the false clause entirely before (`src/browser/helpers.ts:18`, `src/server/types.ts:32`) and now carry it. `src/browser/helpers.ts:75` states the condition positively rather than negatively, which the required form compels and which the preceding claim 1 evidence shows is exact.

## 4. No conforming sentence rewritten; no other tag or later sentence touched — CONFIRMED

Every removed first sentence in the diff opens with a determiner, a bare noun, `Whether`, `What`, `How many`, or a backticked `true`/`false` token. None opened with a third-person `-s` verb, so nothing already conforming was rewritten. The `Determines whether …` and `Reports whether …` openers appear only as diff context (`src/browser/helpers.ts:72`, `src/server/types.ts:29`).

No `@example`, `@param`, `@remarks`, or `@throws` line appears as a changed line anywhere in the diff; the only changed tag lines are the boolean `@returns` lines claim 3 covers. Later sentences appear as changed lines only through rewrapping, and I compared the words in each case (`src/browser/types.ts:50-51`, `59-60`; `src/server/types.ts:108-111`, `115-116`, `124-125`, `170-172`, `187-188`) — every word is identical and no clause moved between sentences.

Findings outside the claims:

## Required changes

Each is actionable enough to re-dispatch verbatim.

**F1. `/home/user/scaffold/tmp/units/voice/voice-test-report.md:13,21` — the report closes a bucket it did not sweep.** The row "First sentence reworded to drop the name" reads zero and line 21 states "No first sentence repeated its own symbol's name." The tree contradicts that at `src/core/types.ts:82`, `src/server/types.ts:92`, `:128`, `:184`, `src/browser/types.ts:31`, `:43`. This matters more than the sentences themselves: the acceptance instrument `voice-scan.mjs` measures `imperative`, `verbless`, and `returnsBad` only, so nothing downstream can catch a false negative in this bucket, and the next package's unit will read the row as a swept zero and apply the same non-standard. What right looks like: rule the bucket by reading and record the ruling. Either reword the repeating sentences, or state the exception in the report and in the wave record in the form the next unit can apply — for example, "a data member named for its domain noun keeps the noun; a sentence that teaches nothing beyond the identifier is reworded" — and name the sentences it covers.

**F2. `src/core/types.ts:82` — reword the one sentence that survives no reading.** "Holds the instrumented signal." for member `signal`, under an interface whose own sentence at `:78` already says the signal is instrumented. What right looks like: name what the member gives the caller, for example "Holds the signal to hand to the code under test", which parallels `:11`.

**F3. `src/browser/types.ts:84` — the verb inverts the member's own neighbours.** What right looks like: "Lists the filenames a complete portfolio holds: the registry expanded across every variant." That keeps every word of the original meaning, matches `:80` and `:82`, and stops attributing an action to a precomputed array.

**F4. `src/server/types.ts:115` — "Lists" contradicts "keyed by" in one sentence.** What right looks like: "Holds the files to write on allocation, keyed by path below the scratch directory." That is the wording the identical shape already carries at `src/browser/types.ts:25`.

**F5. `src/server/types.ts:194` — a data union does not report.** What right looks like: "Represents what one server did with a client upgrade request", matching `src/core/types.ts:68` for the package's other outcome type.

**F6. `src/core/types.ts:105` and `:107` — "Lists" asserts an array shape the recorder does not have.** What right looks like: "Records the ids returned by `create`, in order" and "Records the ids passed to `destroy`, in order", which reuse the vocabulary `src/core/types.ts:2` already fixes for `RecorderInterface`.

**F7. `src/server/types.ts:92`, `:128` — "Names" on a number, beside siblings that "Hold".** What right looks like: "Holds the identifier of the device holding the directory" and "Holds the ephemeral port the host assigned."

**F8. `src/browser/constants.ts:31` — the verb asserts the constant names a page.** The value is a color (`:38`). What right looks like: "Names the color a browser paints an unstyled document with", keeping the `@remarks` at `:33-36` untouched.

**F9. One shared language for the options shapes.** The wave solved the same problem three ways: "Configures one captured frame" and "Configures a capture portfolio" (`src/browser/types.ts:29`, `:56`), "Configures the allocation of a scratch directory" and "Configures the reading of a source inventory" (`src/server/types.ts:100`, `:165`), and "Configures a client upgrade request" (`src/server/types.ts:178`), which dropped the original's "driving". A reader moving between the two environment barrels meets a nominalized gerund in one and a bare object in the other, for interfaces that do the same job. What right looks like: pick the direct-object form and use it everywhere — "Configures a scratch directory allocation", "Configures a source inventory read", "Configures a client upgrade request" — so every `*Options` type reads the same way.

## Observation, not a required change

`src/browser/types.ts:70`. `enabled` took "Determines whether this run writes files", which is the idiom the package uses for its predicate functions (`src/browser/helpers.ts:34`, `:72`). It is honest for a flag that does control the behaviour, and the second sentence removes any doubt. Rule it deliberately if F9's one-language pass runs; do not change it on its own.

## Referrals — outside my lane, no verdict from me

**R1 (objective lane / checker).** The writer's brief acceptance criterion 3 requires later sentences to be "byte-identical to the launch tree". Rewrapping changed the bytes of later-sentence lines at `src/browser/types.ts:50-51`, `59-60` and `src/server/types.ts:108-111`, `115-116`, `124-125`, `170-172`, `187-188`, while every word is unchanged. The report at line 23-25 asserts every other chunk "is identical as text", which is a different test from byte identity. Rule which test the criterion means before the checker reads it.

**R2 (verifier).** I ran nothing. The gate exit codes at report lines 42-48 and the post-landing scan reading at lines 54-56 are unverified here.

**R3 (objective lane).** The report at lines 74-78 records that some rewritten single-line blocks now sit at 101 or 102 columns where the originals fit — `src/server/types.ts:121` measures 103 columns, against 96 before. Whether `format:check` and `lint:check` accept that, and whether the package has a width rule that binds comments, is a question for the lane that runs them.

## Checker lane (PASS)

1. CONFIRMED — every hunk in /home/user/scaffold/tmp/units/voice/voice-test.diff changes only comment text. All 41 hunks across the 7 touched files (constants.ts, helpers.ts, types.ts under src/browser, src/core, src/server) fall inside `/** … */` blocks or `//`-adjacent JSDoc lines; no `-`/`+` pair touches a non-comment line. Verified by reading the diff in full (lines 1-631) and confirming every changed line begins with `*`, `/**`, or is a rewrapped continuation of one.

2. CONFIRMED — backtick tokens, `{@link …}` references, and URLs are byte-identical between removed and added lines except for the permitted boolean-`@returns` rewrite. Examples: `voice-test.diff:88-89` (`` `true` `` → `True if …; false otherwise`), `:97-101` (`isReachable`), `:109-111` (`isRendered`, reversed to the positive per report's stated judgment call), `:119-120` (`colorsMatch`), `:473-474` and `:482-483` (`server/helpers.ts`), `:506-508` (`ScratchInterface.has`). No other backtick token, `{@link}`, or URL changed anywhere in the diff. No dropped self-referential code token was found in the diff (the report also states "No first sentence repeated its own symbol's name"), so the reportable-observation branch of this claim does not apply.

3. CONFIRMED — `/home/user/scaffold/tmp/units/voice/voice-test.status` lists exactly seven files, all under `src/`: `src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `src/core/types.ts`, `src/server/constants.ts`, `src/server/helpers.ts`, `src/server/types.ts`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` appears. `app/` does not exist in the tree (`Glob app/**` in `/home/user/fleet/test` returned no files), consistent with the report's claim.

4. CONFIRMED — grepping `/home/user/fleet/test/src` for a doc block's first line opening with any listed imperative verb, and for `@returns` followed by `Whether`, `` `true` ``, or `true `, returns no hits at a doc-block opening position. A raw case-insensitive line-start sweep did surface ten lines matching the verb pattern textually, but every one is a mid-sentence continuation line inside a multi-line `@returns`, `@throws`, or `@remarks` paragraph (confirmed by `-B3` context, e.g. `src/server/helpers.ts:539` is the continuation `remove it afterwards, both propagate.` following an `@throws` opener at `:538`, and `src/browser/types.ts:136` continues an `@remarks` sentence started at `:135`), not the first line of any doc block. No `Options for …` or `Whether …` opener remains (confirmed by a separate targeted grep). The sweep returns no genuine hit.

5. CONFIRMED on quoted evidence — the report's Gates table (`voice-test-report.md:42-48`) quotes the exact command and exit code for every gate: `npm run format:check` (0), `npm run lint:check` (0), `npm run check` (0), `npm run build` (0), `npm test` (0, with a timing observation noted as non-authoritative). Per the claim's own rule this is CONFIRMED on the quoted evidence; the Orchestrator's own landing-chain run remains the authoritative gate result and is not superseded by this reading.

Findings outside the claims:

No findings outside the five claims. The diff, status, and tree are mutually consistent: the status file's seven-file list matches the diff's seven `diff --git` headers exactly, no off-limits path (tests/, guides/, README.md, package.json, package-lock.json, .claude/, configs/, tests/setupPolicy.ts, tests/policy.test.ts) appears in either, and the package carries no app/ directory so the brief's app/** scope is vacuously satisfied.

## Orchestrator

Subjective claim 2 broke on a set of data-member verbs (`Holds the instrumented signal` teaching nothing beyond the identifier; `Expands`/`Lists`/`Reports`/`Names` on a precomputed array, a keyed record, a data union, a recorder, two numbers, and a color) and on three options shapes read three ways. Ruled with the lane's proposals (fix-up brief `voice-test-fixup-brief.md`, builder on Sonnet): `Holds`, `Records`, `Represents`, `Lists the filenames …`, `Names the color …`, and the direct-object `Configures a … allocation`/`… read` form. The remaining domain-noun members (`path`, `name`) keep their nouns under the standing ruling; `enabled` keeps `Determines whether`. Rewrapped later sentences are word-identical, which satisfies the byte-identical criterion as ruled. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
