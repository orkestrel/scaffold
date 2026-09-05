// How a transpiled fence runs without the 6.x CommonJS transpile: transform mode emits ESM, so the
// lifted helper module is imported from a data URL; the CommonJS shape runs under vm only for a
// fence that exports nothing.
import { stripTypeScriptTypes } from 'node:module'
import vm from 'node:vm'
const source = "export function greet(name: string): string { return `hello ${name}` }\nexport const COUNT: number = greet('x').length\n"
const esm = stripTypeScriptTypes(source, { mode: 'transform' })
const url = `data:text/javascript;base64,${Buffer.from(esm).toString('base64')}`
const loaded = await import(url)
console.log(`data-url import: greet('fence') = ${loaded.greet('fence')}, COUNT = ${loaded.COUNT}`)
const plain = stripTypeScriptTypes("const value: number = 2\nresult = value * 21\n", { mode: 'transform' })
const context = { result: 0 }
vm.runInNewContext(plain, context)
console.log(`vm script (no exports): result = ${context.result}`)
try { vm.compileFunction(esm, [], {}) } catch (error) { console.log(`vm.compileFunction over ESM output refuses: ${error.message.split('\n')[0]}`) }
