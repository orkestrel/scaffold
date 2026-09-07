# Report — `d7n-contract-converge-fix`

Every item landed and every acceptance criterion is green. No deviation stopped the unit. The
titled fence's value claims all proved true when executed, so Ruling 14 never fired.

Wall clock: first edit 2026-09-07 16:34:53 UTC, last gate 2026-09-07 16:44:01 UTC (reading of
`AGENTS.md`, the rules, the rulings, the verdict, and the pilot preceded the first edit).

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/contract/guides/contract.md` | Guard-table and interface `Shape` cells rewritten to Ruling 12, both convention sentences to Ruling 15, the `### Classes` introduction, the compiler-surface sentence, the combinator-bound sentence, and one capitalized word |
| `/home/user/fleet/contract/src/core/types.ts` | Cloner interface descriptions rewritten to the contract they define; the `ContractCompilerInterface` remark's count and capitals made plain |
| `/home/user/fleet/contract/src/core/validators.ts` | The container-only remark moved from `isArrayBuffer` to `isArray` |
| `/home/user/fleet/contract/src/core/combinators.ts` | Capitalized emphasis in the `instanceOf`, `orOf`, `notOf`, and `complementOf` remarks made plain |
| `/home/user/fleet/contract/src/core/helpers.ts` | Capitalized emphasis in the `matchesMember` and `drawRandom` remarks made plain |
| `/home/user/fleet/contract/src/core/shapers.ts` | Capitalized emphasis in the `numberShape` remark made plain |
| `/home/user/fleet/contract/tests/guides.test.ts` | The pin restored to the pilot's guard-and-continue loop, the `INTERNAL` doc block to Ruling 13's wording, and the titled fence's executed case plus its presence guard added |
| `/home/user/fleet/contract/tests/setup.ts` | The `PatternFixture` description restated with the shape as its subject |

Diffstat (`git diff --stat`):

```text
 guides/contract.md      | 91 +++++++++++++++++++++++++------------------------
 src/core/combinators.ts | 10 +++---
 src/core/helpers.ts     |  4 +--
 src/core/shapers.ts     |  2 +-
 src/core/types.ts       | 12 +++----
 src/core/validators.ts  |  8 ++---
 tests/guides.test.ts    | 53 +++++++++++++++++++++++++---
 tests/setup.ts          |  2 +-
 8 files changed, 115 insertions(+), 67 deletions(-)
```

## Item 1 — the pin's canon form (C1)

`tests/guides.test.ts`, the pin block, now byte-identical to the pilot:

```diff
 	const titled = new Set(declared)
-	const fences = guide.fences()
-	const headings = fences.map((fence) => fence.title).filter((title) => title !== undefined)
-	const paired = fences.filter((fence) => fence.title !== undefined && titled.has(fence.title))
+	const headings: string[] = []
+	const paired: string[] = []
+	for (const fence of guide.fences()) {
+		if (fence.title === undefined) continue
+		headings.push(fence.title)
+		if (titled.has(fence.title)) paired.push(fence.title)
+	}
```

The pilot's `72-95` is contract's `90-113`, and the diff between them is empty (criterion 5).

Ancillary decision, recorded: the `INTERNAL` doc block also took Ruling 13's canonical text, because
the copy in the tree carried an ordinal and `below`, which `AGENTS.md` § Writing and
`.claude/rules/writing.md` § Code tokens, references, and links both refuse:

```diff
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
```

After it, the whole-file divergence from the pilot is the constants block, the imports, the
`30_000` budget, and this package's own runtime-parity and flagship-fence sections. No other hunk
remains.

## Item 2 — the guard table's `Shape` cells (C2)

Each cell now carries the narrowed type its declaration writes (`src/core/validators.ts`,
`isGeneratorFunction`, `isAsyncGeneratorFunction`, `isZeroArgGenerator`,
`isZeroArgAsyncGenerator`). No arm needed `\|` escaping, because none of the narrowings is a union.

```diff
-| `isGeneratorFunction`      | function | generator function                | …
-| `isAsyncGeneratorFunction` | function | async generator function          | …
-| `isZeroArgGenerator`       | function | zero-arg generator function       | …
-| `isZeroArgAsyncGenerator`  | function | zero-arg async generator function | …
+| `isGeneratorFunction`      | function | `(...args: unknown[]) => Generator<unknown, unknown, unknown>`      | …
+| `isAsyncGeneratorFunction` | function | `(...args: unknown[]) => AsyncGenerator<unknown, unknown, unknown>` | …
+| `isZeroArgGenerator`       | function | `() => Generator<unknown, unknown, unknown>`                        | …
+| `isZeroArgAsyncGenerator`  | function | `() => AsyncGenerator<unknown, unknown, unknown>`                   | …
```

The guard table's convention sentence is untouched.

## Item 3 — Ruling 12 in every interface row (C3)

`### Types`:

```diff
-| `Failure`                | interface | `{ success: false, error: E }` | …
-| `Success`                | interface | `{ success: true, value: T }`  | …
+| `Failure`                | interface | `{ success, error }`          | …
+| `Success`                | interface | `{ success, value }`          | …
```

`### Shape types`, each elided member read out of `src/core/types.ts:627-770`:

```diff
-| `StringShape`   | interface | `{ category: 'string', min?, max?, pattern?, … }`                     | …
-| `NumberShape`   | interface | `{ category: 'number', min?, max?, integer?, … }`                     | …
-| `BooleanShape`  | interface | `{ category: 'boolean', … }`                                          | …
-| `NullShape`     | interface | `{ category: 'null', … }`                                             | …
-| `LiteralShape`  | interface | `{ category: 'literal', values, … }`                                  | …
-| `ArrayShape`    | interface | `{ category: 'array', items, min?, max?, … }`                         | …
-| `ObjectShape`   | interface | `{ category: 'object', properties: P, additionalProperties?: A, … }`  | …
-| `UnionShape`    | interface | `{ category: 'union', variants, mode?, … }`                           | …
-| `OptionalShape` | interface | `{ category: 'optional', inner }`                                     | …
-| `NullableShape` | interface | `{ category: 'nullable', inner }`                                     | …
-| `JSONShape`     | interface | `{ category: 'json', … }`                                             | …
-| `RawShape`      | interface | `{ category: 'raw', schema }`                                         | …
+| `StringShape`   | interface | `{ category, min?, max?, pattern?, description? }`               | …
+| `NumberShape`   | interface | `{ category, min?, max?, integer?, description? }`               | …
+| `BooleanShape`  | interface | `{ category, description? }`                                    | …
+| `NullShape`     | interface | `{ category, description? }`                                    | …
+| `LiteralShape`  | interface | `{ category, values, description? }`                            | …
+| `ArrayShape`    | interface | `{ category, items, min?, max?, description? }`                  | …
+| `ObjectShape`   | interface | `{ category, properties, additionalProperties?, description? }`  | …
+| `UnionShape`    | interface | `{ category, variants, mode?, description? }`                    | …
+| `OptionalShape` | interface | `{ category, inner }`                                           | …
+| `NullableShape` | interface | `{ category, inner }`                                           | …
+| `JSONShape`     | interface | `{ category, description? }`                                    | …
+| `RawShape`      | interface | `{ category, schema }`                                          | …
```

Both convention sentences now carry Ruling 15's wording, with the resolver clause kept as the
second sentence of the `### Shape types` one:

```diff
-A `Shape` cell holds an interface's members in braces, and a type alias's value. A resolver
-whose value is a multi-branch conditional carries none, and its `Summary` states what the
-resolution produces.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an
+optional member and `plus` introducing its call-signature members, and a type alias's own type
+literal with a union's arms escaped as `\|`. A resolver whose value is a multi-branch
+conditional carries none, and its `Summary` states what the resolution produces.
```

No cell needed `plus`: every interface row in the file is data-only.

Deviation from the brief's citations, decided and recorded rather than stopped on: the brief places
the convention sentences at `:507` and `:697`. In the tree they sit at `:295` (`### Types`) and
`:473` (`### Shape types`), and `:697` is inside the `## Methods` introduction, which carries no
`Shape` convention. A grep for the phrase `cell holds` located them, and the resolver
clause the brief attaches to the second one is the one at `:473`, so the brief's intent maps onto
those two lines unambiguously.

## Item 4 — the cloner pairs (C4)

Each interface description now states the contract, and each class keeps the state sentence, the way
the `ShapeValidator` pair already differs:

```diff
-/**
- * Owns the state of one exact JSON snapshot operation.
+/**
+ * Settles one exact JSON snapshot of a retained source, then replays it.
-/**
- * Owns the state of one JSON Schema snapshot operation.
+/**
+ * Settles one JSON Schema snapshot of a retained schema, then replays it.
-/**
- * Owns the state of one contract-shape snapshot operation.
+/**
+ * Settles one contract-shape snapshot of a retained shape, then replays it.
```

`settle` is the term these blocks' own `@remarks` already use for terminal publication, so no
synonym entered. `npm run docs -- --to guide` carried the three cells; the class rows are unchanged.

## Item 5 — the `isArray` remark (C5)

```diff
 /** Determines whether a value is an `ArrayBuffer`.
- *
- * @remarks
- * Checks the container alone — no element is inspected. Use {@link arrayOf} to check
- * every element against a guard.
  *
  * @param value - The value to inspect
 /** Determines whether a value is an array.
+ *
+ * @remarks
+ * Checks the container alone — no element is inspected. Use {@link arrayOf} to check
+ * every element against a guard.
  *
  * @param value - The value to inspect
```

Decision recorded: `isArrayBuffer` gets no remark rather than a rewritten one. Nothing about an
`ArrayBuffer` needs the caveat, and inventing a substitute would document behaviour the guard does
not have.

## Item 6 — counts and all-caps the unit authored (C6)

Guide:

```diff
-The one bound the combinators carry is not itself a combinator, and its `Value` cell holds
+The bound the combinators carry is not itself a combinator, and its `Value` cell holds

-The one class documented in full under its own heading following this table.
+`ContractError` is documented in full under its own heading following this table.

-whole surface is seven readonly data properties — `schema` (a `JSONSchema`), `guard` (a
+whole surface is the readonly data properties — `schema` (a `JSONSchema`), `guard` (a

-value the corresponding getter publishes — `contract.is` IS `compiler.guard`, by identity rather
-than as a copy of it.
+value the corresponding getter publishes — `contract.is` is exactly `compiler.guard`, by
+identity rather than as a copy of it.

-nodes the last SUCCESSFUL `validate()` found the retained declaration expands into, one per node
+nodes the last successful `validate()` found the retained declaration expands into, one per node
```

The `### Classes` introduction took the complete-sentence option, because
`.claude/rules/writing.md` § Structure requires a complete sentence introducing a table.

Source, `src/core/types.ts` (the `@remarks` copy of the same count and capital):

```diff
- * It declares no call-signature member, so its whole surface is seven readonly data
+ * It declares no call-signature member, so its whole surface is the readonly data
- * each holding the exact value the corresponding getter publishes — `contract.is` IS
- * `compiler.guard`, by identity rather than as a copy.
+ * each holding the exact value the corresponding getter publishes — `contract.is` is
+ * exactly `compiler.guard`, by identity rather than as a copy.
```

Source, the remaining capitalized emphasis the converge unit authored:

```diff
- * A CALLABLE instance passes. The only exclusion is a bad CONSTRUCTOR, never a callable
- * VALUE: an `isObject` pre-filter made …
+ * A callable instance passes. The exclusion is a bad constructor, never a callable
+ * value: an `isObject` pre-filter made …

- * Each member is contained SEPARATELY, so a throwing member is a non-match rather than
+ * Each member is contained on its own, so a throwing member is a non-match rather than

- * The negation applies to the CONTAINED verdict, so a throwing guard is a non-match and
+ * The negation applies to the contained verdict, so a throwing guard is a non-match and

- * states: a throwing EXCLUSION is a non-match, so the complement passes.
+ * states: a throwing exclusion is a non-match, so the complement passes.

- * holds, and asked as a MODULE BINDING rather than as a property: `set.has(value)` asks
+ * holds, and asked as a module binding rather than as a property: `set.has(value)` asks

- * A broken source is a fault of the SOURCE rather than of the shape, so the refusal
+ * A broken source is the source's fault rather than the shape's, so the refusal

- * A present `min` or `max` must be FINITE. `NaN` and `±Infinity` throw a `bound` {@link
+ * A present `min` or `max` must be finite. `NaN` and `±Infinity` throw a `bound` {@link
```

Two rulings on this item's scope, both decided and recorded:

- **The brief's source line numbers do not resolve.** `src/core/types.ts` ends at line 1338, so the
  brief's `:1493` and `:1675-1682` name nothing; `combinators.ts:971` and `:1017`, and
  `helpers.ts:1245` and `:1314`, land on unrelated text. The population was therefore derived from
  the converge commit itself:
  `git diff b8f5839 681d37d -- src/ | grep '^+' | grep -oE '\b[A-Z]{2,}\b' | sort | uniq -c`, whose
  emphasis tokens are `CALLABLE`, `CONSTRUCTOR`, `VALUE`, `SEPARATELY`, `CONTAINED`, `EXCLUSION`,
  `MODULE BINDING`, `SOURCE`, `FINITE`, `OWN`, and `IS`. Every one of them is fixed here except
  `OWN`, ruled next. The tokens the brief names by word are all inside that set; the siblings sit in
  the same authored sentences, so fixing the sentence fixes them together.
- **`OWN` stays.** Its only converge-touched site is `src/core/errors.ts:10`, and
  `git show b8f5839:src/core/errors.ts` carries the same capital at its line 8 — the converge unit
  reflowed the sentence rather than authoring the capital. The brief's rule "all-caps that predate
  the converge unit stay" therefore keeps it, and it is a fleet question rather than this round's.

Capitals in `//` code comments beside these blocks (`combinators.ts:264`, `:782`, `:811`, `:842`;
`helpers.ts:229`) predate `681d37d` in the same files and are untouched for the same reason.

## Item 7 — a voice rewrite that shifted a subject (C7)

```diff
-/** Carries one hostile RegExp scalar population on a type-correct string shape. */
+/** Represents a type-correct string shape carrying one hostile RegExp scalar population. */
```

The brief's replacement text is used verbatim, including its unbackticked `RegExp`, which matches
the line it replaces. Observation, not acted on: the sibling `SingleReadPattern` block writes the
same token as `` `RegExp` ``, so a later fleet pass over doc-block code tokens will reach both.
Nothing else in `tests/setup.ts` is touched.

## Item 8 — the titled fence's value claims, executed (C8)

Added beside the flagship cases, in the guide's own order — the titled `Compiling a contract` fence
first, then the fence the existing case already covered:

```ts
	it('parses and explains the user contract the titled fence builds', () => {
		// The titled `Compiling a contract` fence, executed. Its parse line claims the
		// refinement is enforced on the parse side as well as the guard side, and its
		// explain line claims the exact fault a violation produces, so each runs here
		// rather than being read as text.
		const user = createContract(objectShape({ name: stringShape({ min: 1 }), age: integerShape() }))

		expect(user.is({ name: 'Ada', age: 36 })).toBe(true)
		expect(user.parse({ name: 'Ada', age: '36' })).toEqual({ name: 'Ada', age: 36 })
		expect(user.parse({ name: '', age: 36 })).toBeUndefined()
		expect(user.explain({ name: '', age: 36 })).toEqual([
			{
				reason: 'constraint',
				path: ['name'],
				expected: 'string',
				constraint: 'min',
				limit: 1,
				received: '""',
			},
		])
	})
```

The presence guard is kept as its own case, `carries the user fence lines the transcription copies`,
binding each claim-carrying line of the fence including the whole `explain` reading.

Every claim proved true when executed. Ruling 14 did not fire, and neither the fence nor the guard
changed. `integerShape` was added to the existing `@src/core` import.

Failing proof, the brief's red-first requirement. Plant: `user.parse({ name: '', age: 36 })`
expected to equal `{ name: '', age: 36 }`.

```text
$ npm run test:guides -- -t 'parses and explains the user contract the titled fence builds'
 ❯ tests/guides.test.ts:423:45
 Test Files  1 failed (1)
      Tests  1 failed | 69 skipped (70)
```

Plant removed, same command:

```text
 Test Files  1 passed (1)
      Tests  1 passed | 69 skipped (70)
```

## Item 9 — propagation

Ran in the brief's order: `npx oxfmt --write` over the edited TypeScript files, then
`npm run docs -- --to guide` (`rows read: 1, disagreements found: 3, written: 3, reported: 0` —
the three cloner cells), then `npx oxfmt --write guides/contract.md`. Later wording edits repeated
the format-and-check pair. Final readings are under criterion 3.

## Item 10 — standing condition

`tests/guides.test.ts:211` still reads `}, 30_000)`. Untouched.

## Acceptance criteria

**1. `git status --short` lists owned files only.**

```text
 M guides/contract.md
 M src/core/combinators.ts
 M src/core/helpers.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.ts
```

`tmp/d7n-contract-converge-fix/` holds the edit scripts and is ignored by git.

**2. Format, lint, typecheck.**

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/contract.md src/core/{types,validators,combinators,helpers,shapers}.ts tests/{guides.test,setup}.ts
All matched files use the correct format.
Finished in 2651ms on 8 files using 4 threads.
oxfmt exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/{types,validators,combinators,helpers,shapers}.ts tests/{guides.test,setup}.ts
oxlint exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
check exit=0
```

**3. Parity converged and idempotent.**

```text
$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

**4. No `…` in a `Shape` cell, no `interface` row spelling a member's type.**

```text
$ grep -n '| interface *| `{[^`]*:' guides/contract.md
grep exit=1

$ grep -nE '^\| `[A-Za-z<>= ]+` +\| (interface|type|function) +\|[^|]*…' guides/contract.md
grep exit=1
```

The `…` occurrences left in the file sit in body prose and in code fences (`:23`, `:343`, `:451`,
`:767`, `:837`, `:995`, `:1083`), never in a table cell.

**5. The pin block equals the pilot's.**

```text
$ diff <(sed -n 72,95p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 90,113p tests/guides.test.ts)
diff exit=0
```

**6. Suites.**

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  70 passed (70)
   Duration  9.67s
exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.61s
exit=0
```

`npm run test:setup` was also run, because `tests/setup.ts` is owned:
`Test Files  2 passed (2)`, `Tests  61 passed (61)`, exit 0.

## Shared-file patches

None. Every edit landed in an owned file. `package.json`, the lockfile, and every vendored file are
untouched, and no install ran.

## Deviation state

No deviation stopped the unit. Three judgments the brief left to the executor are recorded with
their items: the brief's unresolvable line citations for the convention sentences (item 3) and for
the capitalized-emphasis sites (item 6), and `OWN` staying because its capital predates `681d37d`
(item 6).

Open for a later round, outside this unit's scope and recorded against the capability that owns it:
the `### Compilers` table carries `ShapeValidatorInterface` and `ContractCompilerInterface` rows
with no `Shape` column, which Ruling 15 requires of a `## Surface` table carrying an interface row.
The brief scopes this unit to existing `Shape` cells, so adding that column is a successor unit's
work.

---

**Orchestrator annotation (closure, 2026-09-07):** the closure `checker` read a count in this report's prose ("Two rulings"). The tree is authoritative; the report stands annotated. The verifier's `npm test` read timing reds in `src:core` (a JSONCloner bound at 2700 ms against 2000, two 5 s timeouts) under the host's load; the Orchestrator re-runs those files alone before ruling.
