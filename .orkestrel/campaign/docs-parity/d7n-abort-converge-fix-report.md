# Report — A.2-fix `d7n-abort-converge-fix`

Every item landed. The seed reads `rows read: 1, disagreements found: 0` after the last write, and
each acceptance criterion exits 0. `git diff --stat` lists the owned files and nothing else.

## Per item

**Item 1 — the guide's opening paragraph.** `guides/abort.md` hunk `@@ -4,7 +4,15 @@`. The
paragraph opens on the fact the tagline does not carry, and the tagline's clauses (the trace `id`,
the standard `AbortSignal`, the parent link and the cascade) are gone from it:

```text
The native signal is the complete observation contract: hand it to any cancellable API, inspect
`aborted` and `reason`, or subscribe to its standard `abort` event. Where a parent was given, that
signal fires when either the handle's own `abort()` is called or the parent aborts, with no
listener bookkeeping to write. Async layers bound their work against a `signal`. Deliberately
thin. It does **not** re-implement cancellation machinery — the native `AbortController` is the
engine; `Abort` only adds a traceable `id` and parent-linking on top. It does **not** wrap the
signal in a bespoke interface, so it stays interoperable with `fetch`, streams, and every Web API
that already speaks `AbortSignal`. Source: [`src/core`](../src/core). Surfaced through the
`@src/core` barrel.
```

Every fact the brief listed as kept is present: the cancellable-API hand-off, the fire-on-either
rule, "no listener bookkeeping", the async-layers sentence, "Deliberately thin" with its
`does **not**` sentences, the native observation contract, and the `Source:` link sentence. The
hand-off and the observation contract now share the opening sentence rather than sitting apart.
Wrapped by hand to a 98-column maximum, the width the tagline above it and the reference guide
`/home/user/fleet/guide/guides/guide.md:6-21` use.

**Item 2 — the README's opening paragraph.** `README.md` hunk `@@ -4,10 +4,10 @@`:

```text
Create a handle with the `createAbort` function, hand its signal to the fetch,
stream, or queue task the handle bounds, and call `abort()` to cancel that work.
Pass a parent handle's signal where the work is a step of a larger job you
cancel as a whole. Part of the `@orkestrel` line.
```

It names what a visitor does first, states the condition for passing a parent rather than restating
the cascade, and keeps the `@orkestrel` line sentence. `createAbort` is the only code token it
introduces ahead of the first fence; `abort.signal` is gone. Wrapped to the file's own prose width.

**Item 3 — the description paragraphs that carried a shared sentence.** Source hunks: `src/core/factories.ts @@ -2,8 +2,9 @@`,
`src/core/Abort.ts @@ -2,8 +2,9 @@`, `src/core/types.ts @@ -13,8 +13,9 @@`. The cells the seed
then wrote: `guides/abort.md @@ -24,9 +32,9 @@` (Factories) and `@@ -43,18 +51,20 @@` (Classes and
Types). Each states what is distinct:

- `createAbort` — "Creates a cancellation handle from validated options and returns it as an
  {@link AbortInterface} — a resolved trace `id` and a `signal` already linked to any parent given,
  so a caller holds the published contract rather than the `Abort` class." The preference over
  `new Abort` is stated as the return type a caller depends on, because the construction paths
  are behaviorally equal — `createAbort` returns `new Abort(options)`, and
  `tests/src/core/Abort.test.ts` asserts that parity. Claiming the factory validates where the
  constructor does not would have been false.
- `Abort` — "Implements {@link AbortInterface} over a private `AbortController` the instance owns,
  resolving the trace `id` at construction and exposing either that controller's own `signal` or
  one linked to a parent."
- `AbortInterface` — "Represents the cancellation contract a consumer holds — a traceable `id`, the
  exposed `AbortSignal`, an `aborted` reading of it, and an idempotent `abort` that cancels the
  work bound to that signal."

Each opens on a third-person verb the vendored voice rule accepts, none names its own symbol in its
first sentence, and each `@remarks` keeps its reference material untouched. The `{@link}` tags
round-trip: the seed wrote each cell with the tag rendered as its target's code token, and the next
`npm run docs` read no disagreement.

**Item 4 — the `Shape` column and its stated convention.** `guides/abort.md` hunk `@@ -43,18 +51,20 @@`. The
`AbortInterface` cell is now `` `{ id, signal, aborted, abort }` ``, and the sentence under
`### Types` reads:

```text
A `Shape` cell holds an interface's members in braces, and a type alias's value.
```

Wording decision the brief left to me, recorded because it departs from the brief's phrasing. The
brief suggested "lists an interface's property names in braces". The `AbortOptions` row the brief
leaves unchanged carries `` `{ id?: string; signal?: AbortSignal }` `` — members with their types —
so "property names" would have shipped a convention sentence the row directly under it falsifies. I
wrote "members" instead, which is true of every row in the table as the brief leaves it and still
fixes the braces form the fleet copies. Making the sentence true the other way would mean rewriting
the `AbortOptions` cell, which item 4 does not authorize.

**Item 5 — the drop-in hoists the name mapping.** `tests/guides.test.ts` hunks
`@@ -150,26 +145,17 @@`, `@@ -177,7 +163,7 @@`, and `@@ -222,26 +208,21 @@`.
`const documented = group.methods.map((method) => method.name)` is bound beside `members` in the
methods loop and used at every `findMissing` site there, so
`expect(findMissing(members, documented)).toEqual([])` and `expect(findMissing(documented,
members)).toEqual([])` no longer wrap. The `${group.interface} examples` loop binds its own
`documented` and hoists the `examples` mapping to the loop body, leaving
`expect(findUnexampled(documented, fences, examples)).toEqual([])` in the case.

**Item 6 — the pin's title filter takes scaffold's inline form.** `tests/guides.test.ts` hunks
`@@ -44,14 +44,6 @@` (the `isTitle` predicate and its comment deleted) and `@@ -83,12 +75,15 @@`
(the pin). The pin builds a `Set` from the source titles and pairs each fence whose `title` is
defined and in that set:

```ts
	const declared = source
		.examples()
		.map((example) => example.title)
		.filter((title) => title !== undefined)
	const titled = new Set(declared)
	const headings: string[] = []
	const paired: string[] = []
	for (const fence of guide.fences()) {
		if (fence.title === undefined) continue
		headings.push(fence.title)
		if (titled.has(fence.title)) paired.push(fence.title)
	}
```

The both-sides failure line is unchanged in shape —
`` `${GUIDE_SPEC} pairs: guide ${JSON.stringify(headings)} source ${JSON.stringify(declared)}` `` —
with `headings` carrying the fence titles that are defined. `declared` is filtered before the `Set`
so the source side of that line reports titles rather than a `null` for each untitled `@example`
block.

**Item 7 — the `@remarks` that repeated their description.** Hunks
`src/core/helpers.ts @@ -8,8 +8,7 @@` and `@@ -85,9 +84,8 @@`, and
`src/core/validators.ts @@ -4,8 +4,7 @@`.

- `validateAbortOptions` — dropped "The returned object is a fresh copy and omits absent optional
  properties.", which the description already states. Kept the empty-object default, the once-read
  rule, and the no-composition boundary.
- `linkSignal` — dropped the clause repeating the description's `AbortSignal.any([own, parent])`
  return; the sentence now reads "The combined signal fires on EITHER the own signal aborting or the
  parent aborting — without re-implementing listener wiring." Kept the unchanged-own-signal case and
  the born-aborted parent.
- `isAbortSignal` — the remark is now "The platform `AbortSignal.prototype.aborted` getter performs
  the native brand check, and `Reflect.apply` calls it inside a contained boundary." The mechanism
  stays; the outcomes it repeated (rejecting structural spoofs, staying total for hostile or revoked
  proxies) live in the description.

No fact left any block: each cut sentence's content is in the description that displaced it.

**Item 8 — the reference word.** `guides/abort.md` hunk `@@ -43,18 +51,20 @@`:
`(Surface rows, above)` → `(Surface rows, earlier)`.

## Per criterion

**1. `git diff --stat` lists the owned files and no other.**

```text
 README.md              |  8 +++----
 guides/abort.md        | 34 +++++++++++++++++----------
 src/core/Abort.ts      |  5 ++--
 src/core/factories.ts  |  5 ++--
 src/core/helpers.ts    |  8 +++----
 src/core/types.ts      |  5 ++--
 src/core/validators.ts |  3 +--
 tests/guides.test.ts   | 63 ++++++++++++++++++--------------------------------
 8 files changed, 61 insertions(+), 70 deletions(-)
```

`git status --porcelain` reports the same paths, each ` M`, and nothing untracked.

**2a. `npx oxfmt --config .oxfmtrc.json --check README.md guides/abort.md src/core/Abort.ts
src/core/factories.ts src/core/helpers.ts src/core/types.ts src/core/validators.ts
tests/guides.test.ts`** — exit 0.

```text
All matched files use the correct format.
Finished in 457ms on 8 files using 4 threads.
```

**2b. `npx oxlint --config .oxlintrc.json --deny-warnings src/core tests`** — exit 0, no output.
oxlint 1.81.0 prints nothing on a clean run with explicit paths; it exits 1 with "No files found to
lint. Please check your paths and ignore patterns." when a path matches nothing, which these did
not. I planted no control, per the audit's ruling that the control reading is the Orchestrator's.

**2c. `npm run check`** — exit 0.

```text
> @orkestrel/abort@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

**3. The seed.** `npm run docs` — exit 0, `rows read: 1, disagreements found: 0`.
`npm run docs -- --to guide` — exit 0, `rows read: 1, disagreements found: 0, written: 0,
reported: 0`. `npm run docs -- --to source` — exit 0, `rows read: 1, disagreements found: 0,
written: 0, reported: 0`. The item-3 write that preceded these read
`wrote guides/abort.md` / `rows read: 1, disagreements found: 3, written: 3, reported: 0`, and the
scoped format ran after it.

**4a. `npm run test:guides`** — exit 0.

```text
 Test Files  1 passed (1)
      Tests  25 passed (25)
   Duration  606ms (transform 172ms, setup 28ms, import 320ms, tests 62ms, environment 0ms)
```

**4b. `npm run test:policy`** — exit 0.

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  905ms (transform 310ms, setup 26ms, import 326ms, tests 356ms, environment 0ms)
```

**4c. `npm run test:src:core`** — exit 0.

```text
 Test Files  4 passed (4)
      Tests  51 passed (51)
   Duration  658ms (transform 396ms, setup 64ms, import 534ms, tests 61ms, environment 1ms)
```

## Deviation state

None. No before-text was missing, no seed-written cell read wrong, and no gate read red. The item-4
wording departure is recorded under that item as a decision the brief delegated, not as a deviation.

## Observations for the fleet template

- A convention sentence added under a table binds every row of that table. Where the fixed
  instruction changes a cell, word the sentence against the rows that remain, or scope the
  untouched cell into the same item.
- A factory whose body is `new Class(options)` cannot claim validation the constructor lacks. State
  the preference as the returned contract, which is the real difference.
- `package.json` and the lockfile stayed untouched, and the `@orkestrel/guide@0.0.18` head start
  installed `--no-save` was not disturbed.
