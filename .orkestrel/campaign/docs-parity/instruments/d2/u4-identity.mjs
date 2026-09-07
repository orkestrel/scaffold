import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))
const text = [
	'## Methods','','#### `A`','','| Name | Summary |','| --- | --- |','| `walk` | Walks. |','',
	'#### `B`','','| Name | Summary |','| --- | --- |','| `walk` | Walks. |','',
	'### One','','```ts','same()','```','','### Two','','```ts','same()','```','',
].join('\n')
const handle = md.createMarkdown(text)
const fences = handle.filter(md.isCodeBlockNode)
const tables = handle.filter(md.isTableNode)
console.log('fences:', fences.length, 'distinct identities:', new Set(fences).size)
console.log('tables:', tables.length, 'distinct identities:', new Set(tables).size)
console.log('fence spans:', fences.map((f) => JSON.stringify(handle.span(f))).join(' '))
console.log('table spans:', tables.map((t) => JSON.stringify(handle.span(t))).join(' '))
