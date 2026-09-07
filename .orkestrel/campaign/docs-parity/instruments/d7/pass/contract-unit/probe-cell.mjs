import { replaceCell } from '@orkestrel/guide'
const short = ['## Surface', '', '| Name | Kind | Summary |', '| --- | --- | --- |', '| `walk` | function |', ''].join('\n')
const full = ['## Surface', '', '| Name | Kind | Summary |', '| --- | --- | --- |', '| `walk` | function |  |', ''].join('\n')
for (const [label, text] of [['row missing the Summary cell', short], ['row carrying an empty Summary cell', full]]) {
	const out = replaceCell(text, 'function walk', 'Walks the tree.')
	console.log(label, '->', out === undefined ? 'undefined' : out === text ? 'UNCHANGED (silent no-op)' : JSON.stringify(out.split('\n')[4]))
}
