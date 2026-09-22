# Unit F5a ACCOUNTING-SPLIT — report

`opus` on native Opus 5, Veneer checkout `/home/user/veneer`, from `d93bb85` on
`claude/inspiring-allen-t4qzv1`. Every obligation is done. Every acceptance criterion exits 0.
No deviation was raised.

## Obligation 1 — the split

`tests/setupStyles.ts` (2714 lines) became three modules, each host-independent and each with its
own root proof in the `setup` project. Every export moved once, unrenamed, with its behaviour and
its doc comment unchanged; only doc references to a module or a proof that moved were rewritten.

| File | Change |
| ---- | ------ |
| `tests/setupCases.ts` | New. Every case table and markup string, plus `MANDATED_TAG_PAIRS` and the new `ELEMENT_TAGS`. Imports `TOKEN_NAMES` and nothing else. |
| `tests/setupCases.test.ts` | New. The case-table freezes and inventory bindings, its own export inventory, the `ELEMENT_TAGS` partial case, and a `MANDATED_TAG_PAIRS` shape case. |
| `tests/setupCalibration.ts` | New. `BootstrapScope`, `BOOTSTRAP_SCOPE_PATTERNS`, `VENEER_GUIDE_PATH`, `BOOTSTRAP_ROOT_VARIABLES`, `BOOTSTRAP_DARK_VARIABLES`, `THEME_DARK_ADDITIONS`, `RETAINED_COLOR_ALIASES`, `RETAINED_LENGTH_ALIASES`, `CALIBRATED_TIERS`, `CUSTOMIZATION_RECIPE`, `FILL_ONLY_RECIPE`. Imports nothing. |
| `tests/setupCalibration.test.ts` | New. Their cases and its own export inventory. |
| `tests/setupStyles.ts` | Keeps the cascade readers, the compile helpers, the direction tables and scanners, the shadow-layer reader, and the selector normalizer with what it needs. Imports `BOOTSTRAP_SCOPE_PATTERNS` and the `BootstrapScope` type from `tests/setupCalibration.ts`. |
| `tests/setupStyles.test.ts` | Keeps their cases and a rewritten export inventory. |

`ELEMENT_TAGS` is `ReadonlyArray<readonly [partial: string, tags: readonly string[]]>`: each
`src/styles/elements/` partial's stem beside the tags its rules select and the mandated relative
each of those tags is written with (`details` beside `summary`, `ol` beside `li`, `table` beside
`caption`, `colgroup`, `thead`, `tbody`, and `tfoot`). Its case reads `src/styles/elements/` and
requires the stems it finds to equal the partial column exactly, so a partial added to the layer
reddens until its tags are written. It also requires a row naming a mandated descendant to name one
of that descendant's legal parents, which binds the table to `MANDATED_TAG_PAIRS`.

Every importer moved with its symbols: `tests/setupBrowser.test.ts` and 52 files under
`tests/src/styles/**`.

One export's proof changed home rather than being deleted: `compileBreakpointRamp` has its own case
(`matches the non-zero ramp names to the container token keys`) in `tests/setupStyles.test.ts`, and
the inventory-binding cases that also drive it now sit in `tests/setupCases.test.ts`.
`tests/setupStyles.test.ts` imports `TABLE_RESPONSIVE_CASES` from `tests/setupCases.ts` for the
`collectGridVocabulary` boundary case, which drives a cascade reader from a case table.

## Obligation 2 — the rendered position proof

**Deleted, by symbol:** `matchesLooseTagPair`, `scanUnreadForm`, `extractSelectorCompounds`,
`extractCompoundTags`, `extractSelectorIdentifiers`, `findGroupEnd`, `splitTopLevelCompounds`,
`SelectorCombinator`, `SelectorCompound`.

**Kept, by symbol:** `matchesCSSWhitespace`, `trimCSSWhitespace`, `SelectorEscape`, `readEscape`,
`SelectorStep`, `walkSelector`, `SelectorIdentifier`, `readIdentifier`, `splitTopLevelList`,
`normalizeComplexSelector`.

The kept set is the closure the typecheck named: `normalizeComplexSelector` needs `walkSelector`,
`readIdentifier`, and `matchesCSSWhitespace`; `walkSelector` and `readIdentifier` need `readEscape`;
`splitTopLevelList` stays because `extractShadowLayers` reads through it, and it needs
`trimCSSWhitespace`. The four symbols the brief named to delete were the only users of
`extractSelectorIdentifiers`, `findGroupEnd`, `splitTopLevelCompounds`, `SelectorCombinator`, and
`SelectorCompound`.

`tests/setupBrowser.ts` gains `scanPositional(rules, tags, mandated)`, mounting through `scene`,
reading through `Element.matches`, parsing no selector. It mounts each tag alone, then inside each
other tag, then after each other tag, and reports a differing rule set as `<outer> > <inner>` or
`<outer> + <inner>`; a nesting named by `mandated` is not a finding. It refuses a selector the
engine cannot read rather than skipping it. Its inventory row is in `tests/setupBrowser.test.ts`.

`tests/src/styles/index.test.ts` replaces `joins no two bare tags in any elements-layer rule` with:

- `gives every styled tag the same treatment wherever the markup puts it` — the shipped elements
  layer over the distinct `ELEMENT_TAGS` tags, expecting `[]`.
- `reports the sibling pair a consumer sheet writes into the elements layer` — a scratch sheet
  loaded through `scene.load` carrying `@layer elements { p:not(h1 + p) { margin: 0 } }`, expecting
  exactly `['h1 + p']`. This is the control that proves the reader can report.

Grammar cases whose subjects survived were rewritten onto the kept readers rather than dropped: the
escape-owned-whitespace case and the no-break-space case now read through `readIdentifier`,
`walkSelector`, `normalizeComplexSelector`, and `splitTopLevelList`.

Guide changes, all inside § Styles and § Tests: the § Files row for `tests/setupStyles.ts` became
three rows; the setup-module paragraph names the three modules and what each holds; a new paragraph
states the position-independence policy and names `scanPositional` and `MANDATED_TAG_PAIRS` as the
mechanism; the § Tests link for `index.test.ts` reads `layer order, position independence, and
direction neutrality`. The § Compatibility sentence excluding contextual Reboot selectors and every
§ Deferred selectors row citing a contextual pair are unchanged.

## Obligation 3 — the visitor

`tests/setupConformance.ts` now declares `SPECIFIER_VISITOR` at module scope, with
`SPECIFIER_READINGS` beside it as the array the handlers write to. `Visitor` hands a handler the
node and nothing else, so the walk and its reading cannot be joined by an argument;
`extractSpecifiers` empties the array before the walk and takes the readings out with `splice`, so
the array is empty between calls and each caller's list is its own. Behaviour is unchanged and the
existing `extracts imports and re-exports…` case still passes. A new case,
`drains the readings between walks, so one module's imports never reach the next`, pins the drain.

**Flagged as my own design cost:** this trades a function-local array for one module-scope array.
It is exported rather than hidden, because `AGENTS.md` forbids a hidden module declaration, and it
is mutable, which the readonly law would otherwise refuse for a collection. `Visitor` offers no
per-walk context, so I could find no shape that both moves the object to module scope and keeps the
collector local. If the reviewer prefers the nested object, the alternative is to leave it inside
`extractSpecifiers` and treat the handler literal as an anonymous argument.

## Obligation 4 — the duplicate text assertion

`tests/src/styles/elements/input.test.ts` drops
`expect(declarations.get('::file-selector-button')).toBe('font:inherit;-webkit-appearance:button')`.
The resolved read in `inherits typography and resolves native control repairs in %s mode` already
asserts both declarations through `readStyle`. The remaining `-webkit-` internal parts stay
text-accounted, with a comment above the case stating the reason: `getComputedStyle` takes no
`::-webkit-` pseudo-element argument, so declaration text is the only reading available for them.
The `::-webkit-file-upload-button` absence assertion stays; it is not a duplicate.

## Obligation 5 — the built-closure sweep

`tests/setupConformance.ts` gains `FORBIDDEN_SIGNATURES` (`jQueryInterface`, `EVENT_KEY`,
`@popperjs`, `createApp`, `__vue`, `tailwind`) beside `FORBIDDEN_RUNTIME`, and
`scanForbiddenBuild(path, names, signatures)` beside `scanForbiddenSource`. It reads the entry and
returns the specifier `scanForbiddenSource` reports, or failing that the first signature the text
carries.

`tests/setupConformance.test.ts` proves it against a scratch copy of `dist/src/core/index.js`: the
clean copy reports nothing; the copy with an appended `jQueryInterface` reports `jQueryInterface`;
the copy with an appended `createApp` reports `createApp`; the copy with a prepended
`import '@popperjs/core'` reports `@popperjs/core`; and the signature-planted copy with an empty
signature list reports nothing, which is what separates the signature pass from the specifier pass.

`tests/conformance.test.ts` gains
`bundles no forbidden runtime into either published JavaScript entry`, over
`dist/src/core/index.js` and `dist/src/browser/index.js`, with a comment stating that
`npm run build:src` precedes it and why a specifier scan alone cannot judge a built entry.

## Wall clock of the rendered proof

`gives every styled tag the same treatment wherever the markup puts it`: **1039 ms** on this host,
read from `vitest run --config configs/src/vite.styles.config.ts --reporter=verbose
tests/src/styles/index.test.ts` on 2026-09-22. The planted-sheet case is 1 ms. The probe record's
reading for the same cross product was about 1.1 s.

## Commands and exit codes

Every `npm` command ran with npm 11.19.1 on `PATH` (`npm --version` confirmed before the first
run; the container default is 10.9.7).

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 213 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run test:setup` | 0 | 5 files, 148 tests passed |
| `npm run test:setup:browser` | 0 | 1 file, 43 tests passed |
| `npm run test:src:styles` | 0 | 58 files, 412 tests passed |
| `npm run build` | 0 | src core, browser, styles; app browser |
| `npm run test:conformance` | 0 | 1 file, 11 tests passed |
| `npm run test:guides` | 0 | 18 tests passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `grep -rn 'matchesLooseTagPair\|scanUnreadForm\|extractSelectorCompounds\|extractCompoundTags' tests src guides` | 1 | no output |

The gate chain ran after my final edit, in this order: `format:check` → `lint:check` → `check` →
`build` → `npm test`. All exit 0. `npm test` was the last run of all and it is green, so nothing
edited after it.

**Observation, not a criterion.** `npm test` (whole chain) exits 0: `src:core` and `src:browser`
73, `src:styles` 412, `app:browser` 26, journey 88 passed and 4 skipped, policy 109 passed and 1
skipped, config 173 passed and 1 skipped, setup 148, `setup:browser` 43, conformance 11, guides 18.
Every skip is pre-existing.

## Tree state

`git status --porcelain` lists 65 entries, all owned: `guides/veneer.md`, 60 modified files under
`tests/`, and the four new untracked files `tests/setupCases.ts`, `tests/setupCases.test.ts`,
`tests/setupCalibration.ts`, `tests/setupCalibration.test.ts`. No file outside the owned set is
touched. No probe was left behind; no probe ran under `tmp/probe/`.

`git diff --stat` (tracked files only; the four new modules are untracked and total 2465 lines):

```text
 guides/veneer.md                              |   24 +-
 tests/conformance.test.ts                     |   19 +
 tests/setupBrowser.test.ts                    |    6 +-
 tests/setupBrowser.ts                         |   83 +
 tests/setupConformance.test.ts                |   45 +-
 tests/setupConformance.ts                     |  129 +-
 tests/setupStyles.test.ts                     |  910 +----------
 tests/setupStyles.ts                          | 1993 +------------------------
 tests/src/styles/**                           |   53 files, import lines only
 61 files changed, 436 insertions(+), 2945 deletions(-)
```

`tests/src/styles/index.test.ts` (+38/-) and `tests/src/styles/elements/input.test.ts` are the two
`tests/src/styles/**` files whose substance changed; the other 51 changed imports only.

## Deviations

None. No stop condition in the deviation contract fired: no moved export's behaviour is pinned
differently in its new home, the normalizer stands without any tag-pair piece, the rendered proof
reports no positional pair on the shipped layer, every gate reached green inside the owned files,
and every file the brief names resolved.

Ancillary choices I settled and recorded, per the deviation contract:

- `scanPositional` takes the mandated pairs as a third argument rather than importing
  `MANDATED_TAG_PAIRS`, so `tests/setupBrowser.ts` gains no dependency on `tests/setupCases.ts` and
  a case can vary the exclusion list.
- `ELEMENT_TAGS` is keyed by partial stem rather than being a flat tag list, because only the stem
  column can close the staleness hole the brief names — `_heading.scss` and `_details.scss` have no
  stem that is a tag.
- `ELEMENT_TAGS` includes `html` and `body`, which the retained probe's tag list omitted. The
  shipped-layer case still reports `[]` with them included.
- Case titles, module-internal ordering, and doc wording throughout.

## Claims of mine I flag as unverified

1. **`scanPositional`'s refusal path is unproven.** A stylesheet holds only the selectors the engine
   parsed, and assigning an unparseable selector to `selectorText` is ignored, so I could not drive
   the throw from a real `CSSStyleRule` on Chromium 141. I recorded the gap in the function's own
   doc comment, naming what is unproven, why it cannot be driven, and what would change that, per
   `.claude/rules/tests.md` § Untestable usually means missing seam. I kept the guard rather than
   deleting it, because an engine that parses a form it will not match would otherwise report a
   silent clean.
2. **`SPECIFIER_READINGS` is not reentrant.** `Visitor.visit` is synchronous and no handler calls
   `extractSpecifiers`, so no interleaving is reachable in this tree; I did not prove that by
   construction, only by reading the call sites.
3. **The `FORBIDDEN_SIGNATURES` list is a judgment, not a measurement.** I confirmed by `grep` that
   none of the six strings occurs in the shipped `dist/src/core/index.js` or
   `dist/src/browser/index.js`, so the case is not vacuous today. I did not verify that each string
   is present in a real bundle of the runtime it names; `EVENT_KEY` and `tailwind` in particular are
   plausible rather than measured.
