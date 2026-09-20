// Orchestrator correction of the calibration instrument's reaches, from the DOM probe readings of
// 2026-09-20: unique selectors per specimen, first-match resolution, and a document reload per
// route so an open top-layer surface from the previous specimen cannot intercept the next click.
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs'
let text = readFileSync(path, 'utf8')
const replacements = [
	[
		"function resolveLocator(page, reach) {\n\tif ('css' in reach) return page.locator(reach.css)\n\treturn page.getByRole(reach.role, { name: reach.name, exact: true })\n}",
		"function resolveLocator(page, reach) {\n\t// First match: the showcase repeats a specimen's tag and name across sections, and the map's\n\t// route lands the specimen section first (Orchestrator DOM probe, 2026-09-20).\n\tif ('css' in reach) return page.locator(reach.css).first()\n\treturn page.getByRole(reach.role, { name: reach.name, exact: true }).first()\n}",
	],
	["reach: Object.freeze({ css: 'button.primary[disabled]' })", "reach: Object.freeze({ role: 'button', name: '[disabled]' })"],
	[
		"reach: Object.freeze({ css: 'dialog' }),\n\t\tstates: Object.freeze(['closed', 'open']),\n\t\topen: Object.freeze({ role: 'button', name: 'Open modal' }),\n\t\tclose: Object.freeze({ role: 'button', name: 'Close' }),",
		"reach: Object.freeze({ css: 'section#dialog-element-open-modes dialog:has-text(\"Modal dialog\")' }),\n\t\tstates: Object.freeze(['closed', 'open']),\n\t\topen: Object.freeze({ role: 'button', name: 'Open modal' }),\n\t\tclose: Object.freeze({ css: 'section#dialog-element-open-modes dialog:has-text(\"Modal dialog\") button:has-text(\"Close\")' }),",
	],
	[
		"reach: Object.freeze({ css: 'dialog' }),\n\t\tstates: Object.freeze(['closed', 'open']),\n\t\topen: Object.freeze({ role: 'button', name: 'Open inline (non-modal)' }),\n\t\tclose: Object.freeze({ role: 'button', name: 'Close' }),",
		"reach: Object.freeze({ css: 'section#dialog-element-open-modes dialog:has-text(\"Inline dialog\")' }),\n\t\tstates: Object.freeze(['closed', 'open']),\n\t\topen: Object.freeze({ role: 'button', name: 'Open inline (non-modal)' }),\n\t\tclose: Object.freeze({ css: 'section#dialog-element-open-modes dialog:has-text(\"Inline dialog\") button:has-text(\"Close\")' }),",
	],
	[
		"reach: Object.freeze({ css: 'details' }),",
		"reach: Object.freeze({ css: 'section#details-bare details' }),",
	],
	[
		"open: Object.freeze({ role: 'button', name: \"What is the framework's modifier cascade?\" }),\n\t\tclose: Object.freeze({ role: 'button', name: \"What is the framework's modifier cascade?\" }),",
		"open: Object.freeze({ css: 'section#details-bare summary' }),\n\t\tclose: Object.freeze({ css: 'section#details-bare summary' }),",
	],
	["reach: Object.freeze({ css: '[popover]:not([popover=\"hint\"])' }),", "reach: Object.freeze({ css: '#demo-pop-auto' }),"],
	["reach: Object.freeze({ css: \"[popover='hint']\" }),", "reach: Object.freeze({ css: '#demo-pop-hint' }),"],
	[
		"reach: Object.freeze({ css: 'aside[popover]' }),",
		"reach: Object.freeze({ css: '#aside-drawer-end' }),",
	],
	[
		"open: Object.freeze({ role: 'button', name: 'Slide from end (default)' }),\n\t\tclose: Object.freeze({ role: 'button', name: 'Close' }),",
		"open: Object.freeze({ role: 'button', name: 'Slide from end (default)' }),\n\t\tclose: Object.freeze({ css: '#aside-drawer-end button[popovertarget=\"aside-drawer-end\"]' }),",
	],
]
for (const [from, to] of replacements) {
	if (!text.includes(from)) throw new Error('anchor not found: ' + from.slice(0, 80))
	text = text.replace(from, to)
}
writeFileSync(path, text)
console.log('replacements applied', replacements.length)
