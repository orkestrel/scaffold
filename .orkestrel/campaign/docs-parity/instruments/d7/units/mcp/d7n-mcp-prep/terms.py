from pathlib import Path

edits = {
	'tests/setupServer.ts': [
		("bound base URL (e.g. `http://127.0.0.1:<port>`)", "bound base URL (for example `http://127.0.0.1:<port>`)", 2),
		("The endpoint path to upgrade (e.g. `/mcp`)", "The endpoint path to upgrade (for example `/mcp`)"),
		("// nothing — just free the client end and report the claim.", "// nothing — free the client end and report the claim."),
	],
	'tests/setup.ts': [
		("names the constructs in order to forbid them.", "names the constructs to forbid them."),
		("so a consumer can react (e.g. abort the `fetch`) mid-stream.", "so a consumer can react (for example abort the `fetch`) mid-stream."),
	],
	'src/server/HTTPDisconnect.ts': [
		("the body simply closes,", "the body closes,"),
	],
	'src/server/handlers.ts': [
		("the revision it just answered `_meta` for.", "the revision it answered `_meta` for."),
	],
	'src/core/MCPClient.ts': [
		("`success: false` result just like a local throw)", "`success: false` result exactly like a local throw)"),
		("which cannot know what was just set.", "which cannot know what the preceding statement set."),
		("it lives on the entry that was just dropped.", "it lives on the entry this call already dropped."),
	],
	'src/core/MCPTextStreamController.ts': [
		("disposing the exchange, never just this adapter.", "disposing the exchange, never this adapter alone."),
	],
	'src/core/types.ts': [
		("instead simply omits it.", "instead omits it."),
		("because a task that has just been created has no", "because a task at creation has no"),
		("one consequence that is easy", "one consequence a reader can"),
		("a consumer that simply walks away releases none of them", "a consumer that walks away releases none of them"),
		("a caller that cannot abort simply never", "a caller that cannot abort never"),
		("caller simply stops waiting.", "caller stops waiting."),
		("`success: false` result just like a", "`success: false` result exactly like a"),
	],
	'src/core/MCPServer.ts': [
		("both windows: the one just minted, and the one this round is", "both windows: the one minted here, and the one this round is"),
	],
	'tests/src/server/factories.test.ts': [
		("(decoded with the core SSEParser via", "(decoded with the core SSEParser through"),
		("policy composes ahead of it, via the spine's OWN `use`, no", "policy composes ahead of it, through the spine's OWN `use`, no"),
		("dependency) — just enough to prove the transport composes auth IN FRONT rather than", "dependency) — enough to prove the transport composes auth IN FRONT rather than"),
	],
	'tests/src/server/middlewares.test.ts': [
		("// Composed via `server.use(createMCPSession())` IN FRONT of a session-AGNOSTIC", "// Composed through `server.use(createMCPSession())` IN FRONT of a session-AGNOSTIC"),
		("+ a REAL `MCPServer` via", "+ a REAL `MCPServer` through"),
		("(a server-side push ARRIVES decoded via", "(a server-side push ARRIVES decoded through"),
		("on the open stream decoded via the core `SSEParser`", "on the open stream decoded through the core `SSEParser`"),
		("request for the id the server just advertised is swept", "request for the id the server advertised is swept"),
		("Gone from the STORE, not just refused by resolution:", "Gone from the STORE, not merely refused by resolution:"),
	],
	'tests/src/server/integration.test.ts': [
		("(`streaming: true`, decoded via the core SSEParser inside the transport)", "(`streaming: true`, decoded through the core SSEParser inside the transport)"),
		("pointed at it via the HTTP client transport.", "pointed at it through the HTTP client transport."),
		("dependency) — just enough to prove the transport composes auth IN FRONT rather than", "dependency) — enough to prove the transport composes auth IN FRONT rather than"),
		("the transport decodes it via the core SSEParser.", "the transport decodes it through the core SSEParser."),
	],
	'tests/conformanceClient.ts': [
		("schema it just sent under that same name", "schema it sent under that same name"),
	],
	'tests/src/core/parsers.test.ts': [
		("A row that simply omitted several would pass", "A row that omitted several would pass"),
	],
	'tests/setupConformance.ts': [
		("SHOULD-level check that reported WARNING is invisible", "`SHOULD`-level check that reported WARNING is invisible"),
		("/** Checks the scenario reported at SHOULD level. */", "/** Checks the scenario reported at `SHOULD` level. */"),
	],
	'tests/src/core/MCPClient.test.ts': [
		("// the peer is currently parking — a `close.hold`-suspended `close()`", "// the peer is parking — a `close.hold`-suspended `close()`"),
		("// it currently has OPEN.", "// it has OPEN."),
		("the claim it restores is owed just the same.", "the claim it restores is owed equally."),
		("every receiver obligation is SHOULD/MAY and the spec says", "every receiver obligation is `SHOULD`/`MAY` and the spec says"),
	],
	'tests/src/core/MCPServer.test.ts': [
		("// SHOULD send the empty `subscriptions/listen` RESULT", "// `SHOULD` send the empty `subscriptions/listen` RESULT"),
		("the port simply cannot recover", "the port cannot recover"),
		("ABSENT passes just as loudly when", "ABSENT passes as loudly when"),
		("read the code would pass just as well with", "read the code would pass as well with"),
		("`taskId` this server just handed out", "`taskId` this server handed out"),
	],
	'tests/guides.test.ts': [
		("the whole statement is lost, not just the binding.", "the whole statement is lost, not the binding alone."),
	],
	'tests/conformance.test.ts': [
		("// A SHOULD-level check is neither:", "// A `SHOULD`-level check is neither:"),
		("the scenario's own check is a SHOULD, so a retry", "the scenario's own check is a `SHOULD`, so a retry"),
		("// Passes at 1/0 for the same SHOULD reason as", "// Passes at 1/0 for the same `SHOULD` reason as"),
		("A check the runner reports at SHOULD level tallies", "A check the runner reports at `SHOULD` level tallies"),
	],
}

for path, pairs in edits.items():
	target = Path(path)
	text = target.read_text(encoding='utf8')
	for pair in pairs:
		before, after = pair[0], pair[1]
		expected = pair[2] if len(pair) > 2 else 1
		count = text.count(before)
		if count != expected:
			raise SystemExit(f'{path}: expected {expected} occurrences, found {count}: {before!r}')
		text = text.replace(before, after)
	target.write_text(text, encoding='utf8')
	print(f'{path} edited')
