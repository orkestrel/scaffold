# Tailwind flip: Bootstrap for Tailwind as a derived build

Lane: objective (correctness, constraints, what the contracts permit), held on the derived-build angle. The subjective calls (face labels, captions, the chrome mapping, export and config names) are named in § 10 for the subjective lane or the Orchestrator.

The angle holds on every measurement. It breaks on three scaffold rules, not on a reading: a styles extension cannot import another face (scaffold `AGENTS.md:28`), a sheet face builds one sheet except the styles themes target (`.claude/rules/workspace.md:38`, `:100-120`), and a recreation writes every normal declaration into its framework layer (`.claude/rules/styles.md:72-74`). The smallest departure keeps the angle whole: the tuned build lives in the Bootstrap face as a themes-like target `./bootstrap/tailwind`, and `./tailwindcss` stays a thin sheet holding the order statement and the exclusion. That departure needs the two rule amendments § 10 item 2 asks for.

## 1. Rulings

R1 (Q1, the 192 shared utility names). Bootstrap yields by absence: the tuned target withholds the rule of each of the 192 shared utility names, derived from the same `$utilities` map by a `$tailwind` switch (candidate a). M1 a.1 and a.2 read Bootstrap's unlayered `!important` (16px) over a layered normal Tailwind declaration in both source orders, so Tailwind can win only where Bootstrap's rule does not exist. M5 reads each shared name compiled as an exact `.NAME` rule in `@layer utilities` (`.mt-3 { margin-top: calc(var(--spacing) * 3) }`). The sheets lane deleted exactly the rules this switch withholds, 199 rules (192 unlayered and the 7 layered `--bs-*-opacity: 1` halves of `bg-black`, `bg-transparent`, `bg-white`, `border-black`, `border-white`, `text-black`, and `text-white`), and M3 conditions C and D read that composition. Candidate (b), a layered `revert-layer !important` counter, is refused: M1 c reads it as 0px (the user-agent value) from every layer of the shared statement and reads Tailwind's 12px only from an eleventh layer after `utilities`, which the shared order statement lacks (`src/bootstrap/_tokens.scss:9`); M1 d3 reads it landing on `reset` or the user agent where Tailwind declares nothing; and as a layered important it beats every consumer unlayered `!important` (M1 b.1 to b.4). Candidate (c) is refused by the brief's Bootstrap-only constraint: M1 e.1 reads an unlayered normal `.card .x` (20px) beating a layered normal declaration where M1 e.2 reads Bootstrap's unlayered `!important` beating it today, so layered utilities change a Bootstrap-only consumer's overrides, and link 3 refuses moved importance. No candidate (d) is needed.

R2 (Q2, the 17 shared component names). Bootstrap keeps `caption-top`, `col-1` to `col-12`, `col-auto`, `collapse`, `container`, and `table`, and the exclusion withholds Tailwind's rule for each, because each name is a component contract (`collapse` is engine-written, `container` and `col-*` carry the grid, `table` the table component). M5 reads the 1833-name exclusion dropping exactly these 17 from the compile and adding nothing (sheets lane; verify row 12). Without the exclusion, Tailwind's rules break the components: `TAILWIND_READINGS` reads `visibility: collapse` on `collapse show` and a `1280px` maximum width on `container` under the unexcluded compile (`tests/setupBrowser.ts:238-256`). `caption-top` sits in the exclusion because the exclusion names every Bootstrap name outside the 192; both rules declare `caption-side: top`, so no reading differs. This ruling keeps 17 conflicts from Tailwind, which R1's "every conflict" does not literally allow; § 10 item 1 asks the user.

R3 (Q3, the exclusion statement). The statement names every Bootstrap name except the 192 shared utilities: 1833 names, sorted by code unit (M5; verify confirms 1833 distinct names, all 2025 registry names minus the 192, with no brace-expansion character). Under it, Tailwind generates exactly the shared utilities a page uses, and a consumer `@theme` token never makes Tailwind generate another Bootstrap name: the compile with `@theme { --color-primary: #0d6efd; }` is byte-identical to the compile without it (sheets lane), and the same input without the exclusion adds `bg-primary`, `border-primary`, and `text-primary` (verify row 13). The consumer-theme limit follows: a token named for a Bootstrap color or a `@utility` named for a Bootstrap class yields no class of that name, `@apply` of an excluded name fails the compile, and the consumer reaches Tailwind's behavior through another token name. A token that retunes the value of a shared name, such as `--spacing`, retunes Tailwind's `mt-3`, because that name is Tailwind's. Naming only the 17 components is refused: a consumer `@utility btn` would then generate a layered rule in `utilities`, which follows `bootstrap` (`src/bootstrap/_tokens.scss:9`) and restyles every `.btn`. Naming nothing is refused by R2's readings.

R4 (Q4, preflight authority). The tuned target emits the reboot's element rules into `reset`, keeps the reboot's class members (`.h1` to `.h6`, `.small`, `.mark`) in `bootstrap`, and keeps both important reboot declarations lifted out of every layer. M2 reads condition C (reboot in `reset`) moving 2792 rows against Bootstrap alone and condition D (reboot in `bootstrap`) moving 2594; the 198 C-only rows over 25 elements are the reboot declarations preflight beats, among them `h1` 40px, 500, 48px, and an 8px bottom margin becoming 16px, 400, 19.2px, and 0px; `p` margin-bottom 16px to 0px; `a[href]` losing the link color and underline; `ul` padding-left 32px to 0px; `code`, `kbd`, and `pre` 14px to 16px; and `small` 14px to 12.8px. The same M2 table reads `body` font family, size, line height, color, and background unchanged under C, so the reboot still supplies what preflight never declares. M1 f.1 and f.2 read `base` beating `reset` (0px) and losing to `bootstrap` (8px) in both orders. The class members stay in `bootstrap` because the reboot declares them in the same rules as their elements (`src/bootstrap/_reset.scss:33-98`, `:145-154`); M3 condition C moved them into `reset` and reads the loss on class carriers: `p.h4` and `p.h5` margin-bottom 8px to 0px, `span.mark` padding 3px to 0px, and `offcanvas-title h5` on `h4` 20px to 16px (`m3-curation-candidates.md`). The two important declarations stay lifted through the `unlayer` mixin (`_reset.scss:284`, `:383`): `<div hidden class="d-flex">` reads `none` under B, C, and D (M2 § 5), because preflight's layered important `[hidden]` rule outranks every unlayered important (M1 g.1), and Chromium 141 exposes no computed style for `::-webkit-calendar-picker-indicator`, so the picker rule has no witness (M2 § 5). Dropping the reboot is refused: preflight declares no body color or background (M2 § 6 reads `html` at `rgb(0, 0, 0)` on a transparent background), so a dropped reboot loses the body color, the background, and the `data-bs-theme` dark mode; the important readings would stay `none`. Moving `base` is refused because the order statement is shared. The `hidden="until-found"` reading is unmeasured (§ 9 P5, § 10 item 7).

R5 (Q5, the curation rule). Rule (i) holds, over every Bootstrap-classed element: an element carrying a `CLASS_NAMES.bootstrap` name outside the 192 shared utilities reads under the tuned composition what it reads under Bootstrap alone, except a longhand a Tailwind class on that element declares, and a bare element is Tailwind's. The layer repairs on the element type and class, at the reboot's own specificity and layer (§ 4). M3 reads 4568 component-class pairs and 1988 bootstrap-other pairs where condition D differs from C, the departures the reboot move causes (`m3-summary.md`), and reads no departure in `visibility`, `opacity`, `pointer-events`, `position`, `overflow`, or `z-index` on component-class elements and 7 `display` rows (`measurements.md` M3). Rule (ii) is refused: restoring the reboot inside every component root hands a bare `p` or `h2` inside `.card-body` back to Bootstrap, which takes a bare-element conflict back from Tailwind against R1 and R3. Rule (iii) is refused: M3 reads visible typography breaks on component elements that functional repairs leave broken (`.modal-title` weight 500 to 400, `.accordion-header` 24px to 16px, `.card-text` margin-bottom 16px to 0px, link color and underline lost on `.stretched-link` and `.icon-link`).

R6 (Q6, surface shape). `./bootstrap` stays byte-identical; a `./bootstrap/tailwind` export ships the tuned build compiled from `src/bootstrap/tailwind/index.scss`, a themes-like target; the `./bootstrap/scss` barrel forwards the `$tailwind` switch for Sass consumers; and `./tailwindcss` stays thin, carrying the order statement and the 1833-name exclusion. Candidate 1 (`./tailwindcss` becomes the tuned build) is refused: its Sass would `@use` the Bootstrap face, which scaffold `AGENTS.md:28` forbids ("No extension face imports server code or another extension's face"), and building it from the Bootstrap face instead retires the `tailwindcss` face the user names as the compatibility layer and makes Tailwind reprint the whole Bootstrap sheet inside every consumer compile. Candidate 3 (the switch alone) is adopted as the Sass form, but a consumer who compiles no Sass needs a built CSS export. The sheets lane sizes the target: the text-deletion alternate of the reboot-in-`reset` sheet minus the shared rules is 321677 bytes against 332388 for the lifted sheet (`sheets.md`).

R7 (Q7, the showcase). Three faces: Bootstrap alone, Bootstrap with Tailwind and no layer (the unexcluded compile before `./bootstrap`), and Bootstrap with Tailwind and the layer (the recipe compile before `./bootstrap/tailwind`). The face statechart grows to 9 rows and the pair table to 6; `TAILWIND_READINGS` keys on the three faces; the face-invariance proof becomes a departure-partition proof; the unexcluded compile becomes the middle face and the partition's positive control. The chrome replaces each drifting shared name it carries with a non-shared Bootstrap class of equal Bootstrap-alone value, because M3 reads `w-100` at 400px against 582px (314 pairs), `gap-3` at 12px against 16px (245 pairs), and `h-100` at 400px under the flip (`measurements.md` M3) on the figures and cards that frame every specimen.

R8 (Q8, records). `oracle.min.json`, `comparison.json`, and `similar.json` keep their meaning. `preflight.json` keeps its bytes and its meaning, the rows preflight moves against lifted Bootstrap with the reboot in `bootstrap` (M2 reads condition B equal to D on every row), and its role changes from rows the mirror restores to Tailwind's baseline on bare elements. `incompatible.json` is retired, because its composition included the mirror the flip deletes, and a live delta partition over all 209 shared names replaces it. Both `recipe.json` records keep their shape and regenerate. The curation table is added in the guide, in the shape of the exemption table. M2 § 4 supplies the cross-host facts: 2568 record rows agree, 14 differ only in user-agent form metrics, 16 name `row-rule-color`, which Chromium 141 does not enumerate, and 12 moved rows on Chromium 141 have no record row.

R9 (Q9, guide and roadmap). § 7 lists the sections to rewrite and the sentences to reverse, and gives the tenet wording. The supporting facts are R1 to R8.

R10 (Q10, units). § 8 orders eight units with one writer per checkout, a scaffold unit gated on § 10 item 2, and the showcase rebuild inside the verifier unit.

## 2. Mechanism

The mechanism is one boolean switch, `$tailwind`, read by three emitters in `src/bootstrap/_mixins.scss`, the one emitter home that `.claude/rules/styles.md:19` names. The switch defaults to `false`, and every default compile is byte-identical to today's, so link 1, link 2, and link 3 hold unchanged.

The following fence gives the switch and the reboot wrapper; the wrapper extends the existing `layer` mixin (`_mixins.scss:8-16`), and `_reset.scss:3` becomes `@include layer($reset: true)`:

```scss
// src/bootstrap/_mixins.scss
$layered: true !default;
$tailwind: false !default;

@mixin layer($reset: false) {
	@if $layered {
		@if $reset and $tailwind {
			@layer reset {
				@content;
			}
		} @else {
			@layer bootstrap {
				@content;
			}
		}
	} @else {
		@content;
	}
}
```

The following fence gives the `tune` mixin, included inside a reboot rule; it reads the parent selector through `&`, leaves the element members in place (inside `reset`), moves the class members to `bootstrap`, and adds a curated copy qualified with `:where()`, which keeps the reboot's specificity:

```scss
@mixin tune($classes: (), $reverts: ()) {
	@if not $tailwind {
		@content;
	} @else {
		$elements: ();
		$members: ();
		@each $member in & {
			@if string.index('#{$member}', '.') == 1 {
				$members: list.append($members, $member, comma);
			} @else {
				$elements: list.append($elements, $member, comma);
			}
		}
		@if list.length($elements) > 0 {
			@at-root #{$elements} {
				@content;
			}
		}
		@if list.length($members) > 0 or list.length($classes) > 0 {
			// Leaving the reset layer keeps the enclosing media rule, as the unlayer mixin does.
			@at-root (without: layer rule) {
				@layer bootstrap {
					@if list.length($members) > 0 {
						#{$members} {
							@content;
						}
					}
					@if list.length($classes) > 0 {
						#{selector.append($elements, where($classes))} {
							@content;
							@each $property in $reverts {
								#{$property}: revert;
							}
						}
					}
				}
			}
		}
	}
}
```

The `where` function in the same file returns `:where(.CLASS_A, .CLASS_B)` for a list of class names, where `CLASS_A` and `CLASS_B` stand for the curated names. The `utility` mixin (`_mixins.scss:18-70`) gains a `$withheld` parameter and drops the base selector of a withheld name when `$tailwind` is on; state selectors and every infixed pass stay. The schedule passes the list in its base pass only (`_utilities.scss:1044-1046`), and the 192-name list sits beside the map as `$shared` in `_utilities.scss`, the file that owns "the utility map and its emission schedule" (`.claude/rules/styles.md:23`). `_tokens.scss` configures the mixins `with ($layered: $layered, $tailwind: $tailwind)` and refuses `$tailwind: true` with `$layered: false` through `@error`, because the drop-in has no `reset` layer.

### Example: the withheld `mt-3` rule

The following fence shows the shared name in both sheets and in Tailwind's compile:

```css
/* ./bootstrap, unlayered, unchanged */
.mt-3 { margin-top: 1rem !important; }
/* ./bootstrap/tailwind: no .mt-3 rule; .mt-md-3 and the other infixed passes stay */
/* Tailwind's compile under the recipe (M5) */
@layer utilities { .mt-3 { margin-top: calc(var(--spacing) * 3); } }
```

Under the tuned composition `mt-3` reads 12px, Tailwind's value. No layer holds a counter; the rule's absence is the mechanism.

### Example: the reboot's heading declarations

The authored rule `h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 { @include tune($headings) { … } }` emits the same bytes as today in the drop-in and lifted forms. The following fence shows the tuned emission, with `$headings` holding the curated heading classes of § 4:

```css
@layer reset {
	h6, h5, h4, h3, h2, h1 { margin-top: 0; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: var(--bs-heading-color); }
}
@layer bootstrap {
	.h6, .h5, .h4, .h3, .h2, .h1 { margin-top: 0; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: var(--bs-heading-color); }
	h6:where(.modal-title, .accordion-header), /* each heading level */ h1:where(.modal-title, .accordion-header) { margin-top: 0; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: var(--bs-heading-color); }
}
```

A bare `h1` under Tailwind then reads preflight's `font-size: inherit`, `font-weight: inherit`, and `margin: 0` from `base`, which beats `reset` (M1 f.1), and keeps the reboot's `line-height: 1.2` and heading color, which preflight never declares on `h1`: 19.2px and the heading color (M2 § 6). An `h4.modal-title` reads 24px and weight 500, Bootstrap alone's values, because the curated copy sits in `bootstrap` at specificity (0,0,1) and `.modal-title` at (0,1,0) still wins its own declarations.

### Example: the exclusion statement

The following fence gives the whole thin `./tailwindcss` sheet, where `BOOTSTRAP_NAMES` stands for the 1833 names, sorted by code unit and separated by one space:

```css
@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
@source not inline("BOOTSTRAP_NAMES");
```

Tailwind consumes the statement and no compiled output carries it (sheets lane, `@source` check).

### Layers

The following table places each mechanism:

| Mechanism                                                  | Sheet                  | Layer                                 |
| ---------------------------------------------------------- | ---------------------- | ------------------------------------- |
| Withheld shared utility rules (199 rules)                  | `./bootstrap/tailwind` | none: the rules are absent            |
| Reboot element members                                     | `./bootstrap/tailwind` | `reset`                               |
| Reboot class members (`.h1` to `.h6`, `.small`, `.mark`)   | `./bootstrap/tailwind` | `bootstrap`, at the reboot's position |
| Curated copies and `revert` declarations                   | `./bootstrap/tailwind` | `bootstrap`, at the reboot's position |
| Every other normal declaration                             | `./bootstrap/tailwind` | `bootstrap`, unchanged                |
| Every other `!important` declaration, both reboot ones too | `./bootstrap/tailwind` | unlayered, unchanged                  |
| Exclusion statement                                        | `./tailwindcss`        | none: Tailwind consumes it            |

### Consumer cases

The following table states what a consumer reads in each case the dispatch names, and the case that pins it:

| Case | What the consumer reads | Pinned by |
| --- | --- | --- |
| Tailwind present with the recipe, `./bootstrap/tailwind` linked after the compiled sheet | Shared utilities read Tailwind's values (`mt-3` 12px); the 17 components read Bootstrap's; a bare element reads preflight where both resets declare and the reboot elsewhere; a Bootstrap-classed element reads Bootstrap alone except where its Tailwind classes declare | `reads every shared delta as Tailwind's and every shared component as Bootstrap's under the tuned composition`; the journey partition case |
| Tailwind absent, `./bootstrap/tailwind` alone | The 192 names have no rule (`mt-3` reads 0px), the reboot in `reset` styles bare elements as Bootstrap alone does, components read Bootstrap's; the guide states that `./bootstrap` is the sheet for a page without Tailwind | `withholds the shared utilities and leaves them unstyled without Tailwind` |
| A consumer unlayered `!important` on a shared name, `.mt-3 { margin-top: 20px !important }` | 20px: no Bootstrap rule competes, and an unlayered important beats Tailwind's layered normal rule (M1 a.1) | `lets a consumer unlayered important and a Tailwind important modifier win on a shared name` |
| A consumer `@theme` token that would generate a Bootstrap name, `--color-primary` | No `bg-primary` class is generated (M5); Bootstrap's unlayered `.bg-primary` rule applies; the consumer picks another token name | `excludes theme-generated and user-defined Bootstrap names` |
| Tailwind's `!` modifier, `mt-3!` | Tailwind emits a separate `mt-3!` class whose declaration is a layered important in `utilities`, which beats every unlayered important (M1 b.1 to b.4), the consumer's included; for an excluded name such as `collapse!` the exclusion matches exact names only, so the modifier form compiles (unmeasured, § 9 P4) | the same consumer case; P4 before it lands |
| A `dark:` variant | Tailwind 4.3.3 compiles it inside `@media (prefers-color-scheme: dark)`, so it follows the operating system, while Bootstrap components follow `data-bs-theme`; the flip changes nothing here and the guide's color mode limit stands (`guides/veneer.md:1805-1810`) | `TAILWIND_CLASSES` holds no `dark:` class; the census case |

When the consumer omits the third recipe line, Tailwind generates `collapse`, `container`, `table`, and `col-*`, and the middle face shows the result (R2). When Tailwind's own order statement loads first, `reset` and `bootstrap` land after `utilities` and the flip inverts; the Tailwind-first limit section keeps that statement (`guides/veneer.md:1519-1527`).

## 3. Surface

The following list gives what each published path ships after the flip:

- `./bootstrap`: byte-identical. The built file keeps its SHA-256 (`7932f7a5…`, 332388 bytes, sheets lane manifest).
- `./bootstrap/scss`: the barrel forwards `$layered` and `$tailwind` (`@forward 'tokens' show $layered, $tailwind;`). The default compile is byte-identical; `with ($tailwind: true)` compiles the tuned form. This barrel gains one configurable variable, the bounded change a Sass consumer of `./bootstrap/scss` can see.
- `./bootstrap/tailwind`: the built tuned sheet, `dist/src/bootstrap/tailwind/index.css`, compiled from `src/bootstrap/tailwind/index.scss`, whose only statement is `@use '../index' with ($tailwind: true);`, with `src/bootstrap/tailwind/sheet.ts` importing `./index.scss` alone, as `src/styles/themes/sheet.ts` does.
- `./tailwindcss`: the order statement and the 1833-name exclusion, and no rule. `src/tailwindcss/_reset.scss` and its `@use 'reset'` line go, because the face no longer owns a reset (`.claude/rules/styles.md:22`); the empty folder barrels stay (`:80`).
- `./tailwindcss/scss`: unchanged path, thin content.
- No `./bootstrap/tailwind/scss` export: the barrel switch is the Sass form, so a second barrel export adds no capability.

The following fence gives the `package.json` changes:

```json
"files": ["dist/src", "!dist/src/bootstrap/index.js", "!dist/src/bootstrap/tailwind/index.js", "…"],
"exports": {
	"./bootstrap": "./dist/src/bootstrap/index.css",
	"./bootstrap/scss": "./src/bootstrap/index.scss",
	"./bootstrap/tailwind": "./dist/src/bootstrap/tailwind/index.css",
	"./tailwindcss": "./dist/src/tailwindcss/index.css",
	"./tailwindcss/scss": "./src/tailwindcss/index.scss"
}
```

The `src/bootstrap/**/*.scss` entry of `files` (`package.json:19`) already ships the target barrel. The Vite wrapper is `configs/src/vite.tailwind.config.ts`, a copy of `configs/src/vite.themes.config.ts:5-23` with project `src:tailwind`, `outputBoundary('dist/src/bootstrap/tailwind')`, `emptyOutDir: true`, `cssMinify: false`, the entry `src/bootstrap/tailwind/sheet.ts`, and `test.include` `tests/src/bootstrap/tailwind/**/*.test.ts`. `build:src:bootstrap` chains it after `vite.bootstrap.config.ts`, because the Bootstrap build empties `dist/src/bootstrap` (`configs/src/vite.bootstrap.config.ts:10`), as `build:src:styles` chains the themes build (`package.json:116`). `test:src:bootstrap` keeps its include of `tests/src/bootstrap/**`, which covers the target's tests as the styles include covers themes.

The recipe the consumer writes stays three lines, with the `properties` placement contract unchanged. The following fence gives the Tailwind entry:

```css
@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
@import 'tailwindcss';
@import '@orkestrel/veneer/tailwindcss';
```

Load `@orkestrel/veneer/bootstrap/tailwind` after the compiled Tailwind sheet, in place of `./bootstrap`; its order statement then names existing layers and adds nothing (`guides/veneer.md:1508-1510`). This is the guide's existing instruction with one path changed.

### Derivation proof

The derivation proof ties every byte of the tuned sheet to a record or to the Bootstrap source. It states: the tuned sheet equals the lifted sheet minus the withheld rules, with the reboot region split between `reset` and `bootstrap`, plus the curated rules the curation table records, and nothing else. It runs in Chromium in `tests/src/bootstrap/tailwind/index.test.ts`, on both built sheets adopted into CSSOM through `flattenRules` and `readSequences` (`tests/setupStyles.ts:327`, `:76`), and checks four parts:

1. Withheld: outside the reboot region, the tuned sequence equals the lifted sequence minus every rule whose selector is exactly `.NAME` for a name in `$shared`, 199 rules (sheets lane: 192 top-level and 7 in `@layer bootstrap`, none inside `@media`). Controls: a planted rule and a restored withheld rule each fail.
2. Moved: splitting every selector list into members, the tuned `reset` members plus the tuned `bootstrap` class members equal the lifted reboot region (75 style rules, 289 declarations, verify defect table) as a multiset over media, member, property, value, and priority, in member order, and the two unlayered important rules are identical. Control: a changed reboot value fails.
3. Curated: every other tuned record in the reboot region has a member `ELEMENT:where(CLASSES)`, where `ELEMENT` is a reboot element member, `CLASSES` equals that selector's row in the curation table, and its declarations equal the reboot member's declarations plus the `revert` declarations the row names. Controls: a planted class and a dropped row each fail.
4. Nothing else: every tuned record falls in exactly one of the preceding parts.

Node pins the source side in `tests/conformance.test.ts`: the built tuned sheet equals the `with ($tailwind: true)` compile after one Sass round trip each side, with an appended-rule control (the link 2 shape, `:592`), and `$shared` equals `comparison.json` `.shared` intersected with the `CLASS_NAMES.bootstrap` utilities category, which the sheets lane counts at 192.

## 4. Curation

A broken component is measurable. A Bootstrap-classed element E (it carries a `CLASS_NAMES.bootstrap` name outside the 192 shared utilities) is broken in longhand L when L under the tuned composition differs from L under Bootstrap alone, at the same variant, and no bucket of the following list claims the pair:

1. Inert: `tab-size`; a `border-*-style` longhand whose matching width computes `0px` in both readings; a `list-style-*` or `::marker` longhand when E's `display` is not `list-item` and E has no `list-item` child. M3 counts 2943 of the 11743 distinct component-class rows as `tab-size` and zero-width border styles, which draw nothing.
2. Tailwind: L is in the Tailwind-alone delta of a Tailwind class E carries (a shared utility or a `TAILWIND_CLASSES` member), read on a bare `div` by `readClassLonghands` and `deriveClassDelta` (`tests/setupStyles.ts:664`, `:760`).
3. Inherited: L inherits, E's parent departs in L, and E reads its parent's value under the tuned face.
4. Geometry: L is a box field (x, y, width, height) or a layout-resolved longhand (`width`, `height`, `inline-size`, `block-size`, `transform-origin`, `perspective-origin`, the inset longhands) and E is not a replaced element. M3's extended-unknown residue is exactly these longhands (`m3-curation-candidates.md`, first table).
5. Admitted: the curation table names the selector and L with disposition `admit` and a reason.

The rule that decides what the layer repairs: every broken pair is repaired on its element type and class at the reboot's own specificity and layer, by a `restore` row where the reboot declares L for that element (the curated copy of § 2) or by a `revert` row where only preflight declares L there (a `L: revert` declaration in the copy, which reads the user-agent value Bootstrap alone reads). A pair no layer declaration can repair is admitted. A bare element, or an element carrying only shared utilities or Tailwind classes, is Tailwind's and is never repaired.

### Derivation from M3

The table derives from `m3-curation-candidates.md` in four steps:

1. Take the rows on component-class elements whose longhand is not inert.
2. Drop the rows attributed `shared-utility-self` or `shared-utility-ancestor` (Tailwind and geometry buckets) and the extended-unknown rows (geometry bucket).
3. Drop the rows whose element carries `.h1` to `.h6`, `.small`, or `.mark`, because the class members stay in `bootstrap` in the real build, where condition C moved them.
4. Split the strict `preflight` rows: a row whose condition D value equals Bootstrap alone is reboot-attributable (`restore`); a row that also departs under D is preflight-only (`revert`, or `admit` where `revert` cannot reach the value).

Probe P2 re-derives the same table on the real tuned build, because M3 condition C differs from it in the class members and its CSSOM-serialized sheets lose the spinner border and round the column percentages (verify, objection 2). The following table gives the prediction from M3, each row cited:

| Reboot selector | Classes | Disposition | M3 evidence |
| --- | --- | --- | --- |
| `h1` to `h6` (group, sizes, media sizes) | `modal-title`, `accordion-header` | restore | `modal-title` on `h4` weight 500 to 400 (35); `accordion-header` on `h4` 24px to 16px, 500 to 400, 28.8px to 19.2px (8) |
| `p` | `card-text`, `lead`, `display-1` to `display-5`, `placeholder-glow` | restore | `card-text` margin-bottom 16px to 0px (4 and 1); `lead`, each `display-*`, `placeholder-glow` (1 each) |
| `ol, ul, dl` (margins) and `ol, ul` (padding) | `pagination`, `list-unstyled` | restore | `pagination` margin-bottom 16px to 0px (1); `list-unstyled` 16px to 0px (1) |
| `a` and `a:hover` | `alert-link`, `card-link`, `icon-link`, `icon-link-hover`, `stretched-link`, `focus-ring`, `link-body-emphasis`, `link-primary` to `link-dark`, `visually-hidden-focusable` | restore | color `rgb(13, 110, 253)` to `rgb(33, 37, 41)` and underline to none on each |
| `img, svg` | `bi`, `figure-img` | restore `vertical-align`; revert `display` | `svg.bi` display inline to block (4); `img.figure-img` inline to block (2) |
| `input, button, select, optgroup, textarea` | `form-check-input`, `btn-check`, `form-range` | revert `color` | color `rgb(0, 0, 0)`, `rgb(84, 84, 84)`, and `rgb(157, 150, 142)` to `rgb(33, 37, 41)` (13, 3, 5, 2, 1) |
| `img` with a `height` attribute | Bootstrap-classed images (`object-fit-*`) | admit `height` | preflight's `height: auto` beats the attribute's presentational hint, and a `revert` discards the hint as well (`guides/veneer.md:1271-1279`), so no layer declaration restores it |

The repairs live in `src/bootstrap/_reset.scss`, as `tune` arguments at each reboot rule's call site, with one partial-local list variable where several rules share a list (`$headings` for the heading rules, `$links` for `a` and `a:hover`), which `.claude/rules/styles.md:68` admits. The table lives in the guide's Curation section, in the exemption table's shape (Selector, Classes, Disposition, Reason), and a `readCuration` function in `tests/setup.ts`, with its proof in `tests/setup.test.ts`, reads it.

The table is pinned both ways. The sheet direction is derivation part 3 in `tests/src/bootstrap/tailwind/index.test.ts`. The measurement direction is the journey's stripped-curation control (§ 5): with the curated records deleted from the tuned sheet, the broken pairs equal the table's `restore` and `revert` rows, each row hit at least once; with them in place, no broken pair remains outside the `admit` rows. A component class the showcase never places on a reboot-named element without a class member, such as `h5.offcanvas-title` without `.h5`, is outside the table; when the showcase gains one, the measurement direction fails and the table grows.

### Named outcomes

The following list states what happens to each subject the dispatch names:

- `svg.bi` inside `.btn`: the `revert` row restores `display: inline` and the `restore` row restores `vertical-align: middle`, so the icon sits in the label's line as under Bootstrap alone; a bare `svg` with no class inside `.btn` is Tailwind's and renders as a block.
- `.modal-title` and `.offcanvas-title` on heading elements: `h4.modal-title` keeps 24px and weight 500 through the heading copies; the showcase's `h4.offcanvas-title.h5` keeps 20px, 500, and its 30px line height through the `.h5` class member in `bootstrap` (M3 reads 20px to 16px, 500 to 400, 30px to 24px under condition C).
- `.card-text` paragraphs: the `p` copy keeps a 16px bottom margin; a Tailwind class on the paragraph, such as `mb-0`, still wins because `utilities` follows `bootstrap`.
- `.h1` to `.h6`, `.small`, and `.mark`: the reboot declares them with their elements (`_reset.scss:33-98`, `:145-154`); the tuned target keeps each class member in `bootstrap` at the reboot's position, so a class carrier reads Bootstrap alone's value on any element (`p.h5` margin-bottom 8px, `span.mark` padding 3px, `.small` 0.875em), while the bare `h5`, `small`, and `mark` elements take preflight's values.
- A bare `p` or `h2` inside `.card-body`: Tailwind's. The `p` reads `margin: 0` and the `h2` reads 16px at weight 400, with the reboot's 1.2 line height and heading color, as M2 reads on bare elements.

## 5. Showcase

The page keeps its markup at rest with no `style` attribute, shows every `CLASS_NAMES.bootstrap` name under every face, uses no `dark:` utility, and changes face only through the header buttons. The following table gives the three faces; labels are subjective (§ 10 item 5):

| Value | Label | Style elements, in document order | What the face proves |
| --- | --- | --- | --- |
| `bootstrap` | Bootstrap only | `style#veneer-bootstrap` (the built `./bootstrap`) | Every Bootstrap class under the lifted sheet alone |
| `unexcluded` | Bootstrap and Tailwind | `style#veneer-unexcluded` (the `unexcluded` compile), `style#veneer-bootstrap` | The raw collision: Tailwind's `collapse` and `container` rules break components, Bootstrap's important utilities keep the shared names, and the reboot beats preflight |
| `tailwindcss` | Bootstrap for Tailwind | `style#veneer-tailwindcss` (the `recipe` compile), `style#veneer-bootstrap-tailwind` (the built `./bootstrap/tailwind`) | Tailwind wins every shared utility and every reset conflict; Bootstrap-classed elements read Bootstrap alone |

The `Face` union in `app/browser/types.ts:13` gains `unexcluded`; `FACES` (`app/browser/constants.ts:31-34`) lists three choices; `Showcase` (`app/browser/Showcase.ts:47-55`, `:165-187`) holds four style elements and swaps them per face, with each Tailwind compile placed directly before its Bootstrap sheet. `FACE_LABELS` (`tests/setupBrowser.ts:157-160`) gains the middle label.

The statechart rows follow from the faces. `FACE_SCENARIOS` (`tests/setupBrowser.ts:1140-1185`) holds 9 rows, one per pressed button per face, each named "`FROM` becomes `TO` through the `LABEL` button" or "`FROM` stays `FROM` through the `LABEL` button", where `FROM`, `TO`, and `LABEL` stand for the start face, the end face, and the pressed button's label. `buildPairScenarios` (`:1287-1308`) yields 6 pairs, each reached from the next face in button order with the opposite theme. The lanes log predicts both moves before the unit lands.

### `TAILWIND_READINGS` after the flip

`TailwindReading.values` and `narrow` key on `Face`, which absorbs the `unexcluded` key (`tests/setupBrowser.ts:141-147`). The following table gives every row; values come from today's rows (`:213-300`), M2, M3, M5, and the Tailwind theme, and the two added specimens are marked:

| Specimen | Subject and property | `bootstrap` | `unexcluded` | `tailwindcss` |
| --- | --- | --- | --- | --- |
| Tailwind padding on a Bootstrap button | `button` `padding-left` | 12px | 32px | 32px |
| Shared spacing takes Tailwind's scale | `.mt-3` `margin-top` | 16px | 16px | 12px |
| Shared spacing takes Tailwind's scale | `.gap-4` `column-gap` | 24px | 24px | 16px |
| Collapse stays visible | `.collapse` `display`, `visibility` | block, visible | block, collapse | block, visible |
| Container keeps Bootstrap's widths | `.container` `padding-left` | 12px | 12px | 12px |
| Container keeps Bootstrap's widths | `.container` `max-width` (390px) | 1140px (none) | 1280px (none) | 1140px (none) |
| Pill radius beside rounded-full | `button` `border-top-left-radius` | 800px | 800px | 800px |
| Tailwind grid in a card body | `.grid` `display` | block | grid | grid |
| Tailwind variant at the md breakpoint | `.md\:flex` `display` (390px) | block (block) | flex (block) | flex (block) |
| Arbitrary margin value | `.mt-\[1rem\]` `margin-top` | 0px | 16px | 16px |
| Bare image and list | `img` `display`; `ul` `list-style-type` | inline; disc | block; none | block; none |
| Hidden attribute with a display utility | `[hidden]` `display` | flex | none | none |
| Tailwind border width draws (added) | `.border-1` `border-top-style` | none | solid | solid |
| The layer keeps component text Bootstrap's (added) | `.card-text` `margin-bottom`; bare `p` `margin-bottom`; bare `h5` `font-size`; `svg.bi` `display` | 16px; 16px; 20px; inline | 16px; 16px; 20px; block | 16px; 0px; 16px; inline |

### The partition proof

The `reads the resolved values under its declared variant and every stylesheet set` case replaces face invariance (`tests/app/browser/integration.test.ts:826-1003`). In the `light-1280`, `dark-1280`, `light-390`, and `dark-390` variants it reads, under each face, the computed longhands of every element that precedes the Bootstrap with Tailwind group, its five pseudo-elements, and each box, as today. For each departure from the `bootstrap` face, a pure `partitionDepartures` function in `tests/setup.ts` assigns the first bucket of § 4 that claims it: inert, Tailwind, bare, inherited, geometry, admitted, or own. It reads the following assertions:

- Under `tailwindcss`, the own bucket is empty in every variant.
- Under `unexcluded`, the own bucket holds the `collapse show` specimen's `visibility: collapse` row. This is the positive control, replacing today's adopted-sheet control.
- At `light-1280` only, the test deletes the curated records from `style#veneer-bootstrap-tailwind` and reads again: the own bucket then equals the curation table's `restore` and `revert` rows, the measurement direction of § 4.
- The census still reads the page's class tokens equal to the registry, `TAILWIND_CLASSES`, and the icon tokens.

### The Bootstrap with Tailwind section

`app/browser/sections/tailwindcss.html` keeps its 12 specimens, adds the two marked in the preceding table, and rewrites every caption from "Bootstrap keeps its rule" to the face readings. The subjective lane finalizes the wording; the following list gives the proposed claims:

1. Tailwind padding on a Bootstrap button: Tailwind's `px-8` sets 32px under both Tailwind faces; Bootstrap's button keeps 12px alone.
2. Shared spacing takes Tailwind's scale: with the layer, `mt-3` reads 12px and `gap-4` 16px from Tailwind; without it, Bootstrap's important rules keep 16px and 24px.
3. Collapse stays visible: the layer keeps `collapse` Bootstrap's; without it, Tailwind's `collapse` utility sets `visibility: collapse`.
4. Container keeps Bootstrap's widths: without the layer, Tailwind's container caps the width at 1280px.
5. Pill radius beside rounded-full: Bootstrap's important `rounded-pill` wins under every face.
6. Tailwind grid in a card body: Tailwind's `grid` applies under both Tailwind faces.
7. Tailwind variant at the md breakpoint: `md:flex` applies from 768px under both Tailwind faces.
8. Arbitrary margin value: `mt-[1rem]` applies under both Tailwind faces.
9. Bare image and list: preflight sets a bare image to block and removes a bare list's markers under both Tailwind faces.
10. Hidden attribute with a display utility: preflight's important `[hidden]` rule hides the element under both Tailwind faces.
11. Tailwind border width draws: Tailwind's `border-1` sets a solid style and a 1px width; Bootstrap's sets the width only.
12. The layer keeps component text Bootstrap's: with the layer, card text keeps its 16px margin and an icon stays inline, while a bare paragraph and a bare heading take preflight's values.

### Chrome

The chrome replaces each drifting shared name on its figures, cards, captions, and specimen frames with a non-shared Bootstrap class of equal Bootstrap-alone value, and keeps each repeated shared name. The partition case derives the repeated and drift sets live (`tests/integration.test.ts:548-560`). The reason: the chrome frames every specimen, and M3 reads `h-100` at 400px, `w-100` at 400px against 582px, `gap-3` at 12px against 16px, `rounded` at 4px against 6px, and the `border` color moving to the text color under the flip, which would make every face difference a chrome difference. The following list gives the proposed replacements, each a name absent from `comparison.json` `.shared` (`tests/fixtures/tailwindcss/comparison.json:11-221`):

- `h-100` on `figure.card`: `d-flex` on its `.col` and `flex-fill` on the card.
- `w-100` on frames: `flex-fill`.
- `gap-3`: `row-gap-3 column-gap-3`.
- `rounded`: `rounded-2`.
- `border`: `border-top border-end border-bottom border-start`.
- Kept, because each is repeated: `mb-0`, `mt-1`, `p-2`, `gap-2`, `bg-transparent`, and `flex-wrap`.

Acceptance: the Bootstrap-only readings of every chrome element are equal before and after, and a census case reads no drifting shared name on chrome. Specimens keep every shared name they demonstrate.

## 6. Records and proofs

The following table rules on each committed record:

| Record | Fate | Reason |
| --- | --- | --- |
| `tests/fixtures/tailwindcss/oracle.min.json` | keeps its meaning | The map of what `tailwindcss` 4.3.3 generates; the flip reads it |
| `comparison.json` | keeps its meaning | Source of the 192 and 17 partition and of `$shared` |
| `similar.json` | keeps its meaning | Unaffected |
| `preflight.json` | keeps its bytes and meaning; its role changes | Its rows are condition D against A, and M2 reads B equal to D on every row; under the flip they are Tailwind's baseline on bare elements |
| `incompatible.json` | retired | Its composition loaded the mirror, which the flip deletes, so its pin cannot be reproduced; the live shared-delta partition covers all 209 names at 19 widths |
| `tests/fixtures/tailwindcss/recipe.json` | keeps its shape; regenerates | `sheet` digest and `recipe` change with the thin sheet; `unexcluded` is unchanged |
| `app/browser/recipe.json` | keeps its shape; regenerates | The page reads both `recipe` and `unexcluded`, each now a face |
| The Curation table in `guides/veneer.md` | added | Pinned both ways, § 4 |
| The exemption table (`guides/veneer.md:1288-1290`) | retired | The mirror it exempted goes |

### `tests/conformance.test.ts`, Node

The `Tailwind compatibility recipe` describe (`:1152-1400`) changes as the following table states:

| Case | Fate |
| --- | --- |
| `pins the exclusion statement byte for byte directly after the order statement` | inverts: the expected names are the registry minus `$shared`, and the unit pins the measured byte length |
| `pins the complete mirror after one Sass round trip with exemptions read both ways` | goes, with `collectMirror` (`tests/setupServer.ts:1012`) and `readExemptions` (`tests/setup.ts:2091`) and its setup proof |
| `excludes Bootstrap candidates while retaining px-8 and rejects a stripped exclusion` | inverts: the 1833 names are absent, `mt-3` is emitted, and a stripped exclusion brings back `collapse` |
| `excludes theme-generated and user-defined Bootstrap names` | stays, adding `mt-3` as emitted |
| `excludes exact candidates while preserving authored selectors and variant and arbitrary names` | inverts its witness from `mt-3` to `container` |
| `pins the unexcluded Bootstrap census to accepted selector identities in the inventory` | stays |
| `refuses apply of an explicitly excluded Bootstrap utility` | inverts: `@apply collapse` fails, `@apply mt-3` compiles |
| `places properties before the literal order and Tailwind order and preflight before the mirror` | becomes `places properties before the literal order and Tailwind order`: preflight is the only `base` block, and the omitted-line and reversed-import controls stay |
| `pins the recipe record to live compiles, candidate membership, and the built-sheet digest` | stays |
| `pins the showcase recipe record to live compiles over the registry and the Tailwind specimens` | inverts membership: the `recipe` classes equal the 192 shared utilities plus `TAILWIND_CLASSES` (M5 reads 206 class tokens), none of the 1833 |

Added Node cases: `withholds exactly the shared utilities and excludes every other Bootstrap name` (Tailwind describe); `proves the tuned link between the authored Sass compile and the built Bootstrap for Tailwind sheet with an appended-rule control` and `refuses the Tailwind switch without layers` (`Bootstrap artifact conformance` describe). Link 1, link 2, and the region cases stay unchanged and prove the default output byte-identical.

### `tests/src/tailwindcss/index.test.ts`, Chromium `src:tailwindcss`

The following list rules on its three cases:

- `ships its declared order and writes no foreign layer or Bootstrap declarations` inverts: the order statement is the only CSSOM rule, and no layer block exists.
- `declares no class name` stays.
- `excludes every Bootstrap name in one directive and exposes no source rule in CSSOM` inverts to the 1833 names, with a dropped name and an appended shared name as controls.

### `tests/src/bootstrap/tailwind/index.test.ts`, Chromium `src:bootstrap`, added

The following list gives the file's cases:

- `derives the Bootstrap for Tailwind sheet from the lifted sheet and nothing else`: the four parts of § 3, with controls.
- `opens with the shared order and writes only reset and bootstrap blocks and unlayered importance`.

Every existing `tests/src/bootstrap/index.test.ts` case stays, because it reads `./bootstrap`.

### `tests/integration.test.ts`, Chromium `integration`

The following table rules on each existing case the flip touches and adds the cases the consumer cases need:

| Case | Fate |
| --- | --- |
| `pins the live moved rows in both directions with planted and removed controls` (`:324`) | stays; unchanged, and host-bound on Chromium 141 as today |
| `restores every recorded longhand with base revert counters and fails with counters stripped` (`:339`) | goes |
| `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win` (`:358`) | goes |
| `keeps hidden elements hidden and records the display utility departure` (`:386`) | stays, reading the recipe with the tuned sheet; Bootstrap alone `{none, flex}`, tuned `{none, none}`, important-revert control `{block, block}` |
| `places properties below reset and rejects a separate Veneer sheet loaded first` (`:412`) | stays |
| `restores bare images and lists to lifted Bootstrap and rejects a removed mirror` (`:428`) | inverts: bare `img` block and bare `ul` none under the tuned composition, curated `svg.bi` and `img.figure-img` inline |
| `keeps the height attribute of a sized image under the recipe and rejects a revert mirror` (`:463`) | inverts: 48px under the tuned composition against 24px alone, the admitted row |
| `keeps a reset layer value under the recipe and rejects a revert mirror` (`:483`) | goes; the following added reboot case carries the `reset` claim |
| `partitions every shared name, pins incompatible rows both ways, and restores every carrier under the recipe` (`:531`) | becomes `reads every shared delta as Tailwind's and every shared component as Bootstrap's under the tuned composition`: the repeated and drift derivation stays; each shared utility's delta equals its Tailwind-alone delta and each shared component's delta equals lifted Bootstrap alone's at 19 widths; a planted Bootstrap `.mt-3` important rule is the control |
| `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` (`:648`) | inverts: `departs on every enumerated preflight row under the tuned composition` |
| `keeps collapse show visible under the recipe and reads collapse visibility with the rule exposed` (`:667`) | stays, with the tuned sheet |
| `keeps every pair of built sheets disjoint in each shared layer` (`:689`) | stays, adding the tuned sheet (owns `reset` and `bootstrap`) paired with `./tailwindcss`, `./styles`, and `./styles/themes` |
| `reads a composed border modifier as solid on both sides` (`:717`) | stays |
| `resolves the same cascade in all 24 sheet permutations` (`:91`) | stays |
| `lets preflight beat the reboot where both declare and keeps the reboot where preflight is silent` | added |
| `withholds the shared utilities and leaves them unstyled without Tailwind` | added |
| `lets a consumer unlayered important and a Tailwind important modifier win on a shared name` | added |

The added reboot case reads, on every bare element subject, three live compositions: T (recipe plus tuned), D (recipe plus lifted), and R (T with the tuned `reset` blocks deleted). It asserts that every pair where T differs from D reads R equal to T, so preflight wins where both declare, and that every pair where R differs from T reads T equal to Bootstrap alone, so the reboot supplies what preflight never declares. It also pins the M2 witnesses (`h1` 16px, 400, 19.2px; `p` 0px; body color `rgb(33, 37, 41)`). It reads no record.

### The journeys and app tests, Chromium

The following list gives the journey and app changes:

- The partition case replaces the invariance case (§ 5).
- `J4 compares the two stylesheet sets through the Stylesheets buttons` becomes `J4 compares the three stylesheet sets through the Stylesheets buttons`.
- J2's "four header buttons" becomes five.
- J6 reads every stylesheet set.
- `compares paired open engine states under both faces and switches a shown popover` asserts the partition's empty own bucket under every face in place of equality.
- `tests/app/browser/Showcase.test.ts` pins the per-face style elements.
- `tests/setupBrowser.test.ts` and `tests/app/browser/constants.test.ts` follow `FACES`, `FACE_SCENARIOS`, and `TAILWIND_READINGS`.

### Preflight rows across hosts

The proofs pass on the cloud host (Chromium 141) and the engine host (Chromium 153) because no flip proof compares a stored value. The inverted `departs on every enumerated preflight row` case compares keys only: it skips a record row whose longhand the running engine's `getComputedStyle` enumeration lacks, and requires the skipped set to equal the record longhands absent from that enumeration (on Chromium 141, `row-rule-color` on 16 rows, M2 § 4). It compares no value, because the 14 differing rows are user-agent form metrics (`input` width 208px against 189px, `select` height 23px against 25px) that move on both hosts (M2 § 4). The converse direction, live departures without a record row (12 on Chromium 141: `html` font family and `table` border colors), is carried by the added reboot case, which reads no record. The record pin case stays unchanged and in the host-bound set; the base-counters case leaves that set, and the restores case leaves it by inverting, so the integration host-bound set shrinks from 3 titles to 1.

### Regeneration path

Veneer's `tmp/units/` holds no file on this host (a glob of `/home/user/veneer/tmp/units/*` returned nothing on 2026-10-04). The following list gives what each record needs:

- The two `recipe.json` records regenerate through a writer rewritten as `tmp/units/tailwind-recipe.ts` (ignored), modeled on `probes/sheets-probe.ts:77-93`, whose reproduction of `recipe.json` `.unexcluded` read true (sheets lane, method checks). Its proofs are the two conformance pin cases, which read each record equal to live compiles.
- `oracle.min.json`, `comparison.json`, `similar.json`, and `preflight.json` need no regeneration.
- `incompatible.json` is deleted with its guard, `isIncompatibleRecord` (`tests/setup.ts:2045`), and `deriveIncompatibleRows`, which lose their last consumer.
- The curation table is authored from probe P2's output and is self-checking through its two pins.

## 7. Guide and roadmap

The following list gives the `guides/veneer.md` sections to rewrite:

- § Bootstrap sheet (`:967-1145`): add one paragraph on the `$tailwind` switch, its default byte identity, and the `@error` refusal without layers.
- § Additions (`:1189-1195`): scope "records no addition" to `./bootstrap`, and point at the Curation table for the tuned target.
- § Tailwind compatibility sheet (`:1197-1319`): rewrite as the thin sheet: the order statement and the 1833-name exclusion, the consumer-theme limit of R3, and the override table without the mirror rows. Delete the mirror paragraphs and the exemption table.
- Add § Bootstrap for Tailwind sheet after it: the derivation, the reboot in `reset` with the class members in `bootstrap`, the withheld utilities, the Curation table, the consumer cases of § 2, and the Tailwind-absent statement.
- § Composition (`:1431-1450`): rewrite the order list.
- § Load real Tailwind (`:1452-1517`): rewrite reasons 2 and 3 and the paragraphs on exclusion, `@apply`, and the linked sheet.
- § Compare Bootstrap and Tailwind (`:1529-1636`): replace the incompatible paragraph with the shared-delta partition, and state `preflight.json`'s role.
- § Showcase, § Faces, § Tailwind record, and § Census limit (`:1638-1803`): three faces, the readings table, and the partition proof in place of invariance.

The following list gives the sentences to reverse, quoted:

- "The `bootstrap` layer follows the `base` layer, so Bootstrap's reboot beats Tailwind's preflight." (`:1444`)
- "Real Tailwind reads the statement and generates none of those names, so a Bootstrap class keeps Bootstrap's rule." (`:1233-1235`)
- "so the `mt-3` class keeps Bootstrap's 16 px top margin instead of Tailwind's 12 px." (`:1486-1487`)
- "the `px-8` class is emitted and the `mt-3` class is not" (`:1481`)
- "which is why the compatibility sheet excludes every Bootstrap class name." (`:1561-1562`)
- "under the compiled recipe every row reads the value lifted Bootstrap alone computes" (`:1628-1629`)
- "Bootstrap markup renders as it does under Bootstrap alone, and only the Tailwind group's classes gain rules" (`:1684`)
- "Both faces must read the same, with no departure in any section." (`:1700`)
- "A Tailwind utility or markup that relies on a preflight declaration does not receive it under the recipe" (`:1304-1305`)

The following list gives the `ROADMAP.md` changes:

- Line 14: add "The `$tailwind` switch derives the Bootstrap for Tailwind target from the same source; links 1 to 3 bind `./bootstrap` alone."
- Line 15: replace the mirror and "Bootstrap wins on a shared class" sentences with this tenet: "Tailwind is the utility library the consumer supplies, and Bootstrap is its component library: at a shared utility name or a reset conflict Tailwind wins, the 17 shared component names stay Bootstrap's through the exclusion, and the Bootstrap for Tailwind target repairs every Bootstrap-classed element the flip moves, recorded in the guide's Curation table."
- Line 29: replace "`bootstrap` follows `base` so Bootstrap's reboot beats Tailwind's preflight" with "`reset` precedes `base`, so in the Bootstrap for Tailwind target Tailwind's preflight beats the reboot".
- Lines 33 to 40: `./tailwindcss` writes no layer block; add the `./bootstrap/tailwind` row (`reset`, `bootstrap`, unlayered importance); remove the `base` exception.
- Line 44: remove the mirror clause and add the linked target.
- Lines 53 and 54: the exports.
- Line 58: the `files` list.
- Line 60: the sheet entries.
- Line 113: the target writes `reset`.

The following list gives the changes to `.orkestrel/veneer/plan.md` § Standing rulings:

- Add the user's ruling of 2026-10-04 as R1 to R4.
- Strike the bound clause "'Bootstrap wins on a shared class' bound to the Tailwind compatibility layer" (`:11`).
- Strike the mirror and exemption clauses of the map-closure entry (`:24`).

## 8. Units

The units run in order. All veneer units share one worktree (`veneer-wt-flip`) with one writer at a time, and the scaffold unit runs in the scaffold checkout. Each unit stops at its project boundary and reports the commands it ran. The following list gives each unit:

1. U0, probes (objective; Astra through `analyst`; no tracked file). Owned: veneer `tmp/probes/flip/tuned/`. Runs P1 to P5 of § 9. Acceptance: each probe's report under `.orkestrel/veneer/tailwind-flip/` with its readings. Gate: none.
2. U1, scaffold rule amendments (objective; builder in the scaffold checkout). Owned: `.claude/rules/workspace.md` (`:38` and the build outputs table: one derived target per sheet face, `src/<name>/<target>/sheet.ts`, built after its face into `dist/src/<name>/<target>`); `.claude/rules/styles.md` (`:19-25`, a target barrel configuring its face barrel; `:72-74`, a utility-framework target writes the recreation's reset partial into `reset`); the policy source of `tests/setupPolicy.ts` (`:2424-2428` sheet set, `:3964-3967` build order). Acceptance: scaffold `npm run test:policy`, the touched test files, and the prose sweep. Gate: § 10 item 2 ruled; the user publishes the release; veneer re-pins through `scaffold overwrite`.
3. U2, the Bootstrap switch (objective; builder). Owned: `src/bootstrap/_mixins.scss`, `_tokens.scss`, `index.scss`, `_reset.scss`, `_utilities.scss`; the added Node cases in `tests/conformance.test.ts`. Acceptance, cheap first: `npm run build:src:bootstrap`; the SHA-256 of `dist/src/bootstrap/index.css` equal before and after; `npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts`; `npm run check:src:bootstrap`; `npm run lint:check`; `npm run test:src:bootstrap`. Gate: U0 P1 passed, U1 released.
4. U3, the target and its proofs (objective; builder). Owned: `src/bootstrap/tailwind/index.scss` and `sheet.ts`; `configs/src/vite.tailwind.config.ts`; `package.json` (exports, files, build and test scripts); `tests/src/bootstrap/tailwind/index.test.ts`; the instruments in `tests/setupStyles.ts` with `tests/setupStyles.test.ts`; `readCuration` and `partitionDepartures` in `tests/setup.ts` with `tests/setup.test.ts`; the Curation table rows in `guides/veneer.md`; the distribution case for `./bootstrap/tailwind` and the `pkg:` compile with `$tailwind: true`. Acceptance: `npm run build:src:bootstrap` writes both sheets; `npm run check`; `npm run test:setup`; `npm run test:setup:browser`; `npm run test:src:bootstrap`; `npm run test:policy`.
5. U4, the thin sheet and recipe records (objective; builder). Owned: `src/tailwindcss/_tokens.scss`, `index.scss`, deleted `_reset.scss`; `tests/src/tailwindcss/index.test.ts`; the `Tailwind compatibility recipe` describe; `tests/setupServer.ts`; `tests/setup.ts` with `tests/setup.test.ts`; `tmp/units/tailwind-recipe.ts`; both `recipe.json` records; the exemption table and mirror paragraphs deleted from the guide. Acceptance: regenerate both records; `npm run test:src:tailwindcss`; `npm run test:conformance`; `npm run test:setup`; `npm run test:guides`.
6. U5, composition proofs (objective; builder). Owned: `tests/integration.test.ts`; `tests/setupStyles.ts` with `tests/setupStyles.test.ts`; `tests/setup.ts` (`SHEET_LAYERS`, retired guards); deleted `tests/fixtures/tailwindcss/incompatible.json`. Acceptance: `npm run test:setup:browser`; `npm run test:integration`, with every failure in the host-bound set by title.
7. U6a, the showcase copy brief (subjective; Opus; no tracked file). Writes the face labels, the 14 captions, and the chrome mapping table beside `status.md`. Gate: § 10 item 5 ruled.
8. U6b, the showcase faces and partition (objective; builder). Owned: `app/browser/types.ts`, `constants.ts`, `Showcase.ts`, `factories.ts`, `helpers.ts`, `sections/*.html` (chrome) and `sections/tailwindcss.html`; `tests/setupBrowser.ts` with `tests/setupBrowser.test.ts`; `tests/app/browser/**`. Acceptance: `npm run check:app:browser`; `npm run test:app:browser`; `npm run test:setup:browser`; `npm run build`; `npm run test:journey`. The lanes log carries the predicted rows: face table 4 to 9 rows, pair table 4 to 6.
9. U7, guide and roadmap (subjective; Opus). Owned: `guides/veneer.md` prose, `ROADMAP.md`, `README.md` where its pitch names the mirror, and `.orkestrel/veneer/plan.md` in the scaffold worktree, written by the Orchestrator as a second checkout. Acceptance: `npm run test:guides`; `npm run test:policy`, which runs the prose sweep; a case-insensitive sweep of `guides/veneer.md` and `ROADMAP.md` for `mirror`, `exemption`, `keeps Bootstrap's`, and `reboot beats`, reporting each hit.
10. U8, verify and rebuild (verifier; edits no source except the rebuilt page). Runs `npm run build` then `npm run build:showcase`, and commits `showcase/browser.html`. Then it reads these gates bare: `format:check`, `lint:check`, `check`, `test:src:browser`, `test:src:bootstrap`, `test:src:tailwindcss`, `test:setup`, `test:setup:browser`, `test:app:browser`, `test:journey`, `test:integration`, `test:conformance`, `test:policy`, and `test:guides`. Landing condition: every failure is in the host-bound set, re-read by title, with the integration set reduced to `pins the live moved rows in both directions with planted and removed controls`.

## 9. Risks and the first probe

The following list gives the three load-bearing claims most likely to fail, each with the probe that settles it before U2 starts:

1. Claim: the switch derives the tuned target from the authored source while `./bootstrap` stays byte-identical. The risk is Sass's `&` member split and its `@at-root (without: layer rule)` re-entry into `@layer bootstrap`. The unlayer comment records that Sass moves a lifted media rule after its enclosing media block (`_mixins.scss:75`), so a class member's media rule could land after a rule it must precede. Probe P1: copy `src/bootstrap` to `tmp/probes/flip/tuned/src`, add the § 2 mixins and call sites, and compile `index.scss` with dart-sass 1.105.1 three ways (`$layered: false`; default; `$tailwind: true`). Read the drop-in and lifted outputs byte-equal to today's compiles. Then adopt the tuned output beside `dist/src/bootstrap/index.css` in Chromium and run the four derivation parts with `flattenRules`, reading that every `bootstrap`-layer reboot record precedes the first component record. Output: pass or fail per part, with the 199 withheld rules counted.
2. Claim: the class members plus the curated copies close the own bucket on the showcase, with an admit list of one selector. The risk is M3's weak attribution (verify, objection 3: 10337 strict occurrences unknown, 3334 extended labels resting on no row) and its probe-built sheets. Probe P2: re-run `probes/m3-components-probe.ts` and its analyzer with condition T (the flipped compile plus P1's tuned text, not CSSOM-serialized) and T0 (T with the curated records deleted). Add each element's parent readings, and apply the § 4 buckets. Output: the own bucket under T0, which yields the curated lists and the `revert` and `admit` rows, and the own bucket under T, which must hold only the `admit` rows.
3. Claim: the scaffold rules and the policy sweep admit a sheet target inside a styles extension and the `reset` emission. The risk is that `readPolicySurface` enumerates sheets from faces plus `src/styles/themes/sheet.ts` alone (`tests/setupPolicy.ts:2424-2428`), and its build-order check names only the themes chain (`:3964-3967`). Probe P3: in a scratch worktree, add `src/bootstrap/tailwind/index.scss`, `sheet.ts`, and the Vite wrapper, chain the build script, and run `npm run test:policy` and `npm run build:src:bootstrap`. Record each refusal by rule; with § 10 item 2, the result fixes U1's scope.

Two smaller probes ride in U0. P4: compile the recipe over `collapse!`, `container!`, and `mt-3!`, and read which classes the 1833-name exclusion emits. P5: mount `<div hidden="until-found">` under Bootstrap alone and under the tuned composition, and read `display` and `content-visibility`. Probe M1 left open, the normal-form `revert-layer` inside `bootstrap`, serves the thin-counter alternative and is not needed here.

The remaining risks, with their bounds:

- The `reset` layer is shared with `./styles`, whose reset partial is empty (`src/styles/_reset.scss:1-2`). A later styles reset rule on an element would compete with the reboot by source order, and the disjointness case reads class names only.
- The journey reads three faces in place of two, about 50% more readings per variant, plus one stripped read at `light-1280`.
- A `tailwindcss` version bump changes the shared set; the `$shared` and exclusion pins then fail by design.

## 10. What the user must rule

The following list gives the decisions this proposal cannot settle from the user's words, each with the recommended default:

1. The 17 shared component names stay Bootstrap's through the exclusion, keeping 17 conflicts from Tailwind that R1's "every conflict" does not allow. Default: keep them Bootstrap's, because `collapse` is engine-written and Tailwind's rules break the collapse, container, grid, and table components (R2).
2. Amend the scaffold rules: `workspace.md:38` and the build outputs table (one derived target per sheet face), and `styles.md:72-74` (a utility-framework target writes the recreation's reset into `reset`). Default: amend, mirroring the themes target. Fallback if refused: the `$tailwind` switch on `./bootstrap/scss` alone, with the tuned compile committed in `app/browser/recipe.json` for the page; consumers then need Sass, and the reset rule still needs its amendment.
3. Curation scope: every non-shared Bootstrap class (component, modifier, composable, and non-shared utility) against the component category alone. Default: every non-shared Bootstrap class, because M3 reads 1988 reboot-attributable pairs on bootstrap-other elements.
4. The chrome: replace drifting shared names against accepting the visible change. Default: replace, as § 5 maps.
5. Face values and labels (subjective lane). Default: values `bootstrap`, `unexcluded`, and `tailwindcss`; labels "Bootstrap only", "Bootstrap and Tailwind", and "Bootstrap for Tailwind".
6. Retire `incompatible.json` against regenerating it as the record of what flips. Default: retire; the live shared-delta partition covers it at 19 widths.
7. `hidden="until-found"`: Bootstrap's lifted `[hidden]` rule hides it, where preflight exempts it. Default: if P5 reads a difference, the tuned target withholds Bootstrap's `[hidden]` rule so Tailwind's narrower rule decides, per R1; otherwise keep it lifted.
8. Names: the export `./bootstrap/tailwind`, the folder `src/bootstrap/tailwind/`, and the wrapper `configs/src/vite.tailwind.config.ts` (project `src:tailwind`), which sits close to `vite.tailwindcss.config.ts`. Default: these names.
9. The 192-name `$shared` list in published SCSS counts as exporting the map, or not. Default: not, because it names Bootstrap classes only, carries no Tailwind rule or value, and the complement of the shipped exclusion already reveals it.
10. `dark:` with Bootstrap color modes. Default: keep the guide's limit; the page uses no `dark:` utility, and the recipe stays three lines.
