# Judgment: variants for the styles layer

Select the attribute keying. A host that veneer styles takes one authored attribute, `data-vn-color`, whose value is a key of Bootstrap's `$theme-colors` map, and the module's `surfaces/` partial generates one rule per key that sets the module's own color property from the Bootstrap family map it names. The sortable lands first: a `<ul class="list-group" data-vn-drag data-vn-color="success">` host draws its insertion line, over tint, and empty-host outline in `var(--bs-success-text-emphasis)`. The loop stays inline in `src/styles/surfaces/_drag.scss` until a second module needs a color, when it moves into one `recolor` mixin in `src/styles/_mixins.scss`, so no module repeats it. Against the binding doctrine, the user's request, and extensibility, the attribute proposal scores 27 of 30, the class proposal 25, and the token proposal 21; the selected mechanism scores 29 after the grafts in § Grafts. It needs no amendment to a scaffold rule, no class registry group, and no change to the showcase census. Three questions remain for you, each with one recommendation, in § Questions for the user.

This judgment answers the variant item of the user's request of 2026-10-08: "I would like to allow applying variants to drag and drop elements and other elements and components that we come up with that need styling." It also rules the tension the D2.3 contract deferred (`verdict.md:121`). The clipboard report on Edge for Android, the column-sort link report, and the sortable regression report belong to the M1 mobile repair and its sibling units, and unit V2 waits for M1. The judgment reads `/home/user/veneer` at `9f56e6a` and the `landing` branch at `de168b8`, which holds D2.2 to D2.6 and the keep-screen-on module, together with the scout's brief, the three proposals, the doctrine (`verdict.md:226-239`), and the scaffold laws. One Sass run of 2026-10-08 backs the selected partial's generated sample (§ Evidence). No browser ran, no source file changed, and nothing was committed.

The judgment resolves its paths as follows. A record path such as `brief.md` or `proposal-class.md` is relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/`; the `verdict.md` path names `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-2026-10-08/verdict.md`; and a record such as `browser-stage-b-verdict.md` or `stage-b/user-rulings-2026-10-06.md` is relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/`. A source or test path is relative to `/home/user/veneer`. The `judge/`, `probe/`, `class/`, and `token/` run folders and the scout's `contrast.txt` file sit under `/home/user/veneer/tmp/units/variants-2026-10-08/`. A `styles.md` or `AGENTS.md` citation names the file under `/home/user/scaffold/`.

## Scoring

The following table scores each proposal against each criterion the dispatch names. A 2 meets the criterion as the files stand, a 1 meets it only through a user ruling or a pinned mitigation, and a 0 breaks it. The last column scores the selected mechanism after the grafts.

| Criterion | Attribute | Class | Token | Selected |
| --- | --- | --- | --- | --- |
| One `@each` over the key list (`styles.md:64`; `verdict.md:233`) | 2: keys from `$theme-colors`, values from the named family map, and a refusal on a gap (`probe/compile.txt`) | 2: one loop over `$theme-colors-text`, whose keys the maps pin holds equal to the theme-color keys (`tests/conformance.test.ts:686-708`) | 2: one loop in one partial for every module (`token/probe.txt`) | 2: the attribute's loop, inline (`judge/compile.txt`) |
| Mixin law (`styles.md:65`, `:69`) | 0: the `recolor` mixin lands with one caller | 2: inline; the `vary` mixin waits for a second caller | 2: one partial, so no mixin falls due | 2: inline; the `recolor` mixin waits for a second caller |
| `var(--bs-*)` values and no literal color (`styles.md:51`; `verdict.md:237`) | 2: every value is a maps reference | 2: as the attribute | 2: as the attribute | 2 |
| Folder law with the `modifiers/` definition (`ROADMAP.md:104-105`; `verdict.md:234`) | 2: an authored attribute API is a `surfaces/` job, and `modifiers/` holds classes | 2: a class that sets a token | 2: a class that sets a token | 2 |
| Layer order over `!important` (`verdict.md:236`) | 1: contests no Bootstrap declaration, but `surfaces` precedes `composables`, so a pin must keep every `composables` rule off the color property | 2: contests no Bootstrap declaration, and `modifiers` follows `composables` | 2: as the class | 1: as the attribute, held by the site check and the composables control |
| Attribute-keyed chrome for native modules (`styles.md:109`; `verdict.md:235`) | 2: chrome stays on the state attributes under the host, and the variant joins the `data-vn-WORD` contract | 2: chrome stays on the state attributes under the host | 1: chrome stays on the state attributes, but its color arrives from any ancestor, outside the host scope | 2 |
| Component-scoped tokens on the host (`styles.md:49`; `verdict.md:237`; `stage-b/user-rulings-2026-10-06.md:81`) | 2: the `--vn-drag-color` property on `[data-vn-drag]` | 2: as the attribute | 0: the `--vn-accent-text-emphasis` property is neither component-scoped nor a root token, so its R-2 asks you for a token kind | 2 |
| Naming rules (`styles.md:98-107`; `AGENTS.md:54`, `:59`) | 2: no class; one word after `data-vn-`, naming the axis | 0: the `drag-KEY` class breaks the bare modifier row (`styles.md:104`), and its U0 amends a rule every scaffold target reads | 1: the `accent-KEY` class is a valued form of the row's own `.accent` example, which its R-1 asks you to admit | 2 |
| Minimal public API (`AGENTS.md:65`) | 2: one attribute for every module, and one property per module that paints a color | 1: 8 classes per styled module, a `CLASS_NAMES.veneer` group, and a census change | 1: 8 classes in all, but a token kind and a subtree reach that no consumer asked for | 2 |
| Sealed face (`verdict.md:230`) | 2: no Bootstrap file changes, and the gate admits the one maps load | 2: as the attribute | 2: as the attribute | 2 |
| Request: variants for the sortable | 2: colors the line, the tint, and the outline in every key | 2: as the attribute | 2: as the attribute | 2 |
| Request: later elements and components with no per-module repetition | 2: one call per module after the mixin lands, and one attribute an author learns a single time | 1: the mixin removes the Sass repetition, but an author learns one class family per module | 2: one `var()` link per module | 2 |
| Extensibility to the sorter, the sentinel, and the time module | 2: the attribute compounds on `table.table[data-vn-sort]`, `form[data-vn-sentinel]`, and `time[data-vn-time]`, and a sorter call compiled (`probe/compile.txt`) | 2: the `vary` mixin takes any host selector (`class/mixin/probe.txt`) | 1: one link per module, but an accent on a card retints every module inside it, marked or not | 2 |
| Rule amendments you must grant before landing | 2: none | 1: one, the scaffold naming row | 0: two, R-1 and R-2 | 2 |
| Proof cost | 2: the existing instruments | 2: the existing instruments | 1: the class instruments read no `@scope` prelude (`tests/setupStyles.ts:18-30`), so its V1 rewrites them before any pin runs | 2 |
| Total of 30 | 27 | 25 | 21 | 29 |

The attribute proposal leads because its 3 lost points come from its own choices, not from its keying: the one-caller mixin, which the selected mechanism defers, and the `surfaces` placement, which a pin holds. The class proposal's lost points come from its keying: a scaffold rule amendment and a class family per module. The token proposal's lost points come from its token kind, which sits outside the component-scoped rule (`verdict.md:237`) that the user confirmed for the drag tokens (`stage-b/user-rulings-2026-10-06.md:81`), and from the `@scope` machinery that kind needs to survive a color-mode root (`token/freeze.txt`).

## Selected mechanism

### Keying and naming

A host that veneer styles takes one authored attribute, `data-vn-color`, whose value names a `$theme-colors` key. The following table names each piece of the mechanism:

| Kind | Name | Rule |
| --- | --- | --- |
| Host attribute | `data-vn-color` | One word after `data-vn-`, as `data-vn-drag`, `data-vn-sort`, `data-vn-sentinel`, and `data-vn-time` have (`brief.md` § Naming rules) |
| Attribute value | `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, or `dark` | The upstream keys of `$theme-colors` (`src/bootstrap/_maps.scss:31-40`) |
| Sortable property | `--vn-drag-color` | `--{scope}-{property}` (`styles.md:103`); the composable chain already reads it (`src/styles/composables/_drag.scss:4`) |
| Later module property | `--vn-MODULE-color`, and `--vn-MODULE-bg` or `--vn-MODULE-border-color` for a fill or an outline | The same form, with Bootstrap's component token words, such as `--bs-alert-bg` and `--bs-alert-border-color` |
| Mixin, at the second caller | `recolor($tokens)` | A lowercase kebab-case verb (`styles.md:101`) |
| Sass locals | `$key`, `$value` | Lowercase kebab-case (`styles.md:102`) |

In the preceding table, MODULE stands for the word of a module's host attribute, such as `sort` for `[data-vn-sort]`. KEY, in the rest of this judgment, stands for a `$theme-colors` key.

The attribute takes the word `color` for the following reasons, and the list rules on each other candidate:

- Take `color`. It names the axis its values range over, Bootstrap's theme colors, as the "Named discriminants" law asks (`AGENTS.md:59`), and it is the last word of the property it sets, so the attribute and the property share one term (`AGENTS.md:54`).
- Refuse `variant`. The word names a journey project of one color mode and one viewport (`guides/veneer.md:2402-2414`).
- Refuse `tone`. The showcase's template type names a `tone` slot (`app/browser/types.ts:64`).
- Refuse `theme`. The `data-bs-theme` attribute names Bootstrap's color modes, and the `data-vn-theme` attribute names veneer's packs.
- Refuse `accent`. Bootstrap's `--bs-table-accent-bg` token names a table row's state fill, and the word reads as the token proposal's subtree axis.

An attribute holds one value, so a host carries one color by construction, and an unlisted value matches no rule and leaves the default chain in place. The color rules compound on a module's host attribute, so the attribute on a Bootstrap component such as `.alert` matches no rule; the Bootstrap component keeps Bootstrap's own `alert-KEY` class, because stage B decision D-6 refuses take-overs of Bootstrap classes (`browser-stage-b-verdict.md:1055`).

### The sortable's color rules

Unit V1 adds the color rules at the head of the single `@layer surfaces` block in `src/styles/surfaces/_drag.scss`, which also holds the handle rules and the grouped-host rule of `de168b8`. The partial reads as the following fence states, and the judge's run compiled it (`judge/compile.txt`):

```scss
@use 'sass:map';
@use '../../bootstrap/maps';

@layer surfaces {
	// Bootstrap's contextual list-group items draw this line in the text-emphasis family, which clears 3:1 in both modes.
	@each $key in map.keys(maps.$theme-colors) {
		$value: map.get(maps.$theme-colors-text, $key);

		// An absent value compiles to an empty declaration, which replaces the composable's fallback chain.
		@if not $value {
			@error 'maps.$theme-colors-text holds no #{$key} key';
		}

		[data-vn-drag][data-vn-color='#{$key}'] {
			--vn-drag-color: #{$value};
		}
	}

	// ... the handle rules and the grouped-host rule of de168b8, unchanged
}
```

The run compiled that partial to the following rules, which the unchanged handle and grouped-host rules follow in the same block:

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
  /* ... the handle rules and the grouped-host rule */
}
```

The following facts govern the partial:

- The `@use '../../bootstrap/maps'` statement resolves to `src/bootstrap/maps` from the partial's folder, and that module is the one crossing the `styles face boundaries` case admits (`tests/conformance.test.ts:769-846`; `ROADMAP.md:114`). The partial loads nothing else from `src/bootstrap`.
- Keys come from the axis map and values from the family map, so a consumer who configures either map through `@use … with` changes the output, and a family that lacks a key refuses the compile with the partial's message (`judge/compile.txt`, the gap reading). Without the refusal, the lookup emits `--vn-drag-color: ;` for the missing key (`class/probe.txt`, the lookup reading), and that empty value hides the composable's fallback chain.
- The partial writes one `surfaces` block, no literal color, and no `!important` declaration, and it calls no Bootstrap mixin (`verdict.md:232`).
- The `src/styles/composables/_drag.scss` partial takes no edit, because its `$color` chain reads the `--vn-drag-color` property first (`src/styles/composables/_drag.scss:4`).

### The mixin at the second caller

When a second module passes § Generation criterion and needs a color, the mixin rule at `styles.md:65` moves the loop into `src/styles/_mixins.scss`, and unit V4 carries the move. The mixin takes the attribute proposal's shape, which its run compiled for the sortable, a hypothetical sorter, and a two-family call (`probe/compile.txt`):

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

The following facts govern the move:

- Each caller writes `@include recolor(('--vn-MODULE-color': 'theme-colors-text'))` inside its host rule in its own `surfaces/` partial, and the sortable's partial drops its maps load. Only the `_mixins.scss` file then crosses the face boundary, through the `@use '../bootstrap/maps'` statement the gate's own fixture writes (`tests/conformance.test.ts:775`).
- The themes barrel loads `_mixins.scss` through `themes/_default.scss`, so it loads the maps as well. The maps partial emits no CSS when loaded alone (`tests/conformance.test.ts:674-675`), and the themes proof reads the themes sheet unchanged.
- The V1 generation case runs unchanged across the move, which pins that the move changes no sortable rule.

### Scope

The mechanism covers one axis and one family per property, as the following list states:

- **Keys.** The 8 keys of `$theme-colors` equal the keys of Bootstrap's contextual list-group item classes (`src/core/constants.ts:1488-1499`, leaving out `action` and `base`).
- **The sortable's family.** The `$theme-colors-text` map gives the line the color Bootstrap's contextual items give it (`src/bootstrap/components/_list-group.scss:248`), and its tokens retune under `[data-bs-theme='dark']` (`src/bootstrap/_tokens.scss:155-162`). The scout's run reads that family at 6.10 or more against the body background in every key and mode (`contrast.txt`), and the attribute and class runs read it at 4.55 or more against every `bg-subtle` item background in both modes, lowest for `danger` on the dark `light-bg-subtle` background (`probe/contrast.txt`; `class/contrast.txt`). The base `$theme-colors` family reads 1.96 for `info`, 1.63 for `warning`, and 1.05 for `light` on the light body, and 1.00 for `dark` on the dark body, under the 3:1 that WCAG 2.2 asks of a state graphic; see [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- **Later families.** A module that paints a fill names `theme-colors-bg-subtle`, and one that paints an outline names `theme-colors-border-subtle`, as Bootstrap's `alert-KEY` class does (`src/bootstrap/components/_alert.scss:39-44`). Each family enters with its first reader, under the stage B reader law (`browser-stage-b-verdict.md:1001`).
- **No size or opacity axis.** The `$border-widths` map holds literal `px` lengths (`src/bootstrap/_maps.scss:110-116`), while the doctrine takes sizes from Bootstrap tokens (`verdict.md:237`), and no admitted map holds opacity steps. The `--vn-drag-size` and `--vn-drag-opacity` properties stay host properties you override.

### Precedence

The line color on an item resolves through the following steps, and the first step that applies wins:

1. Under `forced-colors: active`, the line takes `Highlight` (`src/styles/composables/_drag.scss:63-72`).
2. On an `.active` item, the line takes `--bs-list-group-active-color` (`:40-42`), which contrasts with the active fill.
3. An author's declaration of the `--vn-drag-color` property on the item applies next.
4. The host's `--vn-drag-color` property applies next: an author's unlayered or inline declaration first, then the `data-vn-color` rule.
5. The item's `--bs-list-group-active-bg` token applies next: a contextual class's text emphasis (`src/bootstrap/components/_list-group.scss:248` for `primary`), or else the `.list-group` literal `#0d6efd` (`:20`).
6. The `--bs-primary` token applies last.

The order has the following consequences:

- **A host color wins over contextual tints.** A colored host recolors the line over every item that is not active, a contextual item's included, and Bootstrap keeps painting that item's text, fill, and border (`src/bootstrap/components/_list-group.scss:239-250`). The precedence question asks you to confirm this order.
- **The host color alone reaches the tint and the outline.** The over tint and the empty-host outline resolve the chain on the host, where no contextual item class reaches (`brief.md` § Sortable partials), so the attribute is the one markup path to their color.
- **A Bootstrap utility on the host keeps its yield.** A `bg-KEY` or `text-bg-KEY` class on the host wins over the over tint, because Bootstrap writes each utility as an `!important` declaration outside every layer (`guides/veneer.md:1613-1615`).
- **Each host of a transfer group keeps its own color.** Each host resolves its own property, so a cross-host drop paints the target host's color.
- **An item-level color-mode island keeps the host's mode.** An item that carries its own `data-bs-theme` inside a colored host inherits the value the host computed, because a custom property inherits its computed value. The token lane's run reads such a value at 1.05 to 2.53 against the other mode's body background (`token/freeze.txt`). Bootstrap's own component tokens inherit the same way: the `alert-KEY` class declares `--bs-alert-color` on the alert, and a nested island inherits it. The guide records the limit, and a browser case pins it.

The fallback law holds the order: no veneer rule declares a module's color property except its color rules, and the chrome reads the property with its Bootstrap fallback inside `var()`. Two facts require the law. A `composables` declaration on the host would beat every `surfaces` color rule by layer order (`src/styles/_tokens.scss:2`). A host default of the chain would resolve `--bs-list-group-active-bg` on the host and freeze every contextual item's line to `#0d6efd` (`proposal-class.md` § Relation to Bootstrap's contextual variants). The registry pin's site check and the composables-default control hold the law (§ Proofs).

### Generation criterion

A module takes the color attribute only where its chrome paints a color that no Bootstrap class already varies on its host. Where a Bootstrap class varies the token, the chrome reads Bootstrap's token and the module generates nothing (`verdict.md:233`). The following table applies the criterion to each native module on the `landing` branch at `de168b8`:

| Module | Host | Chrome color | Bootstrap class that varies it on the host | Color rules |
| --- | --- | --- | --- | --- |
| Sortable | `[data-vn-drag]` | The line, the over tint, and the empty-host outline | None: `list-group-item-KEY` reaches one item's line, and the tint and the outline resolve on the `.list-group` host | Yes, in V1 |
| Table column sort | `table.table[data-vn-sort]` | None at `de168b8`; a later sort indicator reads the header's color | `table-KEY` sets `--bs-table-color` (`src/bootstrap/components/_tables.scss:75-80`) | None |
| Relative time | `time[data-vn-time]` | None | Not applicable | None |
| Unsaved-changes sentinel | `form[data-vn-sentinel]` | None | Not applicable | None |
| Copy button, fullscreen toggle, and keep-screen-on toggle | A `button[commandfor]` with the `--copy`, `--fullscreen`, or `--wake` command | The trigger's button paint | `btn-KEY`; each showcase trigger carries `btn btn-secondary` | None |

The sortable is the one module at `de168b8` that needs the attribute. A later module or veneer component that passes the criterion, such as a styled drop zone or a class skin in `components/`, calls the mixin inside its host rule in its own `surfaces/` partial and declares its own `--vn-MODULE-*` property in its chrome's `var()` chain. A class skin's host rule compounds the attribute on its class the same way a native host's rule compounds it on the host attribute.

### Placement and layers

The following table places each file the mechanism touches, under the order `reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities` (`src/styles/_tokens.scss:2`):

| File | Layer | Holds |
| --- | --- | --- |
| `src/styles/surfaces/_drag.scss` | `surfaces`, a single time | The color rules, the handle rules, and the grouped-host rule |
| `src/styles/composables/_drag.scss` | `composables`, a single time | Unchanged; the chain reads `--vn-drag-color` first |
| `src/styles/_mixins.scss`, at V4 | None; it emits no CSS | The `recolor` mixin beside `retune`, `reduced-motion`, and `transition`, and the maps load |
| `src/styles/modifiers/_index.scss` | None | Unchanged and empty |

The color rules belong in `surfaces/` because the attribute is markup present before script runs, the job `ROADMAP.md:105` and `verdict.md:234` give that folder. The `modifiers/` folder holds a class that sets a token (`ROADMAP.md:104`), and its registry twin names each modifier class the partial declares (`ROADMAP.md:128`), which an attribute lacks. The fallback law covers the `surfaces` layer's place before `composables`.

### Registries

The registries change as the following list states:

- **The `veneer` token group lands.** The `TOKEN_NAMES` registry gains it in `src/core/constants.ts` under the key law (`ROADMAP.md:46`), frozen and annotated as the `bootstrap` group is, with its leaves in the order the built `./styles` sheet first declares them, as the `bootstrap` group follows its sheet; the `surfaces` barrel loads before the `composables` barrel (`src/styles/index.scss:5-6`). The group reads as the following fence states. The `TOKEN_NAMES` doc block keeps its description paragraph, so guide parity holds, and its `@remarks` tag gains the sentence "The `veneer` group holds every `--vn-*` name the built `./styles` sheet declares on any selector."

  ```ts
  veneer: /* @__PURE__ */ Object.freeze({
  	drag: /* @__PURE__ */ Object.freeze({
  		color: '--vn-drag-color' as const,
  		size: '--vn-drag-size' as const,
  		opacity: '--vn-drag-opacity' as const,
  	}),
  }),
  ```

- **The two-way pin replaces the `it.todo` case.** The case at `tests/src/styles/index.test.ts:85-87` becomes `pins every Veneer token leaf to the built styles sheet both ways`, in the shape of `tests/src/bootstrap/index.test.ts:475-490`: the `collectSheetNames` reading of the built sheet equals the sorted `TOKEN_NAMES.veneer` leaves. A `--bs-*` declaration in the `./styles` sheet fails the same comparison, which guards against a take-over. The case also reads a site check: every declaration of a `--vn-*-color` property sits in the `surfaces` layer under a selector that carries `[data-vn-color=`. Its controls are a planted rule that declares an unregistered `--vn-drag-planted` property, a sheet without its color rules, which reports `--vn-drag-color` missing, and a planted `composables` declaration of `--vn-drag-color` on `[data-vn-drag]`, which fails the site check.
- **The core proof admits the group.** The expectation at `tests/src/core/index.test.ts:64` reads `['bootstrap', 'veneer']`, and the one at `:65` stays `['bootstrap']`.
- **The roadmap's registry line governs.** The registry line at `ROADMAP.md:46` lands the token group "with its first declared token", and the styles line at `:143` holds the pin "until the first global token lands". The chunk opened on 2026-10-08 with declared component tokens, and the pin reads every declaration on any selector, as the `bootstrap` pin does, so line 46 governs and V3 rewrites line 143.
- **The `CLASS_NAMES` registry gains nothing.** The styles chunk still owes a `CLASS_NAMES.veneer` group for the composable's `.active` selector (`src/styles/composables/_drag.scss:40`, `:65`; `browser-stage-b-verdict.md:1029`). That debt predates this judgment and stays with the chunk's class-group unit.
- **No attribute registry.** Core holds token and class names alone (`ROADMAP.md:46`), and no TypeScript reads the attribute, so its pins are the generation case and the browser cases, as a state attribute's pins are (`styles.md:109`).

### Showcase specimen

Unit V2 adds one figure to `app/browser/sections/sortable-list.html`, after the Parcel board figure of the `landing` branch, which holds the Packing queue and Loading dock lists. Its host carries `data-vn-color="success"` and holds one `list-group-item-warning` row, so the page shows the color and its precedence, as the following fence states:

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

The specimen meets the section laws as the following list states:

- **The census passes unchanged.** Every class sits in `CLASS_NAMES.bootstrap`, the census reads classes alone (`tests/app/browser/sections/integration.test.ts:62`), the figure carries no `style` attribute (`:63`), and it takes `card flex-fill mb-0` inside a `col d-flex` column (`:64-70`).
- **Every name is distinct.** The list and button names differ from those of the Dispatch priorities, Packing queue, and Loading dock lists, so the journeys' exact-name lookups stay unambiguous.
- **The page shows one key.** The `src:styles` matrix proves every key in both modes, and a native section owns no registry row, so the page needs no figure per key.

### Proofs

Every expectation comes from a source other than the partial: keys and values from `tests/fixtures/bootstrap/maps.json`, cells from `CLASS_NAMES.bootstrap`, and colors from the computed Bootstrap tokens.

#### Node proofs

The `conformance` project gains a `styles color attribute` block beside the `bootstrap maps` block in `tests/conformance.test.ts`, compiling through `compileEntry` (`tests/setupServer.ts:407-409`). The following table lists its cases:

| Case | Reading | Planted control |
| --- | --- | --- |
| `generates one sortable color rule per theme-color key from the text-emphasis map` | Compiles `src/styles/surfaces/drag`; the `[data-vn-drag][data-vn-color=KEY]` selectors and their values equal the fixture's `theme-colors` keys and `theme-colors-text` values in order, inside the one `surfaces` block | None; the following cases hold the controls |
| `generates exactly a planted key set through @use with, where a hand-listed control emits every key` | A `@use 'src/bootstrap/maps' with (…)` statement configures planted `$theme-colors` and `$theme-colors-text` maps before the partial loads, and exactly the planted keys generate | A scratch partial whose `@each` reads a hand-written key list emits all 8 keys under the same configuration (`judge/compile.txt`, the planted and listed readings) |
| `refuses a family map that lacks a theme-color key` | A `$theme-colors-text` map configured without one key throws the partial's message | The gap configuration (`judge/compile.txt`, the gap reading) |

The load-path form of the configuration reaches the partial's relative load, because Sass resolves both specifiers to one module (`token/probe.txt`, the subset reading). The `admits only the Bootstrap maps module from styles and reports every other crossing` case runs unchanged, and its pass over the real tree reads a real styles load for the first time.

#### Browser proofs

The `src:styles` project gains the following cases in `tests/src/styles/surfaces/drag.test.ts`, under Chromium 141 and 153 with the built `./bootstrap` and `./styles` sheets adopted:

- **`recolors the line, the over tint, and the empty outline for every theme color on every list-group variant`.** The cells come from the `buildDragCells` instrument (`tests/setupStyles.ts:548-600`), and the keys come from the fixture's `theme-colors` keys, which the case asserts equal to the keys of `CLASS_NAMES.bootstrap.components.list.group.item` other than `action` and `base`. Each cell renders a single time, and the case sets and removes `data-vn-color` for each key inside the visit, so the key count adds no viewport change. Per cell, key, and edge, the `::after` color on the named edge matches `readToken(host, '--bs-KEY-text-emphasis')`, or the item's `--bs-list-group-active-color` on the `.active` cell. The light and dark readings of each key differ. With `data-vn-over` set, the host's background matches `color-mix(in oklab, COLOR 15%, transparent)` and an empty host's outline matches COLOR, where COLOR is the key's resolved token. Under emulated `forced-colors: active`, the line and the outline take `Highlight`.
- **`holds 3:1 between every color line and its item background in both modes`.** The `measureContrast` reading between the line color and the item background, composited over the body background with `blendColor`, reaches 3 on every cell that is not active.
- **`keeps an unlisted value, a grouped neighbor, a background utility, and a color-mode island on their documented colors`.** A `data-vn-color="harbor"` host keeps the default chain. In two hosts of one group with one colored, each line takes its own host's color. A `bg-KEY` class from `CLASS_NAMES.bootstrap.utilities` on a colored host keeps its background under `data-vn-over`. An item with its own `data-bs-theme` of the other mode takes the host mode's token value, as the guide states.

The following controls each edit the built sheet text and expect a reading to redden:

- **`misses the emphasis color and the contrast floor when a control reads the base theme colors`.** The control rewrites each `-text-emphasis)` of the color rules to `)`. Every color reading mismatches, and the scout's run predicts contrast under 3 for `info`, `warning`, and `light` in light mode and for `dark` in dark mode.
- **`loses every theme color when a control declares a composables default`.** The control adds `--vn-drag-color: var(--bs-list-group-active-bg);` to the composables host rule. Every color reading mismatches, which pins the layer order and the fallback law.

The surfaces placement case (`tests/src/styles/surfaces/drag.test.ts:19-40`) runs unchanged and reads the partial in one `surfaces` block beside its planted `bootstrap` control. The cases read through the existing instruments: `buildDragCells`, `visitDragCells`, and `adoptSheet` from `tests/setupStyles.ts`, and `readToken`, `readStyle`, `matchesColor`, `measureContrast`, `blendColor`, `stageMedia`, and `releaseMedia` from `@orkestrel/test/browser`. A cell instrument the matrix needs goes in `tests/setupStyles.ts` with its proof in `tests/setupStyles.test.ts` (`styles.md:94`).

#### Distribution and journey proofs

The following cases close the proof set:

- **`compiles the styles Sass export from a packed consumer [requires the registry]`.** The case joins `tests/distribution.test.ts` beside the `packed Bootstrap Sass` block (`:842`), compiles the packed `./styles/scss` entry, and reads one color rule per fixture key. The styles Sass makes its first cross-face load, and no proof compiles that entry from an install (`tests/distribution.test.ts:846`, `:868`).
- **`paints the returns queue's insertion line in its color attribute`.** The case joins `tests/app/browser/integration.test.ts`. It drags the Inspect kettle grip across the warning row with `userEvent.dragAndDrop`. On each `data-vn-insert` write, it reads the `::after` border color on the named edge against `readToken(queue, '--bs-success-text-emphasis')`, on the warning row as well, reads the host's over tint against the 15% mix, and reads no class change. The light and dark journey projects read each mode.

### Sealed-face check

Each unit leaves the Bootstrap face byte-equal, and its gate runs the following checks:

- `git -C /home/user/veneer diff --exit-code BASE -- src/bootstrap tests/fixtures/bootstrap tests/src/bootstrap` exits 0, where BASE is the unit's base commit.
- `npm run test:conformance` passes, with the official digest, the Sass pass digest against `tests/fixtures/bootstrap/pass.json`, link 1, link 2, the maps cases (`tests/conformance.test.ts:673-767`), and the gate case (`:769-846`).
- `npm run test:src:bootstrap` passes, with link 3 and both Bootstrap registry pins.
- The SHA-256 digest of `dist/src/bootstrap/index.css` after the `npm run build:src:bootstrap` command equals the digest before the unit, and the unit report records both.
- The `keeps every pair of built sheets disjoint in each shared layer` case passes (`tests/integration.test.ts:292-320`).

## Grafts

The selected mechanism takes the attribute proposal's keying, naming, placement, lookup, mixin shape, specimen, and token registry, and adds the following ideas from the other proposals and from the brief:

| Idea | Source | Where it lands |
| --- | --- | --- |
| An inline `@each` until a second caller, then the mixin | `proposal-class.md` § Second module and the mixin; `brief.md` § Generation | § The sortable's color rules; unit V4 |
| The generation criterion and its module table | `proposal-class.md` § Generation criterion | § Generation criterion |
| The second reason for the fallback law: a host default freezes contextual tints | `proposal-class.md` § Relation to Bootstrap's contextual variants | § Precedence |
| The probe that shows the empty declaration a family gap emits | `class/probe.txt`, the lookup reading | The `@error` line and its comment |
| The contrast-floor case over the composited item background | `proposal-class.md` § Modifier partial proof | § Browser proofs |
| The packed `./styles/scss` compile case | `proposal-class.md` § Risks; `proposal-token.md` unit V5 | § Distribution and journey proofs |
| The hand-listed control under a planted configuration | `proposal-token.md` § Proof matrix | § Node proofs |
| The take-over guard: the token pin refuses a `--bs-*` declaration in `./styles` | `proposal-token.md` § Economy against a competing token layer | § Registries |
| The mode-freeze finding, ruled as a pinned item-level limit | `token/freeze.txt` | § Precedence; § Browser proofs |
| Each family enters with its first reader | `proposal-token.md` § Rejected alternatives | § Scope |

## Rejected options

The following table rules on every option the brief and the proposals raise that the selected mechanism does not take:

| Option | Ruling and reason |
| --- | --- |
| A class per module, such as `drag-success` | Refused. It breaks the bare modifier row (`styles.md:104`), needs a scaffold amendment, and grows the public API by a class family per module. The keying question offers it to you. |
| A bare key class under each host, such as `[data-vn-drag].success` | Refused. The `dark` and `light` classes read as color-mode words beside `data-bs-theme`, a consumer stylesheet's own `success` or `primary` class collides unmeasured, and two key classes on one host resolve by source order with no refusal. |
| A prefixed generic class, such as `vn-success` | Refused. It breaks the bare modifier row as the compound form does and names the project rather than the axis. |
| The accent token family, `accent-KEY` with `@scope` | Refused. Its token is neither component-scoped nor a root token (`verdict.md:237`), it needs R-1 and R-2, its class instruments read no `@scope` prelude, and its subtree reach retints modules the author did not mark. Its freeze finding and take-over guard are grafted. |
| The color rules in `modifiers/` | Refused. The folder holds a class that sets a token (`ROADMAP.md:104`), its twin names each class (`ROADMAP.md:128`), and an attribute API is a `surfaces/` job (`ROADMAP.md:105`). The fallback law covers the layer order. |
| The `recolor` mixin with one caller | Deferred to unit V4, because `styles.md:69` refuses a mixin for one caller. |
| The base `$theme-colors` family for the line | Refused. Four keys fall under 3:1 (`contrast.txt`). The color-family question asks you to confirm the emphasis family. |
| The subtle families in the first landing | Deferred. No reader exists, and each family enters with its first reader. |
| Size and opacity variants | Refused. The width map holds literal `px` lengths, and no admitted map holds opacity steps. |
| A yield selector that keeps a contextual item's own line inside a colored host | Refused on the recommended path of the precedence question, because it selects every `list-group-item-KEY` class from a veneer rule. |
| A veneer declaration of `--bs-list-group-active-bg` on the host | Refused. Bootstrap reads that token for the `.active` item's background (`src/bootstrap/components/_list-group.scss:59-64`), and stage B decision D-6 refuses take-overs (`browser-stage-b-verdict.md:1055`). |
| Re-resolving the property at an item's own `data-bs-theme` root | Refused until a consumer shows an item-level mode island (`AGENTS.md:65`). The re-declaration would also beat an author's host declaration on that item. The guide records the limit, and a case pins it. |
| A showcase figure per key | Refused. A native section owns no registry row, the census reads classes alone, and the matrix proves every key, so 8 live hosts add markup and no proof. |

## Units

The units run in order on the `landing` branch at or after `de168b8`, or on `main` after the landing chain merges. Each unit owns its files alone, and no unit commits; the Orchestrator lands each one. Unit V2 waits for the M1 mobile repair (`/home/user/.wave/veneer-mobile1`), because the user reported on 2026-10-08 that the sortable no longer drags and its buttons do nothing, and the V2 journey case drives a sortable. Unit V3 waits for M1 as well, because M1 edits `guides/veneer.md`.

### V1: color rules, token registry, and proofs

Engine: astra. Dispatch id: `variants-1`. The unit is mechanical: the selectors, the values, the registry names, and every case name are fixed in § Selected mechanism.

The unit owns the following files:

- `/home/user/veneer/src/styles/surfaces/_drag.scss`
- `/home/user/veneer/src/core/constants.ts` (the `TOKEN_NAMES.veneer` group and the `@remarks` sentence alone)
- `/home/user/veneer/tests/conformance.test.ts` (the `styles color attribute` block alone)
- `/home/user/veneer/tests/src/styles/surfaces/drag.test.ts`
- `/home/user/veneer/tests/src/styles/index.test.ts`
- `/home/user/veneer/tests/src/core/index.test.ts`
- `/home/user/veneer/tests/distribution.test.ts` (the packed styles case alone)
- `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`, only for a cell instrument the matrix needs

The contract covers § The sortable's color rules, the fallback law in § Precedence, § Registries, § Node proofs, § Browser proofs, and the distribution case. The unit leaves `src/styles/composables/_drag.scss` and every file under `src/bootstrap` unedited. The unit runs the following gates:

- `npm run check`, `npm run lint:check`, `npm run format:check`, and `npm run test:policy`
- `npm run test:conformance`, `npm run test:src:core`, and `npm run test:src:bootstrap`
- `npm run test:src:styles` under Chromium 141 and 153
- `npm run test:integration` and `npm run test:distribution`
- the sealed-face check

### V2: specimen and journey

Engine: astra. Dispatch id: `variants-2`. The unit starts after V1 and M1 land, and the markup and the caption are fixed in § Showcase specimen.

The unit owns the following files:

- `/home/user/veneer/app/browser/sections/sortable-list.html` (the Returns queue figure alone)
- `/home/user/veneer/tests/app/browser/integration.test.ts` (the `paints the returns queue's insertion line in its color attribute` case alone)
- `/home/user/veneer/showcase/browser.html` (rebuilt, never edited by hand)

The unit runs `npm run build`, `npm run test:app:browser`, `npm run test:journey`, `npm run build:showcase`, `npm run lint:check`, `npm run format:check`, `npm run test:policy`, and the sealed-face check.

### V3: guide and roadmap

Engine: opus, because guide voice decides the unit. Dispatch id: `variants-3`. The unit starts after V1, V2, and M1 land.

The unit owns the following files:

- `/home/user/veneer/guides/veneer.md`
- `/home/user/veneer/ROADMAP.md`

The unit makes the following guide edits:

- **§ Sortable list.** The rule table gains the `[data-vn-drag][data-vn-color='KEY']` row in the `surfaces` layer. The property table gains `--vn-drag-color`, with "None; the line reads the chain" as its default. The sentence "The sheet declares no `--vn-drag-color` property" becomes the attribute sentence. The resolution order of § Precedence lands as a numbered list, with the limits: one color per host, an unlisted value, an item-level mode island, the `light` and `dark` keys drawing one line color in light mode (`#495057`, `src/bootstrap/_tokens.scss:66-67`), and `primary` drawing a darker line than the uncolored default. The proof paragraph names the cases.
- **§ Styles sheet.** The partial table's `surfaces/_drag.scss` row names the color rules. The sentence that says each partial "loads nothing from `src/bootstrap`" names the maps load of `surfaces/_drag.scss`. The override table gains the row for an author `--vn-drag-color` declaration on the host or an item.
- **§ Core entry.** The registry paragraph names the `veneer` token group and its pin.
- **§ Showcase.** The showcase table row for the native sortable list names the Returns queue.

The unit makes the following roadmap edits:

- The maps sentence (`ROADMAP.md:114`) names `src/styles/surfaces/_drag.scss` as the loader.
- The `surfaces/` folder row (`:105`) names the color attribute as an attribute API.
- The styles line (`:143`) records the color attribute, the `--vn-drag-color` declaration, and the `veneer` token group with its pin, and drops "until the first global token lands".

The unit runs `npm run test:guides`, `npm run test:policy`, and `npm run format:check`.

### V4: the `recolor` mixin, deferred

Engine: astra for the move and its proofs; opus for the `_mixins.scss` entry of `ROADMAP.md` and the guide's mixin sentence. Dispatch id: `variants-4`. The unit opens with the unit that builds the second module to pass § Generation criterion, and that unit carries it.

The unit owns the following files:

- `/home/user/veneer/src/styles/_mixins.scss`
- `/home/user/veneer/src/styles/surfaces/_drag.scss`
- the second module's `surfaces/` partial and its mirrored proof
- `/home/user/veneer/tests/conformance.test.ts` (the `styles color attribute` block alone)

The contract covers § The mixin at the second caller. The proofs add `loads the styles mixins alone without emitting CSS` and `refuses a recolor call outside a host rule`, the second module's generation case, and the V1 generation case unchanged. The unit runs the V1 gates.

## Questions for the user

The following questions need your ruling, each with one recommendation. The units run on the recommended paths unless you rule otherwise.

- **Keying.** Veneer variants use one attribute on the module host, `data-vn-color="success"`, rather than a Bootstrap-style class such as `drag-success`. The class reads like Bootstrap's `list-group-item-success`, but it needs your amendment of the bare modifier-class row in the scaffold styles rule (`styles.md:104`), which every scaffold target reads, and it adds a class family for each module. The attribute joins the `data-vn-*` attributes the native hosts already carry (`data-vn-drag`, `data-vn-sort`, `data-vn-sentinel`, and `data-vn-time`), works the same on every later module, and holds one color per host. Do you accept the attribute? I recommend yes.
- **Color family.** Every variant line uses Bootstrap's text-emphasis color for its key, the color Bootstrap's own contextual list-group items give the line, not the brighter button color. In light mode, `success` draws `#0a3622` rather than the `#198754` of `btn-success`, and `primary` draws `#052c65`, darker than the uncolored list's `#0d6efd`; in dark mode they draw `#75b798` and `#6ea8fe` (`src/bootstrap/_tokens.scss:60-67`, `:155-162`). The brighter family falls under the 3:1 contrast WCAG 2.2 asks of a state graphic for `info`, `warning`, and `light` on the light page and for `dark` on the dark page (`contrast.txt`). Do you accept the emphasis family? I recommend yes.
- **Precedence.** A colored host recolors the insertion line over every item, including an item that carries its own Bootstrap color such as `list-group-item-warning`, while Bootstrap keeps painting that item's text, fill, and border. The alternative keeps each contextual item's own line inside a colored host, at the cost of a veneer rule that selects every `list-group-item-KEY` class. Do you accept that the host color wins? I recommend yes.

## Records the Orchestrator owns

The following records sit outside every unit:

- **The D2.3 tension.** Record in the drag verdict (`verdict.md:121`) that this judgment rules the theme-color modifier as the `data-vn-color` attribute, not a `drag-KEY` class.
- **The doctrine's stale citations.** Refresh the citations `brief.md` § Stale citations in the doctrine lists.
- **The scout script defect.** The scout reports, in its return message of 2026-10-08, that with `--tree` a `--census` flag whose first term begins with `--` writes a tree-only map with no refusal, while the same call alone exits 64. The scaffold documentation rule asks for exit 64 on every usage refusal (`/home/user/scaffold/.claude/rules/documentation.md` § Workflow skills). Route it to a scaffold unit on the `orkestrel-scout` skill's `map.ts` script, with a proof case for the combination.
- **The class group debt.** The `CLASS_NAMES.veneer` group for the `.active` selector stays with the styles chunk's class-group unit.

## Evidence

The following runs back every number and sample in this judgment, each under `/home/user/veneer/tmp/units/variants-2026-10-08/`:

- **`judge/compile.ts` with `judge/compile.txt`.** The judge ran `node tmp/units/variants-2026-10-08/judge/compile.ts` from `/home/user/veneer` on 2026-10-08, and it exited 0 under Sass 1.105.1. The script compares its maps copy with `src/bootstrap/_maps.scss` byte for byte and exits 1 on a difference. It compiles the selected partial with the handle and grouped-host rules of `de168b8`, a planted two-key set, a hand-listed control under that set, and a family map with a gap.
- **`probe/compile.ts` with `probe/compile.txt`, and `probe/contrast.ts` with `probe/contrast.txt`.** The attribute lane's runs of 2026-10-08: the mixin form, the sorter call, the two-family call, the refusals, and the item-background contrast.
- **`class/probe.ts`, `class/mixin/probe.ts`, and `class/contrast.ts`, each with its `.txt` output.** The class lane's runs of 2026-10-08, among them the lookup reading that emits an empty declaration.
- **`token/probe.mjs` with `token/probe.txt`, and `token/freeze.mjs` with `token/freeze.txt`.** The token lane's runs of 2026-10-08, among them the load-path configuration and the cross-mode freeze ratios.
- **`contrast.mjs` with `contrast.txt`.** The scout's body-background contrast run of 2026-10-08.
