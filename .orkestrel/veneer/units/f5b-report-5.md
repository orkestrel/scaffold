# Unit F5b ACCOUNTING-LEDGER — report 5

Done. The direct-path collision is a skip, the ledger states each `.row-gap-*` difference once, and
every gate exits 0. No deviation.

Brief: `tmp/units/f5b-brief-5.md`, written from the Orchestrator's ruling on report 4's deviation.
`tmp/units/f5b-brief-4.md` stays unedited.

## The plant, red then green

Command: `npm run test:setup`. Plant:
`writes one row for a declaration two shipped components record identically`.

It builds one vocabulary recording `.row-gap-0 { row-gap: 0 }` and assigns it to both `row-gap` and
`row`, in that inventory order, while passing `shipped` as `['row', 'row-gap']`. Inventory order and
claim order therefore disagree, so the plant separates the ladder's answer from whichever component
claims first. It asserts `attributeSelector` answers `row-gap`, then asserts the measurement writes
one row attributed to `row-gap`.

Before the change, against brief 4's reader:

```text
 FAIL  |setup| tests/setupServer.test.ts > server setup > writes one row for a declaration two shipped components record identically
Error: Components row and row-gap both claim .row-gap-0 | — | row-gap
 ❯ collectValueGaps tests/setupServer.ts:1571:12
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 144 passed (145)
```

After the change:

```text
 Test Files  3 passed (3)
      Tests  146 passed (146)
```

Both refusals the ruling preserves still throw, run by name:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup -t 'claim'
 ✓ |setup| … > refuses one emitted declaration two shipped components both claim 7ms
 ✓ |setup| … > writes one declaration site as the line both comparison paths claim it by 0ms
 ✓ |setup| … > refuses one emitted declaration two shipped components claim through different paths 2ms
      Tests  3 passed | 143 skipped (146)
```

The cross-path plant still throws because `btn` records `.btn` and `close` records the withheld
`.btn-close-white`: different selectors, so `matchesRecording` answers false and `close` reaches
`.btn` only through the fallback path, which refuses as before.

## The rows that left

`guides/ledger/departures.md` carried a `` #### `row-gap` `` subsection whose every row duplicated a
`row`-attributed row. Removing the subsection removed its table with it, because no row survived in
it.

```text
$ grep -c '^| `row-gap`' guides/ledger/departures.md    # before
36
$ grep -c '^| `row-gap`' guides/ledger/departures.md    # after
0
```

The refresh loop named those exact rows before they left:

```text
$ npm run build:src && npm run test:conformance
 FAIL  |conformance| tests/conformance.test.ts > cascade ledger > names no departure the compiled cascade no longer carries
AssertionError: expected [ …(36) ] to deeply equal []
+   "row-gap | .row-gap-0 | row-gap | — | 0 | var(--vn-gap-0) | tokenized",
…
+   "row-gap | .row-gap-xxl-5 | row-gap | @media (width >= 1400px) | 3rem | var(--vn-gap-5) | tokenized",
```

`departures.unrecorded` was empty throughout, so the measurement never lost a difference: the
`row`-attributed rows it already carried are the ones that stayed. After the removal the guide holds
844 rows, every `.row-gap-*` site holds exactly one, and the only sites holding two rows are these,
where one component records one site twice from two of its own rules:

```text
reboot | pre  | font-size | — | 1em | 87.5% | declared
reboot | pre  | font-size | — | 0.875em | 87.5% | declared
reboot | code | font-size | — | 1em | 90% | declared
reboot | code | font-size | — | 0.875em | 90% | declared
reboot | kbd  | font-size | — | 1em | 87.5% | declared
reboot | kbd  | font-size | — | 0.875em | 87.5% | declared
```

That is the repeated recorded write the ruling keeps measured, and the real cascade carries it.

`guides/ledger/additions.md` is unchanged: `sha256` is
`f86686c2996ed99d1ece438711cfb639519ad50af051a524f72cec96c033d2e8` before this round and after it.

## The `collectValueGaps` remark

The `@throws` clause now reads:

```text
@throws When a shipped key has no official inventory, or when two shipped keys claim one site
  without recording it identically.
```

The remark keeps its first paragraph and gains this second one:

```text
Two keys recording one site identically is the exception, and it is repetition rather than
disagreement: the official inventory assigns a utility rule to every key whose prefix reaches it,
so `.row-gap-0` sits under `row` and under `row-gap` with the same declaration. There
{@link attributeSelector} names the one component that measures the site, and the other key's
pass over it writes nothing, so the ledger states the difference once.
{@link matchesRecording} is what separates that case from two keys recording one site
differently. One component writing a site it already holds is a repeated recorded write, and it
stays measured.
```

Its first paragraph's closing sentence changed from "the first claim holds the site and a second
component reaching it is refused" to "every row claims its `describeSite` site as it is written and
a second component reaching a site another key holds is refused", because the claim order no longer
decides who measures.

## Touched files

- `/home/user/veneer-f5b/tests/setupServer.ts` — added the exported `matchesRecording` predicate
  beside the attribution ladder; `collectValueGaps` builds the recording index once, asks
  `attributeSelector` which component owns each recorded selector, and skips a non-owner's pass over
  a site the owner records identically; the refusal, the repeated-write acceptance, and the fallback
  path are otherwise unchanged; the `@throws` clause and the remark state the skip.
- `/home/user/veneer-f5b/tests/setupServer.test.ts` — the plant
  `writes one row for a declaration two shipped components record identically`; a direct proof of
  `matchesRecording` over a matching value, a differing value, a differing condition, a differing
  selector, and a missing vocabulary; `matchesRecording` added to the export inventory and the
  import list.
- `/home/user/veneer-f5b/guides/ledger/departures.md` — the `` #### `row-gap` `` subsection and its 36
  duplicate rows removed.
- `/home/user/veneer-f5b/guides/ledger/additions.md` — owned this round, unchanged.

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
 tests/setupServer.test.ts |  753 +++++++++++++++++++++++--
 tests/setupServer.ts      | 1347 +++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 2016 insertions(+), 84 deletions(-)
```

`tests/fixtures/oracle/inventory.json` stays as this round found it; the ruling pins it and this
round did not open it. Those diffstats carry every earlier round's writes as well as this one.

## Gate exits

| Command                                         | Exit | Reading                      |
| ----------------------------------------------- | ---- | ---------------------------- |
| `npm run format:check`                          | 0    | All matched files, 211 files |
| `npm run lint:check`                            | 0    | No warning                   |
| `npm run check`                                 | 0    | Every project clean          |
| `npm run test:setup`                            | 0    | 146 passed (146)             |
| `npm run build:src && npm run test:conformance` | 0    | 17 passed (17)               |
| `npm run test:guides`                           | 0    | 18 passed (18)               |
| `npm run test:policy`                           | 0    | 109 passed, 1 skipped (110)  |

`npm run lint:check` first exited 1 on `no-shadow`, because the recording index took a name the
fallback loop's local already held in `collectValueGaps`. The index is named `recorders` and the
gate exits 0. Every gate in the table was re-run after that rename.

## Deviation

None. Every obligation and every acceptance criterion in `tmp/units/f5b-brief-5.md` is met.

## Claims flagged unverified

- I did not re-run the probe from report 4 against the changed reader. Report 4 measured that
  `row + row-gap` is the only pair of shipped components recording one selector, so the skip has one
  family to act on in this tree; a later inventory refresh can add another, and the conformance gate
  is what would report it.
- `matchesRecording` compares a recorded value textually, as the rest of the comparison does. Two
  components recording one site with values that differ only in whitespace or case read as
  differing, and the refusal fires rather than the skip. The real inventory carries no such pair.
- I did not measure the skip against a selector whose emitted block sits in a layer
  `LAYER_COMPONENTS` names. The owner reading passes `undefined` for the layer deliberately, because
  the question it asks is which shipped key the inventory records the selector under, so the layer
  branch never runs from here.
