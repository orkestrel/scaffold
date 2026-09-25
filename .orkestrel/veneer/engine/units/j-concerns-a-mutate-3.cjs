// Round 3 successor of mutate.cjs. Changes from it: the pristine sources are round 3's (ScrollSpy
// gates its scroll on the reduced-motion preference), the scroll mutations match the gated
// `behavior` constant, `scrollspy-reduced` is retired because it is the fix, `scrollspy-ungated`
// removes the gate, and `button-stale-return` is added for the nested-toggle case.
// Usage: node tmp/j-concerns-a/mutate-3.cjs <name> | restore
'use strict'
const { createHash } = require('node:crypto')
const { copyFileSync, readFileSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')

const root = join(__dirname, '..', '..')
const pristine = join(__dirname, 'round3', 'pristine')
const files = {
	scrollspy: join(root, 'src', 'browser', 'ScrollSpy.ts'),
	button: join(root, 'src', 'browser', 'Button.ts'),
}
const digests = {
	scrollspy: '367a1d0cb3ccbd546696d2fc70b3b5a7f1fe29746b16a82cd74088f6638a6502',
	button: '993c63d05d9f523894251be82afc8033d2a6252b463dc912520df6be4b2b52e4',
}

const ACTIVATE = 'emitEvent(this.#host, SCROLL_SPY_EVENTS.activate, { relatedTarget: link }, false)'
const TOGGLE = 'emitEvent(this.#host, BUTTON_EVENTS.toggle, { pressed: this.pressed }, false)'
const PREVENT = '\t\tevent.preventDefault()\n\t\tconst behavior'
const GATE = "const behavior = matchesReducedMotion(this.#host) ? 'instant' : 'smooth'"
const HOST_SCROLL = 'root.scrollTop,\n\t\t\t\tbehavior,\n'
const VIEW_SCROLL = 'view?.scrollTo({ top: top + view.scrollY, behavior })'

const mutations = {
	// Makes the activate event cancelable and stops the delivery when a listener prevents it.
	'scrollspy-cancel': ['scrollspy', ACTIVATE, `if (!${ACTIVATE.replace('false)', 'true)')}) return false`],
	// Moves focus to the link each activation selects.
	'scrollspy-focus-link': ['scrollspy', ACTIVATE, `link.focus()\n\t\t${ACTIVATE}`],
	// Moves focus to the section the smooth scroll reaches, as a fragment navigation target.
	'scrollspy-focus-section': [
		'scrollspy',
		PREVENT,
		'\t\tevent.preventDefault()\n\t\tsection.tabIndex = -1\n\t\tsection.focus({ preventScroll: true })\n\t\tconst behavior',
	],
	// Lets the click's fragment navigation run beside the scroll.
	'scrollspy-navigate': ['scrollspy', PREVENT, '\t\tconst behavior'],
	// Scrolls the host instantly whatever the preference.
	'scrollspy-instant-host': ['scrollspy', HOST_SCROLL, "root.scrollTop,\n\t\t\t\tbehavior: 'instant',\n"],
	// Scrolls the document instantly whatever the preference.
	'scrollspy-instant-view': ['scrollspy', VIEW_SCROLL, "view?.scrollTo({ top: top + view.scrollY, behavior: 'instant' })"],
	// Removes the reduced-motion gate, so the scroll is smooth whatever the preference.
	'scrollspy-ungated': ['scrollspy', GATE, "const behavior = 'smooth'"],
	// Moves focus to the host at each toggle.
	'button-focus': ['button', TOGGLE, `${TOGGLE}\n\t\tthis.#host.focus()`],
	// Takes focus off the host at each toggle.
	'button-blur': ['button', TOGGLE, `${TOGGLE}\n\t\tthis.#host.blur()`],
	// Dispatches the toggle event only when no animation runs on the host.
	'button-motion': ['button', TOGGLE, `if (this.#host.getAnimations().length === 0) ${TOGGLE}`],
	// Returns the state read before the dispatch, so a listener's nested toggle is not reflected.
	'button-stale-return': [
		'button',
		`${TOGGLE}\n\t\treturn this.pressed`,
		`const pressed = this.pressed\n\t\temitEvent(this.#host, BUTTON_EVENTS.toggle, { pressed }, false)\n\t\treturn pressed`,
	],
}

function digest(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex')
}

const name = process.argv[2]
if (name === 'restore') {
	for (const key of Object.keys(files)) {
		copyFileSync(join(pristine, `${key}.ts`), files[key])
		const read = digest(files[key])
		if (read !== digests[key]) throw new Error(`${key} restored to ${read}`)
		console.log(`restored ${key} ${read}`)
	}
} else {
	const mutation = mutations[name]
	if (mutation === undefined) throw new Error(`No mutation named ${name}`)
	const [key, from, to] = mutation
	const path = files[key]
	if (digest(path) !== digests[key]) throw new Error(`${key} is not pristine before ${name}`)
	const text = readFileSync(path, 'utf8')
	const count = text.split(from).length - 1
	if (count !== 1) throw new Error(`${name} matches ${count} sites`)
	writeFileSync(path, text.replace(from, to))
	console.log(`applied ${name} to ${key}`)
}
