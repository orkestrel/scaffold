import type { TemplateDefinition } from '@orkestrel/template'
import { CONST_KEYWORD, EXPORT_KEYWORD, FUNCTION_KEYWORD, IMPORT_KEYWORD } from './constants.js'

/**
 * The shipped, versioned `TemplateDefinition` data behind every
 * `template`-origin artifact `blueprintToPlan` renders.
 *
 * @remarks
 * The generated-minimal starter prose/source, expressed as `{{name}}` /
 * `{{pascal}}` `{{token}}` placeholders for `@orkestrel/template`'s pure
 * `fillTemplate` LEAF. Only genuinely templated PROSE / source artifacts live
 * here — the token-collision boundary (AGENTS §14, this guide's Contract
 * invariant 3) keeps every STRUCTURAL file (`package.json`, the tsconfigs,
 * the vite configs) `computed` inside `blueprintToPlan` instead, so a literal
 * `{{…}}` in a config can never be mistaken for a placeholder. A convention
 * change here is a version bump of this package, never a hand-edit of a
 * scaffolded repo's copy.
 */
export const TEMPLATES: Readonly<Record<string, TemplateDefinition>> = Object.freeze({
	// The `content` strings below are rendered FILE TEXT (README / guide / stub
	// prose and source), so every embedded declaration keyword is interpolated
	// rather than typed literally at column 0 — the doc↔source parity scan
	// (AGENTS §22) reads this file's own source lines, and a flush-left
	// `export function foo` inside a template string is indistinguishable from
	// a real module-scope export to that line-based scan. Interpolating the
	// keyword keeps the emitted bytes identical while keeping this file's own
	// declaration surface exactly the one export it documents.
	readme: Object.freeze({
		id: 'readme',
		name: 'readme',
		summary: "The package root README — install, usage, and the guide's pointer.",
		category: 'docs',
		placeholders: Object.freeze([
			Object.freeze({ name: 'name', description: 'The lowercase-hyphen package name.' }),
			Object.freeze({ name: 'title', description: 'The workspace title.' }),
			Object.freeze({ name: 'description', description: 'The workspace description.' }),
			Object.freeze({ name: 'install', description: 'The install or private-app note.' }),
			Object.freeze({ name: 'usage', description: 'A complete starter usage example.' }),
		]),
		content: `# {{title}}

{{description}}

{{install}}

## Usage

{{usage}}

## Guide

For the full surface, see [\`guides/src/{{name}}.md\`](guides/src/{{name}}.md).

## License

MIT © [Orkestrel](https://github.com/orkestrel) — see [LICENSE](./LICENSE).
`,
	}),
	guide: Object.freeze({
		id: 'guide',
		name: 'guide',
		summary: "The package's complete guide, with its API Surface tables filled in.",
		category: 'guides',
		placeholders: Object.freeze([
			Object.freeze({ name: 'name', description: 'The lowercase-hyphen package name.' }),
			Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
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
				description: 'The rendered per-environment Tests section body.',
			}),
			Object.freeze({ name: 'description', description: 'The complete guide overview.' }),
			Object.freeze({ name: 'usage', description: 'Examples for every public function.' }),
			Object.freeze({ name: 'factories', description: 'The rendered Factories surface table.' }),
			Object.freeze({ name: 'entities', description: 'The rendered Entities surface table.' }),
			Object.freeze({ name: 'parsers', description: 'The rendered Parsers surface table.' }),
			Object.freeze({ name: 'guards', description: 'The rendered Guards surface table.' }),
			Object.freeze({ name: 'handlers', description: 'The rendered Handlers surface table.' }),
			Object.freeze({ name: 'errors', description: 'The rendered Errors surface table.' }),
			Object.freeze({ name: 'types', description: 'The rendered Types surface table.' }),
			Object.freeze({ name: 'aliases', description: 'The rendered Aliases surface table.' }),
			Object.freeze({ name: 'constants', description: 'The rendered Constants surface table.' }),
			Object.freeze({
				name: 'methods',
				description: 'Application method contracts and examples.',
			}),
		]),
		content: `# {{pascal}}

> {{description}} Source: {{source}}.
> {{barrel}}

## Surface

{{usage}}

### Factories

{{factories}}

### Entities

{{entities}}

### Parsers

{{parsers}}

### Guards

{{guards}}

### Handlers

{{handlers}}

### Errors

{{errors}}

### Types

{{types}}

### Aliases

{{aliases}}

### Constants

{{constants}}{{methods}}

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

A dual-axis index into this repository's guides — by concept, and by directory, following the
documentation contract in [\`.claude/rules/documentation.md\`](../.claude/rules/documentation.md).

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

- [\`AGENTS.md\`](../AGENTS.md) and [\`.claude/rules/documentation.md\`](../.claude/rules/documentation.md) — the repository rules and documentation contract.
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
	readonly id: string
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
			Object.freeze({
				name: 'typeImport',
				description: 'The formatter-stable entity contract type import.',
			}),
		]),
		content: `{{typeImport}}

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

	constructor(options: {{pascal}}Options) {
		this.id = options.id
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
			Object.freeze({
				name: 'signature',
				description: 'The width-stable generated factory signature.',
			}),
			Object.freeze({
				name: 'typeImport',
				description: 'The formatter-stable factory contract type import.',
			}),
			Object.freeze({
				name: 'entityImport',
				description: 'The formatter-stable factory entity import.',
			}),
		]),
		content: `{{typeImport}}
{{entityImport}}

/**
 * Create a \`{{pascal}}Interface\`.
 *
 * @param options - The required entity identity.
 * @returns A working {@link {{pascal}}Interface}
 *
 * @example
 * \`\`\`ts
 * import { create{{pascal}} } from '@src/core'
 *
 * ${CONST_KEYWORD} instance = create{{pascal}}({ id: 'example' })
 * \`\`\`
 */
${EXPORT_KEYWORD} {{signature}} {
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
		content: `export * from './types.js'
export * from './{{pascal}}.js'
export * from './factories.js'
`,
	}),
	appCoreTypes: Object.freeze({
		id: 'appCoreTypes',
		name: 'appCoreTypes',
		summary: 'The host-independent application contract.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `/** A rejected shared application boundary. */
${EXPORT_KEYWORD} type ApplicationErrorCode = 'CONFIG'

/** Diagnostic context attached to an application boundary error. */
${EXPORT_KEYWORD} interface ApplicationErrorContext {
	readonly cause?: unknown
	readonly value?: unknown
}

/** The shared identity of the application. */
${EXPORT_KEYWORD} interface Application {
	readonly name: string
}
`,
	}),
	appCoreConstants: Object.freeze({
		id: 'appCoreConstants',
		name: 'appCoreConstants',
		summary: 'The application-wide constants.',
		category: 'source',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'nameLiteral',
				description: 'The JSON-serialized application name.',
			}),
		]),
		content: `/** The application name shared by every host environment. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_NAME = {{nameLiteral}}

/** Maximum Unicode code units accepted by an application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_APPLICATION_NAME_LENGTH = 203

/** Maximum raw Unicode code units inspected before trimming an application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_APPLICATION_NAME_INPUT_LENGTH = 255
`,
	}),
	appCoreErrors: Object.freeze({
		id: 'appCoreErrors',
		name: 'appCoreErrors',
		summary: 'The host-independent application boundary error.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { ApplicationErrorCode, ApplicationErrorContext } from './types.js'

/** A rejected shared application configuration value. */
${EXPORT_KEYWORD} class ApplicationError extends Error {
	readonly code: ApplicationErrorCode
	readonly context?: ApplicationErrorContext

	constructor(code: ApplicationErrorCode, message: string, context?: ApplicationErrorContext) {
		super(message)
		this.name = 'ApplicationError'
		this.code = code
		if (context !== undefined) this.context = context
	}
}

/**
 * Narrow a caught value to an application boundary error.
 *
 * @param value - The caught value to inspect.
 * @returns True only for ApplicationError instances.
 *
 * @example
 * \`\`\`ts
 * import { isApplicationError } from '@app/core'
 *
 * isApplicationError(new Error('plain')) // false
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} isApplicationError(value: unknown): value is ApplicationError {
	try {
		return value instanceof ApplicationError
	} catch {
		return false
	}
}
`,
	}),
	appCoreParsers: Object.freeze({
		id: 'appCoreParsers',
		name: 'appCoreParsers',
		summary: 'The host-independent application value parsers.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import { MAX_APPLICATION_NAME_INPUT_LENGTH, MAX_APPLICATION_NAME_LENGTH } from './constants.js'
import { ApplicationError } from './errors.js'

/**
 * Parse a bounded, non-empty application name.
 *
 * @param value - The caller-supplied name.
 * @returns The trimmed application name.
 * @throws ApplicationError with code CONFIG for malformed values.
 *
 * @example
 * \`\`\`ts
 * import { parseApplicationName } from '@app/core'
 *
 * parseApplicationName(' example ') // 'example'
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} parseApplicationName(value: unknown): string {
	if (typeof value !== 'string' || value.length > MAX_APPLICATION_NAME_INPUT_LENGTH) {
		throw new ApplicationError('CONFIG', 'Application name must be a string', { value })
	}
	const name = value.trim()
	if (name.length === 0 || name.length > MAX_APPLICATION_NAME_LENGTH) {
		throw new ApplicationError(
			'CONFIG',
			\`Application name must contain 1 through \${MAX_APPLICATION_NAME_LENGTH} characters\`,
			{ value },
		)
	}
	return name
}
`,
	}),
	appCoreFactories: Object.freeze({
		id: 'appCoreFactories',
		name: 'appCoreFactories',
		summary: 'The host-independent application factory.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { Application } from './types.js'
import { APP_NAME } from './constants.js'
import { parseApplicationName } from './parsers.js'

/**
 * Create the shared application identity.
 *
 * @param name - The application name.
 * @returns A fresh immutable application value.
 *
 * @example
 * \`\`\`ts
 * import { createApplication } from '@app/core'
 *
 * ${CONST_KEYWORD} application = createApplication('example')
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} createApplication(name: string = APP_NAME): Application {
	return Object.freeze({ name: parseApplicationName(name) })
}
`,
	}),
	appCoreIndex: Object.freeze({
		id: 'appCoreIndex',
		name: 'appCoreIndex',
		summary: 'The application core barrel.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `export * from './types.js'
export * from './constants.js'
export * from './errors.js'
export * from './parsers.js'
export * from './factories.js'
`,
	}),
	appBrowserTypes: Object.freeze({
		id: 'appBrowserTypes',
		name: 'appBrowserTypes',
		summary: 'The browser application options.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `/** A rejected browser application boundary. */
${EXPORT_KEYWORD} type BrowserApplicationErrorCode = 'CONFIG'

/** Diagnostic context attached to a browser application boundary error. */
${EXPORT_KEYWORD} interface BrowserApplicationErrorContext {
	readonly cause?: unknown
	readonly value?: unknown
}

/** Options for creating the Vue browser application. */
${EXPORT_KEYWORD} interface BrowserApplicationOptions {
	readonly name?: string
}
`,
	}),
	appBrowserConstants: Object.freeze({
		id: 'appBrowserConstants',
		name: 'appBrowserConstants',
		summary: 'The browser application constants.',
		category: 'source',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'nameConstant',
				description: 'The optional browser-only APP_NAME declaration.',
			}),
		]),
		content: `{{nameConstant}}/** Maximum Unicode code units accepted by a browser application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_BROWSER_APPLICATION_NAME_LENGTH = 203

/** Maximum raw Unicode code units inspected before trimming a browser application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_BROWSER_APPLICATION_NAME_INPUT_LENGTH = 255
`,
	}),
	appBrowserErrors: Object.freeze({
		id: 'appBrowserErrors',
		name: 'appBrowserErrors',
		summary: 'The browser application boundary error.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { BrowserApplicationErrorCode, BrowserApplicationErrorContext } from './types.js'

/** A rejected browser application configuration value. */
${EXPORT_KEYWORD} class BrowserApplicationError extends Error {
	readonly code: BrowserApplicationErrorCode
	readonly context?: BrowserApplicationErrorContext

	constructor(
		code: BrowserApplicationErrorCode,
		message: string,
		context?: BrowserApplicationErrorContext,
	) {
		super(message)
		this.name = 'BrowserApplicationError'
		this.code = code
		if (context !== undefined) this.context = context
	}
}

/**
 * Narrow a caught value to a browser application boundary error.
 *
 * @param value - The caught value to inspect.
 * @returns True only for BrowserApplicationError instances.
 *
 * @example
 * \`\`\`ts
 * import { isBrowserApplicationError } from '@app/browser'
 *
 * isBrowserApplicationError(new Error('plain')) // false
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} isBrowserApplicationError(value: unknown): value is BrowserApplicationError {
	try {
		return value instanceof BrowserApplicationError
	} catch {
		return false
	}
}
`,
	}),
	appBrowserParsers: Object.freeze({
		id: 'appBrowserParsers',
		name: 'appBrowserParsers',
		summary: 'The browser application options parser.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { BrowserApplicationOptions } from './types.js'
import {
	MAX_BROWSER_APPLICATION_NAME_INPUT_LENGTH,
	MAX_BROWSER_APPLICATION_NAME_LENGTH,
} from './constants.js'
import { BrowserApplicationError, isBrowserApplicationError } from './errors.js'

/**
 * Parse the browser application options container without invoking caller accessors.
 *
 * @param value - The caller-supplied options value.
 * @returns A fresh options record containing only validated values.
 * @throws BrowserApplicationError with code CONFIG for malformed containers, leaves, or traps.
 *
 * @example
 * \`\`\`ts
 * import { parseBrowserApplicationOptions } from '@app/browser'
 *
 * parseBrowserApplicationOptions({ name: ' example ' }) // { name: 'example' }
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} parseBrowserApplicationOptions(value: unknown): BrowserApplicationOptions {
	if (value === undefined) return {}
	try {
		if (typeof value !== 'object' || value === null || Array.isArray(value)) {
			throw new BrowserApplicationError('CONFIG', 'Browser application options must be an object', {
				value,
			})
		}
		const prototype = Reflect.getPrototypeOf(value)
		if (prototype !== Object.prototype && prototype !== null) {
			throw new BrowserApplicationError(
				'CONFIG',
				'Browser application options must be a plain record',
				{ value },
			)
		}
		const keys = Reflect.ownKeys(value)
		if (keys.some((key) => key !== 'name')) {
			throw new BrowserApplicationError('CONFIG', 'Unknown browser application option', {
				value,
			})
		}
		const descriptor = Reflect.getOwnPropertyDescriptor(value, 'name')
		if (keys.includes('name') && (descriptor === undefined || !Reflect.has(descriptor, 'value'))) {
			throw new BrowserApplicationError(
				'CONFIG',
				'Browser application options must use data properties',
				{ value },
			)
		}
		if (descriptor === undefined || descriptor.value === undefined) return {}
		if (
			typeof descriptor.value !== 'string' ||
			descriptor.value.length > MAX_BROWSER_APPLICATION_NAME_INPUT_LENGTH
		) {
			throw new BrowserApplicationError('CONFIG', 'Browser application name must be a string', {
				value: descriptor.value,
			})
		}
		const name = descriptor.value.trim()
		if (name.length === 0 || name.length > MAX_BROWSER_APPLICATION_NAME_LENGTH) {
			throw new BrowserApplicationError(
				'CONFIG',
				\`Browser application name must contain 1 through \${MAX_BROWSER_APPLICATION_NAME_LENGTH} characters\`,
				{ value: descriptor.value },
			)
		}
		return { name }
	} catch (error) {
		if (isBrowserApplicationError(error)) throw error
		throw new BrowserApplicationError('CONFIG', 'Browser application options could not be read', {
			cause: error,
		})
	}
}
`,
	}),
	appBrowserFactories: Object.freeze({
		id: 'appBrowserFactories',
		name: 'appBrowserFactories',
		summary: 'The Vue browser application factory.',
		category: 'source',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'nameImport',
				description: 'The selected layer import for APP_NAME.',
			}),
		]),
		content: `import type { App } from 'vue'
import type { BrowserApplicationOptions } from './types.js'
import { createApp } from 'vue'
import ApplicationView from './ApplicationView.vue'
{{nameImport}}
import { parseBrowserApplicationOptions } from './parsers.js'

/**
 * Create an unmounted Vue application.
 *
 * @param options - Optional browser application values.
 * @returns A Vue application the caller can mount once.
 *
 * @example
 * \`\`\`ts
 * import { createBrowserApplication } from '@app/browser'
 *
 * createBrowserApplication().mount('#app')
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} createBrowserApplication(options: BrowserApplicationOptions = {}): App<Element> {
	const parsed = parseBrowserApplicationOptions(options)
	return createApp(ApplicationView, { name: parsed.name ?? APP_NAME })
}
`,
	}),
	appBrowserIndex: Object.freeze({
		id: 'appBrowserIndex',
		name: 'appBrowserIndex',
		summary: 'The browser application barrel.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `export * from './types.js'
export * from './constants.js'
export * from './errors.js'
export * from './parsers.js'
export * from './factories.js'
`,
	}),
	appBrowserMain: Object.freeze({
		id: 'appBrowserMain',
		name: 'appBrowserMain',
		summary: 'The browser executable entry.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import { createBrowserApplication } from './index.js'

createBrowserApplication().mount('#app')
`,
	}),
	appBrowserView: Object.freeze({
		id: 'appBrowserView',
		name: 'appBrowserView',
		summary: 'The root Vue component.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `<script setup lang="ts">
defineProps<{ readonly name: string }>()
</script>

<template>
	<main>
		<h1 v-text="name"></h1>
	</main>
</template>
`,
	}),
	appBrowserHtml: Object.freeze({
		id: 'appBrowserHtml',
		name: 'appBrowserHtml',
		summary: 'The browser HTML entry.',
		category: 'source',
		placeholders: Object.freeze([
			Object.freeze({ name: 'name', description: 'The application name.' }),
		]),
		content: `<!doctype html>
<html lang="en">
	<head>
		<meta
			http-equiv="Content-Security-Policy"
			content="base-uri 'none'; object-src 'none'; script-src 'self'; script-src-attr 'none'"
		/>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{{name}}</title>
	</head>
	<body>
		<div id="app"></div>
		<script type="module" src="/main.ts"></script>
	</body>
</html>
`,
	}),
	appBrowserEnv: Object.freeze({
		id: 'appBrowserEnv',
		name: 'appBrowserEnv',
		summary: 'The Vite browser type reference.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'

	const component: DefineComponent
	export default component
}
`,
	}),
	appServerTypes: Object.freeze({
		id: 'appServerTypes',
		name: 'appServerTypes',
		summary: 'The application server contract.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `/** A rejected application server boundary. */
${EXPORT_KEYWORD} type ApplicationServerErrorCode = 'CONFIG' | 'LIFECYCLE'

/** Diagnostic context attached to an application server boundary error. */
${EXPORT_KEYWORD} interface ApplicationServerErrorContext {
	readonly cause?: unknown
	readonly value?: unknown
}

/** Options for creating an application server. */
${EXPORT_KEYWORD} interface ApplicationServerOptions {
	readonly host?: string
	readonly port?: number
	readonly timeout?: number
}

/** A lifecycle-safe application server. */
${EXPORT_KEYWORD} interface ApplicationServerInterface {
	readonly host: string
	readonly port: number
	readonly listening: boolean
	readonly url: string
	start(signal?: AbortSignal): Promise<void>
	stop(): Promise<void>
}

/** The process lifecycle owner for an application server. */
${EXPORT_KEYWORD} interface ApplicationServerRunnerInterface {
	start(): void
	stop(): Promise<void>
}
`,
	}),
	appServerConstants: Object.freeze({
		id: 'appServerConstants',
		name: 'appServerConstants',
		summary: 'The server environment defaults.',
		category: 'source',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'nameConstant',
				description: 'The optional server-only APP_NAME declaration.',
			}),
		]),
		content: `{{nameConstant}}/** The fail-closed loopback host default. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} DEFAULT_APP_HOST = '127.0.0.1'

/** The application server port default. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} DEFAULT_APP_PORT = 3000

/** Default milliseconds allowed for application server startup. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} DEFAULT_APP_START_TIMEOUT = 10_000

/** Maximum configurable milliseconds allowed for application server startup. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_APP_START_TIMEOUT = 300_000

/** Maximum raw characters inspected at an application host boundary. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_APP_HOST_INPUT_LENGTH = 255

/** Maximum raw characters inspected at an application numeric boundary. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} MAX_APP_NUMBER_INPUT_LENGTH = 32

/** Maximum simultaneous connections accepted by the generated server. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_MAX_CONNECTIONS = 16

/** Maximum request headers accepted before Node rejects the request. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_MAX_HEADERS = 100

/** Maximum milliseconds allowed to receive complete request headers. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HEADERS_TIMEOUT = 10_000

/** Maximum milliseconds allowed for one complete request. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_REQUEST_TIMEOUT = 30_000

/** Idle keep-alive milliseconds before a connection is closed. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_KEEP_ALIVE_TIMEOUT = 5_000

/** Maximum requests served through one keep-alive connection. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_MAX_REQUESTS_PER_SOCKET = 100

/** The decimal-only syntax accepted at the APP_PORT string boundary. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_PORT_PATTERN = /^\\d+$/

/** The syntax accepted for one DNS hostname label. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HOST_LABEL_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/

/** Numeric-looking non-IP hosts rejected before platform DNS interpretation. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_NUMERIC_HOST_PATTERN = /^[0-9.]+$/

/** The only HTTP method owned by the application health route. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HEALTH_METHOD = 'GET'

/** The only HTTP path owned by the generated application server. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HEALTH_PATH = '/'
`,
	}),
	appServerErrors: Object.freeze({
		id: 'appServerErrors',
		name: 'appServerErrors',
		summary: 'The application server boundary error.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { ApplicationServerErrorCode, ApplicationServerErrorContext } from './types.js'

/** A rejected application server configuration or lifecycle operation. */
${EXPORT_KEYWORD} class ApplicationServerError extends Error {
	readonly code: ApplicationServerErrorCode
	readonly context?: ApplicationServerErrorContext

	constructor(
		code: ApplicationServerErrorCode,
		message: string,
		context?: ApplicationServerErrorContext,
	) {
		super(message)
		this.name = 'ApplicationServerError'
		this.code = code
		if (context !== undefined) this.context = context
	}
}

/**
 * Narrow a caught value to an application server boundary error.
 *
 * @param value - The caught value to inspect.
 * @returns True only for ApplicationServerError instances.
 *
 * @example
 * \`\`\`ts
 * import { isApplicationServerError } from '@app/server'
 *
 * isApplicationServerError(new Error('plain')) // false
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} isApplicationServerError(value: unknown): value is ApplicationServerError {
	try {
		return value instanceof ApplicationServerError
	} catch {
		return false
	}
}
`,
	}),
	appServerParsers: Object.freeze({
		id: 'appServerParsers',
		name: 'appServerParsers',
		summary: 'The server environment parsers.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { ApplicationServerOptions } from './types.js'
import { isIP } from 'node:net'
import {
	APP_HOST_LABEL_PATTERN,
	APP_NUMERIC_HOST_PATTERN,
	APP_PORT_PATTERN,
	DEFAULT_APP_HOST,
	DEFAULT_APP_PORT,
	DEFAULT_APP_START_TIMEOUT,
	MAX_APP_HOST_INPUT_LENGTH,
	MAX_APP_NUMBER_INPUT_LENGTH,
	MAX_APP_START_TIMEOUT,
} from './constants.js'
import { ApplicationServerError, isApplicationServerError } from './errors.js'

/**
 * Parse a non-empty application host, defaulting to loopback.
 *
 * @param value - A direct option or environment value.
 * @returns The trimmed host or loopback default.
 * @throws ApplicationServerError with code CONFIG for every malformed value.
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} parseApplicationHost(value: unknown): string {
	if (value === undefined) return DEFAULT_APP_HOST
	if (typeof value !== 'string' || value.length > MAX_APP_HOST_INPUT_LENGTH) {
		throw new ApplicationServerError('CONFIG', 'APP_HOST must be a non-empty string', { value })
	}
	const host = value.trim()
	const family = isIP(host)
	if (
		host.length === 0 ||
		host.length > 253 ||
		(family === 0 &&
			(APP_NUMERIC_HOST_PATTERN.test(host) ||
				host.split('.').some((label) => !APP_HOST_LABEL_PATTERN.test(label))))
	) {
		throw new ApplicationServerError('CONFIG', 'APP_HOST must be a valid IP or DNS host', {
			value,
		})
	}
	return host
}

/**
 * Parse an application TCP port in the inclusive 0..65535 range.
 *
 * @param value - A direct numeric option or decimal environment string.
 * @returns An integer TCP port.
 * @throws ApplicationServerError with code CONFIG for every malformed value.
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} parseApplicationPort(value: unknown): number {
	if (value === undefined) return DEFAULT_APP_PORT
	if (typeof value !== 'string' && typeof value !== 'number') {
		throw new ApplicationServerError('CONFIG', 'APP_PORT must be an integer from 0 through 65535', {
			value,
		})
	}
	if (typeof value === 'string' && value.length > MAX_APP_NUMBER_INPUT_LENGTH) {
		throw new ApplicationServerError('CONFIG', 'APP_PORT must be an integer from 0 through 65535', {
			value,
		})
	}
	const text = typeof value === 'string' ? value.trim() : String(value)
	const port = APP_PORT_PATTERN.test(text) ? Number(text) : Number.NaN
	if (!Number.isInteger(port) || port < 0 || port > 65_535) {
		throw new ApplicationServerError('CONFIG', 'APP_PORT must be an integer from 0 through 65535', {
			value,
		})
	}
	return port
}

/**
 * Parse an application startup timeout in milliseconds.
 *
 * @param value - A direct numeric option or decimal environment string.
 * @returns A bounded positive integer timeout.
 * @throws ApplicationServerError with code CONFIG for every malformed value.
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} parseApplicationStartTimeout(value: unknown): number {
	if (value === undefined) return DEFAULT_APP_START_TIMEOUT
	if (typeof value !== 'string' && typeof value !== 'number') {
		throw new ApplicationServerError(
			'CONFIG',
			\`APP_START_TIMEOUT must be an integer from 1 through \${MAX_APP_START_TIMEOUT}\`,
			{ value },
		)
	}
	if (typeof value === 'string' && value.length > MAX_APP_NUMBER_INPUT_LENGTH) {
		throw new ApplicationServerError(
			'CONFIG',
			\`APP_START_TIMEOUT must be an integer from 1 through \${MAX_APP_START_TIMEOUT}\`,
			{ value },
		)
	}
	const text = typeof value === 'string' ? value.trim() : String(value)
	const timeout = APP_PORT_PATTERN.test(text) ? Number(text) : Number.NaN
	if (!Number.isInteger(timeout) || timeout < 1 || timeout > MAX_APP_START_TIMEOUT) {
		throw new ApplicationServerError(
			'CONFIG',
			\`APP_START_TIMEOUT must be an integer from 1 through \${MAX_APP_START_TIMEOUT}\`,
			{ value },
		)
	}
	return timeout
}

/**
 * Parse the direct application server options container.
 *
 * @param value - The caller-supplied options value.
 * @returns A fresh options record containing only validated values.
 * @throws ApplicationServerError with code CONFIG for malformed containers,
 * properties, or hostile property accessors.
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} parseApplicationServerOptions(value: unknown): ApplicationServerOptions {
	if (value === undefined) return {}
	try {
		if (typeof value !== 'object' || value === null || Array.isArray(value)) {
			throw new ApplicationServerError('CONFIG', 'Application server options must be an object', {
				value,
			})
		}
		const prototype = Reflect.getPrototypeOf(value)
		if (prototype !== Object.prototype && prototype !== null) {
			throw new ApplicationServerError(
				'CONFIG',
				'Application server options must be a plain record',
				{ value },
			)
		}
		const keys = Reflect.ownKeys(value)
		const unknown = keys.filter((key) => key !== 'host' && key !== 'port' && key !== 'timeout')
		if (unknown.length > 0) {
			throw new ApplicationServerError('CONFIG', 'Unknown application server option', { value })
		}
		const hostDescriptor = Reflect.getOwnPropertyDescriptor(value, 'host')
		const portDescriptor = Reflect.getOwnPropertyDescriptor(value, 'port')
		const timeoutDescriptor = Reflect.getOwnPropertyDescriptor(value, 'timeout')
		if (
			(keys.includes('host') &&
				(hostDescriptor === undefined || !Reflect.has(hostDescriptor, 'value'))) ||
			(keys.includes('port') &&
				(portDescriptor === undefined || !Reflect.has(portDescriptor, 'value'))) ||
			(keys.includes('timeout') &&
				(timeoutDescriptor === undefined || !Reflect.has(timeoutDescriptor, 'value')))
		) {
			throw new ApplicationServerError(
				'CONFIG',
				'Application server options must use data properties',
				{ value },
			)
		}
		const host = hostDescriptor?.value
		const port = portDescriptor?.value
		const timeout = timeoutDescriptor?.value
		return {
			...(host === undefined ? {} : { host: parseApplicationHost(host) }),
			...(port === undefined ? {} : { port: parseApplicationPort(port) }),
			...(timeout === undefined ? {} : { timeout: parseApplicationStartTimeout(timeout) }),
		}
	} catch (error) {
		if (isApplicationServerError(error)) throw error
		throw new ApplicationServerError('CONFIG', 'Application server options could not be read', {
			cause: error,
		})
	}
}
`,
	}),
	appServerHandlers: Object.freeze({
		id: 'appServerHandlers',
		name: 'appServerHandlers',
		summary: 'The server HTTP request handler.',
		category: 'source',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'nameImport',
				description: 'The selected layer import for APP_NAME.',
			}),
		]),
		content: `import type { IncomingMessage, ServerResponse } from 'node:http'
{{nameImport}}
import { APP_HEALTH_METHOD, APP_HEALTH_PATH } from './constants.js'
import { isApplicationServerError } from './errors.js'

/**
 * Respond to the application health endpoint and reject every other route.
 *
 * @param request - The incoming Node request.
 * @param response - The Node response to complete exactly once.
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} handleApplicationRequest(request: IncomingMessage, response: ServerResponse): void {
	if (request.method !== APP_HEALTH_METHOD) {
		response.writeHead(405, {
			allow: APP_HEALTH_METHOD,
			'content-type': 'text/plain; charset=utf-8',
		})
		response.end('Method Not Allowed')
		return
	}
	if (request.url !== APP_HEALTH_PATH) {
		response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
		response.end('Not Found')
		return
	}
	response.writeHead(200, {
		'cache-control': 'no-store',
		'content-type': 'application/json; charset=utf-8',
	})
	response.end(JSON.stringify({ name: APP_NAME, status: 'ok' }))
}

/**
 * Report a process-owned application server failure without exposing its diagnostic context.
 *
 * @param error - The rejected configuration or lifecycle value.
 * @returns Nothing.
 *
 * @example
 * \`\`\`ts
 * import { ApplicationServerError, reportApplicationServerError } from '@app/server'
 *
 * reportApplicationServerError(new ApplicationServerError('CONFIG', 'invalid'))
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} reportApplicationServerError(error: unknown): void {
	let message = '[ERROR] Application server failed'
	try {
		if (isApplicationServerError(error)) {
			message =
				error.code === 'CONFIG'
					? '[CONFIG] Application server configuration failed'
					: '[LIFECYCLE] Application server lifecycle failed'
		}
	} catch {
		message = '[ERROR] Application server failed'
	}
	process.stderr.write(\`\${message}\\n\`)
	process.exitCode = 1
}
`,
	}),
	appServerEntity: Object.freeze({
		id: 'appServerEntity',
		name: 'appServerEntity',
		summary: 'The application server implementation.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type { Server } from 'node:http'
import type { ApplicationServerInterface, ApplicationServerOptions } from './types.js'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { promisify } from 'node:util'
import {
	APP_HEADERS_TIMEOUT,
	APP_KEEP_ALIVE_TIMEOUT,
	APP_MAX_CONNECTIONS,
	APP_MAX_HEADERS,
	APP_MAX_REQUESTS_PER_SOCKET,
	APP_REQUEST_TIMEOUT,
} from './constants.js'
import { ApplicationServerError, isApplicationServerError } from './errors.js'
import { handleApplicationRequest } from './handlers.js'
import {
	parseApplicationHost,
	parseApplicationPort,
	parseApplicationServerOptions,
	parseApplicationStartTimeout,
} from './parsers.js'

/** A repeat-safe Node HTTP application server. */
${EXPORT_KEYWORD} class ApplicationServer implements ApplicationServerInterface {
	readonly host: string
	readonly #requestedPort: number
	readonly #timeout: number
	#port: number
	readonly #server: Server
	#transition: Promise<void> = Promise.resolve()
	readonly #starts = new Set<AbortController>()
	readonly #stopped = new WeakSet<AbortController>()

	constructor(options: ApplicationServerOptions = {}) {
		const parsed = parseApplicationServerOptions(options)
		this.host = parseApplicationHost(parsed.host === undefined ? process.env.APP_HOST : parsed.host)
		this.#requestedPort = parseApplicationPort(
			parsed.port === undefined ? process.env.APP_PORT : parsed.port,
		)
		this.#port = this.#requestedPort
		this.#timeout = parseApplicationStartTimeout(
			parsed.timeout === undefined ? process.env.APP_START_TIMEOUT : parsed.timeout,
		)
		this.#server = createServer(handleApplicationRequest)
		this.#server.maxConnections = APP_MAX_CONNECTIONS
		this.#server.maxHeadersCount = APP_MAX_HEADERS
		this.#server.headersTimeout = APP_HEADERS_TIMEOUT
		this.#server.requestTimeout = APP_REQUEST_TIMEOUT
		this.#server.keepAliveTimeout = APP_KEEP_ALIVE_TIMEOUT
		this.#server.maxRequestsPerSocket = APP_MAX_REQUESTS_PER_SOCKET
	}

	get port(): number {
		return this.#port
	}

	get listening(): boolean {
		return this.#server.listening
	}

	get url(): string {
		const hostname = this.host.includes(':') ? \`[\${this.host}]\` : this.host
		return \`http://\${hostname}:\${this.port}\`
	}

	start(signal?: AbortSignal): Promise<void> {
		const controller = new AbortController()
		this.#starts.add(controller)
		const queued = this.#queue(this.#start.bind(this, controller, signal))
		void queued.then(this.#settle.bind(this, controller), this.#settle.bind(this, controller))
		return queued
	}

	stop(): Promise<void> {
		for (const controller of this.#starts) {
			this.#stopped.add(controller)
			controller.abort()
		}
		return this.#queue(this.#stop.bind(this))
	}

	#queue(operation: () => Promise<void>): Promise<void> {
		const queued = this.#transition.then(operation, operation)
		this.#transition = queued.then(
			() => undefined,
			() => undefined,
		)
		return queued
	}

	async #start(controller: AbortController, signal?: AbortSignal): Promise<void> {
		if (this.listening) return
		if (controller.signal.aborted) {
			if (this.#stopped.has(controller)) return
			throw new ApplicationServerError('LIFECYCLE', 'Application server startup was cancelled')
		}
		try {
			if (signal?.aborted === true) {
				throw new ApplicationServerError('LIFECYCLE', 'Application server startup was cancelled', {
					cause: signal.reason,
				})
			}
			await this.#listen(controller, signal)
		} catch (error) {
			if (this.#stopped.has(controller)) return
			if (isApplicationServerError(error)) throw error
			throw new ApplicationServerError('LIFECYCLE', 'Failed to inspect startup signal', {
				cause: error,
			})
		}
	}

	async #stop(): Promise<void> {
		if (!this.listening) return
		await this.#close()
	}

	async #listen(controller: AbortController, signal?: AbortSignal): Promise<void> {
		const relay = signal === undefined ? undefined : this.#abort.bind(this, controller, signal)
		const timer = setTimeout(this.#expire.bind(this, controller), this.#timeout)
		try {
			if (signal !== undefined && relay !== undefined) {
				signal.addEventListener('abort', relay, { once: true })
			}
			this.#server.listen({
				port: this.#requestedPort,
				host: this.host,
				signal: controller.signal,
			})
			await once(this.#server, 'listening', { signal: controller.signal })
		} catch (error) {
			throw new ApplicationServerError('LIFECYCLE', 'Failed to start application server', {
				cause: error,
			})
		} finally {
			clearTimeout(timer)
			if (relay !== undefined && signal !== undefined) {
				signal.removeEventListener('abort', relay)
			}
		}
		const address = this.#server.address()
		if (address === null || typeof address === 'string') {
			await this.#close()
			throw new ApplicationServerError('LIFECYCLE', 'Server did not expose a TCP address')
		}
		this.#port = address.port
	}

	#abort(controller: AbortController, signal: AbortSignal): void {
		controller.abort(signal.reason)
	}

	#expire(controller: AbortController): void {
		controller.abort(new Error(\`Application server startup exceeded \${this.#timeout} milliseconds\`))
	}

	#settle(controller: AbortController): void {
		this.#starts.delete(controller)
	}

	async #close(): Promise<void> {
		try {
			const closed = promisify(this.#server.close.bind(this.#server))()
			this.#server.closeIdleConnections()
			this.#server.closeAllConnections()
			await closed
		} catch (error) {
			throw new ApplicationServerError('LIFECYCLE', 'Failed to stop application server', {
				cause: error,
			})
		}
	}
}
`,
	}),
	appServerFactories: Object.freeze({
		id: 'appServerFactories',
		name: 'appServerFactories',
		summary: 'The application server factory.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type {
	ApplicationServerInterface,
	ApplicationServerOptions,
	ApplicationServerRunnerInterface,
} from './types.js'
import { ApplicationServer } from './ApplicationServer.js'
import { ApplicationServerRunner } from './ApplicationServerRunner.js'

/**
 * Create a stopped application server.
 *
 * @param options - Optional host and port overrides.
 * @returns A lifecycle-safe application server.
 *
 * @example
 * \`\`\`ts
 * import { createApplicationServer } from '@app/server'
 *
 * ${CONST_KEYWORD} server = createApplicationServer({ port: 0 })
 * await server.start()
 * await server.stop()
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} createApplicationServer(
	options: ApplicationServerOptions = {},
): ApplicationServerInterface {
	return new ApplicationServer(options)
}

/**
 * Start a process-owned application server.
 *
 * @param options - Optional host and port overrides.
 * @returns The runner that owns signals and provides explicit asynchronous cleanup.
 *
 * @example
 * \`\`\`ts
 * import { startApplicationServer } from '@app/server'
 *
 * ${CONST_KEYWORD} runner = startApplicationServer({ port: 0 })
 * await runner.stop()
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} startApplicationServer(
	options: ApplicationServerOptions = {},
): ApplicationServerRunnerInterface {
	const runner = new ApplicationServerRunner(options)
	runner.start()
	return runner
}
`,
	}),
	appServerRunner: Object.freeze({
		id: 'appServerRunner',
		name: 'appServerRunner',
		summary: 'The application server process lifecycle owner.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import type {
	ApplicationServerInterface,
	ApplicationServerOptions,
	ApplicationServerRunnerInterface,
} from './types.js'
import { ApplicationServer } from './ApplicationServer.js'
import { reportApplicationServerError } from './handlers.js'

/** Own process signals and startup failure handling for one application server. */
${EXPORT_KEYWORD} class ApplicationServerRunner implements ApplicationServerRunnerInterface {
	readonly #server: ApplicationServerInterface
	readonly #signal: () => void
	#generation = 0
	#started = false

	constructor(options: ApplicationServerOptions = {}) {
		this.#server = new ApplicationServer(options)
		this.#signal = this.#shutdown.bind(this)
	}

	start(): void {
		if (this.#started) return
		this.#started = true
		const generation = ++this.#generation
		process.once('SIGINT', this.#signal)
		process.once('SIGTERM', this.#signal)
		void this.#server.start().catch(this.#fail.bind(this, generation))
	}

	stop(): Promise<void> {
		this.#generation += 1
		this.#release()
		return this.#server.stop()
	}

	#fail(generation: number, error: unknown): void {
		if (generation !== this.#generation) return
		this.#release()
		reportApplicationServerError(error)
	}

	#shutdown(): void {
		const stopped = this.stop()
		const generation = this.#generation
		void stopped.catch(this.#fail.bind(this, generation))
	}

	#release(): void {
		process.off('SIGINT', this.#signal)
		process.off('SIGTERM', this.#signal)
		this.#started = false
	}
}
`,
	}),
	appServerIndex: Object.freeze({
		id: 'appServerIndex',
		name: 'appServerIndex',
		summary: 'The application server barrel.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `export * from './types.js'
export * from './constants.js'
export * from './errors.js'
export * from './parsers.js'
export * from './handlers.js'
export * from './ApplicationServer.js'
export * from './ApplicationServerRunner.js'
export * from './factories.js'
`,
	}),
	appServerMain: Object.freeze({
		id: 'appServerMain',
		name: 'appServerMain',
		summary: 'The server executable entry.',
		category: 'source',
		placeholders: Object.freeze([]),
		content: `import { reportApplicationServerError, startApplicationServer } from './index.js'

try {
	startApplicationServer()
} catch (error) {
	reportApplicationServerError(error)
}
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
// The test rules require a recording callback when a test only needs to count calls or inspect arguments:
// recorder — a real listener that records every invocation — rather than a test-
// framework spy. \`handler\` is a genuine callback; \`calls\` is each invocation's
// argument tuple, in order.

/** A real call-recording callback over an argument tuple, following \`.claude/rules/tests.md\`. */
${EXPORT_KEYWORD} interface TestRecorderInterface<TArgs extends readonly unknown[]> {
	readonly calls: readonly TArgs[]
	readonly count: number
	readonly handler: (...args: TArgs) => void
	clear(): void
}

/**
 * Create a {@link TestRecorderInterface} — a real callback that records each
 * invocation's arguments, for asserting what fired and with what, following
 * \`.claude/rules/tests.md\`.
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

/** Whether a repository-relative Vue SFC belongs to the private browser application. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} isBrowserVuePath(path: string): boolean {
	const normalized = path.replaceAll('\\\\', '/')
	return normalized.startsWith('app/browser/')
}
`,
	}),
	policyTest: Object.freeze({
		id: 'policyTest',
		name: 'policyTest',
		summary: 'The generated repository filename-policy test.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'browserPolicySpecifier',
				description: 'The optional real Chromium filesystem-probe import.',
			}),
			Object.freeze({
				name: 'browserPolicyImport',
				description: 'The optional real Chromium package import.',
			}),
			Object.freeze({
				name: 'browserPolicyTest',
				description: 'The optional capability-gated Chromium policy test.',
			}),
			Object.freeze({
				name: 'vuePolicyImport',
				description: 'The optional official Vue SFC compiler import.',
			}),
			Object.freeze({
				name: 'workspacePolicyAssertion',
				description: 'The formatter-stable workspace policy assertion.',
			}),
		]),
		content: `import { globSync{{browserPolicySpecifier}} } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { isBrowserVuePath } from './setup.js'
import { inspectCodingWorkspace } from './setupPolicy.js'{{browserPolicyImport}}{{vuePolicyImport}}

describe('repository coding law', () => {
	it('keeps Vue single-file components exclusively in browser environments', () => {
		const files = globSync('{app,src}/**/*.vue')

		expect(files.every(isBrowserVuePath)).toBe(true)
	})

	it('enforces source placement, exports, readonly contracts, and syntax law', () => {
		{{workspacePolicyAssertion}}
	}){{browserPolicyTest}}
})
`,
	}),
	setupServer: Object.freeze({
		id: 'setupServer',
		name: 'setupServer',
		summary:
			'The generated `tests/setupServer.ts` real Node-server and application-process helper.',
		category: 'tests',
		placeholders: Object.freeze([]),
		content: `import type { ChildProcess } from 'node:child_process'
import type { Server } from 'node:http'
import type { Socket } from 'node:net'
${IMPORT_KEYWORD} { spawn, spawnSync } from 'node:child_process'
${IMPORT_KEYWORD} { once } from 'node:events'
${IMPORT_KEYWORD} { createServer } from 'node:http'

/** One real application child process plus its captured diagnostic output. */
${EXPORT_KEYWORD} interface ApplicationProcessInterface {
	readonly child: ChildProcess
	output(): string
}

/** One real child-process close result. */
${EXPORT_KEYWORD} interface ApplicationProcessExitInterface {
	readonly code: number | null
	readonly signal: string | null
}

/** Stop a real Node server and wait for its close event. */
${EXPORT_KEYWORD} async ${FUNCTION_KEYWORD} stopNodeServer(server: Server): Promise<void> {
	if (!server.listening) return
	const closed = once(server, 'close')
	server.close()
	await closed
}

/** Wait for a real client socket to close, accepting reset as a valid forced close. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} waitForSocketClose(socket: Socket): Promise<void> {
	socket.once('error', () => undefined)
	return new Promise((resolvePromise) => socket.once('close', () => resolvePromise()))
}

/** Build the generated application-server executable through its real package script. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} buildApplicationServer(): void {
	const npm = process.env.npm_execpath
	if (npm === undefined) throw new Error('expected npm_execpath while running the npm test script')
	const built = spawnSync(process.execPath, [npm, 'run', 'build:app:server'], {
		cwd: process.cwd(),
		encoding: 'utf8',
		timeout: 60_000,
	})
	if (built.status !== 0) {
		throw new Error(
			\`application server build failed: status=\${String(built.status)} error=\${String(built.error)} stdout=\${built.stdout} stderr=\${built.stderr}\`,
		)
	}
}

/** Reserve and release a real loopback port for an immediate child-process bind. */
${EXPORT_KEYWORD} async ${FUNCTION_KEYWORD} reserveLoopbackPort(): Promise<number> {
	const server = createServer()
	server.listen(0, '127.0.0.1')
	await once(server, 'listening')
	const address = server.address()
	if (address === null || typeof address === 'string') {
		await stopNodeServer(server)
		throw new Error('loopback probe did not expose a TCP port')
	}
	await stopNodeServer(server)
	return address.port
}

/** Wait until one in-process application server responds on loopback. */
${EXPORT_KEYWORD} async ${FUNCTION_KEYWORD} waitForLoopbackResponse(port: number): Promise<Response> {
	const deadline = Date.now() + 10_000
	let failure: unknown
	while (Date.now() < deadline) {
		try {
			return await fetch(\`http://127.0.0.1:\${port}\`, {
				signal: AbortSignal.timeout(250),
			})
		} catch (error) {
			failure = error
			await new Promise<void>((resolvePromise) => setTimeout(resolvePromise, 25))
		}
	}
	throw new Error(\`application server did not become ready: \${String(failure)}\`)
}

/** Start the built application entry as a real child process. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} startApplicationProcess(
	port: number,
	environment: Readonly<Record<string, string>> = {},
): ApplicationProcessInterface {
	const child = spawn(process.execPath, ['dist/app/server/main.cjs'], {
		cwd: process.cwd(),
		env: {
			...process.env,
			APP_HOST: '127.0.0.1',
			APP_PORT: String(port),
			...environment,
		},
		stdio: ['ignore', 'pipe', 'pipe'],
	})
	const output: string[] = []
	child.stdout?.setEncoding('utf8')
	child.stderr?.setEncoding('utf8')
	child.stdout?.on('data', (chunk: unknown) => {
		if (typeof chunk === 'string') output.push(chunk)
	})
	child.stderr?.on('data', (chunk: unknown) => {
		if (typeof chunk === 'string') output.push(chunk)
	})
	return {
		child,
		output() {
			return output.join('')
		},
	}
}

/** Wait for a real child process and all of its stdio to close. */
${EXPORT_KEYWORD} async ${FUNCTION_KEYWORD} waitForApplicationProcess(
	application: ApplicationProcessInterface,
): Promise<ApplicationProcessExitInterface> {
	if (application.child.exitCode !== null || application.child.signalCode !== null) {
		return { code: application.child.exitCode, signal: application.child.signalCode }
	}
	const closed = await once(application.child, 'close', {
		signal: AbortSignal.timeout(10_000),
	})
	return {
		code: typeof closed[0] === 'number' ? closed[0] : null,
		signal: typeof closed[1] === 'string' ? closed[1] : null,
	}
}

/** Wait until the real child process serves one successful loopback response. */
${EXPORT_KEYWORD} async ${FUNCTION_KEYWORD} waitForApplicationResponse(
	application: ApplicationProcessInterface,
	port: number,
): Promise<Response> {
	const deadline = Date.now() + 10_000
	let failure: unknown
	while (Date.now() < deadline) {
		if (application.child.exitCode !== null || application.child.signalCode !== null) {
			throw new Error(\`application process exited before readiness: \${application.output()}\`)
		}
		try {
			const response = await fetch(\`http://127.0.0.1:\${port}\`, {
				signal: AbortSignal.timeout(250),
			})
			return response
		} catch (error) {
			failure = error
			await new Promise<void>((resolvePromise) => setTimeout(resolvePromise, 25))
		}
	}
	throw new Error(
		\`application process did not become ready: \${String(failure)} \${application.output()}\`,
	)
}
`,
	}),
	setupBrowser: Object.freeze({
		id: 'setupBrowser',
		name: 'setupBrowser',
		summary: 'The generated-minimal `tests/setupBrowser.ts` DOM-only helper — no placeholders.',
		category: 'tests',
		placeholders: Object.freeze([]),
		content: `/** Append a real element to the browser document for one test. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} buildElement(tag = 'div'): HTMLElement {
	const element = document.createElement(tag)
	document.body.append(element)
	return element
}
`,
	}),
	entityTest: Object.freeze({
		id: 'entityTest',
		name: 'entityTest',
		summary: 'The generated-minimal `tests/src/<environment>/{Pascal}.test.ts` stub.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			Object.freeze({
				name: 'environment',
				description: 'The owning src environment (`core`/`browser`/`server`).',
			}),
			Object.freeze({
				name: 'entityTestTypeImport',
				description: 'The formatter-stable entity contract type import.',
			}),
			Object.freeze({
				name: 'explicitInstance',
				description: 'The formatter-stable explicit-id instance declaration.',
			}),
		]),
		content: `{{entityTestTypeImport}}
import { {{pascal}} } from '@src/{{environment}}'
import { describe, expect, it } from 'vitest'

// The {{pascal}} entity — explicit identity. Factory-level assertions live in
// factories.test.ts.

describe('{{pascal}}', () => {
	it('round-trips an explicit id', () => {
		${CONST_KEYWORD} {{explicitInstance}}

		expect(instance.id).toBe('example')
	})
})
`,
	}),
	factoriesTest: Object.freeze({
		id: 'factoriesTest',
		name: 'factoriesTest',
		summary: 'The generated-minimal `tests/src/<environment>/factories.test.ts` stub.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({ name: 'pascal', description: 'The PascalCase entity name.' }),
			Object.freeze({
				name: 'environment',
				description: 'The owning src environment (`core`/`browser`/`server`).',
			}),
			Object.freeze({
				name: 'valueImport',
				description: 'The formatter-stable factory/entity value import.',
			}),
			Object.freeze({
				name: 'testTypeImport',
				description: 'The formatter-stable factory contract type import.',
			}),
			Object.freeze({
				name: 'factoryInstance',
				description: 'The formatter-stable explicit-id factory call.',
			}),
			Object.freeze({
				name: 'typeExpectation',
				description: 'The formatter-stable factory return-type expectation.',
			}),
		]),
		content: `{{testTypeImport}}
{{valueImport}}
import { describe, expect, expectTypeOf, it } from 'vitest'

// The {{pascal}} factory — that \`create{{pascal}}\` returns a working {{pascal}}Interface
// backed by a real {{pascal}} instance.

describe('create{{pascal}}', () => {
	it('returns a {{pascal}} instance', () => {
		const instance = create{{pascal}}({ id: 'example' })

		expect(instance).toBeInstanceOf({{pascal}})
	})

	it('honors the id option', () => {
		${CONST_KEYWORD} {{factoryInstance}}

		expect(instance.id).toBe('example')
	})

	it('create{{pascal}} returns a {{pascal}}Interface', () => {
		{{typeExpectation}}
	})
})
`,
	}),
	appCoreTest: Object.freeze({
		id: 'appCoreTest',
		name: 'appCoreTest',
		summary: 'The host-independent application test.',
		category: 'tests',
		placeholders: Object.freeze([]),
		content: `import {
	APP_NAME,
	ApplicationError,
	createApplication,
	isApplicationError,
	MAX_APPLICATION_NAME_INPUT_LENGTH,
	parseApplicationName,
} from '@app/core'
import { describe, expect, it } from 'vitest'

describe('createApplication', () => {
	it('uses the shared application name by default', () => {
		expect(createApplication()).toEqual({ name: APP_NAME })
		expect(typeof APP_NAME).toBe('string')
	})

	it('creates independent immutable values', () => {
		const first = createApplication('first')
		const second = createApplication('second')

		expect(first).toEqual({ name: 'first' })
		expect(second).toEqual({ name: 'second' })
		expect(Object.isFrozen(first)).toBe(true)
	})

	it('validates names before constructing the immutable value', () => {
		expect(parseApplicationName(' example ')).toBe('example')
		for (const value of [
			null,
			1,
			'',
			' ',
			'x'.repeat(204),
			\`\${' '.repeat(MAX_APPLICATION_NAME_INPUT_LENGTH)}x\`,
		]) {
			expect(() => Reflect.apply(createApplication, undefined, [value])).toThrowError(
				ApplicationError,
			)
		}
		const error = new ApplicationError('CONFIG', 'invalid')
		expect(isApplicationError(error)).toBe(true)
		expect(isApplicationError(new Error('plain'))).toBe(false)
		const revocable = Proxy.revocable({}, {})
		revocable.revoke()
		expect(isApplicationError(revocable.proxy)).toBe(false)
	})
})
`,
	}),
	appBrowserTest: Object.freeze({
		id: 'appBrowserTest',
		name: 'appBrowserTest',
		summary: 'The real-browser application mount test.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'browserTestNameImport',
				description: 'The layer-correct browser APP_NAME test import.',
			}),
		]),
		content: `{{browserTestNameImport}}
import {
	BrowserApplicationError,
	createBrowserApplication,
	isBrowserApplicationError,
	MAX_BROWSER_APPLICATION_NAME_INPUT_LENGTH,
	parseBrowserApplicationOptions,
} from '@app/browser'
import { buildElement } from '../../setupBrowser.js'
import { describe, expect, it } from 'vitest'

describe('createBrowserApplication', () => {
	it('mounts the layer-owned default name in a real browser document', () => {
		const element = buildElement()
		const application = createBrowserApplication()
		let mounted = false
		try {
			application.mount(element)
			mounted = true
			expect(element.textContent).toContain(APP_NAME)
		} finally {
			if (mounted) application.unmount()
			element.remove()
		}
	})

	it('mounts an explicit name and unmounts cleanly', () => {
		const element = buildElement()
		const application = createBrowserApplication({ name: 'Example' })
		let mounted = false
		try {
			application.mount(element)
			mounted = true
			expect(element.textContent).toContain('Example')

			application.unmount()
			mounted = false
			expect(element.textContent).toBe('')
		} finally {
			if (mounted) application.unmount()
			element.remove()
		}
	})

	it('rejects malformed and hostile options before allocating the Vue application', () => {
		for (const value of [
			null,
			[],
			{ extra: true },
			{ name: 1 },
			{ name: '' },
			{ name: 'x'.repeat(204) },
			{ name: \`\${' '.repeat(MAX_BROWSER_APPLICATION_NAME_INPUT_LENGTH)}x\` },
		]) {
			expect(() => Reflect.apply(createBrowserApplication, undefined, [value])).toThrowError(
				BrowserApplicationError,
			)
		}

		let reads = 0
		const accessor = Object.create(null)
		Object.defineProperty(accessor, 'name', {
			enumerable: true,
			get() {
				reads += 1
				return 'owned'
			},
		})
		const hostile = new Proxy(
			{},
			{
				ownKeys() {
					throw new Error('hostile ownKeys')
				},
			},
		)
		const revocable = Proxy.revocable({}, {})
		revocable.revoke()

		expect(() => parseBrowserApplicationOptions(accessor)).toThrowError(BrowserApplicationError)
		expect(reads).toBe(0)
		expect(() => Reflect.apply(createBrowserApplication, undefined, [hostile])).toThrowError(
			BrowserApplicationError,
		)
		expect(() =>
			Reflect.apply(createBrowserApplication, undefined, [revocable.proxy]),
		).toThrowError(BrowserApplicationError)
		expect(isBrowserApplicationError(new BrowserApplicationError('CONFIG', 'invalid'))).toBe(true)
		expect(isBrowserApplicationError(new Error('plain'))).toBe(false)
		expect(isBrowserApplicationError(revocable.proxy)).toBe(false)
	})
})
`,
	}),
	appServerTest: Object.freeze({
		id: 'appServerTest',
		name: 'appServerTest',
		summary: 'The real loopback application server lifecycle test.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'testNameImport',
				description: 'The layer-correct APP_NAME test import.',
			}),
		]),
		content: `{{testNameImport}}
import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	APP_MAX_CONNECTIONS,
	ApplicationServerRunner,
	createApplicationServer,
	startApplicationServer,
} from '@app/server'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { connect } from 'node:net'
import { beforeAll, describe, expect, it } from 'vitest'
import {
	buildApplicationServer,
	reserveLoopbackPort,
	startApplicationProcess,
	stopNodeServer,
	waitForApplicationProcess,
	waitForApplicationResponse,
	waitForLoopbackResponse,
	waitForSocketClose,
} from '../../setupServer.js'

beforeAll(() => buildApplicationServer(), 60_000)

describe('ApplicationServer', () => {
	it('serves a real loopback request and tolerates repeated lifecycle calls', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		try {
			await Promise.all([server.start(), server.start(), server.start()])
			await server.start()

			const response = await fetch(server.url)
			expect(response.status).toBe(200)
			expect(response.headers.get('cache-control')).toBe('no-store')
			expect(response.headers.get('content-type')).toBe('application/json; charset=utf-8')
			expect(await response.json()).toEqual({ name: APP_NAME, status: 'ok' })
		} finally {
			await Promise.all([server.stop(), server.stop(), server.stop()])
			await server.stop()
		}
	})

	it('rejects unsupported methods and unknown routes', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		try {
			await server.start()
			const method = await fetch(server.url, { method: 'POST' })
			expect(method.status).toBe(405)
			expect(method.headers.get('allow')).toBe(APP_HEALTH_METHOD)
			expect(method.headers.get('content-type')).toBe('text/plain; charset=utf-8')
			expect(await method.text()).toBe('Method Not Allowed')
			const route = await fetch(\`\${server.url}/missing\`)
			expect(route.status).toBe(404)
			expect(route.headers.get('content-type')).toBe('text/plain; charset=utf-8')
			expect(await route.text()).toBe('Not Found')
			expect(APP_HEALTH_PATH).toBe('/')
		} finally {
			await server.stop()
		}
	})

	it('serves concurrent loopback requests without cross-request state', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		try {
			await server.start()
			const responses = await Promise.all(
				Array.from({ length: 8 }, async () => {
					const response = await fetch(server.url)
					return { status: response.status, body: await response.json() }
				}),
			)
			expect(responses).toHaveLength(8)
			for (const response of responses) {
				expect(response).toEqual({
					status: 200,
					body: { name: APP_NAME, status: 'ok' },
				})
			}
		} finally {
			await server.stop()
		}
	})

	it('validates direct options before allocating a listener', () => {
		expect(() => createApplicationServer({ host: ' ' })).toThrowError(
			expect.objectContaining({ code: 'CONFIG' }),
		)
		expect(() => createApplicationServer({ port: Number.NaN })).toThrowError(
			expect.objectContaining({ code: 'CONFIG' }),
		)
		expect(() => createApplicationServer({ port: -1 })).toThrowError(
			expect.objectContaining({ code: 'CONFIG' }),
		)
		expect(() => createApplicationServer({ timeout: 0 })).toThrowError(
			expect.objectContaining({ code: 'CONFIG' }),
		)
		for (const value of [null, 42, [], { host: 42 }, { port: [42] }]) {
			expect(() => Reflect.apply(createApplicationServer, undefined, [value])).toThrowError(
				expect.objectContaining({ code: 'CONFIG' }),
			)
		}
		expect(createApplicationServer({ host: '::1' }).url).toBe('http://[::1]:3000')
	})

	it('parses the real APP_HOST, APP_PORT, and APP_START_TIMEOUT environment boundary and restores it', () => {
		const previousHost = process.env.APP_HOST
		const previousPort = process.env.APP_PORT
		const previousTimeout = process.env.APP_START_TIMEOUT
		try {
			process.env.APP_HOST = ' 127.0.0.1 '
			process.env.APP_PORT = '0'
			process.env.APP_START_TIMEOUT = '250'
			const server = createApplicationServer()
			expect(server.host).toBe('127.0.0.1')
			expect(server.port).toBe(0)

			process.env.APP_PORT = '1e3'
			expect(() => createApplicationServer()).toThrowError(
				expect.objectContaining({ code: 'CONFIG' }),
			)
			process.env.APP_PORT = '0'
			process.env.APP_START_TIMEOUT = '0'
			expect(() => createApplicationServer()).toThrowError(
				expect.objectContaining({ code: 'CONFIG' }),
			)
		} finally {
			if (previousHost === undefined) delete process.env.APP_HOST
			else process.env.APP_HOST = previousHost
			if (previousPort === undefined) delete process.env.APP_PORT
			else process.env.APP_PORT = previousPort
			if (previousTimeout === undefined) delete process.env.APP_START_TIMEOUT
			else process.env.APP_START_TIMEOUT = previousTimeout
		}
	})

	it('rejects an aborted startup promptly, cleans up, and remains restartable', async () => {
		const server = createApplicationServer({
			host: '127.0.0.1',
			port: 0,
			timeout: 1_000,
		})
		const controller = new AbortController()
		controller.abort(new Error('cancelled by test'))
		try {
			const started = Date.now()
			await expect(server.start(controller.signal)).rejects.toMatchObject({ code: 'LIFECYCLE' })
			expect(Date.now() - started).toBeLessThan(5_000)
			expect(server.listening).toBe(false)

			await server.stop()
			await server.start()
			expect((await fetch(server.url)).status).toBe(200)
		} finally {
			await server.stop()
		}
	})

	it('contains a revoked startup signal without listening or leaking transition state', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		const revocable = Proxy.revocable(new AbortController().signal, {})
		revocable.revoke()
		try {
			await expect(Reflect.apply(server.start, server, [revocable.proxy])).rejects.toMatchObject({
				code: 'LIFECYCLE',
			})
			expect(server.listening).toBe(false)

			await server.start()
			expect((await fetch(server.url)).status).toBe(200)
		} finally {
			await server.stop()
		}
	})

	it('fails closed on a port collision and preserves the owning server', async () => {
		const owner = createApplicationServer({ host: '127.0.0.1', port: 0 })
		let blocked: ReturnType<typeof createApplicationServer> | undefined
		try {
			await owner.start()
			blocked = createApplicationServer({ host: '127.0.0.1', port: owner.port })
			await expect(blocked.start()).rejects.toMatchObject({ code: 'LIFECYCLE' })
			expect(blocked.listening).toBe(false)
			expect((await fetch(owner.url)).status).toBe(200)
		} finally {
			await blocked?.stop()
			await owner.stop()
		}
	})

	it('restarts cleanly after a completed stop', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		try {
			await server.start()
			await server.stop()
			await Promise.all([server.start(), server.start()])
			expect((await fetch(server.url)).status).toBe(200)
		} finally {
			await server.stop()
		}
	})

	it('requests a fresh ephemeral port when the previous port is occupied', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		const occupant = createServer()
		try {
			await server.start()
			const previousPort = server.port
			await server.stop()

			occupant.listen(previousPort, server.host)
			await once(occupant, 'listening')
			await server.start()

			expect(server.port).not.toBe(previousPort)
			expect((await fetch(server.url)).status).toBe(200)
		} finally {
			await server.stop()
			await stopNodeServer(occupant)
		}
	})

	it('honors the latest requested state across opposing concurrent transitions', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		try {
			const firstStart = server.start()
			const stopping = server.stop()
			const latestStart = server.start()
			await Promise.all([firstStart, stopping, latestStart])

			expect(server.listening).toBe(true)
			expect((await fetch(server.url)).status).toBe(200)
		} finally {
			await server.stop()
		}
	})

	it('forces a hostile partial-header connection closed during stop', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		try {
			await server.start()
			const socket = connect({ host: server.host, port: server.port })
			try {
				await once(socket, 'connect')
				socket.write('GET / HTTP/1.1\\r\\nHost: localhost')
				const closed = waitForSocketClose(socket)

				await server.stop()
				await closed
				expect(socket.destroyed).toBe(true)
			} finally {
				socket.destroy()
			}
		} finally {
			await server.stop()
		}
	})

	it('bounds simultaneous idle connections and recovers after capacity is released', async () => {
		const server = createApplicationServer({ host: '127.0.0.1', port: 0 })
		const sockets = []
		try {
			await server.start()
			for (let index = 0; index < APP_MAX_CONNECTIONS; index += 1) {
				const socket = connect({ host: server.host, port: server.port })
				await once(socket, 'connect')
				socket.write('GET / HTTP/1.1\\r\\nHost: localhost')
				sockets.push(socket)
			}
			const overflow = connect({ host: server.host, port: server.port })
			try {
				const closed = waitForSocketClose(overflow)
				await once(overflow, 'connect')
				await closed
				expect(overflow.destroyed).toBe(true)
			} finally {
				overflow.destroy()
			}
			const released = sockets.pop()
			if (released === undefined) throw new Error('expected a held connection')
			const releasedClose = waitForSocketClose(released)
			released.destroy()
			await releasedClose
			const response = await waitForLoopbackResponse(server.port)
			expect(response.status).toBe(200)
		} finally {
			for (const socket of sockets) socket.destroy()
			await server.stop()
		}
	})

	it('starts the built executable, serves loopback traffic, terminates on SIGTERM, and releases its port', async () => {
		const port = await reserveLoopbackPort()
		const application = startApplicationProcess(port)
		try {
			const response = await waitForApplicationResponse(application, port)
			expect(response.status).toBe(200)
			expect(await response.json()).toEqual({ name: APP_NAME, status: 'ok' })

			expect(application.child.kill('SIGTERM')).toBe(true)
			const exited = await waitForApplicationProcess(application)
			expect(exited).toEqual(
				process.platform === 'win32'
					? { code: null, signal: 'SIGTERM' }
					: { code: 0, signal: null },
			)

			const released = createServer()
			try {
				released.listen(port, '127.0.0.1')
				await once(released, 'listening')
				expect(released.listening).toBe(true)
			} finally {
				await stopNodeServer(released)
			}
		} finally {
			if (application.child.exitCode === null && application.child.signalCode === null) {
				application.child.kill('SIGKILL')
				await waitForApplicationProcess(application)
			}
		}
	})

	it('exits nonzero on a real executable port collision without disturbing the owner', async () => {
		const port = await reserveLoopbackPort()
		const owner = createServer()
		owner.listen(port, '127.0.0.1')
		await once(owner, 'listening')
		const application = startApplicationProcess(port)
		try {
			const exited = await waitForApplicationProcess(application)
			expect(exited).toEqual({ code: 1, signal: null })
			expect(application.output()).toBe('[LIFECYCLE] Application server lifecycle failed\\n')
			expect(application.output()).not.toContain('EADDRINUSE')
			expect(application.output()).not.toContain('context')
			expect(application.output()).not.toContain('cause')
			expect(application.output()).not.toContain('at ')
			expect(owner.listening).toBe(true)
		} finally {
			if (application.child.exitCode === null && application.child.signalCode === null) {
				application.child.kill('SIGKILL')
				await waitForApplicationProcess(application)
			}
			await stopNodeServer(owner)
		}
	})

	it('redacts malformed environment values from executable diagnostics', async () => {
		const secret = 'SENTINEL_SECRET/invalid'
		const application = startApplicationProcess(0, { APP_HOST: secret })
		const exited = await waitForApplicationProcess(application)
		expect(exited).toEqual({ code: 1, signal: null })
		expect(application.output()).toBe('[CONFIG] Application server configuration failed\\n')
		expect(application.output()).not.toContain(secret)
		expect(application.output()).not.toContain('context')
		expect(application.output()).not.toContain('cause')
		expect(application.output()).not.toContain('at ')
	})

	it('releases process listeners through explicit, repeated, convenience, and signal cleanup', async () => {
		const signalCount = process.listenerCount('SIGTERM')
		const interruptCount = process.listenerCount('SIGINT')
		const runner = new ApplicationServerRunner({ host: '127.0.0.1', port: 0 })
		try {
			expect(runner.start()).toBeUndefined()
			expect(runner.start()).toBeUndefined()
			expect(process.listenerCount('SIGTERM')).toBe(signalCount + 1)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount + 1)

			await runner.stop()
			await runner.stop()
			expect(process.listenerCount('SIGTERM')).toBe(signalCount)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount)

			const convenience = startApplicationServer({ host: '127.0.0.1', port: 0 })
			expect(process.listenerCount('SIGTERM')).toBe(signalCount + 1)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount + 1)
			await convenience.stop()
			expect(process.listenerCount('SIGTERM')).toBe(signalCount)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount)

			runner.start()
			expect(process.listenerCount('SIGTERM')).toBe(signalCount + 1)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount + 1)
			process.emit('SIGTERM')
			await runner.stop()
			expect(process.listenerCount('SIGTERM')).toBe(signalCount)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount)
		} finally {
			await runner.stop()
		}
	})

	it('keeps a newer runner generation owned when an older start fails during restart', async () => {
		const signalCount = process.listenerCount('SIGTERM')
		const interruptCount = process.listenerCount('SIGINT')
		const previousExitCode = process.exitCode
		const port = await reserveLoopbackPort()
		const owner = createServer()
		owner.listen(port, '127.0.0.1')
		await once(owner, 'listening')
		const runner = new ApplicationServerRunner({ host: '127.0.0.1', port })
		try {
			runner.start()
			await Promise.resolve()
			const stopping = runner.stop()
			runner.start()
			await stopNodeServer(owner)
			await stopping

			const response = await waitForLoopbackResponse(port)
			expect(response.status).toBe(200)
			expect(process.exitCode).toBe(previousExitCode)
			expect(process.listenerCount('SIGTERM')).toBe(signalCount + 1)
			expect(process.listenerCount('SIGINT')).toBe(interruptCount + 1)
		} finally {
			await runner.stop()
			await stopNodeServer(owner)
			process.exitCode = previousExitCode
		}
	})
})
`,
	}),
	appServerParsersTest: Object.freeze({
		id: 'appServerParsersTest',
		name: 'appServerParsersTest',
		summary: 'The hostile server environment parser test.',
		category: 'tests',
		placeholders: Object.freeze([]),
		content: `import {
	ApplicationServerError,
	isApplicationServerError,
	MAX_APP_HOST_INPUT_LENGTH,
	MAX_APP_NUMBER_INPUT_LENGTH,
	MAX_APP_START_TIMEOUT,
	parseApplicationHost,
	parseApplicationPort,
	parseApplicationServerOptions,
	parseApplicationStartTimeout,
} from '@app/server'
import { describe, expect, it } from 'vitest'

describe('application environment parsers', () => {
	it('accepts port boundaries and trims a host', () => {
		expect(parseApplicationPort('0')).toBe(0)
		expect(parseApplicationPort('65535')).toBe(65_535)
		expect(parseApplicationPort(' 3000 ')).toBe(3000)
		expect(parseApplicationHost(' 127.0.0.1 ')).toBe('127.0.0.1')
		expect(parseApplicationHost('0.0.0.0')).toBe('0.0.0.0')
		expect(parseApplicationHost('::1')).toBe('::1')
		expect(parseApplicationHost(\`\${'a'.repeat(63)}.example\`)).toBe(\`\${'a'.repeat(63)}.example\`)
		expect(parseApplicationStartTimeout('1')).toBe(1)
		expect(parseApplicationStartTimeout(String(MAX_APP_START_TIMEOUT))).toBe(MAX_APP_START_TIMEOUT)
	})

	it.each(['', '-1', '65536', '1.5', '+1', '0x10', '1e3', 'NaN', 'Infinity'])(
		'rejects hostile APP_PORT value %s',
		(value) => {
			expect(() => parseApplicationPort(value)).toThrow(ApplicationServerError)
		},
	)

	it.each(['', '0', '300001', '1.5', '+1', '1e3', 'NaN', 'Infinity'])(
		'rejects hostile APP_START_TIMEOUT value %s',
		(value) => {
			expect(() => parseApplicationStartTimeout(value)).toThrow(ApplicationServerError)
		},
	)

	it('rejects an empty APP_HOST', () => {
		expect(() => parseApplicationHost('   ')).toThrow(ApplicationServerError)
		expect(() => parseApplicationHost(\`\${' '.repeat(MAX_APP_HOST_INPUT_LENGTH)}x\`)).toThrow(
			ApplicationServerError,
		)
		expect(() => parseApplicationPort(\`\${' '.repeat(MAX_APP_NUMBER_INPUT_LENGTH)}1\`)).toThrow(
			ApplicationServerError,
		)
		expect(() =>
			parseApplicationStartTimeout(\`\${' '.repeat(MAX_APP_NUMBER_INPUT_LENGTH)}1\`),
		).toThrow(ApplicationServerError)
	})

	it.each([
		'127.0.0.1\\0evil',
		'localhost\\r\\nheader',
		'-invalid',
		'invalid-',
		'a..b',
		'bad_host',
		'0',
		'999.999.999.999',
		\`\${'a'.repeat(64)}.example\`,
	])('rejects hostile APP_HOST value %s before listener allocation', (value) => {
		expect(() => parseApplicationHost(value)).toThrowError(
			expect.objectContaining({ code: 'CONFIG' }),
		)
	})

	it.each([null, 42, [], { port: [42] }, { timeout: 0 }])(
		'rejects hostile option container or leaf value %#',
		(value) => {
			expect(() => parseApplicationServerOptions(value)).toThrowError(
				expect.objectContaining({ code: 'CONFIG' }),
			)
		},
	)

	it.each([
		Object.create({ host: '0.0.0.0' }),
		{ post: 0 },
		new Date(),
		{ [Symbol('host')]: '0.0.0.0' },
		Object.defineProperty({}, 'host', { get: () => '0.0.0.0' }),
		new Proxy(
			{},
			{
				ownKeys: () => {
					throw new Error('hostile ownKeys trap')
				},
			},
		),
	])(
		'rejects inherited, unknown, symbolic, accessor, instance, and hostile proxy options %#',
		(value) => {
			expect(() => parseApplicationServerOptions(value)).toThrowError(
				expect.objectContaining({ code: 'CONFIG' }),
			)
		},
	)

	it('never reflects a hostile symbolic option name into diagnostics', () => {
		let caught: unknown
		try {
			parseApplicationServerOptions({ [Symbol('\\u001b[2J')]: true })
		} catch (error) {
			caught = error
		}
		if (!isApplicationServerError(caught)) {
			throw new Error('expected an ApplicationServerError')
		}
		expect(caught.message).toBe('Unknown application server option')
		expect(caught.message).not.toContain('\\u001b')
	})

	it('narrows only the exported application server error', () => {
		const error = new ApplicationServerError('CONFIG', 'invalid', { value: null })
		expect(isApplicationServerError(error)).toBe(true)
		expect(error.context).toEqual({ value: null })
		expect(isApplicationServerError(new Error('plain'))).toBe(false)
		expect(isApplicationServerError(null)).toBe(false)
		const revocable = Proxy.revocable({}, {})
		revocable.revoke()
		expect(() => parseApplicationServerOptions(revocable.proxy)).toThrow(ApplicationServerError)
		expect(isApplicationServerError(revocable.proxy)).toBe(false)
	})
})
`,
	}),
	setupGuides: Object.freeze({
		id: 'setupGuides',
		name: 'setupGuides',
		summary: 'The generated guide/source parity corpus and specifier setup.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({
				name: 'specifiers',
				description:
					'The computed exported self-specifier, module, source-cache, and resolver declarations.',
			}),
			Object.freeze({
				name: 'walkDirs',
				description: 'The existing source roots parity traverses.',
			}),
		]),
		content: `${IMPORT_KEYWORD} { readdirSync, readFileSync } from 'node:fs'
${IMPORT_KEYWORD} { join } from 'node:path'
${IMPORT_KEYWORD} { fileURLToPath } from 'node:url'
${IMPORT_KEYWORD} { createSource, parseManifest } from '@orkestrel/guide'

/** Repository root used by guide/source parity tests. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} GUIDE_ROOT = fileURLToPath(new URL('../', import.meta.url))

/** Repository roots whose TypeScript and Markdown files participate in guide parity. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} GUIDE_WALK_DIRECTORIES: readonly string[] = Object.freeze([
{{walkDirs}}
])

{{specifiers}}

/** Recursively collect one guide-parity source directory. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} walkGuideDirectory(
	root: string,
	directory: string,
	files: Record<string, string>,
): void {
	for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
		const relative = \`\${directory}/\${entry.name}\`
		if (entry.isDirectory()) {
			walkGuideDirectory(root, relative, files)
			continue
		}
		if (/^app\\/(?:browser|server)\\/main\\.ts$/.test(relative)) continue
		if (!/\\.(?:cts|md|mts|ts|tsx)$/.test(entry.name)) continue
		files[relative] = readFileSync(join(root, relative), 'utf8')
	}
}

/** Read all source text used by guide/source parity. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} readGuideWorkspace(
	root: string,
	directories: readonly string[],
): Readonly<Record<string, string>> {
	const files: Record<string, string> = {}
	for (const directory of directories) walkGuideDirectory(root, directory, files)
	files['AGENTS.md'] = readFileSync(join(root, 'AGENTS.md'), 'utf8')
	return Object.freeze(files)
}

/** Complete immutable source corpus used by guide/source parity. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} GUIDE_FILES = readGuideWorkspace(GUIDE_ROOT, GUIDE_WALK_DIRECTORIES)

/** Read one required guide-parity source file. */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} readGuideText(relative: string): string {
	const text = GUIDE_FILES[relative]
	if (text === undefined) throw new Error(\`Missing file: \${relative}\`)
	return text
}

/** Parsed guide manifest shared by every guide/source parity assertion. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} GUIDE_MANIFEST = parseManifest(readGuideText('guides/README.md'), 'guides')
`,
	}),
	parityTest: Object.freeze({
		id: 'parityTest',
		name: 'parityTest',
		summary: 'The consumer-side guides-parity drop-in — `tests/guides/src/parity.test.ts`.',
		category: 'tests',
		placeholders: Object.freeze([
			Object.freeze({ name: 'name', description: 'The lowercase-hyphen package name.' }),
		]),
		content: `// The consumer-side guides-parity drop-in: runs \`@orkestrel/guide\`'s
// checks against this repo's own \`guides/README.md\` manifest.

${IMPORT_KEYWORD} { describe, expect, it } from 'vitest'
${IMPORT_KEYWORD} {
	createGuide,
	createSource,
	fenceImports,
	findMissing,
	findUnexampled,
	isExternalLink,
	missingSymbols,
	resolveLink,
	symbolKey,
} from '@orkestrel/guide'
${IMPORT_KEYWORD} {
	exportsFor,
	GUIDE_FILES,
	GUIDE_MANIFEST,
	readGuideText,
	SELF_SPECIFIERS,
} from '../../setupGuides.js'

it('manifest lists at least one guide', () => {
	expect(GUIDE_MANIFEST.length).toBeGreaterThan(0)
})

for (const entry of GUIDE_MANIFEST) {
	const guide = createGuide(readGuideText(entry.spec))
	const source = createSource({ files: GUIDE_FILES, module: entry.source })

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

		it('documents an example for every API Surface function', () => {
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
})
