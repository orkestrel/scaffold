# Proposal: accent tokens shared by every styled module

Give the styles layer one generated family of accent classes, `.accent-KEY`, and let every module partial read the token those classes set before its own Bootstrap chain. In this proposal, KEY stands for a key of Bootstrap's `$theme-colors` map: `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, or `dark`. A `src/styles/modifiers/_accent.scss` partial writes the family with one `@each` over `maps.$theme-colors`, and each class sets the `--vn-accent-text-emphasis` property from `maps.$theme-colors-text`. The sortable gains its variants through one `var()` link at `src/styles/composables/_drag.scss:4`. Each later module gains them through one link of its own, with no selector, no class, and no registry class of its own. The cost is a veneer token family beside Bootstrap's. That family never writes a `--bs-*` property, never takes a `:root` value, and reaches veneer chrome alone, and the registry pins hold those limits. A custom property inherits the value computed where it is declared, so the partial resolves the token again at every `[data-bs-theme]` and `[data-vn-theme]` root inside an accent. Without that step, an accent computed in one color mode reads 1.05 to 2.53 against the other mode's body background in every key (`freeze.txt`), under the 3:1 that WCAG 2.2 asks for state graphics.

This proposal answers the variant item of the user's request of 2026-10-08: "I would like to allow applying variants to drag and drop elements and other elements and components that we come up with that need styling." It argues the token lens: generic token-setting modifiers shared across every module. It reads the scout's brief at `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/brief.md` and rules every open decision in that brief. The clipboard report on Edge for Android, the column-sort link report, and the sortable regression report belong to other units.

## Evidence

Every fact comes from `/home/user/veneer` at commit `9f56e6a`, read on 2026-10-08, from the scaffold rule files that `/home/user/veneer/AGENTS.md:11-15` points at, and from the campaign records the sources list names. No browser ran, and no source file changed. The following runs back each number and each compiled sample, and each sits in `/home/user/veneer/tmp/units/variants-2026-10-08/token/`:

- The `probe.mjs` script compiles a probe copy of the accent partial (`modifiers/_accent.scss`, identical to the proposed partial except for its relative maps path) through the installed `sass` compiler with the workspace root as its load path, the way `compileEntry` does (`tests/setupServer.ts:407-409`). Its output, `probe.txt`, records these compiles: the default maps, a `$theme-colors` subset configured through `@use 'src/bootstrap/maps' with (…)`, a hand-listed control partial (`modifiers/_listed.scss`) under the same subset, and a planted key that the text-emphasis map lacks. The script then appends the compiled reader lines of a probe copy of the drag partial (`composables/_drag.scss`), a hypothetical sorter reader (`composables/_sort.scss`), and a two-family copy of the accent partial (`modifiers/_family.scss`).
- The `freeze.mjs` script computes WCAG contrast ratios, by the scout's formula, for an emphasis value computed in one mode and drawn on the other mode's body background, over the token literals at `src/bootstrap/_tokens.scss:60-67`, `:95`, `:143`, and `:155-162`. Its output is `freeze.txt`.
- The scout's `contrast.mjs` script and its output `contrast.txt` sit one folder up and give the in-mode ratios.

The probe run of 2026-10-08 gives these results:

| Compile | Accent scopes emitted |
| --- | --- |
| Default maps | `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark` |
| `$theme-colors` configured to `success` and `danger` | `success`, `danger` |
| Hand-listed control under the same configuration | all 8 keys |
| `$theme-colors` configured to a planted `brand` key | none; the compile stops with "The text-emphasis family has no value for the theme color brand." |

The configured run shows that a map configured through the load-path specifier reaches a partial that loads the maps through `../../bootstrap/maps`, because Sass resolves both specifiers to one module. The brief noted that no run had compiled a styles partial under that configuration (`brief.md:189`); this run closes that question for the compiler and leaves the Vite build unrun.

## Mechanism

The mechanism has one generating partial, one reader link per module, and one rule for the color-mode roots.

### The modifier partial

The `src/styles/modifiers/_accent.scss` partial reads as the following fence states:

```scss
@use 'sass:map';
@use '../../bootstrap/maps';

// Each family pairs an accent token with the Bootstrap map whose value it takes for every theme-color key.
$families: (
	'text-emphasis': maps.$theme-colors-text,
);

@layer modifiers {
	@each $key in map.keys(maps.$theme-colors) {
		// A custom property inherits the value computed where it is declared, so each mode or pack
		// root inside the accent resolves the reference again, and scope proximity keeps the nearest accent.
		@scope (.accent-#{$key}) {
			:scope,
			[data-bs-theme],
			[data-vn-theme] {
				@each $family, $map in $families {
					@if not map.has-key($map, $key) {
						@error 'The #{$family} family has no value for the theme color #{$key}.';
					}

					--vn-accent-#{$family}: #{map.get($map, $key)};
				}
			}
		}
	}
}
```

Each part of the partial answers one binding rule, as the following list states:

- The keys come from `maps.$theme-colors`, the key list the variant varies over (`verdict.md:233`; `styles.md:64`; the user's thirteenth-round ruling in `stage-b/user-rulings-2026-10-06.md:74`). No key is written by hand.
- Each value comes from the family's own map, so a consumer who configures a map through `@use … with` changes the family, and every value stays a `var(--bs-*)` reference (`src/bootstrap/_maps.scss:42-51`). The partial writes no literal color (`styles.md:51-55`).
- The `@error` line refuses a key that a family map lacks. Without it, the probe compiled `--vn-accent-text-emphasis: ;` for the planted key. That empty value is still a value, so `var()` substitutes it and never reaches the reader's Bootstrap fallback.
- The `@scope` block sets the token on the accented element (`:scope`) and again on every `[data-bs-theme]` and `[data-vn-theme]` element inside it. Bootstrap declares the emphasis tokens on `:root`, `[data-bs-theme='light']`, and `[data-bs-theme='dark']` (`src/bootstrap/_tokens.scss:19`, `:139`), and a theme pack declares them on its `[data-vn-theme]` root and its `[data-bs-theme]` descendants (`src/styles/_mixins.scss:3-22`). Resolving the reference on those elements reads each mode's and each pack's own value. The `retune` mixin already emits `@scope` (`src/styles/_mixins.scss:5`), so the at-rule adds nothing to the platform floor the styles sheet needs.
- Scope proximity settles nested accents. Two scoped rules of equal specificity resolve to the one whose scoping root is fewer generations from the element, before order of appearance (see [CSS Cascading and Inheritance Level 6, scope proximity](https://www.w3.org/TR/css-cascade-6/#cascade-proximity)). Inside `.accent-danger > .accent-success > [data-bs-theme]`, the island takes `success`. The `:scope` selector and the attribute selectors carry equal specificity, so proximity decides between them.
- The partial writes one `@layer modifiers` block and no other layer (`verdict.md:234`; `styles.md:73`), and it calls no Bootstrap mixin (`verdict.md:232`).

### Generated output

The default compile in `probe.txt` writes one scope block per key in the map's order. The following fence shows the block for `success`, and the compile writes the same shape for each other key:

```css
@layer modifiers {
  @scope (.accent-success) {
    :scope,
    [data-bs-theme],
    [data-vn-theme] {
      --vn-accent-text-emphasis: var(--bs-success-text-emphasis);
    }
  }
}
```

### The sortable reader

The sortable reads the accent through one changed line. The partial-local `$color` variable at `src/styles/composables/_drag.scss:4` gains the accent link after the module's own hook, as the following fence states:

```scss
$color: var(--vn-drag-color, var(--vn-accent-text-emphasis, var(--bs-list-group-active-bg, var(--bs-primary))));
```

The probe copy of the drag partial compiles that variable into the line, the over tint, and the empty-host outline. The following fence shows the compiled declarations from `probe.txt`:

```css
border: 0 solid var(--vn-drag-color, var(--vn-accent-text-emphasis, var(--bs-list-group-active-bg, var(--bs-primary))));
background-color: color-mix(in oklab, var(--vn-drag-color, var(--vn-accent-text-emphasis, var(--bs-list-group-active-bg, var(--bs-primary)))) 15%, transparent);
outline: var(--vn-drag-size) dashed var(--vn-drag-color, var(--vn-accent-text-emphasis, var(--bs-list-group-active-bg, var(--bs-primary))));
```

Nothing else in the drag partial changes: the `.active` line keeps `--bs-list-group-active-color` (`:40-42`), the forced-colors block keeps `Highlight` (`:63-72`), and the host keeps its `--vn-drag-size` and `--vn-drag-opacity` properties (`:15-18`). The partial declares no accent token. It reads the token alone, which keeps an ancestor's accent visible to the host and its items.

### A later reader

A later module reads the same token with one link and generates nothing. No sorter partial exists at `9f56e6a`, and no unit in this proposal writes one. The following fence shows a hypothetical `composables/_sort.scss` partial that paints a sorted column's indicator, compiled in `probe.txt`:

```scss
$color: var(--vn-accent-text-emphasis, var(--bs-link-color));

@layer composables {
	[data-vn-sort] th[aria-sort='ascending']::after,
	[data-vn-sort] th[aria-sort='descending']::after {
		color: $color;
	}
}
```

With that partial, an `accent-success` class on a card retints the sortable and the sorter inside it, and a table outside every accent keeps the Bootstrap link color. When a later reader needs a fill or an outline, the `$families` map gains one entry, and every class gains the token. The following fence shows the `success` block from the two-family compile in `probe.txt`, under a `$theme-colors` configured to that one key:

```css
@layer modifiers {
  @scope (.accent-success) {
    :scope,
    [data-bs-theme],
    [data-vn-theme] {
      --vn-accent-text-emphasis: var(--bs-success-text-emphasis);
      --vn-accent-bg-subtle: var(--bs-success-bg-subtle);
    }
  }
}
```

### The freeze across a mode root

The partial resolves the token again at mode and pack roots because an inherited custom property carries the value computed on the element that declares it. A `.accent-success` section in light mode computes `#0a3622`, and a `[data-bs-theme='dark']` card inside it inherits `#0a3622`, not the dark `#75b798`. The freeze run gives the contrast of that inherited line against the other mode's body background:

| Key | Light emphasis on the dark body | Dark emphasis on the light body |
| --- | --- | --- |
| primary | 1.14 | 2.42 |
| secondary | 1.14 | 2.29 |
| success | 1.15 | 2.34 |
| info | 1.73 | 1.55 |
| warning | 1.93 | 1.36 |
| danger | 1.13 | 2.53 |
| light | 1.89 | 1.05 |
| dark | 1.89 | 1.30 |

Every cell falls under 3:1. Resolving the token again on the island gives the in-mode readings of the scout's run, at least 6.10 in every key and mode (`contrast.txt`). The run reads the body backgrounds alone, and no browser measured a rendered line.

## Naming

The names follow the scaffold styles rule (`styles.md:98-107`) and the design laws at `/home/user/scaffold/AGENTS.md:54` and `:59`. The following table lists each name with its rule and its ruling:

| Kind | Name | Rule | Ruling |
| --- | --- | --- | --- |
| Modifier class | `.accent-KEY` | `styles.md:104`: "bare adjective/noun: `.surface`, `.muted`, `.accent`" | Meets the rule under one reading and breaks it under the strict one; the "Rulings this proposal needs" section puts the reading to the user |
| Custom property | `--vn-accent-text-emphasis` | `styles.md:103`: `--{scope}-{property}[-modifier]` | Meets it: scope `vn`, property `accent`, modifier `text-emphasis` |
| Later custom properties | `--vn-accent-bg-subtle`, `--vn-accent-border-subtle` | Same | Each enters with its first reader; the suffixes repeat Bootstrap's family names, so one concept keeps one term (`AGENTS.md:54`) |
| Partial | `src/styles/modifiers/_accent.scss` | One same-named partial per folder (`verdict.md:234`) | Named for the axis the class family varies |
| Sass variable | `$families` | `styles.md:102`: lowercase kebab-case | Partial-local, not `!default`, because the family list is the partial's contract and a consumer configures the Bootstrap maps instead |
| Token registry key | `TOKEN_NAMES.veneer.accent.text.emphasis` | The key law at `ROADMAP.md:46` | Hyphen segments of the name after the `--vn-` prefix |
| Class registry key | `CLASS_NAMES.veneer.modifiers.accent.KEY` | The key and category laws at `ROADMAP.md:46` and `src/core/constants.ts:1056` | A general token-only class is a modifier, and no `accent` class exists, so no `base` key |
| Proof | `tests/src/styles/modifiers/accent.test.ts` | The mirror rule in `tests/setupPolicy.ts:252-279` | Mirrors the partial's folder and stem |

The axis takes the word "accent" for the following reasons, and refuses the other candidates:

- The styles rule names `.accent` as its own modifier example (`styles.md:104`), and the platform's `accent-color` property names the same concept: the color an element uses to mark its state.
- "Variant" already names a journey project of one color mode and one viewport (`guides/veneer.md:2402-2414`), so reusing it breaks "one concept, one term" (`AGENTS.md:54`).
- "Theme" already names Bootstrap's color modes (`data-bs-theme`), veneer's packs (`data-vn-theme`), and the map itself (`$theme-colors`), so another meaning would collide with each of them.
- Bootstrap uses "accent" once, in the `--bs-table-accent-bg` token for a striped, active, or hovered table row's fill (`src/bootstrap/components/_tables.scss:12`). That token sits under the `--bs-` prefix and names a related idea, a row's state color, so the overlap is one of meaning, not of name.

The class carries the axis before the key for these reasons:

- A bare key class, such as `.dark` or `.light`, would read as a color mode beside `data-bs-theme`, and many consumer stylesheets already use `.dark`, `.primary`, and `.secondary` for their own purposes. Under this lens, the class sets an inherited token, so a consumer's bare `.dark` on `<html>` would retint every veneer module on the page.
- The axis-first form names the discriminant (`AGENTS.md:59`) and follows Bootstrap's own valued token-only classes, such as `bg-opacity-50` (`CLASS_NAMES.bootstrap.modifiers.bg.opacity['50']`, `src/core/constants.ts:1946-1956`).
- No `CLASS_NAMES.bootstrap` leaf starts with `accent` (a search of `src/core/constants.ts` for `'accent` returns 0 hits), which meets the stage B rule that veneer-owned classes avoid every Bootstrap name (`browser-stage-b-verdict.md:1030`).

## Folder placement and layers

Each file writes the layer its folder owns, under the order `reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities` (`src/styles/_tokens.scss:2`). The following table lists every styles file the proposal touches:

| File | Folder job (`ROADMAP.md:101-107`) | Layer | What it writes |
| --- | --- | --- | --- |
| `src/styles/modifiers/_accent.scss` | "A class that sets a token other rules read" (`:104`) | `modifiers` | One scope block per key, each setting the accent family on the class, its mode roots, and its pack roots |
| `src/styles/modifiers/_index.scss` | Folder barrel | none | `@use 'accent';` |
| `src/styles/composables/_drag.scss` | "Chrome that applies only after the engine sets state" (`:106`) | `composables` | One changed variable at `:4`; no declaration of an accent token |
| `src/styles/surfaces/_drag.scss` | Attribute APIs (`:105`) | `surfaces` | Unchanged |
| `src/styles/_tokens.scss` | Order statement and `:root` tokens | none | Unchanged; the accent family takes no `:root` value |

The accent family takes no `:root` value because a root value would sit first in every reader's chain on every element, so the `.list-group` default line and each contextual item's tint would never show. A token that only a modifier class declares, and that every reader reads with a fallback, has its home in the modifier partial (`ROADMAP.md:104`). The themes proof keeps `_tokens.scss` to the order statement (`tests/src/styles/themes/index.test.ts:36-38`), so the themes barrel keeps loading `../tokens` (`ROADMAP.md:63`).

## Relation to Bootstrap's contextual variants

The accent changes veneer chrome alone, and it decides precedence by its place in each reader's chain, not by the cascade. On a sortable item's line, the first link that is set wins, in the order the following table states:

| Order | Source | Where it is set | Line color |
| --- | --- | --- | --- |
| 1 | The `--vn-drag-color` property | Any author declaration on the item, the host, or an ancestor | That value |
| 2 | The `--vn-accent-text-emphasis` property | The nearest `.accent-KEY` element, on the item or an ancestor, resolved again at mode and pack roots | `var(--bs-KEY-text-emphasis)` in the item's mode |
| 3 | The `--bs-list-group-active-bg` token | The item's `.list-group-item-KEY` class, else the host's `.list-group` class | The contextual item's text-emphasis, else the `.list-group` literal `#0d6efd` (`_list-group.scss:20`) |
| 4 | The `--bs-primary` token | The root | `#0d6efd` |

The chain has exceptions. An `.active` item's line keeps `--bs-list-group-active-color` (`composables/_drag.scss:40-42`), because a line drawn in an accent color on the filled active background has no contrast reading. Under `forced-colors: active`, the line and the outline take `Highlight` (`:63-72`).

The following cases show how the accent meets Bootstrap's contextual classes on one host:

- With `<ul class="list-group accent-success" data-vn-drag>` and an item with `.list-group-item-danger`, the line on the danger item takes the success emphasis, and Bootstrap still paints the item's background, text, and border in danger. The accent overrides the nearer contextual tint on veneer chrome, as the `--vn-drag-color` property does at `9f56e6a` (`guides/veneer.md:1603-1610`).
- To keep a contextual item's tint inside an accented host, put the matching accent class on the item as well, as in `list-group-item-danger accent-danger`. The nearest accent wins by inheritance.
- With no accent anywhere, the chain falls through to the Bootstrap list-group token, and every proof and specimen of `9f56e6a` reads as it does today.
- With an accent on a section that holds several modules, every module inside reads it. This is the economy this lens argues for.

The doctrine's layer-order rule binds as the following list states:

- The rule reads "Beat Bootstrap's normal declarations by layer order alone, never by `!important` or added specificity" (`verdict.md:236`). The accent partial declares only `--vn-accent-*` properties, which no Bootstrap rule declares, so it beats no Bootstrap declaration and needs no layer win. It writes no `!important`, and its selectors carry one class, `:scope`, or one attribute.
- Layer order still matters inside the styles sheet. The `modifiers` layer follows `elements`, `components`, `surfaces`, and `composables`, so on one element an accent declaration wins over any of those layers' declarations of the same name. The design forbids those declarations, and a pin in the "Registries and pins" section refuses them.
- The `utilities` layer follows `modifiers`, so a later veneer utility on the same element and property still wins over chrome that reads the accent, as the guide's composition list states (`guides/veneer.md:2061`).
- A Bootstrap utility such as `.text-success` writes `!important` outside every layer, so it wins over a later reader's declaration of the same property on the same element. That yield matches the documented yield of the `opacity-25` class (`guides/veneer.md:1613-1615`).

## Economy against a competing token layer

The economy comes from generating once and reading everywhere. The following table states what each later styled module costs under this lens and under a per-module family such as `[data-vn-drag].success`:

| Cost per later styled module | Accent tokens | Per-module family |
| --- | --- | --- |
| Generated rules | None; one `var()` link in the module's partial | One rule per theme-color key in the module's partial |
| Classes and registry leaves | None | None beyond the shared key classes, plus one `--vn-MODULE-color` token leaf |
| Mixin | None; one partial holds the loop, so `styles.md:65` never triggers and `styles.md:69` holds | A shared mixin after another module repeats the loop (`styles.md:65`) |
| Application | One class on any ancestor reaches every module inside it | One class on each module host |

The risk is a veneer token family that competes with Bootstrap's own. Bootstrap 5.3 has per-key families (`--bs-KEY-text-emphasis`, `--bs-KEY-bg-subtle`, `--bs-KEY-border-subtle`) and per-component tokens that its contextual classes set (`--bs-list-group-active-bg`, `--bs-alert-color`), but no token that carries one theme color across a subtree. The accent family adds that missing axis, which the native track's rule admits: build only what Bootstrap lacks (`ROADMAP.md:142`). The family competes with Bootstrap only if it crosses one of the following lines, and each line has a pin or a refusal:

- **A second palette.** An accent value that is not a reference to a Bootstrap family would let the two drift. The partial reads every value from the maps, and the conformance generation case compares every compiled value with the committed `tests/fixtures/bootstrap/maps.json` fixture.
- **A take-over.** A `./styles` rule that writes a `--bs-*` property, or that makes a Bootstrap component read the accent, would move Bootstrap's paint (D-2 and D-6 at `browser-stage-b-verdict.md:1051` and `:1055`). The `TOKEN_NAMES.veneer` pin compares every custom property the built `./styles` sheet declares with the registry, so a `--bs-*` declaration in that sheet fails it. At `9f56e6a`, no gate refuses such a declaration: the placement case pins layers, not property names (`tests/src/styles/index.test.ts:24-43`).
- **A second home.** A pack, the default pack, or a module partial that declares an accent token would shadow every ancestor accent for the elements inside it. The pin refuses an accent declaration outside the `modifiers` layer of the built `./styles` sheet, and the themes sheet declares none.
- **A false promise.** A consumer can read `accent-success` on a `.list-group` and expect Bootstrap's items to turn green. The guide states that the accent reaches veneer chrome alone and names Bootstrap's contextual classes for Bootstrap's own paint.

## Registries and pins

The proposal lands both `veneer` groups that the styles chunk owes (`ROADMAP.md:143`). The `TOKEN_NAMES.veneer` group holds every `--vn-*` name the built `./styles` sheet declares on any selector, which is the law the `bootstrap` group follows (`src/core/constants.ts:5`; `ROADMAP.md:46`). The following fence shows both groups, frozen and annotated the way the `bootstrap` groups are, with keys sorted by code unit:

```ts
veneer: /* @__PURE__ */ Object.freeze({
	accent: /* @__PURE__ */ Object.freeze({
		text: /* @__PURE__ */ Object.freeze({ emphasis: '--vn-accent-text-emphasis' as const }),
	}),
	drag: /* @__PURE__ */ Object.freeze({
		opacity: '--vn-drag-opacity' as const,
		size: '--vn-drag-size' as const,
	}),
}),
// In CLASS_NAMES, beside the bootstrap group:
veneer: /* @__PURE__ */ Object.freeze({
	composables: /* @__PURE__ */ Object.freeze({ active: 'active' as const }),
	modifiers: /* @__PURE__ */ Object.freeze({
		accent: /* @__PURE__ */ Object.freeze({
			danger: 'accent-danger' as const,
			dark: 'accent-dark' as const,
			info: 'accent-info' as const,
			light: 'accent-light' as const,
			primary: 'accent-primary' as const,
			secondary: 'accent-secondary' as const,
			success: 'accent-success' as const,
			warning: 'accent-warning' as const,
		}),
	}),
}),
```

The groups follow these rules:

- The `--vn-drag-color` property stays out of `TOKEN_NAMES.veneer`, because no rule declares it and a name read only through a `var()` fallback is not a member (`ROADMAP.md:46`).
- `CLASS_NAMES.veneer` holds every class a `./styles` selector reacts to, Bootstrap names included (`browser-stage-b-verdict.md:1029`). The drag composable selects `.active` (`composables/_drag.scss:40`, `:65`), a general engine-set state, so it files under `composables`. The `[data-bs-theme]` and `[data-vn-theme]` selectors are attributes, and core holds no attribute registry (`ROADMAP.md:46`).
- `ROADMAP.md:46` lands the token group "with its first declared token", while `ROADMAP.md:143` keeps the pin an `it.todo` case "until the first global token lands". The built sheet declares `--vn-drag-size` and `--vn-drag-opacity` at `9f56e6a`, and this proposal declares one more name, so the proposal follows line 46 and rewrites line 143.

The two-way pins replace the `it.todo` case at `tests/src/styles/index.test.ts:85-87`, with these readings and controls:

- The token case reads every custom property the built `./styles` sheet declares through `collectSheetNames` (`tests/setupStyles.ts:139`) and compares the sorted list with the leaves of `TOKEN_NAMES.veneer`, both ways. The same case reads that every site of an `--vn-accent-*` name sits in the `modifiers` layer. Its planted controls insert a `--bs-list-group-active-bg: var(--bs-danger)` declaration and a `composables` declaration of `--vn-accent-text-emphasis`, and the case reports each one.
- The class case reads every class of the built `./styles` sheet through `collectSheetClasses` and compares it with the names of `CLASS_NAMES.veneer`, both ways. Its planted control inserts a `@scope (.planted-scope)` block, and the case reports `planted-scope`. That control needs the instrument change the "Units" section gives unit V1. At `9f56e6a`, `collectSheetClasses` and `collectLayerClasses` read classes from style-rule selectors alone (`tests/setupStyles.ts:18-30`, `:445-472`), so a class in an `@scope` prelude stays invisible to both, and to the disjoint-layer case, which reads `collectLayerClasses` (`tests/integration.test.ts:292-320`).
- The core registry case pins the group keys to `['bootstrap']` (`tests/src/core/index.test.ts:64-65`), so it changes to `['bootstrap', 'veneer']` and adds one leaf example per group.

## Showcase specimen

The sortable section gains another live figure that shows an accented host. The `app/browser/sections/sortable-list.html` fragment adds a `col d-flex` column after the existing one, with a figure of class `card flex-fill mb-0` (`tests/app/browser/sections/integration.test.ts:64-70`). The figure holds `ul#returns-queue.list-group.accent-success[data-vn-drag]` with the accessible name "Returns queue" and the items "Inspect returns", "Restock shelves", and "Issue refunds". Each item carries a grip button and `--previous` and `--next` command buttons aimed at `returns-queue`, with the names the existing items use ("Move Inspect returns", "Move Inspect returns up", and so on). The caption title reads "Returns queue", and its line reads: "Drag a grip to see the insertion line in the success accent. Any accent class from the theme colors retints every Veneer module inside it; Bootstrap's own classes keep their paint."

The specimen meets the section laws as the following list states:

- The figure carries no `style` attribute and no `hidden` element (`tests/app/browser/sections/integration.test.ts:63`, `:73`).
- The census refuses every class outside the `ADMITTED` set (`:23-27`, `:61`), so the set gains `...collectNames(CLASS_NAMES.veneer)`, and the planted-class control still reports `veneer-planted` (`:179-197`). A native section owns no registry row (`:42-51`), so the specimen shows the class without owning it.
- The journey resolves the existing list by its exact name, "Dispatch priorities" (`tests/app/browser/integration.test.ts:442`), so the added list's name stays distinct.

The specimen shows one key, and the `src:styles` matrix proves every key. One live host per key would need its own names and command targets for each host and would add markup without adding a proof. A native section owns no registry row, so the census does not require every veneer class on the page.

The journey gains one case. It drags "Move Inspect returns" onto the lower part of "Move Restock shelves" with `userEvent.dragAndDrop`, as the sortable case does (`tests/app/browser/integration.test.ts:477-489`). It then reads the `::after` top border color of the item that carries the `data-vn-insert` attribute. The color must match `readToken(item, '--bs-success-text-emphasis')` and differ from `readToken(list, '--bs-list-group-active-bg')`. The journey variants run in both color modes (`guides/veneer.md:2404-2408`), and the expected value is read on the item in each mode, so one case covers both.

## Proof matrix

The proofs generate their cells from the maps fixture in Node and from `CLASS_NAMES.veneer` in Chromium, and each case carries a planted control that turns it red.

The following table lists the Node cases, in the `conformance` project beside the maps cases (`tests/conformance.test.ts:673-767`), which compile through `compileEntry`:

| Case | Reading | Planted control |
| --- | --- | --- |
| `generates one accent scope per $theme-colors key through one each loop` | Compiles `@use 'src/styles/modifiers/accent';`. The scope roots equal `accent-KEY` for the `theme-colors` keys of `maps.json` in order. Each value equals the `theme-colors-text` value at the same index. Each block's selector list is `:scope, [data-bs-theme], [data-vn-theme]` | None; the following case holds the controls |
| `follows a configured $theme-colors and refuses a key a family lacks, beside a hand-listed control` | Configures `$theme-colors` to a subset of the fixture keys through `@use 'src/bootstrap/maps' with (…)` before the partial; exactly that subset's scopes compile. Configures a planted key; the compile throws a message that names the family and the key | A scratch copy of the partial with the `@each` over a hand-written key list, compiled under the same configuration, emits every key, so the generation reading reddens; the scratch follows the existing `createScratch` control at `:733-755` |
| `admits only the Bootstrap maps module from styles and reports every other crossing` | Runs unchanged; its pass over the real tree reads the accent partial's `@use '../../bootstrap/maps'` and `@use 'sass:map'` statements and must report no violation | Its own refused fixtures (`:778-780`) |

The following table lists the Chromium cases in the `src:styles` project:

| File and case | Cells | Reading | Planted controls |
| --- | --- | --- | --- |
| `tests/src/styles/modifiers/accent.test.ts`: `writes the accent modifier partial in one modifiers block, beside a planted bootstrap control` | The partial through `?inline` | One `modifiers` block, read through `readAtPlacement` and `readPlacement`, as the drag case does (`composables/drag.test.ts:35-59`) | `@layer modifiers` replaced by `@layer bootstrap` |
| `tests/src/styles/modifiers/accent.test.ts`: `resolves the nearest accent of every theme-color key on itself, under an ancestor, across a mode or pack root, and under another accent` | One cell per key of `CLASS_NAMES.veneer.modifiers.accent`, per position (on the reader, on an ancestor, on an ancestor of a `data-bs-theme` island of the other mode, on an ancestor of a pack root, and inside an accent of every other key, so both map orders are read), in the light and dark modes | `readToken(reader, '--vn-accent-text-emphasis')` matches `readToken(reader, '--bs-KEY-text-emphasis')` on the same element. The pack cell uses a fixture `theme`-layer rule that sets `--bs-KEY-text-emphasis` to another Bootstrap reference on `[data-vn-theme='probe']`. The reader is a plain element that no partial styles, which proves the token reaches a reader that does not exist yet | The built sheet with `[data-bs-theme],` removed reddens the island cells; with `[data-vn-theme]` removed, the pack cells; with each scope block rewritten as the plain list `.accent-KEY, .accent-KEY [data-bs-theme], .accent-KEY [data-vn-theme]`, the nested cells whose outer key sorts later in map order |
| `tests/src/styles/composables/drag.test.ts`: `draws the line, the over tint, and the empty-host outline in the nearest accent of every theme-color key, and keeps the active line` | One cell per accent key, per position (on the host, on a wrapper around the host, on the last item, and on the last item inside a host of another accent), per last-item class (none, each `CLASS_NAMES.bootstrap.components.list.group.item` key other than `base`, and `.active`), in the light and dark modes | With `data-vn-insert` set on the last item, the `::after` border color matches the nearest accent's `--bs-KEY-text-emphasis` resolved on the item, or `--bs-list-group-active-color` on `.active`. With `data-vn-over` on the host, the background matches the 15% `color-mix` of the host's accent, and an empty accented host's outline matches the accent | The built sheet with the chain reordered to read `--bs-list-group-active-bg` before the accent reddens the host and wrapper cells, because the `.list-group` literal wins. An added `[data-vn-drag] { --vn-accent-text-emphasis: var(--bs-primary-text-emphasis) }` block in `composables` reddens the wrapper cells of every key but `primary`, which proves that no module partial may declare the token |
| `tests/src/styles/composables/drag.test.ts`: the existing cases | As at `9f56e6a` | Unchanged; with no accent, the line still equals `--bs-list-group-active-bg` | Unchanged |
| `tests/src/styles/index.test.ts`: the registry cases | The built `./styles` sheet | As the "Registries and pins" section states | As that section states |

The cell builders live in `tests/setupStyles.ts` with their proofs in `tests/setupStyles.test.ts`, because every CSS Object Model (CSSOM) instrument a sheet proof reads lives there (`styles.md:94`). The accent matrix adds no viewport change, so it costs renders, not resizes. The drag accent case draws its last-item classes from the same registry keys `buildDragCells` reads (`tests/setupStyles.ts:584-586`).

## Sealed-face check

The Bootstrap face stays sealed, and each unit's gate reads the seal as the following list states:

- No unit edits a file under `src/bootstrap` or `tests/fixtures/bootstrap`. The command `git diff --exit-code 9f56e6a -- src/bootstrap tests/fixtures/bootstrap` exits 0 after every unit.
- `npm run test:src:bootstrap` passes with the conformance digest (`tests/fixtures/bootstrap/pass.json`; `BOOTSTRAP_DIGEST` at `tests/setupServer.ts:90-91`), link 1, and link 3 unchanged (`verdict.md:230`).
- `npm run test:conformance` passes with the `styles face boundaries` case unchanged. The accent partial loads the maps through the admitted relative form and loads `sass:map`, a built-in module.
- The accent partial calls no Bootstrap mixin and writes no `bootstrap` block. The placement case refuses a `bootstrap` block (`tests/src/styles/index.test.ts:24-43`), and the `TOKEN_NAMES.veneer` pin refuses a `--bs-*` declaration in `./styles`.

## Risks

The following table lists each risk, what would show it, and what holds it:

| Risk | Evidence | Mitigation |
| --- | --- | --- |
| The `.accent-KEY` form breaks `styles.md:104` under its strict reading | The rule's examples are single words | The user rules the reading (R-1 in the "Rulings this proposal needs" section); a scaffold follow-up states the valued form if the user admits it |
| The accent family is the first veneer token that is neither component-scoped nor on `:root`, and the user's fourteenth-round ruling speaks of component-scoped drag tokens (`user-rulings-2026-10-06.md:81`) | `styles.md:49` sends global tokens to `_tokens.scss`, and `verdict.md:237` names component-scoped properties alone | The user rules the modifier-token kind (R-2); `ROADMAP.md:104` records it; the pins keep it out of every other layer and sheet |
| An ancestor accent overrides a nearer `.list-group-item-KEY` tint on veneer chrome | The chain order in the "Relation to Bootstrap's contextual variants" section | The user rules the precedence (R-4); the guide states it with the item-level remedy; the drag accent case pins it |
| An accent freezes across a mode or pack root | `freeze.txt`: 1.05 to 2.53 in every key and both directions | The partial resolves the token again at `[data-bs-theme]` and `[data-vn-theme]`; the accent matrix's island and pack cells, with their controls, pin it. A consumer who retunes a Bootstrap emphasis token on any other element puts the accent on or inside that element, and the guide says so |
| The class instruments read no `@scope` prelude | `tests/setupStyles.ts:18-30`, `:445-472` | Unit V1 extends `collectSheetClasses` and `collectLayerClasses` to read `CSSScopeRule.start` and `.end` before any pin runs |
| A browser that does not parse `@scope` drops each accent block | CSS error handling ignores an unknown at-rule and its block | Each reader falls back to its Bootstrap chain, which is the paint of `9f56e6a`; the `retune` mixin already depends on `@scope`; the proofs run Chromium 141 and 153 alone |
| A consumer's own `accent-KEY` class collides | Tailwind's `accent-*` utilities set `accent-color`, and a consumer palette that names a theme-color key yields the same class name | Both rules apply and set different properties; no consumer collision was measured |
| Several accent classes on one element resolve by map order | Equal proximity and specificity fall to order of appearance | The guide states one accent class per element |
| The `light` and `dark` keys read alike | Both light-mode emphasis values are `#495057` (`src/bootstrap/_tokens.scss:66-67`) | Bootstrap's own tokens; the partial generates them as the map gives them and excludes no key by hand |
| A family ships with no reader | The stage B reader law: a token ships only with a rule that reads it (`browser-stage-b-verdict.md:1001`) | The `$families` map holds `text-emphasis` alone; each later family enters with its first reader |
| No proof compiles `./styles/scss` from a packed install, and this proposal makes that entry load across faces for the first time | `tests/distribution.test.ts:841-875` compiles `./bootstrap/scss` alone | Unit V5 adds a packed `./styles/scss` compile |
| Another unit edits the drag partial, its proof, the sortable fragment, or the showcase page in parallel | The sortable regression report belongs to another unit | Units V3 and V4 land after any unit that writes those files, on its tip, with one writer per file |

## Rejected alternatives

This proposal rules every other option the brief lists, and the options this lens raised, as the following table states:

| Option | Ruling and reason |
| --- | --- |
| A class per module, such as `.drag-success` | Rejected. It breaks the bare modifier form more plainly than `.accent-KEY` does, needs one generated set per module, and cannot reach several modules from one ancestor |
| A bare key under each host, such as `[data-vn-drag].success` (the brief's fewest-conflicts option) | Rejected under this lens. It meets the bare form and limits a collision to module hosts, but each module repeats the loop and its own token, a mixin follows when another module repeats the loop, and an author repeats the class on every host |
| A bare key as a generic class, such as `.success` | Rejected. An inherited token behind `.dark` or `.light` collides with color-mode vocabulary and with consumer classes across the whole page |
| A prefixed generic class, such as `.vn-success` | Rejected. The prefix breaks the bare form as much as an axis does, and it names the project rather than the axis |
| One attribute, such as `data-vn-accent='success'` | Rejected. It avoids collisions and passes the census unchanged, but the folder law files an authored attribute API in `surfaces/` while its job is the `modifiers/` job, core holds no attribute registry for a two-way pin, and Bootstrap applies its variants as classes |
| A `:root` default for the accent | Rejected. It would sit first in every chain and hide every Bootstrap fallback, and it would move the themes barrel off `../tokens` (`ROADMAP.md:63`) |
| A plain selector list in place of `@scope` | Rejected. It resolves nested accents that hold a mode root by map order, which the drag and accent controls show as wrong in one of the two orders |
| Container style queries keyed on an accent name | Rejected. Each reader would carry its own loop over the keys, which repeats the generation this lens removes |
| The `$theme-colors` family for the line | Rejected. `info` (1.96), `warning` (1.63), and `light` (1.05) fall under 3:1 on the light body, and `dark` (1.00) falls under it on the dark body (`contrast.txt`). Bootstrap's contextual items give the line the text-emphasis family (`_list-group.scss:248`) |
| The subtle families in the first landing | Deferred. No reader exists; each enters with one `$families` entry when a reader needs it |
| Size and opacity variants | Rejected. The only width map holds literal `px` lengths (`src/bootstrap/_maps.scss:110-116`), the sortable's width already reads `--bs-border-width`, and no admitted map holds opacity steps |
| The elements repository's `modifiers/_variants.scss` as written | Rejected as code and kept as guidance. Its bare `.primary` to `.information` classes set the `--set-variant-*` tokens in `@layer modifiers`, and its readers fall back to defaults (`/home/user/mikesaintsg/elements/src/styles/modifiers/_variants.scss:48-153`; `elements/_input.scss:64`). That shape is this lens. Its hand-listed blocks, literal `white` and `1px` values, bare names, and tokens with no reader each break a veneer rule |

## Units

The work splits into bounded units with disjoint files, as the following table states. Each unit writes only the files its row owns, and each runs `npm run check`, `npm run lint:check`, `npm run format:check`, and `npm run test:policy` beside the gates its row names.

| Unit | Depends on | Owned files | Contract | Gates |
| --- | --- | --- | --- | --- |
| V1 Scope-aware instruments | None | `tests/setupStyles.ts`, `tests/setupStyles.test.ts` | `collectSheetClasses` and `collectLayerClasses` read the classes of a `CSSScopeRule` prelude and limit, under the enclosing layer. Add an accent cell builder and a drag accent cell builder that each take the accent `[key, class]` entries as a parameter and import no `veneer` group, so V1 compiles before V2 lands; the proofs in V2 and V3 pass `Object.entries(CLASS_NAMES.veneer.modifiers.accent)`. Each instrument gains a proof in `tests/setupStyles.test.ts` with a planted entry list or a planted rule as its control | `npm run test:setup:browser`, `npm run test:integration` |
| V2 Accent partial and registries | V1 | `src/styles/modifiers/_accent.scss` (added), `src/styles/modifiers/_index.scss`, `src/core/constants.ts`, `tests/src/core/index.test.ts`, `tests/conformance.test.ts`, `tests/src/styles/modifiers/accent.test.ts` (added), `tests/src/styles/index.test.ts` | The partial as the "Mechanism" section states. Both `veneer` groups, with the `@remarks` of `TOKEN_NAMES` and `CLASS_NAMES` naming the group and the description paragraphs unchanged, so guide parity holds. The Node and Chromium cases and the registry pins with their controls | `npm run test:conformance`, `npm run test:src:styles`, `npm run test:src:core`, `npm run test:src:bootstrap` (the seal), `npm run test:integration` |
| V3 Sortable reader | V2 | `src/styles/composables/_drag.scss`, `tests/src/styles/composables/drag.test.ts` | One changed variable at `:4`; the drag accent case with its controls; the existing cases unchanged | `npm run test:src:styles`, `npm run test:src:bootstrap` |
| V4 Showcase specimen and journey | V3 | `app/browser/sections/sortable-list.html`, `tests/app/browser/sections/integration.test.ts`, `tests/app/browser/integration.test.ts`, `showcase/browser.html` (rebuilt) | The added figure, the `ADMITTED` change, and the journey case, as the "Showcase specimen" section states | `npm run test:app:browser`, `npm run test:journey`, `npm run build:showcase` |
| V5 Packed styles Sass | V2 | `tests/distribution.test.ts` | One case, `compiles the styles Sass export through a package importer [requires the registry]`, that compiles `pkg:` `./styles/scss` from the packed install and reads one `@scope (.accent-KEY)` block per `maps.json` key | `npm run test:distribution` |
| V6 Prose | V3, V4, V5 | `guides/veneer.md`, `ROADMAP.md`, `guides/README.md` | The guide's § Sortable list chain sentence and an accent paragraph; § Styles sheet: the partial table row, an accent subsection with the precedence, the reach, and the one-class rule, an override row, and the sentence at `:1963-1964` that says each partial loads nothing from `src/bootstrap`; the core registry rows. `ROADMAP.md:46` and `:143` record both groups, the date, and the replaced `it.todo` case; `:104` records the modifier-token kind. `guides/README.md` gains the modifiers row if its concept index lists partials | `npm run test:guides`, `npm run test:policy` |

The orchestrator lands V3 and V4 on the tip of any unit that writes the drag partial, its proof, the sortable fragment, or the showcase page. No unit commits, and the prose unit runs last because prose follows working code (`writing.md`).

## Rulings this proposal needs

The proposal rests on the following rulings, each with its recommendation:

- **R-1, the class form.** Admit `.accent-KEY` under `styles.md:104`, read as "no component or project prefix", with the axis naming the discriminant (`AGENTS.md:59`), and open a scaffold follow-up that writes the valued form into the naming table. The alternative is the bare `[data-vn-drag].success` form, which this lens rejects in the "Rejected alternatives" section.
- **R-2, the modifier-token kind.** Admit a `--vn-*` token that only a modifier class declares, that takes no `:root` value, and that every reader reads with a fallback, homed in its modifier partial and recorded at `ROADMAP.md:104`. This is the token this lens needs; without it, the variants fall back to per-module tokens.
- **R-3, the registry landing.** Land `TOKEN_NAMES.veneer` and `CLASS_NAMES.veneer` with V2, under `ROADMAP.md:46`, and rewrite `ROADMAP.md:143`.
- **R-4, the precedence.** An accent overrides a nearer Bootstrap contextual item tint on veneer chrome alone, and the `.active` line keeps `--bs-list-group-active-color`.

## Sources

The proposal read the following files:

- Brief and scout output: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/brief.md`; `/home/user/veneer/tmp/units/variants-2026-10-08/map.txt`, `contrast.mjs`, and `contrast.txt`.
- Doctrine and rulings: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-2026-10-08/verdict.md` (§ D2.3 and § Sass doctrine for the styles layer, `:98-132`, `:226-239`); `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md` (§ Thirteenth round and § Fourteenth round); `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/browser-stage-b-verdict.md` (§ W4, `:923-1080`).
- Rules: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/styles.md`; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/veneer/AGENTS.md`.
- Veneer styles: `/home/user/veneer/src/styles/index.scss`, `_tokens.scss`, `_mixins.scss`, `_reset.scss`, `surfaces/_drag.scss`, `composables/_drag.scss`, every folder barrel, `themes/index.scss`, and `themes/_default.scss`.
- Veneer Bootstrap: `/home/user/veneer/src/bootstrap/_maps.scss`, `_tokens.scss`, and `components/_tables.scss`; `/home/user/veneer/src/core/constants.ts` (`:1-16`, `:1050-1070`, `:1946-2050`).
- Veneer proofs: `/home/user/veneer/tests/src/styles/composables/drag.test.ts`, `tests/src/styles/index.test.ts`, `tests/setupStyles.ts`, `tests/setup.ts` (`:1240-1300`), `tests/conformance.test.ts` (`:673-846`), `tests/src/bootstrap/index.test.ts` (`:465-500`), `tests/src/core/index.test.ts` (`:55-80`), `tests/integration.test.ts` (`:286-322`), `tests/distribution.test.ts` (`:836-875`), `tests/app/browser/sections/integration.test.ts`, `tests/app/browser/integration.test.ts` (`:437-515`), `tests/setupServer.ts` (`:395-410`), `tests/fixtures/bootstrap/maps.json`, and `vite.config.ts`.
- Veneer guide, roadmap, and showcase: `/home/user/veneer/guides/veneer.md` (§ Sortable list, § Styles sheet, § Theme packs, § Composition, § Variants); `/home/user/veneer/ROADMAP.md` (`:40-145`); `/home/user/veneer/app/browser/sections/sortable-list.html`; `/home/user/veneer/app/browser/constants.ts`; `/home/user/veneer/src/browser/sorters/plugins.ts`; `/home/user/veneer/package.json`.
- Elements repository, as guidance only: `/home/user/mikesaintsg/elements/src/styles/modifiers/_variants.scss`, `modifiers/index.scss`, and the readers in `elements/_input.scss`, `_a.scss`, `_table.scss`, and `_dialog.scss`.
- Runs of 2026-10-08: `/home/user/veneer/tmp/units/variants-2026-10-08/token/probe.mjs` with `probe.txt`, and `freeze.mjs` with `freeze.txt`; the probe partials in `token/modifiers/` and `token/composables/`.
