// Orchestrator correction 3 of the calibration instrument: the distillate of run 4 showed rest,
// closed, and state readings taken mid-transition (0.15 s colour transitions after a mode switch,
// 0.25 s overlay closes still running when the next mode's closed state was read, and a close
// motion sampled before its open had settled). Every read now follows a settle wait longer than
// the longest transition the showcase declares (0.25 s), and a close motion opens, settles, then
// samples.
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs'
let text = readFileSync(path, 'utf8')
const replacements = [
	[
		"const MOTION_SAMPLE_MS = 700\n",
		"const MOTION_SAMPLE_MS = 700\n// Longest declared transition in the showcase is 0.25 s; every settled read waits this long first.\nconst SETTLE_MS = 500\n",
	],
	[
		"\t\tawait setMode(page, mode)\n\t\treadings[mode] = {}\n\t\tfor (const state of specimen.states) {\n\t\t\tif (state === 'open') await openSpecimen(page, specimen, unknowns)\n\t\t\tconst cleanup = await driveState(page, locator, state, specimen, unknowns)\n\t\t\tconst style",
		"\t\tawait setMode(page, mode)\n\t\tawait page.waitForTimeout(SETTLE_MS)\n\t\treadings[mode] = {}\n\t\tfor (const state of specimen.states) {\n\t\t\tif (state === 'open') await openSpecimen(page, specimen, unknowns)\n\t\t\tconst cleanup = await driveState(page, locator, state, specimen, unknowns)\n\t\t\tawait page.waitForTimeout(SETTLE_MS)\n\t\t\tconst style",
	],
	[
		"\t\t\tawait cleanup()\n\t\t\tif (state === 'open' && specimen.close) await closeSpecimen(page, specimen, unknowns)\n\t\t}",
		"\t\t\tawait cleanup()\n\t\t\tif (state === 'open' && specimen.close) await closeSpecimen(page, specimen, unknowns)\n\t\t\tawait page.waitForTimeout(SETTLE_MS)\n\t\t}",
	],
	[
		"\tif (motion.direction === 'close') {\n\t\tawait openSpecimen(page, specimen, unknowns)\n\t\tawait locator.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {})\n\t}",
		"\tif (motion.direction === 'close') {\n\t\tawait openSpecimen(page, specimen, unknowns)\n\t\tawait locator.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {})\n\t\tawait page.waitForTimeout(MOTION_SAMPLE_MS)\n\t}",
	],
]
for (const [from, to] of replacements) {
	if (!text.includes(from)) throw new Error('anchor not found: ' + from.slice(0, 60))
	text = text.replace(from, to)
}
writeFileSync(path, text)
console.log('replacements applied', replacements.length)
