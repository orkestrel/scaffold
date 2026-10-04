import { sheetProject } from '../../../vite.config.js'

export default sheetProject('flip-integration-writers', {
	test: { include: ['tmp/units/flip-integration/preflight-record.test.ts', 'tmp/units/flip-integration/incompatible-record.test.ts'] },
})
