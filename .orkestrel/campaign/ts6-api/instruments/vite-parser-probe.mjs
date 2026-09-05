// M6, M7, M9: Vite's re-exported oxc parser and transformer over the inputs the lifts and the fences read.
import { parseSync, transformWithOxc } from '/home/user/scaffold/node_modules/vite/dist/node/index.js'
const source = [
  "import { isRecord } from '@orkestrel/contract'",
  "import type { UserConfig } from 'vite'",
  "/** Greets. */",
  "export function greet(name: string): string { return `hello ${name}` }",
  "export const config = (): UserConfig => ({ plugins: [] })",
  "const hidden = 1",
  "export default hidden",
  "export enum Mode { Fast = 'fast' }",
  "export namespace Shapes { export const sides = 4 }",
  "export class Point { constructor(readonly x: number) {} }",
  "import fs = require('node:fs')",
  "export const exists = typeof fs.existsSync",
].join('\n') + '\n'
const parsed = parseSync('probe.ts', source)
console.log(`parseSync: errors=${parsed.errors.length} comments=${parsed.comments?.length} keys=${Object.keys(parsed).join(',')}`)
for (const statement of parsed.program.body) {
  const text = source.slice(statement.start, statement.end).split('\n')[0].slice(0, 60)
  const declaration = statement.declaration
  const name = declaration?.id?.name ?? declaration?.declarations?.[0]?.id?.name ?? statement.source?.value ?? statement.expression?.name ?? ''
  const params = declaration?.type === 'FunctionDeclaration' ? declaration.params.map((p) => p.name ?? p.pattern?.name ?? p.type).join(',') : ''
  const returnType = declaration?.returnType?.typeAnnotation?.type ?? declaration?.declarations?.[0]?.init?.returnType?.typeAnnotation?.typeName?.name ?? ''
  console.log(`${statement.type.padEnd(28)} ${String(name).padEnd(20)} params=[${params}] return=${returnType} exportKind=${statement.exportKind ?? ''} start=${statement.start} end=${statement.end} text=${JSON.stringify(text)}`)
}
console.log(`comments: ${JSON.stringify(parsed.comments?.map((c) => ({ type: c.type, value: c.value, start: c.start, end: c.end })))}`)
console.log('== transformWithOxc over the fence corpus')
const samples = {
  enumeration: "export enum Mode { Fast = 'fast', Slow = 'slow' }\nexport const chosen = Mode.Fast\n",
  namespace: "export namespace Shapes { export const sides = 4 }\n",
  parameterProperty: "export class Point { constructor(readonly x: number) {} }\n",
  importEquals: "import fs = require('node:fs')\nexport const exists = typeof fs.existsSync\n",
  plain: "export const value: number = 1\nexport function name(text: string): string { return text }\n",
}
for (const [label, code] of Object.entries(samples)) {
  try {
    const out = await transformWithOxc(code, `${label}.ts`, { target: 'esnext' })
    console.log(`${label}: ok ${JSON.stringify(out.code).slice(0, 150)}`)
  } catch (error) {
    console.log(`${label}: FAILED ${String(error.message).split('\n')[0].slice(0, 160)}`)
  }
}
