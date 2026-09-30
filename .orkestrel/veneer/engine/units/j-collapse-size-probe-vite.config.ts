// J-COLLAPSE-SIZE-PROBE run config: the J-PLACEMENT-141-PROBE-2 pattern, composing this worktree's
// own `srcBrowser` so the run uses this worktree's Chromium provider and aliases. It collects only
// `tmp/probe/**/*.test.ts` and uses no setup files.
import { srcBrowser } from 'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/vite.config.ts'

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
