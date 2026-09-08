import { readFileSync } from 'node:fs'

const [path] = process.argv.slice(2)
if (path === undefined) throw new Error('journal path is required')
const lines = readFileSync(path, 'utf8').split(/\r\n|\n/)
const milestones = []
for (const [index, line] of lines.entries()) {
  if (line.trim() === '') continue
  let event
  try {
    event = JSON.parse(line)
  } catch (error) {
    if (index === lines.length - 1) break
    throw error
  }
  if (event.type === 'assistant') {
    for (const block of event.message?.content ?? []) {
      if (block.type === 'tool_use') {
        const file = block.input?.file_path ?? block.input?.path
        milestones.push({ time: event.timestamp, tool: block.name, file: typeof file === 'string' ? file.replaceAll('\\', '/') : undefined })
      }
    }
  }
  if (event.type === 'result') milestones.push({ result: event.subtype, error: event.is_error, session: event.session_id })
}
for (const milestone of milestones.slice(-8)) console.log(JSON.stringify(milestone))
