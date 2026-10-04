import { conformance } from '../../../vite.config.js'

const project = conformance()

export default {
	...project,
	test: {
		...project.test,
		name: 'flip-records-writers',
		include: [
			'tmp/units/flip-records/fixture-recipe.test.ts',
			'tmp/units/flip-records/app-recipe.test.ts',
		],
	},
}
