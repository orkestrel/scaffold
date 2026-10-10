// Writes the g06-only records plans for the before and after series: copies by FIRST-LAST, the four
// conditions interleaved per copy, each with the arguments of its measured records condition:
//   node plan.mjs --set before|after-YYYY-MM-DD --copies FIRST-LAST --out PLAN.json
// f2 repeats the v9 a5-records arguments (2B, thinking off); t2a, f4, and t4 repeat plan.ts's records arm.
import { writeFileSync } from 'node:fs'
import { parseArgs } from 'node:util'

const BENCH = '/home/user/agent/tmp/bench'
const AGENT_2B = 'qwen3.5:2b-q4_K_M'
const AGENT_4B = 'qwen3.5:4b-q4_K_M'
const CONDITIONS = {
	f2: { model: undefined, think: false, grow: 0, predict: undefined, budget: false },
	t2a: { model: AGENT_2B, think: true, grow: 2048, predict: 2048, budget: true },
	f4: { model: AGENT_4B, think: false, grow: 0, predict: undefined, budget: true },
	t4: { model: AGENT_4B, think: true, grow: 1024, predict: 1024, budget: true },
}
const { values } = parseArgs({ options: { set: { type: 'string' }, copies: { type: 'string' }, out: { type: 'string' } } })
const copies = /^(\d)-(\d)$/.exec(values.copies ?? '')
if (!/^(before|after-\d{4}-\d{2}-\d{2})$/.test(values.set ?? '') || copies === null || values.out === undefined) {
	process.stderr.write('usage: node plan.mjs --set before|after-YYYY-MM-DD --copies FIRST-LAST --out PLAN.json\n')
	process.exit(64)
}
const plan = []
for (let copy = Number(copies[1]); copy <= Number(copies[2]); copy += 1) {
	for (const [name, condition] of Object.entries(CONDITIONS)) {
		const ctx = 3072 + condition.grow
		const budget = ((3072 * 0.7) / ctx).toFixed(6).replace(/0+$/, '')
		const args = [
			'--mode', 'ledger', '--profile', 'refined', '--scenario', `${BENCH}/variants/g06/${values.set}/v${copy}.json`,
			'--ctx', String(ctx), ...(condition.budget ? ['--budget', budget] : []), '--judge', 'mica', '--judge-ctx', '4096', '--tail', '0.35',
			'--judgments', `${BENCH}/results/v3/cal-categories.jsonl`, '--reply', 'terminal', '--records', 'on',
			...(condition.model === undefined ? [] : ['--model', condition.model]), ...(condition.think ? ['--think'] : []),
			...(condition.predict === undefined ? [] : ['--think-predict', String(condition.predict)]),
		]
		plan.push({ name: `${name}-${values.set}-v${copy}`, harness: 'bench3', estimate: condition.think ? 420 : 300, args })
	}
}
writeFileSync(values.out, `${JSON.stringify(plan, null, '\t')}\n`)
process.stdout.write(`${plan.length} runs written to ${values.out}\n`)
