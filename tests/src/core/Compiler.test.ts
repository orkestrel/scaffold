import type { Audit, Question, Scaffolding } from '@src/core'
import { blueprint, Compiler, dependency, isScaffoldError, override } from '@src/core'
import { captureError, createRecorder } from '../../setup.js'
import { describe, expect, it } from 'vitest'

describe('Compiler#compile — pipeline stages and records', () => {
	it('runs the three stages in order for a complete compile', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(blueprint('router', { surfaces: ['core'] }), ['manifest'])

		expect(scaffolding.stages.map((record) => record.stage)).toEqual(['draft', 'gate', 'pin'])
		expect(scaffolding.stages.every((record) => !record.failed)).toBe(true)
		expect(scaffolding.complete).toBe(true)
		expect(scaffolding.plan).toBeDefined()
		expect(scaffolding.digest.length).toBeGreaterThan(0)
		compiler.destroy()
	})

	it('carries the blueprint as the draft stage input and the drafted plan as its output', () => {
		const compiler = new Compiler()
		const spec = blueprint('router', { surfaces: ['core'] })

		const scaffolding = compiler.compile(spec, ['manifest'])

		expect(scaffolding.stages[0]?.input).toBe(spec)
		expect(scaffolding.stages[0]?.failed).toBe(false)
		compiler.destroy()
	})

	it('scopes the plan to the requested groups', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(blueprint('router', { surfaces: ['core'] }), ['source'])

		expect(scaffolding.plan?.groups).toEqual(['source'])
		expect(scaffolding.plan?.artifacts.every((artifact) => artifact.group === 'source')).toBe(true)
		compiler.destroy()
	})

	it('selects the full plan when groups is omitted', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(blueprint('router', { surfaces: ['core'] }))

		const groups = new Set(scaffolding.plan?.artifacts.map((artifact) => artifact.group))
		expect(groups.size).toBeGreaterThan(1)
		compiler.destroy()
	})
})

describe('Compiler#compile — fail-closed gate paths', () => {
	it('blocks on an off-NAME_PATTERN name (bad name)', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile({ ...blueprint('router'), name: 'Router!' }, ['manifest'])

		expect(scaffolding.complete).toBe(false)
		expect(scaffolding.plan).toBeUndefined()
		expect(scaffolding.questions.some((question) => question.field === 'name')).toBe(true)
		expect(scaffolding.failures.some((failure) => failure.code === 'BLOCKED')).toBe(true)
		compiler.destroy()
	})

	it('blocks on an override matching no planned artifact (unmatched override)', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(
			blueprint('router', {
				surfaces: ['core'],
				overrides: [override('nowhere/does-not-exist.ts', 'x')],
			}),
			['manifest'],
		)

		expect(scaffolding.complete).toBe(false)
		expect(scaffolding.plan).toBeUndefined()
		expect(
			scaffolding.questions.some((question) =>
				question.text.includes('matches no planned artifact'),
			),
		).toBe(true)
		compiler.destroy()
	})

	it('blocks on an override targeting a host-origin artifact (host-target override)', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(
			blueprint('router', { surfaces: ['core'], overrides: [override('AGENTS.md', 'x')] }),
			['docs'],
		)

		expect(scaffolding.complete).toBe(false)
		expect(scaffolding.plan).toBeUndefined()
		expect(
			scaffolding.questions.some((question) => question.text.includes('host-origin artifact')),
		).toBe(true)
		compiler.destroy()
	})
})

describe('Compiler#compile — non-vendored dependency', () => {
	it('surfaces a non-blocking Question and a host-origin pointer artifact, and still completes', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(
			blueprint('router', {
				surfaces: ['core'],
				dependencies: [dependency('@orkestrel/some-outside-thing', '^1.0.0')],
			}),
			['manifest', 'guides'],
		)

		expect(scaffolding.complete).toBe(true)
		const question = scaffolding.questions.find((entry) => entry.field === 'dependencies')
		expect(question?.blocking).toBe(false)
		const pointer = scaffolding.plan?.artifacts.find(
			(artifact) => artifact.path === 'guides/src/some-outside-thing.md',
		)
		expect(pointer?.origin).toBe('host')
		compiler.destroy()
	})

	it('does NOT surface a question for a vendored dependency', () => {
		const compiler = new Compiler()

		const scaffolding = compiler.compile(
			blueprint('router', {
				surfaces: ['core'],
				dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
			}),
			['manifest'],
		)

		expect(scaffolding.questions).toEqual([])
		compiler.destroy()
	})
})

describe('Compiler#compile — event sequences', () => {
	it('emits compile (not block) for a complete compilation', () => {
		const compiler = new Compiler()
		const compileRecorder = createRecorder<[scaffolding: Scaffolding]>()
		const blockRecorder = createRecorder<[questions: readonly Question[]]>()
		compiler.emitter.on('compile', compileRecorder.handler)
		compiler.emitter.on('block', blockRecorder.handler)

		compiler.compile(blueprint('router', { surfaces: ['core'] }), ['manifest'])

		expect(compileRecorder.count).toBe(1)
		expect(blockRecorder.count).toBe(0)
		compiler.destroy()
	})

	it('emits block (not compile) for a gated compilation', () => {
		const compiler = new Compiler()
		const compileRecorder = createRecorder<[scaffolding: Scaffolding]>()
		const blockRecorder = createRecorder<[questions: readonly Question[]]>()
		compiler.emitter.on('compile', compileRecorder.handler)
		compiler.emitter.on('block', blockRecorder.handler)

		compiler.compile({ ...blueprint('router'), name: 'Bad Name!' }, ['manifest'])

		expect(compileRecorder.count).toBe(0)
		expect(blockRecorder.count).toBe(1)
		compiler.destroy()
	})
})

describe('Compiler#audit', () => {
	it('emits block then audit for a gated blueprint — never compile', () => {
		const compiler = new Compiler()
		const compileRecorder = createRecorder<[scaffolding: Scaffolding]>()
		const blockRecorder = createRecorder<[questions: readonly Question[]]>()
		const auditRecorder = createRecorder<[audit: Audit]>()
		compiler.emitter.on('compile', compileRecorder.handler)
		compiler.emitter.on('block', blockRecorder.handler)
		compiler.emitter.on('audit', auditRecorder.handler)

		const result = compiler.audit({ ...blueprint('router'), name: 'Bad Name!' }, {})

		expect(result.complete).toBe(false)
		expect(result.findings).toEqual([])
		expect(compileRecorder.count).toBe(0)
		expect(blockRecorder.count).toBe(1)
		expect(auditRecorder.count).toBe(1)
		compiler.destroy()
	})

	it('emits only audit (no block) for a complete blueprint against an empty target', () => {
		const compiler = new Compiler()
		const blockRecorder = createRecorder<[questions: readonly Question[]]>()
		const auditRecorder = createRecorder<[audit: Audit]>()
		compiler.emitter.on('block', blockRecorder.handler)
		compiler.emitter.on('audit', auditRecorder.handler)

		const result = compiler.audit(blueprint('router', { surfaces: ['core'] }), {}, ['manifest'])

		expect(result.complete).toBe(true)
		expect(result.missing).toBe(1)
		expect(blockRecorder.count).toBe(0)
		expect(auditRecorder.count).toBe(1)
		compiler.destroy()
	})

	it('reports clean when the target already matches the compiled plan', () => {
		const compiler = new Compiler()
		const spec = blueprint('router', { surfaces: ['core'] })
		const scaffolding = compiler.compile(spec, ['manifest'])
		const current: Record<string, string> = {}
		for (const artifact of scaffolding.plan?.artifacts ?? []) {
			if (artifact.content !== undefined) current[artifact.path] = artifact.content
		}

		const result = compiler.audit(spec, current, ['manifest'])

		expect(result.clean).toBe(true)
		compiler.destroy()
	})
})

describe('Compiler — destroy semantics', () => {
	it('emits destroy exactly once even when called twice (idempotent)', () => {
		const compiler = new Compiler()
		const recorder = createRecorder<[]>()
		compiler.emitter.on('destroy', recorder.handler)

		compiler.destroy()
		compiler.destroy()

		expect(recorder.count).toBe(1)
	})

	it('throws ScaffoldError coded DESTROYED from compile after destroy', () => {
		const compiler = new Compiler()
		compiler.destroy()

		const error = captureError(() => compiler.compile(blueprint('router', { surfaces: ['core'] })))

		expect(isScaffoldError(error) && error.code === 'DESTROYED').toBe(true)
	})

	it('throws ScaffoldError coded DESTROYED from audit after destroy', () => {
		const compiler = new Compiler()
		compiler.destroy()

		const error = captureError(() =>
			compiler.audit(blueprint('router', { surfaces: ['core'] }), {}),
		)

		expect(isScaffoldError(error) && error.code === 'DESTROYED').toBe(true)
	})

	it('the emitter getter keeps working after destroy', () => {
		const compiler = new Compiler()
		compiler.destroy()

		expect(compiler.emitter).toBeDefined()
	})
})
