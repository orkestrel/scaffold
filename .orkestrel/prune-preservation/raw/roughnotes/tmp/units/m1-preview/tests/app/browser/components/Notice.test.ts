import type { NoticeCategory } from '@app/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { requireValue } from '@orkestrel/test'
import { COPY, NOTICE_MARKS, Notice } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

const CATEGORIES: readonly NoticeCategory[] = ['empty', 'miss', 'partial']

afterEach(() => {
	clearSurface()
})

describe('Notice', () => {
	it('announces every state politely', () => {
		for (const category of CATEGORIES) {
			const { host } = mountView(
				defineComponent(() => () => h(Notice, { category, title: COPY.none })),
			)
			expect(requireValue(host.firstElementChild).getAttribute('role')).toBe('status')
		}
	})

	it('names the state with an icon and a word, and carries the recovery it is given', () => {
		const { host } = mountView(
			defineComponent(
				() => () =>
					h(
						Notice,
						{ category: 'miss', title: COPY.empty, detail: 'Try a broader coverage term.' },
						{ default: () => h('button', { type: 'button' }, COPY.clear) },
					),
			),
		)
		expect(host.textContent).toContain(COPY.empty)
		expect(host.textContent).toContain('Try a broader coverage term.')
		const icon = requireValue(host.querySelector('i'))
		expect(icon.classList.contains(NOTICE_MARKS.miss)).toBe(true)
		expect(icon.getAttribute('aria-hidden')).toBe('true')
		expect(requireValue(host.querySelector('button')).textContent).toBe(COPY.clear)
	})

	it('reports no outcome and no progress it did not receive', () => {
		expect(Object.keys(NOTICE_MARKS).sort()).toEqual(['empty', 'miss', 'partial'])
		const { host } = mountView(
			defineComponent(() => () => h(Notice, { category: 'empty', title: COPY.none })),
		)
		expect(host.querySelector('.progress')).toBeNull()
		expect(host.querySelector('.spinner-border')).toBeNull()
		expect(host.querySelector('.alert-success')).toBeNull()
		expect(host.querySelector('a, button')).toBeNull()
		expect(host.textContent?.replace(/\s+/gu, ' ').trim()).toBe(COPY.none)
	})
})
