// Compiles probe.scss with Veneer's installed Sass and Lightning CSS and prints both outputs.
import { createRequire } from 'node:module'
const require = createRequire('/home/user/veneer-probe/package.json')
const sass = require('sass')
const { transform } = require('lightningcss')
const css = sass.compile(new URL('./probe.scss', import.meta.url).pathname, { style: 'expanded' }).css
console.log('--- sass expanded\n' + css)
const out = transform({ filename: 'probe.css', code: Buffer.from(css), minify: true }).code.toString()
console.log('--- lightningcss minified\n' + out)
