# Report — `d7n-emitter-converge-fix`

Every item landed. Every acceptance criterion exits 0. `git status --short` lists the owned files
alone.

Touched files:

- `/home/user/fleet/emitter/tests/guides.test.ts` — the mapped `examples` binding hoisted to the
  methods loop's own scope; the flagship-fences guide read moved onto `GUIDE_SPEC`.
- `/home/user/fleet/emitter/src/core/Emitter.ts` — the class doc block names `EmitterInterface`.
- `/home/user/fleet/emitter/guides/emitter.md` — the class row carried by `--to guide`; the `Shape`
  convention sentence and the rows that departed from it rewritten.

```text
 guides/emitter.md    | 24 ++++++++++++------------
 src/core/Emitter.ts  |  2 +-
 tests/guides.test.ts | 16 ++++++++--------
 3 files changed, 21 insertions(+), 21 deletions(-)
```

## Item 1 — the examples binding (claim 28)

`examples` sits beside `documented` at the loop's own scope, and the `it` callback keeps only
`fences` and the assertion.

```diff
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
 			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.map((example) => example.name)
-									.concat(source.examples(entity).map((example) => example.name))
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The block was spliced from the pilot rather than retyped, and it carries no constant this package
renames, so byte identity is checkable:

```console
$ diff <(sed -n '191,210p' abort/tests/guides.test.ts) <(sed -n '211,230p' emitter/tests/guides.test.ts) && echo "IDENTICAL to pilot block"
IDENTICAL to pilot block
```

The pilot's loop moved from `:209` to `:191` between the read and the check, under a writer live in
`/home/user/fleet/abort`. That checkout is outside this unit's scope; it was read for the pilot
block alone and never written.

## Item 2 — `GUIDE_SPEC` (F2)

```diff
 describe('flagship fences', () => {
-	const guideText = requireValue(files['guides/emitter.md'], 'Missing file: guides/emitter.md')
+	const guideText = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)
```

`grep -n "guides/emitter.md'" tests/guides.test.ts` returns the `GUIDE_SPEC` declaration at `:32`
and nothing else, so the path has one home in the file.

## Item 3 — the class row (F4)

The doc block was rewritten first:

```diff
 /**
- * Implements the emitter contract over one listener `Set` per event, so every public method is
+ * Implements `EmitterInterface` over one listener `Set` per event, so every public method is
  * precisely typed with no assertion. A stateful entity owns one as a `#emitter` field and
  * exposes it through `readonly emitter`; it never inherits from it.
```

Then `npm run docs -- --to guide` carried the cell:

```console
$ npm run docs -- --to guide
wrote guides/emitter.md
rows read: 1, disagreements found: 1, written: 1, reported: 0
next: npm run format
```

The written table collapsed its column padding, so `npx oxfmt` realigned it over the owned paths
alone. `grep -rn "the emitter contract"` over the package's Markdown and TypeScript, excluding
`node_modules` and `dist`, returns nothing, so no second copy of the paraphrase survives.

## Item 4 — the `Shape` idiom (Ruling 12)

The convention sentence states the fleet's idiom, in the wording budget's guide already carries:

```diff
-A `Shape` cell holds an interface's members in braces, and a type alias's value.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
```

These rows departed from it and were rewritten:

- `EmitterOptions` (`:75` in the baseline) spelled each member's type: `{ on?: EmitterHooks<TMap>; error?: EmitterErrorHandler }` becomes `{ on?, error? }`.
- `EmitterInterface` (`:76`) ran its call-signature members inside the braces: `{ destroyed, on, once, off, emit, count, clear, destroy }` becomes `{ destroyed } plus on, once, off, emit, count, clear, destroy`.
- `EmitterHooks` (`:74`) dropped a modifier its declaration carries. `src/core/types.ts:24-26`
  declares `readonly [K in keyof TMap]?:`, so the cell was not the alias's own type literal the
  sentence promises. It becomes `{ readonly [K in keyof TMap]?: EmitterHandler<TMap[K]> }`, the form
  the fleet's `RecorderMap` row also uses at `/home/user/fleet/abort/guides/test.md:113`. This row
  sits outside the split F3 named, and I flag it for the auditor to rule on.

`EventMap`, `EmitterHandler`, and `EmitterErrorHandler` each already held their alias's own type
verbatim and were left alone. The comparator confirms the rewrite touched `Shape` and nothing else:

```console
$ node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/emitter HEAD guides/emitter.md
{
 "rowsBefore": 16,
 "rowsAfter": 16,
 "missing": [],
 "added": [],
 "changed": [
  {
   "key": "`EmitterHooks`",
   "col": "Shape",
   "was": "`{ [K in keyof TMap]?: EmitterHandler<TMap[K]> }`",
   "is": "`{ readonly [K in keyof TMap]?: EmitterHandler<TMap[K]> }`"
  },
  {
   "key": "`EmitterOptions`",
   "col": "Shape",
   "was": "`{ on?: EmitterHooks<TMap>; error?: EmitterErrorHandler }`",
   "is": "`{ on?, error? }`"
  },
  {
   "key": "`EmitterInterface`",
   "col": "Shape",
   "was": "`{ destroyed, on, once, off, emit, count, clear, destroy }`",
   "is": "`{ destroyed } plus on, once, off, emit, count, clear, destroy`"
  }
 ]
}
```

No row is missing and none was added; every changed cell is a `Shape` cell. The trailing sentence
under the table already named `destroyed` as the `readonly` data member and pointed at Methods, so
it needed no change.

## Acceptance criteria

Criterion 1 — format, lint, typecheck over the owned paths:

```console
$ npx oxfmt --check guides/emitter.md tests/guides.test.ts src/core/Emitter.ts
All matched files use the correct format.
Finished in 515ms on 3 files using 4 threads.
exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings guides/emitter.md tests/guides.test.ts src/core/Emitter.ts
exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
exit=0
```

`oxlint` printed nothing over the owned paths. A directory-scoped run of the same config proves the
silence is a clean run rather than an empty selection:

```console
$ npx oxlint --config .oxlintrc.json --deny-warnings --format=default tests/ src/
Found 0 warnings and 0 errors.
Finished in 1.0s on 15 files with 140 rules using 4 threads.
exit=0
```

Criterion 2 — `docs` at zero in each direction, and the named test projects:

```console
$ npm run docs
rows read: 1, disagreements found: 0
exit=0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  23 passed (23)
exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
exit=0
```

Criterion 3 — the comparator's output is pasted under item 4: `missing` empty, `added` empty, every
entry in `changed` naming the `Shape` column.

Criterion 4:

```console
$ git status --short
 M guides/emitter.md
 M src/core/Emitter.ts
 M tests/guides.test.ts
```

## Observation

`npm test` over every project in the package, reported as an observation rather than a criterion,
because the reading is the unit's own and a whole-suite result belongs to the independent run:

```console
$ npm test
> test:src     Test Files  3 passed (3)      Tests  43 passed (43)
> test:policy  Test Files  1 passed (1)      Tests  90 passed | 1 skipped (91)
> test:config  Test Files  1 passed (1)      Tests 172 passed | 1 skipped (173)
> test:setup   Test Files  1 passed (1)      Tests   1 passed (1)
> test:guides  Test Files  1 passed (1)      Tests  23 passed (23)
```

## Deviation state

None. No correction needed a file outside the owned set, and `docs` finished at zero.
