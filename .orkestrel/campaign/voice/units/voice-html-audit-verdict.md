# Audit verdict — unit voice-html

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `532fc73`
(`units/voice-html.diff`, `units/voice-html.status`, `units/voice-html-report.md`).
Rewritten per the writer: imperative 35, verbless 81, name 0, returns 13. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

1. Meaning kept in every rewritten first sentence — CONFIRMED. Read every hunk in /home/user/scaffold/tmp/units/voice/voice-html.diff. Each rewrite adds or inflects a verb and changes nothing else. Compound imperatives convert every verb (/home/user/fleet/html/src/core/helpers.ts:925 "Collapses ... and removes edge whitespace."; helpers.ts:720 "Decodes and inspects a URL"). Possessives survive (helpers.ts:830 "an element's attributes"; helpers.ts:786 "the sanitizer's protocol floor"). No quantifier added (types.ts:150 keeps "any node"). Only extra word beyond a verb is an article at validators.ts:46. Reflowed lines re-break words without altering them (shapers.ts:12, types.ts:140).

2. Third-person -s opener fitting the symbol, no symbol-name repeat — CONFIRMED. Swept the whole tree, not the diff alone. Represents on interfaces/type aliases (types.ts:35, :246), Holds on readonly data properties (:46, :99, :322), Indicates whether on booleans (:50, :62, :190, :241), Describes on options interfaces (:294, :333), Creates on the factory (factories.ts:5), Determines whether on guards (validators.ts:25 onward). No sentence misdescribes its symbol, so the falsification condition is not met. No rewrite introduced a symbol-name repeat: HTML at HTML.ts:41 and createHTML at factories.ts:5 name the markup language and predate the wave. Two verb choices are weaker than their neighbours — findings F1 and F2.

3. Boolean @returns reads "True if ...; false otherwise" with the condition kept — CONFIRMED. helpers.ts:157, :167, :177, :187, :786; validators.ts:28, :46, :57, :68, :79, :95, :168, :178. List-to-condition translations are logically correct (helpers.ts:167, :177). {@link MAX_DEPTH} survives at validators.ts:95. helpers.ts:197 already carried the form and was left alone. No boolean-returning export was missed.

4. No conforming sentence rewritten; no tag or later sentence touched — CONFIRMED, with a stated qualification. Every pre-image was imperative or a bare noun phrase. Conforming blocks stayed byte-identical: parsers.ts:31, :41; helpers.ts:194; types.ts:171, :182, :197, :211, :222, :233; constants.ts:127; HTML.ts:166. No added or removed line carries @param, @example, @remarks, @throws, @see, or @deprecated; the only tag lines are the boolean @returns lines the wave owns. Overload notes at HTML.ts:120-:132 stay // comments. Qualification: shapers.ts:12-13, shapers.ts:67-68, and types.ts:140-141 re-break a line carrying a later sentence with no word changed; the reflow was forced by the 100-column width the files keep (types.ts:150 lands at exactly 100). Byte-identity is referral R1.

Findings outside the claims:

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), Opus 5, clean context, read-only. Sol bench dark, so this lane ran on the writer's engine.

F1 — Provides under-describes walk and splits from its sibling stream. /home/user/fleet/html/src/core/HTML.ts:101 and /home/user/fleet/html/src/core/types.ts:403 open "Provides THE deep traversal ...". walk(): Generator<HTMLNode> and stream(): ReadableStream<HTMLNode> are the same shape and stream took "Returns" (types.ts:430). Every other HTMLInterface member carries a precise verb (Finds, Collects, Rewrites, Reduces, Runs, Removes, Extracts); Provides is the only filler verb, and it lands on the member the block itself calls THE traversal that find, filter, and reduce all iterate. The emphatic THE also loses force once a verb precedes it. Why it matters: the interface is the package's public vocabulary and this is the first sentence a reader meets. What right looks like: "Returns THE deep traversal - ..." in both places — matches stream, states what calling walk() does, repeats no symbol name, no other word changed. Move both copies together or the class and interface docs drift apart.

F2 — Keeps on a boolean option field breaks the file's own boolean form. /home/user/fleet/html/src/core/types.ts:328 reads "Keeps comment nodes instead of dropping them." for readonly comments?: boolean, while every other boolean in the file reads "Indicates whether ..." (:50, :62, :190, :241). The sentence asserts the property performs the keeping; the property is a flag and sanitize does the keeping. The writer stayed inside the wave's mandated imperative-to--s transform, so this is a recommendation, not a breach. What right looks like: "Indicates whether `sanitize` keeps comment nodes instead of dropping them."

F3 — Lists on a string constant states the wrong shape. /home/user/fleet/html/src/core/constants.ts:1 reads "Lists the five code points HTML treats as syntax whitespace." for HTML_WHITESPACE = ' \t\n\f\r', a string; every other Lists opener sits on a readonly string[]. What right looks like: "Holds the five code points HTML treats as syntax whitespace." Minor.

F4 — the report's verb scheme is not the tree's. /home/user/scaffold/tmp/units/voice/voice-html-report.md:32-37 states a scheme the artifact contradicts at types.ts:328 (a boolean that took Keeps), constants.ts:499 (a readonly string[] that took Names), and constants.ts:1 (a string counted as a collection). The constants.ts:499 choice is defensible on its own terms, because its object noun is the singular "the hard floor of `sanitize`" where Lists would not read; the defect is the summary. Why it matters: the report is the durable record of the wave's voice decisions, and the next package's unit will derive a scheme the artifact does not follow. What right looks like: state the exceptions in the report, or move types.ts:328 and constants.ts:1 onto the stated scheme.

F5 — two rewrapped @returns lines break short of the fill width. /home/user/fleet/html/src/core/validators.ts:46-47 breaks at column 82 and :95-96 at column 67, while the surrounding prose fills to the high nineties and the third rewrap (:28-29) breaks at the limit. What right looks like: fill the first line so only the trailing words wrap.

F6 — for re-baseline, not for this unit. The package's type docs now open with Represents, Describes, and Carries across structurally identical result types (types.ts:197, :211, :222, :233 kept their launch verbs; :246, :257, :275, :285 gained Represents). The wave's brief barred touching a conforming sentence, so the spread is the brief's consequence rather than the writer's error. Record it as a candidate for a later vocabulary pass or accept it deliberately.

REFERRALS (outside my lane, no verdict from me):
R1 — byte-identity of later sentences. The unit's acceptance criterion 3 at /home/user/scaffold/tmp/units/voice/voice-html-brief.md:102 demands later sentences be byte-identical to the launch tree; the forced reflows at shapers.ts:12-13, shapers.ts:67-68, and types.ts:140-141 change bytes while changing no word. Mechanical — the Orchestrator or checker rules whether the criterion is met or needs restating as "no word changed".
R2 — the population figure disagrees. voice-html-brief.md:29 records imperative=36 at launch; voice-html-report.md:108-111 records imperative=35 from the same instrument on the launch tree. Only a re-run of voice-scan.mjs against the launch commit settles it.
R3 — gate evidence. voice-html-report.md:70-76 is the writer's self-report; the authoritative run belongs to an independent verifier.

## Checker lane (PASS)

Claim 1 (comment-only hunks): CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-html.diff touches only lines inside `/** … */` blocks (opening sentences, `@returns` lines, and one wrapped `@remarks` continuation) or bare `//` — no hunk adds or removes a code token. Verified by full read of the diff (HTML.ts, constants.ts, factories.ts, helpers.ts, shapers.ts, types.ts, validators.ts).

Claim 2 (token identity, except mandated boolean-`@returns` rewrite): CONFIRMED. Every backtick token, `{@link …}`, and identifier in a rewritten block is preserved. Boolean `@returns` lines follow the mandated `True if …; false otherwise` form, e.g. `src/core/helpers.ts:232` (`isVoidElement`), `:244` (`isRawElement`), `:256` (`isLiteralElement`), `:268` (`isBlockElement`), `src/core/validators.ts:850-851`, `:864-865`, `:877`, `:890`, `:903`, `:916-917`, `:930`. No symbol-name-repeating token drop appears in the diff itself; the report's two name-repetition observations (`src/core/HTML.ts:40` class `HTML`, `:165` method `fold`) describe cases the writer deliberately left unchanged, which the diff confirms — those hunks show no touch to those specific lines' identifier text.

Claim 3 (status scope): CONFIRMED. `/home/user/scaffold/tmp/units/voice/voice-html.status` lists exactly seven files, all under `src/core/`: `HTML.ts`, `constants.ts`, `factories.ts`, `helpers.ts`, `shapers.ts`, `types.ts`, `validators.ts`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`.

Claim 4 (post-fix sweep clean): CONFIRMED. Grep for a doc-block-opener or `@returns` line beginning with an imperative verb (anchored to lines starting `/**` or ` *`, case-insensitive) over `/home/user/fleet/html/src` returns two raw hits, both false positives on mid-paragraph continuation text, not sentence openers: `src/core/constants.ts:133` ("close `p` are omitted…", continuing the sentence from line 132) and `:2735` ("stop descending…", continuing from line 2734). Neither opens a doc block or an `@returns` line. Grep for `@returns` followed by `Whether`, `` `true` ``, or `true ` returns no matches. `/home/user/fleet/html/app` does not exist (`Glob` returned no files), matching the report's claim the package has no `app/` directory.

Claim 5 (gates): CONFIRMED on quoted evidence only, per the brief's own instruction. `/home/user/scaffold/tmp/units/voice/voice-html-report.md:70-76` quotes each gate command (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`) with its exit code (0 for each) and a one-line result. No independent re-run was performed by this checker; the Orchestrator's landing chain remains the authoritative run per the brief.

Findings outside the claims:

No findings outside the enumerated claims. The diff is comment-only across seven `src/core/` files, the status is scope-honest, the post-edit sweep is clean modulo two continuation-line false positives that do not indicate a missed imperative opener, and the report quotes exit codes for every required gate.

## Orchestrator

Both lanes PASS. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
