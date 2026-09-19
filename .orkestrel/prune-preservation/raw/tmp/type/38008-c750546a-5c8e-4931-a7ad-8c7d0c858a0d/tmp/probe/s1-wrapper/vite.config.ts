import type { UserConfig } from 'vite'

export function appJourney(name: string): UserConfig {
	return { test: { name: `journey:${name}`, include: ['proof.test.ts'], provide: { variant: name }, browser: { enabled: false } } }
}
