// The throwaway probe that measured each swatch against the canvas in both modes before P-d, run once
// from the validation copy's tests/app/browser/sections/ directory in the app:browser project and
// deleted after the run; its failure message is the table in up-probe-contrast.log.txt and
// up-probe-contrast-rows.txt. Retained here as the instrument behind those readings.
import { BackgroundSection, BorderSection } from '@app/browser'
import { blendColor, build, measureContrast, mount, parseColor, readStyle } from '@orkestrel/test/browser'
import { beforeAll, expect, it } from 'vitest'

beforeAll(async () => {
	await import('../../../../src/styles/index.scss')
	await import('../../../../app/browser/styles/index.scss')
})

it('probes', () => {
	const rows: string[] = []
	for (const mode of ['light', 'dark']) {
		const host = mount(build('div'))
		host.setAttribute('data-bs-theme', mode)
		const canvasProbe = build('div')
		canvasProbe.setAttribute('style', 'background-color: rgb(var(--bs-body-bg-rgb))')
		host.append(canvasProbe)
		new BackgroundSection(host)
		new BorderSection(host)
		const canvas = parseColor(readStyle(canvasProbe, 'background-color'))
		for (const swatch of host.querySelectorAll('.ratio')) {
			const fill = parseColor(readStyle(swatch, 'background-color'))
			const back = blendColor(fill!, canvas!)
			const fillC = measureContrast(back, canvas!)
			const bw = readStyle(swatch, 'border-top-width')
			const bc = parseColor(readStyle(swatch, 'border-top-color'))
			const borderC = bw === '0px' ? 0 : measureContrast(blendColor(bc!, back), back)
			rows.push(`${mode}\t${swatch.className}\tfill=${fillC.toFixed(2)}\tborder=${bw}:${borderC.toFixed(2)}`)
		}
		host.remove()
	}
	expect(rows.join('\n')).toBe('')
})
