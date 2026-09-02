import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const dir = process.argv[2]
const out = process.argv[3]
const pkgs = process.argv.slice(4)
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.output') || !f.startsWith('a')) continue
  const lines = readFileSync(join(dir, f), 'utf8').split('\n').filter(Boolean)
  let first
  try { first = JSON.parse(lines[0]) } catch { continue }
  const c = first?.message?.content
  const text = typeof c === 'string' ? c : Array.isArray(c) ? c.map(x => x.text ?? '').join('') : ''
  const m = text.match(/breaking\/([a-z0-9-]+?)-(audit-objective|audit-subjective|audit-checker|verify|fixup|adopt-server)-brief\.md/) ?? text.match(/breaking\/([a-z0-9-]+?)-brief\.md/)
  if (!m) continue
  const pkg = m[1]; const lane = m[2] ?? 'implement'
  if (pkgs.length && !pkgs.includes(pkg)) continue
  let last = ''
  for (const l of lines) {
    let j; try { j = JSON.parse(l) } catch { continue }
    if (j.type !== 'assistant') continue
    const cc = j.message?.content
    if (!Array.isArray(cc)) continue
    const t = cc.filter(x => x.type === 'text').map(x => x.text).join('\n')
    if (t.trim()) last = t
  }
  writeFileSync(join(out, `${pkg}-${lane}.md`), `<!-- task ${f} -->\n${last}\n`)
  console.log(pkg, lane, f, last.length)
}
