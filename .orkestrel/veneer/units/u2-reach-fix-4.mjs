// Orchestrator extension 4 of the calibration instrument: the U3 objective design lane found the
// calibration narrower than the token scope (no semantic palette beyond primary, no canvas
// background). The showcase renders every variant button, every variant style, and the page
// canvas, so these specimens join the constant list; the instrument's reader and captures cover
// them unchanged.
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs'
let text = readFileSync(path, 'utf8')
const variants = ['secondary', 'tertiary', 'success', 'warning', 'danger', 'information']
const rows = []
rows.push(`\tObject.freeze({
\t\tid: 'canvas-body',
\t\troute: '#/typography/typography-paragraph',
\t\treach: Object.freeze({ css: 'body' }),
\t\tstates: Object.freeze(['rest']),
\t}),
\tObject.freeze({
\t\tid: 'canvas-main',
\t\troute: '#/typography/typography-paragraph',
\t\treach: Object.freeze({ css: 'main' }),
\t\tstates: Object.freeze(['rest']),
\t}),`)
for (const variant of variants) {
	const name = variant[0].toUpperCase() + variant.slice(1)
	rows.push(`\tObject.freeze({
\t\tid: 'button-${variant}',
\t\troute: '#/button/button-variants',
\t\treach: Object.freeze({ css: 'section#button-variants button.${variant}' }),
\t\tstates: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
\t}),`)
	void name
}
for (const variant of ['primary', ...variants]) {
	for (const style of ['subtle', 'filled']) {
		rows.push(`\tObject.freeze({
\t\tid: 'button-${variant}-${style}',
\t\troute: '#/button/button-styles',
\t\treach: Object.freeze({ css: 'section#button-styles button.${variant}.${style}' }),
\t\tstates: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
\t}),`)
	}
}
const anchor = "\tObject.freeze({\n\t\tid: 'button-disabled',"
if (!text.includes(anchor)) throw new Error('anchor not found')
text = text.replace(anchor, rows.join('\n') + '\n' + anchor)
writeFileSync(path, text)
console.log('specimens added', rows.length)
