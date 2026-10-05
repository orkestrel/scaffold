import { conformance } from '../../../vite.config.js'

const project = conformance()
export default {
	...project,
	test: { ...project.test, name: 'tokens-t2-writer', include: ['tmp/units/tokens-t2/maps.test.ts'] },
}
