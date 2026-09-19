import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/app/browser/integration.test.ts'
const source = readFileSync(path, 'utf8')
const start = source.indexOf('\tconst target = document.getElementById(id)', source.indexOf('async function followField'))
const end = source.indexOf('\texpect(document.activeElement?.id).toBe(id)', start)
if (start < 0 || end < 0) throw Error('Diagnostic boundary missing')
writeFileSync(path, source.slice(0, start) + "\tawait clickAccessible('link', name)\n" + source.slice(end))
