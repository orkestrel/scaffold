import type { IncomingMessage, ServerResponse } from 'node:http'
import { createServer } from 'node:http'
import { once } from 'node:events'
import { isRecord } from '@orkestrel/contract'
import { MICA_MODEL, MODELS } from '../constants.js'
import { AGREE_QUESTION, FOCUS_QUESTION } from '../aggregates/constants.js'
import { FLUSH_SYSTEM } from '../Driver.js'

/** Serves actual Ollama wire boundaries for matrix admission tests. */
export class MatrixPeer {
	readonly calls: unknown[] = []
	readonly routes: string[] = []
	#loaded: unknown[] = []
	length = false
	missing = false
	support = false
	agreement: number | undefined
	escalations = false
	fault = false
	faults = 0
	parser: number | undefined
	decisions = 0
	metadata = 200
	flush = {
		length: false,
		fault: false,
		incomplete: false,
		missing: false,
		truncated: false,
		completion: 1,
		boundary: false,
	}
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
		this.routes.push(request.url ?? '')
		response.setHeader('connection', 'close')
		if (request.url === '/api/ps') {
			response.statusCode = this.metadata
			response.setHeader('content-type', 'application/json')
			response.end(JSON.stringify({ models: this.#loaded }))
			return
		}
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
		if (isRecord(body.options))
			this.#loaded = [
				{
					name: body.model,
					digest: String(
						[...Object.values(MODELS), MICA_MODEL].indexOf(String(body.model)) + 1,
					).repeat(64),
					runner: 'llamacpp',
					context_length: Math.min(Number(body.options.num_ctx), 262144),
					expires_at: new Date(Date.now() + 1800000).toISOString(),
				},
			]
		if (request.url === '/api/generate') {
			if (this.faults > 0) {
				this.faults -= 1
				response.writeHead(500, { 'content-type': 'application/json' })
				response.end(JSON.stringify({ error: 'context capacity wording in a transport fault' }))
				return
			}
			const noul = String(body.prompt).includes('Answer Yes if true, or No if false.')
			const tokens = noul ? ['Yes', 'No'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G']
			const topic = /The message concerns (\w+):/.exec(String(body.prompt))?.[1]
			const positive =
				this.support &&
				(String(body.prompt).includes(`Question: ${FOCUS_QUESTION.instructions}\n`) ||
					String(body.prompt).includes(`Question: ${AGREE_QUESTION.instructions}\n`) ||
					(topic !== undefined &&
						(topic !== 'escalations' || this.escalations) &&
						String(body.prompt)
							.split('<state>')[1]
							?.split('</state>')[0]
							?.toLowerCase()
							.includes(topic.slice(0, -1))))
			const winner = noul ? (positive ? 'Yes' : 'No') : 'A'
			const agreement =
				this.agreement !== undefined &&
				(String(body.prompt).includes(`Question: ${FOCUS_QUESTION.instructions}\n`) ||
					String(body.prompt).includes(`Question: ${AGREE_QUESTION.instructions}\n`))
					? this.agreement
					: undefined
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
								logprob:
									agreement === undefined
										? token === winner
											? -0.01
											: -8
										: Math.log(token === 'Yes' ? agreement : 1 - agreement),
							})),
						},
					],
				}),
			)
			return
		}
		if (request.url !== '/api/chat' || !Array.isArray(body.messages) || !isRecord(body.options))
			throw new Error('fixture expected chat')
		const flush =
			body.think === false &&
			body.options.num_predict === 1 &&
			body.tools === undefined &&
			body.messages.length === 2 &&
			body.messages.every(
				(message: unknown, index: number) =>
					isRecord(message) &&
					message.role === (index === 0 ? 'system' : 'user') &&
					message.content === (index === 0 ? FLUSH_SYSTEM : ''),
			)
		if (flush && this.flush.fault) {
			response.writeHead(500, { 'content-type': 'application/json' })
			response.end(JSON.stringify({ error: 'fixture flush HTTP failure' }))
			return
		}
		if (body.options.num_predict === 512 && Array.isArray(body.tools) && body.tools.length > 0) {
			this.decisions += 1
			if (this.decisions === this.parser) {
				response.writeHead(500, { 'content-type': 'application/json' })
				response.end(
					JSON.stringify({
						error: 'XML syntax error on line 6: element <function> closed by </parameter>',
					}),
				)
				return
			}
		}
		if (this.fault && body.options.num_predict !== 1) {
			response.writeHead(500, { 'content-type': 'application/json' })
			response.end(
				JSON.stringify({ error: 'context capacity exceeded by fixture transport fault' }),
			)
			return
		}
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
		const completion = flush
			? this.flush.completion
			: body.options.num_predict === 1
				? 1
				: capped
					? 512
					: 5
		response.setHeader('content-type', 'application/x-ndjson')
		response.end(
			`${JSON.stringify({ model: body.model, done: !(flush && this.flush.incomplete), done_reason: capped || (flush && this.flush.length) ? 'length' : 'stop', message: { role: 'assistant', content: this.support && body.options.num_predict === 160 ? 'The standing rule applies to this topic.' : 'Fixture answer.' }, ...(flush && this.flush.truncated ? { truncated: true } : {}), ...((this.missing && body.options.num_predict !== 1) || (flush && this.flush.missing) ? {} : { prompt_eval_count: flush && this.flush.boundary ? Number(body.options.num_ctx) - completion : prompt, eval_count: completion }) })}\n`,
		)
	}
}
