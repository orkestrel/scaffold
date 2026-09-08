# Moves the titled pair onto `createServer` (Ruling 23) and returns
# `createNegotiator`'s block to a negotiation-only example of its own.
# The titled block's body is generated from the guide fence, so the pair is equal by construction.
import pathlib
import sys

guide = pathlib.Path('guides/server.md').read_text(encoding='utf8')
path = pathlib.Path('src/server/factories.ts')
text = path.read_text(encoding='utf8')

head = '### Quickstart: dispatcher, middleware, lifecycle\n'
start = guide.index(head)
open_fence = guide.index('```ts\n', start)
close_fence = guide.index('\n```\n', open_fence)
body = guide[open_fence + len('```ts\n') : close_fence + 1]

block = ' * @example Quickstart: dispatcher, middleware, lifecycle\n * ```ts\n'
for line in body.split('\n')[:-1]:
    block += f' * {line}\n' if line else ' *\n'
block += ' * ```\n'

old_server_example = """ * @example
 * ```ts
 * import { createServer } from '@src/server'
 * import { createDispatcher } from '@orkestrel/router'
 *
 * const dispatcher = createDispatcher<{ readonly ip?: string }>()
 * dispatcher.add({ method: 'GET', path: '/health', handler: () => new Response('ok') })
 *
 * const server = createServer({
 * \tdispatcher,
 * \tstate: (connection) => ({ ip: connection.ip }),
 * })
 * const port = await server.start()
 * await server.stop()
 * ```
"""

old_negotiator_example = text[text.index(' * @example Substrate direct use') : text.index(' */\nexport function createNegotiator')]

new_negotiator_example = """ * @example
 * ```ts
 * import type { MiddlewareContext } from '@src/server'
 * import { createNegotiator } from '@src/server'
 *
 * declare const context: MiddlewareContext<Record<string, never>>
 *
 * const negotiator = createNegotiator()
 * negotiator.negotiate('text/html, application/json;q=0.9', ['application/json', 'text/html']) // 'text/html'
 * negotiator.encoding('gzip;q=1.0, deflate;q=0.8', ['gzip', 'deflate']) // 'gzip'
 * negotiator.language('en-US, en;q=0.8, fr;q=0.5', ['en', 'fr']) // 'en'
 * await negotiator.format(new Request('http://x'), context, {
 * \t'application/json': (_request, _context) => Response.json({ ok: true }),
 * })
 * ```
"""

for old, new in ((old_negotiator_example, new_negotiator_example), (old_server_example, block)):
    if text.count(old) != 1:
        sys.exit(f'anchor not unique ({text.count(old)}): {old[:70]!r}')
    text = text.replace(old, new)

path.write_text(text, encoding='utf8')
print('src/server/factories.ts written')
