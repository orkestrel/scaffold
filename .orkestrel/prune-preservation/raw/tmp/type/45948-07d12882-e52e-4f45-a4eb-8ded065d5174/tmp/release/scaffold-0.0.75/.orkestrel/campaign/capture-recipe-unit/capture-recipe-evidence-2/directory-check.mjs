import assert from 'node:assert/strict'
import { join, normalize } from 'node:path'
import { resolveScreenshotPath } from '@vitest/browser'

const root = process.cwd()
const test = join(root, 'tests', 'app', 'browser', 'integration.test.ts')
const filename = 'home--light-390.png'
const expected = join(root, 'tmp', 'capture', 'states', filename)
const corrected = resolveScreenshotPath(
	test,
	filename,
	undefined,
	`../../../tmp/capture/states/${filename}`,
)
const control = resolveScreenshotPath(
	test,
	filename,
	undefined,
	`tmp/capture/states/${filename}`,
)

assert.equal(normalize(corrected), normalize(expected))
assert.throws(() => assert.equal(normalize(control), normalize(expected)))
assert.equal(
	normalize(control),
	normalize(join(root, 'tests', 'app', 'browser', 'tmp', 'capture', 'states', filename)),
)
console.log(JSON.stringify({ test, expected, corrected, control }))
