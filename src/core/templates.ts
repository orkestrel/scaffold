import type { TemplateDefinition } from '@orkestrel/template'

/**
 * The shipped, versioned `TemplateDefinition` data behind every
 * `template`-origin artifact `blueprintToPlan` renders.
 *
 * @remarks
 * The generated-minimal stub prose/source, expressed as `{{name}}` /
 * `{{pascal}}` `{{token}}` placeholders for `@orkestrel/template`'s pure
 * `fillTemplate` LEAF. Only genuinely templated PROSE / source artifacts live
 * here — the token-collision boundary (AGENTS §14, this guide's Contract
 * invariant 3) keeps every STRUCTURAL file (`package.json`, the tsconfigs,
 * the vite configs) `computed` inside `blueprintToPlan` instead, so a literal
 * `{{…}}` in a config can never be mistaken for a placeholder. A convention
 * change here is a version bump of this package, never a hand-edit of a
 * scaffolded repo's copy.
 */
export const TEMPLATES: Readonly<Record<string, TemplateDefinition>> = (() => {
	// The `content` strings below are rendered FILE TEXT (README / guide / stub
	// prose and source), so every embedded declaration keyword is interpolated
	// rather than typed literally at column 0 — the doc↔source parity scan
	// (AGENTS §22) reads this file's own source lines, and a flush-left
	// `export function foo` inside a template string is indistinguishable from
	// a real module-scope export to that line-based scan. Interpolating the
	// keyword keeps the emitted bytes identical while keeping this file's own
	// declaration surface exactly the one export it documents.
	const EXPORT_KEYWORD = 'export'
	const CONST_KEYWORD = 'const'
	const IMPORT_KEYWORD = 'import'
	const FUNCTION_KEYWORD = 'function'
	return Object.freeze({
		readme: Object.freeze({
			id: 'readme',
			name: 'readme',
			summary: "The package root README — install, usage, and the guide's pointer.",
			category: 'docs',
			placeholders: Object.freeze([
				Object.freeze({ name: 'name', description: 'The lowercase-hyphen package name.' }),
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `# @orkestrel/{{name}}

TODO: one-line description. Part of the \`@orkestrel\` line.

## Install

\`\`\`sh
npm install @orkestrel/{{name}}
\`\`\`

## Usage

\`\`\`ts
import { create{{pascal}} } from '@orkestrel/{{name}}'

${CONST_KEYWORD} instance = create{{pascal}}({ id: 'example' })
\`\`\`

## Guide

For the full surface, see [\`guides/src/{{name}}.md\`](guides/src/{{name}}.md).

## License

MIT © [Orkestrel](https://github.com/orkestrel) — see [LICENSE](./LICENSE).
`,
		}),
		guide: Object.freeze({
			id: 'guide',
			name: 'guide',
			summary: "The package's own guide stub, with its Surface tables filled in.",
			category: 'guides',
			placeholders: Object.freeze([
				Object.freeze({ name: 'name', description: 'The lowercase-hyphen package name.' }),
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
				Object.freeze({
					name: 'primary',
					description: 'The primary Surface (`core` when declared, else the sole surface).',
				}),
				Object.freeze({
					name: 'source',
					description: 'The rendered "Source: …" fragment over every declared surface.',
				}),
				Object.freeze({
					name: 'barrel',
					description: 'The rendered "Surfaced through …" sentence.',
				}),
				Object.freeze({
					name: 'tests',
					description: 'The rendered per-surface Tests section body.',
				}),
				Object.freeze({ name: 'factories', description: 'The rendered Factories surface table.' }),
				Object.freeze({ name: 'entities', description: 'The rendered Entities surface table.' }),
				Object.freeze({ name: 'types', description: 'The rendered Types surface table.' }),
			]),
			content: `# {{pascal}}

> TODO: one-paragraph description of \`{{pascal}}\` — what it is, what problem it
> solves, and how it fits the \`@orkestrel\` line. Source: {{source}}.
> {{barrel}}

## Surface

TODO: a short intro line, then a minimal usage example:

\`\`\`ts
import { create{{pascal}} } from '@orkestrel/{{name}}'

${CONST_KEYWORD} instance = create{{pascal}}({ id: 'example' })
\`\`\`

### Factories

{{factories}}

### Entities

{{entities}}

### Types

{{types}}

## Tests

{{tests}}

## See also

- [\`AGENTS.md\`](../../AGENTS.md) — the rules.
- [\`guide.md\`](guide.md) — the mirrored guide for \`@orkestrel/guide\`, the
  devDependency powering this repo's guides-parity test suite.
- [\`README.md\`](../README.md) — the guides index.
`,
		}),
		guidesReadme: Object.freeze({
			id: 'guidesReadme',
			name: 'guidesReadme',
			summary: 'The dual-axis guides index — by concept and by directory.',
			category: 'guides',
			placeholders: Object.freeze([
				Object.freeze({ name: 'concept', description: 'The rendered by-concept index table.' }),
				Object.freeze({
					name: 'directory',
					description: 'The rendered by-directory index table.',
				}),
			]),
			content: `# Guides

A dual-axis index into this repository's guides — by concept, and by directory (AGENTS §22).

## By concept

{{concept}}

## By directory

{{directory}}

## Dependency reference

[\`src/guide.md\`](src/guide.md) is a byte-identical mirror of the guide for
\`@orkestrel/guide\` — the devDependency powering this repo's guides-parity test
suite (\`tests/guides/src/parity.test.ts\`). It documents **that package's**
surface (\`Guide\` / \`Source\`, the manifest and comparison helpers), not anything
sourced in this repo; it is kept here so a reader of the parity suite can see
the primitives it is built from without leaving this guide set.

## See also

- [\`AGENTS.md\`](../AGENTS.md) — the rules; §22 documentation-as-contracts.
`,
		}),
		types: Object.freeze({
			id: 'types',
			name: 'types',
			summary: 'The generated-minimal `src/core/types.ts` stub.',
			category: 'source',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `/** Options for \`create{{pascal}}\`. */
${EXPORT_KEYWORD} interface {{pascal}}Options {
	readonly id?: string
}

/** A working \`{{pascal}}\` — pure data, no behavior. */
${EXPORT_KEYWORD} interface {{pascal}}Interface {
	readonly id: string
}
`,
		}),
		entity: Object.freeze({
			id: 'entity',
			name: 'entity',
			summary: 'The generated-minimal `src/core/{Pascal}.ts` entity stub.',
			category: 'source',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `import type { {{pascal}}Interface, {{pascal}}Options } from './types.js'

/**
 * A working \`{{pascal}}\` — pure data, no behavior.
 *
 * @example
 * \`\`\`ts
 * const instance = new {{pascal}}({ id: 'example' })
 * \`\`\`
 */
${EXPORT_KEYWORD} class {{pascal}} implements {{pascal}}Interface {
	readonly id: string

	constructor(options: {{pascal}}Options = {}) {
		this.id = typeof options.id === 'string' ? options.id : crypto.randomUUID()
	}
}
`,
		}),
		factories: Object.freeze({
			id: 'factories',
			name: 'factories',
			summary: 'The generated-minimal `src/core/factories.ts` stub.',
			category: 'source',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `import type { {{pascal}}Interface, {{pascal}}Options } from './types.js'
import { {{pascal}} } from './{{pascal}}.js'

/**
 * Create a \`{{pascal}}Interface\`.
 *
 * @param options - An optional \`id\` (defaults to a random UUID)
 * @returns A working {@link {{pascal}}Interface}
 *
 * @example
 * \`\`\`ts
 * import { create{{pascal}} } from '@src/core'
 *
 * ${CONST_KEYWORD} instance = create{{pascal}}({ id: 'example' })
 * \`\`\`
 */
${EXPORT_KEYWORD} function create{{pascal}}(options: {{pascal}}Options = {}): {{pascal}}Interface {
	return new {{pascal}}(options)
}
`,
		}),
		index: Object.freeze({
			id: 'index',
			name: 'index',
			summary: 'The generated-minimal `src/core/index.ts` barrel stub.',
			category: 'source',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `export type * from './types.js'
export * from './{{pascal}}.js'
export * from './factories.js'
`,
		}),
		setup: Object.freeze({
			id: 'setup',
			name: 'setup',
			summary: 'The generated-minimal `tests/setup.ts` recorder helper — no placeholders.',
			category: 'tests',
			placeholders: Object.freeze([]),
			content: `// ── Call recorder (a real callback, not a mock) ──────────────────────────────
//
// AGENTS §16.1: when a test only needs to count calls or inspect arguments, use a
// recorder — a real listener that records every invocation — rather than a test-
// framework spy. \`handler\` is a genuine callback; \`calls\` is each invocation's
// argument tuple, in order.

/** A real call-recording callback over an argument tuple (AGENTS §16.1). */
${EXPORT_KEYWORD} interface TestRecorderInterface<TArgs extends readonly unknown[]> {
	readonly calls: readonly TArgs[]
	readonly count: number
	readonly handler: (...args: TArgs) => void
	clear(): void
}

/**
 * Create a {@link TestRecorderInterface} — a real callback that records each
 * invocation's arguments, for asserting what fired and with what (AGENTS §16.1).
 *
 * @typeParam TArgs - The argument tuple the recorded handler receives
 * @returns A recorder whose \`handler\` records into \`calls\`
 */
${EXPORT_KEYWORD} function createRecorder<TArgs extends readonly unknown[]>(): TestRecorderInterface<TArgs> {
	const calls: TArgs[] = []
	return {
		get calls() {
			return calls
		},
		get count() {
			return calls.length
		},
		handler(...args: TArgs) {
			calls.push(args)
		},
		clear() {
			calls.length = 0
		},
	}
}
`,
		}),
		setupServer: Object.freeze({
			id: 'setupServer',
			name: 'setupServer',
			summary: 'The generated-minimal `tests/setupServer.ts` node-only helper — no placeholders.',
			category: 'tests',
			placeholders: Object.freeze([]),
			content: `// AGENTS §16.1: node-only test helpers anchor \`node:fs\` fixture loaders to
// this workspace root rather than a relative path, so a loader works
// regardless of the running test file's directory depth. Add server-specific
// fixtures/helpers here as this surface grows beyond the shared recorder in
// tests/setup.ts.

${IMPORT_KEYWORD} { fileURLToPath } from 'node:url'

/** The workspace root, for anchoring \`node:fs\` fixture loaders (AGENTS §16.1). */
${EXPORT_KEYWORD} ${CONST_KEYWORD} WORKSPACE_ROOT = fileURLToPath(new URL('../', import.meta.url))
`,
		}),
		setupBrowser: Object.freeze({
			id: 'setupBrowser',
			name: 'setupBrowser',
			summary: 'The generated-minimal `tests/setupBrowser.ts` DOM-only helper — no placeholders.',
			category: 'tests',
			placeholders: Object.freeze([]),
			content: `// AGENTS §16.1: DOM/browser-only test helpers (builders, CSS assertion
// primitives) go here as this surface grows fixtures beyond the shared
// recorder in tests/setup.ts.

// TODO: [Browser] add browser/DOM test helpers as this surface grows.
export {}
`,
		}),
		entityTest: Object.freeze({
			id: 'entityTest',
			name: 'entityTest',
			summary: 'The generated-minimal `tests/src/<surface>/{Pascal}.test.ts` stub.',
			category: 'tests',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
				Object.freeze({
					name: 'surface',
					description: 'The owning Surface (`core`/`browser`/`server`).',
				}),
			]),
			content: `import type { {{pascal}}Interface } from '@src/{{surface}}'
import { {{pascal}} } from '@src/{{surface}}'
import { describe, expect, it } from 'vitest'

// The {{pascal}} entity — id assignment (explicit / generated) and independence
// across instances. Factory-level assertions live in factories.test.ts.

describe('{{pascal}}', () => {
	it('round-trips an explicit id', () => {
		const instance: {{pascal}}Interface = new {{pascal}}({ id: 'example' })

		expect(instance.id).toBe('example')
	})

	it('generates a non-empty id when none is given', () => {
		const instance = new {{pascal}}()

		expect(typeof instance.id).toBe('string')
		expect(instance.id.length).toBeGreaterThan(0)
	})

	it('gives distinct instances distinct generated ids', () => {
		const a = new {{pascal}}()
		const b = new {{pascal}}()

		expect(a.id).not.toBe(b.id)
	})
})
`,
		}),
		factoriesTest: Object.freeze({
			id: 'factoriesTest',
			name: 'factoriesTest',
			summary: 'The generated-minimal `tests/src/<surface>/factories.test.ts` stub.',
			category: 'tests',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
				Object.freeze({
					name: 'surface',
					description: 'The owning Surface (`core`/`browser`/`server`).',
				}),
			]),
			content: `import type { {{pascal}}Interface } from '@src/{{surface}}'
import { create{{pascal}}, {{pascal}} } from '@src/{{surface}}'
import { describe, expect, expectTypeOf, it } from 'vitest'

// The {{pascal}} factory — that \`create{{pascal}}\` returns a working {{pascal}}Interface
// backed by a real {{pascal}} instance.

describe('create{{pascal}}', () => {
	it('returns a {{pascal}} instance', () => {
		const instance = create{{pascal}}()

		expect(instance).toBeInstanceOf({{pascal}})
	})

	it('honors the id option', () => {
		${CONST_KEYWORD} instance = create{{pascal}}({ id: 'example' })

		expect(instance.id).toBe('example')
	})

	it('create{{pascal}} returns a {{pascal}}Interface', () => {
		expectTypeOf(create{{pascal}}()).toEqualTypeOf<{{pascal}}Interface>()
	})
})
`,
		}),
		parityTest: Object.freeze({
			id: 'parityTest',
			name: 'parityTest',
			summary: 'The consumer-side guides-parity drop-in — `tests/guides/src/parity.test.ts`.',
			category: 'tests',
			placeholders: Object.freeze([
				Object.freeze({ name: 'name', description: 'The lowercase-hyphen package name.' }),
				Object.freeze({
					name: 'specifiers',
					description:
						'The computed SELF_SPECIFIERS / SPECIFIER_MODULES / exportsFor block, one shape for every surface count.',
				}),
			]),
			content: `// The consumer-side guides-parity drop-in: runs \`@orkestrel/guide\`'s
// checks against this repo's own \`guides/README.md\` manifest.

${IMPORT_KEYWORD} { describe, expect, it } from 'vitest'
${IMPORT_KEYWORD} { readdirSync, readFileSync } from 'node:fs'
${IMPORT_KEYWORD} { fileURLToPath } from 'node:url'
${IMPORT_KEYWORD} { join } from 'node:path'
${IMPORT_KEYWORD} {
	createGuide,
	createSource,
	fenceImports,
	findMissing,
	findUnexampled,
	isExternalLink,
	missingSymbols,
	parseManifest,
	resolveLink,
	symbolKey,
} from '@orkestrel/guide'

${CONST_KEYWORD} ROOT = fileURLToPath(new URL('../../../', import.meta.url))
${CONST_KEYWORD} WALK_DIRS = ['src', 'guides', 'tests']

${FUNCTION_KEYWORD} walk(dir: string, acc: Record<string, string>): void {
	for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
		const relative = \`\${dir}/\${entry.name}\`
		if (entry.isDirectory()) {
			walk(relative, acc)
			continue
		}
		if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.md')) continue
		acc[relative] = readFileSync(join(ROOT, relative), 'utf8')
	}
}

${CONST_KEYWORD} files: Record<string, string> = {}
for (const dir of WALK_DIRS) walk(dir, files)
files['AGENTS.md'] = readFileSync(join(ROOT, 'AGENTS.md'), 'utf8')

${FUNCTION_KEYWORD} readText(relative: string): string {
	const text = files[relative]
	if (text === undefined) throw new Error(\`Missing file: \${relative}\`)
	return text
}

${CONST_KEYWORD} manifest = parseManifest(readText('guides/README.md'), 'guides')

{{specifiers}}

it('manifest lists at least one guide', () => {
	expect(manifest.length).toBeGreaterThan(0)
})

for (const entry of manifest) {
	const guide = createGuide(readText(entry.spec))
	const source = createSource({ files, module: entry.source })

	describe(\`\${entry.concept}\`, () => {
		it('extracts a non-empty documented surface', () => {
			expect(guide.surface().length).toBeGreaterThan(0)
		})
		it('documents every source export', () => {
			expect(missingSymbols(source.exports(), guide.surface())).toEqual([])
		})
		it('documents only real exports', () => {
			expect(missingSymbols(guide.surface(), source.exports())).toEqual([])
		})

		it('exposes no hidden module-scope declarations', () => {
			expect(source.hidden().map(symbolKey)).toEqual([])
		})

		for (const group of guide.methods()) {
			const members = source.methods(group.interface)
			const entity = group.interface.replace(/Interface$/, '')
			describe(\`\${group.interface}\`, () => {
				it('documents at least one method', () => {
					expect(group.methods.length).toBeGreaterThan(0)
				})
				it('documents every interface method', () => {
					expect(findMissing(members, group.methods)).toEqual([])
				})
				it('documents no phantom method', () => {
					expect(findMissing(group.methods, members)).toEqual([])
				})
				it(\`\${entity} exposes no undocumented method\`, () => {
					const extra =
						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
					expect(extra).toEqual([])
				})
			})
		}

		it('documents an example for every Surface function', () => {
			const fences = guide.patterns()
			const names = guide
				.surface()
				.filter((symbol) => symbol.kind === 'function')
				.map((symbol) => symbol.name)
			expect(findUnexampled(names, fences, source.examples())).toEqual([])
		})

		for (const group of guide.methods()) {
			const entity = group.interface.replace(/Interface$/, '')
			describe(\`\${group.interface} examples\`, () => {
				it('documents an example for every method', () => {
					const fences = guide.patterns()
					const examples =
						entity === group.interface
							? source.examples(group.interface)
							: source.examples(group.interface).concat(source.examples(entity))
					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
				})
			})
		}

		it('imports only real exports in every \`\`\`ts fence', () => {
			for (const fence of guide.patterns()) {
				for (const { specifier, names } of fenceImports(fence)) {
					if (!SELF_SPECIFIERS.includes(specifier)) continue
					expect(findMissing(names, exportsFor(specifier))).toEqual([])
				}
			}
		})

		it('resolves every relative link', () => {
			const broken = guide
				.links()
				.filter((href) => !isExternalLink(href))
				.map((href) => resolveLink(entry.spec, href))
				.filter((path) => !source.exists(path))
			expect(broken).toEqual([])
		})
		it('links only to test files that exist', () => {
			const missing = guide
				.tests()
				.map((href) => resolveLink(entry.spec, href))
				.filter((path) => !source.exists(path))
			expect(missing).toEqual([])
		})
	})
}
`,
		}),
	} as const)
})()
