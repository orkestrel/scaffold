import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const [root] = process.argv.slice(2)
if (root === undefined) throw new Error('agent checkout path is required')
const guide = readFileSync(join(root, 'guides/agent.md'), 'utf8')
const types = readFileSync(join(root, 'src/core/types.ts'), 'utf8')
const checks = []

function add(name, passed) {
  console.log(`${name}: ${passed ? 'PASS' : 'FAIL'}`)
  checks.push(passed)
}

function section(text, start, end) {
  const from = text.indexOf(start)
  const to = text.indexOf(end, from + start.length)
  if (from === -1 || to === -1) return undefined
  return text.slice(from, to)
}

function row(text, name) {
  const key = new RegExp('^\\|[ \\t]*`' + name + '`[ \\t]*\\|')
  return text.split(/\r\n|\n/).find((line) => key.test(line))
}

const constants = section(guide, '### Constants', '### Helpers')
add(
  'constants',
  constants !== undefined &&
    /\|[ \t]*API[ \t]*\|[ \t]*Kind[ \t]*\|[ \t]*Shape[ \t]*\|[ \t]*Summary[ \t]*\|/.test(constants) &&
    constants.includes("A `Shape` cell holds the constant's declared type."),
)

const validators = section(guide, '### Validators', '### Errors')
add(
  'validators',
  validators !== undefined &&
    /\|[ \t]*API[ \t]*\|[ \t]*Kind[ \t]*\|[ \t]*Shape[ \t]*\|[ \t]*Summary[ \t]*\|/.test(validators) &&
    validators.includes('In a guard table a `Shape` cell holds the type the guard narrows to.'),
)

const channel = row(guide, 'ChannelInterface')
const authority = row(guide, 'AuthorityInterface')
add('methods-only', channel !== undefined && channel.includes('{} plus') && authority !== undefined && authority.includes('{} plus'))

const factories = guide.indexOf('### Factories')
add('topic-headings', factories !== -1 && !/^#### /m.test(guide.slice(0, factories)))
add('tallies', !guide.includes('two summarizer calls') && !guide.includes('the two halves'))
add('endings', !/^[ \t]*\*[ \t]*\r?\n[ \t]*\*\/$/m.test(types))

if (checks.includes(false)) process.exitCode = 1
