// Probe: reads the Oxc AST shapes and error text the S2-4 fix branches on.
import { parseSync } from 'vite'
import { describe, expect, it } from 'vitest'

function describeProgram(label: string, code: string): void {
	const source = parseSync('probe.d.ts', code)
	console.log(
		label,
		JSON.stringify({
			errors: source.errors.map((error) => error.message),
			body: source.program.body.map((statement) => ({
				type: statement.type,
				declaration:
					'declaration' in statement && statement.declaration !== null
						? statement.declaration.type
						: undefined,
			})),
		}),
	)
}

describe('S2-4 shapes', () => {
	it('prints the fence parse error text', () => {
		const source = parseSync(
			'skill.ts',
			"import { s2MissingValue } from '@orkestrel/test'\nconst value =\n",
		)
		console.log('fence errors:', JSON.stringify(source.errors))
		expect(source.errors.length).toBeGreaterThan(0)
	})

	it('prints declaration statement shapes', () => {
		describeProgram('namespace:', 'export declare namespace Vocabulary { }')
		describeProgram(
			'default alias:',
			'export declare const value: string\nexport { value as default }',
		)
		describeProgram('ambient module:', 'declare module "foreign" { export const value: string }')
		describeProgram('function body:', 'export function read(): void {}')
		describeProgram('export star as:', 'export * as vocabulary from "./values.js"')
		describeProgram('export equals:', 'declare const value: string\nexport = value')
		describeProgram('namespace export:', 'export as namespace Vocabulary')
		describeProgram('syntax error:', 'export const =')
		expect(true).toBe(true)
	})
})
