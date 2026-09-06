import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))
const text = readFileSync('/home/user/scaffold/guides/scaffold.md', 'utf8')
const lines = text.split('\n')
const start = lines.findIndex((l) => l.startsWith('| Name') || l.startsWith('| `'))
const tableLines = []
for (let i = start; i < lines.length && lines[i].startsWith('|'); i += 1) tableLines.push(lines[i])
const table = tableLines.join('\n') + '\n'
const document = md.createMarkdown(table).document
const rendered = md.renderMarkdown(document)
console.log('committed table lines:', tableLines.length, '| rendered lines:', rendered.split('\n').length - 1)
console.log('byte-identical:', rendered === table)
console.log('first committed line:', JSON.stringify(tableLines[0].slice(0, 80)))
console.log('first rendered line:', JSON.stringify(rendered.split('\n')[0].slice(0, 80)))
// control: a hand-edited cell must diff
const edited = table.replace('| function |', '| function | EDITED')
console.log('control (edited cell re-rendered differs from committed):', md.renderMarkdown(md.createMarkdown(edited).document) !== rendered)
console.log('exports carrying "Provenance":', Object.keys(md).filter((k) => /provenance|span|range/i.test(k)).join(', ') || '(none)')
