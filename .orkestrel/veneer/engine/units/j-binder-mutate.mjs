// Applies one source mutation at a time in the veneer-binder worktree, runs the named proof file,
// records the failing case titles, and restores the source byte for byte before the next mutation.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const root = 'C:/Users/mikes/WebstormProjects/veneer-binder'
const mutations = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const results = []
for (const mutation of mutations) {
	const path = `${root}/${mutation.file}`
	const original = readFileSync(path, 'utf8')
	if (!original.includes(mutation.find)) {
		results.push({ name: mutation.name, error: 'pattern not found' })
		continue
	}
	writeFileSync(path, original.replace(mutation.find, mutation.replace))
	let output = ''
	try {
		output = execSync(`npm run test:src:browser -- ${mutation.proof} --testTimeout=3000`, {
			cwd: root,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe'],
		})
	} catch (error) {
		output = `${error.stdout ?? ''}${error.stderr ?? ''}`
	} finally {
		writeFileSync(path, original)
	}
	const failed = [...output.matchAll(/FAIL .*?> (.*)$/gm)].map((match) => match[1].trim())
	const tally = output.match(/Tests\s+(.*)$/m)?.[1]?.trim()
	results.push({ name: mutation.name, tally, failed })
}
console.log(JSON.stringify(results, null, 1))
