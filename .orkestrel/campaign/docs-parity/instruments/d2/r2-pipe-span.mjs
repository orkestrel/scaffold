// r2-pipe-span.mjs — does renderMarkdown escape a `|` inside a code span inside a table cell,
// and does the render parse back to the same cell? Runs against the guide checkout's installed
// @orkestrel/markdown. Log: r2-pipe-span.log.txt beside this file.
import { createMarkdown, renderMarkdown } from '/home/user/fleet/guide/node_modules/@orkestrel/markdown/dist/src/core/index.js'
const source = ['| Name | Summary |', '| --- | --- |', '| `a` | cells joined by `|`, so a reader can locate the row |', ''].join('\n')
const parsed = createMarkdown(source)
const table = parsed.document.children.find((node) => node.type === 'table')
const cell = table.rows[0][1]
console.log('parsed cell nodes:', JSON.stringify(cell))
const rendered = renderMarkdown(table)
console.log('rendered:\n' + rendered)
const again = createMarkdown(rendered).document.children.find((node) => node.type === 'table')
console.log('reparsed cell nodes:', JSON.stringify(again.rows[0][1]))
console.log('cell count first/second:', table.rows[0].length, again.rows[0].length)
console.log('EQUAL', JSON.stringify(again.rows[0][1]) === JSON.stringify(cell))
