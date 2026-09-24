import postcss from 'postcss'
import tw from '@tailwindcss/postcss'
const names = process.argv.slice(2).join(' ')
const src = `@layer theme, reset, base, elements, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities) source(none);
@source inline("${names}");`
const r = await postcss([tw()]).process(src, { from: process.cwd() + '/tmp/probe/x.css' })
console.log(r.css)
