import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { hashFile } from './functions.cjs'

const [output, commit, artifact, contract, guide, test, contractHash, guideHash, testHash] = process.argv.slice(2)

if ([output, commit, artifact, contract, guide, test, contractHash, guideHash, testHash].some((value) => value === undefined)) {
	throw new Error('Expected metadata output and staging inputs.')
}

const value = {
	artifact: { path: resolve(artifact), sha256: hashFile(artifact) },
	commit,
	manifest: { dependency: '@orkestrel/contract', from: '^0.0.16', to: '^0.0.17', version: '0.0.9' },
	pending: 'revised parity revalidation',
	tooling: {
		contract: { path: resolve(contract), sha256: contractHash },
		guide: { path: resolve(guide), sha256: guideHash },
		test: { path: resolve(test), sha256: testHash },
	},
}

await writeFile(output, `${JSON.stringify(value, undefined, '\t')}\n`)
