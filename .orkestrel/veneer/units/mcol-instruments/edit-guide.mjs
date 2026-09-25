import { readFileSync, writeFileSync } from 'node:fs'
const path = 'guides/veneer.md'
let text = readFileSync(path, 'utf8')
const pairs = [
	// § Collapse classes: the motion paragraph.
	[
		`Each closing box transitions the size it clips, \`height\` or \`width\`, over the release's
\`0.35s ease\` value. No published motion token resolves to \`0.35s\`, so the value is Bootstrap's
literal rather than a motion token, and \`--vn-factor-motion\` does not rescale it. The transition is written
through the \`transition\` mixin, so the reduced-motion rule the release records beside each one is
emitted with it, and the duration resolves to \`0s\` under that preference. The hiding rule carries no
transition, so a panel shown or hidden by its class changes state at once.

No rule here paints a color, so every state resolves the same in either color mode.
`,
		`Each closing box transitions the size it clips, \`height\` or \`width\`, over the
\`--vn-motion-panel\` duration on the \`--vn-ease-panel\` curve, so the size an engine writes inline
moves on the panel timing and rescales with the \`--vn-factor-motion\` factor. The box transitions no
opacity, because the \`collapsing\` class marks an opening panel and a closing one alike. The
transition is written through the \`transition\` mixin, so the reduced-motion rule the release
records beside each one is emitted with it, and the duration resolves to \`0s\` under that
preference. The hiding rule carries no transition, so a panel shown or hidden by its class changes
state at once.

No rule here paints a color, so every state resolves the same in either color mode.

These are the key's recorded departures.

- **The size moves on the panel motion tokens.** The release writes the \`height 0.35s ease\` and
  \`width 0.35s ease\` values; Veneer writes the
  \`height var(--vn-motion-panel) var(--vn-ease-panel)\` and
  \`width var(--vn-motion-panel) var(--vn-ease-panel)\` values, which resolve to \`0.25s\` on the
  \`cubic-bezier(0.32, 0.72, 0, 1)\` curve and rescale with the \`--vn-factor-motion\` factor. A panel
  therefore opens and closes sooner than the release's and decelerates into its end size.
`,
	],
	// § Collapse classes: the proof paragraph.
	[
		`compound against a nested element, each transition at rest and under the staged preference, and
every state inside a dark island.
`,
		`compound against a nested element, each transition's declaration at rest and under the
reduced-motion condition, and every state inside a dark island. It also reads the transition the
browser runs as a panel opens and closes on each axis through the class and size writes an engine
makes: the panel duration and curve a specimen resolves from the tokens, the size alone moving, and
the midpoint frame past half the travel; twice that duration at a doubled motion factor; and no
transition at a zero factor or under the staged preference.
`,
	],
	// § Accordion classes: the motion paragraph.
	[
		`\`--vn-factor-motion\` factor. The chevron transition carries Bootstrap's own \`0.2s\` timing. Each is
written through the \`transition\` mixin,`,
		`\`--vn-factor-motion\` factor. The chevron turns its \`transform\` over the same
\`--vn-motion-feedback\` token on the \`--vn-ease-standard\` curve, and ends at the release's own
\`rotate(-180deg)\` half turn. Each is written through the \`transition\` mixin,`,
	],
	// § Accordion classes: the departure bullet.
	[
		`  \`--vn-motion-feedback\` token, which resolves to that value at a factor of \`1\`, and keeps the
  release's \`ease-in-out\` curves and the \`ease\` curve on the radius.
`,
		`  \`--vn-motion-feedback\` token, which resolves to that value at a factor of \`1\`, and keeps the
  release's \`ease-in-out\` curves and the \`ease\` curve on the radius.
- **The chevron turns on the feedback motion tokens.** The release writes the
  \`--bs-accordion-btn-icon-transition\` property as \`transform 0.2s ease-in-out\`; the partial writes
  \`transform var(--vn-motion-feedback) var(--vn-ease-standard)\`, which resolves to \`0.15s ease\`
  and rescales with the \`--vn-factor-motion\` factor. The half turn stays the release's.
`,
	],
	// § Accordion classes: the proof paragraph.
	[
		`and curves at the resting motion factor, twice those durations at a doubled factor, and no
transition at a zero factor.
`,
		`and curves at the resting motion factor, twice those durations at a doubled factor, and no
transition at a zero factor. It reads the chevron's turn as one button takes the collapsed class
and another loses it: the feedback duration and standard curve a specimen resolves from the tokens,
with each chevron held at its start frame while it turns; twice that duration at a doubled factor;
and a chevron that lands on its end frame at once at a zero factor or under the staged preference.
`,
	],
	// § Factors: the exception list.
	[
		`The motion factor scales every transition duration the cascade writes except the collapse,
offcanvas panel, carousel slide and indicator, and accordion chevron timings, which keep the
release's literals as their own sections record.`,
		`The motion factor scales every transition duration the cascade writes except the offcanvas
panel and the carousel slide and indicator timings, which keep the release's literals as their own
sections record.`,
	],
	// § Departures: the accordion row.
	[
		"| `accordion` | `.accordion`        | `--bs-accordion-btn-padding-y`        |",
		"| `accordion` | `.accordion` | `--bs-accordion-btn-icon-transition` | — | `transform 0.2s ease-in-out` | `transform var(--vn-motion-feedback) var(--vn-ease-standard)` | tokenized |\n| `accordion` | `.accordion`        | `--bs-accordion-btn-padding-y`        |",
	],
	// § Departures: the collapsing table.
	[
		"\n#### `column-gap`\n",
		"\n#### `collapsing`\n\n| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |\n| --- | --- | --- | --- | --- | --- | --- |\n| `collapsing` | `.collapsing` | `transition` | — | `height 0.35s ease` | `height var(--vn-motion-panel) var(--vn-ease-panel)` | tokenized |\n| `collapsing` | `.collapsing.collapse-horizontal` | `transition` | — | `width 0.35s ease` | `width var(--vn-motion-panel) var(--vn-ease-panel)` | tokenized |\n\n#### `column-gap`\n",
	],
]
for (const [from, to] of pairs) {
	const count = text.split(from).length - 1
	if (count !== 1) throw new Error(`expected one match, found ${count}: ${from.slice(0, 70)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
