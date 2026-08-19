# Instruments that work

Two units have now spent significant budget building a client for the probe's stdio server and
failing. The working one is here so a third does not.

## `wire.mjs` — drive the built entry over stdio

Spawns `dist/bin/main.js` and speaks the transport correctly. Point a unit at this rather than letting
it write its own.

Two facts decide whether such an instrument works, and both have cost this campaign a unit:

- **The Model Context Protocol stdio transport is newline-delimited JSON.** An instrument that frames
  requests with `Content-Length` headers — the way a Language Server Protocol client does — hangs with
  no error and no output. That framing is correct for the probe's *lint* stage, which speaks LSP to
  Oxlint, and wrong for its *server*. The two live in one package, which is how the mistake gets made.
- **Boot is about 4.4 seconds** because arming runs two real controls before the probe will serve. An
  instrument whose timeout is tighter than that reports a hang that is really a wait. Handshake
  requests answer immediately; only `tools/call` waits on arming.

A current-revision `tools/list` needs all three reserved metadata keys, not just the version:

```js
send('tools/list', { _meta: {
  'io.modelcontextprotocol/protocolVersion': '2026-07-28',
  'io.modelcontextprotocol/clientCapabilities': {},
  'io.modelcontextprotocol/clientInfo': { name: 'orchestrator', version: '1.0.0' },
} })
```

Sending only the version is refused as malformed metadata, which reads like a server defect and is not.

## Measured results this instrument produced

```text
handshake initialize -> {"name":"probe","version":"0.0.1"}
handshake tools/list -> prove
modern    tools/list -> prove
--- tools/call prove ---
probe c33e9c58-… (723 ms)
toolchain typescript 6.0.3, oxlint 1.79.0, vitest 4.1.11
case type: 0 findings (174 ms)      control type: 0 findings (109 ms)
case lint: 0 findings (191 ms)      control lint: 0 findings (124 ms)
case runtime: 0 findings (392 ms)   control runtime: 1 finding (330 ms)
  tmp/probe/w.test.ts:2 expected 4 to be 5 // Object.is equality
receipt probe:c33e9c58-…:runtime:typescript@6.0.3:oxlint@1.79.0:vitest@4.1.11
```

Both protocol eras answer, and the `tools/call` returns the verdict as raw text rather than a
JSON-quoted string.
