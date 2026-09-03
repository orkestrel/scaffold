// Attach a refuter result the assembler could not attribute by transcript head: find, in a workflow journal, the
// result whose value carries `rulings` for the named package and merge it into that package's report.
// Usage: node fix-refuter.mjs <runId> <pkg>
import { readFileSync, writeFileSync } from 'node:fs'
const [runId, pkg] = process.argv.slice(2)
const dir = `/root/.claude/projects/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/subagents/workflows/${runId}`
const results = readFileSync(`${dir}/journal.jsonl`, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line)).filter((line) => line.type === 'result')
const hit = results.find((line) => line.result && Array.isArray(line.result.rulings) && line.result.package === pkg)
if (!hit) { console.log(`${pkg}: no refuter result in ${runId}`); process.exit(1) }
const path = `/home/user/work/reports/conform-${pkg}.json`
const report = JSON.parse(readFileSync(path, 'utf8'))
report.refuter = hit.result
writeFileSync(path, JSON.stringify(report, null, 1))
const confirmed = hit.result.rulings.filter((ruling) => ruling.verdict === 'CONFIRMED')
console.log(`${pkg}: refuter attached from agent ${hit.agentId}: ${confirmed.length} confirmed / ${hit.result.rulings.length - confirmed.length} refuted, breaking=${confirmed.filter((ruling) => ruling.breaking).length}`)
