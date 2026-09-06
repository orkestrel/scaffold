// M7: are parseSync's node spans UTF-16 code-unit offsets or UTF-8 byte offsets? A non-ASCII
// character before the declaration shifts a byte-offset slice and leaves a code-unit slice exact.
import { createRequire } from 'node:module'
const load = createRequire('/home/user/scaffold/package.json')
const vite = await import(load.resolve('vite'))
const source = "// an em dash — and a curly quote ’ before it\nexport const factory = (mode: Mode): UserConfig => value\n"
const program = vite.parseSync('sample.ts', source)
const statement = program.program.body[0]
const declaration = statement.declaration.declarations[0]
const init = declaration.init
const returns = init.returnType.typeAnnotation
const param = init.params[0]
console.log('errors:', program.errors.length)
console.log('statement slice:', JSON.stringify(source.slice(statement.start, statement.end)))
console.log('param slice:', JSON.stringify(source.slice(param.start, param.end)))
console.log('returns slice:', JSON.stringify(source.slice(returns.start, returns.end)))
console.log('utf16 length', source.length, 'utf8 bytes', Buffer.byteLength(source), 'program.end', program.program.end)
const parser = load('vite/package.json')
console.log('vite', parser.version, 'oxc-parser', (() => { try { return load('oxc-parser/package.json').version } catch { return 'not resolvable from scaffold' } })())
