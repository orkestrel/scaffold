import { parseSync } from 'vite'

const source = [
	"import { value } from '@orkestrel/test/server'",
	"export * from '@orkestrel/guide'",
	"export { findDrift } from '@orkestrel/guide'",
	'await import(`@orkestrel/test/server`)',
	"const held = () => import('@orkestrel/console')",
	'await import(namedElsewhere)',
	'await import(`@orkestrel/${part}`)',
	"const loaded = require('@orkestrel/process')",
	'void held',
	'void loaded',
].join('\n')

const parsed = parseSync('probe.ts', source)
console.log('errors:', parsed.errors.length)
const program = parsed.program
console.log('program own keys:', Object.keys(program))
console.log('program Object.values length:', Object.values(program).length)
console.log('prototype is Object.prototype:', Object.getPrototypeOf(program) === Object.prototype)
for (const statement of program.body) {
	console.log('---')
	console.log('type:', statement.type, 'start:', statement.start)
	console.log('own keys:', Object.keys(statement))
	console.log('values length:', Object.values(statement).length)
}
console.log('=== first statement JSON ===')
console.log(JSON.stringify(program.body[0]))
console.log('=== dynamic statement JSON ===')
console.log(JSON.stringify(program.body[3]))
console.log('=== template-with-expression JSON ===')
console.log(JSON.stringify(program.body[6]))
console.log('=== require statement JSON ===')
console.log(JSON.stringify(program.body[7]))
