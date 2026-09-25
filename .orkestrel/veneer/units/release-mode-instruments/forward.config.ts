import { defineConfig } from 'vitest/config'

// Orchestrator probe: one project factory that forwards the invocation mode, one that drops it.
export default defineConfig({
	test: {
		projects: [
			(invocation: { readonly mode: string }) => ({ mode: invocation.mode, test: { name: 'forward', include: ['tmp/probe/mode.test.ts'] } }),
			() => ({ test: { name: 'drop', include: ['tmp/probe/mode.test.ts'] } }),
		],
	},
})
