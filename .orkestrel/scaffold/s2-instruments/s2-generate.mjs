import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

const action = process.argv[2]
const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom' })
try {
	const { blueprintToConfigArtifacts, createBlueprint } = await server.ssrLoadModule('/src/core/index.ts')
	const own = blueprintToConfigArtifacts(createBlueprint('scaffold', { src: ['core', 'server'], bin: true, guides: true, setup: true }))
	if (action === 'adopt') {
		for (const artifact of own) {
			if (artifact.path !== 'vite.config.ts' && !/^configs\/src\/vite\.(core|server|bin)\.config\.ts$/u.test(artifact.path)) continue
			if (readFileSync(artifact.path, 'utf8') !== artifact.content) {
				writeFileSync(artifact.path, artifact.content)
				console.log('Regenerated ' + artifact.path)
			}
		}
	} else {
		const selections = [[], ['core'], ['browser'], ['server'], ['core', 'browser'], ['core', 'server'], ['browser', 'server'], ['core', 'browser', 'server']]
		const captured = []
		for (const src of selections) {
			for (const app of selections) {
				for (const showcase of [false, true]) {
					const blueprint = createBlueprint('sample', { src, app, showcase, bin: src.length > 0, guides: true, setup: true, integration: true, conformance: true, service: true })
					captured.push({ src, app, showcase, artifacts: blueprintToConfigArtifacts(blueprint) })
				}
			}
		}
		mkdirSync('tmp/units/s2-captures', { recursive: true })
		writeFileSync('tmp/units/s2-captures/' + action + '.json', JSON.stringify({ own, captured }, null, '\t') + '\n')
		console.log('Captured ' + action)
	}
} finally {
	await server.close()
}
