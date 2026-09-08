import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const [root] = process.argv.slice(2)
if (root === undefined) throw new Error('ollama checkout path is required')
const guide = readFileSync(join(root, 'guides/ollama.md'), 'utf8')
const provider = readFileSync(join(root, 'src/server/OllamaProvider.ts'), 'utf8')
const budget = readFileSync(join(root, 'tests/service/budget.test.ts'), 'utf8')
const pointers = [
  readFileSync(join(root, 'tests/setup.test.ts'), 'utf8'),
  readFileSync(join(root, 'tests/service/tools.test.ts'), 'utf8'),
  readFileSync(join(root, 'tests/service/lifecycle.test.ts'), 'utf8'),
  readFileSync(join(root, 'tests/service/compaction.test.ts'), 'utf8'),
  readFileSync(join(root, 'tests/service/OllamaProvider.test.ts'), 'utf8'),
]
const checks = []

function add(name, passed) {
  console.log(`${name}: ${passed ? 'PASS' : 'FAIL'}`)
  checks.push(passed)
}

function surface(text) {
  const start = text.indexOf('## Surface')
  const end = text.indexOf('\n## ', start + '## Surface'.length)
  if (start === -1 || end === -1) return undefined
  return text.slice(start, end)
}

const section = surface(guide)
add(
  'surface',
  section !== undefined &&
    /\|[ \t]*API[ \t]*\|[ \t]*Kind[ \t]*\|[ \t]*Shape[ \t]*\|[ \t]*Summary[ \t]*\|/.test(section) &&
    section.includes("A function row's `Shape` cell holds its signature") &&
    section.includes("A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.") &&
    section.includes("A `Shape` cell holds the constant's declared type."),
)
add(
  'shapes',
  section !== undefined &&
    !/^\|[ \t]*`[^`]+`[ \t]*\|[ \t]*(?:function|const|class)[ \t]*\|[ \t]*\|/m.test(section),
)
add('guide-text', !guide.includes('. either way') && !guide.includes('from @orkestrel/agent)'))
add('provider-text', !provider.includes('{@link NDJSONParser}'))
add('budget-text', !budget.includes(', since the source'))
add('pointer-text', pointers.every((text) => !/\babove\b/.test(text)))

if (checks.includes(false)) process.exitCode = 1
