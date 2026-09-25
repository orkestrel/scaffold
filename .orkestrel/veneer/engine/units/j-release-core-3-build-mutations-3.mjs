// Builds mutations-3.json from mutations-2.json. Every round-2 row is carried byte for byte, except
// the rows whose find named the abort listener round 3 removes: each of those is replaced in place by
// a successor row that makes the same change to round 3's text. Round 3's rows follow. Run from the
// worktree root: node tmp/j-release-core/build-mutations-3.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const LIFETIME = 'src/browser/Lifetime.ts'
const BUTTON = 'src/browser/Button.ts'
const LIFETIME_TEST = 'tests/src/browser/Lifetime.test.ts'
const BUTTON_TEST = 'tests/src/browser/Button.test.ts'
const ENDING = '\t\t\tlifetime.hold({ owner, resource }, (held) => held.owner.#end(held.resource))\n'
const COMMENT = [
	"\t\t\t// The resource's own lifetime ends the owner's holding in its drain, so an owner that builds\n",
	'\t\t\t// and ends a child on every change keeps a bounded ledger, and a release error propagates\n',
	'\t\t\t// through the drain. Held first, the ending runs last, after every other holding is given\n',
	'\t\t\t// back, so an owner destruction nested before it still reaches the resource. A lifetime that\n',
	'\t\t\t// has ended runs the ending at once, and the owner keeps nothing.\n',
].join('')

const successors = new Map([
	[
		'join-no-child-release',
		{
			id: 'join-ending-omitted',
			line: "Lifetime.join without the ending its resource's own lifetime holds (successor of join-no-child-release)",
			edits: [{ file: LIFETIME, find: ENDING, replace: '' }],
			tests: [LIFETIME_TEST, BUTTON_TEST],
		},
	],
	[
		'join-ledger',
		{
			id: 'join-ledger-3',
			line: 'Lifetime.join holds the resource in the owning lifetime (successor of join-ledger)',
			edits: [
				{
					file: LIFETIME,
					find: `\t\tif (owner !== undefined) {\n\t\t\tif (!owner.hold(resource, (held) => held.destroy())) return\n${COMMENT}${ENDING}\t\t} else if (signal.aborted) resource.destroy()`,
					replace:
						'\t\tif (owner !== undefined && signal.aborted) resource.destroy()\n\t\telse if (signal.aborted) resource.destroy()',
				},
			],
			tests: [LIFETIME_TEST],
		},
	],
])

const additions = [
	{
		id: 'base-03526bc',
		line: 'Lifetime.ts at 03526bc, the abort listener, under round 3 tests',
		base: { commit: '03526bc', files: [LIFETIME] },
		tests: [LIFETIME_TEST, BUTTON_TEST],
	},
	{
		id: 'ending-newest',
		line: "Button holds the ending newest: it joins after it holds its snapshot, so its lifetime's drain runs the ending first",
		edits: [
			{
				file: BUTTON,
				find: '\t\t\tLifetime.join(signal, this, this.#lifetime)\n\t\t\tthis.#lifetime.hold(this.#snapshot, (snapshot) => snapshot.restore())\n',
				replace:
					'\t\t\tthis.#lifetime.hold(this.#snapshot, (snapshot) => snapshot.restore())\n\t\t\tLifetime.join(signal, this, this.#lifetime)\n',
			},
		],
		tests: [BUTTON_TEST],
	},
	{
		id: 'ending-at-abort',
		line: "Lifetime.join runs the ending at the abort of the resource's lifetime, before every holding, as a newest holding would",
		edits: [
			{
				file: LIFETIME,
				find: ENDING,
				replace:
					"\t\t\tlifetime.signal.addEventListener('abort', () => owner.#end(resource), { once: true })\n",
			},
		],
		tests: [LIFETIME_TEST, BUTTON_TEST],
	},
	{
		id: 'ending-releases',
		line: "Lifetime's ending runs the holding's release",
		edits: [
			{
				file: LIFETIME,
				find: '\t\tthis.#holdings = this.#holdings.filter((holding) => holding.record !== record)\n',
				replace: '\t\tthis.release(record)\n',
			},
		],
		tests: [LIFETIME_TEST, BUTTON_TEST],
	},
	{
		id: 'ending-releases-once',
		line: "Lifetime's ending ends the holding and then runs its release once, which cannot recurse",
		edits: [
			{
				file: LIFETIME,
				find: '\t\tthis.#holdings = this.#holdings.filter((holding) => holding.record !== record)\n',
				replace:
					'\t\tconst ended = this.#holdings.find((holding) => holding.record === record)\n\t\tthis.#holdings = this.#holdings.filter((holding) => holding.record !== record)\n\t\tended?.release()\n',
			},
		],
		tests: [LIFETIME_TEST, BUTTON_TEST],
	},
	{
		id: 'ended-enrolled',
		line: 'Lifetime.join holds no ending in a resource lifetime that has ended, so the owner keeps the resource',
		edits: [
			{
				file: LIFETIME,
				find: ENDING,
				replace: `\t\t\tif (!lifetime.signal.aborted) {\n\t${ENDING}\t\t\t}\n`,
			},
		],
		tests: [LIFETIME_TEST],
	},
]

const rows = JSON.parse(readFileSync('tmp/j-release-core/mutations-2.json', 'utf8'))
const carried = rows.map((row) => successors.get(row.id) ?? row)
writeFileSync('tmp/j-release-core/mutations-3.json', `${JSON.stringify([...carried, ...additions], null, '\t')}\n`)
