# Proposal: a color attribute for native modules

Key a native module's color on one host attribute, `data-vn-color`, whose values are the keys of Bootstrap's `$theme-colors` map. One mixin in `src/styles/_mixins.scss`, `recolor`, loads the maps module and writes one rule per key under the host rule it runs in. Each rule sets the module's `--vn-*-color` property from the Bootstrap map the caller names. The sortable calls the mixin in `src/styles/surfaces/_drag.scss` with `('--vn-drag-color': 'theme-colors-text')`. A `<ul class="list-group" data-vn-drag data-vn-color="success">` host then draws its insertion line, over tint, and empty-host outline in `var(--bs-success-text-emphasis)`. A later module gets the same attribute by calling the mixin inside its own host rule. The attribute adds no class, so neither `CLASS_NAMES` nor the showcase census changes. The color rules declare `--vn-drag-color`, so the `TOKEN_NAMES.veneer` group lands, and its two-way pin replaces the `it.todo` case.

The proposal rests on runs made on 2026-10-08. Sass 1.105.1 compiled a probe copy of the mixin against the real `src/bootstrap/_maps.scss` partial. Through `@use … with`, it generated exactly a planted key set, and it refused each planted fault. A Node contrast run found that every key's text-emphasis color reads at least 4.55 against the body background and every contextual item background, in both color modes. § Evidence lists the files.

This proposal answers the variant item of the user's request of 2026-10-08: "I would like to allow applying variants to drag and drop elements and other elements and components that we come up with that need styling." It also rules the tension that the drag verdict's D2.3 contract deferred (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-2026-10-08/verdict.md:121`). The proposal reads `/home/user/veneer` at `9f56e6a` and the landing branch at `48a9c9f` (`/home/user/.wave/veneer-drag6`). It edits no source and ran no browser.

The proposal resolves its paths as follows. A record path such as `stage-b/user-rulings-2026-10-06.md` or `browser-stage-b-verdict.md` is relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/`. `verdict.md` names the drag verdict, and `brief.md` names this unit's brief beside this file. A source or test path is relative to `/home/user/veneer`. The `probe/` folder and the scout's `contrast.txt` file sit under `/home/user/veneer/tmp/units/variants-2026-10-08/`.

## Rulings

The following table rules each open decision of the brief (`brief.md` § Open decisions) and names the brief's leading option where this proposal departs from it:

| Decision | Ruling | Brief's leading option |
| --- | --- | --- |
| Keying | One host attribute, `data-vn-color="KEY"`, where KEY is a `$theme-colors` key | A bare `.success` class under each host selector |
| Generation | One `recolor` mixin in `src/styles/_mixins.scss`, called inside each module's host rule | One `@each` in each module partial |
| Scope | Keys from `maps.$theme-colors`; the sortable's value from `maps.$theme-colors-text`; no size or opacity axis | The same |
| Precedence | A host color wins over a contextual item's own tint; the `.active` line keeps `--bs-list-group-active-color` | The same |
| Registries | `TOKEN_NAMES.veneer` lands with `drag.size`, `drag.opacity`, and `drag.color`; `CLASS_NAMES` gains nothing | A `CLASS_NAMES.veneer` group and an `ADMITTED` change |

## Why an attribute fits native modules

The native modules already describe themselves with attributes, so the color joins the same contract. The following facts decide the keying:

- **The markup contract is attribute-keyed.** Each module boots from an attribute: `[data-vn-drag]` (`src/browser/drags/plugins.ts:18`), `time[data-vn-time]` (`src/browser/times/plugins.ts:17`), `form[data-vn-sentinel]` (`src/browser/sentinels/plugins.ts:27`), `table.table[data-vn-sort]` (`src/browser/sorters/plugins.ts:27`), and `button[command="--copy"][commandfor]` (`src/browser/copiers/plugins.ts:24`). Each module also reports state through attributes: `data-vn-dragging`, `data-vn-insert`, and `data-vn-over` on the sortable, `aria-sort` on the sorter (`src/browser/sorters/Sorter.ts:265`), and `aria-pressed` on the fullscreen toggle (`src/browser/fullscreens/plugins.ts:43`). The styles key on those attributes under the host attribute (`/home/user/scaffold/.claude/rules/styles.md:109`; `verdict.md:235`). A color written as a sibling attribute on the same host keeps the module's markup contract in one vocabulary, and the host's class list stays Bootstrap's.
- **A host takes one color.** An attribute holds one value, so a host can't carry two colors. Two color classes on one host, such as `.success.danger`, would both match, and source order would choose the winner without a refusal. The attribute rules that state out by construction, as the "Real domain states only" law asks of a discriminant (`/home/user/scaffold/AGENTS.md:56`).
- **No name collides.** The `data-vn-` prefix keeps the name out of Bootstrap's class space and out of a consumer's. The brief leaves a bare `.success` class's collision with consumer classes unmeasured, and a `.vn-success` class breaks the bare modifier form (`styles.md:104`).
- **Neither registry nor census changes.** The section census reads classes alone (`tests/app/browser/sections/integration.test.ts:62`), so a specimen that carries the attribute passes it unchanged, and `CLASS_NAMES` holds class names alone.
- **The color exists before script.** The attribute is markup, so the token is set before the engine boots, and the first drag already paints in the host's color.
- **The cost is a missing registry.** Core holds token and class names alone (`ROADMAP.md:46`), so the attribute has no core registry. Its pins are the Node generation case and the browser case that sets the attribute directly, which is how the state attributes are pinned (`styles.md:109`).

## Naming

The attribute names the axis its values range over, as the "Named discriminants" law requires (`/home/user/scaffold/AGENTS.md:59`). The word `variant` already names a journey project of one color mode and one viewport (`guides/veneer.md:2402-2414`), and "One concept, one term" (`/home/user/scaffold/AGENTS.md:54`) refuses a second meaning. The word `tone` names a showcase template (`app/browser/types.ts:64`). The word `color` names Bootstrap's theme colors, the axis the values come from. It is also the last word of the property the attribute sets (`--vn-drag-color`), so the attribute and the property share one term. Color mode stays `data-bs-theme`, and theme packs stay `data-vn-theme`.

The following table names each piece under the rules:

| Kind | Name | Rule |
| --- | --- | --- |
| Host attribute | `data-vn-color` | One word after `data-vn-`, as every veneer attribute has (`brief.md` § Naming rules) |
| Attribute value | A `$theme-colors` key: `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, or `dark` | The upstream keys (`src/bootstrap/_maps.scss:31-40`) |
| Mixin | `recolor` | A lowercase kebab-case verb (`styles.md:101`) |
| Mixin parameter | `$tokens`, a map of a module property to the upstream name of a Bootstrap map | A lowercase kebab-case Sass variable (`styles.md:102`) |
| Sortable property | `--vn-drag-color` | `--{scope}-{property}[-modifier]` (`styles.md:103`) |
| A later module's property | `--vn-MODULE-color`, and `--vn-MODULE-bg` or `--vn-MODULE-border-color` for a fill or an outline | The same form, with Bootstrap's component token words, such as `--bs-alert-bg` and `--bs-alert-border-color` |

In the preceding table, MODULE stands for the word of the module's host attribute, such as `sort` for `[data-vn-sort]`.

## Mechanism

### The mixin

The mixin joins `src/styles/_mixins.scss` after `transition`, and the file loads `sass:map`, `sass:meta`, and the maps module at its head. The probe copy at `tmp/units/variants-2026-10-08/probe/styles/_mixins.scss` holds this text:

```scss
@use 'sass:map';
@use 'sass:meta';
@use '../bootstrap/maps';

// ... retune, reduced-motion, and transition, unchanged

// A call outside a host rule would color the document root, and a key the named map lacks would drop
// its declaration, so either one refuses the compile.
@mixin recolor($tokens) {
	@if not & {
		@error 'recolor runs inside a module host rule';
	}

	@each $key in map.keys(maps.$theme-colors) {
		&[data-vn-color='#{$key}'] {
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

The following facts govern the mixin:

- **One file crosses the face boundary.** The `@use '../bootstrap/maps'` statement is the one the load gate admits (`tests/conformance.test.ts:775`). It comes from the same folder depth as the gate's `src/styles/_allowed.scss` fixture (`:770-776`). A module partial loads `../mixins` alone and never reaches `src/bootstrap`. Loading the mixins alone emits no CSS (`probe/compile.txt`, the "mixins alone" reading).
- **Keys come from the axis, and values come from the named map.** The loop reads keys from `maps.$theme-colors`. Each token reads the map its caller names by the upstream name, through `meta.module-variables('maps')`, so every value is a `var(--bs-*)` reference from the pinned maps (`tests/conformance.test.ts:686-707`). That meets the doctrine's one-`@each` rule (`verdict.md:233`) and the user's ruling that every variant comes from the Bootstrap map it varies over (`stage-b/user-rulings-2026-10-06.md:74`).
- **The output lands in the caller's layer.** The `&[data-vn-color='KEY']` selector compounds the attribute on the caller's host selector, and the mixin writes no `@layer` of its own. The partial therefore still writes its folder's layer a single time (`verdict.md:234`).
- **A fault refuses the compile.** A map that lacks a theme-color key refuses, and so does a source name that names no map. Without the `@if not &` guard, a top-level call compiles to bare `&[data-vn-color=primary]` selectors (`probe/compile.txt`, the "unguarded control" reading). Outside a nested rule, the nesting selector matches what `:scope` matches, which is the document root in a page stylesheet; see [CSS Nesting Module Level 1, the nesting selector](https://www.w3.org/TR/css-nesting-1/#nest-selector). The guard turns that call into a refusal (`probe/compile.txt`, the "planted control" readings).
- **The mixin calls no Bootstrap emitter.** It calls none of the `layer`, `utility`, or `unlayer` mixins (`verdict.md:232`).

### The sortable call

The call opens the existing `@layer surfaces` block of `src/styles/surfaces/_drag.scss`. The handle rules and the grouped-host rule from the landing branch (`48a9c9f`) stay as they are:

```scss
@use '../mixins' as *;

@layer surfaces {
	[data-vn-drag] {
		@include recolor(('--vn-drag-color': 'theme-colors-text'));
	}

	// ... the handle rules and the grouped-host rule, unchanged
}
```

The `src/styles/composables/_drag.scss` partial takes no edit. Its `$color` chain already reads `--vn-drag-color` first (`:4`), and its comment at `:3` stays true.

### Generated output for the sortable

The run compiled the probe partial to the following rules at the head of its `surfaces` block (`probe/compile.txt`, the "drag surfaces partial alone" reading):

```css
@layer surfaces {
  [data-vn-drag][data-vn-color=primary] {
    --vn-drag-color: var(--bs-primary-text-emphasis);
  }
  [data-vn-drag][data-vn-color=secondary] {
    --vn-drag-color: var(--bs-secondary-text-emphasis);
  }
  [data-vn-drag][data-vn-color=success] {
    --vn-drag-color: var(--bs-success-text-emphasis);
  }
  [data-vn-drag][data-vn-color=info] {
    --vn-drag-color: var(--bs-info-text-emphasis);
  }
  [data-vn-drag][data-vn-color=warning] {
    --vn-drag-color: var(--bs-warning-text-emphasis);
  }
  [data-vn-drag][data-vn-color=danger] {
    --vn-drag-color: var(--bs-danger-text-emphasis);
  }
  [data-vn-drag][data-vn-color=light] {
    --vn-drag-color: var(--bs-light-text-emphasis);
  }
  [data-vn-drag][data-vn-color=dark] {
    --vn-drag-color: var(--bs-dark-text-emphasis);
  }
  /* ... the handle rules, unchanged */
}
```

### A later module

The table column sort serves as the hypothetical later module, because its host attribute exists (`src/browser/sorters/plugins.ts:27`) and no styles partial paints it yet. Its surfaces partial calls the mixin inside its host rule:

```scss
@use '../mixins' as *;

@layer surfaces {
	[data-vn-sort] {
		@include recolor(('--vn-sort-color': 'theme-colors-text'));
	}
}
```

The run compiled that partial to one rule per key, opening as the following fence shows (`probe/compile.txt`, the "hypothetical sort surfaces partial alone" reading):

```css
@layer surfaces {
  [data-vn-sort][data-vn-color=primary] {
    --vn-sort-color: var(--bs-primary-text-emphasis);
  }
  /* ... one rule for each later key */
}
```

That module's composable reads `var(--vn-sort-color, FALLBACK)`, where FALLBACK is the Bootstrap token the module paints with when no color is set. The fallback stays inside `var()` and is never a declaration, as § Precedence among veneer layers requires. The sorter's own styles unit decides which state its composable keys on.

A later module that also needs a fill names a second map in the same call. The run compiled the following call to rules that carry both declarations:

```scss
[data-vn-drop] {
	@include recolor(('--vn-drop-color': 'theme-colors-text', '--vn-drop-bg': 'theme-colors-bg-subtle'));
}
```

The `primary` rule of that output reads as follows:

```css
[data-vn-drop][data-vn-color=primary] {
  --vn-drop-color: var(--bs-primary-text-emphasis);
  --vn-drop-bg: var(--bs-primary-bg-subtle);
}
```

## Folder placement and layers

The following table places each partial the mechanism touches:

| Partial | Layer it writes | Holds |
| --- | --- | --- |
| `src/styles/_mixins.scss` | None; it emits no CSS | `recolor`, beside `retune`, `reduced-motion`, and `transition`, and the maps load |
| `src/styles/surfaces/_drag.scss` | `surfaces`, a single time | The color rules, the handle rules, and the landing branch's grouped-host rule |
| `src/styles/composables/_drag.scss` | `composables`, a single time | Unchanged; it reads `--vn-drag-color` through the `$color` chain |

The color rules belong in `surfaces/`, for the following reasons:

- **The job is an attribute API.** The color attribute is authored markup that exists before script runs. That is the job the doctrine and the roadmap give `surfaces/` (`verdict.md:234`; `ROADMAP.md:105`).
- **`modifiers/` is the wrong folder.** It holds "a class that sets a token" (`ROADMAP.md:104`), and its registry twin names each modifier class (`ROADMAP.md:128`). An attribute has no class to name. The `surfaces/` row of the style-file map has no twin per partial (`ROADMAP.md:126`), which fits.
- **One partial per folder.** The call joins the sortable's existing surfaces partial, so the sortable keeps one same-named partial per folder.

### Precedence among veneer layers

The `surfaces` layer precedes `composables` (`src/styles/_tokens.scss:2`). A `composables` declaration of `--vn-drag-color` on the host would therefore beat every color rule by layer order. The design holds one law against that: a color token's default lives in the reading rule's `var()` fallback, never in a declaration.

At `9f56e6a` the composable declares `--vn-drag-size` and `--vn-drag-opacity` on the host and no `--vn-drag-color` (`composables/_drag.scss:15-18`). The law therefore holds without an edit. The registry case's site check pins it, and a planted composables default reddens the browser matrix (§ Proof matrix).

## Relation to Bootstrap's contextual variants

The color rules declare only `--vn-*` properties, and no Bootstrap rule declares one of those. They contest no Bootstrap declaration, so the doctrine's layer-order rule (`verdict.md:236`) holds with no further rule. The rules sit in `surfaces`, which follows `bootstrap`, and need neither `!important` nor added specificity. Their compound selector keys the attribute and competes with no other declaration of the same property.

The line color on an item resolves through the following steps, and the first step that applies wins:

1. Under forced colors, the line takes `Highlight` (`composables/_drag.scss:63-72`).
2. On an `.active` item, the line takes `--bs-list-group-active-color` (`:40-42`), so it contrasts with the active fill.
3. A `--vn-drag-color` that the author declares on the item wins next.
4. A `--vn-drag-color` on the host applies next: an author's inline or unlayered declaration first, then the `data-vn-color` rule.
5. The item's `--bs-list-group-active-bg` applies next: a contextual class's text emphasis (`src/bootstrap/components/_list-group.scss:248` for `primary`), or else the `.list-group` literal `#0d6efd` (`_list-group.scss:20`).
6. `--bs-primary` applies last.

The over tint and the empty-host outline resolve the same chain on the host, starting at the host's `--vn-drag-color`, and the outline takes `Highlight` under forced colors. The order has the following consequences:

- **A host color wins over contextual tints.** A colored host recolors the line of every item that isn't active, a contextual item's included. Bootstrap's `.list-group-item-KEY` class keeps painting the item's text, fill, and border (`_list-group.scss:239-250`), and the attribute never touches those. Letting a contextual item keep its own line color would take a veneer rule that selects the `.list-group-item-KEY` classes. The override keeps the chain the guide documents (`guides/veneer.md:1603-1610`) and adds no such rule.
- **Only the host color reaches the over tint and the outline.** A contextual item class never retints them, because they resolve on the host (`composables/_drag.scss:55-61`; `brief.md` § Sortable partials). The attribute is the one markup path to them.
- **The attribute adds an axis Bootstrap lacks.** The sortable host's Bootstrap classes are structural (`list-group`, `list-group-flush`, `list-group-numbered`, and the `list-group-horizontal-*` classes), and Bootstrap has no host-level list-group color class. The doctrine refuses to generate a set only where a Bootstrap component already varies the token (`verdict.md:233`), so a host-level axis is admissible.
- **A Bootstrap color utility on the host wins over the tint.** The `.bg-*` and `.text-bg-*` utilities write `background-color` as an unlayered `!important` declaration, through `unlayer` for `.text-bg-*` (`src/bootstrap/components/_color-bg.scss:4-8`) and through the `utility` emitter for `.bg-*` (`src/bootstrap/_mixins.scss:24`; `src/bootstrap/_utilities.scss:867`), so they win over the over tint. This is the documented utility yield (`guides/veneer.md:1971-1977`).
- **On a later module, each face keeps its own properties.** A `table.table.table-success[data-vn-sort][data-vn-color="danger"]` host carries both. The `.table-success` class sets the `--bs-table-*` tokens (`src/bootstrap/components/_tables.scss:75`), and the attribute sets `--vn-sort-color`. The module's chrome reads `--vn-sort-color` first, and Bootstrap keeps painting the cells. The rule: the attribute recolors veneer chrome alone, and a Bootstrap contextual class on the same element keeps every property Bootstrap paints.
- **Each host of a transfer group keeps its own color.** Each host resolves its own `--vn-drag-color`, so a cross-host drop paints the line and the tint in the target host's color.

## Scope

The following facts bound what a color covers:

- **The keys are Bootstrap's contextual axis.** They come from `maps.$theme-colors`, and they equal the keys of Bootstrap's contextual list-group item classes (`src/core/constants.ts:1489-1499`, leaving out `action` and `base`).
- **The sortable reads `$theme-colors-text`, for the following reasons.**
  - Bootstrap's contextual list-group items retint the same line with text emphasis (`_list-group.scss:248`). A colored host and a contextual item therefore read one family.
  - Text emphasis retunes under `[data-bs-theme='dark']` (`src/bootstrap/_tokens.scss:155-162`), while the base `$theme-colors` tokens keep one value in both modes (`_tokens.scss:44-51`).
  - The scout's run read the base family under 3:1 against the body background for `info` (1.96), `warning` (1.63), and `light` (1.05) in light mode, and for `dark` (1.00) in dark mode. Text emphasis read at least 6.10 (`tmp/units/variants-2026-10-08/contrast.txt`).
  - This proposal's run measured each text-emphasis color against the body background and against every `bg-subtle` item background, in both modes. The lowest reading is 4.55, for `danger` against the dark `light-bg-subtle` background (`probe/contrast.txt`). Every key therefore clears the 3:1 that WCAG 2.2 asks of a state graphic against the body background and every contextual item background in the token literals; see [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Hover backgrounds and author backgrounds are unmeasured. The browser case measures the computed background of every cell at rest.
- **Other families are open to later callers.** The mixin reads any map by its upstream name. A later module names `theme-colors-bg-subtle` for a fill and `theme-colors-border-subtle` for an outline, as Bootstrap's alerts do (`src/bootstrap/components/_alert.scss:39-44`). The sortable names neither, because its tint derives from the line color (`composables/_drag.scss:56`).
- **Size and opacity get no axis.** The `$border-widths` map holds literal `px` lengths (`_maps.scss:110-116`), while the doctrine takes sizes from tokens (`verdict.md:237`). No admitted map holds opacity steps (`brief.md` § Scope). The `--vn-drag-size` and `--vn-drag-opacity` properties stay host properties that the author overrides.

## Registries

The registries change as the following list states:

- **The `veneer` token group lands.** `TOKEN_NAMES` gains it in `src/core/constants.ts` under the key law (`ROADMAP.md:46`), shaped as the following fence shows. Its `@remarks` gains the sentence "The `veneer` group holds every `--vn-*` name the built `./styles` sheet declares on any selector."

  ```ts
  veneer: /* @__PURE__ */ Object.freeze({
  	drag: /* @__PURE__ */ Object.freeze({
  		size: '--vn-drag-size',
  		opacity: '--vn-drag-opacity',
  		color: '--vn-drag-color',
  	} as const),
  } as const),
  ```

- **The two-way pin replaces the `it.todo` case.** The case at `tests/src/styles/index.test.ts:85-87` becomes `pins every Veneer registry leaf to the built sheet both ways`. It compares `collectSheetNames` over the built `./styles` sheet with `collectLeaves(TOKEN_NAMES.veneer)` in both directions, in the shape of `tests/src/bootstrap/index.test.ts:475-490`. It also reads a site check: every site of `--vn-drag-color` sits in the `surfaces` layer, under a selector that carries `[data-vn-color=`. Its controls are the following edits:
  - A planted rule that declares an unregistered `--vn-drag-planted` property reports that property as unexpected.
  - The sheet without its color rules reports `--vn-drag-color` as missing.
  - A planted `composables` declaration of `--vn-drag-color` on `[data-vn-drag]` fails the site check.
- **The core proof admits the group.** The `Object.keys(TOKEN_NAMES)` expectation at `tests/src/core/index.test.ts:64` reads `['bootstrap', 'veneer']`. The freeze walk at `:96-101` covers the group with no edit.
- **The registry lands with its first declared token.** `ROADMAP.md:46` lands the `veneer` group "with its first declared token", while `:143` holds the pin until the first global token lands. The doctrine admits each component token "when the chunk opens" (`verdict.md:237`), and the chunk opened on 2026-10-08. This proposal follows `:46` and the doctrine, and V3 rewrites the `:143` clause.
- **`CLASS_NAMES` gains nothing.** The attribute isn't a class. The stage B verdict owes a `CLASS_NAMES.veneer` group for the composable's `.active` selector (`composables/_drag.scss:40`, `:65`; `browser-stage-b-verdict.md:1029`). That debt predates this proposal and stays with the styles chunk's class-group unit, because nothing here reads or adds a class.
- **No attribute registry.** Core holds token and class names alone (`ROADMAP.md:46`), and no TypeScript reads `data-vn-color`.

## Showcase specimen

The specimen is a figure in `app/browser/sections/sortable-list.html`, after the Dispatch priorities figure and the landing branch's Parcel board figure. It shows a colored host with a contextual row inside it:

```html
<div class="col d-flex">
	<figure class="card flex-fill mb-0" aria-labelledby="native-returns-title">
		<div class="card-body">
			<ul
				id="returns-queue"
				class="list-group"
				data-vn-drag
				data-vn-color="success"
				aria-label="Returns queue"
			>
				<li class="list-group-item d-flex align-items-center column-gap-3" aria-label="Inspect kettle">
					<!-- The grip, up, and down buttons of a Dispatch priorities item, named for Inspect kettle -->
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

The specimen meets the following constraints:

- **The census passes unchanged.** Every class sits in `CLASS_NAMES.bootstrap`, `list-group-item-warning` included. The census reads no attribute, and the specimen carries no `style` attribute. The figure takes `card flex-fill mb-0` inside `.row > .col.d-flex` (`tests/app/browser/sections/integration.test.ts:62-72`).
- **Every name is distinct.** The accessible names differ from `Dispatch priorities`, `Packing queue`, and `Loading dock`, and every button name is distinct, so the journeys' exact-name lookups stay unambiguous (`tests/app/browser/integration.test.ts:442`, and `:543-544` on the landing branch).
- **A journey reads the colors.** The case `paints the returns queue's insertion line in its color attribute` lands in `tests/app/browser/integration.test.ts`. It drags a grip in the Returns queue across the warning row. On each `data-vn-insert` write, it reads the `::after` border color on the named edge and matches it to `readToken(queue, '--bs-success-text-emphasis')`, on the warning row as well. It reads the host's over tint against `color-mix(in oklab, COLOR 15%, transparent)`, where COLOR is that token's value, and it reads no class change. The journey projects run in the light and dark color modes (`guides/veneer.md:2402-2414`), so the case reads both modes.
- **The showcase guide names the specimen.** The guide's showcase table row for the native sortable list (`guides/veneer.md:2313`) gains the Returns queue.

## Proof matrix

### Node proofs

The Node proofs join the `conformance` project in `tests/conformance.test.ts`, as a `styles color attribute` block beside `bootstrap maps`. They compile through `compileEntry` (`tests/setupServer.ts:407-409`), and the following table lists each case:

| Case | Reads | Planted control |
| --- | --- | --- |
| `loads the styles mixins alone without emitting CSS` | `compileEntry("@use 'src/styles/mixins';")` returns an empty string | None |
| `generates one sortable color rule per theme-color key from the text-emphasis map` | Compiles `src/styles/surfaces/drag`. The `[data-vn-drag][data-vn-color=KEY]` rules and their declarations equal `maps['theme-colors'].keys` and `maps['theme-colors-text'].values` of `tests/fixtures/bootstrap/maps.json`, in order | None |
| `generates exactly the planted theme-color keys through @use with` | `@use 'src/bootstrap/maps' with (…)` configures planted `$theme-colors` and `$theme-colors-text` maps before the partial loads, and exactly the planted keys generate | The planted key set separates an `@each` from a hand-listed set, whose output is otherwise identical |
| `refuses a map lacking a key and a call outside a host rule` | Each compile throws with the mixin's message | A `$theme-colors-text` map configured without one key, and an `@include recolor(…)` call at the top level |

The probe run produced each expected reading against the real maps partial (`probe/compile.txt`). The configured module is shared across the load path's `src/bootstrap/maps` specifier and the mixins' relative `../bootstrap/maps` load, because both resolve to one canonical file. This closes the brief's note that no run had compiled a styles partial under that configuration.

### Browser proofs

The browser case joins the `src:styles` project in `tests/src/styles/surfaces/drag.test.ts`. It runs under Chromium 141 and 153 with both built sheets adopted.

The case `recolors the line, the over tint, and the empty outline for every theme color on every list-group variant` renders the following matrix:

- **Cells.** The cells come from `buildDragCells` over `CLASS_NAMES.bootstrap` (`tests/setupStyles.ts:548-600`): plain, flush, numbered, and horizontal; each responsive horizontal class on both sides of its boundary; each `list-group-item-*` class; `.active`; and `.disabled`, in light and dark.
- **Keys.** The keys come from the `theme-colors` keys of `tests/fixtures/bootstrap/maps.json`. The case asserts they equal the keys of `CLASS_NAMES.bootstrap.components.list.group.item` other than `base` and `action`.
- **Visits.** The case visits each cell a single time and loops the keys inside the visit, so the key count doesn't multiply viewport changes.

Per cell and key, the case sets `data-vn-color` on the host and `data-vn-insert` on each edge directly, and it reads the following:

- On the named edge, the `::after` color matches the host's resolved token for the key, the one the fixture's `theme-colors-text` value names. On an `.active` item it matches `--bs-list-group-active-color` instead.
- Each item background is opaque. `measureContrast` (`@orkestrel/test/browser`, `index.d.ts:1775`) of the line against that background reaches 3 on every cell that isn't active.
- The light and dark readings of each key differ.
- The host's over tint matches `color-mix(in oklab, COLOR 15%, transparent)`, where COLOR is the key's color, and an empty host's outline color matches COLOR.
- Under emulated forced colors, the line and the outline take `Highlight`.

Beyond the matrix, the case reads the following:

- An unlisted value, such as `data-vn-color="harbor"`, leaves the line on the default chain.
- In two hosts of one group with one host colored, each line takes its own host's color.
- A `bg-*` class from `CLASS_NAMES.bootstrap.utilities` on a colored host keeps its background under `data-vn-over`.

The following controls each edit the built sheet text and expect the case's readings to redden:

- `misses the emphasis color and the contrast floor when a control reads the base theme colors` removes `-text-emphasis` from each `--vn-drag-color` declaration. Every color reading mismatches. The scout's run predicts contrast under 3 for the `info`, `warning`, and `light` keys in light mode and for `dark` in dark mode.
- `loses every theme color when a control declares a composables default` adds `--vn-drag-color: var(--bs-list-group-active-bg);` to the composables host rule. Every color reading mismatches, which pins the layer order and the fallback law.

The surfaces partial's placement case (`tests/src/styles/surfaces/drag.test.ts:19-40`) runs unchanged, because the run compiled the color rules inside the one `surfaces` block (`probe/compile.txt`). The case uses existing instruments: `buildDragCells`, `visitDragCells`, and `adoptSheet` from `tests/setupStyles.ts`, and `readToken`, `readStyle`, `matchesColor`, `parseColor`, `parseCSSColor`, `measureContrast`, `stageMedia`, and `releaseMedia` from `@orkestrel/test/browser`. It adds no instrument to `tests/setupStyles.ts`.

### Registry and journey proofs

§ Registries states the registry pin and the core expectation, and § Showcase specimen states the journey case.

## Risks

The following risks stay open after the units land:

- **The mixin has one caller.** The `styles.md:69` rule reads "do not create a mixin for one caller", and the sortable is the only caller. The face already holds mixins with one partial caller: `transition` (`composables/_drag.scss:23`) and `retune` (`themes/_default.scss:4`). Each is the single home of a contract that later callers share. The user's request names "other elements and components that we come up with", and the user's instruction wins over a rule (`/home/user/scaffold/AGENTS.md:8`). The mixin also keeps the maps load in one file. If the Orchestrator rules for the rule's letter instead, the `@each` moves inline into `surfaces/_drag.scss`, which then loads `../../bootstrap/maps` itself, and the mixin lands with the second caller.
- **The layer trap.** A later edit that declares a color token's default in `composables` silently beats every color rule. The site check and the composables-default control pin it.
- **Contextual tints yield.** A consumer who expects contextual item lines inside a colored host sees the host color. The guide states the order, and the matrix pins it.
- **Mode islands.** The host resolves `--bs-KEY-text-emphasis` in its own color mode, so an item that carries its own `data-bs-theme` inside a colored host takes the host's mode color. Bootstrap's `.alert-KEY` declares its tokens the same way, on the element. No case measures an island.
- **An unlisted value has no refusal.** CSS can't refuse an attribute value, and no engine reads the attribute, so an unlisted value falls back to the default chain. The guide states it, and the browser case reads it.
- **One color per element.** The attribute word is shared across modules, so an element that hosted two modules would take one color for both. No module pair shares a host element at `9f56e6a`.
- **Contrast is partly unmeasured.** Hover backgrounds and author backgrounds stay unmeasured, because the browser case reads each cell at rest.
- **The matrix cost is unmeasured.** The case multiplies the drag cell readings by the key count.
- **Files overlap with in-flight work.** The landing branch at `48a9c9f` changes `src/styles/surfaces/_drag.scss`, `tests/src/styles/surfaces/drag.test.ts`, `app/browser/sections/sortable-list.html`, `tests/app/browser/integration.test.ts`, and `guides/veneer.md`. D2.6 runs at that tip. The mobile repair at `/home/user/.wave/veneer-mobile1` changes `guides/veneer.md`. The units therefore start after both land.
- **The roadmap disagreement can rule the other way.** If the Orchestrator rules for `ROADMAP.md:143`, the sheet declares `--vn-drag-color` with no registry leaf, and the pin stays `it.todo`.

## Sealed-face check

Each unit's gate reads the seal unchanged when every one of the following checks holds:

- `git diff --exit-code BASE -- src/bootstrap tests/fixtures/bootstrap` exits 0, where BASE is the unit's base commit.
- `npm run test:src:bootstrap` passes with the token and class pins unchanged.
- `npm run test:conformance` passes. That run includes the following cases:
  - the link 1 case (`tests/conformance.test.ts:617`) and the link 3 precondition case (`:117`)
  - the digest check that reads `BOOTSTRAP_DIGEST` (`tests/setupServer.ts:91`, `:239-240`)
  - the `bootstrap maps` cases (`:673-767`)
  - the `styles face boundaries` case (`:769-846`), with `src/styles/_mixins.scss` among the loaders it admits

## Units

The units run in order on the landing branch after D2.6 and the mobile repair land. Each unit owns its files alone.

### V1: the color attribute, its mixin, and the token registry

The unit takes the medium row, because `TokenMap` widens. The writer role is styles and core, and the suggested engine is `opus`. One review pass by a reviewer who didn't write the unit covers the mixin and the registry change.

The unit owns the following files:

- `/home/user/veneer/src/styles/_mixins.scss`
- `/home/user/veneer/src/styles/surfaces/_drag.scss`
- `/home/user/veneer/src/core/constants.ts`
- `/home/user/veneer/tests/conformance.test.ts` (the `styles color attribute` block alone)
- `/home/user/veneer/tests/src/styles/surfaces/drag.test.ts`
- `/home/user/veneer/tests/src/styles/index.test.ts`
- `/home/user/veneer/tests/src/core/index.test.ts`

The contract covers § Mechanism, § Folder placement and layers, § Registries, and the Node, browser, and registry rows of § Proof matrix. The unit leaves `src/styles/composables/_drag.scss` and every file under `src/bootstrap` unedited. The unit runs the following gates:

- `npm run check:src:core`
- `npm run check:src:styles`
- `npm run test:src:core`
- `npm run test:conformance`
- `npm run test:src:styles`
- `npm run test:src:bootstrap`
- the `git diff` seal check

### V2: the showcase specimen and its journey

The unit starts after V1, and the suggested engine is `sonnet`.

The unit owns the following files:

- `/home/user/veneer/app/browser/sections/sortable-list.html`
- `/home/user/veneer/tests/app/browser/integration.test.ts` (the `paints the returns queue's insertion line in its color attribute` case alone)
- `/home/user/veneer/showcase/browser.html` (rebuilt, not hand-edited)

The contract covers § Showcase specimen. The unit runs the following gates:

- `npm run build`
- `npm run test:app:browser`
- `npm run test:journey`
- `npm run build:showcase`

### V3: the prose

The unit starts after V1 and V2, and the suggested engine is `opus`.

The unit owns the following files:

- `/home/user/veneer/guides/veneer.md`
- `/home/user/veneer/ROADMAP.md`

The unit makes the following guide edits:

- § Sortable list
  - The attribute table gains the `data-vn-color` row.
  - The property table gains `--vn-drag-color` with the default "none; the line reads the chain".
  - The sentence "The sheet declares no `--vn-drag-color` property" becomes the attribute sentence.
  - The resolution order of § Relation to Bootstrap's contextual variants is added as a numbered list.
  - The proof paragraph names the cases.
- § Styles sheet
  - The surfaces row of the partials table names the color rules.
  - The mixin sentence names `recolor` and the maps load.
  - The override table gains the row for an author `--vn-drag-color` on the host.
- The registry paragraph (`guides/veneer.md:661-672`) gains the `veneer` group.
- The showcase row at `:2313` gains the Returns queue.

The unit makes the following roadmap edits:

- The `_mixins.scss` entry (`ROADMAP.md:95`) names `recolor` and the maps load.
- The maps sentence (`:114`) names `_mixins.scss` as the loader.
- The `surfaces/` row (`:126`) names the color attribute.
- The styles line (`:143`) records the color attribute and the `veneer` token group with its pin, and it drops "until the first global token lands".

The unit runs the following gates:

- `npm run test:guides`
- `npm run test:policy`
- `npm run format:check`

The Orchestrator records the ruling on the D2.3 tension in the drag verdict (`verdict.md:121`). No unit owns that record.

## Evidence

The following files hold the runs this proposal cites, all under `/home/user/veneer/tmp/units/variants-2026-10-08/`:

- `probe/styles/_mixins.scss`, `probe/styles/surfaces/_drag.scss`, and `probe/styles/surfaces/_sort.scss` are the probe copies. The mixins copy loads `src/bootstrap/maps` relatively, the way the real file would.
- `probe/compile.ts` and `probe/compile.txt` hold the Sass 1.105.1 run of 2026-10-08, which exited 0. The run covers the empty mixins load, the sortable and sorter outputs, the planted key set, each refusal, the unguarded control, and the two-token call.
- `probe/contrast.ts` and `probe/contrast.txt` hold the contrast run of 2026-10-08, which exited 0. The run reads the light and dark literals of `src/bootstrap/_tokens.scss` and finds a lowest ratio of 4.55.
- `contrast.txt` holds the scout's body-background run.
