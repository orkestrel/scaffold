import { stripTypeScriptTypes } from 'node:module'
const samples = {
  plain: "export const value: number = 1\nexport function name(text: string): string { return text }\n",
  enumeration: "export enum Mode { Fast = 'fast', Slow = 'slow' }\nexport const chosen = Mode.Fast\n",
  namespace: "export namespace Shapes { export const sides = 4 }\n",
  parameterProperty: "export class Point { constructor(readonly x: number) {} }\n",
  importEquals: "import fs = require('node:fs')\nexport const exists = typeof fs.existsSync\n",
  satisfiesAndAs: "export const x = { a: 1 } satisfies Record<string, number>\nexport const y = 1 as number\n",
}
for (const [name, source] of Object.entries(samples)) {
  for (const mode of ['strip', 'transform']) {
    try {
      const output = stripTypeScriptTypes(source, { mode, sourceMap: mode === 'transform' })
      console.log(`${name} [${mode}] ok: ${JSON.stringify(output).slice(0, 160)}`)
    } catch (error) {
      console.log(`${name} [${mode}] FAILED: ${error.message.split('\n')[0]}`)
    }
  }
}
