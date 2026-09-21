# CL5 scope read — report

Executor: `checker` on native Sonnet, read-only, under
`.orkestrel/veneer/units/cl5-scope-read-brief.md`, reading
`.orkestrel/veneer/units/cl5-brief.md` against the Veneer checkout.

The returned row table and amendment list follow.

## Row table

| Row | Ruling | Evidence |
| --- | --- | --- |
| 1 component mirror | amend | `src/styles/components/_button.scss:1-232` wraps its rules in `@layer components` and reads tokens through `@use '../tokens'` and mixins through `@use '../mixins' as *`. The folder a new partial belongs in is `src/styles/components/`, which holds that file only. The lane did not open the component proof, so it left the case table that proof reads unconfirmed. (The Orchestrator then confirmed `tests/src/styles/components/button.test.ts` exists and reads its case tables from `tests/setupStyles.js`.) |
| 2 barrel load | holds | `src/styles/index.scss:43` is `@use 'components/button' as button-component;`, the last line, after every element load at `:4-42`. A new component partial is added the same way. |
| 3 showcase barrel | amend | `app/browser/index.ts:1-5` is five wildcard re-exports: `./types.js`, `./constants.js`, `./Showcase.js`, `./sections/ButtonSection.js`, `./sections/ContentSection.js`. It re-exports modules rather than naming symbols, so the new specimen tables reach the barrel through the existing constants re-export and only the two section files need a line each. |
| 4 showcase proof | amend | `tests/app/browser/Showcase.test.ts:58` asserts the exact region-label sequence `['Showcase', 'Buttons', 'Content']`, which adding two sections makes false. Line 40 counts the main wrapper and line 105 counts sections after destroy; neither is affected. |
| 5 `listed` expectation | amend | `tests/conformance.test.ts:55` holds `['btn', 'reboot']`, compared at `:59-61` against `collectShippedComponents`, which is the function's real name (`tests/setupConformance.ts:597-618`), not `deriveListed`. A component other than `engine` joins when its selector rows are non-empty and all shipped, and either its variable rows are non-empty and all shipped or its variable rows are empty and the inventory's projected properties array is empty (`:602-616`). Every CL5 key has empty properties, so the selector-row branch at `:611-612` admits it with no variable row. |
| 6 ledger-derived cases | amend | `tests/setupConformance.test.ts:752` asserts the component set equals `['btn', 'reboot', 'engine']` inside the dash-proof case at `:747`; it reads the whole compatibility table and is the one case not scoped to a single component, so every CL5 guide row makes it false. The cases at `:615`, `:642`, and `:659` filter to the button component first and control their own population. |
| 7 tokens | holds | `src/styles/_tokens.scss:228-233` carries `--vn-display-1: 5rem` through `--vn-display-6: 2.5rem` with no enclosing media condition. `src/styles/elements/_heading.scss:13-16` gives each heading tag `var(--vn-size-#{9 - $level})`, so `h1` reads `--vn-size-8` (`2.25rem`) down to `h6` reading `--vn-size-3` (`1rem`), from `_tokens.scss:221-226`. |
| 8 the guard | amend | No predicate in `tests/setupConformance.ts` refuses a compound selector, a combinator, a pseudo-class, or a pseudo-element. `scanCompatibilityPresence` (`:633-687`) checks presence by normalized selector string against the built cascade and the inventory. The `MANDATED_TAG_PAIRS` remark at `:775-802` concerns the elements layer selecting one bare tag, which does not reach a components-layer partial. `.blockquote > :last-child`, `.list-inline-item:not(:last-child)`, and `.blockquote-footer::before` all pass once shipped and present. |
| 9 physical-axis rule | amend | No coded predicate governs `.img-fluid`. The direction-sensitive scan (`matchesDirectionSensitive` at `:937-945`, `scanPhysicalDeclaration` at `:986-996`, `PHYSICAL_LONGHANDS` at `:723-747`) covers inline-axis longhands, shorthands, and keywords, and does not include `max-width` or `height`. The only source of the logical-property expectation is the precedent at `src/styles/elements/_img.scss:4-5`. |
| 10 calibration record | amend | `research/calibration-content.md` carries sections for tag families only: `paragraph`, `heading`, `list-ul`, `list-ol`, `list-dl`, `blockquote`, `hr`, `anchor`, `table-bare`, `table-striped`, `table-bordered`, `figure`, `img`, `code-family`, `small-mark`, `abbr`, `address`, `sub-sup`. A search for `lead`, the display names, `initialism`, `list-unstyled`, `list-inline`, and the class spellings returns nothing. So the record measures no CL5 class selector. |
| 11 mixins | holds | No criterion in the brief needs a mixin outside what `src/styles/_mixins.scss` already exports. |
| 12 the owned set | amend | Every Owned path that already exists was confirmed at the path named. `tests/app/browser/Showcase.test.ts` belongs in the Owned list unconditionally rather than under a hedge, because row 4 shows its assertion already goes false. The showcase barrel entry needs only the two section lines. No Owned path was found missing. |

## Amendments

1. Row 3: the showcase barrel adds one wildcard re-export line per new section file; the specimen
   tables reach it through the existing constants re-export, so `constants.ts` needs no new
   export statement.
2. Row 5: the function is `collectShippedComponents` at `tests/setupConformance.ts:597-618`, not
   `deriveListed`. A CL5 key with an empty properties list needs no variable row, admitted by the
   selector-row branch at `:611-612`.
3. Row 6: the one ledger-derived case whose population changes is `tests/setupConformance.test.ts:752`,
   inside the dash-proof case; the others scope to the button component.
4. Row 8: no predicate refuses a compound selector, a combinator, a pseudo-class, or a
   pseudo-element for a components-layer partial. All three named selectors pass once shipped.
5. Row 9: no coded predicate governs the image class's axis. Follow the precedent at
   `src/styles/elements/_img.scss:4-5` and record the departure from Bootstrap's physical
   properties, because no gate enforces it.
6. Row 10: the calibration record measures tag families only and carries no row for any CL5 class
   selector. The heading and display class twins bind to the heading tag's tokens under this
   unit's ruling; every other CL5 value is retained from Bootstrap's own line.
7. Row 12: put `tests/app/browser/Showcase.test.ts` in the Owned list unconditionally, for its
   region-label sequence assertion.
