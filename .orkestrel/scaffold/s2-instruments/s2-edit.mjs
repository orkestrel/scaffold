import { readFileSync, writeFileSync } from 'node:fs'

const templatePath = 'src/core/templates.ts'
const compilerPath = 'src/core/compilers.ts'
const testPath = 'tests/src/core/compilers.test.ts'
const templates = readFileSync(templatePath, 'utf8')
const start = templates.indexOf('export function mergeOverride(')
const end = templates.indexOf('\n}\n', start) + 3
const previous = templates.slice(start, end)
const replacement = `export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (override === undefined || ('command' in override && 'mode' in override)) return base
	const merged: UserConfig = mergeConfig(base, override)
	if (merged.plugins === undefined) return merged
	const replacements = override.plugins ?? []
	const used = new Set<number>()
	const selected: PluginOption[] = []
	for (const plugin of base.plugins ?? []) {
		const index = replacements.findIndex((candidate, position) =>
			!used.has(position) &&
			typeof plugin === 'object' && plugin !== null && 'name' in plugin &&
			!Array.isArray(plugin) && !(plugin instanceof Promise) &&
			typeof candidate === 'object' && candidate !== null && 'name' in candidate &&
			!Array.isArray(candidate) && !(candidate instanceof Promise) &&
			candidate.name === plugin.name,
		)
		const replacement = replacements[index]
		if (replacement === undefined) {
			selected.push(plugin)
		} else {
			selected.push(replacement)
			used.add(index)
		}
	}
	for (const [index, plugin] of replacements.entries()) {
		if (!used.has(index)) selected.push(plugin)
	}
	return { ...merged, plugins: selected }
}
`
if (!previous.startsWith('export function') || !previous.includes('merged.plugins.flat()')) throw new Error('Missing merge span')
let updated = templates.replace(previous, replacement)
updated = updated.replace(
	'// override receives that record in the same position. A \\`UserConfig\\` declares no\n// \\`command\\`, so a value carrying one is that record and merges nothing. That refusal\n// is what makes the parameter safe, and \\`tests/config.test.ts\\` drives every registered\n// factory through it.',
	'// override receives that record in the same position. A \\`UserConfig\\` declares neither\n// \\`command\\` nor \\`mode\\`, so a value carrying both is treated as Vitest\'s invocation\n// record rather than an override. The merge returns the base unchanged and reports\n// nothing. The \\`tests/config.test.ts\\` file drives every registered factory through it.',
)
updated = updated.replace(
	'// add a second copy of a plugin the base already declares. One plugin per name is\n// selected after merging, each name keeping the position its first instance held and\n// its last instance\'s value, so an override replaces a plugin the base carries rather\n// than adding one beside it.',
	'// add a second copy of a plugin the base already declares. Only named top-level\n// objects replace a base plugin of the same name, in the base\'s position. Remaining\n// caller entries append in their written order; the caller\'s own entries never merge\n// with each other. Nested arrays, promises, falsy entries, and anonymous objects pass\n// through unchanged. An override cannot remove a base plugin.',
)
writeFileSync(templatePath, updated)
const comment = '\t\t\t// Restate Vite\'s default because appBrowser sets 0; the single-file plugin\n\t\t\t// overwrites this while useRecommendedBuildConfig stays true.\n'
writeFileSync(compilerPath, readFileSync(compilerPath, 'utf8').replace('\t\t\tassetsInlineLimit: 4096,', comment + '\t\t\tassetsInlineLimit: 4096,'))
writeFileSync(testPath, readFileSync(testPath, 'utf8').replace(previous, replacement).replace('\t\t\tassetsInlineLimit: 4096,', comment + '\t\t\tassetsInlineLimit: 4096,'))
