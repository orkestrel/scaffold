import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const [path] = process.argv.slice(2)
assert.notEqual(path, undefined, 'journal path is required')
const lines = readFileSync(path, 'utf8').split(/\r\n|\n/).filter((line) => line.trim())
const line = lines.at(-1)
assert.notEqual(line, undefined, 'journal has no event')
const event = JSON.parse(line)
assert.equal(typeof event, 'object', 'journal event must be an object')
assert.notEqual(event, null, 'journal event must be an object')
assert.equal(Array.isArray(event), false, 'journal event must be an object')
assert.equal(event.type, 'result', 'journal must end with a result event')
