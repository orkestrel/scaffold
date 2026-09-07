# Report — `d7-guide-u5-fix` (resumed)

Checkout `/home/user/fleet/guide`, baseline `7c60ea1`. Wall clock of the resumed run: 2026-09-07 20:28Z to 20:35Z, about 7 minutes.

## The partial hunks the terminated run left

| Partial hunk | Ruling |
| --- | --- |
| `src/core/helpers.ts` — `extractDeclaration`'s `@remarks` rewritten (G1, G2) | **Kept.** It states the key-convention reason and attributes the single projection to `collectDeclarations` and to `Source`. Its lines already sit inside the block's wrap, so G6 asked nothing of it. |
| `src/core/types.ts` — `{@link extractDeclaration}` → `{@link collectDeclarations}` at the `Declaration` and `DeclarationKeyword` doc blocks (G7) | **Kept.** Exactly the two references the brief grants; no type moved. |
| `tests/setup.ts` — `StoreReadings`, `buildStoreSource`, `readStoreReadings` (G3) | **Corrected.** Kept the shapes, the names, and the ordering `@remarks`. Corrected the `readStoreReadings` example, which called `new Source(...)` with no `Source` in scope: the fence now opens with `import { Source } from '@src/core'`. |
| `tests/src/core/helpers.test.ts` — the renamed `collectDeclarations` title (G8) | **Corrected.** The partial title ran to 146 characters, past every other `it` line in the file. Tightened to `answers an absent and a metacharacter-carrying key with no entry, and a declared key as extractDeclaration does`, which still names each of the four assertions. |
| `tests/src/core/sources/Source.test.ts` — the two nested assignments moved out and the builders imported (G3) | **Kept.** The `it` body now holds the expected record and the assertions alone. |

Nothing was discarded, and no discard-class git command ran.

## Per item

**G1 — the wrapper's reason.** `src/core/helpers.ts:1301-1307`. `@remarks` now opens with the delegation to `collectDeclarations`, then: `This lookup spells the map's ${keyword} ${name} key for its caller, so a consumer reading one name never writes that convention itself.`

**G2 — the false amortization claim.** Two hunks. `src/core/helpers.ts:1305-1307` replaces the elliptical clause with `Every call collects the whole file afresh: a consumer reading many names from one file calls {@link collectDeclarations} once and reads the map, and {@link Source} holds one such map per module scope.` `guides/guide.md:468-471` replaces the sentence the audit found false with `extractDeclaration is the named lookup over that map: it spells the ${keyword} ${name} key so a consumer reading one name never writes that convention, and it collects the file afresh on every call. A consumer reading many names from one file calls collectDeclarations once and reads the map, and Source holds one such map per module scope.` The edit sits in `@remarks` and in free guide prose, so no description paragraph moved and no cell followed from it.

**G3 — the nested assignments.** `tests/setup.ts:46-108` exports `StoreReadings`, `buildStoreSource(member: string): string`, and `readStoreReadings(source: SourceInterface): StoreReadings` — the brief's own names, taken as the ancillary decision it left me. The ordering comment that stood inside the `it` body is now `readStoreReadings`'s `@remarks`. `tests/src/core/sources/Source.test.ts:1179-1204` imports both builders and keeps the expected record and the assertions.

**G4 — the compared-form list.** `guides/guide.md:363-364`. The module-part bullet now reads `…and TSDoc's package-qualified form @scope/pkg#, each a package or path token, one carrying @ or / — drops…`, and the bullet beside it reads `{@link Owner#member} and {@link #member} travel whole — a # that no @ or / precedes is JSDoc's member reference rather than a module part — so a guide cell documents each as written, outside a located span.` `normalizeSummary`'s description paragraph is untouched.

**G5 — one memo sentence.** `guides/guide.md:233-238`. The `### Source` paragraph drops `computed on first access, cached` and keeps `Both projections are deduplicated by name and keyword, and sorted by name.` The one derive-once sentence now covers every reading: `the exports and surface projections on first access, the scope's declaration map on the first methods or examples lookup, then each name's members and each example collection under the name it was asked for`. That paragraph is free prose rather than a cell, so nothing propagated from it.

**G6 — the wrap.** `guides/guide.md:227-242` and `:467-496` re-wrapped whole at 100 columns; `src/core/sources/Source.ts:52-58` re-wrapped whole at the block's 80-column line width. Each re-wrap runs to the end of its paragraph, because the spliced sentences continue into the lines that follow them. The guide reflow also absorbed the short lines its paragraphs carried before the splice sentences (`general package policy;`, `inventory is the further bound: a base the`). The instrument is `tmp/d7-guide-u5-fix/wrap.mjs`, a greedy wrapper that never splits a word, so a long code token such as `` `^\t(?:async )?\*?(\w+)\??(?:<.*>)?\(` `` survives intact.

**G7 — the locator references.** `src/core/types.ts:495` and `:505` name `{@link collectDeclarations}`. `guides/guide.md:50-51` followed through `npm run docs -- --to guide`, which reported `disagreements found: 2, written: 2`.

**G8 — the test's name.** `tests/src/core/helpers.test.ts:1648`, retitled as recorded earlier.

**Propagation.** `npx oxfmt --write` over the owned paths, `npm run build`, `npm run docs -- --to guide`, `npx oxfmt --write guides/guide.md`, `npm run docs`.

## Per criterion

**1. `git status --short` lists owned files only.**

```
 M guides/guide.md
 M src/core/helpers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M tests/setup.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/sources/Source.test.ts
```

`tmp/` is ignored at `.gitignore:11`, confirmed by `git check-ignore -v tmp/d7-guide-u5-fix/wrap.mjs`.

**2. The greps.**

```
$ grep -nE '^\t+const [a-zA-Z]+ = \(' tests/src/core/sources/Source.test.ts
(no output, exit 1)
$ grep -c 'travel whole' guides/guide.md
1
$ grep -n 'projects it once rather than once per name' guides/guide.md src/core/helpers.ts
(no output, exit 1)
```

**3. Format, lint, typecheck.**

```
$ npx oxfmt --config .oxfmtrc.json --check <owned paths>
All matched files use the correct format.
Finished in 613ms on 7 files using 4 threads.
EXIT=0
$ npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>
EXIT=0
$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT=0
```

**4. Build and docs.**

```
$ npm run build
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
EXIT=0
$ npm run docs
rows read: 1, disagreements found: 0
EXIT=0
```

The build's api-extractor stage stayed green with `{@link Source}` written in `helpers.ts`, which imports no `Source`; `src/core/types.ts:505` already carried that same cross-file reference before this unit.

**5. The suites.**

```
$ npm run test:src:core
 Test Files  8 passed (8)
      Tests  613 passed (613)
   Duration  1.54s
EXIT=0
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  54 passed (54)
   Duration  625ms
EXIT=0
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  648ms
EXIT=0
```

Beyond the criteria, `npm run test:setup` exited 0 at `Test Files 1 passed (1) / Tests 7 passed (7)`, because this unit added exports to `tests/setup.ts`.

## Diffstat

```
 guides/guide.md                       | 80 ++++++++++++++++++-----------------
 src/core/helpers.ts                   |  9 ++--
 src/core/sources/Source.ts            |  8 ++--
 src/core/types.ts                     |  4 +-
 tests/setup.ts                        | 64 ++++++++++++++++++++++++++++
 tests/src/core/helpers.test.ts        |  2 +-
 tests/src/core/sources/Source.test.ts | 40 +++++-------------
 7 files changed, 129 insertions(+), 78 deletions(-)
```

## Off-limits file patch — `tests/setup.test.ts`

G3 adds exported helpers to `tests/setup.ts`, and `tests/setup.test.ts` is the sibling proof for that module. The brief owns neither that file nor a criterion over it, so this is report-only. No gate reddens without it: `test:setup` passes as written.

I proved the two new doc-block examples true through a runtime probe in `tmp/probe/`, each paired with a control from outside the example's population, and both passed at `Tests 2 passed (2)`. The probe is deleted, and this patch is its promotion.

Replace the import at `tests/setup.test.ts:5`:

```ts
import { Source } from '@src/core'
import {
	TEST_SEED,
	buildStoreSource,
	readStoreReadings,
	requireText,
	requireTable,
} from './setup.js'
```

Append after the closing `})` of the `requireText` block:

```ts
describe('buildStoreSource', () => {
	it('declares the named member beside the inherited read, each carrying its own example tag', () => {
		const text = buildStoreSource('open')
		// A second route: literal substrings of the fixture text, never the array
		// buildStoreSource joins, so the assertion can disagree with the helper.
		expect(text.includes('\topen(): void')).toBe(true)
		expect(text.includes('\tread(): string')).toBe(true)
		expect(text.includes('export interface StoreInterface extends ReadInterface {')).toBe(true)
	})

	it('declares no member the caller did not name', () => {
		expect(buildStoreSource('open').includes('\tclose(): void')).toBe(false)
	})
})

describe('readStoreReadings', () => {
	it('answers each reading under the argument it was asked for', () => {
		const files = { 'module/types.ts': buildStoreSource('open') }
		expect(readStoreReadings(new Source({ files, module: 'module' }))).toEqual({
			member: ['open'],
			module: [],
			store: ['open', 'read'],
			base: ['read'],
			absent: [],
		})
	})

	it('answers a differently named member with that name', () => {
		const files = { 'module/types.ts': buildStoreSource('close') }
		const readings = readStoreReadings(new Source({ files, module: 'module' }))
		expect(readings.member).toEqual(['close'])
		expect(readings.store).toEqual(['close', 'read'])
	})
})
```

## Deviation state

None. No gate outside the owned files reddened, and no item needed a type or a code token to move. Ancillary decisions recorded: the builder names `buildStoreSource` and `readStoreReadings` with the fixture type `StoreReadings`; the tightened `it` title; the `import { Source } from '@src/core'` line added to the `readStoreReadings` example fence; and each re-wrap running to the end of its paragraph rather than stopping at the spliced lines.

## Instruments retained

`tmp/d7-guide-u5-fix/` in the checkout, gitignored: `wrap.mjs` (the greedy wrapper), `replace.mjs` (the line-range replacer), `g2.mjs`, `rename.mjs`, `example.mjs`, and the joined and wrapped paragraph texts each rewrite read and wrote.

---

**Orchestrator integration (2026-09-07 20:40 UTC):** the report-only patch for `tests/setup.test.ts` applied as returned (the `Source` import, the `buildStoreSource` and `readStoreReadings` cases); `npx oxfmt --write` then `--check` over it, `oxlint` over `tests/setup.test.ts` and `tests/setup.ts` exit 0, `npm run test:setup` at `Tests 11 passed (11)`, `npm run check` exit 0. Committed with the unit's edits.
