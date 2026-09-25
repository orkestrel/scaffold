// J-TAILWIND-PROBE collision reading: the consumer preflight profile scans only the markup fixture,
// so a Tailwind utility named like a class the scenarios carry is never generated in the census.
// This file lists every class token the alone recordings carry at any step, per plugin, compiles a
// bare Tailwind import that scans exactly those tokens, and reports which of them Tailwind
// generates and which of those the profile's exclusion line withholds. It writes
// tmp/j-tailwind-probe/out/collide.json.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { PLUGIN_SCENARIOS, SheetReader, WORKSPACE_ROOT } from '../../tests/setupServer.js'
import { TAILWIND_PATHS, compileProfile } from '../../tests/setupService.js'

const OUTPUT = resolve(WORKSPACE_ROOT, 'tmp/j-tailwind-probe/out')

describe('collide', () => {
	it('lists the scenario class tokens Tailwind generates', async () => {
		mkdirSync(OUTPUT, { recursive: true })
		const tokens = new Map<string, Set<string>>()
		for (const scenario of PLUGIN_SCENARIOS) {
			const recording: unknown = JSON.parse(
				readFileSync(resolve(OUTPUT, `${scenario.plugin}.alone.json`), 'utf8'),
			)
			const text = JSON.stringify(recording)
			for (const match of text.matchAll(/"classes":\[([^\]]*)\]/gu)) {
				for (const token of match[1]?.split(',') ?? []) {
					const name = token.replaceAll('"', '')
					if (name === '') continue
					const plugins = tokens.get(name) ?? new Set<string>()
					plugins.add(scenario.plugin)
					tokens.set(name, plugins)
				}
			}
		}
		const names = [...tokens.keys()].sort()
		const input = resolve(OUTPUT, 'collide-input.css')
		writeFileSync(input, `@import 'tailwindcss';\n@source inline("${names.join(' ')}");\n`)
		const bare = new Set(new SheetReader(await compileProfile(input)).names)
		const excluded = new Set(
			(
				/@source not inline\("([^"]*)"\)/u.exec(
					readFileSync(TAILWIND_PATHS.consumer.preflight, 'utf8'),
				)?.[1] ?? ''
			).split(' '),
		)
		const generated = names
			.filter((name) => bare.has(name))
			.map((name) => ({
				name,
				excluded: excluded.has(name),
				plugins: [...(tokens.get(name) ?? [])].sort(),
			}))
		const report = { scanned: names, generated }
		writeFileSync(resolve(OUTPUT, 'collide.json'), JSON.stringify(report, undefined, '\t'))
		console.log(JSON.stringify(generated, undefined, 2))
		expect(names.length).toBeGreaterThan(0)
	}, 300_000)
})
