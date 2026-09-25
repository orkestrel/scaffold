import { readFileSync, writeFileSync } from 'node:fs'
const path = 'guides/veneer.md'
let lines = readFileSync(path, 'utf8').split('\n')
const icon = lines.findIndex((line) => line.startsWith('| `accordion` | `.accordion`        | `--bs-accordion-btn-icon-transition`'))
const [row] = lines.splice(icon, 1)
const padding = lines.findIndex((line) => line.startsWith('| `accordion` | `.accordion`        | `--bs-accordion-btn-padding-y`'))
lines.splice(padding + 1, 0, row)
let text = lines.join('\n')
const pairs = [
	[
		`\`--vn-factor-motion\` factor. The chevron turns its \`transform\` over the same
\`--vn-motion-feedback\` token on the \`--vn-ease-standard\` curve, and ends at the release's own
\`rotate(-180deg)\` half turn. Each is written through the \`transition\` mixin, so the reduced-motion rule the release records beside it is
emitted with it, and each duration resolves to a \`0s\` duration under that preference.`,
		`\`--vn-factor-motion\` factor. The chevron turns its \`transform\` over the same
\`--vn-motion-feedback\` token on the \`--vn-ease-standard\` curve, and ends at the release's own
\`rotate(-180deg)\` half turn. Each is written through the \`transition\` mixin, so the
reduced-motion rule the release records beside it is emitted with it, and each duration resolves to
a \`0s\` duration under that preference.`,
	],
	[
		`The motion factor scales every transition duration the cascade writes except the offcanvas
panel and the carousel slide and indicator timings, which keep the release's literals as their own
sections record. A scaled duration reads a \`--vn-motion-*\` token,
alone or scaled by a fixed ratio, so it doubles from its own resting value at a factor of \`2\` and
starts no transition at a factor of \`0\`.`,
		`The motion factor scales every transition duration the cascade writes except the offcanvas
panel and the carousel slide and indicator timings, which keep the release's literals as their own
sections record. A scaled duration reads a \`--vn-motion-*\` token, alone or scaled by a fixed ratio,
so it doubles from its own resting value at a factor of \`2\` and starts no transition at a factor of
\`0\`.`,
	],
]
for (const [from, to] of pairs) {
	const count = text.split(from).length - 1
	if (count !== 1) throw new Error(`expected one match, found ${count}: ${from.slice(0, 70)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
