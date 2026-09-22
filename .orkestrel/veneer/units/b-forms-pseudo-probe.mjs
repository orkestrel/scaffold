// B-FORMS probe: which vendor pseudo selectors lightningcss (the styles build's minifier) keeps, without targets and with modern targets.
import { createRequire } from 'node:module'
const require = createRequire('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8q/package.json')
const { transform } = require('lightningcss')
const rules = [
	'.form-control::-webkit-file-upload-button{margin:0}',
	'.form-control::file-selector-button{margin:0}',
	'.form-select:-moz-focusring{color:transparent}',
	'.form-range::-moz-focus-outer{border:0}',
	'.form-range::-moz-range-thumb{width:1rem}',
	'.form-range::-moz-range-track{width:100%}',
	'.form-range::-webkit-slider-thumb{width:1rem}',
	'.form-range::-webkit-slider-runnable-track{width:100%}',
	'.form-control-color::-moz-color-swatch{border:0}',
	'.form-control-color::-webkit-color-swatch{border:0}',
	'.form-control::-webkit-date-and-time-value{height:1.5em}',
	'.form-control::-webkit-datetime-edit{padding:0}',
	'.form-control::placeholder{color:gray}',
	'.form-floating>.form-control:-webkit-autofill~label{color:red}',
]
const modern = { chrome: 141 << 16, firefox: 141 << 16, safari: 18 << 16, edge: 141 << 16 }
for (const [label, targets] of [['no targets', undefined], ['modern targets', modern]]) {
	const out = transform({ filename: 'probe.css', code: Buffer.from(rules.join('\n')), minify: true, targets }).code.toString()
	console.log('===', label, 'bytes', out.length)
	for (const rule of rules) {
		const selector = rule.split('{')[0]
		console.log(out.includes(selector) ? 'kept   ' : 'DROPPED', selector)
	}
	console.log(out)
}
