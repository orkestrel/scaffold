import type { IncomingMessage, ServerResponse } from 'node:http'
import { createServer } from 'node:http'
import { once } from 'node:events'
import { setTimeout } from 'node:timers/promises'
import { isRecord } from '@orkestrel/contract'
import { MICA_MODEL, MODELS } from '../../constants.js'

/** Serves only an ephemeral real Ollama protocol boundary for continuous-history proofs. */
export class Peer {
	readonly calls: unknown[] = []
	missingAt: string | undefined
	lengthAt: string | undefined
	filingFailure = false
	faults = 0
	status = 500
	readonly #server = createServer((request, response) => {
		void this.#respond(request, response).catch((error: unknown) =>
			response.writeHead(500).end(String(error)),
		)
	})

	/** Opens the owned protocol peer. */
	async start(): Promise<string> {
		this.#server.listen(0, '127.0.0.1')
		await once(this.#server, 'listening')
		const address = this.#server.address()
		if (address === null || typeof address === 'string') throw new Error('no fixture port')
		return `http://127.0.0.1:${address.port}`
	}

	/** Closes its socket and connections. */
	async destroy(): Promise<void> {
		this.#server.close()
		this.#server.closeAllConnections()
		await once(this.#server, 'close')
	}

	async #respond(request: IncomingMessage, response: ServerResponse): Promise<void> {
		response.setHeader('connection', 'close')
		if (request.url === '/api/tags') {
			response.setHeader('content-type', 'application/json')
			response.end(
				JSON.stringify({
					models: [...Object.values(MODELS), MICA_MODEL].map((name, at) => ({
						name,
						digest: String(at + 1).repeat(64),
					})),
				}),
			)
			return
		}
		const chunks: Buffer[] = []
		for await (const chunk of request)
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
		const body: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
		if (!isRecord(body)) throw new Error('invalid peer request')
		this.calls.push(body)
		await setTimeout(10)
		if (request.url === '/api/generate') {
			if (this.faults > 0) {
				this.faults -= 1
				response.writeHead(this.status, { 'content-type': 'application/json' })
				response.end(JSON.stringify({ error: 'context capacity wording in a transport fault' }))
				return
			}
			const prompt = String(body.prompt)
			const noul = prompt.includes('Answer Yes if true, or No if false.')
			const winner = noul
				? prompt.includes('Does the summary agree') ||
					prompt.includes('The message concerns policies:')
					? 'Yes'
					: 'No'
				: 'A'
			const tokens = noul ? ['Yes', 'No'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G']
			response.setHeader('content-type', 'application/json')
			response.end(
				JSON.stringify({
					model: body.model,
					done: true,
					done_reason: 'stop',
					response: winner,
					...(this.filingFailure ? {} : { prompt_eval_count: 50, eval_count: 1 }),
					logprobs: [
						{
							token: winner,
							logprob: -0.01,
							top_logprobs: tokens.map((token) => ({
								token,
								logprob: token === winner ? -0.01 : -8,
							})),
						},
					],
				}),
			)
			return
		}
		if (request.url !== '/api/chat' || !Array.isArray(body.messages) || !isRecord(body.options))
			throw new Error('invalid chat')
		const messages = body.messages.filter(isRecord)
		const latest = messages.findLast((message) => message.role === 'user')
		const requestText = String(latest?.content ?? '')
		const goal = /Read-point ([^:]+):/.exec(requestText)?.[1] ?? ''
		const current = messages.slice(messages.lastIndexOf(latest ?? {}))
		const invoke =
			body.options.num_predict !== 1 &&
			Array.isArray(body.tools) &&
			body.tools.length > 0 &&
			!current.some((message) => message.role === 'tool')
		const tool = invoke
			? [{ function: { name: 'lookup_order', arguments: { id: 'FC-1000' } } }]
			: undefined
		const reply =
			body.options.num_predict === 1
				? '.'
				: body.options.num_predict === 160
					? 'The standing rule applies to this topic.'
					: `Actual product ${goal}: ${Array.from({ length: 10 }, (_one, at) => `Review item ${at + 1}: preserve the external receipt, reconcile the current obligation, and treat the earlier draft as work awaiting confirmation.`).join(' ')}`
		const prompt = messages.reduce(
			(total, message) => total + Math.ceil(String(message.content).length / 4) + 4,
			11,
		)
		const length =
			this.lengthAt !== undefined && goal.includes(this.lengthAt) && body.options.num_predict !== 1
		response.setHeader('content-type', 'application/x-ndjson')
		response.end(
			`${JSON.stringify({ model: body.model, done: true, done_reason: length ? 'length' : 'stop', message: { role: 'assistant', content: invoke ? '' : reply, ...(tool === undefined ? {} : { tool_calls: tool }) }, ...(this.missingAt !== undefined && goal.includes(this.missingAt) && body.options.num_predict !== 1 ? {} : { prompt_eval_count: prompt, eval_count: body.options.num_predict === 1 ? 1 : length ? body.options.num_predict : invoke ? 20 : body.options.num_predict === 160 ? 10 : 350 }) })}\n`,
		)
	}
}
