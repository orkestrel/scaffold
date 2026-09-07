import { readFileSync } from 'node:fs'
import { createSource } from '@orkestrel/guide'
import { readInventory } from '@orkestrel/test/server'
const root = new URL('../../', import.meta.url)
const files = { ...readInventory(root, ['src', 'guides', 'tests'], { extensions: ['.ts', '.md'] }) }
const source = createSource({ files, module: ['src/core', 'src/server'] })
for (const m of source.methods('ProcessManagerInterface')) console.log(JSON.stringify(m))
