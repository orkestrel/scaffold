# Unit U1b test-additions-successor — report

Every amendment landed and every acceptance criterion is closed. `npm run test:guides` is green, so
U1's one open claim is closed too.

## Amendments, by file and line

### 0. U1's patches A and B

**Patch A — `tests/setup.ts:76`.** `ROUTED_FENCES` gained
`'Read the classes and styles the markup carries': 'tests/src/browser/helpers.test.ts'`, between the
`Find a rule in the cascade` and `Remove an IndexedDB database` keys, which is the guide's own
Patterns order. The key carries the renamed heading, not U1's.

**Patch B — `tests/guides.test.ts`.**

- Line 2: `import type { EventSourceInterface, StateScenario } from '@src/core'`.
- Line 28: `executeScenarios` in the `@src/core` value import; lines 36 and 37:
  `STATECHART_ATTRIBUTES` and `STATECHART_STATUSES`. Both at the file's case-insensitive
  alphabetical slots.
- Lines 148 to 210: the module-scope fixture — `DisclosureState`, `DisclosureEvent`, the
  `Disclosure` entity, `DisclosureContext`, `arrangeDisclosure`, `actOnDisclosure`,
  `assertDisclosure`, `DISCLOSURE_SCENARIOS`, and `MISMATCHED_SCENARIOS`. `Disclosure` is declared
  ahead of `DisclosureContext`, which is the order the file's `no-use-before-define` reading wants.
- Lines 676 to 694: the transcription
  `it('walks the table and opens a failing row message with that row name')`, carrying the
  `// guides/test.md → Patterns → "Drive a statechart table".` marker, the disclosure walk, the
  failing-row message and its `cause`, and the four harness-attribute readings.
- Lines 702, 714, 730, and 745: `'src/core/constants.ts'` added to each of the four `src/core`
  inventory listings in
  `it('keys a walk root-relative, takes a named file whatever the filter says, and excludes below a directory')`.

`npm run test:guides` after patch A and patch B: `Test Files 1 passed (1)`,
`Tests 38 passed | 1 skipped (39)`.

### 1. `extractEscapes` renamed to `extractStyles`

- `src/browser/helpers.ts:1632` — the declaration; `src/browser/helpers.ts:1607` to `1631` — the
  TSDoc, rewritten. Its first sentence now names what the function returns: "Collects the markup of
  every element carrying a non-empty `style` attribute and of every `<style>` element, in document
  order, `root` included in both populations when it is an `Element`."
- `src/browser/helpers.ts:1635` and `1638` — the local accumulator renamed from `escapes` to
  `styled`, so the implementation carries one term.
- `tests/src/browser/helpers.test.ts:20` (import, moved after `extractOrphans` to keep the list
  alphabetical), `:2087` (the `describe` label), and every call in that block.
- `guides/test.md:290` — the § Surface → Browser → Helpers row.
- `guides/test.md:2297` — the § Patterns heading, now
  `### Read the classes and styles the markup carries`; `:2309`, `:2325` — the fence import and
  call; `:2578` — the § Tests entry.
- `tests/setup.ts:76` — the routed-fence key, and
  `tests/src/browser/helpers.test.ts:2153` — the carrier's marker comment, both carrying the
  renamed heading.
- `README.md:164`.
- `grep -rn extractEscapes src tests guides README.md` exits 1 with no output.

The "escape" vocabulary went with the name. `src/browser/helpers.ts` § remarks and
`guides/test.md:2335` now say what is reported rather than naming a second concept beside
`extractStyles`. This is the wording call the deviation contract leaves to me; I recorded it rather
than stopping.

### 2. `root` counted in both populations

The implementation already counted it: `extractStyles` seeds its element list with `root` when
`root instanceof Element` and then tests each element for a non-whitespace `style` attribute **or**
`localName === 'style'`, so a `<style>` root and a styled root each pass. What was missing was the
statement and the proof, and both landed.

- `src/browser/helpers.ts:1608` — the first sentence states `root` is included in both populations.
- `src/browser/helpers.ts:1622` to `1625` — the remark states the `DocumentFragment` root, the
  `<style>` root, the root carrying an inline attribute, and the once-only report.
- `guides/test.md:290` — the § Surface row summary ends "the root itself included".
- `tests/src/browser/helpers.test.ts:2100` —
  `it('counts a style root and a styled root, and leaves a root carrying neither out')`, replacing
  U1's narrower `reports the root itself when the root carries an inline style`. It asserts a
  `<style>` root returns its own markup, a `<section style="gap: 4px">` root returns its own markup,
  and a `<div>` root holding neither returns `[]`.
- `guides/test.md:2577` to `2578` — the § Tests entry names the replacement case.

Collection proof for the new case:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser -t "counts a style root"
 ✓ |src:browser (chromium)| tests/src/browser/helpers.test.ts:2100:2 > extractStyles > counts a style root and a styled root, and leaves a root carrying neither out 2ms
      Tests  1 passed | 220 skipped (221)
```

### 3. The § Limits statechart row carries the reuse reasoning

`guides/test.md:1217`. The row's `Why` cell keeps U1's text and adds, in order:

- no published package declares a generic transition record or a closure-walking runner;
- `@orkestrel/workflow` names a task's behavior with a string and sequences structurally, so it
  neither takes a scenario's closures nor drives `arrange`, `act`, and `assert` in order, and
  adopting it would move this package off layer 0 and pull that package's whole runtime graph into
  every consumer's test install;
- `STATECHART_STATUSES` names a harness's reported run state rather than a task's derived status, so
  it does not restate `TaskStatus`;
- `STATECHART_ATTRIBUTES` is the fleet contract the journey skill's statechart reference fixes for
  every harness and every gate, so it is a mechanism the fleet shares rather than one suite's policy.

The reasoning names `arrange`, `act`, and `assert` rather than counting them, because a scenario's
phases are a set the row itself says can grow.

The whole § Limits table was re-padded to the new column width: the `Why` field went from 833 to
1486 characters, so every row in the table changed by padding alone. `oxfmt` accepted the result
without rewriting it.

### 4. The `readClasses` sentence

- `guides/test.md:2299` to `2303` — the § Patterns opening paragraph now reads: "`readCascade` reads
  what the stylesheets define and `readClasses` reads what the markup carries, so the set difference
  between them is the authored-class census: the classes the markup uses and no loaded stylesheet
  declares."
- `guides/test.md:2320` to `2321` — the same sentence as a comment inside the fence, above the
  `undeclared` computation it explains.

## Gate output

Run in this checkout, in this order, after the final edit.

```text
$ npm run format:check
Checking formatting...
All matched files use the correct format.
Finished in 919ms on 59 files using 16 threads.

$ npm run lint:check
(no output; exit 0)

$ npm run check
tsc --noEmit --project tsconfig.json && npm run check:src
check:src:core, check:src:browser, check:src:server — all silent, exit 0

$ npm run test:src:core
 Test Files  3 passed (3)
      Tests  98 passed (98)

$ npm run test:src:browser
 Test Files  2 passed (2)
      Tests  221 passed (221)

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  38 passed | 1 skipped (39)

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  111 passed (111)

$ npm run test:setup
 Test Files  3 passed (3)
      Tests  24 passed (24)

$ grep -rn extractEscapes src tests guides README.md
(no output; exit 1)
```

`format:check` failed once before the final run, on `guides/test.md` alone, after the § Limits
re-padding. `npx oxfmt --config .oxfmtrc.json --write guides/test.md` — scoped to the one owned file
rather than the tree — settled it, and the re-check above is the run after that write.

The browser suite reports 221 both before and after this unit, because the new root case replaced
U1's narrower one.

## Review evidence

```text
$ git diff --stat
 README.md                         |  28 +++--
 guides/test.md                    | 243 +++++++++++++++++++++++++++++++++-----
 src/browser/helpers.ts            |  67 +++++++++++
 src/core/helpers.ts               |  71 +++++++++++
 src/core/index.ts                 |   1 +
 src/core/types.ts                 |  57 +++++++++
 tests/guides.test.ts              |  92 ++++++++++++++-
 tests/setup.ts                    |   1 +
 tests/src/browser/helpers.test.ts | 136 +++++++++++++++++++++
 tests/src/core/helpers.test.ts    | 225 ++++++++++++++++++++++++++++++++++-
 10 files changed, 880 insertions(+), 41 deletions(-)

$ git status --porcelain
 M README.md
 M guides/test.md
 M src/browser/helpers.ts
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/core/helpers.test.ts
?? src/core/constants.ts
```

The diff spans U1's work and this unit's together, because this unit continued on U1's uncommitted
tree. `tests/guides.test.ts` and `tests/setup.ts` are this unit's alone.

## Ancillary calls made and recorded

- **The "escape" vocabulary was dropped with the name.** Keeping it would have left the reader
  mapping `extractStyles` onto a word the ruling removed for colliding with the character-encoding
  sense in `@orkestrel/html` and `@orkestrel/console`.
- **U1's narrow root case was replaced rather than kept beside the new one.** The new case asserts
  the styled root that the old one asserted, so keeping both would have left the same claim in two
  places.
- **The § Surface row and the § Tests entries were updated beyond the four amendments.** The
  amendments made both false: the surface row said nothing about the root, and the § Tests entry
  named a case that no longer exists.
- **The § Tests entry for `tests/guides.test.ts` (`guides/test.md:2654`) gained the statechart
  transcription.** That entry lists what the guides suite runs, and the transcription this unit
  added was missing from it.
- **The § Limits table re-padding touches every row.** Only the statechart row's content changed;
  every other row differs by trailing spaces alone.

## Claims I could not close

None. Every acceptance criterion ran and returned the output recorded above.

The whole-suite reading (`npm test`) and the build were not taken here: this unit ran inside its own
exec, so a timing-sensitive whole-suite result taken here is systematically pessimistic. The
authoritative run belongs to the Orchestrator's independent `verifier`.
