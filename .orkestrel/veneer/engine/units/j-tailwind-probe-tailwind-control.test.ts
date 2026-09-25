// J-TAILWIND-PROBE control: proves the tailwind runtime's stylesheet reaches the recorder's page and
// changes a computed style the preflight sets, and proves the recorder reads no departure between
// two recordings of one runtime. Writes its readings under tmp/j-tailwind-probe/out/.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
	CASCADE_PATH,
	PLUGIN_SCENARIOS,
	WORKSPACE_ROOT,
	collectEngineDepartures,
	compileVeneerRuntime,
	launchOracleBrowser,
	recordPluginOracle,
} from '../../tests/setupServer.js'
import { TAILWIND_PATHS, compileProfile } from '../../tests/setupService.js'

const OUTPUT = resolve(WORKSPACE_ROOT, 'tmp/j-tailwind-probe/out')

const PROPERTIES = ['tab-size', 'border-top-style', 'font-family', 'line-height'] as const
const TARGETS = ['html', '#header-one', '#panel-body', '#trigger', '#body-one'] as const

describe('control', () => {
	it('reads the profile on the recorder page and a preflight move', async () => {
		mkdirSync(OUTPUT, { recursive: true })
		const profile = await compileProfile(TAILWIND_PATHS.consumer.preflight)
		writeFileSync(resolve(OUTPUT, 'profile.css'), profile)
		const alone = await compileVeneerRuntime()
		writeFileSync(resolve(OUTPUT, 'alone.css'), alone.stylesheet)
		const built = readFileSync(resolve(WORKSPACE_ROOT, CASCADE_PATH), 'utf8')
		const scenario = PLUGIN_SCENARIOS.find((s) => s.plugin === 'collapse')
		if (scenario === undefined) throw new Error('No collapse scenario')
		const facts = {
			profileBytes: profile.length,
			aloneBytes: alone.stylesheet.length,
			builtEqualsAlone: built === alone.stylesheet,
			residualImports: [...profile.matchAll(/@import[^;]*;/gu)].map((m) => m[0]),
			urls: [...profile.matchAll(/url\([^)]*\)/gu)].map((m) => m[0]).slice(0, 10),
			layerStatements: [...profile.matchAll(/@layer [a-z, -]+;/gu)].map((m) => m[0]),
			carriesPreflightMarker: profile.includes('tailwindcss v4'),
			carriesAccordion: profile.includes('.accordion-button'),
		}
		const readings = await launchOracleBrowser(async (browser, scratch) => {
			const result: Record<string, unknown> = {}
			for (const [name, sheet] of [
				['alone', alone.stylesheet],
				['tailwind', profile],
			] as const) {
				scratch.write(`${name}.css`, sheet)
				const path = scratch.write(
					`${name}.html`,
					`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>control</title><link rel="stylesheet" href="${name}.css"></head><body>${scenario.markup}</body></html>`,
				)
				const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
				const failures: string[] = []
				page.on('requestfailed', (request) => {
					failures.push(`${request.url()} ${request.failure()?.errorText ?? ''}`)
				})
				page.on('console', (message) => {
					if (message.type() === 'error') failures.push(message.text())
				})
				await page.goto(pathToFileURL(path).href)
				const read = await page.evaluate(
					({ targets, properties }) => {
						const sheets = [...document.querySelectorAll('link')].map((link) => ({
							href: link.href,
							loaded: link.sheet !== null,
						}))
						const values = Object.fromEntries(
							targets.map((selector) => {
								const element = document.querySelector(selector)
								const style = element === null ? undefined : getComputedStyle(element)
								return [
									selector,
									Object.fromEntries(
										properties.map((property) => [property, style?.getPropertyValue(property)]),
									),
								]
							}),
						)
						return { sheets, values }
					},
					{ targets: [...TARGETS], properties: [...PROPERTIES] },
				)
				result[name] = { ...read, failures }
				await page.close()
			}
			return result
		})
		const null1 = await recordPluginOracle(scenario, alone)
		const null2 = await recordPluginOracle(scenario, alone)
		const noise = collectEngineDepartures(null1, null2)
		const report = { facts, readings, nullDepartures: noise }
		writeFileSync(resolve(OUTPUT, 'control.json'), JSON.stringify(report, undefined, '\t'))
		console.log(JSON.stringify(report, undefined, 2))
		expect(noise).toEqual([])
	}, 300_000)
})
