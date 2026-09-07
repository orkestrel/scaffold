# Report — `d7n-timeout-converge-fix`

Every item landed. Every acceptance criterion passes. No deviation.

Touched: `/home/user/fleet/timeout/guides/timeout.md`, `/home/user/fleet/timeout/tests/guides.test.ts`. `README.md` was swept under item 5 and needed no correction.

Diffstat:

```text
 guides/timeout.md    | 34 +++++++++++++++++-----------------
 tests/guides.test.ts | 19 +++++++++----------
 2 files changed, 26 insertions(+), 27 deletions(-)
```

## Item 1 — the examples binding (claim 2)

The mapped `examples` ternary now sits beside `documented` at the `for (const group of guide.methods())` loop's own scope.

```diff
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
```

The loop is byte-identical to the pilot:

```text
$ diff <(awk '/for \(const group of guide.methods\(\)\) \{/,/^\t\t\}$/' /home/user/fleet/abort/tests/guides.test.ts) \
       <(awk '/for \(const group of guide.methods\(\)\) \{/,/^\t\t\}$/' /home/user/fleet/timeout/tests/guides.test.ts)
loop-diff-exit=0
```

## Item 2 — the constants' order (F6)

`GUIDE_SPEC` moved from after `ROOT_FILES` to the pilot's position between `EXAMPLE_LANGUAGE` and `MODULES`.

```diff
 const EXAMPLE_LANGUAGE = 'ts'
+/** The one guide this package sources, whose tagline the README pitch equals. */
+const GUIDE_SPEC = 'guides/timeout.md'
 /** Each import specifier this package's own guides may resolve against. */
 const MODULES = Object.freeze({ '@orkestrel/timeout': 'src/core', '@src/core': 'src/core' })
@@
 const ROOT_FILES = Object.freeze(['AGENTS.md', 'README.md'])
 
-/** The one guide this package sources, whose tagline the README pitch equals. */
-const GUIDE_SPEC = 'guides/timeout.md'
-
 const root = new URL('../', import.meta.url)
```

The block now differs from the pilot's only in this package's own constants:

```text
$ diff <(awk '/^\/\*\* Every fence language/,/^const ROOT_FILES/' /home/user/fleet/abort/tests/guides.test.ts) \
       <(awk '/^\/\*\* Every fence language/,/^const ROOT_FILES/' /home/user/fleet/timeout/tests/guides.test.ts)
6c6
< const GUIDE_SPEC = 'guides/abort.md'
---
> const GUIDE_SPEC = 'guides/timeout.md'
8c8
< const MODULES = Object.freeze({ '@orkestrel/abort': 'src/core', '@src/core': 'src/core' })
---
> const MODULES = Object.freeze({ '@orkestrel/timeout': 'src/core', '@src/core': 'src/core' })
```

## Item 3 — the `Shape` idiom (Ruling 12, F1)

`TimeoutOptions` now carries bare names in braces with `?` on each optional member. `TimeoutInterface`'s form is untouched. The column's padding narrowed with the widest cell.

```diff
-| Type               | Kind      | Shape                                               | Summary                                                                                   |
-| ------------------ | --------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
-| `TimeoutOptions`   | interface | `{ id?: string; ms: number; signal?: AbortSignal }` | Represents the options `createTimeout` and the `Timeout` constructor accept.              |
-| `TimeoutInterface` | interface | `{ id, ms, signal, expired, start, clear }`         | Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry. |
+| Type               | Kind      | Shape                                       | Summary                                                                                   |
+| ------------------ | --------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
+| `TimeoutOptions`   | interface | `{ id?, ms, signal? }`                      | Represents the options `createTimeout` and the `Timeout` constructor accept.              |
+| `TimeoutInterface` | interface | `{ id, ms, signal, expired, start, clear }` | Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry. |
```

The convention sentence at the Types table already states the idiom the rewritten row carries ("A `Shape` cell holds an interface's members in braces."), and this package declares no type alias, so the sentence is unchanged.

Comparator output, splitting on a pipe not preceded by a backslash:

```text
$ node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/timeout HEAD guides/timeout.md
{
 "rowsBefore": 10,
 "rowsAfter": 10,
 "missing": [],
 "added": [],
 "changed": [
  {
   "key": "`TimeoutOptions`",
   "col": "Shape",
   "was": "`{ id?: string; ms: number; signal?: AbortSignal }`",
   "is": "`{ id?, ms, signal? }`"
  }
 ]
}
```

## Item 4 — the `Shape` members' sentence (objective F6)

The paragraph under the Types table now names the members as the interface's, and names where the reader finds them.

```diff
-The `id`, `ms`, `signal`, and `expired` members of `TimeoutInterface` are
-`readonly` data members (Surface rows, earlier) — its call-signature methods
-are documented under [Methods](#methods). `expired` derives directly from the
-owned signal's `aborted` state rather than storing a duplicate lifecycle flag.
+`TimeoutInterface` lists every member it declares. The `id`, `ms`, `signal`,
+and `expired` its `Shape` cell lists are `readonly` members with no method row;
+`start` and `clear` are its call-signature methods, documented under
+[Methods](#methods). `expired` derives directly from the owned signal's
+`aborted` state rather than storing a duplicate lifecycle flag.
```

The `## Methods` lead paragraph carried the same false claim — "stay Surface rows" for members that are rows nowhere — so it took the same correction. I decided this ancillary site rather than stopping: it is the identical defect in an owned file, and leaving it would leave F6 half closed.

```diff
 The public methods of `TimeoutInterface` — every call-signature member listed
-(its `readonly` data members `id` / `ms` / `signal` / `expired` stay Surface
-rows). `Timeout` implements the interface exactly, so this doubles as the
-class's instance-method surface (AGENTS.md, Documentation contract).
+(its `readonly` members `id` / `ms` / `signal` / `expired` have no method row).
+`Timeout` implements the interface exactly, so this doubles as the class's
+instance-method surface (AGENTS.md, Documentation contract).
```

## Item 5 — prose (F4, F5) and the sweep

Named sites:

```diff
-work — `clear()` the deadline if the work finishes first:
+work — call `clear()` on the deadline if the work finishes first:
@@
-An optional parent signal CLEARS the timeout rather than expiring it if it
+An optional parent signal clears the timeout rather than expiring it if it
 aborts before the deadline.
@@
 5. **Parent linking clears, never expires.** A parent `options.signal` abort
-   CLEARS the timeout — it does not expire the timeout, abort the timeout's own
+   clears the timeout — it does not expire the timeout, abort the timeout's own
```

The sweep found one further site, a count in Contract item 3, corrected by deleting the number and naming the members the pronoun would otherwise have left open:

```diff
 3. **Deadline signal and derived expiry.** The exposed `signal` fires (aborts)
-   on expiry. `expired` derives from that owned signal's `aborted` state, so the
-   two facts cannot drift.
+   on expiry. `expired` derives from that owned signal's `aborted` state, so
+   `expired` and `aborted` cannot drift apart.
```

Sweep patterns and their paths, over `guides/timeout.md` and `README.md`:

- All-caps emphasis, `grep -n '\b[A-Z][A-Z][A-Z]\+\b'`: hits at `guides/timeout.md:42` and `:132` are the `CLEARS` sites, corrected. Every other hit is an acronym, a filename, or a table header — `UUID`, `API`, `ESM`, `MIT`, `AGENTS.md`, `README.md`, `LICENSE`, and the `DOC ↔ SOURCE` invariant label. `README.md` hits are `ESM`, `UUID`, `MIT`, `LICENSE` only.
- Code token as an English verb, `grep -nE '`[a-zA-Z_]+(\(\))?` (the|a|an|it|its|this|that|them|your|every|each) '`: one prose hit, `guides/timeout.md:19`, corrected. The second hit is the `TimeoutInterface` `Shape` cell, not prose.
- Count in prose, `grep -nEi '\b(one|two|three|four|five|six|seven|eight|nine|ten|both|single|pair|half|each of the|several)\b'`: the Contract item 3 hit is corrected. Ruled permitted and left as they stand: the tagline's "time-bound half" and "time-and-cancellation pair", which name their members in the compound and are pinned to the README pitch by the docs gate; "both directions" in Contract items, where the sentence names each direction; "the titled pair", where the sentence names the fence and the block; "one handle serves a sequence", "one `setTimeout` made re-armable", and README's "a single typed entry point", each the pilot's own established form (`/home/user/fleet/abort/guides/abort.md:4`, `:29`, `:110`, `:124`, `:156`, `/home/user/fleet/abort/README.md:4`, `:59`), so changing them here would diverge from the accepted pilot without closing a finding. Remaining hits are Summary cells pinned to their doc blocks, which this unit cannot touch without a source edit.

`README.md` needed no correction, so `git status --short` lists two of the owned files.

## Item 6 and the acceptance criteria

**Criterion 1 — format, lint, typecheck.**

```text
$ npx oxfmt --check guides/timeout.md README.md tests/guides.test.ts
All matched files use the correct format.
Finished in 880ms on 3 files using 4 threads.
oxfmt exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings guides/timeout.md README.md tests/guides.test.ts
oxlint exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
check exit=0
```

**Criterion 2 — docs at zero, both directions written zero, the scoped suites green.**

```text
$ npm run docs
rows read: 1, disagreements found: 0
docs exit=0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
to-guide exit=0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
to-source exit=0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  29 passed (29)
test:guides exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
test:policy exit=0
```

**Criterion 3 — the comparator.** Its output under item 3 reports `"missing": []`, `"added": []`, and a single `changed` entry whose `col` is `Shape`. No row is missing or added, and every changed non-`Summary` cell is in `Shape`.

**Criterion 4 — status.**

```text
$ git status --short
 M guides/timeout.md
 M tests/guides.test.ts
```

**Observation, not a criterion.** `npm test` exits 0 on this host, last project reporting `Test Files 1 passed (1)`, `Tests 29 passed (29)`. Take the authoritative whole-suite reading outside this unit's exec.

## Deviation

None. No correction needed a file outside the owned set, and `docs` stayed at zero disagreements throughout.

---

**Orchestrator annotation (closure, 2026-09-07):** the closure `checker` read counts in this report's prose (the `changed` entry, the prose hit, the further site). The tree is authoritative; the report's prose faults stand annotated, not rewritten.
