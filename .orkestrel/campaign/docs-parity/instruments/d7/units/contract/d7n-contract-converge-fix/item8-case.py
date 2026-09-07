from pathlib import Path

path = Path('tests/guides.test.ts')
text = path.read_text(encoding='utf8')

anchor = """	it('answers from a contract whose members disagree about one undeclared key', () => {"""

case = """	it('parses and explains the user contract the titled fence builds', () => {
		// The titled `Compiling a contract` fence, executed. Its parse line claims the
		// refinement is enforced on the parse side as well as the guard side, and its
		// explain line claims the exact fault a violation produces, so each runs here
		// rather than being read as text.
		const user = createContract(
			objectShape({ name: stringShape({ min: 1 }), age: integerShape() }),
		)

		expect(user.is({ name: 'Ada', age: 36 })).toBe(true)
		expect(user.parse({ name: 'Ada', age: '36' })).toEqual({ name: 'Ada', age: 36 })
		expect(user.parse({ name: '', age: 36 })).toBeUndefined()
		expect(user.explain({ name: '', age: 36 })).toEqual([
			{
				reason: 'constraint',
				path: ['name'],
				expected: 'string',
				constraint: 'min',
				limit: 1,
				received: '""',
			},
		])
	})

	it('carries the user fence lines the transcription copies', () => {
		expect(guideText).toContain(
			'const user = createContract(objectShape({ name: stringShape({ min: 1 }), age: integerShape() }))',
		)
		expect(guideText).toContain(
			"user.is({ name: 'Ada', age: 36 }) // true — a typed guard (narrows to Infer<typeof shape>)",
		)
		expect(guideText).toContain(
			"user.parse({ name: 'Ada', age: '36' }) // { name: 'Ada', age: 36 } — coerces, or undefined",
		)
		expect(guideText).toContain(
			"user.parse({ name: '', age: 36 }) // undefined — '' violates name min:1 (parse enforces refinements, like is)",
		)
		expect(guideText).toContain(
			`user.explain({ name: '', age: 36 }) // [{ reason: 'constraint', path: ['name'], expected: 'string', constraint: 'min', limit: 1, received: '""' }]`,
		)
	})

"""

assert text.count(anchor) == 1, 'anchor not unique'
text = text.replace(anchor, case + anchor)

old_import = """import {
	ContractCompiler,
	ContractError,
	JSONCloner,
	SchemaCloner,
	ShapeCloner,
	ShapeValidator,
	createContract,
	objectShape,
	stringShape,
} from '@src/core'"""
new_import = """import {
	ContractCompiler,
	ContractError,
	JSONCloner,
	SchemaCloner,
	ShapeCloner,
	ShapeValidator,
	createContract,
	integerShape,
	objectShape,
	stringShape,
} from '@src/core'"""
assert text.count(old_import) == 1, 'import block not unique'
text = text.replace(old_import, new_import)

path.write_text(text, encoding='utf8')
print('ok')
