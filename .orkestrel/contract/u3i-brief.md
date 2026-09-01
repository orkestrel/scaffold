# U3i brief — read-count prose, the supplied-rebuild pin, and the census recast (fix round after U3 audit round 2)

## Role and engine

`builder` on Sonnet, native Claude subagent, the sole serial writer in `/home/user/contract`. Perform the assignment directly and spawn nothing. Every edit is specified as exact text; make no other change and take no design decision.

## Objective

Land the round-2 findings the Orchestrator adopted (`.orkestrel/contract/u3-audit-verdict.md` § Round 2): state the helper's read count as the accessor answers it, pin the supplied-rebuild promise with a counting accessor, and recast the export census from a remembered number to a derived property.

## Context

- Repository `/home/user/contract`, branch `claude/method-memoization-contracts-yus26p`, HEAD 163490f; seven files are already modified (the U3 tree) and stay so — never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, and never commit.
- Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/writing.md`, and `/home/user/scaffold/.claude/rules/documentation.md` before editing. Skill: none.
- Findings carried, each from `u3-audit-subjective-round2.md`: claim 3 (items 1 to 3), F1 (item 4), F2 (items 5 to 8). Their falsifying inputs are reproduced in `u3-f1-mutation.out` and `census-derived-u3final.out` (`rows=217 plain=218 classes=5`: the barrel exports `ContractCompiler` as a sixth class, which the census loop in the test omits; with it counted, exported plain functions and corpus rows are equal).
- Run every command from `/home/user/contract` with an explicit `cd /home/user/contract &&` prefix; the working directory does not persist between Bash calls.
- Prettier does not reflow comments: keep every comment and TSDoc line within the width its neighbours use (about 80 columns, tab-indented).

## Scope

Owned: `src/core/helpers.ts` (the `createStringFaults` TSDoc lines named in item 1 only), `guides/contract.md` (the `createStringFaults` row sentence in item 2 and the census sentences in item 5 only), `tests/src/core/helpers.test.ts` (item 3 title and the item 4 insertion only), `tests/src/core/integration.test.ts` (items 6 and 7), `tests/setup.ts` (the TSDoc lines in item 8 only). Off-limits: every other line and every other file, including `src/core/types.ts`, `src/core/index.ts`, and `src/core/ContractCompiler.ts`. Allowed tools: Read, Grep, Glob, Edit, Bash for the commands in § Acceptance criteria. No tree-wide `format` or `lint --fix`.

## Edits

1. `src/core/helpers.ts`, the `createStringFaults` TSDoc (near line 1929). Replace the sentence

   ```
    * it on each answer. The `limit` text is read from the applied rebuild, so it
    * names the pattern that decided the match; the shape's `pattern` is read once
    * per call for that rebuild.
   ```

   with

   ```
    * it on each answer. The `limit` text is read from the applied rebuild, so it
    * names the pattern that decided the match. Left to rebuild, the helper asks
    * the shape's `pattern` accessor twice per call: once for the presence test
    * that decides whether a pattern was declared at all, and once for the rebuild
    * that both decides the match and names the `limit`.
   ```

2. `guides/contract.md`, the `createStringFaults` row (line 598). Replace the sentence `The \`limit\` text is read from the applied rebuild, so it names the pattern that decided the match; the shape's \`pattern\` is read once per call for that rebuild.` with `The \`limit\` text is read from the applied rebuild, so it names the pattern that decided the match. Left to rebuild, the helper asks the shape's \`pattern\` accessor twice per call: once for the presence test that decides whether a pattern was declared at all, and once for the rebuild that both decides the match and names the \`limit\`.` Change nothing else in the row; the table's column padding may be re-aligned by `npm run format` on that file only if `format:check` demands it.

3. `tests/src/core/helpers.test.ts` line 3288: rename the test from `reads a hand-rolled shape's pattern accessor once per call for the rebuild that also names the limit` to `reads a hand-rolled shape's pattern accessor twice per call, for the presence test and for the rebuild that names the limit`. Its body is unchanged.

4. `tests/src/core/helpers.test.ts`: insert the following `it` block immediately after the block renamed in item 3 (that block ends with the line `\t})` at line 3321, still inside `describe('createStringFaults')`), separated by one blank line:

   ```ts
   	it('answers from a supplied rebuild without asking the shape for its pattern', () => {
   		// A counting accessor is the only instrument that separates applying the
   		// supplied rebuild from rebuilding out of the shape regardless: the reports
   		// are identical either way, so only the read count binds the promise.
   		let reads = 0
   		const shape: StringShape = {
   			type: 'string',
   			get pattern() {
   				reads += 1
   				return /^[0-9]+$/
   			},
   		}
   		const supplied = createStringFaults(shape, 'abc', [], readPattern(/^[0-9]+$/))

   		expect(supplied).toEqual([
   			{
   				reason: 'constraint',
   				path: [],
   				expected: 'string',
   				constraint: 'pattern',
   				limit: '^[0-9]+$',
   				received: '"abc"',
   			},
   		])
   		expect(reads).toBe(0)

   		// Control: the omitted form asks the same accessor, so a count that stayed
   		// at zero is the supplied rebuild being applied rather than an accessor
   		// that cannot count.
   		expect(createStringFaults(shape, 'abc', [])).toEqual(supplied)
   		expect(reads).toBe(2)
   	})
   ```

5. `guides/contract.md` line 256 (the membership paragraph). Replace the text from `That last population is **217 rows**, not none:` through `so the next export that moves this number fails a test instead of quietly falsifying this paragraph.` (the end of the paragraph) with:

   `That last population is not empty: an earlier sentence here said it was "empty, because each of those classes pins its prototype while it is defined", which ran a true claim about the CLASSES together with a false one about the population. The rule draws from every exported callable, and an ordinary exported FUNCTION's \`.prototype.constructor\` is writable and always will be — so the corpus is one row per exported plain function and zero rows per exported class. The sweep asserts what it always asserted, that no door consults any of them. The suite pins the corpus's composition against the barrel rather than against a remembered number: every exported plain function contributes exactly one row, every row is a \`.prototype.constructor\`, and no exported class contributes any, so an export that changes the population is derived by the test instead of copied into this paragraph. A count stated here drifted for a round after further functions were exported, which is why no number stands here.`

   Leave every other sentence of the paragraph as it is.

6. `tests/src/core/integration.test.ts`, the named import from `'@src/core'` (lines 12 to 57): add `ContractCompiler,` in alphabetical position (after `ContractError,`; the file's import is sorted case-insensitively — place it where `npm run lint:check` accepts it, and report the position).

7. `tests/src/core/integration.test.ts`, the test `documents its own composition, because a round asserted this corpus was empty` (line 955 onward). Replace the comment block that begins `// The SIZE, not just the shape.` and the line `expect(OWNED_MEMBERS.length).toBe(217)` (lines 962 to 967) with:

   ```ts
   		// The COMPOSITION, not a remembered size. A literal here went stale for a
   		// round after further functions were exported, and the guide's copy of the
   		// same number drifted with it: a count nobody derives is a count that
   		// drifts. Derive it instead. Every exported plain function — every exported
   		// function that is not one of the package's classes — contributes exactly
   		// one row, so the corpus is as large as that set and no larger.
   		const owners = [ContractCompiler, JSONCloner, SchemaCloner, ShapeCloner, ShapeValidator, ContractError]
   		const plain = captured.names(core).filter((name) => {
   			const exported: unknown = captured.get(core, name)
   			return typeof exported === 'function' && !owners.some((owner) => owner === exported)
   		})
   		expect(OWNED_MEMBERS.length).toBe(plain.length)
   ```

   and change the loop that follows from `for (const owner of [JSONCloner, SchemaCloner, ShapeCloner, ShapeValidator, ContractError]) {` to `for (const owner of owners) {`. `core` is the barrel namespace: add `import * as core from '@src/core'` beside the file's other imports from `'@src/core'` (precedent: `tests/src/core/compilers.test.ts` carries a namespace import beside named imports from the same module). If the type checker rejects `owner === exported`, stop and report the diagnostic verbatim; do not widen the types.

8. `tests/setup.ts`, the TSDoc over `OWNED_MEMBERS` (lines 784 to 789). Replace

   ```
    * — but the corpus it sweeps is 213 rows, not none, and
    * `documents its own composition` in the integration suite pins both that shape
    * and that size. The size pin is the later repair: this number read 205 for a
    * round after eight more functions were exported, because the suite asserted
    * only that the corpus was non-empty and constructor-shaped, and a count nobody
    * asserts is a count that drifts.
   ```

   with

   ```
    * — but the corpus it sweeps is not empty, and `documents its own composition`
    * in the integration suite pins its composition against the barrel: one row
    * per exported plain function, derived from the exports rather than remembered
    * as a number, because a remembered count drifted for a round after further
    * functions were exported and nobody's assertion noticed.
   ```

## Acceptance criteria (cheap first)

1. `npm run format:check` exits 0 (run `npm run format` on an owned file only if it fails there, then re-run the check).
2. `cd /home/user/contract && npm run lint:check` exits 0.
3. `cd /home/user/contract && npm run check` exits 0.
4. `cd /home/user/contract && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` reports 235 passed (the tree had 234).
5. `cd /home/user/contract && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/integration.test.ts tests/src/core/compilers.test.ts` reports every test passed (the tree had 74 and 259).
6. `cd /home/user/contract && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` reports every test passed (the tree had 65).
7. `git -C /home/user/contract diff -U0 | grep -c '^+.*\b\(above\|below\)\b'` reports 0, and the added prose carries no `should`, `simply`, `easy`, `just`, `currently`, `now`, `via`, `e.g.`, `i.e.`, or `etc.`.

Observation, not a criterion: the Orchestrator re-runs the F1 mutation (`u3-f1-mutation.out`) after you exit and expects the new pin to be the one test that fails under it.

## Output

Write `/home/user/scaffold/tmp/units/u3i-report.md` with: each item done or not done with its file:line; the alphabetical position chosen in item 6; the exact output lines of criteria 4 to 6 (the `Tests` summary line); any deviation; and a `Flagged:` line naming any claim of yours you could not verify.

## Deviation contract

A conflict with an item's exact text (the target text is absent, or a criterion fails after the edit) stops the unit: report expected, found, exact evidence, done or not done, and at most one hypothesis. Where a comment line must wrap differently to stay within the file's width, wrap it and record the wrap in the report.
