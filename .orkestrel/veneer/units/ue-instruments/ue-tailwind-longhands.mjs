// Compiles the unit's shared class names through the installed Tailwind PostCSS plugin, from the
// validation copy's root, and prints the utilities layer, so each name's declared longhands are read
// off Tailwind's own rule. Run from tmp/probe/base; the output is ue-tailwind-longhands.log.txt.
import postcss from 'postcss'
import tailwind from '@tailwindcss/postcss'
const css = `@import 'tailwindcss/theme.css' layer(theme);\n@import 'tailwindcss/utilities.css' layer(utilities) source(none);\n@source inline("shadow shadow-sm shadow-lg shadow-none opacity-0 opacity-25 opacity-50 opacity-75 opacity-100 focus-ring focus-ring-primary");`
const out = await postcss([tailwind()]).process(css, { from: process.cwd() + '/tests/setup.css' })
console.log(out.css.split('@layer utilities')[1]?.slice(0, 3000))
