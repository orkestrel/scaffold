// Probe: attribute every WeakMap constructed on the compileGuard path to its
// construction site, and report which sites' instances end the run untouched.
/* eslint-disable */

const RealWeakMap = globalThis.WeakMap
const registry = []

class TaggingWeakMap extends RealWeakMap {
	constructor(entries) {
		super(entries)
		const stack = new Error('site').stack ?? ''
		const lines = stack.split('\n').slice(2, 5).map(line => line.trim().replace(/file:\/\/[^ )]*\/(dist|src)\//, ''))
		this.tag = { site: lines.join(' <- '), touched: false }
		registry.push(this.tag)
	}
	get(key) { this.tag.touched = true; return super.get(key) }
	set(key, value) { this.tag.touched = true; return super.set(key, value) }
	has(key) { this.tag.touched = true; return super.has(key) }
}
globalThis.WeakMap = TaggingWeakMap

const { compileGuard, objectShape, stringShape, arrayShape } = await import(
	'/home/user/contract/dist/src/core/index.js'
)

const shape = objectShape({ items: arrayShape(objectShape({ name: stringShape() })) })
const guard = compileGuard(shape)
const value = { items: [{ name: 'Ada' }] }
guard(value)
guard(value)

const groups = new Map()
for (const tag of registry) {
	const key = tag.site
	const group = groups.get(key) ?? { total: 0, untouched: 0 }
	group.total += 1
	if (!tag.touched) group.untouched += 1
	groups.set(key, group)
}
const rows = [...groups.entries()].sort((a, b) => b[1].untouched - a[1].untouched)
for (const [site, group] of rows) {
	console.log(`${String(group.untouched).padStart(3)} untouched / ${String(group.total).padStart(3)} total  ${site.slice(0, 220)}`)
}
