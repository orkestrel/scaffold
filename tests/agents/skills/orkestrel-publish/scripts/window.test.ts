import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import {
	OPTIONS,
	parseArguments,
	findGitRoot,
	parseJsonRecord,
	readErrorCode,
	readManifestName,
	readString,
	resolveNpm,
	runNpm,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/window.ts'
import {
	buildWhoamiEnvironment,
	createPublishRegistry,
	createWhoamiRegistry,
	runSkillScript,
	spawnSkillScript,
	WINDOW_SCRIPT,
	runFlagRefusals,
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
			const empty = runSkillScript(WINDOW_SCRIPT, ['--whoami', '--wait', ''], { cwd: scratch.path })
			expect(empty.status).toBe(64)
			expect(empty.stderr).toContain('--wait takes a number of seconds from 0, not ""')
			const blank = runSkillScript(WINDOW_SCRIPT, ['--whoami', '--wait', ' '], {
				cwd: scratch.path,
			})
			expect(blank.status).toBe(64)
			expect(blank.stderr).toContain('--wait takes a number of seconds from 0, not " "')
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

	it('refuses a flag it does not read, a value given to a switch, and a stray argument before it contacts npm, and reads the --flag=value form', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-unknown-' })
		const registry = await createWhoamiRegistry(undefined)
		try {
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const env = buildWhoamiEnvironment(scratch.path, registry)
			for (const argv of [
				['--whoami', '--bogus'],
				['--login', '--json=1'],
				['--publish', 'pkg', '--otp', '123456', '--bogus'],
				['--confirm', '@fixture/pkg@1.0.0', '--json=1'],
				['--whoami', 'stray'],
				['--whoami', '--wait=soon'],
			]) {
				const run = await spawnSkillScript(WINDOW_SCRIPT, argv, { cwd: scratch.path, env })
				expect([argv, run.status]).toStrictEqual([argv, 64])
				expect(run.stderr).toContain('usage: window.ts')
				expect(run.stdout).toBe('')
			}
			const unknown = await spawnSkillScript(WINDOW_SCRIPT, ['--whoami', '--bogus'], {
				cwd: scratch.path,
				env,
			})
			expect(unknown.stderr).toContain("'--bogus'")
			const soon = await spawnSkillScript(WINDOW_SCRIPT, ['--whoami', '--wait', 'soon'], {
				cwd: scratch.path,
				env,
			})
			expect(soon.stderr).toContain('--wait takes a number of seconds from 0, not "soon"')
			expect(registry.requests).toEqual([])
			expect(scratch.has('tmp/units')).toBe(false)
			const equals = await spawnSkillScript(WINDOW_SCRIPT, ['--whoami', '--wait=0'], {
				cwd: scratch.path,
				env,
			})
			expect(equals.status).toBe(3)
			expect(equals.json).toMatchObject({ mode: 'whoami', live: false })
			expect(registry.requests).not.toEqual([])
			expect(parseArguments(['--publish', 'a', 'b', '--otp=123456'])).toEqual({
				success: true,
				value: { values: { publish: true, otp: '123456' }, positionals: ['a', 'b'] },
			})
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('reads --publish A B --otp X as the directories A and B, and refuses a list without the mode that takes it', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-list-' })
		const dark = await createWhoamiRegistry(undefined)
		try {
			const env = buildWhoamiEnvironment(scratch.path, dark)
			scratch.write('a/package.json', '{"name":"@fixture/a","version":"1.0.0"}')
			scratch.write('b/package.json', '{"name":"@fixture/b","version":"1.0.0"}')
			for (const [argv, status] of [
				[['--publish', 'a', 'absent', '--otp', '123456'], 64],
				[['--publish', 'absent', 'b', '--otp', '123456'], 64],
				[['--publish', 'a', 'b', '--otp', '123456'], 3],
			] as const) {
				const run = await spawnSkillScript(WINDOW_SCRIPT, argv, { cwd: scratch.path, env })
				expect([argv, run.status]).toStrictEqual([argv, status])
			}
			expect(dark.requests).toEqual(['GET /-/whoami'])
			const stray = await spawnSkillScript(WINDOW_SCRIPT, ['--whoami', 'a', 'b'], {
				cwd: scratch.path,
				env,
			})
			expect(stray.status).toBe(64)
			expect(stray.stderr).toContain(
				'"a", "b" given without --publish or --confirm, the modes that take a list',
			)
			expect(dark.requests).toEqual(['GET /-/whoami'])
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			await dark.destroy()
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

	it('prints the login command and polls the session until it answers or the wait ends', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-login-' })
		const dark = await createWhoamiRegistry(undefined)
		const live = await createWhoamiRegistry('fixture')
		try {
			const answered = await spawnSkillScript(WINDOW_SCRIPT, ['--login', '--wait', '0'], {
				cwd: scratch.path,
				env: buildWhoamiEnvironment(scratch.path, live),
			})
			expect(answered.status).toBe(0)
			expect(answered.json).toMatchObject({ mode: 'login', user: 'fixture', live: true })
			const command = answered.json?.command
			expect(typeof command === 'string' && command.includes('npm login --browser=false')).toBe(
				true,
			)
			expect(answered.stderr).toContain('window: run this in a real terminal')
			expect(answered.stderr).toContain(String(command))
			expect(live.requests).toContain('GET /-/whoami')
			const unanswered = await spawnSkillScript(WINDOW_SCRIPT, ['--login', '--wait', '0'], {
				cwd: scratch.path,
				env: buildWhoamiEnvironment(scratch.path, dark),
			})
			expect(unanswered.status).toBe(3)
			expect(unanswered.json).toMatchObject({ mode: 'login', live: false })
			expect(unanswered.json?.user).toBeUndefined()
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
			const env = {
				...buildWhoamiEnvironment(scratch.path, registry),
				npm_config_loglevel: 'silent',
			}
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
				results: [{ target: '@fixture/pkg@1.0.0', served: false }],
			})
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('accepts an upload, journals the acceptance line, and confirms the version the registry then serves', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-accepted-' })
		const registry = await createPublishRegistry('fixture')
		try {
			const env = {
				...buildWhoamiEnvironment(scratch.path, registry),
				npm_config_loglevel: 'silent',
			}
			scratch.write('pkg/package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const before = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--confirm', '@fixture/pkg@1.0.0', '--wait', '0'],
				{ cwd: scratch.path, env },
			)
			expect(before.status).toBe(3)
			const published = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'pkg', '--otp', '123456', '--json'],
				{ cwd: scratch.path, env },
			)
			expect(published.status).toBe(0)
			expect(published.stderr).toContain('window: accepted @fixture/pkg@1.0.0')
			expect(registry.uploads).toEqual(['@fixture/pkg'])
			const uploads = published.json?.uploads
			if (!isArray(uploads) || uploads.length !== 1)
				throw new Error('The publish reported no upload')
			expect(uploads[0]).toMatchObject({
				directory: 'pkg',
				name: '@fixture/pkg',
				version: '1.0.0',
				exit: 0,
				accepted: true,
				confirmed: true,
				journal: 'tmp/units/publish--fixture-pkg.log',
			})
			expect(scratch.read('tmp/units/publish--fixture-pkg.log') ?? '').toContain(
				'+ @fixture/pkg@1.0.0',
			)
			const served = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--confirm', '@fixture/pkg@1.0.0', '--wait', '0'],
				{ cwd: scratch.path, env },
			)
			expect(served.status).toBe(0)
			expect(served.json).toEqual({
				mode: 'confirm',
				results: [{ target: '@fixture/pkg@1.0.0', served: true }],
			})
			const other = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--confirm', '@fixture/pkg@1.0.0', '@fixture/pkg@2.0.0', '--wait', '0'],
				{ cwd: scratch.path, env },
			)
			expect(other.status).toBe(3)
			expect(other.json).toEqual({
				mode: 'confirm',
				results: [
					{ target: '@fixture/pkg@1.0.0', served: true },
					{ target: '@fixture/pkg@2.0.0', served: false },
				],
			})
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('stops a batch at its first refusal, names the package to resume from, and publishes nothing after it', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-stop-' })
		const registry = await createPublishRegistry('fixture', ['@fixture/first'])
		try {
			const env = {
				...buildWhoamiEnvironment(scratch.path, registry),
				npm_config_loglevel: 'silent',
			}
			scratch.write('first/package.json', '{"name":"@fixture/first","version":"1.0.0"}')
			scratch.write('second/package.json', '{"name":"@fixture/second","version":"1.0.0"}')
			const run = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'first', 'second', '--otp', '123456', '--json'],
				{ cwd: scratch.path, env },
			)
			expect(run.status).toBe(3)
			expect(run.stderr).toContain(
				'window: @fixture/first refused (E403); resume from it on a fresh code',
			)
			expect(run.stderr).not.toContain('@fixture/second')
			expect(registry.uploads).toEqual([])
			expect(registry.requests.filter((line) => line.startsWith('PUT '))).toHaveLength(1)
			const uploads = run.json?.uploads
			if (!isArray(uploads) || uploads.length !== 1)
				throw new Error('The publish reported more than the refused upload')
			expect(uploads[0]).toMatchObject({
				directory: 'first',
				name: '@fixture/first',
				accepted: false,
				confirmed: false,
				code: 'E403',
			})
			expect(scratch.has('tmp/units/publish--fixture-first.log')).toBe(true)
			expect(scratch.has('tmp/units/publish--fixture-second.log')).toBe(false)
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})

	it('confirms the packages a batch published before its refusal and leaves the rest unpublished', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-partial-' })
		const registry = await createPublishRegistry('fixture', ['@fixture/b'])
		try {
			const env = {
				...buildWhoamiEnvironment(scratch.path, registry),
				npm_config_loglevel: 'silent',
			}
			for (const name of ['a', 'b', 'c']) {
				scratch.write(`${name}/package.json`, `{"name":"@fixture/${name}","version":"1.0.0"}`)
			}
			const run = await spawnSkillScript(
				WINDOW_SCRIPT,
				['--publish', 'a', 'b', 'c', '--otp', '123456'],
				{ cwd: scratch.path, env },
			)
			expect(run.status).toBe(3)
			expect(registry.uploads).toEqual(['@fixture/a'])
			const rows = run.stdout.split(/\r\n|\n/u).filter((line) => line.startsWith('window: '))
			expect(rows).toEqual([
				'window: a\t@fixture/a@1.0.0\taccepted\tconfirmed\ttmp/units/publish--fixture-a.log',
				'window: b\t@fixture/b@1.0.0\trefused E403\tunconfirmed\ttmp/units/publish--fixture-b.log',
			])
			expect(scratch.has('tmp/units/publish--fixture-c.log')).toBe(false)
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})
})

describe('the error code and the manifest reader', () => {
	it('reads the first npm error code in a text and answers undefined when none appears', () => {
		expect(readErrorCode('npm error code EOTP\nnpm error This operation requires a one-time')).toBe(
			'EOTP',
		)
		expect(readErrorCode('npm error code E401\nnpm error 401 Unauthorized')).toBe('E401')
		expect(readErrorCode('npm error code E403')).toBe('E403')
		expect(readErrorCode('npm error code E404')).toBe('E404')
		expect(readErrorCode('npm error code ENOTFOUND')).toBe('ENOTFOUND')
		expect(readErrorCode('first E401 then E403')).toBe('E401')
		expect(readErrorCode('npm error code e401')).toBeUndefined()
		expect(readErrorCode('an E4 or EA is too short')).toBeUndefined()
		expect(readErrorCode('NOTE401 is not a code')).toBeUndefined()
		expect(readErrorCode('')).toBeUndefined()
	})

	it('reads the name and version a manifest declares and answers undefined for an absent or unreadable one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-manifest-' })
		try {
			expect(readManifestName(scratch.path)).toEqual({ name: undefined, version: undefined })
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			expect(readManifestName(scratch.path)).toEqual({ name: '@fixture/pkg', version: '1.0.0' })
			scratch.write('package.json', '{"version":"1.0.0"}')
			expect(readManifestName(scratch.path)).toEqual({ name: undefined, version: '1.0.0' })
			scratch.write('package.json', '{ this is not json')
			expect(readManifestName(scratch.path)).toEqual({ name: undefined, version: undefined })
		} finally {
			scratch.destroy()
		}
	})

	it('finds the nearest directory that holds a .git entry', () => {
		const scratch = createScratch({ prefix: 'orkestrel-window-root-' })
		try {
			scratch.ensure('.git')
			scratch.ensure('outer/deep')
			scratch.ensure('nested/.git')
			scratch.ensure('nested/deep')
			expect(findGitRoot(scratch.path)).toBe(scratch.path)
			expect(findGitRoot(join(scratch.path, 'outer', 'deep'))).toBe(scratch.path)
			expect(findGitRoot(join(scratch.path, 'nested', 'deep'))).toBe(join(scratch.path, 'nested'))
		} finally {
			scratch.destroy()
		}
	})
})

describe('the copied helpers', () => {
	it('parses a whole document as one record and reads its string members', () => {
		expect(parseJsonRecord('{\n\t"name": "@fixture/pkg"\n}\n')).toEqual({ name: '@fixture/pkg' })
		expect(parseJsonRecord('[1]')).toBeUndefined()
		expect(parseJsonRecord('not json')).toBeUndefined()
		expect(parseJsonRecord('')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
	})

	it('resolves an npm command that answers', () => {
		const npm = resolveNpm()
		expect(npm.prefix.length === 0 || existsSync(npm.prefix[0] ?? '')).toBe(true)
		const result = runNpm(['--version'])
		expect(result.status).toBe(0)
		expect(/^\d+\.\d+\.\d+/u.test(result.stdout.trim())).toBe(true)
	})
})

describe('the parseArgs refusals', () => {
	it('names the flag parseArgs refuses through the source, a linked directory, and the built twin, and leaves the directory untouched', () => {
		expect(runFlagRefusals(WINDOW_SCRIPT, OPTIONS)).toStrictEqual([])
	})
})
