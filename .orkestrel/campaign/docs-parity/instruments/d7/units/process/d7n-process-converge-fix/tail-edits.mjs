import { readFileSync, writeFileSync } from 'node:fs'

const file = 'tests/guides.test.ts'
let text = readFileSync(file, 'utf8')
const swap = (from, to) => {
	if (text.split(from).length - 1 !== 1) throw new Error(`anchor: ${JSON.stringify(from.slice(0, 60))}`)
	text = text.replace(from, to)
}

// The `Value` column is gone, so the prose/literal split it named goes with it.
swap(
	`/**
 * Constants whose \`Value\` cell is prose rather than a literal, as \`API\` cell names.
 *
 * \`PROCESS_ERROR_CODES\` prints as \`the code tuple\`, so no cell text compares against the tuple; the
 * codes themselves are gated by \`tables exactly the error codes the tuple declares\`. Naming one
 * here is what makes the omission deliberate, and the assertion over this list fails when such a
 * cell becomes a literal, so the list cannot rot.
 */
const PROSE_CONSTANTS: readonly string[] = Object.freeze(['PROCESS_ERROR_CODES'])

`,
	'',
)

swap(
	`	// The Value column read off the guide itself, so editing a cell fails this row. Comparing the
	// imported constants against literals written here would leave that column guarded by nothing,
	// under a name that claims to guard exactly it. A cell drops its digit separators and its
	// quotes before the comparison, which is the whole difference between the guide's notation and
	// the source literal.
	it('documents the constant values its Surface table prints', () => {
		const guide = requireValue(files['guides/process.md'], 'Missing file: guides/process.md')
		const section = guide.slice(guide.indexOf('### Constants'))
		const table = section.slice(0, section.indexOf('\\n\\n', section.indexOf('| API')))
		const rows = Array.from(
			table.matchAll(/^\\| \`(\\w+)\` +\\| const +\\| ([^|]+?) +\\|/gmu),
			(match) => ({ name: match[1] ?? '', cell: match[2] ?? '' }),
		)

		const prose = rows.filter((row) => PROSE_CONSTANTS.includes(row.name))
		const printed = rows.filter((row) => !PROSE_CONSTANTS.includes(row.name))

		expect(rows.map((row) => row.name).sort()).toEqual(Object.keys(CONSTANTS).sort())
		expect(prose.map((row) => row.name)).toEqual([...PROSE_CONSTANTS])
		expect(prose.filter((row) => row.cell.startsWith('\`')).map((row) => row.name)).toEqual([])
		expect(printed.map((row) => \`\${row.name} \${row.cell.replace(/[\`_']/gu, '')}\`)).toEqual(
			printed.map(
				(row) =>
					\`\${row.name} \${String(requireValue(CONSTANTS[row.name], \`Undeclared constant row: \${row.name}\`))}\`,
			),
		)
	})`,
	`	// Ruling 18 puts a constant's literal in its declaration's description paragraph, which the
	// equality gate carries into the \`Summary\` cell, so the literal is read from that cell rather
	// than from a column of its own. The row set is compared against the imported table too, so a
	// constant that gained no row and a row naming no constant each fail here.
	it('names every constant literal in the Summary its Constants table prints', () => {
		const guide = requireValue(files['guides/process.md'], 'Missing file: guides/process.md')
		const section = guide.slice(guide.indexOf('### Constants'))
		const table = section.slice(0, section.indexOf('\\n\\n', section.indexOf('| API')))
		const rows = Array.from(
			table.matchAll(/^\\| \`(\\w+)\` +\\| const +\\| [^|]+ \\| (.+?) +\\|$/gmu),
			(match) => ({ name: match[1] ?? '', summary: match[2] ?? '' }),
		)
		const unnamed: string[] = []
		for (const row of rows) {
			const value = requireValue(CONSTANTS[row.name], \`Undeclared constant row: \${row.name}\`)
			const literals = typeof value === 'object' ? [...value] : [String(value)]
			for (const literal of literals) {
				if (!row.summary.includes(literal)) unnamed.push(\`\${row.name} \${literal}\`)
			}
		}

		expect(rows.map((row) => row.name).sort()).toEqual(Object.keys(CONSTANTS).sort())
		expect(unnamed).toEqual([])
	})`,
)

swap(
	'// its comment claims unasserted. Each row below runs one such block against the real barrel and',
	'// its comment claims unasserted. Each row that follows runs one such block against the real barrel',
)
swap(
	'// asserts that value, so a changed return value fails this gate. Change an `@example`, change its row.',
	'// and asserts that value, so a changed return value fails this gate. Change an `@example`, change\n// its row.',
)

const pointer = `	// The case outlives the condition budget below it, so a condition that never holds reports its
	// own description rather than this case's timeout.`
const corrected = `	// The case outlives the condition budget that follows, so a condition that never holds reports
	// its own description rather than this case's timeout.`
if (text.split(pointer).length - 1 !== 2) throw new Error('pointer comment count')
text = text.split(pointer).join(corrected)

writeFileSync(file, text)
console.log('tail rewritten')
