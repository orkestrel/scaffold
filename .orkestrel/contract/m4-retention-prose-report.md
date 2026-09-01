# Unit m4-retention-prose — returned report

Done. All acceptance criteria are green.

## Touched files

- `/home/user/contract/guides/contract.md` — release sentence in the `ContractCompiler` Surface row rewritten to match the m2 source change; new retention-rule paragraph plus an executed fence at the end of § Compiling a contract.
- `/home/user/contract/src/core/types.ts` — one TSDoc paragraph added to `ContractCompilerInterface` stating the retention rule and the artifact's lifetime. No member, signature, or type line touched.
- `/home/user/contract/src/core/compilers.ts` — one TSDoc paragraph added to `createContract` stating why the bundle is eager.
- `/home/user/contract/tests/guides.test.ts` — a `flagship fences` block: the executed transcription of the new fence, plus a presence guard tying it to the guide.

Diffstat:

```
 guides/contract.md    | 17 ++++++++++++++++-
 src/core/compilers.ts |  9 +++++++++
 src/core/types.ts     |  9 +++++++++
 tests/guides.test.ts  | 30 ++++++++++++++++++++++++++++++
 4 files changed, 64 insertions(+), 1 deletion(-)
```

## Fence mechanism (the brief's Unknown)

**Neither.** `tests/guides.test.ts` had no fence-execution mechanism at all before this unit. Its checks are source-text parity (`createGuide` / `createSource`: fence languages, barrel re-export, documented-vs-exported, per-interface methods, an example per Surface function, `fenceImports` name resolution, link resolution) and runtime prototype parity (`readMembers` over the six published classes). Nothing ran a fence, and the guide's existing fences carry no transcription. The brief's standing condition "`tests/guides.test.ts` executes flagship fences" did not hold for this repository.

I established the manual transcription mechanism inside the owned test file, which is the form `.claude/rules/tests.md` mandates ("Transcribe each flagship fence and assert the values its comments claim. Change a fence, change the transcription beside it") and `.claude/rules/documentation.md` requires ("keep the substring check only as a presence guard beside it"). The transcription asserts the values; the presence guard asserts only that the transcribed line is still the documented one.

## Counts

Pre-change, tree clean at `fcdd4d0`:

```
npx vitest run tests/guides.test.ts --config vite.config.ts --no-cache
Test Files  1 passed (1)
     Tests  59 passed (59)
```

Post-change, same command:

```
Test Files  1 passed (1)
     Tests  61 passed (61)   exit=0
```

Added case names: `answers from a compiled guard that no live compiler is behind`, `transcribes a fence the guide still carries`.

Other gates run 2026-09-01 on the host: `npm run lint:check` exit 0; `npm run check` exit 0; `npx oxfmt --config .oxfmtrc.json --check` over the four owned files reports correct format; `npm run test:policy` `Tests 111 passed (111)`.

## Diff

`git status --porcelain`:

```
 M guides/contract.md
 M src/core/compilers.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1074,6 +1074,15 @@
  * interrupted outer read, and every later read with one shared cause-free
  * error.
  *
+ * After every family exists, the compiler releases its working set — the owned
+ * graph, the node index, the order, and every family plan. Nothing is released
+ * before then, so a compiler read for one artifact and then kept holds that
+ * whole set for as long as you keep it. A compiled artifact is the opposite:
+ * each one closes over the child entries its family needed while that family
+ * was built, so it answers on its own and outlives the compiler that produced
+ * it. When one artifact is what you want, keep the artifact and let the
+ * compiler go.
+ *
  * @example
  * ```ts
  * const compiler = new ContractCompiler(stringShape({ min: 1 }))
diff --git a/src/core/compilers.ts b/src/core/compilers.ts
--- a/src/core/compilers.ts
+++ b/src/core/compilers.ts
@@ -350,6 +350,15 @@
  * to; `contract.audit` and `compileAuditor` are the same compiled function
  * reached two ways.
+ * The bundle is eager by intent. Its members are plain data properties holding
+ * the compiled artifacts, so `const { is, parse } = createContract(shape)`
+ * destructures those exact values and a spread of the result copies them; a
+ * lazily compiled member would compile on either, which spends the laziness
+ * rather than saving it. A malformed declaration refuses at this call rather
+ * than at the first read of whichever member a caller happens to touch, so the
+ * refusal stays inside this function's own error attribution. Every member is
+ * self-contained, so the compiler this call builds releases its working set
+ * before the call returns and nothing the caller keeps holds the owned graph.
  *
  * @param shape - The shape to compile
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -28,6 +28,8 @@
 	ShapeCloner,
 	ShapeValidator,
+	objectShape,
+	stringShape,
 } from '@src/core'
@@ -273,3 +275,31 @@
 		expect(Object.getOwnPropertySymbols(SmuggledMember.prototype)).toEqual([SMUGGLED_KEY])
 	})
 })
+
+// The EXECUTED half. Every preceding check reads a name — from source text or
+// from a prototype — and a name that resolves proves nothing about a sentence
+// beside it, so a fence whose comment claims a value the code contradicts
+// passes all of them. The cases here run a flagship fence and assert the values
+// its comments claim. Change a fence, change the transcription beside it.
+describe('flagship fences', () => {
+	const guideText = requireValue(files[CORE_GUIDE], `Missing file: ${CORE_GUIDE}`)
+
+	it('answers from a compiled guard that no live compiler is behind', () => {
+		// Transcribed from the compiling-a-contract passage, which tells a reader
+		// wanting one artifact to keep the artifact and let the compiler go. That
+		// advice is worth nothing unless the guard still answers when the compiler
+		// it came from was never bound to a name, so this runs exactly that.
+		const isTicket = new ContractCompiler(objectShape({ id: stringShape({ min: 1 }) })).guard
+
+		expect(isTicket({ id: 'T-1' })).toBe(true)
+		expect(isTicket({ id: '' })).toBe(false)
+	})
+
+	it('transcribes a fence the guide still carries', () => {
+		// The presence guard beside the transcription: it proves the transcribed
+		// line is still the documented one, and nothing whatever about behavior.
+		expect(guideText).toContain(
+			'const isTicket = new ContractCompiler(objectShape({ id: stringShape({ min: 1 }) })).guard',
+		)
+	})
+})
```

The guide diff, with the wide table row's unchanged prefix elided:

```diff
diff --git a/guides/contract.md b/guides/contract.md
@@ -491 (the `ContractCompiler` Surface row, final sentence only)
-After all six roots exist, the owned graph, the node index, the order and every family plan are released through preconstructed peers, leaving only the six roots, the optional frozen bundle, and terminal state.
+After all six roots exist, the owned graph, the order and every family plan are released to empty peers the class owns instead of to per-instance ones, and the node index is dropped outright: a shared empty `WeakMap` would be a class-lifetime cache any later write could fill with a caller's own shapes. What stays is the six roots, the optional frozen bundle, and terminal state.
@@ -956,4 +956,19 @@
 One declaration; the schema, guard, parser, both reports, and the generator are all derived from one owned snapshot of it, so no later edit to the shape can move one of them without the others. […] See Domains for the three laws that hold between them.
 
+When you want one of the six artifacts, hold the artifact rather than the compiler. A compiler releases its working set — the owned graph, the node index, the order, and every family plan — after every family exists, so a compiler read for one artifact and then kept holds all of it for as long as you keep the compiler. Each compiled artifact closes over the child entries its family needed while that family was built, so it answers on its own and outlives the compiler that produced it. The following block reads one guard and keeps no reference to the compiler behind it:
+
+```ts
+import { ContractCompiler, objectShape, stringShape } from '@orkestrel/contract'
+
+// The compiler is never named: the guard is what leaves the expression, and the
+// compiler it came from is unreachable the moment that expression finishes.
+const isTicket = new ContractCompiler(objectShape({ id: stringShape({ min: 1 }) })).guard
+
+isTicket({ id: 'T-1' }) // true — a compiled artifact carries its own plan
+isTicket({ id: '' }) // false — an empty id fails the min:1 refinement
+```
+
+`createContract` is written the same way, which is why a contract it returns holds nothing but its own six values.
+
 ### From an existing API/DB to an MCP tool
```

The row's changed line also carries a trailing table-cell repadding oxfmt requires: my sentence changed the row's width. I ran `oxfmt` write-mode on a scratchpad copy of that single file and diffed before applying, confirming the only difference from my hand edit was that row's trailing padding.

## Freeze qualification (carried instruction)

I dropped `frozen` from the guide sentence rather than carrying the qualification. A reader cannot check a `#` static's frozenness, and the qualification (`INTRINSICS.freeze` is captured at module evaluation, so a consumer module ordered before `constants.ts` defeats it) is stated in the source where a reader can check it. The guide sentence now names only what release does — shared class-owned peers, index dropped — and gives the checkable reason for the index. The pre-existing `the optional frozen bundle` stands: that bundle is a real `INTRINSICS.freeze` on a value the public surface returns.

## Claims I flag as unproved by a run

- **"a compiler read for one artifact and then kept holds that whole set."** Read from `#collect` (`src/core/ContractCompiler.ts`), which returns early unless all six roots exist. Retention has no public surface, so no test in this repository can bind to it; the campaign's heap instrument is the only settling measurement.
- **"outlives the compiler that produced it."** The collection half is unobservable from a test. What the transcription proves is the checkable half: the guard answers correctly when the compiler that built it was never bound to a name.
- **The release sentence's `WeakMap` counterfactual.** "a shared empty `WeakMap` would be a class-lifetime cache any later write could fill with a caller's own shapes" is a design rationale verified against the `#index` source comment, not against a run. I reworded the m2 draft's `because` clause to state that reason directly rather than to state that freezing misses a `WeakMap`, because the latter reads as a bare freeze promise the guide reader cannot check.
- **`createContract` TSDoc: "a spread of the result copies them."** Data-property spread semantics on a frozen object literal; read from `#buildContract`, not exercised by a test I added.

## Decisions recorded (ancillary, per the deviation contract)

- **Placement.** The new paragraph and fence sit at the end of § Compiling a contract rather than directly under the existing compiler fence, so the pre-existing sentence "the block above is the proof" does not gain a third intervening block between it and its referent.
- **Fence form.** `new ContractCompiler(shape).guard` with no name bound mirrors `createContract`'s own body (`compilers.ts:368`), so the fence shows the recommended pattern rather than describing it, and it transcribes without a one-use helper in the test file.
- **Not corrected (outside the named property).** Pre-existing writing-rule hits I left alone: `now runs on` and `once` inside the `ContractCompiler` Surface row, `above` at `guides/contract.md:956`, `above` in the `tests/guides.test.ts` runtime-parity comment, and `above` in the `contract` member TSDoc at `src/core/types.ts:1096`.

No deviation stopped the unit.
