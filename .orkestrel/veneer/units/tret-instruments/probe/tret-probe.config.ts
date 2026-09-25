// Runs the tret rendered-readings probe in the src:styles browser project against the built cascade.
import { defineConfig } from 'vitest/config'
import styles from '../../../configs/src/vite.styles.config.ts'

export default defineConfig({
	...styles,
	test: {
		...styles.test,
		name: { label: 'tret-probe', color: 'black' },
		include: ['tmp/units/probe/**/*.test.ts'],
	},
})
