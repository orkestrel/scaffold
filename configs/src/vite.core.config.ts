import { defineConfig, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { environmentBoundary, outputBoundary } from '../helpers.js'
import { peers, srcCore, resolveWorkspacePath } from '../../vite.config.ts'

export default defineConfig(
	mergeConfig(srcCore(), {
		publicDir: false,
		plugins: [
			outputBoundary('dist/src/core'),
			environmentBoundary('src/core'),
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
				bundleTypes: {
					extractorConfig: {
						compiler: {
							overrideTsconfig: {
								compilerOptions: { types: ['node'] },
							},
						},
					},
					// `unplugin-dts` points api-extractor's default library location at the
					// installed `typescript` package's root, which ships no `lib.*.d.ts` at the 7
					// major. api-extractor applies the option only when it names a folder, so an
					// empty one restores the library files of the compiler it bundles.
					invokeOptions: { typescriptCompilerFolder: '' },
				},
			}),
		],
		build: {
			lib: {
				entry: resolveWorkspacePath('src/core/index.ts'),
				formats: ['es', 'cjs'],
				fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
			},
			outDir: 'dist/src/core',
			rolldownOptions: {
				external: (id: string) =>
					id.startsWith('node:') ||
					id.startsWith('@orkestrel/') ||
					peers.some((peer) => id === peer || id.startsWith(peer + '/')),
			},
		},
	}),
)
