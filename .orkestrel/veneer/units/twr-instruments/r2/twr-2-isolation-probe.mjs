// Probe: compile each recipe fixture with the plugin's automatic source detection rooted at the
// working directory (the default) and at an empty directory, each with and without the markup
// `@source` line, and report which utility selectors each compile emits.
// Usage: node tmp/units/twr-2-isolation-probe.mjs (from the worktree root)
import postcss from 'postcss'
import tailwind from '@tailwindcss/postcss'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const recipes = ['consumer.css', 'consumer-preflight.css'].map((name) =>
	resolve('tests/fixtures/tailwind', name),
)
const line = "@source './markup.html';\n"
const empty = mkdtempSync(join(tmpdir(), 'twr-2-base-'))

function utilities(css) {
	const root = postcss.parse(css)
	const selectors = new Set()
	root.walkAtRules('layer', (layer) => {
		if (layer.params.trim() !== 'utilities') return
		layer.walkRules((rule) => {
			selectors.add(rule.selector)
		})
	})
	return [...selectors].sort()
}

try {
	for (const path of recipes) {
		const source = readFileSync(path, 'utf8')
		const readings = {}
		for (const [label, base] of [
			['cwd', undefined],
			['empty', empty],
		]) {
			for (const [variant, text] of [
				['with-line', source],
				['without-line', source.replace(line, '')],
			]) {
				const plugin = base === undefined ? tailwind() : tailwind({ base })
				const started = performance.now()
				const result = await postcss([plugin]).process(text, { from: path })
				readings[`${label}/${variant}`] = utilities(result.css)
				console.log(
					path.split('/').pop(),
					label,
					variant,
					'ms',
					Math.round(performance.now() - started),
					'utilities',
					readings[`${label}/${variant}`].length,
					'px-8',
					readings[`${label}/${variant}`].includes('.px-8'),
					'sepia-390',
					readings[`${label}/${variant}`].includes('.sepia-390'),
					'ring',
					readings[`${label}/${variant}`].includes('.ring'),
				)
			}
		}
		const cwd = readings['cwd/with-line']
		const isolated = readings['empty/with-line']
		console.log(
			'  isolated not in cwd:',
			JSON.stringify(isolated.filter((selector) => !cwd.includes(selector))),
		)
		console.log(
			'  cwd not in isolated (first 40):',
			JSON.stringify(cwd.filter((selector) => !isolated.includes(selector)).slice(0, 40)),
		)
		const unscanned = readings['empty/without-line']
		console.log(
			'  isolated with the line, not without it:',
			JSON.stringify(isolated.filter((selector) => !unscanned.includes(selector))),
		)
		console.log(
			'  cwd with the line, not without it:',
			JSON.stringify(cwd.filter((selector) => !readings['cwd/without-line'].includes(selector))),
		)
	}
} finally {
	rmSync(empty, { recursive: true, force: true })
}
