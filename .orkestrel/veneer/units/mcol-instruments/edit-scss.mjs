import { readFileSync, writeFileSync } from 'node:fs'
function swap(path, pairs) {
	let text = readFileSync(path, 'utf8')
	for (const [from, to] of pairs) {
		if (!text.includes(from)) throw new Error(`missing in ${path}: ${from.slice(0, 60)}`)
		text = text.replace(from, to)
	}
	writeFileSync(path, text)
}
swap('src/styles/components/_collapse.scss', [
	[
		`	// The timing is the release's own \`0.35s ease\` value rather than the motion tokens \`.btn\` reads,
	// because no published motion token resolves to \`0.35s\`, and a token that did not would change
	// how long a panel takes to open. The \`transition\` mixin emits the reduced-motion twin the
	// release records beside each transition.
`,
		`	// A closing box moves its size over the \`--vn-motion-panel\` duration on the \`--vn-ease-panel\`
	// curve, so the motion factor scales it. It moves no opacity, because the \`collapsing\` class marks
	// an opening panel and a closing one alike. The size itself is the one an engine writes inline.
	// The \`transition\` mixin emits the reduced-motion twin the release records beside each
	// transition.
`,
	],
	[
		`	.collapsing {
		height: 0;
		overflow: hidden;
		@include transition(height 0.35s ease);
	}`,
		`	.collapsing {
		height: 0;
		overflow: hidden;
		@include transition(height var(--vn-motion-panel) var(--vn-ease-panel));
	}`,
	],
	[
		`		@include transition(width 0.35s ease);`,
		`		@include transition(width var(--vn-motion-panel) var(--vn-ease-panel));`,
	],
])
swap('src/styles/components/_accordion.scss', [
	[
		`		--bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;`,
		`		// The chevron turns over the feedback duration on the standard curve, so the motion factor
		// scales it; the half turn it ends at stays the release's.
		--bs-accordion-btn-icon-transition: transform var(--vn-motion-feedback) var(--vn-ease-standard);`,
	],
])
