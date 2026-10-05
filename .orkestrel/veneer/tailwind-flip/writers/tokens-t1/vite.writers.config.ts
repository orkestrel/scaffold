import { conformance } from '../../../vite.config.js'

const project = conformance()

export default {
	...project,
	test: {
		...project.test,
		name: 'tokens-t1-writers',
		include: ['tmp/units/tokens-t1/write-tokens.test.ts'],
	},
}
