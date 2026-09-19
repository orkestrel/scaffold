import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { waitForCondition } from '@orkestrel/test'
import {
	clickAccessible,
	readPerception,
	readRefusal,
	readStates,
	resolveAccessible,
	waitForAnimations,
	waitForState,
} from '@orkestrel/test/browser'
import { COPY, buildName } from '@app/browser'
import { clearSurface, openSurface } from '../../../tests/setupBrowser.js'
import { VECTORS } from './setup.js'

describe('compact menu observation', () => {
	for (const vector of VECTORS) {
		it(vector.name, async () => {
			try {
				await page.viewport(390, 844)
				await openSurface()
				const trigger = resolveAccessible('button', COPY.menu)
				if (vector.opening) await clickAccessible('button', COPY.menu)
				await waitForCondition(
					'the compact menu trigger announces expanded',
					() => trigger.isConnected && readStates(trigger).includes('expanded'),
					{ budget: 4_000 },
				)
				expect(readStates(trigger)).toContain('expanded')
				await waitForAnimations(document.body, { budget: 4_000 })
				expect(readPerception(COPY.menu)).toContain(COPY.contact)
				resolveAccessible('button', COPY.close)
				expect(readRefusal('button', COPY.menu)).toBe(
					`Interactive target "${COPY.menu}" is not visible and focus-reachable`,
				)
				resolveAccessible('link', buildName(COPY.started, COPY.site))
				if (vector.closing) await clickAccessible('button', COPY.close)
				await waitForCondition(
					'the compact menu trigger is reachable again',
					() => readRefusal('button', COPY.menu) === undefined,
					{ budget: 4_000 },
				)
				expect(await waitForState('button', COPY.menu, 'collapsed')).toContain('collapsed')
				await waitForAnimations(document.body, { budget: 4_000 })
				expect(() => readPerception(COPY.menu)).toThrow(
					`Named region "${COPY.menu}" is not visible`,
				)
				expect(readRefusal('button', COPY.close)).toBe(
					`Interactive target "${COPY.close}" is not visible and focus-reachable`,
				)
			} finally {
				clearSurface()
				await page.viewport(1280, 800)
			}
		})
	}
})
