// Removes the `@example` blocks (the tag line through the closing fence) inside CollapseInterface's
// method doc blocks in the J-TYPES worktree's types.ts.
const fs = require('node:fs')
const path = 'C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts'
const text = fs.readFileSync(path, 'utf8')
const start = text.indexOf('export interface CollapseInterface {')
const end = text.indexOf('\n}\n', start) + 3
const body = text.slice(start, end)
const stripped = body.replace(/\t \* @example\n\t \* ```ts\n(?:\t \* .*\n)*?\t \* ```\n/g, '')
const removed = (body.match(/@example/g) || []).length - (stripped.match(/@example/g) || []).length
fs.writeFileSync(path, text.slice(0, start) + stripped + text.slice(end))
console.log(`removed ${removed} example blocks from CollapseInterface`)
