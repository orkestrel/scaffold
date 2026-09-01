// Evidence instrument: counts every trap a Proxy array sees during one
// readArrayEntries call, so the guide's read order (length once, ownKeys once,
// per-index hasOwn and one indexed read) can be compared across two dists.
// Run: node array-reads.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { readArrayEntries } = lib
function observe(name, target) {
	const counts = {}
	const bump = (k) => { counts[k] = (counts[k] ?? 0) + 1 }
	const proxy = new Proxy(target, {
		get: (t, k, r) => { bump(`get:${String(k)}`); return Reflect.get(t, k, r) },
		ownKeys: (t) => { bump('ownKeys'); return Reflect.ownKeys(t) },
		getOwnPropertyDescriptor: (t, k) => { bump(`descriptor:${String(k)}`); return Reflect.getOwnPropertyDescriptor(t, k) },
		has: (t, k) => { bump(`has:${String(k)}`); return Reflect.has(t, k) },
		getPrototypeOf: (t) => { bump('getPrototypeOf'); return Reflect.getPrototypeOf(t) },
	})
	const read = readArrayEntries(proxy)
	const ordered = Object.keys(counts).sort().map(k => `${k}=${counts[k]}`).join(' ')
	console.log(`${name}: success=${read.success} dense=${read.success ? read.value.dense : '-'} traps{ ${ordered} }`)
}
observe('packed 3', ['a', 'b', 'c'])
observe('packed 1025', Array.from({ length: 1025 }, (_, i) => `v${i}`))
observe('sparse', ['a', , 'c'])
observe('extra key', Object.assign(['a', 'b'], { note: 1 }))
