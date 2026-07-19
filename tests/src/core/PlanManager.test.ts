import { blueprint, blueprintToPlan, isScaffoldError, PlanManager, pinPlan } from '@src/core'
import { captureError, createRecorder } from '../../setup.js'
import { describe, expect, it } from 'vitest'

describe('PlanManager#add — hash-minted ids', () => {
	it('mints the record id from the plan content hash', () => {
		const plans = new PlanManager()
		const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest'])

		const record = plans.add(plan)

		expect(record.id).toBe(record.hash)
		expect(record.id).toBe(pinPlan(plan).hash)
		plans.destroy()
	})

	it('starts a freshly minted record at version 1', () => {
		const plans = new PlanManager()

		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(record.version).toBe(1)
		plans.destroy()
	})

	it('re-adding a plan whose content is unchanged is a no-op: same id, same version, same record', () => {
		const plans = new PlanManager()
		const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest'])

		const first = plans.add(plan)
		const second = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(second).toBe(first)
		expect(second.version).toBe(1)
		expect(plans.size).toBe(1)
		plans.destroy()
	})

	it('a plan whose content differs mints a fresh id at version 1', () => {
		const plans = new PlanManager()
		const first = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)
		const second = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core', 'server'] }), ['manifest']),
		)

		expect(second.id).not.toBe(first.id)
		expect(second.version).toBe(1)
		expect(plans.size).toBe(2)
		plans.destroy()
	})

	it('emits add with the final record id', () => {
		const plans = new PlanManager()
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('add', recorder.handler)

		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(recorder.count).toBe(1)
		expect(recorder.calls[0]).toEqual([record.id])
		plans.destroy()
	})

	it('emits add again on a content-unchanged re-add (still fires, id repeats)', () => {
		const plans = new PlanManager()
		const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest'])
		plans.add(plan)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('add', recorder.handler)

		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))

		expect(recorder.count).toBe(1)
	})
})

describe('PlanManager — accessors', () => {
	it('has reports registered ids and not unregistered ones', () => {
		const plans = new PlanManager()
		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(plans.has(record.id)).toBe(true)
		expect(plans.has('missing')).toBe(false)
		plans.destroy()
	})

	it('plan looks up one registered record by id, undefined otherwise', () => {
		const plans = new PlanManager()
		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(plans.plan(record.id)).toBe(record)
		expect(plans.plan('missing')).toBeUndefined()
	})

	it('plans lists every registered record as a snapshot array', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))

		expect(plans.plans()).not.toBe(plans.plans())
		expect(plans.plans()).toHaveLength(1)
	})

	it('size reflects the number of registered plans', () => {
		const plans = new PlanManager()
		expect(plans.size).toBe(0)

		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core', 'server'] }), ['manifest']))

		expect(plans.size).toBe(2)
		plans.destroy()
	})

	it('constructor seeds from options.plans without emitting add', () => {
		const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest'])
		const recorder = createRecorder<[id: string]>()

		const plans = new PlanManager({ plans: [plan], on: { add: recorder.handler } })

		expect(plans.size).toBe(1)
		expect(recorder.count).toBe(0)
		plans.destroy()
	})
})

describe('PlanManager#remove — array-overload batch semantics', () => {
	it('remove(id) removes one registered plan and returns true', () => {
		const plans = new PlanManager()
		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(plans.remove(record.id)).toBe(true)
		expect(plans.has(record.id)).toBe(false)
	})

	it('remove(id) returns false for an unregistered id', () => {
		const plans = new PlanManager()

		expect(plans.remove('missing')).toBe(false)
	})

	it('remove(ids[]) is all-or-nothing: an unregistered id leaves the collection untouched', () => {
		const plans = new PlanManager()
		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)

		expect(plans.remove([record.id, 'missing'])).toBe(false)
		expect(plans.has(record.id)).toBe(true)
		plans.destroy()
	})

	it('remove(ids[]) removes every listed id and returns true when all present', () => {
		const plans = new PlanManager()
		const a = plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
		const b = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core', 'server'] }), ['manifest']),
		)

		expect(plans.remove([a.id, b.id])).toBe(true)
		expect(plans.size).toBe(0)
	})

	it('remove() removes every registered plan and returns undefined (void)', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core', 'server'] }), ['manifest']))

		const result = plans.remove()

		expect(result).toBeUndefined()
		expect(plans.size).toBe(0)
	})

	it('emits remove once for remove(id)', () => {
		const plans = new PlanManager()
		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove(record.id)

		expect(recorder.count).toBe(1)
		expect(recorder.calls[0]).toEqual([record.id])
	})

	it('emits remove once per id for remove(ids[])', () => {
		const plans = new PlanManager()
		const a = plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
		const b = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core', 'server'] }), ['manifest']),
		)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove([a.id, b.id])

		expect(recorder.count).toBe(2)
	})

	it('does not emit remove when the batch remove fails (missing id)', () => {
		const plans = new PlanManager()
		const record = plans.add(
			blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']),
		)
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove([record.id, 'missing'])

		expect(recorder.count).toBe(0)
	})

	it('emits remove once per registered plan for remove()', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core', 'server'] }), ['manifest']))
		const recorder = createRecorder<[id: string]>()
		plans.emitter.on('remove', recorder.handler)

		plans.remove()

		expect(recorder.count).toBe(2)
	})
})

describe('PlanManager — destroy semantics', () => {
	it('clears the collection and emits destroy exactly once (idempotent)', () => {
		const plans = new PlanManager()
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
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
			plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest'])),
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
		plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] }), ['manifest']))
		plans.destroy()

		expect(plans.size).toBe(0)
	})
})
