import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/src/styles/components/fade.test.ts'
let text = readFileSync(path, 'utf8')
const from = `	// The mutation this catches is the partial loaded after the collapse partial. The \`.fade\` rule
	// and the \`.collapsing\` rule each write a transition at one specificity, so the later rule wins
	// on an element carrying the \`fade\` class and the \`collapsing\` class. The release loads the fade
	// rule first, so that element transitions its size. The lone fading element is the reading that
	// the fade rule is present.
	it('yields the transition to the collapsing rule on an element carrying the fade and collapsing classes', () => {
		const host = scene.mount(
			'<div class="fade collapsing" style="height: 24px">Tide table</div><div class="fade">Tide table</div>',
		)
		expect(
			[...host.children].map((element) => [
				readStyle(element, 'transition-property'),
				readStyle(element, 'transition-duration'),
				readStyle(element, 'transition-timing-function'),
			]),
		).toEqual([
			['height', '0.35s', 'ease'],
			['opacity', '0.15s', 'ease-out'],
		])
	})
`
const to = `	// The mutation this catches is the partial loaded after the collapse partial. The \`.fade\` rule
	// and the \`.collapsing\` rule each write a transition at one specificity, so the later rule wins
	// on an element carrying the \`fade\` class and the \`collapsing\` class. The release loads the fade
	// rule first, so that element takes the collapsing rule's transition whole. The lone closing
	// element is the collapsing rule's own reading, so the case pins the order and none of that
	// rule's values, and the lone fading element is the reading that the fade rule is present and
	// differs from it.
	it('gives an element carrying the fade and collapsing classes the transition of the collapsing rule rather than that of the fade rule', () => {
		const host = scene.mount(
			'<div class="fade collapsing" style="height: 24px">Tide table</div><div class="collapsing" style="height: 24px">Tide table</div><div class="fade">Tide table</div>',
		)
		const [compound, closing, fading] = [...host.children].map((element) => [
			readStyle(element, 'transition-property'),
			readStyle(element, 'transition-duration'),
			readStyle(element, 'transition-timing-function'),
		])
		expect(closing?.[0]).toBe('height')
		expect(fading).toEqual(['opacity', '0.15s', 'ease-out'])
		expect(compound).toEqual(closing)
	})
`
if (!text.includes(from)) throw new Error('missing fade case')
writeFileSync(path, text.replace(from, to))
