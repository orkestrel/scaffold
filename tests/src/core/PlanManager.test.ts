import {
	blueprint,
	blueprintToPlan,
	isScaffoldError,
	MAX_COLLECTION_ITEMS,
	PlanManager,
	pinPlan,
} from '@src/core'
import { captureError, collisionPlans, createRecorder } from '../../setup.js'
import { describe, expect, it } from 'vitest'

describe('isScaffoldError', () => {
	it('returns false rather than throwing for a revoked proxy', () => {
		const revocable = Proxy.revocable({}, {})
		revocable.revoke()

		expect(isScaffoldError(revocable.proxy)).toBe(false)
	})
})

describe('PlanManager#add — hash-minted ids', () => {
	it('mints the record id from the plan content hash', () => {
		const plans = new PlanManager()
		const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])

		const record = plans.add(plan)

		expect(record.id).toBe(record.hash)
		expect(record.id).toBe(pinPlan(plan).hash)
		plans.destroy()
	})

	it('starts a freshly minted record at version 1', () => {
		const plans = new PlanManager()

		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(record.version).toBe(1)
		plans.destroy()
	})

	it('re-adding a plan whose content is unchanged is a no-op: same id, same version, same record', () => {
		const plans = new PlanManager()
		const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])

		const first = plans.add(plan)
		const second = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(second).toBe(first)
		expect(second.version).toBe(1)
		expect(plans.size).toBe(1)
		plans.destroy()
	})

	it('a plan whose content differs mints a fresh id at version 1', () => {
		const plans = new PlanManager()
		const first = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const second = plans.add(
			blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']),
		)

		expect(second.id).not.toBe(first.id)
		expect(second.version).toBe(1)
		expect(plans.size).toBe(2)
		plans.destroy()
	})

	it('rejects a distinct canonical plan with the same public hash before mutation or emission', () => {
		const [firstPlan, collidingPlan] = collisionPlans()
		expect(pinPlan(firstPlan).hash).toBe(pinPlan(collidingPlan).hash)
		const plans = new PlanManager()
		const first = plans.add(firstPlan)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('add', recorder.handler)

		const error = captureError(() => plans.add(collidingPlan))

		expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
		expect(error).toMatchObject({ message: 'Plan hash collision' })
		expect(plans.size).toBe(1)
		expect(plans.plan(first.id)).toBe(first)
		expect(recorder.count).toBe(0)
		plans.destroy()
	})

	it('owns an immutable nested snapshot instead of aliasing caller or returned data', () => {
		const plans = new PlanManager()
		const input = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])
		const originalName = input.blueprint.name
		const record = plans.add(input)

		expect(Reflect.set(input.blueprint, 'name', 'changed-input')).toBe(true)
		expect(record.plan.blueprint.name).toBe(originalName)
		expect(Reflect.set(record.plan.blueprint, 'name', 'changed-record')).toBe(false)
		expect(Reflect.set(record.plan, 'trace', 'changed-trace')).toBe(false)
		expect(Reflect.set(record, 'version', 99)).toBe(false)
		expect(plans.plan(record.id)).toBe(record)
		expect(plans.plan(record.id)?.plan.blueprint.name).toBe(originalName)
		plans.destroy()
	})

	it('emits add with the final record id', () => {
		const plans = new PlanManager()
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('add', recorder.handler)

		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(recorder.count).toBe(1)
		expect(recorder.calls[0]).toEqual([record.id])
		plans.destroy()
	})

	it('emits add again on a content-unchanged re-add (still fires, id repeats)', () => {
		const plans = new PlanManager()
		const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])
		plans.add(plan)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('add', recorder.handler)

		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(recorder.count).toBe(1)
	})
})

describe('PlanManager — accessors', () => {
	it('has reports registered ids and not unregistered ones', () => {
		const plans = new PlanManager()
		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(plans.has(record.id)).toBe(true)
		expect(plans.has('missing')).toBe(false)
		plans.destroy()
	})

	it('plan looks up one registered record by id, undefined otherwise', () => {
		const plans = new PlanManager()
		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(plans.plan(record.id)).toBe(record)
		expect(plans.plan('missing')).toBeUndefined()
	})

	it('plans lists every registered record as a snapshot array', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(plans.plans()).not.toBe(plans.plans())
		expect(plans.plans()).toHaveLength(1)
	})

	it('size reflects the number of registered plans', () => {
		const plans = new PlanManager()
		expect(plans.size).toBe(0)

		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']))

		expect(plans.size).toBe(2)
		plans.destroy()
	})

	it('constructor seeds from options.plans without emitting add', () => {
		const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])
		const recorder = createRecorder<[id: string]>()

		const plans = new PlanManager({ plans: [plan], on: { add: recorder.handler } })

		expect(plans.size).toBe(1)
		expect(recorder.count).toBe(0)
		plans.destroy()
	})

	it('rejects a hash collision while seeding constructor plans', () => {
		const [firstPlan, collidingPlan] = collisionPlans()

		const error = captureError(() => new PlanManager({ plans: [firstPlan, collidingPlan] }))

		expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
		expect(error).toMatchObject({ message: 'Plan hash collision' })
	})

	it('rejects accessor-backed options without invoking the accessor', () => {
		let reads = 0
		const options = {}
		Reflect.defineProperty(options, 'plans', {
			enumerable: true,
			get: () => {
				reads += 1
				return []
			},
		})

		const error = captureError(() => Reflect.construct(PlanManager, [options]))

		expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
		expect(reads).toBe(0)
	})

	it('rejects a custom seed iterator and an oversized seed before iteration', () => {
		const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])
		const custom = [plan]
		let iterations = 0
		Reflect.defineProperty(custom, Symbol.iterator, {
			value: () => {
				iterations += 1
				return custom.values()
			},
		})
		const oversized = Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => plan)

		const customError = captureError(() => Reflect.construct(PlanManager, [{ plans: custom }]))
		const oversizedError = captureError(() =>
			Reflect.construct(PlanManager, [{ plans: oversized }]),
		)

		expect(isScaffoldError(customError) && customError.code === 'INVALID').toBe(true)
		expect(isScaffoldError(oversizedError) && oversizedError.code === 'INVALID').toBe(true)
		expect(iterations).toBe(0)
	})

	it('rejects inherited, accessor, symbol, unknown, and off-contract seed data', () => {
		const inherited: unknown = Object.create({ add: () => undefined })
		const accessor = {}
		Reflect.defineProperty(accessor, 'add', { get: () => undefined })
		const symbol = { [Symbol('hook')]: () => undefined }
		const unknown = { unexpected: () => undefined }
		const malformed = { plans: [{ blueprint: {} }] }

		for (const options of [
			{ on: inherited },
			{ on: accessor },
			{ on: symbol },
			{ on: unknown },
			malformed,
		]) {
			const error = captureError(() => Reflect.construct(PlanManager, [options]))
			expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
		}
	})

	it('converts stateful and revoked option proxy traps into coded INVALID errors', () => {
		const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])
		let seedDescriptors = 0
		const seeds = new Proxy([plan], {
			getOwnPropertyDescriptor: (target, key) => {
				seedDescriptors += 1
				if (seedDescriptors > 1) throw new Error('seed descriptor trap')
				return Reflect.getOwnPropertyDescriptor(target, key)
			},
		})
		let hookDescriptors = 0
		const hooks = new Proxy(
			{ add: () => undefined },
			{
				getOwnPropertyDescriptor: (target, key) => {
					hookDescriptors += 1
					if (hookDescriptors > 1) throw new Error('hook descriptor trap')
					return Reflect.getOwnPropertyDescriptor(target, key)
				},
			},
		)
		const revoked = Proxy.revocable({}, {})
		revoked.revoke()

		for (const options of [{ plans: seeds }, { on: hooks }, revoked.proxy]) {
			const error = captureError(() => Reflect.construct(PlanManager, [options]))
			expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
		}
	})

	it('isolates an initial listener failure through error while preserving state and siblings', () => {
		const failure = new Error('listener failed')
		const errors = createRecorder<[error: unknown, event: string]>()
		const sibling = createRecorder<[id: string]>()
		const plans = new PlanManager({
			on: {
				add: () => {
					throw failure
				},
			},
			error: errors.handler,
		})
		plans.emitter.on('add', sibling.handler)

		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(plans.has(record.id)).toBe(true)
		expect(sibling.calls).toEqual([[record.id]])
		expect(errors.calls).toEqual([[failure, 'add']])
		plans.destroy()
	})
})

describe('PlanManager#remove — array-overload batch semantics', () => {
	it('remove(id) removes one registered plan and returns true', () => {
		const plans = new PlanManager()
		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(plans.remove(record.id)).toBe(true)
		expect(plans.has(record.id)).toBe(false)
	})

	it('remove(id) returns false for an unregistered id', () => {
		const plans = new PlanManager()

		expect(plans.remove('missing')).toBe(false)
	})

	it('remove(ids[]) is all-or-nothing: an unregistered id leaves the collection untouched', () => {
		const plans = new PlanManager()
		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))

		expect(plans.remove([record.id, 'missing'])).toBe(false)
		expect(plans.has(record.id)).toBe(true)
		plans.destroy()
	})

	it('remove(ids[]) removes every listed id and returns true when all present', () => {
		const plans = new PlanManager()
		const a = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const b = plans.add(
			blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']),
		)

		expect(plans.remove([a.id, b.id])).toBe(true)
		expect(plans.size).toBe(0)
	})

	it('remove() removes every registered plan and returns undefined (void)', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']))

		const result = plans.remove()

		expect(result).toBeUndefined()
		expect(plans.size).toBe(0)
	})

	it('emits remove once for remove(id)', () => {
		const plans = new PlanManager()
		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove(record.id)

		expect(recorder.count).toBe(1)
		expect(recorder.calls[0]).toEqual([record.id])
	})

	it('emits remove once per id for remove(ids[])', () => {
		const plans = new PlanManager()
		const a = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const b = plans.add(
			blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']),
		)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove([a.id, b.id])

		expect(recorder.count).toBe(2)
	})

	it('commits an entire batch before the first event and resists reentrant duplicate removal', () => {
		const plans = new PlanManager()
		const first = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const second = plans.add(
			blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']),
		)
		const recorder = createRecorder<[id: string]>()
		const observations: boolean[][] = []
		const reentrant: boolean[] = []
		plans.emitter.on('remove', (id) => {
			observations.push([plans.has(first.id), plans.has(second.id)])
			if (id === first.id) reentrant.push(plans.remove(second.id))
			recorder.handler(id)
		})

		expect(plans.remove([first.id, second.id])).toBe(true)

		expect(observations).toEqual([
			[false, false],
			[false, false],
		])
		expect(reentrant).toEqual([false])
		expect(recorder.calls).toEqual([[first.id], [second.id]])
	})

	it('does not emit remove when the batch remove fails (missing id)', () => {
		const plans = new PlanManager()
		const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove([record.id, 'missing'])

		expect(recorder.count).toBe(0)
	})

	it('rejects a custom batch iterator before mutation and never invokes it', () => {
		const plans = new PlanManager()
		const first = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const second = plans.add(
			blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']),
		)
		const ids = [first.id, second.id]
		let iterations = 0
		Reflect.defineProperty(ids, Symbol.iterator, {
			value: () => {
				iterations += 1
				return ids.values()
			},
		})
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		const error = captureError(() => plans.remove(ids))

		expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
		expect(iterations).toBe(0)
		expect(plans.has(first.id)).toBe(true)
		expect(plans.has(second.id)).toBe(true)
		expect(recorder.count).toBe(0)
		plans.destroy()
	})

	it('emits remove once per registered plan for remove()', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']))
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove()

		expect(recorder.count).toBe(2)
	})

	it('clears every plan before the first remove-all event and prevents reentrant duplicates', () => {
		const plans = new PlanManager()
		const first = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const second = plans.add(
			blueprintToPlan(blueprint('budget', { src: ['core', 'server'] }), ['manifest']),
		)
		const recorder = createRecorder<[id: string]>()
		const observations: number[] = []
		const reentrant: boolean[] = []
		plans.emitter.on('remove', (id) => {
			observations.push(plans.size)
			if (id === first.id) reentrant.push(plans.remove(second.id))
			recorder.handler(id)
		})

		plans.remove()

		expect(observations).toEqual([0, 0])
		expect(reentrant).toEqual([false])
		expect(recorder.calls).toEqual([[first.id], [second.id]])
	})
})

describe('PlanManager — destroy semantics', () => {
	it('clears the collection and emits destroy exactly once (idempotent)', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		const recorder = createRecorder<[]>()
		plans.emitter.on('destroy', recorder.handler)

		plans.destroy()
		plans.destroy()

		expect(recorder.count).toBe(1)
	})

	it('throws ScaffoldError coded DESTROYED from add after destroy', () => {
		const plans = new PlanManager()
		plans.destroy()

		const error = captureError(() =>
			plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest'])),
		)

		expect(isScaffoldError(error) && error.code === 'DESTROYED').toBe(true)
	})

	it('throws ScaffoldError coded DESTROYED from has/plan/plans/remove after destroy', () => {
		const plans = new PlanManager()
		plans.destroy()

		expect(isScaffoldError(captureError(() => plans.has('x')))).toBe(true)
		expect(isScaffoldError(captureError(() => plans.plan('x')))).toBe(true)
		expect(isScaffoldError(captureError(() => plans.plans()))).toBe(true)
		expect(isScaffoldError(captureError(() => plans.remove('x')))).toBe(true)
	})

	it('the size getter keeps working after destroy (reports 0)', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] }), ['manifest']))
		plans.destroy()

		expect(plans.size).toBe(0)
	})
})
