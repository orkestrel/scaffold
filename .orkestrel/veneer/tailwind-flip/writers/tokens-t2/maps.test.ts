import { readFileSync, writeFileSync } from 'node:fs'
import { expect, it } from 'vitest'
import { readTokenRecord } from '../../../tests/setup.js'

it('writes the palette and scale maps from the guarded token record', () => {
	const record = readTokenRecord(JSON.parse(readFileSync('tests/fixtures/tailwindcss/tokens.json', 'utf8')))
	const path = 'src/tailwindcss/_tokens.scss'
	const before = readFileSync(path, 'utf8')
	const palette = record.palette.map(row => `\t'${row.lifted}${row.context ? '@' + row.context : ''}': '${row.light}',`).join('\n')
	const scale = record.scale.map(row => `\t'${row.role}': ${JSON.stringify(row.value)},`).join('\n')
	const after = before.replace(/^\$palette: \([\s\S]*?\);\n\$scale: \([\s\S]*?\);/u, `$palette: (\n${palette}\n);\n$scale: (\n${scale}\n);`)
	expect(after).toContain("'#dee2e6@dark': '#e5e7eb'")
	expect(record.palette).toHaveLength(126)
	expect(record.scale).toHaveLength(26)
	writeFileSync(path, after)
	expect(readFileSync(path, 'utf8')).toBe(after)
})
