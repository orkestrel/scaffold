// Classify each MOVED result from the material-dist comparison by what actually moved.
//
// The law: a devDependencies bump reaches nobody — re-pin, prove the gates, commit, do not
// publish. So a packed package.json differing only in devDependencies is NOT a bump trigger.
// No package in this fleet ships a consumer-run lifecycle script (verified), so `scripts` is
// dev-only here too. Everything else in package.json is consumer contract.
//
// Verdict per package:
//   PUBLISH  — dist moved materially, or the consumer contract in package.json moved
//   DEV_ONLY — the only movement is devDependencies and/or scripts
//   UNMOVED  — nothing moved at all
'use strict'
const { readFileSync, existsSync, readdirSync } = require('node:fs')
const { join } = require('node:path')

const WORK = '/home/user/scaffold/tmp/trigger1'
const DEV_ONLY_KEYS = new Set(['devDependencies', 'scripts'])
const EMPTY_EQUIVALENT_KEYS = new Set(['dependencies', 'peerDependencies', 'optionalDependencies'])

function contractOf(manifest) {
	const out = {}
	for (const key of Object.keys(manifest).sort()) {
		if (DEV_ONLY_KEYS.has(key)) continue
		const value = manifest[key]
		// An empty dependency record and an absent one are the same contract to every
		// consumer, so normalize them together rather than reporting a moved surface.
		if (EMPTY_EQUIVALENT_KEYS.has(key) && value !== null && typeof value === 'object' && Object.keys(value).length === 0) continue
		out[key] = value
	}
	return JSON.stringify(out, null, '\t')
}

function readManifest(path) {
	if (!existsSync(path)) return undefined
	return JSON.parse(readFileSync(path, 'utf8'))
}

const results = readFileSync(join(WORK, 'results.txt'), 'utf8').trim().split('\n')
const rows = []

for (const line of results) {
	const parts = line.split(/\s+/)
	const repo = parts[1]
	const status = parts[2]
	if (status === 'UNMOVED') {
		rows.push({ repo, verdict: 'UNMOVED', why: 'artifact and contract both unchanged' })
		continue
	}
	if (status !== 'MOVED') {
		rows.push({ repo, verdict: 'ERROR', why: status })
		continue
	}
	const detailPath = join(WORK, `${repo}.detail`)
	const detail = existsSync(detailPath) ? readFileSync(detailPath, 'utf8').trim().split('\n').filter(Boolean) : []
	const files = detail.map((d) => d.trim().split(/\s+/))
	const distMoved = files.filter((f) => f[1] !== 'package.json')
	const manifestMoved = files.some((f) => f[1] === 'package.json')

	let contractMoved = false
	let devDelta = []
	if (manifestMoved) {
		const pub = readManifest(join(WORK, repo, 'pub', 'package', 'package.json'))
		const loc = readManifest(join(WORK, repo, 'loc', 'package', 'package.json'))
		if (pub === undefined || loc === undefined) {
			contractMoved = true
		} else {
			contractMoved = contractOf(pub) !== contractOf(loc)
			const pd = pub.devDependencies ?? {}
			const ld = loc.devDependencies ?? {}
			for (const k of new Set([...Object.keys(pd), ...Object.keys(ld)])) {
				if (pd[k] !== ld[k]) devDelta.push(`${k} ${pd[k] ?? '(absent)'} -> ${ld[k] ?? '(absent)'}`)
			}
		}
	}

	if (distMoved.length > 0 || contractMoved) {
		const why = []
		if (distMoved.length > 0) why.push(`${distMoved.length} artifact file(s): ${distMoved.map((f) => f[1]).join(', ')}`)
		if (contractMoved) why.push('consumer contract in package.json moved')
		rows.push({ repo, verdict: 'PUBLISH', why: why.join('; ') })
	} else {
		rows.push({ repo, verdict: 'DEV_ONLY', why: `devDependencies only: ${devDelta.join('; ')}` })
	}
}

rows.sort((a, b) => (a.verdict === b.verdict ? a.repo.localeCompare(b.repo) : a.verdict.localeCompare(b.verdict)))
const counts = {}
for (const r of rows) counts[r.verdict] = (counts[r.verdict] ?? 0) + 1
console.log('=== verdict counts ===')
for (const [k, v] of Object.entries(counts).sort()) console.log(`  ${v}  ${k}`)
console.log('\n=== PUBLISH ===')
for (const r of rows.filter((r) => r.verdict === 'PUBLISH')) console.log(`  ${r.repo}: ${r.why}`)
console.log('\n=== ERROR ===')
for (const r of rows.filter((r) => r.verdict === 'ERROR')) console.log(`  ${r.repo}: ${r.why}`)
console.log('\n=== DEV_ONLY sample (first 3) ===')
for (const r of rows.filter((r) => r.verdict === 'DEV_ONLY').slice(0, 3)) console.log(`  ${r.repo}: ${r.why}`)
console.log('\n=== UNMOVED ===')
console.log('  ' + rows.filter((r) => r.verdict === 'UNMOVED').map((r) => r.repo).join(', '))
