import { loadConfigFromFile } from 'vite'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const loaded = await loadConfigFromFile({ command: 'serve', mode: 'test' }, 'configs/src/vite.styles.config.ts')
const test = loaded?.config.test
console.log(JSON.stringify({
	name: test?.name,
	browser: { enabled: test?.browser?.enabled, provider: test?.browser?.provider?.name, instances: test?.browser?.instances },
	fileParallelism: test?.fileParallelism,
	setupFiles: test?.setupFiles,
}, null, 2))
const original = execFileSync('git', ['show', 'HEAD:configs/src/vite.styles.config.ts'])
const edited = readFileSync('configs/src/vite.styles.config.ts')
const start = Buffer.from("\t\t{\n\t\t\tname: 'veneer-logical-rtl'")
const end = Buffer.from('\n\t\t},\n\t],')
const before = original.subarray(original.indexOf(start), original.indexOf(end) + 6)
const after = edited.subarray(edited.indexOf(start), edited.indexOf(end) + 6)
if (original.indexOf(start) < 0 || edited.indexOf(start) < 0 || !before.equals(after)) throw new Error('RTL plugin bytes differ')
console.log('RTL plugin object: byte-identical to HEAD')
