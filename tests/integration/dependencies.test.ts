import { describe, expect, it } from 'vitest'
import {
	executeGeneratedConsumerDependencies,
	executeLinkedOutputConsumer,
	executeMixedCaseConsumer,
	executeSymlinkConsumer,
} from '../setupE2E.js'
import { canDirectoryLink, canIgnoreFilesystemCase, canSymlink } from '../setupServer.js'

describe('generated mixed-workspace dependency boundaries', () => {
	it('proves development-server, linked-root, physical-package-root, and output behavior', async () => {
		await expect(executeGeneratedConsumerDependencies()).resolves.toBeUndefined()
	}, 480_000)

	it.skipIf(!canIgnoreFilesystemCase)(
		'rejects an absent manifest beneath a mixed-case node_modules boundary',
		async () => {
			await expect(executeMixedCaseConsumer()).resolves.toBeUndefined()
		},
		180_000,
	)

	it.skipIf(!canSymlink)(
		'rejects imported symlinks that escape app/browser and ignores public-directory symlinks',
		async () => {
			await expect(executeSymlinkConsumer()).resolves.toBeUndefined()
		},
		180_000,
	)

	it.skipIf(!canDirectoryLink)(
		'rejects a linked build output before preserving user-owned bytes',
		async () => {
			await expect(executeLinkedOutputConsumer()).resolves.toBeUndefined()
		},
		180_000,
	)
})
