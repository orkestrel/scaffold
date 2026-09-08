# Applies the fix round's guide edits: the constants sentence, the pair's phases,
# the fence lead-ins, the dead binding, and the Quickstart's connection-derived state.
import pathlib
import sys

path = pathlib.Path('guides/server.md')
text = path.read_text(encoding='utf8')


def swap(old: str, new: str) -> None:
    global text
    if text.count(old) != 1:
        sys.exit(f'anchor not unique ({text.count(old)}): {old[:70]!r}')
    text = text.replace(old, new)


# Item 1 — the Constants convention sentence stands alone.
swap(
    "### Constants\n\nA `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`. A `Shape` cell holds the constant's declared type.\n",
    "### Constants\n\nA `Shape` cell holds the constant's declared type.\n",
)

# Item 5 — the boundary's phases, with no superlative over a pair.
swap(
    """6. **The built-in boundary is lifecycle machinery, not policy — one seam
   that spans setup and dispatch.** The `Server` wraps the whole per-request
   lifecycle in nested phases of the same boundary. The innermost phase
   covers only `buildRequest`: a malformed request (for example, an unparsable `Host`)
   answers a plain `400`, with no `error` emit, no `report` call, and no
   `response` emit, since nothing downstream ever ran and no parsed `Request`
   exists yet to derive its facts from. The outer phase covers everything
   after —
   a throwing `this.#state(connection)` through the middleware/dispatcher
   run — where a thrown `HTTPError` renders as its own status + message; any
""",
    """6. **The built-in boundary is lifecycle machinery, not policy — one seam
   that spans setup and dispatch.** The `Server` wraps the whole per-request
   lifecycle in an inner phase and an outer phase of the same boundary. The
   inner phase covers only `buildRequest`: a malformed request (for example,
   an unparsable `Host`) answers a plain `400`, with no `error` emit, no
   `report` call, and no `response` emit, because nothing downstream ever ran
   and no parsed `Request` exists yet to derive its facts from. The outer
   phase covers everything after — a throwing `this.#state(connection)`
   through the middleware/dispatcher run — where a thrown `HTTPError` renders
   as its own status + message; any
""",
)

# Item 9 — a complete sentence between each heading and the fence under it.
swap(
    "### Quickstart: dispatcher, middleware, lifecycle\n\n```ts\n",
    "### Quickstart: dispatcher, middleware, lifecycle\n\n"
    '`createServer` takes a dispatcher and a per-request state factory, `use`\n'
    'mounts middleware around the dispatch, and `start`, `stop`, and `destroy`\n'
    'run the lifecycle.\n\n```ts\n',
)
swap(
    "### SSE route\n\n```ts\n",
    "### SSE route\n\n"
    'A route returns the stream\'s `response` at once and pumps events into the\n'
    'handle afterwards; a `write` that reports `false` is backpressure `drain`\n'
    'waits out.\n\n```ts\n',
)
swap(
    "### Upgrade attach\n\n```ts\n",
    "### Upgrade attach\n\n"
    'An upgrade handler returns `true` to claim the socket, which ends the\n'
    'fan-out and leaves the connection with that handler.\n\n```ts\n',
)
swap(
    "### Substrate direct use — tokens, cookies, negotiation\n\n```ts\n",
    "### Substrate direct use — tokens, cookies, negotiation\n\n"
    'Each substrate helper stands on its own, so a caller reaches negotiation,\n'
    'signed cookies, tokens, and capped decompression without a `Server`.\n\n```ts\n',
)

# Item 8 — the dead binding leaves the flagship fence.
swap(
    "const value = await readSignedCookie(\n",
    "await readSignedCookie(\n",
)

# Item 2 — the Quickstart fence takes the connection fact the paired block carries.
swap(
    """interface State {
	readonly requestId: string
}

const dispatcher = createDispatcher<State>()
dispatcher.add({ method: 'GET', path: '/health', handler: () => new Response('ok') })

const logRequestId: MiddlewareHandler<State> = async (_request, context, next) => {
	const response = await next()
	response.headers.set('X-Request-ID', context.state.requestId)
	return response
}

const server = createServer<State>({
	dispatcher,
	state: () => ({ requestId: crypto.randomUUID() }),
})
""",
    """interface State {
	readonly requestId: string
	readonly ip: string | undefined
}

const dispatcher = createDispatcher<State>()
dispatcher.add({ method: 'GET', path: '/health', handler: () => new Response('ok') })

const logRequestId: MiddlewareHandler<State> = async (_request, context, next) => {
	const response = await next()
	response.headers.set('X-Request-ID', context.state.requestId)
	return response
}

const server = createServer<State>({
	dispatcher,
	state: (connection) => ({ requestId: crypto.randomUUID(), ip: connection.ip }),
})
""",
)

path.write_text(text, encoding='utf8')
print('guides/server.md written')
