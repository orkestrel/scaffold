// u2fix mutation probe: pre-module-load Set sabotage, armable so module
// evaluation itself survives. Expected RED on the audited artifact (reporter
// throws structure; auditor refusal lacks path) and GREEN on the fixed one
// (reporter answers a fault array; auditor refusal context carries path).
// Run: node u2fix-mutation.mjs </abs/dist/index.js>
/* eslint-disable */
const original = Set.prototype.add
let armed = false
Set.prototype.add = function add(value) {
	if (armed) throw new Error('hostile add')
	return Reflect.apply(original, this, [value])
}

const lib = await import(process.argv[2])
const { compileReporter, compileAuditor, objectShape, stringShape, isContractError } = lib

const wideProperties = {}
for (let index = 0; index < 40; index += 1) wideProperties[`key${index}`] = stringShape()
const wide = objectShape(wideProperties)

function record(label, drive) {
	let outcome
	armed = true
	try {
		const answer = drive()
		outcome = `ANSWERED ${JSON.stringify(answer).slice(0, 90)}`
	}
	catch (error) {
		outcome = isContractError(error)
			? `THREW ${error.code} context=${JSON.stringify(error.context ?? null).slice(0, 80)}`
			: `THREW raw ${error}`
	}
	finally {
		armed = false
	}
	console.log(`${label}: ${outcome}`)
	return outcome
}

const reporter = record('reporter wide+hostile', () => compileReporter(wide, { key0: 'x' }))
const auditor = record('auditor wide+hostile ', () => compileAuditor(wide, { key0: 'x' }))

const reporterTotal = reporter.startsWith('ANSWERED')
const auditorPath = auditor.includes('"path"')
console.log(`verdict: reporter total ${reporterTotal ? 'GREEN' : 'RED'}; auditor path in refusal ${auditorPath ? 'GREEN' : 'RED'}`)
