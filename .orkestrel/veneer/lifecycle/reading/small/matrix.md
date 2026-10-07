# Small-model reliability: the experiment matrix

Opened 2026-10-07 on the user's directive: the 2B (`qwen3.5:2b-q4_K_M`, temperature 0, `num_predict` 256, `num_ctx` 16384) must use the browser toolset reliably; where the 4B stumbles too, the implementation is at fault. Every row runs live through ollama `tmp/probes/store-live.test.ts` (whole attempts through the real harness, one variant at the provider boundary, fixed ports) unless it names another instrument. The GPU runs one row at a time.

## Evidence the matrix rests on

Ollama `tmp/codex/census.md` (230 attempts): the 2B's cart and checkout runs all open with `type` on a link or button and recover (33 of 33 each; the 4B never); every failed paging attempt is a single `read` (18 of 18); the 2B journey fails on a refused `journeys{}`, repeated `save` after its own save, stale-reference loops on a seed reference after the page changed (`e4`, 17 times on port 49171 of `journey-T0`), an invented tool, and one ollama 500 on malformed tool-call XML; the 4B's journey attempt 1 clicked the seed's `e3` right after the page changed.

## Rows

| Row | Class | Variant | Instrument | Status | Result |
| --- | --- | --- | --- | --- | --- |
| T0 | baseline | none | store-live, 2B, journey, 8 ports | running | |
| T1 | type on links and buttons | `click` and `type` descriptions name links, buttons, textboxes | store-live, 2B, cart and checkout, 16 ports | queued | |
| T2 | type on links and buttons | system sentence `To follow a link or press a button, call click …` | same | queued | |
| T3 | type on links and buttons | T1 and T2 | same | queued | |
| J1 | save after saved | refusal `Journey "…" is saved already; do not call save again. Answer the user.` | store-live, 2B, journey, 8 ports | queued | |
| J2 | tool count | journey advertises no `capture`, `forget`, `dialog`, `switch`, `navigate`, `press` | same | queued | |
| J3 | both | J1 and J2 | same | queued | |
| S1 | stale reference | the refusal carries the current view with fresh references | needs a harness hook or a browser change | design | |
| S2 | stale reference | a reference stays bound to the same element identity across page changes; a gone element is refused by name | browser design, planner lane | design | |
| R1 | missing `from` | `journeys` and `read` default `from` to 1 | browser change; prompt form landed in ollama `5cfa5ed` | design | |
| P1 | plain-read early answer | system sentence for a partial window without `search` | store-live, 2B, paging, 16 ports | queued | |
| X1 | ollama 500 | `num_predict` 512 on the journey | store-live, 2B, journey, 8 ports | queued | |
| M4 | 4B journey | the `from 1` prompt | confirm.ts, 4B, journey, 2 runs | queued | |
