// Orchestrator correction 2 of the calibration instrument: the motion sampler resolves a css reach
// with document.querySelector, so a Playwright-only pseudo-class (:has-text) is invalid there.
// The dialog probe of 2026-09-20 read the inline dialog as the section's first dialog and the modal
// as its second, so structural selectors replace the text-matched ones.
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs'
let text = readFileSync(path, 'utf8')
const replacements = [
	['section#dialog-element-open-modes dialog:has-text("Modal dialog") button:has-text("Close")', 'section#dialog-element-open-modes dialog:nth-of-type(2) button'],
	['section#dialog-element-open-modes dialog:has-text("Inline dialog") button:has-text("Close")', 'section#dialog-element-open-modes dialog:nth-of-type(1) button'],
	['section#dialog-element-open-modes dialog:has-text("Modal dialog")', 'section#dialog-element-open-modes dialog:nth-of-type(2)'],
	['section#dialog-element-open-modes dialog:has-text("Inline dialog")', 'section#dialog-element-open-modes dialog:nth-of-type(1)'],
]
for (const [from, to] of replacements) {
	if (!text.includes(from)) throw new Error('anchor not found: ' + from)
	text = text.replaceAll(from, to)
}
writeFileSync(path, text)
console.log('replacements applied', replacements.length)
