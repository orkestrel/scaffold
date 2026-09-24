// AP-TYPE default-viewport probe config. Run: npx vitest run --config tmp/units/apt-viewport-probe.config.ts --no-cache (after npm run build:src:styles). Log: tmp/units/apt-viewport-probe.log.txt
import { defineConfig } from 'vitest/config'
import styles from '../../configs/src/vite.styles.config.ts'

export default defineConfig({
	...styles,
	test: { ...styles.test, include: ['tmp/units/apt-viewport-probe.test.ts'] },
})
