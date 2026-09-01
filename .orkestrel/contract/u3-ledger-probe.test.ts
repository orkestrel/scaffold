import { describe, expect, it, vi } from 'vitest'

describe('u3 ledger probe', () => {
	it('reports the map constructions each amended control call performs', async () => {
		const original = Object.getOwnPropertyDescriptor(globalThis, 'WeakMap')
		if (original === undefined) throw new Error('the WeakMap descriptor is absent')
		let constructions = 0
		class CountingWeakMap extends WeakMap<object, unknown> {
			constructor(entries?: ReadonlyArray<readonly [object, unknown]> | null) {
				super(entries)
				constructions += 1
			}
		}
		const readings: Record<string, number> = {}
		try {
			Object.defineProperty(globalThis, 'WeakMap', { ...original, value: CountingWeakMap })
			vi.resetModules()
			const loaded = await import('../../src/core/index.js')
			const few = loaded.objectShape({
				items: loaded.arrayShape(loaded.objectShape({ name: loaded.stringShape() })),
			})
			const many = loaded.objectShape({
				items: loaded.arrayShape(loaded.objectShape({ name: loaded.stringShape() })),
				first: loaded.arrayShape(loaded.objectShape({ tag: loaded.stringShape() })),
				second: loaded.arrayShape(loaded.objectShape({ tag: loaded.stringShape() })),
				third: loaded.arrayShape(loaded.objectShape({ tag: loaded.stringShape() })),
				fourth: loaded.arrayShape(loaded.objectShape({ tag: loaded.stringShape() })),
			})
			const compilerFew = new loaded.ContractCompiler(few)
			const compilerMany = new loaded.ContractCompiler(many)
			let opened = constructions
			const guardFew = compilerFew.guard
			readings.builtFew = constructions - opened
			opened = constructions
			const guardMany = compilerMany.guard
			readings.builtMany = constructions - opened
			opened = constructions
			guardFew({ items: [{ name: 'leaf' }, { name: 'branch' }] })
			readings.calledFew = constructions - opened
			opened = constructions
			guardMany({
				items: [{ name: 'leaf' }, { name: 'branch' }],
				first: [{ tag: 'a' }, { tag: 'b' }],
				second: [{ tag: 'c' }, { tag: 'd' }],
				third: [{ tag: 'e' }, { tag: 'f' }],
				fourth: [{ tag: 'g' }, { tag: 'h' }],
			})
			readings.calledMany = constructions - opened
			opened = constructions
			guardFew({ items: [{ name: 'leaf' }] })
			readings.calledOneObject = constructions - opened
		} finally {
			Object.defineProperty(globalThis, 'WeakMap', original)
			vi.resetModules()
		}

		console.log(JSON.stringify(readings))
		expect(readings.calledFew).toBeGreaterThan(0)
	})

	it('reuses a promoted ledger entry and isolates it per call', async () => {
		const loaded = await import('../../src/core/index.js')
		const shape = loaded.arrayShape(loaded.objectShape({ inner: loaded.stringShape() }))
		let reads = 0
		const left: Record<string, unknown> = {}
		const right: Record<string, unknown> = {}
		for (const record of [left, right]) {
			Object.defineProperty(record, 'inner', {
				get: () => {
					reads += 1
					return 'leaf'
				},
				enumerable: true,
			})
		}
		const guard = loaded.compileGuard(shape)
		const answered = guard([left, right, left, right, left])
		const promoted = reads
		const second = guard([left, right, left, right, left])

		console.log(JSON.stringify({ answered, promoted, afterSecondCall: reads, second }))
		expect(promoted).toBe(2)
		expect(reads).toBe(4)
	})

	it('holds no report about an object across two calls of one retained auditor', async () => {
		const loaded = await import('../../src/core/index.js')
		const shape = loaded.objectShape({ inner: loaded.stringShape() })
		const compiler = new loaded.ContractCompiler(shape)
		const auditor = compiler.auditor
		const record: Record<string, unknown> = { inner: 'x' }
		const clean = auditor(record).length
		record.inner = 1
		const afterMutation = auditor(record).length

		console.log(JSON.stringify({ clean, afterMutation }))
		expect(clean).toBe(0)
		expect(afterMutation).toBe(1)
	})
})
