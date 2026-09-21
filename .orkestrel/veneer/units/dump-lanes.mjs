// Dump every result row of a Workflow journal to a file named by the agent id, so the lane
// reports of an audit round can be retained and then renamed by content.
//
// Usage: node .orkestrel/veneer/units/dump-lanes.mjs <runId> <prefix> [journalPath]
//   → .orkestrel/veneer/units/<prefix>-<agentId>.md, one per result row.
//
// Without journalPath the script looks for the run under every session folder of this project:
// ~/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/<sessionId>/subagents/workflows/<runId>/journal.jsonl
// Rename the dumped files by content afterwards: the verifier's report carries the header
// `Step | Command | Exit`, the reviewer's opens with `Lane held`, and the checker's is the rest.
// Never key on the word `Referrals`: the reviewer and the checker both use it.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const [runId, prefix, journalArgument] = process.argv.slice(2)
if (!runId || !prefix) {
	console.error('usage: node dump-lanes.mjs <runId> <prefix> [journalPath]')
	process.exit(2)
}
const project = join(homedir(), '.claude', 'projects', 'C--Users-mikes-WebstormProjects-scaffold')
const journal = journalArgument ?? findJournal(project, runId)
if (journal === undefined || !existsSync(journal)) {
	console.error(`no journal for ${runId} under ${project}`)
	process.exit(3)
}
const out = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/'
const stamp = new Date().toISOString().slice(0, 10)
const lines = readFileSync(journal, 'utf8')
	.split('\n')
	.filter((line) => line.length > 0)
	.map((line) => JSON.parse(line))
for (const row of lines) {
	if (row.type !== 'result') continue
	const name = `${prefix}-${row.agentId}.md`
	writeFileSync(
		out + name,
		`<!-- workflow ${runId}, agent ${row.agentId}, label unknown, retained ${stamp} -->\n\n${row.result}\n`,
	)
	console.log(`${name} ${row.result.length} :: ${row.result.slice(0, 120).replace(/\n/gu, ' / ')}`)
}
console.log('journal:', journal)
console.log('types seen:', [...new Set(lines.map((row) => row.type))].join(', '))

function findJournal(root, id) {
	if (!existsSync(root)) return undefined
	for (const session of readdirSync(root)) {
		const candidate = join(root, session, 'subagents', 'workflows', id, 'journal.jsonl')
		if (existsSync(candidate)) return candidate
	}
	return undefined
}
