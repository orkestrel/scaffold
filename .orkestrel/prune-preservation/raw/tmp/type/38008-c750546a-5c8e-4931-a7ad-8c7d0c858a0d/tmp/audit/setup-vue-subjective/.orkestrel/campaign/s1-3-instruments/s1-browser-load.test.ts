import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createScratch } from '@orkestrel/test/server'
import { blueprintToConfigArtifacts, blueprintToManifest, createBlueprint } from '@src/core'
import { loadConfigFromFile } from 'vite'
import { expect, it } from 'vitest'

it('loads the materialized browser application root configuration', async () => {
	const workspace = createScratch({ parent: resolve('tmp/probe'), prefix: 's1-browser-load-' })
	try {
		const blueprint = createBlueprint('sample', { app: ['browser'] })
		for (const artifact of blueprintToConfigArtifacts(blueprint)) {
			if (artifact.origin !== 'host') workspace.write(artifact.path, artifact.content)
		}
		workspace.write('configs/helpers.ts', readFileSync(resolve('configs/helpers.ts'), 'utf8'))
		workspace.write('package.json', blueprintToManifest(blueprint))
		const loaded = await loadConfigFromFile(
			{ command: 'serve', mode: 'test' },
			resolve(workspace.path, 'vite.config.ts'),
			workspace.path,
		)
		expect(loaded).not.toBeNull()
	} finally {
		workspace.destroy()
	}
})
