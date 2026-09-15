<!-- checker on Sonnet, native, read-only; returned 2026-09-14 ~20:26Z; immutable blind verdict copied verbatim from the returned text -->

Lane: mechanical (checker, Sonnet)

1. CONFIRMED. `src/core/types.ts:2144-2253` adds exactly the members of the ruled contract member for member; every interface member is `readonly`. Attacked: swept the whole diff for `: any`, type-assertion `as` other than `as const`, non-null `!`, suppression directives, and access modifiers — none found.

2. Structural seam split CONFIRMED; completeness UNRESOLVED. `AgentProvider.ts:66-86` declares exactly `name`, `frame`, `body`, `read`, `finish` as abstract; every other mechanic lives in the base body. The fixture `ScriptedWire` (`tests/setup.ts:1082-1117`) overrides only those five. "Nothing a subclass must do is missing" is a design-sufficiency judgment for the other lanes.

3–15. UNRESOLVED for this lane — each requires driving the real async generator under timing, cancellation, and interleaving; claim 14's mechanical half: `tests/src/core/shapers.test.ts:5-20` asserts `expectTypeOf<Infer<typeof …Shape>>().toExtend<…>()` for all four shapes, typechecked by `npm run check` (the Orchestrator's run, not this lane's).

16. CONFIRMED. `Agent.ts:365` `let thinking: string | undefined`; its two `joinThinking` call sites (`:481` gated by `partial.thinking !== undefined`, `:509` gated by `result.thinking !== undefined && length > 0`) never pass `''`. The only pre-existing expectation the diff changes besides the `joinThinking('', 'next')` case is `validators.test.ts:2051-2053` (`role: 'developer'` flips to false).

17. CONFIRMED. `AgentProvider.ts` holds imports and one abstract class; only allowed in-body function expressions; `shapers.ts` holds five `*Shape` constants; `contracts.ts` four compiled contracts; `index.ts:4-8` re-exports them; TSDoc first sentences are third-person `-s` verbs not repeating the symbol; no dependency symbol re-exported.

18. Discovery and no-skip CONFIRMED; red-then-green UNRESOLVED (requires reverting guarded lines and re-running). New files match `srcCore` and `setup` includes; no `.skip`, `.todo`, `xit`, `xdescribe` in the diff.

19. CONFIRMED. `generate` drains `stream` through explicit `next()`; no `request` hook; no public `request` member; `body` returns `object`; `split`, `strict`, `url`, `path` are constructor input; `name`, `frame`, `body`, `read`, `finish` are abstract — the reconciliation's row-1 shape.

Findings outside the claims: none substantiated by this lane.

Attacked and held: the forbidden-syntax sweep (1), the barrel-reachability and TSDoc-voice sweep (17), the skip/todo sweep (18), each over the complete diff.

VERDICT: FAIL 3,4,5,6,7,8,9,10,11,12,13,14 (partial),15,18 (partial); outside the claims: none — every claim this lane could not mechanically settle is recorded UNRESOLVED, not a defect finding.
