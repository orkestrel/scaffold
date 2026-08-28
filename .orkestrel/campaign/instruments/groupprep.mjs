import fs from 'node:fs'
const findings = []
for (const s of ['s12','s13','s14','s15','s16','s17','s18']) {
  const text = fs.readFileSync(`/home/user/scaffold/tmp/units/src-audit-${s}-report.md`,'utf8')
  const body = text.split(/## Findings/)[1] || ''
  const stop = body.search(/\n## (Clean|Deviation|Coverage)/)
  const sect = stop >= 0 ? body.slice(0, stop) : body
  const parts = sect.split(/\n(?=\d+\.\s+package=)/).filter(p => /package=/.test(p))
  for (const p of parts) {
    const num = (p.match(/^(\d+)\./) || [])[1]
    const rawpkg = (p.match(/package=([^\n]*?) file=/) || [])[1] || ''
    const first = (rawpkg.replace(/`/g,'').match(/[a-z]+/) || [''])[0]
    const verdict = (p.match(/verdict=([A-Z-]+)/) || [])[1]
    findings.push({ id: `${s}-${String(num).padStart(2,'0')}`, slice: s, pkg: first, verdict, text: p.trim() })
  }
}
console.log('total:', findings.length)
const groups = {
 g01:['interpret'], g02:['sea'], g03:['terminal'], g04:['server'], g05:['msg','process'], g06:['brief'],
 g07:['form','table'], g08:['router','program'], g09:['guide','lsp'], g10:['csv','indexeddb'],
 g11:['queue','qualifier'], g12:['rater'], g13:['workspace','relation','worker','websocket','template','codec'],
 g14:['ollama','sqlite'], g15:['abort','budget','emitter','ndjson','pool','sse','timeout','tool'],
}
function groupOf(f) {
  if (f.pkg === 'all') return f.slice === 's13' ? 'g05' : 'g15'
  for (const [g, pkgs] of Object.entries(groups)) if (pkgs.includes(f.pkg)) return g
  return null
}
const byGroup = {}
for (const f of findings) {
  const g = groupOf(f)
  if (!g) { console.log('UNASSIGNED:', f.id, f.pkg); continue }
  ;(byGroup[g] = byGroup[g] || []).push(f)
}
const manifest = {}
for (const [g, list] of Object.entries(byGroup).sort()) {
  const pkgs = [...new Set(list.map(f=>f.pkg))]
  const header = `# Findings for group ${g}\n\nPackages: ${pkgs.join(', ')}. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.\n\n`
  fs.writeFileSync(`/home/user/scaffold/tmp/units/verify/${g}-findings.md`, header + list.map(f=>`## ${f.id}\n\n${f.text}`).join('\n\n'))
  manifest[g] = { packages: pkgs, count: list.length, ids: list.map(f=>f.id) }
  console.log(g, list.length, pkgs.join(','))
}
fs.writeFileSync('/home/user/work/groups.json', JSON.stringify(manifest, null, 1))
fs.writeFileSync('/home/user/work/findings.json', JSON.stringify(findings, null, 1))
