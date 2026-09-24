// Retains a codex exec lane's last message with a header naming its thread id, journal, and
// timing. Arguments: unit, output, title.
const fs = require('node:fs')
const [unit, output, title] = process.argv.slice(2)
const dir = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/codex'
const journal = `${dir}/${unit}.jsonl`
const last = fs.readFileSync(`${dir}/${unit}-last.md`, 'utf8')
const lines = fs.readFileSync(journal, 'utf8').split(/\r\n|\n/).filter((line) => line.length > 0)
let thread = 'unknown'
let commands = 0
let usage = ''
for (const line of lines) {
	let event
	try {
		event = JSON.parse(line)
	} catch {
		continue
	}
	if (event.type === 'thread.started' && typeof event.thread_id === 'string') thread = event.thread_id
	if (event.type === 'item.completed' && event.item && event.item.type === 'command_execution') commands++
	if (event.type === 'turn.completed' && event.usage) usage = JSON.stringify(event.usage)
}
const started = fs.statSync(`${dir}/${unit}.pid`).mtimeMs
const finished = fs.statSync(`${dir}/${unit}-last.md`).mtimeMs
const header = `# ${title}\n\nThread \`${thread}\`; journal \`${journal}\` (launch copy under \`tmp/codex/\`); ${commands} commands; ${Math.round((finished - started) / 1000)} s; usage ${usage || 'unrecorded'}. Retained verbatim from the exec's last message.\n\n---\n\n`
fs.writeFileSync(output, header + last + (last.endsWith('\n') ? '' : '\n'))
console.log(`thread=${thread} commands=${commands} seconds=${Math.round((finished - started) / 1000)} bytes=${last.length}`)
