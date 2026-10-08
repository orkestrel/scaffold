# Verdict: variants for native-module chrome and later styled components, 2026-10-08

Veneer variants key on one authored host attribute, `data-vn-color`, whose value is a key of Bootstrap's `$theme-colors` map. The sortable lands first. One inline `@each` over `map.keys(maps.$theme-colors)` in `src/styles/surfaces/_drag.scss` writes one rule per key, and each rule sets the `--vn-drag-color` property from `$theme-colors-text` on the host and again on any direct item that carries its own `data-bs-theme`. The insertion line, the over tint, and the empty-host outline therefore take the key's text-emphasis color in the color mode the item paints in. The loop moves into a `recolor` mixin in `src/styles/_mixins.scss` with the second module that needs a color. No Bootstrap file, scaffold rule, class registry group, or class census changes. The `TOKEN_NAMES` registry gains its `veneer` group with a two-way pin. Four questions remain for you, each with one recommendation, in § Questions for the user.

This verdict answers the variant item of your request of 2026-10-08: "I would like to allow applying variants to drag and drop elements and other elements and components that we come up with that need styling." It also rules the tension the D2.3 contract deferred (`drag-2026-10-08/verdict.md:121`): the sortable takes a theme-color variant, and the variant is the `data-vn-color` attribute, not a `.drag-{color}` class. The other three items of the request (the copy button on Edge for Android, the column-sort links, and the sortable that stopped responding) belong to the M1 mobile repair, whose reading traces the sortable and sort failures to the sorter's boot throwing in an insecure context and destroying the scope (`native/mobile-2026-10-08/user-reading.md`).

The verdict keeps the judgment's selection (`judgment.md`: attribute 27, class 25, token 21, and the selected mechanism 29 of 30) and settles every critique gap the judgment left open. Of the critique's 23 gaps, 9 fall with the class and token proposals that this verdict rejects (gaps 1, 2, 3, 8, 9, 14, 15, 16, and 17), the judgment closed gap 6, and this verdict closes the other 13 (gaps 4, 5, 7, 10, 11, 12, 13, 18, 19, 20, 21, 22, and 23). For gap 4, this verdict takes the critique's island selector in a narrower form, because a reading the critique lacked shows that its descendant form misreads plain list-group items (§ Dark mode and color-mode islands). The `journal.json` file beside this verdict maps each gap to the section that rules it.

The verdict reads `/home/user/veneer` at `9f56e6a` (`origin/main`) and the `landing` branch at `de168b8`, which holds D2.2 to D2.6 and the keep-screen-on module. A bare line number names `de168b8` unless the item names another tip. A record path such as `judgment.md` or `brief.md` is relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/`; `drag-2026-10-08/verdict.md` is relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/`; and `native/mobile-2026-10-08/user-reading.md`, `browser-stage-b-verdict.md`, and `stage-b/user-rulings-2026-10-06.md` are relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/`. A source or test path is relative to `/home/user/veneer`. The scout's `contrast.txt` file and the `verdict/`, `judge/`, `probe/`, and `token/` run folders sit under `/home/user/veneer/tmp/units/variants-2026-10-08/`. A `styles.md` citation names `/home/user/scaffold/.claude/rules/styles.md`. Two runs of 2026-10-08 back this verdict's own numbers and samples: `verdict/compile.ts` with `verdict/compile.txt`, and `verdict/contrast.ts` with `verdict/contrast.txt`. No browser ran, no source file changed, and nothing was committed.

## Findings

The following table lists the facts the mechanism rests on, each with its source.

| Finding | Source |
| --- | --- |
| The maps partial holds the 8 `$theme-colors` keys in upstream order with `var(--bs-KEY)` values, and the `$theme-colors-text`, `$theme-colors-bg-subtle`, and `$theme-colors-border-subtle` maps under the same keys. Every color value is a `var()` reference, so no Sass color function such as `color-contrast()` can run on it, and `$spacers`, `$border-widths`, and `$font-sizes` hold literal lengths. KEY, here and in the rest of this verdict, stands for a `$theme-colors` key. | `src/bootstrap/_maps.scss:31-73`, `:101-125`; `tests/fixtures/bootstrap/maps.json` |
| The 8 theme-color keys equal the contextual list-group item keys of the class registry, leaving out `action` and `base`. | `src/core/constants.ts:1489-1498` |
| The `--bs-KEY` tokens sit in the light root block alone, so they keep one value in dark mode. The text-emphasis, bg-subtle, and border-subtle families retune under `[data-bs-theme='dark']`. A theme pack that retunes `--bs-KEY` therefore leaves `--bs-KEY-text-emphasis` unchanged. | `src/bootstrap/_tokens.scss:44-51`, `:60-83`, `:139`, `:155-178` |
| In light mode the `light` and `dark` text-emphasis tokens are both `#495057`, and the `primary` token is `#052c65`, darker than the `#0d6efd` literal that `.list-group` gives the uncolored line. | `src/bootstrap/_tokens.scss:60`, `:66-67`; `src/bootstrap/components/_list-group.scss:20` |
| The composable reads `var(--vn-drag-color, var(--bs-list-group-active-bg, var(--bs-primary)))`. The line resolves it on the item's `::after` pseudo-element, the over tint and the empty-host outline resolve it on the host, an `.active` item reads `--bs-list-group-active-color`, and forced colors paint the line and the outline in `Highlight`. No rule declares `--vn-drag-color` at `de168b8`. | `src/styles/composables/_drag.scss:4`, `:32-42`, `:55-72` |
| The `.list-group` class declares the list-group tokens on the host, and `.list-group-item` paints the host's resolved `--bs-list-group-bg` and `--bs-list-group-color`. A contextual `list-group-item-KEY` class declares them again on the item. A plain item that carries its own `data-bs-theme` therefore keeps the host mode's paint, and a contextual item paints its own mode. | `src/bootstrap/components/_list-group.scss:4-21`, `:36-44`, `:239-250` |
| Against the body background, the text-emphasis family reads 6.10 or more in every key and mode. The base family reads 1.96 for `info`, 1.63 for `warning`, and 1.05 for `light` on the light body, and 1.00 for `dark` on the dark body, under the 3:1 WCAG 2.2 asks of a state graphic. | `contrast.txt` (scout run, 2026-10-08) |
| Against every contextual bg-subtle background of the same mode, the text-emphasis family reads 4.55 or more, lowest for `danger` on the dark `light-bg-subtle` background. | `probe/contrast.txt` (attribute lane run, 2026-10-08) |
| On an item that carries the other color mode, a line resolved on the host reads 1.00 to 1.69 against a contextual item's background and 6.10 to 14.63 against a plain item's. A line resolved on the item reads 4.55 to 10.91 against a contextual item's background and 1.05 to 2.53 against a plain item's. | `verdict/contrast.txt` |
| The `surfaces` layer precedes `composables`, so a `composables` declaration of a property on the host beats every `surfaces` declaration of it. | `src/styles/_tokens.scss:2` |
| The load gate admits `@use '../bootstrap/maps'` from `src/styles` and refuses every other crossing. The styles build sets no Sass load path, and `compileEntry` passes the workspace root as one. | `tests/conformance.test.ts:769-846`; `configs/src/vite.styles.config.ts:5-21`; `tests/setupServer.ts:407-409` |
| The package publishes both SCSS trees and exports `./styles/scss` and `./styles/themes/scss`, while the distribution proof compiles `./bootstrap/scss` alone. The themes barrel loads `_mixins.scss` through `themes/_default.scss`. | `package.json:13-21`, `:54-57`; `tests/distribution.test.ts:842-884`; `src/styles/themes/_default.scss:1` |
| The inline partial compiles to one rule per key with the island selector beside the host selector, and every `de168b8` rule follows unchanged. A planted two-key configuration generates exactly those keys, a hand-listed control emits all 8 under it, and a family without a key refuses the compile. The move into `recolor` changes the output in selector-list line breaks alone, `_mixins.scss` emits no CSS after it loads the maps, and the themes barrel compiles the same sheet. | `verdict/compile.txt` (Sass 1.105.1, exit 0) |
| `TOKEN_NAMES` holds the `bootstrap` group alone, the core proof pins `['bootstrap']`, and the `TOKEN_NAMES.veneer` pin is an `it.todo` case. `ROADMAP.md:46` lands the group "with its first declared token", while `:143` waits for "the first global token". The `collectSheetNames` instrument reports each custom property with its selector and layer sites. | `src/core/constants.ts:1-15`; `tests/src/core/index.test.ts:64-65`; `tests/src/styles/index.test.ts:85-87`; `tests/setupStyles.ts:139-166` |
| The section census and the page census read class tokens alone, so a data attribute passes both unchanged. | `tests/app/browser/sections/integration.test.ts:59-62`; `tests/app/browser/integration.test.ts:1397-1412` |
| A journey case runs in all 4 journey projects unless `JOURNEY_PLACEMENTS` or `COMPONENT_TABLES` places it, and `JOURNEY_PLACEMENTS.shared` holds `dark-1280` and `light-390`. § Variant placement says the shared cases read nothing a color mode changes, and it names `containment` and `progress` entries that the constant lacks and no test reads. | `tests/setupBrowser.ts:4004-4009`; `guides/veneer.md:2715-2754` |
| Four sentences turn false with V1, and one is false at both tips: the § Surface sentence that every `TOKEN_NAMES` member is a Bootstrap declaration (`guides/veneer.md:37-39`), the Showcase opener and the roadmap's showcase line, which say the sheet paints state attributes (`guides/veneer.md:2249-2250`; `ROADMAP.md:141`), the composable comment that the line follows a contextual item "unasked" (`src/styles/composables/_drag.scss:3`), and the guide index rows that give the `./styles` sheet no showcase (`guides/README.md:26-28`, `:51`). | Those lines |
| Oxlint reads no `.scss` file, so the `policy/no-banned-term` rule never reads a partial's comment. | `package.json:69` |
| Of the native modules at `de168b8`, the sortable alone paints a color that no Bootstrap class varies on its host (§ Generation criterion). | `judgment.md` § Generation criterion; `src/browser/` module folders |

## Mechanism

### Keying and naming

A host that veneer styles takes one authored attribute, `data-vn-color`, whose value names a `$theme-colors` key. The following table names each piece of the mechanism:

| Kind | Name | Rule |
| --- | --- | --- |
| Host attribute | `data-vn-color` | One word after `data-vn-`, as `data-vn-drag`, `data-vn-sort`, `data-vn-sentinel`, and `data-vn-time` have |
| Attribute value | `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, or `dark` | The upstream keys of `$theme-colors` (`src/bootstrap/_maps.scss:31-40`) |
| Sortable property | `--vn-drag-color` | `--{scope}-{property}` (`styles.md:103`); the composable chain reads it first (`src/styles/composables/_drag.scss:4`) |
| Later module property | `--vn-MODULE-color`, `--vn-MODULE-bg`, or `--vn-MODULE-border-color` | The same form, with Bootstrap's component token words such as `--bs-alert-bg` and `--bs-alert-border-color` |
| Mixin, at the second caller | `recolor($tokens)` | A lowercase kebab-case verb (`styles.md:101`) |
| Sass locals | `$key`, `$value` | Lowercase kebab-case (`styles.md:102`) |

In the preceding table, MODULE stands for the word of a module's host attribute, such as `sort` for `[data-vn-sort]`. The word `color` names the axis its values range over, Bootstrap's theme colors, and it is the last word of the property it sets, so the attribute and the property share one term. The other candidate words fall in § Rejected.

An attribute holds one value, so a host carries one color by construction. A value outside the key list matches no rule and leaves the default chain in place. The rules compound on a module's host attribute, so the attribute on a Bootstrap component such as `.alert` matches nothing; that component keeps Bootstrap's own `alert-KEY` class, because stage B decision D-6 refuses take-overs of Bootstrap classes (`browser-stage-b-verdict.md:1055`).

### Generation

Unit V1 adds the color rules at the head of the single `@layer surfaces` block in `src/styles/surfaces/_drag.scss`, before the handle rules and the grouped-host rule of `de168b8`. The partial reads as the following fence states, and `verdict/compile.ts` compiled it over the `de168b8` partial:

```scss
@use 'sass:map';
@use '../../bootstrap/maps';

@layer surfaces {
	// The line takes the text-emphasis family, the family a contextual list-group item gives it.
	@each $key in map.keys(maps.$theme-colors) {
		$value: map.get(maps.$theme-colors-text, $key);

		// A missing key would compile to an empty declaration and hide the composable's fallback chain.
		@if not $value {
			@error 'maps.$theme-colors-text holds no #{$key} key';
		}

		// An item that carries its own color mode resolves the color in that mode, because a custom
		// property inherits the value its host computed.
		[data-vn-drag][data-vn-color='#{$key}'],
		[data-vn-drag][data-vn-color='#{$key}'] > [data-bs-theme] {
			--vn-drag-color: #{$value};
		}
	}

	// ... the handle rules and the grouped-host rule of de168b8, unchanged
}
```

The run compiled the first two keys to the following rules, and the other six keys and the `de168b8` rules follow in the same block (`verdict/compile.txt`, the inline reading):

```css
@layer surfaces {
  [data-vn-drag][data-vn-color=primary],
  [data-vn-drag][data-vn-color=primary] > [data-bs-theme] {
    --vn-drag-color: var(--bs-primary-text-emphasis);
  }
  [data-vn-drag][data-vn-color=secondary],
  [data-vn-drag][data-vn-color=secondary] > [data-bs-theme] {
    --vn-drag-color: var(--bs-secondary-text-emphasis);
  }
  /* ... six more keys, then the handle rules and the grouped-host rule */
}
```

The following facts govern the partial:

- The `@use '../../bootstrap/maps'` statement is the one crossing the gate admits (`tests/conformance.test.ts:769-846`), and the partial loads nothing else from `src/bootstrap`.
- Keys come from the axis map and values from the family map, as Bootstrap 5.3.8 keys its contextual list-group and alert classes on `map-keys($theme-colors)` (`node_modules/bootstrap/scss/_list-group.scss:185`; `_alert.scss:60`). A consumer who configures either map through `@use … with` changes the output, and a family that lacks a key refuses the compile with the partial's message (`verdict/compile.txt`, the planted and gap readings).
- The partial writes one `surfaces` block, no literal color, no `!important` declaration, and no call to a Bootstrap mixin.
- Each comment states why, carries no ratio, and replaces the judgment's "clears 3:1 in both modes" clause, which cited no run (critique gap 21). Oxlint reads no `.scss` file, so each unit that edits a partial sweeps its comments by hand (§ Units).
- The `src/styles/composables/_drag.scss` partial keeps every rule. Its `:3` comment becomes "A contextual list-group item sets its own active background, so an uncolored host's line follows it.", because "unasked" turns false under a colored host. Sass drops a `//` comment, so the built `composables` block stays byte-equal.

### The mixin at the second caller

When a second module passes § Generation criterion and needs a color, `styles.md:65` moves the loop into `src/styles/_mixins.scss`, and unit V3 carries the move. The `verdict/compile.ts` run compiled the following mixin under the `de168b8` mixins, which closes the stale-tip gap of the attribute lane's probe (critique gap 22):

```scss
@use 'sass:map';
@use 'sass:meta';
@use '../bootstrap/maps';

// ... retune, reduced-motion, and transition, unchanged

// A call outside a host rule would color the document root, and a family that lacks a key would empty
// the property, so either one refuses the compile.
@mixin recolor($tokens) {
	@if not & {
		@error 'recolor runs inside a module host rule';
	}

	@each $key in map.keys(maps.$theme-colors) {
		// An item that carries its own color mode resolves the color in that mode, because a custom
		// property inherits the value its host computed.
		&[data-vn-color='#{$key}'],
		&[data-vn-color='#{$key}'] > [data-bs-theme] {
			@each $token, $source in $tokens {
				$value: map.get(meta.module-variables('maps'), $source, $key);

				@if not $value {
					@error 'maps.$#{$source} holds no #{$key} key';
				}

				#{$token}: $value;
			}
		}
	}
}
```

The following facts govern the move:

- Each caller writes `@include recolor((TOKEN: 'FAMILY', ...))` inside its host rule in its own `surfaces/` partial, where TOKEN is a `--vn-MODULE-*` property and FAMILY names a maps variable without its `$`. The sortable writes `[data-vn-drag] { @include recolor(('--vn-drag-color': 'theme-colors-text')); }` and drops its maps load, so only `_mixins.scss` crosses the face boundary.
- A two-family call compiled for a fictional `[data-vn-zone]` drop-zone host, writing `--vn-zone-bg` from `theme-colors-bg-subtle` and `--vn-zone-border-color` from `theme-colors-border-subtle`. The call outside a host rule and a border family with one key each refused (`verdict/compile.txt`).
- Sass writes a selector list that the parent selector builds on one line, so the moved output differs from the inline output in line breaks alone (`verdict/compile.txt`, the move check). The V1 generation case therefore compares selector lists split on commas with whitespace collapsed, and it runs unchanged across the move.
- `_mixins.scss` emits no CSS after it loads the maps, and the themes barrel, which loads `_mixins.scss` through `themes/_default.scss`, compiles the same sheet before and after the move (`verdict/compile.txt`). The packed themes case of V1 reads that result from an install.
- The island selector reaches the host's direct children, where the sortable draws its chrome. A later module whose chrome reads its property deeper than the direct children rules its own island reach in its unit.

### Placement and layers

The following table places each file the mechanism touches, under the order `reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities` (`src/styles/_tokens.scss:2`):

| File | Layer | Holds |
| --- | --- | --- |
| `src/styles/surfaces/_drag.scss` | `surfaces`, a single time | The color rules, the handle rules, and the grouped-host rule |
| `src/styles/composables/_drag.scss` | `composables`, a single time | Every rule unchanged; the `:3` comment rewritten |
| `src/styles/_mixins.scss`, at V3 | None; it emits no CSS | The `recolor` mixin beside `retune`, `reduced-motion`, and `transition`, and the maps load |
| `src/styles/modifiers/_index.scss` | None | Unchanged and empty |

The color rules belong in `surfaces/`, because an attribute present in the markup before script runs is that folder's job (`ROADMAP.md:105`; `drag-2026-10-08/verdict.md:234`). The `modifiers/` folder holds a class that sets a token, and its registry twin names each class (`ROADMAP.md:104`, `:128`), which an attribute lacks.

The `surfaces` layer precedes `composables`, so the fallback law holds the order: no veneer rule declares a property that a color rule declares, except the color rules, and the chrome reads that property with its Bootstrap fallback inside `var()`. Two facts require the law. A `composables` declaration on the host would beat every color rule by layer order. A host default of the chain would resolve `--bs-list-group-active-bg` on the host and fix every contextual item's line to `#0d6efd`. The registry pin's site check and the composables-default control hold the law (§ Units, V1), and V2 states it in the guide's § Styles sheet (critique gap 11).

### Registries

The registries change as the following list states:

- **The `veneer` token group lands.** `TOKEN_NAMES` gains the group in `src/core/constants.ts` under the key law of `ROADMAP.md:46`, frozen and annotated as the `bootstrap` group is, with its leaves in the order the built `./styles` sheet first declares them; the `surfaces` barrel loads before the `composables` barrel (`src/styles/index.scss:5-6`). The group reads as the following fence states:

  ```ts
  veneer: /* @__PURE__ */ Object.freeze({
  	drag: /* @__PURE__ */ Object.freeze({
  		color: '--vn-drag-color' as const,
  		size: '--vn-drag-size' as const,
  		opacity: '--vn-drag-opacity' as const,
  	} as const),
  } as const),
  ```

- **The doc block keeps its description paragraph.** The `TOKEN_NAMES` description stays as it is, so the guide's Summary cell stays equal to it. In its `@remarks` tag, "A registry name states that the bundled CSS declares it somewhere" becomes "A `bootstrap` name states that the bundled CSS declares it somewhere", and the tag gains "The `veneer` group holds every `--vn-*` name the built `./styles` sheet declares on any selector."
- **The two-way pin replaces the `it.todo` case.** The case at `tests/src/styles/index.test.ts:85-87` becomes `pins every Veneer token leaf to the built styles sheet both ways`, in the shape of `tests/src/bootstrap/index.test.ts:475-490`. The `collectSheetNames` reading of the built sheet equals the sorted `TOKEN_NAMES.veneer` leaves, so a `--bs-*` declaration in `./styles` fails it as well, which guards against a take-over.
- **The pin reads one site law for every color property.** A color property is a custom property that some site declares under a selector carrying `[data-vn-color=`. Every site of every color property sits in the `surfaces` layer under a selector carrying `[data-vn-color=`. The law reads `--vn-drag-color` at V1 and every later `--vn-MODULE-*` property a color rule declares with no edit to the case (critique gap 11).
- **The core proof admits the group.** The expectation at `tests/src/core/index.test.ts:64` reads `['bootstrap', 'veneer']`, and the one at `:65` stays `['bootstrap']`. The population case at `:90-102` counts `TOKEN_NAMES.bootstrap` alone and walks every group for its freeze, so it runs unchanged.
- **The roadmap's registry line governs.** `ROADMAP.md:46` lands the group with its first declared token, and the pin reads every declaration on any selector as the `bootstrap` pin does, so V2 rewrites `:143`, which waits for a global token.
- **`CLASS_NAMES` gains nothing.** The styles chunk still owes a `CLASS_NAMES.veneer` group for the composable's `.active` selector (`src/styles/composables/_drag.scss:40`, `:65`). That debt predates this verdict and stays with the chunk's class-group unit.
- **The attribute's values have a guide home, not a registry.** Core holds token and class names alone, and no TypeScript reads the attribute. V2 documents `data-vn-color` in a table of authored styling attributes under the guide's § Styles sheet, apart from the module's state attributes, and a guide case reads that table's values against the `theme-colors` keys of `tests/fixtures/bootstrap/maps.json` (critique gap 12). A misspelt value falls to the default chain with no refusal, and the guide says so.

### Precedence over Bootstrap's contextual classes

The line color on an item resolves through the following steps, and the first step that applies wins:

1. Under `forced-colors: active`, the line takes `Highlight` (`src/styles/composables/_drag.scss:63-72`).
2. On an `.active` item, the line takes `--bs-list-group-active-color` (`:40-42`), which contrasts with the active fill.
3. An author's unlayered or inline declaration of `--vn-drag-color` on the item applies next.
4. On an item that carries its own `data-bs-theme` inside a colored host, the island selector applies next and resolves the host's key in the item's mode.
5. The host's own `--vn-drag-color` applies next: an author's unlayered or inline declaration first, then the color rule.
6. A `--vn-drag-color` value the host inherits from an ancestor, such as an outer colored host, applies next.
7. The item's `--bs-list-group-active-bg` token applies next: a contextual class's text emphasis (`src/bootstrap/components/_list-group.scss:248` for `primary`), or else the `.list-group` literal `#0d6efd` (`:20`).
8. The `--bs-primary` token applies last.

The order has the following consequences:

- **A host color wins over contextual tints.** A colored host recolors the line over every item that is not active, a contextual item included, while Bootstrap keeps painting that item's text, fill, and border (`src/bootstrap/components/_list-group.scss:239-250`). The precedence question asks you to confirm this.
- **The item path is Bootstrap's contextual class.** On an uncolored host, a `list-group-item-KEY` class retints its own item's line through `--bs-list-group-active-bg` along with its fill, and an author's `--vn-drag-color` declaration colors any other item. The `data-vn-color` attribute on an item matches no rule (critique gap 23).
- **The host color alone reaches the tint and the outline.** Both resolve on the host, where no item class reaches, so the attribute is the one markup path to their color.
- **A Bootstrap utility on the host keeps its yield.** A `bg-KEY` or `text-bg-KEY` class on the host wins over the over tint, because Bootstrap writes each utility as an `!important` declaration outside every layer.
- **Each host of a transfer group keeps its own color.** Each host resolves its own property, so a cross-host drop paints the target host's color.
- **An author's host declaration stops at an island.** On a host that carries both the attribute and an author `--vn-drag-color` declaration, the island selector gives an item with its own `data-bs-theme` the attribute's color. Remove the attribute when you declare your own color on the host.

### Dark mode and color-mode islands

The text-emphasis tokens retune under `[data-bs-theme='dark']`, so a colored host resolves its key in the mode the host sits in, and a page that switches its mode switches every colored line with it. A custom property inherits the value its host computed, so without the island selector a direct item that carries the other mode keeps the host mode's color (see [CSS Custom Properties for Cascading Variables Level 1](https://www.w3.org/TR/css-variables-1/)). The `verdict/contrast.txt` run reads that case for each item kind, as the following table states, with each range taken over the 8 keys and both directions of the mode switch:

| Item that carries the other mode | Its background | Line resolved on the host | Line resolved on the item |
| --- | --- | --- | --- |
| Contextual `list-group-item-KEY` item | Its own subtle background, in its own mode (`_list-group.scss:241`) | 1.00 to 1.69 | 4.55 to 10.91 |
| Plain `list-group-item` item | The host's resolved `--bs-list-group-bg`, in the host's mode (`_list-group.scss:6`, `:42`) | 6.10 to 14.63 | 1.05 to 2.53 |

Bootstrap resolves an island's paint where it declares the paint's tokens: on a contextual item, on a component root such as `.card` (`src/bootstrap/components/_card.scss:4`, `:21`, `:31`), and on the `.list-group` host for a plain item. The island selector follows the first two, where Bootstrap paints the item in the item's own mode, and the run reads 4.55 or more there. A plain list-group item that carries its own `data-bs-theme` keeps the host mode's paint in Bootstrap, so the island selector gives it a line of the other mode, at 1.05 to 2.53. The verdict takes the island selector, because it is right wherever Bootstrap honors the island, and it documents the plain-item case as a limit with its remedy: carry `data-bs-theme` on the host, or give the item a contextual class so Bootstrap paints it in its own mode. A browser case pins both readings.

The critique's form, `[data-vn-drag][data-vn-color='KEY'] [data-bs-theme]`, reaches every descendant island (critique gap 4). The verdict uses the child combinator instead. An item is a direct child of its host (`guides/veneer.md:1563`) and the line sits on the item, so a deeper island never carries the line, and the child combinator keeps one host's rule off another host's items. Hosts nest as the following list states:

- **A nested host with its own key** keeps that key on its own items, because the outer host's island selector does not reach them. No map-order tie arises.
- **A nested host without the attribute** inside a colored host's item inherits the outer host's color. Declare `--vn-drag-color: initial` on it to restore its default chain, because a custom property's initial value is the guaranteed-invalid value, which makes `var()` take its fallback. A browser case pins both readings.

### Forced colors

Under `forced-colors: active`, the composable paints the line and the empty-host outline in `Highlight` for every key (`src/styles/composables/_drag.scss:63-72`). The CSS Color Adjustment specification forces a background color to the system background color and keeps only its original alpha channel, so every key's over tint takes one color (see [CSS Color Adjustment Module Level 1, Properties Affected by Forced Colors Mode](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-properties), read on 2026-10-08). Every key therefore renders alike under forced colors. A variant is decoration: a list's meaning sits in its accessible name and its text, never in its color, as WCAG 2.2 SC 1.4.1 asks (see [Understanding SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)). No case reads what the over tint becomes under forced colors (`tests/src/styles/composables/drag.test.ts:262-295` reads the outline alone), so V1 reads the over tint per key under forced colors, and V2 states that reading in the guide (critique gap 5).

### Scope

The mechanism covers one axis and one family per property, as the following list states:

- **Keys.** The 8 keys of `$theme-colors`, which equal the contextual list-group item keys.
- **The sortable's family.** `$theme-colors-text` gives the line the color Bootstrap's contextual items give it (`_list-group.scss:248`), reads 6.10 or more against the body background (`contrast.txt`) and 4.55 or more against every same-mode subtle background (`probe/contrast.txt`), and retunes by mode. The base family falls under 3:1 for 4 key and mode pairs (`contrast.txt`).
- **Later families.** A module that paints a fill names `theme-colors-bg-subtle`, and one that paints an outline names `theme-colors-border-subtle`, as Bootstrap's `alert-KEY` class pairs them (`src/bootstrap/components/_alert.scss:39-44`). Each family enters with its first reader.
- **What the maps cannot give.** The maps hold `var()` references, so no Sass color function runs on them, and no admitted map holds a contrast foreground or a `-rgb` triplet. Bootstrap's solid variants take their foreground from a compile-time literal: `.btn-primary` sets `--bs-btn-color: #fff` (`src/bootstrap/components/_buttons.scss:98-103`) and `.text-bg-primary` sets `color: #fff` over `--bs-primary-rgb` (`src/bootstrap/components/_color-bg.scss:4-8`). A solid fill with a contrasting foreground is therefore out of this mechanism's reach; the solid-fill question rules its path (critique gap 10).
- **Theme packs.** A pack moves a variant only by retuning the text-emphasis family. A pack that retunes `--bs-KEY` alone leaves every colored line unchanged (`src/bootstrap/_tokens.scss:60-67`).
- **No size or opacity axis.** The `$border-widths` map holds literal `px` lengths, the doctrine takes sizes from Bootstrap tokens (`drag-2026-10-08/verdict.md:237`), and no admitted map holds opacity steps. The `--vn-drag-size` and `--vn-drag-opacity` properties stay host properties you override.

### Generation criterion

A module takes the color attribute only where its chrome paints a color that no Bootstrap class already varies on its host. Where a Bootstrap class varies the token, the chrome reads Bootstrap's token and the module generates nothing (`drag-2026-10-08/verdict.md:233`). The following table applies the criterion to each native module at `de168b8`:

| Module | Host | Chrome color | Bootstrap class that varies it on the host | Color rules |
| --- | --- | --- | --- | --- |
| Sortable | `[data-vn-drag]` | The line, the over tint, and the empty-host outline | None: `list-group-item-KEY` reaches one item's line, and the tint and the outline resolve on the `.list-group` host | Yes, in V1 |
| Table column sort | `table.table[data-vn-sort]` | None at `de168b8` | `table-KEY` sets `--bs-table-color` (`src/bootstrap/components/_tables.scss:75-80`) | None |
| Relative time | `time[data-vn-time]` | None | Not applicable | None |
| Unsaved-changes sentinel | `form[data-vn-sentinel]` | None | Not applicable | None |
| Copy button, fullscreen toggle, and keep-screen-on toggle | A `button[commandfor]` with the `--copy`, `--fullscreen`, or `--wake` command | The trigger's button paint | `btn-KEY` | None |

A later module or veneer component that passes the criterion, such as a styled drop zone or a class skin in `components/`, calls `recolor` inside its host rule in its own `surfaces/` partial and declares its own `--vn-MODULE-*` property in its chrome's `var()` chain. A class skin's host rule compounds the attribute on its class the same way a native host's rule compounds it on the host attribute.

## Units

The units run in order on the `landing` branch at or after `de168b8`. Each unit owns its files alone, and no unit commits; the Orchestrator lands each one. Every expectation comes from a source other than the partial: keys and values from `tests/fixtures/bootstrap/maps.json`, cells from `CLASS_NAMES.bootstrap`, and colors from the computed Bootstrap tokens.

### V1: Paint the sortable's variants, with the specimen and the journey

Engine: astra. Dispatch id: `variants-1`. The unit is mechanical: the selectors, the values, the registry names, the markup, and every case name are fixed in this verdict. It can start at `de168b8`, and it lands after M1 lands, rebased onto it, so the specimen ships on a page whose boot survives the insecure context of your reading.

The unit owns the following files:

- `/home/user/veneer/src/styles/surfaces/_drag.scss`
- `/home/user/veneer/src/styles/composables/_drag.scss` (the `:3` comment alone)
- `/home/user/veneer/src/core/constants.ts` (the `TOKEN_NAMES.veneer` group and the `TOKEN_NAMES` `@remarks` tag alone)
- `/home/user/veneer/tests/conformance.test.ts` (the `styles color attribute` block alone)
- `/home/user/veneer/tests/src/styles/surfaces/drag.test.ts`
- `/home/user/veneer/tests/src/styles/index.test.ts`
- `/home/user/veneer/tests/src/core/index.test.ts`
- `/home/user/veneer/tests/distribution.test.ts` (the `packed styles Sass` block alone)
- `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`, only for an instrument the island or forced-colors cells need, with its proof (`styles.md:94`)
- `/home/user/veneer/app/browser/sections/sortable-list.html` (the Returns queue figure alone)
- `/home/user/veneer/tests/app/browser/integration.test.ts` (the Returns queue case alone)
- `/home/user/veneer/showcase/browser.html` (rebuilt by `npm run build:showcase`, never edited by hand)

The contract has the following lines:

- Write the partial as § Generation states, the `veneer` group and the `@remarks` edit as § Registries states, and the composable comment as § Generation states.
- Leave every rule of `src/styles/composables/_drag.scss` and every file under `src/bootstrap`, `tests/fixtures/bootstrap`, and `tests/src/bootstrap` unedited.
- Add the Returns queue figure after the Parcel board figure of `app/browser/sections/sortable-list.html`, as the following fence states. Its host carries `data-vn-color="success"` and holds one `list-group-item-warning` row, so the page shows the color and its precedence.

  ```html
  <div class="col d-flex">
  	<figure class="card flex-fill mb-0" aria-labelledby="native-returns-title">
  		<div class="card-body">
  			<ul id="returns-queue" class="list-group" data-vn-drag data-vn-color="success" aria-label="Returns queue">
  				<li class="list-group-item d-flex align-items-center column-gap-3" aria-label="Inspect kettle">
  					<!-- The grip, up, and down buttons of a Dispatch priorities item, aimed at returns-queue and named for Inspect kettle -->
  					<span>Inspect kettle</span>
  				</li>
  				<li
  					class="list-group-item list-group-item-warning d-flex align-items-center column-gap-3"
  					aria-label="Refund order"
  				>
  					<!-- The same buttons, named for Refund order -->
  					<span>Refund order</span>
  				</li>
  				<li class="list-group-item d-flex align-items-center column-gap-3" aria-label="Restock shelf">
  					<!-- The same buttons, named for Restock shelf -->
  					<span>Restock shelf</span>
  				</li>
  			</ul>
  		</div>
  		<figcaption class="card-footer bg-transparent small">
  			<span id="native-returns-title" class="d-block fw-semibold">Returns queue</span>
  			<span class="d-block text-body-secondary"
  				>The color attribute draws the insertion line and the drop tint in Bootstrap's success
  				emphasis color, over the warning row too.</span
  			>
  		</figcaption>
  	</figure>
  </div>
  ```

- Keep the specimen inside the section laws: every class sits in `CLASS_NAMES.bootstrap`, the figure carries no `style` attribute, it takes `card flex-fill mb-0` inside a `col d-flex` column (`tests/app/browser/sections/integration.test.ts:59-72`), and its list and button names differ from those of the Dispatch priorities, Packing queue, and Loading dock lists.
- Sweep the comments of both touched partials case-insensitively for every term the `writing.md` substitution table bans unconditionally, rule each hit of `now`, `new`, `latest`, `once`, `since`, `above`, `below`, or `master` by its sense, and record the pattern, the paths, and the result in the unit report.

The Node proofs join a `styles color attribute` block beside the `bootstrap maps` block in `tests/conformance.test.ts`. Each compiles an inline string through `compileEntry`, so no fixture file and no relative fixture path exists. The block holds the following cases:

- **`generates one sortable color rule per theme-color key from the text-emphasis map`.** Compiles `src/styles/surfaces/drag`. The selector lists, split on commas with whitespace collapsed, and their values equal the fixture's `theme-colors` keys, each as a host selector and an island selector, and its `theme-colors-text` values, in order, inside the one `surfaces` block.
- **`generates exactly a planted key set through @use with, where a hand-listed control emits every key`.** `@use 'src/bootstrap/maps' with (…)` configures planted `$theme-colors` and `$theme-colors-text` maps before the partial loads, and exactly the planted keys generate. The control compiles an inline `@each` over a written key list under the same configuration and reads all 8 keys (`verdict/compile.txt`, the planted and hand-listed readings).
- **`refuses a family map that lacks a theme-color key`.** A `$theme-colors-text` map configured without a key throws the partial's message for that key (`verdict/compile.txt`, the gap reading).

The registry proofs are the following:

- **`pins every Veneer token leaf to the built styles sheet both ways`.** Replaces the `it.todo` case and reads the leaves and the site law of § Registries.
- **`exports the registries and coded error contract`.** Its group expectation at `tests/src/core/index.test.ts:64` reads `['bootstrap', 'veneer']`, and the case reads `TOKEN_NAMES.veneer.drag.color` as `--vn-drag-color`.

The browser proofs join `tests/src/styles/surfaces/drag.test.ts` under Chromium 141 and 153, with the built `./bootstrap` and `./styles` sheets adopted. The cells come from the `buildDragCells` instrument (`tests/setupStyles.ts:548-612`), and the keys come from the fixture's `theme-colors` keys, which each case asserts equal, as a set, to the keys of `CLASS_NAMES.bootstrap.components.list.group.item` other than `action` and `base`. Each cell renders a single time, and a case sets and removes `data-vn-color` for each key inside the visit. The cases are the following:

- **`recolors the line, the over tint, and the empty outline for every theme color on every list-group variant`.** Per cell, key, and edge, the `::after` color on the named edge matches `readToken(item, '--bs-KEY-text-emphasis')`, or the item's `--bs-list-group-active-color` on the `.active` cell. With `data-vn-over` set, the host's background matches `color-mix(in oklab, COLOR 15%, transparent)` and an empty host's outline matches COLOR, where COLOR is the key's resolved token. The light and dark readings of each key differ. On the plain light and dark cells, the `primary` line differs from the uncolored line. In the light cells the `light` and `dark` lines match each other, and in the dark cells they differ, which the guide states.
- **`holds 3:1 between every color line and its item background in both modes`.** The `measureContrast` reading between the line color and the item background, composited over the body background with `blendColor`, reaches 3 on every cell that is not active.
- **`resolves a colored host's line in the color mode of an item that carries its own`.** Per key, in a light host and in a dark host, the last item carries the other mode's `data-bs-theme`, first with each contextual class of `CLASS_NAMES.bootstrap.components.list.group.item` in turn and then plain. On every island cell the line matches `readToken(item, '--bs-KEY-text-emphasis')` read on the item, which differs from the host's own reading. The contextual island cells reach 3 by `measureContrast` against the item background. The plain island cells read the island-mode token as the documented limit, and the case logs their ratios, which `verdict/contrast.txt` predicts at 1.05 to 2.53, for the guide.
- **`keeps an unlisted value, an item attribute, nested hosts, a grouped neighbor, a background utility, and an author declaration on their documented colors`.** A `data-vn-color="harbor"` host keeps the default chain. A `data-vn-color` attribute on an item of an uncolored host leaves that item's line on the default chain. A colored host nested in a colored host's item keeps its own key on its items; an uncolored nested host takes the outer key, and the same host with `--vn-drag-color: initial` declared on it returns to its default chain. In two hosts of one group with one colored, each line takes its own host's color. A `bg-KEY` class from `CLASS_NAMES.bootstrap.utilities` on a colored host keeps its background under `data-vn-over`. An unlayered author `--vn-drag-color` declaration on a colored host colors its plain items and leaves an island item on the attribute's color.
- **`paints every theme color alike under forced colors`.** Under emulated `forced-colors: active`, per key, the line and the empty-host outline match `Highlight`, and the over tint's computed background reads one value for every key and for the uncolored host. The case logs that value for the guide. When Chromium 141 or 153 reports the author's unforced value instead, the lane stops and reports the reading, and it does not weaken the expectation.

The distribution proofs join a `packed styles Sass` block beside the `packed Bootstrap Sass` block in `tests/distribution.test.ts`, each through the `NodePackageImporter` class as `:866-883` uses it (critique gap 7):

- **`compiles the styles Sass export through a package importer [requires the registry]`.** Compiles `pkg:@orkestrel/veneer/styles/scss` from the packed consumer and reads one color rule per fixture key with its fixture value, which proves the relative maps load resolves inside an install.
- **`compiles the themes Sass export through a package importer with no color rule [requires the registry]`.** Compiles `pkg:@orkestrel/veneer/styles/themes/scss` and reads the default pack's scope rule and no `data-vn-color` text. It runs unchanged at V3, where `_mixins.scss` loads the maps.

The journey proof joins `tests/app/browser/integration.test.ts`:

- **`paints the returns queue's insertion line in its color attribute`.** The case runs under `it.each(JOURNEY_PLACEMENTS.shared.filter((variant) => variant === VARIANT))`, so it reads `dark-1280` and `light-390` alone, one dark and one light mode (critique gap 13). It drags the Inspect kettle grip across the warning row with `userEvent.dragAndDrop`. On each `data-vn-insert` write it reads the `::after` border color on the named edge against `readToken(queue, '--bs-success-text-emphasis')`, on the warning row as well, reads the host's over tint against the 15% mix, and reads no class change.

The controls each edit the built sheet text or plant a declaration and expect a reading to redden, as the following list states:

- **`misses the emphasis color and the contrast floor when a control reads the base theme colors`.** Rewrites each `-text-emphasis)` of the color rules to `)`. Every color reading mismatches, and `contrast.txt` predicts contrast under 3 for `info`, `warning`, and `light` in light mode and for `dark` in dark mode.
- **`loses every theme color when a control declares a composables default`.** Adds `--vn-drag-color: var(--bs-list-group-active-bg);` to the composables host rule. Every color reading mismatches, which pins the layer order and the fallback law.
- **`keeps the host mode on an island when a control drops the island selector`.** Removes each `> [data-bs-theme]` selector from the color rules. Every contextual island reading mismatches and falls under 3.
- **The registry pin's controls.** A planted rule that declares an unregistered `--vn-drag-planted` property reddens the pin, a sheet without its color rules reports `--vn-drag-color` missing, and a planted `composables` declaration of `--vn-drag-color` on `[data-vn-drag]` reddens the site law.

The surfaces placement case (`tests/src/styles/surfaces/drag.test.ts:19-40`) and the composables cases run unchanged. The cases read through `buildDragCells`, `visitDragCells`, `adoptSheet`, and `collectSheetNames` from `tests/setupStyles.ts`, and through `readToken`, `readStyle`, `matchesColor`, `measureContrast`, `blendColor`, `stageMedia`, and `releaseMedia` from `@orkestrel/test/browser`.

The sealed-face check has the following lines:

- `git -C /home/user/veneer diff --exit-code BASE -- src/bootstrap tests/fixtures/bootstrap tests/src/bootstrap` exits 0, where BASE is the unit's base commit.
- `npm run test:conformance` passes, with the official digest, the Sass pass digest against `tests/fixtures/bootstrap/pass.json`, link 1, link 2, the maps cases, and the gate case.
- `npm run test:src:bootstrap` passes, with link 3 and both Bootstrap registry pins.
- The SHA-256 digest of `dist/src/bootstrap/index.css` after `npm run build:src:bootstrap` equals the digest before the unit, and the unit report records both.
- The `keeps every pair of built sheets disjoint in each shared layer` case passes (`tests/integration.test.ts:292-320`).

The unit runs the following gates: `npm run check`, `npm run lint:check`, `npm run format:check`, `npm run test:policy`, `npm run test:conformance`, `npm run test:src:core`, `npm run test:src:bootstrap`, `npm run test:src:styles` under Chromium 141 and 153, `npm run test:integration`, `npm run test:distribution`, `npm run build`, `npm run test:app:browser`, `npm run test:journey`, `npm run build:showcase`, the sealed-face check, and the comment sweep.

### V2: Write the guide, the roadmap, and the guide index

Engine: opus, because guide voice decides the unit. Dispatch id: `variants-2`. The unit starts after V1 and M1 land, because the guide cites V1's case names and M1 edits `guides/veneer.md`. V1 makes the § Surface sentence false until V2 lands, so the Orchestrator publishes no release between V1 and V2.

The unit owns the following files:

- `/home/user/veneer/guides/veneer.md`
- `/home/user/veneer/ROADMAP.md`
- `/home/user/veneer/guides/README.md`
- `/home/user/veneer/tests/guides.test.ts` (the authored-attribute case alone)

The contract has the following guide edits, cited at `de168b8`:

- **§ Surface (`:37-39`).** A `TOKEN_NAMES.bootstrap` member states that Bootstrap 5.3.8's bundled CSS declares the property, and a `TOKEN_NAMES.veneer` member states that the built `./styles` sheet declares it.
- **§ Core entry (`:686-697`).** The registry paragraph names the `veneer` group, its three leaves, and the `pins every Veneer token leaf to the built styles sheet both ways` case.
- **§ Sortable list.** The rule table (`:1732-1739`) gains the color-rule row: both selectors, the `surfaces` layer, and the result. The property table (`:1746-1749`) gains `--vn-drag-color`, with "None on an uncolored host" as its default. The sentence "The sheet declares no `--vn-drag-color` property" (`:1752-1753`) becomes the attribute sentence, which points at § Styles sheet for the values. The resolution order of § Precedence over Bootstrap's contextual classes lands as a numbered list. The item path lands: Bootstrap's `list-group-item-KEY` class colors one item on an uncolored host, a colored host wins over it, and the attribute on an item does nothing. The limits land, each with the case that pins it: one color per host; an unlisted or misspelt value keeps the default chain; a contextual island item takes the key in its own mode; a plain island item keeps Bootstrap's host-mode paint while its line takes the island's mode, at the ratios the island case logs, with the remedy; an uncolored nested host takes the outer key until `--vn-drag-color: initial`; an author's host declaration stops at an island; the `light` and `dark` keys draw one line color in light mode (`#495057`); and `primary` draws a darker line than the uncolored default. The forced-colors paragraph (`:1760-1763`) states that every key paints alike, states the over tint the forced-colors case logs, and states that a variant is decoration whose list keeps its meaning in its accessible name and text. The proof paragraph names the V1 cases.
- **§ Styles sheet.** The partial table (`:2132-2135`) names the color rules in the `surfaces/_drag.scss` row. The sentence that each partial "loads nothing from `src/bootstrap`" (`:2141-2142`) names the maps load of `surfaces/_drag.scss`. A table of authored styling attributes lands with one row: `data-vn-color`, its hosts (`[data-vn-drag]`), and its values in map order. The fallback law lands as one paragraph. A paragraph states what the maps give a variant: the text-emphasis, bg-subtle, and border-subtle families are the color families that retune by mode, a pack moves a variant only by retuning the text-emphasis family, a solid fill with a contrasting foreground takes the path the solid-fill question rules, and the length maps hold literals. The override table (`:2151-2155`) gains the row for an author `--vn-drag-color` declaration on a host or an item.
- **§ Theme packs.** One sentence states that a pack retunes a colored line through the `--bs-KEY-text-emphasis` tokens, not through `--bs-KEY`, and points at § Styles sheet.
- **§ Showcase opener (`:2249-2250`).** "paints the native modules' state attributes" becomes "paints the native modules' state attributes and the sortable's color attribute". The sentence that the page uses Bootstrap's classes alone stays true.
- **§ Interaction (`:2491`).** The native sortable row names the Returns queue and its color attribute beside the Dispatch priorities list.
- **§ Variant placement (`:2715-2754`).** The Shared cases cells of `dark-1280` and `light-390` gain the Returns queue case. The sentence that the shared cases read nothing a color mode changes becomes: the shared cases run a single time at each width, in opposite color modes, and the Returns queue case reads its line in the mode its variant sets, so the pair reads both modes. The sentence on the `containment` and `progress` entries goes, because `JOURNEY_PLACEMENTS` holds `theme` and `shared` alone and no test reads either case.

The contract has the following roadmap and index edits:

- `ROADMAP.md:46` states that the `veneer` group holds every `--vn-*` name the built `./styles` sheet declares and that the styles proof pins it both ways.
- `ROADMAP.md:105` names an authored styling attribute such as `data-vn-color` among the attribute APIs of `surfaces/`.
- `ROADMAP.md:114` names `src/styles/surfaces/_drag.scss` as the loader of the maps.
- `ROADMAP.md:141` says that the `./styles` sheet paints the native sortable's state attributes and its color attribute.
- `ROADMAP.md:143` records the color attribute, the `--vn-drag-color` declaration, and the `veneer` token group with its pin, and drops "until the first global token lands".
- `guides/README.md:26-28` and `:51` name `showcase/browser.html` as the `./styles` sheet's showcase, which loads that sheet at `9f56e6a` already.

The proof is the following case in `tests/guides.test.ts`:

- **`lists every theme-color key as a color attribute value in map order`.** It reads the values cell of the `data-vn-color` row in § Styles sheet and expects the `theme-colors` keys of `tests/fixtures/bootstrap/maps.json` in order. Its control appends a planted `harbor` value to a copy of the guide text and expects the comparison to fail.

The sealed-face check is the `git diff --exit-code BASE -- src/bootstrap tests/fixtures/bootstrap tests/src/bootstrap` line of V1. The unit runs `npm run test:guides`, `npm run test:policy`, `npm run format:check`, and the sealed-face check, and it re-reads every edited sentence against the V1 readings, including the forced-colors and island values the V1 cases log.

### V3: Generalize the color rules to the next module through `recolor`

Engine: astra for the move and its proofs, and opus for the guide and roadmap sentences. Dispatch id: `variants-3`. The unit opens with the unit that builds the second module to pass § Generation criterion, and that unit carries it.

The unit owns the following files:

- `/home/user/veneer/src/styles/_mixins.scss`
- `/home/user/veneer/src/styles/surfaces/_drag.scss`
- the second module's `surfaces/` partial and its mirrored proof under `tests/src/styles/surfaces/`
- `/home/user/veneer/tests/conformance.test.ts` (the `styles color attribute` block alone)
- `/home/user/veneer/guides/veneer.md` (the § Styles sheet mixin sentence and the authored-attribute table's hosts cell alone)
- `/home/user/veneer/ROADMAP.md` (the `_mixins.scss` entry at `:95` alone)

The contract has the following lines:

- Write `recolor` as § The mixin at the second caller states, move the sortable's loop into one call inside its host rule, drop the sortable partial's maps load, and call `recolor` from the second module's host rule with the families its chrome reads.
- Declare the second module's `--vn-MODULE-*` properties in its chrome's `var()` chain alone, under the fallback law.
- Name the second module's host in the authored-attribute table, and add `recolor` to the `_mixins.scss` entry of `ROADMAP.md:95` as the one home of the color-rule scheme.
- Rule the second module's island reach in its own contract when its chrome reads the property deeper than the host's direct children.
- Before landing, run a probe of the `verdict/compile.ts` shape against the unit's base tip and record its output, because a probe over an older partial misses rules the tip holds.
- Sweep the comments of every touched partial as V1 does.

The proofs are the following:

- **`loads the styles mixins alone without emitting CSS`.** `compileEntry("@use 'src/styles/mixins';")` returns an empty sheet.
- **`refuses a recolor call outside a host rule`.** A top-level call throws the mixin's message.
- **`refuses a recolor family that lacks a theme-color key`.** A family map configured without a key throws the mixin's message for that family and key.
- **The second module's generation case.** It reads one rule per fixture key with each family's fixture values, with a planted key set and a hand-listed control as V1's planted case reads them.
- **The second module's browser matrix.** Its cells come from the Bootstrap classes the module rides on, and it reads every color property per key in both modes, with an island cell per key.
- The V1 generation case, the registry pin with its site law, and both packed cases run unchanged.

The controls are the planted and hand-listed pair for the second module and a composables-default control for the second module's property, each as V1 states them for the sortable. The sealed-face check and the gates are V1's, without `npm run build:showcase` unless the unit adds a specimen.

### Records outside the units

The Orchestrator owns the following records:

- **The D2.3 tension.** Record in `drag-2026-10-08/verdict.md:121` that this verdict rules the theme-color modifier as the `data-vn-color` attribute, not a `.drag-{color}` class.
- **The doctrine's stale citations.** Refresh the citations that `brief.md` § Stale citations in the doctrine lists.
- **The scout script defect.** The scout reports that with `--tree`, a `--census` flag whose first term begins with `--` writes a tree-only map with no refusal, while the same call alone exits 64, against the exit-64 law in `/home/user/scaffold/.claude/rules/documentation.md` § Workflow skills. Route it to a scaffold unit on the `orkestrel-scout` skill's `map.ts` script, with a proof case for the combination.
- **The class group debt.** The `CLASS_NAMES.veneer` group for the `.active` selector stays with the styles chunk's class-group unit.

## Rejected

The following table rules on every alternative the brief, the proposals, the judgment, and the critique raise that this verdict does not take:

| Alternative | Ruling and reason |
| --- | --- |
| A class per module, such as `drag-success` | Refused. It breaks the bare modifier-class row (`styles.md:104`), needs a scaffold amendment with a regenerated `host.json`, a scaffold release, and a veneer re-pin (critique gap 8), and adds a class family per module. The keying question offers it to you. |
| A bare key class under each host, such as `[data-vn-drag].success` | Refused. The `dark` and `light` classes read as color-mode words beside `data-bs-theme`, a consumer's own `success` class collides unmeasured, and two key classes on one host resolve by source order with no refusal. |
| A prefixed generic class, such as `vn-success` | Refused. It breaks the bare modifier-class row as the compound form does and names the project rather than the axis. |
| The accent token family, `accent-KEY` with `@scope` | Refused. Its token is neither component-scoped nor a root token, against the ruling that the drag tokens stay on the host selector (`stage-b/user-rulings-2026-10-06.md:81`). Its `[data-vn-theme]` selector lands in `./styles`, which `tests/src/styles/themes/index.test.ts:26` refuses; its `@scope` preludes hide its classes from the `readCascade` function of `@orkestrel/test` 0.0.25, so the page census fails; its prelude-only classes contradict the class registry's membership law; and `accent` already names `TOKEN_NAMES.bootstrap.table.accent.bg` (critique gaps 1, 2, 3, and 17). |
| The color rules in `modifiers/` | Refused. The folder holds a class that sets a token, and its twin names each class (`ROADMAP.md:104`, `:128`). The fallback law covers the `surfaces` layer's place before `composables`. |
| The `recolor` mixin with one caller | Deferred to V3, because `styles.md:69` refuses a mixin for one caller (critique gap 6). |
| The base `$theme-colors` family for the line | Refused. Four key and mode pairs fall under 3:1 (`contrast.txt`). The color-family question asks you to confirm the emphasis family. |
| The subtle families in V1 | Deferred. No reader exists, and each family enters with its first reader. |
| Size and opacity variants | Refused. The width map holds literal `px` lengths, and no admitted map holds opacity steps. |
| No island selector, with the island recorded as a limit | Refused. A contextual island item then reads 1.00 to 1.69 and regresses from its own correct line at `9f56e6a` (`verdict/contrast.txt`; critique gap 4). |
| The island selector with a descendant combinator | Refused. The line sits on the host's direct children, so a deeper island never needs it, and the descendant form lets an outer host's rule reach a nested host's items, where two keys of one specificity resolve by map order. |
| An island selector limited to contextual item classes | Refused. It selects every `list-group-item-KEY` class from a veneer rule and misses component-root items such as a `.card`, which Bootstrap paints in their own mode. |
| A reset on uncolored hosts, such as `[data-vn-drag]:not([data-vn-color])` declaring `--vn-drag-color: initial` | Refused. It declares the color property outside a color rule, against the site law, and it erases an author's ancestor declaration that the default chain honors at `de168b8`. The guide gives the `initial` declaration to the nested host that needs it. |
| A color attribute on an item | Refused. It adds a second item path beside Bootstrap's contextual class for one concept, and no consumer asks for it. The inert-item case pins the refusal. |
| A yield selector that keeps a contextual item's own line inside a colored host | Refused on the recommended path of the precedence question, because it selects every `list-group-item-KEY` class from a veneer rule. |
| A veneer declaration of `--bs-list-group-active-bg` on the host | Refused. Bootstrap reads that token for the `.active` item's background (`src/bootstrap/components/_list-group.scss:59-64`), and decision D-6 refuses take-overs. |
| A TypeScript type or core registry for the attribute's values | Refused. No TypeScript reads the attribute, and the guide case pins the values to the fixture with no added public API. |
| A contrast map under `src/bootstrap` for solid fills | Refused on the recommended path of the solid-fill question, because Bootstrap computes its contrast foregrounds at compile time and has no upstream map to mirror. |
| A showcase figure per key | Refused. A native section owns no registry row, and the matrix proves every key in both modes. |
| The attribute words `variant`, `tone`, `theme`, and `accent` | Refused. `variant` names a journey project (`guides/veneer.md:2581-2594`), `tone` names a showcase template slot (`app/browser/types.ts:64`), `theme` names Bootstrap's modes and veneer's packs, and `accent` names a Bootstrap table token. |

## Questions for the user

The following questions need your ruling, each with one recommendation. The units run on the recommended paths unless you rule otherwise.

- **Keying.** Veneer variants use one attribute on the module's host, `data-vn-color="success"`, rather than a Bootstrap-style class such as `drag-success`. The class reads like Bootstrap's `list-group-item-success`, but it needs your amendment of the bare modifier-class row in the scaffold styles rule, which every scaffold target reads, and it adds a class family for each module. The attribute joins the `data-vn-*` attributes the native hosts already carry and works the same on every later module. Do you accept the attribute? I recommend yes.
- **Color family.** Every variant line uses Bootstrap's text-emphasis color for its key, the color Bootstrap's own contextual list-group items give the line, not the brighter button color. In light mode, `success` draws `#0a3622` rather than the `#198754` of `btn-success`, and `primary` draws `#052c65`, darker than the uncolored list's `#0d6efd`; in dark mode they draw `#75b798` and `#6ea8fe` (`src/bootstrap/_tokens.scss:60-67`, `:155-162`). The brighter family falls under the 3:1 contrast WCAG 2.2 asks of a state graphic for `info`, `warning`, and `light` on the light page and for `dark` on the dark page (`contrast.txt`). Do you accept the emphasis family? I recommend yes.
- **Precedence.** A colored host recolors the insertion line over every item, including an item that carries its own Bootstrap color such as `list-group-item-warning`, while Bootstrap keeps painting that item's text, fill, and border. An item that carries its own color mode takes the host's color in that mode. The alternative keeps each contextual item's own line inside a colored host, at the cost of a veneer rule that selects every `list-group-item-KEY` class. Do you accept that the host color wins? I recommend yes.
- **Solid fills.** The maps hold references to Bootstrap's tokens, so a variant can take the text-emphasis, subtle background, and subtle border colors, but not a solid fill with a contrasting foreground, which Bootstrap computes at compile time for `btn-KEY` and `text-bg-KEY`. When a later veneer element needs a solid fill, it can carry Bootstrap's own `text-bg-KEY` class, or `src/bootstrap` can gain a contrast map that Bootstrap does not ship upstream. Do you accept Bootstrap's `text-bg-KEY` class as the solid-fill path, with no contrast map? I recommend yes.

## Rulings of 2026-10-08

The user ruled the keying question against this verdict's recommendation: veneer variants follow Bootstrap's class convention (`stage-b/user-rulings-2026-10-06.md` § Fifteenth round). The following sections change under that ruling:

- **§ Keying and naming, § Generation, § Placement and layers.** The sortable's variant is the `drag-KEY` class, written by `@each $key in map.keys(maps.$theme-colors)` in `src/styles/modifiers/_drag.scss` as `[data-vn-drag].drag-KEY` and `[data-vn-drag].drag-KEY > [data-bs-theme]`, each setting `--vn-drag-color` from `$theme-colors-text` with an `@error` on a missing key. The `modifiers` layer follows `composables`, so the fallback law gives way to layer order: a `composables` declaration on the host loses to the class.
- **§ Registries.** `CLASS_NAMES` gains a `veneer` group holding `modifiers.drag.KEY`, pinned to the built `./styles` sheet both ways; the token pin's site law reads the `modifiers` layer under a `CLASS_NAMES.veneer.modifiers` class; the class census admits the `veneer` group.
- **§ Rejected.** The rows refusing a class per module and the `modifiers` placement are reversed; the attribute row is the rejected form.
- **§ Units.** V1 landed the attribute on the `landing` branch at `b16b76d`; unit V1c replaces it with the classes; V2 writes the keying-independent guide edits and the browser-floor sentence, and a later guide pass documents the classes. S50 adds the scaffold rule row before V1c lands.

The text-emphasis family, the precedence over contextual items, and the solid-fill path stand on their recommendations. One correction from V1's run stands as well: the sealed tokens declare the base `light` token equal to the dark-mode `light` text-emphasis token, so the base-family control asserts a mismatch wherever the two tokens differ and a match exactly where they are equal.
