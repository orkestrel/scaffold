import { sheetProject } from '../../../vite.config.js'

export default sheetProject('tokens-t2-preflight', {
	test: { include: ['tmp/units/tokens-t2/preflight.test.ts'] },
})
