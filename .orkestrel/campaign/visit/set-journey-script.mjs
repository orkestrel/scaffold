// Set roughnotes' test:journey script to the planned value the scaffold audit names, so the
// configs group is no longer blocked by the hand-rolled `--project 'journey:*'` invocation.
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/roughnotes/package.json'
const planned = 'vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot'
const text = readFileSync(path, 'utf8')
const manifest = JSON.parse(text)
console.log(`before: ${manifest.scripts['test:journey']}`)
manifest.scripts['test:journey'] = planned
writeFileSync(path, `${JSON.stringify(manifest, undefined, '\t')}\n`)
console.log(`after:  ${manifest.scripts['test:journey']}`)
