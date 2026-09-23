# Unit F8d IMPORTANCE-LONGHANDS, round 3 — report

## Edits applied

1. `tests/service/tailwind/consumer.test.ts`, comment of "keeps an important shared declaration
   whatever the recipe withholds": now reads "...so the plant is what drives the branch:
   importance on the `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule
   declares, in a layer of its own the way a release shipping such a declaration would land it."

2. Same case: replaced the single `expect(longhands.get('col-1')).toEqual(...)` statement with:

   ```ts
   const declared = requireValue(longhands.get('col-1'), 'The instrument declares no col-1 rule')
   expect(declared).toEqual(['grid-column-start', 'grid-column-end'])
   ```

3. Same case: inserted, directly before `expect(standalone).not.toEqual([])`:

   ```ts
   // Each reading has to carry the longhands the plant made important, or the comparison that
   // follows runs over nothing.
   for (const snapshot of standalone)
   	expect(declared.filter((property) => !snapshot.has(property))).toEqual([])
   ```

4. Comment of "keeps a shared name on the line while its importance covers only some of the
   longhands Tailwind declares" now reads: "Tailwind's `col-1` rule declares the
   `grid-column-start` and `grid-column-end` longhands, and the plant makes the
   `grid-column-start` longhand important, so Tailwind's rule would still win the
   `grid-column-end` longhand: the name is not important under the rule, and the equality still
   needs it on the exclusion line."

5. `tests/setupServer.test.ts`: removed the two `Object.isFrozen` statements from the head of
   "reports a name whose importance covers every longhand it has to cover, across the rules naming
   it", and appended the same two statements to the end of the `server setup` inventory case
   "declares the identity constants, ...", after its `expect(Object.keys(setup).sort()).toEqual(...)`
   statement.

6. Same file, comment inside "keeps a name out whose importance covers only some of its longhands
   or another longhand, or that declares its longhands normally" now reads: "A rule declaring
   every longhand the `table` name has to cover, each normally, so a reading that counts declared
   longhands rather than important ones reports the `table` name."

7. `tests/setupServer.ts` header comment now ends "...its stage expands as `LonghandRule` values."

8. Same file, `LonghandRule` remark now reads "...The stage in the `tests/setupService.ts` module
   returns this shape for each rule it expands in Chromium, so the longhands it carries are the
   ones a page resolves."

9. `guides/veneer.md` § Tailwind now reads "...that branch is driven by planted `!important`
   declarations on the `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule
   declares..."

No other text in any owned file changed beyond these edits (no rewrap was needed; each changed
line stayed under 100 columns).

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write` (owned files) | 0 | Finished in 4813ms on 4 files |
| `npx oxfmt --config .oxfmtrc.json --check` (owned files) | 0 | All matched files use the correct format |
| `npx oxlint --config .oxlintrc.json --deny-warnings` (owned TS files) | 0 | no output, no warnings |
| `npm run check` | 0 | tsc + check:src + check:app all clean |
| `npm run build:src` | 0 | built in 48ms |
| `npm run build:src:styles` | 0 | built in 828ms |
| `npm run test:setup -- tests/setupServer.test.ts` | 0 | 93 passed (93) |
| `npm run test:setup -- tests/setupService.test.ts -t "expands each rule"` | 0 | 1 passed \| 23 skipped (24) |
| `npm run test:guides` | 0 | 18 passed (18) |
| `npm run test:service -- tests/service/tailwind/consumer.test.ts` (unplanted, first run) | 0 | 8 passed (8) |

## Plant records

**Plant A** (`consumer.test.ts`, `longhands.get(name) ?? []` → `[]` in the `properties` build):
`npm run test:service -- tests/service/tailwind/consumer.test.ts` failed the case "keeps an
important shared declaration whatever the recipe withholds" with:

```
AssertionError: expected [ 'grid-column-start', …(1) ] to deeply equal []
- []
+ [ "grid-column-start", "grid-column-end" ]
 ❯ tests/service/tailwind/consumer.test.ts:205:67
```

That is the guard inserted by edit 3 (`expect(declared.filter(...)).toEqual([])`), as required.
After applying the exact reverse edit (`longhands.get(name) ?? []` restored), the same command
ran green: 8 passed (8).

**Plant B** (`setupServer.ts`, `collectImportantNames`,
`properties.every((property) => important.includes(property))` → `important.length > 0`):
`npm run test:service -- tests/service/tailwind/consumer.test.ts` failed the case "keeps a shared
name on the line while its importance covers only some of the longhands Tailwind declares" with:

```
AssertionError: expected [ 'col-1' ] to not include 'col-1'
 ❯ tests/service/tailwind/consumer.test.ts:237:25
   expect(important).not.toContain('col-1')
```

That is the partial-importance case's assertion, as required (`not.toContain('col-1')`, the line
directly reading `important`). After applying the exact reverse edit, the same command ran green:
8 passed (8).

## Status and diff (verbatim)

`git status --porcelain`:

```
 M guides/veneer.md
 M tests/service/tailwind/consumer.test.ts
 M tests/service/tailwind/preflight.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
```

`git diff cdf7f55 --stat`:

```
 guides/veneer.md                         |  23 ++++---
 tests/service/tailwind/consumer.test.ts  |  74 +++++++++++++++-------
 tests/service/tailwind/preflight.test.ts |   4 +-
 tests/setupServer.test.ts                | 103 +++++++++++++++++++++++++++----
 tests/setupServer.ts                     | 103 ++++++++++++++++++++++++++-----
 tests/setupService.test.ts               |  19 +++++-
 tests/setupService.ts                    |  36 ++++++-----
 7 files changed, 279 insertions(+), 83 deletions(-)
```

`tests/service/tailwind/preflight.test.ts` and `tests/setupService.ts`/`tests/setupService.test.ts`
carry only the round-1/round-2 writes (off-limits for this round; untouched by this unit). This
round's own owned-file edits are contained inside `tests/service/tailwind/consumer.test.ts`,
`tests/setupServer.test.ts`, `tests/setupServer.ts`, and `guides/veneer.md`.

## Deviations

None. Every edit's search text was found once and exactly once in its named file, and no plant's
observed failure diverged from the brief's named expectation.

## Claims flagged as unverified

None. Every gate and every plant reading above was executed by this unit and read directly from
its own output in this session.
