// Rewrites this repository's own configuration artifacts from the generator that emits
// them, so the byte-identity proof stays green with no expectation of its own edited.
import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

const OWN = /^(vite\.config\.ts|configs\/src\/vite\.(core|server|bin)\.config\.ts)$/u
const server = await createServer({
	configFile: false,
	server: { middlewareMode: true },
	appType: 'custom',
})
try {
	const { blueprintToConfigArtifacts, createBlueprint } =
		await server.ssrLoadModule('/src/core/index.ts')
	const blueprint = createBlueprint('scaffold', {
		src: ['core', 'server'],
		bin: true,
		guides: true,
		setup: true,
	})
	let moved = 0
	for (const artifact of blueprintToConfigArtifacts(blueprint)) {
		if (!OWN.test(artifact.path)) continue
		if (readFileSync(artifact.path, 'utf8') === artifact.content) continue
		writeFileSync(artifact.path, artifact.content)
		console.log('Regenerated ' + artifact.path)
		moved += 1
	}
	if (moved === 0) console.log('Every own configuration artifact already matches the generator.')
} finally {
	await server.close()
}
