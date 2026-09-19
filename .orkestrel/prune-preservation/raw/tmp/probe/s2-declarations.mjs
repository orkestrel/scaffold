import assert from 'node:assert/strict'
import { join } from 'node:path'
import { createGuide, extractFenceImports } from '@orkestrel/guide'
import { createProgram, ModuleKind, ModuleResolutionKind, resolveModuleName, sys } from 'typescript'

const options = { module: ModuleKind.ESNext, moduleResolution: ModuleResolutionKind.Bundler, noLib: true, types: [] }
for (const [specifier, name] of [['@orkestrel/test', 'waitForCondition'], ['@orkestrel/test/browser', 'clickAccessible']]) {
	const resolved = resolveModuleName(specifier, join(process.cwd(), '__skill__.mts'), options, sys).resolvedModule
	assert.ok(resolved)
	const program = createProgram([resolved.resolvedFileName], options)
	const source = program.getSourceFile(resolved.resolvedFileName)
	assert.ok(source?.isDeclarationFile)
	const checker = program.getTypeChecker()
	const symbol = checker.getSymbolAtLocation(source)
	assert.ok(symbol)
	const names = checker.getExportsOfModule(symbol).map((entry) => entry.name)
	assert.ok(names.includes(name))
	assert.ok(!names.includes('s2MissingBinding'))
	console.log(JSON.stringify({ specifier, entry: resolved.resolvedFileName, name, found: true, controlAbsent: true }))
}
assert.equal(resolveModuleName('@orkestrel/test/missing', join(process.cwd(), '__skill__.mts'), options, sys).resolvedModule, undefined)
const document = '> ~~~ts\n> import { /* taught */ clickAccessible } from "@orkestrel/test/browser"\n> ~~~\n'
const fences = createGuide(document).fences()
assert.equal(fences.length, 1)
assert.deepEqual(extractFenceImports(fences[0].code)[0].names, [])
console.log('Nested fence resolves; guide import reader omits a commented named binding. Use the TypeScript parser for imports.')
