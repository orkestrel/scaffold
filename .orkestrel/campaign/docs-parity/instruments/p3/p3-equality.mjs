// P3: the first equality run over scaffold's own guide. Guide Surface and Methods Summary cells against the
// doc-block description paragraphs of the exported declarations, under the plan's stated transform.
// Reads the guide as text (tables by line), the source through vite's parseSync comments by range.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
const ROOT = '/home/user/scaffold'
const load = createRequire(`${ROOT}/package.json`)
const { parseSync } = await import(load.resolve('vite'))

function normalizeGuide(cell) {
  return cell.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|[^`\w])_([^_]+)_(?=[^`\w]|$)/g, '$1$2').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\\\|/g, '|').replace(/\s+/g, ' ').trim()
}
function normalizeDoc(paragraph) {
  return paragraph.replace(/\{@link\s+([^}|]+?)(?:\s*\|\s*([^}]+))?\}/g, (m, target, text) => `\`${(text ?? target).trim()}\``).replace(/\s+/g, ' ').trim()
}
function splitRow(line) {
  const cells = []; let cur = ''; let i = 1
  for (; i < line.length; i += 1) { const ch = line[i]; if (ch === '\\' && line[i + 1] === '|') { cur += '\\|'; i += 1; continue } if (ch === '|') { cells.push(cur.trim()); cur = '' } else cur += ch }
  return cells
}
function readGuide(path) {
  const lines = readFileSync(path, 'utf8').split('\n')
  const surface = new Map(); const methods = new Map()
  let section = ''; let owner = ''
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (line.startsWith('## ')) { section = line.slice(3).trim(); owner = ''; continue }
    if (line.startsWith('#### ') || line.startsWith('### ')) { const m = line.match(/`([^`]+)`/); owner = m ? m[1] : line.replace(/^#+\s*/, '').trim(); continue }
    if (!line.startsWith('|')) continue
    if (!(section === 'Surface' || section === 'Methods')) continue
    const header = splitRow(line); if (!lines[i + 1] || !/^\|\s*-/.test(lines[i + 1])) continue
    const summaryIndex = header.findIndex((h) => /^(Summary|Behavior|Role|Description)$/.test(h))
    let j = i + 2
    for (; j < lines.length && lines[j].startsWith('|'); j += 1) {
      const cells = splitRow(lines[j]); const nameMatch = cells[0]?.match(/`([^`]+)`/); if (!nameMatch) continue
      const name = nameMatch[1]; const summary = summaryIndex >= 0 ? normalizeGuide(cells[summaryIndex] ?? '') : undefined
      if (section === 'Surface') surface.set(name, { summary, header: header.join('|'), line: j + 1 })
      else methods.set(`${owner}.${name}`, { summary, header: header.join('|'), line: j + 1 })
    }
    i = j - 1
  }
  return { surface, methods }
}
function* walk(dir) { for (const entry of readdirSync(dir)) { const p = join(dir, entry); if (statSync(p).isDirectory()) yield* walk(p); else if (p.endsWith('.ts')) yield p } }
function paragraphOf(comment) {
  const body = comment.value.replace(/^\*/, '').split(/\r?\n/).map((l) => l.replace(/^\s*\*\s?/, '')).join('\n')
  const description = body.split(/\n\s*@/)[0]
  return normalizeDoc(description)
}
function attach(comments, source, start) {
  let best
  for (const c of comments) { if (c.type !== 'Block' || !c.value.startsWith('*')) continue; if (c.end <= start && source.slice(c.end, start).trim() === '') best = c }
  return best
}
function readSource() {
  const docs = new Map(); const memberDocs = new Map(); let exportsSeen = 0; let regexBlocks = 0
  for (const file of [...walk(`${ROOT}/src/core`), ...walk(`${ROOT}/src/server`)]) {
    const source = readFileSync(file, 'utf8'); const result = parseSync(file, source)
    regexBlocks += (source.match(/\/\*\*[\s\S]*?\*\/\s*\nexport /g) ?? []).length
    for (const statement of result.program.body) {
      if (statement.type !== 'ExportNamedDeclaration' || !statement.declaration) continue
      const declaration = statement.declaration; exportsSeen += 1
      const names = declaration.type === 'VariableDeclaration' ? declaration.declarations.map((d) => d.id.name) : [declaration.id?.name]
      const comment = attach(result.comments, source, statement.start)
      for (const name of names) if (name) docs.set(name, comment ? { paragraph: paragraphOf(comment), file: file.replace(ROOT + '/', ''), line: source.slice(0, comment.start).split('\n').length } : undefined)
      const members = declaration.type === 'TSInterfaceDeclaration' ? declaration.body.body : declaration.type === 'ClassDeclaration' ? declaration.body.body : []
      for (const member of members) {
        const key = member.key?.name; if (!key) continue
        const mc = attach(result.comments, source, member.start)
        memberDocs.set(`${names[0]}.${key}`, mc ? { paragraph: paragraphOf(mc), file: file.replace(ROOT + '/', ''), line: source.slice(0, mc.start).split('\n').length } : undefined)
      }
    }
  }
  return { docs, memberDocs, exportsSeen, regexBlocks }
}
const guide = readGuide(`${ROOT}/guides/scaffold.md`)
const source = readSource()
console.log(`# P3 — ${new Date().toISOString()}; guide Surface rows ${guide.surface.size}, Methods rows ${guide.methods.size}; exported declarations read ${source.exportsSeen}; doc blocks attached to exports ${[...source.docs.values()].filter(Boolean).length}; regex '/** … */ export' blocks ${source.regexBlocks}`)
function compare(rows, docs, label) {
  let equal = 0, differ = 0, noSummary = 0, noDoc = 0, unpaired = 0; const sites = []
  for (const [name, row] of rows) {
    const doc = docs.get(name)
    if (row.summary === undefined) { noSummary += 1; sites.push(`${label} ${name}: guide table has no Summary column (header ${row.header}) at guides/scaffold.md:${row.line}`); continue }
    if (doc === undefined && !docs.has(name)) { unpaired += 1; sites.push(`${label} ${name}: no exported declaration found by name (guides/scaffold.md:${row.line})`); continue }
    if (!doc) { noDoc += 1; sites.push(`${label} ${name}: declaration carries no doc block (guides/scaffold.md:${row.line})`); continue }
    if (doc.paragraph === row.summary) equal += 1
    else { differ += 1; sites.push(`${label} ${name}: guides/scaffold.md:${row.line} vs ${doc.file}:${doc.line}\n    guide:  ${row.summary}\n    source: ${doc.paragraph}`) }
  }
  console.log(`## ${label}: equal ${equal}, differ ${differ}, no Summary column ${noSummary}, no doc block ${noDoc}, unpaired ${unpaired}`)
  for (const s of sites) console.log('- ' + s)
}
compare(guide.surface, source.docs, 'Surface')
compare(guide.methods, source.memberDocs, 'Methods')
