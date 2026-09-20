// Orchestrator extraction over calibration run 6: the semantic palette (variant buttons and their
// subtle and filled tiers), the canvas, and the full font stack, as Markdown rows for the
// calibration record. Reads both browsers and marks where Edge differs.
import { readFileSync } from 'node:fs'

const root = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration/'
const chromium = JSON.parse(readFileSync(root + 'chromium/calibration.json', 'utf8'))
const msedge = JSON.parse(readFileSync(root + 'msedge/calibration.json', 'utf8'))
const ids = Object.keys(chromium.specimens).filter((id) => id.startsWith('canvas-') || /^button-(secondary|tertiary|success|warning|danger|information|primary-|secondary-|tertiary-|success-|warning-|danger-|information-)/.test(id))
const props = ['color', 'background-color', 'border-top-color', 'box-shadow']
const read = (data, id, mode, state, prop) => data.specimens[id]?.[mode]?.[state]?.style?.[prop]
console.log('| Specimen | Mode | State | color | background-color | border-top-color | box-shadow | Edge |')
console.log('| --- | --- | --- | --- | --- | --- | --- | --- |')
for (const id of ids) {
	for (const mode of ['light', 'dark']) {
		for (const state of Object.keys(chromium.specimens[id]?.[mode] ?? {})) {
			const values = props.map((prop) => read(chromium, id, mode, state, prop) ?? '—')
			const edge = props.filter((prop) => read(chromium, id, mode, state, prop) !== read(msedge, id, mode, state, prop)).map((prop) => `${prop}: ${read(msedge, id, mode, state, prop)}`)
			console.log(`| ${id} | ${mode} | ${state} | ${values.join(' | ')} | ${edge.length === 0 ? 'same' : edge.join('; ')} |`)
		}
	}
}
console.log('\nfont-family (body-copy, light, rest):', read(chromium, 'body-copy', 'light', 'rest', 'font-family'))
console.log('canvas-body rect:', JSON.stringify(chromium.specimens['canvas-body']?.light?.rest?.rect))
console.log('unknowns:', chromium.unknowns.length, msedge.unknowns.length, 'versions', chromium.version, msedge.version, chromium.date, msedge.date)
