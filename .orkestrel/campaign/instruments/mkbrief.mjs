// Generate one breaking unit brief from the template, the ledger, the audit carriers, and the plan.
// Usage: node mkbrief.mjs <package> [staged-deps-comma-list] [standing-conditions]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const [pkg, staged = '', standing = 'none'] = process.argv.slice(2)
if (!pkg) throw new Error('package required')
const FIX = '/home/user/scaffold/.orkestrel/campaign/fix'
const tpl = readFileSync('/home/user/scaffold/tmp/units/fix/breaking-unit-brief-template.md', 'utf8')
const ledger = JSON.parse(readFileSync(`${FIX}/breaking-ledger.json`, 'utf8')).filter(r => r.package === pkg)
const carriers = JSON.parse(readFileSync(`${FIX}/audit-findings.json`, 'utf8'))[pkg] || []
const rulings = JSON.parse(readFileSync(`${FIX}/rulings.json`, 'utf8'))[pkg] || []
let vocabulary = 'none landed yet — apply the rulings above'
try { vocabulary = readFileSync(`${FIX}/vocabulary.md`, 'utf8').trim() } catch {}
const repo = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
const rows = ledger.map(r => `- **${r.id}** (${r.kind}): ${r.summary}${r.edits && r.edits.length ? ' — edits: ' + r.edits.map(e => `${e.member ? e.member + '.' : ''}${e.symbol} ${e.action}${e.to ? ' → ' + e.to : ''} [${e.file || '?'}]`).join('; ') : ''}${r.prerequisite && r.prerequisite.length ? ' — after: ' + r.prerequisite.join(', ') : ''}${r.guide ? ' — guide: ' + r.guide : ''}`).join('\n')
const audit = carriers.length ? carriers.map(c => `- ${c}`).join('\n') : 'none'
const stagedText = staged ? staged.split(',').map(s => `\`${s.trim()}\``).join(', ') + ' (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared)' : 'none — every dependency this package imports is at its registry version'
const out = tpl
	.replaceAll('PACKAGE', pkg).replaceAll('REPO', repo)
	.replace('ROWS', rows || 'none').replace('AUDIT_FINDINGS', audit)
	.replace('RULINGS', rulings.length ? rulings.map(r => `- ${r}`).join('\n') : 'none').replace('VOCABULARY', vocabulary)
	.replace('STAGED_TARBALLS', stagedText).replace('STANDING_CONDITIONS', standing)
	.replace('UNKNOWNS', ledger.some(r => r.edits && r.edits.some(e => e.action === 'rename' && !e.to)) ? 'Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan\'s ruling for each is stated in the row summary above, and where it is not, stop and report the row.' : 'none')
mkdirSync('/home/user/scaffold/tmp/units/breaking', { recursive: true })
const path = `/home/user/scaffold/tmp/units/breaking/${pkg}-brief.md`
writeFileSync(path, out)
console.log(path, '| rows:', ledger.length, '| audit carriers:', carriers.length)
