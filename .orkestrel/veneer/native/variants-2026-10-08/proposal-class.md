# Proposal: per-module variant classes

The sortable takes one variant class per theme color, `drag-KEY`, where KEY is a key of Bootstrap's
`$theme-colors` map. One `@each` loop in an added `src/styles/modifiers/_drag.scss` partial writes
every class. Each class sits on the `[data-vn-drag]` host and sets the `--vn-drag-color` property
alone, to the matching `--bs-KEY-text-emphasis` token, and the composable partial already reads that
property first in its color chain. The class follows Bootstrap's own shape (`list-group-item-success`,
`btn-success`), the partial sits in the folder `ROADMAP.md:104` defines for a class that sets a token,
and its layer follows `composables`. When a second styled module needs variants, the loop moves into
one `vary` mixin in `src/styles/_mixins.scss`, and that module writes `MODULE-KEY` classes the same
way, where MODULE is the module's one-word name. The shape breaks the bare modifier row of the scaffold
styles rule (`/home/user/scaffold/.claude/rules/styles.md:104`). The first unit therefore amends that
row, and it needs your ruling because the rule binds every repository that reads scaffold.

This proposal answers the variant item of the user's request of 2026-10-08: "I would like to allow
applying variants to drag and drop elements and other elements and components that we come up with
that need styling." The clipboard, column-sort, and sortable-regression reports belong to other units.

Every fact comes from `/home/user/veneer` at `9f56e6a` (`origin/main`), from the `landing` branch at
`2540baf` where a line names it, from the scout's `brief.md` in this folder, and from the doctrine in
`native/drag-2026-10-08/verdict.md` § Sass doctrine for the styles layer (`:226-239`). The following
Node runs of 2026-10-08 back every generated sample and every contrast figure; each script sits in
`/home/user/veneer/tmp/units/variants-2026-10-08/class/` beside its output:

- `node tmp/units/variants-2026-10-08/class/probe.ts`, output `class/probe.txt`, compiles the
  proposed partial, a planted configuration, and the rejected lookup form through the Sass 1.105.1
  CLI against a byte-equal copy of `src/bootstrap/_maps.scss`.
- `node tmp/units/variants-2026-10-08/class/mixin/probe.ts`, output `class/mixin/probe.txt`, compiles
  the two-caller mixin form. Its sortable block equals the inline partial's output under `diff`.
- `node tmp/units/variants-2026-10-08/class/contrast.ts`, output `class/contrast.txt`, reads the
  token literals at `src/bootstrap/_tokens.scss:60-75`, `:95`, `:143`, and `:155-170`.

No browser ran, no source file changed, and nothing was committed.

## Mechanism

### Partial

The `src/styles/modifiers/_drag.scss` partial holds the following Sass, which the probe compiles:

```scss
@use '../../bootstrap/maps';

// Bootstrap's contextual list-group items give the line this family, which holds 3:1 in both modes.
@layer modifiers {
	@each $key, $value in maps.$theme-colors-text {
		[data-vn-drag].drag-#{$key} {
			--vn-drag-color: #{$value};
		}
	}
}
```

The following facts govern the partial:

- The loop reads the `maps.$theme-colors-text` map. Its keys equal the `$theme-colors` keys in
  upstream order, because the `pins the ordered keys and resolved values of $%s` case reads both maps
  against `tests/fixtures/bootstrap/maps.json` (`tests/conformance.test.ts:686-708`). Each class
  therefore names a `$theme-colors` key, and each value is a pinned `var(--bs-KEY-text-emphasis)`
  reference. Bootstrap's `.list-group-item-KEY` class pairs the same key with the same token for its
  line (`src/bootstrap/components/_list-group.scss:248`).
- The `@use '../../bootstrap/maps'` statement is the one cross-face load the `styles face boundaries`
  case admits. The case resolves a relative target against the loading file's folder
  (`tests/conformance.test.ts:790-795`), so the statement resolves to `src/bootstrap/maps`.
- The partial loads no mixin, writes one `@layer modifiers` block, writes no literal color, and calls
  no Bootstrap emitter, as `verdict.md:232` and `styles.md:51` require.
- The partial changes nothing in `composables/_drag.scss`. The chain at `composables/_drag.scss:4`
  already reads `--vn-drag-color` first.

The rejected form loops over `map.keys(maps.$theme-colors)` and reads each value with
`map.get(maps.$theme-colors-text, $key)`. The probe's `fixtures/lookup.scss` file configures
`$theme-colors` with a `brand` key that the text map lacks, and the compile emits
`--vn-drag-color: ;` for it. That empty declaration replaces the fallback chain on the host instead of
failing the compile. The single-map loop cannot emit an empty value.

### Generated output

The probe compiles the partial to the following CSS (`class/probe.txt`, first block):

```css
@layer modifiers {
  [data-vn-drag].drag-primary {
    --vn-drag-color: var(--bs-primary-text-emphasis);
  }
  [data-vn-drag].drag-secondary {
    --vn-drag-color: var(--bs-secondary-text-emphasis);
  }
  [data-vn-drag].drag-success {
    --vn-drag-color: var(--bs-success-text-emphasis);
  }
  [data-vn-drag].drag-info {
    --vn-drag-color: var(--bs-info-text-emphasis);
  }
  [data-vn-drag].drag-warning {
    --vn-drag-color: var(--bs-warning-text-emphasis);
  }
  [data-vn-drag].drag-danger {
    --vn-drag-color: var(--bs-danger-text-emphasis);
  }
  [data-vn-drag].drag-light {
    --vn-drag-color: var(--bs-light-text-emphasis);
  }
  [data-vn-drag].drag-dark {
    --vn-drag-color: var(--bs-dark-text-emphasis);
  }
}
```

A fixture that configures the maps module before it loads the partial generates exactly its planted
keys, because Sass loads one module instance per canonical URL, and the fixture's load and the
partial's relative load resolve to one file. The probe's `fixtures/planted.scss` file reads as follows:

```scss
@use '../src/bootstrap/maps' with (
	$theme-colors-text: (
		'success': var(--bs-success-text-emphasis),
		'planted': var(--bs-planted-text-emphasis),
	)
);
@use '../src/styles/modifiers/drag';
```

It compiles to the `drag-success` and `drag-planted` rules alone (`class/probe.txt`, second block).
That output separates a loop from a hand-listed set, whose compiled output for the unconfigured map is
identical.

### Generation criterion

A module takes a variant partial only where its chrome reads a color that no Bootstrap class varies on
the module's host. Where a Bootstrap class already varies the token, the chrome reads Bootstrap's token
and the module generates nothing, as `verdict.md:233` requires. The following table applies the
criterion to each native module at `9f56e6a`:

| Module                         | Host chrome color                                                         | Bootstrap class that varies it on the host                                                                                                                                                                   | Variant partial        |
| ------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| Sortable (`drags`)             | `--vn-drag-color`, then `--bs-list-group-active-bg`                       | None. The `.list-group-item-KEY` class retints an item's line, but the over tint and the empty-host outline resolve on the `.list-group` host, where the token is the literal `#0d6efd` (`_list-group.scss:20`) | `modifiers/_drag.scss` |
| Table column sort (`sorters`)  | A later sort indicator reads `--bs-table-color`                           | `.table-KEY` sets `--bs-table-color` on the table (`src/bootstrap/components/_tables.scss:75-87`)                                                                                                            | None                   |
| Copy button, fullscreen toggle | None; the showcase trigger is a `.btn.btn-secondary` (`app/browser/sections/clipboard-copy.html`, `fullscreen-toggle.html`) | `.btn-KEY`                                                                                                                                                                                                   | None                   |
| Relative time, sentinel        | No color chrome                                                           | Not applicable                                                                                                                                                                                               | None                   |
| A later focus-ring fence       | `--bs-focus-ring-color`                                                   | `.focus-ring-KEY` (`src/bootstrap/_utilities.scss:106-107`)                                                                                                                                                  | None                   |

The sortable is the one module at `9f56e6a` that needs the mechanism. The D2.3 design omitted the
class because no consumer existed and the contextual tokens varied the line (`verdict.md:121`). The
user's request of 2026-10-08 is the consumer, and the contextual tokens never reach the host chrome.

### Second module and the mixin

When a second styled module needs variants, `styles.md:65` moves the loop into `_mixins.scss`, and
`styles.md:69` keeps it inline in `modifiers/_drag.scss` until then. The probe's `class/mixin/` tree
compiles the two-caller form for the sortable and for an upload zone, a fictional module with the
`[data-vn-upload]` host and the `--vn-upload-color` property that no catalog row names. The mixin and
its two callers read as follows:

```scss
// src/styles/_mixins.scss, after the existing mixins
@use '../bootstrap/maps';

// A module takes a variant class only where no Bootstrap class already varies its color token on the host.
@mixin vary($host, $name) {
	@each $key, $value in maps.$theme-colors-text {
		#{$host}.#{$name}-#{$key} {
			--vn-#{$name}-color: #{$value};
		}
	}
}

// src/styles/modifiers/_drag.scss
@use '../mixins' as *;

@layer modifiers {
	@include vary('[data-vn-drag]', 'drag');
}

// src/styles/modifiers/_upload.scss
@use '../mixins' as *;

@layer modifiers {
	@include vary('[data-vn-upload]', 'upload');
}
```

In the real `_mixins.scss` file the `@use` statement opens the file, because Sass refuses a `@use`
after another rule. The `@use '../bootstrap/maps'` statement from `src/styles/_mixins.scss` is the
exact statement the gate's scratch fixture admits (`tests/conformance.test.ts:770-776`). The upload
zone's block compiles as follows (`class/mixin/probe.txt`, second block):

```css
@layer modifiers {
  [data-vn-upload].upload-primary {
    --vn-upload-color: var(--bs-primary-text-emphasis);
  }
  [data-vn-upload].upload-secondary {
    --vn-upload-color: var(--bs-secondary-text-emphasis);
  }
  /* The success, info, warning, danger, light, and dark rules follow in map order. */
}
```

The mixin takes the host selector as an argument, because the native hosts differ in shape:
`[data-vn-drag]`, `table.table[data-vn-sort]` (`src/browser/sorters/plugins.ts:27`), and
`button[command="--copy"][commandfor]` (`src/browser/copiers/plugins.ts:24`).

## Naming

The following table gives every name the mechanism adds and the rule each one meets:

| Name                  | Form                                                                                                                  | Rule                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Partial               | `src/styles/modifiers/_drag.scss`                                                                                     | One same-named partial per folder for one component (`verdict.md:234`); the mirror proof is `tests/src/styles/modifiers/drag.test.ts` (`tests/setupPolicy.ts:252-279`) |
| Variant class         | `drag-primary`, `drag-secondary`, `drag-success`, `drag-info`, `drag-warning`, `drag-danger`, `drag-light`, `drag-dark` | The amended naming row in unit U0                                                                                                                          |
| Custom property       | `--vn-drag-color`                                                                                                     | `--{scope}-{property}` (`styles.md:103`); the chain already reads the name (`composables/_drag.scss:4`; `guides/veneer.md:1604-1605`)                      |
| Token registry leaf   | `TOKEN_NAMES.veneer.drag.color`                                                                                       | The key law (`ROADMAP.md:46`)                                                                                                                              |
| Class registry leaves | `CLASS_NAMES.veneer.modifiers.drag.KEY`                                                                               | The category law files a token-only class that no declared root prefixes as a modifier (`ROADMAP.md:46`; `src/core/constants.ts:1056`)                     |
| Sass variables        | `$key`, `$value`                                                                                                      | Lowercase kebab-case (`styles.md:102`)                                                                                                                     |
| Mixin, second caller  | `vary($host, $name)`                                                                                                  | A verb (`styles.md:101`), beside the `retune` mixin                                                                                                        |
| Fixture               | `tests/fixtures/styles/planted.scss`                                                                                  | One word, beside the `pack.scss` and `early.scss` fixtures                                                                                                 |

No `CLASS_NAMES.bootstrap` leaf carries the segment `drag`: a search of `src/core/constants.ts` for
the patterns `'drag` and `drag-` returns 0 hits (run 2026-10-08). The stage B verdict requires each
veneer-owned class to avoid every `CLASS_NAMES.bootstrap` name (`browser-stage-b-verdict.md:1030`).
The names rule and the single-word law govern TypeScript entity members, not class names
(`/home/user/scaffold/.claude/rules/names.md:1-4`, `:25-31`), and every registry key the mechanism
adds is one word.

### Amendment to the styles naming table

The modifier row reads "bare adjective/noun: `.surface`, `.muted`, `.accent`" (`styles.md:104`), and
the `drag-success` class is not bare. Unit U0 adds the following row after the modifier row:

```text
| Variant class   | component name, hyphen, key from the shared list: `.drag-success`   |
```

Unit U0 also adds the following directive after the state-class sentence at `styles.md:107`:

```text
Write a modifier class that sets one component's token for one key of a shared list as a variant
class, and keep the bare modifier form for a class that any component reads.
```

Veneer's own registry law already draws the same line. The guide states that "a modifier specific to a
component is a variant and stays with the component", so `btn-primary` files beneath `btn` while
`bg-primary` stays general (`guides/veneer.md:679`). The row brings the scaffold rule into line with
that law for the styles layer.

### Rulings on the other keyings

The brief lists three keyings (`brief.md` § Keying), the second in a bare and a prefixed form. This
proposal rules on the other two keyings, each form apart, and on one shape the brief does not list:

- **Refuse the bare class under each host, such as `[data-vn-drag].success`.** It meets the
  modifier row as written, which is the brief's reason to prefer it. Under the registry law, the bare
  `success` leaf sits at `CLASS_NAMES.veneer.modifiers.success`, which reads as a modifier general to
  any component (`guides/veneer.md:679`), yet it sets a different token under each host that declares
  it. With a second styled module, one class name carries two meanings in two partials, against "One
  concept, one term" (`/home/user/scaffold/AGENTS.md:54`). Bootstrap writes no bare theme-key class,
  so `class="btn success"` reads as a success button and changes nothing. A bare theme key is also a
  class name a consumer stylesheet can carry, and the brief records that collision as unmeasured. The
  compound form pays the modifier-row cost a single time, through U0, for every module.
- **Refuse the prefixed class, such as `.vn-success`.** It breaks the modifier row as the compound
  form does and still names no component.
- **Refuse an attribute, such as `data-vn-variant`.** The folder law files an authored attribute API
  in `surfaces/` (`ROADMAP.md:105`), whose layer loses to any `composables` declaration of the same
  property. Core keeps no attribute registry (`ROADMAP.md:46`). The word "variant" in markup collides
  with the journey variants (`guides/veneer.md:2402-2414`).
- **Refuse a class that writes Bootstrap's `--bs-list-group-active-bg` token on the host.** That token
  also paints the `.active` item's background (`_list-group.scss:59-64`), and stage B decision D-6
  recommends refusing take-overs of Bootstrap classes (`browser-stage-b-verdict.md:1055`).

## Folder placement and layers

The sortable spreads across three partials by job, and the following table gives each one's folder and
layer:

| Partial                                     | Folder         | Layer                            | Job                                                                         |
| ------------------------------------------- | -------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `surfaces/_drag.scss`                       | `surfaces/`    | `surfaces`                       | Handle cursor, touch action, and selection; unchanged                       |
| `composables/_drag.scss`                    | `composables/` | `composables`                    | Dim, insertion line, over tint, and empty-host outline; unchanged           |
| `modifiers/_drag.scss`                      | `modifiers/`   | `modifiers`                      | One class per theme color that sets `--vn-drag-color`; added                |
| `_mixins.scss`, with a second caller only   | Kind file      | None; it emits no top-level CSS  | The `vary` mixin                                                            |

The `drag-KEY` class fits the `modifiers/` definition, "a class that sets a token other rules read. If
it sets the property itself, it is a utility" (`ROADMAP.md:104`). Each rule declares the
`--vn-drag-color` property alone and no other property, and the composable partial reads that property
at `composables/_drag.scss:4`. The proof pins the fit: every style rule whose selector carries a
`drag-KEY` class declares custom properties alone, and a planted `color` declaration reddens the
reading. The `modifiers/` barrel gains `@use 'drag';`, and the sheet's barrel already loads
`modifiers` after `composables` (`src/styles/index.scss:6-7`).

The order statement reads `reset, bootstrap, theme, elements, components, surfaces, composables,
modifiers, utilities` (`src/styles/_tokens.scss:2`), and the partial's layer has the following
consequences:

- A `theme`-layer or `composables`-layer declaration of `--vn-drag-color` on the host loses to the
  class, so a theme pack whose root is a sortable host cannot cancel a variant. A `surfaces`
  placement would lose to a `composables` declaration.
- A `utilities`-layer declaration of the property on the host wins over the class, as a
  single-property class wins over state chrome (`guides/veneer.md:2062`).
- An unlayered declaration of the property on the host or on an item wins over the class, as every
  unlayered rule wins over the sheet (`guides/veneer.md:1971-1977`).

## Relation to Bootstrap's contextual variants

The class beats no Bootstrap declaration, because Bootstrap declares no `--vn-*` name, and it adds
neither `!important` nor a specificity contest with Bootstrap, which meets the layer-order rule
(`verdict.md:236`). The `[data-vn-drag]` scope in the selector is the host-selector rule for
component-scoped properties (`verdict.md:237`; `styles.md:49`). The class reaches the line through the
chain order instead: the `--vn-drag-color` property leads
`var(--vn-drag-color, var(--bs-list-group-active-bg, var(--bs-primary)))`, and a custom property
inherits from the host to each item and its `::after` pseudo-element. The following table gives the
line color for each source, from the strongest to the weakest:

| Source                                                      | Where it applies                       | Line color                                                       |
| ----------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `forced-colors: active`                                     | Every line and empty-host outline      | `Highlight` (`composables/_drag.scss:63-72`)                     |
| An `.active` item                                           | That item's line                       | `--bs-list-group-active-color` (`composables/_drag.scss:40-42`)  |
| An unlayered `--vn-drag-color` on an item                   | That item's line                       | The declared value                                               |
| An unlayered `--vn-drag-color` on the host                  | Every line, the tint, and the outline  | The declared value                                               |
| A `drag-KEY` class on the host                              | Every line, the tint, and the outline  | `--bs-KEY-text-emphasis`, resolved on the host                   |
| A `.list-group-item-KEY` class on an item, with no host value | That item's line                     | `--bs-KEY-text-emphasis`, through `--bs-list-group-active-bg`    |
| The `.list-group` class alone                               | Every line, the tint, and the outline  | `#0d6efd` (`_list-group.scss:20`)                                |

The following rules decide the precedence:

- **A host class overrides a contextual item's tint.** CSS cannot tell whether an item's
  `--bs-list-group-active-bg` token came from its own contextual class or from the host's
  `.list-group` class, and a yielding selector would select Bootstrap's contextual classes. Keep a
  host without a class to keep each contextual item's own line, as `guides/veneer.md:1606-1608`
  documents.
- **The `.active` line keeps `--bs-list-group-active-color`.** The `.active` rule sets the
  `border-color` property itself, so no token in a later layer reaches it, and a variant color on the
  filled active background has no contrast reading.
- **Forced colors keep `Highlight`.** The forced-colors block sets the property itself for the same
  reason.
- **Never declare a default `--vn-drag-color` property on the host.** A custom property resolves its
  `var()` references where it is declared, so a host default of the chain would resolve
  `--bs-list-group-active-bg` on the host and freeze every item's line to the host's `#0d6efd`, which
  removes each contextual item's own tint. The D2.3 matrix case reads each contextual item's line
  against its own token (`tests/src/styles/composables/drag.test.ts:77-104`), so that case reddens if a
  later unit adds such a default.
- **A Bootstrap utility on the host keeps its yield.** A `.bg-KEY` or `.text-bg-KEY` utility on the
  host beats the over tint with or without a class, because Bootstrap writes each utility as an
  `!important` declaration outside every layer (`guides/veneer.md:1613-1615`).

The text-emphasis family carries the class, for the following reasons:

- It matches the family Bootstrap's contextual items give the line (`_list-group.scss:248`), so the
  `drag-success` line equals the line on a `.list-group-item-success` item in either mode.
- It retunes under `[data-bs-theme='dark']` (`src/bootstrap/_tokens.scss:155-162`), while the
  `$theme-colors` tokens keep one value across modes (`_tokens.scss:44-51`).
- The scout's run reads the base `$theme-colors` family under 3:1 for `info` (1.96), `warning` (1.63),
  and `light` (1.05) on the light body and for `dark` (1.00) on the dark body
  (`tmp/units/variants-2026-10-08/contrast.txt`). This proposal's run reads every text-emphasis line
  at 4.55 or more against the body and against every contextual `bg-subtle` item background in both
  modes, with the lowest at `drag-danger` in dark mode against `--bs-light-bg-subtle`
  (`class/contrast.txt`). WCAG 2.2 asks 3:1 for the graphics that identify a component's state; see
  [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

The class carries one color token and no size or opacity variant. The `$border-widths` map holds
literal `px` lengths (`src/bootstrap/_maps.scss:110-116`), while the doctrine takes sizes from
Bootstrap tokens (`verdict.md:237`), and no admitted map holds opacity steps (`brief.md` § Scope).

## Registries

Unit U1 lands the `veneer` groups that `ROADMAP.md:46` owes, and unit U2 adds the variant leaves.
After U2 the groups read as follows:

```ts
// src/core/constants.ts, inside TOKEN_NAMES after the bootstrap group
veneer: /* @__PURE__ */ Object.freeze({
	drag: /* @__PURE__ */ Object.freeze({
		color: '--vn-drag-color',
		opacity: '--vn-drag-opacity',
		size: '--vn-drag-size',
	} as const),
} as const),

// src/core/constants.ts, inside CLASS_NAMES after the bootstrap group
veneer: /* @__PURE__ */ Object.freeze({
	composables: /* @__PURE__ */ Object.freeze({
		active: 'active' as const,
	}),
	modifiers: /* @__PURE__ */ Object.freeze({
		drag: /* @__PURE__ */ Object.freeze({
			danger: 'drag-danger' as const,
			dark: 'drag-dark' as const,
			info: 'drag-info' as const,
			light: 'drag-light' as const,
			primary: 'drag-primary' as const,
			secondary: 'drag-secondary' as const,
			success: 'drag-success' as const,
			warning: 'drag-warning' as const,
		}),
	}),
}),
```

The following facts fix the groups' contents:

- The `veneer` token group holds every `--vn-*` name the built `./styles` sheet declares on any
  selector, as the `collectSheetNames` function reads them (`tests/setupStyles.ts:139-166`) and as the
  `bootstrap` group holds component-scoped names such as `--bs-btn-padding-x`. The `--vn-drag-color`
  property enters at U2, because U2's rules are its first declaration; a name read only through a
  `var()` fallback stays out (`ROADMAP.md:46`).
- The `veneer` class group holds every class a selector of the built `./styles` sheet reacts to,
  Bootstrap names included (`browser-stage-b-verdict.md:1029`). The composable partial selects
  `.active` (`composables/_drag.scss:40`, `:65`), so `composables.active` lands at U1.
- The `modifiers.drag` keys sort by name, as `CLASS_NAMES.bootstrap.components.list.group.item` does.

The two-way pins replace the `it.todo` case at `tests/src/styles/index.test.ts:85-87` and read as
follows, each in the shape of the Bootstrap pins (`tests/src/bootstrap/index.test.ts:135-146`,
`:475-490`):

- **`pins every Veneer token leaf to the built styles sheet both ways`.** The names
  `collectSheetNames` reads from the built sheet equal the sorted `TOKEN_NAMES.veneer` leaves, and each
  leaf equals `--vn-` followed by its key path through the `joinKeys` function (`tests/setup.ts:1454`).
  Controls: a sheet with an appended `.appended-control { --vn-planted: 0 }` rule reads one extra
  name, and a registry with a misplaced leaf fails the key law.
- **`pins every Veneer class leaf to the built styles sheet both ways`.** The names
  `collectSheetClasses` reads from the built sheet (`tests/setupStyles.ts:18`) equal the sorted
  `CLASS_NAMES.veneer` leaves, and each category's paths equal the `collectPaths` result for its names.
  No `modifiers` leaf meets a `CLASS_NAMES.bootstrap` name, while the same reading finds `active` in
  both registries, so the reading is not vacuous. Control: an appended `.appended-control` rule reads
  one extra class.

The roadmap disagrees with itself on when the token group lands. `ROADMAP.md:46` says the styles chunk
adds it "with its first declared token", and `ROADMAP.md:143` keeps the pin as an `it.todo` case
"until the first global token lands", while the built sheet already declares `--vn-drag-size` and
`--vn-drag-opacity` (`composables/_drag.scss:16-17`). This proposal rules for `:46`: the pin reads
every declaration on any selector, as the doctrine's mechanism line expects
(`verdict.md:237`), so U1 replaces the `:143` clause. The core proof's group pins at
`tests/src/core/index.test.ts:64-65` move from `['bootstrap']` to `['bootstrap', 'veneer']`.

## Showcase specimen

The specimen shows every `CLASS_NAMES.veneer.modifiers` name on the page, so the page census keeps
reading every class the sheets declare. Unit U3 adds one figure to
`app/browser/sections/sortable-list.html` with the following shape:

- One `figure.card.flex-fill.mb-0` inside a `.col.d-flex` column, as the section census requires
  (`tests/app/browser/sections/integration.test.ts:64-70`), titled "Line colors" through
  `aria-labelledby="native-lines-title"`.
- A `row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3` grid of 8 lanes, one per `drag-KEY` class, each
  a `ul.list-group.drag-KEY[data-vn-drag]` host with the accessible name "KEY_TITLE lane", where
  KEY_TITLE is the key with a capital first letter, such as "Success lane".
- Two items per lane, each named uniquely across the page, each with a grip and one `--last` command
  button. In a 2-item lane, a `--last` button on every item keeps the single-pointer path open after
  any move, while a `--next` and `--previous` pair leaves both buttons inert after the first move.
- A caption that lists the 8 classes in `code.text-body-secondary` elements, as the list-group
  fragment does, and a sentence that says to drag a grip in any lane.

The following markup gives one lane:

```html
<ul id="success-lane" class="list-group drag-success" data-vn-drag aria-label="Success lane">
	<li class="list-group-item d-flex align-items-center column-gap-3" aria-label="Seal cartons">
		<button type="button" class="btn btn-link text-body" draggable="true" aria-label="Move Seal cartons">
			<span aria-hidden="true">⠿</span>
		</button>
		<button
			type="button"
			class="btn btn-sm btn-outline-secondary"
			command="--last"
			commandfor="success-lane"
			aria-label="Move Seal cartons to the end"
		>
			<span aria-hidden="true">↓</span>
		</button>
		<span>Seal cartons</span>
	</li>
	<!-- The second item repeats this shape with its own name. -->
</ul>
```

The specimen carries no `style` attribute (`tests/app/browser/sections/integration.test.ts:63`), and
no lane is grouped, so the board figure the `landing` branch adds (`b43a57c`) stays the one grouped
specimen. The empty-host outline needs a grouped host to show, so the styles matrix proves its color
and the page doesn't show it.

## Proof matrix

### Modifier partial proof

The mirrored proof `tests/src/styles/modifiers/drag.test.ts` adopts the built `./bootstrap` and
`./styles` sheets, imports the partial and the planted fixture through `?inline`, and runs under
Chromium 141 and 153, as the drag composable proofs do (`guides/veneer.md:1618`). Every expectation
comes from a source other than the partial: the keys from `tests/fixtures/bootstrap/maps.json`, the
classes from `CLASS_NAMES.veneer.modifiers.drag`, and each expected color from the computed
`TOKEN_NAMES.bootstrap.KEY.text.emphasis` token. The following table gives each case, its reading,
and its planted control:

| Case                                                                                                       | Reading                                                                                                                                                                                                                                                                                          | Planted control                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writes the drag modifier partial in one modifiers block, beside a planted bootstrap control`              | The `readAtPlacement` and `readPlacement` functions read one `@layer modifiers` block and no other layer                                                                                                                                                                                          | The partial with `@layer modifiers` replaced by `@layer bootstrap` reads the `bootstrap` layer, as `tests/src/styles/composables/drag.test.ts:35-59` does                  |
| `generates one token-only class per theme color from the map, beside a planted key set`                     | The partial's `collectSheetClasses` result equals `drag-` followed by each `theme-colors` key of the fixture; `collectSheetNames` reads `--vn-drag-color` alone; each rule's value equals the fixture's `theme-colors-text` value at that key; the result equals the `CLASS_NAMES.veneer.modifiers.drag` leaves | The planted fixture reads `drag-planted` and `drag-success` alone; a copy of the partial with `color: red` appended to one rule reads a non-custom property            |
| `draws every variant line on every list-group cell in both modes, and keeps the active line`                | For each `buildDragCells` cell (`tests/setupStyles.ts:548-600`) and each class, added to the host and removed after the reading, each edge's `::after` color matches the host's `--bs-KEY-text-emphasis` token, or `--bs-list-group-active-color` on the `.active` cell; a contextual item takes the host's color; an item that carries a `drag-KEY` class inside a host without one keeps the default line | A copy of the built sheet with the chain reordered to `var(--bs-list-group-active-bg, var(--vn-drag-color, …))` reads the list-group token on every cell; a copy with `[data-vn-drag].drag-` rewritten to `.drag-` retints the item that carries the class |
| `tints the over host and outlines an empty host in each variant color, in the system highlight under forced colors` | For each class, the over host's background matches `color-mix(in oklab, TOKEN 15%, transparent)` and the empty host's outline color matches the token, where TOKEN is the host's `--bs-KEY-text-emphasis` value; under `forced-colors: active` the line and the outline match `Highlight` | The reordered-chain copy reads the `.list-group` literal `#0d6efd` on the tint and the outline of every class                                                          |
| `holds 3:1 between every variant line and its item background in both modes`                               | `measureContrast` between the line color and the item background composited over the body background with `blendColor` reads 3 or more for every class, cell, and mode except the `.active` cell                                                                                                    | A copy of the built sheet with every `-text-emphasis)` reference rewritten to `)` reads under 3 for the keys the scout's run names                                     |
| `wins over a composables declaration of the drag color and loses to an unlayered one`                       | A planted `@layer composables { [data-vn-drag] { --vn-drag-color: var(--bs-danger) } }` rule leaves the `drag-success` host on the success token; a planted unlayered rule moves it to the danger token                                                                                           | The partial compiled into `@layer surfaces` loses to the planted `composables` rule                                                                                    |

Each cell renders a single time, and the line case toggles each class on the rendered host, so the case renders
as many fixtures as the D2.3 line case does while it crosses every list-group variant with every class.
The proofs read every CSS Object Model value through instruments that `tests/setupStyles.ts` and
`@orkestrel/test/browser` already export, so U2 adds no instrument.

### Registry pins

The two-way pins in § Registries run in `npm run test:src:styles`. The core proof's group-key case
(`tests/src/core/index.test.ts:64-65`) reads both groups.

### Journey and census

Unit U3 adds the following readings to the showcase proofs:

- The section census admits `collectNames(CLASS_NAMES.veneer)` beside the Bootstrap registry
  (`tests/app/browser/sections/integration.test.ts:23-27`), and the planted `veneer-planted` control
  still reports (`:179-197`).
- The page census in `reads resolved values, the census, and contrast under its declared variant`
  expects the same names (`tests/app/browser/integration.test.ts:1318-1330`), so a lane that loses its
  class, or a class the sheet declares and the page never shows, reddens the set equality.
- One journey case, `colors the sortable line and the over tint by the lane's class`, boots
  `createDragPlugin()`, resolves the list "Success lane" by its exact name, drags its first grip onto
  the lower part of its second item with `userEvent.dragAndDrop`, and reads, at the `data-vn-insert`
  mutation, the `::after` color against the list's `--bs-success-text-emphasis` token and the host's
  background against the 15% mix. The journey's light and dark projects each read their mode's
  token value.

## Sealed-face check

Each veneer unit leaves the Bootstrap face byte-equal, and its gate runs the following checks:

- `git -C /home/user/veneer diff --exit-code 9f56e6a -- src/bootstrap tests/fixtures/bootstrap tests/src/bootstrap`
  exits 0.
- `npm run test:conformance` passes, including `pins the official CSS digest`
  (`tests/conformance.test.ts:398-403`), the Sass pass digest against `tests/fixtures/bootstrap/pass.json`
  (`:292-306`), link 1 (`:617`), link 2 (`:405`), the maps cases (`:673-767`), and
  `admits only the Bootstrap maps module from styles and reports every other crossing` (`:769-846`),
  whose index-0 run then reads a real styles load for the first time.
- `npm run test:src:bootstrap` passes, including link 3 (`tests/src/bootstrap/index.test.ts:543`) and
  both registry pins.
- The SHA-256 digest of `dist/src/bootstrap/index.css` after `npm run build:src:bootstrap` equals the
  digest before the unit, and the unit report records both.
- `keeps every pair of built sheets disjoint in each shared layer` (`tests/integration.test.ts:292-320`)
  passes, because the `./styles` sheet writes the `modifiers` layer and the `./bootstrap` sheet never
  does.

## Risks

The following risks stand after the units land:

- **U0 needs your ruling.** The naming row binds every repository that reads scaffold. U2 waits on
  U0, and a refusal of U0 refuses this proposal's keying.
- **A class resolves its token on the host.** An item that carries its own `data-bs-theme` attribute
  keeps the host mode's line under a class, while the default chain resolves on the item. The matrix
  sets the mode on a wrapper around the host and reads no item-level mode island; the guide records
  the limit.
- **A class reaches a nested host.** A sortable host inside an item of a host with a class inherits
  that class's color unless it carries its own class. A reset of the property on every host would
  also block a theme pack or an ancestor that sets it, so the guide records the inheritance instead.
- **Two keys draw one line.** `--bs-light-text-emphasis` and `--bs-dark-text-emphasis` are both
  `#495057` in light mode (`src/bootstrap/_tokens.scss:66-67`) and `#f8f9fa` and `#dee2e6` in dark mode
  (`:161-162`), so `drag-light` and `drag-dark` look alike. The loop follows the map and curates no
  key, as `verdict.md:233` requires.
- **`drag-primary` differs from the default line.** The default is the `.list-group` literal `#0d6efd`,
  while `drag-primary` is `#052c65` in light mode, the line of a `.list-group-item-primary` item. The
  default also ignores a theme pack that retunes `--bs-primary`, while every class follows a pack that
  retunes the emphasis tokens.
- **The over tint reads greyer than the default.** A 15% mix of a light-mode emphasis color, a dark
  shade, gives a muted tint beside the default's blue one. The matrix reads computed values, not the
  look, so the capture review judges the look.
- **The styles Sass gains its first cross-face load in a packed install.** The distribution proof
  compiles only the `./bootstrap/scss` entry from the packed install (`tests/distribution.test.ts:845-846`,
  `:868`). U2 adds a case that compiles the `./styles/scss` entry there and finds the 8 rules.
- **The planted control depends on one module instance per canonical URL.** The probe shows the
  configuration reaching the partial's relative load under the Sass 1.105.1 CLI. The
  proof compiles through Vite's `?inline` query, which no run has checked for the same behavior; the
  U2 lane reads the planted output before it writes any other case.
- **The `landing` branch and M1 touch the specimen's file.** The `landing` branch at `2540baf` adds a
  board figure to `app/browser/sections/sortable-list.html` and a surfaces rule to
  `src/styles/surfaces/_drag.scss`, and the M1 unit repairs the sortable the user reported broken on
  2026-10-08. U1 and U2 start from the tip that holds the landing chain, so the pins read every
  partial; U3 also starts after M1.
- **The journey gains one pointer drag.** The journey run time grows by one drag case.
- **"Variant" carries two senses in the guide.** The guide uses the word for journey projects
  (`guides/veneer.md:2402-2414`) and for component-specific modifiers (`:679`). This proposal follows
  `:679`, and no markup token carries the word.
- **A mixin that loads the maps reaches the themes barrel.** At U4, the themes barrel loads
  `_mixins.scss` through `themes/_default.scss`, so it loads the maps too. The maps emit no CSS, and the
  `ships the shared order with only theme blocks and no fabricated defaults` case reads the themes
  sheet unchanged.

## Units

The following units carry the proposal. Each owns its files alone; U1, U2, and U3 share
`guides/veneer.md` and `ROADMAP.md` by section and run in sequence, so no two units edit one file at the same time.
No unit commits until the orchestrator lands it.

### U0: Variant class row in the scaffold styles rule

U0 owns `/home/user/scaffold/.claude/rules/styles.md`. It adds the row and the directive in
§ Amendment to the styles naming table. Precondition: your ruling. Gate: `npm run test:policy` in
`/home/user/scaffold`.

### U1: Veneer registry groups

U1 lands the groups `ROADMAP.md:46` owes, with no variant. It owns the following files:

- `/home/user/veneer/src/core/constants.ts`: `TOKEN_NAMES.veneer.drag.opacity` and `.size`,
  `CLASS_NAMES.veneer.composables.active`, and a `veneer` sentence and example in each TSDoc block.
- `/home/user/veneer/tests/src/core/index.test.ts`: the group-key pins at `:64-65`.
- `/home/user/veneer/tests/src/styles/index.test.ts`: the two-way pins in place of the `it.todo` case.
- `/home/user/veneer/guides/veneer.md`, § Surface (`:37-38`), § Examples (`:637-654`), and § Core
  entry (`:661-679`).
- `/home/user/veneer/ROADMAP.md`, the `src/core` line (`:46`) and the styles chunk line (`:143`).

Gate: `npm run check`, `npm run test:src:core`, `npm run test:src:styles`, `npm run test:guides`,
`npm run test:policy`, `npm run format:check`, `npm run lint:check`, and the sealed-face check.

### U2: Sortable variant partial and its proofs

U2 follows U0 and U1. It owns the following files:

- `/home/user/veneer/src/styles/modifiers/_drag.scss`, created.
- `/home/user/veneer/src/styles/modifiers/_index.scss`, which gains `@use 'drag';`.
- `/home/user/veneer/src/core/constants.ts`: `TOKEN_NAMES.veneer.drag.color` and
  `CLASS_NAMES.veneer.modifiers.drag`.
- `/home/user/veneer/tests/src/styles/modifiers/drag.test.ts`, created, with the cases in
  § Modifier partial proof.
- `/home/user/veneer/tests/fixtures/styles/planted.scss`, created.
- `/home/user/veneer/tests/distribution.test.ts`: the packed `./styles/scss` compile case.
- `/home/user/veneer/guides/veneer.md`, § Sortable list (`:1603-1610`: the class table, the precedence,
  and the three limits in § Risks) and § Styles sheet (the partial table at `:1954-1957`, the load
  sentence at `:1963`, and an override row in the table at `:1971-1977`).
- `/home/user/veneer/ROADMAP.md`, the styles chunk line (`:143`), which gains the modifier partial and
  `--vn-drag-color`.

Gate: `npm run check`, `npm run test:src:styles` under Chromium 141 and 153, `npm run test:src:core`,
`npm run test:conformance`, `npm run test:integration`, `npm run test:distribution`,
`npm run test:guides`, `npm run test:policy`, `npm run format:check`, `npm run lint:check`, and the
sealed-face check.

### U3: Line colors specimen

U3 follows U2, the landing chain, and M1. It owns the following files:

- `/home/user/veneer/app/browser/sections/sortable-list.html`: the Line colors figure.
- `/home/user/veneer/tests/app/browser/sections/integration.test.ts`: the admitted set.
- `/home/user/veneer/tests/app/browser/integration.test.ts`: the page census and the journey case.
- `/home/user/veneer/guides/veneer.md`, § Class coverage (from `:2253`): both registries in the census
  sentences.
- `/home/user/veneer/guides/README.md`: the `./styles` row and the `src/styles` row name the Browser
  showcase, which already loads the sheet at `9f56e6a`.
- `/home/user/veneer/ROADMAP.md`, the showcase line (`:141`): every `CLASS_NAMES.veneer` name.
- `/home/user/veneer/showcase/browser.html`: the rebuilt page.

Gate: `npm run test:app:browser`, `npm run test:journey`, `npm run test:guides`, `npm run test:policy`,
`npm run format:check`, `npm run lint:check`, and the sealed-face check.

### U4: The `vary` mixin, deferred

U4 opens only when a second styled module needs variant classes, and the unit that builds that module
carries it. U4 owns `/home/user/veneer/src/styles/_mixins.scss`, `/home/user/veneer/src/styles/modifiers/_drag.scss`,
and the second module's `modifiers/` partial and proof. Its proof adds a case that compiles both
callers and reads each module's classes from the same map, and the existing drag proof stays
unchanged, because the probe's output for the sortable is identical in both forms.
