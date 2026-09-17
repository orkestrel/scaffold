import { readFileSync, writeFileSync } from 'node:fs'

const compilerPath = 'src/core/compilers.ts'
const templatePath = 'src/core/templates.ts'
const compiler = readFileSync(compilerPath, 'utf8')
const start = compiler.indexOf('\t\t// A showcase is the browser application')
const declaration = compiler.indexOf('\t\tconst showcaseFactory = machinery.showcase', start)
const literal = compiler.indexOf('`', declaration)
const end = compiler.indexOf('`\n\t\t\t: \'\'', literal) + 1
if (start < 0 || declaration < 0 || literal < 0 || end < literal) throw new Error('Missing showcase literal')
const comment = compiler.slice(start, declaration).replaceAll('\t\t//', '\t\t\t//')
const text = compiler.slice(literal, end)
const templates = readFileSync(templatePath, 'utf8')
const anchor = '\t\t\tserver: `export function appServer('
if (!templates.includes(anchor)) throw new Error('Missing app template anchor')
writeFileSync(templatePath, templates.replace(anchor, comment + '\t\t\tshowcase: ' + text + ',\n' + anchor))
writeFileSync(compilerPath, compiler.slice(0, start) + '\t\tconst showcaseFactory = machinery.showcase\n\t\t\t? CONFIG_TEMPLATES.factories.app.showcase' + compiler.slice(end))
