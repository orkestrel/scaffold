# Report — U5 `d7-guide-drift-cost`

`findDrift` over contract's guide costs 226 ms best / 442 ms worst on an idle host, down from
5476 ms best / 5779 ms worst, with every reading of `findDrift`, `source.surface()`,
`source.methods()`, `source.examples()`, and `collectTitles` unchanged (`drift 0` on both readings).
The reader's cost was one full projection of every module file per compared name; `Source` now
collects the scope's declarations once per instance and answers every lookup from that map.

## Timings

Instrument: `/home/user/fleet/guide/tmp/timing.mjs`. It reads `/home/user/fleet/contract`
read-only (`src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md` at contract's tip `796e893`),
imports the guide checkout's built `@orkestrel/guide`, and reports the best and worst
of five runs per reading. Command: `node tmp/timing.mjs 5`. Host idle, 2026-09-07.

| Reading                          | Before (best / worst) | After (best / worst) |
| -------------------------------- | --------------------- | -------------------- |
| `createGuide`                    | 37.0 / 73.8 ms        | 42.1 / 88.8 ms       |
| `createSource`                   | 0.0 / 0.5 ms          | 0.0 / 0.4 ms         |
| `findDrift`, fresh `Source`      | 5476.4 / 5779.2 ms    | 226.0 / 442.2 ms     |
| `findDrift`, second call         | 5538.5 / 5863.5 ms    | 0.3 / 0.6 ms         |
| `source.surface()`               | 60.5 / 71.1 ms        | 68.7 / 76.5 ms       |
| `source.examples()`              | 62.9 / 77.0 ms        | 67.3 / 86.1 ms       |
| `methods()` over every group     | 253.8 / 272.6 ms      | 58.7 / 66.3 ms       |
| `examples(name)` over every owner| 4976.1 / 5006.2 ms    | 83.4 / 99.6 ms       |
| `collectTitles`                  | 4913.6 / 5027.4 ms    | 152.6 / 165.8 ms     |

Where the time went before: `Source.#locate` ran `extractDeclaration` per module file per lookup,
and `extractDeclaration` projected the whole file through `extractSourceLines` each time — about
50 ms per lookup. `examples(name)` looks up both keyword shapes and `methods(name)` looks up the
class shape whenever the interface shape answers nothing, so the reader paid a projection of the
package's whole declared source per compared name. `surface()`,
`examples()`, and `createGuide` were never the cost and are unchanged.

## Touched files

| File                                   | Change                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/core/helpers.ts`                  | Adds `collectDeclarations`, which reads a file's declaration heads from one projection; `extractDeclaration` becomes the named lookup over it |
| `src/core/sources/Source.ts`           | Memoizes the scope's declaration map, each name's members, and each example collection per instance                                          |
| `tests/src/core/helpers.test.ts`       | Cases for `collectDeclarations`: keying, first-complete-head-wins, an unterminated head, and a file declaring no head                        |
| `tests/src/core/sources/Source.test.ts`| The memo guard: repeated readings equal, no argument answering under another's key, instances independent                                    |
| `guides/guide.md`                      | The `collectDeclarations` Surface row, the extraction-model prose, and the `Source` reading cost                                             |

```text
 guides/guide.md                       |  24 ++++---
 src/core/helpers.ts                   | 122 ++++++++++++++++++++++------------
 src/core/sources/Source.ts            |  79 +++++++++++++++-------
 tests/src/core/helpers.test.ts        |  65 ++++++++++++++++++
 tests/src/core/sources/Source.test.ts |  47 +++++++++++++
 5 files changed, 262 insertions(+), 75 deletions(-)
```

### The hunks

`src/core/helpers.ts` — `collectDeclarations` replaces the per-name scan body. The head grammar is
now read from the head itself rather than spliced from a caller's name:

```ts
export function collectDeclarations(source: string): ReadonlyMap<string, Declaration> {
	const declarations = new Map<string, Declaration>()
	const opener = /^export (?:class|interface) /
	const grammar = /^export (class|interface) ([^\s<]+)(?:<.*>)?(?: .*)? \{$/
	const lines = extractSourceLines(source)
	const projected = lines.map((line) => line.code)
	// one pass; each key set by the first head that opens a column-zero close
}

export function extractDeclaration(
	source: string,
	keyword: DeclarationKeyword,
	name: string,
): Declaration | undefined {
	return collectDeclarations(source).get(`${keyword} ${name}`)
}
```

The body window, the `<...>` stripping, the `implements` exclusion, and the `extends` split are the
same lines as before. `escapeRegExp` keeps its `findUnexampled` caller and loses the
`extractDeclaration` clause from its `@remarks`.

`src/core/sources/Source.ts` — the memo fields and the lookup they serve:

```ts
readonly #methods = new Map<string, readonly MethodEntry[]>()
readonly #examples = new Map<string | undefined, readonly SourceExample[]>()
#declarations: ReadonlyMap<string, Declaration> | undefined

#locate(keyword: DeclarationKeyword, name: string): Declaration | undefined {
	if (this.#declarations === undefined) this.#declarations = this.#scanDeclarations()
	return this.#declarations.get(`${keyword} ${name}`)
}
```

`#scanDeclarations` walks `selectModuleKeys` in sorted order and takes the first file's entry for a
key, skipping an entry with neither body nor bases — the rule `#locate` applied per file before, so
the file order, the first-declaration rule, and the empty-head skip are the same decisions in the
same order. `#scanMethods` holds the interface-then-class resolution `methods` used to inline. The
example collection keys on the argument, the module-wide reading under the absent name, so no
argument answers under another's key.

Doc blocks carry the derivation in `@remarks`: `collectDeclarations` states the single projection
and the first-head rule, `extractDeclaration` states that it is the named lookup, and `Source`
states that every reading derives once per instance and that a second instance derives its own.

## Per criterion

1. **Baseline and after, from the retained instrument.** `node tmp/timing.mjs 5` — see § Timings.
   Before: `findDrift (cold source) 5476.4 ms best 5779.2 ms worst`, `drift 0`. After:
   `findDrift (cold source) 226.0 ms best 442.2 ms worst`, `drift 0`. Under the 1000 ms bound on
   every run taken.
2. **Format and lint over owned paths, then `check`.**
   `npx oxfmt --config .oxfmtrc.json --check src/core/helpers.ts src/core/sources/Source.ts tests/src/core/helpers.test.ts tests/src/core/sources/Source.test.ts guides/guide.md`
   → `All matched files use the correct format.` (exit 0).
   `npx oxlint --config .oxlintrc.json --deny-warnings` over the same paths without
   `guides/guide.md` → exit 0, no diagnostic.
   `npm run check` → `tsc --noEmit -p configs/src/tsconfig.core.json`, exit 0.
3. **Build then docs.** `npm run build` → `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`,
   exit 0. `npm run docs` → `rows read: 1, disagreements found: 0`.
4. **Suites.**
   `npm run test:src:core` → `Test Files  8 passed (8)` / `Tests  611 passed (611)`.
   `npm run test:guides` → `Test Files  1 passed (1)` / `Tests  54 passed (54)`.
   `npm run test:policy` → `Test Files  1 passed (1)` / `Tests  90 passed | 1 skipped (91)`.
5. **Owned files only.** `git status --short`:

   ```text
    M guides/guide.md
    M src/core/helpers.ts
    M src/core/sources/Source.ts
    M tests/src/core/helpers.test.ts
    M tests/src/core/sources/Source.test.ts
   ```

   `tmp/` is ignored (`.gitignore:11`), and `git diff --stat -- package.json package-lock.json` is
   empty. The version stays `0.0.18`.

## The guard and its control

`tests/src/core/sources/Source.test.ts` — `Source > answers every repeated reading with the same
records, one argument never answering for another`. It reads `examples('StoreInterface')` before
`examples()` and a derived name before a declared one, over one instance twice, over a second
instance on the same inventory, and over an instance on a different inventory, and pins each
expected record rather than comparing the readings to each other alone.

The memo changes no observable behaviour, so the case is a guard rather than a regression proof.
Its power was measured against a planted control: keying `#examples` on one shared slot instead of
the argument reddens exactly this case —
`vitest run --project src:core -t 'answers every repeated reading'` → `expected { first: … } to
deeply equal { first: … }`, with `member` reading `['open']` where the module-wide collection is
`[]`. The plant was undone by editing its lines back, and the diff carries no trace of it.

`tests/src/core/helpers.test.ts` — `collectDeclarations` cases for the map's keying over a file
declaring an interface, a generic interface with a base, and a class; a file declaring no head; a
head that opens no column-zero close; a repeated key; and a lookup of an absent and a
metacharacter-carrying name beside `extractDeclaration` over the same text.

## Findings

- **A doc claim on both sides of this change was unreachable.** `extractDeclaration`'s `@remarks`
  said a head that opens no column-zero close "is skipped and the scan continues, so a later real
  declaration still answers". A later head cannot answer: the close search runs to the end of the
  file, so a head with no close implies no later head has one either. A case written to that claim
  failed with the earlier head's body (`['\twalk(): void', 'export interface B extends C {',
  '\tfold(): void']`), which is what both the old and the new reader return. The claim is now
  written as "a head that opens none records nothing" in the doc block and in `guides/guide.md`.
- **Contract's raised timeout can come back down.** `/home/user/fleet/contract/tests/guides.test.ts:206`
  carries `30_000` for a case that now measures well under a second. Contract is read-only in this
  unit, so this is an observation for a successor unit in that checkout, and it needs the published
  `@orkestrel/guide` release first.

## Deviation state

No deviation stopped the unit. A scope judgment is left for the Orchestrator to rule on.

The memo needs one new module-scope export in the owned `src/core/helpers.ts`:
`collectDeclarations`. The deviation contract says to stop on "a memo that needs a public type or
member". I read that trigger as naming `types.ts` and the entity APIs — `src/core/types.ts` is
untouched, no type was added, and `SourceInterface`, `GuideInterface`, and every class keep their
members and their signatures. The addition is a centralized module helper, which `AGENTS.md`
§ Design laws requires be exported and tested rather than hidden, and the brief's scope grants
`src/core/helpers.ts` "and the helpers they call, doc blocks included" plus `guides/guide.md`.

The alternative designs were measured or ruled out before choosing it: memoizing `#locate` per
`${keyword} ${name}` alone leaves each distinct name paying its own full projection, which is about
50 ms per name over contract and stays in the seconds; a per-file collector private to `Source`
duplicates `extractDeclaration`'s head grammar; and a module-level cache in `helpers.ts` leaks
across instances, which the brief forbids.

## Wall clock

2026-09-07, 16:04 UTC to 16:22 UTC in `/home/user/fleet/guide`.

---

**Orchestrator annotation (audit, 2026-09-07):** the audit read one stale citation in this report — `contract/tests/guides.test.ts:206` for the `30_000` budget, which sits at `:211` on the case opening at `:203` — and the instrument named only by its swept path; the retained copy is `instruments/d7/u5/timing.mjs`. The tree is authoritative.
