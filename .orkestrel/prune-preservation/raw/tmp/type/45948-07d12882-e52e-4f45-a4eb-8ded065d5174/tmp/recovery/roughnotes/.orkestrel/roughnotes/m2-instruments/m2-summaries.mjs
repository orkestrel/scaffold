// Rewrites each flagged doc-block summary in the two owned browser-test files.
// Every pair is an exact whole-line match, asserted to occur exactly once.
import { readFileSync, writeFileSync } from 'node:fs'

const setup = 'tests/app/browser/setup.ts'
const test = 'tests/app/browser/App.test.ts'

const edits = [
	[
		setup,
		'/** How long a surface may take to paint a heading after a hash change, in ms. */',
		'/** Caps how long a surface may take to paint a heading after a hash change, in ms. */',
	],
	[
		setup,
		'/** How often a settle poll may re-read the page, in ms. */',
		'/** Sets how often a settle poll may re-read the page, in ms. */',
	],
	[
		setup,
		"/** How long a control's paint may keep moving before the matrix refuses to read it, in ms. */",
		"/** Caps how long a control's paint may keep moving before the matrix refuses to read it, in ms. */",
	],
	[
		setup,
		'/** The heading the home view paints. */',
		'/** Holds the heading the home view paints. */',
	],
	[
		setup,
		'/** The voice the layer uses when Sign In is absent. */',
		'/** Holds the voice the layer uses when Sign In is absent. */',
	],
	[
		setup,
		' * The voice the layer uses for the compact trigger a wide masthead renders and hides.',
		' * Holds the voice the layer uses for the compact trigger a wide masthead renders and hides.',
	],
	[
		setup,
		'/** The voice the layer uses for the compact dismissal a closed menu renders and hides. */',
		'/** Holds the voice the layer uses for the compact dismissal a closed menu renders and hides. */',
	],
	[
		setup,
		'/** The width, in CSS px, below which the masthead folds its destinations into the compact menu. */',
		'/**\n * Marks the width, in CSS px, below which the masthead folds its destinations into the compact\n * menu.\n */',
	],
	[
		setup,
		'/** The ratio information-bearing text must reach against the surface behind it. */',
		'/** Sets the ratio information-bearing text must reach against the surface behind it. */',
	],
	[
		setup,
		'/** The ratio a meaningful textless mark, a state, and focus chrome must reach. */',
		'/** Sets the ratio a meaningful textless mark, a state, and focus chrome must reach. */',
	],
	[
		setup,
		'/** One resolved-style role the matrix reads: its membership rule and the bar every member clears. */',
		'/**\n * Describes one resolved-style role the matrix reads: its membership rule and the bar every member\n * clears.\n */',
	],
	[
		setup,
		'/** One control the matrix focuses, to read the fill its label sits on and the ring it wears. */',
		'/**\n * Describes one control the matrix focuses, to read the fill its label sits on and the ring it\n * wears.\n */',
	],
	[
		setup,
		'/** One painted gradient surface and the primitive tokens its stops name. */',
		'/** Pairs one painted gradient surface with the primitive tokens its stops name. */',
	],
	[
		setup,
		'/** The roles the shell paints on every screen, all of them on the navy utility bar and footer. */',
		'/**\n * Lists the roles the shell paints on every screen, all of them on the navy utility bar and footer.\n */',
	],
	[
		setup,
		'/** The roles home paints across its paper sections and its navy islands. */',
		'/** Lists the roles home paints across its paper sections and its navy islands. */',
	],
	[
		setup,
		'/** The roles a listing paints once its filter row and its records are on screen. */',
		'/** Lists the roles a listing paints after its filter row and its records are on screen. */',
	],
	[
		setup,
		'/** The roles a refused request paints. */',
		'/** Lists the roles a refused request paints. */',
	],
	[
		setup,
		'/** The roles a quiet notice paints: the `empty`, `miss`, and `partial` categories share them. */',
		'/**\n * Lists the roles a quiet notice paints: the `empty`, `miss`, and `partial` categories share them.\n */',
	],
	[
		setup,
		' * A fixture book the live listing identifies by its catalog code alone.',
		' * Holds a fixture book the live listing identifies by its catalog code alone.',
	],
	[
		setup,
		'/** The primary commit the subscribe desk ends on. */',
		'/** Names the primary commit the subscribe desk ends on. */',
	],
	[
		setup,
		' * The quiet destination the footer carries to the shop.',
		' * Names the quiet destination the footer carries to the shop.',
	],
	[
		setup,
		"/** The magazine filter row's selected control. */",
		"/** Names the magazine filter row's selected control. */",
	],
	[
		setup,
		"/** The magazine filter row's unselected control. */",
		"/** Names the magazine filter row's unselected control. */",
	],
	[
		setup,
		"/** The plain link a refused inquiry's summary offers. */",
		"/** Names the plain link a refused inquiry's summary offers. */",
	],
	[
		setup,
		'/** The host one journey mounted and the application it provided. */',
		'/** Describes the host one journey mounted and the application it provided. */',
	],
	[
		setup,
		'/** How one journey opens the shipped shell. */',
		'/** Describes how one journey opens the shipped shell. */',
	],
	[
		setup,
		'/** How many writes a {@link QuotaStorage} accepts before its quota is spent. */',
		'/** Declares how many writes a {@link QuotaStorage} accepts before its quota is spent. */',
	],
	[
		setup,
		"/** Which operations the host's storage permission covers. */",
		"/** Declares which operations the host's storage permission covers. */",
	],
	[
		setup,
		"/** The opaque fill a composited stack ends on, which is what the reader's walk must reach. */",
		"/** Holds the opaque fill a composited stack ends on, which is what the reader's walk must reach. */",
	],
	[
		setup,
		'/** The translucent layer a composited stack paints over {@link STACK_BASE}. */',
		'/** Holds the translucent layer a composited stack paints over {@link STACK_BASE}. */',
	],
	[
		setup,
		'/** A foreground the flat reading clears and the composited reading fails. */',
		'/** Holds a foreground the flat reading clears and the composited reading fails. */',
	],
	[
		setup,
		'/** A foreground the composited reading clears and the flat reading fails. */',
		'/** Holds a foreground the composited reading clears and the flat reading fails. */',
	],
	[
		setup,
		'/** One translucent stack and the two foregrounds the composited-contrast control reads over it. */',
		'/**\n * Pairs one translucent stack with the refused and accepted foregrounds the composited-contrast\n * control reads over it.\n */',
	],
	[
		setup,
		'/** The membership rule every census row names. */',
		'/** Holds the membership rule every census row names. */',
	],
	[
		setup,
		'/** One authored-class census: the population it walked and the tokens the cascade never declares. */',
		'/**\n * Describes one authored-class census: the population it walked and the tokens the cascade never\n * declares.\n */',
	],
	[
		setup,
		'/** The fixtures one style-escape reading carries, and the block it must leave alone. */',
		'/** Describes the fixtures one style-escape reading carries, and the block it must leave alone. */',
	],
	[
		test,
		' * @param control - The control a reader has just scrolled to',
		' * @param control - The control a reader has scrolled to',
	],
]

const texts = new Map()
for (const path of [setup, test]) texts.set(path, readFileSync(path, 'utf8'))

const failures = []
for (const [path, from, to] of edits) {
	const text = texts.get(path)
	const hits = text.split(from).length - 1
	if (hits !== 1) {
		failures.push(`${path}: ${hits} hits for ${JSON.stringify(from)}`)
		continue
	}
	texts.set(path, text.replace(from, to))
}

if (failures.length > 0) {
	for (const failure of failures) console.error(failure)
	process.exit(1)
}

for (const [path, text] of texts) writeFileSync(path, text)

for (const [path, text] of texts) {
	for (const [index, line] of text.split('\n').entries()) {
		if (line.length > 100) console.error(`${path}:${index + 1} is ${line.length} columns`)
	}
}
console.log(`applied ${edits.length} replacements`)
