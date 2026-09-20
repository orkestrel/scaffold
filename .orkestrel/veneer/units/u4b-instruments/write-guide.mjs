import { readFileSync, writeFileSync } from 'node:fs'
import { createMarkdown } from '@orkestrel/markdown'
import { selectSectionBlocks, extractCellText } from '@orkestrel/guide'

const ledger = createMarkdown(readFileSync('../scaffold/.orkestrel/veneer/research/ledger.md', 'utf8')).document
const engine = []
for (const block of selectSectionBlocks(ledger, 'Accepted scope')) {
	if (block.element !== 'table' || extractCellText(block.header[0] ?? []) !== 'Component') continue
	for (const row of block.rows) {
		const [component, obligation, category] = row.map(extractCellText)
		if (component === 'Button') continue
		engine.push(`| btn | ${category} | ${component}: ${obligation.replaceAll('|', '\\|')} | — | accepted |`)
	}
}
const section = `## Compatibility

This section is the ledger of what Veneer accepts from Bootstrap 5.3.8. The
tests/conformance.test.ts proof reads its rows and compares their named steps with the official
Button recording. The Component column carries the inventory key, so later component units extend
the same table.

The table records the Button obligations and the engine obligations assigned to its unit.

| Component | Kind | Obligation | Proof | Status |
| --- | --- | --- | --- | --- |
| btn | identity | Button identifies itself as button, bs.button, and .bs.button; defaults and type defaults are inherited empty. | button.initial | accepted |
| btn | attribute | The data-bs-toggle="button" click prevents its default action and creates or reuses the instance to toggle active and aria-pressed. | button.click.toggle | accepted |
| btn | method | toggle() flips active and aria-pressed on every activation, without a no-op guard. | button.click.toggle | accepted |
| btn | method | toggle() flips active and aria-pressed on every activation, without a no-op guard. | button.click.release | accepted |
| btn | method | The static jQueryInterface invokes toggle only when config is toggle. | — | accepted |
| btn | initialization | defineJQueryPlugin registers Button. | — | accepted |
| btn | accessibility | A toggle announces the button role and its pressed state, rather than a checkbox role. | button.click.toggle | accepted |
| btn | accessibility | A toggle announces the button role and its pressed state, rather than a checkbox role. | button.pressed.click | accepted |
| btn | accessibility | A disabled anchor carries disabled, aria-disabled="true", tabindex="-1", and role="button"; pointer activation is refused. | button.disabled.click | accepted |
| btn | keyboard | Space activates the focused toggle button. | button.keyboard.space | accepted |
| btn | keyboard | Enter activates the focused toggle button. | button.keyboard.enter | accepted |
| btn | variable | The --bs-btn-* vocabulary includes padding, font, color, background, border, shadow, disabled, and active state properties. | — | accepted |
${engine.join('\n')}

An accepted row records scope; a named Proof step obliges the official recording to agree with the
row. A shipped row also accepts implementation responsibility; when every row for a component is
shipped, the built cascade must carry its official selector and custom-property sets, and the
conformance component list must include its key. A dash marks a source or engine obligation that
the Button interaction recording cannot drive. Transition, dismissal, sanitizer, and selector
engine rows record shared engine scope; they do not claim that Button dispatches transition events.
The jQuery rows retain the source inventory while the exclusion that follows limits the claim.

The compatibility claim excludes contextual Reboot selectors that combine bare tags: nested
ordered and unordered lists, code inside preformatted text or links, nested keyboard tags, and the
sibling after a legend. It also excludes the jQuery interface and plugin registration, the
window.bootstrap global and UMD namespace, and Bootstrap's Sass variables, maps, and mixins as a
source API. Popper pass-through positioning options remain accepted wire keys with platform
anchoring as an accepted difference. The sanitizer allowlist and sanitizer overrides remain in
scope for the overlay unit.

`
const path = 'guides/veneer.md'
const guide = readFileSync(path, 'utf8')
writeFileSync(path, guide.replace('## Showcase', `${section}## Showcase`) + '\nThe conformance proofs pin the official release and its artifact digests, reject runtime boundary\nescapes, check shipped CSS vocabulary, compare each live Button step with its fixture, and\ncross-check the compatibility rows; see [Bootstrap conformance](../tests/conformance.test.ts).\nThe helper proofs read compatibility tables, built CSS, and the pinned inventory; see\n[conformance readers and recorder](../tests/setupConformance.test.ts).\n')
