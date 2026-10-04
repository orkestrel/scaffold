# Tailwind flip: consumer-proof design

Lane: objective (correctness, constraints, and what the contracts permit), read from the seat of a Tailwind developer who adopts Bootstrap as a component library, and from what Chromium can pin on the cloud host (Chromium 141) and the engine host (Chromium 153). The face labels, the caption wording, and the specimen order are offered for the subjective lane to rule (section 10). Every value marked "predicted" comes from M1, M2, M5, or M6 and is measured by unit U1 before any unit commits it.

## 1. Rulings

**R1 (Q1, the 192 shared utility names).** Bootstrap yields by withholding. The Tailwind-tuned build is the same `$utilities` map emitted by the same `utility` mixin (`veneer/src/bootstrap/_mixins.scss:18-70`) with a `$withhold` list of the 192 shared utility names, so the tuned sheet ships no `.mt-3` rule and Tailwind's `@layer utilities { .mt-3 { margin-top: calc(var(--spacing) * 3) } }` is the only rule a consumer's page holds for the name (M5, `measurements.md:20`). The sheets lane removed exactly 199 rules for these names, 192 unlayered `!important` rules and 7 layered `--bs-*-opacity: 1` halves, with zero loose survivors (`measurements/verify.md:33`). Candidate (b), a layered `revert-layer !important` counter, is rejected: M1 reads it effective only from a layer named after `utilities` (`measurements/m1-cascade.md:20`), which the shared order statement does not hold; it reads the user-agent value wherever Tailwind does not generate the name; and as a layered important it outranks a consumer's unlayered normal and important rules on the same element (M1 rows b.1 to b.4 and e, `m1-cascade.md:18`, `:26`), where Tailwind alone lets those consumer rules win. Candidate (c) is refused by the brief (brief line 56). No fourth mechanism is needed.

**R2 (Q2, the 17 shared component names).** Bootstrap keeps `collapse`, `container`, `table`, `col-1` to `col-12`, `col-auto`, and `caption-top`; the exclusion statement withholds Tailwind's rule. `incompatible.json` records what Tailwind's rule does to each component (`visibility: collapse`, 10 container longhands, `display` on `table`, `grid-column-start` on `col-*`), and M3 under the flipped compile, which excludes them, reads zero `visibility`, `opacity`, `pointer-events`, `position`, `overflow`, or `z-index` departures on component-class elements (`measurements/m3-functional.md`). `caption-top` declares `caption-side: top` in both maps; it stays excluded with its category, so every component name keeps one rule and the exclusion stays a rule a reader can derive from `CLASS_NAMES.bootstrap` and `comparison.json`. A Tailwind developer reading `container` or `col-6` gets Bootstrap's grid, the component library they adopted. Section 10 asks the user to confirm this reading of R1.

**R3 (Q3, the exclusion).** The statement names every Bootstrap class name except the 192 shared utilities: 1833 names (`measurements/verify.md:35`). Under it, M5 reads `mt-3`, `border-1`, `rounded`, `shadow`, `px-8`, `md:flex`, `mt-[1rem]`, and `bg-sky-500` emitted, and none of `collapse`, `container`, `table`, `col-1`, `caption-top`, `btn`, `bg-primary`, or `text-primary`; with `@theme { --color-primary: #0d6efd; }` the compile is byte-identical (`measurements.md:13-14`, `:20`). The consumer-theme limit: a Tailwind theme token whose generated name is a Bootstrap class name (`bg-primary`, `text-primary`, `border-primary` from `--color-primary`) generates nothing, `@apply` of that name fails with Tailwind's "explicitly disabled" error, and Bootstrap's rule for the name applies; a name the token generates that Bootstrap does not declare compiles. Naming only the 17 components is rejected, because a consumer `@utility btn` rule then writes a Tailwind rule over Bootstrap's `.btn` component (`tests/conformance.test.ts:1231`). Naming nothing is rejected by R2.

**R4 (Q4, preflight authority).** The mirror goes. In the tuned build every reboot rule emits verbatim inside `@layer reset`, so preflight in `base` wins every declaration both resets make and the reboot supplies what preflight never declares; each reboot rule also emits a copy inside `@layer bootstrap` that holds its class compounds (`.h1` to `.h6`, `.small`, `.mark`) and its element compounds restricted to the curated component classes (section 4). M2 reads 198 more bare-element rows moving to preflight with the reboot in `reset` (headings 16 px at weight 400, `p` bottom margin 0 px, `a` inheriting color without underline, list padding 0 px), while body color, background, font, and size keep Bootstrap's values (`measurements/m2-bare.md` sections 3 and 6). M6 shows why class compounds must not move: with the whole reboot in `reset`, `.h1` on an `h1` reads 16 px while `.h1` on a `div` keeps 40 px (`measurements.md:63-73`). The important declarations: `[hidden] { display: none !important }` (`veneer/src/bootstrap/_reset.scss:382-384`) is withheld from the tuned build, because preflight declares `[hidden]` display itself and exempts `hidden="until-found"`, an exemption Bootstrap's unlayered rule overrides; `<div hidden class="d-flex">` reads `none` with or without it (M2 section 5). The datalist indicator rule (`_reset.scss:281-285`) stays unlayered through `unlayer`; preflight declares no `display` there, and Chromium 141 exposes no witness (M2 section 5). Dropping the reboot is refused: body color and background, the datalist rule, and every component's inherited typography would go. Moving `base` is refused: the order statement is shared.

**R5 (Q5, curation).** A component is broken when an element carrying a `CLASS_NAMES.bootstrap.components` name reads a different computed longhand than under `./bootstrap` alone on the same markup, viewport, and color mode, and the departure is none of: a layout consequence, invisible by rule, declared by a shared utility the element carries, or inherited from a departing parent (section 4 states each clause). The layer repairs every such departure on the class, never globally: candidate (i), refined. Repairs take two forms, both Tailwind-agnostic in source: the reboot copy restricted to the curated classes (Bootstrap's own reboot declarations at Bootstrap's own specificity), and restore rows that set a longhand to `revert` (the browser default, which is what Bootstrap alone computes there). M3 supplies the seed: `.modal-title` loses weight 500, `.card-text` its 16 px margin, `.pagination` its 16 px margin, `.stretched-link` and `.visually-hidden-focusable` their link color, and `svg.bi` and `img.figure-img` turn `block` (`measurements.md:51-52`). Candidate (ii) is rejected: it hands a Tailwind developer's own bare `p` inside `.card-body` Bootstrap margins, which R1 gives to preflight. Candidate (iii) is rejected: M3 finds 7 functional rows, and the visible title typography would stay broken.

**R6 (Q6, surface).** `./tailwindcss` becomes Bootstrap for Tailwind: the tuned build, the exclusion statement, and the curation, in one sheet. The three recipe lines stay byte for byte, and with Tailwind the consumer links no `./bootstrap`. M6 reads Tailwind inlining the lifted sheet inside the recipe as semantically equal, 8093 of 8094 flattened rows, with one merged rule and empty layer blocks rewritten as statements (`measurements.md:77`). The thin-sheet alternative with a `./bootstrap/tailwind` export is rejected in section 2.

**R7 (Q7, showcase).** Three faces: Bootstrap only, Tailwind without the layer (the `unexcluded` compile before the Bootstrap sheet), and Tailwind with the layer (the recipe compile alone). The face-invariance proof becomes a departure-partition proof, and the `unexcluded` compile becomes a face whose partition fails on the `collapse show` panel. M3's census, 1482 of 4005 elements carrying a shared utility at 1280 px (`measurements.md:53`), is why invariance cannot survive and a partition can.

**R8 (Q8, records).** `oracle.min.json`, `comparison.json`, and `similar.json` keep their meaning. `incompatible.json` keeps its rows and narrows its meaning to what Tailwind breaks without the layer. `preflight.json` keeps its rows as the bare-element longhands Tailwind sets, read through a reproduction filter that passes on both hosts: M2 reproduces 2568 of 2598 rows on Chromium 141, and every unreproduced row sits on `button`, `input`, `select`, or `textarea` (`m2-bare.md` section 4). Both `recipe.json` records keep their shape and change content. The curation table is the added record, kept in the guide like the exemption table it replaces.

**R9 (Q9, prose).** The guide's Tailwind compatibility sheet, Composition, Load real Tailwind, Compare, Faces, and Tailwind record sections, `ROADMAP.md`'s Tailwind tenet and Cascade contract, and `plan.md` § Standing rulings reverse "Bootstrap wins on a shared class" and "`bootstrap` follows `base` so reboot beats preflight". Section 7 lists the sentences and the tenet wording.

**R10 (Q10, units).** Eight units in one checkout, one writer at a time: a probe unit first, then the sheet, the records, the composition proofs, the showcase application, the journeys, the prose, and the gates with the showcase rebuild (section 8).

## 2. Mechanism

### Sass shapes

The Bootstrap face gains four switches, configured from its `_tokens.scss` exactly as `$layered` is (`veneer/src/bootstrap/_tokens.scss:2-5`); their defaults emit today's drop-in and lifted forms unchanged. The following fence shows the additions to `src/bootstrap/_mixins.scss`:

```scss
// _tokens.scss configures these switches; the defaults emit the drop-in and lifted forms unchanged.
$withhold: () !default; // class names whose exact `.NAME` utility rules the emitter skips
$reset: false !default; // emit the reboot inside `reset` and its curated copy inside `bootstrap`
$curated: () !default; // component classes whose elements keep the reboot over preflight
$restored: () !default; // map of selector to longhands that read the browser default

@mixin reboot {
	@if $reset {
		@layer reset {
			@content;
		}
	} @else {
		@include layer {
			@content;
		}
	}
}

// Keeps every class compound of a reboot selector and restricts every element compound to
// elements carrying a curated class; returns null when nothing remains.
@function restrict($selector, $classes) {
	// ...selector.parse, then selector.unify with ':where(.CLASS, ...)' on each element compound
}

@mixin curate {
	@content;
	@if $reset {
		$copy: restrict(&, $curated);
		@if $copy {
			@at-root (without: layer rule) {
				@layer bootstrap {
					#{$copy} {
						@content;
					}
				}
			}
		}
	}
}

@mixin restore {
	@if $reset {
		@layer bootstrap {
			@each $selector, $properties in $restored {
				#{$selector} {
					@each $property in $properties {
						#{$property}: revert;
					}
				}
			}
		}
	}
}
```

The `utility` mixin skips a selector whose name, without its dot, is a member of `$withhold`, together with its `local-vars` declarations; no shared name has a breakpoint, print, or state form, so only 199 base-pass rules go (`measurements/sheets.md`). `_reset.scss` changes its wrapper from `@include layer {` (`:3`) to `@include reboot {`, wraps each rule's declarations in `@include curate { ... }`, guards the `[hidden]` rule with `@if not $reset`, and ends with `@include restore;` at top level. `restrict` has this contract, with `$curated` set to `(card-text, modal-title)` for the example:

| Reboot selector | Copy selector |
| --- | --- |
| `h1, .h1` | `h1:where(.card-text, .modal-title), .h1` |
| `*::before` | `*:where(.card-text, .modal-title)::before` |
| `ol ul` | `ol ul:where(.card-text, .modal-title)` |
| `small, .small` | `small:where(.card-text, .modal-title), .small` |
| `p` with `$curated` empty | no copy |

The copy keeps the reboot's own specificity, because `:where()` adds none, and sits at the reboot's position inside `bootstrap`, ahead of every component partial. On a curated element the copy therefore resolves against Bootstrap's component rules exactly as the reboot does under `./bootstrap` alone, and it beats preflight by layer order.

The Tailwind face configures the Bootstrap tokens before anything else emits. The following fence shows `src/tailwindcss/_tokens.scss` after the flip:

```scss
// The shared utility names: Tailwind generates them and Bootstrap withholds its rule.
$shared: (
	'align-baseline',
	// ...the 192 names of comparison.json's shared set filed as utilities, sorted by code unit
	'z-3'
);
// The curation table's reboot rows and restore rows, in the guide's order.
$curation: ('card-text', 'modal-title' /* ...the measured rows */);
$defaults: ('svg:where(.bi)': (display,), 'img:where(.figure-img)': (display,));
@use '../bootstrap/tokens' with (
	$withhold: $shared,
	$reset: true,
	$curated: $curation,
	$restored: $defaults
);
@source not inline('accordion accordion-body ... z-index-...');
```

Sass admits variable declarations ahead of the `@use` they configure, so the Bootstrap tokens module emits the order statement first. `src/tailwindcss/index.scss` becomes `@use 'tokens'; @use '../bootstrap/reset'; @use '../bootstrap/elements'; @use '../bootstrap/components'; @use '../bootstrap/utilities'; @use 'elements'; @use 'components'; @use 'utilities';`, the last three being the face's empty barrels. Every Bootstrap partial loads the one configured `mixins` instance. `src/bootstrap/index.scss:1` keeps `@forward 'tokens' show $layered`, so the Bootstrap barrel exposes no Tailwind switch.

### CSS the tuned sheet ships

For `mt-3` there is no counter: the tuned sheet ships no `.mt-3` rule, where the lifted sheet ships `.mt-3 { margin-top: 1rem !important; }` unlayered. The compiled recipe holds Tailwind's rule alone.

For the reboot's heading rules (`_reset.scss:33-54`), the tuned sheet ships the following, here with `$curated` set to `(card-text, modal-title)`:

```css
@layer reset {
  h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
    margin-top: 0; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: var(--bs-heading-color);
  }
}
@layer bootstrap {
  h6:where(.card-text, .modal-title), .h6, h5:where(.card-text, .modal-title), .h5, /* ...through h1 */ .h1 {
    margin-top: 0; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: var(--bs-heading-color);
  }
}
@layer reset { h1, .h1 { font-size: calc(1.375rem + 1.5vw); } }
@layer bootstrap { h1:where(.card-text, .modal-title), .h1 { font-size: calc(1.375rem + 1.5vw); } }
```

The exclusion statement is one top-level `@source not inline("...")` naming the 1833 names, sorted by code unit; Tailwind consumes it and no compiled output carries it (M5). A restore row ships as `@layer bootstrap { svg:where(.bi) { display: revert; } }`.

### Layers

The following table places each part of the tuned sheet:

| Part | Layer | Source |
| --- | --- | --- |
| Order statement | statement | Bootstrap `_tokens.scss:8-10` |
| `:root` tokens, components, the 1265 minus 192 utilities' normal halves | `bootstrap` | lifted emission |
| Reboot rules, minus `[hidden]` | `reset` | `_reset.scss` through `reboot` |
| Reboot copy: class compounds and curated element compounds | `bootstrap`, at the reboot position | `_reset.scss` through `curate` |
| Restore rows | `bootstrap`, after the reboot | `restore` |
| Remaining `!important` declarations | unlayered | `unlayer` |
| Exclusion | statement Tailwind consumes | Tailwind `_tokens.scss` |

### What a consumer reads

The following table states what each composition computes, in Chromium, for the cases the dispatch names; values marked with an asterisk are predicted.

| Case | `./bootstrap` alone | Tailwind without the layer | Tailwind with the layer (recipe) |
| --- | --- | --- | --- |
| `mt-3` on a bare `div` | 16px | 16px (Bootstrap's unlayered important) | 12px (Tailwind's rule alone) |
| Bare `h1`: size, weight, bottom margin | 40px, 500, 8px | 40px, 500, 8px (`bootstrap` follows `base`) | 16px, 400, 0px (M2) |
| `h1.h1` | 40px | 40px | 40px* (class compound in `bootstrap`) |
| `h5.modal-title` | 20px, 500 | 20px, 500 | 20px, 500* (curated) |
| Consumer unlayered `.mt-3 { margin-top: 2rem !important }` loaded later | 32px | 32px (later of two unlayered importants) | 32px (unlayered important beats layered normal) |
| Consumer `@theme { --color-primary: #7c3aed; }` and `bg-primary` | Bootstrap's blue | Bootstrap's blue: Tailwind emits `.bg-primary` in `utilities`, Bootstrap's unlayered important wins | Bootstrap's blue: Tailwind emits nothing (M5); `@apply bg-primary` fails |
| `mt-3!` (Tailwind's important modifier) | 0px (no rule) | 12px | 12px; it also beats a consumer's unlayered `!important` (M1 b.1 to b.4) |
| `d-flex hidden!` on one element | flex | none (layered important beats unlayered important) | none |
| `d-flex hidden` on one element | flex | flex | flex: two different names, no R1 conflict; Bootstrap's important wins unless the consumer writes `!` |
| `bg-white dark:bg-black` under an operating-system dark scheme | white | white (Bootstrap's important `bg-white`) | black (both rules Tailwind's) |

Without Tailwind, a Bootstrap-only consumer links `./bootstrap` and reads every byte unchanged. `./tailwindcss` linked without a Tailwind compile is unsupported: the browser drops the `@source` statement, the 192 shared names have no rule, and bare elements read the reboot from `reset`. Tailwind 4.3.3 compiles `dark:` inside `@media (prefers-color-scheme: dark)` (guide § Color mode limit, `veneer/guides/veneer.md:1805-1810`); a consumer who wants `data-bs-theme` adds their own `@custom-variant dark` line, outside the recipe, and the showcase uses no `dark:` utility.

### Alternatives rejected

- A thin counter sheet, candidate (b): rejected for the three readings in R1, and because the shipped bytes would carry every withheld Bootstrap rule plus a rule to cancel it.
- A thin `./tailwindcss` beside a `./bootstrap/tailwind` export that carries the tuned build: rejected, because the consumer then imports two Veneer sheets in the Tailwind entry, the recipe gains a fourth line, the Bootstrap face exports a Tailwind-specific artifact, and a consumer who links `./bootstrap` instead of `./bootstrap/tailwind` restores Bootstrap's authority silently.

### Constraints

- One emitter home: `_mixins.scss` holds functions, emitters, and the `!default` switches `_tokens.scss` configures (`/home/user/scaffold/.claude/rules/styles.md:19`) and emits no top-level CSS (`:30`); `curate`, `restore`, `reboot`, and `restrict` live there and emit only when a partial includes them.
- Literal `@layer` and `!important` appear only in `_mixins.scss` and `_tokens.scss` on the Bootstrap face (`veneer/ROADMAP.md:100`, the `src:bootstrap` textual guard).
- Every published sheet opens with the same full order statement (`styles.md:75`); the tuned sheet's first rule is the statement the Bootstrap tokens emit.
- The Bootstrap drop-in links hold: the `./bootstrap` built bytes and the `./bootstrap/scss` barrel API do not change (brief line 56, `veneer/src/bootstrap/index.scss:1`).
- The map stays internal and `src/core` holds no Tailwind group (brief line 55): `$shared` and the exclusion name Bootstrap classes only and carry no Tailwind value; neither enters `src/core` or a JavaScript export.
- `properties` placement: the recipe text stays `veneer/tests/setupServer.ts:945`.
- An extension face imports no other extension's face (`/home/user/scaffold/AGENTS.md:28`): the design needs one Sass dependency from `src/tailwindcss` on `src/bootstrap` partials; section 10 asks the user to grant it.

### Refusals

- A layer after `utilities`: refused by "Declare cascade-layer order once in the consumer entry before `@import 'tailwindcss'`, so utilities win predictably. When a package publishes several sheets, open every published sheet with the same full order statement" (`styles.md:75`).
- A Tailwind-face partial writing `@layer bootstrap`: refused by "Never wrap rules in a foreign cascade layer. Each partial uses its folder's own layer." (`styles.md:72`); the curated copy is the Bootstrap face's own emission under its switch.
- Post-processing the built CSS to split selectors: refused by "Add no second parser for TypeScript, Oxlint, Vue, HTML, CSS, or Vite." (`AGENTS.md:30`).
- Installing `@tailwindcss/postcss` or `@tailwindcss/vite` for a bundler probe: refused by "**NEVER** add an npm package unless the user explicitly requests it" (`AGENTS.md:38`).
- A record writer run as `node` that imports the Tailwind compiler: refused by "write a script as TypeScript run by Node (`node path/to/script.ts`, type stripping, `node:` modules only)" (`AGENTS.md:47`); section 6 states the writer form.

## 3. Surface

### What ships

`./bootstrap` ships the lifted sheet with every byte unchanged; U2's first acceptance criterion compares the SHA-256 of `dist/src/bootstrap/index.css` before and after the sheet unit. `./bootstrap/scss` keeps `$layered` as its one forwarded switch.

`./tailwindcss` ships Bootstrap for Tailwind: the order statement, the Bootstrap banner and `:root` tokens, the exclusion statement, the reboot in `reset` without `[hidden]`, the curated reboot copy and the restore rows in `bootstrap`, every lifted component and utility rule except the 199 withheld rules, and the unlayered important declarations. It declares Bootstrap class names, which reverses `veneer/tests/src/tailwindcss/index.test.ts:40`.

### Exports, barrels, wrappers, and files

The following list states each published path after the flip:

- `package.json:56-57`: `./tailwindcss` → `dist/src/tailwindcss/index.css` and `./tailwindcss/scss` → `src/tailwindcss/index.scss`, unchanged.
- `package.json:13-20`: `files` keeps `src/bootstrap/**/*.scss` and `src/tailwindcss/**/*.scss`, so the packed `./tailwindcss/scss` barrel resolves its `../bootstrap/` partials; `!dist/src/tailwindcss/index.js` stays.
- `configs/src/vite.tailwindcss.config.ts`: unchanged; CSS library builds keep `cssMinify` off (`ROADMAP.md:68`).
- `src/tailwindcss/_reset.scss`: deleted, because the face owns no reset (`styles.md:22`).
- `src/tailwindcss/_mixins.scss` and the `elements/`, `components/`, and `utilities/` barrels: kept as structural files, empty.
- `src/tailwindcss/sheet.ts` and `index.ts`: unchanged.

### Recipe

The consumer writes the same three lines (`veneer/guides/veneer.md:1456-1460`): the literal order statement, `@import 'tailwindcss';`, and `@import '@orkestrel/veneer/tailwindcss';`. Tailwind prepends `@layer properties;`, then the literal statement, Tailwind's own statement, Tailwind's blocks, and the inlined tuned sheet (M6 placement, `measurements.md:77`). The consumer links `./styles` and `./styles/themes` after the compiled sheet and never links `./bootstrap` beside it; a composition proof pins the refusal (section 6).

### Derivation proof

Every shipped byte ties to a record or to the Bootstrap source, by four pins:

1. Text, Node: the Sass compile of `src/tailwindcss/index.scss` equals the built sheet after one Sass round trip on each side, the link 2 analog.
2. Text, Node: the exclusion names equal `CLASS_NAMES.bootstrap` minus the 192 names, and `$shared` equals `comparison.json`'s shared set filed as utilities, each with a dropped and an appended control.
3. Sequences, Chromium (`src:tailwindcss`): with the link 3 instrument, the tuned sheet's normal and important sequences equal the lifted sheet's sequences transformed by exactly these steps, in order: remove every entry whose selector is exactly `.NAME` for a `$shared` name, and the `[hidden]` entry; relocate every reboot entry from `bootstrap` to `reset`; insert after each reboot entry its copy with the selector `restrictSelector` returns (a TypeScript twin of `restrict` in `tests/setupStyles.ts`, proved in `tests/setupStyles.test.ts`) when that selector is not empty; append the restore rows the curation table names. Controls: a planted rule, an unwithheld `.mt-3`, and a copy missing one curated class each fail.
4. Compile, Chromium (`integration`): the recipe compile, flattened in CSSOM to context, selector, property, value, and priority rows and stripped of Tailwind's own blocks, equals the flattened tuned sheet except the one rewrite M6 measured (the merged `.dropstart .dropdown-toggle::after` rules and their overridden `display: inline-block`), pinned as a one-row rewrite record in the case.

## 4. Curation

### A broken component, measurably

Read the same markup under `./bootstrap` alone (A) and a Tailwind composition (F) on one host, viewport, and color mode, over every enumerated computed longhand, and list each element's departures. A departure on an element carrying a `CLASS_NAMES.bootstrap.components` name breaks the component unless it is one of these kinds:

- Layout consequence: the `box` field, or a longhand whose resolved value is a used value: `width`, `height`, `inline-size`, `block-size`, the four physical and four logical insets, `perspective-origin`, and `transform-origin`.
- Invisible by rule: `tab-size`; a `border-*-style` moving `none` to `solid` where that side's width reads `0px` under A and F; a `list-style-*` longhand where the element's `display` is not `list-item` under A and F; the `text-decoration` shorthand, which double-counts its longhands (`measurements/verify.md:37`).
- Utility: the element carries a shared utility name whose Tailwind rule, read from F's CSSOM inside `@layer utilities` with the exact selector `.NAME`, declares the longhand.
- Context: the element's parent departs in the same longhand or in `font-size`.

Each condition names values read live on the host, never a stored list of longhands, so the definition reads the same on Chromium 141 and 153.

### The rule that decides what the layer repairs

The layer repairs every breaking departure, on the class, by one of two forms. A reboot row adds the class to `$curated`, which restores every reboot declaration on elements carrying it at the reboot's own specificity and position. A restore row sets the departing longhand to `revert` on `TAG:where(.CLASS)` for a preflight declaration the reboot never makes. The layer never repairs a Utility departure (R1) and never restores Bootstrap on an element without a component class.

### Deriving the table from M3

U1 derives the table by a fixed point over the built tuned sheet, not over CSSOM-serialized deletions, so the 171 artifact rows `measurements/verify.md:41-48` names do not arise:

1. Build with `$curated` and `$restored` empty. Read A and F over the 55 fragments at 1280x800 and the 6 at 390x844 (M3's population), the two specimens section 5 adds, and the open states of the tooltip, popover, dropdown, modal, offcanvas, and toast families, in both color modes.
2. Classify every component departure by the four kinds. For each breaking departure, add a reboot row when a reboot declaration for the element's tag declares the longhand, and a restore row otherwise; the class added is every component class the element carries.
3. Rebuild and repeat until no breaking departure remains. A departure a row introduces on a descendant (a restored heading weight that a child `button` inherits through preflight's `font: inherit`, as `h4.accordion-header` with `.accordion-button` would) is resolved by adding that descendant's class, never by removing the parent's row without a reading.

The predicted seed, read from `measurements/m3-curation-candidates.md` and `m3-functional.md`: reboot rows `card-text`, `card-title` (the added card specimen), `modal-title`, `pagination`, `stretched-link`, and `visually-hidden-focusable`; restore rows `svg:where(.bi)` `display` and `img:where(.figure-img)` `display`. Excluded by the kinds: the 2943 `tab-size` and zero-width border-style rows; the `list-group` `disc` rows (no marker renders); the `shared-utility-self` and `shared-utility-ancestor` rows such as `w-100`, `gap-3`, `p-3`, `mt-3`, and `mb-3` (`measurements.md:52`); the `.h5`, `.h6`, and `.mark` class rows (`offcanvas-title h5`, `card-title h5`, `popover-header h6`, `mark` on a `span`), which the class compounds in `bootstrap` repair without a row.

### Where the repairs live

Both forms are emitted by the Bootstrap face's own `_reset.scss` under `$reset`, configured by the Tailwind face's `$curation` and `$defaults` lists. The guide's Tailwind section holds the curation table, one row per class or selector, with its form, its longhands, its witness markup in fictional descriptive data (`<h4 class="modal-title">Berth 12 assigned</h4>`), and the reading behind it.

### Pinned both ways

- Table and tokens, Node (`conformance`): `$curation` and `$defaults` in `src/tailwindcss/_tokens.scss` equal the table's rows in order; a planted row and a removed row each fail.
- Table and sheet, Chromium (`src:tailwindcss`): for each row, its witness markup reads under the recipe record what it reads under the lifted sheet in the row's longhands; with the row's class removed from every copy selector (`selectorText` rewritten in CSSOM) or its restore rule deleted, the witness departs; a planted row whose class appears in no copy selector is refused.
- Table and measurement, Chromium (journey): the partition proof reads zero breaking departures under the layer face, and the same face with every copy and restore rule deleted fails on a curated element (section 5).

### Named cases

The following list states what each case the dispatch names reads under the layer face:

- `svg.bi` inside `.btn`: `bi` is a component name (`veneer/src/core/constants.ts:1095`); preflight's `img, svg { display: block }` drops the icon onto its own line under the face without the layer (M3 functional rows), and the restore row returns `inline`. A bare `svg` without `.bi` stays preflight's `block`.
- `.modal-title` and `.offcanvas-title` on headings: `modal-title` is a reboot row, so a `.modal-title` on any heading level reads the reboot's size for that level, weight 500, and margin, under its own `line-height` rule, as under Bootstrap alone. `offcanvas-title` on the showcase's `h4.h5` is repaired by the `.h5` compound; `offcanvas-title` on a bare `h5`, as Bootstrap's documentation writes it, is repaired only if U1's population departs on it, and section 10 asks about that coverage.
- `.card-text` paragraphs: a reboot row restores `p`'s 16 px bottom margin, and `.card-text:last-child` (specificity 0,2,0) still removes it on the last paragraph.
- `.h1` to `.h6`, `.small`, and `.mark`: the class compounds stay in `bootstrap` on every element, so `h2.h4` reads 24 px, `div.h1` keeps its 8 px margin against preflight's `* { margin: 0 }`, `small.small` reads 14 px where a bare `small` reads preflight's 12.8 px (M2), and `span.mark` keeps its 3 px padding.
- A bare `p` or `h2` inside `.card-body`: Tailwind's. The `p` reads 0 px margins and the `h2` 16 px at weight 400, as on any Tailwind page; the card's own `.card-title` and `.card-text` keep Bootstrap's look.

## 5. Showcase

### Faces

Three faces, differing only in the `style` elements the document holds; the value names follow the record field and `resolveExpectation` (`veneer/tests/setupBrowser.ts:721-728`). Labels are proposed for the subjective lane.

| Value | Proposed label | Sheets in the document | What the face is for |
| --- | --- | --- | --- |
| `bootstrap` | Bootstrap only | `style#veneer-bootstrap`, the built `./bootstrap` sheet | The baseline every departure is read against |
| `unexcluded` | Tailwind without the layer | `style#veneer-unexcluded`, the `unexcluded` compile, directly before `style#veneer-bootstrap` | What a developer gets loading Tailwind beside Bootstrap with no Veneer sheet |
| `tailwindcss` | Tailwind with the layer | `style#veneer-tailwindcss`, the recipe compile, alone | Bootstrap for Tailwind: Tailwind wins every conflict, components hold |

`Face` widens to three members (`veneer/app/browser/types.ts:13`); `FACES` lists them in that order (`app/browser/constants.ts:31-34`); `Showcase` creates the third `style` element and switches by value (`app/browser/Showcase.ts:49-54`, `:172-175`), importing `recipe` and `unexcluded` from `app/browser/recipe.json` (`:8`). The page carries a second copy of Bootstrap inside the layer face's compile; section 10 asks the user to accept the page weight.

### What a person sees

From Bootstrap only to Tailwind without the layer: spacing, radius, and headings stay Bootstrap's, because Bootstrap's unlayered importants beat every layered Tailwind rule and its reboot follows `base`; icons in buttons and the header title drop onto their own lines; bare images turn block and bare lists lose bullets; the open `collapse show` panel vanishes; Bootstrap containers widen to Tailwind's breakpoints; `border-N` boxes draw solid borders. From there to Tailwind with the layer: the icons return inline, the panel returns, the containers return to Bootstrap's widths; the shared names switch to Tailwind's scale (`mt-3` 12 px, `gap-3` 12 px, `w-100` 25 rem, `rounded` 4 px, `border` in the text color); bare headings and paragraphs flatten to preflight; caption `code` grows to 14 px in Tailwind's monospace stack; component titles, card text, and pagination keep Bootstrap's look.

### Statechart rows

`FACE_SCENARIOS` (`tests/setupBrowser.ts:1140`) grows from 4 rows to 9: every face as `from` against every button as `event`, named "`FROM` becomes `TO` through the `LABEL` button" or "`FROM` stays `FROM` through the `LABEL` button". `assertFace` (`:1081-1097`) reads the three pressed states, the status sentence, and a two-reading witness that separates all three faces: the `px-8` button's `padding-left` and the `mt-3` element's `margin-top`, predicted (12px, 16px), (32px, 16px), and (32px, 12px).

### `TAILWIND_READINGS` after the flip

Each row carries `bootstrap`, `unexcluded`, and `tailwindcss` values and a `narrow` triple where the 390 px reading differs. Every value avoids theme-dependent colors and user-agent form metrics, so it holds on both hosts. Values for added rows are predicted.

| Specimen | Subject | Longhand | Bootstrap only | Without the layer | With the layer |
| --- | --- | --- | --- | --- | --- |
| Tailwind padding on a Bootstrap button | `button` | `padding-left` | 12px | 32px | 32px |
| Shared spacing and radius follow Tailwind | `.mt-3` | `margin-top` | 16px | 16px | 12px |
| Shared spacing and radius follow Tailwind | `.gap-4` | `column-gap` | 24px | 24px | 16px |
| Shared spacing and radius follow Tailwind | `span.rounded` | `border-top-left-radius` | 6px | 6px | 4px |
| Collapse stays visible | `.collapse` | `display` | block | block | block |
| Collapse stays visible | `.collapse` | `visibility` | visible | collapse | visible |
| Container keeps Bootstrap's widths | `.container` | `padding-left` | 12px | 12px | 12px |
| Container keeps Bootstrap's widths | `.container` | `max-width` (narrow: none, none, none) | 1140px | 1280px | 1140px |
| Pill radius beside rounded-full | `button` | `border-top-left-radius` | 800px | 800px | 800px |
| Tailwind grid in a card body | `.grid` | `display` | block | grid | grid |
| Tailwind variant at the md breakpoint | `.md\:flex` | `display` (narrow: block, block, block) | block | flex | flex |
| Arbitrary margin value | `.mt-\[1rem\]` | `margin-top` | 0px | 16px | 16px |
| Bare heading beside a heading class | `h5:not([class])` | `font-size` | 20px | 20px | 16px |
| Bare heading beside a heading class | `.h5` | `font-size` | 20px | 20px | 20px |
| Bootstrap card on Tailwind's reset | `.card-title` | `font-weight` | 500 | 500 | 500 |
| Bootstrap card on Tailwind's reset | `.card-text` | `margin-bottom` | 16px | 16px | 16px |
| Bootstrap card on Tailwind's reset | `p:not([class])` | `margin-bottom` | 16px | 16px | 0px |
| Bare image and list | `img` | `display` | inline | block | block |
| Bare image and list | `ul` | `list-style-type` | disc | none | none |
| Icon in a Bootstrap button | `svg.bi` | `display` | inline | block | inline |
| Hidden attribute with a display utility | `[hidden]` | `display` | flex | none | none |

### The partition proof

The proof replaces `reads the resolved values under its declared variant and both stylesheet sets` (`tests/app/browser/integration.test.ts:826-1001`) with "...and every stylesheet set". In each of `light-1280`, `dark-1280`, `light-390`, and `dark-390` it reads `readSurface(collectBootstrapGroups())` (`tests/setupBrowser.ts:794`, `:881`) under each face, plus a class reading over the same walk, and partitions `collectDepartures(bootstrap, face)` (`:1036`) with an added instrument `collectPartition` in `tests/setupBrowser.ts`, proved in `tests/setupBrowser.test.ts`:

- Element categories: component (a `CLASS_NAMES.bootstrap.components` name), shared (one of the 192 and no component name), other (another registry name), bare (none).
- Departure kinds, first match: layout, invisible, utility, context (section 4), then preflight (the element's tag is in `preflight.json` `elements`, the tags a preflight or reboot selector names, read from text), then unattributed.
- Under the layer face: a component element carries only layout, invisible, utility, and context departures; a shared or other element carries those or preflight; a bare element is Tailwind's and unconstrained; no departure is unattributed; each kind occurs at least once, so no clause is dead.
- Controls: the face without the layer fails, with an unattributed `visibility` departure on the `collapse show` element and a preflight `display` departure on `svg.bi`; the layer face with every copy and restore rule deleted from an adopted copy of its sheet fails with a preflight departure on a curated element.
- The chrome reading (`readShowcaseChrome`, `:943`) runs through the same partition under each face instead of the zero-departure equality at `integration.test.ts:925-929`.

Portability: every comparison reads two faces live on one host, and every exclusion is a condition on live values, so the proof holds where Chromium enumerates `row-rule-color` and where it does not, and where user-agent form metrics differ; the only stored values are `TAILWIND_READINGS`, chosen to be host-independent.

### The `unexcluded` compile

It becomes the Tailwind without the layer face; its control duty at `integration.test.ts:935-964` moves into the partition's failing control. The census case (`:884-892`) reads the undeclared tokens per face: under Bootstrap only the `TAILWIND_CLASSES` constant, the slide marker, and the icon tokens; under both Tailwind faces `md:flex`, `mt-[1rem]`, the marker, and the icon tokens (§ Census limit). The sized-image control (`:905-917`) goes: under both Tailwind faces preflight's `img { height: auto }` already wins, and the Object fit and Stretched link images are bare or utility elements whose height departure the partition admits.

### The Bootstrap with Tailwind section

The lead (`app/browser/sections/tailwindcss.html:1-5`) states that the Tailwind faces load committed compiles of a Tailwind entry, the face without the layer keeping the Bootstrap sheet and the face with the layer replacing it, over the same markup. The recipe `pre` stays. Each caption takes the form "Bootstrap only: ... Without the layer: ... With the layer: ...", collapsing faces that agree. Proposed captions:

- Tailwind padding on a Bootstrap button: "Bootstrap only: 12 px inline padding. Both Tailwind faces: 32 px, because `px-8` is a Tailwind utility Bootstrap does not declare."
- Shared spacing and radius follow Tailwind (retitled from "Bootstrap spacing keeps its scale"): "Bootstrap only and without the layer: `mt-3` reads 16 px, `gap-4` 24 px, and `rounded` 6 px, because Bootstrap's !important utilities outrank every layered Tailwind rule. With the layer: 12 px, 16 px, and 4 px, because the layer withholds Bootstrap's rule for every name both ship."
- Collapse stays visible: "Bootstrap only and with the layer: display block and visibility visible. Without the layer: visibility collapse, because Tailwind's `collapse` utility reaches Bootstrap's collapse class; the layer withholds that utility."
- Container keeps Bootstrap's widths: "Bootstrap only and with the layer: 1140 px wide at 1280 px. Without the layer: 1280 px, Tailwind's container breakpoints."
- Pill radius beside rounded-full: "Every face: 800 px, because `rounded-pill` is a Bootstrap !important utility under another name and outranks Tailwind's `rounded-full`."
- Tailwind grid in a card body, Tailwind variant at the md breakpoint, Arbitrary margin value, Tailwind color, ring, shadow, and size, Tailwind dividers and vertical spacing: the existing readings, with "Bootstrap with Tailwind" read as "Both Tailwind faces".
- Bare heading beside a heading class (added): "Bootstrap only and without the layer: the bare heading reads 20 px. With the layer: 16 px, because preflight owns bare elements. The `.h5` heading reads 20 px under every face, because the class keeps Bootstrap's rule."
- Bootstrap card on Tailwind's reset (added; Bootstrap's documented card with an `h5.card-title`, a `p.card-text`, a bare `p`, and a button): "Every face: the title reads 20 px at weight 500 and the card text keeps its 16 px margin. With the layer, the bare paragraph loses its margin to preflight, as a bare paragraph does on any Tailwind page."
- Bare image and list: "Bootstrap only: an inline image and a bulleted list. Both Tailwind faces: a block image and an unmarked list, preflight declarations Bootstrap's reboot never makes."
- Icon in a Bootstrap button (added): "Bootstrap only and with the layer: the icon sits inline beside the label. Without the layer: preflight's block display drops it onto its own line; the layer restores the browser default on `.bi`."
- Hidden attribute with a display utility: "Bootstrap only: display flex, because `d-flex` outranks Bootstrap's `[hidden]` rule. Both Tailwind faces: display none, because preflight's important `[hidden]` rule outranks `d-flex`."

### The page chrome's own shared utilities

- `h-100` on every specimen card: replace. Tailwind's `h-100` is a fixed 400 px (M3: `h-100` to 400px), which makes short cards 400 px tall and lets tall cards overflow into the next row under the layer face. Each `.col` gains `d-flex` and each card trades `h-100` for `flex-fill`, both Bootstrap-only names; under Bootstrap only the card stretches to the row as `h-100` does, and U1's P4 reads zero departures before and after.
- `w-100` on a direct child of a chrome card body: replace with `flex-fill` on the same rule and the same P4 check. Tailwind's `w-100` is 25 rem, wider than a card body at 390 px. `w-100` inside specimen markup (Bootstrap's documented `img.d-block.w-100` in carousels, the Sizing matrix) stays and reads Tailwind's value, which is the flip a Tailwind developer meets.
- `mb-0`, `mt-1`, `p-2`, `pb-2`, `gap-2`, `bg-transparent`, `flex-wrap`: keep; each reads the same value under both maps.
- `gap-3`, `gap-4`, `py-3`, `px-4`, `py-5`, `mt-5`, `pt-4`, `mb-4`, `border`, `rounded` on chrome (`app/browser/factories.ts:763-770`, `:814-821`, the card bodies, the specimen frames): keep and accept the visible change. Bootstrap ships no spacing class outside the shared 0 to 5 scale, so no Bootstrap-only replacement exists; under the layer face the chrome tightens to Tailwind's scale and frames draw in the text color at 4 px radius, the partition attributes each departure to `utility`, and the guide states the change.

## 6. Records and proofs

### Records

| Record | After the flip | Regeneration |
| --- | --- | --- |
| `oracle.min.json` | Keeps its meaning | None |
| `comparison.json` | Keeps its meaning; its shared set, split by `CLASS_NAMES` category into 192 and 17, defines `$shared` and the exclusion (derived, not stored) | None |
| `similar.json` | Keeps its meaning | None |
| `incompatible.json` | Keeps its 2326 rows; meaning narrows to what Tailwind's rule breaks beside lifted Bootstrap without the layer, re-read with `[built, unexcluded]` instead of `[built, unexcluded, compatibility]` | Only if the re-read differs; M2 predicts none, because the mirror touched only `base` |
| `preflight.json` | Keeps its 2598 rows: the bare-element longhands Tailwind's preflight sets, measured in Chromium 153 | None; read through the reproduction filter |
| `tests/fixtures/tailwindcss/recipe.json` | Shape kept; `recipe` is the flipped compile, `sheet` the tuned sheet's digest | Writer rewritten (following subsection) |
| `app/browser/recipe.json` | Shape kept; the page imports `recipe` and `unexcluded` | Same writer |
| Curation table (guide) | Added; replaces the preflight exemption table | Hand-maintained, pinned three ways (section 4) |

### Cases, by file

`tests/src/tailwindcss/index.test.ts` (Chromium, `src:tailwindcss`):

| Case | Fate |
| --- | --- |
| `ships its declared order and writes no foreign layer or Bootstrap declarations` (`:15`) | Inverts: owned layers `reset` and `bootstrap`, every important declaration unlayered, `--bs-*` declarations present |
| `declares no class name` (`:40`) | Goes; replaced by "declares every lifted class name except the 192 withheld names", with a planted `.mt-3` control |
| `excludes every Bootstrap name in one directive and exposes no source rule in CSSOM` (`:57`) | Inverts to the 1833 names, with a dropped name and an appended `mt-3` as controls |
| Derivation sequences (section 3, pin 3) | Added |
| Curation table against the sheet (section 4) | Added |

`tests/conformance.test.ts`, `Tailwind compatibility recipe` (Node):

| Case | Fate |
| --- | --- |
| `pins the exclusion statement byte for byte directly after the order statement` (`:1153`) | Inverts: the statement equals the registry minus `$shared`, `$shared` equals the shared utilities, the byte length is the measured one, and the statement follows the Bootstrap tokens block |
| `pins the complete mirror after one Sass round trip with exemptions read both ways` (`:1168`) | Goes; replaced by the curation table against the tokens |
| `excludes Bootstrap candidates while retaining px-8 and rejects a stripped exclusion` (`:1210`) | Inverts: the utilities-layer census holds `px-8` and the shared names and no other registry name; the stripped control brings `collapse` back |
| `excludes theme-generated and user-defined Bootstrap names` (`:1231`) | Stays, reading the utilities layer only |
| `excludes exact candidates while preserving authored selectors and variant and arbitrary names` (`:1245`) | Stays with `collapse` as the excluded witness in place of `mt-3` |
| `pins the unexcluded Bootstrap census to accepted selector identities in the inventory` (`:1258`) | Stays |
| `refuses apply of an explicitly excluded Bootstrap utility` (`:1277`) | Inverts: `@apply collapse` refused, `@apply mt-3` compiles |
| `places properties before the literal order and Tailwind order and preflight before the mirror` (`:1286`) | Changes: `@layer properties;`, the literal statement, Tailwind's statement, preflight in `base`, then the inlined tuned sheet; no mirror |
| `pins the recipe record to live compiles, candidate membership, and the built-sheet digest` (`:1344`) | Stays against the regenerated record |
| `pins the showcase recipe record ...` (`:1378`) | Changes: the `recipe` utilities layer holds `TAILWIND_CLASSES` and the shared names; `unexcluded` still holds `collapse`, `container`, and `mt-3` |
| Sass barrel equals the built sheet after one round trip | Added |

`collectRecipeClasses` (`tests/setupServer.ts:1084`) reads every style rule, so the inlined Bootstrap floods it; an added `collectUtilityClasses` reads only `@layer utilities` blocks. `collectMirror` (`:1012`) and its proof go; `readExemptions` gives way to a curation-table reader in `tests/setup.ts`.

`tests/integration.test.ts` (Chromium, `integration`):

| Case | Fate |
| --- | --- |
| `pins the live moved rows in both directions with planted and removed controls` (`:324`) | Replaced by the portable record case (following subsection) |
| `restores every recorded longhand with base revert counters and fails with counters stripped` (`:339`) | Goes |
| `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win` (`:358`) | Inverts: a bare `img` reads preflight's `max-width: 100%` under the recipe, `.img-thumbnail` keeps its rule, and an unlayered consumer rule still wins |
| `keeps hidden elements hidden and records the display utility departure` (`:386`) | Stays, adding `hidden="until-found"`: `none` under the lifted sheet, not `none` under the recipe |
| `places properties below reset and rejects a separate Veneer sheet loaded first` (`:412`) | Stays |
| `restores bare images and lists to lifted Bootstrap and rejects a removed mirror` (`:428`) | Inverts: bare `h1`, `p`, `img`, and `ul` read preflight's values under the recipe and the reboot's under the raw composition; deleting the recipe's `reset` blocks is the control |
| `keeps the height attribute of a sized image under the recipe and rejects a revert mirror` (`:463`) | Inverts: preflight's `height: auto` wins over the attribute under the recipe (predicted 48px against 24px alone) |
| `keeps a reset layer value under the recipe and rejects a revert mirror` (`:483`) | Goes; replaced by "keeps every reboot value preflight never declares" (body color, `hr` opacity 0.25, `dt` weight 700, `sup` offset) with the `reset` blocks deleted as the control |
| `partitions every shared name, pins incompatible rows both ways, and restores every carrier under the recipe` (`:531`) | Changes: the repeated and drift partition stays; incompatible rows are read under the raw composition both ways; the restored clause inverts: under the recipe each of the 192 names reads its Tailwind-alone delta and each of the 17 its Bootstrap-alone delta at every `RELATION_WIDTHS` width, with the raw composition's 16 px `mt-3` as the control |
| `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` (`:648`) | Goes |
| `keeps collapse show visible under the recipe and reads collapse visibility with the rule exposed` (`:667`) | Stays; the exposed reading drops the compatibility sheet |
| `keeps every pair of built sheets disjoint in each shared layer` (`:689`) | Changes: `SHEET_LAYERS` lists `reset` and `bootstrap` for the tuned sheet; the Bootstrap and tuned pair is exempt as alternatives, and an added case reads `mt-3` at 16 px when `./bootstrap` loads beside the recipe, the refused misuse |
| `reads a composed border modifier as solid on both sides` (`:717`) | Changes: a bare `border-2` reads `solid` under the recipe against `none` alone |
| `resolves the same cascade in all 24 sheet permutations` (`:91`) | Stays as the order pin; its resolved witness must be a styles or themes witness |
| Recipe compile carries the tuned rows (section 3, pin 4) | Added |

Journeys and showcase (Chromium): the matrix case becomes the three-face partition case; `J4 compares the two stylesheet sets through the Stylesheets buttons` becomes "J4 compares the three stylesheet sets...", reading `TAILWIND_READINGS` through the buttons in every variant; the statechart face family runs 9 rows; `tests/app/browser/Showcase.test.ts`'s `inserts the Tailwind compile directly before the Bootstrap sheet under the Tailwind face` splits into one case per Tailwind face. `tests/distribution.test.ts:876` stays against the regenerated record and gains a compile of the packed `./tailwindcss/scss` barrel.

### Preflight rows on either host

The portable case is "reads every reproducible preflight row under both Tailwind compositions and confines the rest to form controls":

1. For each record row, read the lifted sheet alone on the host. A row is reproducible when the host enumerates its longhand and reads its `alone` value.
2. Every reproducible row reads its `preflight` value under the recipe and under the raw composition.
3. Every unreproducible row sits on `button`, `input`, `select`, or `textarea`, host or pseudo-element. On Chromium 141 these are the 14 user-agent metric rows and the 16 `row-rule-color` rows (`m2-bare.md` section 4); on Chromium 153, which wrote the record, there are none.
4. The element and pseudo-element lists still equal their text readings (`integration.test.ts:326-327`), which no host changes.
5. Controls: a planted `div` row the host cannot reproduce fails step 3; deleting preflight's `base` block from the recipe fails step 2.

The flip's own claims carry no stored values: every longhand that moves under the raw composition reads the same under the recipe (M2: B equals D on 2594 rows), and every longhand where the recipe departs from the raw composition reads the same with the `reset` blocks deleted (preflight or the user agent decides). The case uses no host branch, and its tolerance names the one difference M2 measured.

### Regeneration path

`/home/user/veneer/tmp/units/` holds no writer on this host (read 2026-10-04). Only the two `recipe.json` files change content, and `incompatible.json` changes only if U4's re-read differs. Because a Node script may import only `node:` modules (`AGENTS.md:47`) and the writers need the installed compiler, each writer is a Vitest file under the ignored `tmp/units/` (`tailwind-recipe.test.ts`, and `tailwind-incompatible.test.ts` if needed), run through a scratch configuration `tmp/units/vite.writers.config.ts` that reuses the root `conformance` or `integration` project settings, calling `compileRecipe` and `deriveIncompatibleRows` and writing the JSON. Each writer's proof is the committed case that reads the record equal to the live derivation; section 10 asks the Orchestrator to confirm the writer form.

## 7. Guide and roadmap

`veneer/guides/veneer.md`:

- § Tailwind compatibility sheet (`:1197-1320`): rewrite as Bootstrap for Tailwind. Reverse "ships only the compatibility changes that keep real Tailwind's styles aligned with Bootstrap instead of fighting it" and "and no other rule" (`:1199-1203`); "so a Bootstrap class keeps Bootstrap's rule" (`:1234-1235`); "The sheet declares no class name" (`:1251`); the mirror paragraphs (`:1256-1283`); the exemption table (`:1285-1302`), replaced by the curation table; "A Tailwind utility or markup that relies on a preflight declaration does not receive it under the recipe" (`:1304-1312`). The overrides table (`:1314-1319`) gains the important-modifier and consumer-important rows from section 2.
- § Composition (`:1440-1446`): replace "The `bootstrap` layer follows the `base` layer, so Bootstrap's reboot beats Tailwind's preflight." with "The `reset` layer precedes the `base` layer, so under the Tailwind recipe preflight beats Bootstrap's reboot, which the tuned sheet places in `reset`; under `./bootstrap` alone the reboot sits in the `bootstrap` layer."
- § Load real Tailwind (`:1452-1518`): restate reasons 2 and 3 (`:1467-1469`); reverse "the `mt-3` class keeps Bootstrap's 16 px top margin instead of Tailwind's 12 px" (`:1484-1489`), the `@apply mt-3` paragraph (`:1491-1495`), and "Link the Bootstrap and styles sheets after the compiled Tailwind sheet" (`:1508-1510`), which becomes "Link the styles sheets after the compiled Tailwind sheet, and never link `./bootstrap` beside it".
- § Tailwind-first limit (`:1519-1527`): keep.
- § Compare Bootstrap and Tailwind: "which is why the compatibility sheet excludes every Bootstrap class name" (`:1561-1562`) names the 1833; the incompatible paragraph (`:1606-1618`) reads the raw composition; the reset drift paragraph (`:1620-1636`) reverses "under the compiled recipe every row reads the value lifted Bootstrap alone computes".
- § Showcase (`:1640-1653`), § Faces (`:1676-1727`), § Tailwind record (`:1768-1790`), § Census limit (`:1792-1803`): three faces, the partition in place of "Both faces must read the same", the image-height paragraph reversed, the specimen table from section 5, the chrome change stated, and `unexcluded` as a face. § Color mode limit (`:1805`): keep, adding the `dark:` row from section 2.

`veneer/ROADMAP.md`:

- Tailwind tenet (`:15`): replace from "The compatibility sheet ships only the compatibility changes" through "a consumer's own rule wins as § Cascade contract states" with: "Tailwind wins at every conflict with Bootstrap: on a class name both declare, Tailwind's rule applies, and on a bare element both resets style, preflight's declaration applies. `./tailwindcss` is Bootstrap for Tailwind: the same authored Bootstrap source built with the shared utility rules withheld, the reboot's rules in `reset`, and the curation the guide's table names, so Bootstrap's components keep their look on a Tailwind page; its exclusion statement withholds every other Bootstrap class name from Tailwind."
- Cascade contract (`:29`, `:33-38`, `:40`, `:44`): reverse "`bootstrap` follows `base` so Bootstrap's reboot beats Tailwind's preflight"; the `./tailwindcss` row becomes `reset` and `bootstrap`, plus every `!important` declaration outside every layer; "except `./tailwindcss`, whose preflight mirror follows preflight" goes, so no face writes `base`; the consumer paragraph describes the tuned sheet.
- Published faces (`:54`), Proofs rows (`:82`, `:84`, `:85`), Style centralization (`:99`, `:101`), Sequence (`:143-144`, plus a flip entry dated on landing), Scaffold propagation host-bound sentence (`:164`): restate each to the shipped design.

Scaffold `.orkestrel/veneer/plan.md` § Standing rulings: amend `:11` so "'Bootstrap wins on a shared class' bound to the Tailwind compatibility layer" reads as reversed by the user's ruling of 2026-10-04, add that ruling with R1 to R4, and restate the sheet sentence in `:24` to match.

## 8. Units

One worktree, `veneer-wt-flip`, one writer at a time, in this order. Objective units run on GPT-6 Astra through `codex exec`; subjective units run on Claude Opus 5.5 with edits only, and the Orchestrator runs their commands (`plan.md:18`). Each unit stops at its project boundary and reports its commands.

1. **U1 flip-probe** (objective, Astra; read-only on the tree). Owns `tmp/probes/flip2/` under veneer's ignored `tmp/`. Runs P1, P2, and P3 (section 9), P4 (chrome replacement reads zero departures under Bootstrap only at 1280 and 390 px), and P5 (every `TAILWIND_READINGS` triple under the three faces at both widths). Delivers the curation table, the byte length of the 1833-name statement, and the measured readings. Acceptance: each probe exits 0 twice with byte-identical output; `git status --porcelain` prints nothing.
2. **U2 flip-sheet** (objective, Astra; depends on U1). Owns `src/bootstrap/_mixins.scss`, `_tokens.scss`, `_reset.scss`; `src/tailwindcss/_tokens.scss`, `index.scss`, `_reset.scss` (deleted), `_mixins.scss`; `tests/src/tailwindcss/index.test.ts`; `tests/setupStyles.ts` with `tests/setupStyles.test.ts` (`restrictSelector`); `tests/setup.ts` with `tests/setup.test.ts` (curation reader, `SHEET_LAYERS`); the curation table block in `guides/veneer.md`. Acceptance, cheapest first: `npm run build:src:bootstrap` with an unchanged SHA-256 of `dist/src/bootstrap/index.css`; `npm run build:src:tailwindcss`; `npm run check:src:bootstrap` and `npm run check:src:tailwindcss`; `npm run lint:check`; `npm run test:src:bootstrap` unchanged and green; `npm run test:src:tailwindcss`; the link 1, link 2, region, and utilities-pass conformance cases by `-t`; `npm run test:setup` and `npm run test:setup:browser`.
3. **U3 flip-records** (objective, Astra; depends on U2). Owns the `tmp/units/` writers, both `recipe.json` files, the `Tailwind compatibility recipe` describe in `tests/conformance.test.ts`, the Tailwind helpers in `tests/setupServer.ts` with `tests/setupServer.test.ts`, and `tests/distribution.test.ts`. Acceptance: the writer run twice yields identical records; `npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts`; `npm run test:setup`; `npm run check`; the packed recipe case when the registry stage is available.
4. **U4 flip-integration** (objective, Astra; depends on U3). Owns `tests/integration.test.ts`, `incompatible.json` and its writer only if the re-read differs, and further `tests/setupStyles.ts` instruments with proofs. Acceptance: `npm run test:setup:browser`; `npm run test:integration` on the cloud host with no failure outside the host-bound set and none in the three Tailwind describes.
5. **U5 flip-showcase** (subjective, Opus; depends on U3). Owns `app/browser/types.ts`, `constants.ts`, `Showcase.ts`, `factories.ts` and any template holding chrome, `app/browser/sections/*.html`, and `tests/app/browser/Showcase.test.ts`, `constants.test.ts`, `factories.test.ts`, and the section tests where admitted classes change. Acceptance: `npm run check`; `npm run test:app:browser`; P4 rerun reads zero Bootstrap-only departures from the chrome edits.
6. **U6 flip-journeys** (objective, Astra; depends on U5). Owns `tests/setupBrowser.ts` (`TAILWIND_READINGS`, `FACE_SCENARIOS`, `collectPartition`, the class reading, `readShowcaseChrome`), `tests/setupBrowser.test.ts`, and `tests/app/browser/integration.test.ts`. Acceptance: `npm run test:setup:browser`; `npm run build`, then `npm run test:journey` green on the cloud host, with the face statechart at 9 rows.
7. **U7 flip-guide** (subjective, Opus; depends on U6). Owns `guides/veneer.md` beyond the table, `ROADMAP.md`, and scaffold `.orkestrel/veneer/plan.md` § Standing rulings; the Orchestrator writes the lanes log entry. Acceptance: `npm run test:guides`; `npm run test:policy`; every backticked case title in the rewritten sections resolves to a test title.
8. **U8 gates and rebuild** (verifier). Runs `npm run format:check`, `lint:check`, `check`, `build`, `test:app:browser`, `test:setup:browser`, `test:src:browser`, `test:journey`, `test:integration`, `test:policy`, and `npm test`, each read bare; then `npm run build:showcase` and commits `showcase/browser.html` whole, never hand-merged. Lands when every failure is in the host-bound set, re-read by title; the three preflight titles leave that set, and the lanes log records it. One falsify round with two lanes and its fix unit follow, as on every chunk.

## 9. Risks and the first probe

### The three load-bearing claims

1. **The Sass hook keeps the drop-in and lifted forms byte-equal and emits the split in order.** If `@include curate` changes default emission, or `@at-root (without: layer rule)` reorders copies against later reboot rules, link 1, link 2, or the derivation fails. Probe P1: compile `src/bootstrap/index.scss` with `$layered: false` and with defaults before and after the hook, and compare SHA-256; compile the tuned configuration with `$curated` set to two classes and read, in Chromium CSSOM, the `reset` block's 74 rules against the lifted reboot's 75 minus `[hidden]` (multiset and order), the copy selectors against the `restrict` table in section 2, and each copy's index directly after its original in the whole-sheet sequence. Fallback if `selector.unify` mishandles a pseudo-element or `:not([class])`: `restrict` drops that compound, and P1 lists every dropped selector.
2. **A finite curation set reaches zero breaking departures without creating new ones.** The accordion interplay in section 4 shows a row can move a descendant. Probe P3: the fixed point of section 4 over the full population, at 1280 and 390 px and both color modes, including open states; report the table, the iterations, and every residual departure by element and longhand. If it does not converge in 3 iterations, the Orchestrator rules each residual before U2.
3. **Tailwind compiles the tuned sheet inside the recipe as it compiled the lifted one.** M6 measured the lifted sheet with the exclusion in the entry; the tuned sheet places `@source` after its `:root` block and carries `@layer reset` and `:where()` selectors. Probe P2: `compileRecipe(RECIPE_INPUT, candidates)` against a scratch tuned sheet; read `@layer properties;` first, no `collapse`, `container`, `table`, or `col-1` in the utilities layer, `mt-3` present, and the flattened rows equal to the tuned sheet except M6's one rewrite.

P1 runs first: it gates every later unit and costs one compile and one CSSOM read.

### Readings supplied

M1 (layer and importance resolution, revert forms, preflight against `reset` and `bootstrap`), M2 (bare elements under B, C, D; C-only rows; record agreement on Chromium 141), M3 (component departures, attribution, functional rows, census), M5 (the 1833-name exclusion and the theme token), M6 (reboot counters, class compounds moving with the reboot, Tailwind inlining the lifted sheet), and the verify lane's reproduction and method weaknesses.

### Readings missing

- The tuned build itself: M3's condition C moved class compounds with the reboot and had no curated copy (M6 row C), so the design's composition is unmeasured (P1, P3).
- Open-state markup under any Tailwind composition: M3 ran no script (P3).
- The normal `revert-layer` counter inside `bootstrap` that `measurements.md:33` names as the first probe: not needed, because this design uses no counter; M6 rows N1 and N2 already read it.
- Tailwind consuming `@source` after a style block, and inlining the tuned sheet (P2).
- `hidden="until-found"` under the recipe, the consumer `@theme` names Bootstrap does not declare (`ring-primary`), and the `dark:` composition: read in U4's cases.
- The chrome replacement under Bootstrap only (P4) and every added `TAILWIND_READINGS` value (P5).
- Any reading on the engine host's Chromium 153: the partition's portability holds by construction (live comparisons, conditions on live values) and is proved there at U8.
- A bundler path with Lightning CSS (`@tailwindcss/vite`, `@tailwindcss/postcss`): no package is installed, so the shipped claim covers Tailwind's `compile` API, as every recipe proof does.
- The datalist indicator: Chromium 141 exposes no computed style for it (M2 section 5).

## 10. What the user must rule

1. **The cross-face Sass dependency.** `AGENTS.md:28` says no extension face imports another extension's face, and Bootstrap for Tailwind is built from `src/bootstrap` partials configured by `src/tailwindcss`. Default: grant `src/tailwindcss` this one dependency on `src/bootstrap` SCSS, record it in `ROADMAP.md` § Published faces, and pin it with a policy case that finds no other cross-face import. The alternative, the tuned entry inside `src/bootstrap`, moves the Tailwind lists into the Bootstrap face.
2. **Three faces and their labels.** Default: three faces, labeled Bootstrap only, Tailwind without the layer, and Tailwind with the layer. The subjective lane rules the wording, the group title, and the specimen order.
3. **The 17 shared component names stay Bootstrap's.** R1 read literally hands `collapse`, `container`, `table`, and `col-*` to Tailwind, and R3 forbids the breakage that follows. Default: Bootstrap keeps them through the exclusion, `caption-top` included.
4. **Bootstrap's documentation markup that carries a shared name reads Tailwind's meaning.** `img.d-block.w-100` in a carousel reads 25 rem, and a form's `mb-3` reads 12 px. Default: the layer does not repair these, because a local repair takes the conflict back from Tailwind; the guide tells the developer to write Tailwind's name (`w-full`).
5. **The reboot's `[hidden]` rule is withheld** so Tailwind's `until-found` exemption holds. Default: withhold.
6. **Loading `./bootstrap` beside the recipe is unsupported**, because it restores Bootstrap's authority on the 192 names. Default: the guide refuses it and a composition case pins the consequence.
7. **Curation coverage.** The fixed point covers the markup the showcase renders, so a component class on a tag the showcase does not render (a bare `h5.offcanvas-title`) can stay uncurated. Default: seed the fixed point with every component class the showcase renders on a heading, paragraph, list, or link element, and keep it only where the partition stays at zero; this costs a few kilobytes and covers Bootstrap's documented title markup.
8. **The showcase chrome.** Default: replace chrome `h-100` and card-body `w-100` with Bootstrap-only names, and accept Tailwind's scale on the remaining chrome spacing, border, and radius under the Tailwind faces.
9. **Page weight.** The layer face's compile embeds a second copy of Bootstrap in `showcase/browser.html`. Default: accept.
10. **The bundler path.** A Lightning CSS probe needs `@tailwindcss/postcss` or `@tailwindcss/vite` as a development dependency (`AGENTS.md:38`). Default: add no package; the guide states that the recipe is proved through Tailwind's `compile` API.
11. **For the Orchestrator: the record writer form.** Default: Vitest writer files under the ignored `tmp/units/` with a scratch configuration (section 6), because a Node script may import only `node:` modules (`AGENTS.md:47`).
12. **For the subjective lane:** caption wording, the face labels, whether "Bootstrap with Tailwind" stays the group title, and whether the 390 px header with three face buttons needs a layout change, which U5 reads in P4's 390 px pass.
