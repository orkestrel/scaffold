// F8c probe: can @tailwindcss/postcss in Node (no Vite) resolve the cascade import of the consumer recipe
// from a file inside the Veneer workspace, and does the guide recipe compile to a sheet carrying Veneer's
// signature plus a utility? Runs against /home/user/veneer-f8b; writes nothing into that tree.
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
const require = createRequire('/home/user/veneer-f8b/package.json')
const postcss = require('postcss')
const tailwindcss = require('@tailwindcss/postcss')
const recipe = readFileSync('/home/user/veneer-f8b/tests/fixtures/tailwind/consumer.css', 'utf8')
async function run(label, css, from) {
  try {
    const result = await postcss([tailwindcss()]).process(css, { from })
    const text = result.css
    console.log(label, 'ok bytes=' + text.length, 'vn-signature=' + /--vn-[a-z-]+:/u.test(text), 'btn=' + /\.btn\s*\{/u.test(text), 'px-8=' + /\.px-8/u.test(text), 'layers=' + [...text.matchAll(/@layer ([a-z, ]+);/gu)].map((m) => m[1]).slice(0, 2).join(' | '), 'warnings=' + result.warnings().length)
  } catch (error) { console.log(label, 'ERROR', String(error).slice(0, 300)) }
}
await run('A consumer.css verbatim, from=fixture path', recipe, '/home/user/veneer-f8b/tests/fixtures/tailwind/consumer.css')
await run('B cascade import as relative dist path', recipe.replace("@import '@orkestrel/veneer/styles';", "@import '../../../dist/src/styles/index.css';"), '/home/user/veneer-f8b/tests/fixtures/tailwind/consumer.css')
await run('C cascade import as absolute dist path', recipe.replace("@import '@orkestrel/veneer/styles';", "@import '/home/user/veneer-f8b/dist/src/styles/index.css';"), '/home/user/veneer-f8b/tests/fixtures/tailwind/consumer.css')
