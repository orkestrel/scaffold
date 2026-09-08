export const PATHS = Object.freeze(['tests/setupPolicy.ts', 'tests/config.test.ts'])

export const SENTINELS = Object.freeze([
	Object.freeze({ path: 'package.json', value: '{"sentinel":"package"}\n' }),
	Object.freeze({ path: 'package-lock.json', value: '{"sentinel":"lock"}\n' }),
	Object.freeze({ path: 'tests/policy.test.ts', value: 'export const sentinel = "policy"\n' }),
	Object.freeze({ path: 'outside.txt', value: 'sentinel outside selected paths\n' }),
])

export const STALE = Object.freeze([
	Object.freeze({ path: 'tests/setupPolicy.ts', value: 'export const stale = "setup"\n' }),
	Object.freeze({ path: 'tests/config.test.ts', value: 'export const stale = "config"\n' }),
])
