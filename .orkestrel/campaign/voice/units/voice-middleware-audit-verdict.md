# Audit verdict — unit voice-middleware

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `917ccd9`
(`units/voice-middleware.diff`, `units/voice-middleware.status`, `units/voice-middleware-report.md`).
Rewritten per the writer: imperative 42, verbless 121, name 0, returns 16. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5 — the writer's own engine, because the Sol bench is dark. Ruled on `/home/user/scaffold/tmp/units/voice/voice-middleware.diff` (1477 lines, read in full) and on the tree at `/home/user/fleet/middleware`, not on the writer's report.

**1. Every rewritten first sentence keeps the meaning of the sentence it replaced — CONFIRMED.**
Sampled every hunk in the diff, not a subset. No hunk changes the action, subject, or qualifiers. The three restructurings that go beyond a leading-verb swap all preserve the sentence's substance:
- `/home/user/fleet/middleware/src/core/constants.ts:88` — "Default cookie name …" became "Names the default cookie …"; the dropped noun `name` is carried by the verb `Names`. Same at `:94` (`DEFAULT_CSRF_COOKIE`) and `:51` (`DEFAULT_IDENTIFIER_HEADER`).
- `/home/user/fleet/middleware/src/server/types.ts:143` — "Why `createMultipart` rejected a request" became "Names the reason `createMultipart` rejected a request"; `Why` → `the reason` is exact.
- `/home/user/fleet/middleware/src/core/helpers.ts:499` — "Constant-time string equality" became "Compares two strings in constant time". `equality` leaves the opening clause, but the appositive that follows ("double-submit token comparison … the submitted-vs-cookie match") and the `@returns` at `:511` both still state equality, so the block's meaning is intact. The word `two` is accurate against the signature `equalsConstantTime(a: string, b: string)`. See finding F2 for the craft cost.
No hunk adds a quantifier the original lacked, drops a referent a later clause depends on, or moves a possessive. `/home/user/fleet/middleware/src/server/helpers.ts:470` "Best-effort unlink …" → "Attempts to unlink …" keeps the fail-open sense the later clause spells out.

**2. Every rewritten first sentence opens with a third-person `-s` verb that fits the symbol and never repeats the symbol's name — CONFIRMED.**
No rewritten sentence misdescribes its symbol, and none repeats its symbol's name. Evidence across the kinds:
- Factories: `/home/user/fleet/middleware/src/core/factories.ts:21,59,89,113` all `Creates`; battery factories at `/home/user/fleet/middleware/src/core/middlewares.ts:91,136,172,210,310,355,417,456,493,538,630,667,786` all `Creates`, and `:860,885` take `Scopes` for `only`/`except`.
- Classes: `/home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts:12` and `/home/user/fleet/middleware/src/core/stores/DatabaseSessionStore.ts:13` take `Implements` against a named interface — accurate, not decorative.
- Constants carry a deliberate three-way split that reads as information rather than filler: `Holds` for a value (`/home/user/fleet/middleware/src/core/constants.ts:20`), `Names` for a name or literal-union value (`:51`, `/home/user/fleet/middleware/src/server/constants.ts:27` over `DEFAULT_STATIC_DOTFILES = 'ignore'`), `Lists` for a collection (`/home/user/fleet/middleware/src/core/constants.ts:54`). I checked every single-line block in both `constants.ts` files; the split holds without exception.
- Options types drop the symbol's own name: "Options for `createBoundary`" became "Configures `createBoundary`" at `/home/user/fleet/middleware/src/core/types.ts:10`, applied to every options interface. This is the strongest part of the change — the old opener repeated the `…Options` half of the symbol's name, and the new one does not.
`Configures` and `Describes` sit outside the claim's illustrative set (`Holds`/`Represents`/`Names`), but neither misdescribes: an options type does configure its factory, and a shape type does describe its shape. The claim's falsifier is misdescription, and I found none. The coherence cost of carrying both is finding F1.

**3. Every rewritten boolean `@returns` reads `True if …; false otherwise` with the original condition kept — CONFIRMED.**
Every boolean `@returns` in `src/` now takes the form, and every condition is the original one verbatim minus the backticked `true` token the wave drops by design: `/home/user/fleet/middleware/src/core/helpers.ts:125,289,315,471,511,534`; `/home/user/fleet/middleware/src/core/validators.ts:17,41,58,92`; `/home/user/fleet/middleware/src/server/errors.ts:51`; `/home/user/fleet/middleware/src/server/helpers.ts:36,104,210,234,347`. I swept every `@returns` line in `src/` and found no boolean return left in another wording, and no non-boolean `@returns` wrongly converted (for example `/home/user/fleet/middleware/src/core/helpers.ts:337` and `/home/user/fleet/middleware/src/server/helpers.ts:250` correctly keep their value-return prose).

**4. No already-satisfying sentence was rewritten, and the diff touches no `@example`, `@param`, `@remarks`, `@throws`, or later sentence — CONFIRMED.**
Read every `-` line in the diff. Not one already opened with a third-person `-s` verb; each was imperative, a bare noun phrase, or an `Options for …`/`Whether …` opener. Blocks that already satisfied the rule are untouched and verifiably so: `/home/user/fleet/middleware/src/server/parsers.ts:8` ("Stream-parses …") and `/home/user/fleet/middleware/src/core/factories.ts:145` ("Rebuilds …") are absent from the diff, and `/home/user/fleet/middleware/src/server/MultipartParser.ts` carries no TSDoc block at all.
Every changed line is either a block's first description line or an `@returns` line. Every hunk is a one-line `-`/`+` pair, so no continuation line was re-flowed and every later sentence is byte-identical to the launch tree. The only tag appearing on a changed line is `@returns`.

Findings outside the claims:

## Findings outside the claims

**F1 — Required change. Two verbs for one act on type docs, splitting sibling symbols.** The change introduces `Describes` alongside `Represents` for shape and record types, and the split does not follow any rule the tree honours.
- `/home/user/fleet/middleware/src/core/types.ts:587` — `MultipartFile`: "Represents one staged multipart upload's public record".
- `/home/user/fleet/middleware/src/server/types.ts:159` — `UploadedFile`: "Describes one uploaded file's post-parse record — the node-bound, richer sibling of the pure core's {@link MultipartFile}".
- `/home/user/fleet/middleware/src/core/types.ts:425` — `SessionEntry`: "Represents one in-process session entry".
- `/home/user/fleet/middleware/src/server/types.ts:4` — `Asset`: "Describes one in-memory asset representation".
- `/home/user/fleet/middleware/src/core/types.ts:99` — `SecurityIdentifierOptions`: "Describes `createSecurity`'s `identifier` sub-option", ten lines above `/home/user/fleet/middleware/src/core/types.ts:110` — `SecurityOptions`: "Configures `createSecurity`". Same battery, adjacent blocks, two registers. Repeated at `/home/user/fleet/middleware/src/server/types.ts:86` (`MultipartLimitsInput`, "Describes … `createMultipart`'s `limits` option") against `/home/user/fleet/middleware/src/server/types.ts:125` (`MultipartOptions`, "Configures `createMultipart`").

Why it matters: `AGENTS.md` § Design laws fixes "One concept, one term. Do not alternate synonyms." Two symbols whose own prose calls them siblings, and two option types for one battery, now open in different registers, so the opening verb stops carrying information — a reader cannot infer anything from seeing `Describes` rather than `Represents`. The unit's own report states the intended split ("`Describes` for a shape, `Represents` for an entity or a record"), and `UploadedFile` and `Asset` are records by that rule and still take `Describes`, so the tree does not honour the split the unit declared.

What right looks like: pick one opener per kind and apply it. `Represents` for every record or entity shape — including `UploadedFile`, `Asset`, `SessionEntry`, `MultipartFile` — and `Configures` for every options bag, including `SecurityIdentifierOptions` and `MultipartLimitsInput`. Retire `Describes`, or state a split a reader can predict and make every block obey it.

**F2 — Required change. The one boolean predicate that does not open with a query verb.** `/home/user/fleet/middleware/src/core/helpers.ts:499` reads "Compares two strings in constant time". Every other predicate in the package opens with `Checks whether` or `Determines whether` (`/home/user/fleet/middleware/src/core/helpers.ts:106,275,311,528`, `/home/user/fleet/middleware/src/core/validators.ts:10,37,54,87`, `/home/user/fleet/middleware/src/server/helpers.ts:29,90,200,230,342`). Why it matters: the rule names `Checks whether` for a query, and the sentence as written states the act without stating the verdict the function yields — an IDE hover that shows only the first sentence tells a reader the function compares, not that it answers equality. It is also the only place the wave's opener drops a semantic noun (`equality`) rather than moving it. What right looks like: "Checks whether two strings are equal, in constant time — `createCSRF`'s double-submit token comparison, avoiding a timing oracle on the submitted-vs-cookie match." That keeps every existing clause and restores the verdict to the opening.

**F3 — Wave-level, not a unit defect. `Checks whether` and `Determines whether` both ship, in one file.** `/home/user/fleet/middleware/src/core/helpers.ts:106` ("Checks whether a candidate address is …") against `/home/user/fleet/middleware/src/core/helpers.ts:466` ("Determines whether a request is a CORS PREFLIGHT"); `/home/user/fleet/middleware/src/core/validators.ts` uses `Determines whether` throughout while `/home/user/fleet/middleware/src/server/helpers.ts` uses `Checks whether` throughout. The unit produced this by following its brief exactly: the shared brief converts an imperative in place (`Determine whether` → `Determines whether`) and gives a verbless `Whether …` opener a verb (`Checks whether`), so a pre-existing synonym split survives the sweep intact. Why it matters: the same law as F1, and the residue is invisible to the wave's acceptance instrument because both forms are third person. What right looks like: the wave rule names one predicate opener and the sweep converts to it, rather than preserving whichever form the original happened to carry. Addressed to the Orchestrator, because it changes the wave's transform rule and therefore every package still to run.

**F4 — Referral, pre-existing, not introduced by this unit.** `/home/user/fleet/middleware/src/core/helpers.ts:275` reads "Checks whether a response is eligible for the compression/ETag buffering pipeline" over `isBufferingIneligible`, which returns `true` when the response must be left alone (`/home/user/fleet/middleware/src/core/helpers.ts:289` `@returns`, `:293` example returning `true` for a `204`, and the body at `:301-307`). The guide states the opposite polarity at `/home/user/fleet/middleware/guides/middleware.md:192`: "Whether a response must pass through untouched". The unit rewrote exactly this sentence and correctly kept its meaning, because changing the polarity is a meaning change its brief forbids. I raise no verdict on it: the polarity question is the objective lane's, and the Sol bench is dark, so this is a referral to the Orchestrator for a successor unit. Suggested target: "Checks whether a response must bypass the compression/ETag buffering pipeline", which then agrees with the symbol name, the `@returns`, the example, and the guide.

**F5 — Minor. Ragged wrap inside rewritten blocks.** A longer opener was never re-wrapped, so a block's first line now runs past 90 columns while its own continuations wrap near 76: `/home/user/fleet/middleware/src/core/middlewares.ts:172`, `/home/user/fleet/middleware/src/core/types.ts:301,415,425,435`, `/home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts:12`, `/home/user/fleet/middleware/src/server/types.ts:4,86,103`. Why it matters: the paragraph reads in two measures, and a later editor cannot tell which measure the file keeps. It is cosmetic and the formatter does not police it, which is why it survived the gates. What right looks like: re-wrap the paragraph the rewritten sentence sits in. That edits bytes on later lines, which this wave's brief forbids, so it needs an explicit grant in a successor brief or a decision to accept the ragging.

## Retained from the writer's report, on my own reading

The report's two "left as they are" rulings are correct against the diff and the tree. `/home/user/fleet/middleware/src/core/shapers.ts:4` keeps `sessionColumns` inside a usage snippet, where dropping the token would break the snippet; `/home/user/fleet/middleware/src/server/middlewares.ts:440` names the core face's `createCompression` as a cross-reference to a different symbol, not as its own name. Neither is a repetition of the symbol's own name as its description.

## Guide coherence

The guide was correctly left untouched and does not now contradict the code. `/home/user/fleet/middleware/guides/middleware.md` carries surface tables in noun-phrase register (rows at `:45`, `:47`, `:74`, `:202`), which is the right register for a table cell and a different form from a TSDoc first sentence, not stale prose. The single guide-versus-code disagreement I found is the polarity in F4, and it predates this unit.

## Checker lane (PASS)

Per-claim verdicts for the voice-middleware TSDoc unit audit

Findings outside the claims:

1. CONFIRMED. Swept the full diff (/home/user/scaffold/tmp/units/voice/voice-middleware.diff, 1478 lines) with two greps isolating every changed (`+`/`-`) line: all match `^[+-] \*` or `^[+-]/\*\*` comment-content patterns. No hunk touches a code token, signature, import, or executable statement; every hunk sits inside a `/** … */` block or a single-line `/** … */` constant comment.

2. CONFIRMED. All 16 `@returns` rewrites (grep results at voice-middleware.diff:237-1233) follow the mandated `True if …; false otherwise` form with every backtick token (`entry`, `encoding`, `value`, `{@link SessionInterface}`, etc.) byte-identical to the removed line. Spot-checked backtick and `{@link …}` tokens across the constants.ts, factories.ts, helpers.ts, middlewares.ts, types.ts, validators.ts, and server/* hunks; found none altered except the mandated boolean swap. The report's two named symbol-name-drop exceptions (`src/core/shapers.ts` `sessionColumns`, `src/server/middlewares.ts` cross-referenced `createCompression`) were left unchanged in the diff, consistent with the report's claim, and are observations rather than diff content to verify.

3. CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-middleware.status lists exactly 15 lines, all `M src/...` (core and server subpaths). No `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts` entries appear.

4. CONFIRMED. Case-insensitive grep of `/home/user/fleet/middleware/src` for the full imperative-verb list followed by a space or backtick returns one hit: `src/core/helpers.ts:29`, `set when \`createForwarded\` is mounted`, which is mid-`@remarks` prose (confirmed by reading lines 20-34), not a doc block's first line — so it is not a match under the claim's "first line" scope. A second sweep for `@returns` followed by `Whether`, backticked `true`, or bare `true ` returned no matches in `src/`.

5. CONFIRMED on quoted evidence. The report (/home/user/scaffold/tmp/units/voice/voice-middleware-report.md:71-77) quotes the exact command and exit code (0) for `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`, each with an excerpt of its output, run from `/home/user/fleet/middleware` on 2026-09-02. Per the brief, this rules CONFIRMED on the quoted evidence rather than by re-running the gates; the Orchestrator's landing chain remains the authoritative run.

No findings outside the five claims. The diff, status, and tree evidence are internally consistent with the writer's report.

## Orchestrator

Both lanes PASS. The lane's F1 (`Configures` for options types beside `Describes` for shape types) is recorded as a fleet-vocabulary question for the debrief, not a change: neither verb misdescribes its symbol. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
