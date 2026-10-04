import { cpSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ROOT, OUT, SASS, SHARED, EXCLUDED, COMPARISON, digestText, writeJSON, compileTuned, launchBrowser, flattenSheet } from './lib.ts'

cpSync(resolve(ROOT, 'src/bootstrap'), resolve(OUT, 'sass/bootstrap'), { recursive: true })
const path = resolve(OUT, 'sass/bootstrap/_mixins.scss')
let mixins = readFileSync(path, 'utf8').replace("@use 'sass:list';", "@use 'sass:list';\n@use 'sass:selector';")
mixins = mixins.replace('$layered: true !default;', `$layered: true !default;
$withhold: () !default;
$reset: false !default;
$curated: () !default;
$restored: () !default;

@mixin reboot {
  @if $reset { @layer reset { @content; } }
  @else { @include layer { @content; } }
}
@function restrict($input, $classes) {
  $output: ();
  $where: '';
  @each $class in $classes {
    @if $where != '' { $where: $where + ', '; }
    $where: $where + '.' + $class;
  }
  @each $complex in $input {
    $last: list.nth($complex, -1);
    $classed: false;
    @each $simple in selector.simple-selectors($last) {
      @if string.slice($simple, 1, 1) == '.' { $classed: true; }
    }
    @if $classed { $output: list.append($output, $complex, comma); }
    @else if $where != '' {
      $unified: selector.unify($last, ':where(' + $where + ')');
      @if $unified {
        @each $unified-complex in $unified {
          $replacement: '#{$unified-complex}';
          @if string.slice('#{$last}', 1, 1) == '*' and string.slice($replacement, 1, 1) == ':' { $replacement: '*' + $replacement; }
          $prefix: '';
          @if list.length($complex) > 1 {
            @for $index from 1 to list.length($complex) { $prefix: $prefix + list.nth($complex, $index) + ' '; }
          }
          $output: list.append($output, string.unquote($prefix + $replacement), comma);
        }
      }
    }
  }
  @if list.length($output) == 0 { @return null; }
  @return $output;
}
@mixin curate {
  @content;
  @if $reset {
    $copy: restrict(&, $curated);
    @if $copy {
      @at-root (without: layer rule) { @layer bootstrap { #{$copy} { @content; } } }
    }
  }
}
@mixin restore {
  @if $reset { @layer bootstrap {
    @each $selector, $properties in $restored {
      #{$selector} { @each $property in $properties { #{$property}: revert; } }
    }
  } }
}`)
mixins = mixins.replace('@each $selector in $selectors {', '@each $selector in $selectors {\n\t\t\t@if not list.index($withhold, string.slice($selector, 2)) {')
mixins = mixins.replace('// Ordered (property value)', '}\n\n// Ordered (property value)')
writeFileSync(path, mixins)
const tokens = resolve(OUT, 'sass/bootstrap/_tokens.scss')
writeFileSync(tokens, readFileSync(tokens, 'utf8').replace('$layered: true !default;', '$layered: true !default;\n$withhold: () !default;\n$reset: false !default;\n$curated: () !default;\n$restored: () !default;').replace('$layered: $layered\n', '$layered: $layered,\n$withhold: $withhold,\n$reset: $reset,\n$curated: $curated,\n$restored: $restored\n').replace('// The first statement', '@if $reset and not $layered { @error "The reset switch requires layered output"; }\n\n// The first statement'))
const resetPath = resolve(OUT, 'sass/bootstrap/_reset.scss')
let reset = readFileSync(resetPath, 'utf8').replace('@include layer {', '@include reboot {')
reset = reset.replace(/^(\t+)([^@\s}][^{;]*?) \{\n([\s\S]*?)^\1\}/gm, (full, indent: string, selector: string, declarations: string) => {
	let prefix = ''
	if (selector.includes('*/')) {
		const index = selector.lastIndexOf('*/') + 2
		prefix = indent + selector.slice(0, index) + '\n'
		selector = selector.slice(index).trim()
	} else if (selector.includes('/*')) return full
	const rule = `${indent}${selector} {\n${indent}\t@include curate {\n${declarations}${indent}\t}\n${indent}}`
	return prefix + (selector === '[hidden]' ? `${indent}@if not $reset {\n${rule}\n${indent}}` : rule)
})
writeFileSync(resetPath, reset + '\n@include restore;\n')
const digests = []
for (const layered of [false, true]) {
	const entry = `@use 'index' with ($layered: ${layered});`
	const tracked = SASS.compileString(entry, { loadPaths: [resolve(ROOT, 'src/bootstrap')] }).css
	const copied = SASS.compileString(entry, { loadPaths: [resolve(OUT, 'sass/bootstrap')] }).css
	const saved = readFileSync(resetPath, 'utf8')
	let control = ''
	try {
		writeFileSync(resetPath, saved + '\n.probe-control { z-index: 917; }\n')
		control = SASS.compileString(entry, { loadPaths: [resolve(OUT, 'sass/bootstrap')] }).css
	} finally { writeFileSync(resetPath, saved) }
	digests.push({ layered, expected: 'equal', tracked: digestText(tracked), copied: digestText(copied), equal: tracked === copied, controlChanges: digestText(control) !== digestText(copied) })
	if (layered) writeFileSync(resolve(OUT, 'sheets/lifted.css'), tracked)
}
const css = compileTuned(['card-text', 'modal-title'], { 'svg:where(.bi)': ['display'] })
const browser = await launchBrowser()
const page = await browser.newPage()
const tuned = await page.evaluate(flattenSheet, { text: css })
const lifted = await page.evaluate(flattenSheet, { text: readFileSync(resolve(OUT, 'sheets/lifted.css'), 'utf8') })
const reboot = SASS.compileString("@use 'tokens'; @use 'reset';", { loadPaths: [resolve(ROOT, 'src/bootstrap')] }).css
const original = await page.evaluate(flattenSheet, { text: reboot })
const rebootRules = original.rules.filter((rule) => rule.selector !== ':root, [data-bs-theme="light"]' && rule.selector !== '[data-bs-theme="dark"]')
const resetRules = tuned.rules.filter((rule) => rule.context.includes('@layer reset'))
const expectedReset = rebootRules.filter((rule) => rule.selector !== '[hidden]' && !rule.selector.includes('calendar-picker-indicator')).map((rule) => ({ ...rule, context: rule.context.replace('@layer bootstrap', '@layer reset') }))
const copies = tuned.rules.filter((rule) => rule.context.includes('@layer bootstrap') && rule.selector.includes(':where(.card-text'))
const misplaced = copies.flatMap((copy) => {
	const index = tuned.rules.indexOf(copy)
	const previous = tuned.rules[index - 1]
	return previous?.context.includes('@layer reset') && previous.declarations === copy.declarations ? [] : [{ index, copy, previous }]
})
const hazards = []
for (const [name, input] of [
	['configuration after loading', "@use 'mixins'; @use 'tokens' with ($reset: true);"],
	['already loaded module', "@use 'tokens'; @use 'tokens' with ($layered: false);"],
	['reset without layers', "@use 'tokens' with ($reset: true, $layered: false);"],
	['unify pseudo and negation', "@use 'sass:selector'; .probe { before: inspect(selector.unify('*::before', ':where(.card-text, .modal-title)')); negation: inspect(selector.unify('a:not([class])', ':where(.card-text, .modal-title)')); }"],
	['lifted media order', "@use 'mixins' as *; @include layer { @media (min-width: 1px) { .before { color: red; @include unlayer((display none,)); } .after { color: blue; } } }"],
]) {
	try { hazards.push({ name, output: SASS.compileString(input, { loadPaths: [resolve(OUT, 'sass/bootstrap')], silenceDeprecations: ['global-builtin'] }).css }) }
	catch (error) { hazards.push({ name, error: String(error) }) }
}
const restrict = SASS.compileString("@use 'mixins' as *; @use 'sass:selector'; .probe { heading: inspect(restrict(selector.parse('h1, .h1'), (card-text, modal-title))); before: inspect(restrict(selector.parse('*::before'), (card-text, modal-title))); descendant: inspect(restrict(selector.parse('ol ul'), (card-text, modal-title))); empty: inspect(restrict(selector.parse('p'), ())); }", { loadPaths: [resolve(OUT, 'sass/bootstrap')], silenceDeprecations: ['global-builtin'] }).css
writeJSON('out/p1.json', { source: COMPARISON, shared: SHARED.length, excluded: EXCLUDED.length, digests, reset: { expected: 74, measured: resetRules.length, liftedRules: rebootRules.length, equal: JSON.stringify(resetRules) === JSON.stringify(expectedReset), expectedRows: expectedReset, actualRows: resetRules }, restrict, copies: copies.length, misplaced, copiesBeforeComponents: Math.max(...copies.map((rule) => tuned.rules.indexOf(rule))) < tuned.rules.findIndex((rule) => rule.selector === '.btn'), withheld: { expected: 199, removed: lifted.rules.filter((rule) => SHARED.some((name: string) => rule.selector === `.${name}`)).length, survivors: tuned.rules.filter((rule) => SHARED.some((name: string) => rule.selector === `.${name}`)) }, hidden: tuned.rules.filter((rule) => rule.selector === '[hidden]'), datalist: tuned.rules.filter((rule) => rule.selector.includes('calendar-picker-indicator')), hazards })
await browser.close()
console.log('P1 complete')
