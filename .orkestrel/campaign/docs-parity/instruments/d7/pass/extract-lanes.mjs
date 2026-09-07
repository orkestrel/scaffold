// extract-lanes.mjs <journal> <outdir> <prefix>: writes each workflow result to <outdir>/<prefix>-<slug>.md, the slug from the
// result's first line ("Lane held: checker codec" → checker-codec; "Lane held: subjective …" → subjective; "# Report — `unit`" → unit).
import { readFileSync, writeFileSync } from 'node:fs'
const [journal, outdir, prefix] = process.argv.slice(2)
const lines = readFileSync(journal, 'utf8').split('\n').filter((l) => l.includes('"type":"result"'))
const seen = new Map()
for (const line of lines) {
  const rec = JSON.parse(line)
  const text = typeof rec.result === 'string' ? rec.result : JSON.stringify(rec.result, null, 2)
  const first = text.split('\n').find((l) => l.trim().length > 0) ?? ''
  let slug
  const lane = /Lane held:\s*([a-z]+)(?:\s+([a-z]+))?/i.exec(first) || /Lane held:\s*([a-z]+)(?:\s+([a-z]+))?/i.exec(text)
  const unit = /^# Report — `(d7[^`]+)`/m.exec(text)
  if (lane) slug = ['subjective', 'objective'].includes(lane[1].toLowerCase()) ? lane[1].toLowerCase() : `${lane[1].toLowerCase()}${lane[2] ? '-' + lane[2].toLowerCase() : ''}`
  else if (unit) slug = unit[1].replace(/^d7n?-/, '')
  else {
    const m = /Lane held:\s*(\S+)\s+(\S+)/.exec(text) || /(checker|verifier)\s+(\w+)/i.exec(text.slice(0, 400))
    slug = m ? `${m[1].toLowerCase()}-${m[2].toLowerCase()}` : `lane-${rec.agentId}`
  }
  const n = (seen.get(slug) ?? 0) + 1; seen.set(slug, n)
  const path = `${outdir}/${prefix}-${slug}${n > 1 ? '-' + n : ''}.md`
  writeFileSync(path, text.endsWith('\n') ? text : text + '\n')
  console.log(`${path}  (${text.length} chars; first: ${first.slice(0, 90)})`)
}
