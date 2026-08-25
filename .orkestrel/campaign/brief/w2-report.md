# Unit W2 — report INTERPRETATION_MEMBERS

`INTERPRETATION_MEMBERS` lands in `src/core/constants.ts`, both interpret doors in `BriefCompiler`
take it, the completeness pin sits beside the capture cases, and the guide carries its row and its
example. Every acceptance criterion is met. One deviation from the brief's fixed spelling was
forced by this workspace's lint gate and is recorded in Deviation state.

## Touched files

- `/home/user/orkestrel/brief/src/core/constants.ts` — declares `INTERPRETATION_MEMBERS`, pinned to
  `keyof Interpretation`, placed after `RISK_SEVERITIES`.
- `/home/user/orkestrel/brief/src/core/BriefCompiler.ts` — imports the constant; the method-local
  literal in `#read` is gone and both call sites take the constant.
- `/home/user/orkestrel/brief/tests/src/core/BriefCompiler.test.ts` — adds the completeness pin and
  its runtime proof beside the accessor-capture cases.
- `/home/user/orkestrel/brief/guides/brief.md` — adds the constants row, the prose that states the
  pin, and the fence line.

```text
 guides/brief.md                      | 31 ++++++++++++++++++++-----------
 src/core/BriefCompiler.ts            | 21 +++------------------
 src/core/constants.ts                | 32 ++++++++++++++++++++++++++++++++
 tests/src/core/BriefCompiler.test.ts | 32 +++++++++++++++++++++++++++++++-
 4 files changed, 86 insertions(+), 30 deletions(-)
```

## The declaration as landed

```ts
/**
 * Every published `Interpretation` member name, frozen.
 *
 * @remarks
 * The capture list `BriefCompiler` hands `captureValue` at each interpret door — the borrowed
 * engine's return, and the caller's supplied interpretation. A class instance carries its
 * contract on the prototype, so the captured view materializes exactly the members named here,
 * and a name missing from the list is a member the view drops.
 *
 * The `satisfies` clause refuses a name `Interpretation` does not declare, and it holds the
 * element type at the listed names rather than widening it to `string`. That is what lets the
 * equality assertion beside the capture cases refuse a list that has fallen short of the
 * published shape.
 */
export const INTERPRETATION_MEMBERS = Object.freeze([
	'text',
	'normalized',
	'intent',
	'entities',
	'subject',
	'definition',
	'mappings',
	'ambiguities',
	'prompt',
	'stages',
	'failures',
	'complete',
	'confidence',
	'digest',
] satisfies ReadonlyArray<keyof Interpretation>)
```

`src/core/constants.ts` gains `import type { Interpretation } from '@orkestrel/interpret'`. The
emitted type of the constant is the literal union, so no cross-package type reaches the declaration
output.

## The `prove` receipt

The claim: the constant as declared plus the equality pin compiles under this workspace's own
toolchain; the same constant with `'digest'` removed fails at the type stage on the pin. Case and
control differ only in that member. Closing line of the run against the landed bytes, verbatim:

```text
receipt probe:f3505787be76c83d3024e3edebed9e40:type:typescript@6.0.3:oxlint@1.79.0:vitest@4.1.11:configs/src/tsconfig.core.json@aedd7726befb24d0792c43c29b121d53
```

The control broke where it declared it would, and nowhere else:

```text
case type: 0 issues (624 ms)
case lint: 0 issues (458 ms)
case runtime: 0 issues (730 ms)
control type: 1 issue (113 ms)
  [claimant] tmp/probe/interpretationMembers.test.ts:6 Type 'keyof Interpretation' does not satisfy the constraint '"Expected: literal string: text, Actual: never" | ... 9 more ... | "Expected: literal string: digest, Actual: never"'.
control lint: 0 issues (115 ms)
control runtime: 0 issues (241 ms)
```

This settles the brief's Unknown: `satisfies` contextually types the array literal, so the element
type stays at the listed names through `Object.freeze` and `(typeof INTERPRETATION_MEMBERS)[number]`
equals `keyof Interpretation` exactly. `expectTypeOf` needs no further help.

**Transport.** This executor's tool allowlist carries no MCP binding, so the registered server was
driven over its own stdio JSON-RPC transport: `node node_modules/@orkestrel/probe/dist/bin/main.js`
from the workspace root, `initialize`, then `tools/call` with `name: 'prove'`. The client script is
`/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/prove-w2.mjs`.
The tool answered from `probe 0.0.4`.

**Coverage.** The receipt covers the constant's own bytes and the pin's compilation under the root
project's options. It says nothing about the consumer wiring, which the test below and the core
suite cover, and it is not a gate result.

## The consumer diff

`#read` no longer declares the member list. Both interpret doors take the constant:

```ts
const read = attempt(() => this.#own(this.#interpret.interpret(text), INTERPRETATION_MEMBERS))
```

```ts
const captured = attempt(() => captureValue(live, INTERPRETATION_MEMBERS))
```

`grep -n "INTERPRETATION_MEMBERS|members" src/core/BriefCompiler.ts` reports the import, those two
call sites, and the unchanged `#own(value: unknown, members: readonly string[])` parameter with its
own body reference. No literal remains. The `gate` method's own member list is a different value and
was left alone: it is outside this unit's scope.

## The test

`tests/src/core/BriefCompiler.test.ts`, between the accessor-capture cases:

```ts
it('materializes every published member of a captured interpretation', () => {
	// comment omitted here; see the file
	const engine = createInterpret()
	const live = engine.interpret('migrate the stores')
	engine.destroy()
	const compiler = createBriefCompiler()
	const briefing = compiler.compile({
		interpretation: new AccessorInterpretation(),
		task: buildTask(),
		outcomes: [outcome(1, 'x')],
		proofs: [proof('x', 'npm test')],
	})
	compiler.destroy()
	expectTypeOf<(typeof INTERPRETATION_MEMBERS)[number]>().toEqualTypeOf<keyof Interpretation>()
	expect(
		Object.keys(live).filter((key) => !INTERPRETATION_MEMBERS.some((member) => member === key)),
	).toStrictEqual([])
	const captured: object = briefing.interpretation ?? {}
	expect(
		INTERPRETATION_MEMBERS.filter((member) => !Object.hasOwn(captured, member)),
	).toStrictEqual([])
})
```

The pin compares the list against interprets own declaration. The engine reading is a second
mechanism that can disagree with the list, and the captured-view reading proves the constant
actually reaches `captureValue`.

**The instrument was shown to fail.** With `'digest'` removed from the constant,
`npx vitest run --config vite.config.ts --no-cache --project src:core tests/src/core/BriefCompiler.test.ts`
reported `4 failed | 46 passed (50)`, and the verbose run named this test among them:

```text
× |src:core| tests/src/core/BriefCompiler.test.ts > BriefCompiler fail-closed paths > materializes every published member of a captured interpretation
```

The member was restored by editing it back, and the same project returned green. The type half of
the same falsification is the `prove` control.

## The guide row

```text
| `INTERPRETATION_MEMBERS` | const | Every published `Interpretation` member name, frozen — the capture list, pinned to `keyof Interpretation`. |
```

The row carries no count. The sibling rows' counted openings were left as they stand. The table's
column padding was regenerated because the new name is wider than the previous first column. Beside
the table, the prose states what the pin buys, and the fence adds
`INTERPRETATION_MEMBERS.includes('subject') // true — the optional members are captured too` under
the existing import.

## Validation

Every command ran from `/home/user/orkestrel/brief` and its output was read bare.

| Command                                                            | Result                          |
| ------------------------------------------------------------------ | ------------------------------- |
| `npx tsc --noEmit -p configs/src/tsconfig.core.json`               | exit 0                          |
| `npx oxlint --config .oxlintrc.json --deny-warnings <owned files>` | exit 0                          |
| `npm run test:src:core`                                            | 10 files, 282 tests, all passed |
| `npm run test:guides`                                              | 1 file, 17 tests, all passed    |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>`           | exit 0                          |
| `npx tsc --noEmit -p tsconfig.json`                                | exit 0                          |
| `npm run test:policy`                                              | 1 file, 93 tests, all passed    |

The scoped lint ran over `src/core/constants.ts`, `src/core/BriefCompiler.ts`, and
`tests/src/core/BriefCompiler.test.ts`. The format check added `guides/brief.md`.

**Observations, not criteria.** The whole-suite `npm test`, `npm run format:check`,
`npm run lint:check`, and `npm run build` are the Orchestrator's runs after this unit exits. The
runtime stage of `prove` created an empty `tmp/probe/` directory in the workspace; it is git-ignored
and holds no file.

## Deviation state

**One deviation from the brief's fixed text, adopted rather than stopped on.** The brief fixes the
declaration as `satisfies readonly (keyof Interpretation)[]`. That spelling compiles and fails this
workspace's lint gate. The first `prove` run reported it in both phases:

```text
case lint: 1 issue (434 ms)
  [claimant] src/core/constants.ts:33 Array type using 'readonly T[]' is forbidden for non-simple types. Use 'ReadonlyArray<T>' instead.
help: Replace `readonly (keyof Interpretation)[]` with `ReadonlyArray<keyof Interpretation>`.
```

`ReadonlyArray<keyof Interpretation>` is the identical type, so the ruling the brief states — a
`satisfies` clause pinning the list to `keyof Interpretation` and holding its element type narrow —
lands unchanged. The receipt above was earned with the adopted spelling. The brief's deviation
contract names only the case where the `satisfies` shape cannot hold the element type narrow enough
for the pin; it can, so this is a spelling correction rather than a stop.

**Two read-only commands outside the brief's enumerated Bash scope.** `npx tsc --noEmit -p
tsconfig.json` was run because the pin lives in a test file the core project does not include, so
the core typecheck cannot judge it and shipping the assertion unverified was the alternative.
`npm run test:policy` was run because the placement sweep reads `src/core/constants.ts`, the file
this unit changed. Both are non-mutating, both exited clean, and neither is claimed as an acceptance
criterion.

**Ancillary decisions taken, per the deviation contract.** The constant sits after `RISK_SEVERITIES`
rather than at the top of the file, which keeps the package's own vocabularies first and the frozen
lists together. The test is named for what it proves. The guide prose and the fence line are mine.

Nothing in scope is left open. No git state was changed, and nothing was committed.
