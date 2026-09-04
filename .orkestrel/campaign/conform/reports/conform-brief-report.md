# Unit conform-brief — report

Every row landed. The gate chain is green in order at the finishing tip.

## Consumer edits taken

The addendum's edits ran first. Each name in the closure was verified against the installed
declaration before the edit, and the sites the reports named were re-read because line numbers had
moved.

| Addendum item | Sites taken | Line now |
| --- | --- | --- |
| interpret's removed `complete` | `src/core/constants.ts` drops `'complete'` from `INTERPRETATION_MEMBERS` | `src/core/constants.ts:69` (the entry is gone; `'failures'` now precedes `'confidence'`) |
| interpret's removed `complete` | `tests/setup.ts` drops `complete: true` from `buildInterpret`'s extractor result | `tests/setup.ts:99` |
| interpret's removed `complete` | `tests/setup.ts` drops `complete: false` from `buildForeignInterpret`'s extractor result | `tests/setup.ts:173-176` |
| interpret's removed `complete` | `tests/setup.ts` drops the `get complete()` getter from `AccessorInterpretation`, `ShiftingAccessorInterpretation`, and `ShiftingForeignInterpretation` | each class now runs `failures` straight into `get confidence()` at `tests/setup.ts:247`, `:314`, `:377` |
| interpret's removed `complete` | `tests/setup.test.ts` replaces `expect(result.complete).toBe(true)` with `expect(result.failures).toEqual([])` | `tests/setup.test.ts:110` |
| interpret's removed `complete` | `tests/setup.test.ts` replaces `expect(interpretation.complete).toBe(false)` with `expect(interpretation.failures).toEqual([])` — the fixture's own state, read from `AccessorInterpretation.failures` | `tests/setup.test.ts:145` |
| reason's dropped `RuleResult.conclusion` | `tests/setup.ts` drops `conclusion` from `FIRST_RULE` and `CAPTURED_RULE`, and sets `CAPTURED_RULE.applied` to `false` | `tests/setup.ts:24-36` |
| reason's dropped `RuleResult.conclusion` | `tests/setup.test.ts` rewrites the `FIRST_RULE` and `CAPTURED_RULE` cases onto `applied` and `premises` | `tests/setup.test.ts:90-105` |
| contract's `type` → `category` | `tests/src/core/shapers.test.ts` reads `briefShape.category` | `tests/src/core/shapers.test.ts:304` |
| guide's `symbol.kind` → `symbol.keyword` | `tests/guides.test.ts` reads `symbol.keyword` at the `EX` and `IM` filter sites the report named | `tests/guides.test.ts:186`, `:210` |

Further consequential edits the addendum did not name, each obliged by the same landed change and
each inside Owned. Every one is recorded here because it moves behaviour or a published signature
rather than a fixture:

1. **`src/core/BriefCompiler.ts:340`** — `#blockage` read `verdict.rules.filter((entry) => !entry.conclusion)`.
   `RuleResult` no longer declares `conclusion`, so the line failed the typecheck. The successor
   reading is `applied`: the installed declaration states "`applied` is true exactly when every
   premise held", and `/home/user/fleet/reason/src/core/reasoners/LogicalReasoner.ts:362,618` builds
   each `RuleResult` as `{ id, applied: allMet, premises }` while `:249` derives the logical result's
   own `conclusion` from the last rule's `applied`. The dropped member was that duplicate. The line
   now reads `.filter((entry) => !entry.applied)`. Setting `CAPTURED_RULE.applied` to `false` is what
   keeps `tests/src/core/BriefCompiler.test.ts`'s `'Gate refused: captured'` assertion measuring the
   refusal it names, and it restores the fixture's own documented meaning ("the refused rule").
2. **`tests/guides.test.ts:134` and `:140`** — further `symbol.kind` sites in the `SB — the comparison
   can report a difference` case, inside `SurfaceSymbol` object literals. The guide report named the
   `EX` and `IM` filters only; these fail the same typecheck. Both now read `keyword`.
3. **`guides/brief.md`** — the fences carrying the same upstream renames as documented values: every
   `*Shape.type // 'object'` line in the Shapers fence became `*Shape.category`, and each
   `rules.filter((entry) => !entry.conclusion)` line became `!entry.applied`.

`tests/src/core/BriefCompiler.test.ts:641`'s `expectTypeOf<(typeof INTERPRETATION_MEMBERS)[number]>().toEqualTypeOf<keyof Interpretation>()`
needed no edit: dropping `'complete'` from the constant satisfied it.

**Evidence.** `npm --prefix /home/user/fleet/brief run check` before the consumer edits:
exit 2, diagnostics across `src/core/BriefCompiler.ts`, `src/core/constants.ts`,
`tests/guides.test.ts`, `tests/setup.test.ts`, `tests/src/core/BriefCompiler.test.ts`,
`tests/src/core/helpers.test.ts`, and `tests/src/core/shapers.test.ts` —
`/home/user/work/evidence/brief-proofs/baseline-check.txt`. After them:
exit 0 — `/home/user/work/evidence/brief-proofs/consumer-check.txt`. Full suite after them: exit 0,
`src:core` 283, `policy` 111, `config` 46, `setup` 27, `guides` 18 —
`/home/user/work/evidence/brief-proofs/consumer-test.txt`.

The vendored mirrors `guides/interpret.md`, `guides/reason.md`, `guides/guide.md`,
`guides/emitter.md`, and `guides/contract.md` were not touched.

## Rows

| Row | Disposition |
| --- | --- |
| brief-obj-1 | applied |
| brief-obj-3 | applied |
| brief-obj-4 | applied |
| brief-subj-1 | applied |
| brief-subj-2 | applied |
| brief-subj-3 | applied |
| brief-subj-4 | applied |
| brief-subj-5 | applied |
| brief-subj-6 | applied |
| brief-subj-7 | applied |
| brief-subj-8 | applied |
| brief-subj-9 | applied |
| fleet-F1 | noop |
| fleet-F2 | noop |

### brief-obj-1 — applied

Every `import type` declaration now precedes every value import in the modules the row names:
`src/core/helpers.ts`, `cloners.ts`, `validators.ts`, `parsers.ts`, `factories.ts`,
`BriefCompiler.ts`, and `BriefManager.ts`, plus `tests/setup.ts`, `tests/setup.test.ts`, and
`tests/src/core/BriefCompiler.test.ts`. Each specifier and named list is unchanged, and no blank
line sits between consecutive imports of the same kind. `src/core/shapers.ts`, `constants.ts`,
`errors.ts`, `index.ts`, `tests/distribution.test.ts`, `tests/src/core/integration.test.ts`, and
`tests/src/core/helpers.test.ts` were left alone.

Sweep: `grep -n "^import" src/core/*.ts tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src/core/*.ts`
lists, for every file, all `^import type` lines before all `^import {` lines.
`tests/src/core/parsers.test.ts` reports as a binary file to `grep` (it carries a non-ASCII byte);
read directly, its imports are all value imports, so it complies.

Gates: `format:check` exit 0 (`brief-proofs/obj1-format-check.txt`), `lint:check` exit 0
(`obj1-lint-check.txt`), `check` exit 0 (`obj1-check.txt`).

### brief-obj-3 — applied (behavioural)

`deriveStatement` is now `(text: string): string | undefined` at `src/core/helpers.ts:1266` and
returns `undefined` at `:1268`. Its `@returns` and `@example` state `undefined`. `deriveTask` closes with
`return statement === undefined ? undefined : buildTask(operation, domain, statement)`. The guide's
Helpers row states the `undefined` outcome.

Failing-first proof. Command: `npm --prefix /home/user/fleet/brief run test:src:core`.

- Before the fix, with the control in place: exit 1, `Tests 1 failed | 282 passed (283)`, failing
  test `derivations > derives one imperative statement from free text` —
  `/home/user/work/evidence/brief-proofs/obj3-control-red.txt`.
- After the fix: exit 0, `Tests 283 passed (283)` —
  `/home/user/work/evidence/brief-proofs/obj3-control-green.txt`.

The control asserts both `deriveStatement('   ')` and `deriveStatement('')` are `undefined`, so the
empty-input case is pinned as well as the whitespace-only one.

Sweep: `grep -rn "@param result\|@param data\|Empty or all spaces" src/ guides/ tests/` returns
nothing; no `return ''` remains in `deriveStatement`.

### brief-obj-4 — applied (behavioural)

The whole `describe('the guide fences, executed')` block, with its header comment, now sits at the
end of `tests/guides.test.ts`, outside `describe.each(MANIFEST)`. It imports `briefToDispatch`,
`briefToGoal`, `briefToHash`, `briefToMarkdown`, `buildBrief`, `buildManifest`, `buildOutcome`,
`buildProof`, `buildReference`, `buildTask`, `createBriefCompiler`, `findBlockingGaps`,
`findManifestOverlaps`, `findUngrantedAuthority`, `findUnpairedGaps`, `INTERPRETATION_MEMBERS`,
`pinBrief`, and `validateBrief` from `@src/core`, plus `requireValue` from `@orkestrel/test`.
`tests/src/core/integration.test.ts` keeps its feature-composition describes
(`text to brief to projections` and `the blocked brief and its answer`) and its imports are pruned to
what those use. `guides/brief.md`'s `tests/guides.test.ts` row names the executed flagship fences;
the `integration.test.ts` row is unchanged.

Runner tallies. `npm --prefix /home/user/fleet/brief run test:guides`: 18 before the move
(`brief-proofs/subj1-test-guides.txt`), 20 after (`brief-proofs/obj4-guides-after.txt`).
`npm --prefix /home/user/fleet/brief run test:src:core`: 283 before
(`brief-proofs/obj3-control-green.txt`), 281 after (`brief-proofs/obj4-src-after.txt`).

Planted control, proving the moved block can fail in its new home. Planting `['PLANTED.md']` in place
of `['AGENTS.md']` in the `briefToDispatch(pinned).authority` assertion: `test:guides` exit 1,
`Tests 1 failed | 19 passed (20)`, failing test
`the guide fences, executed > runs the ### Builders fence and yields every value the Helpers fence documents`
— `/home/user/work/evidence/brief-proofs/obj4-guides-planted-red.txt`. The plant was removed by
editing the line back; `test:guides` exit 0, `Tests 20 passed (20)` —
`/home/user/work/evidence/brief-proofs/obj4-guides-plant-removed-green.txt`.
`grep -rn "PLANTED" . --include=*.ts --include=*.md` (excluding `node_modules`) returns nothing.

Location sweep: `grep -rn "the guide fences, executed" tests/` returns
`tests/guides.test.ts:335` alone.

### brief-subj-1 — applied (BREAKING)

Renamed in place in `src/core/helpers.ts`, no move: `task`→`buildTask`, `reference`→`buildReference`,
`manifest`→`buildManifest`, `outcome`→`buildOutcome`, `given`→`buildGiven`, `example`→`buildExample`,
`citation`→`buildCitation`, `gap`→`buildGap`, `risk`→`buildRisk`, `output`→`buildOutput`,
`proof`→`buildProof`, `brief`→`buildBrief`, `gateDefinition`→`buildGateDefinition` (the refuter's
amended form, keeping the `Definition` noun).

Each first sentence was rewritten so it no longer repeats the new name — `Assembles a `Task` from an
operation, a domain, and a statement.` and its siblings. Every call site and mention was updated:
`helpers.ts` internal calls and TSDoc; `constants.ts`'s `GATE_ID` doc; `cloners.ts` and
`BriefManager.ts` TSDoc examples; `types.ts:168` and `:228`; `BriefCompiler.ts`'s import list, TSDoc
example, `gate`, `#unresolved`, and `#draft`; `tests/setup.ts`, `tests/setup.test.ts`,
`tests/guides.test.ts`, and every `tests/src/core/*.test.ts`; `guides/brief.md`'s tables, prose, and
fences; `README.md`.

Collision, resolved as the row directs. `tests/setup.ts` exported `buildTask`, `buildManifest`, and
`buildBrief` with different signatures. They are now `buildReadyTask`, `buildReadyManifest`, and
`buildReadyBrief`, matching the `buildReadyInput` form the file already used, and every importer was
updated: `tests/setup.test.ts`, `tests/src/core/BriefCompiler.test.ts`, `BriefManager.test.ts`,
`factories.test.ts`, `helpers.test.ts`, `parsers.test.ts`, `shapers.test.ts`, `validators.test.ts`,
and `integration.test.ts`. `grep -rn` for `buildReadyTask|buildReadyManifest|buildReadyBrief` over
`src/ tests/ guides/ README.md` before the rename returned nothing, so no target name was taken.

Old-name sweep. Pattern
`\b(task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition)\(`
over `src/`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src/`,
`guides/brief.md`, `guides/README.md`, `README.md`. Every remaining hit is ruled permitted:

- `src/core/BriefManager.ts:74` and `src/core/types.ts:509` — `brief(id: string)`, the registry
  lookup method the interface declares. Not a builder.
- `tests/src/core/BriefManager.test.ts:76,77,97,119,147,369` and `guides/brief.md:706` —
  `registry.brief(…)`, calls of that method.
- `src/core/BriefCompiler.ts:331`, `tests/src/core/BriefCompiler.test.ts:158`, and
  `guides/brief.md:991` — the literal `'… blocking gap(s)'` inside a message string.

Inflection sweep. Pattern `\bgatedefinitions?(ed|ing)?\b`, case-insensitive, over the same
population, filtered for anything that is not `buildGateDefinition`: no hits.

Backticked-mention sweep. Pattern `` `(task|reference|…|gateDefinition)` `` over `src/`, `tests/`,
`guides/brief.md`, `guides/README.md`, `README.md`. Every remaining hit names a `Brief` section, a
`Briefing` member, a stage-record member, a `BriefManagerInterface` method, or a row key in
`tests/src/core/shapers.test.ts`'s own `PAIRS` table — never a builder. Two hits did name the
builder and were fixed: `src/core/types.ts:168` (`citation` → `buildCitation`) and `:228`
(`brief` → `buildBrief`).

Parity: `npm run test:guides` exit 0 at 18 tests immediately after the rename
(`brief-proofs/subj1-test-guides.txt`), which is the barrel-to-guide bijection holding in both
directions. `npm test` exit 0 (`brief-proofs/subj1-test.txt`).

### brief-subj-2 — applied

`guides/brief.md`'s Builders section opens "Value builders — every builder returns a FRESH object and
OMITS absent optional keys entirely, so its SHAPE round-trips the exact-record validators above." The
false precedent claim is gone.

Sweep: `grep -rn "reasons idiom\|Lowercase value builders" guides/brief.md README.md src/ tests/`
returns nothing.

### brief-subj-3 — applied

`guides/brief.md`'s `BLANK_PATTERN` Constants row now reads "One or more spaces and nothing else — the
one exemplar side `exampleToLines` must not pad; an EMPTY side is padded like any other, because
CommonMark strips a fully-blank span to nothing while an unpadded empty span leaves an unclosed
backtick run." It agrees with `/^ +$/` at `src/core/constants.ts:119` and with the TSDoc beside it.

Sweep: `grep -rn "Empty or all spaces" src/ guides/ tests/` returns nothing.

### brief-subj-4 — applied

`assertBrief(value: unknown)`. The body references, the `@param`, and the `@throws` all name `value`,
matching `parseBrief(value: string)` and `isBriefError(value: unknown)`.

Sweep: `grep -rnE "\b(data|info|item|items|thing|obj|cfg|msg|doc)\b" src/` (excluding the `'data'`
domain literal) returns only ordinary prose — "foreign data", "unknown data", "off-contract data",
"run-specific data", "one thing" — and no identifier.

### brief-subj-5 — applied

`src/core/helpers.ts:100-101` reads
``@param required - If `true`, the outcome gates "done"; if `false`, it is desirable but not blocking. Default: `true`.``
The `blocking` field's block took the same treatment under brief-subj-6.

### brief-subj-6 — applied

Every documented default now uses the fixed form. Sweep: `grep -rn "defaults to\|defaults \`\|Default:" src/core/`
returns only `Default:` lines — `helpers.ts:101` (`required`), `:183` (`blocking: false`), `:274`
(`buildBrief`'s absent collections and `output`), and `:1176` (`turns`). No "defaults to" remains.

### brief-subj-7 — applied

`BriefCompiler.gate(brief: Brief)` and `BriefManager.add(brief: Brief, options?: RecordOptions)`
match `types.ts:478` and `:511`. Their bodies read `brief`. Landed after brief-subj-1, so no
module-scope `brief` builder exists to shadow, even transiently. The `source: Brief` parameters on
the `helpers.ts` leaves are outside this finding and are untouched.

### brief-subj-8 — applied

`buildExample(input: string, output: string, note?: string)` returns
`note === undefined ? { input, output } : { input, output, note }`, and its doc reads
`@param output - The expected output for that input.` One term for `Example.output` throughout. Every
call site is positional, so no call changed.

### brief-subj-9 — applied

Every guard in `src/core/validators.ts` carries `@param value - The value to inspect.` and a
fixed-form `@returns True if `value` is …; false otherwise.`, keeping each existing first sentence and
every `@remarks`. `isGiven`'s first sentence gained "its" so "`value` may be empty" reads as the
member rather than as the parameter. No `@example` was added: `guides/brief.md` already carries a
runnable example per guard.

Measured from the file, each with its command: `grep -c "^export const is" src/core/validators.ts`
→ 18; `grep -c "@param value - The value to inspect." src/core/validators.ts` → 18;
`grep -n "@returns" src/core/validators.ts` → 18 matching lines. The guards named are `isText`,
`isLine`, `isTaskOperation`, `isTaskDomain`, `isOutputFormat`, `isRiskSeverity`, `isTask`,
`isReference`, `isManifest`, `isOutcome`, `isGiven`, `isExample`, `isCitation`, `isGap`, `isRisk`,
`isOutput`, `isProof`, and `isBrief`.

### fleet-F1 — noop

`tests/setup.ts` declares no `isBrowserVuePath`, and this workspace has no browser environment.
Evidence: `grep -rn "isBrowserVuePath" .` over `*.ts`, `*.json`, and `*.md` excluding `node_modules`
returns nothing; `ls app` reports "No such file or directory"; `ls src` reports `core` alone;
`ls tests/setupBrowser.ts` reports "No such file or directory". Nothing was edited, so the `setup`
project, the `test:setup` script, and its step in the `test` chain are all untouched.

### fleet-F2 — noop

No implementation class declares a public `readonly id: string` data field. Classes read:
`BriefError` (`src/core/errors.ts:23`, which declares `readonly code` and `readonly context` and no
`id`), `BriefCompiler` (`src/core/BriefCompiler.ts:64`, whose fields are all `readonly #…`), and
`BriefManager` (`src/core/BriefManager.ts:34`, likewise). The one `readonly id: string` in the tree is
`BriefRecord.id` at `src/core/types.ts:410`, a plain data interface rather than a class field, so the
pattern does not apply. Nothing was edited, so no `JSON.stringify` check was needed.

## Files touched

| File | Change |
| --- | --- |
| `src/core/helpers.ts` | Every value builder renamed to `build*` with a rewritten first sentence; `deriveStatement` returns `string \| undefined`; `assertBrief` takes `value`; `buildExample` takes `output`; the boolean and `Default:` doc forms; type imports first |
| `src/core/validators.ts` | Every guard gains `@param value` and a fixed-form boolean `@returns`; type imports first |
| `src/core/BriefCompiler.ts` | `gate(brief)`; `#blockage` reads `!entry.applied`; the `build*` imports and call sites; type imports first |
| `src/core/BriefManager.ts` | `add(brief, options?)`; the `build*` names in its TSDoc example; type imports first |
| `src/core/constants.ts` | `INTERPRETATION_MEMBERS` drops `'complete'`; `GATE_ID`'s doc names `buildGateDefinition()` |
| `src/core/types.ts` | Two TSDoc mentions renamed to `buildCitation` and `buildBrief` |
| `src/core/cloners.ts` | The `build*` names in its TSDoc example; type imports first |
| `src/core/parsers.ts` | Type imports first |
| `src/core/factories.ts` | Type imports first |
| `tests/setup.ts` | Fixtures renamed to `buildReadyTask` / `buildReadyManifest` / `buildReadyBrief`; the `complete` fields and getters dropped; `CAPTURED_RULE` becomes unapplied; the `build*` names; type imports first |
| `tests/setup.test.ts` | The rule-result and interpretation cases rewritten onto members that still exist; the renamed fixtures and `buildGateDefinition`; type imports first |
| `tests/guides.test.ts` | `symbol.keyword` at the `SB`, `EX`, and `IM` sites; the moved `the guide fences, executed` block and its imports |
| `tests/src/core/integration.test.ts` | The fences block removed; imports pruned to the two remaining describes; the `build*` names |
| `tests/src/core/helpers.test.ts` | The `build*` names, the renamed fixtures, `!entry.applied`, and the `deriveStatement` control |
| `tests/src/core/BriefCompiler.test.ts` | The `build*` names and the renamed fixtures |
| `tests/src/core/BriefManager.test.ts` | The `build*` names and the renamed fixtures |
| `tests/src/core/shapers.test.ts` | `briefShape.category`; the renamed fixture |
| `tests/src/core/factories.test.ts` | The renamed fixture |
| `tests/src/core/parsers.test.ts` | The renamed fixture |
| `tests/src/core/validators.test.ts` | The renamed fixture |
| `guides/brief.md` | The Builders table and every fence on the new names; the reasons-idiom claim deleted; the `BLANK_PATTERN` row corrected; `*Shape.category`; `!entry.applied`; the `deriveStatement` row; the `tests/guides.test.ts` row names the executed fences |
| `README.md` | The quickstart fence on `buildTask` / `buildOutcome` / `buildProof` |

Diffstat: 22 files changed, 1094 insertions(+), 912 deletions(-).

## Gates

Run in order at the finishing tip, each read bare.

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm --prefix /home/user/fleet/brief run format:check` | 0 | `brief-proofs/final-1-format-check.txt` |
| `npm --prefix /home/user/fleet/brief run lint:check` | 0 | `brief-proofs/final-2-lint-check.txt` |
| `npm --prefix /home/user/fleet/brief run check` | 0 | `brief-proofs/final-3-check.txt` |
| `npm --prefix /home/user/fleet/brief run build` | 0 | `brief-proofs/final-4-build.txt` |
| `npm --prefix /home/user/fleet/brief test` | 0 | `brief-proofs/final-5-test.txt` |

`npm test` reported `src:core` 281 passed, `policy` 111 passed, `config` 46 passed, `setup` 27
passed, `guides` 20 passed. No failure excerpt to quote.

**Observation, not a criterion.** That whole-suite reading was taken inside this unit's own exec. The
deciding run belongs to the Orchestrator after the unit exits.

`git status --short` lists modified files only, every one inside Owned: `src/core/**`, `tests/**`
excluding the vendored `setupPolicy.ts` / `policy.test.ts` / `config.test.ts` / `distribution.test.ts`,
`guides/brief.md`, and `README.md`. No off-limits path appears. `package.json`, `vite.config.ts`,
`tsconfig.json`, and `package-lock.json` are unmodified — no row needed them.

## Breaking

`@orkestrel/brief`'s published surface moves. No consumer inside the fleet closure: a grep of every
non-vendored `package.json` under `/home/user/fleet` for a dependency on `"@orkestrel/brief"` matched
only `/home/user/fleet/brief/package.json`'s own `name` field. The blast radius is registry consumers
of the published 0.0.6, and a minor bump carries it.

Renamed exports, old name to new:

| Old | New |
| --- | --- |
| `task` | `buildTask` |
| `reference` | `buildReference` |
| `manifest` | `buildManifest` |
| `outcome` | `buildOutcome` |
| `given` | `buildGiven` |
| `example` | `buildExample` |
| `citation` | `buildCitation` |
| `gap` | `buildGap` |
| `risk` | `buildRisk` |
| `output` | `buildOutput` |
| `proof` | `buildProof` |
| `brief` | `buildBrief` |
| `gateDefinition` | `buildGateDefinition` |

Changed signatures:

- `deriveStatement(text: string): string | undefined` — was `: string`, returning `''` for empty or
  whitespace-only text. A consumer testing `result.length === 0` must test `result === undefined`.
- `buildExample(input, output, note?)` — the second parameter is named `output` rather than `result`.
  Positional callers are unaffected.
- `BriefCompilerInterface.gate` and `BriefManagerInterface.add` are unchanged; only the classes'
  parameter names moved onto the interface's word, which reaches the emitted declaration and editor
  hints.

No compatibility alias, re-export, or shim was left.

## Shared-file patches

None. No row obliged an edit outside this checkout, and no file under `/home/user/fleet/` other than
`/home/user/fleet/brief` was read for a patch or written.

## Deviations

No stop. The ancillary decisions, recorded and carried on from:

1. **The retained `above` in the Builders sentence.** brief-subj-2's operative form prescribes the
   resulting sentence verbatim, and that sentence ends "…round-trips the exact-record validators
   above." The word is pre-existing text the row asked me to keep, so I kept it rather than editing
   beyond the row. Where the Orchestrator wants it replaced, that is a successor edit to
   `guides/brief.md:352`.
2. **Two comment references in the moved block.** The block's header comment described
   `tests/guides.test.ts` in the third person, which is false once the block lives in that file. I
   rewrote the opening to "The parity checks earlier in this file prove…", and changed the inner
   "Each assertion below" to "Each assertion following", so neither uses `above` or `below` as a
   document reference. Every assertion and value in the block is unchanged.
3. **`tests/guides.test.ts:253`'s illustration.** Its comment names `` (`task`, `gap`, `role`) `` as
   all-lowercase single words the TSDoc regex skips. Those words are no longer exports, which makes
   the illustration more accurate rather than less, so I left it. It is not a stale symbol reference.

One standing condition is worth reporting back rather than absorbing: the closure drift the addendum
covers was wider than the addendum's list, by the further consequential edits recorded under
§ Consumer edits taken. The `RuleResult.conclusion` one is the load-bearing case — it sits in `src`
and decides which rule ids a refusal names, so it is not a fixture edit and an auditor should read it
as part of this unit's behaviour rather than as addendum bookkeeping.

## Review evidence

- `/home/user/work/evidence/conform-brief.diff` — 4400 lines.
- `/home/user/work/evidence/conform-brief.status` — 22 entries.
- `/home/user/work/evidence/brief-proofs/` — every runner capture named in this report.

Produced with the one plain command `node /home/user/scaffold/tmp/work/evidence.mjs brief`.

## Fix round 1

The fix answers claim 5 in
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-r1-checker-luna.result.md`.
The executed Builders fence pins each documented value:

- `tests/guides.test.ts:392` pins `draft.output.format` to `'diff'`.
- `tests/guides.test.ts:393` pins `draft.trace` to `undefined`.
- `tests/guides.test.ts:394` pins `buildGateDefinition().rules.length` to `7`.

The failing-first command was `npm run test:guides`. With the last value planted as `0`, it
reported `Tests 1 failed | 19 passed (20)` and received `7` at
`/home/user/work/evidence/brief-proofs/fix1-red.txt`. After restoring the value, the same command
reported `Tests 20 passed (20)` at
`/home/user/work/evidence/brief-proofs/fix1-green.txt`.

`guides/brief.md:352` now reads “round-trips the exact-record validators named earlier.”

The sweep command was
`grep -rnE "\b(above|below)\b" guides/brief.md guides/README.md README.md src tests`.
Each hit has this ruling:

- `guides/brief.md:208`, `:632`, `:1066`, and `:1080` are document pointers.
- `guides/brief.md:545` compares outcome ranks, and `:1044` is the reasons operator literal
  `'above'`; neither is a document pointer.
- `src/core/BriefCompiler.ts:112` is a document pointer in a comment.
- `src/core/helpers.ts:349`, `:350`, and `:355` are reasons operator literals, while `:669`
  compares outcome ranks; none is a document pointer.
- `tests/src/core/BriefCompiler.test.ts:547`,
  `tests/src/core/BriefManager.test.ts:126`, `tests/src/core/parsers.test.ts:106`,
  `tests/src/core/shapers.test.ts:115`, `:124`, `:193`, and `:241`,
  `tests/policy.test.ts:544`, and `tests/guides.test.ts:277` are document pointers in comments.
  GNU grep reports the parser test as binary because its hostile-text fixture contains a null byte;
  `cat -n tests/src/core/parsers.test.ts` locates that hit.
- `tests/setupPolicy.ts:2098` describes the path location under `tests/src` or `tests/app`; it is
  not a document pointer.
- `guides/README.md` and `README.md` have no hit.

### Gates

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm run format:check` | 0 | `/home/user/work/evidence/brief-proofs/fix1-format-check.txt` |
| `npm run lint:check` | 0 | `/home/user/work/evidence/brief-proofs/fix1-lint-check.txt` |
| `npm run check` | 0 | `/home/user/work/evidence/brief-proofs/fix1-check.txt` |
| `npm run test:guides` | 0 | `/home/user/work/evidence/brief-proofs/fix1-green.txt` |

### Deviations

Expected: acceptance criterion 3 says `guides/brief.md` carries no `above` or `below` document
pointer after the owned `:352` rewrite.

Found: the sweep reports document pointers at `guides/brief.md:208`, `:632`, `:1066`, and `:1080`.

Exact evidence: the sweep output reads “builders below,” “Surface rows above,” “definition above,”
and “above; both are exported,” respectively.

Done or not done: the owned `guides/brief.md:352` rewrite and every requested assertion are done.
The other guide lines and the source and test comments are outside the fix brief's owned sites, so
they were not edited.

Hypothesis: acceptance criterion 3 assumed that the owned `:352` occurrence was the guide's only
document pointer.

## Fix round 1b

The sweep command was
`grep -rnE '\b([Aa][Bb][Oo][Vv][Ee]|[Bb][Ee][Ll][Oo][Ww])\b' guides/brief.md guides/README.md README.md src tests`.

### Rewrites

- `guides/brief.md:208`: “the builders below” → “the following builders”.
- `guides/brief.md:632`: “the Surface rows above” → “the earlier Surface rows”.
- `guides/brief.md:1066`: “the definition above” → “the preceding definition”.
- `guides/brief.md:1080`: “as above” → “as in the preceding example”.
- `src/core/BriefCompiler.ts:112`: “every stage below” → “every following stage”.
- `tests/src/core/BriefCompiler.test.ts:547`: “The two runs below” → “The following runs”.
- `tests/src/core/BriefManager.test.ts:126`: “the refusal above” → “the earlier refusal”.
- `tests/src/core/parsers.test.ts:106`: “the assertions above” → “the earlier assertions”.
- `tests/src/core/shapers.test.ts:115`: “no row above” → “no earlier row”.
- `tests/src/core/shapers.test.ts:124`: “the sweep below” → “the following sweep”.
- `tests/src/core/shapers.test.ts:193`: “the refusals above” → “the earlier refusals”.
- `tests/src/core/shapers.test.ts:241`: “the comparison above” → “the earlier comparison”.
- `tests/policy.test.ts:544`: “the empty result above” → “the earlier empty result”.
- `tests/guides.test.ts:277`: “the check above” → “the earlier check”.

### Permitted hits

- `guides/brief.md:545`: “ranked above” compares outcome ranks.
- `guides/brief.md:1044`: `'above'` is a reasons operator literal.
- `src/core/helpers.ts:349`, `:350`, and `:355`: `'above'` is a reasons operator literal.
- `src/core/helpers.ts:669`: “ranked above” compares outcome ranks.
- `tests/setupPolicy.ts:2098`: “below tests/src or tests/app” describes a path location.

The sweep reports no hit in `guides/README.md` or `README.md`.

### Gates

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run test:guides` | 0 |

### Orchestrator integration (22:20 UTC, after fix round 1b returned)

Fix round 1b's scope named `tests/**` for the pointer sweep without excluding the vendored set, so the Sol writer rewrote a document pointer in the vendored `tests/policy.test.ts` (the `above` scaffold's host rows already carry at `tests/policy.test.ts:544`). The Orchestrator restored that file to its committed bytes (`git show HEAD:tests/policy.test.ts` written back), regenerated the evidence, and records the vendored site against scaffold's host-row follow-on where it belongs. Every other rewrite of the round stands.

## Fix round 1c

The fix answers claim 5 in
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-r1b-checker-luna.result.md`.
The executed Builders fence pins every value it supplies:

- `tests/guides.test.ts:417` pins `draft.task` to
  `{ operation: 'refactor', domain: 'code', statement: 'Refactor useForm to native browser form APIs.' }`.
- `tests/guides.test.ts:422` pins `draft.authority` to
  `[{ path: 'AGENTS.md', note: 'project law; wins every conflict' }]`.
- `tests/guides.test.ts:425` pins `draft.manifest` to the fence's `read`, `edit`, `locked`, and
  `forbidden` references.
- `tests/guides.test.ts:436` pins `draft.outcomes` to the fence's ranked outcome text, with
  `required: true` on each outcome.
- `tests/guides.test.ts:443` pins `draft.rules` to `['No new dependencies.']`.
- `tests/guides.test.ts:444` pins `draft.invariants` to
  `['useForm public method names and signatures in types.ts.']`.
- `tests/guides.test.ts:448` pins `draft.givens` to
  `[{ category: 'convention', name: 'indentation', value: 'tabs' }]`.
- `tests/guides.test.ts:451` pins `draft.examples` to
  `[{ input: '<input required>', output: 'validity read from el.validity' }]`, with no `note`.
- `tests/guides.test.ts:454` pins `draft.assumptions` to
  `['Validation message wording is preserved.']`.
- `tests/guides.test.ts:455` pins `draft.citations` to the MDN Constraint Validation name,
  `https://developer.mozilla.org/` URL, and native-validity note.
- `tests/guides.test.ts:462` pins `draft.gaps` to the `rules` question with `blocking: false` and
  no `candidates`.
- `tests/guides.test.ts:469` pins `draft.risks` to severity `medium`, text
  `'native validation differs subtly'`, and mitigation `'assert message and state in tests'`.
- `tests/guides.test.ts:476` pins `draft.output` to
  `{ format: 'diff', include: ['updated useForm.ts'] }`, with no other optional key.
- `tests/guides.test.ts:477` pins `draft.proofs` to
  `[{ text: 'type-check and lint pass', command: 'npm run check' }]`.
- `tests/guides.test.ts:480` pins `draft.output.format` to `'diff'`.
- `tests/guides.test.ts:481` pins `draft.trace` to `undefined`.
- `tests/guides.test.ts:482` pins `draft.hash` to `undefined`.
- `tests/guides.test.ts:483` pins `buildGateDefinition().rules.length` to `7`.

The failing-first command was `npm run test:guides`. With the `buildGiven` expected value planted
as `'spaces'`, it reported `Tests 1 failed | 19 passed (20)` and received `'tabs'` at
`/home/user/work/evidence/brief-proofs/fix1c-red.txt`. After restoring `'tabs'`, the same command
reported `Tests 20 passed (20)` at
`/home/user/work/evidence/brief-proofs/fix1c-green.txt`.

## Fix round 2

The fix answers claims 3 and 4 and findings O1 and O2 in
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-objective-r1-sol.md`. Every command
in this section ran in `/home/user/fleet/brief`.

### Sweeps

**Claim 3 — the inflection sweep over every renamed builder.** The command was:

```text
grep -rniE '\b(task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition)(s|ed|ing)?\s*\(' src tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src guides/brief.md guides/README.md README.md
```

`-i` supplies the case-insensitivity and `(s|ed|ing)?` the inflections, so the pattern admits
`Task(`, `gaps(`, `outcomed(`, and `referencing(` alongside each bare name. No builder survives in
its old call form. Each surviving hit has this ruling:

- `BriefManagerInterface.brief` and `.briefs`, the registry lookup and listing methods, not
  builders — `src/core/BriefManager.ts:74`, `:79`, `src/core/types.ts:509`, `:510`,
  `tests/src/core/factories.test.ts:26`, `tests/src/core/BriefManager.test.ts:76`, `:77`, `:78`,
  `:97`, `:119`, `:147`, `:164`, `:165`, `:369`, `:370`, `:381`, `guides/brief.md:706`, and `:707`.
- The literal `'… blocking gap(s)'` inside a message string — `src/core/BriefCompiler.ts:331`,
  `tests/src/core/BriefCompiler.test.ts:158`, and `guides/brief.md:991`.
- `source.examples(` and `findUnexampled(`, the `@orkestrel/guide` reader method and the parity
  leaf, reached by the `example` + `s` inflection — `tests/guides.test.ts:196`, `:197`, and `:202`.
- The heading literal `'Citations (trust order)'`, reached by the `citation` + `s` inflection —
  `src/core/helpers.ts:1117` and `tests/src/core/helpers.test.ts:670`.
- The prose phrase "over briefs (a brief's links…" — `guides/brief.md:861`.
- The fixture getter `get outcomes()` on a test-local class — `tests/src/core/BriefCompiler.test.ts:241`.

**Claim 4 — the old-form sweep behind each row.** The population was `src`, `tests`, `guides`, and
`README.md`.

**brief-subj-5** removed the `required` boolean's old wording. The command returned exit 1 and no
hit:

```text
grep -rnE 'Whether the outcome gates' src tests guides README.md
```

**brief-subj-7** removed the old parameter word on `gate` and `add`. The command returned
`tests/src/core/BriefManager.test.ts:91`, `:129`, and `:130`, each ruled in the paragraph following:

```text
grep -rnE '\b(gate|add)\s*\(\s*(data|source)\b' src tests guides README.md
```

**brief-subj-8** removed `buildExample`'s `result` parameter. The command returned exit 1 and no
hit:

```text
grep -rnE '@param result\b|\bresult:\s*string|buildExample\s*\([^)]*\bresult\b|\bexample\s*\(\s*input' src tests guides README.md
```

The brief-subj-7 hits are call sites, not declarations: each is `registry.add(source)` passing the
test's own `const source`, declared at `tests/src/core/BriefManager.test.ts:86` and `:128`. The
companion documentation sweep
`grep -rnE '\b(gate|add)\((data|source):|@param (data|source) -' src tests guides README.md`
returns no `gate(` or `add(` hit; its `@param source -` hits sit on the `src/core/cloners.ts` and
`src/core/helpers.ts` leaves the row excludes, and on the vendored `tests/setupPolicy.ts`.

### O1 rewrites

| Site | Before | After |
| --- | --- | --- |
| `src/core/types.ts:168-169` | "where it once took `(name, role, url)`" | "where the earlier `citation` function took `(name, role, url)`" |
| `src/core/helpers.ts:190` | `buildGap('rules', 'Should validation message wording change?')` | `buildGap('rules', 'Does validation message wording need to change?')` |
| `guides/brief.md:415` | `buildOutcome(2, 'tests cover the new code paths')` | `buildOutcome(2, 'tests cover the changed code paths')` |
| `guides/brief.md:417` | `rules: ['No new dependencies.']` | `rules: ['Add no dependencies.']` |
| `guides/brief.md:429` | `buildGap('rules', 'Should validation message wording change?')` | `buildGap('rules', 'Does validation message wording need to change?')` |
| `guides/brief.md:980` | `buildGap('output', 'Should the result land as a diff or full files?', {` | `buildGap('output', 'Does the result need to land as a diff or as full files?', {` |
| `guides/brief.md:990` | `question: 'Should the result land as…'` | `question: 'Does the result need…'` |
| `tests/guides.test.ts:391` | `buildOutcome(2, 'tests cover the new code paths')` | `buildOutcome(2, 'tests cover the changed code paths')` |
| `tests/guides.test.ts:393` | `rules: ['No new dependencies.']` | `rules: ['Add no dependencies.']` |
| `tests/guides.test.ts:405` | `gaps: [buildGap('rules', 'Should validation message wording change?')]` | `gaps: [buildGap('rules', 'Does validation message wording need to change?')]` |
| `tests/guides.test.ts:442` | `{ rank: 2, text: 'tests cover the new code paths', required: true }` | `{ rank: 2, text: 'tests cover the changed code paths', required: true }` |
| `tests/guides.test.ts:444` | `expect(draft.rules).toStrictEqual(['No new dependencies.'])` | `expect(draft.rules).toStrictEqual(['Add no dependencies.'])` |
| `tests/guides.test.ts:465` | `question: 'Should validation message wording change?'` | `question: 'Does validation message wording need to change?'` |

`guides/brief.md:990` is the documented value the `:980` fence produces. The owned `:980` rewrite
makes it false, so it moved with the fence. Its elision mark `…` already truncated the question, and
the shorter truncation keeps the line inside the guide's width.

`tests/guides.test.ts` carries no presence guard over any of these strings: `grep -nE
'toContain|toMatch|fence' tests/guides.test.ts` returns only section, language, and inventory
checks. The transcriptions at `:391`, `:393`, `:405`, `:442`, `:444`, and `:465` are the whole
carrier set, and each followed its fence line without changing an asserted relationship.

### O1 sweep

The command was
`grep -rniE '\b(new|should|once)\b' src guides/brief.md guides/README.md README.md tests/guides.test.ts`.
`should` returns no hit. Every `new` hit is `new X()` constructor syntax at
`src/core/BriefCompiler.ts:54`, `:83`, `:213`, `:226`, `:302`, `:396`, `:471`,
`src/core/cloners.ts:36`, `:47`, `:125`, `src/core/factories.ts:36`, `:55`,
`src/core/BriefManager.ts:28`, `:36`, `:49`, `:54`, `:105`, `:139`, `:150`, `:182`, `:199`,
`src/core/helpers.ts:533`, `:539`, `:579`, `:587`, `:706`, `:805`, `:819`, `:854`, `:897`,
`src/core/errors.ts:16`, `:46`, `guides/brief.md:188`, `:529`, `:677`, `:711`, and
`tests/guides.test.ts:144`, `:213`, `:241`, `:251`, `:275`, `:299` — save the one recorded under
§ Deviations. Every `once` hit counting occurrences rather than sequencing them is permitted:
`src/core/BriefCompiler.ts:243`, `:265`, `src/core/cloners.ts:12`, `src/core/helpers.ts:513`,
`:557`, `src/core/types.ts:438`, `:453`, `:455`, `guides/brief.md:460`, `:466`, `:829`, `:837`,
`:1205`, and `tests/guides.test.ts:221`. `guides/README.md` and `README.md` have no hit.

### O2 rewrite

`tests/guides.test.ts:340`: "These two tests transcribe" → "These tests transcribe".

### Gates

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 53 files |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | `tsconfig.json` and `configs/src/tsconfig.core.json` both clean |
| `npm run test:guides` | 0 | `Test Files 1 passed (1)`, `Tests 20 passed (20)` |

`git status --short` lists the unit's same 22 paths and nothing added.

### Deviations

Expected: acceptance criterion 2 says the `new|should|once` sweep returns only permitted code
senses.

Found: the sweep returns hits in the banned prose senses at sites outside this fix's owned lines.

Exact evidence:

- `src/core/BriefManager.ts:166` — "seeding all-or-nothing once every entry has been staged"
  (`once` sequencing, the sense `after` carries).
- `src/core/helpers.ts:869` — "returns its argument by IDENTITY once the guard passes" (same sense).
- `guides/brief.md:591` — "argument once the guard passes" (same sense).
- `src/core/types.ts:155` — "vocabulary this once held" (`once` for past time).
- `tests/guides.test.ts:303` — "the exact member this package once shipped dead" (same sense).
- `guides/brief.md:933` — `text: 'migrate the 3 legacy stores to the new driver seam'` (`new`
  dating a value, inside fence sample data, the same sense the lane flagged at `:415`).

Done or not done: every site the fix brief names is done, and each gate exits 0. The listed sites
are outside Owned, so they were not edited.

Hypothesis: the objective lane enumerated the sites its own reading reached rather than the sweep's
full result, so criterion 2 inherited a site list narrower than the sweep it prescribes.

The one edit taken outside the named line list is `guides/brief.md:990`, recorded under § O1
rewrites. The rule taken: an owned edit must not leave a line it falsified standing, and it must
not reach a violation it did not cause. `:990` is the first case; every site under § Deviations is
the second.

## Fix round 2b

This section records the successor unit
`/home/user/scaffold/tmp/units/conform/conform-brief-fix2b-brief.md`, which carries the four
banned-sense sites fix round 2 reported outside its own scope. Fix round 2's edits stand
unchanged; the four rewrites here are the only edits this round made.

### Rewrites

| Site | Before | After |
| --- | --- | --- |
| `src/core/BriefManager.ts:166` | `// seeding all-or-nothing once every entry has been staged.` | `// seeding all-or-nothing after every entry has been staged.` |
| `src/core/helpers.ts:869` | ` * The throwing half of the intake pair: this returns its argument by IDENTITY once the` | ` * The throwing half of the intake pair: this returns its argument by IDENTITY after the` |
| `guides/brief.md:591` | `argument once the guard passes — so it is a helper, not a factory, and lives beside the` / `other pure leaves.` | `argument after the guard passes — so it is a helper, not a factory, and lives beside` / `the other pure leaves.` |
| `guides/brief.md:933` | `	text: 'migrate the 3 legacy stores to the new driver seam',` | `	text: 'migrate the 3 legacy stores to the replacement driver seam',` |

The `guides/brief.md:591` rewrite moves one word across the line break so the paragraph keeps its
wrap width; the sentence is otherwise unchanged. The `:933` rewrite changes fence sample data only.
The fence's documented outputs at `:945`-`:950` read `'migrate'`, the extracted count `'3'`, and the
gate's `true`, and the replaced word feeds none of them.

`tests/guides.test.ts` transcribes neither changed guide line, so this round updated no
transcription. The pattern behind that ruling is `guard passes` and `migrat`, run over
`tests/guides.test.ts`; each returns no hit.

### Permitted sites

These two sites match the sweep pattern in a sense the substitution row does not ban, so they stand
as written:

- `src/core/types.ts:155` — "vocabulary this once held": `once` means "at one time", not `after`.
- `tests/guides.test.ts:303` — "the exact member this package once shipped dead": same sense.

### The sweep

The pattern is `\b(new|should|once)\b`, case-insensitive, over `src`, `guides/brief.md`,
`guides/README.md`, `README.md`, and `tests/guides.test.ts`. `guides/README.md` and `README.md`
return no hit. No `should` survives in any swept path.

Every surviving `new` is constructor syntax — `new BriefError`, `new BriefCompiler`,
`new BriefManager`, `new Emitter`, `new Map`, `new Set`, `new WeakMap`, `new WeakSet`, `new Error`,
`new RegExp` — at `src/core/BriefCompiler.ts:54`, `:83`, `:213`, `:226`, `:302`, `:396`, `:471`;
`src/core/cloners.ts:36`, `:47`, `:125`; `src/core/factories.ts:36`, `:55`;
`src/core/BriefManager.ts:28`, `:36`, `:49`, `:54`, `:105`, `:139`, `:150`, `:182`, `:199`;
`src/core/helpers.ts:533`, `:539`, `:579`, `:587`, `:706`, `:805`, `:819`, `:854`, `:897`;
`src/core/errors.ts:16`, `:46`; `guides/brief.md:188`, `:529`, `:677`, `:711`; and
`tests/guides.test.ts:144`, `:213`, `:241`, `:251`, `:275`, `:299`.

Every surviving `once` means "at one time" — a value read, materialized, or listed a single time —
at `src/core/BriefCompiler.ts:243`, `:265`; `src/core/cloners.ts:12`; `src/core/helpers.ts:513`,
`:557`; `src/core/types.ts:438`, `:453`, `:455`; `guides/brief.md:460`, `:466`, `:829`, `:837`,
`:1205`; and `tests/guides.test.ts:221`. The past-time sense at `src/core/types.ts:155` and
`tests/guides.test.ts:303` is recorded under § Permitted sites.

### Sites outside Owned

These sites carry a banned sense outside both the Owned line list and the sweep's paths, so this
round left them as written:

- `tests/src/core/helpers.test.ts:872` — the test name "returns the same value by identity once the
  guard passes" carries temporal `once`, the same sense the `src/core/helpers.ts:869` rewrite closed.
- `tests/src/core/integration.test.ts:29` and `tests/src/core/BriefCompiler.test.ts:57` — each
  carries `'migrate the 3 legacy stores to the new driver seam'` as its own sample data. Neither
  transcribes the guide, so the `guides/brief.md:933` rewrite leaves both true.

### Gates

Every gate ran from `/home/user/fleet/brief` after the four rewrites, on 2026-09-04:
`npm run format:check` exit 0, `npm run lint:check` exit 0, `npm run check` exit 0, and
`npm run test:guides` exit 0 with 20 tests passed in 1 file. `git status --short` lists the unit's
22 modified paths and no untracked path.

### Orchestrator integration (00:52 UTC, after fix round 2b returned)

Fix round 2b reported one temporal `once` in a test name outside its scope, `tests/src/core/helpers.test.ts:872` ("once the guard passes", the sense fix round 2b's `src/core/helpers.ts:869` rewrite closed); the Orchestrator rewrote the one word to `after` (`npx oxfmt --check` exit 0). The sample strings at `tests/src/core/integration.test.ts:29` and `tests/src/core/BriefCompiler.test.ts:57` are test data rather than prose and stay.
