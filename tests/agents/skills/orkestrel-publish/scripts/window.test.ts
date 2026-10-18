import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import {
	buildWhoamiEnvironment,
	createWhoamiRegistry,
	runSkillScript,
	spawnSkillScript,
	WINDOW_SCRIPT,
} from '../../../../setupServer.js'

describe('window.ts', () => {
	it('refuses a linked worktree anywhere in the publish batch and names its primary clone', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-worktree-' })
		const registry = await createWhoamiRegistry('fixture')
		try {
			const env = buildWhoamiEnvironment(scratch.path, registry)
			scratch.write('primary/package.json', '{"name":"@fixture/primary","version":"1.0.0"}')
			scratch.write('primary/.git/worktrees/linked/commondir', '../..\n')
			scratch.write('linked/package.json', '{"name":"@fixture/linked","version":"1.0.0"}')
			scratch.write('linked/.git', 'gitdir: ../primary/.git/worktrees/linked\r\n')
			const result = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'primary', 'linked', '--otp', '123456'],
				{ cwd: scratch.path, env },
			)
			expect(result.status).toBe(3)
			expect(result.stderr).toContain('linked worktree')
			expect(result.stderr.split(/\r\n|\n/u)).toContain(
				`window: linked is a linked worktree; publish from its primary clone at ${join(scratch.path, 'primary')} so npm records gitHead`,
			)
			expect(registry.requests).toEqual([])
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('refuses a package nested inside a linked worktree before contacting npm', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-nested-' })
		const registry = await createWhoamiRegistry('fixture')
		try {
			scratch.write('primary/.git/worktrees/linked/commondir', '../..\n')
			scratch.write('linked/.git', 'gitdir: ../primary/.git/worktrees/linked\n')
			scratch.write(
				'linked/packages/widget/package.json',
				'{"name":"@fixture/widget","version":"1.0.0"}',
			)
			const result = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'linked/packages/widget', '--otp', '123456'],
				{ cwd: scratch.path, env: buildWhoamiEnvironment(scratch.path, registry) },
			)
			expect(result.status).toBe(3)
			expect(result.stderr.split(/\r\n|\n/u)).toContain(
				`window: linked/packages/widget is a linked worktree; publish from its primary clone at ${join(scratch.path, 'primary')} so npm records gitHead`,
			)
			expect(registry.requests).toEqual([])
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('names a submodule without claiming the superproject is its primary clone', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-submodule-' })
		const registry = await createWhoamiRegistry('fixture')
		try {
			scratch.ensure('primary/.git/modules/widget')
			scratch.write('primary/widget/.git', 'gitdir: ../.git/modules/widget\n')
			scratch.write('primary/widget/package.json', '{"name":"@fixture/widget","version":"1.0.0"}')
			const result = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'primary/widget', '--otp', '123456'],
				{ cwd: scratch.path, env: buildWhoamiEnvironment(scratch.path, registry) },
			)
			expect(result.status).toBe(3)
			expect(result.stderr).toContain('is a submodule; publish from a standalone clone')
			expect(result.stderr).not.toContain('primary clone')
			expect(registry.requests).toEqual([])
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('refuses malformed publish, confirm, wait, and mode combinations before reaching npm', () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-' })
		try {
			expect(runSkillScript(WINDOW_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--publish', 'pkg'], { cwd: scratch.path }).status,
			).toBe(64)
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--publish', 'pkg', '--otp', 'abc'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--publish', 'pkg', 'absent', '--otp', '123456'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--publish', 'pkg', '--otp'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--confirm', 'no-version'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--whoami', '--wait', 'abc'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--whoami', '--wait'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(WINDOW_SCRIPT, ['--whoami', '--confirm', '@fixture/pkg@1.0.0'], {
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
		const dark = await createWhoamiRegistry(undefined)
		const live = await createWhoamiRegistry('fixture')
		try {
			const darkEnv = buildWhoamiEnvironment(scratch.path, dark)
			const liveEnv = buildWhoamiEnvironment(scratch.path, live)
			const answered = await spawnSkillScript(WINDOW_SCRIPT, ['--whoami'], {
				cwd: scratch.path,
				env: liveEnv,
			})
			expect(answered.status).toBe(0)
			expect(answered.json).toEqual({ mode: 'whoami', user: 'fixture', live: true })
			expect(live.requests).toContain('GET /-/whoami')
			const unanswered = await spawnSkillScript(WINDOW_SCRIPT, ['--whoami'], {
				cwd: scratch.path,
				env: darkEnv,
			})
			expect(unanswered.status).toBe(3)
			expect(unanswered.json).toEqual({ mode: 'whoami', live: false })
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const stopped = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'pkg', '--otp', '123456'],
				{
					cwd: scratch.path,
					env: darkEnv,
				},
			)
			expect(stopped.status).toBe(3)
			expect(stopped.stderr).toContain('whoami answers nothing')
			expect(dark.requests).toEqual(['GET /-/whoami', 'GET /-/whoami'])
			expect(dark.requests.some((line) => line.startsWith('PUT '))).toBe(false)
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			await dark.destroy()
			await live.destroy()
			scratch.destroy()
		}
	})

	it('uploads to the registry the session named, journals the refusal it answers, and confirms nothing it did not serve', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-upload-' })
		const registry = await createWhoamiRegistry('fixture')
		try {
			const env = buildWhoamiEnvironment(scratch.path, registry)
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const upload = await spawnSkillScript(
				WINDOW_SCRIPT,
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
				WINDOW_SCRIPT,
				['--confirm', '@fixture/pkg@1.0.0', '--wait', '0'],
				{ cwd: scratch.path, env },
			)
			expect(confirm.status).toBe(3)
			expect(confirm.json).toEqual({
				mode: 'confirm',
				readings: [{ target: '@fixture/pkg@1.0.0', served: false }],
			})
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})
})
