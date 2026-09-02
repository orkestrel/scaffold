# Audit verdict — unit voice-contract

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `7de1ef2`
(`units/voice-contract.diff`, `units/voice-contract.status`, `units/voice-contract-report.md`).
Rewritten per the writer: imperative 259, verbless 145, name 20, returns 16. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5 — the writer's engine, per the brief's recorded Sol-bench-dark substitution. Evidence read: the full diff (all 3456 lines, every hunk), the landed tree at /home/user/fleet/contract, the writer brief, the shared wave brief, the writer's report, and `.claude/rules/typescript.md` § Comments and API documentation.

## 1. Meaning kept in every rewritten first sentence — BROKEN (one instance; the rest confirmed)

I read every hunk. All rewrites but one keep the action, subject, and qualifiers, add no quantifier, and drop nothing: the `Caps …` constants (`/home/user/fleet/contract/src/core/constants.ts:341` `Caps the active recursion or JSON container depth for runtime guards, frozen.` for the former `The maximum active recursion …`), the `Holds …` / `Lists …` / `Names …` property and vocabulary rewrites, and the class-owner rewrites (`/home/user/fleet/contract/src/core/ShapeValidator.ts:21` `Validates one retained contract-shape source live on every call.` for `A reusable live validator for one retained contract-shape source.`).

The break is the package's flagship type. `/home/user/fleet/contract/src/core/types.ts:530-531`:

`Describes a value declaratively, built with the shape builders and compiled into a guard, a parser, a JSON Schema, and a generator.`

The original read `A contract shape — a declarative description of a value, built with the shape builders and compiled into a guard, …`. The dropped head noun (`a declarative description`) is the referent `built …` and `compiled …` depended on. With it gone, the nearest noun the participles can attach to is `a value`, so the sentence now says the VALUE is built with the shape builders and compiled into a guard. That is the exact case the writer brief's binding lesson names ("when a rewrite drops a noun phrase, keep every referent a later clause depends on"). What right looks like: keep the referent explicit, for example `Describes a value declaratively — a declaration the shape builders build and the compilers turn into a guard, a parser, a JSON Schema, and a generator.`

## 2. Third-person `-s` verb that fits the symbol, and never repeats the symbol's name — BROKEN (second half)

Verb fit: CONFIRMED everywhere. `Creates`/`Compiles` for factories (`src/core/factories.ts:11` `Compiles a {@link ContractShape} into a {@link ContractInterface}` — and choosing `Compiles` over `Creates` is what keeps `createContract` out of its own sentence), `Returns` for the lazy getters (`src/core/ContractCompiler.ts:28`, `:37`), `Reports` for the measurement property (`src/core/ShapeValidator.ts:122`), `Holds`/`Names`/`Lists` for properties and vocabularies, `Determines whether` for the guard family. No verb I found misdescribes its symbol. The guide already speaks in this register (`guides/contract.md:364` `Deep-clones a ContractShape graph …`, `:366` `Takes ownership of one shape node …`), so the TSDoc and the guide now read as one voice — the coherence the wave was for.

Name repetition: BROKEN. Six rewritten sentences still spell the identifier, and in four of them the sentence is nothing but the identifier expanded:

- `/home/user/fleet/contract/src/core/types.ts:186` — `Represents a runtime type guard: returns \`true\` when \`value\` satisfies \`T\` and narrows it.` for `Guard<T>`.
- `/home/user/fleet/contract/src/core/types.ts:253` — `Represents a constructor signature that produces instances of \`T\`.` for `AnyConstructor`.
- `/home/user/fleet/contract/src/core/types.ts:263` — `Represents a function accepting any arguments and returning \`unknown\`.` for `AnyFunction`.
- `/home/user/fleet/contract/src/core/types.ts:266` — same shape for `AnyAsyncFunction`.
- `/home/user/fleet/contract/src/core/types.ts:269` — `Represents a function accepting zero arguments and returning \`unknown\`.` for `ZeroArgFunction`.
- `/home/user/fleet/contract/src/core/types.ts:272` — same shape for `ZeroArgAsyncFunction`.

Why it matters beyond the rule text: the writer applied the name-drop transform to the structurally identical sibling 55 lines later — `/home/user/fleet/contract/src/core/types.ts:241` `Coerces an unknown value to \`T\`, or returns \`undefined\`.` for `Parser<T>` — and to the whole `*Shape` family (`:552` `Describes a string with optional length and pattern constraints.`). `Parser`'s own `@remarks` calls itself "The runtime parallel of {@link Guard}", so the pair the docs present as parallel now reads in two registers: one states behavior, one restates the name and states behavior after a colon. That is the incoherence the single-vocabulary rule exists to prevent, inside one file.

I am NOT counting the unavoidable domain-term cases against this claim: `isString` → `Determines whether a value is a string`, the JSON aliases, `SchemaFormat`, and `Groups the options for …` cannot shed the word without contortion, and the report rules them deliberately.

What right looks like, in the same register as `Parser`: for `Guard<T>`, `Narrows an unknown value to \`T\`, returning \`true\` when it satisfies \`T\`.`; for `AnyFunction`, `Accepts any arguments and returns \`unknown\`.`; for `ZeroArgFunction`, `Accepts no arguments and returns \`unknown\`.`; for `AnyConstructor`, `Produces instances of \`T\` from any arguments.`

## 3. Boolean `@returns` reads `True if …; false otherwise` with the condition kept — CONFIRMED

All 16 rewritten `@returns` lines take the exact form and keep the condition, including the ones that carried an extra qualifier: `src/core/validators.ts:398-399` turns `` `true` when `value instanceof ctor`, `false` on a non-match or a contained throw `` into `True if \`value instanceof ctor\`; false otherwise, including on a contained throw`, which keeps the contained-throw case and attaches it to the correct branch; `src/core/validators.ts:157-158` keeps the `except \`-0\`` qualifier. A tree sweep for `@returns` lines in any other boolean wording returns only two hits, both legitimate uses of the literal `` `true` `` inside a correct form (`src/core/helpers.ts:937`, `src/core/validators.ts:231`).

## 4. No already-conforming sentence rewritten; no `@example`, `@param`, `@remarks`, `@throws`, or later sentence touched — CONFIRMED

No added or removed line in the diff carries `@param`, `@remarks`, `@throws`, `@example`, `@deprecated`, or `@see`; the only changed tag lines are the 16 `@returns` lines. No changed line begins with a non-comment token (every `+`/`-` line's first non-space character is `*` or `/`). Every removed first sentence was imperative or a bare noun phrase — the only removed `-s` openers are the `Options for …` noun phrases (diff lines 2515-2581). Already-conforming blocks are untouched: `src/core/compilers.ts:27` `Gates recursive compiler work on shape structure, depth, and cycles.` and the `Identifies …` union members at `src/core/types.ts:51-75` are byte-identical.

Later sentences: word-identical everywhere. Three rewrites moved a wrap point on a line that also carries the start of a later sentence (`src/core/errors.ts:5-7`, `src/core/types.ts:1045-1049`, `src/core/constants.ts:965-968`). The later sentences' words are unchanged and TSDoc joins lines when it renders, so this is not a touch in the sense the claim means; I record it so the checker's byte comparison is not read as a break.

Findings outside the claims:

## F1 (required) — a half-migrated coordination leaves an ungrammatical sentence

`/home/user/fleet/contract/src/core/parsers.ts:524`: `Parses a JSON string and validate the result against a guard.`

The opening verb was inflected and the coordinated second verb was not, so the sentence reads as a statement spliced to an imperative. This is the package's documented safe path from untrusted text to a typed value, so the defect sits on a door consumers read first. The writer's own standard elsewhere is correct — `src/core/helpers.ts:780` `Reads a value through the shared containment boundary or refuses it with …` and `src/core/parsers.ts:437` `Reads and parses an array field from a record …`. What right looks like: `Parses a JSON string and validates the result against a guard.`

Note for the acceptance instrument: `voice-scan.mjs` classifies by the FIRST word only, so it passes this sentence. The unit's green scan cannot close this finding.

## F2 (required) — a newly possessivized code token

`/home/user/fleet/contract/src/core/types.ts:850`: `Strips {@link Infer}'s TOP-LEVEL \`readonly\` modifiers (a shallow strip — …)`.

`.claude/rules/writing.md` § Code tokens: never inflect, pluralize, or possessivize a code token. The removed line carried no possessive (`{@link Infer} with its TOP-LEVEL \`readonly\` modifiers stripped`), so the rewrite introduced it; the other possessives in the diff (`{@link Fault}'s`, `{@link stringToFormat}'s`, `` `ContractShape`'s ``) are pre-existing and outside this unit. What right looks like: `Strips the TOP-LEVEL \`readonly\` modifiers from {@link Infer} (a shallow strip — nested object/array properties stay readonly) — for consumers writing the parsed value's own fields.`

## F3 (recommended) — `Caps by default …` splits the verb from its object

`/home/user/fleet/contract/src/core/constants.ts:490` and `:501`. `Caps by default the number of object properties / array elements {@link valueToSchema} samples per container, frozen.` keeps the meaning but reads as a first-pass inversion; every sibling in the file reads `Caps the …`. What right looks like: `Sets the default cap on the number of object properties / array elements {@link valueToSchema} samples per container, frozen.`

## F4 (observation, no action) — `Captures …` on the `INTRINSICS` members

Every member of the frozen table opens `Captures \`Object.freeze\` — …` (`src/core/constants.ts:85` onward). The brief's prescribed property verb is `Holds`, and a frozen data member performs no capture — the module's evaluation did, which the container's own block states. The writer recorded this as a deliberate call and it does read consistently with the container. I retain it as written and raise it only so the choice is on the record rather than rediscovered next wave.

## F5 (report accuracy, for the Orchestrator) — one report claim the tree contradicts

The report lists `AnyConstructor` among the 20 blocks "reworded to drop the symbol's name". The landed sentence at `src/core/types.ts:253` still spells it (`Represents a constructor signature …`), as do the four `*Function` aliases the report does not mention at all. The report's "Judgment calls" section discloses the kept repetitions in the `validators.ts` guard family and in `literalShape`, so the omission looks like an unswept corner rather than a misstatement — but the count and the list should not be read as evidence that the name-drop transform closed.

## Referrals — outside the subjective lane, no verdict from me

- **R1 (objective lane / checker).** Every gate exit code and the `voice-scan.mjs` acceptance reading (`imperative=0 verbless=0 returnsBad=0`) is the writer's self-report from inside its own exec. Re-run both independently. F1 shows the instrument's bound: it reads only the first word, so a scan of zero does not establish that each rewritten sentence is well-formed past that word.
- **R2 (objective lane).** I confirmed by pattern that no changed line carries a non-comment token, which supports the unit's criterion 1, but a byte-level confirmation that `src/**` compiles to an unchanged emit belongs to the checker, not to me.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-contract.diff sits inside a `/**...*/` or `/** ... */` block; manual read of the full 3456-line diff (all 20 files: ContractCompiler.ts, JSONCloner.ts, SampleInferer.ts, SchemaCloner.ts, SchemaShaper.ts, ShapeCloner.ts, ShapeValidator.ts, ValueInferer.ts, cloners.ts, combinators.ts, compilers.ts, constants.ts, errors.ts, factories.ts, helpers.ts, inferers.ts, parsers.ts, shapers.ts, types.ts, validators.ts) found no `-`/`+` pair touching a code token (import, signature, body, or non-comment punctuation). No hunk to quote as a counter-example.

Claim 2 — CONFIRMED. Every backtick token, `{@link …}`, and URL in a rewritten block is byte-identical to the removed line, with only the two mandated exceptions and one instance of the third: boolean `@returns` lines uniformly rewrote to `True if …; false otherwise` dropping the backticked `true`/`false` (for example `src/core/errors.ts:1001`, `src/core/helpers.ts:1087,1114,1222`, `src/core/validators.ts` throughout); the `INTRINSICS` table members (`src/core/constants.ts:630-828`) prepend `Captures` before the kept backtick token, matching the report's documented judgment call; and no case of a dropped self-naming code token beyond what the report already lists as an observation. No other token changed.

Claim 3 — CONFIRMED. `voice-contract.status` lists only the 20 files, all under `src/core/`: `ContractCompiler.ts`, `JSONCloner.ts`, `SampleInferer.ts`, `SchemaCloner.ts`, `SchemaShaper.ts`, `ShapeCloner.ts`, `ShapeValidator.ts`, `ValueInferer.ts`, `cloners.ts`, `combinators.ts`, `compilers.ts`, `constants.ts`, `errors.ts`, `factories.ts`, `helpers.ts`, `inferers.ts`, `parsers.ts`, `shapers.ts`, `types.ts`, `validators.ts`. No `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/` entries.

Claim 4 — CONFIRMED. A case-insensitive Grep for the listed imperative openers and for `@returns` followed by `Whether`, backtick-`true`, or bare `true ` over `/home/user/fleet/contract/src` returned only mid-sentence occurrences inside `@remarks`/`@example` prose (for example `src/core/types.ts:512` "Build one with…", `src/core/helpers.ts:768` a code-sample `return`, `src/core/shapers.ts:391` "Wrap any property in…"), none of which is a doc-block first-line opener or an `@returns` line. `app/**` does not exist in this checkout (`Glob app/**` returned nothing), so that half of the population is empty. The sweep returns no doc-opener or `@returns`-wording hit.

Claim 5 — CONFIRMED on the quoted evidence. `voice-contract-report.md` quotes all five gate commands (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`) each with exit code 0, and gives `npm test`'s pass counts. Per the claim's own rule, this is CONFIRMED on the report's quotation; the Orchestrator's landing chain remains the authoritative run and was not independently re-executed by this audit.

Findings outside the claims:

Outside the numbered claims: `src/core/parsers.ts` (diff around the `parseJSON` doc block, near line 1755 of the diff) now reads "Parses a JSON string and validate the result against a guard." — the rewrite fixed the first verb's person (`Parse` → `Parses`) but left the second verb in the base form, producing a subject–verb-agreement defect ("Parses … and validate" should be "and validates"). This is not caught by claim 4's opener/@returns sweep because the first word is correctly inflected; it is a residual grammar defect inside the sentence the wave rewrote. Recommend a follow-up one-word fix (`validate` → `validates`) at that line before the next voice pass over `@orkestrel/contract`, or leave it to the next unit that touches `parsers.ts` doc text, since it falls outside this unit's acceptance criteria (which govern openers and boolean `@returns` only, not internal grammar of already-rewritten sentences).

All five acceptance criteria in `/home/user/scaffold/tmp/units/voice/voice-contract-brief.md` are independently supported by the evidence above: criterion 1 (comment-only diff) by claim 1; criterion 2 (no imperative/bare-noun opener, no other boolean-`@returns` wording) by claim 4, though the brief notes the Orchestrator's own `voice-scan.mjs` re-run is the acceptance instrument for that criterion, not this audit; criterion 3 (byte-identical `@example`/`@param`/`@remarks`/`@throws`) is supported by claim 2 and by the diff read finding no changed tag line other than the 16 `@returns` rewrites; criterion 4 (gate chain exits 0) by claim 5, with the same caveat that the authoritative run is the Orchestrator's landing chain; criterion 5 (`git status --short` scoped to `src`/`app`) by claim 3.

## Orchestrator

Subjective claim 1 broke on the flagship `ContractShape` sentence, whose dropped head noun let `built …` and `compiled …` attach to the value; ruled to the lane's wording that keeps the declaration as the referent, plus two further claim-1 items (an `Infer` modifier sentence and a compound verb). Claim 2's name repetition on the utility types (`Guard`, `AnyConstructor`, `AnyFunction`, and kin) STANDS: an identifier that is its own whole description has no non-repeating wording without loss. Fix-up brief `voice-contract-fixup-brief.md`, implementer on Opus. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
