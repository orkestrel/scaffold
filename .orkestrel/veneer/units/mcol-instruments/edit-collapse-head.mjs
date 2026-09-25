import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/src/styles/components/collapse.test.ts'
let text = readFileSync(path, 'utf8')
const swaps = [
	[
		"import { requireValue } from '@orkestrel/test'\nimport { readHit, readPixels, readStyle, releaseMedia, stageMedia } from '@orkestrel/test/browser'\nimport { afterEach, describe, expect, it } from 'vitest'\nimport { collectLayer, collectMediaConditions, scene } from '../../../setupBrowser.js'\n",
		"import { TOKEN_NAMES } from '@src/core'\nimport { requireValue } from '@orkestrel/test'\nimport { readHit, readPixels, readStyle, releaseMedia, stageMedia } from '@orkestrel/test/browser'\nimport { afterEach, describe, expect, it } from 'vitest'\nimport {\n\tcollectLayer,\n\tcollectMediaConditions,\n\treadDuration,\n\tsampleTransition,\n\tscene,\n\tsweepMotionFactor,\n} from '../../../setupBrowser.js'\n",
	],
	[
		"\t\t\t\t[undefined, '0px', '', 'hidden', 'height 0.35s'],",
		"\t\t\t\t[\n\t\t\t\t\tundefined,\n\t\t\t\t\t'0px',\n\t\t\t\t\t'',\n\t\t\t\t\t'hidden',\n\t\t\t\t\t`height var(${TOKEN_NAMES.motion.panel}) var(${TOKEN_NAMES.ease.panel})`,\n\t\t\t\t],",
	],
	[
		"\t\t\t\t[undefined, 'auto', '0px', '', 'width 0.35s'],",
		"\t\t\t\t[\n\t\t\t\t\tundefined,\n\t\t\t\t\t'auto',\n\t\t\t\t\t'0px',\n\t\t\t\t\t'',\n\t\t\t\t\t`width var(${TOKEN_NAMES.motion.panel}) var(${TOKEN_NAMES.ease.panel})`,\n\t\t\t\t],",
	],
]
for (const [from, to] of swaps) {
	if (!text.includes(from)) throw new Error(`missing: ${from.slice(0, 60)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
