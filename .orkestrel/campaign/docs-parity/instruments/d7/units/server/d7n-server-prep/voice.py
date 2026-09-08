import io, sys

EDITS = {
 'tests/setupServer.ts': [
  ("/** The workspace root, anchored from this setup file's own location. */",
   "/** Holds the workspace root, anchored from this setup file's own location. */"),
  ("/** The outcome of a raw `upgradeRequest` probe: whether a handler claimed the socket. */",
   "/** Reports the outcome of a raw `upgradeRequest` probe: whether a handler claimed the socket. */"),
  (""" * Send a raw, hand-written HTTP request over a bare `node:net` socket and
 * resolve with whatever bytes come back — the real-socket probe for""",
   """ * Sends a raw, hand-written HTTP request over a bare `node:net` socket and
 * resolves with whatever bytes come back — the real-socket probe for"""),
  ("/** A real HTTP response socket whose readable side starts paused. */",
   "/** Represents a real HTTP response socket whose readable side starts paused. */"),
  (" * Open a real HTTP request over TCP while parking the response reader.",
   " * Opens a real HTTP request over TCP while parking the response reader."),
  (" * Probe whether a real TCP connection is dropped before it can carry data.",
   " * Probes whether a real TCP connection is dropped before it can carry data."),
  ("/** A client-side upgraded connection deliberately left open — see {@link holdUpgrade}. */",
   "/** Represents a client-side upgraded connection deliberately left open — see {@link holdUpgrade}. */"),
  (""" * Complete a real protocol upgrade and KEEP the socket open — the long-lived
 * connection a WebSocket peer holds, for the tests that ask what `stop()` does""",
   """ * Completes a real protocol upgrade and KEEPS the socket open — the long-lived
 * connection a WebSocket peer holds, for the tests that ask what `stop()` does"""),
 ],
 'src/server/types.ts': [
  (""" * Represents a content-coding the substrate compresses / decompresses with — the
 * `Content-Encoding` / `Accept-Encoding` token vocabulary it understands.""",
   """ * Represents a content-coding the substrate compresses / decompresses with. The listed
 * codings are the `Content-Encoding` and `Accept-Encoding` token vocabulary the substrate
 * understands."""),
  ("	 * @param header - The raw weighted header value (e.g. `text/html, application/json;q=0.9`)",
   "	 * @param header - The raw weighted header value (for example `text/html, application/json;q=0.9`)"),
  ("	 * @param header - The raw `Accept-Encoding` header value (e.g. `gzip;q=1.0, deflate;q=0.8`)",
   "	 * @param header - The raw `Accept-Encoding` header value (for example `gzip;q=1.0, deflate;q=0.8`)"),
  ("	 * @param header - The raw `Accept-Language` header value (e.g. `en-US, en;q=0.8, fr;q=0.5`)",
   "	 * @param header - The raw `Accept-Language` header value (for example `en-US, en;q=0.8, fr;q=0.5`)"),
  (" * - `stop` — `stop()` began (status just moved to `'stopping'`). An upgrade",
   " * - `stop` — `stop()` began (status moved to `'stopping'`). An upgrade"),
  (""" *   `buildRequest` INNER boundary (a plain `400`, e.g. a malformed `Host`
 *   header) emits no `response` — no parsed `Request` exists yet to derive""",
   """ *   `buildRequest` INNER boundary (a plain `400`, for example a malformed
 *   `Host` header) emits no `response` — no parsed `Request` exists yet to derive"""),
 ],
 'src/server/Server.ts': [
  (""" *   throw (e.g. a malformed `Host` header) to a silent `400` with no""",
   """ *   throw (for example, a malformed `Host` header) to a silent `400` with no"""),
  ("""	// error. `buildRequest` runs behind its OWN inner boundary: a throw there
	// (e.g. a malformed `Host` header) maps to a silent `400`, never `error`.""",
   """	// error. `buildRequest` runs behind its OWN inner boundary: a throw there
	// (for example, a malformed `Host` header) maps to a silent `400`, never
	// `error`."""),
 ],
 'src/server/errors.ts': [
  (""" * Narrows an unknown caught value to an {@link HTTPError} (including its
 * subclasses, e.g. {@link ContentTooLargeError}).""",
   """ * Narrows an unknown caught value to an {@link HTTPError} (including its
 * subclasses, for example {@link ContentTooLargeError})."""),
  (""" * is raised by a `Server` to the caller that just invoked it, so both sides""",
   """ * is raised by a `Server` to the caller that invoked it directly, so both sides"""),
 ],
 'src/server/helpers.ts': [
  ("""// verifyToken(parseCookies(...)[name], secret)` — so a cookie is just a
// `signToken` value in a `Set-Cookie`, with the SAME secret rotation + tamper""",
   """// verifyToken(parseCookies(...)[name], secret)` — so a cookie is a
// `signToken` value in a `Set-Cookie`, with the SAME secret rotation + tamper"""),
  (" * @param candidate - The candidate media type to score (e.g. `'text/html'`)",
   " * @param candidate - The candidate media type to score (for example `'text/html'`)"),
  (" * @param candidate - The candidate language tag to score (e.g. `'en-US'`)",
   " * @param candidate - The candidate language tag to score (for example `'en-US'`)"),
  (""" * `preferred` port (e.g. a permission fault). A listener whose address is not""",
   """ * `preferred` port (for example, a permission fault). A listener whose address is not"""),
 ],
 'tests/src/server/Server.test.ts': [
  ("""		// The peer really lost the connection — the cut reached the wire, not
		// just the server's own bookkeeping.""",
   """		// The peer really lost the connection — the cut reached the wire, not
		// only the server's own bookkeeping."""),
 ],
}

for path, pairs in EDITS.items():
	text = io.open(path, encoding='utf8').read()
	for before, after in pairs:
		n = text.count(before)
		if n != 1:
			sys.exit('%s: before-text found %d times:\n%s' % (path, n, before))
		text = text.replace(before, after)
	io.open(path, 'w', encoding='utf8', newline='').write(text)
	print('OK %s (%d edits)' % (path, len(pairs)))
