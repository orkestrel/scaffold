# Report — `d7n-router-converge-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/router` from `9af89c9`.
Wall clock 2026-09-07 20:31Z to 20:43Z. Every item closed; nothing deferred.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/router/tests/guides.test.ts` | R1: canonical drop-in header line, the `INTERNAL` sentence, the hoisted `examples` binding |
| `/home/user/fleet/router/guides/router.md` | R2 and R3: the `Shape` idiom over the Types and Constants tables, and Ruling 9's `### Register and match` heading |
| `/home/user/fleet/router/src/core/factories.ts` | R3: `createRouter`'s `@example` titled, then extended by `--to source` |
| `/home/user/fleet/router/src/server/handlers.ts` | R3: `createListener`'s `@example` title removed |
| `/home/user/fleet/router/src/core/Group.ts` | R4: `{@link import('./Router.js').Router}` restored |
| `/home/user/fleet/router/src/core/DispatchGroup.ts` | R4: `{@link import('./Dispatcher.js').Dispatcher}` restored |
| `/home/user/fleet/router/src/core/constants.ts` | R4: the `DispatcherInterface`, `Method`, and `METHODS` links restored |
| `/home/user/fleet/router/src/core/types.ts` | R4: the `METHOD_LIST` and `METHODS` links restored on `Method` and on `DispatcherInterface.add` |

```
 guides/router.md          | 101 +++++++++++++++++++++++-----------------------
 src/core/DispatchGroup.ts |   5 ++-
 src/core/Group.ts         |   4 +-
 src/core/constants.ts     |  13 +++---
 src/core/factories.ts     |  15 ++++++-
 src/core/types.ts         |   7 ++--
 src/server/handlers.ts    |   2 +-
 tests/guides.test.ts      |  36 +++++++++--------
 8 files changed, 100 insertions(+), 83 deletions(-)
```

Every `src` edit is inside a doc block. `git diff -U0 -- src` filtered to lines outside a comment
prints nothing, so no code token moved.

## Item 1 — the drop-in (R1)

```diff
-// The guides-parity gate: `@orkestrel/guide`'s checks run against this repository's own
+// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, and are the only part a sibling package changes. Every flagship fence in
...
- * intentional rather than forgotten — and the following second assertion fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
...
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
```

The diff against the pilot from `describe(` on is one hunk, and it opens after the manifest loop's
closing `}` — the shared drop-in region is byte-identical and the hunk is the package-owned
`flagship fences` block:

```
$ awk '/describe\(`\$\{entry.concept\}`/{f=1} f' tests/guides.test.ts | head -144 | sha256sum
924c5a7ce20f3b9393528266651f2935fef743c49908ce14064856f47503f882  -
$ awk '/describe\(`\$\{entry.concept\}`/{f=1} f' /home/user/fleet/abort/tests/guides.test.ts | head -144 | sha256sum
924c5a7ce20f3b9393528266651f2935fef743c49908ce14064856f47503f882  -
$ diff -u <pilot-from-describe> <router-from-describe> | head -3
@@ -142,67 +142,127 @@
 	})
 }
```

The header keeps the canonical opening sentence pair with Ruling 13's amended line, then the
package's own material about which suite executes the browser and server fences — the shape
websocket, console, and markdown already carry.

## Item 2 — the `Shape` idiom (R2, Rulings 12, 15, 18, 19)

The `### Types` convention sentence takes Ruling 15's wording verbatim, and `### Constants` takes
that sentence plus Ruling 18's own second sentence:

```
$ grep -n "A \`Shape\` cell holds" guides/router.md
61:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A `Shape` cell holds the constant's declared type.
124:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
```

The `### Constants` table gained a `Shape` column between `Kind` and `Summary` and carries no
`Value` column. Each cell is the declared type read from `dist/src/core/index.d.ts`:

```
| `METHOD_LIST`   | const | `readonly ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']` | Lists the HTTP methods … |
| `METHODS`       | const | `ReadonlySet<string>`                                                   | Holds every HTTP method … |
| `TIER_LITERAL`  | const | `2`                                                                     | Names the specificity tier … |
| `TIER_PARAM`    | const | `1`                                                                     | … |
| `TIER_WILDCARD` | const | `0`                                                                     | … |
```

No constant's description needed the literal added: each tier's declared type is the literal
itself, and `METHOD_LIST`'s cell spells the verbs, so Ruling 18's description clause is already
satisfied by the cells and no `--to guide` write followed.

Every interface row now holds bare data-member names with `?`, then `plus` and the call-signature
members by name, and every alias holds its own literal whole. Representative rows:

```
| `RouterInterface`        | interface | `{ count } plus add, match, entries, group, clear`                       |
| `DispatcherInterface`    | interface | `{ router, emitter } plus add, group, match, handle, destroy`            |
| `NavigatorInterface`     | interface | `{ router, emitter, active } plus start, stop, navigate, match, destroy` |
| `GroupInterface`         | interface | `{ prefix } plus add, group`                                            |
| `NavigatorOptions`       | interface | `{ routes, history?, base?, fallback?, guard?, intercept?, sensitive?, on?, error? }` |
| `Method`                 | type      | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE' \| 'HEAD' \| 'OPTIONS'` |
| `IdentifierChar`         | type      | `IdentifierStartChar \| '0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9'` |
| `DispatcherEventMap`     | type      | `{ match, miss }`                                                       |
| `NavigatorEventMap`      | type      | `{ navigate }`                                                          |
```

The members paragraph under the table now points at Methods through the `plus` device rather than
repeating the `/` lists:

```diff
-The `count` member of `RouterInterface`, the `prefix` members of
-`GroupInterface` / `DispatchGroupInterface`, the `router` / `emitter`
-members of `DispatcherInterface`, and the `router` / `emitter` / `active`
-members of `NavigatorInterface` are all `readonly` data members (Surface
-rows, preceding) — the call-signature methods of `RouterInterface`,
-`GroupInterface`, `DispatcherInterface`, `DispatchGroupInterface`, and
-`NavigatorInterface` are documented under [Methods](#methods).
+The `count` member of `RouterInterface`, the `prefix` member of `GroupInterface` and
+`DispatchGroupInterface`, the `router` and `emitter` members of `DispatcherInterface`, and the
+`router`, `emitter`, and `active` members of `NavigatorInterface` are all `readonly` data members
+(the preceding Surface rows) — the call-signature members each `Shape` cell names after `plus` are
+documented under [Methods](#methods).
```

## Item 3 — the titled pair (R3, Rulings 9 and 14)

```diff
 ## Surface
 
+### Register and match
+
 Register routes on a `Router`, resolve the most-specific match, and dispatch
 fetch-standard requests through a `Dispatcher`:
```

```diff
--- a/src/core/factories.ts
- * @example
+ * @example Register and match
--- a/src/server/handlers.ts
- * @example Basic server
+ * @example
```

`### Basic server` keeps its heading and its fence body unchanged. `npm run docs -- --to source`
then carried the Surface fence into `createRouter`'s block:

```
$ npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

Under Ruling 14 the fence lost nothing and gained nothing: the block held the three `createRouter`
lines the fence already carried, and the fence is the fuller demonstration because it adds the
`createDispatcher` half. The block's `import { createRouter } from '@src/core'` line became the
fence's `import { createDispatcher, createRouter } from '@orkestrel/router'`, which is a superset
on the published specifier the guide-example rule requires.

## Item 4 — the links (R4)

Every module-qualified `{@link}` the converge flattened is restored. `src/core/Group.ts` returns to
the pre-converge blob `6e61869`.

```diff
--- a/src/core/Group.ts
- * Represents a prefix-scoped registration handle over a `Router` — pure string
- * composition, no independent state or storage.
+ * Represents a prefix-scoped registration handle over a {@link import('./Router.js').Router} —
+ * pure string composition, no independent state or storage.
--- a/src/core/DispatchGroup.ts
- * Represents a prefix-scoped registration handle over a `Dispatcher` — the
- * method-dimensioned counterpart of `Group`.
+ * Represents a prefix-scoped registration handle over a
+ * {@link import('./Dispatcher.js').Dispatcher} — the method-dimensioned counterpart of
+ * `Group`.
--- a/src/core/constants.ts
- * Lists the HTTP methods a `DispatcherInterface` registers routes under, in canonical
- * order — a frozen literal tuple, and the single source the `Method` type, `METHODS`,
- * and `parseMethod` are all derived from.
+ * Lists the HTTP methods a {@link import('./types.js').DispatcherInterface} registers
+ * routes under, in canonical order — a frozen literal tuple, and the single source the
+ * {@link import('./types.js').Method} type, {@link METHODS}, and `parseMethod` are all
+ * derived from.
- * Holds every HTTP method a `DispatcherInterface` registers routes under as a
- * `ReadonlySet` — backs the registration guard (`add` rejects any `method` outside
+ * Holds every HTTP method a {@link import('./types.js').DispatcherInterface} registers
+ * routes under as a `ReadonlySet` — backs the registration guard (`add` rejects any
--- a/src/core/types.ts
- * derived from `METHOD_LIST`, whose membership counterpart is `METHODS`.
+ * derived from {@link import('./constants.js').METHOD_LIST}, whose membership
+ * counterpart is {@link import('./constants.js').METHODS}.
-	 * a function, or its method sits outside `METHODS`. Path validation is delegated to
-	 * the underlying router's own guard.
+	 * a function, or its method sits outside {@link import('./constants.js').METHODS}.
+	 * Path validation is delegated to the underlying router's own guard.
```

`npm run docs` stayed at `disagreements found: 0` across the restore, confirming the installed
reader's compared form drops the `import('./module.js').` part.

## Acceptance criteria

**1. `git status --short` lists owned files only.**

```
 M guides/router.md
 M src/core/DispatchGroup.ts
 M src/core/Group.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/handlers.ts
 M tests/guides.test.ts
```

**2. `oxfmt --check`, `oxlint --deny-warnings`, `npm run check` exit 0.**

```
$ npx oxfmt --config .oxfmtrc.json --check guides/router.md tests/guides.test.ts src/core/constants.ts src/core/types.ts src/core/Group.ts src/core/DispatchGroup.ts src/core/factories.ts src/server/handlers.ts
All matched files use the correct format.
Finished in 514ms on 8 files using 4 threads.
oxfmt exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
check exit 0
```

**3. `npm run docs` at zero; both directions `written: 0`; one titled example in `src/`.**

```
$ npm run docs
rows read: 1, disagreements found: 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ grep -rn '@example \S' src/
src/core/factories.ts:24: * @example Register and match
```

**4. The convention sentence and the `Shape` cell patterns.**

The Ruling 15 wording sits above both tables carrying `Shape` (lines 61 and 124, quoted earlier).

```
$ grep -n '| interface *| `{[^`]*:' guides/router.md
exit=1
$ grep -n '…' guides/router.md
exit=1
```

The `} + \|/` pattern is run over the `Shape` cells alone, extracted by
`tmp/d7n-router-converge-fix/shapecells.py`. `} + ` and ` + ` print nothing. `/` prints one row:

```
$ grep -n '} + ' tmp/d7n-router-converge-fix/shape-cells.txt
exit=1
$ grep -n ' + ' tmp/d7n-router-converge-fix/shape-cells.txt
exit=1
$ grep -n '/' tmp/d7n-router-converge-fix/shape-cells.txt
7:`PathParamsRaw`	``string extends Path ? Readonly<Record<string, string>> : Path extends `${infer Segment}/${infer Rest}` ? SegmentParam<Segment> & PathParamsRaw<Rest> : SegmentParam<Path>``
```

That `/` is the path separator inside the alias's own template-literal type, not a separator
between members, so the cell is Ruling 12's "own type literal spelled whole". Run over the whole
guide the pattern also matches every `/` in prose and in fences, which is why it is scoped to the
cells here.

The drop-in diff against the pilot is the appended `flagship fences` case, proved by the matching
digest quoted under Item 1.

**5. `npm run test:guides` and `npm run test:policy` exit 0.**

```
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  48 passed (48)
   Duration  617ms
guides exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  504ms
policy exit 0
```

## Ancillary decisions

- **The `DispatchResult` cell** keeps each arm's discriminant value:
  `{ status: 'matched', match } \| { status: 'unmethoded', allow } \| { status: 'unmatched' }`.
  Ruling 19's bare-name form alone would print `{ status }` three times and name nothing; the
  discriminant is the alias's own axis, and it is a literal value rather than a member's type.
- **The conditional-type aliases** (`PathParamsRaw`, `TakeIdentifierTail`, `IdentifierHead`,
  `SegmentParam`) hold the whole conditional expression in a double-backtick span, because each
  carries a template-literal type with its own backticks. `IdentifierStartChar` spells all
  fifty-three arms.
- **The drop-in header** keeps router's package-specific paragraphs after the canonical opening
  rather than replacing them, matching how websocket, console, and markdown carry their own.
- **The Constants convention sentence** carries the fleet-wide Ruling 15 wording first and Ruling
  18's own sentence second, because criterion 4 requires the Ruling 15 wording above every table
  carrying `Shape`.

## Deviation state

None. No gate outside the owned files reddened, every `Shape` cell was expressible under Ruling 12,
and the restored links leave `npm run docs` at zero.

## Instruments

Retained under `/home/user/fleet/router/tmp/d7n-router-converge-fix/`: `item1.py`, `item2.py`,
`item3.py`, `item4.py`, `shapecells.py`, and the extracted comparisons `pilot-from-describe.txt`,
`router-from-describe.txt`, `dropin.diff.txt`, `shape-cells.txt`.
