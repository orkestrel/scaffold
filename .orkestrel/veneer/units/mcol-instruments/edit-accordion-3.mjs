import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/src/styles/components/accordion.test.ts'
let text = readFileSync(path, 'utf8')
const from = `	// Each reading is the chevron's own transition as one button takes the collapsed class and
	// another loses it, compared with the feedback duration and the standard curve a specimen
	// resolves from the tokens at the same factor, apart from the accordion's rules. The doubled
	// duration is read as a ratio to the resting one. A running turn holds the chevron at its start
	// frame as the class changes, and a zero factor or the reduced-motion preference lands the
	// chevron on its end frame at once, which is the release's half turn on the expanded button.
`
const to = `	// Each reading is the transition the chevron's pseudo-element resolves as one button takes the
	// collapsed class and another loses it, compared with the feedback duration and the standard
	// curve a specimen resolves from the tokens at the same factor, apart from the accordion's rules.
	// The doubled duration is read as a ratio to the resting one. The \`sampleTransition\` reader takes
	// no pseudo-element, so the turn itself is read through the chevron's frames: a running turn holds
	// each chevron at its start frame as the class changes, and a zero factor or the reduced-motion
	// preference lands it on its end frame at once, which is the release's half turn on the expanded
	// button.
`
if (text.split(from).length !== 2) throw new Error('missing')
writeFileSync(path, text.replace(from, to))
