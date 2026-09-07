// P10b — line-anchored: a doc block is one that opens at a line start and is followed on the next line by an export declaration; a `/**` inside a string glob never matches. The first-sentence voice reading no-imperative-summary would take, over every doc block that
// precedes an export declaration: the first word must be a third-person -s verb (proxy: /^[A-Z][a-z]*s$/),
// and the first sentence must not repeat the declared name. Usage: node p10-voice.mjs <root> <dir> [<dir> ...]
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
const root = process.argv[2]
const dirs = process.argv.slice(3)
function walk(dir, out) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) { if (['node_modules', '.git', 'dist', 'tmp'].includes(e.name)) continue; walk(p, out) }
    else if (/\.(ts|mts|cts|tsx|vue)$/u.test(e.name) && !e.name.endsWith('.d.ts')) out.push(p)
  }
}
const files = []
for (const d of dirs) { try { readdirSync(join(root, d)) } catch { continue } walk(join(root, d), files) }
let blocks = 0, bad = 0, missing = 0
const words = new Map()
for (const f of files.sort()) {
  const text = readFileSync(f, 'utf8')
  const rel = f.slice(root.length + 1)
  // every /** ... */ followed by whitespace then an export (or a declaration keyword)
  const re = /^[ \t]*\/\*\*((?:[^*]|\*(?!\/))*?)\*\/[ \t]*\n[ \t]*(export\s+[^\n]*)/gmu
  for (const m of text.matchAll(re)) {
    blocks += 1
    const body = m[1].split('\n').map((l) => l.replace(/^\s*\*\s?/u, '')).join('\n').trim()
    const paragraph = body.split(/\n\s*@/u)[0].replace(/\s+/gu, ' ').trim()
    const first = paragraph.match(/^\S+/u)?.[0] ?? ''
    const bare = first.replace(/[^A-Za-z]/gu, '')
    const line = text.slice(0, m.index).split('\n').length
    const decl = m[2].match(/export\s+(?:default\s+)?(?:abstract\s+)?(?:async\s+)?(?:const|let|var|function\*?|class|interface|type|enum|namespace)\s+([A-Za-z_$][\w$]*)/u)?.[1]
    const ok = /^[A-Z][a-z]*s$/u.test(bare)
    const repeats = decl !== undefined && new RegExp(`\\b${decl}\\b`, 'u').test(paragraph.split(/\.\s|\.$/u)[0] ?? '')
    if (!ok || repeats) { bad += 1; words.set(bare, (words.get(bare) ?? 0) + 1); console.log(`${rel}:${line}: ${ok ? '' : 'VOICE '}${repeats ? 'REPEATS(' + decl + ') ' : ''}${paragraph.slice(0, 110)}`) }
  }
  // exports with no doc block directly above
  for (const m of text.matchAll(/^export\s+(?:const|function\*?|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/gmu)) {
    const before = text.slice(0, m.index)
    if (!/\*\/\s*$/u.test(before)) { missing += 1; console.log(`${rel}:${before.split('\n').length}: NODOC ${m[1]}`) }
  }
}
console.log(`FILES ${files.length} BLOCKS ${blocks} FLAGGED ${bad} NODOC ${missing}`)
console.log('first words: ' + [...words.entries()].sort((a, b) => b[1] - a[1]).map(([w, n]) => `${w}=${n}`).join(' '))
