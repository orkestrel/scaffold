// Runs the Orchestrator's LEDGER-RETUNE referral probes against /home/user/veneer-lret at 23b659b, under the
// conformance project's settings, from the scratchpad so no file lands in the unit's tree.
import { conformance } from '/home/user/veneer-lret/vite.config.ts'

const base = conformance()
export default {
	...base,
	root: import.meta.dirname,
	test: {
		...base.test,
		include: ['*.probe.test.ts'],
		setupFiles: ['/home/user/veneer-lret/tests/setup.ts'],
		name: 'lret-referrals',
	},
}
