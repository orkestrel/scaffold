# Audit verdict — unit vocabulary (names.md)

Bench: Sol dark (`codex` absent); every lane on the writer's engine (Opus 5) in a clean context,
told so; `checker` on Sonnet. Round 1 subject: commit `766c3dc` (`units/vocabulary.diff`,
`units/vocabulary-report.md`).

## Round 1

| Claim | Objective lane (Opus reviewer) | Checker (Sonnet) | Orchestrator |
| --- | --- | --- | --- |
| 1 one directive per prefix, one home | CONFIRMED (`names.md:91-104`; no other section defines the prefixes) | CONFIRMED | stands |
| 2 external-mirror pair in § General vocabulary | CONFIRMED (`:119-120`) | not held | stands |
| 3 every added line a directive, no count, no `should` | CONFIRMED | CONFIRMED | stands |
| 4 the text alone decides the cited rulings | BROKEN: `rgba → resolveColor` not licensed by `resolve*`; `describe*` and `render*` overlap; `build*` not separated from `create*` and `*Of` | not held | upheld; see rulings |
| 5 gates as reported | not held | UNRESOLVED (no shell) | CONFIRMED by the Orchestrator's own re-run: `format:check` 0, `lint:check` 0, `test:policy` 0 (111 passed) |
| 6 only the owned file changed | CONFIRMED (one file header in the diff) | CONFIRMED | stands |
| outside claims: `read*` restates the `parse*` contract owned by § Fixed forms | finding | — | upheld |

Terminal lines: objective lane `FAIL 4`; checker `FAIL 5` (procedural: no shell).

**Rulings.** Claim 4's three findings and the duplicate-home finding are real. `rgba`'s target
changes to `parseCSSColor` (the `parse*` contract fits; `resolve*` is left as written); the
`describe*`/`render*` triggers are made disjoint by input; `build*` names its `create*` and `*Of`
exclusions; `read*` refers coercion to § Fixed derivation/construction forms. Fix round:
`vocabulary-2-brief.md` (Opus implementer), audited by the objective lane on the diff.

## Round 2 (fix round `vocabulary-2`, commit `7b13932`, subject `units/vocabulary-2.diff`)

| Claim | Objective lane (Opus reviewer) | Orchestrator |
| --- | --- | --- |
| 1 `describe*`/`render*` disjoint by input | CONFIRMED (binary "is a finding" conjunct) | stands |
| 2 `build*` excludes `create*` and `*Of` from the text alone | BROKEN: line 171 still reads "`create*`: factory constructing an entity/value", so a plain composite matches both; `entity` is defined nowhere | upheld; line 171 was off-limits to the unit, so a successor unit owns it (`vocabulary-3`) |
| 3 `read*` refers coercion to its home | CONFIRMED | stands |
| 4 directives, no count, no `should` | CONFIRMED | stands |
| 5 only lines 91-104 | CONFIRMED | stands |
| Finding A: the brief's exemplar helpers were not all in `breaking-plan.md` | finding | upheld: they live in `fix/rulings.json` and the ledger; later audit briefs pin every exemplar to its file |

Terminal line: `FAIL 2`. Fix round `vocabulary-3` owns line 96 and § Fixed derivation/construction
forms, with the axis ruled as: `create*` is a factory a consumer calls to obtain an entity or
value and lives in `factories.ts`; `build*` is an assembly step inside the package's own
computation, exported for its tests, and lives in `helpers.ts`.

## Round 3 (fix round `vocabulary-3`, commit `5238723`, subject `units/vocabulary-3.diff`)

| Claim | Objective lane (Opus reviewer) | Orchestrator |
| --- | --- | --- |
| 1 each exemplar lands on one prefix from the text alone | BROKEN: the caller clause ("a consumer calls") decides nothing for `createCaptureResult` and `createRestoredSession`, which the package assembles on its own path in `factories.ts` | upheld; the caller axis is withdrawn |
| 2 one home per contract; line 172 drops `builder` | BROKEN: line 96 restated the `*Of` gloss verbatim and a drifted `create*` gloss | upheld; cross-references become pointers |
| 3 file names on 96 and 171 create no second home and contradict nothing in `architecture.md` | BROKEN: `architecture.md` § Kind purity keeps the forms one-directional (`createWriteDirectory` lives in `helpers.ts`) and owns placement; line 171 reversed the gate and line 96 invented a `build*` placement | upheld; no file is named in `names.md` beyond a pointer to § Kind purity |
| 4 directives, no count, no `should` | CONFIRMED | stands |
| 5 only lines 96, 171, 172 | CONFIRMED | stands |
| outside claims: `it` on line 171 can attach to two referents | finding | upheld; the pronoun goes |

Terminal line: `FAIL 1, 2, 3`. Ruling for round 4: the name form follows placement and placement is
§ Kind purity's decision, so `names.md` states only what each form constructs — `create*` a
factory constructing an entity, `build*` a composite value that is not a factory, `*Of` a
combinator over constituents — and points to § Kind purity for what a factory is and where it
lives. The claim "decides the exemplar from the text alone" was over-asked: given § Kind purity's
placement (`createCaptureResult` and `createRestoredSession` are factories; rater's, sea's, and
program's assemblers are helpers), the text yields each name form. Fix round `vocabulary-4` is an
exact-text edit by `builder`; the round-4 lane checks the one-home, pointer, and placement claims
and that the exemplars follow given their placement.

## Round 4 (fix round `vocabulary-4`, commit `7775eb7`, subject `units/vocabulary-4.diff`)

| Claim | Objective lane (Opus reviewer) | Orchestrator |
| --- | --- | --- |
| 1 one form per line; pointers only | CONFIRMED | stands |
| 2 no placement statement; no contradiction of § Kind purity | CONFIRMED | stands |
| 3 the lines yield one form per exemplar given placement | BROKEN: `build*` and `*Of` are not disjoint after "named for its constituents" left line 172; `entity` is defined nowhere, so line 171 does not reach `createCaptureResult` on its own | first half upheld: line 172 regains its discriminator and line 96 negates it in text. Second half: `entity` is a term `AGENTS.md` and `architecture.md` use as given; line 171 stops carrying a discriminator and points to § Kind purity, which owns what a factory is. Defining `entity` is recorded as a finding for the next change against `architecture.md` § Kind purity. |
| 4 directives; no count, `should`, or ambiguous pronoun | CONFIRMED | stands |
| 5 only the three lines | CONFIRMED | stands |
| outside claims: a form's contract versus the retained `createWriteDirectory` and `isVacant` | finding | upheld: § Fixed derivation/construction forms opens with the rule that a form's contract binds a new name and § Kind purity names the retained exceptions |
| outside claims: `names.md:159` identifier-shape row; `combinator combining` stem repeat | findings | the shape row states form not contract (no second home); the stem repeat is cured by the round-5 text |

Terminal line: `FAIL 3`. Fix round `vocabulary-5` is an exact-text edit by `builder` with the
text ruled above; the round-5 lane holds the disjointness, pointer, and retained-exception claims.
A remaining objection that turns only on `entity` being undefined closes as a finding for the
next change, not as another round.

## Round 5 (fix round `vocabulary-5`, commit `fa3d5f3`, subject `units/vocabulary-5.diff`)

| Claim | Objective lane (Opus reviewer) | Orchestrator |
| --- | --- | --- |
| 1 `build*` and `*Of` disjoint | CONFIRMED (complementary predicates) | stands |
| 2 `create*` carries no discriminator; `build*` excludes a factory by pointer; no placement in `names.md` | BROKEN on the third conjunct: the new bullet ended "in `helpers.ts`", a placement fact whose home is `architecture.md:67-70` | upheld; the phrase struck by the Orchestrator as a one-line fix (below) |
| 3 the new bullet binds a new name, routes exceptions to § Kind purity, resolves `is*`/`isVacant` | CONFIRMED | stands |
| 4 each exemplar takes one form given placement | CONFIRMED (placement → form, never through `entity`) | stands |
| 5 directives; no count, `should`, ambiguous pronoun | CONFIRMED | stands |
| 6 only the named lines | CONFIRMED | stands |
| outside claims: "named for its constituents" scope after "neither … nor" | non-blocking observation; the pointer resolves it | recorded |

Terminal line: `FAIL 2`. **Orchestrator fix, one line:** ` in \`helpers.ts\`` struck from line 169, leaving
"such as `createWriteDirectory` and `isVacant`"; `format:check` 0, `lint:check` 0, `test:policy` 0
on the Orchestrator's own run. Verdict after the fix: **PASS** (the lane's only break was the
struck phrase; every other claim CONFIRMED). The vocabulary unit closes **applied**. Finding for
the next change, against `architecture.md` § Kind purity: define `entity` where "a function
returning a live entity" is stated.
