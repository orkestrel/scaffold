// Probe for the census recast: does the writable-prototype-member corpus equal
// the set of exported plain functions (exported functions that are not one of
// the package's classes)? Run: node census-derived.mjs </abs/dist/index.js>
/* eslint-disable */
const core = await import(process.argv[2])
const owners = [core.JSONCloner, core.SchemaCloner, core.ShapeCloner, core.ShapeValidator, core.ContractError]
const names = Object.getOwnPropertyNames(core)
const rows = names.flatMap((name) => {
	const exported = Reflect.get(core, name)
	if (typeof exported !== 'function') return []
	const prototype = Reflect.get(exported, 'prototype')
	if (typeof prototype !== 'object' || prototype === null) return []
	return Object.getOwnPropertyNames(prototype).flatMap((member) => {
		const d = Object.getOwnPropertyDescriptor(prototype, member)
		return d !== undefined && d.writable === true ? [`${name}.prototype.${member}`] : []
	})
})
const plain = names.filter((name) => { const e = Reflect.get(core, name); return typeof e === 'function' && !owners.some((o) => o === e) })
const noPrototype = plain.filter((name) => { const p = Reflect.get(Reflect.get(core, name), 'prototype'); return typeof p !== 'object' || p === null })
console.log(`rows=${rows.length} plain=${plain.length} classes=${owners.length} functions=${names.filter((n) => typeof Reflect.get(core, n) === 'function').length} plainWithoutPrototype=${JSON.stringify(noPrototype)} nonConstructorRows=${JSON.stringify(rows.filter((r) => !r.endsWith('.prototype.constructor')))}`)
