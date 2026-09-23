# B-FORMS-FLOOR report

## Diff of owned files

`guides/veneer.md` in the working tree carries only the FLOATING unit's uncommitted writes (no
floor sentence exists there to move; obligation 3 is a no-op). This unit's diff is confined to
`tests/setupServer.ts` and `tests/setupServer.test.ts`:

```diff
diff --git a/tests/setupServer.ts b/tests/setupServer.ts
@@
- * An intersection qualifies under either arm. The relative arm takes an overlap of at least 4
- * declarations that is more than half of whichever block writes fewer, so one block is most of the
- * other; a whole copy of a two- or three-declaration rule sits under that floor and passes as a
- * coincidence, which is the recorded boundary. The absolute arm takes an overlap of at least 6
- * declarations, a width no accidental agreement here reaches, the largest overlap two partials
- * wrote independently being 3 declarations measured across `src/styles` and the family partials on
- * 2026-09-22. `scanStyleBlocks` keeps reporting every intersection, so an auditor reads the refused
- * ones in its result. Two partials that each record the same external value agree by coincidence
- * rather than sharing one decision, so both copies stay inline; a reported intersection is a
- * repeated block, and the repair moves it into `_mixins.scss`.
+ * An intersection qualifies under either arm. The relative arm takes an overlap of at least 5
+ * declarations that is more than half of whichever block writes fewer, so one block is most of the
+ * other; a whole copy of a two-, three-, or four-declaration rule sits under that floor and passes
+ * as a coincidence, which is the recorded boundary. The absolute arm takes an overlap of at least 6
+ * declarations, a width no accidental agreement here reaches, the largest overlap two partials
+ * wrote independently being 4 declarations measured across `src/styles` on 2026-09-23 (the floating
+ * label against the ratio child and the hidden check input). `scanStyleBlocks` keeps reporting
+ * every intersection, so an auditor reads the refused ones in its result. Two partials that each
+ * record the same external value agree by coincidence rather than sharing one decision, so both
+ * copies stay inline; a reported intersection is a repeated block, and the repair moves it into
+ * `_mixins.scss`.
@@
-		return (count >= 4 && count * 2 > smallest) || count >= 6
+		return (count >= 5 && count * 2 > smallest) || count >= 6

diff --git a/tests/setupServer.test.ts b/tests/setupServer.test.ts
@@
-	it('reports a whole four-declaration block one partial copies into another, naming each site and every declaration', () => {
+	it('reports a whole five-declaration block one partial copies into another, naming each site and every declaration', () => {
   (blocks now write 5 declarations each: margin, color, padding, border, inset)

-	it('refuses a three-declaration overlap between two six-declaration blocks, and reports it after a fourth is shared', () => {
+	it('refuses a four-declaration overlap between two eight-declaration blocks, and reports it after a fifth is shared', () => {
   (left8/right8 sized to 8 declarations each; the fifth shared declaration, inset, takes the pair
   to count 5 against smallest 8, more than half)

-	it('refuses a whole two-declaration copy and a whole three-declaration copy, while the sweep still reports both', () => {
+	it('refuses a whole two-declaration copy, a whole three-declaration copy, and a whole four-declaration copy, while the sweep still reports every one', () => {
   (adds a _quad.scss / components/_quadecho.scss whole four-declaration copy; the sweep lists it
   between duo and trio in file-walk order and findDuplication refuses it)

-	it('refuses a four-declaration overlap tied at half of an eight-declaration block, and reports it after that block narrows to seven', () => {
+	it('refuses a five-declaration overlap tied at half of a ten-declaration block, and reports it after that block narrows to nine', () => {
   (tenleft/tenright sized to 10 declarations each, tied at count 5 against smallest 10; narrows to 9
   by dropping the tenright gap declaration)
```

Full literal diff is in the working tree (see `git diff -- tests/setupServer.ts
tests/setupServer.test.ts`); the excerpt above shows every hunk boundary and rationale.

## `npm run test:setup` readings

**Before** (measured by the Orchestrator, cited in the brief): 2 failed, 183 passed — the
coincidence-floor case (`refuses a three-declaration overlap between two six-declaration blocks…`,
now retitled) and the shipped-key Set literal case.

**After** (this unit): 1 failed, 184 passed.

```
FAIL  |setup| tests/setupServer.test.ts > server setup > skips engine and CSS obligations whose Proof cell is a dash
AssertionError: expected Set{ 'g', 'gx', 'gy', 'row-gap', …(44) } to deeply equal Set{ 'badge', 'blockquote', …(45) }
```

That failure is the shipped-key Set literal case (`form-floating` missing from the expected set),
the Orchestrator's own integration edit that stays red here per the brief's standing conditions.
Every `findDuplication` case, including the retitled boundary cases and the coincidence-floor case,
is green.

## Scoped format and lint exits

```
$ npx oxfmt --check tests/setupServer.ts tests/setupServer.test.ts
All matched files use the correct format.   (exit 0)

$ npx oxlint tests/setupServer.ts tests/setupServer.test.ts
(no output, exit 0)
```

## `npm run check`

Exits 0 (`tsc --noEmit` across `tsconfig.json`, `configs/src/*`, and `configs/app/*`, plus
`vue-tsc`).

## Observation: `npm run test:conformance`

Not run by this unit's criteria (D32 scope). The brief records it red on GROUP's absent selectors
at this tree, unrelated to `findDuplication`.
