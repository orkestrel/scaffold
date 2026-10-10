import type { IncomingMessage, ServerResponse } from 'node:http'
import { createServer } from 'node:http'
import { once } from 'node:events'
import { isRecord } from '@orkestrel/contract'
import { MICA_MODEL, MODELS } from '../constants.js'

/** Serves actual Ollama wire boundaries for matrix admission tests. */
export class MatrixPeer {
	readonly calls: unknown[] = []
	length = false
	missing = false
	support = false
	escalations = false
	readonly #server = createServer((request, response) => {
		void this.#respond(request, response).catch((error: unknown) =>
			response.writeHead(500).end(String(error)),
		)
	})

	/** Binds a protocol peer to an ephemeral IPv4 address. */
	async start(): Promise<string> {
		this.#server.listen(0, '127.0.0.1')
		await once(this.#server, 'listening')
		const address = this.#server.address()
		if (address === null || typeof address === 'string') throw new Error('fixture has no port')
		return `http://127.0.0.1:${address.port}`
	}

	/** Closes the owned server and its connections. */
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
					models: [...Object.values(MODELS), MICA_MODEL].map((name, index) => ({
						name,
						digest: String(index + 1).repeat(64),
					})),
				}),
			)
			return
		}
		const chunks: Buffer[] = []
		for await (const chunk of request)
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
		const body: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
		if (!isRecord(body)) throw new Error('fixture expected an object')
		this.calls.push(body)
		if (request.url === '/api/generate') {
			const noul = String(body.prompt).includes('Answer Yes if true, or No if false.')
			const tokens = noul ? ['Yes', 'No'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G']
			const topic = /The message concerns (\w+):/.exec(String(body.prompt))?.[1]
			const positive =
				this.support &&
				(String(body.prompt).includes('Does the summary agree') ||
					(topic !== undefined &&
						(topic !== 'escalations' || this.escalations) &&
						String(body.prompt)
							.split('<state>')[1]
							?.split('</state>')[0]
							?.toLowerCase()
							.includes(topic.slice(0, -1))))
			const winner = noul ? (positive ? 'Yes' : 'No') : 'A'
			response.setHeader('content-type', 'application/json')
			response.end(
				JSON.stringify({
					model: body.model,
					done: true,
					done_reason: 'stop',
					response: winner,
					prompt_eval_count: 50,
					eval_count: 1,
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
			throw new Error('fixture expected chat')
		const prompt = body.messages.reduce(
			(total: number, message: unknown) =>
				total + (isRecord(message) ? Math.ceil(String(message.content).length / 4) + 4 : 0),
			11,
		)
		const capped =
			this.length &&
			body.options.num_predict === 512 &&
			Array.isArray(body.tools) &&
			body.tools.length > 0
		const completion = body.options.num_predict === 1 ? 1 : capped ? 512 : 5
		response.setHeader('content-type', 'application/x-ndjson')
		response.end(
			`${JSON.stringify({ model: body.model, done: true, done_reason: capped ? 'length' : 'stop', message: { role: 'assistant', content: this.support && body.options.num_predict === 160 ? 'The standing rule applies to this topic.' : 'Fixture answer.' }, ...(this.missing && body.options.num_predict !== 1 ? {} : { prompt_eval_count: prompt, eval_count: completion }) })}\n`,
		)
	}
}
