# Unit nested-1 — admit a callback inside an object or array literal in `no-nested-functions`

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration. The Orchestrator reads `git status --porcelain` after the run.

## Objective

Make the vendored `policy/no-nested-functions` rule in `configs/policy.ts` admit a function expression that sits in a callback position through object and array literals, so an event-map option such as the following passes in every target, while a function declaration or a function bound to a local name inside a body stays reported; land the same admission in the law sentences, with controls for each direction.

```ts
createSomething({
	on: {
		thing: function that() {
			console.log('that thing')
		},
		other: () => {
			console.log('this other')
		},
	},
})
```

## Context

- **Evidence.** The user's report (2026-09-30): in an application tree, every function placed as a property value of an object literal passed to a factory, an event map option in particular, was reported by this rule. `configs/policy.ts:517-551`: `isPolicyAnonymous`, `functionToPolicyPosition` (climbs `ParenthesizedExpression` only), `isPolicyCallback` (anonymous, and the climbed position is a direct argument of a call or `new`), `isPolicyResult` (anonymous, and the climbed position is a `ReturnStatement` argument or an arrow body); `:553-563` `isPolicyMethod`; `:569-582` `hasPolicyFunctionAncestor`; `:585-` `isPolicyVisitor` (the sanctioned visitor-table arrow: a property value of an object returned from `create`); `:850-862` `reportNested`; `:1057-1076` `NESTED_RULE` and its message. `tests/config.test.ts:993-1077`: the rule's tester block with its valid and invalid cases, including `rejects a named function expression argument` at `:1057-1061`; `:2024` expects `policy(no-nested-functions)` on `src/violations/fixture.ts` in the lint-population proof, whose sample is the inline line at `:1910` (`function OuterFunction() { const nested = () => undefined; return nested() }`, a local binding, which the ruling keeps reported). `.claude/rules/patterns.md` § Stateful emitters prescribes `on?: EmitterHooks<EventMap>`, an object literal of listeners, so the law and the instrument contradict the prescribed pattern today. Law sentences: `AGENTS.md:60` ("No nested functions, except an anonymous callback passed as an argument or returned as the result"), `.claude/rules/architecture.md:169` (the same with "directly"), `.claude/rules/workspace.md` § Policy instruments (the sentence naming the visitor-table arrow as "the sanctioned exception to the in-body function-expression limits"), `.agents/skills/orkestrel-harden/references/centralization.md:31-32`.
- **Ruling.** Position decides, not the name. A function expression, arrow or `function`, anonymous or named, is admitted when its climbed position is a direct argument of a call or `new`, a `ReturnStatement` argument, or an arrow body, where the climb passes through `ParenthesizedExpression`, through an `init`, non-method `Property` whose `value` is the position to its `ObjectExpression`, and through an `ArrayExpression` whose `elements` include the position, any number of times in any order. A named function expression binds its name inside itself only, so it declares nothing in the enclosing body. A function reached through a `SpreadElement`, a computed key, a getter, a setter, a method property, a class field, an assignment, or a variable initializer stays reported. The visitor-table arrow is a returned object member, so `isPolicyVisitor` is subsumed: delete it and the sentence that names it as an exception.
- **Law.** `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md` (`is*` total; `*To*` projection), `.claude/rules/architecture.md` (the wrapper test; `configs/policy.ts` is an import-free leaf vendored byte-identical, `.claude/rules/workspace.md:70-76`), `.claude/rules/tests.md` (controls from outside the population; a case per direction), `.claude/rules/writing.md` § Instruction files and § Substitutions for every sentence you change.
- **Host.** Windows 11, Node 24; `node_modules` installed. Never commit; never install. `host.json` is the vendored-file inventory and `npm run build` regenerates it through `build:host`.

## Unknowns

- Whether the Oxlint AST exposes `Property.kind`, `Property.method`, and `Property.computed` as `isPolicyMethod` already reads them (it reads `kind` and `method`); confirm `computed` from a tester case before relying on it.

## Scope

- **Owned.** `configs/policy.ts`, `tests/config.test.ts` (the `no-nested-functions` tester block only), `AGENTS.md:60`, `.claude/rules/architecture.md:169`, `.claude/rules/workspace.md` (the one visitor-exception sentence), `.agents/skills/orkestrel-harden/references/centralization.md:31-32`, `host.json` (regenerated, never hand-edited).
- **Shared (report-only).** `.oxlintrc.json`, `guides/scaffold.md`, `ROADMAP.md` item 9 (the rule's reach over the test corpus; out of scope).
- **Off-limits.** `src/**`, every other test, `.orkestrel/**`, `.claude/rules/*` beyond the two named sentences, every skill beyond the named reference, the veneer checkout.
- **Made false by this change.** "anonymous" as a condition of the admission; `isPolicyVisitor` and the "sanctioned exception" sentence; the invalid case `rejects a named function expression argument`.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json configs tests/config.test.ts`, `npm run test:config`, `npm run test:policy`, `npm run build`, `npm run lint:check`. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

1. `configs/policy.ts`: give `functionToPolicyPosition` the ruled climb (rename it only if its TSDoc can no longer describe it; `expressionToPolicyPosition` is acceptable) and update its TSDoc; drop the anonymity test from `isPolicyCallback` and `isPolicyResult` and update their TSDoc; delete `isPolicyVisitor` and its call in `reportNested`; delete `isPolicyAnonymous` if nothing else reads it (grep first); rewrite the `nested` message to name the admitted positions ("a callback passed as an argument or returned as the result, directly or as a member of an object or array literal in that position") and the `docs.description` to match. Keep the file import-free.
2. `tests/config.test.ts`: add valid cases for the user's example verbatim (two levels of object literal in a call argument, one named `function` and one arrow), an array element in a call argument, an object member in a `ReturnStatement`, an object member in an arrow body wrapped in parentheses, and a parenthesized member in a `new` argument; move `rejects a named function expression argument` to valid as `accepts a named function expression argument`; keep every other invalid case; add invalid controls for an object literal bound to a local name and then passed (`const options = { on: { thing: () => 1 } }; return create(options)`), a spread element (`create({ ...{ thing: () => 1 } })`), a computed key (`create({ [key]: () => 1 })`), a getter property holding a nested binding, and a nested binding inside an admitted member's body (`create({ on: { thing: () => { const read = () => 1; return read() } } })`, reporting the inner binding only); replace the sanctioned-visitor valid case's name with one that states the returned-member admission, keeping its code.
3. Confirm the lint-population sample at `tests/config.test.ts:1910` stays reported after the change (it is a local binding); change nothing there.
4. The four law sentences: `AGENTS.md:60` becomes "**No nested functions**, except a callback passed as an argument or returned as the result, directly or as a member of an object or array literal in that position."; `.claude/rules/architecture.md:169` states the same admission with the climb named (parentheses, object-literal property values, array elements) and the refusals (spread, computed key, accessor, method, class field, assignment, local binding); `.claude/rules/workspace.md` loses the "sanctioned exception" sentence and states that the visitor table is a returned object literal whose members are callbacks; `centralization.md:31-32` reads "A callback passed to another operation or returned from it, directly or inside an object or array literal in that position, stays a callback, not a hidden helper declaration." Sweep each for the substitution table.
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json configs tests/config.test.ts`, `npm run test:config`, `npm run test:policy`, `npm run build`, `npm run lint:check` (the tree-wide lint, because the rule's own admission changes what the tree reports; read it bare).

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/nested-1-report.md` with: the files changed; each predicate changed or deleted with one line; the tester's valid and invalid counts before and after; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the Oxlint AST lacks a field the climb needs, when `npm run lint:check` reports a nested-function hit the ruling does not cover, when a gate refuses the tree, or when a change needs a file outside the owned set.

## Acceptance criteria

1. The user's example, placed in a function body, passes the tester; a local binding, a declaration, a spread, a computed key, an accessor body, and a nested binding inside an admitted member still fail it.
2. `tsc`, scoped lint, scoped format, `test:config`, `test:policy`, `build`, and `lint:check` exit 0.
3. `git status --porcelain` lists only owned files; `host.json` differs only in the inventory rows for `configs/policy.ts`.

**Observations, not criteria.** `ROADMAP.md` item 9 stays open.

## Review evidence

The diff and `git status --porcelain`; the report file.
