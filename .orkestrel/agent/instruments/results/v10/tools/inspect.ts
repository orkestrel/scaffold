// Inspects every recorded daemon call of the v10 runs and reports what departs from the run's condition:
//   node inspect.ts --dir RESULTS_DIR --out FILE.json [RUN...]
// With no RUN, every run directory that has a `-wire` sibling is read. For each call it checks the HTTP status, the
// model, `think`, `num_ctx`, `num_predict`, temperature, seed, and `truncate`, against the condition the run name
// carries (f4: 4B, thinking off; t2: 2B, thinking on, cap 1,024; t2w and t2a: 2B, thinking on, cap 2,048); then the
// done reason, a cap hit, a prompt plus completion within 64 tokens of `num_ctx`, an empty reply with no tool call,
// and thinking on a call that asked for none. It compares the agent-call count with the harness's own call log.
// Exit: 0 written; 64 on usage.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Expect {
	readonly model: string
	readonly think: boolean
	readonly predict: number | undefined
}

interface Finding {
	readonly run: string
	readonly file: string
	readonly kind: string
	readonly detail: string
}

const MARGIN = 64

function readFlag(argv: readonly string[], name: string): string | undefined {
	const at = argv.indexOf(name)
	if (at < 0) return undefined
	const value = argv[at + 1]
	return value === undefined || value.startsWith('--') ? undefined : value
}

function expectFor(run: string): Expect | undefined {
	if (run.startsWith('f4-')) return { model: 'qwen3.5:4b-q4_K_M', think: false, predict: undefined }
	if (run.startsWith('t2-')) return { model: 'qwen3.5:2b-q4_K_M', think: true, predict: 1024 }
	if (run.startsWith('t2w-') || run.startsWith('t2a-')) return { model: 'qwen3.5:2b-q4_K_M', think: true, predict: 2048 }
	return undefined
}

function readStream(text: string): { content: string; thinking: string; calls: number; last: Record<string, unknown> } {
	let content = ''
	let thinking = ''
	let calls = 0
	let last: Record<string, unknown> = {}
	for (const line of text.split('\n')) {
		if (line.trim() === '') continue
		const record = JSON.parse(line) as Record<string, unknown>
		const message = (record.message ?? {}) as Record<string, unknown>
		if (typeof message.content === 'string') content += message.content
		if (typeof message.thinking === 'string') thinking += message.thinking
		if (Array.isArray(message.tool_calls)) calls += message.tool_calls.length
		last = record
	}
	return { content, thinking, calls, last }
}

function harnessCalls(dir: string): number | undefined {
	if (!existsSync(dir)) return undefined
	const file = readdirSync(dir).find((name) => name.endsWith('.jsonl') && !name.startsWith('memory'))
	if (file === undefined) return undefined
	let count = 0
	for (const line of readFileSync(join(dir, file), 'utf8').split('\n')) {
		if (line.trim() === '') continue
		const row = JSON.parse(line) as Record<string, unknown>
		if (!Array.isArray(row.calls)) continue
		count += row.calls.filter((call: Record<string, unknown>) => call.label === 'agent' || call.label === undefined).length
	}
	return count
}

function inspectRun(dir: string, run: string, findings: Finding[]): Record<string, unknown> {
	const expect = expectFor(run)
	const wire = join(dir, `${run}-wire`)
	const requests = readdirSync(wire).filter((name) => name.endsWith('_api_chat-request.json')).sort()
	let agent = 0
	let summarizer = 0
	let cut = 0
	let empty = 0
	let near = 0
	for (const name of requests) {
		const request = JSON.parse(readFileSync(join(wire, name), 'utf8')) as Record<string, unknown>
		const body = (request.body ?? {}) as Record<string, unknown>
		const options = (body.options ?? {}) as Record<string, unknown>
		const responsePath = join(wire, name.replace('-request.json', '-response.json'))
		const add = (kind: string, detail: string): void => {
			findings.push({ run, file: name, kind, detail })
		}
		// The summarizer and the answer pass are the calls that may differ from the agent's condition.
		const tools = Array.isArray(body.tools) ? body.tools.length : 0
		const isSummary = body.think !== true && tools === 0 && expect?.think === true && run.includes('compaction')
		if (isSummary) summarizer += 1
		else agent += 1
		if (expect !== undefined) {
			if (body.model !== expect.model) add('model', `${String(body.model)} where the condition runs ${expect.model}`)
			const answerPass = expect.think && body.think === false && tools === 0
			if (!isSummary && !answerPass && Boolean(body.think) !== expect.think) add('think', `think ${String(body.think)} where the condition runs ${String(expect.think)}`)
			if (answerPass && !run.startsWith('t2a-')) add('think', 'a tool-free call with thinking off outside t2a')
			if (!isSummary && expect.think && options.num_predict !== expect.predict) add('predict', `num_predict ${String(options.num_predict)} where the condition caps ${String(expect.predict)}`)
		}
		if (options.temperature !== 0) add('sampler', `temperature ${String(options.temperature)}`)
		if (options.seed !== 7) add('sampler', `seed ${String(options.seed)}`)
		if (body.truncate !== false) add('truncate', `truncate ${String(body.truncate)}`)
		if (!existsSync(responsePath)) {
			add('response', 'no response file')
			continue
		}
		const response = JSON.parse(readFileSync(responsePath, 'utf8')) as Record<string, unknown>
		if (response.status !== 200) {
			add('status', `HTTP ${String(response.status)}: ${String(response.text ?? '').slice(0, 160)}`)
			continue
		}
		const stream = readStream(String(response.text ?? ''))
		const prompt = Number(stream.last.prompt_eval_count)
		const completion = Number(stream.last.eval_count)
		const ctx = Number(options.num_ctx)
		if (stream.last.done !== true) add('done', 'the stream ended without a done record')
		if (stream.last.done_reason === 'length') {
			cut += 1
			add('cut', `done_reason length at ${completion} tokens${stream.content === '' && stream.calls === 0 ? ', no content' : ''}`)
		}
		if (Number.isFinite(prompt) && Number.isFinite(completion) && Number.isFinite(ctx) && prompt + completion >= ctx - MARGIN) {
			near += 1
			add('window', `prompt ${prompt} plus completion ${completion} within ${MARGIN} of num_ctx ${ctx}`)
		}
		if (stream.content.trim() === '' && stream.calls === 0 && stream.last.done_reason !== 'length') {
			empty += 1
			add('empty', `no content and no tool call; thinking ${stream.thinking.length} characters`)
		}
		if (body.think !== true && stream.thinking !== '') add('thinking', `thinking ${stream.thinking.length} characters on a call that asked for none`)
	}
	const logged = harnessCalls(join(dir, run))
	if (logged !== undefined && logged !== agent + summarizer && logged !== agent) findings.push({ run, file: '', kind: 'count', detail: `${agent + summarizer} wire calls (agent ${agent}, summarizer ${summarizer}) against ${logged} in the harness log` })
	return { run, calls: requests.length, agent, summarizer, cut, empty, near, logged }
}

function main(): number {
	const argv = process.argv.slice(2)
	const dir = readFlag(argv, '--dir')
	const out = readFlag(argv, '--out')
	if (dir === undefined || out === undefined) {
		process.stderr.write('usage: node inspect.ts --dir RESULTS_DIR --out FILE.json [RUN...]\n')
		return 64
	}
	const named = argv.filter((arg, at) => !arg.startsWith('--') && !argv[at - 1]?.startsWith('--'))
	const runs = named.length > 0 ? named : readdirSync(dir).filter((name) => existsSync(join(dir, `${name}-wire`)) && !name.endsWith('-wire')).sort()
	const findings: Finding[] = []
	const summary = runs.map((run) => inspectRun(dir, run, findings))
	writeFileSync(out, `${JSON.stringify({ summary, findings }, null, 1)}\n`)
	const kinds = new Map<string, number>()
	for (const finding of findings) kinds.set(finding.kind, (kinds.get(finding.kind) ?? 0) + 1)
	process.stdout.write(`${runs.length} runs, ${summary.reduce((sum, row) => sum + Number(row.calls), 0)} calls, ${findings.length} findings: ${[...kinds].map(([kind, count]) => `${kind} ${count}`).join(', ')}\n`)
	return 0
}

process.exit(main())
