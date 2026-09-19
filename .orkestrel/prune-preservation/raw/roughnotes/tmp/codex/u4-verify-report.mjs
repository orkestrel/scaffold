import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const report = readFileSync('tmp/units/u4-report.md', 'utf8')
const patch = readFileSync('tmp/codex/u4-views.patch', 'utf8')
assert.equal(report.split('```diff\n')[1]?.split('```')[0], patch)
console.log('The report contains the exact checked view patch.')
