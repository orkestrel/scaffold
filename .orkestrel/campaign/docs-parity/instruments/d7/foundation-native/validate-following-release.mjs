import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const [manifestPath, name, version, snapshot, reading] = process.argv.slice(2)
const sections = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
const deferred = new Set(['@orkestrel/guide', '@orkestrel/probe', '@orkestrel/scaffold'])

function record(value, label) {
	assert.equal(typeof value, 'object', `${label} must be an object`)
	assert.notEqual(value, null, `${label} must be an object`)
	assert.equal(Array.isArray(value), false, `${label} must be an object`)
	return value
}

async function read(path) {
	return record(JSON.parse(await readFile(path, 'utf8')), path)
}

function section(manifest, key) {
	return manifest[key] === undefined ? {} : record(manifest[key], key)
}

function names(value) {
	return Object.keys(value).sort()
}

function orkestrel(value) {
	return names(value).filter((dependency) => dependency.startsWith('@orkestrel/'))
}

function latest(value, packageName) {
	const rows = Array.isArray(value) ? value : [value]
	const row = rows.find((item) => record(item, packageName).name === packageName)
	assert.notEqual(row, undefined, `registry row absent for ${packageName}`)
	const tags = record(record(row, packageName)['dist-tags'], packageName)
	assert.equal(typeof tags.latest, 'string', `missing latest for ${packageName}`)
	return tags.latest
}

assert.match(name ?? '', /^[a-z][a-z0-9-]*$/u)
assert.match(version ?? '', /^0\.0\.\d+$/u)
const manifest = await read(manifestPath)
const lock = await read(join(dirname(manifestPath), 'package-lock.json'))
const original = await read(join(snapshot, name, 'package.json'))
const scripts = record(manifest.scripts, 'scripts')
const lockRoot = record(record(lock.packages, 'packages')[''], 'root')
const own = JSON.parse(await readFile(join(reading, `registry-${name}.stdout.txt`), 'utf8'))
const ownExit = await readFile(join(reading, `registry-${name}.exit.txt`), 'utf8')

assert.equal(manifest.name, `@orkestrel/${name}`)
assert.equal(manifest.version, version)
assert.equal(original.version, version)
assert.equal(lock.name, manifest.name)
assert.equal(lock.version, manifest.version)
assert.equal(lockRoot.name, manifest.name)
assert.equal(lockRoot.version, manifest.version)
assert.equal(ownExit.trim(), '0', `registry query failed for ${name}`)
assert.equal(Number(version.slice('0.0.'.length)) > Number(latest(own, manifest.name).slice('0.0.'.length)), true)
assert.equal(scripts.docs, undefined)
assert.equal(scripts['test:guides'], 'node --experimental-strip-types tests/guides.test.ts')
await access(join(dirname(manifestPath), 'scripts', 'docs.ts')).then(
	() => assert.fail('retired docs file remains'),
	(error) => assert.equal(error.code, 'ENOENT')
)
for (const key of sections) assert.deepEqual(lockRoot[key], manifest[key])
for (const key of ['peerDependencies', 'optionalDependencies', 'peerDependenciesMeta']) assert.deepEqual(names(section(manifest, key)), names(section(original, key)))
assert.deepEqual(manifest.peerDependenciesMeta, original.peerDependenciesMeta)
for (const key of sections) {
	const actual = section(manifest, key)
	const declared = section(original, key)
	assert.deepEqual(orkestrel(actual), orkestrel(declared), `orkestrel edge set differs in ${key}`)
	for (const [dependency, originalRange] of Object.entries(declared)) {
		if (!dependency.startsWith('@orkestrel/')) continue
		const bare = dependency.slice('@orkestrel/'.length)
		const data = JSON.parse(await readFile(join(reading, `registry-${bare}.stdout.txt`), 'utf8'))
		const exit = await readFile(join(reading, `registry-${bare}.exit.txt`), 'utf8')
		assert.equal(exit.trim(), '0', `registry query failed for ${dependency}`)
		const range = `^${latest(data, dependency)}`
		if (key === 'devDependencies' && deferred.has(dependency)) {
			assert.equal(actual[dependency], originalRange)
			assert.equal(originalRange, range)
		} else assert.equal(actual[dependency], range)
	}
}
process.stdout.write(JSON.stringify({ name: manifest.name, version: manifest.version }) + '\n')
