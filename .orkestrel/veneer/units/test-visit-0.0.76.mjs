// Test visit: declare the planned test:setup:browser script exactly as scaffold audit dictates and
// invoke it from the test chain, editing the manifest text in place so its formatting survives.
import { readFileSync, writeFileSync } from 'node:fs'
const path = 'package.json'
let text = readFileSync(path, 'utf8')
const setupLine = '\t\t"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"'
const browserLine = '\t\t"test:setup:browser": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser"'
if (text.includes('"test:setup:browser"')) throw new Error('already declared')
if (!text.includes(setupLine)) throw new Error('test:setup line not found in the expected form')
text = text.replace(setupLine, setupLine + ',\n' + browserLine)
const chainBefore = 'npm run test:setup && npm run test:guides'
if (!text.includes(chainBefore)) throw new Error('test chain not found in the expected form')
text = text.replace(chainBefore, 'npm run test:setup && npm run test:setup:browser && npm run test:guides')
writeFileSync(path, text)
console.log('manifest: test:setup:browser declared and chained')
