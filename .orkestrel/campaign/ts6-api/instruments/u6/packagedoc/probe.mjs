// Probe: does an entry module's `@packageDocumentation` reach the roll-up under the
// `declarationRollup` chain (tsc emit as a process, then api-extractor over the emitted entry)?
// Mirrors configs/helpers.ts `declarationRollup` and `buildExtractorOverride`.
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'

const ROOT = '/home/user/scaffold'
const load = createRequire(join(ROOT, 'package.json'))
const TSC = load.resolve('typescript/bin/tsc')
const work = mkdtempSync(join(tmpdir(), 'u6-packagedoc-'))
const write = (path, text) => {
	const full = join(work, path)
	mkdirSync(dirname(full), { recursive: true })
	writeFileSync(full, text, 'utf8')
}

write(
	'source/core/types.ts',
	`export interface Greeting {\n\treadonly text: string\n}\n`,
)
write(
	'source/core/index.ts',
	`/**\n * The probe fixture's core entry.\n *\n * @packageDocumentation\n */\nexport * from './types.js'\n`,
)
write(
	'tsconfig.json',
	JSON.stringify({
		compilerOptions: {
			target: 'ESNext',
			module: 'ESNext',
			moduleResolution: 'bundler',
			lib: ['ESNext'],
			types: [],
			strict: true,
			declaration: true,
			emitDeclarationOnly: true,
			rootDir: 'source',
			outDir: 'out',
			skipLibCheck: true,
		},
		include: ['source/**/*.ts'],
	}),
)

const run = (args) => execFileSync(process.execPath, [TSC, ...args], { cwd: work, encoding: 'utf8' })
const shown = JSON.parse(run(['--showConfig', '-p', 'tsconfig.json']))
const emit = mkdtempSync(join(tmpdir(), 'u6-packagedoc-emit-'))
run(['-p', 'tsconfig.json', '--declaration', '--emitDeclarationOnly', '--noEmit', 'false', '--outDir', emit])
const entry = resolve(emit, relative('source', 'source/core/index.ts').replace(/\.ts$/, '.d.ts'))
console.log('emitted entry:')
console.log(readFileSync(entry, 'utf8'))

const extractor = load('@microsoft/api-extractor')
const rollup = join(work, 'rollup.d.ts')
const prepared = extractor.ExtractorConfig.prepare({
	configObject: {
		projectFolder: work,
		mainEntryPointFilePath: entry,
		bundledPackages: [],
		compiler: {
			overrideTsconfig: {
				compilerOptions: {
					types: shown.compilerOptions.types ?? [],
					lib: shown.compilerOptions.lib ?? ['lib.esnext.d.ts'],
					target: 'ESNext',
					module: 'ESNext',
					moduleResolution: 'bundler',
					skipLibCheck: true,
					strict: true,
				},
				files: [entry],
			},
		},
		apiReport: { enabled: false },
		docModel: { enabled: false },
		tsdocMetadata: { enabled: false },
		dtsRollup: { enabled: true, untrimmedFilePath: rollup },
		messages: {
			compilerMessageReporting: { default: { logLevel: 'none' } },
			extractorMessageReporting: { default: { logLevel: 'none' } },
			tsdocMessageReporting: { default: { logLevel: 'none' } },
		},
	},
	configObjectFullPath: join(work, 'api-extractor.json'),
	packageJsonFullPath: join(ROOT, 'package.json'),
})
const outcome = extractor.Extractor.invoke(prepared, {
	localBuild: true,
	showVerboseMessages: false,
	showDiagnostics: false,
})
console.log('succeeded:', outcome.succeeded)
const text = readFileSync(rollup, 'utf8')
console.log('rollup:')
console.log(text)
console.log('carries @packageDocumentation:', text.includes('@packageDocumentation'))
rmSync(emit, { recursive: true, force: true })
