# Report — `d7n-emitter-close`

Checkout: `/home/user/fleet/emitter`, tip `286586f`. Instruments under `tmp/d7n-emitter-close/`.

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

No edit. `guides/emitter.md:69` already carries the exact Ruling 15 convention sentence between
the `### Types` heading and the table, and every row in that table already holds the canonical
form: `EventMap`, `EmitterHandler`, `EmitterErrorHandler`, `EmitterHooks` as their own type
literals; `EmitterOptions` as `{ on?, error? }`; `EmitterInterface` as
`{ destroyed } plus on, once, off, emit, count, clear, destroy`. The brief flagged
`EmitterOptions` as a row with no `plus`; its declaration (`src/core/types.ts:29-37`) has only the
`readonly on?` and `readonly error?` data members and no call-signature member, so there is nothing
to move after a `plus` and the row already matches Ruling 15's idiom. No other table in the guide
carries an `interface` or `type` row without the `Shape` column, no row spells a member's type, no
guard or constants table departs from Ruling 20's canon, and no extended interface exists.

## Item 2 — member references

No site. `npm run docs` reports `rows read: 1, disagreements found: 0` both before and after the
other edits, so no `Owner#member` versus bare-`member` disagreement exists.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

Hunk (`tests/guides.test.ts`):
```diff
@@ -1,7 +1,6 @@
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest. The `FENCE_LANGUAGES`,
-// `EXAMPLE_LANGUAGE`, `MODULES`, `INTERNAL`, and `ROOT_FILES` constants are this
-// package's own, and are the only part a sibling package changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.

@@ -37,9 +36,8 @@ const MODULES = Object.freeze({ '@orkestrel/emitter': 'src/core', '@src/core': '
  * A class that one-class-per-file evicted from its single consumer cannot become a
  * local, so it stays exported without being public. Naming it here is what makes that
- * intentional rather than forgotten — and the `names no symbol internal that the barrel
- * already exports` assertion fails when a name here stops being stranded, so the list
- * cannot rot.
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
+ * here stops being stranded, so the list cannot rot.
```
The `const root = ` line through the manifest loop's closing brace (`tests/guides.test.ts:47-258`
after the header shrank by one line) is byte-for-byte identical to the pilot's same region
(`diff /tmp/abort-region.txt /tmp/emitter-region2.txt` exits `0`). Line 2 now equals the pilot's
line 2, and the `INTERNAL` block carries the pilot's sentence.

## Item 4 — fence lead-ins (Ruling 21)

Hunk (`guides/emitter.md`):
```diff
@@ -113,6 +113,8 @@ Deliberately out of scope, to keep the surface small: a listener-count cap or `m

 ### Standalone emitter

+Create an emitter with no owning entity, subscribe, and fire its events:
+
 ```ts
 import { createEmitter } from '@orkestrel/emitter'
```
The fence at what was line 116 sat directly under the `### Standalone emitter` heading with no
sentence between them; it is a titled fence (`@example Standalone emitter`,
`src/core/factories.ts:17`), so the added sentence names what the demonstration builds.

## Item 5 — propagation

- `npx oxfmt --write guides/emitter.md tests/guides.test.ts`: `Finished in 1381ms on 2 files using 4 threads.`
- `npm run docs`: `rows read: 1, disagreements found: 0` (`exit 0`).
- `npm run docs -- --to guide`: `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
- `npm run docs -- --to source`: `rows read: 1, disagreements found: 0, written: 0, reported: 0`.

## Acceptance criteria

1. `git status --short`: `M guides/emitter.md`, `M tests/guides.test.ts` — owned files only.
2. `grep -n '| interface *| \`{[^\`]*:' guides/emitter.md` and `grep -n '…' guides/emitter.md`:
   the first prints nothing; the second prints only code-fence comment lines (`26:`, `180:`,
   `181:`), none in a `Shape` cell. Every `Shape`-headed table carries the sentence between its
   heading and the table (`guides/emitter.md:67`).
3. The item 3 region diff against the pilot prints nothing (`exit 0`); line 2 equals the pilot's.
4. `npx oxfmt --check guides/emitter.md tests/guides.test.ts`: `All matched files use the correct
   format.` (`exit 0`). `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`:
   `exit 0`.
5. `npm run docs`: `rows read: 1, disagreements found: 0` (`exit 0`). Both write directions at
   `written: 0` (shown under item 5).
6. `npm run test:guides`: `Test Files 1 passed (1)`, `Tests 23 passed (23)`, `Duration 407ms`
   (`exit 0`, wall clock `3.040s`). `npm run test:policy`: `Test Files 1 passed (1)`, `Tests 90
   passed | 1 skipped (91)`, `Duration 673ms` (`exit 0`, wall clock `1.247s`).

## Deviation

None. Every named site converged as the brief predicted; the one open finding (item 1's flagged
`EmitterOptions` row) resolved to no edit because the declaration carries no call-signature member.

---

Orchestrator's annotation (2026-09-08, closure): the checker ruled claim 2 FAIL on this report's prose alone (a count stated about a growable set); every citation was verified against the tree, and the tree is authoritative.
