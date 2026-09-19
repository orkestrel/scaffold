import { readFileSync, writeFileSync } from 'node:fs'
const [manifestPath, archive] = process.argv.slice(2)
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const separator = String.fromCharCode(92)
manifest.devDependencies['@orkestrel/scaffold'] = `file:${archive.split(separator).join('/')}`
writeFileSync(manifestPath, `${JSON.stringify(manifest, undefined, '\t')}\n`)
