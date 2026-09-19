import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/app/browser/integration.test.ts'
writeFileSync(path, readFileSync(path, 'utf8').replaceAll('\t\t\tpaintVariant(', '\t\t\tawait paintVariant(').replaceAll('\t\t\t\tpaintVariant(', '\t\t\t\tawait paintVariant('))
