<!-- CL4 scope read, checker on native Sonnet (clean context, read-only), brief units/cl4-scope-read-brief.md over units/cl4-brief.md and the Veneer tree at d822d59, 2026-09-21. Verdict: dispatch, with the corrected MANDATED_TAG_PAIRS location and the scan's mechanics folded into units/cl4-brief-2.md. The Orchestrator additionally read the fixture and the reader itself and recorded there that the reboot component's projected property list is empty and its selector list carries 117 entries. -->

## Item 1: brief citations resolve and are true

| Claim | Verdict | Evidence |
|---|---|---|
| `MANDATED_TAG_PAIRS` at `tests/setupStyles.ts:437-456` | FALSE location | Actual declaration is `tests/setupStyles.ts:780-799`, an 18-entry array (`details/summary`, `dl/dt`, `dl/dd`, `fieldset/legend`, `figure/figcaption`, `ol/li`, `optgroup/option`, `ruby/rp`, `ruby/rt`, `select/option`, `table/caption`, `table/colgroup`, `table/tbody`, `table/tfoot`, `table/thead`, `tr/td`, `tr/th`, `ul/li`). Lines 437-456 of that file instead hold theme-map colour entries (`secondary`/`tertiary`/`success` rows), unrelated to tag pairs. |
| `readCompatibility`, `collectShippedComponents`, `scanCompatibilityPresence`, `readDeferrals` in `tests/setupConformance.ts` | true | `tests/setupConformance.ts:469` (`readCompatibility`), `:597` (`collectShippedComponents`), `:633` (`scanCompatibilityPresence`), `:527` (`readDeferrals`). |
| `readOracleInventory` in `tests/setupConformance.ts` | true | `tests/setupConformance.ts:741`. |
| `listed` in `tests/conformance.test.ts:55` | true | `tests/conformance.test.ts:55` reads `const listed: readonly string[] = ['btn']`. |
| Guide's § Compatibility table and deferral table with column shapes | true | `guides/veneer.md:710` (`## Compatibility`, columns Component/Kind/Obligation/Proof/Status at `:722-723`); `guides/veneer.md:192` (`### Deferred selectors`, columns Name/Owner/Reason at `:197-198`). No `Excluded` row exists yet (only match for `Excluded` in the whole guide is the subsection's explanatory prose at `:195`). |
| `src/styles/index.scss` load order after CL3/CL3b | true | `src/styles/index.scss:1-27`: `tokens, theme, reset, elements/html, body, heading, p, hr, a, ul, ol, dl, blockquote, address, abbr, strong, small, mark, sub, sup, code, kbd, pre, samp, var, button, components/button`. |
| `src/styles/elements/_button.scss` and what it declares today | true | Carries `button`, `button:hover`, `button:active`, `button:focus-visible`, `button:disabled` only (`src/styles/elements/_button.scss:1-57`). None of the reboot selectors the brief lists for it (`button:focus:not(:focus-visible)`, `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]`, their `:not(:disabled)` twins) are present. |
| `app/browser/constants.ts`'s `CONTENT_SPECIMENS` and `app/browser/types.ts`'s `ContentSpecimen` | true | `CONTENT_SPECIMENS` at `app/browser/constants.ts:241-286`; `ContentSpecimen` interface at `app/browser/types.ts:18-23` (`name`, `markup`). |
| `app/browser/sections/ContentSection.ts` | true | `app/browser/sections/ContentSection.ts:1-45`. |
| Physical-axis guard and elements-layer guard in `tests/src/styles/index.test.ts` | true | `tests/src/styles/index.test.ts:23-27` (elements-layer, uses `matchesLooseTagPair`), `:28-38` (physical-axis, uses `filterAsymmetricDeclarations`). |
| `node_modules/bootstrap/scss/_reboot.scss` | true, spot-checked | `figure` at line 328, `img, svg` at 335-336, matching the terrain map exactly. |

## Item 2: terrain map's ownership marks against the live tree

| Family | Partial exists? | Verdict |
|---|---|---|
| `b`, `figure`, `img`, `svg`, `table`, `tr`, `label`, `input`, `select`, `optgroup`, `textarea`, `fieldset`, `output`, `iframe`, `details`, `progress` | none of `_b.scss`, `_figure.scss`, `_img.scss`, `_svg.scss`, `_table.scss`, `_tr.scss`, `_label.scss`, `_input.scss`, `_select.scss`, `_optgroup.scss`, `_textarea.scss`, `_fieldset.scss`, `_output.scss`, `_iframe.scss`, `_details.scss`, `_progress.scss` exists | confirmed unowned — `Glob src/styles/elements/*.scss` lists only `html, button, heading, p, hr, blockquote, abbr, small, strong, mark, a, sub, sup, body, code, kbd, ol, ul, address, dl, samp, var`, none of the CL4 set |
| `button` | exists (U7) | confirmed; carries `button`, `button:hover`, `button:active`, `button:focus-visible`, `button:disabled`; does **not** yet carry `button:focus:not(:focus-visible)`, `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]`, or their `:not(:disabled)` twins |

No mark the tree contradicts.

## Item 3: how the presence scan actually reads (decides the unit's shape)

Quoting `tests/setupConformance.ts:633-687` (`scanCompatibilityPresence`):

- **Comparison rule for a `shipped` row's selectors:** exact, normalized-text match, never a substring or fuzzy match. The cascade is parsed with `postcss`'s `parse`, and `parsed.walkRules((rule) => { for (const selector of rule.selectors) selectors.add(normalizeComplexSelector(selector)) })` (`:646-649`) populates a `Set<string>` of every individual selector (a comma-separated rule's list is split by `rule.selectors`, then each member is passed through `normalizeComplexSelector`). For each shipped row, `const present = row.category === 'selector' ? selectors.has(normalizeComplexSelector(name)) : properties.has(name)` (`:678-681`) — a vendor pseudo-element selector such as `::-webkit-search-cancel-button` must match byte-for-byte after normalization (whitespace and combinator normalization only; `normalizeComplexSelector` per `tests/setupStyles.ts:1760-1780` does not touch case or vendor prefixes), so the inventory's selector text must equal the shipped partial's selector text exactly after normalization.
- **Custom properties of a shipped row:** read from `vocabulary.properties` (`inventory.components[row.component].properties`, `:675`) and required present in a separate `Set<string>` built from `parsed.walkDecls((declaration) => { if (declaration.prop.startsWith('--')) properties.add(declaration.prop) })` (`:650-652`) — an exact custom-property name match, unrelated to which selector declares it.
- **Nested or grouped rules:** `parsed.walkRules` (PostCSS) recurses into every nested and grouped rule regardless of depth, so a selector inside a `@media` block or a nested rule is collected the same as a top-level one; nothing in this function restricts the walk to top-level rules.
- **What an `Excluded` row requires** (`:653-669`): the name must appear in the pinned inventory (`readOracleInventory`) — `!candidates.some((component) => { const vocabulary = inventory.components[component]; return vocabulary?.selectors.includes(name) || vocabulary?.properties.includes(name) })` (`:658-664`) — checked with exact-string `.includes(name)` against the inventory's selector and property arrays (a whole-selector match, never a substring, because `.includes` is called on an array of strings), and for `owner === 'Excluded'` the `candidates` pool is `Object.keys(inventory.components)`, every component rather than just the row's declared one (`:657`). Then it must be absent from the built cascade: `name.startsWith('--') ? properties.has(name) : selectors.has(normalizeComplexSelector(name))` (`:666-667`) — again exact normalized-selector match, nested rules included, never a substring test.

This confirms the brief's premise: every reboot selector, including the vendor pseudo-elements and attribute selectors, must be emitted verbatim after normalization in the built cascade for a `shipped` row, and every `Excluded` name must be a whole, exact selector absent from the cascade.

## Item 4: scope by falsified assertions

| Assertion falsified | Location | Item causing it | Brief's Scope grants the file? |
|---|---|---|---|
| `listed` literal `['btn']` | `tests/conformance.test.ts:55` | Flipping `listed` | Yes — Scope names `tests/conformance.test.ts (only listed)` |
| `collectShippedComponents(rows)` returns exactly `['btn']` (the assertion at `:59-61` compares `shipped` to `listed`, so both must move together) | `tests/conformance.test.ts:54-61` | Same file, same edit | Yes, same line |
| Guide Compatibility table has one component (`btn`) | `guides/veneer.md:722-734` | Adding the `reboot` shipped row | Yes — Scope names `guides/veneer.md` |
| Deferral table has no `Excluded` row | `guides/veneer.md:197-260` region | Adding the `Excluded` rows | Yes — same file |
| Elements-layer guard (`tests/src/styles/index.test.ts:23-27`) passes today against the existing partials with no reboot vendor-pseudo selectors | same file | New partials adding pseudo-element and attribute selectors | Yes, conditionally; on the code read a vendor pseudo-element or attribute-only selector names no tag and triggers no pair, so the guard already admits it without an edit |
| Physical-axis guard (`tests/src/styles/index.test.ts:28-38`) sees no declaration from the CL4 tag set today | same file | `legend`'s `float`, `dd`-style margins in the table and fieldset partials | Granted on the same conditional line; whether an edit is needed depends on whether a new partial retains a physical property, which the brief assigns to execution item 2 as a recorded departure |
| `readOracleInventory().components.reboot` synthetic-fixture assertions (`tests/setupConformance.test.ts:604-607`) | `tests/setupConformance.test.ts` | None: those assertions build their own synthetic rows and inventory and read neither the guide nor `listed` | Correctly off-limits; not falsified |
| `app/browser` barrel export set | `app/browser/index.ts:2` (`export * from './constants.js'`) | New `CONTENT_SPECIMENS` rows | A wildcard re-export, so it grows with no edit; not an ungranted gap |
| `ContentSection.test.ts` fixed specimen-count and tag-sequence assertions (`tests/app/browser/sections/ContentSection.test.ts:15-61`) | same file | New `CONTENT_SPECIMENS` rows | Yes — Scope names that file |
| `tests/app/browser/integration.test.ts` | swept, no match for `CONTENT_SPECIMENS`, `ContentSpecimen`, or the content region | n/a | Correctly off-limits; not falsified |
| Files-table rows and departure rows in `guides/veneer.md` | `guides/veneer.md:130-260` | New partials each need a files-table row on the established pattern | Yes — Scope names both |

Sweep covered: `tests/setupConformance.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/src/styles/index.test.ts`, `tests/app/browser/sections/ContentSection.test.ts`, `tests/app/browser/integration.test.ts`, `app/browser/index.ts`, `app/browser/constants.ts`, `app/browser/types.ts`, `guides/veneer.md`; no `package.json` or `configs/**` assertion touches `listed`, `reboot`, or `CONTENT_SPECIMENS` (`none found`).

## Item 5: vendored/off-limits and not-yet-existing owned paths

| File | Status |
|---|---|
| `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` | Vendored; the brief correctly lists none of these as owned |
| Not-yet-existing owned partials (expected, to be created) | `src/styles/elements/_b.scss`, `_figure.scss`, `_img.scss`, `_svg.scss`, `_table.scss`, `_tr.scss`, `_label.scss`, `_input.scss`, `_select.scss`, `_optgroup.scss`, `_textarea.scss`, `_fieldset.scss`, `_output.scss`, `_iframe.scss`, `_details.scss`, `_progress.scss`, plus their mirrored proofs under `tests/src/styles/elements/` |

## Item 6: unclear rows the terrain map flagged

| Row | What the live tree already settles | What the brief leaves the writer to decide |
|---|---|---|
| `*`, `*::before`, `*::after` | Already shipped in `src/styles/_reset.scss:1-6` under the `reset` layer, not `elements` | Nothing; the brief correctly excludes them from CL4's partial list |
| `[hidden]` | Already shipped in `src/styles/_reset.scss:7-9`, and named in the guide's departures row (`guides/veneer.md:656`) | Nothing; already settled |
| Attribute-only and vendor pseudo-element selectors under `button` and `input` | Not yet shipped; on the code read the guard admits them wherever the brief folds them | Only the placement choice between the button and input files, which the terrain map's family grouping already directs |
| Which parent owns an `option` row | Both `optgroup/option` and `select/option` are `MANDATED_TAG_PAIRS` entries (`tests/setupStyles.ts:787,790`); the reboot inventory carries no `option` selector | Moot for CL4; no decision is forced |

## Verdict: dispatch

Rows forcing amendment before dispatch:

- Item 1: the brief's citation `tests/setupStyles.ts:437-456` for `MANDATED_TAG_PAIRS` is wrong; the true location is `tests/setupStyles.ts:780-799`. Correct the line reference before dispatch, because a bench writer opening the wrong lines reads unrelated theme-colour code.

Every other row is confirmed true, every ownership mark holds, the presence-scan mechanics match the brief's premise exactly, scope grants every file the enumerated execution items falsify, and the unclear rows are already settled by the live tree in the direction the brief assumes.
