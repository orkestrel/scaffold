// F8c probe 2: compile tests/setup.css, tests/fixtures/tailwind/preflight.css, and unexcluded.css in Node
// with `from` at their own paths, after writing the candidate list the way readiness will; report layers,
// whether `.container` is emitted (excluded in the profiles, present in the instrument), and warnings.
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const root = '/home/user/veneer-f8b'
const require = createRequire(root + '/package.json')
const postcss = require('postcss'); const tailwindcss = require('@tailwindcss/postcss')
const cascade = readFileSync(root + '/dist/src/styles/index.css', 'utf8')
const names = new Set(); for (const m of cascade.matchAll(/(?:^|[\s,{}>+~()])\.((?:\\.|[A-Za-z0-9_-])+)/gu)) names.add(m[1].replaceAll(/\\(.)/gu, '$1'))
mkdirSync(root + '/tmp/tailwind', { recursive: true }); writeFileSync(root + '/tmp/tailwind/candidates.txt', [...names].sort().join('\n') + '\n')
console.log('candidates', names.size, ['container','table','col-1','caption-top','caption-bottom'].every((n) => names.has(n)))
for (const rel of ['tests/setup.css', 'tests/fixtures/tailwind/preflight.css', 'tests/fixtures/tailwind/unexcluded.css']) {
  const from = root + '/' + rel
  try {
    const result = await postcss([tailwindcss()]).process(readFileSync(from, 'utf8'), { from })
    const css = result.css
    console.log(rel, 'ok bytes=' + css.length, 'layers=' + [...css.matchAll(/@layer ([a-z, ]+);/gu)].map((m) => m[1]).join(' | '), 'container=' + /\.container\s*\{/u.test(css), 'col-1=' + /\.col-1\s*\{/u.test(css), 'px-8=' + /\.px-8/u.test(css), 'base=' + /@layer base/u.test(css), 'warnings=' + result.warnings().length)
  } catch (e) { console.log(rel, 'ERROR', String(e).slice(0, 200)) }
}
