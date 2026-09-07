// P9c — the banned-term sweep D3 will vendor: every Markdown file in the workspace outside node_modules, dist, tmp, .orkestrel, and .git, with the top-level guide mirrors (guides/<other>.md) excluded, fence bodies and inline code spans excluded.
// Usage: node p9-terms.mjs <root> [control-file]
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
const root = process.argv[2]
const terms = [
  ['should', /\bshould\b/giu],
  ['simply', /\bsimply\b/giu],
  ['easy', /\beas(?:y|ier|iest|ily)\b/giu],
  ['just', /\bjust\b/giu],
  ['currently', /\bcurrently\b/giu],
  ['utilize', /\butiliz(?:e|es|ed|ing|ation)\b/giu],
  ['leverage', /\bleverag(?:e|es|ed|ing)\b/giu],
  ['via', /\bvia\b/giu],
  ['in order to', /\bin order to\b/giu],
  ['e.g.', /\be\.g\./giu],
  ['i.e.', /\bi\.e\./giu],
  ['etc.', /\betc\./giu],
  ['performant', /\bperformant\b/giu],
  ['robust', /\brobust(?:ly|ness)?\b/giu],
  ['allows you to', /\ballows you to\b/giu],
  ['and/or', /\band\/or\b/giu],
  ['please', /\bplease\b/giu],
  ['sanity check', /\bsanity[ -]check/giu],
  ['dummy', /\bdumm(?:y|ies)\b/giu],
  ['blacklist', /\bblacklist(?:s|ed|ing)?\b/giu],
  ['whitelist', /\bwhitelist(?:s|ed|ing)?\b/giu],
  ['master', /\bmaster\b/giu],
  ['slave', /\bslave\b/giu],
]
function walk(dir, out) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) { if (['node_modules', '.git', 'dist', 'tmp', '.orkestrel'].includes(e.name)) continue; walk(p, out) }
    else if (e.name.endsWith('.md')) out.push(p)
  }
}
const own = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).name.replace(/^@orkestrel\//u, '')
const all = []
walk(root, all)
const files = all.filter((f) => { const rel = f.slice(root.length + 1); const m = rel.match(/^guides\/([^/]+)\.md$/u); return m === null || m[1] === own || m[1] === 'README' })
if (process.argv[3]) files.push(process.argv[3])
let total = 0
const perFile = new Map()
for (const f of files.sort()) {
  const lines = readFileSync(f, 'utf8').split(/\r?\n/u)
  let fence
  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i]
    const stripped = raw.replace(/^ {0,3}/u, '')
    if (fence !== undefined) { if (stripped.startsWith(fence)) fence = undefined; continue }
    const opening = stripped.match(/^(`{3,}|~{3,})/u)?.[1]
    if (opening !== undefined) { fence = opening; continue }
    const prose = raw.replace(/`[^`]*`/gu, ' ')
    for (const [name, re] of terms) {
      for (const m of prose.matchAll(re)) {
        total += 1
        const rel = f.slice(root.length + 1)
        perFile.set(rel, (perFile.get(rel) ?? 0) + 1)
        console.log(`${rel}:${i + 1}: ${name}: ${raw.trim().slice(0, 140)}`)
      }
    }
  }
}
console.log(`FILES ${files.length} HITS ${total}`)
for (const [f, n] of perFile) console.log(`  ${n}\t${f}`)
