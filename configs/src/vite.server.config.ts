import { defineConfig, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { srcServer, resolveWorkspacePath } from '../../vite.config.ts'

// vite-plugin-dts rolls this face into one declaration, and the roll-up reaches
// src/core through a relative source path the tarball does not carry. The
// following rewrite externalizes core through the package's own published root
// export, on the final roll-up only.
export default defineConfig(
	mergeConfig(srcServer(), {
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.server.json'),
				bundleTypes: {
					// `unplugin-dts` points api-extractor's default library location at the
					// installed `typescript` package's root, which ships no `lib.*.d.ts` at the 7
					// major. api-extractor applies the option only when it names a folder, so an
					// empty one restores the library files of the compiler it bundles.
					invokeOptions: { typescriptCompilerFolder: '' },
				},
				beforeWriteFile: (path, content) => ({
					content: /[\\/]dist[\\/]src[\\/]server[\\/]index\.d\.ts$/.test(path)
						? content.replaceAll(/(?:\.\.\/)+core\/index\.[jt]s/g, '@orkestrel/scaffold')
						: content,
				}),
			}),
		],
	}),
)
