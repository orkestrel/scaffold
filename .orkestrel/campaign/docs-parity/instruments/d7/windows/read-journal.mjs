import { readFileSync } from 'node:fs'

const [path, mode] = process.argv.slice(2)
for (const line of readFileSync(path, 'utf8').split(/\r\n|\n/)) {
	if (!line.trim()) continue
	const event = JSON.parse(line)
	if (mode === 'result' && event.type === 'result') {
		console.log(JSON.stringify({ session: event.session_id, error: event.is_error, result: event.result, denials: event.permission_denials }))
	}
	if (mode === 'skill' && event.type === 'user') {
		console.log(JSON.stringify(event.message?.content))
	}
}
