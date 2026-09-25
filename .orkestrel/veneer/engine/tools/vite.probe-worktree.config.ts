// Orchestrator instrument (successor of vite.probe-browser.config.ts, which composes the main checkout's
// configuration): runs `tmp/probe/**/*.test.ts` in the probe worktree's real browser project, by
// composing that worktree's own `srcBrowser` factory and replacing its include and setup files, so a
// landing that moves the main checkout never moves the sources a probe run imports. Lives in the
// scratchpad, never in the repository.
import { srcBrowser } from 'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/vite.config.ts'

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
