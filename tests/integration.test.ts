import { spawnSync } from 'node:child_process'
import {
	existsSync,
	globSync,
	mkdtempSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const registry =
	spawnSync(npm, ['ping', '--fetch-retries=0', '--fetch-timeout=1000', '--loglevel=silent'], {
		cwd: root,
		stdio: 'ignore',
		timeout: 5_000,
		windowsHide: true,
	}).status === 0

// One shipped `@example` claim about `isFilesystemPath`: the argument it names
// and the verdict it prints beside it. The pattern reads the built declaration,
// which is the text a consumer's editor prints on hover, so what is measured is
// what the package hands out rather than a comment beside the source.
const SHIPPED_EXAMPLE = /isFilesystemPath\('(?<value>[^']*)'\) \/\/ (?<verdict>true|false)/gu

describe('installed package consumer', () => {
	it('answers every example its shipped declaration prints exactly as printed', () => {
		const declaration = readFileSync(resolve(root, 'dist/src/server/index.d.ts'), 'utf8')
		const examples = [...declaration.matchAll(SHIPPED_EXAMPLE)].map((match) => ({
			value: match.groups?.value ?? '',
			expected: match.groups?.verdict === 'true',
		}))
		// The instrument reads text, so it reports nothing where it matches nothing.
		// This is its membership rule, stated before the verdict it produces.
		expect(examples.map(({ value }) => value)).toStrictEqual([
			'C:/Users/sample/project',
			'../sibling',
			'project/',
			'project//src',
			'project/nul',
		])
		const server = pathToFileURL(resolve(root, 'dist/src/server/index.js')).href
		const source = [
			`const server = await import(${JSON.stringify(server)})`,
			`const examples = ${JSON.stringify(examples.map(({ value }) => value))}`,
			'const answers = examples.map((value) => server.isFilesystemPath(value))',
			'process.stdout.write(JSON.stringify(answers))',
		].join('\n')
		const driven = spawnSync(process.execPath, ['--input-type=module', '--eval', source], {
			cwd: root,
			encoding: 'utf8',
			windowsHide: true,
		})
		expect(driven.status).toBe(0)
		expect(JSON.parse(driven.stdout)).toStrictEqual(examples.map(({ expected }) => expected))
		// The control is the line this package shipped before the correction. It is
		// outside the declaration's present population, and the extraction reads a
		// verdict from it that the run above contradicts, so a clean pass cannot be
		// an instrument that matched nothing.
		const control = [..."isFilesystemPath('project/') // false".matchAll(SHIPPED_EXAMPLE)]
		expect(control).toHaveLength(1)
		expect(control[0]?.groups?.verdict).toBe('false')
		expect(examples.find(({ value }) => value === 'project/')?.expected).toBe(true)
	})

	it('drives the built compiler from outside the checkout without a network install', () => {
		const workspace = mkdtempSync(join(tmpdir(), 'scaffold-e4-driver-'))
		const target = join(workspace, 'generated')
		const core = pathToFileURL(resolve(root, 'dist/src/core/index.js')).href
		const server = pathToFileURL(resolve(root, 'dist/src/server/index.js')).href
		const missing = pathToFileURL(resolve(root, 'dist/outside-integration-control.js')).href
		try {
			const control = spawnSync(
				process.execPath,
				['--input-type=module', '--eval', `await import(${JSON.stringify(missing)})`],
				{ cwd: workspace, encoding: 'utf8', windowsHide: true },
			)
			expect(control.status).not.toBe(0)

			const source = [
				`const core = await import(${JSON.stringify(core)})`,
				`const server = await import(${JSON.stringify(server)})`,
				"const blueprint = core.createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })",
				'const compiler = core.createCompiler()',
				'const plan = compiler.compile(blueprint).plan',
				"if (plan === undefined) throw new Error('The generated proof blueprint was blocked')",
				'compiler.destroy()',
				`const materializer = server.createMaterializer({ host: ${JSON.stringify(resolve(root, 'dist/host'))} })`,
				`const result = materializer.materialize(plan, ${JSON.stringify(target)})`,
				'materializer.destroy()',
				'process.stdout.write(String(result.written.length))',
			].join('\n')
			const driven = spawnSync(process.execPath, ['--input-type=module', '--eval', source], {
				cwd: workspace,
				encoding: 'utf8',
				windowsHide: true,
			})
			expect(driven.status).toBe(0)
			expect(driven.stderr).toBe('')
			expect(Number(driven.stdout)).toBeGreaterThan(0)
			expect(existsSync(join(target, 'tests/config.test.ts'))).toBe(true)
			expect(existsSync(join(target, 'tests/integration.test.ts'))).toBe(true)
			expect(existsSync(join(target, 'tests/guides.test.ts'))).toBe(false)
			const manifest = readFileSync(join(target, 'package.json'), 'utf8')
			expect(manifest).toContain('"test:config"')
			expect(manifest).toContain('"test:integration"')
			expect(manifest).not.toContain('"test:guides"')
		} finally {
			rmSync(workspace, { recursive: true, force: true })
		}
	})

	it.skipIf(!registry)(
		'installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]',
		() => {
			const workspace = mkdtempSync(join(tmpdir(), 'scaffold-e4-install-'))
			const packed = join(workspace, 'packed')
			const consumer = join(workspace, 'consumer')
			const target = join(workspace, 'generated')
			try {
				mkdirSync(packed, { recursive: true })
				mkdirSync(consumer, { recursive: true })
				const pack = spawnSync(
					npm,
					['pack', '--json', '--ignore-scripts', '--pack-destination', packed],
					{ cwd: root, encoding: 'utf8', windowsHide: true },
				)
				expect(pack.status).toBe(0)
				const archives = globSync('*.tgz', { cwd: packed })
				expect(archives).toHaveLength(1)
				const archive = archives[0]
				if (archive === undefined) throw new Error('The package archive was not written')
				writeFileSync(
					join(consumer, 'package.json'),
					'{"name":"scaffold-install-consumer","private":true,"type":"module"}\n',
				)
				const install = spawnSync(
					npm,
					['install', '--ignore-scripts', '--no-audit', '--no-fund', join(packed, archive)],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(install.status).toBe(0)
				writeFileSync(
					join(consumer, 'generate.mjs'),
					[
						"import { createBlueprint, createCompiler } from '@orkestrel/scaffold'",
						"import { createMaterializer } from '@orkestrel/scaffold/server'",
						"const blueprint = createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })",
						'const compiler = createCompiler()',
						'const plan = compiler.compile(blueprint).plan',
						"if (plan === undefined) throw new Error('The generated proof blueprint was blocked')",
						'compiler.destroy()',
						'const materializer = createMaterializer()',
						`materializer.materialize(plan, ${JSON.stringify(target)})`,
						'materializer.destroy()',
					].join('\n'),
				)
				const generate = spawnSync(process.execPath, ['generate.mjs'], {
					cwd: consumer,
					encoding: 'utf8',
					windowsHide: true,
				})
				expect(generate.status).toBe(0)
				const dependencies = spawnSync(
					npm,
					['install', '--ignore-scripts', '--no-audit', '--no-fund'],
					{ cwd: target, encoding: 'utf8', windowsHide: true },
				)
				expect(dependencies.status).toBe(0)
				const gates = spawnSync(npm, ['run', 'prepublishOnly'], {
					cwd: target,
					encoding: 'utf8',
					windowsHide: true,
				})
				expect(gates.status).toBe(0)
			} finally {
				rmSync(workspace, { recursive: true, force: true })
			}
		},
		1_200_000,
	)
})
