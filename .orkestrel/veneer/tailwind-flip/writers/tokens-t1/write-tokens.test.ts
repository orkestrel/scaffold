import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { expect, it } from 'vitest'
import { isRecord, arrayOf, isString } from '@orkestrel/contract'
import { requireValue } from '@orkestrel/test'
import { parse } from 'postcss'
import { convertTokenColor, readPaletteRecord, resolveTokenPalette, readTokenRecord } from '../../../tests/setup.js'
import { TokenWriter } from './TokenWriter.js'

it('writes the token records from the installed theme and recorded Chromium palette', () => {
	const path = 'tests/fixtures/tailwindcss/palette.json'
	const theme = new Map<string, string>()
	parse(readFileSync('node_modules/tailwindcss/theme.css', 'utf8')).walkDecls((declaration) => { theme.set(declaration.prop, declaration.value) })
	let input: unknown
	if (existsSync(path)) input = JSON.parse(readFileSync(path, 'utf8'))
	else {
		const evidence: unknown = JSON.parse(readFileSync('tmp/probes/tokens2/out/m9.json', 'utf8'))
		if (!isRecord(evidence) || !arrayOf(isRecord)(evidence.rows)) throw new Error('Invalid M9 record')
		input = { chromium: 141, rows: evidence.rows.map((row) => {
			if (!isString(row.name) || !isString(row.source) || !isString(row.hex)) throw new Error('Invalid M9 row')
			return { name: row.name, raw: row.source, hex: row.hex, ...(convertTokenColor(row.source) !== row.hex ? { rounding: 'chromium' } : {}) }
		}) }
	}
	const palette = readPaletteRecord(input)
	const colors = resolveTokenPalette(palette, theme)
	expect(colors.size).toBe(288)
	expect(palette.chromium).toBe(141)
	const tokens = readTokenRecord(new TokenWriter(palette, theme).execute())
	expect(tokens.palette).toHaveLength(126)
	expect(tokens.amounts).toHaveLength(105)
	for (const [target, record] of [[path, palette], ['tests/fixtures/tailwindcss/tokens.json', tokens]] as const) {
		const text = JSON.stringify(record, null, '\t') + '\n'
		if (!existsSync(target) || readFileSync(target, 'utf8') !== text) writeFileSync(target, text)
		expect(readFileSync(target, 'utf8')).toBe(text)
	}
	console.log(JSON.stringify({ palette: palette.rows.length, rounding: palette.rows.filter((row) => row.rounding).map((row) => row.name), colors: tokens.palette.length, scale: tokens.scale.length, kept: tokens.kept.length, amounts: tokens.amounts.length, context: requireValue(tokens.palette.find((row) => row.context)) }))
})
