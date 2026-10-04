# Tailwind flip: the thin-layer proposal

Lane: objective (what the cascade, the records, and the contracts permit). I mark each subjective call (labels, captions, layer and folder names) as a default for the Opus lane and the user under § 10.

Angle result: the angle holds. `./bootstrap` keeps every rule it ships, and every flip mechanism lives in `./tailwindcss`. The design departs from "`./bootstrap` does not change at all" in one place: the shared order statement gains a trailing `compatibility` layer, so `./bootstrap`'s first statement changes by one name that it never writes. M1 forces that departure: a `revert-layer !important` counter reaches Tailwind's value only from a layer after `utilities` (M1 § c, 12px in `compat` and 0px in all 10 statement layers).

## 1. Rulings

**R1 (Q1, the 192 shared utility names).** Rule (b) with one companion directive. `./tailwindcss` ships one counter per shared utility name in a `compatibility` layer that follows `utilities`. Each counter declares every property that Bootstrap's `.NAME` rule declares, with the value `revert-layer !important`. M1 `d.rli.compat` reads 12px (Tailwind's value) and skips Bootstrap's unlayered 16px `!important`. M1 § c reads 0px for the same counter in each of the 10 statement layers, so no existing layer can hold it. Companion (d): the sheet also ships `@source inline("<the 192 names>")`, so the consumer's Tailwind always emits the rule each counter rolls back to. Without that rule the rollback reaches the user agent: M1 `d3.rli.compat` reads RESET's 4px, never Bootstrap's 16px. Rule (a), a Tailwind-tuned Bootstrap build that withholds the 192 rules, is refused by this angle because it ships a second Bootstrap sheet. It stays the smallest departure if the user rejects the consumer-override limit in § 10, item 1. Rule (c) is refused: it changes a Bootstrap-only consumer's semantics, which the brief forbids (`brief.md:56`).

**R2 (Q2, the 17 shared component names).** Bootstrap keeps `caption-top`, `col-1` to `col-12`, `col-auto`, `collapse`, `container`, and `table`, because the exclusion statement keeps naming them. These names are component contracts: the engine writes `collapse`, and `container` and `col-*` carry the grid. M5 shows the 1833-name exclusion drops exactly these 17 from the compile and adds nothing (`sheets.md` § M5: 244 style rules, 206 class tokens). `caption-top` declares `caption-side: top` in both maps, so keeping Bootstrap's rule reads the same as Tailwind's. Bootstrap keeps it because it belongs to the table component. `incompatible.json` still records what these names do when they are not excluded (the Tailwind face without the layer, § 5).

**R3 (Q3, the exclusion statement).** The exclusion names every Bootstrap name except the 192 shared utilities: 1833 names (`sheets.md` § Class sets). The inclusion names those 192. Together the two statements partition the 2025 `CLASS_NAMES.bootstrap` names. Consumer-theme limit: a consumer `@theme` token or `@utility` rule never makes Tailwind generate a Bootstrap name outside the 192. M5's `--color-primary` compile is byte-identical to the compile without the token, and `bg-primary` stays absent (`sheets.md:53-55`). A token that changes the value of a shared utility does change it, because Tailwind owns those names: `--spacing` scales the `mt-3` class. An `@utility mt-3` rule redefines `mt-3`, because shared names are not excluded.

**R4 (Q4, preflight authority).** The mirror goes. The reboot stays where it is, in the `bootstrap` layer of an unchanged `./bootstrap` (`src/bootstrap/_reset.scss:3-385`). `./tailwindcss` projects Tailwind's compiled preflight into the `bootstrap` layer. Every normal preflight declaration becomes a `revert-layer` declaration under the selector `html body S`, for each preflight selector `S`. Inside `bootstrap`, a winning `revert-layer` rolls back to `base`, where preflight answers. Where preflight declares nothing, the reboot's declaration is never countered and keeps supplying body color and background, heading `line-height` and color, `code` color, and `mark` color and background. The target is condition C on every bare element: M2 reads 2792 rows (2594 shared with D plus 198 C-only rows over 25 elements). Two cascade facts make the approach work. M1 `f.1` and `f.2` show preflight beats a `reset` rule and loses to a `bootstrap` rule. M1 `d2.rln.bootstrap` shows a normal `revert-layer` in `bootstrap` rolls back past the layer. The two important reboot declarations need no counter:

- `[hidden]`: preflight's layered `[hidden]:where(:not([hidden=until-found]))` important declaration already beats Bootstrap's unlayered one. M2 § 5 reads `none` for `div[hidden].d-flex` under B, C, and D. Bootstrap's rule still covers `hidden="until-found"`, where preflight declares nothing, so no conflict exists there.
- The datalist picker rule (`_reset.scss:281-285`): preflight declares only `line-height` on that pseudo-element. Chromium 141 exposes no computed style for it (M2 § 5).

Two alternatives are refused:

- Moving the reboot into `reset` turns both important reboot declarations into `reset`-layer importants. Those outrank every Tailwind `!` utility, because the earlier layer wins among importants (M1 `b.5`, `b.6`). The move also strips `.h1` to `.h6`, `.small`, and `.mark` of meaning: M3 C reads `h4.h5` font-size 20px to 16px (`m3-curation-candidates.md`, row `h5 | h4`). The move also needs a second Bootstrap build.
- Dropping the reboot loses body font, color, and background. Only the reboot supplies them: M2 reads `body` keeping Bootstrap's family under C and D.

**R5 (Q5, the curation rule).** Rule (i), sharpened by own-cause attribution, defines a broken component. An element carrying a `CLASS_NAMES.bootstrap.components` leaf is broken when one of its own longhands departs from its Bootstrap-only value and either a reboot counter or a preflight rule matching that element declares that longhand. The invisible set does not count: `border-*-style` where that side's computed width is 0px, and `list-style-*` on an element whose `display` lacks `list-item`. The layer repairs each break on the class, never globally:

- A reboot-sourced break: the component class joins a zero-specificity `:where(:not(...))` exclusion on that counter rule, so Bootstrap's reboot value returns untouched.
- A preflight-only break: a scoped `revert-layer` in `base` on the class.

Bare elements belong to Tailwind. Rule (ii) is refused because it hands bare consumer elements back to the reboot, which R3 forbids ("never by taking the conflict back from Tailwind globally", `brief.md:16`). Rule (iii) is refused because it leaves visible component breaks unrepaired: M3 functional finds only 7 `display` rows (`m3-functional.md`), while `h4.modal-title` loses weight 500 and `a.alert-link` loses its underline (`m3-curation-candidates.md`).

**R6 (Q6, surface).** `./tailwindcss` stays thin, and the consumer still links `./bootstrap` after the compiled Tailwind sheet. No `./bootstrap/tailwind` export and no `$tailwind` switch exist. The exports, Sass barrels, Vite wrappers, and `files` list stay as they are (`package.json:13-20`, `:54-57`). § 3 gives the bytes and the derivation proof.

**R7 (Q7, showcase).** Three faces:

- Bootstrap only.
- Bootstrap with Tailwind, without the layer: the `unexcluded` compile. It stops being a control and becomes a face.
- Bootstrap with Tailwind, with the layer.

The face statechart grows from 4 rows to 9. A departure-partition proof replaces face invariance. The Tailwind group's captions state three readings each. § 5 gives the full design.

**R8 (Q8, records and proofs).** These records keep their meaning: `oracle.min.json`, `comparison.json`, `similar.json`, and `incompatible.json` (re-derived against the face without the layer). `preflight.json` changes meaning: it becomes the identity set of what the flipped composition moves on bare elements, with no values stored, so it reads the same on Chromium 141 and 153. `recipe.json` keeps its shape with the flipped compile. The curation table is added beside the exemption table in the guide. § 6 places every case.

**R9 (Q9, guide and roadmap).** Rewrite § Tailwind compatibility sheet, § Composition, § Load real Tailwind, § Faces, and § Tailwind record. Reverse the "Bootstrap wins on a shared class" tenet in `ROADMAP.md:15`, `:29`, `:36`, `:40`, `:44`, and `:54`, and in `plan.md:11`. § 7 lists the sentences.

**R10 (Q10, units).** Eight serial units on one checkout, each listed in § 8 with its files, acceptance criteria, lane, and gates:

- U0: probes.
- U1: order statement.
- U2: sheet.
- U3: composition proofs.
- U4: curation.
- U5: showcase content (Opus).
- U6: showcase proofs and rebuild.
- U7: guide, roadmap, and plan (Opus).

## 2. Mechanism

### Order statement

Every published sheet opens with the following statement. It replaces `src/bootstrap/_tokens.scss:9`, `src/tailwindcss/_tokens.scss:2`, and `src/styles/_tokens.scss`:

```css
@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compatibility;
```

The appended layer costs the following:

- The statement changes in every sheet, as the styles rule requires (`styles.md:75`).
- `LAYER_ORDER` changes (`tests/setup.ts:926`).
- Every copy of the statement changes: the guide, `ROADMAP.md:26`, `app/browser/sections/tailwindcss.html:12`, both `recipe.json` files, `tests/setup.test.ts`, `tests/setupPolicy.ts`, and `tests/fixtures/styles/bootstrap.scss`.
- Every committed digest of the built `./bootstrap` sheet that U1's search finds must be regenerated.

What a Bootstrap-only consumer sees is bounded. `./bootstrap` writes no `compatibility` block, so every computed value under `./bootstrap` alone stays the same, and link 3 and the Bootstrap face readings prove it. The drop-in form emits no statement (`_tokens.scss:8-10`), so link 1 stays byte-equal.

### Shared-name counters (layer `compatibility`)

The partial `src/tailwindcss/compatibility/_shared.scss` holds the map and its emission. Its barrel `compatibility/_index.scss` loads it, and `src/tailwindcss/index.scss` loads the barrel:

```scss
@use '../mixins' as *;

// One entry per shared utility: the properties Bootstrap's exact `.NAME` rule declares.
$shared: (
	'mt-3': (margin-top,),
	'border': (border,),
	'mx-3': (margin-right, margin-left),
	// the other shared names follow, sorted by code unit
);

@layer compatibility {
	@each $name, $properties in $shared {
		.#{$name} {
			@include counter($properties, true);
		}
	}
}
```

The mixin lives in `src/tailwindcss/_mixins.scss`. Two partials call it, which the styles rule requires (`styles.md:63-64`):

```scss
// An important counter skips every unlayered declaration and rolls back to the earlier layers' normal value.
@mixin counter($properties, $important: false) {
	@each $property in $properties {
		@if $important {
			#{$property}: revert-layer !important;
		} @else {
			#{$property}: revert-layer;
		}
	}
}
```

The emitted rule for the `mt-3` class:

```css
@layer compatibility {
	.mt-3 {
		margin-top: revert-layer !important;
	}
}
```

The seven layered `--bs-*-opacity: 1` halves (`sheets.md:77`) get no counter. They are custom properties, Tailwind declares no `--bs-*` property, and every reading excludes custom properties (`setupBrowser.ts:873-874`).

### Reboot counters (layer `bootstrap`) and curation repairs (layer `base`)

`src/tailwindcss/_reset.scss` replaces the mirror. Its `bootstrap` block projects preflight under these rules:

- Each preflight style rule keeps its selector list, prefixed: every selector `S` becomes `html body S`.
- Every normal value becomes `revert-layer`.
- `@supports` nesting is kept.
- An important declaration is omitted only through the exemption table.
- A curation row appends `:where(:not(<components>))` to each selector of its rule that carries no pseudo-element.

The rule for preflight's heading reset, with the provisional curation rows (§ 4):

```css
@layer bootstrap {
	html body h1:where(:not(.modal-title, .accordion-header)),
	html body h2:where(:not(.modal-title, .accordion-header)),
	html body h3:where(:not(.modal-title, .accordion-header)),
	html body h4:where(:not(.modal-title, .accordion-header)),
	html body h5:where(:not(.modal-title, .accordion-header)),
	html body h6:where(:not(.modal-title, .accordion-header)) {
		font-size: revert-layer;
		font-weight: revert-layer;
	}
}
```

Bare `h1` margins come from the projection of preflight's universal rule (`html body *, html body ::after, html body ::before, html body ::backdrop, html body ::file-selector-button { box-sizing: revert-layer; margin: revert-layer; padding: revert-layer; border: revert-layer; }`). A curation row with a base repair:

```css
@layer base {
	.bi {
		display: revert-layer;
	}
}
```

Specificity decides the counters, and source order does not. The guide has the consumer link `./bootstrap` after the compiled Tailwind sheet (`guides/veneer.md:1508-1510`), so a counter that ties a reboot selector loses. Every projected selector satisfies b = 0, because preflight carries its attribute tests inside `:where()` and has no class. Every projected selector also satisfies c ≥ 2, because of the `html body` prefix:

| Selector                                        | Specificity          | Result inside `bootstrap`                                                                                                               |
| ----------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `html body *`                                   | (0,0,2)              | Beats every type-only reboot selector at (0,0,1). Ties `ol ol`, `kbd kbd`, and `pre code` at (0,0,2), where both values are 0 or `inherit` |
| `html body h1`, `html body code`, `html body a` | (0,0,3)              | Beats the reboot's `h1`, `code`, and `a` rules                                                                                             |
| `.h1`, `.small`, `.mark`, any component class   | (0,1,0) or more      | Beats every counter, so these classes keep Bootstrap's declarations on any element                                                         |
| `a:not([href]):not([class])`                    | (0,2,1)              | Beats the `a` counter. Its color is `inherit`, like preflight's. Its `text-decoration: none` differs from preflight's `inherit` only under an underlined ancestor; this is the one residual |

The repo cannot compute specificity without a second CSS parser, which `AGENTS.md` forbids. The bound is therefore proven textually in Node on the projected selector strings: after removing every `:where(...)` group, the selector holds no `.`, `[`, or single-colon pseudo-class.

### What a consumer reads

The following table states each case for the `mt-3` class and a bare `h1` element. Each reading cites its source:

| Case | `<div class="mt-3">` | `<h1>` and `<p class="h1">` |
| --- | --- | --- |
| Tailwind present with the recipe | 12px. The counter rolls back to Tailwind's `utilities` rule (M1 `d.rli.compat`) | Bare: 16px, weight 400, margin 0, line-height 19.2px (M2 witnesses under C). `.h1`: 40px at 1280 px, weight 500, margin 8px |
| Tailwind absent (built `./tailwindcss` linked beside `./bootstrap`, or compiled through Sass) | 0px. The rollback finds no normal declaration and reaches the user agent (M1 § c, 0px) | Bare: user-agent 32px, weight 700, bottom margin 21.44px (M1 `f.0`). Refused: the guide marks this composition unsupported (§ 10, item 7) |
| Consumer unlayered `.mt-3 { margin-top: 2px !important }` | 12px. A layered important beats every unlayered important (M1 `b.1` to `b.4`). Write the override as `mt-[2px]!` or inside `@layer utilities` with `!important`; the earlier layer wins among importants (M1 `b.5`, `b.6`) | No change |
| Consumer unlayered normal `.hero { margin-top: 20px }` on the same element | 12px (M1 `e.3`: a layered important beats unlayered 20px). Tailwind alone reads 20px; Bootstrap alone reads 16px | Unlayered rules beat the normal reboot counters, as the thumbnail case pins today |
| Consumer `@theme { --color-primary: ... }` | `bg-primary` stays excluded, and Bootstrap's `.bg-primary` keeps its rule (M5, byte-identical). `--spacing` rescales the `mt-3` class (probe P2 reads it) | No change |
| Tailwind's important modifier `mt-3!` | 12px from `.mt-3\!` in `utilities` with `!important`. Bootstrap declares no such name. On an element that also carries another shared name, `utilities` beats `compatibility` among importants (M1 `b.5`) | No change |
| A `dark:` variant `bg-white dark:bg-black` | Black when the variant applies. The counter on `.bg-white` rolls back to `utilities`, where the variant rule follows the base rule. Without the layer, Bootstrap's important `bg-white` wins (M1 `a.1`, `a.2`). Unmeasured; probe P2 reads it under a class-based `@custom-variant` | No change |

## 3. Surface

`./bootstrap`: every rule stays as it is; only the first statement gains `compatibility`. `./bootstrap/scss` forwards `$layered` as it does today.

`./tailwindcss` ships exactly these, in order:

1. The order statement (§ 2).
2. `@source not inline("<1833 names>");`, holding `CLASS_NAMES.bootstrap` minus the 192, sorted by code unit.
3. `@source inline("<192 names>");`, holding `comparison.json` `.shared` ∩ the utilities category leaves.
4. `@layer bootstrap { reboot counters }`.
5. `@layer base { curation repairs }`.
6. `@layer compatibility { 192 shared-name counters }`.

The Sass tree:

- `_tokens.scss` holds items 1 to 3, as today's statement and exclusion do (`src/tailwindcss/_tokens.scss:2-3`).
- `_reset.scss` holds items 4 and 5.
- `compatibility/_index.scss` and `compatibility/_shared.scss` hold item 6.
- `_mixins.scss` holds the `counter` mixin.
- The `elements/`, `components/`, and `utilities/` barrels stay empty.
- `index.scss` loads `tokens`, `reset`, `elements`, `components`, `utilities`, and `compatibility`.

Exports stay unchanged:

- `./tailwindcss` → `dist/src/tailwindcss/index.css`.
- `./tailwindcss/scss` → `src/tailwindcss/index.scss`.
- The Vite wrapper `configs/src/vite.tailwindcss.config.ts` and `sheet.ts` (`import './index.scss'`) stay as they are.
- The `files` glob `src/tailwindcss/**/*.scss` (`package.json:20`) already covers the added folder.

The recipe keeps three lines and the `properties` placement contract:

```css
@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compatibility;
@import 'tailwindcss';
@import '@orkestrel/veneer/tailwindcss';
```

Link `./bootstrap` after the compiled sheet, as today. The layer's effect does not depend on that position, because every counter wins by layer or specificity.

The derivation proof ties every shipped byte to a source, all in Node except the last check:

- **Statement:** equals `LAYER_STATEMENT` from `LAYER_ORDER`.
- **Directives:** the inclusion equals sorted(`comparison.json` `.shared` ∩ the utilities leaves of `CLASS_NAMES.bootstrap`). The exclusion equals the registry minus that set. The two are disjoint and their union is the registry. Their byte lengths are pinned.
- **Reboot counters:** equal `collectCounters(readTailwindInventory().preflight, readExemptions(guide), readCuration(guide))` after one Sass round trip, compared against both the built `bootstrap` block and the compiled `_reset.scss`. `collectCounters` generalizes `collectMirror` (`tests/setupServer.ts:1012-1072`) by layer name, selector prefix, and curation exclusions. Controls: a dropped rule, a changed value, a planted curation row, and an unnamed omission.
- **Base repairs:** equal the projection of the curation table's `base` rows.
- **Shared-name counters:** equal `collectShared(readBootstrapInventory(), shared)`. Each shared name maps to the property names of the inventory rule whose selector is exactly `.NAME`, outside every group, with every declaration important (`tests/setupServer.ts:444`, `tests/setup.ts:817`). Controls: a missing name, an extra property, and a normal-priority counter.
- **Nothing else (Chromium, `src:tailwindcss`):** the adopted sheet holds the statement and the three layer blocks, and no other top-level rule.

## 4. Curation

**Measurable definition.** § 1 R5 states it.

**Population.** The 55 section fragments at 1280x800, plus the 6 fragments M3 also reads at 390x844 (61 documents, 4882 elements, `m3-summary.md`), mounted as M3 mounts them.

**Composition.** T = the flipped recipe compile followed by the lifted `./bootstrap`.

**Attribution.** Attribution reads each matching rule directly, so no condition differencing is needed. For each departing pair (element, longhand) under T against Bootstrap alone, Chromium checks `Element.matches` against the CSSOM of the recipe compile. A departure belongs to:

- `utility` when a rule in Tailwind's `utilities` layer or the `compatibility` layer matches the element and declares the longhand.
- `preflight` when a rule in the reboot-counter block or in `base` does.
- `inherited` otherwise, which covers inheritance and layout.

Rules under `@media` or `@supports` count only while their condition holds. This removes M3's heuristic labels, such as the `div` fallback that `verify.md` § Code defects flags.

**Rows.**

- A curation row is a `preflight` departure on a component-class element outside the invisible set. `tab-size` drops out by construction: preflight declares it only on `html`, so it is `inherited` everywhere else.
- A row is `bootstrap`-kind when a reboot rule matching the element declares the longhand. Otherwise it is `base`-kind.
- The key is the element's component classes as a tagless compound. A row whose class set contains another row's set, on the same counter rule, is dropped.
- Excluded from rows: shared-utility rows (self and ancestor), Tailwind-only utility rows (the `grid` specimen), box fields, and pseudo-element `tab-size`.
- M6 (probe P3) uses built sheets, so M3's 171 CSSOM-serialization rows (`verify.md:41-47`) do not arise.

**Provisional table.** The table below comes from M3's component rows with the rows that T resolves removed (§ 1 R4). M6 confirms or replaces every row:

| Layer | Counter rule (preflight selector) | Property | Component | Measured departure (M3) |
| --- | --- | --- | --- | --- |
| `bootstrap` | `h1, h2, h3, h4, h5, h6` | | `.modal-title` | `h4.modal-title.fs-5` weight 500 to 400 |
| `bootstrap` | `h1, h2, h3, h4, h5, h6` | | `.accordion-header` | `h4.accordion-header` 24px to 16px, 500 to 400 (the inner button inherits the weight) |
| `bootstrap` | universal rule | | `.card-text`, `.placeholder-glow`, `.lead`, `.display-1` to `.display-5`, `.pagination`, `.list-unstyled` | bottom margin 16px to 0px |
| `bootstrap` | `a` | | `.alert-link`, `.card-link`, `.icon-link`, `.stretched-link`, `.focus-ring`, `.link-primary`, `.link-secondary`, `.link-success`, `.link-danger`, `.link-warning`, `.link-info`, `.link-light`, `.link-dark`, `.link-body-emphasis`, `.visually-hidden-focusable` | color rgb(13, 110, 253) to rgb(33, 37, 41), underline to none |
| `base` | `img, svg, video, canvas, audio, iframe, embed, object` | `display` | `.bi` | `svg.bi` inside `.btn` and a breadcrumb link, inline to block |
| `base` | same | `display` | `.figure-img.img-fluid` | `img.figure-img` inline to block |

**Where the repairs live.** Exclusions sit inside the projected counter selectors in `_reset.scss`, and base repairs sit in its `base` block. The table sits in the guide's § Tailwind compatibility sheet under the header `| Layer | Selector | Property | Component | Reason |`. `readCuration` in `tests/setup.ts` reads it the way `readExemptions` reads its table (`tests/setup.ts:2091`).

**Pinned both ways.**

- Against the sheet (Node): the built counters equal the projection with the table, and a planted row or a stripped exclusion fails.
- Against the measurement (Chromium, the journey partition case): with the table applied, no `preflight` departure sits on a component-class element. With every exclusion and base repair removed from a scratch copy of the adopted recipe, each row's measured element departs with cause `preflight`, and no other component element does.

**The named cases.**

- `svg.bi` inside `.btn`: reads `display: inline` through the `.bi` base row. Without the layer it reads `block`.
- `.modal-title` on a heading: keeps weight 500 through its row. `.offcanvas-title` carries `.h5` on every showcase element (`app/browser/sections/offcanvas.html`), so `.h5` keeps its size and weight and no row arises. Bootstrap's documented `h5.offcanvas-title` without `.h5` is unmeasured and reads Tailwind's heading reset (§ 10, item 5).
- `.card-text` paragraphs: keep 16px through their row.
- `.h1` to `.h6`, `.small`, and `.mark`: keep every declaration of their reboot rule on any element through class specificity, with no row. A `<p class="h5">` reads 20px with an 8px margin; a `<span class="mark">` keeps its 3px padding.
- A bare `p` or `h2` inside `.card-body` belongs to Tailwind. The `p` reads a 0px margin. The `h2` reads 16px at weight 400 with a 0px margin, and keeps the reboot's `line-height: 1.2` and heading color, because preflight declares neither.

## 5. Showcase

**Faces.** Values are single words in the `Face` union (`app/browser/types.ts:13`). Labels are defaults for the Opus lane:

| Value | Label (default) | `style` elements |
| --- | --- | --- |
| `bootstrap` | Bootstrap only | `style#veneer-bootstrap` |
| `unexcluded` | Tailwind without the layer | `style#veneer-unexcluded` (`recipe.json` `.unexcluded`) directly before `style#veneer-bootstrap` |
| `tailwindcss` | Tailwind with the layer | `style#veneer-tailwindcss` (`recipe.json` `.recipe`) directly before `style#veneer-bootstrap` |

`Showcase.ts` imports both fields. The `#select` method keeps at most one Tailwind element connected (`app/browser/Showcase.ts:165-187`).

**Statechart.** `FACE_SCENARIOS` holds 9 rows: every pair of from-face and pressed button, including the 3 self-transitions. `assertFace` reads two witnesses whose pair identifies the face: the `px-8` padding and the `mt-3` margin read (12px, 16px), (32px, 16px), and (32px, 12px).

**`TAILWIND_READINGS` after the flip.** The row object already carries an `unexcluded` key (`tests/setupBrowser.ts:213-300`). Narrow values at 390 px stay as today for `container` and `md:flex`:

| Specimen | Subject | Property | `bootstrap` | `unexcluded` | `tailwindcss` |
| --- | --- | --- | --- | --- | --- |
| Tailwind padding on a Bootstrap button | `button` | `padding-left` | 12px | 32px | 32px |
| Tailwind's scale on shared spacing names | `.mt-3` | `margin-top` | 16px | 16px | 12px |
| same | `.gap-4` | `column-gap` | 24px | 24px | 16px |
| Collapse stays visible | `.collapse` | `display` | block | block | block |
| same | `.collapse` | `visibility` | visible | collapse | visible |
| Container keeps Bootstrap's widths | `.container` | `padding-left` | 12px | 12px | 12px |
| same | `.container` | `max-width` | 1140px | 1280px | 1140px |
| Pill radius beside rounded-full | `button` | `border-top-left-radius` | 800px | 800px | 800px |
| Tailwind grid in a card body | `.grid` | `display` | block | grid | grid |
| Tailwind variant at the md breakpoint | `.md\:flex` | `display` | block | flex | flex |
| Arbitrary margin value | `.mt-\[1rem\]` | `margin-top` | 0px | 16px | 16px |
| Bare image and list | `img` | `display` | inline | block | block |
| same | `ul` | `list-style-type` | disc | none | none |
| Hidden attribute with a display utility | `[hidden]` | `display` | flex | none | none |
| A shared border width draws | `.border-1` | `border-top-width` | 0px | 1px | 1px |
| A shared radius takes Tailwind's value | `.rounded` | `border-top-left-radius` | 6px | 6px | 4px |
| Bare heading beside a Bootstrap heading class | `h5` | `font-size` | 20px | 20px | 16px |
| same | `.h5` | `font-size` | 20px | 20px | 20px |
| Card text keeps Bootstrap spacing | `.card-text` | `margin-bottom` | 16px | 16px | 16px |
| same | `p:not([class])` | `margin-bottom` | 16px | 16px | 0px |
| Icon in a button stays inline | `.bi` | `display` | inline | block | inline |

The sources: the `rounded` values come from M3 (6px to 4px). `border-1` follows from `incompatible.json` and preflight's universal `border: 0 solid`. Probe P1 confirms both before U6.

**Partition proof.** It replaces face invariance in `reads the resolved values under its declared variant and both stylesheet sets` (`tests/app/browser/integration.test.ts:826-1001`):

- Population: the case reads `readSurface` under `bootstrap` and `tailwindcss` over every group, the Tailwind group included.
- Attribution: every departure is attributed through § 4's instrument, `attributeDeparture` in `tests/setupStyles.ts`, proven in `tests/setupStyles.test.ts` as `styles.md:86` requires.
- Assertion: no departure with cause `preflight` sits on an element carrying a component leaf, outside the invisible set. Chrome invariance through `readShowcaseChrome` stays.
- Control: the curation strip (§ 4).
- The row log counts departures by cause.
- The case keeps its census, escapes, and contrast parts. The census expects the undeclared tokens per face: `TAILWIND_CLASSES` under `bootstrap`, and `md:flex` and `mt-[1rem]` under both Tailwind faces (§ Census limit).
- The matrix case `compares paired open engine states under both faces...` (`:773-825`) asserts the same partition on open states instead of zero departures. Its popover face-switch control stays.

**The `unexcluded` compile.** It becomes the middle face. Its readings are the table's `unexcluded` column, and its `visibility: collapse` reading on the `collapse show` specimen stays as the face's witness that Tailwind leaks without the layer.

**Bootstrap with Tailwind section.** The Opus lane writes the copy:

- The alert's sentence "Bootstrap classes keep Bootstrap's rules" (`tailwindcss.html:2-4`) is reversed.
- The recipe `<pre>` gains `compatibility`.
- Each of the 17 specimens states its reading under all three faces and the reason. Example for the spacing specimen: "Bootstrap only: 16 px. Tailwind without the layer: 16 px, because Bootstrap's important rule wins. Tailwind with the layer: 12 px, because the layer yields the shared name to Tailwind's scale."
- Five specimens are added, matching the table's added rows: border width, radius, heading pair, card text pair, and icon in a button.
- The `[hidden]` caption states R1 instead of "the recipe's named departure".

**Page chrome.** The rule: the showcase's own layout classes carry no name whose value drifts between Bootstrap and Tailwind, so every departure sits in Bootstrap's documented markup or in the Tailwind group. The calls:

- `h-100` on `figure.card` → replace. Under the flip it computes 400px instead of 100% (M3: box height `401.125` to `400`), which clips tall cards. Default: `d-grid` on each `.col`, which stretches the card in both axes.
- `gap-3` on `card-body` → replace with `row-gap-3 column-gap-3`, which is Bootstrap-only and reads 16px under every face. M3 reads `gap-3` at 16px to 12px on 245 pairs.
- `w-100` → replace with `col-12` on wrappers the showcase adds. `col-12` is a shared component, so Bootstrap keeps it under the layer; inside a flex container it reads `flex: 0 0 auto; width: 100%`. Keep `w-100` where Bootstrap's documented markup carries it (carousel `img.d-block.w-100`). Under the layer such an element reads Tailwind's 400px, which is the honest reading.
- `mb-0`, `flex-wrap`, `bg-transparent`, and `mt-1` → keep. Each computes the same value under both maps: 0px, `wrap`, `transparent`, and 4px.
- The caption `code` tokens follow preflight (12.25px to 14px, M3, 357 pairs) → accept. Each is a bare `code` element with a utility class only, so the departure is Tailwind's.

## 6. Records and proofs

**Records:**

| Record | Fate |
| --- | --- |
| `tests/fixtures/tailwindcss/oracle.min.json` | Keeps its meaning |
| `comparison.json` | Keeps its meaning; its `.shared` list ∩ the utilities leaves defines the inclusion and the counters |
| `similar.json` | Keeps its meaning |
| `incompatible.json` | Keeps its meaning: Tailwind's rule on a shared name moving a longhand beside lifted Bootstrap. Exposure becomes `[built, recipe.unexcluded]`, the face without the layer, because the flipped sheet's counters would flip every shared name. Re-derived in U3; if the 2326 rows over 20 names change, U3 regenerates the record and the guide's counts |
| `preflight.json` | Changes meaning: the identity rows `(element, pseudo, longhand)` that `[built + recipe]` moves on bare elements away from `[built]`, generated on the engine host. Values are not stored, because 14 of 2598 rows differ between Chromium 141 and 153 in user-agent form metrics (M2 § 4) |
| `tests/fixtures/tailwindcss/recipe.json`, `app/browser/recipe.json` | Same shape. `recipe` holds the flipped compile, `unexcluded` the compile with the extended statement, and `sheet` the updated digest |
| Curation table (guide) | Added; pinned both ways (§ 4) |
| Exemption table (guide) | Keeps its one `[hidden]` row. Reason: preflight's layered important already outranks Bootstrap's unlayered `[hidden]` and `.d-*` rules, and a normal counter changes nothing |

**Host-independent preflight proof.** The live case enumerates the host's computed longhands and filters the record to the longhands that host enumerates. On Chromium 141 the filter removes the 16 `row-rule-color` rows (M2 § 4). The case then asserts that the live moved set equals the filtered record, and that every filtered-out longhand is absent from the host's enumeration, so a typo cannot hide behind the filter. Values are compared live, `[built]` against `[built + recipe]` on the same host. The three host-bound titles (`scout-distillate.md:85`) are retitled and pass on both hosts.

**Cases in `tests/integration.test.ts`:**

- `preflight reset drift` (`:323-380`):
  - `pins the live moved rows...` inverts to the flipped identity set with the host filter, keeping its planted and removed controls.
  - `restores every recorded longhand with base revert counters...` inverts to `moves every recorded longhand with the reboot counters and reads lifted Bootstrap on the reboot rows with the counters stripped`.
  - `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win` stays, with its counter moved into the `bootstrap` layer under the `html body` prefix.
- `compiled Tailwind compatibility recipe` (`:385-515`):
  - The `[hidden]` case stays with a retitle that names R1.
  - `places properties below reset...` stays.
  - `restores bare images and lists...` inverts: block and none under the recipe, plus bare `p` and `ul` margins at 0px that read 16px with the counter block deleted.
  - `keeps the height attribute...` inverts: preflight's `height: auto` beats the attribute under the recipe.
  - `keeps a reset layer value...` goes, because the mirror is gone.
- `computed Tailwind class relationships` (`:530-729`):
  - The partition case keeps its relationships and its incompatible pin against the face without the layer. Its "restores every carrier" clause inverts to "each shared utility's delta under `[built, recipe]` equals its delta under `[unexcluded]`, and each shared component's delta equals Bootstrap's".
  - `restores every preflight row...` inverts to the moved rows with a counters-stripped control.
  - The collapse case stays.
  - The disjointness case stays. `SHEET_LAYERS` for `./tailwindcss` becomes `bootstrap`, `base`, and `compatibility`, and `collectLayerClasses` stops counting class names that sit inside `:not()`.
  - The border case stays.
- `cross-face composition` stays, including the 24 permutations.
- Added Chromium cases: one per consumer row in § 2 (unlayered important, unlayered normal, `!` modifier, `@layer utilities` important, `@theme`, class-based `dark:`). Also one consumer `@layer base` rule losing to the reboot on `line-height`, the limit witness.

**Cases in `tests/conformance.test.ts` `Tailwind compatibility recipe` (Node):**

1. `pins the exclusion statement...` inverts to two statements partitioning the registry.
2. The mirror case inverts to the counter projection with both tables.
3. `excludes Bootstrap candidates while retaining px-8...` inverts. Every non-shared name stays absent, all 192 are emitted with only `px-8` as a candidate, and a stripped exclusion brings `collapse` back.
4. `excludes theme-generated and user-defined Bootstrap names` stays and gains `@utility mt-3` reaching the compile.
5. The exact-candidates case inverts its subject from `mt-3` to `collapse`.
6. The census case stays.
7. The `@apply` refusal inverts to `@apply collapse`; `@apply mt-3` compiles.
8. The placement case is retitled to counters.
9. The record case stays.
10. The showcase record case inverts: `recipe` classes equal `TAILWIND_CLASSES` ∪ the 192.

Added in Node: the shared-counter projection and the specificity bound on projected selectors.

**Cases in `tests/src/tailwindcss/index.test.ts` (Chromium):**

- Owned layers become `bootstrap`, `base`, and `compatibility`, and important declarations appear only in `compatibility`.
- `declares no class name` inverts. The `compatibility` census equals the 192, the positive `bootstrap` census is empty, the negated census equals the curation classes, and the `base` census equals the base rows.
- The directive case inverts to the partition.
- Added: bare `h5` reads 16px and `p.h5` reads 20px under the built sheet with a preflight fixture; `mt-3` reads Tailwind's value with a utilities fixture and 0px without one.

**Journeys (Chromium):**

- J4 drives all three faces.
- J6 reads every face.
- The partition and matrix cases follow § 5.

**Regeneration.** U0 checks `/home/user/veneer/tmp/units/` for the named writers (`brief.md:40`). If they are absent, U2 and U3 write the replacements under `tmp/units/`, as ruling 4 requires:

- `tailwind-flip-recipes.ts` (Node) compiles both recipe records with the options `compileRecipe` uses (`tests/setupServer.ts:962-975`).
- `tailwind-flip-rows.ts` (Node with Playwright Chromium, launched as the measurement probes launch it) writes the preflight identity set and re-derives `incompatible.json`.

The committed live cases are each writer's proof, both ways.

## 7. Guide and roadmap

**`guides/veneer.md`:**

- § Tailwind compatibility sheet (`:1197-1320`) is rewritten. Sentences to reverse:
  - "ships only the compatibility changes that keep real Tailwind's styles aligned with Bootstrap instead of fighting it" (`:1199-1200`).
  - "generates none of those names, so a Bootstrap class keeps Bootstrap's rule" (`:1234-1235`).
  - "The sheet declares no class name" (`:1251`).
  - the mirror paragraphs (`:1256-1312`).

  The section adds the counters, the inclusion, the curation table, the Tailwind-absent refusal, and override rows for unlayered importance, unlayered normal rules on shared names, the `!` modifier, and `@layer base`.
- § Composition (`:1444`): reverse "The `bootstrap` layer follows the `base` layer, so Bootstrap's reboot beats Tailwind's preflight". It becomes: the `bootstrap` layer follows `base`, so the compatibility sheet's counters roll a reboot declaration back to preflight from inside it. Add: the `compatibility` layer follows `utilities`, so its important counters roll back to Tailwind's utility.
- § Load real Tailwind (`:1452-1517`): update the recipe line and reasons 2 and 3. Reverse "the `mt-3` class keeps Bootstrap's 16 px top margin instead of Tailwind's 12 px" (`:1486-1487`) and the `@apply mt-3` sentence (`:1491-1495`).
- § Compare Bootstrap and Tailwind: update the record meanings for `preflight.json` and `incompatible.json`.
- § Showcase:
  - "two stylesheet sets" becomes three (`:1641`).
  - Reverse "because each figure carries `card h-100`" (`:1655`).
  - § Faces: reverse the face table, "Both faces must read the same" (`:1700`), the height paragraph (`:1703-1707`), and the readings table and its last-row note (`:1713-1727`).
  - § Tailwind record: "The page imports the `recipe` field alone" (`:1782`).
  - § Census limit and § Statecharts: change the face counts.

**`ROADMAP.md`:**

- Rewrite the "compatibility sheet ships only ... declares no class name ... mirrors Tailwind's preflight" and "Bootstrap wins on a shared class" sentences (`:15`).
- Change the statement (`:26`).
- Reverse "`bootstrap` follows `base` so Bootstrap's reboot beats Tailwind's preflight" (`:29`).
- The `./tailwindcss` row (`:36`) becomes `bootstrap` (reboot counters, element selectors only), `base` (curation repairs), and `compatibility`.
- Rewrite "No face writes `base` ... except `./tailwindcss`, whose preflight mirror" (`:40`), the recipe paragraph (`:44`), and the face bullet (`:54`).

Tenet wording: "At every conflict between Bootstrap and real Tailwind, a shared class name or a bare-element declaration both resets make, Tailwind wins. The compatibility sheet yields each conflict to Tailwind and repairs, on the component class, every Bootstrap component the flip breaks."

**Scaffold `.orkestrel/veneer/plan.md:11`:** append "reversed by the user's ruling of 2026-10-04 (`tailwind-flip/design-verdict.md`): Tailwind wins at every conflict, and the compatibility layer curates the flip so Bootstrap's components keep working." Also update `lanes.md` § Host-bound set by title after U3.

## 8. Units

All units run serially on one checkout with one writer. Objective units run on GPT-6 Astra through `codex exec`. Subjective units run on Opus with edits only, and the Orchestrator runs their commands (`plan.md:18`). Each unit's acceptance runs cheap-first: regenerate, `npm run check`, `npm run lint:check`, then the scoped tests.

| Unit | Lane | Owns | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| U0 `flip-probe` | objective (Astra) | `tmp/probes/flip-thin/` and a report beside the campaign records | none | P1 to P3 readings recorded; `git status --porcelain` prints nothing |
| U1 `flip-order` | objective | the three `_tokens.scss` statements, `tests/setup.ts` `LAYER_ORDER`, every statement copy listed in § 2, digest pins of the built `./bootstrap` sheet, both `recipe.json` files | U0 | `npm run build`; `test:src:bootstrap`, `test:src:tailwindcss`, `test:src:styles`; the conformance file; the integration file. Link 1, 2, and 3 and the 24 permutations stay green |
| U2 `flip-sheet` | objective | `src/tailwindcss/**`, `tests/setupServer.ts` (`collectCounters`, `collectShared`), `tests/setup.ts` (`readCuration`), the empty curation table in the guide, the conformance recipe describe, `tests/src/tailwindcss/index.test.ts`, both `recipe.json` files, `tests/setupServer.test.ts`, `tests/setup.test.ts` | U1 | `build:src:tailwindcss`; `check`; the conformance file; `test:src:tailwindcss`; the setup projects |
| U3 `flip-composition` | objective | `tests/integration.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `preflight.json`, `incompatible.json`, record guards in `tests/setup.ts`, `tmp/units` writers | U2 | `npm run test:integration` read bare; zero failures in the retitled preflight cases on the cloud host |
| U4 `flip-curation` | objective | the curation table rows, `_reset.scss` exclusions and base repairs, both `recipe.json` files, curation witnesses in integration | U3 (M6 through `attributeDeparture`) | conformance, `test:src:tailwindcss`, integration |
| U5 `flip-showcase-content` | subjective (Opus) | `app/browser/types.ts` (`Face`), `constants.ts` (`FACES`, labels), `sections/tailwindcss.html`, chrome classes in factories, templates, and fragments | U4 | `check:app:browser`; the section integration file |
| U6 `flip-showcase-proofs` | objective | `Showcase.ts`, `tests/setupBrowser.ts` (readings, scenarios, `assertFace`), `tests/setupBrowser.test.ts`, `tests/app/browser/**`, `showcase/browser.html` | U5 | `test:setup:browser`, `test:app:browser`, `npm run build` then `npm run test:journey`, then `npm run build:showcase`, with the page committed |
| U7 `flip-guide` | subjective (Opus) | `guides/veneer.md`, `ROADMAP.md`, scaffold `plan.md` and `lanes.md` | U6 | `test:guides`, `test:policy`, `format:check` |

Gates before landing, run by the verifier: `format:check`, `lint:check`, `check`, `build`, `test:app:browser`, `test:setup:browser`, `test:src:browser`, `test:journey`, `test:integration`, `test:policy`, `test:guides`, `test:src:bootstrap`, `test:src:tailwindcss`, and `test:src:styles`. Every failure must sit in the named host-bound set, re-read by title. The showcase is rebuilt and committed, never hand-merged.

## 9. Risks and the first probe

**Readings available:** M1 to M5 and verify, all on Chromium 141.

**Readings missing:**

- The composition T itself; M2 and M3 read C and D.
- Normal `revert-layer` inside `bootstrap` competing with a later reboot rule (`measurements.md:33`).
- `@source inline` inside an imported sheet.
- The `dark:` and `@theme --spacing` cases.
- The repo's own preflight instrument run on Chromium 141.

The three claims most likely to fail, each with the probe that settles it:

1. **The `html body` reboot counters reproduce C on bare elements and spare classes.** Probe P1 (Node with Playwright, launched as `m2-bare-probe.ts` launches) mounts T = `tailwind-flipped.css`, a scratch `@layer bootstrap` projection from the record preflight, and `bootstrap-lifted.css`. It reads M2's 244 subjects and 406 longhands, expecting T = C on all 2792 rows and T = A elsewhere. Witnesses: `h4.h5`, `p.h1`, `span.small`, and `span.mark` read A, and `h4.modal-title.fs-5` reads weight 400. The same run executes the repo's `collectPreflightRows` composition on Chromium 141 and compares its identity set to `preflight.json`, expecting a difference of only the 16 `row-rule-color` rows. If the 12 unrecorded rows (`m2-bare.md` § 4) persist, the host filter alone cannot make the record portable, and U3 must regenerate the record on both hosts.
2. **The `compatibility` counters give Tailwind's delta for all 192 names, and `@source inline` emits them.** Probe P2 compiles `compileRecipe` with the extended statement and a scratch sheet over the candidates `['px-8']`. Expected: all 192 names emitted, none of the 1833, and the `@layer bootstrap` and `@layer compatibility` blocks kept byte for byte with `!important` intact. In Chromium, `readClassLonghands(shared, RELATION_WIDTHS, [built, flipped])` must equal `[unexcluded]` for the 192 and `[built]` for the 17. The probe also reads `--spacing: 0.3rem` (`mt-3` at 14.4px) and `bg-white` under a class-based `@custom-variant dark`.
3. **The curation closes small with exact attribution.** Probe P3 runs M3's population under T, without and with the provisional table, using the `attributeDeparture` algorithm. Expected: with the table, zero `preflight` departures on component-class elements outside the invisible set. Without it, exactly the table's rows. Rows outside the table extend it. If they number more than about 60, the definition in R5 goes back to the judges before U4.

## 10. What the user must rule

1. **Consumer unlayered rules on shared names.** A consumer's unlayered rule (normal or `!important`) and an inline `style` attribute lose to the `compatibility` counter on the properties of any shared name the element carries (M1 `b.1` to `b.4`, `e.3`). Default: accept and document the escape routes: Tailwind's `!` modifier, or a rule in `@layer utilities` with `!important`. The alternative is a second Bootstrap build that withholds the 192 rules.
2. **Consumer `@layer base` rules.** These lose to the reboot on longhands preflight never declares, such as heading `line-height` and body color, because `bootstrap` follows `base`. Default: accept, and document `@layer components` for such base styles. The alternative is the reboot in `reset`, which needs a second Bootstrap build and breaks `.h1` to `.h6` (M3 C).
3. **The appended layer.** The shared order statement gains a trailing layer named `compatibility`, which changes `./bootstrap`'s first statement and no computed value. Default: yes, with the name `compatibility`. Name and folder are subjective.
4. **Faces and labels.** Default: three faces labeled "Bootstrap only", "Tailwind without the layer", and "Tailwind with the layer".
5. **Curation scope.** The table covers the showcase's markup. A component class whose documented markup the page does not render, such as `h5.offcanvas-title` without `.h5`, reads Tailwind's reset. Default: accept and document. The alternative adds documented-markup witnesses to the curation population.
6. **Bare elements inside components.** Bare elements inside components belong to Tailwind, such as the breadcrumb's bare `a` and a bare `p` in `.card-body`. Default: yes, under rule (i).
7. **`./tailwindcss` outside the recipe.** Linked as CSS or compiled through Sass without Tailwind, the sheet withdraws Bootstrap's shared utilities and the reboot's shared declarations and puts nothing in their place. Default: keep both exports and refuse that composition in the guide. The alternative drops `./tailwindcss/scss`.
8. **The inclusion statement.** `@source inline` makes every consumer build emit the 192 shared utilities whether or not the consumer's sources use them. Default: yes, because a counter without Tailwind's rule reads the user agent's value.
