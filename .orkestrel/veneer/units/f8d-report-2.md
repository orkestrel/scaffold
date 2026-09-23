# Unit F8d IMPORTANCE-LONGHANDS, round 2 — report

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-f8d` (detached at `cdf7f55`,
round-1 writes uncommitted). Every carried finding is closed, both mutations redden their case and
their exact reverse edits restore green, and every gate named in § Acceptance criteria exits 0.

## Carried findings

1. **Claim 5, one declaration.** Closed.
   - `tests/setupServer.ts`: `LonghandRule` is the only declaration of the shape. Its members carry
     the ordering facts: `selector` "as Chromium serializes it for an expanded rule", `properties`
     "in Chromium order for an expanded rule", `important` "in the same order". The sentence "That
     stage's rule satisfies it." is deleted; the remark now says the stage in
     `tests/setupService.ts` returns this shape for each rule it expands. The file header names the
     type import too: `tests/setupService.ts` "reads the built cascade through `SheetReader` and
     returns the rules its stage expands as `LonghandRule`."
   - `tests/setupService.ts`: `StageRule` is deleted. `import type { LonghandRule } from
     './setupServer.js'` is added beside the existing value import from that module.
     `StageManager.expand` returns `Promise<readonly LonghandRule[]>` and its local array is
     `LonghandRule[]`. The `@returns` names `{@link LonghandRule}`, and the `@remarks` paragraph is
     rewrapped.
   - `tests/service/tailwind/preflight.test.ts`: the import is `import type { LonghandRule } from
     '../../setupServer.js'` and `treated` is `readonly LonghandRule[]`. No other line changed.
   - No inventory lists type names: `grep -rn StageRule` over the tree, excluding `node_modules`,
     `dist`, and `tmp`, exits 1.
2. **Claim 6, the prose.** Closed.
   - `guides/veneer.md` § Tailwind, equality paragraph: the paragraph names the unexcluded instrument
     and the built cascade in place of "two sheets". It writes "on the `grid-column-start` and
     `grid-column-end` longhands Tailwind's `col-1` rule declares" in place of "both longhands",
     "The partial-importance plant" in place of "A second plant", and "the `col-1` class" in place of
     the bare token. The rule's statement stays only in its owning paragraph ("The exclusion line
     names the class names…"). The equality sentence now reads "the derived names that the rule
     stated with the exclusion line keeps on the line". The branch sentence reads "the shared names
     that rule lets leave the line". Every changed line is at or under 100 columns. Line 402 is the
     only line over 100 columns in the range from 386 to 418, and it is the unchanged link line.
   - `tests/service/tailwind/consumer.test.ts`: the branch comment reads "importance on
     `grid-column-start` and `grid-column-end`, the longhands Tailwind's `col-1` rule declares". The
     partial case's comment reads "Tailwind's `col-1` rule declares `grid-column-start` and
     `grid-column-end`, and the plant makes `grid-column-start` important, so Tailwind's rule would
     still win `grid-column-end`".
   - Sweep: `git diff cdf7f55 -U0` added lines, grepped case-insensitively for
     `two|both|second|three|should|simply|just|currently|now|new|latest|via|etc|once|since|above|below`.
     The hits are `new Set` and `new Map` (code), and "once each" in the `collectRuleLonghands` TSDoc,
     which means one time each and is a permitted sense.
3. **O1, the shared fixture.** Closed. `tests/setupServer.ts` exports `SHARED_LONGHANDS:
   Readonly<Record<string, readonly string[]>>`, placed after `LEDGER_SHIPPED`. The record and each
   of its arrays is `Object.freeze`d, and the constant has TSDoc. It is inventoried in the
   export-name list of `tests/setupServer.test.ts` between `ORACLE_TIMEOUT` and `SheetReader`, and
   it is imported by the proof. The describe-scope `new Map([...])` is gone. Each case passes
   `new Map(Object.entries(SHARED_LONGHANDS))`.
   - **Decision (form):** a frozen record, not a `ReadonlyMap`. `Object.freeze` on a `Map` leaves
     `set` working, so a frozen `Map` would pass `Object.isFrozen` without being immutable.
   - **Decision (freeze assertion):** `tests/setupServer.test.ts` had no freeze assertion before
     this round (`grep -n "isFrozen\|freeze"` returned nothing). The "reports a name whose
     importance covers every longhand…" case now opens with `Object.isFrozen` on the record and on
     each of its values, which follows the pattern `tests/setupStyles.test.ts` uses.
4. **Referral, the normal-declaration control.** Closed. The case, retitled "keeps a name out whose
   importance covers only some of its longhands or another longhand, or that declares its longhands
   normally", gains `{ selector: '.table', properties: ['border-top-width'], important: [] }`.
   `table` declares every longhand it has to cover in this rule, all of them normally. The mutation
   record follows.
5. **Referral, the vacuous assertion.** Closed.
   `expect(properties).toEqual(expect.arrayContaining(['grid-column-start', 'grid-column-end']))`
   is removed from the branch case. `expect(longhands.get('col-1')).toEqual([...])` and
   `expect(branch).toContain('col-1')` carry the claim.
6. **Claims 3 and 4, the settling runs.** Recorded in the following section.

## Fixture name

`SHARED_LONGHANDS` (`{QUALIFIER}_{NOUN}`): the longhands each planted shared name has to cover.

## Mutation record (finding 4)

The site is `tests/setupServer.ts`, `collectImportantNames`, in the `rules.flatMap` callback. The
mutant replaces `? rule.important : []` with `? rule.properties : []`. The command is
`npm run test:setup -- tests/setupServer.test.ts -t collectImportantNames`.

| Tree state | Result |
| --- | --- |
| Mutant planted, control not yet added | `Tests 2 passed \| 91 skipped (93)`. This shows the gap. |
| Mutant planted, control added | `Tests 1 failed \| 1 passed \| 91 skipped (93)`: the "keeps a name out…" case reports `AssertionError: expected [ 'table' ] to deeply equal []`. |
| Exact reverse edit (`rule.properties` back to `rule.important`) | `Tests 2 passed \| 91 skipped (93)` |

## Settling runs (finding 6)

The tree was built with `npm run build:src && npm run build:src:styles` (exit 0; `dist/src/styles/index.css` is
135.19 kB).

- **Claim 3:** `npm run test:setup -- tests/setupService.test.ts -t "expands each rule"` gives
  `Test Files 1 passed (1)` and `Tests 1 passed | 23 skipped (24)` in 2.80s. The pinned order
  `['margin-top', 'grid-column-start', 'grid-column-end', 'color']` and importance
  `['grid-column-start', 'grid-column-end', 'color']` hold in Chromium.
- **Claim 4, red:** the per-name plant sits at `tests/setupServer.ts`, `collectImportantNames`, in
  the push condition: `properties.every((property) => important.includes(property))` becomes
  `important.length > 0`, so the condition reads `if (properties.length > 0 && important.length > 0)`.
  Running `npm run test:service -- tests/service/tailwind/consumer.test.ts` exits 1 with
  `Tests 1 failed | 7 passed (8)`. The failure is `FAIL |service| … > keeps a shared name on the
  line while its importance covers only some of the longhands Tailwind declares` with
  `AssertionError: expected [ 'col-1' ] to not include 'col-1'`.
- **Claim 4, green:** after the exact reverse edit, the same command gives `Tests 8 passed (8)` in
  4.94s.

## Gate exits

Every gate ran from `/home/user/veneer-f8d` after the plants were reversed.

- `npx oxfmt --config .oxfmtrc.json --write` over the seven owned files exited 0.
  `npx oxfmt --config .oxfmtrc.json --check` over the same files exited 0 and reported "All matched
  files use the correct format."
- `npx oxlint --config .oxlintrc.json --deny-warnings` over the six owned TypeScript files exited 0.
- `npm run check` exited 0.
- `npm run test:setup` exited 0 with `Test Files 4 passed (4)` and `Tests 236 passed (236)`.
- `npm run build:src && npm run build:src:styles && npm run test:service` exited 0 with
  `Test Files 3 passed (3)` and `Tests 18 passed (18)`. The wall time was 12.60s, reported as an
  observation, and no timeout occurred.
- `npm run test:guides` exited 0 with `Test Files 1 passed (1)` and `Tests 18 passed (18)`.

## `git status --porcelain`

```text
 M guides/veneer.md
 M tests/service/tailwind/consumer.test.ts
 M tests/service/tailwind/preflight.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
```

## `git diff cdf7f55 --stat`

```text
 guides/veneer.md                         |  23 ++++---
 tests/service/tailwind/consumer.test.ts  |  69 ++++++++++++++-------
 tests/service/tailwind/preflight.test.ts |   4 +-
 tests/setupServer.test.ts                | 102 ++++++++++++++++++++++++++----
 tests/setupServer.ts                     | 103 ++++++++++++++++++++++++++-----
 tests/setupService.test.ts               |  19 +++++-
 tests/setupService.ts                    |  36 ++++++-----
 7 files changed, 273 insertions(+), 83 deletions(-)
```

## Shared-file patches

None. This round needs no `ROADMAP.md` change beyond the closing text the round-1 report returned.

## Deviations

None that stop the unit. The unit settled these ancillary choices inside the owned scope:

- It chose the frozen record over a `ReadonlyMap`, for the reason given under finding 3.
- It added the freeze assertion, because the brief refers to one that did not exist in
  `tests/setupServer.test.ts`.
- It retitled the control case to name the normal-declaration branch it now proves.
- It rewrapped the `expand` `@remarks` paragraph.
