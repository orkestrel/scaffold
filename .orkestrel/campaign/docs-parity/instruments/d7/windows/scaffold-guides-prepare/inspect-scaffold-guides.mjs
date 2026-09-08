import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const [workspace] = process.argv.slice(2)

if (workspace === undefined) throw new Error('Expected the worktree path.')

const packagePath = resolve(workspace, 'package.json')
const target = dirname(packagePath)
const requireWorkspace = createRequire(pathToFileURL(packagePath))
const expected = new Map([
	['@orkestrel/contract', '0.0.17'],
	['@orkestrel/html', '0.0.9'],
	['@orkestrel/markdown', '0.0.14'],
	['@orkestrel/guide', '0.0.18'],
	['@orkestrel/test', '0.0.14'],
])
const manifest = await readPackage(packagePath)

for (const [name, version] of expected) {
	const resolved = requireWorkspace.resolve(`${name}/package.json`)
	const installed = await readPackage(resolved)
	const root = join(target, 'node_modules', ...name.split('/'), 'package.json')

	if (resolve(resolved) !== resolve(root)) throw new Error(`${name} did not resolve from the worktree root.`)
	if (installed.name !== name || installed.version !== version) throw new Error(`${name} resolved an unexpected identity.`)
}

assertRange(manifest, '@orkestrel/contract', '^0.0.16', 'dependencies')
assertRange(manifest, '@orkestrel/markdown', '^0.0.13', 'dependencies')
assertRange(manifest, '@orkestrel/guide', '^0.0.17', 'devDependencies')
assertRange(manifest, '@orkestrel/html', '^0.0.8', 'devDependencies')
assertRange(manifest, '@orkestrel/test', '^0.0.13', 'devDependencies')

await assertRoot('@orkestrel/guide', '@orkestrel/contract', target)
await assertRoot('@orkestrel/guide', '@orkestrel/markdown', target)
await assertRoot('@orkestrel/markdown', '@orkestrel/contract', target)
await assertRoot('@orkestrel/markdown', '@orkestrel/html', target)
await assertRoot('@orkestrel/html', '@orkestrel/contract', target)

console.log(JSON.stringify({ declared: manifest, installed: Object.fromEntries(expected) }, undefined, 2))

async function assertRoot(parent, child, target) {
	const parentPath = requireWorkspace.resolve(`${parent}/package.json`)
	const requireParent = createRequire(pathToFileURL(parentPath))
	const resolved = requireParent.resolve(`${child}/package.json`)
	const root = join(target, 'node_modules', ...child.split('/'), 'package.json')

	if (resolve(resolved) !== resolve(root)) throw new Error(`${parent} did not resolve root ${child}.`)
}

function assertRange(manifest, name, value, section) {
	const dependency = manifest[section]

	if (!isRecord(dependency) || dependency[name] !== value) throw new Error(`${name} has an unexpected declared range.`)
}

async function readPackage(path) {
	const text = await readFile(path, 'utf8')
	const value = JSON.parse(text)

	if (!isRecord(value)) throw new Error(`Package JSON must be an object: ${path}`)
	if (typeof value.name !== 'string' || typeof value.version !== 'string') throw new Error(`Package JSON has no identity: ${path}`)

	return value
}

function isRecord(value) {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
