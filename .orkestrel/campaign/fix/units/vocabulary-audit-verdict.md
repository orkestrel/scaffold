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
