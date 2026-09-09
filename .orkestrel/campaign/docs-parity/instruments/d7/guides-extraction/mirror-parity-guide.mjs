import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { contentToHex } from '../../dist/src/core/index.js'
import { Materializer, readFileHex } from '../../dist/src/server/index.js'

const [upstreamInput, targetInput] = process.argv.slice(2)

assert(upstreamInput !== undefined, 'Expected the canonical Guide file path.')
assert(targetInput !== undefined, 'Expected the scaffold target path.')

const upstream = resolve(upstreamInput)
const target = resolve(targetInput)
const path = 'guides/guide.md'
const destination = join(target, 'guides', 'guide.md')
const upstreamStats = await stat(upstream)
const targetStats = await stat(target)

assert(upstreamStats.isFile(), `Guide source is not a file: ${upstream}`)
assert(targetStats.isDirectory(), `Scaffold target is not a directory: ${target}`)

const content = await readFile(upstream, 'utf8')
const observed = readFileHex(target, path)
const mirror =
  observed === undefined
    ? { name: '@orkestrel/guide', path, lookup: 'found', content }
    : { name: '@orkestrel/guide', path, lookup: 'found', content, observed }
const materializer = new Materializer()

try {
  const result = materializer.mirror([mirror], target)
  assert.equal(readFileHex(target, path), contentToHex(content), 'Guide mirror bytes differ from the canonical Guide file.')
  console.log(JSON.stringify({ result, paths: { upstream, target, destination } }))
} finally {
  materializer.destroy()
}
