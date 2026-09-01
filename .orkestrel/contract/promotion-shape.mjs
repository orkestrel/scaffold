// Probe: fixes the assertion shape for the promoted regression test.
// Counts WeakMap constructions during the .guard getter read (build), for two
// shapes differing only in tracked-node count, then during calls.
/* eslint-disable */
const RealWeakMap = globalThis.WeakMap
let count = 0
class CountingWeakMap extends RealWeakMap {
	constructor(entries) { super(entries); count += 1 }
}
globalThis.WeakMap = CountingWeakMap

const { ContractCompiler, objectShape, stringShape, arrayShape } = await import(
	'/home/user/contract/dist/src/core/index.js'
)

// few: root object + array + element object = 3 tracked nodes
const few = objectShape({ items: arrayShape(objectShape({ name: stringShape() })) })
// many: few + 4 more object nodes = 7 tracked nodes
const many = objectShape({
	items: arrayShape(objectShape({ name: stringShape() })),
	a: objectShape({ x: stringShape() }),
	b: objectShape({ x: stringShape() }),
	c: objectShape({ x: stringShape() }),
	d: objectShape({ x: stringShape() }),
})

const compilerFew = new ContractCompiler(few)
const compilerMany = new ContractCompiler(many)

let before = count
const guardFew = compilerFew.guard
const duringFew = count - before

before = count
const guardMany = compilerMany.guard
const duringMany = count - before

before = count
guardFew({ items: [{ name: 'a' }] })
const callFew = count - before

before = count
guardMany({ items: [{ name: 'a' }], a: { x: '' }, b: { x: '' }, c: { x: '' }, d: { x: '' } })
const callMany = count - before

console.log(`build few-tracked:  ${duringFew} constructions`)
console.log(`build many-tracked: ${duringMany} constructions`)
console.log(`build delta (regression subject, must be 0 post-M1): ${duringMany - duringFew}`)
console.log(`call few:  ${callFew} constructions (control, must be > 0)`)
console.log(`call many: ${callMany} constructions (control, must exceed call few)`)
