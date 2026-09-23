# Unit J-TYPES — report 4: the per-element entry of the sanitizer dictionary

(Returned 2026-09-23 by `opus` on Opus 5.5 as its final message, 31 tool uses, 315 s; the harness refused the unit's write of this file with "Subagents should return findings as text, not write report files", so the Orchestrator captured the message here verbatim, HTML entities decoded.)

Executor: `opus` on Opus 5.5, a native Claude subagent. It was the only writer in `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `1868007`, with round 3's edits uncommitted underneath). Brief: `j-types-brief-4.md`. Nothing was committed, installed, or discarded.

## Summary

1. E12 is applied in `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts`: the new `SanitizerElementNamespaceWithAttributes` mirror has `name` and `attributes`, and `SanitizerConfig.elements` is typed `ReadonlyArray<string | SanitizerElementNamespaceWithAttributes>`.
2. The `dataAttributes` doc now states both defaults and that the platform refuses the field without `attributes`. The rollup rationale sits only in the `SetHTMLOptions` remarks, and no sentence says "WHATWG".
3. `npm run build:src:browser` exits 0. Typecheck, oxlint, oxfmt, `test:guides` (19 passed) and `test:policy` (109 passed, 1 skipped) all exit 0.
4. The type probe accepts the two valid values and refuses `[42]` and the entry with no `name`, each with a `TS2322` error.
5. Unknown 1: oxfmt re-pads the whole § Surface table, because the new name is wider than the Name column. Nothing outside that table changed. Deviations: the report file was blocked, and the `elements` type uses `ReadonlyArray<…>` because the lint rule forbids the brief's `readonly (…)[]`.

## Deviation state

The acceptance work ran to completion. There are two deviations:
- **Report file.** The harness refused the report write, so this message carries the report.
- **`elements` spelling.** The field uses `ReadonlyArray<…>` rather than the brief's `readonly (…)[]`. The Rulings section gives the reason.

## Declarations after the edit

The following block is `src/browser/types.ts`, around lines 396 to 461, verbatim.

```ts
/**
 * Mirrors the HTML standard's dictionary that names one element the platform sanitizer keeps and the attributes kept on it.
 *
 * @remarks
 * The HTML standard names this dictionary `SanitizerElementNamespaceWithAttributes`. The mirror carries
 * only its `name` and `attributes` fields, the ones the tip sanitizer sets. The standard types each
 * entry of the `elements` list as a string or this dictionary, and the `elements` field of
 * `SanitizerConfig` states that union.
 */
export interface SanitizerElementNamespaceWithAttributes {
	/** Names the element the sanitized markup keeps, mirroring the dictionary's `name` field. */
	readonly name: string
	/** Lists the attribute names this element keeps beside the configuration's `attributes` list, mirroring the dictionary's `attributes` field. */
	readonly attributes?: readonly string[]
}

/**
 * Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps.
 *
 * @remarks
 * The HTML standard names this dictionary `SanitizerConfig`. The mirror carries only its `elements`,
 * `attributes`, and `dataAttributes` fields, the ones the tip sanitizer sets.
 */
export interface SanitizerConfig {
	/** Lists the elements the sanitized markup keeps, mirroring the dictionary's `elements` field: a string names an element kept with the `attributes` list, and an entry names an element kept with its own attributes as well. */
	readonly elements?: ReadonlyArray<string | SanitizerElementNamespaceWithAttributes>
	/** Lists the attribute names every kept element keeps, mirroring the dictionary's `attributes` field. Default: the attributes the platform's safe baseline keeps. */
	readonly attributes?: readonly string[]
	/** If `true`, keeps every `data-*` attribute; if `false`, drops each one, mirroring the dictionary's `dataAttributes` field. The field is valid only beside `attributes`, and the platform refuses a configuration that names it alone. Default: kept when `attributes` is absent, dropped when `attributes` is given. */
	readonly dataAttributes?: boolean
}

/**
 * Mirrors the HTML standard's dictionary the platform's `setHTML` method reads its sanitizer from.
 *
 * @remarks
 * The HTML standard names this dictionary `SetHTMLOptions`, and TypeScript's DOM library does not
 * declare it. The standard's `sanitizer` field also accepts a sanitizer object, but the declaration
 * rollup compiles with TypeScript 5.9.3, whose DOM library declares no sanitizer types, so the contract
 * carries the `SanitizerConfig` dictionary rather than a sanitizer object.
 */
export interface SetHTMLOptions {
	/** Carries the configuration the markup is sanitized through. Default: the platform's safe baseline. */
	readonly sanitizer?: SanitizerConfig
}

/**
 * Describes a node whose `setHTML` method parses markup through a sanitizer.
 *
 * @remarks
 * The DOM library of TypeScript 6.0.3 omits `setHTML`, so a guard narrows an element to this contract
 * before the tip content is written.
 */
export interface SanitizeTargetInterface {
	/**
	 * Replaces the node's children with the markup the sanitizer keeps, mirroring the platform's `setHTML` method.
	 *
	 * @param html - The markup to parse.
	 * @param options - The sanitizer configuration to parse it through.
	 * @example
	 * ```ts
	 * target.setHTML('<b>Saved</b>', { sanitizer: { elements: ['b'] } })
	 * ```
	 */
	setHTML(html: string, options?: SetHTMLOptions): void
}
```

## Rulings

- **`elements` uses `ReadonlyArray<…>`.** With the brief's `readonly (string | SanitizerElementNamespaceWithAttributes)[]`, `oxlint --deny-warnings` failed with `typescript(array-type): Array type using 'readonly T[]' is forbidden for non-simple types. Use 'ReadonlyArray<T>' instead.` The two spellings are the same type, and `SanitizeAllowlist` in the same file already uses `ReadonlyArray`. Bound: the `.oxlintrc.json` array-type rule, and `AGENTS.md` (never suppress a diagnostic).
- **No alias for the standard's `SanitizerElementWithAttributes` typedef.** The `elements` union expresses it, and the entry's `@remarks` says so. Bound: E12, and `AGENTS.md` § Design laws (no superfluous wrappers).
- **The entry mirrors `name` and `attributes` only.** The standard's `namespace` and `removeAttributes` fields stay out, and the `@remarks` names that subset. Bound: E12, and `names.md` § General vocabulary.
- **Summary voice.** The entry's summary starts with the `-s` verb `Mirrors` and does not name the symbol. Its `@remarks` names the standard's dictionary. Bound: `typescript.md` § Comments and API documentation, and `policy/no-malformed-summary`.
- **Declaration order.** The entry sits directly before `SanitizerConfig`, so the dependency comes first. The guide row sits in the same place. Bound: brief § Deviation contract.
- **Added an `attributes` default: "the attributes the platform's safe baseline keeps."** Without it, a string entry "kept with the `attributes` list" is ambiguous when that list is absent. Probe 3 measured this default in two readings: `perElement.bHref` keeps `href` on `b` with no global list, and `elementsOnly.data` keeps `data-x`, `title`, and `class`. Bound: `typescript.md` ("Default: …") and brief § Deviation contract (wording). You can strike this sentence alone.
- **`dataAttributes` validity sentence.** It follows the brief's wording. Probe 3 measured the refusal only for `dataAttributes: false`. No probe measured `dataAttributes: true` without `attributes`. Bound: E12.
- **One home for the rationale (B1).** The rollup rationale sits only in the `SetHTMLOptions` `@remarks`. The `SanitizerConfig` remarks keep only the dictionary name and field subset. The `SanitizeTargetInterface` remarks keep only the `setHTML` omission that the guard exists for. Bound: E12.
- **One name for the standard (B3).** Every sentence that names the source says "the HTML standard". Bound: E12.
- **Guide rows.** Only the `SetHTMLOptions` summary changed. The `SanitizerConfig` and `SanitizeTargetInterface` description paragraphs and the `setHTML` method paragraph are unchanged, so their rows and the § Methods table are unchanged. Bound: `documentation.md` § Parity.
- **Surface re-pad.** The guide in the worktree is oxfmt's own output from a scratch copy. That output differs from the hand-edited guide only in lines 10 to 120, the § Surface table. Bound: criterion 2 and Unknown 1.
- **Consumers.** No other file references the changed field or the entry type, so no consumer changed (E6).

## Acceptance evidence

ANSI color codes are stripped; the text is otherwise verbatim, from the final runs.

**Criterion 1: `npm run build:src:browser`**
```text
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 9 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  10.52 kB │ gzip: 3.41 kB │ map: 17.13 kB

✓ built in 70ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
build exit 0
```
The rolled-up `dist/src/browser/index.d.ts` declares `export declare interface SanitizerElementNamespaceWithAttributes`, and its `SanitizerConfig.elements` references that entry type. An earlier build with the `readonly (…)[]` spelling also exited 0, so the spelling change came from lint, not from the rollup.

**Criterion 2**
```text
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
check exit 0
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
oxlint exit 0
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 4170ms on 2 files using 16 threads.
oxfmt exit 0
```

**Criterion 3**
```text
$ grep -n "Sanitizer" src/browser/types.ts
400: * The HTML standard names this dictionary `SanitizerElementNamespaceWithAttributes`. The mirror carries
403: * `SanitizerConfig` states that union.
405:export interface SanitizerElementNamespaceWithAttributes {
416: * The HTML standard names this dictionary `SanitizerConfig`. The mirror carries only its `elements`,
419:export interface SanitizerConfig {
421:	readonly elements?: ReadonlyArray<string | SanitizerElementNamespaceWithAttributes>
435: * carries the `SanitizerConfig` dictionary rather than a sanitizer object.
439:	readonly sanitizer?: SanitizerConfig
$ grep -n "WHATWG" src/browser/types.ts guides/veneer.md
grep WHATWG exit 1
```
Every `Sanitizer` hit is one of the two mirrors or prose that names one of them. No line names the global `Sanitizer`, in code or in prose.

**Criterion 4: the type probe.** The probe file is at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/probe/sanitizer-probe.ts`, outside the subject tree. Its content:
```ts
import type { SanitizerConfig } from 'C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts'

export const perElement: SanitizerConfig = {
	elements: [{ name: 'a', attributes: ['href'] }, 'b'],
	attributes: ['class'],
	dataAttributes: false,
}

export const flat: SanitizerConfig = { elements: ['span'] }

export const numeric: SanitizerConfig = { elements: [42] }

export const nameless: SanitizerConfig = { elements: [{ attributes: ['href'] }] }
```
The `npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM --target ESNext --module preserve --moduleResolution bundler --allowImportingTsExtensions <probe>` command, run from the worktree, printed this:
```text
.../scratchpad/probe/sanitizer-probe.ts(11,54): error TS2322: Type 'number' is not assignable to type 'string | SanitizerElementNamespaceWithAttributes'.
.../scratchpad/probe/sanitizer-probe.ts(13,55): error TS2322: Type '{ attributes: string[]; }' is not assignable to type 'string | SanitizerElementNamespaceWithAttributes'.
  Property 'name' is missing in type '{ attributes: string[]; }' but required in type 'SanitizerElementNamespaceWithAttributes'.
tsc exit 2
```
`perElement` (lines 3 to 7) and `flat` (line 9) compile. `numeric` (line 11) and `nameless` (line 13) are refused with the diagnostics shown. The probe can fail against the old code: with round 3's `readonly string[]` field, `perElement` fails with TS2322, as the objective lane measured in its round-3 claim 2.

**Criterion 5**
```text
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types
···················
 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  13:50:25
   Duration  920ms (transform 166ms, setup 60ms, import 672ms, tests 45ms, environment 0ms)
test:guides exit 0
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types
····································································································-·········
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  13:50:27
   Duration  2.15s (transform 106ms, setup 60ms, import 245ms, tests 1.70s, environment 0ms)
test:policy exit 0
```

**Observation: `npm run test:src:browser -- tests/src/browser/index.test.ts`.** 1 file, 2 tests passed, exit 0.

## Unknown 1: does oxfmt re-pad the § Surface table?

Yes. `SanitizerElementNamespaceWithAttributes` is wider than the Name column, so oxfmt widens that column for the whole table. The Summary column keeps its width, because the `TOKEN_NAMES` summary still sets it.

To measure this, I copied the edited guide and `types.ts` to the scratchpad and ran `npx oxfmt --config .oxfmtrc.json --write` on the copies (exit 0). `types.ts` came back byte-identical. The guide came back with one hunk, `10,120c10,120`, covering every § Surface line (header and separator included) and nothing else. The worktree guide is that formatted copy.

## Tree state

```text
$ git status --short
 M guides/veneer.md
 M src/browser/types.ts
$ git diff --stat
 guides/veneer.md     | 220 ++++++++++++++++++++++++++-------------------------
 src/browser/types.ts |  51 ++++++++++--
 2 files changed, 154 insertions(+), 117 deletions(-)
```

## Full diff against `1868007`, with each round's hunks named

**`src/browser/types.ts`.**
- **Round 4 hunks:** the entry declaration, the `SanitizerConfig` remarks trim, its three leaf changes, the `SetHTMLOptions` summary and remarks, and the removed `SanitizeTargetInterface` remarks sentence.
- **Round 3 hunks:** the `SanitizerConfig` declaration, `sanitizer?: SanitizerConfig`, the `@param options` text, and the example.

The byte-exact diff is `j-types-4.diff` beside this file (the Orchestrator's capture). `git diff -w` over the guide shows the content changes only: the separator row's widened Name column, the `SanitizerElementNamespaceWithAttributes` row added before the `SanitizerConfig` row, and the `SetHTMLOptions` summary changed from "the WHATWG dictionary" to "the HTML standard's dictionary".
