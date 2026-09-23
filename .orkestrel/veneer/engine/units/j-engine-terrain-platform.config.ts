// Orchestrator instrument: runs `tmp/probe/**/*.test.ts` in the Veneer workspace's real browser
// project, by composing the workspace's own `srcBrowser` factory and replacing its include and
// setup files. Lives in the scratchpad, never in the repository. It imports nothing that resolves
// from the workspace's `node_modules` except through the workspace's own configuration module.
import { srcBrowser } from 'C:/Users/mikes/WebstormProjects/veneer/vite.config.ts'

const base = srcBrowser()
const test = base.test ?? {}
export default {
	...base,
	test: {
		...test,
		name: { label: 'probe:browser', color: 'black' },
		include: ['tmp/probe/**/*.test.ts'],
		exclude: [],
		setupFiles: [],
		testTimeout: 60_000,
	},
}
