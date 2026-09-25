// J-PLACEMENT-141-PROBE-2 run config: the Orchestrator's `vite.probe-worktree.config.ts` with one
// change. That file composes `srcBrowser` from the `probe` worktree, so its aliases resolve `@src` into
// that worktree's sources (Veneer `21c821a`) and the dependency boundary refuses the run from this
// worktree. This copy composes this worktree's own `srcBrowser`, so `@src` resolves to Veneer `d33b27c`.
import { srcBrowser } from 'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b/vite.config.ts'

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
