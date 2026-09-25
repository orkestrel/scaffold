// Orchestrator instrument (the styles session's copy of the engine session's vite.probe-worktree.config.ts): runs
// `tmp/probe/**/*.test.ts` in the probe worktree's real browser project on the host Chromium 141, composing that
// worktree's own `srcBrowser` factory and replacing its include and setup files. Lives in the scratchpad.
import { srcBrowser } from '/home/user/veneer-probe/vite.config.ts'

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
