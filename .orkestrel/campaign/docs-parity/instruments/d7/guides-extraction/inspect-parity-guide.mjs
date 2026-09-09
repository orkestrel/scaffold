import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { resolve } from 'node:path'

const [input] = process.argv.slice(2)

assert(input !== undefined, 'Expected a package.json path.')

const path = resolve(input)
const manifest = await readManifest(path)

assert.equal(manifest.name, '@orkestrel/guide', 'Unexpected package name.')
assert.equal(manifest.version, '0.0.18', 'Unexpected package version.')
assert.equal(readRange(manifest, '@orkestrel/contract'), '^0.0.17', 'Unexpected Contract range.')
assert.equal(readRange(manifest, '@orkestrel/markdown'), '^0.0.14', 'Unexpected Markdown range.')

console.log(
  JSON.stringify({
    name: manifest.name,
    version: manifest.version,
    dependencies: {
      '@orkestrel/contract': readRange(manifest, '@orkestrel/contract'),
      '@orkestrel/markdown': readRange(manifest, '@orkestrel/markdown'),
    },
  }),
)

async function readManifest(path) {
  const text = await readFile(path, 'utf8')
  const manifest = JSON.parse(text)
  assert(isRecord(manifest), `Package JSON must be an object: ${path}`)
  return manifest
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readRange(manifest, name) {
  assert(isRecord(manifest.dependencies), 'Package JSON must have dependencies.')
  const range = manifest.dependencies[name]
  assert.equal(typeof range, 'string', `Package JSON must declare ${name}.`)
  return range
}
