// FOCUS-FRAME probe: the journey project at one variant, aimed at the pointer probe copy.
import { defineConfig } from 'vitest/config'
import { appJourney } from '../../vite.config.ts'

const VARIANTS = [
	{ name: 'light-1280', width: 1280, height: 800 },
	{ name: 'dark-1280', width: 1280, height: 800 },
	{ name: 'light-390', width: 390, height: 844 },
	{ name: 'dark-390', width: 390, height: 844 },
] as const
const project = appJourney(VARIANTS[1], VARIANTS)

export default defineConfig({
	...project,
	test: { ...project.test, include: ['tmp/probe/ff-pointer.test.ts'], testTimeout: 120_000 },
})
