# T6b shared row texts (referenced by slice-3+ briefs; each brief inlines what it needs)

## The createLoopback contract (test 0.0.5, server entry)

`createLoopback(server)` from `@orkestrel/test/server` accepts the caller's UNSTARTED
Node server (http, https, or plain net), binds it to `127.0.0.1` on an ephemeral port,
and resolves `{ url, port, destroy }`. `url` is `http://127.0.0.1:${port}` with no
trailing slash — a TLS server's origin is `port` plus a scheme the caller writes.
`destroy()` drops live connections on a server carrying `closeAllConnections` (http and
https both do), then closes; it is idempotent and repeated calls return the same
promise; a plain net server waits for its open sockets to end. An already-listening
server is refused with `ERR_SERVER_ALREADY_LISTEN`.

## The startServer → createLoopback mapping

A local `startServer`-style helper typically constructs a server around a handler,
listens on port 0, and returns url/port plus a close function. Migrate the BIND SPINE
only: the caller keeps building its own server (`createServer(handler)` and every
route, header, and scripted reply stays with the caller), then awaits
`createLoopback(server)`, reads `loopback.url` / `loopback.port`, and releases with
`loopback.destroy()`. Anything the local helper does beyond bind-and-release (socket
tracking for assertions, scripted reply policy, upgrade wiring) stays in the test or a
retained local helper. If the spine is not separable mechanically at a site, stop and
report that site.

## The dead isBrowserVuePath row (Row Z in every brief)

If a non-vendored `tests/setup*.ts` declares `isBrowserVuePath` and
`grep -rn "isBrowserVuePath" tests/ src/ app/` finds no call site outside the
declaration, delete the declaration and its comment block. The 0.0.38 vendored policy
sweep no longer consumes it. If a call site exists, keep the function and note the site.
