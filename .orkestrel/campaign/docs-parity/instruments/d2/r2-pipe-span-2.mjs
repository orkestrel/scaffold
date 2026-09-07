// r2-pipe-span-2.mjs — successor of r2-pipe-span.mjs: locate the table by walking every node
// type the parser produces, then render and re-parse. Log: r2-pipe-span-2.log.txt beside this file.
import { createMarkdown, renderMarkdown } from '/home/user/fleet/guide/node_modules/@orkestrel/markdown/dist/src/core/index.js'
const source = ['| Name | Summary |', '| --- | --- |', '| `a` | cells joined by `|`, so a reader can locate the row |', ''].join('\n')
const parsed = createMarkdown(source)
const document = parsed.document
console.log('top-level types:', JSON.stringify(document.children.map((node) => node.type)))
const findTable = (node) => {
  if (node && typeof node === 'object') {
    if (node.type === 'table') return node
    for (const child of node.children ?? []) { const found = findTable(child); if (found) return found }
  }
  return undefined
}
const table = findTable(document)
if (table === undefined) { console.log('NO TABLE; document:', JSON.stringify(document).slice(0, 600)); process.exit(2) }
console.log('table keys:', Object.keys(table))
const rows = table.rows ?? []
const cell = rows[0]?.[1] ?? rows[0]
console.log('parsed cell:', JSON.stringify(cell))
const rendered = renderMarkdown(table)
console.log('rendered:\n' + rendered)
const again = findTable(createMarkdown(rendered).document)
const cell2 = again?.rows?.[0]?.[1]
console.log('reparsed cell:', JSON.stringify(cell2))
console.log('row cell count first/second:', rows[0]?.length, again?.rows?.[0]?.length)
console.log('EQUAL', JSON.stringify(cell2) === JSON.stringify(cell))
