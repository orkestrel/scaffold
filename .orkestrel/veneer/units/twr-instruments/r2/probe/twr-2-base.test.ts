// Probe: the base-layer reading the preflight order case takes, over a base block carrying rules
// and over an empty one, so the assertion is shown to tell the two apart.
import { parse } from 'postcss'
import { expect, it } from 'vitest'
import { SheetReader } from '../../../tests/setupServer.js'

function readBase(css: string): readonly string[] {
	return parse(css)
		.nodes.flatMap((node) =>
			node.type === 'atrule' && node.name === 'layer' && node.nodes !== undefined
				? [{ name: node.params.trim(), text: String(node) }]
				: [],
		)
		.filter((block) => block.name === 'base')
		.flatMap((block) => new SheetReader(block.text).selectors)
}

it('reads rules in a filled base block and none in an empty one', () => {
	expect(readBase('@layer base { *, ::after { box-sizing: border-box } }')).not.toEqual([])
	expect(readBase('@layer base {}')).toEqual([])
	// The round 1 reading: the block list itself is not empty for an empty block.
	expect(
		parse('@layer base {}').nodes.filter((node) => node.type === 'atrule' && node.name === 'layer'),
	).not.toEqual([])
})
