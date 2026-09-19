import { readFileSync } from 'node:fs'

const frozen = readFileSync('tmp/units/anchor-repair-evidence/source.diff', 'utf8')
const preserved = frozen.split(/(?=^diff --git )/m)
	.filter((section) => /^diff --git a\/(src|tests)\//.test(section)).join('')
const actual = readFileSync('tmp/units/anchor-repair-evidence-3/preserved-source.diff', 'utf8')
if (actual !== preserved) throw new Error('Preserved source/test diff changed')
console.log('Source/test diff matches predecessor freeze exactly.')
