// Runs the unit's throwaway probes under the conformance project's settings.
import { resolve } from 'node:path'
import { conformance } from '../../vite.config.ts'

const base = conformance()
export default {
	...base,
	root: resolve(import.meta.dirname, '../..'),
	test: { ...base.test, include: ['tmp/units/probe/**/*.probe.test.ts'], name: 'lret-probe' },
}
