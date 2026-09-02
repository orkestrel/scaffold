# Audit verdict — unit voice-server

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `de721d9`
(`units/voice-server.diff`, `units/voice-server.status`, `units/voice-server-report.md`).
Rewritten per the writer: imperative 39, verbless 45, name 0, returns 10. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5 — the writer's engine, as the brief states, because the Sol bench is dark.

**Claim 1 — every rewritten first sentence keeps the meaning of the sentence it replaced: CONFIRMED.**
I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-server.diff` against the tree, not a sample. Every rewrite is a verb-form change plus, where the sentence needed it, a leading verb; no hunk adds a qualifier, drops a referent, or changes a subject. The rewrites that move more than the leading word all preserve every word and every qualifier:
- `/home/user/fleet/server/src/server/helpers.ts:1213` — "Recursively STRIP the prototype-pollution keys from a parsed value IN PLACE." became "Strips the prototype-pollution keys from a parsed value IN PLACE, recursively." Same action, same object, same `IN PLACE` qualifier, adverb relocated.
- `/home/user/fleet/server/src/server/helpers.ts:1327` — "Transparently decompress an already-collected … via `DecompressionStream`" became "Decompresses an already-collected … byte sequence transparently via `DecompressionStream`". The adverb still modifies the verb.
- `/home/user/fleet/server/src/server/helpers.ts:1495` — the four coordinated clauses of `discoverPort` all move to third person together ("binds … reads … closes it, and resolves that port"), so the pronoun `it` still resolves to the throwaway server.
- `/home/user/fleet/server/src/server/types.ts:383` — the `write` boolean `@returns` keeps the original false-condition as a trailing gloss ("false otherwise — the queue is full or the stream is closed"), so nothing is dropped.
- `/home/user/fleet/server/src/server/types.ts:592` — `UpgradeHandler` shifts from instruction ("`true` to CLAIM the socket") to description ("True if the handler CLAIMS the socket"), which is the form the rule fixes; the claim semantics and the decline clause are both kept.
- `/home/user/fleet/server/src/server/types.ts:321,323` — "Must be a SINGLE-LINE value" became "Requires a SINGLE-LINE value". The constraint survives; only its grammatical subject moves from the value to the property.

**Claim 2 — every rewritten first sentence opens with a third-person `-s` verb that fits the symbol and does not repeat the symbol's name: CONFIRMED.**
Every rewritten opener is a third-person `-s` form and each verb fits its symbol's kind: `Creates` for the factories (`/home/user/fleet/server/src/server/factories.ts:13,32`), `Represents` for classes, interfaces, and type aliases (`Negotiator.ts:10`, `Server.ts:31`, `Stream.ts:6`, `types.ts:21,55,71,97,114,143,169,202,216,239,307,347,409,467,479,525,566,688`), `Narrows` / `Checks whether` for guards (`errors.ts:100`, `helpers.ts:163,207,794,871,1053,1195,1450`), `Reports` for the scoring leaf that returns a `MediaMatch` (`helpers.ts:702`), and `Names` / `Holds` / `Defines` / `Lists` for the constants (`constants.ts:12,18,32,36,54,73,82,112`).
I tested the name-repetition half rather than assuming it, and retain the writer's calls on the four borderline cases: "Represents the HTTP server facade" for `Server` and `ServerInterface` (`Server.ts:31`, `types.ts:688`), "Holds the streaming `Response`" for the `response` property (`types.ts:375`), "Picks the best `available` language" for `language` (`types.ts:279`), and "Writes a `: text` SSE comment line" for `comment` (`types.ts:390`). In each the repeated word is the domain term for the thing described, and the wave brief forbids dropping a backticked token, so removing the word would cost meaning. `Stops gracefully` for `stop` (`types.ts:738`) and `Ends the stream` for `end` (`types.ts:404`) echo their method names, but that echo is the rule's own `Creates`-for-`createX` pattern and it pre-existed in the imperative form.

**Claim 3 — every rewritten boolean `@returns` reads `True if …; false otherwise` with the original condition kept: CONFIRMED.**
Eleven boolean `@returns` exist in `src/`; ten are the unit's rewrites and `errors.ts:173` was already in the form at launch. All read the fixed opener with the original condition intact: `errors.ts:104`, `helpers.ts:173,218,804,884,1064,1200,1456`, `types.ts:383,592`. A search for any other wording (`@returns` followed by `Whether`, `true`, or `false`) returns no hit anywhere under `/home/user/fleet/server/src`. Two entries extend the form with a trailing gloss after "false otherwise" (`types.ts:383`, `types.ts:592`); I rule that right rather than drift, because the alternative drops the original's explicit false-condition.

**Claim 4 — no already-compliant first sentence was rewritten, and the diff touches no `@example`, `@param`, `@remarks`, `@throws`, or later sentence: CONFIRMED.**
Every removed first sentence in the diff is either imperative (`Create`, `Compose`, `Parse`, `Narrow`, `Strip`, `Pick`, `Dispatch`, `Stop`, `Tear down`) or a bare noun phrase (`The HTTP server facade`, `One parsed entry of …`, `Default maximum request body size`); none was already a third-person `-s` form. Blocks that were already compliant stayed untouched, including `helpers.ts:306` ("Writes a SIGNED cookie"), `helpers.ts:1127` ("Collapses a client IP"), `types.ts:186` ("Rates one candidate media type"), and `errors.ts:170` ("Narrows an unknown caught value to a {@link ServerError}").
No `@example`, `@param`, `@remarks`, `@throws`, or `@typeParam` line changed. One qualification, recorded because the claim is literally about touched lines: in the two multi-line boolean `@returns` blocks (`types.ts:383-386`, `types.ts:592-593`) the shorter opener reflowed the continuation lines, so the later sentence "A `false` event was still accepted unless `closed` was already `true`…" moved across a line boundary. Its words are byte-identical; only the wrap point shifted, and the reflow sits inside the rewritten `@returns` tag rather than in a separate tag. That is a consequence of the required rewrite, not a second edit, so the claim stands.

Findings outside the claims:

**F1 — required change: four options interfaces keep a verbless noun-phrase opener, and the package now reads in two voices for one kind of symbol.**
`/home/user/fleet/server/src/server/types.ts:127` ("Options for `signToken` — how a stateless, HMAC-signed token is minted."), `:329` ("Options for a {@link StreamInterface} — how `createStream` opens the streaming response."), `:431` ("Options for `readBody` — …"), and `:607` ("Options for `createServer`.") carry no verb at all. Their sibling `CookieOptions` at `/home/user/fleet/server/src/server/types.ts:143` did get one ("Represents the `Set-Cookie` attributes for `serializeCookie` …"), so one file now describes five options interfaces in two different voices. The asymmetry is the unit's own: it rewrote every `Whether …` opener to `Checks whether …` — the other opener the unit brief flagged as sitting in the wrong scan bucket (`/home/user/scaffold/tmp/units/voice/voice-server-brief.md:52`) — and left every `Options for …` opener alone. Why it matters: a reader scanning `types.ts` meets the wave's voice on twenty-three blocks and the pre-wave voice on four, which is worse than either voice applied whole, and the unit's stated objective ("every TSDoc block … opens with a third-person `-s` verb") is not met. What right looks like: a successor unit scoped to those four first sentences, giving each a verb and changing no other word — for example "Configures `signToken` — how a stateless, HMAC-signed token is minted." at `:127`, and "Represents the options for `createServer`." at `:607`. Keep every backticked token and every `{@link}`.

**F2 — the unit's report asserts coverage it does not have, and its arithmetic hides the gap.**
`/home/user/scaffold/tmp/units/voice/voice-server-report.md:3` states "Every TSDoc first sentence under `src/` … now opens with a third-person `-s` verb". That is false for the four blocks in F1. The bucket reconciliation at lines 19-24 closes to the launch totals (39 + 4 = 43, 41 + 1 = 42) without those four ever appearing, because the launch instrument never put them in a defective bucket. Why it matters: the Orchestrator's acceptance rests on this report plus a re-run of the same instrument, and both are silent on the same four blocks. What right looks like: the successor unit's report states the population it changed and the population it left, and names any block it ruled compliant by reading rather than by the instrument.

**F3 — referral to the Orchestrator (objective, outside my lane): the acceptance instrument cannot detect F1, here or in any package already accepted on it.**
`/home/user/scaffold/.orkestrel/campaign/instruments/voice-scan.mjs:7` defines `THIRD = /^(?:[A-Z][a-z]+(?:-[a-z]+)*s|…)\b/`, which admits any capitalized word ending in `s` as a third-person verb. "Options" matches, so the four openers in F1 are counted as compliant, and the unit's post-sweep reading `imperative=0 verbless=1` (`voice-server-report.md:78`) does not establish the unit brief's acceptance criterion 2. The same blind spot admits any plural noun opener — `Headers …`, `Values …`, `Contents …`, `Options …` — in every package the wave has already measured with this script. I raise this as evidenced, not as a verdict: whether the fleet's prior acceptances need re-measuring is the Orchestrator's ruling.

**F4 — noted, no change asked: one ALL-CAPS emphasis was lost.**
`/home/user/fleet/server/src/server/helpers.ts:1213` reads "Strips the prototype-pollution keys from a parsed value IN PLACE, recursively." The package uses ALL CAPS as its emphasis convention, and the launch sentence emphasized the verb ("Recursively STRIP … IN PLACE"). The rewrite keeps `IN PLACE` and every word, and drops the emphasis on the verb itself; "STRIPS" would have kept it. Too small to re-dispatch on its own; fold it into the F1 successor if that unit opens the file.

**F5 — tested and ruled acceptable: the mixed wrapping is the right trade, not drift.**
Most rewritten blocks lengthen their first line rather than rewrap (`/home/user/fleet/server/src/server/constants.ts:18,36,73,82`, `helpers.ts:207,1195`), while a few rewrap because the one-line form crossed the formatter's width or the sentence spanned lines (`constants.ts:12-13`, `types.ts:169-171`). The result is a mildly ragged first line in several blocks. Rewrapping every block would enlarge the diff and put later sentences at risk, which claim 4 forbids, so I retain the writer's choice and ask for no change.

**F6 — checked, clean: no guide or test pins a rewritten sentence.**
A search of `/home/user/fleet/server` outside `node_modules` for the distinctive rewritten phrases ("Whether the underlying stream", "the streaming `Response` to return", "Must be a SINGLE-LINE", "to CLAIM the socket") returns only `src/server/types.ts:375`. No guide prose or parity test quotes a first sentence this unit changed, so the package's guide voice and its TSDoc still agree.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-server.diff (854 lines, 8 files) changes only comment text: every `-`/`+` pair sits inside a `/** … */` block or a `//`/`/** */` single-line comment (for example constants.ts:48-53, errors.ts:142-143, types.ts:704-708). No hunk touches a code token, signature, or statement.

Claim 2 — CONFIRMED. Backtick tokens, `{@link …}`, and URLs are byte-identical between removed and added lines except where the rule mandates the boolean-`@returns` rewrite. Example: errors.ts:142-143 drops `` `true` `` and adds `True if … false otherwise` with `` `value` `` preserved; types.ts:735-741 (`write`) and types.ts:812-816 (`UpgradeHandler`) show the same pattern, keeping the non-`@returns` backtick token unchanged. No dropped self-referencing symbol token was found in the diff (the report's claimed count of 0 for that category matches the observed diff).

Claim 3 — CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-server.status lists exactly 8 modified files, all under `src/server/`: Negotiator.ts, Server.ts, Stream.ts, constants.ts, errors.ts, factories.ts, helpers.ts, types.ts. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`.

Claim 4 — CONFIRMED. A grep for the named imperative verbs anchored to comment lines (`^\s*(\/\*\*|\*)\s*Verb[\s\`]`, case-insensitive) over `/home/user/fleet/server/src` returns 9 lines, but every hit sits either inside an `@example` code fence (errors.ts:51, helpers.ts:63, types.ts:43, types.ts:86 — each a tab-indented `return …` inside a fenced sample) or is a mid-paragraph continuation line of an already-rewritten first sentence, not the doc block's first line (helpers.ts:642, types.ts:119, types.ts:418, types.ts:371, Server.ts:70 — verified types.ts:371 in context at types.ts:360-373: it is line 12 of a multi-sentence `@remarks`-carrying block whose actual first line, earlier in the block, already opens with `Represents`). No doc block's first line opens with an imperative verb. A grep for `@returns` followed by `Whether`, `` `true` ``, or `true ` over the same tree returns no matches. `app/` does not exist in this checkout (`Glob` on `/home/user/fleet/server/app/**` returns no files), so the sweep is vacuously satisfied there.

Claim 5 — CONFIRMED on the quoted evidence, per the brief's own rule. /home/user/scaffold/tmp/units/voice/voice-server-report.md lines 50-56 quote the exact command and exit code for each gate: `npm run format:check` exit 0, `npm run lint:check` exit 0, `npm run check` exit 0, `npm run build` exit 0, `npm test` exit 0 with per-project counts. This checker did not re-run the gates (read-only); the Orchestrator's landing chain remains the authoritative run.

Findings outside the claims:

No findings outside the claims. The diff is comment-only across all 8 files, the status is scoped to `src/server/`, the tree-wide voice sweep over `src/` (app/ absent) finds no remaining imperative first-line opener and no unrewritten boolean `@returns` form, and the report's gate table quotes exit codes for every required command.

## Orchestrator

Both lanes PASS. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**

## Addendum — summary fix-up (`4b53210`)

The acceptance scan after landing listed the `Negotiator.format` method block as summary-less
(`@remarks` only). Under the program precedent it gained the first sentence `Dispatches the
request to the handler its \`Accept\` header negotiates, answering 406 when none matches.`
(`voice-server-fixup-brief.md`, builder on Sonnet; `voice-server-fixup.diff`, `.status`). Landed
by the Orchestrator's chain, every gate 0. Verdict stands: **PASS**.
