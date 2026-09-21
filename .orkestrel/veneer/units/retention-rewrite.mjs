// Retention rewrite, 2026-09-20 (the Orchestrator's own unit, run from the scaffold root).
// The self-audit's retention lens found retained reports, briefs, claims files, and scripts citing
// evidence by the executor-side launch path (tmp/codex, tmp/units, tmp/audit) rather than the
// retained path, so the citations would resolve to nothing after the sweep. A first pass with sed
// (retained beside this file as retention-rewrite.sh, kept as the record of what ran) mangled the
// absolute forms that point into a subject checkout; this script maps every form explicitly.
//
// Mapping. The retained home is scaffold/.orkestrel/veneer (REC): claims files and patches the
// rounds were judged on sit at REC and REC/units; briefs, reports, scripts, and logs sit at
// REC/units, a log with the .log.txt suffix. A path is rewritten whether it is absolute (any of
// the three checkouts) or relative; a file under REC/units reaches REC with ../, and a sibling
// under units/ is named directly.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const REC = '.orkestrel/veneer'
const UNITS = `${REC}/units`
const ABS_REC = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer'
const SUBJECT = '(?:C:/Users/mikes/WebstormProjects/(?:test|veneer|scaffold)/)'
const SELF = new Set(['retention-rewrite.mjs', 'retention-rewrite.sh', 'handoff.md'])

const CLAIMS = String.raw`([a-z0-9-]+-audit-claims(?:-[0-9]+)?\.md)`
const PATCH = String.raw`([a-z0-9-]+-diff(?:-[0-9]+)?\.patch)`
const NAME = String.raw`([A-Za-z0-9._-]+)`

function rewrite(text, inUnits) {
	const rootRel = inUnits ? '../' : ''
	const unitsRel = inUnits ? '' : 'units/'
	let out = text
	// Already-mangled forms from the first pass: <subject>/../claims, <subject>/claims, <subject>/units/x.
	out = out.replace(new RegExp(`${SUBJECT}(?:\\.\\./)?${CLAIMS}`, 'g'), `${ABS_REC}/$1`)
	out = out.replace(new RegExp(`${SUBJECT}units/`, 'g'), `${ABS_REC}/units/`)
	// Absolute launch paths into any checkout.
	out = out.replace(new RegExp(`${SUBJECT}tmp/audit/${CLAIMS}`, 'g'), `${ABS_REC}/$1`)
	out = out.replace(new RegExp(`${SUBJECT}tmp/audit/${PATCH}`, 'g'), `${ABS_REC}/units/$1.txt`)
	out = out.replace(new RegExp(`${SUBJECT}tmp/(?:codex|units)/${NAME}\\.log\\b`, 'g'), `${ABS_REC}/units/$1.log.txt`)
	out = out.replace(new RegExp(`${SUBJECT}tmp/(?:codex|units)/`, 'g'), `${ABS_REC}/units/`)
	// Relative launch paths.
	out = out.replace(new RegExp(`(^|[^A-Za-z0-9_./-])tmp/audit/${CLAIMS}`, 'g'), `$1${rootRel}$2`)
	out = out.replace(new RegExp(`(^|[^A-Za-z0-9_./-])tmp/audit/${PATCH}`, 'g'), `$1${unitsRel}$2.txt`)
	out = out.replace(new RegExp(`(^|[^A-Za-z0-9_./-])tmp/(?:codex|units)/${NAME}\\.log\\b`, 'g'), `$1${unitsRel}$2.log.txt`)
	out = out.replace(new RegExp(`(^|[^A-Za-z0-9_./-])tmp/(?:codex|units)/`, 'g'), `$1${unitsRel}`)
	return out
}

let changed = 0
for (const dir of [REC, UNITS]) {
	const inUnits = dir === UNITS
	for (const entry of readdirSync(dir)) {
		if (SELF.has(entry)) continue
		const path = join(dir, entry)
		if (!statSync(path).isFile()) continue
		if (!/\.(md|sh|txt)$/u.test(entry)) continue
		const before = readFileSync(path, 'utf8')
		const after = rewrite(before, inUnits)
		if (after !== before) {
			writeFileSync(path, after)
			changed += 1
		}
	}
}
console.log(`rewritten files: ${changed}`)
