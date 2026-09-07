// P9d — code spans stripped across line breaks before the per-line match (a span opened on one line and closed on the next is one span); the banned-term sweep D3 will vendor: every Markdown file in the workspace outside node_modules, dist, tmp, .orkestrel, and .git, with the top-level guide mirrors (guides/<other>.md) excluded, fence bodies and inline code spans excluded.
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
  // strip fenced blocks first, then inline code spans (a backtick run closed by the same run, across lines), keeping line breaks
  const raw = readFileSync(f, 'utf8')
  const fenced = raw.replace(/^( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\2[^\n]*$/gmu, (m) => m.replace(/[^\n]/gu, ' '))
  const spanned = fenced.replace(/(`+)(?!`)[\s\S]*?[^`]\1(?!`)/gu, (m) => m.replace(/[^\n]/gu, ' '))
  const lines = spanned.split(/\r?\n/u)
  const rawLines = raw.split(/\r?\n/u)
  let fence
  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i]
    const prose = raw
    for (const [name, re] of terms) {
      for (const m of prose.matchAll(re)) {
        total += 1
        const rel = f.slice(root.length + 1)
        perFile.set(rel, (perFile.get(rel) ?? 0) + 1)
        console.log(`${rel}:${i + 1}: ${name}: ${(rawLines[i] ?? '').trim().slice(0, 140)}`)
      }
    }
  }
}
console.log(`FILES ${files.length} HITS ${total}`)
for (const [f, n] of perFile) console.log(`  ${n}\t${f}`)
