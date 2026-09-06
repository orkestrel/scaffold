import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))
const text = readFileSync('/home/user/scaffold/guides/scaffold.md', 'utf8').split('\n')
const start = text.findIndex((l) => l.startsWith('| Name'))
const rows = []; for (let i = start; i < text.length && text[i].startsWith('|'); i += 1) rows.push(text[i])
const table = rows.join('\n') + '\n'
const render = (s) => md.renderMarkdown(md.createMarkdown(s).document)
const cells = rows[2].split('|').map((c) => c.trim()).filter(Boolean)
const word = cells[2].split(' ')[0]
const edited = table.replace(cells[2], 'EDITED ' + cells[2])
console.log('control row:', JSON.stringify(rows[2].slice(0, 60)), '| edited word:', word)
console.log('in-cell edit diffs the render:', render(table) !== render(edited))
