# Report — `d7n-budget-converge`

Wall clock: 2026-09-07T15:13:17Z → 2026-09-07T15:22:19Z. Baseline `3e77fe5`, clean at start.

## Criterion 1 — red-first on the unconverged tree

The three cases landed first: `findDrift` imported beside the existing readers, `GUIDE_SPEC = 'guides/budget.md'` at file scope, `README.md` added to `ROOT_FILES`, the `own` manifest binding, the pin and the README case at file scope, and the equality case inside the manifest loop's `describe(entry.concept)` block after the methods loop.

`npm run test:guides` — `Tests  3 failed | 26 passed (29)`. The first lines of each failing case, verbatim:

`pairs at least one example title across the guide and the source`:

```
+ [
+   "guides/budget.md pairs: guide [\"Surface\",\"Race work against the ceiling\",\"A token budget folded into an agent loop's bound\",\"Re-arm per request, spend across the session\",\"Reuse a handle with clear()\"] source []",
+ ]
```

`opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:108:20
    108|  expect(pitch).not.toBeUndefined()
```

`Budget > keeps every compared summary and example equal to its source` — `AssertionError: expected [ …(18) ] to deeply equal []`, opening:

```
+   "guides/budget.md function createBudget: guide \"Create a `BudgetInterface<T>` for `max` with a `consumer`, optionally a trace `id` and a parent `signal`.\" source \"Creates a cumulative budget whose native signal aborts at its ceiling.\"",
+   "guides/budget.md function createTokenConsumer: guide \"Create a unary consumer that charges one selected `TokenUsage` field.\" source \"Creates a validated token consumer for one selected usage field.\"",
+   "guides/budget.md function createTokenBudget: guide \"Create a `BudgetInterface<TokenUsage>` charging a chosen `scope` field (`completion` default / `total` / `prompt`).\" source \"Creates a token budget charging one validated usage field per provider call.\"",
```

The equality case's collected list matched the brief's worklist row for row, minus the pitch, which the README case carries.

## Criterion 2 — the headers and the class rows

- `guides/budget.md:51` `### Entities` → `### Classes`. Its only row's `Kind` is `class`. No class is documented under its own heading in this guide: `grep -n '^#\+ '` after the edit lists `### Factories`, `### Validators`, `### Helpers`, `### Classes`, `### Types`, the `## Patterns` sub-headings, and `#### \`BudgetInterface\``, which is a method group. So the table's single row is the whole population.
- `guides/budget.md:77` Methods header `Behavior` → `Summary`.
- `guides/budget.md` `### Types` gained `Summary` as its last column; `Shape` kept every type literal. The convention sentence under the heading: "A `Shape` cell holds an interface's members in braces, and a type alias's value."

`Shape` literals that stayed, one per row: `BudgetOptions` `{ id?: string; max: number; consumer: (value: T) => number; signal?: AbortSignal }`; `TokenBudgetOptions` `{ id?: string; max: number; scope?: TokenScope; signal?: AbortSignal }` (the inlined union replaced by the declared `TokenScope`, which the row below spells out); `BudgetInterface` `{ id, signal, max, consumed, remaining, exhausted, start, consume, clear }`, the members-by-name idiom the pilot's `AbortInterface` row uses in place of a full member list; `TokenScope` `'completion' \| 'total' \| 'prompt'`; `TokenUsage` `{ prompt: number; completion: number; total: number }`.

The clause after each em dash moved out of `Shape` into the doc block, verb-first: `BudgetOptions`' "options for `createBudget` / the constructor", `TokenBudgetOptions`' "options for `createTokenBudget`", `TokenScope`'s "the exported token-usage field selector" (already carried by its description), and `TokenUsage`'s "the canonical LLM cost unit, the typical `T` for an agent budget". `BudgetInterface`'s cell was prose rather than a literal, so its prose moved into the block and the braces idiom replaced it.

The first column's header text (`API`, `Type`, `Method`) is untouched.

## Criterion 3 — the blocks rewritten by hand, then propagated

Every row whose cell carried information its block lacked was rewritten first. The blocks, by file:

`src/core/factories.ts`
- `createBudget` — description now names the returned contract and the two required options; a new `@remarks` carries the optional trace `id` and parent `signal` the old cell named.
- `createTokenConsumer` — description gained "unary" and the `TokenUsage` field the old cell named.
- `createTokenBudget` — description states the preference as the contract it returns, `BudgetInterface<TokenUsage>`; the `@remarks` gained the `scope` selectors the old cell listed, keeping its default and its boundary sentence.

`src/core/validators.ts`
- `isBudgetAmount` — "a valid budget amount" replaced by the finite nonnegative condition the old cell named.
- `isBudgetSignal` — gained the non-throwing behaviour on hostile input.
- `isTokenScope` — gained the `TokenScope` selector the old cell named.
- `isTokenUsage` — gained the three finite nonnegative counts and the non-throwing return; its `@remarks` sentence was pruned to the part the description does not repeat, the containment of a hostile getter and a revoked proxy.

`src/core/helpers.ts`
- `validateBudgetOptions` and `validateTokenBudgetOptions` — each description gained the fresh copy that omits absent optional keys; each `@remarks` lost the sentence the description now repeats and keeps the exactly-once read.

`src/core/Budget.ts`
- `Budget` — description rewritten to the class's own contribution, `Implements \`BudgetInterface\` over a private \`AbortController\` the instance owns, …`, so the class row and the `BudgetInterface` row no longer carry one sentence.

`src/core/types.ts`
- `BudgetOptions`, `TokenBudgetOptions` — each gained the consumers its `Shape` clause named.
- `BudgetInterface` — rewritten to the contract's parts, distinct from the class row.
- `TokenUsage` — gained the LLM cost unit and the typical `T` its `Shape` clause named.
- `BudgetInterface.start`, `.consume`, `.clear` — each gained the behaviour the old Methods cell carried: the aborted re-arm past `max`, the consumer-first order with the accepted overshoot, and the reset to `0` with the unaborted signal.

`TokenScope`'s description was already the summary and was not rewritten.

`npm run docs -- --to guide`:

```
wrote guides/budget.md
rows read: 1, disagreements found: 19, written: 18, reported: 1
```

The one reported row was the pitch, which the seed states is authored by hand. `npx oxfmt --write guides/budget.md` re-aligned the tables and moved no cell.

## Criterion 4 — the titled pair

The pair is `createBudget`'s `@example` block in `src/core/factories.ts` and the first fence under `### Race work against the ceiling` in `guides/budget.md`.

Selection: `createBudget` is the primary factory, the first `create*` the facts block lists. Two headings' first fences demonstrate it — `## Surface` and `### Race work against the ceiling`. I took the pattern heading, matching the accepted pilot, whose title is `Create and abort` rather than `Surface`: a section name reads as a section, and the pilot's shape is what the audit compares against. Recorded as the ancillary choice the deviation contract grants.

Checks before titling:

```
$ grep -n '^#\+ Race work against the ceiling' guides/budget.md
105:### Race work against the ceiling
```

The fence body carries no three-backtick run and no doc-comment terminator; the only ` ``` ` in the scanned span is the fence's own opener.

The block was titled first, keeping a short placeholder body, and `npm run docs` then read the pair as the sole example disagreement:

```
guides/budget.md Race work against the ceiling: guide "ts\nimport { createBudget } from '@orkestrel/budget'\n\nconst budget = createBudget<number>({ max: 1_000_000, consumer: (bytes) => bytes })\nbudget.start()\n…" source "ts\nconst budget = createBudget<number>({ max: 1_000_000, consumer: (bytes) => bytes })"
rows read: 1, disagreements found: 2
```

`npm run docs -- --to source`:

```
wrote src/core/factories.ts
rows read: 1, disagreements found: 2, written: 1, reported: 1
```

The reported row is the pitch. `createBudget`'s concise construction snippet was kept as a second, untitled `@example` block beneath the titled one, the shape the pilot's `createAbort` block takes, so titling cost the factory no short example. `grep -n '@example' src/core/*.ts` reports exactly one titled block across the source: `src/core/factories.ts:26`.

## Criterion 5 — the tagline, the displaced prose, and the pitch

The `guides/budget.md` H1 blockquote is one noun phrase in plain text and code spans, no link and no bold:

```
> The cost primitive: a cumulative consumption tally against a ceiling that exposes an
> `AbortSignal` firing the moment `consumed` reaches `max`.
```

`README.md` carries the same text under its H1 with the same line breaks; `diff` over the two spans reports no difference.

The displaced sentences fold into the guide's opening prose after the blockquote, as two paragraphs rather than one — an ancillary shape decision, recorded. Neither restates a tagline clause.

- Opening paragraph, wholly new: "The `consume` method runs the consumer you configured over each domain value and adds the validated charge to a running `consumed` total, so one ceiling bounds a lifetime of requests rather than a single call. Race the handle's `signal` against the work, or fold that signal into a loop's bound, to cap how much the work may burn — tokens, bytes, or calls."
- Second paragraph, carrying the old blockquote's displaced sentences: "This is the substrate's third bounding signal" became "A budget is the substrate's third bounding signal" and "A budget deliberately carries" became "The primitive deliberately carries", so the paragraph does not open and continue on one subject word. Its remaining sentences, including the source line, are the old text unchanged.
- `## Surface` lead-in changed from "Create a cost handle, `start()` it, and race its `signal` against work; `consume(value)` to charge the tally as work spends:" to "Create a cost handle, `start()` it, and charge it as the work spends:", because the racing clause it carried now sits in the opening paragraph four lines earlier. No test reads that line; the flagship-fence presence guards read fence lines only.

`README.md` opening paragraph, replacing the old pitch paragraph and keeping the onboarding the README alone carries — the `createTokenBudget` convenience over `TokenUsage`, and the `@orkestrel` line membership: "Create a handle with the `createBudget` function, give it the `max` ceiling and the `consumer` that reads a charge out of your domain value, and call `consume(value)` at each step that spends. Use the `createTokenBudget` factory where the cost unit is LLM token usage: it wraps the canonical `TokenUsage` record so you write no consumer of your own. Part of the `@orkestrel` line."

The rest of the README — install, requirements, usage fence, the explanatory paragraph, guide, package, license — is untouched.

`guides/budget.md` § Tests names the equality gate descriptively, with no SQ/MQ/EQ/RQ identifier: every `Summary` cell against its declaration's description paragraph, the titled `Race work against the ceiling` fence against the `@example` block of that title (pinned so the titled pair cannot be retired silently), and the README pitch against this guide's tagline.

## Criterion 6 — the seed at zero

```
$ npm run docs
rows read: 1, disagreements found: 0
docs exit: 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0     exit 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0     exit 0
```

`rows read` is non-zero in each.

## Criterion 7 — the gates

Scoped over the owned paths `README.md guides/budget.md src/core/Budget.ts src/core/factories.ts src/core/helpers.ts src/core/types.ts src/core/validators.ts tests/guides.test.ts`:

```
$ npx oxfmt --check <paths>              All matched files use the correct format.    exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <paths>   no output              exit 0
$ npm run check                          no diagnostics                               exit 0
$ npm run test:guides                    Test Files  1 passed (1)   Tests  29 passed (29)
$ npm run test:policy                    Test Files  1 passed (1)   Tests  90 passed | 1 skipped (91)
```

The three cases named in criterion 1 are green inside that `test:guides` run.

Observation, the narrowest unit script: `npm run test:src:core` — `Test Files  4 passed (4)`, `Tests  132 passed (132)`, duration 872ms. Taken inside this unit's own exec, so the authoritative reading is the Orchestrator's.

## Criterion 8 — the tree

```
$ git status --short
 M README.md
 M guides/budget.md
 M src/core/Budget.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts

$ git diff --stat
 8 files changed, 179 insertions(+), 73 deletions(-)
```

Owned files only. `package.json` and `package-lock.json` untouched; no vendored file, no `tests/setup*.ts`, no `tests/src/**`, no `guides/README.md`, no `src/**` code outside doc blocks. No lint control was planted.

## Reader and seed defects

None met. `replaceCell` wrote every located `Summary` cell across a three-column table and the four-column Types table without disturbing a `Shape`, `Kind`, or `Returns` cell, and `oxfmt` restored the alignment. `replaceExample` wrote the titled block and left the untitled sibling in the same comment alone. The only row either write direction reported is the pitch, with the seed's own reason: `the README pitch is authored by hand`.

## Deviations

None. Two ancillary decisions are recorded in place: the titled fence is the `### Race work against the ceiling` pattern rather than the also-eligible `## Surface` fence, and the displaced tagline sentences sit as two opening paragraphs rather than one.
