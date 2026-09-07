import { readFileSync } from 'node:fs'
import { parseManifest } from '@orkestrel/guide'
const text = readFileSync('guides/README.md', 'utf8')
console.log(JSON.stringify(parseManifest(text, 'guides'), null, 2))
