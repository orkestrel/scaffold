import { createGuide, createSource } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'

const files = {}
for (const key of globSync(['src/**/*.ts', 'guides/*.md', '*.md'])) files[key] = readFileSync(key, 'utf8')
const guide = createGuide(files['guides/rater.md'])
const source = createSource({ files, module: 'src/core' })
const declared = source.examples().map((e) => e.title).filter((t) => t !== undefined)
const headings = guide.fences().map((f) => f.title).filter((t) => t !== undefined)
console.log('guide fence titles:', JSON.stringify(headings))
console.log('source example titles:', JSON.stringify(declared))
const pair = source.examples().find((e) => e.title === 'Create a rater')
console.log('paired source example name:', pair?.name)
console.log('paired body:\n' + JSON.stringify(pair?.code))
const fence = guide.fences().find((f) => f.title === 'Create a rater')
console.log('paired fence body:\n' + JSON.stringify(fence?.code))
