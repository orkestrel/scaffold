# Unit F5b ACCOUNTING-LEDGER — report 4

Obligation 1 and obligation 2 are implemented. Acceptance criterion 3 is **red**: the site claim,
applied to the direct comparison path as the brief requires, refuses the real cascade, because the
official inventory records every `.row-gap-*` utility under two shipped components. The fix needs
`guides/ledger/departures.md` or `tests/fixtures/oracle/inventory.json`, both off-limits here. See
§ Deviation.

## Red then green

Command: `npm run test:setup`.

Before the change, with the plant present:

```text
 FAIL  |setup| tests/setupServer.test.ts > server setup > refuses one emitted declaration two shipped components claim through different paths
AssertionError: expected [Function] to throw an error
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 142 passed (143)
```

After the change:

```text
 Test Files  3 passed (3)
      Tests  144 passed (144)
```

The retained fallback-only plant (`refuses one emitted declaration two shipped components both
claim`) still passes unchanged.

## The refusal wording

Cross-path plant, both components named with the site:

```text
Components btn and close both claim .btn | — | --bs-btn-close-filter
```

Real cascade, from `npm run test:conformance`:

```text
Components row and row-gap both claim .row-gap-0 | — | row-gap
```

## The rewritten reason cell

`guides/ledger/additions.md`, the row whose Name cell is `` `button { transition }` `` under
`` `@media (prefers-reduced-motion: reduce)` ``:

Was:

```text
The `transition` mixin writes the reduced-motion pair beside every transition it emits, which the release leaves unpaired.
```

Is:

```text
The release declares no transition on a bare `button` element, and the `transition` mixin writes this one with its reduced-motion pair.
```

Every other cell of the row is unchanged. The release facts behind it:
`node_modules/bootstrap/dist/css/bootstrap.css` declares `button { border-radius: 0 }` and
`button:focus:not(:focus-visible) { outline: 0 }` and no `transition` on a bare `button`; its `.btn`
rule declares `transition: color 0.15s ease-in-out, …` with a
`@media (prefers-reduced-motion: reduce) { .btn { transition: none } }` pair.

## Touched files

- `tests/setupServer.ts` — added the exported `describeSite` writer; the direct comparison path now
  registers and checks its `selector | condition | property` claim before pushing a row; the
  fallback path claims through the same writer; each path refuses only a claim another component
  holds, so a repeated recorded write inside one component stays measured; the `collectValueGaps`
  remark states the claim across both paths.
- `tests/setupServer.test.ts` — the plant
  `refuses one emitted declaration two shipped components claim through different paths`; a proof
  that one component writing one site from two recorded rules stays measured; a direct proof of
  `describeSite`; `describeSite` added to the export inventory and the import list.
- `guides/ledger/additions.md` — the reduced-motion addition row's reason cell.

## Status and diffstat

```text
$ git status --porcelain
 M guides/README.md
 M guides/veneer.md
 M src/styles/components/_button.scss
 M src/styles/elements/_body.scss
 M src/styles/elements/_button.scss
 M tests/conformance.test.ts
 M tests/fixtures/oracle/inventory.json
 M tests/guides.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? guides/ledger/

$ git diff --stat 07fc3c3 -- tests/setupServer.ts tests/setupServer.test.ts
 tests/setupServer.test.ts |  701 ++++++++++++++++++++++--
 tests/setupServer.ts      | 1299 +++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 1916 insertions(+), 84 deletions(-)
```

Those diffstats carry every earlier round's writes as well as this one.

## Gate exits

| Command                                         | Exit | Reading                     |
| ----------------------------------------------- | ---- | --------------------------- |
| `npm run format:check`                          | 0    | All matched files, 211 files |
| `npm run lint:check`                            | 0    | No warning                  |
| `npm run check`                                 | 0    | Every project clean         |
| `npm run test:setup`                            | 0    | 144 passed (144)            |
| `npm run build:src && npm run test:conformance` | 1    | build 0, conformance red    |
| `npm run test:guides`                           | 0    | 18 passed (18)              |
| `npm run test:policy`                           | 0    | 109 passed, 1 skipped (110) |

## Deviation

**Expected.** `npm run build:src && npm run test:conformance` exits 0 after the direct path claims
its site.

**Found.** It exits 1 during measurement, before any guide comparison:

```text
 FAIL  |conformance| tests/conformance.test.ts [ tests/conformance.test.ts ]
Error: Components row and row-gap both claim .row-gap-0 | — | row-gap
 ❯ collectValueGaps tests/setupServer.ts:1571:12
 ❯ collectLedger tests/setupServer.ts:1857:15
 ❯ tests/conformance.test.ts:157:19
```

**Evidence.** `tests/fixtures/oracle/inventory.json` records the identical rule
`.row-gap-0 { row-gap: 0 }` under the `row` component and under the `row-gap` component, and both
are shipped. The same holds for every `.row-gap-*` utility. The condition predates this campaign:
the baseline `git show 07fc3c3:tests/fixtures/oracle/inventory.json` records `.row-gap-0` under both
keys too.

That duplicate already rode into the guide. `guides/ledger/departures.md` carries 36 pairs of rows
that name one emitted declaration twice, differing only in the Component cell:

```text
| `row`     | `.row-gap-0`     | `row-gap`       | —                          | `0`             | `var(--vn-gap-0)`    | tokenized |
| `row-gap` | `.row-gap-0`     | `row-gap`       | —                          | `0`             | `var(--vn-gap-0)`    | tokenized |
```

Every one of the 36 rows whose Component cell is `` `row-gap` `` is such a duplicate; that component
contributes no other departure row. So the missing direct-path claim is a real defect with a real
product: 36 duplicated rows the ledger states twice under two names. Claim 6 understated it.

**Done or not done.** Obligation 1 and obligation 2 are done as written. Criterion 3 is not met.

**Hypothesis.** The refusal is the wrong verdict for a direct-path collision, and a skip is the right
one. Where two components both record one selector with the same declaration, attributing the
measurement to the first is not a guess: `attributeSelector` already answers that way for the same
selector, because `recording.get('.row-gap-0')` returns `['row', 'row-gap']` in inventory order
(`row` at index 22, `row-gap` at index 122) and it takes the first shipped member. A fallback-path
collision is different — neither component records the emitted site there, so attributing it to the
first would be a guess, and refusing is right.

**What each resolution needs, for the Orchestrator to rule on.** Neither closes inside this unit's
owned files.

- Skip instead of refuse on the direct path. In `collectValueGaps`, replace the direct path's
  `throw` with a `continue`, leaving the fallback path's `throw` in place. The measurement then
  writes the `row`-attributed rows only, so `guides/ledger/departures.md` must lose its 36
  `` `row-gap` ``-attributed rows. That file is off-limits here, and no patch to it alone fixes the
  red gate, because the refusal fires during measurement.
- Stop the inventory double-recording. Record `.row-gap-*` under `row-gap` alone in
  `tests/fixtures/oracle/inventory.json`, which is off-limits here. The measurement then writes the
  `row-gap`-attributed rows, `departures.md` must lose its 36 `` `row` ``-attributed ones, and
  `attributeSelector` changes its answer for those selectors, so the additions ledger moves too.

I made no change under either resolution. The implementation stands exactly as obligation 1 words
it.

## The collision's extent, measured

A runtime probe under `tmp/probe/`, run through `npm run test:probe` and deleted before this report,
scanned every shipped component's recorded selectors for a selector two of them record. It reported:

```text
shared selectors 36 families [ 'row + row-gap' ]
control shared 0
```

`row` and `row-gap` are the only such pair, and they share 36 selectors — every `.row-gap-*`
utility, matching the 36 duplicated rows in `guides/ledger/departures.md`. The control re-ran the
same scan with `row` dropped from the shipped set and reported none, so the instrument answers from
its population rather than returning a constant. Nothing else hides behind the first collision.

## Claims flagged unverified

- The `npm run test:guides` and `npm run test:policy` runs read the ledger guides as they stand, not
  as either resolution would leave them.
- I did not measure what either resolution does to `guides/ledger/additions.md`. Only the
  inventory-side resolution can move an addition row, because it changes what `attributeSelector`
  answers for `.row-gap-*`.
