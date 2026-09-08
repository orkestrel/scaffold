import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { extractSurface } from '@orkestrel/guide'
import { createMarkdown } from '@orkestrel/markdown'

const require = createRequire(import.meta.url)
const guide = dirname(require.resolve('@orkestrel/guide/package.json'))
const entry = join(guide, 'dist/src/core/index.js')
const digest = createHash('sha256').update(readFileSync(entry)).digest('hex').slice(0, 8)
const neutralText = `# Guide

## Surface

### Bind a widget to a transport

### Classes

| API | Kind | Summary |
| --- | --- | --- |
| \`Widget\` | class | Represents a widget. |
`
const embeddedText = neutralText.replace('Bind a widget to a transport', 'Bind a `Widget` to a transport')
const neutral = extractSurface(createMarkdown(neutralText).document)
const embedded = extractSurface(createMarkdown(embeddedText).document)
const expected = [{ name: 'Widget', keyword: 'class', summary: 'Represents a widget.' }]

console.log(`guide dist sha256: ${digest}`)
console.log('neutral', JSON.stringify(neutral))
console.log('embedded', JSON.stringify(embedded))
assert.deepStrictEqual(neutral, expected)
assert.deepStrictEqual(embedded, neutral)
