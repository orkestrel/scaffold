// r2-pipe-span-3.mjs — successor of r2-pipe-span-2.mjs: the node discriminant is `element`, and a
// raw `|` inside a hand-written code span splits the row at parse time. So build the cell as a
// codeSpan node whose value is `|`, render, and re-parse. Log: r2-pipe-span-3.log.txt.
import { createMarkdown, renderMarkdown } from '/home/user/fleet/guide/node_modules/@orkestrel/markdown/dist/src/core/index.js'
const source = ['| Name | Summary |', '| --- | --- |', '| `a` | placeholder |', ''].join('\n')
const table = createMarkdown(source).document.children.find((node) => node.element === 'table')
const cell = [
  { element: 'text', value: 'cells joined by ' },
  { element: 'codeSpan', value: '|' },
  { element: 'text', value: ', so a reader can locate the row' },
]
const built = { ...table, rows: [[table.rows[0][0], cell]] }
const rendered = renderMarkdown(built)
console.log('rendered:\n' + rendered)
const again = createMarkdown(rendered).document.children.find((node) => node.element === 'table')
const cell2 = again?.rows?.[0]?.[1]
console.log('reparsed cell:', JSON.stringify(cell2))
console.log('row cell count second:', again?.rows?.[0]?.length)
console.log('EQUAL', JSON.stringify(cell2) === JSON.stringify(cell))
// The hand-written control: a raw pipe inside backticks, and the escaped form.
for (const text of ['| `a` | joined by `|` here |', '| `a` | joined by `\\|` here |']) {
  const doc = createMarkdown(['| Name | Summary |', '| --- | --- |', text, ''].join('\n')).document
  const row = doc.children.find((node) => node.element === 'table')?.rows?.[0]
  console.log('control', JSON.stringify(text), '->', JSON.stringify(row))
}
