import { describe, expect, it } from 'vitest'
import { isString } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/bench.ts'

describe('bench.ts', () => {
	it('refuses a call that names no bench or gives a flag with no value', () => {
		expect(runSkillScript(SCRIPT, []).status).toBe(64)
		expect(runSkillScript(SCRIPT, ['--cursor', '--resolve', '--cap']).status).toBe(64)
		expect(runSkillScript(SCRIPT, ['--codex', '--model']).status).toBe(64)
	})

	// The Cursor entry is read from LOCALAPPDATA inside the script's win32 branch alone, so the
	// resolution refusals are observable only where that branch runs.
	it.runIf(process.platform === 'win32')(
		'reports a missing or malformed versioned Cursor install as dark',
		() => {
			const scratch = createScratch({ prefix: 'orkestrel-bench-' })
			try {
				const absent = runSkillScript(SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(absent.status).toBe(3)
				expect(absent.json?.live).toBe(false)
				expect(
					isString(absent.json?.error) && absent.json.error.includes('is not a directory'),
				).toBe(true)
				scratch.write('cursor-agent/versions', 'not a directory')
				const file = runSkillScript(SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(file.status).toBe(3)
				expect(isString(file.json?.error) && file.json.error.includes('is not a directory')).toBe(
					true,
				)
				scratch.remove('cursor-agent/versions')
				scratch.ensure('cursor-agent/versions/2026.01.01-abcdef0')
				const bare = runSkillScript(SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(bare.status).toBe(3)
				expect(
					isString(bare.json?.error) && bare.json.error.includes('lacks node.exe or index.js'),
				).toBe(true)
				scratch.write('cursor-agent/versions/2026.01.01-abcdef0/node.exe', '')
				scratch.write('cursor-agent/versions/2026.01.01-abcdef0/index.js', '')
				const mute = runSkillScript(SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(mute.status).toBe(3)
				expect(mute.json?.live).toBe(false)
			} finally {
				scratch.destroy()
			}
		},
	)
})
