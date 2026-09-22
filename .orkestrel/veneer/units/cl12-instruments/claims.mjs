// CL12 claim probe: each entry names a guide claim and the pattern that settles it
// against the built cascade, the manifest, or a source file.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFileSync(resolve(root, path), 'utf8')
const css = read('dist/src/styles/index.css')
const manifest = read('package.json')
const barrel = read('src/styles/index.scss')
const entry = read('src/styles/index.ts')
const wrapper = read('configs/src/vite.styles.config.ts')

const probes = [
	['exports ./styles names the built css', manifest, /"\.\/styles":\s*\{[^}]*dist\/src\/styles\/index\.css/s],
	['sideEffects lists **/*.css', manifest, /"sideEffects":\s*\[[^\]]*\*\*\/\*\.css/s],
	['build:src:styles script', manifest, /"build:src:styles":/],
	['check:src:styles script', manifest, /"check:src:styles":/],
	['test:src:styles script', manifest, /"test:src:styles":/],
	['barrel uses tokens', barrel, /@use\s+'tokens'|@use\s+'\.\/tokens'/],
	['barrel uses theme', barrel, /@use\s+'theme'|@use\s+'\.\/theme'/],
	['barrel does not use mixins', barrel, /^(?!.*@use\s+'mixins').*$/s],
	['entry imports index.scss', entry, /import\s+'\.\/index\.scss'/],
	['wrapper setupFiles names built css', wrapper, /setupFiles[\s\S]{0,200}index\.css/],
	['layer order theme,reset,base,elements,components,utilities', css, /@layer theme,\s*reset,\s*base,\s*elements,\s*components,\s*utilities/],
	['state stripe 5%', css, /--vn-state-stripe:\s*5%/],
	['state hover 12%', css, /--vn-state-hover:\s*12%/],
	['state active 22%', css, /--vn-state-active:\s*22%/],
	['focus width 0.1875rem', css, /--vn-focus-width:\s*\.?0?\.?1875rem/],
	['focus opacity 0.45', css, /--vn-focus-opacity:\s*\.?0?\.?45/],
	['gap scale 0 .25 .5 1 1.5 3rem', css, /--vn-gap-0:0;--vn-gap-1:\.25rem;--vn-gap-2:\.5rem;--vn-gap-3:1rem;--vn-gap-4:1\.5rem;--vn-gap-5:3rem/],
	['breakpoints 0 576 768 992 1200 1400', css, /--vn-breakpoint-xs:0;--vn-breakpoint-sm:576px;--vn-breakpoint-md:768px;--vn-breakpoint-lg:992px;--vn-breakpoint-xl:1200px;--vn-breakpoint-xxl:1400px/],
	['bs-gray reads vn-gray-600', css, /--bs-gray:var\(--vn-gray-600\)/],
	['bs-gray-dark reads vn-gray-800', css, /--bs-gray-dark:var\(--vn-gray-800\)/],
	['stack ladder 1000 to 1090', css, /--vn-stack-dropdown:1000;.*--vn-stack-toast:1090/s],
	['icon link underline offset 0.25em', css, /\.icon-link\{[^}]*text-underline-offset:\.25em/],
	['icon link icon sized 1em', css, /\.icon-link>[^{]*\{[^}]*inline-size:1em;block-size:1em|\.icon-link>[^{]*\{[^}]*block-size:1em/],
	['icon link hover arms the shift', css, /\.icon-link-hover:hover>/],
	['widest ratio 42.8571%', css, /42\.8571%/],
	['vr opacity 0.25', css, /\.vr\{[^}]*opacity:\.25/],
	['vr min block size 1em', css, /\.vr\{[^}]*min-block-size:1em/],
	['no prefixed backface property', css, /^(?!.*-webkit-backface-visibility).*$/s],
	['prefixed text-decoration-color present', css, /-webkit-text-decoration-color/],
	['body reads bs-body-text-align with start fallback', css, /text-align:var\(--bs-body-text-align,\s*start\)/],
	['hidden suppressed with important in reset layer', css, /@layer reset\{[\s\S]*?\[hidden\][^}]*display:none!important/],
	['interpolate-size allow-keywords on the document', css, /html\{[^}]*interpolate-size:allow-keywords/],
	['mark paints from the mark pair', css, /\.mark\{color:var\(--vn-text-mark\);background-color:var\(--vn-surface-mark\)/],
	['container sm cap at 576px', css, /@media \(width>=576px\)\{[^@]*var\(--vn-container-sm\)/],
	['gutter aliases on the row rule', css, /\.row\{--bs-gutter-x:var\(--vn-gutter-x\);--bs-gutter-y:var\(--vn-gutter-y\)/],
	['btn focus shadow rgb declared and unread', css, /--bs-btn-focus-shadow-rgb:var\(--vn-color-primary-rgb\)/],
	['h1 resolves to vn-size-8', css, /h1\{[^}]*font-size:var\(--vn-size-8\)|h1,\.h1\{[^}]*var\(--vn-size-8\)/],
]

for (const [claim, text, pattern] of probes) {
	const match = pattern.exec(text)
	console.log(`${match === null ? 'MISS' : 'HIT '} ${claim}`)
}
