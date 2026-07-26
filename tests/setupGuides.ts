import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSource, parseManifest } from '@orkestrel/guide'

/** Repository root used by guide/source parity tests. */
export const GUIDE_ROOT = fileURLToPath(new URL('../', import.meta.url))

/** Repository roots whose TypeScript and Markdown files participate in guide parity. */
export const GUIDE_WALK_DIRECTORIES: readonly string[] = Object.freeze(['src', 'guides', 'tests'])

/** Package and workspace aliases whose fenced imports are checked against real exports. */
export const SELF_SPECIFIERS: readonly string[] = Object.freeze([
	'@orkestrel/scaffold',
	'@orkestrel/scaffold/server',
	'@src/core',
	'@src/server',
])

/** Source modules represented by each self-owned import specifier. */
export const SPECIFIER_MODULES: Readonly<Record<string, string>> = Object.freeze({
	'@orkestrel/scaffold': 'src/core',
	'@orkestrel/scaffold/server': 'src/server',
	'@src/core': 'src/core',
	'@src/server': 'src/server',
})

/** Cached source readers used by repeated fenced-import checks. */
export const SPECIFIER_SOURCES = new Map<string, ReturnType<typeof createSource>>()

/** Recursively collect one guide-parity source directory. */
export function walkGuideDirectory(
	root: string,
	directory: string,
	files: Record<string, string>,
): void {
	for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
		const relative = `${directory}/${entry.name}`
		if (entry.isDirectory()) {
			walkGuideDirectory(root, relative, files)
			continue
		}
		if (/^app\/(?:browser|server)\/main\.ts$/u.test(relative)) continue
		if (!/\.(?:cts|md|mts|ts|tsx)$/u.test(entry.name)) continue
		files[relative] = readFileSync(join(root, relative), 'utf8')
	}
}

/** Read all source text used by guide/source parity. */
export function readGuideWorkspace(
	root: string,
	directories: readonly string[],
): Readonly<Record<string, string>> {
	const files: Record<string, string> = {}
	for (const directory of directories) walkGuideDirectory(root, directory, files)
	files['AGENTS.md'] = readFileSync(join(root, 'AGENTS.md'), 'utf8')
	return Object.freeze(files)
}

/** Complete immutable source corpus used by guide/source parity. */
export const GUIDE_FILES = readGuideWorkspace(GUIDE_ROOT, GUIDE_WALK_DIRECTORIES)

/** Read one required guide-parity source file. */
export function readGuideText(relative: string): string {
	const text = GUIDE_FILES[relative]
	if (text === undefined) throw new Error(`Missing file: ${relative}`)
	return text
}

/** Parsed guide manifest shared by every guide/source parity assertion. */
export const GUIDE_MANIFEST = parseManifest(readGuideText('guides/README.md'), 'guides')

/** Resolve the exported names represented by one self-owned import specifier. */
export function exportsFor(specifier: string): readonly string[] {
	const module = SPECIFIER_MODULES[specifier]
	if (module === undefined) return []
	let source = SPECIFIER_SOURCES.get(module)
	if (source === undefined) {
		source = createSource({ files: GUIDE_FILES, module })
		SPECIFIER_SOURCES.set(module, source)
	}
	return source.exports().map((symbol) => symbol.name)
}
