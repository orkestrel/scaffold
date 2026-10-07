The owned changes are complete and all requested gates passed. Bootstrap remains byte-identical through stage 4; stage 5 changes only the opening layer statement. Nothing was committed. Three `base` references remain in explicitly unowned files, detailed below.

`WT` means `/home/user/.wave/veneer-tw-d`. Queue folders below are relative to `/home/user/veneer/tmp/units/journey-cost/runs/`.

The diff stat is:

```text
 ROADMAP.md                                     |   6 +-
 guides/veneer.md                               |  15 +-
 src/bootstrap/_mixins.scss                     | 343 ++----------------
 src/bootstrap/_reset.scss                      | 460 ++++++++-----------------
 src/bootstrap/_tokens.scss                     | 358 +++++++++----------
 src/bootstrap/_utilities.scss                  | 116 +++----
 src/bootstrap/components/_accordion.scss       |  10 +-
 src/bootstrap/components/_badge.scss           |   2 +-
 src/bootstrap/components/_buttons.scss         | 424 +++++++++++------------
 src/bootstrap/components/_card.scss            |   2 +-
 src/bootstrap/components/_carousel.scss        |  20 +-
 src/bootstrap/components/_close.scss           |   6 +-
 src/bootstrap/components/_color-bg.scss        |  31 +-
 src/bootstrap/components/_colored-links.scss   |  56 ++-
 src/bootstrap/components/_containers.scss      |  20 +-
 src/bootstrap/components/_dropdown.scss        |  34 +-
 src/bootstrap/components/_floating-labels.scss |   2 +-
 src/bootstrap/components/_form-check.scss      |  26 +-
 src/bootstrap/components/_form-control.scss    |   4 +-
 src/bootstrap/components/_form-range.scss      |  16 +-
 src/bootstrap/components/_form-select.scss     |   8 +-
 src/bootstrap/components/_grid.scss            |  20 +-
 src/bootstrap/components/_list-group.scss      |  16 +-
 src/bootstrap/components/_modal.scss           |  18 +-
 src/bootstrap/components/_nav.scss             |   6 +-
 src/bootstrap/components/_navbar.scss          |  30 +-
 src/bootstrap/components/_offcanvas.scss       |  42 +--
 src/bootstrap/components/_pagination.scss      |   8 +-
 src/bootstrap/components/_placeholders.scss    |  13 +-
 src/bootstrap/components/_position.scss        |  10 +-
 src/bootstrap/components/_progress.scss        |  10 +-
 src/bootstrap/components/_tables.scss          | 154 ++++-----
 src/bootstrap/components/_type.scss            |   2 +-
 src/bootstrap/components/_validation.scss      |  12 +-
 src/styles/_tokens.scss                        |   2 +-
 tests/conformance.test.ts                      |  94 -----
 tests/setup.test.ts                            |   3 +-
 tests/setup.ts                                 |   1 -
 tests/setupStyles.test.ts                      |  10 +-
 39 files changed, 889 insertions(+), 1521 deletions(-)
```

The recorded Bootstrap digests are:

| Stage | Folder or saved baseline | Bytes | SHA-256 |
|---|---|---:|---|
| 1: before edits | `WT/tmp/units/twd/original-bootstrap.css` | 332388 | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| 2 | `twd-stage2` | 332388 | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| 3 | `twd-stage3` | 332388 | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| 4 | `twd-stage4` | 332388 | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| 5 | `twd-stage5-resumed` | 332382 | `be65ef786f0b4995ae4c82cba85184abe2858bdd7b74aea740f5cfa550402d37` |
| 6 | `twd-bootstrap-resumed` | 332382 | `be65ef786f0b4995ae4c82cba85184abe2858bdd7b74aea740f5cfa550402d37` |
| Final full build | `twd-final-build-resumed` | 332382 | `be65ef786f0b4995ae4c82cba85184abe2858bdd7b74aea740f5cfa550402d37` |

Each digest was read with `node -e` using `node:crypto`. The final styles digest is `735af19df3e1f79c3599aedaf7353324acde5d93d547f016036b357ba6724958` at 126 bytes; themes is `18377e1187bb4bef4a5e482be30f80171a0efbc34b14f6a2f78799a50af82d6d` at 188 bytes.

`git diff --no-index -- tmp/units/twd/stage4.css tmp/units/twd/stage5.css` exited 1 with exactly this change:

```diff
@@ -1,5 +1,5 @@
 @charset "UTF-8";
-@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
+@layer reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
 /*!
  * Bootstrap  v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors
```

The corresponding styles and themes comparisons also exited 1, each changing only that opening statement. A final Node assertion verified all three rebuilt sheets equal their saved originals after that single replacement.

The queued gate results are:

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `npm run build:src:bootstrap` | `twd-stage2` | 0 | `✓ built in 1.85s` |
| `npm run build:src:bootstrap` | `twd-stage3` | 0 | `✓ built in 1.88s` |
| `npm run build:src:bootstrap` | `twd-stage4` | 0 | `✓ built in 1.85s` |
| `npm run build:src:bootstrap` | `twd-stage5-resumed` | 0 | `✓ built in 1.81s` |
| `npm run test:src:bootstrap` | `twd-bootstrap-resumed` | 0 | `Test Files 1 passed (1); Tests 14 passed (14)` |
| `npm run test:src:styles` | `twd-styles-resumed` | 0 | `Test Files 2 passed (2); Tests 15 passed \| 1 todo (16)` |
| `npm run test:conformance` | `twd-conformance-resumed` | 0 | `Test Files 1 passed (1); Tests 83 passed (83)` |
| `npm run test:integration` | `twd-integration-resumed` | 0 | `Test Files 1 passed (1); Tests 41 passed (41)` |
| `npm run test:setup` | `twd-setup-resumed` | 0 | `Test Files 2 passed (2); Tests 139 passed (139)` |
| `npm run test:setup:browser` | `twd-setup-browser-resumed` | 0 | `Test Files 2 passed (2); Tests 122 passed (122)` |
| `npm run test:guides` | `twd-guides-resumed` | 0 | `Test Files 1 passed (1); Tests 15 passed (15)` |
| `npm run build` | `twd-final-build-resumed` | 0 | All source and application builds completed; final duration 22.25 seconds |

Every queued command used the prescribed `flock` runner, npm 11 PATH, and worktree cwd. Launches used `nohup setsid bash -c 'exec flock …'`, with detached logs under `WT/tmp/units/twd/`. Each completed run’s `end.json`, `stdout.log`, and `stderr.log` was read.

The direct formatting command, run from `WT`, exited 0:

```text
node_modules/.bin/oxfmt --check 'src/bootstrap/**/*.scss' src/styles/_tokens.scss tests/src/bootstrap/index.test.ts 'tests/fixtures/bootstrap/*.scss' 'tests/fixtures/bootstrap/*.json' tests/conformance.test.ts tests/integration.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/src/styles/index.test.ts tests/src/styles/themes/index.test.ts guides/veneer.md ROADMAP.md

Checking formatting...

All matched files use the correct format.
Finished in 234ms on 83 files using 4 threads.
```

The direct lint command, run from `WT`, exited 0 with empty output:

```text
node_modules/.bin/oxlint --deny-warnings tests/src/bootstrap/index.test.ts tests/conformance.test.ts tests/integration.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/src/styles/index.test.ts tests/src/styles/themes/index.test.ts
```

The remaining direct gates were:

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `git diff --check` | `WT` | 0 | Empty output |
| `git status --porcelain` | `WT` | 0 | Owned files only; full output below |
| `grep -rn 'withhold\|curated\|restored\|reverted\|supplied\|scoped\|unscoped\|palette\|\$scale\|measure(\|swatch(' src/bootstrap` | `WT` | 1 | Empty output |
| `grep -rn 'base' src --include='*.scss'` | `WT` | 0 | Only the non-layer matches below |

The `base` search returned:

```text
src/bootstrap/components/_badge.scss:19:		vertical-align: baseline;
src/bootstrap/_reset.scss:160:		vertical-align: baseline;
src/bootstrap/_reset.scss:380:		vertical-align: baseline;
src/bootstrap/_utilities.scss:11:			baseline: baseline,
src/bootstrap/_utilities.scss:395:			baseline: baseline,
src/bootstrap/_utilities.scss:419:			baseline: baseline,
src/bootstrap/_utilities.scss:717:			base: 1.5,
```

The deleted suite is `Bootstrap token switches` in `tests/conformance.test.ts`, containing these cases:

- `spells every swatch form and returns the Bootstrap literal under an empty palette`
- `returns the literal under an empty scale and the row under a set scale, and refuses a missing role`
- `refuses the reset switch without layered output`

No fixtures were deleted. The Bootstrap fixtures configure only `$layered` or exercise retained behavior. No Bootstrap or integration cases configured a removed hook; their existing cases were retained, including all priority-sequence, inventory, keyframe, and departure-record proofs.

The complete substitution script is saved at [substitute.ts](/home/user/.wave/veneer-tw-d/tmp/units/twd/substitute.ts):

```ts
// Usage: node tmp/units/twd/substitute.ts. Exit 0 on the pinned substitution counts.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import assert from 'node:assert/strict'

let swatches = 0
let measures = 0
const replacements = new Map<string, string>()
for (const entry of readdirSync('src/bootstrap', { recursive: true, withFileTypes: true })) {
	if (!entry.isFile() || !entry.name.endsWith('.scss') || entry.name === '_mixins.scss') continue
	const path = join(entry.parentPath, entry.name)
	const original = readFileSync(path, 'utf8')
	let source = original.replace(/#\{(?:mixins\.)?swatch\("([^"\n]*)"(?:,\s*(?:"[^"\n]*"|[\w-]+))?\)\}/g, (_match, literal: string) => {
		swatches++
		return literal
	})
	source = source.replace(/(?:mixins\.)?swatch\('([^'\n]*)'(?:,\s*'[^'\n]*')?\)/g, (_match, literal: string) => {
		swatches++
		return `'${literal}'`
	})
	source = source.replace(/(?:mixins\.)?measure\(\s*'[^']*',\s*('[^']*'|[^()]*?)\s*\)/g, (_match, literal: string) => {
		measures++
		return literal.trim()
	})
	assert(!/\b(?:swatch|measure)\(/.test(source), path)
	if (source !== original) replacements.set(path, source)
}
assert.equal(swatches, 571)
assert.equal(measures, 141)
for (const [path, source] of replacements) writeFileSync(path, source)
const path = 'src/bootstrap/_mixins.scss'
const source = readFileSync(path, 'utf8')
assert(source.includes('\n@function -integer('))
writeFileSync(path, source.slice(0, source.indexOf('\n@function -integer(')).replace("@use 'sass:math';\n", ''))
console.log({ swatches, measures })
```

The complete `_mixins.scss` and `_tokens.scss` diffs follow, including the styles token statement:

```diff
diff --git a/src/bootstrap/_mixins.scss b/src/bootstrap/_mixins.scss
index 926bbec..e7ffb1c 100644
--- a/src/bootstrap/_mixins.scss
+++ b/src/bootstrap/_mixins.scss
@@ -1,186 +1,13 @@
 @use 'sass:list';
-@use 'sass:selector';
 @use 'sass:map';
 @use 'sass:string';
-@use 'sass:math';
 
-// _tokens.scss configures these switches for the whole face.
+// _tokens.scss configures this switch for the whole face.
 $layered: true !default;
-$withhold: () !default;
-$reset: false !default;
-$curated: () !default;
-$restored: () !default;
-$reverted: () !default;
-$supplied: () !default;
-$scoped: () !default;
-$unscoped: () !default;
-$palette: () !default;
-$scale: () !default;
-$-copying: false;
-$-root: null;
-$-tag: null;
 
 @mixin reboot {
-	@if $reset {
-		@layer reset {
-			@content;
-		}
-	} @else {
-		@include layer {
-			@content;
-		}
-	}
-}
-@function restrict($input, $classes) {
-	$output: ();
-	$where: '';
-	@each $class in $classes {
-		@if $where != '' {
-			$where: $where + ', ';
-		}
-		$where: $where + '.' + $class;
-	}
-	@each $complex in $input {
-		$last: list.nth($complex, -1);
-		$classed: false;
-		@each $simple in selector.simple-selectors($last) {
-			@if string.slice($simple, 1, 1) == '.' {
-				$classed: true;
-			}
-		}
-		@if $classed and not list.index(selector.simple-selectors($last), ':not([class])') {
-			$output: list.append($output, $complex, comma);
-		} @else if $where != '' and not list.index(selector.simple-selectors($last), ':not([class])') {
-			$unified: selector.unify($last, ':where(' + $where + ')');
-			@if $unified {
-				@each $unified-complex in $unified {
-					$replacement: '#{$unified-complex}';
-					@if string.slice('#{$last}', 1, 1) == '*' and string.slice($replacement, 1, 1) == ':' {
-						$replacement: '*' + $replacement;
-					}
-					$prefix: '';
-					@if list.length($complex) > 1 {
-						@for $index from 1 to list.length($complex) {
-							$prefix: $prefix + list.nth($complex, $index) + ' ';
-						}
-					}
-					$output: list.append($output, string.unquote($prefix + $replacement), comma);
-				}
-			}
-		}
-	}
-	@if list.length($output) == 0 {
-		@return null;
-	}
-	@return $output;
-}
-@mixin curate($normal: true) {
-	@if $-root {
-		@if $normal {
-			@each $complex in & {
-				@if '#{list.nth($complex, -1)}' == $-tag {
-					@at-root (without: rule) {
-						:where(.#{$-root}) #{$-tag} {
-							@content;
-						}
-					}
-				}
-			}
-		}
-	} @else {
+	@include layer {
 		@content;
-		@if $reset and $normal {
-			$whole: ();
-			@each $complex in & {
-				$tag: list.nth(selector.simple-selectors(list.nth($complex, -1)), 1);
-				@if map.get($unscoped, '#{$tag}') {
-					$whole: list.append($whole, $complex, comma);
-				}
-			}
-			@if list.length($whole) > 0 {
-				@at-root (without: layer rule) {
-					@layer bootstrap {
-						#{$whole} {
-							$previous: $-copying;
-							$-copying: true !global;
-							@content;
-							$-copying: $previous !global;
-						}
-					}
-				}
-			}
-			$copy: restrict(&, $curated);
-			@if $copy {
-				@at-root (without: layer rule) {
-					@layer bootstrap {
-						#{$copy} {
-							$previous: $-copying;
-							$-copying: true !global;
-							@content;
-							$-copying: $previous !global;
-						}
-					}
-				}
-			}
-		}
-	}
-}
-@mixin scope {
-	@if $reset {
-		@layer bootstrap {
-			@each $root, $tags in $scoped {
-				@each $tag in $tags {
-					$-root: $root !global;
-					$-tag: $tag !global;
-					$-copying: true !global;
-					@content;
-				}
-			}
-			$-root: null !global;
-			$-tag: null !global;
-			$-copying: false !global;
-		}
-	}
-}
-@mixin restore {
-	@if $reset {
-		@layer bootstrap {
-			@each $selector, $properties in $restored {
-				#{$selector} {
-					@each $property in $properties {
-						#{$property}: revert;
-					}
-				}
-			}
-		}
-	}
-	@include revert;
-	@if list.length($supplied) > 0 {
-		@layer bootstrap {
-			@each $name, $properties in $supplied {
-				@if list.index($withhold, $name) {
-					.#{$name} {
-						@each $property, $value in $properties {
-							#{$property}: $value;
-						}
-					}
-				}
-			}
-		}
-	}
-}
-
-@mixin revert {
-	@if $reset and list.length($reverted) > 0 {
-		@layer base {
-			@each $selector, $properties in $reverted {
-				#{$selector} {
-					@each $property in $properties {
-						#{$property}: revert-layer;
-					}
-				}
-			}
-		}
 	}
 }
 
@@ -223,27 +50,25 @@ $-tag: null;
 			}
 		}
 		@each $selector in $selectors {
-			@if not list.index($withhold, string.slice($selector, 2)) {
-				#{$selector} {
-					@if map.get($utility, css-var) {
-						$name: map.get($utility, css-variable-name) or $stem;
-						--bs-#{$name}: #{$value};
-					} @else {
-						@each $name, $local in (map.get($utility, local-vars) or ()) {
-							--bs-#{$name}: #{$local};
-						}
-						$pairs: ();
-						@each $property in map.get($utility, property) {
-							@if list.is-bracketed($value) {
-								@each $fallback in $value {
-									$pairs: list.append($pairs, ($property $fallback), comma);
-								}
-							} @else {
-								$pairs: list.append($pairs, ($property $value), comma);
+			#{$selector} {
+				@if map.get($utility, css-var) {
+					$name: map.get($utility, css-variable-name) or $stem;
+					--bs-#{$name}: #{$value};
+				} @else {
+					@each $name, $local in (map.get($utility, local-vars) or ()) {
+						--bs-#{$name}: #{$local};
+					}
+					$pairs: ();
+					@each $property in map.get($utility, property) {
+						@if list.is-bracketed($value) {
+							@each $fallback in $value {
+								$pairs: list.append($pairs, ($property $fallback), comma);
 							}
+						} @else {
+							$pairs: list.append($pairs, ($property $value), comma);
 						}
-						@include unlayer($pairs);
 					}
+					@include unlayer($pairs);
 				}
 			}
 		}
@@ -252,7 +77,7 @@ $-tag: null;
 
 // Ordered (property value) pairs preserve fallbacks; parenthesize comma-list values.
 @mixin unlayer($declarations) {
-	@if $layered and not $-copying {
+	@if $layered {
 		// Keep important declarations outside every layer in their priority order; Sass moves a lifted media rule after its enclosing media block.
 		@at-root (without: layer) {
 			@each $property, $value in $declarations {
@@ -263,7 +88,7 @@ $-tag: null;
 				}
 			}
 		}
-	} @else if not $-copying {
+	} @else {
 		@each $property, $value in $declarations {
 			@if $value == '' and string.slice('#{$property}', 1, 2) == '--' {
 				#{$property}: #{$value} !important;
@@ -273,131 +98,3 @@ $-tag: null;
 		}
 	}
 }
-
-@function -integer($text) {
-	$value: 0;
-	@for $index from 1 through string.length($text) {
-		$character: string.slice($text, $index, $index);
-		$digit: string.index('0123456789', $character);
-		@if $digit {
-			$value: $value * 10 + $digit - 1;
-		} @else if $character != ' ' {
-			@error 'Invalid palette channel #{$text}';
-		}
-	}
-	@if $value > 255 {
-		@error 'Invalid palette channel #{$text}';
-	}
-	@return $value;
-}
-
-@function -hex($value) {
-	$digits: '0123456789abcdef';
-	$high: math.floor(math.div($value, 16)) + 1;
-	$low: $value % 16 + 1;
-	@return string.slice($digits, $high, $high) + string.slice($digits, $low, $low);
-}
-
-@function -byte($text) {
-	$digits: '0123456789abcdef';
-	@return (string.index($digits, string.slice($text, 1, 1)) - 1) * 16 +
-		string.index($digits, string.slice($text, 2, 2)) - 1;
-}
-
-@function -start($literal) {
-	$lower: string.to-lower-case($literal);
-	@if string.slice($lower, 1, 7) == 'rgba%28' {
-		@return 8;
-	}
-	@if string.slice($lower, 1, 5) == 'rgba(' {
-		@return 6;
-	}
-	@if string.slice($lower, 1, 4) == 'rgb(' {
-		@return 5;
-	}
-	@return 1;
-}
-
-@function -end($literal) {
-	$index: -start($literal);
-	$commas: 0;
-	@while $index <= string.length($literal) {
-		$character: string.slice($literal, $index, $index);
-		@if $character == ',' {
-			$commas: $commas + 1;
-		}
-		@if $commas == 3 or $character == ')' or $character == '%' {
-			@return $index;
-		}
-		$index: $index + 1;
-	}
-	@return $index;
-}
-
-@function -key($literal) {
-	$value: string.to-lower-case($literal);
-	@if string.slice($value, 1, 3) == '%23' {
-		$value: '#' + string.slice($value, 4);
-	}
-	@if string.slice($value, 1, 1) == '#' {
-		@if string.length($value) == 4 {
-			$result: '#';
-			@for $index from 2 through 4 {
-				$digit: string.slice($value, $index, $index);
-				$result: $result + $digit + $digit;
-			}
-			@return $result;
-		}
-		@return $value;
-	}
-	$parts: string.split(string.slice($value, -start($value), -end($value) - 1), ',');
-	@if list.length($parts) != 3 {
-		@error 'Invalid palette literal #{$literal}';
-	}
-	@return '#' + -hex(-integer(list.nth($parts, 1))) + -hex(-integer(list.nth($parts, 2))) +
-		-hex(-integer(list.nth($parts, 3)));
-}
-
-@function -spell($literal, $key, $value) {
-	$value: -key($value);
-	@if $key == $value {
-		@return string.unquote($literal);
-	}
-	@if string.slice($literal, 1, 3) == '%23' {
-		@return string.unquote('%23' + string.slice($value, 2));
-	}
-	@if string.slice($literal, 1, 1) == '#' {
-		@return string.unquote($value);
-	}
-	$triplet: '#{-byte(string.slice($value, 2, 3))}, #{-byte(string.slice($value, 4, 5))}, #{-byte(string.slice($value, 6, 7))}';
-	$prefix: '';
-	@if -start($literal) > 1 {
-		$prefix: string.slice($literal, 1, -start($literal) - 1);
-	}
-	@return string.unquote($prefix + $triplet + string.slice($literal, -end($literal)));
-}
-
-@function swatch($literal, $context: null) {
-	@if list.length($palette) == 0 {
-		@return string.unquote($literal);
-	}
-	$key: -key($literal);
-	$lookup: $key;
-	@if $context != null and map.has-key($palette, $key + '@' + $context) {
-		$lookup: $key + '@' + $context;
-	}
-	@if not map.has-key($palette, $lookup) {
-		@error 'The palette carries no key #{$lookup}';
-	}
-	@return -spell($literal, $key, map.get($palette, $lookup));
-}
-
-@function measure($role, $value) {
-	@if list.length($scale) == 0 {
-		@return $value;
-	}
-	@if not map.has-key($scale, $role) {
-		@error 'The scale carries no role #{$role}';
-	}
-	@return string.unquote(map.get($scale, $role));
-}
diff --git a/src/bootstrap/_tokens.scss b/src/bootstrap/_tokens.scss
index 4a83878..16d5a4a 100644
--- a/src/bootstrap/_tokens.scss
+++ b/src/bootstrap/_tokens.scss
@@ -1,36 +1,12 @@
 // The barrel forwards this switch so one consumer @use can configure the whole face.
 $layered: true !default;
-$withhold: () !default;
-$reset: false !default;
-$curated: () !default;
-$restored: () !default;
-$reverted: () !default;
-$supplied: () !default;
-$scoped: () !default;
-$unscoped: () !default;
-$palette: () !default;
-$scale: () !default;
 @use 'mixins' with (
-	$layered: $layered,
-	$withhold: $withhold,
-	$reset: $reset,
-	$curated: $curated,
-	$restored: $restored,
-	$reverted: $reverted,
-	$supplied: $supplied,
-	$scoped: $scoped,
-	$unscoped: $unscoped,
-	$palette: $palette,
-	$scale: $scale
+	$layered: $layered
 );
 
-@if $reset and not $layered {
-	@error 'The reset switch requires layered output';
-}
-
 // The first statement fixes every face's order; a later statement cannot move an existing layer.
 @if $layered {
-	@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
+	@layer reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
 }
 
 /*!
@@ -42,195 +18,177 @@ $scale: () !default;
 @include mixins.layer {
 	:root,
 	[data-bs-theme='light'] {
-		--bs-blue: #{'#{mixins.swatch("#0d6efd")}'};
-		--bs-indigo: #{'#{mixins.swatch("#6610f2")}'};
-		--bs-purple: #{'#{mixins.swatch("#6f42c1")}'};
-		--bs-pink: #{'#{mixins.swatch("#d63384")}'};
-		--bs-red: #{'#{mixins.swatch("#dc3545")}'};
-		--bs-orange: #{'#{mixins.swatch("#fd7e14")}'};
-		--bs-yellow: #{'#{mixins.swatch("#ffc107")}'};
-		--bs-green: #{'#{mixins.swatch("#198754")}'};
-		--bs-teal: #{'#{mixins.swatch("#20c997")}'};
-		--bs-cyan: #{'#{mixins.swatch("#0dcaf0")}'};
-		--bs-black: #{'#{mixins.swatch("#000")}'};
-		--bs-white: #{'#{mixins.swatch("#fff")}'};
-		--bs-gray: #{'#{mixins.swatch("#6c757d")}'};
-		--bs-gray-dark: #{'#{mixins.swatch("#343a40")}'};
-		--bs-gray-100: #{'#{mixins.swatch("#f8f9fa")}'};
-		--bs-gray-200: #{'#{mixins.swatch("#e9ecef")}'};
-		--bs-gray-300: #{'#{mixins.swatch("#dee2e6")}'};
-		--bs-gray-400: #{'#{mixins.swatch("#ced4da")}'};
-		--bs-gray-500: #{'#{mixins.swatch("#adb5bd")}'};
-		--bs-gray-600: #{'#{mixins.swatch("#6c757d")}'};
-		--bs-gray-700: #{'#{mixins.swatch("#495057")}'};
-		--bs-gray-800: #{'#{mixins.swatch("#343a40")}'};
-		--bs-gray-900: #{'#{mixins.swatch("#212529")}'};
-		--bs-primary: #{'#{mixins.swatch("#0d6efd")}'};
-		--bs-secondary: #{'#{mixins.swatch("#6c757d")}'};
-		--bs-success: #{'#{mixins.swatch("#198754")}'};
-		--bs-info: #{'#{mixins.swatch("#0dcaf0")}'};
-		--bs-warning: #{'#{mixins.swatch("#ffc107")}'};
-		--bs-danger: #{'#{mixins.swatch("#dc3545")}'};
-		--bs-light: #{'#{mixins.swatch("#f8f9fa")}'};
-		--bs-dark: #{'#{mixins.swatch("#212529")}'};
-		--bs-primary-rgb: #{'#{mixins.swatch("13, 110, 253")}'};
-		--bs-secondary-rgb: #{'#{mixins.swatch("108, 117, 125")}'};
-		--bs-success-rgb: #{'#{mixins.swatch("25, 135, 84")}'};
-		--bs-info-rgb: #{'#{mixins.swatch("13, 202, 240")}'};
-		--bs-warning-rgb: #{'#{mixins.swatch("255, 193, 7")}'};
-		--bs-danger-rgb: #{'#{mixins.swatch("220, 53, 69")}'};
-		--bs-light-rgb: #{'#{mixins.swatch("248, 249, 250")}'};
-		--bs-dark-rgb: #{'#{mixins.swatch("33, 37, 41")}'};
-		--bs-primary-text-emphasis: #{'#{mixins.swatch("#052c65")}'};
-		--bs-secondary-text-emphasis: #{'#{mixins.swatch("#2b2f32")}'};
-		--bs-success-text-emphasis: #{'#{mixins.swatch("#0a3622")}'};
-		--bs-info-text-emphasis: #{'#{mixins.swatch("#055160")}'};
-		--bs-warning-text-emphasis: #{'#{mixins.swatch("#664d03")}'};
-		--bs-danger-text-emphasis: #{'#{mixins.swatch("#58151c")}'};
-		--bs-light-text-emphasis: #{'#{mixins.swatch("#495057")}'};
-		--bs-dark-text-emphasis: #{'#{mixins.swatch("#495057")}'};
-		--bs-primary-bg-subtle: #{'#{mixins.swatch("#cfe2ff")}'};
-		--bs-secondary-bg-subtle: #{'#{mixins.swatch("#e2e3e5")}'};
-		--bs-success-bg-subtle: #{'#{mixins.swatch("#d1e7dd")}'};
-		--bs-info-bg-subtle: #{'#{mixins.swatch("#cff4fc")}'};
-		--bs-warning-bg-subtle: #{'#{mixins.swatch("#fff3cd")}'};
-		--bs-danger-bg-subtle: #{'#{mixins.swatch("#f8d7da")}'};
-		--bs-light-bg-subtle: #{'#{mixins.swatch("#fcfcfd")}'};
-		--bs-dark-bg-subtle: #{'#{mixins.swatch("#ced4da")}'};
-		--bs-primary-border-subtle: #{'#{mixins.swatch("#9ec5fe")}'};
-		--bs-secondary-border-subtle: #{'#{mixins.swatch("#c4c8cb")}'};
-		--bs-success-border-subtle: #{'#{mixins.swatch("#a3cfbb")}'};
-		--bs-info-border-subtle: #{'#{mixins.swatch("#9eeaf9")}'};
-		--bs-warning-border-subtle: #{'#{mixins.swatch("#ffe69c")}'};
-		--bs-danger-border-subtle: #{'#{mixins.swatch("#f1aeb5")}'};
-		--bs-light-border-subtle: #{'#{mixins.swatch("#e9ecef")}'};
-		--bs-dark-border-subtle: #{'#{mixins.swatch("#adb5bd")}'};
-		--bs-white-rgb: #{'#{mixins.swatch("255, 255, 255")}'};
-		--bs-black-rgb: #{'#{mixins.swatch("0, 0, 0")}'};
-		--bs-font-sans-serif: #{mixins.measure(
-				'font-sans-serif',
-				'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
-			)};
-		--bs-font-monospace: #{mixins.measure(
-				'font-monospace',
-				'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
-			)};
-		--bs-gradient: #{'linear-gradient(180deg, #{mixins.swatch("rgba(255, 255, 255, 0.15)")}, #{mixins.swatch("rgba(255, 255, 255, 0)")})'};
+		--bs-blue: #{'#0d6efd'};
+		--bs-indigo: #{'#6610f2'};
+		--bs-purple: #{'#6f42c1'};
+		--bs-pink: #{'#d63384'};
+		--bs-red: #{'#dc3545'};
+		--bs-orange: #{'#fd7e14'};
+		--bs-yellow: #{'#ffc107'};
+		--bs-green: #{'#198754'};
+		--bs-teal: #{'#20c997'};
+		--bs-cyan: #{'#0dcaf0'};
+		--bs-black: #{'#000'};
+		--bs-white: #{'#fff'};
+		--bs-gray: #{'#6c757d'};
+		--bs-gray-dark: #{'#343a40'};
+		--bs-gray-100: #{'#f8f9fa'};
+		--bs-gray-200: #{'#e9ecef'};
+		--bs-gray-300: #{'#dee2e6'};
+		--bs-gray-400: #{'#ced4da'};
+		--bs-gray-500: #{'#adb5bd'};
+		--bs-gray-600: #{'#6c757d'};
+		--bs-gray-700: #{'#495057'};
+		--bs-gray-800: #{'#343a40'};
+		--bs-gray-900: #{'#212529'};
+		--bs-primary: #{'#0d6efd'};
+		--bs-secondary: #{'#6c757d'};
+		--bs-success: #{'#198754'};
+		--bs-info: #{'#0dcaf0'};
+		--bs-warning: #{'#ffc107'};
+		--bs-danger: #{'#dc3545'};
+		--bs-light: #{'#f8f9fa'};
+		--bs-dark: #{'#212529'};
+		--bs-primary-rgb: #{'13, 110, 253'};
+		--bs-secondary-rgb: #{'108, 117, 125'};
+		--bs-success-rgb: #{'25, 135, 84'};
+		--bs-info-rgb: #{'13, 202, 240'};
+		--bs-warning-rgb: #{'255, 193, 7'};
+		--bs-danger-rgb: #{'220, 53, 69'};
+		--bs-light-rgb: #{'248, 249, 250'};
+		--bs-dark-rgb: #{'33, 37, 41'};
+		--bs-primary-text-emphasis: #{'#052c65'};
+		--bs-secondary-text-emphasis: #{'#2b2f32'};
+		--bs-success-text-emphasis: #{'#0a3622'};
+		--bs-info-text-emphasis: #{'#055160'};
+		--bs-warning-text-emphasis: #{'#664d03'};
+		--bs-danger-text-emphasis: #{'#58151c'};
+		--bs-light-text-emphasis: #{'#495057'};
+		--bs-dark-text-emphasis: #{'#495057'};
+		--bs-primary-bg-subtle: #{'#cfe2ff'};
+		--bs-secondary-bg-subtle: #{'#e2e3e5'};
+		--bs-success-bg-subtle: #{'#d1e7dd'};
+		--bs-info-bg-subtle: #{'#cff4fc'};
+		--bs-warning-bg-subtle: #{'#fff3cd'};
+		--bs-danger-bg-subtle: #{'#f8d7da'};
+		--bs-light-bg-subtle: #{'#fcfcfd'};
+		--bs-dark-bg-subtle: #{'#ced4da'};
+		--bs-primary-border-subtle: #{'#9ec5fe'};
+		--bs-secondary-border-subtle: #{'#c4c8cb'};
+		--bs-success-border-subtle: #{'#a3cfbb'};
+		--bs-info-border-subtle: #{'#9eeaf9'};
+		--bs-warning-border-subtle: #{'#ffe69c'};
+		--bs-danger-border-subtle: #{'#f1aeb5'};
+		--bs-light-border-subtle: #{'#e9ecef'};
+		--bs-dark-border-subtle: #{'#adb5bd'};
+		--bs-white-rgb: #{'255, 255, 255'};
+		--bs-black-rgb: #{'0, 0, 0'};
+		--bs-font-sans-serif: #{'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'};
+		--bs-font-monospace: #{'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'};
+		--bs-gradient: #{'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))'};
 		--bs-body-font-family: #{'var(--bs-font-sans-serif)'};
 		--bs-body-font-size: #{'1rem'};
 		--bs-body-font-weight: #{'400'};
 		--bs-body-line-height: #{'1.5'};
-		--bs-body-color: #{'#{mixins.swatch("#212529")}'};
-		--bs-body-color-rgb: #{'#{mixins.swatch("33, 37, 41")}'};
-		--bs-body-bg: #{'#{mixins.swatch("#fff")}'};
-		--bs-body-bg-rgb: #{'#{mixins.swatch("255, 255, 255")}'};
-		--bs-emphasis-color: #{'#{mixins.swatch("#000")}'};
-		--bs-emphasis-color-rgb: #{'#{mixins.swatch("0, 0, 0")}'};
-		--bs-secondary-color: #{'#{mixins.swatch("rgba(33, 37, 41, 0.75)")}'};
-		--bs-secondary-color-rgb: #{'#{mixins.swatch("33, 37, 41")}'};
-		--bs-secondary-bg: #{'#{mixins.swatch("#e9ecef")}'};
-		--bs-secondary-bg-rgb: #{'#{mixins.swatch("233, 236, 239")}'};
-		--bs-tertiary-color: #{'#{mixins.swatch("rgba(33, 37, 41, 0.5)")}'};
-		--bs-tertiary-color-rgb: #{'#{mixins.swatch("33, 37, 41")}'};
-		--bs-tertiary-bg: #{'#{mixins.swatch("#f8f9fa")}'};
-		--bs-tertiary-bg-rgb: #{'#{mixins.swatch("248, 249, 250")}'};
+		--bs-body-color: #{'#212529'};
+		--bs-body-color-rgb: #{'33, 37, 41'};
+		--bs-body-bg: #{'#fff'};
+		--bs-body-bg-rgb: #{'255, 255, 255'};
+		--bs-emphasis-color: #{'#000'};
+		--bs-emphasis-color-rgb: #{'0, 0, 0'};
+		--bs-secondary-color: #{'rgba(33, 37, 41, 0.75)'};
+		--bs-secondary-color-rgb: #{'33, 37, 41'};
+		--bs-secondary-bg: #{'#e9ecef'};
+		--bs-secondary-bg-rgb: #{'233, 236, 239'};
+		--bs-tertiary-color: #{'rgba(33, 37, 41, 0.5)'};
+		--bs-tertiary-color-rgb: #{'33, 37, 41'};
+		--bs-tertiary-bg: #{'#f8f9fa'};
+		--bs-tertiary-bg-rgb: #{'248, 249, 250'};
 		--bs-heading-color: #{'inherit'};
-		--bs-link-color: #{'#{mixins.swatch("#0d6efd")}'};
-		--bs-link-color-rgb: #{'#{mixins.swatch("13, 110, 253")}'};
+		--bs-link-color: #{'#0d6efd'};
+		--bs-link-color-rgb: #{'13, 110, 253'};
 		--bs-link-decoration: #{'underline'};
-		--bs-link-hover-color: #{'#{mixins.swatch("#0a58ca")}'};
-		--bs-link-hover-color-rgb: #{'#{mixins.swatch("10, 88, 202")}'};
-		--bs-code-color: #{'#{mixins.swatch("#d63384")}'};
-		--bs-highlight-color: #{'#{mixins.swatch("#212529")}'};
-		--bs-highlight-bg: #{'#{mixins.swatch("#fff3cd")}'};
+		--bs-link-hover-color: #{'#0a58ca'};
+		--bs-link-hover-color-rgb: #{'10, 88, 202'};
+		--bs-code-color: #{'#d63384'};
+		--bs-highlight-color: #{'#212529'};
+		--bs-highlight-bg: #{'#fff3cd'};
 		--bs-border-width: #{'1px'};
 		--bs-border-style: #{'solid'};
-		--bs-border-color: #{'#{mixins.swatch("#dee2e6")}'};
-		--bs-border-color-translucent: #{'#{mixins.swatch("rgba(0, 0, 0, 0.175)")}'};
-		--bs-border-radius: #{mixins.measure('radius', '0.375rem')};
-		--bs-border-radius-sm: #{mixins.measure('radius-sm', '0.25rem')};
-		--bs-border-radius-lg: #{mixins.measure('radius-lg', '0.5rem')};
-		--bs-border-radius-xl: #{mixins.measure('radius-xl', '1rem')};
-		--bs-border-radius-xxl: #{mixins.measure('radius-xxl', '2rem')};
+		--bs-border-color: #{'#dee2e6'};
+		--bs-border-color-translucent: #{'rgba(0, 0, 0, 0.175)'};
+		--bs-border-radius: #{'0.375rem'};
+		--bs-border-radius-sm: #{'0.25rem'};
+		--bs-border-radius-lg: #{'0.5rem'};
+		--bs-border-radius-xl: #{'1rem'};
+		--bs-border-radius-xxl: #{'2rem'};
 		--bs-border-radius-2xl: #{'var(--bs-border-radius-xxl)'};
 		--bs-border-radius-pill: #{'50rem'};
-		--bs-box-shadow: #{mixins.measure(
-				'shadow',
-				'0 0.5rem 1rem #{mixins.swatch("rgba(0, 0, 0, 0.15)")}'
-			)};
-		--bs-box-shadow-sm: #{mixins.measure(
-				'shadow-sm',
-				'0 0.125rem 0.25rem #{mixins.swatch("rgba(0, 0, 0, 0.075)")}'
-			)};
-		--bs-box-shadow-lg: #{mixins.measure(
-				'shadow-lg',
-				'0 1rem 3rem #{mixins.swatch("rgba(0, 0, 0, 0.175)")}'
-			)};
-		--bs-box-shadow-inset: #{mixins.measure(
-				'shadow-inset',
-				'inset 0 1px 2px #{mixins.swatch("rgba(0, 0, 0, 0.075)")}'
-			)};
+		--bs-box-shadow: #{'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'};
+		--bs-box-shadow-sm: #{'0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'};
+		--bs-box-shadow-lg: #{'0 1rem 3rem rgba(0, 0, 0, 0.175)'};
+		--bs-box-shadow-inset: #{'inset 0 1px 2px rgba(0, 0, 0, 0.075)'};
 		--bs-focus-ring-width: #{'0.25rem'};
 		--bs-focus-ring-opacity: #{'0.25'};
-		--bs-focus-ring-color: #{'#{mixins.swatch("rgba(13, 110, 253, 0.25)")}'};
-		--bs-form-valid-color: #{'#{mixins.swatch("#198754")}'};
-		--bs-form-valid-border-color: #{'#{mixins.swatch("#198754")}'};
-		--bs-form-invalid-color: #{'#{mixins.swatch("#dc3545")}'};
-		--bs-form-invalid-border-color: #{'#{mixins.swatch("#dc3545")}'};
+		--bs-focus-ring-color: #{'rgba(13, 110, 253, 0.25)'};
+		--bs-form-valid-color: #{'#198754'};
+		--bs-form-valid-border-color: #{'#198754'};
+		--bs-form-invalid-color: #{'#dc3545'};
+		--bs-form-invalid-border-color: #{'#dc3545'};
 	}
 	[data-bs-theme='dark'] {
 		color-scheme: dark;
-		--bs-body-color: #{'#{mixins.swatch("#dee2e6", dark)}'};
-		--bs-body-color-rgb: #{'#{mixins.swatch("222, 226, 230", dark)}'};
-		--bs-body-bg: #{'#{mixins.swatch("#212529")}'};
-		--bs-body-bg-rgb: #{'#{mixins.swatch("33, 37, 41")}'};
-		--bs-emphasis-color: #{'#{mixins.swatch("#fff")}'};
-		--bs-emphasis-color-rgb: #{'#{mixins.swatch("255, 255, 255")}'};
-		--bs-secondary-color: #{'#{mixins.swatch("rgba(222, 226, 230, 0.75)", dark)}'};
-		--bs-secondary-color-rgb: #{'#{mixins.swatch("222, 226, 230", dark)}'};
-		--bs-secondary-bg: #{'#{mixins.swatch("#343a40")}'};
-		--bs-secondary-bg-rgb: #{'#{mixins.swatch("52, 58, 64")}'};
-		--bs-tertiary-color: #{'#{mixins.swatch("rgba(222, 226, 230, 0.5)", dark)}'};
-		--bs-tertiary-color-rgb: #{'#{mixins.swatch("222, 226, 230", dark)}'};
-		--bs-tertiary-bg: #{'#{mixins.swatch("#2b3035")}'};
-		--bs-tertiary-bg-rgb: #{'#{mixins.swatch("43, 48, 53")}'};
-		--bs-primary-text-emphasis: #{'#{mixins.swatch("#6ea8fe")}'};
-		--bs-secondary-text-emphasis: #{'#{mixins.swatch("#a7acb1")}'};
-		--bs-success-text-emphasis: #{'#{mixins.swatch("#75b798")}'};
-		--bs-info-text-emphasis: #{'#{mixins.swatch("#6edff6")}'};
-		--bs-warning-text-emphasis: #{'#{mixins.swatch("#ffda6a")}'};
-		--bs-danger-text-emphasis: #{'#{mixins.swatch("#ea868f")}'};
-		--bs-light-text-emphasis: #{'#{mixins.swatch("#f8f9fa")}'};
-		--bs-dark-text-emphasis: #{'#{mixins.swatch("#dee2e6")}'};
-		--bs-primary-bg-subtle: #{'#{mixins.swatch("#031633")}'};
-		--bs-secondary-bg-subtle: #{'#{mixins.swatch("#161719")}'};
-		--bs-success-bg-subtle: #{'#{mixins.swatch("#051b11")}'};
-		--bs-info-bg-subtle: #{'#{mixins.swatch("#032830")}'};
-		--bs-warning-bg-subtle: #{'#{mixins.swatch("#332701")}'};
-		--bs-danger-bg-subtle: #{'#{mixins.swatch("#2c0b0e")}'};
-		--bs-light-bg-subtle: #{'#{mixins.swatch("#343a40")}'};
-		--bs-dark-bg-subtle: #{'#{mixins.swatch("#1a1d20")}'};
-		--bs-primary-border-subtle: #{'#{mixins.swatch("#084298")}'};
-		--bs-secondary-border-subtle: #{'#{mixins.swatch("#41464b")}'};
-		--bs-success-border-subtle: #{'#{mixins.swatch("#0f5132")}'};
-		--bs-info-border-subtle: #{'#{mixins.swatch("#087990")}'};
-		--bs-warning-border-subtle: #{'#{mixins.swatch("#997404")}'};
-		--bs-danger-border-subtle: #{'#{mixins.swatch("#842029")}'};
-		--bs-light-border-subtle: #{'#{mixins.swatch("#495057")}'};
-		--bs-dark-border-subtle: #{'#{mixins.swatch("#343a40")}'};
+		--bs-body-color: #{'#dee2e6'};
+		--bs-body-color-rgb: #{'222, 226, 230'};
+		--bs-body-bg: #{'#212529'};
+		--bs-body-bg-rgb: #{'33, 37, 41'};
+		--bs-emphasis-color: #{'#fff'};
+		--bs-emphasis-color-rgb: #{'255, 255, 255'};
+		--bs-secondary-color: #{'rgba(222, 226, 230, 0.75)'};
+		--bs-secondary-color-rgb: #{'222, 226, 230'};
+		--bs-secondary-bg: #{'#343a40'};
+		--bs-secondary-bg-rgb: #{'52, 58, 64'};
+		--bs-tertiary-color: #{'rgba(222, 226, 230, 0.5)'};
+		--bs-tertiary-color-rgb: #{'222, 226, 230'};
+		--bs-tertiary-bg: #{'#2b3035'};
+		--bs-tertiary-bg-rgb: #{'43, 48, 53'};
+		--bs-primary-text-emphasis: #{'#6ea8fe'};
+		--bs-secondary-text-emphasis: #{'#a7acb1'};
+		--bs-success-text-emphasis: #{'#75b798'};
+		--bs-info-text-emphasis: #{'#6edff6'};
+		--bs-warning-text-emphasis: #{'#ffda6a'};
+		--bs-danger-text-emphasis: #{'#ea868f'};
+		--bs-light-text-emphasis: #{'#f8f9fa'};
+		--bs-dark-text-emphasis: #{'#dee2e6'};
+		--bs-primary-bg-subtle: #{'#031633'};
+		--bs-secondary-bg-subtle: #{'#161719'};
+		--bs-success-bg-subtle: #{'#051b11'};
+		--bs-info-bg-subtle: #{'#032830'};
+		--bs-warning-bg-subtle: #{'#332701'};
+		--bs-danger-bg-subtle: #{'#2c0b0e'};
+		--bs-light-bg-subtle: #{'#343a40'};
+		--bs-dark-bg-subtle: #{'#1a1d20'};
+		--bs-primary-border-subtle: #{'#084298'};
+		--bs-secondary-border-subtle: #{'#41464b'};
+		--bs-success-border-subtle: #{'#0f5132'};
+		--bs-info-border-subtle: #{'#087990'};
+		--bs-warning-border-subtle: #{'#997404'};
+		--bs-danger-border-subtle: #{'#842029'};
+		--bs-light-border-subtle: #{'#495057'};
+		--bs-dark-border-subtle: #{'#343a40'};
 		--bs-heading-color: #{'inherit'};
-		--bs-link-color: #{'#{mixins.swatch("#6ea8fe")}'};
-		--bs-link-hover-color: #{'#{mixins.swatch("#8bb9fe")}'};
-		--bs-link-color-rgb: #{'#{mixins.swatch("110, 168, 254")}'};
-		--bs-link-hover-color-rgb: #{'#{mixins.swatch("139, 185, 254")}'};
-		--bs-code-color: #{'#{mixins.swatch("#e685b5")}'};
-		--bs-highlight-color: #{'#{mixins.swatch("#dee2e6")}'};
-		--bs-highlight-bg: #{'#{mixins.swatch("#664d03")}'};
-		--bs-border-color: #{'#{mixins.swatch("#495057")}'};
-		--bs-border-color-translucent: #{'#{mixins.swatch("rgba(255, 255, 255, 0.15)")}'};
-		--bs-form-valid-color: #{'#{mixins.swatch("#75b798")}'};
-		--bs-form-valid-border-color: #{'#{mixins.swatch("#75b798")}'};
-		--bs-form-invalid-color: #{'#{mixins.swatch("#ea868f")}'};
-		--bs-form-invalid-border-color: #{'#{mixins.swatch("#ea868f")}'};
+		--bs-link-color: #{'#6ea8fe'};
+		--bs-link-hover-color: #{'#8bb9fe'};
+		--bs-link-color-rgb: #{'110, 168, 254'};
+		--bs-link-hover-color-rgb: #{'139, 185, 254'};
+		--bs-code-color: #{'#e685b5'};
+		--bs-highlight-color: #{'#dee2e6'};
+		--bs-highlight-bg: #{'#664d03'};
+		--bs-border-color: #{'#495057'};
+		--bs-border-color-translucent: #{'rgba(255, 255, 255, 0.15)'};
+		--bs-form-valid-color: #{'#75b798'};
+		--bs-form-valid-border-color: #{'#75b798'};
+		--bs-form-invalid-color: #{'#ea868f'};
+		--bs-form-invalid-border-color: #{'#ea868f'};
 	}
 }
diff --git a/src/styles/_tokens.scss b/src/styles/_tokens.scss
index 7c081b7..582fb3b 100644
--- a/src/styles/_tokens.scss
+++ b/src/styles/_tokens.scss
@@ -1,2 +1,2 @@
 // Every published sheet opens with the same full statement so load order cannot change layer order.
-@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
+@layer reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
```

The final `git status --porcelain` is:

```text
 M ROADMAP.md
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_reset.scss
 M src/bootstrap/_tokens.scss
 M src/bootstrap/_utilities.scss
 M src/bootstrap/components/_accordion.scss
 M src/bootstrap/components/_badge.scss
 M src/bootstrap/components/_buttons.scss
 M src/bootstrap/components/_card.scss
 M src/bootstrap/components/_carousel.scss
 M src/bootstrap/components/_close.scss
 M src/bootstrap/components/_color-bg.scss
 M src/bootstrap/components/_colored-links.scss
 M src/bootstrap/components/_containers.scss
 M src/bootstrap/components/_dropdown.scss
 M src/bootstrap/components/_floating-labels.scss
 M src/bootstrap/components/_form-check.scss
 M src/bootstrap/components/_form-control.scss
 M src/bootstrap/components/_form-range.scss
 M src/bootstrap/components/_form-select.scss
 M src/bootstrap/components/_grid.scss
 M src/bootstrap/components/_list-group.scss
 M src/bootstrap/components/_modal.scss
 M src/bootstrap/components/_nav.scss
 M src/bootstrap/components/_navbar.scss
 M src/bootstrap/components/_offcanvas.scss
 M src/bootstrap/components/_pagination.scss
 M src/bootstrap/components/_placeholders.scss
 M src/bootstrap/components/_position.scss
 M src/bootstrap/components/_progress.scss
 M src/bootstrap/components/_tables.scss
 M src/bootstrap/components/_type.scss
 M src/bootstrap/components/_validation.scss
 M src/styles/_tokens.scss
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
```

The deviations and limits are:

| Expected | Found and evidence | Disposition | Hypothesis |
|---|---|---|---|
| 572 `swatch` calls and 142 `measure` calls | Source census excluding `_mixins.scss`: 571 and 141; the script asserts those counts | All calls replaced; definitions removed; digest unchanged | The brief counted each function definition as a call |
| Plain `nohup` detachment survives queue waiting | Initial launches left empty logs, no run folder, and no live process | Added `setsid`; subsequent launches survived and completed | The shell tool terminates children remaining in its process session |
| Uninterrupted stage-4 verification | Host/network interruption reported by the user | Re-read the brief, exit-0 stage-4 logs, status, and digest; continued from stage 5 | Host restart interrupted the session, not the completed build |
| Remove `base` from `SHEET_LAYERS` | `tests/setup.ts` already excluded it | Retained unchanged; amended `LAYER_ORDER` and its pin | The ownership list anticipated an earlier state |
| Delete hook-only Bootstrap/integration cases and fixtures | Those files contain only retained behavior; only the conformance suite still tests removed hooks | Deleted the three conformance cases; retained the remaining proofs and fixtures | Earlier Tailwind removal already removed those consumers |
| Remove every test/guide `base` layer reference | References remain at [styles fixture](/home/user/.wave/veneer-tw-d/tests/fixtures/styles/bootstrap.scss:1), [scaffold policy fixture](/home/user/.wave/veneer-tw-d/tests/setupPolicy.ts:2856), and [scaffold guide](/home/user/.wave/veneer-tw-d/guides/scaffold.md:1231) | **Not changed:** all are outside the brief’s ownership; the latter two are scaffold-owned | The broad sweep exceeds the explicit ownership list |
| Listed gates cover edited proofs | `tests/setupStyles.test.ts` belongs to `setup:browser`; conformance is required by stage 6 but omitted from the gate list | Ran both additional projects; both passed | The gate list omitted these projects |
| Passing styles suite | `15 passed \| 1 todo`; the todo predates this diff | Retained; no new skip or todo | It belongs to the deferred styles work |
| Clean full build | Exit 0, with API Extractor’s TypeScript 5.9.3/6.0.3 notice and Vite’s chunk-size warning | Reported; no unowned tooling or application changes | Existing toolchain and application configuration produce the warnings |

The full repository diff is also saved at [final.diff](/home/user/.wave/veneer-tw-d/tmp/units/twd/final.diff).