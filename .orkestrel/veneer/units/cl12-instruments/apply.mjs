// CL12: applies the guide corrections. Each replacement asserts its anchor matched once.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const path = resolve(process.cwd(), 'guides/veneer.md')
let text = readFileSync(path, 'utf8')

function separatorFor(anchor) {
	const lines = text.split('\n')
	const index = lines.findIndex((line) => line.includes(anchor))
	if (index === -1) throw new Error(`No line carries ${anchor}`)
	const separator = lines.slice(index).find((line) => /^\|\s*-{3,}/.test(line))
	if (separator === undefined) throw new Error(`No separator after ${anchor}`)
	return separator
		.split('|')
		.slice(1, -1)
		.map((cell) => cell.length - 2)
}

function row(cells, widths) {
	return `| ${cells.map((cell, index) => cell.padEnd(widths[index] ?? cell.length)).join(' | ')} |`
}

function table(rows) {
	const widths = rows[0].map((_, column) => Math.max(...rows.map((cells) => cells[column].length)))
	const [header, ...body] = rows
	return [
		row(header, widths),
		`| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`,
		...body.map((cells) => row(cells, widths)),
	].join('\n')
}

function swap(before, after) {
	const occurrences = text.split(before).length - 1
	if (occurrences !== 1)
		throw new Error(`Anchor matched ${String(occurrences)} times: ${before.slice(0, 60)}`)
	text = text.replace(before, after)
}

// --- Files table: the five partials the table never named -------------------
const fileWidths = separatorFor('| File ')
const componentRows = [
	row(
		[
			'`src/styles/components/_link.scss`',
			'The link color, opacity, offset, and underline classes in the components layer.',
		],
		fileWidths,
	),
	row(
		[
			'`src/styles/components/_container.scss`',
			'The container family, its breakpoint caps, and the navigation combinators in the components layer.',
		],
		fileWidths,
	),
	row(
		[
			'`src/styles/components/_grid.scss`',
			'The row, column, and offset families and their gutters in the components layer.',
		],
		fileWidths,
	),
].join('\n')
swap(
	'| `src/styles/components/_table.scss`',
	`${componentRows}\n| \`src/styles/components/_table.scss\``,
)

const elementRows = [
	row(
		['`src/styles/elements/_html.scss`', 'The document baseline in the elements layer.'],
		fileWidths,
	),
	row(['`src/styles/elements/_body.scss`', 'The body baseline in the elements layer.'], fileWidths),
].join('\n')
swap(
	'| `src/styles/elements/_heading.scss`',
	`${elementRows}\n| \`src/styles/elements/_heading.scss\``,
)

// --- The proof-location sentence the tree falsifies -------------------------
swap(
	'§ Tests names each proof under the\n`tests/src/styles/` directory.',
	'Each partial has one proof of the\nsame name under the `tests/src/styles/` directory, and `tests/src/styles/integration.test.ts`\nreads the customization recipe beside them. § Tests links the cascade-wide proofs, the document\nand body baselines, the class proofs, and the gutter utilities; each remaining tag proof sits\nbeside its element partial.',
)

// --- The proofs § Tests never linked ----------------------------------------
swap(
	'[layer order and direction neutrality](../tests/src/styles/index.test.ts),\n',
	'[layer order and direction neutrality](../tests/src/styles/index.test.ts),\n[the reset layer](../tests/src/styles/reset.test.ts),\n',
)
swap(
	'[the icon link classes](../tests/src/styles/components/icon-link.test.ts),\n',
	'[the button classes](../tests/src/styles/components/button.test.ts),\n[the link classes](../tests/src/styles/components/link.test.ts),\n[the container classes](../tests/src/styles/components/container.test.ts),\n[the grid classes](../tests/src/styles/components/grid.test.ts),\n[the table classes](../tests/src/styles/components/table.test.ts),\n[the icon link classes](../tests/src/styles/components/icon-link.test.ts),\n',
)
swap(
	'[the vertical rule](../tests/src/styles/components/vr.test.ts), and\n',
	'[the vertical rule](../tests/src/styles/components/vr.test.ts),\n[the gutter utilities](../tests/src/styles/utilities/gap.test.ts), and\n',
)

// --- Text and surface: the mark pair ----------------------------------------
const surfaceWidths = separatorFor('| `--vn-text-body-base`, `-rgb`')
swap(
	'| `--vn-surface-body-base`, `-rgb`',
	`${row(['`--vn-text-mark`', '`marktext`', '`marktext`', '`elements` — the mark highlight Elements binds', 'none'], surfaceWidths)}\n| \`--vn-surface-body-base\`, \`-rgb\``,
)
swap(
	'| `--vn-surface-code`',
	`${row(['`--vn-surface-mark`', '`mark`', '`mark`', '`elements` — the mark highlight Elements binds', 'none'], surfaceWidths)}\n| \`--vn-surface-code\``,
)

// --- The promise no shipped rule keeps --------------------------------------
swap(
	'and the `pre`, `samp`, and `var` tags read it. The component surfaces that also consume it land with\ntheir components.',
	'and the `pre`, `samp`, and `var` tags read it. No other rule in the shipped cascade reads it.',
)

// --- The mark pair, and what retunes it -------------------------------------
swap(
	'`--vn-text-muted` is the muted text Elements renders',
	"`--vn-text-mark` and `--vn-surface-mark` are the `marktext` and `mark` system colors a browser\npaints a bare `mark` with, which is what Elements binds its own mark tokens to. They carry one\nvalue in each mode and answer no `--bs-*` variable, so a consumer retunes the mark highlight\nthrough them rather than through `--bs-highlight-bg`.\n\n`--vn-text-muted` is the muted text Elements renders",
)

// --- The container widths and the default gutters ---------------------------
const layout = [
	'The container widths and the default gutters are fixed lengths, and neither scale carries a factor.',
	'Bootstrap writes each container width as a literal inside its own breakpoint rule, so a container',
	'token answers no `--bs-*` variable; the container and row rules declare the gutter aliases over the',
	'gutter tokens.',
	'',
	table([
		['Token', 'Value', 'Source', 'Alias'],
		['`--vn-container-sm`', '`540px`', '`bootstrap` — the official `sm` container cap', 'none'],
		['`--vn-container-md`', '`720px`', '`bootstrap` — the official `md` container cap', 'none'],
		['`--vn-container-lg`', '`960px`', '`bootstrap` — the official `lg` container cap', 'none'],
		['`--vn-container-xl`', '`1140px`', '`bootstrap` — the official `xl` container cap', 'none'],
		['`--vn-container-xxl`', '`1320px`', '`bootstrap` — the official `xxl` container cap', 'none'],
		[
			'`--vn-gutter-x`',
			'`1.5rem`',
			'`bootstrap` — the official container and row gutter',
			'`--bs-gutter-x`',
		],
		['`--vn-gutter-y`', '`0`', '`bootstrap` — the official row gutter', '`--bs-gutter-y`'],
	]),
	'',
	'The container partial reads each width inside the `breakpoint-up` mixin for the name that width',
	'carries, so `--vn-container-sm` caps `.container` and `.container-sm` from the `sm` boundary up,',
	'and each wider name caps its own family from its own boundary. `.container-fluid` reads no cap.',
	'',
	'',
].join('\n')
swap(
	'The gutter and row-gap utilities read a separate scale.',
	`${layout}The gutter and row-gap utilities read a separate scale.`,
)

// --- The two deferral grammars ----------------------------------------------
swap(
	'or the terminal owner `Excluded` for a name no unit will ship and that must remain absent from the cascade.',
	'or the terminal owner `Excluded` for a name no unit will ship and that must remain absent from the cascade.\n`readDeferrals` in `tests/setupConformance.ts` reads the `Name`, `Owner`, and `Reason` columns, and\nthe conformance proof refuses a deferred name it finds in the built cascade. That reader is why this\ntable carries an owner and a reason where the `Name` and `Waiting on` table under § Tokens carries\nneither.',
)
swap(
	'These names are not declared in this release. Each one lands with the first consumer that reads it,\nand each is named here so a consumer does not look for it.',
	"These names are not declared in this release. Each one lands with the first consumer that reads it,\nand each is named here so a consumer does not look for it. No reader parses this table, and these\nare Veneer's own names rather than official ones, so each row records what its name waits on\ninstead of the owner and reason `readDeferrals` requires of the § Styles table.",
)

// --- The mark row the cascade falsifies -------------------------------------
const ledgerWidths = separatorFor('| Component ')
const ledgerLines = text.split('\n')
const markIndex = ledgerLines.findIndex((line) =>
	line.includes('painting from the highlight aliases'),
)
if (markIndex === -1) throw new Error('No mark ledger row')
const markCells = ledgerLines[markIndex]
	.split('|')
	.slice(1, -1)
	.map((cell) => cell.trim())
markCells[2] =
	'The official `.mark` class is present in the built cascade, painting from `--vn-text-mark` and `--vn-surface-mark`.'
ledgerLines[markIndex] = row(markCells, ledgerWidths)
text = ledgerLines.join('\n')

writeFileSync(path, text)
console.log('applied')
