<!-- U13d — builder (Sonnet, native), the agent guide's browser-limit sentence. Retained from the completion notification, 2026-09-15 (39 s, 5 tool uses). -->

Old (`guides/agent.md:1022`): "… and by a recorded Chrome 148 run of the built core entry: that entry and its whole `@orkestrel` import closure load as ES modules with no console error, and a browser-side `RelayProvider` round-trips a turn, cancels mid-stream and keeps its local partial, and receives a refused bearer as a `ProviderError` with code `'HTTP'` and status `401`. It is not proven by a browser test project, because this package has none."

New (`guides/agent.md:1022`): "… load as ES modules with no console error. This package publishes no browser test project of its own. The browser-side `RelayProvider` round trip through `createRelay` — a turn that round-trips, cancels mid-stream and keeps its local partial — and a refused bearer arriving as a `ProviderError` with code `'HTTP'` and status `401` are proven in `@orkestrel/ollama`'s service suite (`tests/service/page.test.ts`), run in a real Chromium against a live daemon with the page's requests recorded."

`git diff --stat`: `guides/agent.md | 2 +-`. `test:guides` 45 passed; `format:check` clean on 87 files; `lint:check` no findings. Deviation: none.

Orchestrator note (integration): the new sentence attributes the mid-stream cancellation to the page suite, which proves the round trip and the bearer refusal only; the cancellation with the retained partial is proven in ollama's Node relay suite (`tests/service/relay.test.ts`, `aborting after a live delta throws with the relay partial`). Corrected by the Orchestrator at integration (one sentence; ledger row K13).
