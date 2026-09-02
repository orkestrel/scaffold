# Report — unit interpret-fixup (implementer, Opus 5; Sol dark)

Every finding closed, no deviation. Finding 1 (one word for the registry act): the act reads
"added" at `guides/interpret.md:7,318,759-761,791,804-806,819,831-833,855`, `README.md:6`,
`src/core/Interpret.ts:52,370-371,402` (message now `'No added template matched the classified
intent'`), `src/core/types.ts:8,52,149`, `src/core/helpers.ts:386,661,669`,
`tests/src/core/factories.test.ts:79`; `registry` kept as the collection noun everywhere else;
`tests/src/core/Narrator.test.ts:116` (a supplied formatter, a different act, off-limits to the
unit) returned as a patch and applied by the Orchestrator before landing. Finding 2: the
`{field}.{index}` remark at `src/core/types.ts:100-110` and `src/core/stages/Clarifier.ts:38-45`
state the known-length reach; the `ComputedField` row (`guides/interpret.md:79`), the `clarify`
row (`:567`), and a new `ClarifierInterface` fence (`:596-635`) carry the convention and the
limit. Finding 3: precedence stated at `types.ts:106-109` and `Clarifier.ts:155-158`. Finding 4:
`guides/interpret.md:906-910`. Finding 5: `types.ts:605,611`, `guides/interpret.md:118`. Finding
6: `tests/src/core/validators.test.ts:536`. Finding 7: `README.md:76`; the same stale
`guides/src/` path at `src/core/types.ts:433` (the vendored template mirror's path) closed too.
Finding 8: the three import lists sorted. A causal `since` at `guides/interpret.md:232` closed
under finding 5's class.

Probes against the built `dist/src/core/index.js` (retained as
`interpret-fixup-probe-clarify.mjs` and `interpret-fixup-probe-collision.mjs`): a computation over
`value.0` and `value.1` against `[2, 3]` lands `total: 5`, and one naming `value.2` lands no
`total`; with an array entity and a scalar mapped to `['value', '0']`, `value.0` reads whichever
entity comes later in the loop — the precedence the remark states.

No test named the runtime message before the change, so its edit reddened nothing; the
remaining findings are prose, fixture, link, and import-order rulings with no defect
reproduction.

Gates: lint 0 and format 0 to converge; format:check 0, lint:check 0, check 0, build 0, test 0
(src 281, policy 111, config 46, setup 30, guides 73). Diffstat: eleven files, the guide's
count dominated by table re-padding. `git status --short`: owned files only.

Observations outside scope: `via` at `src/core/stages/Clarifier.ts:35`, `e.g.` at
`src/core/types.ts:425,427`, and `...` in the pre-existing fence at `guides/interpret.md:593`.
