import type { TemplateDefinition } from '@orkestrel/template'

/**
 * The shipped, versioned `TemplateDefinition` data behind every
 * `template`-origin artifact `blueprintToPlan` renders.
 *
 * @remarks
 * Derived from `scripts/scaffold.sh`'s §C generated-minimal stubs, translated
 * from bash `${name}` / `${pascal}` interpolation to `{{name}}` /
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
				Object.freeze({ name: 'factories', description: 'The rendered Factories surface table.' }),
				Object.freeze({ name: 'entities', description: 'The rendered Entities surface table.' }),
				Object.freeze({ name: 'types', description: 'The rendered Types surface table.' }),
			]),
			content: `# {{pascal}}

> TODO: one-paragraph description of \`{{pascal}}\` — what it is, what problem it
> solves, and how it fits the \`@orkestrel\` line. Source: [\`src/core\`](../../src/core).
> Surfaced through the \`@src/core\` barrel.

## Surface

TODO: a short intro line, then a minimal usage example:

\`\`\`ts
import { create{{pascal}} } from '@src/core'

${CONST_KEYWORD} instance = create{{pascal}}({ id: 'example' })
\`\`\`

### Factories

{{factories}}

### Entities

{{entities}}

### Types

{{types}}

## Tests

- [\`tests/src/core/{{pascal}}.test.ts\`](../../tests/src/core/{{pascal}}.test.ts) —
  id assignment (explicit / generated) and independence across instances.
- [\`tests/src/core/factories.test.ts\`](../../tests/src/core/factories.test.ts) —
  \`create{{pascal}}\` returns a working \`{{pascal}}Interface\` backed by a real \`{{pascal}}\`.

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
		entityTest: Object.freeze({
			id: 'entityTest',
			name: 'entityTest',
			summary: 'The generated-minimal `tests/src/core/{Pascal}.test.ts` stub.',
			category: 'tests',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `import type { {{pascal}}Interface } from '@src/core'
import { {{pascal}} } from '@src/core'
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
			summary: 'The generated-minimal `tests/src/core/factories.test.ts` stub.',
			category: 'tests',
			placeholders: Object.freeze([
				Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			]),
			content: `import type { {{pascal}}Interface } from '@src/core'
import { create{{pascal}}, {{pascal}} } from '@src/core'
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
	} as const)
})()
