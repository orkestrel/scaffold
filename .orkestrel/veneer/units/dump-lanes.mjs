// Dump every result row of a Workflow journal to a retained lane file, named by the agent's role
// (read from the `agent-<id>.meta.json` beside the journal) so no rename by content is needed.
//
// Usage: node .orkestrel/veneer/units/dump-lanes.mjs <runId> <prefix> [journalPath]
//   → .orkestrel/veneer/units/lane-<prefix>-<agentType>.md, one per result row
//     (a second agent of the same type gets `-<agentType>-<agentId>`; a row with no meta file
//     falls back to the agent id).
//
// Without journalPath the script looks for the run under every session folder of this project:
// ~/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/<sessionId>/subagents/workflows/<runId>/journal.jsonl
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'

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
const seen = new Map()
for (const row of lines) {
	if (row.type !== 'result') continue
	const meta = readMeta(dirname(journal), row.agentId)
	const role = meta?.agentType ?? row.agentId
	const count = (seen.get(role) ?? 0) + 1
	seen.set(role, count)
	const name = count === 1 ? `lane-${prefix}-${role}.md` : `lane-${prefix}-${role}-${row.agentId}.md`
	const engine = meta ? `${meta.agentType} on ${meta.model}` : 'role unknown'
	writeFileSync(
		out + name,
		`<!-- workflow ${runId}, agent ${row.agentId}, ${engine}, retained ${stamp} -->\n\n${row.result}\n`,
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

function readMeta(folder, agentId) {
	const path = join(folder, `agent-${agentId}.meta.json`)
	if (!existsSync(path)) return undefined
	const parsed = JSON.parse(readFileSync(path, 'utf8'))
	if (typeof parsed !== 'object' || parsed === null) return undefined
	const agentType = typeof parsed.agentType === 'string' ? parsed.agentType : undefined
	const model = typeof parsed.model === 'string' ? parsed.model : 'unknown'
	return agentType === undefined ? undefined : { agentType, model }
}
