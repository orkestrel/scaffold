import type { JourneyVariant } from '@orkestrel/test'
import { defineConfig } from 'vitest/config'
import { appJourney } from '../../vite.config.ts'

// Each variant pairs a color mode with the viewport it renders at; the theme is applied through
// the masthead control inside the journey, from the variant's name.
const VARIANTS: readonly JourneyVariant[] = Object.freeze([
	{ name: 'light-1280', width: 1280, height: 800 },
	{ name: 'dark-1280', width: 1280, height: 800 },
	{ name: 'light-390', width: 390, height: 844 },
	{ name: 'dark-390', width: 390, height: 844 },
])

export default defineConfig({
	test: {
		projects: VARIANTS.map((variant) => () => appJourney(variant, VARIANTS)),
	},
})
