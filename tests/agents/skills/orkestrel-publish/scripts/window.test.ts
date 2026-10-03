import type { IncomingMessage, Server, ServerResponse } from 'node:http'
import { writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, spawnSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-publish/scripts/window.ts'

interface Registry {
	readonly server: Server
	readonly url: string
	readonly port: number
	readonly requests: readonly string[]
}

// Answers `whoami` with the user it was given, or 401 when it was given none, refuses every upload
// with 401 (the shape npm reads as an authentication refusal), and answers every other read 404.
function answerRegistry(
	user: string | undefined,
	request: IncomingMessage,
	response: ServerResponse,
): void {
	const whoami = request.url === '/-/whoami'
	if (whoami && user !== undefined) {
		response.writeHead(200, { 'content-type': 'application/json' })
		response.end(JSON.stringify({ username: user }))
		return
	}
	const refused = whoami || request.method === 'PUT'
	response.writeHead(refused ? 401 : 404, { 'content-type': 'application/json' })
	response.end(JSON.stringify({ error: refused ? 'Unauthorized' : 'Not found' }))
}

async function startRegistry(user: string | undefined): Promise<Registry> {
	const requests: string[] = []
	const server = createServer((request, response) => {
		requests.push(`${request.method ?? ''} ${request.url ?? ''}`)
		request.resume()
		request.on('end', () => {
			answerRegistry(user, request, response)
		})
	})
	await new Promise<void>((resolve) => {
		server.listen(0, '127.0.0.1', resolve)
	})
	const address = server.address()
	if (address === null || typeof address === 'string') {
		throw new Error('The fixture registry has no port')
	}
	return { server, url: `http://127.0.0.1:${String(address.port)}/`, port: address.port, requests }
}

function stopRegistry(registry: Registry): Promise<void> {
	return new Promise((resolve) => {
		registry.server.close(() => {
			resolve()
		})
	})
}

// npm reads the fixture registry and a scratch cache from the environment, which outranks every
// config file npm launched this suite with, and the fixture token from a scratch user config, so no
// real credential reaches the fixture and no case reaches the public registry.
function buildNpmEnvironment(root: string, registry: Registry): Readonly<Record<string, string>> {
	const userconfig = join(root, `npmrc-${String(registry.port)}`)
	writeFileSync(
		userconfig,
		`//127.0.0.1:${String(registry.port)}/:_authToken=fixture-token\nupdate-notifier=false\n`,
	)
	return {
		npm_config_registry: registry.url,
		npm_config_cache: join(root, 'npm-cache'),
		npm_config_userconfig: userconfig,
		npm_config_globalconfig: join(root, 'globalrc'),
	}
}

describe('window.ts', () => {
	it('refuses a linked worktree anywhere in the publish batch and names its primary clone', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-worktree-' })
		const registry = await startRegistry('fixture')
		try {
			const env = buildNpmEnvironment(scratch.path, registry)
			scratch.write('primary/package.json', '{"name":"@fixture/primary","version":"1.0.0"}')
			scratch.ensure('primary/.git/worktrees/linked')
			scratch.write('linked/package.json', '{"name":"@fixture/linked","version":"1.0.0"}')
			scratch.write('linked/.git', 'gitdir: ../primary/.git/worktrees/linked\r\n')
			const result = await spawnSkillScript(
				SCRIPT,
				['--publish', 'primary', 'linked', '--otp', '123456'],
				{ cwd: scratch.path, env },
			)
			expect(result.status).toBe(3)
			expect(result.stderr).toContain('linked worktree')
			expect(result.stderr).toContain(join(scratch.path, 'primary'))
			expect(registry.requests).toEqual([])
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			await stopRegistry(registry)
			scratch.destroy()
		}
	})

	it('refuses malformed publish, confirm, wait, and mode combinations before reaching npm', () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-' })
		try {
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--publish', 'pkg'], { cwd: scratch.path }).status).toBe(64)
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			expect(
				runSkillScript(SCRIPT, ['--publish', 'pkg', '--otp', 'abc'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--publish', 'pkg', 'absent', '--otp', '123456'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--publish', 'pkg', '--otp'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--confirm', 'no-version'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--whoami', '--wait', 'abc'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, ['--whoami', '--wait'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--whoami', '--confirm', '@fixture/pkg@1.0.0'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reads the session from the registry and stops an upload whose session answers nothing', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-session-' })
		const dark = await startRegistry(undefined)
		const live = await startRegistry('fixture')
		try {
			const darkEnv = buildNpmEnvironment(scratch.path, dark)
			const liveEnv = buildNpmEnvironment(scratch.path, live)
			const answered = await spawnSkillScript(SCRIPT, ['--whoami'], {
				cwd: scratch.path,
				env: liveEnv,
			})
			expect(answered.status).toBe(0)
			expect(answered.json).toEqual({ mode: 'whoami', user: 'fixture', live: true })
			expect(live.requests).toContain('GET /-/whoami')
			const unanswered = await spawnSkillScript(SCRIPT, ['--whoami'], {
				cwd: scratch.path,
				env: darkEnv,
			})
			expect(unanswered.status).toBe(3)
			expect(unanswered.json).toEqual({ mode: 'whoami', live: false })
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const stopped = await spawnSkillScript(SCRIPT, ['--publish', 'pkg', '--otp', '123456'], {
				cwd: scratch.path,
				env: darkEnv,
			})
			expect(stopped.status).toBe(3)
			expect(stopped.stderr).toContain('whoami answers nothing')
			expect(dark.requests.filter((line) => line === 'GET /-/whoami').length).toBeGreaterThan(1)
			expect(dark.requests.some((line) => line.startsWith('PUT '))).toBe(false)
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			await stopRegistry(dark)
			await stopRegistry(live)
			scratch.destroy()
		}
	})

	it('uploads to the registry the session named, journals the refusal it answers, and confirms nothing it did not serve', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-upload-' })
		const registry = await startRegistry('fixture')
		try {
			const env = buildNpmEnvironment(scratch.path, registry)
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const upload = await spawnSkillScript(
				SCRIPT,
				['--publish', 'pkg', '--otp', '123456', '--json'],
				{ cwd: scratch.path, env },
			)
			expect(upload.status).toBe(3)
			expect(registry.requests.some((line) => line.startsWith('PUT /@fixture%2fpkg'))).toBe(true)
			const uploads = upload.json?.uploads
			if (!isArray(uploads) || uploads.length !== 1)
				throw new Error('The publish reported no upload')
			const [first] = uploads
			expect(
				isRecord(first) &&
					first.accepted === false &&
					first.confirmed === false &&
					first.code === 'E401',
			).toBe(true)
			expect(scratch.has('tmp/units/publish--fixture-pkg.log')).toBe(true)
			const confirm = await spawnSkillScript(
				SCRIPT,
				['--confirm', '@fixture/pkg@1.0.0', '--wait', '0'],
				{ cwd: scratch.path, env },
			)
			expect(confirm.status).toBe(3)
			expect(confirm.json).toEqual({
				mode: 'confirm',
				readings: [{ target: '@fixture/pkg@1.0.0', served: false }],
			})
		} finally {
			await stopRegistry(registry)
			scratch.destroy()
		}
	})
})
