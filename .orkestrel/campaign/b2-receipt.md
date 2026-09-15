# B2 receipt — `OllamaProvider` in Chromium, direct to the daemon and through the relay (2026-09-14)

Instrument: `b2-server.mjs.txt` (Node `http` server on `127.0.0.1:8766` serving the built
`@orkestrel/ollama` core entry at ollama commit `dcb64fe` and every `@orkestrel` package in its
import closure through an import map — the installed `@orkestrel/agent` being the tarball packed
from agent `5d288d7` — and mounting `createRelay` at `POST /relay` over a server-side
`createOllama({ model, url: daemon })` behind the custom bearer `fixture-token`) and `b2.html.txt`
(the page). The daemon is Ollama 0.33.3 on `http://localhost:11434` with the model
`qwen3.5:2b-q4_K_M`; the page's direct calls cross origins from `http://localhost:8766` to the
daemon under the daemon's default origin policy. Launched through the harness browser
(`.claude/launch.json` entry `b2`, retained as `b1-launch.json.txt`'s successor in
`b2-launch.json.txt`) and read with the browser tools; the page text and the server log are
transcribed verbatim. A first run of the instrument substituted only the first occurrence of each
placeholder in the page, so the second provider dialled a literal URL and hit the instrument's own
404; the substitution was corrected and the page re-run — the reading that follows is the second
run.

## Page text

```text
B2 — OllamaProvider in the browser, direct and relayed
user agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.46388.4 Chrome/148.0.7778.280 Safari/537.36
case 1 direct generate: content="pong" usage={"prompt":19,"completion":2,"total":21}
case 2 direct stream cancel: ProviderAbortError partial={"content":"One,"}
case 3 relayed generate: content="pong" usage={"prompt":19,"completion":2,"total":21}
case 4 relayed refusal: ProviderError HTTP 401 "provider error: 401"
done
```

## Server log

```text
closure: ollama contract agent ndjson database queue workflow abort timeout emitter tool workspace budget
b2 server listening on http://127.0.0.1:8766/
relay authorize: accepted
relay response: 200
relay authorize: refused
relay response: 401
```

## Reading

- The built `@orkestrel/ollama` core entry and its whole `@orkestrel` closure, the rebuilt
  `OllamaProvider` on the `AgentProvider` base included, load as ES modules in Chrome 148.
- Case 1: the browser's `OllamaProvider` posts to the daemon's `/api/chat` directly and returns
  the settled content with usage counts from the `done` record.
- Case 2: the browser cancels after two deltas of a direct stream and receives
  `ProviderAbortError` carrying the local partial.
- Case 3: the same browser drives a `RelayProvider` through the server's `createRelay`, whose
  server-side `OllamaProvider` reaches the daemon; the settled content and usage cross the hop.
- Case 4: a wrong bearer is refused by `authorize` before any daemon call and reaches the browser
  as `ProviderError` with code `HTTP`, status `401`, and the message `provider error: 401`.
- The custom bearer travels only on the browser→server hop; the daemon receives the provider's
  own request with no browser header.
