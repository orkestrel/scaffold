# Report — U1 `d7-guide-readers`

Complete. `source.examples()` now returns the `@example` blocks of every exported declaration head
`collectKeys` names. The axis is declaration head against member, with no keyword carve-out. No
deviation.

## Per criterion

### 1. Red-first

Command: `npm run test:src:core`.

Baseline before any edit (`cfa1f73`, clean): `Test Files 8 passed (8)`, `Tests 588 passed (588)`.

After adding the tests, before touching `src/`:

```text
 Test Files  2 failed | 6 passed (8)
      Tests  7 failed | 591 passed (598)
```

The failing names, verbatim from that run:

```text
 FAIL  |src:core| tests/src/core/helpers.test.ts > extractExamples > collects a titled block above a class head, named for the class
 FAIL  |src:core| tests/src/core/helpers.test.ts > extractExamples > collects an untitled class-head block, which carries no title
 FAIL  |src:core| tests/src/core/helpers.test.ts > extractExamples > collects a titled block above a type head and above an interface head
 FAIL  |src:core| tests/src/core/helpers.test.ts > extractExamples > collects a block above a const head
 FAIL  |src:core| tests/src/core/helpers.test.ts > findDrift > reports a class-head block against a same-titled fence carrying another body
 FAIL  |src:core| tests/src/core/helpers.test.ts > locateComment > carries an example rewrite back into a class head, read by the reader the gate compares on
 FAIL  |src:core| tests/src/core/sources/Source.test.ts > Source > unions every declaration head across the module and leaves each member to the name overload
```

After the fix, same command: `Test Files 8 passed (8)`, `Tests 598 passed (598)`.

### 2. `extractExamples` collects every head key

`src/core/helpers.ts` — the membership test is now the key's shape, not its keyword:

```ts
		// A head key is `${keyword} ${name}` and a member key is `Owner.member`, so the dot is
		// what separates them and the block's name is the text past the head's one space.
		const key = keys.get(comment.line)
		if (key === undefined || key.includes('.')) continue

		const name = key.slice(key.indexOf(' ') + 1)
```

Controls in the suite, all in `describe('extractExamples')`:

- `collects an untitled class-head block, which carries no title` — the block is collected with
  `title` absent, and `extractExamples('export class Widget {}\n')` returns `[]`.
- `skips a member block, which the member reader collects instead` — the same body lines return
  `[]` from `extractExamples` and `['render']` from `extractExampleMethods`.
- `collects a titled block above a type head and above an interface head` — both collected, in
  file order.
- `collects a block above a const head`.
- `skips a block attached to a declaration no key names` — a block above `const hidden = true`
  contributes nothing.

### 3. `findDrift` over a class-head block

`describe('findDrift')`, built from inline guide text (`HEAD_GUIDE`) and an inline source inventory
(`headSource`):

- `reports nothing when a class-head block and the fence of its title agree`.
- `reports a class-head block against a same-titled fence carrying another body` — returns
  `[{ key: 'Build a widget', guide: 'ts\nnew Widget(1)', source: 'ts\nnew Widget()' }]`.

### 4. The seed's `--to source` direction over a head that is not a function

`describe('locateComment')` →
`carries an example rewrite back into a class head, read by the reader the gate compares on`.
It asserts `locateComment(text, 'class Widget')` returns the head's block span byte for byte, runs
`replaceExample` over that comment, splices the result back with `spliceSpan`, and reads the
rewritten block back through `extractExamples`.

### 5. Contract, doc block, and comment

- `src/core/types.ts` `SourceInterface.examples()` (no-argument overload) — description paragraph
  and `@returns` restated for the head reach; opens `Lists`.
- `src/core/types.ts` `SourceInterface.examples(name)` — description paragraph gained the sentence
  placing the head's own block on the other overload, so the paragraph states the axis.
- `src/core/helpers.ts` `extractExamples` doc block — description, `@returns`, and the executed
  `@example` all restated. The example now reads:

  ```ts
  const block = ['/**', ' * @example', ' * new Widget()', ' *' + '/', 'export class Widget {}', ''].join('\n')
  extractExamples(block) // [{ name: 'Widget', code: 'new Widget()' }]
  extractExamples('export class Widget {}\n') // []
  ```

  Both lines are asserted by
  `extractExamples > collects an untitled class-head block, which carries no title`, so the fence
  is executed rather than asserted present.
- `src/core/helpers.ts` `collectTitles` doc block — "the module's exported functions" became "the
  module's exported declaration heads"; it named functions, so it moved.
- `src/core/sources/Source.ts` `#scanExamples` comment — "exported-function `@example` blocks"
  became "exported declaration heads' `@example` blocks".

### 6. Guide sentences

`guides/guide.md:107`, the `extractExamples` row:

- before: `The exported functions' \`@example\` blocks, matched against shared eligible genuine JSDoc adjacency and aligned code.`
- after: `The exported declaration heads' \`@example\` blocks, matched against shared eligible genuine JSDoc adjacency and aligned code.`

`guides/guide.md:270`, the `examples` row of the `SourceInterface` methods table:

- before: `The \`@example\` blocks carried by the exported functions (or, given \`name\`, that declaration's own members) whose eligible leading JSDoc chain ends in a span carrying an \`@example\` tag opening a line at its first non-blank column. Given \`name\`, it follows no \`extends\` clause.`
- after: `The \`@example\` blocks carried by the exported declaration heads (or, given \`name\`, that declaration's own members) whose eligible leading JSDoc chain ends in a span carrying an \`@example\` tag opening a line at its first non-blank column. Given \`name\`, it follows no \`extends\` clause.`

`guides/guide.md:425` in § The extraction model, which also carries the dedupe limit:

- before: `adjacency parser and apply their distinct exported-function and callable-member grammars only to\n\`code\`.`
- after: `adjacency parser and apply their distinct declaration-head and callable-member grammars only to\n\`code\`. \`extractExamples\` dedupes by name and title, so a \`type\` and a \`const\` sharing one name\ncontribute the first block of a title rather than one block each.`

`guides/guide.md:433` and `:466`: read, unchanged. `:433` names the shared key grammar and the
readers that split their own part out of it, and `:466` names the `name` overload's asymmetry with
`methods`. Neither states the function-only reach.

The EQ row:

- before: `- **EQ — Example equality.** Every titled guide fence against the \`@example\` block of the same title,\n  body and fence language together. The pairing is per title across the document, not per heading: the`
- after: `- **EQ — Example equality.** Every titled guide fence against the \`@example\` block of the same title,\n  body and fence language together. The block is a declaration head's own — a \`type\`, \`interface\`,\n  \`const\`, \`function\`, or \`class\` head at column zero — or a documented \`class\` or \`interface\`\n  member's, so a head's titled block is compared the way a member's is. The pairing is per title\n  across the document, not per heading: the`

The EX row is unchanged.

### 7. Gates

```text
npm run format:check   exit 0   All matched files use the correct format. (81 files)
npm run lint:check     exit 0
npm run check          exit 0
npm run test:src:core  exit 0   Test Files 8 passed (8) / Tests 598 passed (598)
npm run test:guides    exit 0   Test Files 1 passed (1) / Tests 51 passed (51)
```

Observation beyond the criteria: `npm run test:policy` → `Tests 90 passed | 1 skipped (91)`, run
because this unit writes authored Markdown that the prose sweep reads.

### 8. `npm run build && npm run docs`

```text
BUILD=0
rows read: 1, disagreements found: 139
DOCS=1
```

### 9. `git status --short`

```text
 M guides/guide.md
 M src/core/helpers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/sources/Source.test.ts
```

Owned files only. Diffstat:

```text
 guides/guide.md                       |  28 ++---
 src/core/helpers.ts                   |  34 +++---
 src/core/sources/Source.ts            |   6 +-
 src/core/types.ts                     |  16 +--
 tests/src/core/helpers.test.ts        | 191 ++++++++++++++++++++++++++++++++++
 tests/src/core/sources/Source.test.ts |  32 ++++++
 6 files changed, 270 insertions(+), 37 deletions(-)
```

## Tests added

No test was rewritten or deleted. Every name below is new.

`tests/src/core/helpers.test.ts`, `describe('extractExamples')`:

- `collects a titled block above a class head, named for the class`
- `collects an untitled class-head block, which carries no title`
- `collects a titled block above a type head and above an interface head`
- `collects a block above a const head`
- `skips a member block, which the member reader collects instead`
- `skips a block attached to a declaration no key names`

`tests/src/core/helpers.test.ts`, `describe('findDrift')`:

- `reports nothing when a class-head block and the fence of its title agree`
- `reports a class-head block against a same-titled fence carrying another body`

`tests/src/core/helpers.test.ts`, `describe('locateComment')`:

- `carries an example rewrite back into a class head, read by the reader the gate compares on`

`tests/src/core/sources/Source.test.ts`, `describe('Source')`:

- `unions every declaration head across the module and leaves each member to the name overload`

## The unknown

**No existing test pinned the function-only population**, so no test became a control and none
changed outcome.

Method: I enumerated every call site of the widened readers in the suite with
`grep -rn "extractExamples(\|\.examples()" tests/ --include=*.ts` and read each. Every inline
source text and every fixture those sites build carries its `@example` blocks on `function` heads
or on members alone. The non-function heads that do appear in them —
`Source.test.ts` `export interface Widget {` at the sites now numbered 130, 175, and 210, and
`export interface Alias {` at 254 — each sit immediately after another declaration with no
preceding doc block, so the widening gives them nothing. `tests/fixtures/broken/missing-example/module/helpers.ts`
carries one `@example`, on `export function greet`; `tests/fixtures/good/module/**` carries none.

The member half of the axis is pinned by a new control instead:
`skips a member block, which the member reader collects instead` asserts the member block is absent
from `extractExamples` and present in `extractExampleMethods`, and
`unions every declaration head across the module and leaves each member to the name overload`
asserts the same split across `source.examples()` and `source.examples('Widget')`.

## Claims I flag

1. **The `findDrift` agreement case passed before the change, vacuously.**
   `reports nothing when a class-head block and the fence of its title agree` was green in the
   red-first run because the class head's block was not collected at all, so the fence's title
   reached no source side. It is non-vacuous only after the change. Its paired case,
   `reports a class-head block against a same-titled fence carrying another body`, is what proves
   the pairing exists — that one ran red first.

2. **`npm run format` realigned every row of the `SourceInterface` methods table in `guides/guide.md`.**
   The `examples` cell grew, which widened the `Behavior` column, so the formatter re-padded the
   header row, the alignment row, and every other row of that one table. No header cell's text
   changed; only its padding moved. The brief lists table headers as off-limits, and I read this
   mechanical consequence of the mandated `npm run format` as ancillary and carried on rather than
   stopping. Check the `guides/guide.md` hunk at `:260` if you want that ruling re-taken.

3. **My `139` is the after-reading only.** I did not run `npm run build && npm run docs` before
   editing, so I measured the post-change value and compared it against the figure the brief states
   for `cfa1f73`. They agree. If the before-reading matters as measured rather than as stated, it
   has to be taken from a clean checkout.

4. **The widening is inert on this package's own tree, and I checked why.**
   `grep -rn "^\s*\*\s*@example[ \t]\+[^ \t]" src/` returns nothing, so no `@example` tag anywhere
   in `src/` carries a title. EQ therefore gains no pair here and the `docs` count cannot move
   through this change. EX is unmoved for a second reason: `tests/guides.test.ts:147-150` filters
   `guide.surface()` to the `function` keyword before calling `findUnexampled`, so the extra names
   `source.examples()` now returns can never satisfy a `function`-keyword row.

5. **`Source.examples()` and `#exampleMembers` are unchanged in code**, as the brief stated they
   would be. The widening reaches `Source` entirely through `extractExamples`.
