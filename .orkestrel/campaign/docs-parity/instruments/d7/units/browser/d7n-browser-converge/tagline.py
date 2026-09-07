"""Rewrites the guide tagline, folds its displaced sentences into the opening prose, and gives the README the same pitch."""
TAGLINE = """> A lightweight Chrome DevTools Protocol automation layer for Chromium-family
> browsers: an environment-agnostic core that drives pages, frames, locators, and
> DOM snapshots over an injected transport, and a Node runtime that finds,
> launches, and connects to the browser itself."""

OPENING = """`CDPClient` frames JSON-RPC-shaped CDP messages over the transport, `BrowserContext` and
`BrowserPage` model a CDP browser context and its pages, `BrowserSnapshot` turns a captured DOM
snapshot into navigable serializable data, and `BrowserCodegen` records page interactions for later
script compilation — none of it touching `WebSocket`, `node:*`, or a filesystem, so the same code
runs under Node or in a page. One capability reaches past the protocol: `article()` distills a
captured document to its reader-facing prose through `@orkestrel/html`, selecting content rather
than dumping the whole body's text. The Node pieces are `WebSocketCDPTransport`, a `WebSocket`-backed
CDP transport; `Browser`, which spawns a real Chromium-family process when nothing is already
listening on the CDP endpoint; and a filesystem-backed browser writer. Import the first surface from
`@orkestrel/browser` and the second from `@orkestrel/browser/server`. Source:
[`src/core`](../src/core) (through `@src/core`) and [`src/server`](../src/server) (through
`@src/server`)."""

PITCH_ONBOARDING = """Connect to a running browser or launch one with the `createBrowser` function, open a page in its
default context, and drive that page through locators, trusted input, network control, and DOM
snapshots. Inject your own `CDPTransportInterface` where the runtime is not Node. Part of the
`@orkestrel` line."""

guide = open('guides/browser.md').read().split('\n')
assert guide[0] == '# Browser', guide[0]
end = next(i for i in range(2, len(guide)) if not guide[i].startswith('> '))
assert guide[end] == '', repr(guide[end])
assert guide[end + 1] == '## Surface', guide[end + 1]
guide[2:end] = TAGLINE.split('\n') + [''] + OPENING.split('\n')
open('guides/browser.md', 'w').write('\n'.join(guide))

readme = open('README.md').read().split('\n')
assert readme[0] == '# @orkestrel/browser', readme[0]
stop = next(i for i in range(2, len(readme)) if readme[i] == '')
readme[2:stop] = TAGLINE.split('\n') + [''] + PITCH_ONBOARDING.split('\n')
open('README.md', 'w').write('\n'.join(readme))
print('tagline and pitch written')
