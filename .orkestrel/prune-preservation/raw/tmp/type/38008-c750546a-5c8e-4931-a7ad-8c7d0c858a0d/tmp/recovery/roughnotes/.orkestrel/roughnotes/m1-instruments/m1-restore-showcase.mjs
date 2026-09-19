import { readFileSync, writeFileSync } from 'node:fs'
const path = 'vite.config.ts'
const raw = readFileSync(path, 'utf8')
const anchor = `export function policy(override?: UserConfig): UserConfig {`
if (!raw.includes(anchor)) throw new Error('anchor missing')
const block = `/**
 * Builds the browser configuration written to its own output directory.
 *
 * @param override - Configuration to merge onto the showcase configuration
 * @returns The browser configuration writing \`dist/showcase\`, merged with the override
 *
 * @remarks
 * A showcase is the browser application written to its own output, so this restates neither the
 * aliases, the plugins, nor the build options \`appBrowser\` declares. The showcase boundary carries
 * the plugin name the browser boundary carries, so the merge replaces that boundary rather than
 * adding a second one.
 *
 * No wrapper selects this configuration. A workspace uses it by adding
 * \`configs/app/vite.showcase.config.ts\`, whose presence is what makes a workspace a showcase
 * workspace.
 *
 * @example
 * \`\`\`ts
 * appShowcase({ build: { minify: true } })
 * \`\`\`
 */
export function appShowcase(override?: UserConfig): UserConfig {
	const output = 'dist/showcase'
	const showcase: UserConfig = {
		plugins: [outputBoundary(output)],
		build: { outDir: resolveWorkspacePath(output) },
	}
	return appBrowser(mergeOverride(showcase, override))
}

`
writeFileSync(path, raw.replace(anchor, block + anchor))
console.log('restored appShowcase')
