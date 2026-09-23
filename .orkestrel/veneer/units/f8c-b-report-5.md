# Unit F8c-B round 5 — report

Applied every obligation in `tmp/units/f8c-b-brief-5.md` § Obligations. Rounds 1 to 4 remain
uncommitted and untouched outside the named passages.

## This round's hunks

### `guides/veneer.md`

Obligation 8 (line ~299):

```diff
-`theme` and `base` whatever your markup uses.
-[stylesheet profiles](../tests/service/tailwind/profiles.test.ts) reads that difference.
+`theme` and `base` whatever your markup uses. The stylesheet profiles proof reads that
+difference; see [stylesheet profiles](../tests/service/tailwind/profiles.test.ts).
```

Obligation 1 and obligation 9 (D25b), import-placement paragraph (~314-323):

```diff
-In each recipe that follows, `@source './src'` is the line you change: it names your own markup
-directory, which is what Tailwind scans to decide which utilities to generate. Every `@import` rule
-sits ahead of the `@source` rules, because an `@import` rule is valid only ahead of every rule other
-than `@charset` and `@layer` statements; see
-[CSS Cascading and Inheritance Level 5, § Importing Style Sheets](https://www.w3.org/TR/css-cascade-5/#at-import)
-and [§ Declaring Without Styles](https://www.w3.org/TR/css-cascade-5/#layer-empty). A processor that
-follows that rule drops an `@import` rule written after a `@source` rule, as the `postcss-import`
-plugin Vite bundles does, and the cascade import is the one you lose. Each recipe writes its imports
-first, so the rule holds whichever tool inlines them. The first recipe is the `tailwind` profile,
+In each recipe that follows, the `@source './src'` line is the one you change: it names your own
+markup directory, which is what Tailwind scans to decide which utilities to generate. A `@source`
+rule is unknown to a browser, so the placement rule that drops an `@import` rule written after one
+is not the browser's own: it is the `postcss-import` plugin's, and Vite runs that plugin ahead of
+the Tailwind plugin that would otherwise see the file. The plugin refuses an `@import` rule preceded
+by anything other than `@charset`, a comment, an empty `@layer` statement, or another `@import`
+rule, and drops it. The plugin follows CSS Cascading and Inheritance Level 5,
+[§ Importing Style Sheets](https://www.w3.org/TR/css-cascade-5/#at-import) and
+[§ Declaring Without Styles](https://www.w3.org/TR/css-cascade-5/#layer-empty), for the rules a
+browser treats as valid ahead of an `@import` rule. Each recipe writes its imports first, so the
+rule holds whichever tool inlines them. The first recipe is the `tailwind` profile,
```

Obligation 2 (~352):

```diff
-fixture is that fence with one line changed — `@source './markup.html';` names
+fixture is that fence with one line changed — its `@source './markup.html';` line names
```

Obligation 3 and 4 (~362-365):

```diff
-resolves exactly what the shipped cascade alone resolves for it; and `px-8` moves the button's
-padding off the `.btn` declaration, which is the override a consumer pairs Tailwind for. The
-`tests/fixtures/tailwind/unexcluded.css` fixture is the negative control: with the exclusion
-line dropped, the same reading moves `.col-1`'s `grid-column-start` from `auto` to `1`, which
+resolves exactly what the shipped cascade alone resolves for it; and the `px-8` utility moves the
+button's padding off the `.btn` declaration, which is the override a consumer pairs Tailwind for.
+The `tests/fixtures/tailwind/unexcluded.css` fixture is the negative control: with the exclusion
+line dropped, the same reading moves the `grid-column-start` property of the `.col-1` element
+from `auto` to `1`, which
```

Obligation 5 (~399-405, plus rewrap):

```diff
-silence is what proves the exclusion complete. The instrument `tests/fixtures/tailwind/unexcluded.css`
-drops the line and adds an `@source inline(…)` control naming utilities the cascade declares no
-class for, so the same compilation emits something and the composed imports are read from what it
-emits.
+silence is what proves the exclusion complete. The `tests/fixtures/tailwind/unexcluded.css`
+instrument drops the line and adds an `@source inline(…)` control naming utilities the cascade
+declares no class for, so the same compilation emits something and the composed imports are read
+from what it emits.
```

Obligation 10, first passage (~373-377):

```diff
-The exclusion line names the class names Veneer and Tailwind both declare and Veneer declares
-without `!important`. A shared name Veneer ships with its `!important` declaration wins by
-importance whatever the layer order, so it needs no entry; a shared name Veneer declares normally
-would otherwise resolve to Tailwind's rule, so the line withholds that name from Tailwind's
-generation and Veneer's declaration is the only one the page carries.
+The exclusion line names the class names Veneer and Tailwind both declare. A shared name leaves
+the exclusion line only where Veneer declares with `!important` every longhand that Tailwind's
+rule for that name declares; a name Veneer declares important on some other longhand stays on the
+line, because that importance does not cover every longhand Tailwind's rule would otherwise win.
+The line withholds a name that stays on it from Tailwind's generation, so Veneer's declaration is
+the only one the page carries for it.
```

Obligation 10, second passage (~390-397):

```diff
-so a derivation that reached an empty stylesheet cannot read as a clean result. It then holds the
-exclusion line equal to the derived names Veneer declares without `!important`, which states the
-rule as an equality: a name that joins the set joins the line, and a name Veneer starts declaring
-with `!important` leaves it. The importance branch runs over the names Veneer does declare with one.
-No shipped shared name is important, so that branch is driven by a planted important declaration for
-one shared name, and it reads what the rule claims: with the exclusion line dropped and Tailwind's
+so a derivation that reached an empty stylesheet cannot read as a clean result. It then holds the
+exclusion line equal to the derived names for which Veneer does not declare with `!important`
+every longhand Tailwind's rule for that name declares, which states the rule as an equality: a
+name that joins the set joins the line, and a name that gains an `!important` declaration for
+every longhand Tailwind's rule for it declares leaves the line. The importance branch runs over the
+names Veneer declares important on some longhand. No shipped shared name is important, so that
+branch is driven by a planted important declaration for one shared name, and it reads what the
+rule claims: with the exclusion line dropped and Tailwind's
```

Obligation 6 (~413-414):

```diff
-`npm run build:src:styles`, then `npm run test:service`. The `prepublishOnly` script runs it, and
-`npm test` does not.
+`npm run build:src:styles`, then `npm run test:service`. The `prepublishOnly` chain runs the
+`test:service` script, and the `test` script does not.
```

Obligation 7, § Files row:

```diff
-| `tests/setupService.ts` | … the pinned browser … |
+| `tests/setupService.ts` | … the pinned Chromium … |
```

Obligation 11, rewrap of the preflight-pairing paragraph (line ~419's continuation past 100 columns):

```diff
-properties Veneer leaves alone. [The preflight pairing](../tests/service/tailwind/preflight.test.ts) derives
-the overlap — the tags the compiled `base` layer's type selectors name, intersected with the tags
-Veneer's elements partials style — renders one neutral element per tag, and reads every longhand
-that layer declares, as Chromium expands it, before and after the profile loads. Each property Veneer's own rules declare for
-the tag is asserted unchanged, and each property that moved is a row of the following table.
+properties Veneer leaves alone.
+[The preflight pairing](../tests/service/tailwind/preflight.test.ts) derives the overlap — the
+tags the compiled `base` layer's type selectors name, intersected with the tags Veneer's elements
+partials style — renders one neutral element per tag, and reads every longhand that layer
+declares, as Chromium expands it, before and after the profile loads. Each property Veneer's own
+rules declare for the tag is asserted unchanged, and each property that moved is a row of the
+following table.
```

Formatting: obligation 7's one-word cell edit lengthened the `Role` column of the constants table
(lines ~179 to 239), so `npx oxfmt` repadded that whole table by one column, and repadded four
adjacent § Files rows (~241 to 244) the same width. No prose or content changed in that repad;
verified with `diff` against the file before and after running `oxfmt` there, confined to those
line ranges.

### `tests/setupService.ts`

```diff
- * rather than a module resolution. `source(none)` keeps the compiler from scanning the working
- * directory, so the one candidate it reads is the inline one.
+ * rather than a module resolution. The `source(none)` argument keeps the compiler from scanning
+ * the working directory, so the one candidate it reads is the inline one.
```

```diff
- * @param options - The provider options, as `resolveBrowser` in `configs/browsers.ts` returns them.
+ * @param options - The provider options, as the `resolveBrowser` function in the
+ *   `configs/browsers.ts` file returns them.
```

```diff
- * @returns The plugin creator `@tailwindcss/postcss` exports as its default.
+ * @returns The plugin creator the `@tailwindcss/postcss` package exports as its default.
```

```diff
- * The path is the `from` of the compile, so every relative `@import` and `@source` in the profile
- * resolves against the directory the profile sits in, the way a consumer's build resolves the
- * recipe it copied. No bundler or alias stands between the profile and the compiler.
+ * The path is the `from` of the compile, so every relative `@import` rule and `@source` rule in
+ * the profile resolves against the directory the profile sits in, the way a consumer's build
+ * resolves the recipe it copied. No bundler or alias stands between the profile and the compiler.
```

```diff
- * @throws An `Error` when the stage holds anything an earlier `open` acquired, or when the host
- *   resolves a remote connection rather than a local executable; the launch's or the read's own
- *   error when either fails.
+ * @throws An `Error` when the stage holds anything an earlier `open` call acquired, or when the
+ *   host resolves a remote connection rather than a local executable; the launch's or the read's
+ *   own error when either fails.
```

```diff
- * An authored shorthand is expanded by the engine that resolves it, so `border: 0 solid` reports
- * the width, style, and color of each side, and the population a computed comparison walks is the
- * one a computed style carries. The sheet is a constructed one that is never adopted, so reading
+ * An authored shorthand is expanded by the engine that resolves it, so an authored
+ * `border: 0 solid` declaration reports the width, style, and color of each side, and the
+ * population a computed comparison walks is the one a computed style carries. The sheet is a
+ * constructed one that is never adopted, so reading
```

### `tests/setupServer.ts`

```diff
- * so `@layer outer { @layer inner { … } }` reads as `outer` and `inner`, although the cascade places
- * the nested layer as `outer.inner`, the name a statement writes to place it.
+ * so an authored `@layer outer { @layer inner { … } }` block reads as `outer` and `inner`,
+ * although the cascade places the nested layer as `outer.inner`, the name a statement writes to
+ * place it.
```

```diff
- * own license comment and the question is about the first rule. {@link SheetReader.order}
- * answers the neighbouring question across the whole sheet and absorbs every later placement,
- * so this is the one reading that reports a compiler having prepended a statement of its own.
+ * own license comment and the question is about the first rule. The
+ * {@link SheetReader.order} member answers the neighbouring question across the whole sheet
+ * and absorbs every later placement, so this is the one reading that reports a compiler having
+ * prepended a statement of its own.
```

```diff
- * inside a rule is not a rule, so `.container { @media (width >= 40rem) { max-width: 40rem } }`
- * reports `max-width` under `.container`, the shape the compiler emits for a responsive
- * utility. A declaration no style rule encloses, such as a descriptor of an `@font-face` rule,
- * is not reported.
+ * inside a rule is not a rule, so an authored
+ * `.container { @media (width >= 40rem) { max-width: 40rem } }` rule reports `max-width` under
+ * `.container`, the shape the compiler emits for a responsive utility. A declaration no style
+ * rule encloses, such as a descriptor of an `@font-face` rule, is not reported.
```

`collectImportantNames` doc block (per D25's per-property correction, obligation 10):

```diff
 * @remarks
- * This is the other half of the shared-name rule. A name Veneer declares with `!important` wins by
- * importance in any layer order, so a recipe need not withhold it; a name Veneer declares normally
- * has to be withheld. A name declared important in one rule and normally in another is reported,
- * because one important declaration is what the cascade resolves to.
+ * This is the other half of the shared-name rule, which runs per property rather than per name: a
+ * shared name leaves the exclusion line only where every longhand Tailwind's rule for that name
+ * declares carries an `!important` declaration here, and a name important on some other longhand
+ * still needs the line. A name declared important in one rule and normally in another is reported,
+ * because one important declaration is what the cascade resolves to.
```

## Obligation 14 — extra edits

None found. Every replaced sentence was re-read against `writing.md` § Code tokens after editing;
each remaining bare token (`@charset`, `@layer` in the enumerated list at line ~319, `@import` at
the line break at ~320-321, and the possessive forms `postcss-import` plugin's / Tailwind's /
`base` layer's) already carries a following noun or attaches its possessive to that noun rather
than to the token itself, matching the pattern used elsewhere in the guide. No further edit was
made.

## ROADMAP row (shared, report-only)

Add to `ROADMAP.md`:

> F8d IMPORTANCE-LONGHANDS: `collectImportantNames` and the equality in `derives the shared class
> names…` compute importance over the longhands Tailwind's rule declares, so the equality and the
> branch case enforce one rule.

## Gate exits

- `npx oxfmt --check guides/veneer.md tests/setupService.ts tests/setupServer.ts` — exit 0.
- `npm run check` — exit 0.
- `npm run test:guides` — exit 0 (18 tests passed).
- `npm run test:setup` — exit 0 (202 tests passed; one logged `stderr` line is the expected error
  path of `compileProfile > refuses a profile whose import resolves to nothing`, not a failure).

## Acceptance criterion 1 — grep results

`grep -n -F` for each source phrase of obligations 1 to 8, 12, and 13 across `guides/veneer.md`,
`tests/setupService.ts`, and `tests/setupServer.ts` returned no matches for any of the nine
phrases, confirming each replacement landed exactly once.
