# Audit verdict — unit voice-indexeddb

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `7783d6d`
(`units/voice-indexeddb.diff`, `units/voice-indexeddb.status`, `units/voice-indexeddb-report.md`).
Rewritten per the writer: imperative 14, verbless 28, name 0, returns 3. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5, the writer's engine, as the brief names because the Sol bench is dark.

## Claim 1 — meaning preserved in every rewritten first sentence: CONFIRMED

I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-indexeddb.diff`, not a sample. Every rewrite is the original sentence with a verb added or conjugated; no hunk drops a qualifier, adds a quantifier, or moves a referent.

The hunks that could have drifted, and why they did not:

- `/home/user/fleet/indexeddb/src/browser/constants.ts:4` — `Native \`DOMException.name\` → our {@link IndexedDBErrorCode}.` became `Maps native \`DOMException.name\` → our {@link IndexedDBErrorCode}.` The arrow reads as "to" and the constant is a `Readonly<Record<string, IndexedDBErrorCode>>` (`constants.ts:11`), so `Maps` asserts what the frozen table is. Nothing added.
- `/home/user/fleet/indexeddb/src/browser/types.ts:182` and `types.ts:217` — `Options for …` became `Represents the options for …`. The added `the` is a determiner, not a quantifier; each interface is the options type of exactly the named call, so the definite article is accurate.
- `/home/user/fleet/indexeddb/src/browser/IndexedDBStore.ts:17`, `types.ts:331`, `types.ts:293` — the first sentence rewrapped across its two lines. The rewrapped text is word-identical to the original plus the opening verb; the continuation line carries no new or dropped word.
- `/home/user/fleet/indexeddb/src/browser/helpers.ts:70` — `Run a synchronous native IndexedDB call, wrapping a thrown \`DOMException\`` became `Runs a …`, with the second line `into a typed {@link IndexedDBError}.` untouched, so the participial clause still attaches to the same subject.

Every code token, `{@link}` target, and backtick survives unchanged in each rewrite.

## Claim 2 — third-person `-s` verb that fits the symbol, no name repeat: CONFIRMED

Every opener in the tree after the change fits its symbol kind, and none reproduces its own identifier:

- Factories and leaves take an action verb: `Creates` at `factories.ts:5` and `helpers.ts:159`, `Resolves` at `helpers.ts:31` and `helpers.ts:49`, `Runs` at `helpers.ts:70`, `Reads` at `helpers.ts:95` and `helpers.ts:117`, `Builds` at `helpers.ts:180`, `:190`, `:200`, `:210`, `:220`, `Maps` at `helpers.ts:231`.
- The guards take `Checks whether`: `helpers.ts:17` (`isIndexedDBSupported`), `helpers.ts:140` (`hasKey`), `errors.ts:41` (`isIndexedDBError`).
- The entity symbols take `Represents`: the classes at `IndexedDBCursor.ts:6`, `IndexedDBDatabase.ts:19`, `IndexedDBIndex.ts:15`, `IndexedDBStore.ts:17`, `IndexedDBTransaction.ts:11`, `IndexedDBTransactionStore.ts:13`, `errors.ts:12`, and the types and interfaces at `types.ts:16`, `:28`, `:67`, `:76`, `:91`, `:105`, `:109`, `:136`, `:160`, `:182`, `:217`, `:232`, `:262`, `:293`, `:331`, `:352`, `:368`, `:393`.

No sentence misdescribes its symbol, so I quote none. On name repeat: `factories.ts:5` reads `Creates a browser-native IndexedDB database over a store schema.` for `createIndexedDBDatabase`, and `helpers.ts:159` reads `Creates a secondary index on a store …` for `createIndex`. Neither writes the identifier; each names the thing produced, which is the description the rule asks for, and both phrasings predate this unit.

## Claim 3 — boolean `@returns` in the rule's form with the condition kept: CONFIRMED

A search for `@returns` across `/home/user/fleet/indexeddb/src` returns three boolean returns and no other, and each carries the rule's form with its original condition intact:

- `errors.ts:44` — `@returns True if \`value\` is an \`IndexedDBError\`; false otherwise`, from `` `true` when `value` is an `IndexedDBError` ``.
- `helpers.ts:24` — `@returns True if \`globalThis.indexedDB\` exists; false otherwise`, from `` `true` when `globalThis.indexedDB` exists ``.
- `helpers.ts:149` — `@returns True if at least one record has the key; false otherwise`, from `` `true` when at least one record has the key ``.

The dropped backticks on `true` and `false` are the form the rule and the wave brief prescribe, not a loss. No boolean-returning export in `src/` was left in another wording, and the interface members returning `Promise<boolean>` (`types.ts:285`, `:316`) carry no doc block to convert.

## Claim 4 — nothing already conformant rewritten, no tag or later sentence touched: CONFIRMED

First half: every removed line in the diff opened with an imperative (`Create`, `Resolve`, `Run`, `Read`, `Build`, `Map`) or with a bare noun phrase (`A promisified value cursor …`, `An explicit transaction …`, `Native \`DOMException.name\` …`, `Whether a value is …`, `Options for …`). None opened with a third-person `-s` verb, so no conformant sentence was disturbed. The launch scan's `third` bucket held only the `Options for …` openers, and `Options` there is a noun, so those blocks genuinely needed the sweep.

Second half: every changed line in the diff is either a first-sentence line or one of the three boolean `@returns` lines named under claim 3. The `@param` lines appear in the diff only as context (`voice-indexeddb.diff:114`, `:209`, `:210`), as do every `@remarks` and every later sentence, including the imperative `@remarks` opener at `helpers.ts:20` (`Gate IndexedDB code with this …`) that the wave deliberately leaves alone. No `@example` or `@throws` line appears in the diff at all. The three rewrapped blocks move only lines belonging to the first sentence.

Findings outside the claims:

Findings outside the claims. None is a required change on this unit — the wave brief puts each subject off-limits or out of scope — so each is referred to the Orchestrator for a carrier decision.

**F1. The guide and the TSDoc now describe the same symbols in two voices.** `/home/user/fleet/indexeddb/guides/indexeddb.md:60` reads `Build a key range strictly above one key.`, which is byte-identical to the pre-change first sentence of `rangeAboveKey` and is now `Builds a key range strictly above one key.` at `/home/user/fleet/indexeddb/src/browser/helpers.ts:180`. The same split runs down the Summary column: `guides/indexeddb.md:52` (`Whether IndexedDB is available in this environment …`) against `helpers.ts:17`; `:53` (`Resolve an \`IDBRequest\` …`) against `helpers.ts:31`; `:57` (`Whether a key is present …`) against `helpers.ts:140`; `:59` (`Run a synchronous native IndexedDB call …`) against `helpers.ts:70`; `:65` (`Map a native IndexedDB \`DOMException\` …`) against `helpers.ts:231`; `:67` (`Whether a value is an \`IndexedDBError\`.`) against `errors.ts:41`; `:79` (`A record stored in, and read from, an object store.`) against `types.ts:16`; `:43`, `:44`, `:45`, `:46` against the class blocks. Why it matters: a developer reads the guide table and then hovers the symbol in an editor, and gets the same sentence in two grammars, which reads as one of them being stale. What right looks like: either a successor unit that carries the guide Summary column into the same voice, or a recorded ruling that a Summary column is a noun-phrase caption by fleet convention — `guides/guide.md:92` and `guides/test.md:226` in this same checkout follow that caption form, so the ruling is cheap and closes the question permanently. This unit was correct not to touch it: `guides/**` is off-limits in both the wave brief and the unit brief.

**F2. `constants.ts:4` keeps `our` inside a sentence this unit rewrote.** The line reads `Maps native \`DOMException.name\` → our {@link IndexedDBErrorCode}.` `.claude/rules/writing.md` § Voice and actor forbids `we` and `our` in developer-facing prose. Why it matters: the sentence is now owned text that a rule forbids, and it is the only such hit in `src/` (a search for `\b(our|we|We|Our)\b` across `/home/user/fleet/indexeddb/src` returns this line alone). What right looks like: `Maps native \`DOMException.name\` to an {@link IndexedDBErrorCode}.` — meaning identical, actor named, arrow kept or dropped as the carrier prefers.

**F3. `helpers.ts:49` keeps a temporal `once` inside a sentence this unit rewrote.** The line reads `Resolves once an \`IDBTransaction\` commits, rejecting if it errors or aborts.` `.claude/rules/writing.md` § Substitutions maps temporal `once` to `after`. What right looks like: `Resolves after an \`IDBTransaction\` commits, rejecting if it errors or aborts.` — a meaning-identical swap. Pair it with F2 under one prose-conformance carrier; the wave brief scoped this unit to the verb form alone and told the writer wording choices inside the rule were its own, so leaving it was defensible.

**F4. Observation, no change required.** `Represents` now opens every class, interface, and type block, and for the wrapper classes a more exact verb was available: `IndexedDBCursor.ts:6` reads `Represents a promisified value cursor …` immediately above an `@remarks` that opens `Wraps \`IDBCursorWithValue\` and the request that drives it.` (`IndexedDBCursor.ts:9`), and `IndexedDBTransaction.ts:11`/`:14` pair the same way. `Represents` does not misdescribe — to a consumer the class is the entity — and the wave brief fixed `Represents` for an entity type, so uniformity here is conformance rather than laziness. Raising it only so a successor voice pass does not re-open it as a defect.

**F5. Pre-existing redundancy the rewrite makes more visible, no change required.** `types.ts:331` now reads `Represents an object store — the keyed record surface plus the store's own schema metadata and \`index\` accessor.` directly above an `@remarks` at `types.ts:335` that repeats `plus the store's own schema metadata and \`index\` accessor.` The duplication predates this unit and sits in `@remarks`, which the wave leaves alone.

No referral to the objective lane is open from my reading. The scope-honesty and completeness questions the writer's report raises — comment-only diff, gate exit codes, `git status --short` confined to `src/` — are mechanical and belong to the checker, and my own reads of the diff and the tree found nothing contradicting them.

## Checker lane (PASS)

Claim 1 (comment-only diff): CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-indexeddb.diff changes only `/**...*/` TSDoc comment lines. Verified every hunk across all 11 files (IndexedDBCursor.ts, IndexedDBDatabase.ts, IndexedDBIndex.ts, IndexedDBStore.ts, IndexedDBTransaction.ts, IndexedDBTransactionStore.ts, constants.ts, errors.ts, factories.ts, helpers.ts, types.ts): every `-`/`+` pair is a `*` comment line inside a doc block. No hunk touches a code token, import, signature, or non-comment line.

Claim 2 (token identity): CONFIRMED. Backtick tokens and `{@link …}` references are preserved verbatim in every rewritten line, for example diff:88-90 `` `DOMException.name` `` and `{@link IndexedDBErrorCode}` preserved; diff:157-158, diff:184-185 code tokens unchanged. The three boolean `@returns` rewrites (diff:111-116 `isIndexedDBError`, diff:141-150 `isIndexedDBSupported`, diff:202-212 `hasKey`) follow the mandated `True if …; false otherwise` form while keeping their backtick tokens (`value`, `IndexedDBError`, `globalThis.indexedDB`) intact, matching the permitted exception. No first sentence dropped a self-referencing identifier token (report table row "First sentence reworded to drop the symbol's name: 0" matches the diff, which shows no such case), so the second exception clause is inert here — an observation, not a break.

Claim 3 (status scope): CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-indexeddb.status:1-11 lists only files under `src/browser/`. No `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` entries appear. `/home/user/fleet/indexeddb/app` does not exist (Glob returned no files), consistent with the report's note that the package has no `app/` directory.

Claim 4 (no residual imperative or bad `@returns` opener): CONFIRMED. A first-line-anchored multiline grep for `/**\n * <imperative-verb>( |` )` across `/home/user/fleet/indexeddb/src` returned no matches. A plain line-anchored grep for the same verb list did match `src/browser/helpers.ts:100` ("narrow the structured clone with `isRecord`"), but that line sits mid-`@remarks` paragraph, not the doc block's first line (the block's first line at helpers.ts:95 reads "Reads one record by key…"), so it is not a genuine hit against the claim's "first line of a doc block" condition — reported as an observation, not a break. A grep for `@returns` followed by `Whether`, `` `true` ``, or `true ` returned no matches.

Claim 5 (gates): CONFIRMED on quoted evidence. /home/user/scaffold/tmp/units/voice/voice-indexeddb-report.md:48-56 quotes each gate command (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`) with exit code 0 and a reading for each. Per the claim's rule this is CONFIRMED on the quoted evidence; the Orchestrator's own landing chain remains the authoritative run for final acceptance.

Findings outside the claims:

No findings outside the numbered claims. The diff is scoped entirely to TSDoc comment text under `src/browser/`, matches the brief's owned-files list, and touches none of the off-limits paths (tests/, guides/, README.md, package.json, package-lock.json, .claude/, configs/, tests/setupPolicy.ts, tests/policy.test.ts). The report's block counts (42 blocks, 14 imperative, 28 given-a-verb, 3 boolean `@returns` rewrites) are internally consistent with the brief's measured launch population (files=12, blocks=42, imperative=14, verbless=26 including boolean-returns bucket) and with the actual diff hunk count.

One observation for the record: the naive single-line grep for claim 4's verb list produces one false-positive match (helpers.ts:100, "narrow the structured clone with `isRecord`") because it is not first-line-anchored to a doc block. A checker re-running this claim's sweep must anchor the pattern to the line immediately following `/**` (as done here with a multiline regex) rather than grepping every comment line, or it will over-report hits that are not doc-block openers.

## Orchestrator

Both lanes PASS. The lane's guide-voice finding (Surface rows quoting pre-wave sentences) falls under the ruling that guide rows keep the noun-phrase genre. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
