// J-ORACLE-RECORD mutation plant, round 2. Its home is tmp/j-oracle/ beside its runner,
// tmp/j-oracle/mutations.py, which copies it into tmp/probe/ for each row, because the probe project
// collects only that directory, and removes the copy after the row. The runner sets ORACLE_MUTATION
// to one row id of MUTATIONS and runs the copy. The row plants its mutation in the in-memory compile
// of Veneer's source through a Vite transform on one exact source span, so no source file is
// written. The case records the row's plugin under the unmutated and the mutated compile, compares
// each against Bootstrap's saved fixture through collectEngineDepartures, and asserts that the
// mutated recording adds no departure on the row's named difference. A planted defect the
// comparison sees therefore fails that assertion; a transform that finds no span, a compile that
// fails, and a recording that throws fail before it.
import type { Plugin } from 'vite'
import type { EngineDeparture, EngineFacet } from '../../tests/setupServer.js'
import { describe, expect, it } from 'vitest'
import {
	PLUGIN_SCENARIOS,
	collectEngineDepartures,
	compileVeneerRuntime,
	filterAddedDepartures,
	readPluginFixture,
	recordPluginOracle,
} from '../../tests/setupServer.js'

interface Mutation {
	readonly id: string
	readonly plugin: string
	readonly file: string
	readonly find: string
	readonly replace: string
	readonly facet: EngineFacet
	readonly name: string | undefined
	readonly subjects: readonly string[]
}

const MUTATIONS: readonly Mutation[] = [
	{
		id: 'collapse.expanded',
		plugin: 'collapse',
		file: 'src/browser/Collapse.ts',
		find: "trigger.setAttribute('aria-expanded', String(expanded)),",
		replace: "trigger.setAttribute('aria-expanded', String(!expanded)),",
		facet: 'attribute',
		name: 'aria-expanded',
		subjects: ['trigger', 'link', 'button-one', 'button-two', 'wide-trigger'],
	},
	{
		id: 'alert.connected',
		plugin: 'alert',
		file: 'src/browser/Alert.ts',
		find: 'if (!this.#apply(() => host.remove()) || host.isConnected) return false',
		replace: 'if (!this.#apply(() => undefined) || !host.isConnected) return false',
		facet: 'element',
		name: undefined,
		subjects: ['fading', 'plain', 'named'],
	},
	{
		id: 'tab.selected',
		plugin: 'tab',
		file: 'src/browser/Tab.ts',
		find: "control.setAttribute('aria-selected', String(selected)),",
		replace: "control.setAttribute('aria-selected', 'true'),",
		facet: 'attribute',
		name: 'aria-selected',
		subjects: ['home-tab', 'profile-tab', 'contact-tab'],
	},
	{
		id: 'scrollspy.active',
		plugin: 'scrollspy',
		file: 'src/browser/ScrollSpy.ts',
		find: 'element.classList.toggle(token, active)',
		replace: 'if (active) element.classList.toggle(token, active)',
		facet: 'class',
		name: 'active',
		subjects: ['first-link', 'second-link', 'third-link'],
	},
	{
		id: 'dropdown.expanded',
		plugin: 'dropdown',
		file: 'src/browser/Dropdown.ts',
		find: "() => host.setAttribute('aria-expanded', 'false')",
		replace: "() => host.setAttribute('aria-expanded', 'true')",
		facet: 'attribute',
		name: 'aria-expanded',
		subjects: ['toggle'],
	},
	{
		id: 'carousel.current',
		plugin: 'carousel',
		file: 'src/browser/Carousel.ts',
		find: [
			"\t\t\t\t\t\t() => indicator.removeAttribute('aria-current'),",
			'\t\t\t\t\t\tpair,',
			'\t\t\t\t\t\t[[outgoing, active]],',
			'\t\t\t\t\t\t[',
			'\t\t\t\t\t\t\t[incoming, active],',
			'\t\t\t\t\t\t\t[indicator, active],',
			'\t\t\t\t\t\t],',
			'\t\t\t\t\t\t[[indicator, null]],',
		].join('\n'),
		replace: [
			'\t\t\t\t\t\t() => undefined,',
			'\t\t\t\t\t\tpair,',
			'\t\t\t\t\t\t[[outgoing, active]],',
			'\t\t\t\t\t\t[',
			'\t\t\t\t\t\t\t[incoming, active],',
			'\t\t\t\t\t\t\t[indicator, active],',
			'\t\t\t\t\t\t],',
			'\t\t\t\t\t\t[[indicator, marked]],',
		].join('\n'),
		facet: 'attribute',
		name: 'aria-current',
		subjects: ['indicator-0', 'indicator-1', 'indicator-2'],
	},
	{
		id: 'modal.hidden',
		plugin: 'modal',
		file: 'src/browser/Modal.ts',
		find: "this.#apply(change, expected, () => host.removeAttribute('aria-hidden'))",
		replace: 'this.#apply(change, expected, () => undefined)',
		facet: 'attribute',
		name: 'aria-hidden',
		subjects: ['modal', 'static'],
	},
	{
		id: 'offcanvas.modal',
		plugin: 'offcanvas',
		file: 'src/browser/Offcanvas.ts',
		find: "this.#apply(change, expected, () => host.setAttribute('aria-modal', 'true'))",
		replace: 'this.#apply(change, expected, () => undefined)',
		facet: 'attribute',
		name: 'aria-modal',
		subjects: ['offcanvas', 'scrolling'],
	},
	{
		id: 'toast.showing',
		plugin: 'toast',
		file: 'src/browser/Toast.ts',
		find: 'this.#apply(change, [shown], [transition], () => host.classList.remove(transition))',
		replace: 'this.#apply(change, [shown, transition], [], () => undefined)',
		facet: 'class',
		name: 'showing',
		subjects: ['toast', 'still'],
	},
	{
		id: 'tooltip.described',
		plugin: 'tooltip',
		file: 'src/browser/Tooltip.ts',
		find: 'if (present) ids.push(id)',
		replace: 'if (present) ids.push(`${id}-elsewhere`)',
		facet: 'attribute',
		name: 'aria-describedby',
		subjects: ['hover-trigger', 'focus-trigger'],
	},
	{
		id: 'popover.auto',
		plugin: 'popover',
		file: 'src/browser/constants.ts',
		find: "auto: 'bs-popover-auto',",
		replace: "auto: 'bs-popover-start',",
		facet: 'class',
		name: 'bs-popover-auto',
		subjects: ['+.popover[0]', '+.popover[1]'],
	},
	{
		id: 'tooltip.text',
		plugin: 'tooltip',
		file: 'src/browser/helpers.ts',
		find: 'else slot.textContent = content',
		replace: 'else slot.textContent = `${content} (planted)`',
		facet: 'text',
		name: undefined,
		subjects: ['+.tooltip-inner[0]'],
	},
	{
		id: 'dropdown.parent',
		plugin: 'dropdown',
		file: 'src/browser/Dropdown.ts',
		find: 'this.#apply(change, true, () => menu.classList.add(shown))',
		replace:
			'this.#apply(change, true, () => { menu.ownerDocument.body.append(menu); menu.classList.add(shown) })',
		facet: 'parent',
		name: undefined,
		subjects: ['menu'],
	},
	{
		id: 'scrollspy.destination',
		plugin: 'scrollspy',
		file: 'src/browser/ScrollSpy.ts',
		find: 'const top = section.getBoundingClientRect().top',
		replace: 'const top = section.getBoundingClientRect().top + section.offsetHeight',
		facet: 'scroll',
		name: 'top',
		subjects: ['spy'],
	},
	{
		id: 'control.suite',
		plugin: 'collapse',
		file: 'src/browser/Collapse.ts',
		find: "trigger.setAttribute('aria-expanded', String(expanded)),",
		replace: "trigger.setAttribute('aria-expanded', String(!expanded)),",
		facet: 'attribute',
		name: 'aria-expanded',
		subjects: ['trigger', 'link', 'button-one', 'button-two', 'wide-trigger'],
	},
	{
		id: 'control.equivalent',
		plugin: 'collapse',
		file: 'src/browser/Collapse.ts',
		find: "trigger.setAttribute('aria-expanded', String(expanded)),",
		replace: "trigger.setAttribute('aria-expanded', `${expanded}`),",
		facet: 'attribute',
		name: 'aria-expanded',
		subjects: ['trigger', 'link', 'button-one', 'button-two', 'wide-trigger'],
	},
	{
		id: 'control.boom',
		plugin: 'collapse',
		file: 'src/browser/Collapse.ts',
		find: "trigger.setAttribute('aria-expanded', String(expanded)),",
		replace: "(() => { throw new Error('boom') })(),",
		facet: 'attribute',
		name: 'aria-expanded',
		subjects: ['trigger'],
	},
	{
		id: 'control.unbound',
		plugin: 'collapse',
		file: 'src/browser/Collapse.ts',
		find: "trigger.setAttribute('aria-expanded', String(unbound)),",
		replace: "trigger.setAttribute('aria-expanded', 'true'),",
		facet: 'attribute',
		name: 'aria-expanded',
		subjects: ['trigger'],
	},
]

describe('oracle mutation', () => {
	it('adds no departure on the named difference under the planted mutation', async () => {
		const mutation = MUTATIONS.find((row) => row.id === process.env.ORACLE_MUTATION)
		if (mutation === undefined) throw new Error(`Unknown mutation ${String(process.env.ORACLE_MUTATION)}`)
		const scenario = PLUGIN_SCENARIOS.find((candidate) => candidate.plugin === mutation.plugin)
		if (scenario === undefined) throw new Error(`No scenario for ${mutation.plugin}`)
		let planted = 0
		const plant: Plugin = {
			name: 'oracle-mutation',
			enforce: 'pre',
			transform(code, id) {
				if (!id.replaceAll('\\', '/').endsWith(mutation.file)) return null
				const count = code.split(mutation.find).length - 1
				if (count !== 1) throw new Error(`Mutation ${mutation.id} finds its span ${count} times in ${mutation.file}`)
				planted += 1
				return code.replace(mutation.find, () => mutation.replace)
			},
		}
		const fixture = readPluginFixture(mutation.plugin)
		const baseline = collectEngineDepartures(fixture, await recordPluginOracle(scenario, await compileVeneerRuntime()))
		const mutated = await compileVeneerRuntime([plant])
		if (planted !== 1) throw new Error(`Mutation ${mutation.id} planted ${planted} times`)
		const departures = collectEngineDepartures(fixture, await recordPluginOracle(scenario, mutated))
		const named: readonly EngineDeparture[] = filterAddedDepartures(departures, baseline).filter(
			(departure) =>
				departure.facet === mutation.facet &&
				departure.name === mutation.name &&
				mutation.subjects.includes(departure.subject),
		)
		expect(named).toStrictEqual([])
	}, 300_000)
})
