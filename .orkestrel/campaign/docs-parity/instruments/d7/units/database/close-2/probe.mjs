import { createGuide, createSource, parseManifest, normalizeDirectories, findMissingSymbols } from '@orkestrel/guide'
import { readInventory } from '@orkestrel/test/server'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = new URL('../../', import.meta.url)
const ROOT = fileURLToPath(root)
const files = { ...readInventory(root, ['src', 'guides', 'tests'], { extensions: ['.ts', '.md'] }) }
files['README.md'] = readFileSync(new URL('README.md', root), 'utf8')
files['AGENTS.md'] = readFileSync(new URL('AGENTS.md', root), 'utf8')

const manifest = parseManifest(files['guides/README.md'], 'guides')
const entry = manifest.find((e) => e.spec === 'guides/database.md')
const guide = createGuide(files[entry.spec])
const source = createSource({ files, module: entry.source })

console.log('entry.source', entry.source)
console.log('barrel surface count', source.surface().length)
console.log('guide surface count', guide.surface().length)
console.log('missing in guide (barrel not in guide):', findMissingSymbols(source.surface(), guide.surface()))
console.log('extra in guide (guide not in barrel):', findMissingSymbols(guide.surface(), source.surface()))
