// Probe M6b: does real Tailwind inline a plain CSS @import of the Bootstrap sheet, keep its @layer blocks and importance, and still apply the exclusion?
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from 'tailwindcss'
const S = '/home/user/veneer/tmp/probes/flip/sheets/'
const ORDER = '@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;'
const exclusion = readFileSync(S + 'tailwind-flipped.input.css', 'utf8').split('\n')[2]
const input = `${ORDER}\n@import 'tailwindcss';\n@import 'bootstrap.css';\n${exclusion}`
const root = '/home/user/veneer/node_modules/tailwindcss/'
const compiler = await compile(input, {
  base: S,
  loadStylesheet: async (id, base) => {
    const path = id === 'tailwindcss' ? root + 'index.css' : id.startsWith('tailwindcss/') ? root + id.slice('tailwindcss/'.length) : id === 'bootstrap.css' ? S + 'bootstrap-lifted.css' : resolve(base, id)
    return { path, base: dirname(path), content: readFileSync(path, 'utf8') }
  },
})
const css = compiler.build(['mt-3', 'px-8', 'collapse', 'btn'])
writeFileSync('/home/user/veneer/tmp/probes/flip/m6-counter/inlined.css', css)
const statements = css.split('\n').filter((l) => l.startsWith('@layer') || l.startsWith('/*')).slice(0, 8)
console.log('bytes', css.length)
console.log('first statements', statements)
console.log('has .btn rule', /\.btn\s*\{/.test(css), 'has .mt-3 utility', /\.mt-3\s*\{[^}]*calc\(var\(--spacing\)/.test(css), 'has .collapse tailwind rule', /\.collapse\s*\{\s*visibility:\s*collapse/.test(css))
console.log('bootstrap mt-3 important kept', /\.mt-3\s*\{\s*margin-top:\s*1rem\s*!important/.test(css))
console.log('@layer bootstrap blocks', (css.match(/@layer bootstrap\s*\{/g) ?? []).length, 'unlayered d-flex important', /\.d-flex\s*\{\s*display:\s*flex\s*!important/.test(css))
console.log('order of: order statement idx', css.indexOf(ORDER), 'properties idx', css.indexOf('@layer properties;'), 'first bootstrap layer idx', css.indexOf('@layer bootstrap {'), 'first utilities layer idx', css.indexOf('@layer utilities {'))
