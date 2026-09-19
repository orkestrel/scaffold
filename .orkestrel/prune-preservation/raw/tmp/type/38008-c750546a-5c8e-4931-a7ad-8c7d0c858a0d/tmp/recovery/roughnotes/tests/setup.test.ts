// Proves the behaviour `tests/setup.ts` exports, at the properties its consumers depend on. Each
// helper models a reading the workspace's configuration merge departs from, so a helper that
// stopped behaving as described would leave the conformance controls passing against nothing.
// Each proof in this file carries the rival reading as its control, so an assertion that stopped
// discriminating fails here.

import type { Plugin, UserConfig } from 'vite'
import { describe, expect, it } from 'vitest'
import { createNamedEntry, readPlugins, selectByName } from './setup.js'

describe('root test setup', () => {
	it('builds a distinct entry on every call, so a caller compares entries by reference', () => {
		const entry = createNamedEntry('setup-alpha')
		const twin = createNamedEntry('setup-alpha')
		expect(entry.name).toBe('setup-alpha')
		expect(twin.name).toBe('setup-alpha')
		expect(entry).not.toBe(twin)
		expect(entry).toStrictEqual(twin)

		// Control: the memoizing builder this one departs from, which answers one entry per name.
		// Its two answers are the same object, so the distinctness this case asserts fails against
		// them while the shape comparison still passes.
		const memoized = new Map<string, Plugin>()
		const firstAnswer = memoized.get('setup-alpha') ?? createNamedEntry('setup-alpha')
		memoized.set('setup-alpha', firstAnswer)
		const secondAnswer = memoized.get('setup-alpha') ?? createNamedEntry('setup-alpha')
		expect(secondAnswer).toBe(firstAnswer)
		expect(() => expect(secondAnswer).not.toBe(firstAnswer)).toThrow(/expected/u)
	})

	it('refuses a configuration carrying no plugins and accepts one carrying an empty list', () => {
		const empty: UserConfig = {}
		const declared: UserConfig = { plugins: [] }
		expect(() => readPlugins(empty)).toThrow('The configuration carries no plugins')
		expect(readPlugins(declared)).toStrictEqual([])
		expect(readPlugins({ plugins: [createNamedEntry('setup-alpha')] }).length).toBe(1)

		// Control: the absent-tolerant reading this helper departs from. It answers an empty list
		// where the helper refuses, so the refusal this case asserts fails against it, and the two
		// readings become indistinguishable for a configuration that declares no plugins.
		expect(empty.plugins ?? []).toStrictEqual([])
		expect(() => expect(() => empty.plugins ?? []).toThrow(/carries no plugins/u)).toThrow(
			/expected/u,
		)
	})

	it('retains the last entry per name at the position that name was first inserted', () => {
		const first = createNamedEntry('setup-alpha')
		const middle = createNamedEntry('setup-beta')
		const last = createNamedEntry('setup-alpha')
		const entries: readonly Plugin[] = [first, middle, last]
		const selected = selectByName(entries)
		expect(selected.length).toBe(2)
		expect(selected[0]).toBe(last)
		expect(selected[1]).toBe(middle)

		// Control: the selection that retains the same entry per name at the last insertion's
		// position rather than the first. It answers the same members in the other order, so the
		// position readings this case asserts fail against it while its length reading passes.
		const trailing = entries.filter(
			(entry, index) =>
				entries.findLastIndex((candidate) => candidate.name === entry.name) === index,
		)
		expect(trailing.length).toBe(2)
		expect(() => expect(trailing[0]).toBe(last)).toThrow(/expected/u)
		expect(() => expect(trailing[1]).toBe(middle)).toThrow(/expected/u)
	})
})
