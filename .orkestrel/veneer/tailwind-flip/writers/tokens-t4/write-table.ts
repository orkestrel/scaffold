// Writes the guide's token table from the token record: one row per palette role group, then one
// row per scale row. Usage: node tmp/units/tokens-t4/write-table.ts
// Exit codes: 0 written; 1 a record row the grouping cannot read.
import { readFileSync, writeFileSync } from 'node:fs'

interface Color {
	readonly lifted: string
	readonly token: string
	readonly light: string
	readonly dark: string
	readonly origin: string
}

interface Measure {
	readonly role: string
	readonly literal: string
	readonly value: string
	readonly token?: string
}

interface Record {
	readonly palette: readonly Color[]
	readonly scale: readonly Measure[]
}

const RECORD = 'tests/fixtures/tailwindcss/tokens.json'
const OUTPUT = 'tmp/units/tokens-t4/token-table.md'
const ABSENT = '—'

function readRole(origin: string): string {
	const match = /^(?:base|step)\((?:light:|dark:)?([a-z0-9-]+)\)$/u.exec(origin)
	if (!match?.[1]) throw new Error('Unreadable role origin: ' + origin)
	return '--bs-' + match[1]
}

function formatCode(value: string): string {
	return '`' + value + '`'
}

function main(): void {
	const record: Record = JSON.parse(readFileSync(RECORD, 'utf8'))
	const roles = Map.groupBy(
		record.palette.filter((row) => row.token !== ''),
		(row) => readRole(row.origin),
	)
	const rows = [...roles]
		.toSorted(([first], [second]) => (first < second ? -1 : 1))
		.map(([name, members]) => {
			const ordered = members.toSorted(
				(first, second) =>
					Number(first.origin.includes('(dark:')) - Number(second.origin.includes('(dark:')),
			)
			const light = ordered.find((row) => !row.origin.includes('(dark:'))
			const dark = ordered.find((row) => !row.origin.includes('(light:'))
			return [
				formatCode(name),
				[...new Set(ordered.map((row) => row.token))].map(formatCode).join(', '),
				light === undefined ? ABSENT : formatCode(light.light),
				dark === undefined ? ABSENT : formatCode(dark.dark),
				ordered.map((row) => formatCode(row.origin)).join(', '),
			]
		})
	for (const row of record.scale) {
		if (row.token === undefined) throw new Error('Scale row without a token: ' + row.role)
		rows.push([
			formatCode(row.role),
			formatCode(row.token),
			formatCode(row.value),
			formatCode(row.value),
			formatCode(row.literal),
		])
	}
	const table = [
		'| Bootstrap | Tailwind token | Light | Dark | Origin |',
		'| --- | --- | --- | --- | --- |',
		...rows.map((cells) => '| ' + cells.join(' | ') + ' |'),
	]
	writeFileSync(OUTPUT, table.join('\n') + '\n')
	console.log(JSON.stringify({ roles: roles.size, scale: record.scale.length, rows: rows.length }))
}

main()
