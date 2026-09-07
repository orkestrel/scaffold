import { parseSync } from 'vite'

const cases = {
	script: 'const Internal = true\n',
	emptyModule: 'export {}\n',
	starAll: "export * from './middle.js'\n",
	starNs: "export * as ns from './middle.js'\n",
	typeStar: "export type * from './middle.js'\n",
	named: "export { build } from './shapes.js'\nexport const LIMIT = 5\n",
	typeNamed: "export type { Shape } from './shapes.js'\nexport { type Label } from './shapes.js'\n",
	defaultFrom: "export { default } from './definition.js'\n",
	defaultDecl: 'const engine = 1\nexport default engine\n',
	defaultClass: 'export default class Bad {}\n',
	decls:
		'export class Engine {}\nexport function build(): number { return 1 }\nexport const LIMIT = 5\nexport interface Shape { readonly id: string }\nexport type Label = string\nexport let counter = 0\n',
	enumNs: 'export enum Bad { Value }\nexport namespace Ns { export const value = 1 }\n',
	localThenExport: 'const a = 1\nfunction b(): void {}\nexport { a, b }\n',
	multiConst: 'export const A = 1, B = 2\n',
	syntaxFault: 'export const = true\n',
	declare: 'export declare const D: number\n',
}

for (const [label, source] of Object.entries(cases)) {
	const parsed = parseSync(`${label}.ts`, source)
	const errors = parsed.errors.map((e) => e.message)
	console.log(`\n### ${label} sourceType=${parsed.program.sourceType} errors=${JSON.stringify(errors)}`)
	for (const statement of parsed.program.body) {
		const detail = {
			type: statement.type,
			exportKind: statement.exportKind,
			declaration: statement.declaration?.type,
			declKind: statement.declaration?.kind,
			source: statement.source?.value,
			exported: statement.exported?.name ?? statement.exported?.value,
			specifiers: statement.specifiers?.map((s) => ({
				local: s.local?.name ?? s.local?.value,
				exported: s.exported?.name ?? s.exported?.value,
				kind: s.exportKind,
			})),
		}
		console.log('  ', JSON.stringify(detail))
	}
}
