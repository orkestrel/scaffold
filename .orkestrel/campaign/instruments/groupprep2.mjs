import fs from 'node:fs'
const findings = []
const slices = ['s01','s02','s03','s04','s04b','s05','s06','s07','s08','s09','s10','s11']
for (const s of slices) {
  const path = `/home/user/scaffold/tmp/units/src-audit-${s}-report.md`
  if (!fs.existsSync(path)) { console.log('missing (skipped):', s); continue }
  const text = fs.readFileSync(path,'utf8')
  const body = text.split(/## Findings/)[1] || ''
  const stop = body.search(/\n## (Clean|Deviation|Coverage|Referrals)/)
  const sect = stop >= 0 ? body.slice(0, stop) : body
  const parts = sect.split(/\n(?=\d+\.\s+package=)/).filter(p => /package=/.test(p))
  for (const p of parts) {
    const num = (p.match(/^(\d+)\./) || [])[1]
    const rawpkg = (p.match(/package=([^\s`]+|`[^`]+`)/) || [])[1] || ''
    const first = (rawpkg.replace(/`/g,'').match(/[a-z]+/) || [''])[0]
    const verdict = (p.match(/verdict=([A-Z-]+)/) || [])[1]
    findings.push({ id: `${s}-${String(num).padStart(2,'0')}`, slice: s, pkg: first, verdict, text: p.trim() })
  }
}
console.log('total round-2 findings:', findings.length)
const tally = {}
for (const f of findings) { tally[f.pkg] = (tally[f.pkg]||0)+1 }
console.log(JSON.stringify(tally))
const groups = {
 h04a:[], h04b:[],
 h01:['mcp'], h02:['scaffold'], h03:['contract'],  h05:['database'], h06:['workflow'],
 h07:['reason'], h08:['html','agent'], h09:['probe','console'], h10:['markdown','toolbox'], h11:['test','middleware'],
}
fs.mkdirSync('/home/user/scaffold/tmp/units/verify2', { recursive: true })
const manifest = {}
for (const [g, pkgs] of Object.entries(groups)) {
  let list
  if (g === 'h04a') list = findings.filter(f => f.pkg === 'browser' && f.slice === 's04')
  else if (g === 'h04b') list = findings.filter(f => f.pkg === 'browser' && f.slice === 's04b')
  else list = findings.filter(f => pkgs.includes(f.pkg))
  if (!list.length) { console.log(g, 'EMPTY'); continue }
  const header = `# Findings for group ${g} (verification round 2)\n\nPackages: ${pkgs.length ? pkgs.join(', ') : 'browser'}. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it. Note: scaffold lives at /home/user/scaffold, every other package at /home/user/fleet/<name>.\n\n`
  fs.writeFileSync(`/home/user/scaffold/tmp/units/verify2/${g}-findings.md`, header + list.map(f=>`## ${f.id}\n\n${f.text}`).join('\n\n'))
  manifest[g] = { packages: pkgs, count: list.length }
  console.log(g, list.length, pkgs.join(','))
}
fs.writeFileSync('/home/user/work/groups2.json', JSON.stringify(manifest, null, 1))
fs.writeFileSync('/home/user/work/findings2.json', JSON.stringify(findings, null, 1))
