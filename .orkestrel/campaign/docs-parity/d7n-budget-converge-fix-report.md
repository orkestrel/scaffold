# Report — `d7n-budget-converge-fix`

Every item landed in `/home/user/fleet/budget`. The tree I leave is `1e05e18` plus modifications to `guides/budget.md` and `tests/guides.test.ts`, and nothing else. No deviation.

## Item 1 — the opening paragraph (F1)

`guides/budget.md:6`. The mechanism sentence goes; § Surface's "What happens" at `:24` owns it. The replacement says what a budget handle is, what it stands in for, what the reader does with `signal`, and what the charge unit can be. No clause of the tagline at `:3-4` is restated.

```diff
-The `consume` method runs the consumer you configured over each domain value and adds the validated charge to a running `consumed` total, so one ceiling bounds a lifetime of requests rather than a single call. Race the handle's `signal` against the work, or fold that signal into a loop's bound, to cap how much the work may burn — tokens, bytes, or calls.
+A budget handle is what an agent loop holds to keep a whole run inside one cost limit, in place of a cost check written at every call site. Hand its `signal` to the work, race that signal against a call, or fold it into a loop's bound. You define what is spent — tokens, bytes, dollars, or calls — so the same handle covers a provider's token usage and a pipeline's byte throughput.
```

## Item 2 — `GUIDE_SPEC` (F2)

`tests/guides.test.ts:267`, the flagship-fences binding, now reads the path through the constant declared at `:32`, as the pilot does at `/home/user/fleet/abort/tests/guides.test.ts:266`. No other site in the file carries the literal.

```diff
 describe('flagship fences', () => {
-	const guideText = requireValue(files['guides/budget.md'], 'Missing file: guides/budget.md')
+	const guideText = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)
```

## Item 3 — the `Shape` idiom (Ruling 12)

`guides/budget.md:60` states the idiom the rows now carry: bare member names in braces, `?` for optional, call-signature members after `plus`, an alias's own literal with `\|` arms, no member types. `TokenScope` already read as its own escaped literal and is unchanged; `BudgetInterface` splits its data members from its call-signature members; the rest drop member types. The table is re-padded to the width its cells now need.

```diff
-A `Shape` cell holds an interface's members in braces, and a type alias's value.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
```

| Row | Was | Is |
| --- | --- | --- |
| `BudgetOptions` | `{ id?: string; max: number; consumer: (value: T) => number; signal?: AbortSignal }` | `{ id?, max, consumer, signal? }` |
| `TokenBudgetOptions` | `{ id?: string; max: number; scope?: TokenScope; signal?: AbortSignal }` | `{ id?, max, scope?, signal? }` |
| `BudgetInterface` | `{ id, signal, max, consumed, remaining, exhausted, start, consume, clear }` | `{ id, signal, max, consumed, remaining, exhausted } plus start, consume, clear` |
| `TokenUsage` | `{ prompt: number; completion: number; total: number }` | `{ prompt, completion, total }` |

The sentence following the table (`:70`) still holds: the `readonly` data members it names are the same members, and the methods it points at are the ones after `plus`.

`node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/budget HEAD guides/budget.md`:

```json
{
 "rowsBefore": 18,
 "rowsAfter": 18,
 "missing": [],
 "added": [],
 "changed": [
  {
   "key": "`BudgetOptions`",
   "col": "Shape",
   "was": "`{ id?: string; max: number; consumer: (value: T) => number; signal?: AbortSignal }`",
   "is": "`{ id?, max, consumer, signal? }`"
  },
  {
   "key": "`TokenBudgetOptions`",
   "col": "Shape",
   "was": "`{ id?: string; max: number; scope?: TokenScope; signal?: AbortSignal }`",
   "is": "`{ id?, max, scope?, signal? }`"
  },
  {
   "key": "`BudgetInterface`",
   "col": "Shape",
   "was": "`{ id, signal, max, consumed, remaining, exhausted, start, consume, clear }`",
   "is": "`{ id, signal, max, consumed, remaining, exhausted } plus start, consume, clear`"
  },
  {
   "key": "`TokenUsage`",
   "col": "Shape",
   "was": "`{ prompt: number; completion: number; total: number }`",
   "is": "`{ prompt, completion, total }`"
  }
 ]
}
```

No row is missing or added, and every changed cell sits in the `Shape` column.

## Item 4 — See also (F10)

`guides/budget.md:194`. The link text now matches its href and the pilot's form at `/home/user/fleet/abort/guides/abort.md:165`.

```diff
-- [`../README.md`](README.md) — the guides index.
+- [`README.md`](README.md) — the guides index.
```

## Acceptance criteria

### Criterion 1 — `oxfmt`, `oxlint`, `check` exit 0

`npx oxfmt --check guides/budget.md tests/guides.test.ts`:

```text
Checking formatting...

All matched files use the correct format.
Finished in 1556ms on 2 files using 4 threads.
fmt exit=0
```

`npx oxlint --config .oxlintrc.json --deny-warnings guides/budget.md tests/guides.test.ts` printed no diagnostic:

```text
lint exit=0
```

`npm run check`:

```text
> @orkestrel/budget@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

check exit=0
```

### Criterion 2 — `docs` at zero, `test:guides` and `test:policy` green

`npm run docs`:

```text
rows read: 1, disagreements found: 0
docs exit=0
```

`npm run test:guides`:

```text
 Test Files  1 passed (1)
      Tests  29 passed (29)
   Start at  16:04:05
   Duration  690ms (transform 203ms, setup 53ms, import 343ms, tests 84ms, environment 0ms)

guides exit=0
```

`npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Start at  16:04:09
   Duration  979ms (transform 343ms, setup 64ms, import 352ms, tests 366ms, environment 0ms)

policy exit=0
```

### Criterion 3 — the comparator's rows and columns

Reported under Item 3: `missing` and `added` are empty, and every entry in `changed` names the `Shape` column.

### Criterion 4 — the tree

`git status --short`:

```text
 M guides/budget.md
 M tests/guides.test.ts
```

`git diff --stat`:

```text
 guides/budget.md     | 20 ++++++++++----------
 tests/guides.test.ts |  2 +-
 2 files changed, 11 insertions(+), 11 deletions(-)
```

## Observations

- The convention sentence at `guides/budget.md:60` now carries the fleet idiom Ruling 12 fixes, so it no longer matches the sentence abort, csv, emitter, and `/home/user/fleet/guide/guides/guide.md:28` carry. Propagating it is outside this unit's owned pair; F3's carrier names the pilot as the landing site.
- `/home/user/fleet/abort/guides/abort.md:64` still renders `AbortOptions` with member types, so the pilot departs from Ruling 12 in the same way budget did. Reported, not touched.
