# B1 receipt — the browser half of the relay in Chromium (2026-09-14)

Instrument: `b1-server.mjs.txt` (Node `http` server on `127.0.0.1:8765` serving the built
`@orkestrel/agent` core entry at agent commit `5d288d7` and every `@orkestrel` package in its
import closure through an import map, and mounting `createRelay` at `POST /relay` over a scripted
provider behind the custom bearer `fixture-token`) and `b1.html.txt` (the page, which builds
`createRelayProvider({ url, parser, headers })` with an inline newline-delimited JSON parser and
drives three cases). Launched through the harness browser (`.claude/launch.json` entry `b1`,
retained as `b1-launch.json.txt`) and read with the browser tools; the page text and the server
log are transcribed verbatim.

## Page text

```text
B1 — browser relay receipt
user agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.46388.4 Chrome/148.0.7778.280 Safari/537.36
case 1 round trip: {"content":"echo: hello from chromium","thinking":"considering ","tools":[]}
case 2 first delta: {"channel":"thinking","text":"considering "}
case 2 second delta: {"channel":"content","text":"echo: "}
case 2 browser cancel: ProviderAbortError partial={"content":"echo: ","thinking":"considering "}
case 3 refused token: ProviderError HTTP 401 "provider error: 401"
done
```

## Server log

```text
closure: agent contract database queue workflow abort timeout emitter tool workspace budget
b1 server listening on http://127.0.0.1:8765/
relay authorize: accepted
relay response: 200
relay authorize: accepted
relay response: 200
relay: client connection closed before the response finished; aborting inbound
relay authorize: refused
relay response: 401
```

## Reading

- The built core entry and its whole `@orkestrel` closure load as ES modules in Chrome 148 with
  no console error: host independence of the core scope holds in a real browser, not only under
  the core typecheck.
- Case 1: a browser-side `RelayProvider` round-trips through the server relay to the provider and
  returns the settled result with content, thinking, and an empty tools array.
- Case 2: the browser cancels after two deltas; the browser side throws `ProviderAbortError`
  carrying the local partial, and the server observes the closed connection and aborts the inbound
  request, which the relay turns into the provider's abort (the scripted provider was parked on
  its signal).
- Case 3: a wrong bearer is refused by `authorize` before any provider call and reaches the
  browser as `ProviderError` with code `HTTP`, status `401`, and the message `provider error: 401`
  with no dangling separator (finding F16's template).
- The custom bearer travels only on the browser→server hop; the server's provider receives no
  header at all, because the relay hands it messages, tools, and options and nothing from the
  request.
