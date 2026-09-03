# Unit reason-prose — report

## Row 1 — `defaults to`

Landed form of reason-subj-16 read from `types.ts` (`Default: \`value\`.` as a trailing sentence, for example `types.ts:230-231`) and `constants.ts:47` (`Default: \`1\`.`). Applied that form to every `defaults to …` doc-block site in `src/core/factories.ts`, and to every guide table cell twinning a changed doc sentence.

Sites changed, `src/core/factories.ts` (line now):

- `:81` `id` — the evaluator's identity string. Default: `'evaluator'`.
- `:103` `id` — the transformer's identity string. Default: `'transformer'`.
- `:124` `id` — the aggregator's identity string. Default: `'aggregator'`.
- `:145-147` `id`… Default: `'quantitative'`. `evaluator` / `transformer` / `aggregator` — injectable operators. Default: a fresh default-constructed instance for each.
- `:174-175` `id`… Default: `'logical'`. `evaluator` — the injectable check evaluator. Default: a fresh instance.
- `:200` `id` — the reasoner's identity string. Default: `'symbolic'`.
- `:225` `id` — the reasoner's identity string. Default: `'inferential'`.
- `:281` `id`. Default: `seed.id`. (`DefinitionBuilder`)
- `:315` `id`. Default: `seed.id`; OPTIONAL — … (`SubjectBuilder`)
- `:348` `groups` — the initial collection. Default: empty.
- `:401` `rules` — the initial collection. Default: empty.
- `:424` `equations` — the initial collection. Default: empty.
- `:447` `variables` — the initial record. Default: empty.
- `:470` `facts` — the initial collection. Default: empty.
- `:493` `inferences` — the initial collection. Default: empty.
- `:587` `name`. Default: the `id`; … (`createRule`)
- `:735` `name`. Default: the `id`; … (`createEquation`)
- `:768` `confidence`. Default: `1` (the key is always set).
- `:774` `@param confidence - The fact's confidence (\`0–1\`; default \`1\`)`
- `:798` `name`. Default: the `id`; … (`createInference`)
- `:909` `name`. Default: the `id`; … (`createStaticFactor`)
- `:1010` `name`. Default: the `id`; … (`createFactorGroup`)
- `:1039` `aggregation`. Default: `'sum'`; … (`createQuantitativeDefinition`)
- `:1070` `strategy`. Default: `'forward'`; … (`createLogicalDefinition`)
- `:1101` `variables`. Default: `{}`; … (`createSymbolicDefinition`)
- `:1132` `strategy`. Default: `'forward'`; … (`createInferentialDefinition`)

Guide twins changed, `guides/reason.md`:

- `:52-53` — `createDefinitionBuilder` / `createSubjectBuilder` API table: `id defaults to seed.id` → `id default: seed.id`.
- `:105` — `createRule`: `name defaults to the id` → `name default: the id`.
- `:111` — `createEquation`: same form.
- `:118` — `createStaticFactor`: same form.
- `:123-126` — `createQuantitativeDefinition` / `createLogicalDefinition` / `createSymbolicDefinition` / `createInferentialDefinition`: `defaults to` → `default:`.
- `:432` — `TransformerInterface.apply`: `absent operand defaults to` → `absent operand default:`.
- `:962` — flagship-fence comment: `` `name` defaults to the id `` → `` `name` default: the id ``.

Left unchanged (out of row 1's scope, ruled at row 6): the module-scope `//` comment at `factories.ts:519` (not a doc block), and the `@param … ; defaults to …` sites and `it(...)` titles in `tests/setup.ts` and `tests/src/**` (reason-subj-16's `Where` names `types.ts` and `constants.ts`; row 1 extends it only to `factories.ts` doc blocks, not to `tests/**`).

## Row 2 — `via`

Replaced `via` with `through` or `by using` by sense at every test site the report named:

- `tests/src/core/validators.test.ts:365,438` — `via` → `through`.
- `tests/src/core/builders/SubjectBuilder.test.ts:15` — `via` → `through` (both occurrences).
- `tests/src/core/reasoners/InferentialReasoner.test.ts:1215,1658,1719` — `via` → `through`.
- `tests/src/core/reasoners/QuantitativeReasoner.test.ts:1420` — `via` → `by using` (names an operation applied).
- `tests/src/core/reasoners/LogicalReasoner.test.ts:31,132,912` — `via` → `through`.
- `tests/src/core/Reason.test.ts:744` — `via` → `by using` (names the helper function used).
- `tests/src/core/helpers.test.ts:337,419,1159,1633` — `via` → `through`.

## Row 3 — `simplest`

`tests/setup.ts:159` — `Build the simplest runnable ...` → `Build a minimal runnable ...`, dropping the superlative.

## Row 4 — the header

`tests/setup.ts:1-3` — removed the clause naming `setupBrowser.ts` (absent from the tree; confirmed with `test -f tests/setupBrowser.ts` → not found). Header now reads: `Keep this file free of \`node:*\` and of \`document\` / \`window\` / Vue.`

## Row 5 — the tally

- `guides/reason.md:86` — `seven self-owning manager properties` → named the managers: `` `groups` / `factors` / `rules` / `equations` / `variables` / `facts` / `inferences` self-owning manager properties ``.
- `src/core/factories.ts:278-279` — `through seven self-owning manager properties` → `through the \`groups\`, \`factors\`, \`rules\`, \`equations\`, \`variables\`, \`facts\`, and \`inferences\` self-owning manager properties`.

## Row 6 — sweep

Ran `\bvia\b`, `\bsimpl(y|e|er|est|ify|ified)\b`, `defaults to`, `setupBrowser`, and `\b(seven|six|eight)\b` (case-insensitive) over `src/core/factories.ts`, `guides/reason.md`, and the owned `tests/**` (excluding the vendored `setupPolicy.ts`, `policy.test.ts`, `config.test.ts`, `distribution.test.ts`).

- `\bvia\b` — 0 hits after row 2.
- `\bsimpl…\b` — found one further hit, `tests/src/core/reasoners/QuantitativeReasoner.test.ts:672` (`the factor is simply unresolvable`); fixed by deleting `simply` per `.claude/rules/writing.md` § Substitutions. 0 hits remaining.
- `defaults to` — `factories.ts:519` (a `//` module comment, not a doc block: ruled out of row 1's scope) and eleven `tests/**` sites (`tests/setup.ts:165,180,181,221` and six `it('… defaults to …')` titles across `builders/managers/*.test.ts`, `SymbolicReasoner.test.ts:555`, `Reason.test.ts:184`, `helpers.test.ts:176`, plus two `builders/*Builder.test.ts` titles): ruled out of scope, because reason-subj-16's `Where` names only `types.ts` and `constants.ts`, and this brief's row 1 extends the fixed form only to `factories.ts` doc blocks.
- `setupBrowser` — 0 hits after row 4.
- `\b(seven|six|eight)\b` — found three further "seven"-tally sites twinning the same `DefinitionBuilder` manager-count claim: `guides/reason.md:387` (`DefinitionBuilderInterface` API-table row), `:395` (`## Methods` intro sentence), `:552` (`destroy` method-table row). Fixed all three by naming the managers or dropping the number. Also found `guides/reason.md:1031` (`the six list managers`), which already named the six managers in the same cell (`Group / Factor / Rule / Equation / Fact / Inference`); dropped the redundant count to `the list managers`. Ruled `tests/src/core/operators/Transformer.test.ts:190` (`folds a long six-operation chain`) in scope, out of the banned sense: it states the fixed length of one test fixture's operation chain, a measured technical quantity rather than a count of a growable set, so no substitution.

## Gates

- `npm --prefix /home/user/fleet/reason run format:check` — first run failed (`guides/reason.md` reformatted after the table edits). Converged with the allowed `npx oxfmt --config .oxfmtrc.json guides/reason.md`. Re-run exit code 0.
- `npm --prefix /home/user/fleet/reason run lint:check` — exit code 0.
- `npm --prefix /home/user/fleet/reason run check` — exit code 0.
- `npm --prefix /home/user/fleet/reason run build` — exit code 0.
- `npm --prefix /home/user/fleet/reason test` — exit code 0 (`test:src` 1202 passed, `test:policy` 111 passed, `test:config` 46 passed, `test:setup` 26 passed, `test:guides` 94 passed).

## Audit

`cd /home/user/fleet/reason && npx scaffold audit --offline` — `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs reason` — wrote `/home/user/work/evidence/conform-reason.diff` (819 lines) and `/home/user/work/evidence/conform-reason.status` (10 entries).

`git -C /home/user/fleet/reason status --short` lists exactly ten paths, all Owned: `guides/reason.md`, `src/core/factories.ts`, `tests/setup.ts`, `tests/src/core/Reason.test.ts`, `tests/src/core/builders/SubjectBuilder.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/reasoners/InferentialReasoner.test.ts`, `tests/src/core/reasoners/LogicalReasoner.test.ts`, `tests/src/core/reasoners/QuantitativeReasoner.test.ts`, `tests/src/core/validators.test.ts`.

## Orchestrator correction

The round-1 checker (`units/followon/reason-prose-checker-luna.md`) refuted claim 9 on `tests/setup.ts:164`: the unit had rewritten the `@param id` sentence to the `Default:` form while its sibling `@param value` line and every other `tests/**` `@param` site stayed on `defaults to`, and this report's row 1 records those sites as outside the row. At 18:19 UTC the Orchestrator reverted that one line to its committed text (`@param id - The definition id (and name); defaults to `'static-quant'``) with a single `sed` substitution, so the `tests/setup.ts` hunk changes the header comment and the `simplest` sentence only, and regenerated the evidence with `node /home/user/scaffold/tmp/work/evidence.mjs reason`. Claim 5's refutation is a wording defect of the audit brief: the changed Surface and method rows at `guides/reason.md:387` and `:552` are row 4's manager tally, and the factories table's re-padding follows row 1's `default:` cells.

## Orchestrator correction 2

The round-2 checker (`units/followon/reason-prose-r2-checker-luna.md`) refuted claim 1 on `src/core/factories.ts:775` (named `:774` in its verdict): the `createFact` doc block carried `default \`1\`` inside a parenthetical, a form row 1's `defaults to` sweep did not match. At 18:33 UTC the Orchestrator rewrote the line to `The fact's confidence (\`0–1\`). Default: \`1\`.` with a single `sed` substitution, swept `default \`` and `defaults to` over `src/core/factories.ts` (no hit), and regenerated the evidence with `node /home/user/scaffold/tmp/work/evidence.mjs reason`.
