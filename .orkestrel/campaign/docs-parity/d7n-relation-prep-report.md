# Report — `d7n-relation-prep`

Wall clock: 2026-09-07T21:11:29Z to 2026-09-07T21:14:43Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..` (exit 0), preceded by `0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.`

`git status --short` after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk (full diff of the changed region):

```diff
@@ -103,21 +103,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -132,22 +138,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
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
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

Checked against `/home/user/fleet/abort/tests/guides.test.ts:146-227`: the moved constants, the `documented`/`members`/`examples` bindings, and the `findMissing`/`findUnexampled` call shapes match that file byte for byte outside the `findDrift` block, which sits outside this package's guide.test.ts and outside this unit's scope. No other line in the file changed.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named three `policy/no-malformed-summary` diagnostics, all in `tests/setup.ts` (matching the standing conditions' `total 3 | summary 3 | banned 0 | tests/setup.ts(3)`):

```
tests/setup.ts:14:1: error policy(no-malformed-summary)
tests/setup.ts:20:1: error policy(no-malformed-summary)
tests/setup.ts:27:1: error policy(no-malformed-summary)
```

Before/after per diagnostic:

- `tests/setup.ts:14` — before: `/** The shared \`users\` / \`posts\` shape maps for the cross-suite integration tests. */` — after: `/** Holds the shared \`users\` / \`posts\` shape maps for the cross-suite integration tests. */`
- `tests/setup.ts:20` — before: `/** The shared relation map over {@link INTEGRATION_TABLES} — \`users\` has many \`posts\`. */` — after: `/** Holds the shared relation map over {@link INTEGRATION_TABLES} — \`users\` has many \`posts\`. */`
- `tests/setup.ts:27` — before: `/** A real driver boundary that injects one configured delete failure. */` — after: `/** Injects one configured delete failure through a real driver boundary. */`

`npx oxlint --config .oxlintrc.json --deny-warnings .` after the fixes: exit 0, no diagnostics.

`npm run test:policy` after the fixes: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0. No `prose` diagnostic named a line in `guides/**` or `README.md`, so no substitution-table edit applied there; the converge unit owns those sentences as scoped.

## Item 4 — the bump

`package.json`: `"version": "0.0.11"` → `"version": "0.0.12"`. `package-lock.json` untouched.

`npm run format` run after all edits (before format:check); it reformatted `tests/setup.ts` and `tests/guides.test.ts` line-wrapping only (no token or assertion moved).

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3, the file `oxlint` named), and nothing else.

2. `npm run format:check` — `All matched files use the correct format.`, exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.
   `npm run check` — `tsc --noEmit` on both projects, exit 0.

3. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 29 passed (29)`, exit 0.
   `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.
   `npm run test:config` — `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` — exit 1 (expected), `rows read: 1, disagreements found: 47`. Verbatim:

```
guides/relation.md function createRelationManager: guide "Create a `RelationManagerInterface` over a database and its relation map." source "Creates a relation manager over a database and its relation definitions."
guides/relation.md class RelationManager: guide "The relation registry — resolves relations once, vends a model per table." source "Resolves a `RelationsShape` once at construction and vends a typed `ModelInterface` per declared table."
guides/relation.md class Model: guide "A typed table paired with relation-aware `load` / `find` and junction methods." source "Pairs a typed table with relation-aware loading."
guides/relation.md function belongsTo: guide absent source "Builds a `belongs` relation — a foreign key on THIS table points at the related row."
guides/relation.md function hasMany: guide absent source "Builds a `many` relation — a foreign key on the RELATED table points back here."
guides/relation.md function hasOne: guide absent source "Builds a `one` relation — like `hasMany`, but a single related row."
guides/relation.md function hasThrough: guide absent source "Builds a `through` relation — a junction table links the two sides (many-to-many)."
guides/relation.md function hasMorph: guide absent source "Builds a `morph` relation — a polymorphic FK plus a discriminator on the RELATED table."
guides/relation.md function resolveRelation: guide "Resolve one raw `Relation` into a flat `ResolvedRelation`." source "Resolves one raw `Relation` value into a flat `ResolvedRelation`."
guides/relation.md function resolveRelationMap: guide "Resolve every entry of a `RelationMap`." source "Resolves every entry of a `RelationMap` into a name → `ResolvedRelation` map."
guides/relation.md function isRelationDescriptor: guide "Narrow a value to the object form of a relation." source "Narrows a value to a `RelationDescriptor` (the object form of a relation)."
guides/relation.md function readColumn: guide "Read one column off any record, whatever its declared type." source "Reads one column off any record."
guides/relation.md function countAttached: guide "Count the related rows one relation attached across a record set." source "Counts the related rows one relation attached across a record set."
guides/relation.md function indexRows: guide "Index rows by the string form of one column, for keyed lookups." source "Indexes rows by the string form of one column, for keyed lookups."
guides/relation.md function groupRows: guide "Group rows by the string form of one column, for many lookups." source "Groups rows by the string form of one column, for one-to-many lookups."
guides/relation.md class RelationError: guide "Carries a `RelationErrorCode` (`INVALID` / `UNKNOWN_RELATION` / `NOT_THROUGH`)." source "Represents an error thrown by the relations layer."
guides/relation.md function isRelationError: guide "Narrow an unknown caught value to a `RelationError`." source "Narrows an unknown caught value to a `RelationError`."
guides/relation.md type Relationship: guide absent source "Enumerates the relationships a relation can declare."
guides/relation.md interface RelationDescriptor: guide absent source "Represents the object form of a relation."
guides/relation.md type Relation: guide absent source "Represents a single relation definition."
guides/relation.md type RelationMap: guide absent source "Holds a model's relations, keyed by relation name."
guides/relation.md type RelationsShape: guide absent source "Holds per-table relation maps — the declarative input to `createRelationManager`."
guides/relation.md type ResolvedRelation: guide absent source "Represents a relation resolved at define-time into a flat, ready-to-load form."
guides/relation.md interface ResolvedBelongs: guide absent source "Represents a `belongs` relation resolved at define-time — the foreign key sits on THIS table."
guides/relation.md interface ResolvedMany: guide absent source "Represents a `many` relation resolved at define-time — the foreign key sits on the RELATED table."
guides/relation.md interface ResolvedOne: guide absent source "Represents a `one` relation resolved at define-time — `ResolvedMany`'s foreign key, one row."
guides/relation.md interface ResolvedThrough: guide absent source "Represents a `through` relation resolved at define-time — a junction table links the two sides."
guides/relation.md interface ResolvedMorph: guide absent source "Represents a `morph` relation resolved at define-time — a polymorphic foreign key and its discriminator."
guides/relation.md type RelationErrorCode: guide absent source "Names a machine-readable `RelationError` code."
guides/relation.md interface Include: guide absent source "Selects which relations to populate when loading — and, recursively, their own."
guides/relation.md type Loaded: guide absent source "Represents a row with its loaded relation properties attached."
guides/relation.md type LoadedMap: guide absent source "Holds the relation properties attached to a `Loaded` row — each relation name mapped to its loaded related row(s), or `undefined` when a `belongs` / `one` relation misses."
guides/relation.md interface RelationContext: guide absent source "Holds a related model's resolved relations and primary-key column, for nested loading."
guides/relation.md interface FindOptions: guide absent source "Configures pagination, ordering, and cancellation for `find`."
guides/relation.md type ModelEventMap: guide absent source "Declares the push observation surface of a `ModelInterface` — the eager-load + junction-management moments a fire-and-forget observer (logging, metrics, a sync layer) subscribes to."
guides/relation.md interface ModelInterface: guide absent source "Represents a typed table paired with relation-aware loading and junction management."
guides/relation.md interface RelationManagerOptions: guide absent source "Configures `createRelationManager`."
guides/relation.md interface RelationManagerInterface: guide absent source "Vends a typed `ModelInterface` per table."
guides/relation.md ModelInterface.load: guide absent source absent
guides/relation.md ModelInterface.find: guide absent source absent
guides/relation.md ModelInterface.link: guide absent source absent
guides/relation.md ModelInterface.unlink: guide absent source absent
guides/relation.md ModelInterface.links: guide absent source absent
guides/relation.md RelationManagerInterface.model: guide absent source absent
guides/relation.md RelationManagerInterface.names: guide absent source absent
guides/relation.md RelationManagerInterface.has: guide absent source absent
guides/relation.md pitch: readme absent tagline "A small, declarative ORM layer over the database module: name a table's relations once, then `load` / `find` records with their related rows already attached. Loading is batched — a direct relation uses one query across the whole record set, while a `through` relation uses two (junction then target); either count stays constant as the parent count grows. The relationships (`belongs` / `many` / `one` / `through` / `morph`) cover the FK shapes; nested includes recurse through the registry; `link` / `unlink` / `links` manage a many-to-many junction without hand-writing join rows. It deliberately stays thin above the typed store. Resolution is define-time (each relation is precomputed once into a flat `ResolvedRelation` — nothing is inferred while loading), and the loaded relation properties are intentionally loose (`Row | readonly Row[] | undefined`) rather than typed to each exact target row: the typed half is the table reached through `model.table`; relation loading is the looser convenience on top. No write-cascades, no lazy proxies, no query builder of its own — batched eager loading and junction management. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 47
```

This matches the P21 reading exactly and is the converge unit's worklist to close.

## Ancillary decisions

- No file item 3 touched sits under the off-limits list; all three summary rewrites landed in `tests/setup.ts`, an owned path.
- `test:policy` found no `prose` diagnostic in `guides/**` or `README.md`, so no substitution-table edit applied to either file in this unit; every sentence there stays the converge unit's.

---

Orchestrator's annotation (2026-09-08, from `d7n-relation-audit-verdict.md`): this report states counts in prose; the P.2 report's drop-in comparison cites line ranges that include each package's own executed section and states the pilot still reads `below`, which the pilot no longer does; the tree is authoritative. The unit's instruments are retained under `instruments/d7/units/relation/`.
