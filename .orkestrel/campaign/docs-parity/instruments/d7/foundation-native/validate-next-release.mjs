import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const [path, packageName, version] = process.argv.slice(2)

function readRecord(value, label) {
	assert.equal(typeof value, 'object', `${label} must be an object`)
	assert.notEqual(value, null, `${label} must be an object`)
	assert.equal(Array.isArray(value), false, `${label} must be an object`)
	return value
}

function readSection(record, name) {
	return readRecord(record[name], name)
}

assert.notEqual(path, undefined, 'Expected package JSON path.')
assert.match(packageName ?? '', /^[a-z][a-z0-9-]*$/u, 'Expected bare package name.')
assert.match(version ?? '', /^0\.0\.\d+$/u, 'Expected pending version.')
const manifest = readRecord(JSON.parse(await readFile(path, 'utf8')), 'package JSON')
const scripts = readSection(manifest, 'scripts')
const dependencies = readSection(manifest, 'dependencies')
const development = readSection(manifest, 'devDependencies')
assert.equal(manifest.name, `@orkestrel/${packageName}`)
assert.equal(manifest.version, version)
assert.equal(scripts.docs, undefined)
assert.equal(scripts['test:guides'], 'node --experimental-strip-types tests/guides.test.ts')
assert.equal(dependencies['@orkestrel/contract'], '^0.0.17')
assert.equal(development['@orkestrel/test'], '^0.0.14')
assert.equal(development['@orkestrel/guide'], '^0.0.17')
assert.equal(development['@orkestrel/scaffold'], '^0.0.63')
assert.equal(development['@orkestrel/probe'], '^0.0.12')
assert.equal(manifest.peerDependencies, undefined)
assert.equal(manifest.optionalDependencies, undefined)
assert.equal(manifest.peerDependenciesMeta, undefined)
process.stdout.write(`${JSON.stringify({ dependencies: { contract: dependencies['@orkestrel/contract'] }, development: { guide: development['@orkestrel/guide'], probe: development['@orkestrel/probe'], scaffold: development['@orkestrel/scaffold'], test: development['@orkestrel/test'] }, name: manifest.name, version: manifest.version })}\n`)
