// Applies one named mutation to an owned engine source, or restores the pristine copy and checks
// its digest. Usage: node tmp/j-concerns-a/mutate.cjs <name> | restore
'use strict'
const { createHash } = require('node:crypto')
const { copyFileSync, readFileSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')

const root = join(__dirname, '..', '..')
const pristine = join(__dirname, 'pristine')
const files = {
	scrollspy: join(root, 'src', 'browser', 'ScrollSpy.ts'),
	button: join(root, 'src', 'browser', 'Button.ts'),
}
const digests = {
	scrollspy: '8d39eba242d0eaf7a3fe8ea972eb46fcdc9d12a125eb417e84ca081336889545',
	button: '993c63d05d9f523894251be82afc8033d2a6252b463dc912520df6be4b2b52e4',
}

const ACTIVATE = 'emitEvent(this.#host, SCROLL_SPY_EVENTS.activate, { relatedTarget: link }, false)'
const TOGGLE = 'emitEvent(this.#host, BUTTON_EVENTS.toggle, { pressed: this.pressed }, false)'
const PREVENT = '\t\tevent.preventDefault()\n\t\tconst root = this.#observer?.root'
const HOST_SMOOTH = "top: top - root.getBoundingClientRect().top - root.clientTop + root.scrollTop,\n\t\t\t\tbehavior: 'smooth',"
const VIEW_SMOOTH = "view?.scrollTo({ top: top + view.scrollY, behavior: 'smooth' })"
const REDUCED = "matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'"

const mutations = {
	// Makes the activate event cancelable and stops the delivery when a listener prevents it.
	'scrollspy-cancel': ['scrollspy', ACTIVATE, `if (!${ACTIVATE.replace('false)', 'true)')}) return false`],
	// Moves focus to the link each activation selects.
	'scrollspy-focus-link': ['scrollspy', ACTIVATE, `link.focus()\n\t\t${ACTIVATE}`],
	// Moves focus to the section the smooth scroll reaches, as a fragment navigation target.
	'scrollspy-focus-section': [
		'scrollspy',
		PREVENT,
		'\t\tevent.preventDefault()\n\t\tsection.tabIndex = -1\n\t\tsection.focus({ preventScroll: true })\n\t\tconst root = this.#observer?.root',
	],
	// Lets the click's fragment navigation run beside the smooth scroll.
	'scrollspy-navigate': ['scrollspy', PREVENT, '\t\tconst root = this.#observer?.root'],
	// Scrolls the host instantly.
	'scrollspy-instant-host': ['scrollspy', HOST_SMOOTH, HOST_SMOOTH.replace("'smooth'", "'instant'")],
	// Scrolls the document instantly.
	'scrollspy-instant-view': ['scrollspy', VIEW_SMOOTH, VIEW_SMOOTH.replace("'smooth'", "'instant'")],
	// Scrolls the host instantly under a reduced-motion preference.
	'scrollspy-reduced': ['scrollspy', HOST_SMOOTH, HOST_SMOOTH.replace("'smooth'", REDUCED)],
	// Moves focus to the host at each toggle.
	'button-focus': ['button', TOGGLE, `${TOGGLE}\n\t\tthis.#host.focus()`],
	// Takes focus off the host at each toggle.
	'button-blur': ['button', TOGGLE, `${TOGGLE}\n\t\tthis.#host.blur()`],
	// Dispatches the toggle event only when no animation runs on the host.
	'button-motion': ['button', TOGGLE, `if (this.#host.getAnimations().length === 0) ${TOGGLE}`],
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
