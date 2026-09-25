// Writes a Cursor Grok lane's final answer (its `result` event) to <lane>-last.md beside its journal, with the session id
// from the journal's init event. Usage: node last.cjs <lane>
const fs = require('node:fs')
const lane = process.argv[2]
const dir = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor'
let session
let result
for (const line of fs.readFileSync(`${dir}/${lane}.jsonl`, 'utf8').split('\n')) {
	let event
	try {
		event = JSON.parse(line)
	} catch {
		continue
	}
	if (session === undefined && typeof event.session_id === 'string') session = event.session_id
	if (event.type === 'result' && typeof event.result === 'string') result = event.result
}
if (result === undefined) {
	console.error(`${lane}: no result event`)
	process.exit(2)
}
fs.writeFileSync(`${dir}/${lane}-last.md`, `<!-- Grok lane ${lane}, session ${session} -->\n\n${result}\n`)
console.log(`${lane}: session ${session}, ${result.length} chars`)
