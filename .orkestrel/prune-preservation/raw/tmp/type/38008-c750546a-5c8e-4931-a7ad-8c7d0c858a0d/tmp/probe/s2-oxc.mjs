import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parseSync } from 'vite'

for (const entry of ['core', 'browser']) {
	const path = `node_modules/@orkestrel/test/dist/src/${entry}/index.d.ts`
	const parsed = parseSync(path, readFileSync(path, 'utf8'))
	assert.deepEqual(parsed.errors, [])
	console.log(path, [...new Set(parsed.program.body.map(statement => statement.type === 'ExportNamedDeclaration' ? statement.declaration?.type ?? 'export list' : statement.type))])
}
const source = parseSync('fixture.d.ts', 'export declare function read(): void; export declare const VALUE: string; export declare class Entity {} export declare enum Phase { Ready } export interface Options {} export type Name = string; export * from "./values.js"; export type * from "./types.js"; export { read as alias, type Name as Alias } from "./values.js";')
assert.deepEqual(source.errors, [])
console.log(JSON.stringify(source.program.body, null, 2))
const imports = parseSync('skill.ts', 'import { /* comment */ missing as local, type Options } from "@orkestrel/test"').program.body[0]
assert.equal(imports.specifiers[0].imported.name, 'missing')
assert.notEqual(imports.specifiers[0].imported.name, 'local')
console.log('Commented binding:', imports.specifiers[0].imported.name)
