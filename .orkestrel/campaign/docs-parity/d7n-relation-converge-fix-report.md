# Report — `d7n-relation-converge-fix`

Wall clock: 2026-09-08T01:49:09Z to 2026-09-08T01:55:31Z, first command to last. Baseline `6ab44aa`,
checkout `/home/user/fleet/relation`. Every item closed; no stop condition fired.

Diffstat:

```text
 README.md             | 11 ++++++++---
 guides/relation.md    | 47 +++++++++++++++++++++++++----------------------
 src/core/Model.ts     | 12 ++++++------
 src/core/factories.ts |  6 +++---
 src/core/helpers.ts   | 24 ++++++++++++------------
 src/core/types.ts     | 29 +++++++++++++++--------------
 tests/guides.test.ts  |  2 +-
 7 files changed, 70 insertions(+), 61 deletions(-)
```

## Item 1 — the tagline (RL1, Ruling 6)

The brief's example wording, taken verbatim, in `guides/relation.md` and `README.md` alike. Only the
blockquote's second line moved, so the breaks the converged tip fixed are unchanged.

```diff
 > A small, declarative ORM layer over the `@orkestrel/database` tables: a table's
-> relations named once, then `load` / `find` records with their related rows already
+> relations named once, then records loaded or found with their related rows already
 > attached, batched so a direct relation costs one query across the whole record set and
 > a `through` relation two.
```

`load` and `find` no longer act as English verbs; the blockquote reads one nominal phrase from "A
small, declarative ORM layer" to "a `through` relation two".

## Item 2 — `FindOptions`'s cell (RL2, Ruling 21)

`src/core/types.ts:238` declares `export interface FindOptions extends OperationOptions` with
`limit?`, `offset?`, `sort?`, and `direction?` as its own members; `signal?` is the parent's.

```diff
-| `FindOptions`              | interface | `{ limit?, offset?, sort?, direction?, signal? }`  |
+| `FindOptions`              | interface | `OperationOptions plus { limit?, offset?, sort?, direction? }` |
```

The `### Types` convention sentence gained Ruling 21's clause:

```diff
-…with a union's arms escaped as `\|`.
+…with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
```

Every other `extends` declaration in `src/core`, ruled the same way: `grep -rn 'extends' src/core/*.ts`
returns `RelationError extends Error` (a class, not a Surface interface row) and the generic
constraints `T extends TableMap` and `K extends keyof T & string`. None is an extended interface, so
`FindOptions` is the only cell the ruling reaches, which is also the only site the closing brief lists.

## Item 3 — one term for the foreign key (RL3)

The `## Patterns` column header, the fence comments, and the titled pair's source side:

```diff
-| Relationship | Builder      | FK location        | Returns               |
+| Relationship | Builder      | Foreign key location | Returns               |
```

```diff
-			classification: belongsTo('classificationId', 'classifications'), // FK on accounts
-			contacts: hasMany('accountId'), // FK on contacts → accounts
-			profile: hasOne('accountId', 'profiles'), // single, FK on profiles
+			classification: belongsTo('classificationId', 'classifications'), // foreign key on accounts
+			contacts: hasMany('accountId'), // foreign key on contacts → accounts
+			profile: hasOne('accountId', 'profiles'), // single, foreign key on profiles
```

That block is the guide side of the titled pair at `### Defining relations`, so the same replacement
landed in the `@example` body of `createRelationManager` in `src/core/factories.ts`, keeping the pair
equal. The `## Surface` fence at `guides/relation.md:21` and the README's `## Usage` fence took it too.

The prose keeps "foreign key". The sweep also reached the doc-block prose where the alternation sat
inside one block — `belongsTo`'s description already read "a foreign key on the owning table" while
its `@param` line read "The FK column" — so `@param` and `@remarks` in `src/core/helpers.ts` and
`src/core/types.ts` now read "foreign-key column".

```text
$ grep -rn 'FK' src
src/core/helpers.ts:45:				`Relation '${name}': array form needs a string FK column`,
```

That survivor is a runtime error message. It is a string literal, and a doc-block edit moves no code
token, so it stays and is recorded as an observation.

## Item 4 — the half-swept prose (RL4)

`THIS table` / `RELATED table` became "the owning table" / "the related table", and `THIS model`
became "the owning model", at `src/core/types.ts:26-30`, `:135`, `:154`, `src/core/helpers.ts:305-306`,
and `:336`. `NAME` and `COUNT` lowered at `src/core/types.ts:254-255`, keeping the contrast in the
parallel "the relation name + the count of related rows attached". `AFTER` lowered as "strictly
after", the wording the guide's `## Contract` already uses for the same ordering, at
`src/core/types.ts:260`, `src/core/Model.ts:218`, and `:325`.

```diff
- * `belongs` — a foreign key on THIS table points at the related row (single).
- * `many` — a foreign key on the RELATED table points back here (array).
+ * `belongs` — a foreign key on the owning table points at the related row (single).
+ * `many` — a foreign key on the related table points back here (array).
```

```diff
- * `load` fires once per relation that an eager-load resolves, carrying the relation NAME +
- * the COUNT of related rows attached for the whole record set (it is the batched load
+ * `load` fires once per relation that an eager-load resolves, carrying the relation name +
+ * the count of related rows attached for the whole record set (it is the batched load
```

```diff
-			// Observe this relation's eager-load — AFTER it resolved + was attached, ONCE per
-			// relation (not per record — the batched load has no N+1, nor do its events),
-			// carrying the relation name + the total related rows attached across the set.
+			// Observe this relation's eager-load — strictly after it resolved + was attached,
+			// once per relation (not per record — the batched load has no N+1, nor do its
+			// events), carrying the relation name + the count of rows attached across the set.
```

Each rewritten block was rewrapped inside the file's existing envelope; no line exceeds the width the
untouched neighbours hold, and no hyphenated compound breaks across a line end (Ruling 22).

The closing sweep. Pattern `\b[A-Z]{3,}\b`, paths `src guides/relation.md README.md`:

```text
$ grep -rnE '\b[A-Z]{3,}\b' src guides/relation.md README.md
```

Every remaining hit is permitted, ruled by class:

- `INVALID`, `UNKNOWN_RELATION`, `NOT_THROUGH`, `ABORTED` — error codes, as code tokens in prose, as
  the arms of `RelationErrorCode`, and as `throw` arguments in `src/core/helpers.ts` and
  `src/core/RelationManager.ts`.
- `ORM` — the domain term, in the tagline of each file and in the `src/core/types.ts:13` file comment.
- `API` — the first-column header of each `## Surface` table, which Ruling 10 keeps as the guide's own.
- `CRUD` — the acronym, in `## Contract` item 2 and the `## Notes` bullet.
- `ESM` — the module format, beside `CommonJS` in the README's `## Requirements` list.
- `MIT`, `LICENSE`, `AGENTS.md`, `README.md` — a license name and file names.

No all-caps emphasis survives. `PUSH` at `src/core/Model.ts:77` is gone: see § Ancillary decisions.

## Item 5 — the header (RL5, Ruling 21)

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

The region from `const root = ` through the manifest loop's closing brace was already the pilot's
bytes and stays untouched, confirmed before and after the edit:

```text
$ diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '58,269p' tests/guides.test.ts)
NO DIFFERENCE
```

## Item 6 — the titled fence's lead-in (RL6, Ruling 21)

One complete sentence between `### Defining relations` and its fence, outside the fence:

````diff
 ### Defining relations
 
+Declare every relationship with its builder, then load a record with the chosen relations
+attached:
+
 ```ts
````

That is the only fence the closing brief lists. The criterion's sweep over `guides/relation.md` and
`README.md` also named the README's `## Install` and `## Usage` fences; both took a lead-in. See
§ Ancillary decisions for the divergence that creates.

## Item 7 — the `Returns` chrome (RL7)

```diff
-| `load`   | `Promise<Loaded<T> \| undefined>` (or array) | Loads one record by key with the chosen relations populated, or a positional array of records for an array of keys. |
+| `load`   | `Promise<Loaded<T> \| undefined>` | Loads one record by key with the chosen relations populated, or a positional array of records for an array of keys. |
```

The `Summary` already spells both forms, so nothing was lost. `npx oxfmt --write` then narrowed the
`Returns` column across that table, which is the only other change in the `#### ModelInterface` block.

## Item 8 — propagation

```text
$ npx oxfmt --write guides/relation.md README.md tests/guides.test.ts src/core/types.ts src/core/helpers.ts src/core/Model.ts src/core/factories.ts
Finished in 1148ms on 7 files using 4 threads.
exit 0

$ npm run docs
rows read: 1, disagreements found: 0
exit 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit 0
```

`git status --short` is unchanged by both write directions, so neither reader rewrote a file.

## Criterion 1 — status

```text
$ git status --short
 M README.md
 M guides/relation.md
 M src/core/Model.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. The instruments sit in `tmp/d7n-relation-converge-fix/`, which `.gitignore` covers
(`git check-ignore -v tmp/d7n-relation-converge-fix/edit.py` → `.gitignore:11:tmp`).

## Criterion 2 — format, lint, typecheck

```text
$ npx oxfmt --check guides/relation.md README.md tests/guides.test.ts src/core/types.ts src/core/helpers.ts src/core/Model.ts src/core/factories.ts
Checking formatting...
All matched files use the correct format.
Finished in 488ms on 7 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
(no output)
exit 0

$ npm run check
> @orkestrel/relation@0.0.12 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
exit 0
```

## Criterion 3 — the readers at zero

Recorded under § Item 8 — propagation.

## Criterion 4 — the mechanical checks, red first then green

The whole set runs from `tmp/d7n-relation-converge-fix/criterion4.sh`, which is not fail-fast, so one
run records every check. Readings before the edits (`criterion4.before.txt`) and after
(`criterion4.after.txt`).

Before, on `6ab44aa`, the whole script verbatim:

```text
== tagline diff (guide 3-6 vs README 3-6); empty is pass
== tagline carries 'then `load` / `find`'; empty is pass
guides/relation.md:4:> relations named once, then `load` / `find` records with their related rows already
README.md:4:> relations named once, then `load` / `find` records with their related rows already
== grep -c 'OperationOptions plus' guides/relation.md (want 1)
0
== grep -c "An extended interface's name comes before" guides/relation.md (want 1)
0
== grep -n 'FK location\|// FK' guides/relation.md README.md; empty is pass
guides/relation.md:21:			classification: belongsTo('classificationId', 'classifications'), // FK on accounts → one classification
guides/relation.md:22:			contacts: hasMany('accountId'), // FK on contacts → many contacts back here
guides/relation.md:167:			classification: belongsTo('classificationId', 'classifications'), // FK on accounts
guides/relation.md:168:			contacts: hasMany('accountId'), // FK on contacts → accounts
guides/relation.md:190:| Relationship | Builder      | FK location        | Returns               |
README.md:45:			classification: belongsTo('classificationId', 'classifications'), // FK on accounts
README.md:46:			contacts: hasMany('accountId'), // FK on contacts → back here
== grep -nE '\b(THIS|RELATED|NAME|COUNT|AFTER)\b' src/core/{types,helpers,Model}.ts; empty is pass
src/core/types.ts:26: * `belongs` — a foreign key on THIS table points at the related row (single).
src/core/types.ts:27: * `many` — a foreign key on the RELATED table points back here (array).
src/core/types.ts:30: * `morph` — a foreign key plus a discriminator column on the RELATED table (array, polymorphic).
src/core/types.ts:135: * `through` is the junction table, `source` its foreign-key column pointing at THIS
src/core/types.ts:154: * it, and `label` the discriminator value identifying THIS model.
src/core/types.ts:254: * `load` fires once per relation that an eager-load resolves, carrying the relation NAME +
src/core/types.ts:255: * the COUNT of related rows attached for the whole record set (it is the batched load
src/core/types.ts:260: * option), never onto this map, and sits AFTER the load resolves / the junction op completes
src/core/helpers.ts:305: * @param source - The junction FK column pointing at THIS model
src/core/helpers.ts:336: * @param label - The discriminator value identifying THIS model
src/core/Model.ts:218:		// Observe the inserted junction row — AFTER the driver write, so a swallowed listener
src/core/Model.ts:325:			// Observe this relation's eager-load — AFTER it resolved + was attached, ONCE per
== drop-in header diff (pilot 1-3 vs this 1-3); empty is pass
3c3
< // package's own, as is the executed section that closes the file.
---
> // package's own, and are the only part a sibling package changes.
== grep -c '(or array)' guides/relation.md (want 0)
1
== fences directly under a heading; empty is pass
151 -> 153
384 -> 386
395 -> 397
== done
```

The tagline diff of `sed -n 3,6p` across the two files printed nothing before the edits and prints
nothing after: the round changed both sides identically.

After, the whole script verbatim:

```text
== tagline diff (guide 3-6 vs README 3-6); empty is pass
== tagline carries 'then `load` / `find`'; empty is pass
== grep -c 'OperationOptions plus' guides/relation.md (want 1)
1
== grep -c "An extended interface's name comes before" guides/relation.md (want 1)
1
== grep -n 'FK location\|// FK' guides/relation.md README.md; empty is pass
== grep -nE '\b(THIS|RELATED|NAME|COUNT|AFTER)\b' src/core/{types,helpers,Model}.ts; empty is pass
== drop-in header diff (pilot 1-3 vs this 1-3); empty is pass
== grep -c '(or array)' guides/relation.md (want 0)
0
== fences directly under a heading; empty is pass
== done
```

The fence sweep's `384 -> 386` and `395 -> 397` are `README.md` line 14 (`## Install`) and line 25
(`## Usage`): `awk` carries `NR` across files, and `guides/relation.md` ran 370 lines.

## Criterion 5 — the suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  32 passed (32)
   Duration  564ms (transform 180ms, setup 197ms, import 130ms, tests 80ms, environment 0ms)
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  648ms (transform 266ms, setup 180ms, import 139ms, tests 209ms, environment 0ms)
exit 0
```

Observation, the package's narrowest unit script:

```text
$ npm run test:src:core
 Test Files  5 passed (5)
      Tests  65 passed (65)
   Duration  923ms (transform 707ms, setup 795ms, import 288ms, tests 577ms, environment 1ms)
exit 0
```

No suite ran long enough for the sibling load to matter; every duration reported is under a second.

## Ancillary decisions recorded

- **The tagline's wording and breaks.** The brief's example, verbatim. `records loaded or found`
  carries the same fact as `` `load` / `find` records `` without the code tokens acting as verbs, and
  it fits the existing second line, so no other break moves.
- **The `### Defining relations` lead-in.** "Declare every relationship with its builder, then load a
  record with the chosen relations attached:" — Ruling 21 asks a titled fence's sentence to name what
  the demonstration builds, and that fence imports every builder, declares one of each, and loads a
  record through the manager it built.
- **The README's `## Install` and `## Usage` lead-ins.** Added, because criterion 4's fence sweep
  covers `README.md` and reported both. Ruling 21's own wording binds a fence "in a guide", and the
  pilot's `README.md` carries bare fences under those headings (`abort/README.md` line 12 -> 14 and
  line 23 -> 25), as does every sibling README the same sweep reaches. So relation's README now
  diverges from the fleet on this point. The criterion is satisfied; the divergence is flagged for the
  Orchestrator under § Observations.
- **`PUSH` at `src/core/Model.ts:77` lowered.** The closing sweep's pattern admits it and the brief's
  permitted set — `ORM`, `FK` as a code token, `API`, `CRUD`, error codes — cannot rule it, so leaving
  it would have left the sweep with an unrulable hit. It is the same all-caps emphasis item 4 names,
  in a `//` comment, in a file item 4 already reaches, and the edit moves no code token.
- **`ONCE` at `src/core/Model.ts:325` lowered** with the `AFTER` on the same comment, for the same
  reason.
- **`AFTER` lowered as "strictly after", not "after".** The guide's `## Contract` item 6 already reads
  "strictly after the load resolves and after the junction operation completes", so the ordering
  emphasis the capital carried survives in the guide's own term rather than in a second synonym.
- **The `FK` sweep reaches doc-block prose beyond the sites item 3 names.** The alternation RL3
  reports sits inside single blocks: `belongsTo`'s description reads "a foreign key on the owning
  table" while its `@param` read "The FK column". Correcting only the fences would have left each
  builder's block contradicting itself. `@param` and `@remarks` in `src/core/helpers.ts` and
  `src/core/types.ts` now read "foreign-key column"; no description paragraph moved, so `npm run docs`
  stays at zero.
- **`+` left as the connective in the `ModelEventMap` `@remarks`.** The compared description paragraph
  of the same block reads "the eager-load + junction-management moments", and that paragraph is
  off-limits to a prose-only edit, so changing only the remarks would have split one block's usage.

## Observations

- `src/core/helpers.ts:45` keeps `FK` in the runtime error message
  `` `Relation '${name}': array form needs a string FK column` ``. It is a string literal, not prose,
  and this unit moves no code token. Closing it is a successor unit's call.
- The README fence lead-ins put relation's README out of step with every sibling README, including the
  pilot's. Either criterion 4's sweep is the fleet rule and the pilot owes the same edit, or the sweep
  belongs to `guides/**` alone and this README's addition is relation-only. The Orchestrator owns that
  call; this unit satisfied the criterion as written.

## Deviation state

None. No gate outside the owned files went red, and no cell needed a form Ruling 12 cannot express.
