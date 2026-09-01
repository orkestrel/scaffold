# U3f checker report (checker / Sonnet; immutable)

**Verdict: FAIL**

1. No inline `readValue(() => readPattern` outside the helper and `matchOf` — met (`helpers.ts:655` inside `ownPattern`; `combinators.ts:990` inside `matchOf`, no `context`).
2. Helper exported with a `{verb}{Noun}` name and full TSDoc; barrel untouched — met (`helpers.ts:654`; `index.ts:4` star export; `index.ts` absent from status).
3. Call sites pass their own reader names — met (`ContractCompiler.ts:1440` `compileAuditor`, `:1757` `compileReporter`; `combinators.ts:1037` `stringOf`).
4. `createStringFaults` TSDoc and guide row carry the prerequisite, failure behaviour, `limit` source, and qualified `lastIndex` clause; guide gains a row beside `readPattern` — met.
5. Auditor leaf comment carries the corrected clause — met (`ContractCompiler.ts:1436`).
6. Read-count pin and refusal-and-stateless pin present; U3 pins retained; no pre-existing test edited — met (`helpers.test.ts:3288`, `:2979`, `:3214`, `:3249`, `:3259`; `compilers.test.ts:3919`, `:3934`; additive hunks only).
7. Names and forbidden syntax; writing rules on added prose — **not met**: `src/core/helpers.ts:1996` (new comment) uses `below` as a cross-reference (`.claude/rules/writing.md` § Code tokens). No `any`, `as`, non-null assertion, `@ts-`, or `eslint-disable` in the changed files. Re-dispatch: replace `below` in `// Whatever arrives is what decides the match and names the \`limit\` below,` with a form naming the referent directly.
8. Scope honesty — met (six owned files; `types.ts` and `index.ts` absent).
9. Guide parity — met on the touched rows; no other row's content moved beyond re-padding.

Referrals: none.
