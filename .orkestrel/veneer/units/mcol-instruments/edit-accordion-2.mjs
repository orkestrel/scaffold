import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/src/styles/components/accordion.test.ts'
let text = readFileSync(path, 'utf8')
const pairs = [
	[
		`					const from = [
						readStyle(shutting, 'transform', '::after'),
						readStyle(turning, 'transform', '::after'),
					]`,
		`					// Each frame is read as a matrix, because the browser serializes the resting chevron as
					// \`none\` and the same frame on a running turn as the identity matrix.
					const from = [shutting, turning].map((button) =>
						new DOMMatrix(readStyle(button, 'transform', '::after')).toString(),
					)`,
	],
	[
		`						to: [
							readStyle(shutting, 'transform', '::after'),
							readStyle(turning, 'transform', '::after'),
						],`,
		`						to: [shutting, turning].map((button) =>
							new DOMMatrix(readStyle(button, 'transform', '::after')).toString(),
						),`,
	],
	[
		`		const turn = 'matrix(-1, 0, 0, -1, 0, 0)'
		expect(base.from).toEqual([turn, 'none'])`,
		`		const turn = 'matrix(-1, 0, 0, -1, 0, 0)'
		const rest = 'matrix(1, 0, 0, 1, 0, 0)'
		expect(base.from).toEqual([turn, rest])`,
	],
	[
		`				[turn, 'none'],
				['none', turn],`,
		`				[turn, rest],
				[rest, turn],`,
	],
]
for (const [from, to] of pairs) {
	if (!text.includes(from)) throw new Error(`missing: ${from.slice(0, 60)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
