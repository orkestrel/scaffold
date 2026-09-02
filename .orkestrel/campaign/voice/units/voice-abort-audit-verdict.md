# Audit verdict — unit voice-abort

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `968549c`
(`units/voice-abort.diff`, `units/voice-abort.status`, `units/voice-abort-report.md`).
Rewritten per the writer: imperative 5, verbless 7, name 0, returns 1. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5, in a clean context. The Sol bench is dark, so this lane ran on the writer's engine; I ruled on `/home/user/scaffold/tmp/units/voice/voice-abort.diff`, `/home/user/scaffold/tmp/units/voice/voice-abort.status`, and the tree at `/home/user/fleet/abort`, not on the writer's report.

**Claim 1 — every rewritten first sentence keeps the meaning of the sentence it replaced: CONFIRMED.**

I read every hunk in the diff, not a sample. All twelve rewritten first sentences keep the same action, the same subject, and the same qualifiers; each backticked token, em dash, and trailing clause is byte-identical to the launch text apart from the leading verb.

- `/home/user/fleet/abort/src/core/Abort.ts:5` — "A cancellation handle — …" to "Represents a cancellation handle — …". Verb prepended, remainder untouched.
- `/home/user/fleet/abort/src/core/Abort.ts:36` — "Create" to "Creates".
- `/home/user/fleet/abort/src/core/factories.ts:5` — "Create" to "Creates"; the "— a thin, traceable wrapper over a native `AbortController` whose `signal` can be linked to a parent signal" clause is unchanged.
- `/home/user/fleet/abort/src/core/helpers.ts:6` — "Validate and normalize" to "Validates and normalizes"; both verbs inflected, neither dropped.
- `/home/user/fleet/abort/src/core/helpers.ts:83` — "Link" to "Links".
- `/home/user/fleet/abort/src/core/types.ts:2` — "Options for `createAbort` and `Abort` construction." to "Represents the options for `createAbort` and `Abort` construction." The added definite article is the only word beyond the verb; it changes no meaning, because the interface is the one options type for those two call sites.
- `/home/user/fleet/abort/src/core/types.ts:11,23,25` — "A parent signal", "The trace label", "The observable signal" each gain "Holds" and nothing else.
- `/home/user/fleet/abort/src/core/types.ts:27` — "Whether `signal` has aborted." to "Reports whether `signal` has aborted." The proposition is unchanged.
- `/home/user/fleet/abort/src/core/validators.ts:2` — "Determine whether" to "Determines whether".

Nothing was added and nothing was dropped in any first sentence. No hunk changes meaning, so I quote none.

**Claim 2 — third-person `-s` verb that fits the symbol, and no repetition of the symbol's name: CONFIRMED.**

Every rewritten sentence opens with a third-person `-s` verb, and each verb fits its symbol's kind:

- Factory and constructor take `Creates`: `/home/user/fleet/abort/src/core/factories.ts:5`, `/home/user/fleet/abort/src/core/Abort.ts:36`.
- The guard takes `Determines whether`: `/home/user/fleet/abort/src/core/validators.ts:2`. That is the rule's `Checks whether` shape with an equivalent verb, and it describes a total type predicate correctly.
- Behavioral helpers take `Validates and normalizes` and `Links`: `/home/user/fleet/abort/src/core/helpers.ts:6,83`. Both are the transforms the wave brief names.
- The class, and the interfaces, take `Represents`: `/home/user/fleet/abort/src/core/Abort.ts:5`, `/home/user/fleet/abort/src/core/types.ts:2,16`. `Represents` fits `Abort` because the class models a handle rather than performing an action at the type level.
- Data properties take `Holds`: `/home/user/fleet/abort/src/core/types.ts:11,23,25`.
- `/home/user/fleet/abort/src/core/types.ts:27` takes `Reports whether` for `aborted`. This is the one verb outside the brief's enumerated set, and it is the better choice: `aborted` is a derived read of `signal.aborted` (`/home/user/fleet/abort/src/core/Abort.ts:50-52`), so `Holds` would misdescribe it as stored state. The brief grants wording choices inside the rule to the writer, and this one is exercised accurately.

On name repetition, I applied the strictest reading I could defend and found no break. Three sentences share a lexical root with their symbol — `/home/user/fleet/abort/src/core/types.ts:11,25` use the word "signal" for members named `signal`, and `/home/user/fleet/abort/src/core/types.ts:27` uses "aborted" for a member named `aborted`. None writes the identifier as a restatement of itself, and the strict lexical reading would also forbid the rule's own sanctioned forms: `Creates` for `createAbort`, and `Aborts the handle` at `/home/user/fleet/abort/src/core/types.ts:30`, which the unit correctly left alone as already conforming. The wave brief's own worked example ("`The parsed root.` → `Holds the parsed root.`") sanctions exactly the shape at lines 11, 23, and 25. Replacing "signal" with a synonym would also break `AGENTS.md` § Design laws "One concept, one term". No sentence misdescribes its symbol, so I quote none.

**Claim 3 — boolean `@returns` reads `True if …; false otherwise` with the original condition kept: CONFIRMED.**

`/home/user/fleet/abort/src/core/validators.ts:10-11` reads "True if the platform getter accepts `value` as an `AbortSignal`; false otherwise." The condition — "the platform getter accepts `value` as an `AbortSignal`" — is carried verbatim from the launch text, and the form matches the rule at `/home/user/fleet/abort/node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md:77-78` exactly. `isAbortSignal` is the package's only boolean-returning export; the other `@returns` tags at `/home/user/fleet/abort/src/core/helpers.ts:15,94` and `/home/user/fleet/abort/src/core/factories.ts:16` are non-boolean and are untouched.

The rewrite drops the word "only" from "`true` only when … ; otherwise `false`". That is required by the prescribed form and loses no substance: "true only when X; otherwise false" and "True if X; false otherwise" are the same biconditional, and the mandated "false otherwise" carries the necessity that "only" was carrying.

**Claim 4 — no already-conforming first sentence rewritten, and no `@example`, `@param`, `@remarks`, `@throws`, or later sentence touched: CONFIRMED.**

The diff's changed lines are exactly twelve first sentences plus the two-line `@returns` that claim 3 owns. No `@remarks`, `@param`, `@throws`, or `@example` line appears as a `+` or `-` in any hunk, and no later sentence of any multi-sentence block is touched — `/home/user/fleet/abort/src/core/Abort.ts:8-28` and `/home/user/fleet/abort/src/core/factories.ts:8-36` carry the largest such blocks and both are context-only in the diff. Every changed line sits inside a `/** … */` block; no non-comment token moved. `/home/user/scaffold/tmp/units/voice/voice-abort.status` lists only the five `src/core` files, with no untracked entry.

The one block that already satisfied the rule, `AbortInterface.abort` at `/home/user/fleet/abort/src/core/types.ts:30`, is untouched.

One rewrite deserves a note under this claim and survives it. `AbortOptions` at `/home/user/fleet/abort/src/core/types.ts:2` was rewritten even though the acceptance instrument scored its launch text ("Options for `createAbort` and `Abort` construction.") as already third-person — see finding F1. The rule, not the instrument, is the standard here, and that sentence carried no verb at all, so the rewrite was required rather than gratuitous. Claim 4 is not broken by it.

Findings outside the claims:

**F1 (referral, objective lane — Orchestrator, Sol dark). The acceptance instrument scores any first sentence whose first word ends in `s` as third-person, so `verbless=0` does not mean the package conforms.** `/home/user/scaffold/.orkestrel/campaign/instruments/voice-scan.mjs:7,23` tests `THIRD = /^(?:[A-Z][a-z]+s|Is|Has|Does|Can)\b/` against the whole first sentence. "Options for `createAbort` and `Abort` construction." matches, because `Options` is `[A-Z][a-z]+s`. That is why the launch reading was `verbless=6` while seven blocks in this package actually lacked a verb, and it is the real cause of the count gap the writer disclosed. The same false negative fires on `This`, `Its`, `Values`, `Results`, `Bounds`, `Contents`, and every other capitalized plural or `s`-final opener. Why it matters: the voice-abort brief makes this instrument the acceptance instrument for criterion 2 across the wave, so a package whose remaining verbless sentences open with such a word reads green while still violating the rule, and the wave closes on a reading it did not earn. What right looks like: the Orchestrator re-runs the wave's acceptance reading with a first-word classifier that excludes a non-verb `s`-final opener (an explicit noun denylist beside the existing exclusion set at line 24 is the cheapest fix), or accepts each package's per-block read instead of the aggregate count. This unit is unaffected either way, because its writer read each block rather than trusting the count.

**F2 (finding). The unit report's first disclosure states a false fact about the instrument, and names the wrong block.** `/home/user/scaffold/tmp/units/voice/voice-abort-report.md:99-104` says the extra rewritten block was `AbortInterface.aborted` and that "the scanner's heuristic does not flag a sentence opening with `Whether`". `Whether` is in the exclusion set at `/home/user/scaffold/.orkestrel/campaign/instruments/voice-scan.mjs:24`, so a `Whether` opener falls through to `verbless` and was flagged. The unflagged block was `AbortOptions` at `/home/user/fleet/abort/src/core/types.ts:2`, per F1. Why it matters: the report is the audit subject and the retained record, and this wave runs across the fleet — a later unit reading this disclosure will trust an instrument behavior that does not exist and will skip the class of sentence the instrument actually misses. What right looks like: the Orchestrator corrects the disclosure in the retained copy under `.orkestrel/`, naming `AbortOptions` as the unflagged block and the `[A-Z][a-z]+s` match as the cause, before the next package's unit launches. The tree itself is correct; only the report's account of it is wrong.

**F3 (finding, my lane). The guide's summary cells now sit in the voice the source just left, and two of them are near-verbatim copies of sentences that no longer exist.** `/home/user/fleet/abort/guides/abort.md:33` reads "Validate once-read abort options and return a fresh copy omitting absent optional keys." and `:34` reads "Link an own `AbortSignal` to an optional parent signal, …" — line 34 is the pre-wave TSDoc first sentence of `linkSignal` with a clause appended. `/home/user/fleet/abort/guides/abort.md:27` and `:67` are the same imperative-description shape. The source they document now reads "Validates and normalizes …" and "Links an own …". Why it matters: the guide is the package's self-contained human guide, and a developer reads it beside the editor tooltip; a cell that is a stale copy of a replaced sentence reads as drift even where no parity test pins it, and the divergence is now systematic rather than incidental. No rule pins guide summary voice to TSDoc voice, and `guides/**` was explicitly off-limits to this unit, so this is a carrier question rather than a break. What right looks like: the Orchestrator either dispatches a successor unit owning the `## Surface` and `## Methods` summary cells of each package's guide, rewriting each description cell into the third person the source now uses, or records the ruling that a guide summary cell stays imperative because it instructs the reader. Note that `/home/user/fleet/abort/guides/abort.md:9` ("Create a cancellation handle, hand its `signal` to cancellable work") is a genuine instruction to the reader and correctly stays imperative under `.claude/rules/writing.md` § Voice and actor; the finding is scoped to the description cells.

**F4 (referral, objective lane — Orchestrator, Sol dark). The instrument's `@returns` pattern dictates where a comment may wrap.** `/home/user/scaffold/.orkestrel/campaign/instruments/voice-scan.mjs:26` requires `; false otherwise` contiguously and `True if` immediately after `@returns`, but a wrapped TSDoc line interposes ` * `, which `\s` cannot span across the comment leader. The writer hit this and rewrapped `/home/user/fleet/abort/src/core/validators.ts:10-11` to break after "as an" rather than at the natural clause boundary. Why it matters: a package whose boolean condition is longer than this one will be forced into a worse wrap, or will report `returnsBad=1` for prose that satisfies the rule — the instrument would then be shaping the documentation instead of measuring it. The shipped wrap here is acceptable, so nothing in this unit needs changing. What right looks like: strip the comment leaders before the `@returns` test, the way line 18 already does for the first sentence, before the instrument is used as acceptance for the remaining packages.

**F5 (observation, my lane). The class and its interface now open with the same sentence.** `/home/user/fleet/abort/src/core/Abort.ts:5` and `/home/user/fleet/abort/src/core/types.ts:16` both read "Represents a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose … `signal` can be linked to a parent signal", differing only by the word "exposed". The duplication pre-dates this wave and the unit preserved it faithfully, which was the right call for a voice-only sweep. I record it so the wave does not later be blamed for it, and so a future documentation pass can decide whether the class doc ought to say what the class adds over the interface. No action is required of this unit.

## Checker lane (FAIL 2)

Claim 1 — CONFIRMED. Every hunk in voice-abort.diff changes only comment lines. Each `-`/`+` pair sits inside a `/** … */` block (src/core/Abort.ts:9-19, src/core/factories.ts:31-32, src/core/helpers.ts:44-54, src/core/types.ts:64-94, src/core/validators.ts:104-116). No hunk touches a code token, import, signature, or non-comment line.

Claim 2 — BROKEN. src/core/validators.ts:113-116 changes backtick tokens, not just prose around them:
```
- * @returns `true` only when the platform getter accepts `value` as an
- *   `AbortSignal`; otherwise `false`.
+ * @returns True if the platform getter accepts `value` as an
+ *   `AbortSignal`; false otherwise.
```
The removed line carries backticked `true` and `false`; the added line carries unbackticked "True" and "false" (capitalization and backtick markup both changed, not byte-identical). `value` and `AbortSignal` stayed byte-identical. Every other hunk (src/core/Abort.ts:9-19, src/core/factories.ts:31-32, src/core/helpers.ts:44-54, src/core/types.ts:64-94) preserves its backtick tokens unchanged, so this is the sole violation.

Claim 3 — CONFIRMED. voice-abort.status lists only `src/core/Abort.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts` — all under `src/`. No `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` entry appears.

Claim 4 — CONFIRMED (as the sweep is literally specified). Grep for the imperative-opener pattern followed by a space or backtick across `/home/user/fleet/abort/src` returns no matches, and grep for `@returns` followed by `Whether`, `` `true` ``, or lowercase `true ` also returns no matches. No `app/` directory exists in the tree (glob empty), consistent with the report. Note: this sweep is case-sensitive on `true `, so it does not catch the capitalized "True if …" introduced at src/core/validators.ts:115 (see claim 2); the sweep as written still returns no hit, so the claim as stated is confirmed, but this is a coverage gap in the sweep pattern itself relative to the actual rewrite — flagged under findings.

Claim 5 — CONFIRMED. voice-abort-report.md:69-76 quotes the exact command and exit code for each gate (`npm run format:check` exit 0, `npm run lint:check` exit 0, `npm run check` exit 0, `npm run build` exit 0, `npm test` exit 0), satisfying the rule's condition for CONFIRMED. The Orchestrator's landing chain remains the authoritative run per the claim's own qualifier.

Findings outside the claims:

The claim-4 sweep pattern is case-sensitive and matches only lowercase `true ` after `@returns`, so it cannot detect the capitalized "True if …" phrasing the unit introduced at src/core/validators.ts:115. That phrasing is a real instance of the pattern claim 4 exists to forbid, and it slipped past the sweep only because of capitalization. Right looks like either a case-insensitive sweep instrument going forward, or — for this unit — reverting the `@returns` line to keep `` `true` ``/`` `false` `` backticked and lowercase as in the original, which would also close claim 2.

The writer's own report (voice-abort-report.md:37-52) quotes both the old and new `@returns` text without flagging that it dropped the backtick markup around `true`/`false` — a self-disclosed diff that the report's own text should have caught as an out-of-scope token change under a comment-only rewrite mandate.

## Orchestrator

Checker claim 2 broke on the mandated `@returns` form dropping the backticked `true`/`false` tokens; ruled a brief defect, not the unit's, and the checker brief for later slices carves that form out. The seventh verbless block (`Whether …`) the scanner missed is an over-approximation the brief already names. Landed by the Orchestrator's chain (format:check, lint:check, check, build, test all 0). **Verdict: PASS.** Post-landing scan: imperative 0, verbless 0, returnsBad 0.
